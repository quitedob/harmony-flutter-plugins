Video组件用于播放视频文件并控制其播放状态，常用于短视频和应用内部视频的列表页面。当视频完整出现时会自动播放，用户点击视频区域则会暂停播放，同时显示播放进度条，通过拖动播放进度条指定视频播放到具体位置。具体用法请参考[Video](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-media-components-video)。

## 创建视频组件

Video通过调用接口来创建，接口调用形式如下：

Video(value: VideoOptions)

## 加载视频资源

Video组件支持加载本地视频和网络视频。具体的数据源配置请参考[VideoOptions对象说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-media-components-video#videooptions对象说明)。

### 加载本地视频

* 普通本地视频。

  加载本地视频时，需在工程资源的rawfile目录中放置视频文件，如下图所示。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bf/v3/ep7XI4ILQfmvZVUxu0ycnQ/zh-cn_image_0000002571291451.png?HW-CC-KV=V1&HW-CC-Date=20260414T035000Z&HW-CC-Expire=86400&HW-CC-Sign=F6061AF1A9DE09ABADE817BA1A5552E7124EA0B6FB55C9FCF6D9769C4A342954)

  再使用资源访问符$rawfile()引用视频资源。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // xxx.ets
  2. // ...
  3. @Component
  4. export struct LocalVideo {
  5. private controller: VideoController = new VideoController();
  6. // $r('app.media.preview')需要替换为开发者所需的图像资源文件
  7. private previewUris: Resource = $r('app.media.preview');
  8. // $rawfile('videoTest.mp4')需要替换为开发者所需的影像资源文件
  9. private innerResource: Resource = $rawfile('videoTest.mp4');

  11. build() {
  12. Column() {
  13. Video({
  14. src: this.innerResource,  // 设置视频源
  15. previewUri: this.previewUris, // 设置预览图
  16. controller: this.controller // 设置视频控制器，可以控制视频的播放状态
  17. })
  18. }
  19. }
  20. }
  ```

  [LocalVideo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/VideoPlayer/entry/src/main/ets/pages/LocalVideo.ets#L16-L37)
* [Data Ability](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/dataability-overview)提供的视频路径带有dataability://前缀，使用时确保对应视频资源存在。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // xxx.ets
  2. // ···
  3. @Component
  4. export struct LocalVideoTwo {
  5. private controller: VideoController = new VideoController();
  6. private previewUris: Resource = $r('app.media.preview');
  7. private videoSrc: string = 'dataability://device_id/com.domainname.dataability.videodata/video/10';

  9. build() {
  10. Column() {
  11. Video({
  12. src: this.videoSrc,
  13. previewUri: this.previewUris,
  14. controller: this.controller
  15. })
  16. }
  17. }
  18. }
  ```

  [DataAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/VideoPlayer/entry/src/main/ets/pages/DataAbility.ets#L16-L39)

### 加载沙箱路径视频

支持file://路径前缀的字符串，用于读取应用沙箱路径内的资源，需要确保应用沙箱目录路径下的文件存在并且有可读权限。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. // ···
3. @Component
4. export struct Sandbox {
5. private controller: VideoController = new VideoController();
6. private videoSrc: string = 'file:///data/storage/el2/base/haps/entry/files/show.mp4';

8. build() {
9. Column() {
10. Video({
11. src: this.videoSrc,
12. controller: this.controller
13. })
14. }
15. }
16. }
```

[Sandbox.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/VideoPlayer/entry/src/main/ets/pages/Sandbox.ets#L16-L36)

### 加载网络视频

加载网络视频时，需要申请ohos.permission.INTERNET权限，具体申请方式请参考[声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)。此时，Video的src属性为网络视频的链接。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. // ···
3. @Component
4. export struct OnlineVideo {
5. private controller: VideoController = new VideoController();
6. private previewUris: Resource = $r('app.media.preview');
7. private videoSrc: string = 'www.example.com/example.mp4'; // 使用时请替换为实际视频加载网址

9. build() {
10. Column() {
11. Video({
12. src: this.videoSrc,
13. previewUri: this.previewUris,
14. controller: this.controller
15. })
16. }
17. }
18. }
```

[OnlineVideo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/VideoPlayer/entry/src/main/ets/pages/OnlineVideo.ets#L16-L39)

## 添加属性

Video组件[属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-media-components-video#属性)主要用于设置视频的播放形式。例如设置视频播放是否静音、播放是否显示控制条等。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. // ···
3. @Component
4. export struct AttributeVideo {
5. private controller: VideoController = new VideoController();

7. build() {
8. Column() {
9. Video({
10. controller: this.controller
11. })
12. .muted(false) // 设置是否静音
13. .controls(false) // 设置是否显示默认控制条
14. .autoPlay(false) // 设置是否自动播放
15. .loop(false) // 设置是否循环播放
16. .objectFit(ImageFit.Contain) // 设置视频填充模式
17. }
18. }
19. }
```

[AttributeVideo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/VideoPlayer/entry/src/main/ets/pages/AttributeVideo.ets#L16-L41)

## 事件调用

Video组件回调事件主要包括播放开始、播放暂停、播放结束、播放失败、播放停止、视频准备和操作进度条等事件，除此之外，Video组件也支持通用事件的调用，如点击、触摸等事件的调用。详细事件请参考[事件说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-media-components-video#事件)。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. @Entry
3. @Component
4. struct EventCall {
5. private controller: VideoController = new VideoController();
6. private previewUris: Resource = $r('app.media.preview');
7. private innerResource: Resource = $rawfile('videoTest.mp4');

9. build() {
10. Column() {
11. Video({
12. src: this.innerResource,
13. previewUri: this.previewUris,
14. controller: this.controller
15. })
16. .onUpdate((event) => { // 更新事件回调
17. })
18. .onPrepared((event) => { // 准备事件回调
19. })
20. .onError(() => { // 失败事件回调
21. })
22. .onStop(() => { // 停止事件回调
23. })
24. }
25. }
26. }
```

[EventCall.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/VideoPlayer/entry/src/main/ets/pages/EventCall.ets#L16-L43)

## Video控制器使用

Video控制器主要用于控制视频的状态，包括播放、暂停、停止以及设置进度等，详细使用请参考[VideoController使用说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-media-components-video#videocontroller)。

* 默认控制器

  默认的控制器支持视频的开始、暂停、进度调整、全屏显示四项基本功能。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // xxx.ets
  2. @Entry
  3. @Component
  4. struct VideoGuide {
  5. @State videoSrc: Resource = $rawfile('videoTest.mp4');
  6. @State previewUri: string = 'common/videoIcon.png';
  7. @State curRate: PlaybackSpeed = PlaybackSpeed.Speed_Forward_1_00_X;

  9. build() {
  10. Row() {
  11. Column() {
  12. Video({
  13. src: this.videoSrc,
  14. previewUri: this.previewUri,
  15. currentProgressRate: this.curRate // 设置视频播放倍速
  16. })
  17. }
  18. .width('100%')
  19. }
  20. .height('100%')
  21. }
  22. }
  ```

  [VideoControl.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/VideoPlayer/entry/src/main/ets/pages/VideoControl.ets#L16-L39)
* 自定义控制器

  使用自定义的控制器，先关闭默认控制器，然后使用[Button](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-button)以及[Slider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-slider)等组件进行自定义的控制与显示，适合自定义较强的场景下使用。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // xxx.ets
  2. @Entry
  3. @Component
  4. struct CustomizedControl {
  5. @State videoSrc: Resource = $rawfile('videoTest.mp4');
  6. @State previewUri: string = 'common/videoIcon.png';
  7. @State curRate: PlaybackSpeed = PlaybackSpeed.Speed_Forward_1_00_X;
  8. // 初始化当前时间为0
  9. @State currentTime: number = 0;
  10. // 初始化持续时间为0
  11. @State durationTime: number = 0;
  12. controller: VideoController = new VideoController();

  14. build() {
  15. Row() {
  16. Column() {
  17. Video({
  18. src: this.videoSrc,
  19. previewUri: this.previewUri,
  20. currentProgressRate: this.curRate,
  21. controller: this.controller
  22. })
  23. .controls(false)
  24. .autoPlay(true)
  25. .onPrepared((event) => {
  26. if (event) {
  27. this.durationTime = event.duration
  28. }
  29. })
  30. .onUpdate((event) => {
  31. if (event) {
  32. this.currentTime = event.time
  33. }
  34. })
  35. Row() {
  36. Text(JSON.stringify(this.currentTime) + 's')
  37. Slider({
  38. value: this.currentTime,
  39. min: 0,
  40. max: this.durationTime
  41. })
  42. .onChange((value: number, mode: SliderChangeMode) => {
  43. this.controller.setCurrentTime(value); // 设置视频播放的进度跳转到value处
  44. })
  45. .width('90%')
  46. Text(JSON.stringify(this.durationTime) + 's')
  47. }
  48. .opacity(0.8)
  49. .width('100%')
  50. }
  51. .width('100%')
  52. }
  53. .height('40%')
  54. }
  55. }
  ```

  [CustomizedControl.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/VideoPlayer/entry/src/main/ets/pages/CustomizedControl.ets#L16-L72)

## 其他说明

Video组件已经封装好了视频播放的基础能力，开发者无需进行视频实例的创建，视频信息的设置获取，只需要设置数据源以及基础信息即可播放视频，相对扩展能力较弱。如果开发者想自定义视频播放，请参考[视频播放](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/video-playback)。

## 示例代码

* [媒体库视频](https://gitcode.com/harmonyos_samples/video-show)