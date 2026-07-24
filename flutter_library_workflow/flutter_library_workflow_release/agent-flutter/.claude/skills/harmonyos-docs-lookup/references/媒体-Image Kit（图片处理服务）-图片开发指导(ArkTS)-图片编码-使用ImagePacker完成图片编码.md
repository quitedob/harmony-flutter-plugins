图片编码指将PixelMap压缩成不同格式的图片文件，用于保存和传输。

支持使用[PackToData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagepacker#packtodata13-1)和[PackToFile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagepacker#packtofile11-2)将[PixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap)编码为JPEG、WebP、PNG和HEIC格式。

从API version 18开始，支持使用[PackToDataFromPixelmapSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagepacker#packtodatafrompixelmapsequence18)和[PackToFileFromPixelmapSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagepacker#packtofilefrompixelmapsequence18)将多个PixelMap编码为GIF格式。

## 开发步骤

图片编码相关API的详细介绍请参见[ImagePacker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagepacker)。

### 图片编码进文件流

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

   [EncodingPixelMap.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Media/Image/ImageArkTSSample/entry/src/main/ets/pages/EncodingPixelMap.ets#L16-L23)
2. 设置编码选项[PackingOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-i#packingoption)。

   2.1 这里以编码成jpeg图片为例。编码的目标格式format遵循MIME标准定义，因此PackingOption.format应设置为image/jpeg，编码后的文件扩展名可设为.jpg或.jpeg。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let packOpts : image.PackingOption = { format: 'image/jpeg', quality: 95 };
   ```

   [CodecUtility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Media/Image/ImageArkTSSample/entry/src/main/ets/tools/CodecUtility.ets#L83-L85)

   2.2 当图片源是HDR，且希望编码为HDR图片文件时，需要额外配置desiredDynamicRange。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 资源本身为hdr且设备支持HDR编码则会编码为hdr内容(需要资源本身为hdr且设备支持HDR编码，支持jpeg格式)。
   2. packOpts.desiredDynamicRange = image.PackingDynamicRange.AUTO;
   ```

   [CodecUtility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Media/Image/ImageArkTSSample/entry/src/main/ets/tools/CodecUtility.ets#L86-L89)
3. 封装函数，传入imageSource或pixelMap，使用[packToData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagepacker#packtodata13)接口编码到ArrayBuffer，或使用[packToFile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagepacker#packtofile11)接口编码到文件。

   说明

   在进行编码前，需要先获取imageSource或pixelMap，可参考[使用ImageSource完成图片解码](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/image-decoding)。

   * pixelMap编码到ArrayBuffer。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. async function packToDataFromPixelMap(pixelMap : image.PixelMap) {
     2. const imagePackerApi = image.createImagePacker();
     3. let packOpts : image.PackingOption = { format: 'image/jpeg', quality: 95 };
     4. // 资源本身为hdr且设备支持HDR编码则会编码为hdr内容(需要资源本身为hdr且设备支持HDR编码，支持jpeg格式)。
     5. packOpts.desiredDynamicRange = image.PackingDynamicRange.AUTO;
     6. try{
     7. let data = await imagePackerApi.packToData(pixelMap, packOpts);
     8. // data 为编码获取到的文件流，写入文件保存即可得到一张图片。
     9. copyData = new ArrayBuffer(0);
     10. copyData = data;
     11. } catch (error) {
     12. console.error('Failed to pack the pixelMap to data. And the error is: ' + error);
     13. }
     14. }
     ```

     [CodecUtility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Media/Image/ImageArkTSSample/entry/src/main/ets/tools/CodecUtility.ets#L78-L101)
   * imageSource编码到ArrayBuffer。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. async function packToDataFromImageSource(imageSource : image.ImageSource) {
     2. const imagePackerApi = image.createImagePacker();
     3. let packOpts : image.PackingOption = { format: 'image/jpeg', quality: 95 };
     4. try {
     5. let data = await imagePackerApi.packToData(imageSource, packOpts);
     6. // data 为编码获取到的文件流，写入文件保存即可得到一张图片。
     7. copyData = new ArrayBuffer(0);
     8. copyData = data;
     9. } catch (error) {
     10. console.error('Failed to pack the imageSource to data. And the error is: ' + error);
     11. }
     12. }
     ```

     [CodecUtility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Media/Image/ImageArkTSSample/entry/src/main/ets/tools/CodecUtility.ets#L103-L118)
   * pixelMap编码到文件。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. async function packToFileFromPixelMap(context : Context, pixelMap : image.PixelMap) {
     2. const imagePackerApi = image.createImagePacker();
     3. let packOpts : image.PackingOption = { format: 'image/jpeg', quality: 95 };
     4. const path : string = context.cacheDir + '/pixel_map.jpg';
     5. try {
     6. let file = fs.openSync(path, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
     7. await imagePackerApi.packToFile(pixelMap, file.fd, packOpts);
     8. } catch (error) {
     9. console.error('Failed to pack the pixelMap to file. And the error is: ' + error);
     10. }
     11. }
     ```

     [CodecUtility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Media/Image/ImageArkTSSample/entry/src/main/ets/tools/CodecUtility.ets#L120-L132)
   * imageSource编码到文件。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. async function packToFileFromImageSource(context : Context, imageSource : image.ImageSource) {
     2. const imagePackerApi = image.createImagePacker();
     3. let packOpts : image.PackingOption = { format: 'image/jpeg', quality: 95 };
     4. const filePath : string = context.cacheDir + '/image_source.jpg';
     5. try {
     6. let file = fs.openSync(filePath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
     7. await imagePackerApi.packToFile(imageSource, file.fd, packOpts);
     8. } catch (error) {
     9. console.error('Failed to pack the imageSource to file. And the error is: ' + error);
     10. }
     11. }
     ```

     [CodecUtility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Media/Image/ImageArkTSSample/entry/src/main/ets/tools/CodecUtility.ets#L134-L146)
4. 将图片保存进图库。

将图片编码到ArrayBuffer或文件后，可使用[Media Library Kit](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-overview)的相关接口[保存媒体库资源](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-savebutton)保存进图库。

## 示例代码

* [图片压缩](https://gitcode.com/HarmonyOS_Samples/image-compression)