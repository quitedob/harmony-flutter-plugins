

```
1. typedef struct {...} OH_MIDIDeviceInformation
```

## 概述

PhonePC/2in1Tablet

设备信息结构体。储存设备ID等相关信息。

**起始版本：** 24

**相关模块：** [OHMIDI](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohmidi)

**所在头文件：** [native\_midi\_base.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h)

## 汇总

PhonePC/2in1Tablet

### 成员变量

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| int64\_t midiDeviceId | MIDI设备的唯一标识符。  **起始版本：** 24 |
| [OH\_MIDIDeviceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_mididevicetype) deviceType | 设备类型（USB、BLE等）。  **起始版本：** 24 |
| [OH\_MIDIProtocol](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_midiprotocol) nativeProtocol | 设备原生支持的MIDI协议。- OH\_MIDI\_PROTOCOL\_1\_0：设备是传统设备或当前配置为MIDI 1.0。  - OH\_MIDI\_PROTOCOL\_2\_0：设备支持MIDI 2.0功能。  **起始版本：** 24 |
| char deviceName[256] | 设备名称。  **起始版本：** 24 |
| uint64\_t vendorId | 厂商ID。  **起始版本：** 24 |
| uint64\_t productId | 产品ID。  **起始版本：** 24 |
| char deviceAddress[64] | 设备物理地址（BLE设备）。  **起始版本：** 24 |