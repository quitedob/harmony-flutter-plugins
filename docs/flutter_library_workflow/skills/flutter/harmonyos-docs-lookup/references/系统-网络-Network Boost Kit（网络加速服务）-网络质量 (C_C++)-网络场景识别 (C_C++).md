## 场景介绍

应用在订阅网络场景识别后，系统在网络场景实时信息或预测信息发生变化后回调给应用，回调的网络场景信息包括数据传输的链路类型、网络场景类型、数传策略建议、弱信号信息等。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-module)。

展开

| 接口名 | 描述 |
| --- | --- |
| int32\_t HMS\_NetworkBoost\_RegisterNetSceneCallback(HMS\_NetworkBoost\_NetSceneChange callback, uint32\_t\* callbackId) | 注册网络场景信息状态变化回调。 |
| int32\_t HMS\_NetworkBoost\_UnregisterNetSceneCallback(uint32\_t callbackId) | 取消注册网络场景信息状态变化回调。 |

## 开发步骤

1. 导入Network Boost Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include "NetworkBoostKit/network_boost_quality.h"
   2. #include <cstdio>
   ```
2. CMakeLists.txt中添加以下lib，具体请见[C API开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/networkboost-preparations#section16821202143413)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. libnetwork_boost.so
   ```
3. 通过注册回调的方式监听网络场景识别信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. uint32_t callbackId = 0;
   2. void onNetworkSceneChanged(NetworkBoost_NetworkScene *ns)
   3. {
   4. // 网络场景识别回调信息处理
   5. printf("数据路径类型: %d\n", ns->pathType);
   6. printf("网络场景: %d\n", ns->scene);
   7. switch (ns->scene) {
   8. case NB_SCENE_NORMAL:
   9. // 普通场景处理
   10. break;
   11. case NB_SCENE_CONGESTION:
   12. // 拥塞场景处理
   13. break;
   14. case NB_SCENE_FREQUENT_HANDOVER:
   15. // 信号快切场景处理
   16. break;
   17. case NB_SCENE_WEAK_SIGNAL:
   18. // 弱信号场景处理
   19. break;
   20. }
   21. printf("应用数传策略建议: %d\n", ns->recommendedAction);
   22. if (ns->weakSignalPrediction.duration > 0) {
   23. // 弱信号预测处理
   24. }
   25. }

   27. int32_t RegisterNetSceneCallback()
   28. {
   29. HMS_NetworkBoost_NetSceneChange callback;
   30. callback = onNetworkSceneChanged;
   31. // 注册回调，获取回调Id
   32. int32_t ret = HMS_NetworkBoost_RegisterNetSceneCallback(callback, &callbackId);
   33. printf("注册网络场景结果: %d, Id：%d\n", ret, callbackId);
   34. return ret;
   35. }
   ```
4. 当应用业务流程结束，通过取消注册的方式取消监听网络场景识别信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. int32_t UnregisterNetSceneCallback()
   2. {
   3. // 使用注册时获取的回调Id取消注册
   4. int32_t ret = HMS_NetworkBoost_UnregisterNetSceneCallback(callbackId);
   5. printf("取消注册网络场景结果: %d\n", ret);
   6. return ret;
   7. }
   ```