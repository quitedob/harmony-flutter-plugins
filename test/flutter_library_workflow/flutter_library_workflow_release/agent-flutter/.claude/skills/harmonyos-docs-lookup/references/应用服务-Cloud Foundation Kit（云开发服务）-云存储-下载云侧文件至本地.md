文件上传至云侧后，开发者可以将云侧文件下载到本地设备中。

## 约束与限制

支持Phone、Tablet设备。并且从5.1.0(18)版本开始，新增支持Wearable设备；从5.1.1(19)版本开始，新增支持TV设备。

## 前提条件

* 已[初始化存储实例](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-storage-initialize-bucket)。
* 已[上传指定文件至云侧](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-storage-upload-file)。

## 操作步骤

1. 调用[StorageBucket.downloadFile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cloudfoundation-cloudstorage#section02263293319)接口创建下载任务，监听下载任务的progress、completed、failed等事件。
2. 启动下载任务。

   说明

   下载成功后，文件将保存在[context.cacheDir](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context#属性)目录下。

完整示例代码如下：

收起

自动换行

深色代码主题

复制

```
1. import { cloudStorage } from '@kit.CloudFoundationKit';
2. import { BusinessError, request } from '@kit.BasicServicesKit';
3. import { hilog } from '@kit.PerformanceAnalysisKit';
4. import { GlobalContext } from '../common/GlobalContext';

6. let storageBucket: cloudStorage.StorageBucket = cloudStorage.bucket();

8. @Component
9. export struct testPage {
10. build() {
11. }

13. // 下载云侧文件至本地
14. download() {
15. // 获取云存储默认实例中fileName文件，保存至本地
16. storageBucket.downloadFile(GlobalContext.getContext(), {
17. localPath: `screenshot.jpg`, // 文件将会保存在context.cacheDir目录下
18. cloudPath: `screenshot/screenshot_20250115_155321.jpg`  // 云侧文件路径，支持传入“文件目录/文件名”，或仅传入文件名
19. }).then((task: request.agent.Task) => {
20. task.on('progress', (progress) => {
21. hilog.info(0x0000, 'testTag', `on progress ${JSON.stringify(progress)} `);
22. });
23. task.on('completed', (progress) => {
24. hilog.info(0x0000, 'testTag', `on completed ${JSON.stringify(progress)} `);
25. });
26. task.on('failed', (progress) => {
27. hilog.info(0x0000, 'testTag', `on failed ${JSON.stringify(progress)} `);
28. });
29. task.on('response', (response) => {
30. hilog.info(0x0000, 'testTag', `on response ${JSON.stringify(response)} `);
31. });
32. task.start((err: BusinessError) => {
33. if (err) {
34. hilog.error(0x0000, 'testTag',
35. `Failed to start a file download task, code: ${err.code}, message: ${err.message}`);
36. } else {
37. hilog.info(0x0000, 'testTag', `Succeeded in starting a file download task. result: ${task.tid}`);
38. }
39. });
40. }).catch((err: BusinessError) => {
41. hilog.error(0x0000, 'testTag', `Failed to download file, code: ${err.code}, message: ${err.message}`);
42. })
43. }
44. }
```

说明

如果本地已存在同名文件，下载文件将出现异常，可以通过设置[DownloadParams.overwrite](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cloudfoundation-cloudstorage#section14137913019)来决定是否覆盖本地文件。