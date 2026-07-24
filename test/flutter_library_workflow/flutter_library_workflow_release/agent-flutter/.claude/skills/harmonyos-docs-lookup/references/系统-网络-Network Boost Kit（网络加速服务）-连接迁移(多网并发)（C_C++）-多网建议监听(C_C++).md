从6.0.2(22)开始，支持多网建议监听功能。

## 场景介绍

系统感知到应用可能需要使用多网络加速的场景时，如弱网、网络切换等特定场景，会给出建议。应用通过监听多网络加速的建议，决策发起多网络加速的请求。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-module)。

展开

| 接口名 | 描述 |
| --- | --- |
| int32\_t HMS\_NetworkBoost\_RegisterMultiPathRecommendationCallback(HMS\_NetworkBoost\_OnMultiPathRecommendationcallback, uint32\_t \*callbackId) | 注册系统多网建议变化事件。 |
| int32\_t HMS\_NetworkBoost\_UnregisterMultiPathRecommendationCallback(uint32\_t callbackId) | 去系统多网建议变化事件。 |

## 开发步骤

1. 导入Network Boost Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include "NetworkBoostKit/network_boost_handover.h"
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
3. 调用HMS\_NetworkBoost\_RegisterMultiPathRecommendationCallback接口接口注册回调，以获取多网建议变化信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. uint32_t callbackId = 0;
   2. void onMultiPathRecommendationCallback(NetworkBoost_MultiPathRecommendation* recommendation)
   3. {
   4. // 多网建议变化回调处理
   5. }

   7. int32_t RegisterMultiPathRecommendation()
   8. {
   9. // 注册回调，获取回调Id
   10. int32_t ret = HMS_NetworkBoost_RegisterMultiPathRecommendationCallback(onMultiPathRecommendationCallback, &callbackId);
   11. printf("注册多网建议监听回调结果: %d, Id：%d\n", ret, callbackId);
   12. return ret;
   13. }
   ```
4. 当应用业务流程结束，取消多网建议监听。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. int32_t UnregisterMultiPathRecommendation() {
   2. // 使用注册时获取的回调Id取消注册
   3. int32_t ret = HMS_NetworkBoost_UnregisterMultiPathRecommendationCallback(callbackId);
   4. printf("取消多网建议监听回调结果: %d\n", ret);
   5. return ret;
   6. }
   ```