# OHOS 音视频播放适配指导（Media Kit / Audio Kit）

## 第一部分：什么时候读取这份指导

这份指南用于 Flutter 音频播放 / 视频播放类插件的 HarmonyOS 适配，重点解决 `AVPlayer`、`AudioRenderer`、`PlatformView`、`Texture`、`surfaceId`、`PiP` 这类实现层易错点。

### 适用场景

- 音频播放
- 视频播放/画中画
- 原插件依赖的是系统播放器能力，或依赖第三方播放 SDK，但该 SDK 没有 HarmonyOS 可用实现

如果原插件使用了第三方库实现，优先使用第三方库。

### 选型规则

- **格式化音频**：优先 `Media Kit` 的 `AVPlayer`
- **视频播放**：优先 `Media Kit` 的 `AVPlayer`
- **PCM / 低时延 / 流式写入音频**：优先 `Audio Kit` 的 `AudioRenderer`
- **后台播放 / 锁屏播控 / 耳机键 / 蓝牙播控**：在播放核心之外，再叠加 `AVSession Kit`

---

## 第二部分：Flutter 插件适配方法

### 2.1 先保留原插件公开形态

适配时先看原插件对 Flutter 的公开形态，不要只看底层播放器：

- 原插件对外是“控制器 + 无可视组件”的音频插件：
  - HarmonyOS 侧通常用 `MethodChannel/EventChannel + AVPlayer/AudioRenderer`
  - 不需要 `PlatformView`
- 原插件对外是“视频 Widget / 播放视图”：
  - HarmonyOS 侧必须保留“可嵌入视图”语义
  - 不能退化成单纯 `play(url)` 的无界面调用

### 2.2 视频画面承载怎么选

HarmonyOS 上 `AVPlayer` 负责播放，画面承载还需要一层 Flutter 宿主桥接：

- **优先 `PlatformView + XComponent`**
  - 适合原插件本来就是“平台视图 / 原生视图嵌入”语义
  - 适合需要在原生侧直接组织播放器视图、控制层、手势区域
  - 适合公开能力包含画中画、窗口级小窗、`XComponentController` 或 `SURFACE` 生命周期管理
- **使用 `Texture + surfaceId`**
  - 适合原插件本来就是 texture/controller 架构
  - 适合多个视频实例或渲染层与控制层分离的场景
  - 不适合再额外叠加 HarmonyOS `PiP` 这类强依赖 `XComponentType.SURFACE` 的能力

选择原则：

- 原插件原本是 Widget 视图型，就继续走视图型
- 原插件原本是 Texture 型，就继续走 Texture 型
- 如果原插件公开支持 `PiP`，应优先规划 `PlatformView + XComponentType.SURFACE` 作为主渲染路径
- 不要因为 `Texture` 或 `PlatformView` 某条路更简单，就擅自改变公开 API 和用户可见行为


- 如果 HarmonyOS 侧最终需要 `XComponentController`、`SURFACE`、`typeNode` 或窗口级 `PiP`，说明渲染承载不是“普通 Texture 即可”的场景，规划阶段就要把主方案定到 `PlatformView + XComponent(SURFACE)`
- 若原插件公开的是 `controller + widget` 形态，`textureId` 只应视为实例标识或协议字段，不要把它误判成“必须继续使用 Flutter Texture 后端”

### 2.2.1 Flutter OHOS Texture 渲染视频黑屏陷阱

**已知问题**：在 Flutter OHOS（3.35.x 及之前版本）中，使用 `TextureRegistry` 注册的纹理表面渲染视频内容时，`OHOSExternalTexture::MarkNewFrameAvailable` 会跳过所有视频帧，导致画面始终黑屏。hilog 中可见 `external_texture skip one frame (slow consumer)` 反复出现。

**影响范围**：仅影响**视频播放**场景。音频播放、相机预览等非视频帧连续推送场景可能不受影响。

**结论**：如果插件的核心功能是**在 Flutter 页面中显示视频画面**，**不能使用 Texture 后端**，必须使用 `PlatformView + XComponent(SURFACE)` 方案。

**判断信号**：

- 插件公开了视频 Widget（如 `VideoPlayer`、`VideoView`）
- AVPlayer 绑定 `TextureRegistry` 提供的 `surfaceId` 后画面全黑，但音频正常播放
- hilog 出现 `external_texture skip one frame` 或 `MarkNewFrameAvailable` 相关日志

**处理方式**：

1. 即使原插件在 Android/iOS 上使用 Texture 架构，OHOS 侧仍需切换到 `PlatformView + XComponent`
2. Dart 侧使用 `OhosView` 替代 `Texture` widget，`textureId` 保留为播放器实例标识（用于 MethodChannel/EventChannel 路由），但不作为纹理渲染 ID
3. 若插件后续还需支持 PiP（画中画），更应直接使用 `PlatformView + XComponent`，因为 PiP API 强制要求 `XComponentController`

**兼容写法示例**（Dart 侧 `buildView`）：

```dart
Widget buildView(int? textureId) {
  if (defaultTargetPlatform == TargetPlatform.ohos) {
    return OhosView(
      viewType: 'com.example/video_player',
      creationParams: <String, dynamic>{'textureId': textureId!},
      creationParamsCodec: const StandardMessageCodec(),
    );
  }
  return Texture(textureId: textureId!);
}
```

> 注意：`OhosView` 在 Flutter OHOS 分支的 `flutter/widgets.dart` 中，无需额外 import。`defaultTargetPlatform == TargetPlatform.ohos` 在运行时有效。

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

这类能力最接近 Flutter 常见播放器插件的公开语义。

#### PCM / 低时延 / 流式音频

优先 `AudioRenderer`，因为这类插件通常不是“给一个 url 自动播”，而是：

- 持续写入 PCM buffer
- 实时输出音频
- 低时延 / 波形 / 音效 / 实时流

这时用 `AVPlayer` 反而不合适。

### 2.4 后台音频是额外层，不是播放核心

- `AVSession Kit` 解决的是后台播放、锁屏控制、播控中心、耳机键等问题
- 它不是播放器本身
- 不要把“接了 AVSession”误认为“已经完成音频播放适配”

### 2.5 视频插件要同时规划“播放器状态机”和“视图挂载顺序”

- `AVPlayer` 的 `url / surfaceId / prepare / play` 有严格状态顺序，不能同步挤在一个片段里调用
- Flutter 侧的视频视图若负责产出 `surfaceId`，native 就不能在 `setDataSource()` 里无限等待 surface，否则容易和 Flutter 的视图创建顺序互锁
- 如果 `initialized / prepared` 依赖 `PlatformView/XComponent` 先挂出来，Flutter 侧不要把视频 Widget 严格门控在 `initialized == true` 之后再创建
- 生成代码时要默认考虑 Flutter rebuild：同一个播放器实例对应的 `PlatformView/XComponent` 可能被重建，不能假设 surface 只会创建一次

#### XComponent Surface 迟到的 Reset-Reconnect 模式

实际适配中，`XComponent.onLoad()` 回调可能在 AVPlayer 已经 `prepare()` 甚至 `play()` 之后才到达（Flutter rebuild、页面导航等场景）。此时 AVPlayer 已经不在 `initialized` 状态，无法直接修改 `surfaceId`。

**处理流程**：

1. XComponent surface 到达时，检查当前 AVPlayer 状态
2. 若 AVPlayer 处于 `initialized` 状态：直接设置 `surfaceId`，然后 `prepare()`
3. 若 AVPlayer 处于 `prepared / playing / paused / completed` 状态：执行 reset-reconnect

**Reset-Reconnect 模式**：

```typescript
onXComponentSurfaceReady(textureId: number, surfaceId: string): void {
  const entry = this.playerEntries.get(textureId);
  if (entry === undefined || entry.player === null) return;
  
  const player = entry.player;
  entry.surfaceId = surfaceId;
  
  if (entry.currentState === 'initialized') {
    player.surfaceId = surfaceId;
    player.prepare();
  } else if (['prepared', 'playing', 'paused', 'completed'].includes(entry.currentState)) {
    const wasPlaying = entry.currentState === 'playing';
    const savedUrl = player.url ?? '';
    
    player.reset();
    player.on('stateChange', async (state: string) => {
      entry.currentState = state;
      if (state === 'idle') {
        player.url = savedUrl;
      } else if (state === 'initialized') {
        player.surfaceId = surfaceId;
        await player.prepare();
      } else if (state === 'prepared') {
        player.setVolume(entry.pendingVolume);
        player.setSpeed(entry.pendingSpeed);
        if (wasPlaying) {
          await player.play();
        }
      }
    });
  }
}
```

关键点：

- `AVPlayer.surfaceId` 只能在 `initialized` 状态设置（`url`/`fdSrc` 赋值后自动进入 `initialized`）
- 一旦 `prepare()` 被调用，`surfaceId` 就不可更改；必须 `reset()` 回到 `idle` → 重新设 `url` → `initialized` → 设新 `surfaceId` → `prepare()`
- Reset 前保存当前播放 URL 和播放状态，reconnect 后恢复
- 每实例的 `stateChange` 监听器在 reset-reconnect 时需要重新挂载（旧监听器会被 reset 打断）
- 不要在 `seekDone` 回调中触发事件上报（容易造成 Dart 侧 seek → 事件 → rebuild → seek 死循环）

### 2.6 播放源配置和 `prepare()` 之间要留出“prepare 前配置窗口”

- 官方文档要求 `stateChange` / `error` 监听要在 `idle`、调用设置资源接口前完成；不要先 `url = ...`，再补监听
- 若原插件支持自定义请求头、HLS / m3u8、播放策略、raw fd、沙箱文件等来源，HarmonyOS 侧不能只写 `player.url = ...`
- 这类场景要根据原插件公开能力，在 `url` / `fdSrc` / `setMediaSource(mediaSource, playbackStrategy)` 中正确选路
- 音频场景若需要设置 `audioRendererInfo`，必须在 `initialized` 且第一次 `prepare()` 之前完成；不要在 `initialized` 后立刻无条件 `prepare()`
- 生成代码时要默认预留“资源已设置，但还没 prepare”的阶段，用于补 `audioRendererInfo`、播放策略、surface 绑定等 prepare 前配置

如果走 `SoundPool`，要记住：`load()` 成功只代表拿到 `soundId`，不代表已经可播放；必须等 `on('loadComplete')` 后再 `play()`，否则容易出现 `has not been loaded completely`。
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
  private pendingPlay: boolean = false;
  private pendingVolume: number = 1.0;
  private pendingSeekMs: number | null = null;
  private pendingSpeed: media.PlaybackSpeed = media.PlaybackSpeed.SPEED_FORWARD_1_00_X;

  async ensurePlayer(): Promise<void> {
    if (this.player !== null) {
      return;
    }
    this.player = await media.createAVPlayer();
    // 必须先监听 stateChange / error，再设置 url / fdSrc / mediaSource
    this.player.on('stateChange', async (state: media.AVPlayerState, reason: media.StateChangeReason) => {
      this.currentState = state;
      hilog.info(DOMAIN, TAG, 'state=%{public}s reason=%{public}s', state, `${reason}`);
      if (state === 'prepared' && this.player !== null) {
        this.player.setVolume(this.pendingVolume);
        this.player.setSpeed(this.pendingSpeed);
        if (this.pendingSeekMs !== null) {
          this.player.seek(this.pendingSeekMs);
          this.pendingSeekMs = null;
        }
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

  async setSource(url: string): Promise<void> {
    await this.ensurePlayer();
    if (this.player === null) {
      return;
    }

    // 常见场景 1：普通 http/https/file/fd url
    this.player.url = url;

    // 常见场景 2：本地 fd 播放
    // this.player.fdSrc = fdSrc;

    // 常见场景 3：HLS / m3u8 / 自定义请求头 / playbackStrategy
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

  async play(): Promise<void> {
    if (this.player !== null &&
      (this.currentState === 'prepared' || this.currentState === 'paused' || this.currentState === 'completed')) {
      await this.player.play();
      return;
    }
    this.pendingPlay = true;
  }

  async pause(): Promise<void> {
    if (this.player !== null && this.currentState === 'playing') {
      await this.player.pause();
    }
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

- `url` / `fdSrc` 赋值后不要立刻假设已经可播，等 `stateChange -> initialized`
- `prepare()` 完成后再进入 `play()`
- **重要**：`setLooping / setVolume / setSpeed / seek / play` 若早于允许状态到达，应先缓存，等 `prepared` 后再应用
- `seek()` 是同步触发接口；如果公开 API 需要“seek 已完成”的时机，要监听 `seekDone`
- `setSpeed()` 应使用官方 `media.PlaybackSpeed` 枚举；Flutter 若公开的是浮点倍率，要在插件边界做映射
- 这层最适合对接 Flutter 侧控制器 API
- 不要把 `setLooping(false)`、`setVolume(1.0)` 这类 create 后立即下发的控制调用直接打到未 ready 的 `AVPlayer`

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

- 这层适合 `PCM`、实时流、低时延音频插件
- 若原插件公开的是“持续喂数据”，不要强改成 `setUrl()`

### 3.3 视频在 Flutter 上展示：`OhosView + PlatformView + XComponent + AVPlayer`

如果原插件对外是视频 Widget，HarmonyOS 侧更稳的落地方式是：

1. Dart 侧保留原插件的视频 Widget 语义，在 OHOS 分支使用 `OhosView`
2. ETS 端注册 `PlatformViewFactory`
3. `PlatformView` 内部创建 `XComponentType.SURFACE`
4. `XComponent.onLoad()` 时把 `surfaceId` 回绑给播放器实例
5. `AVPlayer` 等到 `initialized + surfaceReady` 后再 `prepare()`

#### Dart 侧承载骨架

```dart
@override
Widget buildView(int textureId) {
  if (Platform.isOhos) {
    return OhosView(
      viewType: 'ohos_video_player_view',
      creationParamsCodec: const StandardMessageCodec(),
      creationParams: {'textureId': textureId},
    );
  }
  return Texture(textureId: textureId);
}
```

#### ETS 端 PlatformView 骨架

```typescript
import {
  Any,
  PlatformView,
  PlatformViewFactory,
  StandardMessageCodec,
} from '@ohos/flutter_ohos';
import { Params } from '@ohos/flutter_ohos/src/main/ets/plugin/platform/PlatformView';
import common from '@ohos.app.ability.common';

export interface SurfaceReadyCallback {
  onSurfaceReady(playerId: number, surfaceId: string, controller: XComponentController): void;
  onSurfaceDestroyed(playerId: number, surfaceId: string): void;
}

@Builder
function buildVideoSurface(params: Params) {
  VideoSurfaceComponent({ platformView: params.platformView as OhosVideoPlatformView });
}

@Component
struct VideoSurfaceComponent {
  platformView: OhosVideoPlatformView | null = null;

  build() {
    if (this.platformView !== null) {
      XComponent(this.platformView.getXComponentOptions())
        .onLoad(() => {
          this.platformView?.onLoad();
        })
        .onDestroy(() => {
          this.platformView?.onDestroy();
        })
        .size({ width: '100%', height: '100%' });
    }
  }
}

export class OhosVideoPlatformView extends PlatformView {
  private readonly playerId: number;
  private readonly callback: SurfaceReadyCallback;
  private readonly controller: XComponentController = new XComponentController();
  private readonly options: XComponentOptions;
  private surfaceId: string = '';

  constructor(playerId: number, callback: SurfaceReadyCallback) {
    super();
    this.playerId = playerId;
    this.callback = callback;
    this.options = {
      type: XComponentType.SURFACE,
      controller: this.controller,
    };
  }

  getView(): WrappedBuilder<[Params]> {
    return wrapBuilder<[Params]>(buildVideoSurface);
  }

  getXComponentOptions(): XComponentOptions {
    return this.options;
  }

  onLoad(): void {
    this.surfaceId = this.controller.getXComponentSurfaceId();
    this.callback.onSurfaceReady(this.playerId, this.surfaceId, this.controller);
  }

  onDestroy(): void {
    this.callback.onSurfaceDestroyed(this.playerId, this.surfaceId);
  }
}

export class OhosVideoViewFactory extends PlatformViewFactory {
  private readonly callback: SurfaceReadyCallback;

  constructor(callback: SurfaceReadyCallback) {
    super(new StandardMessageCodec());
    this.callback = callback;
  }

  create(context: common.Context, viewId: number, args: Any): PlatformView {
    const creationParams = args as Map<string, Object>;
    const playerId = creationParams.get('textureId') as number;
    return new OhosVideoPlatformView(playerId, this.callback);
  }
}
```

#### 播放器实例骨架

```typescript
import { media } from '@kit.MediaKit';

export class VideoPlayerEntry {
  private player: media.AVPlayer;
  private currentState: media.AVPlayerState = 'idle';
  private primarySurfaceId: string = '';
  private currentUri: string = '';
  private pendingPlay: boolean = false;
  private pendingVolume: number = 1.0;

  constructor(player: media.AVPlayer) {
    this.player = player;
    this.player.on('stateChange', (state: media.AVPlayerState) => {
      this.currentState = state;
      if (state === 'prepared') {
        this.player.setVolume(this.pendingVolume);
        if (this.pendingPlay) {
          void this.player.play();
          this.pendingPlay = false;
        }
      }
    });
  }

  attachPrimarySurface(surfaceId: string): void {
    this.primarySurfaceId = surfaceId;
    if (this.currentState === 'initialized' && this.currentUri.length > 0) {
      void this.prepareIfPossible();
    }
  }

  async setDataSource(url: string): Promise<void> {
    this.currentUri = url;
    this.player.url = url;
    // wait until initialized, then wait until surface is ready
  }

  async prepareIfPossible(): Promise<void> {
    if (this.currentState !== 'initialized' || this.primarySurfaceId === '') {
      return;
    }
    this.player.surfaceId = this.primarySurfaceId;
    await this.player.prepare();
  }

  setVolume(volume: number): void {
    this.pendingVolume = volume;
    if (this.currentState === 'prepared' || this.currentState === 'playing' || this.currentState === 'paused') {
      this.player.setVolume(volume);
    }
  }

  async play(): Promise<void> {
    if (this.currentState === 'prepared' || this.currentState === 'paused' || this.currentState === 'completed') {
      await this.player.play();
      return;
    }
    this.pendingPlay = true;
  }
}
```

#### 插件入口注册

```typescript
binding.getPlatformViewRegistry()
  .registerViewFactory('ohos_video_player_view', new OhosVideoViewFactory(this));
```

关键点：

- `viewType` 必须和 Dart 侧逐字一致
- `surfaceId` 来自 `XComponentController.getXComponentSurfaceId()`
- 先 `url -> initialized`，再等 `surfaceReady`，最后 `prepare()`
- `setLooping / setVolume / setSpeed / play / seek` 在未 ready 时要先缓存，等 `prepared` 后再应用
- 如果视频插件也公开了 `seek` / `setSpeed`，要沿用同一套 pending 策略，并在需要完成时机时监听 `seekDone` / `speedDone`
- `XComponent` rebuild 或重建后，新的 `surfaceId` 必须重新绑定到同一个 `AVPlayer`
- `surfaceDestroyed` 时只能清理被销毁的那块 surface，不要把当前正在使用的新 surface 一并清掉
- 释放时一定 `player.release()`
- 如果 Dart 侧 `EventChannel` 是按实例名分流，如 `videoEvents{textureId}`，native 必须在 `create()` 时同步创建并注册对应通道，不能只建一个全局事件通道

### 3.4 如果原插件本来是 Texture 架构

很多视频插件原本就是 `Texture` 控制器模式，这时应沿用原语义：

- Dart 侧继续用 `Texture(textureId: ...)`
- ETS 端用 `TextureRegistry` 注册纹理，拿到 `textureId` 和 `surfaceId`
- `AVPlayer` 仍绑定 `surfaceId`
- 事件通道、方法参数、`textureId` 传递方式必须和 Dart 侧逐字一致，尤其是 `videoEvents{textureId}` 这类按实例分流的通道
- 若后续还要支持 HarmonyOS `PiP`，不要先选 `Texture` 再指望从 Texture 路径直接拿到 PiP 所需的 `XComponentController`

#### Dart 侧承载骨架

```dart
@override
Widget buildView(int textureId) {
  return Texture(textureId: textureId);
}
```

#### ETS 端 Texture 注册骨架

```typescript
import {
  BinaryMessenger,
  EventChannel,
  EventSink,
  FlutterPluginBinding,
  TextureRegistry,
} from '@ohos/flutter_ohos';
import { media } from '@kit.MediaKit';

export class OhosTextureVideoPlugin {
  private textureRegistry: TextureRegistry;
  private binaryMessenger: BinaryMessenger;
  private playerEntries: Map<number, VideoPlayerEntry> = new Map();
  private eventSinks: Map<number, EventSink> = new Map();

  constructor(binding: FlutterPluginBinding) {
    this.textureRegistry = binding.getTextureRegistry();
    this.binaryMessenger = binding.getBinaryMessenger();
  }

  async createPlayer(): Promise<Map<string, Object>> {
    const textureId = this.textureRegistry.getTextureId();
    const textureEntry = this.textureRegistry.registerTexture(textureId);
    const surfaceId = textureEntry.getSurfaceId().toString();

    const eventChannel = new EventChannel(
      this.binaryMessenger,
      'videoEvents' + textureId.toString()
    );
    eventChannel.setStreamHandler({
      onListen: (args: Object, events: EventSink): void => {
        this.eventSinks.set(textureId, events);
      },
      onCancel: (): void => {
        this.eventSinks.delete(textureId);
      },
    });

    const player = await media.createAVPlayer();
    const entry = new VideoPlayerEntry(textureId, player, surfaceId, this.eventSinks, textureEntry);
    this.playerEntries.set(textureId, entry);

    const result = new Map<string, Object>();
    result.set('textureId', textureId);
    return result;
  }
}
```

#### 播放器实例骨架

```typescript
import { EventSink, SurfaceTextureEntry, TextureRegistry } from '@ohos/flutter_ohos';
import { media } from '@kit.MediaKit';

export class VideoPlayerEntry {
  private readonly textureId: number;
  private readonly player: media.AVPlayer;
  private readonly surfaceId: string;
  private readonly eventSinks: Map<number, EventSink>;
  private readonly textureEntry: SurfaceTextureEntry;
  private currentState: media.AVPlayerState = 'idle';
  private pendingPlay: boolean = false;
  private pendingVolume: number = 1.0;

  constructor(
    textureId: number,
    player: media.AVPlayer,
    surfaceId: string,
    eventSinks: Map<number, EventSink>,
    textureEntry: SurfaceTextureEntry
  ) {
    this.textureId = textureId;
    this.player = player;
    this.surfaceId = surfaceId;
    this.eventSinks = eventSinks;
    this.textureEntry = textureEntry;

    this.player.on('stateChange', async (state: media.AVPlayerState) => {
      this.currentState = state;
      if (state === 'initialized') {
        this.player.surfaceId = this.surfaceId;
        await this.player.prepare();
      } else if (state === 'prepared') {
        this.player.setVolume(this.pendingVolume);
        if (this.pendingPlay) {
          await this.player.play();
          this.pendingPlay = false;
        }
        const event = new Map<string, Object>();
        event.set('event', 'initialized');
        event.set('duration', this.player.duration);
        event.set('width', this.player.width);
        event.set('height', this.player.height);
        this.eventSinks.get(this.textureId)?.success(event);
      }
    });
  }

  async setDataSource(url: string): Promise<void> {
    this.player.url = url;
  }

  async play(): Promise<void> {
    if (this.currentState === 'prepared' || this.currentState === 'paused' || this.currentState === 'completed') {
      await this.player.play();
      return;
    }
    this.pendingPlay = true;
  }

  setVolume(volume: number): void {
    this.pendingVolume = volume;
    if (this.currentState === 'prepared' || this.currentState === 'playing' || this.currentState === 'paused') {
      this.player.setVolume(volume);
    }
  }

  async release(textureRegistry: TextureRegistry): Promise<void> {
    await this.player.release();
    textureRegistry.unregisterTexture(this.textureId);
  }
}
```

关键点：

- OHOS `TextureRegistry` 路径优先使用 `getTextureId() + registerTexture(textureId)`；不要把废弃的 `createSurfaceTexture()` 当成主骨架
- `textureId` 更多是 Flutter 协议层的播放器实例标识，真实出画目标仍是 `surfaceId`；不要把两者混成同一个概念
- `surfaceId` 注册出来后应尽早绑定到 `AVPlayer`，但 `prepare()` 仍要等 `initialized`
- Dart 侧 `receiveBroadcastStream(...)` 若传了实例参数，native `onListen(args, events)` 必须逐字接住；若没传，也要保证每实例通道名逐字一致
- `dispose()` 时要释放 `AVPlayer`，并从 `TextureRegistry` 注销纹理；不要把 `SurfaceTextureEntry.release()` 当成主清理路径
- 如果 Flutter 侧会销毁重建同一个 Texture 视图，要重新检查 `textureId -> surfaceId` 是否仍有效

不要把原来的 Texture 插件强改成新的公开 Widget API。

---

### 3.5 PlatformView ↔ Plugin 静态 Registry 通信模式

当视频插件同时使用 `AVPlayer`（在 Plugin 中创建）和 `XComponent`（在 PlatformView 中持有）时，需要一个桥接机制让 Plugin 获取 PlatformView 持有的 `XComponentController` 和 `surfaceId`。

**问题**：Plugin 通过 `TextureRegistry` 分配 `textureId`，但 `XComponent` 和 `XComponentController` 生命周期属于 PlatformView。Plugin 无法直接访问 PlatformView 实例。

**解决方案**：使用静态 Registry 类作为 Plugin ↔ PlatformView 的通信桥接。

#### 架构模式

```
Plugin (creates AVPlayer, manages textureId)
  ↔ PipVideoViewRegistry (static class)
PlatformView (holds XComponentController, surface lifecycle)
```

#### Registry 实现

```typescript
type SurfaceReadyCallback = ((textureId: number, surfaceId: string) => void) | null;

export class PipVideoViewRegistry {
  private static views: Map<number, XxxVideoPlatformView> = new Map();
  private static surfaceCallback: SurfaceReadyCallback = null;
  public static latestTextureId: number = -1;

  static setLatestTextureId(tid: number): void {
    PipVideoViewRegistry.latestTextureId = tid;
  }

  static setSurfaceCallback(cb: SurfaceReadyCallback): void {
    PipVideoViewRegistry.surfaceCallback = cb;
  }

  static register(textureId: number, view: XxxVideoPlatformView): void {
    PipVideoViewRegistry.views.set(textureId, view);
  }

  static unregister(textureId: number): void {
    PipVideoViewRegistry.views.delete(textureId);
  }

  static getXComponentController(textureId: number): XComponentController | null {
    const view = PipVideoViewRegistry.views.get(textureId);
    if (view !== undefined) {
      return view.getXComponentController();
    }
    return null;
  }

  static onSurfaceReady(textureId: number, surfaceId: string): void {
    if (PipVideoViewRegistry.surfaceCallback !== null) {
      PipVideoViewRegistry.surfaceCallback(textureId, surfaceId);
    }
  }
}
```

#### PlatformView 侧

```typescript
export class XxxVideoPlatformView extends PlatformView {
  private textureId: number = -1;
  private xComponentController: XComponentController = new XComponentController();

  constructor(context: common.Context, viewId: number, args: Object) {
    super();
    if (args !== null && args !== undefined) {
      const params = args as Record<string, Object>;
      const tid = params['textureId'];
      if (tid !== undefined && tid !== null) {
        this.textureId = Number(tid);
      }
    }
    if (this.textureId < 0) {
      this.textureId = PipVideoViewRegistry.latestTextureId;
    }
    PipVideoViewRegistry.register(this.textureId, this);
  }

  getXComponentController(): XComponentController {
    return this.xComponentController;
  }

  getTextureId(): number {
    return this.textureId;
  }

  dispose(): void {
    PipVideoViewRegistry.unregister(this.textureId);
  }
}
```

XComponent `onLoad` 时通知 Registry：

```typescript
@Component
struct XxxVideoComponent {
  @ObjectLink params: Params;

  build() {
    Column() {
      XComponent({
        type: XComponentType.SURFACE,
        controller: this.getPlatformView().getXComponentController()
      })
        .onLoad(() => {
          const surfaceId = this.getPlatformView().getXComponentController()
            .getXComponentSurfaceId();
          const textureId = this.getPlatformView().getTextureId();
          PipVideoViewRegistry.onSurfaceReady(textureId, surfaceId);
        })
        .width('100%')
        .height('100%')
    }
  }

  private getPlatformView(): XxxVideoPlatformView {
    return this.params.platformView as XxxVideoPlatformView;
  }
}
```

#### Plugin 侧

```typescript
onAttachedToEngine(binding: FlutterPluginBinding): void {
  binding.getPlatformViewRegistry()
    .registerViewFactory('com.example/video_player', new XxxViewFactory());
  
  PipVideoViewRegistry.setSurfaceCallback((textureId: number, surfaceId: string) => {
    this.onXComponentSurfaceReady(textureId, surfaceId);
  });
}

private async handleCreate(call: MethodCall, result: MethodResult): Promise<void> {
  const textureId = this.textureRegistry.getTextureId();
  const entry = this.textureRegistry.registerTexture(textureId);
  // ...
  PipVideoViewRegistry.setLatestTextureId(textureId);
  // ...
}
```

关键点：

- Registry 必须是**静态类**（ArkTS 中用 `static` 方法和属性），不能是实例对象
- `latestTextureId` 作为 creationParams 解析失败的 fallback，因为 `StandardMessageCodec` 将 Dart `Map<String, dynamic>` 解码为 ArkTS `Record<string, Object>` 时，数值类型可能在 key 访问时返回 `undefined`
- `setSurfaceCallback` 在 `onDetachedFromEngine` 时必须设为 `null`，防止内存泄漏
- PlatformView `dispose` 时必须从 Registry 注销，避免引用过期实例
- `getXComponentController` 是 PiP 等高级功能的必要入口——`PiPWindow.create()` 要求传入 `XComponentController`

### 3.6 PiP（画中画）实现

#### 前置条件

- 视频渲染使用 `PlatformView + XComponent(SURFACE)`（不能是 Texture）
- 插件实现 `AbilityAware`，获取 `UIAbilityContext`（`PiPWindow.create` 要求 `UIAbilityContext`，不接受 `ApplicationContext`）
- `module.json5` 中无需额外声明 PiP 专属权限

#### PiPWindow API 要点

```typescript
import PiPWindow from '@ohos.PiPWindow';
```

| API | 说明 |
|-----|------|
| `PiPWindow.isPiPEnabled()` | 静态方法，检查设备是否支持 PiP |
| `PiPWindow.create(config)` | 创建 PiP 控制器，返回 `PiPController` |
| `pipController.startPiP()` | 启动画中画 |
| `pipController.stopPiP()` | 停止画中画 |

#### PiPConfiguration

```typescript
const config: PiPWindow.PiPConfiguration = {
  context: context,                    // UIAbilityContext（必须）
  componentController: xcController,   // XComponentController（必须）
  templateType: PiPWindow.PiPTemplateType.VIDEO_PLAY,
  controlGroups: [PiPWindow.VideoPlayControlGroup.VIDEO_PREVIOUS_NEXT],
};
const pipController: PiPWindow.PiPController = await PiPWindow.create(config);
```

- `context`：必须是 `UIAbilityContext`，不能是 `ApplicationContext`。通过 `AbilityAware.onAttachedToAbility` 获取
- `componentController`：来自 PlatformView 的 `XComponentController`，通过静态 Registry 获取
- `templateType`：视频播放场景使用 `PiPTemplateType.VIDEO_PLAY`

#### 完整 PiP 实现骨架

```typescript
class VideoPlayerEntry {
  pipController: PiPWindow.PiPController | null = null;
  isPipActive: boolean = false;
  // ...
}

async handleEnablePiP(textureId: number): Promise<void> {
  const entry = this.playerEntries.get(textureId);
  if (entry === undefined) return;
  if (entry.pipController !== null && entry.isPipActive) return;

  const context = this.context; // UIAbilityContext from AbilityAware
  if (context === null) {
    throw new Error('UIAbilityContext not available');
  }

  const xcController = PipVideoViewRegistry.getXComponentController(textureId);
  if (xcController === null) {
    throw new Error('XComponentController not available');
  }

  if (!PiPWindow.isPiPEnabled()) {
    throw new Error('PiP not enabled on this device');
  }

  const config: PiPWindow.PiPConfiguration = {
    context: context,
    componentController: xcController,
    templateType: PiPWindow.PiPTemplateType.VIDEO_PLAY,
    controlGroups: [PiPWindow.VideoPlayControlGroup.VIDEO_PREVIOUS_NEXT],
  };

  const pipController = await PiPWindow.create(config);

  pipController.on('stateChange', (state: PiPWindow.PiPState, reason: string) => {
    if (state === PiPWindow.PiPState.STARTED) {
      entry.isPipActive = true;
    } else if (state === PiPWindow.PiPState.STOPPED || state === PiPWindow.PiPState.ABOUT_TO_RESTORE) {
      entry.isPipActive = false;
      entry.pipController = null;
    } else if (state === PiPWindow.PiPState.ERROR) {
      entry.isPipActive = false;
      entry.pipController = null;
    }
  });

  pipController.on('controlPanelActionEvent', (event: PiPWindow.PiPActionEventType, status?: number) => {
    if (event === 'playbackStateChanged') {
      if (status === PiPWindow.PiPControlStatus.PLAY) {
        entry.play();
      } else {
        entry.pause();
      }
    }
  });

  entry.pipController = pipController;
  await pipController.startPiP();
  entry.isPipActive = true;
}

async handleDisablePiP(textureId: number): Promise<void> {
  const entry = this.playerEntries.get(textureId);
  if (entry === undefined || entry.pipController === null || !entry.isPipActive) return;

  await entry.pipController.stopPiP();
  entry.isPipActive = false;
  entry.pipController = null;
}

handleIsPiPSupported(): boolean {
  try {
    return PiPWindow.isPiPEnabled();
  } catch {
    return false;
  }
}
```

关键点：

- PiP 使用**同一个 AVPlayer**，只是切换了渲染窗口。不需要创建第二个播放器实例
- `startPiP()` 后，系统会自动将 XComponent 的 SURFACE 内容显示在 PiP 小窗中
- `controlPanelActionEvent` 处理 PiP 小窗上的播控按钮（播放/暂停），需要映射到 AVPlayer 的 `play()`/`pause()`
- PiP 停止后（`STOPPED` 或 `ABOUT_TO_RESTORE` 状态），需要清理 `pipController` 引用
- `onDetachedFromEngine` 时，如果有活跃的 PiP，要先 `stopPiP()` 再释放播放器
- `PiPWindow.create()` 可能抛出异常（设备不支持、窗口冲突等），必须 try-catch

第四部分：Flutter 适配注意事项

### 4.1 不要新造公开 API
- 要保持原插件已有的 controller、stream、callback、widget 语义

### 4.2 视频插件要保留“视图型”语义

- 如果原插件是 `VideoPlayerController + VideoPlayer(widget)`，HarmonyOS 侧也要能嵌入视频画面
- 不能偷懒改成“只返回播放成功”

### 4.3 音频插件优先保留“控制器型”语义

- 音频插件一般不需要 `PlatformView`
- 重点是播控、状态回调、进度、buffer、速度、循环、后台播放

### 4.4 后台播放是组合能力

- 音频后台播放：`AVPlayer/AudioRenderer` + `AVSession`
- 视频前台播放：通常只需 `AVPlayer`
- 视频后台继续播/播控中心/锁屏控制：再加 `AVSession`

### 4.5 不要把普通播放和 PiP 做成两套互相打架的主链路

- 若 HarmonyOS 侧必须同时支持普通播放和 `PiP`，优先先定一条主渲染路径，再规划 surface 切换
- 不要先让普通播放走一套、`PiP` 再临时补另一套完全独立的播放器链路
- 更推荐“一套 `AVPlayer` + 两个阶段的 surface 绑定”，而不是“两套播放器内核”

### 4.6 视频类插件生成时的最低自检项

- Dart 侧视频 Widget 是否会在播放器未 `initialized` 时就先挂出承载视图；若不会，需警惕与 native 等 surface 的互锁
- OHOS 侧是否实现了 `AbilityAware`；若涉及 `PiP`、窗口、`UIContext`、主窗口获取，通常不能只靠 `ApplicationContext`
- 每实例事件通道是否真正注册，Dart `receiveBroadcastStream(...)` 是否把实例参数逐字传到 native
- `surfaceCreated / surfaceDestroyed / rebuild / dispose` 是否都接到了播放器重绑或清理逻辑

### 4.7 URL源播放音视频注意
如果原 Example 中使用了 googleapis.com 的测试地址，由于国内网络原因，一定播放失败。请修改为如下测试地址：
视频：https://media.w3.org/2010/05/sintel/trailer.mp4
音频：http://music.163.com/song/media/outer/url?id=447925558.mp3

## 补充说明

- 更多 API 用法需要查询官方文档。
