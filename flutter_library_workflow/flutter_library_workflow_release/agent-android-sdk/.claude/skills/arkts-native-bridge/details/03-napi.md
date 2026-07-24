# NAPI 桥接实现（03-implementation 阶段）

> **用途**：NAPI 模块注册 + 类型转换 + OH_LOG_Print

## 1. NAPI 模块注册模板

```cpp
#include "napi/native_api.h"

static napi_value FuncName(napi_env env, napi_callback_info info) {
    size_t argc = 2;
    napi_value args[2] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    
    double value0;
    napi_get_value_double(env, args[0], &value0);
    
    napi_value result;
    napi_create_double(env, value0, &result);
    return result;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports) {
    napi_property_descriptor desc[] = {
        { "funcName", nullptr, FuncName, nullptr, nullptr, nullptr, napi_default, nullptr }
    };
    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
    return exports;
}
EXTERN_C_END

static napi_module <库名>Module = {
    .nm_version = 1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = Init,
    .nm_modname = "<库名>",  // 对应 lib<库名>.so
    .nm_priv = ((void*)0),
    .reserved = { 0 },
};

extern "C" __attribute__((constructor)) void RegisterModule(void) {
    napi_module_register(&<库名>Module);
}
```

> **库名规则**：`nm_modname` 必须与库名一致，如 `nm_modname = "filter"` 对应 `libfilter.so`。

---

## 2. NAPI 类型转换 API

| 类型 | 获取（从 napi_value） | 创建（生成 napi_value） |
|------|----------------------|------------------------|
| int32 | `napi_get_value_int32` | `napi_create_int32` |
| double | `napi_get_value_double` | `napi_create_double` |
| string | `napi_get_value_string_utf8` | `napi_create_string_utf8(env, str, NAPI_AUTO_LENGTH, &result)` |
| bool | `napi_get_value_bool` | `napi_get_boolean` |
| object | `napi_get_named_property` | `napi_create_object` + `napi_set_named_property` |
| array | `napi_get_element` | `napi_create_array` + `napi_set_element` |
| arraybuffer | `napi_get_arraybuffer_info` | `napi_create_arraybuffer` |

---

## 3. NAPI 桥接层编写规则

**禁止**：
- `#include "*.c"` 直接包含 C 源文件

**正确**：
- `#include "*.h"` 包含头文件
- CMakeLists.txt 中将 `.c` 文件加入编译列表

**原因**：C++ 编译器不支持 C 语言的隐式函数声明，直接 include C 源码会导致编译错误。

---

## 4. ArkTS 调用示例

```typescript
import xxxModule from 'libxxx.so';

const result: number = xxxModule.funcName(1.0);
xxxModule.applyFilter(pixelMap, intensity);
```

---

## 5. OH_LOG_Print API

> **常见错误**：第一参数是 LogType（LOG_APP），不是 LogLevel（LOG_INFO）

### 正确签名

```cpp
int OH_LOG_Print(LogType type, LogLevel level, unsigned int domain, const char *tag, const char *fmt, ...);
```

### 参数顺序

| 参数 | 类型 | 值 |
|------|------|-----|
| 第1参数 | LogType | `LOG_APP`（应用日志） |
| 第2参数 | LogLevel | `LOG_INFO` / `LOG_ERROR` / `LOG_DEBUG` |
| 第3参数 | int | 自定义域（如 0xFF00） |
| 第4参数 | const char* | 日志标签 |
| 第5参数 | const char* | 格式化字符串 |

### 正确 vs 错误示例

```cpp
// ❌ 错误：只有 4 参数，缺少 LogType
OH_LOG_Print(LOG_INFO, LOG_DOMAIN, LOG_TAG, "message");

// ❌ 错误：第一参数是 LogLevel
OH_LOG_Print(LOG_ERROR, LOG_DOMAIN, LOG_TAG, "message");

// ✅ 正确：5 参数，LogType → LogLevel → domain → tag → format
OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "message");
```

### 推荐宏定义

```cpp
#define MY_LOG_DOMAIN 0xFF00
#define MY_LOG_TAG "MyModule"

#define LOGI(...) OH_LOG_Print(LOG_APP, LOG_INFO, MY_LOG_DOMAIN, MY_LOG_TAG, __VA_ARGS__)
#define LOGE(...) OH_LOG_Print(LOG_APP, LOG_ERROR, MY_LOG_DOMAIN, MY_LOG_TAG, __VA_ARGS__)
```

### Android → OHOS 映射

| Android | OHOS |
|---------|------|
| `__android_log_print(ANDROID_LOG_INFO, tag, fmt)` | `OH_LOG_Print(LOG_APP, LOG_INFO, domain, tag, fmt)` |
| 4 参数 | 5 参数 |

---
## 6. 常见错误与调试

### Native 空指针崩溃

**典型 crash**: `SIGSEGV(SEGV_MAPERR)@0x0` — NULL pointer dereference
**排查步骤**：
1. 检查 NAPI 参数传递：`napi_get_cb_info` 是否正确获取参数数量
2. 验证输入数据：`napi_get_arraybuffer_info` 返回的指针是否为 NULL
3. 确认输出缓冲区：调用前是否已分配足够的内存
4. 检查 Native 配置：FFT 等算法库的配置结构体是否已初始化
**常见修复**：
```cpp
// NAPI 参数校验
size_t argc = 2;
napi_value args[2];
napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
if (argc < 2) {
    napi_throw_error(env, nullptr, "Expected 2 arguments");
    return nullptr;
}
// 检查 arraybuffer
void* data = nullptr;
size_t length = 0;
napi_status status = napi_get_arraybuffer_info(env, args[0], &data, &length);
if (status != napi_ok || data == nullptr) {
    napi_throw_error(env, nullptr, "Invalid arraybuffer");
    return nullptr;
}
---