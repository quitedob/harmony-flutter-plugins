## 场景介绍

本章节将向您介绍如何在地图上绘制动态轨迹。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/75/v3/jIzsnHTwRkSPbz900p381g/zh-cn_image_0000002510880250.gif?HW-CC-KV=V1&HW-CC-Date=20260414T031628Z&HW-CC-Expire=86400&HW-CC-Sign=BCC6A687BE56077B50E5EB79410AB2E29D200621334E14286260C2EB56F1DAD5 "点击放大")

## 接口说明

绘制动态轨迹功能主要由[TraceOverlayParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section202444375510)、[addTraceOverlay](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section188905329242)、[Marker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-marker#section166747193469)和[TraceOverlay](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-traceoverlay)提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-traceoverlay)。

展开

| 接口名 | 描述 |
| --- | --- |
| [TraceOverlayParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section202444375510) | 动态轨迹参数。 |
| [addTraceOverlay](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section188905329242)(params: [mapCommon.TraceOverlayParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section202444375510), markers?: Array<[Marker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-marker#section166747193469)>): Promise<[TraceOverlay](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-traceoverlay)> | 绘制动态轨迹。 |
| [Marker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-marker#section166747193469) | 动态轨迹的一组标记。 |
| [TraceOverlay](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-traceoverlay) | 动态轨迹，支持暂停和删除等功能。 |

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { mapCommon, map, MapComponent } from '@kit.MapKit';
   2. import { AsyncCallback } from '@kit.BasicServicesKit';
   ```
2. 绘制动态轨迹。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct TraceOverlayDemo {
   4. private TAG = "OHMapSDK_TraceOverlayDemo";
   5. private mapOptions?: mapCommon.MapOptions;
   6. private mapController?: map.MapComponentController;
   7. private callback?: AsyncCallback<map.MapComponentController>;

   9. aboutToAppear(): void {
   10. // 初始化地图参数
   11. this.mapOptions = {
   12. position: {
   13. target: {
   14. latitude: 31.99227173519985,
   15. longitude: 118.7622219990476
   16. },
   17. zoom: 16
   18. },
   19. scaleControlsEnabled: true
   20. }

   22. this.callback = async (err, mapController) => {
   23. console.info(this.TAG, "mapCallback err=" + JSON.stringify(err) +
   24. "; mapController=" + JSON.stringify(mapController));
   25. if (!err) {
   26. this.mapController = mapController;
   27. // marker1的参数
   28. let markerOptions1: mapCommon.MarkerOptions = {
   29. position: {
   30. latitude: 31.99227173519985,
   31. longitude: 118.7622219990476
   32. },
   33. icon: $r("app.media.track_setting_sport_map_marker_22"),
   34. anchorU: 0.5,
   35. anchorV: 1,
   36. visible: true
   37. };
   38. // 新增marker1
   39. let markerBoy1 = await this.mapController.addMarker(markerOptions1);
   40. let boyImages1: map.PlayImageAnimation = new map.PlayImageAnimation();
   41. boyImages1.setDuration(1000);
   42. let resourceArray: Array<Resource> = new Array();
   43. // 需要替换您自己的资源图片，存放在resources/base/media目录下
   44. resourceArray.push($r("app.media.side_0"));
   45. resourceArray.push($r("app.media.side_1"));
   46. resourceArray.push($r("app.media.side_2"));
   47. resourceArray.push($r("app.media.side_3"));
   48. resourceArray.push($r("app.media.side_4"));
   49. resourceArray.push($r("app.media.side_5"));
   50. resourceArray.push($r("app.media.side_6"));
   51. resourceArray.push($r("app.media.side_7"));
   52. resourceArray.push($r("app.media.side_8"));
   53. resourceArray.push($r("app.media.side_9"));
   54. resourceArray.push($r("app.media.side_10"));
   55. resourceArray.push($r("app.media.side_11"));
   56. resourceArray.push($r("app.media.side_12"));
   57. resourceArray.push($r("app.media.side_13"));
   58. resourceArray.push($r("app.media.side_14"));
   59. resourceArray.push($r("app.media.side_15"));
   60. resourceArray.push($r("app.media.side_16"));
   61. resourceArray.push($r("app.media.side_17"));
   62. resourceArray.push($r("app.media.side_18"));
   63. resourceArray.push($r("app.media.side_19"));
   64. resourceArray.push($r("app.media.side_20"));
   65. await boyImages1.addImages(resourceArray);
   66. boyImages1.setRepeatCount(-1);

   68. // marker1添加动画
   69. markerBoy1.setAnimation(boyImages1);
   70. markerBoy1.startAnimation();

   72. // marker2的参数
   73. let markerOptions2: mapCommon.MarkerOptions = {
   74. position: {
   75. latitude: 31.99227173519985,
   76. longitude: 118.7622219990476
   77. },
   78. icon: $r("app.media.track_setting_sport_map_marker_22"),
   79. anchorU: 0.5,
   80. anchorV: 1,
   81. visible: false
   82. };
   83. // 新增marker2
   84. let markerBoy2 = await this.mapController.addMarker(markerOptions2);
   85. let boyImages2: map.PlayImageAnimation = new map.PlayImageAnimation();
   86. boyImages2.setDuration(1000);
   87. let resourceArray2: Array<Resource> = new Array();
   88. // 需要替换您自己的资源图片，存放在resources/base/media目录下
   89. resourceArray2.push($r("app.media.behavior_front_cycling_boy_000"));
   90. resourceArray2.push($r("app.media.behavior_front_cycling_boy_001"));
   91. resourceArray2.push($r("app.media.behavior_front_cycling_boy_002"));
   92. resourceArray2.push($r("app.media.behavior_front_cycling_boy_003"));
   93. resourceArray2.push($r("app.media.behavior_front_cycling_boy_004"));
   94. resourceArray2.push($r("app.media.behavior_front_cycling_boy_005"));
   95. resourceArray2.push($r("app.media.behavior_front_cycling_boy_006"));
   96. resourceArray2.push($r("app.media.behavior_front_cycling_boy_007"));
   97. resourceArray2.push($r("app.media.behavior_front_cycling_boy_008"));
   98. resourceArray2.push($r("app.media.behavior_front_cycling_boy_009"));
   99. resourceArray2.push($r("app.media.behavior_front_cycling_boy_010"));
   100. resourceArray2.push($r("app.media.behavior_front_cycling_boy_011"));
   101. resourceArray2.push($r("app.media.behavior_front_cycling_boy_012"));
   102. resourceArray2.push($r("app.media.behavior_front_cycling_boy_013"));
   103. resourceArray2.push($r("app.media.behavior_front_cycling_boy_014"));
   104. resourceArray2.push($r("app.media.behavior_front_cycling_boy_015"));
   105. resourceArray2.push($r("app.media.behavior_front_cycling_boy_016"));
   106. resourceArray2.push($r("app.media.behavior_front_cycling_boy_017"));
   107. resourceArray2.push($r("app.media.behavior_front_cycling_boy_018"));
   108. await boyImages2.addImages(resourceArray2);
   109. boyImages2.setRepeatCount(-1);
   110. // marker2添加动画
   111. markerBoy2.setAnimation(boyImages2);
   112. markerBoy2.startAnimation();

   114. let points: Array<mapCommon.LatLng> = new Array();
   115. points.push({ latitude: 31.99685233070878, longitude: 118.75846023442728 });
   116. points.push({ latitude: 31.99671325810786, longitude: 118.75846738985165 });
   117. points.push({ latitude: 31.99659191076709, longitude: 118.7585347621686 });
   118. points.push({ latitude: 31.99648202537233, longitude: 118.7586266510386 });
   119. points.push({ latitude: 31.99637707201552, longitude: 118.75872004590596 });
   120. points.push({ latitude: 31.996278207010903, longitude: 118.75880449946251 });
   121. points.push({ latitude: 31.996187481969695, longitude: 118.7588781960278 });
   122. points.push({ latitude: 31.996092248919354, longitude: 118.75895330554488 });
   123. points.push({ latitude: 31.995962740450565, longitude: 118.75904721407304 });
   124. points.push({ latitude: 31.995792921394, longitude: 118.75916904998051 });
   125. points.push({ latitude: 31.995601885713416, longitude: 118.7593235241019 });
   126. points.push({ latitude: 31.995398221178277, longitude: 118.75949998588176 });
   127. points.push({ latitude: 31.995185902197715, longitude: 118.7596871082939 });
   128. points.push({ latitude: 31.994983473052656, longitude: 118.75987334062296 });
   129. points.push({ latitude: 31.99482433699269, longitude: 118.76002095184032 });
   130. points.push({ latitude: 31.994709073721708, longitude: 118.76012902920532 });
   131. points.push({ latitude: 31.99460732100702, longitude: 118.76023892576234 });
   132. points.push({ latitude: 31.99449284962087, longitude: 118.7603694232856 });
   133. points.push({ latitude: 31.99435358179254, longitude: 118.76053622438056 });
   134. points.push({ latitude: 31.99420771148339, longitude: 118.76072790126692 });
   135. points.push({ latitude: 31.994075194901523, longitude: 118.7609100960977 });
   136. points.push({ latitude: 31.993952686158877, longitude: 118.7610741329013 });
   137. points.push({ latitude: 31.993840180644217, longitude: 118.7612193418965 });
   138. points.push({ latitude: 31.993733787150244, longitude: 118.76135383115654 });
   139. points.push({ latitude: 31.993617206525155, longitude: 118.76150529647698 });

   141. // 动态轨迹的入参
   142. let traceOptions: mapCommon.TraceOverlayParams = {
   143. // 轨迹点
   144. points: points,
   145. // 轨迹的动画时长
   146. animationDuration: 5000,
   147. // 相机是否跟随动画移动
   148. isMapMoving: true,
   149. // 轨迹的颜色
   150. color: 0xAAFFAA00,
   151. // 轨迹的宽度
   152. width: 20,
   153. // 轨迹的动画回调（回调轨迹点的index）
   154. animationCallback: (pointIndex) => {
   155. // 换成骑行
   156. if (pointIndex === 10) {
   157. markerBoy1.setVisible(false);
   158. markerBoy2.setVisible(true);
   159. }
   160. }
   161. }
   162. let markers: Array<map.Marker> = new Array();
   163. markers.push(markerBoy1, markerBoy2);
   164. // 新增轨迹点动画
   165. try {
   166. let traceOverlay = await this.mapController.addTraceOverlay(traceOptions, markers);
   167. } catch (e) {
   168. console.error(`Failed to create the traceOverlay, code is：${e.code}, message is ${e.message}`);
   169. }
   170. } else {
   171. console.error(`Failed to initialize the map, code is：${err.code}, message is ${err.message}`);
   172. }
   173. }
   174. }

   176. build() {
   177. Stack() {
   178. Column() {
   179. MapComponent({
   180. mapOptions: this.mapOptions,
   181. mapCallback: this.callback,
   182. }).width('100%').height('100%');
   183. }.width('100%')
   184. }.height('100%')
   185. }
   186. }
   ```