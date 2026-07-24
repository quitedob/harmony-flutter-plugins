## FIDO开发准备

开发者的业务需要接入符合FIDO UAF标准的协议，并部署符合FIDO UAF标准协议的FIDO服务端。FIDO网址: <https://fidoalliance.org/> （见[网站链接免责声明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/onlineauthentication-website-disclaimer)）。

## IFAA开发准备

开发者的业务接入IIFAA联盟，并接入IIFAA中心服务器。IIFAA网址：<https://www.iifaa.org.cn/technical#paper> （见[网站链接免责声明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/onlineauthentication-website-disclaimer)）。

## SOTER开发准备

开发者的业务接入SOTER服务器。SOTER github：<https://github.com/Tencent/soter>（见[网站链接免责声明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/onlineauthentication-website-disclaimer)）。

## 通行密钥开发准备

* 开发者基于FIDO2的CAPI接口开发时（调用ArkTs接口时不涉及），需要申请如下通行密钥服务权限。在申请权限前，请保证符合[权限使用的基本原则](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-mgmt-overview#权限使用的基本原则)。申请方式请参考：[申请受限权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions-in-acl)。

展开

| 应用能力 | 需要权限 |
| --- | --- |
| 通行密钥 | ohos.permission.ACCESS\_FIDO2\_ONLINEAUTH |

* FIDO2协议基于应用的网址域名开通应用的通行密钥，开发者的应用需要关联网址域名，才可使用通行密钥服务。接入需完成三步：[在AGC开通App Linking服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-linking-startup#zh-cn_topic_0000001862787784_section189581229144811) > [在开发者网站上关联应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-linking-startup#section6903241628) > [在AGC创建关联的网址域名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-linking-startup#section1101111611317) > [在module.json5中配置关联的网址域名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-linking-startup#section13808113610362)。