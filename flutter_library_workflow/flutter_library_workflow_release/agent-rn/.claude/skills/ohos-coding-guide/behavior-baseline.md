# 行为基线对照（Behavior Baseline）

> **目的**：实现完成后、编译前，逐方法对照原端（Android/iOS）实现，确认鸿蒙侧参数语义、回调模式、返回值语义与原库一致。
> **输出格式**：`{ "check_item": "维度", "status": "pass|warning|fail|na", "detail": "说明" }`，按 5 个维度逐项记录。

---

## 1. 对照流程

全部方法实现后，逐方法建立对照表：

| 对照维度 | 检查方法 |
|----------|----------|
| **签名一致性** | 逐方法对照 Spec 接口确认方法名、参数类型、返回值类型完全一致。若与 JS 消费侧类型冲突，应修改 JS 侧适配 Spec，而非修改 ETS 侧破坏 Spec 契约 |
| **参数语义** | 读 Android/iOS 实现 → 确认每个参数的默认值、取值范围、枚举值与鸿蒙侧一致（例如 Android 端传递 `int` 表示模式，鸿蒙端不应改用 `string` 再靠 JS 层转换） |
| **回调模式** | 确认回调触发时机、触发次数、参数结构与原端一致（例如原端一次性全量返回的，不应改为逐条触发；原端事件回调的，不应改为方法返回值） |
| **返回值语义** | 确认成功/失败/空值的返回格式与原端等价。成功时字段名、类型、结构一致；失败时错误码/错误信息语义一致 |
| **生命周期** | 确认 Ability 资源清理（`onDestroy` 时释放监听、停止定时器）、前后台切换时（`onBackground`/`onForeground`）是否暂停/恢复模块、emitDeviceEvent 的注册与移除配对与原端等价 |

---

## 2. 对照示例

| 方法 | 维度 | Android | HarmonyOS | 处理 |
|------|------|---------|-----------|------|
| getConstants | 返回值 | `{ value: Object }` | `{ value: Object }` | ✅ 一致 |
| doSomething | 参数语义 | `int status`（0=idle, 1=active） | `number`（0=idle, 1=active） | ✅ 一致 |
| addListener | 生命周期 | create → start → stop | constructor → emitDeviceEvent → removeListener | ✅ 语义等价 |

---

## 3. 红线

- 若原端行为鸿蒙 SDK 无法等价实现 → 记录到 `not_implemented`，不写假等效
