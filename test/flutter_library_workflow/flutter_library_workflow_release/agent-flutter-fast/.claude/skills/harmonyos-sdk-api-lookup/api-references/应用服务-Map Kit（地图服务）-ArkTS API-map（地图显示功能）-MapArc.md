## 导入模块

PhonePC/2in1TabletWearable



```
1. import { map, mapCommon } from '@kit.MapKit';
```

## MapArc

PhonePC/2in1TabletWearable

弧线。继承[BaseOverlay](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-baseoverlay)。在调用map.[MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller)类的[addArc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#addarc)方法时会返回该类型的实例。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 5.0.0(12)

**示例：**



```
1. // 设置弧线参数
2. let mapArcParams: mapCommon.MapArcParams = {
3. // 弧线起点坐标
4. startPoint: {
5. latitude: 39.913138,
6. longitude: 116.415112
7. },
8. // 弧线终点坐标
9. endPoint: {
10. latitude: 28.239473,
11. longitude: 112.954094
12. },
13. // 弧线中心点坐标
14. centerPoint: {
15. latitude: 33.86970399048567,
16. longitude: 112.08633528544145
17. },
18. width: 10,
19. color: 0xffff0000,
20. visible: true,
21. zIndex: 100
22. };
23. // 添加弧线
24. let mapArc: map.MapArc = this.mapController.addArc(mapArcParams);
```

### getColor

PhonePC/2in1TabletWearable

getColor(): number

获取弧线的颜色。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 5.0.0(12)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| number | ARGB格式颜色值。 |

**示例：**



```
1. let color: number = mapArc.getColor();
```

### getWidth

PhonePC/2in1TabletWearable

getWidth(): number

获取弧线的宽度。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 5.0.0(12)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| number | 弧线的宽度。单位：px。 |

**示例：**



```
1. let width: number = mapArc.getWidth();
```

### setColor

PhonePC/2in1TabletWearable

setColor(color: number): void

设置弧线的颜色。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 5.0.0(12)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| color | number | 是 | ARGB格式颜色值，异常值不处理。 |

**示例：**



```
1. mapArc.setColor(0xffff00ff);
```

### setWidth

PhonePC/2in1TabletWearable

setWidth(width: number): void

设置弧线的宽度。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 5.0.0(12)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| width | number | 是 | 弧线的宽度，单位：px，取值范围：大于等于0，异常值不处理。 |

**示例：**



```
1. mapArc.setWidth(20);
```