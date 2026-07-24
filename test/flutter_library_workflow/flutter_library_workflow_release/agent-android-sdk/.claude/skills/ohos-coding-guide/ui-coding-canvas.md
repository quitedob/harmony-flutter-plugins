> 前置依赖：阅读本文前请先读 [`ui-coding-reactive-dataflow.md`](./ui-coding-reactive-dataflow.md)
> API 签名和官方用法请从 `harmonyos-docs-lookup` 核实。

# Canvas 自绘 — 坐标/像素/手势/动画/路径计算

## 1. 尖角路径计算

圆角矩形+三角箭头（气泡/尖角装饰）的 Android 移植，采用**主体矩形向内收缩**策略，
箭头尖端落在原始边界上，所有坐标在 `[0,w]×[0,h]` 内。

鸿蒙直接移植时容易错写成箭头尖端超出 Canvas 边界：

| 方向 | 错误写法 | 后果 |
|------|---------|------|
| LEFT | tip = `(-sharpSize, cy)` | x 为负，不可见 |
| TOP | tip = `(cx, -sharpSize)` | y 为负，不可见 |
| RIGHT | tip = `(w+sharpSize, cy)` | x 超出右边界 |
| BOTTOM | tip = `(cx, h+sharpSize)` | y 超出下边界 |

### 1.1 Android 参考方案

```java
// LEFT 方向
left += mSharpSize;                // 主体左边界右移 sharpSize
mPointFs[0].set(bounds.left, ...); // 箭头尖端在原始左边界 (bounds.left)
mRect.set(left, top, right, bottom); // 主体矩形收缩
// 然后 addRoundRect(mRect) 绘制收缩后的圆角矩形
// 再 moveTo/lineTo 画三角形连接主体边缘到原始边界
```

四个方向的收缩策略：

| 方向 | 主体收缩 | 箭头尖端位置 |
|------|---------|-------------|
| LEFT | `bodyLeft = sharpSize` | `x = 0`（原始左边界） |
| TOP | `bodyTop = sharpSize` | `y = 0`（原始上边界） |
| RIGHT | `bodyRight = w - sharpSize` | `x = w`（原始右边界） |
| BOTTOM | `bodyBottom = h - sharpSize` | `y = h`（原始下边界） |

### 1.2 Body 矩形变量

```typescript
let bl = (direction === LEFT)  ? sharpSize : 0;
let bt = (direction === TOP)   ? sharpSize : 0;
let br = (direction === RIGHT) ? w - sharpSize : w;
let bb = (direction === BOTTOM) ? h - sharpSize : h;
```

`sharpSize=0` 时 `bl=0, bt=0, br=w, bb=h`，退化为普通圆角矩形。

### 1.3 弧线坐标

四角弧线以 body 角为中心，顺时针：

| 弧 | 起点 | 终点 |
|------|------|------|
| 左上（半径 lt） | `(bl+lt, bt)` | `(bl, bt+lt)` |
| 右上（半径 rt） | `(br-rt, bt)` | `(br, bt+rt)` |
| 右下（半径 rb） | `(br, bb-rb)` | `(br-rb, bb)` |
| 左下（半径 lb） | `(bl+lb, bb)` | `(bl, bb-lb)` |

SVG Path2D 弧命令格式：`A <radius> <radius> 0 0 1 <endX> <endY>`

### 1.4 箭头三角形顶点顺序

遍历顺序必须与边的走向一致（顺时针路径），避免路径自交。

| 方向 | 边走向 | base1 → tip → base2 | 路径方向 |
|------|--------|---------------------|---------|
| LEFT | 下→上 | `(bl, cy+hs) → (0, cy) → (bl, cy-hs)` | UP→LEFT→RIGHT→UP ✅ |
| TOP | 左→右 | `(cx-hs, bt) → (cx, 0) → (cx+hs, bt)` | RIGHT→UP→DOWN→RIGHT ✅ |
| RIGHT | 上→下 | `(br, cy-hs) → (w, cy) → (br, cy+hs)` | DOWN→RIGHT→LEFT→DOWN ✅ |
| BOTTOM | 右→左 | `(cx+hs, bb) → (cx, h) → (cx-hs, bb)` | LEFT→DOWN→UP→LEFT ✅ |

（hs = halfSize = sharpSize / 2）

### 1.5 箭头位置 clamp

`relativePosition`（0~1）的 clamp 边界从 body 矩形计算，避免箭头切入圆角弧：

```typescript
// TOP / BOTTOM 方向（箭头在横向边）
let minCx = bl + cornerRadius + halfSize;
let maxCx = br - cornerRadius - halfSize;
cx = clamp(w * pos, minCx, maxCx);

// LEFT / RIGHT 方向（箭头在纵向边）
let minCy = bt + cornerRadius + halfSize;
let maxCy = bb - cornerRadius - halfSize;
cy = clamp(h * pos, minCy, maxCy);
```

四角独立半径时，cornerRadius 取对应角的值：
- TOP 边：用 `lt`（左端）和 `rt`（右端）
- BOTTOM 边：用 `lb`（左端）和 `rb`（右端）
- LEFT 边：用 `lt`（上端）和 `lb`（下端）
- RIGHT 边：用 `rt`（上端）和 `rb`（下端）

### 1.6 关键注意事项

1. **遍历顺序必须与边走向一致**。RIGHT 方向最容易错：边从**上到下**，应先经过 `cy - halfSize`（上方 base），再到 `w`（tip），再到 `cy + halfSize`（下方 base）。错写成 `cy+hs → cy → cy-hs` 会导致路径自交，Fill 规则误判。
2. **三个导出函数保持一致的 body 矩形逻辑**：三角顶点计算、SVG 路径生成、边框描边序列应使用相同的 `bl/bt/br/bb`。
3. **`sharpSize=0` 退化**：`bl=bt=0, br=w, bb=h`，所有坐标退化为原始边界，生成普通圆角矩形。
4. **Canvas 尺寸**：Canvas 设为 `100%` 父容器即可，路径坐标都在 `[0,w]×[0,h]` 内，箭头自然可见。

---

## 2. @Prop 与内部动画驱动状态必须用 @Watch 桥接

Canvas 自绘组件中 `@Prop` 状态与内部动画驱动状态必须用 `@Watch` 桥接，且内部方法禁止写回 `@Prop` 以避免死循环：

```typescript
// ❌ @Prop isOn 无 @Watch → 父组件修改后 Canvas 不重绘；内部方法写回 this.isOn → @Watch 死循环
@Prop isOn: boolean = false;
@State @Watch('onMoveChanged') private knobMoveRate: number = 0.0;

private handleTap(): void {
  this.isOn = !this.isOn;
  this.knobState = this.isOn;
  animateTo({ duration: 300 }, () => { this.knobMoveRate = 1.0; });
}

// ✅ @Prop 加 @Watch 桥接 + 内部方法只写 private 变量
@Prop @Watch('onIsOnChanged') isOn: boolean = false;
@State @Watch('onMoveChanged') private knobMoveRate: number = 0.0;
private knobState: boolean = false;

private onIsOnChanged(): void {
  if (!this.isInitialized) { return; }
  if (this.knobState === this.isOn) { return; }
  this.knobState = this.isOn;
  animateTo({ duration: 300 }, () => {
    this.knobMoveRate = this.isOn ? 1.0 : 0.0;
  });
}

private handleTap(): void {
  const newState = !this.knobState;
  this.knobState = newState;
  animateTo({ duration: 300 }, () => { this.knobMoveRate = newState ? 1.0 : 0.0; });
  if (this.onSwitchStateChange) { this.onSwitchStateChange(newState); }
}
```

完整数据流：

| 触发方式 | 数据流 | Canvas 重绘 |
|:--|:--|:--|
| 父组件修改 `@State` → 子 `@Prop` | `@Prop isOn` 同步 → `@Watch onIsOnChanged` → 更新 `knobMoveRate` | ✅ |
| 用户点击控件 | `handleTap` → 更新 `knobState` + `animateTo` 更新 `knobMoveRate` → 回调通知父 → 父回写 `@State` → `@Prop isOn` 同步 → `@Watch` 去重跳过 | ✅ |
| 用户拖拽控件 | `handleDrag` / `handleGestureUp` → 更新 `knobState` + `animateTo` | ✅ |

---

## 3. 自绘组件必须逐行对照原版绘制坐标

自定义绘制组件（Canvas/drawing/手动布局的 Stack+Rect/Circle）迁移时，子元素的 x/y/width/height 必须逐行对照原版 onDraw 的坐标计算，禁止简化为 componentWidth/componentHeight 等粗略值。

### 3.1 Paint Style 迁移：fill 与 stroke 必须显式分别调用

翻译 Android `Paint` + `canvas.drawPath()` 到 HarmonyOS Canvas 时：

- Android `Paint` 默认 `Style.FILL_AND_STROKE`：`drawPath(path, paint)` 同时填充 + 描边
- Android `Paint` 设 `Style.FILL`：仅填充
- Android `Paint` 设 `Style.STROKE`：仅描边
- 迁移到 Canvas 时，必须根据原 `Paint.getStyle()` 的结果**显式调用**对应的 `ctx.fill()` / `ctx.stroke()`：
  - `FILL_AND_STROKE` → `ctx.fill()` + `ctx.stroke()`
  - `FILL` → `ctx.fill()`
  - `STROKE` → `ctx.stroke()`
- 显式设置 `ctx.fillStyle` 和 `ctx.strokeStyle`，不能依赖默认值

```typescript
// ❌ 只描边，对应 Android Style.STROKE，丢掉了 fill
ctx.closePath();
ctx.stroke();

// ✅ FILL_AND_STROKE：先填充再描边
ctx.fillStyle = ctx.strokeStyle;
ctx.fill();
ctx.stroke();
```

### 3.2 Path.addArc → ctx.arc 行为差异：独立路径隔离

- Android `Path.addArc()` 创建**独立子路径**，不与前后图形连接
- HarmonyOS `ctx.arc()` 是**追加到当前路径**的方法：如果之前已有子路径（`moveTo`/`lineTo`/`bezierCurveTo` 等），`arc` 会从上一点画一条直线到弧线起点
- 每个独立图形必须在 `arc()` 之前调用 `ctx.beginPath()`，之后各自调用 `ctx.stroke()`/`ctx.fill()`
- 禁止在同一个 `beginPath()...stroke()` 块内混合使用 `lineTo`/`bezierCurveTo` + `arc`

```typescript
// ❌ arc 被直线连接到前一路径终点
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(100, 10);
ctx.arc(60, 60, 40, 0, Math.PI * 2); // 从 (100,10) 画直线到弧起点
ctx.stroke();

// ✅ 每个独立图形用 beginPath 隔开
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(100, 10);
ctx.stroke();

ctx.beginPath();
ctx.arc(60, 60, 40, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();
```

### 3.3 坐标系统 translate 偏移量

翻译 Android `canvas.translate()` + 归一化坐标绘制到 HarmonyOS Canvas 时：

- 先确认 Android 自定义 View 的坐标系统类型：
  - **归一化 [0,1] 左上角原点**：图形中心在 (0.5,0.5)，translate 后 (0.5\*s, 0.5\*s) 映射到画布 `(cx + 0.5\*s, cy + 0.5\*s)`
  - **归一化 [0,1] 中心原点**：图形中心在 (0,0)，直接 translate 到圆心
  - **像素坐标**：直接 translate 到圆心
- 对于"左上角原点"类型，`translate()` 必须偏移半个尺寸：`ctx.translate(cx - 0.5\*s, cy - 0.5\*s)`，使归一化中心 (0.5,0.5) 对齐到视觉中心 (cx, cy)
- 如果不能确定原点类型，查看 Android 原始坐标点是否有负数（有则可能为中心原点），或查看原始常量：`CENTER_X=0.5` 通常表示左上角原点；`CENTER_X=0` 通常表示中心原点

```typescript
// ❌ 归一化 (0.5*s, 0.5*s) 映射到 (cx + 0.5*s, cy + 0.5*s)，偏离圆心
ctx.translate(centerX, centerY);
drawGeometry(ctx);

// ✅ 归一化 (0.5,0.5) 映射到 (cx, cy)，图形居中
ctx.translate(centerX - 0.5 * scale, centerY - 0.5 * scale);
drawGeometry(ctx);
```

### 3.4 外部命令/状态桥接 + Canvas 自绘组件：状态变更后必须触发重绘

Canvas 自绘组件的 `requestRedraw()` 只在触摸事件和 `animateTo` 回调中触发，不会自动响应普通对象或 controller 的字段变化。外部可见状态优先用 `@Prop`/`@Link`/`@Watch` 传入；如果必须保留 controller/service 命令式 API，controller 只能作为薄 facade 或资源承载者，不能持有 Canvas 组件实例，必须通过回调、状态对象或 `@Link` 通知组件重绘。

当确需 controller/service 时，在其中提供回调注册机制，每个修改视觉状态的公开方法末尾调用回调：

```typescript
// Controller：只保存状态和回调，不保存 @Component 实例
export class Controller {
  private refreshCallback: (() => void) | null = null;

  public setRefreshCallback(callback?: () => void): void {
    this.refreshCallback = callback;
  }

  public setValue(v: number): void {
    this.state = v;
    this.refreshCallback?.();
  }

  public reset(): void {
    this.state = 0;
    this.refreshCallback?.();
  }
}
```

```typescript
// Canvas 组件：初始化时注册回调，由回调触发重绘
@Component
export struct CanvasComponent {
  controller?: Controller;

  aboutToAppear(): void {
    this.controller?.setRefreshCallback(() => this.requestRedraw());
  }

  aboutToDisappear(): void {
    this.controller?.setRefreshCallback(undefined);
  }

  private requestRedraw(): void {
    if (this.isInitialized) {
      this.onDraw();
    }
  }
}
```

**自检清单**：
- [ ] 能否优先改成父 `@State` → 子 `@Prop`/`@Link` → `@Watch` → `drawAll()`？
- [ ] Controller/service 没有保存 `@Component struct` 实例，没有 `setComponent(this)`。
- [ ] Controller/service 的每个 `public` 方法中，修改了视觉状态（位置、缩放、颜色、类型、选中态等）的方法末尾是否调用了 `refreshCallback?.()` 或更新了响应式状态？
- [ ] Canvas 组件的初始化（`aboutToAppear`/`onReady`）中是否注册了 `setRefreshCallback`，退出时是否清理？
- [ ] 非动画的状态变更（`setValue`、`reset`、`clear` 等没有 `animateTo` 的路径）是否也覆盖了？
- [ ] Controller 构造后组件初始化前可能调用公开方法，`refreshCallback` 为 null 时是否做了安全判断（`?.()` 语法）

### 3.5 Canvas 自绘组件：组件高度必须容纳所有绘制内容

在 `onAreaChange` 或尺寸重算中计算 Canvas 组件高度，且 `onDraw` 中绘制的图形下方有文字（标题、标签、数值、单位等）：

- 组件高度不能只按图形区域（圆、路径、矩形等）计算
- 必须列出所有绘制内容的垂直边界，取最大值作为组件高度
- Android `onMeasure` 返回的是总高度（图形 + 文字 + padding），迁移时直接翻译公式可能导致文字区域被裁剪
- 以组件最小预期宽度代入公式验证文字是否完全可见

```typescript
// ❌ 只按图形区域计算，标题文字被裁剪
this.componentHeight = Math.round(width / graphicsRowCount);

// ✅ 明确列出所有绘制内容的垂直边界
const graphicsBottom = graphicsAreaHeight;
const textBottom = graphicsBottom + textPadding + fontSize;
this.componentHeight = Math.ceil(Math.max(graphicsBottom, textBottom) + bottomPadding);
```

**自检清单**：
- [ ] 组件高度计算是否考虑了所有绘制内容的垂直范围（图形 + 文字 + 间距 + 底部留白）？
- [ ] Android `onMeasure` 的公式是总高度还是部分高度？是否有文字区域需要额外追加？
- [ ] 文字字号在组件当前宽度下是否为可读的最小值（`Math.max(14, ...)`）？
- [ ] 以组件最小预期宽度（如 320vp）代入公式验证，文字是否仍完全可见且不溢出？

### 3.6 归一化模型坐标必须手动缩放，禁止通过 ctx.transform 合并

绘制引擎使用归一化 [0,1] 控制点坐标，且需要缩放 10 倍以上到实际像素时：

归一化 [0,1] 控制点必须经两阶段映射到像素：
- `renderScale = drawableSize × paddingScale`（坐标空间缩放 × 视觉填充比例）
- 绘制函数内所有坐标手动乘以 `renderScale`

**禁止**用 `ctx.transform(renderScale, 0, 0, renderScale, 0, 0)` 合并两阶段，因其会连带缩放 `lineWidth`（renderScale=60 时 1px→60px，描边溢出容器）。

```typescript
// ✓ 正确：手动乘坐标，独立 lineWidth
const s = renderScale;
ctx.save();
ctx.translate(x, y);
ctx.beginPath();
ctx.moveTo(p1.x * s, p1.y * s);
ctx.lineWidth = 2;
ctx.stroke();
ctx.restore();
```

**自检**：
- `ctx.transform`/`ctx.scale` 参数含 >>1 的像素尺寸 → 改手动缩放 + 独立 lineWidth
- 所有绘制函数（子图形等）都接收了 `renderScale` 并乘到控制点坐标上

---

## 4. Canvas 专项速查

### 4.1 drawing.Canvas + PixelMap 自绘组件像素配置

`drawing.Canvas` 内部使用 RGBA 字节序 + 预乘 alpha 混合。PixelMap 的像素格式、alphaType、创建方式、Brush 参数顺序任一不匹配都会导致绘制全白/透明/颜色错位。

| # | 检查项 | 正确值 | 错误值 |
|---|--------|--------|--------|
| 1 | `pixelFormat` | `PixelMapFormat.RGBA_8888`（API 7+） | `ARGB_8888`（字节序不匹配且 API 18+） |
| 2 | `alphaType` | `AlphaType.PREMUL` | `UNPREMUL` / `OPAQUE` |
| 3 | `createPixelMapSync` 重载 | `createPixelMapSync(options)` 无 buffer | `createPixelMapSync(colors, options)` 传零 buffer |
| 4 | `Brush.setColor` 参数顺序 | `(alpha, red, green, blue)` ARGB | `(red, green, blue, alpha)` RGBA |
| 5 | `editable` | `true` | `false` / 缺失 |

### 4.2 ARGB 数字值与 Canvas/API 颜色格式转换

**数字颜色值（如 `0xFFFF0000`）通过模板字符串 `${num}` 拼接时，输出为十进制字符串（如 "4294901760"），而非十六进制颜色字符串。**

Canvas `addColorStop`、`fillStyle`、`strokeStyle` 及 HAR 接口约定需要 `#RRGGBB` 或 `rgba(...)` 格式。传入十进制字符串会导致解析失败、颜色不显示、静默失败无报错。

```typescript
// ❌ 数字直接拼接 → "4294901760" → 解析失败 → 颜色不显示
const colors: number[] = [0xFFFF0000, 0xFFFFFF00];
return `${colors[0]},${colors[1]}`;

// ✅ 转换为十六进制 → "#ff0000,#ffff00" → 正确解析
private colorIntToHex(color: number): string {
  const r = ((color >> 16) & 0xFF).toString(16).padStart(2, '0');
  const g = ((color >> 8) & 0xFF).toString(16).padStart(2, '0');
  const b = (color & 0xFF).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}
```

> **⚠️ OHOS ResourceColor 8 位 hex 必须为 `#AARRGGBB`（Alpha 在前）**
>
> - `#AARRGGBB` 中前两位 `AA` 是 Alpha（00=全透明，FF=不透明），后六位 `RRGGBB` 是红绿蓝。
> - **禁止**使用 CSS 规范的 `#RRGGBBAA`（Alpha 在后），OHOS Canvas 会将 `#RRGGBBAA` 按 `#AARRGGBB` 解析，导致颜色显示错误。
> - 6 位 hex `#RRGGBB`（无 Alpha）在两种规范中兼容，不会出错。
>
> 典型错误：`'#FF000040'` 本意是"红色 25% 透明度"（CSS 格式 `#RRGGBBAA`），但 OHOS 解析为 A=0xFF（不透明）R=0x00 G=0x00 B=0x40（深蓝），呈现为不透明深蓝色。
>
> 正确写法：`'#40FF0000'`（A=0x40=25%, R=0xFF, G=0x00, B=0x00）= 25% 透明度红色。
>
> 当需要从数字颜色（如 `0xAARRGGBB`）转换为 8 位 hex 字符串时：

```typescript
// ✅ 数字 → #AARRGGBB（含 Alpha，格式匹配 OHOS ResourceColor）
private colorIntToArgbHex(color: number): string {
  const a = ((color >> 24) & 0xFF).toString(16).padStart(2, '0');
  const r = ((color >> 16) & 0xFF).toString(16).padStart(2, '0');
  const g = ((color >> 8) & 0xFF).toString(16).padStart(2, '0');
  const b = (color & 0xFF).toString(16).padStart(2, '0');
  return `#${a}${r}${g}${b}`;
}
```

### 4.3 rotate 旋转动画的容器高度与轴心对齐

`.rotate()` 的旋转轴心 `centerX`/`centerY: '50%'` 是相对于**被旋转组件的布局尺寸**，不是内容的视觉中心。如果容器用 `height('100%')` 撑到远大于内容的高度，轴心就会严重偏移，导致旋转动画"从远处翻入"。

| 写法 | 问题 | 修复 |
|------|------|------|
| Stack/Column `.height('100%')` + `.rotate({ centerY: '50%' })` | 容器远大于内容，垂直轴心偏移 | 移除 `.height('100%')`，让容器包裹内容 |
| 旋转时内容溢出边界 | 无裁剪 | 容器加 `.clip(true)` |
| 水平翻转正常但垂直翻转从远处翻入 | `centerX` 对齐（宽度相同），`centerY` 偏移（高度不同） | 确保容器高度 = 内容高度 |
| 旋转时出现大片透视畸变 | 默认 perspective 值不合适 | `.rotate()` 中设 `perspective: 1000` |

### 4.4 自绘 Canvas 组件手势与动画

**PanGesture offsetX/Y 是偏移量，不是绝对坐标**

`GestureEvent.offsetX/offsetY` 是相对于手势起点的累计偏移量，Down 时为 0。需要触摸绝对坐标时用 `onTouch` + `event.touches[0].x/y`，等价于 Android `MotionEvent.getX/getY()`。

```typescript
// ❌ Down 时 offsetX=0，碰撞检测永远不命中 → 拖拽无响应
.gesture(PanGesture().onActionStart((e) => { this.handleStart(e.offsetX, e.offsetY); }))

// ✅ onTouch 提供组件内绝对坐标
.onTouch((event: TouchEvent) => {
  const x = event.touches[0].x;
  const y = event.touches[0].y;
})
```

**Canvas 自绘动画：`createAnimator` 优先 + `setInterval` 降级**

内部绘制值变化后必须显式调用 `drawAll()` / `draw()`。Canvas 自绘动画采用 hybrid 方案：优先使用 `createAnimator().onFrame`（帧同步更好、功耗更低），失败时自动降级到 `setInterval(16)`。

`AnimatorOptions` 必须包含 `begin: 0, end: 1, easing: 'linear', delay: 0` 等完整字段（参见 `animation-guidelines.md` §7.2）。禁止 `as AnimatorOptions` 类型断言。`onFrame` 回调中必须直接调用 `drawAll()`，不得依赖 `@State @Watch` 链路触发重绘（`@Watch` 在 `onFrame` 回调中不可靠）。

```typescript
// ❌ 动画结束后 drawAll() 只画最终状态，看不到过渡
onConfigChanged() { this.updateProgress(); this.drawAll(); }
updateProgress() { animateTo({ duration: 500 }, () => { this.progress = v; }); }
```

**Canvas 文本字号**

`CanvasRenderingContext2D.font` 使用的是 CSS 风格字体字符串。`ctx.font` 字号单位必须使用 `vp`，格式为 `${fontWeight} ${fontSize}vp ${fontFamily}`，例如 `400 16vp sans-serif`。禁止在 `ctx.font` 中使用 `px` 字号。

### 4.5 Canvas 自绘组件必须设置 fallback 默认尺寸

`@State canvasWidth/Height` 禁止默认 `0` + 禁止依赖 `onMeasureSize`，否则 `onAreaChange` 不触发时组件永不绘制。

```typescript
// ❌ canvasWidth/canvasHeight=0 → drawAll() 因守卫条件跳过 → 看不见
@State private canvasWidth: number = 0;

// ✅ 非零默认
@State private canvasWidth: number = 66;
@State private canvasHeight: number = 44;
private renderingContext: CanvasRenderingContext2D = new CanvasRenderingContext2D(new RenderingContextSettings(true));
drawAll(): void { if (this.canvasWidth <= 0 || this.canvasHeight <= 0) return; }
```

### 4.6 动画/视觉效果中心必须取元素逻辑位置

可拖动元素的视觉中心应取其逻辑坐标（如锚点 X、组件高度 50%），而非触摸点坐标。触摸事件中可以更新元素的水平位置（X 轴通常与拖动方向一致），但垂直方向如果元素始终在固定逻辑位置绘制，就不应用触摸 Y 覆盖。

```typescript
// ❌ Move/Up 中用触摸点覆盖元素逻辑 Y → 效果中心随手势偏移
this.effectCenterY = this.elementY;  // Y 是触摸点，不是元素视觉中心！

// ✅ 效果中心直接取元素逻辑位置
this.effectCenterX = this.elementX;
this.effectCenterY = this.componentHeight / 2;
```

### 4.7 @Watch 重算布局后必须同步重定位元素

`@Watch` 回调重算位置数组后，元素坐标仍指向旧值，可能落在两个新位置之间。必须钳制索引 + 重定位 + 重绘。

```typescript
// ❌ 只重算 positions，元素停在旧坐标 → 两个位置中间
private onCountChanged(): void {
  this.computePositions();
  this.drawAll();
}

// ✅ 重算 + 钳制索引 + 重定位
private onCountChanged(): void {
  this.computePositions();
  if (this.currentIndex >= this.count) { this.currentIndex = this.count - 1; }
  this.elementX = this.positions[this.currentIndex];
  this.elementAnchorX = this.elementX;
  this.drawAll();
}
```

### 4.8 自绘组件根容器禁止硬编码尺寸

根容器硬编码 `.height(constValue)` 会覆盖父级传入的尺寸，导致 `onAreaChange` 不触发、Canvas 不 resize、派生值不更新。

```typescript
// ❌ 根容器硬编码高度 → 父级 .height() 无效
Column() { Canvas(ctx).width('100%').height('100%') }.height(50)

// ✅ 移除硬编码，父级 .height() 正常生效
Column() { Canvas(ctx).width('100%').height('100%') }.width('100%')
```

### 4.9 Canvas API 空值检查与状态闭环

| 陷阱 | 修复 |
|------|------|
| `pixelMap.getImageInfoSync().size.width` 直接链式访问 | 同步 API 可能返回 `undefined`，先赋值后检查 |
| `ctx.save()` 后条件不满足提前 `return` | 所有提前返回路径必须先 `ctx.restore()` |

**原则**：同步 API 返回值先检查后访问；Canvas 状态栈 save/restore 必须成对，所有退出路径都闭环。

### 4.10 Canvas 坐标系统适配

HAR 模块无法调用 `getInspectorByKey()` 等 `@Component` 方法。Android `getGlobalVisibleRect()` / `getLocationOnScreen()` 无 HAR 等价物。SDK API 应接收宿主传入的 offset（vp 单位），不在库内自行查询。

宿主通过 `onAreaChange` 逐级累加组件链偏移：

```
目标在 Canvas 中的 Y = innerColumn.y_in_scroll + card.y_in_column + target.y_in_card
```

- `onAreaChange` 报告的是**相对直系父组件的坐标**，非屏幕坐标，必须逐级累加
- 内层 Column 的 y 在滚动时自动变为负值，**不要依赖 `Scroll.onScroll` 手动计算偏移**
- `onAreaChange` 已天然反映滚动偏移，`onScroll` 不仅多余且行为不确定

```typescript
// HAR 侧：API 接收 offset
popView(id: string, offsetX?: number, offsetY?: number)

// 宿主侧：累加计算
const oy = cardPos.y + targetPos.y + innerColumnPos.y;
controller.popView('id', ox, oy);
```

### 4.11 setInterval + Canvas 动画生命周期

`setInterval` + Canvas 的动画结束时，Canvas 保留最后一帧，不会自动清除。`finishAnimation()` 中必须触发 `requestRedraw()`：

```typescript
private finishAnimation(): void {
  clearInterval(this.mTimerId);
  this.mIsRunning = false;
  this.mOnFinish?.();
  // 触发最后一次重绘，清除 Canvas 残留帧
  this.mRequestRedraw?.();
}
```

**自查**：所有 `setInterval`/`setTimeout` + `Canvas` 的 `cancel()` / `finish()` 方法都必须有此调用。

### 4.12 createAnimator + Canvas 动画模板

```typescript
@Component export struct MyCanvasAnim {
  @Prop @Watch('onRunningChanged') running: boolean = false;
  private loadingCtrl = new LoadingController(1500);

  aboutToAppear(): void {
    this.loadingCtrl.setCallback(v => { this.progress = v; this.drawAll(); });
    this.onRunningChanged();
  }

  private onRunningChanged(): void {
    if (this.running) {
      this.loadingCtrl.startAnim();
    } else {
      this.loadingCtrl.stopAnim();
      this.progress = 0;
      this.drawAll();
    }
  }

  build() {
    Canvas(this.ctx).width('100%').height('100%')
      .onReady(() => { this.loadingCtrl.setUIContext(this.getUIContext()); this.drawAll(); });
  }
}
```

`LoadingController` 需满足（详见 `animation-guidelines.md` §7.2-7.3）：`begin/end/easing/delay` 齐全、禁止 `as`、`catch` 输出错误、`setInterval` 备选、`stopAnim` 清理全部资源。若原 API 必须保留命令式 controller，controller 应只通过回调或状态对象改变宿主 `@State running`，再由 `running` 驱动组件动画。
---
## 5. 坐标系方向与转换

### 5.1 HarmonyOS Canvas 坐标系

HarmonyOS `CanvasRenderingContext2D` 使用**屏幕坐标系**：
- 原点在画布左上角 `(0, 0)`
- X 轴向右为正
- Y 轴向下为正

这与 Android `Canvas`、HTML Canvas 完全一致。所有 `ctx` 方法（`moveTo`/`lineTo`/`arc`/`translate`/`fillText` 等）均基于此坐标系。

### 5.2 笛卡尔坐标（Y 向上）与屏幕坐标（Y 向下）

当 Android 源码或数学计算使用**笛卡尔坐标系**（Y 向上为正）时，迁移到 HarmonyOS Canvas 需要做 Y 轴转换。

**常见错误：在多个地方不一致地取反。** 例如在 `applyTransform` 的 `ctx.translate` 中对 `pos.y` 取反，同时在 `formPath` 的 `ctx.moveTo(x, -y)` 中对点的 y 也取反，导致 Y 被翻转两次。

**核心原则：Y 坐标转换只在一个地方执行。**

**模式 A（推荐 —— 平移不做取反，点做取反）**：
```typescript
// applyTransform：使用 Canvas 坐标，translate 不做 Y 取反
ctx.translate(pos.x, pos.y);

// formPath：对形状内部点 y 取反（笛卡尔 → 屏幕）
ctx.moveTo(points[0].x, -points[0].y);
ctx.lineTo(points[1].x, -points[1].y);
```

**模式 B（整体 Y 翻转，点不做取反）**：
```typescript
// applyTransform：scale(1, -1) 翻转整个坐标系
ctx.save();
ctx.translate(pos.x, pos.y);
ctx.scale(1, -1);  // Y 轴向上翻转，此后所有绘制使用笛卡尔坐标

// formPath：用原始笛卡尔坐标，不做取反
ctx.moveTo(points[0].x, points[0].y);
ctx.lineTo(points[1].x, points[1].y);

ctx.restore();
```
注意：模式 B 中 `ctx.scale(1, -1)` 会连带影响线宽方向，需要检查 `lineWidth` 在翻转后是否仍正确。模式 A 是更安全的选择。

### 5.3 锚点（Anchor）在坐标系中的处理

当使用模式 A（点做取反）时，锚点 `anchor` 应和位置 `pos` 一样使用屏幕坐标（不做取反）：
```typescript
ctx.translate(pos.x, pos.y);          // 位置：屏幕坐标，不做取反
ctx.translate(-anchor.x, -anchor.y);   // 锚点偏移：屏幕坐标，不做取反
// ... rotate / scale ...
ctx.translate(anchor.x, anchor.y);     // 恢复锚点：屏幕坐标，不做取反
```

不允许在 step 2 和 step 5 中对 anchor.y 做不一致的取反（如 step 2 取反而 step 5 不取反），这会破坏锚点变换的对称性。

### 5.4 save/restore 后的坐标系续算

`ctx.save()` 保存当前坐标系状态，`ctx.restore()` 恢复至 save 时的状态。在 restore 之后，坐标系恢复为默认（原点在左上角，Y 向下）。

**常见错误**：在 `ctx.restore()` 后直接使用形状内部点坐标继续绘制（如箭头、标注），此时未经 translate 到形状位置，坐标与实际绘制位置不符。

```typescript
// ❌ restore 后直接用形状内部点坐标，缺少 pos 偏移
painter.draw(line);   // draw 内部 save → transform → draw → restore
painter.cap(line);    // cap 内部直接 translate(end.x, -end.y)，缺少 pos 偏移

// ✅ restore 后必须重新应用位置偏移
// cap 内部应：ctx.translate(pos.x + end.x, pos.y - end.y);
```

### 5.5 自检清单

- [ ] **Y 轴翻转一致性检查**：确认 Y 坐标转换只在一个地方执行。如果 `formPath` 中对点坐标做了 `-y` 取反，`applyTransform` 的 `translate` 就不能再对 `pos.y` 取反。且锚点 `anchor.y` 的取反逻辑与位置 `pos.y` 保持一致。
- [ ] **save/restore 边界检查**：`ctx.restore()` 后坐标系恢复默认，后续操作若需继续在形状位置绘制（如箭头、标注），必须重新应用 `pos` 偏移，不能假设坐标系统保留。
- [ ] **无多重取反**：检查整个绘制链中是否有两处以上对同一 Y 值做取反或翻转，确保不会出现「取反两次 = 不取反」或「取反三次 = 取反一次」的 bug。

---
## 6. 绘制函数必须自行设置所需全部 Canvas 属性

每个负责绘制（fill/stroke）的函数，必须在调用 `ctx.fill()` / `ctx.stroke()` 之前从入参或配置对象中**显式设置**该绘制操作所需的全部 Canvas 属性（lineCap、lineJoin、miterLimit、strokeStyle、fillStyle、lineWidth、globalAlpha 等）。禁止依赖调用方在函数外部预先设置这些属性——经过中间函数的 `ctx.save()`/`ctx.restore()` 后，外部设置的属性值可能丢失。

```typescript
// ❌ 依赖外部设置后，经过 save/restore 丢失
applyStrokeStyle(ctx, cap, join, miter);
renderShapedImage(ctx, ...);
// → drawBorder 的 ctx.stroke(path) 可能用丢失后的值

// ✅ 自包含：drawBorder 从 borderConfig 读取并自行设置
function drawBorder(ctx, path, borderConfig) {
  ctx.save();
  if (borderConfig.lineCap) ctx.lineCap = borderConfig.lineCap;
  if (borderConfig.lineJoin) ctx.lineJoin = borderConfig.lineJoin;
  if (borderConfig.miterLimit !== undefined)
    ctx.miterLimit = borderConfig.miterLimit;
  ctx.strokeStyle = borderConfig.color;
  ctx.lineWidth = borderConfig.width;
  ctx.globalAlpha = borderConfig.alpha;
  ctx.stroke(path);
  ctx.restore();
}
```

类型提醒：`ctx.lineCap` 为 `'butt'|'round'|'square'`（CanvasLineCap），`ctx.lineJoin` 为 `'bevel'|'miter'|'round'`（CanvasLineJoin），非 `string`。

### 参考
- `harmonyos-docs-lookup`：CanvasRenderingContext2D API、Path2D 命令格式、PixelMap 配置、GestureEvent、animateTo 使用文档

---

## 7. 每次重绘前必须清空 Canvas

Canvas 不会自动清除上一帧绘制内容。连续调用 `drawSwitch()`/`drawAll()` 等绘制方法时，若不先 `clearRect`，旧帧会与当前帧叠加，产生"残影/幽灵控件"视觉效果。

```typescript
// ✅ 每次重绘前先清除
ctx.clearRect(0, 0, this.drawWidth, this.drawHeight);
// ... 后续绘制逻辑
```

```typescript
// ❌ 没有 clearRect，旧帧像素残留 → 多层叠加残影
// ... 直接 fill/stroke，上一帧的像素仍在
```

**检查清单**：
- [ ] 每个绘制函数的第一行有效绘制代码是 `ctx.clearRect(0, 0, w, h)`？
- [ ] `clearRect` 使用的 `w`/`h` 是当前实际尺寸（来自 `onAreaChange`），不是硬编码默认值？
- [ ] `clearRect` 之前没有提前 `return` 路径？
