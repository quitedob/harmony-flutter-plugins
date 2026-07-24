本模块提供运动健康数据模型。

**起始版本：** 5.0.0(12)

## 导入模块

PhoneTabletWearable



```
1. import { healthStore } from '@kit.HealthServiceKit';
```

说明

此模块为healthStore子模块，需通过healthStore.healthModels方式使用。

## Adventures

PhoneTabletWearable

type Adventures = healthStore.ExerciseSequence<healthFields.AdventuresSummary, healthFields.AdventuresDetail>

户外探险锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.AdventuresSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#adventuressummary), [healthFields.AdventuresDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#adventuresdetail)> | 户外探险锻炼记录数据模型。 |

## Basketball

PhoneTabletWearable

type Basketball = healthStore.ExerciseSequence<healthFields.BasketballSummary, healthFields.BasketballDetail>

篮球锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.BasketballSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#basketballsummary), [healthFields.BasketballDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#basketballdetail)> | 篮球锻炼记录数据模型。 |

## Biathlon

PhoneTabletWearable

type Biathlon = healthStore.ExerciseSequence<healthFields.BiathlonSummary, healthFields.BiathlonDetail>

冬季两项锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.BiathlonSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#biathlonsummary), [healthFields.BiathlonDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#biathlondetail)> | 冬季两项锻炼记录数据模型。 |

## BloodOxygenSaturation

PhoneTabletWearable

type BloodOxygenSaturation = healthStore.SamplePoint<healthFields.BloodOxygenSaturation>

血氧采样数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#samplepoint)<[healthFields.BloodOxygenSaturation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#bloodoxygensaturation)> | 血氧采样数据模型。 |

## BloodOxygenSaturationAggregateRequest

PhoneTabletWearable

type BloodOxygenSaturationAggregateRequest = healthStore.AggregateRequest<healthFields.BloodOxygenSaturationAggregation>

血氧采样数据聚合统计请求模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.AggregateRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#aggregaterequest)<[healthFields.BloodOxygenSaturationAggregation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#bloodoxygensaturationaggregation)> | 血氧采样数据聚合统计请求模型。 |

## BloodOxygenSaturationAggregateResult

PhoneTabletWearable

type BloodOxygenSaturationAggregateResult = healthStore.AggregateResult<healthFields.BloodOxygenSaturationAggregation>

血氧聚合结果数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.AggregateResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#aggregateresult)<[healthFields.BloodOxygenSaturationAggregation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#bloodoxygensaturationaggregation)> | 血氧聚合结果数据模型。 |

## BloodPressure

PhoneTabletWearable

type BloodPressure = healthStore.SamplePoint<healthFields.BloodPressure>

血压采样数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#samplepoint)<[healthFields.BloodPressure](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#bloodpressure)> | 血压采样数据模型。 |

## Bmx

PhoneTabletWearable

type Bmx = healthStore.ExerciseSequence<healthFields.CyclingSummary, healthFields.CyclingDetail>

BMX自行车锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.CyclingSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#cyclingsummary), [healthFields.CyclingDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#cyclingdetail)> | BMX自行车锻炼记录数据模型。 |

## BodyTemperature

PhoneTabletWearable

type BodyTemperature = healthStore.SamplePoint<healthFields.BodyTemperature>

体温采样数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#samplepoint)<[healthFields.BodyTemperature](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#bodytemperature)> | 体温采样数据模型。 |

## BodyTemperatureAggregateRequest

PhoneTabletWearable

type BodyTemperatureAggregateRequest = healthStore.AggregateRequest<healthFields.BodyTemperatureAggregation>

体温采样数据聚合统计请求模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.AggregateRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#aggregaterequest)<[healthFields.BodyTemperatureAggregation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#bodytemperatureaggregation)> | 体温采样数据聚合统计请求模型。 |

## BodyTemperatureAggregateResult

PhoneTabletWearable

type BodyTemperatureAggregateResult = healthStore.AggregateResult<healthFields.BodyTemperatureAggregation>

体温聚合结果数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.AggregateResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#aggregateresult)<[healthFields.BodyTemperatureAggregation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#bodytemperatureaggregation)> | 体温聚合结果数据模型。 |

## BreathHoldingTest

PhoneTabletWearable

type BreathHoldingTest = healthStore.ExerciseSequence<healthFields.BreathHoldingTestSummary, healthFields.BreathHoldingTestDetail>

闭气测试锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.BreathHoldingTestSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#breathholdingtestsummary), [healthFields.BreathHoldingTestDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#breathholdingtestdetail)> | 闭气测试锻炼记录数据模型。 |

## BreathHoldingTrain

PhoneTabletWearable

type BreathHoldingTrain = healthStore.ExerciseSequence<healthFields.BreathHoldingTrainSummary, healthFields.BreathHoldingTrainDetail>

闭气训练锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.BreathHoldingTrainSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#breathholdingtrainsummary), [healthFields.BreathHoldingTrainDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#breathholdingtraindetail)> | 闭气训练锻炼记录数据模型。 |

## Cycling

PhoneTabletWearable

type Cycling = healthStore.ExerciseSequence<healthFields.CyclingSummary, healthFields.CyclingDetail>

户外骑行锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.CyclingSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#cyclingsummary), [healthFields.CyclingDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#cyclingdetail)> | 户外骑行锻炼记录数据模型。 |

## DailyActivities

PhoneTabletWearable

type DailyActivities = healthStore.SamplePoint<healthFields.DailyActivities>

日常活动采样数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#samplepoint)<[healthFields.DailyActivities](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#dailyactivities)> | 日常活动采样数据模型。 |

## DailyActivitiesAggregateRequest

PhoneTabletWearable

type DailyActivitiesAggregateRequest = healthStore.AggregateRequest<healthFields.DailyActivitiesAggregation>

日常活动采样数据聚合统计请求模型。

**元服务API**：从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.AggregateRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#aggregaterequest)<[healthFields.DailyActivitiesAggregation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#dailyactivitiesaggregation)> | 日常活动采样数据聚合统计请求模型。 |

## DailyActivitiesAggregateResult

PhoneTabletWearable

type DailyActivitiesAggregateResult = healthStore.AggregateResult<healthFields.DailyActivitiesAggregation>

日常活动聚合结果数据模型。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.AggregateResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#aggregateresult)<[healthFields.DailyActivitiesAggregation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#dailyactivitiesaggregation)> | 日常活动聚合结果数据模型。 |

## Diving

PhoneTabletWearable

type Diving = healthStore.ExerciseSequence<healthFields.DivingSummary, healthFields.DivingDetail>

自由潜水锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.DivingSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#divingsummary), [healthFields.DivingDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#divingdetail)> | 自由潜水锻炼记录数据模型。 |

## Elliptical

PhoneTabletWearable

type Elliptical = healthStore.ExerciseSequence<healthFields.EllipticalSummary, healthFields.EllipticalDetail>

椭圆机锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.EllipticalSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#ellipticalsummary), [healthFields.EllipticalDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#ellipticaldetail)> | 椭圆机锻炼记录数据模型。 |

## Emotion

PhoneTabletWearable

type Emotion = healthStore.SamplePoint<healthFields.Emotion>

情绪采样数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.1.0(18)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#samplepoint)<[healthFields.Emotion](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#emotion)> | 情绪采样数据模型。 |

## GolfCourseModel

PhoneTabletWearable

type GolfCourseModel = healthStore.ExerciseSequence<healthFields.GolfCourseModelSummary, healthFields.GolfCourseModelDetail>

高尔夫场地模式锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.GolfCourseModelSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#golfcoursemodelsummary), [healthFields.GolfCourseModelDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#golfcoursemodeldetail)> | 高尔夫场地模式锻炼记录数据模型。 |

## GolfPractice

PhoneTabletWearable

type GolfPractice = healthStore.ExerciseSequence<healthFields.GolfPracticeSummary, healthFields.GolfPracticeDetail>

高尔夫练习场模式锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.GolfPracticeSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#golfpracticesummary), [healthFields.GolfPracticeDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#golfpracticedetail)> | 高尔夫练习场模式锻炼记录数据模型。 |

## HeartRate

PhoneTabletWearable

type HeartRate = healthStore.SamplePoint<healthFields.HeartRate>

动态心率采样数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#samplepoint)<[healthFields.HeartRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#heartrate)> | 动态心率采样数据模型。 |

## HeartRateAggregateRequest

PhoneTabletWearable

type HeartRateAggregateRequest = healthStore.AggregateRequest<healthFields.HeartRateAggregation>

动态心率采样数据聚合统计请求模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.AggregateRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#aggregaterequest)<[healthFields.HeartRateAggregation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#heartrateaggregation)> | 动态心率采样数据聚合统计请求模型。 |

## HeartRateAggregateResult

PhoneTabletWearable

type HeartRateAggregateResult = healthStore.AggregateResult<healthFields.HeartRateAggregation>

动态心率聚合结果数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.AggregateResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#aggregateresult)<[healthFields.HeartRateAggregation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#heartrateaggregation)> | 动态心率聚合结果数据模型。 |

## HeartRateVariability

PhoneTabletWearable

type HeartRateVariability = healthStore.SamplePoint<healthFields.HeartRateVariability>

心率变异性采样数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.1.0(18)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#samplepoint)<[healthFields.HeartRateVariability](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#heartratevariability)> | 心率变异性采样数据模型。 |

## Height

PhoneTabletWearable

type Height = healthStore.SamplePoint<healthFields.Height>

身高采样数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#samplepoint)<[healthFields.Height](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#height)> | 身高采样数据模型。 |

## Hiking

PhoneTabletWearable

type Hiking = healthStore.ExerciseSequence<healthFields.WalkingSummary, healthFields.WalkingDetail>

徒步锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.WalkingSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#walkingsummary), [healthFields.WalkingDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#walkingdetail)> | 徒步锻炼记录数据模型。 |

## IndoorCycling

PhoneTabletWearable

type IndoorCycling = healthStore.ExerciseSequence<healthFields.CyclingSummary, healthFields.CyclingDetail>

室内单车锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.CyclingSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#cyclingsummary), [healthFields.CyclingDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#cyclingdetail)> | 室内单车锻炼记录数据模型。 |

## IndoorRunning

PhoneTabletWearable

type IndoorRunning = healthStore.ExerciseSequence<healthFields.RunningSummary, healthFields.RunningDetail>

室内跑步锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.RunningSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#runningsummary), [healthFields.RunningDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#runningdetail)> | 室内跑步锻炼记录数据模型。 |

## IndoorWalking

PhoneTabletWearable

type IndoorWalking = healthStore.ExerciseSequence<healthFields.WalkingSummary, healthFields.WalkingDetail>

室内步行锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.WalkingSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#walkingsummary), [healthFields.WalkingDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#walkingdetail)> | 室内步行锻炼记录数据模型。 |

## JumpingRope

PhoneTabletWearable

type JumpingRope = healthStore.ExerciseSequence<healthFields.JumpingRopeSummary, healthFields.JumpingRopeDetail>

跳绳锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.JumpingRopeSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#jumpingropesummary), [healthFields.JumpingRopeDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#jumpingropedetail)> | 跳绳锻炼记录数据模型。 |

## MenstrualCycle

PhoneTabletWearable

type MenstrualCycle = healthStore.HealthSequence<healthFields.MenstrualCycle, healthFields.MenstrualCycleDetail>

生理周期健康记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在Stage模型下使用。

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.HealthSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#healthsequence)<[healthFields.MenstrualCycle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#menstrualcycle), [healthFields.MenstrualCycleDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#menstrualcycledetail)> | 生理周期健康记录数据模型。 |

## MountainHike

PhoneTabletWearable

type MountainHike = healthStore.ExerciseSequence<healthFields.MountainHikeSummary, healthFields.MountainHikeDetail>

登山锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.MountainHikeSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#mountainhikesummary), [healthFields.MountainHikeDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#mountainhikedetail)> | 登山锻炼记录数据模型。 |

## OpenWaterSwim

PhoneTabletWearable

type OpenWaterSwim = healthStore.ExerciseSequence<healthFields.OpenWaterSwimSummary, healthFields.OpenWaterSwimDetail>

开放水域游泳锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.OpenWaterSwimSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#openwaterswimsummary), [healthFields.OpenWaterSwimDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#openwaterswimdetail)> | 开放水域游泳锻炼记录数据模型。 |

## PoolSwim

PhoneTabletWearable

type PoolSwim = healthStore.ExerciseSequence<healthFields.PoolSwimSummary, healthFields.PoolSwimDetail>

泳池游泳锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.PoolSwimSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#poolswimsummary), [healthFields.PoolSwimDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#poolswimdetail)> | 泳池游泳锻炼记录数据模型。 |

## RestingHeartRate

PhoneTabletWearable

type RestingHeartRate = healthStore.SamplePoint<healthFields.RestingHeartRate>

静息心率采样数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#samplepoint)<[healthFields.RestingHeartRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#restingheartrate)> | 静息心率采样数据模型。 |

## RestingHeartRateAggregateRequest

PhoneTabletWearable

type RestingHeartRateAggregateRequest = healthStore.AggregateRequest<healthFields.RestingHeartRateAggregation>

静息心率采样数据聚合统计请求模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.AggregateRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#aggregaterequest)<[healthFields.RestingHeartRateAggregation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#restingheartrateaggregation)> | 静息心率采样数据聚合统计请求模型。 |

## RestingHeartRateAggregateResult

PhoneTabletWearable

type RestingHeartRateAggregateResult = healthStore.AggregateResult<healthFields.RestingHeartRateAggregation>

静息心率聚合结果数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.AggregateResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#aggregateresult)<[healthFields.RestingHeartRateAggregation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#restingheartrateaggregation)> | 静息心率聚合结果数据模型。 |

## Rower

PhoneTabletWearable

type Rower = healthStore.ExerciseSequence<healthFields.RowerSummary, healthFields.RowerDetail>

划船机锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.RowerSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#rowersummary), [healthFields.RowerDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#rowerdetail)> | 划船机锻炼记录数据模型。 |

## Rowing

PhoneTabletWearable

type Rowing = healthStore.ExerciseSequence<healthFields.RowingSummary, healthFields.RowingDetail>

赛艇锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.RowingSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#rowingsummary), [healthFields.RowingDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#rowingdetail)> | 赛艇锻炼记录数据模型。 |

## Running

PhoneTabletWearable

type Running = healthStore.ExerciseSequence<healthFields.RunningSummary, healthFields.RunningDetail>

户外跑步锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.RunningSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#runningsummary), [healthFields.RunningDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#runningdetail)> | 户外跑步锻炼记录数据模型。 |

## ScubaDiving

PhoneTabletWearable

type ScubaDiving = healthStore.ExerciseSequence<healthFields.ScubaDivingSummary, healthFields.ScubaDivingDetail>

水肺潜水锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.ScubaDivingSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#scubadivingsummary), [healthFields.ScubaDivingDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#scubadivingdetail)> | 水肺潜水锻炼记录数据模型。 |

## Skiing

PhoneTabletWearable

type Skiing = healthStore.ExerciseSequence<healthFields.SkiingSummary, healthFields.SkiingDetail>

滑雪锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.SkiingSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#skiingsummary), [healthFields.SkiingDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#skiingdetail)> | 滑雪锻炼记录数据模型。 |

## SkinTemperature

PhoneTabletWearable

type SkinTemperature = healthStore.SamplePoint<healthFields.SkinTemperature>

皮肤体温采样数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#samplepoint)<[healthFields.SkinTemperature](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#skintemperature)> | 皮肤体温采样数据模型。 |

## SkinTemperatureAggregateRequest

PhoneTabletWearable

type SkinTemperatureAggregateRequest = healthStore.AggregateRequest<healthFields.SkinTemperatureAggregation>

皮肤体温采样数据聚合统计请求模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.AggregateRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#aggregaterequest)<[healthFields.SkinTemperatureAggregation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#skintemperatureaggregation)> | 皮肤体温采样数据聚合统计请求模型。 |

## SkinTemperatureAggregateResult

PhoneTabletWearable

type SkinTemperatureAggregateResult = healthStore.AggregateResult<healthFields.SkinTemperatureAggregation>

皮肤体温聚合结果数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.AggregateResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#aggregateresult)<[healthFields.SkinTemperatureAggregation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#skintemperatureaggregation)> | 皮肤体温聚合结果数据模型。 |

## Sled

PhoneTabletWearable

type Sled = healthStore.ExerciseSequence<healthFields.SledSummary, healthFields.SledDetail>

滑雪橇锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.SledSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#sledsummary), [healthFields.SledDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#sleddetail)> | 滑雪橇锻炼记录数据模型。 |

## SleepNapRecord

PhoneTabletWearable

type SleepNapRecord = healthStore.HealthSequence<healthFields.SleepNap, healthFields.SleepDetail>

零星小睡健康记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.HealthSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#healthsequence)<[healthFields.SleepNap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#sleepnap), [healthFields.SleepDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#sleepdetail)> | 零星小睡健康记录数据模型。 |

## SleepRecord

PhoneTabletWearable

type SleepRecord = healthStore.HealthSequence<healthFields.Sleep, healthFields.SleepDetail>

夜间睡眠健康记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.HealthSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#healthsequence)<[healthFields.Sleep](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#sleep), [healthFields.SleepDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#sleepdetail)> | 夜间睡眠健康记录数据模型。 |

## Snowboarding

PhoneTabletWearable

type Snowboarding = healthStore.ExerciseSequence<healthFields.SnowboardingSummary, healthFields.SnowboardingDetail>

单板滑雪锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.SnowboardingSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#snowboardingsummary), [healthFields.SnowboardingDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#snowboardingdetail)> | 单板滑雪锻炼记录数据模型。 |

## Spinning

PhoneTabletWearable

type Spinning = healthStore.ExerciseSequence<healthFields.CyclingSummary, healthFields.CyclingDetail>

动感单车锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.CyclingSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#cyclingsummary), [healthFields.CyclingDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#cyclingdetail)> | 动感单车锻炼记录数据模型。 |

## Sports

PhoneTabletWearable

type Sports = healthStore.ExerciseSequence<healthFields.SportsSummary, healthFields.SportsDetail>

通用锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.SportsSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#sportssummary), [healthFields.SportsDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#sportsdetail)> | 通用锻炼记录数据模型。 |

## Stress

PhoneTabletWearable

type Stress = healthStore.SamplePoint<healthFields.Stress>

压力采样数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#samplepoint)<[healthFields.Stress](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#stress)> | 压力采样数据模型。 |

## StressAggregateRequest

PhoneTabletWearable

type StressAggregateRequest = healthStore.AggregateRequest<healthFields.StressAggregation>

压力采样数据聚合统计请求模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.AggregateRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#aggregaterequest)<[healthFields.StressAggregation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#stressaggregation)> | 压力采样数据聚合统计请求模型。 |

## StressAggregateResult

PhoneTabletWearable

type StressAggregateResult = healthStore.AggregateResult<healthFields.StressAggregation>

压力聚合结果数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.AggregateResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#aggregateresult)<[healthFields.StressAggregation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#stressaggregation)> | 压力聚合结果数据模型。 |

## TrailRunning

PhoneTabletWearable

type TrailRunning = healthStore.ExerciseSequence<healthFields.RunningSummary, healthFields.RunningDetail>

越野跑锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.RunningSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#runningsummary), [healthFields.RunningDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#runningdetail)> | 越野跑锻炼记录数据模型。 |

## Walking

PhoneTabletWearable

type Walking = healthStore.ExerciseSequence<healthFields.WalkingSummary, healthFields.WalkingDetail>

户外步行锻炼记录数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#exercisesequence)<[healthFields.WalkingSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#walkingsummary), [healthFields.WalkingDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#walkingdetail)> | 户外步行锻炼数据模型记录。 |

## Weight

PhoneTabletWearable

type Weight = healthStore.SamplePoint<healthFields.Weight>

体重采样数据模型。

**系统能力：** SystemCapability.Health.HealthStore

**起始版本：** 5.0.0(12)

展开

| 类型 | **说明** |
| --- | --- |
| [healthStore.SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#samplepoint)<[healthFields.Weight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#weight)> | 体重采样数据模型。 |