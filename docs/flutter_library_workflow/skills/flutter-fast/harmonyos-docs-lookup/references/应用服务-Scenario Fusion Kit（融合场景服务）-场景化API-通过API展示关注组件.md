## 场景介绍

从6.0.1(21)版本开始，支持关注组件API功能。

Scenario Fusion Kit提供服务号关注组件功能，调用该接口可以在业务应用/元服务页面展示服务号关注组件，用户点击关注按钮可关注上对应服务号。

* 用户关注服务号成功，按钮会变为已关注并置灰，在1.5秒后关注组件会自动消失。
* 用户关注服务号失败，则会出现错误提示。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/13/v3/WR_gCNHQSH2kc14Nj3ASlw/zh-cn_image_0000002475506228.png?HW-CC-KV=V1&HW-CC-Date=20260414T033029Z&HW-CC-Expire=86400&HW-CC-Sign=A785B96D70949BE86EC2C11708926BD4DE9E59FA48CE4B3377DE385242E986CF)![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6f/v3/N2qJRWuuSJuu02pRmcDhIA/zh-cn_image_0000002475346308.png?HW-CC-KV=V1&HW-CC-Date=20260414T033029Z&HW-CC-Expire=86400&HW-CC-Sign=ABD47A2AB35E531A749133372DAA8EF2CDA19B75D7A8B472FEBCFB656E70C79C)

## 前提条件

在[华为开发者联盟服务号管理首页](https://developer.huawei.com/consumer/cn/console/service/FastService/service/1063)，申请华为服务号，并获取服务号id。

1. 使用企业开发者账号登录，并完成企业认证。
2. 申请服务号并完成认证。
3. 元服务/应用须与服务号处于同一个开发者账号下。

## 接口说明

以下是关注组件的接口说明，更多接口及使用方法请参见[atomicService（融合场景化API）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-atomicservice)。

展开

| 接口名 | 描述 |
| --- | --- |
| [showFollowComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-atomicservice#section13456131695414)(ctx: [UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-api#uicontext), params: [FollowComponentParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-atomicservice#section1881114501476), callback: [FollowComponentCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-atomicservice#section137361343174413)): Promise<void> | 调用该方法展示关注组件。 |

## 开发步骤

1. 导入Scenario Fusion Kit模块以及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { atomicService } from '@kit.ScenarioFusionKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 在需要添加关注组件的页面，调用接口展示关注组件，示例代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. aboutToAppear(): void {
   5. // 一键关注组件。
   6. // pubId: 服务号id，此处以官方小助手服务号id为例。
   7. const pubId: string = '0cca1c645526449fb89d4a83e3bc25df';
   8. // channelId：渠道id，长度限制32，只能是数字或字母组成; offset：设置关注组件的位置坐标。
   9. const params: atomicService.FollowComponentParams =
   10. { pubId: pubId, channelId: '', offset: { x: 0, y: 300 } };
   11. // 点击关注按钮的关注结果回调。
   12. const callbacks: atomicService.FollowComponentCallback = {
   13. onFollowComplete: (err, result) => {
   14. if (err) {
   15. // 错误日志处理。
   16. hilog.error(0x0000, "testTag", "error: %{public}d %{public}s", err.code, err.message);
   17. return;
   18. }
   19. hilog.info(0x0000, "testTag", "follow result: %{public}d", result.code);
   20. if (result.code === atomicService.FollowResult.SUCCESS) {
   21. hilog.info(0x0000, "testTag", "follow succeeded handle");
   22. } else {
   23. hilog.info(0x0000, "testTag", "follow failed handle");
   24. }
   25. }
   26. }
   27. // 展示关注组件。
   28. atomicService.showFollowComponent(this.getUIContext(), params, callbacks).catch((error: BusinessError<void>) => {
   29. hilog.error(0x0000, 'testTag', 'showFollowComponent failReason: %{public}d %{public}s:', error.code,
   30. error.message);
   31. })
   32. }

   34. build() {
   35. }
   36. }
   ```