# AGENTS.md

本文件为在 Adapt Workflow 项目中工作的智能编码 Agent 提供指导。这是项目的完整技术参考，人类可读概述见 README.md。

## 项目概述

批量管理插件跨平台适配的工作流系统。Node.js + Express 后端，原生前端（ES Modules），无构建步骤。通过 Profile 架构实现多框架扩展（当前内置 Flutter→鸿蒙 Profile）。

核心能力：插件克隆与管理、5 阶段 AI Agent 流水线执行、SSE 实时日志、全局执行队列、Token 统计、TPC 同步、CSV 导出。

## 构建与运行

```bash
npm install        # 安装依赖
npm start          # 启动（自动终止占用 3000 端口的进程）
npm run stop       # 仅停止
npm run restart    # 先停后启
```

- 服务运行在 [http://localhost:3000，管理脚本位于](http://localhost:3000，管理脚本位于) `scripts/server.js`
- 跨平台进程管理：Unix 使用 SIGTERM/SIGKILL，Windows 使用 taskkill
- 无构建/编译步骤，修改后端代码需重启服务，修改前端代码刷新浏览器即可
- 暂无自动化测试

## 项目结构

```
adapt-workflow/
├── server.js                    # Express 应用入口（注册中间件、路由、错误处理）
├── lib/
│   ├── config.js                # 常量与路径配置（PORT、REPOS_DIR、WORKSPACE_ROOT 等）
│   ├── data.js                  # 数据访问层（读写 JSON、写锁、数据迁移、URL 规范化）
│   ├── errors.js                # 统一错误类（AppError）、错误中间件、asyncHandler
│   ├── runtime-state.js         # 集中管理所有进程内运行时状态（Map/数组）
│   ├── plugin-lookup.js         # 插件查找辅助（findPluginOrFail、findPluginWithRepo）
│   ├── stages.js                # 5 阶段流水线定义（analysis→summary）与质量门
│   ├── settings.js              # 设置读写与校验（并发度、GitHub Token、代理）
│   ├── utils.js                 # 通用工具函数（stripAnsi、generateId、URL 校验）
│   ├── platform.js              # 平台检测与进程管理（killProc）
│   ├── agent/
│   │   ├── executor.js          # 阶段进程启动（SSE / 静默两种模式）
│   │   ├── helpers.js           # SSE、日志路径、产物清除等工具
│   │   ├── queue.js             # 全局 Agent 执行队列（并发池控制）
│   │   ├── stage-manager.js     # 阶段状态检测和管理（产物检测、时间解析）
│   │   └── token-stats-db.js    # Token 统计（OpenCode DB 方式）
│   ├── backends/
│   │   ├── index.js             # 后端工厂（getBackend）
│   │   ├── opencode.js          # OpenCode 后端（buildCommand）
│   │   ├── claude-code.js       # Claude Code 后端（buildCommand、createStreamParser）
│   │   └── workspace-links.js   # 工作区符号链接管理（Profile 驱动）
│   ├── profile/
│   │   ├── index.js             # Profile 注册表（getActiveProfile、listProfiles）
│   │   ├── flutter-ohos/        # Flutter→鸿蒙 Profile
│   │   ├── rn-ohos/             # RN→鸿蒙 Profile
│   │   └── android-sdk-ohos/    # 三方 Android SDK→鸿蒙（HAR）Profile
│   │       ├── index.js         # 组合导出
│   │       ├── config.js        # 阶段定义、枚举映射、Dashboard 卡片、TPC 配置、branding
│   │       ├── extractors.js    # 字段提取（列表页 / 详情页 / CSV 导出）
│   │       └── analyzer.js      # pubspec.yaml 分析（插件类型 / 平台 / 依赖）
│   └── services/
│       ├── clone-service.js     # 单 / 批量克隆、TPC 同步、虚拟插件物化
│       └── plugin-service.js    # 插件列表三路合并、状态推导
├── routes/
│   ├── plugins.js               # 插件 CRUD + 克隆 + TPC 同步 + 打开目录
│   ├── agent.js                 # 分阶段 Agent 执行(SSE)、详情、日志、队列、Token 统计
│   ├── reports.js               # 报告刷新与查看
│   ├── export.js                # CSV 导出
│   ├── settings.js              # 设置 CRUD
│   └── profile.js               # Profile API（branding、枚举映射、阶段、卡片配置）
├── frontend/
│   ├── index.html               # 插件列表页（筛选、批量操作、统计卡片、队列栏）
│   ├── detail.html              # 插件详情页（流水线可视化、Dashboard、TPC 同步）
│   ├── app.js                   # 列表页入口（事件绑定、全局函数注册）
│   ├── detail.js                # 详情页主控（流水线交互、轮询、面板切换）
│   ├── css/                     # 样式文件
│   └── js/
│       ├── constants.js         # 纯静态常量（API_URL、通用状态映射表）
│       ├── profile-store.js     # Profile 动态配置加载与存储
│       ├── state.js             # 列表页状态管理（plugins、filters、selectedIds）
│       ├── api.js               # API 客户端（所有 fetch 调用封装）
│       ├── utils.js             # 前端工具函数（escapeHtml、formatDate、状态显示）
│       ├── render.js            # 表格渲染、统计卡片、筛选结果计数
│       └── detail/
│           ├── dashboard.js     # 详情页 Dashboard 卡片（Profile 的 DASHBOARD_CARDS 驱动）
│           ├── pipeline.js      # 流水线渲染
│           ├── log-panel.js     # 日志面板与 SSE 流
│           ├── reports.js       # 报告 / PRD 面板
│           ├── stage-runner.js  # 阶段执行 / 终止
│           ├── run-all.js       # 全部执行控制
│           ├── token-stats.js   # Token 统计面板
│           ├── scroll-compact.js# 滚动感知紧凑模式
│           └── tpc-sync.js      # TPC 同步按钮逻辑
├── scripts/
│   └── server.js                # 服务管理脚本（start/stop/restart）

注：plugins.json 位于 ../repos/plugins.json，与克隆目录同处。
```

## 代码风格指南

### 后端 (Node.js)

- CommonJS 模块 (require/module.exports)，async/await，fs.promises
- `server.js` 仅注册中间件和路由，`lib/` 存业务逻辑，`routes/` 存路由处理器
- 变量/函数 camelCase，常量 UPPER_SNAKE_CASE，路由路径 kebab-case
- 路由用 `asyncHandler()` 包裹，业务错误用 `throw new AppError(msg, code)` 或快捷方法 `notFound()`/`badRequest()`/`conflict()`
- 插件查找用 `findPluginOrFail(id)` / `findPluginWithRepo(id)`
- 运行时状态集中到 `lib/runtime-state.js`
- 新路由在 `routes/` 下建文件，在 `server.js` 注册

### 前端 (HTML/CSS/JS)

- ES Modules (`<script type="module">`)，`app.js` 列表页入口，`detail.js` 详情页入口
- `js/` 功能模块，`js/detail/` 详情页子模块，内联 onclick 通过 `window.fn = fn` 暴露
- ID camelCase，类名 kebab-case，CSS 变量定义主题，Flexbox/Grid 布局
- 原生 DOM API + fetch + async/await

## 数据模型

### plugins.json

仅做仓库列表管理，适配详情由各插件的 `<ADAPTATION_DIR>/`（当前 `.ohos-adaptation/`）提供。

```javascript
{
  "plugins": [{
    "id": "unique-id",
    "name": "plugin-name",
    "repoUrl": "https://github.com/...",
    "sourceUrl": "https://github.com/original/source",
    "tpcRepoUrl": "https://github.com/HarmonyOS-TPC/plugin-name.git",
    "commitHash": "abc123...",
    "cloneTime": "2026-03-06T...",
    "status": "initialized|cloning|cloned|clone_failed|not_cloned",
    "lastSyncTime": "2026-03-18T...",
    "harmonyBranch": false
  }]
}
```

### 三路合并

列表页数据合并自三个来源，以 `name` 和规范化 URL 双重去重：

1. `all_library_sources.json`（全量插件清单，workspace 根目录）
2. `repos/plugins.json`（已管理的插件记录）
3. `repos/` 目录下实际存在的文件夹

清单中未克隆的插件以 `not_cloned` 状态展示（虚拟记录，id 前缀 `src_`）。适配进度、插件类型、阶段状态、评分等信息从 `repos/{name}/<ADAPTATION_DIR>/` 目录下的产物文件推导。

### 适配产物目录

```
repos/{plugin}/.ohos-adaptation/
├── 01-analysis.json         # 分析阶段产物
├── 01-analysis-report.md    # 分析报告
├── 01-analysis-prd.md       # PRD 文档
├── 02-planning.json
├── 02-planning-report.md
├── 03-coding-library.json
├── 03-coding-library-report.md
├── 04-testing.json          # example生成
├── 04-testing-report.md
├── 04-device-verify.json  # 测试验证
├── 04-device-verify-report.md
├── 05-summary.json
├── 05-summary-report.md
└── logs/                    # 阶段执行日志
    ├── analysis.log
    ├── planning.log
    └── ...
```

## 关键文件说明

### 后端核心

- **lib/config.js** — PORT、REPOS_DIR、WORKSPACE_ROOT、DATA_FILE、ALL_LIBRARY_SOURCES_FILE、SETTINGS_FILE
- **lib/data.js** — `readData`/`writeData`（带写锁）、`readLibrarySources`、`normalizeRepoUrl`、`buildTpcRepoUrl`、`sanitizePlugin`、`migrateData`
- **lib/errors.js** — `AppError` 类、`notFound`/`badRequest`/`conflict` 快捷方法、`asyncHandler` 路由包装、`errorHandler` 全局中间件
- **lib/runtime-state.js** — `activeStages`（Map）、`runAllQueues`（Map）、`taskQueue`/`runningTasks`/`completedTasks`（队列数组）、`batchCloneState`
- **lib/plugin-lookup.js** — `findPluginOrFail(id)` 抛 404、`findPluginWithRepo(id)` 额外校验本地仓库
- **lib/stages.js** — `getStages()`/`getStageById()`、`checkQualityGate()`、`resolveBackend()`
- **lib/settings.js** — `readSettings`/`writeSettings`/`validateSettings`/`getDefaultSettings`/`buildProxyEnv`

### Agent 执行引擎

- **lib/agent/executor.js** — `runStageWithSSE`（SSE 模式）、`executeStageInternal`（静默模式）、`prepareStageProcess`
- **lib/agent/helpers.js** — `setupSSE`/`sendSSE`、`getAdaptationDir`/`getLogsDir`/`getStageLogPath`、`clearOutputsFromStage`
- **lib/agent/queue.js** — `enqueue`/`cancel`/`cancelAll`/`getStatus`，并发度读 `maxAgentConcurrency`
- **lib/agent/stage-manager.js** — `detectStageStatus`/`getAllStageStatuses`，管理 `activeStages`/`runAllQueues`
- **lib/agent/token-stats-db.js** — `queryTokenStats`（从 OpenCode SQLite DB）、`collectAndSaveTokenStats`、`generateReport`

### AI 后端与工作区

- **lib/backends/index.js** — `getBackend(name)` 工厂
- **lib/backends/opencode.js** — `buildCommand` 生成 `opencode run` CLI 命令
  - **Windows 注意**：`executor.js` 在 `win32` 上对子进程使用 `shell: true`，整条命令经 `cmd` 拼接。**`STAGES[].prompt` 正文中不要出现会被拆成独立参数的 `--xxx` / `-p` 片段**（例如 `hvigorw … --mode … --no-daemon`），否则可能被误解析为 `opencode` 自身的选项，导致只打印帮助并 **退出码 1**。hvigor 完整命令应写在 **`.claude/prompts/*.md`**，阶段 `prompt` 仅作文字指引并引用该文件。
- **lib/backends/claude-code.js** — `buildCommand` + `createStreamParser` 解析流式输出
- **lib/backends/workspace-links.js** — `ensureWorkspaceLinks` 从 Profile 读取 `workspaceDirs`/`workspaceFiles`，在 repo 中创建符号链接指向 workspace 根目录资源

### Profile 架构

- **lib/profile/index.js** — Profile 注册表：`getProfile`/`getActiveProfile`/`setActiveProfile`/`listProfiles`，注册 `flutter-ohos`、`rn-ohos`、`android-sdk-ohos`
- **lib/profile/flutter-ohos/config.js** — `STAGES`、`ADAPTATION_DIR`、TPC 配置（`TPC_ORG_URL`/`TARGET_BRANCH`/`commitMessage`）、`branding`、`displayMaps`、`dashboardCards`、`exportColumns`、`workspaceDirs`/`workspaceFiles`
- **lib/profile/flutter-ohos/extractors.js** — `extractListFields`（列表页）、`extractDetailFields`（详情页）、`extractExportRow`（CSV）
- **lib/profile/flutter-ohos/analyzer.js** — `analyzePlugin(repoPath)` 解析 pubspec.yaml

### 业务服务

- **lib/services/clone-service.js** — `clonePlugin`（单个）、`startBatchClone`/`resolveBatchCloneTargets`（批量）、`syncToTpc`（TPC 推送）、`materializeVirtualPlugin`（`src`_ 虚拟记录→实体）
- **lib/services/plugin-service.js** — `getEnrichedPluginList`（三路合并 + 状态推导）

### 前端

- **frontend/js/api.js** — 所有 fetch 封装：`fetchPluginsList`、`createPlugin`、`removePlugin`、`clonePluginRepo`、`batchClone`、`getBatchCloneStatus`、`enqueueBatch`、`getBatchQueueStatus`、`cancelBatch`、`fetchSettings`、`updateSettings` 等
- **frontend/js/profile-store.js** — `loadProfile()`/`getProfileData()` 从 `/api/profile` 拉取配置，缓存 `TYPE_DISPLAY_MAP`/`BRANDING`/`DASHBOARD_CARDS`/`TARGET_BRANCH` 等
- **frontend/js/render.js** — `renderTable`/`updateStats`/`updateQueueBar`/`getFilteredPlugins`
- **frontend/js/detail/dashboard.js** — `renderDashboard` 由 Profile 的 `DASHBOARD_CARDS` 驱动动态卡片

## API 端点

### 插件管理（routes/plugins.js，挂载 /api/plugins）

- `GET /api/plugins` — 获取插件列表（三路合并）
- `POST /api/plugins` — 添加插件（body: `repoUrl` 必填，`name`/`sourceUrl`/`tpcRepoUrl` 可选）
- `PATCH /api/plugins/:id` — 更新插件字段
- `DELETE /api/plugins/:id` — 删除插件（同时清理本地文件夹）
- `POST /api/plugins/:id/clone` — 克隆仓库（body.branch 匹配 Profile.TARGET_BRANCH 时克隆 TPC 目标分支）
- `POST /api/plugins/batch-clone` — 批量克隆（body: `{ ids: [] }` 或 `{ all: true }`，并发控制）
- `GET /api/plugins/batch-clone/status` — 获取批量克隆进度
- `POST /api/plugins/:id/open-dir` — 打开本地目录
- `POST /api/plugins/:id/sync-to-tpc` — 同步适配代码到 TPC 目标分支

### 分阶段适配（routes/agent.js，挂载 /api/plugins）

- `GET /api/plugins/:id/detail` — 获取插件详情（含 5 阶段状态、adaptation 数据、可用报告）
- `GET /api/plugins/:id/stages/:stageId/run` — SSE 执行某个阶段
- `POST /api/plugins/:id/stages/:stageId/kill` — 终止某个阶段
- `GET /api/plugins/:id/stages/:stageId/log` — 获取阶段日志（一次性返回）
- `GET /api/plugins/:id/stages/:stageId/log-stream` — SSE 实时日志流（重进详情页时 tail 正在运行任务的日志）
- `GET /api/plugins/:id/stages/:stageId/report` — 获取阶段 Markdown 报告（`?file=` 查询附加报告）
- `GET /api/plugins/:id/stages/:stageId/output` — 获取阶段产物 JSON
- `POST /api/plugins/:id/run-all` — 全部执行（依次执行未完成阶段）
- `POST /api/plugins/:id/stop-all` — 停止全部执行并终止所有阶段
- `GET /api/plugins/:id/run-all-status` — 获取全部执行状态
- `POST /api/plugins/:id/kill-agent` — 终止该插件所有运行中的阶段
- `GET /api/plugins/:id/token-stats` — 获取 Token 统计（db 方式或 token-stats.json）

### 批量执行队列（routes/agent.js）

- `POST /api/plugins/batch/enqueue` — 批量加入全局执行队列（body: `{ pluginIds: [] }`）
- `GET /api/plugins/batch/status` — 获取全局队列状态（running / queued / recentCompleted）
- `POST /api/plugins/batch/cancel` — 取消队列任务（body: `{ pluginIds: [] }` 或 `{ all: true }`）

### 报告与导出（routes/reports.js + routes/export.js，挂载 /api）

- `POST /api/plugins/:id/refresh-report` — 刷新报告
- `POST /api/refresh-all-reports` — 刷新全部插件报告
- `GET /api/plugins/:id/report` — 获取报告
- `GET /api/export` — 导出 CSV

### 设置（routes/settings.js，挂载 /api/settings）

- `GET /api/settings` — 获取设置
- `PUT /api/settings` — 更新设置（maxAgentConcurrency、maxCloneConcurrency、githubToken、代理配置）
- `POST /api/settings/reset` — 重置为默认设置

### Profile（routes/profile.js，挂载 /api/profile）

- `GET /api/profile` — 获取当前 Profile 前端配置（branding、displayMaps、dashboardCards、stages、tpcOrgUrl、targetBranch）

## 工作流程

### 添加插件

1. POST /api/plugins → 解析 URL → 克隆到 ../repos/ → Profile.analyzePlugin 分析类型 → 获取 commit hash → 保存 plugins.json → 返回

### 分阶段适配

1. 详情页展示 Dashboard + 5 阶段流水线
2. 执行阶段时 `workspace-links.js` 确保 repo 符号链接指向 workspace 资源（.claude、.opencode、CLAUDE.md）
3. 后端选择 AI 后端（OpenCode / Claude Code），执行命令
4. SSE 推送日志 → 保存到 `.ohos-adaptation/logs/{stage}.log`
5. 产物写入 `.ohos-adaptation/{outputFile}`
6. `stage-manager` 检测产物判断成功/失败

### 批量执行

勾选插件 → POST /api/plugins/batch/enqueue → `queue.js` 按 maxAgentConcurrency 并发执行 → 前端轮询 GET /api/plugins/batch/status

### TPC 同步

POST /api/plugins/:id/sync-to-tpc → 添加 tpc remote → 更新 .gitignore → checkout 目标分支 → add/commit/push → 切回原分支 → 更新 lastSyncTime

### 5 个适配阶段


| #   | 阶段 ID          | 名称         | Agent                     | 产物文件                                  |
| --- | -------------- | ---------- | ------------------------- | ------------------------------------- |
| 1   | analysis       | 分析         | primary-01-analysis       | 01-analysis.json + 01-analysis-prd.md |
| 2   | planning       | 方案制定       | primary-02-planning       | 02-planning.json                      |
| 3   | coding-library | 编码         | primary-03-coding-library | 03-coding-library.json                |
| 4   | testing        | example生成   | primary-04-example-gen    | 04-testing.json                       |
| 5   | device-verify  | 测试验证       | primary-05-device-verify  | 04-device-verify.json                 |
| 6   | summary        | 适配总结       | primary-05-summary        | 05-summary.json                       |


## Profile 架构

系统通过 Profile 实现框架无关的扩展。每个 Profile 定义：

- **STAGES** — Agent 名称、prompt、产物文件、报告文件
- **ADAPTATION_DIR** — 产物存放路径
- **TPC 配置** — 目标组织 URL、分支名、commit 消息模板
- **branding** — 名称、标题、颜色
- **displayMaps** — 类型/架构/复杂度/建议等枚举映射
- **dashboardCards** — 详情页动态卡片配置
- **exportColumns** — CSV 导出字段
- **analyzePlugin** — 类型识别逻辑
- **extractors** — 列表页/详情页/导出的字段提取
- **workspaceDirs/workspaceFiles** — 需链接到 repo 的配置资源

添加新 Profile：在 `lib/profile/` 下建目录（含 `config.js`/`extractors.js`/`analyzer.js`/`index.js`），并在 `index.js` 中注册；如需独立 OpenCode 配置，在仓库根增加 `agent-<name>/`（含 `opencode.json`、`.claude`、`.opencode`），在 `config.js` 中设置 `agentDir`。

## 开发约定

1. 添加新 API 在 `routes/` 下建文件或扩展现有文件，`server.js` 中注册
2. 新前端模块放 `frontend/js/`，详情页子模块放 `frontend/js/detail/`
3. 运行时状态集中到 `lib/runtime-state.js`，不要在路由模块内维护状态
4. Profile 相关配置和显示逻辑放入对应 Profile 目录，不要硬编码
5. 数据结构变更需考虑向后兼容（`migrateData` 函数处理迁移）
6. 保持错误处理一致性：`asyncHandler` + `AppError`

## 依赖


| 包名                     | 用途               |
| ---------------------- | ---------------- |
| express ^4.18.2        | Web 框架           |
| cors ^2.8.5            | 跨域               |
| js-yaml ^4.1.1         | YAML 解析          |
| ajv ^8.18.0            | JSON Schema 校验   |
| ajv-formats ^3.0.1     | ajv 格式扩展         |
| archiver ^7.0.1        | ZIP 打包           |
| proper-lockfile ^4.1.2 | 文件锁             |


## 常见问题

- **端口占用** — `npm run restart` 自动处理；改端口修改 `lib/config.js` 和 `scripts/server.js`
- **克隆失败** — 检查网络、URL 格式、console.error 日志
- **报告未更新** — 确认产物文件在 `.ohos-adaptation/`，用"刷新报告"手动刷新
- **数据恢复** — plugins.json 是主数据源，列表还可从 `all_library_sources.json` + repos 目录恢复

