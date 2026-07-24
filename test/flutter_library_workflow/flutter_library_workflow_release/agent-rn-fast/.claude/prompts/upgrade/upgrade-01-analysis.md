# 更新现状分析（React Native 插件 HarmonyOS 适配升级）

你负责分析一个已完成 HarmonyOS 适配的 React Native 插件需要如何跟随上游新版升级。**当前工作目录就是已经完成 HarmonyOS 适配的 React Native 插件仓库**。上游新版仓库目录记为 `<upstream_dir>`，来自 `.ohos-adaptation/upgrade-manifest.json` 的 `library.upstreamDir`，通常是 `../<库名>_upstream`（只读参考）。

## 输入

读取 `.ohos-adaptation/upgrade-manifest.json`，从中获取需要升级到的 React Native Version（含 RNOH 版本，如有）、需要升级到的 HarmonyOS API Version，以及上游新版仓库目录 `<upstream_dir>`（来自 `library.upstreamDir`，通常是 `../<库名>_upstream`）。当前目录本身就是已适配仓库。

## 版本检查

读取当前目录和 `<upstream_dir>` 两边 `package.json` 中的 `version` 字段。若两边版本一致，写入 PRD 时说明当前适配仓库已与上游版本一致，无需升级，然后结束本阶段。
若为 monorepo / 联合插件，`package.json` 可能在子目录中。同时记录两边 `react-native` 的依赖版本范围，作为框架版本比较依据。

**基线上游版本以分支为准、必须现读，别套固定数字**：已鸿蒙化仓库按 RNOH 版本分支（`br_rnoh0.72/0.77/0.82`），**每个分支对应的上游库版本不同**（例：gesture-handler `br_rnoh0.72`→上游 2.14.14、`br_rnoh0.77`→2.23.1；blob-util 0.72→0.19.6、0.77→0.22.1）。真正的上游基线记在 `./README.OpenSource` 的 `Version Number`（横杠前那截，如 `1.21.0-0.2.2` 取 `1.21.0`），比 `package.json` 的 version 更权威——用它判断"从哪个上游版本升"。RNOH 运行时版本也随分支变（0.77 分支多为 `@rnoh 0.77.x`，且各库引用方式不一：有的写版本号、有的 `file:...har`），从该分支的 `oh-package.json5` 现读，不要假设。

## 环境检查

先检查本机环境是否满足本次升级目标：

- 执行 `node --version`，读取当前 Node 版本；记录 当前目录中 RNOH 依赖（`@rnoh/react-native-openharmony` 等）的版本，与 manifest 中读取到的目标 React Native / RNOH Version 做版本比较。
- 执行 `ohpm --version`，记录本机 OHPM / HarmonyOS 工具链版本，与 manifest 中读取到的目标 HarmonyOS API Version 做版本比较。

如果 manifest 中目标 React Native Version 与目标 HarmonyOS API Version 为空，说明不需要升级框架版本。

如果 React Native / RNOH 或 HarmonyOS API 版本低于目标版本，写入 PRD，说明当前版本、目标版本、阻塞原因和建议升级动作，然后结束本阶段。

## Git 基线

确认 当前目录具备可记录本次更新的 Git 基线。`<upstream_dir>` 只作为上游源码目录参与 `git diff --no-index` 对比，如无 git，不需要初始化 Git 仓库。

- 初始化或提交前，先创建或补充 `.gitignore`，包含 `.git`、`.ohos-adaptation`、`.claude`、`.opencode`、`CLAUDE.md`、`**/build/`、`**/node_modules/`、`**/oh_modules/`、`**/.rn-build/`、`**/generated/`。
- 当前目录不是 git 目录时，在 当前目录下执行 `git init`、`git -c core.autocrlf=false -c core.safecrlf=false add .`、`git commit -m "rn ohos update"`，基线提交只包含插件源码和工程文件，不包含上述工作流文件和构建产物。

## 差异分析范围

对比 `<upstream_dir>` 与 当前目录，重点识别库本身对外接口、JS/TS 层行为和原生桥接契约的变化，比如：

- JS/TS API 与实现：`src/`、`index.ts(x)`、公开导出入口、`package.json`（`version`、`react-native`、`codegenConfig`）。
- Spec 与桥接协议：`src/` 下的 `*Spec.ts` / `*Spec.tsx`、`TurboModuleRegistry.get` 的模块名、`codegenNativeComponent` 的组件名、方法名、事件名、参数结构、返回结构、常量。
- 架构形态：上游是否从旧架构（`NativeModules` / `requireNativeComponent`）迁移到新架构（TurboModule / Fabric），或新增 / 删除 Spec。
- Native 相关代码：`android/`、`ios/` 中的 JNI/C/C++/so、`CMakeLists.txt`、`.c`、`.cc`、`.cpp`、`.h`、`.hpp`、`.so`。
- Example 的 JS 层：`example/src/`、`example/App.tsx`、`example/package.json`。

Android / iOS 平台实现可选阅读，作为理解上游行为的参考。当前目录中的 `ohos/`（`harmony/{short}`、`example`）、`oh-package.json5`、`build-profile.json5`、`RNOHPackagesFactory` 注册、OHOS 依赖替换等内容作为当前适配现状读取。

Git diff 使用方式：

- 先执行如下命令获取差异文件清单，并在命令输出中过滤噪音文件。命令返回码为 1 且有差异输出时，表示发现差异，继续分析即可。
- Windows PowerShell：
  ```powershell
  git -c core.autocrlf=false -c core.safecrlf=false diff --no-index --name-status "<upstream_dir>" "." 2>$null | Select-String -NotMatch '(^|[\s\\/])(\.git|\.ohos-adaptation|\.claude|\.opencode|build|node_modules|oh_modules|\.rn-build|generated)([\\/]|$)|(^|[\s\\/])CLAUDE\.md(\s|$)'
  ```
- Bash / macOS：
  ```bash
  git -c core.autocrlf=false -c core.safecrlf=false diff --no-index --name-status "<upstream_dir>" "." 2>/dev/null | grep -Ev '(^|[[:space:]/])(\.git|\.ohos-adaptation|\.claude|\.opencode|build|node_modules|oh_modules|\.rn-build|generated)(/|$)|(^|[[:space:]/])CLAUDE\.md([[:space:]]|$)'
  ```
- 对需要分析的文件读取源码，回到源码确认行为语义，避免只根据文件名判断。

## 输出报告

写入 `.ohos-adaptation/01-analysis-prd.md`，使用中文，结构如下：

```markdown
# React Native 插件 HarmonyOS 更新 PRD

## 1. 升级概览
- 目标 React Native / RNOH：...
- 目标 HarmonyOS API：...
- 当前架构形态：js-only / old-arch / new-arch / mixed-arch
- 当前环境结论：满足 / 阻塞

## 2. 差异摘要
由于代码差异可能过多，简要描述：

- JS/TS API 与实现变化：...
- Spec / 桥接协议变化：...
- 架构形态变化：...
- 依赖与配置变化：...
- Example 变化：...
- Native / C++ 变化：...
- 其他变化：...

## 3. 功能列表
通过阅读新版本仓库 JS/TS 与 Spec 代码，总结新版功能列表，使用 `F-01`、`F-02`、`F-03` 顺序编号。这里列的是 RN 公开 API / 用户可见能力清单，而不是 diff 修改点清单。每个编号对应一个功能能力。

| 编号 | 功能项 / RN API | 本次变化概述 |
|---|---|---|
| F-01 | ... | 新增、修改、删除... / 无变化 |

## 4. 升级任务
简要介绍 HarmonyOS 侧为了适配本次 RN API / 能力变化大致需要做的动作，例如修改 OHOS 侧 TurboModule / Fabric 实现、是否需重跑 codegen、RNPackage 注册、权限映射、Example 展示等等。Android / iOS 平台代码如何同步不在这里展开；具体需要调用哪些 HarmonyOS API 实现也不展开。

## 5. 风险点
可选。如有风险，列出 API / Spec 兼容性、旧架构迁移、跨边界名称一致性、平台能力差异、权限、Native/C++、事件与回调、数据类型、构建环境等风险。
```

生成功能列表时，从上游源码的公开 RN API 中整理功能全集，diff 结果用于标注每个功能的本次变化。diff 中出现的代码组织、文档、依赖、平台内部实现变化，只能作为判断某个功能是否变化的依据，不能单独变成 F-xx。文档注释、代码风格、TS 语法写法、版本号、依赖约束、构建脚本、Android / iOS 的内部实现细节，不单独作为 `F-xx`。这些内容只写在差异摘要或依赖与配置变化里。

如果平台内部变化、Spec 变化或依赖变化改变了 RN 对外 API、桥接协议或用户可见行为，把它们归入对应的 API / 能力项中说明；如果只影响代码同步或编译配置，不写入功能列表。

如果确认上游仅修改了其他平台的适配代码及无关配置等，RN 对外 API 无变化，从而 HarmonyOS 适配的代码不需要改动，则在 PRD 写明“未发现上游功能差异，仅需执行代码同步”等总结。