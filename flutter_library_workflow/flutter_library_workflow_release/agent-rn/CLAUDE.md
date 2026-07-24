# React Native 模块鸿蒙（OpenHarmony）适配项目 — 全局规则

本项目通过多阶段 Agent 流水线，自动化完成 React Native 三方模块到鸿蒙平台的适配工作。

## 项目上下文与路径约定

- **工作目录（CWD）**：Agent 在 `repos-rn/{module_name}/` 目录下运行
- **适配产物**：所有阶段输出写入 CWD 下的 `.rn-ohos-adaptation/` 目录
- **Agent 资源**：`.claude/`、`.opencode/`、`CLAUDE.md` 通过符号链接映射到每个 repo 目录中，Agent 直接通过**本地路径**访问

### 路径解析规则

CWD 内的 `.opencode/` 和 `.claude/` 是指向 Agent 资源目录的符号链接，直接用 `./` 前缀访问：

```
CWD = repos-rn/{module_name}/
./.opencode/       → Agent 资源目录（OpenCode 插件 等）
./.claude/         → Agent Prompt、Skills
./CLAUDE.md        → 本文件（全局规则）
../                → repos-rn/（同级模块仓库）
.rn-ohos-adaptation/  → 适配产物输出
```

### 通用资源路径

| 资源 | 从 CWD 访问 |
|------|------------|
| 阶段产物 Schema / 校验规范 | 加载 `tool-schema-validation` Skill（路径见 Skill 内说明） |
| Skills 目录 | `.claude/skills/` |
| 同级模块仓库 | `../` |
| 适配产物输出 | `.rn-ohos-adaptation/` |

---

## 数据架构

系统采用**两层数据架构**，`plugins.json` 只负责仓库列表管理，各模块的详细适配信息存放在各 repo 的 `.rn-ohos-adaptation/` 目录中。

**JSON Schema 与校验**：权威定义与完整生成流程（含 PostWrite Hook 说明）均在 **`tool-schema-validation` Skill** 中。系统已配置 PostWrite Hook：通过 `write`/`edit` 写入阶段产物 JSON 时会自动触发校验，详见该 Skill。

**补充说明**：md 报告都要使用中文输出。

---

## 信息检索体系

项目通过 **Skills** 和 **Subagent** 提供信息检索能力，不依赖本地静态资料库：

| 检索需求 | 使用方式 | 说明 |
|----------|----------|------|
| HarmonyOS SDK API 签名 / 类型定义 | `sub-doc-search` → `harmonyos-sdk-api-lookup` Skill | 搜索本地 SDK .d.ts 声明文件，零成本 |
| HarmonyOS 开发指南 / 权限 / Kit 教程（优先） | `sub-doc-search` → `harmonyos-docs-lookup` Skill | 本地 3300+ Markdown 文档快速查找，零成本 |
| RN OHOS 开发文档 / ETS API / TurboModule / Fabric | `rn-docs-lookup` Skill | 内置 RN for OpenHarmony 文档，覆盖 TurboModule、Fabric 组件、Autolinking、Codegen 等 |
| 已适配 RN 三方库 | `rn-adapted-library` Skill | RN 库的鸿蒙适配状态数据库 |
| 其他信息（社区方案、三方库等） | `sub-doc-search` → Web Search | 网络搜索兜底 |

---

## 平台检测标准（所有 Agent/Skill 共用）

在 JS/TS 层判断鸿蒙平台时，**必须**使用以下统一方案：

**首选方案：使用 `Platform.OS`**

React Native for OpenHarmony 中 `Platform.OS` 返回 `'harmony'`。

```tsx
import { Platform } from 'react-native';

if (Platform.OS === 'android') {
  // Android
} else if (Platform.OS === 'ios') {
  // iOS
} else if (Platform.OS === 'harmony') {
  // Harmony（鸿蒙）
}

// 或使用 Platform.select
const value = Platform.select({
  android: 'Android value',
  ios: 'iOS value',
  harmony: 'Harmony value',
  default: 'Default value',
});
```

> **禁止**：不允许使用排除法（`Platform.OS !== 'android' && Platform.OS !== 'ios'`）判断鸿蒙平台。

---

## 核心规则

### 1. 禁止猜测 API 签名

不确定的鸿蒙 API **必须**通过以下途径验证：
- 通过 `sub-doc-search` 搜索 SDK API（路由至 `harmonyos-sdk-api-lookup`）
- 通过 `sub-doc-search` 搜索开发文档（优先路由至 `harmonyos-docs-lookup`，补充使用 `harmonyos-docs-search`）
- 查阅 `rn-docs-lookup` Skill 中的 RN OHOS 开发文档

**绝不猜测** API 参数、返回值或权限要求。

### 2. 已适配库优先查询

分析和规划阶段，对所有 RN 依赖和原生依赖，**必须先查** `rn-adapted-library` Skill 的数据库，判断是否已有鸿蒙适配版本。已适配的库直接通过 npm 或 git 依赖引用，无需重复适配。

### 3. 自主工作原则

- 不要询问用户，不要等待确认
- 不要输出方案让用户选择
- 根据分析结果自主决策并执行
- 遇到不确定的情况，通过 Skill 和 subagent 检索文档自行解决

### 4. 阶段产物规范

每个阶段完成后，将产物写入 `.rn-ohos-adaptation/` 目录。每个阶段输出 **JSON 结构化数据** + **Markdown 人类可读报告**：

| 阶段 | JSON 产物 | Markdown 报告 |
|------|----------|--------------|
| analysis | `01-analysis.json` | `01-analysis-report.md` + `01-analysis-prd.md` |
| planning | `02-planning.json` | `02-planning-report.md` |
| coding-library | `03-coding-library.json` | `03-coding-library-report.md` |
| testing（example生成） | `04-testing.json` | `04-testing-report.md` |
| device-verify（测试验证） | `04-device-verify.json` | `04-device-verify-report.md` |
| summary | `05-summary.json` | `05-summary-report.md` + `INTEGRATION_GUIDE.md` |

**JSON 产物的完整生成流程**（读取 Schema → 写入 JSON → 自动校验与修复循环 → 写入报告 → 确认完整）：加载 **`tool-schema-validation` Skill** 并按其中「JSON 产物标准生成流程」执行。

### 5. TurboModule / Fabric 组件名称一致性

鸿蒙端实现的 TurboModule 名称**必须**与 JS Spec 文件中 `TurboModuleRegistry.get('NAME')` 的名称完全一致。Fabric 组件的 `codegenNativeComponent('NAME')` 同理。方法签名和参数类型同样必须与 Spec 声明匹配。

### 6. 代码质量

- ETS 代码遵循 ArkTS 编码规范
- C++ 代码遵循 RNOH C++ TurboModule/Component 接口规范
- 所有异步操作需正确处理错误
- 事件监听（DeviceEventEmitter）在组件卸载时必须移除

### 7. 工具使用约束

- 产物（JSON / Markdown / 代码）**必须**通过 `write` 或 `edit` 写入磁盘，**绝不**将内容输出到对话中代替写入
- 大型 JSON 直接用 `write` 一次性写入，不要用 `bash` + heredoc 拼接
- 读取文件失败时记录错误并继续，不要陷入重试循环
- `tool-schema-validation` Skill 中 `docs/` 说明文档读取失败时，按 Agent 定义中的字段列表和格式要求输出产物，优先保证下游可解析

### 8. 构建命令：必须使用 `rn.py`（禁止裸跑 hvigorw）

鸿蒙 **HAR / HAP** 的编译、依赖安装、pack tgz、Example 装包与 bundle 等步骤由 **`rn.py` 统一编排**。在插件仓库根（CWD）执行：

```bash
python .claude/skills/tool-ohos-plugin-repo/tool/rn.py build har --plugin-root .
python .claude/skills/tool-ohos-plugin-repo/tool/rn.py build hap --plugin-root .
```

| 目标 | 必须使用的命令 | 禁止替代 |
|------|----------------|----------|
| 编译库 **HAR** | `rn.py build har` | 直接 `hvigorw assembleHar`、DevEco 点构建、手改产物目录 |
| 编译 Example **HAP** | `rn.py build hap`（或 `--prepare-only` 等子命令） | 直接 `hvigorw assembleHap`、跳过 pack/install/bundle 的零散命令 |

**原因**：裸跑 `hvigorw` / 只编 harmony 子工程会导致 tgz 版本、ohpm 依赖、JS bundle、HAR 与 entry 链接**与流水线不一致**，后续 example / 真机测试易白屏或安装失败。

> **例外**：`device-verify` 阶段的 **`hvigorw onDeviceTest`** 由 `sub-device-verify` 用于跑 Hypium 仪器测试，**不能**代替 `build hap` 产出 Example HAP；编 HAP 仍须先 `rn.py build hap`。
