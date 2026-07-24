# UX 检查清单与结果处理

## 检查清单与结果处理

| 规则 | 检查项 | 结果处理 |
|------|--------|---------|
| 1 | Dart 侧 FlutterEntry/Page 生命周期方法未配对（`flutterEntry.aboutToAppear()` 无对应 `aboutToDisappear()`；或 `onPageShow()` 无对应 `onPageHide()`） | 确保 `aboutToDisappear` 中释放 Dart 侧 Controller/Stream 引用，`onPageHide` 中释放页面相关资源 |
| 2 | Dart 侧定义的 PlatformView `viewType` 与 ETS 侧 `registerViewFactory` 的注册名不一致 | 确保两端 `viewType` 字符串完全一致（大小写敏感）。Dart：`OhosView(viewType: 'xxx')`，ETS：`binding.registerViewFactory('xxx', ...)` |
| 3 | 生产代码中仍在使用 `print()` | 自动替换为 `debugPrint()`。`print` 会冲刷日志缓冲区，影响性能；`debugPrint` 有节流能力 |

## 1 — Dart 侧生命周期未配对

```dart
// 正确做法：生命周期配对
class _MyPageState extends State<MyPage> {
  CustomViewController? _controller;

  void _onViewCreated(CustomViewController controller) {
    _controller = controller;
  }

  void aboutToDisappear() {
    // 释放 Controller/Stream 引用
    _controller?.dispose();
    _controller = null;
  }
}
```

**结果处理**：确保 aboutToDisappear 中释放 Dart 侧 Controller/Stream 引用，onPageHide 中释放页面相关资源。

**ETS 侧对应的生命周期**：
```ets
aboutToAppear() {
  this.flutterEntry = new MyFlutterEntry(getContext(this));
  this.flutterEntry.aboutToAppear();
  this.flutterView = this.flutterEntry.getFlutterView();
}

aboutToDisappear() {
  this.flutterEntry?.aboutToDisappear();
}

onPageShow() {
  this.flutterEntry?.onPageShow();
}

onPageHide() {
  this.flutterEntry?.onPageHide();
}
```

## 2 — PlatformView viewType 不一致

**Dart 侧** (`lib/custom_ohos_view.dart`)：
```dart
Widget build(BuildContext context) {
  return OhosView(
    viewType: 'com.rex.custom.ohos/customView', // 此字符串
    onPlatformViewCreated: _onPlatformViewCreated,
    creationParamsCodec: const StandardMessageCodec(),
  );
}
```

**ETS 侧** (`ohos/<plugin>/src/main/ets/.../CustomPlugin.ets`)：
```ets
onAttachedToEngine(binding: FlutterPluginBinding): void {
  binding.registerViewFactory(
    'com.rex.custom.ohos/customView', // 必须与此字符串完全一致
    new CustomFactory(binding.getBinaryMessenger(), StandardMessageCodec.INSTANCE)
  );
}
```

**结果处理**：确保两端 viewType 字符串完全一致（大小写敏感）。

## 3 — print() 仍在使用

```dart
// 不推荐：使用 print()
print("Button clicked");

// 推荐（自动修复）
debugPrint("Button clicked");
```

**注意**：`debugPrint` 来自 `package:flutter/foundation.dart`，会自动限流防止日志冲刷。仅当项目已依赖 Flutter 时有效，纯 Dart package 仍使用 `print` 是合理的。

**结果处理**：移除或替换为 debugPrint。

---

## 4 — Channel 名称一致性

| 检查项 | 规则 | 说明 |
|--------|------|------|
| Dart 侧 Channel 名称与 ETS 侧不一致 | 两端 Channel 名称必须完全一致（大小写敏感） | 名称不匹配导致通信失败 |

**结果处理**：统一两端 Channel 名称（大小写敏感）。

### 常见 Channel 问题

| 问题 | 说明 |
|------|------|
| Channel 名称拼写不一致 | Dart: `'com.example/method'` vs ETS: `'com.example/Method'`，大小写敏感 |
| Channel 类型不一致 | Dart 用 `MethodChannel`，ETS 用 `EventChannel` |
