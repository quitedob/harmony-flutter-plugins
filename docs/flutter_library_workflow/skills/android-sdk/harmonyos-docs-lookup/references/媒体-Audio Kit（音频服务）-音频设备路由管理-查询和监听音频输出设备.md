应用可通过以下两种方式管理全局音频输出设备：

* 通常情况下，可以[通过AudioRoutingManager查询和监听音频输出设备](/consumer/cn/doc/harmonyos-guides/audio-output-device-management#通过audioroutingmanager查询和监听音频输出设备)。
* 从API version 20开始，AudioSessionManager提供了部分输出设备管理的接口，支持[通过AudioSession查询和监听音频输出设备](/consumer/cn/doc/harmonyos-guides/audio-output-device-management#通过audiosession查询和监听音频输出设备)，方便在使用AudioSession管理音频焦点的同时管理音频输出。

## 通过AudioRoutingManager查询和监听音频输出设备

本模块提供音频输出设备管理能力，包括查询设备信息和监听连接状态变化。具体API说明请参考文档[AudioRoutingManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audioroutingmanager)。

### 创建AudioRoutingManager实例

在使用AudioRoutingManager管理音频设备前，需要先导入模块并创建实例。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';  // 导入audio模块。

3. let audioManager = audio.getAudioManager();  // 需要先创建AudioManager实例。

5. let audioRoutingManager = audioManager.getRoutingManager();  // 再调用AudioManager的方法创建AudioRoutingManager实例。
```

### 支持的音频输出设备类型

目前支持的输出设备如下表所示：

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| EARPIECE | 1 | 听筒。 |
| SPEAKER | 2 | 扬声器。 |
| WIRED\_HEADSET | 3 | 有线耳机，带麦克风。 |
| WIRED\_HEADPHONES | 4 | 有线耳机，无麦克风。 |
| BLUETOOTH\_SCO | 7 | 蓝牙设备SCO（Synchronous Connection Oriented）连接。 |
| BLUETOOTH\_A2DP | 8 | 蓝牙设备A2DP（Advanced Audio Distribution Profile）连接。 |
| USB\_HEADSET | 22 | USB耳机，带麦克风。 |
| NEARLINK | 31 | 星闪设备。 |

### 获取输出设备信息

使用[getDevices](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audioroutingmanager#getdevices9)方法可以获取当前所有输出设备的信息。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';

3. audioRoutingManager.getDevices(audio.DeviceFlag.OUTPUT_DEVICES_FLAG).then((data: audio.AudioDeviceDescriptors) => {
4. console.info('Promise returned to indicate that the device list is obtained.');
5. });
```

### 监听设备连接状态变化

设置监听事件以监控设备连接状态的变化，设备连接或断开时触发回调。

说明

监听设备连接状态变化可以监听到全部的设备连接状态变化，不建议作为应用处理自动暂停的依据。应用如需处理自动暂停相关业务，可参考[音频流输出设备变更原因](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/audio-output-device-change#音频流输出设备变更原因)。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';

3. // 监听音频设备状态变化。
4. audioRoutingManager.on('deviceChange', audio.DeviceFlag.OUTPUT_DEVICES_FLAG, (deviceChanged: audio.DeviceChangeAction) => {
5. console.info(`device change type : ${deviceChanged.type}`);  // 设备连接状态变化，0为连接，1为断开连接。
6. console.info(`device descriptor size : ${deviceChanged.deviceDescriptors.length}`);
7. console.info(`device change descriptor : ${deviceChanged.deviceDescriptors[0].deviceRole}`);  // 设备角色。
8. console.info(`device change descriptor : ${deviceChanged.deviceDescriptors[0].deviceType}`);  // 设备类型。
9. });

11. // 取消监听音频设备状态变化。
12. audioRoutingManager.off('deviceChange');
```

### 获取最高优先级输出设备信息

使用[getPreferOutputDeviceForRendererInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audioroutingmanager#getpreferoutputdeviceforrendererinfo10)方法, 可以获取当前最高优先级的输出设备。

说明

最高优先级输出设备表示声音将在此设备输出的设备。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let rendererInfo: audio.AudioRendererInfo = {
5. usage: audio.StreamUsage.STREAM_USAGE_MUSIC,// 音频流使用类型：音乐。根据业务场景配置，参考StreamUsage。
6. rendererFlags: 0 // 音频渲染器标志。
7. };

9. async function getPreferOutputDeviceForRendererInfo() {
10. audioRoutingManager.getPreferOutputDeviceForRendererInfo(rendererInfo).then((desc: audio.AudioDeviceDescriptors) => {
11. console.info(`device descriptor: ${desc}`);
12. }).catch((err: BusinessError) => {
13. console.error(`Result ERROR: ${err}`);
14. })
15. }
```

### 监听最高优先级输出设备变化

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';

3. let rendererInfo: audio.AudioRendererInfo = {
4. usage: audio.StreamUsage.STREAM_USAGE_MUSIC, // 音频流使用类型：音乐。根据业务场景配置，参考StreamUsage。
5. rendererFlags: 0 // 音频渲染器标志。
6. };

8. // 监听最高优先级输出设备变化。
9. audioRoutingManager.on('preferOutputDeviceChangeForRendererInfo', rendererInfo, (desc: audio.AudioDeviceDescriptors) => {
10. console.info(`device change descriptor : ${desc[0].deviceRole}`);  // 设备角色。
11. console.info(`device change descriptor : ${desc[0].deviceType}`);  // 设备类型。
12. });

14. // 取消监听最高优先级输出设备变化。
15. audioRoutingManager.off('preferOutputDeviceChangeForRendererInfo');
```

## 通过AudioSession查询和监听音频输出设备

应用使用播放器的SDK播放音频流，不持有[AudioRenderer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiorenderer)对象，因此无法灵活控制播放设备的选择和状态监听。从API version 20开始，AudioSession不仅增加了焦点管理功能，还提供了音频输出设备管理功能，包括设置默认输出设备和监听设备变化。请参考以下文档获取更多信息：

* ArkTS API：[AudioSessionManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager)
* C API：[native\_audio\_session\_manager.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-session-manager-h)

### 创建AudioSession实例

在使用AudioSessionManager管理音频设备前，需要先导入模块并创建实例。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';  // 导入audio模块。

3. let audioManager = audio.getAudioManager();  // 需要先创建AudioManager实例。

5. let audioSessionManager = audioManager.getSessionManager();  // 再调用AudioManager的方法创建AudioSessionManager实例。
```

### 设置本机默认音频输出设备

[setDefaultOutputDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#setdefaultoutputdevice20)可以用于设置本机默认输出设备。

说明

* 由于AudioSession是应用级设置，调用本接口设置默认音频输出设备会覆盖AudioRenderer的setDefaultOutputDevice接口设置的音频输出设备信息。
* 调用setDefaultOutputDevice设置音频输出设备后，如需取消，可将参数设为audio.DeviceType.DEFAULT，将音频设备选择权交还给系统。否则，每次调用activateAudioSession时，应用选择的默认输出设备将生效。

收起

自动换行

深色代码主题

复制

```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. // 设置默认输出设备为本机扬声器。
4. audioSessionManager.setDefaultOutputDevice(audio.DeviceType.SPEAKER).then(() => {
5. console.info('setDefaultOutputDevice Success!');
6. }).catch((err: BusinessError) => {
7. console.error(`setDefaultOutputDevice Fail: ${err}`);
8. });

10. // 设置默认输出设备为默认设备，即取消应用设置的默认设备，交由系统选择设备。
11. audioSessionManager.setDefaultOutputDevice(audio.DeviceType.DEFAULT).then(() => {
12. console.info('setDefaultOutputDevice Success!');
13. }).catch((err: BusinessError) => {
14. console.error(`setDefaultOutputDevice Fail: ${err}`);
15. });
```

### 查询本机默认音频输出设备

应用可以通过[getDefaultOutputDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#getdefaultoutputdevice20)查询本机默认输出设备类型。

说明

本接口用于查询通过[setDefaultOutputDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#setdefaultoutputdevice20)接口设置的输出设备。

收起

自动换行

深色代码主题

复制

```
1. let deviceType = audioSessionManager.getDefaultOutputDevice();
2. console.info('getDefaultOutputDevice Success, deviceType: ${deviceType}');
```

### 监听输出设备变化

应用可以通过注册[CurrentOutputDeviceChangedEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-i#currentoutputdevicechangedevent20)监听输出设备的连接状态变化。

说明

currentOutputDeviceChangedCallback包含设备变更的原因及推荐的后续操作。应用应根据不同的变更原因进行处理，并按系统推荐的操作继续或停止当前播放。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';

3. // 同一监听事件中，on方法和off方法传入callback参数一致，off方法取消对应on方法订阅的监听。
4. let currentOutputDeviceChangedCallback = (currentOutputDeviceChangedEvent: audio.CurrentOutputDeviceChangedEvent) => {
5. console.info(`reason of audioSessionStateChanged: ${currentOutputDeviceChangedEvent.changeReason} `);

7. switch (currentOutputDeviceChangedEvent.changeReason) {
8. case audio.AudioStreamDeviceChangeReason.REASON_OLD_DEVICE_UNAVAILABLE:
9. // 响应设备不可用事件，如果应用处于播放状态，应暂停播放，更新UX界面。
10. break;
11. case audio.AudioStreamDeviceChangeReason.REASON_NEW_DEVICE_AVAILABLE:
12. // 应用根据业务情况响应设备可用事件。
13. break;
14. case audio.AudioStreamDeviceChangeReason.REASON_OVERRODE:
15. // 应用根据业务情况响应设备强选事件。
16. break;
17. case audio.AudioStreamDeviceChangeReason.REASON_SESSION_ACTIVATED:
18. // 应用根据业务情况响应audio session激活时的输出设备信息。
19. break;
20. case audio.AudioStreamDeviceChangeReason.REASON_STREAM_PRIORITY_CHANGED:
21. // 应用根据业务情况响应其它更高优先级的音频流触发的设备变更事件。
22. break;
23. case audio.AudioStreamDeviceChangeReason.REASON_UNKNOWN:
24. // 应用根据业务情况响应未知原因事件。
25. break;
26. }
27. };

29. audioSessionManager.on('currentOutputDeviceChanged', currentOutputDeviceChangedCallback);

31. audioSessionManager.off('currentOutputDeviceChanged', currentOutputDeviceChangedCallback);

33. // 取消该事件的所有监听。
34. audioSessionManager.off('currentOutputDeviceChanged');
```