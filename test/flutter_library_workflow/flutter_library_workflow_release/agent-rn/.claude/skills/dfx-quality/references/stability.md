# RN OHOS 跨层名称一致性参考

- 来源：`ohos-code-review/references/turbo-fabric-review-rules.md`
- 适用于 `cross_layer_checker.py` 规则 1（Channel/EventType 名称一致性）

---

## 检测要求

全局检测要求见 SKILL.md「检测要求（全局）」。以下为跨层一致性检测的特定要求：

- **必须同时读取 JS Spec 和 ETS 实现代码**，交叉比对；单看一端无法发现契约不一致
- 以 JS Spec 声明为基准，逐方法检查 ETS 端实现
- 事件名大小写敏感，逐字符比对

### 忽略规则

- `generated/` 目录下的 codegen 产物不审查（作为参照读取但不报告问题）
- C++ 层的 TurboModule 实现由 `ARK_METHOD_METADATA` 宏保证，只审查 ArkTS 层代码

---

## 检查清单与结果处理

| 规则 | 检查项 | 结果处理 |
|------|--------|---------|
| 1 | Channel 名称 JS↔ETS 不一致 | 按 §1 统一命名 |
| 2 | EventType 名称 JS↔ETS 不一致 | 按 §2 统一命名 |
| 3 | console.log 调试代码残留 | 自动移除（fix_js.py/fix_ets.py） |

---

## 1 — TurboModule 名称匹配

| 检查项 | 规则 | 说明 |
|--------|------|------|
| JS Spec `TurboModuleRegistry.get('NAME')` / `getEnforcing('NAME')` 与 ETS `getName()` 返回值完全一致 | 逐字符比对，含大小写 | 名称不一致会导致 JS 侧获取到 null |
| ETS 侧 Package 文件中注册的模块名与 `getName()` 一致 | `createTurboModuleFactoryDelegate` 中的名称检查 | 注册名称必须匹配 |

检测方式：
1. 从 JS Spec 提取：`grep "TurboModuleRegistry\.\(get\|getEnforcing\)" src/`
2. 从 ETS 端提取：`grep "getName\(\)" ohos/harmony/*/src/main/ets/`
3. 逐对比较名称值

**结果处理**：统一两端 TurboModule 名称（大小写敏感）。

---

## 2 — 事件发射体系一致性

| 检查项 | 规则 | 说明 |
|--------|------|------|
| ETS `emitDeviceEvent('eventName', ...)` 的事件名与 JS `DeviceEventEmitter.addListener('eventName', ...)` 一致 | 逐字符比对，含大小写 | 事件名不匹配导致事件静默丢弃 |
| 事件数据结构两端一致 | ETS emit 的对象结构必须与 JS 侧 listener callback 参数类型匹配 | 数据结构不匹配导致运行时错误 |

### 常见事件问题

| 问题 | 说明 |
|------|------|
| 事件名拼写不一致 | ETS: `'onProgress'` vs JS: `'onprogress'`，大小写敏感 |
| 事件数据为裸标量 | `emitDeviceEvent` 的 payload 必须是对象或数组，裸标量（number/string/boolean）JS 侧 `.map()` 等操作会崩溃 |
| 频繁事件未做节流 | 传感器等高频事件应在 ETS 侧做节流，避免 NAPI 桥过载 |

**结果处理**：统一两端事件名（大小写敏感），对齐数据结构。

---

## 3 — 日志规范

| 检查项 | 规则 | 说明 |
|--------|------|------|
| console.log/debug/info 仍在使用 | 生产代码中应移除或替换为 hilog | 自动修复（fix_js.py/fix_ets.py） |

### 常见日志问题

| 问题 | 说明 |
|------|------|
| console.log 残留 | 生产代码中不应使用 console.log/debug/info |
| 日志级别不当 | 调试信息应使用 hilog，非 console |

**结果处理**：自动移除或替换为 hilog（fix_js.py/fix_ets.py）。

---

## 检查清单与结果处理汇总

### 自动化检测项（cross_layer_checker.py / fix_js.py / fix_ets.py）

| # | 检查项 | 检测方式 | 结果处理 |
|---|--------|---------|---------|
| 1 | Channel 名称 JS↔ETS 不一致 | cross_layer_checker.py 提取 JS `TurboModuleRegistry.get` 与 ETS `getName()` 返回值比对 | 统一两端 TurboModule 名称（大小写敏感） |
| 2 | EventType 名称 JS↔ETS 不一致 | cross_layer_checker.py 提取 JS `DeviceEventEmitter.addListener` 与 ETS `emitDeviceEvent` 事件名比对 | 统一两端事件名（大小写敏感） |
| 3 | console.log 调试代码残留 | fix_js.py / fix_ets.py 扫描 console.log/debug/info | 自动移除或替换为 hilog |

### Agent 核对项

| # | 检查项 | 检测方法 | 结果处理 |
|---|--------|---------|---------|
| 2-1 | 事件数据结构两端一致 | 对比 ETS `emitDeviceEvent` 的 payload 对象与 JS listener callback 参数类型 | 对齐数据结构 |
