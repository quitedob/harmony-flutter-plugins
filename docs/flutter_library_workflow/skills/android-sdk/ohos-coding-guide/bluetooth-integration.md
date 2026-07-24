# 蓝牙适配专项

适用于 **HarmonyOS 原生 ArkTS / HAR** 适配时涉及：

- 蓝牙开关状态、开启/关闭蓝牙
- 传统蓝牙：查找设备、已配对设备列表、配对、profile 连接、SPP / RFCOMM 串口通信
- 低功耗蓝牙：BLE 扫描、GATT 客户端连接、服务发现、特征值/描述符读写和通知

## 1. 蓝牙设置：权限和开关状态先写对

蓝牙适配第一步不是扫描或连接，而是权限和蓝牙状态。很多失败不是 API 写错，而是只声明了权限，没有真正运行时申请。

### 1.1 必须声明权限

应用的 `module.json5` 必须声明：

```json5
{
  "module": {
    "requestPermissions": [
      {
        "name": "ohos.permission.ACCESS_BLUETOOTH"
      }
    ]
  }
}
```

声明权限只代表应用有资格申请，不代表已经授权。

### 1.2 SDK / 业务库内部必须运行时申请

禁止只做下面任意一种：

- 只在 `module.json5` 声明 `ACCESS_BLUETOOTH`
- 只调用 `checkAccessTokenSync(...)`
- 只假设系统会因为 API 调用自动弹窗
- 只在宿主页面冷启动时碰一次蓝牙 API

必须在 SDK / 业务库内部基于真实 `UIAbilityContext` 调用 `requestPermissionsFromUser(...)`。

```ts
import { abilityAccessCtrl, common, Permissions } from '@kit.AbilityKit';

const BLUETOOTH_PERMISSION: Permissions = 'ohos.permission.ACCESS_BLUETOOTH';

export class BluetoothPermissionGate {
  private atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();

  public async ensure(context: common.UIAbilityContext | null): Promise<void> {
    if (context === null) {
      throw new Error('UIAbilityContext not available');
    }

    const tokenId = context.applicationInfo.accessTokenId;
    const grant = this.atManager.checkAccessTokenSync(tokenId, BLUETOOTH_PERMISSION);
    if (grant === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
      return;
    }

    const requestResult = await this.atManager.requestPermissionsFromUser(context, [BLUETOOTH_PERMISSION]);
    for (let i = 0; i < requestResult.permissions.length; i++) {
      if (requestResult.permissions[i] === BLUETOOTH_PERMISSION &&
        requestResult.authResults[i] === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
        return;
      }
    }

    throw new Error('ACCESS_BLUETOOTH denied');
  }
}
```

常见做法是：由宿主在初始化 SDK 时注入 `UIAbilityContext`，后续所有蓝牙入口都先检查权限。

```ts
import { common } from '@kit.AbilityKit';

export class BluetoothSdk {
  private context: common.UIAbilityContext | null = null;
  private permissionGate: BluetoothPermissionGate = new BluetoothPermissionGate();

  public attachContext(context: common.UIAbilityContext): void {
    this.context = context;
  }

  public detachContext(): void {
    this.context = null;
  }

  private async ensureBluetoothPermission(): Promise<void> {
    await this.permissionGate.ensure(this.context);
  }
}
```

### 1.3 所有入口都要先过权限

以下入口都必须先申请权限，再继续执行：

- `getState`
- `enableBluetooth` / `disableBluetooth`
- 传统蓝牙扫描、停止扫描、已配对列表
- 配对、profile 连接
- SPP 连接、监听、读写、关闭
- BLE 扫描
- GATT 连接、服务发现、特征值/描述符读写、通知

### 1.4 蓝牙必须开启后再执行业务能力

`access.getState()` 返回 `STATE_ON` 才代表蓝牙可用于其他能力。`STATE_OFF` 下不要继续扫描、连接或读写。

```ts
import { access } from '@kit.ConnectivityKit';

async function ensureBluetoothReady(): Promise<void> {
  const state = access.getState();
  if (state === access.BluetoothState.STATE_ON) {
    return;
  }

  if (state === access.BluetoothState.STATE_OFF) {
    access.enableBluetooth();
    throw new Error('Bluetooth is off. Enable request has been sent.');
  }

  throw new Error('Bluetooth is not ready: ' + state);
}
```

可优先用 `access.enableBluetoothAsync()` / `access.disableBluetoothAsync()` 以 `Promise` 形式拿到底层错误；低版本可继续用 `enableBluetooth()`，再通过 `stateChange` 判断最终结果。

```ts
import { access } from '@kit.ConnectivityKit';

const onBluetoothStateChange = (state: access.BluetoothState): void => {
  if (state === access.BluetoothState.STATE_ON) {
    console.info('Bluetooth is on');
  }
};

access.on('stateChange', onBluetoothStateChange);
// 不再需要时：
access.off('stateChange', onBluetoothStateChange);
```

## 2. 先按原 Android SDK 公开语义选择传统蓝牙或 BLE

不要看到 `scan` / `search` / `connect` 就直接写 BLE。蓝牙适配必须先读原 Android SDK 的公开能力和业务语义，确认属于哪条官方链路。

| 原生公开语义 | 官方文档主题 | HarmonyOS API |
| --- | --- | --- |
| 蓝牙开关、状态 | 蓝牙设置 | `access` |
| 已配对设备列表 | 传统蓝牙查找设备 | `connection.getPairedDevices()` |
| 传统蓝牙搜索附近设备 | 传统蓝牙查找设备 | `connection.startBluetoothDiscovery()` |
| 配对 | 传统蓝牙配对与连接设备 | `connection.pairDevice()` |
| A2DP / HFP / HID | 传统蓝牙配对与连接设备 | `connection.connectAllowedProfiles()` |
| 蓝牙打印机、串口、RFCOMM | 传统蓝牙连接和传输数据 | `socket.sppConnect()` / `sppWrite()` / `sppRead` |
| BLE 扫描广播包 | 低功耗蓝牙查找设备 | `ble.createBleScanner()` |
| BLE 连接、服务发现、特征读写 | 低功耗蓝牙连接和传输数据 | `ble.createGattClientDevice()` |

强规则：

- 已配对设备列表不能私自改成主动扫描。
- SPP 打印机不能误写成 BLE GATT。
- `connectAllowedProfiles()` 只覆盖 A2DP/HFP/HID，不等于 SPP。
- BLE 扫描结果只是广播发现，不等于已经连接。
- GATT 读写必须在连接成功并完成 `getServices()` 后执行。

## 3. 传统蓝牙查找设备

导入：

```ts
import { connection } from '@kit.ConnectivityKit';
import { BusinessError } from '@kit.BasicServicesKit';
```

### 3.1 扫描附近传统蓝牙设备

API 18 起优先用 `discoveryResult`，它能拿到地址、RSSI、名称、设备类型；老版本只能用 `bluetoothDeviceFind` 拿地址数组。

```ts
import { connection } from '@kit.ConnectivityKit';

const onDiscoveryResult = (devices: Array<connection.DiscoveryResult>): void => {
  for (let i = 0; i < devices.length; i++) {
    console.info('device=' + devices[i].deviceId + ', name=' + devices[i].deviceName +
      ', rssi=' + devices[i].rssi);
  }
};

function startClassicDiscovery(): void {
  connection.on('discoveryResult', onDiscoveryResult);
  if (!connection.isBluetoothDiscovering()) {
    connection.startBluetoothDiscovery();
  }
}

function stopClassicDiscovery(): void {
  if (connection.isBluetoothDiscovering()) {
    connection.stopBluetoothDiscovery();
  }
  connection.off('discoveryResult', onDiscoveryResult);
}
```

老版本回退：

```ts
const onBluetoothDeviceFind = (devices: Array<string>): void => {
  console.info('classic devices: ' + JSON.stringify(devices));
};

connection.on('bluetoothDeviceFind', onBluetoothDeviceFind);
connection.off('bluetoothDeviceFind', onBluetoothDeviceFind);
```

必须注意：

- 扫描大约持续 12 秒，扫描很耗蓝牙资源。
- 扫描到目标设备并准备连接前，必须先停止扫描。
- `startDiscovery` / `stopDiscovery`、`on` / `off` 必须成对。

### 3.2 获取已配对设备

```ts
import { connection } from '@kit.ConnectivityKit';

function getBondedDevices(): Array<string> {
  const devices = connection.getPairedDevices();
  for (let i = 0; i < devices.length; i++) {
    const pairState = connection.getPairState(devices[i]);
    console.info('device=' + devices[i] + ', pairState=' + pairState);
  }
  return devices;
}
```

适配 `bondedDevices`、`pairedDevices`、`getConnectedDevices` 这类语义时，不要用主动扫描冒充已配对列表。

## 4. 传统蓝牙配对与连接设备

导入：

```ts
import { connection, a2dp, hfp, hid, baseProfile, constant } from '@kit.ConnectivityKit';
import { BusinessError } from '@kit.BasicServicesKit';
```

### 4.1 发起配对

不知道地址类型时，优先用字符串地址方式；这是 API 20 及以前推荐方式，也适合扫描结果返回的虚拟地址。

```ts
import { connection } from '@kit.ConnectivityKit';
import { BusinessError } from '@kit.BasicServicesKit';

const onBondStateChange = (state: connection.BondStateParam): void => {
  console.info('bond state: ' + JSON.stringify(state));
};

async function pair(deviceId: string): Promise<void> {
  connection.on('bondStateChange', onBondStateChange);
  try {
    if (connection.getPairState(deviceId) === connection.BondState.BOND_STATE_INVALID) {
      await connection.pairDevice(deviceId);
    }
  } catch (err) {
    const error = err as BusinessError;
    console.error('pair failed: ' + error.code + ', ' + error.message);
    throw err;
  }
}
```

API 21 起，如果明确知道地址类型，可用 `common.BluetoothAddress`：

```ts
import { common, connection } from '@kit.ConnectivityKit';

const address: common.BluetoothAddress = {
  address: '11:22:33:44:55:66',
  addressType: common.BluetoothAddressType.REAL
};

await connection.pairDevice(address);
```

### 4.2 连接 A2DP / HFP / HID profile

`connectAllowedProfiles()` 只用于已配对设备支持的 A2DP、HFP、HID，不用于 SPP 串口。

```ts
import { a2dp, hfp, hid, baseProfile, connection, constant } from '@kit.ConnectivityKit';

const a2dpSrc = a2dp.createA2dpSrcProfile();
const hfpAg = hfp.createHfpAgProfile();
const hidHost = hid.createHidHostProfile();

const onA2dpState = (state: baseProfile.StateChangeParam): void => {
  console.info('A2DP state: ' + JSON.stringify(state));
};

const onHfpState = (state: baseProfile.StateChangeParam): void => {
  console.info('HFP state: ' + JSON.stringify(state));
};

const onHidState = (state: baseProfile.StateChangeParam): void => {
  console.info('HID state: ' + JSON.stringify(state));
};

async function connectAllowedProfiles(deviceId: string): Promise<void> {
  const uuids = await connection.getRemoteProfileUuids(deviceId);
  let hasProfile = false;
  const a2dpSink = constant.ProfileUuids.PROFILE_UUID_A2DP_SINK.toString().toLowerCase();
  const hfpHf = constant.ProfileUuids.PROFILE_UUID_HFP_HF.toString().toLowerCase();
  const hidUuid = constant.ProfileUuids.PROFILE_UUID_HID.toString().toLowerCase();
  const hogp = constant.ProfileUuids.PROFILE_UUID_HOGP.toString().toLowerCase();

  for (let i = 0; i < uuids.length; i++) {
    const uuid = uuids[i].toString().toLowerCase();
    if (uuid === a2dpSink) {
      a2dpSrc.on('connectionStateChange', onA2dpState);
      hasProfile = true;
    }
    if (uuid === hfpHf) {
      hfpAg.on('connectionStateChange', onHfpState);
      hasProfile = true;
    }
    if (uuid === hidUuid || uuid === hogp) {
      hidHost.on('connectionStateChange', onHidState);
      hasProfile = true;
    }
  }

  if (hasProfile) {
    await connection.connectAllowedProfiles(deviceId);
  }
}
```

注意：

- 配对会触发系统确认弹框。
- `BOND_STATE_BONDED` 才代表已配对。
- profile 连接前建议 `getRemoteProfileUuids()` 判断目标设备能力。
- 配对完成后 30 秒内发起 profile 连接更稳。

## 5. 传统蓝牙连接和传输数据：SPP / RFCOMM 客户端

SPP 适合经典蓝牙串口、蓝牙打印机、固定 UUID 字节流通信。手机作为客户端连接外设时，只需要实现 `sppConnect`、`sppRead`、`sppWrite`、`sppCloseClientSocket`。

导入：

```ts
import { socket } from '@kit.ConnectivityKit';
import { BusinessError } from '@kit.BasicServicesKit';
```

客户端最小骨架：

```ts
import { socket } from '@kit.ConnectivityKit';
import { BusinessError } from '@kit.BasicServicesKit';

export class SppClientBridge {
  private clientSocketId: number = -1;

  private onRead = (buffer: ArrayBuffer): void => {
    const bytes = new Uint8Array(buffer);
    console.info('spp read: ' + JSON.stringify(bytes));
    // 这里应转发到上层监听器 / callback / observer。
  };

  public connect(deviceId: string, uuid: string): void {
    const options: socket.SppOptions = {
      uuid: uuid,
      secure: false,
      type: socket.SppType.SPP_RFCOMM
    };

    socket.sppConnect(deviceId, options, (err: BusinessError, id: number) => {
      if (err) {
        console.error('sppConnect failed: ' + err.code + ', ' + err.message);
        return;
      }
      this.clientSocketId = id;
      socket.on('sppRead', this.clientSocketId, this.onRead);
    });
  }

  public write(buffer: ArrayBuffer): void {
    if (this.clientSocketId < 0) {
      throw new Error('SPP is not connected');
    }
    socket.sppWrite(this.clientSocketId, buffer);
  }

  public close(): void {
    if (this.clientSocketId < 0) {
      return;
    }
    socket.off('sppRead', this.clientSocketId, this.onRead);
    socket.sppCloseClientSocket(this.clientSocketId);
    this.clientSocketId = -1;
  }
}
```

SPP 适配注意：

- 客户端和外设的 UUID 必须一致，否则连接失败。
- 上层若以字节流语义消费，应保持 `ArrayBuffer` / `Uint8Array` 语义，不要强行转成字符串。
- 蓝牙打印机常见公开语义是“写 bytes 并等待成功/失败”，不是 BLE GATT。
- 连接前停止传统蓝牙扫描，避免扫描占用硬件资源导致连接不稳定。
- 断开时先 `socket.off('sppRead', ...)`，再 close socket。

## 6. 低功耗蓝牙查找设备：BLE 扫描

BLE 查找设备是扫描周边 BLE 广播。扫描结果是广播包，不是连接。

导入：

```ts
import { ble } from '@kit.ConnectivityKit';
import { BusinessError } from '@kit.BasicServicesKit';
```

API 15 起优先使用 `ble.createBleScanner()`，支持应用管理多路扫描。

```ts
import { ble } from '@kit.ConnectivityKit';

export class BleScannerBridge {
  private scanner: ble.BleScanner = ble.createBleScanner();

  private onFound = (report: ble.ScanReport): void => {
    for (let i = 0; i < report.scanResult.length; i++) {
      const item = report.scanResult[i];
      console.info('BLE device=' + item.deviceId + ', rssi=' + item.rssi);
      // item.data 是广播报文。需要名称、serviceUuid、manufacturer data 时再解析。
    }
  };

  public async startScan(): Promise<void> {
    const filters: Array<ble.ScanFilter> = [];
    const options: ble.ScanOptions = {
      interval: 0,
      dutyMode: ble.ScanDuty.SCAN_MODE_LOW_POWER,
      matchMode: ble.MatchMode.MATCH_MODE_AGGRESSIVE
    };

    this.scanner.on('BLEDeviceFind', this.onFound);
    await this.scanner.startScan(filters, options);
  }

  public async stopScan(): Promise<void> {
    this.scanner.off('BLEDeviceFind', this.onFound);
    await this.scanner.stopScan();
  }
}
```

老版本单路扫描可用 `ble.on('BLEDeviceFind', ...)`、`ble.startBLEScan(...)`、`ble.stopBLEScan()`，但新适配优先用 `BleScanner`。

扫描注意：

- 扫描不需要时必须停止并取消订阅。
- 如果公开 API 要 `serviceUuid` 或 manufacturer data，要解析 `ScanResult.data`，不能只回 `deviceId`。
- 如果上层期望持续扫描结果，应通过 listener / observer / callback 持续上报。

## 7. 低功耗蓝牙连接和传输数据：GATT 客户端

GATT 客户端流程是：BLE 扫描拿到设备 ID -> 创建客户端 -> 监听连接状态 -> 连接 -> 服务发现 -> 读写特征值/描述符 -> 订阅通知/指示 -> 断开并 close。

导入：

```ts
import { ble, constant } from '@kit.ConnectivityKit';
import { BusinessError } from '@kit.BasicServicesKit';
```

客户端最小骨架：

```ts
import { ble, constant } from '@kit.ConnectivityKit';
import { BusinessError } from '@kit.BasicServicesKit';

export class GattClientBridge {
  private deviceId: string = '';
  private client: ble.GattClientDevice | null = null;
  private state: ble.ProfileConnectionState = constant.ProfileConnectionState.STATE_DISCONNECTED;

  private onStateChange = (change: ble.BLEConnectionChangeState): void => {
    this.state = change.state;
    console.info('GATT state: ' + JSON.stringify(change));
  };

  private onCharacteristicChange = (characteristic: ble.BLECharacteristic): void => {
    const bytes = new Uint8Array(characteristic.characteristicValue);
    console.info('GATT notify: ' + characteristic.characteristicUuid + ', ' + JSON.stringify(bytes));
    // 这里应按公开语义转发到上层监听器。
  };

  public connect(deviceId: string): void {
    this.deviceId = deviceId;
    this.client = ble.createGattClientDevice(deviceId);
    this.client.on('BLEConnectionStateChange', this.onStateChange);
    this.client.connect();
  }

  public async discoverServices(): Promise<Array<ble.GattService>> {
    if (this.client === null || this.state !== constant.ProfileConnectionState.STATE_CONNECTED) {
      throw new Error('GATT is not connected');
    }
    return await this.client.getServices();
  }

  public async readCharacteristic(characteristic: ble.BLECharacteristic): Promise<ble.BLECharacteristic> {
    if (this.client === null) {
      throw new Error('GATT client not available');
    }
    return await this.client.readCharacteristicValue(characteristic);
  }

  public writeCharacteristic(characteristic: ble.BLECharacteristic): void {
    if (this.client === null) {
      throw new Error('GATT client not available');
    }
    this.client.writeCharacteristicValue(characteristic, ble.GattWriteType.WRITE, (err: BusinessError) => {
      if (err) {
        console.error('writeCharacteristic failed: ' + err.code + ', ' + err.message);
      }
    });
  }

  public enableNotification(characteristic: ble.BLECharacteristic, enable: boolean): void {
    if (this.client === null) {
      throw new Error('GATT client not available');
    }
    if (enable) {
      this.client.on('BLECharacteristicChange', this.onCharacteristicChange);
    } else {
      this.client.off('BLECharacteristicChange', this.onCharacteristicChange);
    }
    this.client.setCharacteristicChangeNotification(characteristic, enable, (err: BusinessError) => {
      if (err) {
        console.error('set notification failed: ' + err.code + ', ' + err.message);
      }
    });
  }

  public close(): void {
    if (this.client === null) {
      return;
    }
    this.client.off('BLECharacteristicChange', this.onCharacteristicChange);
    this.client.off('BLEConnectionStateChange', this.onStateChange);
    this.client.disconnect();
    this.client.close();
    this.client = null;
    this.state = constant.ProfileConnectionState.STATE_DISCONNECTED;
  }
}
```

GATT 客户端注意：

- `getServices()` 必须在连接成功后执行。
- 读写特征值/描述符前，要确认服务发现结果里确实存在目标 UUID。
- 通知/指示要求目标外设的特征值包含标准 CCCD：`00002902-0000-1000-8000-00805f9b34fb`。
- 通知用 `setCharacteristicChangeNotification`；指示用 `setCharacteristicChangeIndication`，二选一。
- 监听到 `BLECharacteristicChange` 后，要通过上层监听机制回传，不要只写日志。

## 8. SDK 回调 / 事件映射

蓝牙原生监听到了，不等于 SDK 能力完成。只要上层公开 API 包含以下语义，就必须回传：

- 蓝牙状态变化
- 扫描结果
- 配对状态
- 连接状态
- 收到的 SPP/GATT 字节
- 写入成功/失败
- 断开原因或 `BusinessError`

推荐做法：

| 原生事件 | 上层承载方式 |
| --- | --- |
| 扫描结果持续上报 | listener / observer / emitter |
| 连接状态流 | listener / observer |
| SPP/GATT 收到 bytes | listener / callback |
| 一次性操作，如 start/stop/connect/write | `Promise` / callback 返回结果 |
| 多实例设备连接 | 每个实例持有独立 socket / gatt client，并用 id 区分事件 |

不要只把结果写进 hilog。日志可辅助调试，但不是公开能力。

## 9. 错误和状态语义

不要把所有失败都压成 `false`。至少在原生层和对外错误码里区分：

- `PERMISSION_DENIED`：运行时权限被拒绝
- `BLUETOOTH_OFF`：蓝牙未开启
- `DEVICE_NOT_FOUND`：扫描/已配对列表里没有目标设备
- `PAIR_FAILED`：配对失败或用户拒绝
- `PROFILE_UNSUPPORTED`：目标设备不支持 A2DP/HFP/HID 或目标 UUID
- `NOT_CONNECTED`：未连接却读写
- `READ_FAILED` / `WRITE_FAILED`：读写失败
- `BUSINESS_ERROR`：底层 `BusinessError`，保留 `code` 和 `message`

如果上层公开 API 只能返回 `bool`，也建议：

- hilog 里保留细分原因
- 内部状态保留细分错误
- 能抛错或 reject 时尽量保留错误码

## 10. 生命周期和资源释放

蓝牙 API 一定要成对管理：

- `access.on('stateChange')` / `access.off('stateChange')`
- `connection.on('discoveryResult')` / `connection.off('discoveryResult')`
- `startBluetoothDiscovery()` / `stopBluetoothDiscovery()`
- `connection.on('bondStateChange')` / `connection.off('bondStateChange')`
- `socket.on('sppRead')` / `socket.off('sppRead')`
- `sppConnect()` / `sppCloseClientSocket()`
- `BleScanner.startScan()` / `BleScanner.stopScan()`
- `GattClientDevice.connect()` / `disconnect()` / `close()`

SDK 生命周期收尾建议：

- `destroy()` / `release()`：停止扫描、取消监听、关闭 socket/gatt、清空 maps。
- 失去 `UIAbilityContext` 时：清空上下文，不要继续请求权限。
- 上层取消订阅时：取消对应原生监听。
- 重复 start/connect 前：先检查旧状态，必要时 stop/close 旧资源。

## 11. 最低自检项

- 是否声明 `ohos.permission.ACCESS_BLUETOOTH`
- 是否在 SDK / 业务库内部调用 `requestPermissionsFromUser(...)`
- 是否使用真实 `UIAbilityContext`
- 是否所有入口都先过权限
- 是否在蓝牙 `STATE_ON` 后才扫描、连接、读写
- 是否按公开语义选对传统蓝牙 / 低功耗蓝牙
- 是否没有把已配对列表、主动扫描、SPP、BLE 混写
- 是否扫描前订阅、停止时取消订阅
- 是否连接前停止扫描
- 是否 SPP/GATT 收到的数据真实回传到上层监听
- 是否连接、监听、释放成对
- 是否保留 `BusinessError.code` 和 `message`
- 是否在没有目标协议设备时，明确说明“未完成全链路验证”
