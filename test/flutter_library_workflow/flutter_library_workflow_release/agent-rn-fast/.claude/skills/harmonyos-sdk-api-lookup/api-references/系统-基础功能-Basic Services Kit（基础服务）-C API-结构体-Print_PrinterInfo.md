

```
1. typedef struct {...} Print_PrinterInfo
```

## 概述

PhonePC/2in1Tablet

表示打印机信息。

**起始版本：** 12

**相关模块：** [OH\_Print](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print)

**所在头文件：** [ohprint.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h)

## 汇总

PhonePC/2in1Tablet

### 成员变量

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [Print\_PrinterState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_printerstate) printerState | 打印机状态。 |
| [Print\_PrinterCapability](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printercapability) capability | 打印机能力。 |
| [Print\_DefaultValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-defaultvalue) defaultValue | 打印机当前属性。 |
| bool isDefaultPrinter | 默认打印机。 |
| char \*printerId | 打印机 ID。 |
| char \*printerName | 打印机名称。 |
| char \*description | 打印机描述。 |
| char \*location | 打印机位置。 |
| char \*makeAndModel | 打印机品牌和型号信息。 |
| char \*printerUri | 打印机 URI。 |
| char \*detailInfo | JSON 格式的详细信息。 |