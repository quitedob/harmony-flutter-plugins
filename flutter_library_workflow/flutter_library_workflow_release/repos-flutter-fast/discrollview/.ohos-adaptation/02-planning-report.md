# 规划报告

**项目**: discrollview 鸿蒙化适配
**生成日期**: 2026-07-30
**规划依据**: `02-planning.json`

---

## 1. SDK 环境

| 项目 | 值 |
|------|-----|
| Flutter 版本 | 3.22+ |
| 需要 SDK 切换 | 否 |
| OHOS 目标 API | 24 |

## 2. 实现策略

### 2.1 整体方案

将原始 Android Discrollview 库（4 个 Java 类）重新实现为纯 Dart Flutter Widget。核心：
- 用 ScrollController + NotificationListener 替代 Android ScrollView.onScrollChanged
- 用声明式 Flutter Transform/Opacity/Color.lerp 替代 Android View 命令式 API
- 用 DiscrollveConfig 配置类替代 Android XML 自定义属性
- 保持原始数学算法不变

### 2.2 技术决策

| 决策主题 | 方案 | 原因 |
|----------|------|------|
| 滚动监听 | ScrollController + NotificationListener | Flutter 惯用法，无需 channel |
| 变换执行 | 声明式 Widget 重建 | 符合 Flutter 范式，无状态不一致 |
| 性能优化 | AnimatedBuilder + ValueNotifier 局部重建 | 避免整树重建 |
| 子 Widget 包装 | DiscrollveContent.child() 工厂方法 | 分离配置与渲染 |
| OHOS 兼容 | 零平台分支 | 所有 API 均为跨平台 |

### 2.3 加载 Skill

`type-pure-dart` — 纯 Dart 路径，不创建 ohos/ 工程、不注册平台。

## 3. 计划文件

| 文件 | 用途 |
|------|------|
| `lib/discrollve_widget.dart` | DiscrollveWidget + DiscrollveContent |
| `lib/discrollve_config.dart` | DiscrollveConfig + DiscrollveDirection |
| `lib/discrollve_math.dart` | ratio 计算引擎 |
| `pubspec.yaml` | 包元数据 |
| `test/discrollve_widget_test.dart` | Widget 测试 |
| `test/discrollve_config_test.dart` | 配置校验测试 |
| `test/discrollve_math_test.dart` | 算法单元测试 |

## 4. API 映射

纯 Dart Widget，无鸿蒙系统 API 映射需求。

## 5. 原生依赖映射

无。原始 Android 库仅依赖 Android SDK（android.widget.ScrollView），Flutter 重新实现后零原生依赖。

## 6. 权限映射

无。纯 UI Widget 不需要任何系统权限。

## 7. 参考插件

| 插件 | 关联性 | 关键模式 |
|------|--------|----------|
| flutter_zoom_drawer | similar（纯 Dart UI Widget） | 纯 Dart OHOS 适配模式、Demo→HAP 流程 |

## 8. 风险

| 严重程度 | 风险 | 缓解 |
|----------|------|------|
| 🟡 中 | 低端设备滚动性能 | 局部重建 + RepaintBoundary + L0 帧率验证 |
| 🟢 低 | 大列表遍历 O(n) | 可视区+缓冲区限制 |
| 🟢 低 | OHOS Engine 基础 API | HAP 真实设备验证 |

## 9. 实施备注

纯 Dart UI Widget，零原生代码。遵循 Flutter Widget 惯用法（声明式 API、AnimatedBuilder 局部重建、LayoutBuilder 响应尺寸）。无需创建 ohos/ 目录。pubspec.yaml 不需要平台注册。FFI 策略: not_applicable。
