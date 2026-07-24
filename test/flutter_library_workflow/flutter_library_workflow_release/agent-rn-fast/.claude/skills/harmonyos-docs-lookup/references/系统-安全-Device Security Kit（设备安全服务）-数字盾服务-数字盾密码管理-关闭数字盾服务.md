## 场景介绍

当用户不再使用数字盾时，可以通过密码认证主动发起关闭数字盾的操作；若用户忘记密码或连续密码认证失败次数达到最大限制导致数字盾密码锁定，盾应用将在重新激活数字盾时，无需进行密码认证直接关闭最初激活的数字盾，并通过[设置数字盾密码](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/devicesecurity-trustedauth-setpwd)重新创建新的数字盾密码。

## 约束与限制

本功能目前仅在手机设备支持。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a/v3/eEykdaEUQjWmrr1HCOrl8w/zh-cn_image_0000002514988439.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T043226Z&HW-CC-Expire=86400&HW-CC-Sign=833C7391FF649EED717B452BCAA9E4703F3F2CBCDE087FEA3A793646DE1D9329 "点击放大")

当不需要密码认证进行关闭数字盾申请时，则无需和Universal Keystore Kit交互，使用随机生成的challenge完成关闭数字盾操作。

## 接口说明

接口及使用方法请参见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-trusted-auth-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [disableTrustedAuthentication](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-trusted-auth-api#section10828741113612)(challenge: Uint8Array, needAuth: boolean, authID: bigint, label: TUILable): Promise<AuthToken> | 关闭数字盾服务 |

## 关闭数字盾服务界面介绍

如图为需要进行密码认证的方式关闭数字盾服务时对应的TUI界面示例。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/31/v3/dZIQHRr6RuKRqKZBejUYaQ/zh-cn_image_0000002482908444.png?HW-CC-KV=V1&HW-CC-Date=20260414T043226Z&HW-CC-Expire=86400&HW-CC-Sign=4521D334B135EFCBEB75D9D957ACC071CA635DF03C88DD4A7B976CC10795E254 "点击放大")

## 开发步骤

### 密码认证方式关闭数字盾服务

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
2. 关闭数字盾前，需从服务器获取当前账号在[设置数字盾密码](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/devicesecurity-trustedauth-setpwd)时获取的authID。
3. 参考密钥管理服务提供的[签名/验签指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-signing-signature-verification-arkts)，初始化签名会话。
4. 调用关闭数字盾服务接口，发起数字盾服务关闭申请。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 关闭数字盾服务
   2. async function DisablePwd(challenge: Uint8Array, context: common.UIAbilityContext):Promise<trustedAuthentication.AuthToken> {
   3. try {
   4. const authID: bigint = 1687413472599354502n;//实际填充为从服务器获取到的账号对应的authID值
   5. const resourceMgr: resourceManager.ResourceManager = context.resourceManager;
   6. const fileData : Uint8Array = await resourceMgr.getRawFileContent('test_logo_rgba.png'); //实际使用时请替换为应用要在TUI界面展示的logo图片名称
   7. const buffer = fileData.buffer;
   8. const label:trustedAuthentication.TUILable = {
   9. image: buffer as ArrayBuffer,
   10. title: "关闭数字盾",
   11. }
   12. const authToken = await trustedAuthentication.disableTrustedAuthentication(challenge, true, authID, label);
   13. return authToken;
   14. } catch (err) {
   15. hilog.error(0x0000, 'testTag', `Failed to disableTrustedAuthentication, code:${err.code}, message:${err.message}`);
   16. throw new Error('Close trusted authentication failed:' + (err as BusinessError).message);
   17. }
   18. }
   19. const rand = cryptoFramework.createRandom();
   20. const len: number = 32;
   21. const challenge: Uint8Array = rand?.generateRandomSync(len)?.data;//实际使用时请替换为通过UniversalKeystoreKit初始化会话获取的challenge
   22. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
   23. const authToken: trustedAuthentication.AuthToken = await DisablePwd(challenge, context);
   ```
5. 参考密钥管理服务提供的[签名/验签指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-signing-signature-verification-arkts), 对通过关闭数字盾获取到的authToken数据进行签名，并结束会话。

### 无需密码认证方式关闭数字盾服务

使用cryptoFramework生成的32字节随机数作为challenge，直接调用关闭数字盾服务接口即可，生成的authToken信息未经过密码认证，不可进行签名校验。

收起

自动换行

深色代码主题

复制

```
1. // 关闭数字盾服务
2. async function DisablePwd(challenge: Uint8Array):Promise<trustedAuthentication.AuthToken> {
3. try {
4. const authID: bigint = 1687413472599354502n;//实际填充为从服务器获取到的账号对应的authID值
5. let emptyBuffer = new ArrayBuffer(0);
6. const label:trustedAuthentication.TUILable = {
7. image: emptyBuffer,
8. title: "",
9. }
10. const authToken = await trustedAuthentication.disableTrustedAuthentication(challenge, false, authID, label);
11. return authToken;
12. } catch (err) {
13. hilog.error(0x0000, 'testTag', `Failed to disableTrustedAuthentication, code:${err.code}, message:${err.message}`);
14. throw new Error('Close trusted authentication failed:' + (err as BusinessError).message);
15. }
16. }
17. const rand = cryptoFramework.createRandom();
18. const len: number = 32;
19. const challenge: Uint8Array = rand?.generateRandomSync(len)?.data;//此处使用的challenge为通过cryptoFramework生成的32字节随机数即可
20. const authToken: trustedAuthentication.AuthToken = await DisablePwd(challenge);
```