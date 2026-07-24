# OHOS API 常见陷阱

> 本文件汇集 HarmonyOS API 在 Flutter 插件适配中容易踩坑的场景。这些问题通常不会导致编译失败，但会导致运行时功能异常（无声、卡死、回环、行为不符合预期等），是真机调试中最常见的问题来源。
> **使用时机**：在 `ohos-coding-guide` 主 Skill 编码阶段，如果插件涉及以下场景，必须阅读对应章节并遵循规则。

---

## 1. 音频 — SoundPool

### 1.1 SoundPool.play() 必须显式传入 PlayParameters 和音量

**陷阱**：SoundPool.play() 不传 PlayParameters 或不设置 leftVolume/rightVolume 时，默认音量可能为 0，表现为"播放成功、回调正常触发，但设备无声音输出"。这个问题极难排查，因为所有 API 调用层面都返回成功。

**正确做法**：

```ets
import { media } from '@kit.MediaKit';
import { audio } from '@kit.AudioKit';

// 创建 SoundPool 时指定音频流类型
const audioRendererInfo: audio.AudioRendererInfo = {
  usage: audio.StreamUsage.STREAM_USAGE_MUSIC,
  rendererFlags: 0
};
const soundPool = await media.createSoundPool(1, audioRendererInfo);

// 播放时必须显式设置音量
const playParams: media.PlayParameters = {
  loop: 0,        // 不循环
  rate: 1,        // 正常速度
  leftVolume: 1.0,   // 左声道音量（0.0-1.0）
  rightVolume: 1.0,  // 右声道音量（0.0-1.0）
  priority: 0        // 正常优先级
};

// 使用 callback 形式（见 1.2）
soundPool.play(soundId, playParams, (error, streamId) => {
  if (error) {
    hilog.error(LOG_DOMAIN, LOG_TAG, 'play failed: %{public}s', error.message);
  } else {
    hilog.debug(LOG_DOMAIN, LOG_TAG, 'play streamId: %{public}d', streamId);
  }
});
```

**禁止**：`soundPool.play(soundId)` — 不传 PlayParameters 会导致静音播放。

### 1.2 SoundPool API 优先使用 callback 形式

**陷阱**：SoundPool 的 Promise 形式（`await soundPool.play(...)`）和 callback 形式在 HarmonyOS 上行为存在差异。Promise 形式可能出现播放不稳定的情况。

**正确做法**：优先使用 callback 形式调用 SoundPool.play()、SoundPool.load() 等方法：

```ets
// ✅ 推荐：callback 形式
soundPool.play(soundId, playParams, (error, streamId) => { ... });

// ⚠️ 不推荐：Promise 形式（可能不稳定）
// const streamId = await soundPool.play(soundId, playParams);
```


### 1.3 `load()` 成功不等于“已经可以播放”

**陷阱**：`soundPool.load(...)` 的 callback / Promise 只表示“已经拿到了 `soundId`”，不表示底层资源已经完成解码和装载。
如果插件把 `load()` 成功直接当成“已加载完成”，随后立刻 `play()`，常见现象就是：

- `soundID(...) has not been loaded completely`
- `play sound failed`
- Dart 方法返回成功，但设备没有声音

**正确做法**：必须监听 `on('loadComplete')`，只有收到该回调后，才把对应音效标记为真正可播。

```ets
private loadedFlags: Map<string, boolean> = new Map();
private soundNamesById: Map<number, string> = new Map();

soundPool.on('loadComplete', (soundId: number) => {
  const soundName = this.soundNamesById.get(soundId);
  if (soundName !== undefined) {
    this.loadedFlags.set(soundName, true);
  }
});

soundPool.load(fd, offset, length, (error, soundId) => {
  if (!error) {
    this.soundNamesById.set(soundId, 'shutter');
    // 这里只是拿到 soundId，还不能立刻 play()
  }
});
```


---

## 2. 音频 — AVPlayer 状态机

### 2.1 prepare 阶段不能直接调用 play/seek

**陷阱**：AVPlayer 有严格的状态机（`idle → initialized → prepared → playing ↔ paused → stopped → released`）。在 `prepare()` 尚未完成时直接调用 `play()` 或 `seek()`，不会抛异常但会静默失败或导致状态不一致。

**正确做法**：在 `prepare` 阶段收到的 `play/seek` 请求需要排队/缓存，待 `prepared` 状态回调后再执行：

```ets
private pendingPlay: boolean = false;
private pendingSeekMs: number = -1;
private isPrepared: boolean = false;

// 监听状态变化
avPlayer.on('stateChange', (state: string) => {
  if (state === 'prepared') {
    this.isPrepared = true;
    if (this.pendingSeekMs >= 0) {
      avPlayer.seek(this.pendingSeekMs);
      this.pendingSeekMs = -1;
    }
    if (this.pendingPlay) {
      avPlayer.play();
      this.pendingPlay = false;
    }
  }
});

// play/seek 方法先检查状态
play(): void {
  if (this.isPrepared) {
    this.avPlayer.play();
  } else {
    this.pendingPlay = true;  // 缓存请求
  }
}
```

### 2.2 Dart 层 onError 不应再调用平台 stop()

**陷阱**：Dart 层收到 `player.onError` 回调后如果再主动调用平台 `stop()`，会把一次底层错误放大成新的停止请求，引发 `preload → seek(0) → stop → play → stop` 的回环，用户看到的表现是"点击播放无反应"。

**正确做法**：Dart 层 `_onError` 回调中只做本地状态更新（设为 STOPPED、复位位置），不要再通过 MethodChannel 调用原生 `stop()`。

### 2.3 player.onError 载荷结构必须与 Dart 端一致

**陷阱**：OHOS 原生 `player.onError` 回传的错误载荷结构如果和 Dart 预期不一致（如多了/少了字段），Dart 侧解析失败后可能触发二次异常，掩盖真正错误来源。

**正确做法**：与 Android/iOS 端对齐错误回调的 Map 结构，确保 Dart 层 `_onError` 可以正常解析。

### 2.4 audioRendererInfo 必须在 prepare 前设置

创建 AVPlayer 后，如果涉及音频播放，建议在 `prepare()` 之前设置 `audioRendererInfo`，减少 AVPlayer 初始化期的不确定性。

### 2.5 后台播放语义必须生成后台能力闭环

如果插件原 API 含有后台播放、锁屏播放、保活播放或 `stayAwake` 等语义，生成 OHOS AVPlayer 代码时不能只生成前台 `AVPlayer.play()`，必须同步生成后台播放能力闭环。

代码侧至少包含：

- 实现 `AbilityAware` 获取真实 `UIAbilityContext`
- 播放开始前启动音频后台任务并创建/激活 `AVSession`
- 暂停、停止、释放、销毁时停止后台任务并释放 `AVSession`
- `module.json5` 声明对应后台运行权限和音频后台模式

原则：有后台播放语义，就生成后台能力；没有后台能力，就不要实现成看似支持后台播放。

---

## 3. UI 提示 — Toast vs CustomDialog

### 3.1 优先使用系统 promptAction.showToast() 而非 CustomDialog

**陷阱**：为了保留样式控制（fontSize、背景色、文字色等），Agent 可能选用 `CustomDialog` / `openCustomDialog` 来实现 Toast 功能。这会引入不必要的弹窗生命周期管理（timer、dialog id、@Builder），而且行为与系统轻提示不一致。

**正确做法**：

```ets
import { promptAction } from '@kit.ArkUI';

// 系统 Toast — 简洁且行为一致
promptAction.showToast({
  message: msg,
  duration: length === 1 ? 5000 : 2000,   // LONG=5s, SHORT=2s
  alignment: Alignment.Bottom,              // 位置
  backgroundColor: bgColor,                 // 背景色
  textColor: textColor,                     // 文字色
});
```

**决策规则**：
- 如果原插件只需要显示文本+时长+位置 → 用 `promptAction.showToast()`
- 如果原插件需要自定义字号、富文本、主动关闭等 `showToast()` 不支持的能力 → 才用 `CustomDialog`

### 3.2 系统 API 能力边界受 compatibleSdkVersion 约束

**陷阱**：`promptAction.showToast()` 的可选参数（如 `backgroundColor`、`textColor`、`alignment`）在不同 API Level 下支持程度不同。编码前必须核对当前工程 `compatibleSdkVersion` 对 API 的支持范围。

**正确做法**：
1. 查看 `example/ohos/build-profile.json5` 中的 `compatibleSdkVersion` 值
2. 通过 `sub-doc-search` 或 `read_file` .d.ts 确认 API 参数的 `@since` 版本
3. 对当前 SDK 版本不支持的参数，保留参数接收但做降级处理（忽略该值），不要伪造实现

---

## 4. 异步 API — callback vs Promise

### 4.1 部分 OHOS API 的 callback 和 Promise 形式行为不一致

**陷阱**：HarmonyOS 部分 API（如 SoundPool、部分文件操作）的 Promise 形式和 callback 形式在错误处理、时序、回调触发上可能存在差异。官方文档示例通常使用 callback 形式。

**正确做法**：
- 优先参考官方文档示例的调用形式
- 如果官方示例使用 callback 形式，优先使用 callback
- 如果 Promise 形式出现不稳定行为，切换到 callback 形式
- 通过 `sub-doc-search` 搜索具体 API 的官方示例确认推荐用法

---

## 5. MethodChannel 参数安全

### 5.1 call.args 可能为 null

**陷阱**：部分 MethodChannel 调用不携带参数（如生命周期回调、无参查询方法），此时 `call.args` 为 null。如果代码直接把 `call.args` 当作非空 Map 使用（如 `call.args.get("key")`），会触发 `Cannot read property get of null` 运行时崩溃。

**正确做法**：

```ets
onMethodCall(call: MethodCall, result: MethodResult): void {
  switch (call.method) {
    case "methodWithArgs": {
      // 先检查 args 是否存在
      const args = call.args as Map<string, Object> | null;
      if (args === null || args === undefined) {
        result.error("INVALID_ARGS", "Arguments are required", null);
        return;
      }
      const value = args.get("key") as string;
      // ...
      break;
    }
    case "methodWithoutArgs": {
      // 无参方法不要访问 call.args
      result.success("ok");
      break;
    }
  }
}
```

---

## 6. 传感器 — SensorResponse 必须属性访问

**陷阱**：OHOS `SensorServiceKit` 回调数据通过具名属性提供（`alpha/beta/gamma`、`x/y/z`），不是数组。`data[0]` 返回 `undefined`，界面数值不变。

```ets
sensor.on(sensor.SensorId.ORIENTATION, (data: sensor.OrientationResponse) => {
  const heading = data.alpha;  // ✅ 属性访问
  // const heading = data[0];  // ❌ undefined
});
```

适用所有 SensorResponse 子类：ORIENTATION(`alpha/beta/gamma`)、ACCELEROMETER/GYROSCOPE/MAGNETIC_FIELD(`x/y/z`)。

### 6.2 后台禁止调用传感器

**陷阱**：只在 `onCancel()`、`onDetachedFromEngine()` 等销毁路径里停止传感器还不够。若应用退到后台后可能继续收到传感器回调，造成后台耗电和隐私风险。

**正确做法**：
- 维护应用/窗口是否处于前台可用状态，只有在前台时才使用传感器
- 应用退后台、窗口失焦、Ability detach 时立即 `sensor.off(...)`
- 回到前台后恢复 `sensor.on(...)`

---

## 7. hilog — 浮点数用 `%{public}s` + `String()`

**陷阱**：`%{public}f` 在部分 SDK 版本下输出空字符串或乱码。

```ets
hilog.info(LOG_DOMAIN, LOG_TAG, 'val=%{public}s', String(floatVal));  // ✅
// hilog.info(LOG_DOMAIN, LOG_TAG, 'val=%{public}f', floatVal);       // ❌
```

---

## 8. bundleManager — 读 metadata 必须含 `GET_BUNDLE_INFO_WITH_HAP_MODULE`

**陷阱**：metadata 挂在 `HapModuleInfo` 下。只用 `GET_BUNDLE_INFO_WITH_APPLICATION | GET_BUNDLE_INFO_WITH_METADATA` 时 `hapModulesInfo` 为空数组，读不到任何 metadata。

```ets
// ✅ 必须包含 GET_BUNDLE_INFO_WITH_HAP_MODULE
const bundleInfo = await bundleManager.getBundleInfoForSelf(
  bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_HAP_MODULE |
  bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_METADATA
);
for (const hapModule of bundleInfo.hapModulesInfo) {
  for (const meta of hapModule.metadata) {
    if (meta.name === 'my_channel_key') { /* meta.value */ }
  }
}
```

## 9. 平台敏感默认模式

### 不要把 default / platformDefault / auto 留给 OHOS 运行时决定

平台敏感能力（浏览器/WebView、分享、Picker、权限页、设置页、扫码/拍照/录音、文件选择等）在 OHOS 分支不要保留 `default` / `platformDefault` / `auto` / `system`。必须显式选择：外部应用、应用内页面、系统面板、系统 Picker、自定义页面、PlatformView/XComponent、Ability 跳转等；需要页面路由、headers、options、容器或权限前置流程时同步补齐。

`url_launcher` 普通 http/https URL：默认意图按外部浏览器处理，不要保留 `LaunchMode.platformDefault`：

```dart
final mode = Platform.operatingSystem == 'ohos' &&
    requestedMode == LaunchMode.platformDefault
        ? LaunchMode.externalApplication
        : requestedMode;
```

如明确要求应用内 WebView：补 OHOS WebView 页面/路由，并传 `harmony_browser_page`：

```dart
WebViewConfiguration(
  headers: {'harmony_browser_page': 'pages/BrowserPage'},
)
```

禁止因为能编译就依赖运行时默认映射。

## 10. 加密与安全 — cryptoFramework

### 10.1 算法字符串格式必须符合 OHOS 规范

**陷阱**：OHOS cryptoFramework 的 `createSign`/`createVerify`/`createCipher` 等方法对算法字符串有特定格式要求，不能沿用 Android/iOS 格式。

| 操作类型 | Android/iOS 格式 | OHOS 格式 |
|---------|-----------------|-----------|
| 签名验签 | `SHA1withRSA` | `RSA{keySize}|PKCS1|SHA1` |
| 加解密 | `RSA/ECB/PKCS1Padding` | `RSA|PKCS1` |

**强制检查**：
- 编码前通过 `sub-doc-search` 搜索 `cryptoFramework` + 方法名确认格式
- 密钥长度必须从实际密钥推断或 Dart 参数获取

**禁止**：直接沿用其他平台的算法字符串格式。

### 10.2 非标准 RSA 操作不支持

**陷阱**：部分 RSA 用法在其他平台可行但 OHOS 不支持：

| 操作 | Android | iOS | OHOS |
|------|---------|-----|------|
| 公钥解密 | ✓ | ✗ | ✗ |
| 私钥加密 | ✓ | ✗ | ✗ |

OHOS `Cipher.init(DECRYPT_MODE, PubKey)` 不支持，会报 init failed。

**处理方式**：发现不支持的操作 → `result.notImplemented()` + 写入 `not_implemented` + `risk_items`（severity: high）

**禁止**：伪造实现或静默返回空值。

### 10.3 字符串与二进制转换必须用 TextEncoder/TextDecoder

**陷阱**：使用 `charCodeAt`/`String.fromCharCode` 处理 UTF-8 多字节文本（汉字、emoji）会截断或乱码。`charCodeAt()` 只返回 0-255 单字节值。

**正确做法**：

```ets
import { util } from '@kit.ArkTS';

// 编码：字符串 → Uint8Array
const encoder = new util.TextEncoder();
const bytes = encoder.encodeInto(str);

// 解码：Uint8Array → 字符串
const decoder = new util.TextDecoder('utf-8');
const str = decoder.decodeToString(bytes);
```

**禁止**：对可能含多字节字符的文本使用 `charCodeAt` 或 `String.fromCharCode`。

**适用场景**：RSA 加密、签名验签、哈希计算、网络传输等所有文本与二进制互转场景。

---

## 11. Window / WindowStage 生命周期

### 11.1 不能只在 attach 时初始化一次 `mainWindow`

**陷阱**：依赖 `window.Window` 的插件（如状态栏、导航栏、全屏、避让区）如果只在 `onAttachedToAbility()` 里获取一次 `mainWindow`，很容易因为 `windowStage` 还没准备好而拿到 `null`。

**正确做法**：
- 保留 `UIAbility` 引用，但不要把 `mainWindow` 当成启动时一次拿好、后续永久可用的静态资源
- 业务方法调用时再懒获取窗口，优先走 `FlutterManager -> windowStage -> mainWindow`
- 若主路径暂时拿不到，再回退 `window.getLastWindow(context)`。依赖窗口的方法，统一先确保主窗口可用，再执行实际业务逻辑

---

## 12. Share Kit — AbilityAware 与 UTD 类型

### 12.0 Share Kit 必须通过 AbilityAware 获取 UIAbilityContext

**陷阱**：`ShareController.show()` 的第一个参数是 `common.UIAbilityContext`。Agent 可能错误认为"HAR 模块无法获取 UIAbilityContext"，从而将所有分享方法标记为 `notImplemented()`。

**正确做法**：HAR 插件可以通过 `AbilityAware` 接口获取真实 `UIAbilityContext`。插件类必须 `implements AbilityAware`，在 `onAttachedToAbility(binding)` 中通过 `binding.getAbility().context` 获取：

```ets
import {
  FlutterPlugin, FlutterPluginBinding, MethodCall, MethodCallHandler,
  MethodChannel, MethodResult, AbilityAware, AbilityPluginBinding,
} from '@ohos/flutter_ohos';
import { common } from '@kit.AbilityKit';
import { systemShare } from '@kit.ShareKit';

export default class SharePlugin implements FlutterPlugin, MethodCallHandler, AbilityAware {
  private context: common.UIAbilityContext | null = null;

  onAttachedToAbility(binding: AbilityPluginBinding): void {
    const ability = binding.getAbility();
    if (ability !== null && ability !== undefined) {
      this.context = ability.context as common.UIAbilityContext;
    }
  }

  onDetachedFromAbility(): void {
    this.context = null;
  }

  private async showSharePanel(msg: string, result: MethodResult): Promise<void> {
    if (this.context === null) {
      result.error('NO_CONTEXT', 'UIAbilityContext not available', null);
      return;
    }
    const shareData = new systemShare.SharedData({
      utd: 'general.text',
      content: msg,
    });
    const controller = new systemShare.ShareController(shareData);
    await controller.show(this.context, {
      selectionMode: systemShare.SelectionMode.SINGLE,
      previewMode: systemShare.SharePreviewMode.DEFAULT,
    });
    result.success('SUCCESS');
  }
}
```

**禁止**：
- 以"HAR 模块无法获取 UIAbilityContext"为由放弃实现分享功能
- 把 `binding.getApplicationContext()` 强转为 `UIAbilityContext`

### 12.1 UTD 类型字符串必须使用正确值

**陷阱**：Share Kit 的 `SharedRecord` 要求 `utd` 字段为 HarmonyOS 统一数据类型（UTD）标识符。常见错误是使用 `'general.plain-text'`，这不是合法的 UTD 值，会导致 `Invalid record` / `WriteToWantParams failed` 运行时错误。

**正确 UTD 值对照**：

| 数据类型 | 正确 UTD 值 | 常见错误值 |
|---------|------------|-----------|
| 纯文本 | `'general.text'` | `'general.plain-text'` ❌ |
| JPEG 图片 | `'general.jpeg'` | `'image/jpeg'` ❌ |
| PNG 图片 | `'general.png'` | `'image/png'` ❌ |
| GIF 图片 | `'general.gif'` | — |
| WebP 图片 | `'general.webp'` | — |
| BMP 图片 | `'general.bmp'` | — |
| 通用图片 | `'general.image'` | `'image/*'` ❌ |
| PDF 文件 | `'com.adobe.pdf'` | `'application/pdf'` ❌ |

**禁止**：使用 MIME 类型格式（`image/jpeg`、`text/plain`）作为 UTD 值——OHOS UTD 体系与 MIME 不同。

### 12.2 SharedRecord 必须用内联对象字面量构造

**陷阱**：使用 `as systemShare.SharedRecord` 类型断言构造 SharedRecord 对象会跳过运行时类型检查，导致对象内部结构不完整，系统分享时抛出 `Invalid record` 或 `Parameter error`。

```ets
// ❌ 禁止：类型断言
const record = { utd: 'general.text', content: msg } as systemShare.SharedRecord;

// ✅ 正确：通过构造函数或 addRecord 内联对象
const shareData = new systemShare.SharedData({
  utd: 'general.text',
  content: msg,
});
// 或
shareData.addRecord({
  utd: 'general.text',
  content: msg,
});
```

### 12.3 ArkTS 对象字面量禁止给属性赋 undefined

**陷阱**：ArkTS 对 `undefined` 在对象字面量中的处理与 TypeScript 不同。`{ title: undefined }` 可能导致属性存在但值非法，引发 Share Kit 内部校验失败。

**正确做法**：当可选属性值不存在时，用条件分支构造不同的对象，而不是赋值 `undefined`：

```ets
// ❌ 禁止
const shareData = new systemShare.SharedData({
  utd: 'general.text',
  content: message,
  title: title ?? undefined,  // 不要这样写
});

// ✅ 正确：条件分支
let shareData: systemShare.SharedData;
if (title) {
  shareData = new systemShare.SharedData({
    utd: 'general.text',
    content: message,
    title: title,
  });
} else {
  shareData = new systemShare.SharedData({
    utd: 'general.text',
    content: message,
  });
}
```

### 12.4 HAR 模块中使用 uniformTypeDescriptor 的注意事项

**注意**：`import { uniformTypeDescriptor as utd } from '@kit.ArkData'` 在大多数 HAR 模块中可以正常工作。如果编译或运行时出现模块找不到的错误，回退为直接使用 UTD 字符串常量：

| 用途 | `uniformTypeDescriptor` 枚举 | 等价字符串常量 |
|------|-------------------------------|---------------|
| 纯文本 | `utd.UniformDataType.TEXT` | `'general.text'` |
| 通用图片 | `utd.UniformDataType.IMAGE` | `'general.image'` |
| 超链接 | `utd.UniformDataType.HYPERLINK` | `'general.hyperlink'` |

优先使用 `uniformTypeDescriptor` 枚举（类型安全、IDE 补全）；仅在枚举不可用时回退到字符串常量。

---

## 13. MediaKit — AVFileDescriptor 与 AVTranscoder

### 13.1 AVFileDescriptor 必须包含 offset 和 length

**陷阱**：`AVFileDescriptor` 的 `.d.ts` 声明中 `offset` 和 `length` 标记为可选（`?`），但 `AVTranscoder`、`AVMetadataExtractor`、`AVImageGenerator` 等组件的运行时实现**强制要求**这两个字段。仅传 `{ fd }` 会报 `can not find offset property` / `can not find length property`，随后触发 `prepare()` 参数校验失败（errCode 401）。

**正确做法**：

```ets
import { fileIo } from '@kit.CoreFileKit';

// 获取文件大小
const stat = fileIo.statSync(filePath);
const fileSize = stat.size;

// 打开文件
const file = fileIo.openSync(filePath, fileIo.OpenMode.READ_ONLY);

// ✅ 必须包含 offset 和 length
metadataExtractor.fdSrc = { fd: file.fd, offset: 0, length: fileSize };
transcoder.fdSrc = { fd: file.fd, offset: 0, length: fileSize };
```

**禁止**：
```ets
// ❌ 运行时必定报错
metadataExtractor.fdSrc = { fd: file.fd };
transcoder.fdSrc = { fd: file.fd };
```

**适用范围**：所有使用 `AVFileDescriptor` 类型的 `fdSrc` 赋值场景，包括 `AVPlayer`、`AVMetadataExtractor`、`AVImageGenerator`、`AVTranscoder`。

### 13.2 AVTranscoderConfig 视频尺寸必须为偶数且在合法范围内

**陷阱**：`AVTranscoderConfig` 的 `videoFrameWidth` 合法范围为 [240-3840]，`videoFrameHeight` 合法范围为 [240-2160]。此外，H.264/AVC 和 H.265/HEVC 编码器要求宽高**必须为偶数**。不满足任一条件都会导致 `prepare()` 报 `Parameter verification failed`（errCode 401），且错误信息中不会指明具体哪个参数有问题。

**常见触发场景**：
- 按比例缩放后用 `Math.floor()` 得到奇数（如 1920×0.4444 = 853）
- 原始视频尺寸极小或元数据解析失败返回 0，直接传入导致低于最小值 240

**正确做法**：

```ets
// 缩放后确保偶数 + 合法范围
let width = Math.floor(originalWidth * ratio);
let height = Math.floor(originalHeight * ratio);

// 向下取偶数（视频编码器要求）
width = width - (width % 2);
height = height - (height % 2);

// 钳制到 AVTranscoderConfig 合法范围
width = Math.max(240, Math.min(3840, width));
height = Math.max(240, Math.min(2160, height));

const config: media.AVTranscoderConfig = {
  fileFormat: media.ContainerFormatType.CFT_MPEG_4,
  videoFrameWidth: width,
  videoFrameHeight: height,
  // ...
};
```

**元数据无效时的降级策略**：当 `AVMetadataExtractor.fetchMetadata()` 返回的 `videoWidth`/`videoHeight` 为空或为 0 时，不要设置 `videoFrameWidth`/`videoFrameHeight`（均为可选字段），让系统使用源视频的原始尺寸：

```ets
const config: media.AVTranscoderConfig = {
  fileFormat: media.ContainerFormatType.CFT_MPEG_4,
  audioBitrate: audioBitrate,
  audioCodec: media.CodecMimeType.AUDIO_AAC,
};
// 仅在获取到有效尺寸时设置视频参数
if (originalWidth > 0 && originalHeight > 0) {
  config.videoFrameWidth = adjustedWidth;
  config.videoFrameHeight = adjustedHeight;
  config.videoBitrate = videoBitrate;
  config.videoCodec = media.CodecMimeType.VIDEO_AVC;
}
```

### 13.3 AVTranscoderConfig 高版本字段的兼容性

**陷阱**：`enableBFrame` 字段从 API 20 起新增。设备系统低于 API 20 时，运行时会报 `can not find enableBFrame property` 警告。这是**非致命警告**，不会导致转码失败，但如果与其他参数错误叠加，容易误导排查方向。

**正确做法**：不需要在 `AVTranscoderConfig` 中显式设置 `enableBFrame`。如果需要使用该特性，应先检查设备 API 版本。

---

## 14. Want 跳转 — canOpenLink 不可靠与 URI Scheme 差异

### 14.1 canOpenLink() 不能用作"应用是否安装"的判断

**陷阱**：`bundleManager.canOpenLink()` 用于检查是否有应用能处理给定 URI，但它在以下场景会**错误返回 false**：
- 目标应用已安装且注册了对应 scheme，但 skills 匹配规则与链接格式不完全一致
- `querySchemes` 配置了对应 scheme，但系统版本差异导致匹配逻辑变化
- 目标应用注册了 scheme 但未声明 host/path，某些链接格式不匹配

将 `canOpenLink()` 作为"应用未安装"的硬拦截会导致**已安装的应用无法被拉起**。

**正确做法**：

```ets
// ❌ 禁止：canOpenLink 硬拦截
if (!bundleManager.canOpenLink(link)) {
    result.error('APPLICATION_NOT_INSTALLED', 'App not installed', null);
    return;
}
await this.context.startAbility(want);

// ✅ 正确：直接尝试 startAbility，通过 catch 区分错误类型
try {
    await this.context.startAbility(want);
    result.success(true);
} catch (err) {
    const msg = (err as Error).message ?? '';
    if (msg.includes('17700056') || msg.includes('not in the querySchemes')) {
        result.error('APPLICATION_NOT_INSTALLED', 'Target app not installed', null);
    } else {
        result.error('OPEN_FAILED', 'Failed to open app', null);
    }
}
```

### 14.2 Android URI Scheme 不能直接复用到 HarmonyOS

**陷阱**：同一应用在 Android 和 HarmonyOS 上注册的 URI Scheme 可能完全不同。Agent 机械平移 Android 的 URI Scheme 会导致目标应用无法被拉起。

典型案例：
- QQ on Android 注册 `mqqwpa://`（用于好友聊天），但 QQ on HarmonyOS **未注册** `mqqwpa`
- QQ on HarmonyOS 只注册 `mqqapi`、`qqopenapi`、`wtloginmqq` 等

**正确做法**：
1. 通过 `hdc shell bm dump -n <bundleName> | grep '"scheme"'` 查看目标应用实际注册的 scheme
2. 根据实际注册的 scheme 调整 URI 格式
3. 在 Want 中添加 `bundleName` 以精确匹配目标应用
4. 将 scheme 列入 `module.json5` 的 `querySchemes`

---

## 15. 图片处理 — PixelMap 与 ImagePacker

### 15.1 readPixelsToBuffer 返回原始像素，不是编码图片

**陷阱**：`PixelMap.readPixelsToBuffer()` 读取的是原始 BGRA/RGBA 像素字节（裸位图数据），**不是** PNG/JPEG 编码数据。将其直接传回 Dart 侧，`Image.memory()` 无法解码（缺少文件头和压缩），报 invalid image data。

这是与 Android `Bitmap.compress(format, quality, stream)` 的关键差异——Android 的 compress 直接输出编码后的图片流，而 OHOS 的 `readPixelsToBuffer` 只输出裸像素。

**正确做法**：使用 `image.createImagePacker()` + `packing()` 将 PixelMap 编码为 PNG/JPEG 格式后返回：

```ets
import { image } from '@kit.ImageKit';

async pixelMapToEncodedBytes(pixelMap: image.PixelMap): Promise<ArrayBuffer> {
  const packer = image.createImagePacker();
  const packOpts: image.PackingOption = {
    format: 'image/png',
    quality: 100
  };
  const encodedBuffer = await packer.packing(pixelMap, packOpts);
  packer.release();
  return encodedBuffer;
}
```

**禁止**：
- `pixelMap.readPixelsToBuffer()` 的结果直接返回给 Dart 侧作为图片数据
- 假设 `readPixelsToBuffer` 等同于 Android 的 `Bitmap.compress()`

### 15.2 createImageSource 需要 ArrayBuffer，不是 Array<number>

**陷阱**：`image.createImageSource(buffer)` 的参数类型是 `ArrayBuffer`，必须通过 `Uint8Array.buffer` 获取。如果 Dart 侧传来的二进制数据经过 `.toList()` 转换，ETS 侧收到的是 `Array<number>`（无 `.buffer` 属性），直接调用 `createImageSource` 会失败。

**正确做法**：
```ets
// 防御性处理：确保拿到 ArrayBuffer
let buffer: ArrayBuffer;
if (rawData instanceof Uint8Array) {
  buffer = rawData.buffer;
} else if (Array.isArray(rawData)) {
  const u8 = new Uint8Array(rawData as number[]);
  buffer = u8.buffer;
} else {
  buffer = rawData as ArrayBuffer;
}
const imageSource = image.createImageSource(buffer);
```

**禁止**：假设 Channel 传来的二进制数据一定是 `Uint8Array`，不做类型检查。
