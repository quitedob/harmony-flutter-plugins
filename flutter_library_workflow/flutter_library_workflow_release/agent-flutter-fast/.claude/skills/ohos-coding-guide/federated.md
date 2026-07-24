# 联合插件鸿蒙适配

## 适用条件

- 插件采用 Federated Plugin 架构
- 有独立的 `xxx_platform_interface` 包
- 各平台有独立实现包（`xxx_android`、`xxx_ios`）
- 需要创建新的 `xxx_ohos` 包

---

## 第一部分：工程搭建

### 工程创建

在插件仓库根目录（与 `xxx_android` 同级）创建 ohos 实现包：

```bash
flutter create -t plugin --platforms ohos {plugin_name}_ohos
cd {plugin_name}_ohos
rm -rf .dart_tool .idea
```

`flutter create` 会自动生成完整的 ohos HAR 模块脚手架（`ohos/hvigorfile.ts`、`ohos/oh-package.json5`、`ohos/build-profile.json5`、`ohos/src/main/module.json5`、`ohos/index.ets`、插件模板代码等）。

### flutter create 后的配置保护（重要）

> 当前 Flutter OHOS 使用 `flutter-hvigor-plugin` 自动注入依赖。**`flutter create` 生成的构建配置文件已包含正确内容，严禁修改。**

| 文件 | 禁止操作 |
|------|---------|
| `ohos/hvigorfile.ts` | 不要添加 `flutter-ohos`、`PluginConfig`、`FlutterOhosHar` 导入 |
| `ohos/build-profile.json5` | 不要改为 HAP 格式（`app`/`products`/`modules`） |
| `ohos/oh-package.json5` | 不要手动添加 `@ohos/flutter_ohos` 依赖或引用 `flutter.har` |

**已知致命错误**——以下操作会导致 `Cannot find module 'flutter-ohos'` 编译失败：
- `hvigorfile.ts` 中写 `import { PluginConfig, FlutterOhosHar } from 'flutter-ohos'`
- `oh-package.json5` 中写 `"@ohos/flutter_ohos": "file:./har/flutter.har"` 或 `"file:./libs/flutter.har"`
- 手动创建 `har/` 或 `libs/` 目录放置 `flutter.har`

> 构建模式详情参考 `flutter-docs-lookup` Skill → `04_development/使用hvigor插件方式编译flutter项目.md`

### 目录结构

```
{repo_root}/
├── {plugin_name}/                    # 主包（app-facing package）
│   └── pubspec.yaml                  # 需修改：添加 ohos default_package
├── {plugin_name}_platform_interface/ # 平台接口包
├── {plugin_name}_android/            # Android 实现
├── {plugin_name}_ios/                # iOS 实现
└── {plugin_name}_ohos/               # 新建的 OHOS 实现
    ├── lib/
    │   └── {plugin_name}_ohos.dart   # Dart 层 platform 实现
    ├── ohos/                         # flutter create 自动生成，配置文件不要修改
    │   ├── hvigorfile.ts
    │   ├── oh-package.json5
    │   ├── index.ets
    │   └── src/main/ets/components/plugin/
    │       └── XxxOhosPlugin.ets     # ETS 原生实现
    └── pubspec.yaml                  # 需配置 implements + platforms.ohos
```

### Dart 层配置（ohos 实现包）

**{plugin_name}_ohos/pubspec.yaml**:
```yaml
name: {plugin_name}_ohos
description: OHOS implementation of {plugin_name}
version: 0.0.1

environment:
  sdk: ">=3.0.0 <4.0.0"
  flutter: ">=3.3.0"

flutter:
  plugin:
    implements: {plugin_name}
    platforms:
      ohos:
        package: com.example.{plugin_name}_ohos
        pluginClass: XxxOhosPlugin

dependencies:
  flutter:
    sdk: flutter
  {plugin_name}_platform_interface:
    path: ../{plugin_name}_platform_interface
```

### 主插件集成

修改主插件 **{plugin_name}/pubspec.yaml**，添加 ohos 平台声明和依赖：

```yaml
flutter:
  plugin:
    platforms:
      android:
        default_package: {plugin_name}_android
      ios:
        default_package: {plugin_name}_ios
      ohos:
        default_package: {plugin_name}_ohos

dependencies:
  {plugin_name}_ohos:
    path: ../{plugin_name}_ohos
```

### oh-package.json5 — 添加三方依赖（按需）

如需额外的 ohpm 三方包（来自 `02-planning.json` 的 `native_dependency_mapping`），在 `ohos/oh-package.json5` 的 `dependencies` 中追加：

```json5
{
  "dependencies": {
    "@ohos/some_package": "^1.0.0"
  }
}
```

> `@ohos/flutter_ohos` 由 Flutter 构建工具自动注入，**不要手动添加**。

### module.json5 — 添加权限声明（按需）

如需系统权限，在 `ohos/src/main/module.json5` 的 `module` 下追加 `requestPermissions`：

```json5
{
  "module": {
    "name": "{plugin_name}_ohos",
    "type": "har",
    "deviceTypes": ["default", "tablet"],
    "requestPermissions": [
      {
        "name": "ohos.permission.INTERNET",
        "reason": "$string:internet_reason",
        "usedScene": { "abilities": ["EntryAbility"], "when": "always" }
      }
    ]
  }
}
```

### 配置检查清单

- [ ] `{plugin_name}_ohos/pubspec.yaml` 中 `implements: {plugin_name}` 正确
- [ ] `{plugin_name}_ohos/pubspec.yaml` 中 `platforms.ohos.pluginClass` 与 ETS 类名一致
- [ ] `{plugin_name}_ohos/pubspec.yaml` 中 `{plugin_name}_platform_interface` 依赖路径正确
- [ ] 主插件 `pubspec.yaml` 中 `platforms.ohos.default_package: {plugin_name}_ohos` 存在
- [ ] 主插件 `pubspec.yaml` 中 `dependencies.{plugin_name}_ohos` path 依赖正确
- [ ] `ohos/hvigorfile.ts` 保持 `flutter create` 生成的原始内容（`harTasks` 简单导出）
- [ ] `ohos/oh-package.json5` 中**无** `@ohos/flutter_ohos` 依赖（由构建工具自动注入）
- [ ] `ohos/oh-package.json5` 中已添加实际需要的 ohpm 三方包（如有）
- [ ] `ohos/src/main/module.json5` 中已添加所需权限（如有）

---

## 第二部分：编码实现

### 查看 platform_interface 接口

编码前必须阅读 `{plugin_name}_platform_interface` 包：

- `{plugin_name}_platform_interface.dart` — 所有需要实现的**抽象方法签名**
- `method_channel_{plugin_name}.dart` — 默认 MethodChannel 实现（参考方法名、参数格式）

同时必须对照 PRD 的公开 API、功能模块、参数类型、平台差异和使用示例，确认 Android/iOS/Darwin 平台实现包中的公开 class、controller 方法、extension、typedef、enum 和参数类型是否需要在 OHOS 实现包中提供等价能力。`platform_interface` 不是 federated 插件的完整公开能力边界；开发者可直接 import / 调用的平台专属 API 不能因为不在 `platform_interface` 中而遗漏。

如果当前仓库根包没有 `android/` 和 `ios/` 目录，不要判定为无原生实现。先根据 app-facing 包 `pubspec.yaml` 的 `default_package`、依赖关系和同级目录名定位 `{plugin_name}_android`、`{plugin_name}_ios` / `{plugin_name}_darwin` 等平台实现包，再读取其 `lib/` 公开导出。若平台实现包不在当前仓库或本地工作区，必须继续根据 `pubspec.lock`、`.dart_tool/package_config.json`、本机 pub cache、依赖的 git/url/path、pub.dev 或仓库 `repository` 信息自行定位源码；定位到源码后再扫描公开 API。最终实现边界以 app-facing 包、`platform_interface` 包、各平台实现包公开 API 的并集为准。

注意区分两类 API：
- `@override` 方法通常来自 `platform_interface`，OHOS 实现包必须实现。
- 非 `@override` 的平台实现包 public 方法不会出现在 `platform_interface` 中，但仍可能是开发者直接使用的能力。例如 `AndroidWebViewController.setOnShowFileSelector` 是 Android 平台实现包公开 controller method，不是 extension，也不在 `webview_flutter_platform_interface` 中；只扫 platform_interface 会漏掉网页上传文件选择能力。

### Dart 层实现

```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:{plugin_name}_platform_interface/{plugin_name}_platform_interface.dart';

class {PluginName}Ohos extends {PluginName}Platform {
  @visibleForTesting
  final methodChannel = const MethodChannel('{channel_name}');

  static void registerWith() {
    {PluginName}Platform.instance = {PluginName}Ohos();
  }

  @override
  Future<String?> getPlatformVersion() async {
    final version = await methodChannel.invokeMethod<String>('getPlatformVersion');
    return version;
  }

  // 实现 platform_interface 中所有抽象方法
  // 未实现的方法抛出 UnimplementedError
}
```

**关键要点**：
- `registerWith()` 是静态方法，Flutter 框架通过反射调用，**方法名不能改**
- 必须实现 `{PluginName}Platform` 中所有抽象方法
- Channel 名称必须与 ETS 端完全一致

### ETS 原生层实现

ETS 层编码模式与 MethodChannel 插件相同，参考同目录下 **`method-channel.md`** 获取完整指导（Context 获取、AbilityAware、参数提取、异步处理、混合模式、类型映射表等）。

基本结构：

```ets
import {
  FlutterPlugin,
  FlutterPluginBinding,
  MethodCall,
  MethodCallHandler,
  MethodChannel,
  MethodResult,
} from '@ohos/flutter_ohos';

export default class XxxOhosPlugin implements FlutterPlugin, MethodCallHandler {
  private channel: MethodChannel | null = null;

  getUniqueClassName(): string {
    return "XxxOhosPlugin";
  }

  onAttachedToEngine(binding: FlutterPluginBinding): void {
    this.channel = new MethodChannel(binding.getBinaryMessenger(), "{channel_name}");
    this.channel.setMethodCallHandler(this);
  }

  onDetachedFromEngine(binding: FlutterPluginBinding): void {
    if (this.channel != null) {
      this.channel.setMethodCallHandler(null);
    }
    this.channel = null;
  }

  onMethodCall(call: MethodCall, result: MethodResult): void {
    switch (call.method) {
      case "getPlatformVersion":
        result.success("OpenHarmony");
        break;
      default:
        result.notImplemented();
        break;
    }
  }
}
```

> ETS API 详细文档参考 `flutter-docs-lookup` Skill → `11_flutter_api_docs/`（MethodChannel、EventChannel、FlutterPlugin 等完整 API）

### 编译目标

联合插件的编译在 ohos 实现包目录下执行：

```bash
cd {plugin_name}_ohos
flutter pub get && flutter build hap --debug
```

如果 ohos 实现包没有 example，需先创建：
```bash
cd {plugin_name}_ohos
flutter create --platforms ohos example
```

---

## 第三部分：常见编译错误与修复

### 构建配置错误

| 错误 | 原因 | 修复 |
|------|------|------|
| `Cannot find module 'flutter-ohos'` | `hvigorfile.ts` 中错误导入了 `flutter-ohos` 模块 | 恢复为 `flutter create` 生成的标准 `harTasks` 导出 |
| `ENOENT: ...flutter.har` | `oh-package.json5` 引用了不存在的 `flutter.har` | 移除 `@ohos/flutter_ohos` 依赖（由构建工具自动注入） |

### 联合插件特有错误

| 错误 | 原因 | 修复 |
|------|------|------|
| `Could not resolve package '{plugin_name}_platform_interface'` | `pubspec.yaml` 中 path 路径不对 | 路径应为 `path: ../{plugin_name}_platform_interface`（相对于 ohos 包目录） |
| `The plugin doesn't have a main class defined in ... ohos` | `pluginClass` 与 ETS 类名不匹配 | 两者必须大小写完全一致 |
| `'registerWith' is not defined` | Dart 层缺少 `registerWith` 静态方法 | 添加 `static void registerWith()` |
| `Missing concrete implementation of 'xxxMethod'` | platform_interface 抽象方法未全部实现 | 逐一实现，暂不支持的抛 `UnimplementedError` |
| `Duplicate plugin registration` | `implements` 名称不匹配 | 值应为 `{plugin_name}`（不含 `_ohos`） |
| `flutter pub get` 失败（主插件） | 主插件中 ohos 包的 path 路径不对 | 路径应为 `path: ../{plugin_name}_ohos` |

> 其他 ETS 编译错误（类型错误、import 错误、API 不存在等）参考同目录下 **`method-channel.md`** 第三部分。
