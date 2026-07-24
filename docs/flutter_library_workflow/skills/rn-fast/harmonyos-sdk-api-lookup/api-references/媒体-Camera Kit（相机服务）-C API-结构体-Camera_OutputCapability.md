

```
1. typedef struct Camera_OutputCapability {...} Camera_OutputCapability
```

## 概述

PhonePC/2in1TabletTVWearable

相机输出能力。

**起始版本：** 11

**相关模块：** [OH\_Camera](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera)

**所在头文件：** [camera.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [Camera\_Profile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-profile)\*\* previewProfiles | 预览配置文件列表。 |
| uint32\_t previewProfilesSize | 预览配置文件列表的大小。 |
| [Camera\_Profile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-profile)\*\* photoProfiles | 拍照配置文件列表。  配置文件中的size设置的是相机分辨率宽高，非实际出图宽高。 |
| uint32\_t photoProfilesSize | 拍照配置文件列表的大小。 |
| [Camera\_VideoProfile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-videoprofile)\*\* videoProfiles | 录像配置文件列表。 |
| uint32\_t videoProfilesSize | 录像配置文件列表的大小。 |
| [Camera\_MetadataObjectType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_metadataobjecttype)\*\* supportedMetadataObjectTypes | 元数据对象类型列表。 |
| uint32\_t metadataProfilesSize | 元数据对象类型列表的大小。 |