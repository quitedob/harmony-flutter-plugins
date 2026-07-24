# case-review - 测试用例评审 Skill

## 概述

`case-review` Skill 专门用于评审测试用例（阶段 4 产物）的质量和规范性。

**适用范围**：
- 测试用例评审（阶段 5）
- 评审对象：`04-test-cases.md`、`04-test-cases.json`、`02-test-points.json`

---

## 输入参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `review_type` | 是 | 固定为 `test_cases` |
| `input_files` | 是 | 输入文件路径数组：`[04-test-cases.md, 04-test-cases.json, 02-test-points.json, 02-test-analysis-report.md, 00-requirement.json]` |
| `output_dir` | 否 | 输出目录（默认为 `.ohos-adaptation`） |

---

## 输出文件

| 文件 | 说明 |
|------|------|
| `{output_dir}/05-case-review.json` | 评审结果 JSON |
| `{output_dir}/05-case-review-report.md` | 评审报告 Markdown |
| `{output_dir}/04-test-cases-revised.md` | 修订后的测试用例（如有修改） |

---

## 评审维度

| 维度 | 权重 | 通过线 | 评审重点 |
|------|------|--------|----------|
| 覆盖率 | 35% | ≥85 分 | 功能模块覆盖、测试点覆盖、API 覆盖、测试类型覆盖 |
| 可执行性 | 30% | ≥80 分 | 步骤清晰性、操作可行性、前置/后置条件明确 |
| 可判定性 | 20% | ≥80 分 | 预期结果明确、验证点具体、无歧义 |
| 规范性 | 15% | ≥75 分 | 测试标题规范、测试步骤规范、API 备注规范、用例 ID 规范 |

**通过标准**：总体≥80 分 且 各维度均达标

---

## 执行步骤

### 步骤 1：读取评审材料

读取以下文件：
- `.ohos-adaptation/04-test-cases.md` - 测试用例 Markdown
- `.ohos-adaptation/04-test-cases.json` - 测试用例 JSON
- `.ohos-adaptation/02-test-points.json` - 测试点汇总 JSON
- `.ohos-adaptation/02-test-analysis-report.md` - 测试分析报告
- `.ohos-adaptation/00-requirement.json` - 需求解析 JSON

### 步骤 2：执行三方比对校验

> **校验代码**：见 `references/three-way-verification.md`

**校验内容**：
1. 模块数校验：测试点 JSON = 测试用例 JSON = 测试用例 Markdown
2. 用例总数校验：三方一致
3. 级别分布校验：L0/L1/L2/L3 各级别数量一致
4. 模块级用例数校验：每个模块的用例数一致

**校验失败处理**：任何一项校验失败，评审直接判定为**不通过**。

### 步骤 3：执行覆盖率评审

**检查清单**：
- [ ] 所有功能模块都有测试用例
- [ ] 测试分析报告中的所有测试点都有用例对应
- [ ] 所有 API 接口都有用例覆盖
- [ ] 正常流程、异常流程、边界条件测试用例完整
- [ ] L0-L3 级别分布合理（L0:25-35%, L1:40-50%, L2:15-25%, L3:0-5%）

> **详细检查清单**：见 `references/review-guide.md`「二、评审检查清单」

### 步骤 4：执行可执行性评审

**检查清单**：
- [ ] 每个测试步骤都是用户可在 UI 上执行的操作
- [ ] 无"调用 XXX 方法"等代码级描述
- [ ] 输入操作指定了具体的输入框和输入内容
- [ ] 点击操作指定了具体的按钮
- [ ] 前置条件是测试执行前可检查的状态
- [ ] 后置条件是测试执行后可恢复的状态

> **详细检查清单**：见 `references/review-guide.md`「二、评审检查清单」

### 步骤 5：执行可判定性评审

**检查清单**：
- [ ] 预期结果具体明确，可判定 pass/fail
- [ ] 无"功能执行正确，结果符合预期"等模糊描述
- [ ] 无"可能"、"大概"、"应该"等不确定词汇
- [ ] 验证点与测试步骤一一对应
- [ ] 用例描述无歧义

> **详细检查清单**：见 `references/review-guide.md`「二、评审检查清单」

### 步骤 6：执行规范性评审（含模板格式检查）

**检查清单**：

#### 6.1 测试用例格式规范

- [ ] 测试标题使用黑盒功能视角描述
- [ ] 测试步骤使用纯黑盒描述（点击、输入等 UI 操作）
- [ ] 预期结果使用功能视角描述
- [ ] API 信息在步骤后括号内备注
- [ ] API 备注格式统一：`(API: methodName, 参数：key=value)`
- [ ] 用例 ID 符合规范（模块 ID+ 序号，如 F01-001）
- [ ] Markdown 表格格式正确
- [ ] JSON 格式有效
- [ ] JSON 与 Markdown 内容一致

#### 6.2 平台无关性检查（重要）

- [ ] 测试用例中不包含 "Android"、"iOS" 等平台特定词汇
- [ ] 测试用例中不包含源平台特有的版本号（如 "Android 12+"、"iOS 15+"）
- [ ] 测试用例中不包含源平台特有的 API 名称（如 "BLUETOOTH_CONNECT"）
- [ ] 平台版本示例应使用 "HarmonyOS NEXT" 或 "API XX"
- [ ] 权限、功能等描述应使用鸿蒙平台的通用术语

> **注意**：测试用例是针对鸿蒙化后的测试分析，不应体现源平台（Android、iOS）的特定内容。发现平台特定内容应记录为规范性问题。

#### 6.3 测试用例模板格式检查

**测试用例表格格式验证**（如使用表格格式）：
- [ ] 表头格式：`| 项目 | 内容 |`
- [ ] 必须包含的行：用例 ID、测试点级别、前置条件、测试步骤、预期结果、后置条件、覆盖 API
- [ ] 测试步骤使用有序列表格式，每个步骤包含 action 和 checkpoint

**测试用例结构验证**：
- [ ] 每个用例包含：id、moduleCode、moduleName、title、level、preconditions、testSteps、expectedResult、postconditions、coveredAPI
- [ ] 测试步骤数组中每个元素包含：action（操作描述）、checkpoint（验证点）
- [ ] 前置条件和后置条件使用分号分隔多个条件

#### 6.4 文档结构验证

**测试用例 MD 文档结构**：
- [ ] 文档信息表：包含插件名称、版本、测试用例总数、最后更新日期
- [ ] 测试用例级别分布表：包含级别、数量、占比
- [ ] 按模块分章节：`## F-01 模块：{模块名称}`
- [ ] 每个用例使用表格格式或结构化格式呈现
- [ ] 附录：测试用例执行顺序建议

**验证方法**：
- 使用脚本验证：`python scripts/verify_test_cases_format.py <test_cases_file_path>`
- 手动验证：检查 Markdown 文件结构和表格格式

### 步骤 7：计算得分和通过状态

> **评分标准**：见 `references/review-guide.md`「三、评分标准」

> **通过标准**：见 `references/review-guide.md`「四、通过标准」

### 步骤 8：生成评审报告（含模板格式检查）

> **报告模板**：见 `assets/review-report-template.md`

> **JSON Schema**：见 `assets/case-review-schema.json`

#### 模板格式检查清单

**评审报告必须包含的章节**：
- [ ] 一、三方比对校验结果（模块数、用例总数、级别分布）
- [ ] 二、评审结果汇总（四个维度得分表）
- [ ] 三、详细评审结果（覆盖率、可执行性、可判定性、规范性）
- [ ] 四、修订建议（必须修订项、建议修订项）
- [ ] 五、评审结论

**评审报告表格格式**：
- [ ] 三方比对表：使用 `| 来源 | 用例总数 |` 或 `| 来源 | L0 | L1 | L2 | L3 |` 表头
- [ ] 评审结果汇总表：使用 `| 评审维度 | 得分 | 通过状态 |` 表头
- [ ] 详细评审表：使用 `| 检查项 | 状态 | 说明/问题项 |` 表头

**格式验证脚本**：
- 使用脚本验证：`python scripts/verify_test_cases_format.py <review_report_file_path>`

---

## 测试用例质量标准

### 纯黑盒视角（核心原则）

- ✅ **必须**：测试步骤描述用户界面操作（点击、输入、等待、观察状态变化等）
- ✅ **必须**：API 信息在步骤后的括号内备注
- ✅ **必须**：测试标题和预期结果使用功能视角描述，不体现 API 调用
- ❌ **禁止**：直接写 API 调用代码
- ❌ **禁止**：使用"调用"、"访问"、"返回"、"订阅"等 API 层面词汇

### API 备注格式

```
格式：(API: ClassName.methodName, 参数名：值)

示例：
- (API: encrypt, text: "Hello", key: "0102030405060708")
- (API: decrypt, text: encryptedText)
- (API: cancel)
```

### 测试用例结构

```json
{
  "id": "F01-001",
  "title": "能正常显示默认 Toast",
  "level": "L0",
  "preconditions": "应用已启动；功能界面已打开",
  "test_steps": [
    {"action": "点击【显示 Toast】按钮", "checkpoint": "验证点描述"}
  ],
  "expected_result": "Toast 显示默认消息，约 2 秒后自动消失",
  "postconditions": "可返回上一级或桌面"
}
```

---

## 校验失败处理

**三方比对校验失败**：
- 任何一项校验失败，评审直接判定为**不通过**
- 在评审报告中明确列出不一致的详情
- 要求重新生成上一阶段的产物

**其他评审维度不通过**：
- 维度得分低于通过线，记录问题项
- 总体得分低于 80 分，评审结论为**不通过**
- 总体得分≥80 分但有维度不达标，评审结论为**有条件通过**

---

## 相关资源

| 资源 | 路径 | 用途 |
|------|------|------|
| 评审指南 | `references/review-guide.md` | 评审检查清单、评分标准、通过标准 |
| 三方比对校验 | `references/three-way-verification.md` | 程序化校验代码 |
| 测试用例格式验证 | `scripts/verify_test_cases_format.py` | 测试用例格式验证 |
| 评审报告格式验证 | `scripts/verify_review_format.py` | 评审报告格式验证 |
| 评审报告模板 | `assets/review-report-template.md` | 评审报告格式模板 |
| JSON Schema | `assets/case-review-schema.json` | 评审结果 JSON Schema |

---

*本文档最后更新：2026-04-12*
