## 概述

PhoneTabletTV

此结构体描述游戏应用每帧的相机运动数据，ABR会结合相机运动数据自适应调整FrameBuffer（帧缓冲，下文简称Buffer）分辨率因子。

**起始版本：** 5.0.0(12)

**相关模块：** [GraphicsAccelerate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate)

**所在头文件：** [abr\_base.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/abr__base_8h)

## 汇总

PhoneTabletTV

### 成员变量

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [ABR\_Vector3](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_a_b_r___vector3) [rotation](/consumer/cn/doc/harmonyos-references/_a_b_r___camera_data#rotation) | 相机变换的世界空间旋转欧拉角。取值范围：[0, 360]，（单位：deg），参数不在范围内会返回ABR\_INVALID\_PARAMETER错误码。 |
| [ABR\_Vector3](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_a_b_r___vector3) [position](/consumer/cn/doc/harmonyos-references/_a_b_r___camera_data#position) | 相机变换的世界空间位移。 |

## 结构体成员变量说明

PhoneTabletTV

### position

PhoneTabletTV



```
1. ABR_Vector3 ABR_CameraData::position
```

**描述**

相机变换的世界空间位移。

### rotation

PhoneTabletTV



```
1. ABR_Vector3 ABR_CameraData::rotation
```

**描述**

相机变换的世界空间旋转欧拉角。取值范围：[0, 360]，（单位：deg），参数不在范围内会返回ABR\_INVALID\_PARAMETER错误码。