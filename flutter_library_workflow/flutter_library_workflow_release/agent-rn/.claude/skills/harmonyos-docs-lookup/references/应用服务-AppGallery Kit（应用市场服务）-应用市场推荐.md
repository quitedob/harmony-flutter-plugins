## 场景介绍

* 元服务卡片加桌

  您可调用应用市场服务提供的元服务加桌[loadService](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section16879449144620)接口，加载元服务卡片加桌页面，用户点击“添加至桌面”按钮，将元服务卡片添加至桌面。

* 应用详情页展示
  1. 您可调用应用市场服务提供的[loadProduct](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section144826162913)接口，直接加载应用市场的应用详情页面，用户可以在页面内点击“安装”按钮完成应用的下载安装；
  2. 您可使用Deep Linking链接的方式拉起应用市场应用详情页，通过拼接应用市场Deep Linking链接，在应用中调用或网页中点击Deep Linking链接拉起应用详情页，用户可以在页面内点击“安装”按钮完成应用的下载安装；
  3. 您可使用App Linking链接的方式拉起应用市场应用详情页，通过拼接应用市场App Linking链接，在应用中调用或网页中点击App Linking链接拉起应用详情页，用户可以在页面内点击“安装”按钮完成应用的下载安装。

     说明

     应用内打开应用市场App，通过应用市场下载推荐应用，推荐使用loadProduct()方式；Web页面打开应用市场App，推荐使用App Linking。
* 应用内快捷方式加桌
  1. 您可调用应用市场服务提供的[checkPinShortcutPermitted](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section5665513519)接口，查询快捷方式加桌是否允许，允许的话则返回鉴权结果及结果的有效期；
  2. 您调用[checkPinShortcutPermitted](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section5665513519)接口获取到鉴权结果后，并在其有效期内再调用应用市场提供的[requestNewPinShortcut](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section2891132652315)接口，创建快捷方式加桌，展示快捷方式加桌的用户确认弹窗，待用户确认后，可将快捷方式添加至桌面。

     说明

     单个应用最多可添加2个快捷方式。
* 应用写评论页展示
  1. 您可使用Deep Linking链接的方式拉起应用市场写评论页，通过拼接应用市场Deep Linking链接，在应用中调用或网页中点击Deep Linking链接在应用详情页拉起写评论页，用户可以在页面内进行评分与评论；
  2. 您可使用App Linking链接的方式拉起应用市场写评论页，通过拼接应用市场App Linking链接，在应用中调用或网页中点击App Linking链接在应用详情页拉起写评论页，用户可以在页面内进行评分与评论。

|  |  |  |
| --- | --- | --- |
| **图1** 元服务卡片加桌 | **图2** 应用详情页展示 | **图3** 应用内快捷方式加桌 |
| **图4** 通过Deep Linking拉起写评论页 | **图5** 通过App Linking拉起写评论页 |  |
|  |  |  |
|  |  |  |

## 业务流程

### 元服务卡片加桌&应用详情页展示

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7b/v3/MQUSYAGCQkqrrSEOykgNKA/zh-cn_image_0000002459176996.png?HW-CC-KV=V1&HW-CC-Date=20260414T025017Z&HW-CC-Expire=86400&HW-CC-Sign=3F5D5B53F77FD5B860DF6FDD65F77DB9D26756C1D367ACE641E01493A386AD5E "点击放大")

1. 用户使用打开应用详情页功能；
2. 应用调用AppGallery Kit的loadProduct接口；
3. AppGallery Kit API获取应用传入的信息，生成展示页面；
4. 展示生成的页面给用户使用。

### 应用内快捷方式加桌

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/01/v3/afpgFJtCR36aNcujrzwUKA/zh-cn_image_0000002492216581.png?HW-CC-KV=V1&HW-CC-Date=20260414T025017Z&HW-CC-Expire=86400&HW-CC-Sign=37235A280C48CD53F8CB88831D5FEE7F494A5A90841F632DB7C91528EB1861D9 "点击放大")

1. 应用预先调用checkPinShortcutPermitted接口检查是否允许快捷方式加桌；
2. AppGallery Kit获取应用传入的快捷方式信息并生成检查结果；
3. AppGallery Kit返回检查结果和有效时间给应用；
4. 检查通过后应用给用户展示添加快捷方式入口；
5. 用户点击“添加”快捷方式；
6. 调用requestNewPinShortcut接口请求创建快捷方式；
7. AppGallery Kit加载快捷方式信息并弹出用户确认框；
8. 用户确认是否同意加桌；
9. 用户同意后，AppGallery Kit处理加桌请求；
10. AppGallery Kit返回加桌结果给应用。

### 通过Deep Linking拉起写评论页

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2d/v3/rgaiMYUfTQuLshRR9RFvfg/zh-cn_image_0000002459017416.png?HW-CC-KV=V1&HW-CC-Date=20260414T025017Z&HW-CC-Expire=86400&HW-CC-Sign=3C66C217906497E1B48B1BF4761EA2FA612163E45B22FAA03839313C978158CD "点击放大")

1. 用户使用某应用时，存在跳转应用市场内针对该应用进行评分与评论的诉求；
2. 应用通过拼接应用市场Deep Linking链接直接跳转写评论页面；
3. 应用市场解析Deep Linking链接中的参数，展示应用详情页面（全屏）；
4. 拉起写评论页面（半模态或浅层窗口）；
5. 向用户展示写评论页面。

### 通过App Linking拉起写评论页

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/79/v3/FRWSbQh4RoCSkmS5L84HBg/zh-cn_image_0000002492136645.png?HW-CC-KV=V1&HW-CC-Date=20260414T025017Z&HW-CC-Expire=86400&HW-CC-Sign=8FE01345023FFCAAD0ECCEDA496194D89FFA765DCAA06D25BA20406F78A53E7F "点击放大")

1. 用户使用某应用时，存在跳转应用市场内针对该应用进行评分与评论的诉求；
2. 应用通过拼接应用市场App Linking链接直接跳转写评论页面；
3. 应用市场解析App Linking链接中的参数，展示应用详情页面（全屏）；
4. 拉起写评论页面（半模态或浅层窗口）；
5. 向用户展示写评论页面。

## 约束与限制

* 应用市场推荐服务不支持模拟器，请使用真机调试。在模拟器中使用该服务将会提示：无法获取内容，请点击屏幕重试。
* 应用市场推荐服务支持Phone、Tablet、PC/2in1设备。并且从6.0.2(22)版本开始，新增支持TV设备。

## 接口说明

应用市场推荐场景提供loadService，loadProduct、checkPinShortcutPermitted、requestNewPinShortcut四个接口，具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager)。

展开

| 接口名 | 描述 |
| --- | --- |
| [loadService](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section16879449144620)(context: [common.UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext), want: [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want), callback?: [ServiceViewCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section428319231351)): void | 加载元服务加桌页面接口。 |
| [loadProduct](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section144826162913)(context: [common.UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext), want: [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want), callback?: [ProductViewCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section1744815172418)): void | 加载应用详情页面接口。 |
| [checkPinShortcutPermitted](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section5665513519)(context: [common.UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext), shortcutId: string, want: [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want), labelResName: string, iconResName: string): Promise<[CheckShortcutResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section1548317391199)> | 以静态资源方式校验桌面快捷方式。 |
| [checkPinShortcutPermitted](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section41029172212)(context: [common.UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext), shortcutId: string, want: [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want), label: string, foregroundIcon: string, backgroundIcon: string): Promise<[CheckShortcutResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section1548317391199)> | 以自定义资源方式校验桌面快捷方式。 |
| [requestNewPinShortcut](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section2891132652315)(context: [common.UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext), tid: string): Promise<void> | 创建桌面快捷方式。 |

## 开发步骤

### 元服务卡片加桌

1. 导入productViewManager模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { productViewManager } from '@kit.AppGalleryKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import type { common, Want } from '@kit.AbilityKit';
   4. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 构造元服务卡片参数。
   * 第一个参数是获取当前Page页面的[UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext)。
   * 第二个参数是构造一个[Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want)类型的对象，在属性中传入要加载的[元服务的加桌链接](https://developer.huawei.com/consumer/cn/doc/atomic-guides/atomic-applinking)。
   * 第三个参数是可选参数对象，可以传入四个属性，[onError](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section428319231351)：回调函数，回调返回的信息为元服务卡片加桌页加载失败的错误信息。[onReceive](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section428319231351)：回调函数，接收元服务卡片加桌结果信息。[onAppear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section428319231351)：回调函数，当元服务卡片加桌页成功打开时回调。[onDisappear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section428319231351)：回调函数，当元服务卡片加桌页关闭时回调。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. @Entry
     2. @Component
     3. struct LoadServiceView {
     4. @State message: string = '拉起应用市场详情页';

     6. build() {
     7. Row() {
     8. Column() {
     9. Button(this.message)
     10. .fontSize(24)
     11. .fontWeight(FontWeight.Bold)
     12. .onClick(() => {
     13. const uiContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
     14. const wantParam: Want = {
     15. // 此处填入要加载的元服务的加桌链接
     16. uri: 'xxx'
     17. }
     18. const callback: productViewManager.ServiceViewCallback = {
     19. onReceive: (data: productViewManager.ServiceViewReceiveData) => {
     20. hilog.info(0x0001, 'TAG', `loadService onReceive.result is ${data.result}, msg is ${data.msg}, formInfo is ${JSON.stringify(data.formInfo)}`);
     21. },
     22. onError: (error: BusinessError) => {
     23. hilog.error(0, 'TAG', `loadService onError.code is ${error.code}, message is ${error.message}`)
     24. },
     25. onAppear: () => {
     26. hilog.info(0, 'TAG', `loadService onAppear.`);
     27. },
     28. onDisappear: () => {
     29. hilog.info(0, 'TAG', `loadService onDisappear.`);
     30. }
     31. }
     32. })
     33. }
     34. .width('100%')
     35. }
     36. .height('100%')
     37. }
     38. }
     ```
3. 调用[productViewManager.loadService](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section16879449144620)方法，将步骤2中构造的参数依次传入接口中。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 调用接口，加载元服务加桌页面
   2. productViewManager.loadService(uiContext, wantParam, callback);
   ```

### 应用详情页展示

* **方式一：loadProduct接口调用**

1. 导入productViewManager模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { productViewManager } from '@kit.AppGalleryKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import type { common, Want } from '@kit.AbilityKit';
   4. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 构造应用详情页参数。
   * 第一个参数是获取当前Page页面的[UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext)。
   * 第二个参数是构造一个[Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want)类型的对象，可以传入两个属性，bundleName：需要加载的应用包名。skExposure：[SKExposure](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section1346915243448)类型，向应用归因服务传递登记归因来源信息。
   * 第三个参数是可选参数对象，可以传入三个属性，[onError](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section1744815172418)：回调函数，回调返回的信息为应用详情页加载失败时的错误信息。[onAppear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section1744815172418)：回调函数，当应用详情页成功打开时回调。[onDisappear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section1744815172418)：回调函数，当应用详情页关闭时回调。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. @Entry
     2. @Component
     3. struct LoadProductView {
     4. @State message: string = '拉起应用市场详情页';

     6. build() {
     7. Row() {
     8. Column() {
     9. Button(this.message)
     10. .fontSize(24)
     11. .fontWeight(FontWeight.Bold)
     12. .onClick(() => {
     13. const exposureData: productViewManager.SKExposure = {
     14. adTechId: '20****e8',
     15. campaignId: '123456',
     16. destinationId: '10******',
     17. mmpIds: ['2f****5', '2f7***5'],
     18. serviceTag: '123***2',
     19. nonce: '123***2',
     20. timestamp: 1705536488,
     21. signature: 'MEQCIEQlmZ****zKBSE8QnhLTIHZZZ****ZpRqRxHss65Ko****JgJKjdrWdkL****juEx2RmFS7da****ZRVZ8RyMyUXg=='
     22. };
     23. const uiContext = this.getUIContext().getHostContext() as common.UIAbilityContext
     24. const wantParam: Want = {
     25. parameters: {
     26. // 必填，此处填入要加载的应用包名，例如： bundleName: 'com.huawei.hmsapp.books'
     27. bundleName: 'com.xxx',
     28. // 可选，向应用归因服务传递登记归因来源数据
     29. skExposure: exposureData
     30. }
     31. }
     32. const callback: productViewManager.ProductViewCallback = {
     33. onError: (error: BusinessError) => {
     34. hilog.error(0, 'TAG',
     35. `loadProduct onError.code is ${error.code}, message is ${error.message}`)
     36. },
     37. onAppear: () => {
     38. hilog.info(0, 'TAG', `loadProduct onAppear.`);
     39. },
     40. onDisappear: () => {
     41. hilog.info(0, 'TAG', `loadProduct onDisappear.`);
     42. }
     43. }
     44. })
     45. .width('100%')
     46. }
     47. .height('100%')
     48. }
     49. }
     50. }
     ```
3. 调用[loadProduct](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section144826162913)方法，将步骤2中构造的参数依次传入接口中。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 调用接口，拉起应用详情页
   2. productViewManager.loadProduct(uiContext, wantParam, callback);
   ```

* **方式二：Deep Linking方式**

  构造拼接bundleName的Deep Linking链接，其中bundleName为需要打开的应用包名，其格式为：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. store://appgallery.huawei.com/app/detail?id= + bundleName
  ```

  在应用中调用[startAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#startability-2)方法，拉起应用市场应用详情页：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { BusinessError } from '@kit.BasicServicesKit';
  2. import { hilog } from '@kit.PerformanceAnalysisKit';
  3. import type { common, Want } from '@kit.AbilityKit';

  5. // 拉起应用市场对应的应用详情页面
  6. function startAppGalleryDetailAbility(context: common.UIAbilityContext, bundleName: string): void {
  7. let want: Want = {
  8. action: 'ohos.want.action.appdetail', //隐式指定action为ohos.want.action.appdetail
  9. uri: 'store://appgallery.huawei.com/app/detail?id=' + bundleName, //  bundleName为需要打开应用详情的应用包名
  10. };
  11. context.startAbility(want).then(() => {
  12. hilog.info(0x0001, 'TAG', "Succeeded in starting Ability successfully.")
  13. }).catch((error: BusinessError) => {
  14. hilog.error(0x0001, 'TAG', `Failed to startAbility.Code: ${error.code}, message is ${error.message}`);
  15. });
  16. }

  18. @Entry
  19. @Component
  20. struct StartAppGalleryDetailAbilityView {
  21. @State message: string = '拉起应用市场详情页';

  23. build() {
  24. Row() {
  25. Column() {
  26. Button(this.message)
  27. .fontSize(24)
  28. .fontWeight(FontWeight.Bold)
  29. .onClick(() => {
  30. const context: common.UIAbilityContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
  31. // 按实际需求获取应用的bundleName，例如bundleName: 'com.huawei.hmsapp.books'
  32. const bundleName = 'xxxx';
  33. startAppGalleryDetailAbility(context, bundleName);
  34. })
  35. }
  36. .width('100%')
  37. }
  38. .height('100%')
  39. }
  40. }
  ```

  在网页中打开Deep Linking链接拉起应用市场应用详情页：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. <html lang="en">
  2. <head>
  3. <meta charset="UTF-8">
  4. </head>
  5. <body>
  6. <div>
  7. <button type="button" onclick="openDeepLink()">拉起应用详情页</button>
  8. </div>
  9. </body>
  10. </html>
  11. <script>
  12. function openDeepLink() {
  13. window.open('store://appgallery.huawei.com/app/detail?id=com.xxxx.xxxx')
  14. }
  15. </script>
  ```

* **方式三：App Linking方式**

  构造拼接bundleName的App Linking链接，其中bundleName为需要打开的应用包名，其格式为：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. https://appgallery.huawei.com/app/detail?id= + bundleName
  ```

  在应用中调用[openLink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#openlink12)接口拉起App Linking链接：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { BusinessError } from '@kit.BasicServicesKit';
  2. import { hilog } from '@kit.PerformanceAnalysisKit';
  3. import type { common } from '@kit.AbilityKit';

  5. @Entry
  6. @Component
  7. struct Index {
  8. build() {
  9. Button('start app linking', { type: ButtonType.Capsule, stateEffect: true })
  10. .width('87%')
  11. .height('5%')
  12. .margin({ bottom: '12vp' })
  13. .onClick(() => {
  14. let context: common.UIAbilityContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
  15. // 需要拼接不同的应用包名，用以打开不同的应用详情页,例如：bundleName: 'com.huawei.hmsapp.books'
  16. let bundleName: string = 'xxxx';
  17. let link: string = 'https://appgallery.huawei.com/app/detail?id=' + bundleName;
  18. // 以App Linking优先的方式在应用市场打开指定包名的应用详情页
  19. context.openLink(link, { appLinkingOnly: false })
  20. .then(() => {
  21. hilog.info(0x0001, 'TAG', 'openlink success.');
  22. })
  23. .catch((error: BusinessError) => {
  24. hilog.error(0x0001, 'TAG', `openlink failed. Code: ${error.code}, message is ${error.message}`);
  25. });
  26. })
  27. }
  28. }
  ```

  在网页中打开App Linking链接：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. <html lang="en">
  2. <head>
  3. <meta charset="UTF-8">
  4. <title>跳转示例</title>
  5. </head>
  6. <body>
  7. <a href='https://appgallery.huawei.com/app/detail?id=bundleName'>AppLinking跳转示例</a>
  8. </body>
  9. </html>
  ```

### 应用内快捷方式加桌

* **方式一：以静态资源方式创建桌面快捷方式**

1. 导入productViewManager模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { productViewManager } from '@kit.AppGalleryKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import type { common, Want } from '@kit.AbilityKit';
   4. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 构造调用[checkPinShortcutPermitted](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section5665513519)接口校验桌面快捷方式的参数。
   * 第一个参数是获取当前Page页面的[UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext)。
   * 第二个参数是应用构造的快捷方式ID，取值为长度不超过63字节的字符串。
   * 第三个参数是构造一个[Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want)类型的对象，在该参数中传入用户点击快捷方式后被拉起的目标应用的bundleName、moduleName、abilityName等。
   * 第四个参数是快捷方式显示在桌面上的名称的label资源索引名称。
   * 第五个参数是快捷方式显示在桌面上的图标的icon文件资源索引名称。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const uiContext =this.getUIContext().getHostContext() as common.UIAbilityContext;
   2. const shortcutId = "id_test1"; // 对应shortcuts标签中配置的shortcutId, 例如: "shortcutId": "id_test1"
   3. const labelResName = "shortcut"; // 对应shortcuts标签中配置的label资源索引名称, 例如: "label": "$string:shortcut"
   4. const iconResName = "aa_icon"; // 对应shortcuts标签中配置的icon资源索引名称, 例如: "icon": "$media:aa_icon"
   5. const want: Want = {            // 对应shortcuts标签中配置的want
   6. bundleName: "com.example.appgallery.kit.demo",
   7. moduleName: "entry",
   8. abilityName: "EntryAbility",
   9. parameters: {
   10. testKey: "testValue"
   11. }
   12. };
   ```

   说明

   需提前[创建应用静态快捷方式](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/typical-scenario-configuration)，且第二、三、四、五个参数需要与[shortcuts标签](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file#shortcuts标签)中的配置保持一致。

   若校验参数发生变化，则每次覆盖生成新的tid，否则返回历史tid以及剩余过期时间expired。
3. 调用[checkPinShortcutPermitted](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section5665513519)接口，将步骤2中的参数依次传入接口中，并保存异步返回的结果[CheckShortcutResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section1548317391199)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. let checkShortcutResult: productViewManager.CheckShortcutResult;
   3. productViewManager.checkPinShortcutPermitted(uiContext, shortcutId, want, labelResName, iconResName)
   4. .then((result: productViewManager.CheckShortcutResult) => {
   5. hilog.info(0x0001, 'TAG', `checkPinShortcutPermitted success result is ${JSON.stringify(result)}`);
   6. checkShortcutResult = result;
   7. }).catch((error: BusinessError) => {
   8. hilog.error(0x0001, 'TAG',
   9. `checkPinShortcutPermitted error. code is ${error.code}, message is ${error.message}`);
   10. })
   11. } catch (err) {
   12. hilog.error(0x0001, 'TAG', `checkPinShortcutPermitted failed, code is ${err.code}, message is ${err.message}`);
   13. }
   ```
4. 构造调用[requestNewPinShortcut](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section2891132652315)接口创建桌面快捷方式的参数。
   * 第一个参数是获取当前Page页面的[UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext)。
   * 第二个参数是步骤3中调用接口返回得到的[CheckShortcutResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section1548317391199)的属性tid的值。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const uiContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
   2. const tid = checkShortcutResult.tid;
   ```
5. 调用[requestNewPinShortcut](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section2891132652315)接口，将步骤4中的参数依次传入接口中。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. productViewManager.requestNewPinShortcut(uiContext, tid)
   3. .then(() => {
   4. hilog.info(0x0001, 'TAG', `requestNewPinShortcut success.`);
   5. }).catch((error: BusinessError) => {
   6. hilog.error(0x0001, 'TAG', `requestNewPinShortcut error. code is ${error.code}, message is ${error.message}`);
   7. })
   8. } catch (err) {
   9. hilog.error(0x0001, 'TAG', `requestNewPinShortcut failed, code is ${err.code}, message is ${err.message}`);
   10. }
   ```

   说明

   快捷方式加桌成功后，原校验结果tid会失效，再次加桌需重新校验生成新的tid。

   为了提升用户体验，推荐预先调用[checkPinShortcutPermitted](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section5665513519)接口，当用户点击加桌后，再调用[requestNewPinShortcut](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section2891132652315)接口执行加桌请求。

   不建议在用户点击加桌后再连续调用这两个接口执行加桌。

* **方式二：以自定义资源方式创建桌面快捷方式**

1. 导入productViewManager模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { productViewManager } from '@kit.AppGalleryKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import type { common, Want } from '@kit.AbilityKit';
   4. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 构造调用[checkPinShortcutPermitted](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section5665513519)接口构造校验桌面快捷方式的参数。
   * 第一个参数是获取当前Page页面的[UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext)。
   * 第二个参数是应用构造的快捷方式ID，取值为长度不超过63字节的字符串。
   * 第三个参数是构造一个[Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want)类型的对象，在该参数中传入用户点击快捷方式后被拉起的目标应用的bundleName、moduleName、abilityName等。
   * 第四个参数是快捷方式显示在桌面名称的文本内容。
   * 第五个参数是快捷方式显示在桌面图标的应用沙箱地址，图标最大不超过100KB，格式为png和webp。
   * 第六个参数预留，暂不支持，传入空字符串。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const uiContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
   2. const shortcutId = `${Date.now()}`;
   3. const want: Want = {
   4. bundleName: "com.example.appgallery.kit.demo",
   5. moduleName: "entry",
   6. abilityName: "EntryAbility",
   7. parameters: {
   8. testKey: "testValue"
   9. }
   10. }
   11. const label = "shortcut";
   12. const foregroundIcon = uiContext.filesDir + "/icon.png";
   13. const backgroundIcon = "";
   ```

   说明

   当前不支持背景层图标，第六个参数backgroundIcon传空字符串。

   若校验参数发生变化，则每次覆盖生成新的tid，否则返回历史tid以及剩余过期时间expired。
3. 调用[checkPinShortcutPermitted](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section41029172212)接口，将步骤2中的参数依次传入接口中，并保存异步返回的结果[CheckShortcutResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section1548317391199)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. let checkShortcutResult: productViewManager.CheckShortcutResult;
   3. productViewManager.checkPinShortcutPermitted(uiContext, shortcutId, want, label, foregroundIcon, backgroundIcon)
   4. .then((result: productViewManager.CheckShortcutResult) => {
   5. hilog.info(0x0001, 'TAG', `checkPinShortcutPermitted success result is ${JSON.stringify(result)}`)
   6. checkShortcutResult = result;
   7. }).catch((error: BusinessError) => {
   8. hilog.error(0x0001, 'TAG',
   9. `checkPinShortcutPermitted error. code is ${error.code}, message is ${error.message}`);
   10. })
   11. } catch (err) {
   12. hilog.error(0x0001, 'TAG', `checkPinShortcutPermitted failed, code is ${err.code}, message is ${err.message}`);
   13. }
   ```
4. 构造调用[requestNewPinShortcut](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section2891132652315)接口创建桌面快捷方式的参数。
   * 第一个参数是获取当前Page页面的[UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext)。
   * 第二个参数是步骤3中调用接口返回得到的[CheckShortcutResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section1548317391199)的属性tid的值。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const uiContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
   2. const tid = checkShortcutResult.tid;
   ```
5. 调用[requestNewPinShortcut](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section2891132652315)接口，将步骤4中的参数依次传入接口中。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. productViewManager.requestNewPinShortcut(uiContext, tid)
   3. .then(() => {
   4. hilog.info(0x0001, 'TAG', `requestNewPinShortcut success.`);
   5. }).catch((error: BusinessError) => {
   6. hilog.error(0x0001, 'TAG', `requestNewPinShortcut error. code is ${error.code}, message is ${error.message}`);
   7. })
   8. } catch (err) {
   9. hilog.error(0x0001, 'TAG', `requestNewPinShortcut failed, code is ${err.code}, message is ${err.message}`);
   10. }
   ```

   说明

   快捷方式加桌成功后，原校验结果tid会失效，再次加桌需重新校验生成新的tid。

   为了提升用户体验，推荐预先调用[checkPinShortcutPermitted](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section5665513519)接口，当用户点击加桌后，再调用[requestNewPinShortcut](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-productviewmanager#section2891132652315)接口执行加桌请求。

   不建议在用户点击加桌后再连续调用这两个接口执行加桌。

### 通过Deep Linking拉起写评论页

构造拼接bundleName和action的Deep Linking链接，其中bundleName为需要拉起写评论页的应用包名，action隐式指定为write-review，表示进入详情页后，下一步将拉起写评论页，其格式为：

收起

自动换行

深色代码主题

复制

```
1. store://appgallery.huawei.com/app/detail?id= + bundleName + &action=write-review
```

在应用中调用[startAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#startability-2)方法，拉起应用市场应用的写评论页：

收起

自动换行

深色代码主题

复制

```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import type { common, Want } from '@kit.AbilityKit';

5. // 通过Deep Linking拉起应用市场指定的应用写评论页
6. function startAppGalleryDetailAbility(context: common.UIAbilityContext, bundleName: string): void {
7. let want: Want = {
8. action: 'ohos.want.action.appdetail', // 隐式指定action为ohos.want.action.appdetail
9. uri: 'store://appgallery.huawei.com/app/detail?id=' + bundleName + '&action=write-review'// bundleName为需要拉起写评论页的应用包名，action隐式指定为write-review，表示进入详情页后，下一步将拉起写评论页。
10. };
11. context.startAbility(want).then(() => {
12. hilog.info(0x0001, 'TAG', "Succeeded in starting Ability successfully.")
13. }).catch((error: BusinessError) => {
14. hilog.error(0x0001, 'TAG', `Failed to startAbility. Code: ${error.code}, message is ${error.message}`);
15. });
16. }

18. @Entry
19. @Component
20. struct StartAppGalleryDetailAbilityView {
21. @State message: string = '通过Deep Linking拉起应用市场写评论页'

23. build() {
24. Row() {
25. Column() {
26. Button(this.message)
27. .fontSize(24)
28. .fontWeight(FontWeight.Bold)
29. .onClick(() => {
30. const context: common.UIAbilityContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
31. // 按实际需求获取应用的bundleName，例如bundleName: 'com.huawei.hmsapp.books'
32. const bundleName = 'xxxx';
33. startAppGalleryDetailAbility(context, bundleName);
34. })
35. }
36. .width('100%')
37. }
38. .height('100%')
39. }
40. }
```

在网页中打开Deep Linking链接拉起应用市场应用的写评论页：

收起

自动换行

深色代码主题

复制

```
1. <html lang="en">
2. <head>
3. <meta charset="UTF-8">
4. </head>
5. <body>
6. <div>
7. <button type="button" onclick="openDeepLink()">通过Deep Linking拉起应用市场写评论页</button>
8. </div>
9. </body>
10. </html>
11. <script>
12. function openDeepLink() {
13. window.open('store://appgallery.huawei.com/app/detail?id=com.xxxx.xxxx&action=write-review')
14. }
15. </script>
```

### 通过App Linking拉起写评论页

构造拼接bundleName的App Linking链接，其中bundleName为需要拉起写评论页的应用包名，action隐式指定为write-review，表示进入详情页后，下一步将拉起写评论页，其格式为：

收起

自动换行

深色代码主题

复制

```
1. https://appgallery.huawei.com/app/detail?id= + bundleName + &action=write-review
```

在应用中调用[openLink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#openlink12)接口拉起App Linking链接：

收起

自动换行

深色代码主题

复制

```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import type { common } from '@kit.AbilityKit';

5. @Entry
6. @Component
7. struct Index {
8. build() {
9. Button('start app linking', { type: ButtonType.Capsule, stateEffect: true })
10. .width('87%')
11. .height('5%')
12. .margin({ bottom: '12vp' })
13. .onClick(() => {
14. let context: common.UIAbilityContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
15. // 需要拼接不同的应用包名，用以打开不同的应用写评论页,例如：bundleName: 'com.huawei.hmsapp.books'
16. let bundleName: string = 'xxxx';
17. let link: string = 'https://appgallery.huawei.com/app/detail?id=' + bundleName + '&action=write-review';
18. // 以App Linking优先的方式在应用市场打开指定包名的应用写评论页
19. context.openLink(link, { appLinkingOnly: false })
20. .then(() => {
21. hilog.info(0x0001, 'TAG', 'openlink success.');
22. })
23. .catch((error: BusinessError) => {
24. hilog.error(0x0001, 'TAG', `openlink failed. Code: ${error.code}, message is ${error.message}`);
25. });
26. })
27. }
28. }
```

在网页中打开App Linking链接：

收起

自动换行

深色代码主题

复制

```
1. <html lang="en">
2. <head>
3. <meta charset="UTF-8">
4. <title>跳转示例</title>
5. </head>
6. <body>
7. <a href='https://appgallery.huawei.com/app/detail?id=bundleName&action=write-review'>通过AppLinking拉起应用市场写评论页</a>
8. </body>
9. </html>
```