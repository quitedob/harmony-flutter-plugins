> 前置依赖：阅读本文前请先读 [`ui-coding-reactive-dataflow.md`](./ui-coding-reactive-dataflow.md)
> API 签名和官方用法请从 `harmonyos-docs-lookup` 核实。

# 列表渲染 — ForEach key 生成规则

**ForEach 的第三个参数（key 生成器）决定组件是否复用。** 如果 key 不变，即使数据源内容更新，ArkUI 也会跳过组件重建，导致 UI 不刷新。

## 核心规则

1. **禁止仅用数组索引作为 key**（如 `(item, index) => index.toString()`），因为索引不变不代表内容不变
2. **刷新场景必须引入版本标识**：当同一个 @State 数组被整体替换为新内容时（如刷新随机颜色、重新拉取列表），key 必须包含刷新版本号

## 模式：刷新计数器

```typescript
@State items: SomeType[] = [];
@State itemsRefreshKey: number = 0;

private refreshItems(): void {
  this.items = newItems;
  this.itemsRefreshKey++;
}

ForEach(this.items, (item: SomeType) => {
  // ...
}, (item: SomeType, index: number) => `${this.itemsRefreshKey}_${index}`)
```

## 为什么不用数据值做 key？

用 `${index}_${item.someValue}` 看似可行，但不保证确定性刷新：
- 不同次刷新可能产生相同值，key 不变则不刷新
- 对象类型需要额外序列化逻辑，增加复杂度
- 刷新计数器每次自增，key 必然变化，100% 触发重建

---
### 参考
- `harmonyos-docs-lookup`：ForEach 组件文档、LazyForEach 使用指导、Repeat 组件文档
