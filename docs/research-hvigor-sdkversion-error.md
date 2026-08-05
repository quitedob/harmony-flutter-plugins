# 研究报告：compileSdkVersion / compatibleSdkVersion / targetSdkVersion "值不正确" 报错根因

> 日期：2026-08-03
> 触发工程：`flutter_ohos_test`（Flutter OHOS host，flutter build hap / hvigor assembleHap）
> 报错文本：`compileSdkVersion、compatibleSdkVersion或targetSdkVersion（若显式配置）的值不正确，请按照指南中的说明修改该值`
> 目标设备：HarmonyOS 6.1.0 (API 23)，DevEco SDK 6.1.1 (API 24)

---

## 结论（高置信度，已通过真实构建验证）

**根因是 `entry/build-profile.json5`（模块级 build-profile）里被误加了 `compileSdkVersion` 字段，该字段违反模块级 schema 的 `propertyNames` 枚举约束，触发 hvigor 的配置校验失败。**

修复方法：
1. **移除** `ohos/entry/build-profile.json5` 中的 `compileSdkVersion`（模块级不允许该字段）。
2. **保持** root `ohos/build-profile.json5` 的 `products[]` 中：
   - `compatibleSdkVersion: "6.1.0(23)"`
   - `targetSdkVersion: "6.1.0(23)"`
   - `compileSdkVersion` **不配置**（HarmonyOS 运行时默认取 DevEco 内置 SDK 版本 `"6.1.1(24)"`）。

修复后 `hvigor assembleHap` 通过，`BUILD SUCCESSFUL in 33 s 672 ms`，产出 `entry-default-signed.hap`。

---

## 一、SDK 版本字段的正确配置位置

三个 SDK 版本字段**只能**出现在 **root 级 `build-profile.json5` 的 `products[]`** 中，不能出现在模块级（entry）build-profile 中。

| 配置文件 | schema 来源 | 允许的顶层字段 | 是否允许 compileSdkVersion |
|---|---|---|---|
| `ohos/build-profile.json5`（root）| `ohos-project-build-profile-schema.json` | products 内含 compile/compatible/target | ✅ 允许 |
| `ohos/entry/build-profile.json5`（模块）| `ohos-module-build-profile-schema.json` | `apiType / targets / showInServiceCenter / buildOption / buildOptionSet / buildModeBinder / entryModules`（`propertyNames` 枚举）| ❌ **不允许** |

**证据**（DevEco hvigor 6.24.3 内置 schema）：

`ohos-module-build-profile-schema.json` 的顶层 `propertyNames.enum`：

```json
["apiType", "targets", "showInServiceCenter", "buildOption",
 "buildOptionSet", "buildModeBinder", "entryModules"]
```

不包含 `compileSdkVersion`。一旦在 entry 模块级写入该字段，schema 校验直接失败，报"值不正确"。

---

## 二、三个字段的约束关系与默认值

### 约束规则（来自 hvigor `one-sdk-validator.js` 的 `apiInspection`）

```js
// 顺序校验
(d ? c<=d && c<=l && d<=l : c<=l) || printErrorExit("SDKVERSION_ORDER_ERROR", ...)
```

即：`compatibleSdkVersion <= targetSdkVersion <= compileSdkVersion`。

### 默认值（HarmonyOS 运行时）

root `products[]` 中 `compileSdkVersion` **不配置**时，hvigor 用 `VersionConst.SUPPORT_COMPILE_VERSION` 兜底：

```js
// core-project-model-impl.js  initializeApiMetadata()
compileSdkVersion: parseApiVersion(
    t.compileSdkVersion ?? VersionConst.SUPPORT_COMPILE_VERSION, i)
```

`SUPPORT_COMPILE_VERSION = getHosCompileVersion()` = `osVersionMapper` 中最新的平台版本。本地 DevEco SDK 的 `hos-config.json` 中最新是 `"6.1.1": "24"`，故默认 `compileSdkVersion = "6.1.1(24)"`。

### 本地 SDK 支持的版本表

DevEco hvigor 内建 `hos-config.json` 的 `osVersionMapper`（即校验"版本值是否正确"的白名单）：

```json
"6.1.1": "24", "6.1.0": "23", "6.0.2": "22", "6.0.1": "21",
"6.0.0": "20", "5.1.1": "19", "5.1.0": "18", "5.0.5": "17",
"5.0.4": "16", "5.0.3": "15", "5.0.2": "14", "5.0.1": "13",
"5.0.0": "12", "4.1.0": "11", "4.0.0": "10"
```

`"6.1.0"` 和 `"6.1.1"` 都在表内，因此 `"6.1.0(23)"` 和 `"6.1.1(24)"` 都是合法值。

### 配置字符串格式

HarmonyOS 运行时要求版本值为字符串格式 `"X.Y.Z(API)"`（API ≥ 10）。例如 `"6.1.0(23)"`。OpenHarmony 运行时才要求数字。

---

## 三、本次排障的完整推理链

1. 用户报错"compileSdkVersion、compatibleSdkVersion或targetSdkVersion（若显式配置）的值不正确"。
2. 搜索 hvigor 错误码表 `hvigor-ohos-plugin.json`：找到 `SDKVERSION_ORDER_ERROR (00303015)`、`SDKVERSION_FORMAT_ERROR (00303081)`、`SDKMANAGER_NOT_SUPPORT_THIS_API (00303082)`、`SDKMANAGER_APIVERSION_AND_PLATFORM_NOT_MATCH (00303083)`、`HO_API_VERSION_VALIDATE_FAILED`。
3. 逐个对照 `one-sdk-validator.js` 的 `apiInspection` 与 `projectBuildProfileCheck` 的 schema 校验。
4. 发现 `CoreModuleModelImpl`（entry 模块模型）在加载时会调用 `moduleBuildProfileCheck` → 对模块级 build-profile 执行 schema 校验。
5. 用 Python 解析模块 schema：`propertyNames` 只允许 7 个字段，**不含 compileSdkVersion**。
6. 确认：此前在 entry/build-profile.json5 加入的 `compileSdkVersion` 就是报错来源。
7. 移除后重新构建 → 通过。

---

## 四、错误码与触发条件对照表

| 错误码 | 报错条件 | 本例是否命中 |
|---|---|---|
| `SDKVERSION_ORDER_ERROR` (00303015) | `compatible > target` 或 `compatible > compile` 或 `target > compile` | 未命中（23≤23≤24）|
| `SDKVERSION_FORMAT_ERROR` (00303081) | 类型/版本号格式与模式不匹配 | 未命中 |
| `SDKMANAGER_NOT_SUPPORT_THIS_API` (00303082) | 配置的 API 版本不在 `osVersionMapper` 中 | 未命中（6.1.0 在表内）|
| `SDKMANAGER_APIVERSION_AND_PLATFORM_NOT_MATCH` (00303083) | 平台版本与 API 版本不匹配 | 未命中 |
| schema `propertyNames` 校验 | 模块级 build-profile 出现非法字段 | ✅ **命中（本例根因）** |

---

## 五、来源与置信度

- **高置信度（直接验证）**：本地 DevEco hvigor 6.24.3 源码 + schema 文件 + 真实构建验证（BUILD SUCCESSFUL）。
  - `D:\deveco\DevEco Studio\tools\hvigor\hvigor-ohos-plugin\res\schemas\ohos-module-build-profile-schema.json`
  - `...\res\schemas\ohos-project-build-profile-schema.json`
  - `...\src\utils\one-sdk-validator.js`
  - `...\src\model\module\core-module-model-impl.js`
  - `...\node_modules\@ohos\hos-sdkmanager-common\build\res\hos-config.json`
- **中置信度（在线搜索）**：Perplexity pro 检索确认这是 hvigor 构建阶段的 SDK 版本前置校验；社区案例一致建议调整 build-profile 中三个版本字段使与目标设备 API 匹配。来源未提供可点击 URL（Perplexity 会话环境限制），故以本地源码证据为准。

---

## 六、给后续工程的建议

1. **永远不要在模块级 build-profile.json5 里配置 compileSdkVersion / compatibleSdkVersion / targetSdkVersion**——这些只属于 root `products[]`。
2. Flutter OHOS 工程中，`flutter-hvigor-plugin`（`flutterHvigorPlugin(...)`）不注入 SDK 版本字段，它只注入 Flutter HAR 依赖和 native plugin 的 overrides。SDK 版本完全由 DevEco hvigor 校验 root `products[]`。
3. 设备从 API 24 换成 API 23 时，只需把 root `products[]` 的 `compatibleSdkVersion` / `targetSdkVersion` 改为 `"6.1.0(23)"`，`compileSdkVersion` 保持默认（DevEco 内置最新，本例为 `"6.1.1(24)"`），满足 `compatible ≤ target ≤ compile`。
4. 若报错为 `SDKMANAGER_NOT_SUPPORT_THIS_API`，说明配置的版本不在 hvigor 内建 `osVersionMapper` 表内——需更新 DevEco Studio 或改用表内版本。
5. Windows 下 `flutter build hap` 的 batch recursion 问题仍存在，可靠方案是 DevEco Node 直调 `hvigorw.js`（见 devlog 第 7.3 节）。

---

## 七、修复后文件状态

`ohos/entry/build-profile.json5`：
```json5
{
  "apiType": 'stageMode',
  "buildOption": {},
  "targets": [
    { "name": "default", "runtimeOS": "HarmonyOS" },
    { "name": "ohosTest" }
  ]
}
```

`ohos/build-profile.json5`（products 段）：
```json5
{
  "name": "default",
  "signingConfig": "default",
  "compatibleSdkVersion": "6.1.0(23)",
  "runtimeOS": "HarmonyOS",
  "targetSdkVersion": "6.1.0(23)",
  "bundleName": "com.example.flutter_ohos_test"
}
```

构建产物：`ohos/entry/build/default/outputs/default/entry-default-signed.hap`
