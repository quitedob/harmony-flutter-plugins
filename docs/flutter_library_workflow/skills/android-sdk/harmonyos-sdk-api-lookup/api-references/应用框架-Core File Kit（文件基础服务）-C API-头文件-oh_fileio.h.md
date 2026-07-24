## 概述

PhonePC/2in1TabletTVWearable

fileio模块接口定义，提供获取文件存储位置的native接口。

**引用文件：** <filemanagement/fileio/oh\_fileio.h>

**库：** libohfileio.so

**系统能力：** SystemCapability.FileManagement.File.FileIO

**起始版本：** 12

**相关模块：** [FileIO](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-fileio)

## 汇总

PhonePC/2in1TabletTVWearable

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [FileIO\_FileLocation](/consumer/cn/doc/harmonyos-references/capi-oh-fileio-h#fileio_filelocation) | FileIO\_FileLocation | 文件存储位置枚举值。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [FileManagement\_ErrCode OH\_FileIO\_GetFileLocation(char \*uri, int uriLength, FileIO\_FileLocation \*location)](/consumer/cn/doc/harmonyos-references/capi-oh-fileio-h#oh_fileio_getfilelocation) | 获取文件存储位置。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### FileIO\_FileLocation

PhonePC/2in1TabletTVWearable



```
1. enum FileIO_FileLocation
```

**描述**

文件存储位置枚举值。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| LOCAL = 1 | 文件存储于本地。 |
| CLOUD = 2 | 文件存储于云侧。 |
| LOCAL\_AND\_CLOUD = 3 | 文件存储于本地及云侧。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_FileIO\_GetFileLocation()

PhonePC/2in1TabletTVWearable



```
1. FileManagement_ErrCode OH_FileIO_GetFileLocation(char *uri, int uriLength, FileIO_FileLocation *location)
```

**描述**

获取文件存储位置。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| char \*uri | 指向入参uri的指针。 |
| int uriLength | 入参uri字符串的长度。 |
| [FileIO\_FileLocation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-fileio-h#fileio_filelocation) \*location | 输出文件存储位置的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [FileManagement\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-error-code-h#filemanagement_errcode) | 返回FileManagement模块错误码[FileManagement\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-error-code-h#filemanagement_errcode)。 |