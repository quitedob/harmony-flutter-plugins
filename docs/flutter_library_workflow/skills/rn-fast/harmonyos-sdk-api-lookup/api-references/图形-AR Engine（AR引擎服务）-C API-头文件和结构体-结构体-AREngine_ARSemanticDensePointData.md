## 概述

PhoneTabletTV

高精几何重建对象的稠密点云数据。

作为[HMS\_AREngine\_ARSemanticDense\_AcquirePointData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#hms_arengine_arsemanticdense_acquirepointdata)接口输入。

**起始版本：** 6.0.0(20)

**相关模块：** [AR Engine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine)

**所在头文件：** [ar\_engine\_core.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-header-file)

## 汇总

PhoneTabletTV

### 成员变量

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t [id](/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensepointdata#id) | 当前点的ID。 |
| float [x](/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensepointdata#x) | 当前点的X坐标。 |
| float [y](/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensepointdata#y) | 当前点的Y坐标。 |
| float [z](/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensepointdata#z) | 当前点的Z坐标。 |
| int32\_t [r](/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensepointdata#r) | 当前点的颜色，RGBA表示，这里是R的值。 |
| int32\_t [g](/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensepointdata#g) | 当前点的颜色，RGBA表示，这里是G的值。 |
| int32\_t [b](/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensepointdata#b) | 当前点的颜色，RGBA表示，这里是B的值。 |
| int32\_t [a](/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensepointdata#a) | 当前点的颜色，RGBA表示，这里是A的值。 |
| float [confidence](/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensepointdata#confidence) | 当前点的置信度。 |

## 结构体成员变量说明

PhoneTabletTV

### id

PhoneTabletTV



```
1. int32_t AREngine_ARSemanticDensePointData::id
```

**描述**

当前点的ID。

### x

PhoneTabletTV



```
1. float AREngine_ARSemanticDensePointData::x
```

**描述**

当前点的X坐标。

### y

PhoneTabletTV



```
1. float AREngine_ARSemanticDensePointData::y
```

**描述**

当前点的Y坐标。

### z

PhoneTabletTV



```
1. float AREngine_ARSemanticDensePointData::z
```

**描述**

当前点的Z坐标。

### r

PhoneTabletTV



```
1. int32_t AREngine_ARSemanticDensePointData::r
```

**描述**

当前点的颜色，RGBA表示，这里是R的值。

### g

PhoneTabletTV



```
1. int32_t AREngine_ARSemanticDensePointData::g
```

**描述**

当前点的颜色，RGBA表示，这里是G的值。

### b

PhoneTabletTV



```
1. int32_t AREngine_ARSemanticDensePointData::b
```

**描述**

当前点的颜色，RGBA表示，这里是B的值。

### a

PhoneTabletTV



```
1. int32_t AREngine_ARSemanticDensePointData::a
```

**描述**

当前点的颜色，RGBA表示，这里是A的值。

### confidence

PhoneTabletTV



```
1. float AREngine_ARSemanticDensePointData::confidence
```

**描述**

当前点的置信度。