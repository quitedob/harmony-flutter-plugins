## 场景介绍

当用户期望关闭指定生物特征认证能力时，可以通过指定已开通的生物特征信息，关闭指定的生物类型认证能力。

## 约束与限制

本功能目前仅在手机设备支持，且需应用服务器端同步接入配合端云协同认证。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ed/v3/RgLLFX8iTriHPc6lhVflFA/zh-cn_image_0000002514988431.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T043244Z&HW-CC-Expire=86400&HW-CC-Sign=41570248EEA1D81B401DC8F20BA7BEFF99714A574270970721E144F9BD0E4569 "点击放大")

## 接口说明

接口及使用方法请参见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-arktsapi-errcode-trusted-auth)。

展开

| 接口名 | 描述 |
| --- | --- |
| [disableTrustedBioAuthentication](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-trusted-auth-api#section129741528131215)(authID: bigint, authType: [AuthType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-trusted-auth-api#section58527274920)): Promise<void> | 解绑指定生物类型认证能力 |

## 开发步骤

1. 导入trustedAuthentication 和相关依赖模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { trustedAuthentication} from '@kit.DeviceSecurityKit';
   2. import { BusinessError} from '@kit.BasicServicesKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 首先开发者需要在服务器查询对应账户是否已开通对应生物特征认证能力，在确认开通后方可发起解绑指定生物类型认证能力请求。
3. 发起关闭指定生物类型认证能力请求前，需从服务器获取当前账号在[设置数字盾密码](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/devicesecurity-trustedauth-setpwd)时获取的authID。
4. 调用数字盾解绑指定生物类型认证能力接口发起关闭对应生物类型认证能力申请。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const TAG = "TrustedAuthenticationJsTest";
   2. try {
   3. const authID: bigint = 1687413472599354502n;//实际填充为从服务器获取到的账号对应的authID值
   4. const authType = trustedAuthentication.AuthType.AUTH_TYPE_FACE; //实际填充为计划解绑的生物特征类型
   5. const remainTimes = await trustedAuthentication.disableTrustedBioAuthentication(authID, authType);
   6. } catch (err) {
   7. let e: BusinessError = err as BusinessError;
   8. hilog.error(0x0000, TAG, 'disableTrustedBioAuthentication: %{public}d %{public}s', e.code, e.message);
   9. }
   ```
5. 在接收到端侧解绑成功结果后，开发者需要同步将服务器绑定的生物特征信息解绑。