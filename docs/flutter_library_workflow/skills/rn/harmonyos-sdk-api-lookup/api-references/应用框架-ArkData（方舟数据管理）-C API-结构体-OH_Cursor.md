

```
1. typedef struct {...} OH_Cursor
```

## 概述

PhonePC/2in1TabletTVWearable

表示结果集。提供通过查询数据库生成的数据库结果集的访问方法。

**起始版本：** 10

**相关模块：** [RDB](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb)

**所在头文件：** [oh\_cursor.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-cursor-h)

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| int64\_t id | OH\_Cursor结构体的唯一标识符。 |

### 成员函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [int (\*getColumnCount)(OH\_Cursor \*cursor, int \*count)](/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor#getcolumncount) | 函数指针，获取结果集中的列数。 |
| [int (\*getColumnType)(OH\_Cursor \*cursor, int32\_t columnIndex, OH\_ColumnType \*columnType)](/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor#getcolumntype) | 函数指针，根据指定的列索引获取列类型。 |
| [int (\*getColumnIndex)(OH\_Cursor \*cursor, const char \*name, int \*columnIndex)](/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor#getcolumnindex) | 函数指针，根据指定的列名获取列索引。 |
| [int (\*getColumnName)(OH\_Cursor \*cursor, int32\_t columnIndex, char \*name, int length)](/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor#getcolumnname) | 函数指针，根据指定的列索引获取列名。 |
| [int (\*getRowCount)(OH\_Cursor \*cursor, int \*count)](/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor#getrowcount) | 函数指针，获取结果集中的行数。 |
| [int (\*goToNextRow)(OH\_Cursor \*cursor)](/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor#gotonextrow) | 函数指针，转到结果集的下一行。 |
| [int (\*getSize)(OH\_Cursor \*cursor, int32\_t columnIndex, size\_t \*size)](/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor#getsize) | 函数指针，当结果集中列的数据类型是BLOB或者TEXT时，获取其值所需的内存。 |
| [int (\*getText)(OH\_Cursor \*cursor, int32\_t columnIndex, char \*value, int length)](/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor#gettext) | 函数指针，以字符串形式获取当前行中指定列的值。 |
| [int (\*getInt64)(OH\_Cursor \*cursor, int32\_t columnIndex, int64\_t \*value)](/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor#getint64) | 函数指针，以int64\_t形式获取当前行中指定列的值。 |
| [int (\*getReal)(OH\_Cursor \*cursor, int32\_t columnIndex, double \*value)](/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor#getreal) | 函数指针，以double形式获取当前行中指定列的值。 |
| [int (\*getBlob)(OH\_Cursor \*cursor, int32\_t columnIndex, unsigned char \*value, int length)](/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor#getblob) | 函数指针，以字节数组的形式获取当前行中指定列的值。 |
| [int (\*isNull)(OH\_Cursor \*cursor, int32\_t columnIndex, bool \*isNull)](/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor#isnull) | 函数指针，检查当前行中指定列的值是否为null。 |
| [int (\*destroy)(OH\_Cursor \*cursor)](/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor#destroy) | 函数指针，关闭结果集。 |
| [int (\*getAsset)(OH\_Cursor \*cursor, int32\_t columnIndex, Data\_Asset \*value)](/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor#getasset) | 函数指针，以资产的形式获取当前行中指定列的值。 |
| [int (\*getAssets)(OH\_Cursor \*cursor, int32\_t columnIndex, Data\_Asset \*\*value, uint32\_t \*length)](/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor#getassets) | 函数指针，以资产数组的形式获取当前行中指定列的值。 |

## 成员函数说明

PhonePC/2in1TabletTVWearable

### getColumnCount()

PhonePC/2in1TabletTVWearable



```
1. int (*getColumnCount)(OH_Cursor *cursor, int *count)
```

**描述**

函数指针，获取结果集中的列数。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Cursor \*cursor | 表示指向OH\_Cursor实例的指针 |
| int \*count | 该参数是输出参数，结果集中的列数会写入该变量 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。 |

### getColumnType()

PhonePC/2in1TabletTVWearable



```
1. int (*getColumnType)(OH_Cursor *cursor, int32_t columnIndex, OH_ColumnType *columnType)
```

**描述**

函数指针，根据指定的列索引获取列类型。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Cursor \*cursor | 表示指向OH\_Cursor实例的指针 |
| int32\_t columnIndex | 表示结果集中指定列的索引，索引值从0开始。 |
| [OH\_ColumnType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-data-value-h#oh_columntype) \*columnType | 该参数是输出参数，结果集中指定列的数据类型[OH\_ColumnType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-data-value-h#oh_columntype)会写入该变量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。 |

### getColumnIndex()

PhonePC/2in1TabletTVWearable



```
1. int (*getColumnIndex)(OH_Cursor *cursor, const char *name, int *columnIndex)
```

**描述**

函数指针，根据指定的列名获取列索引。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Cursor \*cursor | 表示指向OH\_Cursor实例的指针 |
| const char \*name | 表示结果集中指定列的名称。 |
| int \*columnIndex | 该参数是输出参数，结果集中指定列的索引会写入该变量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。 |

### getColumnName()

PhonePC/2in1TabletTVWearable



```
1. int (*getColumnName)(OH_Cursor *cursor, int32_t columnIndex, char *name, int length)
```

**描述**

函数指针，根据指定的列索引获取列名。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Cursor \*cursor | 表示指向OH\_Cursor实例的指针 |
| int32\_t columnIndex | 表示结果集中指定列的索引，索引值从0开始。 |
| char \*name | 该参数是输出参数，结果集中指定列的名称会写入该变量。 |
| int length | 该参数为输入参数，表示开发者传入的包括终止符在内的列名字符串的总长度。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。 |

### getRowCount()

PhonePC/2in1TabletTVWearable



```
1. int (*getRowCount)(OH_Cursor *cursor, int *count)
```

**描述**

函数指针，获取结果集中的行数。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Cursor \*cursor | 表示指向OH\_Cursor实例的指针 |
| int \*count | 该参数是输出参数，结果集中的列数会写入该变量 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。 |

### goToNextRow()

PhonePC/2in1TabletTVWearable



```
1. int (*goToNextRow)(OH_Cursor *cursor)
```

**描述**

函数指针，转到结果集的下一行。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Cursor \*cursor | 表示指向OH\_Cursor实例的指针 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。 |

### getSize()

PhonePC/2in1TabletTVWearable



```
1. int (*getSize)(OH_Cursor *cursor, int32_t columnIndex, size_t *size)
```

**描述**

函数指针，当结果集中列的数据类型是BLOB或者TEXT时，获取其值所需的内存。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Cursor \*cursor | 表示指向OH\_Cursor实例的指针。 |
| int32\_t columnIndex | 表示结果集中指定列的索引，索引值从0开始。 |
| size\_t \*size | 该参数是输出参数，BLOB或者TEXT数据所需内存大小会写入该变量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。 |

### getText()

PhonePC/2in1TabletTVWearable



```
1. int (*getText)(OH_Cursor *cursor, int32_t columnIndex, char *value, int length)
```

**描述**

函数指针，以字符串形式获取当前行中指定列的值。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Cursor \*cursor | 表示指向OH\_Cursor实例的指针 |
| int32\_t columnIndex | 该表示结果集中指定列的索引，索引值从0开始。 |
| char \*value | 该参数是输出参数，结果集中指定列的值会以字符串形式写入该变量。 |
| int length | 该参数是输入参数，表示value的长度，该值可通过getSize获取。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。 |

### getInt64()

PhonePC/2in1TabletTVWearable



```
1. int (*getInt64)(OH_Cursor *cursor, int32_t columnIndex, int64_t *value)
```

**描述**

函数指针，以int64\_t形式获取当前行中指定列的值。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Cursor \*cursor | 表示指向OH\_Cursor实例的指针 |
| int32\_t columnIndex | 表示结果集中指定列的索引，索引值从0开始。 |
| int64\_t \*value | 该参数是输出参数，结果集中指定列的值会以int64\_t形式写入该变量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。 |

### getReal()

PhonePC/2in1TabletTVWearable



```
1. int (*getReal)(OH_Cursor *cursor, int32_t columnIndex, double *value)
```

**描述**

函数指针，以double形式获取当前行中指定列的值。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Cursor \*cursor | 表示指向OH\_Cursor实例的指针 |
| int32\_t columnIndex | 表示结果集中指定列的索引，索引值从0开始。 |
| double \*value | 该参数是输出参数，结果集中指定列的值会以double形式写入该变量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。 |

### getBlob()

PhonePC/2in1TabletTVWearable



```
1. int (*getBlob)(OH_Cursor *cursor, int32_t columnIndex, unsigned char *value, int length)
```

**描述**

函数指针，以字节数组的形式获取当前行中指定列的值。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Cursor \*cursor | 表示指向OH\_Cursor实例的指针 |
| int32\_t columnIndex | 表示结果集中指定列的索引，索引值从0开始。 |
| unsigned char \*value | 该参数是输出参数，结果集中指定列的值会以字节数组形式写入该变量。 |
| int length | 该参数为输入参数，表示传入的value的长度，该值可通过getSize获取。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。 |

### isNull()

PhonePC/2in1TabletTVWearable



```
1. int (*isNull)(OH_Cursor *cursor, int32_t columnIndex, bool *isNull)
```

**描述**

函数指针，检查当前行中指定列的值是否为null。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Cursor \*cursor | 表示指向OH\_Cursor实例的指针 |
| int32\_t columnIndex | 表示结果集中指定列的索引，索引值从0开始。 |
| bool \*isNull | 该参数是输出参数，如果当前行中指定列的值为null，该值为true，否则为false。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。 |

### destroy()

PhonePC/2in1TabletTVWearable



```
1. int (*destroy)(OH_Cursor *cursor)
```

**描述**

函数指针，关闭结果集。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Cursor \*cursor | 表示指向OH\_Cursor实例的指针 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。 |

### getAsset()

PhonePC/2in1TabletTVWearable



```
1. int (*getAsset)(OH_Cursor *cursor, int32_t columnIndex, Data_Asset *value)
```

**描述**

函数指针，以资产的形式获取当前行中指定列的值。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Cursor \*cursor | 表示指向OH\_Cursor实例的指针 |
| int32\_t columnIndex | 表示结果集中指定列的索引，索引值从0开始。 |
| Data\_Asset \*value | 该参数是输出参数，结果集中指定列的值会以资产形式写入该变量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。 |

### getAssets()

PhonePC/2in1TabletTVWearable



```
1. int (*getAssets)(OH_Cursor *cursor, int32_t columnIndex, Data_Asset **value, uint32_t *length)
```

**描述**

函数指针，以资产数组的形式获取当前行中指定列的值。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_Cursor \*cursor | 表示指向OH\_Cursor实例的指针 |
| int32\_t columnIndex | 表示结果集中指定列的索引，索引值从0开始。 |
| Data\_Asset \*\*value | 该参数是输出参数，结果集中指定列的值会以资产数组形式写入该变量。 |
| uint32\_t \*length | 既是入参又是出参：作为入参，需要开发者传入一个uint32\_t类型的变量，表示输入缓冲区的大小；作为出参，表示函数执行后，length指向的变量会被更新为实际返回的资产数组的长度。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。 |