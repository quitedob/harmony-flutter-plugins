对于涉及多个音频流并发的场景，系统已预设了默认的[音频焦点策略](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/audio-playback-concurrency#音频焦点策略)，该策略将对所有音频流（包括播放和录制）实施统一的焦点管理。

当系统提供的默认焦点策略不能满足应用需求时，应用可利用音频会话管理提供的接口，管理应用内音频流的焦点，自定义音频流的焦点策略，调整音频流释放焦点的时机，以满足特定需求。该篇文章的示例代码均为ArkTS，如果需要使用OHAudio开发请参考[使用OHAudio开发音频会话功能(C/C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/using-ohaudio-for-session)。

使用音频会话相关接口，可以实现以下功能：

* 系统默认焦点策略不能满足应用当前需求，应用可[使用音频会话修改焦点策略](/consumer/cn/doc/harmonyos-guides/audio-session-management#使用音频会话修改焦点策略)来适配适合自己的焦点策略。

  典型场景：应用播放短视频时，会打断后台音乐，应用希望自身的音频流停止后，后台的音乐可以自动恢复（该场景需要应用在音频流启动前激活音频会话，音频流停止后停用音频会话）。
* 当应用在某个业务流程中需要启动多个音频流，且要保证整个流程的完整性时，应用可[使用音频会话申请焦点策略](/consumer/cn/doc/harmonyos-guides/audio-session-management#使用音频会话申请焦点策略)来适配适合自己业务场景的焦点策略。

  典型场景：应用连续播放多个音频时，在多个音频衔接的间隙，不希望后台被影响的其他音频自动恢复，希望整个播放过程保持音频焦点的连贯性（该场景需要应用在整个播放过程开始前激活音频会话，整个播放过程结束后停用音频会话）。

注意

* 音频并发策略优先级为：STOP > PAUSE > DUCK > PLAYBOTH。当指定的音频会话策略优先级高于默认并发策略时，指定的音频会话策略不会生效。
* 应用在开始音频播放或录制之前需要确保音频会话已经处于激活状态，否则音频会话的自定义焦点策略不会生效。若应用使用了异步接口，则需要格外注意异步操作执行的时序。

## 获取音频会话管理器

在使用AudioSessionManager的API前，需要先通过[getSessionManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiomanager#getsessionmanager12)获取一个单例AudioSessionManager对象。

使用OHAudio开发请参考：[获取音频会话管理器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/using-ohaudio-for-session#获取音频会话管理器)。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';

3. let audioManager = audio.getAudioManager();
4. let audioSessionManager: audio.AudioSessionManager = audioManager.getSessionManager();
```

## 音频会话策略

应用在激活AudioSession时，需先指定[音频会话策略（AudioSessionStrategy）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-i#audiosessionstrategy12)。可通过设置[音频并发模式（AudioConcurrencyMode）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audioconcurrencymode12)来指定不同的音频会话策略。

使用OHAudio开发请参考：[音频会话策略（OH\_AudioSession\_Strategy）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiosession-strategy)

系统预设的音频并发模式如下所示：

* 默认模式（CONCURRENCY\_DEFAULT）：即系统默认的[音频焦点策略](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/audio-playback-concurrency#音频焦点策略)。
* 并发模式（CONCURRENCY\_MIX\_WITH\_OTHERS）：和其他音频流并发。

  **典型场景：**

  + 应用播放音乐时，会被后起的音乐或视频打断，应用希望自身的音频流和后起的音乐或视频并发（该场景需要应用在音频流启动前激活AudioSession）。
  + 应用录音时，会打断后台正在播放的音乐或视频，应用希望自身的音频流和后台正在播放的音乐或视频并发（该场景需要应用在音频流启动前激活AudioSession）。
* 降低音量模式（CONCURRENCY\_DUCK\_OTHERS）：和其他音频流并发，并且降低其他音频流的音量。

  **典型场景：** 应用播放游戏音效时，会和后台正在播放的音乐并发，应用希望自身的音频流和后台正在播放的音乐并发时压低后台音乐音量（该场景需要应用在音频流启动前激活AudioSession）。
* 暂停模式（CONCURRENCY\_PAUSE\_OTHERS）：暂停其他音频流，待释放焦点后通知其他音频流恢复。

  **典型场景：** 应用播放短视频时，会打断后台正在播放的音乐，应用希望自身的音频流停止后，后台的音乐可以自动恢复（该场景需要应用在音频流启动前激活AudioSession，音频流停止后停用AudioSession）。

注意

* 当应用通过AudioSession使用上述各种模式时，系统将尽量满足其焦点策略，但可能无法保证在所有场景下完全满足。
* 并发模式（CONCURRENCY\_MIX\_WITH\_OTHERS）在本应用申请焦点和后续其他应用申请焦点时均会生效；降低音量模式（CONCURRENCY\_DUCK\_OTHERS）和暂停模式（CONCURRENCY\_PAUSE\_OTHERS）仅在本应用申请焦点时生效，后续其他应用申请焦点时，优先遵循其他应用的并发模式。

## 使用音频会话修改焦点策略

系统默认焦点策略不能满足应用当前需求时，应用可通过指定[音频会话策略](/consumer/cn/doc/harmonyos-guides/audio-session-management#音频会话策略)后激活AudioSession来完成焦点策略修改。

AudioSession激活成功后，应用新起的音频流将会按照修改后的焦点策略起流。

使用AudioSession修改焦点策略时，AudioSession不会持有焦点，焦点仍由各个音频流持有。

使用OHAudio开发请参考：[使用OHAudio开发音频会话功能(C/C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/using-ohaudio-for-session)。

注意

当AudioSession因超时而停用时，被其压低音量（Duck）的音频会触发恢复音量（Unduck）操作，被其暂停（Pause）的音频流会触发停止（Stop）操作。

### AudioSession停用事件

应用在使用AudioSession的过程中，推荐应用监听音频会话停用事件（AudioSessionDeactivatedEvent）。当AudioSession被停用（非主动停用）时，应用会收到此事件通知。应用可根据自身业务需求，做相应的处理，例如释放相应资源、重新激活AudioSession等。

音频会话停用事件（AudioSessionDeactivatedEvent）包含AudioSessionDeactivatedReason参数，用于标识会话停用的具体原因（如焦点被抢占或超时）。

1. 应用焦点被抢占（DEACTIVATED\_LOWER\_PRIORITY）：该应用所有的音频流持有的焦点全部被其他应用抢占时，AudioSession被同时停用。
2. 超时（DEACTIVATED\_TIMEOUT）：若AudioSession处于激活状态，但该应用没有音频流在运行状态，则AudioSession会在规定时间后被超时停用。

### 开发步骤

1. 指定音频会话策略（AudioSessionStrategy）并激活音频会话。

   应用可以通过[activateAudioSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#activateaudiosession12)接口激活当前应用的音频会话。

   应用在激活AudioSession时，需指定[音频会话策略](/consumer/cn/doc/harmonyos-guides/audio-session-management#音频会话策略)。策略中包含参数concurrencyMode，其类型为[AudioConcurrencyMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audioconcurrencymode12)，用于声明音频并发策略。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { audio } from '@kit.AudioKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';

   4. let strategy: audio.AudioSessionStrategy = {
   5. concurrencyMode: audio.AudioConcurrencyMode.CONCURRENCY_MIX_WITH_OTHERS
   6. };

   8. audioSessionManager.activateAudioSession(strategy).then(() => {
   9. console.info('Succeeded in activating audio session.');
   10. }).catch((err: BusinessError) => {
   11. console.error(`Failed to activate audio session. Code: ${err.code}, message: ${err.message}`);
   12. });
   ```
2. 查询音频会话是否已激活（可选）。

   应用可以通过[isAudioSessionActivated](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#isaudiosessionactivated12)接口检查当前应用的音频会话是否已激活。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let isActivated = audioSessionManager.isAudioSessionActivated();
   ```
3. 监听音频会话停用事件（可选）。

   应用可以通过[on('audioSessionDeactivated')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#onaudiosessiondeactivated12)接口监听[音频会话停用事件（AudioSessionDeactivatedEvent）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-i#audiosessiondeactivatedevent12)。

   当AudioSession被停用（非主动停用）时，应用会收到[音频会话停用事件（AudioSessionDeactivatedEvent）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-i#audiosessiondeactivatedevent12)，其中包含[音频会话停用原因（AudioSessionDeactivatedReason）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audiosessiondeactivatedreason12)。

   在收到AudioSessionDeactivatedEvent时，应用可根据自身业务需求，做相应的处理，例如释放相应资源、重新激活AudioSession等。

   应用可以通过[off('audioSessionDeactivated')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#offaudiosessiondeactivated12)接口取消监听音频会话停用事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { audio } from '@kit.AudioKit';

   3. audioSessionManager.on('audioSessionDeactivated', (audioSessionDeactivatedEvent: audio.AudioSessionDeactivatedEvent) => {
   4. console.info(`Succeeded in using on function. AudioSessionDeactivatedEvent: ${JSON.stringify(audioSessionDeactivatedEvent)}`);
   5. });
   ```
4. 停用音频会话。

   应用可以通过[deactivateAudioSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#deactivateaudiosession12)接口停用当前应用的音频会话。

   说明

   AudioSession停用后，应用新起的音频流将会按照默认焦点策略起流。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. audioSessionManager.deactivateAudioSession().then(() => {
   4. console.info('Succeeded in deactivating audio session.');
   5. }).catch((err: BusinessError) => {
   6. console.error(`Failed to deactivate audio session. Code: ${err.code}, message: ${err.message}`);
   7. });
   ```

### 完整示例

下面展示了使用AudioSession修改焦点策略的示例代码。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let audioManager = audio.getAudioManager();
5. // 创建音频会话管理器。
6. let audioSessionManager: audio.AudioSessionManager = audioManager.getSessionManager();
7. // 设置音频并发模式。
8. let strategy: audio.AudioSessionStrategy = {
9. concurrencyMode: audio.AudioConcurrencyMode.CONCURRENCY_MIX_WITH_OTHERS
10. };

12. // 激活音频会话。
13. audioSessionManager.activateAudioSession(strategy).then(() => {
14. console.info('Succeeded in activating audio session.');
15. }).catch((err: BusinessError) => {
16. console.error(`Failed to activate audio session. Code: ${err.code}, message: ${err.message}`);
17. });

19. // 查询音频会话是否已激活。
20. let isActivated = audioSessionManager.isAudioSessionActivated();

22. // 监听音频会话停用事件。
23. audioSessionManager.on('audioSessionDeactivated', (audioSessionDeactivatedEvent: audio.AudioSessionDeactivatedEvent) => {
24. console.info(`Succeeded in using on function. AudioSessionDeactivatedEvent: ${JSON.stringify(audioSessionDeactivatedEvent)}`);
25. });

27. if (isActivated) {
28. // 音频会话激活后，应用在此处正常执行音频播放、暂停、停止、释放等操作即可。
29. }

31. // 取消监听音频会话停用事件。
32. audioSessionManager.off('audioSessionDeactivated');

34. // 停用音频会话。
35. audioSessionManager.deactivateAudioSession().then(() => {
36. console.info('Succeeded in deactivating audio session.');
37. }).catch((err: BusinessError) => {
38. console.error(`Failed to deactivate audio session. Code: ${err.code}, message: ${err.message}`);
39. });
```

## 使用音频会话申请焦点策略

当应用需要启动多个音频流并保证流程连续性时，可通过AudioSession申请焦点，确保多音频流播放的连续性。

激活AudioSession时系统会根据应用选择的[音频会话场景](/consumer/cn/doc/harmonyos-guides/audio-session-management#音频会话场景)申请对应的音频焦点并由AudioSession持有该焦点，后续应用通过AudioRenderer启动的播放流将不再申请音频焦点。

使用OHAudio开发请参考：[使用OHAudio开发音频会话功能(C/C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/using-ohaudio-for-session)。

典型使用场景如下：

* 在多个小视频滑动播放时，多个音频流频繁申请和释放焦点可能导致漏音。使用AudioSession申请一次焦点，可以避免中间多个音频流播放时频繁申请和释放焦点，从而防止漏音。
* 在VoIP通话场景下，可能需要启动铃声流、录音流和播放流，这些音频流的焦点优先级不同，部分音频流可能被其他应用的音频流中断。为了保持业务体验的连续性，可以使用AudioSession申请焦点，避免音频流被中断。
* 应用使用播放器的SDK播放音频流，不持有AudioRenderer对象，但希望监听焦点变化。

注意

* AudioSession申请的焦点是应用级别的，如果应用内部包含不同的模块，各个模块间要做好协调处理，避免其中一个模块使用AudioSession申请了焦点，另一个模块的音频流被AudioSession的焦点管控而产生非预期的效果。
* 通过AudioSession申请焦点，仅对播放流有效，对录音流及部分播放音频流（如STREAM\_USAGE\_ALARM、STREAM\_USAGE\_NOTIFICATION、STREAM\_USAGE\_ACCESSIBILITY等）无效。
* 在AudioSession激活过程中，如果动态修改AudioSessionScene，需要重新调用activateAudioSession才能生效。
* 通过AudioSession申请焦点后，焦点由AudioSession持有。应用当前播放场景结束后，需要主动停用AudioSession才会释放焦点。避免出现播放流停止后，焦点未释放导致的焦点异常持有。

### 音频会话场景

使用AudioSession申请焦点策略时，系统提供了三种音频会话场景。激活AudioSession前需要先通过[setAudioSessionScene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#setaudiosessionscene20)设置对应的音频会话场景，后续AudioSession激活时系统会根据应用选择的音频会话场景申请对应的音频焦点。

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| AUDIO\_SESSION\_SCENE\_MEDIA | 0 | 媒体音频会话场景。 |
| AUDIO\_SESSION\_SCENE\_GAME | 1 | 游戏音频会话场景。 |
| AUDIO\_SESSION\_SCENE\_VOICE\_COMMUNICATION | 2 | VoIP语音通话音频会话场景。 |

### 监听AudioSession焦点和状态变化事件

AudioSession申请的焦点和AudioRenderer申请的焦点是同等地位。

应用可以通过[on('audioSessionStateChanged')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#onaudiosessionstatechanged20)来监听AudioSession的焦点和状态变化。为了维持应用和系统的状态一致性，确保良好的用户体验，应用应监听AudioSession焦点状态事件，并在焦点变化时做出必要响应。

[on('audioSessionStateChanged')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#onaudiosessionstatechanged20)包含了[AudioSession停用事件](/consumer/cn/doc/harmonyos-guides/audio-session-management#audiosession停用事件)的信息，当[使用音频会话申请焦点策略](/consumer/cn/doc/harmonyos-guides/audio-session-management#使用音频会话申请焦点策略)时无需再额外监听音频会话停用事件（AudioSessionDeactivatedEvent）。

说明

如果应用同时注册了AudioRenderer的焦点事件监听，需要注意以下两点：

1. 应用会收到AudioSession焦点状态变化和AudioRenderer焦点变化的回调（[InterruptEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-i#interruptevent9)），根据需要处理这些回调即可。
2. 如果AudioSession的焦点被暂停，恢复暂停状态时，只会给AudioSession发送焦点恢复事件，不会再给AudioRenderer发送焦点恢复事件。收到恢复事件后，当应用需要通过AudioSession申请焦点恢复播放时，必须重新调用[setAudioSessionScene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#setaudiosessionscene20)设置场景参数，再调用[activateAudioSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#activateaudiosession12)激活AudioSession。

### 开发步骤

1. 指定音频会话场景（AudioSessionScene）和策略（AudioSessionStrategy）并激活音频会话。

   应用通过AudioSession申请焦点。首先要调用接口[setAudioSessionScene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#setaudiosessionscene20)设置场景参数，然后调用[activateAudioSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#activateaudiosession12)接口激活AudioSession。激活AudioSession时系统会根据应用选择的音频会话场景申请对应的音频焦点。

   说明

   * 激活AudioSession时系统会根据应用选择的音频会话场景申请对应的音频焦点，后续应用通过AudioRenderer启动的播放流不再申请音频焦点。
   * 如果激活AudioSession时应用已存在启动的音频播放流，系统会释放该音频播放流持有的焦点，并由AudioSession统一管理。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { audio } from '@kit.AudioKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';

   4. audioSessionManager.setAudioSessionScene(audio.AudioSessionScene.AUDIO_SESSION_SCENE_MEDIA);

   6. let strategy: audio.AudioSessionStrategy = {
   7. concurrencyMode: audio.AudioConcurrencyMode.CONCURRENCY_MIX_WITH_OTHERS
   8. };

   10. audioSessionManager.activateAudioSession(strategy).then(() => {
   11. console.info('Succeeded in activating audio session.');
   12. }).catch((err: BusinessError) => {
   13. console.error(`Failed to activate audio session. Code: ${err.code}, message: ${err.message}`);
   14. });
   ```
2. 查询音频会话是否已激活（可选）。

   应用可以通过[isAudioSessionActivated](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#isaudiosessionactivated12)接口检查当前应用的音频会话是否已激活。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let isActivated = audioSessionManager.isAudioSessionActivated();
   ```
3. 监听AudioSession焦点状态变化事件。

   应用可以通过[on('audioSessionStateChanged')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#onaudiosessionstatechanged20)来监听AudioSession的焦点和状态变化。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { audio } from '@kit.AudioKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';

   4. let audioSessionStateChangedCallback = (audioSessionStateChangedEvent: audio.AudioSessionStateChangedEvent) => {
   5. console.info(`hint of audioSessionStateChanged: ${audioSessionStateChangedEvent.stateChangeHint} `);

   7. switch (audioSessionStateChangedEvent.stateChangeHint) {
   8. case audio.AudioSessionStateChangeHint.AUDIO_SESSION_STATE_CHANGE_HINT_PAUSE:
   9. // 此分支表示系统已将音频流暂停，应用需切换至音频暂停状态。
   10. // 临时失去焦点：AudioSession会停用并释放焦点，同时停止应用所有音频流的播放。因此，当应用收到Resume回调后，需要重新激活AudioSession并恢复需要继续播放的音频流。
   11. break;
   12. case audio.AudioSessionStateChangeHint.AUDIO_SESSION_STATE_CHANGE_HINT_RESUME:
   13. // 此分支表示系统解除AudioSession焦点的暂停操作。
   14. break;
   15. case audio.AudioSessionStateChangeHint.AUDIO_SESSION_STATE_CHANGE_HINT_STOP:
   16. // 此分支表示系统已将音频流停止（永久失去焦点），为保持状态一致，应用需切换至音频暂停状态。
   17. // 永久失去焦点：AudioSession会停用并释放焦点，同时停止应用所有音频流的播放。后续不会再收到音频焦点事件，恢复播放需用户主动触发。
   18. break;
   19. case audio.AudioSessionStateChangeHint.AUDIO_SESSION_STATE_CHANGE_HINT_TIME_OUT_STOP:
   20. // 此分支表示由于长时间无音频流播放，系统已将AudioSession停止（永久失去焦点），应用需切换至音频停止状态。
   21. // 永久失去焦点：后续不会再收到音频焦点事件，恢复播放需用户主动触发。
   22. break;
   23. case audio.AudioSessionStateChangeHint.AUDIO_SESSION_STATE_CHANGE_HINT_DUCK:
   24. // 此分支表示系统已将应用所有播放音频流音量降低（默认降到正常音量的20%）。
   25. break;
   26. case audio.AudioSessionStateChangeHint.AUDIO_SESSION_STATE_CHANGE_HINT_UNDUCK:
   27. // 此分支表示系统已将应用所有播放音频流音量恢复正常。
   28. break;
   29. default:
   30. break;
   31. }
   32. };

   34. audioSessionManager.on('audioSessionStateChanged', audioSessionStateChangedCallback);
   ```
4. 停用音频会话。

   应用可以通过[deactivateAudioSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#deactivateaudiosession12)接口停用当前应用的音频会话。

   说明

   停用AudioSession时系统会释放AudioSession申请的焦点，并停用该应用正在播放的所有音频流。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. audioSessionManager.deactivateAudioSession().then(() => {
   4. console.info('Succeeded in doing deactivateAudioSession.');
   5. }).catch((err: BusinessError) => {
   6. console.error(`Failed to deactivateAudioSession. Code: ${err.code}, message: ${err.message}`);
   7. });
   ```

### 完整示例

下面展示了使用AudioSession申请焦点策略的示例代码。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';  // 导入audio模块。
2. import { BusinessError } from '@kit.BasicServicesKit'; // 导入BusinessError。

4. // 应用根据业务场景设置适合自己的音频会话场景，激活AudioSession时，系统会根据应用选择的音频会话场景申请对应的音频焦点。
5. audioSessionManager.setAudioSessionScene(audio.AudioSessionScene.AUDIO_SESSION_SCENE_MEDIA);

7. // 设置音频会话策略。
8. let strategy: audio.AudioSessionStrategy = {
9. concurrencyMode: audio.AudioConcurrencyMode.CONCURRENCY_MIX_WITH_OTHERS;
10. };

12. // 激活AudioSession。
13. audioSessionManager.activateAudioSession(strategy).then(() => {
14. console.info('Succeeded in activating audio session.');
15. }).catch((err: BusinessError) => {
16. console.error(`Failed to activate audio session. Code: ${err.code}, message: ${err.message}`);
17. });

19. // 监听AudioSession焦点和状态变化事件。
20. let audioSessionStateChangedCallback = (audioSessionStateChangedEvent: audio.AudioSessionStateChangedEvent) => {
21. console.info(`hint of audioSessionStateChanged: ${audioSessionStateChangedEvent.stateChangeHint} `);

23. switch (audioSessionStateChangedEvent.stateChangeHint) {
24. case audio.AudioSessionStateChangeHint.AUDIO_SESSION_STATE_CHANGE_HINT_PAUSE:
25. // 此分支表示系统已将音频流暂停，应用需切换至音频暂停状态。
26. // 临时失去焦点：AudioSession会停用并释放焦点，同时停止应用所有音频流的播放。因此，当应用收到Resume回调后，需要重新激活AudioSession并恢复需要继续播放的音频流。
27. break;
28. case audio.AudioSessionStateChangeHint.AUDIO_SESSION_STATE_CHANGE_HINT_RESUME:
29. // 此分支表示系统解除AudioSession焦点的暂停操作。
30. break;
31. case audio.AudioSessionStateChangeHint.AUDIO_SESSION_STATE_CHANGE_HINT_STOP:
32. // 此分支表示系统已将音频流停止（永久失去焦点），为保持状态一致，应用需切换至音频暂停状态。
33. // 永久失去焦点：AudioSession会停用并释放焦点，同时停止应用所有音频流的播放。后续不会再收到音频焦点事件，恢复播放需用户主动触发。
34. break;
35. case audio.AudioSessionStateChangeHint.AUDIO_SESSION_STATE_CHANGE_HINT_TIME_OUT_STOP:
36. // 此分支表示由于长时间无音频流播放，系统已将AudioSession停止（永久失去焦点），应用需切换至音频停止状态。
37. // 永久失去焦点：后续不会再收到音频焦点事件，恢复播放需用户主动触发。
38. break;
39. case audio.AudioSessionStateChangeHint.AUDIO_SESSION_STATE_CHANGE_HINT_DUCK:
40. // 此分支表示系统已将应用所有播放音频流音量降低（默认降到正常音量的20%）。
41. break;
42. case audio.AudioSessionStateChangeHint.AUDIO_SESSION_STATE_CHANGE_HINT_UNDUCK:
43. // 此分支表示系统已将应用所有播放音频流音量恢复正常。
44. break;
45. default:
46. break;
47. }
48. };
49. audioSessionManager.on('audioSessionStateChanged', audioSessionStateChangedCallback);

51. // 查询音频会话是否已激活。
52. let isActivated = audioSessionManager.isAudioSessionActivated();

54. if (isActivated) {
55. // 音频会话激活后，应用在此处正常执行音频播放、暂停、停止、释放等操作即可。
56. // 根据实际业务，应用可以启动多个AudioRenderer音频播放流。此处启动的音频播放流不再持有焦点，统一由AudioSession管理。
57. // 如果存在多条音频流同时播放，需要特别注意AudioSession停用时机（停用AudioSession时会同时释放应用所有音频播放流）。
58. }


61. // 业务结束，取消监听AudioSession焦点和状态变化事件。
62. audioSessionManager.off('audioSessionStateChanged', audioSessionStateChangedCallback);

64. // 停用AudioSession，即释放焦点并停用该应用正在播放的所有音频流。
65. audioSessionManager.deactivateAudioSession().then(() => {
66. console.info('Succeeded in deactivating audio session.');
67. }).catch((err: BusinessError) => {
68. console.error(`Failed to deactivate audio session. Code: ${err.code}, message: ${err.message}`);
69. });
```