

```
1. struct WebSocket_Header {...}
```

## 概述

PhonePC/2in1TabletTVWearable

websocket客户端增加header的链表节点。

**起始版本：** 11

**相关模块：** [netstack](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack)

**所在头文件：** [net\_websocket\_type.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-type-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| const char \*fieldName | header的字段名。 |
| const char \*fieldValue | header的字段内容。 |
| struct [WebSocket\_Header](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netstack-websocket-header) \*next | header链表的next指针。 |