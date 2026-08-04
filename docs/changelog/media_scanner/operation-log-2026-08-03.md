# media_scanner 隔离 OHOS Demo — 完整操作日志

> 执行日期：2026-08-03 至 2026-08-04  
> 目标插件：`media_scanner` v2.2.1  
> 插件根目录：`flutter_library_workflow/flutter_library_workflow_release/repos-flutter-fast/media_scanner`  
> 设备：`192.168.3.85:41665`，OpenHarmony 6.1.1.120，API 24  
> 最终状态：隔离 Demo 已生成；三级页面结构完成；XLSX 18/18 对齐；Analyze/Test/Build/Install/Launch 通过。

---

## 1. 用户最终需求

1. 只处理 `media_scanner`，不显示 `flutter_zoom_drawer`、`device_imei` 或其它插件。
2. Demo/HAP 必须隔离在 `media_scanner` 插件仓库，不能依赖公共 `flutter_ohos_test` Hub 作为交付物。
3. 手机桌面应用名称必须能区分插件，最终使用 `MediaScanner 测试`。
4. Demo 中的模块、用例编号、标题和级别必须与以下 XLSX 一致：
   - `repos-flutter-fast/media_scanner/.ohos-adaptation/05-test-cases.xlsx`
5. Demo 应符合 `agent-flutter/.claude/skills/flutter-plugin-example-generator2` 的三级页面要求：
   - 模块索引页；
   - 模块用例列表页；
   - 用例详情页 + ResultPanel + 复制日志。
6. 记录实际操作、错误、修复、项目规范和证据边界。

---

## 2. 范围纠正与隔离原则

### 2.1 初期误选公共 Hub

初期曾在 `flutter_ohos_test` 公共 Hub 中构建和修改 MediaScanner 页面。该 Hub 同时包含 ZoomDrawer、DeviceImei 等多个插件，不符合“media_scanner 专用 HAP”的最终要求。

### 2.2 纠正措施

- 新建插件内隔离 Demo：
  - `repos-flutter-fast/media_scanner/example_auto/`
- HAP 只保存到：
  - `example_auto/build/ohos/hap/media_scanner-ohos-demo.hap`
- 公共 Hub 中本次会话产生的以下修改已精确回滚：
  - `flutter_ohos_test` 应用显示名；
  - `flutter_ohos_test/lib/media_scanner_full_test_page.dart` 中 6 个标题改动。
- 未触碰公共 Hub 中本次会话前已存在的其它改动：
  - `device_imei_test_page.dart`；
  - `midscene_run/`；
  - `ohos/entry/har/`；
  - 已有 `build-profile.json5` 用户修改。

### 2.3 权威源码与临时构建目录

- 权威源码：`repos-flutter-fast/media_scanner/`
- 临时短物理路径：`D:\msbuild\media_scanner`
- 短工作区仅用于绕过 Windows/Hvigor 长路径限制；最终源码和 HAP 已同步回插件仓库。
- 不使用 `subst` 或 junction：Hvigor 可能解析回原路径，生成的 Dart/Node/Hvigor 元数据也可能保留原绝对路径。

---

## 3. 只读发现与状态核对

### 3.1 文档扫描

按迁移 skill 的分阶段要求，先由独立文档子代理扫描：

- `docs/changelog/media_scanner/changelog.md`（扫描时原名 `docs/changelog/media_scanner_changelog.md`）
- `docs/changelog/media_scanner/devlog.md`（扫描时原名 `docs/changelog/media_scanner_devlog.md`）
- `docs/media_scanner_ohos/`
- 相关 sibling/donor 文档

主要结论：

- 权威用例数为 18；早期文档中的 11/15 条属于历史或过期记录。
- 当前实现是 standalone 单包 MethodChannel，不是旧 PRD 的 federated 两包结构。
- OHOS 方法名是 `loadMedia`；Android 方法名是 `refreshGallery`。
- 权限是 `ohos.permission.WRITE_IMAGEVIDEO`；旧分析中的 WRITE_MEDIA/READ_MEDIA/FILE_ACCESS 不可靠。
- 当前实现使用 `MediaAssetChangeRequest` + `applyChanges`，不是旧 `createAsset + fileIo.copyFile` 方案。

### 3.2 项目源码扫描

分成两个独立只读扫描范围：

1. Dart / Public API / test：
   - `pubspec.yaml`
   - `lib/`
   - `test/`
2. OHOS / Android / example / 旧产物：
   - `ohos/`
   - `android/`
   - `example/`
   - `.ohos-adaptation/`

确认：

- Channel：`media_scanner`
- Dart OHOS 方法：`loadMedia`
- Android 方法：`refreshGallery`
- ArkTS：`MediaAssetChangeRequest.createImageAssetRequest/createVideoAssetRequest` + `applyChanges`
- 插件 detach 时清理 MethodChannel handler。

### 3.3 中途完整 profile 探索的清理

本次早期曾尝试生成完整 profile，但用户随后明确缩小范围，仅需要 OHOS entry/demo/XLSX 一致性。以下本次会话新建且未完成最终验证的探索产物已删除，避免误导后续审计：

- `.ohos-adaptation/00-source-scan.json`
- `.ohos-adaptation/00-migration-context.json`
- `.ohos-adaptation/02-planning.json`
- `.ohos-adaptation/05-schema-validation.json`
- `.ohos-adaptation/05-pipeline-consistency.json`

被覆盖的原 `01-analysis.json` 已从历史交付副本恢复。完整扫描发现保留在本文档，不冒充完整 profile PASS。

---

## 4. Demo 生成操作

### 4.1 创建隔离 Demo

```bash
cd D:\deveco\ai_tool\flutter_library_workflow\flutter_library_workflow_release\repos-flutter-fast\media_scanner
flutter create --platforms ohos example_auto
```

### 4.2 Demo 依赖

`example_auto/pubspec.yaml` 只依赖：

```yaml
dependencies:
  flutter:
    sdk: flutter
  media_scanner:
    path: ../
```

确认无以下依赖或 import：

- `flutter_zoom_drawer`
- `device_imei`
- `discrollview`
- `nice_image_view`
- `pin_code_fields`

### 4.3 OHOS entry 配置

`example_auto/ohos/entry/src/main/module.json5`：

- `deviceTypes`: `phone`, `tablet`, `2in1`
- 权限：`ohos.permission.WRITE_IMAGEVIDEO`
- 权限原因：`write_media_permission_reason`
- `usedScene.abilities`: `EntryAbility`
- `usedScene.when`: `inuse`

显示名：

- base / zh_CN：`MediaScanner 测试`
- en_US：`MediaScanner Test`

### 4.4 三级页面结构

最终 `example_auto/lib/main.dart` 包含：

1. `ModuleIndexPage`
   - 6 个模块 F-01 至 F-06
   - Key：`module_F-01` 至 `module_F-06`
2. `CaseListPage`
   - 每个模块显示该模块的 reviewed cases
   - Key：`case_<case-id>`
3. `CaseDetailPage`
   - 用例标题、级别、模块、判定语义、预期结果
   - 执行按钮：`btn_run_<case-id>`
   - ResultPanel：
     - `result_panel`
     - `txt_result_status`
     - `txt_result`
     - `txt_result_detail`
   - 复制日志：`btn_copy_log`

判定语义：

- 正向用例：行为符合预期 → PASS
- 预期拒绝用例：错误/拒绝符合预期 → PASS
- 不把“返回错误”自动当成应用失败。

---

## 5. XLSX 一致性核对

源文件：

- `.ohos-adaptation/05-test-cases.xlsx`
- `example_auto/lib/main.dart`

最终核对：

| 项目 | 结果 |
|------|:--:|
| XLSX 用例数 | 18 |
| Demo 用例数 | 18 |
| ID 集合 | 一致 |
| 标题 | 18/18 一致 |
| 级别 | 18/18 一致 |
| 模块数量 | F-01=4, F-02=3, F-03=4, F-04=3, F-05=3, F-06=1 |

级别对比时进行规范化：

```text
XLSX: Level 0 / Level 1 / Level 2
Demo: L0 / L1 / L2
```

它们语义一致；核对脚本将 `Level 0` 规范化为 `L0` 后比较。

### XLSX 现有格式说明

当前 workbook 为旧 flutter-fast 格式：

- 13 列；
- 比 skill 标准多 `测试用例` 结果列；
- 覆盖设备文本为 `手机 \ PC`。

本轮目标是“现有 XLSX ↔ Demo 内容一致”，未重导完整 profile 12 列 workbook。若重导，必须先完成 skill 要求的完整 demo map/binding，不能手工覆盖现有 XLSX。

---

## 6. 构建错误与处理

### 6.1 模块名不一致 — `00303053`

错误：

```text
The module name media_scanner in build-profile.json5 or hvigorconfig.ts
must be same as moduleName in module.json5.
```

原因：

- `flutter-hvigor-plugin` 从 `.flutter-plugins-dependencies` 读取 pubspec 包名 `media_scanner`；
- `injectNativeModules` 用该名称调用 `includeNode`；
- 插件 `ohos/src/main/module.json5` / `oh-package.json5` 原名为 `media_scanner_ohos`。

处理：

- `ohos/src/main/module.json5`: `media_scanner_ohos` → `media_scanner`
- `ohos/oh-package.json5`: `media_scanner_ohos` → `media_scanner`

未修改：

- Dart package 名；
- ArkTS plugin class；
- `io.flutter.plugins.mediascanner` 注册包名；
- MethodChannel 名。

### 6.2 Windows 路径超长 — `00306001`

错误：

```text
The length of path exceeds the maximum length: 259.
```

原因：

插件根路径 + `example_auto/ohos/entry/.../flutter_assets/...` 超过 Hvigor 路径限制。

处理：

```text
源：D:\deveco\ai_tool\flutter_library_workflow\flutter_library_workflow_release\repos-flutter-fast\media_scanner
短工作区：D:\msbuild\media_scanner
```

在短工作区清理并重新生成：

- `.dart_tool/`
- `ohos/oh_modules/`
- `ohos/.hvigor/`
- `build/`

然后运行 `flutter pub get`，再构建。

### 6.3 签名 bundleName 不匹配 — `00303074`

错误：

```text
The bundleName in app.json5/hvigorfile.ts does not match the bundleName
in the generated SigningConfigs.
```

原因：

已注册签名 profile 的 bundleName 是：

```text
com.example.flutter_ohos_test
```

而新建 example 初始是 `com.example.example_auto` / `com.example.media_scanner_demo`。

处理：

- `example_auto/ohos/build-profile.json5`
- `example_auto/ohos/AppScope/app.json5`

统一为：

```text
com.example.flutter_ohos_test
```

注意：手机桌面名称由资源 `app_name`/`EntryAbility_label` 控制，仍为独立名称 `MediaScanner 测试`。

### 6.4 `Platform.isOhos` 在 host 测试崩溃

错误：

```text
No static getter 'isOhos' declared
```

原因：

`Platform.isOhos` 依赖 OHOS Dart fork；host Flutter test 不保证该 getter 可用。

处理：

```dart
defaultTargetPlatform == TargetPlatform.ohos
```

该写法符合迁移 skill 推荐规范。

### 6.5 ListView 懒加载导致 widget 测试找不到节点

表现：

- 直接查找 F-03/F-06 元素返回 0；
- 元素尚未被 ListView 构建。

处理：

- 用三级导航测试代替平铺页面全量查找；
- 必要时使用 `scrollUntilVisible`。

### 6.6 Git Bash 路径改写

表现：

```text
/data/local/tmp/... 被改写为 C:/Program Files/Git/data/local/tmp/...
```

处理：

```bash
MSYS_NO_PATHCONV=1 hdc shell "snapshot_display -f /data/local/tmp/file.jpeg"
MSYS_NO_PATHCONV=1 hdc file recv /data/local/tmp/file.jpeg <local-path>
```

`snapshot_display` 要求 `.jpeg` 后缀；`.png` 会被拒绝。

### 6.7 PowerShell 假失败状态

表现：

PowerShell 将 Flutter 下载源提示写入 stderr，外层命令可能返回 1，但日志中存在：

```text
√ Built ...signed.hap
```

处理：

- 不仅看 shell 包装层 exit code；
- 同时核对 Hvigor success marker 和实际 HAP 文件；
- Windows 构建优先直接调用 DevEco Node + `hvigorw.js`。

---

## 7. 实际执行的关键命令

### 环境与设备

```bash
hdc list targets
where flutter
where hdc
```

确认：

- Flutter OHOS fork：`D:\flutter\OpenHarmony-flutter\flutter_flutter`
- HDC：DevEco SDK toolchains
- 设备：`192.168.3.85:41665`

### 静态检查与测试

```bash
cd <media_scanner>/example_auto
flutter pub get
flutter analyze
flutter test
```

结果：

- `flutter analyze`: No issues found
- `flutter test`: All tests passed

### 直接 Hvigor 构建

```bash
cd D:\msbuild\media_scanner\example_auto\ohos
"D:\deveco\DevEco Studio\tools\node\node.exe" \
  "D:\deveco\DevEco Studio\tools\hvigor\bin\hvigorw.js" \
  assembleHap -p product=default -p buildMode=debug --no-daemon --mode module
```

结果：

```text
BUILD SUCCESSFUL
```

### 安装与启动

```bash
hdc uninstall com.example.flutter_ohos_test
hdc install media_scanner-ohos-demo.hap
hdc shell aa start -a EntryAbility -b com.example.flutter_ohos_test
```

结果：安装成功、启动成功。

---

## 8. 最终 HAP 证据

| 项 | 值 |
|----|----|
| 路径 | `example_auto/build/ohos/hap/media_scanner-ohos-demo.hap` |
| 大小 | 141,453,205 bytes |
| SHA-256 | `22d9b39c320dfbfe6ec020ff8bb6d6ea00960c071a7eda3487f098b9b6a4a726` |
| ZIP entries | 24 |
| entry-name SHA-256 | `5ece28efa3160b584ac061cd15bf9e8a3b6b624c317e1696802e4d5a3fb79d26` |
| 签名 | Hvigor `SignHap` PASS |
| 安装 | PASS |
| 启动 | PASS |

### 签名信息保密要求

- `build-profile.json5` 中存在签名材料和口令字段；
- 文档不得记录 `keyPassword` / `storePassword` 的具体值；
- 不把签名材料复制到 changelog；
- 对外分享前应改用安全的本地签名配置或环境注入方式。

---

## 9. 真机与自动化证据边界

### 已确认

- HAP 已安装；
- App 已启动；
- 手机显示名称为 `MediaScanner 测试`；
- 真机截图确认模块索引页显示 6 个 media_scanner 模块；
- 无其它插件模块。

### 由 widget test 确认

- ModuleIndexPage → F-01 CaseListPage 跳转；
- F-01 列表 → F-01-01 CaseDetailPage 跳转；
- 详情页存在执行按钮、ResultPanel、复制日志 Key。

### 未确认/不得扩写为 PASS

- 坐标点击截图 `ms_f01_list.jpeg`、`ms_detail.jpeg` 实际仍停留在模块索引页；不作为二/三级页面真机证据。
- 18 条用例未在本轮全部逐条点击执行。
- “全部执行”未在本轮真机完成终态统计。
- 系统图库中实际媒体可见性未逐格式复核。
- Midscene 全局包为空，本轮未形成 Midscene 自动化 PASS。
- `uitest dumpLayout` 无法读取 Flutter 画布文本。

---

## 10. 文件变更清单

### 插件源码

- `ohos/src/main/module.json5`
  - module name → `media_scanner`
- `ohos/oh-package.json5`
  - package name → `media_scanner`

### 隔离 Demo

- `example_auto/pubspec.yaml`
- `example_auto/lib/main.dart`
- `example_auto/test/widget_test.dart`
- `example_auto/analysis_options.yaml`
- `example_auto/ohos/build-profile.json5`
- `example_auto/ohos/AppScope/app.json5`
- `example_auto/ohos/AppScope/resources/base/element/string.json`
- `example_auto/ohos/entry/src/main/module.json5`
- `example_auto/ohos/entry/src/main/resources/base/element/string.json`
- `example_auto/ohos/entry/src/main/resources/zh_CN/element/string.json`
- `example_auto/ohos/entry/src/main/resources/en_US/element/string.json`

### 交付产物

- `example_auto/build/ohos/hap/media_scanner-ohos-demo.hap`
- `example_auto/build/ohos/hap/ms_3level.jpeg`
- 诊断截图：`ms_f01_list.jpeg`、`ms_detail.jpeg`（不能作为二/三级真机 PASS）

### 文档

- `docs/changelog/media_scanner/changelog.md`
- `docs/changelog/media_scanner/devlog.md`
- `docs/changelog/media_scanner/operation-log-2026-08-03.md`
- `docs/changelog/media_scanner/project-standards.md`
- `docs/changelog/media_scanner/README.md`

---

## 11. 最终状态

| Gate | 状态 |
|------|:--:|
| 插件隔离 | PASS |
| 只依赖 media_scanner | PASS |
| XLSX 18/18 ID/标题/级别 | PASS |
| 三级页面结构 | PASS（源码 + widget test） |
| Flutter analyze | PASS |
| Flutter widget test | PASS |
| Hvigor build | PASS |
| SignHap | PASS |
| HDC install | PASS |
| App launch | PASS |
| 模块索引页真机显示 | PASS |
| 18 条真机逐条执行 | NOT_RUN |
| 真机一键测试全部 | NOT_RUN |
| Midscene 自动化 | NOT_RUN |

本日志只记录实际执行和实际证据；未执行项目不标为 PASS。
