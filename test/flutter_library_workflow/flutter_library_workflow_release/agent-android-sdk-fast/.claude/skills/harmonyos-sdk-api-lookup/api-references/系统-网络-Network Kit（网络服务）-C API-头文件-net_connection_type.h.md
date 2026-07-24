## 概述

PhonePC/2in1TabletTVWearable

为网络管理数据网络连接模块提供C接口。

**引用文件：** <network/netmanager/net\_connection\_type.h>

**库：** libnet\_connection.so

**系统能力：** SystemCapability.Communication.NetManager.Core

**起始版本：** 11

**相关模块：** [NetConnection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [NetConn\_NetHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-nethandle) | NetConn\_NetHandle | 存放网络ID。 |
| [NetConn\_NetCapabilities](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-netcapabilities) | NetConn\_NetCapabilities | 网络能力集。 |
| [NetConn\_NetAddr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-netaddr) | NetConn\_NetAddr | 网络地址。 |
| [NetConn\_Route](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-route) | NetConn\_Route | 路由配置信息。 |
| [NetConn\_HttpProxy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-httpproxy) | NetConn\_HttpProxy | 代理配置信息。 |
| [NetConn\_ConnectionProperties](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-connectionproperties) | NetConn\_ConnectionProperties | 网络连接信息。 |
| [NetConn\_NetHandleList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-nethandlelist) | NetConn\_NetHandleList | 网络列表。 |
| [NetConn\_NetSpecifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-netspecifier) | NetConn\_NetSpecifier | 网络的特征集。 |
| [NetConn\_NetConnCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-netconncallback) | NetConn\_NetConnCallback | 网络状态监听回调集合。 |
| [NetConn\_ProbeResultInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-proberesultinfo) | NetConn\_ProbeResultInfo | 定义探测结果信息。 |
| [NetConn\_TraceRouteOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-tracerouteoption) | NetConn\_TraceRouteOption | 定义网络跟踪路由选项。 |
| [NetConn\_TraceRouteInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-tracerouteinfo) | NetConn\_TraceRouteInfo | 定义跟踪路由信息。 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [NetConn\_NetCap](/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#netconn_netcap) | NetConn\_NetCap | 网络能力集。 |
| [NetConn\_NetBearerType](/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#netconn_netbearertype) | NetConn\_NetBearerType | 网络载体类型。 |
| [NetConn\_ErrorCode](/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#netconn_errorcode) | NetConn\_ErrorCode | 网络连接返回值错误码。 |
| [NetConn\_PacketsType](/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#netconn_packetstype) | NetConn\_PacketsType | 枚举跟踪路由的数据包类型。 |

### 宏定义

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| NETCONN\_MAX\_RTT\_NUM 4 | [NetConn\_ProbeResultInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-proberesultinfo)的成员变量rtt数组的长度。  **起始版本：** 11 |
| NETCONN\_MAX\_NET\_SIZE 32 | [NetConn\_NetHandleList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-nethandlelist)的成员变量netHandles数组的长度。  **起始版本：** 11 |
| NETCONN\_MAX\_BEARER\_TYPE\_SIZE 32 | [NetConn\_NetCapabilities](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-netcapabilities)的成员变量bearerTypes数组的长度。  **起始版本：** 11 |
| NETCONN\_MAX\_CAP\_SIZE 32 | [NetConn\_NetCapabilities](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-netcapabilities)的成员变量netCaps数组的长度。  **起始版本：** 11 |
| NETCONN\_MAX\_ADDR\_SIZE 32 | [NetConn\_ConnectionProperties](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-connectionproperties)的成员变量netAddrList、dnsList数组的长度。  **起始版本：** 11 |
| NETCONN\_MAX\_ROUTE\_SIZE 64 | [NetConn\_ConnectionProperties](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-connectionproperties)的成员变量routeList数组的长度。  **起始版本：** 11 |
| NETCONN\_MAX\_EXCLUSION\_SIZE 256 | [NetConn\_HttpProxy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-httpproxy)的成员变量exclusionList数组的长度。  **起始版本：** 11 |
| NETCONN\_MAX\_STR\_LEN 256 | [NetConn\_HttpProxy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-httpproxy)的成员变量host数组的长度。  **起始版本：** 11 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [typedef int (\*OH\_NetConn\_CustomDnsResolver)(const char \*host, const char \*serv,const struct addrinfo \*hint, struct addrinfo \*\*res)](/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#oh_netconn_customdnsresolver) | OH\_NetConn\_CustomDnsResolver | 指向自定义DNS解析器的指针。 |
| [typedef void (\*OH\_NetConn\_AppHttpProxyChange)(NetConn\_HttpProxy \*proxy)](/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#oh_netconn_apphttpproxychange) | OH\_NetConn\_AppHttpProxyChange | 应用的http代理信息变化回调。 |
| [typedef void (\*OH\_NetConn\_NetworkAvailable)(NetConn\_NetHandle \*netHandle)](/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#oh_netconn_networkavailable) | OH\_NetConn\_NetworkAvailable | 网络可用回调。 |
| [typedef void (\*OH\_NetConn\_NetCapabilitiesChange)(NetConn\_NetHandle \*netHandle,NetConn\_NetCapabilities \*netCapabilities)](/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#oh_netconn_netcapabilitieschange) | OH\_NetConn\_NetCapabilitiesChange | 网络能力集变更回调。 |
| [typedef void (\*OH\_NetConn\_NetConnectionPropertiesChange)(NetConn\_NetHandle \*netHandle,NetConn\_ConnectionProperties \*connConnetionProperties)](/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#oh_netconn_netconnectionpropertieschange) | OH\_NetConn\_NetConnectionPropertiesChange | 网络连接属性变更回调。 |
| [typedef void (\*OH\_NetConn\_NetLost)(NetConn\_NetHandle \*netHandle)](/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#oh_netconn_netlost) | OH\_NetConn\_NetLost | 网络断开回调。 |
| [typedef void (\*OH\_NetConn\_NetUnavailable)(void)](/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#oh_netconn_netunavailable) | OH\_NetConn\_NetUnavailable | 网络不可用回调，在指定的超时时间内网络未激活时触发该回调，如果未设置超时时间则不会触发该回调。 |
| [typedef void (\*OH\_NetConn\_NetBlockStatusChange)(NetConn\_NetHandle \*netHandle, bool blocked)](/consumer/cn/doc/harmonyos-references/capi-net-connection-type-h#oh_netconn_netblockstatuschange) | OH\_NetConn\_NetBlockStatusChange | 网络阻塞状态变更回调。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### NetConn\_NetCap

PhonePC/2in1TabletTVWearable



```
1. enum NetConn_NetCap
```

**描述**

网络能力集。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| NETCONN\_NET\_CAPABILITY\_MMS = 0 | MMS |
| NETCONN\_NET\_CAPABILITY\_NOT\_METERED = 11 | 非计量网络 |
| NETCONN\_NET\_CAPABILITY\_INTERNET = 12 | Internet |
| NETCONN\_NET\_CAPABILITY\_NOT\_VPN = 15 | 非VPN |
| NETCONN\_NET\_CAPABILITY\_VALIDATED = 16 | 已验证 |
| NETCONN\_NET\_CAPABILITY\_PORTAL = 17 | Portal  **起始版本：** 12 |
| NETCONN\_NET\_CAPABILITY\_CHECKING\_CONNECTIVITY = 31 | 检测连通性中。  **起始版本：** 12 |

### NetConn\_NetBearerType

PhonePC/2in1TabletTVWearable



```
1. enum NetConn_NetBearerType
```

**描述**

网络载体类型。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| NETCONN\_BEARER\_CELLULAR = 0 | 蜂窝网络 |
| NETCONN\_BEARER\_WIFI = 1 | WIFI |
| NETCONN\_BEARER\_BLUETOOTH = 2 | 蓝牙  **起始版本：** 12 |
| NETCONN\_BEARER\_ETHERNET = 3 | Ethernet |
| NETCONN\_BEARER\_VPN = 4 | VPN  **起始版本：** 12 |

### NetConn\_ErrorCode

PhonePC/2in1TabletTVWearable



```
1. enum NetConn_ErrorCode
```

**描述**

网络连接返回值错误码。

**起始版本：** 15

展开

| 枚举项 | 描述 |
| --- | --- |
| NETCONN\_SUCCESS = 0 | 成功 |
| NETCONN\_PERMISSION\_DENIED = 201 | 缺少权限 |
| NETCONN\_PARAMETER\_ERROR = 401 | 参数错误 |
| NETCONN\_OPERATION\_FAILED = 2100002 | 无法连接到服务 |
| NETCONN\_INTERNAL\_ERROR = 2100003 | 内部错误。1. 内存异常, 比如内存不足或内存拷贝失败。2. 空指针, 比如访问已释放内存的指针。 |

### NetConn\_PacketsType

PhonePC/2in1TabletTVWearable



```
1. enum NetConn_PacketsType
```

**描述**

枚举跟踪路由的数据包类型。

**起始版本：** 20

展开

| 枚举项 | 描述 |
| --- | --- |
| NETCONN\_PACKETS\_ICMP = 0 | 互联网控制消息协议。 |
| NETCONN\_PACKETS\_UDP = 1 | 用户数据报协议。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_NetConn\_CustomDnsResolver()

PhonePC/2in1TabletTVWearable



```
1. typedef int (*OH_NetConn_CustomDnsResolver)(const char *host, const char *serv,const struct addrinfo *hint, struct addrinfo **res)
```

**描述**

指向自定义DNS解析器的指针。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char \*host | 要查询的主机名。 |
| const char \*serv | 服务名称。 |
| const struct addrinfo \*hint | 指向addrinfo结构的指针。 |
| struct addrinfo \*\*res | 存储DNS查询结果并以链表形式返回。 |

### OH\_NetConn\_AppHttpProxyChange()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_NetConn_AppHttpProxyChange)(NetConn_HttpProxy *proxy)
```

**描述**

应用的http代理信息变化回调。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [NetConn\_HttpProxy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-httpproxy) \*proxy | 变化的代理配置信息,可能是空指针。 |

### OH\_NetConn\_NetworkAvailable()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_NetConn_NetworkAvailable)(NetConn_NetHandle *netHandle)
```

**描述**

网络可用回调。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [NetConn\_NetHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-nethandle) \*netHandle | 网络句柄。 |

### OH\_NetConn\_NetCapabilitiesChange()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_NetConn_NetCapabilitiesChange)(NetConn_NetHandle *netHandle,NetConn_NetCapabilities *netCapabilities)
```

**描述**

网络能力集变更回调。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [NetConn\_NetHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-nethandle) \*netHandle | 网络句柄。 |
| [NetConn\_NetCapabilities](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-netcapabilities) \*netCapabilities | 网络能力集。 |

### OH\_NetConn\_NetConnectionPropertiesChange()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_NetConn_NetConnectionPropertiesChange)(NetConn_NetHandle *netHandle,NetConn_ConnectionProperties *connConnetionProperties)
```

**描述**

网络连接属性变更回调。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [NetConn\_NetHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-nethandle) \*netHandle | 网络句柄。 |
| [NetConn\_ConnectionProperties](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-connectionproperties) \*connConnetionProperties | 网络连接属性。 |

### OH\_NetConn\_NetLost()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_NetConn_NetLost)(NetConn_NetHandle *netHandle)
```

**描述**

网络断开回调。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [NetConn\_NetHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-nethandle) \*netHandle | 网络句柄。 |

### OH\_NetConn\_NetUnavailable()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_NetConn_NetUnavailable)(void)
```

**描述**

网络不可用回调，在指定的超时时间内网络未激活时触发该回调，如果未设置超时时间则不会触发该回调。

**起始版本：** 12

### OH\_NetConn\_NetBlockStatusChange()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_NetConn_NetBlockStatusChange)(NetConn_NetHandle *netHandle, bool blocked)
```

**描述**

网络阻塞状态变更回调。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [NetConn\_NetHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-netconnection-netconn-nethandle) \*netHandle | 网络句柄。 |
| bool blocked | 指示网络是否将被阻塞的标志。true表示网络被阻塞，false表示网络未被阻塞。 |