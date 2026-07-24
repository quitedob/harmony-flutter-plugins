## 场景介绍

随着HarmonyOS应用的持续发展，应用的功能将越来越丰富，实际上80%的用户使用时长都会集中在20%的特性上，其余的功能可能也仅仅是面向部分用户。为了避免用户首次下载应用耗时过长，及过多占用用户空间，应用市场服务提供按需分发的能力，支持用户按需动态下载自己所需的增强特性。

## 基本概念

按需分发：一个应用程序被打包成多个安装包，安装包包含了所有的应用程序代码和静态资源。用户从应用市场下载的应用只包含基本功能的安装包，当用户需要使用增强功能时，相应安装包将会从服务器下载到设备上（应用发布请参考[发布HarmonyOS应用](https://developer.huawei.com/consumer/cn/doc/app/agc-help-release-app-0000002271695230)）。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cf/v3/m2y6s3_-QjKFaF_YJUhJHg/zh-cn_image_0000002459017324.png?HW-CC-KV=V1&HW-CC-Date=20260414T025140Z&HW-CC-Expire=86400&HW-CC-Sign=EEC7993CCB6332328CC8C3EBF89EE23A5FA7907D73C4F8167733C03A6B8D1B8A "点击放大")

1. 用户下载A应用的基础包。
2. 用户使用增强功能。
3. 应用通过API下载动态安装包。
4. 动态安装包下载完成。
5. 通过on接口告知用户下载结果。

## 约束与限制

* 应用需要上架应用市场。
* 产品特性按需分发功能支持Phone、Tablet、PC/2in1设备。并且从5.1.1(19)版本开始，新增支持TV设备。
* 产品特性按需分发接入调试功能支持ARM版本、X86版本的模拟器。

## 接口说明

产品特性按需分发场景提供以下ArkTS接口，具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getInstalledModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section9621184365412)(moduleName: string): [InstalledModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section1518175355911) | 查询模块安装信息接口。 |
| [createModuleInstallRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section0529646101115)(context: [common.UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext) | [common.ExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-extensioncontext)): [ModuleInstallRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section5451648162618) | 创建按需加载请求对象。 |
| [addModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section84452138473)(moduleName: string): [ReturnCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section44479181311) | 添加要按需加载的模块名。 |
| [fetchModules](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section1375123411137)(moduleInstallRequest: [ModuleInstallRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section5451648162618)): Promise<[ModuleInstallSessionState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section1535385414136)> | 按需加载请求接口，异步返回结果。 |
| [cancelTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section48442523152)(taskId: string): [ReturnCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section44479181311) | 取消下载任务接口。 |
| [showCellularDataConfirmation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section104451223191616)(context: [common.UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext) | [common.ExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-extensioncontext), taskId: string): [ReturnCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section44479181311) | 流量提醒弹窗接口。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section18484105013164)(type: 'moduleInstallStatus', callback: Callback<[ModuleInstallSessionState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section1535385414136)>, timeout: number): void | 监听当前应用下载任务的进度。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section721141416172)(type: 'moduleInstallStatus', callback?: Callback<[ModuleInstallSessionState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section1535385414136)>): void | 取消监听当前应用下载任务的进度。 |

## 开发步骤

### 获取模块安装信息

1. 导入moduleInstallManager模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. //LoadInstallService.ets
   2. import { moduleInstallManager } from '@kit.AppGalleryKit';
   ```
2. 构造参数。

   入参为需要查询的模块名称。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const moduleName: string = 'AModule';
   ```
3. 调用[getInstalledModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section9621184365412)方法，将步骤2中构造的参数传入模块中的getInstalledModule方法。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const moduleInfo: moduleInstallManager.InstalledModule = moduleInstallManager.getInstalledModule(moduleName);
   ```

### 创建按需加载的请求实例

1. 导入moduleInstallManager模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. //LoadInstallService.ets
   2. import { moduleInstallManager } from '@kit.AppGalleryKit';
   3. import type { common } from '@kit.AbilityKit';
   ```
2. 构造参数。

   入参为当前应用的上下文context，只支持[UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext)和[ExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-extensioncontext)类型的上下文，其中UIAbilityContext类型的上下文是要校验当前应用是否在前台，如果不在前台，则会被拒绝调用。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const context: common.UIAbilityContext | common.ExtensionContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
   ```
3. 调用[createModuleInstallRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section0529646101115)方法，将步骤2中构造的参数依次传入模块中的createModuleInstallRequest方法。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const myModuleInstallProvider: moduleInstallManager.ModuleInstallProvider = new moduleInstallManager.ModuleInstallProvider();
   2. const myModuleInstallRequest: moduleInstallManager.ModuleInstallRequest = myModuleInstallProvider.createModuleInstallRequest(context);
   ```

### 请求按需加载模块

1. 导入moduleInstallManager模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. //LoadInstallService.ets
   2. import type { common } from '@kit.AbilityKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';
   4. import { moduleInstallManager } from '@kit.AppGalleryKit';
   ```
2. 构造参数。

   入参为当前要按需加载的模块名。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const moduleNameA: string = 'AModule';
   2. const moduleNameB: string = 'BModule';
   ```
3. 调用[ModuleInstallRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section5451648162618)中的[addModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section84452138473)方法，将步骤2中构造的参数依次传入模块中的addModule方法。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let myModuleInstallRequest: moduleInstallManager.ModuleInstallRequest;
   2. try {
   3. const myModuleInstallProvider: moduleInstallManager.ModuleInstallProvider = new moduleInstallManager.ModuleInstallProvider();
   4. const context: common.UIAbilityContext | common.ExtensionContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
   5. myModuleInstallRequest = myModuleInstallProvider.createModuleInstallRequest(context);
   6. const aResult: moduleInstallManager.ReturnCode = myModuleInstallRequest.addModule(moduleNameA);
   7. const bResult: moduleInstallManager.ReturnCode = myModuleInstallRequest.addModule(moduleNameB);
   8. hilog.info(0, 'TAG', 'aResult:' + aResult + ' bResult:' + bResult);
   9. } catch (error) {
   10. hilog.error(0, 'TAG', `addModule onError.code is ${error.code}, message is ${error.message}`);
   11. }
   ```
4. 调用[fetchModules](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section1375123411137)方法，将步骤3中的myModuleInstallRequest传入模块中的fetchModules方法。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. moduleInstallManager.fetchModules(myModuleInstallRequest)
   3. .then(() => {
   4. hilog.info(0, 'TAG', 'Succeeded in fetching Modules data.');
   5. })
   6. } catch (error) {
   7. hilog.error(0, 'TAG', `fetching Modules onError.code is ${error.code}, message is ${error.message}`);
   8. }
   ```

### 使用动态模块

假如应用A由entry.hap、AModulelib.hsp两个包组成，其中entry是基础包，AModulelib扩展是功能包（创建方式请参考[应用程序包开发与使用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-package-dev)）。通过应用市场下载安装只会下载安装entry包，在entry包里面可以通过[fetchModules](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section1375123411137)接口动态下载AModulelib包，并使用[动态import](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-dynamic-import)技术调用AModulelib里的方法和组件。

AModulelib中主要实现如下：

* 在动态模块AModulelib的module.json5中设置deliveryWithInstall为false，来标识当前AModulelib在用户主动安装应用A的时候不会一起下载安装。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. {
  2. "module": {
  3. "name": "AModulelib",
  4. "deliveryWithInstall": false
  5. }
  6. }
  ```

* 在动态模块AModulelib中定义add方法和DateComponent组件。其中add方法用于计算加法，DateComponent用于显示文本。

  Calc.ets定义如下：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. export function add(a:number, b:number) {
  2. return a + b;
  3. }
  ```

  DateComponent.ets定义如下：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Component
  2. struct DateComponent {
  3. build() {
  4. Column() {
  5. Text('我是AModulelib中的组件')
  6. .margin(10);
  7. }
  8. .width(300).backgroundColor(Color.Yellow);
  9. }
  10. }

  12. @Builder
  13. export function showDateComponent() {
  14. DateComponent()
  15. }
  ```

* 在AModulelib的AModulelib/Index.ets中导出add方法和showDateComponent方法。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. export { add } from './src/main/ets/utils/Calc';
  2. export { showDateComponent } from './src/main/ets/components/DateComponent';
  ```

entry中主要实现如下：

* 在entry基础模块中，增加动态依赖配置。entry的oh-package.json5中使用dynamicDependencies来动态依赖AModulelib模块。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. {
  2. "dynamicDependencies": {
  3. "AModulelib": "file:../AModulelib"
  4. }
  5. }
  ```
* 在entry中使用动态模块AModulelib模块里面的方法和组件。在调用AModulelib中的功能前需要判断AModulelib是否已经加载，未加载时请参考[请求按需加载的接口](/consumer/cn/doc/harmonyos-guides/store-moduleinstall_arkts#section1256946193314)完成加载。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { moduleInstallManager } from '@kit.AppGalleryKit';
  2. import { hilog } from '@kit.PerformanceAnalysisKit';
  3. import { BusinessError, Callback } from '@kit.BasicServicesKit';
  4. import { common } from '@kit.AbilityKit';

  6. @Entry
  7. @Component
  8. struct Index {
  9. @BuilderParam AModulelibComponent: Function;
  10. @State countTotal: number = 0;
  11. @State isShow: boolean = false;

  13. build() {
  14. Row() {
  15. Column() {
  16. Button(`调用增量模块中的add功能:3+6`)
  17. .onClick(() => {
  18. this.initAModulelib(() => {
  19. import('AModulelib').then((ns: ESObject) => {
  20. this.countTotal = ns.add(3, 6);
  21. }).catch((error: BusinessError) => {
  22. hilog.error(0, 'TAG', `add onError.code is ${error.code}, message is ${error.message}`);
  23. })
  24. })
  25. });
  26. Text('计算结果：' + this.countTotal)
  27. .margin(10);
  28. Button(`调用增量模块中的showDateComponent功能`)
  29. .onClick(() => {
  30. this.initAModulelib(() => {
  31. import('AModulelib').then((ns: ESObject) => {
  32. this.AModulelibComponent = ns.showDateComponent;
  33. this.isShow = true;
  34. }).catch((error: BusinessError) => {
  35. hilog.error(0, 'TAG', `showDateComponent onError.code is ${error.code}, message is ${error.message}`);
  36. })
  37. })
  38. }).margin({
  39. top: 10, bottom: 10
  40. });
  41. if (this.isShow) {
  42. this.AModulelibComponent()
  43. }
  44. }
  45. .width('100%')
  46. }
  47. .height('100%')
  48. }

  50. private showToastInfo(msg: string) {
  51. this.getUIContext().getPromptAction().showToast({
  52. message: msg,
  53. duration: 2000
  54. });
  55. }

  57. /**
  58. * 检查是否已加载AModulelib包
  59. *
  60. * @param successCallBack 回调
  61. */
  62. private initAModulelib(successCallBack: Callback<void>): void {
  63. try {
  64. const result: moduleInstallManager.InstalledModule = moduleInstallManager.getInstalledModule('AModulelib');
  65. if (result?.installStatus === moduleInstallManager.InstallStatus.INSTALLED) {
  66. hilog.info(0, 'TAG', 'AModulelib installed');
  67. successCallBack && successCallBack();
  68. } else {
  69. // AModulelib模块未安装, 需要调用fetchModules下载AModulelib模块。
  70. hilog.info(0, 'TAG', 'AModulelib not installed');
  71. this.fetchModule('AModulelib', successCallBack)
  72. }
  73. } catch (error) {
  74. hilog.error(0, 'TAG', `getInstalledModule onError.code is ${error.code}, message is ${error.message}`);
  75. }
  76. }

  78. /**
  79. * 添加监听事件
  80. *
  81. * @param successCallBack 回调
  82. */
  83. private onListenEvents(successCallBack: Callback<void>): void {
  84. const timeout = 3 * 60; //单位秒， 默认最大监听时间为30min（即30*60秒）
  85. moduleInstallManager.on('moduleInstallStatus', (data: moduleInstallManager.ModuleInstallSessionState) => {
  86. // 返回成功
  87. if (data.taskStatus === moduleInstallManager.TaskStatus.INSTALL_SUCCESSFUL) {
  88. successCallBack && successCallBack();
  89. this.showToastInfo('install success');
  90. }
  91. }, timeout)
  92. }

  94. /**
  95. * 加载指定包
  96. *
  97. * @param moduleName 需要加载的安装包名称
  98. * @param successCallBack 回调
  99. */
  100. private fetchModule(moduleName: string, successCallBack: Callback<void>) {
  101. try {
  102. hilog.info(0, 'TAG', 'handleFetchModules start');
  103. const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
  104. const moduleInstallProvider: moduleInstallManager.ModuleInstallProvider =
  105. new moduleInstallManager.ModuleInstallProvider();
  106. const moduleInstallRequest: moduleInstallManager.ModuleInstallRequest =
  107. moduleInstallProvider.createModuleInstallRequest(context);
  108. if (!moduleInstallRequest) {
  109. hilog.warn(0, 'TAG', 'moduleInstallRequest is empty');
  110. return;
  111. }
  112. moduleInstallRequest.addModule(moduleName);
  113. moduleInstallManager.fetchModules(moduleInstallRequest)
  114. .then((data: moduleInstallManager.ModuleInstallSessionState) => {
  115. hilog.info(0, 'TAG', 'Succeeded in fetching Modules result.');
  116. if (data.code === moduleInstallManager.RequestErrorCode.SUCCESS) {
  117. this.onListenEvents(successCallBack)
  118. } else {
  119. hilog.info(0, 'TAG', 'fetchModules failure');
  120. }
  121. })
  122. .catch((error: BusinessError) => {
  123. hilog.error(0, 'TAG', `fetchModules onError.code is ${error.code}, message is ${error.message}`);
  124. })
  125. } catch (error) {
  126. hilog.error(0, 'TAG', `handleFetchModules onError.code is ${error.code}, message is ${error.message}`);
  127. }
  128. }
  129. }
  ```

运行结果效果图：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d0/v3/v4JvQKvYRzuPI73h8kdSPQ/zh-cn_image_0000002459176892.gif?HW-CC-KV=V1&HW-CC-Date=20260414T025140Z&HW-CC-Expire=86400&HW-CC-Sign=3960FE4FA102DBFC5C5301E47951DFC6B8D539F12246556ACF7B3E853C7BF50D "点击放大")

### 接入调试功能

产品特性按需分发为开发者提供接入调试功能，支持开发者在接入过程中进行调试，应用无需上架应用市场。假如应用A由entry.hap、AModulelib.hsp两个包组成，其中entry是基础包，AModulelib是扩展功能包（创建方式请参考[应用程序包开发与使用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hap-package)）。

1. 使用[调试证书签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing)应用/服务，本地编译构建出entry.hap、AModulelib.hsp，可通过[HDC命令安装](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hdc#hdc命令列表)或DevEco Studio直接安装基础包。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. hdc install entry.hap
   ```
2. 打开[开发者调试模式](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-developer-mode#section530763213432)：进入设置 -> 机型 -> 关于手机，连续点击软件版本7次，弹出“开启“开发者模式””，点击“确认开启”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f5/v3/Xoti6HpNQWGJ9LPhe9zAmw/zh-cn_image_0000002459176896.png?HW-CC-KV=V1&HW-CC-Date=20260414T025140Z&HW-CC-Expire=86400&HW-CC-Sign=459743A61712BCE02A89C6F58585FBECFAE8A5457F208DB4682EFF30E4BA9BAA "点击放大")
3. [访问设备沙箱路径](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-device-file-explorer#section48216711204)，在[应用el2级别加密数据目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory#应用沙箱路径和真实物理路径的对应关系)下，创建cache/moduleinstall/<ModuleName>目录（这里<ModuleName>是AModulelib），将模块调试包AModulelib.hsp上传至对应模块目录下（请确保模块调试包文件应有读写权限）。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/22/v3/9Fbiuez9SQiyHyypy5Hu1Q/zh-cn_image_0000002492136501.png?HW-CC-KV=V1&HW-CC-Date=20260414T025140Z&HW-CC-Expire=86400&HW-CC-Sign=04817F767382A0DB6AD480252008E85440A5F723E6D305B7B72AC6E4F51FE046)
4. 按照[创建按需加载的请求实例](/consumer/cn/doc/harmonyos-guides/store-moduleinstall_arkts#section205574623317)、[请求按需加载的接口](/consumer/cn/doc/harmonyos-guides/store-moduleinstall_arkts#section1256946193314)或[使用动态模块](/consumer/cn/doc/harmonyos-guides/store-moduleinstall_arkts#section112161336173714)，无需改动参数即可安装好模块调试包。监听到安装成功后，对应模块目录下的文件会被自动删除。