# UX 质量规则

适用阶段：Demo 编码与审查。

fix_demo_ui.py 覆盖范围：2-1 ~ 2-8（自动修复/检测）、1-1（自动检测，仅告警）、1-4（自动检测，仅告警）、1-7（自动检测，仅告警）、3-7（项目级检查：base/element/color.json 必需 name）、3-9（自动检测，仅告警：Web darkMode）、6-2（自动检测，仅告警：router.push 迁移）。其余检查项按下方「检测方法」列操作指引核对。

---

## 一、基础体验

### 1.1 组件位置错乱

布局单位使用不当会导致组件位置错乱。ArkUI 中禁止使用 `px`，推荐使用 `vp`（逻辑像素）、`%`（百分比）或 `layoutWeight`（权重）。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 1-1 | 布局禁止 px：`.width()`/`.height()`/`.margin()`/`.padding()`/`.borderRadius()` 不接受 `'Npx'`；字号禁止 px：`.fontSize()` 不接受 `'Npx'` | fix\_demo\_ui.py 自动检测（仅告警），或 grep `\.(width\|height\|margin\|padding\|borderRadius\|fontSize)\(\s*'\d+px'\s*\)` | px 改 vp 或 `%` |

### 1.2 内容截断

文字或按钮内容被截断会导致信息丢失。按钮文字必须完整可见，长文本需设置溢出处理。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 1-2 | 按钮文字完整：长文字用 `.width('100%')` 自适应或 `Button` 内 `Text` 换行（`.maxLines(2)`），禁止固定宽度截断 | grep 含 `Button(` 的文件，逐按钮检查宽度设置：若 Button 使用固定 `.width('Nvp')` 且文字 > 2 字，标记为截断风险 | 调整按钮宽度或文字换行 |
| 1-3 | 非按钮 `Text` 设置 `.maxLines()` + `.textOverflow(TextOverflow.Ellipsis)`，避免无提示截断 | grep `\bText\(` 检查每个 Text 是否有 `.maxLines` 和 `.textOverflow(TextOverflow.Ellipsis)` | 补充 maxLines + textOverflow |
| 1-4 | 多按钮布局用 `Flex({ wrap: FlexWrap.Wrap })`，每按钮 `.margin({ bottom: 6 })`，替代 Row 防溢出 | fix\_demo\_ui.py 自动检测（仅告警），或 grep `\bRow\b` 检查同文件是否有 `\bButton\b` | Row 改 Flex wrap |

### 1.3 比例失真

图片或视频组件在不同窗口尺寸下可能发生比例失真。参考官方 `aspectRatio` 属性（`aspectRatio = width / height`）控制缩放。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 1-5 | `Image`/`Video`/`XComponent` 组件设置 `aspectRatio` 固定宽高比，防分屏/悬浮窗下比例失真 | grep `\bImage\(`|\bVideo\(`|\bXComponent\(` 检查每个实例是否有 `.aspectRatio` | 添加 `.aspectRatio(宽/高)` |

### 1.4 内容出界

内容超出屏幕边界且不可滚动，用户无法查看完整信息。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 1-6 | 内容可能超一屏时最外层必须 `Scroll() > Column()`，禁止主容器硬编码高度，禁止 `Scroll` 内嵌 `Scroll` | grep `@Entry` 检查对应 struct 中 `build()` 是否有 `Scroll` 包裹 `Column`；若无，标记为截断风险 | 加 Scroll 包裹 |
| 1-7 | `@Entry` 组件含 `Column()` 但无 `Scroll` 包裹时告警 | fix\_demo\_ui.py 自动检测（仅告警），或 grep `@Entry` + `Column(` 而无 `Scroll` | 加 Scroll 包裹 |

---

## 二、视觉风格

### 2.1 色值/对比度

**核心原则**：使用 `$r()` 资源引用替代硬编码 hex 值或 colorMode 三元表达式。

#### 安全色对白名单

以下色对已在暗/亮模式下验证可读性：

| 用途 | 标准色值 | Token (亮→暗) | 对比度 (亮/暗) |
|------|---------|---------------|---------------|
| 主要文本 on 页面背景 | text\_primary on bg\_page | `#333333` → `#E5E5E5` on `#F1F3F5` → `#1A1A1A` | 8.6:1 / 10.3:1 |
| 主要文本 on 卡片背景 | text\_primary on bg\_card | `#333333` → `#E5E5E5` on `#FFFFFF` → `#2D2D2D` | 12.6:1 / 9.1:1 |
| 次要文本 on 卡片背景 | text\_secondary on bg\_card | `#666666` → `#999999` on `#FFFFFF` → `#2D2D2D` | 5.7:1 / 5.1:1 |
| 按钮文字 on 按钮背景 | — | `#FFFFFF` on `#007DFF` (不变) | 4.6:1 |

#### 禁止色对黑名单

以下组合**禁止出现**：

| 禁止组合 (hex/token) | 原因 |
|---------|------|
| `fontColor` 与 `backgroundColor` 相同 hex 值 | 文字完全不可见 |
| `'#333333'` (text\_primary) on `'#000000'` / 深色背景 | 对比度 < 3:1 |
| `'#666666'` (text\_secondary) on `'#000000'` / 深色背景 | 对比度约 2.6:1 |
| `'#999999'` (text\_tertiary) on `'#1A1A1A'` (bg\_page 暗) | 对比度约 2.2:1 |

#### Canvas 文字

`CanvasRenderingContext2D` 手绘文字同样受对比度约束。`fillStyle`/`strokeStyle` 必须使用 colorMode 感知色值，并在 `onColorModeChange()` 中触发重绘。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 2-1 | 无 `fontColor('#XXXXXX')` 硬编码 hex | grep `fontColor\('#[0-9A-Fa-f]` | 替换为 `$r('app.color.xxx')` |
| 2-2 | 无 `backgroundColor('#XXXXXX')` 硬编码 hex | grep `backgroundColor\('#[0-9A-Fa-f]` | 替换为 `$r('app.color.xxx')` |
| 2-3 | 无 `fillColor('#XXXXXX')` 硬编码 hex | grep `fillColor\('#[0-9A-Fa-f]` | 替换为 `$r('app.color.xxx')` |
| 2-4 | 无 `scrollBarColor('#XXXXXX')` 硬编码 hex | grep `scrollBarColor\('#[0-9A-Fa-f]` | 替换为 `$r('app.color.xxx')` |
| 2-5 | 无 `strokeStyle('#XXXXXX')` 硬编码 hex | grep `strokeStyle\('#[0-9A-Fa-f]` | 替换为 `$r('app.color.xxx')` |
| 2-6 | 无 `fillStyle('#XXXXXX')` 硬编码 hex | grep `fillStyle\('#[0-9A-Fa-f]` | 替换为 `$r('app.color.xxx')` |
| 2-7 | 无 `Color.White` 等枚举颜色 | grep `Color\.White\|Color\.Black` 等 | 替换为 `$r('app.color.xxx')` |
| 2-8 | `fontColor` 与 `backgroundColor` 不同色 | fix\_demo\_ui.py 自动检测（仅告警），或 grep 同一文件中 `fontColor` 与 `backgroundColor` 的 hex/枚举值，比对是否相同。**注意：自动检测仅覆盖 hex/枚举色值，`$r()` 资源引用的同色检测需核对白名单外组合** | 修改其一为不同色值 |
| 2-9 | Canvas `fillStyle` 色值在暗色模式下仍可见 | grep `CanvasRenderingContext2D\|context\.\(fillStyle\|strokeStyle\)\s*=` 检查赋值是否使用 COLOR\_CANVAS\_MAP 中的 dark/light 对，而非单一固定色值 | 使用 COLOR\_CANVAS\_MAP 中的 dark/light 对 |
| 2-10 | 按钮文字颜色与按钮背景色对比充分（白名单外组合需确认） | grep `\bButton\b` 附近的 `.fontColor` 和 `.backgroundColor`，核对色对是否在安全白名单内（见上方色对表） | 改用白名单内色对 |

### 2.2 字体/字号

参考官方系统设计 Token（`sys.float.ohos_id_text_size_*`）确保跨组件字号一致性。正文字号不得低于 16fp，Canvas 文字不得低于 16vp。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 2-11 | 正文字号 ≥ 16fp；Canvas 文字 ≥ 16vp | grep `\.(fontSize)\(` 检查每个实例：若为数字值（如 `.fontSize(12)`），检查是否 ≥ 16；若为字符串（如 `.fontSize('12fp')`），提取数字部分检查 | 调整字号 |
| 2-12 | 优先使用系统字号 Token `$r('sys.float.ohos_id_text_size_headline*')` / `body*` / `button*` 替代硬编码数字 | grep `\.(fontSize)\(\s*\d+` 查找数字字号（非 `$r()` 引用），标记为可优化项 | 替换为系统 Token |

### 2.3 圆角

同类组件的 `borderRadius` 取值应保持一致。参考 Button 组件官方默认值：ROUNDED\_RECTANGLE NORMAL=20vp、SMALL=14vp。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 2-13 | 同类组件（卡片、按钮、弹窗）`borderRadius` 取值一致 | grep `\.(borderRadius)\(` 收集同类组件（卡片/按钮/弹窗）的所有圆角值，比对是否一致 | 统一圆角值 |

### 2.4 图片质量

大图应使用 `sourceSize` 降低解码分辨率以减少内存占用。ArkUI Image 支持 PNG/JPG/JPEG，不支持 APNG/SVGA。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 2-14 | `Image` 组件加载大图时使用 `.sourceSize({ width, height })` 降低解码分辨率 | grep `\bImage\(` 检查每个 Image 实例是否有 `.sourceSize`（对显示尺寸 > 200vp 的大图尤为重要） | 添加 sourceSize |

### 2.5 阴影

阴影应使用 `ShadowStyle` 预设或统一自定义参数（radius/color/offsetX/offsetY），避免同类组件阴影风格不一致。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 2-15 | `shadow` 使用 `ShadowStyle` 预设（如 `OUTER_DEFAULT_LG`/`OUTER_FLOATING_SM`）或同类组件统一自定义参数 | grep `\.(shadow)\(` 收集所有阴影参数，比对同类组件是否一致（统一使用预设或统一自定义参数） | 统一阴影参数 |

### 2.6 间距

间距应使用系统标准资源 `$r('sys.float.ohos_id_elements_margin_*')` 或统一基准值（4/8/12/16/20/24vp）。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 2-16 | 间距使用系统资源 `$r('sys.float.ohos_id_elements_margin_*')` 或统一基准值（4/8/12/16/20/24vp） | grep `\.(margin\|padding)\(` 检查每个实例：若为数字值（如 `.margin(10)`），检查是否在 4/8/12/16/20/24vp 基准内；若为对象（如 `.margin({ top: 10 })`），逐字段检查 | 替换为系统资源或统一值 |

---

## 三、系统特性适配

### 3.1 分辨率适配

多设备场景推荐使用栅格布局（`GridRow`/`GridCol`）和断点机制（xs/sm/md/lg）实现自适应布局，遵循「一次开发，多端部署」。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 3-1 | 多设备适配使用 `GridRow`/`GridCol` 或断点机制（xs/sm/md/lg） | grep `\bGridRow\b\|\bGridCol\b\|\bbreakpoint\b` 检查是否使用了栅格布局或断点；若无，标记为多设备适配风险 | 改用栅格布局或断点 |

### 3.2 状态栏遮挡

使用 `.expandSafeArea()` 防止状态栏/导航栏遮挡底部按钮。参考官方沉浸式效果两种方案：窗口全屏布局（`setWindowLayoutFullScreen`）和组件安全区（`expandSafeArea`）。

#### `expandSafeArea` 官方约束

| 约束 | 说明 |
|------|------|
| 组件不可有固定 px 宽高 | 百分比可行，`layoutWeight` 可行 |
| 父容器不可设置 `clip` | `clip(true)` 会裁剪扩展绘制区 |
| Scroll 容器子组件不生效 | 需设在 Scroll 父级或使用 `clipContent(ContentClipMode.SAFE_AREA)` |
| Video 组件仅扩展绘制区 | 不影响实际视频内容区域 |

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 3-2 | 使用 `.expandSafeArea()` 防状态栏/导航栏遮挡 | grep `expandSafeArea` 检查是否在 @Entry 页面的根容器或底部固定区域使用 | 添加 expandSafeArea |
| 3-3 | `.expandSafeArea()` 组件无固定 px 宽高 + 父容器无 `clip` | grep `expandSafeArea` 后，检查同组件是否有固定 `.width('Nvp')`/`.height('Nvp')`，以及父容器是否有 `clip(true)` | 去掉固定 px，去掉 clip |

### 3.3 横竖屏

通过 `module.json5` 的 `orientation` 字段或运行时 `setPreferredOrientation()` 设置屏幕方向。系统提供 18 种方向类型枚举。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 3-4 | `module.json5` 的 `orientation` 字段已按需配置（不限制方向时使用 `unspecified`） | 在 `module.json5` 中 grep `orientation` 检查字段是否存在及值是否合理 | 配置 orientation 字段 |

### 3.4 深色模式

使用 `$r()` 资源引用替代硬编码 hex 值。框架自动根据系统暗色/亮色模式切换颜色值，无需 `@StorageLink`、`@Watch`、`onColorModeChange`（Canvas 除外）。

硬编码 hex 检测由 2-1 ~ 2-7 覆盖，本节仅检查深色模式特有项。

#### 标准模式（推荐）

```typescript
@Entry
@Component
struct DemoPage {
  build() {
    Column() {
      Text('标题')
        .fontColor($r('app.color.text_primary'))
    }
    .backgroundColor($r('app.color.bg_page'))
  }
}
```

#### Canvas 特殊处理

`CanvasRenderingContext2D` 不支持 `$r()`，需要 `@StorageLink` + `onColorModeChange` + 三元表达式：

```typescript
import { ConfigurationConstant } from '@kit.AbilityKit';

@Entry
@Component
struct DemoPage {
  @StorageLink('colorMode') @Watch('onColorModeChange')
  colorMode: ConfigurationConstant.ColorMode = ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET;

  onColorModeChange(): void {
    this.draw();
  }

  build() {
    Canvas(this.context)
      .width('100%')
      .height(200)
      .onReady(() => { this.draw(); })
  }

  draw() {
    this.context.fillStyle = this.colorMode === ConfigurationConstant.ColorMode.COLOR_MODE_DARK
      ? '#E5E5E5' : '#333333';
  }
}
```

Canvas 暗色/亮色 hex 映射表：

| 语义 | 暗色 hex | 亮色 hex |
|------|---------|---------|
| text\_primary | `#E5E5E5` | `#333333` |
| text\_secondary | `#999999` | `#666666` |
| text\_tertiary | `#666666` | `#999999` |
| bg\_page | `#1A1A1A` | `#F1F3F5` |
| bg\_card | `#2D2D2D` | `#FFFFFF` |
| scrollbar | `#555555` | `#CCCCCC` |

#### 前提条件

1. `resources/dark/element/color.json` 必须存在且非空，否则系统组件不切换暗色。
2. `resources/base/element/color.json` 必须包含以下 name 条目（fix\_demo\_ui.py 会自动补充缺失项）：`text_primary`、`text_secondary`、`text_tertiary`、`bg_page`、`bg_card`、`divider`、`scrollbar`。缺少任一条目将导致编译报 `$r('app.color.xxx')` 找不到资源。
3. 非 Canvas 页面不应使用 `@StorageLink('colorMode')` 或 `import { ConfigurationConstant }`（这是 Canvas 专用模式）。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 3-5 | `resources/dark/element/color.json` 存在且非空 | 检查 `entry/src/main/resources/dark/element/color.json` 文件是否存在且包含 color 数组 | 若缺失，从脚手架 scaffold/hardemo 复制该文件 |
| 3-6 | 非 Canvas 页面无 `@StorageLink('colorMode')` 或 `import { ConfigurationConstant }` | grep `@StorageLink('colorMode')\|import.*ConfigurationConstant` 排除含 `CanvasRenderingContext2D` 的文件后，检查是否误用 | 删除非 Canvas 页面的 @StorageLink 和 ConfigurationConstant import |
| 3-7 | `resources/base/element/color.json` 包含 7 个必需 name（`text_primary`、`text_secondary`、`text_tertiary`、`bg_page`、`bg_card`、`divider`、`scrollbar`） | fix\_demo\_ui.py 自动检测，或在 `entry/src/main/resources/base/element/color.json` 中 grep 上述 7 个 name 是否存在 | 补充缺失的 color name |
| 3-8 | SVG 图标使用 `fillColor` 配合 `$r('sys.color.xxx')` 适配深色模式，非固定 hex | grep `\.fillColor\(` 检查赋值是否为 `$r()` 资源引用而非固定 hex/枚举值 | 改用 `$r('sys.color.xxx')` 资源引用 |
| 3-9 | Web 组件设置 `darkMode` 为 `WebDarkMode.Auto` 跟随系统 | fix\_demo\_ui.py 自动检测，或 grep `\bWeb\b` 检查同文件是否有 `.darkMode(` | 添加 `.darkMode(WebDarkMode.Auto)` |

---

## 四、交互&动效

### 4.1 动画质量与滑动丢帧预防

参考官方指标：最大连续丢帧数不应超过 3 帧（超过 3 帧用户明显感知卡顿）。`animateTo` 应设置合理 `duration`。

滑动场景（List/Grid/WaterFlow）中丢帧预防见 performance.md §2。

官方滑动丢帧检测阈值：最大单帧耗时 > 50ms 触发上报（从应用主线程和 RenderService 绘制分别计算）。编码阶段应预防以下高风险模式：

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 4-1 | `animateTo` 设置合理 `duration`（非 0），避免无过渡动画；避免在动画回调中执行重布局操作（如动态修改组件宽高/间距） | grep `animateTo\(` 检查回调中是否有 `duration` 参数且值 > 0，以及回调体内无 `.width()`/`.height()`/`.margin()`/`.padding()` 等动态重布局 | 添加 duration 参数；将重布局操作移出动画回调 |

### 4.2 滑动/滚动

Scroll 内嵌可滚动子组件（List/Swiper/嵌套 Scroll/自定义 Pan 手势）时，需设置 `nestedScroll` 或 `priorityGesture`/`parallelGesture` 防止手势冲突。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 4-2 | Scroll 内含可滚动子组件：检查 `nestedScroll` 或 `priorityGesture`/`parallelGesture` 设置 | grep `\bScroll\b` 检查同文件是否含 `\bList\b\|\bSwiper\b\|\bScroll\b\|Pan\|Gesture`；若含，检查 Scroll 或子组件是否有 `nestedScroll`/`priorityGesture`/`parallelGesture` | 设置 nestedScroll 或 priorityGesture |

---

## 五、内容展示

### 5.1 文案/多语言

不同语言译文长度差异较大（膨胀率 30%~200%），Text 应设置 `maxLines` + `textOverflow` 防翻译后截断破坏布局。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 5-1 | Text 有 `maxLines` + `textOverflow(TextOverflow.Ellipsis)` 防翻译膨胀截断 | grep `\bText\(` 检查每个 Text 实例是否有 `.maxLines` 和 `.textOverflow(TextOverflow.Ellipsis)`；若无且文本可能较长（非 1~2 字短标签），标记为截断风险 | 补充 maxLines + textOverflow |

---

## 六、折叠屏/多设备适配

### 6.1 栅格/断点适配

`GridRow`/`GridCol` + 断点机制（xs/sm/md/lg）在折叠屏的折叠态（小屏）和展开态（大屏）下应能正确切换布局。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 6-1 | 折叠屏场景下栅格/断点响应正确：GridRow/GridCol 在折叠态（小屏）和展开态（大屏）下布局正确 | Agent 核对：检查 GridRow/GridCol 是否设置了合理的断点值（xs/sm/md/lg），以及在不同屏幕尺寸下能否正确切换布局 | 调整断点值或布局结构 |

### 6.2 Navigation 组件适配

折叠屏设备推荐使用 `Navigation` 替代 `router` 路由，实现分栏（Split）和堆叠（Stack）布局的自动切换。

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 6-2 | 使用 `Navigation` 组件，不使用 `router.push`/`router.pushUrl` | fix\_demo\_ui.py 自动检测，或 grep `\brouter\.(push\|pushUrl\|pushNamedUrl)\b` | 迁移到 Navigation 组件 |
| 6-3 | `Navigation` 的 `mode` 属性正确设置（折叠屏用 `NavigationMode.Split`，直板机用 `NavigationMode.Stack`） | grep `\bNavigation\b` 检查 `mode` 参数是否设置 | 设置正确的 NavigationMode |

#### router → Navigation 迁移指南

当 fix\_demo\_ui.py 报告 `[6-2] WARNING: 使用了 router.{method}` 时，按以下步骤迁移：

**API 对照表**：

| 旧 Router API | 新 Navigation API |
|--------------|-------------------|
| `router.pushUrl({url: 'pages/Detail'})` | `navPathStack.pushPath({name: 'Detail'})` |
| `router.pushUrl({url: 'pages/Detail', params: {id: 1}})` | `navPathStack.pushPath({name: 'Detail', param: {id: 1}})` |
| `router.replaceUrl({url: 'pages/Detail'})` | `navPathStack.replacePath({name: 'Detail'})` |
| `router.back()` | `navPathStack.pop()` |
| `router.clear()` | `navPathStack.clear()` |
| `router.getParams()` | `NavDestinationContext.pathStack.getParamByIndex()` |

**迁移前（router 模式）**：

```typescript
import { router } from '@kit.ArkUI';

// pages/Index.ets — 每个页面都需要 @Entry
@Entry
@Component
struct IndexPage {
  build() {
    Button('跳转详情')
      .onClick(() => {
        router.pushUrl({ url: 'pages/Detail', params: { id: 1 } });
      })
  }
}

// pages/Detail.ets — 另一个 @Entry 页面
@Entry
@Component
struct DetailPage {
  @State id: number = router.getParams()?.id ?? 0;
  build() {
    Text(`ID: ${this.id}`)
  }
}
```

**迁移后（Navigation 模式）**：

```typescript
import { Navigation, NavPathStack, NavDestination, NavigationMode } from '@kit.ArkUI';

// pages/Index.ets — 唯一的 @Entry 页面
@Entry
@Component
struct IndexPage {
  @Provide('navPathStack') navPathStack: NavPathStack = new NavPathStack();

  build() {
    Navigation(this.navPathStack) {
      Button('跳转详情')
        .onClick(() => {
          this.navPathStack.pushPath({ name: 'Detail', param: { id: 1 } });
        })
    }
    .mode(NavigationMode.Stack)
    .navDestination((params: NavPathStackParam) => {
      if (params.name === 'Detail') {
        DetailPage({ id: params.param?.id ?? 0 })
      }
    })
  }
}

// 不再需要 @Entry，不再需要独立页面文件
@Component
struct DetailPage {
  @Prop id: number = 0;
  build() {
    Text(`ID: ${this.id}`)
  }
}
```

**迁移要点**：
1. 删除所有 `router.pushUrl`/`router.replaceUrl`/`router.back` 调用，替换为 `navPathStack.*`
2. 移除子页面的 `@Entry` 装饰器，改为普通 `@Component`
3. 将 `router.getParams()` 替换为通过 `@Prop` 或 `@Consume` 接收参数
4. 在 `Navigation` 的 `navDestination` 回调中映射路由名到组件
5. 更新 `module.json5` 中的 `pages` 配置（仅保留 Index 页面）

---

## 检查清单汇总

| 编号 | 子类 | 检查项 | 检测方式 |
|------|------|--------|---------|
| 1-1 | 组件位置错乱 | 布局/字号禁止 px | 自动检测（仅告警） |
| 1-2 | 内容截断 | 按钮文字完整 | Agent 核对 |
| 1-3 | 内容截断 | Text 溢出处理 | Agent 核对 |
| 1-4 | 内容截断 | 多按钮 Flex wrap | 自动检测（仅告警） |
| 1-5 | 比例失真 | Image/Video aspectRatio | Agent 核对 |
| 1-6 | 内容出界 | Scroll 包裹 | Agent 核对 |
| 1-7 | 内容出界 | Scroll 包裹检测 | 自动检测（仅告警） |
| 2-1 | 色值/对比度 | fontColor 无硬编码 hex | 自动修复 |
| 2-2 | 色值/对比度 | backgroundColor 无硬编码 hex | 自动修复 |
| 2-3 | 色值/对比度 | fillColor 无硬编码 hex | 自动修复 |
| 2-4 | 色值/对比度 | scrollBarColor 无硬编码 hex | 自动修复 |
| 2-5 | 色值/对比度 | strokeStyle 无硬编码 hex | 自动修复 |
| 2-6 | 色值/对比度 | fillStyle 无硬编码 hex | 自动修复 |
| 2-7 | 色值/对比度 | 无枚举颜色 | 自动修复 |
| 2-8 | 色值/对比度 | fontColor 与 bgColor 不同色 | 自动检测（仅告警） |
| 2-9 | 色值/对比度 | Canvas 暗色可见 | Agent 核对 |
| 2-10 | 色值/对比度 | 按钮色对比充分 | Agent 核对 |
| 2-11 | 字体/字号 | 正文字号 ≥ 16fp | Agent 核对 |
| 2-12 | 字体/字号 | 优先系统字号 Token | Agent 核对 |
| 2-13 | 圆角 | 同类组件 borderRadius 一致 | Agent 核对 |
| 2-14 | 图片质量 | Image sourceSize | Agent 核对 |
| 2-15 | 阴影 | shadow 统一参数 | Agent 核对 |
| 2-16 | 间距 | 间距统一基准 | Agent 核对 |
| 3-1 | 分辨率适配 | 栅格/断点布局 | Agent 核对 |
| 3-2 | 状态栏遮挡 | expandSafeArea | Agent 核对 |
| 3-3 | 状态栏遮挡 | expandSafeArea 约束 | Agent 核对 |
| 3-4 | 横竖屏 | orientation 配置 | Agent 核对 |
| 3-5 | 深色模式 | dark/element/color.json 存在 | Agent 核对 |
| 3-6 | 深色模式 | 非 Canvas 无 @StorageLink | Agent 核对 |
| 3-7 | 深色模式 | base/color.json 必需 name | 自动检测（仅告警） |
| 3-8 | 深色模式 | SVG fillColor 资源引用 | Agent 核对 |
| 3-9 | 深色模式 | Web darkMode 跟随系统 | 自动检测（仅告警） |
| 4-1 | 动画质量与丢帧预防 | animateTo + 动画回调无重布局 | Agent 核对 |
| 4-2 | 滑动/滚动 | nestedScroll 设置 | Agent 核对 |
| 5-1 | 文案/多语言 | maxLines + textOverflow | Agent 核对 |
| 6-1 | 栅格/断点适配 | 栅格/断点适配 | Agent 核对 |
| 6-2 | Navigation 组件 | router.push 迁移 | 自动检测（仅告警） |
| 6-3 | Navigation 组件 | Navigation mode 设置 | Agent 核对 |
