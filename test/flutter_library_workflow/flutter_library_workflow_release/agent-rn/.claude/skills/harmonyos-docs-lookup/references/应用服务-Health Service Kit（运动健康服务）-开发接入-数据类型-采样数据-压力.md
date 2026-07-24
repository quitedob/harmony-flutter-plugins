此数据记录用户在某一刻的压力数据，每一条数据都代表该时刻的压力状态。

* Harmony SDK类型常量：[samplePointHelper.stress.DATA\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-samplepointhelper#section299320372296)

## OAuth权限

联盟卡片申请的权限名称：健康数据 > 压力数据

## 采样明细数据

### 明细字段说明

* 字段定义：[samplePointHelper.stress.Fields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-samplepointhelper#section1599483720293)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 | 单位 | 取值范围 |
| --- | --- | --- | --- | --- | --- |
| stressScore | 压力得分 | number | M | - | [1, 99] |

### 数据开放说明

展开

| 开放API | 查询及时性 | 数据源 |
| --- | --- | --- |
| [healthStore.readData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section193411928192218) | 小时级 | 手表、手环等 |

## 采样统计数据

**聚合统计策略说明**

* 字段定义：[samplePointHelper.stress.AggregateFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-samplepointhelper#section119551246145013)

展开

| **字段**列表 | 描述 | 聚合策略 | **类型** | 单位 |
| --- | --- | --- | --- | --- |
| stressScore | 压力得分 | avg | max | min | last | count | number | - |

### 数据开放说明

展开

| 开放API | 查询及时性 | 数据源 |
| --- | --- | --- |
| [healthStore.aggregateData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section4878142184216) | 小时级 | 手表、手环等 |