# Adapt Workflow

批量管理插件跨平台适配的工作流系统。通过 Profile 架构支持多框架扩展（当前内置 Flutter→鸿蒙 Profile）。

## 功能特性

- 添加插件仓库并自动克隆（支持单个 / 批量 / 一键全部）
- Profile 驱动的插件分析（Flutter Profile 解析 pubspec.yaml 识别类型）
- 5 阶段 AI Agent 流水线（分析 → 方案 → 编码 → Example → 总结）
- SSE 实时日志流与阶段产物查看
- 全局执行队列与并发控制
- Token 用量统计（基于 OpenCode DB）
- 三路合并插件列表（全量清单 + plugins.json + repos 目录）
- 多维度筛选（状态、类型、架构、复杂度、评分、来源）
- TPC 组织同步（一键推送适配代码到目标分支）
- 可视化 Dashboard（Profile 驱动的动态卡片）
- 导出 CSV 表格

## 快速开始

```bash
cd adapt-workflow
npm install
npm start          # 启动（自动终止占用 3000 端口的进程）
# npm run stop     # 仅停止
# npm run restart  # 先停后启
```

浏览器打开 http://localhost:3000

## 使用流程

1. **添加插件** — 粘贴 Git 仓库地址，系统自动克隆、分析类型、记录 commit；也可导入 `all_library_sources.json` 全量清单
2. **运行适配** — 进入详情页逐阶段执行 / 全部执行 / 批量执行（列表页勾选加入全局队列）
3. **查看结果** — Dashboard 关键指标、每阶段 Markdown 报告 / PRD / JSON 产物、实时日志
4. **同步到 TPC** — 一键推送适配代码到 TPC 组织目标分支
5. **导出数据** — CSV 表格下载

## 技术栈

Node.js + Express 后端，原生 HTML/CSS/JS 前端（ES Modules），无构建步骤。

详细的项目结构、API 端点、代码约定、数据模型等技术文档见 [AGENTS.md](./AGENTS.md)。
