import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:nice_image_view/nice_image_view.dart';

void main() {
  runApp(const NiceImageViewExample());
}

class NiceImageViewExample extends StatelessWidget {
  const NiceImageViewExample({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NiceImageView 示例',
      theme: ThemeData(
        colorSchemeSeed: Colors.blue,
        useMaterial3: true,
      ),
      home: const DemoPage(),
    );
  }
}

class DemoPage extends StatefulWidget {
  const DemoPage({super.key});

  @override
  State<DemoPage> createState() => _DemoPageState();
}

class _DemoPageState extends State<DemoPage> {
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
    _log.add('[${_ts()}] 示例初始化完成');
  }

  String _ts() => DateTime.now().toIso8601String().substring(11, 19);

  Future<void> _copyLog() async {
    final b = StringBuffer();
    b.writeln('=== NiceImageView 测试报告 ===');
    b.writeln('时间：${DateTime.now().toIso8601String()}');
    b.writeln('圆形模式：$_isCircle');
    b.writeln('边框覆盖：$_isCoverSrc');
    b.writeln('统一圆角：${_cornerRadius.round()}');
    b.writeln('边框宽度：${_borderWidth.round()}');
    b.writeln('内边框宽度：${_innerBorderWidth.round()}');
    b.writeln('遮罩：$_showMask');
    b.writeln('--- 日志 ---');
    for (final e in _log) {
      b.writeln(e);
    }
    b.writeln('=== 报告结束 ===');

    await Clipboard.setData(ClipboardData(text: b.toString()));
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('✅ 测试报告已复制到剪贴板'),
          duration: Duration(seconds: 1),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('NiceImageView 示例'),
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
          // 预览区
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
          Center(
            child: OutlinedButton.icon(
              key: const Key('btn_copy_log_2'),
              icon: const Icon(Icons.copy_all, size: 18),
              label: const Text('复制日志'),
              onPressed: _copyLog,
            ),
          ),

          const SizedBox(height: 20),

          // 圆形模式
          Text('模式', style: Theme.of(context).textTheme.titleSmall),
          SwitchListTile(
            title: const Text('圆形模式'),
            subtitle: Text(_isCircle ? '当前：圆形' : '当前：矩形'),
            value: _isCircle,
            onChanged: (v) {
              setState(() {
                _isCircle = v;
                _log.add('[${_ts()}] 圆形模式 → $v');
              });
            },
            dense: true,
          ),

          // 圆角（仅矩形模式）
          if (!_isCircle) ...[
            const Divider(),
            Text('圆角', style: Theme.of(context).textTheme.titleSmall),
            _slider('统一圆角', _cornerRadius, 0, 80, (v) {
              setState(() {
                _cornerRadius = v;
                _log.add('[${_ts()}] 统一圆角 → ${v.round()}');
              });
            }),
          ],

          // 边框覆盖
          const Divider(),
          Text('边框覆盖', style: Theme.of(context).textTheme.titleSmall),
          SwitchListTile(
            title: const Text('边框覆盖图片'),
            value: _isCoverSrc,
            onChanged: (v) {
              setState(() {
                _isCoverSrc = v;
                _log.add('[${_ts()}] 边框覆盖 → $v');
              });
            },
            dense: true,
          ),

          // 外边框
          const Divider(),
          Text('外边框', style: Theme.of(context).textTheme.titleSmall),
          _slider('边框宽度', _borderWidth, 0, 20, (v) {
            setState(() {
              _borderWidth = v;
              _log.add('[${_ts()}] 边框宽度 → ${v.round()}');
            });
          }),
          _colorSelector(cs),

          // 内边框（仅圆形模式）
          if (_isCircle) ...[
            const Divider(),
            Text('内边框（仅圆形模式）', style: Theme.of(context).textTheme.titleSmall),
            _slider('内边框宽度', _innerBorderWidth, 0, 12, (v) {
              setState(() {
                _innerBorderWidth = v;
                _log.add('[${_ts()}] 内边框宽度 → ${v.round()}');
              });
            }),
          ],

          // 遮罩
          const Divider(),
          Text('遮罩', style: Theme.of(context).textTheme.titleSmall),
          SwitchListTile(
            title: const Text('半透明遮罩'),
            value: _showMask,
            onChanged: (v) {
              setState(() {
                _showMask = v;
                _log.add('[${_ts()}] 遮罩 → $v');
              });
            },
            dense: true,
          ),

          // 底部
          const Divider(),
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

  Widget _slider(
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

  Widget _colorSelector(ColorScheme cs) {
    return Padding(
      padding: const EdgeInsets.only(left: 16),
      child: Row(
        children: [
          const Text('边框颜色：'),
          const SizedBox(width: 8),
          ...List.generate(_borderColors.length, (i) {
            final selected = i == _borderColorIndex;
            return GestureDetector(
              onTap: () => setState(() => _borderColorIndex = i),
              child: Container(
                width: selected ? 36 : 28,
                height: selected ? 36 : 28,
                margin: const EdgeInsets.symmetric(horizontal: 3),
                decoration: BoxDecoration(
                  color: _borderColors[i],
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: selected ? cs.primary : Colors.grey.shade400,
                    width: selected ? 3 : 1,
                  ),
                  boxShadow: selected
                      ? [
                          BoxShadow(
                              color: _borderColors[i].withValues(alpha: 0.4),
                              blurRadius: 6)
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
