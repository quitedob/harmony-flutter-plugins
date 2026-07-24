# 现状分析

## 工作边界

**只把代码与产物写到当前工作目录（CWD，目标库仓库根）内**——不在仓库外创建/修改文件、不改其它库。读取/检索不受限（可读工具链、依赖、参考资料）；参考「已适配实现」优先用 `*-adapted-library` 数据库 + websearch 看远程仓库。


阅读当前 React Native 模块仓库，识别模块类型、旧架构/新架构、NativeModule/TurboModule/Fabric、Android/iOS/JS 入口、依赖、权限、Example 情况和适配风险。

本流程**不单独跑规划阶段**，下一阶段直接编码，所以本阶段要把编码所需信息一次落清：
- **Spec 定位**：列出 `src/` 下 `*Spec.ts(x)` 路径与对外导出入口；判断是否**旧架构需先转新架构 Spec**（`NativeModules` / `requireNativeComponent` → TurboModule / Fabric）。
- **依赖复用**：对每个 RN 依赖和原生依赖，用 `rn-adapted-library` Skill 查是否已有鸿蒙适配版（已适配的记下 OHOS 包名/版本，编码阶段直接用，不重复造）。
- **原生面**：是否含 JNI/C/C++/so（决定是否走 NAPI 迁移）；Android/iOS 权限清单；自定义 UI 组件清单（Fabric 需 UI 保真复刻）。

完成后使用中文写入：

- `.ohos-adaptation/01-analysis.json`
- `.ohos-adaptation/01-analysis-prd.md`

`01-analysis.json` 至少包含这些列表页字段：

```json
{
  "plugin_name": "package name",
  "plugin_version": "version or unknown",
  "description": "short description",
  "plugin_type": "js_only | native_module | native_ui_component | turbo_module | fabric_component | cpp_turbo_module | native_mixed | unknown",
  "plugin_architecture": "standalone | federated | monorepo",
  "arch_type": "js-only | old-arch | new-arch | mixed-arch",
  "quality_score": "C",
  "complexity_assessment": {
    "level": "low | medium | high | very_high",
    "adaptation_recommendation": "proceed | proceed_with_caution | blocked | not_needed",
    "risk_items": []
  }
}
```

## 模块类型与脚手架判定（02 阶段据此选择 scaffold --type 与 codegen/构建路径）

**规则：凡 `adaptation_recommendation` 为 `proceed` / `proceed_with_caution` 的可适配插件，都要在 02 阶段用 `rnohos.py scaffold` 建出 `ohos/` 工程并写好 Example——与 plugin_type 无关，纯 JS/TS 库同样如此。** `ohos/` 是编码与验证的唯一载体：Spec/源码、example、harmony 工程、HAP 产物都在其下，没有它就无法 `build hap` 验证。因此对每个可适配插件，`needs_native_scaffold` 一律判为 `true`；plugin_type 只决定 `scaffold --type` 取值，以及之后是否还需 codegen、build har。

把下表结论写入 `01-analysis.json` 的 `next_stage_recommendation`（`needs_native_scaffold` / `needs_codegen` 等）：

| plugin_type | needs_native_scaffold | scaffold --type | needs_codegen | build har |
|---|---|---|---|---|
| `js_only`（纯 JS/TS，无 android/ios/cpp） | true | `js-only` | false | false（直接 build hap） |
| `turbo_module` / `native_module` | true | `turbo` | true | true |
| `fabric_component` / `native_ui_component` | true | `fabric` | true | true |
| `cpp_turbo_module` / 含 JNI/C/C++/so | true | `cpp` | true | true |

`js_only` 的「轻」只体现在省掉 codegen 与 build har、直接 build hap，**scaffold 建 `ohos/` 与写 Example 一样不能省**。唯一不建 `ohos/` 的情形是 `adaptation_recommendation` 为 `blocked` / `not_needed`（确无需适配），这类结论须在 PRD 写明依据，不能用「产物为源码补丁集、无 ohos 工程」之类表述替代可适配插件的脚手架。

写 PRD 前必须使用 `harmonyos-sdk-api-lookup` 和 `harmonyos-docs-lookup` 核实相关 HarmonyOS 语义，不需要详细搜索 API 用法。PRD 要按 HarmonyOS 原生语义描述能力，不要把 React Native、Android、iOS 的类、组件、架构模式或平台概念原样翻译成鸿蒙需求。

PRD 用简短 Markdown 写清楚判断依据，并包含：

- 能力清单：按主要能力整理公开 API、输入条件、用户可见行为、输出结果或状态变化、平台能力和适配风险
