保存图片、视频等用户文件到图库时，无需申请相册管理模块权限'ohos.permission.WRITE\_IMAGEVIDEO'，应用可以通过[安全控件](/consumer/cn/doc/harmonyos-guides/photoaccesshelper-savebutton#使用安全控件保存媒体库资源)或[授权弹窗](/consumer/cn/doc/harmonyos-guides/photoaccesshelper-savebutton#使用弹窗授权保存媒体库资源)的方式，将用户指定的媒体资源保存到图库中。

注意

Media Library Kit提供图片和视频的管理能力，当需要读取和保存音频文件时，请使用[AudioViewPicker（音频选择器对象）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-file-picker#audioviewpicker)。

## 获取支持保存的资源格式

下面以获取支持保存的图片类型资源格式为例。

**开发步骤**

调用[phAccessHelper.getSupportedPhotoFormats](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-photoaccesshelper#getsupportedphotoformats18)接口获取支持保存的图片类型资源格式。

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
13. let phAccessHelper = photoAccessHelper.getPhotoAccessHelper(context);
14. example(phAccessHelper);
15. }).width('100%')
16. }
17. .height('90%')
18. }
19. }

21. async function example(phAccessHelper: photoAccessHelper.PhotoAccessHelper){
22. try {
23. let outputText = '支持的类型为：\n';
24. // 参数为1表示获取支持的图片类型格式，参数为2表示获取支持的视频类型格式。
25. let imageFormat  = await phAccessHelper.getSupportedPhotoFormats(1);
26. let result = "";
27. for (let i = 0; i < imageFormat.length; i++) {
28. result += imageFormat[i];
29. if (i !== imageFormat.length - 1) {
30. result += ', ';
31. }
32. }
33. outputText += result;
34. console.info('getSupportedPhotoFormats success, data is ' + outputText);
35. } catch (error) {
36. console.error('getSupportedPhotoFormats failed, errCode is', error);
37. }
38. }
```

## 使用安全控件保存媒体库资源

安全控件的介绍可参考[SaveButton](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-security-components-savebutton)。保存前可以通过调用[registerChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-photoaccesshelper#registerchange)接口注册对默认URI（[DEFAULT\_PHOTO\_URI](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-e#defaultchangeuri)）的监听。资源保存成功后，根据接收到该资源的[NOTIFY\_ADD](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-e#notifytype)通知完成后续业务。

下面以使用安全控件创建一张图片资源为例。

**开发步骤**

1. 设置安全控件按钮属性。
2. 创建安全控件按钮。
3. 调用[registerChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-photoaccesshelper#registerchange)接口注册对默认URI（[DEFAULT\_PHOTO\_URI](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-e#defaultchangeuri)）的监听。
4. 调用[MediaAssetChangeRequest.createImageAssetRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/kts-apis-photoaccesshelper-mediaassetchangerequest#createimageassetrequest11)和[PhotoAccessHelper.applyChanges](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-photoaccesshelper#applychanges11)接口创建图片资源。
5. 调用[getAsset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/kts-apis-photoaccesshelper-mediaassetchangerequest#getasset11)接口获取保存的资产，并获取资产URI。在接收到资产URI的[NOTIFY\_ADD](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-e#notifytype)通知后，完成后续业务。

收起

自动换行

深色代码主题

复制

```
1. import { photoAccessHelper } from '@kit.MediaLibraryKit';
2. import { common } from '@kit.AbilityKit';
3. import { dataSharePredicates } from '@kit.ArkData';

5. @Entry
6. @Component
7. struct Index {
8. uriString: string = '';
9. saveButtonOptions: SaveButtonOptions = {
10. icon: SaveIconStyle.FULL_FILLED,
11. text: SaveDescription.SAVE_IMAGE,
12. buttonType: ButtonType.Capsule
13. } // 设置安全控件按钮属性。
14. onCallback = (changeData: photoAccessHelper.ChangeData) => {
15. for (let i = 0; i < changeData.uris.length; i++) {
16. // 保存媒体库资源成功后，会监听到类型为NOTIFY_ADD的资产URI。
17. if (changeData.uris[i] === this.uriString && changeData.type === photoAccessHelper.NotifyType.NOTIFY_ADD) {
18. let predicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
19. predicates.equalTo(photoAccessHelper.PhotoKeys.URI, changeData.uris[i]);
20. let fetchOptions: photoAccessHelper.FetchOptions = {
21. fetchColumns: [],
22. predicates: predicates
23. };

25. let context: Context = this.getUIContext().getHostContext() as common.UIAbilityContext;
26. let phAccessHelper = photoAccessHelper.getPhotoAccessHelper(context);
27. phAccessHelper.getAssets(fetchOptions, async (err, fetchResult) => {
28. if (fetchResult !== undefined) {
29. let photoAsset: photoAccessHelper.PhotoAsset = await fetchResult.getFirstObject();
30. if (photoAsset !== undefined) {
31. console.info('getAssets successfully');
32. }
33. }
34. phAccessHelper.unRegisterChange(photoAccessHelper.DefaultChangeUri.DEFAULT_PHOTO_URI);
35. });
36. }
37. }
38. }

40. build() {
41. Row() {
42. Column() {
43. SaveButton(this.saveButtonOptions)// 创建安全控件按钮。
44. .onClick(async (event, result: SaveButtonOnClickResult) => {
45. if (result == SaveButtonOnClickResult.SUCCESS) {
46. try {
47. let context: Context = this.getUIContext().getHostContext() as common.UIAbilityContext;
48. let phAccessHelper = photoAccessHelper.getPhotoAccessHelper(context);

50. // 注册默认监听。
51. phAccessHelper.registerChange(
52. photoAccessHelper.DefaultChangeUri.DEFAULT_PHOTO_URI, true, this.onCallback);

54. // 需要确保fileUri对应的资源存在。
55. let fileUri = 'file://com.example.temptest/data/storage/el2/base/haps/entry/files/test.jpg';
56. let assetChangeRequest: photoAccessHelper.MediaAssetChangeRequest =
57. photoAccessHelper.MediaAssetChangeRequest.createImageAssetRequest(context, fileUri);
58. await phAccessHelper.applyChanges(assetChangeRequest);

60. this.uriString = assetChangeRequest.getAsset().uri;
61. console.info('createAsset successfully, uri: ' + this.uriString);
62. } catch (err) {
63. console.error(`create asset failed with error: ${err.code}, ${err.message}`);
64. }
65. } else {
66. console.error('SaveButtonOnClickResult create asset failed');
67. }
68. })
69. }
70. .width('100%')
71. }
72. .height('100%')
73. }
74. }
```

除了上述通过fileUri从应用沙箱指定资源内容的方式，开发者还可以通过ArrayBuffer的方式添加资源内容，详情请参考[addResource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/kts-apis-photoaccesshelper-mediaassetchangerequest#addresource11-1)接口。

## 使用弹窗授权保存媒体库资源

下面以弹窗授权的方式保存一张图片资源为例。

**开发步骤**

1. 指定待保存到媒体库的[应用文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-file-access)uri（需为应用沙箱路径）。
2. 指定待保存照片的创建选项，包括文件后缀和照片类型，标题和照片子类型可选。
3. 调用[showAssetsCreationDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-photoaccesshelper#showassetscreationdialog12)，基于弹窗授权的方式获取的目标[媒体文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/user-file-uri-intro#媒体文件uri)uri。

   弹框需要显示应用名称，无法直接获取应用名称，依赖于配置项的label和icon，因此调用此接口时请确保module.json5文件中的abilities标签中配置了label和icon项。当传入uri为沙箱路径时，可正常保存图片/视频，但无界面预览。
4. 将应用沙箱的照片内容写入媒体库的目标URI。

收起

自动换行

深色代码主题

复制

```
1. import { photoAccessHelper } from '@kit.MediaLibraryKit';
2. import { fileIo } from '@kit.CoreFileKit';

4. async function example(phAccessHelper: photoAccessHelper.PhotoAccessHelper){
5. try {
6. // 指定待保存到媒体库的位于应用沙箱的图片uri。
7. let srcFileUri = 'file://com.example.temptest/data/storage/el2/base/haps/entry/files/test.jpg';
8. let srcFileUris: Array<string> = [
9. srcFileUri
10. ];
11. // 指定待保存照片的创建选项，包括文件后缀和照片类型，标题和照片子类型可选。
12. let photoCreationConfigs: Array<photoAccessHelper.PhotoCreationConfig> = [
13. {
14. title: 'test', // 可选。
15. fileNameExtension: 'jpg',
16. photoType: photoAccessHelper.PhotoType.IMAGE,
17. subtype: photoAccessHelper.PhotoSubtype.DEFAULT, // 可选。
18. }
19. ];
20. // 基于弹窗授权的方式获取媒体库的目标uri。
21. let desFileUris: Array<string> = await phAccessHelper.showAssetsCreationDialog(srcFileUris, photoCreationConfigs);
22. // 将来源于应用沙箱的照片内容写入媒体库的目标uri。
23. let desFile: fileIo.File = await fileIo.open(desFileUris[0], fileIo.OpenMode.WRITE_ONLY);
24. let srcFile: fileIo.File = await fileIo.open(srcFileUri, fileIo.OpenMode.READ_ONLY);
25. await fileIo.copyFile(srcFile.fd, desFile.fd);
26. fileIo.closeSync(srcFile);
27. fileIo.closeSync(desFile);
28. console.info('create asset by dialog successfully');
29. } catch (err) {
30. console.error(`failed to create asset by dialog successfully errCode is: ${err.code}, ${err.message}`);
31. }
32. }
```