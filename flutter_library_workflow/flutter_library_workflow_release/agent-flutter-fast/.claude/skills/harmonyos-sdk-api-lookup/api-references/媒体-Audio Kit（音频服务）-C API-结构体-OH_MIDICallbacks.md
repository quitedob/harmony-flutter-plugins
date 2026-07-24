

```
1. typedef struct {...} OH_MIDICallbacks
```

## 概述

PhonePC/2in1Tablet

客户端回调结构体，包含设备变化和错误处理的回调函数。

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
| [OH\_MIDICallback\_OnDeviceChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_midicallback_ondevicechange) onDeviceChange | 处理设备热插拔事件的回调。  **起始版本：** 24 |
| [OH\_MIDICallback\_OnError](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-midi-base-h#oh_midicallback_onerror) onError | 处理关键服务错误的回调。  **起始版本：** 24 |