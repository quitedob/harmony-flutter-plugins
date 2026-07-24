---
name: rn-adapted-library
description: 查找已完成鸿蒙（OpenHarmony）适配的 React Native 三方库。当需要判断某个 RN 模块是否已有 OHOS 版本、获取适配仓库地址和版本信息、或寻找替代方案时使用此 Skill。触发关键词包括：已适配库、鸿蒙适配、OHOS 三方库、rn_packages、TPC 库、替代方案、是否支持鸿蒙。
---

# React Native OHOS 已适配三方库检索

## MANDATORY - 必须完成

**重要：使用此 Skill 前必须先创建 Todo 清单，严格按照顺序执行搜索步骤。**

### Todo 清单示例

```markdown
# 已适配库检索任务

## 迭代状态
- 当前迭代: 1
- 最大迭代: 1
- 状态: in_progress

## 任务清单
- [ ] Step 1: 本地 JSON 数据库匹配（优先级最高）
- [ ] Step 2: 本地已适配项目参考
- [ ] Step 3: usage-docs 总览检索
- [ ] Step 4: 全网搜索（最后手段）

## 执行原则
- 严格按照优先级顺序执行
- 只有在明确判定为"已鸿蒙化（adapted）"时才停止
- 如果只是"命中但非 adapted"，仍需继续执行后续步骤
- 记录搜索结果和执行状态
```

本 Skill 维护了 React Native 库的鸿蒙适配状态数据库。数据来源为 [OpenHarmony-RN 三方库适配列表](https://gitcode.com/openharmony-sig/ohos_react_native/tree/sig) 和社区贡献。

## 数据文件

| 文件 | 用途 |
|------|------|
| [references/adapted-libraries.json](references/adapted-libraries.json) | 结构化 JSON 数据库，包含所有库的名称、状态、版本、仓库地址 |
| [references/adapted-libraries.md](references/adapted-libraries.md) | 按状态分类的可读 Markdown 表格 |

## 检索流程（按优先级执行）

收到库名查询后，按以下顺序执行检索。**只有在明确判定为“已鸿蒙化（adapted）”时才停止**；如果只是“命中但非 adapted”（例如 `in_development` / `not_adapted` / `js_only` / 信息不完整），仍需继续执行后续步骤以获得更确定结论。

### Step 1：本地 JSON 数据库匹配

在 `references/adapted-libraries.json` 中搜索目标库名（不区分大小写、忽略 `_` 和 `-` 差异）。

**搜索方式**：用 grep/search 在 JSON 文件中搜索库名关键词。

**去重规则**：若同名库命中多条，以 `status` 优先级最高的条目为准：`adapted` > `in_development` > `js_only` > `not_adapted`。

**`category` 字段说明**：`category: "js_general"` 表示该库为通用 JS 库（非 React Native 专属，如 axios/dayjs/redux），天然兼容 OHOS，直接使用原始 npm 包即可。此类库命中后可视为 `js_only` 返回，无需继续后续步骤。

**命中时返回以下信息**：
- 适配状态（`adapted` = 已适配可用 / `in_development` = 开发中 / `not_adapted` = 未适配 / `js_only` = 纯 JS 无需适配）
- 最新适配版本号
- OHOS 仓库名
- 仓库地址
- 是否支持 Autolinking

**使用建议示例**：

```
该库已有鸿蒙适配版本，可通过 npm 安装或仓库依赖引入：

npm install <package_name>@harmony
# 或
"dependencies": {
  "<package_name>": "git+<仓库地址>#<分支>"
}
```

### Step 2：本地已适配项目参考

检查 `$ROOT/repos-rn/plugins.json`（从 CWD 访问路径为 `../../repos-rn/plugins.json`）中 status 为 `completed` 或 `coding-library` 等成功状态的模块。

如果目标库或功能类似的库已在本项目中成功适配，可参考 `repos-rn/{module_name}/.ohos-adaptation/` 下的产物和代码实现。

**适用场景**：
- 要适配的模块与已完成的某模块功能相近
- 需要参考已有的 ETS/C++ 实现方式或工程结构

### Step 3：usage-docs 总览检索（必须做，命中即停）

**克隆**（在 workspace 根目录执行；已存在则跳过 clone，直接搜索）：

```bash
git clone --depth 1 https://gitcode.com/OpenHarmony-RN/usage-docs.git agent-rn/.claude/skills/rn-adapted-library/_usage-docs/usage-docs
```

**读取这个 README 文件并在其中搜索**：`agent-rn/.claude/skills/rn-adapted-library/_usage-docs/usage-docs/zh-cn/README.md`

**在该 README 内全文搜索以下关键词（用任意搜索工具：IDE 全局搜索 / ripgrep / grep 均可）**：
- `<package_name>`（原 npm 包名，如 `react-native-xxx`）
- `<repo_name>`（原仓库名，如 `react-native-xxx` / `xxx`）
- `<scope_name>`（原 scope，如 `@react-native-community`）
- `@react-native-oh-tpl`（鸿蒙化 npm scope）
- `鸿蒙化库名`（表格列名）

**判定规则**：
- **若表格里出现 `@react-native-oh-tpl/...`** ⇒ `adapted`，**立即停止**（不再执行后续步骤）。
- 若表格未命中 / 命中但不是 `adapted`，继续按下面顺序在 `usage-docs/zh-cn/` 查“单库文档”：

**单库文档搜索顺序（都用“文件名匹配 + 打开文件阅读”的方式）**：
- 先在目录 `agent-rn/.claude/skills/rn-adapted-library/_usage-docs/usage-docs/zh-cn/` 中找 **文件名**是否包含 `<package_name>` 或 `<repo_name>`（忽略大小写）
  - 找到匹配文件后，打开该 `.md` 文件，搜索/阅读是否出现：`@react-native-oh-tpl`、`鸿蒙化库名`、`npm地址`、`react-native-oh-library`
- 如果 `zh-cn/` 没找到匹配文件名，再到目录 `agent-rn/.claude/skills/rn-adapted-library/_usage-docs/usage-docs/zh-cn/js/` 中按相同方式查

- 在单库文档中出现 `@react-native-oh-tpl/...` / `react-native-oh-library` 仓库 / 明确“鸿蒙化库名” ⇒ `adapted`，**立即停止**
- 只出现“开发中/开发中”/无可用仓库 ⇒ `in_development`
- 以上都未命中 ⇒ 才允许继续 Step 4（禁止跳过 Step 3 直接 Step 4）

### Step 4：全网搜索（最后手段，仅在 Step 1-3 全部未命中时执行）

使用 web search 搜索以下关键词组合：
- `{package_name} OpenHarmony react-native 适配`
- `{package_name} HarmonyOS react-native harmony`
- `react-native-harmony-{package_name}`

## 状态说明

| 状态值 | 中文 | 含义 |
|--------|------|------|
| `adapted` | 已适配 | 可直接通过 npm 或仓库依赖引入使用 |
| `in_development` | 开发中 | 社区正在适配，暂不可用 |
| `not_adapted` | 未适配 | 无 OHOS 支持，需自行适配 |
| `js_only` | 纯 JS | 无原生平台代码，天然兼容 OHOS（含 `category: "js_general"` 的通用 JS 库） |

## 结果解读与建议

### 如果库已适配（adapted）

1. 向调用方返回仓库地址和版本号
2. 建议用 npm 安装 harmony 版本或 git 依赖方式引入
3. 检查是否支持 Autolinking

### 如果库是纯 JS（js_only）

直接使用原始 npm 包，无需做任何鸿蒙适配。

### 如果库开发中（in_development）

1. 告知调用方该库正在社区适配中
2. 建议暂时寻找替代方案或自行适配
3. 可在 JSON 数据库中搜索功能相似的已适配库作为替代

### 如果库未适配（not_adapted）或未找到

1. 告知调用方该库尚无 OHOS 适配
2. 需要自行实现鸿蒙端原生代码（TurboModule / Fabric Component / C++ TurboModule）
3. 参考 `ohos-coding-guide` Skill 获取对应类型的编码指导

## 注意事项

- JSON 数据库为静态快照，如果没有命中结果，请务必执行 Step 3 和 Step 4 进行在线验证
- 库名匹配时注意变体：`react-native-xxx`、`@react-native-community/xxx`、`react-native-harmony-xxx` 等命名惯例
- 部分库在鸿蒙生态中的仓库名与原库名不同，搜索时应同时尝试原名和变体名
