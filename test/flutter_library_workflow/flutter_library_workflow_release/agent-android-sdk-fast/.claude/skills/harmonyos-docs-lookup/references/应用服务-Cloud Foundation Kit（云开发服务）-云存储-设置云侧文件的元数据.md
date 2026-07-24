文件元数据包含云侧文件名、文件大小、文件类型等常用属性，也包括用户自定义的文件属性。

文件保存至云侧后，开发者可以设置文件的自定义属性。

## 约束与限制

支持Phone、Tablet设备。并且从5.1.0(18)版本开始，新增支持Wearable设备；从5.1.1(19)版本开始，新增支持TV设备。

## 前提条件

* 已[初始化存储实例](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-storage-initialize-bucket)。
* 已[上传指定文件至云侧](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-storage-upload-file)。

## 操作步骤

调用[StorageBucket.setMetadata](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cloudfoundation-cloudstorage#section1924314716387)可以设置云侧文档的元数据信息。

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

12. // 设置元数据
13. setMetaData() {
14. // 设置云存储默认实例中screenshot/screenshot_20250115_155321.jpg文件的元数据信息
15. storageBucket.setMetadata('screenshot/screenshot_20250115_155321.jpg', {
16. customMetadata: {
17. key1: "value1",
18. key2: "value2"
19. }
20. }).then((metadata: cloudStorage.Metadata) => {
21. hilog.info(0x0000, 'testTag', `Succeeded in setting metadata: ${JSON.stringify(metadata)}`);
22. }).catch((err: BusinessError) => {
23. hilog.error(0x0000, 'testTag', `Failed to set metadata, code: ${err.code}, message: ${err.message}`);
24. })
25. }
26. }
```