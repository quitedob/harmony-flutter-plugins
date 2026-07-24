# FFI Strategy: rust_cross_compile

## 适用条件

仓库内有 `Cargo.toml`（通常在 `rust/` 或根目录），Dart 侧通过 `dart:ffi` 调用 Rust 编译出的 `.so`。常见配套工具：`flutter_rust_bridge`、`cargokit`、自定义 build script。

---

## 第一部分：工程配置

### 1. 创建 ohos 工程

```bash
flutter create -t plugin_ffi --platforms ohos .
```

### 2. Rust OHOS 交叉编译环境

OpenHarmony 是 Rust **Tier 2** 官方支持目标，rustup 直接提供预编译标准库。

#### 2.1 安装编译目标

```bash
rustup target add aarch64-unknown-linux-ohos   # arm64 真机（必须）
rustup target add x86_64-unknown-linux-ohos     # 模拟器（可选）
rustup target add armv7-unknown-linux-ohos      # 32位设备（可选）
```

#### 2.2 获取 OpenHarmony NDK

通过 DevEco Studio 5.0+ 安装 SDK，设置环境变量：

```bash
# macOS
export OHOS_NDK_HOME=/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony

# Linux / Windows（按实际路径调整）
export OHOS_NDK_HOME=/path/to/sdk/default/openharmony
```

> 参考：https://ohos.rs/en/docs/basic/quick-start

#### 2.3 创建 Clang Wrapper 脚本

鸿蒙使用 **musl libc**（非 glibc），必须通过 wrapper 脚本传递 `--sysroot` 和 `-D__MUSL__` 标志。需要为每个目标架构创建 C 和 C++ 两个 wrapper。

**aarch64 C 编译器 wrapper**（`aarch64-unknown-linux-ohos-clang.sh`）：

```bash
#!/bin/bash
exec "$OHOS_NDK_HOME/native/llvm/bin/clang" \
  --target=aarch64-linux-ohos \
  --sysroot="$OHOS_NDK_HOME/native/sysroot" \
  -D__MUSL__ \
  "$@"
```

**aarch64 C++ 编译器 wrapper**（`aarch64-unknown-linux-ohos-clang++.sh`）：

```bash
#!/bin/bash
exec "$OHOS_NDK_HOME/native/llvm/bin/clang++" \
  --target=aarch64-linux-ohos \
  --sysroot="$OHOS_NDK_HOME/native/sysroot" \
  -D__MUSL__ \
  "$@"
```

x86_64 和 armv7 同理，替换 `--target` 为对应值。armv7 额外需要 `-march=armv7-a -mfloat-abi=softfp -mtune=generic-armv7-a -mthumb`。

> 完整模板：https://doc.rust-lang.org/rustc/platform-support/openharmony.html

#### 2.4 配置 `.cargo/config.toml`

```toml
[target.aarch64-unknown-linux-ohos]
linker = "/path/to/aarch64-unknown-linux-ohos-clang.sh"
ar = "${OHOS_NDK_HOME}/native/llvm/bin/llvm-ar"

[target.x86_64-unknown-linux-ohos]
linker = "/path/to/x86_64-unknown-linux-ohos-clang.sh"
ar = "${OHOS_NDK_HOME}/native/llvm/bin/llvm-ar"

[target.armv7-unknown-linux-ohos]
linker = "/path/to/armv7-unknown-linux-ohos-clang.sh"
ar = "${OHOS_NDK_HOME}/native/llvm/bin/llvm-ar"
```

#### 2.5 验证编译环境

在引入完整插件之前，先单独验证工具链：

```bash
# 创建最简项目
cargo new hello_ohos --lib
cd hello_ohos

# 尝试交叉编译
cargo build --target aarch64-unknown-linux-ohos --release
```

如果编译通过，说明工具链配置正确。

### 3. TLS / 加密后端决策（重要）

Rust HTTP/网络相关 crate（如 `reqwest`、`hyper`、`ureq` 等）需要 TLS 后端。OHOS 交叉编译时 TLS 后端选择是**首要决策**：

#### 决策树

```
Cargo.toml 中使用 TLS 的 crate？
├── 否 → 跳过本节
└── 是 → 检查 TLS 后端 feature
    ├── 已显式指定 rustls-tls → ✅ 无需改动，直接可编译
    ├── 已显式指定 native-tls / openssl → ⚠️ 需要处理（见下方）
    └── 使用 default-features → 检查默认值
        ├── 默认为 rustls → ✅ 无需改动
        └── 默认为 native-tls → ⚠️ 需要改为 rustls 或配置 OpenSSL
```

#### 方案 A：使用 rustls（推荐，但有已知运行时风险）

`rustls` 是纯 Rust 实现的 TLS，无系统依赖，交叉编译零配置：

```toml
# Cargo.toml — 以 reqwest 为例
[dependencies]
reqwest = { version = "0.12", default-features = false, features = ["rustls-tls"] }
```

适用于绝大多数场景。默认使用 `webpki-roots`（Mozilla 根证书列表），跨平台通用。

> **⚠️ 已知风险：ring 运行时 TLS 握手失败**
>
> `rustls` 默认使用 `ring` 作为加密后端。`ring` 在 `aarch64-unknown-linux-ohos` 上**可以编译通过**，但在真机运行时 HTTPS 请求可能**无限挂起**（TCP/HTTP 正常，TLS 握手无响应）。
>
> 根因尚未完全确认，推测与 `ring` 的 aarch64 汇编在 OHOS musl 环境下的运行时行为有关。
>
> **缓解方案**（按优先级尝试）：
>
> 1. **升级 ring 版本**：尝试使用较新版本的 `ring`（0.17.14+），可能已修复
> 2. **切换到 aws-lc-rs**：reqwest 0.12 支持 `__rustls-aws-lc-rs` 内部 feature，启用后用 `aws-lc-rs` 替代 `ring`
>    ```toml
>    reqwest = { version = "0.12", default-features = false, features = [
>      "rustls-tls-webpki-roots",  # 或 rustls-tls
>      "__rustls-aws-lc-rs",       # 内部 feature，切换加密后端
>    ] }
>    ```
> 3. **回退到 native-tls + ohos-openssl**：如果上述方案均不生效，使用方案 B
>
> **验证方法**：编译完成后，在真机上分别测试 HTTP 和 HTTPS 请求。如果 HTTP 返回 200 但 HTTPS 挂起，即可确认为此问题。

#### 方案 B：必须使用 OpenSSL 时

`native-tls` 依赖 `openssl-sys`，而 `openssl-src` 不知道如何为 OHOS 配置 OpenSSL，**直接编译会失败**。必须使用预编译二进制：

```bash
# 使用 ohos-openssl 预编译包（https://github.com/ohos-rs/ohos-openssl）
export AARCH64_UNKNOWN_LINUX_OHOS_OPENSSL_DIR="/path/to/ohos-openssl/prelude/arm64-v8a/"
export ARMV7_UNKNOWN_LINUX_OHOS_OPENSSL_DIR="/path/to/ohos-openssl/prelude/armeabi-v7a/"
export X86_64_UNKNOWN_LINUX_OHOS_OPENSSL_DIR="/path/to/ohos-openssl/prelude/x86_64/"
```

> 注意：OpenSSL 1.1.1 需要使用 ohos-openssl 的 `111` 分支。

### 4. flutter_rust_bridge 适配（如有）

若插件使用 `flutter_rust_bridge`，官方版本不支持 OHOS，必须替换为社区 fork：

#### 4.1 替换依赖

```yaml
# pubspec.yaml
dependency_overrides:
  flutter_rust_bridge:
    git:
      url: https://github.com/Aloereed/flutter_rust_bridge_ohos.git
      path: frb_dart
      ref: master
```

> **已收录到 `flutter-adapted-library` Skill 数据库**，coding 阶段步骤 3.4 依赖覆写时会自动命中。

#### 4.2 重新生成 FFI 胶水代码

替换 fork 后**必须**重新生成：
- `frb_generated.dart`（Dart 侧）
- `frb_generated.rs`（Rust 侧）

使用 OHOS fork 版本的 `flutter_rust_bridge_codegen` 重新生成，否则序列化格式和函数签名可能不匹配。

#### 4.3 DynamicLibrary 加载路径

确认 `flutter_rust_bridge_ohos` 中 `loadExternalLibrary` 是否已处理 OHOS 平台路径。如未处理，需手动指定：

```dart
if (Platform.isOhos) {
  DynamicLibrary.open("lib{plugin_name}.so");
}
```

#### 4.4 版本滞后风险

fork 版本（2.7.0）滞后于上游（2.11.x）。若插件依赖的上游 flutter_rust_bridge 版本较新，可能存在 API 不兼容：
- 检查 `Cargo.toml` 和 `pubspec.yaml` 中声明的 flutter_rust_bridge 版本约束
- 若差异大，在 `risk_items` 中标记

#### 4.4.1 版本不兼容时的替代方案：Patch 标准版

当 OHOS fork 版本与插件所需版本差距过大（如插件需要 `^2.12.0` 但 fork 仅 `2.7.0`），`dependency_overrides` 降级会导致 `pub get` hang 或 API 不兼容。此时可**直接 patch 标准版**：

**Dart 侧 patch**（pub cache 中的标准版 `flutter_rust_bridge`）：

1. 找到 pub cache 中的库路径：`~/.pub-cache/hosted/pub.dev/flutter_rust_bridge-{version}/`
2. 清空 `.cargo-checksum.json` 以允许修改（写入空 JSON `{}`）
3. 在 `lib/src/loader/_io.dart` 的平台判断链中添加 OHOS：
   ```dart
   // 找到类似 Platform.isAndroid 的判断链，添加 Platform.isOhos
   if (Platform.isAndroid || Platform.isLinux || Platform.isOhos) {
     return DynamicLibrary.open('lib{name}.so');
   }
   ```

**Rust 侧（解决 `Dart_*` 符号缺失）**：

OHOS 的 `libflutter.so` **不导出任何 `Dart_*` 符号**（如 `Dart_InitializeApiDL`）。这会导致运行时 FFI 初始化失败。解决方案是将 `dart_api_dl.c` 静态编译进 Rust `.so`：

1. 找到 `flutter_rust_bridge` Rust crate 的 `build.rs`
2. 添加 OHOS target 的 `dart_api_dl.c` 编译逻辑：
   ```rust
   if target_os == "ohos" || target.contains("ohos") {
       cc::Build::new()
           .file("path/to/dart_api_dl.c")  // flutter_rust_bridge 自带此文件
           .include("path/to/dart_api_dl_include_dir")
           .compile("dart_api_dl");
   }
   ```
3. 确保 `dart_api_dl.h` 所在目录也在 include path 中

> **关键**：每次 `pub cache repair` 或版本变更后，Dart 侧 patch 会丢失，需要重新应用。建议编写自动化脚本。

#### 4.5 `@Native` 注解处理

flutter_rust_bridge 生成的代码中可能包含 `@Native` 注解 → 在步骤 4.5（@Native 绑定翻译检查）中处理，参见 `binding-translate.md`。

### 5. CargoKit / 构建系统集成（如有）

若插件使用 `cargokit` 将 Rust 编译集成到 Flutter 构建流程：

#### 5.1 添加 OHOS target 识别

cargokit 的 `build_tool/` 需要识别 OHOS 平台，通常需修改 `build_tool/lib/src/target.dart` 添加 OHOS target 映射。

#### 5.2 HVigor 构建对接

鸿蒙使用 HVigor（非 Gradle）作为构建系统。需要在 HVigor 构建流程中添加 Rust 交叉编译步骤：

- 方式 1：在 `hvigorfile.ts` 中添加 pre-build hook，触发 `cargo build --target aarch64-unknown-linux-ohos --release` 并拷贝 .so
- 方式 2：使用独立脚本先编译 Rust，再执行 `flutter build hap`

#### 5.3 无 CargoKit 时的手动流程

```bash
# 1. 交叉编译 Rust
cargo build --target aarch64-unknown-linux-ohos --release

# 2. 拷贝 .so 到 Flutter OHOS 项目
cp target/aarch64-unknown-linux-ohos/release/lib{name}.so \
   ohos/libs/arm64-v8a/lib{name}.so

# 3. Flutter 构建 HAP
flutter build hap --debug
```

### 6. .so 动态库打包

#### 6.1 文件存放路径

编译产物 `.so` 必须落入 `ohos/libs/${OHOS_ARCH}/`，通常为 `ohos/libs/arm64-v8a/`。

#### 6.2 Release 模式优化

```toml
# Cargo.toml
[profile.release]
strip = true       # 符号剥离，减小体积
lto = true          # 链接时优化（可选，编译更慢但体积更小）
opt-level = "z"     # 优化体积（可选）
```

#### 6.3 SO 库压缩（可选）

在 `module.json5` 中配置，可节省约 65% 包体积：

```json5
{
  "compressNativeLibs": true
}
```

### 7. oh-package.json5

```json5
{
  dependencies: {}
}
```

> **`@ohos/flutter_ohos` 依赖由 Flutter 构建工具自动注入，无需手动添加。**

### 8. 不建议初期启用的功能

对某些高级 Rust 功能，建议初期跳过，先跑通基础链路后再开启：

- **HTTP/3 / QUIC**：依赖 UDP socket，鸿蒙对 UDP 的权限和行为可能与 Linux 有差异
- **系统代理**：`reqwest` 通过环境变量 `HTTP_PROXY` / `HTTPS_PROXY` 获取系统代理，鸿蒙可能不通过环境变量暴露代理配置
- **系统证书信任链**：`rustls` 默认用 `webpki-roots`（Mozilla 根证书），跨平台通用；若需鸿蒙系统自定义证书，需额外处理

---

## 第二部分：编码实现

### .so 加载路径

与 compile_from_source 相同，使用 `DynamicLibrary.open`：

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

### Rust 侧注意事项

1. **确保 Rust 代码不依赖 Android/iOS 专有 API**：如 JNI、Objective-C runtime
2. **条件编译**：Rust 侧使用 `#[cfg(target_os = "linux")]` 或自定义 cfg 处理 OHOS 差异。注意 OHOS 的 `target_os` 值为 `"linux"`（因为基于 Linux 内核），目前无独立 `target_os = "ohos"`；可用 `#[cfg(target_env = "ohos")]` 区分
3. **C FFI 边界**：确保 Rust 导出的函数使用 `#[no_mangle] extern "C"`
4. **链接系统库**：OHOS 可用的 POSIX 接口与 Linux 类似，但部分 API 可能受限
5. **异步运行时**：`tokio` 在 OHOS 上可正常运行（ohos-rs 示例集已验证），但需注意线程模型差异

### 构建流程

```bash
# 1. 交叉编译 Rust
cargo build --release --target aarch64-unknown-linux-ohos

# 2. 拷贝 .so 到 Flutter OHOS 项目（如非 CargoKit 自动处理）
cp target/aarch64-unknown-linux-ohos/release/lib{name}.so \
   ohos/libs/arm64-v8a/lib{name}.so

# 3. Flutter 构建 HAP
flutter build hap --debug
```

### CI / Headless 构建（无 DevEco Studio）

若 CI 环境无 DevEco Studio，可使用 Command Line Tools：

```bash
# 环境变量
export DEVECO_SDK_HOME=/path/to/command-line-tools/sdk
export NODE_HOME=/path/to/command-line-tools/tool/node
export PATH=$PATH:/path/to/command-line-tools/tool/hvigor/bin

# HVigor 构建命令
hvigorw clean
hvigorw --mode module -p product=default -p module=entry@default assembleHap
hvigorw -p product=default assembleApp

# 部署到真机（hdc 是 OHOS 的 adb 等效工具）
hdc file send entry/build/default/outputs/default/{name}-default-signed.hap "/data/local/tmp/"
hdc shell bm install -p /data/local/tmp/
hdc shell aa start -a EntryAbility -b {bundle_name}
```

> 注意：签名密钥需先在 Windows/Mac 的 DevEco Studio 中生成，CI 中复用。签名配置在 `build-profile.json5` 的 `signingConfigs` 中，包含密码，不要提交到仓库。

---

## 第三部分：常见编译错误与修复

### 1. Rust target 不可用

```
error[E0463]: can't find crate for `std`
```

**原因**：OHOS target 未安装。
**修复**：`rustup target add aarch64-unknown-linux-ohos`

### 2. openssl-sys 编译失败

```
error: failed to run custom build command for `openssl-sys`
This crate is compiled for ... but OpenSSL was not found for the target
```

**原因**：`native-tls` / `openssl-sys` 不知道如何为 OHOS 编译 OpenSSL。
**修复**（按优先级）：
1. 切换到 `rustls-tls`（见第一部分 §3 方案 A）
2. 使用 ohos-openssl 预编译（见第一部分 §3 方案 B）

### 3. ring crate 编译失败

```
error: failed to run custom build command for `ring`
```

**原因**：`ring`（`rustls` 的加密后端）交叉编译时找不到 C 编译器。
**修复**：设置 CC/AR/CFLAGS 环境变量：

```bash
export CC_aarch64_unknown_linux_ohos=$OHOS_NDK_HOME/native/llvm/bin/aarch64-unknown-linux-ohos-clang
export AR_aarch64_unknown_linux_ohos=$OHOS_NDK_HOME/native/llvm/bin/llvm-ar
export CFLAGS_aarch64_unknown_linux_ohos="--sysroot=$OHOS_NDK_HOME/native/sysroot"
```

> 注意：也可使用 Clang wrapper 脚本（见 §2.3）作为 CC 值。

### 3.5 ring crate 编译通过但 TLS 运行时挂起

**症状**：HTTP（非 HTTPS）请求正常返回 200，但 HTTPS 请求无限挂起，无错误日志。

**原因**：`ring` 在 `aarch64-unknown-linux-ohos` 上的 aarch64 加密汇编可能存在运行时兼容性问题（根因待确认）。

**诊断方法**：
```bash
# 在真机上分别测试 HTTP 和 HTTPS
# 如果 HTTP ✅ 但 HTTPS ❌，即可确认
```

**修复**：见第一部分 §3「方案 A」中的缓解方案（升级 ring / 切换 aws-lc-rs / 回退 native-tls）。

### 3.6 OHOS libflutter.so 不导出 Dart_* 符号

**症状**：FFI 初始化时 crash 或 `Dart_InitializeApiDL` 符号找不到。

**原因**：OHOS 的 `libflutter.so` 不导出任何 `Dart_*` 符号（Android/iOS 会导出），这是 OHOS 平台限制。

**修复**：将 `dart_api_dl.c` 静态编译进 Rust `.so`，详见 §4.4.1。

### 4. cargokit 不识别 OHOS 平台

```
Unsupported target platform: ohos
```

**修复**：在 cargokit 的 target 映射中添加 OHOS，或使用自定义 build script 替代。具体需修改 `build_tool/lib/src/target.dart`。

### 5. flutter_rust_bridge 生成代码含 `@Native`

**修复**：触发 binding-translate 流程，参见 `binding-translate.md`。

### 6. .so 运行时加载失败

```
Invalid argument(s): Failed to load dynamic library 'libxxx.so'
```

**修复**：
- 确认 `.so` 存放在 `ohos/libs/arm64-v8a/` 目录
- 确认 `build-profile.json5` 中有 `nativeLib` 配置
- 确认编译架构与设备匹配（真机 = arm64-v8a，模拟器 = x86_64）

### 7. musl libc 兼容性问题

```
undefined symbol: __xxx_glibc_xxx
```

**原因**：Rust crate 或其 C 依赖使用了 glibc 特有的符号。
**修复**：
- 确认 Clang wrapper 传递了 `-D__MUSL__` 标志
- 检查依赖是否有 musl 兼容性问题，必要时启用对应 feature flag 或提 issue

### 8. Rust .so 链接失败

**修复**：确认 `.so` 文件路径正确，CMakeLists.txt 的 `install()` 指令已将其打包到 HAP。

---

## 参考资源

| 用途 | 链接 |
|------|------|
| Rust 官方 OHOS 交叉编译（Clang wrapper 完整模板） | https://doc.rust-lang.org/rustc/platform-support/openharmony.html |
| ohos-rs 快速入门 | https://ohos.rs/en/docs/basic/quick-start |
| ohos-rs 示例集（reqwest、tokio 等 12 个示例） | https://github.com/ohos-rs/example |
| ohos-openssl 预编译 | https://github.com/ohos-rs/ohos-openssl |
| flutter_rust_bridge OHOS fork | https://github.com/Aloereed/flutter_rust_bridge_ohos |
| Servo 鸿蒙 Demo（大型 Rust .so 打包完整案例） | https://github.com/jschwe/ServoDemo |
| HVigor CLI 构建教程 | https://dev.to/abnerming888/harmonyos-development-hvigorw-compile-and-build-implement-command-packaging-4n0p |
