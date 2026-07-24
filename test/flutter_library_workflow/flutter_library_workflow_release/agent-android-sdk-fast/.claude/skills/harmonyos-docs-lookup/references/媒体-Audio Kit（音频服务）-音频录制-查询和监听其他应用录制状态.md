对于录制音频类的应用，开发者需要关注该应用的音频流的状态以做出相应的操作，比如监听到状态为结束时，及时提示用户录制已结束。

## 读取或监听应用内音频流状态变化

参考[使用AudioCapturer开发音频录制功能(ArkTs)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/using-audiocapturer-for-recording)或[audio.createAudioCapturer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-f#audiocreateaudiocapturer8)，先完成AudioCapturer的创建，再通过以下两种方法查看音频流状态的变化。

* 方法1：直接查看AudioCapturer的[属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiocapturer#属性)state：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. let audioCapturerState: audio.AudioState = audioCapturer.state;
  2. console.info(`Current state is: ${audioCapturerState }`)
  ```
* 方法2：注册stateChange监听AudioCapturer的状态变化：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. audioCapturer.on('stateChange', (capturerState: audio.AudioState) => {
  2. console.info(`State change to: ${capturerState}`)
  3. });
  ```

获取state后可对照[AudioState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-e#audiostate8)来进行相应的操作，比如显示录制结束的提示等。

## 读取或监听所有录制流的变化

如果部分应用需要查询获取所有音频流的变化信息，可以通过AudioStreamManager读取或监听所有音频流的变化。

如下为音频流管理调用关系图：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/da/v3/z8pEJTngRg63S69BhXhbUQ/zh-cn_image_0000002571172019.png?HW-CC-KV=V1&HW-CC-Date=20260414T051749Z&HW-CC-Expire=86400&HW-CC-Sign=E1CA4CC29DE90F82957927CB6C565422B0B0737F37CD03EB94B73516B4D20D24)

在进行应用开发的过程中，开发者需要先调用[getStreamManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiomanager#getstreammanager9)创建AudioStreamManager实例，进而通过该实例管理音频流。

详细API含义可参考[AudioStreamManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiostreammanager)。

## 开发步骤及注意事项

1. 创建AudioStreamManager实例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { audio } from '@kit.AudioKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';

   4. let audioManager = audio.getAudioManager();
   5. let audioStreamManager = audioManager.getStreamManager();
   ```
2. 使用[on('audioCapturerChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiostreammanager#onaudiocapturerchange9)监听音频录制流更改事件。 如果音频流监听应用需要在音频录制流状态变化、设备变化时获取通知，可以订阅该事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. audioStreamManager.on('audioCapturerChange', (AudioCapturerChangeInfoArray: audio.AudioCapturerChangeInfoArray) =>  {
   2. for (let i = 0; i < AudioCapturerChangeInfoArray.length; i++) {
   3. console.info(`## CapChange on is called for element ${i} ##`);
   4. console.info(`StreamId for ${i} is: ${AudioCapturerChangeInfoArray[i].streamId}`);
   5. console.info(`Source for ${i} is: ${AudioCapturerChangeInfoArray[i].capturerInfo.source}`);
   6. console.info(`Flag  ${i} is: ${AudioCapturerChangeInfoArray[i].capturerInfo.capturerFlags}`);
   7. let devDescriptor: audio.AudioDeviceDescriptors = AudioCapturerChangeInfoArray[i].deviceDescriptors;
   8. for (let j = 0; j < AudioCapturerChangeInfoArray[i].deviceDescriptors.length; j++) {
   9. console.info(`Id: ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].id}`);
   10. console.info(`Type: ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].deviceType}`);
   11. console.info(`Role: ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].deviceRole}`);
   12. console.info(`Name: ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].name}`);
   13. console.info(`Address: ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].address}`);
   14. console.info(`SampleRates: ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].sampleRates[0]}`);
   15. console.info(`ChannelCounts ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].channelCounts[0]}`);
   16. console.info(`ChannelMask: ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].channelMasks}`);
   17. }
   18. }
   19. });
   ```
3. （可选）使用[off('audioCapturerChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiostreammanager#offaudiocapturerchange9)取消监听音频录制流变化。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. audioStreamManager.off('audioCapturerChange');
   2. console.info('CapturerChange Off is called');
   ```
4. （可选）使用[getCurrentAudioCapturerInfoArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiostreammanager#getcurrentaudiocapturerinfoarray9)获取当前音频录制流的信息。该接口可获取音频录制流唯一ID、音频采集器信息以及音频录制设备信息。

   说明

   对所有音频流状态进行监听的应用需要[声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)ohos.permission.USE\_BLUETOOTH，否则无法获得实际的设备名称和设备地址信息，查询到的设备名称和设备地址（蓝牙设备的相关属性）将为空字符串。

   从API version 20开始，通常在音频录制启动前调用[isRecordingAvailable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-audio-audiostreammanager#isrecordingavailable20)，判断当前传入的音频采集器信息中音源类型的录制是否可以启动成功。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. async function getCurrentAudioCapturerInfoArray(){
   2. await audioStreamManager.getCurrentAudioCapturerInfoArray().then((AudioCapturerChangeInfoArray: audio.AudioCapturerChangeInfoArray) => {
   3. console.info('getCurrentAudioCapturerInfoArray  Get Promise Called ');
   4. if (AudioCapturerChangeInfoArray != null) {
   5. for (let i = 0; i < AudioCapturerChangeInfoArray.length; i++) {
   6. console.info(`StreamId for ${i} is: ${AudioCapturerChangeInfoArray[i].streamId}`);
   7. console.info(`Source for ${i} is: ${AudioCapturerChangeInfoArray[i].capturerInfo.source}`);
   8. console.info(`Flag  ${i} is: ${AudioCapturerChangeInfoArray[i].capturerInfo.capturerFlags}`);
   9. for (let j = 0; j < AudioCapturerChangeInfoArray[i].deviceDescriptors.length; j++) {
   10. console.info(`Id: ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].id}`);
   11. console.info(`Type: ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].deviceType}`);
   12. console.info(`Role: ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].deviceRole}`);
   13. console.info(`Name: ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].name}`);
   14. console.info(`Address: ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].address}`);
   15. console.info(`SampleRates: ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].sampleRates[0]}`);
   16. console.info(`ChannelCounts ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].channelCounts[0]}`);
   17. console.info(`ChannelMask: ${i} : ${AudioCapturerChangeInfoArray[i].deviceDescriptors[j].channelMasks}`);
   18. }
   19. }
   20. }
   21. }).catch((err: BusinessError) => {
   22. console.error(`Invoke getCurrentAudioCapturerInfoArray failed, code is ${err.code}, message is ${err.message}`);
   23. });
   24. }
   ```