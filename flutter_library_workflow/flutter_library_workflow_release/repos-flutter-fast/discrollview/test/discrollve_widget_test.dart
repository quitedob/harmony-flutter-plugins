import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:discrollview/discrollview.dart';

void main() {
  testWidgets('DiscrollveWidget builds with header and children', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: DiscrollveWidget(
            children: [
              DiscrollveContent.child(
                config: DiscrollveConfig.none,
                child: const Text('Header'),
              ),
              DiscrollveContent.child(
                config: DiscrollveConfig(alpha: true),
                child: Container(
                  height: 200,
                  color: Colors.blue,
                  child: const Text('Item 1'),
                ),
              ),
              DiscrollveContent.child(
                config: DiscrollveConfig(
                  translation: DiscrollveDirection.fromBottom,
                  threshold: 0.3,
                ),
                child: Container(
                  height: 200,
                  color: Colors.green,
                  child: const Text('Item 2'),
                ),
              ),
            ],
          ),
        ),
      ),
    );

    // Verify the header is rendered.
    expect(find.text('Header'), findsOneWidget);
    expect(find.text('Item 1'), findsOneWidget);
    expect(find.text('Item 2'), findsOneWidget);
  });

  testWidgets('DiscrollveWidget requires at least 2 children', (tester) async {
    expect(
      () => DiscrollveWidget(children: []),
      throwsA(isA<AssertionError>()),
    );
    expect(
      () => DiscrollveWidget(
        children: [
          DiscrollveContent.child(
            config: DiscrollveConfig.none,
            child: const Text('Only header'),
          ),
        ],
      ),
      throwsA(isA<AssertionError>()),
    );
  });

  testWidgets('DiscrollveContent.child factory creates widget', (tester) async {
    const content = DiscrollveContent.child(
      config: DiscrollveConfig(alpha: true),
      child: Text('Test'),
    );
    expect(content.config.alpha, isTrue);
    expect(content.child, isA<Text>());
  });

  testWidgets('external ScrollController is used when provided', (tester) async {
    final controller = ScrollController();

    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: DiscrollveWidget(
            controller: controller,
            children: [
              DiscrollveContent.child(
                config: DiscrollveConfig.none,
                child: Container(height: 600, color: Colors.red),
              ),
              DiscrollveContent.child(
                config: DiscrollveConfig(alpha: true),
                child: Container(height: 200, color: Colors.blue),
              ),
            ],
          ),
        ),
      ),
    );

    expect(controller.hasClients, isTrue);
    controller.dispose();
  });

  testWidgets('DiscrollveWidget with color transform child', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: DiscrollveWidget(
            children: [
              DiscrollveContent.child(
                config: DiscrollveConfig.none,
                child: Container(height: 600, color: Colors.white),
              ),
              DiscrollveContent.child(
                config: DiscrollveConfig(
                  fromColor: 0xFF88EE66,
                  toColor: 0xFF000000,
                ),
                child: Container(height: 200, child: const Text('Color item')),
              ),
            ],
          ),
        ),
      ),
    );

    expect(find.text('Color item'), findsOneWidget);
  });
}
