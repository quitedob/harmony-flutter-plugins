# NiceImageView 测试报告（Testing Report）

## 测试概况

| 指标 | 值 |
|------|-----|
| 插件类型 | pure_dart |
| 插件名 / 版本 | nice_image_view / 1.0.5 |
| 测试框架 | flutter_test |
| 测试用例总数 | **22** |
| 静态分析 | PASS（0 issues） |
| flutter test | FAIL（本机实际运行，详见下方） |
| DFX Dart | FAIL（1 条误报告警，详见下方） |

## 单元测试分组（22 cases）

| 分组 | 数量 | 说明 |
|------|:----:|------|
| construction | 3 | 默认构建、全参数构建、自定义尺寸 |
| rendering_modes | 6 | 圆形、圆角、独立四角、圆形+内边框、遮罩、isCoverSrc |
| repaint_logic | 6 | image/isCircle/borderWidth/cornerRadius/maskColor 变更触发 repaint；无变化不触发 |
| edge_cases | 5 | null image、零 borderWidth、零尺寸、透明遮罩、矩形模式忽略内边框 |
| public_api | 2 | 全 16 参数保留；默认值与 Android 原库一致 |

测试源码：`test/nice_image_view_test.dart`。

## 静态分析

- `flutter analyze`：**No issues found（0 issues）**，exit 0。
- `dart format --set-exit-if-changed lib test example/lib`：0 changed，exit 0。

## flutter test 实际运行结果

本机实际执行 `flutter test`：**FAIL（exit 1）**，结果 8 通过 / 14 失败。

- 通过的 8 个用例为纯单元测试（painter repaint_logic 6 + public_api 2）。
- 失败的 14 个用例均为 widget 测试（construction 3 + rendering_modes 6 +
  edge_cases 5），根因一致：

```
'package:flutter/src/widgets/framework.dart': Failed assertion:
'_lifecycleState != _ElementLifecycle.defunct': is not true.
#4 _NiceImageViewState._clearImage (nice_image_view/src/nice_image_view.dart:181)
#5 _NiceImageViewState.dispose (nice_image_view/src/nice_image_view.dart:189)
```

`_NiceImageViewState.dispose()` → `_clearImage()` 在 dispose 期间调用
`setState()`，违反 Flutter 框架约束。这是**真实代码缺陷**，非环境问题。
本阶段约定不改动插件 `lib/` 代码，故如实记录为 FAIL，作为后续
code_review / bug 修复循环的输入。

## DFX 检测

- `fix_dart.py --target lib --dry-run`（dfx-quality 工具）：**exit 2**，1 条告警。
- 告警为规则 6 误报：正则命中文档注释示例 `AssetImage('assets/avatar.jpg')`
  （`lib/src/nice_image_view.dart:17`），库实际使用 `CustomPainter` 绘制，
  无 `Image.file/network/asset`。已人工确认非真实问题。

## 测试设计评审

| 评审 | 分数 | 结论 |
|------|:----:|------|
| 分析评审（analysis review） | **95** | 通过（overall 95，见 `03-analysis-review.json`） |
| 用例评审（case review） | **95** | 通过（overall 95，见 `05-case-review.json`） |

## 平台兼容性

纯 Dart 插件，渲染基于 Flutter `Canvas` / `CustomPainter`，所有测试在所有
Flutter 平台（含 HarmonyOS/OpenHarmony）逻辑等效。
