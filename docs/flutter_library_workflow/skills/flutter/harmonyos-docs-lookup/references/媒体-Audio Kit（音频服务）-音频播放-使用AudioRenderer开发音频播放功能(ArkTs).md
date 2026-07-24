AudioRenderer是音频渲染器，用于播放PCM（Pulse Code Modulation）音频数据，相比[AVPlayer](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/using-avplayer-for-playback)而言，可以在输入前添加数据预处理，更适合有音频开发经验的开发者，以实现更灵活的播放功能。

## 开发指导

使用AudioRenderer播放音频涉及到AudioRenderer实例的创建、音频渲染参数的配置、渲染的开始与停止、资源的释放等。本开发指导将以一次渲染音频数据的过程为例，向开发者讲解如何使用AudioRenderer进行音频渲染，建议搭配[AudioRenderer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer)的API说明阅读。

下图展示了AudioRenderer的状态变化，在创建实例后，调用对应的方法可以进入指定的状态实现对应的行为。需要注意的是在确定的状态执行不合适的方法可能导致AudioRenderer发生错误，建议开发者在调用状态转换的方法前进行状态检查，避免程序运行产生预期以外的结果。

为保证UI线程不被阻塞，大部分AudioRenderer调用都是异步的。对于每个API均提供了callback函数和Promise函数，以下示例均采用callback函数。

**图1** AudioRenderer状态变化示意图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b6/v3/39_IXXiGSAaCwLXoVNWxDw/zh-cn_image_0000002540771674.png?HW-CC-KV=V1&HW-CC-Date=20260414T051701Z&HW-CC-Expire=86400&HW-CC-Sign=CCB721B0EB13385F37571AE8DF9DF442B82FFCD109511B1CE1354F4362A4392E)

在进行应用开发的过程中，建议开发者通过[on('stateChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#onstatechange8)方法订阅AudioRenderer的状态变更。因为针对AudioRenderer的某些操作，仅在音频播放器在固定状态时才能执行。如果应用在音频播放器处于错误状态时执行操作，系统可能会抛出异常或生成其他未定义的行为。

* prepared状态：通过调用[audio.createAudioRenderer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-f#audiocreateaudiorenderer8)方法进入到该状态。
* running状态：正在进行音频数据播放，可以在prepared状态通过调用[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#start8)方法进入此状态，也可以在paused状态和stopped状态通过调用[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#start8)方法进入此状态。
* paused状态：在running状态可以通过调用[pause](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#pause8)方法暂停音频数据的播放并进入paused状态，暂停播放之后可以通过调用[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#start8)方法继续音频数据播放。
* stopped状态：在paused/running状态可以通过[stop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#stop8)方法停止音频数据的播放。
* released状态：在prepared、paused、stopped等状态，用户均可通过[release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#release8)方法释放掉所有占用的硬件和软件资源，并且不会再进入到其他的任何一种状态了。

### 开发步骤及注意事项

1. 配置音频渲染参数并创建AudioRenderer实例，音频渲染参数的详细信息可以查看[AudioRendererOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-i#audiorendereroptions8)。

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

   10. let audioRendererInfo: audio.AudioRendererInfo = {
   11. usage: audio.StreamUsage.STREAM_USAGE_MUSIC, // 音频流使用类型：音乐。根据业务场景配置，参考StreamUsage。
   12. rendererFlags: 0 // 音频渲染器标志。
   13. };

   15. let audioRendererOptions: audio.AudioRendererOptions = {
   16. streamInfo: audioStreamInfo,
   17. rendererInfo: audioRendererInfo
   18. };

   20. audio.createAudioRenderer(audioRendererOptions, (err, data) => {
   21. if (err) {
   22. console.error(`Invoke createAudioRenderer failed, code is ${err.code}, message is ${err.message}`);
   23. return;
   24. } else {
   25. console.info('Invoke createAudioRenderer succeeded.');
   26. let audioRenderer = data;
   27. }
   28. });
   ```
2. 调用[on('writeData')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#onwritedata11)方法，订阅监听音频数据写入回调，推荐使用API version 12支持返回回调结果的方式。

   * API version 12开始该方法支持返回回调结果，系统可以根据开发者返回的值来决定此次回调中的数据是否播放。

     注意

     + 能填满回调所需长度数据的情况下，返回audio.AudioDataCallbackResult.VALID，系统会取用完整长度的数据缓冲进行播放。请不要在未填满数据的情况下返回audio.AudioDataCallbackResult.VALID，否则会导致杂音、卡顿等现象。
     + 在无法填满回调所需长度数据的情况下，建议开发者返回audio.AudioDataCallbackResult.INVALID，系统不会处理该段音频数据，然后会再次向应用请求数据，确认数据填满后返回audio.AudioDataCallbackResult.VALID。
     + 回调函数结束后，音频服务会把缓冲中数据放入队列里等待播放，因此请勿在回调外再次更改缓冲中的数据。对于最后一帧，如果数据不够填满缓冲长度，开发者需要使用剩余数据拼接空数据的方式，将缓冲填满，避免缓冲内的历史脏数据对播放效果产生不良的影响。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. import { audio } from '@kit.AudioKit';
     2. import { BusinessError } from '@kit.BasicServicesKit';
     3. import { fileIo as fs } from '@kit.CoreFileKit';
     4. import { common } from '@kit.AbilityKit';

     6. class Options {
     7. offset?: number;
     8. length?: number;
     9. }

     11. let bufferSize: number = 0;
     12. // 请在组件内获取context，确保this.getUIContext().getHostContext()返回结果为UIAbilityContext。
     13. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
     14. let path = context.cacheDir;
     15. // 此处仅作示例，实际使用时需要将文件替换为应用要播放的PCM文件。
     16. let filePath = path + '/StarWars10s-2C-48000-4SW.pcm';
     17. let file: fs.File = fs.openSync(filePath, fs.OpenMode.READ_ONLY);

     19. let writeDataCallback = (buffer: ArrayBuffer) => {
     20. let options: Options = {
     21. offset: bufferSize,
     22. length: buffer.byteLength
     23. };

     25. try {
     26. fs.readSync(file.fd, buffer, options);
     27. bufferSize += buffer.byteLength;
     28. // 系统会判定buffer有效，正常播放。
     29. return audio.AudioDataCallbackResult.VALID;
     30. } catch (error) {
     31. console.error('Error reading file:', error);
     32. // 系统会判定buffer无效，不播放。
     33. return audio.AudioDataCallbackResult.INVALID;
     34. }
     35. };

     37. audioRenderer.on('writeData', writeDataCallback);
     ```
   * API version 11该方法不支持返回回调结果，系统默认回调中的数据均为有效数据。

     注意

     + 开发者应避免在主线程中注册回调，以免被其他业务阻塞导致响应回调不及时造成卡顿。建议使用独立的异步线程池处理回调。
     + 请确保填满回调所需长度数据，否则会导致杂音、卡顿等现象。
     + 在无法填满回调所需长度数据的情况下，建议开发者选择暂时停止写入数据（不暂停音频流），阻塞回调函数，等待数据充足时，再继续写入数据，确保数据填满。在阻塞回调函数后，如需调用AudioRenderer相关接口，需先解阻塞。
     + 开发者如果不希望播放本次回调中的音频数据，可以主动将回调中的数据块置空（置空后，也会被系统统计到已写入的数据，播放静音帧）。
     + 回调函数结束后，音频服务会把缓冲中数据放入队列里等待播放，因此请勿在回调外再次更改缓冲中的数据。对于最后一帧，如果数据不够填满缓冲长度，开发者需要使用剩余数据拼接空数据的方式，将缓冲填满，避免缓冲内的历史脏数据对播放效果产生不良的影响。
     + 在写数据回调中，避免与耗时业务耦合或等待其他业务操作，例如写数据时不要等待UI绘制。否则，可能会导致数据传输不及时，从而产生卡顿现象。

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
     14. // 此处仅作示例，实际使用时需要将文件替换为应用要播放的PCM文件。
     15. let filePath = path + '/StarWars10s-2C-48000-4SW.pcm';
     16. let file: fs.File = fs.openSync(filePath, fs.OpenMode.READ_ONLY);
     17. let writeDataCallback = (buffer: ArrayBuffer) => {
     18. // 如果开发者不希望播放某段buffer，可在此处添加判断并对buffer进行置空处理。
     19. let options: Options = {
     20. offset: bufferSize,
     21. length: buffer.byteLength
     22. };
     23. fs.readSync(file.fd, buffer, options);
     24. bufferSize += buffer.byteLength;
     25. };

     27. audioRenderer.on('writeData', writeDataCallback);
     ```
3. 调用[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#start8)方法进入running状态，开始渲染音频。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. audioRenderer.start((err: BusinessError) => {
   4. if (err) {
   5. console.error(`Renderer start failed, code is ${err.code}, message is ${err.message}`);
   6. } else {
   7. console.info('Renderer start success.');
   8. }
   9. });
   ```
4. 调用[stop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#stop8)方法停止渲染。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. audioRenderer.stop((err: BusinessError) => {
   4. if (err) {
   5. console.error(`Renderer stop failed, code is ${err.code}, message is ${err.message}`);
   6. } else {
   7. console.info('Renderer stopped.');
   8. }
   9. });
   ```
5. 调用[release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#release8)方法销毁实例，释放资源。

   应用需根据实际业务需求合理使用AudioRenderer实例，按需创建并及时释放，避免占用过多音频资源导致异常。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';

   3. audioRenderer.release((err: BusinessError) => {
   4. if (err) {
   5. console.error(`Renderer release failed, code is ${err.code}, message is ${err.message}`);
   6. } else {
   7. console.info('Renderer released.');
   8. }
   9. });
   ```

### 选择正确的StreamUsage

创建播放器时候，开发者需要根据应用场景指定播放器的StreamUsage，选择正确的StreamUsage可以避免用户遇到不符合预期的行为。

在音频API文档[StreamUsage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#streamusage)介绍中，列举了每一种类型推荐的应用场景。例如音乐场景推荐使用STREAM\_USAGE\_MUSIC，电影或者视频场景推荐使用STREAM\_USAGE\_MOVIE，游戏场景推荐使用STREAM\_USAGE\_GAME，等等。

如果开发者配置了不正确的StreamUsage，可能带来一些不符合预期的行为。例如以下场景。

* 游戏场景错误使用STREAM\_USAGE\_MUSIC类型，游戏应用将无法和其他音乐应用并发播放，而游戏场景通常可以与其他音乐应用并发播放。
* 导航场景错误使用STREAM\_USAGE\_MUSIC类型，导航应用播报时候会导致正在播放的音乐停止播放，而导航场景我们通常期望正在播放的音乐仅降低音量播放。

### 配置合适的音频采样率

采样率：指音频每秒单个声道样点数，单位为Hz。

重采样：根据输入输出音频采样率的差异，进行上采样（通过插值增加样点数）或下采样（通过抽取减少样点数）。

AudioRenderer支持枚举类型[AudioSamplingRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audiosamplingrate8)中定义的所有采样率。

若通过AudioRenderer设置的输入音频采样率与设备输出采样率不一致，系统会将输入音频重采样为设备输出采样率。

若为减少重采样功耗，可使用采样率与输出设备采样率一致的输入音频。推荐使用48k采样率。

### 完整示例

下面展示了使用AudioRenderer渲染音频文件的示例代码。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { fileIo as fs } from '@kit.CoreFileKit';
4. import { common } from '@kit.AbilityKit';

6. const TAG = 'AudioRendererDemo';

8. class Options {
9. offset?: number;
10. length?: number;
11. }

13. let audioRenderer: audio.AudioRenderer | undefined = undefined;
14. let audioStreamInfo: audio.AudioStreamInfo = {
15. samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_48000, // 采样率。
16. channels: audio.AudioChannel.CHANNEL_2, // 通道。
17. sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE, // 采样格式。
18. encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW // 编码格式。
19. };
20. let audioRendererInfo: audio.AudioRendererInfo = {
21. usage: audio.StreamUsage.STREAM_USAGE_MUSIC, // 音频流使用类型：音乐。根据业务场景配置，参考StreamUsage。
22. rendererFlags: 0 // 音频渲染器标志。
23. };
24. let audioRendererOptions: audio.AudioRendererOptions = {
25. streamInfo: audioStreamInfo,
26. rendererInfo: audioRendererInfo
27. };
28. let file: fs.File;
29. let writeDataCallback: audio.AudioRendererWriteDataCallback;

31. async function initArguments(context: common.UIAbilityContext) {
32. let bufferSize: number = 0;
33. let path = context.cacheDir;
34. // 此处仅作示例，实际使用时需要将文件替换为应用要播放的PCM文件。
35. let filePath = path + '/StarWars10s-2C-48000-4SW.pcm';
36. file = fs.openSync(filePath, fs.OpenMode.READ_ONLY);
37. writeDataCallback = (buffer: ArrayBuffer) => {
38. let options: Options = {
39. offset: bufferSize,
40. length: buffer.byteLength
41. };

43. try {
44. let bufferLength = fs.readSync(file.fd, buffer, options);
45. bufferSize += buffer.byteLength;
46. // 如果当前回调传入的数据不足一帧，空白区域需要使用静音数据填充，否则会导致播放出现杂音。
47. if (bufferLength < buffer.byteLength) {
48. let view = new DataView(buffer);
49. for (let i = bufferLength; i < buffer.byteLength; i++) {
50. // 空白区域填充静音数据。当使用音频采样格式为SAMPLE_FORMAT_U8时0x7F为静音数据，使用其他采样格式时0为静音数据。
51. view.setUint8(i, 0);
52. }
53. }
54. // API version 11不支持返回回调结果，从API version 12开始支持返回回调结果。
55. // 如果开发者不希望播放某段buffer，返回audio.AudioDataCallbackResult.INVALID即可。
56. return audio.AudioDataCallbackResult.VALID;
57. } catch (error) {
58. console.error('Error reading file:', error);
59. // API version 11不支持返回回调结果，从API version 12开始支持返回回调结果。
60. return audio.AudioDataCallbackResult.INVALID;
61. }
62. };
63. }

65. // 初始化，创建实例，设置监听事件。
66. async function init() {
67. audio.createAudioRenderer(audioRendererOptions, (err, renderer) => { // 创建AudioRenderer实例。
68. if (!err) {
69. console.info(`${TAG}: creating AudioRenderer success`);
70. audioRenderer = renderer;
71. if (audioRenderer !== undefined) {
72. audioRenderer.on('writeData', writeDataCallback);
73. }
74. } else {
75. console.info(`${TAG}: creating AudioRenderer failed, error: ${err.message}`);
76. }
77. });
78. }

80. // 开始一次音频渲染。
81. async function start() {
82. if (audioRenderer !== undefined) {
83. let stateGroup = [audio.AudioState.STATE_PREPARED, audio.AudioState.STATE_PAUSED, audio.AudioState.STATE_STOPPED];
84. if (stateGroup.indexOf(audioRenderer.state.valueOf()) === -1) { // 当且仅当状态为prepared、paused和stopped之一时才能启动渲染。
85. console.error(TAG + 'start failed');
86. return;
87. }
88. // 启动渲染。
89. audioRenderer.start((err: BusinessError) => {
90. if (err) {
91. console.error('Renderer start failed.');
92. } else {
93. console.info('Renderer start success.');
94. }
95. });
96. }
97. }

99. // 暂停渲染。
100. async function pause() {
101. if (audioRenderer !== undefined) {
102. // 只有渲染器状态为running的时候才能暂停。
103. if (audioRenderer.state.valueOf() !== audio.AudioState.STATE_RUNNING) {
104. console.info('Renderer is not running');
105. return;
106. }
107. // 暂停渲染。
108. audioRenderer.pause((err: BusinessError) => {
109. if (err) {
110. console.error('Renderer pause failed.');
111. } else {
112. console.info('Renderer pause success.');
113. }
114. });
115. }
116. }

118. // 停止渲染。
119. async function stop() {
120. if (audioRenderer !== undefined) {
121. // 只有渲染器状态为running或paused的时候才可以停止。
122. if (audioRenderer.state.valueOf() !== audio.AudioState.STATE_RUNNING && audioRenderer.state.valueOf() !== audio.AudioState.STATE_PAUSED) {
123. console.info('Renderer is not running or paused.');
124. return;
125. }
126. // 停止渲染。
127. audioRenderer.stop((err: BusinessError) => {
128. if (err) {
129. console.error('Renderer stop failed.');
130. } else {
131. console.info('Renderer stop success.');
132. }
133. });
134. }
135. }

137. // 销毁实例，释放资源。
138. async function release() {
139. if (audioRenderer !== undefined) {
140. // 渲染器状态不是released状态，才能release。
141. if (audioRenderer.state.valueOf() === audio.AudioState.STATE_RELEASED) {
142. console.info('Renderer already released');
143. return;
144. }
145. // 释放资源。
146. audioRenderer.release((err: BusinessError) => {
147. if (err) {
148. console.error('Renderer release failed.');
149. } else {
150. fs.closeSync(file);
151. console.info('Renderer release success.');
152. }
153. });
154. }
155. }

157. @Entry
158. @Component
159. struct Index {
160. build() {
161. Scroll() {
162. Column() {
163. Row() {
164. Column() {
165. Text('初始化').fontColor(Color.Black).fontSize(16).margin({ top: 12 });
166. }
167. .backgroundColor(Color.White)
168. .borderRadius(30)
169. .width('45%')
170. .height('25%')
171. .margin({ right: 12, bottom: 12 })
172. .onClick(async () => {
173. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
174. initArguments(context);
175. init();
176. });

178. Column() {
179. Text('开始播放').fontColor(Color.Black).fontSize(16).margin({ top: 12 });
180. }
181. .backgroundColor(Color.White)
182. .borderRadius(30)
183. .width('45%')
184. .height('25%')
185. .margin({ bottom: 12 })
186. .onClick(async () => {
187. start();
188. });
189. }

191. Row() {
192. Column() {
193. Text('暂停播放').fontSize(16).margin({ top: 12 });
194. }
195. .id('audio_effect_manager_card')
196. .backgroundColor(Color.White)
197. .borderRadius(30)
198. .width('45%')
199. .height('25%')
200. .margin({ right: 12, bottom: 12 })
201. .onClick(async () => {
202. pause();
203. });

205. Column() {
206. Text('停止播放').fontColor(Color.Black).fontSize(16).margin({ top: 12 });
207. }
208. .backgroundColor(Color.White)
209. .borderRadius(30)
210. .width('45%')
211. .height('25%')
212. .margin({ bottom: 12 })
213. .onClick(async () => {
214. stop();
215. });
216. }

218. Row() {
219. Column() {
220. Text('释放资源').fontColor(Color.Black).fontSize(16).margin({ top: 12 });
221. }
222. .id('audio_volume_card')
223. .backgroundColor(Color.White)
224. .borderRadius(30)
225. .width('45%')
226. .height('25%')
227. .margin({ right: 12, bottom: 12 })
228. .onClick(async () => {
229. release();
230. });
231. }
232. .padding(12)
233. }
234. .height('100%')
235. .width('100%')
236. .backgroundColor('#F1F3F5');
237. }
238. }
239. }
```

当同优先级或高优先级音频流要使用输出设备时，当前音频流会被中断，应用可以自行响应中断事件并做出处理。具体的音频并发处理方式可参考[处理音频焦点事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/audio-playback-concurrency)。