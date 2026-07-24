Web组件支持前端页面选择文件上传功能，应用开发者可以使用[onShowFileSelector()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-events#onshowfileselector9)接口来处理前端页面文件上传的请求，如果应用开发者不做任何处理，ArkWeb会提供默认行为来处理前端页面文件上传的请求。

## 使用onShowFileSelector拉起文件管理器

下面的示例中，当用户在前端页面点击文件上传按钮，应用侧在[onShowFileSelector()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-events#onshowfileselector9)接口中收到文件上传请求，在此接口中开发者将上传的本地文件路径设置给前端页面。

* 应用侧代码。

收起

自动换行

深色代码主题

复制

```
1. import { webview } from '@kit.ArkWeb';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { picker } from '@kit.CoreFileKit';

5. @Entry
6. @Component
7. struct WebComponent {
8. controller: webview.WebviewController = new webview.WebviewController();

10. build() {
11. Column() {
12. Web({ src: $rawfile('local.html'), controller: this.controller })
13. .onShowFileSelector((event) => {
14. console.info('MyFileUploader onShowFileSelector invoked');
15. const documentSelectOptions = new picker.DocumentSelectOptions();
16. let uri: string | null = null;
17. const documentViewPicker = new picker.DocumentViewPicker();
18. documentViewPicker.select(documentSelectOptions).then((documentSelectResult) => {
19. uri = documentSelectResult[0];
20. console.info('documentViewPicker.select to file succeed and uri is:' + uri);
21. if (event) {
22. event.result.handleFileList([uri]);
23. }
24. }).catch((err: BusinessError) => {
25. console.error(`Invoke documentViewPicker.select failed, code is ${err.code}, message is ${err.message}`);
26. })
27. return true;
28. })
29. }
30. }
31. }
```

[UploadFiles.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkWeb/ManageWebPageFileIO/entry/src/main/ets/pages/UploadFiles.ets#L16-L48)

* local.html页面代码。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. <!DOCTYPE html>
  2. <html>
  3. <head>
  4. <meta charset="utf-8">
  5. <meta name="viewport" content="width=device-width" />
  6. <title>Document</title>
  7. </head>

  9. <body>
  10. <!-- 点击上传文件按钮 -->
  11. <input type="file"><br>
  12. </body>
  13. </html>
  ```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4d/v3/EaYSyeMZTmKNVaqxv45aQw/zh-cn_image_0000002540771510.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040921Z&HW-CC-Expire=86400&HW-CC-Sign=E6D32811FCC4079F4B113557309FB47831F0EA5853152ABDED32F4552B83C7DB)

## 使用onShowFileSelector拉起图库

下面的示例中，当用户在前端页面点击文件上传按钮，应用侧在[onShowFileSelector()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-events#onshowfileselector9)接口中收到文件上传请求，在此接口中开发者将上传的本地图片路径设置给前端页面。

* 应用侧代码。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // xxx.ets
  2. import { webview } from '@kit.ArkWeb';
  3. import { photoAccessHelper } from '@kit.MediaLibraryKit';

  5. @Entry
  6. @Component
  7. struct WebComponent {
  8. controller: webview.WebviewController = new webview.WebviewController();

  10. async selectFile(result: FileSelectorResult): Promise<void> {
  11. let photoSelectOptions = new photoAccessHelper.PhotoSelectOptions();
  12. let photoPicker = new photoAccessHelper.PhotoViewPicker();
  13. // 过滤选择媒体文件类型为IMAGE_VIDEO
  14. photoSelectOptions.MIMEType = photoAccessHelper.PhotoViewMIMETypes.IMAGE_VIDEO_TYPE;
  15. // 设置最大选择数量
  16. photoSelectOptions.maxSelectNumber = 5;
  17. let chooseFile: photoAccessHelper.PhotoSelectResult = await photoPicker.select(photoSelectOptions);
  18. // 获取选择的文件列表
  19. result.handleFileList(chooseFile.photoUris);
  20. }

  22. build() {
  23. Column() {
  24. Web({ src: $rawfile('local.html'), controller: this.controller })
  25. .onShowFileSelector((event) => {
  26. if (event) {
  27. this.selectFile(event.result);
  28. }
  29. return true;
  30. })
  31. }
  32. }
  33. }
  ```
* local.html页面代码。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. <!DOCTYPE html>
  2. <html>
  3. <head>
  4. <meta charset="utf-8">
  5. <meta name="viewport" content="width=device-width" />
  6. <title>Document</title>
  7. </head>

  9. <body>
  10. <!-- 点击上传文件按钮 -->
  11. <input type="file"><br>
  12. </body>
  13. </html>
  ```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b2/v3/1zSYgmCSTXKFU7KUDjWxfA/zh-cn_image_0000002571291805.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040921Z&HW-CC-Expire=86400&HW-CC-Sign=2CC8E16B429A842917CC689CFBE29FF2EEF7E1A20C1C0C6432D4082517024EF7)

## 使用onShowFileSelector拉起相机

Web组件支持前端页面上传图片文件时调用相机即时拍照，应用开发者可以使用[onShowFileSelector()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-events#onshowfileselector9)接口来处理前端页面文件上传的请求并自行拉起相机，如果应用开发者不做任何处理，Web会提供默认行为来处理前端页面调用相机的请求。

此示例中，应用侧通过监听[onShowFileSelector](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-events#onshowfileselector9)事件并返回true拦截ArkWeb默认弹窗,并调用系统CameraPicker拉起相机。应用可以通过获取AcceptType对不同类型的目标文件做更精细的筛选。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. import { webview } from '@kit.ArkWeb';
3. import { camera, cameraPicker } from '@kit.CameraKit';
4. import { BusinessError } from '@kit.BasicServicesKit';
5. import { common } from '@kit.AbilityKit';

7. async function openCamera(callback: Callback<string>, uiContext: UIContext) {
8. let mContext = uiContext.getHostContext() as common.Context;
9. try {
10. let pickerProfile: cameraPicker.PickerProfile = {
11. cameraPosition: camera.CameraPosition.CAMERA_POSITION_BACK
12. };
13. let pickerResult: cameraPicker.PickerResult = await cameraPicker.pick(mContext,
14. [cameraPicker.PickerMediaType.PHOTO, cameraPicker.PickerMediaType.VIDEO], pickerProfile);
15. callback(pickerResult.resultUri);
16. } catch (error) {
17. let err = error as BusinessError;
18. console.error(`the pick call failed. error code: ${err.code}`);
19. }
20. }

22. @Entry
23. @Component
24. struct Index {
25. webviewController: webview.WebviewController = new webview.WebviewController();

27. build() {
28. Column() {
29. Web({ src: $rawfile("webCamera.html"), controller: this.webviewController })
30. .onShowFileSelector((event) => {
31. //开发者可以通过event.fileSelector.getAcceptType()和event.fileSelector.isCapture()判断文件类型，并有选择地做出筛选以拉起不同的文件选择器
32. openCamera((result) => {
33. if (event) {
34. console.info('Title is ' + event.fileSelector.getTitle());
35. console.info('Mode is ' + event.fileSelector.getMode());
36. console.info('Accept types are ' + event.fileSelector.getAcceptType());
37. console.info('Capture is ' + event.fileSelector.isCapture());
38. event.result.handleFileList([result]);
39. }
40. }, this.getUIContext())
41. return true;
42. })
43. }
44. .height('100%')
45. .width('100%')
46. }
47. }
```

HTML页面代码

收起

自动换行

深色代码主题

复制

```
1. <!DOCTYPE html>
2. <html lang="en">
3. <head>
4. <meta charset="UTF-8">
5. <meta name="viewport" content="width=device-width, initial-scale=1.0">
6. <title>WebCamera</title>
7. </head>
8. <body>
9. <input type="file" name="photo" id="photo"><br>
10. <img style="display: none;width:200px;" id="img">
11. <script>
12. let photo = document.getElementById("photo");
13. photo.addEventListener("change", preViewImg)

15. function preViewImg(event) {
16. let fileReader = new FileReader();
17. let img = document.getElementById("img");
18. fileReader.addEventListener(
19. "load",
20. () => {
21. // 将图像文件转换为 Base64 字符串
22. img.src = fileReader.result;
23. img.style.display = "block";
24. },
25. false
26. );
27. if (event.target.files && event.target.files[0]) {
28. fileReader.readAsDataURL(event.target.files[0]);
29. } else {
30. console.error("File not exist.");
31. }
32. }
33. </script>
34. </body>
35. </html>
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ec/v3/zqCUNIpqRaaLtygEKf-QLw/zh-cn_image_0000002540611858.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040921Z&HW-CC-Expire=86400&HW-CC-Sign=8C7909F9BB8A695F2DAB593F267FC99219F7D47AFE1B2F4416B36B0BDDB1B7F3)

## 使用ArkWeb默认的方式处理文件上传请求

accept 属性是一个字符串，它定义了文件 input 应该接受的文件类型。这个字符串是一个以逗号为分隔的唯一文件类型说明符列表。由于给定的文件类型可以用多种方式指定，因此当你需要给定格式的文件时，提供一组完整的类型指定符是非常有用的。

capture 属性是一个字符串，如果 accept 属性指出了 input 是图片或者视频类型，则它指定了使用哪个摄像头去获取这些数据。值 user 表示应该使用前置摄像头和（或）麦克风。值 environment 表示应该使用后置摄像头和（或）麦克风。如果缺少此属性，则用户代理可以自由决定做什么。如果请求的前置模式不可用，则用户代理可能退回到其首选的默认模式。

当指定布尔类型属性 multiple 时，文件 input 允许用户选择多个文件。

示例页面内有数个文件选择器，分别设置了不同的accept及capture属性，这两个属性对相机的影响如下：

展开

| accept | capture | 文件选择器行为 |
| --- | --- | --- |
| 仅包含图片类型 | 设置为"environment"或"user" | 直接拉起相机拍照模式。 |
| 仅包含图片类型 | 不设置 | 先拉起弹窗，用户选择拍照后拉起相机拍照模式。 |
| 仅包含视频类型 | 设置为"environment"或"user" | 直接拉起相机录像模式。 |
| 仅包含视频类型 | 不设置 | 先拉起弹窗，用户选择录像后拉起相机录像模式。 |
| 包含图片和视频类型 | 设置为"environment"或"user" | 直接拉起相机拍照模式，可录像。 |
| 包含图片和视频类型 | 不设置 | 先拉起弹窗，用户选择拍照后拉起相机拍照模式，可录像。 |
| 不设置图片或视频类型 | 设置为"environment"或"user" | 直接拉起相机拍照模式，可录像。 |
| 不设置图片或视频类型 | 不设置 | 先拉起弹窗，用户选择拍照后拉起相机拍照模式，可录像。 |
| 不包含图片或视频类型 | 设置为"environment"或"user" | 直接拉起文件选择，不可拉起相机。 |
| 不包含图片或视频类型 | 不设置 | 直接拉起文件选择，不可拉起相机。 |

当前ArkWeb识别的文件类型有

* 图片：tif, xbm, tiff, pjp, jfif, bmp, avif, apng, ico, webp, svg, gif, svgz, jpg, jpeg, png, pjpeg
* 视频：mp4, mpg, mpeg, m4v, ogm, ogv, webm

说明

ArkWeb默认仅拉起相机后置摄像头，值'user'不会被处理成拉起前置摄像头。如有需要，请在应用侧通过[onShowFileSelector()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-events#onshowfileselector9)接口另行处理。

HTML页面代码

收起

自动换行

深色代码主题

复制

```
1. <!DOCTYPE html>
2. <html lang="en">
3. <head>
4. <meta charset="UTF-8">
5. <meta name="viewport" content="width=device-width, initial-scale=1.0">
6. <title>WebCamera</title>
7. </head>
8. <body>
9. <input type="file" name="picture" id="picture" accept="image/*"><br>
10. <img style="display: none;width:200px" id="img">
11. <script>
12. let picture = document.getElementById("picture");
13. picture.addEventListener("change", preViewImg)

15. function preViewImg(event) {
16. let fileReader = new FileReader();
17. let img = document.getElementById("img");
18. fileReader.addEventListener(
19. "load",
20. () => {
21. // 将图像文件转换为 Base64 字符串
22. img.src = fileReader.result;
23. img.style.display = "block";
24. },
25. false
26. );
27. if (event.target.files && event.target.files[0]) {
28. fileReader.readAsDataURL(event.target.files[0]);
29. } else {
30. console.error("File not exist.");
31. }
32. }
33. </script>
34. </body>
35. </html>
```

应用侧代码

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. import { webview } from '@kit.ArkWeb';

4. @Entry
5. @Component
6. struct Index {
7. webviewController: webview.WebviewController = new webview.WebviewController();

9. build() {
10. Column() {
11. Web({ src: $rawfile("webCamera.html"), controller: this.webviewController })
12. }
13. .height('100%')
14. .width('100%')
15. }
16. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0/v3/jmphqxnKTiijAMr6SP0IlQ/zh-cn_image_0000002571171853.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040921Z&HW-CC-Expire=86400&HW-CC-Sign=F2877CDFE34D355E399BC611D38CF21D8ECF96559EFF32807A739633387F8478)

## 常见问题

### onShowFileSelector配合ArkWeb默认弹窗使用

用户点击文件上传按钮后，程序优先执行onShowFileSelector中的回调进行逻辑处理，应用开发者可根据处理结果选择返回false以触发ArkWeb默认弹窗，此时应避免同时触发应用侧的其他Picker。

### 回调中getAcceptType和getMimeTypes的区别

getAcceptType返回的是 accept 属性值全量转换为文件扩展名所组成的字符串数组，getMimeTypes返回的是 accept 属性值用逗号拆分后所组成的字符串数组。

如若 accept 属性值为 video/mp4, .png ，则getAcceptType返回 .mp4, .m4v; .png ，getMimeTypes返回 video/mp4; .png 。

### ArkWeb默认弹窗的说明

选项“图片”会拉起图库，根据 accept 属性值不同，用户可以选择上传图片或视频；选项“拍照”会拉起相机，根据 accept 属性值不同，用户可以选择拍照或录像；选项“文件”会拉起文件管理器，用户可以上传任意内容。

### handleFileList的使用说明

该函数将选择的文件路径提交给ArkWeb，入参主要有两种类型：

1. file协议路径，目前只支持前缀为 file://media/ 、file://docs/ 的公共路径和 file://<packageName>/ 的应用包名路径，其他file协议路径无权限。
2. 沙箱目录，具体参考[应用沙箱目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory)。