import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_zoom_drawer/flutter_zoom_drawer.dart';

/// flutter_zoom_drawer OHOS 适配测试套件
/// 覆盖 ZoomDrawer Widget 渲染、ZoomDrawerController 编程控制、
/// 内置风格枚举、DrawerState 状态机。
///
/// flutter_zoom_drawer 为 pure_dart 类型包（零原生代码），
/// 测试聚焦 Flutter Framework 层 Widget/Controller/枚举行为。
void main() {
  // ─────────────────────────────────────────────
  // F-01 ZoomDrawer Widget 渲染测试
  // ─────────────────────────────────────────────
  group('F-01 ZoomDrawer Widget 渲染', () {
    testWidgets('F-01-01 提供 menuScreen 和 mainScreen 后抽屉组件能正常渲染',
        (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            menuScreen: const Scaffold(body: Center(child: Text('Menu'))),
            mainScreen: const Scaffold(body: Center(child: Text('Main'))),
          ),
        ),
      );

      // 两个屏幕都应该在 widget 树中
      expect(find.text('Menu'), findsOneWidget);
      expect(find.text('Main'), findsOneWidget);
    });

    testWidgets('F-01-06 slideWidth 参数控制抽屉滑出宽度',
        (WidgetTester tester) async {
      // slideWidth=0 时 ZoomDrawer 正常构建不崩溃
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            menuScreen: const Scaffold(body: Text('Menu')),
            mainScreen: const Scaffold(body: Text('Main')),
            slideWidth: 0,
          ),
        ),
      );
      expect(find.text('Menu'), findsOneWidget);
      expect(find.text('Main'), findsOneWidget);

      // slideWidth=275 默认值也正常构建
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            menuScreen: const Scaffold(body: Text('Menu2')),
            mainScreen: const Scaffold(body: Text('Main2')),
            slideWidth: 275.0,
          ),
        ),
      );
      expect(find.text('Menu2'), findsOneWidget);
      expect(find.text('Main2'), findsOneWidget);
    });

    testWidgets('F-01-07 borderRadius 参数控制主屏幕圆角渲染',
        (WidgetTester tester) async {
      // borderRadius=16 默认值正常构建
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            menuScreen: const Scaffold(body: Text('Menu')),
            mainScreen: const Scaffold(body: Text('Main')),
            borderRadius: 16.0,
          ),
        ),
      );
      expect(find.text('Menu'), findsOneWidget);

      // borderRadius=0 也正常构建
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            menuScreen: const Scaffold(body: Text('Menu0')),
            mainScreen: const Scaffold(body: Text('Main0')),
            borderRadius: 0,
          ),
        ),
      );
      expect(find.text('Menu0'), findsOneWidget);
    });

    testWidgets('F-01-08 drawerStyleBuilder 自定义风格正常渲染',
        (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            menuScreen: const Scaffold(body: Text('CustomMenu')),
            mainScreen: const Scaffold(body: Text('CustomMain')),
            drawerStyleBuilder: (
              BuildContext context,
              double animationValue,
              double slideWidth,
              Widget menuScreen,
              Widget mainScreen,
            ) {
              return Stack(
                children: [menuScreen, mainScreen],
              );
            },
          ),
        ),
      );

      expect(find.text('CustomMenu'), findsOneWidget);
      expect(find.text('CustomMain'), findsOneWidget);
    });
  });

  // ─────────────────────────────────────────────
  // F-02 ZoomDrawerController 编程控制
  // ─────────────────────────────────────────────
  group('F-02 ZoomDrawerController 编程控制', () {
    test('F-02-01 controller.open() 方法签名正确', () {
      final controller = ZoomDrawerController();
      // 初始未绑定到 Widget，open 为 null
      expect(controller.open, isNull);
    });

    test('F-02-02 controller.close() 方法签名正确', () {
      final controller = ZoomDrawerController();
      expect(controller.close, isNull);
    });

    test('F-02-03 controller.toggle() 方法签名正确', () {
      final controller = ZoomDrawerController();
      expect(controller.toggle, isNull);
    });

    test('F-02-04 controller.isOpen() 方法签名正确', () {
      final controller = ZoomDrawerController();
      expect(controller.isOpen, isNull);
    });

    test('F-02-06 controller.stateNotifier 初始为 null', () {
      final controller = ZoomDrawerController();
      expect(controller.stateNotifier, isNull);
    });

    testWidgets('F-02 controller 绑定后方法可用', (WidgetTester tester) async {
      final controller = ZoomDrawerController();

      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            controller: controller,
            menuScreen: const Scaffold(body: Text('Menu')),
            mainScreen: const Scaffold(body: Text('Main')),
          ),
        ),
      );

      // 绑定到 Widget 后方法应非 null
      await tester.pump();
      expect(controller.open, isNotNull);
      expect(controller.close, isNotNull);
      expect(controller.toggle, isNotNull);
      expect(controller.isOpen, isNotNull);
      expect(controller.stateNotifier, isNotNull);
    });

    testWidgets('F-02 controller.open/close/toggle/isOpen 完整流程',
        (WidgetTester tester) async {
      final controller = ZoomDrawerController();

      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            controller: controller,
            menuScreen: const Scaffold(body: Text('Menu')),
            mainScreen: const Scaffold(body: Text('Main')),
            duration: const Duration(milliseconds: 50),
            reverseDuration: const Duration(milliseconds: 50),
          ),
        ),
      );

      await tester.pump();

      // 初始状态：closed
      expect(controller.isOpen!(), isFalse);
      expect(controller.stateNotifier!.value, equals(DrawerState.closed));

      // 打开抽屉
      controller.open!();
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      expect(controller.isOpen!(), isTrue);
      expect(controller.stateNotifier!.value, equals(DrawerState.open));

      // 关闭抽屉
      controller.close!();
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      expect(controller.isOpen!(), isFalse);
      expect(controller.stateNotifier!.value, equals(DrawerState.closed));

      // toggle: closed → open
      controller.toggle!();
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      expect(controller.isOpen!(), isTrue);

      // toggle: open → closed
      controller.toggle!();
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      expect(controller.isOpen!(), isFalse);
    });

    testWidgets('F-02-06 stateNotifier 通知完整状态序列',
        (WidgetTester tester) async {
      final controller = ZoomDrawerController();

      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            controller: controller,
            menuScreen: const Scaffold(body: Text('Menu')),
            mainScreen: const Scaffold(body: Text('Main')),
            duration: const Duration(milliseconds: 50),
            reverseDuration: const Duration(milliseconds: 50),
          ),
        ),
      );

      await tester.pump();

      final states = <DrawerState>[];
      controller.stateNotifier!.addListener(() {
        states.add(controller.stateNotifier!.value);
      });

      // 清空初始 closed 通知
      states.clear();

      controller.open!();
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));

      // 应包含 opening → open
      expect(states.contains(DrawerState.opening), isTrue);
      expect(states.contains(DrawerState.open), isTrue);

      states.clear();

      controller.close!();
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));

      // 应包含 closing → closed
      expect(states.contains(DrawerState.closing), isTrue);
      expect(states.contains(DrawerState.closed), isTrue);
    });

    testWidgets('F-02-05 ZoomDrawer.of(context) 获取控制器',
        (WidgetTester tester) async {
      final controller = ZoomDrawerController();

      // 使用 Builder 在子 Widget 中测试 of(context)
      ZoomDrawerState? capturedState;

      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            controller: controller,
            menuScreen: Builder(
              builder: (context) {
                // 在下次 frame 时获取（确保 State 已初始化）
                WidgetsBinding.instance.addPostFrameCallback((_) {
                  capturedState = ZoomDrawer.of(context);
                });
                return const Text('Menu');
              },
            ),
            mainScreen: const Scaffold(body: Text('Main')),
          ),
        ),
      );

      await tester.pump();
      await tester.pump();

      // 在子 Widget 中 of(context) 应返回非 null
      expect(capturedState, isNotNull);
    });
  });

  // ─────────────────────────────────────────────
  // F-03 枚举值覆盖
  // ─────────────────────────────────────────────
  group('F-03 枚举值覆盖', () {
    test('F-03 DrawerStyle 枚举包含全部 5 个值', () {
      expect(DrawerStyle.values.length, equals(5));
      expect(DrawerStyle.values, contains(DrawerStyle.defaultStyle));
      expect(DrawerStyle.values, contains(DrawerStyle.style1));
      expect(DrawerStyle.values, contains(DrawerStyle.style2));
      expect(DrawerStyle.values, contains(DrawerStyle.style3));
      expect(DrawerStyle.values, contains(DrawerStyle.style4));
    });

    test('DrawerState 枚举包含全部 4 个值', () {
      expect(DrawerState.values.length, equals(4));
      expect(DrawerState.values, contains(DrawerState.open));
      expect(DrawerState.values, contains(DrawerState.closed));
      expect(DrawerState.values, contains(DrawerState.opening));
      expect(DrawerState.values, contains(DrawerState.closing));
    });

    test('DrawerLastAction 枚举包含全部值', () {
      expect(DrawerLastAction.values.length, greaterThanOrEqualTo(2));
      expect(DrawerLastAction.values, contains(DrawerLastAction.open));
      expect(DrawerLastAction.values, contains(DrawerLastAction.close));
    });

    testWidgets('F-03-01 defaultStyle 风格正常渲染',
        (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            style: DrawerStyle.defaultStyle,
            menuScreen: const Scaffold(body: Text('Menu')),
            mainScreen: const Scaffold(body: Text('Main')),
          ),
        ),
      );
      expect(find.text('Menu'), findsOneWidget);
      expect(find.text('Main'), findsOneWidget);
    });

    testWidgets('F-03-02 style1 风格正常渲染', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            style: DrawerStyle.style1,
            menuScreen: const Scaffold(body: Text('Menu')),
            mainScreen: const Scaffold(body: Text('Main')),
          ),
        ),
      );
      expect(find.text('Menu'), findsOneWidget);
    });

    testWidgets('F-03-03 style2 风格正常渲染', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            style: DrawerStyle.style2,
            menuScreen: const Scaffold(body: Text('Menu')),
            mainScreen: const Scaffold(body: Text('Main')),
          ),
        ),
      );
      expect(find.text('Menu'), findsOneWidget);
    });

    testWidgets('F-03-04 style3 风格正常渲染', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            style: DrawerStyle.style3,
            menuScreen: const Scaffold(body: Text('Menu')),
            mainScreen: const Scaffold(body: Text('Main')),
          ),
        ),
      );
      expect(find.text('Menu'), findsOneWidget);
    });

    testWidgets('F-03-05 style4 风格正常渲染', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            style: DrawerStyle.style4,
            menuScreen: const Scaffold(body: Text('Menu')),
            mainScreen: const Scaffold(body: Text('Main')),
          ),
        ),
      );
      expect(find.text('Menu'), findsOneWidget);
    });
  });

  // ─────────────────────────────────────────────
  // F-04 平台集成参数测试
  // ─────────────────────────────────────────────
  group('F-04 平台集成参数', () {
    testWidgets('F-04-02 isRtl 参数正常渲染', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            isRtl: true,
            menuScreen: const Scaffold(body: Text('MenuRTL')),
            mainScreen: const Scaffold(body: Text('MainRTL')),
          ),
        ),
      );
      expect(find.text('MenuRTL'), findsOneWidget);
      expect(find.text('MainRTL'), findsOneWidget);
    });

    testWidgets('F-04-03 disableDragGesture 禁用手势正常渲染',
        (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            disableDragGesture: true,
            menuScreen: const Scaffold(body: Text('Menu')),
            mainScreen: const Scaffold(body: Text('Main')),
          ),
        ),
      );
      expect(find.text('Menu'), findsOneWidget);
      expect(find.text('Main'), findsOneWidget);
    });

    testWidgets('F-04-04 mainScreenTapClose 参数正常渲染',
        (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            mainScreenTapClose: true,
            menuScreen: const Scaffold(body: Text('Menu')),
            mainScreen: const Scaffold(body: Text('Main')),
          ),
        ),
      );
      expect(find.text('Menu'), findsOneWidget);
    });

    testWidgets('F-04-01 androidCloseOnBackTap 参数正常渲染',
        (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            androidCloseOnBackTap: true,
            menuScreen: const Scaffold(body: Text('Menu')),
            mainScreen: const Scaffold(body: Text('Main')),
          ),
        ),
      );
      expect(find.text('Menu'), findsOneWidget);
    });
  });

  // ─────────────────────────────────────────────
  // 边界与组合参数测试
  // ─────────────────────────────────────────────
  group('边界与组合参数', () {
    testWidgets('showShadow 参数不影响基础渲染', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            showShadow: true,
            menuScreen: const Scaffold(body: Text('ShadowMenu')),
            mainScreen: const Scaffold(body: Text('ShadowMain')),
          ),
        ),
      );
      expect(find.text('ShadowMenu'), findsOneWidget);
    });

    testWidgets('多个可选参数组合正常渲染', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            menuScreen: const Scaffold(body: Text('MultiMenu')),
            mainScreen: const Scaffold(body: Text('MultiMain')),
            slideWidth: 300.0,
            borderRadius: 8.0,
            angle: -10.0,
            mainScreenScale: 0.25,
            showShadow: true,
            duration: const Duration(milliseconds: 300),
            isRtl: false,
            disableDragGesture: false,
            clipMainScreen: true,
            moveMenuScreen: true,
            mainScreenAbsorbPointer: true,
          ),
        ),
      );
      expect(find.text('MultiMenu'), findsOneWidget);
      expect(find.text('MultiMain'), findsOneWidget);
    });

    testWidgets('shrinkMainScreen 参数正常渲染', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            shrinkMainScreen: true,
            menuScreen: const Scaffold(body: Text('ShrinkMenu')),
            mainScreen: const Scaffold(body: Text('ShrinkMain')),
          ),
        ),
      );
      expect(find.text('ShrinkMenu'), findsOneWidget);
    });

    testWidgets('menuScreenWidth 参数正常渲染', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            menuScreenWidth: 300.0,
            menuScreen: const Scaffold(body: Text('WidthMenu')),
            mainScreen: const Scaffold(body: Text('WidthMain')),
          ),
        ),
      );
      expect(find.text('WidthMenu'), findsOneWidget);
    });
  });

  // ─────────────────────────────────────────────
  // DrawerStyleBuilder 回调参数验证
  // ─────────────────────────────────────────────
  group('DrawerStyleBuilder 回调参数', () {
    testWidgets('自定义 builder 收到正确的 animationValue 和 slideWidth',
        (WidgetTester tester) async {
      double? capturedAnimationValue;
      double? capturedSlideWidth;

      await tester.pumpWidget(
        MaterialApp(
          home: ZoomDrawer(
            slideWidth: 275.0,
            menuScreen: const Scaffold(body: Text('Menu')),
            mainScreen: const Scaffold(body: Text('Main')),
            drawerStyleBuilder: (
              BuildContext context,
              double animationValue,
              double slideWidth,
              Widget menuScreen,
              Widget mainScreen,
            ) {
              capturedAnimationValue = animationValue;
              capturedSlideWidth = slideWidth;
              return Stack(children: [menuScreen, mainScreen]);
            },
          ),
        ),
      );

      // animationValue 应为 0.0（关闭状态）
      expect(capturedAnimationValue, equals(0.0));
      // slideWidth 应与传入值一致
      expect(capturedSlideWidth, equals(275.0));
    });
  });
}
