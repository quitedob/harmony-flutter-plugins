# 功耗检查清单与结果处理

## 检查清单与结果处理

| 规则 | 检查项 | 结果处理 |
|------|--------|---------|
| 1 | 检测到 `Timer()` 或 Stream `.listen()` 但未找到 `.cancel()` 调用 | 在 `dispose()` 中调用 `timer.cancel()` 或 `subscription.cancel()` |
| 2 | 多引擎场景中 `EngineBindings` 调用了 `.attach()` 但未调用 `.detach()` 或 `.destroy()` | 在 `aboutToDisappear` 或 `onDestroy` 中调用 `engineBindings.detach()` 以释放引擎资源 |

## 1 — Timer/StreamSubscription 未 cancel

```dart
class _TimerWidgetState extends State<TimerWidget> {
  Timer? _timer;
  StreamSubscription? _subscription;

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(Duration(seconds: 1), (_) {
      // 定时任务
    });
  }

  @override
  void dispose() {
    _timer?.cancel();          // 必须取消 Timer
    _subscription?.cancel();   // 必须取消订阅
    super.dispose();
  }
}
```

**结果处理**：在 dispose() 中调用 _timer.cancel() 和 _subscription.cancel()。

## 2 — EngineBindings detach 未调用

**多引擎场景**：使用 `EngineBindings` 管理 FlutterEngine 生命周期时，`attach()` 和 `detach()` 必须成对出现。

```ets
export class EngineBindings {
  private engine?: FlutterEngine;
  private flutterView: FlutterView;

  async attach() {
    this.engine = await engines.createAndRunEngineByOptions(options);
    this.flutterView.attachToFlutterEngine(this.engine);
    GeneratedPluginRegistrant.registerWith(this.engine);
  }

  detach() {
    this.flutterView.detachFromFlutterEngine();
    this.engine?.destroy();
    this.channel?.setMethodCallHandler(null);
  }
}

// 在页面生命周期中成对调用
aboutToAppear() {
  this.engineBindings = new EngineBindings(...);
  this.engineBindings.attach();
}

aboutToDisappear() {
  this.engineBindings.detach(); // 必须调用
}
```

**结果处理**：在 aboutToDisappear 中调用 engineBindings.detach()。

**参考**：`04_development/如何使用多引擎 FlutterEngineGroup.md:86-91`
