1. 导入ringtone模块和相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { ringtone } from '@kit.RingtoneKit'
   3. import { uniformTypeDescriptor } from '@kit.ArkData';
   4. import { JSON } from '@kit.ArkTS';
   5. import { hilog } from '@kit.PerformanceAnalysisKit';
   6. const APP_TAG = "Msc_Demo"
   7. const DOMAIN = 0x0001
   ```
2. 调用[ringtone.getSupportedRingtoneTypes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ringtone-ringtone#section81796536265)接口，查询支持设置的铃声类型。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let ringtoneTypeList: Array<ringtone.RingtoneType> = ringtone.getSupportedRingtoneTypes();
   2. hilog.info(DOMAIN, APP_TAG,'getSupportedRingtoneTypes : ' + JSON.stringify(ringtoneTypeList));
   ```
3. 调用[ringtone.getSupportedDataTypes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ringtone-ringtone#section1858041418291)接口，查询支持的数据类型。当前支持格式：MP3，OGG，FLAC，AAC，MP2，M4A。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 其中 ringtone.RingtoneType.NOTIFICATION 为通知铃声
   2. let dataTypeList: Array<uniformTypeDescriptor.UniformDataType> = ringtone.getSupportedDataTypes(ringtone.RingtoneType.NOTIFICATION);
   3. hilog.info(DOMAIN, APP_TAG,'getSupportedDataTypes: ' + JSON.stringify(dataTypeList));
   ```
4. 调用[ringtone.startRingtoneSetting](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ringtone-ringtone#section5949453189)接口拉起设置弹窗，用户设置铃声后返回设置的铃声类型。

   通过promise异步方式：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 详细代码参考API参考
   2. let prefixUri: string = '';
   3. let audioPath: string = prefixUri + '/' + this.buttonText;
   4. let fileName: string = audioPath.substring(audioPath.lastIndexOf('/') + 1, audioPath.lastIndexOf('.'));
   5. await ringtone.startRingtoneSetting(this.context, audioPath, fileName).then(res => {
   6. hilog.info(DOMAIN, APP_TAG,'setFlag :' + res);
   7. });
   ```

   通过callback异步方式：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 详细代码参考API参考
   2. let prefixUri: string = '';
   3. let audioPath: string = prefixUri + '/' + this.buttonText;
   4. let fileName: string = audioPath.substring(audioPath.lastIndexOf('/') + 1, audioPath.lastIndexOf('.'));
   5. ringtone.startRingtoneSetting(this.context, audioPath, fileName, (err, data) => {
   6. hilog.info(DOMAIN, APP_TAG,'setFlag :' + data);
   7. });
   ```
5. 调用[ringtone.getSupportedMaxDuration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ringtone-ringtone#section759192934316)接口，获取当前铃声支持的最大时长。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 其中 ringtone.RingtoneType.MESSAGE 为短信铃声
   2. let maxDuration: number =
   3. ringtone.getSupportedMaxDuration(ringtone.RingtoneType.MESSAGE, uniformTypeDescriptor.UniformDataType.MP3)
   4. hilog.info(DOMAIN, APP_TAG,'getSupportedMaxDuration: ' + maxDuration);
   ```