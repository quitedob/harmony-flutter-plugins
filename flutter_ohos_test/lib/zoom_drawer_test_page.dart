import 'package:flutter/material.dart';
import 'package:flutter_zoom_drawer/flutter_zoom_drawer.dart';

/// Test page for flutter_zoom_drawer on OpenHarmony.
/// Verifies all 4 built-in drawer styles + basic controller operations.
class ZoomDrawerTestPage extends StatefulWidget {
  const ZoomDrawerTestPage({super.key});

  @override
  State<ZoomDrawerTestPage> createState() => _ZoomDrawerTestPageState();
}

class _ZoomDrawerTestPageState extends State<ZoomDrawerTestPage> {
  final ZoomDrawerController _controller = ZoomDrawerController();
  int _styleIndex = 0;

  static const List<DrawerStyle> styles = [
    DrawerStyle.style1,
    DrawerStyle.style2,
    DrawerStyle.style3,
    DrawerStyle.style4,
  ];

  static const List<String> styleLabels = [
    'Style 1: Slide',
    'Style 2: Slide + Shadow',
    'Style 3: Slide + Rotation',
    'Style 4: Slide + Rotation + Shadow',
  ];

  @override
  Widget build(BuildContext context) {
    return ZoomDrawer(
      controller: _controller,
      style: styles[_styleIndex],
      menuScreen: _buildMenuScreen(context),
      mainScreen: _buildMainScreen(context),
      borderRadius: 24.0,
      showShadow: _styleIndex >= 1,
      angle: _styleIndex >= 2 ? -12.0 : 0.0,
      slideWidth: MediaQuery.of(context).size.width * 0.65,
      duration: const Duration(milliseconds: 400),
      androidCloseOnBackTap: true,
      mainScreenTapClose: true,       // 点主屏幕关闭抽屉
      dragOffset: 100.0,              // 拖拽阈值，越小越灵敏
    );
  }

  Widget _buildMenuScreen(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1A1A2E),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 关闭按钮（OHOS 2in1 无返回键，提供显式关闭入口）
              Align(
                alignment: Alignment.topRight,
                child: IconButton(
                  icon: const Icon(Icons.close, color: Colors.white54),
                  onPressed: () => _controller.close?.call(),
                  tooltip: '关闭抽屉',
                ),
              ),
              const SizedBox(height: 24),
              const CircleAvatar(
                radius: 32,
                backgroundColor: Colors.teal,
                child: Icon(Icons.person, size: 32, color: Colors.white),
              ),
              const SizedBox(height: 16),
              const Text(
                'Flutter Zoom Drawer',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const Text(
                'OHOS Test',
                style: TextStyle(color: Colors.white54, fontSize: 14),
              ),
              const SizedBox(height: 32),
              _menuItem(Icons.home, 'Home'),
              _menuItem(Icons.settings, 'Settings'),
              _menuItem(Icons.info_outline, 'About'),
              const Divider(color: Colors.white24, height: 32),
              _menuItem(Icons.style, 'Switch Style'),
              const Spacer(),
              Text(
                'Platform: ${_platformLabel()}',
                style: const TextStyle(color: Colors.white24, fontSize: 12),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _menuItem(IconData icon, String label) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Icon(icon, color: Colors.white70, size: 22),
          const SizedBox(width: 16),
          Text(
            label,
            style: const TextStyle(color: Colors.white70, fontSize: 16),
          ),
        ],
      ),
    );
  }

  Widget _buildMainScreen(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ZoomDrawer OHOS Test'),
        leading: IconButton(
          icon: const Icon(Icons.menu),
          onPressed: () => _controller.toggle?.call(),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.style),
            tooltip: 'Switch Drawer Style',
            onPressed: _cycleStyle,
          ),
        ],
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.animation, size: 64, color: Colors.teal),
              const SizedBox(height: 24),
              Text(
                styleLabels[_styleIndex],
                style: Theme.of(context).textTheme.headlineSmall,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                '点左上角 ☰ 或右滑打开抽屉\n打开后点主屏幕区域或左滑关闭',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.grey,
                    ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 32),
              FilledButton.icon(
                onPressed: () => _controller.toggle?.call(),
                icon: const Icon(Icons.menu_open),
                label: const Text('Toggle Drawer'),
              ),
              const SizedBox(height: 16),
              OutlinedButton.icon(
                onPressed: _cycleStyle,
                icon: const Icon(Icons.style),
                label: Text('Next Style (${_styleIndex + 1}/4)'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _cycleStyle() {
    setState(() {
      _styleIndex = (_styleIndex + 1) % styles.length;
    });
  }

  String _platformLabel() {
    // Using dart:io Platform to show we're on OHOS
    try {
      // ignore: avoid_dynamic_calls
      final dynamic platform = _getPlatform();
      return platform.toString();
    } catch (_) {
      return 'Flutter';
    }
  }

  dynamic _getPlatform() {
    // ignore: depend_on_referenced_packages
    return TargetPlatform.ohos;
  }
}
