# 常见错误

## 简要描述

| 问题 | 处理 |
|------|------|
| 误建 npm `package.json` 当鸿蒙工程 | 删除或迁出，改用 `oh-package.json5` + hvigor |
| HAR 路径写错导致 ohpm 解析失败 | 核对 `file:` 相对路径从 **应用模块** `oh-package.json5` 出发 |
| 仅文档描述未真实构建 | `demo_build_status` 不得虚构；无法执行则标 `fail` 并写明环境缺口 |
| assembleHap 报错 | **改 Demo 或 HAR → 重跑同一条命令**，直至成功或确认不可修复 |
| 设备能力用模拟数据替代 | **禁止**用 `Math.random()` 等模拟数据替代 Android Demo 中实际使用的设备能力（录音、相机、传感器等）。必须使用鸿蒙等价 API 真实实现，或在 `prd_capability_coverage` 中显式标注降级原因。详见「设备敏感权限与能力」章节 |
| 系统 Picker 仅返回 URI，元数据未回填导致显示默认值 | `PhotoViewPicker`/`DocumentViewPicker`/`AudioPicker`/`FilePicker` 通常**只返回 URI**，不含 duration/size/width 等元数据。若模型字段有默认值（如 `duration = 0`），UI 会静默显示 `"00:00"` 等误导值。修复：获取 URI 后必须通过 `avMetadataExtractor`/`file.stat` 等显式回填元数据；获取失败时 UI 应显示 `"未知"` 而非格式化默认值。 |
| `class constructor cannot called without 'new'` | `@CustomDialog` struct 在非 `@Builder` 方法中调用，或 `CustomDialogController` 的 `builder` 用箭头函数包装。修复：将 `@CustomDialog` 调用移入 `@Builder` 函数，传参存为 `@State` 成员变量，`builder` 直接引用 `@Builder` 函数。 |
| 行为边界验证结果写死 | 验证"空字符串返回默认值"、"最后调用覆盖"等边界时，结果文案写死预期行为而非基于 HAR 真实返回值推导；若返回可视产物（如 PixelMap）未展示。修复：结果文案必须从 HAR API 返回值推导；可视产物必须在 Demo 中展示供目视确认 |
| RelativeContainer 中追加按钮不显示 | 同方向设多条 `alignRules`（如 `top`+`center`）互斥。同一方向只保留一条，或改用 `Column`。 |
| Demo 页面持有 @Component struct 引用调用方法 | `private ref: XxxView \| null = null` 永远是 `null`，所有按钮操作无效。修复：父页面用 `@State` 持有状态，通过 `@Prop` 传入子组件，按钮修改 `@State` 即可驱动。`@Watch` 回调中禁止写回 `@Prop`/`@State` 字段，只写普通 `private` 变量。|
| **交互暗示文本无交互实现** | `Text` 文案为"点击切换颜色状态"但缺少 `.onClick()`，点击无反应。修复：扫描所有文案含"点击"/"切换"/"状态"/"toggle"/"press"/"active"的 Text，确保每个都绑定了 `.onClick()`/`.stateStyles()` 回调，且有 `@State` 变量驱动其 fontColor/content 等可见属性；禁止仅靠文案暗示交互能力。 |
| **孤立状态变量** | Toggle/Switch/Checkbox 的 onChange 回写了一个 `@State`，但该变量没有被任何组件渲染属性（`.enabled()`、`.fontColor()` 等）消费，开关翻转无可见效果。修复：对每个被交互控件修改的 `@State`，确认至少有一个 UI 组件通过 `.enabled(this.x)`、`.fontColor(this.x)` 等属性绑定读取它，产生可见的 UI 变化。 |
| **Demo 绕过 HAR 控制器调用系统组件 API** | HAR 导出了控制器封装某持续型/状态型能力，Demo 却直接调系统组件 API 或手写平替。如 HAR 有 `AutoScrollController`（封装 `setInterval` + `showNext`），Demo 却直接调 `swiperController.showNext()`。修复：Demo 必须导入 HAR 的控制器，调用其 `start()`/`stop()`/`reset()` 方法，不得直接与系统组件控制器交互。 |
| **HAR 组件 Options 接口遗漏回调属性** | struct 有无装饰器回调属性（如 `onTransformListener`），但 `XxxOptions` 接口未对应暴露，Demo 无法通过构造参数传入。修复：struct 每声明一个无装饰器 public 回调属性，必须在 Options 接口中添加同名可选字段。 |
| **高频回调展示无周期上下文** | `customContentTransition` 等逐帧回调在 Demo 中触发数百次，UI 仅显示原始帧计数，用户混淆（如一次滑动显示 PreTransform 触发 200+ 次）。修复：增加「动画周期」计数，每次动画开始时重置周期内帧计数器，UI 同时展示两个层级。 |
| **private 持有 @Prop 数据源** | 父页面用 `private config = new SwiperConfig()` 持有配置，`updateConfig()` 中赋新对象，但子组件 `@Prop` 收不到变更。修复：改为 `@State config`。 |
| **基础元素替代库组件** | 用 Text/Row/Button 等基础元素重新实现 HAR UI 组件的行为和外观，导致内置交互丢失、视觉不一致。修复：直接导入并使用 HAR 导出的 UI 组件。 |
| **枚举变体遗漏** | if-else/switch 链只处理了部分 enum 值，未覆盖所有变体，选到未处理变体时无声走到默认 fallback 值。修复：grep 所有 switch/if-else 对 enum 的判断，确认每个成员都有分支或显式注释说明意图。 |
| **ForEach 内重复调用副效应函数** | 某非确定性函数（随机、时间戳、自增 ID 等）在 ForEach 同一迭代中被多次调用，每次返回不同值，导致同一数据项的各属性来自不同结果。原因是 ArkTS 禁止在 ForEach/Builder 中声明局部变量缓存。修复：在被调用的函数内部实现缓存（如 `private cache: T[]` 按索引缓存结果）。 |
| **@State 行内初始化引用后声明字段** | `@State config = this.buildConfig()` 中 `buildConfig` 读取了声明在 `config` 后的 `COLORS`/`@State` 字段 → 运行时 crash（`Cannot read property 'length/get' of undefined`）。修复：`@State` 行内只给默认值 `new Config()`，真实初始化延迟到 `aboutToAppear()`。 |


## 详细描述

### 对象字面量字符串未加括号被解析为块语句
**现象**：`context.executeObjectScript('{foo:123}', 'test.js')` 返回 `undefined`，`if (obj)` 为 false，result 始终显示初始值"等待操作..."，无异常抛出不进 catch。

**根因**：JS 中 `{foo:123}` 若不加括号，被解析为块语句（block statement），`foo:` 被当作标签（label），整句返回 `undefined`。AI 生成代码时容易忽略此语法细节。

**修复**：外层加括号强制为表达式 → `'({foo:123})'`。

**触发模式**：任何 `executeScript` / `executeObjectScript` / `executeStringScript` 等以字符串传入 JS 源码的方法，且源码以 `{` 开头时，必须加 `()` 包裹。

**Scope 扫描技巧**：`grep -rn "execute\w*Script('[^{]*{"` 可快速找出所有遗漏括号的调用点。

### 初始化顺序错误（`not initialized, please call initialize()`）
**现象**：`new Plugin()` 时崩溃，堆栈在 `Adapter.constructor` → `factory.getManager()`。
**根因**：构造函数中**急切获取**未初始化的工厂产物。
**修复**：
1. **Adapter 改为懒加载**：
```typescript
class Adapter {
  private factory = Factory.getInstance();
  // ✗ 移除：private mgr = factory.getManager()

  private getManager(): Manager {
    return this.factory.getManager(); // 调用时才获取
  }
}
```
2. **EntryAbility 保持顺序**：
```typescript
const plugin = new Plugin();         // 1. 构造（只存引用）
plugin.initialize(this.context);     // 2. 初始化工厂
plugin.listCalendars();              // 3. 安全调用
```
原则：构造函数只存引用，绝不调用 factory.getXXX()。

## Demo 编码高频陷阱

> 以下规则迁自 demo-gen prompt，与 ArkTS 装饰器响应式、时序相关；demo-gen prompt 仅以指针引用。

| 问题 | 处理 |
|------|------|
| **@BuilderParam 父 Builder 传参禁区** | Demo 给 HAR 组件传 `@BuilderParam` 时禁止 `slot: this.someBuilder` 直传，也禁止 builder 内 `this.xxx.bind(this)()` 运行时补救。修复：Demo 页面提供显式 wrapper（如 `itemBuilder: (item: ItemModel) => { this.renderItem(item); }`），复杂 slot 抽成 `@Component + @Prop` 后传入稳定 builder。 |
| **@Builder 多参数不响应式** | `@Builder` 函数签名含 ≥2 个原始类型参数（string/number/boolean）时，参数用于 UI 属性绑定（`.backgroundColor()` 等）或子组件传参**不会触发动态渲染**。修复：参数封装为 `@Component + @Prop/@Link`，或 `@Builder` 内直接引用 `this.@State`。单参数按引用传递可刷新，多参数永远不行。 |
| **Controller 方法避开子组件 aboutToAppear 之前** | 父 `aboutToAppear()` 早于子 `@Component` 的 `aboutToAppear()`，此时通过 Controller 调子组件 setAdapter/addHeaderView 等方法会被 `.()?` 静默跳过。修复：改用 `onPageShow()` + `initialized` 守卫，`doInitialize()` 中先 `if (this.controller.setAdapter === undefined) return;` 再调 API。 |
| **8 位 hex 颜色必须 #AARRGGBB** | OHOS `ResourceColor` 的 8 位 hex 须 Alpha 在前 `#AARRGGBB`（如 `'#66FF0000'` = 40% 红），禁止 CSS `#RRGGBBAA`。6 位 `#RRGGBB` 无此问题。Canvas `shadowColor`/`fillStyle`/`strokeStyle` 及所有接受 `ResourceColor` 的属性均遵循。 |

### @State→@Prop 闭环漏传组件

**现象**：test_steps 要求测试某参数（如"行间距倍数"），Demo 已声明 `@State` 并由控件更新，但未传入 HAR 组件构造参数，配置变化不生效。

```typescript
// ✗ 错误：@State 已声明且被更新，但未传入组件
@State lineSpacingMultiplier: number = 1.0;
...
NumberPicker({ value: 50 })
// ← 遗漏 lineSpacingMultiplier: this.lineSpacingMultiplier

// ✓ 正确：闭环传入
NumberPicker({ value: 50, lineSpacingMultiplier: this.lineSpacingMultiplier })
```

### Builder.config 构建后未传入组件渲染

**现象**：测试用例通过 Builder 链式构建配置对象，但仅 `build()` 拿到 config 而未传入 HAR 组件实例化，组件生命周期校验永不触发。

```typescript
// ✗ 错误：config 构建后未渲染组件
Builder.with().max(100).min(200).build();
// config 未传入 IndicatorSeekBar({...})，recomputeParams() 不触发

// ✓ 正确：通过 @State 驱动组件实例化
@State max: number = 100; @State min: number = 200;
...
IndicatorSeekBar({ max: this.max, min: this.min, progress: 0 })
```
