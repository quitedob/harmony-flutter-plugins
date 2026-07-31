import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_ohos_test/pin_code_fields_case_pages.dart';
import 'package:flutter_ohos_test/pin_code_fields_cases.dart';
import 'package:flutter_ohos_test/pin_code_fields_test_page.dart';

void main() {
  testWidgets('用例数据覆盖 32 个唯一 ID 且模块列表可渲染', (tester) async {
    expect(pinCodeFieldCases, hasLength(32));
    expect(
      pinCodeFieldCases.map((testCase) => testCase.id).toSet(),
      hasLength(32),
    );

    await tester.pumpWidget(
      const MaterialApp(home: PinCodeFieldsCaseListPage()),
    );

    expect(find.text('测试模块列表'), findsOneWidget);
    // 首个模块的用例应直接渲染（ExpansionTile 默认展开）
    expect(find.text('F-01-01'), findsWidgets);
  });

  testWidgets('负向配置拒绝按符合预期记录 PASS', (tester) async {
    final testCase = pinCodeFieldCases.singleWhere(
      (candidate) => candidate.id == 'F-04-04',
    );
    await tester.pumpWidget(
      MaterialApp(home: PinCodeFieldsCaseDetailPage(testCase: testCase)),
    );

    await tester.tap(find.byKey(const Key('btn_load_case_scene')));
    await tester.pump();

    await tester.scrollUntilVisible(
      find.text('验证无效动画配置'),
      200,
      scrollable: find.byType(Scrollable).first,
    );
    await tester.tap(find.text('验证无效动画配置'));
    await tester.pump();

    await tester.scrollUntilVisible(
      find.textContaining('符合预期（PASS）'),
      200,
      scrollable: find.byType(Scrollable).first,
    );
    expect(find.textContaining('符合预期（PASS）'), findsOneWidget);
  });

  testWidgets('复制日志不包含测试 PIN 明文', (tester) async {
    final clipboardMessages = <MethodCall>[];
    tester.binding.defaultBinaryMessenger.setMockMethodCallHandler(
      SystemChannels.platform,
      (call) async {
        clipboardMessages.add(call);
        return null;
      },
    );

    await tester.pumpWidget(const MaterialApp(home: PinCodeFieldsTestPage()));
    await tester.tap(find.byKey(const Key('btn_pin_fill')));
    await tester.pump();

    await tester.scrollUntilVisible(
      find.byKey(const Key('btn_copy_log')),
      200,
      scrollable: find.byType(Scrollable).first,
    );
    await tester.tap(find.byKey(const Key('btn_copy_log')));
    await tester.pump();

    final clipboardCall = clipboardMessages.lastWhere(
      (call) => call.method == 'Clipboard.setData',
    );
    final clipboardText =
        (clipboardCall.arguments as Map<Object?, Object?>)['text']! as String;

    expect(clipboardText, contains('F-02-01'));
    expect(clipboardText, contains('PASS'));
    expect(clipboardText, isNot(contains('123456')));
  });

  testWidgets('填充六位测试值后显示长度 6', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: PinCodeFieldsTestPage()));
    await tester.tap(find.byKey(const Key('btn_pin_fill')));
    await tester.pump();
    expect(find.textContaining('当前长度：6'), findsOneWidget);
  });
}
