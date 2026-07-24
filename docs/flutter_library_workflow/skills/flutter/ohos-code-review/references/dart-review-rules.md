# Dart 层代码审查清单

面向 Flutter 插件鸿蒙适配中 Dart 层变更的审查。

审查对象：`lib/` 下被本次适配修改的 `.dart` 文件。未修改的原有代码不在审查范围。

---

## 第一维度：平台通路完整性（P0）

### 平台判断分支

| 违规模式 | 规则 | 修复方式 |
|---------|------|---------|
| `Platform.isAndroid` / `Platform.isIOS` 判断链缺少 `Platform.isOhos` | `cr-dart-missing-ohos-branch` | 补 `Platform.isOhos` 分支 |
| `!isAndroid && !isIOS` → `throw UnsupportedError` 白名单拦截 | `cr-dart-whitelist-block` | 加入 `&& !Platform.isOhos` |
| `TargetPlatform` switch 缺少 `ohos` case | `cr-dart-target-platform` | 补 `TargetPlatform.ohos` case |
| `[TargetPlatform.android, TargetPlatform.iOS].contains(...)` 缺少 ohos | `cr-dart-platform-contains` | 加入 `TargetPlatform.ohos` |
| 条件导入 / 工厂方法缺少 OHOS 路径 | `cr-dart-factory-ohos` | 补 OHOS 工厂分支 |
| 排除法判断平台（`!isAndroid && !isIOS && ...`） | `cr-dart-no-exclusion-detect` | 改为正向判断 `Platform.isOhos` |
| `Platform.operatingSystem == 'ohos'` 字符串比较 | `cr-dart-no-string-platform` | 改为 `Platform.isOhos` |

检测方式：
```bash
grep -rn 'Platform\.isAndroid\|Platform\.isIOS\|TargetPlatform\|UnsupportedError\|PlatformException' lib/
```
逐条确认 OHOS 分支是否存在。

### 平台注册

| 检查项 | 规则 | 说明 |
|--------|------|------|
| `pubspec.yaml` 的 `flutter.plugin.platforms` 包含 `ohos` 键 | `cr-dart-pubspec-ohos` | 缺失则插件不会在 OHOS 上加载 |
| `ohos` 平台声明中包含 `dartPluginClass` 字段 | `cr-dart-pubspec-dart-plugin-class` | 联合插件**必须**声明 `dartPluginClass`，否则 `registerWith()` 不会被自动调用，导致 `Platform.instance` 为 null 运行时崩溃。非联合插件（单包插件）不需要此字段 |
| `pluginClass` 指向的 ETS 类存在 | `cr-dart-plugin-class-exists` | `ohos/src/main/ets/` 中必须有对应类文件 |
| Dart 层的 `registerWith` 或 `registerPlugin` 包含 OHOS 路径 | `cr-dart-register-ohos` | 联合插件必须注册 OHOS 实现包 |

---

## 第二维度：公开 API 不变性（P0）

### 签名保护

| 检查项 | 规则 | 说明 |
|--------|------|------|
| 公开类的方法签名未改变 | `cr-dart-api-signature` | 适配修改不得改变 `lib/` 下公开类/方法/属性的签名 |
| 未删除原有公开方法 | `cr-dart-api-no-delete` | 不得删除原有公开 API |
| 返回类型未改变 | `cr-dart-api-return-type` | 不得修改原有方法的返回类型 |
| 其他平台行为路径未受影响 | `cr-dart-api-no-side-effect` | OHOS 分支不得改变 Android/iOS 的已有行为 |
| OHOS 专属逻辑已隔离 | `cr-dart-ohos-isolated` | 新增的 OHOS 逻辑必须用 `Platform.isOhos` 隔离 |

检测方式：`git diff lib/` 中的公开 API 变更，逐条确认是否影响其他平台行为

---

## 第三维度：类型安全（P1）

### Channel 返回类型

| 违规模式 | 规则 | 说明 |
|---------|------|------|
| `invokeMethod` 无泛型参数 | `cr-dart-invoke-no-generic` | 必须明确 `<T>`，如 `invokeMethod<bool>('xxx')` |
| `dynamic` 接收 Channel 返回后强转 | `cr-dart-no-dynamic-cast` | 直接用泛型，不要 `as T` |
| 可空返回值未做 null check | `cr-dart-null-check` | Channel 返回值可能为 null，使用前必须判空 |
| 泛型 `T` 与 ETS 端返回类型不匹配 | `cr-dart-generic-mismatch` | 参见 channel-review-rules.md 第三维度 |
| Channel `dynamic` 数据直接传入 `double` 参数 | `cr-dart-dynamic-to-double` | `StandardMessageCodec` 整数值编码为 `int`，Dart null-safe 不允许 `int→double` 隐式转换，必须用 `(x as num).toDouble()` |
| Channel `dynamic` 数据直接传入 `int` 参数 | `cr-dart-dynamic-to-int` | 同理，必须用 `(x as num).toInt()`，防止 `double` 值传入 `int` 参数 |
| `Uint8List.toList()` 后传入 Channel | `cr-dart-uint8list-tolist` | `toList()` 将 `Uint8List` 转为 `List<int>`，`StandardMessageCodec` 编码类型改变，ETS 侧收到 `Array<number>` 而非 `Uint8Array` |
| MethodChannel 返回的 List 使用 `.cast<Map<String, dynamic>>()` | `cr-dart-no-cast-map` | Channel 返回的 Map 实际类型是 `_Map<Object?, Object?>`，`.cast<>()` 会运行时崩溃。必须改用 `.map((e) => Map<String, dynamic>.from(e as Map)).toList()` |
| MethodChannel 返回的单个 Map 未做 `Map<String, dynamic>.from()` 转换 | `cr-dart-single-map-from` | `invokeMethod<Map<String, dynamic>?>` 直接接收 Channel 返回值会类型不匹配，应使用 `invokeMethod<Map<dynamic, dynamic>>()` 后用 `Map<String, dynamic>.from(result)` 转换 |

检测方式：在 `lib/` 中搜索 `receiveBroadcastStream` 和 `invokeMethod` 的返回值解构处，追踪 `dynamic` 数据流向 `double`/`int` 类型参数的路径：
```bash
grep -n 'receiveBroadcastStream\|\.map\|as List\|as Map' lib/**/*.dart
grep -n '\.toList()' lib/**/*.dart  # 检查是否对 Uint8List 调用了 toList() 后传入 Channel
```
重点检查：构造函数调用中直接使用 `data[n]` 或 `map['key']` 而未做 `as num` 转换的位置。

### Android 专有依赖（P0）

适配时 OHOS 分支常复用 Android 逻辑，但不得引入 Android 专有依赖：

| 违规模式 | 规则 | 说明 |
|---------|------|------|
| OHOS 分支调用 Android 专有 `.so` | `cr-dart-no-android-so` | `libxxxandroid*.so` 在 OHOS 上不存在 |
| 引用 `android.*` 包 | `cr-dart-no-android-import` | `android.content.Context` 等 OHOS 无此 API |
| 通过 MethodChannel 调用 Android 专有 helper | `cr-dart-no-android-channel` | OHOS 端无对应 handler |
| OHOS 分支使用 `AndroidHelper` 等工具类 | `cr-dart-no-android-helper` | 需替换为 OHOS 原生 API 或纯 Dart 方案 |

---

## 第四维度：导入与依赖（P3）

### 导入规范

| 检查项 | 规则 | 说明 |
|--------|------|------|
| 未使用的 import | `cr-dart-unused-import` | 删除未使用的导入 |
| `dart:io` 导入方式 | `cr-dart-io-import` | 建议 `import 'dart:io' show Platform` |
| 平台特有包进入公共层 | `cr-dart-platform-leak` | Android/iOS 专有包不应出现在 OHOS 可达的代码路径 |

### FFI 相关（仅 FFI 插件）

| 检查项 | 规则 | 说明 |
|--------|------|------|
| `DynamicLibrary.open` 的 OHOS 分支 | `cr-dart-ffi-ohos-open` | OHOS 与 Android 共享 `.so` 加载方式，分支应合并 |
| `@Native` 注解的旁路处理 | `cr-dart-ffi-native-bypass` | OHOS 需要 `DynamicLibrary.lookup` 旁路，原 `@Native` 保留 |

---

## 检测要求

- 仅审查 `lib/` 下被本次适配修改的 `.dart` 文件
- 未修改的原有代码不报告（原代码质量不在审查范围）
- `example/lib/` 下的 Dart 代码不在此清单范围（由 04-testing 阶段处理）
- 对于公开 API 不变性检查，需结合 `git diff` 确认变更是否影响其他平台

## 忽略规则

- `Platform.isOhos` 在 `import 'dart:io'` 中合法（Flutter OHOS 分支已原生支持）
- `dependency_overrides` 中的 `git` 依赖格式由 `flutter-adapted-library` Skill 保证，不重复审查
- `pubspec.yaml` 的 `dependency_overrides` 段不属于代码审查范围
- 纯 Dart 包（`type-pure-dart`）无 Channel 和 ETS 代码，仅审查平台判断和公开 API 不变性
