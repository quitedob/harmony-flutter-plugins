## 概述

PhonePC/2in1TabletTVWearable

多部分表单域值，在[Rcp\_MultipartForm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_multipartform)中使用。

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
| [Rcp\_MultipartValueType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_multipartvaluetype) [type](/consumer/cn/doc/harmonyos-references/_rcp___multipart_form_field_value#type) | 表示union中使用的数据类型。 |
| union {  [Rcp\_FormFieldValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___form_field_value) [formValue](/consumer/cn/doc/harmonyos-references/_rcp___multipart_form_field_value#formvalue)  [Rcp\_FormFieldFileValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___form_field_file_value) [formFileValue](/consumer/cn/doc/harmonyos-references/_rcp___multipart_form_field_value#formfilevalue)  } | formValue：简单表单数据字段值。  formFileValue：简单表单数据字段文件值。 |
| struct [Rcp\_MultipartFormFieldValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___multipart_form_field_value) \* [next](/consumer/cn/doc/harmonyos-references/_rcp___multipart_form_field_value#next) | 指向下一个[Rcp\_MultipartFormFieldValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___multipart_form_field_value)。链式存储。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### formFileValue

PhonePC/2in1TabletTVWearable



```
1. Rcp_FormFieldFileValue Rcp_MultipartFormFieldValue::formFileValue
```

**描述**

简单表单数据字段文件值。

### formValue

PhonePC/2in1TabletTVWearable



```
1. Rcp_FormFieldValue Rcp_MultipartFormFieldValue::formValue
```

**描述**

简单表单数据字段值。

### next

PhonePC/2in1TabletTVWearable



```
1. struct Rcp_MultipartFormFieldValue* Rcp_MultipartFormFieldValue::next
```

**描述**

指向下一个[Rcp\_MultipartFormFieldValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___multipart_form_field_value)。链式存储。

### type

PhonePC/2in1TabletTVWearable



```
1. Rcp_MultipartValueType Rcp_MultipartFormFieldValue::type
```

**描述**

表示union中使用的数据类型。