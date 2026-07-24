---
name: native-library-substitution
description: 原生三方库鸿蒙替代方案查询。基于 ohpm 仓库完整数据库（2678 条映射记录），支持安卓库 → 鸿蒙替代方案查询。**场景 4 完整工作流模式**：Planning Agent 可直接调用执行多级检索（本地 → ohpm 仓库 → 全网搜索）+ 系统API补充 + 主方案自动选择 + 风险标记，返回标准 `native_dependency_mapping` + `risk_items` 格式。触发关键词：原生库、三方库、ohpm、替代方案、依赖替代、库替换、native dependency、Android库、iOS库、鸿蒙库。
---

# Native Library Substitution Skill

本 Skill 维护 ohpm 仓库的完整三方库映射数据（2678 条映射，852 个唯一安卓库，2537 个唯一鸿蒙包）。

## 数据文件

| 文件 | 用途 | 数据规模 |
|------|------|---------|
| [references/native-library-substitution.json](references/native-library-substitution.json) | 单一映射表（JSON） | 2678 条映射记录 |
| [references/native-library-substitution.md](references/native-library-substitution.md) | 可读表格（按分类整理） | 按 source_type 和 category 分组 |

## 数据结构说明

### 单一扁平映射表（mappings）

每条记录包含 **15 个字段**，涵盖安卓库和鸿蒙包的完整信息：

| 字段 | 类型 | 说明 |
|------|------|------|
| `android_lib` | string/null | 安卓库标识符（如 `com.tencent:mmkv`），鸿蒙原生库为 `null` |
| `android_platform` | string | `android` / `ios` / `ohos_native` |
| `android_description` | string/null | 安卓库功能描述 |
| `ohpm_package` | string | 鸿蒙包名（如 `@tencent/mmkv`） |
| `ohpm_org` | string | ohpm 组织名 |
| `ohpm_description` | string | 鸿蒙包功能描述 |
| `ohpm_keywords` | array | 鸿蒙包关键词列表 |
| `ohpm_repo_url` | string | 鸿蒙包源码仓库地址 |
| `ohpm_homepage` | string | 鸿蒙包文档主页 |
| `source_type` | string | `安卓鸿蒙化库` / `TS/JS迁移库` / `鸿蒙原生库` / `C++/C鸿蒙化库` |
| `source_availability` | string | `COMMERCIAL_PUBLIC`（闭源） / `open_source`（开源） |
| `confidence` | string | `high` / `medium` / `low` |
| `install_command` | string | `ohpm install @xxx/yyy` |
| `category` | string | `media` / `network` / `notification` / `location` / `payment` / `auth` / `storage` / `ui` / `utils` / `other` |
| `inference_reason` | string | 映射关系说明 |

### 记录示例

**有安卓库的映射**：
```json
{
  "android_lib": "com.tencent:mmkv",
  "android_platform": "android",
  "android_description": "腾讯MMKV键值存储",
  "ohpm_package": "@tencent/mmkv",
  "ohpm_org": "tencent",
  "ohpm_description": "MMKV鸿蒙版键值存储组件",
  "ohpm_keywords": ["storage", "mmkv", "key-value"],
  "ohpm_repo_url": "https://gitee.com/openharmony-sig/ohos_mmkv",
  "ohpm_homepage": "https://...",
  "source_type": "安卓鸿蒙化库",
  "source_availability": "COMMERCIAL_PUBLIC",
  "confidence": "high",
  "install_command": "ohpm install @tencent/mmkv",
  "category": "storage",
  "inference_reason": "基于官方工作簿映射，鸿蒙状态：有鸿蒙版"
}
```

**鸿蒙原生库（无安卓库）**：
```json
{
  "android_lib": null,
  "android_platform": "ohos_native",
  "android_description": null,
  "ohpm_package": "@pura/harmony-utils",
  "ohpm_org": "pura",
  "ohpm_description": "一款功能丰富且极易上手的HarmonyOS工具库...",
  "ohpm_keywords": ["工具类", "图片", "文件"],
  "ohpm_repo_url": "https://gitee.com/tongyuyan/harmony-utils",
  "ohpm_homepage": "https://gitee.com/tongyuyan",
  "source_type": "鸿蒙原生库",
  "source_availability": "open_source",
  "confidence": "low",
  "install_command": "ohpm install @pura/harmony-utils",
  "category": "utils",
  "inference_reason": "鸿蒙原生开发，无对应安卓库"
}
```

## 数据统计

### 总览

| 统计项 | 数量 |
|--------|------|
| 总映射数 | 2678 |
| 有安卓库的映射 | 1005 |
| 鸿蒙原生库（无安卓库） | 1673 |
| 唯一安卓库数 | 852 |
| 唯一鸿蒙包数 | 2537 |

### source_availability 分布

| 状态 | 数量 | 说明 |
|------|------|------|
| COMMERCIAL_PUBLIC | 175 | 闭源商业SDK（来自工作簿） |
| open_source | 2503 | 开源库 |

### source_type 分布

| 来源类型 | 数量 | 说明 |
|----------|------|------|
| 鸿蒙原生库 | 1321 | 鸿蒙原生开发，无对应安卓库 |
| TS/JS迁移库 | 790 | 从 npm 生态迁移 |
| 安卓鸿蒙化库 | 432 | 直接从安卓库移植 |
| C++/C鸿蒙化库 | 133 | 从 C++ 生态迁移 |

### category 分布

| Category | 数量 | 说明 |
|----------|------|------|
| other | 1527 | 其他 |
| ui | 370 | UI组件 |
| utils | 213 | 工具类 |
| network | 209 | 网络请求 |
| media | 89 | 音视频 |
| notification | 60 | 推送通知 |
| storage | 60 | 存储文件 |
| auth | 61 | 登录认证 |
| location | 50 | 地图定位 |
| analytics | 17 | 统计分析 |
| payment | 16 | 支付 |
| security | 4 | 安全加密 |
| im | 1 | 即时通讯 |
| social | 1 | 社交分享 |

## 检索流程

### 场景 1：查找安卓库的鸿蒙替代方案

**查询目标**：Android/iOS 原生库 → 鸿蒙替代方案

**检索流程**：
1. 在 `mappings` 中搜索 `android_lib` 字段匹配原生库标识符
2. 返回所有匹配的记录（按 `confidence` 排序）
3. 每条记录包含完整的鸿蒙包信息

**示例检索代码**：
```python
# 查询 com.tencent:mmkv 的所有鸿蒙替代方案
results = [m for m in mappings if m['android_lib'] == 'com.tencent:mmkv']
```

### 场景 2：查询鸿蒙包详情（反向查询）

**查询目标**：根据鸿蒙包名查询详细信息

**检索流程**：
1. 在 `mappings` 中搜索 `ohpm_package` 字段
2. 返回所有包含该鸿蒙包的记录（可能对应多个安卓库）

**示例检索代码**：
```python
# 查询 @tencent/mmkv 的所有映射记录
results = [m for m in mappings if m['ohpm_package'] == '@tencent/mmkv']
```

### 场景 3：按分类筛选

**查询目标**：筛选特定 category 或 source_type 的映射

**检索流程**：
```python
# 筛选所有闭源库
closed_source = [m for m in mappings if m['source_availability'] == 'COMMERCIAL_PUBLIC']

# 筛选所有音视频相关库
media_libs = [m for m in mappings if m['category'] == 'media']

# 筛选所有安卓鸿蒙化库
android_adapted = [m for m in mappings if m['source_type'] == '安卓鸿蒙化库']

# 筛选鸿蒙原生库（无安卓库）
native_libs = [m for m in mappings if m['android_platform'] == 'ohos_native']
```

### 场景 4：完整工作流模式（Planning Agent 推荐）

**查询目标**：原生依赖列表 → 完整的鸿蒙替代方案 + 风险标记

**适用场景**：Planning 阶段批量处理原生依赖，需要：
- 多级检索（本地 → ohpm 仓库 → 全网搜索）
- 系统API补充查询
- 主方案自动选择
- 无方案风险自动标记
- 辔回标准 `native_dependency_mapping` + `risk_items` 格式

---

#### 4.1 输入格式

从 `01-analysis.json` 的 `native_dependencies` 字段读取：

```json
{
  "android": [
    { "name": "OkHttp", "identifier": "com.squareup.okhttp3:okhttp", "usage": "网络请求" }
  ],
  "ios": [...],
  "cpp": [...]
}
```

#### 4.2 完整检索流程（命中即停）

**优先级递减**，每级命中后继续执行后续处理步骤：

| 优先级 | 检索方式 | 数据源 | 命中条件 |
|--------|----------|--------|----------|
| 1 | 本地映射表查询 | `mappings`（本地） | `android_lib` 精确匹配或模糊匹配 |
| 2 | ohpm 仓库在线搜索 | `https://ohpm.harmonyos.com/#/cn/search?keyword={库名}` | 返回结果非空 |
| 3 | 全网 Web Search | `{库名} ohpm HarmonyOS 替代` 或 `{库名} HarmonyOS SDK` | 返回结果非空 |

**实现方式**：

1. **本地检索（优先级 1）**：在 `mappings` 中搜索 `android_lib` 字段
2. **ohpm 仓库在线搜索（优先级 2）**：
   ```
   WebFetch: https://ohpm.harmonyos.com/#/cn/search?keyword={库名}
   解析搜索结果页面，提取 ohpm 包名
   ```
3. **全网 Web Search（优先级 3）**：
   ```
   搜索关键词："{库名} ohpm HarmonyOS 替代" 或 "{库名} HarmonyOS SDK API"
   ```

#### 4.3 系统API补充查询（必须执行）

> **核心规则**：无论是否找到 ohpm 包，都必须查找系统 API 作为补充备选。

**查询方式**：调用 Skill 
`harmonyos-docs-lookup`
`harmonyos-sdk-api-lookup`
查找 {原生库名} {功能描述} 对应的鸿蒙系统API模块名。

**返回结果处理**：
- 找到系统API：记录为 `alternative_solution`
- 未找到系统API：`alternative_solution: null`

#### 4.4 主方案选择决策（三方库优先）

根据检索结果，按以下优先级选择主方案：

| 优先级 | source_type | confidence | 主方案类型 | 说明 |
|--------|-------------|------------|------------|------|
| 1 | `安卓鸿蒙化库` | `high` | `ohpm_package` | 直接移植，API 设计一致 |
| 2 | `安卓鸿蒙化库` | `medium` | `ohpm_package` | 直接移植，部分差异 |
| 3 | `TS/JS迁移库` | `medium` | `ohpm_package` | npm 生态迁移，需适配 |
| 4 | `C++/C鸿蒙化库` | `medium` | `ohpm_package` | C++ 生态迁移 |
| 5 | `鸿蒙原生库` | `low` | `ohpm_package` | 鸿蒙原生，无对应安卓库 |
| 6 | 仅系统API | - | `system_api` | 无 ohpm 包，基于系统API实现 |
| 7 | 无任何方案 | - | `not_available` | 标记高风险 |

**决策逻辑**：
```
if (找到 ohpm 包) {
  选择 confidence 最高的 ohpm 包作为主方案
  ohos_solution_type = "ohpm_package"
} else if (找到系统API) {
  ohos_solution_type = "system_api"
  ohos_module = 系统API模块名
} else {
  ohos_solution_type = "not_available"
  // 在 risk_items 中标记
}
```

#### 4.5 输出格式（Planning Agent 写入 `02-planning.json`）

**native_dependency_mapping 条目格式**：

```json
{
  "original_platform": "android | ios | cpp",
  "original_lib": "原生库标识符（如 com.squareup.okhttp3:okhttp）",
  "original_usage": "在插件中的用途",
  "ohos_solution_type": "ohpm_package | system_api | custom_implementation | not_available",
  "ohos_package": "ohpm 包名（ohpm_package 时填写）| null",
  "ohos_module": "@ohos.xxx（system_api 时填写）| null",
  "install_command": "ohpm install xxx（ohpm_package 时填写）| null",
  "confidence": "high | medium | low",
  "notes": "说明（替代方案的能力覆盖度、已知限制、备选系统API、source_type、source_availability 等摘要）"
}
```

**完整输出示例**：

```json
{
  "native_dependency_mapping": [
    {
      "original_platform": "android",
      "original_lib": "com.squareup.okhttp3:okhttp",
      "original_usage": "HTTP 网络请求",
      "ohos_solution_type": "ohpm_package",
      "ohos_package": "@ohos/axios",
      "install_command": "ohpm install @ohos/axios",
      "confidence": "medium",
      "notes": "TS/JS迁移库；备选系统 API: @ohos.net.http；source_availability: open_source"
    },
    {
      "original_platform": "android",
      "original_lib": "com.tencent:mmkv",
      "original_usage": "键值存储",
      "ohos_solution_type": "ohpm_package",
      "ohos_package": "@tencent/mmkv",
      "install_command": "ohpm install @tencent/mmkv",
      "confidence": "high",
      "notes": "安卓鸿蒙化库，直接移植；source_availability: COMMERCIAL_PUBLIC（闭源）"
    },
    {
      "original_platform": "cpp",
      "original_lib": "openssl",
      "original_usage": "加密解密",
      "ohos_solution_type": "system_api",
      "ohos_module": "@ohos.security.cryptoFramework",
      "install_command": null,
      "confidence": "high",
      "notes": "无 ohpm 包，使用系统加密框架"
    }
  ],
  "risk_items": [
    {
      "description": "原生库 alipay（android）无鸿蒙替代方案或系统API",
      "severity": "high",
      "mitigation": "评估是否可移除该功能，或使用华为 IAP Kit 替代；阻塞级别：partial"
    }
  ]
}
```

#### 4.6 无方案风险自动标记

当 `ohos_solution_type: "not_available"` 时，自动生成 `risk_items` 条目。

```json
{
  "description": "原生库 {库名}（{平台}）无鸿蒙替代方案或系统API",
  "severity": "high",
  "mitigation": "评估是否可移除该功能，或使用其他鸿蒙渠道；阻塞级别：partial | full"
}
```

## 来源分类说明

| 分类 | 数量 | 占比 | 含义 | 置信度 | source_availability |
|------|------|------|------|--------|---------------------|
| `鸿蒙原生库` | 1321 | 49.4% | 鸿蒙原生开发，无对应安卓库 | low | `open_source` |
| `TS/JS迁移库` | 790 | 29.5% | 从 npm 生态迁移 | medium | `open_source` |
| `安卓鸿蒙化库` | 432 | 16.1% | 直接从安卓库移植 | high | 部分闭源（175条） |
| `C++/C鸿蒙化库` | 133 | 5.0% | 从 C++ 生态迁移 | medium | `open_source` |

## 常见原生库映射参考

| 原生库 | 鸿蒙替代方案 | 来源类型 | 置信度 | 开闭源 | 安装命令 |
|--------|-------------|---------|--------|--------|----------|
| OkHttp | @ohos/axios | TS/JS迁移库 | medium | open_source | `ohpm install @ohos/axios` |
| Retrofit | @ohos/retrofit | 安卓鸿蒙化库 | high | open_source | `ohpm install @ohos/retrofit` |
| MMKV | @tencent/mmkv | 安卓鸿蒙化库 | high | COMMERCIAL_PUBLIC | `ohpm install @tencent/mmkv` |
| Glide | @ohos/imageknife | 安卓鸿蒙化库 | high | open_source | `ohpm install @ohos/imageknife` |
| ARouter | @ohos/arouter | 安卓鸿蒙化库 | high | open_source | `ohpm install @ohos/arouter` |
| 阿里云推送 | @aliyun/push | 安卓鸿蒙化库 | high | COMMERCIAL_PUBLIC | `ohpm install @aliyun/push` |

## 数据完整性保证

- ✅ **所有数据完整保留**（2678 条映射记录）
- ✅ **新增 source_availability 字段**（175 个闭源商业SDK）
- ✅ **单一扁平结构**：每条记录包含安卓库 + 鸿蒙包完整信息
- ✅ **支持双向查询**：安卓库 → 鸿蒙包，鸿蒙包 → 安卓库

## 数据更新说明

- **数据版本**：v3.0.0（结构重构为单一映射表）
- **更新日期**：2026-04-22
- **本次重构**：
  - 合并 ohpm_libraries 和 native_library_index 为单一扁平映射表
  - 每条记录包含 15 个字段（安卓库 + 鸿蒙包完整信息）
  - 鸿蒙原生库（无安卓库）保留，标记为 `ohos_native`
  - source_availability 字段：175 条闭源库 + 2503 条开源库
  - 简化检索逻辑：单表查询替代双向索引