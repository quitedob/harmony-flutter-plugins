## 场景介绍

当用户希望解除用户访问某些特定应用的限制时，可以调用解除应用访问限制的接口。根据参数中传入的token以及限制类型（允许/禁用），将允许/禁用清单解析后，解除对应的应用的限制。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7b/v3/Nor3wLn1RUyqgh7HVS90ww/zh-cn_image_0000002471465324.png?HW-CC-KV=V1&HW-CC-Date=20260414T033333Z&HW-CC-Expire=86400&HW-CC-Sign=876924A4E91929A6F6A9E6707C222DEF7D760B3612A4E0E432D4BAE10AC18235)

流程说明：

1. 应用调用解除应用访问限制的接口，拉起健康使用设备查询开发者是否已申请权限，以及用户是否授权。

2. 若开发者没有权限或用户没有授权，则抛出相应错误码。若开发者有权限且用户已授权，则解析参数中传入的名单类型以及token。

3. 该接口判断传入的应用列表，是否其中有应用被其他三方应用或健康使用设备设置的策略给管控，若有，则对应的应用不解除限制。

4. 对剩余的应用解除限制，返回处理结果。

## 接口说明

解除应用访问限制的关键接口如下表所示，具体API说明详见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-arkts)。

展开

| 接口名 | 描述 |
| --- | --- |
| [releaseAppsRestriction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-guardservice#section0894037112812)(appInfo: [AppInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-guardservice#section76401996131), restrictionType: [RestrictionType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-guardservice#section119174813532)): Promise<void> | 可根据传入应用token数组，以及限制类型（允许/禁用），来解除对应应用访问限制 |

注意

**定义释义：**

如果传的是禁用清单，则对禁用清单里的应用做解除限制。

如果传的是允许清单，则对允许清单以外的应用做解除限制。

**边界场景：**

1、如果传入的应用列表为空，限制类型为禁用清单，则不对任何应用做解除限制。

2、如果传入的应用列表为空，限制类型为允许清单，则是对除了系统内置允许清单应用（如时钟、电话等）、管控发起应用本身，已授权的管控应用和健康使用设备之外的所有应用做解除限制。

3、同一个管控应用的限制和解除限制需对称使用，即解除限制必须和其限制的类型匹配上，如不匹配，则为参数错误；如果之前没有做过setAppsRestriction管控，也为参数错误。

4、如果要对之前用禁用清单方式做限制的应用做解除限制，则传入的应用列表需包含所有的禁用清单应用，才可全部解除。

5、如果按禁用清单方式解除限制时，传入的应用名单里如果包含了不在之前限制禁用清单中的应用（或者传入token无效），则为参数错误。

6、如果按允许清单方式解除限制时，传入的应用名单里如果包含了不在之前允许清单中的应用（或者传入token无效），则为参数错误。

## 开发前提

解除应用访问限制需要申请用户授权，请先参考[请求用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/screentimeguard-request-user-auth)章节完成用户授权。

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

2. 调用releaseAppsRestriction，解除应用访问限制。

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
6. Button("TestReleaseAppsRestriction")
7. .onClick(async () => {
8. try {
9. // 先调用startAppPicker获取相应应用的token
10. const tokens = await appPicker.startAppPicker(this.getUIContext().getHostContext(), { appTokens: [] });

12. const appInfo: guardService.AppInfo = { appTokens: tokens };
13. const restrictionType: guardService.RestrictionType = guardService.RestrictionType.BLOCKLIST_TYPE;
14. await guardService.releaseAppsRestriction(appInfo, restrictionType);
15. } catch (err) {
16. const message = (err as BusinessError).message;
17. const code = (err as BusinessError).code;
18. hilog.error(0x0000, `ScreenTimeGuard:releaseAppsRestriction`, `releaseAppsRestriction failed with error code: ${code}, message: ${message}`)
19. }
20. })
21. }
22. }
23. }
```