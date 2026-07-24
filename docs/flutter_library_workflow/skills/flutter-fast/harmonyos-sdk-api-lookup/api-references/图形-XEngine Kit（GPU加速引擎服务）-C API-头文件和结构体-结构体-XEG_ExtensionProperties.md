## 概述

PhonePC/2in1TabletTV

此结构体描述通过[HMS\_XEG\_EnumerateDeviceExtensionProperties](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#hms_xeg_enumeratedeviceextensionproperties)接口查询到的XEngine扩展特性集合。

**起始版本：** 5.0.0(12)

**相关模块：** [XEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine)

**所在头文件：** [xeg\_vulkan\_extension.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-vulkan-extension-8h)

## 汇总

PhonePC/2in1TabletTV

### 成员变量

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| char [extensionName](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-extensionproperties#extensionname) [[XEG\_MAX\_EXTENSION\_NAME\_SIZE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine#xeg_max_extension_name_size)] | XEngine支持的扩展特性名称。 |
| uint32\_t [version](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-extensionproperties#version) | XEngine支持的扩展特性版本号。 |

## 结构体成员变量说明

PhonePC/2in1TabletTV

### extensionName

PhonePC/2in1TabletTV



```
1. char XEG_ExtensionProperties::extensionName[XEG_MAX_EXTENSION_NAME_SIZE]
```

**描述**

XEngine支持的扩展特性名称。

### version

PhonePC/2in1TabletTV



```
1. uint32_t XEG_ExtensionProperties::version
```

**描述**

XEngine支持的扩展特性版本号。