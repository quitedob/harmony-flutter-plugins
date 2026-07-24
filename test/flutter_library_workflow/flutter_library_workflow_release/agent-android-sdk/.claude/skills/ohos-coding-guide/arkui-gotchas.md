# ArkUI 框架陷阱记录

## animateTo 不暴露逐帧中间值

**现象**：用 `animateTo` 驱动自定义轨迹（弧线、贝塞尔），结果沿直线运动。

**根因**：`animateTo` 只记录 `@State` 起止快照，在渲染层线性插值组件属性，不逐帧更新中间值。

**正确做法**：

```typescript
// ❌ animateTo 不暴露中间帧
animateTo({}, () => { this.progress = 1 })

// ✅ setTimeout 逐帧驱动
const tick = () => {
  const elapsed = Date.now() - startTime
  this.progress = Math.min(elapsed / duration, 1)
  if (this.progress < 1) setTimeout(tick, 16)
}
tick()
```

## Canvas.arc 角度单位

**现象**：Canvas 画弧角度值与预期不符。

**根因**：`CanvasRenderingContext2D.arc()` 参数为**弧度**，ArcMetric 返回**度**。

**正确做法**：`ctx.arc(cx, cy, r, startDeg * PI / 180, endDeg * PI / 180)`

## .position() 与圆心坐标

**现象**：Circle 位置与计算值对不上。

**根因**：`.position()` 设置左上角，不是圆心。

**正确做法**：`.position({ x: centerX - w/2, y: centerY - h/2 })`

## @Builder 参数非响应式

**现象**：参数变化后 UI 不刷新。

**根因**：`@Builder` 参数是值快照，不建立响应式绑定。

**解决**：组件内用 `@Prop` / `@State` 替代 `@Builder` 参数。

## borderRadius 不支持 number[] 类型

**现象**：`.borderRadius(this.radii)` 编译报错 `No overload matches this call`

**根因**：ArkUI `borderRadius` 属性签名只接受 `Length | BorderRadiuses | LocalizedBorderRadiuses`，不直接接受 `Array<Length>`。`Rect.radius([...])` 接受数组是 Shape 组件特有，不通用。

**正确做法**：

```typescript
// ❌ 编译错误
.borderRadius(this.radii) // radii: number[]

// ✅ 对象字面量
.borderRadius({
  topLeft: this.radii[0],
  topRight: this.radii[1],
  bottomRight: this.radii[2],
  bottomLeft: this.radii[3]
})

// ✅ 统一圆角时可用单个值
.borderRadius(12)
```

**排查方式**：使用 `harmonyos-sdk-api-lookup` 或 `harmonyos-docs-lookup` 确认属性类型签名，不要凭 CSS/Web/Android 直觉推断 ArkUI 属性类型。

## 条件渲染开关必须是 @State

**现象**：用 `private initialized: boolean = false` 作为开关控制首次渲染，再在 `onAreaChange` 中设为 `true`，UI 不刷新。

**根因**：只有 `@State`/`@Prop`/`@Link`/`@Provide` 等**响应式装饰器**变量的变化才触发组件重渲染。`private` 普通变量赋值后，框架不会重新执行 `build()`；同时，因 `false` 短路了 `&&`，`@State imageWidth`/`@State imageHeight` 在首次 `build()` 中实际未被求值，ArkUI 的运行时依赖追踪可能也无法建立绑定。结果：`onAreaChange` 把所有变量都设好了，但 `build()` 永远看不到新值。

**正确做法**：

```typescript
// ❌ 不触发重渲染
private initialized: boolean = false;

// ✅ 触发重渲染
@State private initialized: boolean = false;
```

**排查方式**：
1. 检查条件渲染中所有开关变量是否均带响应式装饰器。
2. 若某 `@State` 被短路运算符（`&&` / `||`）跳过，其变化可能不被追踪 → 改用 `@State` 开关变量，或确保条件表达式始终求值所有依赖。
3. 在 `onAreaChange` / `aboutToAppear` 等回调中设的值，只能通过响应式机制传播到 `build()`。
