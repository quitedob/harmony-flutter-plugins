# 源码分类与JNI转换规划（02-planning 阶段）

> **触发条件**：`has_jni=true` 且 `native_source_available=true`

## 输入来源

从 `01-analysis.json` 读取：`has_jni`、`native_source_available`、`native_build_info`、`platform_coupling`

从 Java/Kotlin 源码扫描：native 方法声明

## 源码分类识别

> **重要**：识别哪些文件应编译、哪些应排除。

### 分类规则

| 分类 | 判断条件 | 处理方式 |
|------|----------|----------|
| `compile` | 无 JNI 类型，纯算法 | 直接编译，被 NAPI 桥接层调用 |
| `compile` | 只含 `<android/log.h>`，不含 `<jni.h>` | 可编译，需条件编译替换日志 |
| `exclude_jni_bridge` | 含 `<jni.h>` 或 `JNIEnv*` | 不编译，新建 NAPI 桥接替代 |
| `exclude_jni_bridge` | 文件名 `*_jni.*` 或含 `JNIEXPORT` | 不编译，新建 NAPI 桥接替代 |
| `exclude_platform_dep` | 含 Android Binder/平台依赖无法重构 | 不编译，标记 unsupported |
| `exclude_no_source` | 无源码（仅预编译库） | 不编译，标记 unsupported |

### 判断命令

```bash
# 含 jni.h 的文件 → 排除
grep -l "#include <jni.h>" *.c *.h

# 含 JNIEnv 的文件 → 排除
grep -l "JNIEnv" *.c *.h

# 只含 android/log.h 且不含 jni.h → 可编译
grep -l "#include <android/log.h>" *.c | while read f; do grep -L "#include <jni.h>" "$f"; done
```

---

## JNI符号映射规划

### Step 1：读取构建信息

从 `01-analysis.json` 的 `native_build_info` 获取：
- `module_name`：库名
- `source_files`：源文件列表
- `dependencies`：依赖库

### Step 2：扫描 native 方法

分析 Java/Kotlin 类的 native 方法签名：

```java
// Android 示例
public class ImageProcessor {
    public native void applyFilter(Bitmap bitmap, int intensity);
}
```

### Step 3：推算 C 函数名

**规则**：`Java_包名_类名_方法名`

```c
// 推算结果
Java_com_example_ImageProcessor_applyFilter
```

**重载方法**：加参数签名后缀
```java
native void applyFilter(Bitmap bitmap);     → Java_..._applyFilter__Landroid_graphics_Bitmap_2
native void applyFilter(Bitmap, int);       → Java_..._applyFilter__Landroid_graphics_Bitmap_2I
```

### Step 4：规划 NAPI 映射

| JNI 类型 | NAPI 类型 | 类型转换 | confidence |
|----------|-----------|----------|------------|
| `int` | `int32` | `napi_get_value_int32` | high |
| `double` | `double` | `napi_get_value_double` | high |
| `String` | `string` | `napi_get_value_string_utf8` | high |
| `bool` | `bool` | `napi_get_value_bool` | high |
| `byte[]` | `arraybuffer` | `napi_get_arraybuffer_info` | medium |
| `Object` | `object` | `napi_get_named_property` | medium |
| `array` | `array` | `napi_get_element` | medium |
| `Bitmap` | `NativePixelMap` | `OH_PixelMap_InitNativePixelMap` | medium |
| `回调函数` | `napi_value` | 需封装 | low |

### Step 5：填写产物

```json
{
  "jni_class": "com.example.ImageProcessor",
  "jni_method": "applyFilter",
  "c_function": "Java_com_example_ImageProcessor_applyFilter",
  "source_file": "filter.c",
  "napi_target": "NapiApplyFilter",
  "type_conversion": "int → napi_get_value_int32",
  "category": "direct|refactor|unsupported",
  "confidence": "high|medium|low"
}
```
---

## API 不存在时的强制处理

> **场景**：规划阶段列出的鸿蒙 API（如 EffectKit saturate）实际不存在

**强制流程**：

```
发现 API 不存在 → 必须评估 Native 实现可行性
  ↓
分析 C 源码依赖 → 读取 Native 源码
  ↓
若可实现 → 标记为 Native 实现
若无法实现 → 标记 unsupported（写明 user_visible_change）
```

**禁止行为**：
- 直接移除调用后标记 deferred
- 用临时替代后声称"已完成"
- 以"API 能力有限"为借口跳过 Native

---

## 输出产物

写入 `02-planning.json`，字段定义见 `02-planning.schema.json`：

| 字段 | 关键说明 |
|------|----------|
| `native_source_classification` | 数组，每文件分类（compile/exclude_jni_bridge/exclude_no_source/exclude_platform_dep） |
| `jni_symbol_mappings` | 数组，必填 `jni_method`、`napi_target`、`category`、`confidence` |