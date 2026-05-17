# 鸿蒙库「填充实现」通用规程

本文件与具体模块类型（如 `turbo-module.md`、`fabric-component.md`）配合使用：类型文件负责**脚手架命令、目录约定、类型特有的改哪些文件**；本文件负责**按规划逐条落地 API 与签名的通用做法**。

在编写或修改 **ETS** 前须已加载 `skill({ name: "arkts-rules" })`，并与类型指导中的 import/类型约定同时满足。

---

## 1. 按 `ohos_api_mapping` 逐条实现

对 `.rn-ohos-adaptation/02-planning.json` 中的 **`ohos_api_mapping`** 每个条目，顺序完成：

1. **查看 API 定义**
   - 若条目含 `file_path`，直接 `read_file` 该 `.d.ts` 文件查看完整签名。
   - 否则通过 `sub-doc-search` subagent 查询精确签名。
2. **参考原生端实现**：阅读 Android/iOS 端对应方法的实现逻辑（便于对齐行为与边界条件）。
3. **参考类型指导中的模板**：按已加载类型 md 中的代码结构、import 模式编写，勿自创与 codegen/RNOH 冲突的结构。
4. **编写 ETS/C++ 代码**：在类型 md 指明的路径内实现；禁止猜测公开 API 签名。
5. **TurboModule 名称一致性**（若本库为 Turbo）：ETS/C++ 端模块名与 JS Spec 中 `TurboModuleRegistry.getEnforcing('...')` 所用名称完全一致。
6. **Fabric Component 名称一致性**（若本库为 Fabric）：`codegenNativeComponent('Name')` 的字符串、codegen 生成的 NAME、鸿蒙侧 `Spec`/注册名保持一致；涉及 `arkTsComponentNames` / `cppComponentNames` 时与 JS Spec 一致。

---

## 2. 编码中查询方式

**查询 `@ohos.xxx` API 细节**：

```
Task(agent: "sub-doc-search"): 查询 @ohos.xxx 模块中 functionName 的完整参数类型和返回值
```

**查询 React Native OHOS 示例**：

```
Task(agent: "sub-doc-search"): 查询 React Native OHOS 中 [TurboModule/Fabric Component] 的实现示例
```

---

## 3. 与规划字段的交叉检查

实现过程中按需对照 `02-planning.json` 中的：

- `implementation_strategy` — 架构与文件规划是否已覆盖。
- `permission_mapping` — 若已声明权限，是否在 `module.json5` 等位置落实。
- `native_dependency_mapping` — ohpm 依赖是否已写入类型 md 指明的 `oh-package.json5`。
- `risk_items` — `high` 项是否影响当前实现路径。

---

## 4. 禁止事项

- 禁止跳过类型 md 要求的脚手架命令而手搓 `ohos/` 目录凑结构。
- 禁止在未查 `.d.ts` 或 sub-doc-search 的情况下臆造系统 API 签名。

---

## 5. 编码质量规范（强制执行）

在填充实现时，必须严格遵守以下质量要求，确保代码可测试、易读、易维护且安全：

### 5.1 可测试性 (Testability)
- **关键路径日志**：在初始化、API 调用、状态变更等关键步骤添加 `console.info` 或 `console.debug` 日志，便于调试。
- **错误上下文**：捕获异常时，必须记录详细的错误上下文（如参数值、当前状态），禁止吞掉异常或仅打印 `err`。
  ```typescript
  try {
    // ...
  } catch (err) {
    console.error(`[ModuleName] Failed to execute API: ${err.message}`, err);
    // 向 JS 层抛出或返回错误状态
  }
  ```

### 5.2 可读性 (Readability)
- **命名规范**：严格遵循 ArkTS/ETS 规范（类名/组件名 PascalCase，方法/变量 camelCase）。
- **注释说明**：对于复杂的业务逻辑或从 Android/iOS 迁移过来的特殊处理，必须添加注释说明意图。
- **方法拆分**：保持方法短小精悍，单一职责；避免过长的 `if-else` 或 `switch` 嵌套。

### 5.3 可维护性 (Maintainability)
- **异常防御**：所有对外暴露的方法必须包含 `try-catch` 块，防止原生层崩溃导致 RN 应用闪退。
- **常量管理**：禁止使用魔术字符串/数字，提取为常量或枚举。
- **资源释放**：若涉及监听器、定时器或长连接，必须在组件卸载或模块销毁时正确清理（如 `aboutToDisappear`）。

### 5.4 安全性 (Security)
- **敏感信息保护**：**严禁**在日志中打印敏感数据（如 Token、密码、用户隐私信息）。
- **输入校验**：对来自 JS 层的参数进行类型和范围校验，防止非法输入导致原生层异常。
- **权限合规**：涉及敏感能力（如位置、相机、通讯录）时，必须检查并申请对应权限，禁止越权访问。
