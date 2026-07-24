## 场景介绍

应用通过调用Device Security Kit的checkUrlThreat接口检测URL是否为恶意的，并且根据检测结果来提示或拦截该URL。

典型场景：用户访问网址时，判断用户访问的URL是否为恶意网址，对于恶意网址，提示或拦截用户的访问风险。

## 约束与限制

* URL检测能力支持Phone、Tablet、PC/2in1设备。并且从5.1.0(18)版本开始，新增支持Wearable设备。
* 每个应用在每个设备上每天最多可以调用1万次接口；每个设备上最多支持5个并发调用。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/55/v3/5_dgomCjTSq6HGJWC1H2VQ/zh-cn_image_0000002514988413.png?HW-CC-KV=V1&HW-CC-Date=20260414T043131Z&HW-CC-Expire=86400&HW-CC-Sign=6ED37D8DE11614C1227B1FBA73F6FD8A33DE689F196E44719BA637EBF0DC8B6E "点击放大")

**流程说明：**

1. 开发者应用调用URL检测（checkUrlThreat）接口，传入待检测的URL，并获得URL检测结果。

   Device Security Kit将请求发送到华为服务器检测URL风险，并将检测结果返回给您的应用（NORMAL、PHISHING、MALWARE、OTHERS）。
2. 开发者应用可以根据检测结果来决定业务处理策略。

## 接口说明

以下是URL检测相关接口，包括ArkTS API，更多接口及使用方法请参见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-arktsapi)。

展开

| 接口名 | 描述 |
| --- | --- |
| checkUrlThreat(req: UrlCheckRequest): Promise<UrlCheckResponse> | 检测URL风险 |

## 开发步骤

说明

请确保已打开“[安全检测服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/devicesecurity-deviceverify-activateservice)”开关并[申请Profile](https://developer.huawei.com/consumer/cn/doc/app/agc-help-profile-0000002270709473)。

1. 导入Device Security Kit模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { safetyDetect } from '@kit.DeviceSecurityKit';
   2. import { BusinessError} from '@kit.BasicServicesKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 调用接口获取URL检测结果。

   注意

   该接口涉及端云协同，需要联网等耗时操作，因此不要在UI线程中执行，避免阻塞UI线程。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const TAG = "SafetyDetectJsTest";

   3. // 请求URL检测，并处理结果
   4. let req : safetyDetect.UrlCheckRequest = {
   5. urls : ['https://test1.com']
   6. };
   7. try {
   8. hilog.info(0x0000, TAG, 'CheckUrlThreat begin.');
   9. const data: safetyDetect.UrlCheckResponse = await safetyDetect.checkUrlThreat(req);
   10. hilog.info(0x0000, TAG, 'Succeeded in checkUrlThreat: %{public}s %{public}d', data.results[0].url, data.results[0].threat);
   11. } catch (err) {
   12. let e: BusinessError = err as BusinessError;
   13. hilog.error(0x0000, TAG, 'CheckUrlThreat failed: %{public}d %{public}s', e.code, e.message);
   14. }
   ```