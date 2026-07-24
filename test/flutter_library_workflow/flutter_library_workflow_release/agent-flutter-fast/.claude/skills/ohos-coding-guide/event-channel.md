# EventChannel 插件鸿蒙适配

## 适用条件

- 插件使用 `EventChannel` 进行原生到 Dart 的事件流通信
- 典型场景：传感器数据、位置更新、网络状态变化、蓝牙扫描结果
- 大多数 EventChannel 插件同时使用 MethodChannel（混合模式）

---

## 第一部分：工程搭建

### 工程创建

```bash
flutter create -t plugin --platforms ohos .
```

### 目录结构

与 MethodChannel 插件相同：
```
ohos/
├── src/main/
│   ├── ets/
│   │   └── components/
│   │       └── plugin/
│   │           └── XxxPlugin.ets
│   └── resources/
├── oh-package.json5
├── build-profile.json5
└── hvigorfile.ts
```

### 配置要点

> `ohos/` 目录由 `flutter create -t plugin --platforms ohos .` 自动生成。本部分只描述对生成结果的自定义配置。**不要手动创建 `build-profile.json5`、`hvigorfile.ts`、`module.json5` 等配置文件。**

**oh-package.json5 — 添加三方依赖（按需）**

如果插件需要额外的 ohpm 三方包（来自 `02-planning.json` 的 `native_dependency_mapping`），在 `flutter create` 生成的 `ohos/oh-package.json5` 的 `dependencies` 中追加。

> **`@ohos/flutter_ohos` 依赖由 Flutter 构建工具自动注入，无需手动添加。** 如果 `flutter create` 生成了 `"@ohos/flutter_ohos": "file:./libs/flutter.har"`，**必须将其移除**（将 dependencies 设为 `{}`），否则会导致 `Failed to resolve OhmUrl` 编译错误。

**module.json5 — 添加权限声明（按需）**

如果插件需要系统权限（如传感器、定位等），在 `ohos/src/main/module.json5` 的 `module` 下追加 `requestPermissions`。

---

## 第二部分：编码实现

### 纯 EventChannel 结构

```ets
import {
  FlutterPlugin,
  FlutterPluginBinding
} from '@ohos/flutter_ohos/src/main/ets/embedding/engine/plugins/FlutterPlugin';
import EventChannel, {
  EventSink,
  StreamHandler
} from '@ohos/flutter_ohos/src/main/ets/plugin/common/EventChannel';

export default class XxxPlugin implements FlutterPlugin, StreamHandler {
  private eventChannel: EventChannel | null = null;
  private eventSink: EventSink | null = null;

  onAttachedToEngine(binding: FlutterPluginBinding): void {
    this.eventChannel = new EventChannel(binding.getBinaryMessenger(), "event_channel_name");
    this.eventChannel.setStreamHandler(this);
  }

  onDetachedFromEngine(binding: FlutterPluginBinding): void {
    this.eventChannel?.setStreamHandler(null);
    this.eventChannel = null;
    this.eventSink = null;
  }

  onListen(args: Object, events: EventSink): void {
    this.eventSink = events;
    this.startListening(args);
  }

  onCancel(args: Object): void {
    this.stopListening();
    this.eventSink = null;
  }

  private startListening(args: Object): void {
    // 启动原生数据监听
  }

  private stopListening(): void {
    // 停止原生数据监听，释放资源
  }
}
```

### 混合模式（MethodChannel + EventChannel）

大多数插件同时使用两种 Channel（MethodChannel 做控制、EventChannel 做数据流）：

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
import EventChannel, {
  EventSink,
  StreamHandler
} from '@ohos/flutter_ohos/src/main/ets/plugin/common/EventChannel';

export default class XxxPlugin implements FlutterPlugin, MethodCallHandler, StreamHandler {
  private methodChannel: MethodChannel | null = null;
  private eventChannel: EventChannel | null = null;
  private eventSink: EventSink | null = null;
  private context: common.Context | null = null;

  onAttachedToEngine(binding: FlutterPluginBinding): void {
    this.context = binding.getApplicationContext();

    this.methodChannel = new MethodChannel(binding.getBinaryMessenger(), "method_channel_name");
    this.methodChannel.setMethodCallHandler(this);

    this.eventChannel = new EventChannel(binding.getBinaryMessenger(), "event_channel_name");
    this.eventChannel.setStreamHandler(this);
  }

  onDetachedFromEngine(binding: FlutterPluginBinding): void {
    this.stopListening();
    this.methodChannel?.setMethodCallHandler(null);
    this.methodChannel = null;
    this.eventChannel?.setStreamHandler(null);
    this.eventChannel = null;
    this.eventSink = null;
    this.context = null;
  }

  onMethodCall(call: MethodCall, result: MethodResult): void {
    switch (call.method) {
      case "start":
        // 控制命令
        result.success(null);
        break;
      case "stop":
        this.stopListening();
        result.success(null);
        break;
      default:
        result.notImplemented();
        break;
    }
  }

  onListen(args: Object, events: EventSink): void {
    this.eventSink = events;
    this.startListening(args);
  }

  onCancel(args: Object): void {
    this.stopListening();
    this.eventSink = null;
  }

  private startListening(args: Object): void {
    // 启动原生数据监听
  }

  private stopListening(): void {
    // 停止原生数据监听
  }
}
```

### 多 EventChannel 场景

部分插件有多个独立的事件流（如蓝牙插件：扫描结果流 + 连接状态流），需要用多个 StreamHandler 实现：

```ets
export default class XxxPlugin implements FlutterPlugin, MethodCallHandler {
  private scanChannel: EventChannel | null = null;
  private stateChannel: EventChannel | null = null;
  private scanSink: EventSink | null = null;
  private stateSink: EventSink | null = null;

  onAttachedToEngine(binding: FlutterPluginBinding): void {
    // 扫描结果事件流
    this.scanChannel = new EventChannel(binding.getBinaryMessenger(), "xxx/scan");
    this.scanChannel.setStreamHandler({
      onListen: (args: Object, events: EventSink): void => {
        this.scanSink = events;
        this.startScan();
      },
      onCancel: (args: Object): void => {
        this.stopScan();
        this.scanSink = null;
      }
    });

    // 连接状态事件流
    this.stateChannel = new EventChannel(binding.getBinaryMessenger(), "xxx/state");
    this.stateChannel.setStreamHandler({
      onListen: (args: Object, events: EventSink): void => {
        this.stateSink = events;
      },
      onCancel: (args: Object): void => {
        this.stateSink = null;
      }
    });
  }
}
```

### 事件发送

```ets
// 发送成功事件（数据可以是任意可序列化类型）
this.eventSink?.success(data);

// 发送 Map 数据
const eventData = new Map<string, Object>();
eventData.set("type", "update");
eventData.set("value", 42);
this.eventSink?.success(eventData);

// 发送错误事件
this.eventSink?.error("ERROR_CODE", "error message", null);

// 结束事件流（通常不需要主动调用）
this.eventSink?.endOfStream();
```

### Dart 侧接收数据的类型安全（重要）

> **`StandardMessageCodec` 的 number 编码陷阱**：ETS 端通过 `eventSink.success()` 发送的 `number` 值，经 `StandardMessageCodec` 编码时会区分整数和浮点数：
> - 整数值（如 `3.0`、`42`、`180`）→ 编码为 INT32/INT64 → Dart 侧解码为 `int`
> - 浮点值（如 `3.14`、`180.5`）→ 编码为 FLOAT64 → Dart 侧解码为 `double`
>
> 在 Dart null-safe 中，`int` **不能**隐式转为 `double`。如果 Dart 侧将 `dynamic` 直接传入 `double` 类型的构造函数参数，当值恰好为整数时会抛出 `TypeError`，且该异常常被 `onError` 吞掉，导致 stream 静默终止。

**规则**：Dart 侧从 EventChannel 接收数据后，凡目标类型为 `double` 的字段，**必须**先转 `num` 再转 `double`；目标类型为 `int` 的字段同理。

```dart
// ❌ 错误：dynamic 直接传入 double 参数，整数值会崩溃
stream = eventChannel.receiveBroadcastStream().map((data) {
  final list = data as List<dynamic>;
  return SensorEvent(
    x: list[0],        // dynamic → 可能是 int！
    y: list[1],
    accuracy: list[2], // 3.0 经编码后变成 int 3
  );
});

// ✅ 正确：(as num).toDouble() 确保类型安全
stream = eventChannel.receiveBroadcastStream().map((data) {
  final list = data as List<dynamic>;
  return SensorEvent(
    x: (list[0] as num).toDouble(),
    y: (list[1] as num).toDouble(),
    accuracy: (list[2] as num).toDouble(),
  );
});
```

同理，Map 形式的事件数据也需要转换：

```dart
// ✅ Map 形式事件数据
stream = eventChannel.receiveBroadcastStream().map((data) {
  final map = data as Map;
  return LocationEvent(
    latitude: (map['lat'] as num).toDouble(),
    longitude: (map['lng'] as num).toDouble(),
    altitude: (map['alt'] as num).toDouble(),
  );
});
```

### 状态流快照与恢复

当 EventChannel 表达的是系统/设备当前状态，而该状态可在应用外部改变时，`onListen` 不能只监听未来事件。应先调用 `refreshCurrentState('onListen')` 查询当前真实状态并发送一次；应用回到前台、窗口重新获焦、Flutter restart / engine reattach、Ability attach / reattach 等恢复点也应调用同一个刷新入口。

```ets
onListen(args: Object, events: EventSink): void {
  this.eventSink = events;
  this.refreshCurrentState('onListen');
}

private refreshCurrentState(reason: string): void {
  const state = systemApi.getState();
  this.eventSink?.success(this.convertState(state));
}
```

### 资源生命周期管理

EventChannel 插件最容易出问题的地方是资源泄漏。必须确保：

**Timer 清理**：
```ets
private intervalId: number | null = null;

private startListening(args: Object): void {
  this.intervalId = setInterval(() => {
    this.eventSink?.success(this.readSensorData());
  }, 100);
}

private stopListening(): void {
  if (this.intervalId !== null) {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}
```

**系统回调注销**：
```ets
import sensor from '@ohos.sensor';

private startListening(args: Object): void {
  sensor.on(sensor.SensorId.ACCELEROMETER, (data: sensor.AccelerometerResponse) => {
    const eventData = new Map<string, Object>();
    eventData.set("x", data.x);
    eventData.set("y", data.y);
    eventData.set("z", data.z);
    this.eventSink?.success(eventData);
  });
}

private stopListening(): void {
  sensor.off(sensor.SensorId.ACCELEROMETER);
}
```

**资源释放优先级**：
1. `onCancel` — Dart 端取消订阅时：停止监听、清理 timer/callback
2. `onDetachedFromEngine` — 插件卸载时：清理一切资源（Channel、Sink、Context、原生监听）

**防御性编程**：
```ets
// 发送事件前检查 eventSink 是否有效
private sendEvent(data: Object): void {
  if (this.eventSink !== null) {
    this.eventSink.success(data);
  }
}
```

---

## 第三部分：常见编译错误与修复

### 1. `Class 'XxxPlugin' incorrectly implements interface 'StreamHandler'`

**原因**：`onListen` 和 `onCancel` 方法签名不正确。

**修复**：确保签名完全匹配：
```ets
onListen(args: Object, events: EventSink): void { ... }
onCancel(args: Object): void { ... }
```

### 2. `Property 'success' does not exist on type 'EventSink | null'`

**原因**：`eventSink` 声明为可空类型，直接调用方法不安全。

**修复**：使用可选链 `?.` 或先做非空判断：
```ets
this.eventSink?.success(data);
// 或
if (this.eventSink !== null) {
  this.eventSink.success(data);
}
```

### 3. EventChannel 和 MethodChannel 同时实现时 import 冲突

**原因**：同时从不同路径导入 `MethodCallHandler` 和 `StreamHandler`。

**修复**：确保 import 路径正确且不冲突：
```ets
import MethodChannel, {
  MethodCallHandler,
  MethodResult
} from '@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel';
import MethodCall from '@ohos/flutter_ohos/src/main/ets/plugin/common/MethodCall';
import EventChannel, {
  EventSink,
  StreamHandler
} from '@ohos/flutter_ohos/src/main/ets/plugin/common/EventChannel';
```

### 4. `Cannot find module '@ohos.sensor'` 等系统 API 导入错误

**原因**：传感器等 API 可能需要 Kit 级别导入。

**修复**：
- 旧写法：`import sensor from '@ohos.sensor'`
- 新写法（Kit）：`import { sensor } from '@kit.SensorServiceKit'`
- 通过 `sub-api-lookup` 确认当前版本推荐的导入方式

### 5. 匿名 StreamHandler 中 `this` 指向问题

**原因**：使用对象字面量实现 StreamHandler 时，箭头函数中 `this` 可能不指向插件实例。

**修复**：
```ets
// 正确：箭头函数保持 this 指向
this.eventChannel.setStreamHandler({
  onListen: (args: Object, events: EventSink): void => {
    this.eventSink = events;  // this 指向插件实例
  },
  onCancel: (args: Object): void => {
    this.eventSink = null;
  }
});
```

### 6. `'async' modifier cannot be used here`

**原因**：`onListen` / `onCancel` 是 interface 方法，不能声明为 async。

**修复**：异步操作提取到独立方法：
```ets
onListen(args: Object, events: EventSink): void {
  this.eventSink = events;
  this.startListeningAsync();  // 不要 await，让它异步执行
}

private async startListeningAsync(): Promise<void> {
  // 异步初始化
}
```
