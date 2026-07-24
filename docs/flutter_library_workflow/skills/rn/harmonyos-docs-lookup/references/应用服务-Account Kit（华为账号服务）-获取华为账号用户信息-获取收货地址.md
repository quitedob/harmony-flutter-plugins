## 场景介绍

当应用需要获取用户收货地址时，可使用Account Kit提供的获取收货地址的能力，引导用户添加或选择已有的收货地址，并最终获取用户的收货地址。以下对Account Kit提供的获取收货地址能力进行介绍，获取收货地址功能还可使用场景化控件[选择收货地址Button](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-button-ship-to)进行实现。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b9/v3/Om4w9eSSQ0-TE-5xhvC6wQ/zh-cn_image_0000002497063288.png?HW-CC-KV=V1&HW-CC-Date=20260414T024723Z&HW-CC-Expire=86400&HW-CC-Sign=FED6334828D449F9FAE8C2B1CB63F14613CB67061A221615A14FF9E45F3437B4 "点击放大")

## 约束与限制

1. 收货地址中的手机号信息仅支持输入中国境内（香港特别行政区、澳门特别行政区、中国台湾除外）手机号、地址信息只支持填写中国境内（香港特别行政区、澳门特别行政区、中国台湾除外）。
2. Wearable、TV设备暂不支持使用获取收货地址功能。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/76/v3/trifvriMRJObbqzZVmolDQ/zh-cn_image_0000002497063290.png?HW-CC-KV=V1&HW-CC-Date=20260414T024723Z&HW-CC-Expire=86400&HW-CC-Sign=38507E16D0ED29F2CE64DCB2D0F1A20234BA7E27308F9542E373A488A68DA820)

流程说明：

1. 用户需要使用收货地址时，应用程序调用选择收货地址API，打开华为账号收货地址管理页面。
2. 用户可以在收货地址管理页面添加新的收货地址或者选择已有收货地址，点击确认后可将选择的收货地址返回给应用。

## 接口说明

获取收货地址关键接口如下表所示，具体API说明详见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-choose-address)。

展开

| 接口名 | 描述 |
| --- | --- |
| [chooseAddress](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-choose-address#section0668846105912)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-common#context)): Promise<[AddressInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-choose-address#section9615740103819)> | 拉起收货地址管理页面并返回用户所选择的收货地址。 |

注意

上述接口需在页面或自定义组件生命周期内调用。

## 开发前提

在进行代码开发前，请先确认以下准备工作是否完成：

1、是否完成[申请账号权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-config-permissions)，未申请通过调用获取收货地址API，将返回[1008100005 应用未申请对应permissions权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-error-code#section515972151510)错误码，无法获取收货地址。

说明

如果在权限申请前已完成“配置签名和指纹”，则需要重新[申请调试Profile](https://developer.huawei.com/consumer/cn/doc/app/agc-help-debug-profile-0000002248181278)，并重新[手动配置签名信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section297715173233)。

2、是否完成[配置签名和指纹](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-sign-fingerprints)、[配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-client-id)，未配置调用获取收货地址API，将返回 [1008100004 应用指纹证书校验失败](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-error-code#section1415952110158)错误码，无法获取收货地址。

## 开发步骤

1. 导入[shippingAddress](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-choose-address)模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { shippingAddress } from '@kit.AccountKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 调用[chooseAddress](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-choose-address#section0668846105912)方法打开收货地址管理页面，引导用户添加或选择收货地址后，应用即可获取用户收货地址。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 执行请求
   2. try {
   3. // 此示例为代码片段，实际需在自定义组件实例中使用，以获取UIContext对象作为函数入参
   4. shippingAddress.chooseAddress(this.getUIContext().getHostContext()).then((data: shippingAddress.AddressInfo) => {
   5. hilog.info(0x0000, 'testTag', 'Succeeded in choosing address.');
   6. const userName: string = data.userName;
   7. const mobileNumber: string = data.mobileNumber;
   8. const countryCode: string = data.countryCode;
   9. const provinceName: string = data.provinceName;
   10. const cityName: string = data.cityName;
   11. const districtName: string = data.districtName;
   12. const streetName: string = data.streetName;
   13. const detailedAddress: string = data.detailedAddress;
   14. // 开发者处理获取的收货地址信息
   15. }).catch((error: BusinessError) => {
   16. dealAllError(error);
   17. })
   18. } catch (error) {
   19. dealAllError(error);
   20. }
   ```

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 错误处理
   2. function dealAllError(error: BusinessError): void {
   3. hilog.error(0x0000, 'testTag', `Failed to chooseAddress. Code: ${error.code}, message: ${error.message}`);
   4. }
   ```