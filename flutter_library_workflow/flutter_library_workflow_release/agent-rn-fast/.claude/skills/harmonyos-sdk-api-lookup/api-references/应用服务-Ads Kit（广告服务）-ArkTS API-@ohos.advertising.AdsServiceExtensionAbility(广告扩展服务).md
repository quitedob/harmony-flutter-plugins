本模块为设备厂商提供广告扩展能力，设备厂商可自主实现请求广告的回调。

说明

本模块首批接口从API version 11开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1Tablet



```
1. import { RespCallback } from '@kit.AdsKit';
```

## RespCallback

PhonePC/2in1Tablet

(respData: Map<string, Array<advertising.Advertisement>>): void

广告请求回调。

**系统能力：** SystemCapability.Advertising.Ads

**参数：**

展开

| **参数名** | **类型** | 必填 | 说明 |
| --- | --- | --- | --- |
| respData | Map<string, Array<advertising.[Advertisement](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-advertisement#advertisement)>> | 是 | 广告请求回调数据。 |

**示例：**



```
1. import { advertising, RespCallback } from '@kit.AdsKit';

3. function setRespCallback(respCallback: RespCallback) {
4. const respData: Map<string, Array<advertising.Advertisement>> = new Map();
5. // 设置广告返回数据
6. // ...
7. respCallback(respData);
8. }
```