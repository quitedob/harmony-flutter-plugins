# 阶段 1：`01-analysis.json` + `01-analysis-report.md` + `01-analysis-prd.md`

analysis 阶段输出三个文件：
- `01-analysis.json`：结构化数据，供后续 Agent 消费
- `01-analysis-report.md`：人类可读的 Markdown 报告，供管理面板展示和人工审阅
- `01-analysis-prd.md`：需求规格文档（PRD），详细描述模块功能规格和 API 规格，作为后续鸿蒙适配的需求基准

> PRD 的文档结构和编写指南见 `01-analysis-prd.md` 说明文档。

## JSON 产物结构

```json
{
  "plugin_name": "string",
  "plugin_version": "string",
  "description": "string — 模块功能一句话描述",

  "ohos_readiness": {
    "status": "not_adapted | partially_adapted | fully_adapted",
    "in_repo_harmony_dir": "boolean — 仓库内是否有 harmony/ 目录",
    "in_package_json_platforms": "boolean — package.json 中是否声明了 ohos/harmony 平台",
    "in_reference_index": "boolean — 是否在已适配索引中找到",
    "reference_url": "string | null — 已适配版本的仓库 URL",
    "in_local_repos": "boolean — repos/ 下是否有已适配的同名模块",
    "local_repo_name": "string | null — 本地已适配仓库的目录名",
    "adapted_library_lookup": "object | null — Task(sub-rn-adapted-library) 的步骤追踪与结果，见 json-schema OhosReadiness",
    "notes": "string | null — 补充说明"
  },

  "plugin_type": "js_only | cpp_turbo_module | turbo_module | fabric_component | native_mixed",
  "plugin_architecture": "standalone | monorepo",

  "monorepo_packages": [
    {
      "name": "string — 子包名称",
      "path": "string — 相对路径",
      "type": "string — 子包类型（同 plugin_type 取值）",
      "is_main": "boolean — 是否为主包"
    }
  ],

  "communication_patterns": ["turbo_module", "fabric_component", "cpp_turbo_module"],

  "turbo_modules": [
    {
      "type": "TurboModule",
      "spec_name": "string — TurboModule spec 名称，必须精确",
      "methods": [
        {
          "name": "string — 方法名",
          "args": "object — 参数结构描述",
          "return_type": "string — 返回值类型"
        }
      ]
    }
  ],

  "fabric_components": [
    {
      "component_name": "string — Fabric Component 名称",
      "js_component": "string — JS/TS 层使用的组件名"
    }
  ],

  "cpp_bindings": [
    {
      "function_name": "string — native 函数名",
      "signature": "string — 函数签名",
      "source_file": "string — 定义所在的 C/C++ 文件"
    }
  ],

  "functionality": {
    "summary": "string — 模块解决什么问题",
    "core_features": [
      {
        "name": "string — 功能名称",
        "description": "string — 功能描述",
        "related_methods": ["string — 关联的 TurboModule 方法名"],
        "android_apis": ["string — Android 系统 API"],
        "ios_apis": ["string — iOS 系统 API/框架"]
      }
    ]
  },

  "native_dependencies": {
    "android": ["string — group:artifact:version"],
    "ios": ["string — Pod 名称"],
    "cpp": ["string — C/C++ 库名（仅 C++ TurboModule 类型）"]
  },

  "rn_dependencies": [
    {
      "name": "string — 包名",
      "version_constraint": "string — 版本约束",
      "is_native_module": "boolean — 是否含平台原生代码",
      "ohos_status": "adapted | not_adapted | unknown | not_needed",
      "reference_url": "string | null — 已适配版本 URL",
      "is_blocking": "boolean — 是否为阻塞性依赖",
      "notes": "string | null"
    }
  ],

  "permissions": {
    "android": ["string — android.permission.XXX"],
    "ios": ["string — NSXxxUsageDescription"]
  },

  "harmony_package_class": "string | null — harmony/ 中声明的 Package 类名称",

  "supported_platforms": ["android", "ios", "web", "..."],

  "platform_checks": [
    {
      "file": "string — 文件路径",
      "line_range": "string — 行号范围（如 '42-45'）",
      "check_type": "string — Platform.OS === 'android' | Platform.select | conditional_require | 等",
      "code_snippet": "string — 相关代码片段"
    }
  ],

  "has_example": "boolean",
  "example_deps": [
    {
      "name": "string — 依赖名",
      "ohos_status": "adapted | not_adapted | unknown | not_needed",
      "notes": "string | null"
    }
  ],

  "complexity_assessment": {
    "level": "low | medium | high | very_high",
    "factors": {
      "turbo_module_method_count": "number",
      "native_dependency_count": "number",
      "blocking_deps_count": "number",
      "communication_pattern_count": "number",
      "has_fabric_component": "boolean",
      "has_cpp_turbo_module": "boolean",
      "platform_check_count": "number"
    },
    "estimated_effort": "string — 预估工作量的简要描述",
    "adaptation_recommendation": "proceed | proceed_with_caution | blocked | not_needed",
    "blocking_reasons": ["string — 如果 blocked，列出具体原因"],
    "risk_items": [
      {
        "description": "string — 风险描述",
        "severity": "high | medium | low",
        "mitigation": "string | null — 缓解方案"
      }
    ]
  },

  "code_metrics": {
    "file_counts": {
      "javascript": "number — src/ 下 JS/TS 文件数",
      "android": "number — android/ 下 Java/Kotlin 文件数",
      "ios": "number — ios/ 下 Swift/ObjC 文件数",
      "cpp": "number — C/C++ 文件数（仅 C++ TurboModule 类型）"
    },
    "line_counts": {
      "javascript": "number — src/ 下 JS/TS 代码行数（由 code-stats subagent 统计）",
      "android": "number — android/ 下 Java/Kotlin 代码行数",
      "ios": "number — ios/ 下 Swift/ObjC 代码行数",
      "cpp": "number — C/C++ 代码行数",
      "example": "number — example/ 下 JS/TS 代码行数"
    }
  }
}
```

## 报告模板（`01-analysis-report.md`）

```markdown
# {plugin_name} 鸿蒙适配分析报告

## 基本信息

| 项目 | 内容 |
|------|------|
| 模块名称 | {name} |
| 版本 | {version} |
| 描述 | {description} |
| 模块类型 | {plugin_type} |
| 模块架构 | {plugin_architecture} |
| 通信模式 | {communication_patterns} |
| 已支持平台 | {platforms} |

## 鸿蒙化状态

{ohos_readiness 的详细说明}

## 核心功能清单

| 序号 | 功能 | TurboModule 方法 | Android 实现方式 | iOS 实现方式 |
|------|------|-----------------|-----------------|-------------|
| 1 | ... | ... | ... | ... |

## 通信模式详情

### TurboModule: {spec_name}

| 方法名 | 参数 | 返回值 |
|--------|------|--------|
| ... | ... | ... |

（Fabric Component 等同理）

## 依赖分析

### 原生三方库

| 平台 | 依赖 |
|------|------|
| Android | ... |
| iOS | ... |

### RN 依赖鸿蒙化状态

| 依赖 | 版本 | 是否原生模块 | OHOS 状态 | 是否阻塞 |
|------|------|-------------|-----------|----------|
| ... | ... | ... | ... | ... |

## 权限需求

| Android 权限 | iOS 权限 | 说明 |
|-------------|----------|------|
| ... | ... | ... |

## 平台判断代码

| 文件 | 位置 | 代码 |
|------|------|------|
| ... | ... | ... |

## Example 分析

{example 审计结果}

## 适配复杂度评估

> 此处复杂度评估仅作为大模型推理使用，与插件实际复杂度无关。

- **复杂度等级**：{level}
- **适配建议**：{recommendation}
- **预估工作量**：{estimated_effort}

### 量化指标

| 指标 | 值 |
|------|-----|
| TurboModule 方法数 | ... |
| 原生依赖数 | ... |
| 阻塞性依赖数 | ... |
| 通信模式数 | ... |

### 代码量统计

| 平台 | 文件数 | 代码行数 |
|------|--------|----------|
| JS/TS (src/) | ... | ... |
| Android | ... | ... |
| iOS | ... | ... |
| C/C++ | ... | ... |
| Example | — | ... |

{如有阻塞原因或风险项，在此列出}
```
