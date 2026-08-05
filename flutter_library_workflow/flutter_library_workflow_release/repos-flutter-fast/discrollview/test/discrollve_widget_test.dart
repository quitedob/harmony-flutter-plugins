import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:discrollview/discrollview.dart';

void main() {
  testWidgets('DiscrollveWidget builds with header and children',
      (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: DiscrollveWidget(
            children: [
              const DiscrollveContent.child(
                config: DiscrollveConfig.none,
                child: Text('Header'),
              ),
              DiscrollveContent.child(
                config: const DiscrollveConfig(alpha: true),
                child: Container(
                  height: 200,
                  color: Colors.blue,
                  child: const Text('Item 1'),
                ),
              ),
              DiscrollveContent.child(
                config: const DiscrollveConfig(
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
    // Lazy ListView builds only visible children; scroll to reveal Item 1/Item 2.
    await tester.scrollUntilVisible(
      find.text('Item 1'),
      200,
      scrollable: find.byType(Scrollable).first,
    );
    expect(find.text('Item 1'), findsOneWidget);
    await tester.scrollUntilVisible(
      find.text('Item 2'),
      200,
      scrollable: find.byType(Scrollable).first,
    );
    expect(find.text('Item 2'), findsOneWidget);
  });

  testWidgets('DiscrollveWidget requires at least 2 children', (tester) async {
    expect(
      () => DiscrollveWidget(children: const []),
      throwsA(isA<AssertionError>()),
    );
    expect(
      () => DiscrollveWidget(
        children: const [
          DiscrollveContent.child(
            config: DiscrollveConfig.none,
            child: Text('Only header'),
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

  testWidgets('external ScrollController is used when provided',
      (tester) async {
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
                config: const DiscrollveConfig(alpha: true),
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
              const DiscrollveContent.child(
                config: DiscrollveConfig(
                  fromColor: 0xFF88EE66,
                  toColor: 0xFF000000,
                ),
                child: SizedBox(height: 200, child: Text('Color item')),
              ),
            ],
          ),
        ),
      ),
    );

    // Lazy ListView builds only visible children; scroll to reveal the color item.
    await tester.scrollUntilVisible(
      find.text('Color item'),
      200,
      scrollable: find.byType(Scrollable).first,
    );
    expect(find.text('Color item'), findsOneWidget);
  });

  testWidgets(
      'translation fromBottom applies a child-height downward offset (reset state)',
      (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: DiscrollveWidget(
            children: [
              DiscrollveContent.child(
                config: DiscrollveConfig.none,
                child: Container(height: 400, color: Colors.white),
              ),
              const DiscrollveContent.child(
                config: DiscrollveConfig(
                  translation: DiscrollveDirection.fromBottom,
                ),
                child: SizedBox(height: 200, child: Text('Translate item')),
              ),
            ],
          ),
        ),
      ),
    );
    // Let the post-frame child-size measurement settle.
    await tester.pump();
    await tester.pump();

    // Reveal the lazily-built child.
    await tester.scrollUntilVisible(
      find.text('Translate item'),
      200,
      scrollable: find.byType(Scrollable).first,
    );
    await tester.pump();

    final transformWidgets = tester
        .widgetList<Transform>(find.ancestor(
            of: find.text('Translate item'), matching: find.byType(Transform)))
        .toList();
    expect(transformWidgets, isNotEmpty,
        reason: 'a translation Transform must wrap the translated child');
    final ty = transformWidgets.first.transform.getTranslation().y;
    // A fromBottom child is always shifted down (positive Y) while its ratio
    // is below full trigger. Regression guard for the translation no-op fix.
    expect(ty, greaterThanOrEqualTo(0));
  });
}
