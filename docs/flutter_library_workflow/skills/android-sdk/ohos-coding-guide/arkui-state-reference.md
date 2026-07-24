# ArkUI 响应式开发速查手册

本文件提炼自 HarmonyOS 官方文档，覆盖 V1 响应式开发核心知识点。供 agent 执行时快速查阅，无需搜索 6000+ 原始文档。

---

## 一、V1 状态装饰器速查

### @State：组件内私有状态

| 属性 | 说明 |
|------|------|
| 同步方向 | 组件内，不与父组件同步 |
| 初始化规则 | 必须本地初始化；父组件可传值覆盖（仅作初始值，后续不同步） |
| 观察范围 | 一级属性赋值；嵌套属性赋值**不可观察**；Array整体赋值及push/pop/splice等API可观察 |
| 可用类型 | number, boolean, string, enum, class, object, Array, Date(API10+), Map, Set(API11+), 联合类型 |
| 禁用类型 | Function |

**关键限制**
- 必须本地初始化，否则编译报错
- `this.obj.nested.prop = x` 不可观察，不会触发UI刷新
- 父组件传入undefined时使用本地默认值
- 父组件传入变量仅作为初始值，后续变化不会同步至@State

```typescript
@Entry @Component
struct MyComponent {
  @State count: number = 0
  build() {
    Column() {
      Button(`count: ${this.count}`)
        .onClick(() => this.count += 1)
    }
  }
}
```

---

### @Prop：父子单向同步（父→子覆盖，子改不同步回父）

| 属性 | 说明 |
|------|------|
| 同步方向 | 父→子单向 |
| 初始化规则 | 允许本地初始化（可选）；无本地初始化则必须父组件传入 |
| 观察范围 | 赋值变化 + class第一层属性；嵌套需配合@Observed |
| 可用类型 | 同@State |
| 禁用类型 | Function；深拷贝会丢失NAPI复杂类型（如PixelMap）、RegExp等 |

**关键限制**
- 深拷贝机制：除了基本类型/Map/Set/Date/Array外，拷贝会丢失类型
- 父组件数据源更新时会**覆盖**子组件本地所有修改
- 嵌套场景每层都要@Observed且每层都要被@Prop接收才能观察
- 深度嵌套建议不超过5层，否则深拷贝GC性能问题，推荐@ObjectLink替代
- 应用后台时@Prop无法从数据源更新，需即时同步推荐@Link

```typescript
@Component
struct Child {
  @Prop count: number = 0
  build() {
    Button(`child: ${this.count}`)
      .onClick(() => this.count--) // 不会同步回父组件
  }
}
@Entry @Component
struct Parent {
  @State count: number = 10
  build() { Column() { Child({ count: this.count }) } }
}
```

---

### @Prop → @State 复制模式必须配 @Watch

当在 `aboutToAppear()` 中将 `@Prop` 值复制到 `@State internal*` 变量时（典型场景：setter + @State 架构），必须给 `@Prop` 加 `@Watch` 回调。否则父组件通过 `@State` → `@Prop` 绑定更新后，`@State internal*` 不会同步，UI 不刷新。

```typescript
// ❌ internalTintColor 仅在 aboutToAppear 赋值一次，@Prop 更新后不同步
@Prop tintColor: string = '#000';
@State private internalTintColor: string = '#000';
aboutToAppear() { this.internalTintColor = this.tintColor; }

// ✅ @Watch 确保 @Prop 更新时同步到 @State
@Prop @Watch('onTintPropChanged') tintColor: string = '#000';
@State private internalTintColor: string = '#000';
aboutToAppear() { this.internalTintColor = this.tintColor; }
onTintPropChanged(): void { this.internalTintColor = this.tintColor; }
```

可合并为单个 sync 方法避免重复。

#### 三条件判断法（何时必须加 @Watch）

当某属性**同时满足以下三条**时，必须加 `@Watch`：
1. 有 `@Prop`（接收父组件初始值）
2. 有 `@State` 副本（运行时被 setter 修改）
3. 有公开 setter 方法修改该 `@State` 副本

> ⚠️ **覆盖 WU Plan 约束**：即使 WU Plan 的 `aboutToAppear` 示例代码未展示 `@Watch`，编码时仍然必须按三条件判断法补加。WU Plan 示例仅为示意，不得以此为由跳过。

编码完成后应自检完整性，见 `sub-sdk-code-writer.md` 中的 `### 编码后自检：@Prop → @State 同步完整性扫描`。

---

### @Link：父子双向同步

| 属性 | 说明 |
|------|------|
| 同步方向 | 双向（父子互相同步） |
| 初始化规则 | 禁止本地初始化，必须由父组件状态变量传入 |
| 观察范围 | 同@State（一级属性 + API调用）；嵌套需@Observed/@ObjectLink |
| 可用类型 | 同@State |
| 禁用类型 | Function |

**关键限制**
- 禁止本地初始化，否则编译报错
- 类型必须与数据源一致，否则编译报错
- 数据源必须是状态变量（@State/@Link等），常规变量初始化运行时崩溃
- 不建议在@Entry组件中使用
- 父组件传值语法：`Child({ aLink: this.aState })` 或 `Child({ aLink: $aState })`

```typescript
@Component
struct Child {
  @Link value: number
  build() {
    Button(`child: ${this.value}`)
      .onClick(() => this.value += 10)
  }
}
@Entry @Component
struct Parent {
  @State value: number = 0
  build() { Column() { Child({ value: this.value }) } }
}
```

---

### @Watch：状态变量变化回调

| 属性 | 说明 |
|------|------|
| 同步方向 | 补充装饰器，不改变同步方向 |
| 初始化规则 | 参数为必填字符串，指向同组件成员函数名 |
| 观察范围 | 仅监听可观察到的变化；使用**严格相等（===）**判断是否变化 |
| 可装饰变量 | 所有状态变量装饰器（@State/@Prop/@Link等）；不可监听常规变量 |
| 禁用类型 | 常规变量不可装饰 |

**关键限制**
- **初始渲染时不触发**，仅后续变化触发
- 使用===判断：`this.count = 1` 后再赋 `this.count = 1` 不会触发回调
- **无限循环风险**：回调中修改同一状态变量会导致递归；不要在回调中修改当前@Watch装饰的变量
- 参数必须是带引号的字符串方法名：`@Watch('onChange')`，不是`@Watch(onChange)`
- 不建议在回调中使用async/await，会影响渲染性能

```typescript
@Component
struct TotalView {
  @Prop @Watch('onCountUpdated') count: number = 0
  @State total: number = 0
  onCountUpdated(propName: string) { this.total += this.count }
  build() { Text(`Total: ${this.total}`) }
}
```

---

### @Observed / @ObjectLink：嵌套类对象属性双向同步

| 属性 | 说明 |
|------|------|
| 同步方向 | 双向（@ObjectLink与数据源共享同一对象引用） |
| 初始化规则 | @ObjectLink禁止本地初始化，必须父组件传入 |
| 观察范围 | @Observed类的所有属性（Object.keys）；嵌套类属性也需@Observed |
| 可用类型 | @Observed装饰的class实例；继承Date/Array/Map/Set的class实例；联合类型(API11+) |
| 禁用类型 | 简单类型（number/string/boolean）；未@Observed的class(API19前) |

**关键限制**
- **@ObjectLink变量只读不可整体赋值**：`this.obj = xxx` 运行时报错；`this.obj.prop = xxx` 允许
- 需要整体替换时在父组件操作：`this.parentState = newObj`
- 嵌套类属性若非@Observed装饰，其变化不可观察
- @Observed会改变class原型链，与其他类装饰器混用可能冲突
- 二维数组需声明 `@Observed class ObservedArray<T> extends Array<T> {}`

**LazyForEach + notifyDataChange 模式**
当数据源是`@State arr: ObservedClass[]`且使用LazyForEach时，修改数组项属性需通过`this.arr[i].prop = x`（@Observed代理触发），或`dataSource.notifyDataChange(i, newItem)`通知更新。

```typescript
@Observed
class Book { public name: string = '' }
@Component
struct BookCard {
  @ObjectLink book: Book  // 只读引用，不可 this.book = new Book()
  build() {
    Text(this.book.name)
      .onClick(() => { this.book.name = 'New' }) // 允许改属性
  }
}
@Entry @Component
struct Index {
  @State bag: Bag = new Bag(new Book('JS'))
  build() { BookCard({ book: this.bag.book }) }
}
```

---

### @Provide / @Consume：跨层级双向同步

| 属性 | 说明 |
|------|------|
| 同步方向 | 跨层级双向（祖先↔后代） |
| 初始化规则 | @Provide必须本地初始化；@Consume API20前不可本地初始化，API20+支持默认值 |
| 观察范围 | 同@State（一级属性 + API调用） |
| 可用类型 | 同@State |
| 禁用类型 | Function |

**关键限制**
- 通过变量名或别名绑定，类型必须一致否则隐式转换导致异常
- @Consume不可通过构造参数传入初始化（编译报错）
- @Provide的key重复定义运行时报错，需`allowOverride`参数允许重写
- @Consume查找不到@Provide时运行时报错（API20+有默认值则不报错）
- @BuilderParam尾随闭包场景this指向需注意，可能导致@Consume找不到@Provide；跨组件 BuilderParam 不要依赖父组件 `this` 或易变 `@State` 闭包捕获来驱动 UI，复杂交互优先改为 `@Component + @Prop` / 回调

```typescript
@Entry @Component
struct Ancestor {
  @Provide theme: string = 'dark'
  build() { Column() { Button('toggle').onClick(() => this.theme = 'light'); Descendant() } }
}
@Component
struct Descendant {
  @Consume theme: string  // 自动匹配祖先@Provide
  build() { Text(`theme: ${this.theme}`).onClick(() => this.theme = 'blue') }
}
```

---

### $$语法：系统组件内部状态双向同步

将TS变量引用传给系统组件，使变量与组件内部状态保持同步。

**支持的组件及参数**

| 组件 | 参数 | 组件 | 参数 |
|------|------|------|------|
| TextInput | text | TextArea | text |
| Search | value | Checkbox | select |
| CheckboxGroup | selectAll | Radio | checked |
| Toggle | isOn | Rating | rating |
| Slider | value | Select | selected, value |
| DatePicker | selected | TimePicker | selected |
| TextPicker | selected, value | Stepper | index |
| Swiper | index | Tabs | index |
| Panel | mode | SideBarContainer | showSideBar |
| MenuItem | selected | Refresh | refreshing |
| GridItem | selected | ListItem | selected |
| AlphabetIndexer | selected | BindSheet | isShow |
| BindContentCover | isShow | | |

```typescript
@Entry @Component
struct Example {
  @State text: string = ''
  build() {
    Column() {
      Text(this.text)
      TextInput({ text: $$this.text, placeholder: 'type...' })
    }
  }
}
```

---

## 二、应用级状态管理速查

### AppStorage（应用全局状态）

| 属性 | 说明 |
|------|------|
| 作用域 | 应用全局，跨 UIAbility（同一进程内） |
| 键类型 | string，必填，常量字符串 |
| 值类型 | number, boolean, string, Object, class, enum, Array；API 12+ 支持 Map, Set, Date, undefined, null 及联合类型 |
| 访问方式 | @StorageLink（双向同步） / @StorageProp（单向同步） / AppStorage.get/setOrCreate/link/prop |

**关键限制**
1. 装饰器参数必须为 string 类型，否则编译报错
2. 不支持装饰 Function 类型变量
3. 与 PersistentStorage 配合时，**必须先调用 PersistentStorage.persistProp** 再访问 AppStorage，否则会丢失持久化值
4. 不要在 AppStorage 中使用 Environment 预置环境变量名（如 languageCode）
5. AppStorage 仅在同一应用进程内共享；主线程内多个 UIAbility 实例可共享，UIExtensionAbility 与主进程不共享
6. 不建议用 @StorageLink 实现事件通知，应使用 emitter

```typescript
AppStorage.setOrCreate('propA', 47);
AppStorage.setOrCreate('propB', new Data(50));

@Entry @Component
struct TestStorage {
  @StorageLink('propA') storageLink: number = 1;      // 双向同步
  @StorageProp('propA') storageProp: number = 1;      // 单向同步
  @StorageLink('propB') storageLinkObject: Data = new Data(1);

  build() {
    Column() {
      Text(`link: ${this.storageLink}`).onClick(() => this.storageLink += 1)
      Text(`prop: ${this.storageProp}`).onClick(() => this.storageProp += 1)
    }
  }
}
```

---

### LocalStorage（页面级状态）

| 属性 | 说明 |
|------|------|
| 作用域 | 页面级，可跨页面共享（通过 windowStage.loadContent 或 getSharedLocalStorage） |
| 键类型 | string（必填，常量字符串） |
| 值类型 | number, boolean, string, Object, class, enum, Array；API 12+ 支持 Map, Set, Date, undefined, null 及联合类型 |
| 访问方式 | @LocalStorageLink（双向） / @LocalStorageProp（单向） / LocalStorage 实例方法（get/set/link/prop） |

**关键限制**
1. 装饰器参数必须为 string 类型，否则编译报错
2. 不支持装饰 Function 类型变量
3. 属性创建后**类型不可更改**，后续 set 必须使用相同类型值
4. getSharedLocalStorage 仅能获取当前 Stage 的 loadContent 传入的实例
5. @LocalStorageProp 本地修改不同步回 LocalStorage，会被 LocalStorage 更新覆盖

```typescript
let para: Record<string, number> = { 'PropA': 47 };
let storage: LocalStorage = new LocalStorage(para);
storage.setOrCreate('PropB', new Data(50));

@Entry(storage)
@Component
struct Parent {
  @LocalStorageLink('PropA') parentLink: number = 1;    // 双向同步
  @LocalStorageProp('PropB') parentProp: Data = new Data(0);

  build() {
    Column() {
      Text(`${this.parentLink}`).onClick(() => this.parentLink += 1)
      Child()
    }
  }
}

@Component
struct Child {
  @LocalStorageLink('PropA') childLink: number = 1;    // 自动继承父组件的 LocalStorage
}
```

---

### PersistentStorage（持久化状态）

| 属性 | 说明 |
|------|------|
| 作用域 | 应用级，持久化到磁盘，应用重启后恢复 |
| 键类型 | string |
| 值类型 | number, string, boolean, enum, 可 JSON 序列化的对象；API 12+ 支持 Map, Set, Date, undefined, null |
| 访问方式 | 通过 AppStorage 访问（@StorageLink/@StorageProp），需先调用 persistProp/persistProps 初始化 |

**关键限制**
1. **不支持嵌套对象**（对象数组、对象属性为对象），框架无法检测嵌套变化
2. 数据应**小于 2KB**，避免持久化大数据集或频繁变化的变量
3. 写入磁盘在 UI 线程**同步执行**，大量数据影响渲染性能
4. 必须在 UI 实例初始化后（loadContent 回调内）调用
5. 调用顺序：**先 PersistentStorage.persistProp，后 AppStorage.setOrCreate**，否则会丢失上次保存的值
6. 存储为 module 级别，不同 module 使用相同 key 会归属到最先调用的 module

```typescript
// EntryAbility.ets
onWindowStageCreate(windowStage: window.WindowStage): void {
  windowStage.loadContent('pages/Index', (err) => {
    if (err.code) return;
    PersistentStorage.persistProp('aProp', 47);    // 必须在 loadContent 回调内
  });
}

// 页面组件
@Entry @Component
struct TestPage {
  @StorageLink('aProp') aProp: number = 48;        // 通过 AppStorage 访问持久化值

  build() {
    Column() {
      Text(`${this.aProp}`).onClick(() => this.aProp += 1)  // 点击后值会被持久化
    }
  }
}
```

---

### Environment / @Env（设备环境变量）

| 属性 | 说明 |
|------|------|
| Environment 作用域 | 应用级，系统环境变量，只读 |
| @Env 作用域 | 组件级，响应式系统环境变量（API 22+），只读 |
| Environment 键 | accessibilityEnabled, colorMode, fontScale, fontWeightScale, layoutDirection, languageCode |
| @Env 键 | 仅支持 SystemProperties.BREAK_POINT |
| 访问方式 | Environment.envProp 写入 AppStorage → @StorageProp；@Env 直接在组件中声明 |

**Environment 内置参数**

| 键 | 类型 | 说明 |
|---|------|------|
| accessibilityEnabled | string | 是否启用无障碍屏幕阅读 |
| colorMode | ColorMode | LIGHT（浅色） / DARK（深色） |
| fontScale | number | 字体大小比例 |
| fontWeightScale | number | 字体粗细程度 |
| layoutDirection | LayoutDirection | LTR（从左到右） / RTL（从右到左） |
| languageCode | string | 当前系统语言（小写，如 zh） |

**关键限制**
1. Environment 需在 UIContext 明确时调用（如在 executeInScopedTask 内）
2. 环境变量不可修改，应使用 @StorageProp（单向）而非 @StorageLink
3. @Env 支持 @Component/@ComponentV2，变量类型必须为 uiObserver.WindowSizeLayoutBreakpointInfo
4. @Env 变量不允许初始化赋值，框架自动提供
5. @Env 不能与其他状态装饰器或 @Require 联用

```typescript
// Environment 用法
Environment.envProp('languageCode', 'en');          // 写入 AppStorage

@Entry @Component
struct UiEnvironment {
  @StorageProp('languageCode') lang: string = 'en'; // 通过 AppStorage 访问

  build() { Text(this.lang) }
}

// @Env 用法（API 22+）
import { uiObserver } from '@kit.ArkUI';

@Entry @Component
struct BreakpointPage {
  @Env(SystemProperties.BREAK_POINT) breakpoint: uiObserver.WindowSizeLayoutBreakpointInfo;

  build() {
    Column() {
      Text(`width: ${this.breakpoint.widthBreakpoint}`)
      Text(`height: ${this.breakpoint.heightBreakpoint}`)
    }
  }
}
```

---

### 对比表

| 存储类型 | 作用域 | 持久化 | 跨页面 | 跨 Ability | 同步方式 |
|----------|--------|--------|--------|------------|----------|
| AppStorage | 应用全局 | 否（内存） | 是 | 是（同进程） | @StorageLink 双向 / @StorageProp 单向 |
| LocalStorage | 页面级/Stage | 否（内存） | 是（需配置） | 是（同 Stage） | @LocalStorageLink 双向 / @LocalStorageProp 单向 |
| PersistentStorage | 应用级 | 是（磁盘） | 是 | 是 | 通过 AppStorage，自动同步磁盘 |
| Environment | 应用级 | 否 | 是 | 是 | 只读，通过 AppStorage 单向 |
| @Env | 组件级 | 否 | 否 | 否 | 只读，响应式，窗口环境变化时刷新 |

---

## 三、数据对象状态与MVVM模式

### @Track装饰器：class属性级精准更新

| 属性 | 说明 |
|------|------|
| 装饰目标 | class 的非静态成员属性 |
| 前置要求 | class 必须被 @Observed 装饰 |
| 触发条件 | 仅 @Track 装饰的属性变化触发刷新 |
| 未装饰属性 | 变化不触发刷新；若 class 中有 @Track 属性，则非 @Track 属性禁止在 UI 中使用 |

**关键限制**
- class 中使用 @Track 后，非 @Track 属性不能在 UI 中绑定或初始化子组件，否则运行时报错
- @Track 无深度观测功能，仅观测当前属性
- 建议不混用含 @Track 与不含 @Track 的 class 对象（继承、联合类型等场景易出错）

```typescript
@Observed
class LogTrack {
  @Track public str1: string;  // 仅 str1 变化触发刷新
  @Track public str2: string;  // 仅 str2 变化触发刷新
  constructor(str1: string) { this.str1 = str1; this.str2 = 'World'; }
}
class LogNotTrack {
  public str1: string;  // 任意属性变化触发整体刷新
  public str2: string;
}

@Entry @Component
struct Demo {
  @State logTrack: LogTrack = new LogTrack('Hello');
  @State logNotTrack: LogNotTrack = new LogNotTrack('Hello');

  build() {
    Column() {
      Text(this.logTrack.str1).fontSize(50)      // 仅 str1 变化时刷新
      Text(this.logTrack.str2).fontSize(50)      // 仅 str2 变化时刷新
      Button('change str1').onClick(() => this.logTrack.str1 = 'Bye')
      // 点击后：仅 Text1 刷新（精准）

      Text(this.logNotTrack.str1).fontSize(50)   // str1 变化时两 Text 都刷新
      Text(this.logNotTrack.str2).fontSize(50)   // str2 变化时两 Text 都刷新
      Button('change str1').onClick(() => this.logNotTrack.str1 = 'Bye')
      // 点击后：Text3、Text4 都刷新（冗余）
    }
  }
}
```

---

### MVVM + 嵌套对象观察速览

@Observed + @ObjectLink 用于嵌套对象/对象数组的深层属性观察（每层都需 @Observed）。MVVM 模式下 ViewModel 用 @Observed class 持有状态，子组件 @ObjectLink 接收，通过 ViewModel 方法修改属性触发 UI 刷新。

```typescript
// ViewModel：@Observed class 持有状态
@Observed class ThingViewModel {
  @Track thingName: string = 'Todo';
  @Track isFinish: boolean = false;
  updateIsFinish() { this.isFinish = !this.isFinish; }
}

// View：@ObjectLink 接收，调用 ViewModel 方法修改
@Component struct ThingComponent {
  @ObjectLink thing: ThingViewModel;
  build() {
    Row() {
      Text(this.thing.thingName)
        .decoration({ type: this.thing.isFinish ? TextDecorationType.LineThrough : TextDecorationType.None })
        .onClick(() => this.thing.updateIsFinish())
    }
  }
}

// Page：@State 持有 ViewModel 实例
@Entry @Component struct Index {
  @State viewModel: ThingViewModel = new ThingViewModel();
  build() { ThingComponent({ thing: this.viewModel }) }
}
```

---

## 四、组件扩展装饰器速查

### @Builder：自定义构建函数，复用固定 UI 结构

| 属性 | 说明 |
|------|------|
| 装饰目标 | 全局 function 或 struct 内方法 |
| 参数要求 | 支持按值/按引用传递；按引用仅支持单参数对象字面量 |
| 可用组件 | 任意组件 |
| this 上下文 | 私有 Builder → 当前组件；全局 Builder → 调用方组件（bind 可改变） |

**关键限制**
- 禁止装饰状态变量或生命周期函数
- @Builder 默认按值传递；若把原始类型（number/string/boolean）作为普通参数传入并在 Builder 体内用于 UI 渲染，该 UI 不随参数变化更新
- 按引用传递只在“单参数 + 直接传入对象字面量”时生效；两个及以上参数、或同时混用按值/按引用时，不会触发 Builder 内动态刷新
- 同时存在 UI 数据与事件回调时，工程上优先改为 `@Component + @Prop` / 回调；确需 Builder 时，使用单参数对象字面量按引用，或 API 20+ 的 `UIUtils.makeBinding`
- 按引用传递时不能修改参数属性（除非用 mutableBinding）

```typescript
@Builder function globalBuilder(param: { text: string }) {
  Text(param.text).fontSize(20)
}
// 调用：globalBuilder({ text: this.label })  // 按引用传递，支持刷新
```

---

### @BuilderParam：UI 占位插槽，父组件注入自定义 UI

| 属性 | 说明 |
|------|------|
| 装饰目标 | struct 内变量（函数类型） |
| 参数要求 | 类型须匹配 @Builder 签名；尾随闭包场景无参数 |
| 可用组件 | 自定义组件内 |
| this 上下文 | 传递的 Builder 本身 → 子组件；箭头函数包裹 → 父组件 |

**关键限制**
- 只能被 @Builder 函数初始化，禁止其他类型赋值
- 尾随闭包：组件仅有一个 @BuilderParam 且无参数时可使用
- 与 @Require 联用时必须从外部初始化
- 跨组件传递 Builder 时，若内容依赖父组件 `this`、父 `@State` 或父方法，优先封装为 `@Component + @Prop` / 回调；箭头函数只适合简单保留词法 `this`，不能替代响应式数据流

```typescript
@Component
struct Child {
  @BuilderParam closer: () => void = this.defaultBuilder
  @Builder defaultBuilder() { Text('默认内容') }
  build() { Column() { this.closer() } }
}
// 父组件：Child() { Text('自定义内容') }  // 尾随闭包
```

---

### @LocalBuilder：维持组件父子关系，this 指向声明组件

| 属性 | 说明 |
|------|------|
| 装饰目标 | struct 内方法（禁止全局） |
| 参数要求 | 同 @Builder（按值/按引用/按回调） |
| 可用组件 | 所属组件及其子组件调用 |
| this 上下文 | 始终指向声明 @LocalBuilder 的组件（bind 无效） |

**关键限制**
- 仅限组件内声明，禁止全局定义
- 子组件调用父组件 @LocalBuilder 并传入子组件状态时，参数变化不会驱动该 @LocalBuilder 刷新；需访问声明者的状态变量，或改用 @Builder / @Component 承接子组件状态
- 作为参数时用 `() => { this.xxx() }` 形式，禁止直接传执行结果

```typescript
@Component
struct Parent {
  label: string = 'Parent'
  @LocalBuilder componentBuilder() { Text(this.label) }  // this 指向 Parent
}
// 传给子组件：Child({ builder: this.componentBuilder })  // 显示 "Parent"
```

---

### @Styles：多组件复用通用样式，无参数

| 属性 | 说明 |
|------|------|
| 装饰目标 | 全局 function 或 struct 内方法 |
| 参数要求 | 不支持任何参数 |
| 可用组件 | 所有组件（仅通用属性和事件） |
| this 上下文 | 组件内 @Styles 可访问组件状态变量 |

**关键限制**
- 仅支持通用属性，不支持组件私有属性
- 禁止逻辑组件（if/ForEach 等）
- 不支持 export，仅当前文件可用

```typescript
@Styles function globalStyle() {
  .width(100).height(50).backgroundColor(Color.Pink)
}
// 组件内：@Styles localStyle() { .width(this.widthValue) }
```

---

### @Extend：单组件扩展样式，支持参数和私有属性

| 属性 | 说明 |
|------|------|
| 装饰目标 | 全局 function（指定组件类型） |
| 参数要求 | 支持参数，可传状态变量、function |
| 可用组件 | 仅 @Extend 指定的单一组件类型 |
| this 上下文 | 无 this 访问 |

**关键限制**
- 仅全局定义，禁止组件内定义
- 不支持 export，仅当前文件可用
- 不与 @Styles 混用（但可调用其他 @Extend）

```typescript
@Extend(Text) function fancyText(size: number, color: Color) {
  .fontSize(size).fontColor(color).fontWeight(500)  // 可用 Text 的私有属性
}
// 调用：Text('Hello').fancyText(16, Color.Blue)
```

---

### @AnimatableExtend：为不可动画属性支持动画

| 属性 | 说明 |
|------|------|
| 装饰目标 | 全局 function（指定组件类型） |
| 参数要求 | number 或实现 AnimatableArithmetic<T> 接口的自定义类型 |
| 可用组件 | 仅指定组件类型 |
| this 上下文 | 无 this 访问 |

**关键限制**
- 仅全局定义
- 函数体内仅调用指定组件的属性方法
- 自定义类型须实现 plus/subtract/multiply/equals 方法

```typescript
@AnimatableExtend(Text) function animatableWidth(w: number) {
  .width(w)  // width 本就可动画，此处演示逐步布局效果
}
// 使用：Text('Demo').animatableWidth(this.w).animation({ duration: 200 })
```

---

### wrapBuilder：封装全局 @Builder 用于赋值、数组

| 属性 | 说明 |
|------|------|
| 装饰目标 | WrappedBuilder 对象（包装全局 @Builder） |
| 参数要求 | 模板参数匹配 @Builder 函数签名 |
| 可用组件 | struct 内调用 builder 属性 |
| this 上下文 | 同被封装的全局 @Builder |

**关键限制**
- 仅包装全局 @Builder，不支持私有 @Builder
- builder 属性方法仅限 struct 内使用
- 不支持二次赋值切换 @Builder（用 mutableBuilder 替代）

```typescript
@Builder function myBuilder(text: string, size: number) {
  Text(text).fontSize(size)
}
let arr: WrappedBuilder<[string, number]>[] = [wrapBuilder(myBuilder)]
// 调用：arr[0].builder('Hello', 20)
```

---

### mutableBuilder：支持动态切换全局 @Builder

| 属性 | 说明 |
|------|------|
| 装饰目标 | MutableBuilder 对象（继承 WrappedBuilder） |
| 参数要求 | 模板参数匹配 @Builder 签名 |
| 可用组件 | struct 内调用 builder 属性 |
| this 上下文 | 同被封装的全局 @Builder |

**关键限制**
- 仅包装全局 @Builder，私有 @Builder 编译报错
- builder 属性方法仅限自定义组件内，外部调用运行时崩溃
- 不与 wrapBuilder 混用，统一用 mutableBuilder

```typescript
@Builder function textBuilder(p: { text: string }) { Text(p.text) }
@Builder function buttonBuilder(p: { text: string }) { Button(p.text) }
@Local switchingBuilder: MutableBuilder<[{ text: string }]> = mutableBuilder(textBuilder)
// 切换：this.switchingBuilder = mutableBuilder(buttonBuilder)  // 支持动态更新
```

---

### stateStyles：根据组件状态设置不同样式

| 属性 | 说明 |
|------|------|
| 装饰目标 | 组件方法 |
| 参数要求 | 对象字面量，包含 normal/focused/pressed/disabled/selected 状态 |
| 可用组件 | 所有组件（仅通用属性） |
| this 上下文 | 可绑定组件普通变量和状态变量 |

**关键限制**
- 仅支持通用属性，不支持组件私有属性
- 获焦态仅支持外部键盘 Tab/方向键触发
- 私有属性不生效时用 attributeModifier 替代

```typescript
Button('Click')
  .stateStyles({
    normal: { .backgroundColor(Color.Blue) },
    pressed: { .backgroundColor(Color.Black) },
    focused: { .backgroundColor(this.focusColor) }  // 可用状态变量
  })
```

---

## 五、渲染控制速查

### ForEach（循环渲染）

| 签名 | `ForEach(arr, itemGenerator, keyGenerator?)` |
|------|------|
| arr 类型 | Array / Array&lt;T&gt; |
| itemGenerator | `(item: T, index?: number) => void` |
| keyGenerator | `(item: T, index?: number) => string` |

**关键限制**
- **键值必须唯一且稳定**：若键值相同，框架行为不可预测；若键值变化，组件将被销毁重建
- **不建议在键值中包含 index**：数组插入/删除后索引变化会导致渲染错乱、性能降低
- 默认键值生成函数：`index + '_' + JSON.stringify(item)`，复杂对象会占用更多内存，bigint 等类型会导致 jscrash

```typescript
interface Item { id: string; name: string; }

ForEach(this.list, (item: Item) => {
  ListItem() { Text(item.name) }
}, (item: Item) => item.id)  // 使用唯一 id 作为键值
```

---

### LazyForEach（数据懒加载）

| 签名 | `LazyForEach(dataSource, itemGenerator, keyGenerator)` |
|------|------|
| dataSource 类型 | IDataSource 实现类 |
| itemGenerator | `(item: T, index?: number) => void` |
| keyGenerator | `(item: T, index?: number) => string` |

**关键限制**
- 必须实现 IDataSource 接口，手动管理 listener 和通知更新
- 数据变化后必须调用对应的 `notifyDataXxx()` 方法：添加用 `notifyDataAdd`，删除用 `notifyDataDelete`，修改用 `notifyDataChange`
- 仅支持 List、Grid、Swiper、WaterFlow 容器组件；容器内只能有一个 LazyForEach
- 不支持状态变量直接驱动 dataSource 变化

**IDataSource 接口**

| 方法 | 说明 |
|------|------|
| totalCount() | 返回数据总数 |
| getData(index) | 返回指定索引数据 |
| registerDataChangeListener(listener) | 注册监听器 |
| unregisterDataChangeListener(listener) | 注销监听器 |

```typescript
class MyDataSource extends BasicDataSource {
  private dataArray: string[] = [];
  totalCount() { return this.dataArray.length; }
  getData(index: number) { return this.dataArray[index]; }
  pushData(data: string) {
    this.dataArray.push(data);
    this.notifyDataAdd(this.dataArray.length - 1);  // 必须通知
  }
}

LazyForEach(this.dataSource, (item: string) => {
  ListItem() { Text(item) }
}, (item: string) => item)
```

---

### Repeat（可复用的循环渲染）

| 签名 | `Repeat(arr).each(generator).key(keyGen).virtualScroll()` |
|------|------|
| arr 类型 | Array&lt;T&gt;（需配合 @Local 装饰） |
| .each | `(ri: RepeatItem&lt;T&gt;) => void` |
| .key | `(item: T, index?: number) => string` |
| .virtualScroll | `{ totalCount?: number, reusable?: boolean }` |

**关键限制**
- 仅支持 List、Grid、Swiper、WaterFlow 容器组件
- **必须配合状态管理 V2 装饰器**（@ComponentV2、@Local、@ObservedV2），混用 V1 装饰器会导致异常
- 键值必须稳定，键值变化则节点销毁重建；建议键值与 index 无关
- 容器内只能有一个 Repeat；子组件只能有一个根节点

```typescript
@Entry
@ComponentV2
struct Page {
  @Local data: Array<string> = [];

  build() {
    List() {
      Repeat(this.data)
        .each((ri: RepeatItem<string>) => {
          ListItem() { Text(ri.item) }
        })
        .key((item: string) => item)
        .virtualScroll({ totalCount: this.data.length })
    }
  }
}
```

**与 ForEach/LazyForEach 对比**
- Repeat 直接监听状态变化，无需手动实现 IDataSource
- Repeat 具备节点复用能力，滑动/数据更新性能更优
- Repeat 支持多模板渲染

---

### if/else（条件渲染）

| 特性 | 说明 |
|------|------|
| 基本语法 | `if (condition) { ComponentA() } else { ComponentB() }` |
| 可用位置 | build() 方法内、容器组件内部 |
| 禁止事项 | 不能在 @Builder 外使用、不能嵌套在组件属性设置中 |
| 更新机制 | 分支切换时销毁旧分支、创建新组件，不保留组件状态 |

```typescript
@Entry @Component
struct Page {
  @State toggle: boolean = true;

  build() {
    Column() {
      if (this.toggle) {
        Text('ON')
      } else {
        Text('OFF')
      }
      Button('切换').onClick(() => { this.toggle = !this.toggle; })
    }
  }
}
```

---

### LazyForEach 迁移 Repeat 要点

- **装饰器迁移**：`@Component` → `@ComponentV2`，`@State` → `@Local`
- **数据源迁移**：IDataSource 实现类 → `@Local Array<T>`
- **项生成函数**：`(item, index) => {...}` → `.each((ri: RepeatItem<T>) => {...})`，通过 `ri.item`、`ri.index` 访问
- **键值生成函数**：第三个参数 → `.key((item, index) => ...)`
- **数据更新方式**：`notifyDataXxx()` → 直接修改数组，状态管理 V2 自动监听
- **开启懒加载**：需调用 `.virtualScroll()`
- **组件复用**：Repeat 默认开启自身节点复用；若要改用 `@ReusableV2` 的复用生命周期，需要在 API 18+ 通过 `.virtualScroll({ reusable: false })` 关闭 Repeat 自身复用
- **模板渲染**：使用 `.templateId()` + `.template()` 替代手写 if 判断

---

## 六、交互组件回调签名速查

### Toggle（切换按钮）

**构造参数**：`Toggle(options: { type: ToggleType, isOn?: boolean })`
**ToggleType**：Button, Checkbox, Switch
**回调签名**：`.onChange((isOn: boolean) => void)`
**双向绑定**：`$$this.isOn`

```typescript
@State isOn: boolean = false
Toggle({ type: ToggleType.Switch, isOn: this.isOn })
  .onChange((isOn: boolean) => { this.isOn = isOn })
```

---

### Radio（单选框）

**构造参数**：`Radio(options: { value: string, group: string })`
**回调签名**：`.onChange((isChecked: boolean) => void)`
**双向绑定**：`$$this.checked`（通过 `.checked(boolean)` 属性）

```typescript
@State selected: string = 'Radio1'
Radio({ value: 'Radio1', group: 'radioGroup' })
  .checked(true)
  .onChange((isChecked: boolean) => { if (isChecked) this.selected = 'Radio1' })
```

---

### Checkbox（多选框）

**构造参数**：`Checkbox(options?: CheckboxOptions)`
**回调签名**：`.onChange((value: boolean) => void)`
**双向绑定**：`$$this.select`

```typescript
@State checked: boolean = false
Checkbox()
  .select(this.checked)
  .onChange((value: boolean) => { this.checked = value })
```

---

### CheckboxGroup（多选框组）

**构造参数**：`CheckboxGroup(options?: CheckboxGroupOptions)`
**回调签名**：`.onChange((itemName: CheckboxGroupResult) => void)` — itemName 包含 `name: string[]` 和 `status: boolean`
**双向绑定**：`$$this.selectAll`

---

### Slider（滑动条）

**构造参数**：`Slider(options?: SliderOptions)` — options: value, min, max, step, style, direction, reverse
**回调签名**：`.onChange((value: number, mode: SliderChangeMode) => void)`
**双向绑定**：`$$this.value`

**SliderChangeMode 枚举**

| 值 | 名称 | 说明 |
|---|------|------|
| 0 | Begin | 手势/鼠标接触或按下滑块 |
| 1 | Moving | 正在拖动滑块过程中 |
| 2 | End | 手势/鼠标离开滑块 |
| 3 | Click | 点击滑动条使滑块位置移动 |

```typescript
@State brightness: number = 50
Slider({ value: this.brightness, min: 0, max: 100, style: SliderStyle.InSet })
  .onChange((value: number, mode: SliderChangeMode) => { this.brightness = value })
```

---

### Rating（评分条）

**构造参数**：`Rating(options?: RatingOptions)` — options: rating, indicator, stars(default 5), stepSize(default 0.5)
**回调签名**：`.onChange((value: number) => void)`
**双向绑定**：`$$this.rating`

```typescript
@State rating: number = 3
Rating({ rating: this.rating })
  .onChange((value: number) => { this.rating = value })
```

---

### Select（下拉选择）

**构造参数**：`Select(options: Array<SelectOption>)` — SelectOption: value, icon, symbolIcon
**回调签名**：`.onSelect((index: number, value: string) => void)`
**双向绑定**：`$$this.selected` / `$$this.value`

```typescript
@State selectedIndex: number = 0
Select([{ value: '选项1' }, { value: '选项2' }])
  .selected(this.selectedIndex)
  .onSelect((index: number, value: string) => { this.selectedIndex = index })
```

---

### DatePicker（日期选择器）

**构造参数**：`DatePicker(options?: DatePickerOptions)` — options: start, end, selected, mode
**回调签名**：`.onDateChange((value: Date) => void)`（推荐） / `.onChange((value: DatePickerResult) => void)`（deprecated）
**双向绑定**：`$$this.selected`

**DatePickerResult**：`{ year, month, day }`

```typescript
@State selectedDate: Date = new Date()
DatePicker({ selected: this.selectedDate })
  .onDateChange((value: Date) => { this.selectedDate = value })
```

---

### TimePicker（时间选择器）

**构造参数**：`TimePicker(options?: TimePickerOptions)` — options: selected, format, start, end
**回调签名**：`.onChange((value: TimePickerResult) => void)`
**双向绑定**：`$$this.selected`

**TimePickerResult**：`{ hour, minute, second? }`

```typescript
@State selectedTime: Date = new Date()
TimePicker({ selected: this.selectedTime })
  .onChange((value: TimePickerResult) => {
    this.selectedTime.setHours(value.hour, value.minute)
  })
```

---

### TextPicker（文本选择器）

**构造参数**：`TextPicker(options?: TextPickerOptions)` — options: range, selected, value, columnWidths
**回调签名**：`.onChange((value: string | string[], index: number | number[]) => void)`
**双向绑定**：`$$this.selected` / `$$this.value`

```typescript
@State selectedValue: string = '选项1'
TextPicker({ range: ['选项1', '选项2', '选项3'] })
  .onChange((value: string, index: number) => { this.selectedValue = value })
```

---

### TextInput / TextArea / Search（文本输入）

**构造参数**：
- `TextInput({ placeholder?, text?, controller?, inputType? })`
- `TextArea({ placeholder?, text?, controller? })`
- `Search({ placeholder?, value?, controller?, icon? })`

**主要回调**：
- `.onChange((value: string) => void)` — 文本变化
- `.onSubmit((enterKey: EnterKeyType, event: SubmitEvent) => void)` — 回车提交
- `.onTextSelectionChange((selectionStart, selectionEnd) => void)` — 选区变化

**双向绑定**：`$$this.text` / `$$this.value`

```typescript
@State text: string = ''
TextInput({ placeholder: '请输入', text: $$this.text })
  .onChange((value: string) => { this.text = value })
```

---

## 七、手势系统速查

### 绑定方法

| 方法 | 签名 | 作用 | 父子优先级 |
|------|------|------|-----------|
| `.gesture()` | `.gesture(gesture: GestureType, mask?: GestureMask)` | 常规绑定手势 | 子组件优先识别 |
| `.priorityGesture()` | `.priorityGesture(gesture: GestureType, mask?: GestureMask)` | 带优先级绑定 | 父组件优先识别（覆盖子组件同类型手势） |
| `.parallelGesture()` | `.parallelGesture(gesture: GestureType, mask?: GestureMask)` | 并行绑定 | 父子同时响应，类似冒泡 |

> 长按手势特殊：系统优先响应 `duration` 最短的组件，忽略 `priorityGesture` 设置。
> 三种方法均不支持三目运算符切换。

```typescript
Text('tap').gesture(TapGesture().onAction(() => {}))
Column().priorityGesture(TapGesture().onAction(() => {}), GestureMask.IgnoreInternal)
Column().parallelGesture(TapGesture().onAction(() => {}), GestureMask.Normal)
```

---

### 单一手势回调签名

| 手势 | 构造参数 | 回调 | event 关键属性 |
|------|---------|------|---------------|
| `onClick` | `onClick(eventHandler: () => void)` | `onClick` | — |
| `TapGesture` | `{ count?: number }` | `onAction` | `fingerList[0]` |
| `LongPressGesture` | `{ fingers?: number, repeat?: boolean, duration?: number }` | `onAction` / `onActionEnd` | `repeat` |
| `PanGesture` | `{ fingers?, direction?, distance? }` 或 `PanGestureOptions` | `onActionStart` / `onActionUpdate` / `onActionEnd` | `offsetX`, `offsetY`, `source`(SourceType), `sourceTool`(SourceTool) |
| `PinchGesture` | `{ fingers?: number, distance?: number }` | `onActionStart` / `onActionUpdate` / `onActionEnd` | `scale`, `pinchCenterX`, `pinchCenterY` |
| `RotationGesture` | `{ fingers?: number, angle?: number }` | `onActionStart` / `onActionUpdate` / `onActionEnd` / `onActionCancel` | `angle` |
| `SwipeGesture` | `{ fingers?, direction?, speed? }` | `onAction` | `speed`, `angle` |

> PanGesture 默认最小距离 5vp；SwipeGesture 默认最小速度 100vp/s。两者同时绑定时先达阈值者触发。

---

### 组合手势

```typescript
GestureGroup(mode: GestureMode, gesture: GestureType[])
```

| GestureMode | 行为 | 典型场景 |
|-------------|------|---------|
| `Sequence` | 按注册顺序依次识别，任一手势失败则后续全部失败；仅最后一个手势可响应 `onActionEnd` | 长按+拖拽 |
| `Parallel` | 所有手势同时识别，互不影响，各自独立触发 | 单击+双击并存 |
| `Exclusive` | 同时识别，但第一个成功的手势会终止其他所有手势 | 单击/双击互斥 |

> `Sequence` 组合手势可通过 `.onCancel()` 监听整体取消。组合手势支持 `.tag('name')` 标记，用于冲突处理时识别。

---

### 冲突处理关键 API

#### 自定义手势判定

| 接口 | 签名 | 说明 |
|------|------|------|
| `onGestureJudgeBegin` | `(gestureInfo, event) => GestureJudgeResult` | 手势达到系统阈值时回调，返回 `REJECT` 拦截、`CONTINUE` 放行 |
| `onGestureRecognizerJudgeBegin` | `(event, current, others) => GestureJudgeResult` | 扩展版：可获取/操作所有识别器，调用 `setEnabled()` 动态开闭 |

#### 手势并行动态控制

| 接口 | 签名 | 说明 |
|------|------|------|
| `shouldBuiltInRecognizerParallelWith` | `(current, others) => GestureRecognizer | undefined` | 设置系统内置手势与指定手势并行 |
| `GestureRecognizer.setEnabled(boolean)` | — | 动态控制识别器是否响应回调 |
| `GestureRecognizer.getState()` | — | 返回 `GestureRecognizerState`（SUCCESSFUL 等） |

#### 命中测试模式

| HitTestMode | 说明 |
|-------------|------|
| `Default` | 默认，参与命中测试 |
| `Block` | 阻挡自身及子节点，拦截触摸事件 |
| `Transparent` | 自身透明不拦截，子节点可被穿透 |
| `TransparentDescendant` | 自身及子节点均透明 |

---

## 八、常见坑与最佳实践

### 状态不刷新 5 步定位法

| 步骤 | 检查要点 | 关键诊断手段 |
|------|---------|-------------|
| 1 | 状态变量是否收集到组件依赖（组件初始化时是否触发"读"操作） | ArkUI Inspector / hidumper |
| 2 | 状态变量赋值前后值是否真正改变 | `console` 打印赋值前后值 |
| 3 | 赋值操作是否可被状态框架观察 | `UIUtils.getTarget(obj) === obj` → `true` 表示**未**被代理（不可观察）；`@Watch` 回调是否执行；Profiler State 泳道 |
| 4 | 数据源与同步对象是否仍有关联关系（是否断链） | ArkUI Inspector 查看同步关系；`util.getHash()` 判断是否同一引用 |
| 5 | 组件更新函数是否被执行（渲染期间同步改状态会被丢弃） | 封装 getter 方法打日志观察重渲染；搜索 `has changed during render` 错误日志 |

---

### 高频坑

**1. 嵌套对象属性变更不触发刷新（缺 @Observed/@ObjectLink）**

```typescript
// ❌
class Inner { value: string = 'inner'; }
@State outer: Outer = new Outer(); // outer.inner.value 改变不刷新

// ✅
@Observed
class Inner { value: string = 'inner'; }
@ObjectLink inner: Inner; // 子组件用 @ObjectLink 接收
```

---

**2. @Watch 回调中写回被监听字段导致无限递归**

```typescript
// ❌
@State @Watch('onCount') count: number = 0;
onCount() { this.count = this.count + 1; } // 触发自身 → 死循环

// ✅
@State @Watch('onCount') count: number = 0;
@State displayCount: number = 0;
onCount() { this.displayCount = this.count; } // 写入另一个状态变量
```

---

**3. ForEach key 不变导致 @ObjectLink 断链**

```typescript
// ❌
ForEach(this.infos, (item: Info) => { Child({ info: item }) })
// 替换 infos[0] = new Info() 后 key 不变 → Child 不重建 → @ObjectLink 仍指向旧对象

// ✅
ForEach(this.infos, (item: Info) => { Child({ info: item }) },
  (item: Info) => `${item.id}:${item.version}`) // id 稳定，version 仅在整体替换时递增 → Child 按需重建
```

> key 必须唯一且稳定，否则会导致每次刷新都销毁重建，带来状态丢失和性能问题。

---

**4. 渲染期间同步修改状态变量（onComplete 回调中赋值）导致更新被丢弃**

```typescript
// ❌
.onComplete(() => { this.widthValue = 200; })
// 同步回调在渲染中执行 → "has changed during render" → 更新被丢弃

// ✅
.onComplete(() => {
  setTimeout(() => { this.widthValue = 200; }); // 异步执行，避开渲染周期
})
```

---

**5. @Prop 本地修改被父组件更新覆盖**

```typescript
// ❌
@Prop count: number = 0; // 深拷贝，本地修改不会同步回父组件
// 父组件再次赋值时，本地修改被覆盖

// ✅
@Link count: number; // 双向绑定，子组件修改同步回父组件
// 或：子组件不修改则用 @ObjectLink（无深拷贝开销）
```

---

**6. @Link 未用状态变量初始化（运行时 crash）**

```typescript
// ❌
@Link count: number;
// 父组件传入常量：Child({ count: 5 }) → 运行时报错

// ✅
@Link count: number;
// 父组件传入状态变量引用：Child({ count: this.countRef })
```

---

**7. Array/Map/Set 内部变更未触发刷新（赋值 vs API 调用混淆）**

```typescript
// ❌
this.dataArray = newDataSource; // 替换整个数组对象后，内部元素变更不可观察

// ✅
let tempList = new ChildList(); // 使用 @Observed 装饰的子类
for (let item of newDataSource) { tempList.push(item); }
this.childList = tempList; // ChildList 具备观察能力
```

---

**8. @Provide/@Consume alias 不匹配导致运行时错误**

```typescript
// ❌
@Provide('navStack') navStack: NavPathStack;
@Consume('navPath') navStack: NavPathStack; // alias 不匹配 → 运时报错

// ✅
@Provide('navStack') navStack: NavPathStack;
@Consume('navStack') navStack: NavPathStack; // alias 完全一致
```

---

**9. 状态变量未绑定 UI 导致不必要的重新渲染**

```typescript
// ❌
@State translateObj: Translate = new Translate(); // 未绑定任何 UI
@State buttonMsg: string = 'I am button'; // 仅读取无写入

// ✅
@State translateObj: Translate = new Translate(); // 有读写且绑定 UI
buttonMsg: string = 'I am button'; // 只读不改 → 用普通成员变量
```

---

**10. LazyForEach 数据替换后未调用 notifyDataChange**

```typescript
// ❌
item.message += '0';
this.data.reloadData(); // reloadData 重建所有组件，key 变化导致图片闪烁

// ✅
// 用 @Observed + @ObjectLink 直接修改属性触发精准刷新
@Observed class StringData { @Track message: string; }
@ObjectLink data: StringData;
// onClick 中：item.message += '0' → 自动触发 Text 刷新，无需 reloadData
```

---

**11. @Builder 参数按值传递用于 UI 渲染**

```typescript
// ❌ value 是原始类型按值传递，Builder 内用于渲染
@Builder
buildSliderControl(value: number, onChange: Function) {
  Slider({ value })
  Text(`${value}`)  // 值传递快照，不参与响应式
}

// ✅ @Component + @Prop
@Component
export struct SliderControl {
  @Prop value: number;
  onChange?: (v: number) => void;
  build() {
    Slider({ value: this.value })
    Text(`${this.value}`)  // @Prop 响应式
  }
}
```

**另一常见场景：`boolean` 参数用于 `.backgroundColor()` / `.fontColor()` 属性绑定**

```typescript
// ❌ isSelected 按值传递，属性绑定不响应变化
@Builder
iconButton(isSelected: boolean, label: string) {
  Button() {
    Text(label)
  }
  .backgroundColor(isSelected ? '#ff33b5e5' : '#ffe0e0e0')
  .fontColor(isSelected ? '#ffffff' : '#ff33b5e5')
}

// ✅ @Component + @Prop
@Component
export struct IconButton {
  @Prop isSelected: boolean = false;
  label: string = '';
  build() {
    Button() {
      Text(this.label)
    }
    .backgroundColor(this.isSelected ? '#ff33b5e5' : '#ffe0e0e0')
    .fontColor(this.isSelected ? '#ffffff' : '#ff33b5e5')
  }
}
```

---

**12. 自定义 class 内部容器用"引用替换"而非"元素直接写"**

```typescript
// ❌ 不触发响应式：直接写数组 / Map / Set 元素
class IntegerColor {
  protected intValues: number[] = [];
  setFrom(color: IntegerColor): void {
    for (let i = 0; i < color.intValues.length; i++) {
      this.intValues[i] = color.intValues[i];  // arr[i] = val — 不可观察
    }
  }
}

// ✅ 替换容器引用，被 @State / @Link 代理捕获
setFrom(color: IntegerColor): void {
  this.intValues = [...color.intValues];  // 新数组引用
}
```

---



**13. 群组操作必须迭代全部注册成员**：`Map<K, V>` + `register/unregister/forEach` 管理多个对象时，统一操作方法必须遍历所有成员，不能只操作第一个。

---

**14. @State/@Prop 行内初始化引用后声明字段**

`@Component` struct 字段按声明顺序初始化。若字段 A 的初始值调用的方法中通过 `this.fieldB` 引用了声明在 A 之后的字段，则 `fieldB` 值为 `undefined`，访问其属性会 crash。

```typescript
// ❌ config 先声明→先初始化，buildConfig() 中 this.strokeModeOn 仍是 undefined
@State config = this.buildConfig();
@State strokeModeOn: boolean = true;  // 声明在后，config 初始化时尚未就绪

buildConfig() { return new Config().strokeMode(this.strokeModeOn); }
// → "Cannot read property 'get' of undefined"（@State getter 未就绪）
// → "Cannot read property 'length' of undefined"（COLORS.length）
```

✅ **方案A**：被引用的非 @State 常量移到引用者之前声明。
✅ **方案B**：@State 行内只给默认值（`new Config()`），真实初始化延迟到 `aboutToAppear()`：
```typescript
@State config = new Config();
aboutToAppear() { this.config = this.buildConfig(); }  // 此时所有字段均已就绪
```

---

**15. @Component getter 抛异常导致模板绑定值 undefined**

```typescript
// ❌ getter 内 dip2px 抛异常 → this.pxResult 为 undefined → .toFixed(2) 崩溃
get pxResult(): number { return dip2px(value); }
Text(this.pxResult.toFixed(2))  // "Cannot read property toFixed of undefined"

// ✅ 改为带 try-catch 的方法
getPxResult(): number { try { return dip2px(value); } catch (e) { return 0; } }
Text(this.getPxResult().toFixed(2))
```

---

**16. `.clip()`/`.clipShape()` 不支持响应式更新；动态圆角用 `.borderRadius()`**

```typescript
// ✅ 响应式更新（state 变化后形状实时重算）→ borderRadius + clip(true)
Stack() { Column().backgroundColor('#D81B60') }
.borderRadius(this.radius).clip(true)

// ✅ 固定半径（首次渲染后不再变化）→ clipShape + clip(true)
Stack() { Column().backgroundColor('#D81B60') }
.clipShape(new Rect().radius([30])).clip(true)

// ❌ clip(Shape) 不响应 state 更新，改了也无效
Stack() { Column().backgroundColor('#D81B60') }
.clip(new Rect({ width: 200, height: 200 }).radius([this.radius]))

// ❌ Rect 默认 0×0 → 裁剪为空白
Stack() { Column().backgroundColor('#D81B60') }
.clip(new Rect().radius([30]))
```

---

### 装饰器选择优先级

| 优先级 | 装饰器组合 | 共享范围 | 适用场景 |
|--------|-----------|---------|---------|
| 1（优先） | `@State` + `@Prop` | 父子组件路径 | 简单类型、子组件无需实时同步修改 |
| 1（优先） | `@State` + `@Link` | 父子组件路径 | 复杂对象、需双向同步 |
| 1（优先） | `@State` + `@Observed` + `@ObjectLink` | 父子组件路径 | 嵌套对象深层属性、对象数组单项属性 |
| 2 | `@Provide` + `@Consume` | 祖先→后代子树 | 跨层级深、改动不频繁的"全局"状态（如路由） |
| 3 | `LocalStorage` | 单 Ability 内跨页面 | 单个 Ability 全局变量、跨页面共享 |
| 4（最后） | `AppStorage` | 应用全局 | 应用级全局变量、同一应用进程内多 UIAbility 实例共享 |

> **原则**：共享范围越小越好；层级深时 `@Provide/@Consume` 优于层层传递；子组件不改状态用 `@ObjectLink` 替代 `@Prop`（避免深拷贝）；用 `@Track` 精准控制属性级刷新。

---

## 附录：!! 语法支持的组件参数

| 组件 / 属性 | 支持参数 | 起始 API |
|------|---------|---------|
| TextInput / TextArea | text | 18 |
| Search | value | 18 |
| Toggle | isOn | 18 |
| Checkbox / CheckboxGroup | select / selectAll | 18 |
| Radio | checked | 18 |
| Rating | rating | 18 |
| Slider | value | 18 |
| Select | selected, value | 18 |
| MenuItem | selected | 18 |
| bindMenu | isShow | 18 |
| bindContextMenu | isShown | 18 |
| bindPopup | show | 18 |
| BindSheet / BindContentCover | isShow | 18 |
| SideBarContainer | sideBarWidth | 18 |
| Navigation | navBarWidth | 18 |

> **注意**：自定义组件间使用 `!!` 时对应 `@ComponentV2` 的 `@Param` / `@Event`（命名规则：`$` + 参数名）；系统组件参数场景支持基础类型状态变量，V1/V2 状态装饰器变量均可触发 UI 刷新。`DatePicker` / `TimePicker` / `TextPicker` 的 V1 双向同步仍按 `$$` 表处理。

## Canvas + 状态联动

Canvas 的绘制回调（`.onReady` → 用户 `onCanvasDraw()`）**只触发一次**。状态/属性变化后 Canvas 内容**不会自动重绘**，必须显式触发。

### 正确模式

所有影响渲染的 `@Prop` / `@State` 必须加 `@Watch`，统一调一个 `requestRedraw` 方法：

```typescript
@Component
export struct MyCanvasComp {
  @Prop @Watch('requestRedraw') thumbRadius: number = 10;
  @Prop @Watch('requestRedraw') thumbColor: string = '#FF0000';
  @Prop @Watch('requestRedraw') visible: boolean = true;
  @State @Watch('requestRedraw') isDragging: boolean = false;
  @Prop @Watch('onValueWatch') value: number = 0;

  private onValueWatch(): void {
    this.onValueChange();
    this.requestRedraw();
  }

  private requestRedraw(): void {
    if (this.context) this.onCanvasDraw();
  }

  build() {
    Canvas(this.context)
      .onReady(() => this.requestRedraw())
      .onAreaChange(() => {
        this.width = newValue.width;
        this.height = newValue.height;
        this.requestRedraw();
      })
      .onTouch((e) => {
        this.value = newValue;
        this.requestRedraw();
      })
  }
}
```

### 检查要点

- 所有**渲染相关**的属性是否都加了 `@Watch('requestRedraw')`？**漏一个就导致该属性变化时视觉不更新**。
- 值变化（`value`）既要调业务回调也要调 `requestRedraw`，两者缺一不可。
- `onReady` 和 `onAreaChange` 中也要调 `requestRedraw`，覆盖初始化和尺寸变化场景。

> ⚠️ **时序陷阱**：`onReady` 可能早于 `onAreaChange` 触发。若 `onReady` 中调用重绘时 `canvasWidth`/`canvasHeight` 为 0，绘制会被跳过。因此 `onAreaChange` 中**仅更新尺寸变量是不够的**——必须同步调用 `requestRedraw()`，否则 Canvas 将永久空白。
