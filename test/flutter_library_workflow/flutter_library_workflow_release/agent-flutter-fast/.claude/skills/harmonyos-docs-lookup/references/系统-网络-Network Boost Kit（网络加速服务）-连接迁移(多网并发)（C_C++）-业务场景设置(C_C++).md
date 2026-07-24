从6.0.2(22)开始，支持业务场景设置功能。

## 场景介绍

应用在请求多网并发之前，通过设置业务场景，可以帮助系统进行多网并发管控和业务时长分析。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-module)。

展开

| 接口名 | 描述 |
| --- | --- |
| int32\_t HMS\_NetworkBoost\_SetSceneDesc(NetworkBoost\_SceneDesc sceneDesc) | 设置业务场景。 |

## 开发步骤

1. 导入Network Boost Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include "NetworkBoostKit/network_boost.h"
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
3. 调用SetSceneDesc接口。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. int32_t SetSceneDesc()
   2. {
   3. NetworkBoost_SceneDesc sceneDesc;
   4. sceneDesc.duration = 0;
   5. sceneDesc.startTime = 0;
   6. sceneDesc.scene = NB_SERVICE_LOGIN;
   7. sceneDesc.sceneEvent = SCENE_EVENT_ENTER;
   8. int32_t ret = HMS_NetworkBoost_SetSceneDesc(sceneDesc);
   9. printf("业务场景设置结果: %d\n", ret);
   10. return ret;
   11. }
   ```