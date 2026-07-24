

```
1. typedef struct Rdb_TableDetails {...} Rdb_TableDetails
```

## 概述

PhonePC/2in1TabletTVWearable

描述数据库表执行端云同步任务上传和下载的统计信息。

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
| const char\* table | 数据库表名。 |
| [Rdb\_Statistic](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-statistic) upload | 表示数据库表中端云同步上传过程的统计信息。 |
| [Rdb\_Statistic](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-statistic) download | 表示数据库表中端云同步下载过程的统计信息。 |