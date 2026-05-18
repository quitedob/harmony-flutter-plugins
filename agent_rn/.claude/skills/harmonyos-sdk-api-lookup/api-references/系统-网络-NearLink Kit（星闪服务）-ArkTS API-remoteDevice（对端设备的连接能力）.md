本模块提供了查询远端设备信息、发起配对等功能。

**系统能力：** SystemCapability.Communication.NearLink.Core

**起始版本：** 5.0.1(13)

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { remoteDevice } from '@kit.NearLinkKit';
```

## PairingState

PhonePC/2in1TabletTVWearable

type PairingState = constant.PairingState

表示和远端设备的配对状态，为枚举值。

**系统能力：** SystemCapability.Communication.NearLink.Core

**起始版本：** 5.0.1(13)

展开

| 类型 | 说明 |
| --- | --- |
| [constant.PairingState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-constant#pairingstate) | 和远端设备的配对状态。 |

## ConnectionState

PhonePC/2in1TabletTVWearable

type ConnectionState = constant.ConnectionState

表示和远端设备的连接状态，为枚举值。

**系统能力：** SystemCapability.Communication.NearLink.Core

**起始版本：** 5.0.1(13)

展开

| 类型 | 说明 |
| --- | --- |
| [constant.ConnectionState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-constant#connectionstate) | 和远端设备的连接状态。 |

## DeviceClass

PhonePC/2in1TabletTVWearable

type DeviceClass = constant.DeviceClass

表示设备类型，为枚举值。

**系统能力：** SystemCapability.Communication.NearLink.Core

**起始版本：** 5.0.1(13)

展开

| 类型 | 说明 |
| --- | --- |
| [constant.DeviceClass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-constant#deviceclass) | 设备类型。 |

## AcbState

PhonePC/2in1TabletTVWearable

type AcbState = constant.AcbState

表示和远端设备的逻辑链路连接状态，为枚举值。

**系统能力：** SystemCapability.Communication.NearLink.Core

**起始版本：** 5.1.0(18)

展开

| 类型 | 说明 |
| --- | --- |
| [constant.AcbState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-constant#acbstate) | 和远端设备的逻辑链路连接状态。 |

## createRemoteDevice

PhonePC/2in1TabletTVWearable

createRemoteDevice(address: string): RemoteDevice

创建远端设备实例。

**系统能力：** SystemCapability.Communication.NearLink.Core

**起始版本：** 5.0.1(13)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| address | string | 是 | 远端设备地址。地址格式参考："11:22:33:AA:BB:FF"。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [RemoteDevice](/consumer/cn/doc/harmonyos-references/nearlink-remote-device#remotedevice) | 远端设备实例。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-error-code)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Invalid parameter. |
| 801 | Capability not supported. |

**示例：**



```
1. import { remoteDevice } from '@kit.NearLinkKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let addr: string = '00:11:22:33:AA:FF'; // 扫描获取到的远端设备地址
5. let device: remoteDevice.RemoteDevice;
6. try {
7. device = remoteDevice.createRemoteDevice(addr);
8. console.info('device: ' + JSON.stringify(device));
9. } catch (err) {
10. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
11. }
```

## RemoteDevice

PhonePC/2in1TabletTVWearable

说明

提供远端设备的操作方法，使用前需要使用[remoteDevice.createRemoteDevice](/consumer/cn/doc/harmonyos-references/nearlink-remote-device#createremotedevice)方法创建一个远端设备[RemoteDevice](/consumer/cn/doc/harmonyos-references/nearlink-remote-device#remotedevice)实例。一个设备只需要创建一次，无需多次创建。

**系统能力：** SystemCapability.Communication.NearLink.Core

**起始版本：** 5.0.1(13)

### startPairing

PhonePC/2in1TabletTVWearable

startPairing(): Promise<void>

发起与远端设备的配对。使用Promise异步回调。发起配对后，将依据本端与远端设备的输入输出能力标识弹出不同类型的弹窗，需使用者进一步确认。

**需要权限：** ohos.permission.ACCESS\_NEARLINK

**系统能力：** SystemCapability.Communication.NearLink.Core

**起始版本：** 5.1.0(18)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回值。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-error-code)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 801 | Capability not supported. |
| 1009700003 | Nearlink is off. |
| 1009700099 | Operation failed. |

**示例：**



```
1. import { remoteDevice } from '@kit.NearLinkKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let addr: string = '00:11:22:33:AA:FF'; // 扫描获取到的远端设备地址
5. let device: remoteDevice.RemoteDevice;
6. try {
7. device = remoteDevice.createRemoteDevice(addr);
8. device.startPairing().then(()=>{
9. console.info('start pairing success');
10. });
11. } catch (err) {
12. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
13. }
```

### getPairingState

PhonePC/2in1TabletTVWearable

getPairingState(): PairingState

获取和远端设备的配对状态。

**需要权限：** ohos.permission.ACCESS\_NEARLINK

**系统能力：** SystemCapability.Communication.NearLink.Core

**起始版本：** 5.0.1(13)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [PairingState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-constant#pairingstate) | 和远端设备的配对状态。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-error-code)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 801 | Capability not supported. |
| 1009700003 | Nearlink is off. |
| 1009700099 | Operation failed. |

**示例：**



```
1. import { remoteDevice } from '@kit.NearLinkKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let addr: string = '00:11:22:33:AA:FF'; // 扫描获取到的远端设备地址
5. let device: remoteDevice.RemoteDevice;
6. try {
7. device = remoteDevice.createRemoteDevice(addr);
8. let state: remoteDevice.PairingState = device.getPairingState();
9. console.info('state:' + JSON.stringify(state));
10. } catch (err) {
11. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
12. }
```

### getDeviceName

PhonePC/2in1TabletTVWearable

getDeviceName(): string

获取远端设备名称。

**需要权限：** ohos.permission.ACCESS\_NEARLINK

**系统能力：** SystemCapability.Communication.NearLink.Core

**起始版本：** 5.0.1(13)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 远端设备名称。最大长度为30。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-error-code)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 801 | Capability not supported. |
| 1009700003 | Nearlink is off. |
| 1009700099 | Operation failed. |

**示例：**



```
1. import { remoteDevice } from '@kit.NearLinkKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let addr: string = '00:11:22:33:AA:FF'; // 扫描获取到的远端设备地址
5. let device: remoteDevice.RemoteDevice;
6. try {
7. device = remoteDevice.createRemoteDevice(addr);
8. let name: string = device.getDeviceName();
9. console.info('state:' + JSON.stringify(name));
10. } catch (err) {
11. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
12. }
```

### getDeviceClass

PhonePC/2in1TabletTVWearable

getDeviceClass(): DeviceClass

获取远端设备类型。

**需要权限：** ohos.permission.ACCESS\_NEARLINK

**系统能力：** SystemCapability.Communication.NearLink.Core

**起始版本：** 5.0.1(13)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [DeviceClass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-constant#deviceclass) | 远端设备类型。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-error-code)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 801 | Capability not supported. |
| 1009700003 | Nearlink is off. |
| 1009700099 | Operation failed. |

**示例：**



```
1. import { remoteDevice } from '@kit.NearLinkKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let addr: string = '00:11:22:33:AA:FF'; // 扫描获取到的远端设备地址
5. let device: remoteDevice.RemoteDevice;
6. try {
7. device = remoteDevice.createRemoteDevice(addr);
8. let type: remoteDevice.DeviceClass = device.getDeviceClass();
9. console.info('type:' + JSON.stringify(type));
10. } catch (err) {
11. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
12. }
```

### getConnectionState

PhonePC/2in1TabletTVWearable

getConnectionState(): ConnectionState

获取本端设备和远端设备的连接状态。

**需要权限：** ohos.permission.ACCESS\_NEARLINK

**系统能力：** SystemCapability.Communication.NearLink.Core

**起始版本：** 5.0.1(13)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [ConnectionState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-constant#connectionstate) | 本端设备和远端设备的连接状态。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-error-code)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 801 | Capability not supported. |
| 1009700003 | Nearlink is off. |
| 1009700099 | Operation failed. |

**示例：**



```
1. import { remoteDevice } from '@kit.NearLinkKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let addr: string = '00:11:22:33:AA:FF'; // 扫描获取到的远端设备地址
5. let device: remoteDevice.RemoteDevice;
6. try {
7. device = remoteDevice.createRemoteDevice(addr);
8. let state: remoteDevice.ConnectionState = device.getConnectionState();
9. console.info('state:' + JSON.stringify(state));
10. } catch (err) {
11. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
12. }
```

### getAcbState

PhonePC/2in1TabletTVWearable

getAcbState(): AcbState

获取和远端设备的逻辑链路连接状态。

**需要权限：** ohos.permission.ACCESS\_NEARLINK

**系统能力：** SystemCapability.Communication.NearLink.Core

**起始版本：** 5.1.0(18)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [AcbState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-constant#acbstate) | 和远端设备的逻辑链路连接状态。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-error-code)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 801 | Capability not supported. |
| 1009700003 | Nearlink is off. |
| 1009700099 | Operation failed. |

**示例：**



```
1. import { remoteDevice } from '@kit.NearLinkKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let addr: string = '00:11:22:33:AA:FF'; // 扫描获取到的远端设备地址
5. let device: remoteDevice.RemoteDevice;
6. try {
7. device = remoteDevice.createRemoteDevice(addr);
8. let state: remoteDevice.AcbState = device.getAcbState();
9. console.info('state:' + JSON.stringify(state));
10. } catch (err) {
11. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
12. }
```

### getDeviceInformation

PhonePC/2in1TabletTVWearable

getDeviceInformation(): DeviceInformation

获取远端设备的设备信息。

**需要权限：** ohos.permission.ACCESS\_NEARLINK

**系统能力：** SystemCapability.Communication.NearLink.Core

**起始版本：** 6.1.1(24)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [DeviceInformation](/consumer/cn/doc/harmonyos-references/nearlink-remote-device#deviceinformation) | 远端设备的设备信息。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nearlink-error-code)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 801 | Capability not supported. |
| 1009700003 | Nearlink is off. |
| 1009700099 | Operation failed. |

**示例：**



```
1. import { remoteDevice } from '@kit.NearLinkKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { buffer } from '@kit.ArkTS';

5. let addr: string = '00:11:22:33:AA:FF'; // 扫描获取到的远端设备地址
6. let device: remoteDevice.RemoteDevice;
7. try {
8. device = remoteDevice.createRemoteDevice(addr);
9. let deviceInfo: remoteDevice.DeviceInformation = device.getDeviceInformation();
10. console.info('deviceInfo.manufacturerData:' + buffer.from(deviceInfo.manufacturerData, 'binary').toString('hex'));
11. console.info('deviceInfo.modelData:' + buffer.from(deviceInfo.modelData, 'binary').toString('hex'));
12. } catch (err) {
13. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
14. }
```

## DeviceInformation

PhonePC/2in1TabletTVWearable

表示远端设备信息。

**系统能力：** SystemCapability.Communication.NearLink.Core

**起始版本：** 6.1.1(24)

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| manufacturerData | string | 否 | 否 | 厂商信息。 |
| modelData | string | 否 | 否 | 设备型号信息。 |