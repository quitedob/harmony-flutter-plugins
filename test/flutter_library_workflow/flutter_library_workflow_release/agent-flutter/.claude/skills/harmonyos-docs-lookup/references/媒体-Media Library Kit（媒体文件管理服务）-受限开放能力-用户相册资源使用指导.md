photoAccessHelper提供用户相册相关的接口，支持查询和重命名相册，以及添加和删除相册中的图片和视频资源。

说明

在进行功能开发前，请查阅[开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-preparation)，了解如何获取相册管理模块实例和申请相关权限。

文档中使用到photoAccessHelper的地方默认为使用[开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-preparation)中获取的对象，如未添加此段代码报photoAccessHelper未定义的错误请自行添加。

为了保证应用的运行效率，大部分photoAccessHelper的接口调用都是异步的。以下异步调用的API示例均采用Promise函数，更多方式可以查阅[模块描述](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper)。

如无特别说明，文档中涉及的待获取资源均视为已预置，并且数据库中存在相应数据。如果按照示例代码执行后获取资源为空，请确认文件是否已预置，以及数据库中是否存在该文件的数据。

## 获取用户相册

通过[PhotoAccessHelper.getAlbums](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-photoaccesshelper#getalbums-2)接口获取用户相册。

**前提条件**

* 获取相册管理模块photoAccessHelper实例。
* [申请相册管理模块功能相关权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-preparation#申请相册管理模块功能相关权限)'ohos.permission.READ\_IMAGEVIDEO'。

下面以获取一个相册名为'albumName'的用户相册为例。

**开发步骤**

1. 建立检索条件，用于获取用户相册。
2. 调用PhotoAccessHelper.getAlbums接口获取用户相册资源。
3. 调用[FetchResult.getFirstObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-fetchresult#getfirstobject-1)接口获取第一个用户相册。

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
16. console.info('getAlbums successfully, albumName: ' + album.albumName);
17. fetchResult.close();
18. } catch (err) {
19. console.error('getAlbums failed with err: ' + err);
20. }
21. }
```

## 重命名用户相册

重命名用户相册时，修改的是相册的Album.albumName属性。

调用[MediaAlbumChangeRequest.setAlbumName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/kts-apis-photoaccesshelper-mediaalbumchangerequest#setalbumname11)重命名用户相册后再通过[PhotoAccessHelper.applyChanges](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-photoaccesshelper#applychanges11)更新到数据库中完成修改。

在重命名用户相册之前，需要先获取相册对象，可以通过[FetchResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-fetchresult)中的接口获取对应位置的用户相册。

重命名相册时，相册名的参数规格为：

* 相册名字符串长度为1~255。
* 不允许出现的非法英文字符，包括：

  . \ / : \* ? " ' ` < > | { } [ ]
* 英文字符大小写不敏感。
* 相册名不允许重名。

**前提条件**

* 获取相册管理模块photoAccessHelper实例。
* [申请相册管理模块功能相关权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-preparation#申请相册管理模块功能相关权限)'ohos.permission.READ\_IMAGEVIDEO'和'ohos.permission.WRITE\_IMAGEVIDEO'。

下面以将一个相册名为'albumName'的用户相册重命名为例。

**开发步骤**

1. 建立检索条件，用于获取用户相册。
2. 调用PhotoAccessHelper.getAlbums接口获取用户相册资源。
3. 调用[FetchResult.getFirstObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-fetchresult#getfirstobject-1)接口获取第一个用户相册。
4. 调用MediaAlbumChangeRequest.setAlbumName接口设置新的相册名。
5. 调用PhotoAccessHelper.applyChanges接口将修改的相册属性更新到数据库中完成修改。

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
16. console.info('getAlbums successfully, albumName: ' + album.albumName);
17. let albumChangeRequest: photoAccessHelper.MediaAlbumChangeRequest = new photoAccessHelper.MediaAlbumChangeRequest(album);
18. let newAlbumName: string = 'newAlbumName';
19. albumChangeRequest.setAlbumName(newAlbumName);
20. await phAccessHelper.applyChanges(albumChangeRequest);
21. console.info('setAlbumName successfully, new albumName: ' + album.albumName);
22. fetchResult.close();
23. } catch (err) {
24. console.error('setAlbumName failed with err: ' + err);
25. }
26. }
```

## 添加图片和视频到用户相册中

先[获取用户相册](/consumer/cn/doc/harmonyos-guides/photoaccesshelper-useralbum-guidelines#获取用户相册)对象和需要添加到用户相册中的图片或视频的对象数组，然后调用[MediaAlbumChangeRequest.addAssets](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/kts-apis-photoaccesshelper-mediaalbumchangerequest#addassets11)和[PhotoAccessHelper.applyChanges](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-photoaccesshelper#applychanges11)接口往用户相册中添加图片或视频。

**前提条件**

* 获取相册管理模块photoAccessHelper实例。
* [申请相册管理模块功能相关权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-preparation#申请相册管理模块功能相关权限)'ohos.permission.READ\_IMAGEVIDEO'和'ohos.permission.WRITE\_IMAGEVIDEO'。

下面以将往相册名为'albumName'的用户相册中添加一张图片为例。

**开发步骤**

1. 建立相册检索条件，用于获取用户相册。
2. 建立图片检索条件，用于获取图片。
3. 调用PhotoAccessHelper.getAlbums接口获取用户相册资源。
4. 调用[FetchResult.getFirstObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-fetchresult#getfirstobject)接口获取第一个用户相册。
5. 调用[PhotoAccessHelper.getAssets](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-photoaccesshelper#getassets)接口获取图片资源。
6. 调用[FetchResult.getFirstObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-fetchresult#getfirstobject)接口获取第一张图片。
7. 调用MediaAlbumChangeRequest.addAssets接口往用户相册中添加图片。
8. 调用PhotoAccessHelper.applyChanges接口提交相册变更请求。

收起

自动换行

深色代码主题

复制

```
1. import { dataSharePredicates } from '@kit.ArkData';
2. import { photoAccessHelper } from '@kit.MediaLibraryKit';

4. async function example(phAccessHelper: photoAccessHelper.PhotoAccessHelper) {
5. let albumPredicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
6. let albumName: photoAccessHelper.AlbumKeys = photoAccessHelper.AlbumKeys.ALBUM_NAME;
7. albumPredicates.equalTo(albumName, 'albumName');
8. let albumFetchOptions: photoAccessHelper.FetchOptions = {
9. fetchColumns: [],
10. predicates: albumPredicates
11. };

13. let photoPredicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
14. let photoFetchOptions: photoAccessHelper.FetchOptions = {
15. fetchColumns: [],
16. predicates: photoPredicates
17. };

19. try {
20. let albumFetchResult: photoAccessHelper.FetchResult<photoAccessHelper.Album> = await phAccessHelper.getAlbums(photoAccessHelper.AlbumType.USER, photoAccessHelper.AlbumSubtype.USER_GENERIC, albumFetchOptions);
21. let album: photoAccessHelper.Album = await albumFetchResult.getFirstObject();
22. console.info('getAlbums successfully, albumName: ' + album.albumName);
23. let photoFetchResult: photoAccessHelper.FetchResult<photoAccessHelper.PhotoAsset> = await phAccessHelper.getAssets(photoFetchOptions);
24. let photoAsset: photoAccessHelper.PhotoAsset = await photoFetchResult.getFirstObject();
25. console.info('getAssets successfully, albumName: ' + photoAsset.displayName);
26. let albumChangeRequest: photoAccessHelper.MediaAlbumChangeRequest = new photoAccessHelper.MediaAlbumChangeRequest(album);
27. albumChangeRequest.addAssets([photoAsset]);
28. await phAccessHelper.applyChanges(albumChangeRequest);
29. console.info('succeed to add ' + photoAsset.displayName + ' to ' + album.albumName);
30. albumFetchResult.close();
31. photoFetchResult.close();
32. } catch (err) {
33. console.error('addAssets failed with err: ' + err);
34. }
35. }
```

## 获取用户相册中的图片和视频

先[获取用户相册](/consumer/cn/doc/harmonyos-guides/photoaccesshelper-useralbum-guidelines#获取用户相册)对象，然后调用[Album.getAssets](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-absalbum#getassets-1)接口获取用户相册中的图片资源。

**前提条件**

* 获取相册管理模块photoAccessHelper实例。
* [申请相册管理模块功能相关权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-preparation#申请相册管理模块功能相关权限)'ohos.permission.READ\_IMAGEVIDEO'和'ohos.permission.WRITE\_IMAGEVIDEO'。

下面以获取相册名为'albumName'的用户相册中的一张图片为例。

**开发步骤**

1. 建立相册检索条件，用于获取用户相册。
2. 建立图片检索条件，用于获取图片。
3. 调用PhotoAccessHelper.getAlbums接口获取用户相册资源。
4. 调用[FetchResult.getFirstObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-fetchresult#getfirstobject-1)接口获取第一个用户相册。
5. 调用Album.getAssets接口获取用户相册中的图片资源。
6. 调用[FetchResult.getFirstObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-fetchresult#getfirstobject-1)接口获取第一张图片。

收起

自动换行

深色代码主题

复制

```
1. import { dataSharePredicates } from '@kit.ArkData';
2. import { photoAccessHelper } from '@kit.MediaLibraryKit';

4. async function example(phAccessHelper: photoAccessHelper.PhotoAccessHelper) {
5. let albumPredicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
6. let albumName: photoAccessHelper.AlbumKeys = photoAccessHelper.AlbumKeys.ALBUM_NAME;
7. albumPredicates.equalTo(albumName, 'albumName');
8. let albumFetchOptions: photoAccessHelper.FetchOptions = {
9. fetchColumns: [],
10. predicates: albumPredicates
11. };

13. let photoPredicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
14. let photoFetchOptions: photoAccessHelper.FetchOptions = {
15. fetchColumns: [],
16. predicates: photoPredicates
17. };

19. try {
20. let albumFetchResult: photoAccessHelper.FetchResult<photoAccessHelper.Album> = await phAccessHelper.getAlbums(photoAccessHelper.AlbumType.USER, photoAccessHelper.AlbumSubtype.USER_GENERIC, albumFetchOptions);
21. let album: photoAccessHelper.Album = await albumFetchResult.getFirstObject();
22. console.info('getAlbums successfully, albumName: ' + album.albumName);
23. let photoFetchResult = await album.getAssets(photoFetchOptions);
24. let photoAsset = await photoFetchResult.getFirstObject();
25. console.info('album getAssets successfully, albumName: ' + photoAsset.displayName);
26. albumFetchResult.close();
27. photoFetchResult.close();
28. } catch (err) {
29. console.error('album getAssets failed with err: ' + err);
30. }
31. }
```

## 从用户相册中移除图片和视频

先[获取用户相册](/consumer/cn/doc/harmonyos-guides/photoaccesshelper-useralbum-guidelines#获取用户相册)对象，然后调用[Album.getAssets](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-absalbum#getassets-1)接口获取用户相册中的资源。

选择其中要移除的资源，然后调用[MediaAlbumChangeRequest.removeAssets](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/kts-apis-photoaccesshelper-mediaalbumchangerequest#removeassets11)和[PhotoAccessHelper.applyChanges](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-photoaccesshelper#applychanges11)接口移除。

**前提条件**

* 获取相册管理模块photoAccessHelper实例。
* [申请相册管理模块功能相关权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-preparation#申请相册管理模块功能相关权限)'ohos.permission.READ\_IMAGEVIDEO'和'ohos.permission.WRITE\_IMAGEVIDEO'。

下面以从相册名为'albumName'的用户相册中移除一张图片为例。

**开发步骤**

1. 建立相册检索条件，用于获取用户相册。
2. 建立图片检索条件，用于获取图片。
3. 调用PhotoAccessHelper.getAlbums接口获取用户相册资源。
4. 调用[FetchResult.getFirstObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-fetchresult#getfirstobject-1)接口获取第一个用户相册。
5. 调用Album.getAssets接口获取图片资源。
6. 调用[FetchResult.getFirstObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-photoaccesshelper-fetchresult#getfirstobject-1)接口获取第一张图片。
7. 调用MediaAlbumChangeRequest.removeAssets接口从用户相册中移除图片。
8. 调用PhotoAccessHelper.applyChanges接口提交相册变更请求。

收起

自动换行

深色代码主题

复制

```
1. import { dataSharePredicates } from '@kit.ArkData';
2. import { photoAccessHelper } from '@kit.MediaLibraryKit';

4. async function example(phAccessHelper: photoAccessHelper.PhotoAccessHelper) {
5. let albumPredicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
6. let albumName: photoAccessHelper.AlbumKeys = photoAccessHelper.AlbumKeys.ALBUM_NAME;
7. albumPredicates.equalTo(albumName, 'albumName');
8. let albumFetchOptions: photoAccessHelper.FetchOptions = {
9. fetchColumns: [],
10. predicates: albumPredicates
11. };

13. let photoPredicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
14. let photoFetchOptions: photoAccessHelper.FetchOptions = {
15. fetchColumns: [],
16. predicates: photoPredicates
17. };

19. try {
20. let albumFetchResult: photoAccessHelper.FetchResult<photoAccessHelper.Album> = await phAccessHelper.getAlbums(photoAccessHelper.AlbumType.USER, photoAccessHelper.AlbumSubtype.USER_GENERIC, albumFetchOptions);
21. let album: photoAccessHelper.Album = await albumFetchResult.getFirstObject();
22. if (album === undefined) {
23. console.error('album is undefined');
24. albumFetchResult.close();
25. return;
26. }
27. console.info('getAlbums successfully, albumName: ' + album.albumName);
28. let photoFetchResult = await album.getAssets(photoFetchOptions);
29. let photoAsset = await photoFetchResult.getFirstObject();
30. if (photoAsset === undefined) {
31. console.error('photoAsset is undefined');
32. photoFetchResult.close();
33. return;
34. }
35. console.info('album getAssets successfully, albumName: ' + photoAsset.displayName);
36. let albumChangeRequest: photoAccessHelper.MediaAlbumChangeRequest = new photoAccessHelper.MediaAlbumChangeRequest(album);
37. albumChangeRequest.removeAssets([photoAsset]);
38. await phAccessHelper.applyChanges(albumChangeRequest);
39. console.info('succeed to remove ' + photoAsset.displayName + ' from ' + album.albumName);
40. albumFetchResult.close();
41. photoFetchResult.close();
42. } catch (err) {
43. console.error('removeAssets failed with err: ' + err);
44. }
45. }
```