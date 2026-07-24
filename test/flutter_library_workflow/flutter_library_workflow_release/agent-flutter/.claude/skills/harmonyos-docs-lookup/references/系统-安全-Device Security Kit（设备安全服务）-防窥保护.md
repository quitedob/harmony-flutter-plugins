## 场景介绍

支持应用根据屏幕窥视状态保护机主隐私，如拉起系统级蒙层遮盖窗口，非机主状态下不进行个性化推荐，隐藏浏览记录、支付记录、收藏记录等敏感信息。其中系统使用智能判断将长期通过人脸解锁手机的人作为防窥保护的机主。

## 开发前置条件

* 需要在设备开启人脸识别。
* 在设备上选择“设置 > 隐私与安全 > 防窥保护”，开启防窥保护开关。通过人脸验证后，打开需要加入保护的应用开关。

## 约束与限制

满足以下所有条件：

1. 本特性需要设备上存在防窥保护选项。开发者可通过在设备上选择“设置 > 隐私与安全 > 防窥保护”查看防窥保护选项。

2. HarmonyOS系统：HarmonyOS 6.0.0 Beta1及以上。

3. DevEco Studio版本：DevEco Studio 6.0.0 Beta1及以上。

4. HarmonyOS SDK版本: HarmonyOS 6.0.0 Beta1 SDK及以上。

5. 防窥保护功能使用智能判断，通过传感器判断您周边环境给您风险提醒。判断因素包括人脸距离设备是否在一定的范围内、人脸是否有遮挡、周围环境是否有充足的光线。当距离较近或较远、人脸被遮挡、周围环境较暗时，可能会引起识别误差，从而导致系统未提醒或者误提醒。如果您认为智能判断可能有误，您可以尝试调整位置和光线，重新使用人脸解锁手机等操作，并再次使用该功能帮助您防窥。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9e/v3/4Tzk5d_aSkSDCd9T5jpJIQ/zh-cn_image_0000002515108411.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T043401Z&HW-CC-Expire=86400&HW-CC-Sign=51B7DB5E855F4E7C24FCFA505A8115D7971A5B7262E3C916A6D6F6A82DE95838 "点击放大")

**流程说明：**

1. 用户在“设置 > 隐私与安全 > 防窥保护”中开启当前应用的防窥保护开关。
2. 调用isDlpAntiPeepSwitchOn()接口查询当前应用开关的状态。
3. 调用on()接口注册防窥保护通知：3.1 机主自身注视屏幕时反馈非窥视状态；3.2 机主与非机主同时注视屏幕时反馈被窥视状态。3.3 没有机主使用手机或机主分享场景，返回非窥视状态。
4. 手动调用getDlpAntiPeepInfo()接口返回当前应用的窥视状态。
5. 调用setAntiPeepMaskLayer(windowId: number)接口，拉起系统级蒙层。
6. 调用passDlpAntiPeepInfo()接口修改窥视状态，直到手机锁屏或应用退出前一直会返回非窥视状态。
7. 调用off()接口解除注册防窥保护通知。

## 接口说明

以下是获取防窥状态信息相关接口，更多接口及使用方法请参见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-dlpantipeep-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| isDlpAntiPeepSwitchOn(): Promise<boolean> | 检查是否打开防窥保护。 |
| on(type: 'dlpAntiPeep', callback: Callback<DlpAntiPeepStatus>): void | 订阅防窥保护状态通知。 |
| off(type: 'dlpAntiPeep', callback?: Callback<DlpAntiPeepStatus>): void | 解除订阅防窥保护状态通知。 |
| getDlpAntiPeepInfo(): DlpAntiPeepStatus | 获取当前应用的窥视状态。 |
| passDlpAntiPeepInfo(): void | 直到手机锁屏或应用退出前一直会返回非窥视状态。 |
| setAntiPeepMaskLayer(windowId: number): Promise<void> | 拉起系统级窗口蒙层遮盖。 |

## 开发步骤

说明

* 在开发准备过程中，需要申请权限：ohos.permission.DLP\_GET\_HIDE\_STATUS；用于获取当前应用使用过程中被非机主本人窥视屏幕相关状态信息。
* 面向合作企业开放，仅在允许名单内的固定应用可申请该权限，申请方式请参考：[申请使用受限权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions-in-acl)
* 开发者需向用户说明数据使用的目的、方式和范围。

1. 导入防窥保护模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { dlpAntiPeep } from '@kit.DeviceSecurityKit';
   2. import { window } from '@kit.ArkUI';
   3. import { common } from '@kit.AbilityKit';
   ```
2. 调用检查接口确认当前应用是否开启防窥保护，开启防窥保护时调用防窥保护订阅接口获取窥视状态信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. @State message: string = 'Dlp anti peep start';

   6. async callback(dlpAntiPeepStatus: dlpAntiPeep.DlpAntiPeepStatus) {
   7. if (dlpAntiPeepStatus == dlpAntiPeep.DlpAntiPeepStatus.PASS) {
   8. console.info(`DlpAntiPeepStatus is PASS.`);
   9. } else if (dlpAntiPeepStatus == dlpAntiPeep.DlpAntiPeepStatus.HIDE) { // 表示有人在窥屏，应用可以进行隐私保护操作。
   10. console.info(`DlpAntiPeepStatus is HIDE.`);
   11. await this.setMaskLayer();
   12. }
   13. }

   15. private async setMaskLayer(): Promise<void> {
   16. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
   17. let windowClass: window.Window;
   18. try {
   19. windowClass = await window.getLastWindow(context);
   20. } catch(err) {
   21. console.error('error', err.code, err.message);
   22. return;
   23. }
   24. let windowId: number;
   25. try {
   26. windowId = windowClass.getWindowProperties().id;
   27. } catch (err) {
   28. console.error('Failed to get window properties:', err);
   29. return;
   30. }
   31. try {
   32. await dlpAntiPeep.setAntiPeepMaskLayer(windowId); // 使用获取到的 windowID 设置防窥保护蒙层
   33. } catch (error) {
   34. console.error(`setAntiPeepMaskLayer failed. error code is ${JSON.stringify(error)}`);
   35. }
   36. }

   38. async testAntiPeep() {
   39. let isOpen: boolean;
   40. try {
   41. isOpen = await dlpAntiPeep.isDlpAntiPeepSwitchOn();
   42. } catch (err) {
   43. console.error('isDlpAntiPeepSwitchOn failed:', err);
   44. return;
   45. }
   46. if (isOpen) {
   47. console.info(`isDlpAntiPeepSwitchOn is true.`); // 表示当前应用的防窥保护开关已开启。
   48. } else {
   49. console.info(`isDlpAntiPeepSwitchOn is false.`);// 表示当前应用的防窥保护开关未开启。
   50. return;
   51. }
   52. try {
   53. dlpAntiPeep.on('dlpAntiPeep', this.callback); // 订阅防窥保护通知。
   54. let result = dlpAntiPeep.getDlpAntiPeepInfo(); // 主动调用接口获取当前应用的窥视状态。
   55. if (result === dlpAntiPeep.DlpAntiPeepStatus.HIDE) { // 表示有人在窥屏，应用可以进行隐私保护操作。
   56. console.info(`getDlpAntiPeepInfo is HIDE.`);
   57. await this.setMaskLayer(); //拉起蒙层
   58. } else if (result === dlpAntiPeep.DlpAntiPeepStatus.PASS) {
   59. console.info(`getDlpAntiPeepInfo is PASS.`);
   60. }
   61. dlpAntiPeep.passDlpAntiPeepInfo(); // 改变防窥保护通知提示状态，有人窥屏时不再提示。
   62. dlpAntiPeep.off('dlpAntiPeep', this.callback); // 取消订阅防窥保护通知，不再发防窥保护通知。
   63. } catch (err) {
   64. console.error('error', err.code, err.message);
   65. }
   66. }

   68. build() {
   69. Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center}) {
   70. Button() {
   71. Text('Dlp_anti_peep_test')
   72. .fontSize(30)
   73. .fontWeight(FontWeight.Bold)
   74. }.type(ButtonType.Capsule)
   75. .margin({
   76. top: 30
   77. })
   78. .width('80%')
   79. .height('10%')
   80. .backgroundColor(Color.White)
   81. .onClick(() => {
   82. this.testAntiPeep();
   83. })
   84. }
   85. }
   86. }
   ```