# nice_image_view 鸿蒙适配需求规格（PRD）

## 1. 插件概述

### 1.1 基本信息

| 项目 | 内容 |
|------|------|
| 插件名称 | nice_image_view |
| 版本 | 1.0.5 |
| 仓库地址 | https://github.com/shehuan/NiceImageView |
| 许可证 | Apache License 2.0 |
| 已支持平台 | Android, iOS, OHOS, Web, Windows, macOS, Linux |
| 插件类型 | **pure_dart** — 零原生代码，仅依赖 Flutter Framework |
| OHOS 适配状态 | ✅ 完成 — 签署 HAP 已构建，集成至 flutter_ohos_test Hub |

### 1.2 插件简介

`nice_image_view` 是一个 Flutter pure_dart 图片展示组件，基于 `CustomPainter` 实现 Canvas 级自定义渲染。它在标准 `Image` widget 基础上提供了圆角裁剪、圆形展示、边框绘制、内边框（双层边框）和遮罩叠加等视觉增强能力，使开发者无需手动编写复杂的 Canvas 裁剪逻辑即可快速实现丰富的图片展示效果。

该组件通过 16 个构造函数参数声明式配置样式，所有参数提供默认值，支持运行时动态调整。核心渲染使用 Flutter Canvas API 的 `clipPath()` 方法实现图片区域裁剪，替代了 Android 原始库的 PorterDuff Xfermode 混合模式方案，代码更简洁且跨平台一致性更好。

典型使用场景：用户头像圆形展示（可配合双层边框装饰）、卡片图片圆角展示、带边框装饰的图片列表项、以及需要遮罩叠加的状态提示图片。

### 1.3 目标用户与使用场景

**目标用户**：Flutter 跨平台应用开发者，需要快速实现带圆角/圆形/边框/遮罩效果的图片展示。

**典型使用场景**：

| 场景 | 描述 | 涉及 API |
|------|------|---------|
| 用户头像圆形展示 | 圆形头像 + 可选内外双层边框装饰 | `isCircle`, `borderWidth`, `borderColor`, `innerBorderWidth`, `innerBorderColor` |
| 组合头像（如钉钉群头像） | 先生成组合 Bitmap，再用圆形展示 | `isCircle` + 外部组合 Bitmap 生成 |
| 卡片图片圆角展示 | 矩形图片配合统一圆角 | `cornerRadius` |
| 列表项图片不规则圆角 | 独立四角圆角（如仅上方两角圆角） | `cornerTopLeftRadius`, `cornerTopRightRadius`, `cornerBottomLeftRadius`, `cornerBottomRightRadius` |
| 状态遮罩 | 图片上叠加半透明遮罩 | `maskColor` |
| 边框装饰 | 图片外围绘制彩色边框（矩形圆角边框/圆形边框） | `borderWidth`, `borderColor`, `isCoverSrc` |

### 1.4 适配复杂度评估

| 指标 | 数值 | 说明 |
|------|------|------|
| 复杂度评分 | 2 / 20 | 极低复杂度：纯 Dart 代码，零 MethodChannel，零原生依赖 |
| 复杂度等级 | **low** | CustomPainter 绘制逻辑简单清晰（clipPath → drawImage → mask → borders） |
| 适配建议 | **proceed** | 无需任何修改即可在所有 Flutter 平台上运行 |
| 适配方式 | **pure_dart 完整移植** | Android 335 行 Java Canvas 代码 → 192 行 Dart CustomPainter 代码 |

**风险项**：

| 风险描述 | 严重程度 | 缓解措施 |
|---------|---------|---------|
| Flutter Engine 在不同平台上的 Canvas clipPath 渲染差异 | low | clipPath 是 Flutter Canvas 标准 API，所有平台等效；若出现 Skia/Impeller 差异，可通过 `Paint().isAntiAlias` 调优 |
| OHOS 真机上 CustomPainter 首次渲染性能 | low | 使用 `shouldRepaint` 精确控制重绘时机，避免不必要的 rebuild |

### 1.5 鸿蒙生态规则提示

本组件为纯 Flutter 框架 UI 渲染组件，不涉及以下能力：
- 华为账号/支付/推送/地图/广告/应用市场等 Kit 集成
- 受限权限（相机、位置、存储、通讯录等）
- Web 内核或后台音频
- 数据上传第三方服务器

**结论**：本组件不涉及鸿蒙生态特殊规则。

---

## 2. 功能需求总览

### 2.1 功能模块划分

| 模块编号 | 功能模块 | 描述 | API 参数数 | 验收标准（AC） | 优先级 |
|---------|---------|---------|-----------|--------------|--------|
| F-01 | 构造与初始化 | 接收 16 个参数创建组件，所有参数提供默认值。内部通过 `ImageProvider.resolve()` 异步加载图片并传递给 `CustomPainter`。 | 16 | 1. 不带任何参数调用不崩溃，使用默认值<br>2. 全部参数传入后正确赋值<br>3. 自定义 width/height 正确应用到 `SizedBox` | P0 |
| F-02 | 圆形展示模式 | 将图片裁剪为圆形区域展示（`isCircle: true`）。使用 `Path.addOval()` 构建圆形裁剪路径。圆形模式下所有圆角设置被忽略。 | 1 | 1. 圆形模式下图片显示为正圆<br>2. 切换回矩形模式后恢复原有圆角设置<br>3. 圆形模式下 `innerBorderWidth` 正常工作 | P0 |
| F-03 | 圆角半径控制 | 支持统一圆角（`cornerRadius`）和四角独立圆角两种配置方式。使用 `RRect.fromLTRBAndCorners()` 构建裁剪区域。`cornerRadius > 0` 时覆盖所有独立角设置。 | 5 | 1. 统一圆角四角一致<br>2. 独立圆角各角独立受控<br>3. 圆形模式下圆角设置不生效（预期行为） | P0 |
| F-04 | 边框绘制 | 外边框通过 `canvas.drawRRect()`（矩形）或 `canvas.drawCircle()`（圆形）绘制。内边框仅圆形模式支持，矩形模式下 `innerBorderWidth` 自动清零。 | 4 | 1. 矩形模式 + borderWidth > 0：矩形圆角边框<br>2. 圆形模式 + borderWidth > 0：圆形边框<br>3. 圆形模式 + innerBorderWidth > 0：双层圆形边框<br>4. 矩形模式下 innerBorderWidth 自动被忽略 | P0 |
| F-05 | 边框覆盖控制 | `isCoverSrc: false`（默认）时图片等比缩小以避开边框区域；`true` 时边框覆盖在图片上方。 | 1 | 1. 默认行为：图片与边框不重叠<br>2. 覆盖模式：边框绘制在图片上方 | P1 |
| F-06 | 遮罩绘制 | 在图片裁剪区域内绘制纯色遮罩（`maskColor`）。通过 `canvas.drawPath(clipPath, maskPaint)` 实现。`maskColor == Colors.transparent` 时不绘制。 | 1 | 1. 遮罩仅作用于裁剪区域内部<br>2. 透明色不绘制遮罩 | P1 |

> 优先级定义：
> - **P0**：核心功能，缺失则组件不可用
> - **P1**：重要功能，影响主要使用场景
> - **P2**：辅助功能，可降级或延后实现

### 2.2 功能依赖关系

```
F-01 构造与初始化
 ├─► F-02 圆形展示模式（依赖 isCircle 决定裁剪路径形状）
 ├─► F-03 圆角半径控制（依赖 cornerRadius/各角参数构建 RRect）
 ├─► F-04 边框绘制（依赖 F-02/F-03 确定的几何形状）
 ├─► F-05 边框覆盖控制（依赖 F-04 边框宽度计算缩放比例）
 └─► F-06 遮罩绘制（依赖 clipPath = F-02 或 F-03 构建的裁剪路径）
```

---

## 3. 公开 API 规格

### 3.1 NiceImageView Widget

`NiceImageView` 是唯一的公开类，一个 `StatefulWidget`，使用 `CustomPaint(painter: NiceImageViewPainter(...))` 渲染。

#### 构造函数

```dart
const NiceImageView({
  Key? key,
  ImageProvider? image,
  double? width,
  double? height,
  bool isCircle = false,
  bool isCoverSrc = false,
  double cornerRadius = 0.0,
  double cornerTopLeftRadius = 0.0,
  double cornerTopRightRadius = 0.0,
  double cornerBottomLeftRadius = 0.0,
  double cornerBottomRightRadius = 0.0,
  double borderWidth = 0.0,
  Color borderColor = Colors.white,
  double innerBorderWidth = 0.0,
  Color innerBorderColor = Colors.white,
  Color maskColor = Colors.transparent,
  BoxFit? fit,
})
```

#### 参数详情

| 参数名 | 类型 | 必填 | 说明 | 默认值 | 所属模块 |
|--------|------|------|------|--------|---------|
| `image` | `ImageProvider?` | 否 | 要显示的图片。支持 `AssetImage`、`NetworkImage`、`MemoryImage` 等。为 null 时不渲染任何内容。 | `null` | F-01 |
| `width` | `double?` | 否 | 组件宽度（逻辑像素）。为 null 时自适应父级约束。 | `null` | F-01 |
| `height` | `double?` | 否 | 组件高度（逻辑像素）。为 null 时自适应父级约束。 | `null` | F-01 |
| `isCircle` | `bool` | 否 | 是否以圆形模式展示。true 时忽略圆角设置，始终以正圆裁剪。 | `false` | F-02 |
| `isCoverSrc` | `bool` | 否 | 边框是否覆盖图片内容。false（默认）时图片等比缩小避开边框。 | `false` | F-05 |
| `cornerRadius` | `double` | 否 | 统一圆角半径（逻辑像素）。>0 时覆盖所有独立圆角设置。 | `0` | F-03 |
| `cornerTopLeftRadius` | `double` | 否 | 左上角圆角半径（逻辑像素）。仅在 `cornerRadius == 0` 时生效。 | `0` | F-03 |
| `cornerTopRightRadius` | `double` | 否 | 右上角圆角半径（逻辑像素）。仅在 `cornerRadius == 0` 时生效。 | `0` | F-03 |
| `cornerBottomLeftRadius` | `double` | 否 | 左下角圆角半径（逻辑像素）。仅在 `cornerRadius == 0` 时生效。 | `0` | F-03 |
| `cornerBottomRightRadius` | `double` | 否 | 右下角圆角半径（逻辑像素）。仅在 `cornerRadius == 0` 时生效。 | `0` | F-03 |
| `borderWidth` | `double` | 否 | 外边框宽度（逻辑像素）。0 时不绘制边框。 | `0` | F-04 |
| `borderColor` | `Color` | 否 | 外边框颜色（ARGB）。 | `Colors.white` | F-04 |
| `innerBorderWidth` | `double` | 否 | 内边框宽度（逻辑像素）。**仅圆形模式生效**。矩形模式下自动置零。 | `0` | F-04 |
| `innerBorderColor` | `Color` | 否 | 内边框颜色（ARGB）。**仅圆形模式可见**。 | `Colors.white` | F-04 |
| `maskColor` | `Color` | 否 | 遮罩颜色（ARGB）。仅在裁剪区域内部绘制。`Colors.transparent` 时不绘制。 | `Colors.transparent` | F-06 |
| `fit` | `BoxFit?` | 否 | 图片填充方式。为 null 时默认 `BoxFit.cover`。 | `null` (=cover) | F-01 |

**源码位置**：`lib/src/nice_image_view.dart`

**行为说明**：
1. 组件为 `StatefulWidget`，通过 `ImageProvider.resolve()` 异步加载图片
2. 图片加载完成后通过 `setState()` 触发 `CustomPainter` 重绘
3. 任何参数变更通过 `shouldRepaint()` 精确控制重绘时机
4. 组件销毁时自动释放 `ImageStream` 监听器

---

## 4. 事件与回调规格

本组件不涉及 EventChannel、回调机制或事件流。组件不对外暴露任何事件监听器。

---

## 5. PlatformView 规格

本组件为 pure_dart 实现，不使用 PlatformView。所有渲染通过 `CustomPainter` 在 Flutter 框架层完成。

---

## 6. 权限需求

| 权限 | Android 声明 | iOS 声明 | 用途 | 关联功能模块 |
|------|-------------|----------|------|-------------|
| 无 | 无 | 无 | 纯 UI 渲染组件，不申请任何系统权限 | — |

---

## 7. 数据流与交互流程

### 7.1 渲染管线

```
用户代码 → NiceImageView(image, props...)
  │
  ├─ initState()
  │   └─ _resolveImage()
  │       └─ ImageProvider.resolve(context)
  │           └─ ImageStreamListener → _onImageResolved(ImageInfo)
  │               └─ setState(() { _resolvedImage = info.image })
  │
  └─ build()
      └─ SizedBox(width, height)
          └─ CustomPaint(painter: NiceImageViewPainter(image, props...))
              └─ paint(canvas, size):
                  ├─ 1. 构建 clipPath
                  │     ├─ isCircle → Path.addOval()
                  │     └─ !isCircle → Path.addRRect(RRect.fromLTRBAndCorners(...))
                  ├─ 2. canvas.save()
                  ├─ 3. canvas.clipPath(clipPath)
                  ├─ 4. isCoverSrc? → (不缩放) : canvas.scale(sx, sy)
                  ├─ 5. canvas.drawImageRect(sourceImage, src, dst)
                  ├─ 6. maskColor != transparent → canvas.drawPath(clipPath, maskPaint)
                  ├─ 7. canvas.restore()
                  └─ 8. drawBorders()
                      ├─ isCircle + borderWidth>0 → canvas.drawCircle(outer)
                      ├─ isCircle + innerBorderWidth>0 → canvas.drawCircle(inner)
                      └─ !isCircle + borderWidth>0 → canvas.drawRRect(borderRRect)
```

### 7.2 重绘触发

```
用户代码 setState: isCircle = true
  → build() → CustomPaint 接收新的 NiceImageViewPainter
    → shouldRepaint(oldPainter) 比较 16 个字段
      → 任一变化 → return true → paint() 重新执行
```

---

## 8. 错误处理规格

| 场景 | 处理方式 |
|------|---------|
| `image` 为 null | `CustomPainter.paint()` 直接 return，不渲染任何内容，不崩溃 |
| 图片加载失败 | `ImageStreamListener.onError` 回调 → `debugPrint` 输出日志，组件保持空白 |
| `width` / `height` 为 0 或负 | `SizedBox` 将尺寸约束传给 `CustomPaint`，`paint()` 在 0 尺寸 Canvas 上执行（无可见输出），不崩溃 |
| `borderWidth` 为负 | `Paint.strokeWidth` 接收负值会绘制异常线条，但组件不崩溃。建议调用方使用非负数 |
| 极端圆角值（超过矩形宽高） | `RRect.fromLTRBAndCorners` 自动钳制圆角值，不会超出边界 |
| `maskColor` 的 alpha 为 0 | `paint()` 中判断 `maskColor.a > 0` 跳过遮罩绘制 |

---

## 9. 初始化与生命周期

### 9.1 初始化流程

组件通过 `StatefulWidget` 标准生命周期进行初始化：

1. `initState()`：调用 `_resolveImage()` 注册 `ImageStreamListener`
2. `didChangeDependencies()`：重新解析图片（处理 `ImageConfiguration` 变更）
3. `didUpdateWidget(oldWidget)`：图片 `ImageProvider` 引用变化时重新解析

无需显式初始化方法。

### 9.2 资源管理

- `ImageStream`：在 `_clearImage()` 中调用 `removeListener()`，`dispose()` 中调用 `_clearImage()` 确保释放
- `CustomPainter`：由 Flutter Framework 管理生命周期，`paint()` 方法内无资源分配
- `Path` / `Paint` / `Canvas`：由 CustomPainter 传入，无需手动释放

### 9.3 状态边界

| 场景 | 行为 |
|------|------|
| 未设置任何属性（默认构造） | 空白组件（`image == null`），不渲染 |
| 重复调用 setState | `shouldRepaint()` 精确比较避免无效重绘 |
| `isCircle=true` + 设置圆角 | 圆角值被存储但 `paint()` 内优先使用圆形路径，圆角不生效（符合设计） |
| `isCircle=false` + 设置 `innerBorderWidth` | Builder 中 `effectiveInnerBorder = 0`，内边框不生效（符合设计） |
| 组件从 Widget 树中移除 | `dispose()` → `_clearImage()` → `ImageStream.removeListener()` |

---

## 10. 非功能性需求

### 10.1 线程/并发要求

- 所有 Flutter 框架代码在 UI 线程执行
- `CustomPainter.paint()` 在 UI 线程的 raster 阶段同步执行
- `ImageProvider.resolve()` 在后台 IO 线程加载图片，完成后回到 UI 线程回调
- 无显式多线程操作

### 10.2 性能约束

| 指标 | 目标值 | 验证方式 |
|------|--------|---------|
| `paint()` 单帧执行时间 | ≤ 2ms（60fps 预算 16ms 内的绘制部分） | Flutter DevTools Performance 面板 |
| `shouldRepaint()` 比较开销 | ≤ O(n) 字段数（16） | 代码审查 — 仅做引用/值相等比较 |
| 内存占用 | 组件实例 + 图片纹理 < 10MB | DevTools Memory 面板 |

### 10.3 数据持久化

本组件不涉及数据持久化。

### 10.4 兼容性矩阵

| 平台 | 最低版本 | Flutter SDK | 已知限制 |
|------|---------|------------|---------|
| Android | API 21 (Android 5.0) | Flutter ≥3.10 | 无 |
| iOS | 12.0 | Flutter ≥3.10 | 无 |
| **OHOS** | **API 12** | **Flutter OHOS ≥3.32.4** | **HAP 编译通过，待真机验证** |
| Web | — | Flutter ≥3.10 | CanvasKit/Skia 渲染，clipPath 等效 |
| Windows | Windows 10+ | Flutter ≥3.10 | 无 |
| macOS | 10.15+ | Flutter ≥3.10 | 无 |
| Linux | — | Flutter ≥3.10 | 无 |

### 10.5 安全与隐私

本组件为纯 UI 渲染组件：
- 不访问网络
- 不读写本地文件
- 不收集用户数据
- 不调用任何受权限保护的系统 API

---

## 11. 适配要点提示和平台差异对照

### 11.1 交叉验证问题

> nice_image_view 是从 Android 原生 View 库完整移植为 Flutter pure_dart 插件的新实现。源头代码（NiceImageView.java）和 Dart 实现是 **端到端等价重写** 关系，不存在 Dart↔Android↔iOS 三端交叉验证问题。

### 11.2 Android 原始实现 → Flutter 等价映射

| Android 原始 API (NiceImageView.java) | Flutter 等价实现 | 说明 |
|---------------------------------------|-----------------|------|
| `PorterDuff.Mode.DST_IN` (API ≤ 27) | `canvas.clipPath()` | **改进** — Flutter 原生裁剪路径，无需混合模式 |
| `PorterDuff.Mode.DST_OUT` + `Path.Op.DIFFERENCE` (API > 27) | `canvas.clipPath()` | **规避** — Flutter 不需要 DIFFERENCE 操作 |
| `Path.addCircle(cx, cy, radius, CCW)` | `Path.addOval(Rect.fromCircle(...))` | 直接等价 |
| `Path.addRoundRect(RectF, radii[], CCW)` | `Path.addRRect(RRect.fromLTRBAndCorners(...))` | 直接等价 |
| `Canvas.saveLayer(rect, null, ALL_SAVE_FLAG)` | `canvas.save()` + `canvas.clipPath()` + `canvas.restore()` | 等价模式 |
| `canvas.scale(sx, sy, cx, cy)` | `canvas.translate() → scale() → translate()` | 等价（Flutter 无带中心点的 scale） |
| `Utils.dp2px(context, dip)` | 不需要 | Flutter 天然逻辑像素（vp） |
| `invalidate()` | `shouldRepaint()` 返回 true | 响应式重绘 |
| `TypedArray.obtainStyledAttributes()` | Dart 构造函数命名参数 + 默认值 | 框架模式差异 |
| `Paint.setAntiAlias(true)` | `Paint()..isAntiAlias = true` | 直接等价 |
| `Paint.setStyle(FILL/STROKE)` | `Paint()..style = PaintingStyle.fill/stroke` | 直接等价 |

### 11.3 平台差异对照

| 行为 | Flutter 实现 | 原始 Android | 差异说明 |
|------|-------------|-------------|---------|
| 图片加载 | `ImageProvider.resolve()` 异步 | `AppCompatImageView.setImageResource()` | Flutter 异步模式，需监听 stream |
| 圆角路径构建 | `RRect.fromLTRBAndCorners` | `Path.addRoundRect(RectF, float[])` | 接口不同，效果等价 |
| 圆形路径构建 | `Path.addOval` | `Path.addCircle` | 接口不同，效果等价 |
| 缩放中心点 | `translate → scale → translate` 三明治 | `scale(sx, sy, cx, cy)` | 等价组合 |
| 单位系统 | 逻辑像素（lp） | dp → px 转换 | Flutter 更简洁 |
| 裁切方案 | `canvas.clipPath()` | PorterDuff xfermode 混合模式 | Flutter 方案更简洁 |

---

## 12. 完整性自检清单

### 12.1 鸿蒙适配契约覆盖率（硬门槛：100%）

> nice_image_view 为 pure_dart 插件，不使用 MethodChannel / EventChannel / PlatformView / FFI。适配契约定义为「Flutter 公开 API 参数 → OHOS Canvas 兼容性」。

| 契约类型 | 扫描总数 | PRD 列出数 | 覆盖率 | 状态 |
|---------|---------|-----------|-------|------|
| 构造函数参数 | 16 | 16 | 100% | ✅ |
| 功能模块 | 6 | 6 | 100% | ✅ |
| **合计** | **16** | **16** | **100%** | ✅ |

### 12.2 Dart 公开 API 覆盖率（诊断信息）

| 类别 | 扫描总数 | PRD 列出 | 覆盖率 |
|------|---------|---------|-------|
| 公开类 | 1 (NiceImageView) | 1 | 100% |
| 构造函数参数 | 16 | 16 | 100% |
| 公开枚举 | 0 | 0 | N/A |
| 顶级函数 | 0 | 0 | N/A |
| typedef | 0 | 0 | N/A |
| 顶层常量 | 0 | 0 | N/A |
| **合计（核心）** | **16** | **16** | **100%** |

### 12.3 API 与功能模块双向关联（诊断信息）

| 校验项 | 覆盖率 |
|--------|-------|
| API → 功能（已归属功能模块的 API 数 / PRD 列出 API 总数） | 16/16 = 100% |
| 功能 → API（至少含 1 个 API 的功能模块数 / 功能模块总数） | 6/6 = 100% |

### 12.4 交叉验证问题计数

| 问题类型 | 数量 | 处理 |
|---------|------|------|
| Dart-only 方法 | 0 | N/A（新实现，端到端重写） |
| Native-only 方法 | 0 | N/A（无原生代码） |
| 方法名不匹配 | 0 | N/A |
| README 功能缺口 | 0 | 已验证 |

---

## 附录 A：源文件清单

| 文件 | 行数 | 说明 |
|------|------|------|
| `lib/nice_image_view.dart` | 6 | 库入口，导出 `NiceImageView` |
| `lib/src/nice_image_view.dart` | 172 | `NiceImageView` StatefulWidget + ImageProvider 解析 |
| `lib/src/nice_image_view_painter.dart` | 192 | `NiceImageViewPainter` CustomPainter，Android onDraw() 的像素级移植 |
| `test/nice_image_view_test.dart` | 280 | 21 个 widget/unit 测试 |
| `example/lib/main.dart` | ~230 | 交互式 Demo（中文 UI + 复制日志） |
| `pubspec.yaml` | 22 | Flutter pure_dart 包配置 |

## 附录 B：默认值速查表

| 参数 | 默认值 | 与 Android 原始默认值对比 |
|------|--------|-------------------------|
| `isCircle` | `false` | ✅ 一致 |
| `isCoverSrc` | `false` | ✅ 一致 |
| `cornerRadius` | `0` | ✅ 一致 |
| `cornerTopLeftRadius` | `0` | ✅ 一致 |
| `cornerTopRightRadius` | `0` | ✅ 一致 |
| `cornerBottomLeftRadius` | `0` | ✅ 一致 |
| `cornerBottomRightRadius` | `0` | ✅ 一致 |
| `borderWidth` | `0` | ✅ 一致 |
| `borderColor` | `Colors.white` | ✅ 一致 (#FFFFFF) |
| `innerBorderWidth` | `0` | ✅ 一致 |
| `innerBorderColor` | `Colors.white` | ✅ 一致 (#FFFFFF) |
| `maskColor` | `Colors.transparent` | ✅ 一致（0 = 不绘制） |
| `image` | `null` | — Flutter 新增 |
| `width` | `null` | — Flutter 新增 |
| `height` | `null` | — Flutter 新增 |
| `fit` | `null` (= BoxFit.cover) | — Flutter 新增 |
