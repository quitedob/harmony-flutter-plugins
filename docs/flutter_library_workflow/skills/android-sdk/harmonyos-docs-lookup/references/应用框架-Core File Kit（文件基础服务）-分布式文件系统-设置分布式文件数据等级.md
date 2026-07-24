不同设备本身的安全能力差异较大，一些小的嵌入式设备安全能力远弱于平板等设备类型。用户或者应用不同的文件数据有不同安全诉求，例如个人的健康信息和银行卡信息等不期望被弱设备读取。因此，HarmonyOS提供一套完整的数据分级、设备分级标准，并针对不同设备制定不同的数据流转策略，具体规则请参见[数据、设备安全分级](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/access-control-by-device-and-data-level)。

## 接口说明

API详细介绍请参见[ohos.file.securityLabel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-file-securitylabel)。

**表1** 设置文件数据等级，其中“√”表示支持。

展开

| 接口名 | 功能 | 接口类型 | 支持同步 | 支持异步 |
| --- | --- | --- | --- | --- |
| setSecurityLabel | 设置文件安全标签。 | 方法 | √ | √ |
| getSecurityLabel | 获取文件安全标签。 | 方法 | √ | √ |

注意

1. 对于不满足安全等级的文件，跨设备仍然可以看到该文件，但是无权限打开访问该文件。
2. 分布式文件系统的数据等级默认为S3，应用可以主动设置文件的安全等级。

## 开发示例

获取通用文件沙箱路径，并设置数据等级标签。示例中的context的获取方式请参见[获取UIAbility的上下文信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uiability-usage#获取uiability的上下文信息)。

收起

自动换行

深色代码主题

复制

```
1. import { securityLabel } from '@kit.CoreFileKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { common } from '@kit.AbilityKit';
4. import { fileIo as fs } from '@kit.CoreFileKit';
```

收起

自动换行

深色代码主题

复制

```
1. // 获取需要设备数据等级的文件沙箱路径，请在组件内获取context，确保this.getUIContext().getHostContext()返回结果为UIAbilityContext
2. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
3. let pathDir = context.filesDir;
4. let filePath = pathDir + '/test.txt';

6. //打开文件
7. let file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
8. // 设置文件的数据等级为s0
9. securityLabel.setSecurityLabel(filePath, 's0').then(() => {
10. console.info('Succeeded in setSecurityLabeling.');
11. fs.closeSync(file);
12. }).catch((err: BusinessError) => {
13. console.error(`Failed to setSecurityLabel. Code: ${err.code}, message: ${err.message}`);
14. });
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/CoreFile/FileApiFileSample/entry/src/main/ets/pages/Index.ets#L354-L388)