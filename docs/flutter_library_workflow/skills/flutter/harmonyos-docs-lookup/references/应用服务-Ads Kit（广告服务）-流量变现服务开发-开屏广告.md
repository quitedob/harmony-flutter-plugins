## 场景介绍

开屏广告是一种在应用启动时且在应用主界面显示之前需要被展示的广告。您需要预先为App设计一张开屏默认的Slogan图片，确保在未获取到开屏广告之前展示默认的Slogan，提供良好的用户体验。

开屏广告分为全屏开屏广告、半屏开屏广告，其中全屏开屏广告展示形式为广告铺满整个页面；半屏开屏广告展示形式会根据媒体页面自定义布局渲染广告、icon和版权信息，一般情况下建议将icon和版权信息展示在广告下方。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dc/v3/wb-Zq36dSOudhIiv53AilA/zh-cn_image_0000002305180792.png?HW-CC-KV=V1&HW-CC-Date=20260414T025018Z&HW-CC-Expire=86400&HW-CC-Sign=C8D5B3FDC2CA9EEB41DDEA0F4FB75DC2F0A5FB3D12D69D7CBFAF4A58FBF4BA1A)

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [loadAd](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-advertising#loadad)(adParam: AdRequestParams, adOptions: AdOptions, listener: AdLoadListener): void | 请求单广告位广告，通过AdRequestParams、AdOptions进行广告请求参数设置，通过AdLoadListener监听广告请求回调。 |
| [AdComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-adcomponent)({ads: advertising.Advertisement[], displayOptions: advertising.AdDisplayOptions, interactionListener: advertising.AdInteractionListener, @BuilderParam adRenderer?: () => void, @Prop rollPlayState?: number}) | 展示广告，通过AdDisplayOptions进行广告展示参数设置，通过AdInteractionListener监听广告状态回调。  **说明：**为了保证广告能正确展示，该接口必须和请求广告接口配套使用。 |

## 开发步骤

### 请求广告

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { abilityAccessCtrl, common, PermissionRequestResult } from '@kit.AbilityKit';
   2. import { advertising, identifier } from '@kit.AdsKit';
   3. import { router, window } from '@kit.ArkUI';
   4. import { BusinessError } from '@kit.BasicServicesKit';
   5. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 获取OAID。

   若需提升广告推送精准度，可以在请求参数[AdRequestParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-advertising#adrequestparams)中添加oaid属性。

   如何获取OAID参见[获取OAID信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/oaid-service)。

   说明

   使用以下示例中提供的测试广告位时，必须先获取OAID信息。
3. 请求单广告位广告。

   需要创建一个AdLoader对象，通过AdLoader的[loadAd](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-advertising#loadad)方法请求广告，最后通过[AdLoadListener](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-advertising#adloadlistener)来监听广告的加载状态。测试开屏广告时，需要使用专门的测试广告位来获取测试开屏广告，示例代码中提供了两种开屏广告类型对应的广告位：半屏开屏（图片）（testq6zq98hecj）和全屏开屏（视频）（testd7c5cewoj6），测试广告位ID仅作为调试使用，不可用于广告变现。

   请求广告关键参数如下所示：

   展开

   | 请求广告参数名 | 类型 | 必填 | 说明 |
   | --- | --- | --- | --- |
   | adType | number | 是 | 请求广告类型，开屏广告类型为1。 |
   | adId | string | 是 | 广告位ID。  * 如果仅调测广告，可使用测试广告位ID：testq6zq98hecj半屏开屏（图片）和testd7c5cewoj6全屏开屏（视频）。 * 如果要接入正式广告，则需要申请正式的广告位ID。可在应用发布前进入[流量变现官网](https://developer.huawei.com/consumer/cn/monetize)，点击“开始变现”，登录[鲸鸿动能媒体服务平台](https://developer.huawei.com/consumer/cn/service/ads/publisher/html/index.html?lang=zh)进行申请，具体操作详情请参见[展示位创建](https://developer.huawei.com/consumer/cn/doc/monetize/zhanshiweichuangjian-0000001132700049)。 |
   | adCount | number | 否 | 广告数量。 |
   | orientation | number | 否 | 媒体请求广告的屏幕方向。1表示竖屏，0表示横屏，不设置则默认为1。当前未上架横屏开屏素材，若设置请求屏幕方向为横屏则不展示开屏广告。如果媒体设置应用固定横屏展示，但该参数未设置或者设置为1，则展示效果会受影响。 |

   展开

   | 返回广告参数名 | 类型 | 说明 |
   | --- | --- | --- |
   | isFullScreen | boolean | 标识返回的广告是否为全屏，true为全屏广告，false为半屏广告。 |

   说明

   1、如果超时没有请求到广告，应用自行跳转到默认首页。

   2、为保证开屏展示效果，建议开发者在请求广告前，设置屏幕方向为竖屏。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. @State ad: advertising.Advertisement | undefined = undefined;
   5. // ...
   6. private context: common.UIAbilityContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
   7. // 是否超时
   8. private isTimeOut: boolean = false;
   9. // 超时时间(单位毫秒)，开发者可根据实际情况修改
   10. private timeOutDuration: number = 1000;
   11. // 超时index
   12. private timeOutIndex: number = -1;

   14. aboutToAppear(): void {
   15. // 开启全屏模式沉浸页面
   16. this.setWindowLayoutFullScreen(true);
   17. // 设置屏幕方向为竖屏
   18. void this.setWindowPreferredOrientation(window.Orientation.PORTRAIT).catch((error: BusinessError) => {
   19. hilog.info(0x0000, 'testTag',
   20. `Failed to setWindowPreferredOrientation. Code is ${error.code}, message is ${error.message}`);
   21. });
   22. // 调用loadAd加载广告
   23. // ...
   24. }

   26. aboutToDisappear(): void {
   27. // 关闭全屏模式，开发者可根据实际情况修改
   28. this.setWindowLayoutFullScreen(false);
   29. // 设置屏幕方向为默认值，开发者可根据实际情况修改
   30. void this.setWindowPreferredOrientation(window.Orientation.UNSPECIFIED).catch((error: BusinessError) => {
   31. hilog.error(0x0000, 'testTag',
   32. `Failed to setWindowPreferredOrientation. Code is ${error.code}, message is ${error.message}`);
   33. });
   34. }

   36. private async setWindowLayoutFullScreen(isLayoutFullScreen: boolean): Promise<void> {
   37. try {
   38. const win: window.Window = await window.getLastWindow(this.context);
   39. await win.setWindowLayoutFullScreen(isLayoutFullScreen);
   40. } catch (e) {
   41. hilog.error(0x0000, 'testTag', `Failed to set window layout. Code is ${e.code}, message is ${e.message}`);
   42. }
   43. }

   45. private async setWindowPreferredOrientation(orientation: Orientation): Promise<void> {
   46. try {
   47. const win: window.Window = await window.getLastWindow(this.context);
   48. await win.setPreferredOrientation(orientation);
   49. } catch (e) {
   50. hilog.error(0x0000, 'testTag', `Failed to set preferred orientation. Code is ${e.code}, message is ${e.message}`);
   51. }
   52. }

   54. build() {
   55. // ...
   56. }

   58. // ...
   59. private async loadAd(adId: string): Promise<void> {
   60. // 广告请求参数
   61. const adRequestParams: advertising.AdRequestParams = {
   62. // 广告位ID
   63. adId: adId,
   64. // 开屏广告类型
   65. adType: 1,
   66. // 请求的广告数量
   67. adCount: 1,
   68. // 开放匿名设备标识符
   69. oaid: await requestOAID(this.context)
   70. };
   71. // 广告请求回调监听
   72. const adLoadListener: advertising.AdLoadListener = {
   73. onAdLoadFailure: (errorCode: number, errorMsg: string) => {
   74. hilog.error(0x0000, 'testTag', `Failed to load ad. Code is ${errorCode}, message is ${errorMsg}`);
   75. },
   76. onAdLoadSuccess: (ads: Array<advertising.Advertisement>) => {
   77. clearTimeout(this.timeOutIndex);
   78. if (this.isTimeOut) {
   79. return;
   80. }
   81. hilog.info(0x0000, 'testTag', 'Succeeded in loading ad');
   82. this.ad = ads[0];
   83. }
   84. };
   85. // 广告配置参数，开发者可根据项目实际情况设置
   86. const adOptions: advertising.AdOptions = {};
   87. // 创建AdLoader广告对象
   88. const adLoader: advertising.AdLoader = new advertising.AdLoader(this.context);
   89. // 启动超时定时器
   90. this.timeOutHandler();
   91. try {
   92. // 调用广告请求接口
   93. adLoader.loadAd(adRequestParams, adOptions, adLoadListener);
   94. } catch (e) {
   95. hilog.error(0x0000, 'testTag', `Failed to load ad. Code is ${e.code}, message is ${e.message}`);
   96. }
   97. }

   99. private timeOutHandler(): void {
   100. this.isTimeOut = false;
   101. // 超时处理
   102. this.timeOutIndex = setTimeout(() => {
   103. this.isTimeOut = true;
   104. this.routeToHome();
   105. hilog.error(0x0000, 'testTag', 'Load ad time out');
   106. }, this.timeOutDuration);
   107. }

   109. private routeToHome(): void {
   110. // 开发者可根据项目实际情况修改超时之后要跳转的目标页面
   111. this.getUIContext().getRouter().replaceUrl({ url: 'pages/Index' }, router.RouterMode.Single)
   112. .catch((e: BusinessError) => {
   113. hilog.error(0x0000, 'testTag', `Failed to route to home. Code is ${e.code}, message is ${e.message}`);
   114. });
   115. }
   116. }

   118. async function requestOAID(context: Context): Promise<string | undefined> {
   119. // 向用户请求授权广告跨应用关联访问权限
   120. let isPermissionGranted: boolean = false;
   121. try {
   122. const atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
   123. const result: PermissionRequestResult =
   124. await atManager.requestPermissionsFromUser(context, ['ohos.permission.APP_TRACKING_CONSENT']);
   125. isPermissionGranted = result.authResults[0] === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED;
   126. } catch (err) {
   127. hilog.error(0x0000, 'testTag', `Failed to request permission. Code is ${err.code}, message is ${err.message}`);
   128. }
   129. if (isPermissionGranted) {
   130. hilog.info(0x0000, 'testTag', 'Succeeded in requesting permission');
   131. try {
   132. const oaid = await identifier.getOAID();
   133. hilog.info(0x0000, 'testTag', 'Succeeded in getting OAID');
   134. return oaid;
   135. } catch (err) {
   136. hilog.error(0x0000, 'testTag', `Failed to get OAID. Code is ${err.code}, message is ${err.message}`);
   137. }
   138. } else {
   139. hilog.error(0x0000, 'testTag', 'Failed to request permission. User rejected');
   140. }
   141. return undefined;
   142. }
   ```

### 展示广告

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { AdComponent, advertising } from '@kit.AdsKit';
   2. import { router } from '@kit.ArkUI';
   3. import { BusinessError } from '@kit.BasicServicesKit';
   4. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 展示广告。

   展示广告通过[AdInteractionListener](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-advertising#adinteractionlistener)监听广告状态回调，涉及的回调状态如下所示：

   展开

   | 回调状态 | 说明 | 使用建议 |
   | --- | --- | --- |
   | onAdOpen | 打开广告。 | - |
   | onAdClick | 点击广告。 | - |
   | onAdClose | 关闭广告。 | 广告倒计时结束、用户点击跳过按钮或广告从后台返回时触发，需要跳转到应用首页。  回调状态包含了具体的关闭原因，详情见：[data说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-advertising#onstatuschanged)。 |
   | onAdFail | 广告加载失败。 | 广告展示失败时触发，需要跳转到应用首页。 |

   说明

   1、请求到广告之前需要展示默认的Slogan图片。

   2、由请求广告中获取的isFullScreen参数判断展示全屏或者半屏广告。

   3、目前只支持展示竖屏广告。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. @State ad: advertising.Advertisement | undefined = undefined;
   5. // 广告展示参数
   6. private adDisplayOptions: advertising.AdDisplayOptions = {
   7. // 是否静音
   8. mute: true
   9. };
   10. // ...

   12. build() {
   13. RelativeContainer() {
   14. // 展示开发者自定义Slogan图片
   15. Image($r('app.media.slogan'))
   16. .width('100%')
   17. .height('100%')
   18. .zIndex(0)
   19. // 展示开发者自定义icon、应用名称、版权信息
   20. Column() {
   21. Row() {
   22. Image($r('app.media.video'))
   23. .width(24)
   24. .height(24)
   25. .margin(8)
   26. Text($r('app.string.video'))
   27. .fontColor('#1A1A1A')
   28. .fontSize(16)
   29. }
   30. .margin({ bottom: 8 })

   32. Column() {
   33. Text($r('app.string.copyright'))
   34. .fontColor('#1A1A1A')
   35. .fontSize(9)
   36. }
   37. }
   38. .zIndex(1)
   39. .alignRules({ bottom: { anchor: '__container__', align: VerticalAlign.Bottom } })
   40. .width('100%')
   41. .height('13%')

   43. if (this.ad) {
   44. if (this.ad.isFullScreen) {
   45. // 全屏开屏广告
   46. this.splashFullScreen()
   47. } else {
   48. // 半屏开屏广告
   49. this.splashHalfScreen()
   50. }
   51. }
   52. }
   53. .width('100%')
   54. .height('100%')
   55. }

   57. /**
   58. * 半屏开屏广告
   59. */
   60. @Builder
   61. private splashHalfScreen() {
   62. AdComponent({
   63. ads: [this.ad!],
   64. displayOptions: this.adDisplayOptions,
   65. interactionListener: {
   66. onStatusChanged: (status: string, ad: advertising.Advertisement, data: string) => {
   67. switch (status) {
   68. case 'onAdOpen':
   69. hilog.info(0x0000, 'testTag', 'Status is onAdOpen');
   70. break;
   71. case 'onAdClick':
   72. hilog.info(0x0000, 'testTag', 'Status is onAdClick');
   73. break;
   74. case 'onAdClose':
   75. hilog.info(0x0000, 'testTag', 'Status is onAdClose');
   76. this.routeToHome();
   77. break;
   78. case 'onAdFail':
   79. hilog.error(0x0000, 'testTag', 'Status is onAdFail');
   80. this.routeToHome();
   81. break;
   82. }
   83. }
   84. }
   85. })
   86. .zIndex(1)
   87. .width('100%')
   88. .height('87%')
   89. // 自定义组件动画
   90. .transition(TransitionEffect.OPACITY.animation({ duration: 1000, curve: Curve.Friction}))
   91. .alignRules({ top: { anchor: '__container__', align: VerticalAlign.Top } })
   92. }

   94. /**
   95. * 全屏开屏广告
   96. */
   97. @Builder
   98. private splashFullScreen() {
   99. AdComponent({
   100. ads: [this.ad!],
   101. displayOptions: this.adDisplayOptions,
   102. interactionListener: {
   103. onStatusChanged: (status: string, ad: advertising.Advertisement, data: string) => {
   104. switch (status) {
   105. case 'onAdOpen':
   106. hilog.info(0x0000, 'testTag', 'Status is onAdOpen');
   107. break;
   108. case 'onAdClick':
   109. hilog.info(0x0000, 'testTag', 'Status is onAdClick');
   110. break;
   111. case 'onAdClose':
   112. hilog.info(0x0000, 'testTag', 'Status is onAdClose');
   113. this.routeToHome();
   114. break;
   115. case 'onAdFail':
   116. hilog.error(0x0000, 'testTag', 'Status is onAdFail');
   117. this.routeToHome();
   118. break;
   119. }
   120. }
   121. }
   122. })
   123. .zIndex(1)
   124. .width('100%')
   125. .height('100%')
   126. }
   127. // ...

   129. private routeToHome(): void {
   130. // 开发者可根据项目实际情况修改超时之后要跳转的目标页面
   131. this.getUIContext().getRouter().replaceUrl({ url: 'pages/Index' }, router.RouterMode.Single)
   132. .catch((e: BusinessError) => {
   133. hilog.error(0x0000, 'testTag', `Failed to route to home. Code is ${e.code}, message is ${e.message}`);
   134. });
   135. }
   136. }

   138. // ...
   ```