## 场景介绍

在用户需要为特定应用设置使用时长或使用限制策略的场景下，开发者通过调用拉起应用选择页的接口拉起选择页后，使得用户能够选择目标应用。在用户选择完毕并点击完成按钮后，接口会返回应用的token。开发者获取到目标应用的token后，可以根据token为选定应用配置管控策略。

## 用户体验设计

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/18/v3/R21LxGMPRDWgODfeqhyJDQ/zh-cn_image_0000002472614636.png?HW-CC-KV=V1&HW-CC-Date=20260414T033245Z&HW-CC-Expire=86400&HW-CC-Sign=55BAC4E643B1D82F7379F5E0A9F24252E8FF05B68E5F89347BADA357EE59E0D9 "点击放大")

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/59/v3/KzKu4CYiRCiUZ748QoaG2Q/zh-cn_image_0000002504894627.png?HW-CC-KV=V1&HW-CC-Date=20260414T033245Z&HW-CC-Expire=86400&HW-CC-Sign=ACD81347284193E0006CDB05E406B3B6A758BD43A890925948CC46F87BE9FB36 "点击放大")

流程说明：

1. 应用调用拉起应用选择页的接口，拉起健康使用设备查询开发者是否已申请权限，以及用户是否授权。
2. 若状态为未授权，则抛出对应错误码；若状态为已授权，应用将拉起应用选择列表，并根据传入应用token信息预勾选对应应用。
3. 应用选择页将用户选中的应用列表转化为token列表返回给调用接口的应用。

## 接口说明

拉起应用选择页关键接口如下表所示，具体API说明详见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-arkts)。

展开

| 接口名 | 描述 |
| --- | --- |
| [startAppPicker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-app-picker#section11584125219191)(context: common.Context, appSelection: [guardService.AppInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-guardservice#section76401996131)): Promise<string[]> | 拉起应用选择页。 |

说明

1. 应用选择页面中的应用列表不包含的系统应用包括：电话、联系人、设置、未成年模式等。
2. 应用选择页面中的应用列表不包含管控发起应用本身和已授权的管控应用。

## 开发前提

拉起应用选择页需要申请用户授权，请先参考[请求用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/screentimeguard-request-user-auth)章节完成用户授权。

## 开发步骤

1. 导入相关模块。

收起

自动换行

深色代码主题

复制

```
1. import { appPicker } from '@kit.ScreenTimeGuardKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { BusinessError } from '@kit.BasicServicesKit';
```

2. 调用startAppPicker，拉起应用选择页。

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
6. Button("TestStartAppPicker")
7. .onClick(async () => {
8. try {
9. await appPicker.startAppPicker(this.getUIContext().getHostContext(), { appTokens: [] });
10. } catch (err) {
11. const message = (err as BusinessError).message;
12. const code = (err as BusinessError).code;
13. hilog.error(0x0000, `ScreenTimeGuard:startAppPicker`, `startAppPicker failed error code: ${code}, message: ${message}`);
14. }
15. })
16. }
17. }
18. }
```