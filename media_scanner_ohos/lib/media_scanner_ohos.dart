import 'package:flutter/services.dart';

/// OpenHarmony (OHOS) implementation of the media_scanner plugin.
///
/// Uses a [MethodChannel] named `"media_scanner"` to communicate with the
/// native ETS side, which calls `photoAccessHelper.createAsset()` to register
/// new media files with the system gallery.
class MediaScannerOhos {
  MediaScannerOhos._();

  static const MethodChannel _channel = MethodChannel('media_scanner');

  /// Called by the generated plugin registrant to register this plugin.
  /// Required for Flutter's federated plugin pattern when `dartPluginClass`
  /// is specified in pubspec.yaml.
  @pragma('vm:entry-point')
  static void registerWith() {
    // Plugin registration entry point.
    // The MethodChannel is initialized lazily — no explicit setup needed here.
  }

  /// Notifies the OHOS media store about a new file at [path].
  ///
  /// The [path] must be within the application sandbox (e.g. obtained from
  /// `context.filesDir`). External storage paths like
  /// `/storage/emulated/0/...` are **not** supported on OpenHarmony.
  ///
  /// Returns `null` on success, or a [String] describing the error.
  static Future<String?> loadMedia({required String path}) async {
    final String? result =
        await _channel.invokeMethod<String>('loadMedia', {'path': path});
    return result;
  }
}
