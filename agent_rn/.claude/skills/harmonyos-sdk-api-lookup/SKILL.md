---
name: harmonyos-sdk-api-lookup
description: Search HarmonyOS API reference Markdown files in api-references to find modules, API signatures, types, permissions, system capabilities, examples, and feature-level implementation guidance. Use when looking up HarmonyOS/OpenHarmony/HMS APIs, ArkTS APIs, Kit documentation, @ohos or @hms modules, system capabilities, permissions, or when adapting code to HarmonyOS. The api-references file names include Kit names, so always search file names first before content.
---

# HarmonyOS SDK API Lookup

在本 skill 目录下的 `api-references/` 中搜索 HarmonyOS API 参考 Markdown 文档，支持两种查询模式：

1. **API 查询** - 查找具体 API 的签名、类型、权限、系统能力、版本等信息
2. **功能查询** - 根据功能需求，定位相关 Kit 和模块，组合完整实现方案并给出代码示例

## API 参考信息

- **主路径**: 本 skill 目录下的 `api-references/`
- **规模**: 4000+ 个 `.md` 文件
- **文件名特性**: 文件名自带领域、Kit 名称、API 类型、模块名和页面主题，例如：
  - `媒体-Camera Kit（相机服务）-ArkTS API-@ohos.multimedia.camera (相机管理)-Interface (CameraManager).md`
  - `媒体-Audio Kit（音频服务）-ArkTS API-@ohos.multimedia.audio (音频管理)-Functions.md`
  - `系统-网络-Connectivity Kit（短距通信服务）-ArkTS API-@ohos.wifiManager (WLAN).md`

## 目录结构

```
api-references/
├── ... ArkTS API / C API / 错误码 / 组件 / 指南页面
```

## 核心搜索流程（文件名优先）

**始终先搜索文件名，再读取候选 Markdown；只在候选过多或文件名无法定位时做全文搜索。**

### 第一步：拆分查询关键词

根据用户问题提取 2 到 5 类关键词：

| 关键词类型 | 示例 |
|-----------|------|
| Kit 名称 | `Camera Kit`, `Audio Kit`, `Connectivity Kit`, `Ability Kit` |
| 模块名 | `@ohos.multimedia.camera`, `@ohos.net.http`, `@hms.scan` |
| API / 类型名 | `CameraManager`, `createCameraInput`, `HttpRequest`, `PhotoOutput` |
| 中文功能词 | `相机`, `拍照`, `网络`, `定位`, `剪贴板`, `权限` |
| API 类型 | `ArkTS API`, `C API`, `Interface`, `Functions`, `Enums`, `错误码` |

### 第二步：按文件名缩小候选集

列出文件，再对文件名做二次过滤：

文件名里已经包含 Kit 名称，所以不需要读取单独的 Kit 索引。命中多个文件时，优先读取最精确的页面：

1. 具体 `Interface (Xxx).md` / `Class (Xxx).md` / `Functions.md`
2. 具体模块页面：`@ohos.xxx (...).md`
3. `Enums.md` / `Types.md` / `Interfaces (其他).md`
4. 错误码、指南、概览页面

### 第三步：检查大小并读取目标 Markdown

读取候选文档前，先检查文件大小和行数，避免把超大 Markdown 一次性读入上下文：

```powershell
Get-Item "harmonyos-sdk-api-lookup/api-references/目标文件.md" | Select-Object Length,FullName
(Get-Content "harmonyos-sdk-api-lookup/api-references/目标文件.md" | Measure-Object -Line).Lines
```

按以下规则读取：

1. **小文件**：小于 3000 行，可以整文件读取。
2. **大文件**：达到 3000 行以上，禁止整文件读取；必须先搜索 API 名、类型名、标题或关键词。用搜索结果定位后读取邻近上下文，多次少量读取。

## 常用领域定位提示

| 功能领域 | 优先文件名关键词 |
|---------|----------------|
| 网络/HTTP/WebSocket | `网络`, `Connectivity Kit`, `Network Kit`, `@ohos.net`, `http`, `webSocket` |
| 文件/存储 | `文件`, `Core File Kit`, `ArkData`, `file`, `fs`, `picker` |
| 相机/拍照 | `Camera Kit`, `相机`, `@ohos.multimedia.camera` |
| 音频/音效 | `Audio Kit`, `音频`, `@ohos.multimedia.audio` |
| 视频/播放/录制 | `Media Kit`, `媒体`, `AVPlayer`, `AVRecorder` |
| 图片处理 | `Image Kit`, `图片`, `image` |
| 蓝牙/WiFi/NFC | `Connectivity Kit`, `蓝牙`, `WLAN`, `NFC`, `wifi`, `bluetooth` |
| 定位/GPS | `Location Kit`, `位置`, `定位`, `geoLocationManager` |
| 传感器 | `Sensor Service Kit`, `传感器`, `sensor` |
| 通知 | `Notification Kit`, `通知`, `notification` |
| 加密/安全 | `Crypto Architecture Kit`, `Universal Keystore Kit`, `加密`, `密钥` |
| 设备信息/电池/振动 | `Basic Services Kit`, `deviceInfo`, `batteryInfo`, `vibrator` |
| 剪贴板 | `Basic Services Kit`, `pasteboard`, `剪贴板` |
| UI 组件 | `ArkUI`, `组件`, 组件名 |
| Web/WebView | `ArkWeb`, `Web`, `webview`, `@ohos.web` |
| 后台任务 | `Background Tasks Kit`, `后台任务`, `backgroundTaskManager` |
| 应用生命周期 | `Ability Kit`, `Ability`, `Want`, `UIAbility` |
| 扫码/二维码 | `Scan Kit`, `扫码`, `二维码`, `@hms.scan` |
| 地图 | `Map Kit`, `地图`, `@hms.map` |
| 推送 | `Push Kit`, `推送`, `@hms.push` |
| 支付/内购 | `IAP Kit`, `Payment Kit`, `支付`, `内购` |
| 语音识别/合成 | `Speech Kit`, `Core Speech Kit`, `语音` |
| OCR/图像识别 | `Vision Kit`, `Core Vision Kit`, `OCR`, `图像识别` |

**关键类型定义**:
（列出代码中用到的 interface / enum 定义摘要）

**注意事项**:
- 版本要求、平台限制、权限申请、常见错误码等
```

## 功能查询的分析技巧

分析 API 关系的方法：

- **返回值 -> 参数链**: 方法 A 返回 `TypeX`，方法 B 接收 `TypeX` 作为参数，则 A 的输出可能是 B 的输入
- **配置对象模式**: 一个功能通常有 `XxxConfig` / `XxxOptions` 接口，先构造配置再调用
- **生命周期模式**: 有 `create/open` + `start/execute` + `stop/close/release` 时，需要完整管理资源
- **回调/监听模式**: 有 `on(event, callback)` / `off(event)` 时，注册后需在适当时机取消
- **错误码页面**: 同一 Kit 下通常有独立错误码 Markdown，功能方案中需要引用常见错误码

## 注意事项

- **绝不猜测 API 签名**，只返回 `api-references/` Markdown 中实际存在的定义
- 代码示例中的所有 API 调用**必须**与文档签名严格一致
- 同一功能有 Promise 和 callback 两种形式时，优先返回 Promise 形式
- 标记为废弃的 API 需注明替代方案
