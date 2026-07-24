从6.0.2(22)开始，支持多网状态监听功能。

## 场景介绍

应用通过监听多网络状态的变化，感知可用网络的变化，从而选择在多网络上传输数据的策略。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-module)。

展开

| 接口名 | 描述 |
| --- | --- |
| int32\_t HMS\_NetworkBoost\_RegisterMultiPathStateChangeCallback(HMS\_NetworkBoost\_OnMultiPathStateChangecallback, uint32\_t \*callbackId) | 注册多网状态变化事件。 |
| int32\_t HMS\_NetworkBoost\_UnregisterMultiPathStateChangeCallback(uint32\_t callbackId) | 去注册多网状态变化事件。 |

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
3. 调用HMS\_NetworkBoost\_RegisterMultiPathStateChangeCallback接口注册回调，以获取多网状态变化信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. uint32_t callbackId = 0;
   2. void onMultiPathStateChangeCallback(NetworkBoost_MultiPathStateChange* result)
   3. {
   4. // 多网状态变化回调处理
   5. }

   7. int32_t RegisterMultiPathStateChange()
   8. {
   9. // 注册回调，获取回调Id
   10. int32_t ret = HMS_NetworkBoost_RegisterMultiPathStateChangeCallback(onMultiPathStateChangeCallback, &callbackId);
   11. printf("注册多网状态监听回调结果: %d, Id：%d\n", ret, callbackId);
   12. return ret;
   13. }
   ```
4. 当应用业务流程结束，取消多网状态监听。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. int32_t UnregisterMultiPathStateChange() {
   2. // 使用注册时获取的回调Id取消注册
   3. int32_t ret = HMS_NetworkBoost_UnregisterMultiPathStateChangeCallback(callbackId);
   4. printf("取消多网状态监听回调结果: %d\n", ret);
   5. return ret;
   6. }
   ```