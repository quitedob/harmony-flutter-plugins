从5.1.0(18)版本开始，支持应用判断是否被系统分享拉起。

作为目标应用接入系统分享时，当应用被拉起，需要判断本次启动原因是被系统分享拉起的，以便处理对应的分享业务。

* 通过[UIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability)处理分享内容时，可使用[onCreate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability#oncreate)或[onNewWant](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability#onnewwant)的[LaunchParam.launchReasonMessage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-abilityconstant#launchparam)字段是否为'ReasonMessage\_SystemShare'判断。
* 通过[UIExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiextensionability)处理分享内容时，可使用[onCreate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiextensionability#oncreate)的[LaunchParam.launchReasonMessage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-abilityconstant#launchparam)字段是否为'ReasonMessage\_SystemShare'判断。

## 示例代码

* 通过[UIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability)处理分享内容。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
  2. import { window } from '@kit.ArkUI';

  4. export default class ShareUIAbility extends UIAbility {
  5. onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
  6. if (launchParam.launchReasonMessage === 'ReasonMessage_SystemShare') {
  7. // 识别为被系统分享拉起
  8. console.info('被拉起原因：系统分享');
  9. }
  10. }

  12. onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam): void {
  13. if (launchParam.launchReasonMessage === 'ReasonMessage_SystemShare') {
  14. // 识别为被系统分享拉起
  15. console.info('被拉起原因：系统分享');
  16. }
  17. }

  19. onWindowStageCreate(windowStage: window.WindowStage): void {
  20. windowStage.loadContent('pages/ShareUIPage'); // 此路径仅为示例 请替换实际路径
  21. }
  22. }
  ```
* 通过[UIExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiextensionability)处理分享内容。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { AbilityConstant, ShareExtensionAbility, UIExtensionContentSession, Want } from '@kit.AbilityKit';

  3. export default class ShareExtAbility extends ShareExtensionAbility {
  4. onCreate(launchParam: AbilityConstant.LaunchParam): void {
  5. if (launchParam.launchReasonMessage === 'ReasonMessage_SystemShare') {
  6. // 识别为被系统分享拉起
  7. console.info('被拉起原因：系统分享');
  8. }
  9. }

  11. onSessionCreate(want: Want, session: UIExtensionContentSession) {
  12. session.loadContent('pages/ShareExtDialog'); // 此路径仅为示例 请替换实际路径
  13. }
  14. }
  ```