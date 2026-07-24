# 性能检查清单与结果处理

## 检查清单与结果处理

| 规则 | 检查项 | 结果处理 |
|------|--------|---------|
| 1 | `addListener(() { setState(() {}); })` — 添加监听器后回调中仅调用了空的 `setState` | 将实际逻辑移入回调，或移除 `setState` 改为响应式更新（如 `ValueNotifier` + `AnimatedBuilder`） |
| 2 | 使用了 `ListView` / `GridView` 的直接构造函数（`children:` 参数），而非 `.builder()` | 如果列表项 > 10，应改为 `ListView.builder()` / `GridView.builder()`。直接构造函数会一次性创建所有子项，`builder` 按需构建 |
| 3 | 使用 `Image.file()` / `Image.network()` / `Image.asset()` 加载图片但未配合 `ResizeImage` | 对已知尺寸的图片使用 `ResizeImage` 包裹：`Image.network(url, cacheWidth: targetWidth)`，或 `ResizeImage(ImageProvider, width: 600)` |
| 4 | `ListView.builder` 未设置 `addAutomaticKeepAlives: false` | 添加 `addAutomaticKeepAlives: false` 减少后台页面内存占用 |
| 5 | `deactivate` 方法中未调用 `AnimationController.stop()` | 在 `deactivate` 中调用 `controller.stop()` 停止动画 |

## 1 — addListener + setState 反模式

**反模式示例**：
```dart
// 反模式：addListener 中仅调用了空的 setState
scrollController.addListener(() {
  setState(() {}); // 无实际状态变更，触发不必要的重建
});

// 正解方案 1：使用 ValueNotifier
final ValueNotifier<double> scrollOffset = ValueNotifier(0.0);
scrollController.addListener(() {
  scrollOffset.value = scrollController.offset;
});
// 使用 ValueListenableBuilder 监听

// 正解方案 2：移除不必要的 setState，如果不需要重建
```

**结果处理**：移除空 setState 或使用 ValueListenableBuilder 替代。

## 2 — ListView/GridView 未用 builder

```dart
// 不推荐（列表项 > 10 时）
ListView(
  children: items.map((item) => ListTile(title: Text(item))).toList(),
)

// 推荐
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => ListTile(title: Text(items[index])),
)
```

**结果处理**：改用 ListView.builder() / GridView.builder()。

## 3 — 大图未用 ResizeImage

```dart
// 不推荐：直接加载原图
Image.network('https://example.com/large_image.jpg')

// 推荐：指定缓存尺寸
Image.network(
  'https://example.com/large_image.jpg',
  cacheWidth: 600,  // 指定宽度，减少内存
)

// 或使用 ResizeImage
Image(image: ResizeImage(
  NetworkImage('https://example.com/large_image.jpg'),
  width: 600,
))
```

**结果处理**：使用 ResizeImage 或 cacheWidth/cacheHeight 限制解码分辨率。

## 4 — addAutomaticKeepAlives 缺失

```dart
// 不推荐：默认 addAutomaticKeepAlives 为 true
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => ListTile(title: Text(items[index])),
)

// 推荐（自动修复）
ListView.builder(
  addAutomaticKeepAlives: false,
  itemCount: items.length,
  itemBuilder: (context, index) => ListTile(title: Text(items[index])),
)
```

**结果处理**：设置 addAutomaticKeepAlives: false。

## 5 — deactivate 中未 stop

```dart
class _MyWidgetState extends State<MyWidget> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..repeat();
  }

  @override
  void deactivate() {
    _controller.stop(); // 应在 deactivate 中停止动画
    super.deactivate();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
```

**结果处理**：在 deactivate() 中调用 _controller.stop()。

