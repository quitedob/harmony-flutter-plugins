## 方案概述

位置感知推荐能力支持开发者云侧共享位置信息与关联推荐的内容，结合实时位置、设备状态与习惯标签完成系统智慧决策，在小艺建议智慧推荐更符合用户诉求的内容信息。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/75/v3/gU1q7sO5RpO8mEbcUf86KA/zh-cn_image_0000002402121921.png?HW-CC-KV=V1&HW-CC-Date=20260414T051259Z&HW-CC-Expire=86400&HW-CC-Sign=FFCE8F98ECBE5322890404CB61B25B27C17C23C05A0AAB520CBCF68DD592EC02 "点击放大")

## 开通近场服务权限

近场服务是华为软硬协同解决方案中的关键能力环节，旨在帮助商家触达更多HarmonyOS用户，并为这些用户提供更精准、更优质的服务。开通近场服务的步骤详情参考：[近场服务-申请开通权限](https://developer.huawei.com/consumer/cn/doc/app/agc-help-location-sense-apply-permission-0000002382902149)。

## 意图声明

以“搜索旅游攻略”特性为例，开发者首先要注册“查看旅游攻略”（viewTravelGuides），其他意图见[各垂域意图Schema](https://developer.huawei.com/consumer/cn/doc/service/intents-schema-0000001901962713)。

开发者需要编辑对应的意图配置insight\_intent.json文件实现意图声明。insight\_intent.json文件需要放置在任意一个module下面的指定目录：src/main/resources/base/profile/insight\_intent.json，并且整个工程中只能存在一个insight\_intent.json文件。

收起

自动换行

深色代码主题

复制

```
1. {
2. // 应用支持的意图列表
3. // 必须声明应用支持插件包含的必选意图，应用上架时会进行校验
4. "insightIntents": [
5. {
6. // 意图名称
7. // 名称应当遵循意图框架规范，当前仅支持预置垂域意图，不允许自定义
8. // 应用内意图名称唯一，不允许出现相同的名称定义
9. "intentName": "ViewTravelGuides",
10. // 意图所属的垂域
11. "domain": "TravelDomain",
12. // 意图版本号
13. // 插件引用意图时会校验该版本号，只有和插件定义的版本号一致才能正常调用
14. "intentVersion": "1.0.1",
15. // 意图调用逻辑入口
16. "srcEntry": "./ets/entryability/InsightIntentExecutorImpl.ets",
17. "uiAbility": {
18. // 意图所在ability
19. "ability": "EntryAbility",
20. // UIAbility支持前后台两种执行模式
21. "executeMode": [
22. "background",
23. "foreground"
24. ]
25. }
26. }
27. ]
28. }
```

## 端侧前台意图调用

开发者需自己实现InsightIntentExecutor，并在对应回调实现打开落地页（点击推荐卡片跳转的界面，如旅游攻略落地页）的能力，ViewTravelGuides的意图调用字段定义见查看旅游攻略（ViewTravelGuides）。

步骤如下：

1. 继承InsightIntentExecutor；
2. 重写对应方法，例如目标拉起前台页面，则可重写onExecuteInUIAbilityForegroundMode方法；
3. 通过意图名称，识别查看旅游攻略意图(ViewTravelGuides)，在对应的方法中传递意图参数（param），并拉起对应落地页（点击推荐卡片跳转的界面，如旅游攻略落地页）。

收起

自动换行

深色代码主题

复制

```
1. import { insightIntent, InsightIntentExecutor } from '@kit.AbilityKit';
2. import { window } from '@kit.ArkUI';
3. import { BusinessError } from '@kit.BasicServicesKit';
4. /**
5. * 意图调用样例 */
6. export default class InsightIntentExecutorImpl extends InsightIntentExecutor {
7. private static readonly VIEW_TRAVEL_GUIDES = 'ViewTravelGuides';
8. /**
9. * override 执行前台UIAbility意图
10. *
11. * @param name 意图名称
12. * @param param 意图参数
13. * @param pageLoader 窗口
14. * @returns 意图调用结果
15. */
16. onExecuteInUIAbilityForegroundMode(name: string, param: Record<string, Object>, pageLoader: window.WindowStage):
17. Promise<insightIntent.ExecuteResult> {
18. // 根据意图名称分发处理逻辑，接入方可根据实际业务实现页面跳转
19. switch (name) {
20. case InsightIntentExecutorImpl.VIEW_TRAVEL_GUIDES:
21. return this.viewTravelGuides(param, pageLoader);
22. default:
23. break;
24. }
25. return Promise.resolve({
26. code: -1,
27. result: {
28. message: 'unknown intent'
29. }
30. } as insightIntent.ExecuteResult)
31. }
32. /**
33. * 实现调用查看旅游攻略功能
34. *
35. * @param param 意图参数
36. * @param pageLoader 窗口
37. */
38. private viewTravelGuides(param: Record<string, Object>, pageLoader: window.WindowStage): Promise<insightIntent.ExecuteResult> {
39. return new Promise((resolve, reject) => {
40. // TODO 实现意图调用，loadContent的入参为旅游攻略落地页路径，例如：pages/TravelGuidePage
41. pageLoader.loadContent('pages/TravelGuidePage')
42. .then(() => {
43. let entityId: string = (param.items as Array<object>)?.[0]?.['entityId'];
44. // TODO 调用成功的情况，此处可以打印日志
45. resolve({
46. code: 0,
47. result: {
48. message: 'Intent execute succeed'
49. }
50. });
51. })
52. .catch((err: BusinessError) => {
53. // TODO 调用失败的情况
54. resolve({
55. code: -1,
56. result: {
57. message: 'Intent execute failed'
58. }
59. })
60. });
61. })
62. }
63. }
```