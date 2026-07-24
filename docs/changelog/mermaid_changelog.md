# Mermaid 图表变更日志

> 记录各文档的 Mermaid 图表添加/修改历史，确保跨文档一致性。

---

## 2026-07-24：flutter_zoom_drawer OHOS 适配 — Mermaid 全面覆盖

### 涉及文件

| 文件 | 位置 | Mermaid 图数 | 状态 |
|------|------|:--:|:--:|
| `docs/PRD：Flutter flutter_zoom_drawer 库鸿蒙（OpenHarmony）适配移植方案.md` | `docs/` | **2** | ✅ v1.0 |
| `docs/PRD：Flutter media_scanner 库鸿蒙（OpenHarmony）适配移植方案.md` | `docs/` | **5** | ✅ v2.0 |
| `flutter_zoom_drawer_ohos/.ohos-adaptation/flutter_zoom_drawer_prd.md` | `.ohos-adaptation/` | **8** | 🆕 新建 |
| `flutter_zoom_drawer_ohos/.ohos-adaptation/01-test-analysis-report.md` | `.ohos-adaptation/` | **3** | 🆕 新建 |
| `flutter_zoom_drawer_ohos/.ohos-adaptation/01-analysis.json` | `.ohos-adaptation/` | — | 🆕 新建 |
| `flutter_zoom_drawer_ohos/.ohos-adaptation/01-test-points.json` | `.ohos-adaptation/` | — | 🆕 新建 |

### 图表分布详情

#### PRD 文档（docs/）

**flutter_zoom_drawer PRD v1.0**（2 个）：
| 章节 | 类型 | 内容 |
|------|------|------|
| §1.2 软件架构 | `graph TB` | 包结构 → Flutter Engine → 平台层 |
| §3.4 数据流 | `sequenceDiagram` | 手势 → Controller → 动画 → 渲染 |

**media_scanner PRD v2.0**（5 个）：
| 章节 | 类型 | 内容 |
|------|------|------|
| §1.2 软件架构 | `graph TB` | 联邦插件架构：父包 → OHOS/Android |
| §3.1 目标架构 | `graph TB` | 三层架构：路由 → 桥接 → ArkTS 原生 |
| §3.2.1 调用链 | `sequenceDiagram` | loadMedia 双分支：OHOS + Android |

#### 分析 PRD（.ohos-adaptation/）

**flutter_zoom_drawer_prd.md**（8 个）：
| # | 章节 | 类型 | 内容 |
|---|------|------|------|
| 1 | §1.1 整体架构 | `graph TB` | App → Dart Lib → Engine → 6 平台 |
| 2 | §1.2 适配后架构 | `graph TB` | before/after 对比 + 不变部分 |
| 3 | §2.1 调用流程 | `sequenceDiagram` | 手势 + 编程双路径 + PopScope |
| 4 | §3.4 依赖链 | `graph LR` | 包 → SDK → Engine → 平台 |
| 5 | §4.4 适配步骤 | `flowchart LR` | 4 阶段流程 |
| 6 | §6.1 风险全景 | `graph TB` | Low/Medium 风险分级 |
| 7 | §6.1 风险分布 | `flowchart LR` | 风险严重度统计 |
| 8 | §6.3 环境依赖 | `graph TB` | 开发环境 → 插件 → Engine → 设备 |

#### 测试分析报告（.ohos-adaptation/）

**01-test-analysis-report.md**（3 个）：
| # | 章节 | 类型 | 内容 |
|---|------|------|------|
| 1 | §3.1 功能测试 | `graph TB` | 4 模块 → Flutter API → OHOS Engine |
| 2 | §3.1.1 F-01 | `stateDiagram-v2` | 4 状态迁移 + 阈值/fling 规则 |
| 3 | §3.1.1 F-01 | `flowchart TD` | 手势判定决策树 |

---

### Skill 变更

**文件**：`docs/flutter_library_workflow/skills/flutter-fast/01-test-analysis/SKILL.md`

**变更**：v3.3 → v3.4 — 新增 §1.4 Mermaid 可视化强制规范

| 新增内容 | 说明 |
|---------|------|
| §1.4.1 必须包含的图表类型 | 6 种必选图表：📦框架图 + 🏗️结构图/架构图 + 状态机图 + 判定流程图 + 时序图 + 依赖关系图 |
| §1.4.1 框架图 vs 结构图区分规则 | 7 维对比表：关注点/粒度/典型内容/subgraph/箭头含义/示例/何时必选 |
| §1.4.2 图表质量要求 | 布局方向规则、节点内容规范、subgraph 使用规范 |
| §1.4.3 分析阶段 PRD 图表要求 | 6 种 PRD 必选图表及其指定位置 |
| §1.4.4 质量检查清单 | 8 项 Mermaid 专项检查 |
| §十 质量检查清单更新 | 新增 3 项 Mermaid 检查项 |

---

## PRD 生成工作流（Skill 调用路径）

### 完整流程

```
需求输入 → 01-test-analysis → PRD + 测试报告 + 测试点 JSON
```

### 涉及 Skill 及路径

| 步骤 | Skill 名称 | Skill 路径 | 输出 |
|------|-----------|-----------|------|
| **Step 0** | 需求解析（requirement-parse） | `docs/flutter_library_workflow/skills/flutter/requirement-parse/SKILL.md` | `00-requirement.json` + `00-requirement-report.md` |
| **Step 1** | 源码分析（手工 / CLI） | —（直接读 `lib/` 目录） | 理解包类型、架构、依赖、API surface |
| **Step 2** | 测试分析（01-test-analysis） | `docs/flutter_library_workflow/skills/flutter-fast/01-test-analysis/SKILL.md` | `01-analysis.json` + `{项目}_prd.md` |
| **Step 3** | 测试分析 → 报告生成 | 同上 Skill（§3.1~§4.4） | `01-test-analysis-report.md` + `01-test-points.json` |
| **Step 4** | 🆕 Mermaid 可视化检查 | 同上 Skill（§1.4） | 验证图表数量和类型达标 |

### PRD 生成详细步骤

#### Step 0：读取已有需求数据

```bash
# 输入文件（如已存在）
{项目}/.ohos-adaptation/00-requirement.json
```

#### Step 1：阅读源码分析

```bash
# 必读文件
{项目}/lib/flutter_zoom_drawer.dart      # 入口 + export 列表
{项目}/lib/src/*.dart                     # 核心 Widget + 控制器 + 扩展
{项目}/lib/src/drawer_styles/*.dart       # 各风格实现
{项目}/lib/src/enum/*.dart                # 枚举定义
{项目}/pubspec.yaml                       # 依赖 + 版本
{项目}/README.md                          # 官方 API 文档
```

#### Step 2：生成分析 PRD

**输出路径**：`{项目}/.ohos-adaptation/{项目}_prd.md`

**章节结构**（对标 `media_scanner\.ohos-adaptation\01-analysis-prd.md`）：

```
1. 插件概述
  1.1 插件整体架构（📦 框架图：graph TB）
  1.2 适配后目标架构（🏗️ 结构图：graph TB 对比 before/after）
2. 能力清单
  2.1 调用流程（📊 时序图：sequenceDiagram）
3. 架构分析
  3.1 Dart 层
  3.2 原生层 / 零原生层
  3.3 平台注册
  3.4 依赖链（🔗 依赖图：graph LR）
4. 适配方案
  4.1 插件类型判断
  4.2 核心 API 映射
  4.3 权限需求
  4.4 适配步骤摘要（🔄 流程图：flowchart LR）
  4.5 模块结构
  4.6 复杂度评估
5. 判定依据
6. 风险汇总
  6.1 风险全景图（🚨 风险图：graph TB + flowchart LR）
  6.2 风险清单
  6.3 环境依赖全景（🏗️ 环境图：graph TB）
```

#### Step 3：生成测试分析报告

**输出路径**：`{项目}/.ohos-adaptation/01-test-analysis-report.md`

**Mermaid 要求**（见 SKILL.md §1.4）：
- 1 个测试架构总览图（§3.1 开头）
- 1 个状态机图（P0 状态转换模块）
- 1 个判定流程图（多条件模块）

**输出路径**：`{项目}/.ohos-adaptation/01-test-points.json`

#### Step 4：Mermaid 质量检查

执行 SKILL.md §1.4.4 清单，验证：
- 框架图 + 结构图 各 ≥ 1
- 测试报告 mermaid ≥ 3
- 分析 PRD mermaid ≥ 4
- stateDiagram-v2 ≥ 1
- sequenceDiagram ≥ 1
- 架构图 subgraph ≥ 3 层

### 关键文件路径速查

| 用途 | 路径 |
|------|------|
| 🔧 测试分析 Skill | `docs/flutter_library_workflow/skills/flutter-fast/01-test-analysis/SKILL.md` |
| 🔧 报告模板 | `docs/flutter_library_workflow/skills/flutter-fast/01-test-analysis/assets/report-template.md` |
| 🔧 IBO 模型 | `docs/flutter_library_workflow/skills/flutter-fast/01-test-analysis/references/ibo-model.md` |
| 🔧 插件类型 | `docs/flutter_library_workflow/skills/flutter-fast/01-test-analysis/references/plugin-types.md` |
| 📦 media_scanner 参考 | `flutter_library_workflow/.../repos-flutter-fast/media_scanner/.ohos-adaptation/` |
| 📦 产物输出 | `{项目}/.ohos-adaptation/` |
| 📋 本日志 | `docs/mermaid_changelog.md` |
