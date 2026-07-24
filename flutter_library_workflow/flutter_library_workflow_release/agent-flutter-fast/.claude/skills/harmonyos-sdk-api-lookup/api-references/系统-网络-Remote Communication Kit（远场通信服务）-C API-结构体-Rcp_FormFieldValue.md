## 概述

PhonePC/2in1TabletTVWearable

简单表单数据字段值，参见[Rcp\_Form](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_form)和[Rcp\_MultipartFormFieldValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___multipart_form_field_value)。

**起始版本：** 5.0.0(12)

**相关模块：** [RemoteCommunication](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview)

**所在头文件：** [rcp.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/rcp_8h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [Rcp\_FormValueType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_formvaluetype)[type](/consumer/cn/doc/harmonyos-references/_rcp___form_field_value#type) | 表示union中使用的数据类型。 |
| union {  uint8\_t [varBool](/consumer/cn/doc/harmonyos-references/_rcp___form_field_value#varbool)  int32\_t [varInt32](/consumer/cn/doc/harmonyos-references/_rcp___form_field_value#varint32)  int64\_t [varInt64](/consumer/cn/doc/harmonyos-references/_rcp___form_field_value#varint64)  double [varDouble](/consumer/cn/doc/harmonyos-references/_rcp___form_field_value#vardouble)  [Rcp\_Buffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___buffer) [varStr](/consumer/cn/doc/harmonyos-references/_rcp___form_field_value#varstr)  } | bool类型。  int32类型。  int64类型。  double类型。  string类型。 |
| struct [Rcp\_FormFieldValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___form_field_value) \* [next](/consumer/cn/doc/harmonyos-references/_rcp___form_field_value#next) | 指向下一个[Rcp\_FormFieldValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___form_field_value)。链式存储。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### next

PhonePC/2in1TabletTVWearable



```
1. struct Rcp_FormFieldValue* Rcp_FormFieldValue::next
```

**描述**

指向下一个[Rcp\_FormFieldValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___form_field_value)。链式存储。

### type

PhonePC/2in1TabletTVWearable



```
1. Rcp_FormValueType Rcp_FormFieldValue::type
```

**描述**

表示union中使用的数据类型。

### varBool

PhonePC/2in1TabletTVWearable



```
1. uint8_t Rcp_FormFieldValue::varBool
```

**描述**

bool类型。

### varDouble

PhonePC/2in1TabletTVWearable



```
1. double Rcp_FormFieldValue::varDouble
```

**描述**

double类型。

### varInt32

PhonePC/2in1TabletTVWearable



```
1. int32_t Rcp_FormFieldValue::varInt32
```

**描述**

int32类型。

### varInt64

PhonePC/2in1TabletTVWearable



```
1. int64_t Rcp_FormFieldValue::varInt64
```

**描述**

int64类型。

### varStr

PhonePC/2in1TabletTVWearable



```
1. Rcp_Buffer Rcp_FormFieldValue::varStr
```

**描述**

string类型。