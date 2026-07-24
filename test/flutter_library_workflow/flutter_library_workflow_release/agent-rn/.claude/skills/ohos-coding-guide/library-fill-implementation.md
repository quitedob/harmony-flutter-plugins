# 鸿蒙库「填充实现」通用规程

本文件是**鸿蒙编码经验总汇**，与具体模块类型（如 `turbo-module.md`、`fabric-component.md`）配合使用：
- **类型文件**：脚手架命令、目录约定、类型特有文件路径
- **本文件**：API 实现通用做法 + 平台差异预防 + 经验总结

在编写或修改任何代码前，必须先阅读本文件的预防性指导。

---

## 前置必读：Harmony 平台差异预防

### 核心认知

> **参考 Android/iOS 的功能设计，验证 Harmony 的实现细节，针对差异适配**  
> Harmony 的导出形态/API实现可能不同，不能照搬 Android/iOS 代码。

### 0.1 导出形态差异（最常见）

**组件导出对比**：

| 组件 | Android/iOS | Harmony | 是否可继承 |
|------|-------------|---------|-----------|
| ScrollView | `class extends Component` | `React.forwardRef(Wrapper)` | ❌ |
| FlatList | `class extends Component` | `React.forwardRef(Wrapper)` | ❌ |
| TextInput | `class extends Component` | `React.forwardRef(Wrapper)` | ❌ |
| View | `class extends Component` | 函数组件或 forwardRef | ❌ |
| Image | `class extends Component` | `React.forwardRef(Wrapper)` | ❌ |

**验证方法**：
```bash
# 检查 Harmony 专用文件末尾导出
grep 'module.exports\|React.forwardRef' \
  node_modules/@rnoh/react-native-openharmony/Libraries/Components/ScrollView/ScrollView.harmony.js

# 若看到 React.forwardRef(...) → 该组件不可被 extends
```

**预防性编码**：
```javascript
// ❌ 避免：直接继承平台组件
class MyComponent extends ScrollView { }

// ✓ 正确：组合 + ref 转发
class MyComponent extends React.Component {
  _ref = null;
  
  render() {
    return <ScrollView ref={ref => this._ref = ref} {...this.props} />;
  }
  
  // 若组件被用作 scroll ref（如 VirtualizedList），必须转发 API
  scrollTo = (options) => this._ref?.scrollTo?.(options);
  getScrollResponder = () => this._ref?.getScrollResponder?.();
}
```

**何时必须转发 API**：
- 组件交给 `VirtualizedList` 的 `renderScrollComponent`
- 其他库会调用 `scrollTo`、`getScrollableNode` 等
- 组件作为 `ref` 被外部访问

### 0.1.1 双入口 JS 模块（根 `index.js` + `src/index.js`）

部分插件（如 `react-native-navigation-bar-color`）在仓库根有 **barrel**，实现落在 `src/`：

| 文件 | 常见导出 |
|------|----------|
| 根 `index.js` | `export default changeXxx`（**单个函数**）+ `export { hideXxx, showXxx }` |
| `src/index.js` | TurboModule / NativeModules 实现 |

`rn.py create` 会把根 `index.js` 拷到 `ohos/src/index.js`。若 Example 或业务使用：

```javascript
import NavigationBarColor from 'react-native-navigation-bar-color';
NavigationBarColor.showNavigationBar();
```

则 **`ohos/src/index.js` 的 `export default` 必须是带齐方法的对象**，不能仍是单个函数。

**正确 barrel（`ohos/src/index.js`）**：

```javascript
import { changeNavigationBarColor, hideNavigationBar, showNavigationBar } from './src';

const defaultExport = {
  changeNavigationBarColor,
  hideNavigationBar,
  showNavigationBar,
};

export default defaultExport;
export { changeNavigationBarColor, hideNavigationBar, showNavigationBar };
```

**与上游 README 的关系**：上游推荐 `import changeNavigationBarColor, { hideNavigationBar } from '...'`（具名导入），与根 `index.js` 一致；鸿蒙 Example 若用 default 对象写法，必须按上表改 barrel。`rn.py create` 对「根 default 为单函数 + 多具名导出」会自动生成对象 default（见 `build_harmony_dual_entry_barrel`）。

**改完后必做**：`cd ohos && npm pack` → example `npm install --force file:../xxx.tgz` → `npm run dev` 重打 `bundle.harmony.js`（否则真机仍跑旧 bundle）。

### 0.2 API 实现差异检查

**TurboModule 缺失预防**：
```javascript
// ❌ 避免：假定 API 存在
const module = TurboModuleRegistry.get('XXX');
module.method();

// ✓ 正确：存在性检查 + fallback
const module = TurboModuleRegistry.get('XXX');
if (!module) {
  if (Platform.OS === 'harmony') {
    return fallbackImplementation();
  }
  throw new Error('TurboModule XXX not available');
}
return module.method();
```

**常见缺失模块**（真机日志可见）：
- `NativePerformanceCxx`
- `RedBox`
- `NativeAnimatedModule`

### 0.3 编码前必做检查清单

**遇到任何平台相关代码时**：

1. **组件继承检查**（触发条件：`extends X`）
   - 判断 X 是否为平台组件
   - 若是 → 读 `X.harmony.js` 验证导出形态
   - 若为 `forwardRef` → 改为组合 + ref 转发

2. **API 调用检查**（触发条件：`NativeModules.*` 或 `TurboModuleRegistry.get()`）
   - 搜索 `@rnoh/react-native-openharmony` 源码验证存在性
   - 若缺失 → 提供 Harmony fallback 或跳过功能

3. **平台判断检查**（触发条件：`Platform.OS`）
   - ✓ 使用 `Platform.OS === 'harmony'` 明确判断
   - ❌ 禁止排除法 `Platform.OS !== 'android' && Platform.OS !== 'ios'`

---

## 0.5 废弃 API 兼容修复（ohos/src/ 拷贝完成后立即执行，优先于任何实现工作）

读取 `01-analysis.json` 的 `deprecated_api_usage` 字段。若数组非空，对 `ohos/src/` 下**所有匹配文件**执行以下批量修复：

### 修复映射表

| 废弃 API | 检测模式 | 修复方式 | 示例 |
|----------|----------|----------|------|
| `ViewPropTypes` | `import { ViewPropTypes } from 'react-native'` + `ViewPropTypes.style` | 移除 `ViewPropTypes` 导入；`ViewPropTypes.style` → `PropTypes.object`；添加 `import PropTypes from 'prop-types'` | keyboard-spacer, photo-browser |
| `ViewPropTypes \|\| View.propTypes` | `(ViewPropTypes \|\| View.propTypes).xxx` | 改为 `((ViewPropTypes \|\| View.propTypes) \|\| {}).xxx` | swipeout |
| `PropTypes` from react | `import { ..., PropTypes } from 'react'` | 移除 `PropTypes` 从 react 的导入；添加 `import PropTypes from 'prop-types'` | popup（React 15 风格） |
| `ColorPropType` | `import { ColorPropType } from 'react-native'` | → `PropTypes.string` | RN 0.72+ 移除 |
| `EdgeInsetsPropType` | `import { EdgeInsetsPropType } from 'react-native'` | → `PropTypes.object` | RN 0.72+ 移除 |
| `PointPropType` | `import { PointPropType } from 'react-native'` | → `PropTypes.object` | RN 0.72+ 移除 |
| `React.createClass` | `React.createClass(` 调用 | 改为 ES6 class 或使用 `create-react-class` 包 | React 16+ 移除 |

### 间接引用（封装层）处理

部分插件将 `ViewPropTypes` 封装在独立的中间文件（如 `lib.js`、`ViewPropTypes.js`）中再 re-export：

```js
// lib.js — ViewPropTypes 封装层
import { View, ViewPropTypes as RNViewPropTypes } from 'react-native';
const ViewPropTypes = RNViewPropTypes || View.propTypes;  // 两者都是 undefined
export default ViewPropTypes;

// index.js — 通过 import 间接引用
import ViewPropTypes from './lib';
style: ViewPropTypes.style  // ← undefined.style → TypeError
```

**这种模式不能仅修 index.js**（因为 `ViewPropTypes` 整体是 `undefined`，访问 `.style` 就已报错）。必须**同时修复封装层和消费层**：

1. **封装层**（`lib.js`）：添加 `|| {}` 空对象兜底
   ```js
   const ViewPropTypes = RNViewPropTypes || View.propTypes || {};
   ```
2. **消费层**（`index.js`）：将 `ViewPropTypes.style` 替换为 `PropTypes.oneOfType([PropTypes.object, PropTypes.array])`（功能完全等价于原始 `ViewPropTypes.style`）

**检测方法**：
```bash
# 检测直接引用
grep -rn 'ViewPropTypes' ohos/src/ --include="*.js" --include="*.ts"
# 检测封装层 re-export（lib.js 等中间文件）
grep -rn 'export default.*PropTypes\|export.*ViewPropTypes' ohos/src/ --include="*.js" --include="*.ts"
```

### 执行步骤

1. **批量扫描**：`grep -rn 'ViewPropTypes\|ColorPropType\|EdgeInsetsPropType\|PointPropType' ohos/src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"`
2. **识别引用链**：对每个命中文件，判断是直接引用（从 `react-native` 导入）还是间接引用（从本地文件如 `./lib` 导入）。间接引用须追溯到封装层文件，两处同时修复
3. **逐文件修复**：对每个命中文件，按上表执行修复。`ViewPropTypes.style` 的**精确等价替换**为 `PropTypes.oneOfType([PropTypes.object, PropTypes.array])`，简化替换可用 `PropTypes.object`
4. **确认 `prop-types` 依赖**：检查 `ohos/package.json` 的 `dependencies` 中是否包含 `prop-types`。若不存在且修复中引入了 `import PropTypes from 'prop-types'`，则添加 `"prop-types": "^15.8.1"` 到 dependencies
5. **重新打包**：修复完成后必须执行 `cd ohos && npm pack`，确保 tgz 包含修复后的文件

### 为什么必须在实现前修复

这些废弃 API 在模块**定义阶段**（`import` 时）就会触发 `TypeError: Cannot read property 'xxx' of undefined`，导致整个 JS bundle 初始化链断裂 → `AppRegistry.registerComponent` 不执行 → 白屏。即使后续的 TurboModule/Fabric 实现完美无缺，白屏问题也无法规避。

### 容器组件 children 渲染检查（附加检查）

对于修复了废弃 API 的**容器型组件**（如 Popup、Modal、Overlay 类），额外检查其 `render()` 方法是否正确渲染 `this.props.children`。常见的静默白屏场景：组件 `render()` 不渲染 children → App.tsx 中所有 UI 内容作为 children 传入 → 页面空白但无 JS 错误。

### 0.5.1 createReactClass / 旧式生命周期 → ES6 class 迁移：必须保持生命周期语义（防白屏）

当 `ohos/src/` 出现 `createReactClass(...)` / `React.createClass(...)`，或依赖 `create-react-class`、`react-timer-mixin`（TimerMixin）、`react-native-web`（如其 `StaticRenderer`）等鸿蒙不友好的包时，常见做法是**改写成 ES6 class 以剥离这些依赖**。改写时**最易引入首帧白屏**：把本该在 render **之前**完成的初始化，错误地挪到了 `componentDidMount`（render **之后**才执行）。

**等价迁移对照表（务必逐条对齐，不能只换壳）**：

| 旧式（createReactClass） | ES6 class | 注意 |
|--------------------------|-----------|------|
| `getInitialState()` | `constructor` 里 `this.state = {...}` | — |
| `getDefaultProps()` | `static defaultProps = {...}` | — |
| `propTypes: {...}` | `static propTypes = {...}` | — |
| `componentWillMount()` 中 **render 依赖的实例初始化**（如 `this._panResponder = PanResponder.create(...)`、ref 句柄、render 里要 `{...this.x.panHandlers}` 读取的对象） | **`constructor`**（或 render 内惰性创建） | **绝不能放 `componentDidMount`** |
| `componentWillMount()` 中的**纯副作用**（autoPlay 定时器、`initialPage` 跳转、网络、`setState`） | `componentDidMount` | 依赖挂载才合理，留在 didMount |
| `mixins: [TimerMixin]`（react-timer-mixin） | 去掉 mixin，直接 `setTimeout/setInterval`，在 `componentWillUnmount` 清理 | mixin 在 React 18 + class 下不可用 |
| `import StaticRenderer from 'react-native-web/...'` 等 web 包 | 就地内联一个最小实现（class 包一层 `shouldComponentUpdate` + `render: this.props.render()`） | 别把 web 包带进鸿蒙 bundle |
| 方法 autobind | 改箭头函数属性，或 constructor 里 `bind` | — |

**根因**：`componentDidMount` 在**首次 `render()` 之后**执行。若 `render()` 读取 `this._panResponder.panHandlers` 而 `_panResponder` 仍是类字段默认值 `null`，Hermes 抛 `Cannot read property 'panHandlers' of null` → 整棵 React 树渲染失败 → 白屏（native 日志只见 `#RNOH_JS TypeError`，WMS/NETSTACK/DisplayMetrics 全是噪声）。

**正确写法**：把 render 前置初始化抽成方法在 constructor 调用，副作用留在 didMount：
```js
constructor(props) {
  super(props);
  this.state = { /* getInitialState 内容 */ };
  this._initPanResponder();          // render 依赖 -> constructor
}
_initPanResponder() { this._panResponder = PanResponder.create({ /* ... */ }); }
componentDidMount() { if (this.props.autoPlay) this._startAutoPlay(); }  // 仅副作用
```

**自检（改写后必做）**：
```bash
grep -nE "componentDidMount|constructor|this\._?\w+\s*=" ohos/src/index.js
```
确认 render 中出现的每个 `this.xxx`（尤其 `{...this.xxx.panHandlers}`、`this.xxx.current`、`this.xxx.interpolate`）都在 **constructor 结束前**已被赋值，而非只在 `componentDidMount` 赋值。

---

## 1. 按 `ohos_api_mapping` 逐条实现

**前置：读取 API 研究文档**

首先读取 `.rn-ohos-adaptation/02.5-api-reference.md`，该文档已包含：
- SDK 签名、枚举值、参数类型
- **调用序列和前提条件**（关键，避免顺序错误）
- 典型用法代码片段

**以验证通过的 02.5-api-reference.md 中的内容为准**，避免重复查询。

对 `.rn-ohos-adaptation/02-planning.json` 中的 **`ohos_api_mapping`** 每个条目，顺序完成：

1. **查看 API 定义**
   - **优先**：检查 `02.5-api-reference.md` 中是否已有该 API 的完整签名和用法
   - 若条目含 `file_path`，直接 `read_file` 该 `.d.ts` 文件查看完整签名
   - 否则通过 `sub-doc-search` subagent 查询精确签名
2. **参考原生端实现**：阅读 Android/iOS 端对应方法的实现逻辑（便于对齐行为与边界条件）。
3. **参考类型指导中的模板**：按已加载类型 md 中的代码结构、import 模式编写，勿自创与 codegen/RNOH 冲突的结构。
4. **编写 ETS/C++ 代码**：在类型 md 指明的路径内实现；禁止猜测公开 API 签名。
5. **TurboModule 名称一致性**（若本库为 Turbo）：ETS/C++ 端模块名与 JS Spec 中 `TurboModuleRegistry.getEnforcing('...')` 所用名称完全一致。
6. **Fabric Component 名称一致性**（若本库为 Fabric）：`codegenNativeComponent('Name')` 的字符串、codegen 生成的 NAME、鸿蒙侧 `Spec`/注册名保持一致；涉及 `arkTsComponentNames` / `cppComponentNames` 时与 JS Spec 一致。

---

## 2. 编码中查询方式

**查询 `@ohos.xxx` API 细节**：

```
Task(agent: "sub-doc-search"): 查询 @ohos.xxx 模块中 functionName 的完整参数类型和返回值
```

**查询 React Native OHOS 示例**：

```
Task(agent: "sub-doc-search"): 查询 React Native OHOS 中 [TurboModule/Fabric Component] 的实现示例
```

---

## 3. 与规划字段的交叉检查

实现过程中按需对照 `02-planning.json` 中的：

- `implementation_strategy` — 架构与文件规划是否已覆盖。
- `permission_mapping` — 若已声明权限，是否在 `module.json5` 等位置落实。
- `native_dependency_mapping` — ohpm 依赖是否已写入类型 md 指明的 `oh-package.json5`。
- `risk_items` — `high` 项是否影响当前实现路径。

---

## 4. 禁止事项

- 禁止跳过类型 md 要求的脚手架命令而手搓 `ohos/` 目录凑结构。
- 禁止在未查 `.d.ts` 或 sub-doc-search 的情况下臆造系统 API 签名。
- **禁止 TurboModule 方法内置 fallback 逻辑**：原生方法应职责单一，成功 resolve、失败 reject；fallback 行为由 JS 层根据 options 参数控制。

---

## 5. 编码质量规范（强制执行）

在填充实现时，必须严格遵守以下质量要求，确保代码可测试、易读、易维护且安全：

### 5.1 可测试性 (Testability)
- **关键路径日志**：在初始化、API 调用、状态变更等关键步骤添加 `console.info` 或 `console.debug` 日志，便于调试。
- **错误上下文**：捕获异常时，必须记录详细的错误上下文（如参数值、当前状态），禁止吞掉异常或仅打印 `err`。
  ```typescript
  try {
    // ...
  } catch (err) {
    console.error(`[ModuleName] Failed to execute API: ${err.message}`, err);
    // 向 JS 层抛出或返回错误状态
  }
  ```

### 5.2 可读性 (Readability)
- **命名规范**：严格遵循 ArkTS/ETS 规范（类名/组件名 PascalCase，方法/变量 camelCase）。
- **注释说明**：对于复杂的业务逻辑或从 Android/iOS 迁移过来的特殊处理，必须添加注释说明意图。
- **方法拆分**：保持方法短小精悍，单一职责；避免过长的 `if-else` 或 `switch` 嵌套。

### 5.3 可维护性 (Maintainability)
- **异常防御**：所有对外暴露的方法必须包含 `try-catch` 块，防止原生层崩溃导致 RN 应用闪退。
- **常量管理**：禁止使用魔术字符串/数字，提取为常量或枚举。
- **资源释放**：若涉及监听器、定时器或长连接，必须在组件卸载或模块销毁时正确清理（如 `aboutToDisappear`）。

### 5.4 安全性 (Security)
- **敏感信息保护**：**严禁**在日志中打印敏感数据（如 Token、密码、用户隐私信息）。
- **输入校验**：对来自 JS 层的参数进行类型和范围校验，防止非法输入导致原生层异常。
- **权限合规**：涉及敏感能力（如位置、相机、通讯录）时，必须检查并申请对应权限，禁止越权访问。

---

## 6. 典型错误模式与修复（预防性参考）

以下错误在多个项目中反复出现，编码时应主动避免：

### 6.1 Hermes TypeError 类

| 错误信息 | 根因 | 修复方案 | 预防措施 |
|---------|------|---------|---------|
| `Super expression must either be null or a function` | extends forwardRef 组件 | 改为组合 + ref 转发 | 编码前检查父类导出形态 |
| `Cannot read property 'X' of undefined` | 模块初始化失败 | 检查前序依赖导出 | API 调用前存在性检查 |
| `Cannot read property 'X' of null` | render 读取的实例字段只在 `componentDidMount` 赋值（createReactClass→class 迁移把 componentWillMount 的前置初始化错放到 didMount） | render 前置初始化移回 `constructor` | 见 0.5.1 迁移对照表 + 自检 grep |
| `TypeError: undefined is not a function` | API 不存在 | 存在性检查 + fallback | 不假定所有 API 存在 |
| `I.default.xxx is not a function` | 双入口：`ohos/src/index.js` 的 default 仍是函数，但调用方当对象用 | 将 default 改为聚合 `./src` 的对象；重 pack + 重打 bundle | create 后检查 `ohos/src/index.js`；Example 用 default 对象时必核对 |

### 6.2 编译构建类

| 错误信息 | 根因 | 修复方案 | 预防措施 |
|---------|------|---------|---------|
| CMake No SOURCES | 纯 ETS 项目无 .cpp 源文件 | 创建 dummy.cpp | 脚本已自动处理 |
| Windows 路径超 260 字符 | codegen 生成路径过长 | 删除不必要的 Fabric generated | 纯 TurboModule 不需要 Fabric 文件 |
| module.json5 schema 验证失败 | 包含不允许的字段 | 删除 systemCapabilities 等字段 | 只保留必需字段 |

### 6.3 导入路径类

| 错误信息 | 根因 | 修复方案 | 预防措施 |
|---------|------|---------|---------|
| `Unable to resolve module X` | Metro bundler 找不到模块 | 检查依赖/路径/harmony.alias | js-only 模块必须配置 harmony.alias |
| TurboModule spec import 路径错误 | 导入路径与 codegen 目录不匹配 | 修正为精确路径（如 ./specs/v1/） | 与 `scripts.codegen-lib` 的 `--turbo-modules-spec-paths` 一致 |

### 6.4 配置类

| 错误类型 | 根因 | 修复方案 | 预防措施 |
|---------|------|---------|---------|
| harmony.alias 缺失 | js-only 模块未配置别名 | 添加 `"harmony": { "alias": "原始包名" }` | js-only 模块必配 |
| 入口文件缺失 | 根目录入口未拷贝到 ohos/src/ | 手动创建或检查脚本执行 | 确保 apply_ohos_js.py 正确执行 |
| CMakeLists 占位符未替换 | 模板 {{SHORT_NAME}} 未替换 | 手动替换为模块名 | 脚本已自动处理，检查 CMakeLists.txt |

---

## 7. 平台差异最佳实践

### 7.1 平台文件优先级

**文件加载顺序**：
```
Component.harmony.js > Component.js > Component.android.js > Component.ios.js
```

**最佳实践**：
- ✓ Harmony 专用逻辑写在 `.harmony.js` 文件
- ✓ 避免 `if (Platform.OS === 'harmony')` 污染通用逻辑
- ✓ 平台差异代码单独文件维护

### 7.2 组合优于继承

**通用原则**：
- ❌ 避免继承平台组件（ScrollView/FlatList/TextInput/View/Image）
- ✓ 使用组合 + ref 转发
- ✓ 转发被依赖的 API（scrollTo/getScrollResponder 等）

### 7.3 API 安全使用

**统一策略**：
```javascript
// TurboModule 安全模式
const module = TurboModuleRegistry.get('XXX');
if (!module) {
  if (Platform.OS === 'harmony') {
    return mockOrFallback();
  }
  throw new Error('XXX not available');
}
return module.method();

// NativeModules 安全模式
const XXX = NativeModules.XXX;
if (XXX && XXX.method) {
  XXX.method();
} else if (Platform.OS === 'harmony') {
  console.warn('XXX.method not available on Harmony');
}
```

### 7.4 异步处理统一

**推荐模式**：
```javascript
// ✓ Promise + error handling
try {
  const result = await asyncOperation();
  return result;
} catch (error) {
  if (Platform.OS === 'harmony') {
    console.warn('Operation failed on Harmony:', error);
    return defaultValue;
  }
  throw error;
}
```

---

## 8. 参考资源

**验证 API 签名**：
- `harmonyos-sdk-api-lookup` Skill（搜索本地 SDK .d.ts）
- `harmonyos-docs-lookup` Skill（本地 3300+ 官方文档快速查找，零成本，**优先使用**）
- `harmonyos-docs-search` Skill（URL Map + Firecrawl 搜索官方文档，`docs-lookup` 未命中时补充）
- `rn-docs-lookup` Skill（RN OHOS 开发文档）

**检查已适配库**：
- `rn-adapted-library` Skill（查看其他库的适配方式）

**经验总结**：
- `failure-lessons` Skill（详细错误记录）

**文件差异验证**：
- `node_modules/@rnoh/react-native-openharmony/Libraries/Components/`（查看实际导出）
