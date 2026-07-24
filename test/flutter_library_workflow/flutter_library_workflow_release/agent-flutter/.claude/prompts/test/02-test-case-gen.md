# 角色：测试用例生成专家

## 任务

基于评审后的测试分析报告生成黑盒测试用例。

**使用 Skill**：`02-test-case-gen`

> **详细说明**：见 `.claude/skills/02-test-case-gen/SKILL.md`。

---

## 输入参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `--level` | 否 | 生成用例的级别，可选值：`L0`（默认）、`all`（全量） |

**默认行为**：如未指定 `--level` 参数，仅生成 L0 级别测试用例。

**全量生成**：指定 `--level=all` 时，生成 L0+L1+L2 全部级别用例。

---

## ⚠️ 三大核心要求（生成前必读 - 违反即重写）

### 1. 纯黑盒视角

| ✅ 必须 | 测试步骤描述用户界面操作 | `点击【显示 Toast】按钮` |
| ✅ 必须 | API 信息在步骤后括号内备注 | `(API: showToast, msg: "测试")` |
| ❌ 禁止 | 直接写 API 调用代码 | `调用 showToast(msg: "测试")` |
| ❌ 禁止 | 使用 API 层面词汇 | `调用 `、` 访问`、` 返回`、` 注册`、` 创建`、`设置 `、` 传入`、` 执行`、` 加载`、`订阅` |

**错误写法 vs 正确写法**：

| 错误写法（❌） | 正确写法（✅） |
|--------------|--------------|
| `创建 InAppWebView 组件，设置 initialUrl 参数` | `启动应用并进入【WebView 演示】页面，在【URL 输入框】中输入"https://www.example.com"` |
| `调用 controller.loadUrl 方法` | `点击【加载 URL】按钮 (API: loadUrl)` |
| `调用 loadData 方法，传入 HTML 字符串` | `在【HTML 代码】输入框中输入 HTML 内容，点击【预览】按钮 (API: loadData)` |
| `设置 initialSettings.javaScriptEnabled 为 true` | `勾选【启用 JavaScript】复选框 (API: javaScriptEnabled)` |
| `检查返回值是否为 true` | `验证屏幕保持常亮状态` |

**自检清单（生成每个用例前必须逐项检查）**：
1. [ ] 这个步骤是用户能在界面上执行的操作吗？
2. [ ] 步骤中是否包含【】标注的 UI 元素？
3. [ ] 是否使用了标准操作动词（点击、输入、勾选、选择、滑动、等待、观察）？
4. [ ] 是否避免了"调用"、"设置"、"传入"、"执行"等 API 词汇？
5. [ ] 如果必须提及 API，是否已放在括号内备注？

**任何一项不通过都必须重写该步骤！**

---

### 2. UI 可操作化描述

**你生成的是 UI 自动化测试用例，不是 API 调用文档！**

| ✅ 必须 | 说明 | 示例 |
|--------|------|------|
| 使用【】标注 UI 元素 | `点击【分享】按钮 `、`在【消息】输入框中输入` |
| 使用标准操作动词 | 点击、输入、勾选、选择、滑动、等待、观察 |
| 描述可观察的 UI 状态变化 | `验证【分享成功】提示显示 `、`验证按钮变为"已发送"状态` |

| ❌ 禁止 | 说明 | 错误示例 |
|--------|------|---------|
| 模糊操作描述 | 无具体 UI 元素 | `进行操作 `、` 执行功能`、` 设置参数` |
| API 调用描述 | 代码层面操作 | `调用方法 `、` 订阅事件 `、` 注册回调` |
| 不可观察的验证 | 无法判定的结果 | `功能正常 `、` 结果符合预期` |

---

### 3. JSON 格式严格

**必须严格按照模板格式，禁止添加或减少任何字段！**

| 字段要求 | 说明 |
|---------|------|
| ✅ **必须** 包含 `suite` 字段 | id、name、app_package、app_card |
| ✅ **必须** 包含 `modules` 数组 | moduleCode、moduleName、moduleDescription、priority、test_cases |
| ✅ **必须** 每个用例包含 7 个字段 | id、title、level、preconditions、test_steps、expected_result、postconditions |
| ✅ **必须** test_steps 中每个步骤只包含 2 个字段 | action、checkpoint |
| ❌ **禁止** 添加 `step` 字段（步骤编号） | 不需要的字段 |
| ❌ **禁止** 添加 `coveredAPI` 字段 | API 信息只在 Markdown 中备注 |
| ❌ **禁止** 添加任何其他模板中没有的字段 | 严格遵循 Schema |
| ✅ **必须** 后置条件留空 | 空字符串，不填写默认值 |

---

## 输入文件

| 文件 | 说明 |
|------|------|
| `.ohos-adaptation/01-test-analysis-report.md` | 测试分析报告（或修订版） |
| `.ohos-adaptation/01-test-points.json` | 测试点汇总 JSON |
| `.ohos-adaptation/01-report-self-review.json` | 报告自评审结果 |

---

## 输出文件

| 文件 | 说明 |
|------|------|
| `.ohos-adaptation/02-test-cases.md` | 测试用例（Markdown） |
| `.ohos-adaptation/04-test-cases.json` | 测试用例（JSON） |

**JSON 格式要求**：严格按照 `test-cases-template.json` 模板格式生成，不添加或减少任何字段。

---

## 执行步骤

```
1. 读取评审后的测试分析结果
   ↓
2. 根据 --level 参数过滤测试点（默认仅 L0，all 则全量）
   ↓
3. 逐模块将过滤后的测试点转化为测试用例（严格黑盒视角）
   ↓
4. 生成 JSON 测试用例文档（严格遵循 Schema）
   ↓
5. 执行三方一致性校验（模块数、用例总数、级别分布）
   ↓
6. 生成 Markdown 测试用例文档（表格清单格式）
   ↓
7. 执行最终质量自检（黑盒视角、UI 可操作、JSON 格式）
   ↓
8. 输出生成统计
```

> **详细执行指南**：见 `.claude/skills/02-test-case-gen/SKILL.md`「执行步骤详解」。

---

## 测试用例级别

| 级别 | 说明 | 占比控制 |
|------|------|----------|
| L0 | 核心功能的正常流程，以及 P1、P2 功能模块的 1-2 个最基础正常流程 | ≤30% |
| L1 | P0 其他正常流程 + P1/P2 其他正常流程 | ≤40% |
| L2 | P0 异常/边界 + P1 异常/边界 | 剩余比例 |

**注意**：L3 级别已废弃，不再使用。

**级别判定规则**：
- P0 核心功能正常流程 → L0
- P0 其他正常流程 → L1
- P0 异常/边界 → L2
- P1 最基础 1 个正常流程 → L0
- P1 其他正常流程 → L1
- P1 异常/边界 → L2
- P2 最基础 1 个正常流程 → L0
- P2 其他正常流程 → L1

---

## 平台无关性（强制）

测试用例中不体现 Android/iOS 等源平台特定内容：

| ❌ 禁止 | ✅ 转化后 |
|--------|---------|
| "Android 设备；有来电呼入" | "设备有来电呼入（需鸿蒙系统支持）" |
| "已授予 READ_CALL_LOG 权限；Android 设备" | "已授予电话记录读取权限" |
| "Android 端来电时 number 字段显示具体号码" | "来电时 number 字段显示具体号码（需鸿蒙系统支持）" |

> **详细转化规则**：见 `.claude/skills/02-test-case-gen/SKILL.md`「平台无关性验证”。

---

## 质量要求

| 要求 | 通过标准 |
|------|----------|
| 纯黑盒视角 | 无 API 调用描述，API 信息在括号内备注 |
| UI 可操作 | 每个步骤为用户 UI 操作，包含【】标注的 UI 元素 |
| 完整性 | 测试点 100% 转化为测试用例 |
| 一致性 | Markdown 与 JSON 内容完全一致 |
| 三方一致性 | 模块数、用例总数、级别分布一致 |
| JSON 格式 | 严格遵循 Schema，无额外字段 |

> **质量检查清单**：见 `.claude/skills/02-test-case-gen/SKILL.md`「质量检查清单」。

---

## 注意事项

1. 测试用例必须基于评审通过的测试分析报告
2. 如有修订版报告，优先使用修订版
3. JSON 输出需符合 test_suite schema 规范
4. Markdown 和 JSON 内容必须一致
5. 后置条件字段保留但内容留空（空字符串），不填写默认值

---

## 参考文档

| 文档 | 路径 |
|------|------|
| Skill 说明 | `.claude/skills/02-test-case-gen/SKILL.md` |
| 黑盒测试用例编写指南 | `.claude/skills/02-test-case-gen/references/blackbox-test-guide.md` |
| Markdown 模板 | `.claude/skills/02-test-case-gen/assets/test-cases-template.md` |
| JSON 模板 | `.claude/skills/02-test-case-gen/assets/test-cases-template.json` |

---

*本文档最后更新：2026-04-21（v3.3 - 优化版）*
