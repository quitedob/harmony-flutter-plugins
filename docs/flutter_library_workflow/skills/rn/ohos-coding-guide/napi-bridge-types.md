# NAPI 桥类型转换速查

**适用范围：** RNOH 三方库鸿蒙化适配中，ArkTS 侧代码通过 NAPI 与 C++ 层通信时的类型转换规则（以 TurboModule 为主要场景，也适用于 Fabric 组件 props、自定义 NAPI 模块）

**使用时机：** 编写或审查 ETS 实现文件时，对照此表确认跨桥返回类型是否可安全传递

跨桥机制是 **NAPI 属性逐字段映射**（`napi_create_object` + `napi_set_named_property`），**不是 JSON 序列化**。原型链和内部槽（internal slots）会丢失，但属性值保留原始类型。

NAPI 对 **bigint**、**Date**、**TypedArray** 有原生 API 支持，可完整跨桥传递。简化实现或不当使用时会退化为下表描述的行为。

---

## 类型转换速查表

| 类型 | 跨桥行为 | 风险 | 安全写法 |
|------|---------|:----:|---------|
| **Error 对象** | 若用普通对象映射传递，`Error.prototype` 丢失，退化为普通 Object。`message`（可枚举）通常保留，`stack`（不可枚举）可能丢失。NAPI 有 `napi_create_error` 可原生创建 Error | 🟡 | 传 `{ message: string, code?: number }` 结构体，或显式使用 `napi_create_error` |
| **bigint** | NAPI 原生支持 bigint API（`napi_create_bigint_int64` 等），可完整传递精度。若**误按 number 传递**则超 2^53 精度丢失 | 🟡 | 超大整数优先用 string 传递；若需 bigint 语义，确保使用 NAPI bigint API |
| **Date** | NAPI 原生支持 Date API（`napi_create_date`），可保持 Date 类型完整传递。若未使用则退化为普通对象 | 🟡 | 传 number 时间戳作为最稳妥方案 |
| **Function** | 不可跨桥传递。NAPI 无传递已有 Function 的 API，闭包和上下文无法跨语言边界 | 🔴 | 用 callback ID + 事件注册模式（`emitter` 或 `DeviceEventEmitter`） |
| **Map / Set** | 数据存储在内部槽（internal slots），非可枚举属性，NAPI 逐字段映射后变为空对象 `{}` | 🔴 | 先转为 `Array&lt;[key, value]&gt;` 或普通 Object |
| **循环引用 Object** | NAPI 逐字段映射无内置循环检测，循环引用导致递归栈溢出 | 🔴 | 用 ID 替换自引用，或只传必要字段，或提前展平 |
| **enum** | 降级为原始 number | 🟢 | 两端保持枚举常量对照一致 |

---

## NAPI 原生支持的可信类型（优先使用）

以下类型 NAPI 有原生 API，可**完整、安全**跨桥传递，优先使用：

| 类型 | NAPI API | 说明 |
|------|---------|------|
| `number` | `napi_create_double` / `napi_create_int32` 等 | 基础标量 |
| `string` | `napi_create_string_utf8` 等 | 基础标量 |
| `boolean` | `napi_get_boolean` | 基础标量 |
| `null` / `undefined` | `napi_get_null` / `napi_get_undefined` | 注意 JS 侧用 `== null` 判断 |
| `Object`（普通对象） | `napi_create_object` + `napi_set_named_property` | 逐字段映射，只复制可枚举属性 |
| `Array` | `napi_create_array` / `napi_set_element` | 索引元素完整传递 |
| `Record&lt;string, T&gt;` | 同 Object | 键值对结构 |
| `Date` | `napi_create_date` / `napi_get_date_value` | 原生支持，完整保留 Date 类型 |
| `bigint` | `napi_create_bigint_int64` / `napi_create_bigint_uint64` | 原生支持，完整保留精度 |
| `TypedArray` | `napi_create_typedarray` / `napi_get_typedarray_info` | 支持 Uint8Array、Int32Array 等 9 种类型，零拷贝引用传递 |
| `ArrayBuffer` | `napi_create_arraybuffer` / `napi_get_arraybuffer_info` | 二进制数据缓冲区 |

---

## 原则

1. **优先使用 NAPI 原生 API**：对于 Date、bigint、TypedArray，优先使用对应的 NAPI API 而非退化为普通对象/number/string 传递。
2. **不确定的类型序列化为 string**：若类型不在上表范围内，优先序列化为 string 传递，在目标端反解析。
3. **禁止传递裸 Function**：跨桥函数调用必须用 callback ID + 事件模式。
4. **循环引用提前处理**：跨桥前展平或截断循环引用，不要依赖 NAPI 层检测。