DeviceStatus（设备状态感知）模块提供设备状态感知能力，可以获取到设备的信息，例如：获取设备静止姿态感知状态（支架态）。

详细的接口介绍请参考[@ohos.multimodalAwareness.deviceStatus (设备状态感知)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-awareness-devicestatus)。

## 基本概念

在进行设备状态感知模块的使用前，开发者应了解以下基本概念：

* 支架态

  设备进入支架态指设备静止，且屏幕与水平面角度处于45度-135度。折叠屏手机需处于折叠状态或者完全展开状态。

## 获取设备静止姿态感知状态（支架态）开发指导

### 场景介绍

开发过程中，需要订阅设备静止姿态（支架态）感知，并且通过订阅时传入的回调函数来获取到当前的状态值。

从API version 18开始，支持获取设备静止姿态（支架态）。

### 约束与限制

设备需要支持加速度计。

### 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| on(type: 'steadyStandingDetect', callback: Callback<SteadyStandingStatus>): void; | 订阅设备静止姿态（支架态）感知，结果通过callback返回。 |
| off(type: 'steadyStandingDetect', callback?: Callback<SteadyStandingStatus>): void; | 取消订阅设备静止姿态（支架态）感知。 |

### 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { deviceStatus } from '@kit.MultimodalAwarenessKit';
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Stationary/DeviceStatus/entry/src/main/ets/pages/Index.ets#L16-L18)
2. 订阅设备静止姿态（支架态）感知事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. deviceStatus.on('steadyStandingDetect', (data:deviceStatus.SteadyStandingStatus) => {
   3. console.info('succeed to get status, now status = ' + data);
   4. });
   5. } catch (err) {
   6. console.error('on failed, err = ' + err);
   7. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Stationary/DeviceStatus/entry/src/main/ets/pages/Index.ets#L26-L40)
3. 取消本客户端订阅的所有设备静止姿态（支架态）感知事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. deviceStatus.off('steadyStandingDetect');
   3. } catch (err) {
   4. console.error('off failed, err = ' + err);
   5. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Stationary/DeviceStatus/entry/src/main/ets/pages/Index.ets#L44-L56)
4. 取消订阅设备静止姿态（支架态）感知事件的特定回调。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 定义callback变量
   2. let callback : Callback<deviceStatus.SteadyStandingStatus> = (data : deviceStatus.SteadyStandingStatus) => {
   3. console.info('succeed to get status, now status = ' + data);
   4. };
   5. // 以callback为回调函数，订阅设备静止姿态感知（支架态）事件
   6. try {
   7. deviceStatus.on('steadyStandingDetect', callback);
   8. } catch (err) {
   9. console.error('on failed, err = ' + err);
   10. }
   11. // 取消该客户端订阅设备静止姿态感知（支架态）事件的特定回调函数
   12. try {
   13. deviceStatus.off('steadyStandingDetect', callback);
   14. } catch (err) {
   15. console.error('off failed, err = ' + err);
   16. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Stationary/DeviceStatus/entry/src/main/ets/pages/Index.ets#L60-L89)