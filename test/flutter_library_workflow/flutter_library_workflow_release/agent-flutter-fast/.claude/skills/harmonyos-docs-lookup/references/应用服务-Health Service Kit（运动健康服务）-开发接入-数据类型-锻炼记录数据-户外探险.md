户外探险相关锻炼记录类型如下：

展开

| **锻炼记录子类型常量** | **描述** | 数据来源 |
| --- | --- | --- |
| [exerciseSequenceHelper.adventures.EXERCISE\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section5729132616547) | 户外探险 | 部分专业手表 |

## 关联的统计数据说明

* 字段定义：[exerciseSequenceHelper.adventures.SummaryFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section373012655417)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| calorie | 热量统计 | [CalorieSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section10820034172215) | M |
| distance | 距离统计 | [DistanceSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1931022758) | M |
| step | 步数统计 | [StepSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1531683122019) | O |
| cadence | 步频统计 | [CadenceSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section517018141201) | O |
| altitude | 海拔统计 | [AltitudeSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section5999164151119) | O |

## 关联的明细数据说明

* 字段定义：[exerciseSequenceHelper.adventures.DetailFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section1073012655420)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| markPoint | 标记点采样详情 | [MarkPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section567919155513)[] | O |
| altitude | 海拔详情 | [Altitude](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section271517115816)[] | O |