

```
1. typedef struct AnnualTimeZoneRule {...} AnnualTimeZoneRule
```

## 概述

PhonePC/2in1TabletTVWearable

每年生效的时区规则。

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
| char\* name | 时区规则的名称。 |
| int32\_t startYear | 时区规则生效的起始年份。 |
| int32\_t endYear | 时区规则生效的终止年份。 |
| int32\_t rawOffset | 时区的原始偏移量。 |
| int32\_t dstSavings | 夏令时的偏移量。 |
| [DateTimeRule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-i18n-datetimerule) dateTimeRule | 时间日期规则。 |