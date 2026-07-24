## 概述

PhonePC/2in1Tablet

网络质量回调信息。

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
| [NetworkBoost\_PathType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview#networkboost_pathtype-1) [pathType](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos#pathtype) | 相应的数据路径上的网络质量信息。 |
| uint64\_t [linkUpBandwidth](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos#linkupbandwidth) | 上行带宽信息，单位为bps。 |
| uint64\_t [linkDownBandwidth](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos#linkdownbandwidth) | 下行带宽信息，单位为bps。 |
| uint64\_t [linkUpRate](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos#linkuprate) | 上行速率，单位为bps。 |
| uint64\_t [linkDownRate](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos#linkdownrate) | 下行速率，单位为bps。 |
| uint32\_t [rttMs](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos#rttms) | RTT时延，表示统计时间间隔内，pathType对应数据路径上，所有的TCP上下行数据包的平均往返时延。取值范围为0或任意正数，单位：毫秒（ms）。  如果在统计时间间隔内没有收到某次TCP请求的回复，则该次的RTT时延不会被计入该统计时间间隔内。因此，在完全不可上网的场景下，由于无法收到TCP的回复，回调中的RTT时延值会比较小，与实际状态不一致。针对完全不可上网的场景，建议结合[on('netCapabilitiesChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-net-connection#onnetcapabilitieschange)方法进行综合判断。 |
| uint32\_t [linkUpBufferDelayMs](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos#linkupbufferdelayms) | 上行发送空口缓冲时延，单位为ms，取值范围是任意正数。 |
| uint32\_t [linkUpBufferCongestionPercent](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-network_qos#linkupbuffercongestionpercent) | 上行发送空口缓冲时延占总缓冲时间的比例，取值范围[0, 100]。 |

## 结构体成员变量说明

PhonePC/2in1Tablet

### linkDownBandwidth

PhonePC/2in1Tablet



```
1. uint64_t NetworkBoost_NetworkQos::linkDownBandwidth
```

**描述**

下行带宽信息，单位为bps。

### linkDownRate

PhonePC/2in1Tablet



```
1. uint64_t NetworkBoost_NetworkQos::linkDownRate
```

**描述**

下行速率，单位为bps。

### linkUpBandwidth

PhonePC/2in1Tablet



```
1. uint64_t NetworkBoost_NetworkQos::linkUpBandwidth
```

**描述**

上行带宽信息，单位为bps。

### linkUpBufferCongestionPercent

PhonePC/2in1Tablet



```
1. uint32_t NetworkBoost_NetworkQos::linkUpBufferCongestionPercent
```

**描述**

上行发送空口缓冲时延占总缓冲时间的比例，取值范围[0, 100]。

### linkUpBufferDelayMs

PhonePC/2in1Tablet



```
1. uint32_t NetworkBoost_NetworkQos::linkUpBufferDelayMs
```

**描述**

上行发送空口缓冲时延（单位ms），取值范围是任意正数。

### linkUpRate

PhonePC/2in1Tablet



```
1. uint64_t NetworkBoost_NetworkQos::linkUpRate
```

**描述**

上行速率，单位为bps。

### pathType

PhonePC/2in1Tablet



```
1. NetworkBoost_PathType NetworkBoost_NetworkQos::pathType
```

**描述**

相应的数据路径上的网络质量信息。

### rttMs

PhonePC/2in1Tablet



```
1. uint32_t NetworkBoost_NetworkQos::rttMs
```

**描述**

RTT时延（单位ms），取值范围是任意正数。