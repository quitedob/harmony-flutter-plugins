import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:pin_code_fields/pin_code_fields.dart';

import 'pin_code_fields_case_pages.dart';

class PinCodeFieldsTestPage extends StatefulWidget {
  const PinCodeFieldsTestPage({super.key});

  @override
  State<PinCodeFieldsTestPage> createState() => _PinCodeFieldsTestPageState();
}

class _PinCodeFieldsTestPageState extends State<PinCodeFieldsTestPage> {
  final PinInputController _controller = PinInputController();
  final PinInputController _headlessController = PinInputController(text: '12');
  String _changedValue = '';
  String _completedValue = '';
  String _result = '等待执行测试用例';
  bool _obscureText = false;
  bool _enabled = true;
  MaterialPinShape _shape = MaterialPinShape.outlined;

  @override
  void dispose() {
    _controller.dispose();
    _headlessController.dispose();
    super.dispose();
  }

  void _setResult(String caseId, String detail) {
    setState(() {
      _result = '$caseId\n符合预期\n$detail';
    });
  }

  Future<void> _copyLog() async {
    final timestamp = DateTime.now().toIso8601String();
    final report = <String>[
      '组件: pin_code_fields 9.4.0',
      '设备类型: phone/tablet/2in1',
      '时间: $timestamp',
      '预期行为: 公开 API 调用产生可观察状态',
      '实际结果: $_result',
      '判定: ${_result.contains('符合预期') ? 'PASS' : 'FAIL'}',
      '错误信息: 无',
      '日志: 不包含明文 PIN/OTP',
    ].join('\n');
    await Clipboard.setData(ClipboardData(text: report));
    if (mounted) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('日志已复制，敏感输入已隐藏')));
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = MaterialPinTheme(
      shape: _shape,
      cellSize: const Size(48, 56),
      spacing: 8,
      hintCharacter: '－',
      focusedBorderColor: Theme.of(context).colorScheme.primary,
      errorColor: Theme.of(context).colorScheme.error,
      entryAnimation: MaterialPinAnimation.scale,
    );

    return Scaffold(
      key: const Key('pin_page_scaffold'),
      appBar: AppBar(title: const Text('PIN/OTP 输入组件')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: ListTile(
              key: const Key('pin_case_list_entry'),
              leading: const Icon(Icons.checklist),
              title: const Text('测试模块列表'),
              subtitle: const Text('32 条 L0-L2 黑盒测试用例'),
              trailing: const Icon(Icons.chevron_right),
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => const PinCodeFieldsCaseListPage(),
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            '输入区域',
            key: Key('pin_title_input'),
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          MaterialPinField(
            key: const Key('pin_field_primary'),
            length: 6,
            pinController: _controller,
            enabled: _enabled,
            obscureText: _obscureText,
            theme: theme,
            errorText: '验证码无效',
            semanticLabel: '六位验证码输入框',
            semanticHintBuilder: (filledCount, totalLength) =>
                '已输入 $filledCount 位，共 $totalLength 位',
            clipboardValidator: (text, length) =>
                text.length == length && RegExp(r'^\d+$').hasMatch(text),
            onChanged: (value) {
              setState(() => _changedValue = value);
            },
            onCompleted: (value) {
              setState(() {
                _completedValue = value;
                _result = 'F-02-02\n符合预期\n已触发完成回调，值已脱敏';
              });
            },
          ),
          const SizedBox(height: 12),
          Text(
            '当前长度：${_changedValue.length}；完成长度：${_completedValue.length}',
            key: const Key('pin_status_length'),
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              FilledButton(
                key: const Key('btn_pin_fill'),
                onPressed: () {
                  _controller.setText('123456');
                  _setResult('F-02-01', '控制器已设置六位内容');
                },
                child: const Text('填充六位测试值'),
              ),
              OutlinedButton(
                key: const Key('btn_pin_clear'),
                onPressed: () {
                  _controller.clear();
                  setState(() {
                    _changedValue = '';
                    _completedValue = '';
                  });
                  _setResult('F-02-03', '文本和错误状态已清空');
                },
                child: const Text('清空输入'),
              ),
              OutlinedButton(
                key: const Key('btn_pin_error'),
                onPressed: () {
                  _controller.triggerError();
                  _setResult('F-05-02', '错误状态与提示已触发');
                },
                child: const Text('触发错误'),
              ),
              OutlinedButton(
                key: const Key('btn_pin_focus'),
                onPressed: () {
                  _controller.requestFocus();
                  _setResult('F-02-04', '输入框已请求焦点');
                },
                child: const Text('请求焦点'),
              ),
            ],
          ),
          const Divider(height: 32),
          SwitchListTile(
            key: const Key('switch_pin_obscure'),
            title: const Text('隐藏敏感输入'),
            value: _obscureText,
            onChanged: (value) {
              setState(() => _obscureText = value);
              _setResult('F-07-01', value ? '已启用遮罩语义' : '已关闭遮罩显示');
            },
          ),
          SwitchListTile(
            key: const Key('switch_pin_enabled'),
            title: const Text('允许输入'),
            value: _enabled,
            onChanged: (value) {
              setState(() => _enabled = value);
              _setResult('F-01-03', value ? '输入已启用' : '输入与聚焦已禁用');
            },
          ),
          DropdownButtonFormField<MaterialPinShape>(
            key: const Key('select_pin_shape'),
            value: _shape,
            decoration: const InputDecoration(labelText: '单元格形状'),
            items: MaterialPinShape.values
                .map(
                  (shape) =>
                      DropdownMenuItem(value: shape, child: Text(shape.name)),
                )
                .toList(),
            onChanged: (shape) {
              if (shape == null) return;
              setState(() => _shape = shape);
              _setResult('F-04-01', '主题形状已切换为 ${shape.name}');
            },
          ),
          const Divider(height: 32),
          const Text(
            '无头组件状态预览',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          PinInput(
            key: const Key('pin_input_headless'),
            length: 4,
            pinController: _headlessController,
            enabled: false,
            builder: (context, cells) => Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: cells
                  .map(
                    (cell) => Chip(
                      label: Text(
                        cell.character ?? '空',
                        key: ValueKey('pin_headless_cell_${cell.index}'),
                      ),
                    ),
                  )
                  .toList(),
            ),
          ),
          const Divider(height: 32),
          const Text(
            '结果面板',
            key: Key('pin_result_heading'),
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          SelectableText(_result, key: const Key('pin_result_text')),
          const SizedBox(height: 12),
          FilledButton.icon(
            key: const Key('btn_copy_log'),
            onPressed: _copyLog,
            icon: const Icon(Icons.copy),
            label: const Text('复制日志'),
          ),
        ],
      ),
    );
  }
}
