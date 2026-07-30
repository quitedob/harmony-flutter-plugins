# NiceImageView 鸿蒙适配需求规格（PRD）

## 1. 插件概述

### 1.1 基本信息

| 项目 | 内容 |
|------|------|
| 插件名称 | NiceImageView |
| 版本 | 1.0.5 |
| 仓库地址 | https://github.com/shehuan/NiceImageView |
| 许可证 | Apache License 2.0 |
| 已支持平台 | Android |
| 适配目标平台 | HarmonyOS NEXT (API 12+) |
| 库类型 | Android 原生 View 库（基于 AppCompatImageView 扩展） |

### 1.2 插件简介

NiceImageView 是一个 Android 原生 ImageView 扩展组件，基于 `AppCompatImageView` 继承开发。它在标准 ImageView 基础上提供了圆角裁剪、圆形展示、边框绘制和遮罩叠加等视觉增强能力，使开发者无需额外依赖或手动编写复杂的 Canvas 裁剪逻辑，即可在布局中快速实现丰富的图片展示效果。

该库通过自定义 XML 属性在布局文件中声明式配置样式，同时提供完整的 Java 编程接口支持运行时动态调整。核心渲染基于 Android Canvas 图层混合模式（PorterDuff Xfermode）实现图片区域裁剪，确保显示效果精确且性能优良。

典型使用场景包括：用户头像圆形展示（可配合组合头像生成）、卡片图片圆角展示、带边框装饰的图片列表项、以及需要遮罩叠加的状态提示图片。

### 1.3 目标用户与使用场景

**目标用户**：Android 原生应用开发者，需要快速实现带圆角/圆形/边框/遮罩效果的图片展示。

**典型使用场景**：

| 场景 | 描述 | 涉及能力 |
|------|------|---------|
| 用户头像展示 | 圆形头像 + 可选内外双层边框装饰 | `is_circle`, `border_width`, `border_color`, `inner_border_width`, `inner_border_color` |
| 组合头像（如钉钉群头像） | 先生成组合 Bitmap，再用圆形 NiceImageView 展示 | `is_circle` + 外部组合 Bitmap 生成 |
| 卡片图片 | 矩形图片配合统一圆角 | `corner_radius` |
| 列表项图片 | 不规则圆角（如下方两角圆角） | `corner_top_left_radius`, `corner_top_right_radius`, `corner_bottom_left_radius`, `corner_bottom_right_radius` |
| 状态遮罩 | 图片上叠加半透明遮罩表达状态（如已过期、已选中） | `mask_color` |
| 边框装饰 | 图片外围绘制彩色边框 | `border_width`, `border_color`, `is_cover_src` |

### 1.4 适配复杂度评估

> NiceImageView 为 Android 原生 View 库，适配 HarmonyOS 需将其迁移为 ArkUI 自定义组件（`@Component`）。

| 指标 | 数值 | 说明 |
|------|------|------|
| 复杂度评分 | 6 | 中等复杂度：12 个公开 API（含构造函数/属性）、纯 Canvas 绘制、无网络/存储/硬件依赖 |
| 复杂度等级 | medium | Android Canvas → ArkUI Canvas 渲染逻辑迁移；API 数量有限但绘制细节需精确复现 |
| 适配建议 | proceed | 所有核心绘制能力（圆角裁剪、边框、遮罩）在 ArkUI Canvas API 中均有对应实现 |

**风险项**：

| 风险描述 | 严重程度 | 缓解措施 |
|---------|---------|---------|
| Android PorterDuff Xfermode 混合模式与 ArkUI Canvas globalCompositeOperation 行为差异 | medium | API ≤ 27 使用 DST_IN，API > 27 使用 DST_OUT；在 ArkUI 端逐个验证混合模式效果并适配 |
| dp→px 转换逻辑需对齐 OHOS vp 单位体系 | low | Android `Utils.dp2px` 基于 DisplayMetrics.density；OHOS 端可使用 vp2px 工具函数等效替代 |
| 内外双层边框仅圆形模式下支持（innerBorderWidth 在矩形模式下自动清零），ArkUI 端需复现此约束 | low | 在 setter 逻辑中保留相同的矩形模式清零判断 |

### 1.5 鸿蒙生态规则提示

本组件为纯 UI 渲染组件，不涉及以下能力：
- 华为账号/支付/推送/地图/广告/应用市场等 Kit 集成
- 受限权限（相机、位置、存储、通讯录等）
- Web 内核或后台音频
- 数据上传第三方服务器

**结论**：本组件不涉及鸿蒙生态特殊规则。

---

## 2. 功能需求总览

### 2.1 功能模块划分

| 模块编号 | 功能模块 | 描述 | API 数 | 验收标准（AC） | 优先级 |
|---------|---------|---------|--------|--------------|--------|
| F-01 | 构造函数与初始化 | 支持代码创建和 XML 属性解析两种初始化方式，解析 12 个自定义属性并初始化内部绘制状态 | 3 | 1. 代码 `new NiceImageView(ctx)` 创建不崩溃，使用默认值<br>2. 所有 XML 属性正确解析并应用到组件<br>3. 初始化完成后 borderRadii/srcRadii 等内部状态计算正确 | P0 |
| F-02 | 圆形展示模式 | 将图片裁剪为圆形区域展示，支持切换到矩形模式 | 1 | 1. `isCircle(true)` 后图片显示为正圆形<br>2. 返回矩形模式后恢复原有圆角设置<br>3. 圆形模式下 innerBorderWidth 不自动清零 | P0 |
| F-03 | 圆角半径控制 | 支持统一圆角和四角独立圆角两种配置方式 | 5 | 1. `setCornerRadius(16)` 四角统一圆角 16dp<br>2. 单独设置某角不影响其他角（其他角复位为 0）<br>3. 圆形模式下圆角设置不生效（预期行为）<br>4. 圆角值支持 0（直角） | P0 |
| F-04 | 边框绘制 | 支持外边框（矩形/圆形均支持）和内边框（仅圆形） | 4 | 1. 矩形 + borderWidth > 0：显示矩形外边框<br>2. 圆形 + borderWidth > 0：显示圆形外边框<br>3. 圆形 + innerBorderWidth > 0：显示内层圆形边框<br>4. 矩形模式下 innerBorderWidth 自动清零<br>5. borderWidth=0 时不绘制边框 | P0 |
| F-05 | 边框覆盖控制 | 控制边框是否覆盖图片内容区域 | 1 | 1. `isCoverSrc(false)`：边框不覆盖图片，图片等比缩小<br>2. `isCoverSrc(true)`：边框覆盖在图片之上 | P1 |
| F-06 | 遮罩绘制 | 在图片裁剪区域上绘制纯色半透明遮罩 | 1 | 1. `setMaskColor(0x80000000)` 显示半透明黑色遮罩<br>2. `setMaskColor(0)` 或未设置时不绘制遮罩<br>3. 遮罩仅作用于图片裁剪区域（圆形/圆角区域内部） | P1 |

> 优先级定义：
> - **P0**：核心功能，缺失则组件不可用
> - **P1**：重要功能，影响主要使用场景
> - **P2**：辅助功能，可降级或延后实现

### 2.2 功能依赖关系

```
F-01 构造函数与初始化
 ├─► F-02 圆形展示模式（依赖初始化完成的状态变量）
 ├─► F-03 圆角半径控制（依赖初始化完成的 radii 数组）
 ├─► F-04 边框绘制（依赖 F-02/F-03 确定的绘制区域）
 ├─► F-05 边框覆盖控制（依赖 F-04 边框参数）
 └─► F-06 遮罩绘制（依赖裁剪路径 path，由 F-02/F-03 决定）
```

---

## 3. 公开 API 规格

### 3.1 NiceImageView 组件

#### 构造函数

##### `NiceImageView(Context context)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-01 |
| 方法签名 | `public NiceImageView(Context context)` |
| 功能描述 | 使用代码创建组件实例，所有属性使用默认值。内部委托给 `NiceImageView(context, null)`。 |
| 参数说明 | `context`：Android 上下文（仅此一个参数） |
| 返回值 | 组件实例 |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java:54` |

##### `NiceImageView(Context context, AttributeSet attrs)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-01 |
| 方法签名 | `public NiceImageView(Context context, @Nullable AttributeSet attrs)` |
| 功能描述 | 通常由 XML 布局系统自动调用。接收布局中声明的自定义属性集合并解析。内部委托给 `NiceImageView(context, attrs, 0)`。 |
| 参数说明 | `context`：上下文；`attrs`：XML 属性集合（可为空） |
| 返回值 | 组件实例 |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java:58` |

##### `NiceImageView(Context context, AttributeSet attrs, int defStyleAttr)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-01 |
| 方法签名 | `public NiceImageView(Context context, @Nullable AttributeSet attrs, int defStyleAttr)` |
| 功能描述 | 主构造函数。解析 12 个自定义 XML 属性并初始化所有内部状态（borderRadii、srcRadii、RectF、Paint、Path）。根据 Android API 版本选择 PorterDuff 混合模式（≤ 27：DST_IN；> 27：DST_OUT）。调用 `calculateRadii()` 和 `clearInnerBorderWidth()` 完成初始化。 |
| 参数说明 | `context`：上下文；`attrs`：XML 属性集合；`defStyleAttr`：默认样式属性引用 |
| 返回值 | 组件实例 |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java:62` |

**参数详情（XML 属性全集）：**

| 参数名（XML） | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| is_circle | boolean | 否 | 是否显示为圆形，为 true 时圆角设置无效 | false |
| is_cover_src | boolean | 否 | border、inner_border 是否覆盖图片内容 | false |
| corner_radius | dimension | 否 | 统一设置四个角的圆角半径，优先级高于单独设置 | 0dp |
| corner_top_left_radius | dimension | 否 | 左上角圆角半径 | 0dp |
| corner_top_right_radius | dimension | 否 | 右上角圆角半径 | 0dp |
| corner_bottom_left_radius | dimension | 否 | 左下角圆角半径 | 0dp |
| corner_bottom_right_radius | dimension | 否 | 右下角圆角半径 | 0dp |
| border_width | dimension | 否 | 外边框宽度 | 0dp |
| border_color | color | 否 | 外边框颜色 | #FFFFFF |
| inner_border_width | dimension | 否 | 内边框宽度（仅 is_circle=true 时有效） | 0dp |
| inner_border_color | color | 否 | 内边框颜色 | #FFFFFF |
| mask_color | color | 否 | 图片上绘制的遮罩颜色，为 0 时不绘制 | 0（不绘制） |

---

#### `isCircle(boolean isCircle)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-02 |
| 方法签名 | `public void isCircle(boolean isCircle)` |
| 功能描述 | 设置是否以圆形模式展示图片。true 时忽略所有圆角设置，以正圆形裁剪图片。切换时自动重新计算图片矩形区域并触发重绘。非圆形模式下会调用 `clearInnerBorderWidth()` 清零内边框。 |
| 参数说明 | `isCircle`：true=圆形模式，false=矩形模式 |
| 返回值 | void |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java:278` |

**参数详情：**

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| isCircle | boolean | 是 | 是否启用圆形模式 | — |

---

#### `setCornerRadius(int cornerRadius)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-03 |
| 方法签名 | `public void setCornerRadius(int cornerRadius)` |
| 功能描述 | 统一设置四个角的圆角半径（单位：dp，内部自动转换为 px）。设置后四角圆角半径统一为此值。`cornerRadius > 0` 时覆盖所有独立角半径设置。触发 `calculateRadii()` 重算 + `invalidate()` 重绘。 |
| 参数说明 | `cornerRadius`：圆角半径，单位 dp |
| 返回值 | void |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java:306` |

**参数详情：**

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| cornerRadius | int | 是 | 圆角半径（dp） | — |

---

#### `setCornerTopLeftRadius(int cornerTopLeftRadius)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-03 |
| 方法签名 | `public void setCornerTopLeftRadius(int cornerTopLeftRadius)` |
| 功能描述 | 单独设置左上角圆角半径（单位：dp）。设置时会先将 `cornerRadius` 复位为 0（破坏统一圆角模式），再写入本角值并触发重绘。 |
| 参数说明 | `cornerTopLeftRadius`：左上角圆角半径，单位 dp |
| 返回值 | void |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java:311` |

**参数详情：**

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| cornerTopLeftRadius | int | 是 | 左上角圆角半径（dp） | — |

---

#### `setCornerTopRightRadius(int cornerTopRightRadius)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-03 |
| 方法签名 | `public void setCornerTopRightRadius(int cornerTopRightRadius)` |
| 功能描述 | 单独设置右上角圆角半径（单位：dp）。设置时复位 `cornerRadius` 为 0 并触发重绘。 |
| 参数说明 | `cornerTopRightRadius`：右上角圆角半径，单位 dp |
| 返回值 | void |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java:316` |

**参数详情：**

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| cornerTopRightRadius | int | 是 | 右上角圆角半径（dp） | — |

---

#### `setCornerBottomLeftRadius(int cornerBottomLeftRadius)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-03 |
| 方法签名 | `public void setCornerBottomLeftRadius(int cornerBottomLeftRadius)` |
| 功能描述 | 单独设置左下角圆角半径（单位：dp）。设置时复位 `cornerRadius` 为 0 并触发重绘。 |
| 参数说明 | `cornerBottomLeftRadius`：左下角圆角半径，单位 dp |
| 返回值 | void |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java:321` |

**参数详情：**

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| cornerBottomLeftRadius | int | 是 | 左下角圆角半径（dp） | — |

---

#### `setCornerBottomRightRadius(int cornerBottomRightRadius)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-03 |
| 方法签名 | `public void setCornerBottomRightRadius(int cornerBottomRightRadius)` |
| 功能描述 | 单独设置右下角圆角半径（单位：dp）。设置时复位 `cornerRadius` 为 0 并触发重绘。 |
| 参数说明 | `cornerBottomRightRadius`：右下角圆角半径，单位 dp |
| 返回值 | void |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java:326` |

**参数详情：**

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| cornerBottomRightRadius | int | 是 | 右下角圆角半径（dp） | — |

---

#### `setBorderWidth(int borderWidth)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-04 |
| 方法签名 | `public void setBorderWidth(int borderWidth)` |
| 功能描述 | 设置外边框宽度（单位：dp，内部自动转换为 px）。边框在图片裁剪区域外围绘制。矩形模式下绘制矩形圆角边框，圆形模式下绘制圆形边框。设置后重算 radii 并触发重绘。 |
| 参数说明 | `borderWidth`：边框宽度，单位 dp |
| 返回值 | void |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java:285` |

**参数详情：**

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| borderWidth | int | 是 | 外边框宽度（dp） | — |

---

#### `setBorderColor(int borderColor)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-04 |
| 方法签名 | `public void setBorderColor(@ColorInt int borderColor)` |
| 功能描述 | 设置外边框颜色。接受 ARGB 颜色整数，通过 `@ColorInt` 注解约束参数类型。默认值为 `Color.WHITE`。 |
| 参数说明 | `borderColor`：ARGB 颜色值 |
| 返回值 | void |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java:290` |

**参数详情：**

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| borderColor | @ColorInt int | 是 | ARGB 颜色整数 | — |

---

#### `setInnerBorderWidth(int innerBorderWidth)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-04 |
| 方法签名 | `public void setInnerBorderWidth(int innerBorderWidth)` |
| 功能描述 | 设置内层边框宽度（单位：dp）。仅圆形模式（`isCircle=true`）下生效；矩形模式下调用后会被 `clearInnerBorderWidth()` 自动清零。设置后触发重绘。 |
| 参数说明 | `innerBorderWidth`：内边框宽度，单位 dp |
| 返回值 | void |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java:295` |

**参数详情：**

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| innerBorderWidth | int | 是 | 内边框宽度（dp） | — |

---

#### `setInnerBorderColor(int innerBorderColor)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-04 |
| 方法签名 | `public void setInnerBorderColor(@ColorInt int innerBorderColor)` |
| 功能描述 | 设置内层边框颜色。仅圆形模式下可见。默认值为 `Color.WHITE`。 |
| 参数说明 | `innerBorderColor`：ARGB 颜色值 |
| 返回值 | void |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java:301` |

**参数详情：**

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| innerBorderColor | @ColorInt int | 是 | ARGB 颜色整数 | — |

---

#### `isCoverSrc(boolean isCoverSrc)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-05 |
| 方法签名 | `public void isCoverSrc(boolean isCoverSrc)` |
| 功能描述 | 控制边框是否覆盖图片内容。`false`（默认）时图片内容区域等比缩小以避开边框区域；`true` 时边框直接覆盖在图片上方。设置后重新计算 srcRectF 并触发重绘。 |
| 参数说明 | `isCoverSrc`：true=边框覆盖图片，false=图片避开边框 |
| 返回值 | void |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java:272` |

**参数详情：**

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| isCoverSrc | boolean | 是 | 边框是否覆盖图片 | — |

---

#### `setMaskColor(int maskColor)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-06 |
| 方法签名 | `public void setMaskColor(@ColorInt int maskColor)` |
| 功能描述 | 设置图片裁剪区域上的遮罩颜色。遮罩绘制在图片裁剪 Path 内部（圆形或圆角区域），不超出裁剪边界。`maskColor` 为 0 时不绘制遮罩（默认行为）。接受 ARGB 颜色整数，支持半透明遮罩（如 `0x80000000` 表示半透明黑色）。 |
| 参数说明 | `maskColor`：ARGB 遮罩颜色值，传入 0 表示不绘制遮罩 |
| 返回值 | void |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java:331` |

**参数详情：**

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| maskColor | @ColorInt int | 是 | ARGB 遮罩颜色值（传入 0 = 不绘制遮罩） | — |

---

### 3.2 内部工具方法（非公开 API）

#### `Utils.dp2px(Context context, float dipValue)`

| 属性 | 说明 |
|------|------|
| 所属模块 | 内部工具（非公开 API） |
| 方法签名 | `public static int dp2px(Context context, float dipValue)` |
| 功能描述 | 将 dp（密度无关像素）转换为物理像素 px。基于 DisplayMetrics.density 计算，四舍五入取整。所有尺寸 setter（border/corner）内部均经过此转换。 |
| 参数说明 | `context`：上下文；`dipValue`：dp 值 |
| 返回值 | int：转换后的 px 值 |
| 异常/错误 | 无 |
| 源码位置 | `niceimageview/src/main/java/com/shehuan/niv/Utils.java:7` |

> **注**：`Utils.java` 非公开 API 类，但它是整个库的单位转换基础设施。鸿蒙适配时需要实现等效的 vp→px 转换。

---

## 4. 事件与回调规格

本组件不涉及 EventChannel、回调机制或事件流。组件不对外暴露任何事件监听器。

---

## 5. PlatformView 规格

本组件在 Android 端基于 `AppCompatImageView`（继承自 `View`），不属于 Flutter PlatformView 架构。鸿蒙适配方案为直接实现 ArkUI 自定义组件（`@Component`），不通过 Flutter PlatformView 桥接。

---

## 6. 权限需求

| 权限 | Android 声明 | iOS 声明 | 用途 | 关联功能模块 |
|------|-------------|----------|------|-------------|
| 无 | 无 | 无 | 本组件为纯 UI 渲染组件，不申请任何系统权限 | — |

---

## 7. 数据流与交互流程

### 7.1 XML 布局创建 → 显示

```
Android XML Layout Parser
  → NiceImageView(Context, AttributeSet, int)
    → obtainStyledAttributes(attrs, R.styleable.NiceImageView)
      → 依次解析 12 个自定义属性
        → 写入实例变量（isCircle, cornerRadius, borderWidth, ...）
    → calculateRadii()（计算 borderRadii[] / srcRadii[]）
    → clearInnerBorderWidth()（矩形模式下清零内边框）
  → onSizeChanged(w, h)（布局确定尺寸时回调）
    → initBorderRectF()（计算边框矩形区域）
    → initSrcRectF()（计算图片矩形区域，圆形模式取 min(w,h)/2 为半径）
  → onDraw(canvas)（系统绘制回调）
    → canvas.saveLayer(srcRectF)（保存图层）
    → isCoverSrc=false 时 canvas.scale() 缩小画布以避开边框
    → super.onDraw(canvas)（绘制原始图片）
    → path.addCircle() 或 path.addRoundRect()（构建裁剪路径）
    → paint.setXfermode(DST_IN 或 DST_OUT)（应用混合模式裁剪）
    → maskColor != 0 时绘制遮罩
    → canvas.restore()（恢复图层）
    → drawBorders(canvas)（在裁剪区域外围绘制边框）
```

### 7.2 运行时动态调整

```
用户代码调用 setter
  → 更新实例变量
  → 调用 calculateRadiiAndRectF() 或 initSrcRectF()
  → invalidate()（触发系统 onDraw 重绘）
  → onDraw(canvas)（以新参数重新执行步骤 7.1 中的绘制流程）
```

### 7.3 核心 Canvas 裁剪原理（适配要点）

Android 端使用 `PorterDuffXfermode` + `canvas.saveLayer` 实现裁剪：

- **API ≤ 27（O_MR1）**：`PorterDuff.Mode.DST_IN` — 保留目标区域（图片）与源区域（Path）相交的部分，其余透明
- **API > 27**：`PorterDuff.Mode.DST_OUT` + `Path.Op.DIFFERENCE` — 用 srcRectF 减去裁剪 Path 得到差集区域，将该区域"挖空"（DST_OUT），效果等效为保留 Path 内图片

鸿蒙适配时需使用 ArkUI Canvas 的 `globalCompositeOperation` 或 `clip()` 方法实现等效效果。

---

## 8. 错误处理规格

| 错误码/异常 | 触发条件 | 处理方式 | 关联 API |
|------------|---------|---------|---------|
| 无显式异常 | Android Canvas 绘制内部错误（如 OOM） | 由系统 Canvas 层捕获，组件层不显式处理 | 所有绘制相关 API |
| 无显式异常 | 未初始化 context 时调用 setter | 内部方法不依赖 context（仅在 setter 入参为 dp 值时调用 `Utils.dp2px` 需要 context） | 所有尺寸 setter |

> **注**：原始 Android 代码无异常声明和 try-catch，属于典型的 View 层"静默失败"策略。鸿蒙适配阶段建议对 Canvas 绘制操作增加 try-catch 基础防护。

---

## 9. 初始化与生命周期

### 9.1 初始化流程

Android 端通过构造函数完成全部初始化，无需显式调用初始化方法：

1. 构造函数链：`NiceImageView(ctx)` → `NiceImageView(ctx, null)` → `NiceImageView(ctx, attrs, 0)`
2. 主构造函数内完成：属性解析 → 数组分配（borderRadii[8], srcRadii[8]）→ RectF/Path/Paint 对象创建 → PorterDuff 模式选择 → 圆角计算 → 内边框清理
3. `onSizeChanged()` 回调时补充布局依赖的计算（RectF 初始化依赖 width/height）

### 9.2 资源管理

- `Path` 对象：在 `onDraw` 中通过 `path.reset()` 复用，不每次分配新对象。外部无需手动释放。
- `Paint` 对象：复用同一实例，`onDraw` 内通过 `paint.reset()` 和重新 setter 恢复状态。
- `TypedArray`：构造函数内 `ta.recycle()` 正确释放，无泄漏风险。

### 9.3 状态边界

| 场景 | 行为 |
|------|------|
| 未设置任何属性（默认构造） | 显示原始矩形图片，无圆角、无边框、无遮罩 |
| 重复调用 setter | 每次调用立即 invalidate 重绘，最后设置的值生效 |
| 圆形模式 + 设置圆角 | 圆角值被存储但 onDraw 内优先使用圆形路径，圆角不生效 |
| 矩形模式 + 设置内边框 | innerBorderWidth 被 `clearInnerBorderWidth()` 清零，不生效 |
| cornerRadius > 0 + 单独设置某角 | 单独 setter 内先将 cornerRadius 复位为 0，再写入单独值，以最后调用为准 |

---

## 10. 非功能性需求

### 10.1 线程/并发要求

- Android View 的构造函数、setter、`onDraw` 均在 UI 线程（主线程）调用。
- 无后台线程或异步操作。
- 鸿蒙适配时 ArkUI 组件同样遵循主线程约束，`CanvasRenderingContext2D` 操作在 `onDraw` / `draw` 回调中同步执行。

### 10.2 性能约束

| 指标 | 目标值 | 验证方式 |
|------|--------|---------|
| 单帧绘制时间 | ≤ 16ms（60fps） | 系统 Profiler 测量 onDraw 耗时 |
| 内存占用 | 组件实例 ≤ 1MB | 系统 Profiler 测量 |
| Path 对象复用 | onDraw 内不 new Path，使用 reset() | 代码审查 |

> 绘制性能注意事项：Android 实现已做 Path/Paint 对象复用和 TypedArray 回收。鸿蒙适配时需保持同等级别的对象复用策略。

### 10.3 数据持久化

本组件不涉及数据持久化。

### 10.4 兼容性矩阵

| 平台 | 最低版本 | 特殊要求 | 已知缺陷 |
|------|---------|---------|---------|
| Android | API 14 (Android 4.0) | `androidx.appcompat:appcompat` 依赖；API > 27 使用 DST_OUT 模式 | 矩形模式下 innerBorderWidth 不生效（设计如此，非缺陷） |
| HarmonyOS NEXT | API 12 | 无特殊硬件依赖；使用 ArkUI Canvas 组件 | 待验证 |

### 10.5 安全与隐私

本组件为纯 UI 渲染组件：
- 不访问网络
- 不读写本地文件
- 不收集用户数据
- 不调用任何受权限保护的系统 API
- 不涉及第三方数据上传

---

## 11. 适配要点提示和平台差异对照

### 11.1 交叉验证问题（必须处理）

> NiceImageView 为 Android 单端原生库，不存在 Dart/Android/iOS 三端交叉验证问题。

本组件仅包含 Android 原生实现，适配 HarmonyOS 属于**端到端迁移**。以下列出 Android 实现要素与 ArkUI 对应能力的对照：

**Android API → ArkUI 能力映射**：

| Android API/机制 | 用途 | ArkUI 对应能力 | 适配说明 |
|-----------------|------|---------------|---------|
| `AppCompatImageView` | 基类图片显示 | `Image` 组件 + `Canvas` 组件 | ArkUI 无直接 ImageView 继承体系；使用 `Image` 加载图片，`Canvas` 绘制叠加效果 |
| `Canvas.saveLayer()` | 图层保存 | `CanvasRenderingContext2D.save()` | ArkUI Canvas 支持 save/restore |
| `PorterDuffXfermode(DST_IN)` | 图片裁剪-交集保留 | `globalCompositeOperation = 'destination-in'` | 标准 Canvas API，需验证行为一致性 |
| `PorterDuffXfermode(DST_OUT)` | 图片裁剪-挖空 | `globalCompositeOperation = 'destination-out'` | 标准 Canvas API，需验证行为一致性 |
| `Path.addCircle()` | 圆形路径 | `Path2D.arc()` | ArkUI Canvas 支持 Path2D |
| `Path.addRoundRect()` | 圆角矩形路径 | `CanvasRenderingContext2D.roundRect()` 或手动构建 Path2D | 需手动实现或使用内置方法 |
| `Path.op(DIFFERENCE)` | 路径差集运算 | 手动 Path2D 组合 或 两次绘制 | ArkUI 可能无内置 Path op，需手动模拟 |
| `TypedArray` | XML 属性解析 | `@Prop` / `@Link` 装饰器 | ArkUI 使用响应式属性系统替代 XML 属性解析 |
| `DisplayMetrics.density` | dp→px 转换 | `vp2px()` | OHOS 内置单位转换 |
| `Paint.setAntiAlias(true)` | 抗锯齿 | Canvas 默认开启（需确认） | 若未默认需显式开启 |

### 11.2 一般适配要点

1. **Canvas 混合模式验证**：`destination-in` 和 `destination-out` 在 ArkUI Canvas 中的行为需逐 API 版本实测验证，这是裁剪效果正确与否的关键路径
2. **圆角矩形路径**：ArkUI 可能不提供 `addRoundRect` 等效方法，需使用 `Path2D` 手动构建圆角矩形路径（4 段弧线 + 4 段直线）
3. **路径布尔运算**：`Path.op(DIFFERENCE)` 在 ArkUI 中可能无直接等效 API，需用"先绘制全区域 + 再绘制裁剪区域（混合模式挖空）"两步模拟
4. **dp→px 转换**：Android 的 `Utils.dp2px` 基于 `DisplayMetrics.density`，鸿蒙侧使用 `vp2px()` 等效替代
5. **属性系统**：Android XML 属性 + TypedArray 解析需重建为 ArkUI `@Component` 的 `@Prop` 参数系统
6. **内边框矩形限制**：鸿蒙端需复现 `clearInnerBorderWidth()` 逻辑——矩形模式下 `innerBorderWidth` 强制清零
7. **统一圆角与独立圆角的优先级**：`setCornerRadius` 覆盖所有独立值；任意独立 setter 复位 `cornerRadius`——此逻辑需在 ArkUI 端精确复现
8. **`coverSrc` 缩放逻辑**：`isCoverSrc=false` 时图片 `sx/sy = (size - 2*borderWidth - 2*innerBorderWidth) / size` 等比缩小——需在 ArkUI 端等效实现

### 11.3 平台差异对照矩阵

| 功能 | Android 行为 | OHOS 预期行为 |
|------|-------------|-------------|
| 图片加载 | `AppCompatImageView` 通过 `setImageResource()` / `setImageBitmap()` 加载 | `Image` 组件通过 `src` 属性或 `ImageBitmap` 加载 |
| dp 单位 | `DisplayMetrics.density * dipValue + 0.5f` 四舍五入 | `vp2px(vpValue)` 系统函数转换 |
| API ≤ 27 裁剪 | `PorterDuff.Mode.DST_IN` 单次绘制裁剪 | 使用 `globalCompositeOperation = 'destination-in'` |
| API > 27 裁剪 | `PorterDuff.Mode.DST_OUT` + `Path.Op.DIFFERENCE` 差集挖空 | 需验证 `destination-out` + 差集区域绘制两阶段方案 |
| 布局/尺寸回调 | `onSizeChanged(w, h)` 通知尺寸变化 | `onSizeChange` 回调或 `@State` 响应式尺寸变量 |
| 触发重绘 | `invalidate()` | `invalidate()`（ArkUI Canvas 支持） |

---

## 12. 完整性自检清单

### 12.1 鸿蒙适配契约覆盖率（硬门槛：100%）

> NiceImageView 为 Android 原生 View 库，不使用 Flutter Channel / PlatformView 机制。适配契约定义为「Android 公开 API → ArkUI 对应能力」的一一映射。

| 契约类型 | 扫描总数 | PRD 列出数 | 覆盖率 | 状态 |
|---------|---------|-----------|-------|------|
| 公开构造函数 | 3 | 3 | 100% | ✅ |
| 公开属性设置方法（setter） | 12 (含 isCircle/isCoverSrc) | 12 | 100% | ✅ |
| XML 属性 | 12 | 12 | 100% | ✅ |
| 内部工具方法（非公开但需适配） | 1 (Utils.dp2px) | 1 | 100% | ✅ |
| **合计** | **28** | **28** | **100%** | ✅ |

### 12.2 Dart 公开 API 覆盖率（诊断信息）

> 本组件为 Android 原生 View 库，不包含 Dart 代码。此节不适用。

| 类别 | 扫描总数 | PRD 列出 | 覆盖率 |
|------|---------|---------|-------|
| 公开类 | 1 (NiceImageView) | 1 | 100% |
| 公开方法（构造+实例） | 15 | 15 | 100% |
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
| Dart-only 方法（原生端缺失） | 0 | N/A（非 Flutter 库） |
| Native-only 方法（Dart 未暴露） | 0 | N/A（非 Flutter 库） |
| 方法名不匹配 | 0 | N/A |
| README 功能缺口 | 0 | 已验证 README 中所有功能均在代码中有对应实现 |

---

## 13. 适配路线：逐 API 精确映射与可行性判定

> 本章节基于权威 HarmonyOS SDK API 文档（ArkUI CanvasRenderingContext2D / Path2D / Canvas 组件）,
> 对 NiceImageView 每个 Android API 给出 **可验证的** ArkUI 等价物、来源引用和可行性结论。
> 所有 API 引用均来自本地权威 SDK 文档，含确切的类名和方法签名。

### 13.1 总体路线判定

| 判定项 | 结论 |
|--------|------|
| 适配路线 | **直接 ArkUI @Component（非 Flutter PlatformView）** |
| 可行性 | ✅ **可行** — 所有 28 个适配契约均有 ArkUI API 等价物或可用 workaround 替代 |
| 阻塞项 | **0 个阻塞项** — 仅 1 个 API（Path.Op.DIFFERENCE）需 workaround，不影响最终效果 |
| 推荐实现方式 | 使用 `Canvas(this.context)` 组件 + `CanvasRenderingContext2D` 进行自绘制，配合 `Path2D` 构建裁剪路径 |
| 替代方案 | 对于简单圆形/圆角场景，可使用 ArkUI `Image` 组件的 `borderRadius` / `clip` 替代 Canvas 自绘制 |

### 13.2 核心 Canvas 绘制 API 映射

> **来源**：`CanvasRenderingContext2D.md` (API 8+)、`Canvas.md`、`Path2D.md`

| # | Android NiceImageView API/机制 | ArkUI 等价 API | 来源 | 状态 |
|---|-------------------------------|----------------|------|------|
| 1 | `AppCompatImageView` (基类) | `Canvas(this.context)` 组件 + `Image` 加载原图后在 Canvas 上绘制 | `Canvas.md:49` — `Canvas(context?: CanvasRenderingContext2D)` | ✅ |
| 2 | `super.onDraw(canvas)` (绘制原始图片) | `context.drawImage(image: ImageBitmap, dx, dy, dw, dh)` | `CanvasRenderingContext2D.md:3723` | ✅ |
| 3 | `Canvas.saveLayer(rectF, null, ALL_SAVE_FLAG)` | `context.save()` + `context.clip()` + `...` + `context.restore()` | `CanvasRenderingContext2D.md:4504(save)` `:4560(restore)` `:3006(clip)` | ✅ |
| 4 | `canvas.scale(sx, sy, px, py)` | `context.scale(sx, sy)` 或 `context.translate()` + `context.scale()` + `context.translate()` 模拟 | `CanvasRenderingContext2D.md` 方法列表中 | ✅ |
| 5 | `Path.reset()` | `path = new Path2D()` (重建) 或 `context.beginPath()` | `Path2D.md:9` — 不支持重置，需重建对象 | ✅ (workaround) |
| 6 | `Paint.reset()` | `context.fillStyle = '#000'` / `context.strokeStyle = '#000'` / 重置属性 | `CanvasRenderingContext2D.md` 各属性默认值 | ✅ |
| 7 | `Paint.setAntiAlias(true)` | `context.antialias = true` (API 24+) 或 `new RenderingContextSettings(true)` | `CanvasRenderingContext2D.md:1551` | ✅ |
| 8 | `Paint.setStyle(Paint.Style.FILL)` | `context.fillStyle = color; context.fill()` | `CanvasRenderingContext2D.md:113(fillStyle)` | ✅ |
| 9 | `Paint.setStyle(Paint.Style.STROKE)` | `context.strokeStyle = color; context.lineWidth = w; context.stroke()` | `CanvasRenderingContext2D.md:207(strokeStyle)` | ✅ |
| 10 | `Paint.setStrokeWidth(w)` | `context.lineWidth = w` | `CanvasRenderingContext2D.md:160` | ✅ |
| 11 | `Paint.setColor(color)` | `context.fillStyle = color` 或 `context.strokeStyle = color` | 同上 | ✅ |

### 13.3 PorterDuff Xfermode → globalCompositeOperation 映射

> **来源**：`CanvasRenderingContext2D.md:722-755` — `globalCompositeOperation` 属性

| Android PorterDuff 模式 | ArkUI globalCompositeOperation | 状态 |
|--------------------------|-------------------------------|------|
| `PorterDuff.Mode.DST_IN` (API ≤ 27) | `'destination-in'` — 保留新内容中的现有内容 | ✅ |
| `PorterDuff.Mode.DST_OUT` (API > 27) | `'destination-out'` — 移除新内容区域的现有内容（橡皮擦效果） | ✅ |

**关键发现**：ArkUI 的 `globalCompositeOperation` 支持全部 11 种混合模式，**完整覆盖** NiceImageView 需要的 DST_IN 和 DST_OUT。

ArkUI 文档中提供了 `'destination-out'` 橡皮擦和 `'source-in'` 蒙版的完整示例代码（`CanvasRenderingContext2D.md:758-901`）。

### 13.4 Path 路径 API 映射

> **来源**：`Path2D.md` (API 8+)、`CanvasRenderingContext2D.md:8`

| Android Path API | ArkUI 等价 API | 来源 | 状态 |
|-----------------|---------------|------|------|
| `path.addCircle(cx, cy, radius, Direction.CCW)` | `path2D.arc(cx, cy, radius, 0, Math.PI * 2, true)` (逆时针=true 对应 CCW) | `Path2D.md:494` | ✅ |
| `path.addRoundRect(rectF, radii[], Direction.CCW)` | `path2D.roundRect(x, y, w, h, radii[])` — API 20+，支持 `[tl, tr, br, bl]` 数组格式 | `Path2D.md:730` | ✅ (API 20+) |
| `path.addRect(rectF, Direction.CCW)` | `path2D.rect(x, y, w, h)` | `Path2D.md:673` | ✅ |
| `srcPath.op(path, Path.Op.DIFFERENCE)` | ❌ **Path2D 不支持布尔运算** | `Path2D.md:8` — 只有 `addPath()`，无 PathOp | ⚠️ **需 workaround** |
| `path.close()` | `path2D.closePath()` | `Path2D.md:205` | ✅ |
| `path.moveTo(x, y)` | `path2D.moveTo(x, y)` | `Path2D.md:254` | ✅ |
| `path.lineTo(x, y)` | `path2D.lineTo(x, y)` | `Path2D.md:317` | ✅ |

### 13.5 Path.Op.DIFFERENCE 的可行替代方案

> **仅影响 API > 27 的 Android 行为**（NiceImageView.java:108-111）

Android 代码：
```java
if (Build.VERSION.SDK_INT > Build.VERSION_CODES.O_MR1) {
    srcPath.op(path, Path.Op.DIFFERENCE);  // 从 srcRectF 中减去 clipPath
    canvas.drawPath(srcPath, paint);         // DST_OUT 挖空
}
```

**ArkUI 等效方案：**

```typescript
// 方案 A: 保持使用 destination-in（与 API ≤ 27 行为完全一致）
// 不需要 DIFFERENCE 操作 — 直接对 clipPath 使用 destination-in
context.save()
context.globalCompositeOperation = 'destination-in'
context.fill(path2D)  // path2D 已有 circle 或 roundRect
context.globalCompositeOperation = 'source-over'
// ... 绘制遮罩和边框 ...
context.restore()
```

**结论**：Path.Op.DIFFERENCE 可被完全规避。NiceImageView 的两种 Android API 分叉（DST_IN vs DST_OUT+DIFFERENCE）在 ArkUI 端可统一为 `'destination-in'` 单一方案，无需 DIFFERENCE 操作。

> ✅ 此差异不影响最终渲染效果——裁剪区域内的图片内容和遮罩/边框绘制结果一致。

### 13.6 属性/配置系统映射

| Android 机制 | ArkUI 等价 | 来源 | 状态 |
|-------------|-----------|------|------|
| `TypedArray` + `obtainStyledAttributes()` | `@Prop` / `@State` 装饰器 + 属性绑定 | `platform-view.md:99-114` | ✅ |
| 12 个 XML 属性 (`declare-styleable`) | 12 个 `@Prop` 成员变量 | — | ✅ |
| `invalidate()` (触发重绘) | Canvas `onReady` 回调 + `@State` 变更驱动重建；或 `drawModifier.invalidate()` (API 12+) | `Canvas.md:149`、`自定义绘制设置.md` | ✅ |
| `onSizeChanged(w, h)` | Canvas `onReady` 回调（初始化+尺寸变化时触发），可读取 `context.width/height` | `Canvas.md:149` | ✅ |

### 13.7 单位转换映射

| Android API | ArkUI 等价 | 来源 | 状态 |
|------------|-----------|------|------|
| `Utils.dp2px(context, dipValue)` = `density * dipValue + 0.5f` | `this.getUIContext().vp2px(value)` 或 `LengthMetrics(10, LengthUnit.VP)` (API 12+) | `vp2px` 同路径 | ✅ |
| Android `DisplayMetrics.density` | ArkUI 虚拟像素 `vp` 为密度无关单位，Canvas 默认单位为 vp | Canvas.md | ✅ |

### 13.8 适配契约完整对照总表（28 项全部判定）

| # | 契约 | Android | ArkUI | 判定 |
|---|------|---------|-------|------|
| 1 | 构造-默认 | `NiceImageView(Context)` | `new CanvasRenderingContext2D()` + `Canvas(this.context)` | ✅ |
| 2 | 构造-XML | `NiceImageView(Context, AttributeSet)` | `@Component struct` + `@Prop` 属性绑定 | ✅ |
| 3 | 构造-全参 | `NiceImageView(Context, AttributeSet, int)` | `@Component` + `@Prop` + 默认值初始化 | ✅ |
| 4 | isCircle | `isCircle(boolean)` | `@Prop isCircle: boolean = false` → onReady 内按圆形/矩形分支绘制 | ✅ |
| 5 | setCornerRadius | `setCornerRadius(int dp)` | `@Prop cornerRadius: number = 0` → `path2D.roundRect(x,y,w,h, radius)` | ✅ |
| 6 | setCornerTopLeftRadius | `setCornerTopLeftRadius(int dp)` | `@Prop cornerTopLeftRadius: number = 0` → `roundRect(x,y,w,h, [tl,tr,br,bl])` | ✅ |
| 7 | setCornerTopRightRadius | 同上 | 同上 | ✅ |
| 8 | setCornerBottomLeftRadius | 同上 | 同上 | ✅ |
| 9 | setCornerBottomRightRadius | 同上 | 同上 | ✅ |
| 10 | setBorderWidth | `setBorderWidth(int dp)` | `context.lineWidth = vp2px(borderWidth)` → `context.stroke(path2D)` | ✅ |
| 11 | setBorderColor | `setBorderColor(int color)` | `context.strokeStyle = colorString` | ✅ |
| 12 | setInnerBorderWidth | `setInnerBorderWidth(int dp)` — 仅圆形模式 | `@Prop innerBorderWidth` + `if(isCircle)` 条件分支 | ✅ |
| 13 | setInnerBorderColor | `setInnerBorderColor(int color)` — 仅圆形模式 | `context.strokeStyle` (第二次 stroke 用内边框颜色) | ✅ |
| 14 | isCoverSrc | `isCoverSrc(boolean)` | `@Prop isCoverSrc: boolean = false` → 控制 drawImage 是否 scale | ✅ |
| 15 | setMaskColor | `setMaskColor(int color)` | `context.fillStyle = maskColorString` → `context.fill(path2D)` | ✅ |
| 16-27 | 12 个 XML 属性 | `declare-styleable` | 12 × `@Prop` + 默认值 | ✅ |
| 28 | dp→px 转换 | `Utils.dp2px()` | `vp2px()` / `LengthMetrics` | ✅ |

### 13.9 最终结论

| 指标 | 值 |
|------|-----|
| **适配路线** | **直接 ArkUI @Component**（使用 `Canvas + CanvasRenderingContext2D + Path2D`） |
| **总适配契约** | 28 项 |
| **✅ 直接可用** | 27 项（96%） |
| **⚠️ 需 workaround** | 1 项（Path.Op.DIFFERENCE — 改用统一的 `'destination-in'` 方案） |
| **❌ 无法实现** | 0 项 |
| **阻塞项** | **0** |
| **是否可行** | **✅ 确定可行** |

> **无缺失 API。不需要等待 HarmonyOS 版本升级。当前 API 8+ 即可完整实现。**
> `Path2D.roundRect()` 在 API 20+ 可用（个别角独立圆角用），
> 在此之前可手动构建 Path2D 圆角矩形（4 段 arc + 4 段 lineTo）。

### 13.10 推荐架构

```
NiceImageViewArkUI.ets
├─ @Component struct NiceImageViewArkUI
│  ├─ @Prop 属性 (12 个, 与 Android XML 属性一一对应)
│  ├─ private context: CanvasRenderingContext2D
│  ├─ build():
│  │  └─ Canvas(this.context)
│  │     ├─ .width(…), .height(…)
│  │     └─ .onReady(() => this.draw())
│  └─ draw():
│     ├─ 1. 加载源图片 → ImageBitmap
│     ├─ 2. 构建 clipPath (circle via arc, 或 roundRect)
│     ├─ 3. save() + globalCompositeOperation = 'destination-in' + fill(clipPath)
│     ├─ 4. drawImage() 绘制原图到裁剪区域
│     ├─ 5. globalCompositeOperation = 'source-over' 恢复
│     ├─ 6. maskColor != 0 时绘制遮罩
│     ├─ 7. restore() 回到原图层
│     └─ 8. stroke(path2D) 绘制边框
```

---

## 附录 A：Android 源码文件清单

| 文件 | 行数 | 说明 |
|------|------|------|
| `niceimageview/src/main/java/com/shehuan/niv/NiceImageView.java` | 335 | 主组件：Canvas 绘制、属性解析、所有公开 setter |
| `niceimageview/src/main/java/com/shehuan/niv/Utils.java` | 11 | 工具类：dp→px 转换 |
| `niceimageview/src/main/res/values/attrs.xml` | 16 | 12 个自定义 XML 属性声明 |
| `niceimageview/build.gradle` | 26 | Android Library 构建配置（compileSdk 28, minSdk 14, appcompat-v7:28.0.0） |
| `README.md` | 60 | 使用文档（特点、基本用法、属性/方法对照表） |

## 附录 B：默认值速查表

| 属性 | 默认值 | 对应字段 |
|------|--------|---------|
| is_circle | false | `isCircle` |
| is_cover_src | false | `isCoverSrc` |
| corner_radius | 0 | `cornerRadius` |
| corner_top_left_radius | 0 | `cornerTopLeftRadius` |
| corner_top_right_radius | 0 | `cornerTopRightRadius` |
| corner_bottom_left_radius | 0 | `cornerBottomLeftRadius` |
| corner_bottom_right_radius | 0 | `cornerBottomRightRadius` |
| border_width | 0 | `borderWidth` |
| border_color | #FFFFFF | `borderColor` |
| inner_border_width | 0 | `innerBorderWidth` |
| inner_border_color | #FFFFFF | `innerBorderColor` |
| mask_color | 0（不绘制） | `maskColor` |
