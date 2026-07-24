椭圆机相关锻炼记录类型如下：

展开

| **锻炼记录子类型常量** | **描述** | 数据来源 |
| --- | --- | --- |
| [exerciseSequenceHelper.elliptical.EXERCISE\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section17797111421017) | 椭圆机 | 手环、手表 |

## 椭圆机关联的统计数据说明

字段定义：[exerciseSequenceHelper.elliptical.SummaryFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section2079861411018)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| calorie | 热量统计 | [CalorieSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section10820034172215) | M |
| distance | 距离统计 | [DistanceSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1931022758) | O |
| exerciseHeartRate | 运动心率统计 | [ExerciseHeartRateSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section61131157564) | O |
| speed | 速度统计 | [SpeedSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section4460144920180) | O |
| step | 步数统计 | [StepSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1531683122019) | O |
| cadence | 步频统计 | [CadenceSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section517018141201) | O |
| resistance | 阻力统计 | [ResistanceSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section969783754212) | O |
| pedalingCadence | 踏频统计 | [PedalingCadenceSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section17379171873917) | O |
| power | 功率统计 | [PowerSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section6460410194012) | O |

## 关联的明细数据说明

字段定义：[exerciseSequenceHelper.elliptical.DetailFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section279918149104)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| exerciseHeartRate | 运动心率详情 | [ExerciseHeartRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1011218571967)[] | O |
| speed | 速度详情 | [Speed](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section10458134951817)[] | O |
| pedalingCadence | 踏频详情 | [PedalingCadence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section15378151813915)[] | O |
| power | 功率详情 | [Power](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section154582103406)[] | O |
| cadence | 步频详情 | [Cadence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section625153911153)[] | O |