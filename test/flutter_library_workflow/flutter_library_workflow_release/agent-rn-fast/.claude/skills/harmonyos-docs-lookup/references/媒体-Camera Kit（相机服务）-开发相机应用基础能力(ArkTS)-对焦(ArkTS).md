相机框架提供对设备对焦的能力，业务应用可以根据使用场景进行对焦模式和对焦点的设置。

## 开发步骤

详细的API说明请参考[Camera API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera)。

1. 导入相关接口，导入方法如下。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { camera } from '@kit.CameraKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 在设置对焦模式前，需要先调用[isFocusModeSupported](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-focusquery#isfocusmodesupported11)检查设备是否支持指定的焦距模式。

   说明

   需要在Session调用[commitConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-session#commitconfig11)完成配流之后调用。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function isFocusModeSupported(photoSession: camera.PhotoSession): boolean {
   2. let status: boolean = false;
   3. try {
   4. // 以检查是否支持自动对焦模式为例。
   5. status = photoSession.isFocusModeSupported(camera.FocusMode.FOCUS_MODE_AUTO);
   6. } catch (error) {
   7. // 失败返回错误码error.code并处理。
   8. let err = error as BusinessError;
   9. console.error(`The isFocusModeSupported call failed. error code: ${err.code}`);
   10. }
   11. return status;
   12. }
   ```
3. 调用[setFocusMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-focus#setfocusmode11)设置对焦模式。

   若设置为自动对焦模式，支持调用[setFocusPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-focus#setfocuspoint11)设置对焦点，根据对焦点执行一次自动对焦。

   说明

   需要在Session调用[commitConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-session#commitconfig11)完成配流之后调用。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function setFocusMode(photoSession: camera.PhotoSession): void {
   2. const focusPoint: camera.Point = {x: 1, y: 1};
   3. try {
   4. // 设置自动对焦模式。
   5. photoSession.setFocusMode(camera.FocusMode.FOCUS_MODE_AUTO);
   6. // 设置对焦点。
   7. photoSession.setFocusPoint(focusPoint);
   8. } catch (error) {
   9. // 失败返回错误码error.code并处理。
   10. let err = error as BusinessError;
   11. console.error(`The setFocusMode and setFocusPoint call failed. error code: ${err.code}`);
   12. }
   13. }
   ```

## 状态监听

在相机应用开发过程中，可以随时监听相机聚焦的状态变化。

通过注册[focusStateChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-photosession#onfocusstatechange11)的回调函数获取监听结果，仅当自动对焦模式时，且相机对焦状态发生改变时触发该事件。

收起

自动换行

深色代码主题

复制

```
1. function onFocusStateChange(photoSession: camera.PhotoSession): void {
2. photoSession.on('focusStateChange', (err: BusinessError, focusState: camera.FocusState) => {
3. if (err !== undefined && err.code !== 0) {
4. console.error(`focusStateChange error code: ${err.code}`);
5. return;
6. }
7. console.info(`focusStateChange focusState: ${focusState}`);
8. // 为保证对焦功能的用户体验，在自动对焦成功后，可将对焦模式设置为连续自动对焦，且相机对焦状态发生改变时触发该事件。
9. if (focusState === camera.FocusState.FOCUS_STATE_FOCUSED) {
10. photoSession.setFocusMode(camera.FocusMode.FOCUS_MODE_CONTINUOUS_AUTO);
11. }
12. });
13. }
```