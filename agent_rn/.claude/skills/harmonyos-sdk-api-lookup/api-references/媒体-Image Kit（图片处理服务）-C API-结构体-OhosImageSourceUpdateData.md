

```
1. struct OhosImageSourceUpdateData {...}
```

## 概述

PhonePC/2in1TabletTVWearable

定义图像源更新数据选项，由[OH\_ImageSource\_UpdateData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-mdk-h#oh_imagesource_updatedata)获取。

**起始版本：** 10

**相关模块：** [Image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image)

**所在头文件：** [image\_source\_mdk.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-source-mdk-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| uint8\_t\* buffer = nullptr | 图像源更新数据缓冲区。 |
| size\_t bufferSize = 0 | 图像源更新数据缓冲区大小。 |
| uint32\_t offset = 0 | 图像源更新数据缓冲区的开端。 |
| uint32\_t updateLength = 0 | 图像源更新数据缓冲区的更新数据长度。 |
| int8\_t isCompleted = 0 | 图像源更新数据在此节中完成。 |