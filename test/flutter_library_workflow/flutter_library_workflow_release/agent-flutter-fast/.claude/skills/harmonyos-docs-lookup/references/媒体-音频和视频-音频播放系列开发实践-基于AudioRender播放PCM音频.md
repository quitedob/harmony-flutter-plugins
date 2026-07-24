## 概述

AudioRender是用于音频播放的ArkTS API，仅支持PCM格式的音频。指导开发者使用AudioRender接口实现播放PCM音频的功能，主要涉及基本播控、精准跳转、静音播放、倍速播放、音量控制、焦点管理、后台播放与接入播控中心、冷启动等开发场景。

本文是音频播放系列文章的第1篇，实现的功能效果如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/68/v3/vZKu1DSCRsWB0AIHpBILqw/zh-cn_image_0000002555217465.gif?HW-CC-KV=V1&HW-CC-Date=20260414T060036Z&HW-CC-Expire=86400&HW-CC-Sign=263AC7BCE636A7611BF6B65CE63DDDFBE544CA5ED31B6D00CFB8ADE1C9B1A663 "点击放大") ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cf/v3/lYqDm5pJTCC9fQj4aZO0xQ/zh-cn_image_0000002524217568.gif?HW-CC-KV=V1&HW-CC-Date=20260414T060036Z&HW-CC-Expire=86400&HW-CC-Sign=3548606C434FF0D5F8E1FE2BE9F0424AAAB1803E69778BE79C33B7168A7E202F "点击放大") ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/38/v3/PmfDkYGwQiaZKxiRuMoOGg/zh-cn_image_0000002555337437.gif?HW-CC-KV=V1&HW-CC-Date=20260414T060036Z&HW-CC-Expire=86400&HW-CC-Sign=6939136C466ED3457C72E7D0218BA73A6582D953444C23412D2E17B753E970E8 "点击放大")

## 场景分析

展开

| 场景名称 | 描述 | 实现方案 |
| --- | --- | --- |
| [基础播控](/consumer/cn/doc/best-practices/bpta-playing-pcm-audio-based-audiorenderer#section1764813377511) | 音频资源的加载、播放、暂停、退出等操作。 | 使用[AudioRenderer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer)接口实现。 |
| [跳转播放](/consumer/cn/doc/best-practices/bpta-playing-pcm-audio-based-audiorenderer#section16920851193717) | 滑动进度条精准跳转到指定时间进行播放。 | 使用[Slider组件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-slider)实现进度条，在AudioRenderer的[on('writeData')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#onwritedata11)回调中触发进度调节。 |
| [静音播放](/consumer/cn/doc/best-practices/bpta-playing-pcm-audio-based-audiorenderer#section125715278533) | 点击按钮设置静音播放。 | 使用[AudioRenderer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer)的[setSilentModeAndMixWithOthers()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#setsilentmodeandmixwithothers12)方法控制静音状态。 |
| [切换歌曲播放](/consumer/cn/doc/best-practices/bpta-playing-pcm-audio-based-audiorenderer#section590418431566) | 点击上一首或下一首或歌单列表中的歌曲进行不同歌曲播放。 | 在AudioRenderer的[on('writeData')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#onwritedata11)回调中，将获取到的不同的歌曲资源写入数据缓冲区，实现播放不同歌曲的功能。 |
| [倍速设置](/consumer/cn/doc/best-practices/bpta-playing-pcm-audio-based-audiorenderer#section189460361122) | 滑动倍速调节面板调节播放速度。 | 使用[AudioRenderer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer)的[setSpeed()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#setspeed11)设置播放倍速。 |
| [音量设置](/consumer/cn/doc/best-practices/bpta-playing-pcm-audio-based-audiorenderer#section88718617116) | 滑动音量调节面板调节播放音量。 | 使用[AudioRenderer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer)的[setVolume()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#setvolume9)设置播放音量。 |
| [接入播控中心](/consumer/cn/doc/best-practices/bpta-playing-pcm-audio-based-audiorenderer#section06660114245) | 通过播控中心，控制播放、暂停、切换音频、调整播放进度、切换循环模式 | 通过[AVSessionKit](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/avsession-kit)音频播控服务实现音频应用接入播控中心。 |
| [后台播放](/consumer/cn/doc/best-practices/bpta-playing-pcm-audio-based-audiorenderer#section1749719114143) | 音频切换到后台播放。 | 接入播控中心，在此基础上申请后台运行权限并创建长时后台任务，从而实现音频在后台持续播放的功能。 |
| [接入播控中心冷启动和历史歌单](/consumer/cn/doc/best-practices/bpta-playing-pcm-audio-based-audiorenderer#section476545143517) | 应用退出后，播控中心显示历史歌单，点击播控中心播放按钮拉起应用播放，或者点击歌单拉起应用播放。 | 注册并适配后台启动模式的[播放意图](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/intents-habit-rec-access-programme)，即可实现接入。 |
| [低功耗音频播放](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/power-saving-for-playback) | 低功耗音频播放是一种通过软硬芯协同设计实现的音频渲染方案。其核心机制是增大音频渲染器的内部缓存，使系统能够一次性填充大量音频数据，从而允许主处理器长时间休眠，减少频繁处理音频数据的功耗，显著降低系统级功耗负载。 | 具体介绍和实现方案参考：[低功耗音频播放](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/power-saving-for-playback)。 |

## 基础播控

### 场景描述

通过[AudioRenderer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer)实现基础的音频播放控制能力，包括音频资源加载、播放、暂停、停止及退出等操作。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/30/v3/SAB9MwSQRTC3oImNkqQGMg/zh-cn_image_0000002524057574.gif?HW-CC-KV=V1&HW-CC-Date=20260414T060036Z&HW-CC-Expire=86400&HW-CC-Sign=0D666674EE074A7105D08D0F79B684D4B4D1D596C0AF6DEA2A1047DDCA8D37B0 "点击放大")

### 实现原理

开发者可以通过[AudioRenderer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer)的接口，创建AudioRenderer实例，在AudioRenderer的[on('writeData')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#onwritedata11)回调中，将获取的歌曲资源写入回调事件中，实现资源加载。通过AudioRenderer的[start()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#start8)、[pause()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#pause8)、[stop()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#stop8)和[release()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#release8)接口实现音频的播放、暂停、停止和资源释放操作。

[AudioRenderer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer)中的不同接口调用和其状态的变化关系参考[AudioRenderer状态变化示意图](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/using-audiorenderer-for-playback)。

### 开发步骤

1. 创建AudioRenderer实例。

收起

自动换行

深色代码主题

复制

```
1. public async initAudioRenderer() {
2. if (this.audioRenderer) {
3. await this.audioRenderer.release();
4. Logger.info(TAG, 'audioRenderer release ')
5. }
6. let audioStreamInfo: audio.AudioStreamInfo = {
7. samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_48000,
8. channels: audio.AudioChannel.CHANNEL_2,
9. sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
10. encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
11. };

13. let audioRendererInfo: audio.AudioRendererInfo = {
14. usage: audio.StreamUsage.STREAM_USAGE_MUSIC,
15. rendererFlags: 0,
16. volumeMode: audio.AudioVolumeMode.SYSTEM_GLOBAL
17. };

19. let audioRendererOptions: audio.AudioRendererOptions = {
20. streamInfo: audioStreamInfo,
21. rendererInfo: audioRendererInfo
22. };
23. try {
24. let audioRenderer = await audio.createAudioRenderer(audioRendererOptions);
25. Logger.info(TAG, 'Invoke createAudioRenderer succeeded.');
26. this.audioRenderer = audioRenderer;
27. this.setAudioRendererCallbacks();
28. } catch (err) {
29. Logger.error(TAG, `Invoke createAudioRenderer failed, message is ${err}`);
30. }
31. }
```

[AudioRendererController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AudioRendererController.ets#L47-L78)

2. 加载歌曲资源。

收起

自动换行

深色代码主题

复制

```
1. public async loadSongAssent(songRawFileDescriptor: resourceManager.RawFileDescriptor) {
2. if (!songRawFileDescriptor) {
3. Logger.error(TAG, `loadSongAssent faile : songRawFileDescriptor get failed`);
4. return;
5. }
6. this.initOffset = songRawFileDescriptor.offset;
7. this.currentOffset = this.initOffset;
8. Logger.info(TAG, `current currentOffset is ${this.currentOffset}`)
9. this.bufferNeedRead = songRawFileDescriptor.length;
10. this.bufferRead = 0;
11. this.songRawFileDescriptor = songRawFileDescriptor;
12. }
```

[AudioRendererController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AudioRendererController.ets#L199-L211)

3. 设置[on('writeData')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#onwritedata11)回调，将获取的歌曲资源写入回调事件中，实现资源加载。

收起

自动换行

深色代码主题

复制

```
1. // Set the data read retrieval call function
2. private setWriteDataCallback() {
3. if (!this.audioRenderer) {
4. Logger.error(TAG, 'writeData fail, audioRenderer is undefined');
5. return;
6. }
7. let secondBufferWalk = SECOND_BUFFER_WALK;
8. let bufferWalk = 0;
9. let options: Options;
10. this.audioRenderer.on('writeData', (buffer) => {
11. if (!this.songRawFileDescriptor) {
12. return;
13. }
14. options = {
15. offset: this.currentOffset,
16. length: buffer.byteLength
17. };
18. fileIo.readSync(this.songRawFileDescriptor.fd, buffer, options);
19. this.currentOffset += buffer.byteLength;
20. this.bufferRead = this.currentOffset - this.initOffset;
21. bufferWalk += buffer.byteLength;
22. if (this.bufferRead <= this.bufferNeedRead) {
23. if (bufferWalk >= secondBufferWalk) { // 1s seek
24. let curMs = MediaTools.getMsFromByteLength(this.bufferRead);
25. this.seek(curMs);
26. bufferWalk = 0;
27. }
28. } else {
29. bufferWalk = 0;
30. let curMs = MediaTools.getMsFromByteLength(this.songRawFileDescriptor.length);
31. Logger.info(TAG, 'setWriteDataCallback CurMs is ' + curMs);
32. this.seek(curMs);
33. MediaControlCenterCallbackAction.getInstance().doPlayNextAction();
34. }
35. })
36. }
```

[AudioRendererController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AudioRendererController.ets#L89-L125)

4. 开始播放。

收起

自动换行

深色代码主题

复制

```
1. // play music.
2. public async play() {
3. if (!this.audioRenderer) {
4. Logger.error(TAG, `audioRenderer is undefined.`);
5. return;
6. }
7. try {
8. await this.audioRenderer.start().catch((err: BusinessError) => {
9. Logger.error(TAG, `start failed,code is ${err.code},message is ${err.message}`);
10. })
11. } catch (e) {
12. Logger.error(TAG, `start failed,audioRenderer is undefined`);
13. }
14. }
```

[AudioRendererController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AudioRendererController.ets#L249-L263)

5. 暂停播放。

收起

自动换行

深色代码主题

复制

```
1. // Pause music.
2. public async pause() {
3. if (this.audioRenderer) {
4. try {
5. await this.audioRenderer.pause().catch((err: BusinessError) => {
6. Logger.error(TAG, `pause failed,code is ${err.code},message is ${err.message}`);
7. })
8. Logger.info(TAG, 'pause success');
9. } catch (e) {
10. Logger.error(TAG, `pause failed,audioRenderer is undefined`);
11. }
12. }
13. }
```

[AudioRendererController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AudioRendererController.ets#L267-L280)

6. 停止播放。

收起

自动换行

深色代码主题

复制

```
1. // Stop music
2. public async stop() {
3. if (this.audioRenderer) {
4. try {
5. await this.audioRenderer.stop().catch((err: BusinessError) => {
6. Logger.error(TAG, `stop failed,code is ${err.code},message is ${err.message}`);
7. })
8. this.curMs = 0;
9. await this.audioRenderer.flush();
10. Logger.info(TAG, 'stop success');
11. } catch (e) {
12. Logger.error(TAG, `stop failed,audioRenderer is undefined`);
13. }
14. }
15. }
```

[AudioRendererController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AudioRendererController.ets#L298-L312)

7. 释放实例，退出播放。

收起

自动换行

深色代码主题

复制

```
1. // Release audioRenderer
2. public async release() {
3. if (this.audioRenderer && this.context) {
4. try {
5. await AudioRendererController.getInstance().stop();
6. await this.audioRenderer.release().catch((err: BusinessError) => {
7. if (this.songRawFileDescriptor) {
8. fileIo.close(this.songRawFileDescriptor.fd);
9. }
10. Logger.error(TAG, `release failed,code is ${err.code},message is ${err.message}`);
11. })
12. AppStorage.setOrCreate('audioRendererController', undefined)
13. Logger.info(TAG, 'release success');
14. } catch (err) {
15. Logger.error(TAG,
16. `release failed,audioRenderer is undefined, code is ${JSON.stringify(err.code)},message is ${JSON.stringify(err.message)}`);
17. }
18. }
19. }
```

[AudioRendererController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AudioRendererController.ets#L316-L334)

## 跳转播放

### 场景描述

通过点击或拖动进度条精准跳转到指定时间进行播放。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e4/v3/qhxk1iNgQPiqWX6Am9z9FQ/zh-cn_image_0000002555217467.gif?HW-CC-KV=V1&HW-CC-Date=20260414T060036Z&HW-CC-Expire=86400&HW-CC-Sign=F68CA24B776CE5B97D34D24007D383A41F9862FFD5F5004F7BAF886ACC4616EC "点击放大")

### 实现原理

在pcm文件中，每1秒时间对应的音频帧数是固定的，并且每音频帧的字节数是固定的，所以歌曲在不同时长对应的资源起始位置也可以计算出来。当用户拖动进度条到指定时间后，计算出当前时间对应当前资源的起始位置，在AudioRenderer的on('writeData')回调中，从对应的起始位置开始获取歌曲资源并写入回调中，从而实现跳转播放。另外一种方案可以参考[基于OHAudio播放PCM音频](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-playing-pcm-audio-based-ohaudio)中[跳转播放](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-playing-pcm-audio-based-ohaudio#section16920851193717)的[实现原理](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-playing-pcm-audio-based-ohaudio#section5752111843915)一节。

说明

音频帧大小 = 通道数 \* （采样位深 / 8），单位为字节。

每1秒PCM对应的字节数 = 1秒包含的音频帧数 \* 音频帧大小 ，单位为字节。

* 采样率：等于每秒帧数，采样率为48000代表每秒包含48000音频帧。使用[createAudioRenderer()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-f#audiocreateaudiorenderer8)接口创建AudioRenderer实例时，通过配置[options](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-i#audiorendereroptions8)属性，设置音频流信息[streamInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-i#audiostreaminfo8)中的采样率[samplingRate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audiosamplingrate8)来设置。
* 通道数：决定音频帧大小，1帧 = 所有声道各取1个采样点。使用[createAudioRenderer()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-f#audiocreateaudiorenderer8)接口创建AudioRenderer实例时，通过配置[options](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-i#audiorendereroptions8)属性，设置音频流信息[streamInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-i#audiostreaminfo8)中的通道数[channels](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audiochannel8)来设置。
* 采样位深：决定音频帧大小，单位为位（bit)，1字节 = 8位。使用[createAudioRenderer()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-f#audiocreateaudiorenderer8)接口创建AudioRenderer实例时，通过配置[options](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-i#audiorendereroptions8)属性，设置音频流信息[streamInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-i#audiostreaminfo8)中的采样格式[sampleFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audiosampleformat8)来获得，其对应关系如下表格。

按照[基础播控](/consumer/cn/doc/best-practices/bpta-playing-pcm-audio-based-audiorenderer#section1764813377511)的[开发步骤](/consumer/cn/doc/best-practices/bpta-playing-pcm-audio-based-audiorenderer#section167679401369)1创建AudioRenderer是配置的音频流信息是采样率48000，双声道，采样位深16bit。可以算出：

音频帧大小 = 2 \* （16 / 8）= 4 字节；

每1秒PCM对应的字节数 = 48000 \* 2 \* （16 / 8） = 192000字节。

展开

| **AudioSampleFormat枚举值** | 对应采样位深 |
| --- | --- |
| SAMPLE\_FORMAT\_U8 | 8bit |
| SAMPLE\_FORMAT\_S16LE | 16bit |
| SAMPLE\_FORMAT\_S24LE | 24bit |
| SAMPLE\_FORMAT\_S32LE | 32bit |
| SAMPLE\_FORMAT\_F32LE | 32bit |

### 开发步骤

1. 计算每1秒PCM对应的字节数。

收起

自动换行

深色代码主题

复制

```
1. export const SECOND_BUFFER_WALK = 48000 * 2 * (16 / 8);
```

[PlayerConstants.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/constants/PlayerConstants.ets#L116-L116)

2. 计算跳转的目标时间对应的字节数。

收起

自动换行

深色代码主题

复制

```
1. static getOffsetFromTime(curMs: number) {
2. return (curMs / 1000) * SECOND_BUFFER_WALK;
3. }
```

[MediaTools.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/MediaTools.ets#L64-L66)

3. 执行seek，结合文件的初始偏移值，算出目标时间对应的数据偏移位置。

收起

自动换行

深色代码主题

复制

```
1. // Seek play music.
2. public seek(ms: number) {
3. if (ms < 0) {
4. Logger.error(TAG, 'Invalid seek position')
5. }
6. this.curMs = ms;
7. this.currentOffset = this.initOffset + MediaTools.getOffsetFromTime(this.curMs);
8. MediaControlCenterCallbackAction.getInstance().doUpdateProgressAction(ms);
9. }
```

[AudioRendererController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AudioRendererController.ets#L284-L293)

4. 在AudioRenderer的[on('writeData')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#onwritedata11)回调中，从对应的数据偏移位置开始获取歌曲资源并写入回调中。

收起

自动换行

深色代码主题

复制

```
1. // Set the data read retrieval call function
2. private setWriteDataCallback() {
3. if (!this.audioRenderer) {
4. Logger.error(TAG, 'writeData fail, audioRenderer is undefined');
5. return;
6. }
7. let secondBufferWalk = SECOND_BUFFER_WALK;
8. let bufferWalk = 0;
9. let options: Options;
10. this.audioRenderer.on('writeData', (buffer) => {
11. if (!this.songRawFileDescriptor) {
12. return;
13. }
14. options = {
15. offset: this.currentOffset,
16. length: buffer.byteLength
17. };
18. fileIo.readSync(this.songRawFileDescriptor.fd, buffer, options);
19. this.currentOffset += buffer.byteLength;
20. this.bufferRead = this.currentOffset - this.initOffset;
21. bufferWalk += buffer.byteLength;
22. if (this.bufferRead <= this.bufferNeedRead) {
23. if (bufferWalk >= secondBufferWalk) { // 1s seek
24. let curMs = MediaTools.getMsFromByteLength(this.bufferRead);
25. this.seek(curMs);
26. bufferWalk = 0;
27. }
28. } else {
29. bufferWalk = 0;
30. let curMs = MediaTools.getMsFromByteLength(this.songRawFileDescriptor.length);
31. Logger.info(TAG, 'setWriteDataCallback CurMs is ' + curMs);
32. this.seek(curMs);
33. MediaControlCenterCallbackAction.getInstance().doPlayNextAction();
34. }
35. })
36. }
```

[AudioRendererController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AudioRendererController.ets#L89-L125)

## 静音播放

### 场景描述

通过界面按钮快捷切换音频播放静音模式，实现一键开启或关闭静音模式。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/37/v3/rd5SpDPdTqa1Zj3xAGXMoQ/zh-cn_image_0000002524217570.gif?HW-CC-KV=V1&HW-CC-Date=20260414T060036Z&HW-CC-Expire=86400&HW-CC-Sign=4BE3B4CEB24AFB2D749B2F64ED3125542ED76ED760F0FAD22F8CD1E25DF9161B "点击放大")

### 实现原理

使用[AudioRenderer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer)的[setSilentModeAndMixWithOthers()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#setsilentmodeandmixwithothers12)方法来开启或关闭静音模式，参数设置为true，表示开启静音播放模式。

### 开发步骤

调用[setSilentModeAndMixWithOthers()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#setsilentmodeandmixwithothers12)接口，开启或关闭静音模式。

收起

自动换行

深色代码主题

复制

```
1. // Set the silent mode
2. public async setSilentMode(isSupportSilent: boolean = false) {
3. if (!this.audioRenderer || !this.context) {
4. return;
5. }
6. this.audioRenderer.setSilentModeAndMixWithOthers(isSupportSilent);
7. AppStorage.setOrCreate('isSilentMode', isSupportSilent);
8. }
```

[AudioRendererController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AudioRendererController.ets#L187-L195)

## 切换歌曲播放

### 场景描述

点击上一首或下一首或歌单列表中的歌曲进行不同歌曲播放。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/28/v3/gY4iikxHTKSVQ2Gr1dsYgw/zh-cn_image_0000002555337439.gif?HW-CC-KV=V1&HW-CC-Date=20260414T060036Z&HW-CC-Expire=86400&HW-CC-Sign=0D31D218F4A0623C917F8D584E329411732284BCF9D546B4DA5F23FE528D1735 "点击放大")

### 实现原理

通过加载不同的资源文件，并在AudioRenderer的[on('writeData')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#onwritedata11)回调中，读取资源数据，从而完成歌曲切换场景。

### 开发步骤

1. 停止当前播放的歌曲，并且清空缓存，防止杂音。

收起

自动换行

深色代码主题

复制

```
1. // Stop music
2. public async stop() {
3. if (this.audioRenderer) {
4. try {
5. await this.audioRenderer.stop().catch((err: BusinessError) => {
6. Logger.error(TAG, `stop failed,code is ${err.code},message is ${err.message}`);
7. })
8. this.curMs = 0;
9. await this.audioRenderer.flush();
10. Logger.info(TAG, 'stop success');
11. } catch (e) {
12. Logger.error(TAG, `stop failed,audioRenderer is undefined`);
13. }
14. }
15. }
```

[AudioRendererController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AudioRendererController.ets#L298-L312)

2. 根据切换模式，获取下一首歌曲的资源后，执行播放。

收起

自动换行

深色代码主题

复制

```
1. public async playNext() {
2. await this.stop();
3. let nextIndex = this.musicIndex;
4. switch (this.playMode) {
5. case MusicPlayMode.SINGLE_CYCLE:
6. break;
7. case MusicPlayMode.ORDER:
8. if (this.musicIndex === this.songList.length - 1) {
9. nextIndex = 0;
10. } else {
11. nextIndex += 1;
12. }
13. break;
14. case MusicPlayMode.RANDOM:
15. nextIndex = this.setRandom();
16. break;
17. default:
18. break;
19. }
20. this.updateMusicIndex(nextIndex);
21. await this.loadSongAssent();
22. Logger.info(TAG, `nextIndex is ${nextIndex}`);
23. await this.play();
24. }
```

[MediaControlCenter.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/MediaControlCenter.ets#L201-L225)

## 倍速设置

### 场景描述

滑动倍速调节面板调节播放速度。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1e/v3/3Lb2LLR9Q0aW4w574GzLhw/zh-cn_image_0000002524057576.gif?HW-CC-KV=V1&HW-CC-Date=20260414T060036Z&HW-CC-Expire=86400&HW-CC-Sign=68E12DF24B111A1289C31DB65F2C05DDE28A9ECF8AA204A23E96AA01A0799502 "点击放大")

### 实现原理

通过调节面板面板获取目标速度值，输入到[AudioRenderer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer)的[setSpeed()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#setspeed11)接口中，实现设置播放速度的功能。

### 开发步骤

1. 通过调节面板获取速度值，传入[setSpeed()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#setspeed11)接口中。

收起

自动换行

深色代码主题

复制

```
1. Slider({
2. value: this.speed,
3. min: 0.25,
4. max: 4,
5. step: 0.25,
6. style: SliderStyle.InSet,
7. })
8. .blockSize(
9. {
10. width: 28,
11. height: 28
12. }
13. )
14. .trackThickness(35)
15. .trackColor($r('sys.color.button_background_color_transparent'))
16. .selectedColor(Color.Transparent)
17. .layoutWeight(1)
18. .width('100%')
19. .showTips(false)
20. .showSteps(true)
21. .onChange((value: number, mode: SliderChangeMode) => {
22. this.speed = value;
23. MediaControlCenter.getInstance().setSpeed(this.speed);
24. Logger.info(TAG, 'value:' + value + 'mode:' + mode.toString());
25. })
```

[ControlAreaComponent.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/view/ControlAreaComponent.ets#L415-L439)

2. 根据支持的倍数范围，通过[setSpeed()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#setspeed11)接口设置播放的倍数值。

收起

自动换行

深色代码主题

复制

```
1. // Set the playback speed
2. public setSpeed(speed: number) {
3. if (this.audioRenderer) {
4. try {
5. this.audioRenderer.setSpeed(speed);
6. } catch (err) {
7. Logger.error(TAG, `setSpeed fail, err:${JSON.stringify(err)}`)
8. }
9. }
10. }
```

[AudioRendererController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AudioRendererController.ets#L215-L224)

## 音量设置

### 场景描述

滑动音量调节面板调节播放音量。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/23/v3/hsbsHkM5TWqnj0TJYNDkmQ/zh-cn_image_0000002555217469.gif?HW-CC-KV=V1&HW-CC-Date=20260414T060036Z&HW-CC-Expire=86400&HW-CC-Sign=8E1A78BC705CFAC63E932D05553A8F3EFE98EDBC562EA15F62512ABB8564771B "点击放大")

### 实现原理

通过调节面板获取目标音量值，输入到[AudioRenderer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer)的[setVolume()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#setvolume9)接口中，实现设置播放音量的功能。

### 开发步骤

1. 通过调节面板获取音量值，传入[setVolume()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#setvolume9)接口中。

收起

自动换行

深色代码主题

复制

```
1. Slider({
2. value: this.volume,
3. min: 0,
4. max: 1,
5. step: 0.1,
6. style: SliderStyle.InSet
7. })
8. .showTips(false)
9. .layoutWeight(1)
10. .onChange((value: number, mode: SliderChangeMode) => {
11. this.volume = value;
12. // ...
13. })
```

[ControlAreaComponent.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/view/ControlAreaComponent.ets#L335-L353)

收起

自动换行

深色代码主题

复制

```
1. @StorageLink('currentVolume') @Watch('currentVolumeChange') volume: number = 0;
2. // ...
3. currentVolumeChange() {
4. MediaControlCenter.getInstance().setVolume(this.volume)
5. }
```

[ControlAreaComponent.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/view/ControlAreaComponent.ets#L50-L72)

2. 通过[setVolume()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#setvolume9)接口设置播放音量。

收起

自动换行

深色代码主题

复制

```
1. public setVolume(volume: number) {
2. if (!this.audioRenderer) {
3. Logger.error(TAG, `audioRenderer is undefined`)
4. return;
5. }
6. this.audioRenderer.setVolume(volume);
7. }
```

[AudioRendererController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AudioRendererController.ets#L238-L245)

## 接入播控中心

### 场景描述

通过播控中心，控制播放、暂停、切换上一首或者下一首音频。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c3/v3/7Ho3fkvySGafU2GrJjZ35A/zh-cn_image_0000002524217572.gif?HW-CC-KV=V1&HW-CC-Date=20260414T060036Z&HW-CC-Expire=86400&HW-CC-Sign=74F999053619CE42E3B240D4DA5D9A3A95E92E963C3399EC123C707858A5E623 "点击放大") ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/26/v3/h2BO_boERsGkNsmR4L3PEw/zh-cn_image_0000002555337441.gif?HW-CC-KV=V1&HW-CC-Date=20260414T060036Z&HW-CC-Expire=86400&HW-CC-Sign=AF39E9C6D3F9513C427ECA26940A6B21CD811F43A17F916EB5BB69C3D57E59AD "点击放大") ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/56/v3/YS4eCKaHT925JwktUX7nMQ/zh-cn_image_0000002524057578.gif?HW-CC-KV=V1&HW-CC-Date=20260414T060036Z&HW-CC-Expire=86400&HW-CC-Sign=FFA8F25B4FE2B8DC1DB6E80B90329DEEB4DF2B144E5E2AF6A915225C17FF55D0 "点击放大")

### 实现原理

通过[AVSessionKit](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/avsession-kit)音频播控服务实现音频应用接入播控中心。应用和播控中心的状态交互过程可参考[播控中心控制音乐状态](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-audio-interaction-practice#section1245419358228)一节。

### 开发步骤

1. 通过[createAVSession()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-avsession-f#avsessioncreateavsession10)创建AVSession实例并激活媒体会话，[AVSessionType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-avsession-t#avsessiontype10)设置为audio。

收起

自动换行

深色代码主题

复制

```
1. public async initAVSession() {
2. this.context = AppStorage.get('context');
3. if (!this.context) {
4. Logger.info(TAG, `session create failed, conext is undefined`);
5. return;
6. }
7. this.mediaControlCenter = MediaControlCenter.getInstance();
8. this.AVSession = await avSession.createAVSession(this.context, "PLAY_AUDIO", 'audio');
9. await this.AVSession.activate();
10. Logger.info(TAG, `session create successed : sessionId : ${this.AVSession.sessionId}`);
11. await this.setAVMetadata();
12. this.setLaunchAbility();
13. this.setListenerForMesFromController();
14. if (this.musicIndex !== undefined) {
15. this.getAndUpdateFavoriteState(this.musicIndex.toString());
16. }
17. }
```

[AVSessionController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AVSessionController.ets#L52-L69)

2. 通过[setAVMetadata()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-avsession-avsession#setavmetadata10)把会话的一些元数据信息设置给系统，从而在播控中心界面进行展示。如媒体ID（assetId）、标题（title）、播控中心显示的图片（mediaImage）、媒体时长（duration）等。

收起

自动换行

深色代码主题

复制

```
1. // Set metadata
2. public async setAVMetadata() {
3. this.musicIndex = AppStorage.get('selectIndex') ? AppStorage.get('selectIndex') : 0;
4. Logger.info(TAG, 'current musicIndex is:' + this.musicIndex);
5. if (this.musicIndex === undefined) {
6. this.musicIndex = 0;
7. }
8. try {
9. if (this.context) {
10. let mediaImage = await MediaTools.getPixelMapFromResource(this.context,
11. this.songList[this.musicIndex].label as resourceManager.Resource);
12. Logger.info(TAG, 'getPixelMapFromResource success' + JSON.stringify(mediaImage));
13. let title = '';
14. let artist = '';
15. if (this.context) {
16. if (this.songList[this.musicIndex].title !== undefined) {
17. title = this.context.resourceManager.getStringSync(this.songList[this.musicIndex].title!.id);
18. }
19. if (this.songList[this.musicIndex].singer !== undefined) {
20. artist = this.context.resourceManager.getStringSync(this.songList[this.musicIndex].singer!.id);
21. }
22. } else {
23. title = FirstSongTitle;
24. artist = FirstSongSinger;
25. }
26. let metadata: avSession.AVMetadata = {
27. assetId: `${this.musicIndex}`,
28. title: title,
29. artist: artist,
30. mediaImage: mediaImage,
31. duration: this.getDuration(),
32. avQueueName: 'AudioRendererQueue',
33. avQueueId: 'AudioRendererQueueId',
34. avQueueImage: mediaImage
35. };
36. let lrc = await MediaTools.getLrcFromRawFile(this.context, this.songList[this.musicIndex].lyric);
37. if (lrc) {
38. metadata.lyric = lrc;
39. }
40. if (this.AVSession) {
41. this.AVSession.setAVMetadata(metadata).then(() => {
42. Logger.info(TAG, 'SetAVMetadata successfully');
43. }).catch((err: BusinessError) => {
44. Logger.error(TAG, `SetAVMetadata BusinessError: code: ${err.code}, message: ${err.message}`);
45. });
46. }
47. }
48. } catch (error) {
49. Logger.error(TAG, `SetAVMetadata faile, code: ${(error as BusinessError).code}`);
50. }
51. }
```

[AVSessionController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AVSessionController.ets#L111-L162)

3. 设置用于被播控中心拉起的UIAbility。

收起

自动换行

深色代码主题

复制

```
1. // Set LaunchAbility.
2. private setLaunchAbility() {
3. if (!this.context) {
4. return;
5. }
6. let wantAgentInfo: wantAgent.WantAgentInfo = {
7. wants: [
8. {
9. bundleName: this.context.abilityInfo.bundleName,
10. abilityName: this.context.abilityInfo.name
11. }
12. ],
13. operationType: wantAgent.OperationType.START_ABILITIES,
14. requestCode: 0,
15. wantAgentFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
16. };
17. wantAgent.getWantAgent(wantAgentInfo).then((agent) => {
18. if (this.AVSession) {
19. this.AVSession.setLaunchAbility(agent);
20. }
21. })
22. .catch((err: BusinessError) => {
23. Logger.error(TAG, `getWantAgent failed: code: ${err.code}, message: ${err.message}`);
24. });
25. }
```

[AVSessionController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AVSessionController.ets#L73-L98)

4. 注册播控命令事件监听，便于响应用户通过播控中心下发的播控命令，比如播放[on('play')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-avsession-avsession#onplay10)、暂停[on('pause')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-avsession-avsession#onpause10)、上一曲[on('playPrevious')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-avsession-avsession#onplayprevious10)、下一曲[on('playNext')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-avsession-avsession#onplaynext10)等。

收起

自动换行

深色代码主题

复制

```
1. // Set listening events
2. async setListenerForMesFromController() {
3. if (!this.AVSession) {
4. return;
5. }
6. this.AVSession.on('play', this.onPlay);
7. this.AVSession.on('pause', this.onPause);
8. this.AVSession.on('playNext', this.onPlayNext);
9. this.AVSession.on('playPrevious', this.onPlayPrevious);
10. this.AVSession.on('seek', this.onSeek);
11. this.AVSession.on('setLoopMode', this.onSetLoopMode);
12. this.AVSession.on('toggleFavorite', this.onToggleFavorite);
13. }
```

[AVSessionController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AVSessionController.ets#L166-L179)

5. 应用状态上报播控中心，当音频状态发生改变时，需要通过[setAVPlaybackState()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-avsession-avsession#setavplaybackstate10)向播控中心上报视频状态，来达到播控中心与应用的状态同步，包括播放状态（state）、播放位置（position）、当前媒体播放时长（duration）等。

收起

自动换行

深色代码主题

复制

```
1. // Set favorite state.
2. private setFavoriteState(isFavorite: boolean) {
3. if (this.AVSession) {
4. this.AVSession.setAVPlaybackState({ isFavorite }, (err: BusinessError) => {
5. if (err) {
6. Logger.error(TAG, `setFavoriteState BusinessError: code: ${err.code}, message: ${err.message}`);
7. } else {
8. Logger.info(TAG, 'setFavoriteState successfully');
9. }
10. });
11. }
12. }

14. // Set progress state.
15. public setProgressState(ms: number) {
16. if (this.AVSession) {
17. this.AVSession.setAVPlaybackState({
18. position: {
19. elapsedTime: ms,
20. updateTime: new Date().getTime()
21. }
22. }, (err: BusinessError) => {
23. if (err) {
24. Logger.error(TAG, `setProgressState BusinessError: code: ${err.code}, message: ${err.message}`);
25. } else {
26. Logger.info(TAG, 'setProgressState successfully');
27. }
28. });
29. }
30. }

32. // Set play state.
33. public setPlayState(isPlay: boolean) {
34. if (!this.AVSession) {
35. Logger.error(TAG, 'AVSession is undefined');
36. return;
37. }
38. this.AVSession.setAVPlaybackState({
39. state: isPlay ? avSession.PlaybackState.PLAYBACK_STATE_PLAY : avSession.PlaybackState.PLAYBACK_STATE_PAUSE,
40. }, (err: BusinessError) => {
41. if (err) {
42. Logger.error(TAG, `setPlayState BusinessError: code: ${err.code}, message: ${err.message}`);
43. } else {
44. Logger.info(TAG, 'setPlayState successfully');
45. }
46. });
47. }
```

[AVSessionController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AVSessionController.ets#L279-L325)

## 后台播放

### 场景描述

音频切换到后台播放。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2b/v3/R_86KepbRSW5PzGKaxzPmg/zh-cn_image_0000002555217471.gif?HW-CC-KV=V1&HW-CC-Date=20260414T060036Z&HW-CC-Expire=86400&HW-CC-Sign=0F8D6F2006834F912304CB3CEAB98CD4EC27C2D0B0F84CE607994C6E522EAF07 "点击放大")

### 实现原理

首先需实现播控中心的接入，在此基础上申请后台运行权限并设置后台模式，同时为音频应用创建长时后台任务，从而实现音频在后台持续播放的功能。

### 开发步骤

1. 在module.json5配置文件中配置[ohos.permission.KEEP\_BACKGROUND\_RUNNING](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/permissions-for-all#ohospermissionkeep_background_running)权限和后台模式audioPlayback。

收起

自动换行

深色代码主题

复制

```
1. {
2. "module": {
3. // ...
4. "requestPermissions": [
5. {
6. "name": "ohos.permission.KEEP_BACKGROUND_RUNNING",
7. "reason": "$string:reason_background",
8. "usedScene": {
9. "abilities": [
10. "EntryAbility"
11. ],
12. "when": "always"
13. }
14. },
15. ],
16. // ...
17. }
18. }
```

[module.json5](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/module.json5#L2-L70)

2. 创建后台任务管理类，实现后台任务的申请（startContinuousTask）与取消（stopContinuousTask），长时任务类型选择[AUDIO\_PLAYBACK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-resourceschedule-backgroundtaskmanager#backgroundmode)，表示音频后台播放。

收起

自动换行

深色代码主题

复制

```
1. export class BackgroundUtil {
2. /**
3. * Start background task.
4. *
5. * @param context
6. */
7. public static startContinuousTask(context?: common.UIAbilityContext): void {
8. if (!context) {
9. Logger.error(TAG, 'startContinuousTask failed', `context undefined`);
10. return;
11. }
12. let wantAgentInfo: wantAgent.WantAgentInfo = {
13. wants: [
14. {
15. bundleName: context.abilityInfo.bundleName,
16. abilityName: context.abilityInfo.name
17. }
18. ],
19. operationType: wantAgent.OperationType.START_ABILITY,
20. requestCode: 0,
21. wantAgentFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
22. };

24. wantAgent.getWantAgent(wantAgentInfo).then((wantAgentObj: Object) => {
25. try {
26. backgroundTaskManager.startBackgroundRunning(context,
27. backgroundTaskManager.BackgroundMode.AUDIO_PLAYBACK, wantAgentObj).then(() => {
28. Logger.info(TAG, 'startBackgroundRunning succeeded');
29. }).catch((error: BusinessError) => {
30. Logger.error(TAG, `startBackgroundRunning failed Cause: code ${error.code}`);
31. });
32. } catch (error) {
33. Logger.error(TAG, `startBackgroundRunning failed.message ${(error as BusinessError).message}`);
34. }
35. })
36. .catch((error: BusinessError) => {
37. Logger.error('this audioRenderer: ', `getWantAgent failed Cause: code ${error.code}`);
38. });
39. }

41. /**
42. * Stop background task.
43. *
44. * @param context
45. */
46. public static stopContinuousTask(context: common.UIAbilityContext): void {
47. try {
48. backgroundTaskManager.stopBackgroundRunning(context).then(() => {
49. Logger.info('this audioRenderer: ', 'stopBackgroundRunning succeeded');
50. }).catch((error: BusinessError) => {
51. Logger.error('this audioRenderer: ', `stopBackgroundRunning failed Cause: code ${error.code}`);
52. });
53. } catch (error) {
54. Logger.error(TAG, `stopBackgroundRunning failed. message ${error}`);
55. }
56. }
57. }
```

[BackgroundUtil.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/BackgroundUtil.ets#L23-L80)

3.在播放和暂停时，分别申请和销毁后台长时任务。

收起

自动换行

深色代码主题

复制

```
1. public async play(index: number = this.musicIndex) {
2. Logger.info(TAG, `index is ${index},musicIndex is ${this.musicIndex}`)
3. if (!this.mediaControlCenterHandle) {
4. Logger.error(TAG, 'mediaControlCenterHandle is undefined');
5. return;
6. }
7. if (index !== this.musicIndex) {
8. this.updateMusicIndex(index);
9. await this.stop();
10. await this.loadSongAssent();
11. }
12. this.updateIsPlay(true);
13. this.mediaControlCenterHandle.play();
14. BackgroundUtil.startContinuousTask(this.context);
15. }

17. public pause() {
18. if (!this.mediaControlCenterHandle) {
19. Logger.error(TAG, 'mediaControlCenterHandle is undefined');
20. return;
21. }
22. this.mediaControlCenterHandle.pause();
23. this.updateIsPlay(false);
24. BackgroundUtil.stopContinuousTask(this.context!);
25. }
```

[MediaControlCenter.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/MediaControlCenter.ets#L151-L176)

## 接入播控中心冷启动和历史歌单

### 场景描述

用户在应用内播放后，上滑结束应用进程，再进入播控中心，点击播放键拉起应用播放，或者点击历史歌单拉起应用播放，播控中心正确显示当前播放信息及播放状态。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e/v3/vcTR7LQDTWG_XBslFZhyyQ/zh-cn_image_0000002524217574.gif?HW-CC-KV=V1&HW-CC-Date=20260414T060036Z&HW-CC-Expire=86400&HW-CC-Sign=74AED14A7B8A3275D89B4DB6F0AEC867BEA3063AE558890710478F48532C75AD "点击放大") ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/86/v3/0QUS654NREypzlibleSSqQ/zh-cn_image_0000002555337449.gif?HW-CC-KV=V1&HW-CC-Date=20260414T060036Z&HW-CC-Expire=86400&HW-CC-Sign=BB191094CB479248B108E3147C5F2A2E0329DFC7F0B929FEB5A3CD2B9840F50F "点击放大")

### 实现原理

注册并适配[意图调用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/intents-habit-rec-access-programme)，实现一键冷启动播放和历史歌单。

### 开发步骤

1. 注册播放意图。应用按照播放业务，选择PlayMusicList意图，编辑对应的意图配置PROJECT\_HOME/entry/src/main/resources/base/profile/insight\_intent.json文件，实现播放意图注册，具体步骤参考：[意图注册](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/intents-habit-rec-access-programme)。

2. 注册成功后，在配置文件中，配置歌曲播放方法，则实现一键冷启动播放。触发播控冷启动播放时，系统会在意图参数intentParam的歌单id为空，即解析出得的entityId为空字符串，由应用决定播放内容。触发歌单播放时，系统会将歌单的唯一标识id传回应用，应用可以在意图调用接口中，通过解析意图参数intentParam中的entityId，获取到歌单的id，实现对应歌单的播放。

收起

自动换行

深色代码主题

复制

```
1. export default class InsightIntentExecutorImpl extends InsightIntentExecutor {
2. async onExecuteInUIAbilityBackgroundMode(intentName: string, intentParam: Record<string, Object>):
3. Promise<insightIntent.ExecuteResult> {
4. switch (intentName) {
5. case 'PlayMusicList':
6. let entityId: string = (intentParam.items as Array<EntityIdObj>)?.[0]?.entityId;
7. return this.playFunc(entityId);
8. case 'PlayAudio':
9. let data = intentParam as Record<string, string>;
10. return this.playFunc(data.entityId);
11. default:
12. break;
13. }
14. return Promise.resolve({
15. code: -1,
16. result: {
17. message: 'unknown intent'
18. }
19. } as insightIntent.ExecuteResult)
20. }

22. // ...
23. }
```

[InsightIntentExecutorImpl.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/entryability/InsightIntentExecutorImpl.ets#L26-L76)

3. 设置歌单信息，通过[setAVMetadata](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-avsession-avsession#setavmetadata10)接口设置当前播放的歌单信息，系统媒体信息根据应用上报实时刷新，若应用接入歌单功能，则确保在[AVMetadata](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-avsession-i#avmetadata10)中一直携带歌单数据。

收起

自动换行

深色代码主题

复制

```
1. // Set metadata
2. public async setAVMetadata() {
3. this.musicIndex = AppStorage.get('selectIndex') ? AppStorage.get('selectIndex') : 0;
4. Logger.info(TAG, 'current musicIndex is:' + this.musicIndex);
5. if (this.musicIndex === undefined) {
6. this.musicIndex = 0;
7. }
8. try {
9. if (this.context) {
10. let mediaImage = await MediaTools.getPixelMapFromResource(this.context,
11. this.songList[this.musicIndex].label as resourceManager.Resource);
12. Logger.info(TAG, 'getPixelMapFromResource success' + JSON.stringify(mediaImage));
13. let title = '';
14. let artist = '';
15. if (this.context) {
16. if (this.songList[this.musicIndex].title !== undefined) {
17. title = this.context.resourceManager.getStringSync(this.songList[this.musicIndex].title!.id);
18. }
19. if (this.songList[this.musicIndex].singer !== undefined) {
20. artist = this.context.resourceManager.getStringSync(this.songList[this.musicIndex].singer!.id);
21. }
22. } else {
23. title = FirstSongTitle;
24. artist = FirstSongSinger;
25. }
26. let metadata: avSession.AVMetadata = {
27. assetId: `${this.musicIndex}`,
28. title: title,
29. artist: artist,
30. mediaImage: mediaImage,
31. duration: this.getDuration(),
32. avQueueName: 'AudioRendererQueue',
33. avQueueId: 'AudioRendererQueueId',
34. avQueueImage: mediaImage
35. };
36. let lrc = await MediaTools.getLrcFromRawFile(this.context, this.songList[this.musicIndex].lyric);
37. if (lrc) {
38. metadata.lyric = lrc;
39. }
40. if (this.AVSession) {
41. this.AVSession.setAVMetadata(metadata).then(() => {
42. Logger.info(TAG, 'SetAVMetadata successfully');
43. }).catch((err: BusinessError) => {
44. Logger.error(TAG, `SetAVMetadata BusinessError: code: ${err.code}, message: ${err.message}`);
45. });
46. }
47. }
48. } catch (error) {
49. Logger.error(TAG, `SetAVMetadata faile, code: ${(error as BusinessError).code}`);
50. }
51. }
```

[AVSessionController.ets](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm/blob/master/entry/src/main/ets/common/utils/mediautils/AVSessionController.ets#L111-L162)

## 示例代码

* [基于AudioRenderer播放PCM音频](https://gitcode.com/HarmonyOS_Samples/audio-renderer-play-pcm)