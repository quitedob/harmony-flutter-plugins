# NiceImageView 鸿蒙适配方案报告

## 1. SDK 环境

| 项目 | 值 |
|------|-----|
| Dart SDK 约束 | >=3.0.0 <4.0.0 |
| Flutter 约束 | >=3.10.0 |
| OHOS API Level | 12 |
| 目标设备 | phone, tablet, 2in1 |

## 2. 实现策略

| 项目 | 值 |
|------|-----|
| 适配路线 | **type-pure-dart** |
| 方案 | 将 Android NiceImageView.java 的 Canvas 绘制逻辑移植为 Flutter CustomPainter |
| 原生代码 | 不需要任何原生代码 |

## 3. API 映射策略

采用"**等价但更优**"原则：Flutter Canvas API 提供了 Android Canvas 的全部能力，且在某些方面更简洁。

### 关键映射

| Android API | Flutter 等价 | 策略 |
|------------|-------------|------|
| PorterDuff.Mode.DST_IN/DST_OUT | `canvas.clipPath()` | **改进** — 无需混合模式，原生裁剪更干净 |
| Path.Op.DIFFERENCE | 完全规避（clipPath 已等效） | **规避** |
| Canvas.saveLayer + scale | `canvas.save()` + `canvas.clipPath()` + 可选 `canvas.scale()` | **等价** |
| Paint 系统 | Flutter `Paint()` 属性赋值 | **等价** |
| TypedArray 属性解析 | Dart 构造函数命名参数 + 默认值 | **等价** |
| dp2px | 不需要（Flutter 天然逻辑像素） | **简化** |

## 4. 依赖替代

无原生依赖需替代。

## 5. 权限映射

无权限需求。

## 6. 风险项

**无风险项**。所有 12 项 API 映射均为 `high` 置信度的直接等价。

## 7. 参考插件

- **flutter_zoom_drawer**：同为 pure_dart Flutter UI 组件，已成功适配 OHOS，适配路线完全一致。

## 8. 预估工作量

| 指标 | 值 |
|------|-----|
| 预估工时 | **low** (≤0.5 人天) |
| 需创建文件 | 3 (lib entry, widget, painter) |
| 需修改文件 | 0 |
| 原生代码 | 0 行 |

## 9. 结论

NiceImageView 的鸿蒙适配采用 **pure_dart** 路线，将 335 行 Android Java Canvas 绘制代码移植为 192 行 Flutter Dart CustomPainter 代码。Flutter Canvas API 提供了 Android Canvas 的全部能力（clipPath 比 PorterDuff xfermode 更简洁），无需任何原生代码，零平台依赖，零权限，全部 16 个 API 参数直接可用。
