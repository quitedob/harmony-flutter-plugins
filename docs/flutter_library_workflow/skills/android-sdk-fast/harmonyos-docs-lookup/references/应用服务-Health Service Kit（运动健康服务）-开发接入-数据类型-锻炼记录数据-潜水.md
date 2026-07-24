## 自由潜水

### 自由潜水相关锻炼记录类型如下：

展开

| **锻炼记录子类型常量** | **描述** | 数据来源 |
| --- | --- | --- |
| [exerciseSequenceHelper.diving.EXERCISE\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section593010118815) | 自由潜水 | 部分专业手表 |

### 自由潜水关联的统计数据说明

* 字段定义：[exerciseSequenceHelper.diving.SummaryFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section99311911381)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| divingFeature | 自由潜水特征数据 | [DivingFeature](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section141695571417) | M |
| location | 位置统计 | [LocationSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section20701154013341) | O |
| divingDepth | 潜水深度统计 | [DivingDepthSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section10170184225917) | O |
| waterTemperature | 水温统计 | [WaterTemperatureSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section16704161419471) | O |

### 自由潜水关联的明细数据说明

* 字段定义：[exerciseSequenceHelper.diving.DetailFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section1293271115816)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| divingDepth | 潜水深度详情 | [DivingDepth](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1089615015267)[] | O |
| waterTemperature | 水温详情 | [WaterTemperature](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section8976102914494)[] | O |

## 水肺潜水

### 水肺潜水相关锻炼记录类型如下：

展开

| **锻炼记录子类型常量** | **描述** | 数据来源 |
| --- | --- | --- |
| [exerciseSequenceHelper.scubaDiving.EXERCISE\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section243517395272) | 水肺潜水 | 部分专业手表 |

### 水肺潜水关联的统计数据说明

* 字段定义：[exerciseSequenceHelper.scubaDiving.SummaryFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section7438139112717)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| scubaDivingFeature | 水肺潜水特征数据 | [ScubaDivingFeature](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1968101417267) | M |
| location | 位置统计 | [LocationSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section20701154013341) | O |
| divingDepth | 潜水深度统计 | [DivingDepthSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section10170184225917) | O |
| waterTemperature | 水温统计 | [WaterTemperatureSummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section16704161419471) | O |

### 水肺潜水关联的明细数据说明

* 字段定义：[exerciseSequenceHelper.scubaDiving.DetailFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper#section843963919270)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 |
| --- | --- | --- | --- |
| divingDepth | 潜水深度详情 | [DivingDepth](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section1089615015267)[] | O |
| waterTemperature | 水温详情 | [WaterTemperature](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthfields#section8976102914494)[] | O |