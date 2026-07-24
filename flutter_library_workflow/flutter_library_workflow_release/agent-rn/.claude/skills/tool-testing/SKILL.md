---
name: tool-testing
description: 测试与验证。包含静态深度分析规则（13+3 项检测，含 Fabric 组件结构/Builder Stack/Package Descriptor 检测）、库代码修复模式、测试用例生成、设备运行态验证四大模块。供 sub-static-analysis、sub-integration-test、sub-device-verify、sub-lib-fixer 等 Subagent 引用。
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

**须核对官方 API 文档的「需要权限」字段**，不可盲信 planning 映射：

| 常见误判 | 说明 |
|----------|------|
| `ohos.permission.SYSTEM_FLOAT_WINDOW` | **悬浮窗**受限权限（`system_grant`，仅特定场景/PC 可申请）。`setSpecificSystemBarEnabled` / `setWindowSystemBarProperties` / `setWindowLayoutFullScreen` 等**主窗口系统栏 API 不需要此权限**。误声明会导致 `hdc install` / `onDeviceTest` 失败：`code:9568289 grant request permissions failed` |
| `restricted` / ACL 权限 | 普通 Example 真机测试**禁止**声明；若 planning 误映射，应从 entry 与 HAR 的 `module.json5` 移除 |

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

### 构建链与注册完整性检测（3 项）

#### 1.11 Bundle 废弃 API 残留扫描（`bundle_deprecated_api_scan`）

对 `example/harmony/entry/src/main/resources/rawfile/bundle.harmony.js`（或实际 bundle 路径）执行废弃 API 残留扫描。

**扫描目标**（在非注释、非字符串上下文中搜索）：

| 搜索模式 | 问题 | 严重级别 |
|----------|------|----------|
| `ViewPropTypes` | RN 0.72+ 已移除，模块加载阶段 TypeError → 白屏 | error |
| `PropTypes} from 'react'` 或压缩形式 `PropTypes}from"react"` | React 16+ 已移除 PropTypes 导出 | error |
| `React.createClass` | React 16+ 已移除 | error |
| `ColorPropType\|EdgeInsetsPropType\|PointPropType` | RN 0.72+ 已移除 | warning |

**检测方法**：

```bash
# 搜索 bundle 中的废弃 API（bundle 为压缩格式，直接 grep）
grep -c 'ViewPropTypes' ohos/example/harmony/entry/src/main/resources/rawfile/bundle.harmony.js
grep -c 'PropTypes}from"react"\|PropTypes} from '\''react'\''' ohos/example/harmony/entry/src/main/resources/rawfile/bundle.harmony.js
```

**判定**：
- 任何 error 级别命中 → status: `fail`，说明 `ohos/src/` 修复后未正确重建 bundle（tgz 链断裂）
- 仅 warning 级别命中 → status: `warning`
- 无命中 → status: `pass`

**修复**：回到 `ohos/src/` 修复废弃 API → `cd ohos && npm pack` → `cd example && rm -rf node_modules && npm install` → `npm run dev` 重建 bundle。

#### 1.12 PackageProvider.cpp 注册一致性（`cpp_package_registration`）

扫描 `ohos/example/harmony/entry/src/main/cpp/PackageProvider.cpp`，验证 include 与 make_shared 一致。

**检测步骤**：

1. 提取所有 `#include "XxxPackage.h"` 的头文件名列表（排除 `RNOH/PackageProvider.h`、`RNOHPackagesFactory.h` 等框架头文件）
2. 提取 `getPackages()` 中所有 `std::make_shared<XxxPackage>(ctx)` 的 Package 名列表
3. 比对：若 include 列表中存在 make_shared 列表中没有的 Package → `fail`

**判定**：
- include ⊆ make_shared → status: `pass`
- include ⊃ make_shared（有 include 无实例化）→ status: `fail`，输出缺失的 Package 名
- PackageProvider.cpp 不存在 → status: `skip`

**修复**：在 `getPackages()` 的返回列表中添加 `packages.push_back(std::make_shared<XxxPackage>(ctx))`。

#### 1.13 Fabric 组件注册完整性（`fabric_component_registration`）

如果本库或其依赖包含 Fabric 组件，验证 Example 的 `Index.ets` 中已正确注册。

**前置判断**：
- 搜索 `ohos/harmony/{short_name}/` 下的 JS/TS 文件中是否有 `codegenNativeComponent` 调用
- 搜索 `resolved_ohos_deps` 中各依赖库是否有导出 Fabric 组件（检查其 `package.json` 的 `codegenConfig.type` 包含 `components` 或 `all`）

**检测步骤**（仅当存在 Fabric 组件时执行）：

1. 提取所有 Fabric 组件名（从 `codegenNativeComponent('NativeXxx')` 提取字符串参数）
2. 检查 `Index.ets` 的 `buildCustomRNComponent` Builder 函数体是否包含对应组件的条件分支
3. 检查 `arkTsComponentNames` 数组是否包含该组件名

**判定**：
- 所有 Fabric 组件均已注册 → status: `pass`
- 存在未注册的 Fabric 组件 → status: `fail`，输出缺失的组件名及注册代码模板
- 无 Fabric 组件 → status: `skip`

**修复**：参考 `example-registration.md` 的注册模板，在 `Index.ets` 中添加 Builder 分支和 `arkTsComponentNames` 条目。

#### 1.14 Fabric 组件结构正确性（`fabric_component_structure`）

对每个 Fabric 组件 `.ets` 文件执行以下 5 项结构检测。**任一项 fail → 整体 fail**，标记为"Fabric 组件结构不合规"。

| # | 检测项 | 通过条件 | 失败后果 |
|---|-------|---------|---------|
| a | RNOHContext 声明 | 存在 `public ctx!: RNOHContext` 或 `public ctx: RNOHContext` | 组件无法调用框架 API，功能完全失效 |
| b | tag 属性声明 | 存在 `public tag: number = 0` | 无法标识组件实例，props/events 无法关联 |
| c | subscribeToDescriptorChanges | `aboutToAppear` 中调用 `this.ctx.descriptorRegistry.subscribeToDescriptorChanges` | Props 无法从 RN 侧更新到原生侧 |
| d | RNViewBase 包裹 | `build()` 方法中使用 `RNViewBase({ ctx: this.ctx, tag: this.tag })` 作为根容器 | 组件不受 RN 布局系统管理 |
| e | cleanUp 清理 | `aboutToDisappear` 中清理 `cleanUpCallbacks`（`forEach(cb => cb())` 或等价逻辑） | 内存泄漏 + 重复订阅导致异常行为 |

**检测方法**：

```bash
# a) RNOHContext 声明
grep -n 'public ctx.*RNOHContext' ohos/harmony/{short_name}/src/main/ets/components/{Name}.ets

# b) tag 属性声明
grep -n 'public tag.*number' ohos/harmony/{short_name}/src/main/ets/components/{Name}.ets

# c) subscribeToDescriptorChanges
grep -n 'subscribeToDescriptorChanges' ohos/harmony/{short_name}/src/main/ets/components/{Name}.ets

# d) RNViewBase 包裹
grep -n 'RNViewBase' ohos/harmony/{short_name}/src/main/ets/components/{Name}.ets

# e) cleanUp 清理
grep -n 'aboutToDisappear\|cleanUpCallbacks' ohos/harmony/{short_name}/src/main/ets/components/{Name}.ets
```

**常见错误模式**：
- 使用 `@Prop ctx: Record<string, ESObject>` 代替 `RNOHContext` → 编译通过但运行时空白
- 通过 `@Prop` 装饰器传递 props 代替 `subscribeToDescriptorChanges` → 无法接收 RN 侧更新
- `build()` 中直接使用 ArkUI 组件而不用 `RNViewBase` 包裹 → 布局失效

#### 1.15 Builder Stack 包裹检测（`fabric_builder_stack_wrap`）

检查 `Index.ets` 中 `buildCustomRNComponent` Builder 的根容器是否为 `Stack`。

**检测方法**：

1. 定位 `buildCustomRNComponent` 函数体
2. 检查函数体第一个容器组件是否为 `Stack()`
3. 检查 `Stack` 后是否有 `.position({ x: 0, y: 0 })`

**判定**：
- 通过：`Stack() { if (ctx.componentName === ...) { ... } }.position({ x: 0, y: 0 })` 模式
- 失败：Builder 内直接 `if` 判断无容器包裹，或使用非 `Stack` 容器
- 无 Fabric 组件 → `skip`

**说明**：不用 `Stack` 包裹是 RNOH 框架的已知问题，编译完全正常但组件不渲染，无任何错误日志，极难排查。

#### 1.16 Package Descriptor 注册检测（`package_descriptor_registration`）

如果模块包含 Fabric 组件，验证 Package 文件是否实现了 `createDescriptorWrapperFactoryByDescriptorType` 方法。

**检测步骤**：

1. 确认模块包含 Fabric 组件（存在 `codegenNativeComponent` 调用）
2. 定位 Package 文件（`ohos/harmony/{short_name}/src/main/ets/{Name}Package.ts`）
3. 检查是否存在 `createDescriptorWrapperFactoryByDescriptorType` 方法
4. 检查方法内是否为每个 Fabric 组件注册了 `DescriptorWrapper`

**判定**：
- 通过：方法存在且所有 Fabric 组件已注册
- 失败：方法缺失，或部分组件未注册
- 无 Fabric 组件 → `skip`

**检测方法**：

```bash
# 检查 createDescriptorWrapperFactoryByDescriptorType 是否存在
grep -n 'createDescriptorWrapperFactoryByDescriptorType' ohos/harmony/{short_name}/src/main/ets/{Name}Package.ts

# 检查 DescriptorWrapper 注册
grep -n 'DescriptorWrapper' ohos/harmony/{short_name}/src/main/ets/{Name}Package.ts
```

**说明**：Package 缺少 Descriptor 注册是致命问题 — 组件在运行时完全不可用（不渲染），且不产生任何错误日志。仅有 TurboModule 注册不等于 Fabric 组件已注册。

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

## 3. 测试用例生成（onDeviceTest / Hypium）

为模块已实现的每个方法生成 **Hypium UI 测试**，写入 `ohos/example/harmony/entry/src/ohosTest/ets/test/ui/ModuleTest.test.ets`。

> **不再**生成 Jest `__tests__/module_test.js`。Local Test（`hvigorw test`）已弃用，统一使用 Instrument Test（`hvigorw onDeviceTest`）。

> **TestKit API 场景**（滚动查找、双指缩放、系统弹窗、坐标手势等）见 **`ohos-hypium-uitest` Skill**；本章侧重门禁、模板与校验。

### 3.1 RN onDeviceTest 约束（真机已验证）

参考工程：`react_native_get_device_locale` 的 `ohos/example/harmony/entry/src/ohosTest/`（`get_device_locale` / `detectWhiteScreen` 已通过）。

| 约束 | 说明 |
|------|------|
| **Kit 导入** | `Driver` / `ON` / `abilityDelegatorRegistry` 来自 `@kit.TestKit`；**禁止** `@ohos.UiTest`、`@ohos.app.ability.abilityDelegatorRegistry` |
| **Hypium** | `import { describe, it, expect, beforeAll } from '@ohos/hypium'`；TestAbility 用 `import { Hypium } from '@ohos/hypium'` |
| **单用例超时** | Hypium 默认 **15s**/用例；`beforeAll` 内 RN 加载 + 各 `it` 轮询总时长须控制在此以内 |
| **共享会话** | `beforeAll` 中 `startAbility` 一次 + `Driver.create()`；各 `it` 复用 `appDriver`，**不要**每个 `it` 都 `startAbility` |
| **RN testID** | RNOH 下 `ON.id(testID)` 可能无效；**必须**提供 `ON.text()` 兜底（按钮文案、页面标题） |
| **按钮文案** | 按钮 `Text` 须与页面标题**不同**（如标题 `Get Device Locale`，按钮 `Run getDeviceLocale`），避免 `ON.text` 误点标题 |
| **断言** | 用 `waitForText` / `waitForId` 轮询 + `expect(...).assertTrue()`；**禁止** `getText()`、`waitForIdle()`、`.catch()` 链 |
| **目录名** | `ets/testrunner/` 必须**全小写**（Windows 大小写会导致 `OpenHarmonyTestRunner` ReferenceError） |
| **前置 bundle** | 跑 onDeviceTest 前须已 `npm run dev` 生成 `harmony/entry/.../rawfile/bundle.harmony.js` |

### 3.2 标准辅助函数（复制到 ModuleTest.test.ets）

```typescript
import { abilityDelegatorRegistry, Component, Driver, ON } from '@kit.TestKit';
import { Want } from '@kit.AbilityKit';
import { describe, it, expect, beforeAll } from '@ohos/hypium';

const BUNDLE_NAME = '{bundleName}';       // 如 com.example.application
const ENTRY_ABILITY = '{abilityName}';   // 如 EntryAbility
const PAGE_TITLE_TEXT = '{pageTitle}';   // App.tsx 主标题 Text，用于白屏检测
const POLL_INTERVAL_MS = 500;
const RN_LOAD_TIMEOUT_MS = 12000;
const RESULT_TIMEOUT_MS = 6000;

let appDriver: Driver | null = null;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startEntryAbility(): Promise<void> {
  const delegator = abilityDelegatorRegistry.getAbilityDelegator();
  const want: Want = { bundleName: BUNDLE_NAME, abilityName: ENTRY_ABILITY };
  await delegator.startAbility(want);
}

async function waitForText(driver: Driver, text: string, timeoutMs: number): Promise<Component | null> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      return await driver.findComponent(ON.text(text));
    } catch (_e) {
      await sleep(POLL_INTERVAL_MS);
    }
  }
  return null;
}

async function waitForId(driver: Driver, id: string, timeoutMs: number): Promise<Component | null> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      return await driver.findComponent(ON.id(id));
    } catch (_e) {
      await sleep(POLL_INTERVAL_MS);
    }
  }
  return null;
}

/** Keys = findMethodButton `method` slug; values = exact testID from App.tsx / 04-testing.json */
const METHOD_BUTTON_IDS: Record<string, string> = {
  '{methodSlug}': '{buttonTestId}',
};

async function findMethodButton(
  driver: Driver,
  method: string,
  buttonText: string
): Promise<Component> {
  const candidates: string[] = [];
  if (METHOD_BUTTON_IDS[method]) {
    candidates.push(METHOD_BUTTON_IDS[method]);
  }
  candidates.push(`btn-${method}`, `test-${method}-btn`);
  for (const id of candidates) {
    const byId = await waitForId(driver, id, 2000);
    if (byId !== null) {
      return byId;
    }
  }
  const byText = await waitForText(driver, buttonText, 2000);
  if (byText !== null) {
    return byText;
  }
  throw new Error(`Button not found for ${method}`);
}
```

### 3.3 完整测试套模板（TurboModule）

```typescript
export default function moduleTest(): void {
  describe('{ModuleName}DeviceTest', () => {
    beforeAll(async () => {
      await startEntryAbility();
      appDriver = Driver.create();
      const title = await waitForText(appDriver, PAGE_TITLE_TEXT, RN_LOAD_TIMEOUT_MS);
      if (title === null) {
        throw new Error('RN app did not load: title not found');
      }
    });

    it('detectWhiteScreen', 0, async () => {
      expect(appDriver !== null).assertTrue();
      const title = await waitForText(appDriver!, PAGE_TITLE_TEXT, 2000);
      expect(title !== null).assertTrue();
    });

    it('{methodName}', 0, async () => {
      const driver = appDriver!;
      const button = await findMethodButton(driver, '{methodName}', '{buttonText}');
      await button.click();

      const errorText = await waitForText(driver, 'Error:', 1500);
      expect(errorText === null).assertTrue();

      let hasResult = false;
      const resultText = await waitForText(driver, 'Result:', RESULT_TIMEOUT_MS);
      if (resultText !== null) {
        hasResult = true;
      } else {
        const resultId = await waitForId(driver, 'result-{methodName}', 1500);
        hasResult = resultId !== null;
      }
      expect(hasResult).assertTrue();
    });
  });
}
```

**占位符替换示例**（`get_device_locale`）：

| 占位符 | 值 |
|--------|-----|
| `{bundleName}` | `com.example.application` |
| `{abilityName}` | `EntryAbility` |
| `{pageTitle}` | `Get Device Locale` |
| `{methodName}` | `getDeviceLocale` |
| `{buttonText}` | `Run getDeviceLocale` |

### 3.4 App.tsx 约定（与 Hypium 对齐）

**testID 必须与 `ModuleTest.test.ets` 的 `METHOD_BUTTON_IDS` 一致**（生成测试前读 `04-testing.json` 的 `method_coverage.*.test_id` 与 `App.tsx` 实际 `testID`，禁止臆造 `test-*-btn` 若页面已是 `btn-*`）。

推荐命名（二选一，全项目统一）：

| 风格 | 按钮 testID | 说明 |
|------|-------------|------|
| A（推荐） | `test-{methodSlug}-btn` | 与历史 `tool-testing` 模板一致 |
| B | `btn-{methodSlug}` | 部分 Example 已采用；测试须写入 `METHOD_BUTTON_IDS` |

每个 `implemented_method` 须在 `ohos/example/App.tsx` 提供：

```tsx
<TouchOpacity
  testID="test-{methodName}-btn"
  accessibilityLabel="test-{methodName}-btn"
  onPress={handleXxx}>
  <Text>Run {methodName}</Text>   {/* 文案勿与页面标题相同 */}
</TouchableOpacity>

{result && !error && (
  <View testID="result-{methodName}-box">
    <Text>Result:</Text>
    <Text testID="result-{methodName}">{result}</Text>
  </View>
)}

{error && (
  <View testID="error-{methodName}-box">
    <Text>Error:</Text>
    <Text testID="error-{methodName}">{error}</Text>
  </View>
)}
```

页面须有稳定主标题 `Text`（供 `detectWhiteScreen`），如 `<Text>Get Device Locale</Text>`。

### 3.5 Fabric Component 测试

在 `beforeAll` 已启动 RN 的前提下，检测组件容器：

```typescript
it('render{ComponentName}', 0, async () => {
  const driver = appDriver!;
  let found = await waitForId(driver, 'test-{componentName}', 3000);
  if (found === null) {
    found = await waitForText(driver, '{visibleLabel}', 2000);
  }
  expect(found !== null).assertTrue();
});
```

### 3.6 ohosTest 脚手架

`rn.py create ohos-test` 会从模板增量补充 `entry/src/ohosTest/`（与 `create example` / `create harmony` 平行；旧库跑测试验证前必跑）。**通常只需改写** `ModuleTest.test.ets`，不必重复创建脚手架。

| 文件 | 用途 |
|------|------|
| `entry/src/ohosTest/module.json5` | 测试模块配置（TestAbility + OpenHarmonyTestRunner） |
| `entry/src/ohosTest/ets/testability/TestAbility.ets` | Hypium 入口，调用 `Hypium.hypiumTest()` |
| `entry/src/ohosTest/ets/testrunner/OpenHarmonyTestRunner.ts` | Instrument Test 启动器（**目录名必须小写 `testrunner`**，Windows 上大小写错误会导致运行时 crash） |
| `entry/src/ohosTest/ets/test/List.test.ets` | 聚合 testsuite |
| `entry/src/ohosTest/ets/test/ui/ModuleTest.test.ets` | 模块 UI 测试用例（Agent 主要编辑此文件） |
| `entry/src/ohosTest/resources/` | test_pages、string、startIcon 等资源 |
| `entry/oh-package.json5` devDependencies | `"@ohos/hypium": "1.0.25"`（ohosTest 在 entry 模块，**须加在 entry 级**，非 `harmony/oh-package.json5` 根目录） |

脚手架模板默认 `ModuleTest.test.ets` 含 `detectWhiteScreen`（`Hello HarmonyOS!` / `app-title`）。集成阶段按 §3.3 为每个 API 追加 `it()`。

**TestAbility.ets**（与 locale 工程一致）：

```typescript
import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
import { abilityDelegatorRegistry } from '@kit.TestKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { window } from '@kit.ArkUI';
import { Hypium } from '@ohos/hypium';
import testsuite from '../test/List.test';

export default class TestAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    const abilityDelegator = abilityDelegatorRegistry.getAbilityDelegator();
    const abilityDelegatorArguments = abilityDelegatorRegistry.getArguments();
    Hypium.hypiumTest(abilityDelegator, abilityDelegatorArguments, testsuite);
  }
  onWindowStageCreate(windowStage: window.WindowStage): void {
    windowStage.loadContent('testability/pages/Index', () => {});
  }
}
```

**List.test.ets**：

```typescript
import moduleTest from './ui/ModuleTest.test';

export default function testsuite(): void {
  moduleTest();
}
```

### 3.7 生成规则

- **步骤 0（必做）**：生成前先 `read` 固定路径 `ModuleTest.test.ets`；若已存在则 **必跑** `validate_module_test.py`，exit 0 时 **禁止整文件重写**（`regenerated: false`）
- 每个 **可设备测试** 的 `implemented_method` 一个 `it('{methodName}', 0, async () => { ... })`
- **`getConstants` 不生成单独 `it()`**：TurboModule Spec 须实现，但属内部契约；Example 通过公开静态字段或其它 API 间接验证（见 `primary-04-testing.md` §4.0）。`validate_module_test.py` 会自动从 `--methods` 排除 `getConstants`
- 测试套**必须**含 `it('detectWhiteScreen', ...)` 与 `beforeAll` 启动 RN
- `not_implemented` 不生成用例
- App.tsx 与 §3.4 对齐；生成前读取 App.tsx 提取真实 `pageTitle`、`buttonText`、`testID`
- `it()` 第三参数 filter 固定 `0`
- 单方法 `it` 内轮询总时长建议 ≤ 10s（`beforeAll` 已消耗 RN 加载时间）
- **任何 write/edit 后必跑**（exit 0 才能报 `validation_ok: true`）：

```bash
python .claude/skills/tool-ohos-plugin-repo/tool/validate_module_test.py \
  --methods {implemented_methods 逗号分隔}
```

脚本校验：结构完整、testID↔App.tsx、`BUNDLE_NAME`/`ENTRY_ABILITY`↔`app.json5`/entry `module.json5`。

### 3.8 常见失败（生成时避免）

| 现象 | 原因 | 处理 |
|------|------|------|
| `Cannot find module OpenHarmonyTestRunner` | `TestRunner` 目录大小写 | 目录改为 `ets/testrunner/` |
| `execute timeout 15000ms` | 单 `it` 内 sleep 过多 | 用 `beforeAll` + 缩短轮询 |
| 误点标题、无 Result | 按钮与标题同文案 | 按钮用 `Run {method}` |
| onDeviceTest 卡死 | 锁屏/息屏 | sub-device-verify 跳过，不 wakeup |
| `init_coverage.json` | DevEco 默认开覆盖率 | `-p ohos-test-coverage=false` |

### 3.9 已弃用：Jest Local Test 模板

以下 Jest 模板仅供历史参考，**新模块不再使用**：

<details>
<summary>Jest 模板（已弃用）</summary>

```tsx
import { NativeModules } from 'react-native';
describe('ModuleName', () => {
  it('methodName returns expected result', async () => {
    const result = await NativeModules.ModuleName.methodName();
    expect(result).toBeDefined();
  });
});
```

</details>

---

## 4. 设备运行态验证

### 4.1 设备可用性检测

```bash
hdc list targets
```

- 返回有效设备 ID → 继续设备验证
- 无设备 → 跳过设备验证，设置 `device_test_status: "skipped"`, `device_test_skip_reason: "no_device"`
- 编译未通过 → 跳过设备验证，设置 `device_test_skip_reason: "build_failed"`

### 4.2 确认 ohosTest 测试代码

```bash
ls example/harmony/entry/src/ohosTest/ets/test/ui/ModuleTest.test.ets
ls example/harmony/entry/src/ohosTest/ets/testability/TestAbility.ets
```

缺失 → 由 sub-integration-test 生成并写入。Subagent **先检查现有** `ModuleTest.test.ets`，**必跑** `validate_module_test.py`；通过则沿用，失败才修补/重写。父 Agent 验收 `write_success` + `validation_ok`（exit 0）。

### 4.3 安装 Hypium 依赖

确认 `example/harmony/entry/oh-package.json5` 的 `devDependencies` 含 `"@ohos/hypium": "1.0.25"`，然后：

```bash
cd example/harmony && ohpm install
```

### 4.4 设备可跑性检查（sub-device-verify：不可跑则跳过）

Instrument Test 使用 Hypium `Driver`。**息屏或锁屏**时 `hvigorw onDeviceTest` 会长时间卡死。

**`sub-device-verify` 行为**（见 `sub-device-verify.md` 步骤 4.5）：

1. 只读检查 `hidumper -s PowerManagerService -a -s` → `Current State` 须为 `AWAKE`
2. 无法确认已解锁（锁屏）→ **不执行** onDeviceTest，返回 `device_test_status: "skipped"`, `device_test_skip_reason: "device_not_ready"`
3. **禁止**自动 `power-shell wakeup` / `uitest swipe` 试图解锁

**人工本地调试**（非 sub-device-verify）可自行唤醒后重试：

```bash
hdc shell power-shell wakeup
hdc shell hidumper -s PowerManagerService -a -s | grep "Current State"
```

### 4.5 崩溃与启动失败检测（onDeviceTest 成功安装后必做）

> **Fast-Fail 例外**：hvigor 报 `BUILD FAILED` 且为 HAP 安装失败、权限授予失败、ohosTest 编译失败时，**跳过**本节与 §4.5 步骤 B，立即返回（见 `sub-device-verify.md` §5.0）。

> **禁止**仅因终端 `BUILD SUCCESSFUL` 或 exit 0 认为通过。主应用 `EntryAbility` crash（如模拟器缺 `librnoh_app.so`）时，Hypium 可能只报 `detectWhiteScreen` 超时，hvigor 仍成功。

**步骤 A — 必读报告**（可用脚本一次完成 A+B）：

```
example/harmony/entry/.test/default/intermediates/ohosTest/coverage_data/test_result.txt
```

```bash
python .claude/skills/tool-ohos-plugin-repo/tool/parse_device_test_result.py \
  --test-result ohos/example/harmony/entry/.test/default/intermediates/ohosTest/coverage_data/test_result.txt \
  --methods {implemented_methods} --hilog-seconds 15
```

**步骤 B — 短 hilog**（脚本未用时；**禁止** `-t 60`）：

```bash
hdc hilog -t 15
```

**致命模式**（任一命中 → `device_crash_detected: true`，`device_test_status` 不得为 `pass`）：

| 类别 | 关键词 |
|------|--------|
| 原生崩溃 | `FATAL`, `JSCrash`, `CppCrash`, `NativeCrash`, `SIGABRT`, `ApplicationForceStop` |
| RNOH 启动失败 | `libRNOHApp is undefined`, `Couldn't create bindings between ETS and CPP`, `Load native module failed`, `librnoh_app`, `Error loading shared library`, `load module default/rnoh_app failed` |
| JS 进程退出 | `is about to exit due to RuntimeError`, `Kill Reason:Js Error`, `PROCESS_KILL` |

```bash
grep -iE "FATAL|JSCrash|CppCrash|NativeCrash|SIGABRT|libRNOHApp is undefined|Couldn't create bindings between ETS and CPP|Load native module failed|librnoh_app|RuntimeError|PROCESS_KILL|Kill Reason:Js Error" 
```

`.so` 架构不匹配（模拟器 x86_64、HAP 仅 arm64）→ `suggested_owner: environment`，检查 `entry/build-profile.json5` 的 `abiFilters`。

崩溃修复上限 **3 次**（仅 `failure_owner=library` 的项）。

### 4.6 测试执行（onDeviceTest）

**主路径**：Instrument Test（真机 Hypium）

```bash
cd example/harmony
hvigorw onDeviceTest --mode module -p product=default -p ohos-test-coverage=false --no-daemon
```

onDeviceTest 自动完成：编译 ohosTest → 打包 entry-test.hap → 安装主 HAP + 测试 HAP → 启动 TestAbility → 执行用例。

**安装/编译失败 Fast-Fail**：终端含 `install failed`、`grant request permissions failed`、`Failed to install bundle` 等 → Subagent **立即返回** `device_test_fast_fail: true`，**不**读 `test_result.txt`、**不**跑 `hdc hilog -t 60`（见 `sub-device-verify.md` §5.0）。

执行成功安装后按 §4.5 读 **test_result.txt** + **hilog**，再映射 pass/fail（不得只看终端 BUILD SUCCESSFUL）。

**关闭覆盖率**：命令加 `-p ohos-test-coverage=false`（DevEco IDE 默认 `ohos-test-coverage=true`，会报 `init_coverage.json` 不存在）。

**Fallback**（onDeviceTest 不可用时）：
1. 手动 `hdc install` 主 HAP 并启动 EntryAbility
2. 通过 `hdc hilog` 收集应用日志
3. 从 App.tsx console.log 或 UI 反馈推断方法调用结果

> **禁止**使用 `hvigorw test`（Local Test）作为设备验证主路径。

### 4.7 结果映射

| 测试输出 | device_test_results.result | 含义 |
|---------|--------------------------|------|
| 方法执行成功且断言通过 | `pass` | 功能正常 |
| 方法执行成功但返回值不符 | `assert_fail` | 返回值有误 |
| 方法执行抛异常 | `error` | 运行时错误 |
| 方法未被执行到 | `not_executed` | 未覆盖 |

### 4.8 设备验证失败归因与修复循环（primary-04 步骤 10）

**安装 Fast-Fail**（`device_test_fast_fail: true`）：走 `primary-04-testing.md` **§10.0**，先修 `module.json5`/权限/build，**禁止**无修改复调 sub-device-verify；同一 install 错误 5 次未变则停止循环。

对 Hypium **已执行**的 `assert_fail` 和 `error`，**父 Agent 必须先归因**，再分流修复：

| `failure_owner` | 修复方 | 修改范围 |
|-----------------|--------|----------|
| `test` | 父 Agent | `ModuleTest.test.ets`（或再调 sub-integration-test） |
| `example` | 父 Agent | `App.tsx`、Entry `module.json5` 等 |
| `library` | sub-lib-fixer | `harmony/library` ETS/C++ |
| `environment` | 不修（记录） | 设备/签名/HAP 安装失败等 |

**归因启发式**（与 sub-device-verify 的 `suggested_owner` 一致）：

- **test**：控件/文案找不到，但 App.tsx 已有对应 testID/按钮
- **example**：缺按钮、缺 Result 区、Provider/权限、白屏标题不符
- **library**：能点到按钮且出现 `Error:`，或 Result 与 Spec 不符，或原生崩溃在 library 栈；**或** HAP 安装权限误声明（`grant request permissions failed`）

**每轮修复后必做**：

1. 按改动类型重建：**改库**（`ohos/harmony/{short_name}/`）→ 先 `rn.py build har --plugin-root .`，再 `rn.py build hap --plugin-root .`；**仅 Example / ModuleTest** → 直接 `build hap`
2. **再次** `hvigorw onDeviceTest`（通过 sub-device-verify）

**修复循环无轮次上限**（验证 → 归因修复 → 复测），直至全 pass、本轮无改动、无法复测、**安装 fast-fail 同一错误 5 次**，或连续五轮 `device_test_results` 完全相同且已尝试过修复。`library_fixes` 仅记录 sub-lib-fixer 的库修复；test/example 修复记入 `files_modified`。

### 4.9 汇总判定

| 条件 | device_test_status |
|------|-------------------|
| 全部方法 `pass` 且 hilog 无致命模式 | `pass` |
| 存在 `pass` 但也有非 pass | `partial` |
| `device_crash_detected: true` 或全部非 pass | **`fail`** |
| 无设备或编译未通过 | `skipped` |
| `device_test_fast_fail: true`（HAP 未装上） | **`fail`**（父 Agent 走 §10.0 修根因） |

> hvigor exit 0 + BUILD SUCCESSFUL **不能**单独判 pass。

---

## 5. js-only 模块检测规则

js-only 模块无原生代码（无 `harmony/library`），适用以下简化检测：

### 5.1 适用检测项

| 检测项 | 检测内容 |
|--------|----------|
| **package.json 入口** | 根据 `ohos/src/` 入口文件扩展名判断：**JS 源码**（`.js`）→ `main`/`module`/`react-native`/`types` 全部指向 `./src/index.js`；**TS 源码**（`.ts`/`.tsx`）→ `react-native` 和 `source` 指向 `./src/index.ts`，`main`/`module` 指向 `./dist/`，`types` 指向 `./dist/typescript/index.d.ts` |
| **构建脚本** | **JS 源码**→ `scripts` 应为空（`{}`），不包含 `prepare`/`build`；**TS 源码**→ `scripts` 应包含 `prepare`（如 `bob build`） |
| **Intl API 可用性** | `ohos/src/` 中是否直接使用 `Intl.DateTimeFormat` 等而无 `typeof Intl !== 'undefined'` 前置检查 |
| **Platform.OS harmony 保留** | 原代码中的 `Platform.OS === 'harmony'` 判断是否被误删 |
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
   - 仅执行 5.1 中的 8 项检测
   - 跳过库正确性检测（1.8-1.10）
   - 跳过库代码修复流程
3. **产物填写**：
   - `runtime_checks` 仅记录执行的 8 项检测
   - `library_fixes` 记录 package.json 入口修复、Intl 检查补全等（如有）
   - `method_coverage` 按 JS 导出方法统计
