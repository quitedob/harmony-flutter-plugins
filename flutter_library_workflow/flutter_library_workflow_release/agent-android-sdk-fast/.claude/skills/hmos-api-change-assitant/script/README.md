# api-change-scan

直接调用 DevEco Studio 已实现的 `ApiScanUtil` 接口，在命令行输出 **API 变更 + 受影响代码位置**。

## 输出 schema（固定 6 列）

```
ApiDefinition | Language | Changed in SDK Version | Affected Versions | CodeLocation | Guidance link
```

| 列 | 说明 | 来源 |
|----|------|------|
| `ApiDefinition` | 接口签名（如 `height?: string \| number`） | `affectedApis.methodDefinition`，缺省时取 `packageName.interfaceName` |
| `Language` | `ArkTS` / `TypeScript` / `C` 等 | `affectedApis.implementLanguage` |
| `Changed in SDK Version` | 发生变更的 SDK 版本（如 `6.0.0(20) Beta1`） | `interfaceChanges.sdkVersion` |
| `Affected Versions` | `ALL`（非版本隔离）或具体 API level（如 `20`） | `interfaceChanges.apiEffectiveVersion`：`NOT_ISOLATED` → `ALL`，否则取 `apiVersion` |
| `CodeLocation` | 命中的 `文件绝对路径:行号` | Node 扫描器产出的 `absolutePath:line`，grep 回退时为 `相对路径:line` |
| `Guidance link` | 官方变更文档链接（锚点定位到该变更 ID） | `ApiScanUtil.getDocumentUrl(change)` 或 `ApiDisplayItem.tutoringUrl` |

## 用法

### macOS / Linux

```bash
脚本与本 README 同目录（即 skill 的 `script/` 目录）。进入该目录后执行：

# 1) 查看合法版本串（须完整匹配 VERSION_LIST）
./api-change-scan.sh --list-versions

# 2) 扫描工程
./api-change-scan.sh \
  --project /path/to/your_harmony_project \
  --start "HarmonyOS_5.1.0(18)_Release" \
  --end   "HarmonyOS_6.0.0(20)_Beta3" \
  --out   /tmp/acs

# 3) 只要变更清单，不扫代码位置
./api-change-scan.sh --start "HarmonyOS_5.1.0(18)_Release" --end "HarmonyOS_6.0.0(20)_Beta3" --no-scan --out /tmp/acs
```

### Windows

```powershell
脚本与本 README 同目录（即 skill 的 `script/` 目录）。进入该目录后执行：

# 1) 查看合法版本串
.\api-change-scan_windows.bat --list-versions

# 2) 扫描工程（支持完整版本名）
.\api-change-scan_windows.bat ^
  --project D:\path\to\your_harmony_project ^
  --start "HarmonyOS_5.1.0(18)_Release" ^
  --end   "HarmonyOS_6.0.0(20)_Beta3" ^
  --out   D:\tmp\acs

# 3) 使用 API Level 数字（所有平台通用）
.\api-change-scan_windows.bat ^
  --project D:\path\to\your_harmony_project ^
  --start 18 --end 20 ^
  --out D:\tmp\acs

# 4) 只要变更清单，不扫代码位置
.\api-change-scan_windows.bat --start 18 --end 20 --no-scan --out D:\tmp\acs
```

> **注意**：PowerShell/CMD 可能吞掉括号（`(` `)`），传入 `"HarmonyOS_5.1.0"` 也能自动解析为 `HarmonyOS_5.1.0(18)_Release`（优先匹配 Release 版本）；该归一化在所有平台生效。

## 它做了什么（全部直接调 DevEco 已实现接口）

| 步骤 | 调用的接口 | 说明 |
|------|-----------|------|
| 变更清单 | `ApiScanUtil.getAllApiChanges(start, end)` | 合并 JAR 内 `apiChange/*.json`，语义 **(start, end]** |
| 代码扫描 | DevEco 自带 Node 扫描器 `plugins/harmony/arkanalyzer-apiscan/index.js` | 即 `scanData` 内部 spawn 的同一个 AST 工具 |
| 结果拼装 | `ApiScanUtil.getApiChangeResult(csv, changeMap)` | CSV × 变更表 → 带代码位置的 `ApiDisplayItem` |
| 文档链接 | `ApiScanUtil.getDocumentUrl(change)` | 每条变更对应的官方 changelog 锚点 URL |

最终把 `ApiDisplayItem` 映射到上述 6 列，写 `result.csv` / `result.json`，终端打印表格。

## 输出文件（`--out` 目录）

| 文件 | 内容 |
|------|------|
| `changeList.json` | 完整变更清单（`affectedApis` + `interfaceChanges`），权威数据 |
| `result.csv` | **6 列**结果（主交付物） |
| `result.json` | 同内容的 JSON 数组 |
| `scan/` | Node 扫描器配置文件（`config-*.json`）和中间产出（CSV） |
| `scan.log` | Node 扫描器日志（排查用） |

## 扫描策略

代码位置扫描按以下优先级执行：

1. **Node 扫描器优先**：调用 DevEco 内置 `arkanalyzer-apiscan` 做 AST 级别精确扫描
2. **根目录优先**：先扫项目根目录（通常已递归覆盖所有模块），失败再逐模块兜底，取第一个产出（避免重复/路径错乱）
3. **grep 回退**：Node 扫描器不可用时（如 SDK 不全、未 hvigor 同步），自动回退到基于变更清单 API 名的 grep 近似定位
4. **自动去重**：按全部 6 列去重，保留顺序

## 让 AST 扫描器跑通的两个关键点

直接 `node index.js` 会崩，必须满足：

1. **传 `--tmpPath=<可写目录>`** — 扫描器要往那写进度文件 `processArkTs.txt`；不传则 `cliOptions.tmpPath` 为 `undefined`，`path.join(undefined)` 直接崩（报错 `SourceEntry.ts:93`）。
2. **CWD = index.js 所在目录（工具目录）** — worker 线程按 CWD 解析 `worker.js`，CWD 不对会报 `Cannot find module '.../ApiScan.worker.ts'`。

脚本已内置这两点（给每个扫描目标建独立 `tmpPath`、`ProcessBuilder.directory(工具目录)`）。

## 依赖

| 项目 | macOS / Linux | Windows |
|------|--------------|---------|
| DevEco 安装目录 | Java 入口自动探测：依次读环境变量 `DEVECO_HOME`→`DEV_DIR`→`TOOL_HOME`→类路径推导→常见安装路径（macOS `/Applications/DevEco-Studio.app/Contents`） | 同一探测逻辑，常见路径含 `D:\DevEcoStudio`、`C:\Program Files\Huawei\DevEco Studio` 等；三个环境变量任一可用 |
| Java 运行时 | DevEco 自带 JBR：`jbr/Contents/Home/bin/java\|javac` | DevEco 自带 JBR：`jbr\bin\java.exe\|javac.exe` |
| classpath | `lib/*` + `plugins/*/lib/*`（`:` 分隔） | `lib\*` + `plugins\*\lib\*`（`;` 分隔，通配符避免 CMD 行长限制） |
| Node 扫描器 | `tools/node/bin/node` + `plugins/harmony/arkanalyzer-apiscan/index.js` | `tools\node\node.exe` 或 `tools\node\bin\node.exe` + 同 `index.js` |
| 额外 JDK | 无需 | 无需 |

## 版本串格式

须完整匹配 `ApiScanUtil.VERSION_LIST`，例如：
- `HarmonyOS_5.1.0(18)_Release`
- `HarmonyOS_6.0.0(20)_Beta3`
- `HarmonyOS_5.0.3(15)_Beta2`

先 `--list-versions` 查看（不同 DevEco 版本覆盖的 API level 范围不同）。

### 便捷输入（所有平台通用）

- **API Level 数字快捷方式**：直接传 `--start 18 --end 20`，自动映射为对应版本（优先选 Release）
- **括号丢失自动修复**：PowerShell/CMD 可能吞掉括号，传 `"HarmonyOS_5.1.0"` 自动解析为 `HarmonyOS_5.1.0(18)_Release`

## 文件

| 文件 | 说明 |
|------|------|
| `ApiChangeCli.java` | 跨平台 (macOS/Linux/Windows) Java 入口（包路径 `com.huawei.deveco.programanalysis.apiscan.ApiScanUtil`，支持 API Level 映射和括号修复） |
| `api-change-scan.sh` | macOS/Linux shell 包装：自编译 + 转发参数 |
| `api-change-scan_windows.bat` | Windows bat 包装：自动检测 DevEco、通配符 classpath、自编译 + 转发参数 |
| `README.md` | 本文档 |

## 故障排查

| 问题 | 原因 | 解决 |
|------|------|------|
| `path.join(undefined)` / `SourceEntry.ts:93` | 未传 `--tmpPath` | 脚本已内置，若手动调 node 需加 `--tmpPath=<可写目录>` |
| `Cannot find module '.../ApiScan.worker.ts'` | CWD 不是 `index.js` 所在目录 | 脚本已内置 `ProcessBuilder.directory(工具目录)` |
| `ERROR: 找不到 DevEco 安装目录` | 环境变量未设置且默认路径不存在 | 设置 `DEVECO_HOME` / `DEV_DIR` / `TOOL_HOME`（三平台均按此顺序读取）；Windows 常见带空格路径如 `D:\DevEco Studio`、`C:\DevEco Studio` 已自动识别 |
| 中文 / 符号输出乱码（`Ϸ`、`ɨ`、`?` 等） | Windows 中文控制台默认 cp936，或 javac 按 cp936 读 UTF-8 源码 | 已内置修复：bat 执行 `chcp 65001` + `JAVA_TOOL_OPTIONS=-Dfile.encoding=UTF-8`、`javac -encoding UTF-8`、Java 强制 UTF-8 stdout；手动直调 java 时须同样加 `-encoding` / `-Dfile.encoding=UTF-8` 并 `chcp 65001` |
| Windows 路径含空格被截断（`D:\DevEco \jbr\...`） | 旧 bat 未正确处理带空格的 DevEco 安装目录 | 已修复：直接调用 bat 即可（路径已全部加引号）；勿用 `cmd /c "set \"X=Y z\" && bat"` 这类易错的手工转义 |
| `ERROR: 编译失败` | classpath 不完整或缺少 DevEco JAR | 确认 DevEco 安装完整，`lib/` 和 `plugins/*/lib/` 下有 JAR |
| `ERROR: 版本 'xxx' 不在 VERSION_LIST 中` | 版本串不匹配 | `--list-versions` 查看合法取值 |
| Node 扫描器未产出 CSV | 工程未 hvigor 同步或 SDK 不全 | 自动回退 grep；或先在 DevEco 中 Sync 工程 |
| grep 未命中任何结果 | 变更 API 名未在源码中直接引用 | 正常，该 API 可能未被工程使用 |
| Windows 括号被吞 | PowerShell 解析 `()` 为表达式 | Windows 版已支持自动修复，或改用 `cmd /c` 执行 |

## 已知限制

- `ApiScanUtil.scanData` 全量接口内部依赖 IDE 运行时（`ApplicationManager.invokeAndWait` 等），无法脱离 IDE 进程调用；本工具拆成可独立运行的 `getAllApiChanges` + Node 扫描器 + `getApiChangeResult` 三段直调，效果等价（ArkTS）。
- 扫描器覆盖 ArkTS/TS（`.ets/.ts/.d.ets/.d.ts`）。C++/Native 的扫描分支（`scanCpp`）在 IDE 内走 ninja + Eclipse CDT，本工具未覆盖。
- 若 Node 扫描器在某工程仍失败（如 SDK 不全），会自动回退到基于变更清单 API 名的 grep 近似定位，输出会标注。
- grep 回退为近似匹配，按 `interfaceName` 分词搜索，每 token 上限 30 处、总上限 1000 行。
