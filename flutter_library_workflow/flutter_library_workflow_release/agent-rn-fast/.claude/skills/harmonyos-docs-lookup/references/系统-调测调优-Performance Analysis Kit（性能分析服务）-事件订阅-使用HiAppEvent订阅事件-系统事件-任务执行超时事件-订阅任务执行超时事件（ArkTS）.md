## 简介

从API version 21开始，支持ArkTS接口订阅任务执行超时事件。 本文介绍如何使用HiAppEvent提供的ArkTS接口订阅任务执行超时事件。接口的详细使用说明（参数限制、取值范围等）请参考[@ohos.hiviewdfx.hiAppEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-hiviewdfx-hiappevent)。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| addWatcher(watcher: Watcher): AppEventPackageHolder | 添加应用事件观察者，以添加对应用事件的订阅。 |
| removeWatcher(watcher: Watcher): void | 移除应用事件观察者，以取消对应用事件的订阅。 |

## 开发步骤

### 添加事件观察者

为确保开发阶段顺利接收事件回调，建议采取以下方案：创建新的Native C++工程，在ArkTS代码中实现订阅，并通过C++代码构造故障注入以触发任务执行超时事件。

1. 新建Native C++工程，目录结构如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. entry:
   2. src:
   3. main:
   4. cpp:
   5. types:
   6. libentry:
   7. - index.d.ts
   8. - CMakeLists.txt
   9. - napi_init.cpp
   10. ets:
   11. entryability:
   12. - EntryAbility.ets
   13. pages:
   14. - Index.ets
   ```
2. 编辑“CMakeLists.txt”文件，添加源文件及动态库。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. # 新增动态库依赖libhilog_ndk.z.so（日志输出）及libohhicollie.so（HiCollie检测）
   2. target_link_libraries(entry PUBLIC libace_napi.z.so libhilog_ndk.z.so libohhicollie.so)
   ```
3. 编辑“EntryAbility.ets”文件，导入依赖模块，示例代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { hiAppEvent, hilog } from '@kit.PerformanceAnalysisKit';
   ```
4. 订阅系统事件，编辑“EntryAbility.ets”文件，在onCreate函数中添加订阅代码，示例代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let watcher: hiAppEvent.Watcher = {
   2. // 开发者可以自定义观察者名称，系统会使用名称来标识不同的观察者
   3. name: "watcher",
   4. // 开发者可以订阅感兴趣的系统事件，此处是订阅了任务执行超时事件
   5. appEventFilters: [
   6. {
   7. domain: hiAppEvent.domain.OS,
   8. names: [hiAppEvent.event.APP_HICOLLIE]
   9. }
   10. ],
   11. // 开发者可以自行实现订阅实时回调函数，以便对订阅获取到的事件数据进行自定义处理
   12. onReceive: (domain: string, appEventGroups: Array<hiAppEvent.AppEventGroup>) => {
   13. hilog.info(0x0000, 'testTag', `HiAppEvent onReceive: domain=${domain}`);
   14. for (const eventGroup of appEventGroups) {
   15. hilog.info(0x0000, 'testTag', `HiAppEvent eventName=${eventGroup.name}`);
   16. for (const eventInfo of eventGroup.appEventInfos) {
   17. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.domain=${eventInfo.domain}`);
   18. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.name=${eventInfo.name}`);
   19. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.eventType=${eventInfo.eventType}`);
   20. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.params.time=${eventInfo.params['time']}`);
   21. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.params.foreground=${eventInfo.params['foreground']}`);
   22. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.params.bundle_version=${eventInfo.params['bundle_version']}`);
   23. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.params.process_name=${eventInfo.params['process_name']}`);
   24. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.params.pid=${eventInfo.params['pid']}`);
   25. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.params.uid=${eventInfo.params['uid']}`);
   26. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.params.uid=${eventInfo.params['uuid']}`);
   27. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.params.exception=${eventInfo.params['exception']}`);
   28. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.params.hilog.size=${eventInfo.params['hilog'].length}`);
   29. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.params.peer_binder.size=${JSON.stringify(eventInfo.params['peer_binder'].length)}`);
   30. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.params.memory=${eventInfo.params['memory']}`);
   31. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.params.external_log=${JSON.stringify(eventInfo.params['external_log'])}`);
   32. hilog.info(0x0000, 'testTag', `HiAppEvent eventInfo.params.log_over_limit=${eventInfo.params['log_over_limit']}`);
   33. }
   34. }
   35. }
   36. };
   37. hiAppEvent.addWatcher(watcher);
   ```
5. 新增TestHiCollieTimerNdk函数。

   编辑“napi\_init.cpp”文件，新增TestHiCollieTimerNdk函数，构造任务执行超时事件：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 引入hicollie.h头文件
   2. #include "napi/native_api.h"
   3. #include "hicollie/hicollie.h"
   4. #include "hilog/log.h"
   5. #include <unistd.h>
   6. #undef LOG_TAG
   7. #define LOG_TAG "testTag"

   9. static napi_value TestHiCollieTimerNdk(napi_env env, napi_callback_info exports)
   10. {
   11. // 定义执行任务超时id值
   12. int id;
   13. // 定义任务超时检测参数：超时时间阈值1s，动作级别为生成日志
   14. HiCollie_SetTimerParam param = {"testTimer", 1, nullptr, nullptr, HiCollie_Flag::HICOLLIE_FLAG_LOG};
   15. // 设置检测
   16. HiCollie_ErrorCode errorCode = OH_HiCollie_SetTimer(param, &id);
   17. if (errorCode == HICOLLIE_SUCCESS) {
   18. OH_LOG_INFO(LogType::LOG_APP, "Timer Id is %{public}d", id);
   19. // 构造超时2s
   20. sleep(2);
   21. OH_HiCollie_CancelTimer(id);
   22. }
   23. return nullptr;
   24. }
   ```
6. 将TestHiCollieTimerNdk注册为ArkTS接口。

   编辑“napi\_init.cpp”文件，TestHiCollieTimerNdk注册为ArkTS接口：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. EXTERN_C_START
   2. static napi_value Init(napi_env env, napi_value exports)
   3. {
   4. napi_property_descriptor desc[] = {
   5. { "TestHiCollieTimerNdk", nullptr, TestHiCollieTimerNdk, nullptr, nullptr, nullptr, napi_default, nullptr }
   6. };
   7. napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
   8. return exports;
   9. }
   10. EXTERN_C_END
   11. static napi_module demoModule = {
   12. .nm_version = 1,
   13. .nm_flags = 0,
   14. .nm_filename = nullptr,
   15. .nm_register_func = Init,
   16. .nm_modname = "entry",
   17. .nm_priv = ((void*)0),
   18. .reserved = { 0 },
   19. };
   20. extern "C" __attribute__((constructor)) void RegisterEntryModule(void)
   21. {
   22. napi_module_register(&demoModule);
   23. }
   ```

   编辑“index.d.ts”文件，定义ArkTS接口：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. export const TestHiCollieTimerNdk: () => void;
   ```
7. 编辑“Index.ets”文件，新增按钮触发任务执行超时事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import testNapi from 'libentry.so';

   3. @Entry
   4. @Component
   5. struct Index {
   6. @State message: string = 'Hello World';

   8. build() {
   9. Row() {
   10. Column() {
   11. Button("TestHiCollieTimerNdk")
   12. .fontSize(50)
   13. .fontWeight(FontWeight.Bold)
   14. .onClick(testNapi.TestHiCollieTimerNdk);  // 添加点击事件，触发TestHiCollieTimerNdk方法。
   15. }
   16. .width('100%')
   17. }
   18. .height('100%')
   19. }
   20. }
   ```
8. 单击DevEco Studio界面中的运行按钮，运行应用工程，然后在应用界面中单击按钮“TestHiCollieTimerNdk”，触发任务执行超时事件。

### 验证观察者是否订阅到任务执行超时事件

应用工程崩溃退出后，再次运行可在Log窗口查看系统事件数据处理日志。

收起

自动换行

深色代码主题

复制

```
1. HiAppEvent eventInfo.domain=OS
2. HiAppEvent eventInfo.name=APP_HICOLLIE
3. HiAppEvent eventInfo.eventType=1
4. HiAppEvent eventInfo.params.time=1754914806680
5. HiAppEvent eventInfo.params.foreground=true
6. HiAppEvent eventInfo.params.bundle_version=1.0.0
7. HiAppEvent eventInfo.params.process_name=com.example.myapplication
8. HiAppEvent eventInfo.params.pid=20317
9. HiAppEvent eventInfo.params.uid=20020198
10. HiAppEvent eventInfo.params.uuid=4asd360e18f5d6d84cf4f0c9e80d66we5786c1cc2343d9632e07abb0d3552asd
11. HiAppEvent eventInfo.params.exception={"message":"","name":"APP_HICOLLIE"}
12. HiAppEvent eventInfo.params.hilog.size=28
13. HiAppEvent eventInfo.params.peer_binder.size=0
14. HiAppEvent eventInfo.params.memory={"pss":0,"rss":150748,"sys_avail_mem":5387264,"sys_free_mem":218902,"sys_total_mem":11679236,"vss":38306936}
15. HiAppEvent eventInfo.params.external_log=["/data/storage/el2/log/hiappevent/APP_HICOLLIE_1754914811140_20317.log"]
16. HiAppEvent eventInfo.params.log_over_limit=false
```

### 移除事件观察者

收起

自动换行

深色代码主题

复制

```
1. // 移除该应用事件观察者以取消订阅事件
2. hiAppEvent.removeWatcher(watcher);
```