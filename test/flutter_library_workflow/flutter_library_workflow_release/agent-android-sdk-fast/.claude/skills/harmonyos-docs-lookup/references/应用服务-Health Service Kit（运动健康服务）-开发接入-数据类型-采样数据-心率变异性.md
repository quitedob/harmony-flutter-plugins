此数据记录用户在某时刻的心率变异性数据。

Harmony SDK类型常量：[samplePointHelper.heartRateVariability.DATA\_TYPE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-samplepointhelper#section62317226815)

## OAuth权限

联盟卡片申请的权限名称：健康数据 > 心率数据

## 采样明细数据

### 明细字段说明

字段定义：[samplePointHelper.heartRateVariability.Fields](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-samplepointhelper#section132322221288)

展开

| **字段**列表 | 描述 | **类型** | 可选/必选 | 单位 | 取值范围 |
| --- | --- | --- | --- | --- | --- |
| heartRateVariabilityRMSSD | 心率变异性 | number | M | 毫秒 | (0, 200] |

### 数据开放说明

展开

| 开放API | 查询及时性 | 数据源 |
| --- | --- | --- |
| [healthStore.readData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section193411928192218) | 小时级 | 手表、手环等 |