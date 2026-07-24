本模块提供健康记录数据类型常量及数据模型。

**起始版本：** 5.0.0(12)

## 导入模块

PhoneTabletWearable



```
1. import { healthStore } from '@kit.HealthServiceKit';
```

说明

此模块为healthStore子模块，需通过healthStore.healthSequenceHelper方式使用。

## sleepRecord

PhoneTabletWearable

夜间睡眠数据类型常量及数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

### 常量

PhoneTabletWearable

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| DATA\_TYPE | [healthStore.DataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#datatype) | 夜间睡眠数据类型。 |

### Model

PhoneTabletWearable

type Model = healthModels.SleepRecord

夜间睡眠健康记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthModels.SleepRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthmodels#sleeprecord) | 夜间睡眠健康记录数据模型。 |

### Fields

PhoneTabletWearable

type Fields = healthFields.Sleep

夜间睡眠健康记录数据字段列表。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthFields.Sleep](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#sleep) | 夜间睡眠健康记录数据字段列表。 |

### DetailFields

PhoneTabletWearable

type DetailFields = healthFields.SleepDetail

睡眠详情数据字段列表。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthFields.SleepDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#sleepdetail) | 睡眠详情数据字段列表。 |

## sleepNapRecord

PhoneTabletWearable

零星小睡数据类型常量及数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

### 常量

PhoneTabletWearable

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| DATA\_TYPE | [healthStore.DataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#datatype) | 零星小睡数据类型。 |

### Model

PhoneTabletWearable

type Model = healthModels.SleepNapRecord

零星小睡健康记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthModels.SleepNapRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthmodels#sleepnaprecord) | 零星小睡健康记录数据模型。 |

### Fields

PhoneTabletWearable

type Fields = healthFields.SleepNap

零星小睡健康记录数据字段列表。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthFields.SleepNap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#sleepnap) | 零星小睡健康记录数据字段列表。 |

### DetailFields

PhoneTabletWearable

type DetailFields = healthFields.SleepDetail

睡眠详情数据字段列表。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthFields.SleepDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#sleepdetail) | 睡眠详情数据字段列表。 |

## menstrualCycle

PhoneTabletWearable

生理周期数据类型常量及数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在Stage模型下使用。

### 常量

PhoneTabletWearable

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在Stage模型下使用。

展开

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| DATA\_TYPE | [healthStore.DataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#datatype) | 生理周期数据类型。 |

### Model

PhoneTabletWearable

type Model = healthModels.MenstrualCycle

生理周期健康记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在Stage模型下使用。

展开

| 类型 | **说明** |
| --- | --- |
| [healthModels.MenstrualCycle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthmodels#menstrualcycle) | 生理周期健康记录数据模型。 |

### Fields

PhoneTabletWearable

type Fields = healthFields.MenstrualCycle

生理周期健康记录数据字段列表。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在Stage模型下使用。

展开

| 类型 | **说明** |
| --- | --- |
| [healthFields.MenstrualCycle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#menstrualcycle) | 生理周期健康记录数据字段列表。 |

### DetailFields

PhoneTabletWearable

type DetailFields = healthFields.MenstrualCycleDetail

生理周期详情数据字段列表。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在Stage模型下使用。

展开

| 类型 | **说明** |
| --- | --- |
| [healthFields.MenstrualCycleDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#menstrualcycledetail) | 生理周期详情数据字段列表。 |