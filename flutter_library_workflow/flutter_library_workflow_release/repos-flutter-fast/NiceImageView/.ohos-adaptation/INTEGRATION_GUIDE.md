# NiceImageView 鸿蒙适配集成指南

## 1. 添加依赖

在你的 `pubspec.yaml` 中添加：

```yaml
dependencies:
  nice_image_view:
    git:
      url: https://github.com/shehuan/NiceImageView.git
      path: .
```

## 2. 导入

```dart
import 'package:nice_image_view/nice_image_view.dart';
```

## 3. 基本用法

### 圆形头像 + 边框

```dart
NiceImageView(
  image: AssetImage('assets/avatar.jpg'),
  width: 100,
  height: 100,
  isCircle: true,
  borderWidth: 3,
  borderColor: Colors.orange,
)
```

### 圆角卡片图片

```dart
NiceImageView(
  image: NetworkImage('https://example.com/image.jpg'),
  width: 200,
  height: 150,
  cornerRadius: 16,
  borderWidth: 1,
  borderColor: Colors.grey.shade300,
)
```

### 独立圆角（如上圆角 + 下直角）

```dart
NiceImageView(
  image: AssetImage('assets/card_top.jpg'),
  width: 300,
  height: 200,
  cornerTopLeftRadius: 16,
  cornerTopRightRadius: 16,
  cornerBottomLeftRadius: 0,
  cornerBottomRightRadius: 0,
)
```

### 圆形 + 双层边框

```dart
NiceImageView(
  image: AssetImage('assets/avatar.jpg'),
  width: 120,
  height: 120,
  isCircle: true,
  borderWidth: 4,
  borderColor: Colors.blue,
  innerBorderWidth: 2,
  innerBorderColor: Colors.white,
)
```

### 图片遮罩

```dart
NiceImageView(
  image: AssetImage('assets/photo.jpg'),
  width: 200,
  height: 200,
  isCircle: true,
  maskColor: Colors.black45,
)
```

## 4. 完整 API

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `image` | `ImageProvider?` | null | 要显示的图片 |
| `width` | `double?` | null | 宽度 |
| `height` | `double?` | null | 高度 |
| `isCircle` | `bool` | false | 是否显示为圆形 |
| `isCoverSrc` | `bool` | false | 边框是否覆盖图片 |
| `cornerRadius` | `double` | 0 | 统一圆角半径 |
| `cornerTopLeftRadius` | `double` | 0 | 左上角圆角 |
| `cornerTopRightRadius` | `double` | 0 | 右上角圆角 |
| `cornerBottomLeftRadius` | `double` | 0 | 左下角圆角 |
| `cornerBottomRightRadius` | `double` | 0 | 右下角圆角 |
| `borderWidth` | `double` | 0 | 外边框宽度 |
| `borderColor` | `Color` | Colors.white | 外边框颜色 |
| `innerBorderWidth` | `double` | 0 | 内边框宽度（仅圆形） |
| `innerBorderColor` | `Color` | Colors.white | 内边框颜色 |
| `maskColor` | `Color` | Colors.transparent | 遮罩颜色 |
| `fit` | `BoxFit?` | null (BoxFit.cover) | 图片填充方式 |

## 5. 平台支持

| 平台 | 状态 |
|------|------|
| Android | ✅ |
| iOS | ✅ |
| HarmonyOS (OHOS) | ✅ |
| Web | ✅ |
| Windows | ✅ |
| macOS | ✅ |
| Linux | ✅ |

## 6. 权限

无需任何系统权限。

## 7. 已知限制

无。

## 8. 与 Android 原库的差异

| Android | Flutter | 说明 |
|---------|---------|------|
| XML 布局声明 | Dart 代码构造函数 | Flutter 标准方式 |
| `dp` 单位 | 逻辑像素 | Flutter 天然密度无关 |
| PorterDuff 裁剪 | `canvas.clipPath()` | 效果一致，实现更简洁 |
| `invalidate()` 触发重绘 | `shouldRepaint()` 返回 true | Flutter 响应式渲染 |
