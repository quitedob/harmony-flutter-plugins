在音频通话场景下，音频输出（播放对端声音）和音频输入（录制本端声音）会同时进行，应用可以通过使用AudioRenderer来实现音频输出，通过使用AudioCapturer来实现音频输入，同时使用AudioRenderer和AudioCapturer即可实现音频通话功能。

在音频通话开始和结束时，应用可以自行检查当前的[音频场景模式](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/audio-call-overview#音频场景模式)和[铃声模式](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/audio-call-overview#铃声模式)，以便采取合适的音频管理及提示策略。

以下代码示范了同时使用AudioRenderer和AudioCapturer实现音频通话功能的基本过程，其中未包含音频通话数据的传输过程，实际开发中，需要将网络传输来的对端通话数据解码播放，此处仅以读取音频文件的数据代替；同时需要将本端录制的通话数据编码打包，通过网络发送给对端，此处仅以将数据写入音频文件代替。

## 使用AudioRenderer播放对端的通话声音

该过程与[使用AudioRenderer开发音频播放功能(ArkTs)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/using-audiorenderer-for-playback)过程相似，关键区别在于audioRendererInfo参数和音频数据来源。audioRendererInfo参数中，音频流使用类型usage需设置为VoIP通话：STREAM\_USAGE\_VOICE\_COMMUNICATION。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { fileIo as fs } from '@kit.CoreFileKit';
4. import { common } from '@kit.AbilityKit';

6. // 与使用AudioRenderer开发音频播放功能过程相似，关键区别在于audioRendererInfo参数和音频数据来源。
7. const TAG = 'VoIPDemoForAudioRenderer';

9. class Options {
10. offset?: number;
11. length?: number;
12. }

14. let bufferSize: number = 0;
15. let audioRenderer: audio.AudioRenderer | undefined = undefined;
16. let audioStreamInfo: audio.AudioStreamInfo = {
17. samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_48000, // 采样率。
18. channels: audio.AudioChannel.CHANNEL_2, // 通道。
19. sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE, // 采样格式。
20. encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW // 编码格式。
21. };
22. let audioRendererInfo: audio.AudioRendererInfo = {
23. // 需使用通话场景相应的参数。
24. usage: audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION, // 音频流使用类型：VoIP通话。
25. rendererFlags: 0 // 音频渲染器标志：默认为0即可。
26. };
27. let audioRendererOptions: audio.AudioRendererOptions = {
28. streamInfo: audioStreamInfo,
29. rendererInfo: audioRendererInfo
30. };
31. let file: fs.File;
32. let writeDataCallback: audio.AudioRendererWriteDataCallback;

34. async function initArguments(context: common.UIAbilityContext) {
35. let path = context.cacheDir;
36. // 此处仅作示例，实际使用时需要将文件替换为应用要播放的PCM文件。
37. let filePath = path + '/StarWars10s-2C-48000-4SW.pcm';
38. file = fs.openSync(filePath, fs.OpenMode.READ_ONLY);
39. writeDataCallback = (buffer: ArrayBuffer) => {
40. let options: Options = {
41. offset: bufferSize,
42. length: buffer.byteLength
43. };

45. try {
46. let bufferLength = fs.readSync(file.fd, buffer, options);
47. bufferSize += buffer.byteLength;
48. // 如果当前回调传入的数据不足一帧，空白区域需要使用静音数据填充，否则会导致播放出现杂音。
49. if (bufferLength < buffer.byteLength) {
50. let view = new DataView(buffer);
51. for (let i = bufferLength; i < buffer.byteLength; i++) {
52. // 空白区域填充静音数据。当使用音频采样格式为SAMPLE_FORMAT_U8时0x7F为静音数据，使用其他采样格式时0为静音数据。
53. view.setUint8(i, 0);
54. }
55. }
56. // API version 11不支持返回回调结果，从API version 12开始支持返回回调结果。
57. // 如果开发者不希望播放某段buffer，返回audio.AudioDataCallbackResult.INVALID即可。
58. return audio.AudioDataCallbackResult.VALID;
59. } catch (error) {
60. console.error('Error reading file:', error);
61. // API version 11不支持返回回调结果，从API version 12开始支持返回回调结果。
62. return audio.AudioDataCallbackResult.INVALID;
63. }
64. };
65. }

67. // 初始化，创建实例，设置监听事件。
68. async function init() {
69. audio.createAudioRenderer(audioRendererOptions, (err, renderer) => { // 创建AudioRenderer实例。
70. if (!err) {
71. console.info(`${TAG}: creating AudioRenderer success`);
72. audioRenderer = renderer;
73. if (audioRenderer !== undefined) {
74. audioRenderer.on('writeData', writeDataCallback);
75. }
76. } else {
77. console.error(`${TAG}: creating AudioRenderer failed, error: ${err.message}`);
78. }
79. });
80. }

82. // 开始一次音频渲染。
83. async function start() {
84. if (audioRenderer !== undefined) {
85. let stateGroup = [audio.AudioState.STATE_PREPARED, audio.AudioState.STATE_PAUSED, audio.AudioState.STATE_STOPPED];
86. if (stateGroup.indexOf(audioRenderer.state.valueOf()) === -1) { // 当且仅当状态为prepared、paused和stopped之一时才能启动渲染。
87. console.error(TAG + 'start failed');
88. return;
89. }
90. // 启动渲染。
91. audioRenderer.start((err: BusinessError) => {
92. if (err) {
93. console.error('Renderer start failed.');
94. } else {
95. console.info('Renderer start success.');
96. }
97. });
98. }
99. }

101. // 暂停渲染。
102. async function pause() {
103. if (audioRenderer !== undefined) {
104. // 只有渲染器状态为running的时候才能暂停。
105. if (audioRenderer.state.valueOf() !== audio.AudioState.STATE_RUNNING) {
106. console.info('Renderer is not running');
107. return;
108. }
109. // 暂停渲染。
110. audioRenderer.pause((err: BusinessError) => {
111. if (err) {
112. console.error('Renderer pause failed.');
113. } else {
114. console.info('Renderer pause success.');
115. }
116. });
117. }
118. }

120. // 停止渲染。
121. async function stop() {
122. if (audioRenderer !== undefined) {
123. // 只有渲染器状态为running或paused的时候才可以停止。
124. if (audioRenderer.state.valueOf() !== audio.AudioState.STATE_RUNNING && audioRenderer.state.valueOf() !== audio.AudioState.STATE_PAUSED) {
125. console.info('Renderer is not running or paused.');
126. return;
127. }
128. // 停止渲染。
129. audioRenderer.stop((err: BusinessError) => {
130. if (err) {
131. console.error('Renderer stop failed.');
132. } else {
133. fs.close(file);
134. console.info('Renderer stop success.');
135. }
136. });
137. }
138. }

140. // 销毁实例，释放资源。
141. async function release() {
142. if (audioRenderer !== undefined) {
143. // 渲染器状态不是released状态，才能release。
144. if (audioRenderer.state.valueOf() === audio.AudioState.STATE_RELEASED) {
145. console.info('Renderer already released');
146. return;
147. }
148. // 释放资源。
149. audioRenderer.release((err: BusinessError) => {
150. if (err) {
151. console.error('Renderer release failed.');
152. } else {
153. console.info('Renderer release success.');
154. }
155. });
156. }
157. }

159. @Entry
160. @Component
161. struct Index {
162. build() {
163. Scroll() {
164. Column() {
165. Row() {
166. Column() {
167. Text('初始化').fontColor(Color.Black).fontSize(16).margin({ top: 12 });
168. }
169. .backgroundColor(Color.White)
170. .borderRadius(30)
171. .width('45%')
172. .height('25%')
173. .margin({ right: 12, bottom: 12 })
174. .onClick(async () => {
175. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
176. initArguments(context);
177. init();
178. });

180. Column() {
181. Text('开始播放').fontColor(Color.Black).fontSize(16).margin({ top: 12 });
182. }
183. .backgroundColor(Color.White)
184. .borderRadius(30)
185. .width('45%')
186. .height('25%')
187. .margin({ bottom: 12 })
188. .onClick(async () => {
189. start();
190. });
191. }

193. Row() {
194. Column() {
195. Text('暂停播放').fontSize(16).margin({ top: 12 });
196. }
197. .id('audio_effect_manager_card')
198. .backgroundColor(Color.White)
199. .borderRadius(30)
200. .width('45%')
201. .height('25%')
202. .margin({ right: 12, bottom: 12 })
203. .onClick(async () => {
204. pause();
205. });

207. Column() {
208. Text('停止播放').fontColor(Color.Black).fontSize(16).margin({ top: 12 });
209. }
210. .backgroundColor(Color.White)
211. .borderRadius(30)
212. .width('45%')
213. .height('25%')
214. .margin({ bottom: 12 })
215. .onClick(async () => {
216. stop();
217. });
218. }

220. Row() {
221. Column() {
222. Text('释放资源').fontColor(Color.Black).fontSize(16).margin({ top: 12 });
223. }
224. .id('audio_volume_card')
225. .backgroundColor(Color.White)
226. .borderRadius(30)
227. .width('45%')
228. .height('25%')
229. .margin({ right: 12, bottom: 12 })
230. .onClick(async () => {
231. release();
232. });
233. }
234. .padding(12)
235. }
236. .height('100%')
237. .width('100%')
238. .backgroundColor('#F1F3F5');
239. }
240. }
241. }
```

## 使用AudioCapturer录制本端的通话声音

该过程与[使用AudioCapturer开发音频录制功能(ArkTs)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/using-audiocapturer-for-recording)过程相似，关键区别在于audioCapturerInfo参数和音频数据流向。audioCapturerInfo参数中音源类型source需设置为语音通话：SOURCE\_TYPE\_VOICE\_COMMUNICATION。

所有录制均需要申请麦克风权限：ohos.permission.MICROPHONE，申请方式请参考[向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { fileIo as fs } from '@kit.CoreFileKit';
4. import { common } from '@kit.AbilityKit';

6. // 与使用AudioCapturer开发音频录制功能过程相似，关键区别在于audioCapturerInfo参数和音频数据流向。
7. const TAG = 'VoIPDemoForAudioCapturer';

9. class Options {
10. offset?: number;
11. length?: number;
12. }

14. let bufferSize: number = 0;
15. let audioCapturer: audio.AudioCapturer | undefined = undefined;
16. let audioStreamInfo: audio.AudioStreamInfo = {
17. samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_48000, // 采样率。
18. channels: audio.AudioChannel.CHANNEL_2, // 通道。
19. sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE, // 采样格式。
20. encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW // 编码格式。
21. };
22. let audioCapturerInfo: audio.AudioCapturerInfo = {
23. // 需使用通话场景相应的参数。
24. source: audio.SourceType.SOURCE_TYPE_VOICE_COMMUNICATION, // 音源类型：语音通话。
25. capturerFlags: 0 // 音频采集器标志：默认为0即可。
26. };
27. let audioCapturerOptions: audio.AudioCapturerOptions = {
28. streamInfo: audioStreamInfo,
29. capturerInfo: audioCapturerInfo
30. };
31. let file: fs.File;
32. let readDataCallback: Callback<ArrayBuffer>;

34. async function initArguments(context: common.UIAbilityContext) {
35. let path = context.cacheDir;
36. let filePath = path + '/StarWars10s-2C-48000-4SW.pcm';
37. file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
38. readDataCallback = (buffer: ArrayBuffer) => {
39. let options: Options = {
40. offset: bufferSize,
41. length: buffer.byteLength
42. }
43. fs.writeSync(file.fd, buffer, options);
44. bufferSize += buffer.byteLength;
45. };
46. }

48. // 初始化，创建实例，设置监听事件。
49. async function init() {
50. audio.createAudioCapturer(audioCapturerOptions, (err, capturer) => { // 创建AudioCapturer实例。
51. if (err) {
52. console.error(`Invoke createAudioCapturer failed, code is ${err.code}, message is ${err.message}`);
53. return;
54. }
55. console.info(`${TAG}: create AudioCapturer success`);
56. audioCapturer = capturer;
57. if (audioCapturer !== undefined) {
58. audioCapturer.on('readData', readDataCallback);
59. }
60. });
61. }

63. // 开始一次音频采集。
64. async function start() {
65. if (audioCapturer !== undefined) {
66. let stateGroup = [audio.AudioState.STATE_PREPARED, audio.AudioState.STATE_PAUSED, audio.AudioState.STATE_STOPPED];
67. if (stateGroup.indexOf(audioCapturer.state.valueOf()) === -1) { // 当且仅当状态为STATE_PREPARED、STATE_PAUSED和STATE_STOPPED之一时才能启动采集。
68. console.error(`${TAG}: start failed`);
69. return;
70. }

72. // 启动采集。
73. audioCapturer.start((err: BusinessError) => {
74. if (err) {
75. console.error('Capturer start failed.');
76. } else {
77. console.info('Capturer start success.');
78. }
79. });
80. }
81. }

83. // 停止采集。
84. async function stop() {
85. if (audioCapturer !== undefined) {
86. // 只有采集器状态为STATE_RUNNING或STATE_PAUSED的时候才可以停止。
87. if (audioCapturer.state.valueOf() !== audio.AudioState.STATE_RUNNING && audioCapturer.state.valueOf() !== audio.AudioState.STATE_PAUSED) {
88. console.info('Capturer is not running or paused');
89. return;
90. }

92. // 停止采集。
93. audioCapturer.stop((err: BusinessError) => {
94. if (err) {
95. console.error('Capturer stop failed.');
96. } else {
97. fs.close(file);
98. console.info('Capturer stop success.');
99. }
100. });
101. }
102. }

104. // 销毁实例，释放资源。
105. async function release() {
106. if (audioCapturer !== undefined) {
107. // 采集器状态不是STATE_RELEASED或STATE_NEW状态，才能release。
108. if (audioCapturer.state.valueOf() === audio.AudioState.STATE_RELEASED || audioCapturer.state.valueOf() === audio.AudioState.STATE_NEW) {
109. console.info('Capturer already released');
110. return;
111. }

113. // 释放资源。
114. audioCapturer.release((err: BusinessError) => {
115. if (err) {
116. console.error('Capturer release failed.');
117. } else {
118. console.info('Capturer release success.');
119. }
120. });
121. }
122. }

124. @Entry
125. @Component
126. struct Index {
127. build() {
128. Scroll() {
129. Column() {
130. Row() {
131. Column() {
132. Text('初始化').fontColor(Color.Black).fontSize(16).margin({ top: 12 });
133. }
134. .backgroundColor(Color.White)
135. .borderRadius(30)
136. .width('45%')
137. .height('25%')
138. .margin({ right: 12, bottom: 12 })
139. .onClick(async () => {
140. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
141. initArguments(context);
142. init();
143. });

145. Column() {
146. Text('开始录制').fontColor(Color.Black).fontSize(16).margin({ top: 12 });
147. }
148. .backgroundColor(Color.White)
149. .borderRadius(30)
150. .width('45%')
151. .height('25%')
152. .margin({ bottom: 12 })
153. .onClick(async () => {
154. start();
155. });
156. }

158. Row() {
159. Column() {
160. Text('停止录制').fontSize(16).margin({ top: 12 });
161. }
162. .id('audio_effect_manager_card')
163. .backgroundColor(Color.White)
164. .borderRadius(30)
165. .width('45%')
166. .height('25%')
167. .margin({ right: 12, bottom: 12 })
168. .onClick(async () => {
169. stop();
170. });

172. Column() {
173. Text('释放资源').fontColor(Color.Black).fontSize(16).margin({ top: 12 });
174. }
175. .backgroundColor(Color.White)
176. .borderRadius(30)
177. .width('45%')
178. .height('25%')
179. .margin({ bottom: 12 })
180. .onClick(async () => {
181. release();
182. });
183. }
184. .padding(12)
185. }
186. .height('100%')
187. .width('100%')
188. .backgroundColor('#F1F3F5');
189. }
190. }
191. }
```