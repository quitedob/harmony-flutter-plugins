# FFI Strategy: fetch_at_build

## 适用条件

原生 `.so` 不在仓库内，而是在构建期通过 Gradle 脚本、cargokit hook、自定义 build.dart 脚本或其他下载机制从外部获取。

信号特征：
- `android/build.gradle` 中有 `download` / `fetch` / URL 下载逻辑
- `cargokit/build_tool/` 中有动态获取逻辑
- `tool/` 目录下有 build helper 脚本
- `pubspec.yaml` 中有 `build.yaml` 或自定义 builder

## 工程搭建

### 1. 创建 ohos 工程

```bash
flutter create -t plugin_ffi --platforms ohos .
```

### 2. 分析原有获取机制

梳理原插件在 Android/iOS 上获取 `.so` 的方式：

| 获取方式 | OHOS 适配思路 |
|----------|-------------|
| Gradle download task | 改写为 CMake `file(DOWNLOAD ...)` 或预下载脚本 |
| cargokit build_tool | 扩展 cargokit 支持 OHOS target |
| build.dart + http | 在 `ohos/CMakeLists.txt` 中用 `execute_process` 调用下载 |
| GitHub Release 下载 | 确认是否有 arm64 版本可用 |
| 自定义 CI/CD | 本地预下载后放入 `ohos/src/main/cpp/libs/` |

### 3. CMakeLists.txt 中嵌入下载逻辑（推荐）

```cmake
cmake_minimum_required(VERSION 3.13)
project(xxx_library)

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})

set(LIB_DIR ${CMAKE_CURRENT_SOURCE_DIR}/libs/${OHOS_ARCH})
set(LIB_URL "https://example.com/path/to/libxxx-arm64.so")

if(NOT EXISTS ${LIB_DIR}/libxxx.so)       # ← 重命名后的 .so（必须无 soname 版本号后缀）
  file(MAKE_DIRECTORY ${LIB_DIR})
  message(STATUS "Downloading native library from ${LIB_URL}")
  file(DOWNLOAD ${LIB_URL} ${CMAKE_BINARY_DIR}/libxxx_download.zip SHOW_PROGRESS)
  execute_process(
    COMMAND ${CMAKE_COMMAND} -E tar xzf ${CMAKE_BINARY_DIR}/libxxx_download.zip
    WORKING_DIRECTORY ${LIB_DIR}
  )
  # 重命名 soname → .so（OHOS 安装器只识别 .so 后缀）
  if(EXISTS "${LIB_DIR}/libxxx.so.2")
    file(RENAME "${LIB_DIR}/libxxx.so.2" "${LIB_DIR}/libxxx.so")
  endif()
endif()

add_library(xxx_ffi SHARED
    ${CMAKE_CURRENT_SOURCE_DIR}/dummy.c
)

target_link_libraries(xxx_ffi PUBLIC
    ${LIB_DIR}/libxxx.so              # ← 重命名后的 .so（必须无 soname 版本号后缀）
    libace_napi.z.so
)

install(FILES ${LIB_DIR}/libxxx.so   # ← 文件名必须一致（重命名后的 .so）
    DESTINATION ${CMAKE_INSTALL_PREFIX}/libs/${OHOS_ARCH}
)
```

> **⚠️ build-profile.json5 必须配置**：CMakeLists.txt 不会自动生效。必须在 `ohos/build-profile.json5` 中添加 `externalNativeOptions`（见 `ffi.md` §H「CMakeLists.txt + build-profile.json5 双配置」），否则下载和打包都不会执行。

### 4. 或：预下载到仓库（替代方案）

如果网络不稳定或下载源不可控，提前下载 `.so` 放入仓库：

```
ohos/src/main/cpp/libs/arm64-v8a/libxxx.so
```

此时 CMakeLists.txt 写法与 `prebuilt_bundle` 策略一致。

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

## 常见编译错误与修复

### 1. CMake DOWNLOAD 失败

网络不可达或 URL 失效。
修复：手动下载 `.so` 放入 `libs/arm64-v8a/`，改用 `prebuilt_bundle` 模式。

### 2. 下载的 .so ABI 不兼容

下载的是 x86 或 Android 特定 ABI 版本。
修复：确认下载 arm64-aarch64 版本，且为标准 Linux ELF 格式。可用 `file libxxx.so` 验证。

### 3. cargokit 无法识别 OHOS

修复：在 cargokit 的 target/platform 映射中添加 OHOS，或绕过 cargokit 直接提供预编译 `.so`。

### 4. 版本不匹配

下载的 `.so` 版本与 Dart 绑定期望的 API 版本不一致。
修复：确认下载 URL 对应的版本号与 Dart 绑定兼容。

### 5. 运行时 "Cannot find libxxx.so" 但下载成功

Dart 层 `DynamicLibrary.open('libxxx.so')` 失败，但下载的文件实际名为 `libxxx.so.2`（soname）。

**根因**：OHOS 安装器只识别 `.so` 后缀的文件，`.so.2` 等带版本号的文件在安装到设备时会被丢弃。

修复：
1. 在 CMakeLists.txt 下载/解压后，用 `file(RENAME)` 将 `libxxx.so.N` 重命名为 `libxxx.so`
2. `install()`、`target_link_libraries()` 和 Dart 层 `DynamicLibrary.open()` 统一使用重命名后的 `libxxx.so`
3. 清理构建缓存后重新构建
4. 用 `hdc shell find /data/app/el1/bundle/public/<bundleName> -name '*.so*'` 验证设备上文件是否存在

### 6. CMake DOWNLOAD 未执行

`build-profile.json5` 缺少 `externalNativeOptions`，CMake 未被调用，下载逻辑不执行。

修复：在 `ohos/build-profile.json5` 的 `buildOption` 中添加 `externalNativeOptions`（见 `ffi.md` §H）。
