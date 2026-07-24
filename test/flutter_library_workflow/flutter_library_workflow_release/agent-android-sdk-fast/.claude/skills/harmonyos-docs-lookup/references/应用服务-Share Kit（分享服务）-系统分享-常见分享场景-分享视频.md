视频类型分享支持将一个或多个视频分享到目标设备/目标应用。

* 目标设备接收时，视频会保存到图库中。
* 目标应用接收时，可便捷地处理视频内容。例如：将一个视频分享给畅连，发送给畅连好友。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/86/v3/Dz8WNOLCSv2CIxGLJ_ylnw/zh-cn_image_0000002513409501.png?HW-CC-KV=V1&HW-CC-Date=20260414T033505Z&HW-CC-Expire=86400&HW-CC-Sign=47D8F923807D4AC6AA63B5F1835A73E97D44D5BE102353811E5EC41032D26A24 "点击放大")

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { systemShare } from '@kit.ShareKit';
   2. import { uniformTypeDescriptor as utd } from '@kit.ArkData';
   3. import { common } from '@kit.AbilityKit';
   4. import { fileUri } from '@kit.CoreFileKit';
   5. import { image } from '@kit.ImageKit';
   6. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 生成视频封面图（推荐）。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 生成视频封面图
   2. let uiContext: UIContext = this.getUIContext();
   3. let contextFaker: Context = uiContext.getHostContext() as Context;
   4. let thumbnailPath = contextFaker.filesDir + '/exampleImage.jpg'; // 仅为示例 请替换正确的文件路径
   5. let imageSource: image.ImageSource = image.createImageSource(thumbnailPath);
   6. let imagePacker: image.ImagePacker = image.createImagePacker();
   7. let buffer: ArrayBuffer = await imagePacker.packToData(imageSource, {
   8. // 当前只支持'image/jpeg','image/webp'和'image/png'类型图片.
   9. format: 'image/jpeg',
   10. // JPEG编码中设定输出图片质量的参数,取值范围为0-100.
   11. // 建议适当压缩,图片过大无法拉起分享.
   12. quality: 30
   13. });
   ```
3. 构造分享数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 构造ShareData，需配置一条有效数据信息
   2. let filePath = contextFaker.filesDir + '/exampleVideo.mp4'; // 仅为示例 请替换正确的文件路径
   3. // 获取精准的utd类型
   4. let utdTypeId = utd.getUniformDataTypeByFilenameExtension('.mp4', utd.UniformDataType.VIDEO);
   5. let shareData: systemShare.SharedData = new systemShare.SharedData({
   6. utd: utdTypeId,
   7. uri: fileUri.getUriFromPath(filePath),
   8. title: '视频标题', // 不传title字段时,显示视频文件名
   9. description: '视频描述', // 不传description字段时,显示视频大小
   10. thumbnail: new Uint8Array(buffer), // 优先使用传递的缩略图做预览 不传则默认使用视频第一帧画面做预览图
   11. });
   ```

   说明

   沙箱路径可通过[fileUri.getUriFromPath](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-file-fileuri#fileurigeturifrompath)方法获取文件URI。
4. 额外增加一条数据

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. shareData.addRecord({
   2. utd: utdTypeId,
   3. uri: fileUri.getUriFromPath(filePath),
   4. title: '视频标题', // 不传title字段时,显示视频文件名
   5. description: '视频描述', // 不传description字段时,显示视频大小
   6. });
   ```
5. 启动分享面板。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 进行分享面板显示
   2. let controller: systemShare.ShareController = new systemShare.ShareController(shareData);
   3. let context: common.UIAbilityContext = uiContext.getHostContext() as common.UIAbilityContext;
   4. controller.show(context, {
   5. selectionMode: systemShare.SelectionMode.SINGLE,
   6. previewMode: systemShare.SharePreviewMode.DETAIL,
   7. }).then(() => {
   8. console.info('ShareController show success.');
   9. }).catch((error: BusinessError) => {
   10. console.error(`ShareController show error. code: ${error.code}, message: ${error.message}`);
   11. });
   ```

   完整示例代码请参见：[samplecode-分享视频](https://gitcode.com/harmonyos_samples/share-kit_-sample-code_-clientdemo_-arkts/blob/master/entry/src/main/ets/scenario/VideoScenario.ets)。