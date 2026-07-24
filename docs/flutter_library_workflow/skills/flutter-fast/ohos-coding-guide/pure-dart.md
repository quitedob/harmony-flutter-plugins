# 纯 Dart 包鸿蒙适配

## 适用条件

- 包类型为纯 Dart（无 `android/`、`ios/` 目录）
- 但可能依赖了有平台特定代码的包
- 或使用了 `dart:io` 中的平台判断逻辑

---

## 第一部分：工程搭建

### 无需创建工程

纯 Dart 包不需要 `flutter create`，主要工作是：
1. 检查依赖链中是否有不支持 OHOS 的包
2. 修改平台判断逻辑
3. 确保 `flutter pub get` 能成功

### pubspec.yaml 检查

确认 `pubspec.yaml` 中：
- 没有用 `platforms:` 字段限制平台支持范围
- 如果有 `flutter.plugin.platforms` 配置，添加 `ohos` 条目

### 编译验证命令

纯 Dart 包没有原生代码，无需 `flutter build hap`，编译验证为：
```bash
flutter pub get
```

如果 `flutter pub get` 成功且无 Dart 分析错误，即视为编译通过。

---

## 第二部分：编码实现

### 平台判断兼容

如果代码中使用了 `Platform.isXxx` 判断，需要添加 OHOS 支持。

> **必须遵循 CLAUDE.md 中的「平台检测标准」**：直接使用 `Platform.isOhos`，不使用排除法或字符串比较。

```dart
import 'dart:io' show Platform;

// 修改前：缺少 OHOS 分支
if (Platform.isAndroid) {
  // Android 逻辑
} else if (Platform.isIOS) {
  // iOS 逻辑
}

// 修改后：添加 OHOS 分支
if (Platform.isAndroid) {
  // Android 逻辑
} else if (Platform.isIOS) {
  // iOS 逻辑
} else if (Platform.isOhos) {
  // OHOS 逻辑（通常与 Android 逻辑相近）
}
```

### 条件导入

如果使用了条件导入，需要确认 OHOS 能正确匹配：

```dart
// OHOS 属于 dart:io 平台，会匹配 dart.library.io 条件
import 'stub.dart'
    if (dart.library.io) 'io.dart'
    if (dart.library.html) 'web.dart';
```

通常无需额外修改，因为 OHOS 支持 `dart:io`。

### 依赖链检查

检查所有传递依赖中是否有平台原生插件：

```bash
flutter pub deps
```

对输出结果中的每个包，检查其 `pubspec.yaml` 是否有 `flutter.plugin.platforms` 配置。
不支持 OHOS 的平台原生插件会导致运行时 `MissingPluginException`（编译时不报错）。

**常见需要处理的依赖**：

| 依赖包 | 问题 | 处理方式 |
|--------|------|---------|
| `path_provider` | 无 OHOS 实现 | 用 `Directory.systemTemp`（dart:io）替代 |
| `shared_preferences` | 无 OHOS 实现 | 用内存缓存替代或移除 |
| `url_launcher` | 无 OHOS 实现 | 通过 MethodChannel 调用 OHOS Want |
| `package_info_plus` | 无 OHOS 实现 | 硬编码或通过 MethodChannel 获取 |

### 处理不支持 OHOS 的传递依赖

**方案 A：try-catch 包裹**
```dart
Future<String> getSomePath() async {
  try {
    final dir = await getApplicationDocumentsDirectory();
    return dir.path;
  } catch (_) {
    return Directory.systemTemp.path;
  }
}
```

**方案 B：平台判断跳过**
```dart
if (!Platform.isOhos) {
  await _initSharedPreferences();
}
```

**方案 C：提供默认值**
```dart
String get storagePath {
  if (Platform.isOhos) {
    return '/data/storage/el2/base/haps/entry/files';
  }
  return _nativeStoragePath;
}
```

---

## 第三部分：常见编译错误与修复

### 1. `The getter 'isOhos' isn't defined for the class 'Platform'`

**原因**：标准 Dart SDK 未定义 `Platform.isOhos`，需要使用 Flutter OHOS 分支。

**修复**：
- 确认使用的是 Flutter OHOS 版本（`flutter --version` 应显示 OpenHarmony 相关信息）
- Flutter OHOS 分支已原生支持 `Platform.isOhos`，直接使用即可

### 2. `A value of type 'Future<xxx>' can't be assigned to a variable of type 'yyy'`

**原因**：添加 try-catch 后改变了返回类型。

**修复**：确保 try-catch 的返回类型与原始方法一致：
```dart
Future<Directory> getDir() async {
  try {
    return await getApplicationDocumentsDirectory();
  } catch (_) {
    return Directory.systemTemp;  // 返回类型一致
  }
}
```

### 3. `Target of URI doesn't exist: 'package:xxx/xxx.dart'`

**原因**：传递依赖包缺失。

**修复**：
- 运行 `flutter pub get` 重新获取依赖
- 检查 `pubspec.yaml` 中的依赖版本约束是否正确
- 如果是路径依赖，检查路径是否存在

### 4. `flutter pub get` 报版本冲突

**原因**：不同依赖包对同一依赖要求的版本范围不兼容。

**修复**：
- 在 `pubspec.yaml` 中添加 `dependency_overrides` 强制使用特定版本
- 或调整版本约束范围
- 检查是否有多个包依赖不同版本的 `platform_interface`

### 5. Dart 分析报 `dead_code` 或 `unreachable_switch_case`

**原因**：添加 OHOS 平台分支后可能触发静态分析警告。

**修复**：
- 如果是 `Platform.isXxx` 枚举式判断，确保覆盖所有平台或添加 `else` 默认分支
- 警告不影响编译，但建议修复以保持代码质量
