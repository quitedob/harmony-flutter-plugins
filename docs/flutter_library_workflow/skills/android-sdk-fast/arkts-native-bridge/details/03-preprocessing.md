# 源码预处理规则（03-implementation 阶段）

> **目的**：复制原始 C 源码后，立即执行预处理，主动预防编译错误。

## 输入来源

从 `02-planning.json.native_source_classification` 读取 `compile` 类文件，自行扫描预处理需求。

## 1. 添加头文件保护

**检查**：`.h` 文件是否缺少 `#ifndef/#define/#endif` 保护（防止重复引用）。

```bash
grep -L "#ifndef" original_src/*.h
```

**处理**：对缺少保护的 `.h` 文件，在文件首尾添加：
```c
#ifndef <MACRO_NAME>
#define <MACRO_NAME>
// 原文件内容
#endif
```

---

## 2. 添加 extern "C" 声明

> **目的**：C++ 编译器会对函数名进行 name mangling，导致无法链接 C 函数。

**场景**：NAPI 桥接层（`.cpp`）调用原始 C 源码（`.c`）中的函数时，需添加 `extern "C"`。

**处理**：在被调用的 C 函数头文件添加：
```c
#ifdef __cplusplus
extern "C" {
#endif
// 函数声明
#ifdef __cplusplus
}
#endif
```

---

## 3. 添加缺失标准头文件

**检查**：
```bash
# 使用了 string 函数但缺少 string.h
grep -E -l "memcpy|memset|memmove|strlen|strcpy" original_src/*.c | grep -L "#include <string.h>"

# 使用了内存分配但缺少 stdlib.h
grep -E -l "malloc|free|realloc" original_src/*.c | grep -L "#include <stdlib.h>"
```

**处理**：对缺少头文件的源码，在文件开头添加：
```c
#include <string.h>
#include <stdlib.h>
```

---

## 4. 删除弃用关键字

**检查**：是否包含 `register` 关键字（C++17 已弃用，现代编译器自动优化寄存器分配）
```bash
grep -l "register" original_src/*.c
```

**处理**：删除 `register` 关键字。

---

## 5. 创建缺失函数声明头文件

**检查**：分析 C 文件中调用的函数，检查是否有对应头文件声明

```bash
grep -E "stackBlur|identMatrix|applyMatrix|saturateMatrix" original_src/*.c
```

**创建头文件**：根据实际函数签名创建对应的 `.h` 文件。

---

## 6. 创建兼容头文件 ohos_compat.h

**用途**：替换 Android 日志宏，避免编译错误

```c
// ohos_compat.h
#ifndef OHOS_COMPAT_H
#define OHOS_COMPAT_H

#ifdef __OHOS__
#include <hilog/log.h>

#define MY_LOG_DOMAIN 0xFF00
#define MY_LOG_TAG "MyModule"

#define LOGI(...) OH_LOG_Print(LOG_APP, LOG_INFO, MY_LOG_DOMAIN, MY_LOG_TAG, __VA_ARGS__)
#define LOGE(...) OH_LOG_Print(LOG_APP, LOG_ERROR, MY_LOG_DOMAIN, MY_LOG_TAG, __VA_ARGS__)

#else
#include <android/log.h>
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#endif

#endif
```

> **OH_LOG_Print 参数顺序**：LogType → LogLevel → domain → tag → format
> - 正确：`OH_LOG_Print(LOG_APP, LOG_INFO, domain, tag, "message")`
> - 错误：`OH_LOG_Print(LOG_INFO, domain, tag, "message")`（缺少 LogType）

---