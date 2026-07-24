## 场景介绍

当用户希望查看现有的屏幕时间守护规则时，可以调用查询管控策略的接口。通过成功调用查询策略接口，用户可以浏览已创建的所有管控策略，如查看各个应用的停用起止时间或可使用时长。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/72/v3/fyALQ5bsQ_KvxLwKeVvAEg/zh-cn_image_0000002504425159.png?HW-CC-KV=V1&HW-CC-Date=20260414T033307Z&HW-CC-Expire=86400&HW-CC-Sign=9BE641855B79A000EE38CCAB3BC96A1505AB6814BCAE52ADD1B8CB9870A4C74A)

流程说明：

1. 应用调用查询管控策略的接口，拉起健康使用设备查询本应用是否已申请权限，以及用户是否对本应用授权。

2. 若没有权限，则抛出相应错误码；若有权限，则返回对应应用下的所有管控策略。

## 接口说明

查询策略的关键接口如下表所示，具体API说明详见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-arkts)。

展开

| 接口名 | 描述 |
| --- | --- |
| [queryGuardStrategies](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-guardservice#section1812105318579)(): Promise<[GuardStrategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-guardservice#section188761911193713)[]> | 查询该应用下的所有管控策略。 |

## 开发前提

查询管控策略需要申请用户授权，请先参考[请求用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/screentimeguard-request-user-auth)章节完成用户授权。

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

2. 调用queryGuardStrategy，查对应应用下的所有管控策略。

收起

自动换行

深色代码主题

复制

```
1. async function testQueryGuardStrategies() {
2. try {
3. let guardStrategy: guardService.GuardStrategy[] = await guardService.queryGuardStrategies();
4. guardStrategy.forEach((element) => {
5. hilog.info(0x0000, `ScreenTimeGuard:queryGuardStrategies`, `${element.name}`)
6. })
7. } catch (err) {
8. const message = (err as BusinessError).message;
9. const code = (err as BusinessError).code;
10. hilog.error(0x0000, `ScreenTimeGuard:queryGuardStrategies`, `queryGuardStrategies failed with error code: ${code}, message: ${message}`);
11. }
12. }
```