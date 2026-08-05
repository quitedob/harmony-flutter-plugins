# NiceImageView 鸿蒙适配集成指南

> `nice_image_view` v1.0.5（纯 Dart CustomPainter Widget）
> 适配日期：2026-08-04（全量复跑）

## 1. 添加依赖

**本地/仓库集成（path 依赖）**：

```yaml
dependencies:
  nice_image_view:
    path: ../            # 以发布后所在 monorepo 或子目录的相对路径为准
```

**发布到 pub.dev 后（版本依赖）**：

```yaml
dependencies:
  nice_image_view: ^1.0.5
```

本插件为纯 Dart 库，仅依赖 `flutter` SDK，无需任何原生 platform 注册或 ohos/ HAR。

## 2. 导入

```dart
import 'package:nice_image_view/nice_image_view.dart';
```

## 3. 基本用法（16 参数全示例）

`NiceImageView` 提供 16 个构造参数：`image`、`width`、`height`、`isCircle`、`isCoverSrc`、`cornerRadius`、`cornerTopLeftRadius`、`cornerTopRightRadius`、`cornerBottomRightRadius`、`cornerBottomLeftRadius`、`borderWidth`、`borderColor`、`innerBorderWidth`、`innerBorderColor`、`maskColor`、`fit`。

```dart
NiceImageView(
  image: AssetImage('assets/avatar.jpg'),   // ImageProvider? 图片
  width: 100,                                // double? 宽度
  height: 100,                               // double? 高度
  isCircle: true,                            // bool 圆形裁剪
  isCoverSrc: false,                         // bool 边框是否覆盖图片
  cornerRadius: 0,                           // double 统一圆角
  cornerTopLeftRadius: 0,                    // double 左上角圆角
  cornerTopRightRadius: 0,                   // double 右上角圆角
  cornerBottomRightRadius: 0,                // double 右下角圆角
  cornerBottomLeftRadius: 0,                 // double 左下角圆角
  borderWidth: 3,                            // double 外边框宽度
  borderColor: Colors.orange,                // Color 外边框颜色
  innerBorderWidth: 2,                       // double 内边框宽度（仅圆形模式生效）
  innerBorderColor: Colors.white,            // Color 内边框颜色
  maskColor: Colors.transparent,             // Color 遮罩颜色（透明=无遮罩）
  fit: BoxFit.cover,                         // BoxFit? 填充方式
)
```

常用组合示例：

```dart
// 圆形头像 + 双层边框 + 遮罩
NiceImageView(
  image: NetworkImage('https://example.com/avatar.png'),
  width: 120,
  height: 120,
  isCircle: true,
  borderWidth: 4,
  borderColor: Colors.blue,
  innerBorderWidth: 2,
  innerBorderColor: Colors.white,
  maskColor: Colors.black26,
)

// 圆角卡片图 + 独立四角圆角
NiceImageView(
  image: AssetImage('assets/card.jpg'),
  width: 300,
  height: 200,
  cornerTopLeftRadius: 16,
  cornerTopRightRadius: 16,
  cornerBottomLeftRadius: 0,
  cornerBottomRightRadius: 0,
  borderWidth: 1,
  borderColor: Colors.grey.shade300,
)
```

## 4. 完整 API 参数表

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
| `cornerBottomRightRadius` | `double` | 0 | 右下角圆角 |
| `cornerBottomLeftRadius` | `double` | 0 | 左下角圆角 |
| `borderWidth` | `double` | 0 | 外边框宽度 |
| `borderColor` | `Color` | Colors.white | 外边框颜色 |
| `innerBorderWidth` | `double` | 0 | 内边框宽度（仅圆形模式） |
| `innerBorderColor` | `Color` | Colors.white | 内边框颜色 |
| `maskColor` | `Color` | Colors.transparent | 遮罩颜色 |
| `fit` | `BoxFit?` | null (BoxFit.cover) | 图片填充方式 |

## 5. 平台支持

| 平台 | 状态 |
|------|------|
| Android / iOS / Web / Windows / macOS / Linux | ✅（纯 Dart，全平台可用） |
| HarmonyOS (OHOS) | ✅ 已适配，真机验证：phone BRA-AL00（OHOS API 24）安装/启动 PASS；tablet / 2in1 为目标设备，待真机确认 |

## 6. 权限

无需任何系统权限（零权限）。

## 7. 已知限制

- **运行态行为验证待补**：签名 HAP 已在 phone（BRA-AL00，OHOS API 24）安装并启动成功，Flutter engine 初始化、首页语义树渲染正常；但 24 条用例的**逐条行为验证与「一键测试全部」汇总尚未全自动确认**（midscene 视觉模型未配置），设备运行态行为（behavior_status）保持 NOT_RUN。
- **Windows 构建路径**：`flutter build hap` 在 Windows 上可能触发 BATCH RECURSION 与 259 字符路径限制，需在物理短工作区（如 `D:\niv_build\NiceImageView\example_auto`）用 DevEco `node hvigorw.js assembleHap -p product=default -p buildMode=debug --no-daemon` 直连构建。
- **签名标识**：当前演示 HAP 使用 DevEco 默认 debug 证书（bundle `com.example.flutter_ohos_test`），为兼容性标识；生产分发请申请独立 bundle 与发布签名。

## 8. 与 Android 原库的差异

| Android | Flutter | 说明 |
|---------|---------|------|
| XML 布局声明 | Dart 代码构造函数 | Flutter 标准方式 |
| `dp` 单位 | 逻辑像素 | Flutter 天然密度无关 |
| PorterDuff 裁剪 | `canvas.clipPath()` | 效果一致，实现更简洁 |
| `invalidate()` 触发重绘 | `shouldRepaint()` 返回 true | Flutter 响应式渲染 |
| 矩形模式内边框强制置 0 | `effectiveInnerBorder = isCircle ? innerBorderWidth : 0` | 语义一致 |
