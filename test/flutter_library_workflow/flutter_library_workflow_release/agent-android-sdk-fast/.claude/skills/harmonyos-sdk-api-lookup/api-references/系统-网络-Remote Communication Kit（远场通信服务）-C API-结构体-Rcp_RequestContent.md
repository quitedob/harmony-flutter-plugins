## 概述

PhonePC/2in1TabletTVWearable

请求的内容。

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
| [Rcp\_ContentType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_contenttype)[type](/consumer/cn/doc/harmonyos-references/_rcp___request_content#type) | 表示union中使用的数据类型。 |
| union {  [Rcp\_Buffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___buffer) [contentStr](/consumer/cn/doc/harmonyos-references/_rcp___request_content#contentstr)  [Rcp\_Form](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_form) \* [form](/consumer/cn/doc/harmonyos-references/_rcp___request_content#form)  [Rcp\_MultipartForm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_multipartform) \* [multipartForm](/consumer/cn/doc/harmonyos-references/_rcp___request_content#multipartform)  [Rcp\_GetDataCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_getdatacallback) [getDataCallback](/consumer/cn/doc/harmonyos-references/_rcp___request_content#getdatacallback)  } | contentStr：文本。  form：表单。  multipartForm：多部分表单。  getDataCallback：使用回调函数获取数据。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### contentStr

PhonePC/2in1TabletTVWearable



```
1. Rcp_Buffer Rcp_RequestContent::contentStr
```

**描述**

字符串内容。

### form

PhonePC/2in1TabletTVWearable



```
1. Rcp_Form* Rcp_RequestContent::form
```

**描述**

表单内容。

### getDataCallback

PhonePC/2in1TabletTVWearable



```
1. Rcp_GetDataCallback Rcp_RequestContent::getDataCallback
```

**描述**

回调函数。

### multipartForm

PhonePC/2in1TabletTVWearable



```
1. Rcp_MultipartForm* Rcp_RequestContent::multipartForm
```

**描述**

多部分表单内容。

### type

PhonePC/2in1TabletTVWearable



```
1. Rcp_ContentType Rcp_RequestContent::type
```

**描述**

表示union中使用的数据类型。