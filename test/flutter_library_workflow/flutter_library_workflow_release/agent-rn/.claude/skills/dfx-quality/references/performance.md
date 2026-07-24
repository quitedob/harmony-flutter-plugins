# RN OHOS 应用性能优化参考

- 来源：`rn-docs-lookup/性能调优.md`、`页面转场与滑动场景优化.md`
- 适用于 `fix_js.py` 规则 1（FlatList 性能配置）和规则 2（React.memo）

---

## 检查清单与结果处理

| 规则 | 检查项 | 结果处理 |
|------|--------|---------|
| 1 | FlatList 缺少 removeClippedSubviews/getItemLayout/windowSize | 按 §1 补充配置 |
| 2 | 可复用组件未使用 React.memo | 按 §2 包裹 React.memo |
| 3 | 属性对象内联创建（匿名函数/对象字面量） | 按 §3 提取为常量或 useCallback |

---

## 1 — FlatList 深度调优

### removeClippedSubviews

```tsx
<FlatList
  removeClippedSubviews={true}
  // ...
/>
```

**原理**：当 Item 移出可视区时，RN 会将其对应的 Native View 从 UI 树上"下树"（Detach），但保留 JS 侧的 Virtual DOM 状态。极大降低 Native 内存占用和 GPU 绘制压力。

**注意**：在某些复杂的嵌套 ScrollView 结构中可能导致内容不可见，需测试验证。

---

### getItemLayout

若 Item 高度固定，**必须**实现此方法。RN 可直接通过索引计算偏移量，无需执行异步的 Layout 测量，是长列表性能优化的分水岭。

```tsx
const getItemLayout = useCallback((data, index) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
}), []);
```

---

### 渲染窗口配置

```tsx
<FlatList
  initialNumToRender={10}   // 仅渲染首屏，避免启动时构建耗时过长
  maxToRenderPerBatch={5}    // 调优批次大小
  windowSize={5}             // 默认 21，适当调小减少内存驻留
/>
```

**windowSize**：默认 21，可适当调小（如 5-10）以减少内存驻留，以时间换空间。

---

### 完整优化示例

```tsx
import React, { useCallback, useMemo } from 'react';
import { FlatList, View, Text } from 'react-native';

const OptimizedItem = React.memo(({ item }) => (
  <View style={{ height: 60 }}>
    <Text>{item.title}</Text>
  </View>
));

export default function OptimizedList() {
  const data = useMemo(() => Array.from({ length: 1000 }, (_, i) => ({ id: i, title: `Row ${i}` })), []);

  const renderItem = useCallback(({ item }) => (
    <OptimizedItem item={item} />
  ), []);

  const getItemLayout = useCallback((data, index) => ({
    length: 60,
    offset: 60 * index,
    index,
  }), []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      removeClippedSubviews={true}
      getItemLayout={getItemLayout}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
  );
}
```

**结果处理**：补充 removeClippedSubviews/getItemLayout/windowSize 配置项。

---

## 2 — React.memo 优化

### 基本用法

```tsx
const OptimizedItem = React.memo(({ item, onPress }) => {
  return (
    <View>
      <Text>{item.title}</Text>
    </View>
  );
});
```

### 自定义对比函数

```tsx
const OptimizedItem = React.memo(({ item, onPress }) => {
  return (
    <View>
      <Text>{item.title}</Text>
    </View>
  );
}, (prev, next) => prev.item.id === next.item.id);
```

### 配合 useCallback 保持引用稳定

```tsx
// 使用 useCallback 稳定引用，避免内联函数
const handlePress = useCallback((id) => {
  doSomething(id);
}, []);

const renderItem = useCallback(({ item }) => (
  <OptimizedItem item={item} onPress={handlePress} />
), [handlePress]);
```

**注意**：匿名函数 `onPress={() => {}}` 或内联对象 `style={{...}}` 会导致每次 Render 生成新引用，使 React.memo 失效。

**结果处理**：使用 React.memo 包裹可复用组件，配合 useCallback 保持引用稳定。

---

## 3 — 属性对象创建一次

```tsx
// 正确 — 引用稳定
<Child text="Child_2" click={this.clickAction} />

// 错误 — 每次 render 创建新引用，破坏 PureComponent/memo
<Child text="Child_1" click={() => console.log('clickAction')} />
<Child text="Child_3" click={this.clickAction.bind(this)} />
```

**结果处理**：提取为常量或 useCallback，避免内联函数/对象。

---

## 检查清单与结果处理汇总

### 自动化检测项（fix_js.py）

| # | 检查项 | 检测方式 | 结果处理 |
|---|--------|---------|---------|
| 1 | FlatList 缺少性能配置 | 扫描 FlatList 组件，检查 removeClippedSubviews/getItemLayout/windowSize | 按 §1 补充配置 |
| 2 | 可复用组件未使用 React.memo | 扫描组件导出，检查是否包裹 React.memo | 按 §2 包裹 React.memo |

### Agent 核对项

| # | 检查项 | 检测方法 | 结果处理 |
|---|--------|---------|---------|
| 3 | 属性对象内联创建 | 检查 JSX 中是否有匿名函数 `() => {}` 或内联对象 `style={{...}}` 作为 props | 提取为常量或 useCallback |
