# 质量修复（React Native → HarmonyOS）

你负责根据 04 质量审查报告修复鸿蒙库中的质量问题。按照报告中的修复建议逐项执行，但**不得改变已有实现的功能逻辑**。

## 输入与输出

开始前读取：

- `.ohos-adaptation/04-quality-review-report.md`——修复工作的唯一来源
- 被修复的鸿蒙库根目录 **`ohos/harmony/{short_name}/`**（含 `oh-package.json5`、`Index.ets`、`module.json5`、`build-profile.json5`；NAPI 类型另含 `src/main/cpp/`）——唯一的修复对象。`{short_name}` 取自 `.ohos-adaptation/01-analysis.json` / scaffold 派生名；不确定就用 Glob 定位 `ohos/harmony/` 下的库模块目录。

> 修复范围严格限定在 `ohos/harmony/{short_name}/` 鸿蒙库，**不修改** `ohos/example/`（Demo）。

最终写入：

- `.ohos-adaptation/05-quality-fix-report.md`

## 修复范围

从 `04-quality-review-report.md` 中提取所有发现项，按级别处理：

- 🔴 `[blocking]`：**必须修复**
- 🟡 `[important]`：**必须修复**
- 🟢 `[nit]` / 💡 `[suggestion]`：记录但不强求修复

## 修复要求

- 按报告中的修复建议执行，不得自行发明修复方案。
- **不得改变已有实现的功能逻辑**：禁止重写、重构或"优化"业务实现代码；禁止改变对外行为、调用路径、状态管理方式或异步模式。
- 允许的修复类型：补充错误处理、修正资源泄漏、补充缺失的类型标注、修正命名规范、调整依赖方向、CodeLinter 报告的代码规范问题、DFX 检测到的不涉及功能逻辑的稳定性/性能/兼容性问题。
- 如果某项修复建议需要改变功能逻辑才能执行，不修复，记录为"无法在本阶段修复"并说明原因。
- CodeLinter 报告的格式类问题（缩进、大括号、行宽等），优先使用 `codelinter --fix` 一键自动修复，不手动逐个修改。`--fix` 无法修复的再手动处理。
- 不得通过删除功能、写死可配置项、空实现或跳过模块来消除质量告警。

## 执行顺序

1. 读取 `04-quality-review-report.md`，按级别整理待修复项
2. 运行 CodeLinter `--fix` 自动修复格式类问题（如可用）
3. 手动修复剩余 🟡 `[important]` + 🔴 `[blocking]` 项
4. 重新构建验证
5. 写入 `05-quality-fix-report.md`

**未完成步骤 5 之前不得停止。** 中途不能因为认为"修复已足够"而跳过构建或报告。

## 重新构建

修复后重新构建验证，构建失败按日志修复后重试，**不得**用删功能、空实现、写死可配置项换取构建成功。

构建方式参考 CLAUDE.md「硬性规则」和「自带 Skill」，使用 `rnohos.py build har/hap`，严禁裸跑 hvigorw。

## 输出报告

写入 `.ohos-adaptation/05-quality-fix-report.md`（中文），字数尽量少，简短说明：

1. 修复的发现项清单（原级别、file:line、修复方式、复查结果）
2. 未修复的发现项及原因（🟢/💡 级别或需要改变功能逻辑的项）
3. 重新构建结果
4. 最终结论

> **报告落盘即完成，立即 `end_turn` 停止**：`05-quality-fix-report.md` 写好即本阶段唯一交付物。不要再做总结、回顾、二次确认，也不要在对话里复述报告内容。构建结果用「成功/失败 + 一句关键结论」概括，**禁止在报告或回复里粘贴构建日志原文**。收尾阶段保持最小输出——长上下文下任何冗长推理都可能触发上游连接中断，直接停。

**所有修复完成后必须重新构建、必须写入报告，未写入 `05-quality-fix-report.md` 则本阶段未完成。**
