## 约束与限制

支持Phone、Tablet设备。并且从5.1.0(18)版本开始，新增支持Wearable设备；从5.1.1(19)版本开始，新增支持TV设备。

## 前提条件

已[开通云存储服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-enable-storage)。

## 操作步骤

调用[cloudStorage.bucket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cloudfoundation-cloudstorage#section1286815320203)初始化一个存储实例。支持使用两种方式初始化实例：

* 使用默认实例

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cloudStorage } from '@kit.CloudFoundationKit';

  3. let bucket: cloudStorage.StorageBucket = cloudStorage.bucket(); // 将启动异步任务查询云侧默认实例
  ```
* 使用指定的实例

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cloudStorage } from '@kit.CloudFoundationKit';

  3. let bucket: cloudStorage.StorageBucket = cloudStorage.bucket('bucket001-ki6tc'); // 指定 bucket001-ki6tc 实例
  ```

  注意

  以“使用指定的实例”方式初始化云存储实例，请确保当前云侧存在该存储实例，否则后续操作将出现找不到存储实例的错误。在云侧创建新的存储实例，可参考[存储实例管理](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/agc-storage-manage-bucket-0000001281294006)。