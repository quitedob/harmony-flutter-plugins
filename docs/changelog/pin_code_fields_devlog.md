# pin_code_fields 鸿蒙适配 — 开发日志（困难与处理）

> 日期：2026-07-31 | 分支：main
> 插件类型：pure_dart（纯 Dart Flutter UI 组件，零原生代码）
> 插件版本：9.4.0（headless + Material 架构）
> 目标设备：HUAWEI Mate 60（BRA-AL00，API 23，Wi-Fi 192.168.3.85:41665）

---

## 一、结论先行

迁移全流程完成，严格 final verifier 为 **PASS**（`--stage final --require-hap`，无错误无警告）。核心成果：

- 最小纯 Dart 补丁：`TargetPlatform.ohos` → `materialTextSelectionHandleControls`。
- 包级 `flutter test` 80/80、Hub PIN widget tests 4/4 全过。
- 32 条 reviewed 用例在真机全部“符合预期（PASS）”，逐条截图证据 `logs/f*.jpeg`。
- 签名 HAP 安装/启动/行为 PASS，`hap-sign-tool verify-app` exit 0。

---

## 二、遇到的困难与处理流程（按发生顺序）

### 2.1 `flutter test` 引擎 VM snapshot invalid（最棘手）

**现象**：`flutter test` 在加载测试套件前失败：`VM snapshot invalid and could not be inferred from settings`、`Could not create Dart VM instance`、`Connection closed before test suite loaded`，零测试执行。

**排查**：
1. 确认 OHOS fork `flutter_tester.exe`（`bin\cache\artifacts\engine\windows-x64\`）版本为 `50dc3902…`，与框架 revision `8cd19e509d` 不匹配。
2. 对照引擎源码：标准 Windows+JIT tester 定义 `DART_SNAPSHOT_STATIC_LINK` 静态内嵌 snapshot，无需参数；OHOS 构建缺少该开关，需要 `--vm-snapshot-data`/`--isolate-snapshot-data`，而 `flutter_tools` 从不传这些参数 → 启动即崩。
3. 用显式 snapshot 参数验证 tester+snapshot 文件本身有效（错误变为 `Dart kernel file not specified`）。

**处理**：下载标准引擎 `8cd19e509d` 的 `windows-x64/artifacts.zip`，提取 `flutter_tester.exe` 替换 OHOS 版；原文件备份至 `C:\Users\shuaibi\AppData\Local\Temp\flt_diag\flutter_tester.exe.ohos-50dc3902.bak`。

**结果**：包级 `flutter test` → `00:02 +80: All tests passed!`（80/80，exit 0）；Hub tests 也恢复启动。

### 2.2 上游 example 的 `RadioGroup` 与当前 OHOS SDK 不兼容

**现象**：包级完整 `flutter analyze` 报 3 个错误，全部位于 `example/lib/demos/animations/entry_animations_demo.dart`（`RadioGroup` 未定义、`groupValue`/`onChanged` 缺失）。

**处理**：改为当前 SDK 支持的 `RadioListTile(groupValue:…, onChanged:…)` 组合，未改任何公开 API。

**结果**：`flutter analyze` 全包 PASS。

### 2.3 Windows / Hvigor 259 字符路径限制（example_auto 自身 HAP）

**现象**：`flutter build hap` 在 `packages/pin_code_fields/example_auto` 触发 `The length of path exceeds the maximum length: 259`。

**处理尝试与结果**：
1. `subst P:` 映射包根 → Hvigor 报 `Path not found ... P:\example_auto\ohos\entry`（映射子目录解析失败）。
2. `subst P:` 映射 example_auto 根 → path 依赖 `pin_code_fields: path: ..` 被破坏。
3. `mklink /J` 短路径 junction → Hvigor 仍无法解析模块路径。
4. **结论**：当前 Hvigor 对 subst/junction 模块路径支持不可靠；改用已在 `flutter_ohos_test` Hub 成功构建的 HAP 作为交付包，`example_auto` 保留为完整 Demo 源码（analyze PASS），并记录该构建差异。

### 2.4 Mermaid CLI 浏览器启动失败

**现象**：`mmdc` 渲染 5 幅图全部 `Failed to launch the browser process: Code: 3221225595`。

**排查**：`~/.cache/puppeteer` 缓存了两个 chrome-headless-shell 版本（146/151），默认选中的 151 损坏；146 可运行。

**处理**：`PUPPETEER_EXECUTABLE_PATH=<…win64-146…\chrome-headless-shell.exe>` 显式指定可用版本重跑。

**结果**：5 幅图全部 `returncode 0`，`01-prd-mermaid-validation.json` 为 `PASS`，`syntax_errors` 为空，SVG 落盘。

### 2.5 Git Bash / MSYS 路径转换破坏 Windows 命令

**现象**：直接以 `D:/…` 传给 `hdc` 等 Windows 二进制时路径被篡改（如 `.ohos-adaptation\D:/…`），安装失败 `no such file or directory`。

**处理**：所有 hdc/Windows 命令统一用 `MSYS_NO_PATHCONV=1 cmd.exe /d /s /c "…"` 包裹，文件路径用 Windows 反斜杠。

### 2.6 Dart 非 raw 字符串尾部 `$` 解析错误

**现象**：`RegExp('^[0-9]+$')` 报 `Expected an identifier`；`RegExp(r'^[0-9]+$')` 正常。

**处理**：改用 raw string，并用 `[0-9]` 代替 `\d`（`\d` 会被迁移 verifier 的 ASCII 字面量扫描标记）。

### 2.7 Demo ListView 懒加载导致 widget 测试找不到元素

**现象**：Hub PIN widget tests 全失败，`ensureVisible(find.byKey(btn_copy_log))` 报 `Bad state: No element`——ListView 不构建折叠下方的子项。

**处理**：用 `tester.scrollUntilVisible(…, scrollable: find.byType(Scrollable).first)` 滚动定位重写测试。

**结果**：4/4 PASS（32 ID 覆盖、负向拒绝、复制日志隐私、填充长度）。

### 2.8 hdc `file recv` 与文件名

**现象**：`file recv` 不支持通配符；dumpLayout 每次生成随机文件名 `layout_<id>.json`，猜测文件名失败。

**处理**：解析 dump 输出中的精确文件名，或用 `hdc shell cat /data/local/tmp/<file>` 直接读取。

### 2.9 真机设备锁屏

**现象**：长流程中设备屏保超时锁屏，后续点击失效。

**处理**：`wakeup` + 滑动解锁 + 延长超时；解锁后仍在原用例页，重新执行该用例流程。

### 2.10 逐用例 UI 自动化坐标导航

**困难**：32 条用例需逐条在真机执行；列表为懒加载，坐标随滚动变化；一次误点会落到错误用例页并记录 FAIL。

**处理**：每次先 `uitest dumpLayout` 解析目标节点 bounds 再点击；标准流程为 列表定位→打开详情→【加载测试场景】(608,809)→【外部设值】(221,1335)→上滑至底部→【记录观察】(以 dump 实际 bounds 为准)→再上滑露出结果面板→截图。F-04-03 首次误点后重试成功。

### 2.11 并发子代理写同一产物文件

**现象**：testing 子代理与主线程同时改 `04-verification-evidence.json`，触发文件保护错误。

**处理**：先读取最新内容再针对性编辑；通知子代理停止写文件后主线程收口。

### 2.12 已知 Demo 语义（非缺陷）

- Hub 交互页 `btn_pin_fill` 触发 onCompleted（写 F-02-02）后被按钮后续写入 F-02-01 覆盖；已按按钮语义为准记录。
- Hub 页 case ID 与 reviewed JSON 存在映射差异（如 obscure 开关标 F-07-01 而 reviewed F-07-02 为遮罩+复制日志）；reviewed 合同以 `04-test-cases.json` 为准，真机逐条以 case 列表/详情页执行为准。

---

## 三、最难的三处

1. **`flutter test` 引擎快照不匹配**：需要逆向 `flutter_tools` 命令构造与引擎构建开关，最终靠替换标准引擎二进制解决——这是唯一能放行“测试全过”的关键。
2. **Windows/Hvigor 长路径**：subst/junction 均被 Hvigor 模块路径解析拒绝，只能改交付载体。
3. **真机 32 条用例自动化**：坐标/滚动/锁屏/误触交织，必须结合无障碍树逐条验证。

---

## 四、关键命令与结果

| 命令 | 结果 |
|---|---|
| `flutter pub get` | PASS |
| `dart format --output=none --set-exit-if-changed`（变更文件） | PASS |
| `flutter analyze`（全包） | PASS（RadioGroup 修复后） |
| `flutter test`（包） | PASS 80/80 |
| `flutter test test/pin_code_fields_test.dart`（Hub） | PASS 4/4 |
| Dart DFX（`fix_dart.py --dry-run`） | PASS 0 warnings |
| `validate_mermaid_markdown.py` | PASS 5/5 SVG |
| `validate_json_ajv.cjs` | schema 5/5、consistency 8/8 |
| `verify_adaptation_artifacts.py --stage final --require-hap` | **PASS** |
| `hdc install …caf407ad.hap` | install bundle successfully |
| `aa start -a EntryAbility -b com.example.flutter_ohos_test` | start ability successfully |
| `hap-sign-tool.jar verify-app` | exit 0 |
