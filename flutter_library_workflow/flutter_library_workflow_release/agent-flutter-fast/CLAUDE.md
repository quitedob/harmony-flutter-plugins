# Flutter Agent

你负责将 Flutter 插件适配 HarmonyOS。
将所需的 JSON 和 Markdown 产物写入 .ohos-adaptation 目录下。
在任何时候都不要进入 Plan Mode。


## 可以调用的 Skill

- **`arkts-rules`**：编写或修改 `.ets` 时使用，确保代码符合 ArkTS 规则并能够编译。
- **`harmonyos-sdk-api-lookup` / `harmonyos-docs-lookup`**：查询 HarmonyOS API 签名、枚举、权限、Kit 用法和平台能力。由于资料字数非常多，只查询你本身不知道的必要的资料即可，不要过度查询。
- **`ohos-coding-guide`**：创建或修复 `ohos/` 工程时使用。每种插件类型都要先按 `.ohos-adaptation/01-analysis.json` 的 `plugin_type` 读取它，再加载对应类型的实现指导。
- **`flutter-adapted-library`**：已完成鸿蒙（OpenHarmony）适配的 Flutter 三方库。当需要判断某个 Flutter 依赖是否已有 OHOS 版本、获取适配仓库地址和版本信息、或寻找替代方案时使用此 Skill。
- **`native-library-substitution`**：Android / iOS / C++ 原生三方库的鸿蒙替代方案查询。仅用于原生依赖替代，不用于 Flutter 依赖替换，也不用于 FFI 源码编译策略。

HarmonyOS API、权限、文件、Want、网络、媒体、绘制、动画等能力不能按其他平台经验猜测。不确定时先查询官方资料，再编写代码。

## 编译与验证

- 编译前确认工具环境：执行 `flutter --version`、`dart --version`，Windows 下用 `Get-Command ohpm` 检查 `ohpm` 是否在 PATH 中。
- 如果 `ohpm` 找不到，优先定位 DevEco Studio 的 `tools/ohpm/bin` 并临时加入 PATH 后重试；`hvigor` 全局找不到不一定失败，优先使用 Flutter/项目脚手架自带构建链。
- Windows 下如果 Bash 调用 `.bat` 出现批处理递归、PATH 异常或命令找不到，改用 PowerShell 或 `cmd /c` 执行构建命令。
- Example 编译必须在 `example/` 目录执行，避免在插件根目录出现 `Target file "lib\\main.dart" not found`。
- **关闭 hvigor daemon（构建确定性）**：`flutter build hap` 前，确保 `example/ohos/hvigor/hvigor-config.json5` 的 `execution.daemon` 为 `false`（`flutter create` 生成的配置默认无 `execution` 块，需补上 `"execution": { "daemon": false }`）。
- 构建日志必须写入 `.ohos-adaptation/logs/coding-build.log`，只读取最后 20 行；失败时再搜索 `error|ERROR|BUILD FAILED|Exception|失败`。不要用 `tee` 或 `Tee-Object` 把完整日志刷到主日志里。

Windows 示例：

```powershell
New-Item -ItemType Directory -Force .ohos-adaptation/logs | Out-Null
flutter pub get
Push-Location example
flutter pub get
flutter build hap --debug *> ..\.ohos-adaptation\logs\coding-build.log
Pop-Location
Get-Content .ohos-adaptation/logs/coding-build.log | Select-Object -Last 20
```

非 Windows 示例：

```bash
mkdir -p .ohos-adaptation/logs
flutter pub get
cd example
flutter pub get
flutter build hap --debug > ../.ohos-adaptation/logs/coding-build.log 2>&1
cd ..
tail -20 .ohos-adaptation/logs/coding-build.log
```

编译失败必须修复。