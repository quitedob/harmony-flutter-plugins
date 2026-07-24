## 场景介绍

激励广告是一种全屏幕的视频广告，用户可以选择点击观看，以换取相应奖励。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/95/v3/7nnYBbjPTlGlgFJqb6g8rw/zh-cn_image_0000002305340516.png?HW-CC-KV=V1&HW-CC-Date=20260414T025010Z&HW-CC-Expire=86400&HW-CC-Sign=61B57EDA9155AB7C840137D5D737DBBAE3432177B9A85626E984948C8611C8F1)

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [loadAd](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-advertising#loadad)(adParam: AdRequestParams, adOptions: AdOptions, listener: AdLoadListener): void | 请求单广告位广告，通过AdRequestParams、AdOptions进行广告请求参数设置，通过AdLoadListener监听广告请求回调。 |
| [showAd](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-advertising#showad)(ad: Advertisement, options: AdDisplayOptions, context?: common.UIAbilityContext): void | 展示广告，通过AdDisplayOptions进行广告展示参数设置。  **说明：**为了保证广告能正确展示，该接口必须和请求广告接口配套使用。 |

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
   3. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 获取OAID。

   若需提升广告推送精准度，可以在请求参数[AdRequestParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-advertising#adrequestparams)中添加oaid属性。

   如何获取OAID参见[获取OAID信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/oaid-service)。

   说明

   使用以下示例中提供的测试广告位时，必须先获取OAID信息。
3. 请求单广告位广告。

   需要先创建一个AdLoader对象，通过AdLoader的[loadAd](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-advertising#loadad)方法请求广告，最后通过[AdLoadListener](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-advertising#adloadlistener)，来监听广告的加载状态。

   请求广告关键参数如下所示：

   展开

   | 请求广告参数名 | 类型 | 必填 | 说明 |
   | --- | --- | --- | --- |
   | adType | number | 是 | 请求广告类型，激励广告类型为7。 |
   | adId | string | 是 | 广告位ID。  * 如果仅调测广告，可使用测试广告位ID：testx9dtjwj8hp。 * 如果要接入正式广告，则需要申请正式的广告位ID。可在应用发布前进入[流量变现官网](https://developer.huawei.com/consumer/cn/monetize)，点击“开始变现”，登录[鲸鸿动能媒体服务平台](https://developer.huawei.com/consumer/cn/service/ads/publisher/html/index.html?lang=zh)进行申请，具体操作详情请参见[展示位创建](https://developer.huawei.com/consumer/cn/doc/monetize/zhanshiweichuangjian-0000001132700049)。 |
   | oaid | string | 否 | 开放匿名设备标识符，用于精准推送广告。不填无法获取到个性化广告。 |

   示例代码如下所示：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. private context: common.UIAbilityContext = this.getUIContext().getHostContext() as common.UIAbilityContext;

   6. build() {
   7. Column() {
   8. Button('LoadAd')
   9. .onClick(() => {
   10. this.loadAd();
   11. })
   12. }
   13. .width('100%')
   14. .height('100%')
   15. .justifyContent(FlexAlign.Center)
   16. }

   18. private async loadAd(): Promise<void> {
   19. // 广告请求回调监听
   20. const adLoadListener: advertising.AdLoadListener = {
   21. // 广告请求失败回调
   22. onAdLoadFailure: (errorCode: number, errorMsg: string) => {
   23. hilog.error(0x0000, 'testTag', `Failed to load ad. Code is ${errorCode}, message is ${errorMsg}`);
   24. },
   25. // 广告请求成功回调
   26. onAdLoadSuccess: (ads: Array<advertising.Advertisement>) => {
   27. hilog.info(0x0000, 'testTag', 'Succeeded in loading ad');
   28. // ...
   29. }
   30. };
   31. // 广告请求参数
   32. const adRequestParams: advertising.AdRequestParams = {
   33. // 'testx9dtjwj8hp'为测试专用的广告位ID，App正式发布时需要改为正式的广告位ID
   34. adId: 'testx9dtjwj8hp',
   35. // 激励广告类型
   36. adType: 7,
   37. // 开放匿名设备标识符
   38. oaid: await requestOAID(this.context)
   39. };
   40. // 广告配置参数，开发者可根据项目实际情况设置
   41. const adOptions: advertising.AdOptions = {};
   42. // 创建AdLoader广告对象
   43. const adLoader: advertising.AdLoader = new advertising.AdLoader(this.context);
   44. try {
   45. // 调用广告请求接口
   46. adLoader.loadAd(adRequestParams, adOptions, adLoadListener);
   47. } catch (e) {
   48. hilog.error(0x0000, 'testTag', `Failed to load ad. Code is ${e.code}, message is ${e.message}`);
   49. }
   50. }
   51. }

   53. async function requestOAID(context: Context): Promise<string | undefined> {
   54. // 向用户请求授权广告跨应用关联访问权限
   55. let isPermissionGranted: boolean = false;
   56. try {
   57. const atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
   58. const result: PermissionRequestResult =
   59. await atManager.requestPermissionsFromUser(context, ['ohos.permission.APP_TRACKING_CONSENT']);
   60. isPermissionGranted = result.authResults[0] === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED;
   61. } catch (err) {
   62. hilog.error(0x0000, 'testTag', `Failed to request permission. Code is ${err.code}, message is ${err.message}`);
   63. }
   64. if (isPermissionGranted) {
   65. hilog.info(0x0000, 'testTag', 'Succeeded in requesting permission');
   66. try {
   67. const oaid = await identifier.getOAID();
   68. hilog.info(0x0000, 'testTag', 'Succeeded in getting OAID');
   69. return oaid;
   70. } catch (err) {
   71. hilog.error(0x0000, 'testTag', `Failed to get OAID. Code is ${err.code}, message is ${err.message}`);
   72. }
   73. } else {
   74. hilog.error(0x0000, 'testTag', 'Failed to request permission. User rejected');
   75. }
   76. return undefined;
   77. }
   ```

### 事件订阅

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError, commonEventManager } from '@kit.BasicServicesKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 事件订阅。

   开发者需要在应用中订阅com.huawei.hms.pps.action.PPS\_REWARD\_STATUS\_CHANGED事件来监听激励广告页面变化并接收奖励信息。

   在订阅到公共事件后，可以从[CommonEventData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-commonevent-commoneventdata)的parameters参数中获取激励广告页面变化状态和奖励信息。

   * 使用reward\_ad\_status作为key值获取激励广告页面变化状态，涉及的页面变化状态如下所示：

     展开

     | 页面变化状态 | 说明 |
     | --- | --- |
     | onAdOpen | 打开广告。 |
     | onAdClick | 点击广告。 |
     | onAdClose | 关闭广告。 |
     | onAdReward | 广告获得奖励。 |
     | onVideoPlayBegin | 广告视频开始播放。 |
     | onVideoPlayEnd | 广告视频播放结束。 |
   * 使用reward\_ad\_data作为key值获取奖励信息，其中：
     + 属性rewardType用来获取奖励物品的名称。
     + 属性rewardAmount用来获取奖励物品的数量。

   示例代码如下所示：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const KEY_REWARD_DATA = 'reward_ad_data';
   2. const KEY_REWARD_STATUS = 'reward_ad_status';

   4. export class RewardAdStatusHandler {
   5. // 用于保存创建成功的订阅者对象，后续使用其完成订阅及退订的动作
   6. private subscriber: commonEventManager.CommonEventSubscriber | null = null;

   8. // 订阅方法，需要在每次展示广告前调用
   9. public registerPPSReceiver(): void {
   10. if (this.subscriber) {
   11. this.unRegisterPPSReceiver();
   12. }
   13. // 订阅者信息
   14. const subscribeInfo: commonEventManager.CommonEventSubscribeInfo = {
   15. events: ['com.huawei.hms.pps.action.PPS_REWARD_STATUS_CHANGED'],
   16. // publisherBundleName被设置为"com.huawei.hms.adsservice"，表示只有来自该包名的事件才会被订阅者接收和处理。
   17. // 如果没有明确声明publisherBundleName，那么订阅者可能会收到来自其它包名的伪造事件，从而导致安全性问题或误导。
   18. publisherBundleName: 'com.huawei.hms.adsservice'
   19. };
   20. // 创建订阅者回调
   21. commonEventManager.createSubscriber(subscribeInfo, (err: BusinessError, commonEventSubscriber:
   22. commonEventManager.CommonEventSubscriber) => {
   23. if (err) {
   24. hilog.error(0x0000, 'testTag', `Failed to create subscriber. Code is ${err.code}, message is ${err.message}`);
   25. return;
   26. }
   27. hilog.info(0x0000, 'testTag', 'Succeeded in creating subscriber');
   28. this.subscriber = commonEventSubscriber;
   29. // 订阅公共事件回调
   30. commonEventManager.subscribe(this.subscriber, (err: BusinessError, commonEventSubscriber:
   31. commonEventManager.CommonEventData) => {
   32. if (err) {
   33. hilog.error(0x0000, 'testTag', `Failed to subscribe. Code is ${err.code}, message is ${err.message}`);
   34. } else {
   35. hilog.info(0x0000, 'testTag', 'Succeeded in subscribing data');
   36. const status: string = commonEventSubscriber?.parameters?.[KEY_REWARD_STATUS];
   37. switch (status) {
   38. case 'onAdOpen':
   39. hilog.info(0x0000, 'testTag', 'Status is onAdOpen');
   40. break;
   41. case 'onAdClick':
   42. hilog.info(0x0000, 'testTag', 'Status is onAdClick');
   43. break;
   44. case 'onAdClose':
   45. hilog.info(0x0000, 'testTag', 'Status is onAdClose');
   46. this.unRegisterPPSReceiver();
   47. break;
   48. case 'onAdReward':
   49. const rewardData: Record<string, string | number> = commonEventSubscriber?.parameters?.[KEY_REWARD_DATA];
   50. const rewardType: string = rewardData?.rewardType as string;
   51. const rewardAmount: number = rewardData?.rewardAmount as number;
   52. hilog.info(0x0000, 'testTag', `Status is onAdReward. Type is ${rewardType}, Amount is ${rewardAmount}`);
   53. break;
   54. case 'onVideoPlayBegin':
   55. hilog.info(0x0000, 'testTag', 'Status is onVideoPlayBegin');
   56. break;
   57. case 'onVideoPlayEnd':
   58. hilog.info(0x0000, 'testTag', 'Status is onVideoPlayEnd');
   59. break;
   60. default:
   61. break;
   62. }
   63. }
   64. });
   65. });
   66. }

   68. // 取消订阅
   69. public unRegisterPPSReceiver(): void {
   70. commonEventManager.unsubscribe(this.subscriber, (err: BusinessError) => {
   71. if (err) {
   72. hilog.error(0x0000, 'testTag', `Failed to unsubscribe. Code is ${err.code}, message is ${err.message}`);
   73. } else {
   74. hilog.info(0x0000, 'testTag', 'Succeeded in unsubscribing');
   75. this.subscriber = null;
   76. }
   77. });
   78. }
   79. }
   ```

### 展示广告

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { advertising } from '@kit.AdsKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';
   4. // 事件订阅步骤中创建的文件
   5. import { RewardAdStatusHandler } from './RewardAdStatusHandler';
   ```
2. 展示广告。

   开发者需要调用[showAd](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-advertising#showad)方法来展示广告，ads为[请求广告](/consumer/cn/doc/harmonyos-guides/ads-publisher-service-reward#section1392312617269)返回的广告信息，在每次展示广告前需要注册[事件订阅](/consumer/cn/doc/harmonyos-guides/ads-publisher-service-reward#section395845163219)中定义的监听器。

   示例代码如下所示：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. private context: common.UIAbilityContext = this.getUIContext().getHostContext() as common.UIAbilityContext;

   6. build() {
   7. // ...
   8. }

   10. private async loadAd(): Promise<void> {
   11. // 广告请求回调监听
   12. const adLoadListener: advertising.AdLoadListener = {
   13. // 广告请求失败回调
   14. onAdLoadFailure: (errorCode: number, errorMsg: string) => {
   15. hilog.error(0x0000, 'testTag', `Failed to load ad. Code is ${errorCode}, message is ${errorMsg}`);
   16. },
   17. // 广告请求成功回调
   18. onAdLoadSuccess: (ads: Array<advertising.Advertisement>) => {
   19. hilog.info(0x0000, 'testTag', 'Succeeded in loading ad');
   20. try {
   21. // 注册激励广告状态监听器
   22. new RewardAdStatusHandler().registerPPSReceiver();
   23. // 广告展示参数，开发者可根据项目实际情况设置
   24. const adDisplayOptions: advertising.AdDisplayOptions = {
   25. // 是否静音
   26. mute: true,
   27. // ...
   28. };
   29. // 此处ads[0]表示请求到的第一个广告，开发者可根据项目实际情况选择
   30. advertising.showAd(ads[0], adDisplayOptions, this.context);
   31. } catch (e) {
   32. hilog.error(0x0000, 'testTag', `Failed to show ad. Code is ${e.code}, message is ${e.message}`);
   33. }
   34. }
   35. };
   36. // ...
   37. }
   38. }
   ```

## 校验激励广告服务端验证回调

服务端验证回调是指鲸鸿动能平台发送给媒体服务器的网址请求，其中带有特定的查询参数，用来通知媒体服务器某位用户因为与激励视频广告互动而应予以奖励，从而规避欺骗的行为。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/97/v3/ne9uwc5mQQ6Dv0I-HlfPag/zh-cn_image_0000002339339821.png?HW-CC-KV=V1&HW-CC-Date=20260414T025010Z&HW-CC-Expire=86400&HW-CC-Sign=B49D5AD21F0AFC70E1282674FFD4872EA128F4C463DB0316D442FB58C9B2185A "点击放大")

### 奖励用户

* 在给用户发奖励时，要把握好用户体验和奖励验证之间的平衡。由于服务器端回调会存在延迟的情况，因此我们建议客户端立即奖励用户，同时在收到服务器端回调时对所有奖励进行验证。这种做法可确保奖励符合发放条件，同时提供良好的用户体验。
* 对于某些应用而言，奖励是否达到发放条件非常重要，用户可适当接受延迟。这时，推荐做法是等待服务器端回调完成验证，再向用户发放奖励。

### 校验服务端验证回调

说明

App上架至华为应用市场（AppGallery）时间超过12小时才可以收到回调。

1. 设置激励广告的奖励配置。

   您在[鲸鸿动能媒体服务平台](https://developer.huawei.com/consumer/cn/service/ads/publisher/html/index.html?lang=zh)上申请激励视频广告位时选择“媒体管理（点击媒体名）> 新增展示位 > 选择激励视频（点击下一步，进入编辑页面）”，设置奖励类型和奖励数量，并点击“高级设置”，设置服务器端验证的URL。如下图：

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5b/v3/q5nBw7PUSfK2IV29x6JX-Q/zh-cn_image_0000002305340528.png?HW-CC-KV=V1&HW-CC-Date=20260414T025010Z&HW-CC-Expire=86400&HW-CC-Sign=581A3CC6E6F90A35088C2166D30652C3D6853E694D6761B3B89BBA8917FD9EB7)
2. （可选）设置自定义数据customData和userId。

   您在[展示广告第2点](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ads-publisher-service-reward#section16597193515555)之前可以设置自定义数据customData和userId。示例代码如下所示：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { advertising } from '@kit.AdsKit';

   3. // 广告展示参数，开发者可根据项目实际情况设置
   4. const adDisplayOptions: advertising.AdDisplayOptions = {
   5. // 是否静音
   6. mute: true,
   7. // 设置自定义数据
   8. customData: 'CUSTOM_DATA',
   9. // 设置自定义用户id
   10. userId: '1234567'
   11. };
   ```

   说明

   如果没有设置customData和userId，不影响发放奖励事件上报但是服务端验证的参数中没有这两个字段。如果设置customData和userId，必须在展示广告之前设置并且URLEncode之后，长度不超过1024个字符，否则影响服务端验证。
3. 获取要验证的内容。

   用户观看完激励广告时，鲸鸿动能平台服务端会把需要验证的参数以及keyId和sign传给媒体提供的URL：https://www.example.com/feedback（[即第1点中配置的验证URL](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ads-publisher-service-reward#section77672242539)）。请求体样例：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "adId" : "testx9dtjwj8hp",
   3. "data" : "CUSTOM_DATA",
   4. "keyId" : "12345678",
   5. "rewardAmount" : "10",
   6. "rewardName" : "金币",
   7. "sign" : "OA33u6mypnhE4hbmF32N/ibYi1uXt72nDDyYMwjDI6JXVVFKePZYo4F7Fuk2MaG......",
   8. "uniqueId" : "3361626337333932313435313430373438383561376265636130393939313166",
   9. "userId" : "1234567"
   10. }
   ```

   服务器端验证回调查询参数说明：

   展开

   | 参数名称 | 类型 | 是否必选 | 描述 |
   | --- | --- | --- | --- |
   | adId | String | 是 | 激励视频广告位ID |
   | data | String | 否 | 自定义数据字符串 |
   | keyId | String | 是 | 验证回调的密钥 |
   | rewardAmount | String | 否 | 奖励数量 |
   | rewardName | String | 否 | 奖励奖品 |
   | sign | String | 是 | 回调的签名 |
   | uniqueId | String | 是 | 获奖事件生成的十六进制的标识符 |
   | userId | String | 否 | 用户ID |
4. 组装验证参数

   验证内容（除sign、keyId）格式顺序如下：

   adId={adId}&data={data}&rewardAmount={rewardAmount}&rewardName={rewardName}&uniqueId={uniqueId}&userId={userId}

   其中‘{}’里面表示参数的值，且参数顺序不能变。如果参数为null或者空字符串，则URL中不拼接该参数。然后用SHA256计算散列值，得到paramContentData。示例代码如下所示：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. String adId = request.getParameter("adId");
   2. String data = request.getParameter("data");
   3. // ...
   4. String userId = request.getParameter("userId");
   5. String param = "adId=" + adId + "&data=" + data + "&rewardAmount=" + rewardAmount + "&rewardName=" + rewardName + "&uniqueId=" + uniqueId + "&userId=" + userId;
   6. // sha256Value 为全小写数据
   7. String sha256Value = Sha256Util.digest(param);
   8. byte[] paramContentData = sha256Value.getBytes(Charset.forName("UTF-8"));
   ```

   可参考以下工具类计算散列值：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. public static String digest(String message) {
   2. if (TextUtils.isEmpty(message)) {
   3. return "";
   4. }
   5. byte[] content = message.getBytes(StandardCharsets.UTF_8);
   6. return bytesToHexString(digest(content));
   7. }

   9. public static byte[] digest(byte[] data) {
   10. try {
   11. MessageDigest md = MessageDigest.getInstance("SHA-256");
   12. return md.digest(data);
   13. } catch (NoSuchAlgorithmException e) {
   14. LOGGER.error("sha256 NoSuchAlgorithmException");
   15. }
   16. return new byte[]{};
   17. }

   19. public static String bytesToHexString(byte[] bytes) {
   20. if (null == bytes) {
   21. return "";
   22. }
   23. StringBuilder sb = new StringBuilder();
   24. for (int i = 0; i < bytes.length; i++) {
   25. String hex = Integer.toHexString(0xFF & bytes[i]);
   26. if (hex.length() == 1) {
   27. sb.append('0');
   28. }
   29. sb.append(hex);
   30. }
   31. return sb.toString();
   32. }
   ```
5. 获取公钥列表。

   a. 在[鲸鸿动能媒体服务平台](https://developer.huawei.com/consumer/cn/service/ads/publisher/html/index.html?lang=zh)上查看对应的账户信息时选择“账户”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fc/v3/XpllRc6rRhafmbJG_dJE-w/zh-cn_image_0000002305180796.png?HW-CC-KV=V1&HW-CC-Date=20260414T025010Z&HW-CC-Expire=86400&HW-CC-Sign=67C73429986D6CE5D09D075AE5EDEEDF1D1C0CF7E93C080A56AD4FDE016DEA36)

   通过点击上图所示的“获取密钥”按钮弹出如下所示的弹框，获取“开发者ID”和“密钥”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c9/v3/r63AeBcBR9-mO30-P-sKsQ/zh-cn_image_0000002339220017.png?HW-CC-KV=V1&HW-CC-Date=20260414T025010Z&HW-CC-Expire=86400&HW-CC-Sign=121B298D7524461438B7E4BE6B0C1BD365C9299F04CBA96F209CB43FE7BF1D20)

   b. 您根据应用分发区域不同，需要使用对应站点的接口URL去获取公钥列表，不同站点对应的接口URL如下所示：

   * 中国境内（香港特别行政区、澳门特别行政区、中国台湾除外）：https://ppscrowd-drcn.op.hicloud.com/action-lib-track/publickeys

   将body通过密钥进行HMAC-SHA256加密得到签名，替换到Authorization中，并设置“开发者ID”和Authorization到Header中。示例代码如下所示：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. String data = "";
   2. String url = "https://ppscrowd-dre.op.dbankcloud.com/action-lib-track/publickeys";
   3. String authorization = "Digest validTime=\"{0}\", response=\"{1}\"";
   4. // 开发者ID
   5. String userId = "YOUR_PUBLISHER_ID";
   6. // 密钥
   7. String key = "YOUR_KEY";

   9. HttpClient httpclient = HttpClients.createDefault();
   10. HttpGet request = new HttpGet();
   11. try {
   12. // 将body通过密钥进行HMAC-SHA256加密得到签名，替换到Authorization中
   13. String validTime = String.valueOf(System.currentTimeMillis());
   14. String body = validTime + ":/publickeys";
   15. byte[] keyBytes = Base64.decodeBase64(key);
   16. byte[] bodyBytes = body.getBytes(Charsets.UTF_8);

   18. Mac mac = Mac.getInstance("HmacSHA256");
   19. SecretKey secretKey = new SecretKeySpec(keyBytes, "HmacSHA256");
   20. mac.init(secretKey);
   21. byte[] signatureBytes = mac.doFinal(bodyBytes);

   23. String signature = (signatureBytes == null) ? null : Hex.encodeHexString(signatureBytes);
   24. authorization = MessageFormat.format(authorization, validTime, signature);
   25. // 设置开发者ID和Authorization到Header中
   26. request.setURI(new URI(url));
   27. request.setHeader("userId", userId);
   28. request.setHeader("Authorization", authorization);
   29. HttpResponse response = httpclient.execute(request);
   30. data = EntityUtils.toString(response.getEntity());
   31. } catch (Exception e) {
   32. System.out.println(e.getMessage());
   33. }
   ```

   返回data消息体（publicKey已匿名化）：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "keys": [
   3. {
   4. "keyId":"12345678",
   5. "publicKey":"LS0tLS1*******************************************************"
   6. },
   7. {
   8. "keyId": "22345678",
   9. "publicKey":"LS0tLS1*******************************************************"
   10. }
   11. ]
   12. }
   ```

   返回消息结构体：

   展开

   | 参数名称 | 类型 | 是否必选 | 描述 |
   | --- | --- | --- | --- |
   | keys | List<key> | 是 | 返回公钥列表 |

   * key结构体：

   展开

   | 参数名称 | 类型 | 是否必选 | 描述 |
   | --- | --- | --- | --- |
   | keyId | String | 是 | 密钥ID |
   | publicKey | String | 是 | 公钥 |
6. 执行验证。

   a. 根据keyId从公钥列表中找到对应的base64编码后的publicKey。

   b. 将paramContentData、publicKey、sign和SHA256withRSA数字签名算法的入参，执行验证。

   示例代码如下所示：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. public static boolean verify(byte[] data, String publicKey, String sign, String signatureAlgorithm) {
   2. try {
   3. byte[] keyBytes = base64Decode(publicKey);
   4. X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);
   5. KeyFactory keyFactory = KeyFactory.getInstance("RSA");
   6. PublicKey publicK = keyFactory.generatePublic(keySpec);
   7. Signature signature = Signature.getInstance(signatureAlgorithm);
   8. signature.initVerify(publicK);
   9. signature.update(data);
   10. return signature.verify(base64Decode(sign));
   11. } catch (InvalidKeyException | SignatureException | UnsupportedEncodingException | InvalidKeySpecException | NoSuchAlgorithmException e) {
   12. return false;
   13. }
   14. }

   16. private static byte[] base64Decode(String encoded) throws UnsupportedEncodingException {
   17. return Base64.decodeBase64(encoded.getBytes("UTF-8"));
   18. }
   ```