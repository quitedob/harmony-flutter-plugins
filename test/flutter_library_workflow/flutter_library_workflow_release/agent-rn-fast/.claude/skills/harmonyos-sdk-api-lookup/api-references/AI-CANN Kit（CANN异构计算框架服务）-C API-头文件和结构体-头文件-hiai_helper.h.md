## 概述

PhonePC/2in1TabletTV

查询CANN Kit版本以及检查模型支持情况的接口。

**引用文件：** <CANNKit/hiai\_helper.h>

**库：** libhiai\_foundation.so

**系统能力：** SystemCapability.AI.HiAIFoundation

**起始版本：** 4.1.0(11)

**相关模块：** [CANN](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit)

## 汇总

PhonePC/2in1TabletTV

### 枚举

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [HiAI\_Compatibility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_compatibility) {  HIAI\_COMPATIBILITY\_COMPATIBLE = 0,  HIAI\_COMPATIBILITY\_INCOMPATIBLE = 1  } | 编译后模型兼容性结果。 |

### 函数

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| const char \* [HMS\_HiAI\_GetVersion](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiai_getversion) (void) | 获取CANN Kit版本号，并通过返回模板hiaiversion A1A2A3.X1X2X3.Y1Y2Y3.Z1Z2Z3指定X1是否为0来区分是否支持NPU。若X1为0，则表示不支持NPU；若X1为非0，则表示支持NPU。 |
| [HiAI\_Compatibility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_compatibility) [HMS\_HiAICompatibility\_CheckFromFile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaicompatibility_checkfromfile) (const char \*file) | 查询编译后储存在文件中的模型的兼容性。 若发生不兼容情况，建议重新编译模型。 |
| [HiAI\_Compatibility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_compatibility) [HMS\_HiAICompatibility\_CheckFromBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaicompatibility_checkfrombuffer) (const void \*data, size\_t size) | 查询编译后储存在内存中的模型的兼容性。 若发生不兼容情况，建议重新编译模型。 |