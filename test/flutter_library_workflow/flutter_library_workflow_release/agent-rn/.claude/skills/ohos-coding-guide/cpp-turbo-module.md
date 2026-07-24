# C++ TurboModule 鸿蒙适配

**实现阶段**：先按 `turbo-module.md` 完成 ETS 与公共配置；再按本文 **C++ / CMake** 部分扩展。

```
read_file: .claude/skills/ohos-coding-guide/turbo-module.md
```

---

## 适用条件

- 模块需要高性能原生实现（如加密、图像处理）
- 模块包含 C/C++ 源码
- 需要跨线程执行或直接调用系统 C API（NAPI）
- Android 端使用 JNI + C++ 实现

---

## 第一部分：工程配置

### 目录结构

```
{module_name}/
├── src/
│   └── specs/
│       └── v2/
│           └── NativeXxx.ts
├── ohos/
│   └── harmony/
│       └── library/
│       ├── src/main/
│       │   ├── cpp/
│       │   │   ├── CMakeLists.txt
│       │   │   ├── XxxTurboModule.cpp
│       │   │   ├── XxxTurboModule.h
│       │   │   └── XxxPackage.cpp      # C++ Package 注册
│       │   ├── ets/
│       │   │   ├── XxxModule.ets        # ETS 壳（Codegen 要求）
│       │   │   └── XxxPackage.ets       # ETS Package
│       │   └── module.json5
│       ├── oh-package.json5
│       └── build-profile.json5
├── index.ts
└── package.json
```

### CMakeLists.txt 配置

```cmake
cmake_minimum_required(VERSION 3.13)
project(xxx_library)

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})

# 复用已有的 C/C++ 源码
add_library(xxx SHARED
  ${CMAKE_CURRENT_SOURCE_DIR}/XxxTurboModule.cpp
  # 如需复用插件的公共 C++ 代码
  ${CMAKE_CURRENT_SOURCE_DIR}/../../../../src/xxx.c
)

target_include_directories(xxx PRIVATE
  ${CMAKE_CURRENT_SOURCE_DIR}
  ${CMAKE_CURRENT_SOURCE_DIR}/../../../../src/
)

# 链接 RNOH 和鸿蒙系统库
target_link_libraries(xxx PUBLIC
  libace_napi.z.so
  libhilog_ndk.z.so
  rnoh
)
```

### 鸿蒙 NDK vs Android NDK 对照

| 项目 | Android NDK | 鸿蒙 NDK |
|------|------------|----------|
| 日志 | `__android_log_print` (`<android/log.h>`) | `OH_LOG_Print` (`<hilog/log.h>`) |
| 链接库 | `liblog.so` | `libhilog_ndk.z.so` |
| JNI/NAPI | JNI (`<jni.h>`) | NAPI (`<napi/native_api.h>`) |
| CMake 工具链 | `android.toolchain.cmake` | 鸿蒙 SDK 内置 |
| 架构 | `armeabi-v7a`, `arm64-v8a` | `arm64-v8a` |
| 平台宏 | `__ANDROID__` | `__OHOS__` |

---

## 第二部分：编码实现

### C++ TurboModule 实现

```cpp
// XxxTurboModule.h
#pragma once
#include "RNOH/CppTurboModule.h"

namespace rnoh {

class XxxTurboModule : public CppTurboModule {
public:
    XxxTurboModule(const ArkTSTurboModule::Context ctx, const std::string name);

private:
    jsi::Value methodName(jsi::Runtime &rt, const jsi::Value *args, size_t count);
};

} // namespace rnoh
```

```cpp
// XxxTurboModule.cpp
#include "XxxTurboModule.h"

namespace rnoh {

XxxTurboModule::XxxTurboModule(const ArkTSTurboModule::Context ctx, const std::string name)
    : CppTurboModule(ctx, name) {
    registerMethod("methodName", &XxxTurboModule::methodName);
}

jsi::Value XxxTurboModule::methodName(jsi::Runtime &rt, const jsi::Value *args, size_t count) {
    if (count < 2) {
        throw jsi::JSError(rt, "Expected 2 arguments");
    }
    auto param1 = args[0].asString(rt).utf8(rt);
    auto param2 = args[1].asNumber();

    // 实现业务逻辑
    auto result = param1 + std::to_string(static_cast<int>(param2));
    return jsi::String::createFromUtf8(rt, result);
}

} // namespace rnoh
```

### C++ Package 注册

```cpp
// XxxPackage.cpp
#include "RNOH/Package.h"
#include "XxxTurboModule.h"

using namespace rnoh;

class XxxPackage : public Package {
public:
    XxxPackage(Package::Context ctx) : Package(ctx) {}

    std::unique_ptr<TurboModule> createTurboModule(const std::string &name,
                                                     const ArkTSTurboModule::Context &ctx) const override {
        if (name == "XxxModule") {
            return std::make_unique<XxxTurboModule>(ctx, name);
        }
        return nullptr;
    }
};
```

### ETS 壳文件（Codegen 要求）

即使使用 C++ 实现，也需要一个 ETS 壳文件确保 Codegen 正确工作：

```ets
// ohos/harmony/library/src/main/ets/XxxModule.ets
import { AnyThreadTurboModule, AnyThreadTurboModuleContext } from '@rnoh/react-native-openharmony/ts';
import { TM } from '@rnoh/react-native-openharmony/generated/ts';

export class XxxModule extends AnyThreadTurboModule implements TM.XxxModule.Spec {
  constructor(ctx: AnyThreadTurboModuleContext) {
    super(ctx);
  }

  // 实际实现在 C++ 侧，这里只需保证类型正确
  methodName(param1: string, param2: number): Promise<string> {
    return Promise.resolve('');
  }
}
```

### 平台特定代码替换

**日志替换**：

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

### DeviceEventEmitter（从 C++ 发送）

```cpp
this->emitDeviceEvent(
    rt,
    "onValueUpdate",
    [value](jsi::Runtime& rt, std::vector<jsi::Value>& args) {
        auto payload = jsi::Object(rt);
        payload.setProperty(rt, "value", value);
        args.push_back(std::move(payload));
    });
```

---

## 第三部分：常见编译错误与修复

编译报错时，先对照 `cpp-ndk-cheatsheet.md` 的速查表索引快速定位。以下为编码阶段的常见典型错误：

### 1. `undefined reference to '__android_log_print'`

**原因**：C/C++ 代码中使用了 Android 专用的日志函数。

**修复**：添加条件编译，在 `__OHOS__` 下使用 `OH_LOG_Print`，并链接 `libhilog_ndk.z.so`。

日志改写示例：
```cpp
// ❌ Android 写法
#include <android/log.h>
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, "TAG", __VA_ARGS__)

// ✅ 鸿蒙写法
#include <hilog/log.h>
#undef LOG_DOMAIN
#undef LOG_TAG
#define LOG_DOMAIN 0x0       // 应用层默认域
#define LOG_TAG "MY_TAG"
#define LOGI(...) OH_LOG_INFO(LOG_APP, __VA_ARGS__)
```

### 2. `fatal error: 'android/xxx.h' file not found`

**原因**：包含了 Android NDK 专用头文件。

**修复**：用条件编译包裹 `#ifdef __ANDROID__ ... #endif`，鸿蒙对应头文件通常在不同路径。

### 3. `CMake Error: Cannot find source file`

**原因**：CMakeLists.txt 中源文件路径不对。

**修复**：路径是相对于 CMakeLists.txt 所在目录，需要用相对路径访问公共 C++ 源码。

### 4. `undefined symbol: xxx`

**原因**：缺少系统库链接。

**修复**：对照 `cpp-ndk-cheatsheet.md` 第一节「必须替换的 Android 库」和第二节「鸿蒙系统库速查」添加缺失的库。
```cmake
target_link_libraries(xxx PUBLIC
  libace_napi.z.so
  libhilog_ndk.z.so
  libnative_drawing.so    # 2D 绘图
  libnative_window.so     # 窗口管理
)
```

### 5. JNI 代码无法编译

**原因**：鸿蒙不使用 JNI，使用 NAPI。

**修复**：JNI 代码需要用条件编译隔离 `#ifdef __ANDROID__`，鸿蒙端通过 RNOH 的 CppTurboModule 接口实现。

### 6. `error: use of undeclared identifier`（C++ 中调用鸿蒙 API）

**原因**：鸿蒙 C API 需要特定头文件。

**修复**：
```cpp
#include <hilog/log.h>           // 日志
#include <rawfile/raw_file.h>    // 资源文件
#include <napi/native_api.h>     // NAPI
```

### 7. 头文件检查（常见遗漏）

| 检查项 | 若报错 | 修复方式 |
|--------|--------|---------|
| `folly/json.h` 等 | `fatal error: folly/xxx.h` | 手动添加 `include_directories(.../include/folly)` |
| `extern "C"` 包裹 | `undefined symbol: _Z5hellov` | 用 `extern "C"` 包裹暴露给 ArkTS 的接口 |
| Hermes 头文件 | `fatal error: hermes/hermes.h` | 添加 `include_directories(${RNOH_CPP_DIR}/third-party/hermes/API)` |
| `sys/system_properties.h` | `fatal error: sys/system_properties.h` | 改用 `<parameters/param_get.h>` 或 `libdeviceinfo_ndk.z.so` |

> 更多报错索引见 `cpp-ndk-cheatsheet.md` 第三节「编译修复速查」。
