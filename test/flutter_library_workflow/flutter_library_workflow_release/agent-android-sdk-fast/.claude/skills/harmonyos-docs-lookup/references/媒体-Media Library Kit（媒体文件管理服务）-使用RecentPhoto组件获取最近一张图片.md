应用可以在布局中嵌入最近图片组件，通过此组件，应用无需申请权限，即可指定配置访问公共目录中最近的一个图片或视频文件。授予的权限仅包含只读权限。

界面效果如图所示。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/39/v3/l3mMGZQHRjOcC_25v49_8Q/zh-cn_image_0000002540771752.png?HW-CC-KV=V1&HW-CC-Date=20260414T053239Z&HW-CC-Expire=86400&HW-CC-Sign=D7ABE8E33BD13910608423B4E93EA6F93917ACFCDFC3CDA4200B868848AFEFEA)

## 开发步骤

1. 导入最近图片组件模块文件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BaseItemInfo } from '@ohos.file.PhotoPickerComponent';
   2. import {
   3. PhotoSource,
   4. RecentPhotoComponent,
   5. RecentPhotoOptions,
   6. photoAccessHelper
   7. } from '@kit.MediaLibraryKit';
   ```
2. 创建最近图片组件选择选项实例（RecentPhotoOptions）。

   通过RecentPhotoOptions，开发者可配置显示多长时间段内的图片、文件类型、文件内容来源，详见[RecentPhotoOptions API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-file-recentphotocomponent#recentphotooptions)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 最近图片组件初始化。
   2. recentPhotoOptions: RecentPhotoOptions = new RecentPhotoOptions();
   ```
3. 初始化最近图片组件选择选项实例（RecentPhotoOptions）。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 设置数据类型，IMAGE_VIDEO_TYPE：图片和视频（默认值）、IMAGE_TYPE：图片、VIDEO_TYPE：视频、MOVING_PHOTO_IMAGE_TYPE：动态图片。
   2. this.recentPhotoOptions.MIMEType = photoAccessHelper.PhotoViewMIMETypes.IMAGE_VIDEO_TYPE;

   4. // 设置最近图片的时间范围，单位（秒），有效范围为（0，86400]，设置为小于等于0、大于86400或者未配置时默认按最长时间段1天显示最近图片。
   5. this.recentPhotoOptions.period = 0;

   7. // 设置资源的来源，ALL：所有、CAMERA：相机、SCREENSHOT：截图。
   8. this.recentPhotoOptions.photoSource = PhotoSource.ALL;
   ```
4. 创建[RecentPhotoComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-file-recentphotocomponent#recentphotocomponent)组件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. RecentPhotoComponent({
   2. // 设置最近图片组件选择选项实例。
   3. recentPhotoOptions: this.recentPhotoOptions,

   5. /**
   6. * 选择最近图片触发的回调事件，点击会申请授权该最近图片的读权限，入参recentPhotoInfo为最近图片信息。
   7. * BaseItemInfo（uri, mimeType, width, height, size, duration）
   8. */
   9. onRecentPhotoClick: (recentPhotoInfo: BaseItemInfo): boolean => this.onRecentPhotoClick(recentPhotoInfo),

   11. // 检查是否存在最近的资源。
   12. onRecentPhotoCheckResult: (recentPhotoExists: boolean) => this.onReceiveCheckResult(recentPhotoExists),
   13. })
   ```
5. 实现相关回调。

   实现onReceiveCheckResult回调，可查询是否存在最近图片，仅返回true时才可进一步实现控制是否显示最近图片。

   实现onRecentPhotoClick回调，将上报返回图片/视频相关信息[BaseItemInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-file-photopickercomponent#baseiteminfo)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 返回值为true表示最近图片处理完成。
   2. private onRecentPhotoClick(recentPhotoInfo: BaseItemInfo): boolean {
   3. if (!recentPhotoInfo) {
   4. return false;
   5. }
   6. return true;
   7. }

   9. private onReceiveCheckResult(recentPhotoExists: boolean): void {
   10. if (!recentPhotoExists) {
   11. console.info('not exist recent photo');
   12. }
   13. // 存在最近图片的话，可以实现业务需求，如去控制RecentPhotoComponent是否显示。
   14. }
   ```

## 完整示例

完整示例请查阅[示例](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-file-recentphotocomponent#示例)。