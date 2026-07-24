对于涉及多个音频流并发播放的场景，系统已预设了默认的[音频焦点策略](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/audio-playback-concurrency#音频焦点策略)，该策略将对所有音频流（包括播放和录制）实施统一的焦点管理。

应用可利用音频会话管理（AudioSessionManager）提供的接口，通过AudioSession主动管理应用内音频流的焦点，自定义本应用音频流的焦点策略，调整本应用音频流释放音频焦点的时机，从而贴合应用特定的使用需求。

本文主要介绍AudioSession相关C API的使用方法和注意事项，更多音频焦点及音频会话的信息，可参考：[音频焦点介绍](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/audio-playback-concurrency)和[音频会话管理](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/audio-session-management)。

## 使用入门

应用要使用OHAudio提供的音频会话管理（AudioSessionManager）能力，需要添加对应的头文件。

### 在 CMake 脚本中链接动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(sample PUBLIC libohaudio.so)
```

### 添加头文件

应用通过引入[native\_audio\_session\_manager.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-session-manager-h)头文件，使用音频播放相关API。

收起

自动换行

深色代码主题

复制

```
1. #include <ohaudio/native_audio_session_manager.h>
```

## 获取音频会话管理器

创建[OH\_AudioSessionManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiosessionmanager)实例。在使用音频会话管理功能前，需要先通过[OH\_AudioManager\_GetAudioSessionManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-session-manager-h#oh_audiomanager_getaudiosessionmanager)创建音频会话管理实例。

收起

自动换行

深色代码主题

复制

```
1. OH_AudioSessionManager *audioSessionManager;
2. OH_AudioManager_GetAudioSessionManager(&audioSessionManager);
```

## 激活音频会话

应用可以通过[OH\_AudioSessionManager\_ActivateAudioSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-session-manager-h#oh_audiosessionmanager_activateaudiosession)接口激活当前应用的音频会话。

应用在[激活音频会话](/consumer/cn/doc/harmonyos-guides/using-ohaudio-for-session#激活音频会话)时，需指定[音频会话策略（OH\_AudioSession\_Strategy）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiosession-strategy)，其中包含[音频并发模式（OH\_AudioSession\_ConcurrencyMode）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-session-manager-h#oh_audiosession_concurrencymode)参数，用于声明不同的音频并发策略。

收起

自动换行

深色代码主题

复制

```
1. OH_AudioSession_Strategy strategy = {CONCURRENCY_MIX_WITH_OTHERS};

3. OH_AudioSessionManager_ActivateAudioSession(audioSessionManager, &strategy);
```

## 查询音频会话是否已激活

应用可以通过[OH\_AudioSessionManager\_IsAudioSessionActivated](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-session-manager-h#oh_audiosessionmanager_isaudiosessionactivated)接口检查当前应用的音频会话是否已激活。

收起

自动换行

深色代码主题

复制

```
1. bool isActivated = OH_AudioSessionManager_IsAudioSessionActivated(audioSessionManager);
```

## 停用音频会话

应用可以通过[OH\_AudioSessionManager\_DeactivateAudioSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-session-manager-h#oh_audiosessionmanager_deactivateaudiosession)接口停用当前应用的音频会话。

收起

自动换行

深色代码主题

复制

```
1. OH_AudioSessionManager_DeactivateAudioSession(audioSessionManager);
```

## 监听音频会话停用事件

在使用AudioSession功能的过程中，推荐应用监听[音频会话停用事件（OH\_AudioSession\_DeactivatedEvent）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiosession-deactivatedevent)。

当AudioSession被停用（非主动停用）时，应用会收到[音频会话停用事件（OH\_AudioSession\_DeactivatedEvent）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiosession-deactivatedevent)，其中包含[音频会话停用原因（OH\_AudioSession\_DeactivatedReason）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-session-manager-h#oh_audiosession_deactivatedreason)。

在收到AudioSessionDeactivatedEvent时，应用可根据自身业务需求，做相应的处理，例如释放相应资源、重新激活AudioSession等。

### 定义回调函数

收起

自动换行

深色代码主题

复制

```
1. int32_t MyAudioSessionDeactivatedCallback(OH_AudioSession_DeactivatedEvent event)
2. {
3. switch(event.reason) {
4. case DEACTIVATED_LOWER_PRIORITY:
5. // 应用焦点被抢占。
6. return 0;
7. case DEACTIVATED_TIMEOUT:
8. // 超时。
9. return 0;
10. }
11. }
```

### 注册音频会话停用事件回调

应用可以通过[OH\_AudioSessionManager\_RegisterSessionDeactivatedCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-session-manager-h#oh_audiosessionmanager_registersessiondeactivatedcallback)接口监听音频会话停用事件。

收起

自动换行

深色代码主题

复制

```
1. OH_AudioSessionManager_RegisterSessionDeactivatedCallback(audioSessionManager, MyAudioSessionDeactivatedCallback);
```

### 取消注册音频会话停用事件回调

应用可以通过[OH\_AudioSessionManager\_UnregisterSessionDeactivatedCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-session-manager-h#oh_audiosessionmanager_unregistersessiondeactivatedcallback)接口取消监听音频会话停用事件。

收起

自动换行

深色代码主题

复制

```
1. OH_AudioSessionManager_UnregisterSessionDeactivatedCallback(audioSessionManager, MyAudioSessionDeactivatedCallback);
```

**音频会话从创建到激活并监听的完整示例：**

参考以下示例，完成音频会话从创建到激活并监听的过程。

收起

自动换行

深色代码主题

复制

```
1. #include <cstdint>
2. #include "ohaudio/native_audio_session_manager.h"

4. int32_t MyAudioSessionDeactivatedCallback(OH_AudioSession_DeactivatedEvent event)
5. {
6. switch(event.reason) {
7. case DEACTIVATED_LOWER_PRIORITY:
8. // 应用焦点被抢占。
9. return 0;
10. case DEACTIVATED_TIMEOUT:
11. // 超时。
12. return 0;
13. }
14. }

16. OH_AudioSessionManager *audioSessionManager;

18. // 创建音频会话管理器。
19. OH_AudioCommon_Result resultManager = OH_AudioManager_GetAudioSessionManager(&audioSessionManager);

21. OH_AudioSession_Strategy strategy = {CONCURRENCY_MIX_WITH_OTHERS};

23. // 设置音频并发模式并激活音频会话。
24. OH_AudioCommon_Result resultActivate = OH_AudioSessionManager_ActivateAudioSession(audioSessionManager, &strategy);

26. // 查询音频会话是否已激活。
27. bool isActivated = OH_AudioSessionManager_IsAudioSessionActivated(audioSessionManager);

29. // 监听音频会话停用事件。
30. OH_AudioCommon_Result resultRegister = OH_AudioSessionManager_RegisterSessionDeactivatedCallback(audioSessionManager, MyAudioSessionDeactivatedCallback);

32. // 音频会话激活后应用在此处正常执行音频播放、暂停、停止、释放等操作即可。

34. // 取消监听音频会话停用事件。
35. OH_AudioCommon_Result resultUnregister = OH_AudioSessionManager_UnregisterSessionDeactivatedCallback(audioSessionManager, MyAudioSessionDeactivatedCallback);

37. // 停用音频会话。
38. OH_AudioCommon_Result resultDeactivate = OH_AudioSessionManager_DeactivateAudioSession(audioSessionManager);
```

## 通过设置AudioSession场景参数申请焦点

应用通过AudioSession申请焦点。首先要调用接口[OH\_AudioSessionManager\_SetScene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-session-manager-h#oh_audiosessionmanager_setscene)设置场景参数，然后调用[OH\_AudioSessionManager\_ActivateAudioSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-session-manager-h#oh_audiosessionmanager_activateaudiosession)接口激活AudioSession。

收起

自动换行

深色代码主题

复制

```
1. OH_AudioSessionManager_SetScene(audioSessionManager, AUDIO_SESSION_SCENE_MEDIA);

3. OH_AudioSession_Strategy strategy = {CONCURRENCY_MIX_WITH_OTHERS};

5. OH_AudioSessionManager_ActivateAudioSession(audioSessionManager, &strategy);
```

## 监听AudioSession焦点状态变化事件

通过[AudioSession焦点状态事件（OH\_AudioSession\_StateChangedEvent）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiosession-statechangedevent)监听音频会话焦点状态的变化。

**AudioSession申请焦点以及监听焦点变化事件的完整示例：**

收起

自动换行

深色代码主题

复制

```
1. OH_AudioSessionManager *audioSessionManager;

3. // 创建音频会话管理器。
4. OH_AudioCommon_Result resultManager = OH_AudioManager_GetAudioSessionManager(&audioSessionManager);

6. void AudioSessionStateChangedCallback(OH_AudioSession_StateChangedEvent event)
7. {
8. switch(event.stateChangeHint) {
9. case AUDIO_SESSION_STATE_CHANGE_HINT_PAUSE:
10. // 此分支表示系统已将音频流暂停（临时失去焦点），为保持状态一致，应用需切换至音频暂停状态。
11. // 临时失去焦点：其他音频流释放音频焦点后，本音频流会收到resume事件，可继续播放。
12. break;
13. case AUDIO_SESSION_STATE_CHANGE_HINT_RESUME:
14. // 此分支表示系统解除对AudioSession焦点的暂停操作。
15. break;
16. case AUDIO_SESSION_STATE_CHANGE_HINT_STOP:
17. // 此分支表示系统已将音频流停止（永久失去焦点），为保持状态一致，应用需切换至音频暂停状态。
18. // 永久失去焦点：后续不会再收到任何音频焦点事件，若想恢复播放，需要用户主动触发。
19. break;
20. case AUDIO_SESSION_STATE_CHANGE_HINT_TIME_OUT_STOP:
21. // 此分支表示由于长时间没有音频流播放，为防止系统资源被长时间无效占用，系统已将AudioSession停止（永久失去焦点），为保持状态一致，应用需切换至音频暂停状态。
22. // 永久失去焦点：后续不会再收到任何音频焦点事件，若想恢复播放，需要用户主动触发。
23. break;
24. case AUDIO_SESSION_STATE_CHANGE_HINT_DUCK:
25. // 此分支表示系统已将音频音量降低（默认降到正常音量的20%）。
26. break;
27. case AUDIO_SESSION_STATE_CHANGE_HINT_UNDUCK:
28. // 此分支表示系统已将音频音量恢复正常。
29. break;
30. default:
31. break;
32. }
33. }

35. OH_AudioCommon_Result result = OH_AudioSessionManager_RegisterStateChangeCallback(audioSessionManager, AudioSessionStateChangedCallback);

37. // AUDIO_SESSION_SCENE_MEDIA 仅为示例，实际使用时请根据具体情况进行修改。
38. OH_AudioSessionManager_SetScene(audioSessionManager, AUDIO_SESSION_SCENE_MEDIA);

40. // CONCURRENCY_MIX_WITH_OTHERS 是示例，实际使用时请根据情况修改。
41. OH_AudioSession_Strategy strategy = {CONCURRENCY_MIX_WITH_OTHERS};

43. result = OH_AudioSessionManager_ActivateAudioSession(audioSessionManager, &strategy);

45. // 根据实际业务，可以启动多个AudioRenderer等音频播放。

47. result = OH_AudioSessionManager_DeactivateAudioSession(audioSessionManager);

49. result = OH_AudioSessionManager_UnregisterStateChangeCallback(audioSessionManager, AudioSessionStateChangedCallback);
```