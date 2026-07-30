/// Discrollview — Discrollve parallax scrolling for Flutter.
///
/// This library reimplements the Android Discrollview pattern (by Flavien
/// Laurent) as a pure Dart Flutter widget. Children can fade, scale,
/// translate, and color-shift based on scroll position.
///
/// ## Quick start
///
/// ```dart
/// import 'package:discrollview/discrollview.dart';
///
/// DiscrollveWidget(
///   children: [
///     DiscrollveContent.child(
///       config: DiscrollveConfig.none,
///       child: HeaderWidget(),
///     ),
///     DiscrollveContent.child(
///       config: DiscrollveConfig(
///         alpha: true,
///         translation: DiscrollveDirection.fromBottom,
///         threshold: 0.3,
///       ),
///       child: AnimatedCard(),
///     ),
///   ],
/// )
/// ```
library discrollview;

export 'discrollve_config.dart';
export 'discrollve_math.dart';
export 'discrollve_widget.dart';
