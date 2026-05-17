# agent-rn：React Native 模块鸿蒙化 Agent

本目录是 **RN → OpenHarmony** 适配流水线的 Agent 资源（`opencode.json`、`.claude/prompts/`、`.claude/skills/` 等）。管理面板克隆 GitHub 仓库后，会在该仓库根目录下通过工作区链接挂上这些资源，并按阶段调用各个 primary Agent。

文档结构：**环境门禁** → **文档检索 Skills** → **示例仓库验证** → **产物目录关系** → **第 5 节：适配路径概述** → **第 6 节：Windows 长路径** → **第 7 节：rn.py 工具使用**。

---

## 1. 环境检查与门禁（避免运行期报错）

执行 **测试阶段**（`primary-04-testing`）前，管理面板将运行本目录门禁脚本（见 `opencode.json` 中该阶段的 `gate_script`）。建议在执行该阶段前于本地完成预检，以降低执行中途失败概率。

### 1.1 管理面板与仓库侧

- **管理面板**：在 `adapt-workflow/` 下已执行 `npm install`，能正常 `npm start`（默认 http://localhost:3000）。
- **OpenCode / AI 后端**：已按项目要求安装并可调用（如 `opencode`），否则阶段任务无法下发。

### 1.2 Windows：门禁脚本具体检查什么

门禁实现见 [`scripts/gate-testing.js`](scripts/gate-testing.js)。**仅在 `win32` 下生效**；macOS / Linux 会直接通过门禁。

| 检查项 | 含义 |
|--------|------|
| **DevEco 工具链在 PATH 前列** | `where node`、`where java`、`where hvigorw` 得到的**第一条**路径须落在 **DevEco Studio 安装目录**下（路径中需包含 `DevEco Studio`）。否则 `ohpm` / `hvigorw assembleHap` 易混用系统 Node/JDK，导致构建异常。 |
| **`permission.external_directory` 放行本盘 `…/rn/**`** | 脚本会读取仓库根 `opencode.json`，要求存在针对**当前盘符**的 `rn` 目录放行项（例如盘符为 `D:` 时需含 `D:/rn/**`，Git Bash 下常见为 `/d/rn/**`）。用于避免 OpenCode 访问短路径 Example 时被策略拦截。若你的工程不在 `D:`，请同步修改 **`agent-rn/opencode.json`** 中的 `permission.external_directory`，并保证与仓库根链接一致。 |

**重要**：调整系统或用户环境变量（含 **PATH**）后，须**重启当前打开本项目的 IDE**（及其中终端），否则进程仍可能使用旧环境，导致 `where` 结果与门禁不一致或构建失败。

**手动预检（推荐）**：

```text
node agent-rn/scripts/gate-testing.js <插件仓库根目录绝对路径>
```

退出码 `0` 表示通过；失败时 **stderr** 会打印具体原因（PATH、`external_directory` 等）。

### 1.3 非 Windows

门禁脚本对非 Windows **不做上述 PATH / 盘符检查**；仍建议本机已安装 **DevEco / OHSDK**、`ohpm`、`hvigorw`，以便测试阶段真机构建。

---

## 2. 安装文档检索 Skills（Harmony-Skills）

规划、编码、测试等阶段会通过 **`sub-doc-search`** 查询鸿蒙 **SDK API** 与**开发文档**。请从仓库 [**HarmonyOS-AI/Harmony-Skills**](https://github.com/HarmonyOS-AI/Harmony-Skills) 取得下列两个 Skill，**整目录拷贝**到本仓库：

`agent-rn\.claude\skills\`

- **`harmonyos-sdk-api-lookup`** — 本地检索 HarmonyOS SDK 的 `.d.ts` 等，用于 API 签名与类型。
- **`harmonyos-docs-search`** — 检索官方开发指南、权限、Kit 等文档。

拷贝后 `.claude/skills/` 下应能直接看到上述目录名（与 `CLAUDE.md` 中「信息检索体系」表一致）。若 Skills 仓库中目录命名有版本后缀，以仓库内实际文件夹名为准，保持 Skill 名称可被 `sub-doc-search` 路由识别即可。

---

## 3. 示例仓库连通性验证

可选用体量较小的 TurboModule 仓库验证端到端链路：

**示例**：[`https://github.com/wneel/react-native-get-device-locale.git`](https://github.com/wneel/react-native-get-device-locale.git)

1. 在管理面板选择 **RN → 鸿蒙** Profile，添加上述 URL 并克隆至 `repos-rn/` 下对应目录（具体以面板行为为准）。  
2. 完成 **第 1 节（环境门禁）**、**第 2 节（文档 Skills）** 所列前置条件。  
3. 按顺序执行各阶段至 **测试**；该阶段将触发门禁。失败时依据门禁输出调整 PATH 或 **`agent-rn/opencode.json`** 中 **`permission.external_directory`** 后重试。  
4. 流水线运行通过后，在 **DevEco Studio** 中打开 **`ohos/example/harmony`**，运行到真机验证。

该示例为 **获取设备语言区域** 的 TurboModule（见上游 [README](https://github.com/wneel/react-native-get-device-locale)），适配完成后通常会出现 **`ohos/harmony/library`**（鸿蒙侧实现）与 **`.rn-ohos-adaptation/`** 产物；具体以分析阶段判定的模块类型为准。

---

## 4. 跑通后：新增与关键目录的关系

以下描述「典型、跑通后」在**插件仓库根目录**下会看到的内容（与 `CLAUDE.md` 约定一致）。

```
插件仓库根 (CWD)
├── ohos/                         # 鸿蒙适配工程目录 (由 rn.py create 生成)
│   ├── harmony/library/          # 鸿蒙原生库模块 (RNOH：ETS/C++、oh-package.json5、module.json5 等)
│   ├── example/                  # 验证用 RN + OHOS Example (通常为符号链接指向短路径)
│   │   ├── App.tsx               # RN 侧入口 UI：按已实现 API 生成调用/展示
│   │   ├── package.json / ...    # RN 依赖与打包入口
│   │   └── harmony/              # 鸿蒙套壳工程 (ohpm / hvigorw assembleHap)
│   └── .rn-build/har_wrapper/    # HAR 构建包装目录 (由 rn.py build har 使用)
├── package.json                  # JS 侧配置 (含 harmony 字段、autolinking、脚本依赖等)
├── src/                          # JS/TS 源码
│   ├── *Spec.ts / *Spec.tsx      # TurboModule / Fabric 的 Codegen Spec
│   ├── index.ts / *.ts(x)        # 对外导出、Platform.OS === 'harmony' 分支等
│   └── …                         # 视模块而定
├── .rn-ohos-adaptation/          # 适配流水线结构化产物 (JSON + Markdown 报告)
└── …                             # 原有 android/、ios/ 等
```

**关系简述**：

| 位置 | 作用 |
|------|------|
| **`ohos/harmony/library/`** | 与 npm 包通过 `package.json` 的 `harmony` 配置衔接的**鸿蒙侧实现**；测试通过后以这份为准。 |
| **`ohos/example/`** | **验证用**工程：引用本地包、挂接 `ohos/harmony/library`、打 bundle、`assembleHap`。 |
| **`ohos/.rn-build/har_wrapper/`** | 用于 `rn.py build har` 构建 HAR 包的包装目录，包含构建所需的鸿蒙工程结构。 |
| **根 `package.json` + `src/`** | JS 侧对外 API 不变或与 Spec 一致；鸿蒙分支与依赖声明在这里与 **`ohos/harmony/library`** 对齐。 |
| **`.rn-ohos-adaptation/`** | 各阶段 Agent 输出的结构化数据与报告，记录适配全过程。 |

工作区链接在仓库根提供 `.claude/`、`.opencode/`、`CLAUDE.md` 等（指向 **`agent-rn`**），此类路径通常**不纳入**业务侧版本控制的「新增源码」范围。

---

## 5. 适配路径概述：从 JS 契约到鸿蒙集成

本节按**手动适配**的逻辑顺序说明各环节的职责边界，与自动化 Agent 在概念上对应；实际执行可由流水线与 `tool-example` 内脚本承担。阅读顺序建议：**目标 → 契约定位 → Codegen（含依赖、脚本、输入输出）→ 原生实现 → 验证工程 → bundle 与 entry → 原生模块注册**。

### 5.1 目标

在 OpenHarmony 上保持与 Android / iOS **一致的对外 JS API**：相同的包名、`import` 路径及方法签名，使业务侧尽量少写平台分支，平台差异下沉至原生实现层。

### 5.2 JS 侧契约的定位

适配前须明确「契约」在仓库中的载体。**本仓库适配流水线仅支持 React Native 新架构**（TurboModule / Fabric Spec 与 Codegen），不覆盖旧架构 `NativeModules` 桥接。

| 契约内容 | 常见位置 |
|----------|----------|
| TurboModule / Fabric 的 Spec | `src/` 下 `*Spec.ts` / `*Spec.tsx`，或 `src/specs/` 等 |
| 对外导出 | `package.json` 的 `main` / `module` / `exports` 所指向文件（如 `src/index.ts`） |

鸿蒙侧模块名、方法签名须与 **Spec 与 JS 导出**一致，详见 `CLAUDE.md` 中 TurboModule / Fabric 命名约定。

### 5.3 Codegen（代码生成）

**Codegen** 依据 JS Spec 在 **`harmony/library`** 下生成 **C++ / ETS 胶水层**，是契约与原生实现之间的中间环节。以下自 **职责 → 工具链 → 脚本 → 输入配置 → 输出与后续工作** 分述。

#### 5.3.1 职责与边界

**Codegen** 依据 Spec 生成 **C++ / ETS 胶水层**，典型目录为：

- `ohos/harmony/library/src/main/cpp/generated/`
- `ohos/harmony/library/src/main/ets/generated/`

其职责限于 **桥接骨架与类型约束**，不包含业务语义（例如具体系统 API 调用、业务状态）。业务逻辑须在生成物之外的实现文件中完成。

#### 5.3.2 开发依赖

于**插件仓库根目录**安装与 **RNOH**、**RN** 版本匹配的 CLI 与运行时包，通常置于 `devDependencies`，例如：

```bash
npm install -D @react-native-oh/react-native-harmony-cli @react-native-oh/react-native-harmony --legacy-peer-deps
```

版本须与工程统一。仓库内 `rn.py init` 会自动扫描 Spec 并驱动后续步骤。官方说明见 [OpenHarmony RN usage-docs：codegen](https://gitcode.com/OpenHarmony-RN/usage-docs/blob/master/zh-cn/codegen.md)。

#### 5.3.3 `scripts.codegen` 配置

在根目录 `package.json` 的 `scripts` 中声明 `codegen`，调用 `react-native codegen-harmony`，并通过参数指定 C++ 与 ETS 输出路径，例如：

```json
"scripts": {
  "codegen": "react-native codegen-harmony --cpp-output-path ./ohos/harmony/library/src/main/cpp/generated --ets-output-path ./ohos/harmony/library/src/main/ets/generated"
}
```

路径须与 `ohos/harmony/library` 内 CMake 与 ETS 工程布局一致；具体参数以所用 CLI 版本为准。

#### 5.3.4 输入：`package.json` 的 `harmony` 字段

在根目录 `package.json` 的 **`harmony`** 中配置 **`codegenConfig`**（如 `specPaths`），声明 Spec 文件或目录，供 CLI 解析；亦可包含 **autolinking**、别名等，供 RNOH 解析该 npm 包。`rn.py` 工具会自动维护这些配置。

#### 5.3.5 输出目录与生成后工作

生成物落在 **`ohos/harmony/library/`** 下上述 `generated` 目录。完成 Codegen 后，须在 **`ohos/harmony/library/src/main/ets/`** 等位置实现 **TurboModule / RNPackage** 等待填写的逻辑，接入 `@ohos.*` 等系统能力；仅依赖 `generated` 通常不足以交付功能。

### 5.4 原生实现与工程配置

在 Spec 与 Codegen 就绪后，依次完成：

1. **ETS（及必要时 C++）**：实现 Spec 声明的方法体。  
2. **依赖与权限**：维护 `ohos/harmony/library/oh-package.json5`、`ohos/harmony/library/src/main/module.json5` 等。

### 5.5 验证工程（`ohos/example`）的作用

npm 包无可独立运行的宿主应用。须在 **`ohos/example`** 中安装待测包、编写调用入口、产出 Harmony 用 JS 资源，并使 **entry** 加载 bundle 且链接 **`ohos/harmony/library`**，方可通过 `hvigorw assembleHap` 验证集成。

### 5.6 本地包与 Example 依赖

1. 于插件根目录执行 **`npm pack`**，生成 **`包名-版本号.tgz`**（内容与发布至 npm 的包一致）。  
2. 在 **`ohos/example/package.json`** 的 **`dependencies`** 中使用 **`file:`** 引用，例如 `"react-native-xxx": "file:../../包名-版本号.tgz"`；相对路径依 Example 与插件根的目录关系确定。亦可采用 **`file:../../插件根目录`** 指向源码树，依团队规范选择。

由此，Example 中 `import` 路径与最终用户一致。

### 5.7 验证入口：`App.tsx`

在 `ohos/example` 中提供应用入口（如 **`App.tsx`**），调用待测模块的公开 API，覆盖 Spec 中需验证的方法，用于功能与集成验证。

### 5.8 Harmony JS 资源打包：`scripts` 与依赖前提

Example 须安装 **支持 Harmony 的 RN 依赖**（如 `@react-native-oh/react-native-harmony`），方可使用 **`bundle-harmony`** 等命令。模板中常见写法：

```json
"scripts": {
  "dev": "react-native bundle-harmony --dev"
}
```

入口文件、dev 开关、资源输出等以所用 CLI 与模板为准。执行前于 **`ohos/example/`** 完成 **`npm install`**。

### 5.9 bundle 产物路径

JS 与资源通常输出至 **`ohos/example/harmony/entry/src/main/resources/rawfile/`**（含 `bundle.harmony.js` 等），由 **entry** 在运行时加载，与 RN OHOS 壳工程约定一致。

### 5.10 鸿蒙原生侧接入：library 与 entry 的协作

JS bundle 仅承载脚本执行；**TurboModule / Fabric** 的鸿蒙实现位于 **`ohos/harmony/library`** 模块，须由 Example 的鸿蒙工程声明依赖并完成运行时注册。

**C++**

- **library**：在 `ohos/harmony/library/src/main/cpp/CMakeLists.txt` 中通过 `add_subdirectory` 纳入 `generated` 与手写源码，并 `target_link_libraries` 至 RNOH 所提供的库。  
- **entry**：在 `ohos/example/harmony/entry/src/main/cpp/CMakeLists.txt` 中 `add_subdirectory` 引用 **library** 的 cpp 工程；在 **`PackageProvider.cpp`** 中注册对应 **Package**。

**ETS（ArkTS）**

- **library**：在 `ohos/harmony/library/src/main/ets/` 实现 **RNPackage**、TurboModule 实现类等，与生成物衔接。  
- **entry**：在 **`RNPackagesFactory.ets`**（或等价文件）中注册 **RNPackage**。  
- **工程依赖**：在 **`ohos/example/harmony/build-profile.json5`** 的 **`modules`** 中注册 **library**；在 **`ohos/example/harmony/entry/oh-package.json5`** 中以 **`file:`** 声明对 **library** 的本地依赖。

整体上：**bundle** 提供 JS 执行环境；**`ohos/harmony/library`** 提供 RNOH 原生实现；**entry** 通过 CMake、`PackageProvider.cpp` 与 `RNPackagesFactory.ets` 将二者与待测库合并为可编译应用。

### 5.11 与多阶段流水线的对应关系

上述环节与 Agent 阶段 **分析 → 规划 → 编码（库）→ 测试（Example + HAP）** 相对应；各阶段结构化产物位于 **`.rn-ohos-adaptation/`**。

当前标准工作流已统一收敛至 `rn.py` 工具：
1. **`rn.py create`**：生成 `ohos/` 目录结构（含 `harmony/library`、`example`、`har_wrapper` 等模板）。
2. **`rn.py init`**：安装 npm/ohpm 依赖，扫描 `src/` 下的 Spec 并自动生成 TurboModule/Fabric 胶水代码。
3. **编码实现**：在 `ohos/harmony/library/src/main/ets/` 中填充业务逻辑。
4. **`rn.py build har`**：构建 HAR 包（唯一允许的 HAR 构建方式）。
5. **`rn.py build hap`**：完整打包 Example 并生成 HAP 用于真机验证。

旧版分散脚本（如 `apply_ohos_skeleton.py`、`generate_library_turbo.py` 等）已整合进 `rn.py`，不再推荐直接调用。

---

## 6. Windows 长路径与当前对策

在 **Windows** 上，插件仓库若位于 **`repos-rn/...`** 等较深路径，再叠加 **`node_modules`**、`example_auto/harmony` 构建产物等，总路径长度易触及系统与工具链限制，表现为 **`npm` / `ohpm` / `hvigorw` 异常**、退出码 **259 / 260** 或路径解析错误。

**本仓库当前采用的缓解方式**：

1. **缩短 Example 物理路径**：测试阶段可将完整 Example 置于盘符下的短路径目录（如 **`X:\rn\...`**），在插件仓库内以**符号链接或目录联接（junction）**指向该目录，使仓库内仍出现 **`example_auto/`** 便于编辑与版本管理，而实际构建在较短路径上执行。  
2. **OpenCode 目录权限**：**`agent-rn/opencode.json`** 中 **`permission.external_directory`** 对 **`D:/rn/**`**（及 Git Bash 形式的 **`/d/rn/**`**）等放行，避免 CLI 拒绝访问上述短路径工作区（与 **第 1 节** 门禁一致）。  
3. **在链接解析后的目录执行命令**：若 **`example_auto`** 为符号链接或联接，对 **`npm`、`ohpm`、`hvigorw`** 等须在 **`cd` 至链接解析后的真实路径** 再执行；详见 **`.claude/prompts/primary-04-testing.md`** 中的硬性规定。

---

## 7. rn.py 工具使用

`rn.py` 是 React Native OHOS 适配流水线的核心辅助 CLI，位于 `.claude/skills/tool-ohos-plugin-repo/tool/rn.py`。所有 npm/ohpm 安装默认使用国内镜像源。

### 7.1 命令一览

| 命令 | 说明 |
|------|------|
| `rn.py create --template=plugin [--force]` | 生成 ohos/ 脚手架；若已存在则检查并补充缺失模板文件 |
| `rn.py init [--module=auto\|turbo\|fabric\|both\|js-only]` | 安装依赖 + 生成 TurboModule/Fabric 代码（须在 create 之后执行） |
| `rn.py init-template` | 在 templates 目录下安装 npm/ohpm 依赖（用于模板预初始化） |
| `rn.py build har` | 构建 HAR 包（**唯一允许的 HAR 构建方式**） |
| `rn.py build hap [--apply-example]` | 打包 tgz + 构建 bundle + 组装 HAP；`--apply-example` 自动填充 entry 配置 |
| `rn.py clean` | 清理编译产物（node_modules、dist、harmony/library/build 等） |
| `rn.py repo-init <remote> <branch>` | 在 ohos 目录初始化 git 仓库，生成 .gitignore，清除签名配置 |

### 7.2 重要约束

- **HAR 构建**：**只能使用 `rn.py build har` 命令**，严禁直接使用 `hvigorw`、DevEco Studio 点击构建或其他任何非 `rn.py build har` 的方式。
- **镜像源**：所有 `npm install` 默认使用 `--registry=https://registry.npmmirror.com`，`ohpm install` 默认使用 `--registry=https://ohpm.openharmony.cn/ohpm/`。
- **执行顺序**：必须先 `rn.py create`，再 `rn.py init`，最后实现代码并 `rn.py build har` 验证。
- **已存在 ohos 目录**：`rn.py create` 检测到 ohos 目录已存在时，会**检查并补充缺失的模板文件**（如 README.md、LICENSE、harmony/library 等），不会删除已有内容；需全新创建时使用 `--force`。
- **library.har 提交**：`harmony/library.har` 文件需要提交到 git 仓库，已在 .gitignore 中排除忽略。
- **签名配置清除**：`rn.py repo-init` 会自动清除 `example/harmony/build-profile.json5` 中的签名配置，避免泄露个人签名。

### 7.3 `rn.py init-template`（首次必做）

**`rn.py init-template` 是提升整体适配效率的关键命令，建议在使用本工具前手动执行一次。**

#### 为什么需要手动执行？

`rn.py create` 命令在生成 `ohos/` 脚手架时，会从 `templates/` 目录复制模板文件到目标项目。如果模板目录中已预装了 npm/ohpm 依赖（即存在 `node_modules/`、`oh_modules/`），则：

1. **复制即用**：`rn.py create` 复制模板时，依赖文件一并带入项目，无需再次下载。
2. **避免重复安装**：每个新模块适配时，`rn.py init` 不再需要重新执行耗时的 `npm install` / `ohpm install`。
3. **显著提升速度**：依赖安装通常是整个流水线中最耗时的环节（尤其在国内网络环境下），预初始化后可节省大量等待时间。

#### 执行时机

**在克隆本仓库后、开始任何模块适配前，执行一次即可：**

```bash
cd agent-rn/.claude/skills/tool-ohos-plugin-repo
python tool/rn.py init-template
```

该命令会在 `templates/` 目录下并行执行 4 个安装步骤：

| 步骤 | 目录 | 命令 |
|------|------|------|
| 1 | `templates/example/` | `npm install --legacy-peer-deps --registry=https://registry.npmmirror.com --ignore-scripts` |
| 2 | `templates/example/harmony/` | `ohpm install --all --registry=https://ohpm.openharmony.cn/ohpm/` |
| 3 | `templates/har_wrapper/` | `ohpm install --all --registry=https://ohpm.openharmony.cn/ohpm/` |
| 4 | `templates/ohos_skeleton/` | `npm install --legacy-peer-deps --registry=https://registry.npmmirror.com --ignore-scripts` |

#### 注意事项

- **仅需执行一次**：除非模板内容发生变更（如更新 RN/OHOS 版本），否则无需重复执行。
- **忽略规则**：`templates/` 下的 `node_modules/`、`oh_modules/` 已加入 `.gitignore`，不会提交到版本库，每个开发者需自行初始化。
- **失败处理**：若某步骤失败，可检查网络或镜像源配置后重新执行，已成功的步骤不会重复安装。

### 7.4 模板说明

#### ohos/README.md

`rn.py create` 生成的 `ohos/README.md` 是 npm 包的用户文档，包含：

| 章节 | 内容 |
|------|------|
| 项目简介 | 基于哪个原始 RN 库适配 |
| 版本对应关系 | 鸿蒙版本 vs 原库版本 vs RN 版本 |
| 安装与使用 | `npm install` 命令和代码示例 |
| Link 配置 | Manual Link 详情（oh-package.json5、CMakeLists、PackageProvider.cpp、RNPackagesFactory.ets） |
| API 对照表 | 属性/方法及其 HarmonyOS 支持情况 |
| 快速验证 | 运行 Example 的详细步骤 |
| 约束与限制 | 兼容性要求 |

**注意**：
- README 中**禁止出现 `huawei` 字样**（Copyright、developer.huawei.com 链接等）
- Example 中 import 应使用**原始包名**（如 `react-native-xxx`），而非 `@react-native-oh-tpl/xxx`
- 原因是 `harmony.alias` 字段会自动映射原始包名到鸿蒙化包名

