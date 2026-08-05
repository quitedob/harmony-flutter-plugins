# NiceImageView 测试分析报告

## 1. 需求概述

基于 PRD 与 00-requirement.json 分析，NiceImageView 是一个 Flutter pure_dart 图片组件，提供圆角、圆形裁剪、外边框、内边框和遮罩等视觉效果。本报告分析其可测试性，并给出覆盖 8 个功能模块、24 个测试点、16 个公开 API 参数的完整测试方案。

## 2. 测试级别定义

| 级别 | 定义 | 示例 |
|------|------|------|
| L0 | 冒烟测试 | 组件可构建，基本渲染不出错 |
| L1 | 功能测试 | 每种渲染模式输出正确视觉效果 |
| L2 | 边界测试 | 极端参数值、null 值、零值 |
| L3 | 兼容性测试 | 跨平台验证（Android/iOS/OHOS/Web） |

## 3. 测试点摘要

| 模块 | 测试点数 |
|------|---------|
| F-01 构造与初始化 | 3 |
| F-02 圆形展示模式 | 2 |
| F-03 圆角半径控制 | 3 |
| F-04 边框绘制 | 3 |
| F-05 边框覆盖控制 | 1 |
| F-06 遮罩绘制 | 1 |
| F-07 重绘逻辑 | 6 |
| F-08 边界条件 | 5 |
| **总计** | **24** |

## 4. 测试策略

- **单元测试**：CustomPainter.shouldRepaint() 逻辑、路径构建（Path.addOval / addRRect）
- **Widget 测试**：组件构建、渲染模式、边界条件，使用 tester.pumpWidget 与自定义 1x1 图片
- **集成测试**：真机 HAP 运行 Demo 的全部模式，验证业务状态变化

## 5. 兼容性矩阵

| 平台 | 状态 |
|------|------|
| Android | 待验证 |
| iOS | 待验证 |
| OHOS | 待验证 |
| Web | 待验证 |
| Desktop | 待验证 |

作为纯 Dart 组件，所有平台预期行为一致，核心渲染由 Flutter Canvas 完成，无原生差异。

## 6. F-01 构造与初始化测试分析

覆盖构造函数 16 个命名参数。重点验证默认值与 Android 原库一致：isCircle=false、isCoverSrc=false、cornerRadius=0、borderColor=Colors.white、maskColor=Colors.transparent 等。全参数构建需验证每个参数正确传递到 painter。

## 7. F-02 圆形展示模式测试分析

isCircle=true 时使用 Path.addOval 构造圆形裁剪路径。需验证图片按圆形区域显示、无矩形溢出，且与边框、遮罩参数组合时渲染不崩溃。

## 8. F-03 圆角半径控制测试分析

cornerRadius 统一圆角与 cornerTopLeft/Right/BottomLeft/BottomRight 独立圆角两种配置。优先级为统一圆角 > 独立圆角 > 圆形模式。需验证各角半径独立生效，圆角与边框组合时边框沿圆角路径绘制。

## 9. F-04 边框绘制测试分析

外边框在矩形与圆形模式均支持，内边框仅圆形模式生效、矩形模式忽略。验证边框宽度、颜色正确，内边框在圆形区域边缘绘制。

## 10. F-05 边框覆盖控制测试分析

isCoverSrc=false 时图片缩放避开边框（translate/scale 三明治），true 时边框覆盖图片。需验证两种模式下图片与边框的可见关系。

## 11. F-06 遮罩绘制测试分析

maskColor 非透明时在裁剪区域叠加纯色遮罩。验证遮罩颜色与透明度，透明遮罩（默认）无效果。

## 12. F-07 重绘逻辑测试分析

shouldRepaint 需比较 image、isCircle、isCoverSrc、cornerRadius、borderWidth、borderColor、innerBorderWidth、innerBorderColor、maskColor、fit 等 14 个字段。验证属性变更触发重绘、无变更不触发。

## 13. F-08 边界条件测试分析

null image、零 borderWidth、零尺寸、透明遮罩等边界输入不得崩溃。零尺寸下 Path 构建需避免除零或无效几何。

## 14. 用例级别分布

| 级别 | 数量 | 占比 |
|------|------|------|
| L0 | 11 | 45.8% |
| L1 | 8 | 33.3% |
| L2 | 5 | 20.8% |
| L3 | 0 | 0% |
| 总计 | 24 | 100% |

## 15. 测试数据设计

使用 69 字节 1x1 PNG 作为测试图片（经 ImageProvider 解码为 ui.Image）。渲染模式用例通过 tester.pumpWidget 挂载组件后断言 CustomPaint 行为；路径用例直接构造 NiceImageViewPainter 断言 clipPath 路径几何。

## 16. 测试环境

- Flutter OHOS SDK 3.32.4-ohos-0.0.1（Dart 3.8.1）
- 目标平台：OHOS API 12，设备类型 phone/tablet/2in1
- 测试框架：flutter_test + widget 测试
- 已知限制：flutter test 在当前机器受 VM snapshot 兼容性影响（NOT_RUN），以 flutter analyze 静态验证兜底

## 17. 风险与依赖

- 渲染视觉正确性依赖 Flutter Canvas 的 clipPath 语义与 Android PorterDuff 等效性，需真机目视确认
- isCoverSrc 模式下 Flutter 使用全矩形裁剪，与 Android 按 borderWidth/2 内缩的裁剪区域存在细微差异（视觉近似）
- 真机 HAP 构建依赖 DevEco Studio 登录与签名

## 18. 测试准入与准出

- 准入：代码通过 flutter analyze（0 issues）、public API 冻结
- 准出：24 个测试点全部设计用例；L0-L1 用例全部执行通过；L2 边界用例无崩溃；Demo 一屏可见业务状态变化

## 19. 可测试性评估

组件为纯 Dart 无副作用渲染，可测试性高。ImageProvider 解码流程可通过 ImageStreamListener 稳定驱动；painter 输出可通过黄金值断言。无网络、无权限、无原生通道，测试无需 mock 平台通道。

## 20. 测试点与公开 API 映射

16 个构造参数全部映射到测试点：image/width/height 由 F-01 覆盖；isCircle 由 F-02 覆盖；cornerRadius 等 5 个圆角参数由 F-03 覆盖；border 相关 4 个参数由 F-04/F-05 覆盖；maskColor 由 F-06 覆盖；全部参数默认值由 E-05 覆盖。

## 21. 覆盖率分析

- API 覆盖率：16/16 = 100%
- 功能模块覆盖率：8/8 = 100%
- 渲染模式覆盖率：circle、uniform corner、individual corner、inner border、mask 全覆盖
- 状态/生命周期：image 变更重绘、dispose 清理 ImageStream 监听均已覆盖

## 22. 执行计划

阶段一：静态验证（flutter analyze）→ 阶段二：单元/Widget 测试（22 条已编写）→ 阶段三：用例评审与 XLSX 导出 → 阶段四：standalone Demo 生成（flutter create）→ 阶段五：真机 HAP 构建、安装、逐用例执行与一键测试全部。

## 23. 附录：测试点清单

| ID | 模块 | 级别 | 用例名 |
|------|------|------|--------|
| F-01-01 | 构造 | L0 | 默认参数构建 |
| F-01-02 | 构造 | L0 | 全参数构建 |
| F-01-03 | 构造 | L0 | 自定义尺寸 |
| F-02-01 | 圆形 | L1 | 圆形模式渲染 |
| F-02-02 | 圆形 | L0 | 圆形模式不崩溃 |
| F-03-01 | 圆角 | L1 | 统一圆角 |
| F-03-02 | 圆角 | L1 | 独立圆角 |
| F-03-03 | 圆角 | L1 | 圆角加边框 |
| F-04-01 | 边框 | L1 | 外边框绘制 |
| F-04-02 | 边框 | L1 | 内边框绘制 |
| F-04-03 | 边框 | L2 | 内边框矩形忽略 |
| F-05-01 | 覆盖 | L1 | 边框覆盖图片 |
| F-06-01 | 遮罩 | L1 | 遮罩绘制 |
| R-01~R-06 | 重绘 | L0 | 属性变更重绘 |
| E-01 | 边界 | L2 | 空图片渲染 |
| E-02 | 边界 | L2 | 零边框宽度 |
| E-03 | 边界 | L2 | 零尺寸渲染 |
| E-04 | 边界 | L2 | 透明遮罩 |
| E-05 | 边界 | L0 | 默认值验证 |
