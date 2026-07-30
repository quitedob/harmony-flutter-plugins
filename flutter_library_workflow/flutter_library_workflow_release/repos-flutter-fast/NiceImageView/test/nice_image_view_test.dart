import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:nice_image_view/nice_image_view.dart';
import 'package:nice_image_view/src/nice_image_view_painter.dart';

/// Helper to create a simple test image synchronously.
ui.Image _createTestImage(int width, int height, Color color) {
  final recorder = ui.PictureRecorder();
  final canvas = Canvas(recorder);
  canvas.drawRect(
    Rect.fromLTWH(0, 0, width.toDouble(), height.toDouble()),
    Paint()..color = color,
  );
  final picture = recorder.endRecording();
  return picture.toImageSync(width, height);
}

void main() {
  group('NiceImageView construction', () {
    testWidgets('builds without error with defaults', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NiceImageView(),
          ),
        ),
      );
      expect(find.byType(NiceImageView), findsOneWidget);
    });

    testWidgets('builds with all parameters', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NiceImageView(
              image: AssetImage('test_asset'),
              width: 200,
              height: 200,
              isCircle: true,
              isCoverSrc: false,
              cornerRadius: 12,
              cornerTopLeftRadius: 8,
              cornerTopRightRadius: 8,
              cornerBottomLeftRadius: 0,
              cornerBottomRightRadius: 0,
              borderWidth: 3,
              borderColor: Colors.red,
              innerBorderWidth: 1,
              innerBorderColor: Colors.white,
              maskColor: Colors.black26,
              fit: BoxFit.contain,
            ),
          ),
        ),
      );
      expect(find.byType(NiceImageView), findsOneWidget);
    });

    testWidgets('applies custom size', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NiceImageView(
              width: 150,
              height: 80,
            ),
          ),
        ),
      );
      final box = tester.firstWidget<SizedBox>(
        find.descendant(
          of: find.byType(NiceImageView),
          matching: find.byType(SizedBox),
        ),
      );
      expect(box.width, 150);
      expect(box.height, 80);
    });
  });

  group('NiceImageView rendering modes', () {
    testWidgets('circle mode does not crash', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NiceImageView(
              isCircle: true,
              borderWidth: 2,
              borderColor: Colors.orange,
            ),
          ),
        ),
      );
      expect(find.byType(NiceImageView), findsOneWidget);
    });

    testWidgets('rounded corners mode does not crash', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NiceImageView(
              isCircle: false,
              cornerRadius: 16,
              borderWidth: 4,
              borderColor: Colors.green,
            ),
          ),
        ),
      );
      expect(find.byType(NiceImageView), findsOneWidget);
    });

    testWidgets('individual corner radii mode does not crash', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NiceImageView(
              cornerTopLeftRadius: 20,
              cornerTopRightRadius: 20,
              cornerBottomLeftRadius: 0,
              cornerBottomRightRadius: 0,
            ),
          ),
        ),
      );
      expect(find.byType(NiceImageView), findsOneWidget);
    });

    testWidgets('circle with inner border does not crash', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NiceImageView(
              isCircle: true,
              borderWidth: 4,
              borderColor: Colors.blue,
              innerBorderWidth: 2,
              innerBorderColor: Colors.white,
            ),
          ),
        ),
      );
      expect(find.byType(NiceImageView), findsOneWidget);
    });

    testWidgets('mask color does not crash', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NiceImageView(
              isCircle: true,
              maskColor: Colors.black45,
            ),
          ),
        ),
      );
      expect(find.byType(NiceImageView), findsOneWidget);
    });

    testWidgets('isCoverSrc true does not crash', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NiceImageView(
              isCircle: true,
              isCoverSrc: true,
              borderWidth: 6,
              borderColor: Colors.purple,
            ),
          ),
        ),
      );
      expect(find.byType(NiceImageView), findsOneWidget);
    });
  });

  group('NiceImageView painter repaint logic', () {
    test('shouldRepaint returns true when image changes', () {
      final img1 = _createTestImage(10, 10, Colors.red);
      final img2 = _createTestImage(10, 10, Colors.blue);

      final p1 = NiceImageViewPainter(image: img1);
      final p2 = NiceImageViewPainter(image: img2);
      expect(p1.shouldRepaint(p2), true);
    });

    test('shouldRepaint returns false when nothing changes', () {
      final img = _createTestImage(10, 10, Colors.red);

      final p1 = NiceImageViewPainter(image: img, isCircle: false);
      final p2 = NiceImageViewPainter(image: img, isCircle: false);
      expect(p1.shouldRepaint(p2), false);
    });

    test('shouldRepaint returns true when isCircle changes', () {
      final p1 = NiceImageViewPainter(isCircle: false);
      final p2 = NiceImageViewPainter(isCircle: true);
      expect(p1.shouldRepaint(p2), true);
    });

    test('shouldRepaint returns true when borderWidth changes', () {
      final p1 = NiceImageViewPainter(borderWidth: 0);
      final p2 = NiceImageViewPainter(borderWidth: 5);
      expect(p1.shouldRepaint(p2), true);
    });

    test('shouldRepaint returns true when cornerRadius changes', () {
      final p1 = NiceImageViewPainter(cornerRadius: 0);
      final p2 = NiceImageViewPainter(cornerRadius: 16);
      expect(p1.shouldRepaint(p2), true);
    });

    test('shouldRepaint returns true when maskColor changes', () {
      final p1 = NiceImageViewPainter(maskColor: Colors.transparent);
      final p2 = NiceImageViewPainter(maskColor: Colors.black26);
      expect(p1.shouldRepaint(p2), true);
    });
  });

  group('NiceImageView edge cases', () {
    testWidgets('null image renders without crash', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NiceImageView(
              isCircle: true,
              borderWidth: 5,
            ),
          ),
        ),
      );
      expect(find.byType(NiceImageView), findsOneWidget);
    });

    testWidgets('zero borderWidth shows no border', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NiceImageView(
              borderWidth: 0,
              borderColor: Colors.black,
            ),
          ),
        ),
      );
      expect(find.byType(NiceImageView), findsOneWidget);
    });

    testWidgets('zero size renders without crash', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NiceImageView(
              width: 0,
              height: 0,
            ),
          ),
        ),
      );
      expect(find.byType(NiceImageView), findsOneWidget);
    });

    testWidgets('transparent mask renders without crash', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NiceImageView(
              isCircle: true,
              maskColor: Colors.transparent,
            ),
          ),
        ),
      );
      expect(find.byType(NiceImageView), findsOneWidget);
    });

    testWidgets('innerBorderWidth ignored in rect mode', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NiceImageView(
              isCircle: false,
              innerBorderWidth: 10,
              innerBorderColor: Colors.pink,
            ),
          ),
        ),
      );
      expect(find.byType(NiceImageView), findsOneWidget);
    });
  });

  group('NiceImageView all public API', () {
    test('all constructor parameters are preserved', () {
      const widget = NiceImageView(
        image: AssetImage('x'),
        width: 100,
        height: 200,
        isCircle: true,
        isCoverSrc: true,
        cornerRadius: 8,
        cornerTopLeftRadius: 4,
        cornerTopRightRadius: 6,
        cornerBottomLeftRadius: 2,
        cornerBottomRightRadius: 10,
        borderWidth: 3,
        borderColor: Colors.red,
        innerBorderWidth: 1,
        innerBorderColor: Colors.white,
        maskColor: Color(0x80000000),
        fit: BoxFit.fill,
      );

      expect(widget.width, 100);
      expect(widget.height, 200);
      expect(widget.isCircle, true);
      expect(widget.isCoverSrc, true);
      expect(widget.cornerRadius, 8);
      expect(widget.cornerTopLeftRadius, 4);
      expect(widget.cornerTopRightRadius, 6);
      expect(widget.cornerBottomLeftRadius, 2);
      expect(widget.cornerBottomRightRadius, 10);
      expect(widget.borderWidth, 3);
      expect(widget.borderColor, Colors.red);
      expect(widget.innerBorderWidth, 1);
      expect(widget.innerBorderColor, Colors.white);
      expect(widget.maskColor, const Color(0x80000000));
      expect(widget.fit, BoxFit.fill);
    });

    test('default values match Android defaults', () {
      const widget = NiceImageView();
      expect(widget.isCircle, false);
      expect(widget.isCoverSrc, false);
      expect(widget.cornerRadius, 0);
      expect(widget.cornerTopLeftRadius, 0);
      expect(widget.cornerTopRightRadius, 0);
      expect(widget.cornerBottomLeftRadius, 0);
      expect(widget.cornerBottomRightRadius, 0);
      expect(widget.borderWidth, 0);
      expect(widget.borderColor, Colors.white);
      expect(widget.innerBorderWidth, 0);
      expect(widget.innerBorderColor, Colors.white);
      expect(widget.maskColor, Colors.transparent);
      expect(widget.fit, null);
    });
  });
}
