音频工作组是一套通过标记来帮助系统识别应用内音频关键线程的接口，系统通过应用提供的关键音频线程以及工作组运行信息可以让音频线程的运行状态更加健康。

## 使用说明

对于播放音频类应用，开发者需要先创建音频工作组，再将工作组运行信息的周期性告知系统。当工作结束后，需要对音频工作组进行清理。

### 创建音频工作组示例

开发者在使用OH\_AudioWorkgroup的API前，需要先用[OH\_AudioManager\_GetAudioResourceManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audiomanager_getaudioresourcemanager)获取OH\_AudioResourceManager实例。

收起

自动换行

深色代码主题

复制

```
1. #include <ohaudio/native_audio_resource_manager.h>

3. OH_AudioResourceManager *resMgr;
4. OH_AudioManager_GetAudioResourceManager(&resMgr);
```

### 创建音频工作组并将关键线程加入音频工作组

开发者先使用[OH\_AudioResourceManager\_CreateWorkgroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audioresourcemanager_createworkgroup)创建一个新的音频工作组，再使用[OH\_AudioWorkgroup\_AddCurrentThread](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audioworkgroup_addcurrentthread)将关键线程加入音频工作组。

收起

自动换行

深色代码主题

复制

```
1. #include <chrono>

3. int32_t tokenId;
4. OH_AudioWorkgroup *grp = nullptr;

6. OH_AudioResourceManager_CreateWorkgroup(resMgr, "workgroup", &grp);
7. OH_AudioWorkgroup_AddCurrentThread(grp, &tokenId);
```

### 通知系统音频工作组的开始与结束

当音频工作组开始一个工作周期时，开发者可以通知系统任务的开始时间和预期完成时间。在音频工作组完成当前周期内的工作时，开发者应再次通知系统任务已结束。

收起

自动换行

深色代码主题

复制

```
1. constexpr static uint64_t intervalMs = 20;
2. bool threadShouldRun = true;

4. while (threadShouldRun) {
5. auto now = std::chrono::system_clock::now().time_since_epoch();
6. auto startTimeMs = std::chrono::duration_cast<std::chrono::milliseconds>(now).count();

8. OH_AudioWorkgroup_Start(grp, startTimeMs, startTimeMs + intervalMs);

10. // 应用音频数据处理。

12. OH_AudioWorkgroup_Stop(grp);
13. }
```

### 工作组任务结束后进行清理

收起

自动换行

深色代码主题

复制

```
1. // 当线程已经不需要接入分组时，将其从工作组中移除。
2. OH_AudioWorkgroup_RemoveThread(grp, tokenId);

4. OH_AudioResourceManager_ReleaseWorkgroup(resMgr, grp);
5. grp = nullptr;
```