# ETS/ArkTS 代码审查清单（Android SDK → HAR 适配场景）

本清单面向 **Android SDK 鸿蒙化（HAR/ArkTS）** 适配场景。通用 ArkTS 语法约束由 `arkts-rules` Skill 覆盖，Java→ArkTS 迁移误区由 `android-sdk-to-arkts` Skill 覆盖，本文件聚焦迁移后 HAR 库代码的高频质量问题。

审查对象：`library/src/main/ets/` 下本阶段新增或修改的 `.ets` / `.ts` 文件（HAR 库代码）。HAR 交付物**不存在** Flutter MethodChannel / Dart 层，公开能力通过 `library/Index.ets` 导出的类 / 函数 / ArkUI 组件对外提供。

---

## 第一维度：ArkTS 适配高频违规（P0）

### 类型安全

| 违规模式 | 规则 | 替代方案 |
|---------|------|---------|
| 使用 `any` / `unknown` 表示业务数据 | `cr-no-any-business` | 定义 `interface` 或 `class`，明确字段和类型 |
| 使用 `{ x: number }` 结构对象类型 | `cr-no-obj-literal-type` | 定义 `interface` |
| 使用 `type T = { ... }` 定义对象结构 | `cr-no-type-obj-alias` | 使用 `interface T { ... }` |
| 使用 `string | number` 等任意联合类型 | `cr-no-arbitrary-union` | 仅允许 `T | null`、`T | undefined` 等空值联合 |
| 对象字面量未显式标注类型 | `cr-typed-obj-literal` | 声明时标注类型或通过上下文推断 |

检测方式：`grep -n 'any\|unknown' *.ets`，逐条确认是否为业务数据类型

### 禁止特性

| 违规模式 | 规则 | 说明 |
|---------|------|------|
| `@ts-ignore` / `@ts-nocheck` / `@ts-expect-error` | `cr-no-suppress-checks` | 类型检查不可关闭，必须修复根因 |
| 对象展开 `{...obj}` / 对象解构 `let {a} = obj` | `cr-no-dynamic-obj-ops` | ArkTS 对象布局编译时确定，逐属性赋值替代 |
| `delete obj.prop` | `cr-no-delete` | 设为 `null` 或重新设计数据结构 |
| `for (let k in obj)` | `cr-no-for-in` | 使用普通 `for` 循环或 `Map.forEach` |
| `Object.assign` / `Object.create` / `Object.defineProperty` | `cr-no-obj-dynamic-api` | 运行时不可变更对象布局 |
| `Function.bind` / `Function.call` / `Function.apply` | `cr-no-func-dynamic-call` | 重构代码逻辑，使用箭头函数 |
| `require()` / `eval()` / `globalThis` | `cr-no-dynamic-runtime` | 使用标准 `import` 语句 |

检测方式：`grep -n '@ts-ignore\|@ts-nocheck\|Object\.assign\|\.bind(\|\.call(\|\.apply(\|require(\|eval(' *.ets`

### Android / Java / Kotlin 残留（迁移后必须清零）

| 违规模式 | 规则 | 说明 |
|---------|------|------|
| `import android.* / androidx.* / java.* / javax.* / kotlin.*` | `cr-no-android-import` | 迁移后不得残留任何 Android-only 平台 import |
| 调用 `android.*` / `androidx.*` API 路径 | `cr-no-android-api` | 必须替换为 HarmonyOS 对应 API |
| 残留 `@Override` / Java 风格注解 | `cr-no-java-annotation` | ArkTS 不使用 Java 注解 |

检测方式：`grep -nE 'import\s+(android|androidx|java|javax|kotlin)\.' *.ets`

### 异常处理语法

| 违规模式 | 规则 | 正确写法 |
|---------|------|---------|
| `catch (e: BusinessError)` | `cr-catch-type-pattern` | `catch (error) { const e = error as BusinessError; }` |
| `throw 'error string'` | `cr-throw-error-class` | `throw new Error('message')` |

### 声明与初始化

| 违规模式 | 规则 | 说明 |
|---------|------|------|
| 类字段未初始化且未声明可空/可选 | `cr-field-init` | 必须初始化、声明为可空、声明为可选，或在构造函数中赋值 |
| `import` 不在文件顶部 | `cr-import-top` | 所有 `import` 必须位于文件最顶部，禁止在方法内动态 `import` |
| 使用 `var` 声明变量 | `cr-no-var` | 使用 `let` 或 `const` |
| 在 constructor 中声明字段 | `cr-no-ctor-field-decl` | 字段必须在 class 作用域内显式声明 |
| 模块顶层调用系统 API | `cr-top-level-syscall` | 惰性函数包裹；grep `= (curves\.\|vp2px\|px2vp\|animateTo)(` 且不在函数体/箭头函数内 |
| @Component 内 getter 未 try-catch 直接调用 HAR 方法，模板链式调用（`.toFixed()` 等） | `cr-getter-no-try-catch` | 改为带 try-catch 的方法，异常返回安全值，模板直接调用方法 |

---

## 第二维度：假实现检测（P0）

HAR 公开能力通过 `Index.ets` 导出的方法 / 类对外提供。以下模式表示方法体未接入真实系统 API 或三方库 API，只是用占位值冒充已实现：

| 假实现模式 | 规则 | 判定标准 |
|-----------|------|---------|
| 公开方法 `return ''` | `cr-no-fake-empty-string` | 空字符串作为占位返回 |
| 公开方法 `return false` | `cr-no-fake-false` | 布尔 `false` 作为占位返回 |
| 公开方法 `return 0` | `cr-no-fake-zero` | 数值 `0` 作为占位返回 |
| 公开方法 `return new Map()` / `{}` | `cr-no-fake-empty-map` | 空 Map / 空对象作为占位返回 |
| 公开方法 `return []` | `cr-no-fake-empty-array` | 空数组作为占位返回 |
| `Promise.resolve(占位值)` 无真实异步动作 | `cr-no-fake-promise` | Promise 直接 resolve 占位值，未调用真实 API |
| 方法体只有 `hilog` + `return 占位值` | `cr-no-log-only-impl` | 无真实系统 API 或三方库 API 调用 |

检测方式：从 `03-implementation-report.md` 和 `library/Index.ets` 提取对外导出的公开方法，逐方法检查方法体是否存在真实 API 调用。仅有 `hilog` 和占位返回值的视为假实现。

### explicitly_deferred / cut 一致性

| 违规模式 | 规则 | 优先级 |
|---------|------|--------|
| `03-implementation.json` 声明 `explicitly_deferred` / `cut` 但代码返回成功占位值 | `cr-deferred-returns-success` | P0 |
| `capability_implementation_trace` 标记已实现但代码为占位/空壳 | `cr-impl-is-stub` | P0 |
| 暂不可实现的能力代码路径未显式抛错/reject | `cr-cut-no-explicit-fail` | P1 |

> 暂不可实现的能力，代码路径必须显式 `throw new Error(...)` 或 `Promise.reject(...)`，或在宿主契约中声明限制；不得返回成功值伪装完成。

---

## 第三维度：错误处理与异步（P1）

### 异步安全

| 检查项 | 规则 | 说明 |
|--------|------|------|
| `await` 调用未在 `try-catch` 内 | `cr-await-try-catch` | 所有 `await` 必须被 `try-catch` 包裹，或方法本身的调用方有 catch |
| `catch` 块为空或只有 `hilog` | `cr-catch-must-respond` | catch 中必须 `throw` / `Promise.reject` / 触发错误回调，将错误透出给 HAR 调用方 |
| `Promise` 无 `await` 也无 `.catch()` | `cr-no-fire-and-forget` | 禁止 fire-and-forget，异步错误必须被捕获 |
| 异步回调中未检查组件生命周期 | `cr-async-lifecycle-check` | 回调执行时 ArkUI 组件可能已 `aboutToDisappear`，修改状态前须检查 |

检测方式：搜索 `async` 方法中的 `await` 调用，确认被 `try-catch` 包裹；搜索 `catch` 块确认错误被透出（throw / reject / 错误回调）。

### 并发状态

| 检查项 | 规则 | 说明 |
|--------|------|------|
| 多个 async 方法共享状态变量无保护 | `cr-shared-state-guard` | 共享的可变状态需要序列化访问或加锁 |
| 事件回调与公开方法竞态 | `cr-event-method-race` | 事件监听回调与公开方法的状态修改可能并发 |

---

## 第四维度：资源管理与生命周期（P1）

### 资源释放对称性

凡注册了监听 / 定时器 / 系统资源，必须有对应的取消 / 释放。HAR 没有 FlutterPlugin 引擎生命周期，对称释放主要发生在 ArkUI 组件生命周期、控制器/管理类的 `stop()`/`dispose()` 方法中：

| 注册操作 | 释放操作 | 规则 |
|---------|---------|------|
| `sensor.on(...)` / `emitter.on(...)` / 各类 Listener 注册 | 对应 `sensor.off(...)` / `emitter.off(...)` / unsubscribe | `cr-release-listener` |
| `setInterval` / `setTimeout` | `clearInterval` / `clearTimeout` | `cr-release-timer` |
| `geoLocationManager.on(...)` | `geoLocationManager.off(...)` | `cr-release-geo-listener` |
| `bluetooth` 各类注册 | 对应取消注册 | `cr-release-bt-listener` |
| `fs.open` / 媒体会话 / AudioCapturer 等系统资源创建 | 对应 `close` / `release` | `cr-release-syscall` |

检测方式：
1. 在 ArkUI 组件 `aboutToAppear` / 控制器 `start()` / 构造函数中提取所有注册、创建操作
2. 在 `aboutToDisappear` / 控制器 `stop()` / `dispose()` 中检查对应释放
3. 报告不对称的注册/释放对

### 控制器/管理类生命周期

| 检查项 | 规则 | 说明 |
|--------|------|------|
| 控制器封装了持续行为（定时器/动画/监听/轮询）但未提供 `stop()`/`reset()` | `cr-controller-no-stop` | 必须用 `start()`/`stop()`/`reset()` 封装资源管理 |
| 容器组件未在 `aboutToDisappear` 中调用控制器清理 | `cr-controller-no-cleanup` | 组件销毁时必须释放控制器持有的资源 |
| 控制器实现了清理但未从 `Index.ets` 导出 | `cr-controller-not-exported` | 控制器必须对外可达，否则宿主无法清理 |

### 宿主注入的 Context 生命周期

| 检查项 | 规则 | 说明 |
|--------|------|------|
| HAR 缓存宿主传入的 `UIAbilityContext` 后，宿主销毁仍继续使用 | `cr-stale-host-context` | context 失效后使用会崩溃，须置空或校验有效性 |
| 假设存在 Android `Application` / `Activity` / `Context` 单例语义 | `cr-no-android-ctx-singleton` | 需要宿主注入的对象必须通过对外 API 显式传入 |

### 运行时权限完整性

| 检查项 | 规则 | 说明 |
|--------|------|------|
| `module.json5` 声明了 `user_grant` 权限，但代码中仅有 `verifyAccessToken` 无 `requestPermissionsFromUser` | `cr-perm-no-request` | `verifyAccessToken` 只检查状态，不弹窗申请，首次使用必拒 |
| `requestPermissionsFromUser` 缺少有效 context（宿主未注入 `UIAbilityContext`） | `cr-perm-no-context` | `requestPermissionsFromUser` 需要 `UIAbilityContext`，HAR 须由宿主注入 |
| `requestPermissionsFromUser` 的返回值未检查 `authResults` | `cr-perm-no-result-check` | 用户可能拒绝授权，必须处理拒绝场景 |

检测方式：
1. 检查 `module.json5` 中声明的权限是否为 `user_grant` 类型
2. 在 ETS 代码中搜索 `verifyAccessToken` 和 `requestPermissionsFromUser`
3. 存在 `verifyAccessToken` 但无 `requestPermissionsFromUser` → 报 `cr-perm-no-request`

> ArkUI `@Component` 响应式数据流（`@Prop`/`@Watch` 闭环、`@State private` 偷存外部输入、命令式→响应式改造、动画链路）的完整审计由 `sub-adaptation-completeness-check` 第 9 项负责，本 Skill 不重复审；如本阶段变更涉及导出组件且未经完整性校验，可参照 `ohos-coding-guide` 的 `ui-coding-reactive-dataflow.md` 补查。

---

## 第五维度：日志规范（P2）

### hilog 使用规范

| 检查项 | 规则 | 说明 |
|--------|------|------|
| TAG 未使用 SDK 名 | `cr-hilog-tag-sdk-name` | TAG 必须使用 SDK 名（如 `'PushSDK'`），禁止 `'test'` / `'debug'` / `'TAG'` |
| 打印敏感信息 | `cr-hilog-no-sensitive` | 禁止打印 token、password、密钥、用户 ID、完整文件内容 |
| 公开方法入口无日志 | `cr-hilog-entry-log` | 每个公开 API 方法入口应有 `hilog.debug(...)` |
| 错误路径无日志 | `cr-hilog-error-log` | `catch` / 错误透出路径应有 `hilog.error(...)`，含错误码和消息 |
| 使用字符串拼接而非格式化 | `cr-hilog-format` | 使用 `%{public}s` / `%{public}d` 格式化，不用 `+` 拼接 |
| LOG_DOMAIN 或 LOG_TAG 未定义为模块级常量 | `cr-hilog-const` | `LOG_DOMAIN` 和 `LOG_TAG` 应定义为文件顶部的 `const` |

---

## 第六维度：安全编码（P1/P2）

### 数据安全（P1）

| 检查项 | 规则 | 说明 |
|--------|------|------|
| 公开方法返回值 / 错误信息泄露未脱敏系统信息 | `cr-no-leak-system-info` | 禁止返回设备 ID、完整文件路径、系统版本等未脱敏数据 |
| 外部输入未校验直接使用 | `cr-validate-external-input` | 公开 API 接收的参数使用前必须检查类型和范围 |
| 异常信息包含敏感数据 | `cr-no-sensitive-in-error` | `throw` / `reject` 的 message 不应包含用户凭据、文件内容 |

### 编码规范（P2）

| 检查项 | 规则 | 说明 |
|--------|------|------|
| 硬编码公网地址 | `cr-no-hardcode-url` | 公网地址不应硬编码在代码中 |
| 使用非安全随机数 | `cr-secure-random` | 安全场景必须使用密码学安全随机数 |
| 严格类型检查被关闭 | `cr-strict-typing` | 禁止通过注释或配置关闭类型检查 |

---

## 第七维度：命名与结构（P3）

> P3 级别问题不阻断流程，但审查时应修复。

### 命名规范

| 元素 | 风格 | 规则 | 示例 |
|------|------|------|------|
| 文件名 | kebab-case 或下划线 | `cr-file-naming` | `xxx-manager.ets`、`xxx_manager.ets` |
| 类名、枚举名、命名空间名、构造器函数 | UpperCamelCase | `cr-class-naming` | 类 `PushManager`、枚举 `UserType`、命名空间 `Base64Utils` |
| 方法名、变量名、参数名 | lowerCamelCase | `cr-method-naming` | 方法 `registerToken`、变量 `channelName`、参数 `filePath` |
| 常量、枚举值 | UPPER_SNAKE_CASE | `cr-const-naming` | 常量 `LOG_DOMAIN`、枚举值 `TEACHER = 0` |
| 布尔变量 | 带是非前缀，禁止否定命名 | `cr-bool-naming` | `isConnected`、`hasPermission`；禁止 `connected`、`permission`；禁止否定式 `isNotError`、`isNoFound`（改为 `isError`、`isFound`） |

检测方式：
```bash
# 常量未全大写（文件级 const 名含小写字母即为违规）
grep -nE '^const [a-zA-Z_]*[a-z]' *.ets
# 定位 enum 块（展开检查枚举值是否 UPPER_SNAKE_CASE）
grep -nE '^\s*enum\s+' *.ets
# 类名/枚举名未大驼峰
grep -n 'class [a-z]' *.ets
grep -n 'enum [a-z]' *.ets
# 否定布尔变量
grep -n 'isNot\|isNo[A-Z]\|hasNo[A-Z]' *.ets
```

> **G.NAM.06 的 CodeArts 实际检测范围**（远超"const 命名"）：
> CodeArts 将 G.NAM.06 应用于**所有未命名的硬编码字面量数值**，包括：
> - class 字段的数值初始值（如 `private sampleRate = 16000`、`private startTime = 0`）
> - 函数内 `const` 的字面量赋值（如 `const iOSFactor = 0.25`）
> - 比较 / 运算 / 参数 / 返回值 / 数组下标中的数值字面量（如 `* 1000`、`=== 0`、`>= 0`、`> 0`、`set('key', 0)`、`return 0`、`arr[0]`）
>
> **⚠️ 所有数值字面量均不可豁免**：CodeArts 不区分使用场景，以下**全部**会被标记：
> - `0`：`= 0`、`=== 0`、`>= 0`、`> 0`、`return 0`、`set('key', 0)`、**数组下标 `arr[0]`**、`new Int16Array(0)`
> - `1`：API 参数 `audioChannels: 1`、**hilog 三元参数 `granted ? 1 : 0`**（hilog 不豁免数值）、数组下标 `arr[1]`
> - 其他：运算系数 `20 *`、单位转换 `* 1000`、`audioBitrate: 32000` 等
>
> 必须按语义提取常量（如 `FIRST_INDEX = 0`、`INITIAL_DURATION = 0`、`MONO_CHANNEL = 1`），不得以"可读性"、"零值无语义"或"仅用于日志"为由跳过。hilog 数值参数（如 `granted ? 1 : 0`）可改用 `Number(granted)` 等无字面量写法。
>
> **修复方式**：将硬编码数值提取为文件级 UPPER_SNAKE_CASE 常量，原处改用常量引用。清单中的**每个**魔法值都必须定义常量并全文替换，不得以任何理由保留字面量。
>
> **枚举值检测**：grep 仅定位 enum 块位置，须阅读代码逐个检查块内的值名是否为 UPPER_SNAKE_CASE。

### 公开 API 导出契约（质量维度，P1/P3）

> 导出**存在性**（漏导出、导出名错误、文件不存在）由完整性校验负责；本节只审导出契约的**质量**。

| 检查项 | 规则 | 优先级 |
|--------|------|--------|
| `Index.ets` 重复 / 冲突导出，或导出了内部实现细节 | `cr-export-leak-internal` | P3 |
| 公开 ArkUI 组件的外部可配置属性用 `@State private` 偷存而非 `@Prop`/`@Link`/`@BuilderParam` | `cr-export-private-config` | P1 |
| 公开 ArkUI 组件的事件回调属性未声明为 `public` | `cr-export-callback-private` | P1 |
| library 内部文件 import `library/Index.ets` 总出口拿内部符号（放大初始化范围、易致循环） | `cr-no-barrel-internal-import` | P1 |

### 结构约束

| 检查项 | 规则 | 阈值 |
|--------|------|------|
| 单文件行数过多 | `cr-file-length` | 不超过 500 行，超过建议拆分 |
| 单方法行数过多 | `cr-method-length` | 不超过 80 行 |
| 块语句嵌套过深 | `cr-nesting-depth` | 不超过 4 层 |
| 魔法值 | `cr-magic-value` | 与 G.NAM.06 联动——CodeArts 将硬编码数值（含 `0`、`-1`、`-120`、`1000` 等）视为"未命名常量"并归入 G.NAM.06 |

### 可访问性修饰符

| 检查项 | 规则 | 说明 |
|--------|------|------|
| 类字段和方法未显式声明修饰符 | `cr-access-modifier` | 应显式声明 `public` / `private` / `protected`，不依赖默认 public |
| 辅助方法未声明 private | `cr-access-modifier` | 不对外暴露的方法应声明为 `private` |

```typescript
// 正确
class PushManager {
  private count: number = 0;
  public getCount(): number { return this.count; }
}

// 错误 — 缺少修饰符
class PushManager {
  count: number = 0;
  getCount(): number { return this.count; }
}
```

---

## 第八维度：CodeArts Check 合规（P0-P3）

本维度规则来源于华为 CodeArts Check 工具的 ArkTS 检查规则集（55 条），
覆盖表达式安全、声明规范、异常处理、安全合规、Web 组件安全、格式化等通用编码质量要求。

已被第一至第七维度覆盖的规则不重复列出。完整规则、说明与代码示例见：
`references/codeart-check-rules.md`

### P0 阻断

| 检查项 | 规则 | 检测关键词 |
|--------|------|-----------|
| onConnect 返回 null 导致 crash | `cr-onconnect-no-null` | `onConnect` 方法中 `return null` |

### P1 阻断

| 检查项 | 规则 | 检测关键词 |
|--------|------|-----------|
| 使用 == 而非 === | `cr-strict-equality` | `grep '==[^=]'`，排除 `== null` |
| 控制条件中赋值 | `cr-no-assign-in-condition` | `if (...=...) / while (...=...)` |
| NaN 直接比较 | `cr-use-isnan` | `== NaN` / `!= NaN` |
| 浮点直接相等比较 | `cr-no-float-equality` | 浮点变量 `===` 浮点变量 |
| `new Boolean/Array/Object` | `cr-literal-style` | `grep 'new Boolean\|new Array\|new Object'` |
| finally 中 return/break/throw | `cr-no-finally-control` | finally 块内控制流语句 |
| 使用 arguments 对象 | `cr-no-arguments` | `grep 'arguments'` |
| JSON.parse/stringify 未 try-catch | `cr-json-try-catch` | JSON.parse/stringify 外无 try |
| 文件流未关闭或未在 finally 中关闭 | `cr-file-stream-close` | `grep 'fs.open\|fs.openSync'`，确认 finally 中有 close |
| 数组非数字属性 | `cr-no-array-string-prop` | `arr['key']` 模式 |
| 禁止 MD5 算法 | `cr-no-md5` | `grep -i 'md5'` |
| RPC 用外部入参做身份校验 | `cr-rpc-no-external-auth` | rpc + 从 data 读 uid |
| onConnect 中做身份校验 | `cr-onconnect-no-auth` | onConnect + uid 判断 |
| 密钥硬编码 | `cr-no-key-hardcode` | `secret` / `api_key` / `private_key` |
| 日志打印密钥/私钥 | `cr-no-log-key` | hilog + 密钥变量 |
| Web mixedMode 设为 All（仅含 Web 组件时） | `cr-web-mixed-mode` | `mixedMode(MixedMode.All)` |
| Web fileAccess 未关闭（仅含 Web 组件时） | `cr-web-file-access` | `fileAccess(true)` 或未设置 |
| Web geolocationAccess 未关闭（仅含 Web 组件时） | `cr-web-geolocation` | `geolocationAccess(true)` 或未设置 |
| HTTP 正则校验缺 ^ 锚点 | `cr-url-regex-anchor` | `http(s)?:` 正则无 `^` |
| Web 存储敏感数据（仅含 Web 组件时） | `cr-web-sensitive-storage` | localStorage/sessionStorage + token/password |

### P2 风险（不阻断流程，写入 risk_items，应修复）

| 检查项 | 规则 | 说明 |
|--------|------|------|
| 每行多个变量声明 | `cr-one-var-per-line` | 每条语句只声明一个变量 |
| 导出可变变量 | `cr-immutable-export` | `export let/var` 改为 `export const` |
| 使用 ESObject | `cr-no-esobject` | 非跨语言场景用 interface 替代 |
| 数组遍历用 for 循环 | `cr-array-method-traversal` | 优先 Array 方法或 for...of |
| 属性用 [] 而非点号 | `cr-dot-notation` | 静态属性名用点号访问 |
| 注释掉的代码未删除 | `cr-no-commented-code` | 直接删除废弃代码 |
| return 语句不一致 | `cr-consistent-return` | 所有路径统一返回方式 |

### P3 建议（不阻断流程，但应修复）

| 检查项 | 规则 |
|--------|------|
| 用 `Array<T>` 而非 `T[]` | `cr-array-type-style` |
| 浮点数省略 0（`.5`/`2.`） | `cr-no-dangling-dot` |
| 字符串用双引号 | `cr-single-quote` |
| 行宽超 120 字符 | `cr-line-width` |
| 换行时运算符不在行末 | `cr-operator-at-eol` |
| 对象字面量 >4 属性未换行 | `cr-obj-literal-wrap` |
| else/catch 未与 } 同行 | `cr-else-catch-same-line` |
| 条件/循环体缺大括号 | `cr-require-braces` |
| 大括号未与语句同行 | `cr-brace-same-line` |
| switch case 缩进不规范 | `cr-switch-indent` |
| 关键字空格不规范 | `cr-keyword-spacing` |
| 类字段/方法缺可访问修饰符 | `cr-access-modifier` |
| 文件级常量/枚举值未全大写 | `cr-const-upper-snake` |

---

## 快速参考表：适配场景高频 P0 问题

| 问题 | 检测关键词 | 修复方向 |
|------|-----------|---------|
| `any` 类型滥用 | `grep 'any'` | 定义 `interface` 描述实际数据结构 |
| Android/Java 残留 import | `grep -E 'import\s+(android\|androidx\|java\|kotlin)\.'` | 替换为 HarmonyOS 对应 API |
| 假实现 | 扫描公开方法 `return ''` / `return false` / `Promise.resolve(占位)` | 接入真实 API 或显式 throw/reject |
| catch 吞异常 | `grep 'catch'` + 检查块内容 | 补 `throw` / `Promise.reject` 透出错误 |
| 资源未释放 | 对比 `aboutToAppear`/`start()` vs `aboutToDisappear`/`stop()` | 补释放逻辑 |
| 类型检查抑制 | `grep '@ts-ignore'` | 修复根本类型问题 |
| catch 标注类型 | `grep 'catch.*:'` | 改为 `catch (error) { const e = error as T }` |
| 对象解构 | `grep 'let {' / 'const {'` | 逐属性赋值 |
| onConnect 返回 null | `grep 'return null'` in onConnect | 返回有效 remoteObject |
| == 替代 === | `grep '==[^=]'` | 改为 `===` / `!==` |
| JSON.parse 未捕获异常 | `grep 'JSON.parse'` 外无 try | 加 try-catch |
