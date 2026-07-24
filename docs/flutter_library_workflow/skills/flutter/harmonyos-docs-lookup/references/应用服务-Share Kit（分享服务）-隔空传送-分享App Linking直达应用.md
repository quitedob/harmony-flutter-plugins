提供如何通过隔空传送分享实现直达应用，应用需接入App Linking以确保端到端完整的体验。参考：[使用App Linking实现应用间跳转](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-linking-startup)。

## 注意事项

1. 当进入可分享页面时，使用[harmonyShare.on('gesturesShare')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-harmony-share#section79507713161)方法注册隔空传送监听事件。
2. 当离开可分享页面（包括**应用退至后台**等场景）时，使用[harmonyShare.off('gesturesShare')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-harmony-share#section3951197151616)方法取消隔空传送监听事件。

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { uniformTypeDescriptor as utd } from '@kit.ArkData';
   2. import { systemShare, harmonyShare } from '@kit.ShareKit';
   3. import { fileUri } from '@kit.CoreFileKit';
   ```
2. 定义隔空传送分享事件监听/取消监听方法（收到隔空传送分享事件回调后，建议3秒内调用[sharableTarget.share()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-harmony-share#section1862171812120)方法发起分享，否则可能导致超时失败）。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. private immersiveCallback = (sharableTarget: harmonyShare.SharableTarget) => {
   2. let uiContext: UIContext = this.getUIContext();
   3. let contextFaker: Context = uiContext.getHostContext() as Context;
   4. let filePath = contextFaker.filesDir + '/exampleKnock1.jpg'; // 仅为示例 请替换正确的文件路径
   5. let shareData: systemShare.SharedData = new systemShare.SharedData({
   6. utd: utd.UniformDataType.HYPERLINK,
   7. content: 'https://sharekitdemo.drcn.agconnect.link/ZB3p',
   8. thumbnailUri: fileUri.getUriFromPath(filePath),
   9. title: '隔空传送分享卡片标题',
   10. description: '隔空传送分享卡片描述'
   11. });
   12. sharableTarget.share(shareData);
   13. }

   15. private immersiveListening() {
   16. harmonyShare.on('gesturesShare', this.immersiveCallback);
   17. }

   19. private immersiveDisablingListening() {
   20. harmonyShare.off('gesturesShare', this.immersiveCallback);
   21. }
   ```
3. 进入可分享页面时，注册隔空传送分享监听事件；离开可分享页面（包括**应用退至后台**等场景）时，取消隔空传送分享监听事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // Entry Component 代码片段
   2. onPageHide(): void {
   3. let uiContext: UIContext = this.getUIContext();
   4. let context: Context = uiContext.getHostContext() as Context;
   5. context.eventHub.emit('onBackGround');
   6. }
   ```

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. aboutToAppear(): void {
   2. this.immersiveListening();
   3. let uiContext: UIContext = this.getUIContext();
   4. let context: Context = uiContext.getHostContext() as Context;
   5. context.eventHub.on('onBackGround', this.onBackGround);
   6. }

   8. aboutToDisappear(): void {
   9. this.immersiveDisablingListening();
   10. let uiContext: UIContext = this.getUIContext();
   11. let context: Context = uiContext.getHostContext() as Context;
   12. context.eventHub.off('onBackGround', this.onBackGround);
   13. }

   15. private onBackGround = () => {
   16. this.immersiveDisablingListening();
   17. }
   ```