从HarmonyOS 6.0.0(20)开始，在线认证服务提供了通行密钥特性。通行密钥主要提供了以下能力：

* 通行密钥注册：支持使用用户身份认证特征（如人脸、指纹、PIN码）作为平台认证器，在本设备上创建应用或网页的通行密钥。
* 本地免密认证：支持使用用户身份认证特征（如人脸、指纹、PIN码）作为平台认证器，使用通行密钥在本设备上进行应用或网页的免密认证。
* 跨设备扫码认证：支持使用已注册通行密钥的移动设备作为漫游认证器，使用跨设备扫码的方式，在其他设备上进行应用或网页的免密认证。

## 场景介绍

具体应用场景如下：

### 注册通行密钥

需要提供方便、快速、安全的本地应用或网页登录方式时，可以使用通行密钥服务的通行密钥注册能力为用户创建通行密钥。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/48/v3/BLicI4XFQQiW26kJ1THxzA/zh-cn_image_0000002490979848.png?HW-CC-KV=V1&HW-CC-Date=20260414T043621Z&HW-CC-Expire=86400&HW-CC-Sign=0E71A7C83D37500B858360464DC6D8DD0CE4F1958F9AFD3E95F89EF05B33977D "点击放大")

### 使用通行密钥登录本设备的应用或网页账号

用户在登录应用或者网页时，需要验证用户的身份，可以使用通行密钥服务的本地免密认证能力。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f6/v3/JnFuzX6ZRwOS5j_KQP8gXA/zh-cn_image_0000002491139818.png?HW-CC-KV=V1&HW-CC-Date=20260414T043621Z&HW-CC-Expire=86400&HW-CC-Sign=13D61C78A0EDB634865753E9CCF253FF41FF20DE3C7B1E8CC7291939F8F9677A "点击放大")

### 使用跨设备扫码登录其他设备的应用或网页账号

用户在其他设备上登录应用或网页时，需要验证用户的身份，可以使用通行密钥服务的跨设备扫码认证能力。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c/v3/3lrerGc_TjqhffOZIvU91w/zh-cn_image_0000002490979846.png?HW-CC-KV=V1&HW-CC-Date=20260414T043621Z&HW-CC-Expire=86400&HW-CC-Sign=75DA67BC63B021B9EAD14C3112E61ECC7425CA538DEDD01F5B94995B4C9BE192 "点击放大")

说明

以上使用场景均需要开发者部署符合FIDO2标准协议的FIDO服务器。

## 基本概念

通行密钥（Passkey）是基于[FIDO2标准协议](https://fidoalliance.org/passkeys/)（见[网站链接免责声明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/onlineauthentication-website-disclaimer)）实现的一种简单又安全的登录方式。借用通行密钥，用户可使用指纹、人脸或手机解锁PIN码登录应用或网页。相较于传统密码，通行密钥具有更便捷、安全的优势。更多关于FIDO的背景知识，可以参见[FIDO规范介绍](https://fidoalliance.org/specifications-overview/)（见[网站链接免责声明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/onlineauthentication-website-disclaimer)）。

## 约束与限制

需满足以下条件，才能使用该功能。

* 开发者的业务需要接入符合FIDO2标准的协议，并部署符合FIDO2标准协议的FIDO服务器。
* 移动端设备需要支持生物特征（指纹或3D人脸），查询当前移动端设备是否支持ATL4级别的认证可信等级。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { BusinessError } from '@kit.BasicServicesKit';
  2. import { userAuth } from '@kit.UserAuthenticationKit';

  4. try {
  5. // 示例，查询设备人脸识别是否支持ATL4级别的认证可信等级
  6. userAuth.getAvailableStatus(userAuth.UserAuthType.FACE, userAuth.AuthTrustLevel.ATL4);
  7. console.info('current auth trust level is supported');
  8. } catch (error) {
  9. const err: BusinessError = error as BusinessError;
  10. console.error(`current auth trust level is not supported. Code is ${err?.code}, message is ${err?.message}`);
  11. }
  ```
* 通行密钥服务需要联网以及蓝牙能力，以便提供完整的在线身份校验服务。应用在调用本服务API前，需将通行密钥服务联网、使用蓝牙行为向用户明示，并且取得用户同意。
* 根据[FIDO规范](https://fidoalliance.org/specifications-overview/)（见[网站链接免责声明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/onlineauthentication-website-disclaimer)），通行密钥服务需要将三方应用中的用户昵称及标识符信息上传至网络中继服务器，用于跨设备扫码认证场景，以便实现两台设备的认证数据通信。应用在调用本服务API前，需将收集的个人数据信息向用户明示，并且取得用户同意。

## 业务流程

**注册流程介绍**

1. 应用程序或浏览器集成Online Authentication Kit中的通行密钥模块，向FIDO服务器发起注册请求。
2. FIDO服务器将注册信息（如挑战值等）返回给应用程序，应用程序组装注册报文，使用通行密钥服务进行注册。
3. 通行密钥服务使用认证器验证通过后，会生成一对凭据密钥对，然后用其预置的私钥对生成的公钥及注册信息（如挑战值等）进行签名。
4. 通行密钥服务返回签名给应用程序。应用程序发给FIDO服务器进行注册。
5. FIDO服务器验证签名，保存公钥，并将处理结果返回给应用程序。

**认证流程介绍**

1. 应用程序或浏览器集成Online Authentication Kit中的通行密钥模块，并向FIDO服务器发起认证请求。
2. FIDO服务器将认证信息（如挑战值等）返回给应用程序，应用程序组装认证报文，使用通行密钥服务进行认证。
3. 通行密钥服务使用认证器验证通过后，用其保存的私钥对认证信息（如挑战值等）进行签名。
4. 通行密钥服务返回签名给应用程序。应用程序发给FIDO服务器进行认证。
5. FIDO服务器验证签名，并将处理结果返回给应用程序。