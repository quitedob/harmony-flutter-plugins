## 场景介绍

用户在设备上首次使用运动健康服务时，需要用户同意运动健康服务隐私协议，当前隐私授权依赖运动健康App，需引导用户打开运动健康App并完成隐私授权。

开发者调用后续章节的接口后，如果返回错误码[1002703001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section9390213122310)，可参考本章节，引导用户同意运动健康服务隐私授权。

## 开发步骤

1. 在module.json5文件中增加querySchemes字段，并在列表中配置"huaweischeme"。

   "huaweischeme"为需要跳转到的运动健康App首页的scheme，页面参考如下：

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/89/v3/4ELOh1wWRqGRX9RkvTRC8Q/zh-cn_image_0000002509334439.png?HW-CC-KV=V1&HW-CC-Date=20260414T030603Z&HW-CC-Expire=86400&HW-CC-Sign=DFAAF6ED566D205046D364D0E2375BA868F8D1F5E529B7E14C7C9C7AB0205CA7)
2. 导入相关功能模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { bundleManager, common, Want } from '@kit.AbilityKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   3. import { productViewManager } from '@kit.AppGalleryKit';
   4. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
3. 调用[canOpenLink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager#bundlemanagercanopenlink12)判断运动健康App是否安装。
   * 已安装则调用[openLink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#openlink12)接口拉起运动健康App；
   * 未安装调用[应用市场推荐](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/store-productview#section729012543213)接口，引导用户下载运动健康App。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. let result = bundleManager.canOpenLink('huaweischeme://healthapp/home/main');
   3. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
   4. if (result) {
   5. // 拉起运动健康App首页，进行隐私授权
   6. let link: string = 'huaweischeme://healthapp/home/main';
   7. await context.openLink(link)
   8. } else {
   9. // 拉起应用市场推荐，引导用户下载运动健康App，进行隐私授权
   10. const wantParam: Want = {
   11. parameters: {
   12. bundleName: 'com.huawei.hmos.health'
   13. }
   14. };
   15. const callback: productViewManager.ProductViewCallback = {
   16. onError: (error: BusinessError) => {
   17. hilog.error(0x0001, 'TAG', `Failed to open AppGallery.Code: ${error.code}, message: ${error.message}`);
   18. }
   19. }
   20. productViewManager.loadProduct(context, wantParam, callback);
   21. }
   22. } catch (err) {
   23. hilog.error(0x0000, 'testTag', `Failed to agree user privacy.Code: ${err.code}, message: ${err.message}`);
   24. }
   ```