> 前置依赖：阅读本文前请先读 [`ui-coding-reactive-dataflow.md`](./ui-coding-reactive-dataflow.md)
> API 签名和官方用法请从 `harmonyos-docs-lookup` 核实。

# 组件接口设计 — 响应式承载 / Builder / 回调 / setter 迁移

先识别公开能力属于哪一类：外部配置、事件回调、命令式控制、可注入内容、可查询状态、生命周期依赖。每一类都要明确三件事：谁传入、谁持有、谁观察结果。只有这三件事闭合，迁移才算完成。

## 1. Android setter / listener 的 ArkUI 承载方式

**特别强调**：Android 中会立即改变布局或可见性的命令式 setter，在 ArkUI 里必须落实为实际的布局属性、渲染分支、数据顺序或显隐语义变化——不能只把值存起来就算完成迁移。

| Android 形态 | ArkUI/HAR 主承载方式 | 迁移原则 |
| :-- | :-- | :-- |
| 外部配置 setter | `@Prop` / `@Link` / 配置对象 | 不能只把值存起来，必须真正进入渲染分支、布局参数或系统 API 参数 |
| 事件监听器 / callback 接口 | **无装饰器**回调属性 / 明确事件接口 | **禁止用 `@Prop` 声明 function 类型**（运行时 crash 140115）；不能只接收后打印日志；必须在真实事件路径里调用 |
| 可替换内容 / 自定义布局 | `@BuilderParam` 或等价注入接口 | 必须明确谁调用、何时调用、传什么上下文/位置参数 |
| 命令式操作 | `@State`→`@Prop`/`@Link`→`@Watch`、Host/Portal、状态对象；必要时用薄 controller/service facade | 不能藏成内部私有状态变化；宿主需要有稳定入口触发，且用户可见状态必须进入响应式链路 |
| 查询类 API | 可复用实例上的查询方法 / 状态快照接口 | 查询结果必须来自当前真实运行态，而不是新建对象后的默认值 |

## 2. 外部可配置属性禁止用 @State private 偷存

ArkUI 组件所有**外部可配置**属性必须用 `@Prop` / `@Link` / `@BuilderParam` 等正确机制暴露，事件回调属性必须可由宿主传入。不要用内部 `@State private` 偷存外部配置。

常见违规模式：
- 外部应该能传入的配置项（颜色、尺寸、开关状态、文本内容等）用 `@State private` 声明，宿主无法传入
- 事件回调用 `@Prop` 声明（运行时 crash）而非无装饰器属性
- 宿主必须依赖的回调接口没有暴露为 public 属性

## 3. 命令式 API 优先转为响应式状态

Android 的 `view.setXxx()`、`view.start()`、`view.stop()` 往往隐含“拿到 View 实例并直接改 UI”。ArkUI 组件实例由框架托管，父组件不能稳定获取子组件实例再调用方法。因此迁移时默认不要设计“Controller 保存组件实例再调用组件 public 方法”的架构。

**禁止模式**：
- `private component: XxxComponent | null` 保存 `@Component struct` 实例
- `setComponent(this)` / `controller.bind(this)` 把组件 `this` 交给 controller
- controller 调 `component.start()` / `component.setValue()` 来驱动 UI
- `declare class XxxComponent` 只为绕开循环依赖、让 controller 调组件方法
- 只修改 controller 对象字段，然后期待 ArkUI 自动刷新 UI

### 3.1 推荐模式 A：父状态驱动组件

外部可见的值、开关、选中、进度、显隐、动画目标值，优先放在父组件或宿主可管理的响应式状态里，再传给 HAR 组件。

```typescript
@Component
export struct ProgressView {
  @Prop @Watch('syncProgress') progress: number = 0;
  @State private animatedProgress: number = 0;

  aboutToAppear(): void {
    this.syncProgress();
  }

  private syncProgress(): void {
    this.animatedProgress = Math.max(0, Math.min(100, this.progress));
  }

  build() {
    Progress({ value: this.animatedProgress, total: 100 })
  }
}

@Component
struct DemoPage {
  @State progress: number = 0;

  build() {
    Column() {
      ProgressView({ progress: this.progress })
      Button('Start').onClick(() => { this.progress = 100; })
      Button('Reset').onClick(() => { this.progress = 0; })
    }
  }
}
```

### 3.2 推荐模式 B：Host/Portal 承载全局 UI

弹窗、Toast、Snackbar、Loading、悬浮层、页面级面板等需要从 service/API 触发但必须渲染到组件树里的能力，优先导出 Host/Portal 组件 + 状态对象。宿主在页面根部挂载 Host，公开 API 只更新状态对象或派发事件，Host 负责响应式渲染。

```typescript
@Observed
export class OverlayState {
  visible: boolean = false;
  message: string = '';
}

export class OverlayService {
  private state: OverlayState;

  constructor(state: OverlayState) {
    this.state = state;
  }

  show(message: string): void {
    this.state.message = message;
    this.state.visible = true;
  }

  dismiss(): void {
    this.state.visible = false;
  }
}

@Component
export struct OverlayHost {
  @ObjectLink state: OverlayState;

  build() {
    Stack() {
      if (this.state.visible) {
        Text(this.state.message)
      }
    }
  }
}

@Component
struct Page {
  @State private overlayState: OverlayState = new OverlayState();
  private overlayService?: OverlayService;

  aboutToAppear(): void {
    this.overlayService = new OverlayService(this.overlayState);
  }

  build() {
    Stack() {
      Column() {
        Button('Show').onClick(() => {
          this.overlayService?.show('Saved');
        })
      }
      OverlayHost({ state: this.overlayState })
    }
  }
}
```

`@ObjectLink` 必须由父组件中的状态源初始化。不要把普通 class service 的普通字段直接传给 `@ObjectLink`；应由页面或宿主持有 `@State OverlayState`，service 只保存这份状态对象引用并修改其属性。

### 3.3 允许模式 C：controller/service 只做资源或命令 facade

当原 SDK 必须保留 `start()`/`stop()`/`reset()`、媒体播放、轮询、订阅、Native 资源生命周期等命令式 API 时，可以导出 controller/service，但它不能持有组件实例。它应当：

- 管理非视觉资源、定时器、订阅、播放器、网络任务或系统 controller
- 通过回调、状态对象、事件流或宿主 `@State` 改变可见状态
- 在 `cancel` / `close` / `dispose` / `stop` / `reset` 路径保证幂等和资源清理
- 由组件或宿主在生命周期中注册/注销监听

**自检**：
1. UI 可见状态是否能从宿主一路追到 `@State` / `@Prop` / `@Link` / `@ObjectLink`？
2. 是否没有 `setComponent(this)`、组件实例字段、组件 public 方法反调？
3. controller/service 的方法是否最终改变响应式状态、触发回调或作用到真实资源？
4. 对象内部字段修改是否通过引用替换、`@Observed`/`@ObjectLink` 或显式回调触发 UI？
5. 生命周期退出时是否清理 timer、listener、系统 controller、Native 资源？

### 异步初始化禁止静默吞错

```typescript
// ❌ catch 只打日志 → 调用方误认为成功
catch (error) { hilog.error(...); }
// ✅ 必须 re-throw
catch (error) { hilog.error(...); throw new Error('Init failed: ' + (error as Error).message); }
```

### 安全命令 facade 示例

```typescript
// Library: controller 只发出状态变化，不保存 ProgressView 实例
export class ProgressController {
  private onProgressChange?: (progress: number) => void;

  setProgressListener(listener?: (progress: number) => void): void {
    this.onProgressChange = listener;
  }

  startAnimation(): void {
    this.onProgressChange?.(100);
  }

  reset(): void {
    this.onProgressChange?.(0);
  }
}

// Library: 组件只接收响应式 progress
@Component
struct ProgressView {
  @Prop @Watch('syncProgress') progress: number = 0;
  @State private animatedProgress: number = 0;

  aboutToAppear(): void {
    this.syncProgress();
  }

  private syncProgress(): void {
    this.animatedProgress = this.progress;
  }

  build() {
    Progress({ value: this.animatedProgress, total: 100 })
  }
}

// Demo: controller 回调回写 @State，再传入组件
@Component
struct ProgressDemo {
  private ctrl: ProgressController = new ProgressController();
  @State private progress: number = 0;

  aboutToAppear(): void {
    this.ctrl.setProgressListener((progress: number) => {
      this.progress = progress;
    });
  }

  aboutToDisappear(): void {
    this.ctrl.setProgressListener(undefined);
  }

  build() {
    Column() {
      ProgressView({ progress: this.progress })
      Button('开始').onClick(() => {
        this.ctrl.startAnimation();
      })
    }
  }
}
```

## 4. @Builder 参数含原始类型且用于渲染时须改为 @Component

### 4.1 参数含 Function 回调

若 `@Builder` 参数同时满足以下全部条件，禁止使用，必须改为 `@Component` + `@Prop`：

| # | 条件 | 检查方式 |
|---|------|---------|
| 1 | 参数类型含 `number`/`string`/`boolean` | 看函数签名 |
| 2 | 参数在 Builder 体内直接用于 UI 组件构造或属性绑定 | 看函数体 |
| 3 | 参数列表中含 `Function` 回调 | 看函数签名 |

```typescript
// ✅ @Component + @Prop
@Component
export struct SliderControl {
  @Prop value: number;
  onChange?: (v: number) => void;
  build() {
    Slider({ value: this.value })
    Text(`${this.value}`)
  }
}
```

**使用方**：

```typescript
SliderControl({ value: this.shadowSize, onChange: v => { this.shadowSize = v; } })
```

### 4.2 纯数据原始类型用于 UI 属性绑定

若 `@Builder` 参数中含有原始类型（`number`/`string`/`boolean`）且直接用于 UI 属性绑定（如 `.backgroundColor()`、`.fontColor()`），即使不含 `Function` 回调，也**建议改为 `@Component` + `@Prop`**。`@Builder` 参数按值传递不建立响应式依赖，原始类型值变化不会触发 Builder 内 UI 属性更新。

```typescript
// ❌ isSelected 按值传递，backgroundColor / fontColor 不响应选中变化
@Builder
iconButton(isSelected: boolean, label: string) {
  Button() {
    Text(label)
  }
  .backgroundColor(isSelected ? '#ff33b5e5' : '#ffe0e0e0')
  .fontColor(isSelected ? '#ffffff' : '#ff33b5e5')
}

// ✅ @Component + @Prop
@Component
export struct IconButton {
  @Prop isSelected: boolean = false;
  label: string = '';
  build() {
    Button() {
      Text(this.label)
    }
    .backgroundColor(this.isSelected ? '#ff33b5e5' : '#ffe0e0e0')
    .fontColor(this.isSelected ? '#ffffff' : '#ff33b5e5')
  }
}
```

**使用方**：

```typescript
IconButton({ isSelected: this.currentIndex === 0, label: '选项A' })
```

不满足条件 1+2（原始类型不用于属性绑定）：可继续使用 `@Builder`。

## 5. @BuilderParam 跨组件调用 this / 状态边界

`@Builder` 方法通过 `@BuilderParam` 传递后，builder 的执行位置在子组件侧，不能把它当作父组件 build 体的自然延伸。若 builder 内依赖父组件 `this`、父组件 `@State`、父组件方法或事件回调，可能出现 `this` 丢失、状态快照不刷新、回调不可调用等问题。

### 模式 A：优先改为 @Component + @Prop / 回调

```typescript
// ✅ 状态和回调通过显式接口传入，子组件刷新边界清晰
@Component
export struct SectionContent {
  @Prop value: string = '';
  onAction?: () => void;

  build() {
    Button(this.value).onClick(() => { this.onAction?.(); })
  }
}

SectionContent({
  value: this.title,
  onAction: (): void => { this.refresh(); }
})
```

### 模式 B：箭头函数仅用于简单保留 this

箭头函数可以保留词法 `this`，但它不是响应式数据流的替代方案。只在 builder 内容简单、没有复杂父状态同步需求时使用；一旦 builder 内需要多项状态、回调或可交互 UI，优先改为 `@Component + @Prop`。

```typescript
// 可接受：简单包装，避免直接传方法导致 this 丢失
SectionCard({ content: (): void => { this.LongHashMapContent(); } })

// ❌ 直接传方法，内部访问 this.ResultBox() 等可能 crash
SectionCard({ content: this.LongHashMapContent })
```

### 模式 C：纯数据参数（builder 不访问 this 时用）

```typescript
@BuilderParam itemBuilder: (adapter: BannerAdapter, position: number) => void;
@Builder simpleItemBuilder(adapter: BannerAdapter, position: number) {
  Text(adapter.getItem(position))  // 用参数，不用 this
}
```

## 6. 容器子组件圆角裁剪

### 6.1 正确模式

容器（Stack/Row/Column）需要圆角裁剪内部子组件时：

```typescript
// ✅ 正确：clip(true) + borderRadius
Stack() {
  this.content()
}
.clip(true)
.borderRadius({
  topLeft: 12,
  topRight: 12,
  bottomRight: 12,
  bottomLeft: 12
})
```

### 6.2 clipShape 适用范围

`clipShape(Shape)` 只裁剪组件自身的背景/边框绘制区域，不裁剪子组件内容。适用于单组件自定义形状裁剪，不适合容器子组件裁剪。

```typescript
// ✅ clipShape 正确使用场景：Image 组件
Image($r('app.media.icon'))
  .clipShape(new CircleShape({ width: '100px', height: '100px' }))

// ❌ clipShape 不能裁剪容器子组件
Stack() { this.content() }
  .clipShape(new Rect().radius([12, 12, 12, 12]))  // 子组件不被裁剪
```

### 6.3 正圆形裁剪

```typescript
Stack() { this.content() }
  .clip(true)
  .borderRadius(Math.min(componentWidth, componentHeight) / 2)
```

### 6.4 检查清单

- [ ] 容器裁剪子组件内容 → 用 `.clip(true) + .borderRadius(...)`，不用 `.clipShape(...)`
- [ ] `borderRadius` 不支持传入 `number[]` → 用对象字面量或单个值
- [ ] 不熟悉属性类型时先用 `harmonyos-docs-lookup` 确认签名

---
### 参考
- `harmonyos-docs-lookup`：@Builder 装饰器规则、@BuilderParam 使用指导、@Link 装饰器规则
