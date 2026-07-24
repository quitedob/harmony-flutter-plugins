## 场景介绍

选择头像Button功能可以帮助开发者调用对应Button组件快速拉起头像选择页面，供用户完成华为账号头像或其他头像的选择与展示。

运行示例代码单击头像按钮，拉起选择头像页面来设置头像（完整场景可参考[获取头像昵称](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-get-avatar-nickname)）。

## 前提条件

参见[开发前提](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-get-avatar-nickname#section41863510349)。

## 开发步骤

1. 导入Scenario Fusion Kit模块以及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { FunctionalButton, functionalButtonComponentManager } from '@kit.ScenarioFusionKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 在容器中声明FunctionalButton，指定Button的openType，并设置对应的回调函数，代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. // 将account.png文件添加到/resources/base/media/目录中。否则，将显示错误信息，提示找不到该文件。
   5. @State url: ResourceStr = $r('app.media.account');

   7. build() {
   8. Column() {
   9. // 声明FunctionalButton。
   10. FunctionalButton({
   11. params: {
   12. // OpenType.CHOOSE_AVATAR表示该按钮用于选择头像。
   13. openType: functionalButtonComponentManager.OpenType.CHOOSE_AVATAR,
   14. label: '',
   15. // 调整按钮样式。
   16. styleOption: {
   17. styleConfig: new functionalButtonComponentManager.ButtonConfig()
   18. .type(ButtonType.Normal)
   19. .backgroundImage(this.url)
   20. .backgroundImageSize(ImageSize.Cover)
   21. .width(80)
   22. .height(80)
   23. .backgroundColor('#E5E5E5')
   24. },
   25. },
   26. // 当OpenType设置为CHOOSE_AVATAR时，回调函数必须是onChooseAvatar。
   27. controller: new functionalButtonComponentManager.FunctionalButtonController().onChooseAvatar((err, data) => {
   28. if (err) {
   29. // 错误日志处理。
   30. hilog.error(0x0000, "testTag", "error: %{public}d %{public}s", err.code, err.message);
   31. return;
   32. }
   33. // 成功日志处理。
   34. hilog.info(0x0000, "testTag", "succeeded in choosing avatar");
   35. this.url = data.avatarUri!;
   36. })
   37. })
   38. }
   39. .padding({ top: 200 })
   40. .height('100%')
   41. .width('100%')
   42. }
   43. }
   ```

   说明

   * openType参数填写"functionalButtonComponentManager.OpenType.CHOOSE\_AVATAR"指定Button为选择头像类型。
   * controller参数必须对应填写"new functionalButtonComponentManager.FunctionalButtonController().onChooseAvatar"。
   * 若成功调用，可通过回调函数中的"avatarUri"获取头像图片的地址。
   * 可使用自定义Modifier设置按钮样式，参考[示例](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-functionalbuttoncomponentmanager#section1251915241170)。

   其他参数请参考：[FunctionalButton（Button组件）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-functionalbutton)。