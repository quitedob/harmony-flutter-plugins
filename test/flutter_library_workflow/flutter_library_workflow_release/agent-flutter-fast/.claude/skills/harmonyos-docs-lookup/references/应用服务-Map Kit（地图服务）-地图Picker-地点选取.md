## 场景介绍

本章节将向您介绍如何集成地点选取控件，您无需自己开发地图页面，可快速实现地点选取的能力。该控件不支持在智能表设备中调用。

|  |  |
| --- | --- |
| **图1** 地点选取页 | **图2** 地点选取 |

## 约束与限制

使用该功能需满足以下条件：

* 仅支持手机、平板和2in1设备。

## 接口说明

地点选取控件功能主要由[sceneMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap)命名空间下的[chooseLocation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section927375116348)方法提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap)。

展开

| 接口名 | 描述 |
| --- | --- |
| [LocationChoosingOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section1313113517227) | 地点选取的参数。 |
| [chooseLocation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section927375116348)(context: common.[UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext), options: [LocationChoosingOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section1313113517227)): Promise<[LocationChoosingResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section0471517192216)> | 地点选取。 |
| [LocationChoosingResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section0471517192216) | 地点选取的返回结果。 |

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { sceneMap } from '@kit.MapKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   3. import { common } from '@kit.AbilityKit';
   ```
2. 创建地点选取参数，调用[chooseLocation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section927375116348)方法拉起地点选取页。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let locationChoosingOptions: sceneMap.LocationChoosingOptions = {
   2. // 地图中心点坐标
   3. location: {
   4. latitude: 39.91804051376904,
   5. longitude: 116.3970536796932
   6. },
   7. // 展示搜索控件
   8. searchEnabled: true,
   9. // 展示附近POI
   10. showNearbyPoi: true
   11. };
   12. // 拉起地点选取页
   13. sceneMap.chooseLocation(this.getUIContext().getHostContext() as common.UIAbilityContext,
   14. locationChoosingOptions).then((data) => {
   15. console.info("ChooseLocation", "Succeeded in choosing location.");
   16. }).catch((err: BusinessError) => {
   17. console.error("ChooseLocation", `Failed to choose location, code: ${err.code}, message: ${err.message}`);
   18. });
   ```