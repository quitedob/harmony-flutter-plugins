# CMake 编写指南（03-implementation 阶段）

> **用途**：编写 CMakeLists.txt + cmake 命令行调试

## 1. CMakeLists.txt 模板

```cmake
cmake_minimum_required(VERSION 3.13)
project(<库名>)  # 从 02-planning.native_module_name 或 Android.mk LOCAL_MODULE 获取

add_definitions(-D__OHOS__)

add_library(<库名> SHARED
    original_src/filter.c
    original_src/blur.c
    # ... 从 native_source_classification=compile 的文件列表获取
    <库名>_ohos.cpp  # NAPI 桥接层
)

target_include_directories(<库名> PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/original_src
)

target_link_libraries(<库名> PUBLIC
    libace_napi.z.so       # NAPI 必需
    libhilog_ndk.z.so      # 日志（可选）
    libpixelmap_ndk.z.so   # PixelMap（可选）
)
```

---

## 2. Android.mk → CMake 变量映射

| Android.mk 变量 | CMake 对应 | 示例 |
|-----------------|-----------|------|
| `LOCAL_MODULE` | `project()` + `add_library()` | `LOCAL_MODULE := photoprocessing` → `project(photoprocessing)` |
| `LOCAL_SRC_FILES` | `add_library()` 源文件 | `LOCAL_SRC_FILES := filter.c blur.c` → `add_library(... filter.c blur.c)` |
| `LOCAL_LDLIBS` | `target_link_libraries()` | `LOCAL_LDLIBS := -llog` → `libhilog_ndk.z.so` |
| `LOCAL_CFLAGS` | `target_compile_options()` | `LOCAL_CFLAGS := -Wall` → `target_compile_options(... -Wall)` |

### 链接库映射

| Android NDK | 鸿蒙 NDK |
|-------------|----------|
| `-llog` | `libhilog_ndk.z.so` |
| `-ljnigraphics` | `libpixelmap_ndk.z.so` |
| `-landroid` | 鸿蒙无等价，需裁剪 |
| `-lGLESv2` | 鸿蒙 OpenGL ES 可用（需验证） |

---

## 3. cmake 命令行调试

> **用途**：Native 编译报错时，用 cmake 命令行快速迭代（比 hvigorw 更快）

### 必需环境

- `OHOS_SDK` 环境变量已设置
- cmake 可用（DevEco 内置或系统 PATH）
- Ninja 可用（DevEco 内置或系统 PATH）

### 关键参数

- `-G Ninja`：必须指定 Ninja 生成器（Windows 默认 Visual Studio）
- `-DCMAKE_TOOLCHAIN_FILE`：使用 OHOS toolchain
- `-DOHOS_ARCH`：目标架构（arm64-v8a）

### 两阶段工作流

| 阶段 | 工具 | 说明 |
|------|------|------|
| 开发调试 | cmake 命令行 | 快速迭代 Native 编译错误（3-5秒） |
| 最终产物 | hvigorw assembleHar | 打包完整 HAR（自动收集 .so） |

---

## 4. build-profile.json5 配置

在 `library/build-profile.json5` 的 `buildOption` 中添加：

```json5
"buildOption": {
  "externalNativeOptions": {
    "path": "./src/main/cpp/CMakeLists.txt",
    "cppFlags": "-DOHOS_NDK -fPIC -D__MUSL__=1"
  },
  "nativeLib": {
    "excludeFromHar": false
  }
}
```

> **注意**：`nativeLib.excludeFromHar` 必须为 `false`，确保 .so 打包进 HAR。