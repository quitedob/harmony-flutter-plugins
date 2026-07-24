## 场景介绍

系统操作区提供了复制、保存、另存为、打印、复制到中转站等系统级快捷操作。宿主应用可以根据自己的业务体验需要判断是否给用户提供相关操作。

比如，分享的图片不需要被打印出来，本次分享将打印按钮从操作区移除。

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { fileUri } from '@kit.CoreFileKit';
   3. import { systemShare } from '@kit.ShareKit';
   4. import { uniformTypeDescriptor as utd } from '@kit.ArkData';
   ```
2. 构造分享数据，可添加多条分享记录。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 构造ShareData，需配置一条有效数据信息
   2. let data: systemShare.SharedData = new systemShare.SharedData({
   3. utd: utd.UniformDataType.PLAIN_TEXT,
   4. content: 'Hello HarmonyOS'
   5. });
   6. // 通过addRecord方法可添加多条记录 通过设置selectionMode实现一条或批量分享
   7. let uiContext: UIContext = this.getUIContext();
   8. let contextFaker: Context = uiContext.getHostContext() as Context;
   9. let filePath = contextFaker.filesDir + '/exampleImage.jpg'; // 仅为示例 请替换正确的文件路径
   10. data.addRecord({
   11. utd: utd.UniformDataType.PNG,
   12. uri: fileUri.getUriFromPath(filePath)
   13. });
   ```
3. 启动分享面板，并配置不显示打印快捷操作。如需屏蔽其他系统级快捷操作，请参考[ShareAbilityType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share#section205631342153016)介绍。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 构建ShareController
   2. let controller: systemShare.ShareController = new systemShare.ShareController(data);
   3. let context: common.UIAbilityContext = uiContext.getHostContext() as common.UIAbilityContext;
   4. // 注册分享面板关闭监听
   5. controller.on('dismiss', () => {
   6. console.info('Share panel closed');
   7. // 分享结束，可处理其他业务。
   8. });
   9. // 进行分享面板显示
   10. controller.show(context, {
   11. previewMode: systemShare.SharePreviewMode.DETAIL,
   12. selectionMode: systemShare.SelectionMode.SINGLE,
   13. excludedAbilities: [systemShare.ShareAbilityType.PRINT]
   14. })
   ```