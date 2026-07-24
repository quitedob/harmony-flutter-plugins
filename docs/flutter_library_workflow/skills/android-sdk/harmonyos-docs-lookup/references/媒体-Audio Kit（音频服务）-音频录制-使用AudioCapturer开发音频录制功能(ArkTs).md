AudioCapturer是音频采集器，用于录制PCM（Pulse Code Modulation）音频数据，适合有音频开发经验的开发者实现更灵活的录制功能。

## 开发指导

使用AudioCapturer录制音频涉及到AudioCapturer实例的创建、音频采集参数的配置、采集的开始与停止、资源的释放等。本开发指导将以一次录制音频数据的过程为例，向开发者讲解如何使用AudioCapturer进行音频录制，建议搭配[AudioCapturer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiocapturer)的API说明阅读。

下图展示了AudioCapturer的状态变化，在创建实例后，调用对应的方法可以进入指定的状态实现对应的行为。需要注意的是在确定的状态执行不合适的方法可能导致AudioCapturer发生错误，建议开发者在调用状态转换的方法前进行状态检查，避免程序运行产生预期以外的结果。

**图1** AudioCapturer状态变化示意图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cd/v3/2Mepzb75R0ept3ZY2vhLEw/zh-cn_image_0000002540612024.png?HW-CC-KV=V1&HW-CC-Date=20260414T051737Z&HW-CC-Expire=86400&HW-CC-Sign=57E69243E6F97EC88E964293F403DE5F810C1C2EC7F32A2190B8D92CE9955D30)

使用[on('stateChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiocapturer#onstatechange8)方法可以监听AudioCapturer的状态变化，每个状态对应值与说明见[AudioState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audiostate8)。

### 开发步骤及注意事项

1. 配置音频采集参数并创建AudioCapturer实例，音频采集参数的详细信息可以查看[AudioCapturerOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-i#audiocaptureroptions8)。

   说明

   当设置Mic音频源（即[SourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#sourcetype8)为SOURCE\_TYPE\_MIC、SOURCE\_TYPE\_VOICE\_RECOGNITION、SOURCE\_TYPE\_VOICE\_COMMUNICATION、SOURCE\_TYPE\_VOICE\_MESSAGE、SOURCE\_TYPE\_LIVE（从API version 20开始支持））时，需要申请麦克风权限ohos.permission.MICROPHONE，申请方式参考：[向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { audio } from '@kit.AudioKit';

   3. let audioStreamInfo: audio.AudioStreamInfo = {
   4. samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_48000, // 采样率。
   5. channels: audio.AudioChannel.CHANNEL_2, // 通道。
   6. sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE, // 采样格式。
   7. encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW // 编码格式。
   8. };

   10. let audioCapturerInfo: audio.AudioCapturerInfo = {
   11. source: audio.SourceType.SOURCE_TYPE_MIC, // 音源类型：Mic音频源。根据业务场景配置，参考SourceType。
   12. capturerFlags: 0 // 音频采集器标志。
   13. };

   15. let audioCapturerOptions: audio.AudioCapturerOptions = {
   16. streamInfo: audioStreamInfo,
   17. capturerInfo: audioCapturerInfo
   18. };

   20. audio.createAudioCapturer(audioCapturerOptions, (err, data) => {
   21. if (err) {
   22. console.error(`Invoke createAudioCapturer failed, code is ${err.code}, message is ${err.message}`);
   23. } else {
   24. console.info('Invoke createAudioCapturer succeeded.');
   25. let audioCapturer = data;
   26. }
   27. });
   ```
2. 调用[on('readData')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiocapturer#onreaddata11)方法，订阅监听音频数据读入回调。

   注意

   * **线程管理**：不建议使用多线程来处理数据读取。若需使用多线程读取数据，需要做好线程管理。
   * **线程耗时**：readData 方法所在的线程中，不建议执行耗时任务。否则可能会导致数据处理线程响应回调延迟，进而引发录音数据缺失、卡顿、杂音等音频效果问题。
   * **注册回调**：开发者应避免在主线程中注册回调，以免被其他业务阻塞导致响应回调不及时造成卡顿。建议使用独立的异步线程池处理回调。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';
   2. import { fileIo as fs } from '@kit.CoreFileKit';
   3. import { common } from '@kit.AbilityKit';

   5. class Options {
   6. offset?: number;
   7. length?: number;
   8. }

   10. let bufferSize: number = 0;
   11. // 请在组件内获取context，确保this.getUIContext().getHostContext()返回结果为UIAbilityContext。
   12. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
   13. let path = context.cacheDir;
   14. let filePath = path + '/StarWars10s-2C-48000-4SW.pcm';
   15. let file: fs.File = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
   16. let readDataCallback = (buffer: ArrayBuffer) => {
   17. let options: Options = {
   18. offset: bufferSize,
   19. length: buffer.byteLength
   20. }
   21. fs.writeSync(file.fd, buffer, options);
   22. bufferSize += buffer.byteLength;
   23. };

   25. audioCapturer.on('readData', readDataCallback);
   ```
3. 调用[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiocapturer#start8)方法进入running状态，开始录制音频。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. audioCapturer.start((err: BusinessError) => {
   4. if (err) {
   5. console.error(`Capturer start failed, code is ${err.code}, message is ${err.message}`);
   6. } else {
   7. console.info('Capturer start success.');
   8. }
   9. });
   ```
4. 调用[stop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiocapturer#stop8)方法停止录制。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. audioCapturer.stop((err: BusinessError) => {
   4. if (err) {
   5. console.error(`Capturer stop failed, code is ${err.code}, message is ${err.message}`);
   6. } else {
   7. console.info('Capturer stopped.');
   8. }
   9. });
   ```
5. 调用[release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiocapturer#release8)方法销毁实例，释放资源。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. audioCapturer.release((err: BusinessError) => {
   4. if (err) {
   5. console.error(`capturer release failed, code is ${err.code}, message is ${err.message}`);
   6. } else {
   7. console.info('capturer released.');
   8. }
   9. });
   ```

### 完整示例

下面展示了使用AudioCapturer录制音频的完整示例代码。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { fileIo as fs } from '@kit.CoreFileKit';
4. import { common } from '@kit.AbilityKit';

6. const TAG = 'AudioCapturerDemo';

8. class Options {
9. offset?: number;
10. length?: number;
11. }

13. let audioCapturer: audio.AudioCapturer | undefined = undefined;
14. let audioStreamInfo: audio.AudioStreamInfo = {
15. samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_48000, // 采样率。
16. channels: audio.AudioChannel.CHANNEL_2, // 通道。
17. sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE, // 采样格式。
18. encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW // 编码格式。
19. };
20. let audioCapturerInfo: audio.AudioCapturerInfo = {
21. source: audio.SourceType.SOURCE_TYPE_MIC, // 音源类型：Mic音频源。根据业务场景配置，参考SourceType。
22. capturerFlags: 0 // 音频采集器标志。
23. };
24. let audioCapturerOptions: audio.AudioCapturerOptions = {
25. streamInfo: audioStreamInfo,
26. capturerInfo: audioCapturerInfo
27. };
28. let file: fs.File;
29. let readDataCallback: Callback<ArrayBuffer>;

31. async function initArguments(context: common.UIAbilityContext) {
32. let bufferSize: number = 0;
33. let path = context.cacheDir;
34. let filePath = path + '/StarWars10s-2C-48000-4SW.pcm';
35. file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
36. readDataCallback = (buffer: ArrayBuffer) => {
37. let options: Options = {
38. offset: bufferSize,
39. length: buffer.byteLength
40. }
41. fs.writeSync(file.fd, buffer, options);
42. bufferSize += buffer.byteLength;
43. };
44. }

46. // 初始化，创建实例，设置监听事件。
47. async function init() {
48. audio.createAudioCapturer(audioCapturerOptions, (err, capturer) => { // 创建AudioCapturer实例。
49. if (err) {
50. console.error(`Invoke createAudioCapturer failed, code is ${err.code}, message is ${err.message}`);
51. return;
52. }
53. console.info(`${TAG}: create AudioCapturer success`);
54. audioCapturer = capturer;
55. if (audioCapturer !== undefined) {
56. audioCapturer.on('readData', readDataCallback);
57. }
58. });
59. }

61. // 开始一次音频采集。
62. async function start() {
63. if (audioCapturer !== undefined) {
64. let stateGroup = [audio.AudioState.STATE_PREPARED, audio.AudioState.STATE_PAUSED, audio.AudioState.STATE_STOPPED];
65. if (stateGroup.indexOf(audioCapturer.state.valueOf()) === -1) { // 当且仅当状态为STATE_PREPARED、STATE_PAUSED和STATE_STOPPED之一时才能启动采集。
66. console.error(`${TAG}: start failed`);
67. return;
68. }

70. // 启动采集。
71. audioCapturer.start((err: BusinessError) => {
72. if (err) {
73. console.error('Capturer start failed.');
74. } else {
75. console.info('Capturer start success.');
76. }
77. });
78. }
79. }

81. // 停止采集。
82. async function stop() {
83. if (audioCapturer !== undefined) {
84. // 只有采集器状态为STATE_RUNNING或STATE_PAUSED的时候才可以停止。
85. if (audioCapturer.state.valueOf() !== audio.AudioState.STATE_RUNNING && audioCapturer.state.valueOf() !== audio.AudioState.STATE_PAUSED) {
86. console.info('Capturer is not running or paused');
87. return;
88. }

90. // 停止采集。
91. audioCapturer.stop((err: BusinessError) => {
92. if (err) {
93. console.error('Capturer stop failed.');
94. } else {
95. console.info('Capturer stop success.');
96. }
97. });
98. }
99. }

101. // 销毁实例，释放资源。
102. async function release() {
103. if (audioCapturer !== undefined) {
104. // 采集器状态不是STATE_RELEASED或STATE_NEW状态，才能release。
105. if (audioCapturer.state.valueOf() === audio.AudioState.STATE_RELEASED || audioCapturer.state.valueOf() === audio.AudioState.STATE_NEW) {
106. console.info('Capturer already released');
107. return;
108. }

110. // 释放资源。
111. audioCapturer.release((err: BusinessError) => {
112. if (err) {
113. console.error('Capturer release failed.');
114. } else {
115. fs.closeSync(file);
116. console.info('Capturer release success.');
117. }
118. });
119. }
120. }

122. @Entry
123. @Component
124. struct Index {
125. build() {
126. Scroll() {
127. Column() {
128. Row() {
129. Column() {
130. Text('初始化').fontColor(Color.Black).fontSize(16).margin({ top: 12 });
131. }
132. .backgroundColor(Color.White)
133. .borderRadius(30)
134. .width('45%')
135. .height('25%')
136. .margin({ right: 12, bottom: 12 })
137. .onClick(async () => {
138. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
139. initArguments(context);
140. init();
141. });

143. Column() {
144. Text('开始录制').fontColor(Color.Black).fontSize(16).margin({ top: 12 });
145. }
146. .backgroundColor(Color.White)
147. .borderRadius(30)
148. .width('45%')
149. .height('25%')
150. .margin({ bottom: 12 })
151. .onClick(async () => {
152. start();
153. });
154. }

156. Row() {
157. Column() {
158. Text('停止录制').fontSize(16).margin({ top: 12 });
159. }
160. .id('audio_effect_manager_card')
161. .backgroundColor(Color.White)
162. .borderRadius(30)
163. .width('45%')
164. .height('25%')
165. .margin({ right: 12, bottom: 12 })
166. .onClick(async () => {
167. stop();
168. });

170. Column() {
171. Text('释放资源').fontColor(Color.Black).fontSize(16).margin({ top: 12 });
172. }
173. .backgroundColor(Color.White)
174. .borderRadius(30)
175. .width('45%')
176. .height('25%')
177. .margin({ bottom: 12 })
178. .onClick(async () => {
179. release();
180. });
181. }
182. .padding(12)
183. }
184. .height('100%')
185. .width('100%')
186. .backgroundColor('#F1F3F5');
187. }
188. }
189. }
```

### 设置静音打断模式

如果需要实现录音全程不被系统基于焦点并发规则打断的效果，提供将打断策略从停止录音切换为静音录制的功能，录音过程中也不影响其他应用启动录音。开发者在创建AudioCapturer实例时，调用[setWillMuteWhenInterrupted](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiocapturer#setwillmutewheninterrupted20)接口设置是否开启静音打断模式。默认不开启，此时由音频焦点策略管理并发音频流的执行顺序。开启后，被其他应用打断导致停止或暂停录制时会进入静音录制状态，在此状态下录制的音频没有声音。

### 回声消除功能

回声消除功能可在支持的设备上有效消除录音过程中的回声干扰，提升音频采集质量。开发者可通过指定特定的Mic音频源[SourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#sourcetype8)（SOURCE\_TYPE\_VOICE\_COMMUNICATION、SOURCE\_TYPE\_LIVE）来启用该功能，系统将会自动对采集的音频信号进行回声消除处理。

在启用前，建议先调用[isAcousticEchoCancelerSupported](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiostreammanager#isacousticechocancelersupported20)接口（从API version 20开始支持）查询当前设备对音频输入源类型[SourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#sourcetype8)是否支持回声消除功能，以确保功能的可用性。若支持，则可在创建音频录制构造器时设置相应的Mic音频源，从而激活回声消除处理流程。