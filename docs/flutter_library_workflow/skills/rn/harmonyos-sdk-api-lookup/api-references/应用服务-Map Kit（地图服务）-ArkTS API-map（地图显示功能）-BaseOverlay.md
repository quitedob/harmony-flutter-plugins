## 导入模块

PhonePC/2in1TabletWearable



```
1. import { map, mapCommon } from '@kit.MapKit';
```

## BaseOverlay

PhonePC/2in1TabletWearable

覆盖物基础类。[Marker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-marker)、[MapPolyline](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolyline)、[MapPolygon](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolygon)、[MapCircle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcircle)、[MapArc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-maparc)、[ImageOverlay](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-imageoverlay)、[BasePriorityOverlay](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-basepriorityoverlay)等覆盖物继承该基础类。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

展开

| 返回类型 | 方法 |
| --- | --- |
| string | [getId](/consumer/cn/doc/harmonyos-references/map-map-baseoverlay#getid)()  获取覆盖物的ID属性。 |
| number | [getZIndex](/consumer/cn/doc/harmonyos-references/map-map-baseoverlay#getzindex)()  获取覆盖物的z指数。 |
| Object | [getTag](/consumer/cn/doc/harmonyos-references/map-map-baseoverlay#gettag)()  覆盖物的tag属性。 |
| boolean | [isVisible](/consumer/cn/doc/harmonyos-references/map-map-baseoverlay#isvisible)()  覆盖物的可见性。 |
| void | [remove](/consumer/cn/doc/harmonyos-references/map-map-baseoverlay#remove)()  从地图移除覆盖物。 |
| void | [setZIndex](/consumer/cn/doc/harmonyos-references/map-map-baseoverlay#setzindex)(zIndex: number)  设置覆盖物的z指数。 |
| void | [setTag](/consumer/cn/doc/harmonyos-references/map-map-baseoverlay#settag)(tag: Object)  设置覆盖物的tag属性。 |
| void | [setVisible](/consumer/cn/doc/harmonyos-references/map-map-baseoverlay#setvisible)(visible: boolean)  设置覆盖物的可见性。 |

### getId

PhonePC/2in1TabletWearable

getId(): string

获取覆盖物的ID。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 覆盖物的ID。 |

**示例：**



```
1. // 以marker为例
2. let markerOptions: mapCommon.MarkerOptions = {
3. position: {
4. latitude: 39.9,
5. longitude: 116.4
6. }
7. };
8. let marker: map.Marker = await this.mapController.addMarker(markerOptions);
9. let id: string = marker.getId();
```

### getZIndex

PhonePC/2in1TabletWearable

getZIndex(): number

获取覆盖物的z指数。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| number | 覆盖物的z指数。z指数指覆盖物的叠加顺序，具有较大z指数的覆盖物会绘制在具有较小z指数的覆盖物上，具有相同z指数的叠加顺序为元素添加的先后顺序。 |

**示例：**



```
1. // 以marker为例
2. let zIndex: number = marker.getZIndex();
```

### getTag

PhonePC/2in1TabletWearable

getTag(): Object

获取覆盖物的tag属性。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Object | 覆盖物的tag属性。 |

**示例：**



```
1. // 以marker为例
2. let tag: Object = marker.getTag();
```

### isVisible

PhonePC/2in1TabletWearable

isVisible(): boolean

获取覆盖物的可见性。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| boolean | 覆盖物的可见性。  - true：可见  - false：不可见 |

**示例：**



```
1. // 以marker为例
2. let isVisible: boolean = marker.isVisible();
```

### remove

PhonePC/2in1TabletWearable

remove(): void

从地图移除覆盖物。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**示例：**



```
1. // 以marker为例
2. marker.remove();
```

### setZIndex

PhonePC/2in1TabletWearable

setZIndex(zIndex: number): void

设置覆盖物的z指数。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| zIndex | number | 是 | 覆盖物的z指数。z指数指覆盖物的叠加顺序，具有较大z指数的覆盖物会绘制在具有较小z指数的覆盖物上，具有相同z指数的叠加顺序为元素添加的先后顺序。异常值不处理。 |

**示例：**



```
1. // 以marker为例
2. marker.setZIndex(3);
```

### setTag

PhonePC/2in1TabletWearable

setTag(tag: Object): void

设置覆盖物的tag属性。tag属性可以是任意对象，如果设置为空，则清除tag。当您不再需要使用tag时，您可以调用setTag(null)或setTag(undefined)清除tag，以防止应用程序发生内存泄漏。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| tag | Object | 是 | 覆盖物的tag属性，异常值不处理。 |

**示例：**



```
1. // 以marker为例
2. let tag = "tag-1";
3. marker.setTag(tag);
```

### setVisible

PhonePC/2in1TabletWearable

setVisible(visible: boolean): void

设置覆盖物的可见性，默认可见。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| visible | boolean | 是 | 覆盖物的可见性，异常值不处理。  - true：可见  - false：不可见 |

**示例：**



```
1. // 以marker为例
2. marker.setVisible(true);
```