# media_scanner 鸿蒙适配 PRD

## 1. 插件概述

| 属性 | 值 |
|------|-----|
| 插件名 | `media_scanner` |
| 版本 | 2.2.1 |
| 类型 | MethodChannel 插件（standalone） |
| 原始平台 | Android Only |
| 适配目标 | HarmonyOS NEXT (OpenHarmony) |

**核心功能**：应用保存图片/视频后，通过系统媒体扫描服务刷新媒体库，使新文件在图库中可见，无需重启设备。

### 1.1 插件整体架构（当前 Android）

```mermaid
graph TB
    subgraph App["Flutter App"]
        APP[应用代码]
    end

    subgraph Dart["Dart 层"]
        MS["MediaScanner<br/>（静态类）"]
        MC["MethodChannel<br/>'media_scanner'"]
        APP --> MS
        MS --> MC
    end

    subgraph FlutterEngine["Flutter Engine"]
        BM["BinaryMessenger<br/>（跨平台消息编码/解码）"]
        MC --> BM
    end

    subgraph Android["Android 原生层（Kotlin）"]
        MSP["MediaScannerPlugin"]
        subgraph impl["实现"]
            CO["CoroutineScope<br/>（异步调度）"]
            VER["SDK 版本判断"]
            OLD["Broadcast<br/>Intent.ACTION_MEDIA<br/>_SCANNER_SCAN_FILE<br/>（API &lt; 29）"]
            NEW["MediaScannerConnection<br/>.scanFile()<br/>（API ≥ 29）"]
        end
        BM --> MSP
        MSP --> CO
        CO --> VER
        VER -->|"API < 29"| OLD
        VER -->|"API ≥ 29"| NEW
    end

    subgraph AndroidSys["Android 系统服务"]
        GALLERY["系统图库 / MediaStore"]
        OLD --> GALLERY
        NEW --> GALLERY
    end
```

### 1.2 适配后目标架构（Android + HarmonyOS）

```mermaid
graph TB
    subgraph App["Flutter App"]
        APP[应用代码]
    end

    subgraph Dart["Dart 层（无需改动）"]
        MS["MediaScanner<br/>loadMedia(path)"]
        MC["MethodChannel<br/>'media_scanner'"]
        APP --> MS
        MS --> MC
    end

    subgraph Platform["平台原生层"]
        subgraph Android["Android（已有）"]
            AK["MediaScannerPlugin.kt<br/>MediaScannerConnection"]
        end
        subgraph OHOS["HarmonyOS（待实现）"]
            AE["MediaScannerPlugin.ets<br/>photoAccessHelper"]
        end
    end

    MC --> AK
    MC --> AE

    subgraph Sys["系统服务"]
        AS["Android MediaStore"]
        HS["HarmonyOS 媒体库<br/>（系统相册/图库）"]
    end

    AK --> AS
    AE --> HS
```

---

## 2. 能力清单

### F-01: 触发媒体库扫描

- **公开 API**：`MediaScanner.loadMedia({String? path})`
- **输入条件**：传入一个有效的文件绝对路径字符串
- **用户可见行为**：调用后图库 / 系统相册中能立即看到新保存的图片或视频
- **输出结果**：成功返回 `"Success show image {path} in Gallery"` 字符串；失败返回异常信息字符串
- **平台能力依赖**：
  - Android：`MediaScannerConnection.scanFile()`（API ≥29）或 `Intent.ACTION_MEDIA_SCANNER_SCAN_FILE` 广播（API <29）
  - HarmonyOS：`@ohos.file.photoAccessHelper` 创建媒体资产并写入文件数据，系统自动完成索引
- **适配风险**：【R01】【R02】HarmonyOS 没有与 Android `MediaScannerConnection` 完全等价的 API，但提供了功能等价的媒体资产管理能力

### 2.1 调用流程

#### 当前 Android 调用时序

```mermaid
sequenceDiagram
    participant App as Flutter App
    participant Dart as MediaScanner (Dart)
    participant MC as MethodChannel
    participant Engine as Flutter Engine
    participant Plugin as MediaScannerPlugin (Kotlin)
    participant CS as CoroutineScope
    participant Sys as Android 系统

    App->>Dart: loadMedia(path: "/storage/.../photo.jpg")
    Dart->>MC: invokeMethod('refreshGallery', {"path": path})
    MC->>Engine: 编码 MethodCall
    Engine->>Plugin: onMethodCall(call, result)
    Plugin->>CS: launch { refreshMedia(path) }
    CS->>Sys: MediaScannerConnection.scanFile(path)
    Sys-->>CS: 扫描完成 / 异常
    CS-->>Plugin: success / error
    Plugin-->>Engine: result.success(msg)
    Engine->>MC: 编码返回
    MC-->>Dart: Future<String?>
    Dart-->>App: "Success show image ..."
```

#### HarmonyOS 适配后调用时序

```mermaid
sequenceDiagram
    participant App as Flutter App
    participant Dart as MediaScanner (Dart)
    participant MC as MethodChannel
    participant Engine as Flutter Engine
    participant Plugin as MediaScannerPlugin (ArkTS)
    participant PAH as photoAccessHelper
    participant Sys as HarmonyOS 媒体库

    App->>Dart: loadMedia(path: "/data/.../photo.jpg")
    Dart->>MC: invokeMethod('refreshGallery', {"path": path})
    MC->>Engine: 编码 MethodCall
    Engine->>Plugin: onMethodCall(call, result)
    Plugin->>PAH: createAsset(uri, type)
    PAH->>Sys: 写入媒体索引
    Sys-->>PAH: 完成
    PAH-->>Plugin: assetUri
    Plugin-->>Engine: result.success(msg)
    Engine->>MC: 编码返回
    MC-->>Dart: Future<String?>
    Dart-->>App: "Success show image ..."
```

---

## 3. 架构分析

### 3.1 Dart 层（lib/media_scanner.dart）

- 单一类 `MediaScanner`
- 静态 `MethodChannel('media_scanner')` 
- 仅 1 个方法：`loadMedia({String? path})` → `Future<String?>`
- 通过 `_channel.invokeMethod('refreshGallery', {"path": path})` 调用原生

### 3.2 Android 原生层（Kotlin）

- `MediaScannerPlugin` 实现 `FlutterPlugin` + `MethodCallHandler`
- 处理 `refreshGallery` 方法调用
- 使用 Kotlin Coroutines (`Dispatchers.Default`) 异步执行
- 版本分叉：API < 29 用广播，≥29 用 `MediaScannerConnection.scanFile()`
- 依赖：`kotlin-stdlib` + `kotlinx-coroutines`

### 3.3 平台注册

`pubspec.yaml` 仅注册 Android 平台：
```yaml
plugin:
  platforms:
    android:
      package: com.lazycatlabs.media_scanner
      pluginClass: MediaScannerPlugin
```

---

## 4. HarmonyOS 适配方案

### 4.1 插件类型判断

`plugin_type = "plugin_method_channel"`，需按照 MethodChannel 插件适配模式创建 `ohos/` 工程。

### 4.2 核心 API 映射

| Android API | HarmonyOS 等价方案 |
|------------|------------------|
| `MediaScannerConnection.scanFile(context, paths, mimeTypes, callback)` | `photoAccessHelper.MediaAssetChangeRequest.createAsset(context, fileUri)` 或直接通过 `file.fs` 写入公共媒体目录 |
| `Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.fromFile(file))` + `sendBroadcast()` | 不适用 — HarmonyOS 无此机制；仅需关注当前 API 路径 |
| 文件路径 `File(path)` | HarmonyOS 使用 `fileUri`（URI 格式） / `file.fs` 获取文件访问能力 |

### 4.3 权限需求

HarmonyOS 需要以下权限（在 `ohos/module.json5` 中声明）：

| 权限 | 用途 |
|------|------|
| `ohos.permission.WRITE_MEDIA` | 写入媒体文件到公共媒体目录 |
| `ohos.permission.READ_MEDIA` | 读取媒体文件（如需校验） |
| `ohos.permission.FILE_ACCESS` | 访问用户文件系统（如使用 fileAccess 机制） |

### 4.4 适配步骤摘要

```mermaid
flowchart LR
    subgraph Phase1["阶段 1：工程搭建"]
        A1["创建 ohos/<br/>HAR 模块"] --> A2["pubspec.yaml<br/>注册 ohos 平台"]
    end

    subgraph Phase2["阶段 2：代码实现"]
        B1["实现<br/>MediaScannerPlugin.ets"] --> B2["注册<br/>MethodChannel"] --> B3["实现<br/>refreshGallery 方法"]
    end

    subgraph Phase3["阶段 3：权限与配置"]
        C1["module.json5<br/>声明权限"] --> C2["配置<br/>oh-package.json5"]
    end

    subgraph Phase4["阶段 4：验证"]
        D1["编译检查"] --> D2["真机 / 模拟器<br/>Example 运行验证"]
    end

    Phase1 --> Phase2 --> Phase3 --> Phase4
```

### 4.5 HarmonyOS 适配后模块结构

```mermaid
graph TB
    subgraph Root["media_scanner 插件根目录"]
        direction TB
        LIB["lib/<br/>media_scanner.dart<br/>（Dart 层，不改动）"]
        OHOS["ohos/<br/>（新增）"]
        EXAMPLE["example/<br/>（新增 ohos/ 目录）"]
    end

    subgraph OHOS_Detail["ohos/ 内部结构"]
        direction TB
        ETS["src/main/ets/<br/>MediaScannerPlugin.ets<br/>（ArkTS 原生实现）"]
        MODULE["module.json5<br/>（权限声明）"]
        PACKAGE["oh-package.json5<br/>（依赖配置）"]
        BUILD["build-profile.json5<br/>（构建配置）"]
    end

    OHOS --> OHOS_Detail

    subgraph OHOS_Impl["MediaScannerPlugin.ets 内部结构"]
        direction LR
        REG["MethodChannel<br/>注册回调"]
        HANDLER["refreshGallery<br/>方法处理器"]
        API["photoAccessHelper<br/>API 调用"]
    end

    ETS --> OHOS_Impl
```

### 4.6 复杂度评估

| 维度 | 评估 |
|------|------|
| 复杂度等级 | **低** |
| Dart 层改动 | 无需改动（纯 MethodChannel，平台无关） |
| 原生层行数 | ~50-80 行 ArkTS |
| 依赖数量 | 0 个第三方库（仅 HarmonyOS SDK Kit） |
| 测试难度 | 低 — 需在真机/模拟器上触发媒体扫描 |
| 建议 | **proceed（可直接开始适配）** |

---

## 5. 判定依据

### 5.1 为什么复杂度为"低"

1. **代码量极小**：Dart 层仅 13 行，Android 层仅 75 行
2. **单一 API**：只有 1 个 MethodChannel + 1 个方法
3. **无状态**：无复杂状态管理，无 UI，无 Stream
4. **无第三方 Flutter 依赖**：不涉及依赖库适配问题
5. **无 FFI**：纯 MethodChannel 通信
6. **HarmonyOS 有等价能力**：`photoAccessHelper` 提供完整的媒体资产管理 API

### 5.2 为什么建议"proceed"

- 适配门槛极低，仅需实现一个 ArkTS 文件
- 核心逻辑（触发系统扫描文件并在图库中可见）在 HarmonyOS 上有成熟的 API 支持
- 无阻塞性风险 — 所有风险项（API 映射、路径格式、权限声明）均有明确解决方案

---

## 6. 风险汇总

### 6.1 风险全景图

```mermaid
graph TB
    subgraph HighRisk["High Impact - Priority"]
        R01["R01: API Mapping<br/>Prob: Medium | Impact: Medium-High<br/>MediaScannerConnection to photoAccessHelper"]
        R05["R05: Permissions<br/>Prob: Medium-High | Impact: Medium<br/>module.json5 correctness"]
    end

    subgraph MidRisk["Medium Impact - Follow Up"]
        R03["R03: File Path Format<br/>Prob: Medium | Impact: Medium<br/>Android path to HarmonyOS URI"]
    end

    subgraph LowRisk["Low Impact - Low Priority"]
        R02["R02: Legacy Broadcast<br/>Prob: Low | Impact: Low<br/>API <29 path not needed"]
        R04["R04: Language Migration<br/>Prob: Low | Impact: Low<br/>Kotlin to ArkTS conversion"]
    end

    HighRisk --> R01
    HighRisk --> R05
    MidRisk --> R03
    LowRisk --> R02
    LowRisk --> R04
```

```mermaid
flowchart LR
    subgraph S["Risk Severity"]
        M["Medium: 3 items<br/>R01 R03 R05"]:::med
        L["Low: 2 items<br/>R02 R04"]:::low
    end
    classDef med fill:#fbbf24,stroke:#d97706,color:#000
    classDef low fill:#86efac,stroke:#16a34a,color:#000
```

### 6.2 风险清单

| ID | 风险 | 严重度 | 缓解措施 |
|----|------|--------|---------|
| R01 | `MediaScannerConnection.scanFile` → `photoAccessHelper` API 语义不完全对等 | 🟡 中 | 使用 `createAsset` 创建媒体资产，系统自动刷新；需在真机验证图库刷新行为 |
| R02 | 旧版 Android 广播路径在 HarmonyOS 无等价方案 | 🟢 低 | 忽略旧路径，HarmonyOS 设备 API level 足够高 |
| R03 | 文件路径格式平台差异 | 🟡 中 | 适配时统一使用 HarmonyOS 文件 URI 规范 |
| R04 | Kotlin → ArkTS 语言迁移 | 🟢 低 | 逻辑简单，async/await 直接替代 Coroutines |
| R05 | 权限声明不完整可能导致媒体写入失败 | 🟡 中 | 在 module.json5 中准确声明 WRITE_MEDIA / READ_MEDIA |

### 6.3 环境依赖与组件交互全景

```mermaid
graph TB
    subgraph DevMachine["开发环境"]
        FLUTTER["Flutter SDK<br/>（含 OHOS 引擎）"]
        DEVECO["DevEco Studio<br/>（SDK + hvigor）"]
        OPM["ohpm<br/>（包管理）"]
    end

    subgraph Plugin_Code["media_scanner 插件"]
        DART["Dart 层<br/>（不改动）"]
        CONFIG["pubspec.yaml<br/>（新增 ohos 注册）"]
        ETS["ArkTS 层<br/>（新建 MediaScannerPlugin.ets）"]
        MANIFEST["module.json5<br/>（权限声明）"]
    end

    subgraph HarmonyOS["HarmonyOS SDK / API"]
        KITS["@ohos.file.photoAccessHelper<br/>（媒体资产管理）"]
        FS["@ohos.file.fs<br/>（文件系统访问）"]
        PERM["@ohos.abilityAccessCtrl<br/>（权限控制）"]
    end

    subgraph Device["目标设备"]
        GALLERY_OHOS["系统相册/图库"]
        MEDIA_STORE["媒体数据库"]
    end

    FLUTTER --> DART
    DEVECO --> ETS
    OPM --> ETS
    ETS --> KITS
    ETS --> FS
    ETS --> PERM
    KITS --> MEDIA_STORE
    FS --> MEDIA_STORE
    MEDIA_STORE --> GALLERY_OHOS
    MANIFEST --> PERM
```
