# OHOS 音视频播放适配指导（Media Kit / Audio Kit）

## 第一部分：什么时候读取这份指导

这份指南用于 **HarmonyOS 原生 ArkTS** 的音频播放、视频播放、后台播控、画中画适配，重点解决 `AVPlayer`、`AudioRenderer`、`XComponent`、`surfaceId`、`AVSession`、`PiP` 这类实现层易错点。

### 适用场景

- 音频播放
- 视频播放 / 画中画
- 原 Android SDK 依赖系统播放器能力，或依赖第三方播放 SDK，但该 SDK 没有 HarmonyOS 可用实现

如果已经存在可用的 HarmonyOS 第三方播放 SDK，优先使用第三方 SDK。

### 选型规则

- **格式化音频**：优先 `Media Kit` 的 `AVPlayer`
- **视频播放**：优先 `Media Kit` 的 `AVPlayer`
- **PCM / 低时延 / 流式写入音频**：优先 `Audio Kit` 的 `AudioRenderer`
- **后台播放 / 锁屏播控 / 耳机键 / 蓝牙播控**：在播放核心之外，再叠加 `AVSession Kit`

---

## 第二部分：原生 ArkTS 适配方法

### 2.1 先保持原 Android SDK 的公开语义

适配时先看原 Android SDK 对外暴露的能力，而不是只看底层播放器：

- 原 SDK 对外是“控制器型音频能力”：
  - HarmonyOS 侧通常用 `AVPlayer` 或 `AudioRenderer`
  - 重点保留 `play / pause / seek / stop / release / setVolume / setSpeed / loop / state callback`
- 原 SDK 对外是“视频视图 / 播放画面”：
  - HarmonyOS 侧必须保留“可嵌入视频画面”的语义
  - 不能退化成单纯 `play(url)` 的无界面调用

### 2.2 视频画面承载怎么选

HarmonyOS 上 `AVPlayer` 负责播放，视频画面通常还需要 `XComponentType.SURFACE` 来承载：

- **优先 `XComponent(SURFACE)`**
  - 适合大多数需要真实视频画面的场景
  - 适合需要 `surfaceId`、画中画、窗口级能力、后续切换承载面的场景
- **纯音频或无可视画面**
  - 不需要 `XComponent`
  - 只保留播放器控制和状态回调即可

选择原则：

- 原 Android SDK 只提供音频能力，就不要额外引入视频承载层
- 原 Android SDK 提供视频显示能力，就应明确规划 `XComponent(SURFACE) + AVPlayer`
- 如果后续还要接 `PiP`，应优先把主渲染路径设计为 `XComponentType.SURFACE`

### 2.3 播放核心怎么选

#### 格式化音频 / 格式化视频

优先 `AVPlayer`，因为它直接覆盖：

- `url` / `fdSrc`
- `setMediaSource(mediaSource, playbackStrategy)`
- `prepare / play / pause / stop / reset / release`
- `seek`
- `setVolume`
- `setSpeed`
- 音频场景的 `audioRendererInfo`
- 视频的 `surfaceId` 绑定

#### PCM / 低时延 / 流式音频

优先 `AudioRenderer`，因为这类能力通常不是“给一个 url 自动播”，而是：

- 持续写入 PCM buffer
- 实时输出音频
- 低时延 / 波形 / 实时流 / 音效

这时用 `AVPlayer` 反而不合适。

### 2.4 后台音频是额外层，不是播放核心

- `AVSession Kit` 解决的是后台播放、锁屏控制、播控中心、耳机键等问题
- 它不是播放器本身
- 不要把“接了 AVSession”误认为“已经完成播放适配”

### 2.5 视频播放要同时规划“播放器状态机”和“视图挂载顺序”

- `AVPlayer` 的 `url / surfaceId / prepare / play` 有严格状态顺序，不能同步挤在一个片段里调用
- `surfaceId` 往往要等 `XComponent.onLoad()` 后才能拿到
- 因此要默认存在两个前置条件：
  - `AVPlayer` 已进入 `initialized`
  - `surfaceId` 已准备好
- 只有两者都满足，才能真正 `prepare()`

### 2.6 播放源配置和 `prepare()` 之间要留出“prepare 前配置窗口”

- 官方文档要求 `stateChange` / `error` 监听要在 `idle`、调用设置资源接口前完成；不要先 `url = ...`，再补监听
- 若需要设置自定义请求头、HLS / m3u8、播放策略、raw fd、沙箱文件等来源，不能只写 `player.url = ...`
- 应根据实际场景，在 `url` / `fdSrc` / `setMediaSource(mediaSource, playbackStrategy)` 中正确选路
- 音频场景若需要设置 `audioRendererInfo`，必须在 `initialized` 且第一次 `prepare()` 之前完成
- 生成代码时要默认预留“资源已设置，但还没 prepare”的阶段，用于补 `audioRendererInfo`、播放策略、surface 绑定等 prepare 前配置

---

## 第三部分：实现骨架

### 3.1 格式化音频：`AVPlayer`

```typescript
import { media } from '@kit.MediaKit';
import { audio } from '@kit.AudioKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = 'AudioPlayback';
const DOMAIN = 0xFF00;

export class OhosAudioPlayer {
  private player: media.AVPlayer | null = null;
  private currentState: media.AVPlayerState | null = null;
  private pendingVolume: number = 1.0;
  private pendingSpeed: media.PlaybackSpeed = media.PlaybackSpeed.SPEED_FORWARD_1_00_X;
  private pendingLoop: boolean = false;
  private pendingSeekMs: number | null = null;

  async ensurePlayer(): Promise<void> {
    if (this.player !== null) {
      return;
    }

    this.player = await media.createAVPlayer();
    this.player.on('stateChange', async (state: media.AVPlayerState, reason: media.StateChangeReason) => {
      this.currentState = state;
      hilog.info(DOMAIN, TAG, 'state=%{public}s reason=%{public}s', state, `${reason}`);

      if (state === 'prepared' && this.player !== null) {
        this.player.setVolume(this.pendingVolume);
        this.player.setSpeed(this.pendingSpeed);
        this.player.loop = this.pendingLoop;
        if (this.pendingSeekMs !== null) {
          this.player.seek(this.pendingSeekMs);
          this.pendingSeekMs = null;
        }
      }
    });

    this.player.on('error', (error: BusinessError) => {
      hilog.error(DOMAIN, TAG, 'player error: %{public}s', error.message);
    });
  }

  async setSource(url: string): Promise<void> {
    await this.ensurePlayer();
    if (this.player === null) {
      return;
    }

    this.player.url = url;

    // 或者：
    // this.player.fdSrc = fdSrc;
    // this.player.setMediaSource(mediaSource, playbackStrategy);
  }

  async prepare(): Promise<void> {
    if (this.player === null || this.currentState !== 'initialized') {
      return;
    }

    // 如果要设置 audioRendererInfo，只能放在 initialized 且第一次 prepare() 前
    // this.player.audioRendererInfo = {
    //   usage: audio.StreamUsage.STREAM_USAGE_MUSIC,
    //   rendererFlags: 0,
    // };

    await this.player.prepare();
  }

  setVolume(volume: number): void {
    this.pendingVolume = volume;
    if (this.player !== null &&
      (this.currentState === 'prepared' || this.currentState === 'playing' || this.currentState === 'paused')) {
      this.player.setVolume(volume);
    }
  }

  setSpeed(speed: media.PlaybackSpeed): void {
    this.pendingSpeed = speed;
    if (this.player !== null &&
      (this.currentState === 'prepared' || this.currentState === 'playing' || this.currentState === 'paused')) {
      this.player.setSpeed(speed);
    }
  }

  setLoop(loop: boolean): void {
    this.pendingLoop = loop;
    if (this.player !== null) {
      this.player.loop = loop;
    }
  }

  async play(): Promise<void> {
    if (this.player !== null &&
      (this.currentState === 'prepared' || this.currentState === 'paused' || this.currentState === 'completed')) {
      await this.player.play();
    }
  }

  async pause(): Promise<void> {
    if (this.player !== null && this.currentState === 'playing') {
      await this.player.pause();
    }
  }

  seek(positionMs: number): void {
    if (this.player !== null &&
      (this.currentState === 'prepared' || this.currentState === 'playing' || this.currentState === 'paused' || this.currentState === 'completed')) {
      this.player.seek(positionMs);
      return;
    }
    this.pendingSeekMs = positionMs;
  }

  async release(): Promise<void> {
    if (this.player !== null) {
      await this.player.release();
      this.player = null;
      this.currentState = null;
    }
  }
}
```

关键点：

- `url` / `fdSrc` 赋值后不要立刻假设已经可播，要等 `stateChange -> initialized`
- `prepare()` 完成后再进入 `play()`
- `setVolume / setSpeed / loop / seek / play` 若早于允许状态到达，应先缓存，等 `prepared` 后再应用
- `seek()` 本身是同步触发；如需拿到 seek 完成时机，可继续监听 `seekDone`
- `setSpeed()` 使用的是官方 `media.PlaybackSpeed` 枚举；如果原 Android SDK 对外暴露 `float speed`，应在 SDK 边界做倍率到枚举的映射
- 不要把 `setVolume(1.0)`、`setSpeed(media.PlaybackSpeed.SPEED_FORWARD_1_00_X)` 这类 create 后立即下发的控制调用直接打到未 ready 的 `AVPlayer`

### 3.2 PCM / 流式音频：`AudioRenderer`

```typescript
import { audio } from '@kit.AudioKit';

export class OhosPcmRenderer {
  private renderer: audio.AudioRenderer | null = null;

  async ensureRenderer(options: audio.AudioRendererOptions): Promise<void> {
    if (this.renderer !== null) {
      return;
    }
    this.renderer = await audio.createAudioRenderer(options);
  }

  async start(): Promise<void> {
    await this.renderer?.start();
  }

  async write(buffer: ArrayBuffer): Promise<number> {
    if (this.renderer === null) {
      return 0;
    }
    return await this.renderer.write(buffer);
  }

  async stop(): Promise<void> {
    await this.renderer?.stop();
  }

  async release(): Promise<void> {
    await this.renderer?.release();
    this.renderer = null;
  }
}
```

关键点：

- 这层适合 `PCM`、实时流、低时延音频
- 若原 Android SDK 公开的是“持续喂数据”，不要强改成 `setUrl()`

### 3.3 视频播放：`XComponent(SURFACE) + AVPlayer`

```typescript
import { media } from '@kit.MediaKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = 'VideoPlayback';
const DOMAIN = 0xFF00;

export class VideoPlayerEntry {
  private player: media.AVPlayer | null = null;
  private currentState: media.AVPlayerState | null = null;
  private surfaceId: string = '';
  private currentUrl: string = '';
  private pendingPlay: boolean = false;
  private pendingVolume: number = 1.0;

  async ensurePlayer(): Promise<void> {
    if (this.player !== null) {
      return;
    }

    this.player = await media.createAVPlayer();
    this.player.on('stateChange', async (state: media.AVPlayerState, reason: media.StateChangeReason) => {
      this.currentState = state;
      hilog.info(DOMAIN, TAG, 'state=%{public}s reason=%{public}s', state, `${reason}`);

      if (state === 'initialized') {
        await this.prepareIfPossible();
      }

      if (state === 'prepared' && this.player !== null) {
        this.player.setVolume(this.pendingVolume);
        if (this.pendingPlay) {
          await this.player.play();
          this.pendingPlay = false;
        }
      }
    });

    this.player.on('error', (error: BusinessError) => {
      hilog.error(DOMAIN, TAG, 'player error: %{public}s', error.message);
    });
  }

  async setDataSource(url: string): Promise<void> {
    await this.ensurePlayer();
    if (this.player === null) {
      return;
    }
    this.currentUrl = url;
    this.player.url = url;
  }

  attachSurface(surfaceId: string): void {
    this.surfaceId = surfaceId;
    void this.prepareIfPossible();
  }

  async prepareIfPossible(): Promise<void> {
    if (this.player === null || this.currentState !== 'initialized' || this.surfaceId.length === 0) {
      return;
    }
    this.player.surfaceId = this.surfaceId;
    await this.player.prepare();
  }

  setVolume(volume: number): void {
    this.pendingVolume = volume;
    if (this.player !== null &&
      (this.currentState === 'prepared' || this.currentState === 'playing' || this.currentState === 'paused')) {
      this.player.setVolume(volume);
    }
  }

  async play(): Promise<void> {
    if (this.player !== null &&
      (this.currentState === 'prepared' || this.currentState === 'paused' || this.currentState === 'completed')) {
      await this.player.play();
      return;
    }
    this.pendingPlay = true;
  }

  async release(): Promise<void> {
    if (this.player !== null) {
      await this.player.release();
      this.player = null;
      this.currentState = null;
      this.surfaceId = '';
      this.currentUrl = '';
      this.pendingPlay = false;
    }
  }
}
```

#### ArkUI 组件承载骨架

```typescript
@Component
export struct VideoSurfaceView {
  @ObjectLink playerEntry: VideoPlayerEntry;
  private controller: XComponentController = new XComponentController();

  build() {
    XComponent({
      type: XComponentType.SURFACE,
      controller: this.controller
    })
      .onLoad(() => {
        const surfaceId = this.controller.getXComponentSurfaceId();
        this.playerEntry.attachSurface(surfaceId);
      })
      .onDestroy(() => {
        this.playerEntry.attachSurface('');
      })
      .size({ width: '100%', height: '100%' });
  }
}
```

关键点：

- `surfaceId` 来自 `XComponentController.getXComponentSurfaceId()`
- 先 `url -> initialized`，再等 `surfaceReady`，最后 `prepare()`
- 当前骨架里 `setVolume / play` 已走待执行缓存；如果后续还要暴露 `seek / setSpeed`，也要沿用同样的待执行缓存策略
- `seek()` 如果需要完成回调，可继续监听 `seekDone`；`setSpeed()` 如果需要确认最终生效倍率，可监听 `speedDone`
- `XComponent` rebuild 或重建后，新的 `surfaceId` 必须重新绑定到同一个 `AVPlayer`
- `release()` 时一定 `player.release()`

---

## 第四部分：后台播放与画中画

### 4.1 后台音频

- 音频后台播放通常是 `AVPlayer` 或 `AudioRenderer` 加 `AVSession`
- `AVSession` 负责：
  - 锁屏控制
  - 播控中心
  - 耳机键 / 蓝牙播控
  - 播放状态同步
- 播放核心仍然是 `AVPlayer` 或 `AudioRenderer`

### 4.2 视频画中画

- 如果要支持 `PiP`，优先围绕 `XComponentType.SURFACE` 规划主渲染路径
- 不要做成“两套播放器核心”：
  - 一套普通播放
  - 一套临时 PiP
- 更推荐“一套 `AVPlayer` + 多阶段 surface 绑定”

---

## 第五部分：注意事项

### 5.1 不要新造公开 API

- 要保持原 Android SDK 已有的 controller、listener、callback、配置项、错误语义

### 5.2 视频能力要保留“画面型”语义

- 如果原 Android SDK 有视频显示能力，HarmonyOS 侧也要能嵌入视频画面
- 不能偷懒改成“只返回播放成功”

### 5.3 音频能力优先保留“控制器型”语义

- 音频播放一般不需要可视承载层
- 重点是播控、状态回调、进度、buffer、速度、循环、后台播放

### 5.4 普通播放和 PiP 不要做成两套互相打架的主链路

- 若必须同时支持普通播放和 `PiP`，优先先定一条主渲染路径，再规划 surface 切换
- 不要先让普通播放走一套、`PiP` 再临时补另一套完全独立的播放器链路

### 5.5 视频类实现的最低自检项

- 是否实现了 `stateChange` / `error` 监听先于资源设置
- 是否处理了 `initialized` 和 `surfaceReady` 的先后顺序
- `surfaceCreated / surfaceDestroyed / rebuild / release` 是否都接到了播放器重绑或清理逻辑
- 是否存在在 `idle` / `initialized` 之前就直接 `play()`、`seek()`、`setVolume()` 的问题

### 5.6 URL 源测试注意

如果原 Android 示例中使用了 `googleapis.com` 一类在国内不稳定的测试地址，请改为更稳定的公开地址，例如：

- 视频：`https://media.w3.org/2010/05/sintel/trailer.mp4`
- 音频：`http://music.163.com/song/media/outer/url?id=447925558.mp3`

## 补充说明

- 更多 API 用法需要查询官方文档。
