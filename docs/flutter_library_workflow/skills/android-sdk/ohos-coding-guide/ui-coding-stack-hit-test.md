> 前置依赖：阅读本文前请先读 [`ui-coding-reactive-dataflow.md`](./ui-coding-reactive-dataflow.md)
> API 签名和官方用法请从 `harmonyos-docs-lookup` 核实。

# 触摸测试 — Stack 层叠与 HitTestBehavior

## 一句话规则

Stack 最上层容器默认阻塞下层兄弟组件接收触摸。**所有层叠 UI 必须配 `HitTestBehavior`**。

## HitTestMode 速查

| 模式 | 自身 | 子节点 | 阻塞兄弟 | 什么时候用 |
|------|------|--------|---------|-----------|
| `Default` | ✅ | ✅ | ❌ 阻塞 | 普通交互组件（确认是**最下层**时） |
| `None` | ❌ 穿透 | ❌ 穿透 | ❌ 阻塞 | 纯视觉组件：Rect、背景色块 |
| `Transparent` | ❌ 穿透 | ✅ 正常 | ✅ 不阻塞 | **层叠容器的根**、布局容器 |

## 编码模板：遮罩 + 可点击下层

```typescript
Stack() {
  Column() { /* 下层内容 */ }.zIndex(0)

  Stack()                                          // 遮罩根容器
    .width('100%').height('100%').zIndex(1)
    .hitTestBehavior(HitTestMode.Transparent)      // ← 不阻塞下层兄弟
  {
    Rect()                                         // 视觉遮罩
      .width('100%').height('100%')
      .hitTestBehavior(HitTestMode.None)           // ← 纯视觉，穿透

    Row()
      .width('100%').height('100%')
      .hitTestBehavior(HitTestMode.Transparent)    // ← 布局容器，不阻塞
    {
      Row().width(menuWidth)
        .hitTestBehavior(HitTestMode.None)         // ← 穿透到下层菜单
      Row().layoutWeight(1)
        .onClick(() => close())                     // ← 点击关闭
    }
  }
}
```

## 禁止写法

```typescript
// ❌ 最上层 Stack 默认 Default → 下层全阻塞
Stack() { Stack() { Rect() } .zIndex(1) }
```

## 手势用 onTouch 替代 PanGesture

父容器需要拖拽检测时，用 `onTouch` 而不是 `PanGesture`（`PanGesture` 与子 `onClick` 手势仲裁竞争）。

```typescript
.onTouch((event: TouchEvent): void => {
  if (event.type === TouchType.Down) {
    this.touchStartX = event.touches[0].x;
    this.isDragging = false;
  } else if (event.type === TouchType.Move) {
    const dx = event.touches[0].x - this.touchStartX;
    if (!this.isDragging && Math.abs(dx) > threshold) {
      this.isDragging = true;
      this.startDragging();
    }
    if (this.isDragging) this.handleDragUpdate(dx, 0);
  } else if (event.type === TouchType.Up) {
    if (this.isDragging) this.handleDragEnd(dx, 0);
  }
})
```

`onTouch` 不参与手势仲裁，与子 `onClick` 独立共存。

## 自定义滚动组件必须用 hitTestBehavior 隔离外层 Scroll

任何使用 `onTouch` 实现滚动的自定义组件，若可能被嵌入 `Scroll()` 等可滚动容器内，必须在组件根节点设置 `hitTestBehavior` 阻止触摸冒泡。

```typescript
// ✅ 始终隔离：HitTestMode.Block 完全消费触摸，不冒泡到外层 Scroll
// ✅ 可控隔离：有 scrollerEnabled 开关时用条件表达式
.hitTestBehavior(this.scrollerEnabled ? HitTestMode.Block : HitTestMode.Transparent)
```

`HitTestMode.Transparent` 在禁用滚动时穿透触摸，外层 Scroll 可正常滚动该区域。

## ArkUI 全局枚举禁止 import

`HitTestMode`、`TouchType` 等 ArkUI 公共枚举全局可用，**禁止 import**：

```typescript
// ❌ import { HitTestMode } from '@kit.ArkUI'; → 编译报错 has no exported member
// ✅ 直接使用: HitTestMode.Block
```

常见全局枚举（直接使用，无需 import）：`HitTestMode`、`TouchType`、`ScrollDirection`、`FlexAlign`、`FontWeight`、`Color`、`ImageFit`、`BorderStyle`、`TextAlign`、`TextOverflow`、`Visibility`、`Orientation`。

## 编码检查清单

- [ ] 层叠 UI 的根容器设了 `Transparent`？
- [ ] 纯视觉组件设了 `None`？
- [ ] 布局容器（无点击事件）设了 `Transparent`？
- [ ] 父容器拖拽用了 `onTouch` 而非 `PanGesture`？
- [ ] 自定义滚动组件嵌入外层 Scroll 容器时加了 `hitTestBehavior(Block/Transparent)`？
- [ ] 使用 `HitTestMode` 等全局枚举时没有 import（直接使用枚举名）？

---
### 参考
- `harmonyos-docs-lookup`：Stack 组件文档、HitTestBehavior 枚举、PanGesture 手势文档
