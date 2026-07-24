## 软件要求

* 推荐使用Windows 10及以上版本、MacOS 11及以上版本安装应用开发环境DevEco Studio。
* 推荐DevEco Studio版本：DevEco Studio 6.0.0 Release及以上。
* 推荐HarmonyOS SDK版本：HarmonyOS 6.0.0 Release SDK及以上。

## 硬件要求

开发者可根据实际的开发语言，选择对应接口判断当前设备是否支持AR Engine。接口的调用参考如下方式：

ArkTS（[ARViewContext.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section07524457283)）：

收起

自动换行

深色代码主题

复制

```
1. import { arViewController, ARView } from '@kit.AREngine';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. @Component
4. struct ARTest {
5. @State arContext?: arViewController.ARViewContext = undefined;
6. build() {
7. NavDestination() {
8. RelativeContainer() {
9. if (this.arContext) {
10. ARView({ context: this.arContext })
11. }
12. }
13. }
14. .onAppear(() => {
15. this.initARView()
16. })
17. .onWillDisappear(() => {
18. await this.arContext?.destroy();
19. })
20. }

22. private initARView(): void {
23. let context = new arViewController.ARViewContext()
24. context.init().then(() => {
25. this.arContext = context;
26. console.info(`Succeeded in initializing ARView.`);
27. }).catch((err: BusinessError) => {
28. console.error(`Failed to init context. Code is ${err.code}, message is ${err.message}`);
29. });
30. }
31. }
```

C/C++（[HMS\_AREngine\_ARSession\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga47713cb18234569e03b5216b6c8442d3)）：

收起

自动换行

深色代码主题

复制

```
1. #include "ar/ar_engine_core.h"

3. bool isSupportAREngine() {
4. AREngine_ARSession *arSession = nullptr;
5. if(HMS_AREngine_ARSession_Create(nullptr, nullptr, &arSession) == ARENGINE_ERROR_DEVICE_NOT_SUPPORTED){
6. return false;
7. }
8. return true;
9. }
```

若对应接口返回错误码为801或ARENGINE\_ERROR\_DEVICE\_NOT\_SUPPORTED，则表示AR Engine不支持当前设备。

## 环境搭建

请参考[应用开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-dev-overview)完成基本准备工作。

## 申请权限

在开发AR应用时，需要先申请相机相关权限，确保应用拥有访问相机硬件及其他功能的权限，需要的权限如下表。在申请权限前，请保证符合[权限使用的基本原则](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-mgmt-overview#权限使用的基本原则)。

* 使用相机拍摄前，需要申请**ohos.permission.CAMERA**相机权限。
* 当需要使用加速计感知设备运动状态时，需要申请**ohos.permission.ACCELEROMETER**加速计权限。
* 当需要陀螺仪感知设备位姿信息时，需要申请**ohos.permission.GYROSCOPE**陀螺仪权限。

## 前置准备

推荐使用[组件导航(Navigation) (推荐)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-navigation-navigation)作为页面路由，使用[Navigation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation)的[页面生命周期](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-navigation-navigation#页面生命周期)所示方法。

开发者需先创建首页，通过首页选择进入AR Engine场景。

1. 导入所需模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { abilityAccessCtrl, PermissionRequestResult } from '@kit.AbilityKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 创建一个基础的页面，具体可参考[组件导航(Navigation) (推荐)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-navigation-navigation)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Selector {
   4. pageInfo: NavPathStack = new NavPathStack();

   6. build(): void {
   7. Navigation(this.pageInfo) {

   9. }
   10. .mode(NavigationMode.Stack)
   11. .hideTitleBar(true)
   12. .hideBackButton(true)
   13. .hideToolBar(true)
   14. }
   15. }
   ```
3. 创建sampleButton，封装Button及权限校验功能，使用@Builder装饰，并配置routerMap进行页面跳转。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Selector {
   4. pageInfo: NavPathStack = new NavPathStack();
   5. private hasPermission: boolean = false;
   6. @State context: Context = this.getUIContext().getHostContext() as Context;

   8. build(): void {
   9. // ...
   10. }

   12. @Builder
   13. sampleButton(sampleName: string): void {
   14. Button(sampleName, { type: ButtonType.Normal, stateEffect: true })
   15. .borderRadius(8)
   16. .width('50%')
   17. .height('5%')
   18. .onClick(async () => {
   19. if (!this.hasPermission) {
   20. this.hasPermission = await requestPermissionOnSetting(this.context);
   21. if (!this.hasPermission) {
   22. return;
   23. }
   24. }
   25. this.pageInfo.clear();
   26. this.pageInfo.pushDestinationByName(sampleName, null).catch((error: BusinessError) => {
   27. console.error(`[pushDestinationByName]failed. Code: ${error.code}.`);
   28. });
   29. })
   30. }
   31. }
   ```
4. 创建requestPermissionOnSetting方法用于校验在进入AR场景时是否已经获取相机权限。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. struct Selector {
   2. // ...
   3. }

   5. async function requestPermissionOnSetting(context: Context): Promise<boolean> {
   6. let requestResult: boolean = false;
   7. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
   8. await atManager.requestPermissionOnSetting(context, ['ohos.permission.CAMERA'])
   9. .then((data: abilityAccessCtrl.GrantStatus[]) => {
   10. console.info('data:' + JSON.stringify(data));
   11. if (data[0] === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
   12. requestResult = true;
   13. }
   14. })
   15. .catch((err: BusinessError) => {
   16. console.error('data:' + JSON.stringify(err));
   17. })
   18. return requestResult;
   19. }
   ```
5. 在页面上创建按钮，用于进入AR场景。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. build(): void {
   2. Navigation(this.pageInfo) {
   3. Column() {
   4. this.sampleButton('ARWorld'); // 进入ARWorld场景
   5. }
   6. .justifyContent(FlexAlign.SpaceEvenly)
   7. .width('100%')
   8. .height('100%')
   9. }
   10. .mode(NavigationMode.Stack)
   11. .hideTitleBar(true)
   12. .hideBackButton(true)
   13. .hideToolBar(true)
   14. }
   ```
6. 在onAppear中配置应用首次启动时的权限校验方法requestPermissionOnFirstStartup。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. struct Selector {
   2. // ...
   3. build(): void {
   4. Navigation(this.pageInfo) {
   5. Column() {
   6. this.sampleButton('ARWorld');
   7. }
   8. .justifyContent(FlexAlign.SpaceEvenly)
   9. .width('100%')
   10. .height('100%')
   11. }
   12. .onAppear(() => {
   13. this.requestPermissionOnFirstStartup();
   14. })
   15. .mode(NavigationMode.Stack)
   16. .hideTitleBar(true)
   17. .hideBackButton(true)
   18. .hideToolBar(true)
   19. }

   21. @Builder
   22. sampleButton(sampleName: string): void {
   23. // ...
   24. }

   26. private requestPermissionOnFirstStartup(): void {
   27. abilityAccessCtrl.createAtManager()
   28. .requestPermissionsFromUser(this.context, ['ohos.permission.CAMERA'])
   29. .then((data: PermissionRequestResult) => {
   30. let grantStatus: number[] = data.authResults;
   31. if (grantStatus[0] === 0) {
   32. this.hasPermission = true;
   33. console.info('Succeeded in getting requestPermission.');
   34. } else {
   35. this.hasPermission = false;
   36. console.error('Failed to get requestPermission, user rejected.');
   37. }
   38. })
   39. .catch((err: BusinessError) => {
   40. console.error(`Failed to request permissions from user. Code is ${err.code}, message is ${err.message}.`);
   41. })
   42. }
   43. }
   ```