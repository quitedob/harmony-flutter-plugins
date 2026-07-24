# FFI 插件鸿蒙适配 — 路由

## 适用条件

- `plugin_type_skill` 为 `type-ffi`

---

## §0 分诊（必读）

读取 `.ohos-adaptation/02-planning.json` 的 `ffi_strategy` 字段，按下表加载**唯一**对应配方文件：

| `ffi_strategy` | 加载配方 |
|---|---|
| `compile_from_source` | `.claude/skills/ohos-coding-guide/ffi-recipes/compile-from-source.md` |
| `rust_cross_compile` | `.claude/skills/ohos-coding-guide/ffi-recipes/rust-cross-compile.md` |
| `prebuilt_bundle` | `.claude/skills/ohos-coding-guide/ffi-recipes/prebuilt-bundle.md` |
| `fetch_at_build` | `.claude/skills/ohos-coding-guide/ffi-recipes/fetch-at-build.md` |
| `not_applicable` / `null` | 跳过本文件，走普通 plugin 路径 |

**不要全加载**，只加载对应的那一份配方。配方包含完整的工程搭建、编码实现和常见错误修复指导。

---

## §F caveat 长尾处理

读取 `.ohos-adaptation/02-planning.json` 的 `ffi_strategy_caveat` 字段：

- **caveat 为 null**：严格按配方模板执行
- **caveat 非 null**：caveat 优先级高于配方模板，配方仅作参考骨架，具体落实按 caveat 描述

常见 caveat 处理建议：

| caveat 关键词 | 处理方式 |
|---|---|
| "构建系统是 autotools" | 用 OHOS SDK 的 clang 跑 `./configure --host=aarch64-linux-ohos`，产物按 IMPORTED 模式接入 |
| "源码在 git submodule" | 在 `.gitmodules` 注 OHOS 分支，coding-library 阶段先 `git submodule update --init` |
| "FFI 仅 Linux/Windows 启用，OHOS 走非 FFI" | 改 plugin_type 为普通 plugin，不创建 cpp/ |
| "system lib 直绑" | 不需要构建，只在 Dart 层 `DynamicLibrary.open('libxxx.so')`；确认 OHOS 系统提供该库 |
| "需要前置 codegen" | 在 `build-profile.json5` hooks 中调用 codegen 工具 |
| "源码缺失" | 按 `prebuilt_bundle` 策略处理，尝试从上游获取预编译 `.so` |
| `rust_tls` | rustls/ring 在 OHOS 真机可能 TLS 握手挂起（HTTP 正常 HTTPS 无响应）；按 `rust-cross-compile.md` §3 缓解方案处理；禁用 HTTP/3 |
| `frb` | flutter_rust_bridge 标准 Fork 版本滞后（2.7.0 vs 上游 2.12.0+），推荐 patch 标准版：Dart 侧添加 `Platform.isOhos`、Rust 侧编译 `dart_api_dl.c`（见 `rust-cross-compile.md` §4.4.1） |
| `http3` | OHOS 不支持 HTTP/3（UDP 行为未验证），Cargo.toml 中禁用 `http3` feature，Rust 代码中对应分支改为 no-op |

### caveat 自动检测规则（仅 `rust_cross_compile` 策略）

Planning 阶段应扫描 `Cargo.toml` 和 `pubspec.yaml` 依赖，按以下模式自动标注 caveat（多个命中时用分号连接）：

| 依赖特征 | caveat 关键词 |
|----------|-------------|
| 含 TLS/HTTP crate（reqwest、rustls、native-tls、openssl、ureq、hyper） | `rust_tls` |
| pubspec.yaml 含 `flutter_rust_bridge` | `frb` |
| Cargo.toml 含 HTTP/3 / QUIC 相关 crate 或 feature | `http3` |

这些 caveat 不代表策略降级，而是提示 coding 阶段按上表执行对应处理。

---

## §G 反检验清单（加载配方前必跑）

校验 `ffi_strategy` 是否与仓库实际内容一致：

| `ffi_strategy` | 必须满足 | 不满足时处理 |
|---|---|---|
| `compile_from_source` | `src/` 下存在 `.c` / `.cpp` 文件 | 降级，caveat 标注 "源码缺失，尝试 prebuilt_bundle" |
| `rust_cross_compile` | 仓库内存在 `Cargo.toml`（根目录或 `rust/` 子目录） | 视为错误，需回到 planning 重新决策 |
| `prebuilt_bundle` | 有 arm64-v8a 的 `.so` 来源（jniLibs / 上游 release / 自行编译） | 降级 `not_supported`，在 risk_items 标记 |
| `fetch_at_build` | 能定位下载脚本（Gradle task / cargokit hook / build.dart） | 降级，caveat 标注 "下载源不明" |

反检验不通过时，在 `03-coding-library.json` 的 `risk_items` 中记录，并按降级策略调整实现方式。

---

## §H 全模式通用规则

以下规则适用于所有 FFI 策略。

### 平台检测

必须使用 `Platform.isOhos`（继承 CLAUDE.md「平台检测标准」），与 Android 合并处理：

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

> **禁止**：不允许使用排除法（`!isAndroid && !isIOS && ...`）或 `Platform.operatingSystem == 'ohos'` 字符串比较。

### .so 文件名校验与 OHOS 重命名规则（必须）

**OHOS 硬约束：安装器只识别 `.so` 后缀的文件，会丢弃 `.so.2`、`.so.1.1` 等带版本号的文件。** 即使 `.so.2` 被打包进 HAP，安装到设备时也不会出现在 `libs/arm64/` 目录下，导致 `DynamicLibrary.open()` 失败。

因此，**所有预编译 `.so` 在打包前必须重命名为 `libxxx.so` 格式**（去除 soname 版本号后缀），Dart 层统一使用 `DynamicLibrary.open('libxxx.so')`。

| 上游实际文件名 | 安装到设备的文件名 | Dart 加载名 |
|---------------|-------------------|------------|
| `libmpv.so.2` | `libmpv.so` | `DynamicLibrary.open('libmpv.so')` |
| `libcrypto.so.1.1` | `libcrypto.so` | `DynamicLibrary.open('libcrypto.so')` |
| `libavcodec.so.58.134.100` | `libavcodec.so` | `DynamicLibrary.open('libavcodec.so')` |
| `libxxx.so`（无版本号） | `libxxx.so` | `DynamicLibrary.open('libxxx.so')` |

**重命名方式**（在 CMakeLists.txt 中执行）：

```cmake
# 方式 A：下载/解压后直接 file(RENAME)
if(EXISTS "${LIBS_DIR}/libmpv.so.2")
  file(RENAME "${LIBS_DIR}/libmpv.so.2" "${LIBS_DIR}/libmpv.so")
endif()

# 方式 B：install 时 RENAME（注意：部分 OHOS 构建版本 RENAME 不生效，推荐方式 A）
install(FILES "${LIBS_DIR}/libmpv.so.2" DESTINATION ... RENAME libmpv.so)
```

**校验步骤**（编码阶段必须执行）：

1. 确认 `ohos/libs/arm64-v8a/` 下的 `.so` 文件名是 `libxxx.so` 格式（无版本号后缀）
2. 确认 CMakeLists.txt 的 `install(FILES ...)` 引用的文件名是重命名后的 `libxxx.so`
3. 确认 Dart 层 `DynamicLibrary.open('libxxx.so')` 与打包文件名一致
4. 构建后用 `hdc shell find /data/app/el1/bundle/public/<bundleName> -name '*.so*'` 验证设备上的实际文件名

> **常见错误**：上游 Release 提供的是 `libmpv.so.2`，agent 直接 `install(FILES ... libmpv.so.2)` → 构建成功但安装到设备后文件被丢弃 → 运行时报 "Cannot find libmpv.so"。

### pubspec.yaml

```yaml
flutter:
  plugin:
    platforms:
      ohos:
        ffiPlugin: true
```

### .so 落点

编译产物 `.so` 必须落入 `ohos/libs/${OHOS_ARCH}/` 目录。`OHOS_ARCH` 通常为 `arm64-v8a`。

### CMakeLists.txt + build-profile.json5 双配置（FFI .so 打包必须）

FFI 插件的 `.so` 要被打包到 HAR/HAP，**必须同时配置**两个文件。缺少任一个，`.so` 都不会出现在最终产物中。

**1. `ohos/src/main/cpp/CMakeLists.txt`**（即使没有 C/C++ 源码也需要）

通过 `target_link_libraries()` 链接预编译 `.so`，通过 `install(FILES ...)` 将其打包。没有源码时使用 `dummy.c` 作为空编译入口。各 recipe 提供了具体 CMake 模板。

**2. `ohos/build-profile.json5`**（必须添加 `externalNativeOptions`）

```json5
{
  "apiType": "stageMode",
  "buildOption": {
    "externalNativeOptions": {
      "path": "./src/main/cpp/CMakeLists.txt",
      "abiFilters": ["arm64-v8a"]
    }
  },
  "buildOptionSet": [],
  "targets": [
    {
      "name": "default"
    }
  ]
}
```

> **注意**：`flutter create -t plugin_ffi --platforms ohos .` 生成的默认 `build-profile.json5` **不包含** `externalNativeOptions`，必须手动添加。如果 `ohos/` 目录已存在（之前创建过），确认该配置存在。

### oh-package.json5

```json5
{
  dependencies: {}
}
```

> **`@ohos/flutter_ohos` 依赖由 Flutter 构建工具自动注入，无需手动添加。** 如果 `flutter create` 生成了 `"@ohos/flutter_ohos": "file:./libs/flutter.har"`，**必须将其移除**（将 dependencies 设为 `{}`），否则会导致 `Failed to resolve OhmUrl` 编译错误。

### 工程创建

```bash
flutter create -t plugin_ffi --platforms ohos .
```

### 条件编译宏

鸿蒙 NDK 预定义宏：`__OHOS__`（鸿蒙平台标识）、`__aarch64__`（ARM64 架构）。

```c
#if defined(__OHOS__)
  // 鸿蒙特定代码
#elif defined(__ANDROID__)
  // Android 特定代码
#endif
```

### FFI 不可适配判定

**必须先查 `flutter-adapted-library` Skill 数据库**，确认是否已有适配版本。

不可适配的情况：
1. **预编译二进制分发且无源码**：不包含 C/C++ 源码，只分发预编译 `.so`，且无法获取 arm64 版本
2. **依赖 Android/iOS 专有系统库**：C/C++ 代码深度依赖平台特有 API（如 Android Binder），且鸿蒙无等效替代
3. **ABI 不兼容**：仅有 x86 或 armeabi-v7a 的 `.so`，无法在 arm64 OHOS 上运行

**替代策略**（仅在确认不可适配后使用）：
- 标记为 `not_supported`，在 Dart 层做平台降级
- 在 `01-analysis.json` 和 `02-planning.json` 中明确记录不可适配原因
