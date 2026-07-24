## 导入模块

PhonePC/2in1TabletWearable



```
1. import { map, mapCommon } from '@kit.MapKit';
```

## MarkerClusterInfo

PhonePC/2in1TabletWearable

聚合图层的标记的信息。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本5.0.3(15)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 5.0.3(15)

展开

| **名称** | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| marker | [Marker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-marker) | 否 | 否 | 聚合图层的标记。 |
| clusterItems | Array<[mapCommon.ClusterItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#clusteritem)> | 否 | 否 | 聚合节点数组。 |

**示例：**



```
1. let clusterItem1: mapCommon.ClusterItem = {
2. position: {
3. latitude: 31.984,
4. longitude: 118.766
5. }
6. };
7. let clusterItem2: mapCommon.ClusterItem = {
8. position: {
9. latitude: 31.974,
10. longitude: 118.75
11. }
12. };
13. let array: Array<mapCommon.ClusterItem> = [
14. clusterItem1,
15. clusterItem2
16. ];
17. let clusterOverlayParams: mapCommon.ClusterOverlayParams = {
18. distance: 40,
19. clusterItems: array
20. };
21. let clusterOverlay: map.ClusterOverlay = await this.mapController.addClusterOverlay(clusterOverlayParams);
22. let callback1 = (markerClusterInfo: map.MarkerClusterInfo) => {
23. console.info("markerClusterClick", `callback1 markerClusterInfo`);
24. };
25. clusterOverlay.on("markerClusterClick", callback1);
```