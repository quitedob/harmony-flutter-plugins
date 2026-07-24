AudioHaptic提供音频与振动协同播放及管理的方法，适用于需要在播放音频时同步发起振动的场景，如来电铃声随振、键盘按键反馈、消息通知反馈等。

## 开发指导

使用AudioHaptic播放音频并同步开启振动，涉及到音频及振动资源的管理、音频时延模式及音频流使用类型的配置、音振播放器的创建及管理等。本开发指导将以一次音振协同播放的过程为例，向开发者讲解如何使用AudioHaptic进行音振协同播放，建议配合[audioHaptic](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-audiohaptic)的API说明阅读。

### 权限申请

如果应用创建的AudioHapticPlayer需要触发振动，则需要校验应用是否拥有该权限：ohos.permission.VIBRATE。

1. [声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)。
2. [向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。

### 开发步骤及注意事项

1. 获取音振管理器实例，并注册音频及振动资源，资源支持情况可以查看[AudioHapticManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-audiohaptic#audiohapticmanager)。

   说明

   * 开发者可通过如下两种方式注册资源：

     方式1：使用[registerSource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-audiohaptic#registersource)接口，通过文件URI来注册资源。

     方式2（推荐）：从API version 20开始，支持使用[registerSourceFromFd](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-audiohaptic#registersourcefromfd20)接口，通过文件描述符来注册资源，更便于开发者使用。
   * 单个应用最多支持同时注册128个资源，超过之后将会注册失败（返回注册的资源ID为负数）。推荐应用合理控制注册资源数量，对于不再需要使用的资源，建议及时取消注册。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { audio, audioHaptic } from '@kit.AudioKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   3. import { common } from '@kit.AbilityKit';

   5. let audioHapticManagerInstance: audioHaptic.AudioHapticManager = audioHaptic.getAudioHapticManager();

   7. // 单个应用最多支持同时注册128个资源，超过之后将会注册失败（返回注册的资源ID为负数）。
   8. // 推荐应用合理控制注册资源数量，对于不再需要使用的资源，建议及时取消注册。

   10. // 方法1：使用registerSource接口注册资源。
   11. let audioUri = 'data/audioTest.wav'; // 此处仅作示例，实际使用时需要将文件替换为应用目标音频资源的Uri。
   12. let hapticUri = 'data/hapticTest.json'; // 此处仅作示例，实际使用时需要将文件替换为应用目标振动资源的Uri。
   13. let idForUri = 0;

   15. audioHapticManagerInstance.registerSource(audioUri, hapticUri).then((value: number) => {
   16. console.info(`Promise returned to indicate that the source id of the registered source ${value}.`);
   17. idForUri = value;
   18. }).catch((err: BusinessError) => {
   19. console.error(`Failed to register source ${err}`);
   20. });

   22. // 方法2：使用registerSourceFromFd接口注册资源。
   23. let idForFd = 0;
   24. // 请在组件内获取context，确保this.getUIContext().getHostContext()返回结果为UIAbilityContext。
   25. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;

   27. let audioFile = context.resourceManager.getRawFdSync('audioTest.ogg'); // 此处仅作示例，实际使用时需要将文件替换为应用rawfile目录下的对应文件。
   28. let audioFd: audioHaptic.AudioHapticFileDescriptor = {
   29. fd: audioFile.fd,
   30. offset: audioFile.offset,
   31. length: audioFile.length,
   32. };

   34. let hapticFile = context.resourceManager.getRawFdSync('hapticTest.json'); // 此处仅作示例，实际使用时需要将文件替换为应用rawfile目录下的对应文件。
   35. let hapticFd: audioHaptic.AudioHapticFileDescriptor = {
   36. fd: hapticFile.fd,
   37. offset: hapticFile.offset,
   38. length: hapticFile.length,
   39. };

   41. audioHapticManagerInstance.registerSourceFromFd(audioFd, hapticFd).then((value: number) => {
   42. console.info('Succeeded in doing registerSourceFromFd.');
   43. idForFd = value;
   44. }).catch((err: BusinessError) => {
   45. console.error(`Failed to registerSourceFromFd. Code: ${err.code}, message: ${err.message}`);
   46. });
   ```
2. 设置音振播放器参数，各参数作用可以查看[AudioHapticManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-audiohaptic#audiohapticmanager)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let latencyMode: audioHaptic.AudioLatencyMode = audioHaptic.AudioLatencyMode.AUDIO_LATENCY_MODE_FAST;
   2. audioHapticManagerInstance.setAudioLatencyMode(idForFd, latencyMode);

   4. let usage: audio.StreamUsage = audio.StreamUsage.STREAM_USAGE_NOTIFICATION;
   5. audioHapticManagerInstance.setStreamUsage(idForFd, usage);
   ```
3. 调用[createPlayer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-audiohaptic#createplayer)方法，创建AudioHapticPlayer实例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let options: audioHaptic.AudioHapticPlayerOptions = {muteAudio: false, muteHaptics: false};
   2. let audioHapticPlayer: audioHaptic.AudioHapticPlayer | undefined = undefined;

   4. audioHapticManagerInstance.createPlayer(idForFd, options).then((value: audioHaptic.AudioHapticPlayer) => {
   5. console.info(`Create the audio haptic player successfully.`);
   6. audioHapticPlayer = value;
   7. }).catch((err: BusinessError) => {
   8. console.error(`Failed to create player ${err}`);
   9. });
   ```
4. 调用[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-audiohaptic#start)方法，开启音频播放并同步开启振动。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. audioHapticPlayer.start().then(() => {
   2. console.info(`Promise returned to indicate that start playing successfully.`);
   3. }).catch((err: BusinessError) => {
   4. console.error(`Failed to start playing. ${err}`);
   5. });
   ```
5. 调用[stop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-audiohaptic#stop)方法，停止音频播放并同步停止振动。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. audioHapticPlayer.stop().then(() => {
   2. console.info(`Promise returned to indicate that stop playing successfully.`);
   3. }).catch((err: BusinessError) => {
   4. console.error(`Failed to stop playing. ${err}`);
   5. });
   ```
6. 调用[release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-audiohaptic#release)方法，释放AudioHapticPlayer实例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. audioHapticPlayer.release().then(() => {
   2. console.info(`Promise returned to indicate that release the audio haptic player successfully.`);
   3. }).catch((err: BusinessError) => {
   4. console.error(`Failed to release the audio haptic player. ${err}`);
   5. });
   ```
7. 调用[unregisterSource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-audiohaptic#unregistersource)方法，将已注册的音频及振动资源移除注册。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 对于不再需要使用的资源，建议应用及时取消注册，避免出现资源泄漏或资源数量超上限等问题。
   2. audioHapticManagerInstance.unregisterSource(idForFd).then(() => {
   3. console.info(`Promise returned to indicate that unregister source successfully`);
   4. }).catch((err: BusinessError) => {
   5. console.error(`Failed to unregister source ${err}`);
   6. });
   ```