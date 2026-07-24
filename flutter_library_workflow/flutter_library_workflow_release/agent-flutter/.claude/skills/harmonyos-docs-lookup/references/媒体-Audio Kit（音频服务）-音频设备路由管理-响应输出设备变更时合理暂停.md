开发者可以了解音频流输出设备变更信息，并完成相应适配，比如：应用在播放音乐时发现输出设备下线，为避免打扰用户，应该立即暂停音乐。

开发者可使用AudioRenderer的[on('outputDeviceChangeWithInfo')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#onoutputdevicechangewithinfo11)或AudioSessionManager的[on('currentOutputDeviceChanged')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#oncurrentoutputdevicechanged20)，用于监听音频流输出设备变化及原因。当系统出现音频输出设备的上下线、用户强选、设备抢占或设备选择策略变更等情况，导致音频流输出设备变更时，系统将通过该接口通知应用当前音频流设备变更信息，包含当前音频流输出设备信息和设备变更原因。

## 音频流输出设备信息

在AudioRenderer的[on('outputDeviceChangeWithInfo')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#onoutputdevicechangewithinfo11)或AudioSessionManager的[on('currentOutputDeviceChanged')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#oncurrentoutputdevicechanged20)返回的音频流设备变更信息中，包含当前音频流输出设备信息，以数组形式发送，一般该列表仅包含一个设备信息，具体可参考[AudioDeviceDescriptors](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-t#audiodevicedescriptors)（设备信息列表）。

## 音频流输出设备变更原因

说明

当发生下述四种情况（[AudioStreamDeviceChangeReason](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audiostreamdevicechangereason11)）时，系统将向应用发送设备变更回调。

* **REASON\_NEW\_DEVICE\_AVAILABLE**：新设备可用。

  **触发场景：**

  普通蓝牙设备（耳机、眼镜、音箱、车机等）连接、支持佩戴检测的蓝牙设备（耳机、眼镜等）佩戴、有线设备（3.5mm耳机、Type-C耳机、USB耳机、USB音箱等）插入、分布式设备上线等。
* **REASON\_OLD\_DEVICE\_UNAVAILABLE**：旧设备不可用。

  当报告此原因时，应用程序应考虑暂停音频播放。

  **触发场景：**

  普通蓝牙设备（耳机、眼镜、音箱、车机等）断开、支持佩戴检测的蓝牙耳机双耳摘下、支持佩戴检测的蓝牙眼镜摘下、有线设备（3.5mm耳机、Type-C耳机、USB耳机、USB音箱等）拔出、分布式设备下线等。

  针对此场景，常用业务场景的**处理建议**如下：

  + 游戏场景：不暂停
  + 听书场景：暂停
  + 音乐场景：暂停
  + 视频场景：暂停
* **REASON\_OVERRODE**：用户强制选择设备。

  **触发场景：**

  用户从界面选择切换音频流输出设备、从外设选择接听蜂窝或VoIP来电。
* **REASON\_UNKNOWN**：未知原因。

## 参考示例

### AudioRenderer示例

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let audioRenderer: audio.AudioRenderer | undefined = undefined;
5. let audioStreamInfo: audio.AudioStreamInfo = {
6. samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_48000, // 采样率。
7. channels: audio.AudioChannel.CHANNEL_2, // 通道。
8. sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE, // 采样格式。
9. encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW // 编码格式。
10. };
11. let audioRendererInfo: audio.AudioRendererInfo = {
12. usage: audio.StreamUsage.STREAM_USAGE_MUSIC, // 音频流使用类型：音乐。根据业务场景配置，参考StreamUsage。
13. rendererFlags: 0 // 音频渲染器标志。
14. };
15. let audioRendererOptions: audio.AudioRendererOptions = {
16. streamInfo: audioStreamInfo,
17. rendererInfo: audioRendererInfo
18. };

20. // 创建AudioRenderer实例。
21. audio.createAudioRenderer(audioRendererOptions).then((data) => {
22. audioRenderer = data;
23. console.info('AudioFrameworkRenderLog: AudioRenderer Created : Success : Stream Type: SUCCESS');
24. }).catch((err: BusinessError) => {
25. console.error(`AudioFrameworkRenderLog: AudioRenderer Created : ERROR : ${err}`);
26. });

28. if (audioRenderer) {
29. // 订阅监听音频流输出设备变化及原因。
30. (audioRenderer as audio.AudioRenderer).on('outputDeviceChangeWithInfo', async (deviceChangeInfo: audio.AudioStreamDeviceChangeInfo) => {
31. switch (deviceChangeInfo.changeReason) {
32. case audio.AudioStreamDeviceChangeReason.REASON_OLD_DEVICE_UNAVAILABLE:
33. // 响应设备不可用事件，如果应用处于播放状态，应暂停播放，更新UX界面。
34. // await audioRenderer.pause();
35. break;
36. case audio.AudioStreamDeviceChangeReason.REASON_NEW_DEVICE_AVAILABLE:
37. // 应用根据业务情况响应设备可用事件。
38. break;
39. case audio.AudioStreamDeviceChangeReason.REASON_OVERRODE:
40. // 应用根据业务情况响应设备强选事件。
41. break;
42. case audio.AudioStreamDeviceChangeReason.REASON_UNKNOWN:
43. // 应用根据业务情况响应未知原因事件。
44. break;
45. }
46. });
47. }
```

### AudioSessionManager示例

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let audioRenderer: audio.AudioRenderer | undefined = undefined;
5. let audioStreamInfo: audio.AudioStreamInfo = {
6. samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_48000, // 采样率。
7. channels: audio.AudioChannel.CHANNEL_2, // 通道。
8. sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE, // 采样格式。
9. encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW // 编码格式。
10. };
11. let audioRendererInfo: audio.AudioRendererInfo = {
12. usage: audio.StreamUsage.STREAM_USAGE_MUSIC, // 音频流使用类型：音乐。根据业务场景配置，参考StreamUsage。
13. rendererFlags: 0 // 音频渲染器标志。
14. };
15. let audioRendererOptions: audio.AudioRendererOptions = {
16. streamInfo: audioStreamInfo,
17. rendererInfo: audioRendererInfo
18. };

20. // 创建AudioRenderer实例。
21. audio.createAudioRenderer(audioRendererOptions).then((data) => {
22. audioRenderer = data;
23. console.info('AudioFrameworkRenderLog: AudioRenderer Created : Success : Stream Type: SUCCESS');
24. }).catch((err: BusinessError) => {
25. console.error(`AudioFrameworkRenderLog: AudioRenderer Created : ERROR : ${err}`);
26. });

28. if (audioRenderer) {
29. try {
30. let sessionManager = audio.getAudioManager().getSessionManager();
31. sessionManager.activateAudioSession({ concurrencyMode: audio.AudioConcurrencyMode.CONCURRENCY_MIX_WITH_OTHERS });
32. // 订阅监听音频流输出设备变化及原因。
33. sessionManager.on('currentOutputDeviceChanged', async (deviceChangeInfo: audio.CurrentOutputDeviceChangedEvent) => {
34. switch (deviceChangeInfo.changeReason) {
35. case audio.AudioStreamDeviceChangeReason.REASON_OLD_DEVICE_UNAVAILABLE:
36. // 响应设备不可用事件，如果应用处于播放状态，应暂停播放，更新UX界面。
37. // await audioRenderer.pause();
38. console.info('REASON_OLD_DEVICE_UNAVAILABLE, pause audio is recommended');
39. break;
40. case audio.AudioStreamDeviceChangeReason.REASON_NEW_DEVICE_AVAILABLE:
41. // 应用根据业务情况响应设备可用事件。
42. break;
43. case audio.AudioStreamDeviceChangeReason.REASON_OVERRODE:
44. // 应用根据业务情况响应设备强选事件。
45. break;
46. case audio.AudioStreamDeviceChangeReason.REASON_UNKNOWN:
47. // 应用根据业务情况响应未知原因事件。
48. break;
49. }
50. });
51. } catch (err) {
52. console.error(`on sessionManager#currentOutputDeviceChanged fail: ${err}`);
53. }
54. }
```