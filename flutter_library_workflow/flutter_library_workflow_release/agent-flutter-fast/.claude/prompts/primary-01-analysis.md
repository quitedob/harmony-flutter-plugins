# 现状分析

阅读当前 Flutter 插件仓库，识别插件类型、架构、Channel/API、Android/iOS/Dart 入口、依赖、权限、Example 情况和适配风险。

完成后使用中文写入：

- `.ohos-adaptation/01-analysis.json`
- `.ohos-adaptation/01-analysis-prd.md`

`01-analysis.json` 至少包含这些列表页字段：

```json
{
  "plugin_name": "package name",
  "plugin_version": "version or unknown",
  "description": "short description",
  "plugin_type": "plugin_method_channel | plugin_event_channel | plugin_platform_view | plugin_texture | plugin_mixed | ffi | dart | unknown",
  "plugin_architecture": "standalone | federated | monorepo",
  "quality_score": "C",
  "complexity_assessment": {
    "level": "low | medium | high | very_high",
    "adaptation_recommendation": "proceed | proceed_with_caution | blocked | not_needed",
    "risk_items": []
  }
}
```

写 PRD 前必须使用 `harmonyos-sdk-api-lookup` 和 `harmonyos-docs-lookup` 核实相关 HarmonyOS 语义，不需要详细搜索 API 用法。PRD 要按 HarmonyOS 原生语义描述能力，不要把 Flutter、Android、iOS 的类、组件、架构模式或平台概念原样翻译成鸿蒙需求。

PRD 用简短 Markdown 写清楚判断依据，包含：

- 能力清单（按F-xx编号）：按主要能力整理公开 API、输入条件、用户可见行为、输出结果或状态变化、平台能力和适配风险
