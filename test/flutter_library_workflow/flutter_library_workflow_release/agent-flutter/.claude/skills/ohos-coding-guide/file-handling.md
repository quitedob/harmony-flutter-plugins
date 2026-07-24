# HarmonyOS 文件处理专项

适用于 `file_picker`、`image_picker`、`photo_manager`、`path_provider`、`share`、`open_file`、下载、上传、保存、预览、选择图片、视频、音频、文档、保存文件、分享文件、打开文件、读取文件字节、返回文件路径等插件。

## 1. 第一原则：先看 Dart 契约

HarmonyOS 里 `path` 和 `uri` 不是一回事。编码前先读 `lib/` 和 `example/lib/`，确认 Dart 侧到底怎么用返回值。

| Dart 侧语义 | OHOS 侧返回 | 规则 |
| --- | --- | --- |
| `File(path)`、`Image.file(File(path))`、上传接口收 path | 应用沙箱真实路径 | Picker URI 先复制/导出到沙箱，再返回 path |
| `XFile.path` / `PickedFile.path` | 应用沙箱真实路径 | 对齐 Android/iOS 行为，不要直接回 `file://media/...` |
| API 明确叫 `uri` / `contentUri` / `documentUri` | URI 字符串 | Dart 侧必须把它当不透明 URI |
| API 返回 `Uint8List` | `Uint8Array` / bytes | 只适合小文件，大文件走 path 或分块 |
| 保存到用户指定位置 | Picker save URI 或成功状态 | 目标属于用户文件，不是应用沙箱 path |

禁止：

- 把 `file://media/...`、`file://docs/...` 当成本地 path 传给 Dart `File(path)`。
- 解析 URI 里的 id、路径片段、文件名来做业务判断。
- 手写 `/data/storage/el2/...`，必须从 `Context` 属性拿。
- 只因为 ArkTS 能拿到 URI，就改掉原插件 Dart API 的 path 契约。

## 2. 常见文件形态

### 2.1 应用沙箱路径

- `context.filesDir`：长期私有文件。适合后续仍要打开、预览、分享的应用文件。
- `context.cacheDir`：可重新生成缓存，系统可能清理。适合下载缓存、可丢弃中间文件。
- `context.tempDir`：运行期临时文件。适合 Picker 选中后临时显示、上传、裁剪。
- `context.bundleCodeDir`：安装包资源目录。不要拼路径读资源，应走 ResourceManager。

Flutter 侧要 `File(path)` 时，返回这些目录里的真实路径。通过 Picker 拿到用户文件后，如果 Dart 侧期望 path，复制到 `tempDir`、`cacheDir` 或 `filesDir` 再返回。

### 2.2 应用沙箱 file URI

传给 HarmonyOS 原生能力时，用系统接口从沙箱 path 生成 URI：

```ets
import { fileUri } from '@kit.CoreFileKit';

const sandboxPath = `${context.tempDir}/xxx.xxx`;
const uri = fileUri.getUriFromPath(sandboxPath);
```

`path -> uri` 是给原生 API 使用的，不代表 Dart 侧也应该拿 URI。Dart 原本要 path 时仍返回 sandboxPath

### 2.3 用户文件 URI

常见来源：

- `DocumentViewPicker.select()` / `save()`
- `AudioViewPicker.select()` / `save()`
- `PhotoViewPicker.select()`

规则：

- `file://docs/...` 通常是临时授权 URI。读取时用 `fileIo.openSync(uri, READ_ONLY)` 再读 fd，保存时用 `fileIo.openSync(uri, fileIo.OpenMode.READ_WRITE)` 再写 fd。
- `file://media/...` 是媒体库 URI。若 URI 来自 `PhotoViewPicker.select()`，它本身带有用户操作产生的临时授权。
- 普通三方“选图/选视频”插件默认走纯 Picker 方案：
  - 原图字节、导出到沙箱、返回 Flutter `path/bytes`：优先 `fileIo.openSync(uri, READ_ONLY)` 读取或复制。
  - 缩略图、宽高、标题等基础信息：再按临时授权 URI 调 `photoAccessHelper.getAssets(...)`、`PhotoAsset.getThumbnail(...)`、`PhotoAsset.get(PhotoKeys...)`。
  - 不要因为“还要拿原图/元数据/缩略图”就默认声明 `READ_IMAGEVIDEO`。
- `READ_IMAGEVIDEO` 只在官方明确要求、且场景确实是克隆/备份/同步/批量扫描媒体库时再考虑。
- 如果 Dart API 要 path，先复制/导出到应用沙箱；如果 Dart API 明确要 URI，直接返回 URI 并保留其生命周期语义。

## 3. 打开/预览文件：优先 Preview Kit

`open_file` / `open_file_plus` / 文件预览类插件在 OHOS 上不要直接改成 `Want + startAbility`。文件预览主路径应使用 `@kit.PreviewKit`。

核心规则：

- 沙箱 path 先转 `fileUri.getUriFromPath(path)`。
- 应用自己生成、复制出来供预览的文件优先放 `context.filesDir`。`cacheDir/tempDir` 适合临时内部处理，但跨应用预览,预览器实际读不到内容。
- `filePreview.canPreview(...)` 只说明 URI/类型可预览，不保证最终界面已经正确展示。
- Preview Kit 预览窗口是单例。若用户语义是“点击按钮重新打开预览”，`hasDisplayed=true` 时不要只 `loadData(...)`；应先 `closePreview(...)`，短暂等待，再 `openPreview(...)`。
- `loadData(...)` 只适合你确定已有预览窗口仍在前台、只想换内容的场景。
- `Want + startAbility(viewData)` 作为 Preview Kit 不可用时的兜底，加 `FLAG_AUTH_READ_URI_PERMISSION`。

推荐骨架：

```ets
import { common } from '@kit.AbilityKit';
import { fileIo, fileUri } from '@kit.CoreFileKit';
import { filePreview } from '@kit.PreviewKit';

async function openFilePreview(
  context: common.UIAbilityContext,
  path: string,
  mimeType: string
): Promise<void> {
  const exists = await fileIo.access(path);
  if (!exists) {
    throw new Error('file not found');
  }

  const uri = fileUri.getUriFromPath(path);
  const segments = path.replace(/\\/g, '/').split('/');
  const info: filePreview.PreviewInfo = {
    title: segments[segments.length - 1],
    uri: uri,
    mimeType: mimeType,
  };

  const canPreview = await filePreview.canPreview(context, uri);
  if (!canPreview) {
    throw new Error('file cannot be previewed');
  }

  if (await filePreview.hasDisplayed(context)) {
    await filePreview.closePreview(context);
    await new Promise<void>((resolve) => setTimeout(resolve, 150));
  }
  await filePreview.openPreview(context, info);
}
```

如果插件必须保留“交给任意三方应用打开”的语义，可在 Preview Kit 后兜底 `startAbility`。

## 4. 典型场景决策

### 4.1 选择图片/视频后给 Flutter 显示

```text
PhotoViewPicker URI
  -> 若 Dart 要 path：fileIo.openSync(uri, READ_ONLY) 复制到 context.tempDir/cacheDir/filesDir -> result.success(path)
  -> 若 Dart 要 bytes：fileIo.openSync(uri, READ_ONLY) 读取 -> result.success(bytes)
  -> 若只要缩略图/宽高：getAssets(uri) + getThumbnail()/get(PhotoKeys...)
```

不要直接返回 URI 格式 `file://media/Photo/...` 给 `Image.file(File(path))`。
也不要把普通图片选择插件默认改成 `READ_IMAGEVIDEO + requestImageData` 路线。

### 3.2 选择文档后用于读取内容

如果 Dart API 明确返回 `Uint8List`：

```text
DocumentViewPicker URI -> fileIo.openSync(uri, READ_ONLY) -> 分块 read -> Uint8Array -> result.success(bytes)
```

如果 Dart API 返回 path：

```text
DocumentViewPicker URI -> 复制到 context.tempDir/context.cacheDir -> result.success(path)
```

如果 Dart API 返回 uri：

```text
DocumentViewPicker URI -> result.success(uri)
```

但 Dart 层不能再用 `File(uri)`，后续读取仍应回到原生层处理，或者插件另提供 `readBytes(uri)`。


### 4.3 保存文件

- 保存到应用私有目录：用 `filesDir/cacheDir/tempDir`，返回 沙箱路径path。
- 保存到用户指定位置：用 `DocumentViewPicker.save()` 等接口拿 URI，写入后返回 URI 或成功状态。
- 如果使用 `DocumentViewPicker.save()`：

```text
save() -> 得到 file://docs/... URI -> open READ_WRITE -> write -> close
```
不要承诺用户目录 URI 是 Dart `File(path)` 可长期访问路径。因为目标在用户文件空间，不是应用沙箱。

### 4.4 下载和上传

- 插件只需要内部缓存：下载到 `cacheDir`，返回 path。
- 用户要能在文件管理器看到，且语义明确是“保存到 Download”：优先 `DocumentViewPicker.save()` 的 `DOWNLOAD` 模式，不要把 `cacheDir/tempDir` 冒充 Download。
- `DOWNLOAD` 模式自动创建在 `Download/包名/目录`、跳过文件选择界面、返回具备持久化权限的 URI。它更像“系统托管的下载保存入口”，不是应用自己硬编码公共目录 path。
- 基本流程：
  const documentViewPicker = new picker.DocumentViewPicker(context);
  const documentSaveOptions = new picker.DocumentSaveOptions();
  documentSaveOptions.pickerMode = picker.DocumentPickerMode.DOWNLOAD;

  const result = await documentViewPicker.save(documentSaveOptions);
  const dirUri = result[0];
  const filePath = new fileUri.FileUri(`${dirUri}/${fileName}`).path;
  const file = fileIo.openSync(
    filePath,
    fileIo.OpenMode.CREATE | fileIo.OpenMode.READ_WRITE
  );
  try {
    fileIo.writeSync(file.fd, content);
  } finally {
    fileIo.closeSync(file);
  }
}

- 原插件 Android/iOS 返回下载路径：OHOS 侧应优先落到沙箱 `filesDir/cacheDir` 并返回 path；只有当插件公开语义已经明确是“保存到用户 Download”时，才走 `DOWNLOAD` 模式并返回 URI/成功状态。
- 上传时如果 Dart 传入的是 path：

- 判断是否为应用沙箱路径，直接 `fileIo.open/read`。
- 如果是 `file://docs/...` 或 `file://media/...`，不要当 path 拼接；按 URI 打开或走媒体访问链路。

如果 Dart 传入的是 bytes：

- ETS 侧用 `Uint8Array` 接收。

如果 Dart 传入的是 uri：

- `file://docs/...` 可按授权用 `fileIo.openSync(uri, READ_ONLY)`。
- `file://media/...` 优先查 `photoAccessHelper` 媒体 URI 使用方式。

### 3.6 分享/打开文件

分享或打开文件时，很多系统能力需要 URI，不是 path：

- 来源是应用沙箱 path：先 `fileUri.getUriFromPath(path)`。
- 来源是用户文件 URI：可按原 URI 传递，但要确认 Want/UDMF/Share Kit 对 URI 权限的要求。
- 来源是媒体 Picker URI：不要自己解析，按分享目标能力和官方文档确认是否能直接传；不确定时复制到沙箱，再用沙箱 file URI 分享。

## 4. 必要代码骨架

### 5.1 用户 URI 复制到沙箱 path

```ets
import { common } from '@kit.AbilityKit';
import { fileIo, ReadOptions, WriteOptions } from '@kit.CoreFileKit';

async function copyUriToSandboxPath(
  context: common.UIAbilityContext,
  sourceUri: string,
  targetName: string
): Promise<string> {
  const targetPath = `${context.tempDir}/${Date.now()}_${targetName}`;
  const source = fileIo.openSync(sourceUri, fileIo.OpenMode.READ_ONLY);
  const target = fileIo.openSync(
    targetPath,
    fileIo.OpenMode.CREATE | fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.TRUNC
  );

  try {
    const bufferSize = 64 * 1024;
    const buffer = new ArrayBuffer(bufferSize);
    let offset = 0;
    let readOptions: ReadOptions = { offset: offset, length: bufferSize };
    let readLen = await fileIo.read(source.fd, buffer, readOptions);
    while (readLen > 0) {
      const writeOptions: WriteOptions = { length: readLen };
      await fileIo.write(target.fd, buffer, writeOptions);
      offset += readLen;
      readOptions = { offset: offset, length: bufferSize };
      readLen = await fileIo.read(source.fd, buffer, readOptions);
    }
  } finally {
    fileIo.closeSync(source);
    fileIo.closeSync(target);
  }

  return targetPath;
}
```

大文件必须分块读写，不要一次性读完整文件。文件名要保留合理后缀，否则 Flutter 或系统预览可能无法识别类型。

### 4.2 PhotoViewPicker 媒体 URI 的默认主路径

普通用户手选图片/视频时，默认按下面的优先级：

1. Dart 要 `path`：
   `PhotoViewPicker URI -> fileIo.openSync(uri, READ_ONLY) -> 复制到沙箱 -> result.success(path)`
2. Dart 要 `Uint8List` / `ByteData`：
   `PhotoViewPicker URI -> fileIo.openSync(uri, READ_ONLY) -> read -> result.success(bytes)`
3. Dart 只要缩略图 / 宽高 / 标题：
   `PhotoViewPicker URI -> photoAccessHelper.getAssets(uri) -> getThumbnail()/get(PhotoKeys...)`

只有在官方 API 明确要求、且业务也确实接受相应权限策略时，才再评估 `MediaAssetManager.requestImageData(...)` 一类更重的媒体链路。不要把它作为普通 Picker 插件的默认实现。

### 4.3 沙箱路径转 file URI

用于分享、保存到媒体库、系统预览等原生能力。

```ets
import { fileUri } from '@kit.CoreFileKit';

function toSandboxFileUri(path: string): string {
  return fileUri.getUriFromPath(path);
}
```

### 4.4 小文件读取成 Uint8Array

只适合 Dart API 明确返回 `Uint8List` 的场景。

```ets
import { fileIo } from '@kit.CoreFileKit';

function readSmallFileAsBytes(pathOrUri: string): Uint8Array {
  const file = fileIo.openSync(pathOrUri, fileIo.OpenMode.READ_ONLY);
  try {
    const stat = fileIo.statSync(pathOrUri);
    const buffer = new ArrayBuffer(stat.size);
    const length = fileIo.readSync(file.fd, buffer);
    return new Uint8Array(buffer.slice(0, length));
  } finally {
    fileIo.closeSync(file);
  }
}
```

大文件改成返回 path、分块读，或通过 EventChannel / BasicMessageChannel 分块回传。

## 5. 权限与能力边界

### 5.1 Picker 不等于存储权限

使用 Picker 选择/保存文件本身通常无需额外申请文件权限，因为权限来自用户操作授权。

### 5.2 访问公共目录要谨慎

`Environment.getUserDownloadDir()` / `getUserDocumentDir()` 受系统能力限制，当前主要面向 2in1 等设备；访问公共目录还涉及对应目录授权。

插件适配时不要为了“像 Android 外部存储路径”就默认走公共目录。优先级通常是：

1. 应用私有沙箱：`filesDir/cacheDir/tempDir`
2. Picker 让用户选择文件或保存位置
3. 官方公共目录 API，并检查 `canIUse(...)`、权限和设备形态

如果只是想让用户“能在文件管理器里找到文件”，优先 `DocumentViewPicker.save()`；只有插件公开语义已经明确写死 Download，才评估 `Environment.getUserDownloadDir()` 这条公共目录路线。

### 5.3 媒体库读写不要乱加高权限

如果只是让用户手动选一张图片：

- 优先 `photoAccessHelper.PhotoViewPicker`
- 不要默认申请相册管理权限
- 不要因为还要返回原图 bytes、导出到沙箱、读取 EXIF、取缩略图，就直接切到 `READ_IMAGEVIDEO`
- `PhotoViewPicker` 返回的 URI 可优先用 `fileIo.openSync(uri, READ_ONLY)` 读取原始文件内容；需要缩略图和少量基础信息时，再用临时授权的 `getAssets(...)`

如果要后台批量访问媒体库、按 URI 获取完整媒体数据、读取敏感元数据或写入图库：

- 查 Media Library Kit 对应文档和 SDK 权限声明
- 按需声明和运行时申请，不要声明不需要的高级权限
- `READ_IMAGEVIDEO` 典型适用场景是克隆、备份、同步、批量扫描媒体库，不是普通三方图片选择插件默认权限

## 7. 适配检查清单

编码和完整性校验时逐项检查：

- 是否读取了 Dart `invokeMethod<T>` / 返回模型 / Example 使用方式。
- Dart 侧如果 `File(path)`，OHOS 是否返回沙箱真实路径。
- Picker 返回的 `file://docs/...` / `file://media/...` 当成 URI 处理，不能直接当 path。
- 是否区分 `filesDir`、`cacheDir`、`tempDir` 的生命周期。
- 是否没有硬编码 `/data/storage/...`。
- 是否所有 `open` 的 fd 都在 `finally` 里关闭。
- 大文件是否分块读写，避免一次性读入内存。
- 媒体 URI 是否按 `photoAccessHelper` 官方链路处理。
- 保存到用户目录、保存到图库、保存到应用私有目录是否没有混淆。
- 需要权限时是否声明并运行时申请；不需要权限时是否避免过度声明。
- Example 是否按 OHOS 返回格式配合处理，而不是只看 Android/iOS 行为。
