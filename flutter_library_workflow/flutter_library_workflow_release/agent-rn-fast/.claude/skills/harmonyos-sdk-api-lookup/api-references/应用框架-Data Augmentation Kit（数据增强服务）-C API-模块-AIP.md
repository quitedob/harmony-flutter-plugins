## 概述

PhonePC/2in1Tablet

智慧化数据平台（AIP）为应用提供构建端侧智慧化解决方案，提供向量化、知识检索和知识问答的能力。

**起始版本：** 6.0.0(20)

## 汇总

PhonePC/2in1Tablet

### 文件

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [aip\_error\_code.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-aip-error-code) | 描述错误码信息。 |

### 类型定义

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| typedef enum [OH\_Aip\_ErrCode](/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-aip#oh_aip_errcode-1) [OH\_Aip\_ErrCode](/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-aip#oh_aip_errcode-1) | 错误码。 |

### 枚举

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_Aip\_ErrCode](/consumer/cn/doc/harmonyos-references/dataaugmentation-capi-aip#oh_aip_errcode-1) {  AIP\_OK = 0,  AIP\_E\_EXEC\_ERR = 1021200005,  AIP\_E\_OUT\_OF\_RANGE = 1021200006,  AIP\_E\_NO\_SUCH\_FIELD = 1021200007,  AIP\_E\_OVER\_LIMIT = 1021200008,  AIP\_E\_CONDITION\_OVER\_LIMIT = 1021200009,  AIP\_E\_INVALID\_ARGS = 1021200010,  AIP\_E\_EMBEDDING\_ERR = 1021200012  } | 错误码信息。 |

## 类型定义说明

PhonePC/2in1Tablet

### OH\_Aip\_ErrCode

PhonePC/2in1Tablet



```
1. typedef enum OH_Aip_ErrCode OH_Aip_ErrCode;
```

**描述**

错误码信息。

**起始版本：** 6.0.0(20)

## 枚举类型说明

PhonePC/2in1Tablet

### OH\_Aip\_ErrCode

PhonePC/2in1Tablet



```
1. enum OH_Aip_ErrCode;
```

**描述**

错误码信息。

**起始版本：** 6.0.0(20)

展开

| 枚举值 | 描述 |
| --- | --- |
| AIP\_OK | 操作成功。 |
| AIP\_E\_EXEC\_ERR | 执行报错。 |
| AIP\_E\_OUT\_OF\_RANGE | 下标越界。 |
| AIP\_E\_NO\_SUCH\_FIELD | 不存在该字段。 |
| AIP\_E\_OVER\_LIMIT | 数组超过最大长度512字节。 |
| AIP\_E\_CONDITION\_OVER\_LIMIT | 条件数量超过上限1。 |
| AIP\_E\_INVALID\_ARGS | 无效参数。 |
| AIP\_E\_EMBEDDING\_ERR | 无法生成嵌入向量。 |