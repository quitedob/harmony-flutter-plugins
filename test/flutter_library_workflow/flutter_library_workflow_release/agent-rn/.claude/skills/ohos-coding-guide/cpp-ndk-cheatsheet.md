# C++ NDK 速查表（cpp-turbo-module 附件）

编码 cpp-turbo-module 时遇到编译报错，按以下索引快速定位修复方式。

---

## 一、必须替换的 Android 库

| # | Android 库 | 鸿蒙替代库 | 若报错 | 修复方式 |
|:-:|------------|-----------|--------|---------|
| 1 | `liblog.so`（`__android_log_print`） | `libhilog_ndk.z.so` | `undefined symbol: __android_log_print` | `target_link_libraries(... PUBLIC libhilog_ndk.z.so)` |
| 2 | `libjnigraphics.so`（JNI Bitmap） | `libpixelmap_ndk.z.so` | `undefined symbol: AndroidBitmap_*` | 改用 Image Kit NDK 接口 |
| 3 | `libm.so`（数学库） | `libm.z.so` | `undefined symbol: sin/cos/sqrt` 或 `ld: m` | `target_link_libraries(... PUBLIC libm.z.so)`（注意后缀带 `.z`） |
| 4 | `libandroid.so`（`ANativeWindow`） | `libnative_window.so` | `undefined symbol: ANativeWindow_*` | `target_link_libraries(... PUBLIC libnative_window.so)` |
| 5 | `libOpenSLES.so`（音频） | `OH_AudioKit` | `undefined symbol: SL_*` | **API 完全不同**：Android 用 OpenSLES C API，鸿蒙用 `OH_AudioKit` 系列，需重写音频逻辑 |
| 6 | `libmediandk.so`（媒体编解码） | `@ohos.multimedia` Kit | `AMediaCodec_*` / `AMediaMuxer_*` 缺失 | 改用鸿蒙 `AVCodec` / `AVMuxer` / `AVDemuxer` API |

---

## 二、鸿蒙系统库速查

| 库名 | 用途 | 备注 |
|------|------|------|
| `libace_napi.z.so` | NAPI 桥接 | 替代 Android jni |
| `libhilog_ndk.z.so` | 日志打印 | 替代 Android log |
| `libace_ndk.z.so` | ArkUI NDK 接口 | 按需 |
| `librawfile.z.so` | 资源文件访问 | 按需 |
| `libnative_window.so` | 原生窗口 | 替代 android nativewindow |
| `libnative_buffer.so` | 原生缓冲区 | 按需 |
| `libnative_drawing.so` | 原生绘制 | 替代 jnigraphics |
| `libnative_vsync.so` | 垂直同步 | 按需 |
| `libhitrace_ndk.z.so` | 性能追踪 | 按需 |
| `libpixelmap_ndk.z.so` | 像素图（Image Kit） | 按需 |
| `libimage_ndk.z.so` | 图片处理（Image Kit） | 按需 |
| `libdeviceinfo_ndk.z.so` | 设备信息 | 按需 |
| `libhuks_ndk.z.so` | 通用密钥库 | 按需 |
| `libohcamera.so` | 相机（Camera Kit） | 按需 |
| `libEGL.so` / `libGLESv3.so` | OpenGL ES | 按需 |
| `libz.so` | zlib 压缩 | 按需 |
| `libdl.so` | 动态链接器 | 按需 |

> **关于 `.z.so` 后缀：** 鸿蒙系统库的命名惯例，表示 zlib 压缩过的共享库。但并非所有系统库都有 `.z` 前缀（如 `libm.so`、`libdl.so`、`libEGL.so` 等没有 `.z`），需对照官方示例准确书写。

---

## 三、编译修复速查

| 报错信息（关键字） | 原因 | 修复方式 |
|------------------|------|---------|
| `fatal error: folly/`、`boost/`、`glog/` | RNOH 第三方库头文件路径未传递 | CMakeLists.txt 中添加对应 `include_directories`：`${OH_MODULE_DIR}/@rnoh/react-native-openharmony/src/main/include/folly` 等 |
| `fatal error: android/log.h` | 使用了 Android NDK 头文件 | 改为 `<hilog/log.h>`，API 改写为 `OH_LOG_INFO(LOG_APP, "...")` |
| `fatal error: jni.h` | 使用了 JNI 头文件 | 改用 NAPI（`<napi/native_api.h>`） |
| `fatal error: hermes/hermes.h` | Hermes 头文件路径未包含 | 添加 `include_directories(${RNOH_CPP_DIR}/third-party/hermes/API)` |
| `undefined symbol: __android_log_print` | 未链接鸿蒙日志库 | 链接 `libhilog_ndk.z.so` |
| `undefined symbol: _Z5hellov` | C++ 名称修饰，未用 `extern "C"` | 用 `extern "C"` 包裹暴露给 ArkTS 的接口 |
| `undefined symbol: napi_*` | 未链接 NAPI 库 | 链接 `libace_napi.z.so` |
| `undefined symbol: OH_*` | 未链接对应鸿蒙系统库 | 查上表「鸿蒙系统库速查」链接 |
| `undefined symbol: AndroidBitmap_*` | 使用了 Android Bitmap JNI | 改用 `libpixelmap_ndk.z.so` |
| `undefined symbol: ANativeWindow_*` | 使用了 Android 原生窗口 | 改用 `libnative_window.so` |
| `undefined symbol: sin/cos/sqrt` 或 `ld: m` | 数学库 | 改用 `libm.z.so`（带 `.z` 后缀） |
| `undefined symbol: SL_*` | 音频库 API 不兼容 | 改用 `OH_AudioKit` |
| `undefined symbol: AMediaCodec_*` / `AMediaMuxer_*` | 媒体库不兼容 | 改用 `@ohos.multimedia` Kit |
| `ld: error: undefined symbol: atomic` | 原子操作符号缺失 | `target_link_libraries(... PUBLIC atomic)` |
| CMake 报 `No SOURCES` | cpp 目录无源文件 | 创建 `dummy.cpp` 空文件 |
| `can't find library libhermes.so` | HAP 包未打包 Hermes | 检查 `libhermes.so` 是否在 HAP 的 `libs/arm64-v8a` 中 |
| `symbol not found: __emutls_get_address` | libc++_shared.so 版本不兼容 | 统一应用和 HAR 的 SDK 版本 |
