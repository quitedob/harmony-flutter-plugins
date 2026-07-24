import 'dart:io' show Platform;

import 'package:flutter/services.dart';
import 'package:media_scanner_ohos/media_scanner_ohos.dart';

/// A Flutter plugin to scan/refresh media files so they appear in the system
/// gallery without requiring a device restart.
///
/// Supports Android (via MediaScannerConnection) and OpenHarmony (via
/// photoAccessHelper through the federated [media_scanner_ohos] package).
class MediaScanner {
  MediaScanner._();

  static const MethodChannel _channel = MethodChannel('media_scanner');

  /// Notifies the system media store about a new file at [path].
  ///
  /// Returns `null` on success, or a [String] describing the error.
  ///
  /// Example:
  /// ```dart
  /// final error = await MediaScanner.loadMedia(path: filePath);
  /// if (error == null) {
  ///   print('Media scanned successfully');
  /// }
  /// ```
  static Future<String?> loadMedia({required String path}) async {
    if (Platform.isOhos) {
      // Delegate to the federated OHOS implementation.
      // ignore: avoid_dynamic_calls
      return MediaScannerOhos.loadMedia(path: path);
    }
    final String? result =
        await _channel.invokeMethod<String>('loadMedia', {'path': path});
    return result;
  }
}

// MediaScannerOhos is provided by the `media_scanner_ohos` federated package.
// See: ../media_scanner_ohos/lib/media_scanner_ohos.dart
