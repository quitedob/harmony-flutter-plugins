OHAudio是系统在API version 10中引入的一套C API，此API在设计上实现归一，同时支持普通音频通路和低时延通路。仅支持PCM格式，适用于依赖Native层实现音频输入功能的场景。

OHAudio音频录制状态变化示意图：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/51/v3/9HsAjBGQQomqlLzWt3EF4g/zh-cn_image_0000002571291971.png?HW-CC-KV=V1&HW-CC-Date=20260414T051734Z&HW-CC-Expire=86400&HW-CC-Sign=0BBD90B0AA5D3652C28111D2D082045893CE3696AAA0E999BBF9443B3D30828B)

## 使用入门

开发者要使用OHAudio提供的录制能力，需要添加对应的头文件。

### 在 CMake 脚本中链接动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(sample PUBLIC libohaudio.so)
```

### 添加头文件

开发者通过引入<[native\_audiostreambuilder.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostreambuilder-h)>和<[native\_audiocapturer.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiocapturer-h)>头文件，使用音频录制相关API。

收起

自动换行

深色代码主题

复制

```
1. #include <ohaudio/native_audiocapturer.h>
2. #include <ohaudio/native_audiostreambuilder.h>
```

## 开发步骤

详细的API说明请参考[OHAudio](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio)。

### 音频流构造器

OHAudio提供OH\_AudioStreamBuilder接口，遵循构造器设计模式，用于构建音频流。开发者需要根据业务场景，指定对应的[OH\_AudioStream\_Type](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_type)。

OH\_AudioStream\_Type包含两种类型：

* AUDIOSTREAM\_TYPE\_RENDERER
* AUDIOSTREAM\_TYPE\_CAPTURER

使用[OH\_AudioStreamBuilder\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostreambuilder-h#oh_audiostreambuilder_create)创建构造器示例：

收起

自动换行

深色代码主题

复制

```
1. OH_AudioStreamBuilder* builder;
2. OH_AudioStreamBuilder_Create(&builder, streamType);
```

在音频业务结束之后，开发者应该执行[OH\_AudioStreamBuilder\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostreambuilder-h#oh_audiostreambuilder_destroy)接口来销毁构造器。

收起

自动换行

深色代码主题

复制

```
1. OH_AudioStreamBuilder_Destroy(builder);
```

开发者可以通过以下几个步骤来实现一个简单的录制功能。

### 实现音频录制

1. 创建构造器。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. OH_AudioStreamBuilder* builder;
   2. OH_AudioStreamBuilder_Create(&builder, AUDIOSTREAM_TYPE_CAPTURER);
   ```
2. 配置音频流参数。

   创建音频录制构造器后，可以设置音频流所需要的参数，可以参考下面的案例。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 设置音频采样率。
   2. OH_AudioStreamBuilder_SetSamplingRate(builder, 48000);
   3. // 设置音频声道。
   4. OH_AudioStreamBuilder_SetChannelCount(builder, 2);
   5. // 设置音频采样格式。
   6. OH_AudioStreamBuilder_SetSampleFormat(builder, AUDIOSTREAM_SAMPLE_S16LE);
   7. // 设置音频流的编码类型。
   8. OH_AudioStreamBuilder_SetEncodingType(builder, AUDIOSTREAM_ENCODING_TYPE_RAW);
   9. // 设置输入音频流的工作场景。
   10. OH_AudioStreamBuilder_SetCapturerInfo(builder, AUDIOSTREAM_SOURCE_TYPE_MIC);
   ```

   注意，音频录制的音频数据需要通过回调接口读入，开发者要实现回调接口，从API version 12开始支持使用[OH\_AudioStreamBuilder\_SetCapturerReadDataCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostreambuilder-h#oh_audiostreambuilder_setcapturerreaddatacallback)设置回调函数。回调函数的声明请查看[OH\_AudioCapturer\_OnReadDataCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiocapturer-h#oh_audiocapturer_onreaddatacallback)。
3. 设置音频回调函数。

   多音频并发处理可参考文档[处理音频焦点事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/audio-playback-concurrency)，仅接口语言差异。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 自定义读入数据函数。
   2. void MyOnReadData(
   3. OH_AudioCapturer* capturer,
   4. void* userData,
   5. void* audioData,
   6. int32_t audioDataSize)
   7. {
   8. // 从buffer中取出length长度的录音数据。
   9. }
   10. // 自定义音频中断事件函数。
   11. void MyOnInterruptEvent(
   12. OH_AudioCapturer* capturer,
   13. void* userData,
   14. OH_AudioInterrupt_ForceType type,
   15. OH_AudioInterrupt_Hint hint)
   16. {
   17. // 根据type和hint表示的音频中断信息，更新录制器状态和界面。
   18. }
   19. // 自定义异常回调函数。
   20. void MyOnError(
   21. OH_AudioCapturer* capturer,
   22. void* userData,
   23. OH_AudioStream_Result error)
   24. {
   25. // 根据error表示的音频异常信息，做出相应的处理。
   26. }

   28. // 配置音频中断事件回调函数。
   29. OH_AudioCapturer_OnInterruptCallback onInterruptCb = MyOnInterruptEvent;
   30. OH_AudioStreamBuilder_SetCapturerInterruptCallback(builder, onInterruptCb, nullptr);

   32. // 配置音频异常回调函数。
   33. OH_AudioCapturer_OnErrorCallback onErrorCb = MyOnError;
   34. OH_AudioStreamBuilder_SetCapturerErrorCallback(builder, onErrorCb, nullptr);

   36. // 配置音频输入流的回调。
   37. OH_AudioCapturer_OnReadDataCallback onReadDataCb = MyOnReadData;
   38. OH_AudioStreamBuilder_SetCapturerReadDataCallback(builder, onReadDataCb, nullptr);
   ```
4. 构造录制音频流。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. OH_AudioCapturer* audioCapturer;
   2. OH_AudioStreamBuilder_GenerateCapturer(builder, &audioCapturer);
   ```
5. 使用音频流。

   录制音频流中包含以下接口，用来实现对音频流的控制。

   展开

   | 接口 | 说明 |
   | --- | --- |
   | OH\_AudioStream\_Result OH\_AudioCapturer\_Start(OH\_AudioCapturer\* capturer) | 开始录制。 |
   | OH\_AudioStream\_Result OH\_AudioCapturer\_Pause(OH\_AudioCapturer\* capturer) | 暂停录制。 |
   | OH\_AudioStream\_Result OH\_AudioCapturer\_Stop(OH\_AudioCapturer\* capturer) | 停止录制。 |
   | OH\_AudioStream\_Result OH\_AudioCapturer\_Flush(OH\_AudioCapturer\* capturer) | 释放缓存数据。 |
   | OH\_AudioStream\_Result OH\_AudioCapturer\_Release(OH\_AudioCapturer\* capturer) | 释放录制实例。 |

   注意

   音频流控制接口执行会有耗时（例如OH\_AudioCapturer\_Stop接口单次执行普遍超过50ms），应避免在主线程中直接调用，以免造成界面显示卡顿。
6. 释放构造器。

   构造器不再使用时，需要释放相关资源。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. OH_AudioStreamBuilder_Destroy(builder);
   ```

### 设置低时延模式

当设备支持低时延通路时，开发者可以使用低时延模式创建音频录制构造器，获得更低时延的音频体验。

开发流程与普通录制（[实现音频录制](/consumer/cn/doc/harmonyos-guides/using-ohaudio-for-recording#实现音频录制)）场景一致，仅需要在步骤1创建音频录制构造器时，调用[OH\_AudioStreamBuilder\_SetLatencyMode()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostreambuilder-h#oh_audiostreambuilder_setlatencymode)设置低时延模式。

注意

* 当音频录制场景[OH\_AudioStream\_SourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_sourcetype)为AUDIOSTREAM\_SOURCE\_TYPE\_VOICE\_COMMUNICATION时，不支持主动设置低时延模式，系统会根据设备的能力，决策输入的音频通路。
* 部分场景（如通话来电）下系统能力受限会回落至普通音频通路模式，缓冲区大小也会发生变化，此时应同普通音频通路模式一样根据缓冲区大小将缓冲区中数据一次性全部取走，否则录制的数据会出现不连续，导致杂音。

收起

自动换行

深色代码主题

复制

```
1. OH_AudioStream_LatencyMode latencyMode = AUDIOSTREAM_LATENCY_MODE_FAST;
2. OH_AudioStreamBuilder_SetLatencyMode(builder, latencyMode);
```

### 设置静音打断模式

静音打断模式提供将打断策略从停止录音切换为静音录制的功能，可以实现录音全程不被系统基于焦点并发规则打断的效果，并且录音过程中也不影响其他应用启动录音。开发者在创建音频录制构造器时，调用[OH\_AudioStreamBuilder\_SetCapturerWillMuteWhenInterrupted](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostreambuilder-h#oh_audiostreambuilder_setcapturerwillmutewheninterrupted)接口设置是否开启静音打断模式。默认不开启，此时由音频焦点策略管理并发音频流的执行顺序。开启后，被其他应用打断导致停止或暂停录制时会进入静音录制状态，在此状态下录制的音频没有声音。

### 回声消除功能

回声消除功能可在支持的设备上有效消除录音过程中的回声干扰，提升音频采集质量。开发者可通过指定特定的音频输入源类型[OH\_AudioStream\_SourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_sourcetype)（AUDIOSTREAM\_SOURCE\_TYPE\_VOICE\_COMMUNICATION、AUDIOSTREAM\_SOURCE\_TYPE\_LIVE）来启用该功能，系统将会自动对采集的音频信号进行回声消除处理。

在启用前，建议先调用[OH\_AudioStreamManager\_IsAcousticEchoCancelerSupported](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-stream-manager-h#oh_audiostreammanager_isacousticechocancelersupported)接口（从API version 20开始支持）查询当前设备对音频输入源类型[OH\_AudioStream\_SourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostream-base-h#oh_audiostream_sourcetype)是否支持回声消除功能，以确保功能的可用性。若支持，则可在创建音频录制构造器时通过[OH\_AudioStreamBuilder\_SetCapturerInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audiostreambuilder-h#oh_audiostreambuilder_setcapturerinfo) 设置相应的音频输入源类型，从而激活回声消除处理流程。

## 注意事项

从API version 12开始**不再推荐**使用[OH\_AudioCapturer\_Callbacks](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiocapturer-callbacks-struct)的方式设置音频回调函数。若必须使用，需要注意在设置音频回调函数时，通过下面两种方式中的任意一种来设置音频回调函数，避免不可预期的行为。

* 方式1：请确保[OH\_AudioCapturer\_Callbacks](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audiocapturer-callbacks-struct)的每一个回调都被**自定义的回调方法**或**空指针**初始化。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 自定义读入数据函数。
  2. int32_t MyOnReadData(
  3. OH_AudioCapturer* capturer,
  4. void* userData,
  5. void* buffer,
  6. int32_t length)
  7. {
  8. // 从buffer中取出length长度的录音数据。
  9. return 0;
  10. }
  11. // 自定义音频中断事件函数。
  12. int32_t MyOnInterruptEvent(
  13. OH_AudioCapturer* capturer,
  14. void* userData,
  15. OH_AudioInterrupt_ForceType type,
  16. OH_AudioInterrupt_Hint hint)
  17. {
  18. // 根据type和hint表示的音频中断信息，更新录制器状态和界面。
  19. return 0;
  20. }
  21. OH_AudioCapturer_Callbacks callbacks;

  23. // 配置回调函数，如果需要监听，则赋值。
  24. callbacks.OH_AudioCapturer_OnReadData = MyOnReadData;
  25. callbacks.OH_AudioCapturer_OnInterruptEvent = MyOnInterruptEvent;

  27. // （必选）如果不需要监听，使用空指针初始化。
  28. callbacks.OH_AudioCapturer_OnStreamEvent = nullptr;
  29. callbacks.OH_AudioCapturer_OnError = nullptr;
  ```
* 方式2：使用前，初始化并清零结构体。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 自定义读入数据函数。
  2. int32_t MyOnReadData(
  3. OH_AudioCapturer* capturer,
  4. void* userData,
  5. void* buffer,
  6. int32_t length)
  7. {
  8. // 从buffer中取出length长度的录音数据。
  9. return 0;
  10. }
  11. // 自定义音频中断事件函数。
  12. int32_t MyOnInterruptEvent(
  13. OH_AudioCapturer* capturer,
  14. void* userData,
  15. OH_AudioInterrupt_ForceType type,
  16. OH_AudioInterrupt_Hint hint)
  17. {
  18. // 根据type和hint表示的音频中断信息，更新录制器状态和界面。
  19. return 0;
  20. }
  21. OH_AudioCapturer_Callbacks callbacks;

  23. // 使用前，初始化并清零结构体。
  24. memset(&callbacks, 0, sizeof(OH_AudioCapturer_Callbacks));

  26. // 配置需要的回调函数。
  27. callbacks.OH_AudioCapturer_OnReadData = MyOnReadData;
  28. callbacks.OH_AudioCapturer_OnInterruptEvent = MyOnInterruptEvent;
  ```

## 示例代码

* [音频低时延录制与播放](https://gitcode.com/HarmonyOS_Samples/audio-native)