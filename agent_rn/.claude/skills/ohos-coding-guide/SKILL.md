---
name: ohos-coding-guide
description: 鸿蒙 ETS/C++ 编码统一指导 Skill。包含前置迁移处理 + 类型分发。根据 `target_module_types` 数组遍历加载对应类型指导 md。覆盖 6 种模块类型。
---

# 鸿蒙 ETS/C++ 编码指导（统一入口）

本 Skill 是 `03-coding-library` 阶段的核心编码指导，负责**前置迁移处理**和**类型分发**。

## 使用方式

### 步骤 1：前置检查
读取两个 JSON 文件：

```
.rn-ohos-adaptation/01-analysis.json
.rn-ohos-adaptation/02-planning.json
```

提取关键字段：

| 字段 | 来源 | 用途 |
|------|------|------|
| `migration_needed` | 01 | 是否需要迁移 |
| `target_module_types` | 02 | 适配目标类型数组 |
| `migration_plan` | 02 | 迁移规划 |
| `ohos_api_mapping` | 02 | API 映射 |
| `permission_mapping` | 02 | 权限映射 |
| `native_dependency_mapping` | 02 | 依赖映射 |

### 步骤 2：迁移处理（若需要）

判断条件：
- `01-analysis.json` 的 `migration_needed = true`
- `02-planning.json` 的 `migration_plan` 非空

若两者都满足，执行迁移：

```
read_file：.claude/skills/ohos-coding-guide/migration-unified.md
```

按该文件的步骤执行：
1. 创建所有 Spec 文件（到 `src/specs/` 目录）
2. 修改 JS 导出代码
3. 配置 package.json 的 codegenConfig

迁移完成后，在后续输出 `03-coding-library.json` 时设置 `migration_executed = true`。

### 步骤 3：类型分发与统一执行

从 `02-planning.json` 中读取 `target_module_types` 数组。

#### 分发表

| `target_module_types` 中的值 | 加载文件 | 说明 |
|------------------------------|----------|------|
| `turbo-module` | `.claude/skills/ohos-coding-guide/turbo-module.md` | ArkTS TurboModule（最常见） |
| `cpp-turbo-module` | `.claude/skills/ohos-coding-guide/cpp-turbo-module.md` | C++ TurboModule（高性能/跨线程） |
| `fabric-component` | `.claude/skills/ohos-coding-guide/fabric-component.md` | Fabric ArkTS 自定义组件 |
| `fabric-cpp-component` | `.claude/skills/ohos-coding-guide/fabric-cpp-component.md` | Fabric C++ 自定义组件 |
| `js-only` | `.claude/skills/ohos-coding-guide/js-only.md` | 纯 JS/TS 模块（无原生代码） |

#### 多类型统一执行策略

**若 `target_module_types` 是数组（多个类型）**，必须先加载所有类型文件，优化重组后统一执行：

1. **先加载所有类型文件**：用 `read_file` 读取数组中所有类型对应的 `.md` 文件
2. **提取公共步骤**：识别各类型文件中的公共步骤（脚手架、依赖安装、编译验证）
3. **合并去重**：将公共步骤合并为一次执行，避免重复
4. **保留类型特有步骤**：各类型的实现细节、依赖/权限配置分开执行

**统一执行流程（多类型）**：

```
1. 执行一次脚手架（rn.py create）← 所有类型共用
2. 执行一次依赖安装 + codegen（rn.py init）← 所有类型共用
3. 遍历各类型 → 填充实现代码、配置依赖/权限 ← 类型特有
4. 执行一次编译验证（rn.py build har）← 所有类型共用
```

**禁止**逐个类型执行完整流程（会导致多次脚手架/编译）。

#### 单类型执行策略

若 `target_module_types` 只有一个值，直接加载该类型文件并按其步骤执行。

#### 特殊情况：monorepo

若检测到 `target_module_types` 包含 `monorepo`，加载 `monorepo.md` 独立处理，不走常规流程。

### 步骤 4：产物输出

加载 `tool-schema-validation` Skill，按其标准流程输出：

```
.rn-ohos-adaptation/03-coding-library.json
.rn-ohos-adaptation/03-coding-library-report.md
```