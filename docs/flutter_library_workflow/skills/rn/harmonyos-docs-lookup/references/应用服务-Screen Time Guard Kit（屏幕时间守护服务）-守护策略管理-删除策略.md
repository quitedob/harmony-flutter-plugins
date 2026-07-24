## 场景介绍

当应用希望删除现有的屏幕时间守护规则时，可以调用删除管控策略的接口。根据参数中传入的策略名删除对应的策略。一旦策略被删除，系统将不再根据该规则对用户的屏幕使用行为进行监管。

## 用户体验设计

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/68/v3/44GOMGbsSY6aTdUkT4JDcg/zh-cn_image_0000002504425163.png?HW-CC-KV=V1&HW-CC-Date=20260414T033311Z&HW-CC-Expire=86400&HW-CC-Sign=BC19ED9F51C44E3CF526D23ECB5577AA907CF137368AF56836CBA06974742CE7 "点击放大")

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a7/v3/XMJsAr06TOGyBPlUcudkBw/zh-cn_image_0000002504465241.png?HW-CC-KV=V1&HW-CC-Date=20260414T033311Z&HW-CC-Expire=86400&HW-CC-Sign=1EDC64CB764773D53A9E7F7D0E6DDF4E53DC981D2263D967FB7BD4847A11567B)

流程说明：

1. 应用调用删除管控策略的接口，拉起健康使用设备查询本应用是否已申请权限，以及用户是否对本应用授权。

2. 若没有权限，则抛出相应错误码。若有权限，则解析参数中传入的策略名称，判断策略是否存在。

3. 若策略不存在，则抛出相应错误码；若存在，则查询该策略是否正在执行。

4. 若策略在执行，则会先停止管控策略再删除。

## 接口说明

删除策略的关键接口如下表所示，具体API说明详见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-arkts)。

展开

| 接口名 | 描述 |
| --- | --- |
| [removeGuardStrategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-guardservice#section116125615419)(strategyName: string): Promise<void> | 删除管控策略。 |

## 开发前提

删除管控策略需要申请用户授权，请先参考[请求用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/screentimeguard-request-user-auth)章节完成用户授权。

## 开发步骤

1. 导入相关模块。

收起

自动换行

深色代码主题

复制

```
1. import { guardService } from '@kit.ScreenTimeGuardKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { BusinessError } from '@kit.BasicServicesKit';
```

2. 调用removeGuardStrategy，删除管控策略。

收起

自动换行

深色代码主题

复制

```
1. async function testRemoveGuardStrategy() {
2. try {
3. const strategyName = "TestStrategy";
4. await guardService.removeGuardStrategy(strategyName);
5. } catch (err) {
6. const message = (err as BusinessError).message;
7. const code = (err as BusinessError).code;
8. hilog.error(0x0000, `ScreenTimeGuard:removeGuardStrategy`, `removeGuardStrategy failed with error code: ${code}, message: ${message}`);
9. }
10. }
```