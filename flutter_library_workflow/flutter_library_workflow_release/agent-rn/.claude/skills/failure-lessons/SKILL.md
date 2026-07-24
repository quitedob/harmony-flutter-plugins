---
name: failure-lessons
description: 编码失败经验总结。收录 Agent 在 coding-library 和 testing 阶段遇到的编译/运行错误及其修复方案，供后续运行时吸取经验、避免重复犯错。
---

# 失败经验总结（Failure Lessons）

本 Skill 收录 Agent 在鸿蒙适配过程中遇到的失败经验，帮助 Agent 在编码和测试阶段主动避免重复错误。

## 使用方式

### 1. 阶段开始时预读

在 `primary-03-coding-library` 和 `primary-04-testing` 阶段开始时，**必须先读取**本 Skill：

```
skill({ name: "failure-lessons" })
```

然后 `read_file` 加载经验库：
- `.claude/skills/failure-lessons/lessons.json`

### 2. 编码/测试时对照检查

根据当前模块类型（`target_module_types` 或 `module_types`），筛选相关经验条目：
- 筛选条件：`stage` 与当前阶段匹配，且 `module_types` 包含当前类型
- 对照经验条目中的 `wrong_pattern`，检查自己的代码是否存在相同问题
- 若有风险，提前采用 `fix_pattern` 中的正确做法

### 3. 新增经验条目

在 testing 阶段修复编译/运行错误后，若发现**新的、有代表性的失败经验**，应追加到经验库：

**判断标准**（满足任一即可新增）：
- 该错误类型在经验库中尚无记录
- 该错误在多个项目中反复出现
- 该错误的修复方案具有通用参考价值

**新增流程**：
1. 检查 `lessons.json` 是否已有相似条目（按 `error_type` + `category` 判断）
2. 若无重复，追加新条目到 `lessons` 数组末尾
3. 用 `write` 工具更新 `lessons.json`

## 经验条目结构

每个条目包含以下字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 唯一标识，格式 `{stage}-{category}-{seq}` |
| `stage` | string | 发生阶段：`coding-library` / `testing` |
| `category` | string | 错误类别：`import` / `type` / `permission` / `cmake` / `api` / `config` / `access` |
| `module_types` | array | 适用模块类型：`type-turbo-module`、`type-fabric-component` 等 |
| `error_type` | string | 具体错误类型（如 ArkTS 编译错误 ID） |
| `wrong_pattern` | string | 错误写法/模式（代码片段或描述） |
| `fix_pattern` | string | 正确写法/修复方案（代码片段或描述） |
| `reason` | string | 错误原因解释 |
| `example_source` | string | 经验来源项目（可选） |

## 当前经验库

加载 `lessons.json` 后可见全部条目。按 `category` 分类：

- **import**：导入语句错误（语法、路径、模块名）
- **type**：类型系统错误（隐式 any、类型不匹配）
- **permission**：权限配置错误（缺失、格式）
- **cmake**：CMake 构建错误（无源文件、路径）
- **api**：API 使用错误（不存在、参数错误）
- **config**：配置文件错误（module.json5、oh-package.json5）
- **access**：访问权限错误（私有属性、保护成员）
- **api**：运行时 API 缺失错误（鸿蒙 JS 引擎不提供浏览器标准 API，如 Intl、fetch、WebSocket 等）

## 注意事项

- 经验库是**预防性参考**，不能替代文档查询和 API 验证
- 新增条目需确保**通用性**，过于特殊的错误不建议收录
- 经验库应保持**精简**，避免冗余条目