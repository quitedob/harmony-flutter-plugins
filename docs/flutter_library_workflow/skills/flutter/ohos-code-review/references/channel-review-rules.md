# Channel 通信审查清单

面向 MethodChannel / EventChannel / BasicMessageChannel 的 Dart-ETS 两端一致性审查。

审查对象：包含 Channel 实现的 `.ets` 文件和对应的 `.dart` 文件，必须同时读取两端代码进行交叉比对。

---

## 第一维度：Channel 名称一致性（P0）

### 名称匹配

| 检查项 | 规则 | 说明 |
|--------|------|------|
| Dart 端 channel name 与 ETS 端完全一致 | `cr-ch-name-match` | 逐字符比对，包含 `/` 和 `.` |
| 大小写完全匹配 | `cr-ch-name-case` | Channel name 区分大小写 |
| 同一插件内 Channel name 不重复 | `cr-ch-name-unique` | EventChannel 和 MethodChannel 的 name 不得冲突 |

检测方式：
1. 从 Dart 端提取所有 Channel 声明：`grep "MethodChannel('\|EventChannel('\|BasicMessageChannel('" lib/**/*.dart`
2. 从 ETS 端提取所有 Channel 注册：`grep "MethodChannel(\|EventChannel(" ohos/src/main/ets/**/*.ets`
3. 逐对比较 name 值，报告不一致项

### 常见错误模式

| 错误 | 示例 | 说明 |
|------|------|------|
| 斜杠与点号混用 | Dart: `com.example/plugin` vs ETS: `com.example.plugin` | 必须完全一致 |
| 多余空格 | Dart: `'my_plugin '` vs ETS: `'my_plugin'` | 尾部空格导致不匹配 |
| 字符串引号内换行 | 换行符被编入 name | 确认 name 是纯字符串 |

---

## 第二维度：方法名与参数契约（P0）

### 方法名匹配

| 检查项 | 规则 | 说明 |
|--------|------|------|
| Dart `invokeMethod('xxx')` 的方法名与 ETS handler 中的方法名完全一致 | `cr-ch-method-match` | 逐字符比对 |
| ETS 端处理的全部方法名，在 Dart 端均有对应调用 | `cr-ch-method-coverage` | 排除 `notImplemented` 兜底分支 |
| 方法名大小写一致 | `cr-ch-method-case` | `getVersion` vs `GetVersion` 会导致调用失败 |

### 参数传递模式

| Dart 传参方式 | ETS 正确获取方式 | 规则 |
|-------------|-----------------|------|
| `invokeMethod("m", value)` — 单值传参 | `call.args as Type` | `cr-ch-args-single` |
| `invokeMethod("m", {"k": v})` — Map 传参 | `(call.args as Map<string, Object>).get("key")` 或 `call.argument("key")` | `cr-ch-args-map` |
| `invokeMethod("m")` — 无参数 | 不访问 `call.args`（或判空后处理） | `cr-ch-args-none` |

### 参数常见违规

| 违规模式 | 规则 | 说明 |
|---------|------|------|
| `call.argument` 当属性使用 | `cr-ch-argument-is-method` | `argument` 是方法（需传 key 参数），不是属性 |
| 参数 key 拼写不一致 | `cr-ch-args-key-typo` | Dart 传 `"fileName"`，ETS 读 `"file_name"` |
| 参数类型不匹配 | `cr-ch-args-type-mismatch` | Dart 传 `int`，ETS 按 `string` 读取 |
| 未处理参数为 null 的情况 | `cr-ch-args-null-check` | Channel 参数可能为 null，ETS 端需判空 |

检测方式：
1. 从 Dart 端提取每个 `invokeMethod` 的方法名和传参 Map 的 key 列表
2. 从 ETS 端提取对应方法的 `call.argument("key")` 或 `call.args as ...` 调用
3. 比对方法名、key 名称和参数类型

---

## 第三维度：返回值类型安全（P0）

### 类型匹配规则

| Dart `invokeMethod<T>` 的 T | ETS `result.success(value)` 的 value 类型 | 规则 |
|----------------------------|------------------------------------------|------|
| `bool` | `boolean` | `cr-ch-ret-bool` |
| `String` | `string` | `cr-ch-ret-string` |
| `int` | `number`（整数值） | `cr-ch-ret-int` |
| `double` | `number` | `cr-ch-ret-double` |
| `Map<String, dynamic>` | `Map<string, Object>` 或 `HashMap<string, Object>` | `cr-ch-ret-map` |
| `List<T>` | `Array<T>` | `cr-ch-ret-list` |
| `Uint8List` | `ArrayBuffer` 或 `number[]` | `cr-ch-ret-bytes` |
| `void` / 无泛型 | `result.success(null)` 或 `result.success(undefined)` | `cr-ch-ret-void` |

### 高频类型陷阱

| 陷阱 | 规则 | 正确做法 |
|------|------|---------|
| 布尔值用字符串 `'true'` / `'false'` 返回 | `cr-ch-bool-as-string` | ETS 必须返回 `boolean` 类型：`result.success(true)` |
| 数值用字符串 `'123'` 返回 | `cr-ch-num-as-string` | ETS 必须返回 `number` 类型：`result.success(123)` |
| null / '' / 0 / false 语义混淆 | `cr-ch-null-inconsistent` | 空值语义必须两端一致：Dart 期望 `null` 时 ETS 不能返回 `''` |
| Map 的 key 类型不一致 | `cr-ch-map-key-type` | Dart `Map<String, X>` ↔ ETS `Map<string, X>`，key 必须为 `string` |
| List 元素类型不一致 | `cr-ch-list-element-type` | Dart `List<Map<String, dynamic>>` ↔ ETS `Array<Map<string, Object>>` |
| Map 构造方式错误 | `cr-ch-map-construction` | ETS 应使用 `new Map<string, Object>()` + `.set()`，不用对象字面量 |
| ETS `number` 整数值经编码后 Dart 侧变为 `int` | `cr-ch-number-int-ambiguity` | ETS `eventSink.success(3.0)` 或 `result.success(map)` 含整数值时，Dart 侧收到 `int` 而非 `double`，直接传入 `double` 参数崩溃。Dart 侧必须 `(x as num).toDouble()` |
| Dart 侧 `Uint8List.toList()` 后传入 Channel | `cr-ch-uint8list-tolist` | `.toList()` 将 `Uint8List` 转为 `List<int>`，ETS 侧收到 `Array<number>` 而非 `Uint8Array`，无 `.buffer` 属性，图片/音频等二进制处理 API 崩溃 |

检测方式：
1. 从 Dart 端提取 `invokeMethod<T>` 的泛型 `T`
2. 从 ETS 端提取对应方法的 `result.success(...)` 参数
3. 逐方法比对类型匹配

---

## 第四维度：EventChannel 对称性（P1）

### 生命周期对称

| 检查项 | 规则 | 说明 |
|--------|------|------|
| `onListen` 中注册的监听，`onCancel` 中必须取消 | `cr-ch-event-cancel-symmetric` | 注册和取消必须成对出现 |
| `onCancel` 后不再调用 `eventSink.success` / `eventSink.error` | `cr-ch-event-sink-after-cancel` | cancel 后 sink 已失效，调用会崩溃或静默丢弃 |
| `eventSink` 生命周期管理 | `cr-ch-event-sink-lifecycle` | `onListen` 时保存 sink 引用，`onCancel` 时置 null |
| Dart `receiveBroadcastStream` 数据类型与 ETS `eventSink.success` 类型一致 | `cr-ch-event-data-type` | 两端数据类型必须匹配 |

### 常见 EventChannel 问题

| 问题 | 规则 | 说明 |
|------|------|------|
| `eventSink` 作为类字段但未声明可空 | `cr-ch-event-sink-nullable` | 应声明为 `EventSink | null`，初始为 null |
| 系统回调中直接使用 sink 未判空 | `cr-ch-event-sink-null-guard` | 回调触发时可能已 cancel，必须 `if (sink !== null)` |
| `onCancel` 为空实现 | `cr-ch-event-cancel-empty` | 必须包含监听取消逻辑 |

---

## 第五维度：错误码体系（P2）

### 一致性

| 检查项 | 规则 | 说明 |
|--------|------|------|
| `result.error(code, message, details)` 的 code 使用统一前缀 | `cr-ch-error-code-prefix` | 建议格式：`PLUGIN_NAME_ERROR_TYPE`，如 `BLUE_NOT_AVAILABLE` |
| 同一插件内错误码不重复 | `cr-ch-error-code-unique` | 不同含义的错误使用不同 code |
| Dart 端能覆盖 ETS 端所有 error code | `cr-ch-error-code-coverage` | Dart `PlatformException` catch 应能处理所有可能的 error code |
| error message 提供有意义的信息 | `cr-ch-error-message-useful` | 禁止空 message 或无意义 message（如 `"error"`） |

---

## 检测要求

- **必须同时读取 Dart 端和 ETS 端代码**，交叉比对；单看一端无法发现契约不一致
- 以 Dart 端公开 API 调用为基准，逐方法检查 ETS 端实现
- 不仅检查"有没有这个方法"，更检查"参数和返回值是否一致"
- 对复合数据结构（嵌套 Map、List 内含 Map 等），追踪到最内层类型

## 忽略规则

- 未实现的方法（已在 `not_implemented` 中声明且返回 `notImplemented()`）不检查返回值类型
- `BasicMessageChannel` 的编解码器匹配由框架保证，不重复审查
- `MethodChannel` 默认的 `StandardMethodCodec` 覆盖的基本类型映射（`String`↔`string`、`bool`↔`boolean` 等）由框架保证，只审查开发者自行传递的复合结构。**例外**：`int`/`double`/`number` 的映射存在歧义（见 `cr-ch-number-int-ambiguity`），`Uint8List` 经 `.toList()` 后编码类型改变（见 `cr-ch-uint8list-tolist`），这两类仍需审查
