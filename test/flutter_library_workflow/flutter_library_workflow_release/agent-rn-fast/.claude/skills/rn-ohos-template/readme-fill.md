# 填充 ohos/README.md 占位符（validation 阶段）

你在 **编码校验（primary-03）** 阶段填 `ohos/README.md`。模板由 `rnohos.py scaffold` 生成，**基础信息（包名、原库名/链接、版本表、Manual Link 配置）已确定性替好**，你只需填 4 个语义占位符：

| 占位符 | 位置 | 填充内容 |
|--------|------|----------|
| `{{USAGE_EXAMPLE}}` | 「使用」代码块 | 核心调用片段 |
| `{{USAGE_NOTES}}` | 「使用」块下方 | import 说明、平台差异、权限提示 |
| `{{API_ROWS}}` | 「属性 / API」表格内容行 | 已实现/未实现 API 列表 + 支持状态 |
| `{{API_NOTES}}` | API 表格下方 | 平台差异、未实现原因、使用限制 |

## 数据来源（fast 线产物 + 本阶段实测结论）

| 来源 | 用途 |
|------|------|
| 本阶段（validation）逐 API 的 PASS/FAIL/替代结论 | **支持状态**、未实现项与原因（最权威，实测得来） |
| `.ohos-adaptation/01-analysis-prd.md` | 公开 API 清单、签名、参数/返回值 |
| `.ohos-adaptation/01-analysis.json` | 权限映射、风险项 |
| `.ohos-adaptation/02-coding-library-report.md` | 已实现能力 ↔ 鸿蒙实现对照、Spec 名称一致性 |
| `ohos/harmony/{short}/.../Index.ets`、`src/` 下 `*Spec.ts(x)` | 实际对外面与签名核对 |
| 原库 README 或 `ohos/example/App.tsx` | 使用示例 |

> **支持状态以本阶段实测为准**：validation 已逐个确认「代码在 ≠ 真支持」——固定返回/空实现/平台不支持的项，README 里必须如实标注，不能因为代码存在就写「完全支持」。判 FAIL / 平台缺失的项要在 `{{API_NOTES}}` 写原因。仍不确定的鸿蒙 API 用 `harmonyos-sdk-api-lookup` 核实后再定状态。

## `{{API_ROWS}}`（表头已固定，只填内容行）

```
| API | 描述 | 参数 | 返回值 | HarmonyOS 支持 |
|-----|------|------|--------|----------------|
```

支持状态判定：

| 状态 | 判定条件 |
|------|----------|
| `✅ 完全支持` | 鸿蒙 API 存在 + 功能完整 + 无平台限制 + validation 判 PASS |
| `⚠️ 部分支持` | 功能不完整 / 有平台限制 / 返回值与 RN 有差异 |
| `⚠️ 需特定条件` | 需特殊权限或设备硬件（如 Telephony、NFC、插卡） |
| `❌ 不支持` | 鸿蒙无对应 API / 平台确实做不到 / 属未实现项 |

示例：

```
| getTimeZone | 获取当前时区 ID | 无 | string | ✅ 完全支持 |
| getRegionByTelephony | 获取运营商地区码 | 无 | string \| null | ⚠️ 需特定条件（需插卡 + Telephony 权限） |
| setTimeZone | 设置时区 | timezone: string | void | ❌ 不支持（鸿蒙不允许应用改系统时区） |
```

Fabric 组件填其 props（参数列写类型，返回值写 `—`）。

## `{{USAGE_EXAMPLE}}`

从原库 README 或 `ohos/example/App.tsx` 提取 2–3 个核心 API 的调用片段：

- **import 用原库名**（如 `react-native-timezone`），**不用**鸿蒙包名 `@oh-rn/...`（由 RNOH alias 映射）。
- 保持简洁，省略无关代码。

## `{{USAGE_NOTES}}`

```markdown
> import 时使用原库名 `'react-native-xxx'`，而非鸿蒙包名。

**平台差异**：
- HarmonyOS 上 `xxx` 返回值可能为 `null`（…条件下）

**权限要求**：
- 需在 `module.json5` 声明 `ohos.permission.XXX`（对应运行时申请）
```

## `{{API_NOTES}}`

按需组织「平台差异 / 未实现功能 / 使用限制」三小节，内容来自 `01-analysis.json` 的 `risk_items`/`permission_mapping`、validation 认定的未实现原因：

```markdown
### 平台差异
- `getRegionByTelephony`：HarmonyOS 未插卡时返回 `null`

### 未实现功能
| API | 原因 |
|-----|------|
| setTimeZone | HarmonyOS 不支持应用层修改系统时区 |

### 使用限制
- 需声明 `ohos.permission.GET_TELEPHONY_STATE`
```

## 输出要求（硬约束）

1. 用 `edit` **就地替换** 4 个占位符，**保留模板正文结构**（版本表、Manual Link、快速验证等章节不重写）。
2. **不要把 README 内容打进对话**——只写文件（与本阶段收尾防上游断连的约束一致）。
3. `import` 示例用**原库名**；全文**禁止出现 `huawei` 字样**（统一 HarmonyOS）。
4. 底部「开源协议」里的 `[原始库协议](原始库 LICENSE 链接)` 是软提示，可用原库许可证名/链接替换（查不到就删链接留许可证名）。
5. 填完在插件根跑 `python "$RNOHOS" check-readme`，残留 `{{` 或 `huawei` 即修后重跑。
