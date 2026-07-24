# rhttp 鸿蒙化适配指南

> 本文档基于 rhttp 0.12.x 实际适配经验编写，记录了每个关键决策的实际操作路径。按本文档顺序执行可最大化适配成功率。

---

## 一、rhttp 架构概览

rhttp 是基于 Rust 的 Flutter HTTP 客户端插件，采用三层架构：

```
┌─────────────────────────────────────────────────┐
│  Dart 层：Rhttp / RhttpClient / Interceptor      │  ← 开发者直接使用
├─────────────────────────────────────────────────┤
│  FFI 桥接层：flutter_rust_bridge                  │  ← 自动生成胶水代码
├─────────────────────────────────────────────────┤
│  Rust 层：reqwest + rustls + hyper + tokio       │  ← 实际执行 HTTP 请求
└─────────────────────────────────────────────────┘
```

**关键依赖链**：`rhttp` → `flutter_rust_bridge` → Rust FFI → `reqwest` → `rustls`/`hyper`/`tokio`

---

## 二、适配决策（基于实战验证）

### 2.1 TLS 后端：rustls（已知运行时风险）

**不要使用 native-tls**。native-tls 依赖 openssl-sys，编译会直接失败。

```toml
# Cargo.toml
[dependencies.reqwest]
version = "0.12"
default-features = false
features = [
    "charset",
    "cookies",
    "http2",
    # "http3",           # ← 必须禁用
    "rustls-tls-webpki-roots",
    "stream",
    "multipart",
    "socks",
    "brotli",
    "gzip",
]
```

> **⚠️ 已知问题**：rustls 的 `ring` 加密后端在 OHOS 真机上存在 TLS 握手挂起的问题。HTTP 请求正常（返回 200），但 HTTPS 请求无限挂起无响应。编译不受影响，运行时才会出现。
>
> **缓解方案**：详见 `rust-cross-compile.md` §3 的 TLS 运行时风险说明。

### 2.2 HTTP/3：必须禁用

```toml
# Cargo.toml — 禁用 HTTP/3
features = [
    # "http3",  ← 注释掉或删除
]
```

同时在 Rust 代码中处理 HTTP/3 相关分支，改为 no-op（返回默认客户端）：

```rust
// rust/src/api/client.rs
HttpVersionPref::Http3 => client,  // OHOS 不支持 HTTP/3，返回未配置版本偏好的 client
```

### 2.3 flutter_rust_bridge：Patch 标准版（非 OHOS fork）

**实战发现**：OHOS fork 版本（2.7.0）与 rhttp 所需版本（^2.12.0）差距过大，`dependency_overrides` 降级会导致 `pub get` hang。**推荐方案是 patch 标准版**。

#### 步骤 A：Dart 侧 Platform.isOhos 补丁

1. 定位 pub cache 中的标准版路径：
   ```bash
   PUB_CACHE=~/.pub-cache/hosted/pub.dev
   FRB_DIR=$PUB_CACHE/flutter_rust_bridge-2.12.0
   ```

2. 清空 checksum 以允许修改：
   ```bash
   echo '{}' > $FRB_DIR/.cargo-checksum.json
   ```

3. 修改 `lib/src/loader/_io.dart`（约第 55 行），在平台判断链中添加 OHOS：
   ```dart
   // 在 Platform.isAndroid || Platform.isLinux 判断中添加 Platform.isOhos
   if (Platform.isAndroid || Platform.isLinux || Platform.isOhos) {
     return DynamicLibrary.open('lib{name}.so');
   }
   ```

4. 对 `flutter_rust_bridge` 的其他文件做类似处理（搜索 `Platform.isAndroid` 和 `Platform.isLinux`）

#### 步骤 B：Rust 侧 Dart_* 符号补丁

OHOS 的 `libflutter.so` **不导出任何 `Dart_*` 符号**（如 `Dart_InitializeApiDL`），必须将 `dart_api_dl.c` 静态编译进 Rust `.so`：

1. 定位 Rust crate 的 build.rs：
   ```bash
   CARGO_CACHE=~/.cargo/registry/src
   FRB_RUST_DIR=$(find $CARGO_CACHE -path "*/flutter_rust_bridge-2.12.0" -type d | head -1)
   ```

2. 清空 checksum：
   ```bash
   echo '{}' > $FRB_RUST_DIR/.cargo-checksum.json
   ```

3. 修改 `build.rs`，为 OHOS target 添加 `dart_api_dl.c` 编译：
   ```rust
   // 在 build.rs 中添加 OHOS 检测
   let target = std::env::var("TARGET").unwrap_or_default();
   let is_ohos = target.contains("ohos");

   if is_ohos {
       let dart_api_dl_dir = /* flutter_rust_bridge 的 dart_api_dl.h 所在目录 */;
       cc::Build::new()
           .file(format!("{}/dart_api_dl.c", dart_api_dl_dir))
           .include(dart_api_dl_dir)
           .compile("dart_api_dl");
   }
   ```

> **关键**：每次 `pub cache repair` 或依赖版本变更后 patch 会丢失。建议编写自动化脚本。

### 2.4 CMakeLists.txt：跳过 C 占位编译

rhttp 使用 `cargokit` 自动编译 Rust，但 OHOS 不支持 cargokit。需要手动编译 `.so` 并跳过 CMakeLists.txt 中的 C 编译：

```cmake
# src/CMakeLists.txt
if(OHOS)
  # OHOS 使用预编译 Rust .so，跳过 C 编译
  return()
endif()
```

### 2.5 系统证书：默认可用

rustls 默认使用 `webpki-roots`（Mozilla 根证书列表），跨平台通用。

---

## 三、完整适配流程

### 步骤 1：环境配置

```bash
# 1. 安装 OHOS target
rustup target add aarch64-unknown-linux-ohos

# 2. 设置环境变量
export OHOS_NDK_HOME=/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony
export PATH="/path/to/flutter_ohos/bin:$PATH"

# 3. 配置 .cargo/config.toml（指向 NDK Clang 和 llvm-ar）
```

### 步骤 2：应用 Patch

按 §2.3 应用 Dart 侧和 Rust 侧的补丁。

### 步骤 3：修改 Rust 代码

1. **禁用 HTTP/3**：`Cargo.toml` 中注释 `http3` feature
2. **HTTP/3 代码路径 no-op**：`rust/src/api/client.rs` 中 `HttpVersionPref::Http3` 分支返回默认 client
3. **修改 CMakeLists.txt**：OHOS 平台跳过 C 编译

### 步骤 4：交叉编译 Rust .so

```bash
# 设置 ring/CC 编译所需环境变量
export CC_aarch64_unknown_linux_ohos=$OHOS_NDK_HOME/native/llvm/bin/aarch64-unknown-linux-ohos-clang
export AR_aarch64_unknown_linux_ohos=$OHOS_NDK_HOME/native/llvm/bin/llvm-ar
export CFLAGS_aarch64_unknown_linux_ohos="--sysroot=$OHOS_NDK_HOME/native/sysroot"

# 编译
cd rust/
cargo build --release --target aarch64-unknown-linux-ohos

# 拷贝 .so
cp target/aarch64-unknown-linux-ohos/release/librhttp.so \
   ../ohos/libs/arm64-v8a/librhttp.so
```

### 步骤 5：构建与测试 HAP

```bash
# 清理缓存（每次修改 .so 后必须清理）
rm -rf ohos/.cxx ohos/build

# 构建
flutter build hap --debug

# 安装到真机
flutter install --debug
```

### 步骤 6：验证 HTTP/HTTPS

在 example app 中添加测试按钮，分别测试：
1. **HTTP**（`http://example.com`）→ 应返回 200
2. **HTTPS**（`https://reqres.in/api/users`）→ 观察是否挂起

> 如果 HTTPS 挂起，确认是 `ring` TLS 运行时问题，参见 `rust-cross-compile.md` §3 缓解方案。

---

## 四、已知问题与风险

| # | 问题 | 状态 | 影响 | 缓解方案 |
|---|------|------|------|----------|
| 1 | **ring TLS 运行时挂起** | 🔴 未解决 | HTTPS 不可用 | 尝试 aws-lc-rs / native-tls+ohos-openssl |
| 2 | **flutter_rust_bridge 版本兼容** | 🟡 已绕过 | 需手动 patch pub cache | Patch 标准版替代 OHOS fork |
| 3 | **Dart_* 符号缺失** | 🟢 已解决 | 无 | 编译 dart_api_dl.c 进 .so |
| 4 | **Platform.isOhos 补丁** | 🟡 已绕过 | 需手动 patch pub cache | 同 #2 一起处理 |
| 5 | **HTTP/3 不可用** | 🟢 已解决 | 无 | 禁用 http3 feature |
| 6 | **cargokit 不支持 OHOS** | 🟡 已绕过 | 手动编译 .so | 手动 cargo build + 拷贝 |
| 7 | **pub cache patch 持久性** | 🟡 需注意 | pub cache repair 后丢失 | 编写自动化脚本 |

---

## 五、参考资源

| 用途 | 链接 |
|------|------|
| Rust 官方 OHOS 交叉编译 | https://doc.rust-lang.org/rustc/platform-support/openharmony.html |
| ohos-rs 快速入门 | https://ohos.rs/en/docs/basic/quick-start |
| ohos-rs 示例集（reqwest 等） | https://github.com/ohos-rs/example |
| flutter_rust_bridge OHOS fork | https://github.com/Aloereed/flutter_rust_bridge_ohos |
| ohos-openssl 预编译 | https://github.com/ohos-rs/ohos-openssl |
| ServoDemo（大型 Rust .so 打包案例） | https://github.com/jschwe/ServoDemo |
