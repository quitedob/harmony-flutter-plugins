## 概述

PhonePC/2in1TabletTVWearable

表示关系型数据库（RDB）的谓词。

**引用文件：** <database/rdb/oh\_predicates.h>

**库：** libnative\_rdb\_ndk.z.so

**系统能力：** SystemCapability.DistributedDataManager.RelationalStore.Core

**起始版本：** 10

**相关模块：** [RDB](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) | OH\_Predicates | 表示谓词。 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_OrderType](/consumer/cn/doc/harmonyos-references/capi-oh-predicates-h#oh_ordertype) | OH\_OrderType | 排序方式。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [int OH\_Predicates\_NotLike(OH\_Predicates \*predicates, const char \*field, const char \*pattern)](/consumer/cn/doc/harmonyos-references/capi-oh-predicates-h#oh_predicates_notlike) | 设置OH\_Predicates以匹配数据类型为字符串且值不类似于指定值的字段。  此方法类似于SQL语句中的“Not like”。 |
| [int OH\_Predicates\_Glob(OH\_Predicates \*predicates, const char \*field, const char \*pattern)](/consumer/cn/doc/harmonyos-references/capi-oh-predicates-h#oh_predicates_glob) | 设置OH\_Predicates以匹配指定字段（数据类型为字符串）且值包含通配符的字段。  与like方法不同，此方法的输入参数区分大小写。 |
| [int OH\_Predicates\_NotGlob(OH\_Predicates \*predicates, const char \*field, const char \*pattern)](/consumer/cn/doc/harmonyos-references/capi-oh-predicates-h#oh_predicates_notglob) | 设置OH\_Predicates以不匹配指定字段（数据类型为字符串）且值包含通配符的字段。  与Not Like方法不同，此方法的输入参数区分大小写。 |
| [int OH\_Predicates\_Having(OH\_Predicates \*predicates, const char \*conditions, const OH\_Data\_Values \*values)](/consumer/cn/doc/harmonyos-references/capi-oh-predicates-h#oh_predicates_having) | 设置OH\_Predicates以指定条件来过滤分组结果，这些结果将出现在最终结果中。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### OH\_OrderType

PhonePC/2in1TabletTVWearable



```
1. enum OH_OrderType
```

**描述**

排序方式。

**起始版本：** 10

展开

| 枚举项 | 描述 |
| --- | --- |
| ASC = 0 | 升序排列。 |
| DESC = 1 | 降序排列。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_Predicates\_NotLike()

PhonePC/2in1TabletTVWearable



```
1. int OH_Predicates_NotLike(OH_Predicates *predicates, const char *field, const char *pattern)
```

**描述**

设置OH\_Predicates以匹配数据类型为字符串且值不类似于指定值的字段。

此方法类似于SQL语句中的“Not like”。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) \*predicates | 表示指向[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例的指针。 |
| const char \*field | 表示数据库表中的列名。 |
| const char \*pattern | 表示谓词不匹配的模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  如果执行成功，返回RDB\_OK。  如果输入参数无效，返回RDB\_E\_INVALID\_ARGS。 |

### OH\_Predicates\_Glob()

PhonePC/2in1TabletTVWearable



```
1. int OH_Predicates_Glob(OH_Predicates *predicates, const char *field, const char *pattern)
```

**描述**

设置OH\_Predicates以匹配指定字段（数据类型为字符串）且值包含通配符的字段。

与like方法不同，此方法的输入参数区分大小写。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) \*predicates | 表示指向[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例的指针。 |
| const char \*field | 表示数据库表中的列名。 |
| const char \*pattern | 表示谓词匹配的样式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  如果执行成功，返回RDB\_OK。  如果输入参数无效，返回RDB\_E\_INVALID\_ARGS。 |

### OH\_Predicates\_NotGlob()

PhonePC/2in1TabletTVWearable



```
1. int OH_Predicates_NotGlob(OH_Predicates *predicates, const char *field, const char *pattern)
```

**描述**

设置OH\_Predicates以不匹配指定字段（数据类型为字符串）且值包含通配符的字段。

与Not Like方法不同，此方法的输入参数区分大小写。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) \*predicates | 表示指向[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例的指针。 |
| const char \*field | 表示数据库表中的列名。 |
| const char \*pattern | 表示谓词不匹配的样式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  如果执行成功，返回RDB\_OK。  如果输入参数无效，返回RDB\_E\_INVALID\_ARGS。 |

### OH\_Predicates\_Having()

PhonePC/2in1TabletTVWearable



```
1. int OH_Predicates_Having(OH_Predicates *predicates, const char *conditions, const OH_Data_Values *values)
```

**描述**

设置OH\_Predicates以指定条件来过滤分组结果，这些结果将出现在最终结果中。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) \*predicates | 表示指向[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例的指针。 |
| const char \*conditions | 表示having子句中的过滤条件。 |
| const [OH\_Data\_Values](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-data-values) \*values | 表示指向[OH\_Data\_Values](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-data-values)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回错误码。  如果执行成功，返回RDB\_OK。  如果输入参数无效，返回RDB\_E\_INVALID\_ARGS。 |