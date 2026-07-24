## 概述

企业设备管理扩展能力组件，是设备管理应用必备组件。当开发者为企业开发设备管理应用时，需继承EnterpriseAdminExtensionAbility，在EnterpriseAdminExtensionAbility实例中实现MDM业务逻辑，EnterpriseAdminExtensionAbility实现了系统管理状态变化通知功能，并定义了管理应用激活、去激活、应用安装、卸载事件等回调接口。

## 接口说明

以下为本次开发示例所使用的接口，更多接口及使用方式请见[企业设备管理扩展能力接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterpriseadminextensionability)。

展开

| 接口名称 | 描述 |
| --- | --- |
| [onAdminEnabled(): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterpriseadminextensionability#enterpriseadminextensionabilityonadminenabled) | 设备管理应用被激活回调方法。 |
| [onAdminDisabled(): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterpriseadminextensionability#enterpriseadminextensionabilityonadmindisabled) | 设备管理应用被解除激活回调方法。 |
| [onBundleAdded(bundleName: string): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterpriseadminextensionability#enterpriseadminextensionabilityonbundleadded) | 应用安装回调方法。 |
| [onBundleRemoved(bundleName: string): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterpriseadminextensionability#enterpriseadminextensionabilityonbundleremoved) | 应用卸载回调方法。 |

## 开发步骤

新建一个工程后，结构如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/04/v3/y8c-PsOYQsWJAy6zNxd_IA/zh-cn_image_0000002571291923.png?HW-CC-KV=V1&HW-CC-Date=20260414T045645Z&HW-CC-Expire=86400&HW-CC-Sign=D2A2359E93D23FCCD528461F9664B7221D8C4638FA00B47F1F42997AF5CF14AE)

首先，创建一个EnterpriseAdmin类型的ExtensionAbility（也就是EnterpriseAdminExtensionAbility）。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1b/v3/qPSgtsfjQca9FtSTdW5iRw/zh-cn_image_0000002540611976.png?HW-CC-KV=V1&HW-CC-Date=20260414T045645Z&HW-CC-Expire=86400&HW-CC-Sign=FC093FAECC90A24870C102155BE01EF70A7A2931D785A3E028D90DD93DC31D87)

其次，打开新建的EnterpriseAdminAbility文件，导入EnterpriseAdminExtensionAbility模块，使其继承EnterpriseAdminExtensionAbility并加上需要的应用通知回调方法，如onAdminEnabled()、onAdminDisabled()等回调方法。当设备管理应用激活或者解除激活时，可以在对应回调方法中接收系统发送通知。

收起

自动换行

深色代码主题

复制

```
1. import { EnterpriseAdminExtensionAbility } from '@kit.MDMKit';
2. // ···

4. export default class EnterpriseAdminAbility extends EnterpriseAdminExtensionAbility {
5. // ···

7. // 设备管理器应用激活回调方法，应用可在此回调函数中进行初始化策略设置。
8. onAdminEnabled() {
9. console.info('onAdminEnabled');
10. // ···
11. }

13. // 设备管理器应用去激活回调方法，应用可在此回调函数中通知企业管理员设备已脱管。
14. onAdminDisabled() {
15. console.info('onAdminDisabled');
16. // ···
17. }

19. // 应用安装回调方法，应用可在此回调函数中进行事件上报，通知企业管理员。
20. onBundleAdded(bundleName: string) {
21. console.info('EnterpriseAdminAbility onBundleAdded bundleName:' + bundleName);
22. }

24. // 应用卸载回调方法，应用可在此回调函数中进行事件上报，通知企业管理员。
25. onBundleRemoved(bundleName: string) {
26. console.info('EnterpriseAdminAbility onBundleRemoved bundleName' + bundleName);
27. }
28. };
```

[EnterpriseAdminAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/EnterpriseAdminExtensionAbility/EnterpriseAdminExtensionAbility/entry/src/main/ets/enterpriseadminability/EnterpriseAdminAbility.ets#L27-L195)

最后，在工程Module对应的[module.json5](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file)配置文件中将EnterpriseAdminAbility注册为ExtensionAbility，type标签需要设置为“enterpriseAdmin”，srcEntry标签表示当前ExtensionAbility组件所对应的代码路径。

收起

自动换行

深色代码主题

复制

```
1. "extensionAbilities": [
2. {
3. "name": "EnterpriseAdminAbility",
4. "type": "enterpriseAdmin",
5. "exported": true,
6. "srcEntry": "./ets/enterpriseadminability/EnterpriseAdminAbility.ets"
7. }
8. ],
```

[module.json5](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/EnterpriseAdminExtensionAbility/EnterpriseAdminExtensionAbility/entry/src/main/module.json5#L51-L60)