/// Transform configuration for Discrollve parallax scrolling.
///
/// Each child widget wrapped in [DiscrollveContent] can declare zero or more
/// transforms that are applied as the user scrolls.
///
/// Usage:
/// ```dart
/// DiscrollveConfig(
///   alpha: true,
///   translation: DiscrollveDirection.fromBottom | DiscrollveDirection.fromLeft,
///   threshold: 0.3,
/// )
/// ```
class DiscrollveConfig {
  /// No-transform default configuration.
  static const DiscrollveConfig none = DiscrollveConfig();

  /// Whether to fade in from 0.0 to 1.0 opacity.
  final bool alpha;

  /// Whether to scale horizontally from 0.0 to 1.0.
  final bool scaleX;

  /// Whether to scale vertically from 0.0 to 1.0.
  final bool scaleY;

  /// Bitmask of translation directions from [DiscrollveDirection].
  ///
  /// Combine directions with `|`:
  /// ```dart
  /// DiscrollveDirection.fromBottom | DiscrollveDirection.fromLeft
  /// ```
  ///
  /// `fromTop` + `fromBottom` and `fromLeft` + `fromRight` are mutually
  /// exclusive and will throw an [AssertionError] in debug mode.
  ///
  /// Set to `-1` (or omit) to disable translation.
  final int translation;

  /// Starting background color for color interpolation.
  ///
  /// Set to `-1` (or omit) to disable color transition.
  final int fromColor;

  /// Target background color for color interpolation.
  ///
  /// Set to `-1` (or omit) to disable color transition.
  final int toColor;

  /// Delay ratio before transforms begin, in the range `[0.0, 1.0]`.
  ///
  /// When the scroll ratio is below [threshold] no transforms are applied.
  /// Above the threshold the ratio is remapped so the full transform
  /// completes over the remaining scroll distance.
  ///
  /// Default is `0.0` (transforms begin immediately).
  final double threshold;

  const DiscrollveConfig({
    this.alpha = false,
    this.scaleX = false,
    this.scaleY = false,
    this.translation = -1,
    this.fromColor = -1,
    this.toColor = -1,
    this.threshold = 0.0,
  })  : assert(threshold >= 0.0 && threshold <= 1.0,
            'threshold must be in range [0.0, 1.0]'),
        assert(
            translation == -1 ||
                !((translation & 0x01 != 0 && translation & 0x02 != 0) ||
                    (translation & 0x04 != 0 && translation & 0x08 != 0)),
            'fromTop+fromBottom and fromLeft+fromRight are forbidden');

  /// Whether any transform is active.
  bool get hasTransforms =>
      alpha ||
      scaleX ||
      scaleY ||
      translation != -1 ||
      (fromColor != -1 && toColor != -1);
}

/// Bitmask constants for translation directions.
///
/// Combine with `|` (bitwise OR):
/// ```dart
/// DiscrollveDirection.fromBottom | DiscrollveDirection.fromLeft
/// ```
///
/// | Constant    | Value  | Moves child from … |
/// |-------------|--------|--------------------|
/// | `fromTop`   | `0x01` | above the viewport |
/// | `fromBottom`| `0x02` | below the viewport |
/// | `fromLeft`  | `0x04` | left of the viewport|
/// | `fromRight` | `0x08` | right of the viewport|
class DiscrollveDirection {
  DiscrollveDirection._();

  /// Translate from above (child starts offscreen above).
  static const int fromTop = 0x01;

  /// Translate from below (child starts offscreen below).
  static const int fromBottom = 0x02;

  /// Translate from the left (child starts offscreen left).
  static const int fromLeft = 0x04;

  /// Translate from the right (child starts offscreen right).
  static const int fromRight = 0x08;
}
