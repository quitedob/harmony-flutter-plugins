## 概述

PhonePC/2in1TabletTVWearable

指定要收集的请求处理事件。可以通过响应对象检查收集的事件。

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
| bool [textual](/consumer/cn/doc/harmonyos-references/_rcp___info_to_collect#textual) | 是否收集未分类的文本事件。默认值为false。 |
| bool [incomingHeader](/consumer/cn/doc/harmonyos-references/_rcp___info_to_collect#incomingheader) | 是否收集传入HTTP标头事件。默认值为false。 |
| bool [outgoingHeader](/consumer/cn/doc/harmonyos-references/_rcp___info_to_collect#outgoingheader) | 是否收集传出HTTP标头事件。默认值为false。 |
| bool [incomingData](/consumer/cn/doc/harmonyos-references/_rcp___info_to_collect#incomingdata) | 是否收集有关传入HTTP数据的事件。默认值为false。 |
| bool [outgoingData](/consumer/cn/doc/harmonyos-references/_rcp___info_to_collect#outgoingdata) | 是否收集有关传出HTTP数据的事件。默认值为false。 |
| bool [incomingSslData](/consumer/cn/doc/harmonyos-references/_rcp___info_to_collect#incomingssldata) | 是否收集传入的SSL/TLS事件。默认值为false。 |
| bool [outgoingSslData](/consumer/cn/doc/harmonyos-references/_rcp___info_to_collect#outgoingssldata) | 是否收集传出的SSL/TLS事件。默认值为false。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### incomingData

PhonePC/2in1TabletTVWearable



```
1. bool Rcp_InfoToCollect::incomingData
```

**描述**

是否收集有关传入HTTP数据的事件。默认值为false。

### incomingHeader

PhonePC/2in1TabletTVWearable



```
1. bool Rcp_InfoToCollect::incomingHeader
```

**描述**

是否收集传入HTTP标头事件。默认值为false。

### incomingSslData

PhonePC/2in1TabletTVWearable



```
1. bool Rcp_InfoToCollect::incomingSslData
```

**描述**

是否收集传入的SSL/TLS事件。默认值为false。

### outgoingData

PhonePC/2in1TabletTVWearable



```
1. bool Rcp_InfoToCollect::outgoingData
```

**描述**

是否收集有关传出HTTP数据的事件。默认值为false。

### outgoingHeader

PhonePC/2in1TabletTVWearable



```
1. bool Rcp_InfoToCollect::outgoingHeader
```

**描述**

是否收集传出HTTP标头事件。默认值为false。

### outgoingSslData

PhonePC/2in1TabletTVWearable



```
1. bool Rcp_InfoToCollect::outgoingSslData
```

**描述**

是否收集传出的SSL/TLS事件。默认值为false。

### textual

PhonePC/2in1TabletTVWearable



```
1. bool Rcp_InfoToCollect::textual
```

**描述**

是否收集未分类的文本事件。默认值为false。