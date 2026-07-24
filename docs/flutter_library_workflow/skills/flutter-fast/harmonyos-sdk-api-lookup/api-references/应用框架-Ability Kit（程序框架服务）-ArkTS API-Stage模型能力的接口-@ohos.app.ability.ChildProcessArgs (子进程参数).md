传递到子进程的参数。[childProcessManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-childprocessmanager)启动子进程时，可以通过ChildProcessArgs传递参数到子进程中。

说明

本模块首批接口从API version 12开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

本模块接口仅可在Stage模型下使用。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { ChildProcessArgs } from '@kit.AbilityKit';
```

## ChildProcessArgs

PhonePC/2in1TabletTVWearable

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| entryParams | string | 否 | 是 | 开发者自定义参数，透传到子进程中。可以在[ChildProcess.onStart](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-childprocess#childprocessonstart)方法中通过args.entryParams获取，entryParams支持传输的最大数据量为150KB。 |
| fds | Record<string, number> | 否 | 是 | 文件描述符句柄集合，用于主进程和子进程通信，通过key-value的形式传入到子进程中，其中key为自定义字符串，value为文件描述符句柄。可以在[ChildProcess.onStart](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-childprocess#childprocessonstart)方法中通过args.fds获取fd句柄。  **说明：**  - fds最多支持16组，每组key的最大长度为20字符。  - 传递到子进程中句柄数字可能会变，但是指向的文件是一致的。 |

**示例：**

示例中的context的获取方式请参见[获取UIAbility的上下文信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uiability-usage#获取uiability的上下文信息)。



```
1. // 主进程中:
2. import { common, ChildProcessArgs, childProcessManager } from '@kit.AbilityKit';
3. import { fileIo } from '@kit.CoreFileKit';

5. @Entry
6. @Component
7. struct Index {
8. build() {
9. Row() {
10. Column() {
11. Text('Click')
12. .fontSize(30)
13. .fontWeight(FontWeight.Bold)
14. .onClick(() => {
15. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
16. let path = context.filesDir + "/test.txt";
17. let file = fileIo.openSync(path, fileIo.OpenMode.READ_ONLY | fileIo.OpenMode.CREATE);
18. let args: ChildProcessArgs = {
19. entryParams: "testParam",
20. fds: {
21. "key1": file.fd
22. }
23. };
24. childProcessManager.startArkChildProcess("entry/./ets/process/DemoProcess.ets", args);
25. });
26. }
27. .width('100%')
28. }
29. .height('100%')
30. }
31. }
```



```
1. // 子进程中:
2. import { ChildProcess, ChildProcessArgs } from '@kit.AbilityKit';

4. export default class DemoProcess extends ChildProcess {

6. onStart(args?: ChildProcessArgs) {
7. let entryParams = args?.entryParams;
8. let fd = args?.fds?.key1;
9. // ..
10. }
11. }
```