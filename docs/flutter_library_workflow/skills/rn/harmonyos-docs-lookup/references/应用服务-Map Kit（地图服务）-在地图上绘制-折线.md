## 场景介绍

本章节将向您介绍如何在地图上绘制折线、设置折线分段颜色、设置折线可渐变、绘制纹理。

5.0.3(15)开始，支持折线绘制纹理功能。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/25/v3/dpspDjsHSwK4XzSjybDhcQ/zh-cn_image_0000002510852048.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031555Z&HW-CC-Expire=86400&HW-CC-Sign=02855C4CC7E662B6684DCBB3FA1C15271EE4E26D36659BC405725364DB150513 "点击放大")

## 接口说明

添加折线功能主要由[MapPolylineOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section113246334153)、[addPolyline](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section6818109112812)和[MapPolyline](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolyline)提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolyline)。

展开

| 接口名 | 描述 |
| --- | --- |
| [MapPolylineOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section113246334153) | 折线参数。 |
| [addPolyline](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section6818109112812)(options: [mapCommon.MapPolylineOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section113246334153)): Promise<[MapPolyline](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolyline)> | 在地图上添加一条折线。 |
| [MapPolyline](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolyline) | 折线，支持更新和查询相关属性。 |

## 开发步骤

### 添加折线

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { MapComponent, mapCommon, map } from '@kit.MapKit';
   2. import { AsyncCallback } from '@kit.BasicServicesKit';
   ```
2. 添加折线，在callback方法中创建初始化参数并新建[MapPolyline](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolyline)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct MapPolylineDemo {
   4. private mapOptions?: mapCommon.MapOptions;
   5. private mapController?: map.MapComponentController;
   6. private callback?: AsyncCallback<map.MapComponentController>;
   7. private mapPolyline?: map.MapPolyline;

   9. aboutToAppear(): void {
   10. // 地图初始化参数
   11. this.mapOptions = {
   12. position: {
   13. target: {
   14. latitude: 31.98,
   15. longitude: 118.78
   16. },
   17. zoom: 14
   18. }
   19. };
   20. this.callback = async (err, mapController) => {
   21. if (!err) {
   22. this.mapController = mapController;

   24. // polyline初始化参数
   25. let polylineOption: mapCommon.MapPolylineOptions = {
   26. points: [
   27. { longitude: 118.78, latitude: 31.975 },
   28. { longitude: 118.78, latitude: 31.982 },
   29. { longitude: 118.79, latitude: 31.985 }
   30. ],
   31. clickable: true,
   32. startCap: mapCommon.CapStyle.BUTT,
   33. endCap: mapCommon.CapStyle.BUTT,
   34. geodesic: false,
   35. jointType: mapCommon.JointType.BEVEL,
   36. visible: true,
   37. width: 10,
   38. zIndex: 10,
   39. gradient: false
   40. }
   41. // 创建polyline
   42. try {
   43. this.mapPolyline = await this.mapController.addPolyline(polylineOption);
   44. } catch (e) {
   45. console.error(`Failed to create the mapPolyline, code is：${e.code}, message is ${e.message}`);
   46. }
   47. } else {
   48. console.error(`Failed to initialize the map, code is：${err.code}, message is ${err.message}`);
   49. }
   50. };
   51. }

   53. build() {
   54. Stack() {
   55. Column() {
   56. MapComponent({ mapOptions: this.mapOptions, mapCallback: this.callback });
   57. }.width('100%')
   58. }.height('100%')
   59. }
   60. }
   ```

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1a/v3/S9k3rouATgqOGyFd6eUZYg/zh-cn_image_0000002542372227.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031555Z&HW-CC-Expire=86400&HW-CC-Sign=BB095379BF58DEECCF733767299B089B4D67B2591DD0C86DDF8141154038E03F "点击放大")

### 设置折线分段颜色

方法一：新建折线时在[MapPolylineOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section113246334153)的colors属性中设置折线分段颜色值。

收起

自动换行

深色代码主题

复制

```
1. let polylineOption: mapCommon.MapPolylineOptions = {
2. points: [{longitude:118.78,latitude:31.975}, {longitude:118.78,latitude:31.982}, {longitude:118.79,latitude:31.985}],
3. clickable: true,
4. startCap: mapCommon.CapStyle.BUTT,
5. endCap: mapCommon.CapStyle.BUTT,
6. geodesic: false,
7. jointType: mapCommon.JointType.BEVEL,
8. visible: true,
9. width: 10,
10. zIndex: 10,
11. // 设置颜色
12. colors: [0xffffff00, 0xff000000],
13. gradient: false
14. };
```

方法二：调用[MapPolyline](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolyline)的[setColors](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolyline#section205821994815)()方法。

收起

自动换行

深色代码主题

复制

```
1. let colors = [0xffffff00, 0xff000000];
2. this.mapPolyline.setColors(colors);
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a6/v3/h6QCl6zWQvqHDYnMAmvN6A/zh-cn_image_0000002542372857.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031555Z&HW-CC-Expire=86400&HW-CC-Sign=61E4BCA3433A0A11982809AA20007B58A6F13C2389785A55FEB3BC29AE0C6123 "点击放大")

### 设置折线可渐变

方法一：[MapPolylineOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section113246334153)的gradient属性设置为true。

收起

自动换行

深色代码主题

复制

```
1. let polylineOption: mapCommon.MapPolylineOptions = {
2. points: [{longitude:118.78,latitude:31.975}, {longitude:118.78,latitude:31.982}, {longitude:118.79,latitude:31.985}],
3. clickable: true,
4. startCap: mapCommon.CapStyle.BUTT,
5. endCap: mapCommon.CapStyle.BUTT,
6. geodesic: false,
7. jointType: mapCommon.JointType.BEVEL,
8. visible: true,
9. width: 10,
10. zIndex: 10,
11. colors: [0xffffff00, 0xff000000],
12. // 设置颜色折线可渐变
13. gradient: true
14. };
```

方法二：调用[MapPolyline](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolyline)的[setGradient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolyline#section690415431896)()方法。

收起

自动换行

深色代码主题

复制

```
1. this.mapPolyline.setGradient(true);
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/43/v3/8BrgBXf8TsWD3ZrR1ZCbPQ/zh-cn_image_0000002542372997.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031555Z&HW-CC-Expire=86400&HW-CC-Sign=0F7826F97B1EDCBDD0A83DED58DD6615A2E1F6FE37133E863D7B49BA9053AE10 "点击放大")

### 绘制纹理

方法一：新建折线时在[MapPolylineOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section113246334153)的customTexture属性设置折线纹理。

收起

自动换行

深色代码主题

复制

```
1. let polylineOption: mapCommon.MapPolylineOptions = {
2. points: [
3. { latitude: 32.220750, longitude: 118.788765 },
4. { latitude: 32.120750, longitude: 118.788765 },
5. { latitude: 32.020750, longitude: 118.788765 },
6. { latitude: 31.920750, longitude: 118.788765 },
7. { latitude: 31.820750, longitude: 118.788765 }
8. ],
9. clickable: true,
10. jointType: mapCommon.JointType.DEFAULT,
11. width: 20,
12. // 图标需存放在resources/rawfile目录下
13. customTexture: "icon/naviline_arrow.png"
14. }
```

方法二：调用[MapPolyline](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolyline)的[setCustomTexture](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolyline#section18866126111212)方法。

收起

自动换行

深色代码主题

复制

```
1. await this.mapPolyline.setCustomTexture("icon/naviline_arrow.png");
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f5/v3/AeHhUImlQeqkmDXYxt9oQw/zh-cn_image_0000002542453211.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031555Z&HW-CC-Expire=86400&HW-CC-Sign=5871B806EB05999A085AF4AF6793C250F7C2629929F7470AF7304A5D5BF0C332 "点击放大")

### 折线设置分段纹理

新建折线时利用在[MapPolylineOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section113246334153)的customTextures和customTextureIndexes属性设置折线分段纹理。

收起

自动换行

深色代码主题

复制

```
1. import { image } from '@kit.ImageKit';

3. // 数组存放图片内容
4. let customTextures: Array<ResourceStr | image.PixelMap> = new Array();
5. // 图标存放在resources/rawfile，'icon/img.png'参数值传入rawfile文件夹下的相对路径
6. customTextures.push('icon/img.png');
7. customTextures.push('icon/img_1.png');
8. let cusIndexNumber: Array<number> = new Array();
9. // cusIndexNumber数组长度与折线点数量必须相同，数组元素内容与customTextures下标相对应，图片从数组第二个元素开始选择
10. cusIndexNumber.push(0, 0, 1);
11. // polyline初始化参数
12. let polylineOption: mapCommon.MapPolylineOptions = {
13. points: [
14. { longitude: 118.78, latitude: 31.975 },
15. { longitude: 118.78, latitude: 31.982 },
16. { longitude: 118.79, latitude: 31.985 }],
17. clickable: true,
18. startCap: mapCommon.CapStyle.BUTT,
19. endCap: mapCommon.CapStyle.BUTT,
20. jointType: mapCommon.JointType.BEVEL,
21. width: 30,
22. // 图标需存放在resources/rawfile目录下
23. customTextures: customTextures,
24. customTextureIndexes: cusIndexNumber
25. };
26. let mapPolyline = await this.mapController.addPolyline(polylineOption);
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/90/v3/4G35ixJhRWmcw_DEv56bRQ/zh-cn_image_0000002543871689.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031555Z&HW-CC-Expire=86400&HW-CC-Sign=D5FBAE7D406DC7093241FF99E82AC30270558D822CB85AEDB8BB52C2EF0203B4 "点击放大")