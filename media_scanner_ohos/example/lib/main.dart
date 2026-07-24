import 'dart:io' show Platform;

import 'package:flutter/material.dart';
import 'package:media_scanner/media_scanner.dart';

void main() {
  runApp(const MediaScannerExampleApp());
}

class MediaScannerExampleApp extends StatelessWidget {
  const MediaScannerExampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MediaScanner OHOS Example',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const MediaScannerExamplePage(),
    );
  }
}

class MediaScannerExamplePage extends StatefulWidget {
  const MediaScannerExamplePage({super.key});

  @override
  State<MediaScannerExamplePage> createState() => _MediaScannerExamplePageState();
}

class _MediaScannerExamplePageState extends State<MediaScannerExamplePage> {
  String _status = 'Ready';
  bool _scanning = false;

  @override
  Widget build(BuildContext context) {
    final String platformLabel = Platform.isOhos ? 'OpenHarmony' : 'Android';

    return Scaffold(
      appBar: AppBar(
        title: Text('MediaScanner — $platformLabel'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                _scanning ? Icons.hourglass_top : Icons.image,
                size: 64,
                color: _scanning ? Colors.orange : Colors.blue,
              ),
              const SizedBox(height: 16),
              Text(
                _status,
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 24),
              ElevatedButton.icon(
                onPressed: _scanning ? null : _runScan,
                icon: const Icon(Icons.refresh),
                label: const Text('Scan Test File'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _runScan() async {
    setState(() {
      _scanning = true;
      _status = 'Scanning media...';
    });

    try {
      // On OHOS the path MUST be within the application sandbox.
      // Replace this path with a real file path in your test.
      final String testPath =
          Platform.isOhos ? '${(await _getFilesDir())}/test_image.jpg' : '/sdcard/test_image.jpg';

      final String? error = await MediaScanner.loadMedia(path: testPath);

      setState(() {
        _scanning = false;
        if (error == null) {
          _status = 'Scan succeeded\n$testPath';
        } else {
          _status = 'Scan returned error:\n$error';
        }
      });
    } catch (e) {
      setState(() {
        _scanning = false;
        _status = 'Exception: $e';
      });
    }
  }

  Future<String> _getFilesDir() async {
    // In a real app use path_provider or context.filesDir equivalent.
    // This is a simplified placeholder — OHOS sandbox paths are obtained
    // through the Flutter engine's path provider APIs.
    return '/data/storage/el2/base/haps/entry/files';
  }
}
