---
name: harmonyos-docs-search
description: |
  Search HarmonyOS official developer documentation across 3 categories: guides, best practices, and architecture guides.
  Uses local URL map files (8,478 links total) for zero-cost matching first, then Firecrawl scrape/search as fallback.
  Use when looking up HarmonyOS development guides, permission configuration, Kit tutorials, best practices, architecture patterns, or any official HarmonyOS documentation.
  Triggers on: HarmonyOS docs, HarmonyOS guide, how to use XXX on HarmonyOS, HarmonyOS permission, HarmonyOS best practice, HarmonyOS architecture, Kit development guide, ArkTS development guide, official documentation lookup.
  Do NOT use for API signature/interface lookup — use harmonyos-sdk-api-lookup skill instead.
---

# HarmonyOS 官方文档搜索

在华为 HarmonyOS 官方开发者文档网站中搜索开发指南、使用说明、代码示例、最佳实践和架构指导。

## 能力边界

**能提供的**：
- HarmonyOS 官方开发指南（详细用法、参数说明、完整代码示例）
- ArkTS/ETS 开发最佳实践和完整工作流
- 系统能力（SystemCapability）的详细说明与使用限制
- 权限配置的完整指南（申请流程、声明方式）
- 各 Kit 的官方开发指导（使用场景、完整 Demo、注意事项）
- 行业架构方案与参考实现
- 性能优化与工程化最佳实践

**不能提供的**：
- API 接口签名、参数类型、错误码等精确查询 → 应使用 **harmonyos-sdk-api-lookup** skill
- 本地 SDK `.d.ts` 精确签名查询 → 应使用 **harmonyos-sdk-api-lookup** skill

## 三类文档与 Map 文件

本 skill 目录下的 `web-map/` 中预存了 3 个 URL 地图文件（另有 1 个 API 参考 map 不在本 skill 范围内），覆盖华为开发者文档的 3 大分区：

| 分类 | 文件名 | 链接数 | 基础 URL | 内容 |
|------|--------|--------|----------|------|
| **开发指南** | `developer.huawei.com_consumer_cn_doc_harmonyos-guides_.2026-03-08T12_05_26.707Z.json` | 4992 | `harmonyos-guides` | 各 Kit 开发指导、ArkTS 语言指南、应用模型、安全权限、系统服务 |
| **最佳实践** | `developer.huawei.com_consumer_cn_doc_best-practices_.2026-03-08T12_07_39.055Z.json` | 436 | `best-practices` | 性能优化、工程化实践、三方库编译、典型场景方案 |
| **架构指南** | `developer.huawei.com_consumer_cn_doc_architecture-guides_.2026-03-08T12_10_14.829Z.json` | 3050 | `architecture-guides` | 行业解决方案、架构参考、常见问题 |

> **注意**：API 接口签名、参数类型、错误码等查询不属于本 skill 范围，请使用 **harmonyos-sdk-api-lookup** skill。

Map 文件路径（相对于本 SKILL.md）：`web-map/<filename>.json`

**Map 文件结构**：
```json
{
  "links": [
    {
      "url": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ble-development-guide",
      "title": "查找设备-低功耗蓝牙-蓝牙-Connectivity Kit...",
      "description": "..."
    },
    {
      "url": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/connectivity-kit-intro"
    }
  ]
}
```

多数链接仅有 URL（无 title/description），但 URL slug 本身包含有意义的英文关键词（如 `ble-development-guide`、`camera-shooting-guide`、`network-http-request`）。

## 搜索策略（三层递进）

### 策略一：本地 URL Map 匹配（零 credit，优先使用）

用 Grep 在 map 文件中搜索 URL slug 和 title/description，定位相关页面。

**根据查询意图选择要搜索的 map 文件**：

| 查询意图 | 优先搜索的 map 文件 |
|----------|-------------------|
| 如何使用某功能 / Kit 开发指导 | **guides** |
| 性能优化、工程实践 | **best-practices** |
| 行业方案、架构设计 | **architecture-guides** |
| 不确定 | 先搜 **guides**，无结果再搜其他 |

**搜索方法**：

```
# 搜索 URL slug 中的英文关键词（大部分链接只有 URL，这是主要匹配手段）
Grep: pattern="bluetooth|ble|gatt" path="web-map/developer.huawei.com_consumer_cn_doc_harmonyos-guides_...json"

# 搜索 title/description 中的中文关键词（少量链接有 title）
Grep: pattern="蓝牙|低功耗" path="web-map/developer.huawei.com_consumer_cn_doc_harmonyos-guides_...json"
```

**必须同时搜索中英文关键词**，因为 URL slug 是英文、title/description 是中文。

**URL slug 关键词映射参考**：

| 功能领域 | URL slug 关键词 |
|----------|-----------------|
| 蓝牙 | `ble`, `bluetooth`, `gatt`, `connectivity` |
| 相机 | `camera`, `shooting`, `camerakit` |
| 网络 | `network`, `http`, `socket`, `websocket` |
| 文件 | `file`, `filekit`, `picker` |
| 位置 | `location`, `geo`, `gnss` |
| 传感器 | `sensor`, `vibrator`, `accelerometer` |
| 通知 | `notification`, `notificationkit` |
| 权限 | `permission`, `access-control`, `atm` |
| 加密 | `crypto`, `cipher`, `huks` |
| 音视频 | `media`, `audio`, `video`, `player` |
| 存储 | `data`, `rdb`, `preferences`, `kvstore` |
| NFC | `nfc`, `tag`, `cardemulation` |
| WiFi | `wifi`, `wlan`, `hotspot` |
| Web 组件 | `web-component`, `arkweb`, `webview` |
| UI 组件 | `arkts-ui`, `component` |
| 后台任务 | `background-task`, `work-scheduler` |
| 剪贴板 | `pasteboard`, `clipboard` |
| 设备信息 | `device-info`, `system-capability` |

**关键词构造技巧**：

| 查询场景 | URL slug 关键词 | 中文关键词 |
|----------|----------------|-----------|
| 网络请求/HTTP | `http`, `network`, `request` | `HTTP请求`, `网络` |
| 相机拍照 | `camera`, `shooting`, `photo` | `拍照`, `相机` |
| 文件读写 | `file`, `fs`, `picker` | `文件管理`, `文件读写` |
| 蓝牙通信 | `ble`, `bluetooth`, `gatt` | `蓝牙`, `低功耗` |
| 地理位置 | `location`, `geo`, `gnss` | `定位`, `位置` |
| 通知推送 | `notification` | `通知`, `推送` |
| 传感器 | `sensor`, `vibrator` | `传感器`, `振动` |
| 数据存储 | `preferences`, `rdb`, `kvstore` | `数据存储`, `持久化` |
| 权限管理 | `permission`, `access-control` | `权限`, `访问控制` |
| 加解密 | `crypto`, `cipher`, `huks` | `加密`, `解密` |

从搜索结果中提取匹配的 URL，然后用策略二抓取内容。

### 策略二：Firecrawl 精准抓取（1 credit/页）

对策略一找到的 URL，使用 `firecrawl scrape` 获取完整内容：

```bash
firecrawl scrape "<URL>" --only-main-content
```

通常只需抓取 **1-2 个最相关的页面**，即可获得足够信息。

### 策略三：Firecrawl 在线搜索（兜底，仅当本地 map 无法匹配时使用）

```bash
firecrawl search "site:developer.huawei.com/consumer/cn/doc/harmonyos-guides <关键词>" --scrape --limit 2
```

根据查询意图替换 site 范围：
- 开发指南：`site:developer.huawei.com/consumer/cn/doc/harmonyos-guides`
- 最佳实践：`site:developer.huawei.com/consumer/cn/doc/best-practices`
- 架构指南：`site:developer.huawei.com/consumer/cn/doc/architecture-guides`

## 完整搜索流程

1. **分析查询意图** — 理解需要什么信息（开发指导？权限配置？代码示例？性能优化？架构方案？）
2. **确定文档分类** — 选择要搜索的 map 文件（可搜多个）
3. **构造搜索关键词** — 中英文各准备多个同义词
4. **策略一：本地搜索** — 在对应 map 文件中 Grep 关键词，收集匹配的 URL
5. **筛选 URL** — 从匹配结果中挑选 1-2 个最相关的 URL（根据 slug 语义判断）
6. **策略二：抓取内容** — 对选中的 URL 执行 `firecrawl scrape --only-main-content`
7. **策略三（仅兜底）** — 本地 map 无匹配时才使用 `firecrawl search`
8. **提取关键信息** — 从内容中提取代码示例、使用方法、权限配置等

## Credit 消耗预算

| 操作 | Credit | 说明 |
|------|--------|------|
| 本地 map Grep | **0** | 纯本地文件搜索 |
| `firecrawl scrape` | **1** | 抓取单个页面 |
| `firecrawl search` | **1** | 在线搜索（不含 scrape） |
| `firecrawl search --scrape` | **1 + N** | 搜索并抓取 N 个结果页 |

**目标**：每次查询消耗不超过 **2 个 credit**（本地定位 + scrape 1-2 页）。

## 返回格式

```
## HarmonyOS 官方文档检索结果

### 查询: [原始查询内容]
### 搜索方式: 本地 map 匹配 / Firecrawl 在线搜索
### 文档分类: 开发指南 / 最佳实践 / 架构指南
### 匹配 URL 数: [本地 map 中匹配到的 URL 数量]

---

### 1. [文档标题]
**URL**: https://developer.huawei.com/consumer/cn/doc/...
**分类**: 开发指南 / 最佳实践 / 架构指南
**相关度**: 高/中/低

**核心内容摘要**:
- API 使用方式和调用流程
- 必要的权限声明
- 系统能力要求（@syscap）
- 版本要求（@since）

**关键代码示例**:
（从文档中提取的核心代码）

**权限与配置**:
- 所需权限: ohos.permission.XXX
- module.json5 配置项: ...
- 系统能力: SystemCapability.Xxx.Xxx

---

### 2. [文档标题]
...
```

最多返回 **3 条**最相关的结果。对每条结果，重点提取：
1. **完整的代码示例**（最关键）
2. **API 调用流程**（初始化 → 配置 → 调用 → 释放）
3. **权限和配置要求**
4. **注意事项和限制**

总返回内容不超过 **3000 字**。

## 注意事项

- 只搜索 `developer.huawei.com/consumer/cn/doc/` 域下的内容
- 返回的代码示例必须来自官方文档原文，不要自行编造
- 如果搜索无结果，明确说明并建议尝试的替代搜索词
- **始终优先使用本地 map 文件定位 URL**，最大程度节约 Firecrawl credit
- 中英文关键词结合搜索，URL slug 用英文、title 用中文
- 跨分类搜索时，每个分类独立搜索并标注来源
