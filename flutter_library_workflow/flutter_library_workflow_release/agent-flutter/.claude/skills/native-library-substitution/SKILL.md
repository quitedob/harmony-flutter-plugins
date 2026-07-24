---
name: native-library-substitution
description: 原生三方库鸿蒙替代方案查询。用于 planning 阶段批量处理 Android / iOS / C++ 原生依赖，输出候选方案、版本解析结果、主方案选择建议与风险标记。仅负责“替代方案确认”，不负责已安装包 API 验签。
---

# 原生三方库鸿蒙替代查询

本 Skill 用于 `02-planning` 阶段处理 `01-analysis.json` 中的原生三方库依赖，把 `native_dependencies` 转换为可写入 `02-planning.json` 的 `native_dependency_mapping` 和 `risk_items`。

## 1. 目的与范围

本 Skill 负责：

1. 查找 Android / iOS / C++ 原生依赖是否存在可用的鸿蒙替代方案
2. 判断主方案类型：`ohpm_package` / `system_api` / `custom_implementation` / `not_available`
3. 对 `ohpm_package` 解析包名、精确版本号和安装命令
4. 生成 planning 阶段可落盘的标准化结果
5. 对无方案或高不确定性方案生成风险项

本 Skill 不负责：

1. 不负责已安装 ohpm 包的 API 签名验证
2. 不负责方法级映射、参数对象分析、实例化方式确认
3. 不负责生成 `ohos_api_mapping` 中的具体方法链、具体 import、构造方式
4. 不负责 coding 阶段的包级 API 验签；该工作由 `sub-ohpm-api-verify` 负责

## 2. 触发条件

仅当 `01-analysis.json.native_dependencies` 非空时使用本 Skill。

如果 `native_dependencies` 为空：

1. 不要加载本 Skill
2. `native_dependency_mapping` 直接写 `[]`

## 3. 规划阶段硬约束

这是本 Skill 的最高优先级约束。

1. planning 阶段只确认“替代方案”和“是否需要 coding 阶段验签”
2. `发现 ohpm 包` 不等于 `已验证该包 API 可直接实现插件功能`
3. 对 `ohpm_package`，除非 planning 阶段已经直接读取“已安装包”的 README、`Index.d.ts`、`Index.d.ets` 或入口类型文件，否则必须写 `api_verification_status = "pending_coding_verification"`
4. 对未直接验签的 `ohpm_package`，不得在 planning 阶段写入猜测的 `getInstance()`、`create()`、默认 import、事件回调名、视图绑定方法或具体方法签名
5. 对未直接验签的 `ohpm_package`，不得写“API 与 Android/iOS 一致”“可完整覆盖全部方法”等强结论

## 4. 数据文件

本 Skill 使用以下数据文件：

1. `references/native-library-substitution.json`：原生库到 ohpm 包的结构化映射数据库
2. `references/native-library-substitution.md`：按分类整理的可读表格

结构化映射表中的常见字段包括：

1. `android_lib`
2. `android_platform`
3. `android_description`
4. `ohpm_package`
5. `ohpm_description`
6. `ohpm_repo_url`
7. `source_type`
8. `source_availability`
9. `confidence`
10. `install_command`
11. `category`
12. `inference_reason`

这些字段属于“候选证据”。写入 `02-planning.json` 前必须做归一化，不得原样透传。

## 5. 输入约定

输入来自 `01-analysis.json.native_dependencies`，格式示例：

```json
{
  "android": [
    { "name": "OkHttp", "identifier": "com.squareup.okhttp3:okhttp", "usage": "网络请求" }
  ],
  "ios": [
    { "name": "AFNetworking", "identifier": "AFNetworking", "usage": "网络请求" }
  ],
  "cpp": []
}
```

每条依赖至少需要提取：

1. `original_platform`
2. `original_lib`
3. `original_usage`

## 6. 证据模型

本 Skill 内部允许产生 richer evidence，但最终写盘前必须归一化。

证据状态分为 4 类：

1. `candidate_discovered`
说明：已发现候选 ohpm 包或系统 API，但尚未确定主方案

2. `version_resolved`
说明：已解析出精确 ohpm 版本号和安装命令

3. `api_verified`
说明：planning 阶段直接读取了已安装包类型文件 / README，并能给出证据
说明：只有此状态下，`ohpm_package` 才允许写 `api_verification_status = "verified"`

4. `schema_normalized`
说明：已转换为 `02-planning.json` 允许的字段集合

## 7. 候选方案检索流程

按优先级执行，命中后继续补证，不是命中即停。

### 步骤 1：本地映射表检索

在 `references/native-library-substitution.json` 中搜索：

1. 先做 `android_lib` 精确匹配
2. 再做标准化名称匹配
3. 再做用途和关键词辅助匹配

命中时记录：

1. `ohpm_package`
2. `source_type`
3. `source_availability`
4. `confidence`
5. `inference_reason`

### 步骤 2：OHPM 在线检索

若本地映射未命中或命中置信度低，则到 ohpm 仓库在线搜索：

`https://ohpm.harmonyos.com/#/cn/search?keyword={库名}`

需要确认：

1. 包名是否真实存在
2. 包描述是否与 `original_usage` 功能一致
3. 是否只是名字相似但用途不符

### 步骤 3：全网检索

若 ohpm 在线搜索仍不充分，则做全网搜索：

1. `{库名} ohpm HarmonyOS 替代`
2. `{库名} HarmonyOS SDK`
3. `{库名} OpenHarmony`

目的：

1. 补充包来源和能力覆盖信息
2. 验证该包是否确实承担原库用途
3. 判断是否存在更合适的系统 API 路径

### 步骤 4：系统 API 补充检索

无论是否找到 ohpm 包，都必须补查系统 API 作为对照备选。

目标不是立即替代 `ohpm_package`，而是回答两个问题：

1. 是否存在官方系统 API 可以覆盖核心能力
2. 该系统 API 是否比三方包更贴近原插件公开接口与行为

## 8. 主方案选择规则

主方案只能落到以下四类之一：

1. `ohpm_package`
条件：存在功能对齐的 ohpm 包，且适合作为主承载方案

2. `system_api`
条件：官方系统 API 足以覆盖核心能力，且兼容性优于三方包方案

3. `custom_implementation`
条件：无现成 ohpm 包，但已证明可基于系统 API 自行实现

4. `not_available`
条件：无 ohpm 包、无系统 API、也无可靠自实现路径

选择原则：

1. 优先看“公开接口与行为兼容性”，不是只看“是否搜到包”
2. 名称相似不构成主方案成立条件
3. 如果 `ohpm_package` 只是弱相关包，而系统 API 能更完整覆盖插件能力，应选 `system_api`
4. 如果默认命中 `ohpm_package`，但官方证据表明 `system_api` / `custom_implementation` 更优，允许覆盖，但必须把依据写入 `notes`

## 9. 版本解析规则

仅对 `ohpm_package` 执行。

### 成功路径

通过 ohpm API 查询：

`https://ohpm.openharmony.cn/ohpm/{ohpm_package}`

如果能拿到：

```json
{
  "dist-tags": { "latest": "1.1.0" }
}
```

则写：

1. `ohpm_version = "1.1.0"`
2. `install_command = "ohpm install @{org}/{pkg}@1.1.0"`

### 失败路径

如果包已确认存在，但版本查询失败：

1. `ohpm_package` 可以保留
2. `ohpm_version = null`
3. `install_command = null`
4. `api_verification_status = "pending_coding_verification"`
5. 在 `verification_notes` 中写明“包存在，但 planning 阶段未成功解析精确版本，需 coding 阶段补确认”

### 禁止行为

1. 不要沿用 Android/iOS 版本号作为 ohpm 版本号
2. 不要猜测版本号
3. 不要写 `^x.y.z`
4. 不要在 `install_command` 中使用模糊版本约束

## 10. `ohpm_package` 的延迟验签规则

这是本 Skill 的核心规则。

如果主方案是 `ohpm_package`，但 planning 阶段没有直接读取已安装包类型文件：

1. `api_verification_status` 必须写 `pending_coding_verification`
2. `verification_notes` 只能写“已确认包存在 / 已确认版本 / 已确认能力覆盖范围 / coding 阶段需验签”
3. 不得把 Android/iOS 端调用链直接翻译成 OHOS 包 API
4. 不得在 `ohos_api_mapping` 中写具体方法链
5. 不得在 `ohos_api_mapping` 中写具体 import
6. `ohos_api_mapping.source` 应使用 `ohpm_package_precheck`
7. `ohos_api_mapping.ohos_api` 只能写能力级描述
8. `ohos_api_mapping.ohos_import`、`file_path`、`since_version`、`syscap` 无证据时必须写 `null`

只有在 planning 阶段满足以下全部条件时，才允许写 `verified`：

1. 包已安装
2. 已直接读取 README 或 `Index.d.ts` / `Index.d.ets`
3. 已能指出入口文件或类型文件路径
4. 已能给出明确证据摘要

## 11. `02-planning.json` 输出归一化规则

本 Skill 内部可产生 richer fields，但最终只能输出 planning schema 允许的字段。

`native_dependency_mapping` 只允许：

1. `original_platform`
2. `original_lib`
3. `original_usage`
4. `ohos_solution_type`
5. `ohos_package`
6. `ohpm_version`
7. `ohos_module`
8. `install_command`
9. `api_verification_status`
10. `confidence`
11. `verification_notes`
12. `notes`

### 归一化规则

1. `alternative_solution`
处理方式：合并到 `notes`

2. `source_type`
处理方式：合并到 `notes`

3. `source_availability`
处理方式：合并到 `notes`

4. `inference_reason`
处理方式：摘要后合并到 `notes`

5. `recommended_action`
处理方式：不要直接写入 JSON；必要时摘要到 `risk_items.mitigation`

6. `impact_analysis`
处理方式：不要直接写入 JSON；必要时摘要到 `risk_items.description`

## 12. 风险生成规则

以下情况必须生成 `risk_items`：

1. `ohos_solution_type = "not_available"`
2. 候选方案存在，但能力覆盖明显不完整
3. 主方案依赖闭源或商业库，存在可维护性风险
4. 版本未能解析，可能影响 coding 阶段安装
5. 包已找到，但 API 仍需 coding 阶段验签，且功能复杂度高

风险模板：

```json
{
  "description": "原生库 {库名}（{平台}）无鸿蒙替代方案或主方案存在明显不确定性",
  "severity": "high | medium | low",
  "mitigation": "建议的缓解措施"
}
```

## 13. 允许声明与禁止声明

### 允许声明

1. “发现可用 ohpm 包，功能描述与原库用途相近”
2. “已解析出精确版本号和安装命令”
3. “存在系统 API 作为备选方案”
4. “该包需在 coding 阶段进一步验签确认方法级映射”

### 禁止声明

1. “该包 API 与 Android/iOS 一致”
2. “该包可完整覆盖全部插件方法”
3. “可直接使用 `create()` / `getInstance()` / 某具体 listener”
4. “具体 import 如下”
说明：除非 planning 已直接读取已安装包类型文件并给出证据，否则不得作此声明
5. “该方案已完成方法级兼容验证”
说明：除非已经做了直接验签，否则不得作此声明

## 14. 标准化输出示例

### 示例 A：`ohpm_package`

```json
{
  "original_platform": "android",
  "original_lib": "com.tencent:mmkv",
  "original_usage": "键值存储",
  "ohos_solution_type": "ohpm_package",
  "ohos_package": "@tencent/mmkv",
  "ohpm_version": "2.0.0",
  "ohos_module": null,
  "install_command": "ohpm install @tencent/mmkv@2.0.0",
  "api_verification_status": "pending_coding_verification",
  "confidence": "high",
  "verification_notes": "已确认 ohpm 包存在并解析出精确版本；planning 阶段未直接读取已安装包类型文件，需 coding 阶段通过 sub-ohpm-api-verify 验签",
  "notes": "安卓鸿蒙化库；source_type: 安卓鸿蒙化库；source_availability: COMMERCIAL_PUBLIC"
}
```

### 示例 B：`system_api`

```json
{
  "original_platform": "cpp",
  "original_lib": "openssl",
  "original_usage": "加密解密",
  "ohos_solution_type": "system_api",
  "ohos_package": null,
  "ohpm_version": null,
  "ohos_module": "@ohos.security.cryptoFramework",
  "install_command": null,
  "api_verification_status": "not_required",
  "confidence": "high",
  "verification_notes": "已确认官方系统 API 可覆盖核心能力",
  "notes": "无合适 ohpm 包；使用官方系统加密框架更贴近平台能力"
}
```

### 示例 C：`not_available`

```json
{
  "original_platform": "android",
  "original_lib": "com.alipay.sdk",
  "original_usage": "支付",
  "ohos_solution_type": "not_available",
  "ohos_package": null,
  "ohpm_version": null,
  "ohos_module": null,
  "install_command": null,
  "api_verification_status": "not_required",
  "confidence": "low",
  "verification_notes": "未找到可靠 ohpm 包或官方系统 API 方案",
  "notes": "需评估是否改用其他平台渠道或在产品层降级"
}
```

## 15. 最终检查清单

写入 `02-planning.json` 前必须逐条自检：

1. 是否把“候选检索结果”和“最终输出”分开了
2. 是否所有 `ohpm_package` 都正确处理了版本解析
3. 是否所有未直接验签的 `ohpm_package` 都写了 `pending_coding_verification`
4. 是否没有把扩展字段直接带进 planning JSON
5. 是否没有写入猜测的包级 API 细节
6. 是否对 `not_available` 或明显不确定方案生成了 `risk_items`
