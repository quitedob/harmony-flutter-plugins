篮球相关锻炼记录类型如下：

展开

| **锻炼记录子类型常量** | **描述** | 数据来源 |
| --- | --- | --- |
| [exerciseSequenceHelper.basketball.EXERCISE\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section1535055413566) | 篮球 | 篮球精灵手环 |

## 关联的统计数据说明

* 字段定义：[exerciseSequenceHelper.basketball.SummaryFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section16350165417561)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| basketballFeature | 篮球特征数据 | [BasketballFeature](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section99689347364) | M |
| calorie | 热量统计 | [CalorieSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section10820034172215) | M |
| jump | 跳跃统计 | [JumpSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1775832805119) | M |
| exerciseHeartRate | 运动心率统计 | [ExerciseHeartRateSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section61131157564) | O |

## 关联的明细数据说明

* 字段定义：[exerciseSequenceHelper.basketball.DetailFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section1435125435614)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| exerciseHeartRate | 运动心率详情 | [ExerciseHeartRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1011218571967)[] | O |
| jump | 跳跃详情 | [Jump](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section2080454010485)[] | O |
| speed | 速度详情 | [Speed](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section10458134951817)[] | O |