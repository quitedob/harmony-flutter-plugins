import 'package:test/test.dart';
import 'package:discrollview/discrollve_math.dart';

void main() {
  group('clampRatio', () {
    test('returns value when within bounds', () {
      expect(clampRatio(0.5, 0.0, 1.0), 0.5);
    });

    test('clamps to minimum', () {
      expect(clampRatio(-0.5, 0.0, 1.0), 0.0);
    });

    test('clamps to maximum', () {
      expect(clampRatio(1.5, 0.0, 1.0), 1.0);
    });

    test('handles exact boundaries', () {
      expect(clampRatio(0.0, 0.0, 1.0), 0.0);
      expect(clampRatio(1.0, 0.0, 1.0), 1.0);
    });
  });

  group('withThreshold', () {
    test('no threshold returns ratio unchanged', () {
      expect(withThreshold(0.5, 0.0), 0.5);
    });

    test('below threshold returns 0.0', () {
      expect(withThreshold(0.2, 0.3), 0.0);
    });

    test('at threshold returns 0.0', () {
      expect(withThreshold(0.3, 0.3), closeTo(0.0, 0.0001));
    });

    test('above threshold remaps correctly', () {
      // ratio=0.5, threshold=0.3 => (0.5-0.3)/(1.0-0.3) = 0.2/0.7 ≈ 0.2857
      final result = withThreshold(0.5, 0.3);
      expect(result, closeTo(0.2857, 0.001));
    });

    test('at ratio 1.0 returns 1.0 regardless of threshold', () {
      expect(withThreshold(1.0, 0.5), closeTo(1.0, 0.0001));
      expect(withThreshold(1.0, 0.0), 1.0);
    });

    test('threshold at 0.5, ratio 0.75 maps to 0.5', () {
      // (0.75-0.5)/(1.0-0.5) = 0.25/0.5 = 0.5
      expect(withThreshold(0.75, 0.5), closeTo(0.5, 0.001));
    });
  });

  group('calculateRatio - center-reach mode', () {
    // Sufficient remaining space: child center → viewport center trigger.
    test('triggered when center passes viewport center', () {
      final ratio = calculateRatio(
        absoluteTop: 100, // child center just passes halfViewport (200)
        childHeight: 200,
        childBottom: 300,
        viewportHeight: 400,
        totalHeight: 1000, // enough remaining space
      );
      // visibleGap = 200 - 100 = 100, ratio = 100/200 = 0.5
      expect(ratio, closeTo(0.5, 0.001));
    });

    test('fully triggered when top reaches top of viewport', () {
      final ratio = calculateRatio(
        absoluteTop: 0,
        childHeight: 200,
        childBottom: 200,
        viewportHeight: 400,
        totalHeight: 1000,
      );
      // visibleGap = 200 - 0 = 200, ratio = 200/200 = 1.0
      expect(ratio, closeTo(1.0, 0.001));
    });

    test('not triggered when too far below viewport', () {
      final ratio = calculateRatio(
        absoluteTop: 300, // > halfViewport (200)
        childHeight: 200,
        childBottom: 500,
        viewportHeight: 400,
        totalHeight: 1000,
      );
      expect(ratio, isNull);
    });
  });

  group('calculateRatio - top-reach mode', () {
    // Insufficient remaining space: child top → viewport bottom trigger.
    test('triggered when top reaches viewport bottom', () {
      final ratio = calculateRatio(
        absoluteTop: 300, // <= viewportHeight (400)
        childHeight: 200,
        childBottom: 500,
        viewportHeight: 400,
        totalHeight: 550, // remaining = 550-500 = 50 < 200+200
      );
      // visibleGap = 400 - 300 = 100, ratio = 100/200 = 0.5
      expect(ratio, closeTo(0.5, 0.001));
    });

    test('fully triggered at top of viewport', () {
      final ratio = calculateRatio(
        absoluteTop: 0,
        childHeight: 200,
        childBottom: 200,
        viewportHeight: 400,
        totalHeight: 500,
      );
      // visibleGap = 400 - 0 = 400, ratio = clamp(400/200, 0, 1) = 1.0
      expect(ratio, closeTo(1.0, 0.001));
    });

    test('not triggered below viewport bottom', () {
      final ratio = calculateRatio(
        absoluteTop: 500, // > viewportHeight (400)
        childHeight: 200,
        childBottom: 700,
        viewportHeight: 400,
        totalHeight: 800,
      );
      expect(ratio, isNull);
    });
  });

  group('calculateRatio - edge cases', () {
    test('zero child height returns null', () {
      final ratio = calculateRatio(
        absoluteTop: 0,
        childHeight: 0,
        childBottom: 0,
        viewportHeight: 400,
        totalHeight: 800,
      );
      expect(ratio, isNull);
    });

    test('clamps ratio when visibleGap exceeds childHeight', () {
      final ratio = calculateRatio(
        absoluteTop: -100, // above viewport
        childHeight: 100,
        childBottom: 0,
        viewportHeight: 400,
        totalHeight: 800,
      );
      // visibleGap = 200 - (-100) = 300, 300/100 = 3.0 → clamp → 1.0
      expect(ratio, closeTo(1.0, 0.001));
    });
  });
}
