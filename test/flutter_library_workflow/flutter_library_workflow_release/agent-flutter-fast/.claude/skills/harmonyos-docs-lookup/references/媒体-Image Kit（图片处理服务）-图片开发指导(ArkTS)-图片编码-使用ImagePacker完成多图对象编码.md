图片编码指将[Picture](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-picture)对象编码成不同格式的图片文件（当前仅支持编码为JPEG 和 HEIF 格式），用于后续处理，如保存、传输等。

## 开发步骤

图片编码相关API的详细介绍请参见[ImagePacker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagepacker)。

1. 导入相关模块包。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 导入相关模块包。
   2. import { image } from '@kit.ImageKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';
   4. import { common } from '@kit.AbilityKit';
   5. import { fileIo as fs } from '@kit.CoreFileKit';
   6. import { resourceManager } from '@kit.LocalizationKit';
   ```

   [EncodingPicture.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Media/Image/ImageArkTSSample/entry/src/main/ets/pages/EncodingPicture.ets#L16-L23)
2. 设置编码选项[PackingOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-i#packingoption)。

   说明

   这里以编码成jpeg图片为例。编码的目标格式format遵循MIME标准定义，因此PackingOption.format应设置为image/jpeg，编码后的文件扩展名可设为.jpg或.jpeg。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let packOpts: image.PackingOption = {
   2. format: 'image/jpeg',
   3. quality: 95,
   4. desiredDynamicRange: image.PackingDynamicRange.AUTO,
   5. needsPackProperties: true
   6. };
   ```

   [CodecUtility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Media/Image/ImageArkTSSample/entry/src/main/ets/tools/CodecUtility.ets#L22-L29)
3. 封装函数，传入picture，使用[packing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagepacker#packing13)接口编码到ArrayBuffer，或使用[packToFile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagepacker#packtofile11-2)接口编码到文件。

   说明

   在进行编码前，需要先通过解码获取picture，可参考[使用ImageSource完成多图对象解码](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/image-picture-decoding)。

   * picture编码到ArrayBuffer。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. async function packing(picture: image.Picture, packOpts: image.PackingOption) {
     2. const imagePackerApi = image.createImagePacker();
     3. try {
     4. let data = await imagePackerApi.packing(picture, packOpts);
     5. copyData = data;
     6. console.info('Succeeded in packing the image.');
     7. } catch (error) {
     8. console.error('Failed to pack the picture to data. And the error is: ' + error);
     9. }
     10. }
     ```

     [CodecUtility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Media/Image/ImageArkTSSample/entry/src/main/ets/tools/CodecUtility.ets#L148-L163)
   * picture编码到文件。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. async function packToFile(picture: image.Picture, packOpts: image.PackingOption, context: Context) {
     2. try {
     3. const path : string = context.cacheDir + '/picture.jpg';
     4. let file = fs.openSync(path, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
     5. const imagePackerApi = image.createImagePacker();
     6. await imagePackerApi.packToFile(picture, file.fd, packOpts);
     7. } catch (error) {
     8. console.error('Failed to pack the picture to file. And the error is: ' + error);
     9. }
     10. }
     ```

     [CodecUtility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Media/Image/ImageArkTSSample/entry/src/main/ets/tools/CodecUtility.ets#L165-L176)