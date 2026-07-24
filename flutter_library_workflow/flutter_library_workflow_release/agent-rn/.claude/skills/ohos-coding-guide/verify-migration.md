# 迁移后验证（init 前）

**时机**：`rn.py migrate` 完成之后、`rn.py init` 之前。发现问题**直接修复**，通过后再 init。

**信息来源**：读 `ohos/src/` 与 `ohos/package.json` + migrate 命令输出（当前上下文），无需写中间状态文件。

## 职责边界（仅此三项）

| 检查对象 | 内容 |
|----------|------|
| **`ohos/src/`** | 入口与 Spec 是否齐全、路径是否与 package 配置一致、JS 导出是否正确引用 Spec |
| **`ohos/src/specs/*.ts`** | Spec 类型是否准确，脚本生成的 `object`/`any` 需根据 JS 源码修正 |
| **`ohos/package.json`** | `harmony.alias`、`harmony.autolinking`（原生模块）、`scripts.codegen-lib` 路径是否在 `ohos/src/` 下真实存在 |

**不检查**：`ohos/example/`、`ohos/harmony/`、`generated/`、ETS/C++ 实现、任何 `ohos/` 下除 `src/` 与根级 `package.json` 以外的路径。

## 重要：发现问题直接修复

**`rn.py migrate` 是固定脚本，重复运行通常不会修复 JS 笔误。**须直接 edit 修复，例如：

1. **`ohos/src/`**：Spec 缺失、Turbo 常量未走 `getConstants()`、index 中 import 路径错误
2. **`ohos/src/specs/*.ts`**：参数类型为 `object`/`any`、返回类型为 `Promise<any>`、Event payload 未定义
3. **`ohos/package.json`**：`harmony.alias`、`codegen-lib` 与 `ohos/src/specs/*.ts` 不对应、**依赖名未鸿蒙化**（如 `react-native-reanimated` 应改为 `@react-native-oh-tpl/react-native-reanimated`）

## init 曾失败时

若**刚执行** `rn.py init` 且失败，**以该次终端输出**为准，但**只根据输出修 `ohos/src/` 或 `ohos/package.json`**（例如 codegen 路径、Spec 名），修完后再跑本清单，然后**完整重跑** init。

## 检查清单

### `ohos/src/specs/*.ts`（Spec 类型校验）

**脚本生成的类型可能不准确，需根据 JS 源码修正。**

检测以下类型问题：
- 参数类型为 `object` 或 `any`
- 返回类型为 `Promise<any>`
- Event payload 为空（`{}` 或只有注释）

**修正方法**：

1. **TurboModule 参数推断**：找 JS 源码中方法调用 `ModuleName.method({ key: value, ... })`，从对象字面量提取字段，根据值推断类型：
   - `.getTime()` → `number`
   - `?? null` → `T | null`
   - 字符串字面量 → `string`
   - 数字字面量 → `number`
   - `true/false` → `boolean`

2. **TurboModule 返回类型推断**：找 `.then(({ a, b }) => ...)` 解构参数，根据字段名推断类型。

3. **Fabric Event payload 推断**：找 JSX 中 `onEvent={(event) => { const { a, b } = event.nativeEvent; }}`，从解构字段推断类型。

**修正示例**：

脚本生成：
```typescript
export interface Spec extends TurboModule {
  open(config: object): Promise<any>;
}
```

JS 源码调用：
```javascript
RNMonthPicker.open({
  value: opts.value.getTime(),           // number
  minimumDate: opts.minimumDate?.getTime() ?? null,  // number | null
  maximumDate: opts.maximumDate?.getTime() ?? null,  // number | null
}).then(({ action, year, month }) => {
  // action: 枚举值, year: number, month: number
});
```

修正为：
```typescript
export interface OpenConfig {
  value: number;
  minimumDate?: number | null;
  maximumDate?: number | null;
}
export interface OpenResult {
  action: 'dateSetAction' | 'dismissedAction' | 'neutralAction';
  year: number;
  month: number;
}
export interface Spec extends TurboModule {
  open(config: OpenConfig): Promise<OpenResult>;
}
```

**类型推断映射表**：

| 字段名模式 | 推断类型 |
|-----------|---------|
| `value`, `index`, `count`, `total`, `page`, `limit`, `offset`, `width`, `height`, `x`, `y`, `size`, `year`, `month`, `day` | `number` |
| `title`, `message`, `url`, `path`, `name`, `id`, `key`, `token`, `locale`, `mode`, `status` | `string` |
| `visible`, `enabled`, `disabled`, `selected`, `success`, `autoTheme` | `boolean` |
| `data`, `items`, `options`, `urls`, `keys` | `Array<T>` |
| `action`, `type` (枚举值) | 查 JS 源码枚举，生联合类型 `'a' \| 'b' \| 'c'` |
| 字段带 `?? null` 或 `?: null` | `T | null` |

### `ohos/src/`

- `ohos/src/` 存在，入口（如 `index.js` / `index.ts`）与 migrate 结果一致
- 新架构：`ohos/src/specs/` 下 Spec 齐全（Turbo：`Native*.ts`；Fabric：`*NativeComponent.ts`）
- Turbo 常量通过 **`getConstants()`** 返回；JS 用 `NativeXxx.getConstants().key`，禁止 `NativeXxx.key`
- 入口中 import Spec 的路径与 `ohos/src/` 内实际文件一致
- **双入口**（根 `index.js` + `src/index.js`）：若 Example 使用 `import X from 'pkg'; X.method()`，确认 `ohos/src/index.js` 的 `export default` 为**对象**（聚合 `./src` 的方法），不是单个函数；见 `library-fill-implementation.md` §0.1.1

### `ohos/package.json`

- 文件存在且为合法 JSON
- `harmony.alias` 存在
- 原生模块：`harmony.autolinking`（含 `ohPackageName` 等）
- 有 Spec 时：`scripts.codegen-lib` 中每个路径指向的文件在 **`ohos/src/`** 下存在
- 需 bob 时：`react-native-builder-bob` + `scripts.prepare`
- **依赖鸿蒙化检查**：读取 `.rn-ohos-adaptation/02-planning.json`，根据其中依赖映射信息，确认 `ohos/package.json` 中依赖名是否正确
  - migrate 脚本可能写入原始依赖名（如 `react-native-reanimated`），需替换为鸿蒙化包名（如 `@react-native-oh-tpl/react-native-reanimated`）
  - **直接使用鸿蒙化包名**，不要用 npm alias 语法（如 `"react-native-reanimated": "npm:@react-native-oh-tpl/..."`）
  - 包自身的 `harmony.alias` 字段会自动处理 import 重定向
  - 常见需鸿蒙化的依赖：`react-native-reanimated`、`react-native-gesture-handler`、`react-native-svg`、`react-native-fast-image` 等

## 验证命令（示例）

```bash
ls ohos/src/specs/ 2>/dev/null || ls ohos/src/
cat ohos/package.json
grep -E "codegen-lib|harmony" ohos/package.json
grep "specs/" ohos/src/index.js ohos/src/index.ts 2>/dev/null
cat ohos/src/specs/*.ts 2>/dev/null  # 查看所有 Spec 类型定义
grep -E "object|Promise<any>|any\]|Event payload" ohos/src/specs/*.ts  # 找需修正的类型
```

## 无法继续的情况

仅当无法通过修改 `ohos/src/` 或 `ohos/package.json` 自动修复时终止（例如 migrate 未跑导致 Spec 完全缺失）。

## 依赖鸿蒙化修复示例

常见需替换的依赖：

| 原始依赖名 | 蒙化包名 |
|-----------|----------|
| `react-native-reanimated` | `@react-native-oh-tpl/react-native-reanimated` |
| `react-native-gesture-handler` | `@react-native-oh-tpl/react-native-gesture-handler` |
| `react-native-svg` | `@react-native-oh-tpl/react-native-svg` |
| `react-native-fast-image` | `@react-native-oh-tpl/react-native-fast-image` |

修复时直接 edit `ohos/package.json` 的 `dependencies` 字段，将原始依赖名替换为鸿蒙化版本。
