## 概述

PhonePC/2in1Tablet

提供与检索结果相关的接口。

**引用文件：** #include "dataaugmentation/retrieval/aip\_retrieval\_record.h"

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
| typedef struct [OH\_Retrieval\_Record](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_record) [OH\_Retrieval\_Record](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_record) | 定义检索结果，包含检索知识库得到的字段和字段取值。 |
| typedef struct [OH\_Retrieval\_RecordItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_recorditem) [OH\_Retrieval\_RecordItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_recorditem) | 定义检索结果中的数据库bucket数组。 |

### 函数

展开

| 名称 | 描述 |
| --- | --- |
| int [OH\_Retrieval\_DestroyRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_destroyrecord) ([OH\_Retrieval\_Record](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_record) \*record) | 销毁通过检索接口[OH\_Retrieval\_Retrieve](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_retrieve)获得的检索结果。 |
| int [OH\_Retrieval\_GetRecordLength](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_getrecordlength) (const [OH\_Retrieval\_Record](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_record) \*record, uint32\_t \*length) | 获取检索结果[OH\_Retrieval\_Record](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_record)中的数据库bucket数组长度。 |
| int [OH\_Retrieval\_GetRecordItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_getrecorditem) (const [OH\_Retrieval\_Record](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_record) \*record, uint32\_t index, const [OH\_Retrieval\_RecordItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_recorditem) \*\*item) | 获取检索结果[OH\_Retrieval\_Record](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_record)中的数据库bucket数组。 |
| int [OH\_Retrieval\_GetItemSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_getitemsize) (const [OH\_Retrieval\_RecordItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_recorditem) \*items, const char \*fieldName, size\_t \*size) | 获取数据库bucket数组[OH\_Retrieval\_RecordItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_recorditem)中指定字段的值的size。size值包含结束符。 |
| int [OH\_Retrieval\_GetItemText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_getitemtext) (const [OH\_Retrieval\_RecordItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_recorditem) \*items, const char \*fieldName, char \*value, size\_t size) | 获取数据库bucket数组[OH\_Retrieval\_RecordItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-retrieval#oh_retrieval_recorditem)中指定字段的值。 |