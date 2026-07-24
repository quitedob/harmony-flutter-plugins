## 概述

PhoneTabletTV

高精几何重建对象的立方体数据。

作为[HMS\_AREngine\_ARSemanticDense\_AcquireCubeData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#hms_arengine_arsemanticdense_acquirecubedata)接口输入。

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
| int32\_t [id](/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensecubedata#id) | 当前立方体的ID。 |
| int32\_t [vertexSize](/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensecubedata#vertexsize) | 当前立方体的顶点大小。 |
| float\* [vertexData](/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensecubedata#vertexdata) | 当前立方体的顶点数据。  对应立方体的8个顶点。索引从立方体后表面开始，按逆时针方向排列。 |
| float [confidence](/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensecubedata#confidence) | 当前立方体的置信度。 |
| AREngine\_ARSemanticPlaneLabel [label](/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensecubedata#label) | 当前立方体的语义标签。  参见[AREngine\_ARSemanticPlaneLabel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#arengine_arsemanticplanelabel)。 |

## 结构体成员变量说明

PhoneTabletTV

### id

PhoneTabletTV



```
1. int32_t AREngine_ARSemanticDenseCubeData::id
```

**描述**

当前立方体的ID。

### vertexSize

PhoneTabletTV



```
1. int32_t AREngine_ARSemanticDenseCubeData::vertexSize
```

**描述**

当前立方体的顶点大小。

### vertexData

PhoneTabletTV



```
1. float* AREngine_ARSemanticDenseCubeData::vertexData
```

**描述**

当前立方体的顶点数据。

### confidence

PhoneTabletTV



```
1. float AREngine_ARSemanticDenseCubeData::confidence
```

**描述**

当前立方体的置信度。

### label

PhoneTabletTV



```
1. AREngine_ARSemanticPlaneLabel AREngine_ARSemanticDenseCubeData::label
```

**描述**

当前立方体的语义标签。