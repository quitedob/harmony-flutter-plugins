---
name: ui-component-mapping
description: Android UI 组件 → ArkUI 组件映射与自定义能力选型。当 Android 源码中出现自定义 View、Canvas 绘制、手势处理、动画、列表、弹窗、导航等 UI 代码模式，或 XML Layout / XML Drawable / XML Animation 资源模式时触发。
---

# Android UI 组件 → ArkUI 映射与选型

本 Skill 提供 UI 组件的**类别识别**与**映射选型**，帮助 agent 根据 Android 源码和资源确定 ArkUI 实现路径。

## 与 ohos-coding-guide 的分工

| Skill | 职责 |
|-------|------|
| **ui-component-mapping**（本 Skill） | 识别 UI 类别、确定映射方向、选型自定义能力层级 |
| ohos-coding-guide/ui-coding.md | ArkUI 具体编码规则和常见坑 |

## 触发词

当 Android 源码中出现以下任一代码模式时，必须加载本 Skill：

| 触发模式 | 映射类别 |
|----------|----------|
| `extends View` / `extends ViewGroup` / 自定义 View | 自定义能力（按需判定 L1-L4） |
| `onDraw(Canvas)` / `dispatchDraw` | 几何图形绘制 |
| `onMeasure` / `onLayout` | 组件布局 |
| `RecyclerView.Adapter` / `ViewHolder` / `LinearLayoutManager` / `GridLayoutManager` | 列表与网格 |
| `ViewPager` / `ViewPager2` / `FragmentPagerAdapter` / `FragmentStatePagerAdapter` | 媒体展示 / Swiper |
| `SeekBar` / `RangeSlider` / `Slider` / `RatingBar` | 添加组件 |
| `GestureDetector` / `onTouchEvent` / `ScaleGestureDetector` | 添加交互响应 |
| `ObjectAnimator` / `ValueAnimator` / `AnimatorSet` / `TransitionManager` | 使用动画 |
| `AlertDialog.Builder` / `BottomSheetDialog` / `DatePickerDialog` | 使用弹窗 |
| `EditText` / `TextInputLayout` / `AutoCompleteTextView` | 使用文本 |
| `ImageView` + Glide/Coil/Picasso | 媒体展示 |
| `ConstraintLayout` / `LinearLayout` / `FrameLayout` / `RelativeLayout` / `CoordinatorLayout` | 组件布局 |
| `NavigationView` / `NavController` / `NavigationUI` | 导航与路由 |
| `TabLayout` / `TabHost` / `FragmentTabHost` | 组件布局 / Tabs |
| `SwipeRefreshLayout` | 添加交互响应 |
| `PopupWindow` / `SnackBar` | 使用弹窗 |
| `Menu` / `PopupMenu` / `ActionBar` | 使用弹窗 / 菜单 |
| `CheckBox` / `RadioButton` / `Switch` / `ToggleButton` | 表单选择 |
| `ProgressBar` / `ContentLoadingProgressBar` | 添加组件 |
| `VideoView` / `ExoPlayer` / `TextureView` | 媒体展示 |
| `WebView` / `loadUrl` | 媒体展示 / ArkWeb |
| `MotionLayout` / `Transition` / `Scene` | 使用动画 |
| `res/layout/*.xml`（Activity/Fragment 布局、RecyclerView Item） | XML Layout → §13.1 |
| `res/drawable/*.xml`（`<shape>`/`<selector>`/`<ripple>`/`<layer-list>`/`<vector>`/`<animated-vector>`） | XML Drawable → §13.2 |
| `res/anim/*.xml` / `animator/*.xml`（`<objectAnimator>`/`<set>`/`<keyframe>`） | XML Animation → §13.3 |

## 加载规则

1. **始终加载**：`android-to-arkui-matrix.md` — 查找组件映射
2. **条件加载**：当涉及自定义 View（`extends View`/`onDraw`/`onMeasure`/`onLayout`）或 XML Drawable/Animation 时，额外加载 `custom-capability-selection.md` — 确定实现层级（决策树包含代码和 XML 两条入口）
3. **深度参考（结构化触发，命中即必读——不靠"要不要确认参数"自由判断）**：`references/mappings/` 下三个文件提供属性级/参数级映射细节。下表任一条件命中时，**必须**加载对应文件，并把查到的属性级对应、类型转换和常见坑纳入映射结论。命中但确认确无差异时，也应记录已核对的 reference。

   | 触发条件 | 必读文件 |
   |---|---|
   | 映射涉及**属性可配置组件**：`EditText`/`TextInput`（inputType / imeOptions / hint / maxLines / caretColor）、`Image`/`ImageView`（scaleType→objectFit / tint）、`Button`/`TextView`（shadow / 字体 / drawablePadding / ellipsize）、含 `android:shadow*` 或 shape/gradient 背景的控件、任何样式配置类（`*Style`）落地具体属性时 | `references/mappings/android-to-harmonyOS-ui-atomic-component-mapping-reference.md` |
   | 映射涉及**触摸/手势/焦点/键盘/拖拽**：`onTouchEvent`/`GestureDetector`/`MotionEvent`/`onFocusChange`/`KeyEvent`/`OnDragListener`，或映射行 ArkUI 目标含 `.gesture()` / `onTouch` / `HitTestMode` / `stopPropagation` | `references/mappings/android-to-harmonyOS-ui-interaction-mapping-reference.md` |
   | 映射涉及 **XML 布局通用属性转换**：`padding`/`margin`/`gravity`/`layout_gravity`/`visibility`/`alpha`/`rotation`/`scale`/`translation`/约束属性 | `references/mappings/android-to-harmonyOS-ui-layout-mapping-reference.md` |

   **与 matrix 的分工（避免重复读）**：`android-to-arkui-matrix.md`（始终加载）负责"**选哪个 ArkUI 组件 + 能力层级 L1–L4**"；`references/mappings/` 负责"**选定组件后的属性级映射**（`android 属性 → ArkUI API` + 类型转换 + 代码示例）"——这部分 matrix 完全没有，是加载 reference 的唯一价值。两者只在"组件→组件结论"这一层重复。

   **定位读取（grep-按名，勿整篇读，不靠任何索引表）**：进入上表指定的 reference 文件后，直接在文件内 grep **Android 组件名 / 事件名**（如 `EditText`、`ImageView`、`FlexboxLayout`、`PanGesture`）——三份文件的属性/参数子节标题都以 `<Android 名> → <ArkUI 名> 属性映射` 形式命名（如 `#### 1.1.2 EditText → TextInput/TextArea 属性映射`），grep 组件名即落到对应 `#### ` 子节，再用 offset/limit **只读该 `#### x.x.x` 属性子表**。
   - 标题即索引：不需要 crosswalk / 手维护的章节对照表，reference 自身标题就是导航入口（自维护、不随章节号漂移）。
   - **跳过 `###` 级"组件总览表"**：它只重述 matrix 的组件→组件结论，已从 matrix 得到；grep-按名定位到 `#### ` 子节本就不会读到它。
   - 文件路由已由上方触发表决定（属性组件→atomic / 手势→interaction / 布局属性→layout），文件内再 grep 组件名即可。

## UI 能力识别

1. 扫描 Android 源码，识别所有 UI 相关类和 XML 资源
2. 对每个 UI 类，按触发词表匹配类别
3. 扫描 `res/drawable/`、`res/anim/`、`res/animator/` 等 XML 资源目录，按 XML 根标签识别 Drawable/Animation 类型
4. 记录每个元素的源码或资源证据、UI 类别、用户可见行为、状态、事件和扩展点
5. 统计 XML Layout、Drawable 和 Animation 的类型与数量，保留能够定位原资源的证据

## 映射选型

1. 在 `android-to-arkui-matrix.md` 中查找对应类别的映射方案；代码类组件查 §1-12，XML 资源查 §13
2. 命中属性可配置组件、交互手势或布局属性时，加载 `references/mappings/` 对应文件，核对属性、类型、单位、事件和常见坑
3. 涉及自定义 View 或 XML Drawable/Animation 时，在 `custom-capability-selection.md` 决策树中判定 L1/L2/L3/L4；L3/L4 作为高难度实现风险
4. 对每个 Android UI 元素形成独立映射结论，覆盖 ArkUI 目标、能力层级、保真度、原因和验收

### 映射结论示例

```markdown
| Android UI 元素（类/资源 + 证据行） | UI 类别 | Android 实现细节 | ArkUI 目标 + 层级 + 矩阵章节 | 保真度 | 原因 | 验收 |
|---|---|---|---|---|---|---|
| ShapeImageView (utils/ShapeImageView.java:43 onSizeChanged cubicTo) | 几何绘制 | 四段三次 Bézier squircle clipPath（非正圆） | Shape + clip(Path/commands) / L1 / §6 | 完整复刻 | 头像形状是产品视觉标识 | 渲染形状=贝塞尔花瓣路径，非正圆 |
| MessageHolders (反射 ViewHolder 工厂 + ContentChecker) | 自定义扩展 | 运行时注册自定义消息类型 / 替换 ViewHolder | wrapBuilder + @BuilderParam 注入渲染 / L2 / §12 | 完整复刻 | 扩展性是核心公开 API | Demo 注册自定义类型并真实渲染出自定义 UI（非穿透为文本） |
| RoundedImageView (BitmapShader 8-radii) | 媒体展示 | 每角独立圆角图片 | Image + borderRadius（每角） / L1 / §5 | 近似 | ArkUI borderRadius 视觉等价，差异仅抗锯齿实现 | 圆角可随 style 每角配置 |
```

### 保真度枚举与强制规则

`保真度` 取值：`完整复刻 | 近似 | 降级(deferred) | 宿主代理(host_proxy) | 裁剪(cut)`。

1. **自绘类 View 默认 `完整复刻`**：源码命中 `onDraw` / `dispatchDraw` / `clipPath` / `BitmapShader` / `Path` / `Canvas` / `onSizeChanged` 自绘路径时，默认用 L1 Canvas/Shape（`clip(Path)` / `commands` SVG 路径）完整复刻其几何。要降为内置属性近似（如 `borderRadius` / `objectFit`）**必须**标 `近似` 并在“原因”写明形状/视觉差异。**禁止把自定义形状（squircle、花瓣、异形遮罩）静默当正圆或矩形。**
2. **扩展点 / 工厂 / 注册 / 反射类 API 禁止空壳**：如 `MessageHolders`、自定义 ViewHolder 注册、`Adapter` 可插拔渲染。保真度只能是：
   - `完整复刻`——必须在“原因/验收”写明 ArkTS 接通方式（`wrapBuilder` + `@BuilderParam` / `@Builder` 注入），且验收要求“注册的自定义内容能真实渲染出自定义 UI”，而非仅导出 API；
   - 或 `裁剪`——公开契约中不再提供该扩展能力。
   **禁止”导出但渲染链路不接通”的空壳 API**（导出 `registerXxx` 却没人消费即视为缺陷）。
   **跨模块消费契约（最易漏的空壳来源）**：当扩展点的注册表与渲染消费位于不同实现模块时，`完整复刻` 需要同时接通注册与消费。消费方应调用 `findBuilder()` / `getViewType()` 等接口并真实渲染自定义产出；仅完成注册表时，该扩展能力仍未闭环。
3. **每行必须可核验**：`近似 / 降级 / 宿主代理 / 裁剪` 行的“原因”和“验收”均不得为空；`完整复刻` 行的“验收”必须是可观测判据（如“渲染形状=贝塞尔路径”“自定义类型真渲染”），不得写“已实现”这类空话。
4. **覆盖完整**：识别出的每个 Android UI 元素（自定义 View / widget / XML Layout / Drawable / Animation）都应有对应映射结论。
5. **属性级映射必须落证据（让 references 真正发挥作用）**：当某映射结论命中上方「加载规则 §3」的结构化触发条件（属性可配置组件 / 交互手势 / 布局属性）时，必须先读对应 `references/mappings/` 文件，并记录 `<android 属性→ArkUI API 对应 + 常见坑>`。
   - 例：`TextInput` 行 → `> 属性级（已查 atomic-component-mapping）：android:imeOptions→.enterKeyType()，android:inputType→.type(InputType.*)，maxLines 多行用 TextArea；坑：caretColor 仅改光标色、无法换光标 drawable`。
   - 映射结论中的 reference 记录同时作为属性级保真度的核对依据。

## 按需加载方式

```bash
# 核心：始终加载
read_file('.claude/skills/ui-component-mapping/android-to-arkui-matrix.md')
# 自定义 View 或 XML Drawable/Animation 场景
read_file('.claude/skills/ui-component-mapping/custom-capability-selection.md')
# 深度参考：按「加载规则 §3」结构化触发表，命中即必读（非自由判断）
read_file('.claude/skills/ui-component-mapping/references/mappings/android-to-harmonyOS-ui-atomic-component-mapping-reference.md')  # 触发：属性可配置组件 / *Style 落地属性
read_file('.claude/skills/ui-component-mapping/references/mappings/android-to-harmonyOS-ui-interaction-mapping-reference.md')      # 触发：触摸/手势/焦点/键盘/拖拽
read_file('.claude/skills/ui-component-mapping/references/mappings/android-to-harmonyOS-ui-layout-mapping-reference.md')          # 触发：XML 布局通用属性转换
```
