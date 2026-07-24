## 场景介绍

本章节将向您介绍如何集成地点详情展示控件，该控件为您提供了便捷的地点详情展示功能实现方案，无需自行开发地图页面。此外，该控件提供导航及打车服务入口，用户可点击“路线”按钮启动导航，或点击“打车”按钮发起打车。需要注意的是，该控件暂不支持在智能表设备上调用。

**图1** 地点详情   
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/eb/v3/xmWrhlYeQcq5BWhvWGDKlg/zh-cn_image_0000002546443053.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031727Z&HW-CC-Expire=86400&HW-CC-Sign=C46B4D8880E0294913154A9E58667DB80473BC304244E1C262BAC9E0701B67EE "点击放大")

## 约束与限制

使用该功能需满足以下条件：

* 仅支持手机、平板和2in1设备。

## 接口说明

地点详情控件功能主要由[sceneMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap)命名空间下的[queryLocation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section177377424221)方法提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap)。

展开

| 接口名 | 描述 |
| --- | --- |
| [LocationQueryOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section971194972117) | 查询地点详情的参数。 |
| [queryLocation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section177377424221)(context: common.[UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext), options: [LocationQueryOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section971194972117)): Promise<void> | 查询地点详情。 |

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
2. 创建查询地点详情参数，调用[queryLocation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section177377424221)方法拉起地点详情页。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 方式一：传入siteId
   2. let queryLocationOptions: sceneMap.LocationQueryOptions = {
   3. siteId: "922207154068557824"
   4. };
   5. // 拉起地点详情页
   6. sceneMap.queryLocation(this.getUIContext().getHostContext() as common.UIAbilityContext, queryLocationOptions)
   7. .then(() => {
   8. console.info("QueryLocation", "Succeeded in querying location.");
   9. })
   10. .catch((err: BusinessError) => {
   11. console.error("QueryLocation", `Failed to query Location, code: ${err.code}, message: ${err.message}`);
   12. });

   14. // 方式二：传入location和name
   15. let queryLocationOptions: sceneMap.LocationQueryOptions = {
   16. location: {
   17. latitude: 39.9175,
   18. longitude: 116.3972
   19. },
   20. name: '故宫博物院'
   21. };
   22. // 拉起地点详情页
   23. sceneMap.queryLocation(this.getUIContext().getHostContext() as common.UIAbilityContext, queryLocationOptions)
   24. .then(() => {
   25. console.info("QueryLocation", "Succeeded in querying location.");
   26. })
   27. .catch((err: BusinessError) => {
   28. console.error("QueryLocation", `Failed to query Location, code: ${err.code}, message: ${err.message}`);
   29. });
   ```