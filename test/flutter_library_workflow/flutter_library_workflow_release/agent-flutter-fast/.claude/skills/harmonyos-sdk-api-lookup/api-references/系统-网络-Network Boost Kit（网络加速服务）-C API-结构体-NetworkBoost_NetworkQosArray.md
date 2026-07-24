## 概述

PhonePC/2in1Tablet

网络质量变化的详细信息。

**起始版本：** 5.1.0(18)

**相关模块：** [NetworkBoost](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview)

**所在头文件：** [network\_boost\_quality.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-files-quality)

## 汇总

PhonePC/2in1Tablet

### 成员变量

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t [pathNum](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos_array#pathnum) | 网络质量信息中的路径数量，取值范围 [1, 4]。 |
| [NetworkBoost\_NetworkQos](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos) [networkQos](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos_array#networkqos) [[NETBOOST\_MAX\_PATH\_NUM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#netboost_max_path_num)] | 多条路径的网络质量信息，每一项为一条路径的网络质量信息，取值范围 [0, pathNum-1]。 |

## 结构体成员变量说明

PhonePC/2in1Tablet

### networkQos

PhonePC/2in1Tablet



```
1. NetworkBoost_NetworkQos NetworkBoost_NetworkQosArray::networkQos[NETBOOST_MAX_PATH_NUM]
```

**描述**

多条路径的网络质量信息，每一项为一条路径的网络质量信息，取值范围 [0, pathNum-1]。

### pathNum

PhonePC/2in1Tablet



```
1. uint32_t NetworkBoost_NetworkQosArray::pathNum
```

**描述**

网络质量信息中的路径数量，取值范围 [1, 4]。