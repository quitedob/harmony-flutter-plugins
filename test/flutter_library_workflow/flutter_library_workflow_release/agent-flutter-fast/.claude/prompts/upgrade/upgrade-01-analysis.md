# 升级现状分析（Flutter 插件 HarmonyOS 适配升级）

你负责分析一个已完成 HarmonyOS 适配的 Flutter 插件，判断它需要如何跟随上游新版升级。

## 输入与目录

当前工作目录是已经完成 HarmonyOS 适配的 Flutter 插件仓库。先读取 `.ohos-adaptation/upgrade-manifest.json`，从中获取：

- 需要升级到的 Flutter SDK Version，来自 `library.targetFrameworkVersion`。
- 需要升级到的 HarmonyOS API Version，来自 `library.targetOsVersion`。
- 上游新版仓库目录，记为 `<upstream_dir>`，来自 `library.upstreamDir`，通常是 `../<库名>_upstream`。

当前目录是本次升级要修改的仓库；`<upstream_dir>` 是只读参考的上游新版 Flutter 插件仓库。

## 版本与环境检查

先读取当前目录和 `<upstream_dir>` 两边 `pubspec.yaml` 的 `version` 字段。若为联合插件，同时检查对应子包的 `pubspec.yaml`。如果版本一致，写入 PRD 说明当前适配仓库已与上游版本一致、无需升级，然后结束本阶段。

继续检查本机环境是否满足升级目标：

- 执行 `flutter --version`，和目标 Flutter SDK Version 对比。
- 执行 `ohpm --version`，记录本机 OHPM / HarmonyOS 工具链版本，并结合目标 HarmonyOS API Version 判断是否满足升级要求。

如果目标 Flutter SDK Version 或目标 HarmonyOS API Version 为空，说明本次不要求升级对应框架版本。若能明确判断当前环境低于目标版本，在 PRD 中写明当前版本、目标版本、阻塞原因和建议升级动作，然后结束本阶段。

## 准备 Git 基线

确认当前目录具备可记录本次升级的 Git 基线。`<upstream_dir>` 只作为上游源码目录参与对比，不需要初始化 Git。

1. 在当前目录创建或补充 `.gitignore`，至少包含：
```gitignore
.git
.ohos-adaptation
.claude
.opencode
CLAUDE.md
**/build/
**/node_modules/
**/oh_modules/
```
2. 如果当前目录不是 Git 仓库，执行 `git init`、`git -c core.autocrlf=false -c core.safecrlf=false add .`、`git commit -m "flutter ohos update init"`，建立当前适配代码基线。

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

## 输出 PRD

生成 PRD 时，从上游新版的公开 Flutter API 和用户可见能力整理功能全集，使用 `F-01`、`F-02`、`F-03` 顺序编号。`F-xx` 表示功能能力，不表示代码 diff 条目；diff 只用于判断该功能本次是新增、修改、删除还是无变化。

代码组织、文档注释、代码风格、Dart 语法写法、版本号、依赖约束、构建脚本、其他平台内部实现等变化，不单独作为 `F-xx`。如果这些变化影响 Flutter 对外 API、Channel 协议或用户可见行为，归入对应功能项说明；如果只影响代码同步或编译配置，写入差异摘要或依赖与配置变化。

写入 `.ohos-adaptation/01-analysis-prd.md`，使用中文，结构保持简洁：

```markdown
# Flutter 插件 HarmonyOS 更新 PRD

## 升级概览
- 上游版本：...
- 当前适配版本：...
- 目标 Flutter SDK：...
- 目标 HarmonyOS API：...
- 当前环境结论：满足 / 阻塞 / 不涉及

## 差异摘要
- Dart API 与实现变化：...
- 平台通道协议变化：...
- 依赖与配置变化：...
- Example 变化：...
- Native / FFI 变化：...
- 其他变化：...

## 功能列表
通过阅读新版本仓库 Flutter 代码，总结新版功能列表，使用 `F-01`、`F-02`、`F-03` 顺序编号。这里列的是 Flutter 公开 API / 用户可见能力清单，而不是 diff 修改点清单。每个编号对应一个功能能力。

| 编号 | 功能项 / Flutter API | 本次变化 |
|---|---|---|
| F-01 | ... | 新增 / 修改 / 删除 / 无变化 |

## HarmonyOS 升级任务
- 仅描述 HarmonyOS 侧需要适配的动作，例如 OHOS 插件实现、Channel 参数和返回值、权限映射、Example 展示、构建配置等。Android / iOS / Web / Desktop 等平台代码如何同步不在这里展开；具体需要调用哪些 HarmonyOS API 实现也不展开。

## 风险点
- 如有风险，说明 API 兼容性、平台能力差异、权限、Native/FFI、异步回调、数据类型或构建环境影响。
```

如果确认上游仅修改了其他平台适配代码或无关配置，Flutter API 与用户可见能力没有变化，在 PRD 中写明“未发现上游功能差异，仅需执行代码同步”。
