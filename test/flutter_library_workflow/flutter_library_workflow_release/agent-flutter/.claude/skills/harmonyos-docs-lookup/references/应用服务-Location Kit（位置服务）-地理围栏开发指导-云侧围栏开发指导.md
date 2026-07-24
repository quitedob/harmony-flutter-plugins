## 概述

云侧围栏是指开发者直接使用云侧公共围栏，当用户进入这个区域，在移动设备上进行有针对性的提醒。

## 开通云侧围栏服务

在开通定位服务前，请先参考“[应用开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-dev-overview)”创建项目和应用工程。

说明

从HarmonyOS NEXT Developer Beta2起，开发者无需配置公钥指纹和Client ID。

**操作步骤**

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)网站，选择“开发与服务”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/40/v3/HRPaAwz5SmiPuSlEaNLBHA/zh-cn_image_0000002484615112.png?HW-CC-KV=V1&HW-CC-Date=20260414T031442Z&HW-CC-Expire=86400&HW-CC-Sign=110839DAEE852D69C334534C93FF90A96B2952FD5692E1BC46C4E79743A31EA4 "点击放大")
2. 在项目列表中找到您的项目，在项目下的应用列表中选择需要配置定位服务参数的应用。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/14/v3/a1xOQSrRRUevUqj0SsA6aA/zh-cn_image_0000002516935581.png?HW-CC-KV=V1&HW-CC-Date=20260414T031442Z&HW-CC-Expire=86400&HW-CC-Sign=035D9A7700338EF58CFC618A30F036C96EE0C286BE51360D936B9573C0317A93 "点击放大")

3. 在左侧导航栏选择“定位服务”，并点击收藏。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/aa/v3/-fCCTrtuRQmFKZZsiYqcqA/zh-cn_image_0000002484838472.png?HW-CC-KV=V1&HW-CC-Date=20260414T031442Z&HW-CC-Expire=86400&HW-CC-Sign=BD5AF9DB557680FDC95DE55DC24AC3149E8FD7CFD33D1FB3950AD901267DDF80 "点击放大")

4. 在左侧导航栏选择“构建 > 定位服务”。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c0/v3/jPcniMV0TBWIlsFK66pLNw/zh-cn_image_0000002516843591.png?HW-CC-KV=V1&HW-CC-Date=20260414T031442Z&HW-CC-Expire=86400&HW-CC-Sign=33DC9990E3AFD7E37231FCBF9A4154A65119C1C9F2267AC83A0AF1998EFD1370 "点击放大")

说明

如果需要使用地理围栏，请确保已联系华为地图定位运营团队（locationkit@huawei.com）开通服务。

## 使用场景

1.开发者可以通过该围栏扩展能力来使用云侧公共围栏；

2.开发者首先需要在AGC（AppGallery Connect）平台定位服务选择右侧“添加围栏组触发”开始创建地理围栏。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/64/v3/5BFIXweLTDmt-y21kDxuqg/zh-cn_image_0000002484832834.png?HW-CC-KV=V1&HW-CC-Date=20260414T031442Z&HW-CC-Expire=86400&HW-CC-Sign=20FDB43E40AE358DB899522B1A836C0B86598FD454B8D6C20242AAE5179D0B9E "点击放大")

3.可以根据商圈、景点等类别，配置围栏组下发围栏策略；

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c4/v3/16_4jNdcRtWvkbkPVDws1Q/zh-cn_image_0000002517000627.png?HW-CC-KV=V1&HW-CC-Date=20260414T031442Z&HW-CC-Expire=86400&HW-CC-Sign=1111727A5F9104D31839DE9DEF908EDECD1AEB64B47F5584667343C1A36AED3A "点击放大")

4. 定位服务在满足围栏触发条件后，通过FenceExtensionAbility把围栏事件通知给APP，APP接收到围栏事件后完成相关的业务处理。

## 接口介绍

接口详情参见[FenceExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-fenceextensionability)。

展开

| 接口 | 描述 |
| --- | --- |
| onFenceStatusChange(transition: geoLocationManager.GeofenceTransition, additions: Record<string, string>): void | 接收系统通知的地理围栏事件，根据围栏事件类型和数据进行相应处理。 |
| onDestroy(): void | 接收FenceExtensionAbility的销毁事件并处理，会在FenceExtensionAbility销毁前回调。 |

## 开发步骤

要实现一个地理围栏扩展服务，开发者需要实现[FenceExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-fenceextensionability)的能力，具体步骤如下：

1. 在工程Module对应的ets目录下，右键选择“New > Directory”，新建一个目录并命名为fenceextensionability;
2. 在fenceextensionability目录，右键选择“New > File”，新建一个.ets文件并命名为MyFenceExtensionAbility.ets;
3. 打开MyFenceExtensionAbility.ets，导入FenceExtensionAbility的依赖包，自定义类继承FenceExtensionAbility并实现onFenceStatusChange和onDestroy接口;

   示例代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { FenceExtensionAbility, geoLocationManager } from '@kit.LocationKit';
   2. import { wantAgent } from '@kit.AbilityKit';
   3. import { notificationManager } from '@kit.NotificationKit';

   5. export default class MyFenceExtensionAbility extends FenceExtensionAbility {
   6. async onFenceStatusChange(transition: geoLocationManager.GeofenceTransition, additions: Record<string, string>): Promise<void> {
   7. super.onFenceStatusChange(transition, additions);

   9. // 接收围栏触发信息
   10. console.info('MyFenceExtensionAbility onFenceStatusChange');

   12. let poiId: string = additions['poiId'];// 围栏id，唯一标识，示例：'999287512272780934'
   13. let policyType: string = additions['policyType'];// 策略类型：'0'-普通策略;'1'-标签策略
   14. let policyResult: string = additions['policyResult'];// 策略结果：标签等策略的额外信息

   16. console.info(`poiId:${poiId},policyType:${policyType},policyResult:${policyResult}`);

   18. // 可以发送围栏业务通知
   19. let wantAgentInfo: wantAgent.WantAgentInfo = {
   20. wants: [
   21. {
   22. bundleName: 'com.huawei.hmos.locationtest.smartfence',
   23. abilityName: 'EntryAbility'
   24. } as Want
   25. ],
   26. actionType: wantAgent.OperationType.START_ABILITY,
   27. requestCode: 100
   28. };
   29. let wantAgentMy = await wantAgent.getWantAgent(wantAgentInfo);
   30. let notificationRequest: notificationManager.NotificationRequest = {
   31. id: 1,
   32. content: {
   33. notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
   34. normal: {
   35. title: `围栏通知`,
   36. text: `poiId:${poiId},policyType:${policyType},policyResult:${policyResult}`,
   37. }
   38. },
   39. notificationSlotType: notificationManager.SlotType.SOCIAL_COMMUNICATION,
   40. wantAgent: wantAgentMy
   41. };
   42. notificationManager.publish(notificationRequest);
   43. }

   45. onDestroy(): void {
   46. super.onDestroy();
   47. console.info('MyFenceExtensionAbility onDestroy');
   48. }
   49. }
   ```
4. 在工程Module对应的[module.json5配置文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file)中注册FenceExtensionAbility，type标签需要设置为fence，srcEntry标签表示当前FenceExtensionAbility组件所对应的代码路径。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "module": {
   3. "extensionAbilities": [
   4. {
   5. "name": "MyFenceExtensionAbility",
   6. "srcEntry": "./ets/fenceextensionability/MyFenceExtensionAbility.ets",
   7. "description": "MyFenceExtensionAbility",
   8. "type": "fence",
   9. "exported": false
   10. },
   11. ]
   12. }
   13. }
   ```