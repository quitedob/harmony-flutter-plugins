---
name: tool-schema-validation
description: 阶段产物 Schema 校验规范。包含 JSON Schema、校验脚本、标准生成流程、PostWrite Hook（含自动报告生成）与跨阶段一致性规则。
---

# 阶段产物 Schema 校验规范

本 Skill 目录为适配流水线的**校验与 Schema 单一事实来源**，包含：

| 子目录 | 内容 |
|--------|------|
| `scripts/` | PostWrite Hook 调用的校验脚本与报告渲染脚本（Claude Code / OpenCode 共用入口） |
| `json-schema/` | JSON Schema 2020-12 定义（权威结构约束，字段语义见 Schema 内 `description`） |
| `report-templates/` | Handlebars (`.hbs`) 报告模板，按 locale 分目录（当前 `zh-CN/`），渲染引擎自动加载 |
| `docs/` | PRD 模板、plugins.json 说明、视觉测试文档（仅保留仍有独立消费者的文件） |

从 CWD（`repos/{plugin_name}/`）访问时，路径前缀为 `./.claude/skills/tool-schema-validation/`。

---

## 各阶段 Schema 路径（从 CWD 访问）

各阶段 Agent 读取本阶段的 JSON Schema 即可，Schema 内 `description` 字段包含完整的字段语义说明。

| 阶段 | JSON Schema |
|------|-------------|
| analysis | `.claude/skills/tool-schema-validation/json-schema/01-analysis.schema.json` |
| planning | `.claude/skills/tool-schema-validation/json-schema/02-planning.schema.json` |
| coding-library | `.claude/skills/tool-schema-validation/json-schema/03-coding-library.schema.json` |
| testing | `.claude/skills/tool-schema-validation/json-schema/04-testing.schema.json` |
| summary | `.claude/skills/tool-schema-validation/json-schema/05-summary.schema.json` |
| 管理面板（`repos/plugins.json`） | `.claude/skills/tool-schema-validation/json-schema/plugins.schema.json` |

**附加文档**（仅特定阶段需要）：
- analysis 阶段：PRD 模板 → `.claude/skills/tool-schema-validation/docs/01-analysis-prd.md`

---

## JSON 产物标准生成流程（所有阶段统一）

每个阶段写入 JSON 产物时，**必须**按以下流程执行：

**第一步：读取 Schema**

从上方表中查找本阶段的 JSON Schema 完整路径，使用 `read` 工具读取，确认 `required` 字段和 `enum` 取值。Schema 中的 `description` 字段包含每个属性的语义说明。

> 本阶段的 JSON 产物是**输出**文件，不要在流程一开始就尝试读取（文件可能不存在）。

**第二步：写入 JSON 产物**

使用 `write` 工具一次性写入完整 JSON 文件到 `.ohos-adaptation/` 目录，字段定义严格遵循 JSON Schema。

> **必须**通过 `write`/`edit` 工具写入，不要用 `bash` + heredoc，否则自动校验不会触发。

**第三步：校验、自动生成报告与修复**

写入后 PostWrite Hook 会**自动触发**以下操作：

1. **JSON Schema 校验**：检查产物是否符合对应阶段的 Schema 定义
2. **自动生成 Markdown 报告**：校验通过后，由 `render-report-worker.cjs` 自动从 JSON 数据渲染对应的 `-report.md` 文件（**无需 Agent 手动写入报告**）
3. **跨阶段一致性校验**（仅 `05-summary.json`）：见下文「跨阶段一致性校验规则」

校验结果直接显示在工具输出中。若 ❌ 未通过，根据字段路径和错误描述**立即修改并重新写入**（会再次触发校验和报告生成），循环直到 ✅ 通过。

> **注意**：`-report.md` 文件由 Hook 自动生成，Agent **不需要**手动写入。仅 `01-analysis-prd.md` 和 `INTEGRATION_GUIDE.md` 仍需 Agent 手动编写。

**第四步：确认产物完整**

确认本阶段所有产物文件（JSON + 自动生成的 Markdown 报告 + Agent 手动编写的附加文件）均已写入磁盘，缺失则补写。

---

## PostWrite Hook 行为说明

- **触发条件**：通过 `write`/`edit` 工具写入 `.ohos-adaptation/` 下阶段产物 JSON（文件名匹配 `01-analysis.json` … `05-summary.json`）或 `repos/plugins.json`（管理面板场景）。
- **实现位置**：`.claude/skills/tool-schema-validation/scripts/validate-on-write.cjs`（由 OpenCode 插件与 Claude Code PostToolUse 调用）。
- **JSON Schema 校验**：`validate-json-worker.cjs` 使用 AJV，依据 `json-schema/` 中对应文件校验。
- **自动报告生成**：校验通过后，`render-report-worker.cjs` 加载 `report-templates/zh-CN/` 下对应的 Handlebars 模板，注入 JSON 数据渲染 `-report.md` 文件。
- **跨阶段一致性**：写入 `05-summary.json` 时额外运行 `validate-pipeline-worker.cjs`。
- **阻塞行为**：校验脚本**始终 exit 0**，不阻止写入；Agent 根据输出自行修复。
- **依赖**：AJV + Handlebars 位于 `.claude/skills/tool-schema-validation/node_modules/`（需在该目录下执行 `npm install`）。

---

## 跨阶段一致性校验规则（仅 `05-summary.json`，8 项）

由 `validate-pipeline-worker.cjs` 执行，与 `01`～`04` 产物对照：

| 检查名 | 含义 |
|--------|------|
| `channel_name_consistency` | `03` 中实现的 channel 须在 `01` 的 `channels` 中定义 |
| `plugin_type_skill_consistency` | `02` 与 `03` 的 `plugin_type_skill` 一致 |
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

---

## 报告模板体系

报告由 **Handlebars 模板引擎**（业界标准）渲染，模板文件位于 `report-templates/zh-CN/`：

| 阶段 | 模板文件 |
|------|---------|
| analysis | `01-analysis-report.md.hbs` |
| planning | `02-planning-report.md.hbs` |
| coding-library | `03-coding-library-report.md.hbs` |
| testing | `04-testing-report.md.hbs` |
| summary | `05-summary-report.md.hbs` |

**扩展方式**：
- **调整报告版式**：直接编辑对应 `.hbs` 模板文件，无需修改 JS 代码
- **新增字段展示**：在 Schema 中添加可选字段 → 在模板中用 `{{#if field}}` 条件渲染
- **新增 locale**：在 `report-templates/` 下创建新目录（如 `en/`），复制并翻译模板

模板中使用的自定义 Helpers（在 `render-report-worker.cjs` 中注册）：

| Helper | 用途 | 示例 |
|--------|------|------|
| `or` | 取首个非空值，默认 `—` | `{{or field '默认值'}}` |
| `statusIcon` | 状态转 emoji | `{{statusIcon 'pass'}}` → ✅ |
| `boolCn` | 布尔转中文 | `{{boolCn true}}` → 是 |
| `hasItems` | 数组非空判断 | `{{#if (hasItems arr)}}` |
| `join` | 数组拼接 | `{{join arr ', '}}` |
| `eq` | 相等判断 | `{{#eq status 'skipped'}}...{{/eq}}` |
| `checkLabel` | 检测类型转中文标签 | `{{checkLabel 'channel_consistency'}}` → Channel 一致性 |
| `inc` | 索引 +1 | `{{inc @index}}` |
| `truncate` | 截断字符串 | `{{truncate str 80}}` |
| `escapeCell` | 转义表格单元格 | `{{escapeCell code_snippet}}` |
| `formatArgs` | 格式化方法参数 | `{{formatArgs args}}` |
| `stripEventPrefix` | 去 EventChannel 前缀 | `{{stripEventPrefix method}}` |
| `len` | 取数组长度 | `{{len arr}}` |

---

## JSON 中的叙事字段

为生成与历史手写报告同等丰富的内容，各阶段 Schema 包含若干**可选叙事字段**（非 `required`）。Agent 应尽量填写，以提高报告质量：

| 阶段 | 可选叙事字段 | 说明 |
|------|------------|------|
| analysis | `conclusion` | 分析结论（Markdown），总结适配建议和关键发现 |
| analysis | `example_path` / `example_notes` | Example 路径和功能覆盖说明 |
| analysis | `ohos_readiness.display_status` | 面向报告的状态短标签（如「已完全兼容 ✓」） |
| analysis | `monorepo_packages[].description` | 子包功能说明 |
| analysis | `core_features[].implementation` | 实现方式（如「纯 Dart」「Platform Channel」） |
| planning | `implementation_strategy.approach_detail` | 详细方案（Markdown，比 `approach` 更详尽） |
| planning | `implementation_strategy.supplemental_sections[]` | 补充段落（如关键特性、状态机说明） |
| coding-library | `overview` | 编码阶段概述 |
| coding-library | `engineering_setup.directory_tree` | ohos 工程目录树文本 |
| coding-library | `architecture_decisions[]` | 关键架构决策记录 |
| testing | `example_build_command` | Example 编译命令 |
| testing | `example_build_artifacts[]` | 构建产物（路径、大小） |
| summary | `summary.plugin_version` | 插件版本 |
| summary | `compilation_fixes[]` | 编译修复记录（合并 03+04） |

---

## 数据架构简述

系统采用**两层数据架构**：`plugins.json` 仅管理仓库列表；各插件详细适配信息在各自 `.ohos-adaptation/` 目录。JSON Schema 为结构化产物的**唯一事实来源**（字段语义、类型约束、枚举值均在 Schema 内定义）。
