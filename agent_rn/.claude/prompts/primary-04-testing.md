# Testing Agent — Example RN 测试页 + 编出 HAP（`rn.py build hap --apply-example`）

## 本阶段在干什么（核心，必读）

本阶段**最重要**的一件事：**在 `ohos/example` 里，根据插件的对外 JS/TS 接口，写好 RN 测试页面**（能点、能调、能看结果），让 Example 应用真正去驱动你要验证的 API / 组件。

然后：

1. 用 **`rn.py build hap --apply-example`** 一条命令完成 **`ohos/` 下 npm pack**、example 侧 **npm install**、**应用模板步骤 5-8（修改代码）**、**JS bundle**、**ohpm install**、**hvigor assembleHap**；
2. **编译失败时**：根据日志判断问题在 **`ohos/harmony/library`（插件库）** 还是 **`ohos/example`（RN 页、entry 配置等）**，两边都可能要改；
3. **反复**：改代码 → 再跑 **`rn.py build hap --apply-example`**，**直到编出 HAP**（命令成功退出、产物存在）。

> **注意**：`rn.py build hap` 默认不修改代码，适合人工手动编译；自动化流程需带上 `--apply-example` 参数才会自动填充/更新 entry 配置、PackageProvider.cpp、RNPackagesFactory.ets 等。

**不是**「只跑脚本不写字」：骨架可以来自 03 的 `rn.py create`，但 **testing 的主体工作是补全/重写 Example 里的 RN 业务与测试 UI**，否则 bundle 里没有有效调用，测不出东西，也谈不上完整验证。

---

> **强制（最先执行）**：**创建 todo list**（对外接口清单 → 测试页任务 → `build hap` → **失败时**读 lessons + 按日志修库/example 再编 → 编写 README → 阶段产物），并随进度勾选。

> **硬性规定（链接场景）**：凡在 **`ohos/example` 或其子目录** 下 **手跑** `npm` / `ohpm` / `hvigorw` 等，若 `ohos/example` 为**符号链接或 junction**，必须先 **`cd` 到 `realpath` 后的真实目录**再执行。**编辑文件**仍可用仓库内 `ohos/example/...` 路径。优先用 **`rn.py build hap`**（内部对 example 用 `realpath`），减少 cwd 踩坑。

**产物**：成功的 HAP（以 `rn.py build hap` 成功为准）；ohos/README.md 用户文档；并写入本阶段约定下的 JSON/Markdown 产物。

## 可用 Skill

| Skill 名称 | 用途 |
|------------|------|
| `failure-lessons` | **编译失败修错时**对照；修复后可将新规律补进 `lessons.json` |

---

## 工作流程（按顺序执行，勿跳步）

| 步骤 | 做什么 | 完成条件 |
|------|--------|----------|
| 0 | 创建并维护 todo | 列表含下方各步，随进度勾选 |
| 1 | 空执行 `build hap` | 脚本自动填充依赖等信息（无需写代码） |
| 2 | 编写 RN 测试页 | 对外接口在 UI 上均有可触达路径 |
| 3 | `rn.py build hap` | 单次执行 **最长 20 分钟** |
| 4 | 失败则修错再编 | 每次失败先读 `failure-lessons` + 日志再改；直至退出码 0 且 HAP 存在 |
| 5 | 编写 ohos/README.md | 用户文档，包含安装、使用、版本对应、Link 配置、API 支持、兼容性等 |

### 步骤 0：创建 todo list

在继续任何实质工作前创建 todo，覆盖上表各步。

### 步骤 1：空执行 `rn.py build hap`

在写测试页之前，先空执行一次编译，让脚本自动填充依赖等信息：

```bash
python .claude/skills/tool-ohos-plugin-repo/tool/rn.py build hap --plugin-root . --apply-example
```

**原生模块**此步骤会：
- 自动打包 tgz 并安装到 example
- 自动修改 `entry/oh-package.json5` 和 `CMakeLists.txt`
- 自动执行 ohpm install
- 可能编译失败（因为测试页未写），但依赖配置已完成

**js-only 模块**此步骤会：
- 自动打包 tgz 并安装到 example
- **跳过** entry/oh-package.json5/CMakeLists.txt 修改（无原生代码）
- 自动执行 ohpm install
- 可能编译失败（因为测试页未写），但依赖配置已完成

> **前置要求**：原生模块需先执行 `rn.py build har` 生成 HAR。

### 步骤 2：根据插件对外接口编写 RN 测试页面（本阶段核心）

**优先检查原始仓库 Example：**

编写测试页前，**必须先检查原始仓库是否有 example 目录**：

1. 在**当前工作目录**（原始仓库根）查找 example 目录：
   ```bash
   ls example/
   ```
2. **若原始仓库有 example**：
   - 查看 `example/App.tsx` 或入口文件
   - 参考原始 example 的测试逻辑和 UI 结构
   - 适配到鸿蒙环境（可能需要调整部分平台特定代码）
3. **若原始仓库无 example**：
   - 根据插件对外接口自行编写测试页

**依据（至少读这些，按需补充）：**

- `.rn-ohos-adaptation/01-analysis.json`（或同目录 PRD/分析 md）— 能力清单、对外 API、组件名、原始仓库地址；
- `.rn-ohos-adaptation/03-coding-library.json` — `implemented_methods` / `not_implemented`、与实现相关的文件提示；
- 插件包 **入口**（如根目录 `index.ts` / `src/index.ts`）与 **README** — 认对外 export 与调用方式；
- **原始仓库 example**（如有）— 参考测试逻辑和示例代码。

**你要写的（主战场在 `ohos/example/`）：**

- 以 **`ohos/example/App.tsx`**（或工程约定的入口屏）为主，为**每个需要验证的对外方法 / Fabric 组件**提供：入口（按钮、路由或分区）、调用插件 API、**展示返回值 / 错误 / 状态**（`Text` / `Alert` / log 区等）；
- 若接口多，可拆 **`ohos/example/src/...`** 下组件，但须保证从入口可达；

**⚠️ 重要：import 包名规则**

- **必须使用原始包名 import**，如：
  ```tsx
  // 正确：使用原始包名
  import { getDeviceLocale } from 'react-native-get-device-locale';
  
  // 错误：不要使用鸿蒙化包名
  import { getDeviceLocale } from '@react-native-oh-tpl/react-native-get-device-locale';
  ```
- 原因：`ohos/package.json` 中配置了 `harmony.alias` 字段，会将原始包名映射到鸿蒙化包名
- 使用原始包名可以与 iOS/Android 保持一致，代码更通用

**自检（写页后再进入步骤 3）：**

- 每条 `implemented_methods`（或分析里的关键 API）是否都有**至少一条**可执行 UI 路径触达。
- **import 是否使用原始包名**：检查 App.tsx 中所有 import 是否使用原始包名（如 `react-native-xxx`），而非 `@react-native-oh-tpl/xxx`。
- **README 是否已写**：ohos/README.md 存在且包含必要章节（安装、使用、版本对应、Link、API 支持）。

### 步骤 3：统一编译 — `rn.py build hap`

在 **插件仓库根目录** 执行：

```bash
python .claude/skills/tool-ohos-plugin-repo/tool/rn.py build hap --plugin-root . --apply-example
```

可选：`--legacy-peer-deps`；需要全量重装/重打 bundle/ohpm 时用 **`--full`**。

**单次时限（硬性）**：每一次 **`rn.py build hap`**（含步骤 4 中每次重跑）**最长 20 分钟**。
- **未满 20 分钟**：须等待该次命令**自然结束**（退出成功或失败均可继续后续判断）。
- **已满 20 分钟仍未结束**：视为**超时**——记录情况、**终止该次执行**。

**产物检查（必做）**：命令执行完成后，必须验证以下三个产物是否生成：
1. **TGZ 包**：`ohos/{package-name}-{version}.tgz`（包名去 @ 和 /，如 `@scope/pkg` → `scope-pkg-version.tgz`）
2. **JS Bundle**：`ohos/example/harmony/entry/src/main/resources/rawfile/bundle.harmony.js`
3. **HAP 包**：`ohos/example/harmony/entry/build/default/outputs/default/entry-default-signed.hap`

若产物缺失，视为编译失败，进入步骤 4 修错。

### 步骤 4：直到编出 HAP — 读失败经验、修错与再编

若 **`rn.py build hap --apply-example` 失败**：

1. **读失败经验**：
   ```
   skill({ name: "failure-lessons" })
   read_file(".claude/skills/failure-lessons/lessons.json")
   ```
2. **读日志**：区分错误来源
   - **`ohos/harmony/library`（插件库）**：ETS/C++ 实现问题（仅原生模块有此目录）
   - **`ohos/example`**：RN 测试页、entry 配置问题
3. **改代码并重新编译**：
- **若需修改插件库代码**：
   - **若为原生模块（有 harmony/library）**：
     1. 修改 `ohos/harmony/library/` 下相关文件
     2. 执行 `rn.py build har` 重新编译 HAR
     3. 执行 `rn.py build hap --apply-example` 重新打包 tgz 并编译 HAP
   - **若为 js-only 模块（无 harmony/library）**：
     1. 修改 JS/TS 代码或 Example 配置
     2. 直接执行 `rn.py build hap --apply-example` 重新编译 HAP
- **若需修改 example 代码**：
      1. 修改 `ohos/example/` 下相关文件（如 `App.tsx`）
      2. 执行 `rn.py build hap --apply-example` 重新编译 HAP
4. **循环执行**，直至 **退出码 0** 且 **HAP 文件存在**。

### 步骤 5：编写 ohos/README.md（用户文档）

编译成功后，为 npm 包发布准备用户文档。README 是用户了解插件的第一入口。

**依据（必须读取）：**

- `ohos/package.json` — 包名、版本、描述、harmony.alias
- `.rn-ohos-adaptation/01-analysis.json` — 原始库信息、GitHub 链接
- `.rn-ohos-adaptation/03-coding-library.json` — 已实现/未实现的 API 列表
- 原库 README — 参考 API 文档格式

**README 必须包含：**

1. **项目简介**：基于哪个原始 RN 库适配，GitHub 链接
2. **版本对应关系**：鸿蒙适配版本 vs 原库版本 vs RN 版本 vs Autolink 支持
3. **安装**：`npm install @react-native-oh-tpl/xxx`
4. **使用**：代码示例（import 使用原始包名，由 harmony.alias 映射）
5. **Link 配置**：
   - Autolink 支持情况
   - Manual Link 详情（oh-package.json5、CMakeLists、PackageProvider.cpp）
6. **属性/API 对照表**：列出主要 API/属性及其 HarmonyOS 支持情况（yes/no/partially）
7. **约束与限制**：兼容性（RNOH 版本、SDK API、IDE 版本）
8. **遗留问题**：未实现的功能或已知问题
9. **开源协议**：与原库一致

**注意事项：**

- **禁止出现 `huawei` 字样**（Copyright、developer.huawei.com 链接等）
- import 示例使用**原始包名**（如 `react-native-get-device-locale`），而非 `@react-native-oh-tpl/xxx`
- 参考 `tool-ohos-plugin-repo/templates/ohos_skeleton/README.md` 模板结构
- js-only 模块参考 `templates/ohos_skeleton_js/README.md`（无 Manual Link 部分）

**写入位置**：`ohos/README.md`

## 注意事项

- **测试页是本阶段灵魂**：没有按对外接口写 RN 页，本阶段视为未完成核心目标。
- **前置门禁由框架自动执行**：失败时本阶段自动终止，无需 agent 处理。
- **链接路径**：手跑 npm/ohpm/hvigor 必用 **`EXAMPLE_REAL`**。
- **`rn.py build hap --apply-example` 单次最长 20 分钟**：每轮含重跑均遵守；超时须记录并终止该次，不得无限等。
- **路径过长**：仍超长则停编并记入报告。
- **阶段产物**：按项目约定写 `.rn-ohos-adaptation/` 下本阶段 JSON 与 Markdown。

通过以上流程，确保 **Example 能驱动插件对外接口**，并 **用 `rn.py build hap --apply-example` 编出 HAP**。
