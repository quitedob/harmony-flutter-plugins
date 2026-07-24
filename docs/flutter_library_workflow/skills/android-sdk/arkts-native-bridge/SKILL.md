---
name: arkts-native-bridge
description: JNI/Native到NAPI桥接适配Skill，处理has_jni/has_ndk的SDK鸿蒙迁移
---

# JNI/Native 到 NAPI 桥接适配

## 适用条件

- `has_jni=true` 或 `has_ndk=true`
- `native_source_available=true`（有 C/C++ 源码）

---

## 禁止行为与失败处理

### 禁止行为（绝对禁止）

- 禁用 `externalNativeOptions`
- 从 `build-profile.json5` 移除 Native 配置
- 以任何理由跳过 Native 编译（"简化实现"、"务实策略"、"时间限制"、"修复次数"、"让 ArkTS 先通过"）
- 创建空壳/stub 后标记"部分实现"
- 禁用 Native 以让 ArkTS 先编译通过

### 失败处理

若 Native 编译无法通过：
- 设置 `build_status=fail`
- 记录：错误完整日志、已尝试修复方法、无法修复原因
- **禁止**用"禁用 Native"替代"如实失败"

### Native 状态

| 状态 | 产物记录 |
|------|---------|
| pass | `build_status=pass` |
| fail | `build_status=fail` + 详细日志 |

**禁止状态**：skipped、deferred、partial、"技术债"、"临时方案"

---

## 关键要点

> **HarmonyOS 6.0+ SDK 结构已变化**，以下信息必须严格遵循：

### SDK 结构变化

| 项目 | HarmonyOS 6.0+ 路径 | 旧路径（已失效） |
|------|---------------------|------------------|
| 编译器 | `$OHOS_SDK/hms/native/BiSheng/bin/` | `$OHOS_SDK/llvm/bin/` |

### JNI 类型条件编译

| JNI 类型 | HarmonyOS 替换 | 处理方式 |
|----------|----------------|----------|
| `JNIEnv*` | `napi_env` | 条件编译 |
| `jobject` | `napi_value` | 条件编译 |
| `jbyteArray` | `napi_value` → `napi_get_arraybuffer_info` | 条件编译 |
| `jclass` | `napi_value` | 条件编译 |
| `jstring` | `char*` | 条件编译 |
| `jint` | `int` | 可直接替换 |

---

## 按阶段加载详情文件

| 阶段 | 需要时加载 | 文件路径 | 内容 |
|------|------------|----------|------|
| 02-planning | 源码分类规划 | `details/02-classification.md` | 分类规则、预处理规划、JNI符号映射 |
| 03-implementation | 预处理执行 | `details/03-preprocessing.md` | 7步预处理执行 |
| 03-implementation | CMake 编写 | `details/03-cmake.md` | 模板、变量映射、调试 |
| 03-implementation | NAPI 桥接 | `details/03-napi.md` | 类型转换、NativePixelMap、OH_LOG_Print |

**何时加载**：需要详细信息时按表加载，不预加载全部内容。

---

## 目录结构

```
library/src/main/cpp/
├── CMakeLists.txt
├── napi_init.cpp       # NAPI 入口
├── xxx_ohos.cpp        # JNI→NAPI 桥接层
└── original_src/       # 复制的原 C/C++ 源码
```