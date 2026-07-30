# 需求解析报告

**项目**: discrollview 鸿蒙化适配
**生成日期**: 2026-07-30
**需求来源**: GitHub flavienlaurent/discrollview + flutter-fast 适配工作流 PRD

---

## 1. 需求来源

| 来源 | 说明 |
|------|------|
| 原始库 | https://github.com/flavienlaurent/discrollview (Android Java, Maven Central 0.0.2) |
| PRD | `.ohos-adaptation/01-analysis-prd.md`（12 章，5 个 Mermaid 图） |
| 适配策略 | 纯 Dart Flutter Widget 重新实现（`pure_dart` 路径） |

## 2. 核心需求

1. **滚动驱动动画**：用户滚动时，列表中的子 Widget 按滚动位置产生视差变换
2. **6 种变换**：透明度（alpha）、水平缩放（scaleX）、垂直缩放（scaleY）、平移（4方向）、背景色渐变、阈值延迟
3. **首屏静态头部**：第一个子元素占据 viewport 全高，不参与变换
4. **声明式 API**：完全符合 Flutter Widget 惯用法，配置类驱动

## 3. 功能模块与 API

| 模块编号 | 功能 | 优先级 | 关联 API |
|----------|------|--------|----------|
| F-01 | DiscrollveWidget 根滚动容器 | P0 | `DiscrollveWidget` |
| F-02 | DiscrollveContent 内容布局 | P0 | `DiscrollveContent.child()` |
| F-03 | DiscrollveConfig 变换配置 | P0 | `DiscrollveConfig` |
| F-04 | DiscrollveDirection 方向枚举 | P1 | `DiscrollveDirection` |
| F-05 | 滚动比例计算引擎 | P0 | `_calculateRatio()` |
| F-06 | 变换渲染器 | P0 | `_applyTransforms()` |
| F-07 | 阈值控制 | P1 | `DiscrollveConfig.threshold` |
| F-08 | 重置/恢复 | P0 | `_resetTransforms()` |

## 4. 目标用户与场景

**目标用户**: Flutter/OHOS 应用开发者

**典型场景**:
1. 应用引导页——滚动时元素逐项淡入
2. 产品展示页——卡片从不同方向滑入
3. 文章阅读页——段落浮现 + 背景色渐变
4. 品牌营销落地页——首屏静态 + 品牌元素聚拢
5. OHOS 折叠屏——布局自适应 + 滚动效果

## 5. 约束条件

- 纯 Dart 实现（零原生代码、零 MethodChannel）
- 首个子 Widget 为静态全高头部
- 对立 Translation 方向互斥
- threshold ∈ [0.0, 1.0]
- API 完全声明式

## 6. 验收标准

| # | 标准 | 验证方式 |
|---|------|----------|
| 1 | 6 种变换均可实现 | Widget 单元测试 + 设备 Demo |
| 2 | 滚动算法与原始逻辑等价 | ratio 计算单元测试 |
| 3 | `flutter analyze` 零错误 | CI 命令 |
| 4 | `flutter test` 全通过 | CI 命令 |
| 5 | OHOS HAP 签名安装启动 | 真实设备验证 |
| 6 | 24 个测试用例通过 | 用例评审 + Demo 执行 |
| 7 | AJV Schema 验证通过 | `validate_json_ajv.cjs` |
