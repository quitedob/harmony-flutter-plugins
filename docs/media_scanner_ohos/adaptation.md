# media_scanner Flutter 插件鸿蒙化适配文档

> 日期：2026-07-22 | 目标平台：OpenHarmony (OHOS) | Flutter SDK：3.32.4-ohos-0.0.1
>
> 项目位置：`D:\deveco\ai_tool\media_scanner` + `media_scanner_ohos`
>
> 实施记录：[`media_scanner_ohos_implementation_record.md`](./media_scanner_ohos_implementation_record.md)
>
> 当前 SDK 使用单 HAR 模块结构，采用 `MediaAssetChangeRequest` API + 双层运行时权限请求。
> 已知问题：201 权限错误已通过 EntryAbility 启动弹窗 + 插件调用前防御检查解决。

---

## 一、项目背景

### 1.1 原始插件信息

| 项目 | 内容 |
|------|------|
| 包名 | `media_scanner` |
| 发布平台 | [pub.dev](https://pub.dev/packages/media_scanner) |
| 维护者 | LazyCatLabs |
| License | MIT |
| 平台支持 | **仅 Android** |
| API | `MediaScanner.loadMedia(path: String)` → `Future<String?>` |
| 功能 | 保存图片/视频后刷新系统相册，使文件在 Gallery 中可见（无需重启手机） |

### 1.2 原始实现原理

```
Dart (MethodChannel "media_scanner")
    │
    │  invokeMethod('loadMedia', {'path': filePath})
    ▼
Android (Kotlin/Java)
    │
    │  MediaScannerConnection.scanFile(context, paths, mimeTypes, callback)
    ▼
Android MediaStore
```

### 1.3 鸿蒙化需求

用户的 Flutter 项目依赖 `media_scanner` 进行媒体文件扫描。在将项目迁移到 OpenHarmony 平台时，该插件无 OHOS 实现，需要完整适配。

---

## 二、Flutter OpenHarmony 生态调研

### 2.1 官方仓库拓扑

```
GitHub (上游基线)
  github.com/flutter/flutter              ← 官方 Flutter SDK v3.32
    │
    │  社区 Fork & 适配
    ▼
Gitee (原 SIG 开发中心 - 可能已迁移)
  gitee.com/openharmony-sig/flutter_flutter
    │
    │  迁移至 Gitcode
    ▼
Gitcode (当前官方主仓)
  gitcode.com/openharmony-tpc/flutter_flutter   ← 主仓 (Wiki/Issues/Docs)
  gitcode.com/openharmony-tpc/flutter_samples   ← 示例与开发指南
  gitcode.com/OpenHarmony-Flutter/docs          ← 三方库适配列表
    │
    │  活跃开发分支
    ▼
Gitcode (活跃开发 Fork)
  gitcode.com/CPF-Flutter/flutter_flutter       ← 本机关联的远程仓库
    │
    ▼
本地: D:\flutter\OpenHarmony-flutter\flutter_flutter
  Branch: oh-3.32.4-dev
  Version: 3.32.4-ohos-0.0.1
```

### 2.2 Flutter OHOS 与标准 Flutter 关键差异

| 维度 | 标准 Flutter (Android) | Flutter OHOS |
|------|----------------------|-------------|
| **渲染引擎** | Impeller (Vulkan/GLES) 或 Skia | Impeller + Vulkan（主路径）或 Skia + GLES |
| **渲染表面** | SurfaceView / TextureView | XComponent + VKSurface |
| **构建系统** | Gradle + AGP | hvigor / hvigorw |
| **构建产物** | APK / AAB | HAP (HarmonyOS Ability Package) |
| **IDE** | Android Studio | DevEco Studio |
| **插件格式** | AAR (Android Archive) | HAR (HarmonyOS ARchive) |
| **原生语言** | Kotlin / Java | ArkTS / ETS |
| **设备桥接** | ADB | HDC (HarmonyOS Device Connector) |
| **Dart-Native桥** | JNI | N-API |
| **平台判断** | `Platform.isAndroid` | `Platform.isOhos` |

### 2.3 Engine 定制依赖

Flutter OHOS 在 `DEPS_ohos` 中将以下 9 个 engine 关键依赖替换为 OHOS 专用 fork（均托管于 `gitcode.com/openharmony-sig`）：

| 依赖 | OHOS Fork |
|------|-----------|
| Dart SDK | `fluttertpc_dart_sdk.git` |
| Skia 图形库 | `fluttertpc_skia.git` |
| ANGLE (GLES→Vulkan) | `fluttertpc_angle.git` |
| SwiftShader | `fluttertpc_swiftshader.git` |
| Vulkan Dependencies | `fluttertpc_vulkan-deps` |
| libc++ | `fluttertpc_libcxx` |
| libc++ ABI | `fluttertpc_libcxxabi` |
| zlib | `fluttertpc_zlib.git` |
| Dart Native | `fluttertpc_dart_native.git` |

### 2.4 Flutter Tools OHOS 适配文件

`packages/flutter_tools/lib/src/ohos/` 目录下 12 个文件提供完整的 OHOS 构建/运行/调试工具链：

| 文件 | 功能 |
|------|------|
| `ohos_sdk.dart` | OHOS SDK 检测（OHOS_HOME / HOS_SDK_HOME） |
| `ohos_device.dart` | HDC 设备管理（安装/启动/截图/日志） |
| `ohos_workflow.dart` | 工作流门控（`FeatureFlags.isOhosEnabled`） |
| `ohos_builder.dart` | 构建编排（flutter assemble → hvigorw） |
| `ohos_plugins_manager.dart` | 插件 HAR 依赖管理 |
| `hvigor.dart` | hvigorw 构建系统集成 |
| `ohos_doctor.dart` | 环境检测验证 |

### 2.5 三方库适配生态

- **追踪库总数**: 468 个 Flutter 包
- **已适配**: 151 个 (~32%)
- **开发中**: 220 个 (~47%)
- **media_scanner 状态**: **未适配** (不在数据库中)

与 media_scanner 功能相近的**已适配替代库**：

| 插件 | 适配版本 | OHOS 仓库 |
|------|---------|-----------|
| `gallery_saver` | 2.3.2 | `openharmony-sig/fluttertpc_gallery_saver` |
| `image_gallery_saver` | 2.0.3 | `openharmony-sig/flutter_image_gallery_saver` |
| `saver_gallery` | 3.0.6 | `fluttercandies/saver_gallery` |

---

## 三、media_scanner 鸿蒙化适配方案

### 3.1 适配策略

采用 Flutter 联邦插件（Federated Plugin）模式：

```
media_scanner (父包 - 平台路由)
    ├── android/  → 原始 Android 实现（MediaScannerConnection）
    └── ohos: default_package → media_scanner_ohos
                                    └── ohos/media_scanner/  → ETS 原生实现（photoAccessHelper）
```

### 3.2 Dart 层设计

```dart
// media_scanner/lib/media_scanner.dart
class MediaScanner {
  static Future<String?> loadMedia({required String path}) {
    if (Platform.isOhos) {
      return MediaScannerOhos.loadMedia(path: path);   // 委托给 OHOS 实现
    }
    return _channel.invokeMethod('loadMedia', {'path': path});  // Android
  }
}
```

```dart
// media_scanner_ohos/lib/media_scanner_ohos.dart
class MediaScannerOhos {
  static const MethodChannel _channel = MethodChannel('media_scanner');
  static Future<String?> loadMedia({required String path}) async {
    final result = await _channel.invokeMethod<String>('loadMedia', {'path': path});
    return result;
  }
}
```

### 3.3 OHOS 原生层设计

```
Dart MethodChannel "media_scanner"
  │ invokeMethod('loadMedia', {'path': filePath})
  ▼
ETS (MediaScannerPlugin.ets)
  │
  ├── 1. 获取文件扩展名 → 判断 IMAGE / VIDEO
  ├── 2. photoAccessHelper.getPhotoAccessHelper(context)
  ├── 3. createAsset(photoType, extension, {title})
  ├── 4. 读取源文件 → 写入 asset URI
  └── 5. result.success(null)
```

**与 Android 实现的 API 映射**：

| 步骤 | Android | OHOS |
|------|---------|------|
| 获取媒体库实例 | `MediaScannerConnection` (系统服务) | `photoAccessHelper.getPhotoAccessHelper(context)` |
| 注册新媒体 | `scanFile(path)` — 仅通知系统 | `createAsset()` + 写入文件 + `applyChanges()` |
| 权限 | `READ_EXTERNAL_STORAGE` | `ohos.permission.WRITE_IMAGEVIDEO` |

### 3.4 关键差异：沙箱路径

OHOS 使用应用沙箱模型，**不支持** Android 风格的 `/storage/emulated/0/...` 路径：

```dart
// Android：外部存储直接路径
MediaScanner.loadMedia(path: '/storage/emulated/0/LazyPhotos/coba.jpg');

// OHOS：应用沙箱路径
MediaScanner.loadMedia(path: '${context.filesDir}/coba.jpg');
```

---

## 四、产物文件清单

```
D:\deveco\media_scanner\                        # 父包（平台路由，pubspec 已增加 ohos）
├── lib\media_scanner.dart                       # Platform.isOhos → delegate
└── pubspec.yaml                                 # 新增 ohos: default_package

D:\deveco\media_scanner_ohos\                   # OHOS 实现包
├── lib\media_scanner_ohos.dart                  # Dart → MethodChannel bridge
├── pubspec.yaml                                 # implements: media_scanner
├── README.md                                    # 使用说明
├── ohos\
│   ├── build-profile.json5                      # DevEco 构建配置
│   ├── oh-package.json5                         # 项目依赖声明
│   └── media_scanner\                           # OHOS 静态库模块
│       ├── Index.ets                             # export default MediaScannerPlugin
│       ├── oh-package.json5                      # 依赖 @ohos/flutter_ohos
│       └── src\main\ets\io\flutter\plugins\
│           └── mediascanner\MediaScannerPlugin.ets  # 原生 ETS 实现
└── example\
    ├── lib\main.dart                             # 示例（含平台检测）
    └── pubspec.yaml
```

### ETS 文件代码审查通过项

| 检查项 | 状态 |
|--------|------|
| Channel 名称一致性 (`media_scanner`) | ✅ |
| 方法名一致性 (`loadMedia`) | ✅ |
| 参数契约 (`path: String`) | ✅ |
| `Platform.isOhos` 用法 | ✅ |
| `onDetachedFromEngine` 资源释放 | ✅ |
| 文件句柄 `finally` 关闭 | ✅ |
| 日志使用 `hilog`（非 `console.error`） | ✅ |
| 未使用 import 清理 | ✅ |
| 魔法值提取为命名常量 | ✅ |
| 未使用变量清理 (`readLen`) | ✅ |

---

## 五、使用方式

### 5.1 集成到现有 Flutter 项目

```yaml
# pubspec.yaml
dependencies:
  media_scanner:
    path: ../media_scanner

dependency_overrides:
  media_scanner_ohos:
    path: ../media_scanner_ohos
```

### 5.2 Dart 代码

```dart
import 'dart:io' show Platform;
import 'package:media_scanner/media_scanner.dart';

Future<void> scanSavedFile(String filePath) async {
  try {
    final String? error = await MediaScanner.loadMedia(path: filePath);
    if (error == null) {
      print('媒体扫描成功: $filePath');
    } else {
      print('媒体扫描失败: $error');
    }
  } on PlatformException catch (e) {
    print('平台异常: ${e.message}');
  }
}
```

### 5.3 编译运行

```bash
# 1. 确保使用 Flutter OHOS SDK
export PATH=D:\flutter\OpenHarmony-flutter\flutter_flutter\bin:$PATH

# 2. 获取依赖
cd your_project
flutter pub get

# 3. 编译 OHOS 应用
flutter build hap --debug

# 4. 部署到设备
flutter run -d <ohos-device-id>
```

### 5.4 权限配置

#### 5.4.1 静态声明（module.json5）

在 `ohos/entry/src/main/module.json5` 中添加：

```json5
{
  "module": {
    "requestPermissions": [
      {
        "name": "ohos.permission.WRITE_IMAGEVIDEO",
        "reason": "$string:write_media_permission_reason",
        "usedScene": {
          "abilities": ["EntryAbility"],
          "when": "inuse"
        }
      }
    ]
  }
}
```

> `user_grant` 权限必须提供 `reason` 和 `usedScene`，否则 hvigor 报 `00303218 Configuration Error`。

#### 5.4.2 运行时权限请求（双层防护）

`WRITE_IMAGEVIDEO` 是 `user_grant` 权限，仅静态声明不够，必须运行时弹窗请求用户授权，否则 `applyChanges()` 返回错误码 **201**。

采用**双层权限请求**策略：

| 层 | 位置 | 时机 | 作用 |
|----|------|------|------|
| 第一条路 | `EntryAbility.ets` → `onCreate()` | 应用启动 | 主动弹窗，用户首次看到权限对话框 |
| 第二条路 | `MediaScannerPlugin.ets` → `registerAsset()` | 调用 `applyChanges()` 前 | 防御性检查，兜底 EntryAbility 被拒绝的场景 |

**EntryAbility.ets — 第一条路（启动时弹窗）**：

```typescript
import abilityAccessCtrl, { Permissions } from '@ohos.abilityAccessCtrl';
import common from '@ohos.app.ability.common';

export default class EntryAbility extends FlutterAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    super.onCreate(want, launchParam);
    this.requestWriteMediaPermission();
  }

  private async requestWriteMediaPermission(): Promise<void> {
    const context = this.context as common.UIAbilityContext;
    const atManager = abilityAccessCtrl.createAtManager();
    const tokenId = context.applicationInfo.accessTokenId;
    const grantStatus = await atManager.checkAccessToken(tokenId, 'ohos.permission.WRITE_IMAGEVIDEO');
    if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) return;  // 已授权，跳过
    await atManager.requestPermissionsFromUser(context, ['ohos.permission.WRITE_IMAGEVIDEO']);
  }
}
```

**MediaScannerPlugin.ets — 第二条路（调用 API 前兜底）**：

```typescript
private async ensureWriteMediaPermission(): Promise<void> {
  const context = getContext() as common.UIAbilityContext;
  const atManager = abilityAccessCtrl.createAtManager();
  const tokenId = context.applicationInfo.accessTokenId;
  const grantStatus = await atManager.checkAccessToken(tokenId, 'ohos.permission.WRITE_IMAGEVIDEO');
  if (grantStatus !== abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
    const result = await atManager.requestPermissionsFromUser(context, ['ohos.permission.WRITE_IMAGEVIDEO']);
    if (!result.authResults.every(r => r === 0)) throw new Error('用户拒绝了权限 [code=201]');
  }
}
```

**日志追踪路径**（真机 `Log.i` 输出可确认走的哪条路）：

```
路径 A（首次 → 入口弹窗同意 → 插件侧已授权直接通过）
路径 B（入口弹窗拒绝 → 插件侧再次弹窗补救）
路径 C（已授权，再次启动 → 两端都跳过弹窗）
```

#### 5.4.3 ArkTS 编译注意事项

| 坑 | 说明 |
|----|------|
| `arkts-limited-throw` | ArkTS 只能 `throw new Error(...)`，不能 throw `BusinessError` 等任意对象 |
| `PermissionRequestResult` 类型不存在 | `requestPermissionsFromUser` 返回值需用类型推断，不能显式标注 |

---

## 六、参考资料

| 资源 | 地址 |
|------|------|
| Flutter OHOS 主仓库 | `https://gitcode.com/openharmony-tpc/flutter_flutter` |
| Flutter OHOS 开发指南 | `https://gitcode.com/openharmony-tpc/flutter_samples` |
| 三方库适配列表 | `https://gitcode.com/OpenHarmony-Flutter/docs/blob/main/ThirdpartyLibrarites.md` |
| OHOS 插件适配指导 | `D:\deveco\ai_tool\flutter_library_workflow\flutter_library_workflow_release\agent-flutter\.claude\skills\flutter-docs-lookup\flutter-docs\07_plugin\ohos平台适配flutter三方库指导.md` |
| 已适配库数据库 | `D:\deveco\ai_tool\flutter_library_workflow\flutter_library_workflow_release\agent-flutter\.claude\skills\flutter-adapted-library\references\adapted-libraries.json` |
| OHOS photoAccessHelper API | `https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/photoaccesshelper-V5` |
| pub.dev: media_scanner | `https://pub.dev/packages/media_scanner` |
