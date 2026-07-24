# FFI Binding Translate: @Native → DynamicLibrary 旁路注入

## 根因

Flutter OHOS 工具链未接入 Dart native asset 系统。`@Native` 注解编译期合法，但运行时符号解析失败：

```
Couldn't resolve native function 'probe_add'
  No asset with id 'package:xxx/xxx.dart' found.
  No available native assets.
Attempted to fallback to process lookup.
  do_dlsym failed: Symbol not found: probe_add
  so=/system/bin/appspawn   ← fallback 查错了进程
```

- `@Native` 依赖 native asset 机制（Dart 3.x，通过 hook/build.dart 注入符号→.so 映射）
- Flutter Android/iOS 工具链完整接入 → 正常
- Flutter OHOS 未实现 → fallback 到 process lookup → 查到 appspawn 而非已加载的 .so → 失败
- 对照组 `DynamicLibrary.lookup()` 调同一 .so 同一符号 → 成功

## 翻译策略：旁路注入，不替换

**保留原 `@Native` 不动**（避免与 Android/iOS 分歧），新增 OHOS 专属绑定文件，调用点用 `Platform.isOhos` 分流。

### 文件结构

```
lib/
├── src/ffi/
│   ├── original_bindings.dart      # 原文件，含 @Native（不动）
│   └── xxx_ohos_ffi.dart           # 新增，OHOS 旁路 FFI
└── xxx.dart                        # 入口，加 Platform.isOhos 分流
```

### 模板

#### 1. OHOS 旁路文件（`lib/src/ffi/xxx_ohos_ffi.dart`）

```dart
import 'dart:ffi' as ffi;
import 'dart:io' show Platform;

class OhosBindings {
  static final instance = OhosBindings._();

  OhosBindings._() : _lib = ffi.DynamicLibrary.open('libxxx.so');

  final ffi.DynamicLibrary _lib;

  late final int Function(int, int) myAdd = _lib
      .lookup<ffi.NativeFunction<ffi.Int32 Function(ffi.Int32, ffi.Int32)>>('my_add')
      .asFunction<int Function(int, int)>();

  // ... 其他方法同理
}
```

#### 2. 原文件调用点分流（`lib/xxx.dart`）

```dart
// 原文件（不改声明，只在调用层分流）
@Native<Int32 Function(Int32, Int32)>(symbol: 'my_add', isLeaf: true)
external int myAddNative(int a, int b);

import 'src/ffi/xxx_ohos_ffi.dart';
import 'dart:io' show Platform;

int myAdd(int a, int b) => Platform.isOhos
    ? OhosBindings.instance.myAdd(a, b)
    : myAddNative(a, b);
```

### 翻译规则

`@Native<T>(symbol: 'x') external R fn(Args)` 机械映射为：

```dart
late final R Function(Args) fn = _lib
    .lookup<ffi.NativeFunction<T>>('x')
    .asFunction<R Function(Args)>();
```

类型映射：

| @Native 原始类型 | Dart 类型 |
|------------------|----------|
| `ffi.Int32` / `ffi.Uint32` | `int` |
| `ffi.Int8` / `ffi.Uint8` / `ffi.Int16` / `ffi.Uint16` / `ffi.Size` / `ffi.IntPtr` | `int` |
| `ffi.Float` / `ffi.Double` | `double` |
| `ffi.Pointer<T>` | `ffi.Pointer<T>` |
| `ffi.Bool` | `bool` |
| `ffi.Void` | `void` |

`isLeaf: true` 无需特殊处理，`asFunction` 默认支持。

### 批量处理（大量 @Native 声明）

若原文件有大量 `@Native` 声明（如 sodium 有数百个），编写生成脚本：

```dart
// tool/generate_ohos_ffi.dart
// 参考：repos/sodium/tool/generate_ohos_ffi.dart
//
// 核心逻辑：
// 1. 读取原 FFI 绑定文件
// 2. 正则提取 @Native 声明（nativeType、returnType、funcName、params）
// 3. 为每个声明生成 lookupFunction 代码
// 4. 输出到 lib/src/ffi/xxx_ohos_ffi.dart
```

### 参考：sodium 完整实现

- 原绑定：`repos/sodium/lib/src/ffi/bindings/libsodium.ffi.dart`（含大量 `@Native`）
- 生成脚本：`repos/sodium/tool/generate_ohos_ffi.dart`
- OHOS 旁路：`repos/sodium/lib/src/ffi/bindings/libsodium_ohos.ffi.dart`
- 入口分流：`repos/sodium/lib/src/ffi/bindings/libsodium.ffi.wrapper.dart` 中 `Platform.isOhos`

## 硬约束

1. **不删除原有 `@Native`**：保留原文件不动，避免与 Android/iOS 分歧
2. **不替换原有 `@Native`**：不要把原文件的 `@Native` 改写为 `lookupFunction`
3. **旁路注入**：新增 OHOS 专用文件 + `Platform.isOhos` 分流
4. **命名约定**：OHOS 旁路文件统一命名为 `xxx_ohos_ffi.dart` 或 `xxx_ohos.ffi.dart`

## 触发条件

此文件仅在 `primary-03-coding-library.md` 的 type-ffi 分支末尾被加载：
- 执行 `grep -r '@Native<' lib/`
- 有命中 → 加载本文件
- 无命中 → 跳过
