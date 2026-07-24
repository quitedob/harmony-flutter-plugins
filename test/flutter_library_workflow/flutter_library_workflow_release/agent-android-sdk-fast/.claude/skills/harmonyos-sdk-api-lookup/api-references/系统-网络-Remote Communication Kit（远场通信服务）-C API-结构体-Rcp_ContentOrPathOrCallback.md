## 概述

PhonePC/2in1TabletTVWearable

[Rcp\_FormFieldFileValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___form_field_file_value)中使用的简单表单数据字段值。

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
| [Rcp\_ContentOrPathOrCallbackType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_contentorpathorcallbacktype)[type](/consumer/cn/doc/harmonyos-references/_rcp___content_or_path_or_callback#type) | 表示union中使用的数据类型。 |
| union {  [Rcp\_Buffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___buffer) [content](/consumer/cn/doc/harmonyos-references/_rcp___content_or_path_or_callback#content)  char [path](/consumer/cn/doc/harmonyos-references/_rcp___content_or_path_or_callback#path) [[RCP\_MAX\_PATH\_LEN](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_max_path_len)]  [Rcp\_GetDataCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_getdatacallback) [callback](/consumer/cn/doc/harmonyos-references/_rcp___content_or_path_or_callback#callback)  } | content: 文本数据。  path: 文件路径。  callback: 获取数据的回调函数。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### callback

PhonePC/2in1TabletTVWearable



```
1. Rcp_GetDataCallback Rcp_ContentOrPathOrCallback::callback
```

**描述**

获取数据的回调。

### content

PhonePC/2in1TabletTVWearable



```
1. Rcp_Buffer Rcp_ContentOrPathOrCallback::content
```

**描述**

文本数据。

### path

PhonePC/2in1TabletTVWearable



```
1. char Rcp_ContentOrPathOrCallback::path[RCP_MAX_PATH_LEN]
```

**描述**

文件路径。

### type

PhonePC/2in1TabletTVWearable



```
1. Rcp_ContentOrPathOrCallbackType Rcp_ContentOrPathOrCallback::type
```

**描述**

union中使用的数据类型。