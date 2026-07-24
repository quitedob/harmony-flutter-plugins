## 约束与限制

支持Phone、Tablet设备。并且从5.1.0(18)版本开始，新增支持Wearable设备；从5.1.1(19)版本开始，新增支持TV设备。

## 前提条件

* 已[新增对象类型](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-database-add-object)。
* 已[新增存储区](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-database-add-zone)。

## 操作步骤

1. 将导出的[json格式文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-database-add-object#zh-cn_topic_0000001518866308_li0821548919)命名为schema.json，拷贝到DevEco Studio项目的“AppScope/resources/rawfile”或者“entry/src/main/resources/rawfile”目录下。在编译构建过程中，AppScope目录下的资源文件会合入到模块的资源文件中，详细信息请参见[资源分类](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/resource-categories-and-access#资源分类)。
2. 按照AGC控制台上创建的对象类型“BookInfo”在代码工程中创建BookInfo.ets文件，文件内容参考以下代码。

   说明

   在AGC控制台创建的字段类型与ArkTS数据类型的匹配关系如下：

   * String、Text对应string。
   * Boolean对应boolean。
   * Byte、ByteArray对应Uint8Array。
   * Short、Integer、Long、Float、Double、IntAutoIncrement、LongAutoIncrement对应number。
   * Date对应Date。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { cloudDatabase } from '@kit.CloudFoundationKit';

   3. class BookInfo extends cloudDatabase.DatabaseObject{
   4. public naturalbase_ClassName(): string {
   5. return "BookInfo";
   6. }
   7. public id: number | undefined;
   8. public bookName: string | undefined;
   9. public author: string | undefined;
   10. public price: number | undefined;
   11. public borrowerId: number | undefined;
   12. public borrowerName: string | undefined;
   13. public borrowerTime: Date | undefined;
   14. }

   16. export { BookInfo };
   ```