## 场景介绍

当用户希望停止某个管控规则时，可以调用停止管控策略的接口。根据参数中传入的策略名，应用可以停止对应管控策略。一旦策略被停止，系统将不再根据该规则对用户的屏幕使用行为进行监管。

## 用户体验设计

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/05/v3/mOmCyfuPSmK1d5nMkTOnjw/zh-cn_image_0000002504425171.png?HW-CC-KV=V1&HW-CC-Date=20260414T033318Z&HW-CC-Expire=86400&HW-CC-Sign=CC5CE017F22F7A44F5D58D91CECF7376A621358B13E994997ECA0E8E382E3DDB "点击放大")

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/02/v3/okrhRIJuQKySieqndOiZbg/zh-cn_image_0000002471465334.png?HW-CC-KV=V1&HW-CC-Date=20260414T033318Z&HW-CC-Expire=86400&HW-CC-Sign=1016096D90801F4CCE54C466DD98A34D1744D1DCDFEDBD80C4841C7FC25EC95C)

流程说明：

1. 应用继承TimeGuardExtensionAbility，实现onStop方法，此步非必需。

2. 应用调用停止管控策略的接口，会拉起健康使用设备查询本应用是否已申请权限、用户是否已给本应用授权。

3. 若没有权限，则抛出相应错误码。若有权限，则解析参数中传入的策略名称，判断策略是否存在。

4. 若策略不存在，则抛出相应错误码；若存在，则查询该策略是否正在执行。

5. 若停止策略时正在执行策略，则策略会正常停止，健康使用设备会记录策略停止状态；若停止策略时策略并未执行，该接口将抛出策略未在执行中的错误码。

6. 策略生效期间停止策略，会拉起extension进程，执行TimeGuardExtensionAbility的onStop回调。在非策略生效期间停止策略，不会触发onStop回调。

7. 停止该策略后，若该应用不存在任何启动状态的策略，则该应用被设置为可卸载。

8. 停止该策略后，若设备中不存在任何启动状态的策略，则系统时间设置为可修改。

## 接口说明

停止策略的关键接口如下表所示，具体API说明详见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-arkts)。

展开

| 接口名 | 描述 |
| --- | --- |
| [stopGuardStrategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-guardservice#section10788197141416)(strategyName: string): Promise<void> | 根据策略名称，停止其管控策略。 |
| [onStop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-timeguardextensionability#section62391222174814)(strategyName: string): Promise<void> | 在策略结束时执行特定逻辑。 |

## 开发前提

停止管控策略需要申请用户授权，请先参考[请求用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/screentimeguard-request-user-auth)章节完成用户授权。

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

2. 继承TimeGuardExtensionAbility，重写onStop回调。

收起

自动换行

深色代码主题

复制

```
1. export default class EntryAbility extends TimeGuardExtensionAbility {
2. async onStop(strategyName: string): Promise<void> {
3. hilog.info(0x0000, 'test --- onStop', strategyName);
4. }
5. }
```

3. 调用stopGuardStrategy，停止管控策略。

收起

自动换行

深色代码主题

复制

```
1. async function testStopGuardStrategy() {
2. try {
3. const strategyName = "TestStrategy";
4. await guardService.stopGuardStrategy(strategyName);
5. } catch (err) {
6. const message = (err as BusinessError).message;
7. const code = (err as BusinessError).code;
8. hilog.error(0x0000, `ScreenTimeGuard:stopGuardStrategy`, `stopGuardStrategy failed with error code: ${code}, message: ${message}`);
9. }
10. }
```