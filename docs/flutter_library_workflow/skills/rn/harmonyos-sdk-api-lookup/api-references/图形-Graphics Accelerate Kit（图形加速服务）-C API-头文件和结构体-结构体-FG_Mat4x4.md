## 概述

PhoneTabletTV

此结构体描述列主序4x4矩阵。列主序是指在连续的线性内存地址中，优先按列遍历矩阵元素。

**起始版本：** 5.0.0(12)

**相关模块：** [GraphicsAccelerate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate)

**所在头文件：** [frame\_generation\_base.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/frame__generation__base_8h)

## 汇总

PhoneTabletTV

### 成员变量

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| float [data](/consumer/cn/doc/harmonyos-references/_f_g___mat4x4#data) [16U] | 4x4列主序矩阵元素值组成的一维数组：  | a11 a12 a13 a14 |  | a21 a22 a23 a24 |  | a31 a32 a33 a34 |  | a41 a42 a43 a44 |  data[16] = {a11, a21, a31, a41, a12, a22, a32, a42, a13, a23, a33, a43, a14, a24, a34, a44} |

## 结构体成员变量说明

PhoneTabletTV

### data

PhoneTabletTV



```
1. float FG_Mat4x4::data[16U]
```

**描述**

4x4列主序矩阵元素值组成的一维数组：



```
1. | a11 a12 a13 a14 |
2. A  = | a21 a22 a23 a24 |
3. | a31 a32 a33 a34 |
4. | a41 a42 a43 a44 |
5. data[16] = {a11, a21, a31, a41, a12, a22, a32, a42, a13, a23, a33, a43, a14, a24, a34, a44}
```