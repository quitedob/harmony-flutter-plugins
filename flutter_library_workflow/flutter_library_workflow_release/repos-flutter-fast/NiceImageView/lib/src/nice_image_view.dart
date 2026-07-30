import 'dart:ui' as ui;

import 'package:flutter/material.dart';

import 'nice_image_view_painter.dart';

/// A widget that displays an image with optional circle/rounded corner clipping,
/// borders, inner borders, and mask overlay.
///
/// Ported from the Android [NiceImageView](https://github.com/shehuan/NiceImageView)
/// library. All rendering is done via [CustomPainter] using Flutter's Canvas,
/// making this a pure-Dart widget compatible with all Flutter platforms.
///
/// Example:
/// ```dart
/// NiceImageView(
///   image: AssetImage('assets/avatar.jpg'),
///   width: 100,
///   height: 100,
///   isCircle: true,
///   borderWidth: 3,
///   borderColor: Colors.orange,
/// )
/// ```
class NiceImageView extends StatefulWidget {
  /// The image to display. Can be any [ImageProvider].
  /// If null, nothing is rendered.
  final ImageProvider? image;

  /// The width of the widget. If null, expands to fit parent.
  final double? width;

  /// The height of the widget. If null, expands to fit parent.
  final double? height;

  /// Whether to display as a circle. When true, corner radius settings are
  /// ignored.
  /// Default: false
  final bool isCircle;

  /// Whether borders cover the image content.
  /// - false (default): image is scaled down to avoid borders
  /// - true: borders are drawn over the image
  /// Default: false
  final bool isCoverSrc;

  /// Uniform corner radius for all four corners (logical pixels).
  /// Takes priority over individual corner radius settings.
  /// Default: 0
  final double cornerRadius;

  /// Top-left corner radius (logical pixels).
  /// Ignored when [cornerRadius] > 0 or [isCircle] is true.
  /// Default: 0
  final double cornerTopLeftRadius;

  /// Top-right corner radius (logical pixels).
  /// Ignored when [cornerRadius] > 0 or [isCircle] is true.
  /// Default: 0
  final double cornerTopRightRadius;

  /// Bottom-right corner radius (logical pixels).
  /// Ignored when [cornerRadius] > 0 or [isCircle] is true.
  /// Default: 0
  final double cornerBottomRightRadius;

  /// Bottom-left corner radius (logical pixels).
  /// Ignored when [cornerRadius] > 0 or [isCircle] is true.
  /// Default: 0
  final double cornerBottomLeftRadius;

  /// Outer border width (logical pixels). 0 means no border.
  /// Default: 0
  final double borderWidth;

  /// Outer border color.
  /// Default: Colors.white
  final Color borderColor;

  /// Inner border width (logical pixels). Only visible in circle mode.
  /// Automatically ignored when not in circle mode.
  /// Default: 0
  final double innerBorderWidth;

  /// Inner border color.
  /// Default: Colors.white
  final Color innerBorderColor;

  /// Mask color drawn over the clipped image area.
  /// Use [Colors.transparent] (default) for no mask.
  /// Default: Colors.transparent
  final Color maskColor;

  /// How the image should be inscribed into the widget bounds.
  /// Default: BoxFit.cover
  final BoxFit? fit;

  const NiceImageView({
    super.key,
    this.image,
    this.width,
    this.height,
    this.isCircle = false,
    this.isCoverSrc = false,
    this.cornerRadius = 0.0,
    this.cornerTopLeftRadius = 0.0,
    this.cornerTopRightRadius = 0.0,
    this.cornerBottomLeftRadius = 0.0,
    this.cornerBottomRightRadius = 0.0,
    this.borderWidth = 0.0,
    this.borderColor = Colors.white,
    this.innerBorderWidth = 0.0,
    this.innerBorderColor = Colors.white,
    this.maskColor = Colors.transparent,
    this.fit,
  });

  @override
  State<NiceImageView> createState() => _NiceImageViewState();
}

class _NiceImageViewState extends State<NiceImageView> {
  ui.Image? _resolvedImage;
  ImageStream? _imageStream;
  ImageStreamListener? _imageListener;

  @override
  void initState() {
    super.initState();
    _resolveImage();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _resolveImage();
  }

  @override
  void didUpdateWidget(NiceImageView oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.image != widget.image) {
      _resolveImage();
    }
  }

  void _resolveImage() {
    final imageProvider = widget.image;
    if (imageProvider == null) {
      _clearImage();
      return;
    }

    _imageStream?.removeListener(_imageListener!);
    _imageStream = imageProvider.resolve(createLocalImageConfiguration(context));
    _imageListener = ImageStreamListener(
      _onImageResolved,
      onError: (dynamic error, StackTrace? stackTrace) {
        debugPrint('NiceImageView: error loading image — $error');
      },
    );
    _imageStream!.addListener(_imageListener!);
  }

  void _onImageResolved(ImageInfo info, bool synchronousCall) {
    if (mounted) {
      setState(() {
        _resolvedImage = info.image;
      });
    }
  }

  void _clearImage() {
    if (_imageStream != null && _imageListener != null) {
      _imageStream!.removeListener(_imageListener!);
    }
    _imageStream = null;
    _imageListener = null;
    if (mounted) {
      setState(() {
        _resolvedImage = null;
      });
    }
  }

  @override
  void dispose() {
    _clearImage();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: CustomPaint(
        painter: NiceImageViewPainter(
          image: _resolvedImage,
          isCircle: widget.isCircle,
          isCoverSrc: widget.isCoverSrc,
          cornerRadius: widget.cornerRadius,
          cornerTopLeftRadius: widget.cornerTopLeftRadius,
          cornerTopRightRadius: widget.cornerTopRightRadius,
          cornerBottomLeftRadius: widget.cornerBottomLeftRadius,
          cornerBottomRightRadius: widget.cornerBottomRightRadius,
          borderWidth: widget.borderWidth,
          borderColor: widget.borderColor,
          innerBorderWidth: widget.innerBorderWidth,
          innerBorderColor: widget.innerBorderColor,
          maskColor: widget.maskColor,
          fit: widget.fit,
        ),
        size: Size.infinite,
      ),
    );
  }
}
