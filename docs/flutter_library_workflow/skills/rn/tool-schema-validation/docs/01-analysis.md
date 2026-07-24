# 阶段 1：`01-analysis.json` + `01-analysis-report.md` + `01-analysis-prd.md`

analysis 阶段输出三个文件：
- `01-analysis.json`：结构化数据，供后续 Agent 消费
- `01-analysis-report.md`：人类可读的 Markdown 报告，供管理面板展示和人工审阅
- `01-analysis-prd.md`：需求规格文档（PRD），详细描述模块功能规格和 API 规格，作为后续鸿蒙适配的需求基准

> **⚠️ 警告**：以下 JSON 示例仅供参考，字段命名、类型和枚举值以 `json-schema/01-analysis.schema.json` 为唯一事实源。写入 `01-analysis.json` 前必须先读取 Schema，确保所有字段与 Schema 定义严格一致。
>
> PRD 的文档结构和编写指南见 `01-analysis-prd.md` 说明文档。

## JSON 产物结构

```json
{
  "plugin_name": "string — 模块名称，来自 package.json 的 name",
  "plugin_version": "string — 模块版本",
  "description": "string — 模块功能一句话描述",

  "ohos_readiness": {
    "status": "not_adapted | partially_adapted | fully_adapted",
    "in_repo_harmony_dir": "boolean — 仓库内是否有 harmony/ 目录",
    "in_package_harmony": "boolean — package.json 中是否有 harmony 配置（autolinking / codegenConfig）",
    "in_reference_index": "boolean — 是否在已适配索引中找到",
    "reference_url": "string | null — 已适配版本的仓库 URL",
    "in_local_repos": "boolean — repos-rn/ 下是否有已适配的同名模块",
    "local_repo_name": "string | null — 本地已适配仓库的目录名",
    "adapted_library_lookup": "object | null — Task(sub-rn-adapted-library) 的步骤追踪与结果，见 json-schema OhosReadiness",
    "notes": "string | null — 补充说明"
  },

  "arch_type": "js-only | old-arch | new-arch | mixed-arch | unknown",
  "module_types": ["native-module", "native-ui-component", "turbo-module", "fabric-component", "cpp-turbo-module", "jsi-host-object", "expo-module"],
  "uses_old_arch": "boolean — 是否使用旧架构 NativeModules",
  "old_arch_modules": [
    {
      "name": "string — 模块名称",
      "type": "native-module | native-ui-component",
      "methods": ["string — 方法名"],
      "source_file": "string | null — 定义文件路径"
    }
  ],
  "uses_new_arch": "boolean — 是否使用新架构 TurboModule/Fabric",
  "new_arch_specs": [
    {
      "spec_file_path": "string — Spec 文件路径（单个文件）",
      "spec_summary": {
        "name": "string — 模块名/组件名",
        "type": "turbo-module | fabric-component",
        "methods": ["string — 导出的方法/Props/Events 摘要"]
      }
    }
  ],
  "migration_needed": "boolean — old-arch 或 mixed-arch 时为 true",

  "plugin_type": "js_only | native_module | native_ui_component | turbo_module | fabric_component | cpp_turbo_module | jsi_host_object | expo_module | native_mixed | unknown",
  "plugin_architecture": "standalone | monorepo",

  "monorepo_packages": [
    {
      "name": "string — 子包名称",
      "path": "string — 相对路径",
      "type": "native-module | native-ui-component | turbo-module | fabric-component | cpp-turbo-module | jsi-host-object — 同 module_types 取值",
      "is_main": "boolean — 是否为主包"
    }
  ],

  "communication_patterns": ["turbo_module", "fabric_component", "device_event_emitter", "cpp_turbo_module", "jsi_host_object"],

  "native_modules": [
    {
      "type": "TurboModule | FabricComponent",
      "name": "string — 模块/组件名称，必须精确匹配 JS Spec",
      "spec_file": "string — JS/TS Spec 声明文件路径",
      "methods": [
        {
          "name": "string — 方法名",
          "args": "object | array | string | null — 参数结构描述",
          "return_type": "string — 返回值类型"
        }
      ]
    }
  ],

  "fabric_components": [
    {
      "component_name": "string — Fabric Component 名称（codegenNativeComponent 的第一个参数）",
      "js_spec_file": "string — JS/TS Spec 声明文件路径",
      "props": ["string — 组件接收的 Props 列表"],
      "commands": ["string — 组件支持的 Commands 列表"],
      "events": ["string — 组件触发的 Events 列表"]
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
    "summary": "string — 模块解决什么问题的一句话概述",
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
    "cpp": ["string — C/C++ 库名（仅 C++ TurboModule 类型）"],
    "harmony": ["string — harmony/library/oh-package.json5 中的原生依赖"]
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
    "ios": ["string — NSXxxUsageDescription"],
    "harmony": ["string — harmony/library/src/main/module.json5 中的权限声明"]
  },

  "harmony_package_class": "string | null — package.json 中 harmony.autolinking.etsPackageClassName 名称",

  "supported_platforms": ["android", "ios", "web", "windows", "macos", "linux", "harmony"],

  "platform_checks": [
    {
      "file": "string — 文件路径",
      "line_range": "string — 行号范围（如 '42-45'）",
      "check_type": "string — Platform.OS === 'android' | Platform.select | conditional_require | 等",
      "code_snippet": "string — 相关代码片段"
    }
  ],

  "has_example": "boolean — 是否包含示例应用",
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
      "turbo_module_method_count": "number — TurboModule 方法总数",
      "fabric_component_count": "number — Fabric 组件数量",
      "native_dependency_count": "number — 原生三方库依赖数量",
      "blocking_deps_count": "number — 阻塞性依赖数量",
      "communication_pattern_count": "number — 通信模式种类数",
      "has_fabric_component": "boolean — 是否使用 Fabric 自定义组件",
      "has_cpp_module": "boolean — 是否使用 C++ TurboModule",
      "has_jsi_host_object": "boolean — 是否使用直接 JSI 绑定（非 TurboModule 的 HostObject）",
      "platform_check_count": "number — 平台判断代码出现次数"
    },
    "complexity_score": "number — 综合评分（整数）",
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
      "cpp": "number — C/C++ 文件数",
      "harmony_ets": "number — harmony/ 下 ETS 文件数"
    },
    "line_counts": {
      "javascript": "number — src/ 下 JS/TS 代码行数",
      "android": "number — android/ 下 Java/Kotlin 代码行数",
      "ios": "number — ios/ 下 Swift/ObjC 代码行数",
      "cpp": "number — C/C++ 代码行数",
      "harmony_ets": "number — harmony/ 下 ETS 代码行数",
      "example": "number — 示例应用代码行数"
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
| 模块名称 | {plugin_name} |
| 版本 | {plugin_version} |
| 描述 | {description} |
| 架构类型 | {arch_type} |
| 模块类型 | {module_types} |
| Plugin 类型 | {plugin_type} |
| 模块架构 | {plugin_architecture} |
| 通信模式 | {communication_patterns} |
| 已支持平台 | {supported_platforms} |
| 是否需要迁移 | {migration_needed} |

## 鸿蒙化状态

{ohos_readiness 的详细说明}

## 核心功能清单

| 序号 | 功能 | 关联方法 | Android 实现方式 | iOS 实现方式 |
|------|------|---------|-----------------|-------------|
| 1 | ... | ... | ... | ... |

## 通信模式详情

### TurboModule: {name}

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
| C/C++ | ... |
| Harmony | ... |

### RN 依赖鸿蒙化状态

| 依赖 | 版本 | 是否原生模块 | OHOS 状态 | 是否阻塞 |
|------|------|-------------|-----------|----------|
| ... | ... | ... | ... | ... |

## 权限需求

| Android 权限 | iOS 权限 | Harmony 权限 | 说明 |
|-------------|----------|-------------|------|
| ... | ... | ... | ... |

## 平台判断代码

| 文件 | 位置 | 代码 |
|------|------|------|
| ... | ... | ... |

## Example 分析

{example 审计结果}

## 适配复杂度评估

- **复杂度等级**：{level}
- **适配建议**：{adaptation_recommendation}
- **预估工作量**：{estimated_effort}
- **综合评分**：{complexity_score}

### 量化指标

| 指标 | 值 |
|------|-----|
| TurboModule 方法数 | {turbo_module_method_count} |
| Fabric 组件数 | {fabric_component_count} |
| 原生依赖数 | {native_dependency_count} |
| 阻塞性依赖数 | {blocking_deps_count} |
| 通信模式数 | {communication_pattern_count} |
| 平台判断代码数 | {platform_check_count} |

### 代码量统计

| 平台 | 文件数 | 代码行数 |
|------|--------|----------|
| JS/TS (src/) | {javascript_files} | {javascript_lines} |
| Android | {android_files} | {android_lines} |
| iOS | {ios_files} | {ios_lines} |
| C/C++ | {cpp_files} | {cpp_lines} |
| Harmony ETS | {harmony_ets_files} | {harmony_ets_lines} |
| Example | — | {example_lines} |

{如有阻塞原因或风险项，在此列出}
```
