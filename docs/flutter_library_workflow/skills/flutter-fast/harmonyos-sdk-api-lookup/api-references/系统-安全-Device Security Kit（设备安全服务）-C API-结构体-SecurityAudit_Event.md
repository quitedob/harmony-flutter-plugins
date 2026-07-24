## 概述

PC/2in1

定义审计事件信息。

**起始版本：** 6.0.0(20)

**相关模块：** [SecurityAudit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-capi-securityaudit)

**所在头文件：** [security\_audit.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-capi-security-audit-8h)

## 汇总

PC/2in1

### 成员变量

PC/2in1

展开

| 名称 | 描述 |
| --- | --- |
| int64\_t [eventId](/consumer/cn/doc/harmonyos-references/devicesecurity-capi-structs-securityaudit-event#eventid) | 审计事件ID。 |
| const char \* [metadata](/consumer/cn/doc/harmonyos-references/devicesecurity-capi-structs-securityaudit-event#metadata) | 集成了事件版本号、事件接收时间、设备ID和用户ID的json字符串。 |
| const char \* [content](/consumer/cn/doc/harmonyos-references/devicesecurity-capi-structs-securityaudit-event#content) | 事件内容。 |

## 结构体成员变量说明

PC/2in1

### content

PC/2in1



```
1. const char* SecurityAudit_Event::content
```

**描述**

事件内容。

### eventId

PC/2in1



```
1. int64_t SecurityAudit_Event::eventId
```

**描述**

审计事件ID。

### metadata

PC/2in1



```
1. const char* SecurityAudit_Event::metadata
```

**描述**

集成了事件版本号、事件接收时间、设备ID和用户ID的json字符串。