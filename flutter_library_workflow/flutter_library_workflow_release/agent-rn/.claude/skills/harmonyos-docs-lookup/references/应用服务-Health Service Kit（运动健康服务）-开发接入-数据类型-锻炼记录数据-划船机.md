## 划船机

### 划船机相关锻炼记录类型如下：

展开

| **锻炼记录子类型常量** | **描述** | 数据来源 |
| --- | --- | --- |
| [exerciseSequenceHelper.rower.EXERCISE\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section436062171914) | 划船机 | 划船机等专业设备 |

### 划船机关联的统计数据说明

字段定义：[exerciseSequenceHelper.rower.SummaryFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section236214211914)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| rowerFeature | 划船机特征数据 | [RowerFeature](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section13153171111333) | M |
| calorie | 热量统计 | [CalorieSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section10820034172215) | M |
| distance | 距离统计 | [DistanceSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1931022758) | O |
| speed | 速度统计 | [SpeedSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section4460144920180) | O |
| exerciseHeartRate | 运动心率统计 | [ExerciseHeartRateSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section61131157564) | O |
| resistance | 阻力统计 | [ResistanceSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section969783754212) | O |
| power | 功率统计 | [PowerSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section6460410194012) | O |
| strokeRate | 桨频统计 | [StrokeRateSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section167731953151312) | O |

### 划船机关联的明细数据说明

字段定义：[exerciseSequenceHelper.rower.DetailFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section1236362201910)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| exerciseHeartRate | 运动心率详情 | [ExerciseHeartRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1011218571967)[] | O |
| speed | 速度详情 | [Speed](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section10458134951817)[] | O |
| power | 功率详情 | [Power](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section154582103406)[] | O |
| resistance | 阻力详情 | [Resistance](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section17695193744217)[] | O |
| strokeRate | 桨频详情 | [StrokeRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section20396141712117)[] | O |

## 赛艇

### 赛艇相关锻炼记录类型如下：

展开

| **锻炼记录子类型常量** | **描述** | 数据来源 |
| --- | --- | --- |
| [exerciseSequenceHelper.rowing.EXERCISE\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section216143562519) | 赛艇 | 手环、手表 |

### 赛艇关联的统计数据说明

字段定义：[exerciseSequenceHelper.rowing.SummaryFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section0163135162513)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| rowingFeature | 赛艇特征数据 | [RowingFeature](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section45351858172920) | M |
| calorie | 热量统计 | [CalorieSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section10820034172215) | M |
| distance | 距离统计 | [DistanceSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1931022758) | O |
| exerciseHeartRate | 运动心率统计 | [ExerciseHeartRateSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section61131157564) | O |
| strokeRate | 桨频统计 | [StrokeRateSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section167731953151312) | O |

### 赛艇关联的明细数据说明

字段定义：[exerciseSequenceHelper.rowing.DetailFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section4164193511258)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| exerciseHeartRate | 运动心率详情 | [ExerciseHeartRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1011218571967)[] | O |
| strokeRate | 桨频详情 | [StrokeRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section20396141712117)[] | O |