## 场景介绍

生态查询服务可以为您提供应用/元服务运行信息的查询，当前提供场景值查询和广告验签信息查询。场景值是用来描述用户进入应用和元服务的路径。您可以通过本服务，来查询您的元服务/应用是通过何种场景被打开的（[场景值列表](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/appgallery-scene-list#section126341258847)）。当前我们支持元服务的场景值查询，后续我们会继续公布应用场景值的查询。广告验签版本查询只在您的应用涉及广告场景下才会被使用到。您可以通过本查询服务，查询广告验签参数处理逻辑。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/99/v3/2gWvPC5SRSiLV0mOwaqrXA/zh-cn_image_0000002459017320.png?HW-CC-KV=V1&HW-CC-Date=20260414T025025Z&HW-CC-Expire=86400&HW-CC-Sign=B4C8275AB427EB431E22716A7443DCE194BFFDFF1E06EF0DC41EA73BF3C40974 "点击放大")

1. 用户需要查询应用/元服务自身场景值或者查询广告验签版本。
2. 应用调用[getSelfSceneCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-scenemanager#section145261628122720)接口和[getAdsVerificationVersion](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-scenemanager#section552702811279)接口分别获取自身场景值和广告验签版本。
3. 返回自身场景值和广告验签版本给应用/元服务。
4. 返回结果给用户。

## 约束与限制

* 生态查询服务支持Phone、Tablet、PC/2in1设备。并且从5.1.1(19)版本开始，新增支持TV设备。
* 如果应用或者元服务没有产生场景值，调用[getSelfSceneCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-scenemanager#section145261628122720)接口返回的场景值为空。
* 生态查询服务不支持模拟器，请使用真机调试。

## 接口说明

生态查询服务场景提供以下接口，具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-scenemanager)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getSelfSceneCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-scenemanager#section145261628122720)():string | 获取自身场景值。 |
| [getAdsVerificationVersion](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-scenemanager#section552702811279)(): number | 查询广告验签版本。 |

## 开发步骤

### 查询自身场景值

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { hilog } from '@kit.PerformanceAnalysisKit';
   2. import { sceneManager } from '@kit.AppGalleryKit';
   ```
2. 调用[getSelfSceneCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-scenemanager#section145261628122720)方法。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. const sceneCode: string = sceneManager.getSelfSceneCode();
   3. hilog.info(0, 'TAG', "Succeeded in getting SelfSceneCode res = " + sceneCode);
   4. } catch (error) {
   5. hilog.error(0, 'TAG', `getSelfSceneCode failed. code is ${error.code}, message is ${error.message}`);
   6. }
   ```

### 查询广告验签版本

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { hilog } from '@kit.PerformanceAnalysisKit';
   2. import { sceneManager } from '@kit.AppGalleryKit';
   ```
2. 调用[getAdsVerificationVersion](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-scenemanager#section552702811279)方法。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. const version: number = sceneManager.getAdsVerificationVersion();
   3. hilog.info(0, 'TAG', "Succeeded in getting AdsVerificationVersion res = " + version);
   4. } catch (error) {
   5. hilog.error(0, 'TAG', `getAdsVerificationVersion failed. code is ${error.code}, message is ${error.message}`);
   6. }
   ```