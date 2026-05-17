---
name: tool-schema-validation
description: 阶段产物 Schema 校验规范。包含 JSON Schema、补充文档、校验脚本、5 步标准生成流程、PostWrite Hook 与跨阶段一致性规则。
---

# 阶段产物 Schema 校验规范

本 Skill 目录为适配流水线的**校验与 Schema 单一事实来源**，包含：

| 子目录 | 内容 |
|--------|------|
| `scripts/` | PostWrite Hook 调用的校验脚本（Claude Code / OpenCode 共用入口） |
| `json-schema/` | JSON Schema 2020-12 定义（权威结构约束） |
| `docs/` | 字段说明、报告模板、PRD 模板（人类可读补充） |

从 CWD（`repos-rn/{module_name}/`）访问时，路径前缀为 `./.claude/skills/tool-schema-validation/`。

---

## 各阶段 Schema 与文档路径（从 CWD 访问）

各阶段 Agent **仅读取本阶段相关**的 Schema 与文档。

| 阶段 | JSON Schema（必读） | 补充说明文档（可选） |
|------|---------------------|---------------------|
| analysis | `.claude/skills/tool-schema-validation/json-schema/01-analysis.schema.json` | `.claude/skills/tool-schema-validation/docs/01-analysis.md`、`.claude/skills/tool-schema-validation/docs/01-analysis-prd.md` |
| planning | `.claude/skills/tool-schema-validation/json-schema/02-planning.schema.json` | `.claude/skills/tool-schema-validation/docs/02-planning.md` |
| coding-library | `.claude/skills/tool-schema-validation/json-schema/03-coding-library.schema.json` | `.claude/skills/tool-schema-validation/docs/03-coding-library.md` |
| testing | `.claude/skills/tool-schema-validation/json-schema/04-testing.schema.json` | `.claude/skills/tool-schema-validation/docs/04-testing.md` |
| summary | `.claude/skills/tool-schema-validation/json-schema/05-summary.schema.json` | `.claude/skills/tool-schema-validation/docs/05-summary.md` |
| 管理面板（`repos/plugins.json`） | `.claude/skills/tool-schema-validation/json-schema/plugins.schema.json` | `.claude/skills/tool-schema-validation/docs/plugins.md` |

---

## JSON 产物标准生成流程（所有阶段统一）

每个阶段写入 JSON 产物时，**必须**按以下流程执行：

**第一步：读取 Schema**

从上方表中查找本阶段的 JSON Schema 完整路径，使用 `read` 工具读取，确认 `required` 字段和 `enum` 取值。Schema 中的 `description` 字段包含每个属性的语义说明。

> 本阶段的 JSON 产物是**输出**文件，不要在流程一开始就尝试读取（文件可能不存在）。

**第二步：写入 JSON 产物**

使用 `write` 工具一次性写入完整 JSON 文件到 `.rn-ohos-adaptation/` 目录，字段定义严格遵循 JSON Schema。

> **必须**通过 `write`/`edit` 工具写入，不要用 `bash` + heredoc，否则自动校验不会触发。

**第三步：校验与修复**

写入后 PostWrite Hook 会**自动触发**以下校验：

- **JSON Schema 校验**：检查产物是否符合对应阶段的 Schema 定义
- **跨阶段一致性校验**（仅 `05-summary.json`）：见下文「跨阶段一致性校验规则」

校验结果直接显示在工具输出中。若 ❌ 未通过，根据字段路径和错误描述**立即修改并重新写入**（会再次触发校验），循环直到 ✅ 通过。

**第四步：写入 Markdown 报告**

使用 `write` 工具写入对应的 `-report.md` 文件，报告使用**中文**输出。

**第五步：确认产物完整**

确认本阶段所有产物文件（JSON + Markdown）均已写入磁盘，缺失则补写。

---

## PostWrite Hook 行为说明

- **触发条件**：通过 `write`/`edit` 工具写入 `.rn-ohos-adaptation/` 下阶段产物 JSON（文件名匹配 `01-analysis.json` … `05-summary.json`）或 `repos/plugins.json`（管理面板场景）。
- **实现位置**：`.claude/skills/tool-schema-validation/scripts/validate-on-write.cjs`（由 OpenCode 插件与 Claude Code PostToolUse 调用）。
- **JSON Schema 校验**：`validate-json-worker.cjs` 使用 AJV，依据 `json-schema/` 中对应文件校验。
- **跨阶段一致性**：写入 `05-summary.json` 时额外运行 `validate-pipeline-worker.cjs`。
- **阻塞行为**：校验脚本**始终 exit 0**，不阻止写入；Agent 根据输出自行修复。
- **依赖**：AJV 位于 `.claude/skills/tool-schema-validation/node_modules/`（需在该目录下执行 `npm install`）。

---

## 跨阶段一致性校验规则（仅 `05-summary.json`，8 项）

由 `validate-pipeline-worker.cjs` 执行，与 `01`～`04` 产物对照：

| 检查名 | 含义 |
|--------|------|
| `module_name_consistency` | `03` 中实现的 TurboModule/组件须在 `01` 的 `native_modules` 中定义 |
| `target_module_types_consistency` | `02` 与 `03` 的 `target_module_types` 一致 |
| `build_status_propagation` | `05` 的 `build_status` 与 `03` 一致 |
| `example_status_propagation` | `05` 的 `example_status` 与 `04` 的 `example_build_status` 等规则一致 |
| `coverage_math_consistency` | `05` 的 `coverage` 与 `03` 的方法数量一致 |
| `runtime_check_summary_consistency` | `05` 的运行态统计与 `04` 的 `runtime_checks` 一致 |
| `device_test_summary_consistency` | `05` 的设备验证摘要与 `04` 的 `device_test_*` 一致 |
| `quality_score_consistency` | `05` 的 `quality_score` 与编译状态、覆盖率等数据不自相矛盾 |

---

## 工具使用约束（产物写入）

- 产物（JSON / Markdown / 代码）**必须**通过 `write` 或 `edit` 写入磁盘，**绝不**将内容输出到对话中代替写入。
- 大型 JSON 直接用 `write` 一次性写入，不要用 `bash` + heredoc 拼接。
- 读取 `docs/` 下说明文档失败时，按 Agent 定义中的字段列表和格式要求输出产物，优先保证下游可解析。

---

## 数据架构简述

系统采用**两层数据架构**：`plugins.json` 仅管理仓库列表；各模块详细适配信息在各自 `.rn-ohos-adaptation/` 目录。JSON Schema 为结构化产物的**唯一事实来源**；`docs/` 为补充说明与报告模板。
