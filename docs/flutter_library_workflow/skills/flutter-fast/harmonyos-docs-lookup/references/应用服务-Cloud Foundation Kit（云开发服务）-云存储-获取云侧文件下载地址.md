文件上传至云侧后，开发者可以获取云侧文件的下载地址，将下载地址放到网站中提供文件下载的体验。

## 约束与限制

支持Phone、Tablet设备。并且从5.1.0(18)版本开始，新增支持Wearable设备；从5.1.1(19)版本开始，新增支持TV设备。

## 前提条件

* 已[初始化存储实例](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-storage-initialize-bucket)。
* 已[上传指定文件至云侧](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-storage-upload-file)。

## 操作步骤

调用[StorageBucket.getDownloadURL](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cloudfoundation-cloudstorage#section9969145143317)接口获取云侧文件的下载地址。

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

12. // 获取云侧文件下载地址
13. getUrl() {
14. // 获取云存储默认实例中screenshot/screenshot_20250115_155321.jpg文件的下载地址
15. storageBucket.getDownloadURL('screenshot/screenshot_20250115_155321.jpg').then((downloadURL: string) => {
16. hilog.info(0x0000, 'testTag', `Succeeded in getting download URL: ${downloadURL}`);
17. }).catch((err: BusinessError) => {
18. hilog.error(0x0000, 'testTag', `Failed to get download URL, code: ${err.code}, message: ${err.message}`);
19. })
20. }
21. }
```