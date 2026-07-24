# sdk-test-case-gen - SDK 测试用例生成 Skill

## 概述

基于 SDK 测试分析报告生成纯黑盒测试用例，输出 Markdown 和 JSON 格式。

**适用范围**：SDK 测试用例生成阶段
**输入**：测试分析报告、功能点汇总 JSON
**输出**：测试用例 Markdown、测试用例 JSON

**核心模型**：模块 1──N 功能点 1──1 测试用例（用例 `id == featurePointId`）。一个功能点 = 一个用户可感知能力 / 单一验证目标，可由多个协同 API 实现。**每个功能点转化为一条测试用例（1:1）**。

---

## 一、输入参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `--level` | 否 | `L0` | 生成用例的级别，可选值：`L0`（默认）、`all`（全量） |

---

## 二、⚠️ 纯黑盒视角（强制约束）

### 2.1 核心原则

**你生成的是 UI 自动化测试用例，不是 API 调用文档！**

| ✅ 必须 | 测试步骤描述用户界面操作（点击、输入、等待、观察等） |
| ✅ 必须 | 步骤只写平台无关的功能语义，API 信息记入用例级 `coveredApis.android` |
| ❌ 禁止 | 直接写 API 调用代码 |
| ❌ 禁止 | 使用 API 层面词汇 |
| ❌ 禁止 | 步骤内出现 API 名，或追加 `(API: methodName)` 备注 |

**禁止词汇列表**：调用、访问、返回、注册、创建、订阅、设置、传入、执行、加载

> **为何步骤内不写 API**：同一功能点在 Android 与 HarmonyOS 上 API 集合不同，无法一一映射。把 API 烤进步骤会让用例绑死 Android API。改为 `coveredApis` 元数据后，步骤是平台无关的功能语义，鸿蒙无论用什么 API 实现都适用。

### 2.2 自检清单

在生成每个测试用例前，必须自问：

1. [ ] 这个步骤是用户能在界面上执行的操作吗？
2. [ ] 步骤中是否包含【】标注的 UI 元素？
3. [ ] 是否使用了标准操作动词（点击、输入、勾选、选择、滑动、等待、观察）？
4. [ ] 是否避免了"调用"、"设置"、"传入"、"执行"等 API 词汇？
5. [ ] 步骤内是否**完全没有** API 名 / `(API: ...)` 备注？（API 必须只记入 `coveredApis.android`）
6. [ ] `coveredApis.android` 是否覆盖了该功能点实现所用的全部 API？`coveredApis.harmony` 是否留空 `[]`？
7. [ ] `featurePointId` 是否等于 `id`？

---

## 三、UI 可操作性原则

### 3.1 标准操作动词表

| 操作类型 | 动词 | 示例 |
|----------|------|------|
| 点击操作 | 点击、按压 | `点击【确定】按钮`、`按压【Home】键` |
| 输入操作 | 输入、清除、填写 | `在【配置】输入框中输入"测试值"` |
| 选择操作 | 选择、取消选择、勾选 | `选择【同意】复选框` |
| 滑动操作 | 滑动、滚动、拖动 | `向上滑动屏幕` |
| 导航操作 | 打开、进入、返回、跳转 | `打开【设置】页面` |
| 等待操作 | 等待、暂停 | `等待 3 秒` |
| 观察操作 | 观察、验证、确认 | `观察【状态】文本显示"正常"` |

### 3.2 UI 元素命名规范

| UI 元素类型 | 命名格式 | 示例 |
|------------|---------|------|
| 按钮 | 【XX】按钮 | `【初始化】按钮`、`【发送】按钮` |
| 输入框 | 【XX】输入框 | `【消息】输入框`、`【URL】输入框` |
| 文本 | 【XX】文本 | `【状态】文本`、`【错误提示】文本` |
| 列表/选项 | 【XX】列表/选项 | `【功能】列表`、`【第一个】选项` |
| 页面/界面 | 【XX】页面/界面 | `【设置】页面`、`【详情】界面` |
| 开关 | 【XX】开关 | `【启用】开关` |
| 下拉菜单 | 【XX】下拉菜单 | `【模式】下拉菜单` |

---

## 四、SDK 类型与测试策略

**统一原则**：所有 SDK 类型都需要转换成 UI 元素操作，假设 SDK 有一个 HAR Demo 界面。

> 下表「转换示例」中步骤均为**纯功能语义、不含 API 名**；对应 API 记入用例级 `coveredApis.android`（见括号内说明，仅用于讲解，不写进步骤）。

| SDK 类型 | 特征 | 测试步骤描述方式 | 转换示例（步骤 + coveredApis） |
|----------|------|-----------------|---------|
| **平台交互类** | 调用系统 API | 转换为 UI 操作（打开功能、授权权限、观察反应） | 步骤：`点击【获取位置】按钮`、`验证【位置信息】文本显示经纬度`；`coveredApis.android: ["getLocation"]` |
| **业务功能类** | 封装业务逻辑 | 转换为 UI 操作（输入数据、执行操作、验证结果） | 步骤：`在【输入】框中输入数据`、`点击【发送】按钮`；`coveredApis.android: ["sendMessage"]` |
| **数据处理类** | 数据计算/编解码 | 转换为 UI 操作（输入数据、执行操作、验证输出） | 步骤：`在【输入】框中输入编码数据`、`点击【解码】按钮`；`coveredApis.android: ["decode"]` |
| **UI 组件类** | 提供可视化组件 | 直接描述 UI 操作 | 步骤：`点击【展示组件】按钮`；`coveredApis.android: ["showComponent"]` |
| **原生库类** | 涉及 NAPI 桥接 | 转换为 UI 操作（触发桥接、验证结果） | 步骤：`点击【执行计算】按钮`；`coveredApis.android: ["nativeCompute"]` |

> **一个功能点可由多个协同 API 实现 → 一条用例多步骤**。例如功能点「显示下载进度」由 `setMax` + `setProgress` 协同实现：步骤写 `设置进度上限为 100`、`将进度设置为 50%`、`观察【进度条】显示 50%`，`coveredApis.android: ["setMax", "setProgress"]`。

---

## 五、JSON 格式模板

### 5.1 完整 Schema

**必须严格按照以下格式，不添加或减少任何字段**：

```json
{
  "$schema": "https://raw.githubusercontent.com/HarmonyOS-AI/json-schema/main/droidrun/test_suite.schema.json",
  "suite": {
    "id": "{sdk_name}_test_suite",
    "name": "{sdk_name} 测试套件",
    "app_package": "{app_package}",
    "app_card": "file:./01-analysis-prd.md"
  },
  "modules": [
    {
      "moduleCode": "F-01",
      "moduleName": "{模块名称}",
      "moduleDescription": "{模块描述}",
      "priority": "{P0/P1/P2}",
      "test_cases": [
        {
          "id": "F-01-01",
          "featurePointId": "F-01-01",
          "title": "{用例标题}",
          "level": "{L0/L1/L2}",
          "coveredApis": {
            "android": ["{android API 1}", "{android API 2}"],
            "harmony": []
          },
          "preconditions": "应用已启动",
          "test_steps": [
            {
              "action": "点击【{模块名}】进入模块列表页",
              "checkpoint": "{验证点}"
            },
            {
              "action": "点击【{用例标题}】进入用例详情页",
              "checkpoint": "{验证点}"
            },
            {
              "action": "{功能语义操作，不含 API 名}",
              "checkpoint": "{可观察 UI 变化}"
            }
          ],
          "expected_result": "{预期结果}",
          "postconditions": ""
        }
      ]
    }
  ]
}
```

### 5.2 字段说明

| 层级 | 字段 | 必填 | 说明 |
|------|------|------|------|
| suite | id | ✅ | 测试套件 ID，格式：`{sdk_name}_test_suite` |
| suite | name | ✅ | 测试套件名称 |
| suite | app_package | ✅ | 应用包名 |
| suite | app_card | ✅ | 应用卡片路径 |
| modules[] | moduleCode | ✅ | 模块编号（F-01、F-02...） |
| modules[] | moduleName | ✅ | 模块名称 |
| modules[] | moduleDescription | ✅ | 模块描述 |
| modules[] | priority | ✅ | 优先级（P0/P1/P2） |
| test_cases[] | id | ✅ | 用例 ID，统一 `F-01-01` 格式（模块号-用例序号） |
| test_cases[] | featurePointId | ✅ | 对应功能点 ID，**必须等于 `id`**（1:1 绑定） |
| test_cases[] | title | ✅ | 用例标题 |
| test_cases[] | level | ✅ | 测试级别（L0/L1/L2） |
| test_cases[] | coveredApis | ✅ | 对象 `{android:[...],harmony:[]}`。`android` 记入本功能点所用全部 API（可多个）；`harmony` 留空 `[]`，由下游回填 |
| test_cases[] | preconditions | ✅ | 前置条件，统一为"应用已启动" |
| test_cases[] | test_steps | ✅ | 测试步骤数组。固定前两步：`点击【{模块名}】进入模块列表页` + `点击【{用例标题}】进入用例详情页` |
| test_steps[] | action | ✅ | 操作步骤，只写功能语义，**绝不含 API 名 / `(API: ...)` 备注** |
| test_steps[] | checkpoint | ✅ | 验证点，只写可观察 UI 变化 |
| test_cases[] | expected_result | ✅ | 预期结果 |
|              |                 |    | 正常场景：预期结果 |
|              |                 |    | 异常场景：描述行为级结果，不绑定具体错误文案，必要时可加一行说明“以实际错误返回为准”」 |
| test_cases[] | postconditions | ✅ | 后置条件（留空） |

### 5.3 严禁行为

| ❌ 禁止 | 说明 |
|--------|------|
| 添加 `step` 字段 | 步骤编号不需要 |
| 在 `action`/`checkpoint` 中写 API 名或 `(API: ...)` 备注 | API 只记入用例级 `coveredApis.android` |
| 在 `coveredApis.harmony` 中填值 | 留空 `[]`，由下游回填 |
| 让 `featurePointId` 与 `id` 不一致 | 二者必须相等（1:1 绑定） |
| 添加其他模板中没有的字段 | 严格遵循 Schema |
| 减少任何必填字段 | 所有字段必须存在 |

---

## 六、Markdown 格式模板

详见 `assets/test-cases-template.md`。

---

## 七、平台无关性验证

### 7.1 核心原则

测试用例以鸿蒙平台为唯一目标平台，**不体现源平台（Android）的特定内容**。

### 7.2 验证清单

- [ ] 用例标题（title）中不包含"Android"、"Java"、"Kotlin"等
- [ ] 前置条件（preconditions）中不包含"Android 设备"等
- [ ] 预期结果（expected_result）中不包含平台特定词汇
- [ ] 平台版本示例应使用"HarmonyOS NEXT"或"API XX"

---

## 八、边界情况处理

| 情况 | 处理方式 |
|------|---------|
| 功能点无关联 API | `coveredApis.android` 留空数组 `[]`（不在步骤中提及 API） |
| 功能点由多个协同 API 实现 | 这些 API 全部列入 `coveredApis.android`；步骤可拆为多步功能语义 |
| 功能点除固定前两步外只有一个操作 | test_steps 数组共三个元素（两步固定导航 + 一步操作） |
| 功能点有多个验证点 | 合并到一个 checkpoint 字段中，用分号分隔 |
| 前置条件 | 统一为"应用已启动" |
| 后置条件为空 | 保留字段但留空（空字符串），不填写默认值 |
| UI 元素名称不明确 | 根据功能推断合理的元素名称 |

---

## 九、执行步骤详解

### 步骤 1：读取测试分析结果

读取以下文件：
- `.ohos-adaptation/01-test-analysis-report.md` - 测试分析报告
- `.ohos-adaptation/01-test-points.json` - 功能点汇总 JSON

### 步骤 2：根据级别过滤功能点

**根据 `--level` 参数过滤功能点**：
- 如未指定或 `--level=L0`：仅保留 L0 级别功能点
- 如 `--level=all`：保留 L0+L1+L2 全部功能点

### 步骤 3：逐模块转化用例

对每个功能模块：
1. 读取模块信息（moduleCode、moduleName、priority）
2. 读取模块下过滤后的功能点列表
3. 将每个功能点转化为一条测试用例（1:1，`id == featurePointId`）
4. 把该功能点实现所用的全部 Android API 汇总到 `coveredApis.android`；`coveredApis.harmony` 留空 `[]`
5. 保持功能点级别（L0-L2）不变

### 步骤 4：生成 JSON 文档

1. 构建 suite 字段（id、name、app_package、app_card）
2. 构建 modules 数组
3. 为每个用例填充 `id`、`featurePointId`、`coveredApis`，并构建 test_steps 数组（含固定前两步导航）
4. 确保所有必填字段存在，无额外字段，步骤内无 API 名

### 步骤 5：生成 Markdown 文档

1. 生成文档标题和测试范围概述
2. 生成功能模块划分表格
3. 按模块生成测试用例清单表格
4. 生成测试覆盖率统计表格

### 步骤 6：三方一致性校验

校验以下内容：
- [ ] 模块数：功能点 JSON = 测试用例 JSON = 测试用例 Markdown
- [ ] 用例总数：三方一致；且用例数 = 功能点数（1:1）
- [ ] 级别分布：L0/L1/L2 数量一致

### 步骤 7：最终质量自检

**UI 可操作性检查**、**平台无关性检查**、**格式合规性检查**，并逐条核对：
- [ ] 每条用例 `featurePointId == id`
- [ ] 步骤内**无任何 API 名 / `(API: ...)` 备注**（API 全部在 `coveredApis.android`）
- [ ] `coveredApis.android` 与该功能点实现所用 API 一致；`coveredApis.harmony` 留空 `[]`
- [ ] 每条用例固定前两步为模块列表页 + 用例详情页导航
- [ ] preconditions 统一为"应用已启动"

### 步骤 8：输出生成统计

---

## 相关资源

| 资源 | 路径 | 用途 |
|------|------|------|
| 黑盒测试指南 | `references/blackbox-test-guide.md` | 测试用例编写详细指南 |
| Markdown 模板 | `assets/test-cases-template.md` | 测试用例文档格式模板 |
| JSON 模板 | `assets/test-cases-template.json` | 测试用例 JSON 格式模板 |

---

*本文档最后更新：2026-05-18*