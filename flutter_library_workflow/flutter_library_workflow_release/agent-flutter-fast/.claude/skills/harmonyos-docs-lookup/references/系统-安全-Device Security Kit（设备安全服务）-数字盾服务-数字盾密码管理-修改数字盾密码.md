## 场景介绍

激活数字盾后，用户可在完成旧密码认证后，修改数字盾密码信息。

## 约束与限制

本功能目前仅在手机设备支持。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/45/v3/GgwWkDlsQWO8BN1yCvL5KQ/zh-cn_image_0000002515108421.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T043222Z&HW-CC-Expire=86400&HW-CC-Sign=39C2DA33E2B244C353D448B292D49C2C5CDABB5ECA9A668A8F80D5B42F2B8831 "点击放大")

## 接口说明

接口及使用方法请参见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-trusted-auth-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [modifyTrustedAuthenticationPwd](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-trusted-auth-api#section1794633020274)(challenge: Uint8Array, pwdInfo: PasswordInfo, authID: bigint, label: TUILable): Promise<AuthToken> | 修改数字盾密码 |

## 修改数字盾密码界面介绍

如图1、图2为修改数字盾密码时对应的TUI界面示例，用户需使用旧密码认证通过后，方可设置新密码。密码认证失败时，剩余认证次数减1，当剩余认证次数为0时，则锁定数字盾服务。新密码长度、对应TUI应用图标以及当前应用场景说明均由开发者调用接口时传入。

**图1** 旧密码认证   
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7f/v3/vvs8eomWSn6FdWRRLybNBQ/zh-cn_image_0000002514988421.png?HW-CC-KV=V1&HW-CC-Date=20260414T043222Z&HW-CC-Expire=86400&HW-CC-Sign=C5AE05811A89CB49DC9267C5B0EDD3DB1040A0C5C8C01ECBD529289568C89565 "点击放大")

**图2** 新密码设置

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ea/v3/khdBcLKvSu6MaHZSaGWGEQ/zh-cn_image_0000002501321964.png?HW-CC-KV=V1&HW-CC-Date=20260414T043222Z&HW-CC-Expire=86400&HW-CC-Sign=FF5F417BA58B616CD6863779D13DA5439C5C55C237E5A5C072E636E3556D5E8B "点击放大")

## 开发步骤

1. 导入huks 、trustedAuthentication 和相关依赖模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { resourceManager } from '@kit.LocalizationKit'
   2. import { huks } from '@kit.UniversalKeystoreKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';
   4. import { trustedAuthentication } from '@kit.DeviceSecurityKit';
   5. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
   6. import { hilog } from '@kit.PerformanceAnalysisKit';
   7. import { common } from '@kit.AbilityKit';
   ```
2. 修改密码前，需从服务器获取当前账号在[设置数字盾密码](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/devicesecurity-trustedauth-setpwd)时获取的authID。
3. 参考密钥管理服务提供的[签名/验签指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-signing-signature-verification-arkts)，初始化签名会话。
4. 调用数字盾服务修改密码接口，发起数字盾密码修改申请。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 修改数字盾密码
   2. async function ModifyPwd(challenge: Uint8Array, context: common.UIAbilityContext):Promise<trustedAuthentication.AuthToken> {
   3. try {
   4. const passwordInfo: trustedAuthentication.PasswordInfo = {
   5. pwdType: trustedAuthentication.PasswordType.PASSWORD_TYPE_DIGITAL,
   6. pwdMaxLength: 10,
   7. pwdMinLength: 6,
   8. maxAuthFailCount: 6,
   9. };
   10. const authID: bigint = 1687413472599354502n;//实际填充为从服务器获取到的账号对应的authID值
   11. const resourceMgr: resourceManager.ResourceManager = context.resourceManager;
   12. const fileData : Uint8Array = await resourceMgr.getRawFileContent('test_logo_rgba.png'); //实际使用时请替换为应用要在TUI界面展示的logo图片名称
   13. const buffer = fileData.buffer;
   14. const label:trustedAuthentication.TUILable = {
   15. image: buffer as ArrayBuffer,
   16. title: "修改密码",
   17. }
   18. const authToken = await trustedAuthentication.modifyTrustedAuthenticationPwd(challenge, passwordInfo, authID, label);
   19. return authToken;
   20. } catch (err) {
   21. hilog.error(0x0000, 'testTag', `Failed to modifyTrustedAuthenticationPwd, code:${err.code}, message:${err.message}`);
   22. throw new Error('Modify password failed:' + (err as BusinessError).message);
   23. }
   24. }
   25. const rand = cryptoFramework.createRandom();
   26. const len: number = 32;
   27. const challenge: Uint8Array = rand?.generateRandomSync(len)?.data;//实际使用时请替换为通过UniversalKeystoreKit初始化会话获取的challenge
   28. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
   29. const authToken: trustedAuthentication.AuthToken = await ModifyPwd(challenge, context);
   ```
5. 参考密钥管理服务提供的[签名/验签指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-signing-signature-verification-arkts), 对通过修改密码获取到的authToken数据进行签名，并结束会话。