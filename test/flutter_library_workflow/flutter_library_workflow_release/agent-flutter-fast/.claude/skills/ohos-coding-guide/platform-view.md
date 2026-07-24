# PlatformView 插件鸿蒙适配

## 适用条件

- 插件使用 `PlatformView` 在 Flutter 中嵌入原生视图
- 典型场景：地图、WebView、视频播放器、相机预览、广告视图

---

## 第一部分：工程搭建

### 工程创建

```bash
flutter create -t plugin --platforms ohos .
```

### 目录结构

PlatformView 插件通常需要多个 ETS 文件：
```
ohos/src/main/ets/components/plugin/
├── XxxPlugin.ets           # 插件主入口（注册 Factory + MethodChannel）
├── XxxPlatformView.ets     # PlatformView 实现
├── XxxViewFactory.ets      # PlatformView 工厂
└── XxxComponent.ets        # ArkUI 组件（可选，也可放在 PlatformView 文件中）
```

### 额外配置

PlatformView 可能需要在 `module.json5` 中配置额外能力（视具体功能而定，如 WebView 需要网络权限）。

---

## 第二部分：编码实现

## PlatformView 约束

`@ohos/flutter_ohos` 的 `Params` 属于 framework 桥接对象，不是业务参数容器。

禁止：
- 继承或实例化 `Params`
- 向 `Params` 挂载 `viewId`、`context`、controller、channel 等业务状态
- 未核验本地源码就假设 builder 参数包含自定义字段

规则：
- 业务状态保存在 `XxxPlatformView` 自身或插件自有状态对象中
- `Builder` / `Component` 访问业务状态时，通过 `params.platformView as XxxPlatformView` 反查实例
- 文档或示例与当前已安装本地源码冲突时，以本地源码为准

### PlatformView 四件套

鸿蒙平台实现 PlatformView 需要四个组件：

#### 1. PlatformView 实现

```ets
import { PlatformView } from '@ohos/flutter_ohos/src/main/ets/plugin/platform/PlatformView';
import common from '@ohos.app.ability.common';

@Observed
export class Params {
  viewId: number = 0;
  creationParams: Map<string, Object> | null = null;
  // 根据需要添加其他参数，如回调函数引用
}

export class XxxPlatformView extends PlatformView {
  private params: Params;

  constructor(context: common.Context, viewId: number, args: Object) {
    super();
    this.params = new Params();
    this.params.viewId = viewId;
    // 解析创建参数
    if (args !== null && args !== undefined) {
      this.params.creationParams = args as Map<string, Object>;
    }
  }

  getView(): WrappedBuilder<[Params]> {
    return new WrappedBuilder(buildXxxView);
  }

  dispose(): void {
    // 释放视图相关资源
  }
}
```

#### 2. 视图构建函数 + ArkUI 组件

```ets
@Builder
function buildXxxView(params: Params) {
  XxxComponent({ params: params })
}

@Component
struct XxxComponent {
  @ObjectLink params: Params;

  build() {
    Column() {
      // 构建原生视图内容
      // 例如 WebView：
      // Web({ src: this.params.url, controller: this.params.controller })
      //   .width('100%')
      //   .height('100%')
    }
    .width('100%')
    .height('100%')
  }
}
```

**`@Observed` 和 `@ObjectLink` 用法要点**：
- `Params` 类必须用 `@Observed` 装饰，使其属性变化可被观察
- 组件中用 `@ObjectLink` 引用 Params 实例，实现数据变化自动刷新 UI
- `@Observed` 类中的属性必须有初始值
- `@ObjectLink` 变量不能在组件内重新赋值（只能修改其属性）

#### 3. PlatformViewFactory

```ets
import { PlatformViewFactory } from '@ohos/flutter_ohos/src/main/ets/plugin/platform/PlatformViewFactory';
import { PlatformView } from '@ohos/flutter_ohos/src/main/ets/plugin/platform/PlatformView';
import common from '@ohos.app.ability.common';

export class XxxViewFactory extends PlatformViewFactory {
  create(context: common.Context, viewId: number, args: Object): PlatformView {
    return new XxxPlatformView(context, viewId, args);
  }
}
```

#### 4. 插件主入口（注册 Factory）

```ets
import {
  FlutterPlugin,
  FlutterPluginBinding
} from '@ohos/flutter_ohos/src/main/ets/embedding/engine/plugins/FlutterPlugin';
import MethodChannel, {
  MethodCallHandler,
  MethodResult
} from '@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel';
import MethodCall from '@ohos/flutter_ohos/src/main/ets/plugin/common/MethodCall';

export default class XxxPlugin implements FlutterPlugin, MethodCallHandler {
  private channel: MethodChannel | null = null;

  onAttachedToEngine(binding: FlutterPluginBinding): void {
    // 注册 PlatformView Factory
    binding.getPlatformViewRegistry()
      .registerViewFactory("view_type_id", new XxxViewFactory());

    // 注册 MethodChannel（用于控制视图）
    this.channel = new MethodChannel(binding.getBinaryMessenger(), "channel_name");
    this.channel.setMethodCallHandler(this);
  }

  onDetachedFromEngine(binding: FlutterPluginBinding): void {
    this.channel?.setMethodCallHandler(null);
    this.channel = null;
  }

  onMethodCall(call: MethodCall, result: MethodResult): void {
    switch (call.method) {
      // 视图控制方法（如 loadUrl、scrollTo 等）
      default:
        result.notImplemented();
        break;
    }
  }
}
```

### viewType 一致性校验

**这是 PlatformView 最常见的问题**。Dart 层和 ETS 端的 viewType 字符串必须完全一致：

Dart 端（通常在 `_build` 方法中）：
```dart
AndroidView(viewType: 'com.example/xxx_view')  // Android
UiKitView(viewType: 'com.example/xxx_view')    // iOS
// OHOS 上也用相同的 viewType
```

ETS 端：
```ets
binding.getPlatformViewRegistry()
  .registerViewFactory("com.example/xxx_view", new XxxViewFactory());
//                      ^^^^^^^^^^^^^^^^^^^^^^ 必须一致
```

**校验步骤**：
1. 在 Dart 代码中搜索 `AndroidView` 或 `UiKitView` 的 `viewType` 参数值
2. 在 ETS 代码中确认 `registerViewFactory` 的第一个参数使用了相同的字符串

### 带 MethodChannel 的 PlatformView 通信模式

PlatformView 通常需要通过 MethodChannel 与 Dart 端双向通信（如控制视图滚动、获取视图状态）：

```ets
// 每个视图实例有独立的 Channel（按 viewId 区分）
onAttachedToEngine(binding: FlutterPluginBinding): void {
  binding.getPlatformViewRegistry()
    .registerViewFactory("view_type_id", new XxxViewFactory(binding.getBinaryMessenger()));
}
```

在 Factory 中传入 BinaryMessenger，视图实例创建时建立独立 Channel：
```ets
export class XxxPlatformView extends PlatformView implements MethodCallHandler {
  private channel: MethodChannel;

  constructor(messenger: BinaryMessenger, context: common.Context, viewId: number, args: Object) {
    super();
    // 每个视图实例有独立 Channel
    this.channel = new MethodChannel(messenger, "view_type_id_" + viewId);
    this.channel.setMethodCallHandler(this);
  }

  onMethodCall(call: MethodCall, result: MethodResult): void {
    // 处理单个视图实例的控制命令
  }

  dispose(): void {
    this.channel.setMethodCallHandler(null);
  }
}
```

### ArkUI Controller attach 生命周期硬规则

如果 PlatformView 使用 ArkUI controller 类对象，所有依赖组件绑定状态的 controller 调用必须等待 ArkUI 组件完成绑定。ArkWeb `webview.WebviewController` 是该规则的典型场景。

该规则用于解决 controller 早于 ArkUI 组件绑定时被调用的时序问题。对于 ArkWeb `webview.WebviewController`，典型表现是 `The WebviewController must be associated with a Web component`、`Init error`；在 JS 执行、回调注册、滚动或状态查询链路中，也可能表现为空返回、调用无效、渲染侧异常或 JS crash。

错误写法：在 MethodChannel 分支中直接调用 controller。该写法在 `Web.onControllerAttached` 之前执行时，可能触发 controller 未关联组件的初始化错误。

```ets
case "currentUrl":
  result.success(controller.getUrl());
  break;
```

正确写法：建立统一 attach 队列，`onControllerAttached` 后统一 flush。带返回值的 MethodChannel 方法也必须在队列任务中完成 `MethodResult`。

```ets
type ControllerTask = () => void;

private isControllerAttached: boolean = false;
private taskQueue: ControllerTask[] = [];

private runWhenControllerAttached(task: ControllerTask): void {
  if (this.isControllerAttached) {
    task();
    return;
  }
  this.taskQueue.push(task);
}

onControllerAttached(): void {
  this.isControllerAttached = true;
  let tasks: ControllerTask[] = this.taskQueue;
  this.taskQueue = [];
  for (let index: number = 0; index < tasks.length; index++) {
    tasks[index]();
  }
}
```

```ets
case "currentUrl":
  this.runWhenControllerAttached((): void => {
    try {
      result.success(controller.getUrl());
    } catch (e) {
      let error = e as Error;
      result.error("ERROR", error.message, null);
    }
  });
  break;
```

ArkUI 组件必须在绑定回调中通知 PlatformView：

```ets
Web({ src: this.initialUrl, controller: this.controller })
  .onControllerAttached((): void => {
    this.platformView?.onControllerAttached();
  })
```

硬规则：
- 不允许只给 `loadUrl`、`registerJavaScriptProxy` 等个别方法特判队列。
- `currentUrl`、`runJavaScript`、`goBack`、`goForward`、`reload`、`scrollTo`、`scrollBy`、`getUserAgent`、`clearCache` 等所有 controller API 都必须经过统一 attach 队列。
- 带返回值的 MethodChannel 方法也要延迟完成 `MethodResult`，不得在未绑定时直接调用 controller。

### 参考文档

通过 **flutter-docs-lookup** Skill 检索「PlatformView 使用指南」「如何使用PlatformView」获取详细实现说明。

---

## 第三部分：常见编译错误与修复

### 1. `Struct 'XxxComponent' does not comply with the struct syntax`

**原因**：ArkUI 组件（struct）语法不正确。

**修复**：
- `struct` 必须用 `@Component` 装饰
- `struct` 中必须有 `build()` 方法
- `struct` 不能有构造函数，用 `@ObjectLink` 或 `@Prop` 传参
- `struct` 中的方法不能使用 `private` / `public` 修饰符

### 2. `'@Observed' decorator can only be used with class declarations`

**原因**：`@Observed` 用在了非 class 声明上。

**修复**：`@Observed` 只能修饰 `class`，不能修饰 `struct` 或 `interface`：
```ets
@Observed
class Params {        // 正确：class
  viewId: number = 0;
}

// @Observed
// struct Xxx { }     // 错误：struct 不能用 @Observed
```

### 3. `'@ObjectLink' decorated variable must be of the '@Observed' decorated class type`

**原因**：`@ObjectLink` 引用的类型没有用 `@Observed` 装饰。

**修复**：确保 Params 类带有 `@Observed` 装饰器：
```ets
@Observed
class Params { ... }

@Component
struct XxxComponent {
  @ObjectLink params: Params;  // Params 必须是 @Observed class
}
```

### 4. `Cannot find name 'WrappedBuilder'`

**原因**：`WrappedBuilder` 是 ArkUI 内置类型，不需要导入但需要正确使用。

**修复**：
- `WrappedBuilder` 在 ArkTS 中是全局可用的，无需 import
- 泛型参数必须匹配 @Builder 函数的参数类型：
```ets
@Builder
function buildXxxView(params: Params) { ... }

getView(): WrappedBuilder<[Params]> {
  return new WrappedBuilder(buildXxxView);
}
```

### 5. `Property 'getPlatformViewRegistry' does not exist`

**原因**：`FlutterPluginBinding` 导入路径不正确或版本不匹配。

**修复**：确保从正确路径导入：
```ets
import {
  FlutterPlugin,
  FlutterPluginBinding
} from '@ohos/flutter_ohos/src/main/ets/embedding/engine/plugins/FlutterPlugin';
```

### 6. PlatformView 不显示 / 白屏

**原因**（编译通过但运行异常，预防性说明）：
- viewType 不一致（最常见）
- `getView()` 返回的 WrappedBuilder 参数类型不匹配
- ArkUI 组件没有设置宽高

**修复**：
- 检查 viewType 一致性
- 确保组件设置了 `.width('100%').height('100%')`
- 确保 `@Builder` 函数参数类型与 `WrappedBuilder<[T]>` 的泛型 T 一致

### 7. `@ObjectLink` 变量初始化错误

**原因**：`@ObjectLink` 变量不能有默认初始值。

**修复**：
```ets
@Component
struct XxxComponent {
  @ObjectLink params: Params;  // 正确：不赋初始值
  // @ObjectLink params: Params = new Params();  // 错误：不能有初始值
}
```

### 8. `@Builder` 函数参数与 `@ObjectLink` 类型边界不一致

**原因**：`@Builder` 函数从 `PlatformView.getView()` 接收参数时，参数类型是 `Params`（`@Observed class`），但如果在 builder 内部使用 `params as MapViewParams` 这样的强转，ArkTS 无法证明类型兼容性，导致传给 `@ObjectLink` 的赋值失败。

**常见错误模式**：
```ets
// ❌ 错误：builder 中强转参数类型
@Builder
function buildMapView(params: Params) {
  MapComponent({ params: params as MapViewParams })  // 类型不兼容
}
```

**修复**：确保整条链路类型一致 — `PlatformView` 构造中创建的 Params 类型、`getView()` 返回的 `WrappedBuilder` 泛型参数、`@Builder` 函数参数类型、`@Component struct` 中 `@ObjectLink` 声明类型，四者**必须是同一个 `@Observed class`**：

```ets
@Observed
export class MapViewParams {  // 唯一 Params 类型
  viewId: number = 0;
  mapController: MapComponentController | null = null;
}

@Builder
function buildMapView(params: MapViewParams) {       // 直接用 MapViewParams
  MapComponent({ params: params })                    // 无需强转
}

@Component
struct MapComponent {
  @ObjectLink params: MapViewParams;                  // 同一类型
  build() { /* ... */ }
}

export class MapPlatformView extends PlatformView {
  private params: MapViewParams;                      // 同一类型
  constructor(...) {
    super();
    this.params = new MapViewParams();
  }
  getView(): WrappedBuilder<[MapViewParams]> {        // 同一类型
    return new WrappedBuilder(buildMapView);
  }
}
```

> **关键原则**：不要在 `@Builder` 和 `@Component` 之间引入额外的类型转换。如果需要传递控制器等原生对象，直接作为 `@Observed class` 的属性，在 PlatformView 构造函数中赋值。
