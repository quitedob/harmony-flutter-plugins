# ArkUI 动画专项指南

本文件用于 HarmonyOS SDK 编写动画、动效组件、Animation、Animator、Interpolator、启动页动画、进度/图表/自绘动效、转场、模糊/阴影/渐变等场景。涉及动画时必须先读本文件，再编码。

目标保证动画入口真实可达、参数真实生效、首帧和动态变更都可见，并符合 ArkUI 声明式开发范式。

## 1. 动画接口选型

| 场景 | 优先方案 | 关键要求 | 不要这样做 |
|------|----------|----------|------------|
| 组件始终存在，只是透明度、缩放、旋转、平移、颜色、模糊等属性变化 | `animateTo` 或 `.animation()` | 动画属性必须绑定响应式状态 | 只改普通字段、局部变量或内部缓存 |
| 多个属性使用同一动画参数一起变化 | `this.getUIContext()?.animateTo({ ... }, () => { ... })` | 在闭包内修改状态变量 | 直接调用全局 `animateTo`，或在闭包外改值 |
| 不同组件/不同属性需要不同动画参数 | `.animation()` | 写在需要生效的属性之后；调用顺序决定作用范围 | 把 `.animation()` 写在属性之前却期待生效 |
| 同一属性需要连续多段动画 | `keyframeAnimateTo` | 每段 keyframe 的 `event` 只改该段目标状态 | 靠多个 `onFinish` 串联多段动画 |
| 组件新增/删除时出现或消失 | `.transition(TransitionEffect...)` | 必须由 `if` 等条件渲染触发新增/删除 | 用属性动画假装出现/消失，或对不存在的组件做动画 |
| 需要每帧插值、暂停/恢复、实时响应 | `this.getUIContext().createAnimator()` | 管理 `AnimatorResult` 生命周期，页面隐藏时释放 | 属性动画能满足时滥用帧动画 |
| 系统属性不可动画但参数可连续插值 | `@AnimatableExtend` | 参数只能是 `number` 或实现 `AnimatableArithmetic<T>` 的类型 | 对离散类型、普通对象、不可插值数据强行动画 |
| 组件库要复刻系统控件点击、选中、滑动反馈 | 优先保留 ArkUI 组件默认动效，再按公开契约补定制动效 | 只在 HAR 组件职责内处理，不扩展到 App 页面转场 | 覆盖默认反馈后没有补回 pressed/selected/disabled 等可见状态 |
| 组件库提供滚动/列表/轮播类子项动效 | 属性动画、`AttributeModifier`、必要时 `createAnimator` | 用 `scale` / `translate` / `opacity` / `zIndex` 等仿射属性驱动子项视觉 | 高频改 `width`/`height` 或只在外层调用方包装滚动效果 |

## 2. 属性动画：`animateTo`

`animateTo` 是通用函数，对闭包前界面和闭包中状态变量改变后的界面差异做动画。适合多个可动画属性共用一组动画参数，或需要嵌套动画的场景。

**必须这样写：**

- 通过 `this.getUIContext()?.animateTo(...)` 调用，避免 UIContext 不明确。
- 在闭包内修改 `@State` / `@Link` / `@Prop` 派生状态等能驱动 UI 的变量。
- 把需要动画的属性绑定到这些状态变量上，例如 `.rotate({ angle })`、`.translate({ x })`、`.opacity(value)`、`.scale({ x, y })`。
- 多段循环优先用 `AnimateParam.playMode` / `iterations` 或 `keyframeAnimateTo`，不要靠结束回调递归启动。

**最小模式：**

```ts
@State private moved: boolean = false;
@State private offsetX: number = 0;
@State private opacityValue: number = 1;

Button('Play')
  .onClick(() => {
    this.getUIContext()?.animateTo({ duration: 300, curve: 'Ease' }, () => {
      this.moved = !this.moved;
      this.offsetX = this.moved ? 80 : 0;
      this.opacityValue = this.moved ? 0.6 : 1;
    });
  })

Column()
  .translate({ x: this.offsetX })
  .opacity(this.opacityValue)
```

**常见错误：**

- 在 `animateTo` 闭包外改状态，闭包里只写日志。
- 改了状态，但 UI 属性没有绑定这个状态。
- 用普通字段承载动画目标值，导致 UI 不刷新或刷新不可控。
- 把业务完成逻辑放进 `onFinish` 当唯一真相。开发者选项关闭过渡动画、页面退后台时，动画可能立即结束并触发结束逻辑。

## 3. 属性动画：`.animation()`

`.animation()` 识别组件可动画属性变化并自动添加动画，适合对多个组件或属性配置不同动画参数。

**调用顺序非常重要：**

- `.animation()` 只作用于它上方已经设置的可动画属性。
- 同一组件可以通过多次 `.animation()` 给不同属性配置不同参数。
- 如果属性在 `.animation()` 下面设置，这个属性变化不会被该 `.animation()` 捕获。

**正确模式：**

```ts
Column()
  .opacity(this.opacityValue)
  .rotate({ angle: this.rotateValue })
  .animation({ duration: 300, curve: 'Ease' })
  .backgroundColor('#317AF7')
```

**错误模式：**

```ts
Column()
  .animation({ duration: 300 })
  .opacity(this.opacityValue) // 不要期待上面的 animation 作用到这里
```

## 4. 关键帧动画：`keyframeAnimateTo`

`keyframeAnimateTo` 适合一个或多个属性连续经历多个阶段，例如先放大再回弹、先淡出再滑入、先旋转再复位。

**使用规则：**

- 通过 `this.getUIContext()?.keyframeAnimateTo({ ... }, keyframes)` 调用。
- 每一段 keyframe 的 `event` 中只写该段终点状态。
- 不推荐嵌套 `keyframeAnimateTo`。
- 如果同一属性多段连续变化，用 keyframe 优先于 `onFinish` 串联，减少衔接卡顿和状态管理复杂度。

```ts
this.getUIContext()?.keyframeAnimateTo({ iterations: 1 }, [
  {
    duration: 800,
    event: () => {
      this.rotateValue = 90;
      this.opacityValue = 0.6;
    }
  },
  {
    duration: 500,
    event: () => {
      this.rotateValue = 0;
      this.opacityValue = 1;
    }
  }
]);
```

## 5. 动画曲线选择

动画曲线决定属性变化速度。官方文档将曲线分为传统曲线和物理弹簧曲线；一般优先使用符合物理规律的弹簧曲线，传统曲线只在需要固定数学曲线时作为补充。

**曲线选择建议：**

| 场景 | 推荐曲线 | 说明 |
|------|----------|------|
| 普通点击反馈、自然回弹、状态切换 | `curves.springMotion()` | 动画时长由曲线参数、属性变化值和初速度自动计算；传入的 `duration` 不按传统方式生效 |
| 跟手拖拽过程 | `curves.responsiveSpringMotion()` | 适合手指移动过程，离手后再用 `springMotion()`，系统可继承速度实现衔接 |
| 需要指定初速度的物理运动 | `curves.interpolatingSpring(velocity, mass, stiffness, damping)` | velocity 是归一化速度，属性起点终点相同或变化量为 0 时不能套用 |
| 必须匹配 Android 传统插值器、固定时长缓入缓出 | `'Linear'` / `'Ease'` / `'EaseIn'` / `'EaseOut'` / `'EaseInOut'` / `'FastOutSlowIn'` | 传统曲线没有物理含义，不会根据用户行为自然变化 |
| 需要直接指定弹簧动画时长 | 谨慎使用 `curves.springCurve(...)` | 会把物理时长映射到指定时长，可能破坏物理规律；非必要不优先 |

**迁移要求：**

- Android `LinearInterpolator` 可映射为 `'Linear'`。
- Android ease-in/ease-out 类插值器按视觉语义映射到 `'EaseIn'` / `'EaseOut'` / `'EaseInOut'` / `'FastOutSlowIn'`。
- Android `Overshoot` / `Bounce` / `Spring` / 自定义弹性曲线优先用 `curves.springMotion()` 或 `curves.interpolatingSpring(...)` 复现视觉语义；无法等价时记录差异。
- 如果动画是跟手交互，不能用固定 `'Ease'` 简化掉速度衔接。
- 如果组件暴露了 curve/easing 参数，必须真实参与 `animateTo` / `.animation()` / `keyframeAnimateTo` / `createAnimator`，不得只保存字段。

## 6. 出现/消失转场：`transition`

属性动画适用于“组件已存在，属性变化”。组件出现或消失应使用转场。

**基本模式：**

```ts
private effect: TransitionEffect =
  TransitionEffect.OPACITY
    .animation({ duration: 300, curve: 'Ease' })
    .combine(TransitionEffect.scale({ x: 0, y: 0 }))
    .combine(TransitionEffect.translate({ y: 120 }));

if (this.visible) {
  Column()
    .transition(this.effect)
}

Button('Toggle').onClick(() => {
  this.visible = !this.visible;
})
```

**规则：**

- `TransitionEffect.OPACITY`：透明度转场。
- `TransitionEffect.SLIDE` / `.move(edge)` / `.translate(...)`：滑入滑出或指定方向平移。
- `.rotate(...)` / `.scale(...)` / `.opacity(...)` 可组合。
- `TransitionEffect.asymmetric(appear, disappear)` 用于出现和消失不同效果。
- `TransitionEffect.animation()` 是 effect 链上的动画参数，不等于组件 `.animation()`；未单独配置的 effect 会跟随上方动画参数。
- 多组件渐次出现/消失可以给每个 `TransitionEffect.animation({ delay })` 设置不同延迟。
- 子项消失转场依赖父容器仍能承载动画；父容器被同步删除时，必要时给父容器也加转场或保持父容器结构稳定。

## 7. 帧动画：`createAnimator`

帧动画通过 `AnimatorResult.onFrame` 每帧回调插值，适合实时控制、暂停/恢复、复杂路径或必须感知动画进度的场景。它比属性动画更重；属性动画能满足时优先属性动画。

**使用规则：**

- 通过 `this.getUIContext().createAnimator(options)` 创建。
- `options.begin/end` 是每帧插值范围，不等于某个 UI 属性本身；必须在 `onFrame` 中把插值写入响应式状态。
- `play()` / `pause()` / `cancel()` 等控制入口要真实可达。
- 页面隐藏或销毁时把 `AnimatorResult` 置空或释放引用，避免泄漏和旧回调写状态。

**Android 迁移硬规则：**

- “逐帧回调 + 逐帧重绘”链路，ArkUI 不得直接用 `animateTo + @Watch` 替代。
- 这类实现迁移到 ArkUI 时，必须优先使用 `createAnimator().onFrame`，在 `onFrame` 中同步 progress / angle / offset / path / glyph position 等派生值，再触发 draw、redraw 或让 build/render 真实消费这些值。
- `animateTo` 适合驱动 ArkUI 可动画属性，不适合充当 Canvas、自绘文本、自绘图表、自绘进度条的 TS 侧逐帧回调器。

```ts
@State private animatorResult: AnimatorResult | undefined = undefined;
@State private translateX: number = 0;

onPageShow(): void {
  this.animatorResult = this.getUIContext().createAnimator({
    duration: 1500,
    easing: 'friction',
    begin: 0,
    end: 300,
    iterations: 1,
    fill: 'forwards'
  });
  this.animatorResult.onFrame = (value: number) => {
    this.translateX = value;
  };
}

onPageHide(): void {
  this.animatorResult = undefined;
}
```

### 7.1 轨迹动画：沿计算路径驱动组件位置

当 HAR 导出路径计算 API（如 `getPositionAtDegree`）时，组件需沿弧线/曲线移动而非直线。`animateTo` 对 `@State` 变量做线性插值，路径坐标需分段计算。

**模式一：分段 animateTo 接力**（推荐，简单直接）
将路径切为 N 段，每段计算弧上真实位置后驱动：
```typescript
const STEPS = 30, SD = duration / STEPS;
const step = (i: number): void => {
  if (i > STEPS) return;
  const p = getPositionAtDegree(start + (end - start) * (i / STEPS));
  animateTo({ duration: SD, curve: 'Linear', onFinish: () => step(i + 1) },
    () => { this.x = p.x - w / 2; this.y = p.y - h / 2; });
};
step(1);
```

**模式二：createAnimator().onFrame 帧驱动**（适合暂停/恢复/反向播放）
```typescript
const a = this.getUIContext()!.createAnimator({ duration, begin: 0, end: 1, easing: 'ease' });
a.onFrame = (t: number) => {
  const p = getPositionAtDegree(start + (end - start) * t);
  this.x = p.x - w / 2; this.y = p.y - h / 2;
};
a.play();
```

### 7.2 AnimatorOptions 必填字段

以下字段缺一不可。`begin/end` 缺失会导致 `onFrame` 不触发或接收 `undefined`；`as AnimatorOptions` 会隐藏编译器检查：

```typescript
let options: AnimatorOptions = {
  duration: 1500, easing: 'linear', delay: 0, fill: 'none',
  direction: 'normal', iterations: -1,
  begin: 0,  // ★ 必填！缺失则 onFrame 不触发
  end: 1     // ★ 必填！缺失则 onFrame 不触发
};
```

### 7.3 错误处理与备用机制

禁止静默吞异常。`catch` 必须 `console.error`；`createAnimator` 失败时自动降级 `setInterval(16)`：

```typescript
try {
  this.animator = this.uIContext.createAnimator({ begin: 0, end: 1, /* ... */ });
  if (this.animator) { /* onFrame, play */ this.isAnimating = true; return; }
} catch (error) { console.error('createAnimator failed:', error); }
// 降级
let start = Date.now();
this.intervalId = setInterval(() => {
  if (!this.isAnimating) return;
  this.callback?.((Date.now() - start) % duration / duration);
}, 16);
this.isAnimating = true;
```

`stopAnim` 和 `dispose` 必须同时清理 `animator` 和 `interval`。

### 7.4 Canvas 动画帧回调模式

`onFrame` 回调中的 `@State` 更新不能可靠触发 `@Watch`，必须在回调中直接调 `drawAll()`：

```typescript
this.loadingCtrl.setCallback((value: number) => {
  this.progress = value;
  this.drawAll();  // ← 直接重绘，不依赖 @Watch
});
```

### 7.5 外部命令的动画生命周期

动画入口默认由响应式状态驱动。外部按钮或公开 API 需要触发动画时，优先修改宿主 `@State`，再通过 `@Prop @Watch` 进入组件；如果必须保留 controller/service，它只能作为薄 facade，通过回调或状态对象改变响应式状态，不能保存 `@Component struct` 实例。


**自查：** □ `begin/end` 齐全 □ 无 `as` 断言 □ `catch` 有 `console.error` □ 有 `setInterval` 备选 □ `stopAnim` 清理 animator+interval □ 回调直接 `drawAll()` □ 外部入口可达且最终改变响应式状态 □ 无 `setComponent(this)` / 组件实例 controller

## 8. 自定义可动画属性：`@AnimatableExtend`

当系统属性不可直接动画，但你能定义插值逻辑时，用 `@AnimatableExtend`。

**规则：**

- 参数类型仅支持 `number` 或实现 `AnimatableArithmetic<T>` 的自定义类型。
- 对 `number`，可在扩展函数中每帧把数值写到系统属性，例如 `.width(width)`。
- 对自定义类型，必须实现加、减、乘、相等判断等插值所需方法。
- 适合 Polyline 点集、路径形状、复杂图形参数等场景。

```ts
@AnimatableExtend(Text)
function animatableWidth(width: number) {
  .width(width)
}

Text('Animatable')
  .animatableWidth(this.textWidth)
  .animation({ duration: 300, curve: 'Ease' })
```

## 9. 动画衔接与手势

ArkUI 能在可动画属性终点值连续变化时自动衔接前后动画。开发者只需要关注当前状态目标，不要自行维护一堆“正在动画中”的阻塞标记。

**连续操作：**

- 快速点击导致同一属性终点连续变化时，属性动画会平滑过渡到新终点。
- 不要因为前一个动画未结束就忽略新的用户输入。

**手势跟手：**

- 跟手阶段每次更新属性时可使用 `curves.responsiveSpringMotion()`。
- 离手阶段使用 `curves.springMotion()` 等弹簧曲线运动到目标终点，系统可继承跟手阶段速度，减少停顿感。
- 跟手变化应优先改 `translate` / `scale` 等仿射属性，避免高频改布局尺寸。

## 10. 组件默认动效与滚动列表定制

本节只适用于 HAR/SDK 本身提供 UI 组件、列表组件、轮播组件、可选中项组件、拖拽排序组件、滑动卡片组件等公开能力的场景。不要把 App 页面导航、业务页面滚动编排、页面间转场写进库组件能力。

**组件默认动效：**

- Button、Checkbox、List、Scroll 等 ArkUI 组件已有默认点击、选中、滑动反馈。迁移 Android 控件时，先判断默认动效是否已覆盖源侧基础反馈。
- 如果库组件用自定义外观覆盖了系统默认反馈，必须补回 `pressed`、`selected`、`checked`、`disabled` 等用户可见状态变化。
- 如果 Android SDK 暴露了 `enableRipple`、`selector`、`stateListAnimator`、`itemPressEffect` 等配置，鸿蒙侧不能只保留字段；要映射到可见状态样式、属性动画、`stateStyles`、`AttributeModifier` 或明确不支持。
- 不要为了“对齐 Android”移除 ArkUI 原生控件的基础交互反馈，除非源侧公开契约明确要求无反馈。

**滚动/列表子项定制：**

- 滚动过程的子项动效优先使用仿射属性：`.scale()`、`.translate()`、`.opacity()`、`.zIndex()`。
- 如果组件公开“中间项放大”“边缘项淡出”“滑动卡片堆叠”“拖拽排序回弹”等能力，必须把滚动位置、选中索引、拖拽偏移等状态传入 HAR 组件内部，并由组件真实计算每个子项的视觉属性。
- 对需要控制单项视觉属性的列表组件，可使用 `AttributeModifier` 或内部状态数组承载每个 item 的 offset/scale/opacity；不要只修改外层调用方容器。
- 高频滚动中避免逐帧改 `width`、`height`、复杂布局结构或大面积重建列表，优先改不会触发布局测量的仿射属性。
- 滚动停止、手势结束、吸附回弹等能力要有明确触发点和目标状态，不能只在 `onScroll` 中记录位置。

## 11. 模糊、阴影和色彩效果

**模糊：**

- `blur(radius)`：内容模糊。
- `backdropBlur(radius)`：背景模糊。
- `backgroundBlurStyle(...)`：背景材质模糊。
- `foregroundBlurStyle(...)`：内容材质模糊。
- `motionBlur({ radius, anchor })`：位移或缩放过程中的运动模糊。
- 实时模糊每帧渲染开销较大；模糊半径无需变化时优先静态模糊，不要把大半径实时模糊放进高频动画。

**阴影：**

- `shadow({ radius, color, offsetX, offsetY })` 可替代部分 Android elevation/shadow。
- `radius = 0` 或颜色透明时没有可见阴影。
- 阴影与圆角、背景、裁剪组合时要目视验证，不要只看编译通过。

**颜色渐变：**

- `linearGradient`：线性渐变。
- `sweepGradient`：角度渐变。
- `radialGradient`：径向渐变。
- 颜色断点的比例要按 ArkUI 入参语义设置；Android XML gradient 不能只复制字段名。

## 12. Android 动画迁移规则

**Interpolator / Curve：**

- Android `Interpolator` 不能机械复制类名，要按视觉语义映射到 ArkUI `Curve` 或 `curves.*`。
- 弹簧、摩擦、平滑、线性等要按官方能力选择；无法等价时记录视觉差异。

**XML Animation：**

- `translate`：映射到 `.translate()` 或 `TransitionEffect.translate()`；注意 Android 百分比单位。
- `alpha`：映射到 `.opacity()` 或 `TransitionEffect.OPACITY`。
- `scale`：映射到 `.scale()` 或 `TransitionEffect.scale()`。
- `rotate`：映射到 `.rotate()`；确认轴心和中心点语义。
- `clip` / reveal / shape 变化：优先确认 ArkUI 是否有直接属性；没有时用 `@AnimatableExtend`、Canvas 或裁剪容器承载，不能只切换最终状态。
- `set` / 多段动画：优先 `keyframeAnimateTo` 或明确组合多个 effect。
- `propertyValuesHolder` / `<keyframe>`：优先 `keyframeAnimateTo`；若需要每帧插值值参与自绘，用 `createAnimator`。
- frame animation：如果是位图逐帧，优先资源序列 + 计时/Animator 驱动；若只是属性变化，不要误做成位图逐帧。
- AnimatedVector / path morph：如果参数可插值，用 `@AnimatableExtend` 或 Canvas 路径插值；如果不能等价，必须记录裁剪/降级。

**相对单位：**

- Android 的 `fromYDelta="-100%"`、`toXDelta="50%"`、代码中的 `-1.0..1.0` 常表示父容器或自身尺寸比例。
- ArkUI 的 `offset` / `translate` 数字是实际视觉单位。必须用容器宽高换算，例如 `offsetY = relativeY * containerHeight`。
- 不能把 `-1.0` 直接传给 `offset({ y: -1 })` 然后宣称滑入动画已实现；这在视觉上几乎不可见。

**资源与 frame 动画：**

- Android frame 动画依赖的图片序列必须迁移到库资源目录或调用方约定资源目录，并确认资源引用可加载。
- 动画帧间隔、循环次数、播放/暂停/重置入口必须真实实现；不能只显示第一帧。
- 如果位图序列过大，应评估性能和包体；必要时改为属性动画或 Canvas 实现并记录视觉差异。

## 13. 对外动画 API 设计

ArkUI 自定义组件实例由框架托管，父组件通常不能通过 `Component({ ... })` 拿到子组件实例再调用 `public setXxx()`。因此，Android 命令式动画 API 迁移到 HAR 时必须重新设计外部可达入口。

**声明式优先：**

- 外部可控值：`@Prop progress`、`@Prop value`、`@Prop selectedIndex`、`@Prop visible`。
- 动画配置：`@Prop animationType`、`@Prop animationDuration`、`@Prop animationCurve`、`@Prop animateOnValueChange`。
- 内部同步：用 `@Watch` 将外部参数变化同步到内部绘制/布局/动画状态。
- 触发语义：当目标值变化且 `animateOnValueChange=true` 时，从旧值过渡到新值；动画时长/曲线必须真实参与。

**命令式入口只有在有稳定承载者时才成立：**

- 如果保留 `setProgress()`、`startAnimation()`、`play()` 这类方法，必须导出稳定 controller / proxy / service，让宿主能拿到并调用；该 controller / proxy / service 只能作为薄 facade 或资源承载者，最终要改变 `@State`/`@Prop`/`@Link`/状态对象或触发回调，不能持有 `@Component struct` 实例。
- 只把方法写在 `@Component struct` 里，父页面通常调用不到，不等价于公开 API 可用。

**禁止：**

- Android 可见状态 setter/getter 只落成 `@State private` + `public setXxx()`。
- controller / proxy 保存组件实例、`setComponent(this)` 后调用组件 public 方法。
- 调用方自行分帧改值，然后报告“库内部动画支持”。
- 动画开关存在但没有接入任何动画分支。
- 动画时长、曲线、类型参数被保存但未参与实际动画。

## 14. 首帧、派生状态与自绘动画

自绘 Canvas、图表、进度条、启动页组件最容易出现“编译通过但首屏不动/不显示”。

**必须形成闭环：**

```text
外部输入/@Prop/配置对象
-> aboutToAppear 或 @Watch 同步
-> 内部派生状态（角度、位移、进度、透明度、缩放、路径点）
-> draw/render/build 真实使用
-> 状态变化触发重绘或属性动画
```

**规则：**

- 首帧前同步外部 `currentValue`、progress、angle、selectedIndex、animationType 等。
- 不要用未同步的派生值作为 `draw()` / `drawAll()` 门禁。例如 sweep 初始为 0，但 currentValue 已有值时，不能因为 sweep 为 0 就跳过绘制。
- `@Prop` 影响坐标、尺寸、颜色、动画参数、Canvas 绘制参数时必须有 `@Watch`。
- `@Watch` 回调只写内部 private 派生变量或触发重算，不写回 `@Prop` / `@State` 造成递归。
- 配置对象变化后不能只缓存对象；要拆出会影响 UI 的字段并同步到响应式变量或绘制状态。
- 自绘 Canvas / 图表 / 进度条 / 字符滚动如果需要逐帧视觉变化，必须确认“每一帧”真的会重新计算并重绘；不能只看到开始值和结束值变化，就误判为中间过程也会执行。
- 禁止写成“`animateTo` 修改 `@State progress` -> 指望 `@Watch(progress)` 每帧触发 -> `drawCanvas()`”这类链路；ArkUI 属性动画不会保证 ETS/TS 自定义绘制逻辑逐帧回调。ArkUI 必须改成 `createAnimator().onFrame` 推进这些派生值，再重绘。
- 自绘图表、进度条、标签、角度、百分比等动态文本必须统一运行时数据源。动画每帧更新的值，必须被 `draw` / `render` / `build` 实际读取；如果绘制逻辑读取 `latestPosition`、`cachedValue`、`initialValue` 等字段，这些字段也必须在动画帧或终点同步更新。
- 不允许出现“动画状态机更新 A 字段，UI 读取 B 字段”的断链。要确认最终绘制值、监听器回调值、公开 getter 值保持一致。动画变化时，对应文本必须随同一帧值重新计算。

## 15. 编码要求

动画能力不是“有入口、有字段、有按钮”就算完成；必须在 HAR 公开能力、组件响应式链路和可观察视觉效果之间形成闭环。

- 每个动画类型入口都要能触发可见变化。
- 动画开关、速度、时长、曲线、方向、目标值等外部可配置项必须真实传入 HAR 公开 API 或 `@Prop`。
- 如果某动画类型不支持、平台无法等价、HAR 未暴露参数、或已裁剪/延期，调用入口必须禁用、隐藏或明确提示，不得做正常成功流程。
- 对平移、缩放、透明度、旋转、模糊等不同分支，不能只确认一个分支就认为全部动画完成。
- 对列表/轮播/滚动子项动效，要确认 HAR 组件内部 item 视觉属性随滚动、选中、拖拽或配置真实变化，不得只在外层容器包装动画。
- 对视觉很弱的动画，要检查单位换算、初始值、目标值、容器尺寸和是否绑定到可动画属性。
- 外层调用方自行动画只能说明外部页面有动效，不能证明 HAR 内部动画 API 可用；报告或日志要区分“外部包装动效”和“HAR 公开动画能力”。

## 16. 编码后自检：动画实现核验

实现自定义轨迹动画（弧线、贝塞尔等）后，逐项确认：

- [ ] 中间帧位置通过路径数学函数计算（`getPositionAtDegree` / `getPointAtProgress` 等），未用 `animateTo` 线性插值替代路径计算
- [ ] 逐帧驱动使用 `setTimeout` / `requestAnimationFrame`，且在 `aboutToDisappear` 中清理定时器（grep `setTimeout` → 应有 `clearTimeout`）
- [ ] 首帧→末帧沿定义路径运动，非直线（弦）：p=0.5 的中点到弦的垂直距离 > 0

> 03 主 Agent 在 `primary-sdk-03-implementation.md` step 5 中引用本清单进行核验。
