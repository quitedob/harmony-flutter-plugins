import 'dart:ui' as ui;

import 'package:flutter/material.dart';

/// The [CustomPainter] that renders the NiceImageView content:
/// clipped image, mask, borders, and inner borders.
///
/// Ported pixel-for-pixel from `NiceImageView.java`'s `onDraw()` method.
class NiceImageViewPainter extends CustomPainter {
  final ui.Image? image;
  final bool isCircle;
  final bool isCoverSrc;
  final double cornerRadius;
  final double cornerTopLeftRadius;
  final double cornerTopRightRadius;
  final double cornerBottomLeftRadius;
  final double cornerBottomRightRadius;
  final double borderWidth;
  final Color borderColor;
  final double innerBorderWidth;
  final Color innerBorderColor;
  final Color maskColor;
  final BoxFit? fit;

  NiceImageViewPainter({
    this.image,
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
  void paint(Canvas canvas, Size size) {
    if (image == null) return;

    final double w = size.width;
    final double h = size.height;

    // In circle mode, inner border is supported; in rect mode it's ignored.
    final double effectiveInnerBorder = isCircle ? innerBorderWidth : 0.0;
    final double totalBorderInset = borderWidth + effectiveInnerBorder;

    // Build the clip path (circle via addOval, or rounded rect via addRRect).
    final Path clipPath = _buildClipPath(w, h, totalBorderInset);

    // ---- Stage 1: Draw clipped image ----
    //
    // Android uses Canvas.saveLayer + PorterDuff xfermode (DST_IN / DST_OUT).
    // Flutter equivalent: canvas.clipPath() — cleaner, no blend mode needed.
    canvas.save();
    canvas.clipPath(clipPath);

    if (!isCoverSrc && totalBorderInset > 0) {
      // Scale down canvas so image content avoids borders.
      // Equivalent to Android: canvas.scale(sx, sy, w/2, h/2)
      final double sx = (w - 2 * totalBorderInset) / w;
      final double sy = (h - 2 * totalBorderInset) / h;
      canvas.save();
      canvas.translate(w / 2.0, h / 2.0);
      canvas.scale(sx, sy);
      canvas.translate(-w / 2.0, -h / 2.0);
      _drawImage(canvas, size);
      canvas.restore();
    } else {
      _drawImage(canvas, size);
    }

    // ---- Stage 2: Draw mask overlay ----
    // Equivalent to Android: if (maskColor != 0) paint.setColor + drawPath
    if (maskColor != Colors.transparent && maskColor.a > 0) {
      canvas.drawPath(
        clipPath,
        Paint()
          ..color = maskColor
          ..style = PaintingStyle.fill
          ..isAntiAlias = true,
      );
    }

    canvas.restore(); // restore clip region

    // ---- Stage 3: Draw borders ----
    _drawBorders(canvas, w, h, effectiveInnerBorder);
  }

  // ---------------------------------------------------------------------------
  // Path construction
  // ---------------------------------------------------------------------------

  /// Builds the clip path: circle (via addOval) or rounded rect (via addRRect).
  Path _buildClipPath(double w, double h, double totalBorderInset) {
    if (isCircle) {
      final double radius = (w < h ? w : h) / 2.0;
      return Path()
        ..addOval(Rect.fromCircle(
          center: Offset(w / 2.0, h / 2.0),
          radius: radius,
        ));
    } else {
      return Path()..addRRect(_buildRRect(w, h, totalBorderInset));
    }
  }

  /// Builds the rounded rect used for clipping the image area.
  ///
  /// If [cornerRadius] > 0, all four corners use that uniform value.
  /// Otherwise, individual corner radius values are used.
  RRect _buildRRect(double w, double h, double totalBorderInset) {
    double tl = _resolveCornerTL();
    double tr = _resolveCornerTR();
    double br = _resolveCornerBR();
    double bl = _resolveCornerBL();

    // Android: srcRadii[i] = cornerRadii[i] - borderWidth / 2.0f
    if (totalBorderInset > 0) {
      tl = (tl - totalBorderInset / 2.0).clamp(0.0, double.infinity);
      tr = (tr - totalBorderInset / 2.0).clamp(0.0, double.infinity);
      br = (br - totalBorderInset / 2.0).clamp(0.0, double.infinity);
      bl = (bl - totalBorderInset / 2.0).clamp(0.0, double.infinity);
    }

    return RRect.fromLTRBAndCorners(
      0,
      0,
      w,
      h,
      topLeft: Radius.circular(tl),
      topRight: Radius.circular(tr),
      bottomRight: Radius.circular(br),
      bottomLeft: Radius.circular(bl),
    );
  }

  /// Builds the rounded rect used for the outer border outline.
  /// Inset by borderWidth/2 so the stroke is centered on the image edge.
  RRect _buildBorderRRect(double w, double h) {
    final double tl = _resolveCornerTL();
    final double tr = _resolveCornerTR();
    final double br = _resolveCornerBR();
    final double bl = _resolveCornerBL();

    return RRect.fromLTRBAndCorners(
      borderWidth / 2.0,
      borderWidth / 2.0,
      w - borderWidth / 2.0,
      h - borderWidth / 2.0,
      topLeft: Radius.circular(tl),
      topRight: Radius.circular(tr),
      bottomRight: Radius.circular(br),
      bottomLeft: Radius.circular(bl),
    );
  }

  // ---------------------------------------------------------------------------
  // Corner radius resolution (matches Android cornerRadius priority)
  // ---------------------------------------------------------------------------

  double _resolveCornerTL() =>
      cornerRadius > 0 ? cornerRadius : cornerTopLeftRadius;
  double _resolveCornerTR() =>
      cornerRadius > 0 ? cornerRadius : cornerTopRightRadius;
  double _resolveCornerBR() =>
      cornerRadius > 0 ? cornerRadius : cornerBottomRightRadius;
  double _resolveCornerBL() =>
      cornerRadius > 0 ? cornerRadius : cornerBottomLeftRadius;

  // ---------------------------------------------------------------------------
  // Image drawing
  // ---------------------------------------------------------------------------

  /// Draws the source image into [size] applying [fit].
  void _drawImage(Canvas canvas, Size size) {
    if (image == null) return;

    final Rect src = Rect.fromLTWH(
      0,
      0,
      image!.width.toDouble(),
      image!.height.toDouble(),
    );
    final Rect dst = _computeDstRect(size);
    canvas.drawImageRect(
      image!,
      src,
      dst,
      Paint()..isAntiAlias = true,
    );
  }

  /// Computes the destination rect using [BoxFit] (default: cover).
  Rect _computeDstRect(Size container) {
    final Size source = Size(
      image!.width.toDouble(),
      image!.height.toDouble(),
    );
    final BoxFit effectiveFit = fit ?? BoxFit.cover;
    final FittedSizes fitted = applyBoxFit(effectiveFit, source, container);

    // Center the fitted image
    return Offset(
          (container.width - fitted.destination.width) / 2.0,
          (container.height - fitted.destination.height) / 2.0,
        ) &
        fitted.destination;
  }

  // ---------------------------------------------------------------------------
  // Border drawing
  // ---------------------------------------------------------------------------

  /// Matches `NiceImageView.drawBorders(Canvas canvas)`.
  void _drawBorders(Canvas canvas, double w, double h, double inner) {
    if (isCircle) {
      // Android: drawCircleBorder for outer and inner
      if (borderWidth > 0) {
        final double radius = _min(w, h) / 2.0 - borderWidth / 2.0;
        canvas.drawCircle(
          Offset(w / 2.0, h / 2.0),
          radius,
          _borderPaint(borderColor, borderWidth),
        );
      }
      if (inner > 0) {
        final double innerRadius = _min(w, h) / 2.0 - borderWidth - inner / 2.0;
        canvas.drawCircle(
          Offset(w / 2.0, h / 2.0),
          innerRadius,
          _borderPaint(innerBorderColor, inner),
        );
      }
    } else {
      // Android: drawRectFBorder (only outer border for rect mode)
      if (borderWidth > 0) {
        canvas.drawRRect(
          _buildBorderRRect(w, h),
          _borderPaint(borderColor, borderWidth),
        );
      }
    }
  }

  Paint _borderPaint(Color color, double width) => Paint()
    ..color = color
    ..style = PaintingStyle.stroke
    ..strokeWidth = width
    ..isAntiAlias = true;

  double _min(double a, double b) => a < b ? a : b;

  // ---------------------------------------------------------------------------
  // Repaint
  // ---------------------------------------------------------------------------

  @override
  bool shouldRepaint(covariant NiceImageViewPainter oldDelegate) {
    return image != oldDelegate.image ||
        isCircle != oldDelegate.isCircle ||
        isCoverSrc != oldDelegate.isCoverSrc ||
        cornerRadius != oldDelegate.cornerRadius ||
        cornerTopLeftRadius != oldDelegate.cornerTopLeftRadius ||
        cornerTopRightRadius != oldDelegate.cornerTopRightRadius ||
        cornerBottomLeftRadius != oldDelegate.cornerBottomLeftRadius ||
        cornerBottomRightRadius != oldDelegate.cornerBottomRightRadius ||
        borderWidth != oldDelegate.borderWidth ||
        borderColor != oldDelegate.borderColor ||
        innerBorderWidth != oldDelegate.innerBorderWidth ||
        innerBorderColor != oldDelegate.innerBorderColor ||
        maskColor != oldDelegate.maskColor ||
        fit != oldDelegate.fit;
  }
}
