# CodeLinter 集成（硬前置 · 全量扫描）

> 阶段1 用 DevEco Studio CodeLinter 做静态扫描。**CodeLinter 是本 Skill 的硬性前置**：未探测到则**不评估、不产出报告**，仅提示缺少 CodeLinter。本 Skill **只评估、不调用 `--fix`**。
> 
> 本文档配套：[完整规则集](rule-sets-reference.md) · [配置示例](config-examples.md) · [官方文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-code-linter)。

## 目录
- [1 硬前置：探测 CodeLinter（未命中即止）](#1-硬前置探测-codelinter未命中即止)
- [2 规则集配置（全量扫描）](#2-规则集配置全量扫描)
- [3 运行 CodeLinter](#3-运行-codelinter)
- [4 解析 JSON 输出](#4-解析-json-输出)
- [5 CodeLinter 报告汇总（不拆维度）](#5-codelinter-报告汇总不拆维度)
- [评估清单](#评估清单)

---

## 1 硬前置：探测 CodeLinter（未命中即止）

CodeLinter 是 DevEco Studio 内置的 Node 入口脚本，命令格式 `node <CODELINTER> [options] [dir]`（`dir` 为工程根目录，默认当前目录）。开始评估前先探测，找到后记录 `CODELINTER` 路径：

```bash
# macOS：探测常见安装位置
ls /Applications/DevEco-Studio.app/Contents/plugins/codelinter/run/index.js 2>/dev/null \
  && echo "CODELINTER=/Applications/DevEco-Studio.app/Contents/plugins/codelinter/run/index.js"
```

```powershell
# Windows PowerShell：探测常见安装位置
$candidates = @(
  "$env:LOCALAPPDATA\Huawei\DevEco Studio\plugins\codelinter\run\index.js",
  "C:\Program Files\Huawei\DevEco Studio\plugins\codelinter\run\index.js",
  "C:\Program Files (x86)\Huawei\DevEco Studio\plugins\codelinter\run\index.js",
  "D:\Program Files\Huawei\DevEco Studio\plugins\codelinter\run\index.js",
  "D:\Program Files (x86)\Huawei\DevEco Studio\plugins\codelinter\run\index.js"
)
$found = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if ($found) { Write-Host "CODELINTER=$found" } else { Write-Host "未找到，请手动指定" }
```

- **命中** → 记录 `CODELINTER` 路径，进入 第2步。
- **探测失败** → 可问用户 DevEco Studio 安装目录后拼接 `/plugins/codelinter/run/index.js` 重试。
- **确实未安装 / 拿不到路径** → **立即停止评估，不产出任何报告**，仅回复：
  > 未检测到 DevEco Studio CodeLinter，无法进行三方库质量评估。请安装 DevEco Studio 后重试（CodeLinter 位于 `<DevEco 安装目录>/plugins/codelinter/run/index.js`）。

## 2 规则集配置（全量扫描）

**启用全部 8 个规则集**。在 **scratch 目录**（而非被评估库根目录）生成 `codelinter.json5`，`ignore` **必须**排除依赖与构建产物：

```json
{
  "files": ["**/*.ets", "**/*.ts", "**/*.js"],
  "ignore": ["**/oh_modules/**", "**/build/**", "**/.preview/**", "**/node_modules/**"],
  "ruleSet": [
    "plugin:@typescript-eslint/recommended",
    "plugin:@hw-stylistic/recommended",
    "plugin:@performance/recommended",
    "plugin:@security/recommended",
    "plugin:@correctness/recommended",
    "plugin:@cross-device-app-dev/recommended",
    "plugin:@compatibility/recommended",
    "plugin:@previewer/recommended"
  ],
  "rules": {}
}
```
**配置字段**：`files`（检查范围 glob）、`ignore`（排除目录，`oh_modules`/`build` 必排）、`ruleSet`（规则集列表）、`rules`（单条规则覆盖，可选）、`overrides`（按路径差异化，可选）。

- 默认 `:recommended`（告警量适中）；
- 库型分类（UI / 逻辑 / NAPI）只影响阶段2–4 的**人工评审侧重**，**不影响规则集选择**——此处一律全量。
- （可选）`rules` 可单独调级，级别值 `off`/`warn`/`error`/`suggestion`，例如 `"@hw-stylistic/max-len": ["warn", { "code": 120 }]`。

> 完整规则 ID 见 [rule-sets-reference.md](rule-sets-reference.md)；更多配置示例见 [config-examples.md](config-examples.md)。

## 3 运行 CodeLinter

```bash
# 输出 JSON 到 scratch 目录，绝不写入被评估库；只评估、不加 --fix
node <CODELINTER> -c <scratch>/codelinter.json5 -f json -o <scratch>/lint.json <lib-dir>
```

**完整命令行参数**：

| 参数 | 说明 |
|------|------|
| `[dir]` | 待检查的工程根目录（不指定则用当前目录） |
| `-c/--config <filepath>` | 指定配置文件（默认读取 `code-linter.json5`） |
| `--fix` | 执行 QuickFix 自动修复（**本 Skill 不使用**） |
| `-f/--format <format>` | 输出格式：`default` / `json` / `xml` / `html` |
| `-o/--output <filepath>` | 结果保存到文件（控制台不显示） |
| `-i/--incremental` | 仅检查 Git 增量文件 |
| `-p/--product <productName>` | 多 product 工程指定 product |
| `-e/--exit-on <levels>` | 哪些级别返回非零退出码，逗号分隔（如 `error,warn`） |
| `-v/--version` ｜ `-h/--help` | 版本 / 帮助 |

**`--exit-on` 退出码**（3 位二进制 error/warn/suggestion 转十进制；CI 门禁可用 `-i -e error,warn`）：

| 配置 | 结果包含 | 退出码 |
|------|---------|--------|
| `--exit-on error` | error、warn、suggestion | `4`（100₂） |
| `--exit-on error,warn` | error、warn | `6`（110₂） |
| `--exit-on error` | 仅 warn | `0`（000₂） |

## 4 解析 JSON 输出

JSON 为数组，按文件分组，每文件含 `messages[]`：

```json
[
  {
    "filePath": "/path/to/entry/src/main/ets/pages/Index.ets",
    "messages": [
      {
        "line": 42,
        "column": 8,
        "severity": "warn",
        "message": "Preferentially use the @Builder method instead of custom components.",
        "rule": "@performance/avoid-overusing-custom-component-check"
      }
    ]
  }
]
```

每条 message 含 `line`、`column`、`severity`、`message`、`rule`。severity → 本 Skill 级别：

| CodeLinter severity | 本 Skill 级别 |
|------|------|
| `error` | 🔴 `[blocking]` |
| `warn` | 🟡 `[important]` |
| `suggestion` | 🟢 `[nit]` / 💡 |

> linter 的 severity 是默认级别，最终级别仍需结合库语境校准（例如导出面 `export *` 即使报为 warn，对库而言可升级为 🔴）。

## 5 CodeLinter 报告汇总（不拆维度）

> **CodeLinter 报告独立成节、不拆到 A1/A2/B1/B2。** 它是自动化扫描的客观证据，**整体按严重级别（🔴/🟡/🟢）归并、再按规则集分组**即可；维度判断（架构 A1+A2 / 代码质量 B1–B2）由阶段2–3 **人工白盒评审**独立给出。二者**并列、互不灌入**——不必把"绝大多数落在代码质量、A1 根本无规则映射、A2 仅有软线索"的 lint 命中硬塞进各子维度。

**怎么汇总**（写入报告「六、CodeLinter 扫描结果」节）：

1. **按级别计数**：🔴 error X · 🟡 warn Y · 🟢 suggestion Z（severity → 级别见 [§4](#4-解析-json-输出)，并结合库语境校准，如导出面 `export *` 报 warn 可升 🔴）。
2. **按规则集分组列命中**：每组给「规则 ID × 次数」+ 1–2 条代表 `file:line`，高频规则优先。**不逐条分派维度。**
3. **不做维度归类**：报告的架构(§三)/代码质量(§四)小节只放**人工评审**结论；lint 报告作为独立证据并列于(§六)，**不含任何维度交叉引用**。

## 评估清单

### 硬前置
- [ ] 已探测到 CodeLinter（**未探测到 → 已停止评估、仅提示，无报告、无后续阶段**）

### 配置与运行
- [ ] `codelinter.json5` 生成在 scratch 目录，已排除 oh_modules/build/.preview/node_modules
- [ ] 已启用全部 8 个规则集（不按库型筛选）
- [ ] `-f json -o` 输出到 scratch 目录（未写入被评估库），未使用 `--fix`

### 汇总与评审
- [ ] 命中按 severity → 🔴/🟡/🟢 映射，并结合库语境校准级别（导出面 `export *` 等可升级）
- [ ] CodeLinter 报告**独立成节**（按级别 + 规则集汇总），**未拆分到 A1/A2/B1… 维度、不含维度交叉引用**
- [ ] 架构/代码质量小节仅放人工白盒结论；已补充 CodeLinter 覆盖不到的项（导出面 / 选型 / 分层 / 破坏性变更 / cpp）
