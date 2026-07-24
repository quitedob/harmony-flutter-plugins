# UI 代码质量评估指南（维度 B · B2）

> 三方库白盒评估判据，专评 **UI 库代码的实现质量**——站在"这个组件库被集成进宿主后，是否状态正确、渲染流畅、运行稳定、可跨设备适配、对无障碍与深色模式友好"的视角；只列"评估者要检查什么"，不是 ArkUI 开发教程。本文档**仅当被评估库是 UI 库时适用**。

## 适用范围与分工（先读）

本文档是维度 B「代码质量」下的 **UI 专项 B2**，与同维度其它文档边界如下，避免重复评判：

| 关注点 | 归属文档 | 本文档是否覆盖 |
|--------|---------|:--:|
| 通用 SOLID / 耦合内聚 / 架构反模式 | A1 [通用架构评审](../architecture/general-architecture-review.md#solid-原则检查清单) | ❌ 仅引用 |
| UI 组件粒度 / 插槽契约 / 主题注入等 **UI 架构** | A2 [UI 架构评估](../architecture/ui-architecture-assessment.md) | ❌ 仅引用 |
| 纯逻辑 ArkTS 规范 / 复杂度 / 错误处理 / 加密安全 | B1 [代码质量评估](code-quality-assessment.md) | ❌ 仅引用 |
| **UI 渲染性能 / UI 资源释放 / 跨设备适配实现** | **B2（本文档）** | ✅ |

**与 B1 的迁移关系**：B1 [§5 性能](code-quality-assessment.md#5-性能) 与 [§4 错误处理与健壮性](code-quality-assessment.md#4-错误处理与健壮性) 中提到的"UI 库渲染性能 / UI 资源释放"判据，**实现细节全部下沉到本文档**；B1 只保留逻辑库视角，对 UI 部分一句话引用本文档。

跨设备适配天然横跨"代码实现"与"声明一致性"两个视角，本文档只评**代码实现**（vp/fp 单位、断点监听、栅格、触控目标、避让区），详见 [§5](#5-跨设备适配实现层cross-device-adaptation)。

本文档是 UI 库代码质量的**权威判据来源**，覆盖"状态管理正确性 / 组件结构与生命周期 / 渲染性能 / 稳定性与资源释放 / 跨设备适配 / 无障碍与深色"——判据蒸馏自 hmos-arkui-develop-skill 并按"库被宿主集成复用"的视角重写。

---

## 目录
- [§1 状态管理正确性](#1-状态管理正确性state-management-correctness)
- [§2 组件结构与生命周期](#2-组件结构与生命周期component--lifecycle)
- [§3 渲染性能](#3-渲染性能rendering-performance)
- [§4 稳定性与资源释放](#4-稳定性与资源释放stability--resource-release)
- [§5 跨设备适配（实现层）](#5-跨设备适配实现层cross-device-adaptation)
- [§6 无障碍与深色模式](#6-无障碍与深色模式accessibility--dark-mode)
- [§7 Previewer 友好（可选）](#7-previewer-友好可选previewer)
- [评估清单](#评估清单)

---

## §1 状态管理正确性（State Management Correctness）

库导出的可观测类与组件应正确选型，**不应强迫宿主采用某一套装饰器体系**；新代码优先 V2（`@Local`/`@Param`/`@Event`/`@Provider`/`@Consumer`/`@ObservedV2`+`@Trace`/`@Computed`/`@Monitor`），且**禁止在同一组件内混用 V1/V2**。

### 1.1 不混用 V1/V2（🔴）

V1（`@Component` + `@State`/`@Prop`/`@Link`/`@Observed`/`@ObjectLink`/`@Watch`）与 V2（`@ComponentV2` + `@Local`/`@Param`/`@Event`/`@ObservedV2`/`@Trace`/`@Monitor`/`@Computed`）是两套互斥体系。同一组件内混用会导致观测行为不可预测——库的公共组件出现混用即 🔴。

```typescript
// ❌ Bad —— V1 装饰器混进 V2 组件，刷新行为不可控
@ComponentV2
struct Counter {
  @State count: number = 0;   // V1 @State 进了 V2 组件
  @Param step: number = 1;
  build() { Text(`${this.count}`) }
}

// ✅ Good —— 统一 V2：内部状态 @Local，入参 @Param，跨层 @Provider/@Consumer
@ComponentV2
struct Counter {
  @Local count: number = 0;
  @Param step: number = 1;
  build() { Text(`${this.count}`) }
}
```

### 1.2 @Param/@Prop/@Link/@ObjectLink 不被直接修改（🔴）

`@Param`（V2）是父→子单向只读输入，子组件**禁止直接对其赋值**；需要回改时通过 `@Event` 上抛父组件。V1 的 `@Link`/`@ObjectLink` **禁止本地初始化**且变量本身不可重新赋值（仅可改其属性）。

```typescript
// ❌ Bad —— 子组件直接改只读入参，状态源失真
@ComponentV2
struct Stepper {
  @Param value: number = 0;
  build() { Button('+').onClick(() => this.value++) } // 改 @Param，行为不可控
}

// ✅ Good —— 通过 @Event 上抛，父组件持有数据源
@ComponentV2
struct Stepper {
  @Param value: number = 0;
  @Event onChange: (v: number) => void = () => {};
  build() { Button('+').onClick(() => this.onChange(this.value + 1)) }
}
```

V1 对照：`@ObjectLink obj` 内 `this.obj.name = 'x'` ✅（改属性），`this.obj = new Item()` ❌（变量赋值）。

### 1.3 深度观测：@Trace 既不过度也不缺失（🟡）

V2 深层对象观测用 `@ObservedV2` + `@Trace`（V1 用 `@Observed` + `@ObjectLink`）。判据：**只给确实需要驱动 UI 刷新的属性加 `@Trace`**——
- **缺失**：需要驱动渲染的嵌套属性未加 `@Trace`/未用 `@Observed` → 改值不刷新（功能 bug，🟡 偏 🔴）。
- **过度**：纯内部计数、不参与渲染的字段也加 `@Trace` → 无谓刷新开销（🟡）。

```typescript
// ❌ Bad —— 每个字段都 @Trace，内部序号变化也触发渲染
@ObservedV2
class Cart {
  @Trace items: Item[] = [];
  @Trace internalSeq: number = 0;   // 不参与渲染，不该 @Trace
}

// ✅ Good —— 仅渲染相关属性 @Trace；派生值用 @Computed
@ObservedV2
class Cart {
  @Trace items: Item[] = [];
  internalSeq: number = 0;          // 内部字段，不加 @Trace
  @Computed get total(): number {   // 派生值缓存
    return this.items.reduce((s, i) => s + i.price, 0);
  }
}
```

### 1.4 派生值用 @Computed，不在 build 内现算（🟡）

可由其它状态推导的值（总价、校验结果、格式化字符串）应用 `@Computed`（V2）缓存，避免每次 `build()` 重复计算与重复触发依赖刷新。V1 无 `@Computed`：轻量派生可用普通 getter/方法，昂贵派生再缓存进字段并以 `@Watch` 维护失效；临时计算别占状态变量。

```typescript
// ❌ Bad —— build 内现算派生值，每帧重复 reduce
build() { Text(`合计 ${this.items.reduce((s, i) => s + i.price, 0)}`) }

// ✅ Good —— @Computed 缓存，依赖不变不重算
@Computed get total(): number { return this.items.reduce((s, i) => s + i.price, 0); }
build() { Text(`合计 ${this.total}`) }
```

### 1.5 状态变量必须初始化（🔴）

`@State`/`@Local` 必须就地初始化（否则编译报错 / 运行时崩溃）；`@Link`/`@ObjectLink` 禁止本地初始化；`@Param` 若非 `@Require` 则需给默认值。详见 [§4 稳定性](#4-稳定性与资源释放stability--resource-release)。

### 1.6 无冗余状态变量（🟡）

库组件不应保留"从不变化"或"与 UI 无关联"的状态变量——它们徒增观测开销。常量应用 `const`/普通字段，临时计算用本地变量。

```typescript
// ❌ Bad —— 从不变化的常量却用状态变量包装
@Local title: string = '设置';   // 永不变更，却进了观测体系

// ✅ Good —— 常量用普通字段 / readonly
private readonly title: string = '设置';
```

> 人工白盒补充（CodeLinter 难覆盖）：①库是否**强制宿主**用某套装饰器（公共组件入参类型暴露 `@ObjectLink` 专属类型会绑死宿主）；②多组件共用同一数据源时是否做了条件更新而非全量刷新。

### 1.7 V1 @Builder 通过 @BuilderParam 传递时 this 上下文安全（🔴）

V1 `@Builder` 方法内若引用 `this.xxx`，通过**属性赋值语法**传给子组件 `@BuilderParam` 时，`this` 在子组件上下文中执行 → `this.xxx` 为 `undefined` → 运行时 crash。**必须使用尾随闭包语法**。

```typescript
// ❌ Bad —— 属性赋值语法，this 上下文丢失
@Component struct Parent {
  @Prop config: Config = getDefaultConfig();
  @Builder titleBuilder() { Text(this.config.title) }  // this.config → undefined
  build() { Child({ content: this.titleBuilder }) }     // ❌ 属性赋值
}

// ✅ Good —— 尾随闭包语法，this 绑定在父组件
@Component struct Parent {
  @Prop config: Config = getDefaultConfig();
  @Builder titleBuilder() { Text(this.config.title) }  // this.config ✅
  build() { Child() { this.titleBuilder() } }           // ✅ 尾随闭包
}
```

**多个 @BuilderParam**：尾随闭包只能传一个。引用 `this` 的用尾随闭包，其余改为 `@Prop` 配置/回调，将逻辑内联到子组件：

```typescript
// ✅ Good —— titleBuilder（引用 this）用尾随闭包；前景层改为 @Prop 内联
@Component struct Child {
  @Prop progressColor: ResourceColor = $r('app.color.progress');
  @BuilderParam titleContent: () => void;
  build() {
    Stack() {
      Row() { this.titleContent() }
      if (this.foregroundVisible) {
        Progress({ value: 0, total: 100, type: ProgressType.Linear })
          .color(this.progressColor)
      }
    }
  }
}

@Component struct Parent {
  @Prop config: Config = getDefaultConfig();
  @Builder titleBuilder() { /* 引用 this.config */ }
  build() {
    Child({ progressColor: $r('app.color.progress') }) { this.titleBuilder() }
  }
}
```

**排除**：V2 `@LocalBuilder` 始终在声明组件的 this 上下文执行，不受此规则约束。全局 `@Builder` 函数（非组件成员方法）无 `this` 上下文问题。

> 自动化检测：`dfx_stability.py` 可扫描 `@Builder` + `this` + 属性赋值语法的组合模式；跨文件传递、间接赋值等场景需人工白盒核对。

- [ ] 单组件内未混用 V1/V2 装饰器
- [ ] `@Param`/`@Link`/`@ObjectLink` 未被直接赋值修改，回改经 `@Event` 上抛
- [ ] 嵌套观测用 `@ObservedV2`+`@Trace`（或 V1 `@Observed`+`@ObjectLink`）；`@Trace` 不缺失也不过度
- [ ] 派生值用 `@Computed` 缓存，不在 `build()` 内现算
- [ ] 所有状态变量已正确初始化；无冗余/恒定状态变量
- [ ] 库不强制宿主采用特定装饰器体系
- [ ] V1 `@Builder` 引用 `this` 后通过 `@BuilderParam` 传递时使用尾随闭包语法，不使用属性赋值语法；多 `@BuilderParam` 时引用 `this` 的用尾随闭包，其余改为普通属性

---

## §2 组件结构与生命周期（Component & Lifecycle）

库视角：可复用组件应回收友好、入参边界清晰、`build()` 纯净。

### 2.1 build() 无副作用（🔴）

`build()` 仅描述 UI，**不得**在其中发起请求、做耗时计算、写状态变量、起定时器。副作用混入 `build()` 会随每次渲染重复触发，造成卡顿甚至死循环。

```typescript
// ❌ Bad —— build 内同步耗时 + 写状态，阻塞渲染并可能触发再渲染
build() {
  this.result = this.heavyCalc();  // 写状态 + 耗时，副作用进了 build
  Text(`${this.result}`)
}

// ✅ Good —— 副作用前置到生命周期，build 纯渲染
async aboutToAppear(): Promise<void> { this.result = await this.heavyCalc(); }
build() { Text(`${this.result}`) }
```

### 2.2 初始化/异步在 aboutToAppear，清理在 aboutToDisappear（🔴）

生命周期职责：`aboutToAppear`（build 前，做初始化与异步加载）、`aboutToDisappear`（销毁前，**释放所有资源**）、`onDidBuild`（build 后，API 12+）。资源释放细则见 [§4](#4-稳定性与资源释放stability--resource-release)。

### 2.3 @Reusable 配 aboutToReuse/aboutToRecycle（🟡）

频繁创建/销毁的列表项（List/Grid/WaterFlow 内）应用 `@Reusable`，并实现 `aboutToReuse(params)`（复用时按新参数刷新，**否则会残留上一条数据**）与 `aboutToRecycle`（回收时清理）。

```typescript
// ❌ Bad —— 标了 @Reusable 却不在复用时刷新数据，列表滚动后串行
@Reusable
@Component
struct Card {
  @State data: string = '';
  build() { Text(this.data) }   // 复用时仍是旧 data
}

// ✅ Good —— aboutToReuse 按新参数刷新；aboutToRecycle 清理
@Reusable
@Component
struct Card {
  @State data: string = '';
  aboutToReuse(params: Record<string, Object>): void { this.data = params.data as string; }
  aboutToRecycle(): void { /* 释放该项私有资源 */ }
  build() { Text(this.data) }
}
```

### 2.4 不活跃组件可 freezeWhenInactive（🟢）

后台/不活跃的复杂组件可用 `@Component('freezeWhenInactive:true')`（或 V2 对应能力）冻结，避免不可见时仍响应状态变化重渲染。库的重型组件提供此能力为加分项。

> 人工白盒补充：①库的入口/根组件不应携带"禁止本地初始化"的装饰器，否则 Previewer/独立挂载困难；②模块顶层不放重逻辑，避免拖慢懒加载。组件粒度与插槽契约属 UI 架构，见 [A2 UI 架构评估](../architecture/ui-architecture-assessment.md)。

- [ ] `build()` 无副作用（无请求/耗时/状态写入/起定时器）
- [ ] 初始化/异步在 `aboutToAppear`，清理在 `aboutToDisappear`
- [ ] 列表项等高频组件用 `@Reusable` 并实现 `aboutToReuse`（刷新数据）/`aboutToRecycle`
- [ ] 重型不活跃组件考虑 `freezeWhenInactive`
- [ ] 根组件不含禁止本地初始化的装饰器；模块顶层无重逻辑

---

## §3 渲染性能（Rendering Performance）

**量化目标**

| 指标 | 目标值 |
|------|-------|
| 帧率 | ≥ 60 fps |
| 启动时间 | < 2 s |
| 内存占用 | < 100 MB |

### 3.1 长列表用 LazyForEach/Repeat + 稳定 key + cachedCount + @Reusable（🔴）

List/Grid/WaterFlow 的大数据量场景**必须**用 `LazyForEach`（或 V2 `Repeat({ virtualScroll: true })`）按需渲染，配合 `cachedCount` 预缓存与 `@Reusable` 复用列表项。一次性 `ForEach` 渲染长列表会内存暴涨、首屏卡顿。

key 生成函数必须返回**唯一且稳定**的值，**动态内容绝不用 index 作 key**——index 作 key 会导致增删后复用错乱、状态丢失；且必须提供 keyGenerator。

```typescript
// ❌ Bad —— 长列表用 ForEach + index 作 key
List() {
  ForEach(this.items, (it: Item) => { ListItem() { Row() { Text(it.name) } } },
    (it: Item, idx: number) => idx.toString())   // index 作 key → 复用错乱
}

// ✅ Good —— LazyForEach 按需 + 稳定唯一 id 作 key + cachedCount
List() {
  LazyForEach(this.dataSource, (it: Item) => {
    ListItem() { ReusableRow({ item: it }) }
  }, (it: Item) => it.id)                          // 稳定唯一 key
}
.cachedCount(5)
```

> `cachedCount` 要适中：过小有滑动白块，过大徒增内存。Grid/WaterFlow 同理（缓存量 ≈ `cachedCount × 列数`）。

### 3.2 显隐用 .visibility() 而非 if 建销（🟡）

需要频繁显隐切换的昂贵组件，用 `.visibility(Visibility.Visible/None/Hidden)` 保留实例，而非 `if` 反复创建/销毁导致掉帧与状态重置。

```typescript
// ❌ Bad —— if 频繁建销复杂面板
if (this.show) { ComplexPanel() }

// ✅ Good —— visibility 切换，复用实例
ComplexPanel().visibility(this.show ? Visibility.Visible : Visibility.None)
```

### 3.3 扁平布局，去冗余容器（🟡）

减少布局嵌套层级；去掉无任何属性、仅做包裹的冗余容器；能用 `Row`/`Column` 表达的布局优先于 `Flex`；复杂叠放可用 `RelativeContainer` 拍平。循环内避免反复读状态变量/常量属性。

```typescript
// ❌ Bad —— 三层无属性容器空嵌套
Column() { Column() { Column() { Text('内容') } } }

// ✅ Good —— 扁平结构
Column() { Text('内容') }
```

### 3.4 动画走 GPU，不改布局属性（🟡）

动画优先用 `transform`/`scale`/`opacity`/`translate`（GPU 合成），避免在 `animateTo` 中改 `width`/`height`/`padding` 等触发重新布局/测算的属性。具体手法：布局变化用 scale 替代属性动画、进退场用 transition、合并同参 animateTo、两次 animateTo 之间勿改状态。

```typescript
// ❌ Bad —— 动画改宽度，触发布局重排
animateTo({ duration: 300 }, () => { this.w = 200; })

// ✅ Good —— scale，GPU 加速不重排
animateTo({ duration: 300 }, () => { this.scale = { x: 1.5, y: 1.5 }; })
```

### 3.5 图片：objectFit + 异步加载 + 解码控制（🟡）

库内/列表项图片应设 `objectFit`（如 `ImageFit.Cover`）避免变形，大图异步加载，GIF 启用硬件解码，并用缩略图/合适尺寸控制解码内存。插值档位过低/像素格式过低会产生锯齿与色阶，应选合适的插值档位与像素格式。

```typescript
// ❌ Bad —— 列表项里 syncLoad(true) 同步解码大图（阻塞 UI 线程、掉帧），且无 objectFit
Image(this.bigUrl).syncLoad(true)

// ✅ Good —— 默认即异步（省略 syncLoad，切勿在列表项写 syncLoad(true)）+ objectFit + 合理插值
Image(this.bigUrl).objectFit(ImageFit.Cover).interpolation(ImageInterpolation.Medium)
```

### 3.6 无高频日志（🟡）

库**不应**在 `build()`、滚动回调、动画帧、`@Monitor`/`onChange` 等高频路径打印日志；同时也不应泄漏调用方数据（见 [B1 §4](code-quality-assessment.md#4-错误处理与健壮性)）。

> 人工白盒补充：用 DevEco Profiler（Frame/Memory/CPU）实测是否达 ≥60fps / 启动 <2s / 内存 <100MB；检查列表项内是否频繁 `new` 复杂自定义组件、是否在滚动中触发同步 IO。

- [ ] 满足 ≥60fps / 启动 <2s / 内存 <100MB（Profiler 实测）
- [ ] 长列表用 `LazyForEach`/`Repeat` + 稳定 key（动态内容不用 index）+ `cachedCount` + `@Reusable`
- [ ] 显隐切换用 `.visibility()` 而非 `if` 建销
- [ ] 布局扁平、无冗余容器；优先 `Row`/`Column`；循环内不反复读状态/常量
- [ ] 动画用 `transform`/`scale`/`opacity`，不改布局属性
- [ ] 图片设 `objectFit`、异步加载、合理解码/插值；GIF 硬件解码
- [ ] 无高频路径日志输出

---

## §4 稳定性与资源释放（Stability & Resource Release）

库视角：UI 库长期持有的资源必须可被释放，并**对外暴露 `dispose`/`off`/`stop` 释放接口**让宿主回收。

### 4.1 资源成对释放（🔴）

在 `aboutToAppear`/显示时获取的资源，必须在 `aboutToDisappear`/隐藏时成对释放：定时器（`setInterval`/`setTimeout`）、订阅、事件监听、`overlay`、媒体（`AVPlayer`）、Lottie 动画、传感器/GPS、数据库查询结果。漏释放即内存泄漏 → 🔴。

```typescript
// ❌ Bad —— 定时器/overlay 永不清理，组件销毁后仍持有 → 泄漏
@Component
struct Live {
  private timer = setInterval(() => this.tick(), 1000);  // 起在字段初始化，永不清
  build() { /* ... */ }
}

// ✅ Good —— 生命周期内成对获取/释放
@Component
struct Live {
  private timer: number = -1;
  aboutToAppear(): void { this.timer = setInterval(() => this.tick(), 1000); }
  aboutToDisappear(): void {
    if (this.timer !== -1) { clearInterval(this.timer); this.timer = -1; }
    this.uiContext?.getOverlayManager().removeAllOverlays();
  }
  build() { /* ... */ }
}
```

### 4.2 库对外提供释放接口（🔴）

若库导出的是控制器/管理器类（如动画控制器、播放器封装、手势管理器），**必须**对外提供 `dispose()`/`off()`/`stop()` 让宿主主动回收——否则宿主无法防止泄漏。详见 [B1 §4 资源释放](code-quality-assessment.md#4-错误处理与健壮性)（逻辑库通用判据），本节聚焦 UI 控制器。

```typescript
// ❌ Bad —— 控制器内起监听但无释放 API
export class CarouselController { constructor() { this.subscribe(); } }

// ✅ Good —— 暴露 dispose 成对清理
export class CarouselController {
  start(): void { this.subscribe(); }
  dispose(): void { this.unsubscribe(); this.timer && clearInterval(this.timer); }
}
```

### 4.3 @Watch/@Monitor 无死循环（🔴）

`@Watch`（V1）/`@Monitor`（V2）回调中**无条件自改被监听变量**会触发死循环 → 冻结/崩溃。必须加终止条件。

```typescript
// ❌ Bad —— 回调里无条件自增，触发自身 → 死循环
@State @Watch('onTick') tick: number = 0;
onTick() { this.tick++; }

// ✅ Good —— 加终止条件
onTick() { if (this.tick < 100) this.tick++; }
```

### 4.4 判空守护（🔴）

访问可能为空的状态/入参前用 `?.`、`??` 或 `if` 守护，避免空指针崩溃；状态变量类型须与数据源一致。

```typescript
// ❌ Bad —— 直接访问可能未定义的对象
build() { Text(this.user.name) }   // user 可能 undefined → 崩溃

// ✅ Good —— 判空后访问
build() { if (this.user) { Text(this.user.name) } }
```

### 4.5 无组件↔handler 循环引用（🟡）

组件持有 handler、handler 反向强引用组件，会形成循环引用阻止回收。用弱引用或解耦（事件/回调）打破。

> 人工白盒补充：库 README/API 是否**文档化**了"用完需调用 `dispose`/`off`"的契约；列表项 `@Reusable` 的 `aboutToRecycle` 是否释放了该项私有资源（见 [§2.3](#2-组件结构与生命周期component--lifecycle)）。资源释放与 B1 [§4](code-quality-assessment.md#4-错误处理与健壮性) 互补：B1 管逻辑库与释放 API 是否存在，本节管 UI 组件生命周期内是否真的成对调用。

- [ ] 定时器/订阅/监听/overlay/媒体/Lottie/传感器/数据库查询在 `aboutToDisappear` 成对释放
- [ ] 库导出的控制器/管理器对外提供 `dispose`/`off`/`stop` 接口并文档化
- [ ] `@Watch`/`@Monitor` 回调有终止条件，无死循环
- [ ] 可空访问均有 `?.`/`??`/`if` 守护；状态类型与数据源一致
- [ ] 无组件↔handler 循环引用

---

## §5 跨设备适配（实现层）（Cross-device Adaptation）

> 本节评的是"代码实现"层面的适配。

### 5.1 尺寸用 vp、字体用 fp（🔴）

布局尺寸用 **vp**（随屏幕密度自适应），字体用 **fp**（随系统字体缩放）。**禁止写死 px/lpx 或写死像素宽高**，否则平板/2in1/折叠屏错位。

```typescript
// ❌ Bad —— 写死像素宽度、字号不随系统缩放
Column() { Text('标题').fontSize(16) }.width(360)

// ✅ Good —— 百分比/layoutWeight 自适应宽度，fp 字号
Column() { Text('标题').fontSize(16) }.width('100%')   // 16 默认 fp
```

### 5.2 栅格断点 GridRow/GridCol（🟡）

多设备布局用栅格 `GridRow`/`GridCol`（`columns`/`span` 按断点配置），或百分比/`layoutWeight` 自适应，而非单一写死布局。**断点系统**：

| 断点 | 宽度范围(vp) | 设备 |
|------|-------------|-----|
| xs | [0, 320) | 最小宽度 |
| sm | [320, 600) | 小屏（手机竖屏） |
| md | [600, 840) | 中屏（折叠屏展开/平板竖屏） |
| lg | [840, +∞) | 大屏（平板横屏/2in1/PC） |

```typescript
// ✅ Good —— 栅格按断点分配列数与跨度
GridRow({ columns: { xs: 2, sm: 4, md: 8, lg: 12 } }) {
  GridCol({ span: { xs: 2, sm: 4, md: 4, lg: 6 } }) { Column() { /* ... */ }.width('100%') }
}
```

### 5.3 监听断点/窗口尺寸变化（🟡）

布局随设备形态切换时，须监听变化：`GridRow().onBreakpointChange(bp => ...)` 或 `mediaquery.matchMediaSync('(width >= 840vp)').on('change', ...)`。监听器同样要在 `aboutToDisappear` 释放（见 [§4](#4-稳定性与资源释放stability--resource-release)）。

```typescript
// ❌ Bad —— 单一布局，旋转/分屏后不重排
GridRow({ columns: 4 }) { /* ... */ }

// ✅ Good —— 监听断点变化并切换布局
GridRow({ columns: { sm: 4, md: 8, lg: 12 } }) { /* ... */ }
  .onBreakpointChange((bp: string) => { this.breakpoint = bp; })
```

### 5.4 触控目标 ≈≥48vp（🟡）

可点击控件不应小于约 48vp（并可随 `fontSizeScale` 放大），含 `responseRegion` 响应区。

```typescript
// ❌ Bad —— 触控目标过小，触屏/适老化下难点
Button('确定').width(24).height(24)

// ✅ Good —— ≥48vp 且随字体缩放
Button('确定')
  .width(Math.max(48, 48 * this.fontSizeScale))
  .height(Math.max(48, 48 * this.fontSizeScale))
```

### 5.5 全屏避让区（🟡）

沉浸式/全屏 UI 须用 `expandSafeArea` 设置避让区，避开状态栏、导航条、刘海等。PC/平板需配置侧边导航。

```typescript
// ✅ Good —— 避让系统安全区
Column() { /* 内容 */ }.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.ALL])
```

> 人工白盒补充：库组件是否**硬编码**了仅手机可用的能力却号称支持平板/2in1；RTL 镜像（`Direction.Rtl`）与国际化资源是否到位（见 [B1 §1](code-quality-assessment.md#1-arkts-规范与正确性) 类型层面）。

- [ ] 尺寸用 vp、字体用 fp，无写死 px/lpx/像素宽高
- [ ] 多设备用 `GridRow`/`GridCol` 或百分比/`layoutWeight`，按 sm/md/lg 提供差异化布局
- [ ] 监听断点/窗口尺寸变化（`onBreakpointChange`/`matchMediaSync`）并切换布局，监听器随组件释放
- [ ] 可点击控件触控目标 ≈≥48vp（可随 `fontSizeScale` 放大）
- [ ] 全屏/沉浸式设置 `expandSafeArea` 避让区

---

## §6 无障碍与深色模式（Accessibility & Dark Mode）

UI 库是否对无障碍与深色模式友好，是**质量加分/扣分项**：缺失多为 🟡，关键交互控件完全无障碍不可用可升级为 🔴。

### 6.1 无障碍文本与分组（🟡）

可交互控件、图标按钮、纯图片应提供 `accessibilityText`/`accessibilityDescription`；信息卡片用 `accessibilityGroup(true)` 合并朗读，并给整组无障碍文本；纯装饰元素用 `accessibilityLevel('no')` 屏蔽。

```typescript
// ❌ Bad —— 图标按钮无无障碍文本，朗读器读不出
Button({ type: ButtonType.Circle }) { Image($r('app.media.close')) }

// ✅ Good —— 提供无障碍文本与描述
Button({ type: ButtonType.Circle }) { Image($r('app.media.close')) }
  .accessibilityText('关闭').accessibilityDescription('关闭当前弹窗')

// ✅ Good —— 卡片合并朗读
Column() { Text(this.title); Text(this.desc) }
  .accessibilityGroup(true).accessibilityText(`${this.title}，${this.desc}`)
```

### 6.2 深色模式适配（🟡）

UI 库不应写死颜色，应通过资源限定词（`resources/dark/`）或系统主题（`@StorageProp('colorMode')`）适配深色模式；实现深色模式还利于 OLED 降功耗。颜色对比度需达标，颜色值格式规范，且**不应仅以颜色传达信息**（色盲友好，配合图标/文字）。

```typescript
// ❌ Bad —— 写死浅色，深色模式下白底黑字刺眼/不可读
Column() { Text('内容').fontColor('#000000') }.backgroundColor('#FFFFFF')

// ✅ Good —— 用资源 / 跟随系统 colorMode
Column() { Text('内容').fontColor($r('sys.color.font_primary')) }
  .backgroundColor($r('sys.color.background_primary'))
```

### 6.3 适老化（🟢）

字体随 `fontSizeScale` 缩放、高对比度（`@StorageProp('highContrast')`）下提高对比，触控目标随缩放放大（见 [§5.4](#5-跨设备适配实现层cross-device-adaptation)）。

> 人工白盒补充：用 DevEco 无障碍检查器实跑，验证焦点顺序合理、所有可交互元素可朗读、深色/浅色两套均无对比度问题。

- [ ] 可交互元素/图标/图片有 `accessibilityText`；卡片用 `accessibilityGroup` 合并；装饰元素屏蔽
- [ ] 深色模式适配（资源限定词或 `colorMode`），不写死颜色
- [ ] 颜色对比度达标，不仅以颜色传达信息（色盲友好）
- [ ] 字体/触控目标随 `fontSizeScale` 缩放；支持高对比度

---

## §7 Previewer 友好（可选）（Previewer）

UI 库组件能在 DevEco Previewer 中独立预览，便于宿主开发者快速验证——为**可选加分项**（🟢）。

- 可本地初始化的组件属性应提供默认值，否则 Previewer 无法实例化。
- `@Preview` 组件不应调用页面级方法。
- `@Entry`/`@Preview` 根组件不应携带禁止本地初始化的装饰器，与 [§2.4](#2-组件结构与生命周期component--lifecycle) 呼应。

```typescript
// ❌ Bad —— @Require @Param 无本地默认值：可编译，但 Previewer 缺必填入参无法独立实例化
//   （注意区分：若写成 @Param items: Item[]; ——既非 @Require 又无默认值——那是 ArkTS 编译错误 🔴，归 §1，不在本节范畴）
@ComponentV2
struct Banner { @Require @Param items: Item[]; build() { /* ... */ } }

// ✅ Good —— 可本地初始化属性提供默认值，Previewer 可独立预览
@ComponentV2
struct Banner { @Param items: Item[] = []; build() { /* ... */ } }
```

- [ ] 可本地初始化属性提供默认值，组件可独立预览
- [ ] `@Preview` 组件不调用页面方法；根组件不含禁止本地初始化的装饰器

---

## 评估清单

### 状态管理正确性
- [ ] 单组件内未混用 V1/V2 装饰器
- [ ] `@Param`/`@Link`/`@ObjectLink` 未被直接赋值修改，回改经 `@Event` 上抛
- [ ] 嵌套观测用 `@ObservedV2`+`@Trace`（或 V1 `@Observed`+`@ObjectLink`）；`@Trace` 不缺失也不过度
- [ ] 派生值用 `@Computed` 缓存，不在 `build()` 内现算
- [ ] 所有状态变量已正确初始化；无冗余/恒定状态变量
- [ ] 库不强制宿主采用特定装饰器体系
- [ ] V1 `@Builder` 引用 `this` 后通过 `@BuilderParam` 传递时使用尾随闭包语法，不使用属性赋值语法；多 `@BuilderParam` 时引用 `this` 的用尾随闭包，其余改为普通属性

### 组件结构与生命周期
- [ ] `build()` 无副作用（无请求/耗时/状态写入/起定时器）
- [ ] 初始化/异步在 `aboutToAppear`，清理在 `aboutToDisappear`
- [ ] 列表项等高频组件用 `@Reusable` 并实现 `aboutToReuse`（刷新数据）/`aboutToRecycle`
- [ ] 重型不活跃组件考虑 `freezeWhenInactive`
- [ ] 根组件不含禁止本地初始化的装饰器；模块顶层无重逻辑

### 渲染性能
- [ ] 满足 ≥60fps / 启动 <2s / 内存 <100MB（Profiler 实测）
- [ ] 长列表用 `LazyForEach`/`Repeat` + 稳定 key（动态内容不用 index）+ `cachedCount` + `@Reusable`
- [ ] 显隐切换用 `.visibility()` 而非 `if` 建销
- [ ] 布局扁平、无冗余容器；优先 `Row`/`Column`；循环内不反复读状态/常量
- [ ] 动画用 `transform`/`scale`/`opacity`，不改布局属性
- [ ] 图片设 `objectFit`、异步加载、合理解码/插值；GIF 硬件解码
- [ ] 无高频路径日志输出

### 稳定性与资源释放
- [ ] 定时器/订阅/监听/overlay/媒体/Lottie/传感器/数据库查询在 `aboutToDisappear` 成对释放
- [ ] 库导出的控制器/管理器对外提供 `dispose`/`off`/`stop` 接口并文档化
- [ ] `@Watch`/`@Monitor` 回调有终止条件，无死循环
- [ ] 可空访问均有 `?.`/`??`/`if` 守护；状态类型与数据源一致
- [ ] 无组件↔handler 循环引用

### 跨设备适配（实现层）
- [ ] 尺寸用 vp、字体用 fp，无写死 px/lpx/像素宽高
- [ ] 多设备用 `GridRow`/`GridCol` 或百分比/`layoutWeight`，按 sm/md/lg 提供差异化布局
- [ ] 监听断点/窗口尺寸变化并切换布局，监听器随组件释放
- [ ] 可点击控件触控目标 ≈≥48vp（可随 `fontSizeScale` 放大）
- [ ] 全屏/沉浸式设置 `expandSafeArea` 避让区

### 无障碍与深色模式
- [ ] 可交互元素/图标/图片有 `accessibilityText`；卡片用 `accessibilityGroup` 合并；装饰元素屏蔽
- [ ] 深色模式适配（资源限定词或 `colorMode`），不写死颜色
- [ ] 颜色对比度达标，不仅以颜色传达信息（色盲友好）
- [ ] 字体/触控目标随 `fontSizeScale` 缩放；支持高对比度

### Previewer 友好（可选）
- [ ] 可本地初始化属性提供默认值，组件可独立预览
- [ ] `@Preview` 组件不调用页面方法；根组件不含禁止本地初始化的装饰器