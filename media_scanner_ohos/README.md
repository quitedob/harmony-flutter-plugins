# media_scanner_ohos

OpenHarmony (OHOS) implementation of the
[`media_scanner`](https://pub.dev/packages/media_scanner) Flutter plugin.

Uses the [`photoAccessHelper`](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/photoaccesshelper-V5)
API to register newly saved images and videos with the system media store, so
they appear in the Gallery without requiring a device restart.

## Platform Support

| Platform      | Status            |
|---------------|-------------------|
| Android       | ✅ (parent package)|
| OpenHarmony   | ✅ (this package)  |

## Usage

Add the federated parent package to your `pubspec.yaml`:

```yaml
dependencies:
  media_scanner:
    path: ../media_scanner

dependency_overrides:
  media_scanner_ohos:
    path: ../media_scanner_ohos
```

Then call `loadMedia` with a sandbox file path:

```dart
import 'package:media_scanner/media_scanner.dart';

final String? error = await MediaScanner.loadMedia(path: sandboxFilePath);
if (error == null) {
  print('Media scanned successfully');
} else {
  print('Scan error: $error');
}
```

### Important — Sandbox Paths

OHOS uses an application sandbox model. You **must** provide a path within the
app sandbox (e.g. `context.filesDir`). Android-style external storage paths
like `/storage/emulated/0/...` are **not** supported.

### Permissions

Add to your app's `module.json5`:

```json5
{
  "module": {
    "requestPermissions": [
      {
        "name": "ohos.permission.WRITE_IMAGEVIDEO",
        "reason": "$string:write_media_permission_reason",
        "usedScene": {
          "abilities": ["EntryAbility"],
          "when": "inuse"
        }
      }
    ]
  }
}
```

## Architecture

```
Dart (MediaScanner.loadMedia)
  │ Platform.isOhos → MediaScannerOhos.loadMedia()
  ▼
MethodChannel "media_scanner" → invokeMethod('loadMedia')
  ▼
ETS (MediaScannerPlugin.ets)
  │ photoAccessHelper.createAsset() → file copy → applyChanges()
  ▼
OHOS MediaStore
```

## Build

```bash
# Using Flutter OHOS SDK
flutter pub get
flutter build hap --debug
flutter run -d <ohos-device-id>
```

## References

- [Flutter OHOS 主仓库](https://gitcode.com/openharmony-tpc/flutter_flutter)
- [photoAccessHelper API 文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/photoaccesshelper-V5)
- [OHOS 插件适配指导](https://gitcode.com/openharmony-tpc/flutter_flutter)

## License

MIT — see the parent `media_scanner` package.
