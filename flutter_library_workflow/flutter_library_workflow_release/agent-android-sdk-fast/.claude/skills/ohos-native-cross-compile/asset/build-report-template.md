# {库名} OHOS 交叉编译报告

## 1. 当前环境

| 项目 | 值 |
|------|-----|
| 操作系统 | {OS} |
| MSYS2 版本 | {msys2_version 或 "不适用"} |
| OHOS NDK 路径 | {ndk_path} |
| OHOS SDK 版本 | {sdk_version} |
| clang 版本 | {clang_version} |
| Python 版本 | {python_version} |

## 2. 构建系统

| 项目 | 值 |
|------|-----|
| 构建系统类型 | {autotools / cmake / 无} |
| 构建系统版本 | {autoconf/cmake 版本} |
| 是否有汇编 | {是/否，如有注明架构（如 arm64）} |

## 3. C/C++ 代码量

| 项目 | 值 |
|------|-----|
| C 源文件数 | {c_count} |
| C++ 源文件数 | {cpp_count} |
| 汇编文件数 | {asm_count} |
| 头文件数 | {h_count} |
| 总代码行数 | {total_lines} |
| 是否有平台相关 API | {是/否} |

## 4. 平台 API 替换记录

| 原 API | 替换为 | 影响 | 状态 |
|--------|--------|------|------|
| {original_api} | {ohos_api 或 "无替代"} | {影响说明} | {已替换/无替代/待确认} |

如无平台相关 API，填写"无"。

## 5. 编译产物

| 文件 | 路径 | 大小 | 说明 |
|------|------|------|------|
| libxxx.so | {so_path} | {size} bytes | 主库 |
| libxxx.h | {header_path} | {size} bytes | 头文件 |

## 6. 构建过程与命令

### 环境变量

```
CC={cc_command}
CXX={cxx_command}
AR={ar_path}
RANLIB={ranlib_path}
STRIP={strip_path}
```

### 构建命令

```
{完整 configure / cmake / make 命令}
```

### 构建输出摘要

```
{关键输出，如 configure 结果、make 是否成功、warning/error 摘要}
```

## 7. 验证过程与命令

### 7.1 ELF 架构验证

```
命令：${LLVM_BIN}/llvm-readelf -h libxxx.so | grep -E "Class|Machine|Type"
输出：
{输出内容}
结论：{通过/失败}
```

### 7.2 SONAME 与依赖验证

```
命令：${LLVM_BIN}/llvm-readelf -d libxxx.so | grep -E "SONAME|NEEDED"
输出：
{输出内容}
结论：{通过/失败}
```

### 7.3 导出符号验证

```
命令：${LLVM_BIN}/llvm-readelf -s libxxx.so | grep "FUNC.*GLOBAL.*DEFAULT"
输出：{关键 API 函数列表摘要}
结论：{通过/失败}
```

### 7.4 反汇编验证（汇编库）

```
命令：${LLVM_BIN}/llvm-objdump -d --start-address=0xXXXX --stop-address=0xYYYY libxxx.so
输出：{关键函数反汇编摘要}
判别依据：{cmn xzr, xzr / adcs / umulh 等}
结论：{通过/失败，手写汇编 vs C fallback}
```

如无汇编，填写"不适用"。

### 7.5 无宿主架构污染

```
命令：${LLVM_BIN}/llvm-objdump -d libxxx.so | grep -c "movl|pushq|popq|leaq"
输出：{数量}
结论：{通过/失败}
```

## 8. 接入方式

### 场景一：CMake 链接（有 NAPI 桥接层）

适用于你还需要编写 NAPI 桥接层，将 C API 暴露给 ArkTS。

1. 将 `libxxx.so` 放入项目的 `libs/arm64-v8a/` 目录
2. 将头文件放入 `src/main/cpp/include/` 目录
3. 在 `CMakeLists.txt` 中添加：

```cmake
add_library(xxx SHARED IMPORTED)
set_target_properties(xxx PROPERTIES
    IMPORTED_LOCATION ${CMAKE_CURRENT_SOURCE_DIR}/../../../libs/arm64-v8a/libxxx.so
    INTERFACE_INCLUDE_DIRECTORIES ${CMAKE_CURRENT_SOURCE_DIR}/include
)

target_link_libraries(libxxx_napi xxx)
```

4. 在 `module.json5` 中声明桥接层 .so

### 场景二：使用示例 HAR 包

适用于用户明确要求产出 HAR 包的场景。HAR 内部已包含 .so + NAPI 桥接层 + ArkTS 封装。

1. 将 HAR 文件放入项目的 `oh_modules/` 或通过 `ohpm install` 安装
2. 在 ArkTS 中直接 `import { xxx } from 'libxxx'` 使用
3. HAR 仅供参考桥接层写法——开发者应自行编写桥接层，替换 HAR 中的 NAPI 和 ArkTS 部分

## 9. 已知问题与风险

| 问题 | 严重程度 | 说明 |
|------|----------|------|
| {问题描述} | {高/中/低} | {详细说明与建议} |

如无问题，填写"无"。
