DLP是系统提供的系统级的数据防泄漏解决方案，提供一种称为DLP的文件格式。后缀格式为“原始文件名（包含原始文件后缀）.dlp”，例如“test.docx.dlp”，文件由授权凭证和原始文件密文组成。

通过端云协同认证（需要联网）来获取文件的访问授权，授权类型包含只读、编辑、文件拥有者三种。

* 只读：能读取文件内容但不能修改。
* 编辑：能够读写文件内容，但不能修改文件权限配置。
* 文件拥有者：可读写文件、修改权限配置、恢复原始文件等。

应用需要访问DLP文件时，系统会自动安装应用的DLP沙箱分身应用，相当于完全独立的应用，数据和配置会继承原应用，但相互之间并不共享。分身应用在运行时会处于DLP沙箱环境中，访问外部的权限会被限制，以防止数据的泄漏。每当打开一个新的DLP文件会生成一个应用沙箱分身，沙箱应用之间也是相互隔离的，当应用关闭后应用分身会自动卸载，沙箱期间产生的临时数据也会丢弃。

正常情况下，应用不会感知到沙箱的存在，访问的也是解密后的明文，和访问普通文件没有区别，但由于DLP沙箱会限制其访问外部的权限（例如网络、剪切板、截屏、录屏、蓝牙等）。为了更好的用户体验，需要应用进行适配，例如文件只读的情况下，不应显示“保存”按钮，不应主动联网等。

## 沙箱限制

当应用进入DLP沙箱状态时，可以申请的权限将受到限制，根据DLP文件授权类型不同，限制也不相同，如下表：

展开

| 权限名 | 说明 | 授权类型：只读 | 授权类型：编辑/文件拥有者 |
| --- | --- | --- | --- |
| ohos.permission.USE\_BLUETOOTH | 允许应用使用蓝牙。 | 禁止 | 禁止 |
| ohos.permission.INTERNET | 允许应用访问网络。 | 禁止 | 禁止 |
| ohos.permission.DISTRIBUTED\_DATASYNC | 允许应用与远程设备交换用户数据（如图片、音乐、视频、及应用数据等）。 | 禁止 | 禁止 |
| ohos.permission.WRITE\_MEDIA | 应用读写用户媒体文件，如视频、音频、图片等，需要申请此权限。 | 禁止 | 允许 |
| ohos.permission.NFC\_TAG | 允许应用使用NFC。 | 禁止 | 允许 |

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| isDLPFile(fd: number): Promise<boolean>  isDLPFile(fd: number, callback: AsyncCallback<boolean>): void | 判断是否是dlp文件。 |
| getDLPPermissionInfo(): Promise<DLPPermissionInfo>  getDLPPermissionInfo(callback: AsyncCallback<DLPPermissionInfo>): void | 获取当前沙箱应用的权限类型。 |
| getOriginalFileName(fileName: string): string | 获取dlp文件原始文件名。 |
| getDLPSuffix(): string | 获取dlp文件dlp后缀名。 |
| on(type: 'openDLPFile', listener: Callback<AccessedDLPFileInfo>): void | 注册dlp文件打开事件监听，用于原始应用获取dlp文件打开事件。 |
| off(type: 'openDLPFile', listener?: Callback<AccessedDLPFileInfo>): void | 取消dlp文件打开事件监听。 |
| isInSandbox(): Promise<boolean>  isInSandbox(callback: AsyncCallback<boolean>): void | 判断当前是否是dlp沙箱应用。 |
| getDLPSupportedFileTypes(): Promise<Array<string>>  getDLPSupportedFileTypes(callback: AsyncCallback<Array<string>>): void | 获取当前系统支持添加权限保护的文件格式类型。 |
| setRetentionState(docUris: Array<string>): Promise<void>  setRetentionState(docUris: Array<string>, callback: AsyncCallback<void>): void | 设置dlp分身应用保留状态。 |
| cancelRetentionState(docUris: Array<string>): Promise<void>  cancelRetentionState(docUris: Array<string>, callback: AsyncCallback<void>): void | 取消dlp分身应用保留状态。 |
| getRetentionSandboxList(bundleName?: string): Promise<Array<RetentionSandboxInfo>>  getRetentionSandboxList(bundleName: string, callback: AsyncCallback<Array<RetentionSandboxInfo>>): void  getRetentionSandboxList(callback: AsyncCallback<Array<RetentionSandboxInfo>>): void | 获取当前保留沙箱列表。 |
| getDLPFileAccessRecords(): Promise<Array<AccessedDLPFileInfo>>  getDLPFileAccessRecords(callback: AsyncCallback<Array<AccessedDLPFileInfo>>): void | 获取dlp文件访问记录。 |
| setSandboxAppConfig(configInfo: string): Promise<void> | 设置沙箱应用配置信息。 |
| getSandboxAppConfig(): Promise<string> | 查询沙箱应用配置信息。 |
| cleanSandboxAppConfig(): Promise<void> | 清理沙箱应用配置信息。 |
| startDLPManagerForResult(context: common.UIAbilityContext, want: Want): Promise<DLPManagerResult> | 在当前UIAbility界面以无边框形式打开DLP权限管理应用（只支持Stage模型）。 |

## 开发步骤

DLP作为HarmonyOS系统级数据防泄漏方案，可以让应用在零适配或低代码适配的情况下接入DLP能力，打开DLP文件。

当用户使用默认应用或指定应用打开DLP文件时，DLP框架将会完成：

1. 安装此应用的DLP沙箱分身应用。
2. 为这个DLP文件绑定一个FUSE文件。
3. 将FUSE文件分享给DLP沙箱分身应用。

实现DLP沙箱分身在无感加解密流程下访问DLP文件解密后的内容。

当三方应用接入DLP（支持打开DLP文件）时，为了更优的体验，可从以下方面完成适配。

### 预置操作

本文档提供接口示例代码，如需要了解工程项目创建方式，可参考[工程创建](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-project)。

应用接入DLP能力，支持被安装为DLP沙箱分身应用，打开DLP文件，需要具备以下条件：

* 应用需要支持打开以下文件类型中的其中一种或几种，也就是当前DLP支持的文件类型。包括：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. ".doc", ".docm", ".docx", ".dot", ".dotm", ".dotx", ".odp", ".odt", ".pdf", ".pot", ".potm", ".potx", ".ppa",
  2. ".ppam", ".pps", ".ppsm", ".ppsx", ".ppt", ".pptm", ".pptx", ".rtf", ".txt", ".wps", ".xla", ".xlam", ".xls",
  3. ".xlsb", ".xlsm", ".xlsx", ".xlt", ".xltm", ".xltx", ".xlw", ".xml", ".xps"
  ```
* 应用需要具备ohos.want.action.viewData或ohos.want.action.editData的skills，可在module.json5文件中增加相应配置：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. "skills":[
  2. {
  3. "entities":[
  4. ...
  5. ],
  6. "actions":[
  7. ...
  8. "ohos.want.action.viewData"
  9. ]
  10. }
  11. ]
  ```
* 使用的设备需要具备域账号环境。

### 导入模块

引入[dlpPermission](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-dlppermission)模块。

收起

自动换行

深色代码主题

复制

```
1. import { dlpPermission } from '@kit.DataProtectionKit';
```

### 应用支持打开DLP文件绑定的FUSE文件

一般情况下，应用如果支持打开[预置操作](/consumer/cn/doc/harmonyos-guides/dlp-guidelines#预置操作)中指定文件类型的文件，没有对传入的Want做特定限制的情况下，不需要适配即可打开FUSE文件。

打开DLP文件时，应用被安装为DLP沙箱分身应用（后续简称为分身），分身会收到want请求，分身可以对其中一些字段进行解析：

收起

自动换行

深色代码主题

复制

```
1. import { Want } from '@kit.AbilityKit';

3. interface DLPUriObj {
4. name: string
5. };

7. interface DLPWriteable {
8. name:boolean
9. };

11. interface DLPNameObj {
12. dateModified: string,
13. displayName: string,
14. relativePath: string,
15. };

17. interface DLPLinkNameObj {
18. name: string
19. };

21. function getParams(want: Want) {
22. // 接收打开DLP文件传过来的参数
23. let dlpFuseUri: string = want.uri? want.uri : '';  // FUSE文件的uri, 存放解密后的明文
24. let dlpFuseWriteable: boolean = (want.parameters?.linkFileWriteable as DLPWriteable).name; // 对FUSE文件是否有写权限
25. let dlpUri: string = (want.parameters?.dlpUri as DLPUriObj).name; // DLP文件的uri
26. let dlpName: string = (want.parameters?.fileAsset as DLPNameObj).displayName; // DLP文件的文件名
27. let dlpFuseName: string = (want.parameters?.linkFileName as DLPLinkNameObj).name; // FUSE文件的文件名
28. }
```

分身可以通过把want.uri打开为fd，获取FUSE文件的内容：

收起

自动换行

深色代码主题

复制

```
1. import { fileIo as fs } from '@kit.CoreFileKit';
2. import { util } from '@kit.ArkTS';
3. import { hilog } from '@kit.PerformanceAnalysisKit';

5. const TAG: string = 'dlp';

7. function readFileContent(dlpFuseUri:string): string {
8. let content: string = '';
9. let file: fs.File;
10. try {
11. file = fs.openSync(dlpFuseUri, fs.OpenMode.READ_ONLY); // 打开FUSE文件获取fd
12. } catch (err) {
13. hilog.error(0x0000, TAG, 'openSync failed. ' + err);
14. return content;
15. }

17. try {
18. let buffer = new ArrayBuffer(4096);
19. let readOut = fs.readSync(file.fd, buffer, { // 读取文件内容
20. offset: 0
21. });
22. content = bufferToString(buffer); // 文件内容转换成string类型
23. } catch (err) {
24. hilog.error(0x0000, TAG,'readSync failed. ' + err);
25. }
26. fileIo.closeSync(file.fd); // 关闭文件
27. return content;
28. }

30. function bufferToString(buffer: ArrayBuffer): string {
31. let textDecoder = new util.TextDecoder('utf-8', {
32. ignoreBOM: true
33. });
34. let resultPut = textDecoder.decodeToString(new Uint8Array(buffer), {
35. stream: true
36. });
37. return resultPut;
38. }
```

如果有FUSE文件的读写权限，也可以更新FUSE文件内容：

收起

自动换行

深色代码主题

复制

```
1. import { fileIo as fs } from '@kit.CoreFileKit';

3. function writeFileContent(dlpFuseUri: string, content: string): void {
4. let file: fs.File = fs.openSync(dlpFuseUri, fs.OpenMode.READ_WRITE); // 以读写权限打开FUSE文件获取fd
5. let writeLen: number = fs.writeSync(file.fd, content);  // 把内容写回FUSE文件中
6. fs.closeSync(file); // 关闭文件
7. }
```

### 应用根据DLP文件的权限对界面进行适配

DLP沙箱分身中可以调用[getDLPPermissionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-dlppermission#dlppermissiongetdlppermissioninfo)方法查询当前系统登陆的域账号用户对本DLP文件的用户权限和操作权限，不同用户权限可以对应不同的对文档的操作权限。

收起

自动换行

深色代码主题

复制

```
1. import { dlpPermission } from '@kit.DataProtectionKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { hilog } from '@kit.PerformanceAnalysisKit';

5. const TAG: string = 'dlp';

7. dlpPermission.getDLPPermissionInfo().then((data: dlpPermission.DLPPermissionInfo)=> {
8. let userAccess: dlpPermission.DLPFileAccess = data.dlpFileAccess; // 用户对本DLP文件的用户权限
9. let isEditable: number = data.flags & dlpPermission.ActionFlagType.ACTION_EDIT; // 用户对本DLP文件的操作权限
10. }).catch((err: BusinessError) => {
11. hilog.error(0x0000, TAG, 'getDLPPermissionInfo: ' + JSON.stringify(err));
12. });
```

getDLPPermissionInfo返回的data为[DLPPermissionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-dlppermission#dlppermissioninfo)类型，其中dlpFileAccess表示用户权限，flags表示操作权限的按位组合的结果。可以根据返回的flags字段对照[ActionFlagType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-dlppermission#actionflagtype)判断DLP沙箱分身是否具有对应的操作权限，可以用于界面按钮置灰操作等。

### 应用与DLP沙箱分身数据共享

DLP沙箱分身是普通应用的分身，所有数据都是全新的，如果二者之间有些数据需要实现共享，可以通过DLP框架提供的应用与DLP沙箱分身数据共享机制实现。一种典型的使用场景是原应用与DLP沙箱分身之间共用是否已经弹出过隐私声明弹框的配置信息。

一般包括下面四种读写配置信息前后顺序组合：

* 原应用写配置，原应用读配置。
* 原应用写配置，DLP沙箱分身读配置。
* DLP沙箱分身写配置，DLP沙箱分身读配置。
* DLP沙箱分身写配置，原应用读配置。

**约束与限制**

* 每次调用设置配置信息接口会覆盖上次调用的设置内容。
* 出于数据防泄漏考虑，DLP沙箱分身写配置需要在读取FUSE文件内容之前完成。

**具体步骤**

1. 设置配置信息。

   把需要保存的配置信息转成string类型，调用[setSandboxAppConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-dlppermission#dlppermissionsetsandboxappconfig11)接口设置配置信息。

   普通应用和DLP沙箱分身都可以调用该接口，但DLP沙箱分身必须在读取DLP文件内容之前才允许调用。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { dlpPermission } from '@kit.DataProtectionKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';

   5. const TAG: string = 'dlp';

   7. async function setSandboxAppConfig() {
   8. try {
   9. await dlpPermission.setSandboxAppConfig('configInfo'); // 设置配置信息
   10. } catch (err) {
   11. hilog.error(0x0000, TAG, 'setSandboxAppConfig error: ' + JSON.stringify(err)); // 失败报错
   12. }
   13. }
   ```
2. 清理配置信息。

   调用[cleanSandboxAppConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-dlppermission#dlppermissioncleansandboxappconfig11)接口清理该应用的所有配置信息。

   该接口只允许普通应用中调用。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { dlpPermission } from '@kit.DataProtectionKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';

   5. const TAG: string = 'dlp';

   7. async function cleanSandboxAppConfig() {
   8. try {
   9. await dlpPermission.cleanSandboxAppConfig(); // 清理配置信息
   10. } catch (err) {
   11. hilog.error(0x0000, TAG, 'cleanSandboxAppConfig error: ' + JSON.stringify(err)); // 失败报错
   12. }
   13. }
   ```
3. 获取配置信息。

   调用[getSandboxAppConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-dlppermission#dlppermissiongetsandboxappconfig11)查询该应用的所有配置信息。

   普通应用和DLP沙箱分身都可以调用。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { dlpPermission } from '@kit.DataProtectionKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';

   5. const TAG: string = 'dlp';

   7. async function getSandboxAppConfig() {
   8. try {
   9. let res:string = await dlpPermission.getSandboxAppConfig(); // 查询配置信息
   10. } catch (err) {
   11. hilog.error(0x0000, TAG, 'getSandboxAppConfig error: ' + JSON.stringify(err)); // 失败报错
   12. }
   13. }
   ```

### 应用支持更新最近打开记录

当应用有最近打开记录场景时，可以使用DLP框架提供的接口适配最近打开记录。可从以下场景适配：

* **普通应用未启动，无法感知到DLP沙箱分身打开的DLP文件**。

  仅有DLP沙箱分身有打开DLP文件场景：普通应用启动时，可以通过接口获取到历史通过本应用的DLP沙箱分身打开的DLP文件。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { dlpPermission } from '@kit.DataProtectionKit';
  2. import { BusinessError } from '@kit.BasicServicesKit';
  3. import { hilog } from '@kit.PerformanceAnalysisKit';

  5. const TAG: string = 'dlp';

  7. async function getDLPFileAccessRecords() {
  8. try {
  9. let res:Array<dlpPermission.AccessedDLPFileInfo> = await dlpPermission.getDLPFileAccessRecords(); // 获取DLP访问列表
  10. hilog.info(0x0000, TAG, 'res' + JSON.stringify(res))
  11. } catch (err) {
  12. hilog.error(0x0000, TAG, 'error:' + JSON.stringify(err)); // 失败报错
  13. }
  14. }
  ```
* **普通应用已启动，可以感知到DLP沙箱分身打开的DLP文件**。

  DLP沙箱分身有打开DLP文件场景：普通应用可以订阅本应用的DLP沙箱分身打开DLP文件的事件。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
  2. import { dlpPermission } from '@kit.DataProtectionKit';
  3. import { BusinessError } from '@kit.BasicServicesKit';
  4. import { hilog } from '@kit.PerformanceAnalysisKit';

  6. const TAG: string = 'dlp';


  9. export default class TestAbility extends UIAbility {
  10. onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
  11. this.subscribe();
  12. }

  14. onDestroy(): void {
  15. this.unSubscribe();
  16. }

  18. event(info: dlpPermission.AccessedDLPFileInfo) {
  19. hilog.info(0x0000, TAG, 'openDlpFile event');
  20. }

  22. unSubscribe() {
  23. try {
  24. dlpPermission.off('openDLPFile', this.event); // 取消订阅
  25. } catch (err) {
  26. hilog.error(0x0000, TAG, 'error:' + JSON.stringify(err)); // 失败报错
  27. }
  28. }

  30. subscribe() {
  31. try {
  32. dlpPermission.on('openDLPFile', this.event); // 订阅
  33. } catch (err) {
  34. hilog.error(0x0000, TAG, 'error:' + JSON.stringify(err)); // 失败报错
  35. }
  36. }
  37. }
  ```

### 应用内支持打开选定的DLP文件

应用可以支持从最近打开列表、文件选择器中选择DLP文件，打开DLP文件的场景，按如下流程适配：

1. 设置[Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-ability-want)参数，指定action为"ohos.want.action.viewData"，bundleName、abilityName分别为选择打开DLP文件的应用的bundleName、abilityName，uri为需要打开的DLP文件的uri，在parameters中设置fileName的name值为DLP文件的文件名。
2. 获取[UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-common)的context。
3. 调用context的[startAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#startability)方法传入want参数，打开dlp文件。

收起

自动换行

深色代码主题

复制

```
1. import { Want } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { common } from '@kit.AbilityKit';
4. import { UIContext } from '@kit.ArkUI';
5. import { hilog } from '@kit.PerformanceAnalysisKit';

7. const TAG: string = 'dlp';

9. function openDlpFile(dlpUri: string, fileName: string) {
10. let want: Want = {
11. "action": "ohos.want.action.viewData",
12. "bundleName": "com.example.example_bundle_name",
13. "abilityName": "exampleAbility",
14. "uri": dlpUri,
15. "parameters": {
16. "fileName": {
17. "name": fileName
18. }
19. }
20. }
21. let context = new UIContext().getHostContext() as common.UIAbilityContext; // 获取当前UIAbilityContext
22. try {
23. hilog.info(0x0000, TAG, 'openDLPFile:' + JSON.stringify(want));
24. hilog.info(0x0000, TAG, 'openDLPFile: delegator:' + JSON.stringify(context));
25. context.startAbility(want);
26. } catch (err) {
27. hilog.error(0x0000, TAG, 'openDLPFile startAbility failed:' + JSON.stringify(err));
28. return;
29. }
30. }
```

### 应用内支持对DLP文件权限设置

应用内可以集成权限设置按钮，当已打开一个普通文件后，点击权限设置按钮，拉起DLP管理应用的模态设置权限页面，生成DLP文件。也可以在DLP沙箱分身中查看当前正在打开的DLP文件的操作权限。

* **普通应用内权限设置**

  以无边框形式打开DLP权限管理应用。

  + 此方法只能在UIAbility上下文中调用，只支持Stage模式。
  + want参数中uri的值为普通文件uri，parameters.displayName为文件名，这两个值为必传参数。
  + 调用[dlpPermission.startDLPManagerForResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-dlppermission#dlppermissionstartdlpmanagerforresult11)拉起DLP管理应用的设置权限页面，输入相关的域账号信息，点击保存，在拉起的filepicker中选择DLP文件的保存路径，保存DLP文件。

  调用以下代码：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { common, Want } from '@kit.AbilityKit';
  2. import { BusinessError } from '@kit.BasicServicesKit';
  3. import { dlpPermission } from '@kit.DataLossPreventionKit';
  4. import { UIContext } from '@kit.ArkUI';
  5. import { hilog } from '@kit.PerformanceAnalysisKit';

  7. const TAG: string = 'dlp';

  9. try {
  10. let fileUri: string = "file://docs/storage/Users/currentUser/test.txt";
  11. let fileName: string = "test.txt";
  12. let context = new UIContext().getHostContext() as common.UIAbilityContext; // 获取当前UIAbilityContext
  13. let want: Want = {
  14. 'uri': fileUri,
  15. 'parameters': {
  16. 'displayName': fileName
  17. }
  18. }; // 请求参数
  19. dlpPermission.startDLPManagerForResult(context, want).then((res: dlpPermission.DLPManagerResult) => {
  20. hilog.info(0x0000, TAG, 'startDLPManagerForResult res.resultCode:' + res.resultCode);
  21. hilog.info(0x0000, TAG, 'startDLPManagerForResult res.want:' + JSON.stringify(res.want));
  22. }); // 拉起DLP权限管理应用 设置权限
  23. } catch (err) {
  24. hilog.error(0x0000, TAG, 'startDLPManagerForResult error:' + (err as BusinessError).code + (err as BusinessError).message);
  25. }
  ```
* **DLP沙箱分身内权限修改，查看和解除**

  + 如果当前的账号是DLP文档的创建者，则该用户拥有修改这个DLP文件权限或者解除这个DLP文档权限还原为普通文件的能力，调用以下代码，拉起DLP管理应用的设置权限页面，在该页面中选择更改加密进行权限修改或者解除加密；如果当前账号拥有DLP文档只读或者编辑权限，调用以下代码则可以查看当前用户权限内容。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. import { common, Want } from '@kit.AbilityKit';
    2. import { BusinessError } from '@kit.BasicServicesKit';
    3. import { dlpPermission } from '@kit.DataLossPreventionKit';
    4. import { UIContext } from '@kit.ArkUI';
    5. import { hilog } from '@kit.PerformanceAnalysisKit';

    7. const TAG: string = 'dlp';

    9. try {
    10. let fileUri: string = "file://docs/storage/Users/currentUser/test.txt.dlp";// DLP文件的uri
    11. let fileName: string = "test.txt.dlp";
    12. let context = new UIContext().getHostContext() as common.UIAbilityContext; // 获取当前UIAbilityContext
    13. let want: Want = {
    14. 'uri': fileUri,
    15. 'parameters': {
    16. 'displayName': fileName
    17. }
    18. }; // 请求参数
    19. dlpPermission.startDLPManagerForResult(context, want).then((res: dlpPermission.DLPManagerResult) => {
    20. hilog.info(0x0000, TAG, 'startDLPManagerForResult res.resultCode:' + res.resultCode);
    21. hilog.info(0x0000, TAG, 'startDLPManagerForResult res.want:' + JSON.stringify(res.want));
    22. }); // 拉起DLP权限管理应用 设置权限
    23. } catch (err) {
    24. hilog.error(0x0000, TAG, 'startDLPManagerForResult error:' + (err as BusinessError).code + (err as BusinessError).message);
    25. }
    ```
  + DLP沙箱分身中可以调用[getDLPPermissionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-dlppermission#dlppermissiongetdlppermissioninfo)方法查询当前用户DLP文件权限，DLP沙箱分身的权限限制，参考[沙箱限制](/consumer/cn/doc/harmonyos-guides/dlp-guidelines#沙箱限制)。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. import { dlpPermission } from '@kit.DataProtectionKit';
    2. import { BusinessError } from '@kit.BasicServicesKit';
    3. import { hilog } from '@kit.PerformanceAnalysisKit';

    5. const TAG: string = 'dlp';

    7. dlpPermission.getDLPPermissionInfo().then((data:dlpPermission.DLPPermissionInfo)=> {
    8. hilog.info(0x0000, TAG, 'getDLPPermissionInfo, result: ' + JSON.stringify(data));
    9. }).catch((err: BusinessError) => {
    10. hilog.error(0x0000, TAG, 'getDLPPermissionInfo: ' + JSON.stringify(err));
    11. });
    ```

### 其他DLP能力增强

* **判断一个文件是否是DLP文件**

  传入文件的fd查询对应文件是否是DLP文件，是DLP文件则按[文档指导](/consumer/cn/doc/harmonyos-guides/dlp-guidelines#应用内支持打开选定的dlp文件)打开该文件。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { dlpPermission } from '@kit.DataProtectionKit';
  2. import { fileIo } from '@kit.CoreFileKit';
  3. import { BusinessError } from '@kit.BasicServicesKit';
  4. import { hilog } from '@kit.PerformanceAnalysisKit';

  6. const TAG: string = 'dlp';

  8. let uri = "file://docs/storage/Users/currentUser/Desktop/test.txt.dlp";
  9. let file = fileIo.openSync(uri);
  10. try {
  11. let res: boolean = await dlpPermission.isDLPFile(file.fd); // 是否加密DLP文件
  12. hilog.info(0x0000, TAG, 'res' + JSON.stringify(res));
  13. } catch (err) {
  14. hilog.error(0x0000, TAG, 'startDLPManagerForResult error:' + (err as BusinessError).code + (err as BusinessError).message); // 失败报错
  15. }
  16. fileIo.closeSync(file);
  ```
* **判断当前所在应用是否是DLP沙箱分身**

  在应用中调用[isInSandbox](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-dlppermission#dlppermissionisinsandbox)接口判断当前是否是DLP沙箱分身，如果是DLP沙箱分身则可以结合[调用接口查询权限](/consumer/cn/doc/harmonyos-guides/dlp-guidelines#应用根据dlp文件的权限对界面进行适配)的结果进行对应功能按钮的置灰或屏蔽。比如：如果只有只读权限，则编辑保存入口可以置灰，如果是只读或者编辑权限，则修改权限入口可以置灰。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { dlpPermission } from '@kit.DataProtectionKit';
  2. import { BusinessError } from '@kit.BasicServicesKit';
  3. import { hilog } from '@kit.PerformanceAnalysisKit';

  5. const TAG: string = 'dlp';

  7. dlpPermission.isInSandbox().then((data: boolean)=> {
  8. hilog.info(0x0000, TAG, 'isInSandbox, result: ' + JSON.stringify(data));
  9. }).catch((err: BusinessError) => {
  10. hilog.error(0x0000, TAG, 'isInSandbox: ' + JSON.stringify(err));
  11. });
  ```
* **保留沙箱**。

  DLP沙箱分身关闭后会进行沙箱卸载，如果不希望DLP沙箱分身关闭时卸载该沙箱可以在沙箱中调用设置保留沙箱接口，只有当再次调用取消保留沙箱接口并关闭DLP沙箱分身才会触发沙箱的卸载。

  + 调用接口[setRetentionState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-dlppermission#dlppermissionsetretentionstate)设置保留沙箱，传入参数为本沙箱内打开的dlp文件的uri列表，该接口只允许在沙箱中调用。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. import { dlpPermission } from '@kit.DataProtectionKit';
    2. import { BusinessError } from '@kit.BasicServicesKit';
    3. import { hilog } from '@kit.PerformanceAnalysisKit';

    5. const TAG: string = 'dlp';


    8. async function setRetentionSandboxList() {
    9. let docUris: Array<string>=["file://docs/storage/Users/currentUser/Desktop/test.txt.dlp"]
    10. try {
    11. await dlpPermission.setRetentionState(docUris); // 设置沙箱保留
    12. } catch (err) {
    13. hilog.error(0x0000, TAG, 'startDLPManagerForResult error:' + (err as BusinessError).code + (err as BusinessError).message); // 失败报错
    14. }
    15. }
    ```
  + 调用接口[cancelRetentionState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-dlppermission#dlppermissioncancelretentionstate)取消保留沙箱，该接口只允许沙箱中调用。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. import { dlpPermission } from '@kit.DataProtectionKit';
    2. import { BusinessError } from '@kit.BasicServicesKit';
    3. import { hilog } from '@kit.PerformanceAnalysisKit';

    5. const TAG: string = 'dlp';


    8. async function setRetentionSandboxList() {
    9. let docUris: Array<string>=["file://docs/storage/Users/currentUser/Desktop/test.txt.dlp"]
    10. try {
    11. await dlpPermission.cancelRetentionState(docUris); // 取消保留沙箱
    12. } catch (err) {
    13. hilog.error(0x0000, TAG, 'startDLPManagerForResult error:' + (err as BusinessError).code + (err as BusinessError).message); // 失败报错
    14. }
    15. }
    ```
  + 调用接口[getRetentionSandboxList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-dlppermission#dlppermissiongetretentionsandboxlist)获取保留沙箱记录，该接口允许原应用和DLP沙箱分身中调用。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. import { dlpPermission } from '@kit.DataProtectionKit';
    2. import { BusinessError } from '@kit.BasicServicesKit';
    3. import { hilog } from '@kit.PerformanceAnalysisKit';

    5. const TAG: string = 'dlp';

    7. async function getRetentionSandboxList() {
    8. try {
    9. let res:Array<dlpPermission.RetentionSandboxInfo> = await dlpPermission.getRetentionSandboxList(); // 获取保留沙箱记录
    10. hilog.info(0x0000, TAG, 'res' + JSON.stringify(res))
    11. } catch (err) {
    12. hilog.error(0x0000, TAG, 'startDLPManagerForResult error:' + (err as BusinessError).code + (err as BusinessError).message);// 失败报错
    13. }
    14. }
    ```

## 典型问题自排查

### 应用可以打开正常文件，无法打开FUSE文件

* 排查是否对want做了特定限制，导致DLP沙箱分身无法获取到FUSE文件。
* 排查是否以读写权限打开了只读的FUSE文件。