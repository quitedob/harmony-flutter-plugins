# FFI Strategy: prebuilt_bundle

## 适用条件

仓库内无 C/C++ 源码（没有 `src/` 目录下的 `.c` / `.cpp`），仅有预编译 `.so` 文件（通常在 `android/src/main/jniLibs/`、`ios/` 等目录），或有 `.so` 但无对应源码。

典型代表：sodium（libsodium 预编译库）。

## 工程搭建

### 1. 创建 ohos 工程

```bash
flutter create -t plugin_ffi --platforms ohos .
```

### 2. 预编译 .so 准备

需要获取或构建 arm64-v8a 版本的 `.so`。来源优先级：

1. **仓库内已有 arm64 .so**：直接复用（通常在 `android/src/main/jniLibs/arm64-v8a/`）
2. **仓库内有其他架构 .so 但无 arm64**：需要用鸿蒙 NDK 重新编译（切换到 `compile_from_source` 策略）
3. **上游项目提供预编译 .so**：从上游下载 arm64 版本
4. **自行交叉编译**：从源码编译（切换到 `compile_from_source` 或 `rust_cross_compile`）

将 `.so` 放到：

```
ohos/src/main/cpp/libs/arm64-v8a/
```

**⚠️ soname 重命名（必须）**：OHOS 安装器只识别 `.so` 后缀，会丢弃 `.so.2`、`.so.1.1` 等带版本号的文件。如果上游提供的文件名含 soname 后缀（如 `libmpv.so.2`），**必须在 CMakeLists.txt 中重命名为 `libxxx.so`**：

```cmake
# 解压后立即重命名
if(EXISTS "${LIB_DIR}/libmpv.so.2")
  file(RENAME "${LIB_DIR}/libmpv.so.2" "${LIB_DIR}/libmpv.so")
endif()
```

后续 CMakeLists.txt 的 `target_link_libraries()`、`install()` 和 Dart 层 `DynamicLibrary.open()` 统一使用重命名后的 `libxxx.so`。

### 3. CMakeLists.txt 配置（IMPORTED 模式）

```cmake
cmake_minimum_required(VERSION 3.13)
project(xxx_library)

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})

set(LIB_DIR ${CMAKE_CURRENT_SOURCE_DIR}/libs/${OHOS_ARCH})

add_library(xxx_ffi SHARED
    ${CMAKE_CURRENT_SOURCE_DIR}/dummy.c
)

target_link_libraries(xxx_ffi PUBLIC
    ${LIB_DIR}/libxxx.so              # ← 重命名后的 .so（必须无 soname 版本号后缀）
    libace_napi.z.so
)

install(FILES ${LIB_DIR}/libxxx.so   # ← 文件名必须与上面一致，且为 .so 格式
    DESTINATION ${CMAKE_INSTALL_PREFIX}/libs/${OHOS_ARCH}
)
```

**关键点**：
- `add_library` 用一个空的 `dummy.c` 作为编译入口
- 预编译 `.so` 通过 `target_link_libraries` 链接
- `install` 指令确保 `.so` 被打包到 HAP 的 `libs/arm64-v8a/` 目录

> **⚠️ build-profile.json5 必须配置**：CMakeLists.txt 不会自动生效。必须在 `ohos/build-profile.json5` 中添加 `externalNativeOptions`（见 `ffi.md` §H「CMakeLists.txt + build-profile.json5 双配置」），否则 `.so` 不会被打包到 HAR/HAP。

### 4. dummy.c

如果不存在则创建一个空文件：

```c
// dummy.c - 空编译入口，仅用于 CMake 构建系统
```

### 5. oh-package.json5

```json5
{
  dependencies: {}
}
```

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

### pubspec.yaml 平台声明

```yaml
flutter:
  plugin:
    platforms:
      ohos:
        ffiPlugin: true
```

### @Native 注解处理

预编译库的 Dart 绑定经常使用 `@Native` 注解。**必须**检查并触发 binding-translate 流程（参见 `binding-translate.md`）：

```bash
grep -r '@Native<' lib/
```

如有命中，按 `binding-translate.md` 生成 OHOS 旁路 FFI 文件。

## 常见编译错误与修复

### 1. `dummy.c not found`

修复：创建空的 `ohos/src/main/cpp/dummy.c` 文件。

### 2. `undefined symbol: xxx` 运行时错误

预编译 `.so` 缺少符号或 ABI 不兼容。
修复：确认 `.so` 是为 aarch64-linux 编译的，且未被 strip 掉必要符号。可用 `nm -D libxxx.so | grep <symbol>` 检查。

### 3. `.so` 未被打包到 HAP

`install()` 指令缺失或路径不对。
修复：确认 `install(FILES ...)` 的源路径和 `DESTINATION` 正确。用 `unzip -l <hap>` 检查产物。

### 4. 库名不匹配

CMakeLists.txt 中的库名与 Dart 层加载名不一致。
修复：`add_library(xxx_ffi SHARED ...)` 生成的最终产物依赖链接的 `.so` 文件名。Dart 层应 `DynamicLibrary.open('libxxx.so')`（使用实际预编译库名）。

### 5. 运行时 "Cannot find libxxx.so" 但 .so 已打包

Dart 层 `DynamicLibrary.open('libxxx.so')` 失败，但 `unzip -l <hap>` 显示 `.so` 确实存在——只是文件名是带版本号的 soname（如 `libmpv.so.2`）。

**根因**：OHOS 安装器只识别 `.so` 后缀的文件，带版本号后缀的 `.so.2` / `.so.1.1` 等在安装到设备时会被丢弃。

**验证**：
```bash
hdc shell find /data/app/el1/bundle/public/<bundleName> -name '*.so*'
```
如果只看到 `libflutter.so` 和 `libc++_shared.so`，说明预编译库确实被丢弃了。

**修复**：
1. 在 CMakeLists.txt 中，解压/下载后用 `file(RENAME)` 将 `libxxx.so.N` 重命名为 `libxxx.so`
2. `install(FILES ...)` 和 `target_link_libraries()` 都使用重命名后的 `libxxx.so`
3. Dart 层 `DynamicLibrary.open('libxxx.so')` 与重命名后的文件名一致
4. 清理构建缓存后重新构建（`rm -rf ohos/build ohos/.cxx example/ohos/entry/build`）

### 6. .so 未被打包且 CMakeLists.txt 正确

`build-profile.json5` 缺少 `externalNativeOptions` 配置，CMakeLists.txt 未被调用。

修复：在 `ohos/build-profile.json5` 的 `buildOption` 中添加 `externalNativeOptions`（见 `ffi.md` §H）。
