## 场景介绍

Scenario Fusion Kit提供获取系统设置属性API，调用该接口可以获取蓝牙、定位、Wi-Fi开关信息，以及设备方向信息等系统信息属性。

## 约束和限制

场景化API支持Phone、Tablet和2in1设备，并且从5.1.0(18)版本开始，新增支持Wearable和TV设备。

## 接口说明

以下是获取系统设置属性的接口说明，更多接口及使用方法请参见[atomicService（融合场景化API）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-atomicservice)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getSystemSetting](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-atomicservice#section171285335615)(properties?: Array<[SystemSettingType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-atomicservice#section11423195912475)>): [SystemSettingInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-atomicservice#section53111326141919) | 获取系统设置属性的方法，支持获取蓝牙、定位、Wi-Fi开关信息，以及设备方向信息的请求对象。 |

## 开发步骤

1. 导入Scenario Fusion Kit模块以及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { atomicService } from '@kit.ScenarioFusionKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 传入属性参数，调用接口获取对应属性值，代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let stateArray: Array<atomicService.SystemSettingType> =
   2. ['bluetoothEnabled', 'locationEnabled', 'deviceOrientation', 'wifiEnabled'];
   3. try {
   4. let data = atomicService.getSystemSetting(stateArray);
   5. hilog.info(0x0000, 'testTag', 'succeeded in getting system setting info');
   6. let bluetoothEnabled: boolean | undefined = data.bluetoothEnabled;
   7. let locationEnabled: boolean | undefined = data.locationEnabled;
   8. let deviceOrientation: string | undefined = data.deviceOrientation;
   9. let wifiEnabled: boolean | undefined = data.wifiEnabled;
   10. } catch (error) {
   11. hilog.error(0x0001, 'testTag', 'failReason: %{public}d %{public}s', error.code, error.message);
   12. }
   ```