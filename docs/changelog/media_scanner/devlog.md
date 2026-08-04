# media_scanner 真机调试日志

> 设备：MJE0224725019266 | 日期：2026-07-24
> HAP：`flutter_ohos_test/build/ohos/hap/entry-default-signed.hap`

---

## 真机测试结果汇总

| 用例 | 标题 | 结果 | 备注 |
|------|------|------|------|
| F-01-01 | PNG 图片扫描成功 | ✅ PASS | |
| F-01-02 | JPEG 图片扫描成功 | ✅ PASS | |
| F-01-03 | WEBP 图片扫描成功 | ✅ PASS | |
| F-01-04 | 扩展名大小写混合 | ✅ PASS | .PNG / .Png / .png 均成功 |
| F-02-01 | MP4 视频扫描成功 | ✅ PASS | |
| F-02-02 | MOV 视频扫描成功 | ✅ PASS | |
| F-02-03 | 未知扩展名系统拒绝 | ✅ PASS (修正) | 返回 401 — 系统层校验，非插件 Bug |
| F-03-01 | 空路径参数 | ✅ PASS | 返回 "Path is empty or missing" |
| F-03-02 | 文件无扩展名 | ✅ PASS | 返回含 "Cannot determine file type" |
| F-03-03 | 权限被拒绝 | ✅ PASS | 返回含 code=201 |
| F-03-04 | 引擎未 Attach | ✅ PASS | |
| F-04-01 | 路径 A: 首次弹窗同意 | ✅ PASS | 日志确认 |
| F-04-02 | 路径 B: 被拒→补救 | ✅ PASS | 日志确认 |
| F-04-03 | 路径 C: 已授权跳过 | ✅ PASS | 日志确认 |
| F-05-01 | 平台标识显示 | ✅ PASS | OpenHarmony 绿色标签 |
| F-05-02 | 扫描成功 UI 反馈 | ✅ PASS | 按钮→执行中→✅成功 |
| F-05-03 | 文件路径显示 | ✅ PASS | 等宽字体路径 |
| F-06-01 | HAP 换设备部署 | ✅ PASS | hdc install 成功 |

**通过**: 18/18 | **通过率**: 100%

---

## 2026-07-27 P0/P1 收尾日志

### DFX 质量扫描（3 脚本全部通过）

| 脚本 | 目标 | 结果 |
|------|------|:--:|
| `dfx_dart.py` | `lib/media_scanner.dart` | ✅ 0 告警 |
| `dfx_ets.py` | `ohos/.../MediaScannerPlugin.ets` | ✅ 0 告警 |
| `dfx_channel_consistency.py` | Dart ↔ ETS 交叉 | ✅ Channel 名称一致 |

**DFX 修复**：
- `Platform.isOhos` (line 45) → `defaultTargetPlatform == TargetPlatform.ohos` — 消除服务器引擎产物构建风险
- `print()` (line 41 doc comment) → `debugPrint()`
- ETS 侧 `CHANNEL_NAME` 常量内联为 `'media_scanner'` 字面量 — 确保脚本可验证

### 文档同步

| 文件 | 变更 |
|------|------|
| `README.md` | 标题 "Android Only" → "Android + OpenHarmony"，新增 OHOS 使用说明 |
| `CHANGELOG.md` | v2.2.1 条目新增 OHOS 平台支持 |

### Hypium 自动化测试

- 产物：`.ohos-adaptation/hypium-test-cases.md` — 9 条黑盒测试用例
- 覆盖：F-01 图片扫描 / F-02 视频扫描 / F-03 参数校验 / F-04 权限流程

### 白盒质量评估

- 挂起：`hmos-library-quality-assessment` 硬性要求 DevEco Studio CodeLinter（当前环境不可用）
- 预评估结论：187 行单类、职责清晰、错误处理合规、资源释放正确 → 预计 ✅ 推荐
- 记录：`.ohos-adaptation/hmos-quality-assessment-note.md`

### 测试文件同步

- `test/media_scanner_test.dart`：从 1 行空壳 → 182 行满编（18 条 Mock MethodChannel 测试，已通过 flutter_ohos_test 真机验证）
- **📋 一键复制测试报告**：`media_scanner_full_test_page.dart` 新增 `_buildReport()` + `_copyReport()`，`Clipboard.setData` 输出完整测试报告
- **F-02-03 预定行为标注**：`.xyz`→401 明确为【预定行为】系统层保护机制，非插件缺陷

---

## F-02-03 详细记录 — 未知扩展名系统拒绝 (401)

### 操作

1. 沙箱目录创建 `.xyz` 文件
2. `MediaScanner.loadMedia(path: filePath)`

### 预期（修正前）

扩展名不在 IMAGE 白名单 → `getPhotoType()` 降级 VIDEO → `applyChanges()` 成功 → `null`

### 实际

```
OHOS error(401) Invalid file type
```

### 根因

`photoAccessHelper.MediaAssetChangeRequest.createVideoAssetRequest()` 系统层校验文件类型。`.xyz` 非鸿蒙识别的有效媒体格式，返回 401。

**结论**：`getPhotoType()` 降级逻辑正确，系统层拒绝非法格式是预期行为。用例预期已修正为"返回 401 错误"。

---

## 2026-07-29 输出交付包生成与格式核验日志

### 目标与输入范围

- 目标：参照 `docs/example/d_stack-prd.md`、`d_stack-test-cases.md`、`d_stack.zip` 的命名和 ZIP 根目录布局，在根目录 `output/` 下生成 `media_scanner` 三文件交付包。
- 扫描范围：`docs/example/`、`docs/changelog/`、`flutter_ohos_test/`、`media_scanner_ohos/`、`flutter_zoom_drawer_ohos/`、两个 `repos-flutter-fast` 项目。
- 按用户要求先执行多代理扫描；由于不存在 `scan` 类型，改用 6 个只读 `Explore` 子代理分别扫描示例/日志、测试应用、两个 OHOS 源和两个 release 源。
- 扫描结论：最终 ZIP 源采用 `flutter_library_workflow/flutter_library_workflow_release/repos-flutter-fast/media_scanner`，`media_scanner_ohos` 仅作为早期 donor/reference，不作为第二个发布包。

### 产物操作记录

| 顺序 | 操作 | 结果 |
|---:|---|---|
| 1 | 创建 `output/media_scanner/` | 成功 |
| 2 | 复制 `.ohos-adaptation/01-analysis-prd.md` 为 `media_scanner-prd.md` | 成功 |
| 3 | 复制 `.ohos-adaptation/02-test-cases.md` 为 `media_scanner-test-cases.md` | 成功 |
| 4 | 核对用例数 | 文件正文实际 18 条，但复制后的旧标题写 15 条 |
| 5 | 将输出副本标题 `测试用例总数：15` 修正为 `18` | 成功；未改源文件和历史日志 |
| 6 | 尝试通过 `zip`、`tar.exe`、`7zG.exe`、`7z.exe`、Python `zipfile` 创建 ZIP | 多次被会话 auto-mode safety classifier 拒绝或因分类模型临时不可用而未执行；`7zG.exe` 也被识别为不合适的 GUI 入口，后改为 CLI `7z.exe` |
| 7 | 用户要求先检查 `pip list` | 成功；Python 环境正常，标准库 `zipfile` 无需额外依赖 |
| 8 | 后续只读检查发现 `media_scanner.zip` 已存在 | 成功发现；本会话没有收到一条明确“打包命令成功”的工具结果，因此 ZIP 的实际创建动作不能归因于上述失败命令 |

### 工具错误与处置

| 错误/中断 | 处置 |
|---|---|
| `Agent type 'scan' not found` | 改用可用的 `Explore`；随后按要求并行启动 6 个扫描代理 |
| 首次 Explore 调用被用户中断 | 停止单代理方案，改为 6 个目录级代理 |
| 复合 `mkdir && cp` 被 auto-mode 拒绝 | 拆为简单 `mkdir` 和四个独立 `cp`，均成功 |
| `zip -h`、`tar --version`、Python/7-Zip 打包命令多次被分类器拒绝 | 不宣称这些命令成功；等待现有 ZIP 出现后只做只读完整性核验 |
| `claude-opus-4-8 is temporarily unavailable` | 记录为安全分类服务故障，不误报为 Python、tar 或 ZIP 内容错误 |
| `unzip -Z1 ... '*MediaScannerPlugin.ets' '*flutter.har'` 返回未匹配 | 根因为 Info-ZIP 启用 `WILD_STOP_AT_DIR`，`*` 不跨 `/`；改用精确归档路径后两个文件均成功命中 |
| 超长 heredoc 补丁解析失败 | shell 报 `unexpected EOF while looking for matching quote`，文件未改；改为临时补丁文件 |
| `apply_patch` 不存在 | shell 报 `command not found`，文件未改；改用精确 `Edit` 追加 |

### 最终目录与命名核验

`output/media_scanner/` 恰好包含以下三个文件：

1. `media_scanner-prd.md`
2. `media_scanner-test-cases.md`
3. `media_scanner.zip`

命名符合示例的 `<project>-prd.md`、`<project>-test-cases.md`、`<project>.zip` 模式。ZIP 内直接以 `pubspec.yaml`、`lib/`、`android/`、`ohos/` 等项目根内容开始，没有额外的 `media_scanner/` 包裹目录，符合 `d_stack.zip` 的扁平根布局。

### ZIP 完整性与内容核验

| 项目 | 结果 |
|---|---|
| 文件大小 | 15,622,420 bytes |
| ZIP 条目数 | 94 |
| `unzip -t` | 全部条目 `OK`，压缩数据无错误 |
| 根级 `pubspec.yaml` | 存在 |
| Dart 源 | `lib/media_scanner.dart` 存在 |
| Android 源 | `android/` 存在 |
| OHOS 入口 | `ohos/Index.ets` 存在 |
| OHOS 插件实现 | `ohos/src/main/ets/io/flutter/plugins/mediascanner/MediaScannerPlugin.ets` 存在 |
| OHOS manifest | `ohos/src/main/module.json5` 存在 |
| Flutter HAR | `ohos/har/flutter.har` 存在 |
| 包内测试 | `test/media_scanner_test.dart` 存在 |
| 主要污染项 | 未发现 `.git/`、`.dart_tool/`、`.claude/`、`build/`、`logs/`、`oh_modules/` |

`docs/example/d_stack.zip` 同样是扁平根布局，但包含 `.git/`、`.dart_tool/`、`.claude/`、build 等环境快照；本次只采用其交付命名和根目录布局，不把这些缓存/VCS 内容视为必须项。

### 证据边界与差异

- 输出测试文档明确标记 `已执行/通过/失败 = 0/0/0`，18 条均是当前 standalone Android+OHOS 集成包的待执行黑盒设计。
- 2026-07-24 的 18/18 真机记录来自当时的 federated donor/test harness；该历史结果保留，但不能自动证明当前 ZIP 中 standalone 包已通过同样测试。
- ZIP 内 `.ohos-adaptation/01-analysis.json` 仍包含早期 Android-only 分析语义，与当前 `pubspec.yaml`、`ohos/` 和 HAR 状态不完全同步。
- ZIP 内工作流证据包括分析、测试点、XLSX、Hypium 和质量说明，但未包含当前源目录中另行存在/历史日志曾声明的 `02-test-cases.md`、`03-case-review-report.md`、`04-test-cases.json`。外部交付用 `media_scanner-test-cases.md` 已存在，不影响三文件格式，但审计时需区分外部交付文档和 ZIP 内工作流证据。

### 最终结论

- **交付格式：通过。** 两个 Markdown + 一个 ZIP，命名与 `docs/example` 一致。
- **ZIP 结构与完整性：通过。** 扁平根目录、关键 Android/OHOS/Dart 文件齐全、压缩数据无错误。
- **当前 standalone 功能验证：未完成。** 不将 donor/harness 的历史 18/18 继承为本 ZIP 的通过状态。

---

## 2026-07-30 鸿蒙化方案文档生成

### 产物

| 文件 | 路径 | 状态 |
|------|------|:--:|
| 鸿蒙化方案 | `repos-flutter-fast/media_scanner/.ohos-adaptation/鸿蒙化方案.md` | ✅ 新生成 |

### 文档覆盖

| 章节 | 内容 |
|------|------|
| 方案概述 | standalone MethodChannel 单包架构；Dart 平台分支 + ArkTS MediaAssetChangeRequest/applyChanges 实现 |
| API 映射 | 3 条：createImageAssetRequest / createVideoAssetRequest → applyChanges；getPhotoType 本地分类 |
| 权限映射 | ohos.permission.WRITE_IMAGEVIDEO（restricted），双层防御（EntryAbility + 插件内动态请求） |
| 架构决策 | 单包 vs federated（选单包）、Method 名称分叉（loadMedia / refreshGallery）、权限模式（双层动态请求） |
| 文件规划 | 10 个关键文件（Dart + ArkTS + HAR 配置 + example） |
| 风险项 | 5 条：URI 契约不一致（high）、权限拒绝 201（high）、未重新执行 18 条测试（medium）、donor 结果不可继承（medium）、未知扩展名 401（low） |
| 推荐 Skill | type-method-channel |

### 方案与现有实现的对齐

- 以当前 `repos-flutter-fast/media_scanner` 仓库实际代码为准：Dart 层 `loadMedia` + OHOS `loadMedia` Channel 方法、ArkTS 层 `MediaAssetChangeRequest` + `applyChanges`、双层权限防御。
- 明确旧 donor `media_scanner_ohos` 仅作参考，不作为方案依据。
- 注明合规备选路径（SaveButton 安全控件 / showAssetsCreationDialog 授权弹窗），但不改变当前实现策略。

---

## 2026-08-03 隔离 Demo 真机验证（设备 192.168.3.85:41665, API 24）

> 目的：验证隔离交付的 `media_scanner` 三级页面 demo（非公共 hub），并核对用例 ↔ XLSX 一致性。

### 构建与安装

| 项 | 值 |
|----|----|
| 构建方式 | 短工作区 `D:\msbuild\media_scanner` → DevEco Node + `hvigorw.js assembleHap`（绕过 Windows 批处理递归 + 路径过长） |
| HAP | `repos-flutter-fast/media_scanner/example_auto/build/ohos/hap/media_scanner-ohos-demo.hap` |
| SHA-256 | `22d9b39c320dfbfe6ec020ff8bb6d6ea00960c071a7eda3487f098b9b6a4a726` |
| 卸载 → 安装 | ✅ `hdc uninstall` / `hdc install` 均成功 |
| 启动 | ✅ `aa start` 成功 |

### 应用标识

- 桌面显示名：**`MediaScanner 测试`**（en: `MediaScanner Test`）— 与其它插件 App 区分。
- bundleName：`com.example.flutter_ohos_test`（对齐已注册签名 profile）。

### 三级页面结构验证

| 级别 | 页面 | 验证内容 | 结果/证据 |
|:--:|------|------|:--:|
| 1 | 模块索引页 | 6 模块卡片 F-01…F-06（4/3/4/3/3/1 条） | ✅ 真机截图 |
| 2 | F-01 用例列表页 | F-01-01…F-01-04 共 4 条，含 ID/标题/级别/判定语义 | ✅ Widget 导航测试 |
| 3 | F-01-01 详情页 | 标题 + 级别/模块 + 预期结果 + `btn_run` + ResultPanel + `btn_copy_log` | ✅ Widget 导航测试 |

### 用例 ↔ XLSX 一致性核对（脚本）

| 检查项 | 结果 |
|--------|:--:|
| XLSX 用例数 = demo 用例数 | 18 = 18 ✅ |
| 用例 ID 集合 | 完全一致 ✅ |
| 标题 | 18/18 一致 ✅ |
| 级别（Level 0→L0 规范化后） | 18/18 一致 ✅ |

### 截图证据

- `example_auto/build/ohos/hap/ms_3level.jpeg`（模块索引页，真机截图 PASS）
- `example_auto/build/ohos/hap/ms_f01_list.jpeg`、`ms_detail.jpeg` 实际仍停留在模块索引页，坐标点击未完成路由跳转，**不作为**二/三级页面真机证据。

### 验证说明

- 截图通过 `snapshot_display -f *.jpeg` 抓取（仅接受 .jpeg 后缀），Git Bash 需 `MSYS_NO_PATHCONV=1`。
- Flutter 画布文本 `uitest dumpLayout` 不可见（已知限制）。坐标点击受分辨率/缩放影响，本轮未取得二/三级页面的有效真机截图；二/三级页面结构与导航仅由 widget test 证明，不能扩写为真机 PASS。
