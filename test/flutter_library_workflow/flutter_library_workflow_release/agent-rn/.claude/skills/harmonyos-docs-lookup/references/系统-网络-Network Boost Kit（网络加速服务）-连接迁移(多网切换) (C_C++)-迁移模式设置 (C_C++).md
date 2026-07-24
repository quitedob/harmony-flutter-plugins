## 场景介绍

应用可通过该接口变更连接迁移模式，包括委托模式（由系统发起连接迁移）和自主模式（由应用发起连接迁移）。应用未调用SetHandoverMode则默认为委托模式，应用可以通过该接口禁止系统发起连接迁移。在某些场景下，比如该应用切换到后台时，依旧有可能由系统触发切换。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-module)。

展开

| 接口名 | 描述 |
| --- | --- |
| int32\_t HMS\_NetworkBoost\_SetHandoverMode(NetworkBoost\_HandoverMode mode) | 应用设置迁移模式，默认为委托模式。 |

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
3. 调用SetHandoverMode接口，设置为自主模式，禁止系统发起连接迁移。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. int32_t SetHandoverMode()
   2. {
   3. NetworkBoost_HandoverMode mode = NB_MODE_DISCRETION;
   4. int32_t ret = HMS_NetworkBoost_SetHandoverMode(mode);
   5. printf("设置连接迁移模式结果: %d\n", ret);
   6. return ret;
   7. }
   ```