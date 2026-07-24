# 升级代码编写（Android SDK HarmonyOS 适配升级）

你负责把上游新版 Android SDK 的变化合并到已完成 HarmonyOS 适配的仓库中，并补齐 OHOS 侧实现、Demo 和构建验证。

## 输入与目录

当前工作目录是已经完成 HarmonyOS 适配的 SDK 仓库。开始前读取：

先读取 `.ohos-adaptation/upgrade-manifest.json`，从中获取：

- 需要升级到的 HarmonyOS OS 版本，来自 `library.targetOsVersion`。
- 上游新版仓库目录，记为 `<upstream_dir>`，来自 `library.upstreamDir`，通常是 `../<库名>_upstream`。

当前目录是本次升级要修改的仓库；`<upstream_dir>` 是只读参考的上游新版 Android SDK 仓库。

- `.ohos-adaptation/01-analysis-prd.md`：作为升级参考清单。
- 当前适配工程：重点阅读 `ohos_hardemo/library/`、`ohos_hardemo/entry/`、`ohos_hardemo/build-profile.json5` 等，了解现有适配结构。HAR Demo 工程位于 `ohos_hardemo/`。

`<upstream_dir>` 用来查看上游新版源码和差异；当前目录用来落地升级代码。PRD 是参考，实际更新以本阶段重新执行的 diff、源码阅读和当前 OHOS 适配结构为准；PRD 漏掉但源码差异明确影响升级结果的内容，也要一并处理并写入报告。

## 获取差异清单

先获取差异文件清单，再按目录分组读取具体差异和源码。

- Windows PowerShell：
  ```powershell
  git -c core.autocrlf=false -c core.safecrlf=false diff --no-index --name-status "<upstream_dir>" "." 2>$null | Select-String -NotMatch '(^|[\s\\/])(\.git|\.ohos-adaptation|\.claude|\.opencode|build|node_modules|oh_modules|\.gradle|\.cxx|\.preview|hvigorw|local\.properties)([\\/]|$)|(^|[\s\\/])CLAUDE\.md(\s|$)'
  ```
- Bash / macOS：
  ```bash
  git -c core.autocrlf=false -c core.safecrlf=false diff --no-index --name-status <upstream_dir> . 2>/dev/null | grep -Ev '(^|[[:space:]/])(\.git|\.ohos-adaptation|\.claude|\.opencode|build|node_modules|oh_modules|\.gradle|\.cxx|\.preview|hvigorw|local\.properties)(/|$)|(^|[[:space:]/])CLAUDE\.md([[:space:]]|$)'
  ```

只读取保留下来的差异文件。过滤掉的工作流文件、缓存目录、构建产物和 IDE 配置不进入分析内容。

必须基于 `--name-status` 输出的完整路径清单。禁止使用 `--stat`，它会折叠长路径，无法用于过滤文件、判断差异范围或决定要读取哪些文件。

## 分析范围

重点判断上游新版对 SDK 对外能力、平台行为和构建配置的影响：

- Java / Kotlin API 与实现：`src/main/java/`、`src/main/kotlin/`、`build.gradle` / `build.gradle.kts`。
- 公开类、接口、方法签名、回调、监听器和枚举变化。
- Gradle 构建配置：`compileSdkVersion`、`targetSdkVersion`、`minSdkVersion`、依赖声明、`proguard` 规则。
- 资源：`src/main/res/`、`src/main/assets/`。
- JNI / Native：`src/main/jni/`、`src/main/cpp/`、`CMakeLists.txt`、`.so`。
- Demo / Sample：`demo/`、`sample/`、`app/` 模块。

当前目录中的 `ohos_hardemo/` 目录作为当前 HarmonyOS 适配现状读取。

## 同步策略

SDK 升级不能使用 git apply 合并上游代码。Android 与 HarmonyOS 的语言和项目结构完全不同，diff 仅用于发现 API/行为变化。

同步方式：
- 使用 `git diff --no-index` 发现上游变化后，手动在 `ohos_hardemo/` 中编写对应的 ArkTS 实现。
- 合并后执行 `git status` 和 `git diff`，复查是否误删、误覆盖或移动了 OHOS 适配文件。

## 使用目标版本配置

从 manifest 读取目标 HarmonyOS OS Version，并用于本次升级：

- 更新 `ohos_hardemo/build-profile.json5` 中的 `targetSdkVersion` 为目标 OS 版本，保留 `compatibleSdkVersion` 不变。若不存在 `targetSdkVersion` 则忽略。
- 检查 `ohos_hardemo/library/oh-package.json5` 和 `ohos_hardemo/entry/oh-package.json5` 中 `@ohos/` 依赖的版本约束，若与目标 OS 版本不兼容则更新。
- 根据 PRD 中 OS 版本升级影响逐项修复：
  - **废弃 API** → 查找替换方案并更新实现
  - **行为变更** → 适配新的 API 行为（默认值、回调时机、错误码等）
  - **权限模型变更** → 更新 `module.json5` 声明和动态申请逻辑
  - **编译检查规则** → 修复触发编译错误的代码（类型约束、严格检查等）
  - **系统级 UX 行为变更** → 适配 entry/ 中的 UI 代码
  - **无障碍框架变更** → 补齐或修改无障碍属性
- 若 `ohos_hardemo/` 不存在，使用 `hardemo-template` Skill 创建工程结构。
- 若没有填写目标 HarmonyOS API Version，且由于 SDK 版本兼容编译无法通过时，检查本机实际安装的 HarmonyOS SDK 版本，以本机已安装版本作为目标版本，可以相应修改 `targetSdkVersion` 等字段；`compatibleSdkVersion` 继续表示最低兼容版本。`runtimeOS` 保持为 `HarmonyOS`。

## 扫描 HarmonyOS API 变更

编写 OHOS 升级实现前，调用 `hmos-api-change-assitant` skill 扫描 SDK HarmonyOS 模块在「当前 SDK 版本 → 目标 HarmonyOS API Version」之间受影响的 API，把变更报告作为本轮必须处理的修改清单。

先判断是否需要扫描：

- 从 `.ohos-adaptation/upgrade-manifest.json` 读 `library.targetOsVersion`。为空表示本次不要求升级 HarmonyOS API 版本，跳过扫描，并在最终报告注明。
- 起始版本取 `ohos_hardemo/build-profile.json5` 的 `compatibleSdkVersion` 括号内的 API Level（如 `5.0.5(17)` → `17`）。把 `targetOsVersion` 归一化成 API Level：纯数字直接用，含 `(N)` 取 N，形如 `HarmonyOS_6.0.0(20)_Beta3` 的完整版本名原样传入。起止 API Level 相同时跳过扫描。
- 不确定合法版本取值时先执行 `--list-versions` 查看；若起始 Level 不在列表中，改用列表中最接近且不低于它的版本（或最低可用版本），并在报告注明。
- 扫描依赖本机 DevEco Studio（skill 使用其 JBR、ApiScanUtil JAR 与 Node 扫描器）。未安装时跳过扫描并在报告注明原因，不阻塞后续升级步骤。

调用 `hmos-api-change-assitant` skill 扫描 SDK HarmonyOS 模块，变更报告输出到 `.ohos-adaptation/api-change/`（脚本位于 skill 的 `script/` 目录，macOS/Linux 用 `api-change-scan.sh`，Windows 用 `api-change-scan_windows.bat`）：

- macOS / Linux：
  ```bash
  .claude/skills/hmos-api-change-assitant/script/api-change-scan.sh \
    --project ohos_hardemo/library \
    --start <起始API Level> --end <目标API Level> \
    --out .ohos-adaptation/api-change
  ```
- Windows（直接调用 bat，脚本内部已处理含空格的 DevEco 安装路径与 UTF-8 输出）：
  ```powershell
  & .\.claude\skills\hmos-api-change-assitant\script\api-change-scan_windows.bat --project ohos_hardemo\library --start <起始API Level> --end <目标API Level> --out .ohos-adaptation\api-change
  ```

`ohos_hardemo/entry/` 若含自定义 ArkTS（非脚手架生成的 EntryAbility 代码），用相同参数扫描到 `.ohos-adaptation/api-change-entry/`，一并在下一步处理。

读取 `.ohos-adaptation/api-change/result.json`（或 `result.csv`），每行包含：`ApiDefinition`、`Language`、`Changed in SDK Version`、`Affected Versions`、`CodeLocation`（命中 `文件:行号`）、`Guidance link`（官方变更文档）。据此驱动本轮 API 变更适配：

- 打开 `Guidance link` 理解每条变更语义（签名调整、废弃、行为变化、新增必填参数等）。
- 到 `CodeLocation` 指向的 `ohos_hardemo/library/` 或 `ohos_hardemo/entry/` 源码按官方指导修改：更新接口签名、替换废弃 API、补齐新增参数，必要时加 API Level 运行时守卫。
- 改 `.ets` 时调用 `arkts-rules` skill 保证 ArkTS 合规可编译；新 API 签名不确定时用 `harmonyos-sdk-api-lookup` 查询，不要凭其他平台经验猜测。
- 仅在 `Affected Versions` 高版本生效的变更，若工程需保持向下兼容，加运行时版本判断，而不是直接抬高 `compatibleSdkVersion`。

## 编写 OHOS 升级实现

涉及 HarmonyOS 系统 API 用法（权限、设备能力、文件、媒体、网络等）必须使用 `harmonyos-sdk-api-lookup` / `harmonyos-docs-lookup` Skill 查证，不能凭 Android 经验或模糊记忆处理。API 签名和类型优先 `harmonyos-sdk-api-lookup`；开发指导和场景规则优先 `harmonyos-docs-lookup`。

基于本阶段 diff 和源码判断，补齐 ArkTS、OHOS、NAPI 和 Demo 中需要升级的内容：

- 保持已有模块入口和导出结构，非必要不要修改已适配功能代码。
- 新增或修改的 API 在 `library/` 下能走到对应 ArkTS 实现，补齐参数解析、返回值、错误分支和回调。
- 接口参数和返回值使用清晰的数据结构，与上游 Java/Kotlin 调用端保持语义一致。
- JNI / Native 变化同步到 NAPI 桥接：保留必要源码、补充 `CMakeLists.txt`、完成 NAPI 注册、提供 ArkTS 封装、配置 `build-profile.json5`。
- 资源变化同步到 `library/src/main/resources/`。
- 依赖变化更新 `oh-package.json5`。
- 平台能力存在差异时，在实现和报告中写清楚可交付行为、用户可见提示和影响范围。
- 若上游的变化 HarmonyOS 已有的实现使用了替代方案，不需要类似的修复，不要新增空实现，报告中给出说明即可。

## Demo 升级

检查 `ohos_hardemo/entry/` 的 Demo 是否能覆盖本次新增或修改功能：

Demo 涉及 HarmonyOS 系统 API 用法（权限声明、动态授权、系统级 UX 行为适配等）时，必须使用 `harmonyos-sdk-api-lookup` / `harmonyos-docs-lookup` Skill 查证，不能凭 Android 经验或模糊记忆处理。API 签名和类型优先 `harmonyos-sdk-api-lookup`；开发指导和场景规则优先 `harmonyos-docs-lookup`。

- 仅对上游**新增或修改**的 Demo 页面/组件使用 `android-to-harmonyos-ui-mapping` Skill 进行映射作为参考，以当前 `ohos_hardemo/entry/` 的实际结构为主，未变化部分保持不变。
- 新增或修改功能必须在Demo中体现
- 新增或修改的 Demo 页面/组件必须满足 UX 合规要求：边界动效、非一级界面提供返回按钮、色彩对比度达标。
- 修改已有 UI 代码不得破坏已有合规性。
- 升级 `targetSdkVersion` 后检查系统级 UX 行为变化对 Demo 的影响（沉浸式、权限弹窗、返回手势、组件默认动效/样式等），必要时适配。
- 每个 API 都要有可以操作的入口，在界面日志区显示真实返回值、状态变化或副作用。
- Demo 功能若依赖运行时权限，必须在 `module.json5` 中声明，并在代码中动态申请。

## 编译

此步骤必须执行。先执行 `hvigorw clean` 再编译：

在 `ohos_hardemo` 目录下依次执行（Windows 下按当前 shell 改写命令；检查 `hvigorw` 时使用 `Get-Command hvigorw`）：

```bash
cd ohos_hardemo
ohpm install
hvigorw -e clean --no-daemon
hvigorw -e assembleHar --mode module -p module=library@default -p product=default --no-daemon
hvigorw -e assembleHap --mode module -p product=default -p buildMode=debug --no-daemon
```

- HAP 不需要签名；如 hvigor 要求指定模块，在 HAP 命令追加 `-p module=entry`。
- 编译失败必须根据日志修复真实问题后重试；重试时也使用上述命令。
- 其余编译规范按 CLAUDE.md 执行。

如果 OS 版本升级后，构建日志中出现废弃 API、SDK API 变化、类型或依赖错误，必须修复。

## 提交与报告

升级代码、Demo 和构建验证完成后，在当前目录提交一次本次升级改动，并记录 commit sha。若确认没有代码变更，报告中说明原因。

写入 `.ohos-adaptation/02-upgrade-coding-report.md`，使用中文简要说明：

- 本次实际分析和同步的 diff 范围。
- 升级点实现情况，按 PRD 中的 `F-xx` 对应说明。
- OS 版本适配结果：逐项列出 PRD 中 6 项影响的适配状态（已修复 / 无影响 / 待处理）。
- UX 适配结果：列出因 OS 版本升级或上游 Demo 变化导致的 UI 修改。
- 依赖安装与构建结果。
- 本次提交的 commit sha。
- HarmonyOS API 变更扫描结果：起始 / 目标 API Level、命中条目数、已修复清单（`ApiDefinition` + `CodeLocation` + `Guidance link`）与未处理项；跳过扫描时注明原因（未要求升级 OS 版本 / 缺 DevEco / 起止 Level 相同 / Level 不在合法列表）。
- 仍未完全对齐的项目、原因、影响范围和后续建议。
