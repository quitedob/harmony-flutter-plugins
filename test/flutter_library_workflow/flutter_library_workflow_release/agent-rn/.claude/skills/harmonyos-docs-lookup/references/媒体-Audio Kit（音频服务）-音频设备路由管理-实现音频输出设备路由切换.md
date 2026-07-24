当应用进行音频输出时，系统会根据音频流类型选择对应的输出设备（[STREAM\_USAGE\_MUSIC](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#streamusage)：扬声器发声；[STREAM\_USAGE\_VOICE\_COMMUNICATION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#streamusage)：听筒发声）。如果系统提供的默认输出设备不满足应用需求，应用可通过AVCastPicker或setDefaultOutputDevice实现音频输出设备路由切换。

## 媒体类应用实现输出设备路由切换

应用可使用[AVCastPicker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-multimedia-avcastpicker#avcastpicker)投播组件进行媒体类应用输出设备路由切换。

## 通话类应用实现输出设备路由切换

### 外接设备路由切换

应用可[使用通话设备切换组件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/using-switch-call-devices)进行通话类应用外接输出设备路由切换。

### 内置听筒和扬声器路由切换

如果未连接外设，语音通话场景系统默认听筒发声，其他场景系统默认扬声器发声；如果连接了外设，系统默认通过外接设备发声。

调用setDefaultOutputDevice设置音频输出设备后，如需取消，可将参数设为audio.DeviceType.DEFAULT，将音频输出设备选择权交还给系统。

1. 从API version 12开始，应用可使用AudioRenderer的[setDefaultOutputDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#setdefaultoutputdevice12)设置听筒和扬声器路由切换，调用前需要先获取[AudioRenderer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-f#audiocreateaudiorenderer8)实例。

   说明

   * 由于AudioRenderer是流级别，调用本接口设置的默认音频输出设备仅对当前流生效。
   * 本接口优先级低于AudioSessionManager的[setDefaultOutputDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#setdefaultoutputdevice20)。如果使用AudioSessionManager的[setDefaultOutputDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#setdefaultoutputdevice20)设置了默认音频输出设备，本接口的设置将不会生效。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { audio } from '@kit.AudioKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';

   4. // 设置默认输出设备为本机扬声器。
   5. audioRenderer.setDefaultOutputDevice(audio.DeviceType.SPEAKER).then(() => {
   6. console.info('Succeeded in setting default output device.');
   7. }).catch((err: BusinessError) => {
   8. console.error(`Failed to set default output device. Code: ${err.code}, message: ${err.message}`);
   9. });

   11. // 设置默认输出设备为系统默认输出设备，即取消应用设置的默认设备，交由系统选择设备。
   12. audioRenderer.setDefaultOutputDevice(audio.DeviceType.DEFAULT).then(() => {
   13. console.info('Succeeded in setting default output device.');
   14. }).catch((err: BusinessError) => {
   15. console.error(`Failed to set default output device. Code: ${err.code}, message: ${err.message}`);
   16. });
   ```
2. 从API version 20开始，应用可使用AudioSessionManager的[setDefaultOutputDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#setdefaultoutputdevice20)设置听筒和扬声器路由切换。

   说明

   由于AudioSessionManager是应用级设置，调用本接口设置默认音频输出设备，会对当前应用所有适用范围内的音频流生效，且会覆盖AudioRenderer的[setDefaultOutputDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer#setdefaultoutputdevice12)接口设置的默认音频输出设备信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { audio } from '@kit.AudioKit';  // 导入audio模块。
   2. import { BusinessError } from '@kit.BasicServicesKit';

   4. let audioManager = audio.getAudioManager();  // 需要先创建AudioManager实例。

   6. let audioSessionManager = audioManager.getSessionManager();  // 再调用AudioManager的方法创建AudioSessionManager实例。

   8. // 设置音频并发模式。
   9. let strategy: audio.AudioSessionStrategy = {
   10. concurrencyMode: audio.AudioConcurrencyMode.CONCURRENCY_MIX_WITH_OTHERS
   11. };

   13. // 激活音频会话。
   14. audioSessionManager.activateAudioSession(strategy).then(() => {
   15. console.info('Succeeded in activating audio session.');
   16. }).catch((err: BusinessError) => {
   17. console.error(`Failed to activate audio session. Code: ${err.code}, message: ${err.message}`);
   18. });

   20. // 设置默认输出设备为听筒。
   21. audioSessionManager.setDefaultOutputDevice(audio.DeviceType.EARPIECE).then(() => {
   22. console.info('Succeeded in setting default output device.');
   23. }).catch((err: BusinessError) => {
   24. console.error(`Failed to set default output device. Code: ${err.code}, message: ${err.message}`);
   25. });

   27. // 设置默认输出设备为系统默认输出设备，即取消应用设置的默认设备，交由系统选择设备。
   28. audioSessionManager.setDefaultOutputDevice(audio.DeviceType.DEFAULT).then(() => {
   29. console.info('Succeeded in setting default output device.');
   30. }).catch((err: BusinessError) => {
   31. console.error(`Failed to set default output device. Code: ${err.code}, message: ${err.message}`);
   32. });
   ```