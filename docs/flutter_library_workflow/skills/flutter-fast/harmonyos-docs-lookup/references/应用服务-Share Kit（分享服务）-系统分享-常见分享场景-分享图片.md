图片类型分享支持将一张或多张图片分享到目标设备/目标应用。

* 目标设备接收时，图片会保存到图库中。
* 目标应用接收时，可便捷的处理图片内容。例如：将一张图片分享给畅连，发送给畅连好友。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/eb/v3/6pOPnVfIQZug150zWahXEg/zh-cn_image_0000002513289537.png?HW-CC-KV=V1&HW-CC-Date=20260414T033501Z&HW-CC-Expire=86400&HW-CC-Sign=EB2BAC36BDA374303B1AF57E6A56484C47263C923C50D5379949F138D4E87F95 "点击放大")

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
   5. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 构造分享数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 构造ShareData，需配置一条有效数据信息
   2. let uiContext: UIContext = this.getUIContext();
   3. let contextFaker: Context = uiContext.getHostContext() as Context;
   4. let filePath = contextFaker.filesDir + '/exampleImage.jpg'; // 仅为示例 请替换正确的文件路径
   5. // 获取精准的utd类型
   6. let utdTypeId = utd.getUniformDataTypeByFilenameExtension('.jpg', utd.UniformDataType.IMAGE);
   7. let shareData: systemShare.SharedData = new systemShare.SharedData({
   8. utd: utdTypeId,
   9. uri: fileUri.getUriFromPath(filePath),
   10. title: '图片标题', // 不传title字段时,显示图片文件名
   11. description: '图片描述', // 不传description字段时,显示图片大小
   12. // thumbnail: new Uint8Array() // 优先使用传递的缩略图预览  不传则默认使用原图做预览图
   13. });
   ```

   说明

   沙箱路径可通过[fileUri.getUriFromPath](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-file-fileuri#fileurigeturifrompath)方法获取文件URI。
3. 额外增加一条数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. shareData.addRecord({
   2. utd: utdTypeId,
   3. uri: fileUri.getUriFromPath(filePath),
   4. title: '图片标题', // 不传title字段时,显示图片文件名
   5. description: '图片描述', // 不传description字段时,显示图片大小
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

   完整示例代码请参见：[samplecode-分享图片](https://gitcode.com/harmonyos_samples/share-kit_-sample-code_-clientdemo_-arkts/blob/master/entry/src/main/ets/scenario/ImageScenario.ets)。