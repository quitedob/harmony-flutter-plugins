---
name: ohos-native-cross-compile
description: 含 C/C++ 的库鸿蒙交叉编译。将包含 C/C++ 代码的库交叉编译为 HarmonyOS arm64-v8a 预编译 .so 库，特别适用于大量 C/C++ 的库。输出编译脚本、验证产物、编译报告。触发关键词：C库、C++库、交叉编译、native库编译、so编译、ohos交叉编译、cross compile、arm64汇编。
---

# OHOS Native Cross-Compile Skill

将包含 C/C++ 代码的库交叉编译为 HarmonyOS arm64-v8a 预编译 .so 库。特别适用于大量 C/C++ 的库。

## 适用条件

**必须满足**：
1. 目标库包含 C 或 C++ 代码（不需要是纯 C/C++，有即可）
2. 最终目的是产出预编译 .so 库供鸿蒙项目链接
3. 库源码可获取（开源或有源码授权）

**特别适用于**：源码以 C/C++ 为主的库（如 GMP、OpenSSL、FFmpeg、SQLite 等）

**不适用**：
- 纯 Java/Kotlin 的 Android SDK（走 android-sdk 流程）
- 纯 Flutter/Dart 插件（走 Flutter 插件适配流程）
- 纯 ArkTS/TS 库（直接 ohpm 发布）

## 交付件说明

**默认产出**：预编译 .so 库（`lib/{abi}/libxxx.so` + 头文件），开发者直接链接到自己的鸿蒙项目。

**仅当用户明确要求时**才产出完整示例 HAR（预编译 .so + 桥接层示例 + ArkTS 封装示例），供开发者参考桥接层写法。

**关键约束**：桥接层（NAPI）和 ArkTS 封装仅作为示例，不编译进 .so 库。.so 库只包含原始 C/C++ 库的编译产物。开发者应自行编写桥接层。

---

## 执行流程

### 第 1 步：判断库类型

扫描源码目录，确认是纯 C/C++ 库：

| 检查项 | 方法 | 判定 |
|--------|------|------|
| 源文件后缀 | glob `**/*.{c,cpp,cc,cxx,h,hpp}` | C/C++ 源码存在 |
| 排除项 | glob `**/*.{java,kt,dart,ets,ts}` | 不应存在；若存在需确认是否为示例/测试 |
| 构建文件 | 检查 `CMakeLists.txt`、`configure.ac`/`Makefile.am`、`Makefile` | 判断构建系统类型 |

若源码目录中存在 Android/iOS 平台相关代码（JNI、`android/log.h`、`<sys/endian.h>` 等），记录为**有平台依赖**，进入第 4 步处理。

### 第 2 步：判断当前系统环境

| 系统 | 处理方式 |
|------|----------|
| macOS / Linux / Unix | 直接使用系统终端，无需特殊操作 |
| **Windows** | **必须安装 MSYS2**（https://www.msys2.org），后续所有编译命令在 MSYS2 终端执行 |

**Windows 环境检查清单**：

1. MSYS2 是否已安装：`C:\msys64\msys2.exe` 是否存在
2. 必要包是否已安装：`pacman -S make m4 autoconf automake libtool gcc`
3. Python 是否可用：`py --version`（Windows 用 `py`，不是 `python3`）
4. OHOS NDK 路径是否正确（见第 3 步）

**环境不满足时**：明确告诉用户缺什么、怎么装，不继续执行。

### 第 3 步：定位 OHOS NDK

OHOS NDK 路径通常为：

| 平台 | 默认路径 | 8.3 短路径（Windows 推荐） |
|------|----------|---------------------------|
| Windows | `C:\Program Files\Huawei\DevEco Studio\sdk\default\openharmony\native` | `C:\PROGRA~1\Huawei\DEVECO~1\sdk\default\OPENHA~1\native` |
| macOS | `~/Library/Huawei/DevEco Studio/sdk/default/openharmony/native` | — |
| Linux | `~/Huawei/DevEco Studio/sdk/default/openharmony/native` | — |

**验证 NDK 完整性**：

- `{NDK}/llvm/bin/clang` — 交叉编译器
- `{NDK}/llvm/bin/llvm-ar` — 静态库工具
- `{NDK}/llvm/bin/llvm-ranlib` — 索引工具
- `{NDK}/llvm/bin/llvm-strip` — 裁剪工具
- `{NDK}/llvm/bin/ld.lld` — 链接器
- `{NDK}/llvm/bin/llvm-objdump` — 反汇编验证
- `{NDK}/llvm/bin/llvm-readelf` — ELF 检查
- `{NDK}/sysroot/` — 系统头文件和库

### 第 4 步：处理平台相关 API（编译前）

编译前先扫描源码中的平台相关调用，处理完再编译。无法穷举所有替换，以下是**常见示例**：

| 平台 API 模式（示例） | 处理方式 |
|---------------|----------|
| `#include <android/log.h>` | 替换为 `#include <hilog/log.h>`，`__android_log_print` → `OH_LOG_Print` |
| `#include <sys/endian.h>` | 替换为 `#include <endian.h>`（musl 支持） |
| `__builtin_bswap16/32/64` | clang 内建，直接可用 |
| Android `Looper` / `AAssetManager` | 无鸿蒙等价 API，**明确告知用户** |

**关键规则**：
- 有鸿蒙 API 可替换 → 替换源码后再编译，记录在编译报告
- 无鸿蒙 API 可替换 → **明确告知用户**，不猜测、不跳过
- 不确定 → 查鸿蒙文档确认后再决定
- 实际遇到的替换远不止上面示例，需逐库具体分析

### 第 5 步：按构建系统编译

根据构建系统类型选择编译策略：

#### 5A. Autotools（configure + make）

**适用**：源码包含 `configure.ac`、`Makefile.am`、或已有 `configure` 脚本。

**关键规则**：
- **必须在 Linux 或 MSYS2 环境执行**（autotools 依赖 shell/m4/make）
- **不得手写 configure 降级处理**——必须走原生 configure 流程
- 汇编处理也必须在 MSYS2/Linux 下进行（m4 宏展开依赖 autotools 基础设施）

**编译脚本模板**（保存为 `build-ohos.sh`，在 MSYS2 终端执行 `bash build-ohos.sh`）：

核心要点：
1. 将 `-fuse-ld=lld --target=aarch64-linux-ohos --sysroot=...` 嵌入 CC/CXX，而非 LDFLAGS（libtool 会剥离 LDFLAGS）
2. `--host=aarch64-linux-gnu`（GMP 等库不识别 ohos）
3. `--build=x86_64-pc-msys` 强制指定构建平台，跳过交叉编译测试
4. `CC_FOR_BUILD=gcc` 用 MSYS2 本地 gcc 编译宿主工具
5. 交叉编译缓存（`cross.cache`）预填 configure 无法运行的测试结果

常用交叉编译缓存项：

| 缓存项 | 含义 | 何时需要 |
|--------|------|----------|
| `ac_cv_func_{funcname}=yes` | 函数是否存在 | 目标平台有该函数时 |
| `ac_cv_sizeof_{type}=N` | 类型大小 | `sizeof(mp_limb_t)=8` 等 |
| `gmp_cv_asm_align_log=yes` | 汇编对齐方式 | GMP 等有汇编的库 |
| `ac_cv_type_{typename}=yes` | 类型是否存在 | 使用了该类型时 |

完整脚本示例见 [asset/build-ohos-autotools.sh](asset/build-ohos-autotools.sh)。

#### 5B. CMake

**适用**：源码包含 `CMakeLists.txt`。

核心要点：
1. 生成 CMake 工具链文件（`ohos-toolchain.cmake`）
2. 设置 `CMAKE_SYSTEM_NAME=Linux`、`CMAKE_SYSTEM_PROCESSOR=aarch64`
3. 编译/链接标志中嵌入 `--target=aarch64-linux-ohos --sysroot=...` 和 `-fuse-ld=lld`

完整脚本示例见 [asset/build-ohos-cmake.sh](asset/build-ohos-cmake.sh)。

#### 5C. 无构建系统（纯 C/C++ 源码）

**适用**：源码只有 `.c`/`.h` 文件，无 configure/CMakeLists。

核心要点：
1. 直接用 OHOS NDK clang 逐个编译 `.c` → `.o`
2. `clang -shared -fuse-ld=lld` 链接为 `.so`
3. `llvm-strip` 裁剪

完整脚本示例见 [asset/build-ohos-plain.sh](asset/build-ohos-plain.sh)。

### 第 6 步：SONAME 补丁

GMP、OpenSSL 等库默认生成带版本号的 SONAME（如 `libgmp.so.10`），鸿蒙 HAP 打包时只认不带版本号的文件名。

**检测是否需要补丁**：

```bash
${LLVM_BIN}/llvm-readelf -d libxxx.so | grep SONAME
# 如果输出 SONAME 包含版本号（如 libxxx.so.10），需要补丁
# 如果输出 SONAME 就是 libxxx.so，无需补丁
```

**补丁方法**（二进制替换，保持 ELF 长度不变）：

在 ELF 的 `.dynstr` 段中找到 `libxxx.so.10\0`，替换为 `libxxx.so\0\0\0\0\0`（用 null 填充，长度不变，ELF 结构不受影响）。

补丁脚本见 [asset/patch-soname.py](asset/patch-soname.py)。

**注意**：Windows 下用 `py` 而非 `python3`。

### 第 7 步：验证 .so 库

编译完成后必须执行以下验证，**全部通过才算成功**：

#### 7.1 ELF 架构验证

```bash
${LLVM_BIN}/llvm-readelf -h libxxx.so | grep -E "Class|Machine|Type"
# 期望：Class: ELF64 / Machine: AArch64 / Type: DYN
```

#### 7.2 SONAME 与依赖验证

```bash
${LLVM_BIN}/llvm-readelf -d libxxx.so | grep -E "SONAME|NEEDED"
# SONAME 应无版本号后缀
# NEEDED 应仅依赖 libc.so / libc++_shared.so 等系统库
```

#### 7.3 导出符号验证

```bash
${LLVM_BIN}/llvm-readelf -s libxxx.so | grep "FUNC.*GLOBAL.*DEFAULT"
# 确认关键 API 函数存在，无未决符号
```

#### 7.4 反汇编验证（汇编库必须）

如果库包含手写汇编（.asm / .S 文件），必须反汇编验证：

```bash
${LLVM_BIN}/llvm-objdump -d --start-address=0xXXXX --stop-address=0xYYYY libxxx.so
```

**手写汇编 vs C fallback 判别**：

| 特征 | 手写汇编 | C 编译 fallback |
|------|----------|-----------------|
| 函数开头 | `cmn xzr, xzr` / `adds xzr, xzr` 手动清 carry | 无此操作 |
| 循环展开 | 4 路展开（一次 4 limb） | 通常 1-2 路 |
| 进位链 | 连续 `adcs`/`sbcs` | 编译器很少这样排 |
| 特有指令 | `umulh`/`extr`/`cls` 等 | 无 |
| 对齐填充 | 手插 `nop` | 无 |
| 函数体积 | 紧凑 | 通常更大 |

#### 7.5 无宿主架构污染

```bash
${LLVM_BIN}/llvm-objdump -d libxxx.so | grep -c "movl|pushq|popq|leaq"
# 期望：0
```

### 第 8 步：输出编译脚本与编译报告

将完整编译流程写成 `build-ohos.sh` 脚本（即第 5 步中生成的脚本），方便复用。

同时按 [asset/build-report-template.md](asset/build-report-template.md) 模板生成编译报告，包含：

1. **当前环境**：操作系统、MSYS2 版本（如有）、OHOS NDK 路径与版本、clang 版本
2. **构建系统**：autotools / cmake / 无，及版本
3. **C/C++ 代码量**：源文件数、总行数，是否有平台相关 API
4. **平台 API 替换记录**：替换了什么、用什么替换的、有什么影响
5. **编译产物路径**：`.so` 文件和头文件的输出路径与大小
6. **构建过程与命令**：完整的 configure/make 命令及输出摘要
7. **验证过程与命令**：7.1~7.5 每项验证的命令、输出与结论（步骤7.4仅汇编库需要）
8. **接入方式**：场景一（CMake 链接）/ 场景二（HAR 包）的具体操作步骤
9. **已知问题与风险**：如某些 API 无鸿蒙替代、功能受限等
