# 02-test-case-gen - 测试用例生成 Skill

## 概述

基于测试分析报告生成纯黑盒测试用例，输出 JSON 格式。

**适用范围**：测试用例生成阶段
**输入**：测试分析报告、测试点汇总 JSON
**输出**：测试用例 JSON

---

## 一、输入参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `--level` | 否 | `all` | 生成用例的级别，可选值：`all`（默认）、`L0` |

**级别过滤规则**：
- `--level=all`（默认）：生成 L0+L1+L2 全部级别测试用例
- `--level=L0`：仅生成 L0 级别测试用例

---

## 二、纯黑盒视角（强制约束）

### 2.1 核心原则

**你生成的是 UI 自动化测试用例，不是 API 调用文档！**

| ✅ 必须 | 测试步骤描述用户界面操作（点击、输入、等待、观察等） |
| ✅ 必须 | API 信息在步骤后的括号内备注 |
| ❌ 禁止 | 直接写 API 调用代码 |
| ❌ 禁止 | 使用 API 层面词汇 |

**禁止词汇列表**：调用、访问、返回、注册、创建、订阅、设置、传入、执行、加载

**expected_result 禁止 API 术语**：回调、回调触发、执行回调、构造函数、API 赋值语句（如 `ShowcaseView.semanticEnable = true`）

### 2.2 错误写法 vs 正确写法

| ❌ 错误写法 | ✅ 正确写法 |
|-----------|-----------|
| `创建 InAppWebView 组件` | `启动应用并进入【WebView 演示】页面` |
| `调用 controller.loadUrl 方法` | `点击【加载 URL】按钮 (API: loadUrl)` |
| `调用 loadData 方法，传入 HTML 字符串` | `在【HTML 代码】输入框中输入 HTML 内容，点击【预览】按钮 (API: loadData)` |
| `调用 evaluateJavascript 方法，传入 JS 代码` | `在【JS 命令】输入框中输入 JavaScript 代码，点击【执行】按钮 (API: evaluateJavascript)` |
| `注册 onJsAlert 回调` | `点击【启用 JS 弹窗拦截】按钮 (API: onJsAlert)` |
| `设置 initialSettings.javaScriptEnabled 为 true` | `勾选【启用 JavaScript】复选框 (API: javaScriptEnabled)` |
| `订阅 stream 事件流` | `点击【开始监听】按钮 (API: stream)` |
| `检查返回值是否为 true` | `验证屏幕保持常亮状态` |
| `调用 goBack 方法` | `点击【返回】按钮 (API: goBack)` |
| `调用 reload 方法` | `点击【刷新】按钮 (API: reload)` |

**expected_result 错误写法 vs 正确写法**：

| ❌ 错误写法 | ✅ 正确写法 |
|-----------|-----------|
| `onStart 回调触发` | `序列式展示流程开始，第一个 Widget 被高亮` |
| `执行 onTap 回调` | `按钮的点击行为被执行` |
| `ShowcaseView.semanticEnable = true 后，屏幕阅读器可读取` | `无障碍功能启用后，屏幕阅读器可读取展示内容` |
| `directional 构造函数在 RTL 文本方向下正确定位` | `directional 定位方式在 RTL 文本方向下显示在正确位置` |

### 2.3 API 备注格式

**格式**：`(API: methodName, 参数：key=value)` 或 `(API: methodName)`

**规则**：
- 有参数时：使用 `(API: methodName, 参数：key=value)`，参数值用双引号包裹字符串
- 无参数时：使用 `(API: methodName)`
- **全文统一使用同一种格式**，不得混用

**示例**：
```
(API: Showcase.targetShapeBorder, 参数：targetShapeBorder=CircleBorder)
(API: ShowcaseView.dismiss)
(API: showToast, 参数：msg="测试消息", toastLength=LENGTH_SHORT)
```

### 2.4 自检清单（生成前必须逐项检查）

在生成每个测试用例前，必须自问：

1. [ ] 这个步骤是用户能在界面上执行的操作吗？
2. [ ] 步骤中是否包含【】标注的 UI 元素？
3. [ ] 是否使用了标准操作动词（点击、输入、勾选、选择、滑动、等待、观察）？
4. [ ] 是否避免了"调用"、"设置"、"传入"、"执行"等 API 词汇？
5. [ ] 如果必须提及 API，是否已放在括号内备注？

**任何一项不通过都必须重写该步骤！**

---

## 三、UI 可操作性原则

### 3.0 固定前两步（⚠️ 强制约束，缺少即判定失败）

**每个测试用例的前两步固定为页面导航步骤，不得省略、替换或修改：**

| 步骤 | 固定格式 | 示例 |
|------|---------|------|
| 第 1 步 | `点击【{模块名}】进入模块列表页` | `点击【存储空间查询】进入模块列表页` |
| 第 2 步 | `点击【{用例标题}】进入用例详情页` | `点击【获取设备当前可用存储空间】进入用例详情页` |

**⚠️ 强制约束**：
- 每条用例的 `test_steps` **必须且只能**从第 3 步开始写实际操作，前两步固定为上述导航步骤
- 前两步的 action 必须**原样复制**上述格式，不得简化或改写
- 如用例只有 1 个实际操作，最终 `test_steps` 必须有 **3 个元素**（2 个导航 + 1 个操作）
- **缺少固定前两步视为结构不完整，必须重新生成该用例**

**preconditions 统一格式**：所有用例的 `preconditions` 统一为 `"应用已启动"`，不得包含"已进入 XXX 模块"等导航前置描述。

### 3.1 核心要求

| 要求 | 说明 | 示例 |
|------|------|------|
| **明确的 UI 元素** | 必须使用【】标注 UI 元素名称 | `点击【分享】按钮`、`在【消息】输入框中输入` |
| **标准操作动词** | 必须使用可执行的操作动词 | 点击、输入、选择、滑动、等待、观察 |
| **可观察的验证点** | checkpoint 必须描述可观察的 UI 状态变化 | `验证【分享成功】提示显示`、`验证按钮变为"已发送"状态` |

### 3.2 标准操作动词表

| 操作类型 | 动词 | 示例 |
|----------|------|------|
| **点击操作** | 点击、按压 | `点击【确定】按钮`、`按压【Home】键` |
| **输入操作** | 输入、清除、填写 | `在【消息】输入框中输入"测试内容"` |
| **选择操作** | 选择、取消选择、勾选 | `选择【同意】复选框`、`选择【第一个】选项` |
| **滑动操作** | 滑动、滚动、拖动 | `向上滑动屏幕`、`拖动滑块到最右端` |
| **导航操作** | 打开、进入、返回、跳转 | `打开【设置】页面`、`返回上一级` |
| **等待操作** | 等待、暂停 | `等待 3 秒`、`等待【加载完成】提示出现` |
| **观察操作** | 观察、验证、确认 | `观察【分享对话框】是否打开` |

### 3.3 UI 元素命名规范

| UI 元素类型 | 命名格式 | 示例 |
|------------|---------|------|
| 按钮 | 【XX】按钮 | `【分享】按钮`、`【确定】按钮` |
| 输入框 | 【XX】输入框 | `【消息】输入框`、`【用户名】输入框` |
| 文本 | 【XX】文本 | `【欢迎】文本`、`【错误提示】文本` |
| 列表/选项 | 【XX】列表/选项 | `【分享目标】列表`、`【第一个】选项` |
| 页面/界面 | 【XX】页面/界面 | `【设置】页面`、`【分享】界面` |
| 对话框 | 【XX】对话框 | `【确认】对话框`、`【分享成功】提示框` |
| 复选框 | 【XX】复选框 | `【同意】复选框`、`【记住密码】复选框` |
| 开关 | 【XX】开关 | `【启用】开关`、`【夜间模式】开关` |
| 下拉菜单 | 【XX】下拉菜单 | `【分享方式】下拉菜单` |

---

## 四、插件类型与测试策略

**统一原则**：所有插件类型都需要转换成 UI 元素操作，假设插件有一个 Demo UI 界面。

| 插件类型 | 特征 | 测试步骤描述方式 | 转换示例 |
|----------|------|-----------------|---------|
| **UI 组件类** | 有可见界面 | 直接描述 UI 操作（点击、输入、选择） | `点击【分享】按钮`、`在【URL】输入框中输入` |
| **后台服务类** | 事件监听、状态监控 | 转换为 UI 操作（启动服务、观察状态、验证显示） | `点击【开始监听】按钮`、`验证【状态】文本显示"运行中"` |
| **平台交互类** | 调用系统 API | 转换为 UI 操作（打开应用、授权权限、观察反应） | `点击【授权】按钮`、`验证【权限状态】文本显示"已授权"` |
| **工具类** | 数据处理、计算 | 转换为 UI 操作（输入数据、执行操作、验证结果） | `在【输入】框中输入数据`、`点击【计算】按钮`、`验证【结果】文本显示` |

> **详细指南**：各类型插件的详细测试策略、完整示例见 `references/blackbox-test-guide.md`。

---

## 五、JSON 格式模板

### 5.1 完整 Schema

**必须严格按照以下格式，不添加或减少任何字段**：

```json
{
  "$schema": "https://raw.githubusercontent.com/HarmonyOS-AI/json-schema/main/droidrun/test_suite.schema.json",
  "suite": {
    "id": "{plugin_name}_test_suite",
    "name": "{plugin_name} 测试套件",
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
          "id": "F01-001",
          "title": "{测试标题}",
          "level": "{L0/L1/L2}",
          "preconditions": "应用已启动",
          "test_steps": [
            {
              "action": "点击【{模块名}】进入模块列表页",
              "checkpoint": "成功进入模块列表页"
            },
            {
              "action": "点击【{用例标题}】进入用例详情页",
              "checkpoint": "成功进入用例详情页"
            },
            {
              "action": "点击【显示 Toast】按钮 (API: showToast)",
              "checkpoint": "Toast 显示在界面上"
            }
          ],
          "expected_result": "Toast 显示默认消息",
          "postconditions": ""
        }
      ]
    }
  ]
}
```

### 5.2 格式规则（不可协商）

| 规则编号 | 规则 | 违反后果 |
|---------|------|---------|
| F-01 | 顶层键必须且只能是 `$schema`、`suite`、`modules` 三个 | 判定失败，重新生成 |
| F-02 | `modules` 是嵌套结构，`test_cases` 嵌套在 module 内部，不是顶层平铺 | 判定失败，重新生成 |
| F-03 | `test_steps` 每个元素必须是 `{ "action": "...", "checkpoint": "..." }` 对象，不是字符串 | 判定失败，重新生成 |
| F-04 | 每个测试用例恰好 7 个字段：id、title、level、preconditions、test_steps、expected_result、postconditions | 判定失败，重新生成 |
| F-05 | 禁止出现模板中不存在的字段：`step`、`coveredAPI`、`case_id`、`module_id`、`test_point_id`、`priority`、`automation_candidate`、`plugin_name`、`version`、`generated_at`、`statistics` | 判定失败，重新生成 |
| F-06 | 顶层禁止出现 `plugin_name`、`version`、`case_level`、`generated_at`、`statistics` 等字段 | 判定失败，重新生成 |
| F-07 | `postconditions` 必须存在但值为空字符串 `""` | 判定失败，重新生成 |
| F-08 | 每条用例 `test_steps` 的前两步固定为 `点击【{模块名}】进入模块列表页` + `点击【{用例标题}】进入用例详情页`，不得省略 | 判定失败，重新生成 |

### 5.3 字段说明

| 层级 | 字段 | 必填 | 说明 |
|------|------|------|------|
| suite | id | ✅ | 测试套件 ID，格式：`{plugin_name}_test_suite` |
| suite | name | ✅ | 测试套件名称 |
| suite | app_package | ✅ | 应用包名 |
| suite | app_card | ✅ | 应用卡片路径 |
| modules[] | moduleCode | ✅ | 模块编号（F-01、F-02...） |
| modules[] | moduleName | ✅ | 模块名称 |
| modules[] | moduleDescription | ✅ | 模块描述 |
| modules[] | priority | ✅ | 优先级（P0/P1/P2） |
| test_cases[] | id | ✅ | 用例 ID（F01-001、F01-002...） |
| test_cases[] | title | ✅ | 测试标题 |
| test_cases[] | level | ✅ | 测试级别（L0/L1/L2） |
| test_cases[] | preconditions | ✅ | 前置条件，统一为"应用已启动" |
| test_cases[] | test_steps | ✅ | 测试步骤数组 |
| test_steps[] | action | ✅ | 操作步骤 |
| test_steps[] | checkpoint | ✅ | 验证点 |
| test_cases[] | expected_result | ✅ | 预期结果 |
| test_cases[] | postconditions | ✅ | 后置条件（留空） |

### 5.4 常见错误对照

| ❌ 错误写法 | ✅ 正确写法 |
|------------|-----------|
| `"test_steps": ["1. 点击", "2. 观察"]`（字符串数组） | `"test_steps": [{"action": "点击", "checkpoint": "结果"}]`（对象数组） |
| 顶层出现 `"plugin_name": "xxx"` | 顶层只有 `$schema`、`suite`、`modules` |
| `test_cases` 顶层平铺，用例带 `"module_id"` | `test_cases` 嵌套在 `modules[]` 内 |
| `"case_id": "F-01-TC-001"` | `"id": "F01-001"` |
| 顶层出现 `"statistics": {...}` | 不能有 statistics 字段 |
| `test_steps` 缺少固定前两步，直接从实际操作开始 | `test_steps[0]="点击【{模块名}】进入模块列表页"`，`test_steps[1]="点击【{用例标题}】进入用例详情页"` |
| `preconditions: "应用已启动，已进入 XXX 模块"` | `preconditions: "应用已启动"` |

**⚠️ 字段不一致的强制处理**：自检发现字段与模板不一致时，**必须重新生成整个 JSON**，不得仅删除/补充字段后直接输出。

### 5.5 字段白名单（逐层校验）

| 层级 | 合法字段 |
|------|---------|
| 顶层 | `$schema`, `suite`, `modules`（3 个） |
| `suite` | `id`, `name`, `app_package`, `app_card`（4 个） |
| `modules[]` | `moduleCode`, `moduleName`, `moduleDescription`, `priority`, `test_cases`（5 个） |
| `test_cases[]` | `id`, `title`, `level`, `preconditions`, `test_steps`, `expected_result`, `postconditions`（7 个） |
| `test_steps[]` | `action`, `checkpoint`（2 个） |

---

## 六、平台无关性验证

### 6.1 核心原则

测试用例以鸿蒙平台为唯一目标平台，**不体现源平台（Android、iOS）的特定内容**。

### 6.2 验证清单

**测试用例 JSON 验证**：
- [ ] 用例标题（title）中不包含"Android"、"iOS"等
- [ ] 前置条件（preconditions）中不包含"Android 设备"、"iOS 设备"等
- [ ] 预期结果（expected_result）中不包含平台特定词汇

### 6.3 允许的例外

| 章节 | 可保留内容 | 说明 |
|------|-----------|------|
| 测试范围概述中的插件简介 | "通过封装 Android/iOS API 实现 XX 功能" | 作为技术背景 |
| 功能模块划分中的模块描述 | "仅 Android 可用"或"仅 iOS 可用" | 作为 API 说明 |

### 6.4 转化示例

| 源描述（错误） | 转化后（正确） |
|--------------|--------------|
| "Android 设备；有来电呼入" | "设备有来电呼入（需鸿蒙系统支持）" |
| "iOS 设备；已开始监听" | "设备已开始监听" |
| "Android 端来电时 number 字段显示具体号码" | "来电时 number 字段显示具体号码（需鸿蒙系统支持）" |
| "iOS 端 number 字段始终为 null（系统隐私限制）" | "number 字段的值取决于鸿蒙系统隐私政策" |
| "已授予 READ_CALL_LOG 权限；Android 设备" | "已授予电话记录读取权限" |

---

## 七、边界情况处理

| 情况 | 处理方式 |
|------|---------|
| 测试点无 coveredAPI | JSON 中不添加相关字段 |
| 测试点只有一个步骤 | test_steps 数组只包含一个元素（加上固定前两步共 3 个） |
| 测试点有多个验证点 | 合并到一个 checkpoint 字段中，用分号分隔 |
| 前置条件为空 | 使用默认值"应用已启动" |
| 后置条件为空 | 保留字段但留空（空字符串），不填写默认值 |
| UI 元素名称不明确 | 根据功能推断合理的元素名称，如【分享】按钮、【确定】按钮 |

---

## 八、执行步骤详解

### 步骤 1：读取测试分析结果

读取以下文件：
- `.ohos-adaptation/01-test-analysis-report.md` - 测试分析报告
- `.ohos-adaptation/01-test-points.json` - 测试点汇总 JSON

### 步骤 2：根据级别过滤测试点

**根据 `--level` 参数过滤测试点**：
- 如未指定或 `--level=all`：保留 L0+L1+L2 全部测试点（默认）
- 如 `--level=L0`：仅保留 L0 级别测试点

**级别继承规则**：测试用例的 level 字段直接继承自测试点，不做二次划分。生成用例时读取测试点的 level 并写入用例，保持原值不变。

**过滤后统计**：
- 输出过滤后的测试点数量
- 输出各级别测试点分布

### 步骤 3：逐模块转化用例

对每个功能模块：
1. 读取模块信息（moduleCode、moduleName、priority）
2. 读取模块下过滤后的测试点列表
3. 将每个测试点转化为测试用例：
   - `preconditions`：统一为 `"应用已启动"`
   - `test_steps[0]`：`点击【{模块名}】进入模块列表页`
   - `test_steps[1]`：`点击【{用例标题}】进入用例详情页`
   - `test_steps[2+]`：实际操作步骤（黑盒视角）
   - API 信息以括号备注格式附加到 action 后
4. 保持测试点级别（L0-L2）不变

### 步骤 4：生成 JSON 文档

1. 构建 suite 字段（id、name、app_package、app_card）
2. 构建 modules 数组
3. 为每个用例构建 test_steps 数组（**必须包含前两步固定导航步骤**）
4. 确保所有必填字段存在，无额外字段

### 步骤 5：两方一致性校验

校验以下内容：
- [ ] 模块数：测试点 JSON = 测试用例 JSON
- [ ] 用例总数：两方一致
- [ ] 级别分布：L0/L1/L2 数量一致
- [ ] 编号一致：用例 ID 与测试点 ID 完全一致

### 步骤 6：最终质量自检

**UI 可操作性检查**：
- [ ] 每个测试用例的前两步均为固定导航步骤
- [ ] 每个测试步骤都包含【】标注的 UI 元素名称
- [ ] 每个测试步骤都使用了标准操作动词
- [ ] 每个 checkpoint 都描述了可观察的 UI 状态变化
- [ ] 无模糊操作描述（如"进行操作"、"执行功能"）
- [ ] 无 API 调用描述
- [ ] 测试步骤可以被转换成自动化测试脚本

**平台无关性检查**：
- [ ] 不包含"Android"、"iOS"等平台特定词汇
- [ ] 不包含源平台特有的版本号
- [ ] 不包含源平台特有的 API 名称

**格式合规性检查**：
- [ ] JSON 文件可以被 json.load() 正确解析
- [ ] JSON 中 test_steps 的每个步骤只包含 action 和 checkpoint 两个字段
- [ ] JSON 中没有 step、coveredAPI 等额外字段
- [ ] JSON 中所有必填字段均存在

**⚠️ 模板字段一致性强检（强制，不通过则重新生成）**：

对照 `assets/test-cases-template.json` 模板进行逐层字段比对（见 5.5 字段白名单）：

```
1. 读取 assets/test-cases-template.json 模板，提取所有路径的合法字段列表

2. 遍历生成的 JSON，对每个对象按上述路径进行字段比对
   → 缺失任何必填字段 → 重新生成
   → 存在任何额外字段 → 重新生成
   → 字段类型不匹配 → 重新生成

3. 自检通过后，输出到文件
```

**失败处理**：自检发现字段不一致时，**必须重新生成整个 JSON**，不得仅删除/补充字段后直接输出。

### 步骤 7：输出生成统计

输出以下内容：
- 功能模块数量
- 测试用例总数
- 各级别用例数（L0/L1/L2）
- 各级别占比
- 生成模式（L0 only / all）

---

## 相关资源

| 资源 | 路径 | 用途 |
|------|------|------|
| 黑盒测试指南 | `references/blackbox-test-guide.md` | 测试用例编写详细指南 |
| JSON 模板 | `assets/test-cases-template.json` | 测试用例 JSON 格式模板 |

---

*本文档最后更新：2026-05-13（v3.5 - 精简版）*
