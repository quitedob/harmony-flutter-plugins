从API version 20开始，相机框架通过相机控制器，为应用在直播场景提供美颜、虚化等能力。

相机控制器为直播和视频通话场景设计，目前仅支持在前置镜头的录像模式下使用，最高可支持1080P分辨率和30fps帧率。

## 开发步骤

详细的API说明请参考[Camera](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera)。

1. 导入camera接口，接口中提供了相机相关的属性和方法，导入方法如下。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { camera } from '@kit.CameraKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 通过[isControlCenterSupported](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-controlcenterquery#iscontrolcentersupported20)接口，查询当前设备及当前场景是否支持相机控制器。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function isControlCenterSupported(videoSession: camera.VideoSession): boolean {
   2. let isSupported: boolean = videoSession.isControlCenterSupported();
   3. return isSupported;
   4. }
   ```
3. 通过[getSupportedEffectTypes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-controlcenterquery#getsupportedeffecttypes20)接口，查询当前设备及当前场景下，相机控制器支持的效果类型。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function getSupportedEffectTypes(videoSession: camera.VideoSession): Array<camera.ControlCenterEffectType> {
   2. let effectTypes: Array<camera.ControlCenterEffectType> = [];
   3. effectTypes = videoSession.getSupportedEffectTypes();
   4. return effectTypes;
   5. }
   ```
4. 若设备及场景支持相机控制器，使用[enableControlCenter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-controlcenter#enablecontrolcenter20)接口可启用或关闭控制器。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function enableControlCenter(videoSession: camera.VideoSession, enable: boolean): void {
   2. let isSupported: boolean = videoSession.isControlCenterSupported();
   3. if (isSupported) {
   4. videoSession.enableControlCenter(enable);
   5. }
   6. }
   ```
5. 使能相机控制器后，可以在状态栏看到新增的视频效果图标。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e2/v3/b-vD2HxAQ6WGqKAuLJAKbA/zh-cn_image_0000002540612064.png?HW-CC-KV=V1&HW-CC-Date=20260414T052409Z&HW-CC-Expire=86400&HW-CC-Sign=E831547B83B4C79BC0357F6D95368F8CD5E28C6DA712D7812305AA75FFE2D40C)
6. 点击视频效果图标，在弹出的二级页面中，用户可调节控制器支持的效果，如图所示为美颜和背景虚化。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cb/v3/kzk3LgdGSQOFCNVr4ITQ_g/zh-cn_image_0000002571172059.png?HW-CC-KV=V1&HW-CC-Date=20260414T052409Z&HW-CC-Expire=86400&HW-CC-Sign=B2F4DD4E5DF32E6D6A23B675EE7F87574480812F5C8412D09E8EA352E38791C6)

## 状态监听

使用相机控制器的过程中，应用可以监听控制器效果的使能状态。

通过注册[controlCenterEffectStatusChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-videosession#oncontrolcentereffectstatuschange20)的回调函数获取控制器中各效果的使能状态。

当控制器中某效果使能状态发生变化时，callback返回[ControlCenterStatusInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-i#controlcenterstatusinfo20)参数。

收起

自动换行

深色代码主题

复制

```
1. import { camera } from '@kit.CameraKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. function callback(err: BusinessError, status: camera.ControlCenterStatusInfo): void {
5. if (err !== undefined && err.code !== 0) {
6. console.error(`Callback Error, errorCode: ${err.code}`);
7. return;
8. }
9. console.info(`controlCenterEffectStatusChange: ${status}`);
10. }

12. function registerControlCenterEffectStatusChangeCallback(videoSession: camera.VideoSession): void {
13. videoSession.on('controlCenterEffectStatusChange', callback);
14. }
```