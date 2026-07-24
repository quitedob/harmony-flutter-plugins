开发者可以获取指定云侧目录下所有的文件信息，包括文件存储目录、文件名称等。

## 约束与限制

支持Phone、Tablet设备。并且从5.1.0(18)版本开始，新增支持Wearable设备；从5.1.1(19)版本开始，新增支持TV设备。

## 前提条件

* 已[初始化存储实例](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-storage-initialize-bucket)。
* 已[上传指定文件至云侧](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-storage-upload-file)。

## 操作步骤

调用[StorageBucket.list](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cloudfoundation-cloudstorage#section420475053513)可以获取云侧指定目录的文件列表。

完整示例代码如下：

收起

自动换行

深色代码主题

复制

```
1. import { cloudStorage } from '@kit.CloudFoundationKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { hilog } from '@kit.PerformanceAnalysisKit';

5. let storageBucket: cloudStorage.StorageBucket = cloudStorage.bucket();

7. @Component
8. export struct testPage {
9. build() {
10. }

12. // 获取文件列表
13. getList() {
14. // 获取云存储默认实例中根路径下的文件列表
15. storageBucket.list('').then((result: cloudStorage.ListResults) => {
16. hilog.info(0x0000, 'testTag', `Succeeded in listing files, result: ${JSON.stringify(result)}`);
17. }).catch((err: BusinessError) => {
18. hilog.error(0x0000, 'testTag', `Failed to list files, code: ${err.code}, message: ${err.message}`);
19. })
20. }
21. }
```

获取文件列表信息结构如下：

收起

自动换行

深色代码主题

复制

```
1. {
2. directories: ["empty-dir1\/", "screenshot\/"],
3. files: ["IMG_20240229_103118.jpg", "IMG_20240318_093732.jpg"]
4. }
```