# MethodChannel 插件鸿蒙适配

## 适用条件

- 插件主要通过 `MethodChannel` 实现 Dart ↔ 原生通信
- 插件架构为 standalone（独立插件）
- 可能同时包含 EventChannel（混合模式），但以 MethodChannel 为主

> `type-method-channel` 只表示**主通信模式**，不表示实现只能有单个 `Plugin.ets`。如果主方案还依赖页面/容器、PlatformView/XComponent/Texture、UIAbility、辅助组件、桥接层或额外 Dart/ETS 文件，仍应在此基础上扩展完整结构，并补充读取对应的辅助类型指导文件。辅助承载层、预览层、纹理层、桥接层本身不等于公开 API 必然变化；若可被封装在插件内部，应优先保持原公开调用方式与行为兼容。

---

## 第一部分：工程配置

> `ohos/` 目录由 `flutter create -t plugin --platforms ohos .` 自动生成（见 prompt 步骤 3.1）。本部分只描述对生成结果的自定义配置。**不要手动创建 `build-profile.json5`、`hvigorfile.ts`、`module.json5` 等配置文件。**

### pubspec.yaml — 添加 ohos 平台声明（必须）

`flutter create` 不会自动修改 `pubspec.yaml`，需要手动添加 ohos 平台：

```yaml
flutter:
  plugin:
    platforms:
      ohos:
        package: com.example.xxx
        pluginClass: XxxPlugin
```

### oh-package.json5 — 添加三方依赖（按需）

如果插件需要额外的 ohpm 三方包（来自 `02-planning.json` 的 `native_dependency_mapping`），在 `flutter create` 生成的 `ohos/oh-package.json5` 的 `dependencies` 中追加：

```json5
{
  "dependencies": {
    "@ohos/some_package": "^1.0.0"
  }
}
```

> `@ohos/flutter_ohos` 依赖由 Flutter 构建工具自动注入，无需手动添加。

### build-profile.json5 — Bytecode HAR 与 SDK 版本配置（按需）

如果添加的 ohpm 依赖使用 **Bytecode HAR** 格式（如 `@ohos/rive`、`@ohos/lottie` 等预编译库），或依赖声明了最低 SDK 版本要求，需要在 **Example 工程级** `example/ohos/build-profile.json5` 中做以下配置：

#### Bytecode HAR 支持

Bytecode HAR 包需要启用 `useNormalizedOHMUrl`，否则编译报错 `"Bytecode HARs: [@ohos/xxx] not supported when useNormalizedOHMUrl is not true"`：

```json5
{
  "app": {
    "products": [
      {
        "name": "default",
        "signingConfig": "default",
        "compatibleSdkVersion": "5.0.0(12)",
        "buildOption": {
          "strictMode": {
            "useNormalizedOHMUrl": true
          }
        }
      }
    ]
  }
}
```

> **注意**：`useNormalizedOHMUrl` 必须在 `app.products[].buildOption.strictMode` 下，而非直接放在 products 层级。

#### compatibleSdkVersion 升级

如果 ohpm 依赖要求更高的 SDK 版本（编译报错 `"The project's compatibleSdkVersion: XXX cannot be lower than the minimum compatible version YYY"`），需要在 `app.products[].compatibleSdkVersion` 中升级版本号。

**检查步骤**：
1. 查看依赖包的 README 或 `oh-package.json5` 确认最低版本要求
2. 在 `build-profile.json5` 中升级 `compatibleSdkVersion`（如 `"5.0.0(12)"` → `"5.0.5(17)"`）
3. 升级后重新执行 `ohpm install` 和编译

> HarmonyOS 版本号格式：`"M.S.F(API Level)"`，如 `"5.0.5(17)"` 表示 API Level 17。

### modelVersion 一致性检查（必须）

OHOS 构建系统要求 ohpm 配置与 hvigor 配置的 `modelVersion` 完全一致，不一致时 hvigor 构建直接阻断，报错："ohpm配置的modelVersion与hvigor配置的modelVersion不一致"。

**检查范围**（以下文件的 `modelVersion` 字段必须相同）：
1. `example/ohos/hvigor/hvigor-config.json5` — 以此为基准值
2. `example/ohos/oh-package.json5` — 项目根目录
3. `example/ohos/entry/oh-package.json5` — entry 模块

**修复方式**：如果 `oh-package.json5` 中缺少 `modelVersion` 字段或值与 `hvigor-config.json5` 不一致，添加或修正为一致的值（范围 5.0.0 ~ 6.1.0）。

### module.json5 — 添加权限声明（按需）

如果插件需要系统权限，在 `flutter create` 生成的 `ohos/src/main/module.json5` 的 `module` 下追加 `requestPermissions`：

```json5
{
  "module": {
    "name": "xxx_plugin",
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

> **`user_grant` 权限必须运行时申请**：HarmonyOS 权限分为 `system_grant`（安装时自动授予，如 `INTERNET`）和 `user_grant`（需用户弹窗确认，如 `READ_PASTEBOARD`、`CAMERA`、`MICROPHONE`、`READ_MEDIA`、`ACCESS_BLUETOOTH`）。仅在 `module.json5` 中声明 `user_grant` 权限**不会**自动授予——首次调用受保护 API 时，系统会直接拒绝（返回空数据、错误码或异常），且**不会**自动弹出授权弹窗。
>
> **规则**：凡使用 `user_grant` 权限的插件，**必须**：
> 1. 实现 `AbilityAware` 接口获取 `UIAbilityContext`
> 2. 在首次调用受保护 API 前，调用 `abilityAccessCtrl.createAtManager().requestPermissionsFromUser(context, permissions)` 申请权限
> 3. 处理用户拒绝的情况（返回有意义的错误，而非静默失败）
>
> **禁止**：仅调用 `verifyAccessToken()` 检查权限状态而不调用 `requestPermissionsFromUser()` 申请权限。`verifyAccessToken` 是检查（check），不是申请（request）。
>
> ```ets
> import { abilityAccessCtrl, bundleManager, Permissions } from '@kit.AbilityKit';
>
> private async ensurePermission(permission: Permissions): Promise<boolean> {
>   const atManager = abilityAccessCtrl.createAtManager();
>   const bundleInfo = await bundleManager.getBundleInfoForSelf(
>     bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION
>   );
>   const tokenId = bundleInfo.appInfo.accessTokenId;
>   const status = atManager.verifyAccessTokenSync(tokenId, permission);
>   if (status === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
>     return true;
>   }
>   // 未授予 → 弹窗申请
>   if (this.context === null) {
>     return false; // 无 UIAbilityContext，无法申请
>   }
>   const result = await atManager.requestPermissionsFromUser(this.context, [permission]);
>   return result.authResults[0] === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED;
> }
> ```
>
> **常见 `user_grant` 权限参考**：
>
> | 权限 | 场景 |
> |------|------|
> | `ohos.permission.CAMERA` | 相机 |
> | `ohos.permission.MICROPHONE` | 录音 |
> | `ohos.permission.READ_PASTEBOARD` | 读取剪贴板（API 12+） |
> | `ohos.permission.ACCESS_BLUETOOTH` | 蓝牙 |
> | `ohos.permission.APPROXIMATELY_LOCATION` | 模糊定位 |
> | `ohos.permission.LOCATION` | 精确定位 |
> | `ohos.permission.READ_IMAGEVIDEO` / `WRITE_IMAGEVIDEO` | 图库读写 |
> | `ohos.permission.READ_AUDIO` / `WRITE_AUDIO` | 音频文件读写 |

---

## 第二部分：编码实现

### 插件基本结构

> `flutter create` 会在 `ohos/src/main/ets/components/plugin/` 下生成一个基础插件模板。在此模板基础上扩展业务逻辑即可。
> 该模板只是起点，不是实现上限。不要因为当前类型是 `type-method-channel`，就默认判定“插件不能包含辅助页面/组件/承载层”或“需要宿主配合即不可实现”。若主方案需要额外承载能力，应继续新增对应 ETS/Dart 文件和桥接逻辑。

```ets
import {
  FlutterPlugin,
  FlutterPluginBinding,
  MethodCall,
  MethodCallHandler,
  MethodChannel,
  MethodResult,
} from '@ohos/flutter_ohos';

export default class XxxPlugin implements FlutterPlugin, MethodCallHandler {
  private channel: MethodChannel | null = null;

  getUniqueClassName(): string {
    return "XxxPlugin";
  }

  onAttachedToEngine(binding: FlutterPluginBinding): void {
    this.channel = new MethodChannel(binding.getBinaryMessenger(), "channel_name");
    this.channel.setMethodCallHandler(this);
  }

  onDetachedFromEngine(binding: FlutterPluginBinding): void {
    if (this.channel != null) {
      this.channel.setMethodCallHandler(null);
    }
    this.channel = null;
  }

  onMethodCall(call: MethodCall, result: MethodResult): void {
    switch (call.method) {
      case "getPlatformVersion":
        result.success("OpenHarmony");
        break;
      default:
        result.notImplemented();
        break;
    }
  }
}
```

### 获取 Context

许多鸿蒙 API 需要 Context 参数，通过 `FlutterPluginBinding` 获取：

```ets
import {
  FlutterPlugin,
  FlutterPluginBinding,
  MethodCall,
  MethodCallHandler,
  MethodChannel,
  MethodResult,
} from '@ohos/flutter_ohos';
import common from '@ohos.app.ability.common';

export default class XxxPlugin implements FlutterPlugin, MethodCallHandler {
  private channel: MethodChannel | null = null;
  private context: common.Context | null = null;

  getUniqueClassName(): string {
    return "XxxPlugin";
  }

  onAttachedToEngine(binding: FlutterPluginBinding): void {
    this.context = binding.getApplicationContext();
    this.channel = new MethodChannel(binding.getBinaryMessenger(), "channel_name");
    this.channel.setMethodCallHandler(this);
  }

  onDetachedFromEngine(binding: FlutterPluginBinding): void {
    this.context = null;
    if (this.channel != null) {
      this.channel.setMethodCallHandler(null);
    }
    this.channel = null;
  }

  onMethodCall(call: MethodCall, result: MethodResult): void { /* ... */ }
}
```

如需 UIAbilityContext（用于权限申请、启动 Ability 等），插件必须额外实现 `AbilityAware` 接口。**`FlutterPluginBinding` 上没有 `getAbility()` 方法**，`getAbility()` 属于 `AbilityPluginBinding`，只能在 `onAttachedToAbility` 回调中获取：

```ets
import {
  FlutterPlugin,
  FlutterPluginBinding,
  MethodCall,
  MethodCallHandler,
  MethodChannel,
  MethodResult,
  AbilityAware,
  AbilityPluginBinding,
} from '@ohos/flutter_ohos';
import { common } from '@kit.AbilityKit';

export default class XxxPlugin implements FlutterPlugin, MethodCallHandler, AbilityAware {
  private context: common.UIAbilityContext | null = null;

  getUniqueClassName(): string {
    return "XxxPlugin";
  }

  // FlutterPlugin 生命周期
  onAttachedToEngine(binding: FlutterPluginBinding): void {
    // binding 上只有 getApplicationContext()、getBinaryMessenger() 等
    // 没有 getAbility()！
  }

  onDetachedFromEngine(binding: FlutterPluginBinding): void { }

  onMethodCall(call: MethodCall, result: MethodResult): void { /* ... */ }

  // AbilityAware 生命周期 — 在这里获取 UIAbility
  onAttachedToAbility(binding: AbilityPluginBinding): void {
    const ability = binding.getAbility();
    if (ability !== null && ability !== undefined) {
      this.context = ability.context as common.UIAbilityContext;
    }
  }

  onDetachedFromAbility(): void {
    this.context = null;
  }
}
```

> **注意**：不是所有插件都需要 `AbilityAware`。仅当插件需要 UIAbilityContext（如权限申请、跳转 Ability、窗口操作等）时才实现此接口。仅需 ApplicationContext（如文件读写、偏好设置等）的插件，直接用 `binding.getApplicationContext()` 即可。**但凡插件声明了 `user_grant` 权限（如 `CAMERA`、`READ_PASTEBOARD`、`ACCESS_BLUETOOTH` 等），就必须实现 `AbilityAware`** ——因为 `requestPermissionsFromUser()` 需要 `UIAbilityContext`。

### UIAbilityContext 依赖 API 清单

以下鸿蒙 API 需要 `UIAbilityContext` 作为参数。如果插件使用其中任何一个，**必须**实现 `AbilityAware` 接口：

| API / Kit | 方法签名 | 常见用途 |
|-----------|---------|---------|
| **Share Kit** (`@kit.ShareKit`) | `ShareController.show(context: UIAbilityContext, options)` | 系统分享面板 |
| **Ability 跳转** (`@kit.AbilityKit`) | `context.startAbility(want: Want)` | 启动其他应用、系统页面、设置页 |
| **Ability 跳转** | `context.startAbilityForResult(want: Want)` | 启动并等待返回结果 |
| **运行时权限** (`@kit.AbilityKit`) | `context.requestPermissionsFromUser(permissions)` | 动态权限申请 |
| **窗口操作** (`@kit.ArkUI`) | `window.getLastWindow(context: Context)` | 获取主窗口、状态栏、全屏 |
| **通知授权** (`@kit.NotificationKit`) | `notificationManager.requestEnableNotification(context)` | 通知权限 |
| **短信发送** (`@kit.TelephonyKit`) | 需要 UIAbilityContext 启动短信应用 | 跳转短信编辑页 |

> **判断方法**：在 `harmonyos-sdk-api-lookup` 查到的 API 签名中，如果第一个参数类型为 `common.UIAbilityContext` 或其父类 `common.Context`（且文档说明需要 Ability 级别 Context），则需要 `AbilityAware`。

### 外部可变状态能力

如果插件暴露系统/设备状态，且该状态可被应用外部改变（系统设置、控制中心、权限设置、硬件连接、系统服务、其他应用等），MethodChannel 实现不能只等 `stateChange`。必须提供能力级 `refreshCurrentState(reason)` 或等价方法：主动查询当前真实状态，并按 Dart 侧既有 method、Map key、enum index 推送状态。

至少在状态监听注册成功后、Flutter restart / engine reattach 后、`AbilityAware.onAttachedToAbility` / reattach 后、窗口重新获焦或应用回到前台后调用 `refreshCurrentState(reason)`。事件监听负责未来变化；刷新入口负责恢复时校准 Dart 缓存。

```ets
private refreshCurrentState(reason: string): void {
  const state = systemApi.getState();
  this.methodChannel?.invokeMethod('OnStateChanged', { 'state': this.convertState(state) });
}

onWindowFocusChanged(hasFocus: boolean): void {
  if (hasFocus) {
    this.refreshCurrentState('windowFocusChanged');
  }
}
```

### 参数提取

> **ArkTS 类型安全要求**：ArkTS 禁止将 `ESObject`（`call.argument` / `call.args` 的返回类型）直接用 `as` 强转为具体业务类型（如 `number`、`boolean`、`string`、`Array`）。直接写 `call.argument as number` 或 `call.argument("key") as number` 都会触发编译错误 `arkts-no-any-unknown`。**必须**先转为 `Object`，再转为目标类型。

> **关键：`call.args` 是 `Map<string, Object>`，不是 `Record`**：Flutter OHOS 的 MethodChannel 传递 Dart Map 参数时，ETS 端收到的是 `Map<string, Object>` 类型。**必须**用 `.get('key')` 读取值，**绝对禁止**用 `Record<string, Object>` 加 `args['key']` 方括号索引——Map 不支持方括号索引，`args['key']` 会静默返回 `undefined`，导致所有参数丢失。

```ets
// ❌ 错误：直接强转 ESObject → 具体类型（编译失败）
const mapType = call.argument("mapType") as number;

// ❌ 严重错误：用 Record 接收 args 并用方括号访问（运行时所有参数为 undefined）
const args = call.args as Record<string, Object>;  // 类型错误！实际是 Map
const msg = args['message'];                        // 永远是 undefined

// ✅ 正确：先转 Object，再转目标类型
const mapType = (call.argument("mapType") as Object) as number;
const enabled = (call.argument("enabled") as Object) as boolean;
const name = (call.argument("name") as Object) as string;

// ✅ 正确：Map 参数提取（唯一正确方式）
const args = call.args as Map<string, Object>;
const name = args.get("name") as string;
const count = args.get("count") as number;

// ✅ 正确：Dart 侧传 null 的参数，Map.get() 返回 undefined 而非 null
// 必须同时检查 null 和 undefined
const optionalPath = args.get("filePath");
if (optionalPath === null || optionalPath === undefined) {
  // filePath 未传或为 null
}
```

> **禁止模式汇总**：
> - `call.argument as number` / `call.argument("key") as number`：ESObject 直接强转，编译失败
> - `call.args as Record<string, Object>` + `args['key']`：**类型用错**，运行时参数全部丢失
> - 只检查 `=== null` 不检查 `=== undefined`：Dart null 经 Map.get() 可能为 undefined

> **Dart `int` 整数语义要求**：Dart API 类型为 `int`，或语义是整数存储、id、时间戳、文件大小、计数器、bit mask、rowId 等时，OHOS 端不得和 `double` 共用 `number` 链路。必须单独实现 int 提取、存储和返回链路，优先使用 `bigint` / int64 保真。只有明确证明取值不会超过安全小整数范围时，才允许降级为 `number`，并需要在实现说明中写明依据。

以下示例是 Pigeon/数组参数场景的核心写法；普通 MethodChannel 的 Map 参数不要照搬 `args[1]`，但必须保持同样的 int64/bigint 语义。

```ets
// ❌ 错误：setInt 和 setDouble 共用 number，可能丢失整数语义
const valueArg = args[1] as number;
api.setInt(keyArg, valueArg, optionsArg);
```

```ets
// ✅ 正确：setInt 入口按 int64/bigint 承接
const valueArg = BigInt(args[1] as bigint);
api.setInt(keyArg, valueArg, optionsArg);
```

```ets
// ✅ setInt/getInt 接口和实现都保持 bigint 语义，double 才使用 number
async setInt(key: string, value: bigint): Promise<void> {
  return this.put(key, value);
}

async getInt(key: string, options: SharedPreferencesPigeonOptions): Promise<bigint | null> {
  const value = await this.plugin.preferences.get(key, BigInt(0)) as ExtendedPreferenceValue;
  if (typeof value === 'bigint' || typeof value === 'number') {
    return BigInt(value);
  }

  return null;
}
```

编码前必须阅读 Dart 侧实际 `invokeMethod` 与结果解析代码；不要因为 ETS 端更方便，就擅自改 `wire shape`。例如 Dart 端若期待 `List<String>`、或固定的 `Map key`，ETS 端就必须按该格式返回；若确需改成 `List<Map>` 等新结构，必须同步修改 Dart OHOS 分支，不得只改一侧。

### 异步方法处理

```ets
onMethodCall(call: MethodCall, result: MethodResult): void {
  switch (call.method) {
    case "asyncMethod":
      this.handleAsyncMethod(call, result);
      break;
    default:
      result.notImplemented();
      break;
  }
}

private async handleAsyncMethod(call: MethodCall, result: MethodResult): Promise<void> {
  try {
    const data = await someAsyncOperation();
    result.success(data);
  } catch (err) {
    result.error("ERROR_CODE", (err as Error).message, null);
  }
}
```

### 混合模式（同时使用 MethodChannel + EventChannel）

部分 MethodChannel 插件同时含有 EventChannel（如网络状态插件：MethodChannel 控制 + EventChannel 推送），需同时实现 `MethodCallHandler` 和 `StreamHandler`：

```ets
import {
  FlutterPlugin,
  FlutterPluginBinding,
  MethodCall,
  MethodCallHandler,
  MethodChannel,
  MethodResult,
  EventChannel,
  EventSink,
  StreamHandler,
} from '@ohos/flutter_ohos';

export default class XxxPlugin implements FlutterPlugin, MethodCallHandler, StreamHandler {
  private methodChannel: MethodChannel | null = null;
  private eventChannel: EventChannel | null = null;
  private eventSink: EventSink | null = null;

  getUniqueClassName(): string {
    return "XxxPlugin";
  }

  onAttachedToEngine(binding: FlutterPluginBinding): void {
    this.methodChannel = new MethodChannel(binding.getBinaryMessenger(), "method_channel_name");
    this.methodChannel.setMethodCallHandler(this);

    this.eventChannel = new EventChannel(binding.getBinaryMessenger(), "event_channel_name");
    this.eventChannel.setStreamHandler(this);
  }

  onDetachedFromEngine(binding: FlutterPluginBinding): void {
    this.methodChannel?.setMethodCallHandler(null);
    this.methodChannel = null;
    this.eventChannel?.setStreamHandler(null);
    this.eventChannel = null;
    this.eventSink = null;
  }

  onMethodCall(call: MethodCall, result: MethodResult): void {
    // MethodChannel 方法处理
  }

  onListen(args: Object, events: EventSink): void {
    this.eventSink = events;
  }

  onCancel(args: Object): void {
    this.eventSink = null;
  }
}
```

### 返回复杂数据类型

```ets
// 返回 Map
const resultMap = new Map<string, Object>();
resultMap.set("status", "success");
resultMap.set("code", 200);
result.success(resultMap);

// 返回 List
const resultList: Array<Object> = [];
resultList.push("item1");
resultList.push(42);
result.success(resultList);

// 返回嵌套 Map（Dart 端收到 Map<String, dynamic>）
const outer = new Map<string, Object>();
const inner = new Map<string, Object>();
inner.set("lat", 39.9);
inner.set("lng", 116.3);
outer.set("location", inner);
result.success(outer);
```

返回值的顶层类型、列表元素类型、Map key、字符串拼接格式和空值语义必须与 Dart 侧现有解析保持一致。

### 返回值类型安全（重要）

> **ETS `result.success()` 类型必须与 Dart `invokeMethod<T>` 泛型严格匹配。**

| Dart 期望 | ETS 正确返回 | 常见错误 |
|----------|-------------|---------|
| `bool` | `true` / `false` | ❌ `'true'` / `1` |
| `String?` 空值 | `null` | ❌ `'null'` |
| `int` | `123` | ❌ `'123'` |

**编码前必须读取 Dart 侧 `invokeMethod` 调用，确认泛型或赋值类型推断。**

### Dart ↔ ETS 类型映射表

| Dart 类型 | ETS 类型 | 说明 |
|-----------|----------|------|
| `String` | `string` | |
| `int` | `bigint` / int64 优先；小范围整数才可用 `number` | 不默认等同于 `number`；整数存储、id、时间戳、文件大小、计数器、bit mask、rowId 等必须走独立整数链路 |
| `double` | `number` | |
| `bool` | `boolean` | |
| `List` | `Array<Object>` | |
| `Map` | `Map<string, Object>` | |
| `Uint8List` | `Uint8Array` | Dart 侧**禁止**对 `Uint8List` 调用 `.toList()` 再传入 Channel——`toList()` 产生 `List<int>`，编码为 INT32 数组，ETS 侧收到 `Array<number>` 而非 `Uint8Array`，丢失 `.buffer` 属性 |
| `null` | `null` | |

> **Dart 侧接收数值的类型安全**：上表中 `double → number` 是 Dart→ETS 方向。反方向（ETS→Dart）存在陷阱：ETS 的 `number` 经 `StandardMessageCodec` 编码后，Dart 侧收到的 `dynamic` 可能是 `int`（整数值）或 `double`（浮点值）。Dart null-safe 不允许 `int` 隐式转 `double`。
>
> **规则**：Dart 侧从 `invokeMethod` 返回的 `Map` / `List` 中提取数值字段，目标类型为 `double` 时**必须**用 `(value as num).toDouble()`，目标类型为 `int` 时用 `(value as num).toInt()`。`invokeMethod<double>` 直接返回顶层 `double` 时框架自动处理，但嵌套在 `Map`/`List` 内的值仍为 `dynamic`，必须手动转换。

> **Dart 侧二进制数据传输安全**：Dart 向 ETS 传递二进制数据时，**必须**保持 `Uint8List` 类型直接传入 Channel，**禁止**先调用 `.toList()` 转为 `List<int>`。`StandardMessageCodec` 对 `Uint8List` 编码为字节数组（type byte 72），ETS 侧解码为 `Uint8Array`（有 `.buffer` 属性）；但 `List<int>` 编码为 INT32 列表（type byte 12），ETS 侧解码为 `Array<number>`（无 `.buffer`），导致依赖 `ArrayBuffer` 的 API（如 `image.createImageSource`）崩溃。
>
> ```dart
> // ❌ 错误：toList() 将 Uint8List 转为 List<int>，破坏二进制编码
> channel.invokeMethod('copyImage', {'imageBytes': imageBytes.toList()});
>
> // ✅ 正确：直接传 Uint8List
> channel.invokeMethod('copyImage', {'imageBytes': imageBytes});
> ```
>
> ETS 侧如果无法确定收到的是 `Uint8Array` 还是 `Array<number>`（如需兼容旧 Dart 代码），应做防御性转换：
>
> ```ets
> // 防御性处理：兼容 Array<number> 和 Uint8Array
> let bytes: Uint8Array;
> if (rawData instanceof Uint8Array) {
>   bytes = rawData;
> } else if (Array.isArray(rawData)) {
>   bytes = new Uint8Array(rawData as number[]);
> }
> const buffer = bytes.buffer;
> ```

---

## 第三部分：常见编译错误与修复

### 1. `Cannot find module '@ohos.xxx'`

**原因**：导入了不存在的模块或模块名拼写错误。

**修复**：
- 确认模块名正确（检查 SDK `.d.ts` 文件）
- 部分 API 已迁移到 Kit 导入方式：`import { xxx } from '@kit.XxxKit'`
- 示例：`@ohos.net.http` → 可能需要 `import { http } from '@kit.NetworkKit'`

### 2. `Type 'xxx' is not assignable to type 'yyy'`

**原因**：ArkTS 严格类型检查，类型不匹配。

**修复**：
- 使用正确的类型断言：`call.argument("key") as string`
- Map 类型统一使用 `Map<string, Object>` 而非 `Record<string, any>`
- 可空类型需显式声明：`string | null`

### 3. `Property 'xxx' does not exist on type 'FlutterPluginBinding'`

**原因**：使用了不存在的 `FlutterPluginBinding` 方法。

**`FlutterPluginBinding` 上仅有以下方法**（无其他）：
- `getApplicationContext()` — 获取 ApplicationContext
- `getBinaryMessenger()` — 获取 BinaryMessenger
- `getFlutterAssets()` — 获取 FlutterAssets
- `getFlutterEngine()` — 获取 FlutterEngine
- `getTextureRegistry()` — 获取 TextureRegistry
- `getPlatformViewRegistry()` — 获取 PlatformViewRegistry

**`FlutterPluginBinding` 上没有 `getAbility()`！** 如需获取 UIAbility，必须实现 `AbilityAware` 接口，在 `onAttachedToAbility(binding: AbilityPluginBinding)` 中通过 `binding.getAbility()` 获取。详见上方「获取 Context」一节。

### 4. `An object literal cannot have multiple properties with the same name`

**原因**：ETS 对象字面量中有重复的 key。

**修复**：检查代码中是否有重复的属性定义。

### 5. `MethodResult` 调用错误

**原因**：`result.success()` / `result.error()` 参数不对。

**修复**：
- `result.success(value)` — value 可以是任意可序列化类型或 null
- `result.error(errorCode, errorMessage, errorDetails)` — 三个参数，errorDetails 可为 null
- `result.notImplemented()` — 无参数
- 每个 `onMethodCall` 分支必须调用 result 的某个方法，否则 Dart 端会一直等待

### 6. `'async' modifier cannot be used here`

**原因**：ArkTS 中 interface 方法签名不能直接声明 async。

**修复**：
- `onMethodCall` 方法本身不要声明为 async
- 异步逻辑提取到独立的 async 方法中调用：
```ets
onMethodCall(call: MethodCall, result: MethodResult): void {
  // 不要在这里用 async，委托给独立方法
  this.handleAsync(call, result);
}

private async handleAsync(call: MethodCall, result: MethodResult): Promise<void> {
  // 这里可以用 async/await
}
```

### 7. `Cannot find name 'xxx'` （未导入的鸿蒙 API）

**原因**：使用了鸿蒙 API 但未导入。

**修复**：每个 `@ohos.xxx` API 都需要显式 import：
```ets
import wifi from '@ohos.wifiManager';
import audio from '@ohos.multimedia.audio';
import camera from '@ohos.multimedia.camera';
```
