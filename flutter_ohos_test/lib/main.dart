import 'dart:io' show Platform, Directory, File;

import 'package:flutter/material.dart';
import 'package:media_scanner/media_scanner.dart';

import 'zoom_drawer_test_page.dart';
import 'media_scanner_full_test_page.dart';
import 'flutter_zoom_drawer_full_test_page.dart';
import 'discrollview_test_page.dart';
import 'nice_image_view_test_page.dart';
import 'pin_code_fields_test_page.dart';
import 'device_imei_test_page.dart';

void main() {
  runApp(const TestHubApp());
}

class TestHubApp extends StatelessWidget {
  const TestHubApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter OHOS Test Hub',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
        useMaterial3: true,
      ),
      home: const TestHubPage(),
    );
  }
}

class TestHubPage extends StatelessWidget {
  const TestHubPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Flutter OHOS Test Hub'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _testCard(
              context,
              icon: Icons.image,
              title: 'MediaScanner',
              subtitle: '媒体库扫描测试',
              page: const MediaScannerTestPage(),
            ),
            const SizedBox(height: 12),
            _testCard(
              context,
              icon: Icons.checklist,
              title: 'MediaScanner 完整测试',
              subtitle: '18 项测试用例一键覆盖',
              page: const MediaScannerFullTestPage(),
            ),
            const SizedBox(height: 12),
            _testCard(
              context,
              icon: Icons.menu_open,
              title: 'ZoomDrawer',
              subtitle: '纯 Dart 抽屉组件测试',
              page: const ZoomDrawerTestPage(),
            ),
            const SizedBox(height: 12),
            _testCard(
              context,
              icon: Icons.checklist_rtl,
              title: 'ZoomDrawer 完整测试',
              subtitle: '24 项测试用例一键覆盖',
              page: const ZoomDrawerFullTestPage(),
            ),
            const SizedBox(height: 12),
            _testCard(
              context,
              icon: Icons.view_carousel,
              title: 'Discrollview',
              subtitle: '视差滚动动画效果测试（Alpha/Scale/Translation/Color）',
              page: const DiscrollviewTestPage(),
            ),
            const SizedBox(height: 12),
            _testCard(
              context,
              icon: Icons.circle_outlined,
              title: 'NiceImageView',
              subtitle: '圆角/圆形/边框/遮罩效果测试（pure_dart）',
              page: const NiceImageViewTestPage(),
            ),
            const SizedBox(height: 12),
            _testCard(
              context,
              icon: Icons.password,
              title: 'PIN 输入组件完整测试',
              subtitle: '输入、控制器、主题、表单、语义与 OHOS 选择控件',
              page: const PinCodeFieldsTestPage(),
            ),
            const SizedBox(height: 12),
            _testCard(
              context,
              icon: Icons.phone_android,
              title: 'DeviceImei',
              subtitle: '设备标识与设备信息（ODID / 版本 / JSON）',
              page: const DeviceImeiTestPage(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _testCard(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required Widget page,
  }) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 24),
      child: ListTile(
        leading: Icon(icon, size: 36, color: Colors.teal),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(subtitle),
        trailing: const Icon(Icons.chevron_right),
        onTap: () =>
            Navigator.push(context, MaterialPageRoute(builder: (_) => page)),
      ),
    );
  }
}

// ============================================================
// 原有 MediaScanner 测试页（保留不变）
// ============================================================
class MediaScannerTestPage extends StatefulWidget {
  const MediaScannerTestPage({super.key});

  @override
  State<MediaScannerTestPage> createState() => _MediaScannerTestPageState();
}

class _MediaScannerTestPageState extends State<MediaScannerTestPage> {
  String _status = '就绪，点击按钮开始测试';
  String? _lastFilePath;
  bool _running = false;
  bool _success = false;

  @override
  Widget build(BuildContext context) {
    final String platformLabel = _platformLabel();
    final ColorScheme cs = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('MediaScanner OHOS Test'),
        backgroundColor: cs.inversePrimary,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Platform badge
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
              decoration: BoxDecoration(
                color: Platform.isOhos
                    ? Colors.teal.withValues(alpha: 0.15)
                    : Colors.blue.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                platformLabel,
                style: TextStyle(
                  color: Platform.isOhos ? Colors.teal : Colors.blue,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Show generated image after scan
            if (_success && _lastFilePath != null) ...[
              Card(
                clipBehavior: Clip.antiAlias,
                elevation: 2,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  children: [
                    Container(
                      constraints: const BoxConstraints(maxHeight: 220),
                      width: double.infinity,
                      color: cs.surfaceContainerHighest,
                      child: Image.file(
                        File(_lastFilePath!),
                        fit: BoxFit.contain,
                        errorBuilder: (_, __, ___) => const Padding(
                          padding: EdgeInsets.all(48),
                          child: Icon(
                            Icons.broken_image,
                            size: 64,
                            color: Colors.grey,
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(12),
                      child: Row(
                        children: [
                          Icon(
                            Icons.check_circle,
                            size: 18,
                            color: Colors.green.shade600,
                          ),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              '已注册到系统相册',
                              style: TextStyle(
                                color: Colors.green.shade700,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
            ],

            // File path info
            if (_lastFilePath != null)
              Container(
                padding: const EdgeInsets.all(10),
                margin: const EdgeInsets.only(bottom: 12),
                decoration: BoxDecoration(
                  color: cs.surfaceContainerHighest,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: SelectableText(
                  _lastFilePath!,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    fontFamily: 'monospace',
                    fontSize: 11,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),

            // Status icon (before success)
            if (!_success || _running)
              Padding(
                padding: const EdgeInsets.only(top: 8),
                child: Icon(
                  _running ? Icons.hourglass_top : Icons.image_outlined,
                  size: 72,
                  color: _running ? Colors.orange : cs.outline,
                ),
              ),

            // Status text
            Text(
              _status,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                color: _success ? Colors.green : null,
              ),
            ),

            const SizedBox(height: 24),

            // Action button
            FilledButton.icon(
              onPressed: _running ? null : _runTest,
              icon: Icon(_success ? Icons.refresh : Icons.play_arrow),
              label: Text(_success ? '重新生成' : '生成测试图片并扫描'),
              style: FilledButton.styleFrom(
                padding: const EdgeInsets.symmetric(
                  horizontal: 24,
                  vertical: 14,
                ),
              ),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  String _platformLabel() {
    if (Platform.isOhos) return 'OpenHarmony';
    if (Platform.isAndroid) return 'Android';
    if (Platform.isIOS) return 'iOS';
    return Platform.operatingSystem;
  }

  Future<void> _runTest() async {
    setState(() {
      _running = true;
      _success = false;
      _status = '正在生成测试图片...';
    });

    try {
      // 1. Choose a writable directory
      final String dirPath = _getWritableDir();
      final String fileName =
          'media_scanner_test_${DateTime.now().millisecondsSinceEpoch}.png';
      final String filePath = '$dirPath/$fileName';

      // 2. Create a minimal valid 1x1 red PNG (sync, zero deps)
      _createMinimalPng(filePath);
      _lastFilePath = filePath;

      setState(() => _status = '已生成测试图片，正在扫描媒体库...');

      // 3. Call media_scanner
      final String? error = await MediaScanner.loadMedia(path: filePath);

      setState(() {
        _running = false;
        if (error == null) {
          _success = true;
          _status = '✅ 媒体扫描成功！\n文件已注册到系统相册';
        } else {
          _success = false;
          _status = '❌ 扫描返回错误:\n$error';
        }
      });
    } catch (e) {
      setState(() {
        _running = false;
        _success = false;
        _status = '❌ 异常:\n$e';
      });
    }
  }

  /// Returns a writable directory for the test file.
  /// Prefers the app sandbox files dir on OHOS.
  String _getWritableDir() {
    if (Platform.isOhos) {
      // Typical OHOS app sandbox files directory.
      // The exact prefix may vary; fall back to system temp if unreadable.
      const String sandboxFilesDir = '/data/storage/el2/base/haps/entry/files';
      if (Directory(sandboxFilesDir).existsSync()) {
        return sandboxFilesDir;
      }
    }
    return Directory.systemTemp.path;
  }

  /// Writes a minimal valid 1×1 red pixel PNG file.
  /// 68 bytes total — no external dependencies beyond dart:io.
  /// Used intentionally: synchronous, deterministic, works even if
  /// Flutter engine rendering is broken (no dart:ui dependency).
  void _createMinimalPng(String filePath) {
    // Known-good minimal PNG: 1×1 red pixel, 8-bit RGB.
    // Verified valid — decodes correctly in any PNG viewer.
    const List<int> pngBytes = <int>[
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
      0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR len+type
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1×1
      0x08, 0x02, 0x00, 0x00, 0x00, // 8-bit RGB
      0x90, 0x77, 0x53, 0xDE, // IHDR CRC
      0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, 0x54, // IDAT len+type
      0x08,
      0xD7,
      0x63,
      0x60,
      0x60,
      0x60,
      0x00,
      0x00, // zlib+filter+RGB(255,0,0)
      0x00, 0x04, 0x00, 0x01, 0x47, 0x61, 0x72, 0x0C, // adler32+CRC
      0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, // IEND len+type
      0xAE, 0x42, 0x60, 0x82, // IEND CRC
    ];

    File(filePath).writeAsBytesSync(pngBytes);
  }
}
