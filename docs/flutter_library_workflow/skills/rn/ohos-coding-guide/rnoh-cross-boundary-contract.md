# RNOH 跨边界数据一致性检查清单

> **适用范围：** React Native for OpenHarmony（RNOH）三方库鸿蒙化适配
> **检查目标：** ArkTS / C++ / JS 三层之间的数据类型、生命周期、线程与异常语义一致性
> **输出格式：** `{ "check_item": "项名称", "status": "pass|warning|fail|na", "detail": "说明" }`，按附录 A 7 项逐项记录

---

## 核心编码规范（事前约束）

1. **禁止裸标量 emit**：所有 `emitDeviceEvent` / `eventEmitter.emit` 的 payload 必须是对象或数组，禁止传递 `string`、`number`、`boolean` 裸值。即使单条数据也必须显式包装（如 `{ value: [result] }`）。
2. **统一空值判断**：JS 侧消费跨边界数据时统一使用 `== null`（宽松相等），禁止 `=== undefined`；ArkTS 侧避免返回语义模糊的空值，优先返回带错误码的结构化对象。
3. **显式标注 sync/async**：TurboModule 接口必须在 IDL/Codegen 中显式标注调用方式，ArkTS 实现必须与标注一致（同步直接返回值，异步返回 `Promise<T>`），JS 侧同步方法不应加 `await`（无副作用但冗余），异步方法必须 `await` 或 `.then()`。
4. **禁止 ArkTS throw**：所有错误必须显式返回结构化错误对象（先声明 class/interface，再 `new ClassName()` 实例化）或通过 `Promise.reject(errorObject)` 返回。禁止直接 `throw new Error()`。
5. **长期对象显式管理**：跨边界传递的长期存活对象必须在 ArkTS 侧保持强引用，或提供显式的 `release()` / `close()` 方法，JS 侧必须显式调用，禁止无通知直接丢弃引用。
6. **线程安全回调**：耗时操作放在 Worker 线程，但回调结果必须调度回 JS 线程后再触发 JS 回调。JS 侧回调中避免直接操作 React state。
7. **路径 / URI 类参数原生侧归一化**：JS 传入的 `source`/`uri`/`path` 类参数在交给鸿蒙原生 API 前**必须归一化**——剥离 `file://` 前缀 + `decodeURIComponent`。RN 插件 JS 文档普遍约定 `file:///path` URI（Android/iOS 接受），但鸿蒙文件类 API（PDF Kit `loadDocument`、图片/音视频、`fileIo` 等）多数**只接受裸沙箱绝对路径**（`context.filesDir + '/x'`），直接透传 `file://` 会加载失败。样板见下方。
8. **命名一致性**：原生侧暴露的 TurboModule 名 / Fabric 组件名必须与 JS Spec 中 `TurboModuleRegistry.get('NAME')` / `codegenNativeComponent('NAME')` **完全一致**；C++ / ETS 类名以 **codegen 产物为准**（PascalCase 逐词首字母大写，如 `SoftInput` 而非 `Softinput`），编译前核对所有 `#include` / `extends` / 继承语句大小写一致。

```typescript
// 规范 7 样板：路径/URI 归一化（ETS）
private normalizeSourcePath(source: string): string {
  let path: string = source;
  if (path.startsWith('file://')) {
    path = path.substring(7);          // file:///a -> /a
  }
  try {
    path = decodeURIComponent(path);   // 解码 %20 等转义
  } catch (err) {
    /* 解码失败保留原值 */
  }
  return path;
}
// 用：const filePath = this.normalizeSourcePath(this.params.source);
//     await this.controller.loadDocument(filePath);
```

> 对应 failure-lessons：`coding-api-004`（file:// 未归一化）、`coding-cpp-001`（类名大小写）。

---

## 逐项检查

### 1. 类型语义不一致：标量 vs 集合消费

| 维度 | 说明 |
|------|------|
| **失效模式** | ArkTS 侧通过 `emitDeviceEvent` / `eventEmitter.emit` 传递标量值（如 `string`、`number`），JS 侧以集合语义消费（调用 `.map()` / `.forEach()` / 解构），触发 `TypeError: xxx is not a function` |
| **典型场景** | `react-native-voice` 等库在 ArkTS 侧 emit 单条识别结果字符串，JS 侧历史代码期望 `string[]` 并调用 `.map()` |
| **官方根因** | ArkTS → NAPI（类型映射为 `napi_value`）→ C++ JSI Runtime → Hermes 的多层转换中，TS 类型信息被抹除。ArkTS 编译器无法校验 `emitDeviceEvent` 的 payload 是否满足 JS 消费端的隐式数据契约 |
| **防御策略** | **ArkTS 侧：** 即使单条数据也显式包装为数组或对象结构，禁止传递裸标量。<br>**JS 侧：** 消费前做防御式类型守卫：`const data = Array.isArray(raw) ? raw : [raw]`。<br>**Code Review：** 扫描所有 `emitDeviceEvent` 调用点，对照 JS 侧事件监听中的消费方式（是否调用数组方法、是否解构） |
| **可信度** | ⭐⭐⭐ **高** |

---

### 2. 空值语义差异：`null` vs `undefined`

| 维度 | 说明 |
|------|------|
| **失效模式** | ArkTS 侧返回 `null` 表示空值，JS 侧用 `=== undefined` 判断，导致条件分支永远走不进，逻辑异常 |
| **典型场景** | TurboModule 方法返回 `null` 表示"无配置"，JS 侧代码 `if (config === undefined) { loadDefault(); }` 失效 |
| **官方根因** | ArkTS 采用**严格 null 安全**（Strict Null Safety），只有 `null`，不存在 `undefined` 语义。JS 侧存在 `null` 和 `undefined` 两个空值，且 `null !== undefined` 为 `true` |
| **防御策略** | **JS 侧：** 统一使用 `== null`（宽松相等）判断空值，同时覆盖 `null` 和 `undefined`。<br>**ArkTS 侧：** 避免返回语义模糊的空值，优先返回带错误码的结构化对象（需先声明 class/interface 再 new 实例化） |
| **可信度** | ⭐⭐⭐ **高** |

---

### 3. 同步/异步调用语义错配

| 维度 | 说明 |
|------|------|
| **失效模式** | C++ 侧同步处理但 ArkTS 侧返回 `Promise<T>`，导致 C++ 拿到 Promise 对象而非实际值；或异步方法被 JS 侧无 `await` 调用，拿到 Promise 对象而非实际值 |
| **典型场景** | Codegen IDL 标注为 sync，但 ArkTS 侧返回 `Promise<T>`；或 JS 侧调用 async 方法时遗漏 `await` |
| **官方根因** | ArkTSTurboModule 分为同步与异步两种方式：同步方法在 C++ `methodMap_` 中注册后直接返回值；异步方法通过 NAPI 调度 `Promise`。C++ 侧如果以同步路径处理，但 ArkTS 返回 `Promise<T>`，C++ 拿到的是 Promise 对象而非实际值，导致后续处理异常
| **防御策略** | **IDL/Codegen 层：** 在 TurboModule 接口定义中显式标注 `sync` 或 `async`，禁止混用。<br>**ArkTS 侧：** 同步方法直接返回值；异步方法必须返回 `Promise<T>`。<br>**JS 侧：** 同步方法可加 `await`（无害但冗余），但异步方法必须 `await` 或 `.then()`，否则拿到 Promise 对象而非实际值。<br>**Code Review：** 核对 C++ `methodMap_` 注册方式与 ArkTS 实现是否一致 |
| **可信度** | ⭐⭐⭐ **高** |

---

### 4. 线程调度不一致：回调触发线程 ≠ JS 线程

| 维度 | 说明 |
|------|------|
| **失效模式** | TurboModule 运行在 Worker 线程或 C++ 层直接触发回调，JS 侧在回调中直接调用 `setState` 或操作 UI，导致渲染异常、时序错乱或偶现崩溃 |
| **典型场景** | 下载进度回调在 Worker 线程触发，直接调用 `setProgress()`；ArkTS 侧耗时操作完成后未切回主线程就回调 JS |
| **官方根因** | RNOH 官方线程模型定义了 **4 个线程**：MAIN（UI）、JS、BACKGROUND、WORKER。TurboModule 可配置运行在 **Worker 线程**（RNSDK700+），避免阻塞 MAIN 线程 UI 绘制。官方明确警告：若 TurboModule 在主线程执行耗时操作，会阻塞 UI 渲染 |
| **防御策略** | **ArkTS 侧：** 耗时操作放在 Worker 线程，但回调结果必须调度回 JS 线程后再触发 JS 回调（通过框架提供的线程切换机制）。<br>**JS 侧：** 回调中只做数据准备，避免直接操作 React state；必要时用 `InteractionManager` 或 `requestAnimationFrame` 缓冲。<br>**Code Review：** 检查 TurboModule 实现是否涉及线程切换，确认回调触发线程 |
| **可信度** | ⭐⭐⭐ **高** |

---

### 5. 对象生命周期断裂：跨边界引用变野指针

| 维度 | 说明 |
|------|------|
| **失效模式** | ArkTS 侧创建临时对象传给 JS，ArkTS GC 回收后，JS 侧通过 JSI HostObject 引用访问，触发野指针崩溃（SIGSEGV） |
| **典型场景** | `createSession()` 返回临时对象，JS 侧延迟调用 `session.sendData()` 时 session 已被 GC |
| **官方根因** | NAPI 层（ArkTS↔C++）：`napi_value` 默认生命周期与 native 方法调用 scope 绑定，超出 scope 后对象被析构。必须使用 `napi_create_reference` 手动管理。JSI 层（C++↔JS）：`jsi::Object` 等类型由 JSI Runtime 管理，若底层 NAPI reference 已被释放，JSI 侧引用的就是野指针 |
| **防御策略** | **ArkTS 侧：** 跨边界传递的长期存活对象，必须在 ArkTS 侧保持强引用（如放入全局 Map），或提供显式的 `release()` / `close()` 方法。<br>**C++ 层：** 使用 `napi_create_reference` 延长 `napi_value` 生命周期，在 JS 侧调用 `release()` 后执行 `napi_delete_reference`。<br>**JS 侧：** 对需要长期持有的原生对象，显式调用 `destroy()` / `close()`，禁止无通知直接丢弃引用 |
| **可信度** | ⭐⭐⭐ **高** |

---

### 6. 异常传播不可靠：禁止 `throw`，显式返回错误

| 维度 | 说明 |
|------|------|
| **失效模式** | ArkTS 侧 `throw new Error()`，JS 侧 `try-catch` 无法捕获，或收到无意义的 C++ 层错误信息，导致异常处理逻辑失效 |
| **典型场景** | 权限校验失败时 ArkTS 侧直接 throw，JS 侧崩溃或无响应 |
| **官方根因** | NAPI 层本身支持 C++ → ArkTS 的异常捕获（`napi_throw` / `try-catch`），但 RNOH 的完整链路是 **ArkTS → NAPI → C++ → JSI → Hermes → JS**，这个完整路径的异常传播行为**官方未文档化**。RNOH 官方示例（ShareTurboModule）均采用 `Promise.reject('Content cannot be null')` 显式返回错误，而非 `throw` |
| **防御策略** | **ArkTS 侧：** **禁止直接 `throw`**。所有错误必须通过 `Promise.reject(errorObject)` 返回（错误对象需先声明 class/interface，用 `new ClassName()` 实例化，因 ArkTS 不支持无类型对象字面量）。<br>**JS 侧：** 统一按 Promise 错误处理或判断 `success` 字段，不依赖 `try-catch` 捕获跨边界异常 |
| **可信度** | ⭐⭐ **中** |

---

### 7. ArrayBuffer 跨边界语义：NAPI 零拷贝，JSI 行为未定

| 维度 | 说明 |
|------|------|
| **失效模式** | ArkTS 侧修改 ArrayBuffer 内容，期望 JS 侧同步感知变化，但因拷贝语义不一致导致 JS 侧读到旧数据；或误释放底层内存导致崩溃 |
| **典型场景** | 音频/视频实时处理场景，ArkTS 侧填充 buffer，JS 侧读取后播放 |
| **官方根因** | **NAPI 层（ArkTS↔C++）：** `napi_get_arraybuffer_info` 可获取底层 buffer 指针，NAPI 层为**零拷贝引用传递**。<br>**JSI 层（C++↔JS）：** RNOH 官方文档未明确 JSI 处理 ArrayBuffer 时是深拷贝还是引用传递 |
| **防御策略** | **保守策略：** 将 ArrayBuffer 视为值语义，ArkTS 侧修改后**显式回传**新 buffer 给 JS 侧，不依赖零拷贝假设。<br>**激进策略：** 若需零拷贝，必须通过 Demo 实测验证：ArkTS 侧修改 buffer 内容后，检查 JS 侧是否同步感知变化。确认安全后再依赖该特性 |
| **可信度** | ⭐⭐ **中** |

---

## 附录 A：Code Review 检查清单

Reviewer 对以下点位逐条确认：

- [ ] 所有 `emitDeviceEvent` 的 payload 类型与 JS 侧消费代码是否一致？
- [ ] JS 侧是否对跨边界数据做了 `Array.isArray()` / `== null` 等防御式守卫？
- [ ] TurboModule 的 sync/async 标注与 ArkTS 实现、JS 调用方式是否一致？
- [ ] TurboModule 回调是否经过线程调度回到 JS 线程？
- [ ] ArkTS 侧是否有临时对象跨边界传递且未保持强引用？
- [ ] ArkTS 侧是否有 `throw` 语句？
- [ ] 涉及 ArrayBuffer 的场景是否已实测验证拷贝语义？

## 附录 B：测试验收清单

| 测试项 | 注入条件 | 期望结果 |
|--------|---------|---------|
| 单条数据注入 | ArkTS emit 标量，JS 侧调用 `.map()` | 不崩溃，防御式守卫生效 |
| 空值注入 | ArkTS 返回 `null`，JS 侧 `== null` 判断 | 正确进入默认分支 |
| 同步方法异步调用 | JS 侧 `await` 调用 sync 方法 | 不阻塞、不返回 undefined |
| 线程回调测试 | Worker 线程 TurboModule 回调中操作 state | 无渲染异常、无崩溃 |
| 延迟对象访问 | ArkTS 对象传给 JS，ArkTS 侧释放引用，JS 延迟调用 | 不崩溃（若实现正确） |
| 异常注入 | ArkTS 返回错误对象，JS 侧 Promise catch | 正确捕获错误码和消息 |
| ArrayBuffer 同步性 | ArkTS 修改 buffer，JS 侧立即读取 | 根据实测结果确认是否同步 |
