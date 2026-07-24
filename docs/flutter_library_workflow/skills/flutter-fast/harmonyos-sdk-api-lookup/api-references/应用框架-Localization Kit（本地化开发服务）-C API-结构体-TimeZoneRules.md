

```
1. typedef struct TimeZoneRules {...} TimeZoneRules
```

## 概述

PhonePC/2in1TabletTVWearable

完整的时区规则。

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
| [InitialTimeZoneRule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-i18n-initialtimezonerule) initial | 起始时区规则。 |
| [TimeArrayTimeZoneRule\*](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-i18n-timearraytimezonerule) timeArrayRules | 起始时间戳数组定义的时区规则数组。 |
| [AnnualTimeZoneRule\*](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-i18n-annualtimezonerule) annualRules | 每年生效的时区规则数组。 |
| size\_t numTimeArrayRules | 起始时间戳数组定义的时区规则数组的大小。 |
| size\_t numAnnualRules | 每年生效的时区规则数组的大小。 |