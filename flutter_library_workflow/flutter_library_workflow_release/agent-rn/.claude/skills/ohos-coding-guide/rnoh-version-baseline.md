# RNOH / RN 版本基线模板（防"按新版写、目标却是 0.72"编译失败）

> 来源：`docs/0604_rn_faq/react-native-avoid-softinput_调试记录.md`（F1 类失败）。
> 本仓主流目标：**RNOH 0.72.x（如 0.72.139）+ RN 0.72.5**。生成原生/JS spec 代码时**必须**按本基线，
> 禁止套用新版 codegen / RNOH API（它们在 0.72 不存在，HAR/HAP 直接编译失败）。

**开工前先确认目标版本**：读 `ohos/example/harmony/oh-package.json5` 的 RNOH 版本、`ohos/package.json` 的 RN 版本。
若与下表不符，以实际版本为准并查 `rn-docs-lookup` / `failure-lessons`。

---

## 版本矩阵（RNOH 0.72 / RN 0.72）

| 用途 | ✅ 0.72 正确写法 | ❌ 禁用（新版/iOS 专属） | failure-lessons |
|------|----------------|------------------------|-----------------|
| ETS TurboModule 基类 | `UITurboModule` + `UITurboModuleContext`（`/ts`） | `EtsUITurboModule`（`(ctx,name)` 构造） | `coding-type-001` |
| HAR 内 Package 基类 | `RNOHPackage`（从 `@rnoh/react-native-openharmony/ets`） | `RNPackage`（`/ts`，那是 entry 端基类） | `testing-turbomodule-001` |
| Fabric generated 组件类型 | `namespace` + `ViewBaseProps` + `ViewRawProps` + `PropsSelector` + `ViewDescriptorWrapperBase` + `EventEmitter` | `ViewProps`/`Float`/`Int32`/`WithDefault`/`DirectEventHandler` | `coding-type-002` |
| JS 端 Fabric 注册 | `import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent'` | `import { codegenNativeComponent } from 'react-native'`（0.81+ 才有） | `coding-import-003` |
| JS 端 codegen 类型 | `react-native/Libraries/Types/CodegenTypes` 导入 `Float/Int32/WithDefault` | 从 `'react-native'` 顶层导入 | `coding-import-003` |

> **黄金参考插件**（生成代码时直接对照其已验证实现）：
> - `react-native-blur` —— Fabric generated（namespace + PropsSelector + JSIBinder）、JS codegenNativeComponent 的 0.72 导入
> - `react-native-datepicker` —— `UITurboModule` + `RNOHPackage` 使用模式

---

## 1. ETS TurboModule（`coding-type-001`）

```typescript
// ✅ RNOH 0.72
import { UITurboModule, UITurboModuleContext } from '@rnoh/react-native-openharmony/ts';

export class XxxTurboModule extends UITurboModule {
  constructor(ctx: UITurboModuleContext) {
    super(ctx);
  }
  // 发事件：this.ctx.rnInstance.emitDeviceEvent(name, payload)
  // 窗口/能力：this.ctx.uiAbilityContext
}
```

```typescript
// ❌ 0.72 编译报错 Property 'ctx' does not exist
export class XxxTurboModule extends EtsUITurboModule {
  constructor(ctx: RNOHContext, name: string) { super(ctx, name); }
}
```

## 2. HAR 内 Package 基类（`testing-turbomodule-001`）

```typescript
// ✅ 从 /ets 导入 RNOHPackage（不是 /ts 的 RNPackage）
import { RNOHPackage } from '@rnoh/react-native-openharmony/ets';
export class XxxPackage extends RNOHPackage { /* 注册 Fabric + TurboModule */ }
```

错用 `RNPackage` 会报 `createWrappedCustomRNComponentBuilderByComponentNameMap is missing`。

## 3. Fabric generated 组件（`coding-type-002`）

RNOH 0.72 的 generated component spec 用 namespace 包裹：

```typescript
import {
  Descriptor, ViewBaseProps, ViewRawProps,
  ViewDescriptorWrapperBase, ViewPropsSelector,
} from '@rnoh/react-native-openharmony/ts';

export namespace XxxView {
  export interface Props extends ViewBaseProps {}
  export interface RawProps extends ViewRawProps, DirectRawProps {}
  export class PropsSelector extends ViewPropsSelector<Props, RawProps> {
    // 默认值：用 this.rawProps.x ?? defaultValue，而非 WithDefault<...>
  }
  export class DescriptorWrapper extends ViewDescriptorWrapperBase</* ... */> {}
}
```

关键替换：`ViewProps → ViewBaseProps + ViewRawProps`；`WithDefault<Float,0> → this.rawProps.x ?? 0`；
`DirectEventHandler<T> → EventEmitter + EventPayloadByName`；顶层 export → namespace 包裹。

## 4. JS 端 Fabric spec（`coding-import-003`）

```typescript
// ✅ RN 0.72 内部路径
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { WithDefault, Float, Int32 } from 'react-native/Libraries/Types/CodegenTypes';

// ❌ RN 0.72 运行时 TypeError: codegenNativeComponent is not a function
// import { codegenNativeComponent } from 'react-native';
```

## 5. Fabric C++ 产物需 Node ≥ 20（`coding-config-002`）

`react-native codegen-lib-harmony` 生成 Fabric 的 C++ 产物（`ComponentDescriptors.h`/`ShadowNodes`/`Props` + `JSIBinder`）**要求 Node ≥ 20**。
- Node < 20：Fabric C++ 产物无法生成 → 组件 `not found in UIManager`。此时 **planning 阶段应降级为 TurboModule 方案**并标注；纯逻辑能力用 TurboModule 实现。
- 详见环境前置检查（analysis/planning 阶段会校验 Node 版本）。
