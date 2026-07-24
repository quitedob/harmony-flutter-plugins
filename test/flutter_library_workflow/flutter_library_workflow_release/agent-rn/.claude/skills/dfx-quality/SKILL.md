---
name: dfx-quality
description: React Native 模块鸿蒙适配 DFX 质量门禁 Skill。对 JS/TS/ETS 代码执行自动化 DFX 质量检测。覆盖性能优化（FlatList 配置、React.memo）、日志规范（console.log 移除）、跨层一致性（Channel/EventType 名称）。告警项需确认修复。
---

# RN OHOS DFX 质量门禁

## 工具规则索引

| 工具 | 规则编号 | 检测内容 | 自动修复 | 参考文件 |
|------|---------|---------|---------|---------|
| `fix_js.py` | 1 | FlatList/SectionList 缺性能配置（removeClippedSubviews、getItemLayout、windowSize） | 否 | `references/performance.md` §1 |
| `fix_js.py` | 2 | 列表 Item 缺 React.memo | 否 | `references/performance.md` §2 |
| `fix_js.py` | 3 | console.log/debug/info 仍在使用 | **是** | `references/stability.md` §3 |
| `fix_ets.py` | 1 | console.log/debug/info 仍在使用 | **是** | `references/stability.md` §3 |
| `cross_layer_checker.py` | 1 | Channel 名称 JS↔ETS 不一致 | 否 | `references/stability.md` §1 |
| `cross_layer_checker.py` | 2 | EventType 名称 JS↔ETS 不一致 | 否 | `references/stability.md` §2 |

---

## 工具输出快速定位

### fix_js.py — JS/TS 层扫描

| 规则 | 参考文件 | 文件规则 | 检查项 |
|------|---------|---------|--------|
| 1 | references/performance.md | §1 | FlatList/SectionList 缺 removeClippedSubviews/getItemLayout/windowSize → 按 §1 补充配置 |
| 2 | references/performance.md | §2 | renderItem 未用 React.memo 包裹 → 按 §2 包裹 React.memo |
| 3 | references/stability.md | §3 | `console.log`/`debug`/`info` 仍在使用 → 自动移除 |

### fix_ets.py — ETS 层扫描

| 规则 | 参考文件 | 文件规则 | 检查项 |
|------|---------|---------|--------|
| 1 | references/stability.md | §3 | `console.log`/`debug`/`info` 仍在使用 → 自动移除 |

### cross_layer_checker.py — 跨层一致性

| 规则 | 参考文件 | 文件规则 | 检查项 |
|------|---------|---------|--------|
| 1 | references/stability.md | §1 | JS `TurboModuleRegistry.get('NAME')` 与 ETS `getName()` 返回值不一致 → 统一名称 |
| 2 | references/stability.md | §2 | JS `DeviceEventEmitter.addListener('event')` 与 ETS `emitDeviceEvent('event')` 不一致 → 统一事件名 |

---

## 检测要求（全局）

- 结合整个文件上下文分析，不孤立看待某一行代码
- 相同代码问题只报一次
- 自动跳过 `test/`、`__tests__/`、`generated/` 目录下的文件
- `ohos/example/` 下的代码不在库检测范围

---

## 工具使用方法

### fix_js.py — JS/TS 层 DFX 扫描

```bash
# 检测（不修改）
python .claude/skills/dfx-quality/tool/fix_js.py --target <js_src_dir> --dry-run --json

# 检测并自动修复（console.log 自动移除）
python .claude/skills/dfx-quality/tool/fix_js.py --target <js_src_dir> --json
```

### fix_ets.py — ETS 层 DFX 扫描

```bash
# 检测（不修改）
python .claude/skills/dfx-quality/tool/fix_ets.py --target <ets_dir> --dry-run --json

# 检测并自动修复（console.log 自动移除）
python .claude/skills/dfx-quality/tool/fix_ets.py --target <ets_dir> --json
```

### cross_layer_checker.py — 跨层一致性检测

```bash
python .claude/skills/dfx-quality/tool/cross_layer_checker.py \
  --js-target <js_src_dir> \
  --ets-target <ets_dir> --json
```

---

## 命令行工具退出码

| 退出码 | 含义 |
|--------|------|
| 0 | 检测通过（无文件或无告警均返回 0） |
| 1 | 目标目录不存在 |
| 2 | 仍有未处理告警（仅非 `--json` 模式） |

> **`--json` 模式**：所有情况均返回 exit 0，需通过 JSON 输出中的告警字段判断结果。

---

## Agent 核对表

在 03-coding-library 阶段步骤 2.6 中，主 Agent 通过 `sub-dfx-quality` 子代理执行 DFX 检测。子代理内部流程：

| 步骤 | 操作 | 工具/命令 |
|------|------|----------|
| 1 | 加载 Skill | `skill({ name: "dfx-quality" })` |
| 2 | 确定检测范围 | 读取 `02-planning.json` |
| 3 | 运行 JS/TS 层 DFX 检测（dry-run） | `fix_js.py --target <js_dir> --dry-run --json` |
| 4 | 运行 ETS 层 DFX 检测（dry-run） | `fix_ets.py --target <ets_dir> --dry-run --json` |
| 5 | 运行跨层一致性检测 | `cross_layer_checker.py --js-target <js_dir> --ets-target <ets_dir> --json` |
| 6 | 修复告警 + 编译验证 | 修复 channel/event 不一致 + `rn.py build har` |
| 7 | 检查项核对 | SKILL.md「检查项快速参考」6 条逐项 |
| 8 | 输出产物 | `03-dfx-quality.json` |
| 9 | 写入日志总结 | `.rn-ohos-adaptation/logs/dfx-quality.log` |

### 确认标准

- 所有告警项均已处理（确认修复或确认为误报）
- console.log 已全部自动移除
- 编译验证通过（exit 0）
- 子代理返回 `OK`（而非 `FAILED`）

---

## 检查项快速参考

以下检查项无法通过自动化工具检测，需 Agent 结合业务逻辑核对。先检查「跳过条件」，不满足则跳过该规则。

| 规则 | 参考文件 | 检查项 | 处理方式 | 跳过条件 |
|------|---------|--------|---------|---------|
| — | references/performance.md §1 | FlatList 是否配置了 removeClippedSubviews/getItemLayout/windowSize | 补充配置项 | 文件无 FlatList/SectionList |
| — | references/performance.md §2 | 可复用组件是否使用 React.memo 包裹 | 包裹 React.memo | 文件无 FlatList/SectionList |
| — | references/performance.md §3 | 属性对象是否创建一次（避免内联函数/对象） | 提取为常量或 useCallback | 文件无内联函数/对象 |
| — | references/stability.md §1 | ETS Channel 名称是否与 JS 侧完全一致 | 统一名称 | 文件无 TurboModule |
| — | references/stability.md §2 | ETS EventType 名称是否与 JS 侧完全一致 | 统一名称 | 文件无 DeviceEventEmitter |
| — | references/stability.md §2 | 事件数据结构两端是否一致 | 对齐数据结构 | 文件无 DeviceEventEmitter |
