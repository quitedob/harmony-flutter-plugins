通过应用评论服务，用户无需进入应用市场应用详情页，可以直接在应用内进行评论。

说明

从版本6.0.0(20)开始，支持拉起应用评论弹框。

## 场景介绍

* 拉起应用评论弹框

  开发者可以通过该接口拉起应用评论弹窗对应用进行评分及评论，无需进入应用市场应用详情页进行评论。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/63/v3/6QphbbTbT4aNC-qCf7AnVQ/zh-cn_image_0000002459177040.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T025315Z&HW-CC-Expire=86400&HW-CC-Sign=A880B3B7C1E3080C3600B937D01338B347F04AFF9EFBA8AE2F5DE4AD9C41DE3C "点击放大")

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ac/v3/OjB48AaDSI6nc0luLW0zmg/zh-cn_image_0000002459177036.png?HW-CC-KV=V1&HW-CC-Date=20260414T025315Z&HW-CC-Expire=86400&HW-CC-Sign=766EA9967A0D974F68026287CCCEF5DEE3C3E6D5611EC30721B3FE3DCD5CE172 "点击放大")

1. 用户需要在应用内评论应用。
2. 应用调用showCommentDialog接口拉起应用评论弹窗。
3. AppGalleryKit返回接口调用结果给应用。
4. 应用返回评论窗口给用户。

## 约束与限制

应用评论服务不支持模拟器，请使用真机调试。

## 接口说明

应用评论服务提供以下接口，具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/appgallery-commentmanager)。

展开

| 接口名 | 描述 |
| --- | --- |
| [showCommentDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/appgallery-commentmanager#section887383520415)(context: common.UIExtensionContext | common.UIAbilityContext): Promise<void> | 拉起应用评论弹窗，用户可以在应用内评论应用。 |

## 开发步骤

1. 导入commentManager模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { commentManager} from '@kit.AppGalleryKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';
   4. import type { common } from '@kit.AbilityKit';
   ```
2. 调用[showCommentDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/appgallery-commentmanager#section887383520415)方法拉起评论弹窗。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. const uiContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
   3. commentManager.showCommentDialog(uiContext).then(()=>{
   4. hilog.info(0, 'TAG', "succeeded in showing commentDialog.");
   5. }).catch((error: BusinessError<Object>) => {
   6. hilog.error(0, 'TAG', `showCommentDialog failed, Code: ${error.code}, message: ${error.message}`);
   7. });
   8. } catch (error) {
   9. hilog.error(0, 'TAG', `showCommentDialog failed, Code: ${error.code}, message: ${error.message}`);
   10. }
   ```