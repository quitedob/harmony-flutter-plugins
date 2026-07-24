## 场景介绍

本章节将向您介绍如何在应用中添加自定义样式的地图。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/49/v3/CL_umDVfTGKfp2AkWI1_nw/zh-cn_image_0000002542422967.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031522Z&HW-CC-Expire=86400&HW-CC-Sign=8B63C071001DC8F53808587647623D1E05170405AA8B43A6D6A5A191115B3A54 "点击放大")

## 接口说明

自定义样式功能主要由[CustomMapStyleOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section13899143818719)、[setCustomMapStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section70103143520)提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section70103143520)。

展开

| 接口名 | 描述 |
| --- | --- |
| [CustomMapStyleOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section13899143818719) | 自定义样式参数。 |
| [setCustomMapStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section70103143520)(customMapStyleOptions: [mapCommon.CustomMapStyleOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section13899143818719)): Promise<void> | 将地图样式修改为自定义样式。 |

## 开发步骤

Map Kit提供两种方法设置自定义地图样式：

* 设置样式ID：使用[Petal Maps Studio](https://developer.petalmaps.com/console/studio/)管理地图样式，并使用样式ID将它们链接到您的地图上。您可以在[Petal Maps Studio](https://developer.petalmaps.com/console/studio/)上创建新样式，或导入现有样式定义。样式一旦发布，使用此样式的应用都会自动应用新样式。
* 设置样式内容：通过传入自定义JSON更改地图样式，JSON的定义参见[样式参考](/consumer/cn/doc/harmonyos-guides/map-style#section156991344101012)。

### 设置样式ID

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { MapComponent, mapCommon, map } from '@kit.MapKit';
   2. import { AsyncCallback, BusinessError } from '@kit.BasicServicesKit';
   ```
2. 创建样式ID。
   1. 登录[Petal Maps Studio](https://developer.petalmaps.com/console/studio/)。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f7/v3/1U53aEXrSsGroQyjpIPZaw/zh-cn_image_0000002485000274.png?HW-CC-KV=V1&HW-CC-Date=20260414T031522Z&HW-CC-Expire=86400&HW-CC-Sign=5AD555990505F684B9134A30E81706C7E96A04326BF37C9FBCE73C63B7A7A280 "点击放大")

   2. 点击“Create map”创建自定义样式。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8a/v3/yvPHbJFzRVuJ-gmf6FpuYQ/zh-cn_image_0000002485160182.png?HW-CC-KV=V1&HW-CC-Date=20260414T031522Z&HW-CC-Expire=86400&HW-CC-Sign=9CBBA8D06875B4BB4642918FF6D6B0CE5A2DBA3839F3809FDF048567D83415A6 "点击放大")

   3. 导入JSON样式文件，点击“Import”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bd/v3/hM7Ka5a4T6OAz9yBcMe6KQ/zh-cn_image_0000002485160334.png?HW-CC-KV=V1&HW-CC-Date=20260414T031522Z&HW-CC-Expire=86400&HW-CC-Sign=34461676F511D534CF72C6D2D20E4FC6A3B408A6C908896AFA533A6E4919CE69 "点击放大")

   4. 在编辑器里修改样式。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/16/v3/3B7G2hrDTiizVmsHIVNJmA/zh-cn_image_0000002517200219.png?HW-CC-KV=V1&HW-CC-Date=20260414T031522Z&HW-CC-Expire=86400&HW-CC-Sign=395F9AE137494FB134910C0FB1C2420B8DFA5164C7BB97B31E9522F46037D1CC "点击放大")

   5. 点击“SAVE”生成预览ID，预览ID在编辑样式时会重新生成，您可以通过预览ID测试样式效果。点击“PUBLISH”发布生成样式ID，样式ID是唯一ID，一旦发布生效不会变化。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7c/v3/JS0DLaOrQV6ulncAr8LJbA/zh-cn_image_0000002485160230.png?HW-CC-KV=V1&HW-CC-Date=20260414T031522Z&HW-CC-Expire=86400&HW-CC-Sign=4CB99F22CB899CAC0B1F45A4AEFC2B8D29312A10C11B61E1A16F161DFB0A6AA7 "点击放大")

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f1/v3/yI7anS-TTZeS7ZvAELn6gA/zh-cn_image_0000002517200129.png?HW-CC-KV=V1&HW-CC-Date=20260414T031522Z&HW-CC-Expire=86400&HW-CC-Sign=33544ACC9F3439DADE14C80CF821836026F83AFFB22D78428F17A739CD719D1B "点击放大")
3. Map Kit提供两种方法设置样式ID：
   * 在创建地图后设置样式ID

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. @Entry
     2. @Component
     3. struct CustomMapStyleDemo {
     4. private TAG = "CustomMapStyleDemo";
     5. private mapOptions?: mapCommon.MapOptions;
     6. private mapController?: map.MapComponentController;
     7. private callback?: AsyncCallback<map.MapComponentController>;

     9. aboutToAppear(): void {
     10. // 地图初始化参数
     11. this.mapOptions = {
     12. position: {
     13. target: {
     14. latitude: 31.984410259206815,
     15. longitude: 118.76625379397866
     16. },
     17. zoom: 15
     18. }
     19. };
     20. this.callback = async (err, mapController) => {
     21. if (!err) {
     22. this.mapController = mapController;
     23. // 自定义样式参数，styleId需要替换为您自己的样式ID或者预览ID，样式ID或者预览ID可在Petal Maps Studio平台上创建
     24. let param: mapCommon.CustomMapStyleOptions = {
     25. styleId: "XXX"
     26. };
     27. // 设置自定义样式
     28. await this.mapController.setCustomMapStyle(param).then(() => {
     29. console.info(this.TAG + `setCustomMapStyle OK`);
     30. }).catch((error: BusinessError) => {
     31. console.error(this.TAG + `Failed in getting CustomMapStyle, code is：${error.code},message is ${error.message}`);
     32. })
     33. } else {
     34. console.error(`Failed to initialize the map, code is：${err.code}, message is ${err.message}`);
     35. }
     36. };
     37. }

     39. build() {
     40. Stack() {
     41. Column() {
     42. MapComponent({ mapOptions: this.mapOptions, mapCallback: this.callback });
     43. }.width('100%')
     44. }.height('100%')
     45. }
     46. }
     ```
   * 在初始化地图时设置样式ID

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. @Entry
     2. @Component
     3. struct CustomMapStyleDemo {
     4. private mapOptions?: mapCommon.MapOptions;
     5. private mapController?: map.MapComponentController;
     6. private callback?: AsyncCallback<map.MapComponentController>;

     8. aboutToAppear(): void {
     9. // 地图初始化参数
     10. this.mapOptions = {
     11. position: {
     12. target: {
     13. latitude: 31.984410259206815,
     14. longitude: 118.76625379397866
     15. },
     16. zoom: 15
     17. },
     18. // 自定义样式参数，styleId需要替换为您自己的样式ID或者预览ID，样式ID或者预览ID可在Petal Maps Studio平台上创建
     19. styleId: "XXX"
     20. };
     21. this.callback = async (err, mapController) => {
     22. if (!err) {
     23. this.mapController = mapController;
     24. } else {
     25. console.error(`Failed to initialize the map, code is：${err.code}, message is ${err.message}`);
     26. }
     27. };
     28. }

     30. build() {
     31. Stack() {
     32. Column() {
     33. MapComponent({ mapOptions: this.mapOptions, mapCallback: this.callback });
     34. }.width('100%')
     35. }.height('100%')
     36. }
     37. }
     ```

     设置样式ID之后效果如下：

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/85/v3/NUKGst3NQ1aQpHPHhgIUFA/zh-cn_image_0000002510983146.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031522Z&HW-CC-Expire=86400&HW-CC-Sign=91D2DA62A1DF9C6ED9EEE35ABC47603E19255F06DAB73D2C55F8E42B29AC9103 "点击放大")

### 设置样式内容

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { MapComponent, mapCommon, map } from '@kit.MapKit';
   2. import { AsyncCallback } from '@kit.BasicServicesKit';
   ```
2. 设置样式内容。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct CustomMapStyleDemo {
   4. private mapOptions?: mapCommon.MapOptions;
   5. private mapController?: map.MapComponentController;
   6. private callback?: AsyncCallback<map.MapComponentController>;

   8. aboutToAppear(): void {
   9. // 地图初始化参数
   10. this.mapOptions = {
   11. position: {
   12. target: {
   13. latitude: 31.984410259206815,
   14. longitude: 118.76625379397866
   15. },
   16. zoom: 15
   17. }
   18. };
   19. this.callback = async (err, mapController) => {
   20. if (!err) {
   21. this.mapController = mapController;
   22. // 自定义样式参数
   23. let param: mapCommon.CustomMapStyleOptions = {
   24. styleContent: `[{
   25. "mapFeature": "landcover.natural",
   26. "options": "geometry.fill",
   27. "paint": {
   28. "color": "#8FBC8F"
   29. }},
   30. {
   31. "mapFeature": "water",
   32. "options": "geometry.fill",
   33. "paint": {
   34. "color": "#4682B4"
   35. }}]`
   36. };
   37. // 设置自定义样式
   38. await this.mapController.setCustomMapStyle(param);
   39. } else {
   40. console.error(`Failed to initialize the map, code is：${err.code}, message is ${err.message}`);
   41. }
   42. };
   43. }

   45. build() {
   46. Stack() {
   47. Column() {
   48. MapComponent({ mapOptions: this.mapOptions, mapCallback: this.callback });
   49. }.width('100%')
   50. }.height('100%')
   51. }
   52. }
   ```

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8c/v3/yjZ0i1IyQjSej2eAr635IA/zh-cn_image_0000002510983208.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031522Z&HW-CC-Expire=86400&HW-CC-Sign=E01903BE8189BE44ED89DD4AFC1FB8FA7CE6239DA3D1A2C7F3D4BD24C76A2AA7 "点击放大")

### 样式参考

自定义地图样式JSON内容通过下列4个元素来定义地图样式：

* mapFeature：地图要素
* options：元素选项
  + geometry.fill：几何填充
  + geometry.stroke：几何描边
  + geometry.icon：几何图标
  + labels.text.fill：文本填充
  + labels.text.stroke：文本描边
* paint：绘制属性
  + color：颜色，16进制颜色，例如“#FFFF00”
  + weight：线条宽度。整型值，[0, 8]，默认为0，大于0表示加宽
  + saturation：饱和度。整型值，[-100, 100]，默认为0
  + lightness：亮度。整型值，[-100, 100]，默认为0
  + icon-type：图标类型，目前支持night、simple、standard
* visibility：可见属性，默认为可见
  + true：可见
  + false：不可见

下列各表将向您展示支持修改的地图元素。

说明

* 图标类型icon-type支持范围为：standard/night/simple。
* 饱和度saturation和亮度lightness可在元素颜色color中进行配置。

1. All

   All代表全部，即所有类别的集合，支持能力范围同其他所有列表。
2. Administrative

   展开

   | 元素类型  Feature type | Geometry | | | | Labels | | | | Icon |
   | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
   | 填充颜色  fill.  color | 填充宽度  fill.  weight | 描边颜色  stroke.  color | 描边宽度  stroke.  weight | 填充颜色  fill.  color | 文本大小  fill.  weight | 描边颜色  stroke.  color | 描边大小  stroke.  weight | 图标类型  icon-type |
   | Capital  首都 | - | - | - | - |  |  |  |  |  |
   | Country  国家 |  |  |  |  |  |  |  |  | - |
   | District  区/县 | - | - | - | - |  |  |  |  |  |
   | Locality  乡村、城镇 | - | - | - | - |  |  |  |  |  |
   | Major-city  1-4级城市 | - | - | - | - |  |  |  |  |  |
   | Province  省 |  |  |  |  |  |  |  |  | - |
3. Landcover

   展开

   | 元素类型  Feature type | Geometry | | Labels | | | |
   | --- | --- | --- | --- | --- | --- | --- |
   | 填充颜色  fill.color | 描边颜色  stroke.color | 填充颜色  fill.color | 文本大小  fill.weight | 描边颜色  stroke.color | 描边大小  stroke.weight |
   | Attraction  游乐场、动植物园等 |  | - |  |  |  |  |
   | Business  购物中心、商业区等 |  | - |  |  |  |  |
   | College  学校 |  | - |  |  |  |  |
   | Hospital  医院 |  | - |  |  |  |  |
   | Human-made  聚集区、小区、工业区、监狱地面等 |  |  |  |  |  |  |
   | Human-made  建筑物 |  |  | - | - | - | - |
   | Natural  陆地、岛屿、海滩、冰川等 |  | - |  |  |  |  |
   | Parkland  森林、公园、荒地、高尔夫球场等 |  | - |  |  |  |  |
4. Poi

   展开

   | 元素类型  Feature type | Labels | | | | Icon |
   | --- | --- | --- | --- | --- | --- |
   | 填充颜色  fill.color | 文本大小  fill.weight | 描边颜色  stroke.color | 描边大小  stroke.weight | 图标类型  icon-type |
   | Airport  飞机场 |  |  |  |  |  |
   | Automotive  汽修、充电桩、洗车等 |  |  |  |  |  |
   | Beauty  美容中心 |  |  |  |  |  |
   | Business  公司、商业楼等 |  |  |  |  |  |
   | Eating&drinking  饮食快餐 |  |  |  |  |  |
   | Health-care  医院、诊所、药店等 |  |  |  |  |  |
   | Leisure  休闲娱乐 |  |  |  |  |  |
   | Lodging  酒店、住宿点 |  |  |  |  |  |
   | Miscellaneous  自然地物 |  |  |  |  |  |
   | Natural  山峰、森林等 |  |  |  |  |  |
   | Public-service  医院、诊所、药店等 |  |  |  |  |  |
   | Railway  铁路 |  |  |  |  |  |
   | Shopping  购物中心、市场等 |  |  |  |  |  |
   | Sports-outdoor  户外运动、爬山、骑车等 |  |  |  |  |  |
   | Tourism  旅游景点、历史遗迹、教堂等 |  |  |  |  |  |
5. Road

   展开

   | 元素类型  Feature type | Geometry | | | | Labels | | | | Icon |
   | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
   | 填充颜色  fill.  color | 填充宽度  fill.  weight | 描边颜色  stroke.  color | 描边宽度  stroke.  weight | 填充颜色  fill.  color | 文本大小  fill.  weight | 描边颜色  stroke.  color | 描边大小  stroke.  weight | 图标类型  icon-type |
   | City-arterial  城市主干道 |  |  |  |  |  |  |  |  |  |
   | Highway  城市高速 |  |  |  |  |  |  |  |  |  |
   | Minor-road  市区内支线等 |  |  |  |  |  |  |  |  | - |
   | National  国道 |  |  |  |  |  |  |  |  |  |
   | Province  省道 |  |  |  |  |  |  |  |  |  |
   | Sidewalk  人行道 |  |  |  |  |  |  |  |  | - |
6. Trafficinfo

   展开

   | 元素类型  Feature type | Geometry | Labels | |
   | --- | --- | --- | --- |
   | 填充颜色  fill.color | 填充颜色  fill.color | 文本大小  fill.weight |
   | Closed  封路 |  |  |  |
7. Transit

   展开

   | 元素类型  Feature type | Geometry | | | | Labels | | | | Icon |
   | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
   | 填充颜色  fill.  color | 填充宽度  fill.  weight | 描边颜色  stroke.  color | 描边宽度  stroke.weight | 填充颜色  fill.  color | 文本大小  fill.  weight | 描边颜色  stroke.  color | 描边大小  stroke.weight | 图标类型  icon-type |
   | Airport  机场 |  | - | - | - |  |  |  |  |  |
   | Airport Runway  机场跑道 |  |  |  |  | - | - | - | - | - |
   | Airport Runway Taxiway  机场跑道滑行道 |  |  |  |  | - | - | - | - | - |
   | Bus  公交 | - | - | - | - |  |  |  |  |  |
   | Ferry-line  航线 |  | - | - | - |  |  |  |  | - |
   | Ferry-terminal  港口 |  | - | - | - |  |  |  |  |  |
   | Other  出租车、  出入口等 | - | - | - | - |  |  |  |  |  |
   | Rail-station  火车站、  高铁站 |  | - | - | - |  |  |  |  |  |
   | Railway  铁路线、  高铁线 |  |  |  |  | - | - | - | - | - |
   | Subway  地铁 |  |  |  |  |  |  |  |  |  |
   | Traffic\_light  交通灯 | - | - | - | - | - | - | - | - |  |
8. Water

   展开

   | 元素类型  Feature type | Geometry | Labels | |
   | --- | --- | --- | --- |
   | 填充颜色  fill.color | 填充颜色  fill.color | 文本大小  fill.weight |
   | Ocean  水系、海洋、湖泊、河流 |  |  |  |