## 简介

本文介绍如何使用HiAppEvent提供的C/C++接口订阅任务执行超时事件。接口的详细使用说明（参数限制、取值范围等）请参考[hiappevent.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hiappevent-h)。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| int OH\_HiAppEvent\_AddWatcher(HiAppEvent\_Watcher \*watcher) | 添加应用事件观察者，以添加对应用事件的订阅。 |
| int OH\_HiAppEvent\_RemoveWatcher(HiAppEvent\_Watcher \*watcher) | 移除应用事件观察者，以移除对应用事件的订阅。 |

## 开发步骤

### 添加事件观察者

以实现对用户点击按钮触发卡顿场景生成的卡顿事件订阅为例，说明开发步骤。

1. 获取该示例工程依赖的jsoncpp文件，打开链接[HiAppEvent示例工程EventSub](https://gitcode.com/openharmony/applications_app_samples/tree/master/code/DocsSample/PerformanceAnalysisKit/HiAppEvent/EventSub)，点击“下载当前目录”，下载EventSub工程文件。
2. 新建Native C++工程，从解压后的EventSub工程中拷贝jsoncpp库文件（entry/libs和entry/src/main/cpp/thirdparty文件夹）到新建的工程之中，新工程目录结构如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. entry:
   2. libs:    //  放置jsoncpp关联三方库的文件夹
   3. src:
   4. main:
   5. cpp:
   6. thirdparty:
   7. jsoncpp:    //  放置jsoncpp关联三方库的文件夹
   8. types:
   9. libentry:
   10. - index.d.ts
   11. - CMakeLists.txt
   12. - napi_init.cpp
   13. ets:
   14. entryability:
   15. - EntryAbility.ets
   16. pages:
   17. - Index.ets
   ```

   该示例工程中jsoncpp库文件对应的源码来自[三方开源库jsoncpp](https://github.com/open-source-parsers/jsoncpp/archive/refs/tags/1.9.6.tar.gz)。
3. 编辑“CMakeLists.txt”文件，添加所需源文件及动态库。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. add_library(entry SHARED napi_init.cpp)
   2. # 新增动态库依赖libhiappevent_ndk.z.so、libhilog_ndk.z.so（日志输出）及libohhicollie.so（hicollie检测）
   3. target_link_libraries(entry PUBLIC libace_napi.z.so libhilog_ndk.z.so libohhicollie.so libhiappevent_ndk.z.so)

   5. set(GZ_FILE "${CMAKE_CURRENT_SOURCE_DIR}/thirdparty/jsoncpp/src/jsoncpp-1.9.6.tar.gz")
   6. set(DEST_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../../build")
   7. # 检查是否存在entry/build目录
   8. execute_process(COMMAND ${CMAKE_COMMAND} -E make_directory ${DEST_DIR})
   9. # 解压jsoncpp-1.9.6.tar.gz到entry/build，得到jsoncpp头文件的目录
   10. execute_process(COMMAND tar -xzf ${GZ_FILE} -C ${DEST_DIR}
   11. WORKING_DIRECTORY ${DEST_DIR})

   13. # 新增三方库依赖libjsoncpp.so(解析订阅事件中的json字符串)
   14. target_link_libraries(entry PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/thirdparty/jsoncpp/${OHOS_ARCH}/lib/libjsoncpp.so)
   15. target_include_directories(entry PRIVATE ${DEST_DIR}/jsoncpp-1.9.6/include/json)
   ```
4. 编辑“napi\_init.cpp”文件，导入依赖的头文件，并定义LOG\_TAG。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include "napi/native_api.h"
   2. // 根据工程中三方库jsoncpp的位置适配引用json.h的路径
   3. #include "../../../build/jsoncpp-1.9.6/include/json/json.h"
   4. #include "hiappevent/hiappevent.h"
   5. #include "hilog/log.h"

   7. #undef LOG_TAG
   8. #define LOG_TAG "testTag"
   ```

   [napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/cpp/napi_init.cpp#L24-L36)
5. 订阅系统事件：

   * onReceive类型观察者

   编辑“napi\_init.cpp”文件，定义onReceive类型观察者相关函数：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 定义一变量，用来缓存创建的观察者的指针。
   2. static HiAppEvent_Watcher *appHicollieWatcherR;
   ```

   [napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/cpp/napi_init.cpp#L52-L55)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. static void OnReceiveAppHicollie(const struct HiAppEvent_AppEventGroup *appEventGroups, int i, int j)
   2. {
   3. if (strcmp(appEventGroups[i].appEventInfos[j].domain, DOMAIN_OS) == 0 &&
   4. strcmp(appEventGroups[i].appEventInfos[j].name, EVENT_APP_HICOLLIE) == 0) {
   5. Json::Value params;
   6. Json::Reader reader(Json::Features::strictMode());
   7. Json::FastWriter writer;
   8. if (reader.parse(appEventGroups[i].appEventInfos[j].params, params)) {
   9. auto time = params["time"].asInt64();
   10. auto foreground = params["foreground"].asBool();
   11. auto bundleVersion = params["bundle_version"].asString();
   12. auto processName = params["process_name"].asString();
   13. auto pid = params["pid"].asInt();
   14. auto uid = params["uid"].asInt();
   15. auto uuid = params["uuid"].asString();
   16. auto exception = writer.write(params["exception"]);
   17. auto hilogSize = params["hilog"].size();
   18. auto peerBindSize =  params["peer_binder"].size();
   19. auto memory =  writer.write(params["memory"]);
   20. auto externalLog = writer.write(params["external_log"]);
   21. auto logOverLimit = params["log_over_limit"].asBool();
   22. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.time=%{public}lld", time);
   23. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.foreground=%{public}d", foreground);
   24. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.bundle_version=%{public}s",
   25. bundleVersion.c_str());
   26. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.process_name=%{public}s", processName.c_str());
   27. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.pid=%{public}d", pid);
   28. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.uid=%{public}d", uid);
   29. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.uuid=%{public}s", uuid.c_str());
   30. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.exception=%{public}s", exception.c_str());
   31. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.hilog.size=%{public}d", hilogSize);
   32. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.peer_binder.size=%{public}d", peerBindSize);
   33. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.memory=%{public}s", memory.c_str());
   34. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.external_log=%{public}s", externalLog.c_str());
   35. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.log_over_limit=%{public}d", logOverLimit);
   36. }
   37. }
   38. }

   40. static void AppHicollieOnReceive(const char *domain, const struct HiAppEvent_AppEventGroup *appEventGroups,
   41. uint32_t groupLen)
   42. {
   43. for (int i = 0; i < groupLen; ++i) {
   44. for (int j = 0; j < appEventGroups[i].infoLen; ++j) {
   45. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.domain=%{public}s",
   46. appEventGroups[i].appEventInfos[j].domain);
   47. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.name=%{public}s",
   48. appEventGroups[i].appEventInfos[j].name);
   49. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.eventType=%{public}d",
   50. appEventGroups[i].appEventInfos[j].type);
   51. OnReceiveAppHicollie(appEventGroups, i, j);
   52. }
   53. }
   54. }

   56. static napi_value RegisterAppHicollieWatcherR(napi_env env, napi_callback_info info)
   57. {
   58. // 开发者自定义观察者名称，系统根据不同的名称来识别不同的观察者。
   59. appHicollieWatcherR = OH_HiAppEvent_CreateWatcher("appHicollieWatcherR");
   60. // 设置订阅的事件为EVENT_APP_HICOLLIE。
   61. const char *names[] = {EVENT_APP_HICOLLIE};
   62. // 开发者订阅感兴趣的事件，此处订阅了系统事件。
   63. OH_HiAppEvent_SetAppEventFilter(appHicollieWatcherR, DOMAIN_OS, 0, names, 1);
   64. // 开发者设置已实现的回调函数，观察者接收到事件后回立即触发OnReceive回调。
   65. OH_HiAppEvent_SetWatcherOnReceive(appHicollieWatcherR, AppHicollieOnReceive);
   66. // 使观察者开始监听订阅的事件。
   67. OH_HiAppEvent_AddWatcher(appHicollieWatcherR);
   68. return {};
   69. }
   ```

   [napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/cpp/napi_init.cpp#L1068-L1138)

   * onTrigger类型观察者

   编辑“napi\_init.cpp”文件，定义OnTrigger类型观察者相关函数：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 定义一变量，用来缓存创建的观察者的指针。
   2. static HiAppEvent_Watcher *appHicollieWatcherT;
   ```

   [napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/cpp/napi_init.cpp#L56-L59)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 开发者可以自行实现获取已监听到事件的回调函数，其中events指针指向内容仅在该函数内有效。
   2. static void AppHicollieOnTake(const char *const *events, uint32_t eventLen)
   3. {
   4. Json::Reader reader(Json::Features::strictMode());
   5. Json::FastWriter writer;
   6. for (int i = 0; i < eventLen; ++i) {
   7. Json::Value eventInfo;
   8. if (reader.parse(events[i], eventInfo)) {
   9. auto domain =  eventInfo["domain_"].asString();
   10. auto name = eventInfo["name_"].asString();
   11. auto type = eventInfo["type_"].asInt();
   12. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.domain=%{public}s", domain.c_str());
   13. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.name=%{public}s", name.c_str());
   14. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.eventType=%{public}d", type);
   15. if (domain ==  DOMAIN_OS && name == EVENT_APP_HICOLLIE) {
   16. auto time = eventInfo["time"].asInt64();
   17. auto foreground = eventInfo["foreground"].asBool();
   18. auto bundleVersion = eventInfo["bundle_version"].asString();
   19. auto processName = eventInfo["process_name"].asString();
   20. auto pid = eventInfo["pid"].asInt();
   21. auto uid = eventInfo["uid"].asInt();
   22. auto uuid = eventInfo["uuid"].asString();
   23. auto exception = writer.write(eventInfo["exception"]);
   24. auto hilogSize = eventInfo["hilog"].size();
   25. auto peerBindSize =  eventInfo["peer_binder"].size();
   26. auto memory =  writer.write(eventInfo["memory"]);
   27. auto externalLog = writer.write(eventInfo["external_log"]);
   28. auto logOverLimit = eventInfo["log_over_limit"].asBool();
   29. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.time=%{public}lld", time);
   30. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.foreground=%{public}d", foreground);
   31. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.bundle_version=%{public}s",
   32. bundleVersion.c_str());
   33. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.process_name=%{public}s",
   34. processName.c_str());
   35. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.pid=%{public}d", pid);
   36. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.uid=%{public}d", uid);
   37. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.uuid=%{public}s", uuid.c_str());
   38. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.exception=%{public}s", exception.c_str());
   39. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.hilog.size=%{public}d", hilogSize);
   40. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.peer_binder.size=%{public}d", peerBindSize);
   41. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.memory=%{public}s", memory.c_str());
   42. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.external_log=%{public}s",
   43. externalLog.c_str());
   44. OH_LOG_INFO(LogType::LOG_APP, "HiAppEvent eventInfo.params.log_over_limit=%{public}d", logOverLimit);
   45. }
   46. }
   47. }
   48. }

   50. // 开发者可以自行实现订阅回调函数，以便对获取到的事件打点数据进行自定义处理。
   51. static void AppHicollieOnTrigger(int row, int size)
   52. {
   53. // 接收回调后，获取指定数量的已接收事件。
   54. OH_HiAppEvent_TakeWatcherData(appHicollieWatcherT, row, AppHicollieOnTake);
   55. }

   57. static napi_value RegisterAppHicollieWatcherT(napi_env env, napi_callback_info info)
   58. {
   59. // 开发者自定义观察者名称，系统根据不同的名称来识别不同的观察者。
   60. appHicollieWatcherT = OH_HiAppEvent_CreateWatcher("appHicollieWatcherT");
   61. // 设置订阅的事件为EVENT_APP_HICOLLIE。
   62. const char *names[] = {EVENT_APP_HICOLLIE};
   63. // 开发者订阅感兴趣的事件，此处订阅了系统事件。
   64. OH_HiAppEvent_SetAppEventFilter(appHicollieWatcherT, DOMAIN_OS, 0, names, 1);
   65. // 开发者设置已实现的回调函数，需OH_HiAppEvent_SetTriggerCondition设置的条件满足方可触发。
   66. OH_HiAppEvent_SetWatcherOnTrigger(appHicollieWatcherT, AppHicollieOnTrigger);
   67. // 开发者可以设置订阅触发回调的条件，此处是设置新增事件打点数量为1个时，触发onTrigger回调。
   68. OH_HiAppEvent_SetTriggerCondition(appHicollieWatcherT, 1, 0, 0);
   69. // 使观察者开始监听订阅的事件。
   70. OH_HiAppEvent_AddWatcher(appHicollieWatcherT);
   71. return {};
   72. }
   ```

   [napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/cpp/napi_init.cpp#L1140-L1213)
6. 新增TestHiCollieTimerNdk函数。

   编辑“napi\_init.cpp”文件，新增TestHiCollieTimerNdk函数，构造任务执行超时事件：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include <unistd.h>
   2. #include "hicollie/hicollie.h"
   ```

   [napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/cpp/napi_init.cpp#L39-L42)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 定义回调函数
   2. void CallBack(void*)
   3. {
   4. OH_LOG_INFO(LogType::LOG_APP, "HiCollieTimerNdk CallBack");  // 回调函数中打印日志
   5. }

   7. static napi_value TestHiCollieTimerNdk(napi_env env, napi_callback_info info)
   8. {
   9. int id;
   10. // 设置HiCollieTimer 参数（Timer任务名，超时时间，回调函数，回调函数参数，超时发生后行为）
   11. HiCollie_SetTimerParam param = {"testTimer", 1, CallBack, nullptr, HiCollie_Flag::HICOLLIE_FLAG_LOG};
   12. HiCollie_ErrorCode errorCode = OH_HiCollie_SetTimer(param, &id);  // 注册HiCollieTimer函数执行时长超时检测一次性任务
   13. if (errorCode == HICOLLIE_SUCCESS) {  // HiCollieTimer任务注册成功
   14. OH_LOG_INFO(LogType::LOG_APP, "HiCollieTimer taskId: %{public}d", id); // 打印任务id
   15. sleep(2);  // 模拟执行耗时函数，在这里简单的将线程阻塞2s
   16. OH_HiCollie_CancelTimer(id);  // 根据id取消已注册任务
   17. }
   18. return nullptr;
   19. }
   ```

   [napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/cpp/napi_init.cpp#L1046-L1066)
7. 将RegisterWatcher及TestHiCollieTimerNdk注册为ArkTS接口。

   编辑“napi\_init.cpp”文件，在Init函数中的desc[]数组中将TestHiCollieTimerNdk、RegisterAppHicollieWatcherR及RegisterAppHicollieWatcherR方法注册为ArkTS接口。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 将TestHiCollieTimerNdk注册为ArkTS接口
   2. { "TestHiCollieTimerNdk", nullptr, TestHiCollieTimerNdk, nullptr, nullptr, nullptr, napi_default, nullptr },
   ```

   [napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/cpp/napi_init.cpp#L1363-L1366)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. { "RegisterAppHicollieWatcherR", nullptr, RegisterAppHicollieWatcherR, nullptr, nullptr, nullptr,
   2. napi_default, nullptr },
   ```

   [napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/cpp/napi_init.cpp#L1367-L1370)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. { "RegisterAppHicollieWatcherT", nullptr, RegisterAppHicollieWatcherT, nullptr, nullptr, nullptr,
   2. napi_default, nullptr },
   ```

   [napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/cpp/napi_init.cpp#L1371-L1374)

   编辑“index.d.ts”文件，定义ArkTS接口：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. export const TestHiCollieTimerNdk: () => void;
   ```

   [Index.d.ts](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/cpp/types/libentry/Index.d.ts#L29-L31)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. export const RegisterAppHicollieWatcherR: () => void;
   ```

   [Index.d.ts](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/cpp/types/libentry/Index.d.ts#L46-L48)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. export const RegisterAppHicollieWatcherT: () => void;
   ```

   [Index.d.ts](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/cpp/types/libentry/Index.d.ts#L49-L51)
8. 编辑“EntryAbility.ets”文件，在onCreate()函数中新增接口调用。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import testNapi from 'libentry.so';
   ```

   [EntryAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/ets/entryability/EntryAbility.ets#L28-L30)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 在onCreate()函数中新增接口调用，启动时注册系统事件观察者R
   2. testNapi.RegisterAppHicollieWatcherR();
   ```

   [EntryAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/ets/entryability/EntryAbility.ets#L431-L434)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 在onCreate()函数中新增接口调用，启动时注册系统事件观察者T
   2. testNapi.RegisterAppHicollieWatcherT();
   ```

   [EntryAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/ets/entryability/EntryAbility.ets#L435-L438)
9. 编辑“Index.ets”文件，新增按钮触发任务执行超时事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import testNapi from 'libentry.so';
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/ets/pages/Index.ets#L21-L24)

   在Index页面新增触发TestHiCollieTimerNdk方法的按钮。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 添加点击事件，触发TestHiCollieTimerNdk方法。
   2. Button('TestHiCollieTimerNdk')
   3. .type(ButtonType.Capsule)
   4. .margin({
   5. top: 20
   6. })
   7. .backgroundColor('#0D9FFB')
   8. .width('80%')
   9. .height('5%')
   10. .onClick(() => {
   11. testNapi.TestHiCollieTimerNdk();
   12. })
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/ets/pages/Index.ets#L214-L227)
10. 点击DevEco Studio界面中的运行按钮，运行应用工程，然后在应用界面中点击按钮“TestHiCollieTimerNdk”，触发任务执行超时事件。

### 验证观察者是否订阅到任务执行超时事件

应用工程崩溃退出后再次运行可以在Log窗口看到对系统事件数据的处理日志。

收起

自动换行

深色代码主题

复制

```
1. HiAppEvent eventInfo.domain=OS
2. HiAppEvent eventInfo.name=APP_HICOLLIE
3. HiAppEvent eventInfo.eventType=1
4. HiAppEvent eventInfo.params.time=1740993639620
5. HiAppEvent eventInfo.params.foreground=1
6. HiAppEvent eventInfo.params.bundle_version=1.0.0
7. HiAppEvent eventInfo.params.process_name=com.example.myapplication
8. HiAppEvent eventInfo.params.pid=26251
9. HiAppEvent eventInfo.params.uid=20020172
10. HiAppEvent eventInfo.params.uuid=4e5d7d0e18f5d6d84cf4f0c9e80d66d0b646c1cc2343d3595f07abb0d3547feb
11. HiAppEvent eventInfo.params.exception={"message":"","name":"APP_HICOLLIE"}
12. HiAppEvent eventInfo.params.hilog.size=77
13. HiAppEvent eventInfo.params.peer_binder.size=18
14. HiAppEvent eventInfo.params.memory={"pss":0,"rss":124668,"sys_avail_mem":2220032,"sys_free_mem":526680,"sys_total_mem":11692576,"vss":4238700}
15. HiAppEvent eventInfo.params.external_log=["/data/storage/el2/log/hiappevent/APP_HICOLLIE_1740993644458_26215.log"]
16. HiAppEvent eventInfo.params.log_over_limit=0
```

### 移除并销毁事件观察者

1. 移除事件观察者。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. static napi_value RemoveWatcher(napi_env env, napi_callback_info info)
   2. {
   3. // 使观察者停止监听事件
   4. // ···
   5. OH_HiAppEvent_RemoveWatcher(appHicollieWatcherR);
   6. OH_HiAppEvent_RemoveWatcher(appHicollieWatcherT);
   7. // ···
   8. return {};
   9. }
   ```

   [napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/cpp/napi_init.cpp#L877-L916)
2. 销毁事件观察者。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. static napi_value DestroyWatcher(napi_env env, napi_callback_info info)
   2. {
   3. // 销毁创建的观察者，并置eventWatcher为nullptr。
   4. // ···
   5. OH_HiAppEvent_DestroyWatcher(appHicollieWatcherR);
   6. OH_HiAppEvent_DestroyWatcher(appHicollieWatcherT);
   7. appHicollieWatcherR = nullptr;
   8. appHicollieWatcherT = nullptr;
   9. // ···
   10. return {};
   11. }
   ```

   [napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/PerformanceAnalysisKit/HiAppEvent/EventSub/entry/src/main/cpp/napi_init.cpp#L932-L980)