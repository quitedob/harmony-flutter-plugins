# 录音/麦克风集成指导

> 本文件指导鸿蒙端录音/麦克风能力的正确实现。适用于：SDK 迁移中涉及 `MediaRecorder`、`AudioRecord`、`getMaxAmplitude` 等安卓录音 API 的场景，以及 Demo 需要真实录音验证的场景。
>
> **核心原则**：录音数据必须来自真实麦克风，**禁止**使用 `Math.random()`、`setInterval` + 随机数、固定值等模拟数据替代。模拟数据无法验证 HAR 在真实环境下的行为。

---

## 1. 权限配置（声明 + 运行时申请 + 全局开关，缺一不可）

### 1.1 module.json5 声明

在 `entry/src/main/module.json5`（Demo 侧）或 `library/src/main/module.json5`（HAR 侧，仅当 HAR 内部直接录音时）的 `requestPermissions` 中声明：

```json5
{
  "requestPermissions": [
    {
      "name": "ohos.permission.MICROPHONE",
      "reason": "$string:microphone_reason",
      "usedScene": {
        "abilities": ["EntryAbility"],
        "when": "inuse"
      }
    }
  ]
}
```

**字符串资源**（`entry/src/main/resources/base/element/string.json`）：

```json
{
  "string": [
    {
      "name": "microphone_reason",
      "value": "用于录音功能，采集音频数据以驱动录音动画"
    }
  ]
}
```

> **注意**：HAR 库自身的 `module.json5` 通常不声明权限（权限由宿主 App 负责），但如果 Demo 需要录音，必须在 Demo 的 `entry/src/main/module.json5` 中声明。

### 1.2 运行时权限申请

```typescript
import { abilityAccessCtrl, common, Permissions } from '@kit.AbilityKit';

async function requestMicrophonePermission(context: common.UIAbilityContext): Promise<boolean> {
  const atManager = abilityAccessCtrl.createAtManager();
  try {
    const result = await atManager.requestPermissionsFromUser(
      context,
      ['ohos.permission.MICROPHONE'] as Permissions[]
    );
    return result.authResults[0] === 0;
  } catch (err) {
    hilog.error(LOG_DOMAIN, LOG_TAG, 'requestMicrophonePermission failed: %{public}s', JSON.stringify(err));
    return false;
  }
}
```

### 1.3 全局开关检查（重要）

麦克风受系统全局开关管控。即使用户已授权 `ohos.permission.MICROPHONE`，如果系统设置中麦克风全局开关处于关闭状态，录音 API 仍然无法采集到音频数据。

```typescript
import { abilityAccessCtrl, common } from '@kit.AbilityKit';

async function ensureMicrophoneAvailable(context: common.UIAbilityContext): Promise<boolean> {
  const atManager = abilityAccessCtrl.createAtManager();

  // 第一步：检查全局开关
  try {
    const switchResult = await atManager.requestGlobalSwitch(
      context,
      abilityAccessCtrl.SwitchType.MICROPHONE
    );
    if (!switchResult) {
      // 全局开关关闭，提示用户在设置中开启
      hilog.warn(LOG_DOMAIN, LOG_TAG, 'Microphone global switch is OFF');
      return false;
    }
  } catch (err) {
    hilog.error(LOG_DOMAIN, LOG_TAG, 'requestGlobalSwitch failed: %{public}s', JSON.stringify(err));
    // 开关检查失败不阻断流程，继续尝试申请权限
  }

  // 第二步：申请权限
  return await requestMicrophonePermission(context);
}
```

**完整流程**：全局开关检查 → 运行时权限申请 → 授权成功后开始录音。任何一步失败都应在 UI 中提示用户。

---

## 2. 录音 API 选型

### 2.1 方案对比

| 需求场景 | 推荐方案 | 说明 |
|----------|---------|------|
| 录音 + 保存文件 | `media.AVRecorder` | 支持 AMR-NB/AAC 等格式输出到文件，类似 Android `MediaRecorder` |
| 实时音量采集（驱动动画） | `audio.AudioCapturer` | 采集 PCM 数据，计算 RMS/峰值，类似 Android `AudioRecord` + `getMaxAmplitude` |
| 录音 + 实时音量 | `AVRecorder` 录音 + `AudioCapturer` 并行 | 或仅用 `AudioCapturer` 同时录音和计算音量 |

### 2.2 AVRecorder 录音（保存文件）

```typescript
import { media } from '@kit.MediaKit';
import { audio } from '@kit.AudioKit';

async function startRecordingWithAVRecorder(
  context: common.UIAbilityContext,
  outputPath: string
): Promise<media.AVRecorder> {
  const avRecorder = await media.createAVRecorder();

  // 配置音频参数
  const config: media.AVRecorderConfig = {
    audioSourceType: media.AudioSourceType.AUDIO_SOURCE_TYPE_MIC,
    profile: {
      audioBitrate: 16000,
      audioChannels: 1,
      audioCodec: media.CodecMimeType.AUDIO_AAC,
      audioSampleRate: 16000,
      fileFormat: media.ContainerFormatType.CFT_MPEG_4A,
    } as media.AVRecorderProfile,
    url: `file://${outputPath}`,
  };

  await avRecorder.prepare(config);
  await avRecorder.start();
  return avRecorder;
}

async function stopRecording(avRecorder: media.AVRecorder): Promise<void> {
  await avRecorder.stop();
  await avRecorder.release();
}
```

### 2.3 AudioCapturer 实时音量采集

这是 Android `MediaRecorder.getMaxAmplitude()` 的鸿蒙等价方案：

```typescript
import { audio } from '@kit.AudioKit';

const AUDIO_SAMPLE_RATE = 16000;
const AUDIO_CHANNELS = 1;
const AUDIO_SAMPLE_FORMAT = audio.AudioSampleFormat.SAMPLE_FORMAT_F32LE;
const AUDIO_ELEMENT_COUNT = 1024;

class VolumeCapturer {
  private audioCapturer: audio.AudioCapturer | null = null;
  private isCapturing: boolean = false;

  async start(
    onVolumeUpdate: (volume: number) => void
  ): Promise<void> {
    const audioCapturerOptions: audio.AudioCapturerOptions = {
      streamInfo: {
        samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_16000,
        channels: audio.AudioChannel.CHANNEL_1,
        sampleFormat: AUDIO_SAMPLE_FORMAT,
        encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW,
      },
      capturerInfo: {
        source: audio.AudioSourceType.SOURCE_TYPE_MIC,
        capturerFlags: 0,
      },
    };

    this.audioCapturer = await audio.createAudioCapturer(audioCapturerOptions);
    this.isCapturing = true;

    // 监听音频数据
    this.audioCapturer.on('readData', (buffer: ArrayBuffer) => {
      if (!this.isCapturing) return;
      const volume = this.calculateVolume(buffer);
      onVolumeUpdate(volume);
    });

    await this.audioCapturer.start();
  }

  async stop(): Promise<void> {
    this.isCapturing = false;
    if (this.audioCapturer !== null) {
      await this.audioCapturer.stop();
      await this.audioCapturer.release();
      this.audioCapturer = null;
    }
  }

  private calculateVolume(buffer: ArrayBuffer): number {
    // 计算RMS (Root Mean Square) 音量
    const dataView = new DataView(buffer);
    const sampleCount = buffer.byteLength / 4; // F32LE = 4 bytes per sample
    let sumSquares = 0;
    for (let i = 0; i < sampleCount; i++) {
      const sample = dataView.getFloat32(i * 4, true); // little-endian
      sumSquares += sample * sample;
    }
    const rms = Math.sqrt(sumSquares / sampleCount);

    // 转换为 0.0 - 1.0 范围的音量值（根据实际需求调整映射）
    // rms 通常在 0 ~ 0.1 范围（正常说话），映射到 0 ~ 1
    const normalizedVolume = Math.min(1.0, rms * 10);
    return normalizedVolume;
  }
}
```

### 2.4 在 Demo 中集成（参考示例）

```typescript
import { AnimatedRecordingView } from 'animatedrecordingview';
import { abilityAccessCtrl, common } from '@kit.AbilityKit';

@Entry
@Component
struct RecordingDemoPage {
  private recordingViewRef: AnimatedRecordingView | null = null;
  private volumeCapturer: VolumeCapturer = new VolumeCapturer();
  @State private isRecording: boolean = false;
  @State private permissionStatus: string = '未申请';

  async startRecording(): Promise<void> {
    const context = this.getContext(this) as common.UIAbilityContext;

    // 1. 检查全局开关 + 申请权限
    const available = await ensureMicrophoneAvailable(context);
    if (!available) {
      this.permissionStatus = '权限被拒绝或全局开关关闭';
      // UI 提示用户
      return;
    }
    this.permissionStatus = '已授权';

    // 2. 启动音量采集
    await this.volumeCapturer.start((volume: number) => {
      if (this.recordingViewRef !== null) {
        this.recordingViewRef.setVolume(volume);
      }
    });

    // 3. 启动动画
    if (this.recordingViewRef !== null) {
      this.recordingViewRef.start();
    }
    this.isRecording = true;
  }

  async stopRecording(): Promise<void> {
    await this.volumeCapturer.stop();
    if (this.recordingViewRef !== null) {
      this.recordingViewRef.loading();
      setTimeout(() => {
        if (this.recordingViewRef !== null) {
          this.recordingViewRef.stop();
        }
        this.isRecording = false;
      }, 1500);
    }
  }
}
```

---

## 3. 常见陷阱

### 3.1 禁止用模拟数据替代真实麦克风

| 错误做法 | 正确做法 |
|---------|---------|
| `setInterval(() => setVolume(Math.random()), 100)` | 使用 `AudioCapturer` 采集真实音量 |
| `setVolume(0.5)` 固定值 | 计算 RMS/峰值并归一化后传入 |
| `0.1 + Math.random() * 0.7` 模拟音量波动 | 真实 `on('readData')` 回调中的 buffer 计算 |

**原因**：模拟数据无法验证 HAR 组件在真实音量输入下的行为，包括 `VolumeSmoother` 的升降逻辑、波形渲染对极端值的响应等。

### 3.2 仅声明权限不够，必须运行时申请

`module.json5` 中的 `requestPermissions` 只是声明"应用可能会用到此权限"，并不等于用户已授权。`user_grant` 类权限必须在用户触发录音操作时调用 `requestPermissionsFromUser()` 弹窗授权。

### 3.3 全局开关容易被忽略

即使权限已授权，如果系统设置中麦克风全局开关关闭，`AudioCapturer.start()` 不会报错但采集到的数据为静音（全零）。必须先调用 `abilityAccessCtrl.requestGlobalSwitch()` 检查或引导用户开启。

### 3.4 AVRecorder 状态机

`AVRecorder` 有严格的状态机（`idle → prepared → started → stopped → released`），与 `AVPlayer` 类似。在 `prepare()` 未完成时调用 `start()` 会静默失败。必须监听 `stateChange` 事件：

```typescript
avRecorder.on('stateChange', (state: media.AVRecorderState) => {
  hilog.info(LOG_DOMAIN, LOG_TAG, 'AVRecorder state: %{public}s', state);
});
```

### 3.5 AudioCapturer 释放

在页面 `aboutToDisappear()` 或录音停止时，必须调用 `stop()` + `release()` 释放资源，否则麦克风会持续占用：

```typescript
aboutToDisappear(): void {
  this.volumeCapturer.stop();
}
```

### 3.6 音量映射需要根据实际场景调整

`AudioCapturer` 返回的原始 RMS 值范围取决于采样格式和音源强度。F32LE 格式的正常说话 RMS 通常在 0.001 ~ 0.1 范围。映射到 HAR SDK 的 `setVolume()` 输入范围（通常是 0.0 ~ 1.0 或 0 ~ 90+ dB）需要根据具体 SDK 的期望做调整。

---

## 4. Android → 鸿蒙 API 映射速查

| Android API | 鸿蒙等价 API | 说明 |
|-------------|-------------|------|
| `MediaRecorder.setAudioSource(MIC)` | `AVRecorder` + `audioSourceType: AUDIO_SOURCE_TYPE_MIC` | 录音到文件 |
| `MediaRecorder.getMaxAmplitude()` | `AudioCapturer.on('readData')` + RMS 计算 | 实时音量 |
| `AudioRecord` | `audio.AudioCapturer` | 原始 PCM 采集 |
| `Manifest.permission.RECORD_AUDIO` | `ohos.permission.MICROPHONE` | 权限声明 |
| `ActivityCompat.requestPermissions()` | `atManager.requestPermissionsFromUser()` | 运行时权限 |
| N/A | `atManager.requestGlobalSwitch(SwitchType.MICROPHONE)` | 全局开关（鸿蒙独有） |

---

## 5. 调试技巧

1. **确认权限授权状态**：`atManager.checkAccessToken()` 检查当前授权结果
2. **确认全局开关状态**：`atManager.requestGlobalSwitch()` 返回 boolean
3. **检查 AudioCapturer 状态**：`audioCapturer.state` 可获取当前状态
4. **日志验证真实数据**：在 `on('readData')` 中打印 buffer 大小和计算后的音量值，确认非全零
5. **静音排查**：如果音量始终为 0，依次检查：全局开关 → 权限授权 → AudioCapturer 状态 → buffer 是否全零
