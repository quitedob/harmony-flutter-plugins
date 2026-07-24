# 测试验证 Agent — Hypium/ohosTest + onDeviceTest（设备验证）

你是鸿蒙测试编排者。本阶段承接 **上一阶段（example生成）** 的结果：

- 前置：`.rn-ohos-adaptation/04-testing.json` 中 `example_build_status == "pass"`
- 本阶段负责：生成 Hypium 用例（ohosTest）→ 门禁 → onDeviceTest → 失败归因与修复循环
- 本阶段产物：仅写入 `04-device-verify.json` / `04-device-verify-report.md`

> 说明：本文件对应原 `primary-04-testing.md` 的第二部分（步骤 8–10）+ 第三部分（步骤 11）。

---

## 执行模型（沿用原 testing）

- 必须先跑门禁命令并保留输出：

```bash
echo "OHOS_SIGN_STATUS=${OHOS_SIGN_STATUS:-unset}"
echo "OHOS_BUNDLE_NAME=${OHOS_BUNDLE_NAME:-unset}"
echo "OHOS_ABILITY_NAME=${OHOS_ABILITY_NAME:-unset}"
hdc list targets 2>&1
```

- 禁止臆断无设备；未跑 `hdc list targets` 就写 `no_device` 属违规。
- **无设备早退（成功）**：门禁命令执行后，若 `hdc list targets` 输出**无有效设备 ID**（空、`[Empty]`、仅空白行、或命令失败）→ **跳过步骤 0、8–10**，直接进入步骤 11；本阶段视为**成功完成**（`device_test_status: "skipped"`，`device_test_skip_reason: "no_device"`），**不得**记为 fail。
- 说明：`OHOS_SIGN_STATUS` / `OHOS_BUNDLE_NAME` / `OHOS_ABILITY_NAME` 由 executor 注入；`unset` 表示运行器未注入，需检查管理面板是否重启。。
- Subagent 边界：
  - `sub-integration-test` 负责写入 `entry/src/ohosTest/**`（不要从返回复制 ETS 源码落盘）
  - `sub-device-verify` 负责 `hvigorw onDeviceTest` 并解析 `test_result.txt`（fast-fail 即返回）
  - `sub-lib-fixer` 仅在 `failure_owner=library` 时调用（只修库，不改 Example/测试）

---

## 输入

1. 读取 `.rn-ohos-adaptation/04-testing.json`（`example_build_status`、`bundle_name`、`ability_name`、`method_coverage` 含 `test_id`）
2. 读取 `.rn-ohos-adaptation/03-coding-library.json`（`implemented_methods`）

### 步骤 0：补充 ohosTest 脚手架（有设备时必做）

> **前置**：门禁已确认 `hdc list targets` **有有效设备**；无设备时已早退至步骤 11，**不执行**本步及步骤 8–10。

旧库 create 时可能无 `entry/src/ohosTest`。在步骤 8 之前**必须**执行（幂等，不覆盖已有 `ModuleTest.test.ets` 内容以外的定制）：

```bash
python .claude/skills/tool-ohos-plugin-repo/tool/rn.py create ohos-test
```

在插件仓库根目录执行时可省略 `--plugin-root`。若需指定路径，任选其一：

```bash
python .claude/skills/tool-ohos-plugin-repo/tool/rn.py --plugin-root . create ohos-test
python .claude/skills/tool-ohos-plugin-repo/tool/rn.py create --plugin-root . ohos-test
python .claude/skills/tool-ohos-plugin-repo/tool/rn.py create ohos-test --plugin-root .
```

与 `create example` / `create harmony` 平行的子命令；会增量拷贝模板、补 `@ohos/hypium`、`ohosTest` build target、同步 `BUNDLE_NAME`/`ENTRY_ABILITY`，并按 `03-coding-library.json` 追加缺失的 `it()` 桩。

若 `04-testing.json` 缺少 `bundle_name` / `ability_name`，再读 `ohos/example/harmony/AppScope/app.json5` 与 `entry/src/main/module.json5` 补全（写入 04-device-verify 时可引用）。

---

## 步骤 8–10（设备测试编排）

> **前置**：门禁已确认有可用设备。无设备时跳过本节，直接步骤 11。

按原 `primary-04-testing.md` 的「第二部分：设备测试编排（步骤 8–10）」执行，并遵守以下补充：

### 步骤 8：生成 Hypium 用例（sub-integration-test）

**跳过 Subagent 的条件**（须**同时**满足）：

1. `ModuleTest.test.ets` 存在于固定路径  
2. **必跑** `validate_module_test.py` 且 **exit 0**

| 情况 | 动作 |
|------|------|
| 文件不存在 | 调用 Subagent |
| 文件存在，校验 exit 1 | 调用 Subagent 修补（或步骤 10 自修后重跑校验） |
| 文件存在，校验 exit 0 | **跳过** Subagent，进入步骤 9 |

```bash
python .claude/skills/tool-ohos-plugin-repo/tool/validate_module_test.py \
  --methods {implemented_methods 逗号分隔}
```

**调用 Subagent 时**（文件不存在 / 校验 exit 1 / 缺方法覆盖）：

```
Task(agent: "sub-integration-test"):
{公共上下文 + implemented_methods}

执行 sub-integration-test.md 步骤 0：先 read 现有 ModuleTest.test.ets，必跑 validate_module_test；通过则 regenerated:false 勿重写；失败则最小修补直至 exit 0。
```

- 父 Agent：验收 `validation_ok: true` 与 `regenerated` 字段；**禁止**从 Task 返回复制 ETS 源码

### 步骤 9：onDeviceTest 设备验证（sub-device-verify）

- 门禁已通过后调用 Subagent；fast-fail 按规则进入步骤 10

```
Task(agent: "sub-device-verify"):

{填入公共上下文 + ohosTest 测试文件路径 + bundleName + abilityName}

请运行 hvigorw onDeviceTest 并解析结果（fast-fail 立即返回；禁止 hilog -t 60）。
```

### 步骤 10：失败归因、分流修复与复测

- `failure_owner=test/example` 且仅为 **testID/文案/ModuleTest** → 本 Agent **直接 edit** 测试文件，再跑 `validate_module_test.py`；通过后再调用 `sub-device-verify`（不必重跑步骤 8 Subagent）
- `failure_owner=library` → 调用 `sub-lib-fixer`
- 修后必须按改动类型重建并复测

当调用 `sub-lib-fixer` 时，**必须**附带：`device_test_results`、`device_crash_*`、`device_hilog_*`。

---

## 步骤 11：输出最终产物（唯一写入点）

加载 `tool-schema-validation`，写入：

```
.rn-ohos-adaptation/04-device-verify.json
.rn-ohos-adaptation/04-device-verify-report.md
```

**JSON 规则**：

- 若已存在 `04-device-verify.json`，先 **read** 再 merge，**禁止**误删 `device_test_status` / `device_test_results`
- 可选字段：**省略即可**；**禁止**写 `null`（如 `device_test_skip_reason`）
- `device_test_attempts >= 1` 时 **必须**包含 `device_test_status` 与 `device_test_results`
- `device_test_status == "skipped"` 时 **必须**包含 `device_test_skip_reason`（字符串）
- **无设备早退**：`device_test_skip_reason: "no_device"` 时 `device_test_attempts: 0`、`device_test_results: []`；须在 report 中粘贴门禁 `hdc list targets` 原始输出；**整体阶段结论为成功**（非 fail）

将步骤 8–10 的结果写入 04-device-verify 产物（无设备早退时步骤 8–10 无执行记录）；并引用 04-testing.json 的关键信息（bundle/ability/test_id）。

---

## 详细步骤

完整设备测试编排细则见 `primary-04-testing.md` 第二部分（步骤 8–10）与第三部分（步骤 11）。
