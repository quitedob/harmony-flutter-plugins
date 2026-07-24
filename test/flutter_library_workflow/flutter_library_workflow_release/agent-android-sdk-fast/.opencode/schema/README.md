# 适配数据 JSON Schema 规范

本目录包含 **Android SDK → 鸿蒙（ArkTS / HAR）** 适配流程中所有 JSON 文件的结构约束与补充说明文档。

**路径说明**：本 schema 目录通过 workspace-links 挂载。标准情况下 SDK 仓库根可通过 `./.opencode/schema/` 访问；若 CWD 不是 SDK 仓库根，必须先根据 `01-analysis.json.source_layout.sdk_repo_root` 定位任务根。

---

## 数据架构概述

每个 sdk 仓库下的 `.ohos-adaptation/` 目录是该 sdk 所有适配信息的**唯一真实来源**。

阶段 01 必须在 `01-analysis.json.source_layout` 中记录 CWD、SDK 仓库根、Gradle 根、active modules、SDK 主模块、sample 模块、分析范围、修改范围和验证目标。阶段 02 必须原样继承该字段；后续阶段必须按这些字段限制源码扫描、代码修改、验收设计和构建验证。

### `.ohos-adaptation/` 目录结构

```
repos-sdk/{sdk_name}/.ohos-adaptation/
├── 01-analysis.json          # 阶段 01 产物：SDK 分析结果（结构化数据）
├── 01-analysis-report.md     # 阶段 01 产物：SDK 分析报告（人类可读）
├── 01-analysis-prd.md        # 阶段 01 产物：需求规格文档（PRD）
├── work_unit_prd/
│   ├── index.md              # 阶段 01 产物：模块 PRD 索引
│   └── F-xx-*.md             # 阶段 01 产物：模块 PRD
├── 02-planning.json          # 阶段 02 产物：marker / 索引
├── 02-planning-report.md     # 阶段 02 产物：规划报告（人类可读）
├── work_unit_plan/
│   ├── index.md              # 阶段 02 产物：Work Unit 编码计划索引
│   └── WU-xxx-*.md           # 阶段 02 产物：Work Unit 编码计划
├── 03-implementation.json    # 阶段 03 产物：HAR 实现结果
├── 03-implementation-report.md  # 阶段 03 产物：实现报告（人类可读）
├── 04-har-demo.json          # 阶段 04 产物：Demo marker
├── 04-har-demo-report.md     # 阶段 04 产物：Demo 报告（人类可读）
├── 05-evaluation.json        # 阶段 05 产物：评估结论
├── 05-evaluation-report.md   # 阶段 05 产物：评估报告（人类可读）
├── ...（测试路径产物）
├── 01-test-points.json       # 阶段 21 产物：测试点汇总
├── 01-test-analysis-report.md# 阶段 21 产物：测试分析报告
├── 03-case-review-report.md  # 阶段 23 产物：用例评审报告
├── 04-test-cases.json        # 阶段 22 产物：测试用例
├── 05-demo-gen.json          # 阶段 24 产物：Demo 生成结果
├── 05-demo-gen-report.md     # 阶段 24 产物：Demo 生成报告
└── sdk-blackbox-verify.json  # 阶段 25 产物：黑盒验证结果
└── sdk-blackbox-verify-report.md # 阶段 25 产物：黑盒验证报告
```

---

## JSON Schema（权威定义）

`json-schema/` 子目录包含标准 JSON Schema 2020-02 文件，是所有 JSON 产物的**唯一事实来源（Single Source of Truth）**。

| Schema 文件 | 对应产物 | 对应阶段 |
|-------------|----------|----------|
| `json-schema/01-analysis.schema.json` | `01-analysis.json` | sdk-analysis |
| `json-schema/02-planning.schema.json` | `02-planning.json` | sdk-planning |
| `json-schema/03-implementation.schema.json` | `03-implementation.json` | sdk-implementation |
| `json-schema/04-har-demo.schema.json` | `04-har-demo.json` | sdk-har-demo |
| `json-schema/05-evaluation.schema.json` | `05-evaluation.json` | sdk-evaluation |
| `json-schema/11-test-analysis.schema.json` | `01-test-points.json` | sdk-test-analysis |
| `json-schema/12-test-cases.schema.json` | `04-test-cases.json` | sdk-test-case-gen |
| `json-schema/13-case-review.schema.json` | `03-case-review-report.md` | sdk-case-review |
| `json-schema/14-demo-gen.schema.json` | `05-demo-gen.json` | primary-sdk-demo-gen |

---

## 按阶段读取指引

各 Agent 应仅读取本阶段相关的文件，以减少上下文负担。

| 阶段 / 角色 | JSON Schema（必读） | 补充说明文档（可选） |
|-------------|---------------------|---------------------|
| **sdk-analysis** | `json-schema/01-analysis.schema.json` | `docs/01-analysis.md`、`docs/01-analysis-prd.md`（PRD 模板） |
| **sdk-planning** | `json-schema/02-planning.schema.json` | `docs/02-planning.md` |
| **sdk-implementation** | `json-schema/03-implementation.schema.json` | `docs/03-implementation.md` |
| **sdk-har-demo** | `json-schema/04-har-demo.schema.json` | `docs/04-har-demo.md` |
| **sdk-evaluation** | `json-schema/05-evaluation.schema.json` | `05-evaluation-report.md` 按 prompt 生成 |

---

## 补充说明文档（Markdown）

`docs/` 子目录包含人类可读的字段说明和报告模板，作为 JSON Schema 的补充参考。

| 文件 | 内容 |
|------|------|
| `docs/01-analysis.md` | `01-analysis.json` + `01-analysis-report.md` — 阶段 01 产物 |
| `docs/01-analysis-prd.md` | `01-analysis-prd.md` 的生成模板与编写规范（**PRD 唯一权威模板**） |
| `docs/02-planning.md` | `02-planning.json` + `02-planning-report.md` — 阶段 02 产物 |
| `docs/03-implementation.md` | `03-implementation.json` + `03-implementation-report.md` — 阶段 03 产物 |
| `docs/04-har-demo.md` | `04-har-demo.json` + `04-har-demo-report.md` — 阶段 04 产物 |

> **注意**：profile 的 `additionalReports` 必须与 prompt 输出要求保持一致；不需要的附加报告不要在 profile 中声明。
