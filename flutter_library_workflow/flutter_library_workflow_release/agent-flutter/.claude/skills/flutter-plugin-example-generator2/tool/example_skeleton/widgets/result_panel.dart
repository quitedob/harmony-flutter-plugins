import 'package:flutter/material.dart';

/// 二级页底部 **Result** 区：只显示 result 文本，保留 `txt_result` 语义 Key 供自动化使用。
class ResultPanel extends StatelessWidget {
  const ResultPanel({
    Key? key,
    required this.result,
    this.emptyHint = '',
  }) : super(key: key);

  final String result;
  final String emptyHint;

  @override
  Widget build(BuildContext context) {
    final String displayResult = result.trim().isEmpty ? emptyHint : result;

    return Padding(
      padding: const EdgeInsets.fromLTRB(12, 4, 12, 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          const Text(
            'Result',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 8),
          Expanded(
            child: SingleChildScrollView(
              child: SelectableText(
                displayResult,
                key: const Key('txt_result'),
                style: const TextStyle(
                  fontFamily: 'monospace',
                  fontSize: 13,
                  height: 1.45,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
