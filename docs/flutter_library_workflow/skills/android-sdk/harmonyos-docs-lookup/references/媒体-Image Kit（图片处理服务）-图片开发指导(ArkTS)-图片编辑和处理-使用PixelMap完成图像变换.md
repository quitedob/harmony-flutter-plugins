图片处理指对PixelMap进行相关的操作，如获取图片信息、裁剪、缩放、偏移、旋转、翻转、设置透明度、读写像素数据等。图片处理主要包括图像变换、[位图操作](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/image-pixelmap-operation)，本文介绍图像变换。

## 开发步骤

图像变换相关API的详细介绍请参见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap)。

1. 完成[图片解码](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/image-decoding)，获取PixelMap对象。
2. 获取图片信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';
   2. // 获取图片大小。
   3. pixelMap.getImageInfo().then( (info : image.ImageInfo) => {
   4. console.info('info.width = ' + info.size.width);
   5. console.info('info.height = ' + info.size.height);
   6. }).catch((err : BusinessError) => {
   7. console.error("Failed to obtain the image pixel map information.And the error is: " + err);
   8. });
   ```
3. 进行图像变换操作。

   原图：

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9e/v3/8U0M5KbIR8eWYH6fIu8EZQ/zh-cn_image_0000002540771732.jpeg?HW-CC-KV=V1&HW-CC-Date=20260414T052722Z&HW-CC-Expire=86400&HW-CC-Sign=AD0F42B03084862699C4AEEA7664FA056C25675B6FEA5E55477EBBD3DAF32448)

   * 裁剪

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. // x：裁剪起始点横坐标0。
     2. // y：裁剪起始点纵坐标0。
     3. // height：裁剪高度400，方向为从上往下（裁剪后的图片高度为400）。
     4. // width：裁剪宽度400，方向为从左到右（裁剪后的图片宽度为400）。
     5. pixelMap.crop({x: 0, y: 0, size: { height: 400, width: 400 } });
     ```

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/90/v3/JTKhiYQCSEKmfMuh1zfJeQ/zh-cn_image_0000002571292027.jpeg?HW-CC-KV=V1&HW-CC-Date=20260414T052722Z&HW-CC-Expire=86400&HW-CC-Sign=241AE44AA3140903D20B7877B69FFF78C0721B1EF50C3865665ED38636A10484)
   * 缩放

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. // 宽为原来的0.5。
     2. // 高为原来的0.5。
     3. pixelMap.scale(0.5, 0.5);
     ```

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/51/v3/VIMRfXJnTAC4beW6gjzfsg/zh-cn_image_0000002540612080.jpeg?HW-CC-KV=V1&HW-CC-Date=20260414T052722Z&HW-CC-Expire=86400&HW-CC-Sign=D9F3A51BB3CF1ED875209915240890302BA4A4D437975596FCDCC5899F389A0D)
   * 偏移

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. // 向下偏移100。
     2. // 向右偏移100。
     3. pixelMap.translate(100, 100);
     ```

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/70/v3/nGRmuvtHQLOsJGoHneSTmg/zh-cn_image_0000002571172075.jpeg?HW-CC-KV=V1&HW-CC-Date=20260414T052722Z&HW-CC-Expire=86400&HW-CC-Sign=AF8141795E063E1F6CFAAE68D63946D9D33C210F3D027D6C39431581774E2561)
   * 旋转

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. // 顺时针旋转90°。
     2. pixelMap.rotate(90);
     ```

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0e/v3/lZ6XWqIDTmOmLVeSCA5a7g/zh-cn_image_0000002540771734.jpeg?HW-CC-KV=V1&HW-CC-Date=20260414T052722Z&HW-CC-Expire=86400&HW-CC-Sign=239E46459725E043159335789F300734C0A514FB18A8319FB59EB73E6D2954C1)
   * 翻转

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. // 垂直翻转。
     2. pixelMap.flip(false, true);
     ```

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/54/v3/hYZ3qmpJSfiHEcCORBwKsg/zh-cn_image_0000002571292029.jpeg?HW-CC-KV=V1&HW-CC-Date=20260414T052722Z&HW-CC-Expire=86400&HW-CC-Sign=C36CC5C9BE29090F3E0FEA9A9924DBD2F95922289FC47B1F2D56807947F5CD42)

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. // 水平翻转。
     2. pixelMap.flip(true, false);
     ```

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/63/v3/82mKw07OTNCObLCOlcvaeA/zh-cn_image_0000002540612082.jpeg?HW-CC-KV=V1&HW-CC-Date=20260414T052722Z&HW-CC-Expire=86400&HW-CC-Sign=D37E332A20FF4D0998244B8D2D02BBC67015A72FCC17734C75BFC896EDB40738)
   * 透明度

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. // 透明度0.5。
     2. pixelMap.opacity(0.5);
     ```

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/64/v3/rdpSZFq5RN2OnwMcJOFdSw/zh-cn_image_0000002571172077.png?HW-CC-KV=V1&HW-CC-Date=20260414T052722Z&HW-CC-Expire=86400&HW-CC-Sign=AABD42C01E7514C5CBA8F929D8A08FDDC86817D06DE0C4255511A1A7049771AC)

## 示例代码

* [拼图](https://gitcode.com/HarmonyOS_Samples/game-puzzle)