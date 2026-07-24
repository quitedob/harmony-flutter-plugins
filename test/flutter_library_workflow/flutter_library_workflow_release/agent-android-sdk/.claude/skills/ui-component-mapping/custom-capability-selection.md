# 自定义能力选型指南

当 Android 源码中存在自定义 View（`extends View`/`ViewGroup`，含 `onDraw`/`onMeasure`/`onLayout`）或 XML 资源（布局/Drawing/动画）时，需根据其特征选择 ArkUI 的实现层级。

---

## 决策树

```
Android UI 输入
│
├─ 输入是 Java/Kotlin 自定义 View 代码？
│   ├─ 只用系统组件组合，无需自定义绘制？
│   │   └─ YES → L1 自定义组合（@Component + 系统容器）
│   │
│   ├─ 有 onDraw 自绘内容？
│   │   ├─ 绘制内容独立，不叠加在系统组件上？
│   │   │   └─ YES → L1 自定义组合（@Component + Canvas）
│   │   │
│   │   ├─ 绘制内容叠加在现有系统组件上？
│   │   │   └─ YES → L2 自定义扩展（DrawModifier）
│   │   │
│   │   └─ 绘制内容需要替换系统组件的默认绘制？
│   │       └─ YES → L2 自定义扩展（ContentModifier）
│   │
│   ├─ 需要自定义测量/布局逻辑（onMeasure/onLayout）？
│   │   ├─ 只需调整子组件排布？
│   │   │   └─ YES → L1 自定义组合（自定义布局回调）
│   │   │
│   │   └─ 需要完全控制测量/布局/绘制？
│   │       └─ YES → L3 自定义节点（FrameNode）
│   │
│   ├─ 需要动态添加/删除手势？
│   │   └─ YES → L2 自定义扩展（GestureModifier）
│   │       ⚠️ GestureModifier 无独立官方文档，使用时需查阅 API References 确认签名
│   │
│   ├─ 需要大量组件频繁更新属性（性能敏感）？
│   │   └─ YES → L2 自定义扩展（AttributeUpdater）
│   │
│   ├─ 需要 EGL/OpenGLES 渲染（游戏/地图/相机）？
│   │   └─ YES → L4 自定义渲染（XComponent）
│   │
│   └─ 其他场景
│       └─ 默认 → L1 自定义组合
│
├─ 输入是 XML Layout？
│   ├─ 含自定义 View 全限定名标签 → 先解自定义 View（进入上方分支），再映射布局
│   ├─ 页面/片段布局（activity_/fragment_） → L1 自定义组合（@Component struct）
│   ├─ 列表 Item 布局（RecyclerView 子项） → L1 自定义组合（@Component 或 @Builder）
│   ├─ <include> 可复用片段 → L1（@Builder 函数）
│   └─ <ViewStub> 懒加载片段 → L1（if 条件渲染）
│
├─ 输入是 XML Drawable？
│   ├─ <selector>（状态→样式映射）
│   │   ├─ 只需通用属性（backgroundColor/borderRadius/opacity） → .stateStyles()（L1，6 种状态）
│   │   └─ 需要组件私有属性（fontColor 等） → AttributeModifier（L2，5 个 apply 方法）
│   ├─ <ripple>（涟漪触摸反馈）
│   │   ├─ 简单按压变色 → .stateStyles() 或 AttributeModifier.applyPressedAttribute()
│   │   ├─ 涟漪扩散动画叠加在现有组件上 → L2 DrawModifier + onTouch + invalidate()
│   │   └─ 完全自绘涟漪 → L1 Canvas + @Watch + animateTo + drawAll()
│   ├─ <shape>（纯色填充/描边/圆角） → L1 Shape 子组件（Rect/Circle/Path 等）
│   │   ⚠️ Shape.fill 不支持渐变，渐变需用 .linearGradient() 背景或 Canvas ShaderEffect
│   ├─ <layer-list> → L1 Stack + 多层 Shape
│   ├─ <vector>（静态矢量图） → L1 Shape + Path.commands（SVG path 语法兼容）
│   ├─ <animated-vector> → L1 animateTo 驱动 Shape @State 属性
│   └─ <animated-selector> → L2 AttributeModifier + animateTo
│
├─ 输入是 XML Animation？
│   ├─ <objectAnimator>/<alpha>/<scale>/<translate>/<rotate> → L1 animateTo 修改 @State
│   ├─ <set>（并行） → 同一 animateTo 内修改多个 @State
│   ├─ <set>（串行） → 嵌套 animateTo + onFinish
│   └─ <keyframe>/<propertyValuesHolder> → ⚠️ 无原生 keyframe API
│       ├─ 链式 animateTo 串行（多段起止值）
│       ├─ @ohos.animator + onFrame(progress) 手动插值
│       └─ curves.customCurve() 自定义插值函数
│
└─ 其他
    └─ 默认 → L1 自定义组合
```

---

## 四层能力对比

| 维度 | L1 自定义组合 | L2 自定义扩展 | L3 自定义节点 | L4 自定义渲染 |
|------|-------------|-------------|-------------|-------------|
| **核心机制** | `@Component` + 系统组件 + Canvas/Shape | Modifier 机制分离 UI 与样式 | FrameNode/RenderNode 底层节点 | XComponent + NativeWindow |
| **灵活性** | 低 | 中 | 高 | 最高 |
| **开发难度** | 低 | 中 | 高 | 最高 |
| **适用场景** | 大多数自定义组件 | 扩展现有组件 | 三方框架对接 | 游戏/地图/相机 |
| **状态管理** | `@State`/`@Prop`/`@Link` | Modifier 对象 | 节点属性 | Native 侧管理 |
| **动画支持** | `animateTo` + `@State` | Modifier 属性动画 | 节点属性动画 | Native 动画引擎 |
| **事件处理** | `.onClick`/`.onTouch`/`.gesture()` | `GestureModifier` | 节点事件监听 | Native 事件 |
| **HAR 可用性** | ✅ | ✅ | ✅ | ✅（需 Native 模块） |

---

## L1 自定义组合：代码骨架

### 1a. 系统组件组合

```typescript
@Component
export struct MyCompoundView {
  @Prop title: string = ''
  @Prop subtitle: string = ''
  @Prop icon: ResourceStr = ''
  onCardClick?: () => void

  build() {
    Row() {
      Image(this.icon).width(40).height(40)
      Column() {
        Text(this.title).fontSize(16).fontWeight(FontWeight.Bold)
        Text(this.subtitle).fontSize(12).fontColor('#999999')
      }.alignItems(HorizontalAlign.Start).layoutWeight(1)
    }
    .padding(12)
    .borderRadius(8)
    .backgroundColor(Color.White)
    .onClick(() => this.onCardClick?.())
  }
}
```

### 1b. Canvas 自绘

```typescript
@Component
export struct MyCanvasView {
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  @State private drawWidth: number = 0
  @State private drawHeight: number = 0
  @Prop value: number = 0
  onValueChanged?: (v: number) => void

  build() {
    Column() {
      Canvas(this.context)
        .width('100%')
        .height('100%')
        .onReady(() => {
          this.drawAll()
        })
        .onAreaChange((_old: Area, newArea: Area) => {
          this.drawWidth = Number(newArea.width)
          this.drawHeight = Number(newArea.height)
          this.drawAll()
        })
        .onTouch((event: TouchEvent) => {
          if (event.type === TouchType.Down) {
            const x = event.touches[0].x
            const y = event.touches[0].y
            this.handleTouch(x, y)
          }
        })
    }.width('100%')
  }

  private drawAll(): void {
    if (this.drawWidth === 0 || this.drawHeight === 0) return
    const ctx = this.context
    ctx.clearRect(0, 0, this.drawWidth, this.drawHeight)
    // ... 绘制逻辑
  }

  private handleTouch(x: number, y: number): void {
    // ... 碰撞检测和交互逻辑
  }
}
```

### 1c. 自定义布局

> 官方 API：`onMeasureSize`（测量）+ `onPlaceChildren`（放置），属于 `@Component` 的布局生命周期回调。

```typescript
@Component
export struct MyLayoutView {
  @State private result: SizeResult = { width: 0, height: 0 }

  onMeasureSize(selfLayoutInfo: GeometryInfo, children: Array<Measurable>, constraint: ConstraintSizeOptions): SizeResult {
    let totalHeight: number = 0
    let maxWidth: number = 0
    children.forEach((child: Measurable) => {
      const measureResult: MeasureResult = child.measure({ maxHeight: Infinity, maxWidth: constraint.maxWidth })
      totalHeight += measureResult.height
      maxWidth = Math.max(maxWidth, measureResult.width)
    })
    this.result.width = maxWidth
    this.result.height = totalHeight
    return this.result
  }

  onPlaceChildren(selfLayoutInfo: GeometryInfo, children: Array<Layoutable>, constraint: ConstraintSizeOptions): void {
    let yOffset: number = 0
    children.forEach((child: Layoutable) => {
      child.layout({ x: 0, y: yOffset })
      yOffset += child.measureResult.height
    })
  }

  build() {
    Column() {
      // 子组件
    }.width('100%')
  }
}
```

---

## L2 自定义扩展：代码骨架

### 2a. DrawModifier（叠加绘制）

> 官方 API：`extends DrawModifier`（非 implements），4 个可选方法 `drawBehind`/`drawContent`/`drawFront`/`drawForeground`。
> - `drawBehind`：组件背景层绘制（类似 Android onDraw 背景）
> - `drawContent`：替换组件内容绘制
> - `drawFront`：组件前景层绘制（覆盖在组件之上）
> - `drawForeground`：最前景层绘制（覆盖在前景装饰之上）
> - 尺寸通过 `context.size.width` / `context.size.height` 获取
> - 调用 `this.invalidate()` 触发重绘

```typescript
class MyDrawModifier extends DrawModifier {
  private progress: number = 0.6

  drawBehind(context: DrawContext): void {
    const canvas = context.canvas
    const width = context.size.width
    const height = context.size.height
    // 在系统组件绘制之前绘制（背景层）
    canvas.drawRect({
      x: 0, y: height - 4,
      w: width * this.progress, h: 4
    }, { color: Color.Blue })
  }

  drawFront(context: DrawContext): void {
    // 在系统组件绘制之后叠加（前景层）
  }

  updateProgress(progress: number): void {
    this.progress = progress
    this.invalidate()
  }
}

@Component
struct MyViewWithOverlay {
  private drawModifier: MyDrawModifier = new MyDrawModifier()

  build() {
    Text('Hello')
      .drawModifier(this.drawModifier)
  }
}
```

### 2b. AttributeModifier（动态属性）

> 官方 API：`implements AttributeModifier<XxxAttribute>`，5 个可选方法对应不同交互状态。

```typescript
class MyButtonModifier implements AttributeModifier<ButtonAttribute> {
  private isPressed: boolean = false

  applyNormalAttribute(instance: ButtonAttribute): void {
    instance
      .backgroundColor(this.isPressed ? '#1565C0' : '#2196F3')
      .borderRadius(8)
      .fontSize(16)
  }

  applyPressedAttribute(instance: ButtonAttribute): void {
    this.isPressed = true
    this.applyNormalAttribute(instance)
  }

  applyFocusedAttribute(instance: ButtonAttribute): void {
    instance.border({ width: 2, color: '#64B5F6' })
  }

  applyDisabledAttribute(instance: ButtonAttribute): void {
    instance.backgroundColor('#BDBDBD').fontColor('#757575')
  }

  applySelectedAttribute(instance: ButtonAttribute): void {
    instance.backgroundColor('#1565C0')
  }
}
```

### 2c. ContentModifier（替换内容）

> 官方 API：`implements ContentModifier<XxxConfiguration>`，泛型参数为组件专用 Configuration 类型。
> 支持：Button/Checkbox/DataPanel/TextTimer/Slider/Select/Rating/Radio/Gauge/Toggle/TextClock。

```typescript
class MySliderModifier implements ContentModifier<SliderConfiguration> {
  applyContent(): WrappedBuilder<[SliderConfiguration]> {
    return wrapBuilder(sliderContentBuilder)
  }
}

@Builder
function sliderContentBuilder(config: SliderConfiguration) {
  Row() {
    Text(`${Math.round(config.value)}%`)
    // 自定义滑块内容，config 包含原组件的 value/step/min/max 等属性
  }
}
```

---

## L3 自定义节点：代码骨架

> ⚠️ 仅当 L1/L2 无法满足需求时使用（如三方框架对接、完全自定义测量/布局/绘制）
>
> 官方 API：FrameNode 无 `setMeasureStrategy`。自定义测量布局需通过 RenderNode 的 layout 回调实现。

```typescript
import { FrameNode, RenderNode, NodeController } from '@kit.ArkUI'

class MyRenderNode extends RenderNode {
  draw(context: DrawContext): void {
    const canvas = context.canvas
    const width = context.size.width
    const height = context.size.height
    // 自定义绘制逻辑
    canvas.drawRect({ x: 0, y: 0, w: width, h: height }, { color: Color.Red })
  }
}

class MyNodeController extends NodeController {
  private rootNode: FrameNode | null = null
  private renderNode: MyRenderNode = new MyRenderNode()

  makeNode(uiContext: UIContext): FrameNode {
    this.rootNode = new FrameNode(uiContext)
    this.renderNode.width = 200
    this.renderNode.height = 100
    this.rootNode.getRenderNode().appendChild(this.renderNode)
    return this.rootNode
  }
}
```

---

## L4 自定义渲染：代码骨架

> ⚠️ 仅用于游戏引擎、地图、相机等自带渲染引擎的场景

```typescript
@Component
struct MyXComponentView {
  private xComponentController: XComponentController = new XComponentController()
  private surfaceId: string = ''

  build() {
    XComponent({
      id: 'myXComponent',
      type: XComponentType.SURFACE,
      controller: this.xComponentController
    })
      .onLoad(() => {
        this.surfaceId = this.xComponentController.getXComponentSurfaceId()
        // 将 surfaceId 传给 Native 侧，创建 EGL 环境
      })
      .width('100%')
      .height('100%')
  }
}
```

---

## 选型常见错误

| 错误选型 | 正确选型 | 原因 |
|---------|---------|------|
| L3 FrameNode 做简单自绘组件 | L1 @Component + Canvas | L3 开发成本远高于 L1，简单场景无必要 |
| L1 Canvas 做叠加绘制 | L2 DrawModifier | 叠加绘制用 DrawModifier 不需要独立 Canvas |
| L2 ContentModifier 替换整个组件 | L1 自定义组合 | 完全自定义内容用 `@Component` 更清晰 |
| L4 XComponent 做普通 UI | L1/L2 | XComponent 仅用于 Native 渲染引擎 |
| L1 Canvas 用 `invalidate()` 思路重绘 | L1 用 `@State` 驱动重绘；L2 DrawModifier 用 `this.invalidate()` | L1 Canvas 是声明式，修改 `@State` 自动触发重绘；L2 DrawModifier 可用 `invalidate()` |

---

## 选型检查清单

在 02-planning 阶段确定 UI 能力的实现层级后，逐项确认：

- [ ] 每个 Android 自定义 View 都已确定 L1/L2/L3/L4 层级
- [ ] L1 场景已区分"系统组件组合"与"Canvas 自绘"
- [ ] L2 场景已区分 DrawModifier/AttributeModifier/ContentModifier/GestureModifier
- [ ] 选 L3/L4 的场景已在 `risk_items` 中标注高难度风险
- [ ] 选型结果已写入 `architecture_transformation.key_changes` 和对应 `implementation_work_units.notes` / `android_evidence` / `public_api_exports` / `acceptance`
