# ArkTS TurboModule 鸿蒙适配

## 适用条件

- 模块通过 TurboModule 实现 JS ↔ 原生通信
- 原生逻辑用 ArkTS（ETS）编写
- 不需要高频跨线程操作（否则用 C++ TurboModule）

---

## 第一部分：工程配置

### 目录结构

```
{module_name}/
├── src/
│   └── specs/
│       └── v2/
│           └── NativeXxx.ts          # JS Spec 声明
├── harmony/
│   └── library/
│       ├── src/main/
│       │   ├── ets/
│       │   │   ├── XxxModule.ets     # ArkTS TurboModule 实现
│       │   │   └── XxxPackage.ets    # RNOHPackage 注册
│       │   ├── cpp/
│       │   │   └── CMakeLists.txt    # Codegen 生成的 C++ 胶水代码
│       │   └── module.json5
│       ├── oh-package.json5
│       ├── build-profile.json5
│       ├── hvigorfile.ts
│       └── Index.ets
├── index.ts                          # 导出入口
└── package.json                      # harmony 配置
```

### package.json — harmony 配置（必须）

```json
{
  "name": "{module_name}",
  "version": "1.0.0",
  "main": "index.ts",
  "harmony": {
    "alias": "{module_alias}",
    "codegenConfig": [
      {
        "version": 2,
        "specPaths": ["./src/specs/v2"]
      }
    ]
  }
}
```

### JS Spec 声明

```typescript
// src/specs/v2/NativeXxx.ts
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  methodName(param1: string, param2: number): Promise<string>;
  syncMethod(): string;
}

export default TurboModuleRegistry.get<Spec>('XxxModule') as Spec | null;
```

### oh-package.json5 — 依赖配置

```json5
{
  "name": "{module_harmony_name}",
  "version": "1.0.0",
  "description": "",
  "license": "ISC",
  "dependencies": {
    "@rnoh/react-native-openharmony": "file:../../oh_modules/@rnoh/react-native-openharmony"
  }
}
```

如需额外的 ohpm 三方包（来自 `02-planning.json` 的 `native_dependency_mapping`）：

```json5
{
  "dependencies": {
    "@rnoh/react-native-openharmony": "file:../../oh_modules/@rnoh/react-native-openharmony",
    "@ohos/some_package": "^1.0.0"
  }
}
```

### module.json5 — 权限声明（按需）

```json5
{
  "module": {
    "name": "{module_name}",
    "type": "har",
    "deviceTypes": ["default", "tablet"],
    "requestPermissions": [
      {
        "name": "ohos.permission.INTERNET",
        "reason": "$string:internet_reason",
        "usedScene": { "abilities": ["EntryAbility"], "when": "always" }
      }
    ]
  }
}
```

---

## 第二部分：编码实现

### ArkTS TurboModule 实现

TurboModule 分两种基类：
- `UITurboModule`：在 UI 线程执行，可访问 UI 组件
- `AnyThreadTurboModule`：可在任意线程执行，适合 I/O 密集型操作

```ets
// harmony/library/src/main/ets/XxxModule.ets
import { UITurboModule, UITurboModuleContext } from '@rnoh/react-native-openharmony/ts';
import { TM } from '@rnoh/react-native-openharmony/generated/ts';

export class XxxModule extends UITurboModule implements TM.XxxModule.Spec {
  constructor(ctx: UITurboModuleContext) {
    super(ctx);
  }

  methodName(param1: string, param2: number): Promise<string> {
    return Promise.resolve(`Result: ${param1} - ${param2}`);
  }

  syncMethod(): string {
    return 'OpenHarmony';
  }
}
```

### AnyThreadTurboModule（非 UI 线程）

```ets
import { AnyThreadTurboModule, AnyThreadTurboModuleContext } from '@rnoh/react-native-openharmony/ts';
import { TM } from '@rnoh/react-native-openharmony/generated/ts';

export class XxxModule extends AnyThreadTurboModule implements TM.XxxModule.Spec {
  constructor(ctx: AnyThreadTurboModuleContext) {
    super(ctx);
  }

  heavyComputation(data: string): Promise<string> {
    // 在非 UI 线程执行，不阻塞 UI
    return Promise.resolve(data.toUpperCase());
  }
}
```

### Package 注册

```ets
// harmony/library/src/main/ets/XxxPackage.ets
import {
  RNOHPackage,
  UITurboModule,
  UITurboModuleContext,
  AnyThreadTurboModule,
  AnyThreadTurboModuleContext
} from '@rnoh/react-native-openharmony';
import { TM } from '@rnoh/react-native-openharmony/generated';
import { XxxModule } from './XxxModule';

export class XxxPackage extends RNOHPackage {
  override getUITurboModuleFactoryByNameMap(): Map<string, (ctx: UITurboModuleContext) => UITurboModule | null> {
    return new Map<string, (ctx: UITurboModuleContext) => UITurboModule>()
      .set(TM.XxxModule.NAME, (ctx) => new XxxModule(ctx));
  }
}
```

如使用 AnyThreadTurboModule：

```ets
export class XxxPackage extends RNOHPackage {
  override getAnyThreadTurboModuleFactoryByNameMap(): Map<string, (ctx: AnyThreadTurboModuleContext) => AnyThreadTurboModule | null> {
    return new Map<string, (ctx: AnyThreadTurboModuleContext) => AnyThreadTurboModule>()
      .set(TM.XxxModule.NAME, (ctx) => new XxxModule(ctx));
  }
}
```

### 获取 Context

通过 `UITurboModuleContext` 获取鸿蒙系统能力：

```ets
export class XxxModule extends UITurboModule implements TM.XxxModule.Spec {
  constructor(ctx: UITurboModuleContext) {
    super(ctx);
  }

  async doSomething(): Promise<void> {
    // 获取 UIAbilityContext
    const uiAbilityContext = this.ctx.uiAbilityContext;

    // 获取 RNInstance（用于 emitDeviceEvent 等）
    const rnInstance = this.ctx.rnInstance;
  }
}
```

### Native → JS 事件发送（DeviceEventEmitter）

```ets
// 在 TurboModule 中发送事件到 JS 侧
this.ctx.rnInstance.emitDeviceEvent("eventName", { key: "value", count: 42 });
```

JS 侧监听：

```tsx
import { DeviceEventEmitter } from 'react-native';

useEffect(() => {
  const subscription = DeviceEventEmitter.addListener('eventName', (data) => {
    console.log(data.key, data.count);
  });
  return () => subscription.remove();
}, []);
```

### 异步方法处理

```ets
async getData(): Promise<string> {
  try {
    // 调用鸿蒙异步 API
    const result = await someOhosAsyncApi();
    return result;
  } catch (err) {
    throw new Error(`Failed: ${(err as Error).message}`);
  }
}
```

### JS ↔ ETS 类型映射表

| JS/TS 类型 | ETS 类型 | 说明 |
|-----------|----------|------|
| `string` | `string` | |
| `number` | `number` | |
| `boolean` | `boolean` | |
| `Array<T>` | `Array<T>` | |
| `Object` / `Record<string, any>` | 具体 interface 或 `Record<string, Object>` | |
| `Promise<T>` | `Promise<T>` | |
| `null` | `null` | |
| `undefined` | `undefined` | |

### Codegen 使用

运行 Codegen 生成 C++ 胶水代码：

```bash
cd {native_project}
npm run codegen
# 或
npx react-native codegen-harmony --cpp-output-path ./entry/src/main/cpp/generated --rnoh-module-path ./entry/oh_modules/@rnoh/react-native-openharmony
```

Codegen 会根据 Spec 文件生成：
- `TM.XxxModule.NAME` 常量
- `TM.XxxModule.Spec` interface
- C++ 侧的 JSI 绑定代码

---

## 第三部分：常见编译错误与修复

### 1. `Cannot find module '@rnoh/react-native-openharmony'`

**原因**：oh-package.json5 中依赖路径不对。

**修复**：
- 确认 `@rnoh/react-native-openharmony` 依赖路径指向正确的 oh_modules 目录
- 通常为 `file:../../oh_modules/@rnoh/react-native-openharmony`

### 2. `Property 'xxx' is missing in type 'XxxModule' but required in type 'Spec'`

**原因**：TurboModule 实现类未实现 Spec 中所有方法。

**修复**：
- 逐一实现 Spec 中声明的所有方法
- 暂不支持的方法返回 `Promise.reject(new Error('Not implemented'))` 或抛出异常

### 3. `Type 'xxx' is not assignable to type 'yyy'`

**原因**：ArkTS 严格类型检查，类型不匹配。

**修复**：
- 确保方法参数和返回类型与 Spec 声明完全一致
- 注意 `number` 不区分 int/float

### 4. `TM is not found` / `Cannot find name 'TM'`

**原因**：Codegen 未运行或生成的代码未正确放置。

**修复**：
- 运行 `npm run codegen` 生成胶水代码
- 确认生成的文件位于 `entry/src/main/cpp/generated` 目录
- 确认 import 路径正确：`import { TM } from '@rnoh/react-native-openharmony/generated/ts'`

### 5. `Cannot find module '@ohos.xxx'`

**原因**：导入了不存在的模块或模块名拼写错误。

**修复**：
- 确认模块名正确（检查 SDK `.d.ts` 文件）
- 部分 API 已迁移到 Kit 导入方式：`import { xxx } from '@kit.XxxKit'`

### 6. `'async' modifier cannot be used here`

**原因**：ArkTS 中 interface 方法签名不能直接声明 async。

**修复**：
- 方法签名返回 `Promise<T>` 即可
- 在实现中使用 async/await

### 7. Package 未被注册导致 TurboModule 找不到

**原因**：Package 未在 Entry 工程中注册。

**修复**：
- 确认模块支持 Autolinking（package.json 中有 `harmony.autolinking` 配置）
- 或在 Entry 工程的 PackageProvider 中手动注册
