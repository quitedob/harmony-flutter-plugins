# 需求解析报告模板

**适用范围**：阶段 1 - 需求解析

---

# {plugin_name} 需求规格（PRD）

## 1. 插件概述

### 1.1 基本信息

| 项目 | 内容 |
|------|------|
| 插件名称 | {plugin_name} |
| 版本 | {version} |
| 仓库地址 | {repository} |
| 许可证 | {license} |
| 已支持平台 | {supported_platforms} |
| 插件类型 | {plugin_type} |

### 1.2 插件简介

{plugin_description}

### 1.3 典型使用场景

**目标用户**：{target_users}

**典型使用场景**：
- {scenario_1}
- {scenario_2}
- ...

---

## 2. 功能需求总览

### 2.1 功能模块划分

| 模块编号 | 功能模块 | 描述 | 优先级 |
|---------|---------|------|--------|
| F-01 | {module_name} | {description} | {priority} |
| F-02 | {module_name} | {description} | {priority} |

> **优先级定义**：
> - **P0**：核心功能，缺失则插件不可用
> - **P1**：重要功能，影响主要使用场景
> - **P2**：辅助功能，可降级或延后实现

### 2.2 功能依赖关系

{dependency_description}

---

## 3. 公开 API 规格

### 3.1 {class_name} 类

#### `{method_name}()`

| 属性 | 说明 |
|------|------|
| 所属模块 | {module_id} |
| 方法签名 | `{signature}` |
| 功能描述 | {description} |
| 参数说明 | {parameters} |
| 返回值 | `{return_type}` - {return_description} |
| 异常/错误 | {errors} |
| 所属 Channel | {channel} |

**平台实现行为：**

| 平台 | 实现方式 | 调用的系统 API |
|------|---------|---------------|
| Android | {android_impl} | {android_api} |
| iOS | {ios_impl} | {ios_api} |

**使用示例：**

```dart
{usage_example}
```

---

## 4. 事件与回调规格

{event_spec}

---

## 5. PlatformView 规格

{platformview_spec}

---

## 6. 权限需求

| 权限 | Android 声明 | iOS 声明 | 用途 | 关联功能模块 |
|------|-------------|----------|------|-------------|
| {permission} | {android_decl} | {ios_decl} | {purpose} | {module} |

---

## 7. 数据流与交互流程

### 7.1 {flow_name} 流程

```
{flow_diagram}
```

**步骤说明**：
1. {step_1}
2. {step_2}
...

---

## 8. 错误处理规格

| 错误码/异常 | 触发条件 | 处理方式 | 关联 API |
|------------|---------|---------|---------|
| {error_code} | {condition} | {handling} | {api} |

---

## 9. 初始化与生命周期

### 9.1 初始化流程

{initialization}

### 9.2 资源管理

{resource_management}

---

## 10. 非功能性需求

### 10.1 线程/并发要求

{concurrency}

### 10.2 性能约束

{performance}

### 10.3 数据持久化

{persistence}

---

## 11. 适配要点提示

基于上述需求规格，鸿蒙适配时需要特别关注以下要点：

1. **适配要点 1**：{point_1}
2. **适配要点 2**：{point_2}
3. **适配要点 3**：{point_3}

---

## 12. 完整性自检清单

### 12.1 API 覆盖统计

| 类别 | 总数 | PRD 中已列出 |
|------|------|-------------|
| 公开类 | {class_count} | {class_count} |
| 公开方法 | {method_count} | {method_count} |
| 公开枚举 | {enum_count} | {enum_count} |
| Channel 方法 | {channel_method_count} | {channel_method_count} |
| EventChannel / Stream | {event_channel_count} | {event_channel_count} |
| PlatformView | {platformview_count} | {platformview_count} |

### 12.2 交叉验证

- [ ] `lib/` 下所有 `export` 文件的公开成员均已在第 3 章列出
- [ ] Android 端 `onMethodCall` 中每个 case/分支对应的方法均已在第 3 章列出
- [ ] iOS 端 `handle` 方法中每个 case/分支对应的方法均已在第 3 章列出
- [ ] `01-analysis.json` 中 `channels[].methods[]` 的每个方法均有对应 PRD 条目
- [ ] README 中提及的功能均已体现在功能模块或 API 规格中

**验证结果**：{verification_result}

---

*PRD 生成日期：{date}*
