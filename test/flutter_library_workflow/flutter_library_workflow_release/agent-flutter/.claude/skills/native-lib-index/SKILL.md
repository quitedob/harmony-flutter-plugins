---
name: native-lib-index
description: FFI 插件预编译原生库索引与交叉编译知识库。当 FFI 插件需要获取 OHOS ARM64 预编译 .so 文件时使用此 Skill。触发关键词包括：预编译库、.so 文件、交叉编译、native library、prebuilt bundle、FFI 原生库、libtensorflowlite、libopencv。
---

# FFI 预编译原生库索引

本 Skill 维护两类数据：

1. **预编译库索引** — 已有现成 .so 可直接下载的库
2. **交叉编译配方** — 记录从源码编译 OHOS ARM64 .so 的完整步骤（cmake 参数、patches、已知问题）

## 数据文件

| 文件 | 用途 |
|------|------|
| [references/prebuilt-native-libs.json](references/prebuilt-native-libs.json) | 预编译 .so 索引（下载地址 + SHA256 + 已知消费者） |
| `references/build-recipes/*.json` | 交叉编译配方（源码地址 + cmake 参数 + patches + 已知问题） |

## 使用场景

由 `sub-native-lib-fetch` 子 Agent 在 coding-library 阶段调用，触发条件：
- `02-planning.json` 中 `plugin_type_skill` 为 `type-ffi`
- `ffi_strategy` 为 `prebuilt_bundle` 或 `fetch_at_build`
- `ohos/src/main/cpp/libs/arm64-v8a/` 下不存在目标 .so 文件

## 检索流程

### Step 1：索引精确匹配

在 `prebuilt-native-libs.json` 中按以下优先级查找：

1. **消费者匹配**：`known_consumers` 包含当前插件名 → 精确命中
2. **文件名匹配**：`so_filename` 与 Dart 层 `DynamicLibrary.open()` 的文件名一致 → 直接可用
3. **名称模糊匹配**：`name` 与 `ffi_library_name` 相似 → 检查版本兼容性后使用

**命中后按 `download.type` 分发**：

| type | 获取方式 | 典型场景 |
|------|---------|---------|
| `github_release` | `curl -L` 直接下载 + SHA256 校验 | tensorflowlite_c |
| `git_lfs` | `git clone` + `git lfs pull` + soname 重命名 | libmpv (media_kit) |
| `local_build` | 跳过下载，进入编译流程 | 无预编译版本 |

放置到 `ohos/src/main/cpp/libs/arm64-v8a/`，如有 `extra_so_files` 则批量获取。

### Step 2：编译配方匹配

索引未命中时，在 `build-recipes/` 下查找同名配方：

1. 读取配方 JSON
2. 克隆源码（按 `source` 配置）
3. 配置 OHOS NDK 工具链
4. 逐条应用 `patches`
5. 执行 cmake 构建
6. 提取产物 .so

### Step 3：无配方编译（实验性）

无现成配方时，尝试基于通用 OHOS 交叉编译模板编译。内置错误模式库可自动修复常见问题：

| 错误模式 | 自动修复 |
|---------|---------|
| `Unknown system name: OHOS` | CMakeLists.txt 平台白名单添加 OHOS |
| `sys/system_properties.h: No such file` | 排除 Android-only 源文件 |
| `undefined symbol: ClassicLocale` | `-DFLATBUFFERS_LOCALE_INDEPENDENT=0` |
| `Compatibility with CMake < 3.5 removed` | cmake_minimum_required 升级到 3.5 |
| `cannot find -llog` | 移除 Android-only 链接库 |

编译成功后自动归档为新配方。

## 索引增长机制

```
编译成功 → 自动归档 recipe → [人工] 上传 .so → 更新索引 → 后续插件直接下载
```

索引和配方均通过 PR 更新，确保安全审核。

## 与 flutter-adapted-library 的关系

| 维度 | flutter-adapted-library | native-lib-index |
|------|------------------------|-----------------|
| 解决什么 | Dart 层依赖替换（pubspec.yaml） | 原生层 .so 文件获取 |
| 查询时机 | analysis → coding 全阶段 | coding 阶段（FFI 插件专用） |
| 产物 | git 依赖声明 | ohos/libs/ 下的 .so 文件 |

两者互补，分别覆盖 Dart 层和原生层的依赖解决。
