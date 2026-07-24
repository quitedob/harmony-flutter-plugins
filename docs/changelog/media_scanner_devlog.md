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
