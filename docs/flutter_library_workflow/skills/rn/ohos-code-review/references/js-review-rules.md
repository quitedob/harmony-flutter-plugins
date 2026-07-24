# JS/TS 层代码审查清单

面向 React Native 模块鸿蒙适配中 JS/TS 层变更的审查。

审查对象：`ohos/src/` 下被本次适配修改的 `.js` / `.ts` / `.tsx` 文件（JS 层导出、平台分支等），以及仓库根目录 `src/` 下因适配而修改的文件。不审查 `generated/` 目录下的 codegen 产物。

---

## 第一维度：平台通路完整性（P0）

### 平台判断分支

| 违规模式 | 规则 | 修复方式 |
|---------|------|---------|
| `Platform.OS === 'android'` / `Platform.OS === 'ios'` 判断链缺少 `'harmony'` | `cr-js-missing-harmony-branch` | 补 `Platform.OS === 'harmony'` 分支 |
| `Platform.select({android: ..., ios: ...})` 缺少 `harmony` key | `cr-js-platform-select` | 补 `harmony: ...` 或 `default: ...` |
| 排除法判断平台（`Platform.OS !== 'android' && Platform.OS !== 'ios'`） | `cr-js-no-exclusion-detect` | 改为正向判断 `Platform.OS === 'harmony'` |
| 使用 `Platform.OS === 'ohos'` | `cr-js-wrong-platform-name` | 鸿蒙平台标识为 `'harmony'`，不是 `'ohos'` |

检测方式：
```bash
grep -rn "Platform\.OS\|Platform\.select" ohos/src/ src/
```
逐条确认 harmony 分支是否存在。

### 模块注册

| 检查项 | 规则 | 说明 |
|--------|------|------|
| TurboModule Spec 的 `TurboModuleRegistry.get('NAME')` 名称与 ETS 端 `getName()` 一致 | `cr-js-turbo-name-match` | 名称不一致会导致 JS 侧获取到 null |
| Fabric Spec 的 `codegenNativeComponent('NAME')` 名称与 ETS 端 `NAME` 常量一致 | `cr-js-fabric-name-match` | 名称不一致组件无法渲染 |
| `ohos/src/index.ts` 正确导出模块入口 | `cr-js-export-entry` | 确保 harmony alias 能正确 resolve 到导出 |

---

## 第二维度：公开 API 不变性（P0）

### 签名保护

| 检查项 | 规则 | 说明 |
|--------|------|------|
| 仓库根目录 `src/` 的公开导出未被删改 | `cr-js-api-signature` | 适配修改不得改变公开类/方法/属性的签名 |
| 未删除原有公开方法或常量 | `cr-js-api-no-delete` | 不得删除原有公开 API |
| 返回类型未改变 | `cr-js-api-return-type` | 不得修改原有方法的返回类型 |
| 其他平台行为路径未受影响 | `cr-js-api-no-side-effect` | OHOS 分支不得改变 Android/iOS 的已有行为 |
| OHOS 专属逻辑已隔离 | `cr-js-ohos-isolated` | 新增的 OHOS 逻辑必须用 `Platform.OS === 'harmony'` 隔离 |

检测方式：对比 `src/index.ts` 或主入口文件的导出变更，逐条确认是否影响其他平台行为

---

## 第三维度：类型安全（P1）

### TurboModule Spec 类型匹配

| 违规模式 | 规则 | 说明 |
|---------|------|------|
| Spec 方法声明的参数类型与 ETS 实现不匹配 | `cr-js-spec-param-mismatch` | Spec 声明 `string` 但 ETS 按 `number` 处理 |
| Spec 方法声明的返回类型与 ETS 实现不匹配 | `cr-js-spec-return-mismatch` | Spec 声明 `Promise<boolean>` 但 ETS 返回 `string` |
| `getConstants()` 返回结构与 JS 侧使用不匹配 | `cr-js-constants-mismatch` | JS 侧访问的常量 key 必须与 ETS `getConstants()` 返回的 key 完全一致 |
| EventEmitter 事件名 JS 与 ETS 不一致 | `cr-js-event-name-mismatch` | `DeviceEventEmitter.addListener('name')` 必须与 ETS `emitDeviceEvent('name')` 一致 |

### NAPI 跨桥类型安全

| 违规模式 | 规则 | 说明 |
|---------|------|------|
| JS 侧传递 Map/Set 到 ETS | `cr-js-no-map-set-bridge` | Map/Set 跨 NAPI 桥后变为空对象，必须先转为 Array 或 Object |
| JS 侧传递 Function 到 ETS | `cr-js-no-func-bridge` | Function 不可跨桥传递，使用 callback ID + 事件模式替代 |
| JS 侧传递循环引用对象到 ETS | `cr-js-no-circular-ref` | 循环引用导致 NAPI 栈溢出，需提前展平 |
| number 类型超 2^53 精度丢失 | `cr-js-bigint-precision` | 超大整数优先用 string 传递 |

### Null 处理

| 违规模式 | 规则 | 说明 |
|---------|------|------|
| ETS 返回 `null`/`undefined` 但 JS 侧未判空 | `cr-js-null-check` | 跨桥返回值可能为 null，使用前必须判空 |
| 可选参数未提供默认值且 ETS 未处理 undefined | `cr-js-optional-param` | JS 可选参数不传时为 undefined，ETS 侧需兼容 |

---

## 第四维度：导入与依赖（P3）

### 导入规范

| 检查项 | 规则 | 说明 |
|--------|------|------|
| 未使用的 import | `cr-js-unused-import` | 删除未使用的导入 |
| `ohos/src/` 中 import 路径使用鸿蒙包名而非 harmony alias | `cr-js-import-alias` | `ohos/src/` 内部 import 其他 RN 包时应使用原始包名（harmony alias 映射），而非 `@react-native-ohos/xxx` |
| 平台特有包进入公共层 | `cr-js-platform-leak` | Android/iOS 专有包不应出现在 harmony 可达的代码路径 |

### 依赖声明

| 检查项 | 规则 | 说明 |
|--------|------|------|
| `ohos/package.json` 的 `peerDependencies` 使用了原始包名（应为 OHOS 包名） | `cr-js-peer-ohos-name` | `resolved_ohos_deps` 中的依赖必须用 OHOS 包名声明 |
| `harmony.alias` 未正确设置 | `cr-js-harmony-alias` | `ohos/package.json` 中 `harmony.alias` 必须指向原始包名，确保 JS 侧 import 路径正确 resolve |

---

## 检测要求

- 仅审查被本次适配修改的 JS/TS 文件
- 未修改的原有代码不报告（原代码质量不在审查范围）
- `ohos/example/` 下的 JS/TS 代码不在此清单范围（由 04-testing 阶段处理）
- 对于公开 API 不变性检查，需对比 `src/` 原始文件和 `ohos/src/` 的变更确认是否影响其他平台
- Spec 文件（`src/specs/` 或 `ohos/harmony/{short_name}/src/main/ets/generated/`）作为参照不直接审查，但需确认实现与其声明匹配

## 忽略规则

- `Platform.OS === 'harmony'` 是正确的鸿蒙平台判断方式
- `ohos/src/index.ts` 中的平台特有导出不视为公开 API 变更（属于 OHOS 特有入口）
- `generated/` 目录下的 codegen 产物不审查
- `__tests__/` 目录下的测试代码不审查
- `package.json` 中 `harmony` 配置字段的格式由 `ohos-coding-guide` 保证，不重复审查
