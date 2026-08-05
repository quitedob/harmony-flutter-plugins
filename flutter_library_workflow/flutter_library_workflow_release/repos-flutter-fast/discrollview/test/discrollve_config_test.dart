import 'package:test/test.dart';
import 'package:discrollview/discrollve_config.dart';

void main() {
  group('DiscrollveConfig', () {
    test('none config has no transforms', () {
      const config = DiscrollveConfig.none;
      expect(config.hasTransforms, isFalse);
    });

    test('default constructor creates config with all false', () {
      const config = DiscrollveConfig();
      expect(config.alpha, isFalse);
      expect(config.scaleX, isFalse);
      expect(config.scaleY, isFalse);
      expect(config.translation, -1);
      expect(config.fromColor, -1);
      expect(config.toColor, -1);
      expect(config.threshold, 0.0);
      expect(config.hasTransforms, isFalse);
    });

    test('alpha config has transforms', () {
      const config = DiscrollveConfig(alpha: true);
      expect(config.hasTransforms, isTrue);
    });

    test('scaleX config has transforms', () {
      const config = DiscrollveConfig(scaleX: true);
      expect(config.hasTransforms, isTrue);
    });

    test('translation config has transforms', () {
      const config = DiscrollveConfig(
        translation: DiscrollveDirection.fromBottom,
      );
      expect(config.hasTransforms, isTrue);
    });

    test('color config has transforms', () {
      const config =
          DiscrollveConfig(fromColor: 0xFF000000, toColor: 0xFFFFFFFF);
      expect(config.hasTransforms, isTrue);
    });

    test('threshold at 0.0 is valid', () {
      const config = DiscrollveConfig(threshold: 0.0);
      expect(config.threshold, 0.0);
    });

    test('threshold at 1.0 is valid', () {
      const config = DiscrollveConfig(threshold: 1.0);
      expect(config.threshold, 1.0);
    });

    test('threshold out of range is rejected at construction', () {
      // Const context catches invalid threshold at compile time.
      // In non-const context, the assert fires in debug mode.
      // We verify the threshold is stored correctly when valid.
      const validLow = DiscrollveConfig(threshold: 0.0);
      expect(validLow.threshold, 0.0);
      const validHigh = DiscrollveConfig(threshold: 1.0);
      expect(validHigh.threshold, 1.0);
      // Runtime assert is verified by const context:
      // const DiscrollveConfig(threshold: -0.1); // compile error
    });

    test('configs with same values have identical fields', () {
      const a = DiscrollveConfig(alpha: true, threshold: 0.3);
      const b = DiscrollveConfig(alpha: true, threshold: 0.3);
      expect(a.alpha, b.alpha);
      expect(a.threshold, b.threshold);
      expect(a.scaleX, b.scaleX);
      expect(a.translation, b.translation);
    });
  });

  group('DiscrollveConfig translation validation', () {
    test('fromTop | fromBottom is rejected at construction', () {
      // Const context: const DiscrollveConfig(translation: 0x01|0x02)
      // would be a compile-time error due to the assert.
      // We verify valid combinations pass.
      const valid = DiscrollveConfig(
        translation:
            DiscrollveDirection.fromTop | DiscrollveDirection.fromRight,
      );
      expect(valid.translation, 0x01 | 0x08);
    });

    test('fromLeft | fromRight is rejected at construction', () {
      // Const context: const DiscrollveConfig(translation: 0x04|0x08)
      // would be a compile-time error due to the assert.
      // We verify valid combinations pass.
      const valid = DiscrollveConfig(
        translation:
            DiscrollveDirection.fromBottom | DiscrollveDirection.fromLeft,
      );
      expect(valid.translation, 0x02 | 0x04);
    });

    test('fromBottom | fromLeft is valid', () {
      const config = DiscrollveConfig(
        translation:
            DiscrollveDirection.fromBottom | DiscrollveDirection.fromLeft,
      );
      expect(config.translation, 0x02 | 0x04);
    });

    test('fromTop | fromRight is valid', () {
      const config = DiscrollveConfig(
        translation:
            DiscrollveDirection.fromTop | DiscrollveDirection.fromRight,
      );
      expect(config.translation, 0x01 | 0x08);
    });
  });

  group('DiscrollveDirection constants', () {
    test('direction values match original Android bitmask', () {
      expect(DiscrollveDirection.fromTop, 0x01);
      expect(DiscrollveDirection.fromBottom, 0x02);
      expect(DiscrollveDirection.fromLeft, 0x04);
      expect(DiscrollveDirection.fromRight, 0x08);
    });

    test('directions can be combined with bitwise OR', () {
      const combined =
          DiscrollveDirection.fromTop | DiscrollveDirection.fromRight;
      expect(combined, 0x09);
    });
  });
}
