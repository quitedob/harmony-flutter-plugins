# 外接纹理插件鸿蒙适配

## 适用条件

- 插件使用 `Texture` widget 显示原生渲染内容
- 典型场景：视频播放器、相机预览、自定义渲染

---

## 第一部分：工程搭建

### 工程创建

```bash
flutter create -t plugin --platforms ohos .
```

### 目录结构

```
ohos/src/main/ets/components/plugin/
├── XxxPlugin.ets           # 插件主入口（MethodChannel + TextureRegistry）
└── XxxPlayer.ets           # 播放器/渲染器管理类（可选，拆分逻辑）
```

### 配置要点

> `ohos/` 目录由 `flutter create -t plugin --platforms ohos .` 自动生成。本部分只描述对生成结果的自定义配置。**不要手动创建 `build-profile.json5`、`hvigorfile.ts`、`module.json5` 等配置文件。**

**oh-package.json5 — 添加三方依赖（按需）**

视频/相机类插件可能需要添加多媒体相关 ohpm 三方包到 `ohos/oh-package.json5` 的 `dependencies` 中。

> **`@ohos/flutter_ohos` 依赖由 Flutter 构建工具自动注入，无需手动添加。** 如果 `flutter create` 生成了 `"@ohos/flutter_ohos": "file:./libs/flutter.har"`，**必须将其移除**（将 dependencies 设为 `{}`），否则会导致 `Failed to resolve OhmUrl` 编译错误。

**权限配置**（`module.json5`，视功能而定）：
```json5
{
  "module": {
    "requestPermissions": [
      { "name": "ohos.permission.CAMERA" },
      { "name": "ohos.permission.MICROPHONE" },
      { "name": "ohos.permission.INTERNET" }
    ]
  }
}
```

---

## 第二部分：编码实现

### 核心概念

外接纹理的工作原理：
1. ETS 端通过 `TextureRegistry` 先申请 `textureId`
2. 再用 `registerTexture(textureId)` 注册纹理，拿到 `SurfaceTextureEntry`
3. 从 `SurfaceTextureEntry` 获取 `surfaceId`，交给原生渲染器
4. Dart 端用 `Texture(textureId: id)` widget 显示
5. 销毁时通过 `TextureRegistry.unregisterTexture(textureId)` 注销纹理

### 完整插件骨架

```ets
import {
  BinaryMessenger,
  FlutterPlugin,
  FlutterPluginBinding,
  MethodCall,
  MethodCallHandler,
  MethodChannel,
  MethodResult,
  SurfaceTextureEntry,
  TextureRegistry,
} from '@ohos/flutter_ohos';

export default class XxxPlugin implements FlutterPlugin, MethodCallHandler {
  private channel: MethodChannel | null = null;
  private binaryMessenger: BinaryMessenger | null = null;
  private textureRegistry: TextureRegistry | null = null;
  private textureEntries: Map<number, SurfaceTextureEntry> = new Map();

  onAttachedToEngine(binding: FlutterPluginBinding): void {
    this.textureRegistry = binding.getTextureRegistry();
    this.binaryMessenger = binding.getBinaryMessenger();
    this.channel = new MethodChannel(this.binaryMessenger, 'channel_name');
    this.channel.setMethodCallHandler(this);
  }

  onDetachedFromEngine(binding: FlutterPluginBinding): void {
    this.textureEntries.forEach((entry: SurfaceTextureEntry, textureId: number) => {
      this.releaseNativeRenderer(textureId);
      if (this.textureRegistry !== null) {
        this.textureRegistry.unregisterTexture(textureId);
      }
    });
    this.textureEntries.clear();

    this.channel?.setMethodCallHandler(null);
    this.channel = null;
    this.binaryMessenger = null;
    this.textureRegistry = null;
  }

  onMethodCall(call: MethodCall, result: MethodResult): void {
    switch (call.method) {
      case 'create':
        this.handleCreate(call, result);
        break;
      case 'dispose':
        this.handleDispose(call, result);
        break;
      case 'play':
        this.handlePlay(call, result);
        break;
      case 'pause':
        this.handlePause(call, result);
        break;
      default:
        result.notImplemented();
        break;
    }
  }

  private async handleCreate(call: MethodCall, result: MethodResult): Promise<void> {
    if (this.textureRegistry === null) {
      result.error('NOT_INITIALIZED', 'TextureRegistry is null', null);
      return;
    }

    try {
      const textureId = this.textureRegistry.getTextureId();
      const entry = this.textureRegistry.registerTexture(textureId);
      const surfaceId = entry.getSurfaceId().toString();

      this.textureEntries.set(textureId, entry);

      // 将 surfaceId 传给原生播放器/相机
      await this.initNativeRenderer(textureId, surfaceId, call);

      const resultMap = new Map<string, Object>();
      resultMap.set('textureId', textureId);
      result.success(resultMap);
    } catch (err) {
      result.error('CREATE_ERROR', (err as Error).message, null);
    }
  }

  private async handleDispose(call: MethodCall, result: MethodResult): Promise<void> {
    const textureId = call.argument('textureId') as number;
    if (this.textureEntries.has(textureId)) {
      this.releaseNativeRenderer(textureId);
      if (this.textureRegistry !== null) {
        this.textureRegistry.unregisterTexture(textureId);
      }
      this.textureEntries.delete(textureId);
    }
    result.success(null);
  }

  private async initNativeRenderer(textureId: number, surfaceId: string, call: MethodCall): Promise<void> {
    // 子类或具体实现中初始化原生渲染器
  }

  private releaseNativeRenderer(textureId: number): void {
    // 子类或具体实现中释放原生渲染器
  }

  private handlePlay(call: MethodCall, result: MethodResult): void {
    result.notImplemented();
  }

  private handlePause(call: MethodCall, result: MethodResult): void {
    result.notImplemented();
  }
}
```

### 视频播放器实现

```ets
import { media } from '@kit.MediaKit';

export default class VideoPlayerPlugin implements FlutterPlugin, MethodCallHandler {
  private players: Map<number, media.AVPlayer> = new Map();
  // ... textureRegistry、channel 等与骨架相同

  private async handleCreate(call: MethodCall, result: MethodResult): Promise<void> {
    if (this.textureRegistry === null) {
      result.error('NOT_INITIALIZED', 'TextureRegistry is null', null);
      return;
    }

    try {
      const textureId = this.textureRegistry.getTextureId();
      const entry = this.textureRegistry.registerTexture(textureId);
      const surfaceId = entry.getSurfaceId().toString();
      this.textureEntries.set(textureId, entry);

      const avPlayer = await media.createAVPlayer();
      this.players.set(textureId, avPlayer);

      avPlayer.on('stateChange', async (state: media.AVPlayerState) => {
        if (state === 'initialized') {
          avPlayer.surfaceId = surfaceId;
          await avPlayer.prepare();
        }
      });

      const url = call.argument('url') as string;
      avPlayer.url = url;

      const resultMap = new Map<string, Object>();
      resultMap.set('textureId', textureId);
      result.success(resultMap);
    } catch (err) {
      result.error('CREATE_ERROR', (err as Error).message, null);
    }
  }

  private async handlePlay(call: MethodCall, result: MethodResult): Promise<void> {
    const textureId = call.argument('textureId') as number;
    const player = this.players.get(textureId);
    if (player !== undefined) {
      await player.play();
      result.success(null);
    } else {
      result.error('NOT_FOUND', 'Player not found', null);
    }
  }

  private async handlePause(call: MethodCall, result: MethodResult): Promise<void> {
    const textureId = call.argument('textureId') as number;
    const player = this.players.get(textureId);
    if (player !== undefined) {
      await player.pause();
      result.success(null);
    } else {
      result.error('NOT_FOUND', 'Player not found', null);
    }
  }

  private async handleDispose(call: MethodCall, result: MethodResult): Promise<void> {
    const textureId = call.argument('textureId') as number;

    const player = this.players.get(textureId);
    if (player !== undefined) {
      await player.release();
      this.players.delete(textureId);
    }

    if (this.textureEntries.has(textureId)) {
      if (this.textureRegistry !== null) {
        this.textureRegistry.unregisterTexture(textureId);
      }
      this.textureEntries.delete(textureId);
    }

    result.success(null);
  }
}
```

### 相机预览实现骨架

```ets
import camera from '@ohos.multimedia.camera';

private async handleCreateCamera(call: MethodCall, result: MethodResult): Promise<void> {
  if (this.textureRegistry === null) {
    result.error('NOT_INITIALIZED', 'TextureRegistry is null', null);
    return;
  }

  try {
    const textureId = this.textureRegistry.getTextureId();
    const entry = this.textureRegistry.registerTexture(textureId);
    const surfaceId = entry.getSurfaceId().toString();
    this.textureEntries.set(textureId, entry);

    const cameraManager = camera.getCameraManager(this.context!);
    const cameras = cameraManager.getSupportedCameras();
    if (cameras.length === 0) {
      result.error('NO_CAMERA', 'No camera available', null);
      return;
    }

    const cameraDevice = cameras[0];
    const sceneMode = camera.SceneMode.NORMAL_PHOTO;
    const cameraInput = cameraManager.createCameraInput(cameraDevice);
    await cameraInput.open();

    const outputCapability = cameraManager.getSupportedOutputCapability(cameraDevice, sceneMode);
    // 示例里直接取一个可用 profile；真实项目要按分辨率、比例、像素格式再筛一层。
    const previewProfile = outputCapability.previewProfiles[0];
    const previewOutput = cameraManager.createPreviewOutput(previewProfile, surfaceId);

    const session = cameraManager.createSession(sceneMode);
    session.beginConfig();
    session.addInput(cameraInput);
    session.addOutput(previewOutput);
    await session.commitConfig();
    await session.start();

    const resultMap = new Map<string, Object>();
    resultMap.set('textureId', textureId);
    result.success(resultMap);
  } catch (err) {
    result.error('CAMERA_ERROR', (err as Error).message, null);
  }
}
```

### SurfaceTextureEntry 生命周期管理

**关键原则**：Texture 主清理路径是 `TextureRegistry.unregisterTexture(textureId)`，不要把 `SurfaceTextureEntry.release()` 当成主骨架。

```
创建: textureRegistry.getTextureId() + registerTexture(textureId)
  ↓
使用: textureId → Dart, entry.getSurfaceId() → 原生渲染器
  ↓
释放: textureRegistry.unregisterTexture(textureId)（用户主动 dispose 或插件卸载时）
```

**多纹理管理**：如果插件支持同时创建多个纹理实例（如多个视频播放器），用 Map 按 textureId 管理：

```ets
private textureEntries: Map<number, SurfaceTextureEntry> = new Map();
private players: Map<number, media.AVPlayer> = new Map();

// 创建时存入
this.textureEntries.set(textureId, entry);
this.players.set(textureId, avPlayer);

// 销毁时清理
this.players.get(textureId)?.release();
this.textureRegistry?.unregisterTexture(textureId);
this.players.delete(textureId);
this.textureEntries.delete(textureId);

// 插件卸载时全部清理
onDetachedFromEngine(binding: FlutterPluginBinding): void {
  this.players.forEach((player: media.AVPlayer) => { player.release(); });
  this.textureEntries.forEach((entry: SurfaceTextureEntry, textureId: number) => {
    this.textureRegistry?.unregisterTexture(textureId);
  });
  this.players.clear();
  this.textureEntries.clear();
}
```

### 参考文档

通过 Skill 检索「外接纹理适配」「Flutter OHOS 外接纹理」获取详细实现说明。

---

## 第三部分：常见编译错误与修复

### 1. `Cannot find module '@ohos.multimedia.media'`

**原因**：多媒体模块导入路径可能因 SDK 版本而异。

**修复**：
- 确认 SDK 版本是否支持该模块
- 尝试 Kit 导入：`import { media } from '@kit.MediaKit'`
- 通过 `harmonyos-sdk-api-lookup` 确认正确的导入路径

### 2. `Property 'createSurfaceTexture' does not exist on type 'TextureRegistry'`

**原因**：使用了旧骨架。当前主路径不应再依赖 `createSurfaceTexture()`。

**修复**：改为：
```ets
const textureId = this.textureRegistry.getTextureId();
const entry = this.textureRegistry.registerTexture(textureId);
const surfaceId = entry.getSurfaceId().toString();
```

如果还同时报 `Property 'id' does not exist on type 'SurfaceTextureEntry'`，同样说明还在沿用旧样例。

### 3. `Type 'number' is not assignable to type 'string'`（surfaceId）

**原因**：`getSurfaceId()` 返回 number，但部分 API 需要 string。

**修复**：显式转换：
```ets
const surfaceId = entry.getSurfaceId().toString();
```

### 4. `Property 'getBinaryMessenger' does not exist on type 'MethodChannel'`

**原因**：`BinaryMessenger` 应从 `FlutterPluginBinding` 获取并保存，不能再从 `MethodChannel` 反取。

**修复**：
```ets
private binaryMessenger: BinaryMessenger | null = null;

onAttachedToEngine(binding: FlutterPluginBinding): void {
  this.binaryMessenger = binding.getBinaryMessenger();
  this.channel = new MethodChannel(this.binaryMessenger, 'channel_name');
}
```

### 5. `Object is possibly 'null'`（textureRegistry）

**原因**：`textureRegistry` 声明为可空类型。

**修复**：在使用前断言非空或检查：
```ets
if (this.textureRegistry === null) {
  result.error("NOT_INITIALIZED", "TextureRegistry is null", null);
  return;
}
const textureId = this.textureRegistry.getTextureId();
const entry = this.textureRegistry.registerTexture(textureId);
```
不要默认使用非空断言把真实初始化问题压过去。

### 6. `Property 'id' does not exist on type 'SurfaceTextureEntry'`

**原因**：当前 `SurfaceTextureEntry` 不应再通过 `entry.id()` 反查纹理 id。

**修复**：`textureId` 应来自 `TextureRegistry.getTextureId()`，不要从 `SurfaceTextureEntry` 读取。

### 7. AVPlayer 状态机错误

**原因**：AVPlayer 有严格的状态机，不能在错误状态调用方法（如未 prepare 就 play）。

**修复**：遵循 AVPlayer 状态流转：
```
idle → initialized → prepared → playing ↔ paused → stopped → released
```
- `url/fdSrc` 赋值后自动进入 `initialized`
- 调用 `prepare()` 后进入 `prepared`
- 调用 `play()` 后进入 `playing`
- 必须在正确状态调用对应方法

### 8. 相机权限导致编译后运行崩溃

**原因**：`ohos.permission.CAMERA` 是 `user_grant` 权限，需要运行时申请。

**修复**：
- `module.json5` 中声明权限
- 在使用相机前动态申请权限（通过 `harmonyos-docs-lookup` 检索「申请权限」和鸿蒙权限文档）
- 编译不会报错，但运行时不申请权限会导致 API 调用失败

### 9. `forEach` 回调参数类型不匹配

**原因**：ArkTS 的 `Map.forEach` 回调参数顺序和类型要求严格。

**修复**：
```ets
// Map<number, SurfaceTextureEntry> 的 forEach
this.textureEntries.forEach((value: SurfaceTextureEntry, key: number) => {
  this.textureRegistry?.unregisterTexture(key);
});
```
