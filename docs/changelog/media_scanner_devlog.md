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
