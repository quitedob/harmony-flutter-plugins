## 场景介绍

Scenario Fusion Kit提供获取系统信息属性API，调用该接口可以获取设备、网络状态、屏幕、语言、主题等系统信息属性。

## 约束和限制

场景化API支持Phone、Tablet和2in1设备，并且从5.1.0(18)版本开始，新增支持Wearable和TV设备。

## 接口说明

以下是获取系统信息属性的接口说明，更多接口及使用方法请参见[atomicService（融合场景化API）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-atomicservice)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getSystemInfoSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-atomicservice#section1465318121834)(properties?: Array<[SystemInfoType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-atomicservice#section994220537517)>): [SystemInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-atomicservice#section6926144111527) | 获取系统信息属性的方法，支持获取设备、网络状态、屏幕、语言、主题等系统信息的请求对象，包含请求参数。  说明  getSystemInfoSync接口不支持获取windowWidth、windowHeight、statusBarHeight和screenSafeArea属性，如需获取可使用[getSystemInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-atomicservice#section17779133174510)接口。 |

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
   1. let stateArray: Array<atomicService.SystemInfoType> =
   2. ['brand', 'deviceModel', 'screenWidth', 'screenHeight', 'language', 'osFullName', 'fontSizeSetting',
   3. 'sdkApiVersion', 'bluetoothEnabled', 'wifiEnabled', 'locationEnabled', 'deviceOrientation', 'theme'];
   4. try {
   5. let data = atomicService.getSystemInfoSync(stateArray);
   6. hilog.info(0x0000, 'testTag', 'succeeded in getting system info');
   7. let brand: string | undefined = data.brand;
   8. let deviceModel: string | undefined = data.deviceModel;
   9. let screenWidth: number | undefined = data.screenWidth;
   10. let screenHeight: number | undefined = data.screenHeight;
   11. let language: string | undefined = data.language;
   12. let osFullName: string | undefined = data.osFullName;
   13. let fontSizeSetting: number | undefined = data.fontSizeSetting;
   14. let sdkApiVersion: number | undefined = data.sdkApiVersion;
   15. let bluetoothEnabled: boolean | undefined = data.bluetoothEnabled;
   16. let wifiEnabled: boolean | undefined = data.wifiEnabled;
   17. let locationEnabled: boolean | undefined = data.locationEnabled;
   18. let deviceOrientation: string | undefined = data.deviceOrientation;
   19. let theme: ColorMode | undefined = data.theme;
   20. } catch (error) {
   21. hilog.error(0x0000, 'testTag', 'failReason: %{public}d %{public}s', error.code, error.message);
   22. }
   ```