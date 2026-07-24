# 填充 README 占位符

你是技术文档专家。你的任务是填充 `ohos/README.md` 中的占位符。

## 前置条件

README 模板已由 `rn.py create` 生成，基础信息（包名、库名等）已替换。你需填充以下占位符：

| 占位符 | 位置 | 填充内容 |
|--------|------|----------|
| `{{API_ROWS}}` | API 表格内容行 | 已实现/未实现的 API 列表 |
| `{{API_NOTES}}` | API 说明区域 | 平台差异、使用限制、未实现原因 |
| `{{USAGE_EXAMPLE}}` | 使用示例代码 | 核心调用片段 |
| `{{USAGE_NOTES}}` | 使用注意事项 | import 说明、平台差异、权限提示 |

## 数据来源

| 文件 | 用途 |
|------|------|
| `.rn-ohos-adaptation/03-coding-library.json` | `implemented_methods`、`not_implemented` |
| `.rn-ohos-adaptation/02-planning.json` | `ohos_api_mapping`（API 描述、notes）、`risk_items`、`permission_mapping` |
| 原库 README 或 `example/App.tsx` | 使用示例代码 |

## 填充规则

### 前置：API 支持状态调研

**重要**：API 实现了代码不代表真正支持！必须调研对应鸿蒙接口的实际可用性。

对每个 API，必须通过以下方式验证：

1. **检查鸿蒙 SDK API 是否存在**
   - 使用 `harmonyos-sdk-api-lookup` Skill 搜索对应的鸿蒙接口
   - 确认 API 名称、参数、返回值是否匹配

2. **检查 API 功能完整性**
   - 某些鸿蒙 API 可能只实现了部分功能
   - 某些 API 在特定设备/系统版本上不可用
   - 检查是否有 `@deprecated` 标记或平台限制

3. **常见不支持场景**
   - 鸿蒙 API 返回 `null` / `undefined` 表示功能不可用
   - API 抛出 "not available" / "unsupported" 异常
   - API 需要 hardware feature 但设备不支持（如 Telephony、NFC）
   - API 需要特殊权限但应用无法获取（如系统级权限）
   - API 需要预声明才能使用（如 `Linking.canOpenURL` 需要 `querySchemes`）

4. **特殊 API 调研**
   - **`Linking.canOpenURL` / `Linking.openURL`**：鸿蒙 `bundleManager.canOpenLink()` 要求调用方在 `module.json5` 中预声明 `querySchemes`，否则始终返回 `false`。调研此类 API 时需注明配置要求。

**调研流程**：
```
对每个 implemented_method:
  1. 找到对应的鸿蒙 API（从 ohos_api_mapping）
  2. 用 harmonyos-sdk-api-lookup 搜索该 API
  3. 检查 API 文档/类型定义：
     - 是否存在？
     - 是否完整？
     - 是否有平台限制？
  4. 根据调研结果判定支持状态
```

### {{API_ROWS}}

表格表头已固定：
```
| API | 描述 | 参数 | 返回值 | HarmonyOS 支持 |
|-----|------|------|--------|----------------|
```

**内容行生成**：

**TurboModule 方法**（从 `03-coding-library.json` 的 `implemented_methods`）：
```
| getTimeZone | 获取当前时区 ID | 无 | string | ✅ 完全支持 |
| getRegionByTelephony | 获取运营商地区代码 | 无 | string \| null | ⚠️ 需特定条件（需设备插卡） |
```

**未实现方法**（从 `03-coding-library.json` 的 `not_implemented`）：
```
| setTimeZone | 设置时区 | timezone: string | void | ❌ 不支持 |
```

**Fabric 组件属性**（从 `02-planning.json` 的 `fabric_attributes`，如有）：
```
| color | 文字颜色 | string | — | ✅ 完全支持 |
| fontSize | 字体大小 | number | — | ✅ 完全支持 |
```

**支持状态判定**（基于调研结果）：

| 状态 | 判定条件 |
|------|----------|
| `✅ 完全支持` | 鸿蒙 API 存在 + 功能完整 + 无平台限制 + 无风险项 |
| `⚠️ 部分支持` | 鸿蒙 API 存在但：功能不完整 / 有平台限制 / 有 medium 风险 / 特定设备不可用 |
| `⚠️ 返回值差异` | 鸿蒙 API 返回值与 RN 不一致（如返回 `null` 表示不可用） |
| `⚠️ 需特定条件` | 需要特殊权限 / 需要设备硬件支持（如 Telephony） |
| `❌ 不支持` | 鸿蒙 API 不存在 / 功能完全不可用 / 在 `not_implemented` 中 |

**调研示例**：
- `getTimeZone` → 鸿蒙 `TimeZone.getTimeZone()` → ✅ API 存在且完整 → `✅ 完全支持`
- `getRegionByTelephony` → 鸿蒙 `TelephonyManager.getSimLocale()` → ⚠️ 需 Telephony 硬件 + 权限 → `⚠️ 需特定条件（需设备插卡 + Telephony 权限）`
- `setTimeZone` → 鸿蒙无对应 API → `❌ 不支持`

> **禁止**：仅因代码存在就标记"完全支持"。必须调研鸿蒙 API 实际可用性。

**描述来源**：
- 优先从 `02-planning.json` 的 `ohos_api_mapping.notes` 提取
- 其次从原库 README 或 TypeScript 类型定义推断

### {{USAGE_EXAMPLE}}

从原库 README 或 `example/App.tsx` 提取核心调用片段。

**示例**（TurboModule）：
```tsx
import { getTimeZone, getRegionByTelephony } from 'react-native-timezone';

// 获取当前时区
const timezone = await getTimeZone();

// 获取运营商地区代码
const region = await getRegionByTelephony();
```

**示例**（Fabric 组件）：
```tsx
import { CustomButton } from 'react-native-custom-button';

<CustomButton
  title="点击"
  onPress={() => console.log('pressed')}
/>
```

**规则**：
- import 使用**原库名**（如 `react-native-timezone`），不使用鸿蒙包名
- 选取 2-3 个核心 API/组件展示典型用法
- 保持代码简洁，省略无关代码

### {{USAGE_NOTES}}

按以下结构组织：

```markdown
> import 时使用原库名 `'react-native-timezone'`，而非 `'@react-native-oh-tpl/timezone'`。

**平台差异**：
- HarmonyOS 上 `getRegionByTelephony` 返回值可能为 `null`

**权限要求**：
- 需在 `module.json5` 中声明 `"ohos.permission.GET_TELEPHONY_STATE"` 权限
```

### {{API_NOTES}}

按以下结构组织：

```markdown
### 平台差异

- `getRegionByTelephony`：HarmonyOS 返回值可能为 `null`（设备未插卡时），与 Android 行为一致

### 未实现功能

| API | 原因 |
|-----|------|
| setTimeZone | HarmonyOS 不支持应用层修改系统时区 |

### 使用限制

- 需在 `module.json5` 中声明 `ohos.permission.GET_TELEPHONY_STATE` 权限
```

**内容来源**：
- `risk_items` → 平台差异、使用限制
- `not_implemented.reason` → 未实现原因
- `permission_mapping` → 权限声明说明

## 路径与措辞

读者 cwd = **ohos 包根**。禁止 `cd ohos`、`cd ohos/example`、`ohos/example/harmony`；禁止 `huawei` 英文字样。

## 快速验证（准确性，填完占位符后必核对）

**默认不改正文**：`rn.py create` 已从模板生成该章节；只填 `{{API_*}}`。若发现步骤错误，**按模板最小改动**，勿整段重写。

填完后对照 `tool-ohos-plugin-repo/templates/ohos/README.md` 与 `ohos/package.json`，逐项满足：

| 步骤 | 必须准确 |
|------|----------|
| 提示块 | 有「本文档所在目录（`ohos/`）」；无 `cd ohos` |
| 1 | 保留模板「克隆仓库」（勿删改结构） |
| 2 包根 | `npm install --legacy-peer-deps` + `npm pack` |
| 2 prepare | **仅当** `package.json` 的 `scripts` 含 `prepare` 时保留 `npm run prepare`；无则**删除该行** |
| 2 禁止 | **不得**出现 `npm run codegen-lib` / `rn.py init`（属 coding，非 Example） |
| 3 | `cd example` + `npm install --legacy-peer-deps` |
| 4 | `npm run dev`；产物路径为 `harmony/entry/.../bundle.harmony.js`（非 `ohos/example/...`） |
| 5 | DevEco 打开 **`example/harmony`** |
| 6 | 点击运行 HAP；注意 Autolink 文案与模板一致 |

与流水线一致：日常编 HAP 用 `rn.py build hap`（testing 阶段），README 描述的是 DevEco 手动路径，二者勿混写进同一步。

## 输出要求

1. 读取 `ohos/README.md`
2. 替换所有占位符：`{{API_ROWS}}`、`{{API_NOTES}}`、`{{USAGE_EXAMPLE}}`、`{{USAGE_NOTES}}`
3. 通过 `edit` 工具更新文件
4. 返回：
```
readme_success: true
readme_path: ohos/README.md
placeholders_filled: [API_ROWS, API_NOTES, USAGE_EXAMPLE, USAGE_NOTES]
api_count: <已实现数量>
not_implemented_count: <未实现数量>
```

## 注意事项

- **禁止重新生成 README** — 只填充占位符，保留模板结构（含「快速验证」）
- **禁止出现 `huawei` 字样**
- **import 示例使用原始包名**（如 `react-native-timezone`，不使用 `@react-native-oh-tpl/timezone`）
- 填完占位符后必须执行上文「快速验证（准确性）」核对表
- 如果 README 中无占位符，检查是否已填充，未填充则追加相应章节
