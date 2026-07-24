从API version 21开始，支持音频输入设备路由切换。

当应用进行音频输入时，系统会根据音频流类型选择对应的输入设备（SOURCE\_TYPE\_MIC：内置MIC录音；SOURCE\_TYPE\_VOICE\_COMMUNICATION：跟随当前输出设备）。若默认输入设备不满足应用需求，应用可通过[setBluetoothAndNearlinkPreferredRecordCategory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#setbluetoothandnearlinkpreferredrecordcategory21)或[selectMediaInputDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#selectmediainputdevice21)实现音频输入设备路由切换。

## 选择使用蓝牙或者星闪设备进行录音

应用可使用AudioSessionManager的[setBluetoothAndNearlinkPreferredRecordCategory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#setbluetoothandnearlinkpreferredrecordcategory21)设置应用程序的输入设备选择偏好，当蓝牙或星闪设备上线时生效。

说明

通话场景下，如果蓝牙或星闪设备在线，系统默认使用蓝牙或星闪设备作为输入设备。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';  // 导入audio模块。
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let audioManager = audio.getAudioManager();  // 需要先创建AudioManager实例。

6. let audioSessionManager = audioManager.getSessionManager();  // 再调用AudioManager的方法创建AudioSessionManager实例。

8. audioSessionManager.setBluetoothAndNearlinkPreferredRecordCategory(audio.BluetoothAndNearlinkPreferredRecordCategory.PREFERRED_LOW_LATENCY).then(() => {
9. console.info('Succeeded in setting bluetooth and nearlink preferred record category.');
10. }).catch((err: BusinessError) => {
11. console.error(`Failed to set bluetooth and nearlink preferred record category. Code: ${err.code}, message: ${err.message}`);
12. });
```

## 选择任意设备进行录音

应用可使用AudioSessionManager的[selectMediaInputDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiosessionmanager#selectmediainputdevice21)选择输入设备。

说明

通话场景下，输入设备跟随当前输出设备，此时其他与通话并发的录音流也会跟随通话输入设备。

收起

自动换行

深色代码主题

复制

```
1. import { audio } from '@kit.AudioKit';  // 导入audio模块。
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let audioManager = audio.getAudioManager();  // 需要先创建AudioManager实例。

6. let audioSessionManager = audioManager.getSessionManager();  // 再调用AudioManager的方法创建AudioSessionManager实例。

8. // 监听音频可选输入设备连接状态变化事件，当有输入设备上下线时会收到回调通知。
9. let availableDeviceChangeCallback = (deviceChanged: audio.DeviceChangeAction) => {
10. // 回调返回更新后的可用输入设备列表，应用也可在此处执行选择输入设备操作。
11. let data: audio.AudioDeviceDescriptors = deviceChanged.deviceDescriptors;
12. console.info(`Succeeded in using on or off function, AudioDeviceDescriptors: ${data}.`);
13. };
14. audioSessionManager.on('availableDeviceChange', audio.DeviceUsage.MEDIA_INPUT_DEVICES, availableDeviceChangeCallback);

16. // 监听当前输入设备变化事件，当选择输入设备成功后会触发该回调。
17. let currentInputDeviceChangedCallback = (currentInputDeviceChangedEvent: audio.CurrentInputDeviceChangedEvent) => {
18. console.info(`Succeeded in using on or off function, CurrentInputDeviceChangedEvent: ${currentInputDeviceChangedEvent}.`);
19. };
20. audioSessionManager.on('currentInputDeviceChanged', currentInputDeviceChangedCallback);

22. try {
23. // 获取当前可选的音频输入设备列表。
24. let data: audio.AudioDeviceDescriptors = audioSessionManager.getAvailableDevices(audio.DeviceUsage.MEDIA_INPUT_DEVICES);
25. console.info(`Succeeded in getting available devices, AudioDeviceDescriptors: ${data}.`);

27. // 当前可选音频输入设备列表不为空时，可进行选择。
28. if (data[0]) {
29. // 选择输入设备。
30. await audioSessionManager.selectMediaInputDevice(data[0]).then(() => {
31. console.info('Succeeded in selecting media input device.');
32. }).catch((err: BusinessError) => {
33. console.error(`Failed to select media input device. Code: ${err.code}, message: ${err.message}`);
34. });
35. }
36. } catch (err) {
37. let error = err as BusinessError;
38. console.error(`Failed to get available devices. Code: ${error.code}, message: ${error.message}`);
39. }

41. // 可通过该接口查询选择输入设备是否成功。
42. try {
43. let device: audio.AudioDeviceDescriptor = audioSessionManager.getSelectedMediaInputDevice();
44. console.info('Succeeded in getting select media input device.');
45. } catch (err) {
46. let error = err as BusinessError;
47. console.error(`Failed to get selected media input device. Code: ${error.code}, message: ${error.message}`);
48. }

50. // 取消监听音频可选输入设备连接状态变化事件。
51. audioSessionManager.off('availableDeviceChange', availableDeviceChangeCallback);

53. // 取消监听当前输入设备变化事件。
54. audioSessionManager.off('currentInputDeviceChanged', currentInputDeviceChangedCallback);

56. // 清空通过selectMediaInputDevice选择的输入设备。
57. audioSessionManager.clearSelectedMediaInputDevice().then(() => {
58. console.info('Succeeded in clearing selected media input device.');
59. }).catch((err: BusinessError) => {
60. console.error(`Failed to clear selected media input device. Code: ${err.code}, message: ${err.message}`);
61. });
```