## 场景介绍

从6.0.0(20)开始，支持卫星图和混合地图功能。

Map Kit支持以下地图类型：

* STANDARD：标准地图，展示道路、建筑物以及河流等重要的自然特征。
* NONE：空地图，没有加载任何数据的地图。
* TERRAIN：地形图，在保留了行政区划边界、POI、楼块等地图要素的基础上，呈现完整清晰描绘地形走势的标准地图。
* SATELLITE：卫星图，显示卫星照片的地图，只支持中国。
* HYBRID：混合地图，在显示卫星照片的同时也显示路网信息。

|  |  |
| --- | --- |
| **图1** 标准地图 | **图2** 空地图 |
| **图3** 地形图 | **图4** 卫星图 |
| **图5** 混合地图 |  |

## 接口说明

Map Kit提供2种方式设置地图类型：

方式一：在初始化的时候，通过设置[MapOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section816451553012)中的mapType属性来控制展示不同地图类型。

展开

| 属性名 | 描述 |
| --- | --- |
| mapCommon.MapOptions.mapType | 地图初始化参数中的MapType地图类型。 |

方式二：地图创建后，可通过[setMapType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section388992522618)方法动态设置地图类型。

展开

| 方法名 | 描述 |
| --- | --- |
| [setMapType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section388992522618)(mapType: [mapCommon.MapType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#zh-cn_topic_0000001245084266_section18522846142615)): void | 设置地图类型。 |

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { mapCommon } from '@kit.MapKit';
   ```
2. 设置地图类型。

   方式一：

   在地图初始化的时候，在mapOptions参数中新增mapType属性：[mapCommon.MapType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#zh-cn_topic_0000001245084266_section18522846142615).STANDARD（标准地图）。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. this.mapOptions = {
   2. position: {
   3. target: {
   4. latitude: 31.984410259206815,
   5. longitude: 118.76625379397866
   6. },
   7. zoom: 15
   8. },
   9. mapType: mapCommon.MapType.STANDARD
   10. };
   ```

   显示效果如下：

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c2/v3/_C78LhMRTFieRryvpLz7iA/zh-cn_image_0000002510976124.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031515Z&HW-CC-Expire=86400&HW-CC-Sign=9AA6669BAC6AE434EFECF7170F5B24196DC26D0A139F7B29936A9C55EAFB2F4C "点击放大")

   方式二：地图创建后，调用[setMapType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section388992522618)方法设置地图类型为地形图。设置为地形图时，为了获得最佳显示效果，推荐将地图缩放层级保持在5至14之间。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. this.mapController.setMapType(mapCommon.MapType.TERRAIN);
   ```

   显示效果如下：

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/aa/v3/06yl8iaoR5yZ91VmhXdvZw/zh-cn_image_0000002542416451.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031515Z&HW-CC-Expire=86400&HW-CC-Sign=4C07D3F6E1990283970F61855577D35F68CD1C7EE9D80A51A3497CDE2155A582 "点击放大")