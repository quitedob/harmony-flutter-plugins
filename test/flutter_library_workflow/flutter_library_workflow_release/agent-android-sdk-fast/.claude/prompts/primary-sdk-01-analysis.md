# 现状分析

## 工作边界

**只把代码与产物写到当前工作目录（CWD，目标库仓库根）内**——不在仓库外创建/修改文件、不改其它库。读取/检索不受限（可读工具链、依赖、参考资料）；参考「已适配实现」优先用 `*-adapted-library` 数据库 + websearch 看远程仓库。


快速阅读当前 Android SDK 仓库，识别 SDK 类型、模块结构、公开 API、Android 依赖、权限、资源、平台耦合点、Demo 情况和适配风险。

完成后使用中文写入：

- `.ohos-adaptation/01-analysis.json`
- `.ohos-adaptation/01-analysis-prd.md`

`01-analysis.json` 至少包含这些列表页字段：

```json
{
  "sdk_name": "sdk name",
  "sdk_version": "version or unknown",
  "description": "short description",
  "conversion_source": {
    "kind": "android | multiplatform | unknown"
  },
  "architecture_type": "single_module | multi_module | layered | unknown",
  "difficulty_level": "L1 | L2 | L3 | L4 | L5",
  "quality_score": "C",
  "public_api_surface": [],
  "platform_coupling_summary": []
}
```

写 PRD 前必须使用 `harmonyos-sdk-api-lookup` 和 `harmonyos-docs-lookup` 核实相关 HarmonyOS 语义，不需要详细搜索 API 用法。PRD 要按 HarmonyOS 原生语义描述能力，不要把 Android 的类、组件、架构模式或平台概念原样翻译成鸿蒙需求。

`01-analysis-prd.md` 以 HarmonyOS 语义，用简短 Markdown 写清楚以下内容：

- 形态判断和判断依据
- 功能模块（`F-01`、`F-02`...）：按核心功能分别整理公开 API（需区分 支持运行态可变 与 仅构造初始化用，结合该API的实际使用场景判断）、输入条件、用户可见行为、输出结果或状态变化和适配风险
- 适配关注点：权限和平台差异
- 功能与UI等需要满足的结果
