

```
1. typedef struct DateTimeRule {...} DateTimeRule
```

## 概述

PhonePC/2in1TabletTVWearable

时间日期规则。

**起始版本：** 22

**相关模块：** [i18n](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-i18n)

**所在头文件：** [timezone.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-timezone-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t month | 月份。 |
| int32\_t dayOfMonth | 当月的第几天。 |
| int32\_t dayOfWeek | 当周的第几天。 |
| int32\_t weekInMonth | 当月的第几周。 |
| int32\_t millisInDay | 从当天凌晨0点开始到当前时间的毫秒值。 |
| [DateRuleType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-timezone-h#dateruletype) dateRuleType | 日期规则类型。 |
| [TimeRuleType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-timezone-h#timeruletype) timeRuleType | 时间规则类型。 |