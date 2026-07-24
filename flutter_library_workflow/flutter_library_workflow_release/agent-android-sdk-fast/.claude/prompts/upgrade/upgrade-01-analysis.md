# 升级现状分析（Android SDK HarmonyOS 适配升级）

你负责分析一个已完成 HarmonyOS 适配的 Android SDK，判断它需要如何跟随上游新版升级。

## 输入与目录

当前工作目录是已经完成 HarmonyOS 适配的 SDK 仓库。先读取 `.ohos-adaptation/upgrade-manifest.json`，从中获取：

- 需要升级到的 HarmonyOS OS 版本，来自 `library.targetOsVersion`。
- 上游新版仓库目录，记为 `<upstream_dir>`，来自 `library.upstreamDir`，通常是 `../<库名>_upstream`。

当前目录是本次升级要修改的仓库；`<upstream_dir>` 是只读参考的上游新版 Android SDK 仓库。

## 版本与环境检查

SDK 项目需按多级策略定位版本：

1. 优先读取 `<upstream_dir>/` 和当前目录两边 `build.gradle` / `build.gradle.kts` 中的 `versionName` 或 `version`
2. 若无，读取 `pom.xml` 中的 `<version>`
3. 若无，读取 `AndroidManifest.xml` 中的 `versionName`
4. 若当前目录下已有 `ohos_hardemo/library/oh-package.json5`，读取其中的 `version`
5. 以上均无法定位时，使用各自仓库的 `git rev-parse --short HEAD` 作为版本标识

如果两边版本标识一致，写入 PRD 说明当前适配仓库已与上游版本一致、无需升级，然后结束本阶段。

继续检查本机环境是否满足升级目标：

- 执行 `ohpm --version`，记录本机 OHPM / HarmonyOS 工具链版本，并与 manifest 中目标 HarmonyOS OS 版本比较。

如果目标 HarmonyOS OS 版本为空，说明本次不要求升级 OS 版本，跳过环境检查直接继续。若目标版本非空且能明确判断当前环境低于目标版本，在 PRD 中写明当前版本、目标版本、阻塞原因和建议升级动作，然后结束本阶段。

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
**/.gradle/
**/.cxx/
**/.preview/
**/hvigorw/
**/local.properties
```
2. 如果当前目录不是 Git 仓库，执行 `git init`、`git -c core.autocrlf=false -c core.safecrlf=false add .`、`git commit -m "ohos sdk update init"`，建立当前适配代码基线。

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

## OS 版本升级影响分析

如果 manifest 中指定了目标 HarmonyOS OS Version，需要分析该版本升级对当前适配代码的影响：

1. **废弃 API**：目标版本中标记为 deprecated 或已移除的 API，检查 `ohos_hardemo/` 中是否使用了这些 API，列出受影响的功能和替换方案。
2. **行为变更**：目标版本中 API 行为发生变化（如默认值、回调时机、错误码、线程模型），列出受影响的实现和适配要点。
3. **权限模型变更**：目标版本中权限声明方式或运行时权限流程发生变化，列出需要修改的 `module.json5` 和动态申请逻辑。
4. **编译检查规则**：目标版本中 ArkTS 编译器新增的严格检查或类型约束，列出可能触发编译错误的现有代码。
5. **系统级 UX 行为变更**：目标版本中系统对沉浸式、返回手势、权限弹窗、组件默认动效/样式的行为变化，列出 Demo 可能受影响的 UI 表现。
6. **无障碍框架变更**：目标版本中无障碍属性或辅助功能 API 的变化，列出需要补齐或修改的属性。

如果未指定目标 OS Version，本节写"未指定目标 OS 版本，跳过 OS 版本升级影响分析"。

## 输出 PRD

生成 PRD 时，从上游新版的公开 Java / Kotlin API 中按能力域整理功能全集，使用 `F-01`、`F-02`、`F-03` 顺序编号。`F-xx` 表示功能能力域，不表示代码 diff 条目；diff 只用于判断该功能本次是新增、修改、删除还是无变化。

文档注释、代码风格、构建脚本、内部实现细节不单独作为 `F-xx`。如果这些变化影响 SDK 对外 API 或用户可见行为，归入对应功能项说明；如果只影响代码同步或编译配置，写入差异摘要。

写入 `.ohos-adaptation/01-analysis-prd.md`，使用中文，结构保持简洁：

```markdown
# Android SDK HarmonyOS 升级 PRD

## 升级概览
- 上游版本：...
- 当前适配版本：...
- 目标 HarmonyOS OS 版本：...
- 当前环境结论：满足 / 阻塞 / 不涉及

## 差异摘要
- Java / Kotlin API 与实现变化：...
- 构建配置与依赖变化：...
- 资源变化：...
- JNI / Native 变化：...
- Demo / Sample 变化：...
- 其他变化：...

## OS 版本升级影响
逐项列出 6 项影响分析结果。未指定目标 OS 版本时写"未指定目标 OS 版本，跳过"。

| 类别 | 影响描述 | 受影响功能/代码 | 适配要点 |
|---|---|---|---|
| 废弃 API | ... | ... | ... |
| 行为变更 | ... | ... | ... |
| 权限模型变更 | ... | ... | ... |
| 编译检查规则 | ... | ... | ... |
| 系统级 UX 行为变更 | ... | ... | ... |
| 无障碍框架变更 | ... | ... | ... |

## 功能列表
通过阅读新版本 Android SDK 源码，总结新版功能列表，使用 `F-01`、`F-02`、`F-03` 顺序编号。这里列的是 SDK 公开能力清单（按能力域整理），而不是 diff 修改点清单。每个编号对应一个功能能力域。

| 编号 | 功能项 / SDK API 能力域 | 本次变化概述 |
|---|---|---|
| F-01 | ... | 新增 / 修改 / 删除 / 无变化 |

## HarmonyOS 升级任务
- 仅描述 HarmonyOS 侧需要适配的动作，例如修改 HAR 实现方法、NAPI 桥接、权限映射、Demo 展示、构建配置等。具体需要调用哪些 HarmonyOS API 实现也不展开。

## 风险点
- 如有风险，说明 API 兼容性、平台能力差异、权限、JNI/NAPI、构建环境等风险。
```

如果确认上游仅修改了内部实现或无关配置等，公开 API 无变化，在 PRD 中写明"未发现上游功能差异，仅需执行代码同步"。如果上游仅修改了 Demo / Sample 代码但 SDK 公开 API 无变化，PRD 功能列表中标记为"无变化"，但在差异摘要的"Demo / Sample 变化"中记录，并在 HarmonyOS 升级任务中说明需要同步更新 `ohos_hardemo/entry/` 的 Demo 展示。
