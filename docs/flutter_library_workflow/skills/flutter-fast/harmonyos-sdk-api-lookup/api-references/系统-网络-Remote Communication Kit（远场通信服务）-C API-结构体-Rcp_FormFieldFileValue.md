## 概述

PhonePC/2in1TabletTVWearable

表单字段文件值。

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
| char [contentType](/consumer/cn/doc/harmonyos-references/_rcp___form_field_file_value#contenttype) [[RCP\_MAX\_CONTENT\_TYPE\_LEN](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_max_content_type_len)] | 多部分表单数据内容类型。 |
| char [remoteFileName](/consumer/cn/doc/harmonyos-references/_rcp___form_field_file_value#remotefilename) [[RCP\_MAX\_FILENAME\_LEN](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_max_filename_len)] | 多部分表单数据远程文件名。 |
| [Rcp\_ContentOrPathOrCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___content_or_path_or_callback)[contentOrPathOrCb](/consumer/cn/doc/harmonyos-references/_rcp___form_field_file_value#contentorpathorcb) | 多部分表单数据内容。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### contentOrPathOrCb

PhonePC/2in1TabletTVWearable



```
1. Rcp_ContentOrPathOrCallback Rcp_FormFieldFileValue::contentOrPathOrCb
```

**描述**

多部分表单数据内容。

### contentType

PhonePC/2in1TabletTVWearable



```
1. char Rcp_FormFieldFileValue::contentType[RCP_MAX_CONTENT_TYPE_LEN]
```

**描述**

多部分表单数据内容类型。

### remoteFileName

PhonePC/2in1TabletTVWearable



```
1. char Rcp_FormFieldFileValue::remoteFileName[RCP_MAX_FILENAME_LEN]
```

**描述**

多部分表单数据远程文件名。