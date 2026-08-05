import 'package:flutter/material.dart';
import 'discrollve_config.dart';
import 'discrollve_math.dart';

/// A scroll-driven parallax animation container (Discrollve pattern).
///
/// [DiscrollveWidget] listens to scroll events and applies configurable
/// transforms (fade, scale, translation, color-shift) to each child widget
/// based on its scroll position.
///
/// The **first child** is always a static header that fills the viewport
/// height. Subsequent children with [DiscrollveConfig] transforms are
/// animated as they scroll into view.
///
/// Usage:
/// ```dart
/// DiscrollveWidget(
///   children: [
///     DiscrollveContent.child(
///       config: DiscrollveConfig.none,
///       child: HeaderWidget(),
///     ),
///     DiscrollveContent.child(
///       config: DiscrollveConfig(alpha: true, translation: DiscrollveDirection.fromBottom),
///       child: AnimatedCard(),
///     ),
///   ],
/// )
/// ```
///
/// Port of the Android [DiscrollView] library by Flavien Laurent.
/// Pure Dart — no native code, no MethodChannel.
///
/// See also:
/// - [DiscrollveContent] for wrapping children with transform configuration.
/// - [DiscrollveConfig] for available transform options.
class DiscrollveWidget extends StatefulWidget {
  /// All child widgets, each wrapped in [DiscrollveContent].
  ///
  /// The first child is treated as a static header and fills the full
  /// viewport height. It does not receive discrollve transforms.
  ///
  /// Must contain at least 2 children (one header + one animated child).
  final List<DiscrollveContent> children;

  /// Optional external [ScrollController] for programmatic scroll control.
  final ScrollController? controller;

  /// Scroll direction. Defaults to [Axis.vertical].
  final Axis scrollDirection;

  /// Scroll physics. Defaults to [ClampingScrollPhysics].
  final ScrollPhysics? physics;

  const DiscrollveWidget({
    super.key,
    required this.children,
    this.controller,
    this.scrollDirection = Axis.vertical,
    this.physics,
  }) : assert(
            children.length >= 2,
            'DiscrollveWidget requires at least 2 children '
            '(header + one animated child)');

  @override
  State<DiscrollveWidget> createState() => _DiscrollveWidgetState();
}

class _DiscrollveWidgetState extends State<DiscrollveWidget> {
  late ScrollController _scrollController;
  final List<GlobalKey> _childKeys = [];
  final Map<int, double> _ratios = {};
  double _viewportHeight = 0;
  double _totalHeight = 0;

  ScrollController get _controller => widget.controller ?? (_scrollController);

  @override
  void initState() {
    super.initState();
    if (widget.controller == null) {
      _scrollController = ScrollController();
    }
    _controller.addListener(_onScroll);
    for (var i = 0; i < widget.children.length; i++) {
      _childKeys.add(GlobalKey());
    }
  }

  @override
  void dispose() {
    _controller.removeListener(_onScroll);
    if (widget.controller == null) {
      _scrollController.dispose();
    }
    super.dispose();
  }

  void _onScroll() {
    if (!_controller.hasClients) return;
    if (_viewportHeight <= 0) return;

    final scrollOffset = _controller.offset;
    final newRatios = <int, double>{};

    // Skip index 0 (static header).
    for (var i = 1; i < widget.children.length; i++) {
      final config = widget.children[i].config;
      if (!config.hasTransforms) continue;

      final key = _childKeys[i];
      final ctx = key.currentContext;
      if (ctx == null) continue;

      final box = ctx.findRenderObject() as RenderBox?;
      if (box == null || !box.hasSize) continue;

      // Position in the scrollable coordinate space.
      final childTop = box
              .localToGlobal(Offset.zero, ancestor: context.findRenderObject())
              .dy +
          scrollOffset;
      final childHeight = box.size.height;
      final childBottom = childTop + childHeight;
      final absoluteTop = childTop - scrollOffset;

      final ratio = calculateRatio(
        absoluteTop: absoluteTop,
        childHeight: childHeight,
        childBottom: childBottom,
        viewportHeight: _viewportHeight,
        totalHeight: _totalHeight,
      );

      if (ratio != null) {
        final r = withThreshold(ratio, config.threshold);
        newRatios[i] = r;
      }
      // ratio == null means reset (not triggered).
    }

    if (_hasChanged(newRatios)) {
      setState(() {
        _ratios
          ..clear()
          ..addAll(newRatios);
      });
    }
  }

  bool _hasChanged(Map<int, double> newRatios) {
    if (newRatios.length != _ratios.length) return true;
    for (final entry in newRatios.entries) {
      final old = _ratios[entry.key];
      if (old == null) return true;
      if ((old - entry.value).abs() > 0.001) return true;
    }
    return false;
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        _viewportHeight = constraints.maxHeight;
        return NotificationListener<ScrollMetricsNotification>(
          onNotification: (notification) {
            _totalHeight = notification.metrics.maxScrollExtent +
                notification.metrics.viewportDimension;
            return false;
          },
          child: ListView.builder(
            addAutomaticKeepAlives: false,
            controller: _controller,
            scrollDirection: widget.scrollDirection,
            physics: widget.physics ?? const ClampingScrollPhysics(),
            itemCount: widget.children.length,
            itemBuilder: (context, index) {
              if (index == 0) {
                // Static header — full viewport height.
                return SizedBox(
                  key: _childKeys[index],
                  height: _viewportHeight > 0 ? _viewportHeight : null,
                  child: widget.children[index].child,
                );
              }
              return _buildDiscrollvableChild(index);
            },
          ),
        );
      },
    );
  }

  Widget _buildDiscrollvableChild(int index) {
    final content = widget.children[index];
    final config = content.config;
    final ratio = _ratios[index];

    Widget child = Container(
      key: _childKeys[index],
      child: content.child,
    );

    if (ratio == null || ratio <= 0.0 || !config.hasTransforms) {
      // Apply reset state.
      if (config.alpha) {
        child = Opacity(opacity: 0.0, child: child);
      }
      if (config.translation != -1) {
        child = _resetTranslation(child, config.translation, index);
      }
      if (config.scaleX || config.scaleY) {
        child = Transform.scale(
          scale: 0.0,
          alignment: Alignment.center,
          child: child,
        );
      }
      if (config.fromColor != -1 && config.toColor != -1) {
        child = Container(
          color: Color(config.fromColor),
          child: child,
        );
      }
      return child;
    }

    // Apply active transforms.
    final r = ratio;
    final rInv = 1.0 - r;

    if (config.alpha) {
      child = Opacity(opacity: r, child: child);
    }

    if (config.scaleX && config.scaleY) {
      child =
          Transform.scale(scale: r, alignment: Alignment.center, child: child);
    } else if (config.scaleX) {
      child = Transform(
        transform: Matrix4.identity()..setEntry(0, 0, r),
        alignment: Alignment.center,
        child: child,
      );
    } else if (config.scaleY) {
      child = Transform(
        transform: Matrix4.identity()..setEntry(1, 1, r),
        alignment: Alignment.center,
        child: child,
      );
    }

    if (config.translation != -1) {
      child = _applyTranslation(child, config.translation, rInv, index);
    }

    if (config.fromColor != -1 && config.toColor != -1) {
      final lerpedColor = Color.lerp(
        Color(config.fromColor),
        Color(config.toColor),
        r,
      );
      child = Container(color: lerpedColor, child: child);
    }

    return child;
  }

  Widget _applyTranslation(
      Widget child, int translation, double ratioInverse, int index) {
    // We use a placeholder offset that will be replaced by the actual
    // child size via a PostFrameCallback. The height is known from the
    // RenderBox in _onScroll, but for the initial build we use a
    // Transform that the framework will pick up.
    return _DiscrollveTranslation(
      translation: translation,
      ratioInverse: ratioInverse,
      child: child,
    );
  }

  Widget _resetTranslation(Widget child, int translation, int index) {
    return _DiscrollveTranslation(
      translation: translation,
      ratioInverse: 1.0,
      child: child,
    );
  }
}

/// Internal widget that applies discrollve translation based on its
/// child's real laid-out size, matching the original Android behavior where
/// [DiscrollvableView] measures itself before translating.
///
/// A `LayoutBuilder` cannot be used here: inside a vertical `ListView` the
/// child receives unbounded height constraints, so its own size would be
/// infinite and the translation would be skipped. Instead this widget
/// measures the child's render box after layout and applies a paint-only
/// [Transform.translate] from that measured size.
class _DiscrollveTranslation extends StatefulWidget {
  final int translation;
  final double ratioInverse;
  final Widget child;

  const _DiscrollveTranslation({
    required this.translation,
    required this.ratioInverse,
    required this.child,
  });

  @override
  State<_DiscrollveTranslation> createState() => _DiscrollveTranslationState();
}

class _DiscrollveTranslationState extends State<_DiscrollveTranslation> {
  final GlobalKey _childKey = GlobalKey();
  Size? _childSize;

  @override
  void initState() {
    super.initState();
    _scheduleMeasure();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _scheduleMeasure();
  }

  /// Measures the child's laid-out size after the current frame and updates
  /// the translation offset. Converges: setState only fires when the measured
  /// size actually changes, so there is no rebuild loop.
  void _scheduleMeasure() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final element = _childKey.currentContext;
      if (element == null) return;
      final render = element.findRenderObject();
      if (render is RenderBox) {
        final size = render.size;
        if (_childSize != size) {
          setState(() => _childSize = size);
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final size = _childSize;
    double dx = 0, dy = 0;
    if (size != null) {
      final w = size.width;
      final h = size.height;
      if (_hasTranslation(DiscrollveDirection.fromBottom)) {
        dy = h * widget.ratioInverse;
      }
      if (_hasTranslation(DiscrollveDirection.fromTop)) {
        dy = -h * widget.ratioInverse;
      }
      if (_hasTranslation(DiscrollveDirection.fromLeft)) {
        dx = -w * widget.ratioInverse;
      }
      if (_hasTranslation(DiscrollveDirection.fromRight)) {
        dx = w * widget.ratioInverse;
      }
    }

    return Transform.translate(
      offset: Offset(dx, dy),
      child: KeyedSubtree(key: _childKey, child: widget.child),
    );
  }

  bool _hasTranslation(int mask) {
    if (widget.translation == -1) return false;
    return (widget.translation & mask) == mask;
  }
}

/// Wraps a child widget with [DiscrollveConfig] for use inside
/// [DiscrollveWidget].
///
/// Use the static factory [DiscrollveContent.child] to create instances:
/// ```dart
/// DiscrollveContent.child(
///   config: DiscrollveConfig(alpha: true),
///   child: MyWidget(),
/// )
/// ```
class DiscrollveContent extends StatelessWidget {
  /// The child widget to apply transforms to.
  final Widget child;

  /// Transform configuration. Use [DiscrollveConfig.none] to skip transforms.
  final DiscrollveConfig config;

  /// Creates a child with discrollve transform configuration.
  const DiscrollveContent.child({
    super.key,
    required this.child,
    this.config = DiscrollveConfig.none,
  });

  @override
  Widget build(BuildContext context) => child;
}
