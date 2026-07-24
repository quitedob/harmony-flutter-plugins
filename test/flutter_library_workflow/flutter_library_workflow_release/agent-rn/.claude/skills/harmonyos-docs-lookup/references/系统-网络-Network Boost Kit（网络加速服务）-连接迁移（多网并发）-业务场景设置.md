## 场景介绍

应用在请求多网并发之前，通过设置业务场景，可以帮助系统进行多网并发管控和业务时长分析。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/networkboost-netboost#section13106021163)。

展开

| 接口名 | 描述 |
| --- | --- |
| setSceneDesc(sceneDesc : SceneDesc): void | 设置业务场景。 |

## 开发步骤

1. 导入Network Boost Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { netBoost } from '@kit.NetworkBoostKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 设置业务场景。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. let sceneDesc : netBoost.SceneDesc = {
   3. scene : 'realtimeVoice',
   4. sceneEvent : netBoost.SceneEvent.SCENE_EVENT_ENTER
   5. }
   6. netBoost.setSceneDesc(sceneDesc);
   7. } catch (err) {
   8. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   9. }
   ```