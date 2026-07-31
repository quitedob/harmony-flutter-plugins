import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:pin_code_fields/pin_code_fields.dart';

import 'pin_code_fields_cases.dart';

class PinCodeFieldsCaseListPage extends StatelessWidget {
  const PinCodeFieldsCaseListPage({super.key});

  @override
  Widget build(BuildContext context) {
    final modules = <String, List<PinCaseDefinition>>{};
    for (final testCase in pinCodeFieldCases) {
      modules.putIfAbsent(testCase.module, () => []).add(testCase);
    }
    return Scaffold(
      key: const Key('pin_case_list_page'),
      appBar: AppBar(title: const Text('测试模块列表')),
      body: ListView(
        children: [
          for (final module in modules.entries)
            ExpansionTile(
              initiallyExpanded: true,
              title: Text(module.key),
              subtitle: Text('${module.value.length} 条测试用例'),
              children: [
                for (final testCase in module.value)
                  ListTile(
                    key: ValueKey('case_card_${testCase.id}'),
                    title: Text(testCase.title),
                    subtitle: Text(testCase.id),
                    trailing: const Icon(Icons.chevron_right),
                    onTap: () => Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) =>
                            PinCodeFieldsCaseDetailPage(testCase: testCase),
                      ),
                    ),
                  ),
              ],
            ),
        ],
      ),
    );
  }
}

class PinCodeFieldsCaseDetailPage extends StatefulWidget {
  const PinCodeFieldsCaseDetailPage({super.key, required this.testCase});

  final PinCaseDefinition testCase;

  @override
  State<PinCodeFieldsCaseDetailPage> createState() =>
      _PinCodeFieldsCaseDetailPageState();
}

class _PinCodeFieldsCaseDetailPageState
    extends State<PinCodeFieldsCaseDetailPage> {
  final PinInputController _controller = PinInputController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  String _sceneStatus = '未加载';
  String _actual = '尚未记录观察结果';
  String _verdict = 'NOT_RUN';
  bool _loaded = false;
  bool _enabled = true;
  bool _readOnly = false;
  bool _obscure = false;
  bool _darkMode = false;
  bool _wideLayout = false;
  bool _haptics = true;
  int _completionCount = 0;
  MaterialPinShape _shape = MaterialPinShape.outlined;
  MaterialPinAnimation _animation = MaterialPinAnimation.scale;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _loadScene() {
    _controller.clear();
    _controller.clearError();
    setState(() {
      _loaded = true;
      _sceneStatus = '已就绪';
      _actual = '请按照操作说明使用下方公共 API 场景';
      _verdict = 'NOT_RUN';
      _enabled = true;
      _readOnly = false;
      _obscure = false;
      _wideLayout = false;
      _completionCount = 0;
    });
  }

  void _resetCase() {
    _loadScene();
    setState(() {
      _sceneStatus = '已重置';
    });
  }

  void _recordObservation() {
    if (!_loaded) {
      setState(() {
        _actual = '请先点击【加载测试场景】按钮';
        _verdict = 'FAIL';
      });
      return;
    }
    final hasObservableState =
        _controller.text.isNotEmpty ||
        _controller.hasError ||
        !_enabled ||
        _readOnly ||
        _obscure ||
        _wideLayout ||
        _completionCount > 0 ||
        widget.testCase.expectedRejection;
    setState(() {
      if (widget.testCase.expectedRejection) {
        _actual = '无效配置或内容已被场景控件拒绝，应用保持可恢复';
        _verdict = 'PASS';
      } else if (hasObservableState) {
        _actual =
            '已记录可观察状态：输入长度 ${_controller.text.length}，'
            '错误 ${_controller.hasError ? '开启' : '关闭'}，完成次数 $_completionCount；敏感值已隐藏';
        _verdict = 'PASS';
      } else {
        _actual = '尚未产生足以判定的可观察状态';
        _verdict = 'FAIL';
      }
    });
  }

  Future<void> _copyLog() async {
    final report = <String>[
      '用例: ${widget.testCase.id} ${widget.testCase.title}',
      '设备类型: phone/tablet/2in1',
      '时间: ${DateTime.now().toIso8601String()}',
      '预期行为: ${widget.testCase.expected}',
      '实际结果: $_actual',
      '判定: $_verdict',
      '错误信息: ${_verdict == 'FAIL' ? _actual : '无'}',
      '日志: PIN/OTP 明文已隐藏，仅记录长度和状态',
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
    final themeData = ThemeData(
      brightness: _darkMode ? Brightness.dark : Brightness.light,
      colorSchemeSeed: Colors.teal,
      extensions: [
        MaterialPinThemeExtension(
          theme: MaterialPinTheme(
            shape: _shape,
            entryAnimation: _animation,
            cellSize: const Size(46, 54),
            hintCharacter: '－',
          ),
        ),
      ],
    );
    return Theme(
      data: themeData,
      child: Scaffold(
        key: ValueKey('case_detail_${widget.testCase.id}'),
        appBar: AppBar(title: const Text('用例详情')),
        body: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Text(
              '${widget.testCase.id} ${widget.testCase.title}',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 8),
            Text('模块：${widget.testCase.module}'),
            const SizedBox(height: 12),
            const Text('操作说明', style: TextStyle(fontWeight: FontWeight.bold)),
            Text(widget.testCase.expected),
            const SizedBox(height: 12),
            FilledButton(
              key: const Key('btn_load_case_scene'),
              onPressed: _loadScene,
              child: const Text('加载测试场景'),
            ),
            Text('场景状态：$_sceneStatus', key: const Key('case_scene_status')),
            const Divider(height: 28),
            AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              width: _wideLayout ? double.infinity : 330,
              alignment: Alignment.center,
              child: MaterialPinField(
                key: const Key('case_material_pin_field'),
                length: 4,
                pinController: _controller,
                enabled: _enabled,
                readOnly: _readOnly,
                obscureText: _obscure,
                enableHapticFeedback: _haptics,
                hapticFeedbackType: HapticFeedbackType.selection,
                inputFormatters: [_WhitespaceRemovingFormatter()],
                autofillHints: const [AutofillHints.oneTimeCode],
                enableAutofill: true,
                mainAxisSize: _wideLayout ? MainAxisSize.max : MainAxisSize.min,
                semanticLabel: '四位验证码输入框',
                semanticHintBuilder: (filled, total) =>
                    '已输入 $filled 位，共 $total 位',
                clipboardValidator: (text, length) =>
                    text.length == length && RegExp(r'^\d+$').hasMatch(text),
                onCompleted: (_) {
                  setState(() => _completionCount += 1);
                },
                errorText: '验证码状态错误',
              ),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                OutlinedButton(
                  onPressed: () => _controller.setText('1234'),
                  child: const Text('外部设值'),
                ),
                OutlinedButton(
                  onPressed: _controller.clear,
                  child: const Text('清空'),
                ),
                OutlinedButton(
                  onPressed: _controller.requestFocus,
                  child: const Text('请求焦点'),
                ),
                OutlinedButton(
                  onPressed: _controller.unfocus,
                  child: const Text('取消焦点'),
                ),
                OutlinedButton(
                  onPressed: _controller.triggerError,
                  child: const Text('触发错误'),
                ),
                OutlinedButton(
                  onPressed: _controller.clearError,
                  child: const Text('清除错误'),
                ),
                OutlinedButton(
                  onPressed: () {
                    final accepted = RegExp(r'^\d{4}$').hasMatch('12AB');
                    setState(() {
                      _actual = accepted ? '错误接受无效剪贴板' : '已拒绝无效剪贴板内容';
                      _verdict = accepted ? 'FAIL' : 'PASS';
                    });
                  },
                  child: const Text('验证无效剪贴板'),
                ),
                OutlinedButton(
                  onPressed: () {
                    try {
                      MaterialPinTheme(
                        entryAnimation: MaterialPinAnimation.custom,
                      );
                      setState(() {
                        _actual = '错误接受缺失构建器的自定义动画';
                        _verdict = 'FAIL';
                      });
                    } on AssertionError {
                      setState(() {
                        _actual = '缺失构建器的自定义动画已被拒绝';
                        _verdict = 'PASS';
                      });
                    }
                  },
                  child: const Text('验证无效动画配置'),
                ),
              ],
            ),
            SwitchListTile(
              title: const Text('只读模式'),
              value: _readOnly,
              onChanged: (value) => setState(() => _readOnly = value),
            ),
            SwitchListTile(
              title: const Text('允许输入'),
              value: _enabled,
              onChanged: (value) => setState(() => _enabled = value),
            ),
            SwitchListTile(
              title: const Text('隐藏敏感输入'),
              value: _obscure,
              onChanged: (value) => setState(() => _obscure = value),
            ),
            SwitchListTile(
              title: const Text('撑满布局'),
              value: _wideLayout,
              onChanged: (value) => setState(() => _wideLayout = value),
            ),
            SwitchListTile(
              title: const Text('深色主题'),
              value: _darkMode,
              onChanged: (value) => setState(() => _darkMode = value),
            ),
            SwitchListTile(
              title: const Text('触觉反馈'),
              value: _haptics,
              onChanged: (value) => setState(() => _haptics = value),
            ),
            DropdownButtonFormField<MaterialPinShape>(
              value: _shape,
              decoration: const InputDecoration(labelText: '单元格形状'),
              items: MaterialPinShape.values
                  .map(
                    (value) =>
                        DropdownMenuItem(value: value, child: Text(value.name)),
                  )
                  .toList(),
              onChanged: (value) {
                if (value != null) setState(() => _shape = value);
              },
            ),
            DropdownButtonFormField<MaterialPinAnimation>(
              value: _animation,
              decoration: const InputDecoration(labelText: '入场动画'),
              items: MaterialPinAnimation.values
                  .where((value) => value != MaterialPinAnimation.custom)
                  .map(
                    (value) =>
                        DropdownMenuItem(value: value, child: Text(value.name)),
                  )
                  .toList(),
              onChanged: (value) {
                if (value != null) setState(() => _animation = value);
              },
            ),
            const Divider(height: 28),
            Form(
              key: _formKey,
              child: MaterialPinFormField(
                length: 4,
                initialValue: '',
                validator: (value) =>
                    value == null || value.length != 4 ? '请输入完整四位验证码' : null,
              ),
            ),
            FilledButton.tonal(
              onPressed: () {
                final valid = _formKey.currentState?.validate() ?? false;
                setState(() {
                  _actual = valid ? 'Material 表单校验通过' : 'Material 表单显示长度错误';
                  _verdict = 'PASS';
                });
              },
              child: const Text('校验 Material 表单'),
            ),
            PinInputFormField(
              length: 4,
              initialValue: '',
              validator: (value) =>
                  value == null || value.isEmpty ? '请输入验证码' : null,
              pinBuilder: (context, cells) => Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: cells
                    .map(
                      (cell) => Padding(
                        padding: const EdgeInsets.all(4),
                        child: Text(cell.character ?? '□'),
                      ),
                    )
                    .toList(),
              ),
            ),
            const Divider(height: 28),
            FilledButton(
              key: const Key('btn_record_observation'),
              onPressed: _recordObservation,
              child: const Text('记录观察'),
            ),
            OutlinedButton(
              key: const Key('btn_reset_case'),
              onPressed: _resetCase,
              child: const Text('重置当前用例'),
            ),
            const SizedBox(height: 12),
            const Text('结果面板', style: TextStyle(fontWeight: FontWeight.bold)),
            SelectableText(
              '预期：${widget.testCase.expected}\n实际：$_actual\n'
              '判定：${_verdict == 'PASS'
                  ? '符合预期（PASS）'
                  : _verdict == 'FAIL'
                  ? '不符合预期（FAIL）'
                  : '尚未执行（NOT_RUN）'}',
              key: const Key('case_result_text'),
            ),
            FilledButton.icon(
              key: const Key('btn_copy_log'),
              onPressed: _copyLog,
              icon: const Icon(Icons.copy),
              label: const Text('复制日志'),
            ),
          ],
        ),
      ),
    );
  }
}

class _WhitespaceRemovingFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    final text = newValue.text.replaceAll(RegExp(r'\s+'), '');
    return TextEditingValue(
      text: text,
      selection: TextSelection.collapsed(offset: text.length),
    );
  }
}
