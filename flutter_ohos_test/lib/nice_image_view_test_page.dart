import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:nice_image_view/nice_image_view.dart';

/// NiceImageView 完整测试页
///
/// 全部用户可见文本使用中文。
/// 提供一键复制日志功能（Clipboard）。
class NiceImageViewTestPage extends StatefulWidget {
  const NiceImageViewTestPage({super.key});

  @override
  State<NiceImageViewTestPage> createState() => _NiceImageViewTestPageState();
}

class _NiceImageViewTestPageState extends State<NiceImageViewTestPage> {
  bool _isCircle = true;
  bool _isCoverSrc = false;
  double _cornerRadius = 0;
  double _borderWidth = 3;
  double _innerBorderWidth = 0;
  bool _showMask = false;

  static const List<Color> _borderColors = [
    Colors.orange,
    Colors.blue,
    Colors.red,
    Colors.green,
    Colors.purple,
  ];
  int _borderColorIndex = 0;

  final List<String> _log = <String>[];

  @override
  void initState() {
    super.initState();
    _appendLog('NiceImageView 测试初始化完成');
  }

  void _appendLog(String msg) {
    final ts = DateTime.now().toIso8601String().substring(11, 19);
    setState(() => _log.add('[$ts] $msg'));
  }

  Future<void> _copyLog() async {
    final buffer = StringBuffer();
    buffer.writeln('=== NiceImageView 测试报告 ===');
    buffer.writeln('设备类型：${Theme.of(context).platform}');
    buffer.writeln('测试时间：${DateTime.now().toIso8601String()}');
    buffer.writeln();
    buffer.writeln('--- 参数快照 ---');
    buffer.writeln('圆形模式 (isCircle)：$_isCircle');
    buffer.writeln('边框覆盖 (isCoverSrc)：$_isCoverSrc');
    buffer.writeln('统一圆角 (cornerRadius)：${_cornerRadius.round()}');
    buffer.writeln('边框宽度 (borderWidth)：${_borderWidth.round()}');
    buffer.writeln('边框颜色索引：$_borderColorIndex');
    buffer.writeln('内边框宽度 (innerBorderWidth)：${_innerBorderWidth.round()}');
    buffer.writeln('遮罩 (maskColor)：$_showMask');
    buffer.writeln();
    buffer.writeln('--- 操作日志 ---');
    for (final entry in _log) {
      buffer.writeln(entry);
    }
    buffer.writeln();
    buffer.writeln('=== 报告结束 ===');

    await Clipboard.setData(ClipboardData(text: buffer.toString()));
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('✅ 测试报告已复制到剪贴板'),
          duration: Duration(seconds: 1),
        ),
      );
    }
    _appendLog('复制日志：报告已复制到剪贴板');
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    // Build a simple in-memory test image (1×1 will be scaled)
    // Use a generated solid-color placeholder via a simple Container-to-image approach
    // Actually, we'll use a colored Container + RepaintBoundary to generate a test image at runtime
    // For simplicity, we'll use a pre-built approach: a Container with a gradient as the image source
    // But the widget needs an ImageProvider... Let's just use a placeholder NetworkImage that
    // will gracefully fail and show nothing, but borders/mask/clip still work.
    // Better: use a MemoryImage with a generated PNG.

    return Scaffold(
      appBar: AppBar(
        title: const Text('NiceImageView 完整测试'),
        backgroundColor: cs.inversePrimary,
        actions: [
          IconButton(
            key: const Key('btn_copy_log'),
            icon: const Icon(Icons.copy_all),
            tooltip: '复制日志',
            onPressed: _copyLog,
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // ---- 预览 ----
          Center(
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(color: cs.outline.withValues(alpha: 0.3)),
                borderRadius: BorderRadius.circular(4),
              ),
              child: NiceImageView(
                image: const AssetImage('assets/cat.jpg'),
                width: 220,
                height: 220,
                isCircle: _isCircle,
                isCoverSrc: _isCoverSrc,
                cornerRadius: _cornerRadius,
                borderWidth: _borderWidth,
                borderColor: _borderColors[_borderColorIndex],
                innerBorderWidth: _innerBorderWidth,
                innerBorderColor: Colors.white,
                maskColor: _showMask ? Colors.black38 : Colors.transparent,
              ),
            ),
          ),

          const SizedBox(height: 12),
          // 复制日志按钮（主区域）
          Center(
            child: OutlinedButton.icon(
              key: const Key('btn_copy_log_2'),
              icon: const Icon(Icons.copy_all, size: 18),
              label: const Text('复制日志'),
              onPressed: _copyLog,
            ),
          ),

          const SizedBox(height: 20),

          // ---- 模式 ----
          Text('模式', style: Theme.of(context).textTheme.titleSmall),
          SwitchListTile(
            title: const Text('圆形模式'),
            subtitle: Text(_isCircle ? '当前：圆形（四角圆角设置不生效）' : '当前：矩形'),
            value: _isCircle,
            onChanged: (v) {
              setState(() => _isCircle = v);
              _appendLog('圆形模式切换 → ${v ? "圆形" : "矩形"}');
            },
            dense: true,
          ),

          // ---- 圆角（仅矩形模式） ----
          if (!_isCircle) ...[
            const Divider(),
            Text('圆角', style: Theme.of(context).textTheme.titleSmall),
            _buildSlider('统一圆角', _cornerRadius, 0, 80, (v) {
              setState(() => _cornerRadius = v);
              _appendLog('统一圆角调整 → ${v.round()}');
            }),
          ],

          // ---- 边框覆盖 ----
          const Divider(),
          Text('边框覆盖', style: Theme.of(context).textTheme.titleSmall),
          SwitchListTile(
            title: const Text('边框覆盖图片'),
            subtitle: Text(_isCoverSrc ? '当前：边框绘制在图片上方' : '当前：图片避开边框区域'),
            value: _isCoverSrc,
            onChanged: (v) {
              setState(() => _isCoverSrc = v);
              _appendLog('边框覆盖切换 → $v');
            },
            dense: true,
          ),

          // ---- 外边框 ----
          const Divider(),
          Text('外边框', style: Theme.of(context).textTheme.titleSmall),
          _buildSlider('边框宽度', _borderWidth, 0, 20, (v) {
            setState(() => _borderWidth = v);
            _appendLog('边框宽度调整 → ${v.round()}');
          }),
          _buildColorSelector(),

          // ---- 内边框（仅圆形模式） ----
          if (_isCircle) ...[
            const Divider(),
            Text('内边框（仅圆形模式）', style: Theme.of(context).textTheme.titleSmall),
            _buildSlider('内边框宽度', _innerBorderWidth, 0, 12, (v) {
              setState(() => _innerBorderWidth = v);
              _appendLog('内边框宽度调整 → ${v.round()}');
            }),
          ],

          // ---- 遮罩 ----
          const Divider(),
          Text('遮罩', style: Theme.of(context).textTheme.titleSmall),
          SwitchListTile(
            title: const Text('半透明遮罩'),
            subtitle: const Text('黑色 38% 透明度叠加在裁剪区域'),
            value: _showMask,
            onChanged: (v) {
              setState(() => _showMask = v);
              _appendLog('遮罩切换 → $v');
            },
            dense: true,
          ),

          // ---- 日志预览 ----
          const Divider(),
          const SizedBox(height: 8),
          Text('操作日志', style: Theme.of(context).textTheme.titleSmall),
          const SizedBox(height: 4),
          Container(
            constraints: const BoxConstraints(maxHeight: 150),
            decoration: BoxDecoration(
              color: cs.surfaceContainerHighest,
              borderRadius: BorderRadius.circular(8),
            ),
            child: ListView.builder(
              shrinkWrap: true,
              itemCount: _log.length,
              itemBuilder: (_, i) => Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 2),
                child: Text(
                  _log[_log.length - 1 - i], // newest first
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        fontFamily: 'monospace',
                        fontSize: 11,
                      ),
                ),
              ),
            ),
          ),

          // ---- 底部信息 ----
          const Divider(),
          const SizedBox(height: 8),
          Text(
            '基于 Android NiceImageView 移植\npure_dart · 零原生代码 · 全平台可用',
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: cs.outline,
                ),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  // ---------------------------------------------------------------------------
  // Shared widgets
  // ---------------------------------------------------------------------------

  Widget _buildSlider(
    String label,
    double value,
    double min,
    double max,
    ValueChanged<double> onChanged,
  ) {
    return ListTile(
      title: Text(label),
      trailing: SizedBox(
        width: 200,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Slider(value: value, min: min, max: max, onChanged: onChanged),
            SizedBox(
              width: 36,
              child: Text(
                value.round().toString(),
                textAlign: TextAlign.end,
                style: const TextStyle(fontWeight: FontWeight.w600),
              ),
            ),
          ],
        ),
      ),
      dense: true,
    );
  }

  Widget _buildColorSelector() {
    return Padding(
      padding: const EdgeInsets.only(left: 16),
      child: Row(
        children: [
          const Text('边框颜色：'),
          const SizedBox(width: 8),
          ...List.generate(_borderColors.length, (i) {
            final selected = i == _borderColorIndex;
            return GestureDetector(
              onTap: () {
                setState(() => _borderColorIndex = i);
                _appendLog('边框颜色切换 → ${["橙", "蓝", "红", "绿", "紫"][i]}');
              },
              child: Container(
                width: selected ? 36 : 28,
                height: selected ? 36 : 28,
                margin: const EdgeInsets.symmetric(horizontal: 3),
                decoration: BoxDecoration(
                  color: _borderColors[i],
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: selected
                        ? Theme.of(context).colorScheme.primary
                        : Colors.grey.shade400,
                    width: selected ? 3 : 1,
                  ),
                  boxShadow: selected
                      ? [
                          BoxShadow(
                            color: _borderColors[i].withValues(alpha: 0.4),
                            blurRadius: 6,
                            spreadRadius: 1,
                          )
                        ]
                      : null,
                ),
              ),
            );
          }),
        ],
      ),
    );
  }
}
