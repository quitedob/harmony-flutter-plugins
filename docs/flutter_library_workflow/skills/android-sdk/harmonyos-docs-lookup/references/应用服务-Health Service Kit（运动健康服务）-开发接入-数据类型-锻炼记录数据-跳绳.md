跳绳相关锻炼记录类型如下：

展开

| **锻炼记录子类型常量** | **描述** | 数据来源 |
| --- | --- | --- |
| [exerciseSequenceHelper.jumpingRope.EXERCISE\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section185161145153915) | 跳绳 | AI跳绳、智能跳绳设备 |

## 关联的统计数据说明

* 字段定义：[exerciseSequenceHelper.jumpingRope.SummaryFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section185175458394)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| jumpingRopeFeature | 跳绳特征数据 | [JumpingRopeFeature](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section584042781213) | M |
| calorie | 热量统计 | [CalorieSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section10820034172215) | M |
| skipSpeed | 跳跃速度统计 | [SkipSpeedSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section162181823141115) | M |
| exerciseHeartRate | 运动心率统计 | [ExerciseHeartRateSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section61131157564) | O |

## 关联的明细数据说明

* 字段定义：[exerciseSequenceHelper.jumpingRope.DetailFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section17518194593918)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| exerciseHeartRate | 运动心率详情 | [ExerciseHeartRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1011218571967)[] | O |
| skipSpeed | 跳跃速度详情 | [SkipSpeed](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section22171238115)[] | O |