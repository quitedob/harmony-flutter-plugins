# NiceImageView 鸿蒙化适配需求解析报告

## 1. 插件基本信息

| 项目 | 内容 |
|------|------|
| 插件名称 | nice_image_view |
| 版本 | 1.0.5 |
| 仓库地址 | https://github.com/shehuan/NiceImageView |
| 许可证 | Apache-2.0 |
| 已支持平台 | Android (原始)、Flutter 全平台 (本次适配目标) |
| 插件类型 | UI 组件 (ui_component) |
| 适配路线 | pure_dart |

## 2. 功能模块划分

| 模块编号 | 模块名称 | 功能描述 | API 数 | 优先级 |
|---------|---------|---------|--------|--------|
| F-01 | 构造函数与初始化 | 支持代码创建和参数初始化，所有 12 个属性均提供默认值 | 1 (含 16 参数) | P0 |
| F-02 | 圆形展示模式 | 将图片裁剪为圆形区域展示，支持切换到矩形模式 | 1 | P0 |
| F-03 | 圆角半径控制 | 支持统一圆角和四角独立圆角两种配置方式 | 4 | P0 |
| F-04 | 边框绘制 | 支持外边框（矩形/圆形均支持）和内边框（仅圆形） | 4 | P0 |
| F-05 | 边框覆盖控制 | 控制边框是否覆盖图片内容区域 | 1 | P1 |
| F-06 | 遮罩绘制 | 在图片裁剪区域上绘制纯色遮罩 | 1 | P1 |

**总计**：6 个功能模块，16 个公开 API 参数，全部 P0/P1 优先级。

## 3. API 接口规格

### NiceImageView Widget

```dart
const NiceImageView({
  Key? key,
  ImageProvider? image,
  double? width,
  double? height,
  bool isCircle = false,
  bool isCoverSrc = false,
  double cornerRadius = 0,
  double cornerTopLeftRadius = 0,
  double cornerTopRightRadius = 0,
  double cornerBottomLeftRadius = 0,
  double cornerBottomRightRadius = 0,
  double borderWidth = 0,
  Color borderColor = Colors.white,
  double innerBorderWidth = 0,
  Color innerBorderColor = Colors.white,
  Color maskColor = Colors.transparent,
  BoxFit? fit,
})
```

所有参数默认值与 Android 原始库完全一致。

## 4. 权限要求

本组件为纯 UI 渲染组件，不申请任何系统权限。

## 5. 使用场景

1. **用户头像圆形展示**：配合圆形模式 + 边框实现头像展示，支持双层边框装饰效果
2. **卡片图片圆角展示**：使用统一圆角或独立四角圆角展示图片
3. **图片状态遮罩**：叠加半透明遮罩表达状态（如已过期、已选中）
4. **组合头像展示**：先生成组合 Bitmap，再用圆形 NiceImageView 展示

## 6. 鸿蒙化适配关键点

- **适配路线**：pure_dart——原始 Android Canvas 绘制逻辑移植为 Flutter CustomPainter
- **关键技术差异**：Flutter `canvas.clipPath()` 替代 Android `PorterDuff Xfermode`，更简洁
- **Path 布尔运算**：Android `Path.Op.DIFFERENCE` 在 Flutter 端被完全规避（Flutter 原生 clipPath 支持更优）
- **单位系统**：Android dp→px 转换在 Flutter 端无需实现（天然逻辑像素）
- **无原生依赖**：不涉及 MethodChannel、PlatformView 或任何原生平台代码

## 7. 测试范围

- 构造函数默认值验证
- 所有渲染模式（圆形、统一圆角、独立圆角、矩形+边框、圆形+内边框、遮罩）
- shouldRepaint 逻辑（6 个条件分支）
- 边界条件（null image、零尺寸、零 borderWidth、透明遮罩、矩形模式忽略 innerBorderWidth）

## 8. 测试级别定义

| 级别 | 说明 |
|------|------|
| L0 | 冒烟测试：组件可正常构建和渲染 |
| L1 | 功能测试：每种渲染模式的正确性 |
| L2 | 边界测试：极端参数和 null 安全性 |
| L3 | 兼容性测试：跨平台验证 |
