---
name: 04-testcase-gen
description: 基于 PRD + 已实现方法清单生成 droidrun 测试套件（最多 5 条 L0 核心黑盒用例）。遵从 HarmonyOS-AI/json-schema 的 droidrun/test_suite.schema.json，并生成配套的 suite.agent_prompt 与 suite.app_card 文件。专用于 primary-04-testing agent 的单用例串行执行闭环。
---

# 04-testcase-gen — droidrun 测试用例生成 Skill

## 一、用途

为 **primary-04-testing** agent 生成可被 `droidrun test` 直接消费的测试套件，以及配套的行为约束文件。

- **输入**：前序阶段产物 + Example 源码
- **输出**：`.ohos-adaptation/` 下 4 份文件（见第四节）
- **不负责**：跑 droidrun、解析结果、修 bug

### 核心约束

1. 顶层只有 `suite` + `test_cases`（**平铺数组**，没有 `modules`）。Schema：[droidrun/test_suite.schema.json](https://raw.githubusercontent.com/HarmonyOS-AI/json-schema/main/droidrun/test_suite.schema.json)
2. 只生成 L0 核心用例，**最多 5 条**，且每条都必须覆盖 PRD 中最核心、最高频、最能代表插件价值的功能。
3. **黑盒视角**：action 是用户可做的 UI 动作，checkpoint 是肉眼可见的状态。API 名称仅作为备注放在 `(API: xxx)` 括号里。
4. 不得为了好过测试而降低用例标准。

---

## 二、输入

| 文件 | 用途 |
|------|------|
| `.ohos-adaptation/01-analysis-prd.md` | PRD，checkpoint 的行为依据 |
| `.ohos-adaptation/03-coding-library.json` → `implemented_methods` | 用例覆盖范围 |
| `pubspec.yaml` → `name` | `suite.id` / `suite.name` |
| `example/ohos/AppScope/app.json5` → `bundleName` | `suite.app_package` |
| `example/lib/**/*.dart` | 确认 UI 入口是否存在 |

缺 `implemented_methods` 或 `example/` 则报错退出。

---

## 三、生成规则

### 3.1 suite 字段

```json
{
  "suite": {
    "id": "{plugin_name}_test_suite",
    "name": "{plugin_name} 测试套件",
    "app_package": "{bundleName}",
    "app_card": "file:./04-droidrun--app-card.md",
    "agent_prompt": "file:./04-droidrun--agent-prompt.md"
  }
}
```

`file:` 是 schema 允许的相对引用，droidrun 会读成字符串注入 system prompt。

### 3.2 test_cases 结构

```json
{
  "id": "C-001",
  "title": "{简短测试目标}",
  "level": "L0",
  "preconditions": "应用已启动并停留在首页",
  "test_steps": [
    { "action": "点击【模块名】进入模块列表页", "checkpoint": "模块页正常显示用例列表" },
    { "action": "点击【用例标题】进入用例详情页", "checkpoint": "用例详情页显示测试信息和操作按钮" },
    { "action": "点击【功能按钮】按钮 (API: methodName)", "checkpoint": "【结果】面板显示 {PRD 定义的可观察状态}" }
  ],
  "expected_result": "{从 PRD 抄写的可观察行为}"
}
```

- 用例 id 平铺编号 `C-001` / `C-002` …
- **API 名称必须出现在 action 的 `(API: xxx)` 里**，后续 agent 正则 `\(API: ([^,)]+)` 提取 `covered_apis`，这是唯一依据。
- UI 元素用 `【XX】` 标注。其他写法自行判断即可（详见 `references/blackbox-ui-guide.md`）。

### 3.3 用例数量与覆盖

| `implemented_methods` 数 | 用例数 |
|---|---|
| 1~5 | 不超过方法数；仅覆盖 PRD 中最核心的功能场景 |
| > 5 | 最多 5 条，按 PRD 优先级裁剪到最核心的 5 个功能场景，其余写入 `deferred_methods` |

每条用例至少覆盖一个 `implemented_methods` 的方法；当方法数超过 5 个时，优先选择用户最高频入口、主流程必需能力、权限/回调/异步链路等最能暴露运行态问题的核心功能。

### 3.4 UI 入口缺失处理

扫描 `example/lib/` 匹配按钮与已实现方法。method 没有对应 UI 入口时，仍生成用例（使用建议按钮名），并写入返回值的 `ui_gap` 清单：`{ method, suggested_button_text, suggested_key }`，交由 agent 补 UI。

---

## 四、输出文件（都写到 `.ohos-adaptation/`）

### 4.1 `04-droidrun-test-cases.json`
droidrun 套件 JSON。参考 `assets/test-suite-template.json`。

### 4.2 `04-droidrun-test-cases.md`
人类可读的表格 + 详情：

```markdown
# {plugin_name} 测试套件（共 N 条 L0 用例）

| 用例 ID | 标题 | 覆盖 API | 步骤数 |
|--------|------|---------|--------|
| C-001 | ... | showToast | 3 |

## 详情
### C-001 {title}
- 前置：...
- 步骤：1. ...
- 预期：...
```

### 4.3 `04-droidrun--agent-prompt.md`
写给 droidrun 内部 LLM 的行为约束，骨架见 `assets/agent-prompt-template.md`。按插件特性补充慢操作/权限等提示。

### 4.4 `04-droidrun--app-card.md`
应用卡片，骨架见 `assets/app-card-template.md`。从 PRD 和 `example/lib/` 实际页面类名补齐。

---

## 五、执行流程

1. 读取输入，缺失则报错
2. 解析 `implemented_methods`，按 3.3 生成最多 5 条核心用例
3. 扫描 `example/lib/` 建立 method → UI 入口映射
4. 逐方法生成用例：从 PRD 抄 expected_result，拼三级页面导航
5. 生成 `04-droidrun--agent-prompt.md` / `04-droidrun--app-card.md`
6. 写 `04-droidrun-test-cases.json` 与 `04-droidrun-test-cases.md`
7. 返回：`{ files_written, total_cases, covered_methods, ui_gap, deferred_methods }`

---

## 六、返回前自检

- [ ] JSON 顶层只有 `suite` + `test_cases`；`suite` 含 `id`/`name`/`app_package`
- [ ] `suite.agent_prompt` = `"file:./04-droidrun--agent-prompt.md"`，`suite.app_card` = `"file:./04-droidrun--app-card.md"`
- [ ] 每条用例含 `id`/`title`/`level: "L0"`/`test_steps`/`expected_result`
- [ ] 每个 action 含 `【】` UI 元素标注，API 名在 `(API: xxx)` 括号里
- [ ] checkpoint 是可观察的 UI 状态（文本/页面/按钮变化），不是 "返回 true"、"无崩溃" 这类
- [ ] 用例数最多 5 条，全部 L0，且每条至少覆盖 1 个 `implemented_methods`
- [ ] 文本不含 "Android"/"iOS" 与源平台 API 名

---

## 七、资源

| 资源 | 路径 |
|------|------|
| suite JSON 模板 | `assets/test-suite-template.json` |
| agent_prompt 模板 | `assets/agent-prompt-template.md` |
| app_card 模板 | `assets/app-card-template.md` |
| 黑盒 UI 指南 | `references/blackbox-ui-guide.md` |
