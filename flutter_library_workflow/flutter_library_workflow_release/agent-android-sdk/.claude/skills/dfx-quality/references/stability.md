# 稳定性检查（崩溃预防、资源泄漏、API Level 兼容）

适用阶段：HAR 编码、Demo 编码与审查。对应官方 DFX 故障检测（JS Crash / Cpp Crash、RESOURCE_OVERLIMIT、APP_KILLED）。

---

## 1. V1 装饰器禁止 Function 类型

`@State`、`@Prop`、`@Link`、`@Provide`、`@Consume` 均**不支持 Function 类型**。传递 Function 类型会导致运行时校验报错（errCode 140115）。

```typescript
// ✗ 错误：@Prop 不支持 Function 类型
@Prop onClick: () => void = () => {};

// ✓ 正确：V1 组件用无装饰器普通变量传递回调
onClick: () => void = () => {};
// 父组件：Child({ onClick: this.handleAction })

// ✓ 正确：V2 组件用 @Event 装饰器
@Event onClick: () => void = () => {};
```

**官方 DFX 依据**：JS Crash

**结果处理**：V1 组件去掉装饰器改为普通变量传递回调；V2 组件改用 @Event 装饰器。

---

## 2. @Link 禁止本地初始化

`@Link` 装饰的变量**禁止本地初始化**，否则编译期报错。数据源必须是父组件的状态变量，否则框架抛出运行时错误（"is not callable"）。

```typescript
// ✗ 错误
@Link myValue: string = 'default';

// ✓ 正确：父组件传 $myValue
@Link myValue: string;
```

**官方 DFX 依据**：JS Crash

**结果处理**：删除 `= value`，改为父组件传 `$myValue`。

---

## 3. @Prop @Watch 须有默认值

`@Prop` 配合 `@Watch` 使用时必须提供默认值，否则 HAR 使用者未传值时框架抛出运行时错误。

```typescript
// ✗ 错误：@Prop @Watch 缺少默认值
@Prop @Watch('onChange') value: number;

// ✓ 正确：提供安全默认值
@Prop @Watch('onChange') value: number = 0;
```

**官方 DFX 依据**：JS Crash（HAR 组件未传值时崩溃）

**结果处理**：添加 `= 0` / `= false` 等安全默认值。

---

## 4. @State 行内初始化不引用后声明字段

成员变量按**声明顺序**初始化。若字段 A 的行内初始化引用了后声明的字段 B，B 此时为 `undefined`，导致 "Cannot read property" 崩溃。

```typescript
// ✗ 错误：x 初始化时 y 尚未声明
@Component
struct MyComp {
  x: number = this.y + 1;
  y: number = 10;
}

// ✓ 正确：按声明顺序
@Component
struct MyComp {
  y: number = 10;
  x: number = this.y + 1;
}
```

**检测方法**：检查 `@Component struct` 中每个成员变量的初始化表达式，确认其引用的其他成员变量声明在前。

**官方 DFX 依据**：JS Crash

**结果处理**：调整字段声明顺序，或将初始化移入 `aboutToAppear`。

---

## 5. aboutToAppear 不访问未就绪字段

生命周期顺序：创建实例 → 初始化成员变量 → aboutToAppear → build()。`aboutToAppear` 中可安全访问已有默认值的字段，但**不应访问依赖父组件 @Link/@Prop 的字段**（此时父组件 build() 尚未执行，@Link 值未建立）。

**检测方法**：检查 `aboutToAppear` 回调体中是否访问了 `this.xxx`，确认该字段有默认值或非 @Link/@Prop 依赖。

**官方 DFX 依据**：JS Crash

**结果处理**：将该逻辑移至 `aboutToAppear` 之后的生命周期，或改用 `@Watch` 响应。

---

## 6. 异步回调有 try/catch 错误边界

HAR 回调、MethodChannel 回调、事件监听器等异步路径必须有 try/catch，捕获后展示错误摘要或降级，不得静默失败。

**检测方法**：grep 异步 API 调用（`.then(`/`async (`/`new Promise`），检查后续行是否有 `try`/`.catch(`。

**官方 DFX 依据**：JS Crash / Cpp Crash

**结果处理**：补充 try/catch，catch 中展示错误摘要或降级。

---

## 7. 空值边界显式处理

从 HAR、系统 API、Picker、网络等获取的数据，空数组、空字符串、undefined、字段缺失、异常返回必须有默认展示或错误摘要。

**检测方法**：检查数据来源处是否有 `?.`、`??`、`if (!data)` 等空值守卫。

**官方 DFX 依据**：JS Crash

**结果处理**：补充空判断，提供默认值或 empty 状态 UI。

---

## 8. 资源泄漏预防

对应官方 DFX RESOURCE_OVERLIMIT 事件。资源泄漏是导致应用被系统杀死的常见原因，编码阶段应通过生命周期配对管理预防。

**官方 DFX 依据**：RESOURCE_OVERLIMIT(FD / Thread / PSS / JS Heap)

### 8.1 内存泄漏预防

`@State`/`@Link` 持有的大对象（大数组、列表数据、大图 PixelMap）在组件销毁时（`aboutToDisappear`）应置 `null` 或 `[]` 释放引用，长生命周期组件的监听器/回调在 `aboutToDisappear` 中反注册。

```typescript
// ✗ 错误：组件销毁后大对象引用仍被持有
@State largeList: DataItem[] = [];
// 组件生命周期内持续 push 数据
aboutToDisappear() {
  // 未清理 largeList
}

// ✓ 正确：aboutToDisappear 释放引用
aboutToDisappear() {
  this.largeList = [];
  this.pixelMap = undefined;
}
```

**结果处理**：在 aboutToDisappear 中释放大对象引用（`= []`/`= null`/`= undefined`）。

### 8.2 FD 泄漏预防

`fileIo.openSync`/`fileIo.open` 返回的文件描述符必须在操作完成后通过 `fileIo.close` 关闭；网络连接、Socket 在 `aboutToDisappear` 中 `destroy()`。

```typescript
import { fileIo } from '@kit.CoreFileKit';

// ✗ 错误：打开文件后未关闭
const file = fileIo.openSync(path, fileIo.OpenMode.READ_ONLY);
// ... 使用 file
// 未调用 fileIo.close(file)

// ✓ 正确：finally 中关闭
const file = fileIo.openSync(path, fileIo.OpenMode.READ_ONLY);
try {
  // ... 使用 file
} finally {
  fileIo.close(file);
}
```

**结果处理**：补充 finally 中的 fileIo.close。

### 8.3 线程泄漏预防

`Worker`/`TaskPool` 创建的后台线程在页面/组件销毁时（`aboutToDisappear`）应 `terminate()`/`cancel()`。

```typescript
// ✗ 错误：Worker 未在组件销毁时终止
aboutToAppear() {
  this.worker = new worker.ThreadWorker('entry/ets/workers/MyWorker.ets');
  this.worker.postMessage({ cmd: 'start' });
}
aboutToDisappear() {
  // 未 terminate Worker
}

// ✓ 正确：aboutToDisappear 终止 Worker
aboutToDisappear() {
  if (this.worker) {
    this.worker.terminate();
    this.worker = undefined;
  }
}
```

**结果处理**：在 aboutToDisappear 中调用 worker.terminate()。

### 8.4 TaskPool 配对

`taskpool.execute()` 提交的任务在页面/组件销毁时（`aboutToDisappear`）应通过 `taskpool.cancel()` 取消，避免后台线程持续运行。

```typescript
import { taskpool } from '@kit.ArkTS';

// ✗ 错误：taskpool 任务未在组件销毁时取消
aboutToAppear() {
  const task = new taskpool.Task(heavySort, this.bigArray);
  taskpool.execute(task, taskpool.Priority.MEDIUM).then((result) => {
    this.sortedResult = result as number[];
  });
}
aboutToDisappear() {
  // 未 cancel taskpool 任务
}

// ✓ 正确：aboutToDisappear 取消 taskpool 任务
aboutToDisappear() {
  if (this.currentTask) {
    taskpool.cancel(this.currentTask);
    this.currentTask = undefined;
  }
}
```

**结果处理**：在 aboutToDisappear 中调用 taskpool.cancel()。

---

## 9. 内存/I/O 控制

### 9.1 内存占用控制

避免 `@State` 持续累积大数组/大图列表导致内存超限被系统 LowMemoryKill 杀死。图片列表使用 `sourceSize` 限制解码分辨率；及时清理不再使用的大数据。

```typescript
// ✗ 错误：图片列表无 sourceSize 限制，大图解码消耗大量内存
Image(item.uri).width(100).height(100)

// ✓ 正确：sourceSize 限制解码分辨率
Image(item.uri).sourceSize({ width: 200, height: 200 }).width(100).height(100)
```

**官方 DFX 依据**：APP_KILLED(LowMemoryKill / OomKiller / RssThreshold)

### 9.2 I/O 频度控制

避免高频 `fileIo.write`/`readText` 调用导致 APP_KILLED(IoManager Control)。日志/数据持久化应批量写入或使用 preferences 而非逐条文件 I/O。

```typescript
import { fileIo } from '@kit.CoreFileKit';

// ✗ 错误：每次数据变化都写文件（高频 I/O）
@Watch('onDataChange')
onDataChange() {
  const file = fileIo.openSync(this.context.filesDir + '/data.json', fileIo.OpenMode.WRITE_ONLY);
  fileIo.writeSync(file.fd, JSON.stringify(this.data));
  fileIo.close(file);
}

// ✓ 正确：防抖或批量写入
@Watch('onDataChange')
onDataChange() {
  clearTimeout(this.writeTimer);
  this.writeTimer = setTimeout(() => {
    const file = fileIo.openSync(this.context.filesDir + '/data.json', fileIo.OpenMode.WRITE_ONLY);
    fileIo.write(file.fd, JSON.stringify(this.data));
    fileIo.close(file);
  }, 3000);
}
```

**官方 DFX 依据**：APP_KILLED(IoManager Control)

---

## 10. API Level 兼容与降级

适用阶段：HAR 编码、Demo 编码与审查。确保代码在 compatibleSdkVersion 声明的最低版本设备上可正常运行，不会因 API Level 不匹配导致报错或闪退。

**官方 DFX 依据**：JS Crash（低版本设备因 API 不存在导致运行时崩溃）

### 10.1 API 调用须不低于 compatibleSdkVersion

代码中使用的 API（类、方法、参数、属性）的 `@since` 版本不得高于 `build-profile.json5` 中 `compatibleSdkVersion` 声明的 API Level，除非有运行时守卫（见规则 10.2）。

**核心概念**：

- `compatibleSdkVersion`：应用可安装的最低 SDK 版本。例如 `"5.1.1(19)"` 表示应用可安装在 API 19 及以上的设备
- `@since`：每个 API/参数在 .d.ts 中标注的起始版本号。例如 `PhotoViewPicker` 标注 `@since 10`，`createImagePacker` 标注 `@since 6`
- OpenHarmony API Level 与 HarmonyOS 商用版本号有映射关系（如 OH API 10 ≈ HM API 19+），编码前须通过 `harmonyos-sdk-api-lookup` 确认目标 API 的 `@since` 值

**如何核实 @since 版本**：

1. 查看 `build-profile.json5` 中的 `compatibleSdkVersion`，提取括号内 API Level 数值
2. 通过 `harmonyos-sdk-api-lookup` 在对应 .d.ts 文件中搜索目标 API，读取 `@since` 标注
3. 通过 `harmonyos-docs-lookup` 搜索该 API 的开发指导文档，确认版本约束说明

### 10.2 高版本 API 须有运行时可用性检查

当代码需要使用 `@since` > `compatibleSdkVersion` 的 API 时，**必须**在调用前进行运行时可用性检查，并在不可用时提供降级路径。

**运行时检查方式**：

```typescript
// 方式 1：canIUse() — 检查 SystemCapability
if (canIUse('SystemCapability.FileManagement.PhotoAccessHelper.Core')) {
  // 使用高版本能力
} else {
  // 降级
}

// 方式 2：版本号比较
import { deviceInfo } from '@kit.BasicServicesKit';
const apiLevel = deviceInfo.osFullName
  ? parseInt(deviceInfo.osFullName.split('.').pop() || '0', 10)
  : 0;
if (apiLevel >= 22) {
  // 使用高版本能力
} else {
  // 降级
}
```

**降级原则**：

- **保留参数接收但不执行**：HAR 对外 API 签名不变，内部跳过高版本实现
- **不伪造实现**：降级不是用低版本 API 模拟高版本行为，而是跳过或提示
- **降级有可观测日志**：`console.warn()` 或 UI 提示，便于排查
- **Demo 页面降级有 UI 反馈**：用户可见的提示（如"当前设备不支持此功能"），而非空白或静默失败

**结果处理**：补充运行时守卫（canIUse/版本比较）+ 降级分支。

### 10.3 compatibleSdkVersion 须与实际代码能力匹配

`compatibleSdkVersion` 声明了应用支持的最低版本。如果代码中使用了高版本 API 且无降级守卫，则实际最低可用版本高于声明值，应提升 `compatibleSdkVersion` 使其与代码实际能力一致。

### 10.4 低版本设备闪退预防

#### 10.4.1 入口页面最小化高版本 API 依赖

Demo 入口页面（配置了 `entity.system.home` 的 Ability）应在 `onCreate` / `onWindowStageCreate` 阶段仅使用低版本稳定 API，避免在冷启动路径上触发高版本 API。

#### 10.4.2 try/catch 包裹可能有兼容性问题的调用

对已知在低版本设备上有问题的 API 调用（如图片选择器、压缩、权限申请等），用 try/catch 包裹并给出降级提示：

```typescript
try {
  const result = await photoViewPicker.select(photoSelectOptions);
} catch (error) {
  console.warn(`图片选择器调用失败: ${error}`);
  this.errorMessage = '当前设备不支持图片选择功能';
}
```

#### 10.4.3 避免在模块加载阶段调用高版本 API

`import` 阶段和顶层 `const`/`let` 初始化阶段不可调用可能不存在的 API。延迟到运行时按需调用。

---

## 检查清单与结果处理

### 自动化检测项（fix_stability.py）

| # | 检查项 | 检测工具 | 检测方式 | 结果处理 |
|---|--------|---------|---------|---------|
| 1-1 | V1 装饰器禁止 Function 类型 | fix_stability.py | 逐行状态机扫描装饰器后识别 `: (...) =>` 模式 | V1 组件去掉装饰器用普通变量传递回调；V2 组件改用 @Event |
| 2-1 | @Link 禁止本地初始化 | fix_stability.py | 逐行状态机扫描 `@Link xxx = ` | 删除 `= value`，改为父组件传 `$myValue` |
| 3-1 | @Prop @Watch 须有默认值 | fix_stability.py | 逐行状态机扫描 `@Prop @Watch(...)` 后查找 `= value` | 添加 `= 0` / `= false` 等安全默认值 |
| 8-1 | 内存泄漏预防（大对象未清理） | fix_stability.py | 扫描 `@State` 持有 `new Array(N)` (N>1000) 且 `aboutToDisappear` 中无 `= []`/`= null` 清理 | 在 aboutToDisappear 中释放大对象引用 |
| 8-2 | FD 泄漏预防（文件未关闭） | fix_stability.py | 扫描 `fs.openSync`/`fs.open` 且文件中无 `fs.close`/`.close()` 配对 | 补充 finally 中的 fs.close |
| 8-3 | 线程泄漏预防（Worker 未终止） | fix_stability.py | 扫描 `new worker.Worker`/`new taskpool` 且 `aboutToDisappear` 中无 `.terminate()`/`.cancel()` | 在 aboutToDisappear 中 terminate/cancel |
| 10-1 | 读取 compatibleSdkVersion 值 | fix_stability.py | 解析工程根 `build-profile.json5`，提取 API Level 数值 | 供 10-5 使用 |
| 10-3 | 高版本 API 缺运行时守卫 | fix_stability.py | 扫描可配置的高版本 API 关键词列表，检测是否被 `canIUse()`/`deviceInfo`/版本比较包裹 | 补充运行时守卫 + 降级分支 |
| 10-5 | compatibleSdkVersion 与代码能力不匹配 | fix_stability.py | 结合 10-1 + 10-3，若存在无守卫的高版本 API 且 `@since` > compatibleSdkVersion | 补充守卫或提升 compatibleSdkVersion |

### Agent 核对项

| # | 检查项 | 结果处理 |
|---|--------|---------|
| 4-1 | @State 行内初始化不引用后声明字段 | 调整字段声明顺序，或将初始化移入 `aboutToAppear` |
| 5-1 | aboutToAppear 不访问未就绪字段 | 将该逻辑移至 `aboutToAppear` 之后的生命周期，或改用 `@Watch` 响应 |
| 6-1 | 异步回调有 try/catch 错误边界 | 补充 try/catch，catch 中展示错误摘要或降级 |
| 7-1 | 空值边界有默认展示（空数组、undefined、字段缺失） | 补充空判断，提供默认值或 empty 状态 UI |
| 7-2 | 状态机有明确转换（loading/ready/error） | 补充 loading/empty/error 状态分支 |
| 9-1 | 内存占用控制（大图 sourceSize、图片列表大小限制） | 添加 sourceSize，清理不再使用的大数据 |
| 9-2 | I/O 频度控制（高频文件读写） | 批量写入或使用 preferences，添加防抖/节流 |
| 10-2 | 每个 SDK 能力的 `@since` 版本已通过 `harmonyos-sdk-api-lookup` 核实 | 标注 `@since` 值到代码注释或 PRD |
| 10-4 | 降级路径有可观测日志（`console.warn`）或 UI 提示 | 补充 warn / 提示 |
| 10-6 | Demo 入口页低版本冷启动不闪退 | 在低版本设备实测 |
| 10-7 | 高风险 API 调用有 try/catch 包裹 | 补充 try/catch + 降级 |
| 10-8 | 模块顶层无高版本 API 调用 | 延迟到运行时按需调用 |
