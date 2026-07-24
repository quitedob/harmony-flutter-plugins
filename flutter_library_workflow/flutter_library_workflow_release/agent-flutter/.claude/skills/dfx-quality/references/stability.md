# 稳定性检查清单与结果处理

## 检查清单与结果处理

| 规则 | 检查项 | 结果处理 |
|------|--------|---------|
| 1 | Platform.isOhos 在依赖服务器引擎产物时可能导致 flutter run / build har / attach 失败 | 建议改为 `defaultTargetPlatform == TargetPlatform.ohos`（需 `import 'package:flutter/foundation.dart'`）。**注意**：正常开发环境下 `Platform.isOhos` 已原生支持，本规则仅在出现相关构建失败时触发 |
| 2 | AnimationController 变量声明后未调用 `.dispose()` | 在 `dispose()` 或 `deactivate()` 方法中调用 `controller.dispose()` |
| 3 | PlatformView 子类构造器中注册了 MethodChannel / Texture 等资源，但 `dispose()` 方法为空 | 在 `dispose()` 中释放构造器中注册的所有资源：`channel.setMethodCallHandler(null)`、`textureRegistry.unregisterTexture(textureId)` 等 |
| 4 | FlutterPlugin 子类 `onAttachedToEngine` 中注册了 Channel / ViewFactory，但 `onDetachedFromEngine` 为空 | 在 `onDetachedFromEngine` 中：调用 `channel.setMethodCallHandler(null)` 清理 Channel handler，释放所有注册的资源 |
| 5 | 调用 `TextureRegistry.registerTexture()` 注册纹理后未对应调用 `unregisterTexture()` | 在组件销毁或资源释放时调用 `this.textureRegistry.unregisterTexture(textureId)` |
| 6 | StreamController 声明的变量未调用 `.close()` | 在 `dispose()` 方法中调用 `streamController.close()` |
| 7 | FlutterEntry 生命周期方法未配对（`aboutToAppear` ↔ `aboutToDisappear`、`onPageShow` ↔ `onPageHide`） | 确保成对调用：`aboutToAppear()` / `aboutToDisappear()`、`onPageShow()` / `onPageHide()`。参考 FlutterEntry 混合开发文档 |

## 1 — Platform.isOhos 使用风险

**问题来源**：FAQ ohos-code.md

当 Flutter 代码中存在 `Platform.isOhos`，且依赖服务器引擎产物时（未指定本地引擎），`flutter run`、`flutter build har`、`flutter attach` 命令会执行失败。

**推荐修复**：
```dart
// 不安全写法（仅在特定条件下出问题）
if (Platform.isAndroid || Platform.isOhos) { ... }

// 更安全的等价写法
import 'package:flutter/foundation.dart';
if (Platform.isAndroid || defaultTargetPlatform == TargetPlatform.ohos) { ... }
```

**适用场景**：出现构建失败错误码时参考此规则修复。正常开发环境下 `Platform.isOhos` 可继续使用。

**结果处理**：加 `else if (Platform.isOhos)` 分支或使用 `defaultTargetPlatform == TargetPlatform.ohos`。

## 2 — AnimationController 未 dispose()

**示例**：
```dart
class _MyWidgetState extends State<MyWidget> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    );
  }

  @override
  void dispose() {
    _controller.dispose(); // 必须调用
    super.dispose();
  }
}
```

**结果处理**：在 dispose() 中调用 _controller.dispose()。

## 3 — PlatformView 构造器 dispose 为空

**检查要点**：检测 `extends PlatformView` 的类，构造器中如果创建了 `MethodChannel`、`TextureRegistry` 等资源，则 `dispose()` 不能为空。

**示例**：
```ets
// 有问题的写法：dispose() 为空
export class CustomView extends PlatformView {
  private channel: MethodChannel;
  constructor(context, viewId, args, messenger) {
    super();
    this.channel = new MethodChannel(messenger, "com.example/custom");
    this.channel.setMethodCallHandler(this);
  }
  dispose(): void { } // 应该释放 channel
}

// 正确写法
export class CustomView extends PlatformView {
  private channel: MethodChannel;
  constructor(context, viewId, args, messenger) {
    super();
    this.channel = new MethodChannel(messenger, "com.example/custom");
    this.channel.setMethodCallHandler(this);
  }
  dispose(): void {
    this.channel.setMethodCallHandler(null); // 清理 handler
  }
}
```

**结果处理**：在 dispose() 中释放构造器创建的资源。

## 4 — onDetachedFromEngine 为空

**检查要点**：检测 `implements FlutterPlugin` 的类，`onAttachedToEngine` 中注册了资源时，`onDetachedFromEngine` 不能为空。

**示例**：
```ets
// 有问题的写法
export class BatteryPlugin implements FlutterPlugin {
  private channel: MethodChannel;
  onAttachedToEngine(binding: FlutterPluginBinding): void {
    this.channel = new MethodChannel(binding.getBinaryMessenger(), "samples.flutter.dev/battery");
    this.channel.setMethodCallHandler({ onMethodCall(call, result) { ... } });
  }
  onDetachedFromEngine(binding: FlutterPluginBinding): void { } // 应该清理
}

// 正确写法
export class BatteryPlugin implements FlutterPlugin {
  private channel: MethodChannel;
  onAttachedToEngine(binding: FlutterPluginBinding): void {
    this.channel = new MethodChannel(binding.getBinaryMessenger(), "samples.flutter.dev/battery");
    this.channel.setMethodCallHandler({ onMethodCall(call, result) { ... } });
  }
  onDetachedFromEngine(binding: FlutterPluginBinding): void {
    this.channel.setMethodCallHandler(null); // 清理 handler
  }
}
```

**结果处理**：在 onDetachedFromEngine 中释放 onAttachedToEngine 注册的资源。

## 5 — registerTexture 未对应 unregister

**示例**：
```ets
// 注册纹理
this.textureId = this.textureRegistry.getTextureId();
this.surfaceTextureEntry = this.textureRegistry.registerTexture(this.textureId);

// 必须对应注销，通常在 dispose 或 onDetachedFromEngine 中
this.textureRegistry.unregisterTexture(this.textureId);
```

**结果处理**：补充 unregisterTexture 调用。

## 6 — StreamController 未 close()

**示例**：
```dart
class CustomViewController {
  final StreamController<String> _controller = StreamController<String>();

  void dispose() {
    _controller.close(); // 必须调用
  }
}
```

**结果处理**：在 dispose() 中调用 _controller.close()。

## 7 — FlutterEntry 生命周期未配对

**检查要点**：使用 `FlutterEntry` 或 `FlutterPage` 时，生命周期方法必须成对出现。

**示例**：
```ets
// 正确配对
aboutToAppear() {
  this.flutterEntry = new MyFlutterEntry(getContext(this));
  this.flutterEntry.aboutToAppear();
  this.flutterView = this.flutterEntry.getFlutterView();
}

aboutToDisappear() {
  this.flutterEntry?.aboutToDisappear(); // 对应的清理
}

onPageShow() {
  this.flutterEntry?.onPageShow();
}

onPageHide() {
  this.flutterEntry?.onPageHide(); // 对应的清理
}
```

**结果处理**：补充缺失的生命周期方法（aboutToAppear/Disappear, onPageShow/Hide）。

---

## 8 — 日志规范

| 检查项 | 规则 | 说明 |
|--------|------|------|
| console.log/debug/info 仍在使用 | 生产代码中应移除或替换为 debugPrint | 自动修复（fix_ets.py） |

**结果处理**：移除或替换为 debugPrint。

### 常见日志问题

| 问题 | 说明 |
|------|------|
| console.log 残留 | 生产代码中不应使用 console.log/debug/info |
| 日志级别不当 | 调试信息应使用 debugPrint，非 console |
