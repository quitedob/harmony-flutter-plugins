潜水闭气测试相关锻炼记录类型如下：

展开

| **锻炼记录子类型常量** | **描述** | 数据来源 |
| --- | --- | --- |
| [exerciseSequenceHelper.breathHoldingTest.EXERCISE\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section4370709410) | 潜水闭气测试 | 部分专业手表、手环 |

## 关联的统计数据说明

字段定义：[exerciseSequenceHelper.breathHoldingTest.SummaryFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section43718017416)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| breathHoldingTestFeature | 潜水闭气测试特征数据 | [BreathHoldingTestFeature](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section236115121419) | M |
| exerciseHeartRate | 运动心率统计 | [ExerciseHeartRateSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section61131157564) | O |

## 关联的明细数据说明

字段定义：[exerciseSequenceHelper.breathHoldingTest.DetailFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section637211017416)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| exerciseHeartRate | 运动心率详情 | [ExerciseHeartRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1011218571967)[] | O |