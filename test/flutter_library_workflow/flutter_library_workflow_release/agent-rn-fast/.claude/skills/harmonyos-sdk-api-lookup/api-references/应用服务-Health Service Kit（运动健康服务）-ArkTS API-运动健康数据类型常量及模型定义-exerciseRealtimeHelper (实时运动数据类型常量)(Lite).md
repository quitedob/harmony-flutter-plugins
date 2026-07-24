本模块提供实时运动数据类型常量。

**起始版本：** 6.1.1(24)

## 导入模块

Lite Wearable



```
1. import healthStore  from '@hms.health.store';
```

说明

此模块为healthStore子模块，需通过healthStore.exerciseRealtimeHelper方式使用。

## 常量

Lite Wearable

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

## 实时运动-公共

Lite Wearable

展开

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| REALTIME\_KEY\_ACTIVE\_TIME | string | 锻炼时长（运动过程中身体处于活跃状态时长），单位：s 。 |
| REALTIME\_KEY\_AEROBIC\_TRAINING\_STRESS | string | 单次运动对身体有氧系统产生的训练刺激等级，刺激等级越高刺激取值越大，取值范围：[0.0, 5.0]。 |
| REALTIME\_KEY\_ANAEROBIC\_TRAINING\_STRESS | string | 单次运动对身体无氧系统产生的训练刺激等级，刺激等级越高刺激取值越大，取值范围：[0.0, 5.0]。 |
| REALTIME\_KEY\_HEART\_RATE | string | 心率，单位：bmp。 |
| REALTIME\_KEY\_DURATION | string | 运动时间，单位：s。 |
| REALTIME\_KEY\_TOTAL\_CALORIES | string | 总消耗热量，单位：cal。 |
| REALTIME\_KEY\_ACTIVE\_CALORIE | string | 活动热量，单位：cal。 |

## 实时运动-羽毛球

Lite Wearable

展开

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| REALTIME\_KEY\_AVG\_SHOT\_SPEED | string | 平均拍速，单位：km/h。 |
| REALTIME\_KEY\_SHOTS | string | 挥拍次数。 |
| REALTIME\_KEY\_MAX\_CONTINUOUS\_RALLY | string | 最长连续对打回合数。 |
| REALTIME\_KEY\_FOREHAND\_STROKE | string | 正手击球次数，单位：次。 |
| REALTIME\_KEY\_BACKHAND\_STROKE | string | 反手击球次数，单位：次。 |
| REALTIME\_KEY\_SMASH | string | 杀球次数，单位：次。 |
| REALTIME\_KEY\_HIGH\_CLEAR | string | 高远球次数，单位：次。 |
| REALTIME\_KEY\_MAX\_SHOT\_SPEED | string | 最大拍速，单位：km/h。 |
| REALTIME\_KEY\_OVERHAND\_STROKE | string | 上手击球次数，单位：次。 |
| REALTIME\_KEY\_UNDERHAND\_STROKE | string | 下手击球次数，单位：次。 |

## 实时运动-爬楼

Lite Wearable

展开

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| REALTIME\_KEY\_TOTAL\_STEPS | string | 运动步数，单位：步。 |
| REALTIME\_KEY\_FLOORS | string | 楼层数。 |
| AIR\_WREALTIME\_KEY\_AVG\_FLOOR\_SPEEDALKER | string | 爬楼速度，单位：层/分钟。 |

## 实时运动-网球

Lite Wearable

展开

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| REALTIME\_KEY\_FOREHAND | string | 正手击球次数，单位：次。 |
| REALTIME\_KEY\_BACKHAND | string | 反手击球次数，单位：次。 |
| REALTIME\_KEY\_SWING\_TIMES | string | 挥拍次数，单位：次。 |
| REALTIME\_KEY\_MAX\_CONTINUOUS\_RALLY | string | 最长连续对打回合数。 |

## 实时运动-匹克球

Lite Wearable

展开

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| REALTIME\_KEY\_FOREHAND | string | 正手击球次数，单位：次。 |
| REALTIME\_KEY\_BACKHAND | string | 反手击球次数，单位：次。 |
| REALTIME\_KEY\_SWING\_TIMES | string | 挥拍次数，单位：次。 |
| REALTIME\_KEY\_MAX\_CONTINUOUS\_RALLY | string | 最长连续对打回合数。 |

## 实时运动-足球

Lite Wearable

展开

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| REALTIME\_KEY\_GOALS\_TIMES | string | 进球次数，单位：次。 |
| REALTIME\_KEY\_ASSISTS\_TIMES | string | 助攻次数。 |