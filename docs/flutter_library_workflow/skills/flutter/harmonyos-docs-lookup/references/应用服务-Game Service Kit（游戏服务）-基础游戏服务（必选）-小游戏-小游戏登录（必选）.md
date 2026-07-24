小游戏接入基础游戏服务的小游戏登录API后，支持玩家使用华为账号快速进入游戏，且小游戏的华为账号实名认证、未成年人防沉迷功能由基础游戏服务实现。

## 前提条件

已完成[开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/gameservice-gameplayer-minigame-preparation)。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d5/v3/qRP7JOduTOe1vwEJ6davPw/zh-cn_image_0000002506511067.png?HW-CC-KV=V1&HW-CC-Date=20260414T030400Z&HW-CC-Expire=86400&HW-CC-Sign=5B7749B9EDCC86C38D010B7131267A4A421F154E69BF1E853AD6E2674A92D525)

1. 玩家启动小游戏。
2. 小游戏调用[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section225333655719)接口初始化Game Service Kit。初始化后，弹出华为隐私协议窗口，玩家确认同意后，可继续往下执行。
3. 小游戏调用[on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section145017424483)接口注册小游戏防沉迷事件监听。
4. 小游戏调用[miniGameLogin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section44488469397)接口。小游戏顶部弹出欢迎横幅，并向小游戏返回playerId、playerSign等信息。同时对玩家是否完成实名认证及是否成年进行校验。
   * 若玩家未完成实名认证，[miniGameLogin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section44488469397)接口自动弹出实名认证窗口要求玩家进行实名认证。
   * 若玩家账号实名认证为未成年人，[miniGameLogin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section44488469397)接口将自动检测未成年人的游戏时间。若玩家不在指定时间内登录小游戏，将强制玩家退出小游戏并返回[1002000006](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-error-code#section4418848101513)错误码。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer)。

展开

| 接口名 | 描述 |
| --- | --- |
| [init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section225333655719)(context: common.UIAbilityContext, callback: AsyncCallback<void>): void | 游戏初始化接口，使用默认的上下文信息，通过callback回调获取返回值。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section145017424483)(type: 'miniGameAddictionPrevented', callback: Callback<string>): void | 小游戏防沉迷事件监听接口，通过callback回调获取小游戏防沉迷事件结果。 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section171668301498)(type: 'miniGameAddictionPrevented', callback?: Callback<string>): void | 取消小游戏防沉迷事件监听接口。 |
| [miniGameLogin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section44488469397)(context: common.Context, loginParam: MiniGameLoginParam): Promise<MiniGamePlayer> | 小游戏登录接口，通过Promise对象获取返回值。 |

## 开发步骤

### 导入模块

导入Game Service Kit及公共模块。

收起

自动换行

深色代码主题

复制

```
1. import { gamePlayer } from '@kit.GameServiceKit';
2. import { common } from '@kit.AbilityKit';
3. import { hilog } from '@kit.PerformanceAnalysisKit';
4. import { BusinessError } from '@kit.BasicServicesKit';
5. import { window } from '@kit.ArkUI';
```

### 初始化

调用[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section225333655719)接口初始化Game Service Kit。

收起

自动换行

深色代码主题

复制

```
1. onWindowStageCreate(windowStage: window.WindowStage) {
2. windowStage.loadContent("pages/index", (err, data) => {
3. try {
4. gamePlayer.init(this.context,()=>{
5. hilog.info(0x0000, 'testTag', `Succeeded in initializing.`);
6. });
7. } catch (error) {
8. let err = error as BusinessError;
9. hilog.error(0x0000, 'testTag', `Failed to init. Code: ${err.code}, message: ${err.message}`);
10. }
11. });
12. }
```

### 监听小游戏防沉迷事件

调用[on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section145017424483)接口注册小游戏防沉迷事件监听。

收起

自动换行

深色代码主题

复制

```
1. private miniGameAddictionPreventedCallback(result: string) {
2. // 退出小游戏
3. }
4. // ...
5. // 调用on接口注册小游戏防沉迷事件监听
6. try {
7. gamePlayer.on('miniGameAddictionPrevented', this.miniGameAddictionPreventedCallback);
8. } catch (error) {
9. let err = error as BusinessError;
10. hilog.error(0x0000, 'testTag', `Failed to register. Code: ${err.code}, message: ${err.message}`);
11. }
```

### 小游戏登录

调用[miniGameLogin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section44488469397)接口登录小游戏。

收起

自动换行

深色代码主题

复制

```
1. let context = this.getUIContext()?.getHostContext() as common.UIAbilityContext;
2. let request: gamePlayer.MiniGameLoginParam = {
3. 'gameAppId': '123xxx', // 小游戏appId
4. 'extraData': 'xxx' // 附加信息，要求JSON String格式
5. };
6. try {
7. gamePlayer.miniGameLogin(context, request).then((result: gamePlayer.MiniGamePlayer) => {
8. hilog.info(0x0000, 'testTag', `Succeeded in logging in`);
9. }).catch((error: BusinessError) => {
10. hilog.error(0x0000, 'testTag', `Failed to login. Code: ${error.code}, message: ${error.message}`);
11. });
12. } catch (error) {
13. let err = error as BusinessError;
14. hilog.error(0x0000, 'testTag', `Failed to login. Code: ${err.code}, message: ${err.message}`);
15. }
```

### 取消监听小游戏防沉迷事件

游戏退出时通过调用[off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section171668301498)接口取消监听状态。

收起

自动换行

深色代码主题

复制

```
1. // 取消miniGameAddictionPrevented事件的全部监听
2. try {
3. gamePlayer.off('miniGameAddictionPrevented');
4. } catch (error) {
5. let err = error as BusinessError;
6. hilog.error(0x0000, 'testTag', `Failed to unregister. Code: ${err.code}, message: ${err.message}`);
7. }
```