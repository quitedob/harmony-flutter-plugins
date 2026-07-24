import 'package:flutter/material.dart';
import 'package:{{PACKAGE_NAME}}/app_keys.dart';
import 'package:{{PACKAGE_NAME}}/routes.dart';

/// 若插件需在 [MaterialApp] 上挂自定义 builder（如 FToast），在此添加：
/// import 'package:your_plugin/your_plugin.dart';
/// builder: YourPluginAppBuilder(),

void main() => runApp(const ExampleApp());

class ExampleApp extends StatelessWidget {
  const ExampleApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Plugin Example',
      navigatorKey: navigatorKey,
      initialRoute: AppRoutes.moduleIndex,
      onGenerateRoute: AppRoutes.onGenerateRoute,
    );
  }
}
