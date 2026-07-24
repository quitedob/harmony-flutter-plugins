---
name: dfx-quality
description: |
  对 React Native 模块鸿蒙适配做 DFX 质量检测，从【稳定性】【性能】【兼容性】三大维度审查。
  C1 稳定性（TurboModule名称跨层一致、EventType名称+数据结构跨层一致、日志规范）、
  C2 性能（FlatList/SectionList性能配置、renderItem React.memo包裹、属性引用稳定）、
  C3 兼容性（高版本API缺运行时守卫检测、canIUse/syscap守护、deviceTypes与实现一致、SemVer）。
  使用检测脚本（--dry-run 模式）自动化扫描 + agent 逐项核对，只检测不修复，
  输出按 🔴/🟡/🟢 分级、含 file:line 的发现清单。
  适用于（Use when）：React Native 鸿蒙适配 DFX 质量检测、稳定性检测、性能检测、兼容性检测、跨层一致性检测
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash      # 运行检测脚本（--dry-run 模式，只读分析，不修改被评估库）
---

# 鸿蒙 DFX 质量检测

对 React Native 模块鸿蒙适配做 DFX 质量检测，涵盖稳定性、性能、兼容性三大维度。本 Skill 只检测、**只读**——绝不修改被评估库。

**JS/TS + ETS 双端扫描是本 Skill 的核心机制**：脚本同时扫描 `src/**/*.js/.ts/.tsx` 和 `ohos/**/*.ets`，覆盖 TurboModule 名称跨层一致、EventType 跨层一致等 RN 特有问题。

## 何时使用本 Skill

- 评估 / 验收 React Native 模块鸿蒙适配的 DFX 质量（稳定性、性能、兼容性）

## 三大维度

| 维度 | 子维度 | 覆盖 | 适用端 | 检测方式 |
|------|------|------|:--:|------|
| **C. DFX 质量** | **C1 稳定性** | TurboModule名称跨层一致、EventType名称+数据结构跨层一致、日志规范 | JS+ETS | cross_layer_checker.py + dfx_js.py + dfx_ets.py + agent 核对 |
| | **C2 性能** | FlatList/SectionList性能配置、renderItem React.memo包裹、属性引用稳定 | JS | dfx_js.py + agent 核对 |
| | **C3 兼容性** | 高版本API缺运行时守卫检测、canIUse/syscap守护、deviceTypes与实现一致、SemVer | ETS | agent 核对 |

> RN JS/TS 侧性能问题不被 B1 覆盖，仍需本 Skill 检测。ETS 端兼容性（高版本API缺运行时守卫/canIUse/deviceTypes/SemVer）不被 hmos-library-quality-assessment 覆盖，由本 Skill C3 检测。

## 严重级别（沿用统一标记，勿自创同义词）

- 🔴 `[blocking]` 必须修复——存在严重缺陷，必须修复
- 🟡 `[important]` 应当修复——明显问题，建议修复
- 🟢 `[nit]` 可选优化——不阻塞
- 💡 `[suggestion]` 替代方案 / 改进思路（含 Grep 粗查得到的启发式线索）

> 🔴/🟡/🟢 为标准三档（由红到绿），💡 为非阻塞注解。
> **本 Skill 不打分、不加权、不评 A–E 等级**；总体结论为定性判断。

## 自动化检测脚本

使用检测脚本（`--dry-run` 模式）对 `ohos/` 和 `src/` 做自动化扫描，再对脚本无法覆盖的问题由 agent 逐项核对。

| 脚本 | 扫描目标 | 检测项 |
|------|---------|--------|
| `scripts/dfx_js.py` | `src/**/*.js/.ts/.tsx` | FlatList缺性能配置、renderItem未React.memo、console.log |
| `scripts/dfx_ets.py` | `ohos/**/*.ets` | console.log/debug/info |
| `scripts/cross_layer_checker.py` | JS+ETS | TurboModule名称(JS `TurboModuleRegistry.get` ↔ ETS `getName()`)、EventType名称(JS `DeviceEventEmitter.addListener` ↔ ETS `emitDeviceEvent`)跨层比对 |

```bash
python scripts/dfx_js.py --target <js_dir> --dry-run
python scripts/dfx_ets.py --target <ets_dir> --dry-run
python scripts/cross_layer_checker.py --js-target <js_dir> --ets-target <ets_dir>
```

退出码：0=通过，1=目录不存在，2=有未处理告警。

## C1 稳定性

（JS+ETS 双端 · 脚本 + agent 核对）

| 检查项 | 检测方式 | 修复方式 | 级别 |
|--------|---------|---------|:--:|
| TurboModule名称跨层一致（JS `TurboModuleRegistry.get('X')` ↔ ETS `getName()` 返回值） | cross_layer_checker.py | 统一两端 TurboModule 名称（大小写敏感） | 🔴 |
| EventType名称跨层一致（JS `DeviceEventEmitter.addListener('event')` ↔ ETS `emitDeviceEvent('event')`） | cross_layer_checker.py | 统一两端事件名（大小写敏感） | 🔴 |
| EventType数据结构一致（emit payload须为对象/数组非裸标量） | agent 核对（对比 ETS `emitDeviceEvent` 的 payload 对象与 JS listener callback 参数类型，payload 须为对象/数组，裸标量会导致 JS 侧 `.map()` 等操作崩溃） | 对齐数据结构，确保 ETS emit payload 为对象或数组而非裸标量（number/string/boolean） | 🟡 |
| 日志规范（JS console.log→移除、ETS console.log/debug/info→移除或替换为hilog） | dfx_js.py + dfx_ets.py | JS：移除 `console.log`/`console.debug`/`console.info`；ETS：移除或替换为 `hilog` | 🟡 |

## C2 性能

（JS 端 · 脚本 + agent 核对）

| 检查项 | 检测方式 | 修复方式 | 级别 |
|--------|---------|---------|:--:|
| FlatList/SectionList性能配置（removeClippedSubviews/getItemLayout/windowSize） | dfx_js.py | 补充 `removeClippedSubviews={true}`、`getItemLayout`（Item 高度固定时必须实现）、`windowSize`（默认 21，调小至 5-10 减少内存驻留） | 🟡 |
| renderItem未用React.memo包裹 | dfx_js.py | 使用 `React.memo` 包裹可复用组件，配合 `useCallback` 保持引用稳定 | 🟡 |
| 属性引用稳定（JSX内联函数/内联对象作为props） | agent 核对（检查 JSX 中是否有匿名函数 `() => {}` 或内联对象 `style={{...}}` 作为 props，会导致每次 render 生成新引用使 React.memo 失效） | 提取内联函数为 `useCallback`，提取内联对象为常量或 `useMemo` | 🟡 |

## C3 兼容性

（ETS 端 · agent 核对）

| 检查项 | 检测方式 | 修复方式 | 级别 |
|--------|---------|---------|:--:|
| 高版本 API 缺运行时守卫（无 canIUse/版本比较守护的扩展模块 API 调用） | agent 核对（Grep ETS 中 `@ohos.` 找出扩展模块 API 调用，对照 SDK 文档确认 `@since` 版本；对 `@since` 高于库代码中使用的最低 API Level 的 API，检查是否有 `canIUse()`/版本比较运行时守卫；若无守卫则报 🟡） | 为高版本 API 补充 `canIUse()`/版本比较运行时守卫 + 降级分支 | 🟡 |
| canIUse/syscap 守护（受限 API 有运行时探测与降级路径） | agent 核对（Grep `@ohos.` 找出扩展模块 API 调用，检查是否被 `canIUse()`/`deviceInfo` 版本比较包裹；Read `module.json5` 中 syscap 声明与实际使用是否匹配） | 为扩展模块 API 调用补充 `canIUse()`/`deviceInfo` 版本比较前置判断 + 降级分支；补充 syscap 声明与实际使用匹配 | 🟡 |
| deviceTypes 与实现一致（声明支持的设备形态与实际能力相符） | agent 核对（Read `module.json5` 提取 deviceTypes：缺失 → 🔴；仅 `["default"]` → 建议明确具体设备类型；与代码中设备特定 API 守护是否匹配） | 补充缺失的 deviceTypes 声明；将 `["default"]` 替换为具体设备类型（如 `["phone", "tablet"]`）；确保声明与代码适配能力一致 | 🟡 |
| version 遵循 SemVer（破坏性变更经 @deprecated 过渡） | agent 核对（Read `package.json` + `oh-package.json5` 检查 version 字段是否符合 SemVer 规范、依赖版本约束是否使用范围语法；Read 导出入口文件检查 API 签名稳定性，是否有 `@deprecated` 渐进废弃机制） | version 字段修正为 SemVer 规范；依赖版本约束改用范围语法（`^x.y.z`）；导出 API 变更使用 `@deprecated` 渐进废弃机制 | 🟡 |
