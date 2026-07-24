import com.huawei.deveco.programanalysis.apiscan.ApiScanUtil;
import com.huawei.deveco.programanalysis.apiscan.bean.ApiChangeItem;
import com.huawei.deveco.programanalysis.apiscan.bean.ApiDisplayItem;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 命令行入口: 直接调用 DevEco 已实现的 ApiScanUtil 接口,
 * 根据 startVersion/endVersion 输出 API 变更 + 受影响代码位置。
 *
 * 单文件跨平台实现 (macOS / Linux / Windows), 由 api-change-scan.sh / api-change-scan_windows.bat 包装执行。
 *
 * 输出列(固定 schema):
 *   ApiDefinition | Language | Changed in SDK Version | Affected Versions | CodeLocation | Guidance link
 */
public class ApiChangeCli {

    // DevEco Studio 根目录 (启动时由 detectDevDir() 解析)
    static String DEVECO;

    // 固定输出列
    static final String[] COLUMNS = {
            "ApiDefinition", "Language", "Changed in SDK Version", "Affected Versions", "CodeLocation", "Guidance link"
    };

    public static void main(String[] args) throws Exception {
        // 强制 stdout/stderr 为 UTF-8: Windows 中文系统默认 GBK(cp936) 会把中文与符号打印成乱码。
        // 配合 bat 的 chcp 65001 / JAVA_TOOL_OPTIONS, 以及 javac -encoding UTF-8 端到端消除乱码。
        try {
            System.setOut(new PrintStream(System.out, true, StandardCharsets.UTF_8));
            System.setErr(new PrintStream(System.err, true, StandardCharsets.UTF_8));
        } catch (Throwable ignore) {}

        // IntelliJ 运行时依赖的 system.path (ApiScanUtil 部分实现读取它), 指向 cwd 下独立目录避免污染
        String baseDir = System.getProperty("user.dir");
        System.setProperty("idea.system.path",
                baseDir + File.separator + ".deveco-api-change-cli" + File.separator + "system");

        DEVECO = detectDevDir();
        if (DEVECO == null) {
            System.err.println("ERROR: 无法检测到 DevEco Studio 安装目录。");
            System.err.println("请通过环境变量指定: DEVECO_HOME (macOS/Linux) 或 DEV_DIR / TOOL_HOME (Windows)。");
            System.exit(1);
        }

        Map<String, String> o = parseArgs(args);
        if (o.containsKey("list-versions")) { listVersions(); return; }
        if (o.containsKey("help") || args.length == 0) { usage(); return; }

        String project = o.get("project");
        String start = requireArg(o, "start");
        String end = requireArg(o, "end");
        String out = o.getOrDefault("out", "api-change-out");
        boolean noScan = o.containsKey("no-scan");

        // 版本归一化: 完整版本名原样返回; API Level 数字 / PowerShell 吞括号的前缀自动补全
        start = resolveVersionName(start);
        end = resolveVersionName(end);
        // mac 权威逻辑: 严格 VERSION_LIST 校验
        validateVersion(start);
        validateVersion(end);

        Path outDir = Paths.get(out).toAbsolutePath();
        Files.createDirectories(outDir);

        // ---------- [1] 直接调用已实现接口取变更清单 ----------
        System.out.println("[1/2] ApiScanUtil.getAllApiChanges(" + start + " -> " + end + ") ...");
        List<ApiChangeItem> changes = ApiScanUtil.getAllApiChanges(start, end);
        Path changeListJson = outDir.resolve("changeList.json");
        Files.writeString(changeListJson, JSON.toJSONString(changes), StandardCharsets.UTF_8);

        if (changes == null || changes.isEmpty()) {
            System.out.println("      No API changes between " + start + " and " + end + ". Done.");
            return;
        }
        System.out.println("      " + changes.size() + " change entries -> " + changeListJson);

        if (project == null || noScan) {
            System.out.println("\n[2/2] Skipped code-location scan"
                    + (project == null ? " (no --project)" : " (--no-scan)") + ".");
            // 仍输出变更清单到固定 schema (CodeLocation 留空)
            writeRows(outDir, buildRowsFromChanges(changes));
            return;
        }

        // ---------- [2] 代码位置 ----------
        scanLocations(project, changes, outDir, o);
    }

    // =================== DevEco 目录 / Node 探测 ===================
    // 跨平台解析 DevEco 安装目录: 环境变量 -> 常见路径 -> 本类加载位置推导。
    // 每个候选都经 validateDevDir 归一化与校验:
    //   - macOS .app 包根 (以 .app 结尾且含 Contents/) 自动改用 .../Contents
    //   - 必须含 plugins/harmony/lib, 否则跳过尝试下一个
    // 这样即便 DEVECO_HOME 指向 .app 根目录或错误路径, 也不会再误判 (与 shell 包装脚本行为一致)。
    static String detectDevDir() {
        List<String> raw = new ArrayList<>();
        addEnvCandidate(raw, "DEVECO_HOME");
        addEnvCandidate(raw, "DEV_DIR");
        addEnvCandidate(raw, "TOOL_HOME");
        // DEVECO_SDK_HOME 形如 .../Contents/sdk -> 同时尝试其父目录 .../Contents
        String sdk = System.getenv("DEVECO_SDK_HOME");
        if (sdk != null && !sdk.isBlank()) {
            Path sp = Paths.get(sdk).toAbsolutePath().normalize();
            raw.add(sp.toString());
            Path par = sp.getParent();
            String fn = sp.getFileName() == null ? "" : sp.getFileName().toString();
            if (par != null && "sdk".equals(fn)) raw.add(par.toString());
        }
        raw.addAll(Arrays.asList(
                "/Applications/DevEco-Studio.app/Contents",
                "/Applications/DevEco-Studio.app",
                "D:\\DevEcoStudio",
                "D:\\DevEco Studio",
                "C:\\DevEcoStudio",
                "C:\\DevEco Studio",
                "C:\\Program Files\\Huawei\\DevEco Studio",
                "C:\\Program Files (x86)\\Huawei\\DevEco Studio",
                "D:\\Program Files\\Huawei\\DevEco Studio"));

        for (String c : raw) {
            String v = validateDevDir(c);
            if (v != null) return v;
        }
        // 从本类加载位置向上推导 (类随 DevEco jar 加载时有效)
        try {
            Path classDir = Paths.get(ApiChangeCli.class.getProtectionDomain()
                    .getCodeSource().getLocation().toURI()).getParent();
            Path cur = classDir;
            for (int i = 0; i < 6 && cur != null; i++) {
                String v = validateDevDir(cur.toString());
                if (v != null) return v;
                cur = cur.getParent();
            }
        } catch (Exception ignore) {}
        return null;
    }

    static void addEnvCandidate(List<String> raw, String name) {
        String v = System.getenv(name);
        if (v != null && !v.isBlank()) raw.add(v);
    }

    // 归一化 (.app 包根 -> .app/Contents) 并校验 (含 plugins/harmony/lib)。可用返回绝对路径, 否则 null。
    static String validateDevDir(String candidate) {
        if (candidate == null || candidate.isBlank()) return null;
        try {
            Path p = Paths.get(candidate).toAbsolutePath().normalize();
            String name = p.getFileName() == null ? "" : p.getFileName().toString();
            if (name.endsWith(".app") && Files.isDirectory(p.resolve("Contents"))) {
                p = p.resolve("Contents").normalize();
            }
            if (Files.isDirectory(p.resolve("plugins/harmony/lib"))) {
                return p.toString();
            }
        } catch (Exception ignore) {}
        return null;
    }

    // 跨平台 node 可执行文件: macOS/Linux = tools/node/bin/node; Windows = tools/node[/bin]/node.exe
    static String findNodeExe(String deveco) {
        Path root = Paths.get(deveco);
        String[] cands;
        if (System.getProperty("os.name", "").toLowerCase(Locale.ROOT).contains("win")) {
            cands = new String[]{"tools/node/node.exe", "tools/node/bin/node.exe"};
        } else {
            cands = new String[]{"tools/node/bin/node", "tools/node/node"};
        }
        for (String c : cands) {
            Path p = root.resolve(c);
            if (Files.isExecutable(p)) return p.toString();
        }
        return root.resolve(cands[0]).toString();
    }

    // =================== 版本列表 ===================
    static void listVersions() {
        System.out.println("ApiScanUtil.VERSION_LIST (合法的 --start / --end 取值):");
        int i = 0;
        for (String v : ApiScanUtil.VERSION_LIST) {
            System.out.printf("  [%2d] %-45s  (API Level %s)%n", i++, v, extractApiLevel(v));
        }
        System.out.println("\n版本串需完整匹配, 例如 HarmonyOS_5.1.0(18)_Release / HarmonyOS_6.0.0(20)_Beta3。");
        System.out.println("也可直接用 API Level 数字, 如 --start 14 --end 26 (优先匹配 Release)。");
    }

    static void validateVersion(String v) {
        if (!ApiScanUtil.VERSION_LIST.contains(v)) {
            System.err.println("ERROR: 版本 '" + v + "' 不在 VERSION_LIST 中。合法取值:");
            listVersions();
            System.exit(2);
        }
    }

    // 归一化: 完整版本名原样返回; API Level 数字 / PowerShell 吞括号的前缀自动补全为完整版本名 (优先 Release)
    static String resolveVersionName(String input) {
        if (input == null || input.isBlank()) {
            throw new IllegalArgumentException("版本号不能为空");
        }
        if (input.contains("(") && input.contains(")")) return input;       // 已是完整版本名
        // 含 HarmonyOS_ 前缀但括号被吞: HarmonyOS_5.1.0 -> HarmonyOS_5.1.0(18)_Release
        if (input.contains("HarmonyOS_")) {
            for (String v : ApiScanUtil.VERSION_LIST) {
                if (v.startsWith(input) && v.endsWith("_Release")) {
                    System.out.println("  (auto-resolved: " + input + " -> " + v + ")");
                    return v;
                }
            }
            for (String v : ApiScanUtil.VERSION_LIST) {
                if (v.startsWith(input)) {
                    System.out.println("  (auto-resolved: " + input + " -> " + v + ")");
                    return v;
                }
            }
        }
        // 纯 API Level 数字 -> 含 (level) 的版本, 优先 Release
        for (String v : ApiScanUtil.VERSION_LIST) {
            if (v.contains("(" + input + ")") && v.endsWith("_Release")) return v;
        }
        for (String v : ApiScanUtil.VERSION_LIST) {
            if (v.contains("(" + input + ")")) return v;
        }
        throw new IllegalArgumentException("未知版本: " + input + "\n请使用 --list-versions 查看可用版本");
    }

    static String extractApiLevel(String versionName) {
        int s = versionName.indexOf('('), e = versionName.indexOf(')');
        return (s >= 0 && e > s) ? versionName.substring(s + 1, e) : versionName;
    }

    // =================== Row 构造 ===================
    static JSONObject row(String apiDef, String lang, String sdkVer, String affVer, String codeLoc, String guidance) {
        JSONObject r = new JSONObject();
        r.put(COLUMNS[0], apiDef == null ? "" : apiDef);
        r.put(COLUMNS[1], lang == null ? "" : lang);
        r.put(COLUMNS[2], sdkVer == null ? "" : sdkVer);
        r.put(COLUMNS[3], affVer == null ? "" : affVer);
        r.put(COLUMNS[4], codeLoc == null ? "" : codeLoc);
        r.put(COLUMNS[5], guidance == null ? "" : guidance);
        return r;
    }

    // changeId -> Guidance link (直接调 ApiScanUtil.getDocumentUrl)
    @SuppressWarnings("unchecked")
    static Map<String, String> buildGuidanceMap(List<ApiChangeItem> changes) {
        Map<String, String> m = new LinkedHashMap<>();
        for (ApiChangeItem c : changes) {
            JSONObject jo = (JSONObject) JSON.toJSON(c);
            JSONObject ic = jo.getJSONObject("interfaceChanges");
            String cid = (ic != null && ic.getString("id") != null) ? ic.getString("id") : "";
            String url = "";
            try { url = ApiScanUtil.getDocumentUrl(c); } catch (Throwable ignore) {}
            if (!cid.isEmpty()) m.putIfAbsent(cid, url);
        }
        return m;
    }

    // 从 interfaceChanges + affectedApi 派生字段
    static String sdkVersionOf(JSONObject ic) { return ic == null ? "" : str(ic.get("sdkVersion"), ic.get("apiVersion")); }
    static String affectedVersionsOf(JSONObject ic) {
        if (ic == null) return "";
        String eff = ic.getString("apiEffectiveVersion");
        return "NOT_ISOLATED".equals(eff) ? "ALL" : str(ic.get("apiVersion"));
    }

    static String str(Object... vals) {
        for (Object v : vals) { if (v != null && !v.toString().isEmpty() && !"null".equals(v.toString())) return v.toString(); }
        return "";
    }

    // 变更清单 -> Row (无代码位置时 CodeLocation 为空)
    @SuppressWarnings("unchecked")
    static List<JSONObject> buildRowsFromChanges(List<ApiChangeItem> changes) {
        List<JSONObject> rows = new ArrayList<>();
        for (ApiChangeItem c : changes) {
            JSONObject jo = (JSONObject) JSON.toJSON(c);
            JSONObject ic = jo.getJSONObject("interfaceChanges");
            JSONArray apis = jo.getJSONArray("affectedApis");
            String sdk = sdkVersionOf(ic);
            String aff = affectedVersionsOf(ic);
            String guidance = "";
            try { guidance = ApiScanUtil.getDocumentUrl(c); } catch (Throwable ignore) {}
            if (apis != null && !apis.isEmpty()) {
                for (Object o : apis) {
                    JSONObject a = (JSONObject) o;
                    rows.add(row(str(a.get("methodDefinition"), qualifiedName(a)),
                            a.getString("implementLanguage"), sdk, aff, "", guidance));
                }
            } else {
                rows.add(row(ic == null ? "" : ic.getString("changeTitle"), "", sdk, aff, "", guidance));
            }
        }
        return rows;
    }

    static String qualifiedName(JSONObject a) {
        String pkg = a.getString("packageName");
        String iface = a.getString("interfaceName");
        if (pkg == null || pkg.isEmpty() || "null".equals(pkg)) return iface == null ? "" : iface;
        return pkg + "." + iface;
    }

    // =================== 代码位置扫描 ===================
    static void scanLocations(String project, List<ApiChangeItem> changes,
                              Path outDir, Map<String, String> o) throws Exception {
        String node = o.getOrDefault("node", findNodeExe(DEVECO));
        String indexJs = o.getOrDefault("scanner",
                Paths.get(DEVECO, "plugins", "harmony", "arkanalyzer-apiscan", "index.js").toString());
        String ohosSdk = o.getOrDefault("sdks-ohos",
                Paths.get(DEVECO, "sdk", "default", "openharmony", "ets").toString());
        String hmsSdk = o.getOrDefault("sdks-hms",
                Paths.get(DEVECO, "sdk", "default", "hms", "ets").toString());

        Path scanOut = outDir.resolve("scan");
        Files.createDirectories(scanOut);

        System.out.println("\n[2/2] 定位代码位置 ...");
        List<String> moduleSrcs = readModuleSrcPaths(project);
        Map<String, String> guidance = buildGuidanceMap(changes);
        Map<String, ApiChangeItem> changeMap = buildChangeIdMap(changes);
        Path changeListJson = outDir.resolve("changeList.json");

        // 扫描: 根扫描已递归覆盖所有模块, 优先只扫根; 根失败再逐模块兜底, 取第一个产出(避免重复/路径错乱)
        Path scanned = Paths.get(project).toAbsolutePath().normalize();
        String csv = null;
        try {
            csv = runOneTarget(scanned, node, indexJs, ohosSdk, hmsSdk, changeListJson, scanOut, outDir.resolve("scan.log"));
            if (csv == null) {
                for (String m : moduleSrcs) {
                    Path mp = Paths.get(project).resolve(m).toAbsolutePath().normalize();
                    if (!Files.isDirectory(mp)) continue;
                    csv = runOneTarget(mp, node, indexJs, ohosSdk, hmsSdk, changeListJson, scanOut, outDir.resolve("scan.log"));
                    if (csv != null) { scanned = mp; break; }
                }
            }
        } catch (Throwable t) {
            // Node 不可执行 / 扫描器启动失败时不整体中断, 落到下方 grep 回退, 仍产出 result.csv
            System.out.println("      Node 扫描器启动失败 (" + t.getClass().getSimpleName()
                    + ": " + t.getMessage() + "), 改用 grep 回退。");
            csv = null;
        }

        List<JSONObject> rows = null;
        if (csv != null) {
            try {
                List<ApiDisplayItem> raw = ApiScanUtil.getApiChangeResult(csv, changeMap);
                rows = new ArrayList<>();
                if (raw != null) for (ApiDisplayItem d : raw) {
                    JSONObject dj = (JSONObject) JSON.toJSON(d);
                    rows.add(row(dj.getString("apiDefinition"), dj.getString("language"),
                            dj.getString("sdkVersion"), dj.getString("affectedVersions"),
                            absolutify(str(dj.get("absolutePath"), dj.get("location")), scanned),
                            str(dj.get("tutoringUrl"), guidance.get(dj.getString("changeId")))));
                }
                System.out.println("      (via DevEco Node 扫描器 + ApiScanUtil.getApiChangeResult, 扫描目标: " + scanned.getFileName() + ")");
            } catch (Throwable t) {
                System.out.println("      getApiChangeResult 不可用, 改用 grep: " + t);
                rows = null;
            }
        }

        // AST 扫描器对库模块 (无 project 级 build-profile) 或未 hvigor 同步的工程会返回空:
        // getAllFiles 拿不到源码 -> 空 CSV -> 0 命中。Flutter 插件的 ohos/ 正是库模块,
        // 因此 AST 空结果时用 grep 兜底交叉校验, 避免把 "没扫到" 误报成 "无受影响 API"。
        if (rows != null && rows.isEmpty()) {
            System.out.println("      AST 未命中 (工程可能为库模块或未 hvigor 同步), 用 grep 交叉校验:");
            List<JSONObject> grepRows = locateByGrep(project, changes, guidance);
            if (!grepRows.isEmpty()) {
                rows = grepRows;
                System.out.println("      grep 补充命中 " + grepRows.size() + " 处 (近似定位)。");
            } else {
                System.out.println("      grep 同样未命中, 确认源码未引用任何变更 API。");
            }
        }

        if (rows == null) {
            if (csv == null) {
                System.out.println("      DevEco Node 扫描器未产出(工程可能未 hvigor 同步), 回退 grep:");
                tailLog(outDir.resolve("scan.log"));
            } else {
                System.out.println("      扫描器 CSV 解析失败, 回退 grep。");
            }
            rows = locateByGrep(project, changes, guidance);
            System.out.println(rows.isEmpty()
                    ? "      grep 未命中任何变更 API 的引用。"
                    : "      grep 命中 " + rows.size() + " 处(近似)。");
        }

        int before = rows.size();
        rows = dedupRows(rows);
        if (rows.size() < before) System.out.println("      去重: " + before + " -> " + rows.size());

        writeRows(outDir, rows);
        System.out.println("\n输出: " + outDir.resolve("result.csv") + "  (列: "
                + String.join(", ", COLUMNS) + ")");
    }

    static Map<String, ApiChangeItem> buildChangeIdMap(List<ApiChangeItem> changes) {
        Map<String, ApiChangeItem> m = new LinkedHashMap<>();
        for (ApiChangeItem c : changes) {
            JSONObject jo = (JSONObject) JSON.toJSON(c);
            JSONObject ic = jo.getJSONObject("interfaceChanges");
            if (ic != null && ic.getString("id") != null) m.putIfAbsent(ic.getString("id"), c);
        }
        return m;
    }

    static String runOneTarget(Path target, String node, String indexJs,
                               String ohosSdk, String hmsSdk, Path changeListJson,
                               Path scanOut, Path logPath) throws Exception {
        Path cfg = scanOut.resolve("config-" + sanitize(target.getFileName().toString()) + ".json");
        String cfgJson = "{\"projectPath\":\"" + esc(target.toAbsolutePath().toString()) + "\","
                + "\"sdks\":[{\"name\":\"ohos\",\"path\":\"" + esc(ohosSdk) + "\"},"
                + "{\"name\":\"hms\",\"path\":\"" + esc(hmsSdk) + "\"}],"
                + "\"outPath\":\"" + esc(scanOut.toAbsolutePath().toString()) + "\"}";
        Files.writeString(cfg, cfgJson, StandardCharsets.UTF_8);

        // tmpPath: 扫描器写进度文件 processArkTs.txt 的可写目录(必须传, 否则 path.join(undefined) 崩溃)
        Path tmpDir = scanOut.resolve("tmp-" + sanitize(target.getFileName().toString()));
        Files.createDirectories(tmpDir);

        List<String> cmd = Arrays.asList(node, "--max_old_space_size=8192", indexJs,
                "--configPath=" + cfg, "--apiModifiedPath=" + changeListJson,
                "--batchSize=1000", "--logPath=" + logPath,
                "--tmpPath=" + tmpDir.toAbsolutePath());
        System.out.println("      >> Node 扫描: " + target);
        // CWD 必须是 index.js 所目录(工具目录), 否则 worker 线程找不到 ApiScan.worker.ts
        Process p = new ProcessBuilder(cmd)
                .directory(new File(new File(indexJs).getParent()))
                .redirectErrorStream(true).start();
        StringBuilder out = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream(), StandardCharsets.UTF_8))) {
            String ln;
            while ((ln = br.readLine()) != null) out.append(ln).append('\n');
        }
        int code = p.waitFor();
        if (code != 0) System.out.println("         扫描器退出码=" + code);

        // 扫描器产出文件名: <projectBasename>Api<timestamp>_<batch>.csv
        String base = sanitize(target.getFileName().toString());
        Path csv = pickNewestCsv(scanOut, base);
        if (csv == null) csv = pickNewestCsv(scanOut, null);
        if (csv != null && Files.size(csv) > 0) return Files.readString(csv, StandardCharsets.UTF_8);
        return null;
    }

    static Path pickNewestCsv(Path dir, String prefix) {
        File[] csvs = dir.toFile().listFiles((d, n) -> n.endsWith(".csv")
                && (prefix == null || n.startsWith(prefix)));
        if (csvs == null || csvs.length == 0) return null;
        Path newest = null; long mt = -1;
        for (File f : csvs) {
            if (f.length() == 0) continue;
            if (f.lastModified() > mt) { mt = f.lastModified(); newest = f.toPath(); }
        }
        return newest;
    }

    // =================== grep 回退定位 ===================
    @SuppressWarnings("unchecked")
    static List<JSONObject> locateByGrep(String project, List<ApiChangeItem> changes,
                                         Map<String, String> guidance) throws Exception {
        // token(interfaceName) -> 元信息列表 (一个 API 名可能对应多个变更/多个 affectedApi)
        Map<String, List<JSONObject>> tokenMeta = new LinkedHashMap<>();
        for (ApiChangeItem c : changes) {
            JSONObject jo = (JSONObject) JSON.toJSON(c);
            JSONObject ic = jo.getJSONObject("interfaceChanges");
            String cid = (ic != null && ic.getString("id") != null) ? ic.getString("id") : "";
            String sdk = sdkVersionOf(ic);
            String aff = affectedVersionsOf(ic);
            JSONArray apis = jo.getJSONArray("affectedApis");
            if (apis == null) continue;
            String url = guidance.getOrDefault(cid, "");
            for (Object o : apis) {
                JSONObject a = (JSONObject) o;
                String token = a.getString("interfaceName");
                if (token == null || token.length() < 3 || "null".equals(token) || isStopword(token)) continue;
                JSONObject meta = new JSONObject();
                meta.put("apiDef", str(a.getString("methodDefinition"), qualifiedName(a)));
                meta.put("lang", str(a.getString("implementLanguage"), "typeScript"));
                meta.put("sdk", sdk);
                meta.put("aff", aff);
                meta.put("guidance", url);
                tokenMeta.computeIfAbsent(token, k -> new ArrayList<>()).add(meta);
            }
        }
        if (tokenMeta.isEmpty()) return new ArrayList<>();

        List<String> ordered = new ArrayList<>(tokenMeta.keySet());
        StringBuilder re = new StringBuilder();
        for (int i = 0; i < ordered.size(); i++) {
            if (i > 0) re.append('|');
            re.append(Pattern.quote(ordered.get(i)));
        }
        Pattern pat = Pattern.compile("\\b(" + re + ")\\b");

        Set<String> skipDirs = new LinkedHashSet<>(Arrays.asList(
                "oh_modules", "node_modules", "build", ".preview", ".cxx", ".git", ".hvigor", ".test"));
        Set<String> exts = new LinkedHashSet<>(Arrays.asList(".ets", ".ts", ".js", ".c", ".cpp", ".cc", ".h", ".hpp"));
        Path root = Paths.get(project);
        List<Path> files = new ArrayList<>();
        try (java.util.stream.Stream<Path> walk = Files.walk(root)) {
            walk.filter(Files::isRegularFile).forEach(p -> {
                for (Path seg : root.relativize(p)) if (skipDirs.contains(seg.toString())) return;
                String name = p.getFileName().toString();
                for (String e : exts) if (name.endsWith(e)) { files.add(p); break; }
            });
        }
        System.out.println("      grep: " + files.size() + " 个源码文件, " + ordered.size() + " 个 API 关键词");

        List<JSONObject> rows = new ArrayList<>();
        int perTokenCap = 30, totalCap = 1000;
        Map<String, Integer> counts = new LinkedHashMap<>();
        outer:
        for (Path f : files) {
            List<String> lines;
            try { lines = Files.readAllLines(f, StandardCharsets.UTF_8); } catch (Exception ignore) { continue; }
            for (int li = 0; li < lines.size(); li++) {
                String line = lines.get(li);
                Matcher m = pat.matcher(line);
                while (m.find()) {
                    String tok = m.group(1);
                    // 仅保留调用站点 (后跟 '(') 或成员访问站点 (前缀 '.'),
                    // 过滤 let/const/var token = ... 这类同名变量声明造成的误报
                    int ms = m.start(), me = m.end();
                    boolean isCall = me < line.length() && line.substring(me).matches("\\s*\\(.*");
                    boolean isAccess = ms > 0 && line.charAt(ms - 1) == '.';
                    if (!isCall && !isAccess) continue;
                    int n = counts.getOrDefault(tok, 0);
                    if (n >= perTokenCap) continue;
                    String codeLoc = f + ":" + (li + 1);
                    for (JSONObject meta : tokenMeta.get(tok)) {
                        if (rows.size() >= totalCap) break outer;
                        rows.add(row(meta.getString("apiDef"), meta.getString("lang"),
                                meta.getString("sdk"), meta.getString("aff"), codeLoc, meta.getString("guidance")));
                    }
                    counts.put(tok, n + 1);
                }
            }
        }
        return rows;
    }

    // =================== 输出 CSV / JSON / 表格 ===================
    static void writeRows(Path outDir, List<JSONObject> rows) throws Exception {
        // result.json
        Files.writeString(outDir.resolve("result.json"), JSON.toJSONString(rows), StandardCharsets.UTF_8);
        // result.csv
        StringBuilder sb = new StringBuilder();
        sb.append(String.join(",", COLUMNS)).append('\n');
        for (JSONObject r : rows) {
            String[] vals = new String[COLUMNS.length];
            for (int i = 0; i < COLUMNS.length; i++) vals[i] = r.getString(COLUMNS[i]);
            sb.append(String.join(",", Arrays.stream(vals).map(ApiChangeCli::csvCell).toArray(String[]::new))).append('\n');
        }
        Files.writeString(outDir.resolve("result.csv"), sb.toString(), StandardCharsets.UTF_8);
        // 终端表格
        printTable(rows);
    }

    static void printTable(List<JSONObject> rows) {
        if (rows.isEmpty()) { System.out.println("(无代码位置命中)"); return; }
        System.out.println("\n------ 结果 (" + rows.size() + " 行) ------");
        for (JSONObject r : rows) {
            System.out.printf("[%s] %s  (%s, affected: %s)%n    ↳ %s%n",
                    r.getString(COLUMNS[1]),                       // Language
                    truncate(r.getString(COLUMNS[0]), 70),         // ApiDefinition
                    r.getString(COLUMNS[2]),                       // Changed in SDK Version
                    r.getString(COLUMNS[3]),                       // Affected Versions
                    r.getString(COLUMNS[4]));                      // CodeLocation
            String g = r.getString(COLUMNS[5]);
            if (g != null && !g.isEmpty()) System.out.println("    🔗 " + g);
        }
    }

    static String csvCell(String s) {
        if (s == null) return "";
        if (s.contains(",") || s.contains("\"") || s.contains("\n")) {
            return "\"" + s.replace("\"", "\"\"") + "\"";
        }
        return s;
    }

    // 相对代码位置(相对"扫描目标的父目录", 如 "ohos_hardemo/lib/.../x.ets:123") -> 绝对路径
    static String absolutify(String codeLoc, Path scanned) {
        if (codeLoc == null || codeLoc.isEmpty()) return "";
        if (codeLoc.startsWith("/")) return codeLoc;             // 已是绝对路径
        Path base = scanned == null ? null : scanned.getParent();
        if (base == null) return codeLoc;
        int colon = codeLoc.lastIndexOf(':');
        String filePart = colon > 0 ? codeLoc.substring(0, colon) : codeLoc;
        String linePart = colon > 0 ? codeLoc.substring(colon) : "";
        try {
            return base.resolve(filePart).normalize() + linePart;
        } catch (Exception e) {
            return codeLoc;
        }
    }

    // 按全部列去重(保留顺序)
    static List<JSONObject> dedupRows(List<JSONObject> rows) {
        List<JSONObject> out = new ArrayList<>();
        LinkedHashSet<String> seen = new LinkedHashSet<>();
        for (JSONObject r : rows) {
            StringBuilder key = new StringBuilder();
            for (String c : COLUMNS) key.append(r.getString(c)).append(' ');
            if (seen.add(key.toString())) out.add(r);
        }
        return out;
    }

    // =================== 小工具 ===================
    static String truncate(String s, int max) {
        if (s == null) return "";
        s = s.trim().replaceAll("\\s+", " ");
        return s.length() <= max ? s : s.substring(0, max - 1) + "…";
    }

    static final Set<String> STOPWORDS = new LinkedHashSet<>(Arrays.asList(
            "get", "set", "new", "let", "var", "for", "try", "run", "add", "put", "use",
            "show", "hide", "init", "open", "close", "load", "save", "read", "copy", "clone",
            "name", "type", "value", "size", "count", "index", "data", "item", "list", "result",
            "start", "stop", "next", "prev", "this", "self", "that", "test", "log", "error",
            "off", "do", "if", "to", "from", "with", "void", "null", "true", "false",
            "constructor", "toString", "valueOf", "hasOwnProperty"));

    static boolean isStopword(String s) { return STOPWORDS.contains(s); }

    static List<String> readModuleSrcPaths(String project) {
        List<String> r = new ArrayList<>();
        Path bp = Paths.get(project).resolve("build-profile.json5");
        if (!Files.isReadable(bp)) return r;
        try {
            Matcher m = Pattern.compile("\"srcPath\"\\s*:\\s*\"([^\"]+)\"").matcher(Files.readString(bp, StandardCharsets.UTF_8));
            while (m.find()) r.add(m.group(1));
        } catch (Exception ignore) {}
        return r;
    }

    static void tailLog(Path log) {
        try {
            List<String> all = Files.readAllLines(log, StandardCharsets.UTF_8);
            System.out.println("------ scan.log (tail) ------");
            for (int i = Math.max(0, all.size() - 15); i < all.size(); i++) System.out.println(all.get(i));
        } catch (Exception ignore) {}
    }

    static String sanitize(String s) { return s.replaceAll("[^A-Za-z0-9._-]", "_"); }
    static String esc(String s) { return s.replace("\\", "\\\\").replace("\"", "\\\""); }

    static Map<String, String> parseArgs(String[] args) {
        Map<String, String> m = new LinkedHashMap<>();
        for (int i = 0; i < args.length; i++) {
            String a = args[i];
            if (a.startsWith("--")) {
                String key = a.substring(2);
                if (key.contains("=")) m.put(key.substring(0, key.indexOf('=')), key.substring(key.indexOf('=') + 1));
                else if (i + 1 < args.length && !args[i + 1].startsWith("--")) m.put(key, args[++i]);
                else m.put(key, "");
            }
        }
        return m;
    }

    static String requireArg(Map<String, String> o, String key) {
        String v = o.get(key);
        if (v == null) { System.err.println("ERROR: --" + key + " 必填。--help 查看用法。"); System.exit(2); }
        return v;
    }

    static void usage() {
        System.out.println("ApiChangeCli — 直接调用 DevEco ApiScanUtil 的命令行工具 (macOS / Linux / Windows)\n"
                + "\n输出列: " + String.join(" | ", COLUMNS) + "\n"
                + "\n用法:"
                + "\n  ApiChangeCli --list-versions"
                + "\n  ApiChangeCli --project <工程> --start <版本> --end <版本> [--out <目录>] [--no-scan]\n"
                + "\n版本串须完整匹配 VERSION_LIST, 例如 HarmonyOS_5.1.0(18)_Release。"
                + "\n也支持 API Level 数字, 如 --start 14 --end 26 (优先匹配 Release)。"
                + "\n环境变量: DEVECO_HOME (macOS/Linux) 或 DEV_DIR / TOOL_HOME (Windows) 可覆盖 DevEco 安装目录。");
    }
}
