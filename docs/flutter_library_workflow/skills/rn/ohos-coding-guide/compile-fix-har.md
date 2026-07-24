# HAR 编译失败修错

> **前置门禁**：首次 build har 前，确认质检步骤（跨边界合约、行为基线、Codegen 完整性）均已 ✅ 完成。

在 `rn.py build har` 失败后使用。**以刚执行的 build har 完整终端输出**为准（不要依赖临时错误 log 文件；当前会话上下文已含输出）。

插件根目录：当前工作目录。

## 任务

1. **加载 `failure-lessons` Skill，读取 `.claude/skills/failure-lessons/lessons.json`**，筛选 `stage: "coding-library"` 且 `module_types` 包含当前类型的条目，对照本次终端输出检查是否命中已知错误模式
2. **加载 `arkts-rules` Skill**，对照「高频编译错误速查表」快速定位 ArkTS 类型错误
3. （条件加载）若报错包含 C++ 文件（`.cpp` / `.cxx`）或链接器（`ld` / `undefined symbol`），**加载 C++ NDK 速查表**：
   ```
   read_file: .claude/skills/ohos-coding-guide/cpp-ndk-cheatsheet.md
   ```
4. 从终端输出提取 `hvigorw` / `tsc` / `ohpm` 报错（文件、行号、信息）
5. 分析原因：
   - 类型与 `generated/` Spec 不一致
   - ArkTS 语法（对照 arkts-rules 的规则编号）
   - C++ NDK 兼容性（按需对照 cpp-ndk-cheatsheet.md 的速查表）
   - `oh-package.json5` 缺依赖
   - 鸿蒙 API 签名错误
   - **pnpm/hvigor 配置错误（如 ENAMETOOLONG）**
6. 修改对应 ETS/C++（路径多在 `ohos/harmony/{short_name}/`）
7. 缺 ohpm 包时改 `ohos/harmony/{short_name}/oh-package.json5`
8. API 不确定时：`sub-doc-search` → `harmonyos-sdk-api-lookup`

## 注意事项

- 只改必要文件，不大范围重构
- 类型问题对照 `generated/turboModules` 或 `generated/components`
- **禁止** `rn.py create`、`rn.py init`
- 修完后**再次执行** `rn.py build har`，直至 exit 0

## 编译通过但组件不渲染的排查清单

如果 `rn.py build har` 成功（exit 0）但 Fabric 组件运行时空白/不显示/无响应，这类问题**不会产生编译错误**，需按以下顺序逐项排查：

| # | 排查项 | 检查方法 | 失败表现 |
|---|-------|---------|---------|
| 1 | Package Descriptor 注册 | Package 是否实现 `createDescriptorWrapperFactoryByDescriptorType` | 组件完全不可用，无报错 |
| 2 | Builder Stack 包裹 | `Index.ets` Builder 是否用 `Stack() { ... }.position({x:0,y:0})` 包裹 | 组件不渲染，无报错 |
| 3 | RNOHContext + RNViewBase | 组件是否用 `public ctx!: RNOHContext` + `RNViewBase` 包裹 | 组件空白 |
| 4 | Props 订阅 | `aboutToAppear` 是否调用 `subscribeToDescriptorChanges` | Props 不更新 |
| 5 | @State 绑定 | `@State` 变量是否在 `build()` 中实际引用 | UI 不响应数据变化 |
| 6 | 事件名一致性 | 事件名是否与 codegen `EventPayloadByName` 的 key 一致 | 事件不触发 |

**关键**：以上问题都是**静默失败**（编译通过、无运行时错误日志），只能通过代码审查发现。

---

## 记录（供写 03 产物）

在上下文中记下：`fixed_files`、`error_type`、`fix_details`。
