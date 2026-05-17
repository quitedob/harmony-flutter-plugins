---
name: tool-testing
description: 测试与验证。包含静态深度分析规则（10 项检测）、库代码修复模式、测试用例生成、设备运行态验证四大模块。供 sub-static-analysis、sub-integration-test、sub-device-verify、sub-lib-fixer 等 Subagent 引用。
---

# 测试与验证

## 1. 静态深度分析规则

分两类：**基础检测**（7 项）和**库正确性检测**（3 项）。

### 基础检测（7 项）

#### 1.1 TurboModule 一致性（`turbo_module_consistency`）

1. 从 ETS TurboModule 类提取所有实现的方法名
2. 从 JS/TS 层 Spec 文件提取 `TurboModule` interface 声明的方法名
3. 对比是否完全匹配（大小写敏感）
4. 检查 Package 注册中的模块名与 JS 层 `TurboModuleRegistry.get('NAME')` 是否一致

#### 1.2 参数类型匹配（`param_type_match`）

| JS/TS 类型 | ETS 对应类型 |
|-----------|-------------|
| `string` | `string` |
| `number` | `number` |
| `boolean` | `boolean` |
| `Array<T>` | `Array<T>` 或 具体数组类型 |
| `Object` | `Record` 或具体对象类型 |
| `Promise<T>` | `Promise<T>` |
| `null` | `null` |

扫描 JS Spec 声明和 ETS 实现，对比参数和返回类型是否匹配。

#### 1.3 权限完整性（`permission_completeness`）

对照 `02-planning.json` 的 `permission_mapping` 和鸿蒙工程 `module.json5` 的 `requestPermissions`，确认所有权限已声明。`needs_user_grant: true` 的权限需检查是否有动态申请逻辑。

#### 1.4 异步错误处理（`async_error_handling`）

- TurboModule 方法返回 `Promise` 时，JS 调用侧是否有 `.catch()` 或 try-catch
- DeviceEventEmitter 监听是否有错误处理
- `useEffect` 中的异步调用是否有错误处理

#### 1.5 缺失模块风险（`missing_module_risk`）

对 Example 依赖中不支持 harmony 的模块，查找所有使用点，检查是否有 try-catch 或平台判断包裹。

#### 1.6 空安全（`null_safety`）

- TurboModule 方法返回可空类型时，JS 调用方是否做了 null 检查
- `TurboModuleRegistry.get()` 返回 `Spec | null`，使用前是否检查

#### 1.7 事件监听生命周期（`event_emitter_lifecycle`）

- `DeviceEventEmitter.addListener()` 返回的 subscription 是否在组件卸载时 `remove()`
- `useEffect` 中注册的监听是否在 cleanup 函数中移除
- ETS 端 `emitDeviceEvent` 时是否考虑了 JS 侧未监听的情况

### 库正确性检测（3 项）

#### 1.8 行为对等性（`behavior_equivalence`）

以 Android/iOS 原生实现为参考答案，逐方法比对 OHOS ETS/C++ 实现的正确性。

**对 `03-coding-library.json` 中每个 `implemented_method` 执行**：

1. **定位三端代码**：
   - Android: `android/src/main/java/` 或 `android/src/main/kotlin/` 下的实现类
   - iOS: `ios/` 下的 `.mm` 或 `.swift` 文件
   - OHOS: `harmony/library/src/main/ets/` 下的 `.ets` 文件，或 `harmony/library/src/main/cpp/` 下的 `.cpp` 文件

2. **提取实现骨架**（对 Android 和 OHOS 各提取）：
   - 调用了哪些平台 API（语义级别）
   - 错误处理路径
   - 返回值构造
   - 异步模式（callback → Promise → async/await 是否等价转换）

3. **逐项比对并判定**：

| 比对维度 | 判定为 fail 的条件 | 判定为 warning 的条件 |
|----------|-------------------|---------------------|
| API 语义等价性 | OHOS 端未调用任何等价 API | OHOS 使用了近似但不完全等价的 API |
| 返回值结构 | 返回的对象 key 或类型与 Android 端完全不同 | 缺少非关键字段 |
| 错误处理覆盖 | OHOS 端无任何 try-catch / error 回调 | 遗漏了部分错误分支 |
| 空实现检测 | 方法中只有 `return Promise.resolve(null)` 或 `throw new Error('not implemented')` | — |

4. **输出 `method_details`**，每个方法一条记录：
   - `equivalent`: API 调用语义等价 + 返回值结构一致 + 错误处理覆盖
   - `partial`: 核心功能路径等价，但遗漏了次要分支或非关键字段
   - `divergent`: 实现逻辑与 Android 端显著不同
   - `stub`: 方法体为空或只返回固定值/null/notImplemented

**汇总判定**：
- 全部 `equivalent` → status: `pass`
- 存在 `partial` 但无 `divergent`/`stub` → status: `warning`
- 存在 `divergent` 或 `stub` → status: `fail`

#### 1.9 返回值结构匹配（`return_structure_match`）

对返回复合数据结构（Object、Array）的方法，做跨语言的结构一致性验证。

**对每个方法**：

1. **从 JS Spec 提取期望结构**：
   - 查找 TurboModule Spec 的方法返回类型声明
   - 对于返回 Object 的方法，提取 TypeScript interface 定义的字段

2. **从 ETS 层提取实际结构**：
   - 查找方法实现中返回的对象构造过程
   - 提取所有设置的字段名

3. **比对判定**：
   - `match`: JS 期望的所有 key/类型在 ETS 端都有对应
   - `mismatch`: 缺少 key、key 名不同、类型不兼容

#### 1.10 API 调用有效性（`api_call_validity`）

验证 ETS/C++ 代码中鸿蒙 API 调用是否正确、是否为真实实现。

**验证规则**：
- **非空实现检测**：方法体中是否存在对鸿蒙系统 API 的实际调用
- **API 映射一致性**：对照 `02-planning.json` 的 `ohos_api_mapping`，确认映射中标记的 API 确实被调用
- **import 完整性**：被调用的 API 是否有对应的 import 语句

---

## 2. 库代码修复模式

发现库代码问题时，以 **JS Spec 声明为权威**，最小改动修复：

| 问题类型 | 检测方式 | 修复方式 |
|----------|----------|----------|
| TurboModule 名称不一致 | JS Spec vs ETS Package 注册名称对比 | 修正 ETS 端注册名称 |
| 方法缺失 | ETS TurboModule 未实现 Spec 中的方法 | 补充方法实现 |
| 参数类型错误 | ETS 类型与 JS Spec 不匹配 | 按 1.2 类型表修正 ETS 端 |
| 权限缺失 | API 需要权限但 module.json5 未声明 | 在 module.json5 补充权限声明 |
| 返回值类型错误 | 返回值结构与 Spec 声明不符 | 修正 ETS 端返回值构造 |
| 资源未释放 | 事件监听或定时器未清理 | 补充 cleanup 逻辑 |
| API 调用错误 | 鸿蒙 API 签名或参数有误 | 查 SDK .d.ts 确认后修正 |
| 行为不等价 | behavior_equivalence 检测为 divergent/stub | 参照 Android 端逻辑重写实现 |
| Codegen 不匹配 | 生成的胶水代码与实现不对应 | 重新运行 Codegen 或手动修正 |

每次修复后重新编译验证，记录到 `library_fixes`。

---

## 3. 测试用例生成

为模块已实现的每个方法生成测试用例。

### 3.1 TurboModule 测试模板

```tsx
import { NativeModules } from 'react-native';
const { ModuleName } = NativeModules;

describe('ModuleName', () => {
  it('methodName returns expected result', async () => {
    const result = await ModuleName.methodName(/* test params */);
    expect(result).toBeDefined();
    expect(typeof result).toBe('expectedType');
  });
});
```

### 3.2 DeviceEventEmitter 测试模板

```tsx
import { DeviceEventEmitter } from 'react-native';

describe('EventEmitter', () => {
  it('receives events', (done) => {
    const subscription = DeviceEventEmitter.addListener('eventName', (data) => {
      expect(data).toBeDefined();
      subscription.remove();
      done();
    });

    // 触发事件的操作
    ModuleName.startEmitting();

    setTimeout(() => {
      subscription.remove();
      done();
    }, 5000);
  });
});
```

### 3.3 Fabric Component 测试模板

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import CustomComponent from '{module_name}';

describe('CustomComponent', () => {
  it('renders without crash', () => {
    const { getByTestId } = render(
      <CustomComponent testID="custom" prop1="value" />
    );
    expect(getByTestId('custom')).toBeDefined();
  });
});
```

### 3.4 生成规则

- 每个 `implemented_method` 对应一个测试用例
- `not_implemented` 的方法**不生成**测试
- 所有 Promise 方法使用 `async/await`
- DeviceEventEmitter 测试需要 timeout 兜底
- 测试之间无依赖，每个可独立运行

---

## 4. 设备运行态验证

### 4.1 设备可用性检测

```bash
hdc list targets
```

- 返回有效设备 ID → 继续设备验证
- 无设备 → 跳过设备验证，设置 `device_test_status: "skipped"`, `device_test_skip_reason: "no_device"`
- 编译未通过 → 跳过设备验证，设置 `device_test_skip_reason: "build_failed"`

### 4.2 HAP 路径和包信息提取

```bash
HAP_PATH=$(find example/harmony/entry/build -name "*.hap" -type f 2>/dev/null | head -1)
# 从 app.json5 提取 bundleName
# 从 module.json5 提取 ability 名称
```

### 4.3 安装与启动

```bash
hdc uninstall "$BUNDLE_NAME" 2>/dev/null || true
hdc install "$HAP_PATH"
hdc shell aa start -a "$ABILITY_NAME" -b "$BUNDLE_NAME"
sleep 8
```

### 4.4 崩溃检测

```bash
hdc hilog -t 15 | grep -iE "FATAL|JSCrash|CppCrash|ApplicationForceStop|SIGABRT|NativeCrash|ProcessExit"
```

崩溃修复上限 **3 次**。

### 4.5 测试执行

优先使用鸿蒙工程的测试能力：

```bash
cd example/harmony
hvigorw test --mode module -p product=default
```

如不支持，fallback 到手动验证：
1. 安装 HAP 启动应用
2. 通过 `hdc hilog` 收集应用日志
3. 从日志中分析方法调用是否成功

### 4.6 结果映射

| 测试输出 | device_test_results.result | 含义 |
|---------|--------------------------|------|
| 方法执行成功且断言通过 | `pass` | 功能正常 |
| 方法执行成功但返回值不符 | `assert_fail` | 返回值有误 |
| 方法执行抛异常 | `error` | 运行时错误 |
| 方法未被执行到 | `not_executed` | 未覆盖 |

### 4.7 设备验证修复循环

对 `assert_fail` 和 `error` 的方法：
1. 分析失败/异常详情
2. 定位 ETS/C++ 代码中的问题
3. 修复库代码
4. 重新编译：`cd example/harmony && hvigorw assembleHap --mode module -p product=default -p debuggable=true --no-daemon`
5. 重新安装并运行测试
6. 记录到 `library_fixes`

**设备验证修复循环上限：5 次**。

### 4.8 汇总判定

| 条件 | device_test_status |
|------|-------------------|
| 全部方法 `pass` | `pass` |
| 存在 `pass` 但也有非 pass | `partial` |
| 全部非 pass 或应用崩溃无法恢复 | `fail` |
| 无设备或编译未通过 | `skipped` |

---

## 5. js-only 模块检测规则

js-only 模块无原生代码（无 `harmony/library`），适用以下简化检测：

### 5.1 适用检测项

| 检测项 | 检测内容 |
|--------|----------|
| **异步错误处理** | JS 代码中 Promise 调用是否有 `.catch()` 或 try-catch |
| **缺失模块风险** | 依赖链中不支持 harmony 的模块是否有 try-catch 或 `Platform.OS !== 'harmony'` 判断 |
| **空安全** | JS 代码中可空返回值是否有 null 检查 |
| **事件监听生命周期** | DeviceEventEmitter.addListener 是否在组件卸载时 remove |

### 5.2 不适用检测项

以下检测项因无原生实现而跳过：

| 检测项 | 跳过原因 |
|--------|----------|
| TurboModule 一致性 | 无 ETS TurboModule 实现 |
| 参数类型匹配 | 无原生方法签名 |
| 权限完整性 | JS 层无权限声明 |
| 行为对等性 | 无 Android/iOS 原生实现可对比 |
| 返回值结构匹配 | 无原生返回值结构 |
| API 调用有效性 | 无鸿蒙 API 调用 |

### 5.3 js-only 检测流程

1. **判断模块类型**：读取 `02-planning.json` 的 `target_module_types`
2. **若包含 `js-only`**：
   - 仅执行 5.1 中的 4 项检测
   - 跳过库正确性检测（1.8-1.10）
   - 跳过库代码修复流程
3. **产物填写**：
   - `runtime_checks` 仅记录执行的 4 项检测
   - `library_fixes` 为空数组（无原生库）
   - `method_coverage` 按 JS 导出方法统计
