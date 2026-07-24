## 场景介绍

当用户希望限制用户访问某些特定应用时，可以调用限制应用访问的接口。根据参数中传入的token以及限制类型（允许/禁用），可以限制用户对禁用名单中应用的访问，或只允许用户访问允许清单中的应用。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4f/v3/zO-07DmNTbKfHeLF-K5zKQ/zh-cn_image_0000002471465318.png?HW-CC-KV=V1&HW-CC-Date=20260414T033329Z&HW-CC-Expire=86400&HW-CC-Sign=695501D7D1508D404B74D3D81802D2C1992530C12BEFE4A56C9D45817CC5D1C3)

流程说明：

1. 应用调用设置应用访问限制的接口，拉起健康使用设备查询开发者是否已申请权限，以及用户是否授权。

2. 若开发者没有权限或用户没有授权，则抛出相应错误码。若开发者有权限且用户已授权，则解析参数中传入的名单类型以及token，对应用做限制处理，返回处理结果。

## 接口说明

限制应用访问的关键接口如下表所示，具体API说明详见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-arkts)。

展开

| 接口名 | 描述 |
| --- | --- |
| [setAppsRestriction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-guardservice#section48957119226)(appInfo: [AppInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-guardservice#section76401996131), restrictionType: [RestrictionType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-guardservice#section119174813532)): Promise<void> | 可根据传入应用token数组，以及限制类型（允许/禁用），来决定是对应用数组做限制，还是对应用数组之外的做限制 |

注意

**定义释义：**

如果传的是禁用清单，则对禁用清单里的应用做限制。

如果传的是允许清单，则对允许清单以外的应用做限制。

**边界场景：**

1、如果传入的应用列表为空，限制类型为禁用清单，则不对任何应用做限制。该场景相当于没有开启有效管控。

2、如果传入的应用列表为空，限制类型为允许清单，则是对除了系统内置允许清单应用（如时钟、电话等）、管控发起应用本身，已授权的管控应用和健康使用设备之外的所有应用做限制。

3、对同一个管控应用，如果反复调用该接口做限制（不管是允许清单还是禁用清单），均以最新的一次的限制来生效。

## 开发前提

设置应用访问限制需要申请用户授权，请先参考[请求用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/screentimeguard-request-user-auth)章节完成用户授权。

## 开发步骤

1. 导入相关模块。

收起

自动换行

深色代码主题

复制

```
1. import { guardService, appPicker } from '@kit.ScreenTimeGuardKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { BusinessError } from '@kit.BasicServicesKit';
```

2. 调用setAppsRestriction，设置应用访问限制。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct TestPage {
4. build() {
5. Column() {
6. Button("TestSetAppsRestriction")
7. .onClick(async () => {
8. try {
9. // 先调用startAppPicker获取相应应用的token
10. const tokens = await appPicker.startAppPicker(this.getUIContext().getHostContext(), { appTokens: [] });

12. const appInfo: guardService.AppInfo = { appTokens: tokens };
13. const restrictionType: guardService.RestrictionType = guardService.RestrictionType.BLOCKLIST_TYPE;
14. await guardService.setAppsRestriction(appInfo, restrictionType);
15. } catch (err) {
16. const message = (err as BusinessError).message;
17. const code = (err as BusinessError).code;
18. hilog.error(0x0000, `ScreenTimeGuard:setAppsRestriction`, `setAppsRestriction failed with error code: ${code}, message: ${message}`)
19. }
20. })
21. }
22. }
23. }
```