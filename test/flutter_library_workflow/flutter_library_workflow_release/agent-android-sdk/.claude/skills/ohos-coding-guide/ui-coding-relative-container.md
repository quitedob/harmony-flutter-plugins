> 前置依赖：阅读本文前请先读 [`ui-coding-reactive-dataflow.md`](./ui-coding-reactive-dataflow.md)
> API 签名和官方用法请从 `harmonyos-docs-lookup` 核实。

# 布局 — RelativeContainer alignRules 同方向互斥

`alignRules` 垂直方向 `top`/`center`/`bottom` 三选一（`top`+`bottom` 可共存表示拉伸），水平方向 `left`/`middle`/`right` 三选一。同方向设多条非拉伸约束 → 组件不显示或位置异常。

```typescript
// ❌ center 与 top 同为垂直约束 → 按钮不显示
Button('进入 Demo')
  .alignRules({
    top: { anchor: 'HelloWorld', align: VerticalAlign.Bottom },
    center: { anchor: '__container__', align: VerticalAlign.Center },
    middle: { anchor: '__container__', align: HorizontalAlign.Center }
  })

// ✅ 垂直方向只用 top
Button('进入 Demo')
  .alignRules({
    top: { anchor: 'HelloWorld', align: VerticalAlign.Bottom },
    middle: { anchor: '__container__', align: HorizontalAlign.Center }
  })
```

简单纵向布局优先用 `Column`，避免 alignRules 冲突。

---
### 参考
- `harmonyos-docs-lookup`：RelativeContainer 组件文档、alignRules 使用指导
