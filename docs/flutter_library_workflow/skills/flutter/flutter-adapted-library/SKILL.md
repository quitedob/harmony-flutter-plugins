---
name: flutter-adapted-library
description: 查找已完成鸿蒙（OpenHarmony）适配的 Flutter 三方库。当需要判断某个 Flutter 插件是否已有 OHOS 版本、获取适配仓库地址和版本信息、或寻找替代方案时使用此 Skill。触发关键词包括：已适配库、鸿蒙适配、OHOS 三方库、flutter_packages、TPC 库、替代方案、是否支持鸿蒙。
---

# Flutter OHOS 已适配三方库检索

本 Skill 维护了 468 个 Flutter 库的鸿蒙适配状态数据库，其中 151 个已适配、220 个开发中。数据来源为 [openharmony-tpc/flutter_packages](https://gitcode.com/openharmony-tpc/flutter_packages) 和 [OpenHarmony-Flutter TPC 生态](https://gitcode.com/OpenHarmony-Flutter/docs/blob/main/ThirdpartyLibrarites.md)。

## 数据文件

| 文件 | 用途 |
|------|------|
| [references/adapted-libraries.json](references/adapted-libraries.json) | 结构化 JSON 数据库，包含所有库的名称、状态、版本、仓库地址 |
| [references/adapted-libraries.md](references/adapted-libraries.md) | 按状态分类的可读 Markdown 表格 |

## 检索流程（按优先级执行）

收到库名查询后，按以下顺序执行检索。**命中即停**，不再执行后续步骤。

### Step 1：本地 JSON 数据库匹配

在 `references/adapted-libraries.json` 中搜索目标库名（不区分大小写、忽略 `_` 和 `-` 差异）。

**搜索方式**：用 grep/search 在 JSON 文件中搜索库名关键词。

**命中时返回以下信息**：
- 适配状态（`adapted` = 已适配可用 / `in_development` = 开发中 / `not_adapted` = 未适配 / `pure_dart` = 纯 Dart 无需适配）
- 最新适配版本号
- OHOS 仓库名
- 仓库地址（gitcode.com URL）
- 来源（`flutter_packages` = 官方 packages 仓库 / `thirdparty_tpc` = TPC 三方生态）
- **git_dependency**：`url`（仓库地址）、`path`（子包路径，可选）、`ref`（默认分支，兜底用）
- **versions**：按 Flutter OHOS SDK 版本索引的分支映射，每条含 `version`、`repo_url`、`ref`（分支名）

**组装 git 依赖的完整流程**：

Agent 使用已适配库时，必须按以下流程组装最终的 git 依赖，确保分支与当前 Flutter SDK 版本兼容：

**第 1 步：确定 `url` 和 `path`**

从 `git_dependency` 字段获取 `url` 和 `path`（如有）。如果没有 `git_dependency`，则从 `latest_repo_url` 推断。

**第 2 步：确定 `ref`（版本匹配）**

读取 `02-planning.json` 的 `sdk_environment.flutter_version` 字段（如 `"3.22"`、`"3.35"`）。若该字段不存在，回退执行 `flutter --version` 提取主版本号（如 `3.22.1` → `3.22`）。

然后在 JSON 条目的 `versions` 字段中按以下优先级匹配：

1. **精确匹配**：`versions` 中存在当前 SDK 版本的 key（如 SDK 为 3.22，`versions["3.22"]` 存在）→ 使用该条目的 `ref`
2. **最近的低版本**：无精确匹配时，选 `versions` 中小于当前版本的最大 key（如 SDK 为 3.25，选 `3.22` 而非 `3.27`，因为低版本分支对当前 SDK 向前兼容）
3. **最近的高版本**：无更低版本时，选最近的高版本 key
4. **`git_dependency.ref`**：`versions` 为空或无任何 key 时的兜底
5. **仓库默认分支**：以上均无时，使用 `master` / `main`

> **为什么优先选低版本**：低版本分支的 Dart SDK 约束上界通常覆盖当前 SDK，向前兼容性好；高版本分支可能依赖当前 SDK 尚不支持的 API。

**匹配到的条目无 `ref` 字段时的降级处理**：

部分旧版本条目（主要是 `3.7` 时代）只有 `version` 和 `repo_url`，没有 `ref`。当步骤 1-3 匹配到的条目本身没有 `ref` 时，**跳过该条目**，继续按优先级尝试下一个有 `ref` 的版本条目。如果所有 `versions` 条目都没有 `ref`，降级到步骤 4（`git_dependency.ref`）或步骤 5（默认分支）。

**第 3 步：组装最终依赖**

```yaml
dependencies:
  <package_name>:
    git:
      url: "<第 1 步的 url>"
      path: "<第 1 步的 path，无则省略>"
      ref: "<第 2 步匹配到的 ref>"
```

**示例**：当前 SDK 为 Flutter 3.22，查询 `flutter_widget_from_html`：

```
git_dependency.url  = "https://gitcode.com/openharmony-sig/flutter_widget_from_html.git"
git_dependency.path = "packages/enhanced"
versions["3.22"].ref = "br_v0.15.2_ohos"  ← 精确匹配
```

最终：
```yaml
flutter_widget_from_html:
  git:
    url: https://gitcode.com/openharmony-sig/flutter_widget_from_html.git
    path: packages/enhanced
    ref: br_v0.15.2_ohos
```

**`ref` 全部缺失时的分支选择规则**：

当 `versions` 条目和 `git_dependency` 都没有 `ref` 时，需要查看仓库的分支列表（`git ls-remote` 或仓库页面），按以下优先级选择：

1. **与原依赖库版本精确匹配的分支**（如原插件依赖 `foo: ^2.1.0`，优先选 `br_foo-v2.1.0_ohos`）
2. **最近的高版本分支**（如无 `v2.1.0`，选 `v2.2.0` > `v3.0.0`）
3. **最近的低版本分支**（如无更高版本，选 `v2.0.0` > `v1.5.0`）
4. **默认分支**（`master` / `main`，作为最后兜底）

### Step 2：本地 repos 已适配项目参考

检查 `$ROOT/repos/plugins.json`（从 CWD 访问路径为 `../../repos/plugins.json`）中 status 为 `completed` 或 `coding-library` 等成功状态的插件。

如果目标库或功能类似的库已在本项目中成功适配，可参考 `repos/{plugin_name}/.ohos-adaptation/` 下的产物和代码实现。

**适用场景**：
- 要适配的插件与已完成的某插件功能相近
- 需要参考已有的 ETS 实现方式或工程结构

### Step 3：在线仓库检索

通过 web 访问 [openharmony-tpc/flutter_packages](https://gitcode.com/openharmony-tpc/flutter_packages) 仓库页面，在分支列表或搜索功能中查找目标库名。

**检索 URL 模板**：
- 仓库主页：`https://gitcode.com/openharmony-tpc/flutter_packages`
- 按分支名搜索：分支命名规则为 `br_{package_name}-v{version}_ohos`
- TPC 三方仓库搜索：`https://gitcode.com/openharmony-sig/fluttertpc_{package_name}`
- TPC 另一种命名：`https://gitcode.com/openharmony-sig/flutter_{package_name}`

### Step 4：全网搜索

使用 web search 搜索以下关键词组合：
- `{package_name} OpenHarmony flutter 适配`
- `{package_name} HarmonyOS flutter plugin ohos`
- `site:gitcode.com {package_name} ohos`

**确定 git 依赖的 `path` 字段**：从网络搜索找到仓库后，必须查看仓库的文件结构（目录树），找到 `pubspec.yaml` 所在的目录作为 `path` 值。例如：
- 如果 `pubspec.yaml` 在仓库根目录 → 不需要 `path` 字段
- 如果 `pubspec.yaml` 在 `packages/foo/foo/pubspec.yaml` → `path: "packages/foo/foo"`
- 如果 `pubspec.yaml` 在 `packages/foo/pubspec.yaml` → `path: "packages/foo"`

不得凭仓库名或 URL 路径猜测 path，必须通过实际文件结构确认。

## 状态说明

| 状态值 | 中文 | 含义 |
|--------|------|------|
| `adapted` | 已适配 | 可直接通过 git 依赖引入使用 |
| `adapted_upstream` | 已适配(已回合上游) | 已合入原始仓库，可直接使用原库 |
| `in_development` | 开发中 | 社区正在适配，暂不可用 |
| `not_adapted` | 未适配 | 无 OHOS 支持，需自行适配 |
| `pure_dart` | 纯 Dart | 无原生平台代码，天然兼容 OHOS |

## 结果解读与建议

### 如果库已适配（adapted / adapted_upstream）

1. 向调用方返回仓库地址和版本号
2. 建议用 git 依赖方式引入
3. 如果是 `adapted_upstream`，说明可以直接用原始 pub.dev 包

### 如果库是纯 Dart（pure_dart）

直接使用原始 pub.dev 包，无需做任何鸿蒙适配。

### 如果库开发中（in_development）

1. 告知调用方该库正在社区适配中
2. 建议暂时寻找替代方案或自行适配
3. 可在 JSON 数据库中搜索功能相似的已适配库作为替代

### 如果库未适配（not_adapted）或未找到

1. 告知调用方该库尚无 OHOS 适配
2. 需要自行实现鸿蒙端原生代码
3. 如果是 MethodChannel/EventChannel 类型插件，可参考现有适配模式

## 注意事项

- JSON 数据库为静态快照，如果没有命中结果，请务必执行 Step 3 和 Step 4 进行在线验证
- 库名匹配时注意变体：`flutter_xxx`、`xxx_plus`、`xxx_ohos` 等命名惯例
- 部分库在 TPC 生态中的仓库名与原库名不同（如 `permission_handler` → `flutter_permission_handler`），搜索时应同时尝试原名和变体名
