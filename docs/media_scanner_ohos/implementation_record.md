# media_scanner OHOS 适配实施记录

> 日期：2026-07-22  
> Flutter SDK：3.32.4-ohos-0.0.1 | Dart：3.8.1  
> DevEco Studio：6.x | hvigor：6.24.3 | OHOS SDK：API 24 (6.1.1)  
> 状态：代码完成，ArkTS 编译通过，真机签名和相册验收待完成

## 1. 项目位置

| 目录 | 说明 |
|---|---|
| `D:\deveco\ai_tool\media_scanner` | 单包（Dart + OHOS ArkTS，已 2 in 1 合并） |
| `D:\deveco\ai_tool\media_scanner_ohos` | ~~OHOS 实现包~~（已合并至 media_scanner） |
| `D:\deveco\ai_tool\flutter_ohos_test` | 集成测试 Demo 工程 |

## 2. 调用链

```text
MediaScanner.loadMedia(path)
  ├─ Platform.isOhos == true
  │    └─ MediaScannerOhos.loadMedia(path)
  │         └─ MethodChannel("media_scanner") / loadMedia
  │              └─ MediaScannerPlugin.ets
  │                   └─ MediaAssetChangeRequest.createImageAssetRequest / createVideoAssetRequest
  │                        └─ PhotoAccessHelper.applyChanges(changeRequest)
  └─ Android / 其他平台
       └─ MethodChannel("media_scanner") / loadMedia
```

## 3. 关键 API 与本次适配修正

以下为实际编译通过的 API 用法（与旧文档或草案存在差异）：

### 3.1 ArkTS 层

```typescript
// 导入 — MethodCallHandler 需独立导入
import {
  FlutterPlugin, FlutterPluginBinding, MethodCall,
  MethodChannel, MethodCallHandler, MethodResult, Log,
} from '@ohos/flutter_ohos';
import { photoAccessHelper } from '@kit.MediaLibraryKit';
import { BusinessError } from '@kit.BasicServicesKit';

// 必须实现 getUniqueClassName（新版 FlutterPlugin 接口要求）
getUniqueClassName(): string {
  return 'MediaScannerPlugin';
}

// 使用 MediaAssetChangeRequest（API 24 推荐方式，无需手动 fileIo）
const changeRequest = photoAccessHelper.MediaAssetChangeRequest
  .createImageAssetRequest(context, filePath);
await helper.applyChanges(changeRequest);
```

### 3.2 Dart 层

```dart
// federated plugin 的 dartPluginClass 必须有 registerWith()
@pragma('vm:entry-point')
static void registerWith() { }
```

### 3.3 OHOS 插件目录结构（新版 module 格式）

```
media_scanner_ohos/ohos/
  ├── hvigorfile.ts          →  export { harTasks } from '@ohos/hvigor-ohos-plugin';
  ├── build-profile.json5    →  模块级（apiType, targets）
  ├── oh-package.json5       →  name=插件名, deps=@ohos/flutter_ohos: "file:har/flutter.har"
  ├── Index.ets              →  export default MediaScannerPlugin
  ├── har/flutter.har        →  从 Flutter SDK 缓存复制
  └── src/main/
      ├── module.json5       →  type: "har", name=插件名
      └── ets/.../MediaScannerPlugin.ets
```

**关键变化**：
- 旧结构：`ohos/` 是 project（含嵌套 module 目录），`hvigorfile.ts` 用 `appTasks`
- 新结构：`ohos/` 直接是 HAR module（扁平），`hvigorfile.ts` 仅一行 `export { harTasks }`

## 4. 权限配置

### 4.1 静态声明（module.json5）

```json5
{
  "name": "ohos.permission.WRITE_IMAGEVIDEO",
  "reason": "$string:write_media_permission_reason",
  "usedScene": {
    "abilities": ["EntryAbility"],
    "when": "inuse"
  }
}
```

`user_grant` 权限 **必须** 提供 `reason` 和 `usedScene`，否则 hvigor 报 `00303218 Configuration Error`。

### 4.2 201 权限问题发现与修复

**现象**：`module.json5` 静态声明完成、ArkTS 编译通过后，真机运行时 `photoAccessHelper.applyChanges()` 返回错误码 **201 (PERMISSION_DENIED)**。

**根因**：`WRITE_IMAGEVIDEO` 是 `user_grant` 级别权限，仅静态声明不够，必须在运行时通过 `abilityAccessCtrl.requestPermissionsFromUser()` 弹窗请求用户授权。

**修复方案**：双层权限请求 — 确保用户至少有一次授权机会。

| 层 | 位置 | 时机 | 作用 |
|----|------|------|------|
| 第一条路 | `EntryAbility.ets` → `onCreate()` | 应用启动 | 主动弹窗，用户首次看到权限对话框 |
| 第二条路 | `MediaScannerPlugin.ets` → `registerAsset()` | 调用 `applyChanges()` 前 | 防御性检查，兜底 EntryAbility 被拒绝的场景 |

**日志追踪路径**：

```
路径 A（首次启动，入口弹窗同意）:
  [EntryAbility] 检查 WRITE_IMAGEVIDEO 权限: 未授权
  [EntryAbility] 弹出权限请求对话框...
  [EntryAbility] 用户同意 WRITE_IMAGEVIDEO 权限 — 第一条路通过
  --- 用户操作触发扫描 ---
  [MediaScannerPlugin] ensureWriteMediaPermission: 已授权，直接调用 applyChanges
  [MediaScannerPlugin] applyChanges 成功

路径 B（入口弹窗被拒，插件侧补救）:
  [EntryAbility] 用户拒绝 WRITE_IMAGEVIDEO 权限 — 第一条路被拒
  --- 用户操作触发扫描 ---
  [MediaScannerPlugin] ensureWriteMediaPermission: 未授权，尝试动态请求...
  [MediaScannerPlugin] 用户同意 → 第二条路通过 / 用户拒绝 → throw Error [code=201]

路径 C（已授权，再次启动）:
  [EntryAbility] 检查 WRITE_IMAGEVIDEO 权限: 已授权，跳过弹窗
  [MediaScannerPlugin] ensureWriteMediaPermission: 已授权，直接调用 applyChanges
```

**关键代码**：

```typescript
// EntryAbility.ets — 启动时检查并请求
private async requestWriteMediaPermission(): Promise<void> {
  const context = this.context as common.UIAbilityContext;
  const atManager = abilityAccessCtrl.createAtManager();
  const tokenId = context.applicationInfo.accessTokenId;
  const grantStatus = await atManager.checkAccessToken(tokenId, 'ohos.permission.WRITE_IMAGEVIDEO');
  if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) return;
  const result = await atManager.requestPermissionsFromUser(context, ['ohos.permission.WRITE_IMAGEVIDEO']);
}

// MediaScannerPlugin.ets — 调用 API 前防御性检查
private async ensureWriteMediaPermission(): Promise<void> {
  const atManager = abilityAccessCtrl.createAtManager();
  const grantStatus = await atManager.checkAccessToken(tokenId, 'ohos.permission.WRITE_IMAGEVIDEO');
  if (grantStatus !== abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
    const result = await atManager.requestPermissionsFromUser(context, ['ohos.permission.WRITE_IMAGEVIDEO']);
    if (!result.authResults.every(r => r === 0)) throw new Error('用户拒绝了权限 [code=201]');
  }
}
```

### 4.3 ArkTS 编译踩坑

| 错误 | 原因 | 修复 |
|------|------|------|
| `arkts-limited-throw` | ArkTS 只能 `throw Error` 子类，不能 throw `BusinessError` 等任意对象 | `throw err` → `throw new Error(...)` |
| `PermissionRequestResult` 不存在 | 该类型未从 `abilityAccessCtrl` 导出 | 去掉显式类型标注，使用类型推断 |
| `Cannot find name 'Want'` | 缺少 import | `import { Want } from '@kit.AbilityKit'` |
| `Cannot find namespace 'AbilityConstant'` | 缺少 import | `import { AbilityConstant } from '@kit.AbilityKit'` |

## 5. 构建记录

### 5.1 环境问题

| 问题 | 现象 | 解决 |
|------|------|------|
| Git Bash + flutter build hap | BATCH RECURSION exceeds STACK limits | 在 DevEco Studio 内构建 |
| hvigor 6.24.3 + 旧插件结构 | getSubModules is not a function | 迁移到新 module 结构（harTasks） |

### 5.2 构建命令

```bash
# 在 DevEco Studio 中：Build > Build Hap(s)
# 或 DevEco Terminal 中：
hvigorw assembleHap -p product=default -p buildMode=debug --no-daemon
```

### 5.3 常见 ArkTS 编译错误

| 错误 | 原因 | 修复 |
|------|------|------|
| `Property 'getUniqueClassName' is missing` | 新版 FlutterPlugin 接口 | 添加 `getUniqueClassName()` |
| `'MethodChannel' only refers to a type, but is being used as a namespace` | `MethodCallHandler` 需独立 import | `import { MethodCallHandler } from ...` |
| `Argument of type 'string' is not assignable to 'MediaChangeRequest'` | `applyChanges` 签名变更 | 使用 `MediaAssetChangeRequest` |

## 6. 2 in 1 合并（Federated → 单包）

将原来的 federated 插件结构（`media_scanner` 父包 + `media_scanner_ohos` 实现包）合并为单一非 federated 包：

| 变更项 | 说明 |
|--------|------|
| 移除 `media_scanner_ohos` 依赖 | `pubspec.yaml` 不再依赖 `media_scanner_ohos` |
| OHOS 平台注册方式 | 从 federated `default_package` 改为直接在 `media_scanner` 的 `pubspec.yaml` 中注册 `ohos` 平台 |
| ArkTS 插件代码 | 从 `media_scanner_ohos/ohos/` 迁移到 `media_scanner/ohos/` |
| Dart 层 | 移除 `MediaScannerOhos` 中间类，MethodChannel 直接由 Flutter 引擎根据 `pubspec.yaml` 注册自动关联 |

```text
// 合并后的调用链（简化）
MediaScanner.loadMedia(path)
  └─ MethodChannel("media_scanner") / loadMedia       // 所有平台统一
       └─ [OHOS] MediaScannerPlugin.ets               // pubspec.yaml 注册的 native plugin
            └─ PhotoAccessHelper.applyChanges(changeRequest)
```

**鸿蒙 PC 验证**：合并后的单包结构在鸿蒙 PC 上测试通过 ✅

## 7. 验证状态

| 验证项 | 状态 |
|--------|------|
| `flutter pub get` | ✅ |
| ArkTS 编译 | ✅ |
| Dart 编译 | ✅ |
| GeneratedPluginRegistrant 注册 | ✅ |
| Plugin 接口完整性（getUniqueClassName / registerWith） | ✅ |
| 权限静态声明（reason + usedScene） | ✅ |
| 权限运行时申请（双层 requestPermissionsFromUser） | ✅ |
| HAP 构建（DevEco Studio） | ✅ |
| 日志追踪验证（EntryAbility + MediaScannerPlugin 双路径） | ✅ |
| 真机相册扫描验收 | ⏳ 待用户在真机上点击按钮验证 |

## 8. 参考

- Flutter OHOS 插件结构更新：`agent-flutter/.claude/skills/flutter-docs-lookup/flutter-docs/09_specifications/update-flutter-plugin-structure.md`
- OHOS 插件适配指导：`agent-flutter/.claude/skills/flutter-docs-lookup/flutter-docs/07_plugin/ohos平台适配flutter三方库指导.md`
- 本机 Flutter OHOS SDK：`D:\flutter\OpenHarmony-flutter\flutter_flutter` (oh-3.32.4-dev)
