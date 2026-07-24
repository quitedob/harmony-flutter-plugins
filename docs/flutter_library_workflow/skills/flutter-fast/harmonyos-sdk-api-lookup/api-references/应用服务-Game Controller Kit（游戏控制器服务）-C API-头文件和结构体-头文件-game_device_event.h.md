## 概述

PhonePC/2in1TabletTV

定义游戏设备事件的接口。

**引用文件：** <GameControllerKit/game\_device\_event.h>

**库：** libohgame\_controller.z.so

**系统能力：** SystemCapability.Game.GameController

**起始版本：** 21

**相关模块：**[GameController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller)

## 汇总

PhonePC/2in1TabletTV

### 类型定义

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| typedef enum [GameDevice\_StatusChangedType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_statuschangedtype) [GameDevice\_StatusChangedType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_statuschangedtype) | 此枚举定义设备的状态变化类型。 |
| typedef enum [GameDevice\_DeviceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_devicetype) [GameDevice\_DeviceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_devicetype) | 此枚举定义设备类型。 |
| typedef struct [GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo) [GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo) | 定义设备信息。 |
| typedef struct [GameDevice\_DeviceEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceevent) [GameDevice\_DeviceEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceevent) | 定义设备状态变化事件。 |
| typedef void(\*[GameDevice\_DeviceMonitorCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_devicemonitorcallback)) (const struct [GameDevice\_DeviceEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceevent) \*deviceEvent) | 定义[OH\_GameDevice\_RegisterDeviceMonitor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#oh_gamedevice_registerdevicemonitor)中使用的回调函数。当设备上线或下线时，该回调函数将被调用。 |

### 枚举

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [GameDevice\_StatusChangedType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_statuschangedtype) {  OFFLINE = 0,  ONLINE = 1  } | 设备的状态变化类型。 |
| [GameDevice\_DeviceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_devicetype) {  UNKNOWN = 0,  GAME\_PAD = 1  } | 设备类型。 |

### 函数

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [GameController\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamecontroller_errorcode) [OH\_GameDevice\_DeviceEvent\_GetChangedType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#oh_gamedevice_deviceevent_getchangedtype) (const struct [GameDevice\_DeviceEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceevent) \*deviceEvent, [GameDevice\_StatusChangedType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_statuschangedtype) \*statusChangedType) | 从设备状态变化事件中获取状态变化类型。 |
| [GameController\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamecontroller_errorcode) [OH\_GameDevice\_DeviceEvent\_GetDeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#oh_gamedevice_deviceevent_getdeviceinfo) (const struct [GameDevice\_DeviceEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceevent) \*deviceEvent, [GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo) \*\*deviceInfo) | 从设备状态变化事件中获取设备信息。 |
| [GameController\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamecontroller_errorcode) [OH\_GameDevice\_DestroyDeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#oh_gamedevice_destroydeviceinfo) ([GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo) \*\*deviceInfo) | 当[GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo)实例不再使用，销毁该实例。 |
| [GameController\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamecontroller_errorcode) [OH\_GameDevice\_DeviceInfo\_GetDeviceId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#oh_gamedevice_deviceinfo_getdeviceid) (const struct [GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo) \*deviceInfo, char \*\*deviceId) | 从设备信息[GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo)中获取设备ID。 |
| [GameController\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamecontroller_errorcode) [OH\_GameDevice\_DeviceInfo\_GetName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#oh_gamedevice_deviceinfo_getname) (const struct [GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo) \*deviceInfo, char \*\*name) | 从设备信息[GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo)中获取设备名称。 |
| [GameController\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamecontroller_errorcode) [OH\_GameDevice\_DeviceInfo\_GetProduct](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#oh_gamedevice_deviceinfo_getproduct) (const struct [GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo) \*deviceInfo, int32\_t \*product) | 从设备信息[GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo)中获取产品信息。 |
| [GameController\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamecontroller_errorcode) [OH\_GameDevice\_DeviceInfo\_GetVersion](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#oh_gamedevice_deviceinfo_getversion) (const struct [GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo) \*deviceInfo, int32\_t \*version) | 从设备信息[GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo)中获取版本信息。 |
| [GameController\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamecontroller_errorcode) [OH\_GameDevice\_DeviceInfo\_GetPhysicalAddress](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#oh_gamedevice_deviceinfo_getphysicaladdress) (const struct [GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo) \*deviceInfo, char \*\*physicalAddress) | 从设备信息[GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo)中获取物理地址。 |
| [GameController\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamecontroller_errorcode) [OH\_GameDevice\_DeviceInfo\_GetDeviceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#oh_gamedevice_deviceinfo_getdevicetype) (const struct [GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo) \*deviceInfo, [GameDevice\_DeviceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_devicetype) \*deviceType) | 从设备信息[GameDevice\_DeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-game-controller#gamedevice_deviceinfo)中获取设备类型。 |