# 纯 JS/TS 模块鸿蒙适配

**前置**：本次会话已完成 `create`、验证、`init`（见 `SKILL.md`）。无原生 HAR；**不**在本阶段 `build har`；HAP 在 testing 阶段验证。

## 与原生模块的差异（create / init）

| 步骤 | 原生模块 | js-only |
|------|----------|---------|
| create | `ohos_skeleton` | `ohos_skeleton_js` + 拷贝源码到 `ohos/src/` |
| init | 并行 ohos/example + codegen | 顺序：ohos install → pack → example install tgz |
| coding 编译 | `rn.py build har` | **跳过** |

详见 `common-setup-steps.md`。

## 数据来源

`02-planning.json`：`ohos_api_mapping`、`permission_mapping`、`rn_dependency_mapping` 等。

## 核心原则

**不需要**实现 ETS/C++。检查并适配 `ohos/src/` 内 JS/TS，处理 npm 依赖。

## 0) 前置检查

1. `library-fill-implementation.md`（避免 forwardRef 等常见错误）
2. 查看 `permission_mapping`（`user_grant` 按需处理）

## 1) 检查 JS 代码（按需）

- **不要**在 `ohos/src/` 新增 `Platform.OS === 'harmony'` 判断
- 若有 `android`/`ios` 分支，**删除其他平台分支**，保留鸿蒙可用逻辑
- **如果原代码已包含 `Platform.OS === 'harmony'` 判断，必须保留**，不要误删
- 对外 JS/TS 接口保持不变；**不修改**仓库根 `src/`
- **遇到 `createReactClass` / `React.createClass` / `react-timer-mixin` / `react-native-web` 等老式写法需改写成 ES6 class 时**：务必按 `library-fill-implementation.md` 0.5.1「生命周期迁移对照表」执行——render 依赖的初始化（如 `PanResponder.create` 赋给实例字段）必须放 **constructor**，不能挪到 `componentDidMount`，否则首帧白屏（`Cannot read property '...' of null`）

### 1.0) 配置 ohos/package.json（必做）

检查 `ohos/src/` 入口文件的扩展名，按源码语言选择对应配置：

#### 判断方式

查看 `ohos/src/` 下的入口文件（通常是 `index.js` 或 `index.ts` / `index.tsx`）：
- 入口为 `.js` → **JS 源码模式**
- 入口为 `.ts` / `.tsx` → **TS 源码模式**

#### JS 源码模式（入口为 `.js`）

JS 可被任何运行时直接消费，无需编译，所有入口直接指向源码：

```json
{
  "main": "./src/index.js",
  "module": "./src/index.js",
  "react-native": "./src/index.js",
  "types": "./src/index.js",
  "scripts": {}
}
```

移除 `prepare`/`build` 等构建脚本（如有），清空为 `"scripts": {}`。

#### TS 源码模式（入口为 `.ts` / `.tsx`）

TS 不能被 Node.js / Webpack 直接消费，`main`/`module`/`types` 必须指向编译产物；Metro 通过 `react-native` 字段直接读源码：

```json
{
  "main": "./dist/commonjs/index.js",
  "module": "./dist/module/index.js",
  "types": "./dist/typescript/index.d.ts",
  "react-native": "./src/index.ts",
  "source": "./src/index.ts",
  "scripts": {
    "prepare": "bob build"
  }
}
```

| 字段 | 指向 | 说明 |
|------|------|------|
| `react-native` | `./src/index.ts` | Metro bundler 优先读此字段，直接转译 TS 源码 |
| `source` | `./src/index.ts` | react-native-builder-bob 约定的源码入口 |
| `main` / `module` | `./dist/...` | Node.js、Webpack 等非 Metro 消费者走编译产物 |
| `types` | `./dist/typescript/index.d.ts` | 为 npm 消费者提供标准声明文件 |
| `prepare` | `bob build` | `npm publish` 时自动触发构建 |

> **注意**：当前工作流使用 tgz 本地安装，Metro 通过 `react-native` 字段解析源码，`dist/` 不存在也不影响本地开发。`prepare` 脚本仅在 npm 发布场景下触发。

### 1.1) 鸿蒙 JS 运行时 API 兼容性检查（必做）

鸿蒙 Hermes/QJS 引擎**不提供**部分浏览器标准全局 API。插件源码或其 npm 依赖（如 dayjs、lodash 等）可能在 JS 层直接使用这些 API，导致运行时崩溃。

**已知缺失的高频 API**：

| API | 常见来源 | 影响 |
|-----|---------|------|
| `Intl.DateTimeFormat` | dayjs timezone 插件、日期库 | 日期/时区计算崩溃 |
| `Intl.NumberFormat` | 数字格式化库 | 格式化崩溃 |
| `Intl.Collator` | 排序库 | 排序异常 |
| `fetch` | 网络请求库 | 请求失败 |
| `WebSocket` | 长连接库 | 连接失败 |
| `URL` / `URLSearchParams` | 路由、URL 解析 | 解析异常 |

**检查步骤**：

1. **扫描 `ohos/src/` 和已知依赖的 JS 源码**，搜索以下模式：
   - `Intl.`（Intl API 使用）
   - `new Intl`（Intl 构造调用）
   - `typeof Intl`（已有的兼容检测 — 无需修复）
   - `fetch(`（fetch API）
   - `new WebSocket`（WebSocket）
   - `new URL`（URL 构造）
2. **判断来源**：
   - 插件自身代码（`ohos/src/`）→ 在使用处加 `typeof` 守卫或 try-catch
   - npm 依赖内部使用 → **不在本阶段修改依赖**，记录到 03 产物的 `risk_items` 中，由 04 阶段在 example 入口注入 polyfill
3. **修复原则**：
   - 对 `ohos/src/` 中的直接使用：加 `typeof XXX !== 'undefined'` 前置判断，缺少时走降级路径
   - 对 `ohos/src/` 中的 polyfill 文件：确保内部调用也有守卫（不能假设 polyfill 一定被加载）
   - **不要**在库代码中注入全局 polyfill（polyfill 职责归 example 入口）

## 2) npm 依赖替换为 OHOS 版本（MANDATORY）

js-only 库的源码 `import` 使用**原始包名**（如 `react-native-pager-view`），但在鸿蒙上必须安装**对应的 OHOS 适配包**（如 `@react-native-ohos/react-native-pager-view`），因为只有 OHOS 包含有 Harmony 原生实现。OHOS 包通过 `harmony.alias` 让 Metro 将原始 import 路径重定向到 OHOS 包。

**如果不替换，`rn.py build hap` 即使编译通过，运行时也会白屏或崩溃**——原版 npm 包没有 Harmony 原生组件。

### 2.1 替换 `ohos/package.json` 中的原生依赖

从 `02-planning.json` 的 `resolved_ohos_deps` 读取映射，将 `ohos/package.json` 的 `peerDependencies` / `dependencies` 中的**原始包名替换为 OHOS 包名 + 精确版本**：

| `resolved_ohos_deps` 字段 | 操作 |
|--------------------------|------|
| `ohos_package` + `ohos_version` | 将 peerDependencies 中的 `original_name` 替换为 `ohos_package: ohos_version` |
| `dual_install == true` | **同时保留**原始包（版本用 `dual_install_version`）+ 添加 OHOS 包 |
| `dual_install == false` | **删除**原始包名条目，**只保留** OHOS 包名 |

示例：原 peerDependencies 为：
```json
"react-native-pager-view": "*",
"react-native-reanimated": ">=3.8.1",
"@shopify/flash-list": ">=1.0.0"
```

替换后（假设 resolved_ohos_deps 指定 reanimated 为 dual_install）：
```json
"@react-native-ohos/react-native-pager-view": "6.2.5",
"@react-native-ohos/react-native-reanimated": "~3.6.5",
"react-native-reanimated": "3.6.0",
"@react-native-ohos/flash-list": "~1.6.4"
```

> **注意**：`react` 和 `react-native` 保持不变，只替换 `resolved_ohos_deps` 中列出的条目。

### 2.2 其他依赖处理

| 状态 | 处理 | 位置 |
|------|------|------|
| `adapted`（在 resolved_ohos_deps 中） | 按 2.1 替换为 OHOS 版本 | `ohos/package.json` |
| `not_needed` / 纯 JS 依赖 | 保持不变 | — |
| `not_adapted` + 阻塞 | try-catch / 跳过 | JS/TS |

**`harmony.alias`**：须在 `ohos/package.json` 配置，否则 Metro 无法映射 import。

## 3) 常见问题

| 现象 | 原因 | 处理 |
|------|------|------|
| Unable to resolve module | 缺 `harmony.alias` | 补 alias（原始包名） |
| main 无法解析 | 根入口未拷到 `ohos/src/` | 补入口或检查 create |
| 静态资源缺失 | 未拷贝图片等 | 手动补到 `ohos/src/` 并保持相对路径 |

## 注意

- 无 `ohos/harmony/library/`
- 不要手工改 Example/Entry
- 完成后进入 `SKILL.md` 步骤 7 写产物；`build_status` 以 init/prepare 成功为准
