# 升级代码编写（Flutter 插件 HarmonyOS 适配升级）

你负责把上游新版 Flutter 插件的变化合并到已完成 HarmonyOS 适配的仓库中，并补齐 OHOS 侧实现、Example 和构建验证。

## 输入与目录

当前工作目录是已经完成 HarmonyOS 适配的 Flutter 插件仓库。开始前读取：

先读取 `.ohos-adaptation/upgrade-manifest.json`，从中获取：

- 需要升级到的 Flutter SDK Version，来自 `library.targetFrameworkVersion`。
- 需要升级到的 HarmonyOS API Version，来自 `library.targetOsVersion`。
- 上游新版仓库目录，记为 `<upstream_dir>`，来自 `library.upstreamDir`，通常是 `../<库名>_upstream`。

当前目录是本次升级要修改的仓库；`<upstream_dir>` 是只读参考的上游新版 Flutter 插件仓库。

- `.ohos-adaptation/01-analysis-prd.md`：作为升级参考清单。
- 当前适配工程：重点阅读 `lib/`、`pubspec.yaml`、`ohos/`、`example/lib/`、`example/pubspec.yaml`、`example/ohos/`、Native/FFI 和配置文件，了解现有适配结构。

`<upstream_dir>` 用来查看上游新版源码和差异；当前目录用来落地升级代码。PRD 是参考，实际更新以本阶段重新执行的 diff、源码阅读和当前 OHOS 适配结构为准；PRD 漏掉但源码差异明确影响升级结果的内容，也要一并处理并写入报告。

## 获取差异清单

先获取差异文件清单，再按目录分组读取具体差异和源码。

- Windows PowerShell：
  ```powershell
  git -c core.autocrlf=false -c core.safecrlf=false diff --no-index --name-status "<upstream_dir>" "." 2>$null | Select-String -NotMatch '(^|[\s\\/])(\.git|\.ohos-adaptation|\.claude|\.opencode|build|node_modules|oh_modules)([\\/]|$)|(^|[\s\\/])CLAUDE\.md(\s|$)'
  ```
- Bash / macOS：
  ```bash
  git -c core.autocrlf=false -c core.safecrlf=false diff --no-index --name-status "<upstream_dir>" "." 2>/dev/null | grep -Ev '(^|[[:space:]/])(\.git|\.ohos-adaptation|\.claude|\.opencode|build|node_modules|oh_modules)(/|$)|(^|[[:space:]/])CLAUDE\.md([[:space:]]|$)'
  ```

只读取保留下来的差异文件。过滤掉的工作流文件、缓存目录、构建产物和 IDE 配置不进入分析内容。

必须基于 `--name-status` 输出的完整路径清单。禁止使用 `--stat`，它会折叠长路径，无法用于过滤文件、判断差异范围或决定要读取哪些文件。

## 分析范围

重点判断上游新版对 Flutter 对外能力、Dart 行为和平台通道协议的影响：

- Dart API 与实现：`lib/`、`bin/`、`pubspec.yaml`、`analysis_options.yaml`。
- 平台接口与通道协议：`platform_interface`、MethodChannel、EventChannel、PlatformView、Texture、FFI 的方法名、事件名、参数结构和返回结构。
- Native / FFI：`src/`、`native/`、`cpp/`、`csrc/`、`CMakeLists.txt`、`Cargo.toml`、C/C++/Rust 源码和动态库。
- Example 的 Flutter 层：`example/lib/`、`example/pubspec.yaml`。

Android / iOS / Web / Desktop 等平台实现可选阅读，作为理解上游行为的参考。当前目录中的 `ohos/`、`example/ohos/`、`platforms.ohos`、OHOS pluginClass、OHOS 依赖替换等内容作为当前 HarmonyOS 适配现状读取。

## 同步上游代码

先用 Git 命令辅助同步上游新版代码，再编写 OHOS 升级内容：

- 可以用 `git diff --no-index` 生成补丁，再用 `git apply --3way` 尝试合并。
- patch 范围放在上游 Flutter 代码和非 OHOS 平台代码上，保留当前目录现有 OHOS 适配代码。
- 应用 patch 前先基于差异文件清单过滤 `.ohos-adaptation`、`.claude`、`.opencode`、构建产物和依赖缓存。
- 出现冲突时，先解决冲突，再继续更新 OHOS 实现、Example 和构建。
- 将当前目录根 `pubspec.yaml` 的 `version` 字段同步为上游新版的值；联合插件中本次实际升级的子包也同步各自 `pubspec.yaml` 的 `version` 字段。
- 合并后执行 `git status` 和 `git diff`，复查是否误删、误覆盖或移动了 OHOS 适配文件。

## 使用目标版本配置

从 manifest 读取目标 Flutter SDK Version 和目标 HarmonyOS API Version，并用于本次升级：

- 检查当前目录的 `pubspec.yaml`、`example/pubspec.yaml` 和联合插件子包的 `pubspec.yaml`。如果 `environment.sdk` 或 `environment.flutter` 的最低版本低于目标版本，调整到满足目标版本的约束；如果只给出了 Flutter 目标版本，同时检查 Dart SDK 约束是否匹配。
- 检查 `ohos/`、`example/ohos/` 下的 `build-profile.json5`、`oh-package.json5` 和相关配置。SDK 版本字段只在 app 级的 `example/ohos/build-profile.json5` 的 `app.products[]` 里；插件模块 `ohos/`（HAR）没有 SDK 版本字段，无需改。
- 目标 HarmonyOS API Version 落到 `targetSdkVersion`（目标版本），不是 `compatibleSdkVersion`（最低兼容版本）。`targetOsVersion` 非空时，给 `example/ohos/build-profile.json5` 设 `targetSdkVersion = targetOsVersion`（格式如 `"5.1.0(18)"`）。
- 若没有填写目标 HarmonyOS API Version，且由于 SDK 版本兼容编译无法通过时，检查本机实际安装的 HarmonyOS SDK 版本，以本机已安装版本作为目标版本，可以相应修改 `targetSdkVersion` 等字段；`compatibleSdkVersion` 继续表示最低兼容版本。`runtimeOS` 保持为 `HarmonyOS`。

## 扫描 HarmonyOS API 变更

编写 OHOS 升级实现前，调用 `hmos-api-change-assitant` skill 扫描插件 HarmonyOS 模块在「当前 SDK 版本 → 目标 HarmonyOS API Version」之间受影响的 API，把变更报告作为本轮必须处理的修改清单。

先判断是否需要扫描：

- 从 `.ohos-adaptation/upgrade-manifest.json` 读 `library.targetOsVersion`。为空表示本次不要求升级 HarmonyOS API 版本，跳过扫描，并在最终报告注明。
- 起始版本取 `ohos/build-profile.json5`（必要时 `example/ohos/build-profile.json5`）`compatibleSdkVersion` 括号内的 API Level（如 `5.0.5(17)` → `17`）。把 `targetOsVersion` 归一化成 API Level：纯数字直接用，含 `(N)` 取 N，形如 `HarmonyOS_6.0.0(20)_Beta3` 的完整版本名原样传入。起止 API Level 相同时跳过扫描。
- 不确定合法版本取值时先执行 `--list-versions` 查看；若起始 Level 不在列表中，改用列表中最接近且不低于它的版本（或最低可用版本），并在报告注明。
- 扫描依赖本机 DevEco Studio（skill 使用其 JBR、ApiScanUtil JAR 与 Node 扫描器）。未安装时跳过扫描并在报告注明原因，不阻塞后续升级步骤。

调用 `hmos-api-change-assitant` skill 扫描插件 HarmonyOS 模块，变更报告输出到 `.ohos-adaptation/api-change/`（脚本位于 skill 的 `script/` 目录，macOS/Linux 用 `api-change-scan.sh`，Windows 用 `api-change-scan_windows.bat`）：

- macOS / Linux：
  ```bash
  .claude/skills/hmos-api-change-assitant/script/api-change-scan.sh \
    --project ohos \
    --start <起始API Level> --end <目标API Level> \
    --out .ohos-adaptation/api-change
  ```
- Windows（直接调用 bat，脚本内部已处理含空格的 DevEco 安装路径与 UTF-8 输出）：
  ```powershell
  & .\.claude\skills\hmos-api-change-assitant\script\api-change-scan_windows.bat --project ohos --start <起始API Level> --end <目标API Level> --out .ohos-adaptation\api-change
  ```

`example/ohos/` 若含自定义 ArkTS（非脚手架生成的 EntryAbility / 插件注册代码），用相同参数扫描到 `.ohos-adaptation/api-change-example/`，一并在下一步处理。

读取 `.ohos-adaptation/api-change/result.json`（或 `result.csv`），每行包含：`ApiDefinition`、`Language`、`Changed in SDK Version`、`Affected Versions`、`CodeLocation`（命中 `文件:行号`）、`Guidance link`（官方变更文档）。据此驱动本轮 API 变更适配：

- 打开 `Guidance link` 理解每条变更语义（签名调整、废弃、行为变化、新增必填参数等）。
- 到 `CodeLocation` 指向的 `ohos/` 源码按官方指导修改：更新接口签名、替换废弃 API、补齐新增参数，必要时加 API Level 运行时守卫。
- 改 `.ets` 时调用 `arkts-rules` skill 保证 ArkTS 合规可编译；新 API 签名不确定时用 `harmonyos-sdk-api-lookup` 查询，不要凭其他平台经验猜测。
- 仅在 `Affected Versions` 高版本生效的变更，若工程需保持向下兼容，加运行时版本判断，而不是直接抬高 `compatibleSdkVersion`。

## 编写 OHOS 升级实现

如果 diff 确认上游只修改了 Android / iOS / Web / Desktop 等平台内部实现，Flutter 对外 API、Dart 行为、平台通道协议、Native / FFI 接口和 Example 调用方式都没有变化，则无需修改 OHOS 适配代码；写入报告说明已同步或已参考的平台变更范围，以及判断 OHOS 无需改动的依据。

基于本阶段 diff 和源码判断，补齐 Dart、OHOS、Native/FFI 和 Example 中需要升级的内容：

- 保持已有 OHOS 适配入口和平台注册结构，非必要不要修改已适配功能代码。
- 新增或修改的 Flutter API 在 OHOS 平台路径下有对应实现。
- Channel 方法名、参数结构、返回结构、错误分支和异步回调与 Dart 调用端一致。
- PlatformView / Texture 同步更新组件属性、生命周期、渲染和事件处理。
- 文件、媒体、权限、Want、网络、设备能力等功能按 HarmonyOS 语义实现。
- Native / FFI 变化同步到 OHOS 构建配置、C/C++/Rust 源码、动态库打包和 Dart 加载路径。
- 依赖版本按上游要求更新，同时兼顾当前 Flutter SDK 和 OHOS 适配依赖的可用性。
- 平台能力存在差异时，在实现和报告中写清楚可交付行为、用户可见提示和影响范围。
- 根据上一步「扫描 HarmonyOS API 变更」产出的报告，修复 `ohos/` 中命中的废弃 / 签名变更 / 行为变化 API；改动只落在 OHOS 源码，不要回退到旧 API 规避。

## 更新 Example

检查 `example/lib/` 是否覆盖本次新增或修改功能：

- 每个新增或修改的核心功能都有可触发入口。
- 用户操作后能看到真实返回值、状态变化、回调结果或副作用说明。
- Example 通过插件 API 完成演示，保持主流程简洁可运行。
- 如果上游 Example 有相关变化，优先参考上游交互和参数组织方式，再结合当前 OHOS Example 结构落地。
- 发现未覆盖的功能，但非本次更新新增/修改的，不需要补齐。

同步检查 `example/ohos/` 的权限、Ability、metadata、资源和依赖配置，使 Example 能完成升级功能演示。

## 依赖安装与构建

此步骤必须执行。按项目现有要求执行依赖安装与构建验证。若构建日志中出现版本约束、废弃 API、SDK API 变化、类型或依赖错误，修复后重新验证。

## 提交与报告

升级代码、Example 和构建验证完成后，在当前目录提交一次本次升级改动，并记录 commit sha。若确认没有代码变更，报告中说明原因。

写入 `.ohos-adaptation/02-upgrade-coding-report.md`，使用中文简要说明：

- 本次实际分析和同步的 diff 范围。
- 升级点实现情况，按 PRD 中的 `F-xx` 对应说明。
- Example 覆盖情况。
- 依赖安装与构建结果。
- 本次提交的 commit sha。
- HarmonyOS API 变更扫描结果：起始 / 目标 API Level、命中条目数、已修复清单（`ApiDefinition` + `CodeLocation` + `Guidance link`）与未处理项；跳过扫描时注明原因（未要求升级 OS 版本 / 缺 DevEco / 起止 Level 相同 / Level 不在合法列表）。
- 仍未完全对齐的项目、原因、影响范围和后续建议。
