本模块提供以太网连接管理能力，包括有线网络能力、获取有线网络的IP地址等信息。

说明

本模块首批接口从API version 9开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTV



```
1. import { ethernet } from '@kit.NetworkKit';
```

## HttpProxy10+

PhonePC/2in1TabletTV

type HttpProxy = connection.HttpProxy

网络代理配置信息。

**系统能力**：SystemCapability.Communication.NetManager.Ethernet

展开

| 类型 | 说明 |
| --- | --- |
| connection.HttpProxy | 网络代理配置信息。 |

## ethernet.getMacAddress14+

PhonePC/2in1TabletTV

getMacAddress(): Promise<Array<MacAddressInfo>>

获取所有以太网网卡名称及对应网卡的MAC地址信息，使用Promise方式作为异步方法。

**需要权限**：ohos.permission.GET\_ETHERNET\_LOCAL\_MAC

**系统能力**：SystemCapability.Communication.NetManager.Ethernet

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<Array[<MacAddressInfo>](/consumer/cn/doc/harmonyos-references/js-apis-net-ethernet#macaddressinfo14)> | 以Promise形式返回接口信息。 |

**错误码：**

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 2200002 | Operation failed. Cannot connect to service. |
| 2201005 | Device information does not exist. |

**示例：**



```
1. import { ethernet } from '@kit.NetworkKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. ethernet.getMacAddress().then((data: Array<ethernet.MacAddressInfo>) => {
5. console.info("getMacAddress promise data = " + JSON.stringify(data));
6. }).catch((error: BusinessError) => {
7. console.error("getMacAddress promise error = " + JSON.stringify(error));
8. });
```

## MacAddressInfo14+

PhonePC/2in1TabletTV

以太网网卡名称及MAC地址信息。

**系统能力**：SystemCapability.Communication.NetManager.Ethernet

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| iface | string | 否 | 否 | 以太网网卡名称。 |
| macAddress | string | 否 | 否 | 以太网网卡MAC地址信息。 |