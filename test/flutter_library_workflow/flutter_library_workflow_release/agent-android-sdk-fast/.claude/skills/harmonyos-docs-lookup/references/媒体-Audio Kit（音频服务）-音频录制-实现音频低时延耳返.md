从API version 20开始，支持音频低时延耳返。

AudioLoopback是音频返听器，可将音频以更低时延的方式实时传输到耳机中，让用户可以实时听到自己或者其他的相关声音。

常用于K歌类应用，将录制的人声和背景音乐实时传送到耳机中，使用户通过反馈即时进行调整，获得更好的使用体验。

当启用音频返听时，系统会创建低时延渲染器与低时延采集器，实现低时延耳返功能。采集的音频直接通过内部路由返回到渲染器。对于渲染器，其音频焦点策略与[STREAM\_USAGE\_MUSIC](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#streamusage)相匹配。对于采集器，其音频焦点策略与[SOURCE\_TYPE\_MIC](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#sourcetype8)相匹配。

输入/输出设备由系统自动选择。如果当前输入/输出不支持低时延，则音频返听无法启用。在运行过程中，如果音频焦点被另一个音频流抢占，输入/输出设备切换到不支持低时延的设备，系统会自动禁用音频返听。

## 使用前提

* 当前仅支持通过有线耳机实现低时延返听功能，音频由有线耳机进行采集并播放。
* 低功耗渲染器和低时延渲染器在API version 20不能实现并发。若要启用渲染器，建议采用[STREAM\_USAGE\_UNKNOWN](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#streamusage)；系统内决策采用[STREAM\_USAGE\_MUSIC](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#streamusage)创建普通渲染器。

## 开发指导

使用AudioLoopback音频返听涉及到[isAudioLoopbackSupported](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiostreammanager#isaudioloopbacksupported20)返听能力查询、AudioLoopback实例创建、返听音量设置、返听状态监听与返听启用禁用等。本开发指导将以一次启用返听的过程为例，向开发者讲解如何使用AudioLoopback进行音频返听，建议搭配[AudioLoopback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audioloopback)的API说明阅读。

下图展示了AudioLoopback的状态变化。在创建实例后，调用对应的方法可以进入指定的状态实现对应行为。

需要注意的是在确定的状态执行不合适的方法可能导致AudioLoopback发生错误，建议开发者在调用状态转换的方法前进行状态检查，避免程序运行产生预期以外的结果。

**AudioLoopback状态变化示意图**

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f2/v3/wtQ_fUSNQDa7KMu36_4BJg/zh-cn_image_0000002540771678.png?HW-CC-KV=V1&HW-CC-Date=20260414T051800Z&HW-CC-Expire=86400&HW-CC-Sign=0143EBE60C68A8F20CB4574F707856F7815A9039CDEF5521DBA79A8508FAF9D2)

使用[on('statusChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audioloopback#onstatuschange20)方法可以监听AudioLoopback的状态变化，每个状态对应值与说明见[AudioLoopbackStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audioloopbackstatus20)。

### 开发步骤及注意事项

1. 查询返听能力并创建AudioLoopback实例，音频返听模式可以查看[AudioLoopbackMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audioloopbackmode20)。

   说明

   返听需要申请麦克风权限ohos.permission.MICROPHONE，申请方式参考：[向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { audio } from '@kit.AudioKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';

   4. let mode: audio.AudioLoopbackMode = audio.AudioLoopbackMode.HARDWARE;
   5. let audioLoopback: audio.AudioLoopback;
   6. let isSupported = audio.getAudioManager().getStreamManager().isAudioLoopbackSupported(mode);
   7. if (isSupported) {
   8. audio.createAudioLoopback(mode).then((loopback) => {
   9. audioLoopback = loopback;
   10. console.info('Succeeded in creating audio loopback.');
   11. }).catch((err: BusinessError) => {
   12. console.error(`Failed to create audio loopback. Code: ${err.code}, message: ${err.message}`);
   13. });
   14. }
   ```
2. 调用[getStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audioloopback#getstatus20)方法，查询当前返听状态。

   注意

   音频返听状态受音频焦点、低时延管控、采集与播放设备等因素影响。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. audioLoopback.getStatus().then((status: audio.AudioLoopbackStatus) => {
   4. console.info(`Succeeded in getting status, status is ${status}.`);
   5. }).catch((err: BusinessError) => {
   6. console.error(`Failed to get status. Code: ${err.code}, message: ${err.message}`);
   7. });
   ```
3. 调用[setVolume](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audioloopback#setvolume20)方法，设置音频返听音量。

   注意

   * 在启用返听前设置音量，音量将在启用返听成功后生效。
   * 在启用返听后设置音量，音量将立即生效。
   * 启用返听前未设置音量，启用返听时将采用默认音量0.5。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. audioLoopback.setVolume(0.5).then(() => {
   4. console.info('Succeeded in setting volume.');
   5. }).catch((err: BusinessError) => {
   6. console.error(`Failed to set volume. Code: ${err.code}, message: ${err.message}`);
   7. });
   ```
4. 从API version 21开始，支持调用[setReverbPreset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audioloopback#setreverbpreset21)方法，设置音频返听的混响模式。

   注意

   * 在启用返听前设置混响模式，混响模式将在启用返听成功后生效。
   * 在启用返听后设置混响模式，混响模式将立即生效。
   * 启用返听前未设置混响模式，启用返听时将采用默认混响模式[THEATER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audioloopbackreverbpreset21)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';
   2. try {
   3. audioLoopback.setReverbPreset(audio.AudioLoopbackReverbPreset.THEATER);
   4. } catch (err) {
   5. console.error(`Failed to set reverb preset. Code: ${err.code}, message: ${err.message}`);
   6. }
   ```
5. 从API version 21开始，支持调用[getReverbPreset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audioloopback#getreverbpreset21)方法，查询当前的音频返听的混响模式。

   注意

   若未设置混响模式，查询得到将是默认混响模式[THEATER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audioloopbackreverbpreset21)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';
   2. try {
   3. let reverbPreset = audioLoopback.getReverbPreset();
   4. } catch (err) {
   5. console.error(`Failed to get reverb preset. Code: ${err.code}, message: ${err.message}`);
   6. }
   ```
6. 从API version 21开始，支持调用[setEqualizerPreset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audioloopback#setequalizerpreset21)方法，设置音频返听的均衡器类型。

   注意

   * 在启用返听前设置均衡器类型，均衡器类型将在启用返听成功后生效。
   * 在启用返听后设置均衡器类型，均衡器类型将立即生效。
   * 启用返听前未设置均衡器类型，启用返听时将采用默认均衡器类型[FULL](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audioloopbackequalizerpreset21)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';
   2. try {
   3. audioLoopback.setEqualizerPreset(audio.AudioLoopbackEqualizerPreset.FULL);
   4. } catch (err) {
   5. console.error(`Failed to set equalizer preset. Code: ${err.code}, message: ${err.message}`);
   6. }
   ```
7. 从API version 21开始，支持调用[getEqualizerPreset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audioloopback#getequalizerpreset21)方法，查询当前的音频返听的均衡器类型。

   注意

   若未设置均衡器类型，查询得到将是默认均衡器类型[FULL](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audioloopbackequalizerpreset21)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';
   2. try {
   3. let reverbPreset = audioLoopback.getEqualizerPreset();
   4. } catch (err) {
   5. console.error(`Failed to get equalizer preset. Code: ${err.code}, message: ${err.message}`);
   6. }
   ```
8. 调用[enable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audioloopback#enable20)方法，启用或禁用音频返听功能。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. audioLoopback.enable(true).then((isSuccess) => {
   4. if (isSuccess) {
   5. console.info('Succeeded in using enable function.');
   6. } else {
   7. console.error('Failed to use enable function.');
   8. }
   9. }).catch((err: BusinessError) => {
   10. console.error(`Failed to use enable function. code: ${err.code}, message: ${err.message}`);
   11. });

   13. audioLoopback.enable(false).then((isSuccess) => {
   14. if (isSuccess) {
   15. console.info('Succeeded in using enable function.');
   16. } else {
   17. console.error('Failed to use enable function.');
   18. }
   19. }).catch((err: BusinessError) => {
   20. console.error(`Failed to use enable function. code: ${err.code}, message: ${err.message}`);
   21. });
   ```

### 完整示例

使用AudioLoopback启用音频低时延返听示例代码如下所示。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { common } from '@kit.AbilityKit';

5. const TAG = 'AudioLoopbackDemo';

7. let mode: audio.AudioLoopbackMode = audio.AudioLoopbackMode.HARDWARE;
8. let audioLoopback: audio.AudioLoopback | undefined = undefined;
9. let currentReverbPreset: audio.AudioLoopbackReverbPreset = audio.AudioLoopbackReverbPreset.THEATER;
10. let currentEqualizerPreset: audio.AudioLoopbackEqualizerPreset = audio.AudioLoopbackEqualizerPreset.FULL;

12. let statusChangeCallback = (status: audio.AudioLoopbackStatus) => {
13. if (status == audio.AudioLoopbackStatus.UNAVAILABLE_DEVICE) {
14. console.info('Audio loopback status is: UNAVAILABLE_DEVICE');
15. } else if (status == audio.AudioLoopbackStatus.UNAVAILABLE_SCENE) {
16. console.info('Audio loopback status is: UNAVAILABLE_SCENE');
17. } else if (status == audio.AudioLoopbackStatus.AVAILABLE_IDLE) {
18. console.info('Audio loopback status is: AVAILABLE_IDLE');
19. } else if (status == audio.AudioLoopbackStatus.AVAILABLE_RUNNING) {
20. console.info('Audio loopback status is: AVAILABLE_RUNNING');
21. }
22. };

24. // 查询能力，创建实例。
25. function init() {
26. let isSupported = audio.getAudioManager().getStreamManager().isAudioLoopbackSupported(mode);
27. if (isSupported) {
28. audio.createAudioLoopback(mode).then((loopback) => {
29. console.info('Succeeded in creating audio loopback.');
30. audioLoopback = loopback;
31. }).catch((err: BusinessError) => {
32. console.error(`Failed to create audio loopback. Code: ${err.code}, message: ${err.message}`);
33. });
34. } else {
35. console.error('Audio loopback is unsupported.');
36. }
37. }

39. // 设置音频返听音量。
40. async function setVolume(volume: number) {
41. if (audioLoopback !== undefined) {
42. try {
43. await audioLoopback.setVolume(volume);
44. console.info('Succeeded in setting volume.');
45. } catch (err) {
46. console.error(`Failed to set volume. Code: ${err.code}, message: ${err.message}`);
47. }
48. } else {
49. console.error('Audio loopback not created.');
50. }
51. }

53. // 设置音频返听的混响模式。
54. async function setReverbPreset(preset: audio.AudioLoopbackReverbPreset) {
55. if (audioLoopback !== undefined) {
56. try {
57. audioLoopback.setReverbPreset(preset);
58. console.info('Succeeded in setting reverb preset.');
59. currentReverbPreset = audioLoopback.getReverbPreset(); // 查询当前的混响模式，防止设置失败。
60. } catch (err) {
61. console.error(`Failed to set reverb preset. Code: ${err.code}, message: ${err.message}`);
62. }
63. } else {
64. console.error('Audio loopback not created.');
65. }
66. }

68. // 设置音频返听的均衡器类型。
69. async function setEqualizerPreset(preset: audio.AudioLoopbackEqualizerPreset) {
70. if (audioLoopback !== undefined) {
71. try {
72. audioLoopback.setEqualizerPreset(preset);
73. console.info('Succeeded in setting equalizer preset.');
74. currentEqualizerPreset = audioLoopback.getEqualizerPreset(); // 查询当前的均衡器类型，防止设置失败。
75. } catch (err) {
76. console.error(`Failed to set equalizer preset. Code: ${err.code}, message: ${err.message}`);
77. }
78. } else {
79. console.error('Audio loopback not created.');
80. }
81. }

83. // 设置监听事件，启用音频返听。
84. async function enable() {
85. if (audioLoopback !== undefined) {
86. try {
87. let status = await audioLoopback.getStatus();
88. if (status == audio.AudioLoopbackStatus.AVAILABLE_IDLE) {
89. // 注册监听。
90. audioLoopback.on('statusChange', statusChangeCallback);
91. // 启动返听。
92. let success = await audioLoopback.enable(true);
93. if (success) {
94. console.info('Succeeded in using enable function.');
95. } else {
96. status = await audioLoopback.getStatus();
97. statusChangeCallback(status);
98. }
99. } else {
100. statusChangeCallback(status);
101. }
102. } catch (err) {
103. console.error(`Failed to use enable function. code: ${err.code}, message: ${err.message}`);
104. }
105. } else {
106. console.error('Audio loopback not created.');
107. }
108. }

110. // 禁用音频返听，关闭监听事件。
111. async function disable() {
112. if (audioLoopback !== undefined) {
113. try {
114. let status = await audioLoopback.getStatus();
115. if (status == audio.AudioLoopbackStatus.AVAILABLE_RUNNING) {
116. // 禁用返听。
117. let success = await audioLoopback.enable(false);
118. if (success) {
119. console.info('Succeeded in using enable function.');
120. // 关闭监听。
121. audioLoopback.off('statusChange', statusChangeCallback);
122. } else {
123. status = await audioLoopback.getStatus();
124. statusChangeCallback(status);
125. }
126. } else {
127. statusChangeCallback(status);
128. }
129. } catch (err) {
130. console.error(`Failed to use enable function. code: ${err.code}, message: ${err.message}`);
131. }
132. } else {
133. console.error('Audio loopback not created.');
134. }
135. }
```

### 音频低时延返听示例

可参考[使用AudioLoopback启用音频低时延返听的示例](https://gitcode.com/openharmony/applications_app_samples/tree/master/code/BasicFeature/Media/Audio)。