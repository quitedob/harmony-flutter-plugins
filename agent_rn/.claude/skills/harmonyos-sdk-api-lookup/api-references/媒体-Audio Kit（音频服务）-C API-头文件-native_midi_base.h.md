## 概述

PhonePC/2in1Tablet

声明MIDI模块的基础数据结构。定义MIDI接口的基础类型、枚举、结构体和回调函数。

**引用文件：** <ohmidi/native\_midi\_base.h>

**库：** libohmidi.so

**系统能力：** SystemCapability.Multimedia.Audio.MIDI

**起始版本：** 24

**相关模块：** [OHMIDI](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohmidi)

## 汇总

PhonePC/2in1Tablet

### 结构体

PhonePC/2in1Tablet

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_MIDIEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohmidi-oh-midievent) | OH\_MIDIEvent | MIDI事件结构体（通用）。事件数据以Universal MIDI Packets（UMP）格式传输。原始字节流(MIDI 1.0)数据需要先转换为UMP格式后再填充此结构体。 |
| [OH\_MIDIDeviceInformation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohmidi-oh-midideviceinformation) | OH\_MIDIDeviceInformation | 设备信息结构体。储存设备ID等相关信息。 |
| [OH\_MIDIPortInformation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohmidi-oh-midiportinformation) | OH\_MIDIPortInformation | 端口信息结构体。用于枚举端口，包含可显示的端口名称。 |
| [OH\_MIDIPortDescriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohmidi-oh-midiportdescriptor) | OH\_MIDIPortDescriptor | 端口描述符结构体，用于打开端口时指定端口索引和协议行为。 |
| [OH\_MIDICallbacks](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohmidi-oh-midicallbacks) | OH\_MIDICallbacks | 客户端回调结构体，包含设备变化和错误处理的回调函数。 |
| [OH\_MIDIClientStruct](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohmidi-oh-midiclientstruct) | OH\_MIDIClient | 声明MIDI客户端。 |
| [OH\_MIDIDeviceStruct](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohmidi-oh-mididevicestruct) | OH\_MIDIDevice | 声明MIDI设备。 |

### 枚举

PhonePC/2in1Tablet

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_MIDIStatusCode](/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_midistatuscode) | OH\_MIDIStatusCode | MIDI状态码枚举。定义MIDI操作的状态码，用于表示操作成功或失败的原因。 |
| [OH\_MIDIPortDirection](/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_midiportdirection) | OH\_MIDIPortDirection | 表示端口方向的枚举。定义MIDI端口的数据传输方向。 |
| [OH\_MIDIProtocol](/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_midiprotocol) | OH\_MIDIProtocol | MIDI协议版本枚举，用于指定端口使用的MIDI协议行为。 |
| [OH\_MIDIDeviceType](/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_mididevicetype) | OH\_MIDIDeviceType | MIDI设备类型枚举。定义MIDI设备的连接类型。 |
| [OH\_MIDIDeviceChangeAction](/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_mididevicechangeaction) | OH\_MIDIDeviceChangeAction | 设备连接状态变化操作枚举。用于标识设备的连接和断开事件。 |

### 函数

PhonePC/2in1Tablet

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [typedef void (\*OH\_MIDICallback\_OnDeviceChange)(void \*userData, OH\_MIDIDeviceChangeAction action, OH\_MIDIDeviceInformation deviceInfo)](/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_midicallback_ondevicechange) | OH\_MIDICallback\_OnDeviceChange | 监控设备连接/断开连接的回调。 |
| [typedef void (\*OH\_MIDICallback\_OnError)(void \*userData, OH\_MIDIStatusCode code)](/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_midicallback_onerror) | OH\_MIDICallback\_OnError | 处理客户端级别错误的回调。当MIDI服务发生关键错误（如服务崩溃）时调用。应用可能需要重新创建客户端。 |
| [typedef void (\*OH\_MIDIDevice\_OnReceived)(void \*userData, const OH\_MIDIEvent \*events, size\_t eventCount)](/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_mididevice_onreceived) | OH\_MIDIDevice\_OnReceived | 接收MIDI数据的回调（批量处理）。 |
| [typedef void (\*OH\_MIDIClient\_OnDeviceOpened)(void \*userData, bool opened, OH\_MIDIDevice \*device, OH\_MIDIDeviceInformation info)](/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_midiclient_ondeviceopened) | OH\_MIDIClient\_OnDeviceOpened | 异步打开BLE设备的结果回调。 |

## 枚举类型说明

PhonePC/2in1Tablet

### OH\_MIDIStatusCode

PhonePC/2in1Tablet



```
1. enum OH_MIDIStatusCode
```

**描述**

MIDI状态码枚举。定义MIDI操作的状态码，用于表示操作成功或失败的原因。

**起始版本：** 24

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_MIDI\_STATUS\_OK = 0 | 操作成功。  **起始版本：** 24 |
| OH\_MIDI\_STATUS\_GENERIC\_INVALID\_ARGUMENT = 35500001 | 无效参数（例如：空指针）。  **起始版本：** 24 |
| OH\_MIDI\_STATUS\_GENERIC\_IPC\_FAILURE = 35500002 | IPC通信失败。  **起始版本：** 24 |
| OH\_MIDI\_STATUS\_INVALID\_CLIENT = 35500003 | 无效的客户端句柄。  **起始版本：** 24 |
| OH\_MIDI\_STATUS\_INVALID\_DEVICE\_HANDLE = 35500004 | 无效的设备句柄。  **起始版本：** 24 |
| OH\_MIDI\_STATUS\_INVALID\_PORT = 35500005 | 无效的端口索引。  **起始版本：** 24 |
| OH\_MIDI\_STATUS\_WOULD\_BLOCK = 35500006 | 发送缓冲区暂时已满。表示共享内存缓冲区当前缺乏空间。  当消息无法放入缓冲区时由非阻塞发送返回。建议等待约10ms后重试。  **起始版本：** 24 |
| OH\_MIDI\_STATUS\_TIMEOUT = 35500007 | 操作超时。  **起始版本：** 24 |
| OH\_MIDI\_STATUS\_TOO\_MANY\_OPEN\_DEVICES = 35500008 | 客户端已达到允许打开的最大设备数量（16个）。  要打开新设备，必须先关闭现有设备。  **起始版本：** 24 |
| OH\_MIDI\_STATUS\_TOO\_MANY\_OPEN\_PORTS = 35500009 | 客户端已达到允许打开的最大端口数量（64个）。  要打开新端口，必须先关闭现有端口。  **起始版本：** 24 |
| OH\_MIDI\_STATUS\_DEVICE\_ALREADY\_OPEN = 35500010 | 客户端已经打开此设备。同一设备在同一客户端中不允许重复打开。  **起始版本：** 24 |
| OH\_MIDI\_STATUS\_PORT\_ALREADY\_OPEN = 35500011 | 客户端已经打开此端口。同一端口在同一客户端中不允许重复打开。  **起始版本：** 24 |
| OH\_MIDI\_STATUS\_TOO\_MANY\_CLIENTS = 35500012 | 系统级（8个）或应用级（2个/UID）客户端数量已达上限。应用应等待或释放其他资源后重试。  **起始版本：** 24 |
| OH\_MIDI\_STATUS\_PERMISSION\_DENIED = 35500013 | 权限被拒绝。当应用尝试在未获得所需权限（例如BLE设备的蓝牙权限）的情况下执行操作时返回。  **起始版本：** 24 |
| OH\_MIDI\_STATUS\_SERVICE\_DIED = 35500014 | MIDI系统服务已崩溃或断开连接。必须销毁并重新创建客户端。  **起始版本：** 24 |
| OH\_MIDI\_STATUS\_SYSTEM\_ERROR = 35500100 | 系统内部错误。表示发生了未预期的系统级错误。  **起始版本：** 24 |

### OH\_MIDIPortDirection

PhonePC/2in1Tablet



```
1. enum OH_MIDIPortDirection
```

**描述**

表示端口方向的枚举。定义MIDI端口的数据传输方向。

**起始版本：** 24

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_MIDI\_PORT\_DIRECTION\_INPUT = 0 | 输入端口（设备->主机）。  **起始版本：** 24 |
| OH\_MIDI\_PORT\_DIRECTION\_OUTPUT = 1 | 输出端口（主机->设备）。  **起始版本：** 24 |

### OH\_MIDIProtocol

PhonePC/2in1Tablet



```
1. enum OH_MIDIProtocol
```

**描述**

MIDI协议版本枚举，用于指定端口使用的MIDI协议行为。

说明

SDK始终使用UMP（Universal MIDI Packet）格式进行数据传输，无论选择何种协议。此枚举定义连接的是数据行为和语义，而不是数据结构。MT（Message Type，消息类型）是UMP数据包的消息类型标识，不同MT值对应不同类型的MIDI消息。

**起始版本：** 24

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_MIDI\_PROTOCOL\_1\_0 = 1 | 传统MIDI 1.0语义。  在此协议下，MIDI系统服务期望接收以下UMP消息类型：  - MIDI系统服务期望接收严格遵循MIDI 1.0协议规范的UMP数据包。  - MT 0x0：实用消息（例如时间戳）。  - MT 0x1：系统实时和系统公共消息。  - MT 0x2：MIDI 1.0通道声音消息（32位）。  - MT 0x3：数据消息（64位），用于SysEx（7位载荷）。  - 如果目标硬件是MIDI 1.0：服务将UMP转换回字节流（F0...F7）。  - 如果目标硬件是MIDI 2.0：服务直接发送未经转换的UMP包（封装的MIDI 1.0）。  **起始版本：** 24 |
| OH\_MIDI\_PROTOCOL\_2\_0 = 2 | MIDI 2.0语义。  在此协议下，MIDI系统服务期望接收以下UMP消息类型：  - MIDI系统服务期望接收利用MIDI 2.0功能特性的UMP数据包。  - MT 0x4：MIDI 2.0通道声音消息（64位，高分辨率）。  - MT 0x0：实用消息（时间戳）。  - MT 0xD：Flex数据消息（128位，例如文本、歌词）。  - MT 0xF：UMP流消息（128位，端点发现、功能块）。  - MT 0x3 / MT 0x5：数据消息（64位或128位）。  **起始版本：** 24 |

### OH\_MIDIDeviceType

PhonePC/2in1Tablet



```
1. enum OH_MIDIDeviceType
```

**描述**

MIDI设备类型枚举。定义MIDI设备的连接类型。

**起始版本：** 24

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_MIDI\_DEVICE\_TYPE\_USB = 0 | USB MIDI设备。 |
| OH\_MIDI\_DEVICE\_TYPE\_BLE = 1 | BLE（蓝牙低功耗）MIDI设备。 |

### OH\_MIDIDeviceChangeAction

PhonePC/2in1Tablet



```
1. enum OH_MIDIDeviceChangeAction
```

**描述**

设备连接状态变化操作枚举。用于标识设备的连接和断开事件。

**起始版本：** 24

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_MIDI\_DEVICE\_CHANGE\_ACTION\_CONNECTED = 0 | 设备已连接。  **起始版本：** 24 |
| OH\_MIDI\_DEVICE\_CHANGE\_ACTION\_DISCONNECTED = 1 | 设备已断开。  **起始版本：** 24 |

## 函数说明

PhonePC/2in1Tablet

### OH\_MIDICallback\_OnDeviceChange()

PhonePC/2in1Tablet



```
1. typedef void (*OH_MIDICallback_OnDeviceChange)(void *userData, OH_MIDIDeviceChangeAction action, OH_MIDIDeviceInformation deviceInfo)
```

**描述**

监控设备连接/断开连接的回调。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| void \*userData | 调用[OH\_MIDIClient\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-midi-h#oh_midiclient_create)时传入的用户自定义数据指针。 |
| [OH\_MIDIDeviceChangeAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_mididevicechangeaction) action | 设备变化操作（已连接/已断开）。 |
| [OH\_MIDIDeviceInformation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohmidi-oh-midideviceinformation) deviceInfo | 变化设备的信息。 |

### OH\_MIDICallback\_OnError()

PhonePC/2in1Tablet



```
1. typedef void (*OH_MIDICallback_OnError)(void *userData, OH_MIDIStatusCode code)
```

**描述**

处理客户端级别错误的回调。当MIDI服务发生关键错误（如服务崩溃）时调用。应用可能需要重新创建客户端。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| void \*userData | 调用[OH\_MIDIClient\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-midi-h#oh_midiclient_create)时传入的用户自定义数据指针。 |
| [OH\_MIDIStatusCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_midistatuscode) code | 错误状态码，指示错误原因。 |

### OH\_MIDIDevice\_OnReceived()

PhonePC/2in1Tablet



```
1. typedef void (*OH_MIDIDevice_OnReceived)(void *userData, const OH_MIDIEvent *events, size_t eventCount)
```

**描述**

接收MIDI数据的回调（批量处理）。

说明

内存安全与线程安全注意事项：

* 内存安全：events数组及其中所有数据指针是临时的，仅在此回调期间有效。在回调返回后访问这些指针会导致未定义行为（崩溃、内存损坏）。调用方必须复制任何需要保留的数据。
* 线程安全：此回调在高优先级系统线程上调用。不要执行阻塞操作、大量计算或I/O操作。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| void \*userData | 调用[OH\_MIDIClient\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-midi-h#oh_midiclient_create)时传入的用户自定义数据指针。 |
| [const OH\_MIDIEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohmidi-oh-midievent) \*events | 指向接收到的MIDI事件数组的指针。 |
| size\_t eventCount | 数组中的事件数。 |

### OH\_MIDIClient\_OnDeviceOpened()

PhonePC/2in1Tablet



```
1. typedef void (*OH_MIDIClient_OnDeviceOpened)(void *userData, bool opened, OH_MIDIDevice *device, OH_MIDIDeviceInformation info)
```

**描述**

异步打开BLE设备的结果回调。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| void \*userData | 调用[OH\_MIDIClient\_OpenBLEDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-midi-h#oh_midiclient_openbledevice)时传入的用户自定义数据指针。 |
| bool opened | 设备是否成功打开。  true表示设备成功打开，设备句柄有效；false表示设备打开失败，设备句柄为NULL。 |
| [OH\_MIDIDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohmidi-oh-mididevicestruct) \*device | 已打开设备的句柄。  如果opened为true，应用必须在不再需要时调用[OH\_MIDIClient\_CloseDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-midi-h#oh_midiclient_closedevice)关闭此句柄。  如果opened为false，此参数为NULL。 |
| [OH\_MIDIDeviceInformation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohmidi-oh-midideviceinformation) info | 已打开设备的信息。  **注意：** 此对象仅在此回调范围内有效。如需持久化特定属性（如ID或名称），请对该设备信息进行复制。 |