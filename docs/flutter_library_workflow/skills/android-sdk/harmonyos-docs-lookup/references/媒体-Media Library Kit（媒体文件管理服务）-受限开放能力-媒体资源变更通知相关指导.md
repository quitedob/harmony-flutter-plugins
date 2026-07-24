photoAccessHelper提供监听指定媒体资源变更的接口。

说明

在进行功能开发前，请查阅[开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-preparation)，了解如何获取相册管理模块实例和如何申请相册管理模块功能开发相关权限。

文档中使用到photoAccessHelper的地方默认为使用[开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-preparation)中获取的对象，如未添加此段代码报photoAccessHelper未定义的错误请自行添加。

媒体资源变更通知相关接口的异步调用仅支持使用callback方式。以下只列出部分接口使用方式，其他使用方式可以查阅[模块描述](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper)。

如无特别说明，文档中涉及的待获取资源均视为已预置且数据库中存在相应数据。若按示例代码执行后资源为空，请确认文件是否已预置，以及数据库中是否存在该文件的数据。

## 监听指定URI

通过调用[registerChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-photoaccesshelper#registerchange)接口监听指定uri。当被监听对象发生变更时返回监听器回调函数的值。

### 对指定PhotoAsset注册监听

对指定PhotoAsset注册监听，当监听的PhotoAsset发生变更时，返回回调。

**前提条件**

* 获取相册管理模块photoAccessHelper实例。
* [申请相册管理模块功能相关权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-preparation#申请相册管理模块功能相关权限)'ohos.permission.READ\_IMAGEVIDEO'和'ohos.permission.WRITE\_IMAGEVIDEO'。

以对一张图片注册监听为例，通过删除图片触发回调。

**开发步骤**

1. [获取指定媒体资源](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-resource-guidelines#获取指定媒体资源)。
2. 对指定PhotoAsset注册监听。
3. 将指定媒体资源删除。

收起

自动换行

深色代码主题

复制

```
1. import { dataSharePredicates } from '@kit.ArkData';
2. import { photoAccessHelper } from '@kit.MediaLibraryKit';

4. async function example(phAccessHelper: photoAccessHelper.PhotoAccessHelper, context: Context) {
5. let predicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
6. predicates.equalTo(photoAccessHelper.PhotoKeys.DISPLAY_NAME, 'test.jpg');
7. let fetchOptions: photoAccessHelper.FetchOptions = {
8. fetchColumns: [],
9. predicates: predicates
10. };
11. try {
12. let fetchResult: photoAccessHelper.FetchResult<photoAccessHelper.PhotoAsset> = await phAccessHelper.getAssets(fetchOptions);
13. let photoAsset: photoAccessHelper.PhotoAsset = await fetchResult.getFirstObject();
14. console.info('getAssets photoAsset.uri : ' + photoAsset.uri);
15. let onCallback = (changeData: photoAccessHelper.ChangeData) => {
16. console.info('onCallback successfully, changeData: ' + JSON.stringify(changeData));
17. }
18. phAccessHelper.registerChange(photoAsset.uri, false, onCallback);
19. await photoAccessHelper.MediaAssetChangeRequest.deleteAssets(context, [photoAsset]);
20. fetchResult.close();
21. } catch (err) {
22. console.error('onCallback failed with err: ' + err);
23. }
24. }
```

### 对指定Album注册监听

对指定Album注册监听，当Album发生变更时，触发监听回调。

**前提条件**

* 获取相册管理模块photoAccessHelper实例。
* [申请相册管理模块功能相关权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-preparation#申请相册管理模块功能相关权限)'ohos.permission.READ\_IMAGEVIDEO'和'ohos.permission.WRITE\_IMAGEVIDEO'。

以对一个用户相册注册监听为例，通过重命名相册触发回调。

**开发步骤**

1. [获取用户相册](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-useralbum-guidelines#获取用户相册)。
2. 对指定Album注册监听。
3. 将指定用户相册重命名。

收起

自动换行

深色代码主题

复制

```
1. import { dataSharePredicates } from '@kit.ArkData';
2. import { photoAccessHelper } from '@kit.MediaLibraryKit';

4. async function example(phAccessHelper: photoAccessHelper.PhotoAccessHelper) {
5. let predicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
6. let albumName: photoAccessHelper.AlbumKeys = photoAccessHelper.AlbumKeys.ALBUM_NAME;
7. predicates.equalTo(albumName, 'albumName');
8. let fetchOptions: photoAccessHelper.FetchOptions = {
9. fetchColumns: [],
10. predicates: predicates
11. };

13. try {
14. let fetchResult: photoAccessHelper.FetchResult<photoAccessHelper.Album> = await phAccessHelper.getAlbums(photoAccessHelper.AlbumType.USER, photoAccessHelper.AlbumSubtype.USER_GENERIC, fetchOptions);
15. let album: photoAccessHelper.Album = await fetchResult.getFirstObject();
16. console.info('getAlbums successfully, albumUri: ' + album.albumUri);

18. let onCallback = (changeData: photoAccessHelper.ChangeData) => {
19. console.info('onCallback successfully, changeData: ' + JSON.stringify(changeData));
20. }
21. phAccessHelper.registerChange(album.albumUri, false, onCallback);
22. album.albumName = 'newAlbumName' + Date.now();
23. await album.commitModify();
24. fetchResult.close();
25. } catch (err) {
26. console.error('onCallback failed with err: ' + err);
27. }
28. }
```

## 模糊监听

1. 通过设置forChildUris值为true来注册模糊监听，uri为相册uri时，forChildUris为true能监听到相册中文件的变化，如果是false只能监听相册本身变化。
2. uri为photoAsset时，forChildUris为true、false没有区别。
3. uri为DefaultChangeUri时，forChildUris必须为true，如果为false将找不到该uri，收不到任何消息。

### 对所有PhotoAsset注册监听

对所有PhotoAsset注册监听，当被监听的PhotoAsset发生变更时，返回监听回调。

**前提条件**

* 获取相册管理模块photoAccessHelper实例。
* [申请相册管理模块功能相关权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-preparation#申请相册管理模块功能相关权限)'ohos.permission.READ\_IMAGEVIDEO'和'ohos.permission.WRITE\_IMAGEVIDEO'。

下面以对所有PhotoAsset注册监听，通过将被监听的PhotoAsset删除触发监听回调为例。

**开发步骤**

1. 对所有PhotoAsset注册监听。
2. [获取指定媒体资源](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-resource-guidelines#获取指定媒体资源)。
3. 将指定媒体资源删除。

收起

自动换行

深色代码主题

复制

```
1. import { dataSharePredicates } from '@kit.ArkData';
2. import { photoAccessHelper } from '@kit.MediaLibraryKit';

4. async function example(phAccessHelper: photoAccessHelper.PhotoAccessHelper, context: Context) {
5. let onCallback = (changeData: photoAccessHelper.ChangeData) => {
6. console.info('onCallback successfully, changeData: ' + JSON.stringify(changeData));
7. }
8. phAccessHelper.registerChange(photoAccessHelper.DefaultChangeUri.DEFAULT_PHOTO_URI, true, onCallback);
9. let predicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
10. let fetchOptions: photoAccessHelper.FetchOptions = {
11. fetchColumns: [],
12. predicates: predicates
13. };
14. try {
15. let fetchResult: photoAccessHelper.FetchResult<photoAccessHelper.PhotoAsset> = await phAccessHelper.getAssets(fetchOptions);
16. let photoAsset: photoAccessHelper.PhotoAsset = await fetchResult.getFirstObject();
17. console.info('getAssets photoAsset.uri : ' + photoAsset.uri);
18. await photoAccessHelper.MediaAssetChangeRequest.deleteAssets(context, [photoAsset]);
19. fetchResult.close();
20. } catch (err) {
21. console.error('onCallback failed with err: ' + err);
22. }
23. }
```

## 取消对指定URI的监听

取消对指定uri的监听，通过调用[unRegisterChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-photoaccesshelper#unregisterchange)接口取消对指定uri的监听。一个uri可以注册多个监听，存在多个callback监听时，可以取消指定注册的callback的监听；不指定callback时取消该uri的所有监听。

**前提条件**

* 获取相册管理模块photoAccessHelper实例。
* [申请相册管理模块功能相关权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-preparation#申请相册管理模块功能相关权限)'ohos.permission.READ\_IMAGEVIDEO'和'ohos.permission.WRITE\_IMAGEVIDEO'。

下面以取消对图片指定的监听为例，取消监听后，删除图片不再触发对应的监听回调。

**开发步骤**

1. [获取指定媒体资源](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-resource-guidelines#获取指定媒体资源)。
2. 取消对指定媒体资源uri的监听。
3. 将指定媒体资源删除。

收起

自动换行

深色代码主题

复制

```
1. import { dataSharePredicates } from '@kit.ArkData';
2. import { photoAccessHelper } from '@kit.MediaLibraryKit';

4. async function example(phAccessHelper: photoAccessHelper.PhotoAccessHelper, context: Context) {
5. let predicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
6. predicates.equalTo(photoAccessHelper.PhotoKeys.DISPLAY_NAME, 'test.jpg');
7. let fetchOptions: photoAccessHelper.FetchOptions = {
8. fetchColumns: [],
9. predicates: predicates
10. };
11. try {
12. let fetchResult: photoAccessHelper.FetchResult<photoAccessHelper.PhotoAsset> = await phAccessHelper.getAssets(fetchOptions);
13. let photoAsset: photoAccessHelper.PhotoAsset = await fetchResult.getFirstObject();
14. console.info('getAssets photoAsset.uri : ' + photoAsset.uri);
15. let onCallback1 = (changeData: photoAccessHelper.ChangeData) => {
16. console.info('onCallback1, changeData: ' + JSON.stringify(changeData));
17. }
18. let onCallback2 = (changeData: photoAccessHelper.ChangeData) => {
19. console.info('onCallback2, changeData: ' + JSON.stringify(changeData));
20. }
21. phAccessHelper.registerChange(photoAsset.uri, false, onCallback1);
22. phAccessHelper.registerChange(photoAsset.uri, false, onCallback2);
23. phAccessHelper.unRegisterChange(photoAsset.uri, onCallback1);
24. await photoAccessHelper.MediaAssetChangeRequest.deleteAssets(context, [photoAsset]);
25. fetchResult.close();
26. } catch (err) {
27. console.error('onCallback failed with err: ' + err);
28. }
29. }
```