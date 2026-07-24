

```
1. typedef struct {...} Rdb_KeyInfo
```

## 概述

PhonePC/2in1TabletTVWearable

描述发生变化的行的主键或者行号。

**起始版本：** 11

**相关模块：** [RDB](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb)

**所在头文件：** [relational\_store.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| int count | 表示发生变化的主键或者行号的数量。 |
| int type | 表示主键的类型[OH\_ColumnType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-data-value-h#oh_columntype)。 |
| [Rdb\_KeyData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-keydata)\* data | 存放变化的具体数据 |