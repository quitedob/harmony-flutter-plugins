# TurboModule / Fabric 组件契约审查清单

面向 React Native 模块鸿蒙适配中 JS Spec ↔ ETS 实现的两端一致性审查。

审查对象：TurboModule 的 ETS 实现文件（`*TurboModule.ts`）和对应的 JS Spec 文件（`src/specs/Native*.ts`），Fabric 组件的 ETS 实现文件（`components/*.ets`）和对应的 JS Spec，必须同时读取两端代码进行交叉比对。

---

## 第一维度：模块名一致性（P0）

### TurboModule 名称匹配

| 检查项 | 规则 | 说明 |
|--------|------|------|
| JS Spec `TurboModuleRegistry.get('NAME')` / `getEnforcing('NAME')` 与 ETS `getName()` 返回值完全一致 | `cr-tm-name-match` | 逐字符比对，含大小写 |
| ETS 侧 Package 文件中注册的模块名与 `getName()` 一致 | `cr-tm-package-name` | `createTurboModuleFactoryDelegate` 中的名称检查 |

检测方式：
1. 从 JS Spec 提取：`grep "TurboModuleRegistry\.\(get\|getEnforcing\)" src/specs/`
2. 从 ETS 端提取：`grep "getName\(\)" ohos/harmony/*/src/main/ets/`
3. 逐对比较名称值

### Fabric 组件名称匹配

| 检查项 | 规则 | 说明 |
|--------|------|------|
| JS Spec `codegenNativeComponent('NAME')` 与 ETS 端 `NAME` 常量完全一致 | `cr-fc-name-match` | 三处必须一致：JS Spec、`generated/components/{Name}.ts` 的 NAME、ETS `components/{Name}.ets` 的引用 |
| `createComponentFactoryDelegate` 中注册的组件名与 NAME 一致 | `cr-fc-factory-name` | Package 文件的注册名称必须匹配 |

---

## 第二维度：方法签名契约（P0）

### TurboModule 方法匹配

| 检查项 | 规则 | 说明 |
|--------|------|------|
| Spec 声明的每个方法在 ETS 端有对应实现 | `cr-tm-method-coverage` | 排除已在 `not_implemented` 中声明的方法 |
| 方法名大小写完全一致 | `cr-tm-method-case` | `getVersion` vs `GetVersion` 会导致调用失败 |
| Spec 中无对应声明的方法不应在 ETS 端暴露 | `cr-tm-no-extra-method` | 额外方法不会被 JS 调用，属于死代码 |
| 方法参数数量匹配 | `cr-tm-param-count` | Spec 声明 2 个参数但 ETS 实现只接收 1 个 |
| 同步/异步一致 | `cr-tm-sync-async` | Spec 返回 `Promise<T>` 则 ETS 必须是异步方法 |

### 参数类型匹配

| JS Spec 参数类型 | ETS 正确接收类型 | 规则 |
|-----------------|-----------------|------|
| `string` | `string` | `cr-tm-param-string` |
| `number` | `number` | `cr-tm-param-number` |
| `boolean` | `boolean` | `cr-tm-param-boolean` |
| `Object` / `{key: type}` | `Record<string, Object>` 或具体 interface（**禁止**自定义 class） | `cr-tm-param-object` |
| `Array<T>` | `Array<T>` | `cr-tm-param-array` |
| `?string`（可选） | `string \| null \| undefined` | `cr-tm-param-optional` |
| callback `(value: T) => void` | 不可跨桥，需用事件模式替代 | `cr-tm-param-no-callback` |

检测方式：
1. 从 JS Spec 提取每个方法的参数列表和类型
2. 从 ETS 实现提取对应方法的参数列表和类型
3. 逐参数比对类型兼容性

### 常见参数违规

| 违规模式 | 规则 | 说明 |
|---------|------|------|
| ETS 方法参数使用自定义 class 接收 JS 对象 | `cr-tm-no-class-param` | JSI 桥接无法识别自定义 class，方法被跳过为 `undefined`。必须使用 `Record<string, Object>` |
| 接收参数后未做类型检查 | `cr-tm-param-validate` | JS 侧传入值可能与 Spec 声明不符（尤其 dynamic/any 场景） |
| 未处理 null/undefined 参数 | `cr-tm-param-null-check` | 可选参数不传时为 undefined，必须兼容处理 |

---

## 第三维度：返回值类型安全（P0）

### 类型匹配规则

| JS Spec 返回类型 | ETS 正确返回类型 | 规则 |
|-----------------|-----------------|------|
| `boolean` | `boolean` | `cr-tm-ret-bool` |
| `string` | `string` | `cr-tm-ret-string` |
| `number` | `number`（整数或浮点） | `cr-tm-ret-number` |
| `Object` / `{key: type}` | 普通对象（可枚举属性的 Object）| `cr-tm-ret-object` |
| `Array<T>` | `Array<T>` | `cr-tm-ret-array` |
| `Promise<T>` | async 方法返回 `T`（RNOH 框架自动包装为 Promise） | `cr-tm-ret-promise` |
| `void` | 无 return 或 `return undefined` | `cr-tm-ret-void` |
| `?T`（可空） | `T \| null \| undefined` | `cr-tm-ret-nullable` |

### 高频类型陷阱

| 陷阱 | 规则 | 正确做法 |
|------|------|---------|
| 返回 Map/Set 对象 | `cr-tm-ret-no-map-set` | Map/Set 跨 NAPI 桥后内部槽丢失变为空对象 `{}`，必须先转为普通 Object 或 Array |
| 返回 Date 对象 | `cr-tm-ret-date` | 优先返回 number 时间戳，或确保使用 `napi_create_date` |
| 返回 Error 对象 | `cr-tm-ret-error` | `Error.prototype` 跨桥丢失，传 `{ message, code }` 结构体 |
| 布尔值用字符串 `'true'`/`'false'` 返回 | `cr-tm-bool-as-string` | 必须返回 `boolean` 类型 |
| 数值用字符串 `'123'` 返回 | `cr-tm-num-as-string` | 必须返回 `number` 类型 |
| null / '' / 0 / false 语义混淆 | `cr-tm-null-inconsistent` | 空值语义必须两端一致 |
| `emitDeviceEvent` payload 是裸标量 | `cr-tm-event-payload-object` | payload 必须是对象或数组，禁止裸标量（JS 侧消费如 `.map()` 会崩溃） |

检测方式：
1. 从 JS Spec 提取方法返回类型
2. 从 ETS 实现提取对应方法的 `return` 语句
3. 逐方法比对类型兼容性，特别关注 Map/Set/Date 等不可安全跨桥的类型

---

## 第四维度：Fabric 组件属性对称性（P1）

### Props 处理完整性

| 检查项 | 规则 | 说明 |
|--------|------|------|
| JS Props interface 中的每个 prop 在 ETS `subscribeToDescriptorChanges` 回调中有处理 | `cr-fc-prop-coverage` | 遗漏的 prop 不会生效 |
| Prop 类型匹配（JS `string` ↔ ETS `string` 等） | `cr-fc-prop-type` | 类型不匹配导致渲染异常或崩溃 |
| 默认值处理 | `cr-fc-prop-default` | JS 侧 `defaultProps` 或 `?` 可选 prop，ETS 侧需提供默认值 |
| `@State` 声明正确性 | `cr-fc-state-usage` | 只有 `build()` 中实际引用的 prop 才需要 `@State`，多余 `@State` 浪费性能 |

### Events 处理完整性

| 检查项 | 规则 | 说明 |
|--------|------|------|
| JS 端声明的每个事件在 ETS 端有对应的 `eventEmitter.emit()` 调用 | `cr-fc-event-coverage` | 遗漏的事件 JS 侧永远收不到 |
| 事件名与 `EventPayloadByName` 中的 key 完全一致 | `cr-fc-event-name` | 名称不匹配导致事件静默丢弃 |
| 事件数据结构匹配 | `cr-fc-event-data` | emit 的数据结构必须与 JS 端 EventPayload 类型一致 |

### Commands 处理完整性

| 检查项 | 规则 | 说明 |
|--------|------|------|
| JS 端声明的每个 command 在 ETS 端有对应的 handler | `cr-fc-command-coverage` | 遗漏的 command JS 调用无响应 |
| command 参数类型匹配 | `cr-fc-command-param` | 参数类型不一致导致处理错误 |

### 组件结构

| 检查项 | 规则 | 说明 |
|--------|------|------|
| `ctx` 和 `tag` 字段正确声明 | `cr-fc-ctx-tag` | 必须有 `public ctx!: RNOHContext` 和 `public tag: number = 0` |
| `RNViewBase` 包裹 | `cr-fc-rnviewbase` | 叶子组件：`build()` 须 `RNViewBase({ ctx, tag }) { ... }`；**容器组件**（有 RN children）须 LazyForEach + `wrappedRNComponentBuilder`（见 `fabric-component.md` 容器节） |
| 禁止从 `/ts` 导入 UI 符号 | `cr-fc-import-main` | `RNViewBase` / `DescriptorWrapper` 等不得来自 `@rnoh/react-native-openharmony/ts`（`coding-import-002`） |
| `cleanUpCallbacks` 在 `aboutToDisappear` 中执行 | `cr-fc-cleanup-execute` | 必须遍历执行 `cleanUpCallbacks` 中的所有函数 |

---

## 第五维度：事件发射体系（P1）

### DeviceEventEmitter 一致性

| 检查项 | 规则 | 说明 |
|--------|------|------|
| ETS `emitDeviceEvent('eventName', ...)` 的事件名与 JS `DeviceEventEmitter.addListener('eventName', ...)` 一致 | `cr-ev-name-match` | 逐字符比对，含大小写 |
| 事件数据结构两端一致 | `cr-ev-data-structure` | ETS emit 的对象结构必须与 JS 端 listener callback 参数类型匹配 |
| 事件注册有对应移除 | `cr-ev-listener-cleanup` | JS `addListener` 必须有对应的 `remove()` 或 `removeAllListeners()`（通常在 `useEffect` cleanup） |
| ETS 侧发射事件前检查 rnInstance 存活 | `cr-ev-instance-check` | 组件/模块销毁后 `rnInstance` 可能失效，发射事件前需判空 |

### 常见事件问题

| 问题 | 规则 | 说明 |
|------|------|------|
| 事件名拼写不一致 | `cr-ev-name-typo` | ETS: `'onProgress'` vs JS: `'onprogress'`，大小写敏感 |
| 事件数据为裸标量 | `cr-ev-data-no-scalar` | `emitDeviceEvent` 的 payload 必须是对象或数组，裸标量（number/string/boolean）JS 侧 `.map()` 等操作会崩溃 |
| 频繁事件未做节流 | `cr-ev-throttle` | 传感器等高频事件应在 ETS 侧做节流，避免 NAPI 桥过载 |

---

## 检测要求

- **必须同时读取 JS Spec 和 ETS 实现代码**，交叉比对；单看一端无法发现契约不一致
- 以 JS Spec 声明为基准，逐方法检查 ETS 端实现
- 不仅检查"有没有这个方法"，更检查"参数和返回值类型是否一致"
- 对复合数据结构（嵌套 Object、Array 内含 Object 等），追踪到最内层类型
- 参照 `napi-bridge-types.md` 确认跨桥类型安全

## 忽略规则

- `generated/` 目录下的 codegen 产物不审查（作为参照读取但不报告问题）
- 未实现的方法（已在 `not_implemented` 中声明且 throw `Not implemented`）不检查返回值类型
- RNOH 框架标准接口方法（`install`、`createNativeModules` 等）不作为 TurboModule 公开方法审查
- `getConstants()` 返回的空对象 `{}` 在确认该模块无常量时不视为假实现
- C++ 层的 TurboModule 实现（`cpp-turbo-module`）的方法桥接由 `ARK_METHOD_METADATA` 宏保证，只审查 ArkTS 层代码
