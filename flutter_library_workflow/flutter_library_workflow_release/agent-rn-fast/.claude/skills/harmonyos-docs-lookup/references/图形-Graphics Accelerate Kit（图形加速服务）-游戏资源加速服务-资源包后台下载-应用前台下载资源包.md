启动游戏后，为游戏提供管理、创建资源包下载任务功能。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/85/v3/C8k3S9V_RouYaghJ_nY8eg/zh-cn_image_0000002485836352.png?HW-CC-KV=V1&HW-CC-Date=20260414T054405Z&HW-CC-Expire=86400&HW-CC-Sign=B6C19DD43707B4B4B6CB0AF317D1F24E31D8C518EF9ADA08E21528E47D519EB2)

1. 用户打开游戏App。
2. 游戏调用[fetchManifestUrl](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section81101219425)方法，从游戏资源加速服务获取manifestUrl资源清单。
3. 游戏根据manifestUrl获取资源包下载任务列表。若manifestUrl不为空，游戏从华为CDN获取资源包下载任务列表，若manifestUrl为空，从三方CDN获取资源包下载任务列表。
4. 游戏向资源加速服务订阅资源包下载进度/状态事件。游戏调用[on('progress')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section171317233391)方法，监听资源包下载进度。游戏调用[on('pause')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section93468227013)方法，监听下载任务是否暂停。游戏调用[on('complete')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section165201771441)方法，监听资源是否成功下载。游戏调用[on('fail')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section22331871979)方法，监听下载任务是否失败。
5. 游戏调用[addAssetDownloadTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section104771151219)方法，新增manifestUrl清单上的资源包下载任务。
6. 游戏资源加速服务根据下载任务逐一下载资源包。
7. 游戏资源加速服务每完成一个下载任务，均会向游戏通知当前任务的下载进度和下载状态。
8. 若游戏接收到[on('progress')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section171317233391)方法返回的[DownloadCompletedInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section13627145473413)，表示资源包下载成功，游戏可前往下载路径操作（例如转移、解压）资源文件。若游戏接收到[on('fail')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section22331871979)方法返回的[DownloadFailedInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section154451056193512)，表示下载任务失败，游戏可以根据[DownloadFault](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section82071855806)自行实现处理逻辑。若游戏接收到[on('pause')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section93468227013)方法返回的[AssetDownloadTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section1639510932819)，表示下载任务已暂停，游戏可以携带taskId，调用[resumeAssetDownloadTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section81011552114216)方法，恢复暂停中的下载任务。
9. 游戏向资源加速服务取消订阅资源包下载进度/状态事件。游戏调用[off('progress')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section119038965812)方法，取消监听资源包下载进度。游戏调用[off('pause')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section1229111411927)方法，取消监听下载任务暂停事件。游戏调用[off('complete')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section145731108615)方法，取消监听资源包下载成功事件。游戏调用[off('fail')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section131235411188)方法，取消监听资源包下载失败事件。

## 接口说明

具体API说明请详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager)。

展开

| 接口名 | 描述 |
| --- | --- |
| [fetchManifestUrl](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section81101219425)(): Promise<string> | 获取资源包文件下载列表。使用Promise异步回调。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section171317233391)(type: 'progress', callback: Callback<DownloadProgressInfo[]>): void | 订阅资源包下载进度事件。使用callback形式返回结果。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section93468227013)(type: 'pause', callback: Callback<AssetDownloadTask>): void | 订阅资源包下载暂停事件。使用callback形式返回结果。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section165201771441)(type: 'complete', callback: Callback<DownloadCompletedInfo>): void | 订阅资源包下载成功事件。使用callback形式返回结果。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section22331871979)(type: 'fail', callback: Callback<DownloadFailedInfo>): void | 订阅资源包下载失败事件。使用callback形式返回结果。 |
| [addAssetDownloadTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section104771151219)(context: common.BaseContext, downloadConfig: AssetDownloadConfig): Promise<string> | 新增资源包下载任务。使用Promise异步回调。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section119038965812)(type: 'progress', callback?: Callback<DownloadProgressInfo[]>): void | 取消订阅资源包下载进度事件。使用callback形式返回结果。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section1229111411927)(type: 'pause', callback?: Callback<AssetDownloadTask>): void | 取消订阅资源包下载暂停事件。使用callback形式返回结果。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section145731108615)(type: 'complete', callback?: Callback<DownloadCompletedInfo>): void | 取消订阅资源包下载成功事件。使用callback形式返回结果。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section131235411188)(type: 'fail', callback?: Callback<DownloadFailedInfo>): void | 取消订阅资源包下载失败事件。使用callback形式返回结果。 |

## 开发步骤

1. 导入assetDownloadManager模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { assetDownloadManager } from '@kit.GraphicsAccelerateKit';
   2. import { common } from '@kit.AbilityKit';
   ```
2. 游戏调用[fetchManifestUrl](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section81101219425)方法，获取manifestUrl资源清单，并根据manifestUrl获取资源包下载任务列表。若manifestUrl不为空，则游戏从华为CDN获取资源包下载任务列表。若manifestUrl为空，则从三方CDN获取资源包下载任务列表。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. async fetchManifestUrl() {
   2. let manifestUrl : string = '';
   3. try {
   4. manifestUrl = await assetDownloadManager.fetchManifestUrl();
   5. console.info('AssetAccelDemo', `Succeeded in fetching manifestUrl, manifestUrl = ${manifestUrl}`);
   6. } catch (error) {
   7. console.error('AssetAccelDemo', `Failed to fetch manifestUrl, errCode: ${error.code}, errMessage: ${error.message}`);
   8. return;
   9. }
   10. // 根据获取到的manifestUrl不为空，获取华为CDN侧资源。若获取到的manifestUrl为空，则获取三方CDN侧资源。
   11. }
   ```
3. 游戏调用[on('progress')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section171317233391)方法，监听资源包下载进度。游戏调用[on('pause')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section93468227013)方法，监听下载任务是否暂停。游戏调用[on('complete')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section165201771441)方法，监听资源是否成功下载。游戏调用[on('fail')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section22331871979)方法，监听下载任务是否失败。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. onProgressCallback: (progressArray: assetDownloadManager.DownloadProgressInfo[]) => void = (progressArray) => {
   2. console.info('AssetAccelDemo', `onProgressCallback progressArray length: ${progressArray.length}`);
   3. // 添加资源包下载进度处理逻辑。
   4. }

   6. onPauseCallback: (downloadTaskInfo: assetDownloadManager.AssetDownloadTask) => void = (downloadTaskInfo) => {
   7. console.info('AssetAccelDemo', `task identifier = ${downloadTaskInfo.config.identifier} has paused.`);
   8. // 添加资源包下载暂停处理逻辑。
   9. }

   11. onCompleteCallback: (completeInfo: assetDownloadManager.DownloadCompletedInfo) => void = async (completeInfo) => {
   12. console.info('AssetAccelDemo', `task identifier = ${completeInfo.downloadTask.config.identifier} has completed.`);
   13. // 添加资源包下载完成处理逻辑。
   14. }

   16. onFailedCallback: (failedInfo: assetDownloadManager.DownloadFailedInfo) => void = async (failedInfo) => {
   17. console.info('AssetAccelDemo', `task identifier = ${failedInfo.downloadTask.config.identifier} has failed.`);
   18. // 添加资源包下载失败处理逻辑。
   19. }

   21. // 订阅下载状态和下载进度事件。
   22. try {
   23. assetDownloadManager.on("progress", this.onProgressCallback);
   24. assetDownloadManager.on("pause", this.onPauseCallback);
   25. assetDownloadManager.on("complete", this.onCompleteCallback);
   26. assetDownloadManager.on("fail", this.onFailedCallback);
   27. } catch (error) {
   28. console.error('AssetAccelDemo', `Failed to do assetDownloadManager.on, errCode: ${error.code}, errMessage: ${error.message}`);
   29. }
   ```
4. 游戏调用[addAssetDownloadTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section104771151219)方法，新增资源包下载任务。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. async addAssetDownloadTask() {
   2. // 构造资源包下载配置信息。
   3. let assetDownload: assetDownloadManager.AssetDownloadConfig = {
   4. fileName: 'fileName', // 下载资源文件名。
   5. url: 'url', // 下载资源url。
   6. isEssential: false, // 是否是必要下载资源。
   7. identifier: 'identifier', // 标识信息。
   8. groupId: 'groupId' // 组ID，用于标识资源的版本信息。
   9. }
   10. try {
   11. // 添加资源包下载任务。
   12. // 根据实际代码上下文自行传入合适的context。
   13. const taskId: string = await assetDownloadManager.addAssetDownloadTask(this.getUIContext().getHostContext() as common.Context, assetDownload);
   14. console.info('AssetAccelDemo', `Succeeded in adding assetDownloadTask`);
   15. } catch (error) {
   16. console.error('AssetAccelDemo', `Failed to add assetDownloadTask, errCode:${error.code}, errMessage:${error.message}`);
   17. }
   18. }
   ```
5. 游戏调用[off('progress')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section119038965812)方法，取消监听资源包下载进度。游戏调用[off('pause')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section1229111411927)方法，取消监听下载任务暂停事件。游戏调用[off('complete')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section145731108615)方法，取消监听资源包下载成功事件。游戏调用[off('fail')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-assetdownloadmanager#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section131235411188)方法，取消监听资源包下载失败事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 取消订阅下载状态和下载进度事件。
   2. try {
   3. assetDownloadManager.off("progress", this.onProgressCallback);
   4. assetDownloadManager.off("pause", this.onPauseCallback);
   5. assetDownloadManager.off("complete", this.onCompleteCallback);
   6. assetDownloadManager.off("fail", this.onFailedCallback);
   7. } catch (error) {
   8. console.error('AssetAccelDemo', `Failed to do assetDownloadManager.off, errCode: ${error.code}, errMessage: ${error.message}`);
   9. }
   ```