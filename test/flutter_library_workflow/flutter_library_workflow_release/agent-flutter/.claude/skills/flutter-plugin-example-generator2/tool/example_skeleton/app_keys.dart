import 'package:flutter/material.dart';

/// 若插件需在 Overlay 上展示内容（如 FToast），与 [MaterialApp.navigatorKey] 保持一致。
final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();
