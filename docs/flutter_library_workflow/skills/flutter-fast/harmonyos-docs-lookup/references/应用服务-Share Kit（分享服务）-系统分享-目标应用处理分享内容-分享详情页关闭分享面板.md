从分享详情页返回分享面板时，可通过设置resultCode值为特定的[ShareAbilityResultCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share#section1711118591913)，以告知分享面板做出不同的处理，具体处理方式如下：

* ERROR：返回分享面板，并提示用户发生错误。
* BACK：正常返回分享面板。
* CLOSE：关闭分享面板。

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { ShareExtensionAbility, UIExtensionContentSession, Want } from '@kit.AbilityKit';
   2. import { systemShare } from '@kit.ShareKit';
   ```
2. 目标应用可以通过terminateSelfWithResult接口，设置resultCode值为systemShare.ShareAbilityResultCode.CLOSE，以关闭分享面板。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. export default class TestShareAbility extends ShareExtensionAbility {
   2. async onSessionCreate(want: Want, session: UIExtensionContentSession) {
   3. session.terminateSelfWithResult({
   4. resultCode: systemShare.ShareAbilityResultCode.CLOSE
   5. });
   6. }
   7. }
   ```