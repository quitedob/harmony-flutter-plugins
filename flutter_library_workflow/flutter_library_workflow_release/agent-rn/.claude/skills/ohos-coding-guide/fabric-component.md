# ArkTS Fabric 自定义组件鸿蒙适配

**前置**：本次会话已完成 `create`、验证、`init`（见 `SKILL.md`）。本文件只覆盖**实现子步骤**；编译与产物见 `SKILL.md` 步骤 6、7。

## 数据来源

从 `02-planning.json` 读取：`ohos_api_mapping`、`permission_mapping`、`native_dependency_mapping`、`rn_dependency_mapping`。

## 核心原则

**你的任务**：实现 ETS 组件 `build()`、Props/Events/Commands，按需加依赖与权限。

**禁止**：`rn.py create`、`rn.py init`；改根目录 `src/`；手工改 Example/Entry；在 `ts.ts` 中 re-export `.ets` 组件。

## 编码前（必做）

1. `skill({ name: "failure-lessons" })` + `read_file` → `failure-lessons/lessons.json`，筛选 `fabric-component` 相关条目（**必读 `coding-import-002`**）
2. `read_file` → `library-fill-implementation.md`
3. `skill({ name: "arkts-rules" })`
4. 若有 `user_grant` → `permission-request.md`

## Fabric 核心概念

### 目录结构（`{short_name}` 非固定 `library`）

```
ohos/harmony/{short_name}/
├── src/main/ets/
│   ├── components/{Name}.ets      ← 你要改
│   ├── generated/components/{Name}.ts  ← DescriptorWrapper、EventEmitter
│   └── {Name}Package.ts
├── oh-package.json5
└── src/main/module.json5
```

### NAME 一致性

以下三处字符串必须一致：
1. JS Spec：`codegenNativeComponent('Name')`
2. `generated/components/{Name}.ts` 的 `NAME`
3. ETS `components/{Name}.ets` 的 `Spec.NAME`

### 关键概念

| 概念 | 说明 |
|------|------|
| DescriptorWrapper | `aboutToAppear` 中通过 `subscribeToDescriptorChanges` 的回调 `descriptor.rawProps` 读 props |
| EventEmitter | `this.eventEmitter.emit(...)`，事件名对齐 `EventPayloadByName` |
| CommandReceiver | JS 有 commands 时在 `aboutToAppear` 注册、`cleanUpCallbacks` 注销 |

---

## 标准模板

**先选类型**：JS 侧**无 children**（Image、自定义绘制等）→ **叶子模板**（`RNViewBase`）；可包裹子 View 的**容器组件** → **容器模板**（见下节，勿与叶子混用）。

### 叶子组件模板 (`components/{Name}.ets`)

`rn.py init` 生成的 stub 使用 `import { {Name} as Spec } from '../generated/components/{Name}'`；与下方 `import { RNC } from '../generated/ts'` **等价**，二选一即可。

```typescript
import { RNOHContext, RNViewBase } from '@rnoh/react-native-openharmony';
import { {Name} as Spec } from '../generated/components/{Name}';
// 或: import { RNC } from '../generated/ts';

@Component
export struct {Name} {
  public static readonly NAME = Spec.NAME;
  // ✅ 必须声明：ctx + tag（这是 RNOH Fabric 的硬性要求）
  public ctx!: RNOHContext;
  public tag: number = 0;

  // ✅ @State：仅用于 build() 中实际引用的属性，驱动 UI 更新
  @State private propA: string = '';
  @State private propB: number = 0;

  // ✅ private：事件发射器 + 清理回调
  private eventEmitter: Spec.EventEmitter | undefined = undefined;
  private cleanUpCallbacks: (() => void)[] = [];

  aboutToAppear(): void {
    // 1. 创建事件发射器
    this.eventEmitter = new Spec.EventEmitter(this.ctx.rnInstance, this.tag);

    // 2. 订阅 props 变化（唯一正确的 props 读取方式）
    this.cleanUpCallbacks.push(
      this.ctx.descriptorRegistry.subscribeToDescriptorChanges(this.tag, (descriptor: Spec.Descriptor) => {
        const rawProps = descriptor.rawProps as Spec.DirectRawProps;
        if (rawProps) {
          this.propA = rawProps.propA ?? '';
          this.propB = rawProps.propB ?? 0;
        }
      })
    );

    // 3.（可选）注册 CommandReceiver（以 codegen 生成为准）
    // this.cleanUpCallbacks.push(
    //   new Spec.CommandReceiver(this.ctx.componentCommandReceiver, this.tag).subscribe('cmd', (argv) => {})
    // );
  }

  aboutToDisappear() {
    // ✅ 必须清理所有订阅，否则内存泄漏 + 重复订阅
    this.cleanUpCallbacks.forEach(cb => cb());
  }

  build() {
    // ✅ 必须用 RNViewBase 包裹，这是 RNOH 框架要求
    RNViewBase({ ctx: this.ctx, tag: this.tag }) {
      // ArkUI 原生组件实现
      // 示例：Image(this.propA)
    }
  }
}
```

### Package 文件模板 (`GeneratedPackage.ets`)

**重要**：`rn.py init` 生成的是 **`GeneratedPackage.ets`**（基类 `RNOHPackage`，非 `RNPackage`）。已生成则**验证** Descriptor 注册即可，勿整文件重写。

```typescript
import { RNOHPackage } from '@rnoh/react-native-openharmony/ets';
import type {
  DescriptorWrapperFactoryByDescriptorTypeCtx,
  DescriptorWrapperFactoryByDescriptorType,
} from '@rnoh/react-native-openharmony/ts';
import { {Name} as {Name}Spec } from './generated/components/{Name}';

export class GeneratedPackage extends RNOHPackage {
  // ✅ 缺少此方法 = Fabric 运行时完全不可用（且无报错）
  createDescriptorWrapperFactoryByDescriptorType(
    ctx: DescriptorWrapperFactoryByDescriptorTypeCtx
  ): DescriptorWrapperFactoryByDescriptorType {
    return {
      {Name}: (ctx) => new {Name}Spec.DescriptorWrapper(ctx.descriptor),
    };
  }

  // ✅ 如果同时有 TurboModule，也需注册
  // override getUITurboModuleFactoryByNameMap(): Map<string, (ctx: UITurboModuleContext) => UITurboModule | null> {
  //   return new Map().set(TM.{Module}.NAME, (ctx) => new {Module}(ctx));
  // }
}
```

**验证清单**（coding 阶段必须检查）：
- [ ] `GeneratedPackage.ets` 存在且 `extends RNOHPackage`
- [ ] `createDescriptorWrapperFactoryByDescriptorType` 已注册每个 Fabric 组件的 `DescriptorWrapper`
- [ ] 如有 TurboModule，`getUITurboModuleFactoryByNameMap` 也已注册（Turbo 与 Fabric 可同包）

### Example Builder 模板 (`Index.ets` 中的 Builder)

```typescript
@Builder
export function buildCustomRNComponent(ctx: ComponentBuilderContext) {
  // ✅ 必须用 Stack 包裹，这是 RNOH 框架硬性要求
  // 不用 Stack → 编译通过但组件不渲染，无任何报错
  Stack() {
    if (ctx.componentName === {NAME}_TYPE) {
      {Name}({ ctx: ctx.rnComponentContext, tag: ctx.tag })
    }
  }
  .position({ x: 0, y: 0 })
}
```

---

## 容器组件（需渲染 RN children）

`rn.py init`（Fabric 脚手架步骤 4）会根据 Android `ViewGroupManager` / `SimpleViewManager` 与 JS 子节点用法自动判定 **container / leaf**，并生成对应 stub；`rn.py analyse` 在报告中输出 `Layout (container / leaf)`。判定为 `unknown` 时默认叶子 stub，需人工核对。

若 JS 侧可包裹子 View 的容器组件，**禁止**仅用叶子模板的 `RNViewBase { 占位 UI }`（子节点不会渲染）。须对齐 **RNView.ets**：

- `public ctx!: RNOHContext`（`RNComponentContext` 仅用于 `instanceof` / cast，勿作为 ctx 类型）
- UI 符号从 **`@rnoh/react-native-openharmony`** 导入（**禁止**从 `/ts` 导入 `RNViewBase`、`DescriptorWrapper` 等）
- `LazyForEach` + `wrappedRNComponentBuilder.builder(ctx, descriptorWrapper.tag)`
- 布局/样式/手势加在外层 `Stack()`；需要 View 样式时用 `RNViewBaseAttributeModifier` + `ViewDescriptorWrapperBase`

```typescript
import {
  RNOHContext,
  RNComponentContext,
  DescriptorWrapper,
} from '@rnoh/react-native-openharmony';
import {
  ViewBaseDescriptor,
  ViewDescriptorWrapperBase,
  RNViewBaseAttributeModifier,
} from '@rnoh/react-native-openharmony';
import { {Name} as Spec } from '../generated/components/{Name}';

@Component
export struct {Name} {
  public static readonly NAME = Spec.NAME;
  public ctx!: RNOHContext;
  public tag: number = 0;
  @State private descriptorWrapper: ViewDescriptorWrapperBase | undefined = undefined;
  @State private rnViewAttributeModifier: RNViewBaseAttributeModifier | undefined = undefined;
  private eventEmitter: Spec.EventEmitter | undefined = undefined;
  private cleanUpCallbacks: (() => void)[] = [];

  aboutToAppear(): void {
    this.eventEmitter = new Spec.EventEmitter(this.ctx.rnInstance, this.tag);
    const descriptor = this.ctx.descriptorRegistry.getDescriptor<ViewBaseDescriptor>(this.tag);
    this.applyDescriptor(descriptor);
    this.cleanUpCallbacks.push(
      this.ctx.descriptorRegistry.subscribeToDescriptorChanges(this.tag, (d: ViewBaseDescriptor) => {
        this.applyDescriptor(d);
      })
    );
  }

  private applyDescriptor(descriptor: ViewBaseDescriptor): void {
    let dw = this.ctx.descriptorRegistry.findDescriptorWrapperByTag<ViewDescriptorWrapperBase>(this.tag);
    if (!dw || !(dw instanceof ViewDescriptorWrapperBase)) {
      dw = new ViewDescriptorWrapperBase(descriptor);
    }
    if (this.ctx instanceof RNComponentContext) {
      this.rnViewAttributeModifier = new RNViewBaseAttributeModifier(dw, this.ctx);
    }
    this.descriptorWrapper = dw;
    const rawProps = descriptor.rawProps as Spec.DirectRawProps;
  }

  aboutToDisappear(): void {
    this.cleanUpCallbacks.forEach(cb => cb());
  }

  build() {
    Stack() {
      if (this.descriptorWrapper?.focusable) {
        Button().width(0).height(0).padding(0).margin(0)
      }
      if (this.ctx instanceof RNComponentContext) {
        LazyForEach(this.ctx.createComponentDataSource({ tag: this.tag }),
          (descriptorWrapper: DescriptorWrapper) => {
            (this.ctx as RNComponentContext).wrappedRNComponentBuilder.builder(
              (this.ctx as RNComponentContext),
              descriptorWrapper.tag
            )
          },
          (descriptorWrapper: DescriptorWrapper) =>
            descriptorWrapper.tag.toString() + '@' + descriptorWrapper.renderKey
        )
      }
    }
    .width('100%')
    .height('100%')
    .id(this.tag.toString())
    .align(Alignment.TopStart)
    .attributeModifier(this.rnViewAttributeModifier)
    // 在此叠加 scale / gesture 等
  }
}
```

`rn.py build har` 前会自动跑 `check_fabric_ets.py`（见 `tool-ohos-plugin-repo/tool/check_fabric_ets.py`）。

参考：`failure-lessons` → `coding-import-002`。

---

## 禁止模式（编译可能通过但运行时必定失败）

| 禁止写法 | 正确替代 | 后果 |
|----------|---------|------|
| `import { RNViewBase, ... } from '@rnoh/react-native-openharmony/ts'` | UI 符号从 `'@rnoh/react-native-openharmony'` 导入；codegen 类型仍可从 `/ts` | HAR 编译报 no exported member / any-unknown |
| `public ctx!: RNComponentContext`（无 RNOHContext） | `public ctx!: RNOHContext` | 与 RNOH Fabric 契约不一致 |
| `@Prop ctx: Record<string, ESObject>` | `public ctx!: RNOHContext` | ESObject 无法调用 RNOH API，组件空白 |
| `this.descriptorWrapper.props.xxx` | `descriptor.rawProps as RNC.XXX.DirectRawProps` | 属性读取失败 |
| `this.descriptorWrapper.descriptor.rawProps` | `descriptor.rawProps`（从 `subscribeToDescriptorChanges` 回调获取） | rawProps 是 private 属性 |
| `descriptor.propsSelector` | `descriptor.rawProps` | propsSelector 是 private |
| 缺少 `aboutToDisappear` 清理 | 必须 `this.cleanUpCallbacks.forEach(cb => cb())` | 内存泄漏 + 重复订阅 |
| 叶子组件 `build()` 不用 `RNViewBase` | 叶子：`RNViewBase({ ctx, tag }) { ... }` | 不受 RN 布局管理 |
| 容器组件仅用 `RNViewBase` 占位、无 LazyForEach | 容器：见「容器组件」节 | 子节点不渲染 |
| Builder 不用 `Stack` 包裹 | 必须 `Stack() { if (...) { ... } }.position({ x: 0, y: 0 })` | 组件不渲染 |
| Package 缺少 `createDescriptorWrapperFactoryByDescriptorType` | 必须实现并注册所有 Fabric 组件 | 组件注册不到运行时，完全不可用 |

---

## 事件发射规则

1. **事件名必须与 codegen 一致**：事件名必须与 `generated/components/{Name}.ts` 中 `EventPayloadByName` 的 key 完全匹配
2. **禁止硬编码 payload**：事件 payload 必须使用 ArkUI 回调函数提供的真实 event 参数
3. **类型安全**：为 ArkUI 回调事件定义对应的接口

```typescript
// ✅ 正确：使用回调的真实 event 数据
.onComplete((event?: { width: number; height: number; componentWidth: number; componentHeight: number }) => {
  if (event) {
    this.eventEmitter?.emit('onLoad', {
      width: event.width,
      height: event.height,
    });
  }
})

// ❌ 错误：硬编码数据
.onComplete(() => {
  this.eventEmitter?.emit('onLoad', { width: 0, height: 0 });
})
```

---

## 禁用 ArkTS API 清单

以下 API 在当前 HarmonyOS SDK 中不可用或已废弃，**禁止使用**：

| 禁用 API | 替代方案 | 场景 |
|----------|---------|------|
| `ColorFilter.create()` | `Image.renderMode(ImageRenderMode.Template)` + `.fillColor(color)` | 图片着色（仅对矢量图/模板图有效） |
| `ColorFilterMatrix` | 不存在，无法使用 | 颜色矩阵 |
| `animateTo()` | `.animation({ duration: number, curve: Curve })` 组件级属性 | 属性动画 |
| `@Prop` 装饰器用于 Fabric 组件 | `RNOHContext` + `subscribeToDescriptorChanges` | Fabric 组件 props 传递 |

遇到不确定的 API，**必须**通过 `sub-doc-search` → `harmonyos-sdk-api-lookup` Skill 查证，**绝不猜测**。

---

## 1) 实现组件（必做）

1. 读 `generated/components/{Name}.ts` 契约，了解 Props 类型（`DirectRawProps`）、事件类型（`EventPayloadByName`）、Commands
2. 改 `components/{Name}.ets`：**叶子用叶子模板，容器用容器模板**（勿混用）
3. 在 `aboutToAppear` 中通过 `subscribeToDescriptorChanges` 订阅 props，从 `descriptor.rawProps` 读取属性
4. 事件发射：`this.eventEmitter.emit('eventName', { ... })`（payload 与 codegen 的 `EventPayloadByName` 一致，使用真实数据）
5. Commands（如有）：`new RNC.{Name}.CommandReceiver(...)` + `register` / `unregisterAll`

**禁止**：手写 Descriptor 类型；手写 Package（优先用脚本生成的 `{Name}Package.ts`，但必须验证 Descriptor 注册完整性）。

## 2) 依赖与权限（按需）

- ohpm → `ohos/harmony/{short_name}/oh-package.json5`
- npm → 同 turbo-module 的 `rn_dependency_mapping` 表
- 权限 → `module.json5`，`user_grant` 加 `reason`

## 3) 编译与排错

由 `SKILL.md` 步骤 6 执行 `rn.py build har`。

### 编译通过但组件不渲染的排查清单

如果 `rn.py build har` 成功（exit 0）但组件运行时空白/不显示/无响应，按以下顺序排查：

1. **Package Descriptor 注册**：检查 Package 是否实现了 `createDescriptorWrapperFactoryByDescriptorType`
2. **Builder Stack 包裹**：检查 `Index.ets` 的 Builder 是否用 `Stack` 包裹
3. **组件模式**：叶子 → `RNOHContext` + `RNViewBase`；容器 → `LazyForEach` + `wrappedRNComponentBuilder`（见容器节）
4. **Props 订阅**：检查 `aboutToAppear` 中是否调用 `subscribeToDescriptorChanges`
5. **@State 绑定**：检查 `@State` 变量是否在 `build()` 中实际引用
6. **事件名一致**：检查事件名是否与 codegen 的 `EventPayloadByName` 一致

失败修错见 `compile-fix-har.md`。

---

## 实现后：返回主流程

实现完成后，**回到 `SKILL.md` 主流程**，完成所有质检步骤（跨边界合约自查、行为基线对照、Codegen 完整性检查）后再编译。
