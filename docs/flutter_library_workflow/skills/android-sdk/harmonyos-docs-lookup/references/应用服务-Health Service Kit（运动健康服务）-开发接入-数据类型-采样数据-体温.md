## 体温

此数据记录用户在一小段时间内的体温数据。

Harmony SDK类型常量：[samplePointHelper.bodyTemperature.DATA\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-samplepointhelper#section8499929111914)

### OAuth权限

联盟卡片申请的权限名称：健康数据 > 体温数据

### 采样明细数据

**明细字段说明**

* 字段定义：[samplePointHelper.bodyTemperature.Fields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-samplepointhelper#section125001429171917)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 | 单位 | 取值范围 |
| --- | --- | --- | --- | --- | --- |
| bodyTemperature | 体温 | number | M | 摄氏度 | [34, 42] |

**数据开放说明**

展开

| 开放API | 查询及时性 | 数据源 |
| --- | --- | --- |
| [healthStore.readData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section193411928192218) | 分钟级 | 部分手表支持 |

### 采样统计数据

**聚合统计策略说明**

字段定义：[samplePointHelper.bodyTemperature.AggregateFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-samplepointhelper#section170613199291)

展开

| **字段**列表 | 描述 | 聚合策略 | **类型** | 单位 |
| --- | --- | --- | --- | --- |
| bodyTemperature | 体温 | avg | max | min | count | number | 摄氏度 |

**数据开放说明**

展开

| 开放API | 查询及时性 | 数据源 |
| --- | --- | --- |
| [healthStore.aggregateData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section4878142184216) | 分钟级 | 部分手表支持 |

## 皮肤体温

此数据记录用户在一小段时间内的皮肤温度数据。

* Harmony SDK类型常量：[samplePointHelper.skinTemperature.DATA\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-samplepointhelper#section88802164482)

### OAuth权限

联盟卡片申请的权限名称：健康数据 > 体温数据

### 采样明细数据

**明细字段说明**

* 字段定义：[samplePointHelper.skinTemperature.Fields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-samplepointhelper#section1188171616489)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 | 单位 | 取值范围 |
| --- | --- | --- | --- | --- | --- |
| skinTemperature | 皮肤温度 | number | M | 摄氏度 | [20, 42] |

**数据开放说明**

展开

| 开放API | 查询及时性 | 数据源 |
| --- | --- | --- |
| [healthStore.readData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section193411928192218) | 分钟级 | 部分手表支持 |

### 采样统计数据

**聚合统计策略说明**

字段定义：[samplePointHelper.skinTemperature.AggregateFields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-samplepointhelper#section088331611483)

展开

| **字段**列表 | 描述 | 聚合策略 | **类型** | 单位 |
| --- | --- | --- | --- | --- |
| skinTemperature | 皮肤温度 | avg | max | min | count | number | 摄氏度 |

**数据开放说明**

展开

| 开放API | 查询及时性 | 数据源 |
| --- | --- | --- |
| [healthStore.aggregateData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section4878142184216) | 分钟级 | 部分手表支持 |