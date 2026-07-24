# scripts/ — §4.1 机械扫描统一工具

混合架构实现（CodeLinter + 轻量扫描器），替代 SKILL.md §4.1 旧的 ~45 条 grep。
设计文档：`../docs/hybrid-code-scan-design.md`。

## 文件

| 文件 | 作用 |
|------|------|
| `review-scan.cjs` | **统一入口**。编排 Layer1+2，输出统一 JSON + 写 `code-review.log`。模型只调用它。 |
| `codelinter-adapter.cjs` | Layer 1：跨平台发现 CodeLinter、版本探测、规则完整性自检（fixture+缓存）、运行/解析。 |
| `custom-scanner.cjs` | Layer 2：tokenize（剥离注释/字符串内容）后跑盲区规则 + 兜底规则。 |
| `rule-manifest.json` | 单一事实源：cr-* ↔ G.xxx ↔ CodeLinter 规则 ↔ scanner ↔ fixture 的映射与路由。 |
| `code-linter.review.json5` | 审查专用 CodeLinter 配置（启用清单可映射规则）。 |

## 用法

```bash
node review-scan.cjs --stage <03|04> --project <hardemo工程根> \
  --log <code-review.log> --report <report.md> --json-out <scan.json> \
  --files <a.ets> <b.ets> ...
# 默认自动修复纯格式规则(改写文件,记 status:auto_fixed)
# 可选：--no-apply-fix(关闭自动修复) --no-codelinter(仅轻量扫描器)
#       --report <md>(人读总结报告) --quiet(不打 stderr 诊断)
```

退出码：`0`=无剩余 P0/P1；`10`=有剩余 P0/P1（门禁阻断）；`20`=工具错误。
`summary.p0..p3`=剩余(open)，`summary.auto_fixed`=已自动修复(status:auto_fixed，应计入产物 issues_fixed)。

## 排障 / 日志

- `--log`：向 `code-review.log` **追加诊断头 + 逐规则命中**。诊断头含 mode、CodeLinter 可用性/版本/路径、自检触发规则、降级规则、耗时、跳过文件、警告。
- `--report`：写人读 Markdown 总结（引擎状态 + 汇总表 + 问题清单 + 已自动修复 + 魔法值 + 逐规则）。
- 用 `--json-out` 时，诊断头同时打到 **stderr**（agent 运行时可直接看到）；`--quiet` 关闭。
- JSON 输出新增字段：`engine.timing`、`engine.coverage.{fired,degraded_rules}`、`warnings[]`、`skipped[]`、`diagnostics[]`。

## 关键约束（实测，改动前必读）

- CodeLinter 不在 PATH，藏在 DevEco `plugins/codelinter/run/index.js`，需运行时发现；可用 `OHOS_CODELINTER_JS` / `DEVECO_HOME` 覆盖。
- CodeLinter **只扫模块源码根内、非点开头目录**的文件；自检 fixture 因此落在被审查文件目录的 `__review_selfcheck__/` 并即时清理。
- **配了规则 ≠ 会执行**：实际覆盖由完整性自检（fixture）在运行时确定，结果按 `版本+配置+manifest` 缓存于 `<project>/.ohos-adaptation/logs/.codelinter-cache/`。
- 改 `rule-manifest.json` 的 `engine_rule`/`fixture` 后，缓存键变化会自动重跑自检。

## 维护

- 新增规则：在 `rule-manifest.json` 加条目（codelinter 规则需带 `fixture`+`expect_rule`；custom 规则在 `custom-scanner.cjs` 的 `SCANNERS` 加同名 `scanner`）。
- Windows 路径与规则覆盖需在 Windows + DevEco 实机回归（见设计文档 §19）。
