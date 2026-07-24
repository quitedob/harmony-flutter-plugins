## 场景介绍

从5.0.3(15)开始，支持Logo缩放功能和3D地球功能；从5.1.1(19)开始，支持室内图功能和设置比例尺单位功能；从6.0.0(20)开始，支持设置地图语言功能。

本章节将向您介绍如何使用地图组件[MapComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-mapcomponent#section816451553012)和[MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller)呈现地图，效果如下图所示。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/77/v3/XoQ_WuqjSN6Tfbzl6IhX6g/zh-cn_image_0000002542318833.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031511Z&HW-CC-Expire=86400&HW-CC-Sign=B6D9E7127ED1C689D7E52E61C63FB6100803C4AE135A6E6038037D725ADEE840 "点击放大")

## 接口说明

显示地图功能主要由[MapComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-mapcomponent#section816451553012)提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-mapcomponent)。

展开

| 接口 | 接口描述 |
| --- | --- |
| [mapCommon.MapOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section816451553012) | 提供Map组件初始化的属性。 |
| [MapComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-mapcomponent#section816451553012)(mapOptions: [mapCommon.MapOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section816451553012), mapCallback: AsyncCallback<[map.MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller)>) | 地图组件。 |
| [map.MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller) | 地图组件的主要功能入口类，用来操作地图，与地图有关的所有方法从此处接入。它所承载的工作包括：地图类型切换（如标准地图、空地图）、改变地图状态（中心点坐标和缩放级别）、添加点标记（Marker）、绘制几何图形（如MapPolyline、MapPolygon、MapCircle）、监听各类事件等。 |

## 开发步骤

### 地图显示

1. 导入Map Kit相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { MapComponent, mapCommon, map } from '@kit.MapKit';
   2. import { AsyncCallback } from '@kit.BasicServicesKit';
   ```
2. 新建地图初始化参数mapOptions，设置地图中心点坐标及层级。

   通过callback回调的方式获取[MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller)对象，用来操作地图。

   调用[MapComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-mapcomponent#section816451553012)组件，传入mapOptions和mapCallback参数，初始化地图。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct HuaweiMapDemo {
   4. private TAG = "HuaweiMapDemo";
   5. private mapOptions?: mapCommon.MapOptions;
   6. private callback?: AsyncCallback<map.MapComponentController>;
   7. private mapController?: map.MapComponentController;
   8. private mapEventManager?: map.MapEventManager;

   10. aboutToAppear(): void {
   11. // 地图初始化参数，设置地图中心点坐标及层级
   12. this.mapOptions = {
   13. position: {
   14. target: {
   15. latitude: 39.9,
   16. longitude: 116.4
   17. },
   18. zoom: 10
   19. }
   20. };

   22. // 地图初始化的回调
   23. this.callback = async (err, mapController) => {
   24. if (!err) {
   25. // 获取地图的控制器类，用来操作地图
   26. this.mapController = mapController;
   27. this.mapEventManager = this.mapController.getEventManager();
   28. let callback = () => {
   29. console.info(this.TAG, `on-mapLoad`);
   30. }
   31. this.mapEventManager.on("mapLoad", callback);
   32. } else {
   33. console.error(`Failed to initialize the map, code is：${err.code}, message is ${err.message}`);
   34. }
   35. };
   36. }

   38. // 页面每次显示时触发一次，包括路由过程、应用进入前台等场景，仅@Entry装饰的自定义组件生效
   39. onPageShow(): void {
   40. // 将地图切换到前台
   41. if (this.mapController) {
   42. this.mapController.show();
   43. }
   44. }

   46. // 页面每次隐藏时触发一次，包括路由过程、应用进入后台等场景，仅@Entry装饰的自定义组件生效
   47. onPageHide(): void {
   48. // 将地图切换到后台
   49. if (this.mapController) {
   50. this.mapController.hide();
   51. }
   52. }

   54. build() {
   55. Stack() {
   56. // 调用MapComponent组件初始化地图
   57. MapComponent({ mapOptions: this.mapOptions, mapCallback: this.callback }).width('100%').height('100%');
   58. }.height('100%')
   59. }
   60. }
   ```
3. 运行您刚完成的工程就可以在您的APP中看到地图了，运行后的效果如下图所示。

   如果没有成功加载地图，请参见[地图不显示](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/map-faq-1)。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2a/v3/VJPGLs8wRGWmDtTQFPt-sQ/zh-cn_image_0000002510799422.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031511Z&HW-CC-Expire=86400&HW-CC-Sign=80EAFF95450C8DC4AF282DB88A0A0766C4AE6B203A98155FDEC4EBA7483A5129 "点击放大")

### 设置地图属性

[MapOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section816451553012)包含以下属性。

展开

| 属性 | 描述 |
| --- | --- |
| mapType | 地图类型，默认值：[MapType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#zh-cn_topic_0000001245084266_section18522846142615).STANDARD。 |
| position | 地图相机位置。 |
| bounds | 地图展示框。 |
| minZoom | 地图最小图层，有效范围[2, 20]，默认值：2。 |
| maxZoom | 地图最大图层，有效范围[2, 20]，默认值：20。 |
| rotateGesturesEnabled | 是否支持旋转手势，默认值：true。 |
| scrollGesturesEnabled | 是否支持滑动手势，默认值：true。 |
| zoomGesturesEnabled | 是否支持缩放手势，默认值：true。 |
| tiltGesturesEnabled | 是否支持倾斜手势，默认值：true。 |
| zoomControlsEnabled | 是否展示缩放控件，默认值：true。 |
| myLocationControlsEnabled | 是否展示我的位置按钮，默认值：false。 |
| compassControlsEnabled | 是否展示指南针控件，默认值：true。 |
| scaleControlsEnabled | 是否展示比例尺，默认值：false。 |
| alwaysShowScaleEnabled | 是否始终显示比例尺，默认值：false。 |
| padding | 设置地图和边界的距离。 |
| styleId | 自定义样式ID。 |
| dayNightMode | 日间夜间模式，默认值：[DayNightMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section634916281725).DAY（日间模式）。 |
| logoScale | Logo缩放比例，取值范围是[0.8, 1]，默认值：1。 |
| sphereEnabled | 是否开启3D地球效果，默认值为false。 |
| indoorMapEnabled | 是否开启室内图，默认值：false。 |
| scaleUnit | 地图比例尺公英制单位，默认值：[ScaleUnit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section2230143218276).METRIC\_UNIT（公制单位）。 |

1. 设置mapType，[切换地图类型](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/map-type)章节中有详细讲解。
2. 设置myLocationControlsEnabled，展示我的位置按钮。

   在mapOptions中设置myLocationControlsEnabled属性为true，可展示我的位置按钮![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0e/v3/vNT4k4OIRd6hSTex-_3N3A/zh-cn_image_0000002514290008.png?HW-CC-KV=V1&HW-CC-Date=20260414T031511Z&HW-CC-Expire=86400&HW-CC-Sign=D3AA7375F17D5180AD687A5AA667ACF0BF639C1E0D5AFBBBCC1F7598391DF2A4)，显示效果如下图所示。

   也可通过调用[MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller)对象的方法展示我的位置按钮，详情见[显示我的位置](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/map-location)章节。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. this.mapOptions = {
   2. position: {
   3. target: {
   4. latitude: 39.9,
   5. longitude: 116.4
   6. },
   7. zoom: 10
   8. },
   9. myLocationControlsEnabled: true
   10. };
   ```

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2c/v3/TNiLO_cQTpGYgyZihvgW-Q/zh-cn_image_0000002542399659.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031511Z&HW-CC-Expire=86400&HW-CC-Sign=2ACB4B505BDE67CF9A2024AF4215AA787F8DD98D3414FE3B5226DA0A8684600B "点击放大")
3. 展示比例尺。

   在mapOptions中设置scaleControlsEnabled属性为true，可展示比例尺，显示效果如下图所示。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. this.mapOptions = {
   2. position: {
   3. target: {
   4. latitude: 39.9,
   5. longitude: 116.4
   6. },
   7. zoom: 10
   8. },
   9. scaleControlsEnabled: true
   10. };
   ```

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/12/v3/Hv0N4L7VSYWfrAMFLu7Jqg/zh-cn_image_0000002542319761.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031511Z&HW-CC-Expire=86400&HW-CC-Sign=0BF0239C8F6CEB2BB61D5CAC3B890A104622E66A135C901764534506FE607106 "点击放大")

### 开启3D建筑图层

调用[MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller)对象的[setBuildingEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section15905291318)方法开启3D建筑图层，把缩放层级调整为16级或以上，将两个手指放在地图上，向上滑动倾斜地图可看到3D建筑图层的效果。

收起

自动换行

深色代码主题

复制

```
1. this.mapController.setBuildingEnabled(true);
```

显示效果如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c9/v3/TiYehsjDRHOJQcsypWDNHQ/zh-cn_image_0000002510760040.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031511Z&HW-CC-Expire=86400&HW-CC-Sign=030B494B1CF262357E65002E5C10EF81789DC30159450EB88A92D55C72DE775C "点击放大")

### 地图前后台切换

您可以通过[MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller)对象来控制地图页面前后台切换的生命周期。应用触发前后台切换时，可以在Page生命周期里调用show/hide，以便申请/释放资源。

**地图切换至前台：**

收起

自动换行

深色代码主题

复制

```
1. // 页面每次显示时触发一次，包括路由过程、应用进入前台等场景，仅@Entry装饰的自定义组件生效
2. onPageShow(): void {
3. // 建议页面切换到前台，调用地图组件的show方法
4. if (this.mapController) {
5. this.mapController.show();
6. }
7. }
```

**地图切换至后台：**

收起

自动换行

深色代码主题

复制

```
1. // 页面每次隐藏时触发一次，包括路由过程、应用进入后台等场景，仅@Entry装饰的自定义组件生效
2. onPageHide(): void {
3. // 建议页面切换到后台，调用地图组件的hide方法
4. if (this.mapController) {
5. this.mapController.hide();
6. }
7. }
```

### 深色模式

Map Kit提供2种方式设置地图的夜间模式：初始化地图时和创建地图后。

方式一：初始化地图时

在地图初始化参数中设置dayNightMode参数，参数可选值包括DAY（日间模式）、NIGHT（夜间模式）、AUTO（自动模式）。如果将参数值设置为AUTO，地图的深色模式会跟随系统，打开系统深色开关，显示夜间模式，否则显示日间模式。

收起

自动换行

深色代码主题

复制

```
1. this.mapOptions = {
2. position: {
3. target: {
4. latitude: 39.9,
5. longitude: 116.4
6. },
7. zoom: 10
8. },
9. myLocationControlsEnabled: true,
10. // 设置地图为夜间模式
11. dayNightMode: mapCommon.DayNightMode.NIGHT
12. };
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/92/v3/LZ75h5AyT0S607NeEcs3qw/zh-cn_image_0000002542401109.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031511Z&HW-CC-Expire=86400&HW-CC-Sign=5D08AD140EFA1157BA51ACC83E3C632F380CBF074802B9DCB78953EBC0447777 "点击放大")

方式二：创建地图后

创建地图后，可调用[MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller)对象的[setDayNightMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section123945545109)方法设置夜间模式。下面的例子中将参数值设置为AUTO，在设置完之后，打开系统的深色开关，地图会自动变为夜间模式。

收起

自动换行

深色代码主题

复制

```
1. // 设置地图为自动模式
2. this.mapController.setDayNightMode(mapCommon.DayNightMode.AUTO);
```

### 室内图

使用室内图可查看楼层平面图，如查看购物中心、博物馆和医院等地点的内部情况。

Map Kit提供2种方式开启地图的室内图功能：初始化地图时和创建地图后。

方式一：初始化地图时

在地图初始化参数中设置将[MapOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section816451553012)中的indoorMapEnabled参数设置为true即可开启室内图功能，而且仅17级及以上地图层级可见室内图和楼层调节控件，通过左下角的楼层调节控件可以切换当前室内图楼层。

收起

自动换行

深色代码主题

复制

```
1. this.mapOptions = {
2. position: {
3. target: {
4. latitude: 31.979227,
5. longitude: 118.762245
6. },
7. zoom: 18
8. },
9. // 开启室内图功能
10. indoorMapEnabled: true
11. };
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/30/v3/nZ2B4SgtReiI_oH00Mr0uw/zh-cn_image_0000002510761278.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031511Z&HW-CC-Expire=86400&HW-CC-Sign=E00A538E4A29E0E107D23ACF4E13DEC4C14CB05B22B6168DB2A01DBDB3B72547 "点击放大")

方式二：创建地图后

创建地图后，可调用[MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller)对象的[setIndoorMapEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section12159164214612)方法来开启或关闭室内图功能。下面的例子中将室内图开启后，调用[isIndoorMapEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section820584761611)方法来查询当前室内图功能的开启状态，调用[setFloorControlsPosition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section53651918173410)方法可以设置楼层调节控件的位置。室内图功能还提供了[switchIndoorMapFloor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section15944125342513)方法，可以切换到指定的室内建筑和指定的楼层。

收起

自动换行

深色代码主题

复制

```
1. // 开启室内图功能
2. this.mapController.setIndoorMapEnabled(true);
3. // 查询当前室内图开启状态
4. let isIndoorMapEnabled: boolean = this.mapController.isIndoorMapEnabled();
5. console.info('indoorMapEnabled is:' + isIndoorMapEnabled);
6. // 设置楼层调节控件的位置
7. this.mapController.setFloorControlsPosition({
8. positionX: 500,
9. positionY: 500
10. });
11. // 切换楼层,需要将第一个入参替换成用户需要的建筑物id，第二个参数替换成当前楼层，如'1F'、'B1'等等
12. this.mapController.switchIndoorMapFloor('822588304363886720', '3F');
```

通过调用[on('indoorMapEnter')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapeventmanager#section76731728143918)方法和[on('indoorMapExit')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapeventmanager#section15867173119615)可以分别设置进入和退出室内图的监听事件。

收起

自动换行

深色代码主题

复制

```
1. let callbackEnter = (indoorMapInfo: map.IndoorMapInfo) => {
2. console.info(this.TAG, `on-indoorMapEnter`);
3. };
4. let callbackExit = () => {
5. console.info(this.TAG, `on-indoorMapExit`);
6. };
7. // 进入室内图监听回调
8. this.mapEventManager.on("indoorMapEnter", callbackEnter);
9. // 退出室内图监听回调
10. this.mapEventManager.on("indoorMapExit", callbackExit);
```

### Logo缩放比例

Map Kit提供2种方式设置地图的Logo缩放比例：初始化地图时和创建地图后。

方式一：初始化地图时

在地图初始化参数中设置logoScale参数，取值范围是[0.8, 1]，默认值是1。

收起

自动换行

深色代码主题

复制

```
1. this.mapOptions = {
2. position: {
3. target: {
4. latitude: 39.9,
5. longitude: 116.4
6. },
7. zoom: 10
8. },
9. myLocationControlsEnabled: true,
10. // 设置logo缩放比例为0.9
11. logoScale: 0.9
12. };
```

方式二：创建地图后

1. 创建地图后，调用[MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section816451553012)对象的[setLogoScale](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section205343210177)方法设置Logo缩放比例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. this.mapController.setLogoScale(0.9);
   ```
2. 获取Logo缩放比例。

   通过调用[MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section816451553012)对象的[getLogoScale](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section18243711173212)方法获取当前Logo缩放比例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let logoScale: number = this.mapController.getLogoScale();
   ```

### 开启3D地球

Map Kit提供2种方式开启3D地球：初始化地图时和创建地图后。

开启3D地球后，当层级缩小到小于4时，可以清晰地看到3D地球。

方式一：初始化地图时

在地图初始化参数中设置3D地球的开启状态，默认值是false。

收起

自动换行

深色代码主题

复制

```
1. this.mapOptions = {
2. position: {
3. target: {
4. latitude: 39.9,
5. longitude: 116.4
6. },
7. zoom: 2
8. },
9. // 开启3D地球
10. sphereEnabled: true
11. };
```

方式二：创建地图后

创建地图后，调用[MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section816451553012)对象的[setSphereEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section67801022102716)方法开启3D地球，通过调用[MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section816451553012)对象的[isSphereEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section1825143352110)方法可获取3D地球的开启状态。

收起

自动换行

深色代码主题

复制

```
1. // 开启3D地球
2. this.mapController.setSphereEnabled(true);
3. // 获取3D地球的开启状态
4. let result: boolean = this.mapController.isSphereEnabled();
```

显示效果如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0/v3/iTTkspLATmO3yYtp5sLzZA/zh-cn_image_0000002542321403.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031511Z&HW-CC-Expire=86400&HW-CC-Sign=F4499D733B3D24BEFD5F62E6780FE9F6EA7AE24FF85CB16D246242DC8149C21A "点击放大")