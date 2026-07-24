import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_ohos_test/main.dart';

void main() {
  testWidgets('TestHubApp smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const TestHubApp());
    expect(find.text('Flutter OHOS Test Hub'), findsOneWidget);
  });
}
