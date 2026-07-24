

```
1. typedef struct FileShare_PolicyInfo {...} FileShare_PolicyInfo
```

## 概述

PhonePC/2in1Tablet

需要授予或使能权限URI的策略信息。

**起始版本：** 12

**相关模块：** [fileShare](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-fileshare)

**所在头文件：** [oh\_file\_share.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-file-share-h)

## 汇总

PhonePC/2in1Tablet

### 成员变量

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| char \*uri | 需要授予或使能权限的URI。 |
| unsigned int length | URI的字节长度。 |
| unsigned int operationMode | 授予或使能权限的URI访问模式。  示例：FileShare\_OperationMode.READ\_MODE 、 FileShare\_OperationMode.WRITE\_MODE  或者 FileShare\_OperationMode.READ\_MODE|FileShare\_OperationMode.WRITE\_MODE。 |