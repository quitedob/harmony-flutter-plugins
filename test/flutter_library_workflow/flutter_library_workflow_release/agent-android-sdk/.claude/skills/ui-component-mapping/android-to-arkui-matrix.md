# Android UI → ArkUI 组件映射矩阵

本文件按鸿蒙官方 ArkUI（ArkTS 声明式开发范式）的 12 个组件类别组织，每类提供 Android → ArkUI 的映射方案。

**自定义能力层级说明**（详见 `custom-capability-selection.md`）：

| 层级 | 名称 | 灵活度 | 难度 | 典型场景 |
|------|------|--------|------|---------|
| L1 | 自定义组合 | 低 | 低 | 用系统组件 + Canvas/Shape + 动画封装新组件 |
| L2 | 自定义扩展 | 中 | 中 | 用 Modifier 扩展现有组件的属性/手势/绘制 |
| L3 | 自定义节点 | 高 | 高 | 用 FrameNode/RenderNode 做底层自定义 |
| L4 | 自定义渲染 | 最高 | 最高 | 用 XComponent + EGL/OpenGLES 独立渲染 |

---

## 1. 组件布局

**官方子类**：线性布局（Row/Column）、层叠布局（Stack）、弹性布局（Flex）、相对布局（RelativeContainer）、栅格布局（GridRow/GridCol）、选项卡（Tabs）

| Android 组件 | ArkUI 对应 | 能力层级 | 关键差异 | 常见坑 |
|-------------|-----------|---------|---------|-------|
| `LinearLayout`（horizontal） | `Row` | L1 | 无 weight 属性，用 `layoutWeight` 替代 | `layoutWeight` 只在 `Row`/`Column` 内生效 |
| `LinearLayout`（vertical） | `Column` | L1 | 同上 | 同上 |
| `FrameLayout` | `Stack` | L1 | 用 `zIndex` / 声明顺序控制层叠 | 默认居中对齐，需 `.alignContent(Alignment.TopStart)` 调整 |
| `RelativeLayout` | `RelativeContainer` | L1 | 用 `alignRules` 锚点对齐，非 XML 属性 | `alignRules` 必须指定横纵两个方向的锚点 |
| `ConstraintLayout` | `RelativeContainer` 或 `Row`/`Column` 嵌套 | L1 | 无等价 ConstraintLayout，需重新布局 | 约束链、Barrier、Group 无直接对应，需拆解重设计 |
| `CoordinatorLayout` | `Column` + `List` + 手动偏移 | L1 | 无等价，Behavior 机制需手动实现 | 滚动联动效果需监听 `onScrollFrameBegin` |
| `GridLayout` | `Grid` | L1 | ArkUI Grid 是数据驱动的列表组件，非布局容器 | 注意区分 `Grid`（列表）和 `GridRow`/`GridCol`（响应式栅格） |
| `TabLayout` | `Tabs` + `TabContent` | L1 | Tab 和内容一体，非独立 View | 自定义 Tab 样式用 `TabBuilder` |
| `DrawerLayout` | `Panel` 或自定义 `Stack` + 动画 | L1 | 无等价 DrawerLayout | 侧滑需用 `PanGesture` 或 `bindSheet` 替代 |

---

## 2. 列表与网格

**官方子类**：List、Grid、WaterFlow

| Android 组件 | ArkUI 对应 | 能力层级 | 关键差异 | 常见坑 |
|-------------|-----------|---------|---------|-------|
| `RecyclerView` + `LinearLayoutManager` | `List` + `ListItem` | L1 | 声明式，无 Adapter 模式 | 数据驱动：修改 `@State` 数组自动刷新 |
| `RecyclerView` + `GridLayoutManager` | `Grid` + `GridItem` | L1 | 同上 | `columnsTemplate` 控制列数 |
| `RecyclerView` + `StaggeredGridLayoutManager` | `WaterFlow` + `FlowItem` | L1 | 瀑布流专用组件 | `columnsTemplate` 控制列数 |
| `RecyclerView.Adapter` | `@State` 数组 + `ForEach` / `LazyForEach` | L1 | 无 Adapter 类，数据直接绑定 | `LazyForEach` 须实现 `IDataSource` 接口 |
| `RecyclerView.ViewHolder` | 无对应 | — | 每个 `ListItem` 内部直接写 UI | 不需要 ViewHolder 缓存，框架自动管理 |
| `ListView` | `List` + `ListItem` | L1 | 同 RecyclerView 映射 | 优先用 `List`，无性能差异 |
| `GridView` | `Grid` + `GridItem` | L1 | 同上 | 同上 |
| `SwipeRefreshLayout` | `Refresh` 组件 | L1 | 声明式包裹，非外层容器 | `onRefreshing` 回调中执行刷新逻辑 |
| `ItemDecoration` | `ListItemGroup`（默认基线） + 自定义分隔 / 轻量增强 | L1 | 先用分组、`header`、`sticky`、`divider` 等原生能力承接；不足时再叠加轻量增强 | 粘性头部默认先用 `ListItemGroup` 的 `header`，不要无证据判定其不支持；`ListItemGroup` 的头部必须走 `header:` 插槽；不要 header 当普通 children 渲染；`List.sticky(...)` 相关枚举值必须核对官方语义 |
| `ItemAnimator` | `animateTo` + `transition` | L1 | 声明式动画，非 ItemAnimator | 列表项增删动画用 `transition` |

---

## 3. 表单选择

**官方子类**：Button、Toggle、Radio、ArcButton

| Android 组件 | ArkUI 对应 | 能力层级 | 关键差异 | 常见坑 |
|-------------|-----------|---------|---------|-------|
| `Button` | `Button` | L1 | 支持文本/自定义子组件两种 | 自定义内容用 `Button() { Row() {...} }` |
| `ImageButton` | `Button` + `Image` 子组件 | L1 | 无独立 ImageButton | `Button() { Image($r('app.media.xxx')) }` |
| `CheckBox` | `Toggle`（`ToggleType.Checkbox`） | L1 | Toggle 统一承载 Checkbox/Switch/Button | `selected` 控制选中状态 |
| `Switch` / `SwitchCompat` | `Toggle`（`ToggleType.Switch`） | L1 | 同上 | `onChange` 回调接收新状态 |
| `RadioButton` | `Radio` | L1 | 需 `RadioGroup` 容器实现互斥 | 无 `RadioGroup` 组件，用 `@State` 变量手动管理互斥 |
| `RatingBar` | `Rating` | L1 | 五角星评分组件 | `stars` 控制星数，`rating` 控制当前值 |
| `Spinner` | 无直接对应 | L2 | 用 `Select` 组件或自定义下拉 | `Select` 是鸿蒙专用下拉选择器 |
| `DatePicker` | `DatePicker` | L1 | 接口不同 | 用 `selectedDate` 绑定值 |
| `TimePicker` | `TimePicker` | L1 | 同上 | 用 `selectedTime` 绑定值 |

---

## 4. 使用文本

**官方子类**：Text/Span、TextInput/TextArea/Search、RichEditor、SymbolGlyph

| Android 组件 | ArkUI 对应 | 能力层级 | 关键差异 | 常见坑 |
|-------------|-----------|---------|---------|-------|
| `TextView` | `Text` | L1 | 富文本用 `Span`/`ImageSpan`/`ContainerSpan` 子组件 | `Text` 不支持 HTML，需用 `Span` 拼接 |
| `EditText` | `TextInput`（单行）/ `TextArea`（多行） | L1 | 无 `hint` 属性，用 `placeholder` | `onChange` 实时回调，`onSubmit` 回车回调 |
| `AutoCompleteTextView` | 无直接对应 | L2 | 需 `TextInput` + `bindPopup` / `List` 手动实现 | — |
| `TextInputLayout` | 无直接对应 | L2 | 无浮动标签容器，需自定义 `@Component` | 用 `@Watch` 监听焦点实现浮动标签 |
| `SearchView` | `Search` | L1 | 专用搜索组件 | `searchButton` 配置搜索按钮 |
| `SpannableString` | `Span` + `ImageSpan` + `ContainerSpan` | L1 | 声明式子组件，非 SpannableString API | 样式通过子组件属性设置 |
| `Html.fromHtml` | 无直接对应 | L2 | 需用 `RichEditor` 或手动解析 | 简单 HTML 可用正则 + Span 拼接 |

---

## 5. 媒体展示

**官方子类**：Image、Video、Swiper

| Android 组件 | ArkUI 对应 | 能力层级 | 关键差异 | 常见坑 |
|-------------|-----------|---------|---------|-------|
| `ImageView` | `Image` | L1 | 支持本地/网络/Resource/PixelMap | 网络图需 `ohos.permission.INTERNET` |
| Glide / Coil / Picasso | 无直接对应库 | L2 | 用系统 `Image` 组件 + 内存缓存手动实现 | 网络图加载需自行封装或用三方库 |
| `ViewPager` / `ViewPager2` | `Swiper` | L1 | 声明式，无 Adapter | `onChange` 监听页切换 |
| `VideoView` | `Video` | L1 | 声明式视频组件 | `controls` 控制是否显示播放控件 |
| `ExoPlayer` | `AVPlayer` + `XComponent` | L2 | 播放器与渲染面分离 | `surfaceId` 从 `XComponent` 获取 |
| `TextureView` | `XComponent` | L2 | 纹理渲染承载 | `onSurfaceCreated` 回调获取 `surfaceId` |
| `SurfaceView` | `XComponent` | L2 | 同上 | 同上 |
| `WebView` | `Web`（`@ohos.web.webview`） | L1 | 命名不同，API 不同 | 必须 `webview.WebController` 控制 |
| `LottieAnimationView` | 无直接对应 | L2 | 用 `Canvas` 自绘或 `Animator` 逐帧 | Lottie 鸿蒙版需查 ohpm |
| `PhotoView`（缩放图片） | `Image` + `PinchGesture` + `PanGesture` | L1 | 需手动实现缩放/拖拽 | 用 `scale`/`offset` 属性驱动 |
| `GIF` | `Image` | L1 | 系统组件原生支持 GIF | `.autoPlay(true)` 控制播放 |

---

## 6. 几何图形绘制

**官方子类**：Canvas、Shape 类组件（Rect/Path/Circle/Ellipse/Polyline/Polygon）、clipShape

| Android 组件 | ArkUI 对应 | 能力层级 | 关键差异 | 常见坑 |
|-------------|-----------|---------|---------|-------|
| `Canvas` + `onDraw` | `Canvas` + `CanvasRenderingContext2D` | L1 | W3C 风格 API，非 Android Canvas | `onReady` 回调中获取 context，非 `onDraw` |
| `Canvas` + `onDraw`（高频重绘） | `Canvas` + `@State` 驱动重绘 | L1 | 用 `@State` 变量触发重绘，非 `invalidate()` | 修改绑定到 Canvas 绘制的 `@State` 即触发重绘 |
| `ShapeDrawable` | `Shape` + `Rect`/`Path`/`Circle` 等 | L1 | 声明式矢量图形 | 类 SVG 风格，支持动画 |
| `Path`（Android） | `commands` 路径字符串 | L1 | SVG 路径语法，非 Android Path API | `'M0 0 L100 0 L100 100 Z'` 格式 |
| `Paint`（Android） | `CanvasRenderingContext2D` 属性 / `Shape` 属性 | L1 | 绑定到 context，非独立 Paint 对象 | `fillStyle`/`strokeStyle`/`lineWidth` 等 |
| `Bitmap` + `Canvas` | `PixelMap` + `Canvas` | L1 | 用 `image.createPixelMap()` 创建 | Canvas 绘制 PixelMap 用 `drawImage` |
| `clipPath` | `clipShape` | L1 | 用 Shape 组件做裁剪 | 支持圆形/矩形/自定义路径裁剪 |

### 自绘组件关键规则

| 规则 | 说明 |
|------|------|
| 绝对坐标 vs 偏移量 | `PanGesture` 的 `offsetX/Y` 是**偏移量**（Down 时为 0），需用 `onTouch` 的 `x/y` 获取**绝对坐标**做碰撞检测 |
| Canvas 动画 | 用 `animateTo` 修改 `@State` 变量 → `onAreaChange` 或重绘回调中读取新值绘制 |
| @Watch 重绘 | `@Watch` 回调中修改布局相关变量后，必须同步重定位元素并重绘 |
| 首帧派生绘制状态 | 自绘组件从外部配置、Builder、构造参数或 `@Prop` 接收 `currentValue`、进度、角度、选中项等输入后，必须在首次绘制前同步计算内部派生状态；不得用尚未同步的派生值作为 `draw()` / `drawAll()` 入口门禁，否则会把首帧渲染拦死 |
| 根容器尺寸 | 自绘组件根容器**禁止硬编码** `.height(固定值)`，否则父级 `height()` 无效 |
| 绘制时机 | 只在 `CanvasRenderingContext2D.onReady` 后绘制，非 `aboutToAppear` |

---

## 7. 添加组件

**官方子类**：Progress、Slider、Rating、Marquee、QRCode、DataPanel、Gauge、Clock、CalendarPicker、TextPicker、Select、Counter

| Android 组件 | ArkUI 对应 | 能力层级 | 关键差异 | 常见坑 |
|-------------|-----------|---------|---------|-------|
| `ProgressBar`（水平） | `Progress`（`ProgressType.Linear`） | L1 | 样式固定 | `value` / `total` 控制进度 |
| `ProgressBar`（圆形） | `Progress`（`ProgressType.Ring`） | L1 | 同上 | 同上 |
| `SeekBar` | `Slider` | L1 | 接口不同 | `onChange` / `onSliderChange` 回调 |
| `RangeSlider`（Material） | 无直接对应 | L1（自定义组合） | 需用 Canvas 自绘或 `Slider` + 自定义 | 参见 `custom-capability-selection.md` |
| `RatingBar` | `Rating` | L1 | 同 §3 | 同 §3 |
| `NumberPicker` | `TextPicker` | L1 | `range` 数组驱动 | `selected` 绑定选中索引 |
| `Chronometer` | 无直接对应 | L1（自定义组合） | 需 `setInterval` + `@State` 手动计时 | — |
| `SurfaceView` | `XComponent` | L2 | 同 §5 | 同 §5 |

---

## 8. 使用弹窗

**官方子类**：Dialog（CustomDialog/openCustomDialog/AlertDialog/ActionSheet）、Menu、Toast、Popup、Sheet（bindSheet/bindContentCover）、OverlayManager

| Android 组件 | ArkUI 对应 | 能力层级 | 关键差异 | 常见坑 |
|-------------|-----------|---------|---------|-------|
| `AlertDialog` | `AlertDialog`（系统）/ `CustomDialog`（自定义） | L1 | 系统弹窗用 `AlertDialog.show()`，自定义用 `@CustomDialog` | `CustomDialogController` 须在 `@Component` 内声明 |
| `BottomSheetDialog` | `bindSheet`（半模态） | L1 | 声明式绑定到组件，非独立 Dialog | `showClose` / `dragBar` / `height` 控制 |
| `DialogFragment` | `bindContentCover`（全模态）或 `@CustomDialog` | L1 | 无 Fragment，用模态页面替代 | `bindContentCover` 支持全屏模态 |
| `DatePickerDialog` | `DatePicker` + `@CustomDialog` | L1 | DatePicker 是组件，非 Dialog | 需自行包裹在 `@CustomDialog` 中 |
| `Toast` | `promptAction.showToast` | L1 | 样式完全固定，不可自定义 | 只能设 `message` / `duration` / `bottom` |
| `Snackbar` | 无直接对应 | L2 | 需自定义 `@CustomDialog` 或 `Row` 动画 | 无法完全复现 Snackbar 行为 |
| `PopupWindow` | `bindPopup` | L1 | 声明式绑定到目标组件 | `popup` 属性链式配置 |
| `OptionsMenu` / `ContextMenu` | `bindMenu` / `bindContextMenu` | L1 | 声明式绑定 | `bindContextMenu` 需长按触发 |
| `PopupMenu` | `bindMenu` | L1 | 同上 | — |

---

## 9. 导航与路由

**官方子类**：Navigation、Router

| Android 组件 | ArkUI 对应 | 能力层级 | 关键差异 | 常见坑 |
|-------------|-----------|---------|---------|-------|
| `Activity` | `UIAbility` + 页面 | — | 页面路由在 UIAbility 内管理 | HAR 不可注册 UIAbility，须由宿主代理 |
| `Fragment` | `@Component` | L1 | 无 Fragment 机制，用组件替代 | 用 `@Builder` 或 `@Component` 实现可复用 UI 片段 |
| `FragmentManager` | `Navigation` / `NavRouter` | L1 | 声明式导航栈 | `Navigation` 推荐替代 `Router` |
| `Intent` | `Want` | — | 字段名和语义完全不同 | 参见 `ohos-coding-guide/want-navigation.md` |
| `NavController` | `Navigation` + `NavPathStack` | L1 | 声明式导航栈 | `NavPathStack` 管理路由栈 |
| `Deep Link` | `Link` + `Want` | — | URI 格式和注册方式不同 | 在 `module.json5` 的 `uris` 中配置 |

---

## 10. 添加交互响应

**官方子类**：Touch、Gesture（单一/组合/多层级）、Key/Mouse/Focus/Drag

| Android 机制 | ArkUI 对应 | 能力层级 | 关键差异 | 常见坑 |
|-------------|-----------|---------|---------|-------|
| `onTouchEvent` | `onTouch` | L1 | 事件类型 `Down/Move/Up/Cancel` | `event.touches[0].x/y` 是**绝对坐标** |
| `GestureDetector` | `.gesture()` / `.parallelGesture()` | L1 | 声明式链式绑定 | `PanGesture` 的 `offsetX/Y` 是**偏移量**，Down 时为 0 |
| `ScaleGestureDetector` | `PinchGesture` | L1 | `scale` 是相对比例 | 初始 scale 为 1 |
| `OnKeyListener` | `onKeyEvent` | L1 | — | — |
| `OnClickListener` | `onClick` | L1 | — | — |
| `OnLongClickListener` | `onTouch` 手动判断 / `LongPressGesture` | L1 | 长按用手势识别 | `LongPressGesture` 的 `duration` 设置触发时长 |
| `OnScrollListener` | `onScrollIndex` / `onScrollFrameBegin` | L1 | 声明式回调 | `onScrollFrameBegin` 可返回滚动偏移量 |
| `OnTouchListener`（拦截） | `.hitTestBehavior` | L1 | 透传/拦截控制 | `HitTestMode.Transparent` 透传，`Block` 拦截 |
| `requestDisallowInterceptTouchEvent` | `.priorityGesture` / `.parallelGesture` | L1 | 手势优先级控制 | 父子组件手势冲突用 `priorityGesture` |
| `drag & drop` | 统一拖拽 API | L1 | `onDragStart`/`onDrop` 等 | 需 `@ohos.abilityDraggable` 或 `allowDrop` |
| `NestedScrolling` | `nestedScroll` | L1 | `.nestedScroll({ scrollForward/scrollBackward })` | 配合 `Scroll` / `List` 使用 |

### 手势/触摸关键规则

| 规则 | 说明 |
|------|------|
| PanGesture offset 陷阱 | `PanGesture` 的 `offsetX/Y` 在 Down 时为 0，是偏移量非绝对坐标。需要绝对坐标做碰撞检测时，**必须用 `onTouch`** |
| 视觉中心取逻辑位置 | 可拖动元素的涟漪/动画中心应取元素逻辑坐标，不用触摸点坐标 |
| 动画逐帧刷新 | `animateTo` 驱动 `@State` 变量做 Canvas 动画时，需用 `@Watch` 在每帧回调中调用重绘 |

---

## 11. 使用动画

**官方子类**：属性动画、帧动画、转场动画、粒子动画、动画曲线

| Android 机制 | ArkUI 对应 | 能力层级 | 关键差异 | 常见坑 |
|-------------|-----------|---------|---------|-------|
| `ObjectAnimator` | `animateTo` / 属性动画 `.animation()` | L1 | 声明式，修改 `@State` 自动动画 | `animateTo` 是命令式，`.animation()` 是声明式 |
| `ValueAnimator` | `animateTo` | L1 | 在 `onFinish` 回调中获取最终值 | — |
| `AnimatorSet` | 多个 `animateTo` 嵌套 | L1 | 无 Set 概念，串行用嵌套 | 并行动画在同一 `animateTo` 中修改多个 `@State` |
| `Transition` / `TransitionManager` | `transition` + `TransitionEffect` | L1 | 组件出现/消失动画 | 须配合 `if` 条件渲染触发 |
| `MotionLayout` | 无直接对应 | L2 | 需 `animateTo` + `@State` 手动编排 | 复杂运动路径需自定义 |
| `VectorDrawable` 动画 | `Canvas` / `Shape` 动画 | L1 | 无 AnimatedVectorDrawable | 用属性动画驱动 Shape 属性 |
| `Lottie` | 无直接对应 | L2 | 查 ohpm 三方库 | — |
| `ViewPager` 页面切换动画 | `Swiper` + `customContentTransition` | L1 | — | — |
| `SharedElement` 转场 | `SharedTransition` | L1 | `sharedTransitionOptions` 配置 | 两个页面组件用相同 `sharedTransitionTag` |

### 动画组件对外接口设计

ArkUI 自定义组件实例由框架创建，父组件通常通过状态变量和构造参数向子组件传值，而不是保存子组件实例后直接调用其 public 方法；状态变化会驱动相关组件刷新，`@Prop` 用于父到子同步，`@Watch` 用于监听可观察状态变化。因此迁移动画类 UI SDK 时，若 Android 侧通过 `setXxx()`、`startAnimation()` 等实例方法触发动画，HarmonyOS 侧应优先改成声明式外部契约：用 `@Prop` 暴露目标值、是否动画、动画时长/曲线等参数，并在 `@Watch` 中响应目标值变化，选择直接更新或调用 `animateTo` / `.animation()` / 内部动画逻辑。不要只在 `@Component struct` 内保留不可达的 public 方法。

---

## 12. 使用自定义能力

**官方子类**：自定义组合、自定义扩展（Modifier）、自定义节点（FrameNode/RenderNode/BuilderNode）、自定义渲染（XComponent）

本类别不直接对应 Android 组件，而是 Android **自定义 View 的实现方式**在 ArkUI 中的选型。详见 `custom-capability-selection.md`。

| Android 实现方式 | ArkUI 推荐层级 | 说明 |
|-----------------|--------------|------|
| 简单组合布局 | L1 自定义组合 | `@Component` + 系统容器 + `@Builder` |
| `onDraw` 自绘 | L1 自定义组合（Canvas） | `@Component` + `Canvas` |
| 在现有组件上叠加绘制 | L2 自定义扩展（DrawModifier） | `DrawModifier.drawBehind`/`drawFront` 等 |
| 在现有组件上扩展属性 | L2 自定义扩展（AttributeModifier） | `AttributeModifier` 5 个 apply 方法 |
| 完全自定义测量/布局/绘制 | L3 自定义节点（FrameNode + RenderNode） | `FrameNode` + `RenderNode.draw`，无 `setMeasureStrategy` |
| 需要轻量渲染节点 | L3 自定义节点（RenderNode） | `RenderNode` + 自定义 `draw` + `appendChild` |
| EGL/OpenGLES 渲染 | L4 自定义渲染（XComponent） | `XComponent` + NativeWindow |

---

## 13. XML 资源模式映射

Android 大量 UI 通过 XML 定义（布局、Drawable、动画），而非代码级自定义 View。本节按 XML 输入类型提供模式识别与映射方案。

### 13.1 XML Layout 文件级模式识别

| XML 模式信号 | 分类 | ArkUI 映射 | 关键约束 |
|-------------|------|-----------|---------|
| 根标签为 `ConstraintLayout`/`LinearLayout`/`FrameLayout`，文件名含 `activity_`/`fragment_` | 页面布局 | 单个 `@Component struct`，内部用 `Column/Row/Stack/RelativeContainer` 重组 | 须按 PRD 效果重新布局，不可逐标签平移 |
| 根标签含 `RecyclerView` 或被 `app:layoutManager` 引用 | 列表 Item 布局 | `ListItem` 内的 `@Component struct` 或 `@Builder` | 数据源须实现 `IDataSource` |
| 根标签含 `ViewPager`/`ViewPager2` | 页面切换布局 | `Swiper` + `TabContent` | — |
| `<include layout="@layout/xxx"/>` | 可复用片段 | `@Builder` 函数 | — |
| `<ViewStub/>` | 懒加载片段 | `if` 条件渲染 | — |
| 根标签含自定义 View 全限定名（如 `com.xxx.CustomSlider`） | 自定义 View 在 XML 中使用 | 先按 §12 决策树确定 L1/L2/L3/L4，再映射布局 | 自定义 View 和外层布局分开处理 |

### 13.2 XML Drawable 模式识别

#### shape

| Android `<shape>` 属性 | ArkUI 映射 | 组件 | 关键约束 |
|------------------------|-----------|------|---------|
| `<solid android:color="..."/>` | `.fill(color)` | Rect/Circle/Path/Ellipse 等 | 默认 fill 为 `Color.Black` |
| `<stroke android:width="..." android:color="..."/>` | `.strokeWidth(width).stroke(color)` | 同上 | 默认 stroke 为 `Color.Transparent`（不可见） |
| `<stroke android:dashWidth="4dp" android:dashGap="2dp"/>` | `.strokeDashArray([4, 2])` | 同上 | 数组交替：dash 长度、gap 长度 |
| `<corners android:radius="10dp"/>` | `.radius(10)` | **仅 Rect** | 其他 Shape 子组件无 radius |
| `<corners android:topLeftRadius="5" android:topRightRadius="10" android:bottomRightRadius="20" android:bottomLeftRadius="15"/>` | `.radius([5, 10, 20, 15])` | **仅 Rect** | 顺序：[topLeft, topRight, bottomRight, bottomLeft] |
| `<size android:width="..." android:height="..."/>` | 构造参数 `{width: ..., height: ...}` | 所有 Shape 子组件 | — |
| `<padding android:left="..."/>` | 容器 `.padding()`（非 Shape 属性） | CommonMethod | Shape 组件本身无 padding |
| `<gradient>` | ⚠️ **Shape.fill 不支持渐变** | 见下方渐变映射 | — |
| `android:shape="oval"` | `Ellipse()` 或 `Circle()` | Ellipse/Circle | — |
| `android:shape="line"` | `Line()` | Line | — |
| `android:shape="ring"` | `Path()` + SVG arc 命令 | Path | 无直接对应，需手写弧形路径 |

#### gradient（在 shape 内）

> ⚠️ Shape 子组件的 `.fill()` / `.stroke()` 只接受纯色（`ResourceColor`），**不支持渐变**。
> 渐变需通过以下方式实现：

| Android `<gradient>` 类型 | ArkUI 替代方案 | 适用场景 | 限制 |
|--------------------------|-------------|---------|------|
| `type="linear"` | `.linearGradient({ angle, colors: [[color1, pos1], [color2, pos2]] })` | 组件**背景**渐变 | 是容器背景，非 Shape 路径填充；形状规则时可用 `clipShape` 裁剪 |
| `type="radial"` | `.radialGradient({ center, radius, colors: [...] })` | 组件**背景**径向渐变 | 同上 |
| `type="sweep"` | `.sweepGradient({ center, start, end, colors: [...] })` | 组件**背景**扫描渐变 | 同上 |
| 任意类型（路径级渐变） | Canvas API + `ShaderEffect` | 需要沿路径填充渐变 | L1 Canvas 自绘，非声明式组件 |

#### selector

> Android `<selector>` 将状态映射到不同 Drawable。ArkUI 有**双机制**：

| 机制 | API | 支持的状态 | 支持的属性 | 适用场景 |
|------|-----|-----------|-----------|---------|
| **`.stateStyles()`** | `.stateStyles({ normal, pressed, disabled, focused, clicked, selected })` | 6 种（normal/pressed/disabled/focused/clicked/selected） | **仅通用属性**（backgroundColor/borderRadius/opacity 等） | 简单 selector，只需改背景/边框/透明度 |
| **`AttributeModifier`** | `implements AttributeModifier<XxxAttribute>`，5 个 apply 方法 | 5 种（Normal/Pressed/Focused/Disabled/Selected，无 clicked） | **包括组件私有属性**（Button.fontColor 等） | selector 需改组件私有属性，或需跨文件复用 |

| Android selector 状态 | `.stateStyles()` 属性 | `AttributeModifier` 方法 |
|----------------------|---------------------|------------------------|
| 默认（无状态） | `normal` | `applyNormalAttribute` |
| `state_pressed` | `pressed` | `applyPressedAttribute` |
| `state_focused` | `focused` | `applyFocusedAttribute` |
| `state_enabled="false"` | `disabled` | `applyDisabledAttribute` |
| `state_selected` / `state_checked` | `selected` | `applySelectedAttribute` |
| （ArkUI 独有） | `clicked` | ❌ 无对应方法 |

**选型规则**：优先用 `.stateStyles()`（简单）；需要组件私有属性时用 `AttributeModifier`。两者**不可嵌套**（`stateStyles` 不可在 `attributeModifier` 内调用）。

#### ripple

> ⚠️ ArkUI **无内置 Material ripple API**。`rippleColor`/`rippleRadius`/`borderless` 均不支持。

| 复杂度 | 替代方案 | 实现方式 |
|-------|---------|---------|
| 简单按压变色 | `.stateStyles({ pressed: { .backgroundColor(...) } })` | 状态切换，无动画 |
| 按压状态+组件私有属性 | `AttributeModifier.applyPressedAttribute()` | 状态切换，无动画 |
| 涟漪扩散动画 | L1 Canvas 自绘：`@State @Watch` + `animateTo` + `drawAll()` | 参见 `ohos-coding-guide/ui-coding.md` 第十二节 |
| 涟漪叠加在现有组件上 | L2 DrawModifier：`drawBehind/drawFront` + `onTouch` + `invalidate()` | 绘制涟漪圆，用 `invalidate()` 触发重绘 |

#### layer-list / inset / clip

| Android Drawable | ArkUI 映射 | 关键约束 |
|-----------------|-----------|---------|
| `<layer-list>` | `Stack` + 多层 Shape 子组件 | 用 `zIndex` 或声明顺序控制层叠 |
| `<inset>` | `.padding()` + Shape | — |
| `<clip>` | `.clip(Shape)` 或 `clipShape` | — |

#### vector

| Android VectorDrawable | ArkUI 映射 | 关键约束 |
|----------------------|-----------|---------|
| `<vector>`（静态） | `Shape { Path().commands(pathData) }` | `android:pathData` 直接用作 `commands`，SVG 语法兼容 |
| `<vector>` 含 `<gradient>` | 渐变用 `.linearGradient()` 背景或 Canvas ShaderEffect | Shape.fill 不支持渐变 |
| SVG 文件加载 | `@ohos/svg` 三方库（ohpm） | 系统组件不原生支持 SVG |
| `$r('app.media.xxx')` | 仅支持 PNG/JPG/GIF，**不支持 SVG** | 需转 PNG 或改写为 Shape 代码 |
| `SymbolGlyph` | 系统符号图标组件（属"文本"类别） | 适用于系统图标，非自定义 vector |

#### animated-vector / animated-selector

| Android 动画 Drawable | ArkUI 映射 | 关键约束 |
|----------------------|-----------|---------|
| `<animated-vector>` | `animateTo` / `.animation()` 驱动 Shape `@State` 属性 | 无 AnimatedVectorDrawable，须拆解动画目标逐个实现 |
| `<animated-selector>` | `AttributeModifier` + `animateTo` | 状态切换动画需手动编排 |

### 13.3 XML Animation 模式识别

| Android XML 动画 | ArkUI 映射 | 关键约束 |
|-----------------|-----------|---------|
| `<objectAnimator>` | `animateTo({ duration, curve }, () => { this.prop = target })` | 修改 `@State` 自动触发属性动画 |
| `<set>`（并行） | 同一 `animateTo` 内修改多个 `@State` | — |
| `<set>`（串行） | 嵌套 `animateTo`，`onFinish` 回调启动下一段 | — |
| `<alpha>` | `animateTo(() => { this.opacity = x })` | — |
| `<scale>` | `animateTo(() => { this.scale = { x, y } })` | — |
| `<translate>` | `animateTo(() => { this.offset = { x, y } })` | — |
| `<rotate>` | `animateTo(() => { this.rotate = { angle } })` | — |
| `<propertyValuesHolder>` + `<keyframe>` | ⚠️ **无原生 keyframe API**；替代方案见下方 | — |

**关键帧动画替代方案**（Android `<keyframe>` / `<propertyValuesHolder>`）：

| 方案 | API | 适用场景 |
|------|-----|---------|
| 链式 `animateTo` 串行 | `animateTo({ onFinish: () => animateTo(...) })` | 多段起止值动画 |
| `@ohos.animator` 帧回调 | `Animator.create({ duration, begin, end })` + `onFrame(progress)` 手动插值 | 需要逐帧控制中间值 |
| `curves.customCurve()` | `curves.customCurve((fraction) => number)` | 自定义插值函数（仅控制时间曲线，不控制属性值） |
| 三方库 `@simple/stepanim` | ohpm 包，分步帧动画 | 步进式动画 |

**动画曲线映射**（Android Interpolator → ArkUI Curve）：

| Android Interpolator | ArkUI `Curve` / `curves.*` |
|---------------------|--------------------------|
| `LinearInterpolator` | `Curve.Linear` |
| `AccelerateDecelerateInterpolator` | `Curve.Ease` 或 `Curve.EaseInOut` |
| `AccelerateInterpolator` | `Curve.EaseIn` |
| `DecelerateInterpolator` | `Curve.EaseOut` |
| Material standard | `Curve.FastOutSlowIn` |
| Material deceleration | `Curve.LinearOutSlowIn` |
| Material acceleration | `Curve.FastOutLinearIn` |
| 自定义贝塞尔 | `curves.cubicBezierCurve(x1, y1, x2, y2)` |
| 弹簧 | `curves.springCurve(velocity, mass, stiffness, damping)` 或 `curves.springMotion(response, dampingFraction)` |
| 步进 | `curves.stepsCurve(count, end)` |
| 完全自定义 | `curves.customCurve((fraction) => number)` |
