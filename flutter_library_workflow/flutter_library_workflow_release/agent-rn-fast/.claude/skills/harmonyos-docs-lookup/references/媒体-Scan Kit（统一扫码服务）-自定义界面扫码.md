## 基本概念

自定义界面扫码能力提供了相机流控制接口，可根据自身需求自定义扫码界面，适用于对扫码界面有定制化需求的应用开发。

说明

通过自定义界面扫码可以实现应用内的扫码功能，为了获得更好的应用体验，推荐同时[接入“扫码直达”服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scan-directservice)，应用可以同时支持系统扫码入口（控制中心扫一扫）和应用内扫码两种方式跳转到指定服务页面。

## 场景介绍

自定义界面扫码能力提供扫码相机流控制接口，支持相机流的初始化、开启、暂停、释放、重新扫码功能；支持闪光灯的状态获取、开启、关闭；支持变焦比的获取和设置；支持设置相机焦点和连续自动对焦；支持对条形码、二维码、MULTIFUNCTIONAL CODE进行扫码识别（具体类型参见[ScanType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-scancore#section113371139123212)），并获得码类型、码值、码位置信息、相机预览流（YUV）。该能力可用于单码和多码的扫描识别。

开发者集成自定义界面扫码能力可以自行定义扫码的界面样式，请按照业务流程完成扫码接口调用实现实时扫码功能。建议开发者基于[Sample Code](https://gitcode.com/HarmonyOS_Samples/scan-kit_-sample-code_-clientdemo_-arkts)做个性化修改。

扫码页面UX设计规范：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6a/v3/NivACUvNTY2G2aARfVz63g/zh-cn_image_0000002518795081.png?HW-CC-KV=V1&HW-CC-Date=20260414T053400Z&HW-CC-Expire=86400&HW-CC-Sign=7560C04ACD7F48DBE9A73FD6B85ADDE368137C2759A392167BC846B0C7BDAECF "点击放大")

说明

YUV（相机预览流图像数据）适合于扫码和识物的综合识别场景，开发者需要自己控制相机流，普通扫码场景无需关注。

## 约束与限制

* 需要请求相机的使用权限。
* 需要开发者自行实现扫码的人机交互界面。例如：多码场景需要暂停相机流由用户选择一个码图进行识别。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0/v3/fUixNk0RRCu6_2L4cMiqCg/zh-cn_image_0000002518806913.png?HW-CC-KV=V1&HW-CC-Date=20260414T053400Z&HW-CC-Expire=86400&HW-CC-Sign=4C5A747927AD4060D4183500A0206B89CC37D027C3405609FC88A60DC0E45A76 "点击放大")

1. **发起请求：**用户向开发者的应用发起扫码请求，应用拉起已定义好的扫码界面。
2. **申请授权：**应用需要向用户申请相机权限授权。若未同意授权，则无法使用此功能。
3. **启动自定义界面扫码：**在扫码前必须调用init接口初始化自定义扫码界面，加载资源。相机流初始化结束后，调用start接口开始扫码。
4. **自定义界面扫码相机操作：**可以配置自定义界面扫码相机操作参数，调整相应功能，包括闪光灯、变焦、焦距、暂停、重启扫码等。例如：
   * 根据当前码图位置，比如当前码图太远或太近时，调用getZoom获取变焦比，setZoom接口设置变焦比，调整焦距以便于用户扫码。
   * 根据当前扫码的光线条件或根据on('lightingFlash')监听闪光灯开启或关闭时机，通过getFlashLightStatus接口先获取闪光灯状态，再调用openFlashLight/closeFlashLight接口控制闪光灯开启或关闭，以便于用户进行扫码。
   * 调用setFocusPoint设置对焦位置，resetFocus恢复默认对焦模式，以便于用户进行扫码。
   * 在应用处于前后台或其他特殊场景需要中断/重新进行扫码时，可调用stop或start接口来控制相机流达到暂停或重新扫码的目的。
5. **自定义界面扫码：**Scan Kit API在扫码完成后会返回扫码结果。同时根据开发者的需要，Scan Kit API会返回每帧相机预览流数据。如需不重启相机并重新触发一次扫码，可以在start接口的Callback异步回调中，调用rescan接口。完成扫码后，需调用release接口进行释放扫码资源的操作。
6. **获取结果：**解析码值结果跳转应用服务页。

## 接口说明

自定义界面扫码提供init、start、stop、release、getFlashLightStatus、openFlashLight、closeFlashLight、setZoom、getZoom、setFocusPoint、resetFocus、rescan、on('lightingFlash')、off('lightingFlash')接口，其中部分接口返回值有两种返回形式：Callback和Promise回调。Callback和Promise回调函数只是返回值方式不一样，功能相同。具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section447114223245)(options?: scanBarcode.[ScanOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-scanbarcode-api#section1285191073117)): void | 初始化自定义界面扫码，加载资源。无返回结果。 |
| [start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section38711535114711)(viewControl: [ViewControl](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section8604949165313)): Promise<Array<scanBarcode.[ScanResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-scanbarcode-api#section10614317162112)>> | 启动扫码相机流。使用Promise异步回调获取扫码结果。 |
| [stop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section6949611114915)(): Promise<void> | 暂停扫码相机流。使用Promise异步回调返回执行结果。 |
| [release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section1109456134917)(): Promise<void> | 释放扫码相机流。使用Promise异步回调返回执行结果。 |
| [start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section747366165913)(viewControl: ViewControl, callback: AsyncCallback<Array<scanBarcode.ScanResult>>, frameCallback?: AsyncCallback<[ScanFrame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section1670633211200)>): void | 启动扫码相机流。使用Callback异步回调返回扫码结果以及YUV图像数据。 |
| [getFlashLightStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section1693117333508)(): boolean | 获取闪光灯状态。返回结果为布尔值，true为打开状态，false为关闭状态。 |
| [openFlashLight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section75901948175116)(): void | 开启闪光灯。无返回结果。 |
| [closeFlashLight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section17980725135120)(): void | 关闭闪光灯。无返回结果。 |
| [setZoom](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section070810389567)(zoomValue : number): void | 设置变焦比。无返回结果。 |
| [getZoom](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section1699185032017)(): number | 获取当前的变焦比。 |
| [setFocusPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section288962116197)(point: scanBarcode.[Point](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-scanbarcode-api#section9634457911)): void | 设置相机焦点。 |
| [resetFocus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section12891152115196)(): void | 设置连续自动对焦模式。 |
| [rescan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section19244173211169)(): void | 触发一次重新扫码。仅对start接口Callback异步回调有效，Promise异步回调无效。 |
| [stop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section031674815483)(callback: AsyncCallback<void>): void | 暂停扫码相机流。使用Callback异步回调返回执行结果。 |
| [release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section169321832184912)(callback: AsyncCallback<void>): void | 释放扫码相机流。使用Callback异步回调返回执行结果。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section1788353253914)(type: 'lightingFlash', callback: AsyncCallback<boolean>): void | 订阅闪光灯状态监听事件，当环境暗、亮状态变化时，使用Callback异步回调返回闪光灯开启或关闭时机。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section128574416409)(type: 'lightingFlash', callback?: AsyncCallback<boolean>): void | 注销闪光灯状态监听事件。 |

## 开发步骤

自定义界面扫码接口支持自定义UI界面，识别相机流中的条形码，二维码以及MULTIFUNCTIONAL CODE，并返回码图的值、类型、码的位置信息（码图最小外接矩形左上角和右下角的坐标）以及相机预览流（YUV）。

为了方便开发者接入，我们提供了详细的样例工程供参考，推荐参考[示例工程](https://gitcode.com/HarmonyOS_Samples/scan-kit_-sample-code_-clientdemo_-arkts)接入。

以下示例为调用自定义界面扫码接口拉起相机流并返回扫码结果和相机预览流（YUV）。

1. 在开发应用前，需要先申请相机相关权限，确保应用拥有访问相机的权限。在“module.json5”文件中配置相机权限，具体配置方式，请参见[声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)。

   展开

   | 权限名 | 说明 | 授权方式 |
   | --- | --- | --- |
   | ohos.permission.CAMERA | 允许应用使用相机扫码。 | user\_grant |
2. 使用接口[requestPermissionsFromUser](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#requestpermissionsfromuser9-1)请求用户授权。具体申请方式及校验方式，请参见[向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。
3. 导入自定义界面扫码接口以及相关接口模块，导入方法如下。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { scanCore, scanBarcode, customScan } from '@kit.ScanKit';
   2. // 导入功能涉及的权限申请、回调接口
   3. import { display } from '@kit.ArkUI';
   4. import { AsyncCallback, BusinessError } from '@kit.BasicServicesKit';
   5. import { hilog } from '@kit.PerformanceAnalysisKit';
   6. import { common, abilityAccessCtrl, PermissionRequestResult } from '@kit.AbilityKit';
   ```
4. 遵循[业务流程](/consumer/cn/doc/harmonyos-guides/scan-customscan#section52491649171418)完成自定义界面扫码功能。

   说明

   1. 在设置start接口的viewControl参数时，width和height与[XComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent)的宽高值相同，start接口会根据XComponent的宽高比例从相机的分辨率选择最优分辨率，如果比例与相机的分辨率比例相差过大会影响预览流体验。

      当前支持的分辨率比例为16:9、4:3、1:1。竖屏场景下，XComponent的高度需要大于宽度，且高宽比在支持的分辨率比例中。横屏场景下，XComponent的宽度需要大于高度，且宽高比在支持的分辨率比例中。
   2. XComponent的宽高需根据使用场景计算适配。例如：在开发设备为折叠屏时，需按照折叠屏的展开态和折叠态分别计算XComponent的宽高，start接口会根据XComponent的宽高适配对应的相机分辨率。设备屏幕宽高可通过[display.getDefaultDisplaySync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displaygetdefaultdisplaysync9)方法获取（获取的为px单位，需要通过[px2vp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#px2vp12)方法转为vp）。

   * 通过Promise方式回调，调用自定义界面扫码接口拉起相机流并返回扫码结果。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. const TAG: string = '[customScanPage]';

     3. @Entry
     4. @Component
     5. struct CustomScanPage {
     6. @State userGrant: boolean = false // 是否已申请相机权限
     7. @State surfaceId: string = '' // XComponent组件生成id
     8. @State isShowBack: boolean = false // 是否已经返回扫码结果
     9. @State isFlashLightEnable: boolean = false // 是否开启了闪光灯
     10. @State isSensorLight: boolean = false // 记录当前环境亮暗状态
     11. @State cameraHeight: number = 640 // 设置预览流高度，默认单位：vp
     12. @State cameraWidth: number = 360 // 设置预览流宽度，默认单位：vp
     13. @State offsetX: number = 0 // 设置预览流x轴方向偏移量，默认单位：vp
     14. @State offsetY: number = 0 // 设置预览流y轴方向偏移量，默认单位：vp
     15. @State zoomValue: number = 1 // 预览流缩放比例
     16. @State setZoomValue: number = 1 // 已设置的预览流缩放比例
     17. @State scaleValue: number = 1 // 屏幕缩放比
     18. @State pinchValue: number = 1 // 双指缩放比例
     19. @State displayHeight: number = 0 // 屏幕高度，单位vp
     20. @State displayWidth: number = 0 // 屏幕宽度，单位vp
     21. @State scanResult: Array<scanBarcode.ScanResult> = [] // 扫码结果
     22. private mXComponentController: XComponentController = new XComponentController()

     24. async onPageShow() {
     25. // 自定义启动第一步，用户申请权限
     26. await this.requestCameraPermission();
     27. // 多码扫码识别，enableMultiMode: true 单码扫码识别enableMultiMode: false
     28. let options: scanBarcode.ScanOptions = {
     29. scanTypes: [scanCore.ScanType.ALL],
     30. enableMultiMode: true,
     31. enableAlbum: true
     32. }
     33. // 自定义启动第二步：设置预览流布局尺寸
     34. this.setDisplay();
     35. try {
     36. // 自定义启动第三步，初始化接口
     37. customScan.init(options);
     38. } catch (error) {
     39. hilog.error(0x0001, TAG, `Failed to init customScan. Code: ${error.code}, message: ${error.message}`);
     40. }
     41. }

     43. onPageHide() {
     44. // 页面消失或隐藏时，停止并释放相机流
     45. this.userGrant = false;
     46. this.isFlashLightEnable = false;
     47. this.isSensorLight = false;
     48. try {
     49. customScan.off('lightingFlash');
     50. } catch (error) {
     51. hilog.error(0x0001, TAG, `Failed to off lightingFlash. Code: ${error.code}, message: ${error.message}`);
     52. }
     53. this.customScanStop();
     54. try {
     55. // 自定义相机流释放接口
     56. customScan.release().catch((error: BusinessError) => {
     57. hilog.error(0x0001, TAG,
     58. `Failed to release customScan by promise. Code: ${error.code}, message: ${error.message}`);
     59. })
     60. } catch (error) {
     61. hilog.error(0x0001, TAG, `Failed to release customScan. Code: ${error.code}, message: ${error.message}`);
     62. }
     63. }

     65. // 用户申请权限
     66. async reqPermissionsFromUser(): Promise<number[]> {
     67. hilog.info(0x0001, TAG, 'reqPermissionsFromUser start');
     68. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
     69. let atManager = abilityAccessCtrl.createAtManager();
     70. try {
     71. const grantStatus: PermissionRequestResult =
     72. await atManager.requestPermissionsFromUser(context, ['ohos.permission.CAMERA']);
     73. return grantStatus.authResults;
     74. } catch (error) {
     75. hilog.error(0x0001, TAG, `Failed to requestPermissionsFromUser. Code: ${error.code}, message: ${error.message}`);
     76. return [];
     77. }
     78. }

     80. // 用户申请相机权限
     81. async requestCameraPermission() {
     82. let grantStatus = await this.reqPermissionsFromUser();
     83. for (let i = 0; i < grantStatus.length; i++) {
     84. if (grantStatus[i] === 0) {
     85. // 用户授权，可以继续访问目标操作
     86. hilog.info(0x0001, TAG, 'Succeeded in getting permissions.');
     87. this.userGrant = true;
     88. break;
     89. }
     90. }
     91. }

     93. // 竖屏时获取屏幕尺寸，设置预览流全屏示例
     94. setDisplay() {
     95. try {
     96. // 默认竖屏
     97. let displayClass = display.getDefaultDisplaySync();
     98. this.displayHeight = this.getUIContext().px2vp(displayClass.height);
     99. this.displayWidth = this.getUIContext().px2vp(displayClass.width);
     100. let maxLen: number = Math.max(this.displayWidth, this.displayHeight);
     101. let minLen: number = Math.min(this.displayWidth, this.displayHeight);
     102. const RATIO: number = 16 / 9;
     103. this.cameraHeight = maxLen;
     104. this.cameraWidth = maxLen / RATIO;
     105. this.offsetX = (minLen - this.cameraWidth) / 2;
     106. } catch (error) {
     107. hilog.error(0x0001, TAG, `Failed to getDefaultDisplaySync. Code: ${error.code}, message: ${error.message}`);
     108. }
     109. }

     111. // toast显示扫码结果
     112. showScanResult(result: scanBarcode.ScanResult) {
     113. try {
     114. // 使用toast显示出扫码结果
     115. this.getUIContext().getPromptAction().showToast({
     116. message: JSON.stringify(result),
     117. duration: 5000
     118. });
     119. } catch (error) {
     120. hilog.error(0x0001, TAG, `Failed to showToast. Code: ${error.code}, message: ${error.message}`);
     121. }
     122. }

     124. initCamera() {
     125. this.isShowBack = false;
     126. this.scanResult = [];
     127. let viewControl: customScan.ViewControl = {
     128. width: this.cameraWidth,
     129. height: this.cameraHeight,
     130. surfaceId: this.surfaceId
     131. };
     132. try {
     133. // 自定义启动第四步，请求扫码接口，通过Promise方式回调
     134. customScan.start(viewControl)
     135. .then((result: Array<scanBarcode.ScanResult>) => {
     136. hilog.info(0x0001, TAG, `result: ${JSON.stringify(result)}`);
     137. if (result.length) {
     138. // 解析码值结果跳转应用服务页
     139. this.scanResult = result;
     140. this.isShowBack = true;
     141. // 获取到扫描结果后暂停相机流
     142. this.customScanStop();
     143. }
     144. }).catch((error: BusinessError) => {
     145. hilog.error(0x0001, TAG, `Failed to start customScan. Code: ${error.code}, message: ${error.message}`);
     146. });
     147. } catch (error) {
     148. hilog.error(0x0001, TAG, `Failed to start customScan. Code: ${error.code}, message: ${error.message}`);
     149. }
     150. }

     152. customScanStop() {
     153. try {
     154. customScan.stop().catch((error: BusinessError) => {
     155. hilog.error(0x0001, TAG, `Failed to stop customScan. Code: ${error.code}, message: ${error.message}`);
     156. })
     157. } catch (error) {
     158. hilog.error(0x0001, TAG, `Failed to stop customScan. Code: ${error.code}, message: ${error.message}`);
     159. }
     160. }

     162. // 自定义扫码界面的顶部返回按钮和扫码提示
     163. @Builder
     164. TopTool() {
     165. Column() {
     166. Flex({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center }) {
     167. Text('返回')
     168. .onClick(() => {
     169. this.getUIContext().getRouter().back();
     170. })
     171. }.padding({ left: 24, right: 24, top: 40 })


     174. Column() {
     175. Text('扫描二维码/条形码')
     176. Text('对准二维码/条形码，即可自动扫描')
     177. }.margin({ left: 24, right: 24, top: 24 })
     178. }
     179. .height(146)
     180. .width('100%')
     181. }

     183. build() {
     184. Stack() {
     185. if (this.userGrant) {
     186. Column() {
     187. XComponent({
     188. id: 'componentId',
     189. type: XComponentType.SURFACE,
     190. controller: this.mXComponentController
     191. })
     192. .onLoad(() => {
     193. hilog.info(0x0001, TAG, 'Succeeded in loading, onLoad is called.');
     194. // 获取XComponent组件的surfaceId
     195. this.surfaceId = this.mXComponentController.getXComponentSurfaceId();
     196. hilog.info(0x0001, TAG, `Succeeded in getting surfaceId: ${this.surfaceId}`);
     197. this.initCamera();
     198. // 闪光灯监听接口
     199. customScan.on('lightingFlash', (error, isLightingFlash) => {
     200. if (error) {
     201. hilog.error(0x0001, TAG,
     202. `Failed to on lightingFlash. Code: ${error.code}, message: ${error.message}`);
     203. return;
     204. }
     205. if (isLightingFlash) {
     206. this.isFlashLightEnable = true;
     207. } else {
     208. try {
     209. if (!customScan.getFlashLightStatus()) {
     210. this.isFlashLightEnable = false;
     211. }
     212. } catch (error) {
     213. hilog.error(0x0001, TAG,
     214. `Failed to get flashLightStatus. Code: ${error.code}, message: ${error.message}`);
     215. }
     216. }
     217. this.isSensorLight = isLightingFlash;
     218. });
     219. })
     220. .width(this.cameraWidth)
     221. .height(this.cameraHeight)
     222. .position({ x: this.offsetX, y: this.offsetY })
     223. }
     224. .height('100%')
     225. .width('100%')
     226. }


     229. Column() {
     230. this.TopTool()
     231. Column() {
     232. }
     233. .layoutWeight(1)
     234. .width('100%')


     237. Column() {
     238. Row() {
     239. // 闪光灯按钮，启动相机流后才能使用
     240. Button('FlashLight')
     241. .onClick(() => {
     242. let lightStatus: boolean = false;
     243. try {
     244. lightStatus = customScan.getFlashLightStatus();
     245. } catch (error) {
     246. hilog.error(0x0001, TAG,
     247. `Failed to get flashLightStatus. Code: ${error.code}, message: ${error.message}`);
     248. }


     251. // 根据当前闪光灯状态，选择打开或关闭闪光灯
     252. if (lightStatus) {
     253. try {
     254. customScan.closeFlashLight();
     255. setTimeout(() => {
     256. this.isFlashLightEnable = this.isSensorLight;
     257. }, 200);
     258. } catch (error) {
     259. hilog.error(0x0001, TAG,
     260. `Failed to close flashLight. Code: ${error.code}, message: ${error.message}`);
     261. }
     262. } else {
     263. try {
     264. customScan.openFlashLight();
     265. } catch (error) {
     266. hilog.error(0x0001, TAG,
     267. `Failed to open flashLight. Code: ${error.code}, message: ${error.message}`);
     268. }
     269. }
     270. })
     271. .visibility((this.userGrant && this.isFlashLightEnable) ? Visibility.Visible : Visibility.None)


     274. // 扫码成功后，点击按钮后重新扫码
     275. Button('Scan')
     276. .onClick(() => {
     277. // 点击按钮重启相机流，重新扫码
     278. this.initCamera();
     279. })
     280. .visibility(this.isShowBack ? Visibility.Visible : Visibility.None)
     281. }


     284. Row() {
     285. // 预览流设置缩放比例
     286. Button('缩放比例,当前比例:' + this.setZoomValue)
     287. .onClick(() => {
     288. // 设置相机缩放比例
     289. if (!this.isShowBack) {
     290. if (!this.zoomValue || this.zoomValue === this.setZoomValue) {
     291. this.setZoomValue = this.customGetZoom();
     292. } else {
     293. this.zoomValue = this.zoomValue;
     294. this.customSetZoom(this.zoomValue);
     295. setTimeout(() => {
     296. if (!this.isShowBack) {
     297. this.setZoomValue = this.customGetZoom();
     298. }
     299. }, 1000);
     300. }
     301. }
     302. })
     303. }
     304. .margin({ top: 10, bottom: 10 })


     307. Row() {
     308. // 输入要设置的预览流缩放比例
     309. TextInput({ placeholder: '输入缩放倍数' })
     310. .type(InputType.Number)
     311. .borderWidth(1)
     312. .backgroundColor(Color.White)
     313. .onChange(value => {
     314. this.zoomValue = Number(value);
     315. })
     316. }
     317. }
     318. .width('50%')
     319. .height(180)
     320. }


     323. // 单码、多码扫描后，显示码图蓝点位置。点击toast码图信息
     324. ForEach(this.scanResult, (item: scanBarcode.ScanResult) => {
     325. if (item.scanCodeRect) {
     326. Image($rawfile('scan_selected2.svg')) // src/main/resources/rawfile/scan_selected2.svg
     327. .width(40)
     328. .height(40)
     329. .markAnchor({ x: 20, y: 20 })
     330. .position({
     331. x: (item.scanCodeRect.left + item?.scanCodeRect?.right) / 2 + this.offsetX,
     332. y: (item.scanCodeRect.top + item?.scanCodeRect?.bottom) / 2 + this.offsetY
     333. })
     334. .onClick(() => {
     335. this.showScanResult(item);
     336. })
     337. }
     338. }, (item: scanBarcode.ScanResult) => '' + item?.scanCodeRect?.left + item?.scanCodeRect?.right + 'px')
     339. }
     340. // 建议相机流设置为全屏
     341. .width('100%')
     342. .height('100%')
     343. .onClick((event: ClickEvent) => {
     344. // 是否已扫描到结果
     345. if (this.isShowBack) {
     346. return;
     347. }
     348. // 点击屏幕位置，获取点击位置(x,y)，设置相机焦点
     349. let x1 = this.getUIContext().vp2px(event.displayY) / (this.displayHeight + 0.0);
     350. let y1 = 1.0 - (this.getUIContext().vp2px(event.displayX) / (this.displayWidth + 0.0));
     351. try {
     352. customScan.setFocusPoint({ x: x1, y: y1 });
     353. hilog.info(0x0001, TAG, `Succeeded in setting focusPoint x1: ${x1}, y1: ${y1}`);
     354. } catch (error) {
     355. hilog.error(0x0001, TAG, `Failed to set focusPoint. Code: ${error.code}, message: ${error.message}`);
     356. }
     357. hilog.info(0x0001, TAG, `Succeeded in setting focusPoint x1: ${x1}, y1: ${y1}`);
     358. // 设置连续自动对焦模式
     359. setTimeout(() => {
     360. try {
     361. customScan.resetFocus();
     362. } catch (error) {
     363. hilog.error(0x0001, TAG, `Failed to reset focus. Code: ${error.code}, message: ${error.message}`);
     364. }
     365. }, 200);
     366. }).gesture(PinchGesture({ fingers: 2 })
     367. .onActionStart(() => {
     368. hilog.info(0x0001, TAG, 'Pinch start');
     369. })
     370. .onActionUpdate((event: GestureEvent) => {
     371. if (event) {
     372. this.scaleValue = event.scale;
     373. }
     374. })
     375. .onActionEnd(() => {
     376. // 是否已扫描到结果
     377. if (this.isShowBack) {
     378. return;
     379. }
     380. // 获取双指缩放比例，设置变焦比
     381. try {
     382. let zoom = this.customGetZoom();
     383. this.pinchValue = this.scaleValue * zoom;
     384. this.customSetZoom(this.pinchValue);
     385. hilog.info(0x0001, TAG, 'Pinch end');
     386. } catch (error) {
     387. hilog.error(0x0001, TAG, `Failed to set zoom. Code: ${error.code}, message: ${error.message}`);
     388. }
     389. }))
     390. }

     392. public customGetZoom(): number {
     393. let zoom = 1;
     394. try {
     395. zoom = customScan.getZoom();
     396. hilog.info(0x0001, TAG, `Succeeded in getting zoom, zoom: ${zoom}`);
     397. } catch (error) {
     398. hilog.error(0x0001, TAG, `Failed to get zoom. Code: ${error.code}, message: ${error?.message}`);
     399. }
     400. return zoom;
     401. }

     403. public customSetZoom(pinchValue: number): void {
     404. try {
     405. customScan.setZoom(pinchValue);
     406. hilog.info(0x0001, TAG, `Succeeded in setting zoom.`);
     407. } catch (error) {
     408. hilog.error(0x0001, TAG, `Failed to set zoom. Code: ${error.code}, message: ${error?.message}`);
     409. }
     410. }
     411. }
     ```
   * 通过Callback方式回调，调用自定义界面扫码接口拉起相机流并返回扫码结果和相机预览流（YUV）。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. import { bundleManager, Permissions } from '@kit.AbilityKit';

     3. const TAG = '[YUV CPSample]';

     5. // 用户申请权限
     6. export class PermissionsUtil {
     7. public static async checkAccessToken(permission: Permissions): Promise<abilityAccessCtrl.GrantStatus> {
     8. let atManager = abilityAccessCtrl.createAtManager();
     9. let grantStatus: abilityAccessCtrl.GrantStatus = -1;
     10. // 获取应用程序的accessTokenID
     11. let tokenId: number = 0;
     12. try {
     13. let bundleInfo: bundleManager.BundleInfo =
     14. await bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION);
     15. let appInfo: bundleManager.ApplicationInfo = bundleInfo.appInfo;
     16. tokenId = appInfo.accessTokenId;
     17. // 校验应用是否被授予权限
     18. grantStatus = await atManager.checkAccessToken(tokenId, permission);
     19. } catch (error) {
     20. hilog.error(0x0001, TAG,
     21. `Failed to getBundleInfoForSelf or checkAccessToken. Code: ${error.code}, message: ${error.message}`);
     22. }
     23. return grantStatus;
     24. }


     27. // 申请相机权限
     28. public static async reqPermissionsFromUser(context: Context): Promise<number[]> {
     29. hilog.info(0x0001, TAG, 'Succeeded in getting permissions by promise.')
     30. let atManager = abilityAccessCtrl.createAtManager();
     31. try {
     32. const grantStatus: PermissionRequestResult =
     33. await atManager.requestPermissionsFromUser(context, ['ohos.permission.CAMERA']);
     34. return grantStatus.authResults;
     35. } catch (error) {
     36. hilog.error(0x0001, TAG, `Failed to requestPermissionsFromUser. Code: ${error.code}, message: ${error.message}`);
     37. return [];
     38. }
     39. }
     40. }


     43. @Extend(Column)
     44. function mainStyle() {
     45. .width('100%')
     46. .height('100%')
     47. .padding({
     48. top: 40
     49. })
     50. .justifyContent(FlexAlign.Center)
     51. }


     54. @Entry
     55. @Component
     56. struct YUVScan {
     57. @State userGrant: boolean = false // 是否已申请相机权限
     58. @State surfaceId: string = '' // XComponent组件生成id
     59. @State cameraHeight: number = 640 // 设置预览流高度，默认单位：vp
     60. @State cameraWidth: number = 360 // 设置预览流宽度，默认单位：vp
     61. @State zoomValue: number = 1 // 预览流缩放比例
     62. @State setZoomValue: number = 1 // 已设置的预览流缩放比例
     63. @State isReleaseCamera: boolean = false // 是否已释放相机流
     64. @State scanWidth: number = 384 // XComponent宽度，默认设置384，单位vp
     65. @State scanHeight: number = 682 // XComponent高度，默认设置682，单位vp
     66. @State scanBottom: number = 220
     67. @State offsetX: number = 0 // XComponent位置x轴偏移量，单位vp
     68. @State offsetY: number = 0 // XComponent位置y轴偏移量，单位vp
     69. @State scanCodeRect: Array<scanBarcode.ScanCodeRect> = [] // 扫码结果码图位置
     70. @State scanFlag: boolean = false // 是否已经扫码到结果
     71. @State scanFrameResult: string = ''
     72. @State scaleValue: number = 1 // 屏幕缩放比
     73. @State pinchValue: number = 1 // 双指缩放比例
     74. @State displayHeight: number = 0 // 屏幕高度，单位vp
     75. @State displayWidth: number = 0 // 屏幕宽度，单位vp
     76. private mXComponentController: XComponentController = new XComponentController()
     77. private viewControl: customScan.ViewControl = { width: 1920, height: 1080, surfaceId: this.surfaceId }
     78. options: scanBarcode.ScanOptions = {
     79. // 扫码类型，可选参数
     80. scanTypes: [scanCore.ScanType.ALL],
     81. // 是否开启多码识别，可选参数
     82. enableMultiMode: true,
     83. // 是否开启相册扫码，可选参数
     84. enableAlbum: true,
     85. }
     86. // 返回自定义扫描结果的回调
     87. private callback: AsyncCallback<scanBarcode.ScanResult[]> =
     88. (error: BusinessError, result: scanBarcode.ScanResult[]) => {
     89. if (error && error.code) {
     90. hilog.error(0x0001, TAG,
     91. `Failed to get ScanResult by callback. Code: ${error.code}, message: ${error.message}`);
     92. return;
     93. }
     94. // 解析码值结果跳转应用服务页
     95. hilog.info(0x0001, TAG, `Succeeded in getting ScanResult by callback, result: ${JSON.stringify(result)}`);
     96. }
     97. // 返回相机帧的回调
     98. private frameCallback: AsyncCallback<customScan.ScanFrame> =
     99. (error: BusinessError, frameResult: customScan.ScanFrame) => {
     100. if (error) {
     101. hilog.error(0x0001, TAG, `Failed to get ScanFrame by callback. Code: ${error.code}, message: ${error.message}`);
     102. return;
     103. }
     104. // byteBuffer相机YUV图像数组
     105. hilog.info(0x0001, TAG,
     106. `Succeeded in getting ScanFrame.byteBuffer.byteLength: ${frameResult.byteBuffer.byteLength}`)
     107. hilog.info(0x0001, TAG, `Succeeded in getting ScanFrame.width: ${frameResult.width}`)
     108. hilog.info(0x0001, TAG, `Succeeded in getting ScanFrame.height: ${frameResult.height}`)
     109. this.scanFrameResult = JSON.stringify(frameResult.scanCodeRects);
     110. if (frameResult && frameResult.scanCodeRects && frameResult.scanCodeRects.length > 0 && !this.scanFlag) {
     111. if (frameResult.scanCodeRects[0]) {
     112. this.stopCamera();
     113. this.scanCodeRect = [];
     114. this.scanFlag = true;
     115. // 码图位置信息转换
     116. this.changeToXComponent(frameResult);
     117. } else {
     118. this.scanFlag = false;
     119. }
     120. }
     121. }

     123. // frameCallback横向码图位置信息转换为预览流XComponent对应码图位置信息
     124. changeToXComponent(frameResult: customScan.ScanFrame) {
     125. if (frameResult && frameResult.scanCodeRects) {
     126. let frameHeight = frameResult.height;
     127. let ratio = this.scanWidth / frameHeight;
     128. frameResult.scanCodeRects.forEach((item) => {
     129. this.scanCodeRect.push({
     130. left: this.toFixedNumber((frameHeight - item.bottom) * ratio),
     131. top: this.toFixedNumber(item.left * ratio),
     132. right: this.toFixedNumber((frameHeight - item.top) * ratio),
     133. bottom: this.toFixedNumber(item.right * ratio)
     134. });
     135. });
     136. this.scanFrameResult = JSON.stringify(this.scanCodeRect);
     137. }
     138. }

     140. toFixedNumber(no: number): number {
     141. return Number((no).toFixed(1));
     142. }

     144. async onPageShow() {
     145. // 自定义启动第一步，用户申请权限
     146. const permissions: Array<Permissions> = ['ohos.permission.CAMERA'];
     147. // 自定义启动第二步：设置预览流布局尺寸
     148. this.setDisplay();
     149. let grantStatus = await PermissionsUtil.checkAccessToken(permissions[0]);
     150. if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
     151. // 已经授权，可以继续访问目标操作
     152. this.userGrant = true;
     153. if (this.surfaceId) {
     154. // 自定义启动第三步，初始化接口
     155. this.initCamera();
     156. }
     157. } else {
     158. // 申请相机权限
     159. await this.requestCameraPermission();
     160. }
     161. }

     163. async onPageHide() {
     164. await this.releaseCamera();
     165. }

     167. // 用户申请权限
     168. async requestCameraPermission() {
     169. let grantStatus =
     170. await PermissionsUtil.reqPermissionsFromUser(this.getUIContext().getHostContext() as common.UIAbilityContext)
     171. let length: number = grantStatus.length;
     172. let userGrant: boolean = false; // 用户拒绝授权，提示用户必须授权才能访问当前页面的功能，并引导用户到系统设置中打开相应的权限
     173. for (let i = 0; i < length; i++) {
     174. if (grantStatus[i] === 0) {
     175. // 用户授权，可以继续访问目标操作
     176. userGrant = true;
     177. }
     178. }
     179. this.userGrant = userGrant;
     180. }

     182. // 竖屏时获取屏幕尺寸，设置预览流全屏示例
     183. setDisplay() {
     184. try {
     185. // 以手机为例计算宽高
     186. let displayClass = display.getDefaultDisplaySync();
     187. this.displayHeight = this.getUIContext().px2vp(displayClass.height);
     188. this.displayWidth = this.getUIContext().px2vp(displayClass.width);
     189. if (displayClass !== null) {
     190. this.scanWidth = this.getUIContext().px2vp(displayClass.width);
     191. this.scanHeight = Math.round(this.scanWidth * this.viewControl.width / this.viewControl.height);
     192. this.scanBottom = Math.max(220, this.getUIContext().px2vp(displayClass.height) - this.scanHeight);
     193. this.offsetX = 0;
     194. this.offsetY = 0;
     195. }
     196. } catch (error) {
     197. hilog.error(0x0001, TAG, `Failed to getDefaultDisplaySync. Code: ${error.code}, message: ${error.message}`);
     198. }
     199. }

     201. // 初始化相机流
     202. initCamera() {
     203. this.isReleaseCamera = false;
     204. try {
     205. // 自定义启动第三步，初始化接口
     206. customScan.init(this.options);
     207. hilog.info(0x0001, TAG, 'Succeeded in initializing customScan with options.');
     208. } catch (error) {
     209. hilog.error(0x0001, TAG, `Failed to init customScan. Code: ${error.code}, message: ${error.message}`);
     210. }
     211. this.scanCodeRect = [];
     212. this.scanFlag = false;
     213. try {
     214. // 自定义启动第四步，请求扫码接口
     215. customScan.start(this.viewControl, this.callback, this.frameCallback);
     216. } catch (error) {
     217. hilog.error(0x0001, TAG, `Failed to start customScan. Code: ${error.code}, message: ${error.message}`);
     218. }
     219. }

     221. // 暂停相机流
     222. stopCamera() {
     223. if (!this.isReleaseCamera) {
     224. try {
     225. customScan.stop().catch((error: BusinessError) => {
     226. hilog.error(0x0000, TAG, `Failed to stop customScan. Code: ${error.code}, message: ${error.message}`);
     227. });
     228. } catch (error) {
     229. hilog.error(0x0001, TAG, `Failed to stop customScan. Code: ${error.code}, message: ${error.message}`);
     230. }
     231. }
     232. }

     234. // 释放相机流
     235. async releaseCamera() {
     236. if (!this.isReleaseCamera) {
     237. this.stopCamera();
     238. try {
     239. await customScan.release();
     240. } catch (error) {
     241. hilog.error(0x0001, TAG, `Failed to release customScan. Code: ${error.code}, message: ${error.message}`);
     242. }
     243. this.isReleaseCamera = true;
     244. }
     245. }

     247. build() {
     248. Stack() {
     249. // 相机预览流XComponent
     250. if (this.userGrant) {
     251. Column() {
     252. XComponent({
     253. id: 'componentId',
     254. type: XComponentType.SURFACE,
     255. controller: this.mXComponentController
     256. })
     257. .onLoad(() => {
     258. hilog.info(0x0001, TAG, 'Succeeded in loading, onLoad is called.');
     259. this.surfaceId = this.mXComponentController.getXComponentSurfaceId();
     260. hilog.info(0x0001, TAG, `Succeeded in getting surfaceId is ${this.surfaceId}`);
     261. this.viewControl = { width: this.scanWidth, height: this.scanHeight, surfaceId: this.surfaceId };
     262. // 启动相机进行扫码
     263. this.initCamera();
     264. })
     265. .height(this.scanHeight)
     266. .width(this.scanWidth)
     267. .position({ x: 0, y: 0 })
     268. }
     269. .height('100%')
     270. .width('100%')
     271. .position({ x: this.offsetX, y: this.offsetY })
     272. }


     275. Column() {
     276. Column() {
     277. }
     278. .layoutWeight(1)
     279. .width('100%')


     282. Column() {


     285. Row() {
     286. // 闪光灯按钮，启动相机流后才能使用
     287. Button('FlashLight')
     288. .onClick(() => {
     289. let lightStatus: boolean = false;
     290. try {
     291. lightStatus = customScan.getFlashLightStatus();
     292. } catch (error) {
     293. hilog.error(0x0001, TAG,
     294. `Failed to get flashLightStatus. Code: ${error.code}, message: ${error.message}`);
     295. }
     296. // 根据当前闪光灯状态，选择打开或关闭闪光灯
     297. if (lightStatus) {
     298. try {
     299. customScan.closeFlashLight();
     300. } catch (error) {
     301. hilog.error(0x0001, TAG,
     302. `Failed to close flashLight. Code: ${error.code}, message: ${error.message}`);
     303. }
     304. } else {
     305. try {
     306. customScan.openFlashLight();
     307. } catch (error) {
     308. hilog.error(0x0001, TAG,
     309. `Failed to open flashLight. Code: ${error.code}, message: ${error.message}`);
     310. }
     311. }
     312. })
     313. .visibility(this.scanFlag ? Visibility.None : Visibility.Visible)
     314. }


     317. Row() {
     318. // 预览流设置缩放比例
     319. Button('缩放比例,当前比例:' + this.setZoomValue)
     320. .width(200)
     321. .alignSelf(ItemAlign.Center)
     322. .onClick(() => {
     323. // 设置相机缩放比例
     324. if (!this.scanFlag) {
     325. if (!this.zoomValue || this.zoomValue === this.setZoomValue) {
     326. this.setZoomValue = this.customGetZoom();
     327. } else {
     328. this.zoomValue = this.zoomValue;
     329. this.customSetZoom(this.zoomValue);
     330. setTimeout(() => {
     331. if (!this.scanFlag) {
     332. this.setZoomValue = this.customGetZoom();
     333. }
     334. }, 1000);
     335. }
     336. }
     337. })
     338. }
     339. .margin({ top: 10, bottom: 10 })
     340. .visibility(this.scanFlag ? Visibility.None : Visibility.Visible)


     343. Row() {
     344. // 输入要设置的预览流缩放比例
     345. TextInput({ placeholder: '输入缩放倍数' })
     346. .width(200)
     347. .type(InputType.Number)
     348. .borderWidth(1)
     349. .backgroundColor(Color.White)
     350. .onChange(value => {
     351. this.zoomValue = Number(value);
     352. })
     353. }
     354. .visibility(this.scanFlag ? Visibility.None : Visibility.Visible)


     357. Text(this.scanFlag ? '继续扫码' : '扫码中')
     358. .height(30)
     359. .fontSize(16)
     360. .fontColor(Color.White)
     361. .onClick(() => {
     362. if (this.scanFlag) {
     363. this.scanFrameResult = '';
     364. this.initCamera();
     365. }
     366. })
     367. Text('扫码结果：' + this.scanFrameResult).fontColor(Color.White).fontSize(12)
     368. }
     369. .width('100%')
     370. .height(this.scanBottom)
     371. .backgroundColor(Color.Black)
     372. }
     373. .mainStyle()


     376. Image($rawfile('scan_back.svg')) // src/main/resources/rawfile/scan_back.svg
     377. .width(20)
     378. .height(20)
     379. .position({
     380. x: 40,
     381. y: 40
     382. })
     383. .onClick(() => {
     384. this.getUIContext().getRouter().back();
     385. })


     388. // 实时扫码码图中心点位置
     389. if (this.scanFlag && this.scanCodeRect.length > 0) {
     390. ForEach(this.scanCodeRect, (item: scanBarcode.ScanCodeRect) => {
     391. Image($rawfile('scan_selected2.svg')) // src/main/resources/rawfile/scan_selected2.svg
     392. .width(40)
     393. .height(40)
     394. .markAnchor({ x: 20, y: 20 })
     395. .position({
     396. x: (item.left + item.right) / 2 + this.offsetX,
     397. y: (item.top + item.bottom) / 2 + this.offsetY
     398. })
     399. }, (item: scanBarcode.ScanCodeRect) => '' + item.left + item.right)
     400. }
     401. }
     402. .width('100%')
     403. .height('100%')
     404. .backgroundColor(this.userGrant ? Color.Transparent : Color.Black)
     405. .onClick((event: ClickEvent) => {
     406. // 是否已扫描到结果
     407. if (this.scanFlag) {
     408. return;
     409. }
     410. // 点击屏幕位置，获取点击位置(x,y)，设置相机焦点
     411. let x1 = this.getUIContext().vp2px(event.displayY) / (this.displayHeight + 0.0);
     412. let y1 = 1.0 - (this.getUIContext().vp2px(event.displayX) / (this.displayWidth + 0.0));
     413. try {
     414. customScan.setFocusPoint({ x: x1, y: y1 });
     415. hilog.info(0x0001, TAG, `Succeeded in setting focusPoint x1: ${x1}, y1: ${y1}`);
     416. } catch (error) {
     417. hilog.error(0x0001, TAG, `Failed to set focusPoint. Code: ${error.code}, message: ${error.message}`);
     418. }
     419. setTimeout(() => {
     420. try {
     421. customScan.resetFocus();
     422. } catch (error) {
     423. hilog.error(0x0001, TAG, `Failed to reset focus. Code: ${error.code}, message: ${error.message}`);
     424. }
     425. }, 200);
     426. })
     427. .gesture(PinchGesture({ fingers: 2 })
     428. .onActionStart(() => {
     429. hilog.info(0x0001, TAG, 'Pinch start');
     430. })
     431. .onActionUpdate((event: GestureEvent) => {
     432. if (event) {
     433. this.scaleValue = event.scale;
     434. }
     435. })
     436. .onActionEnd(() => {
     437. // 是否已扫描到结果
     438. if (this.scanFlag) {
     439. return;
     440. }
     441. // 获取双指缩放比例，设置变焦比
     442. try {
     443. let zoom = this.customGetZoom();
     444. this.pinchValue = this.scaleValue * zoom;
     445. this.customSetZoom(this.pinchValue);
     446. hilog.info(0x0001, TAG, 'Pinch end');
     447. } catch (error) {
     448. hilog.error(0x0001, TAG, `Failed to set zoom. Code: ${error.code}, message: ${error.message}`);
     449. }
     450. }))
     451. }

     453. public customGetZoom(): number {
     454. let zoom = 1;
     455. try {
     456. zoom = customScan.getZoom();
     457. hilog.info(0x0001, TAG, `Succeeded in getting zoom, zoom: ${zoom}`);
     458. } catch (error) {
     459. hilog.error(0x0001, TAG, `Failed to get zoom. Code: ${error.code}, message: ${error?.message}`);
     460. }
     461. return zoom;
     462. }

     464. public customSetZoom(pinchValue: number): void {
     465. try {
     466. customScan.setZoom(pinchValue);
     467. hilog.info(0x0001, TAG, `Succeeded in setting zoom.`);
     468. } catch (error) {
     469. hilog.error(0x0001, TAG, `Failed to set zoom. Code: ${error.code}, message: ${error?.message}`);
     470. }
     471. }
     472. }
     ```
5. 通过scanCodeRect数据可确定码图中心点的位置。
   * 以设备竖屏、充电口向下为例，使用说明如下。
     + scanCodeRect的四个点坐标如下，可根据坐标点绘制码图外围矩形框
       - 左上角(x, y)：(left, top)
       - 右上角(x, y)：(right, top)
       - 左下角(x, y)：(left, bottom)
       - 右下角(x, y)：(right, bottom)
     + 由于码图中心点坐标需和XComponent的坐标保持一致，如果XComponent的x轴和y轴存在偏移，则码图位置需做相应的偏移。例如：x轴偏移量为：offsetX；y轴偏移量为：offsetY，中心点坐标最终转换为：
       - x = (left + right) / 2 + offsetX
       - y = (top + bottom) / 2 + offsetY
   * 如果设备涉及旋转，码图中心点位置需要根据屏幕旋转角度([Display.rotation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#属性))进行变换，以保证在各旋转角度下码图中心位置正确。推荐参考[示例工程](https://gitcode.com/HarmonyOS_Samples/scan-kit_-sample-code_-clientdemo_-arkts)。

     例如：XComponent宽度为width，高度为height，x轴偏移量为offsetX，y轴偏移量为offsetY：

     + 当[Display.rotation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#属性) = 0时，中心点坐标为：
       - x = (left + right) / 2 + offsetX
       - y = (top + bottom) / 2 + offsetY
     + 当[Display.rotation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#属性) = 1时，中心点坐标为：
       - x = width - (top + bottom) / 2 + offsetX
       - y = (left + right) / 2 + offsetY
     + 当[Display.rotation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#属性) = 2时，中心点坐标为：
       - x = width - (left + right) / 2 + offsetX
       - y = height - (top + bottom) / 2 + offsetY
     + 当[Display.rotation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#属性) = 3时，中心点坐标为：
       - x = (top + bottom) / 2 + offsetX
       - y = height - (left + right) / 2+ offsetY

   说明

   从5.0.2(14)开始，由于屏幕Display对象rotation和orientation属性变更，设备旋转不同角度后码图的位置需要重新适配。
   * 对于5.0.2(14)之前版本，可以使用Display对象中的rotation或者orientation属性处理设备旋转不同角度后的码图位置，且需要针对设备类型做特殊适配。
   * 对于5.0.2(14)及之后版本，需要统一使用Display对象的rotation属性处理设备旋转不同角度后的码图位置，无需针对设备类型做特殊适配。

## 模拟器开发

部分接口支持模拟器开发，模拟器使用指导请参见[使用模拟器运行应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-run-emulator)。

* 从6.0.0(20)版本开始，模拟器支持部分自定义界面扫码接口开发（支持的接口包括[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section447114223245)、[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section38711535114711)、[stop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section6949611114915)、[release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section1109456134917)、[rescan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section19244173211169)），可实现自定义界面扫码能力的基本功能验证。
* 模拟器自定义界面扫码能力仅支持1280\*720分辨率，开发者传入其他分辨率会统一转换成1280\*720。