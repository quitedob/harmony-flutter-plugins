## 概述

PhonePC/2in1TabletTV

声明用于运行屏幕录制过程中接口调用的错误码说明。

**引用文件：** <multimedia/player\_framework/native\_avscreen\_capture\_errors.h>

**库：** libnative\_avscreen\_capture.so

**系统能力：** SystemCapability.Multimedia.Media.AVScreenCapture

**起始版本：** 10

**相关模块：** [AVScreenCapture](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avscreencapture)

## 汇总

PhonePC/2in1TabletTV

### 枚举

PhonePC/2in1TabletTV

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_AVSCREEN\_CAPTURE\_ErrCode](/consumer/cn/doc/harmonyos-references/capi-native-avscreen-capture-errors-h#oh_avscreen_capture_errcode) | OH\_AVSCREEN\_CAPTURE\_ErrCode | 屏幕录制过程中产生的不同结果码。 |

## 枚举类型说明

PhonePC/2in1TabletTV

### OH\_AVSCREEN\_CAPTURE\_ErrCode

PhonePC/2in1TabletTV



```
1. enum OH_AVSCREEN_CAPTURE_ErrCode
```

**描述**

屏幕录制过程中产生的不同结果码。

**系统能力：** SystemCapability.Multimedia.Media.AVScreenCapture

**起始版本：** 10

展开

| 枚举项 | 描述 |
| --- | --- |
| AV\_SCREEN\_CAPTURE\_ERR\_BASE = 0 | 接口调用错误返回的基础值。 |
| AV\_SCREEN\_CAPTURE\_ERR\_OK = AV\_SCREEN\_CAPTURE\_ERR\_BASE | 操作成功。 |
| AV\_SCREEN\_CAPTURE\_ERR\_NO\_MEMORY = AV\_SCREEN\_CAPTURE\_ERR\_BASE + 1 | 内存不足。 |
| AV\_SCREEN\_CAPTURE\_ERR\_OPERATE\_NOT\_PERMIT = AV\_SCREEN\_CAPTURE\_ERR\_BASE + 2 | 不允许操作。 |
| AV\_SCREEN\_CAPTURE\_ERR\_INVALID\_VAL = AV\_SCREEN\_CAPTURE\_ERR\_BASE + 3 | 无效参数。 |
| AV\_SCREEN\_CAPTURE\_ERR\_IO = AV\_SCREEN\_CAPTURE\_ERR\_BASE + 4 | 输入输出流异常。 |
| AV\_SCREEN\_CAPTURE\_ERR\_TIMEOUT = AV\_SCREEN\_CAPTURE\_ERR\_BASE + 5 | 网络超时。 |
| AV\_SCREEN\_CAPTURE\_ERR\_UNKNOWN = AV\_SCREEN\_CAPTURE\_ERR\_BASE + 6 | 未知错误。 |
| AV\_SCREEN\_CAPTURE\_ERR\_SERVICE\_DIED = AV\_SCREEN\_CAPTURE\_ERR\_BASE + 7 | 媒体服务已终止。 |
| AV\_SCREEN\_CAPTURE\_ERR\_INVALID\_STATE = AV\_SCREEN\_CAPTURE\_ERR\_BASE + 8 | 当前状态不支持此操作。 |
| AV\_SCREEN\_CAPTURE\_ERR\_UNSUPPORT = AV\_SCREEN\_CAPTURE\_ERR\_BASE + 9 | 不支持的接口。 |
| AV\_SCREEN\_CAPTURE\_ERR\_EXTEND\_START = AV\_SCREEN\_CAPTURE\_ERR\_BASE + 100 | 预期之外的错误。 |