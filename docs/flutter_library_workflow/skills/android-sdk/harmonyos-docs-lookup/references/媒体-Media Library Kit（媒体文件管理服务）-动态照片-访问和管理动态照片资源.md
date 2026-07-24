动态照片是一种结合了图片和视频的照片形式，可以显示一小段时间的动态画面和声音。可以帮助用户捕捉精彩的动态瞬间，提升创作空间，同时令拍照的容错率更高。

媒体库提供访问和管理动态照片资源的能力，包括：

* [使用安全控件保存动态照片资源](/consumer/cn/doc/harmonyos-guides/photoaccesshelper-movingphoto#保存动态照片资源)
* [获取动态照片对象（MovingPhoto）](/consumer/cn/doc/harmonyos-guides/photoaccesshelper-movingphoto#获取动态照片对象)
* [使用MovingPhotoView播放动态照片](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/movingphotoview-guidelines)
* [读取动态照片资源](/consumer/cn/doc/harmonyos-guides/photoaccesshelper-movingphoto#读取动态照片资源)

拍摄动态照片的能力由Camera Kit提供，可参考[动态照片拍摄(ArkTS)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-moving-photo)。

## 保存动态照片资源

使用安全控件保存动态照片资源后，可用于获取MovingPhoto对象，从而完成播放动态照片等操作。

使用安全控件保存动态照片资源，无需申请相册管理模块权限'ohos.permission.WRITE\_IMAGEVIDEO'，允许用户通过点击按钮临时获取存储权限，并将资源直接保存到指定的媒体库路径，使得操作更为便捷。

详情请参考[SaveButton](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-security-components-savebutton)。

**开发步骤**

1. 设置安全控件按钮属性。
2. 创建安全控件按钮。
3. 调用[MediaAssetChangeRequest.createAssetRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/kts-apis-photoaccesshelper-mediaassetchangerequest#createassetrequest11)接口新建一个创建资产的变更请求，指定待创建资产的子类型为动态照片。
4. 调用[MediaAssetChangeRequest.addResource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/kts-apis-photoaccesshelper-mediaassetchangerequest#addresource11)接口指定动态照片的图片和视频内容，动态照片的视频时长不能超过10s。

   以下示例以从应用沙箱的[应用文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-file-access)fileUri指定动态照片的图片和视频内容为例。

   开发者可根据实际情况，通过ArrayBuffer的方式指定资源内容，参考[MediaAssetChangeRequest.addResource(type: ResourceType, data: ArrayBuffer)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/kts-apis-photoaccesshelper-mediaassetchangerequest#addresource11-1)。
5. 调用[PhotoAccessHelper.applyChanges](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-photoaccesshelper#applychanges11)接口提交创建资产的变更请求。

收起

自动换行

深色代码主题

复制

```
1. import { photoAccessHelper } from '@kit.MediaLibraryKit';
2. import { common } from '@kit.AbilityKit';

4. @Entry
5. @Component
6. struct Index {
7. @State message: string = 'Hello World'
8. @State saveButtonOptions: SaveButtonOptions = {
9. icon: SaveIconStyle.FULL_FILLED,
10. text: SaveDescription.SAVE_IMAGE,
11. buttonType: ButtonType.Capsule
12. } // 设置安全控件按钮属性。

14. build() {
15. Row() {
16. Column() {
17. Text(this.message)
18. .fontSize(50)
19. .fontWeight(FontWeight.Bold)
20. SaveButton(this.saveButtonOptions) // 创建安全控件按钮。
21. .onClick(async (event, result: SaveButtonOnClickResult) => {
22. if (result == SaveButtonOnClickResult.SUCCESS) {
23. try {
24. let context: Context = this.getUIContext().getHostContext() as common.UIAbilityContext;
25. let phAccessHelper = photoAccessHelper.getPhotoAccessHelper(context);
26. // 需要确保imageFileUri和videoFileUri对应的资源存在，分别表示待创建到媒体库的动态照片的图片和视频。
27. let imageFileUri = 'file://com.example.temptest/data/storage/el2/base/haps/entry/files/create_moving_photo.jpg';
28. let videoFileUri = 'file://com.example.temptest/data/storage/el2/base/haps/entry/files/create_moving_photo.mp4';
29. let assetChangeRequest: photoAccessHelper.MediaAssetChangeRequest = photoAccessHelper.MediaAssetChangeRequest.createAssetRequest(context, photoAccessHelper.PhotoType.IMAGE, "jpg", {
30. title: "moving_photo",
31. subtype: photoAccessHelper.PhotoSubtype.MOVING_PHOTO
32. });
33. assetChangeRequest.addResource(photoAccessHelper.ResourceType.IMAGE_RESOURCE, imageFileUri);
34. assetChangeRequest.addResource(photoAccessHelper.ResourceType.VIDEO_RESOURCE, videoFileUri);
35. await phAccessHelper.applyChanges(assetChangeRequest);
36. console.info('create moving photo successfully, uri: ' + assetChangeRequest.getAsset().uri);
37. } catch (err) {
38. console.error(`create moving photo failed with error: ${err.code}, ${err.message}`);
39. }
40. } else {
41. console.error('SaveButtonOnClickResult create moving photo failed');
42. }
43. })
44. }
45. .width('100%')
46. }
47. .height('100%')
48. }
49. }
```

## 获取动态照片对象

* 应用可以通过Picker的方式获取用户媒体库里的动态照片对象，后续可用于在应用内播放动态照片，或是读取动态照片资源进行其他操作（如上传到应用共享给他人浏览等）。
* 应用也可以通过传入应用沙箱的[应用文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-file-access)图片和视频fileUri的方式构造应用本地的动态照片对象。

获取到动态照片对象后，如需播放动态照片请参考[使用MovingPhotoView播放动态照片](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/movingphotoview-guidelines)。

### 获取媒体库动态照片对象

1. 通过Picker选择动态照片的[媒体文件URI](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/user-file-uri-intro#媒体文件uri)。
2. 调用[PhotoAccessHelper.getAssets](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-photoaccesshelper#getassets-1)和[FetchResult.getFirstObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-fetchresult#getfirstobject-1)接口获取URI对应的PhotoAsset资产。
3. 调用[MediaAssetManager.requestMovingPhoto](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-mediaassetmanager#requestmovingphoto12)获取PhotoAsset对应的动态照片对象（MovingPhoto）。

收起

自动换行

深色代码主题

复制

```
1. import { photoAccessHelper } from '@kit.MediaLibraryKit';
2. import { dataSharePredicates } from '@kit.ArkData';
3. import { common } from '@kit.AbilityKit';

5. @Entry
6. @Component
7. struct Index {
8. build() {
9. Row() {
10. Button("example").onClick(async () => {
11. let context: Context = this.getUIContext().getHostContext() as common.UIAbilityContext;
12. let phAccessHelper = photoAccessHelper.getPhotoAccessHelper(context);
13. example(phAccessHelper, context);
14. }).width('100%')
15. }
16. .height('90%')
17. }
18. }

20. async function example(phAccessHelper: photoAccessHelper.PhotoAccessHelper, context: Context) {
21. try {
22. // picker选择动态照片uri。
23. let photoSelectOptions = new photoAccessHelper.PhotoSelectOptions();
24. photoSelectOptions.MIMEType = photoAccessHelper.PhotoViewMIMETypes.MOVING_PHOTO_IMAGE_TYPE;
25. photoSelectOptions.maxSelectNumber = 9;
26. let photoViewPicker = new photoAccessHelper.PhotoViewPicker();
27. let photoSelectResult = await photoViewPicker.select(photoSelectOptions);
28. let uris = photoSelectResult.photoUris;
29. for (let i = 0; i < uris.length; i++) {
30. // 获取uri对应的PhotoAsset资产。
31. let predicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
32. predicates.equalTo(photoAccessHelper.PhotoKeys.URI, uris[i]);
33. let fetchOption: photoAccessHelper.FetchOptions = {
34. fetchColumns: [],
35. predicates: predicates
36. };
37. let fetchResult: photoAccessHelper.FetchResult<photoAccessHelper.PhotoAsset> = await phAccessHelper.getAssets(fetchOption);
38. let photoAsset: photoAccessHelper.PhotoAsset = await fetchResult.getFirstObject();
39. // 获取PhotoAsset对应的动态照片对象。
40. await photoAccessHelper.MediaAssetManager.requestMovingPhoto(context, photoAsset, {
41. deliveryMode: photoAccessHelper.DeliveryMode.FAST_MODE
42. }, {
43. async onDataPrepared(movingPhoto: photoAccessHelper.MovingPhoto) {
44. if (movingPhoto !== undefined) {
45. // 应用可自定义对movingPhoto的处理逻辑。
46. console.info('request moving photo successfully, uri: ' + movingPhoto.getUri());
47. }
48. }
49. })
50. }
51. } catch (err) {
52. console.error(`request moving photo failed with error: ${err.code}, ${err.message}`);
53. }
54. }
```

### 获取应用沙箱动态照片对象

调用[MediaAssetManager.loadMovingPhoto](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-mediaassetmanager#loadmovingphoto12)加载应用沙箱的动态照片对象（MovingPhoto）。

收起

自动换行

深色代码主题

复制

```
1. import { photoAccessHelper } from '@kit.MediaLibraryKit';
2. import { common } from '@kit.AbilityKit';

4. @Entry
5. @Component
6. struct Index {
7. @State outputText: string = '支持的类型为：\n';

9. build() {
10. Row() {
11. Button("example").onClick(async () => {
12. let context: Context = this.getUIContext().getHostContext() as common.UIAbilityContext;
13. example(context);
14. }).width('100%')
15. }
16. .height('90%')
17. }
18. }

20. async function example(context: Context) {
21. try {
22. let imageFileUri = 'file://com.example.temptest/data/storage/el2/base/haps/entry/files/local_moving_photo.jpg';
23. let videoFileUri = 'file://com.example.temptest/data/storage/el2/base/haps/entry/files/local_moving_photo.mp4';
24. let movingPhoto = await photoAccessHelper.MediaAssetManager.loadMovingPhoto(context, imageFileUri, videoFileUri);
25. console.info('load moving photo successfully');
26. } catch (err) {
27. console.error(`load moving photo failed with error: ${err.code}, ${err.message}`);
28. }
29. }
```

## 读取动态照片资源

对于一个动态照片对象，应用可以通过[MovingPhoto.requestContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-movingphoto#requestcontent12)导出图片和视频到应用沙箱，或者读取图片或视频的ArrayBuffer内容。

收起

自动换行

深色代码主题

复制

```
1. import { photoAccessHelper } from '@kit.MediaLibraryKit';

3. async function example(movingPhoto: photoAccessHelper.MovingPhoto) {
4. try {
5. let imageFileUri = 'file://com.example.temptest/data/storage/el2/base/haps/entry/files/request_moving_photo.jpg';
6. let videoFileUri = 'file://com.example.temptest/data/storage/el2/base/haps/entry/files/request_moving_photo.mp4';
7. await movingPhoto.requestContent(imageFileUri, videoFileUri); // 将动态照片导出到应用沙箱。
8. let imageData = await movingPhoto.requestContent(photoAccessHelper.ResourceType.IMAGE_RESOURCE); // 读取图片的ArrayBuffer内容。
9. let videoData = await movingPhoto.requestContent(photoAccessHelper.ResourceType.VIDEO_RESOURCE); // 读取视频的ArrayBuffer内容。
10. } catch (err) {
11. console.error(`request content of moving photo failed with error: ${err.code}, ${err.message}`);
12. }
13. }
```