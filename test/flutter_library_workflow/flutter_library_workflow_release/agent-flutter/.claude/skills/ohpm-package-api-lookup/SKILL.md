---
name: ohpm-package-api-lookup
description: 从已安装的 oh_modules 目录搜索第三方 ohpm 包的 API 签名。适用于 coding-library 阶段查询已安装依赖的原生三方库的API 定义。触发关键词：ohpm 包、三方库类型定义。
---

# OHPM Package API Lookup

在项目的 `oh_modules/` 目录中搜索已安装 ohpm 包的类型定义文件，提取 API 签名。


### 搜索路径（按优先级）

| 优先级 | 路径 | 说明 |
|--------|------|------|
| 1 | `ohos/oh_modules/@{org}/{package}/` | 插件级依赖（最常见） |
| 2 | `example/ohos/oh_modules/.ohpm/@{org}+{package}@{version}/oh_modules/@{org}/{package}/` | Example 级依赖（ohpm 缓存） |
| 3 | `ohos/oh_modules/` 全局搜索 | 兜底（当路径不确定时） |

### 文件类型

| 文件类型 | 说明 | 优先级 |
|---------|------|--------|
| `.d.ts` | TypeScript 类型声明文件 | 高 |
| `.d.ets` | ArkTS 类型声明文件 | 高 |
| `index.ets` | 包入口文件（无类型定义时的备选） | 中 |

## 核心搜索流程

### 流程 A：单个 API 查询

**输入格式**：`@{org}/{package} {api_name}`

示例：`@vendor/rtc-sdk login`、`@ohos/utils formatDate`

**执行步骤**：

1. **解析包名**：提取 `{org}` 和 `{package}` 部分
2. **定位目录**：按优先级检查目录是否存在
3. **搜索文件**：Grep 搜索 `.d.ts` 和 `.d.ets` 文件
4. **提取签名**：读取匹配的方法/函数定义
5. **构建输出**：返回完整 API 信息

**输出格式**：

```json
{
  "available": true,
  "package": "@{org}/{package}",
  "api_name": "{api_name}",
  "signature": "{完整方法签名}",
  "parameters": [
    { "name": "{参数名}", "type": "{类型}", "optional": false }
  ],
  "return_type": "{返回类型}",
  "import_example": "import {模块} from '@{org}/{package}'",
  "file": "{.d.ts 文件路径}"
}
```

### 流程 B：包级 API 列表

**输入格式**：`@{org}/{package}`

示例：`@vendor/rtc-sdk`

**执行步骤**：

1. 定位包目录
2. 读取入口文件（`Index.d.ets` 或 `index.ets`）
3. Grep 扫描所有 `.d.ts` / `.d.ets` 文件
4. 分类整理公开 API

**输出格式**：

```json
{
  "available": true,
  "package": "@{org}/{package}",
  "entry_file": "Index.d.ets",
  "api_count": 150,
  "api_list": ["method1", "method2", "..."],
  "import_example": "import Module from '@{org}/{package}'"
}
```

### 流程 C：类型定义查询

**输入格式**：`@{org}/{package} {type_name}`

示例：`@vendor/rtc-sdk LoginConfig`、`@ohos/utils ConfigOptions`

**输出格式**：

```json
{
  "available": true,
  "type_name": "{type_name}",
  "kind": "interface | enum | type",
  "definition": "{完整类型定义}",
  "file": "{.d.ts 文件路径}"
}
```

## 闭源/无类型定义处理策略

### 策略：优先 oh_modules，缺失则标记风险

| 情况 | 返回内容 |
|------|----------|
| **有 .d.ts 文件** | `{ available: true, signature: "..." }` |
| **无 .d.ts 文件** | `{ available: false, reason: "no_type_definitions", suggestion: "查阅官方文档或联系厂商" }` |

**无类型定义时的完整返回示例**：

```json
{
  "available": false,
  "package": "@{org}/{package}",
  "reason": "no_type_definitions",
  "suggestion": "第三方包无公开类型定义，建议：1. 查阅官方文档；2. 运行 Example 验证；3. 联系技术支持",
  "risk_level": "medium"
}
```

## Grep 搜索命令模板

### 单个 API 搜索

```bash
# 方法搜索
Grep: pattern="{methodName}\s*\("
      path="ohos/oh_modules/@{org}/{package}/"
      include="*.d.ts,*.d.ets"
```

### 类型定义搜索

```bash
# Interface 搜索
Grep: pattern="interface\s+{TypeName}"
      path="ohos/oh_modules/@{org}/{package}/"
      include="*.d.ts"

# Enum 搜索
Grep: pattern="enum\s+{EnumName}"
      path="ohos/oh_modules/@{org}/{package}/"
      include="*.d.ts"
```

### 包入口文件读取

```
Read: ohos/oh_modules/@{org}/{package}/Index.d.ets
```

## 注意事项

- **绝不猜测 API 签名**，只返回 `.d.ts` 文件中实际存在的定义
- **优先级顺序**：插件级路径 > Example级路径 > 全局搜索
- **符号链接解析**：插件级 `oh_modules` 可能是符号链接，Read/Grep 会自动解析到真实路径
- **文件类型优先级**：`.d.ts` > `.d.ets` > `index.ets`
- **搜索流程详见** [references/guide.md](references/guide.md)