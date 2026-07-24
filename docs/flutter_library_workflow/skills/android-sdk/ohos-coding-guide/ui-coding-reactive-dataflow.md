> API 签名和官方用法请从 `harmonyos-docs-lookup` 核实。

# 响应式数据流 — @Prop/@State/@Watch/@Link 行为规范

ArkUI 采用声明式响应式 UI。公开 setter 方法本身不会直接驱动界面刷新，只有当它修改了被 @State、@Prop、@Link 等响应式数据绑定使用的状态时，UI 才会更新。以下规则覆盖从 HAR 到 Demo 的完整数据流。

## 1. @State 所有权

每个 @State 变量有且仅有一个所有者——声明它的组件。只有所有者可以直接赋值修改它。子组件、兄弟组件、跨级组件均无权直接修改其他组件的 @State。

派生规则：
- 子组件通过 @Prop 读，通过回调写（→ §11 @Prop 只读投影）
- 兄弟组件共享 → 提升到最近公共祖先（→ §10 共享状态提升）

## 2. 外部输入必须接入响应式承载

外部传入的配置如果会影响 UI、布局、显隐、排序、可交互性或渲染内容，必须直接接入 `@Prop` / `@Link` / `@State` 驱动的表达式或明确同步链路。

- 不要把外部输入通过复杂 getter、setter 间接读取和设置属性，导致值变了但 UI 不刷新。
- 已存在的全局/共享状态源应优先更新原键值，而不是创建平行状态源，避免页面和组件各看各的值。

## 3. @Prop 影响派生状态必须加 @Watch

`@Prop` 变更不会触发 `aboutToAppear` / `onAreaChange`。如果 `@Prop` 影响派生计算状态（坐标、尺寸、索引、位置数组、绘制颜色、计算阈值、动画参数等），必须加 `@Watch` 回调重新计算，否则首次创建正确但动态变更后状态过期。

```typescript
// ❌ @Prop 变更后 slotPositions 不更新 → 绘制/交互异常
@Prop rangeCount: number = 5;
// slotPositions 仅在 aboutToAppear / onAreaChange 中计算

// ✅ @Watch 保证派生状态与 @Prop 同步
@Prop @Watch('onLayoutChanged') rangeCount: number = 5;
private onLayoutChanged(): void {
  this.preComputeDrawingPosition();
  this.drawAll();
}
```

同样适用于绘制颜色、动画方向等非布局类派生状态：

```typescript
// ❌ @Prop tintColor 变更后 tempTintColor 不更新
@Prop private tintColor: string = '#9CE949';
private tempTintColor: number = 0xFF9CE949;

// ✅ @Watch 保证绘制类派生状态与 @Prop 同步
@Prop @Watch('onTintColorChanged') private tintColor: string = '#9CE949';
private onTintColorChanged(): void {
  this.tempTintColor = ColorUtils.stringColorToInt(this.tintColor);
  this.drawAll();
}
```

## 4. @Watch 回调禁止写回被监听的 @Prop

`@Prop` 被父组件同步修改后触发 `@Watch`。如果 `@Watch` 回调又写回该 `@Prop`，框架会再次检测到变化并递归触发 `@Watch`。

```typescript
// ❌ @Watch 回调写回 @Prop → 死循环
@Prop @Watch('onIndexChanged') currentIndex: number = 0;
private onIndexChanged(): void {
  this.currentIndex = Math.max(0, Math.min(this.max, this.currentIndex));
}
// 父组件设 currentIndex=5 → @Watch 触发 → 写回钳制值 → @Watch 再次触发 → ...

// ✅ 用 @State 存储内部副本
@Prop @Watch('onIndexChanged') currentIndex: number = 0;
@State private clampedIndex: number = 0;
private onIndexChanged(): void {
  this.clampedIndex = Math.max(0, Math.min(this.max, this.currentIndex));
}
```

## 5. 异步回调回写必须写 @State

Android 中网络请求、传感器、定时器等异步回调改变 UI 状态很常见。在 ArkUI 中，异步回调回写**必须写 @State**。`@Prop` 在子组件中修改不会同步回父组件（@Prop 深拷贝），父组件再次修改 @State 时子 @Prop 同步更新，子组件对 @Prop 的直接修改会被覆盖。

## 6. Android 命令式方法 → 响应式状态转化

Android 上可以用 `view.method()` 通知另一个组件更新，ArkUI 中不存在"通知其他组件"的机制。组件之间依赖响应式数据流：

- 关系组件需要通过共同的父组件状态传递信息，或使用 `@Provide` / `@Consume` 在组件树中跨级传递
- 不是直接依赖相同 @State 的组件各自监听自己的状态，依赖关系应以数据流向为准

### 6.1 UI Controller / Manager 不是默认方案

如果 Android API 里有 controller / manager / helper，不要机械迁移成“controller 保存 ArkUI 组件实例，再调用组件 public 方法”。ArkUI 组件实例由框架托管，用户可见状态优先按以下顺序设计：

1. 父组件或宿主 `@State` 驱动子组件 `@Prop` / `@Link`，子组件用 `@Watch` 同步到内部绘制、布局或动画状态。
2. 全局弹窗、Toast、Snackbar、Loading、悬浮层等使用 Host/Portal + 状态对象，公开 API 只更新状态，Host 负责渲染。
3. 需要保留 `start()` / `stop()` / `reset()` 的资源型能力，用 controller/service 管理 timer、listener、播放器、网络、Native 或系统 controller，并通过回调/状态对象驱动 UI。

**禁止**：
- `private component: XxxComponent` 保存 `@Component struct` 实例。
- `setComponent(this)` / `bind(this)` 把组件实例交给 controller。
- 只改 controller/config 对象字段，期待 UI 自动刷新。
- 全局 static `show()` 直接创建 `@CustomDialog` 或视觉组件，但页面没有挂载 Host。

**允许**：官方系统 controller（如 `SwiperController`、`XComponentController`、`ShareController`）可以按官方 API 使用，但库对外仍应封装为响应式组件、Host 或薄 facade，并处理生命周期与异常边界。

## 7. @Link/@Prop 对象：禁止 setXxx 方法

`@Prop`/`@Link` 绑定复杂对象类型的组件（Controller、配置类型、UI 组件实例）时，**禁止在对象上设置 public setXxx 方法**。ArkUI 不会追踪通过 setXxx 写入的成员属性变化。所有触发 UI 刷新的状态变更必须通过对整个 `@State` / `@Prop` / `@Link` 属性的赋值来完成。

## 8. @State 渲染安全必须完整替换

`@State` 变量在渲染函数中引用时，ArkUI 会检测引用变化。修改数组内容（如 `push`、`splice`、索引赋值）或对象属性不会触发 UI 更新。必须用新对象/新数组完整替换。

```typescript
// ❌ push 不触发渲染
this.items.push(newItem);

// ✅ 完整替换触发渲染
this.items = [...this.items, newItem];
```

**例外**：`@Observed` 修饰的 class 实例配合 `@ObjectLink` 可追踪属性级变化。

## 9. @Prop 禁止 function 类型

**`@Prop` 禁止声明 function 类型**（运行时会 crash，errCode 140115）。事件回调属性必须使用**无装饰器属性**：

```typescript
// ❌ @Prop 声明回调 → 运行时 crash
@Prop onChange?: (value: number) => void;

// ✅ 无装饰器回调属性
onChange?: (value: number) => void;
```

## 10. 共享状态提升

当 N 个组件需要读写同一份数据时，该 @State 必须声明在它们的最近公共祖先中。
子组件通过 @Prop 读取，通过回调属性请求修改。

| 使用范围 | @State 位置 | 子组件访问方式 |
|---------|-------------|-------------|
| 单个组件 | 本组件 | @State 直接使用 |
| 父子组件 | 父组件 | @Prop 读取 + 回调修改 |
| 兄弟/堂兄弟 | 最近公共祖先 | @Prop 读取 + 回调修改 |
| 跨 N 层 | @Provide / AppStorage | @Consume / @StorageProp |

## 11. @Prop 只读投影

@Prop 是父 @State 的只读副本。子组件在任何情况下都不得修改 @Prop。修改 @Prop 本身或其成员属性对父 @State 无任何影响，也不会触发 UI 更新。

```
// ❌ 禁止 — 只改了本地副本，父 @State 无感知
this.prop = newValue;
this.prop.field = newValue;

// ✅ 正确 — 通过回调请求所有者修改
this.onValueChange?.(newValue);
```

## 12. @Prop 禁止依赖哨兵值做 if-else 优先级判断

**规则**：`@Prop` 参数始终有值（父组件传入或默认值）。禁止用魔数哨兵（如 `99999999`）配合 `!==` 控制 if-else 分支优先级。

| 错误模式 | 后果 |
|---------|------|
| `@Prop val: number = 99999999` + `if (val !== 99999999) { A } else if (cond) { B }` | 父组件传合法值时哨兵检测永远 true，分支 B 永远不可达 |

**正确做法**：
1. 将需要优先处理的逻辑放在 if 前半段（如 `gradientColors` 优先于 `cardBackgroundColor`）
2. 或用显式模式参数替代哨兵（`backgroundMode: number` 枚举）
3. 禁止用魔数 + `!==` 表示"未设置"

## 13. @Prop → @State 复制架构必须配 @Watch

Library 组件若采用 `@Prop` 初始化 `@State internal*` + setter 方法的架构，必须给每个在 `aboutToAppear()` 中复制到 `@State` 的 `@Prop` 添加 `@Watch` 装饰器。建议合并为单个 `syncInternalProps()` 方法集中同步：

```typescript
@Prop @Watch('syncInternalProps') tintColor: string = DEFAULT_TINT_COLOR;
@Prop @Watch('syncInternalProps') cornerRadius: number = DEFAULT_CORNER_RADIUS;
@State private internalTintColor: string = DEFAULT_TINT_COLOR;
@State private internalCornerRadius: number = DEFAULT_CORNER_RADIUS;

aboutToAppear() {
  this.syncInternalProps();
}

private syncInternalProps(): void {
  this.internalTintColor = this.tintColor;
  this.internalCornerRadius = this.cornerRadius;
}
```
 
> ⚠ 本条仅适用于该 `@Prop` **被所有调用方始终传入**的场景。若 `@Prop` 可能被部分调用方省略，见第 16 节「HAR 导出组件禁止未传入的 @Prop @Watch」。
 
---

## 14. @State/@Prop 初始化时机与字段声明顺序

`@Component` struct 的字段按声明顺序自上而下执行初始化器。如果字段 A 的初始化器中调用了某个方法，该方法通过 `this.fieldB` 访问字段 B，但 B 声明在 A 之后，则 B 的值为 `undefined`（即使 B 有默认值）。

**能不用行内初始化器调用复杂函数就不用。** `aboutToAppear()` 在所有字段初始化完成后才执行，是安全的初始化时机：

```typescript
// ❌ 字段声明顺序 = 初始化顺序 → 后声明的字段未就绪
@State config = this.buildConfig();   // 此时 strokeModeOn、COLORS 均为 undefined
@State strokeModeOn: boolean = true;  // @State getter 代理尚未建立
private COLORS: string[] = ['red'];   // 常量尚未赋值

// → this.strokeModeOn → @State getter 未就绪 → Cannot read property 'get' of undefined
// → this.COLORS.length                → COLORS 为 undefined → Cannot read property 'length' of undefined

// ✅ 行内只给默认值，aboutToAppear 中再初始化
@State config = new AnimatedPieViewConfig();
@State strokeModeOn: boolean = true;
private COLORS: string[] = ['red'];

aboutToAppear(): void {
  this.config = this.buildConfig();  // 安全：此时所有字段均已就绪
}
```

**安全性原则**：不要把依赖复杂字段初始化的逻辑放在行内初始化器中。能用 `aboutToAppear()` 就尽量用它。

---

## 15. @Builder 参数非响应性说明

`@Builder` 的参数**按值传递，不建立响应式依赖**。若原始类型（`number`/`string`/`boolean`）参数在 Builder 体内用于 UI 属性绑定（`.backgroundColor()`、`.fontColor()` 等），参数变化不会触发 Builder 内 UI 刷新。

**能正常工作的模式**：Builder 在同一个 struct 内直接引用自身 `@State` / `@Prop` 变量（`this.xxx`）：

```typescript
// ✅ @Builder 内读 this.@State → 状态变化触发 build() 重跑 → Builder 重新执行
@Builder
segmentButton(index: number) {
  Button()
    .backgroundColor(this.currentSelected === index ? this.tintColor : '#eee')
    .fontColor(this.currentSelected === index ? '#fff' : '#333')
}
```

**不能正常工作的模式**：原始类型通过参数传入 Builder：

```typescript
// ❌ isSelected 按值传递，backgroundColor 不响应变化
@Builder
iconButton(isSelected: boolean, label: string) {
  Button() {
    Text(label)
  }
  .backgroundColor(isSelected ? '#33b5e5' : '#eee')
}
```

**修复**：改为 `@Component` + `@Prop`。详见 `ui-coding-component-api.md` §4 编码规则。

注意：如果 `@Builder` 通过 `@BuilderParam` 跨组件传递，就不能再简单认为 `this.xxx` 一定处在原父组件的安全响应式边界内。跨组件 slot 里需要父状态、父方法或可交互回调时，优先封装为 `@Component + @Prop` / 回调；简单场景才用箭头函数包装保留 `this`。

---

## 16. HAR 导出组件禁止未传入的 @Prop @Watch

HAR 导出的 `@Component` 中，若 `@Prop @Watch` 未被所有调用方传入，首次渲染时崩溃：

```
Cannot read property set of undefined
    at setInitiallyProvidedValue (XxxComponent.ets:xx:xx)
```

**根因**：`setInitiallyProvidedValue` 需查找 `ObservedProperty` 建立观察链路，未传入的 `@Prop` 无此包装器 → `.set()` 时 `undefined`。

**❌ 错误**（PageA 传 count 但不传 type → 崩溃）：
```typescript
@Prop @Watch('onTypeChanged') type: string = 'dot';
```

**✅ 正确**：去掉 `@Watch`，初始化阶段处理：
```typescript
@Prop type: string = 'dot';
aboutToAppear(): void {
  if (this.type === 'badge') { this.adjustForBadgeMode(); }
}
```

父组件需主动触发子组件行为时，用 `rebuildContainer()` 销毁重建。

**与第 13 节的关系**：第 13 节要求 Library 组件的 `@Prop`（始终传入）加 `@Watch` 同步 `@State` 副本。本条禁止的是**不被所有调用方传入**的 `@Prop` 使用 `@Watch`。两者互补，适用范围不同。

**例外**：`@Prop @Watch` 若被**所有**调用方传入（如 `TagView.config`），则安全且推荐保留。

---
