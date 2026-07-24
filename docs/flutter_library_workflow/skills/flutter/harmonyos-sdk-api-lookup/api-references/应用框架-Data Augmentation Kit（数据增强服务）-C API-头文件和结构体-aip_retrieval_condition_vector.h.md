## 概述

PhonePC/2in1Tablet

提供与向量条件相关的接口。

**引用文件：** #include "dataaugmentation/retrieval/aip\_retrieval\_condition\_vector.h"

**库：** libretrieval\_ndk.so

**系统能力：** SystemCapability.DataAugmentation.Retrieval

**起始版本：** 6.0.0(20)

**相关模块：** [Retrieval](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval)

## 汇总

PhonePC/2in1Tablet

### 类型定义

展开

| 名称 | 描述 |
| --- | --- |
| typedef struct [OH\_Retrieval\_SubCondition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_subcondition) [OH\_Retrieval\_VectorCondition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_vectorcondition) | 定义向量检索条件，包含检索的字段、检索参数、过滤条件等。 |

### 函数

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_Retrieval\_VectorCondition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_vectorcondition) \* [OH\_Retrieval\_CreateVectorCondition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_createvectorcondition) () | 创建向量检索条件。 |
| int [OH\_Retrieval\_DestroyVectorCondition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_destroyvectorcondition) ([OH\_Retrieval\_VectorCondition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_vectorcondition) \*condition) | 销毁通过[OH\_Retrieval\_CreateVectorCondition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_createvectorcondition)获得的检索条件。 |
| int [OH\_Retrieval\_SetVectorRecallLimit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_setvectorrecalllimit) ([OH\_Retrieval\_VectorCondition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_vectorcondition) \*condition, uint32\_t limit) | 在检索条件中，设置向量检索结果数量上限。 |
| int [OH\_Retrieval\_SetSimilarityThreshold](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_setsimilaritythreshold) ([OH\_Retrieval\_VectorCondition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_vectorcondition) \*condition, double threshold) | 在检索条件中，设置向量检索的相似度阈值。 |