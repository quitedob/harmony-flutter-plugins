## 分享App Linking直达应用

使用App Linking分享应用，目标设备接收后可直达应用，参见：[使用App Linking实现应用间跳转](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-linking-startup)。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/74/v3/1LbvAu3AQBO53Ur-sat6xw/zh-cn_image_0000002481169688.png?HW-CC-KV=V1&HW-CC-Date=20260414T033457Z&HW-CC-Expire=86400&HW-CC-Sign=670B3B7D300225424EC7C4831510981B9582CD2837770DEEEDE866F0EA6E0B7F "点击放大")

### 开发步骤

1. 开通App Linking服务，并完成相关配置，App Linking需经过调试。参见：[调试App Linking](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/agc-applinking-debug-0000001059139667)。
2. 在应用配置文件（src/main/module.json5）的[skills](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file#skills标签)配置中增加关联配置。参见：[声明应用关联的网站域名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-linking-startup#section1101111611317)。
3. 使用App Linking发起系统分享。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { systemShare } from '@kit.ShareKit';
   2. import { uniformTypeDescriptor as utd } from '@kit.ArkData';
   3. import { common } from '@kit.AbilityKit';
   4. import { image } from '@kit.ImageKit';
   5. import { BusinessError } from '@kit.BasicServicesKit';

   7. @Component
   8. export default struct Index {
   9. private async share() {
   10. // 生成应用图标缩略图
   11. let uiContext: UIContext = this.getUIContext();
   12. let contextFaker: Context = uiContext.getHostContext() as Context;
   13. let thumbnailPath = contextFaker.filesDir + '/exampleImage.jpg'; // 仅为示例 请替换正确的文件路径
   14. let imageSource: image.ImageSource = image.createImageSource(thumbnailPath);
   15. let imagePacker: image.ImagePacker = image.createImagePacker();
   16. let buffer: ArrayBuffer = await imagePacker.packToData(imageSource, {
   17. // 当前只支持'image/jpeg','image/webp'和'image/png'类型图片.
   18. format: 'image/jpeg',
   19. // JPEG编码中设定输出图片质量的参数,取值范围为0-100.
   20. // 建议适当压缩,图片过大无法拉起分享.
   21. quality: 30
   22. });
   23. // 构造ShareData，需配置一条有效数据信息
   24. let shareData: systemShare.SharedData = new systemShare.SharedData({
   25. utd: utd.UniformDataType.HYPERLINK,
   26. // App Linking链接 仅为示例
   27. content: 'https://sharekitdemo.drcn.agconnect.link/ZB3p',
   28. title: '应用名称', // 不传title时 显示链接
   29. description: '应用描述', // 不传则不显示描述内容
   30. thumbnail: new Uint8Array(buffer) // 推荐传入应用图标 不传则显示默认html图标
   31. });
   32. // 进行分享面板显示
   33. let controller: systemShare.ShareController = new systemShare.ShareController(shareData);
   34. let context: common.UIAbilityContext = uiContext.getHostContext() as common.UIAbilityContext;
   35. controller.show(context, {
   36. previewMode: systemShare.SharePreviewMode.DEFAULT,
   37. selectionMode: systemShare.SelectionMode.SINGLE
   38. }).then(() => {
   39. console.info('ShareController show success.');
   40. }).catch((error: BusinessError) => {
   41. console.error(`ShareController show error. code: ${error.code}, message: ${error.message}`);
   42. });
   43. }

   45. build() {
   46. Button('分享')
   47. .onClick(() => this.share())
   48. }
   49. }
   ```
4. 目标应用处理App Linking。参见：[拉起方实现跳转指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-linking-startup#section93961521541)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common, OpenLinkOptions } from '@kit.AbilityKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';

   4. @Entry
   5. @Component
   6. struct Index {
   7. build() {
   8. Button('start link', { type: ButtonType.Capsule, stateEffect: true })
   9. .width('87%')
   10. .height('5%')
   11. .margin({ bottom: '12vp' })
   12. .onClick(() => {
   13. let uiContext: UIContext = this.getUIContext();
   14. let context: common.UIAbilityContext = uiContext.getHostContext() as common.UIAbilityContext;
   15. let link: string = "https://www.example.com/programs?action=showall";
   16. let openLinkOptions: OpenLinkOptions = {
   17. appLinkingOnly: false
   18. };
   19. context.openLink(link, openLinkOptions)
   20. .then(() => {
   21. console.info('openlink success.');
   22. })
   23. .catch((error: BusinessError) => {
   24. console.error(`openlink failed. code: ${error.code}, message: ${error.message}`);
   25. });
   26. })
   27. }
   28. }
   ```

   完整示例代码请参见：[samplecode-分享App Linking直达应用](https://gitcode.com/harmonyos_samples/share-kit_-sample-code_-clientdemo_-arkts/blob/master/entry/src/main/ets/scenario/AppLinkingScenario.ets)。

## 分享普通链接直达浏览器

普通链接分享支持将网页链接到目标设备/目标应用。

* 目标设备接收时，通过浏览器直接打开链接。
* 目标应用接收时，可便捷地处理链接内容。例如：将一个链接分享给畅连，发送给畅连好友。

### 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { systemShare } from '@kit.ShareKit';
   2. import { uniformTypeDescriptor as utd } from '@kit.ArkData';
   3. import { common } from '@kit.AbilityKit';
   4. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 构造分享数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 构造ShareData，需配置一条有效数据信息
   2. let shareData: systemShare.SharedData = new systemShare.SharedData({
   3. utd: utd.UniformDataType.HYPERLINK,
   4. content: 'https://www.vmall.com/index.html?cid=128688', // 仅为示例 使用时请替换为自己的链接
   5. title: '华为商城',
   6. description: '华为手机',
   7. // thumbnail: new Uint8Array() // 推荐传入适合的缩略图 不传则显示默认html图标
   8. });
   ```
3. 额外增加一条数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. shareData.addRecord({
   2. utd: utd.UniformDataType.HYPERLINK,
   3. content: 'https://www.vmall.com/index.html?cid=128688', // 仅为示例 使用时请替换为自己的链接
   4. title: '测试链接',
   5. description: '测试描述',
   6. });
   ```
4. 启动分享面板。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 进行分享面板显示
   2. let controller: systemShare.ShareController = new systemShare.ShareController(shareData);
   3. let uiContext: UIContext = this.getUIContext();
   4. let context: common.UIAbilityContext = uiContext.getHostContext() as common.UIAbilityContext;
   5. controller.show(context, {
   6. selectionMode: systemShare.SelectionMode.SINGLE,
   7. previewMode: systemShare.SharePreviewMode.DEFAULT,
   8. }).then(() => {
   9. console.info('ShareController show success.');
   10. }).catch((error: BusinessError) => {
   11. console.error(`ShareController show error. code: ${error.code}, message: ${error.message}`);
   12. });
   ```

   完整示例代码请参见：[samplecode-分享普通链接直达浏览器](https://gitcode.com/harmonyos_samples/share-kit_-sample-code_-clientdemo_-arkts/blob/master/entry/src/main/ets/scenario/LinkScenario.ets)。