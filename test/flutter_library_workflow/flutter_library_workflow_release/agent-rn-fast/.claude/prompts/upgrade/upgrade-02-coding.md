# 更新代码编写（React Native 插件 HarmonyOS 适配升级）

你负责把上游新版 React Native 插件的变化合并到当前已完成 HarmonyOS 适配的仓库中。**当前工作目录就是已经完成 HarmonyOS 适配的 React Native 插件仓库**。上游新版仓库目录记为 `<upstream_dir>`，来自 `.ohos-adaptation/upgrade-manifest.json` 的 `library.upstreamDir`，通常是 `../<库名>_upstream`（只读参考）。

## 输入

开始前读取：

- `.ohos-adaptation/upgrade-manifest.json`，从中获取需要升级到的 React Native / RNOH Version、需要升级到的 HarmonyOS API Version、上游新版仓库目录 `<upstream_dir>`（来自 `library.upstreamDir`，通常是 `../<库名>_upstream`）；当前目录本身就是已适配仓库
- `.ohos-adaptation/01-analysis-prd.md`
- 当前已适配工程情况。读取当前目录仓库中的 JS/TS 代码、Spec、ETS/C++ 代码、Example、`package.json`、`oh-package.json5`、`build-profile.json5`、RNPackage 注册处和构建脚本，了解实际工程结构与适配情况。

`<upstream_dir>` 是上游新版源码目录（只读），用来查看差异和补充行为依据；当前目录用来落地升级代码。

PRD 作为参考清单。实际代码如何更新，以本阶段执行的 `git diff`、源码阅读和当前 OHOS 适配结构为准；PRD 漏掉但源码差异明确影响升级结果的内容，补入报告并一并处理。

## 编码步骤

### 1. 获取升级差异

对比 `<upstream_dir>` 与 当前目录，重点识别库本身对外接口、JS/TS 层行为和原生桥接契约的变化，比如：

- JS/TS API 与实现：`src/`、`index.ts(x)`、公开导出入口、`package.json`（`version`、`react-native`、`codegenConfig`）。
- Spec 与桥接协议：`src/` 下的 `*Spec.ts` / `*Spec.tsx`、`TurboModuleRegistry.get` 的模块名、`codegenNativeComponent` 的组件名、方法名、事件名、参数结构、返回结构、常量。
- Native 相关代码：`android/`、`ios/` 中的 JNI/C/C++/so、`CMakeLists.txt` 等。
- Example 的 JS 层：`example/src/`、`example/App.tsx`、`example/package.json`。

Android / iOS 平台实现可选阅读，作为理解上游行为的参考。当前仓库实际使用的 HarmonyOS library、demo/app、工程配置和 RNPackage 注册等内容作为当前适配现状读取。

先确认 `<upstream_dir>` 的真实相对路径（以 manifest 的 `library.upstreamDir` 为准，通常 `../<库名>_upstream`；monorepo 时上游 `src/` 可能在 `packages/<pkg>/` 下），diff 与后续命令都用真实路径，避免对着不存在的路径反复报「No such file or directory」。

Git diff 使用方式：

- 先执行如下命令获取差异文件清单，并在命令输出中过滤噪音文件。命令返回码为 1 且有差异输出时，表示发现差异，继续分析即可。
- Windows PowerShell：
  ```powershell
  git -c core.autocrlf=false -c core.safecrlf=false diff --no-index --name-status "<upstream_dir>" "." 2>$null | Select-String -NotMatch '(\.git|\.ohos-adaptation|\.claude|\.opencode|build|node_modules|oh_modules|\.rn-build|generated)'
  ```
- Bash / macOS：
  ```bash
  git -c core.autocrlf=false -c core.safecrlf=false diff --no-index --name-status "<upstream_dir>" "." 2>/dev/null | grep -Ev '(\.git|\.ohos-adaptation|\.claude|\.opencode|build|node_modules|oh_modules|\.rn-build|generated)'
  ```
- 对需要分析的文件读取源码，回到源码确认行为语义，避免只根据文件名判断。

### 2. 使用目标版本配置

从 `.ohos-adaptation/upgrade-manifest.json` 中读取到目标 React Native / RNOH Version 和目标 HarmonyOS API Version 后，把它们用于本次升级结果：

- 检查 `./package.json`、`./example/package.json` 以及子包中的 `package.json`。如果 `react-native` 或 RNOH 依赖版本低于目标版本，调整到目标版本能满足的约束。
- 检查 当前目录OHOS 工程与 example 下的 `build-profile.json5`、`oh-package.json5` 和相关配置。目标 HarmonyOS API Version 用于 `targetSdkVersion` 或工程模板中等价的目标 SDK 字段；如果工程只有 `compatibleSdkVersion`，将它作为最低兼容版本保留，不因为目标版本更高而修改。RNOH 相关 OHOS 依赖版本按目标 RNOH 版本对齐。
- 若没有填写目标 HarmonyOS API Version，且由于 SDK 版本兼容编译无法通过时，检查本机实际安装的 HarmonyOS SDK 版本，以本机已安装版本作为目标版本，可以相应修改 `targetSdkVersion` 等字段；`compatibleSdkVersion` 继续表示最低兼容版本。`runtimeOS` 保持为 `HarmonyOS`。

### 3. 同步上游代码

先用 Git 命令把上游新版代码同步到当前仓库，再编写 OHOS 升级功能：

- 能用 Git 命令辅助合并的场景优先使用 Git，例如用 `git diff --no-index ...` 生成补丁、用 `git apply --3way` 尝试应用、用 `git status` 和 `git diff` 复查结果。
- patch 合并范围放在上游 JS/TS 代码、Spec 和非 OHOS 平台代码上，保留当前仓库已有的 HarmonyOS library、RNPackage 注册和 OHOS 依赖替换；合并后用 `git status` 和 `git diff` 复查删除、移动和覆盖的文件。
- 生成或应用 patch 前先基于差异文件清单过滤噪音文件。
- 出现冲突时先解决冲突，再继续更新 OHOS 实现、Example 和构建验证。

### 4. 编写升级功能

先读取实际目录树、各级 `package.json` scripts、`build-profile.json5`、`hvigorfile.*`、`oh-package.json5` 和已有构建说明，定位插件根目录、HarmonyOS library module、demo/app 根目录、demo 的 HarmonyOS 工程，以及它们之间的 HAR 和本地包依赖。

优先复用仓库现有的 codegen、pack/install、bundle、HAR 和 HAP 脚本；没有现成脚本时，再根据 Spec、输出目录和 Hvigor 配置组合对应命令。不要根据目录名称套用固定模板。

Codegen 仅在上游 Spec 有变化（新增 / 删除 / 修改 `*Spec.ts(x)`、方法签名、事件、常量）时执行；仅 JS 逻辑变、Spec 不变则跳过。旧架构新增能力先手写转成 TurboModule / Fabric Spec 再 codegen。

- 若仓库已有 `npm run codegen-lib` 等脚本，按脚本声明的 Spec 与输出目录重新生成代码；否则使用 `react-native codegen-lib-harmony ...`，参数以当前 Spec 和 HarmonyOS module 的实际路径为准。若报找不到 `codegen-lib-harmony`，在当前目录安装 `@react-native-oh/react-native-harmony-cli`：

  ```bash
  npm i -D @react-native-oh/react-native-harmony-cli --legacy-peer-deps
  ```

  这类仓库 peer 依赖常冲突（`ERESOLVE`），可带 `--legacy-peer-deps`；若因网络失败（`ETIMEDOUT`/`ENOTFOUND`），先 `npm config set registry https://registry.npmmirror.com` 再装。版本需与 RNOH 对齐。装完后执行实际 codegen 命令，并核对 `generated/` 与新 Spec 一致。

基于本阶段的 diff 结果和源码判断，编写需要升级的 JS/TS、OHOS 和 Example 功能：

- 保持已有 OHOS 适配入口和 RNPackage 注册结构，非必要不要修改已适配功能代码。
- 新增或修改的 API 在实际 HarmonyOS library module 的 ETS/C++ 实现中能走到对应实现。
- Spec 声明的方法签名、参数和返回值，与 ETS/C++ 实现和 JS 调用端保持一致。
- 依赖版本按上游要求更新，同时兼顾目标 RN / RNOH 版本和当前 OHOS 适配依赖的可用性。

修改实际 HarmonyOS library module 补齐更新内容。注意事项：

- TurboModule 功能补齐对应方法、参数解析、返回值、错误分支和回调；模块名与 `TurboModuleRegistry.get` 一致。
- Fabric / 自定义组件同步更新组件属性、生命周期、渲染或事件处理；`codegenNativeComponent` 名称一致，UI 保真复刻。
- library 的 RNPackage 在 example 的 `RNOHPackagesFactory` 中注册并返回非空数组；平台判断用 `Platform.OS === 'harmony'`。
- 文件、媒体、权限、Want、网络、设备能力等功能按 HarmonyOS 语义实现。
- Native / C++ 变化同步到 OHOS 的 `CMakeLists.txt`、C/C++ 源码、NAPI 注册、`PackageProvider.cpp` 和 `build-profile.json5`。
- 平台能力存在差异时，在实现和报告中写清楚当前可交付行为、用户可见提示和影响范围。

### 5. 更新 Example

检查 `example/App.tsx` 是否能覆盖本次新增或修改功能：

- 每个新增或修改的核心功能都有可触发入口。
- 用户操作后能在界面看到真实返回值、状态变化、回调结果或副作用说明。
- Example 调用插件 API 完成演示，保持主流程简洁可运行；用到的 RN 依赖换成 OHOS 包名。
- 如果上游 Example 有相关变化，优先参考上游交互和参数组织方式，再结合当前 OHOS Example 结构落地。

同步检查 example 的 harmony 工程权限、Ability、metadata、资源和依赖配置，使 Example 能完成本次升级功能的演示。

### 6. 依赖安装与构建

此步骤必须执行。构建耗时较长，等待构建 / 子任务时给足超时（建议 ≥ 20 分钟），不要用 5 分钟这类短超时中途打断，否则会误判为失败；若执行环境对单条命令有硬性短超时上限，改为在后台跑构建并轮询产物，或提示改由人工在本机跑构建。

先对齐 Node 版本：执行 `node --version` 确认当前版本。若上游工具链对 Node 有更高要求（例如新版 `react-native-builder-bob` 需 Node ≥ 20），而本机装了 nvm，就自己切换——用 `nvm list`（nvm-windows）或 `nvm ls`（类 Unix）查看已装版本，选一个满足要求的执行 `nvm use <version>`（如 `nvm use 22`），再复核 `node --version`。注意：nvm-windows 的 `nvm use` 全局生效（可能需管理员权限）；类 Unix 的 `nvm use` 只对当前 shell 生效，必须与后续命令连写在同一条命令里（如 `nvm use 22 && npm install`）。切换后若已有 `node_modules` 是旧版本装的，先删除再重装。没有 nvm 或未安装合适版本时，在报告写明所需 Node 版本；只有确认生命周期脚本不参与后续打包时，才临时使用 `--ignore-scripts` 完成依赖安装。

先装依赖：在 当前目录执行 `npm install`。常见三类报错分别处理：

- 因 `prepare` 脚本（常见是 `react-native-builder-bob` 的 `bob build`）失败 → 先确认 Node 版本并安装根目录 devDependencies。`--ignore-scripts` 只用于暂时完成依赖安装；后续若要执行 `npm pack`，而包定义了 `prepack` / `prepare`，仍需让对应脚本成功，不能把 `--ignore-scripts` 当作完整构建结果。
- peer 依赖冲突（`ERESOLVE`）→ 加 `--legacy-peer-deps`（这类仓库依赖树常不齐）。
- 网络失败（`ETIMEDOUT`/`ENOTFOUND`）→ 先 `npm config set registry https://registry.npmmirror.com` 再装。

即通常用 `npm install --ignore-scripts --legacy-peer-deps`。example 缺 `node_modules`/`oh_modules` 时，在 example 目录同样先装依赖（同样规则）。

### Windows 长路径处理

若出现`The length of path exceeds ... 259`、`restool Invalid input path`，即路径长度超过工具链限制，使用**物理短目录构建副本**：当前仓库仍是源码事实源；将源码复制到短目录，排除可重新生成的依赖和缓存，在短目录重新安装依赖并构建。短路径别名指向真实目录仍会被 Hvigor `realpath` 还原，不能解决问题。

Windows PowerShell 使用 `robocopy`，通过命令自动选择剩余可用空间最大的本机固定磁盘，复制到该磁盘的 `rn\<库名>`。以下命令中的源路径和库名根据当前库填写；目标目录必须是新建的真实目录：

```powershell
$src = "<当前库的绝对路径>"
$drive = Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3" |
  Where-Object { $_.FreeSpace -ne $null } |
  Sort-Object FreeSpace -Descending |
  Select-Object -First 1 -ExpandProperty DeviceID
if (-not $drive) { throw "未找到可用的本机固定磁盘" }
$libraryName = "<当前库名>"
$dst = Join-Path $drive "rn\$libraryName"
if (Test-Path -LiteralPath $dst) { throw "短目录已存在，请确认并清理后重试：$dst" }
New-Item -ItemType Directory -Path $dst -Force | Out-Null
robocopy $src $dst /E /MT:32 /R:1 /W:1 `
  /XD .git .ohos-adaptation .claude .opencode node_modules oh_modules .ohpm .hvigor build .rn-build .idea `
  /XF *.log /NFL /NDL /NJH /NJS /NP
if ($LASTEXITCODE -ge 8) { throw "robocopy 失败，退出码：$LASTEXITCODE" }
Set-Location $dst
```

依赖安装、codegen、打包和构建都在短副本中使用真实路径执行。构建中发现需要改代码时，把修复落到原仓库后重新同步；

按步骤 4 识别出的真实目录和仓库脚本完成构建：

1. 定位 HarmonyOS library module、demo/app 根目录和 demo 的 HarmonyOS 工程，确认 `build-profile.json5` 中的 module/product 名称及 HAR 引用关系。
2. 复用 demo HarmonyOS 工程已有的 RNOH 运行时；若 `oh_modules` 确实缺失，在该 HarmonyOS 工程执行 `ohpm install --all`。仍缺运行时时，再从与当前 RN/RNOH 版本对应的 `@react-native-oh/react-native-harmony` 中取得 `react_native_openharmony*.har`。
3. Spec 变化时执行仓库实际 codegen 命令，并核对生成代码；Spec 未变化时保留现有生成结果。
4. 原生 library module 需要 HAR 时，使用其 Hvigor 配置执行 `assembleHar --no-daemon`，并用本次新 HAR 替换 demo 实际引用的旧产物；纯 JS 包或仓库明确使用预构建 HAR 时按真实依赖关系处理。
5. 准备 demo 的插件包和 JS Bundle：若 demo 通过 `file:..` 安装当前插件并形成目录链接，优先执行仓库已有的 `install:pkg` / `pack:pkg`，或在插件根执行 `npm pack` 后从 demo 安装生成的 tgz，确保 Metro 读取的是本次代码。`npm pack` 会执行 `prepack`，需要先装好根目录 devDependencies。随后在 demo 的 HarmonyOS 工程执行 `ohpm install --all`，再回到 demo 根执行其 codegen / bundle 脚本（常见为 `npm run dev`，实际应包含 `codegen-harmony` 与 `bundle-harmony`），并确认 `bundle.harmony.js` 已写入 demo HarmonyOS 工程的资源目录。
6. 在 demo 的 HarmonyOS 工程使用实际 module/product 参数执行 `assembleHap --no-daemon`，完成 HAP 验证。

**构建结果自检（必做，别把"写了报告"当成"编译通过"）**：构建命令跑完后，回到磁盘确认本次需要的 HAR 和 HAP 确实产出，文件修改时间晚于本次代码改动；`hvigorw` 退出码 0 但 stdout 为空也要核实产物，仓库克隆时自带的旧文件不算本次结果。据实判定构建状态：`通过`（附产物相对路径 + 时间戳）/ `未构建`（原因，如缺 RNOH 运行时 / DevEco）/ `失败`（关键错误）。只有本次真实产出了所需 HAR/HAP 才可在报告写"构建通过"；否则如实写"未构建 / 失败"，不得删功能、空实现、跳模块或凭报告冒充通过。

如果 RN / RNOH / SDK 版本升级后，构建日志出现版本约束、废弃 API、SDK API 变化、类型或依赖错误，必须修复。若失败根因是构建工具链本身不满足（例如本机 Node 版本过低、缺 RNOH 运行时、缺 DevEco），先用上面的规避手段尽量推进 OHOS 构建；确实被环境卡死时，在报告中写清所需环境版本与已用规避手段，不得删功能 / 空实现 / 跳模块换取通过。

遇到 `SDK component missing`、`SDK management mode has changed` 等 SDK 配置错误时，先核对本机已安装 SDK 与 `build-profile.json5`。本机 SDK 可用但工程编译版本不一致时，按步骤 2 调整到本机版本后重新构建，并修复由 SDK 升级产生的废弃 API、类型和依赖问题；只有本机 SDK 组件确实缺失或损坏时，才按环境问题记录。

## 输出报告

写入 `.ohos-adaptation/02-upgrade-coding-report.md`，使用中文简要说明：

- 本次执行的 diff 范围和结论。
- 实际识别到的 library module、demo/app、HarmonyOS 工程路径，以及使用的构建命令。
- 若启用了短路径构建，说明短物理目录。
- 目标版本落地情况与是否重跑 codegen（Spec 是否变化）。
- 升级点的实现。
- 依赖安装与构建结果：明确写**构建状态（通过 / 未构建 / 失败）**；通过则附本次产出的 HAR 相对路径与时间戳；未构建或失败则写清原因（如已按上述 `npm i @react-native-oh/react-native-harmony` + `unpack-harmony` 获取运行时仍失败、缺 DevEco、超时）与所需环境——「无 RNOH 运行时」不是可直接跳过构建的理由，必须先尝试获取。
- 如有仍未完全对齐的项目，写明对应 `F-xxx`、原因、影响范围和后续建议。
