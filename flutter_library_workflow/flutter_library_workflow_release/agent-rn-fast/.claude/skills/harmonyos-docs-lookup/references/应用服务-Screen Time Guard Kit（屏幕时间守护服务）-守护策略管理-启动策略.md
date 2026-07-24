## 场景介绍

当应用希望启动某个管控规则时，可以调用启动管控策略的接口。根据参数中传入的策略名，应用可以启动对应管控策略。一旦策略被创建并启用，系统将根据规则对用户的屏幕使用行为进行监管。

## 用户体验设计

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/13/v3/mZcpRjZVTIOmoNDNbfjGyA/zh-cn_image_0000002471465330.png?HW-CC-KV=V1&HW-CC-Date=20260414T033315Z&HW-CC-Expire=86400&HW-CC-Sign=15050A8E197AEFB379F0CF949B45EB6294ACF96D5168B83F2319AF9E32B9D10B "点击放大")

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bf/v3/rMw1WchCSxeWR87fEqhfzg/zh-cn_image_0000002471625318.png?HW-CC-KV=V1&HW-CC-Date=20260414T033315Z&HW-CC-Expire=86400&HW-CC-Sign=E51E36EB7E2D20DBCE0132F7A7989BE00FB9C7BEE2D819AB3DD50017C75943C5)

流程说明：

1. 继承TimeGuardExtensionAbility，实现onStart方法，此步非必需。

2. 调用启动管控策略的接口，拉起健康使用设备查询开发者是否已申请权限，以及用户是否授权。

3. 若开发者没有权限或用户未授权，则抛出相应错误码。若开发者有权限且用户已授权，则解析参数中传入的策略名称，判断策略是否存在。

4. 若策略不存在，则抛出相应错误码；若存在，则查询该策略是否正在执行。

5. 若查询的策略未执行，则正常启动策略，并记录启动状态；否则，抛出策略已在执行中的错误码。

6. 策略启动后，系统时间被设置为不可修改，管控发起应用被设置为不可卸载。

7. 当到了管控生效的时间，管控开始生效，拉起extension进程，执行TimeGuardExtensionAbility的onStart回调。

## 接口说明

启动策略的关键接口如下表所示，具体API说明详见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-arkts)。

展开

| 接口名 | 描述 |
| --- | --- |
| [startGuardStrategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-guardservice#section18918313999)(strategyName: string): Promise<void> | 根据策略名称，启动其管控策略。 |
| [onStart](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-timeguardextensionability#section7699846154419)(strategyName: string): Promise<void> | 在策略启动时执行特定逻辑。 |

## 开发前提

启动管控策略需要申请用户授权，请先参考[请求用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/screentimeguard-request-user-auth)章节完成用户授权。

## 开发步骤

1. 导入相关模块。

收起

自动换行

深色代码主题

复制

```
1. import { guardService, TimeGuardExtensionAbility } from '@kit.ScreenTimeGuardKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { BusinessError } from '@kit.BasicServicesKit';
```

2. 继承TimeGuardExtensionAbility，重写onStart回调。

收起

自动换行

深色代码主题

复制

```
1. export default class EntryAbility extends TimeGuardExtensionAbility {
2. async onStart(strategyName: string): Promise<void> {
3. hilog.info(0x0000, 'test --- onStart', strategyName);
4. }
5. }
```

3. 调用startGuardStrategy，启动管控策略。

收起

自动换行

深色代码主题

复制

```
1. async function testStartGuardStrategy() {
2. try {
3. const strategyName = "TestStrategy";
4. await guardService.startGuardStrategy(strategyName);
5. } catch (err) {
6. const message = (err as BusinessError).message;
7. const code = (err as BusinessError).code;
8. hilog.error(0x0000, `ScreenTimeGuard:startGuardStrategy`, `startGuardStrategy failed with error code: ${code}, message: ${message}`);
9. }
10. }
```