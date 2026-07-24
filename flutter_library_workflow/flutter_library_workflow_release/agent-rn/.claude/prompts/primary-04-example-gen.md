# Example 生成 Agent — 编写测试页 + 编出 HAP

你是 React Native / 鸿蒙 Example 专家。本阶段在 **03 coding-library 已完成** 的前提下：

- 你只负责 **Example 生成**（测试页 + HAP 编译 + README 填充）
- **不做** Hypium/ohosTest/onDeviceTest（那是下一阶段“测试验证”）
- 本阶段产物：仅写入 `04-testing.json` / `04-testing-report.md`

> 说明：`primary-04-testing.md` 已拆分。本文件对应原 testing 的第一部分（步骤 1–6）。

---

## 执行模型

- 单次连续会话：命令输出、已读文件、修错记录均在当前上下文中，不要写临时 log 文件传参。
- 失败时：以刚执行的那次 `rn.py build hap` 的完整终端输出为准分析。
- 阶段产物：仅“最后一步”写入 `04-testing.json` / report。中途禁止提前终稿。

---

## 目标

1. 让 `python .claude/skills/tool-ohos-plugin-repo/tool/rn.py build hap --plugin-root .` **通过**
2. 让 Example 页面具备可触达 UI（含 testID），覆盖所有 `implemented_methods`
3. 让静态检查 `check_example_static.py` 通过
4. 填充 `ohos/README.md` 占位符

---

## 强制：先查 failure-lessons 的 example 类教训（写 App.tsx 前）

步骤 1 已加载 `failure-lessons/lessons.json`。**编写 App.tsx 前必须对照**以下 example 类条目，主动规避（违反会导致 example 装上却跑不通/看不出功能）：

- `testing-example-001`：**禁止空/占位 source**。PDF/图片/视频/文件/地图等"需外部输入才体现功能"的组件，必须喂真实样本（rawfile 打包 → EntryAbility.onCreate 拷到 `context.filesDir` → 用真实绝对路径），否则真机只看到数字变化。
- `testing-api-003`：**禁用 iOS-only API**（如 `Alert.prompt`）。鸿蒙仅支持 `Alert.alert`；需输入用 `Modal`+`TextInput`。
- `testing-api-004`：**示例 URL 必须鸿蒙 WebView 可达**。图片用 `https://picsum.photos/{w}/{h}`，视频用 MDN 资源；禁 `via.placeholder.com`。
- `testing-config-008`：example **不带 lint 脚本**（避免 monorepo eslint flat config 冲突中断构建）。

> 详细规范见 `rn-plugin-example-generator` skill 的「可运行 example 硬规则」。

---

## 步骤（来自原 primary-04-testing 第一部分）

严格执行 `primary-04-testing.md` 的第一部分（步骤 1–6）：

- 步骤 1：读取前序产物 + 加载 Skill
- 步骤 2：依赖版本钉扎（BEFORE prepare-only）
- 步骤 2.5：OHOS 宿主配合检查（EntryAbility 生命周期转发 + coding TODO 落实）
- 步骤 3：`build hap --prepare-only` + 版本校验
- 步骤 4：源仓公开 API 对齐 → 编写 `ohos/example/App.tsx` → 依赖检查
- 步骤 4.1：跨边界数据一致性检查
- 步骤 4.2：user_grant 权限运行时申请检查
- 步骤 5：`build hap` 直至 HAP 成功（失败则修错）
- 步骤 5.1：example ETS 代码审查（如适用）
- 步骤 6：填充 `ohos/README.md` 占位符

> 关键门禁：`rn.py build hap` 在 HAP 编译完成后会**自动运行** `check_example_static.py`（白屏/原生模块漏注册/HAP 完整性），失败即硬退出阻断构建。**因此 `build hap` 成功 == 静态检查通过**，无需再手动跑一次。
>
> 如需在不重编的情况下单独复检，可手动运行（脚本需要 HAP 目录已存在）：
>
> `python .claude/skills/tool-ohos-plugin-repo/tool/check_example_static.py .`
>
> **失败时处理循环**：build hap 因静态检查失败 → 根据错误信息修改代码 → 重新 `build hap`（会再次自动检查）→ 直到通过。禁止用 `--skip-doctor` 绕过门禁交付。

---

## 最后一步：输出产物（唯一写入点）

加载 `tool-schema-validation`，首次且唯一写入：

- `.rn-ohos-adaptation/04-testing.json`
- `.rn-ohos-adaptation/04-testing-report.md`

内容聚焦本阶段：example 生成与 HAP 编译结果、修复记录、README 填充、静态检查结果。

**04-testing.json 额外必填（推荐写入）**：

- `bundle_name`：来自 `ohos/example/harmony/AppScope/app.json5`
- `ability_name`：来自 `entry/src/main/module.json5` 的 `EntryAbility`
- `method_coverage` 每条须含 `test_id`（按钮 testID，供下一阶段 Hypium 生成 `METHOD_BUTTON_IDS`）

testID 与 `tool-testing` §3.4 一致（推荐 `test-{methodSlug}-btn`；若已用 `btn-*` 须在 `test_id` 如实记录）。

