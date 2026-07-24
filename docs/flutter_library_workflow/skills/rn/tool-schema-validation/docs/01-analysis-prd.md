# 阶段 1 附加产物：`01-analysis-prd.md`

analysis 阶段在输出 `01-analysis.json` + `01-analysis-report.md` 之外，还需输出一份 **PRD（需求规格文档）**。

PRD 的目标是：基于 Android/iOS 现有实现，以**需求视角**完整描述模块的功能规格，作为后续鸿蒙适配的**需求基准**。planning 阶段将以此 PRD 为依据，逐条查找鸿蒙对应 API 并制定实现方案；后续的测试阶段也将以 PRD 为基准，逐条验证功能是否实现。

> **完整性是 PRD 的第一要求**：PRD 是后续适配和测试的关键输入件，任何功能或 API 的遗漏都会导致适配不完整或测试覆盖缺失。必须做到**零遗漏**——模块对外暴露的每一个公开 API、每一个 TurboModule 方法、每一个事件、每一个 Fabric Component 都必须在 PRD 中有对应条目。

> PRD 与 `01-analysis-report.md` 的区别：report 侧重「现状分析」（类型、依赖、复杂度），PRD 侧重「功能需求规格」（每个 API 做什么、怎么用、边界条件）。

## 输出文件

- 文件名：`.rn-ohos-adaptation/01-analysis-prd.md`
- 格式：Markdown
- 语言：**中文**

## PRD 文档结构

```markdown
# {module_name} 鸿蒙适配需求规格（PRD）

## 1. 模块概述

### 1.1 基本信息

| 项目 | 内容 |
|------|------|
| 模块名称 | {module_name} |
| 版本 | {module_version} |
| 仓库地址 | {repository_url} |
| 许可证 | {license} |
| 已支持平台 | {supported_platforms} |

### 1.2 模块简介

{2-3 段文字描述模块的用途、解决的问题、典型使用场景。不是 package.json 的一句话描述，而是更详细的介绍。}

### 1.3 目标用户与使用场景

{列出模块的目标开发者群体和典型业务场景。}

---

## 2. 功能需求总览

### 2.1 功能模块划分

| 模块编号 | 功能模块 | 描述 | 优先级 |
|---------|---------|------|--------|
| F-01 | {模块名} | {一句话描述} | P0/P1/P2 |
| F-02 | ... | ... | ... |

> 优先级定义：
> - **P0**：核心功能，缺失则模块不可用
> - **P1**：重要功能，影响主要使用场景
> - **P2**：辅助功能，可降级或延后实现

### 2.2 功能依赖关系

{描述功能模块之间的依赖关系，如「F-02 依赖 F-01 的初始化能力」。如果模块之间无依赖可省略此节。}

---

## 3. 公开 API 规格

本节**逐一、无遗漏地**列出模块暴露给 React Native 开发者的所有公开 API（JS/TS 层），包括：
- TurboModule 的所有导出方法（含 `getConstants`、自定义方法）
- Fabric Component 的所有 Props、Events、Commands
- DeviceEventEmitter 事件名及数据结构
- 公开的 TypeScript 类型定义和接口
- 公开的常量和枚举
- 导出的工具函数

> **完整性检查清单**：编写完成后，逐一对照以下来源确认无遗漏：
> 1. `src/` 下所有被导出的 JS/TS 文件中的公开 API
> 2. TurboModule Spec 中定义的所有方法
> 3. Fabric Component Spec 中定义的所有 Props/Events/Commands
> 4. 原生端（Android TurboModule 实现 / iOS 实现）中所有已实现的方法
> 5. README.md 中提及的所有功能和 API
> 6. example/ 中实际调用的所有模块 API

### 3.1 {ModuleName / 功能组名}

#### `methodName(param1, param2, ...)`

| 属性 | 说明 |
|------|------|
| 所属模块 | F-xx |
| 方法签名 | `methodName(param1: Type1, param2?: Type2): Promise<ReturnType>` |
| 功能描述 | {详细描述该方法做什么，用 2-3 句话} |
| 参数说明 | 见下表 |
| 返回值 | {返回值类型及含义} |
| 异常/错误 | {可能抛出的异常及触发条件} |
| 所属 TurboModule | {TurboModule 名称及 Spec 方法名} |

**参数详情：**

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| param1 | Type1 | 是 | {说明} | — |
| param2 | Type2 | 否 | {说明} | undefined |

**平台实现行为：**

| 平台 | 实现方式 | 调用的系统 API |
|------|---------|---------------|
| Android | {简要描述实现逻辑} | {android.xxx.Xxx#method()} |
| iOS | {简要描述实现逻辑} | {Framework.Class.method()} |

**使用示例：**

```typescript
// 典型用法（从 example 或 README 提取）
const result = await ModuleName.methodName(param1);
```

{对每个公开 API 重复上述结构}

---

## 4. 事件规格

{如果模块有 DeviceEventEmitter 事件或回调机制，在此详细描述}

### 4.1 {EventName}

| 属性 | 说明 |
|------|------|
| 事件名称 | {event_name_string} |
| 触发时机 | {什么情况下会产生事件} |
| 事件数据结构 | 见下表 |
| 订阅方式 | `DeviceEventEmitter.addListener('{event_name}', callback)` |
| 取消订阅 | `subscription.remove()` |

**事件数据字段：**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| field1 | Type | {说明} |

---

## 5. Fabric Component 规格

{如果模块使用 Fabric Component / 自定义原生组件，在此详细描述}

### 5.1 {ComponentName}

| 属性 | 说明 |
|------|------|
| 组件名称 | {component_name} |
| JS Spec 名称 | {codegenNativeComponent 注册名} |
| 创建方式 | `<ComponentName prop1={value} />` |

**Props：**

| Prop 名 | 类型 | 必填 | 说明 | 默认值 |
|---------|------|------|------|--------|
| prop1 | Type | 是 | {说明} | — |

**Events：**

| 事件名 | 回调参数 | 说明 |
|--------|----------|------|
| onXxx | `{ nativeEvent: { ... } }` | {说明} |

**Commands：**

| 命令名 | 参数 | 说明 |
|--------|------|------|
| scrollTo | `(x: number, y: number)` | {说明} |

---

## 6. 权限需求

| 权限 | Android 声明 | iOS 声明 | 用途 | 关联功能模块 |
|------|-------------|----------|------|-------------|
| {权限名} | android.permission.XXX | NSXxxUsageDescription | {为什么需要} | F-xx |

---

## 7. 数据流与交互流程

{用文字或流程描述核心功能的数据流动路径}

### 7.1 {核心场景名}

```
React Native App → JS API → TurboModule Spec → Native Module → System API → 结果回传
```

{步骤说明：}
1. JS 侧调用 `ModuleName.method()`
2. 通过 TurboModule 桥接调用原生模块
3. 原生端调用 `SystemAPI.xxx()`
4. 结果通过 Promise resolve 返回 JS 层

---

## 8. 错误处理规格

| 错误码/异常 | 触发条件 | 处理方式 | 关联 API |
|------------|---------|---------|---------|
| Error(code, message) | {条件} | {预期行为} | methodName |

---

## 9. 初始化与生命周期

### 9.1 初始化流程

{描述模块的初始化方式：是否需要显式初始化、初始化参数、是否需要在特定生命周期节点调用}

### 9.2 资源管理

{描述需要手动释放的资源、cleanup 行为、内存管理注意事项}

---

## 10. 非功能性需求

### 10.1 线程/并发要求

{描述 API 的线程安全要求、是否需要在 UI 线程调用等}

### 10.2 性能约束

{如有性能相关需求，如实时数据频率、延迟要求等}

### 10.3 数据持久化

{如果模块涉及数据存储，描述存储方式和路径}

---

## 11. 适配要点提示

{基于上述需求规格，简要列出鸿蒙适配时需要特别关注的点}

- {要点 1：如某 API 在 Android/iOS 上行为不一致，需确认鸿蒙侧对齐哪一端}
- {要点 2：如某功能依赖的系统能力在鸿蒙上可能不存在或有差异}
- ...

---

## 12. 完整性自检清单

> 本章节为强制章节，不可省略。用于确认 PRD 内容无遗漏。

### 12.1 API 覆盖统计

| 类别 | 总数 | PRD 中已列出 |
|------|------|-------------|
| TurboModule 方法 | {N} | {N} |
| Fabric Component | {N} | {N} |
| DeviceEventEmitter 事件 | {N} | {N} |
| 公开 TypeScript 类型/接口 | {N} | {N} |
| 导出常量/枚举 | {N} | {N} |

### 12.2 交叉验证

- [ ] `src/` 下所有导出的 JS/TS 文件中的公开 API 均已在第 3 章列出
- [ ] TurboModule Spec 中定义的每个方法均已在第 3 章列出
- [ ] Fabric Component Spec 中定义的每个 Prop/Event/Command 均已在第 5 章列出
- [ ] Android 端实现中每个方法对应的 API 均有对应 PRD 条目
- [ ] iOS 端实现中每个方法对应的 API 均有对应 PRD 条目
- [ ] README 中提及的功能均已体现在功能模块或 API 规格中
```

## 生成流程

生成 PRD 分为三步：**完整性扫描 → 内容生成 → 完整性自检**。

### 第一步：完整性扫描（生成前必须完成）

在编写 PRD 内容之前，先执行以下扫描建立完整的 API 清单：

1. **JS/TS 公开 API 扫描**：读取 `src/` 下的入口文件（通常是 `index.ts` 或 `index.js`），追踪所有 `export` 指令，递归读取每个被导出的文件，提取所有公开类型、方法、常量、枚举。记录总数
2. **TurboModule Spec 全量扫描**：
   - **JS/TS Spec 文件**：搜索 `TurboModuleRegistry.getEnforcing` 或 `TurboModuleRegistry.get` 调用，提取模块名；读取 Spec 接口中所有方法定义
   - **Android 端**：读取原生 TurboModule 实现类，提取所有 `@ReactMethod` 注解方法
   - **iOS 端**：读取原生模块实现，提取所有 `RCT_EXPORT_METHOD` 宏定义的方法
   - 将各端方法名取**并集**，确保覆盖全部方法（包括仅在某一端存在的方法）
3. **DeviceEventEmitter 事件扫描**：搜索 `DeviceEventEmitter.emit`、`sendEvent`、`RCTDeviceEventEmitter` 调用，提取所有事件名
4. **Fabric Component 扫描**：搜索 `codegenNativeComponent`、`requireNativeComponent` 调用，提取所有组件名；读取对应 Spec 文件提取 Props、Events、Commands
5. **README 功能校验**：读取 README.md，提取其中提及的功能点列表，确保每个功能都能在 API 清单中找到对应条目

### 第二步：内容生成

基于扫描出的完整 API 清单，按上方「PRD 文档结构」逐章生成。功能模块必须覆盖所有 API，每个 API 都应归属于某个功能模块。

### 第三步：完整性自检（生成后必须完成）

填写 PRD 第 12 章「完整性自检清单」（强制章节），确认：
1. API 覆盖统计表中，PRD 已列出数与扫描总数一致
2. 交叉验证清单全部通过
3. 如果发现遗漏，**立即补充到 PRD 对应章节**，同时回头更新 `01-analysis.json` 中的 TurboModule/Fabric 清单

---

## 信息来源

PRD 的内容应从以下来源提取，不要凭空编造：

1. **JS/TS 公开 API**（`src/` 目录）：所有导出的类型、方法、常量、枚举
2. **TurboModule Spec**（`src/specs/` 或 `codegenConfig` 指向的文件）：方法签名定义
3. **Fabric Component Spec**：Props、Events、Commands 定义
4. **Android 实现**（`android/` 目录）：Java/Kotlin 源码中的 `@ReactMethod` 方法、系统 API 调用
5. **iOS 实现**（`ios/` 目录）：Swift/ObjC 源码中的 `RCT_EXPORT_METHOD` 方法、系统框架调用
6. **README.md / CHANGELOG.md**：功能说明和使用示例
7. **example/ 应用**：典型使用方式
8. **package.json**：基本信息和依赖

---

## 编写原则

1. **零遗漏、全覆盖**：PRD 是后续测试分析的关键输入件，**每一个公开 API 都必须列出**，不得以「辅助方法」「内部方法」为由省略。只有未导出的内部函数可以不列。对于 TurboModule 方法，必须同时检查 JS Spec 和原生端实现，取并集——任何一端存在的方法都必须记录
2. **以 JS/TS 公开 API 为主线**：PRD 描述的是「模块对外提供了什么能力」，以 JS/TS 层 API 为骨架
3. **附带平台实现细节**：每个 API 补充 Android/iOS 的实现方式和系统 API 调用，为鸿蒙适配提供对标参考
4. **不涉及鸿蒙方案**：PRD 只描述「需要做什么」，不描述「鸿蒙怎么做」——后者是 planning 阶段的职责
5. **核心 API 详写，简单 API 简写**：核心 API 详写（参数、返回值、行为、异常），简单的 getter/常量可以用精简格式（一行表格），但**必须列出**
6. **与 01-analysis.json 保持一致**：PRD 中列出的 TurboModule、方法名、API 列表应与 JSON 产物一致。如果扫描过程中发现 JSON 中遗漏了某些方法，应回头补充 JSON
7. **章节可裁剪**：若模块不涉及 Fabric Component、DeviceEventEmitter 或特定章节，直接省略该章节，不要输出空章节。但第 12 章「完整性自检清单」不可省略

---

## 功能模块优先级判定

- **P0**：模块的核心价值功能（如 bluetooth 模块的扫描/连接、camera 模块的拍照/录像）
- **P1**：常用但非核心的功能（如 bluetooth 的设备名获取、camera 的闪光灯控制）
- **P2**：边缘功能、平台特有功能、废弃 API 的兼容（如 iOS 专属曝光模式）
