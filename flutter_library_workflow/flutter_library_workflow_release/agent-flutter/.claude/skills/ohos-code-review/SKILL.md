---
name: ohos-code-review
description: Flutter 插件鸿蒙适配代码审查 Skill。对 ETS/Dart/Channel 代码执行质量门禁审查。覆盖 ArkTS 语言合规、假实现检测、Channel 契约一致性、平台判断、权限、资源释放、日志规范、安全编码。P0/P1 阻断必须修复后才能写入阶段产物。
---

# Flutter 鸿蒙化代码审查（统一入口）

## §1 定位

本 Skill 是强约束门禁，不是教程。

在以下场景必须加载：

- 03-coding-library 阶段完整性校验通过后，执行代码质量审查（范围：`ohos/src/main/ets/` 库代码）
- 04-testing 阶段编译成功后，对 `example/ohos/` 下 ETS 文件执行代码审查（至少覆盖 G.NAM.06 魔法值扫描），**必须调用**
- 04-testing 阶段修复库代码后，可选二次调用
- 手动审查已有适配代码

### 与其他 Skill 的关系

| Skill / Subagent | 职责 | 与本 Skill 的关系 |
|-------------------|------|-------------------|
| `arkts-rules` | 编译期 ArkTS 语法约束 | 本 Skill 的 ETS 审查规则是其在适配场景下的超集，增加运行时质量规则 |
| `sub-adaptation-completeness-check` | 功能完整性（"有没有实现"） | 本 Skill 管代码质量（"实现得好不好"），串行执行，先完整性再质量 |
| `ohos-coding-guide` | 编码时的正向指导 | 本 Skill 是编码后的逆向检验 |

---

## §2 优先级定义

- **P0 阻断**：必须立即修复。包括编译失败、公开 API 行为破坏、请求无法进入 ETS、假成功、严重安全/隐私问题。
- **P1 阻断**：最终产物前必须修复。包括高概率运行时崩溃、权限失效、异步竞态、资源泄漏、错误平台分支、未验证 API。
- **P2 风险**：不阻断流程，但**必须尝试修复**。仅当修复会引入更大风险（如改变业务逻辑语义）时，才允许标记为 `risk_recorded` 并写入 `risk_items` 说明原因和缓解措施。
- **P3 建议**：风格、命名或格式化问题，不阻断流程，但**必须修复**。此类问题通常为机械性修改（改引号、加修饰符、重命名等），修复成本极低，不存在"无法修复"的情况。

**门禁规则**：存在任何 P0/P1 未修复时，不得写入最终阶段产物。P2/P3 未修复不阻断，但 `issues_fixed` 应体现实际修复数量。

---

## §3 规则文件索引（按需加载）

根据本阶段变更文件的类型，用 `read_file` 加载对应的审查规则文件：

| 变更文件类型 | 加载规则文件 |
|-------------|------------|
| `.ets` / `.ts` | `.claude/skills/ohos-code-review/references/ets-review-rules.md` |
| `.ets` / `.ts` | `.claude/skills/ohos-code-review/references/codeart-check-rules.md`（CodeArts Check 增量规则；其机械扫描已由 §4.1 的 `scripts/review-scan.cjs` 自动执行，本文件作为规则语义与修复指导） |
| `.dart` | `.claude/skills/ohos-code-review/references/dart-review-rules.md` |
| 含 MethodChannel / EventChannel / BasicMessageChannel 实现 | `.claude/skills/ohos-code-review/references/channel-review-rules.md` |
| 混合变更 | 全部加载 |

---

## §4 检测要求（全局）

- 结合整个文件上下文分析，不孤立看待某一行代码
- 相同代码问题只报一次
- 对每个发现的问题仔细检查是否真实存在，反思一遍，避免误报
- 只审查本阶段变更的文件（`files_created` + `files_modified`）
- 自动跳过 `test/` 目录下的测试代码
- `example/lib/` 下的代码不在库审查范围（由 04-testing 阶段处理）
- `example/ohos/` 下的框架生成代码在 03 阶段不审查（由 04-testing 阶段在编译成功后统一处理）

### §4.1 CodeArts Check 强制扫描（ETS 文件必须执行）

对每个变更的 `.ets` / `.ts` 文件，在阅读代码**之前**，必须先运行统一扫描工具 `review-scan.cjs`（混合架构：本地 CodeLinter + 轻量扫描器），把其结构化输出作为机械类问题的完整审查输入。它**一次调用**替代了过去的几十条 grep，并自动完成去重、分级、魔法值归并、逐组日志。逐条确认后，真实违规**必须修复**。

> 该工具与 `agent-android-sdk` 的 `ohos-sdk-code-review/scripts/` 同源（方案 A 复制落地）。架构、规则映射与跨平台细节见 `scripts/README.md` 与 `scripts/rule-manifest.json`。

**调用方式**（CWD 为插件仓库根 `repos/{plugin_name}/`；脚本走 CWD 相对路径，`--files` 用绝对路径或相对 `--project` 的路径）：

```bash
node "./.claude/skills/ohos-code-review/scripts/review-scan.cjs" \
  --stage <03|04> \
  --project "<ETS 工程根>" \
  --log .ohos-adaptation/logs/code-review.log \
  --report .ohos-adaptation/logs/code-review-report.md \
  --json-out .ohos-adaptation/logs/code-review-scan.json \
  --files <变更文件1> <变更文件2> ...
```

- **03-coding-library 阶段**：`--stage 03`；`--project ohos`（含 `oh-package.json5`/`build-profile.json5` 的 HAR 模块根）；`--files` 传本阶段变更的 `ohos/src/main/ets/` 下文件（**路径相对 `--project`，即 `src/main/ets/...`，或用绝对路径**）。
- **04-testing 阶段**：`--stage 04`；`--project example/ohos`（完整 DevEco 工程根）；`--files` 传 `example/ohos/entry/src/main/ets/` 和 `example/ohos/entry/src/ohosTest/ets/` 下全部 `.ets`（含脚手架；路径相对 `--project` 即 `entry/src/main/ets/...`，或用绝对路径）。
- ⚠️ **`--files` 相对 `--project` 解析**（不是相对 CWD）。把库代码路径直接当 `--files` 而 `--project=ohos` 会被解析成 `ohos/ohos/...` 导致"无有效目标文件"。**最稳妥：`--files` 一律传绝对路径。**

> **运行时排障**：务必带上 `--log`（追加诊断日志）与 `--report`（人读 Markdown 报告）。诊断头含 mode、CodeLinter 版本/路径/是否可用、自检触发规则、降级规则、耗时、跳过文件、警告——定位「为何降级 / 为何漏报 / 用了哪个引擎」全看它。带 `--json-out` 时诊断头同时打到 stderr。

- **默认开启自动修复**（CodeLinter `--fix`）：对纯格式、不改语义的规则（引号、`T[]`、关键字空格、大括号风格等）**自动改写文件**，每条修复以 `status: auto_fixed` 记入 `findings`（可审计，计入 `summary.auto_fixed`）。`--no-apply-fix` 关闭；`--no-codelinter` 强制只用轻量扫描器（调试用）。
- ⚠️ 默认会**改写工作树文件**（仅纯格式）。若目标文件此前已 `flutter build hap` 编译过，自动修复后建议复编一次确认无碍；`DEGRADED_CUSTOM`（无 CodeLinter）下自动修复不生效。

**输出（stdout JSON）关键字段**，直接作为审查与产物输入：

- `engine.mode`：`FULL_CODELINTER` / `HYBRID_PARTIAL` / `DEGRADED_CUSTOM`。`DEGRADED_CUSTOM` 表示本机无 CodeLinter 或 fixture 自检判定其规则未实际执行，仅用轻量扫描器，须在 `03-code-review.json` 注明"精度降级"。
- `engine.coverage.by_rule`：每条规则实际由 `codelinter` 还是 `custom` 负责（运行时 fixture 自检得出；**不要假设**某规则一定被 CodeLinter 覆盖）。
- `findings[]`：每条含 `rule`(cr-*)、`g_id`、`severity`(P0–P3)、`file`、`line`、`snippet`、`confidence`(`confirmed`/`needs_review`)、`status`(`open` 待修 / `auto_fixed` 已自动修)。可直接落入 `03-code-review.json` 的 `issues`。
- `summary`：`p0..p3` 为**剩余**(open) 计数；`auto_fixed` 为已自动修复计数。退出码门禁只看剩余 P0/P1。
- `magic_values[]`：已**按值去重**的魔法值清单（值 + 全部用法点 sites + 占位常量名 suggest_name）。
- `log_lines[]`：逐规则命中记录（含"无命中"），工具已写入 `--log` 指定的 `code-review.log`。

**退出码**：`0`=无 P0/P1；`10`=存在 P0/P1（门禁阻断，须修复后重跑）；`20`=工具自身错误。

> **与旧 grep 版的口径差异（务必知晓）**：
> 1. **魔法值口径对齐 CodeLinter**：工具忽略 `0` / `1` / `-1` 与纯数组下标 `arr[0]`，避免无谓改动。旧 grep 要求"所有数值字面量含 0/1/-1 都不豁免"——新口径更贴近 CodeArts Check `no-magic-numbers` 的实际行为。若代码中确有语义关键的 `0`/`1`（如 sentinel）值得命名，可在阅读阶段补入。
> 2. **G.EXT.01 成员修饰符检查已移除**：旧 grep 那条"类成员缺修饰符"（带 `onAttachedToEngine` 等接口方法豁免）为高误报 P3，混合扫描器未实现该规则。命名/修饰符仍由 CodeLinter `naming-convention` 与 §4 整体阅读兜底。

> **日志要求**：`code-review.log` 由工具自动逐规则写入（格式 `[Group N] 规则ID(引擎规则) — 命中数 / 详情`），禁止再用一句 "scanning completed" 概括。

#### 扫描结果处理规则

1. 工具**必须执行**，不可跳过；把 `findings` + `magic_values` 作为机械类问题的完整清单。
2. `status=auto_fixed` 的项已由工具**自动改入代码**，无需模型再改；须在 `03-code-review.json` 以 `status: fixed` 记入 `issues`，并把 `summary.auto_fixed` 计入 `review_summary.issues_fixed`（保证门禁可审计、不静默改码）。
3. `confidence=confirmed` 的项直接按规则修复；`confidence=needs_review` 的项（如 `cr-json-try-catch`、`cr-file-stream-close`、密钥/日志相关）须结合上下文确认是否真实违规（参照 §5 排除误报）后再修。
4. `cr-native-residue`(P0) 与各 P1 项**立即修复**；修复后在 `issues` 标 `status: fixed`。
5. `cr-magic-value` / `magic_values` 按下方"魔法值修复流程"两步走执行。
6. `engine.mode=DEGRADED_CUSTOM` 时，轻量扫描器精度低于 CodeLinter，对 P2/P3 机械项需更谨慎复核。
7. 工具扫描完成后，**仍须进行整体代码阅读审查**，覆盖工具无法捕获的语义类问题：假实现、资源对称释放、Channel 契约一致性、平台分支等（见 §3 各规则文件）。

> **G.NAM.06 魔法值修复流程**（两步走：工具发现 → 阅读代码全量替换）：
>
> 工具输出的 `magic_values[]` 已是**按值去重**的清单，口径对齐 CodeLinter；清单中每个值都须按语义提取为命名常量。
>
> **第一步（读清单）**：以 `magic_values[]` 为魔法值来源，每项含该值的**全部用法点 sites**。
>
> **第二步（阅读代码补全 + 全量替换）**：阅读代码时补出工具未覆盖的遗漏魔法值（赋值、运算、return 等语义场景），加入清单。然后：
> 1. 在文件顶部（`import` 后、`class` 前）集中声明 UPPER_SNAKE_CASE 常量，命名须语义化（如 `MIN_POWER_DB = -120`，禁止 `MINUS_120 = -120`、禁止用 `magic_values[].suggest_name` 的占位 `MAGIC_*`）
> 2. 全文搜索替换：将该值在 sites 中的**每一处**替换为常量引用
> 3. 同一数值在不同语义场景可定义多个常量（如 `1000` 可为 `MS_PER_SECOND`，另处为别的语义）
> 4. 以 issue 粒度记录到 `issues` 数组时，**按去重的魔法值分组**（一个魔法值 = 一条 issue），不要每处用法单独记录

---

## §5 忽略规则（全局）

- 框架生成代码（`flutter create` 脚手架自动生成的文件）：
  - **03-coding-library 阶段**：不审查（`example/ohos/` 可能尚不存在，且不属于库代码范围）
  - **04-testing 阶段**：**必须审查** `example/ohos/entry/src/main/ets/` 和 `example/ohos/entry/src/ohosTest/ets/` 下的所有 ETS 文件（至少覆盖 G.NAM.06 魔法值），修复后需重新编译
- 第三方库代码（`oh_modules/`、`.pub-cache/`）不审查
- 已在 `not_implemented` 中声明且代码路径返回 `result.notImplemented()` 的方法，不再报假实现
- `hilog` 中使用 `%{public}s` 等格式化占位符的**字符串**参数不视为硬编码字符串（但 hilog 中的**数值**参数如 `granted ? 1 : 0` **不豁免**，必须消除数值字面量）
- 仅当代码片段中明确存在新的监听注册，且完全缺失对应取消逻辑时，报告资源泄漏
- 对于框架标准模式（如 `FlutterPlugin` 接口实现、装饰器嵌入字符串），不报告命名或硬编码问题
- 接口实现方法（`FlutterPlugin`/`MethodCallHandler`/`AbilityAware` 等定义的 `onAttachedToEngine`、`onDetachedFromEngine`、`onMethodCall`、`getUniqueClassName`、`onAttachedToAbility`、`onDetachedFromAbility`）不要求显式 `public` 修饰符

---

## §6 审查产物格式

**产物路径**：`.ohos-adaptation/03-code-review.json`
**日志路径**：`.ohos-adaptation/logs/code-review.log`

### JSON 结构

```json
{
  "review_summary": {
    "files_reviewed": 0,
    "issues_found": 0,
    "issues_fixed": 0,
    "issues_remaining": 0,
    "p0_remaining": 0,
    "p1_remaining": 0,
    "p2_remaining": 0,
    "p3_remaining": 0
  },
  "issues": [
    {
      "severity": "P0 | P1 | P2 | P3",
      "category": "ets_language | fake_impl | error_handling | async_safety | resource_release | hilog | security | naming | platform_branch | api_invariance | type_safety | export_contract | native_residue | channel_name | channel_args | channel_return | event_channel | error_code | codeart_check",
      "file": "ohos/src/main/ets/XxxPlugin.ets",
      "line": 42,
      "rule": "cr-no-any-business",
      "description": "使用 any 类型表示业务数据，应定义 interface",
      "status": "fixed | remaining | risk_recorded"
    }
  ],
  "files_modified": []
}
```

所有级别（P0-P3）的问题均须记录到 `issues` 数组中，包括已修复的和未修复的。

### 门禁判定

- `p0_remaining > 0` 或 `p1_remaining > 0` → **审查未通过**，不得进入后续阶段
- `p2_remaining > 0` 或 `p3_remaining > 0` → **审查通过**，但应尽量修复后再进入后续阶段
- 全部为 0 → **审查通过**
