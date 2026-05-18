本模块提供基于免提协议（Hands-Free Profile， [HFP](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/terminology#hfp)）的蓝牙通话音频能力，支持获取连接状态等方法。

说明

本模块首批接口从API version 10开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { hfp } from '@kit.ConnectivityKit';
```

## BaseProfile

PhonePC/2in1TabletTVWearable

type BaseProfile = baseProfile.BaseProfile

基础Profile接口定义，提供订阅和获取连接状态等公共能力。

**系统能力**：SystemCapability.Communication.Bluetooth.Core

展开

| 类型 | 说明 |
| --- | --- |
| [baseProfile.BaseProfile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bluetooth-baseprofile#baseprofile) | 基础Profile接口定义。 |

## hfp.createHfpAgProfile

PhonePC/2in1TabletTVWearable

createHfpAgProfile(): HandsFreeAudioGatewayProfile

创建蓝牙通话音频中的[HFP AG](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/terminology#hfp-ag)实例。通过该实例可使用本端作为HFP AG设备的接口，如：获取和其他设备间的蓝牙通话音频连接状态。

**系统能力**：SystemCapability.Communication.Bluetooth.Core

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [HandsFreeAudioGatewayProfile](/consumer/cn/doc/harmonyos-references/js-apis-bluetooth-hfp#handsfreeaudiogatewayprofile) | 返回HFP AG实例。 |

**错误码**：

以下错误码的详细介绍请参见[通用错误码说明文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3. Parameter verification failed. |
| 801 | Capability not supported. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. try {
4. let hfpAgProfile = hfp.createHfpAgProfile();
5. console.info('hfpAg success');
6. } catch (err) {
7. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
8. }
```

## HandsFreeAudioGatewayProfile

PhonePC/2in1TabletTVWearable

该实例表示蓝牙通话音频中的[HFP AG](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/terminology#hfp-ag)角色‌。

* 该类继承于[BaseProfile](/consumer/cn/doc/harmonyos-references/js-apis-bluetooth-hfp#baseprofile)，因此可以使用其父类中的方法。
* 使用该类的接口前，需通过[createHfpAgProfile](/consumer/cn/doc/harmonyos-references/js-apis-bluetooth-hfp#hfpcreatehfpagprofile)接口构造该类的实例。
* 和该实例角色相对应的是[HF](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/terminology#hf)角色。