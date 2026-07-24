# FFI Strategy: compile_from_source

## 适用条件

仓库内包含 C/C++ 源码（`src/` 目录下有 `.c` / `.cpp` / `.h` 文件），且有 CMakeLists.txt 或类似构建配置，无 Rust Cargo.toml。

## 工程搭建

### 1. 创建 ohos 工程

```bash
flutter create -t plugin_ffi --platforms ohos .
```

### 2. CMakeLists.txt 配置

鸿蒙 CMakeLists.txt 与 Android 有显著差异：

```cmake
cmake_minimum_required(VERSION 3.13)
project(xxx_library)

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})

add_library(xxx SHARED
  ${CMAKE_CURRENT_SOURCE_DIR}/../../../../src/xxx.c
  ${CMAKE_CURRENT_SOURCE_DIR}/../../../../src/yyy.c
)

target_include_directories(xxx PRIVATE
  ${CMAKE_CURRENT_SOURCE_DIR}/../../../../src/
)

target_link_libraries(xxx PUBLIC libace_napi.z.so)
```

### 3. Android NDK → OHOS 系统库映射

| Android | OHOS | 用途 |
|---------|------|------|
| `log` (`__android_log_print`) | `libhilog_ndk.z.so` (`OH_LOG_Print`) | 日志 |
| `android` (`libandroid.so`) | — | OHOS 无对等，需用 IPC Kit / Window Kit 等 |
| `EGL` / `GLESv2` | `EGL` / `GLESv3.0`（鸿蒙保留） | 图形 |
| `mediandk` | — | 媒体，需查 `@ohos.multimedia` Kit |
| `OpenSLES` | `OH_AudioKit` | 音频 |
| `jnigraphics` | `libnative_drawing.so` | 位图 |
| JNI (`<jni.h>`) | NAPI (`<napi/native_api.h>`) | 原生接口 |
| CMake 工具链 | `android.toolchain.cmake` | 鸿蒙 SDK 内置 |
| ABI | `armeabi-v7a`, `arm64-v8a` | `arm64-v8a`（鸿蒙主要支持 arm64） |

### 4. oh-package.json5

FFI 插件通常不需要额外 ohpm 依赖。

> **`@ohos/flutter_ohos` 依赖由 Flutter 构建工具自动注入，无需手动添加。** 如果 `flutter create` 生成了 `"@ohos/flutter_ohos": "file:./libs/flutter.har"`，**必须将其移除**（将 dependencies 设为 `{}`），否则会导致 `Failed to resolve OhmUrl` 编译错误。

## 编码实现

### .so 加载路径

```dart
import 'dart:ffi';
import 'dart:io' show Platform;

DynamicLibrary _openLibrary() {
  if (Platform.isAndroid || Platform.isLinux || Platform.isOhos) {
    return DynamicLibrary.open('libxxx.so');
  }
  if (Platform.isIOS || Platform.isMacOS) {
    return DynamicLibrary.process();
  }
  if (Platform.isWindows) {
    return DynamicLibrary.open('xxx.dll');
  }
  throw UnsupportedError('Unsupported platform: ${Platform.operatingSystem}');
}
```

### 日志替换

```c
#if defined(__ANDROID__)
#include <android/log.h>
#define LOG_TAG "xxx"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#elif defined(__OHOS__)
#include <hilog/log.h>
#define LOG_TAG "xxx"
#define LOGI(...) OH_LOG_Print(LOG_INFO, LOG_APP, 0, LOG_TAG, __VA_ARGS__)
#else
#define LOGI(...) printf(__VA_ARGS__)
#endif
```

### 条件编译宏

鸿蒙 NDK 预定义宏：
- `__OHOS__` — 鸿蒙平台标识
- `__aarch64__` — ARM64 架构

```c
#if defined(__OHOS__)
  // 鸿蒙特定代码
#elif defined(__ANDROID__)
  // Android 特定代码
#endif
```

### 不兼容系统调用替代

| 不可用的 API | 鸿蒙替代 | 说明 |
|-------------|---------|------|
| `pthread_setname_np` | 可用，签名相同 | |
| `dlopen` / `dlsym` | 可用 | 动态库加载 |
| `mmap` / `munmap` | 可用 | 内存映射 |
| Android Binder | 不可用 | 鸿蒙使用 IPC Kit |
| `/proc/self/maps` | 路径不同 | 进程信息获取方式不同 |

### pubspec.yaml 平台声明

```yaml
flutter:
  plugin:
    platforms:
      ohos:
        ffiPlugin: true
```

## 常见编译错误与修复

### 1. `undefined reference to '__android_log_print'`

C/C++ 代码中使用了 Android 专用日志函数。
修复：添加 `__OHOS__` 条件编译，链接 `libhilog_ndk.z.so`。

### 2. `fatal error: 'android/xxx.h' file not found`

包含了 Android NDK 专用头文件。
修复：用 `#ifdef __ANDROID__ ... #endif` 包裹，鸿蒙对应头文件通常在不同路径。

### 3. `CMake Error: Cannot find source file`

CMakeLists.txt 中源文件路径不对。
修复：路径相对于 `ohos/src/main/cpp/`，插件源码通常用 `../../../../src/` 访问。

### 4. `undefined symbol: xxx` （链接错误）

缺少系统库链接。
修复：在 CMakeLists.txt 中添加：
```cmake
target_link_libraries(xxx PUBLIC
  libace_napi.z.so
  libhilog_ndk.z.so
)
```

### 5. `error: use of undeclared identifier '__OHOS__'`

编译器没有预定义 `__OHOS__` 宏。
修复：确认使用鸿蒙 NDK，或手动添加 `add_definitions(-D__OHOS__)`。

### 6. Dart 层 `DynamicLibrary.open` 失败

.so 文件名不对或未正确打包。
修复：确认 CMakeLists.txt 中 `add_library` 库名与 Dart 层加载名一致。`add_library(xxx SHARED ...)` 生成 `libxxx.so`。

### 7. `Platform.isOhos` 不存在

需要使用 Flutter OHOS 版本。Flutter OHOS 分支已原生支持 `Platform.isOhos`。
