

```
1. typedef struct CloudDisk_PathInfo {...} CloudDisk_PathInfo
2. typedef struct CloudDisk_PathInfo CloudDisk_FieldInfo
3. typedef struct CloudDisk_PathInfo CloudDisk_SyncFolderPath
```

## 概述

PC/2in1Tablet

文件路径信息。

**起始版本：** 21

**相关模块：** [CloudDisk](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-clouddisk)

**所在头文件：** [oh\_cloud\_disk\_manager.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-cloud-disk-manager-h)

## 汇总

PC/2in1Tablet

### 成员变量

PC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| char \*value | 文件的路径，以'\0'字符结尾。 |
| size\_t length | 文件路径的长度，不包括结尾的'\0'字符。 |