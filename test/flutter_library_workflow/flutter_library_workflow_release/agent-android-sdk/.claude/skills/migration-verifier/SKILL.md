---
name: migration-verifier
description: Android SDK 迁移结果验证 Skill。定义一致性校验、覆盖率计算、评分规则、风险审计和结论输出标准。
---

# 迁移验证 Skill

## 目标

为 `sdk-evaluation` 阶段提供“可审计”的评价方法，避免主观打分。

## 输入产物

- `01-analysis.json`（主源见 `conversion_source`）
- `01-analysis-prd.md`
- `01-analysis-report.md`
- `02-planning.json`（仅 marker / 索引）
- `02-planning-report.md`
- `03-implementation.json`（HAR + ArkTS，含 `har_module_relative_path`、`build_status`）
- `03-implementation-report.md`
- `04-har-demo.json`（脚手架集成、Demo、`demo_build_status`、hvigor 命令）
- `04-har-demo-report.md`（Demo 设计、权限闭环、真实设备能力）
- 待输出：`05-evaluation.json`、`05-evaluation-report.md` 与仓库根 `README.md`
- `05-evaluation.json` 只写阶段状态、评分、难度和报告路径；覆盖率、风险、流程问题和优化建议写入 Markdown 报告。

## 一致性校验（必须先过）

1. 名称一致性：`sdk_name` 在 01/02/03/04 各阶段保持一致。
2. PRD 覆盖闭合：
   - `01-analysis-prd.md` 中每个 `F-xx` 必须在 `02-planning-report.md` 中有 work unit 覆盖，或明确为 `cut` / `deferred` / `host_proxy` 边界。
   - 05 不把 `work_unit_prd/index.md`、`work_unit_prd/F-xx-*.md`、`work_unit_plan/index.md`、`work_unit_plan/WU-xxx-*.md` 作为常规评估输入；若前序报告缺失必要判断依据，应在评估报告中标记为“前序报告信息不足”。
3. 实现闭合：
   - `03-implementation-report.md` 应覆盖所有可执行 WU 的执行状态。
   - `complete` / `partial` / `blocked` / `cut` 状态必须能在 `03-implementation-report.md` 找到实现证据或边界说明。
4. Demo 闭合：
   - `host_proxy` / `cut` / `deferred` 能力必须有展示方式或边界说明。
   - 真实设备能力不得被固定值、随机数或模拟数据伪装通过。
5. 语义一致性：
   - 若 `03.build_status = fail` 或 `04.demo_build_status = fail`，05 报告不应给 A/B 档，除非报告中明确说明评分规则和不可验证边界。

## 覆盖率公式

- `total_work_units` = `02-planning.json.work_unit_count` 或 `02-planning-report.md` 中的 WU 数量。
- `completed_work_units` = `03-implementation-report.md` 中状态为 `complete` 的 work unit 数量。
- `coverage_rate = completed_work_units / total_work_units` — 百分比字符串，如 `78%`。

## 视觉参数一致性检查（仅当 has_ux=true）

当 SDK 包含 UI 能力（`has_ux=true`）时，需额外校验：

1. **PRD §5 视觉参数速查完整性**：
   - 若 `has_ux=true`，PRD 必须包含 §5 视觉参数速查章节
   - §5.1 颜色参数、§5.2 尺寸参数至少各有一条记录

2. **Demo 视觉参数对照**：
   - `04-har-demo-report.md` 应说明使用的 HAR `@Component struct`、实际入口和可见反馈
   - `colors_matched` / `dimensions_matched` 应为 `true`
   - 若为 `false`，`mismatch_details` 必须列出不一致项

3. **人工验收标记**：
   - 视觉参数检查通过不代表 UI 效果完全正确，评估报告需标注"交互流畅度需人工验收"

