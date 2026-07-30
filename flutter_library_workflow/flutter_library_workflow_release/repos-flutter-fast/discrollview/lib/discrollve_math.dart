/// Core math utilities for the Discrollve ratio calculation engine.
///
/// Ported from the original Android [DiscrollView] scroll algorithm:
/// - Two trigger modes: center-reach (sufficient remaining space) and
///   top-reach (insufficient remaining space).
/// - Ratio clamped to [0.0, 1.0].
/// - Optional threshold remapping via [withThreshold].
library;

/// Clamp [value] between [min] and [max] (inclusive).
///
/// Equivalent to the original Java `DiscrollView.clamp()`.
double clampRatio(double value, double min, double max) {
  return value.clamp(min, max);
}

/// Remap ratio so the full transform happens between [threshold] and 1.0.
///
/// When `ratio < threshold` the result is 0.0 (no transform).
/// When `ratio >= threshold` the result linearly maps from 0.0 to 1.0 over
/// the remaining range.
///
/// Equivalent to `DiscrollvableView.withThreshold()` in the original Java.
double withThreshold(double ratio, double threshold) {
  if (threshold <= 0.0) return ratio;
  if (ratio < threshold) return 0.0;
  return (ratio - threshold) / (1.0 - threshold);
}

/// Compute the discrollve ratio for a child at [absoluteTop] within a
/// viewport of [viewportHeight] and total scrollable [totalHeight].
///
/// Returns `null` when the child is not yet triggered (should reset to
/// initial state). Returns a ratio in `[0.0, 1.0]` when the child should
/// be transformed.
///
/// **Two trigger modes** (matching the original Android behavior):
///
/// **Center-reach** (sufficient space):
/// The child starts transforming when its **center** reaches the center
/// of the viewport.
/// ```
/// Condition: remainingSpace >= childHeight + halfViewport
/// Trigger:   absoluteTop <= halfViewport
/// Ratio:     (halfViewport - absoluteTop) / childHeight
/// ```
///
/// **Top-reach** (insufficient space):
/// The child starts transforming when its **top** reaches the bottom of
/// the viewport.
/// ```
/// Condition: remainingSpace < childHeight + halfViewport
/// Trigger:   absoluteTop <= viewportHeight
/// Ratio:     (viewportHeight - absoluteTop) / childHeight
/// ```
double? calculateRatio({
  required double absoluteTop,
  required double childHeight,
  required double childBottom,
  required double viewportHeight,
  required double totalHeight,
}) {
  if (childHeight <= 0.0) return null;

  final halfViewport = viewportHeight / 2.0;
  final remainingSpace = totalHeight - childBottom;

  if (remainingSpace < childHeight + halfViewport) {
    // Insufficient remaining space — use top-reach trigger.
    if (absoluteTop <= viewportHeight) {
      final visibleGap = viewportHeight - absoluteTop;
      return clampRatio(visibleGap / childHeight, 0.0, 1.0);
    }
  } else {
    // Sufficient remaining space — use center-reach trigger.
    if (absoluteTop <= halfViewport) {
      final visibleGap = halfViewport - absoluteTop;
      return clampRatio(visibleGap / childHeight, 0.0, 1.0);
    }
  }

  return null; // Not yet triggered — reset.
}
