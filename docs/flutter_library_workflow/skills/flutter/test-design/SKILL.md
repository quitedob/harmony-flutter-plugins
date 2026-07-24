# test-design - 测试设计主 Agent Skill

## 概述

`test-design` Skill 是测试设计主 Agent，负责编排 5 个 SubAgent 完成端到端的测试设计流程。

**适用范围**：Flutter/RN/原生库鸿蒙化适配测试设计  
**输入**：PRD 文档路径、输出目录  
**输出**：00~05 所有测试设计产物

---

## 输入参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `prd_path` | 否 | `.ohos-adaptation/01-analysis-prd.md` | PRD 文档路径 |
| `output_dir` | 否 | `.ohos-adaptation` | 输出目录 |
| `stage` | 否 | `all` | 执行特定阶段（requirement-parse/test-analysis/analysis-review/test-case-gen/case-review） |
| `continue_from` | 否 | `none` | 从指定阶段继续执行 |
| `verbose` | 否 | `false` | 输出详细日志 |

---

## SubAgent 列表

| SubAgent | 调用时机 | 输入 | 输出 |
|----------|----------|------|------|
| requirement-parse | 阶段 1 | PRD 文档 | 00-requirement.json, 00-requirement-report.md |
| test-analysis | 阶段 2 | 需求解析结果 | 02-test-analysis-report.md, 02-test-points.json |
| analysis-review | 阶段 3 | 测试分析报告 | 03-analysis-review-report.md, 03-analysis-review.json |
| test-case-gen | 阶段 4 | 评审后的测试分析报告 | 04-test-cases.md, 04-test-cases.json |
| case-review | 阶段 5 | 测试用例 | 05-case-review-report.md, 05-case-review.json |

---

## 执行流程

### 阶段 1：需求解析

**SubAgent**: `requirement-parse`

**执行步骤**:
1. 调用 SubAgent `requirement-parse`
2. 验证输出文件存在
3. 检查 JSON 格式有效性
4. 检查模块数 > 0

**失败处理**: 重试最多 2 次

---

### 阶段 2：测试分析

**SubAgent**: `test-analysis`

**执行步骤**:
1. 调用 SubAgent `test-analysis`，传入需求解析结果
2. 验证输出文件存在
3. 执行章节完整性检查（1.1~4.4 共 22 个章节）
4. 验证测试点描述规范

**失败处理**: 重试最多 2 次

---

### 阶段 3：报告评审

**SubAgent**: `analysis-review`

**执行步骤**:
1. 调用 SubAgent `analysis-review`
2. 读取评审结果 JSON
3. 检查评审结论

**失败处理**: 修订后重试最多 3 次

---

### 阶段 4：测试用例生成

**SubAgent**: `test-case-gen`

**执行步骤**:
1. 调用 SubAgent `test-case-gen`，传入评审后的测试分析报告
2. 验证输出文件存在
3. 执行三方一致性校验

**失败处理**: 重试最多 2 次

---

### 阶段 5：用例评审

**SubAgent**: `case-review`

**执行步骤**:
1. 调用 SubAgent `case-review`
2. 读取评审结果 JSON
3. 检查评审结论

**失败处理**: 修订后重试最多 3 次

---

## 阶段统计

| 阶段 | SubAgent | 产物 | 验证项 |
|------|----------|------|--------|
| 1 | requirement-parse | 00-requirement.* | JSON 格式、模块数>0 |
| 2 | test-analysis | 02-test-analysis.* | 章节完整、测试点规范 |
| 3 | analysis-review | 03-analysis-review.* | 评审结论 |
| 4 | test-case-gen | 04-test-cases.* | 三方一致性 |
| 5 | case-review | 05-case-review.* | 评审结论 |

---

## 输出产物

完整流程执行后生成 10 个文件：

```
{output_dir}/
├── 00-requirement.json
├── 00-requirement-report.md
├── 02-test-analysis-report.md
├── 02-test-points.json
├── 03-analysis-review-report.md
├── 03-analysis-review.json
├── 04-test-cases.md
├── 04-test-cases.json
├── 05-case-review-report.md
└── 05-case-review.json
```

---

## 错误处理

### 错误类型

| 错误类型 | 错误码 | 处理方式 |
|----------|--------|----------|
| PRD 文件不存在 | ERR_PRD_NOT_FOUND | 报告用户，终止流程 |
| PRD 解析失败 | ERR_PRD_PARSE_FAILED | 重试 2 次，仍失败则终止 |
| SubAgent 调用失败 | ERR_SUBAGENT_FAILED | 重试 2 次，仍失败则终止 |
| 格式验证失败 | ERR_FORMAT_INVALID | 重试 2 次，仍失败则终止 |
| 评审不通过 | ERR_REVIEW_FAILED | 修订后重试 3 次，仍失败则终止 |

### 错误报告格式

```
❌ 错误：{错误类型}
错误码：{ERR_XXX}
详情：{详细描述}
建议操作：{建议的下一步}
```

---

## 配置

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `max_retries` | 2 | 最大重试次数（评审阶段除外） |
| `review_max_retries` | 3 | 评审阶段最大重试次数 |
| `enable_auto_revision` | true | 是否自动修订 |

---

## 相关资源

| 资源 | 路径 |
|------|------|
| 主 Agent Prompt | `.claude/prompts/test/test-design-master.md` |
| 需求解析 Prompt | `.claude/prompts/test/primary-01-requirement-parse.md` |
| 测试分析 Prompt | `.claude/prompts/test/primary-02-test-analysis.md` |
| 报告评审 Prompt | `.claude/prompts/test/primary-03-analysis-review.md` |
| 用例生成 Prompt | `.claude/prompts/test/primary-04-test-case-gen.md` |
| 用例评审 Prompt | `.claude/prompts/test/primary-05-case-review.md` |

---

*本文档最后更新：2026-04-14*
