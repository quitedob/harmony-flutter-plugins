# 华为 AVSession Kit（音视频会话服务）集成指导

## 第一部分：华为 AVSession Kit API 映射

### 核心 API 概览

| 功能 | 华为 AVSession Kit API | 模块 | 说明 |
|------|----------------------|------|------|
| 创建会话 | `avSession.createAVSession()` | `@kit.AVSessionKit` | 创建媒体会话 |
| 设置元数据 | `avSession.setAVMetadata()` | `@kit.AVSessionKit` | 设置媒体信息 |
| 设置播放状态 | `avSession.setAVPlaybackState()` | `@kit.AVSessionKit` | 设置播放状态 |
| 注册控制命令 | `avSession.on('play')` | `@kit.AVSessionKit` | 监听播放控制 |
| 销毁会话 | `avSession.destroy()` | `@kit.AVSessionKit` | 销毁会话 |

### 后台音频能力

| 功能 | 说明 |
|------|------|
| 后台播放 | 应用在后台时继续播放音频 |
| 锁屏控制 | 在锁屏界面显示媒体控制器 |
| 耳机控制 | 响应耳机按键事件 |
| 蓝牙控制 | 响应蓝牙设备控制 |

---

## 第二部分：ETS 代码模板

### 2.1 导入和类型定义

```typescript
import { avSession } from '@kit.AVSessionKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { common } from '@kit.AbilityKit';
```

### 2.2 AVSession 服务类

```typescript
// ohos/src/main/ets/services/AVSessionService.ets

import { avSession, AVMetadata, AVPlaybackState } from '@kit.AVSessionKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { common } from '@kit.AbilityKit';

const TAG = '[AVSessionService]';
const DOMAIN = 0xFF00;

export class HuaweiAVSessionService {
  private static instance: HuaweiAVSessionService;
  private session: avSession.AVSession | null = null;
  private context: common.UIAbilityContext | null = null;

  static getInstance(): HuaweiAVSessionService {
    if (!HuaweiAVSessionService.instance) {
      HuaweiAVSessionService.instance = new HuaweiAVSessionService();
    }
    return HuaweiAVSessionService.instance;
  }

  setContext(context: common.UIAbilityContext): void {
    this.context = context;
  }

  // 创建 AVSession
  async createSession(sessionTag: string = 'MusicPlayer'): Promise<boolean> {
    if (this.session) {
      hilog.warn(DOMAIN, TAG, 'Session already exists');
      return true;
    }

    try {
      this.session = await avSession.createAVSession(this.context, sessionTag, 'audio');

      // 设置会话激活状态
      await this.session.activate();
      hilog.info(DOMAIN, TAG, 'AVSession created and activated');

      // 注册控制命令监听
      this.setupControlCommands();

      return true;
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      hilog.error(DOMAIN, TAG, 'Failed to create AVSession: %{public}s', err.message);
      return false;
    }
  }

  // 设置媒体元数据
  async setMetadata(metadata: {
    title?: string;
    artist?: string;
    album?: string;
    duration?: number;
    mediaImage?: string;
  }): Promise<boolean> {
    if (!this.session) {
      hilog.error(DOMAIN, TAG, 'Session not created');
      return false;
    }

    try {
      const avMetadata: AVMetadata = {
        assetId: Date.now().toString(),
        title: metadata.title,
        artist: metadata.artist,
        album: metadata.album,
        duration: metadata.duration,
        mediaImage: metadata.mediaImage ? { uri: metadata.mediaImage } : undefined,
      };

      await this.session.setAVMetadata(avMetadata);
      hilog.info(DOMAIN, TAG, 'Metadata set: %{public}s', metadata.title ?? 'Unknown');
      return true;
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      hilog.error(DOMAIN, TAG, 'Failed to set metadata: %{public}s', err.message);
      return false;
    }
  }

  // 设置播放状态
  async setPlaybackState(state: {
    isPlaying: boolean;
    position: number;
    speed: number;
    bufferedTime: number;
  }): Promise<boolean> {
    if (!this.session) {
      return false;
    }

    try {
      const playbackState: AVPlaybackState = {
        state: state.isPlaying ? avSession.PlaybackState.PLAYBACK_STATE_PLAY : avSession.PlaybackState.PLAYBACK_STATE_PAUSE,
        position: { elapsedTime: state.position, updateTime: Date.now() },
        speed: state.speed,
        bufferedTime: state.bufferedTime,
      };

      await this.session.setAVPlaybackState(playbackState);
      return true;
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      hilog.error(DOMAIN, TAG, 'Failed to set playback state: %{public}s', err.message);
      return false;
    }
  }

  // 注册控制命令监听
  private setupControlCommands(): void {
    if (!this.session) return;

    // 播放命令
    this.session.on('play', () => {
      hilog.info(DOMAIN, TAG, 'Received play command');
      // 在此转发到插件现有的通道、回调或播放器控制逻辑
    });

    // 暂停命令
    this.session.on('pause', () => {
      hilog.info(DOMAIN, TAG, 'Received pause command');
      // 在此转发到插件现有的通道、回调或播放器控制逻辑
    });

    // 下一首命令
    this.session.on('playNext', () => {
      hilog.info(DOMAIN, TAG, 'Received playNext command');
      // 在此转发到插件现有的通道、回调或播放器控制逻辑
    });

    // 上一首命令
    this.session.on('playPrevious', () => {
      hilog.info(DOMAIN, TAG, 'Received playPrevious command');
      // 在此转发到插件现有的通道、回调或播放器控制逻辑
    });

    // 快进命令
    this.session.on('fastForward', () => {
      hilog.info(DOMAIN, TAG, 'Received fastForward command');
      // 在此转发到插件现有的通道、回调或播放器控制逻辑
    });

    // 快退命令
    this.session.on('rewind', () => {
      hilog.info(DOMAIN, TAG, 'Received rewind command');
      // 在此转发到插件现有的通道、回调或播放器控制逻辑
    });

    // 停止命令
    this.session.on('stop', () => {
      hilog.info(DOMAIN, TAG, 'Received stop command');
      // 在此转发到插件现有的通道、回调或播放器控制逻辑
    });
  }

  // 销毁会话
  async destroySession(): Promise<void> {
    if (this.session) {
      try {
        await this.session.deactivate();
        await this.session.destroy();
        this.session = null;
        hilog.info(DOMAIN, TAG, 'AVSession destroyed');
      } catch (error) {
        const err: BusinessError = error as BusinessError;
        hilog.error(DOMAIN, TAG, 'Failed to destroy session: %{public}s', err.message);
      }
    }
  }

  // 检查会话是否活跃
  isSessionActive(): boolean {
    return this.session !== null;
  }
}
```

说明：

- `AVSession` 的接入重点是会话创建、元数据、播放状态和控制命令注册。
- 实际插件入口、`MethodChannel` / `EventChannel` 名称、Dart API 和返回结构，必须以原插件源码为准，不要照着这里新造固定通道或固定 facade。
- 一个 `UIAbility` 只能存在一个媒体会话；后台播放期间应持有长生命周期的 `AVSession` 实例，不要只用局部变量临时保存。

---

## 第三部分：配置文件修改

### 3.1 后台播放注意事项

- `AVSession` 本身不是运行时权限能力。
- 应用需要后台播放时，官方要求同时接入 `AVSession` 和长时任务；后台音频/视频类场景应申请 `AUDIO_PLAYBACK` 类型长时任务。
- 长时任务的申请、取消和配置方式请按官方“长时任务(ArkTS)”文档处理。

## 补充说明

- 更多 API 用法需要查询官方文档。

