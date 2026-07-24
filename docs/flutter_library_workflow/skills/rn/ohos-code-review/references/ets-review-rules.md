# ETS/ArkTS 代码审查清单

本清单面向 React Native 模块鸿蒙适配场景。通用 ArkTS 语法约束由 `arkts-rules` Skill 覆盖，本文件聚焦适配代码的高频质量问题。

审查对象：`ohos/harmony/{short_name}/src/main/ets/` 下本阶段新增或修改的 `.ets` / `.ts` 文件（排除 `generated/` 目录）。

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

---

## 第二维度：假实现检测（P0）

### 假成功返回值

以下模式表示方法体未接入真实系统 API，只是用占位值冒充已实现：

| 假实现模式 | 规则 | 判定标准 |
|-----------|------|---------|
| TurboModule 方法返回空字符串 `''` | `cr-no-fake-empty-string` | 空字符串作为占位返回 |
| TurboModule 方法返回 `false` | `cr-no-fake-false` | 布尔 `false` 作为占位返回 |
| TurboModule 方法返回 `0` | `cr-no-fake-zero` | 数值 `0` 作为占位返回 |
| TurboModule 方法返回空对象 `{}` | `cr-no-fake-empty-obj` | 空对象作为占位返回 |
| TurboModule 方法返回空数组 `[]` | `cr-no-fake-empty-array` | 空数组作为占位返回 |
| 方法体只有 `hilog` + `return 占位值` | `cr-no-log-only-impl` | 无真实系统 API 或三方库 API 调用 |

检测方式：逐方法扫描 TurboModule 类的每个公开方法体，检查是否存在真实 API 调用。仅有 `hilog` 和 `return 占位值` 的视为假实现。对于 Fabric 组件，检查 `aboutToAppear` 中 Props 订阅回调是否只有空实现。

### not_implemented 一致性

| 违规模式 | 规则 | 优先级 |
|---------|------|--------|
| JSON 声明 `not_implemented` 但代码未 throw `Not implemented` | `cr-notimpl-returns-success` | P0 |
| JSON 声明 `implemented` 但代码 throw `Not implemented` | `cr-impl-returns-notimpl` | P0 |
| 方法抛出错误但未提供有意义的 error message | `cr-error-missing-info` | P1 |

---

## 第三维度：错误处理与异步（P1）

### 异步安全

| 检查项 | 规则 | 说明 |
|--------|------|------|
| `await` 调用未在 `try-catch` 内 | `cr-await-try-catch` | 所有 `await` 必须被 `try-catch` 包裹，或方法本身的调用方有 catch |
| `catch` 块为空或只有 `hilog` | `cr-catch-must-respond` | catch 中必须通过 Promise reject 或 throw 将错误传回 JS 层 |
| `Promise` 无 `await` 也无 `.catch()` | `cr-no-fire-and-forget` | 禁止 fire-and-forget，异步错误必须被捕获 |
| 异步回调中未检查组件生命周期 | `cr-async-lifecycle-check` | 回调执行时组件可能已 destroy，修改状态前须检查 |

检测方式：搜索 `async` 方法中的 `await` 调用，确认被 `try-catch` 包裹；搜索 `catch` 块确认包含 reject 或 throw

### 并发状态

| 检查项 | 规则 | 说明 |
|--------|------|------|
| 多个 async 方法共享状态变量无保护 | `cr-shared-state-guard` | 共享的可变状态需要序列化访问或加锁 |
| DeviceEventEmitter 回调与 TurboModule 方法竞态 | `cr-event-method-race` | 事件发射与 TurboModule 方法的状态修改可能并发 |

---

## 第四维度：资源管理与生命周期（P1）

### 资源释放对称性

TurboModule 中 `install()` 或构造函数中注册的资源，必须有对应的释放逻辑（通过 `cleanup` / `destroy` 或 RNInstance 的生命周期回调）：

| 注册操作 | 释放操作 | 规则 |
|---------|---------|------|
| `sensor.on(...)` / `emitter.on(...)` / 各类 Listener 注册 | 对应 `sensor.off(...)` / `emitter.off(...)` / unsubscribe | `cr-release-listener` |
| `setInterval` / `setTimeout` | `clearInterval` / `clearTimeout` | `cr-release-timer` |
| `geoLocationManager.on(...)` | `geoLocationManager.off(...)` | `cr-release-geo-listener` |
| `bluetoothManager` 各类注册 | 对应取消注册 | `cr-release-bt-listener` |
| `this.ctx.rnInstance.subscribeToLifecycleEvents(...)` | 对应 `unsubscribe` | `cr-release-lifecycle-sub` |

检测方式：
1. 在 TurboModule 的方法中提取所有注册操作
2. 检查是否存在对应释放逻辑（在 `destroy` 方法、`cleanUpCallbacks` 或生命周期回调中）
3. 报告不对称的注册/释放对

### Fabric 组件生命周期

| 检查项 | 规则 | 说明 |
|--------|------|------|
| `aboutToAppear` 中注册的订阅未在 `aboutToDisappear` 中清理 | `cr-fabric-cleanup` | 通过 `cleanUpCallbacks` 数组管理 |
| `subscribeToDescriptorChanges` 未取消 | `cr-fabric-descriptor-unsub` | 必须将取消订阅函数存入 cleanUpCallbacks |
| CommandReceiver 未在 `aboutToDisappear` 中注销 | `cr-fabric-command-cleanup` | 命令接收器必须清理 |

### 运行时权限完整性

| 检查项 | 规则 | 说明 |
|--------|------|------|
| `module.json5` 声明了 `user_grant` 权限，但代码中仅有 `verifyAccessToken` 无 `requestPermissionsFromUser` | `cr-perm-no-request` | `verifyAccessToken` 只检查状态，不弹窗申请，首次使用必拒 |
| `requestPermissionsFromUser` 需要 `UIAbilityContext`，但未正确获取 | `cr-perm-no-ability-context` | 必须通过 `this.ctx.uiAbilityContext` 获取 |
| `requestPermissionsFromUser` 的返回值未检查 `authResults` | `cr-perm-no-result-check` | 用户可能拒绝授权，必须处理拒绝场景 |

---

## 第五维度：日志规范（P2）

### hilog 使用规范

| 检查项 | 规则 | 说明 |
|--------|------|------|
| TAG 未使用模块名 | `cr-hilog-tag-plugin-name` | TAG 必须使用模块名（如 `'react-native-blue'`），禁止 `'test'` / `'debug'` / `'TAG'` |
| 打印敏感信息 | `cr-hilog-no-sensitive` | 禁止打印 token、password、密钥、用户 ID、完整文件内容 |
| TurboModule 方法入口无日志 | `cr-hilog-entry-log` | 每个 TurboModule 公开方法入口应有 `hilog.debug(...)` |
| 错误路径无日志 | `cr-hilog-error-log` | `catch` / throw 路径应有 `hilog.error(...)`，含错误码和消息 |
| 使用字符串拼接而非格式化 | `cr-hilog-format` | 使用 `%{public}s` / `%{public}d` 格式化，不用 `+` 拼接 |
| LOG_DOMAIN 或 LOG_TAG 未定义为模块级常量 | `cr-hilog-const` | `LOG_DOMAIN` 和 `LOG_TAG` 应定义为文件顶部的 `const` |

---

## 第六维度：安全编码（P1/P2）

### 数据安全（P1）

| 检查项 | 规则 | 说明 |
|--------|------|------|
| 返回未脱敏系统信息给 JS 层 | `cr-no-leak-system-info` | 禁止返回设备 ID、完整文件路径、系统版本等未脱敏数据 |
| 外部输入未校验直接使用 | `cr-validate-external-input` | 从 JS 层接收的参数使用前必须检查类型和范围 |
| 异常信息包含敏感数据 | `cr-no-sensitive-in-error` | throw 的 Error message 不应包含用户凭据、文件内容 |

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
| 文件名 | kebab-case 或下划线 | `cr-file-naming` | `xxx-turbo-module.ts`、`xxx_package.ets` |
| 类名、枚举名、命名空间名、构造器函数 | UpperCamelCase | `cr-class-naming` | 类 `MyTurboModule`、枚举 `UserType`、命名空间 `Base64Utils` |
| 方法名、变量名、参数名 | lowerCamelCase | `cr-method-naming` | 方法 `getDeviceInfo`、变量 `channelName`、参数 `filePath` |
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
> **修复方式**：将硬编码数值提取为文件级 UPPER_SNAKE_CASE 常量，原处改用常量引用。

### 结构约束

| 检查项 | 规则 | 阈值 |
|--------|------|------|
| 单文件行数过多 | `cr-file-length` | 不超过 500 行，超过建议拆分 |
| 单方法行数过多 | `cr-method-length` | 不超过 80 行 |
| 块语句嵌套过深 | `cr-nesting-depth` | 不超过 4 层 |
| 魔法值 | `cr-magic-value` | 与 G.NAM.06 联动——CodeArts 将硬编码数值视为"未命名常量"并归入 G.NAM.06 |

### 可访问性修饰符

| 检查项 | 规则 | 说明 |
|--------|------|------|
| 类字段和方法未显式声明修饰符 | `cr-access-modifier` | 应显式声明 `public` / `private` / `protected`，不依赖默认 public |
| 辅助方法未声明 private | `cr-access-modifier` | 不对外暴露的方法应声明为 `private` |

---

## 第八维度：CodeArts Check 合规（P0-P3）

本维度规则来源于华为 CodeArts Check 工具的 ArkTS 检查规则集（55 条），
覆盖表达式安全、声明规范、异常处理、安全合规、Web 组件安全、格式化等通用编码质量要求。

已被第一至第七维度覆盖的规则不重复列出。完整规则、说明与代码示例见：
`.claude/skills/ohos-code-review/references/codeart-check-rules.md`

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
| 禁止 MD5 算法 | `cr-no-md5` | `grep -i 'md5'` |
| 密钥硬编码 | `cr-no-key-hardcode` | `secret` / `api_key` / `private_key` |
| 日志打印密钥/私钥 | `cr-no-log-key` | hilog + 密钥变量 |

### P2 风险

| 检查项 | 规则 | 说明 |
|--------|------|------|
| 每行多个变量声明 | `cr-one-var-per-line` | 每条语句只声明一个变量 |
| 导出可变变量 | `cr-immutable-export` | `export let/var` 改为 `export const` |
| 使用 ESObject | `cr-no-esobject` | 非跨语言场景用 interface 替代 |
| 注释掉的代码未删除 | `cr-no-commented-code` | 直接删除废弃代码 |

### P3 建议

| 检查项 | 规则 |
|--------|------|
| 字符串用双引号 | `cr-single-quote` |
| 行宽超 120 字符 | `cr-line-width` |
| 条件/循环体缺大括号 | `cr-require-braces` |
| 类字段/方法缺可访问修饰符 | `cr-access-modifier` |
| 文件级常量/枚举值未全大写 | `cr-const-upper-snake` |

---

## 快速参考表：适配场景高频 P0 问题

| 问题 | 检测关键词 | 修复方向 |
|------|-----------|---------|
| `any` 类型滥用 | `grep 'any'` | 定义 `interface` 描述实际数据结构 |
| 假实现 | 方法体只有 hilog + return 占位值 | 接入真实 API 或标记 `throw new Error('Not implemented')` |
| catch 吞异常 | `grep 'catch'` + 检查块内容 | 补 reject / throw 将错误回传 JS 层 |
| 资源未释放 | 对比注册操作 vs 清理逻辑 | 补释放逻辑到 destroy / cleanUpCallbacks |
| 类型检查抑制 | `grep '@ts-ignore'` | 修复根本类型问题 |
| catch 标注类型 | `grep 'catch.*:'` | 改为 `catch (error) { const e = error as T }` |
| 对象解构 | `grep 'let {' / 'const {'` | 逐属性赋值 |
| == 替代 === | `grep '==[^=]'` | 改为 `===` / `!==` |
| JSON.parse 未捕获异常 | `grep 'JSON.parse'` 外无 try | 加 try-catch |
| TurboModule 方法参数用自定义 class | 接收 JS 对象用 class 类型 | 改为 `Record<string, Object>` |
