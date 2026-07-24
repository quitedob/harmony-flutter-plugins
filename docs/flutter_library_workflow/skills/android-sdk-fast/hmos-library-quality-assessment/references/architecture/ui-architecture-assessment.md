# UI 架构评估指南（维度 A · A2）

> 三方库 UI 架构白盒判据：仅当被评估库是 **UI 库**（源码含 `@Component`/`@ComponentV2`/`@Builder`/`struct`）时适用。站在"这个 UI 组件库会被其他工程集成复用"的视角，评估库的 **UI 架构设计质量**——分层是否清晰、对外导出的是否为可复用通用组件、组件契约是否最小稳定、状态选型是否不绑架宿主、是否预留扩展点与可覆盖的资源/主题。**不是教人写页面**；UI 用法细节（性能/生命周期/资源释放等）归 [代码质量 · UI 代码质量（B2）](../code-quality/ui-code-quality-assessment.md)。

## 目录
- [§1 适用范围与维度分工](#1-适用范围与维度分工)
- [§2 MVVM 三层分层](#2-mvvm-三层分层)
- [§3 组件复用层级与导出边界](#3-组件复用层级与导出边界)
- [§4 组件对外契约设计](#4-组件对外契约设计)
- [§5 状态管理架构选型](#5-状态管理架构选型)
- [§6 UI 扩展性架构](#6-ui-扩展性架构)
- [§7 资源 / 主题 / i18n 的架构可覆盖性](#7-资源--主题--i18n-的架构可覆盖性)
- [§8 UI 架构红色速查](#8-ui-架构红色速查)
- [评估清单](#评估清单)

---

## §1 适用范围与维度分工

**何时启用本指南**：阶段 0 探测到库内存在 `@Component`/`@ComponentV2`/`@Builder`/`@BuilderParam`/`struct ... { build() }` 等声明式 UI 构造。纯逻辑库（无 UI 产物）跳过 A2。

**与其它维度的分工铁律**（避免重复评估，本指南只引用、不重述）：

| 关注点 | 归属 | 说明 |
|---|---|---|
| 通用 SOLID / 耦合内聚 / 反模式 / 分层依赖方向 | **A1** [通用架构评审基线](general-architecture-review.md) | UI 分层本质是 Clean Architecture 的具体化，原则不重述 |
| ArkTS 语法/复杂度/错误处理/加密安全 | **B1** [代码质量评估](../code-quality/code-quality-assessment.md) | 与 UI 无关的纯逻辑 |
| UI 用法细节：`build()` 副作用、生命周期、`@Reusable`/`LazyForEach` 性能、资源释放、跨设备适配的具体实现 | **B2** [UI 代码质量评估](../code-quality/ui-code-quality-assessment.md) | A2 只看"架构选型"，"怎么用对"看 B2 |

**A2 的独特视角**：A2 关心的是 *"库导出的 UI 单元能否被陌生宿主干净地复用、定制、换肤"*——即 UI 架构的**可复用性边界**。同一段代码，B2 问"用法是否正确"，A2 问"这个组件该不该被导出、契约面是否设计合理"。

- [ ] 已确认库含声明式 UI 构造，A2 适用（否则跳过）
- [ ] UI 用法细节交由 B2，本指南只评架构选型，未与 B2 重复

---

## §2 MVVM 三层分层

> 库视角：判断 Model / ViewModel / View 三层职责边界是否清晰、是否禁止跨层访问、下层是否不依赖上层。是 A1 [分层与依赖方向](general-architecture-review.md#分层与依赖方向) 在 UI 库的具体化。

**三层职责（评估者要核对的边界）**

| 层 | 职责 | 红线 |
|---|---|---|
| **Model**（`XxxModel.ets`） | 数据结构定义、数据获取/存储/更新 | 不得操作 UI；只通过通知告诉 ViewModel 数据已变 |
| **ViewModel**（`XxxViewModel.ets`） | 表示逻辑桥梁：向上刷新 UI、向下更新数据；按页面组织、懒加载 | 逻辑不得依赖 View 上某个具体控件的值 |
| **View**（`XxxView.ets`/`XxxComponent.ets`/`pages/`） | 仅 UI 展示与交互 | 不含业务逻辑；不得越层直访 Model |

**核心架构判据**
- **不可跨层访问**：View 只能经 ViewModel 访问 Model；Model 不直接操作 UI。
- **下层不依赖上层**：依赖方向恒为 `View → ViewModel → Model`；`Model` 不得 `import` `viewmodel/`，`viewmodel/` 不得 `import` `view/` 或具体页面。这是 A1 [分层与依赖方向](general-architecture-review.md#分层与依赖方向) 在 UI 库的落地——出现反向 import 即违反依赖规则。
- **非父子组件不直接互访**：禁止直接访问父组件或兄弟组件，必须经事件（`@Event`）或订阅（`@Provider/@Consumer`）。
- **业务逻辑下沉**：增删改查、校验、状态机等逻辑必须在 ViewModel/Model，不得混入 `build()` 或事件回调内联。

```typescript
// ❌ Bad —— View 越层直改 Model + 业务逻辑写进 View（不可测、不可复用、层泄漏）
@ComponentV2
struct TaskView {
  build() {
    Button('保存').onClick(() => {
      TaskStore.tasks.push(new TaskModel());                 // View 直接写 Model
      TaskStore.tasks = TaskStore.tasks.filter(t => t.valid); // 业务逻辑混入 View
    })
  }
}
```

```typescript
// ✅ Good —— 业务逻辑下沉到 ViewModel；View 仅调用，依赖方向 View→VM→Model
@ObservedV2
class TaskViewModel {                                  // viewmodel/TaskViewModel.ets
  @Trace tasks: TaskModel[] = [];
  addTask(t: TaskModel): void { this.tasks.push(t); }  // 业务逻辑在此
  pruneInvalid(): void { this.tasks = this.tasks.filter(t => t.valid); }
}
@ComponentV2
struct TaskView {                                      // view/TaskView.ets
  @Param vm: TaskViewModel = new TaskViewModel();
  build() {
    Button('保存').onClick(() => this.vm.addTask(new TaskModel())) // 只调 VM
  }
}
```

**分层判据靠人工白盒**：检查目录是否含 `model/`、`viewmodel/`、`view/`、`pages/`、`common/`，再逐文件核对 import 方向。

- [ ] Model 无 UI、View 无业务逻辑、ViewModel 仅作桥接
- [ ] 依赖方向恒为 View→ViewModel→Model，无下层反向 import 上层
- [ ] 非父子组件经 `@Event`/`@Provider/@Consumer` 通信，不直接互访
- [ ] 业务逻辑下沉 ViewModel/Model，未内联进 `build()` 或事件回调

---

## §3 组件复用层级与导出边界

> **这是 UI 库架构的核心判据**：库对外导出的应当是"通用组件"。若导出的组件内嵌 ViewModel / 业务逻辑 / 硬编码数据源，等同逻辑库把内部实现（`*Impl`）当公共 API 导出——属架构缺陷。

**组件三档复用层级（评估者据此给每个导出组件定级）**

| 层级 | 目录 | 是否含 ViewModel/业务逻辑 | 可跨工程复用 | 是否应出现在库导出面 |
|---|---|---|---|---|
| **页面组件** | `pages/` | 整体页面、跳转、前后台事件 | ❌ 强工程耦合 | ❌ 通常不导出 |
| **业务组件** | `view/` | ✅ 含 ViewModel/业务数据 | ❌ 绑定特定业务 | ❌ 不应导出给外部工程 |
| **通用组件** | `common/`/`shares/` | ❌ 无 ViewModel、与项目无关 | ✅ 可跨工程 | ✅ **库对外导出的就该是这一档** |

**核心架构判据**
- **导出面必须是通用组件**：被 `Index.ets` 导出的 UI 组件，应是无 ViewModel、不绑定具体业务/数据源的通用组件——数据从 `@Param` 注入、行为从 `@Event` 上抛。
- **导出业务组件 = 架构缺陷**：若导出的组件内部 `new XxxViewModel()`、`import` 业务网络层、硬编码 URL / 接口地址 / 用户数据，则该组件无法被陌生宿主复用，等同泄漏内部实现。
- **数据源外置**：通用组件不得自带数据获取逻辑（网络/数据库/`getRawFileContent`）；数据获取属业务组件/宿主职责，通用组件只接收已就绪的数据。
- **页面组件不入库**：`@Entry` 页面、路由跳转逻辑通常不应作为库的复用单元导出。

```typescript
// ❌ Bad —— 导出的"通用图表"内嵌 ViewModel + 硬编码数据源（外部工程无法复用）
// Index.ets: export { Chart } from './src/main/ets/view/Chart';
@ComponentV2
export struct Chart {
  @Local vm: ChartViewModel = new ChartViewModel();        // 内嵌业务 VM
  async aboutToAppear() {
    this.vm.data = await fetch('https://api.mycompany.com/metrics'); // 硬编码数据源
  }
  build() { /* 渲染 this.vm.data */ }
}
```

```typescript
// ✅ Good —— 导出通用组件：数据由 @Param 注入、交互经 @Event 上抛，宿主自带数据源
// Index.ets: export { Chart } from './src/main/ets/common/Chart';
// Index.ets: export type { ChartPoint } from './src/main/ets/common/types';
@ComponentV2
export struct Chart {
  @Require @Param data: ChartPoint[];          // 数据从外部注入，不自取
  @Param colorTheme: ResourceColor = $r('app.color.chart_primary');
  @Event onPointTap: (p: ChartPoint) => void = () => {};
  build() { /* 纯渲染 + 命中时 onPointTap 上抛 */ }
}
```

**组件层级定性靠人工白盒**：逐个 `Index.ets` 导出的 struct，核对其内部是否 `new *ViewModel`、是否 `import` 业务/网络层、是否硬编码数据源地址。

- [ ] 库 `Index.ets` 导出的 UI 组件均为通用组件（无 ViewModel、无业务耦合）
- [ ] 导出组件不内嵌数据获取（网络/数据库/rawfile），数据由 `@Param` 注入
- [ ] 业务组件（含 ViewModel）、页面组件（`@Entry`）未对外导出
- [ ] 无硬编码 URL/接口地址/用户数据混入导出组件

---

## §4 组件对外契约设计

> UI 组件的 `@Param`（只读入参）/ `@Event`（输出事件）/ `@BuilderParam`（插槽）三者，构成组件的**公共 API 面**，等价于逻辑库的 `Index.ets` 导出面。评估其是否最小、稳定、可组合，是否把内部状态泄漏为入参。

**契约的三类构件**

| 构件 | 角色 | 等价物 |
|---|---|---|
| `@Param`（只读，`@Require` 标必填） | 输入：父→子 | 函数入参 |
| `@Event`（回调函数） | 输出：子→父 | 返回值 / 事件 |
| `@BuilderParam`（UI 插槽） | 结构扩展点 | 高阶函数 / 插槽 |

**核心架构判据**
- **契约最小**：只暴露宿主确需控制的入参与确需感知的事件。组件内部状态（`@Local`、滚动位置、动画进度等）**不得**作为 `@Param` 泄漏到契约面——这等同把私有字段 public。参见 A1 [ISP 接口隔离](general-architecture-review.md#solid-原则检查清单)：契约面即公共接口，应小而专注。
- **输入只读、变更上抛**：`@Param` 不可在子组件内直接改写；需要改值时经 `@Event` 通知宿主（`@Param + @Event` 即受控双向，替代 V1 的 `@Link`）。把"可被组件内部改写的值"做成 `@Param` 是契约设计错误。
- **必填项显式**：无合理默认值的入参用 `@Require @Param` 标必填，而非给一个会误导的"假默认值"。
- **契约稳定**：入参/事件命名一致（领域词汇统一、`onXxx` 事件命名规范），类型用库自有的稳定类型，**不要把第三方依赖类型直接透传为入参类型**（否则换依赖即破坏契约）。
- **可组合**：通过 `@BuilderParam` 插槽让宿主注入子结构，组件本身不写死内部布局细节（详见 [§6](#6-ui-扩展性架构)）。

```typescript
// ❌ Bad —— 把内部状态泄漏为入参 + 入参被内部直改 + 用第三方类型当契约
@ComponentV2
export struct Dropdown {
  @Param isExpanded: boolean = false;    // 内部展开态泄漏为契约，宿主被迫管理
  @Param scrollOffset: number = 0;       // 纯内部状态，不该出现在公共面
  @Param items: thirdparty.RawList = []; // 第三方类型直接当契约，换库即破坏
  build() {
    Button('toggle').onClick(() => this.isExpanded = !this.isExpanded) // 直改入参
  }
}
```

```typescript
// ✅ Good —— 契约最小：只读入参 + 事件上抛 + 自有稳定类型 + 内部态留在 @Local
@ComponentV2
export struct Dropdown {
  @Require @Param items: DropdownItem[];                  // 必填，库自有类型
  @Param selected?: DropdownItem;                         // 受控可选
  @Event onSelect: (item: DropdownItem) => void = () => {}; // 输出上抛
  @Local private isExpanded: boolean = false;            // 内部态不入契约
  @Local private scrollOffset: number = 0;
  build() {
    Button('toggle').onClick(() => this.isExpanded = !this.isExpanded) // 改本地态 OK
  }
}
```

**契约最小性与稳定性靠人工白盒**：把每个导出组件的 `@Param`/`@Event` 列成"公共 API 清单"，逐项问"宿主真的需要控制它吗""它是内部实现细节吗""换底层依赖会破坏它吗"。

- [ ] `@Param` 仅暴露宿主确需控制的入参，内部状态未泄漏为入参
- [ ] `@Param` 只读，变更经 `@Event` 上抛（受控而非组件内直改入参）
- [ ] 无默认值的入参用 `@Require @Param` 标必填
- [ ] 契约类型为库自有稳定类型，未透传第三方依赖类型
- [ ] 入参/事件命名一致（领域词汇统一、事件 `onXxx`），契约可组合

---

## §5 状态管理架构选型

> 从**架构选型**角度评估（不是用法细节，用法细节归 B2）：V2 优先；库不应强迫宿主采用某套装饰器体系；跨层与全局状态的选型是否得当。

**核心架构判据**
- **V2 优先**：新代码采用 V2 装饰器体系（`@Local`/`@Param`/`@Event`/`@ObservedV2`+`@Trace`/`@Computed`/`@Provider/@Consumer`/`AppStorageV2`/`PersistenceV2`），V2 提供深度观测与属性级精准更新，输入/输出分离更清晰。**同一组件内禁止混用 V1/V2**。
- **不绑架宿主**：库导出的可观测类与组件，其装饰器选型不应外溢到宿主——不得要求"宿主必须用 V2/必须用某 `AppStorageV2` key/必须继承库的某基类"才能用组件。契约面只暴露 `@Param`/`@Event`，宿主用什么状态体系管理传入的数据是宿主自由。
- **跨层选型**：组件树跨多层共享用 `@Provider/@Consumer`，而非层层 `@Param` 透传（prop drilling）。**但库提供者要谨慎**：`@Provider`/`@Consumer` 用同名 key 隐式耦合，库若占用通用 key（如 `'theme'`）可能与宿主冲突——库内跨层 key 应加命名空间前缀。
- **全局/持久化选型**：全局状态用 `AppStorageV2`，持久化用 `PersistenceV2`。**库不应擅自往全局存储写**：库占用全局单例存储等同 A1 [对外可变全局单例反模式](general-architecture-review.md#架构反模式识别)，多宿主/多实例间会互相串改。需要全局态时，应由宿主注入或经契约传入。
- **派生数据**：派生值用 `@Computed` 缓存（架构上属"计算属性"语义），其性能与正确用法细节归 B2。

```typescript
// ❌ Bad —— 库组件绑架宿主：强依赖全局单例 + 占用通用 Provider key + 混用 V1/V2
@ComponentV2
export struct UserBadge {
  @State name: string = '';                      // V1 装饰器混入 V2 组件
  @Consumer('theme') theme: string = 'light';    // 占用通用 key，易与宿主撞车
  aboutToAppear() {
    this.name = AppStorageV2.connect(...)!.name; // 强行读库自定义全局单例，宿主被绑架
  }
}
```

```typescript
// ✅ Good —— 不绑架：数据经契约注入；跨层 key 带命名空间；统一 V2
@ComponentV2
export struct UserBadge {
  @Require @Param name: string;                          // 数据由宿主注入
  @Consumer('mylib.theme') theme: AppTheme = defaultTheme; // 命名空间化的跨层 key
  @Local private hovered: boolean = false;               // 本地态统一 V2
  build() { /* 纯渲染 */ }
}
```

**"是否绑架宿主""跨层 key 是否命名空间化""是否擅写全局存储"靠人工白盒**。

- [ ] 新代码采用 V2 装饰器体系，单组件内未混用 V1/V2
- [ ] 库不强迫宿主采用特定装饰器体系/全局 key/基类
- [ ] 跨层用 `@Provider/@Consumer` 且 key 命名空间化，避免与宿主撞车
- [ ] 库未擅自占用 `AppStorageV2`/`PersistenceV2` 全局单例（全局态经契约注入）
- [ ] 派生数据用 `@Computed`（性能/用法细节见 [B2](../code-quality/ui-code-quality-assessment.md)）

---

## §6 UI 扩展性架构

> 评估库的 UI 是否为宿主预留扩展点/插槽，组件能否被宿主定制。对应 A1 [可扩展性评估](general-architecture-review.md#可扩展性评估) 在 UI 库的落地——把"暴露 hook/事件让使用方注入行为"具体化为 UI 的插槽与样式钩子。

**核心架构判据**
- **插槽机制**：用 `@BuilderParam` 让宿主注入子 UI 结构（自定义空态/头部/列表项/操作区），用 `@Builder`/`@LocalBuilder` 封装库内可复用 UI 片段，用 `wrapBuilder` 支持运行时动态选择 Builder。一个**毫无插槽、内部布局全写死**的组件，宿主只能整组件替换，扩展性差。
- **受控 / 非受控**：组件应支持受控模式（状态由宿主经 `@Param`+`@Event` 控制）与/或合理的非受控默认（内部 `@Local` 自管），让宿主自行选择介入程度。只提供非受控、宿主无法接管关键状态，是扩展性缺陷。
- **样式钩子 / 主题可覆盖**：关键视觉（主色、圆角、字号、间距）应通过 `@Param`（`ResourceColor`/`Length`/`@Styles`/`@Extend` 入口或主题对象）开放覆盖，而非写死。资源层面的可覆盖见 [§7](#7-资源--主题--i18n-的架构可覆盖性)。
- **避免过度扩展**：扩展点应解决真实定制需求，不要为"将来可能"堆砌大量 `@BuilderParam`（参见 A1 [过度工程/Patternitis](general-architecture-review.md#架构反模式识别)）。

```typescript
// ❌ Bad —— 列表组件无任何插槽，空态/行样式全写死，宿主无法定制
@ComponentV2
export struct DataList {
  @Require @Param items: Item[];
  build() {
    if (this.items.length === 0) {
      Text('暂无数据')               // 空态写死，宿主无法替换
    }
    List() {
      ForEach(this.items, (it: Item) => {
        ListItem() { Text(it.name).fontColor('#333333') } // 行结构与样式全写死
      })
    }
  }
}
```

```typescript
// ✅ Good —— 预留 @BuilderParam 插槽 + 样式钩子，宿主可定制空态与行结构
@ComponentV2
export struct DataList {
  @Require @Param items: Item[];
  @BuilderParam emptyView?: () => void;                 // 空态插槽（可选）
  @BuilderParam itemView: (item: Item) => void;         // 行结构插槽，宿主定制
  @Param itemTextColor: ResourceColor = $r('app.color.list_text'); // 样式钩子
  build() {
    if (this.items.length === 0) {
      if (this.emptyView) { this.emptyView() } else { Text($r('app.string.empty')) }
    }
    List() {
      ForEach(this.items, (it: Item) => { ListItem() { this.itemView(it) } })
    }
  }
}
```

**扩展点设计无直接规则，属人工白盒判据**：导出组件若大量硬编码颜色/字号，往往暗示缺样式钩子（资源化见 [§7](#7-资源--主题--i18n-的架构可覆盖性)）。

- [ ] 容器/列表类组件用 `@BuilderParam` 预留必要插槽（空态/项/头尾等）
- [ ] 组件支持受控模式（关键状态可由宿主经 `@Param`+`@Event` 接管）
- [ ] 关键视觉（主色/圆角/字号/间距）经 `@Param`/主题对象开放覆盖
- [ ] 扩展点贴合真实需求，无为"将来"堆砌的冗余插槽

---

## §7 资源 / 主题 / i18n 的架构可覆盖性

> 从"宿主能否定制"的架构角度评估：库 UI 是否用 `$r` 资源引用，以便宿主换肤/国际化覆盖，而非硬编码颜色/字符串/尺寸。

**核心架构判据**
- **颜色 / 尺寸 / 字符串走资源引用**：库内 UI 应使用 `$r('app.color.xxx')`、`$r('app.string.xxx')`、`$r('app.float.xxx')`，而非硬编码 `'#FF0000'` / 字面量文案 / 魔法像素。资源化后，宿主可通过覆盖同名资源或限定词目录（深色 `dark/`、多语言 `zh_CN/en_US`）实现换肤与国际化，**无需改库源码**——这是 UI 库可被定制的架构基础。
- **深色模式可适配**：颜色资源应提供 `dark` 限定词版本（或允许宿主覆盖），库不应写死浅色，否则宿主无法落地深色模式。
- **文案不可硬编码**：所有面向用户的字符串走 `$r('app.string.*')`，使宿主可做多语言；硬编码中文/英文字面量是国际化架构缺陷。
- **资源命名约定**：库内资源 key 应有库命名空间前缀，避免与宿主资源 key 撞车被意外覆盖（或反之被宿主覆盖时可控）。
- **可覆盖性是契约的一部分**：哪些资源宿主可覆盖、覆盖点的 key，应被视为库的稳定约定（文档化），随意改 key 等于破坏定制契约。

```typescript
// ❌ Bad —— 硬编码颜色与文案，宿主无法换肤/国际化/适配深色
@ComponentV2
export struct Banner {
  build() {
    Column() {
      Text('立即购买')                 // 文案硬编码，无法多语言
        .fontColor('#FFFFFF')          // 颜色硬编码，无法换肤/深色
        .fontSize(16)                  // 魔法像素，不随主题/系统缩放
    }
    .backgroundColor('#FF5722')        // 硬编码主色
  }
}
```

```typescript
// ✅ Good —— 资源引用，宿主可经同名资源/限定词目录覆盖换肤与 i18n
@ComponentV2
export struct Banner {
  @Param accentColor: ResourceColor = $r('app.color.mylib_banner_bg'); // 可被入参覆盖
  build() {
    Column() {
      Text($r('app.string.mylib_buy_now'))      // 文案走资源，宿主可多语言
        .fontColor($r('app.color.mylib_banner_text'))
        .fontSize($r('app.float.mylib_banner_font'))
    }
    .backgroundColor(this.accentColor)
  }
}
```

**"是否资源化以支持宿主覆盖""资源 key 是否命名空间化"靠人工白盒**——静态检查至多查颜色/字号格式，查不出"该资源化却硬编码了一个看似合法的颜色枚举"。

- [ ] 颜色/尺寸/字符串经 `$r` 资源引用，无硬编码颜色/文案/魔法像素
- [ ] 颜色资源提供 `dark` 限定词或允许宿主覆盖，可适配深色模式
- [ ] 面向用户文案全走 `$r('app.string.*')`，支持宿主多语言
- [ ] 库资源 key 有命名空间前缀，可覆盖点为稳定约定

---

## §8 UI 架构红色速查

> 速查清单。与 A1/B2 分工：通用 SOLID/耦合/反模式见 [A1](general-architecture-review.md)；UI 用法/性能/资源释放见 [B2](../code-quality/ui-code-quality-assessment.md)。本节只列 **UI 架构特有**红色。

🔴 `[blocking]` 直接判为架构缺陷：
- 库 `Index.ets` 导出的 UI 组件**内嵌 ViewModel / 业务逻辑 / 硬编码数据源（URL/接口/用户数据）**——等同导出内部实现，陌生宿主无法复用（[§3](#3-组件复用层级与导出边界)）。
- 导出**业务组件 / `@Entry` 页面组件**作为复用单元（[§3](#3-组件复用层级与导出边界)）。
- 组件**内部状态泄漏为 `@Param`**，或 `@Param` 被组件内部直接改写（契约破坏，[§4](#4-组件对外契约设计)）。
- 库**擅自占用全局单例存储**，或 `@Provider/@Consumer` 用**通用同名 key（如 `'theme'`）未命名空间化**——与宿主组件树隐式耦合/撞车、多宿主间互相串改状态（[§5](#5-状态管理架构选型)）。
- **View 越层直访 Model / 下层反向 import 上层**，分层依赖方向错误（[§2](#2-mvvm-三层分层)）。

🟡 `[important]` 应处理：
- 关键视觉/文案**硬编码**（`'#RRGGBB'`/字面量文案/魔法像素），宿主无法换肤/国际化/深色（[§7](#7-资源--主题--i18n-的架构可覆盖性)）。
- 契约面**透传第三方依赖类型**作入参/事件类型，换依赖即破坏契约（[§4](#4-组件对外契约设计)）。
- 容器/列表组件**无任何 `@BuilderParam` 插槽**、内部布局全写死，扩展性差（[§6](#6-ui-扩展性架构)）。
- 同一组件内**混用 V1/V2** 装饰器；新代码未用 V2（[§5](#5-状态管理架构选型)）。
- 跨层 `@Provider/@Consumer` 用**通用 key**（如 `'theme'`）未命名空间化（[§5](#5-状态管理架构选型)）。

💡 `[suggestion]` 启发式线索：
- 业务逻辑内联在 `build()`/事件回调，建议下沉 ViewModel（[§2](#2-mvvm-三层分层)）。
- 派生显示值未用 `@Computed`（架构语义；性能影响见 [B2](../code-quality/ui-code-quality-assessment.md)）。
- 为"将来可能"堆砌过多插槽/抽象（过度工程，参见 [A1](general-architecture-review.md#架构反模式识别)）。

---

## 评估清单

### §1 适用范围与维度分工
- [ ] 已确认库含声明式 UI 构造，A2 适用（否则跳过）
- [ ] UI 用法细节交由 B2，本指南只评架构选型，未与 B2 重复

### §2 MVVM 三层分层
- [ ] Model 无 UI、View 无业务逻辑、ViewModel 仅作桥接
- [ ] 依赖方向恒为 View→ViewModel→Model，无下层反向 import 上层
- [ ] 非父子组件经 `@Event`/`@Provider/@Consumer` 通信，不直接互访
- [ ] 业务逻辑下沉 ViewModel/Model，未内联进 `build()` 或事件回调

### §3 组件复用层级与导出边界
- [ ] 库 `Index.ets` 导出的 UI 组件均为通用组件（无 ViewModel、无业务耦合）
- [ ] 导出组件不内嵌数据获取（网络/数据库/rawfile），数据由 `@Param` 注入
- [ ] 业务组件（含 ViewModel）、页面组件（`@Entry`）未对外导出
- [ ] 无硬编码 URL/接口地址/用户数据混入导出组件

### §4 组件对外契约设计
- [ ] `@Param` 仅暴露宿主确需控制的入参，内部状态未泄漏为入参
- [ ] `@Param` 只读，变更经 `@Event` 上抛（受控而非组件内直改入参）
- [ ] 无默认值的入参用 `@Require @Param` 标必填
- [ ] 契约类型为库自有稳定类型，未透传第三方依赖类型
- [ ] 入参/事件命名一致（领域词汇统一、事件 `onXxx`），契约可组合

### §5 状态管理架构选型
- [ ] 新代码采用 V2 装饰器体系，单组件内未混用 V1/V2
- [ ] 库不强迫宿主采用特定装饰器体系/全局 key/基类
- [ ] 跨层用 `@Provider/@Consumer` 且 key 命名空间化，避免与宿主撞车
- [ ] 库未擅自占用 `AppStorageV2`/`PersistenceV2` 全局单例（全局态经契约注入）
- [ ] 派生数据用 `@Computed`（性能/用法细节见 B2）

### §6 UI 扩展性架构
- [ ] 容器/列表类组件用 `@BuilderParam` 预留必要插槽（空态/项/头尾等）
- [ ] 组件支持受控模式（关键状态可由宿主经 `@Param`+`@Event` 接管）
- [ ] 关键视觉（主色/圆角/字号/间距）经 `@Param`/主题对象开放覆盖
- [ ] 扩展点贴合真实需求，无为"将来"堆砌的冗余插槽

### §7 资源 / 主题 / i18n 的架构可覆盖性
- [ ] 颜色/尺寸/字符串经 `$r` 资源引用，无硬编码颜色/文案/魔法像素
- [ ] 颜色资源提供 `dark` 限定词或允许宿主覆盖，可适配深色模式
- [ ] 面向用户文案全走 `$r('app.string.*')`，支持宿主多语言
- [ ] 库资源 key 有命名空间前缀，可覆盖点为稳定约定
