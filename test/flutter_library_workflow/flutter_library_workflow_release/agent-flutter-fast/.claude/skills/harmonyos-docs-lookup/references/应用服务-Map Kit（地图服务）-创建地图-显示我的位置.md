## 场景介绍

从6.0.1(21)开始，支持更改我的位置相对覆盖物的顺序。

本章节将向您介绍如何开启和展示“我的位置”功能，“我的位置”指的是进入地图后点击“我的位置”显示当前位置点的功能。效果如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6a/v3/iP6nTvDzSTyPYGtfxeFAdw/zh-cn_image_0000002542336703.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031518Z&HW-CC-Expire=86400&HW-CC-Sign=003D8655C1966D64F76D0C8576F2CEED5C288F266F5D7283CD0B5AAFABEEEFB3 "点击放大")

## 接口说明

“我的位置”功能主要由[MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller)的方法实现，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section201759451313)。

展开

| 方法名 | 描述 |
| --- | --- |
| [setMyLocationEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section201759451313)(myLocationEnabled: boolean): void | “我的位置”图层功能开关，默认使用系统的连续定位能力显示用户位置。开关打开后，“我的位置”按钮默认显示在地图的右下角。点击“我的位置”按钮，将会在屏幕中心显示当前定位，以蓝色圆点的形式呈现。 |
| [setMyLocationControlsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section3464719101814)(enabled: boolean): void | 设置是否启用“我的位置”按钮。只显示按钮，在不开启“我的位置”图层功能的情况下，点击按钮没反应。 |
| [setMyLocation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section1165002535516)(location: [geoLocationManager.Location](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-geolocationmanager#location)): void | 设置“我的位置”坐标。  如果不使用Map Kit提供的默认定位行为，可以通过[Location Kit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/location-api)获取用户位置后，传给Map Kit。 |
| [setMyLocationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section126791641317)(style: [mapCommon.MyLocationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section3713124215275)): Promise<void> | 设置“我的位置”样式。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapeventmanager#section9264124723916)(type: 'myLocationButtonClick', callback: Callback<void>): void | 监听“我的位置”按钮点击事件。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapeventmanager#section19268134715398)(type: 'myLocationButtonClick', callback?: Callback<void>): void | 取消监听“我的位置”按钮点击事件。 |

## 开发步骤

### 开启“我的位置”按钮

1. 在启用“我的位置”功能前，开发人员应确保应用已申请并获得用户定位权限，以便正确显示用户当前位置。

   申请ohos.permission.LOCATION和ohos.permission.APPROXIMATELY\_LOCATION权限，您需要在module.json5配置文件中声明所需要的权限，具体可参考[声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "module" : {
   3. // ...
   4. "requestPermissions":[
   5. {
   6. // 允许应用在前台运行时获取位置信息
   7. "name" : "ohos.permission.LOCATION",
   8. // reason需要在/resources/base/element/string.json中新建
   9. "reason": "$string:location_permission",
   10. "usedScene": {
   11. "abilities": [
   12. "EntryAbility"
   13. ],
   14. "when":"inuse"
   15. }
   16. },
   17. {
   18. // 允许应用获取设备模糊位置信息
   19. "name" : "ohos.permission.APPROXIMATELY_LOCATION",
   20. // reason需要在/resources/base/element/string.json中新建
   21. "reason": "$string:approximately_location_permission",
   22. "usedScene": {
   23. "abilities": [
   24. "EntryAbility"
   25. ],
   26. "when":"inuse"
   27. }
   28. }
   29. ]
   30. }
   31. }
   ```
2. 初始化地图并获取[MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller)地图操作类对象。调用mapController对象的[setMyLocationEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section201759451313)方法启用“我的位置”功能。

   建议在获得用户授权后开启“我的位置”功能。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { abilityAccessCtrl, bundleManager, common, PermissionRequestResult, Permissions } from '@kit.AbilityKit';
   2. import { BusinessError, AsyncCallback } from '@kit.BasicServicesKit';
   3. import { MapComponent, mapCommon, map } from '@kit.MapKit';

   5. @Entry
   6. @Component
   7. struct LocationDemo {
   8. private mapOptions?: mapCommon.MapOptions;
   9. private callback?: AsyncCallback<map.MapComponentController>;
   10. private mapController?: map.MapComponentController;
   11. private mapEventManager?: map.MapEventManager;

   13. aboutToAppear(): void {
   14. // 地图初始化参数，设置地图中心点坐标及层级
   15. this.mapOptions = {
   16. position: {
   17. target: {
   18. latitude: 39.9,
   19. longitude: 116.4
   20. },
   21. zoom: 10
   22. }
   23. };

   25. // 地图初始化的回调
   26. this.callback = async (err, mapController) => {
   27. if (!err) {
   28. // 获取地图的控制器类，用来操作地图
   29. this.mapController = mapController;
   30. this.mapEventManager = this.mapController.getEventManager();
   31. let permission = await this.checkPermissions();
   32. if (!permission) {
   33. this.requestPermissions();
   34. // 启用我的位置按钮
   35. this.mapController?.setMyLocationControlsEnabled(true);
   36. }
   37. } else {
   38. console.error(`Failed to initialize the map, code is：${err.code}, message is ${err.message}`);
   39. }
   40. };
   41. }

   43. // 校验应用是否被授予定位权限，可以通过调用checkAccessToken()方法来校验当前是否已经授权。
   44. async checkPermissions(): Promise<boolean> {
   45. const permissions: Array<Permissions> = ['ohos.permission.LOCATION', 'ohos.permission.APPROXIMATELY_LOCATION'];
   46. for (let permission of permissions) {
   47. let grantStatus: abilityAccessCtrl.GrantStatus = await this.checkAccessToken(permission);
   48. if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
   49. // 启用我的位置图层，mapController为地图操作类对象
   50. this.mapController?.setMyLocationEnabled(true);
   51. // 启用我的位置按钮
   52. this.mapController?.setMyLocationControlsEnabled(true);
   53. return true;
   54. }
   55. }
   56. return false;
   57. }

   59. // 如果没有被授予定位权限，动态向用户申请授权
   60. requestPermissions(): void {
   61. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
   62. atManager.requestPermissionsFromUser(this.getUIContext().getHostContext() as common.UIAbilityContext,
   63. ['ohos.permission.LOCATION', 'ohos.permission.APPROXIMATELY_LOCATION'])
   64. .then((data: PermissionRequestResult) => {
   65. // 启用我的位置图层
   66. this.mapController?.setMyLocationEnabled(true);
   67. })
   68. .catch((err: BusinessError) => {
   69. console.error(`Failed to request permissions from user. Code is ${err.code}, message is ${err.message}`);
   70. })
   71. }

   73. async checkAccessToken(permission: Permissions): Promise<abilityAccessCtrl.GrantStatus> {
   74. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
   75. let grantStatus: abilityAccessCtrl.GrantStatus = abilityAccessCtrl.GrantStatus.PERMISSION_DENIED;

   77. // 获取应用程序的accessTokenID
   78. let tokenId: number = 0;
   79. let bundleInfo: bundleManager.BundleInfo =
   80. await bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION);
   81. console.info('Succeeded in getting Bundle.');
   82. let appInfo: bundleManager.ApplicationInfo = bundleInfo.appInfo;
   83. tokenId = appInfo.accessTokenId;

   85. // 校验应用是否被授予权限
   86. grantStatus = await atManager.checkAccessToken(tokenId, permission);
   87. console.info('Succeeded in checking access token.');
   88. return grantStatus;
   89. }

   91. build() {
   92. Stack() {
   93. // 调用MapComponent组件初始化地图
   94. MapComponent({ mapOptions: this.mapOptions, mapCallback: this.callback }).width('100%').height('100%');
   95. }.height('100%')
   96. }
   97. }
   ```
3. 检查“我的位置”功能是否成功启用。

   “我的位置”按钮![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8b/v3/icRSDJ3CTL2jqWrrrhe42Q/zh-cn_image_0000002517280081.png?HW-CC-KV=V1&HW-CC-Date=20260414T031518Z&HW-CC-Expire=86400&HW-CC-Sign=FBEAD0939694A3FB251F37115C958438AAE1709F9EE78A44DAE5AB611A30AA82)默认显示在地图的右下角。点击“我的位置”按钮![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/42/v3/nNRErtxpRXmQ6KqFgCPGsA/zh-cn_image_0000002517280079.png?HW-CC-KV=V1&HW-CC-Date=20260414T031518Z&HW-CC-Expire=86400&HW-CC-Sign=F22B95B7CCCC86202A842945D9941F99F1C652EA6CF543E592E97E8AA9F8287B)，将会在屏幕中心显示当前定位，以蓝色圆点的形式呈现，效果如下图所示，效果根据获取到的用户位置会有变化。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/af/v3/-lDiFQsmROS0Qy_W9Y3RdQ/zh-cn_image_0000002511467180.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031518Z&HW-CC-Expire=86400&HW-CC-Sign=BB04F4C30B1B31BCB2609F1E93DAB4B47CC6183A899CE3EE7AA5AC5EC215897D "点击放大")
4. 获取用户位置坐标并设置用户的位置。

   Map Kit默认使用系统的连续定位能力，如果您希望定制显示频率或者精准度，可以调用[geoLocationManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-geolocationmanager)相关接口获取用户位置坐标（WGS84坐标系）。注意访问设备的位置信息必须申请权限，并且获得用户授权，详情见[geoLocationManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-geolocationmanager)。

   下面的示例仅显示一次定位结果，在获取到用户坐标后，调用mapController对象的[setMyLocation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section1165002535516)设置用户的位置，[setMyLocation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section1165002535516)接口使用的是WGS84坐标系。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 需要引入@kit.LocationKit模块
   2. import { geoLocationManager } from '@kit.LocationKit';
   3. // ...

   5. // 获取用户位置坐标
   6. let location = await geoLocationManager.getCurrentLocation();

   8. // 设置用户的位置
   9. this.mapController.setMyLocation(location);
   ```

### 监听“我的位置”按钮点击事件

通过调用[on('myLocationButtonClick')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapeventmanager#section9264124723916)方法，设置'myLocationButtonClick'事件监听。设置监听后“我的位置按钮”点击事件自定义，反之不设置则由Map Kit执行点击后默认事件，即地图移动到当前用户位置。

收起

自动换行

深色代码主题

复制

```
1. let callback = () => {
2. console.info("myLocationButtonClick", `myLocationButtonClick`);
3. };
4. this.mapEventManager.on("myLocationButtonClick", callback);
```

### 隐藏“我的位置”按钮

控制是否显示“我的位置”按钮。

收起

自动换行

深色代码主题

复制

```
1. this.mapController.setMyLocationControlsEnabled(false);
```

### 自定义位置图标样式

通过调用mapController.[setMyLocationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section126791641317)方法，设置用户位置图标样式。效果如下：

收起

自动换行

深色代码主题

复制

```
1. let style: mapCommon.MyLocationStyle = {
2. anchorU: 0.5,
3. anchorV: 0.5,
4. radiusFillColor: 0xffff0000,
5. // icon为自定义图标资源，使用时需要替换
6. // 图标存放在resources/rawfile，icon参数传入rawfile文件夹下的相对路径
7. icon: 'test.png'
8. };
9. await this.mapController.setMyLocationStyle(style);
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1a/v3/kMvTg5ZiRdOiPCiPYZcPnw/zh-cn_image_0000002543067141.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031518Z&HW-CC-Expire=86400&HW-CC-Sign=34698E0170250F50D00B365FB123497C05D52EF596B610630BD74C732D12B0E8 "点击放大")

### 更改我的位置图层相对于覆盖物的压盖顺序

通过调用mapController.[changeMyLocationLayerOrder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section16251915293)方法，更改我的位置图层相对于覆盖物的压盖顺序。效果如下：

收起

自动换行

深色代码主题

复制

```
1. // true：我的位置图层位于覆盖物之下
2. this.mapController?.changeMyLocationLayerOrder(true);
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/33/v3/HhVCamHwSR2CDVZ7n0HveA/zh-cn_image_0000002542947175.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031518Z&HW-CC-Expire=86400&HW-CC-Sign=1D226B44EB67B805976520BD0835FADE1CECBF49154E959665BB30CB07A32766 "点击放大")