

```
1. typedef struct {...} OH_MIDIPortInformation
```

## 概述

PhonePC/2in1Tablet

端口信息结构体。用于枚举端口，包含可显示的端口名称。

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
| uint32\_t portIndex | 端口在设备中的索引号。  **起始版本：** 24 |
| int64\_t deviceId | 端口所属的MIDI设备ID。  **起始版本：** 24 |
| [OH\_MIDIPortDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_midiportdirection) direction | 端口方向（输入或输出）。  **起始版本：** 24 |
| char name[64] | 端口名称。  **起始版本：** 24 |