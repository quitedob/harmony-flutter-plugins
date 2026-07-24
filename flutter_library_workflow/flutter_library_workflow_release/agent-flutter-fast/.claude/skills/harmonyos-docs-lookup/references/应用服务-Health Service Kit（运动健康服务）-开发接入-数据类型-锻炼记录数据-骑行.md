骑行相关锻炼记录类型如下：

展开

| **锻炼记录子类型常量** | **描述** | 数据来源 |
| --- | --- | --- |
| [exerciseSequenceHelper.cycling.EXERCISE\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section299320372296) | 户外骑行 | 手机、手表、手环 |
| [exerciseSequenceHelper.indoorCycling.EXERCISE\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section14762493361) | 室内单车 | 室内自行车、室内骑行台 |
| [exerciseSequenceHelper.spinning.EXERCISE\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section13529152615411) | 动感单车 | 动感单车 |
| [exerciseSequenceHelper.bmx.EXERCISE\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section171409112597) | BMX自行车 | 越野自行车 |

## 关联的统计数据说明

* 字段定义：[exerciseSequenceHelper.cycling.SummaryFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section1599483720293)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| distance | 距离统计 | [DistanceSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1931022758) | M |
| calorie | 热量统计 | [CalorieSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section10820034172215) | M |
| speed | 速度统计 | [SpeedSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section4460144920180) | M |
| exerciseHeartRate | 运动心率统计 | [ExerciseHeartRateSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section61131157564) | O |
| resistance | 阻力统计 | [ResistanceSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section969783754212) | O |
| pedalingCadence | 踏频统计 | [PedalingCadenceSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section17379171873917) | O |
| power | 功率统计 | [PowerSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section6460410194012) | O |
| altitude | 海拔统计 | [AltitudeSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section5999164151119) | O |
| location | 位置统计 | [LocationSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section20701154013341) | O |

## 关联的明细数据说明

* 字段定义：[exerciseSequenceHelper.cycling.DetailFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section988513311325)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| exerciseHeartRate | 运动心率详情 | [ExerciseHeartRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1011218571967)[] | O |
| speed | 速度详情 | [Speed](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section10458134951817)[] | O |
| pedalingCadence | 踏频详情 | [PedalingCadence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section15378151813915)[] | O |
| power | 功率详情 | [Power](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section154582103406)[] | O |
| location | 位置详情 | [Location](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1970034063415)[] | O |
| altitude | 海拔详情 | [Altitude](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section271517115816)[] | O |
| resistance | 阻力详情 | [Resistance](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section17695193744217)[] | O |