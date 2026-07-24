# flutter_zoom_drawer OHOS 适配实施记录

> 日期：2026-07-23  
> Flutter SDK：3.32.4-ohos-0.0.1 | Dart：3.8.1  
> DevEco Studio：6.x | hvigor：6.24.3 | OHOS SDK：API 24 (6.1.1)  
> 状态：代码完成，HAP 构建通过，已安装到 2in1 真机，功能验证待用户测试

---

## 1. 项目位置

| 目录 | 说明 |
|------|------|
| `D:\deveco\ai_tool\flutter_zoom_drawer_ohos` | flutter_zoom_drawer 源码 + 鸿蒙适配（1 行改动） |
| `D:\deveco\ai_tool\flutter_ohos_test` | 集成测试 Demo 工程（同时测试 media_scanner + flutter_zoom_drawer） |

## 2. 适配分析

### 2.1 包类型判定

flutter_zoom_drawer v3.2.0 是**纯 Dart 包**（pure_dart）：

| 维度 | 结论 |
|------|------|
| 原生目录（android/ios/windows/...） | **无** |
| `dart:io` 使用（Platform.isXxx） | **无**（v3.2.0 为支持 Web 已全部移除） |
| 第三方运行时依赖 | **无**（仅依赖 Flutter SDK） |
| dart:io Platform 检查 | **无**（仅使用 `kIsWeb` + `defaultTargetPlatform`） |
| transitive 原生插件风险 | **无**（零三方依赖，仅 Flutter SDK） |

来源：GitHub 源码克隆后逐文件扫描 + pubspec.yaml 解析。

### 2.2 lib/ 目录结构

```
lib/
  flutter_zoom_drawer.dart        # 入口，导出所有公开 API
  src/
    flutter_zoom_drawer.dart      # ZoomDrawer Widget + State（~850 行）
    drawer_controller.dart        # ZoomDrawerController
    extensions.dart               # BuildContext 扩展：ZoomDrawer.of(context)
    drawer_styles/                # 4 种内置风格 + 自定义 Builder
      drawer_styles.dart
      style_1_widget.dart         # Style 1: 滑动
      style_2_widget.dart         # Style 2: 滑动 + 阴影
      style_3_widget.dart         # Style 3: 滑动 + 旋转
      style_4_widget.dart         # Style 4: 滑动 + 旋转 + 阴影
      style_default_widget.dart   # 默认风格（= style2）
    enum/
      drawer_last_action.dart     # DrawerLastAction { open, close, toggle, switchScreen }
      drawer_state.dart           # DrawerState { open, closed, opening, closing }
      drawer_style.dart           # DrawerStyle { defaultStyle, style1-4 }
```

### 2.3 依赖链分析

```
flutter_zoom_drawer (3.2.0)
  └── flutter (SDK)  ← 唯一运行时依赖
```

无 vector_math、无 meta、无任何三方包。`flutter_lints: ^3.0.1` 仅为 dev_dependency。

### 2.4 已有适配库数据库检索

按照 `flutter-adapted-library` Skill 的四步检索流程：

| 步骤 | 方法 | 结果 |
|------|------|:--:|
| Step 1 | 搜索 `adapted-libraries.json`（468 库） | 无 `zoom_drawer` 记录 |
| Step 2 | 检查 `repos/plugins.json` | 目录不存在 |
| Step 3 | gitcode.com 仓库搜索 | 无 OHOS 分支 |
| Step 4 | 全网搜索 + Perplexity Research | 确认为纯 Dart 包 |

结论：标记为 `pure_dart` 类型，天然兼容 OHOS。

---

## 3. 唯一适配改动

### 3.1 文件：`lib/src/flutter_zoom_drawer.dart` 第 827 行

```diff
     if (!kIsWeb &&
-        defaultTargetPlatform == TargetPlatform.android &&
+        (defaultTargetPlatform == TargetPlatform.android ||
+         defaultTargetPlatform == TargetPlatform.ohos) &&
         widget.androidCloseOnBackTap) {
       parentWidget = PopScope(
         canPop: _canPop(),
         child: parentWidget,
       );
     }
```

**原因**：OHOS 设备上 `defaultTargetPlatform` 返回 `TargetPlatform.ohos`（Flutter OHOS SDK 已定义该枚举值，`platform.dart` 第 85 行），原条件只匹配 Android，导致 OHOS 上返回手势/键无法关闭抽屉。

### 3.2 改动统计

| 指标 | 数值 |
|------|:--:|
| 改动文件 | 1 |
| 改动行数 | 1 |
| 新增原生代码 | 0 行 |
| 新增 ArkTS | 0 行 |
| 新增 ohos/ 工程 | 0 |

---

## 4. pubspec.yaml 调整

```yaml
# flutter_zoom_drawer_ohos/pubspec.yaml
dev_dependencies:
  flutter_lints: ^3.0.1
  flutter_test:        # ← 新增，让 flutter test 可运行
    sdk: flutter
```

原始包只有 `flutter_lints`，缺少 `flutter_test` 导致 `flutter test` 命令失败。

---

## 5. 编译验证

### 5.1 flutter_zoom_drawer_ohos

```bash
flutter pub get     # ✅ 通过
flutter analyze     # ✅ 8 issues（全部为预存的 withOpacity 弃用 warning + lint include 缺失 warning，0 error）
```

### 5.2 flutter_ohos_test

```bash
flutter pub get     # ✅ 通过
flutter analyze     # ✅ 0 issues
```

### 5.3 HAP 构建

```bash
# flutter build hap 因 BATCH RECURSION 失败（已知问题，见 media_scanner 实施记录 §5.1）
# 改用 DevEco Studio 自带 node 直接调用 hvigorw：
"D:\deveco\DevEco Studio\tools\node\node.exe" \
  "D:\deveco\DevEco Studio\tools\hvigor\bin\hvigorw.js" \
  assembleHap -p product=default -p buildMode=debug --no-daemon
```

构建结果：
- **BUILD SUCCESSFUL** (18s 增量构建)
- `entry-default-signed.hap` — 135 MB（已签名）
- `entry-default-unsigned.hap` — 134 MB

### 5.4 真机安装

| 项目 | 值 |
|------|-----|
| 设备 | `192.168.3.77:45199`（2in1） |
| 安装命令 | `hdc -t ... install entry-default-signed.hap` |
| 结果 | `install bundle successfully` |

---

## 6. 测试 Demo 功能

### 6.1 测试 Hub 入口

`flutter_ohos_test/lib/main.dart` — 两个测试卡片：

| 卡片 | 功能 | 页面文件 |
|------|------|---------|
| **MediaScanner** | 生成测试图片 → 扫描到系统相册 → 展示图片 | `main.dart` — `MediaScannerTestPage` |
| **ZoomDrawer** | 4 种抽屉风格切换 + 手势 + 按钮控制 | `zoom_drawer_test_page.dart` |

### 6.2 MediaScanner 测试页

- 生成 1×1 合法 PNG（68 字节硬编码，同步，零额外依赖）
- 沙箱路径写入（OHOS 使用 `/data/storage/el2/base/haps/entry/files`）
- 调用 `MediaScanner.loadMedia(path)` 注册到系统相册
- 成功后展示生成的图片（`Image.file` + `BoxFit.contain`）

关键设计决策：使用硬编码最小 PNG（`_createMinimalPng`）而非 `dart:ui` Canvas 生成，原因：
1. 同步执行，无 await
2. 不依赖 Flutter 渲染引擎（即使引擎有 bug 也不影响测试）
3. 确定性 68 字节，已知合法格式
4. 排错路径清晰——图片问题 vs 扫描问题可隔离

### 6.3 ZoomDrawer 测试页

三种关闭方式（OHOS 2in1 无 Android 物理返回键）：

| 方式 | 参数 | 说明 |
|------|------|------|
| 点击主屏幕区域 | `mainScreenTapClose: true` | 抽屉打开时点击暗色主区域关闭 |
| 左滑/右滑手势 | `dragOffset: 100.0` | 调整拖拽阈值提高灵敏度 |
| 关闭按钮 | 抽屉菜单右上角 X 按钮 | `_controller.close?.call()` 显式关闭 |

### 6.4 ZoomDrawer 问题修复记录

| 问题 | 现象 | 根因 | 修复 |
|------|------|------|------|
| 抽屉打不开/缩不回 | 2in1 真机上右侧滑无法关闭 | `mainScreenTapClose` 默认 `false`，无物理返回键 | 设为 `true` + 增加关闭按钮 + 降低 `dragOffset` 到 100 |

---

## 7. OHOS 配置确认

### 7.1 module.json5

```json5
"deviceTypes": ["phone", "2in1"],    // ← 支持 2in1 设备
"requestPermissions": [
  { "name": "ohos.permission.INTERNET" },
  {
    "name": "ohos.permission.WRITE_IMAGEVIDEO",
    "reason": "$string:write_media_permission_reason",
    "usedScene": {
      "abilities": ["EntryAbility"],
      "when": "inuse"
    }
  }
]
```

### 7.2 EntryAbility.ets — 双层权限请求

```typescript
// 第一条路：onCreate() 启动时主动弹窗
onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
  super.onCreate(want, launchParam);
  this.requestWriteMediaPermission();   // 检查 + 请求 WRITE_IMAGEVIDEO
}

// 第二条路：MediaScannerPlugin.ets 中 ensureWriteMediaPermission()
// 调用 applyChanges 前的防御性检查（兜底 EntryAbility 被拒场景）
```

### 7.3 modelVersion 一致性

| 文件 | modelVersion |
|------|:--:|
| `hvigor/hvigor-config.json5` | `5.1.0` |
| `oh-package.json5` | `5.1.0` |
| 一致性 | ✅ |

---

## 8. 产物清单

```
docs/
├── PRD：Flutter flutter_zoom_drawer 库鸿蒙（OpenHarmony）适配移植方案.md  # PRD（v1.0）
└── flutter_zoom_drawer_ohos_implementation_record.md                     # 本文件

flutter_zoom_drawer_ohos/
├── .ohos-adaptation/
│   ├── 00-requirement.json         # 结构化需求数据（requirement-parse Skill 输出）
│   └── 00-requirement-report.md    # 需求解析报告
├── lib/src/flutter_zoom_drawer.dart # ← 仅改 1 行（TargetPlatform.ohos）
├── pubspec.yaml                     # ← 新增 flutter_test dev_dependency
└── example/                         # ← 原始 example（未改动）

flutter_ohos_test/
├── lib/main.dart                    # 测试 Hub + MediaScanner 测试页
├── lib/zoom_drawer_test_page.dart   # ZoomDrawer 测试页（4 风格 + 3 种关闭方式）
├── pubspec.yaml                     # ← 新增 flutter_zoom_drawer path 依赖
└── ohos/entry/build/default/outputs/default/
    ├── entry-default-signed.hap     # 已签名 HAP（135 MB）
    └── entry-default-unsigned.hap   # 未签名 HAP
```

## 9. 相关文档

- PRD：`docs/PRD：Flutter flutter_zoom_drawer 库鸿蒙（OpenHarmony）适配移植方案.md`
- media_scanner 实施记录：`docs/media_scanner_ohos_implementation_record.md`
- 纯 Dart 适配指南：`docs/flutter_library_workflow/skills/flutter/ohos-coding-guide/pure-dart.md`
- 已适配库数据库：`docs/flutter_library_workflow/skills/flutter/flutter-adapted-library/references/adapted-libraries.json`
- Flutter OHOS 插件适配指导：`docs/flutter_library_workflow/skills/flutter/flutter-docs-lookup/flutter-docs/07_plugin/ohos平台适配flutter三方库指导.md`

## 10. 修订记录

| 版本 | 日期 | 变更说明 |
|------|------|---------|
| 1.0 | 2026-07-23 | 初始版本：GitHub 克隆 → 1 行适配 → pub get/analyze → HAP 构建 → 真机安装 |
