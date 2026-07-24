# CodeArts Check 规则集（适配场景增量）

> 来源：华为 CodeArts Check API（55 条 ArkTS 规则）。
> 本文件仅收录 `ets-review-rules.md` 尚未覆盖的增量规则。
> 已由 `cr-no-any-business`、`cr-no-for-in`、`cr-secure-random`、`cr-no-hardcode-url`、`cr-hilog-no-sensitive` 等规则覆盖的条目不重复收录。

审查对象：`ohos/src/main/ets/` 下本阶段新增或修改的 `.ets` / `.ts` 文件。

---

## 第一类：表达式安全（P1）

### cr-strict-equality — 使用 === 替代 ==

- **来源**：G.EXP.02 | CWE-1024 | 严重
- **说明**：`==` 会隐式类型转换，导致 `[] == false`、`3 == '03'` 为 true。必须使用 `===` / `!==`。
- **例外**：`obj == null` / `obj != null` 判空可使用 `==`。

```typescript
// 正确
if (age === 0) { ... }
if (value !== undefined) { ... }

// 错误
if (age == 0) { ... }
if (value != undefined) { ... }
```

检测方式：`grep -n '==[^=]' *.ets | grep -v '!=='`，排除 `== null` 场景。

---

### cr-no-assign-in-condition — 控制条件中禁止赋值

- **来源**：G.CTL.06 | CWE-1120 | 严重
- **说明**：`if`、`while`、`for`、`?:` 的条件表达式中不得执行赋值操作，极易与比较混淆。

```typescript
// 正确
const a = 2;
let x = a + a;

// 错误
let x = a + (a = 2);
if (result = getValue()) { ... }
```

---

### cr-use-isnan — 用 isNaN() 判断 NaN

- **来源**：G.TYP.02 | CWE-1024 | 严重
- **说明**：`NaN !== NaN` 为 true，直接比较永远无法正确判断。必须使用 `isNaN()` 或 `Number.isNaN()`。

```typescript
// 正确
if (isNaN(foo)) { ... }

// 错误
if (foo == NaN) { ... }
if (foo !== NaN) { ... }
```

---

### cr-no-float-equality — 浮点数禁止直接相等比较

- **来源**：G.TYP.03 | CWE-1077 | 严重
- **说明**：浮点精度问题导致 `0.1 + 0.2 === 0.3` 为 false。应在误差范围内比较。

```typescript
// 正确
const EPSILON = 1e-6;
if (Math.abs(num1 + num2 - sum) < EPSILON) { ... }

// 错误
if (0.1 + 0.2 === 0.3) { ... }
```

---

## 第二类：声明与初始化（P1/P2）

### cr-literal-style — 使用字面量声明

- **来源**：G.DCL.06 | CWE-665 | 严重 → P1
- **说明**：禁止 `new Boolean()`、`new Array()`、`new Object()`，使用字面量。`new Boolean(false)` 在 `if` 中恒为 true。

```typescript
// 正确
const isOk = false;
const arr: number[] = [1, 2, 3];
const obj: MyInterface = { age: 0 };

// 错误
const isOk = new Boolean(false); // if (isOk) 恒 true
const arr = new Array(x1, x2);
const obj = new Object();
```

检测方式：`grep -n 'new Boolean\|new Array\|new Object' *.ets`

---

### cr-one-var-per-line — 每行只声明一个变量

- **来源**：G.VAR.03 | CWE-1076 | 严重 → P2
- **说明**：每条语句只声明一个变量，便于调试和避免遗漏初始化。

```typescript
// 正确
let maxCount = 10;
let isCompleted = false;

// 错误
let maxCount = 10, isCompleted = false;
let pointX, pointY;
```

---

### cr-immutable-export — 导出变量须不可变

- **来源**：G.MOD.01 | CWE-1076 | 严重 → P2
- **说明**：`export let` / `export var` 导出的可变绑定会导致模块间副作用，必须使用 `export const` 或导出 getter 函数。

```typescript
// 正确
export const MAX_SIZE = 100;
export function getCount(): number { return count; }

// 错误
export let foo = 0;
```

---

### cr-no-arguments — 禁止使用 arguments

- **来源**：G.MET.10 | CWE-573 | 严重 → P1
- **说明**：ArkTS 不支持 `arguments` 对象，使用 rest 参数 `...args` 替代。

```typescript
// 正确
function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

// 错误
function sum() {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
}
```

---

## 第三类：异常处理（P1）

### cr-no-finally-control — finally 中禁止 return/break/continue/throw

- **来源**：G.ERR.03 | CWE-584 | 严重 → P1
- **说明**：finally 中的 return/break/continue/throw 会吞掉 try/catch 中的异常或覆盖返回值，导致隐蔽 bug。

```typescript
// 正确
function foo(): number {
  try {
    return 1;
  } catch (err) {
    return 2;
  } finally {
    hilog.info(DOMAIN, TAG, 'cleanup done');
  }
}

// 错误
function foo(): number {
  try {
    return 1;
  } finally {
    return 3; // 吞掉 try 的返回值
  }
}
```

---

### cr-json-try-catch — JSON.parse/stringify 必须 try-catch

- **来源**：CodeArts #18-19 | CWE-248 | 严重 → P1
- **说明**：`JSON.parse()` 解析外部入参（Channel 参数、Want 参数等）可能抛异常，必须 try-catch 捕获。`JSON.stringify()` 对含循环引用的对象也会抛异常。

```typescript
// 正确
try {
  let params = JSON.parse(args as string);
} catch (error) {
  hilog.error(DOMAIN, TAG, 'JSON parse failed: %{public}s', (error as Error).message);
  result.error('PARSE_ERROR', 'Invalid JSON input', null);
}

// 错误
let params = JSON.parse(args as string); // 外部输入格式不保证
```

检测方式：`grep -n 'JSON\.parse\|JSON\.stringify' *.ets`，确认外层有 try-catch。

---

## 第四类：资源管理（P1）

### cr-file-stream-close — 文件流必须关闭且在 finally 中关闭

- **来源**：CodeArts #24 | CWE-775 | 严重 → P1
- **说明**：通过 `fs.open` 打开的文件流必须调用 `fs.close` 关闭，且关闭操作必须放在 `finally` 块中，确保异常路径也能释放资源。

```typescript
// 正确
let file: fs.File | null = null;
try {
  file = fs.openSync(filePath, fs.OpenMode.READ_WRITE);
  // 读写操作
} catch (error) {
  hilog.error(DOMAIN, TAG, 'file op failed: %{public}s', (error as Error).message);
} finally {
  if (file !== null) {
    fs.closeSync(file);
  }
}

// 错误 — 文件未关闭
let file = fs.openSync(path, fs.OpenMode.READ_WRITE);
let content = fs.readSync(file.fd, buffer);
// 缺少 fs.close，文件句柄泄漏

// 错误 — 关闭不在 finally 中
try {
  let file = fs.openSync(path, fs.OpenMode.READ_WRITE);
  fs.closeSync(file); // 若前面抛异常则不会执行
} catch (error) {
  // file 未关闭
}
```

检测方式：`grep -n 'fs\.open\|fs\.openSync' *.ets`，确认对应 `fs.close`/`fs.closeSync` 在 `finally` 块中。

> 注：`cr-release-*` 系列规则覆盖 Channel/Listener/Timer 等引擎生命周期资源的对称释放，本规则专门覆盖文件 I/O 资源。

---

## 第五类：安全合规（P0/P1）

### cr-no-md5 — 禁止使用 MD5 算法

- **来源**：CodeArts #25 | CWE-327 | 严重 → P1
- **说明**：MD5 已被证明不安全，安全场景必须使用 SHA-256 或更强算法。

```typescript
// 正确
import { cryptoFramework } from '@kit.CryptoArchitectureKit';
let md = cryptoFramework.createMd('SHA256');

// 错误
let hash = CryptoJS.HmacMD5(message, secret);
```

检测方式：`grep -ni 'md5' *.ets`

---

### cr-rpc-no-external-auth — RPC 调用禁止用外部入参做身份校验

- **来源**：CodeArts #26 | CWE-287 | 严重 → P1
- **说明**：rpc 调用中判断调用者身份必须使用 `getCallingUid()` 等系统函数，不得使用外部传入的包名、uid。

```typescript
// 正确
const callingUid = rpc.IPCSkeleton.getCallingUid();
const bundleName = await bundleManager.getBundleNameByUid(callingUid);

// 错误 — uid 从 data 中读取，可被伪造
const callingUid = data.readInt();
```

---

### cr-onconnect-no-auth — onConnect 中禁止做身份校验

- **来源**：CodeArts #27 | CWE-639 | 严重 → P1
- **说明**：`ServiceExtensionAbility.onConnect` 中做调用方身份校验存在绕过风险。身份校验应在 `onRemoteMessageRequest` 中进行。

---

### cr-onconnect-no-null — onConnect 禁止返回 null

- **来源**：CodeArts #28 | CWE-573 | 严重 → P0
- **说明**：`ServiceExtensionAbility.onConnect` 返回 null 会导致客户端连接时服务端 crash（鸿蒙老版本必现）。

```typescript
// 正确
onConnect(want: Want): rpc.RemoteObject {
  return this.remoteObject;
}

// 错误
onConnect(want: Want): rpc.RemoteObject | null {
  return null; // crash
}
```

---

### cr-no-key-hardcode — 禁止密钥硬编码

- **来源**：CodeArts #29 | CWE-321 | 严重 → P1
- **说明**：`client_secret`、API Key、加密密钥等不得硬编码在源码中，应使用安全存储（如 HUKS）或配置文件。

检测方式：`grep -ni 'secret\|api_key\|apikey\|private_key\|client_secret' *.ets`，排除变量声明类型标注。

---

### cr-no-log-key — 禁止日志打印工作密钥和私钥

- **来源**：CodeArts #30-32 | CWE-532 | 严重 → P1
- **说明**：禁止在日志中明文打印工作密钥、私钥、设备 ID、JWS 认证信息等，必须脱敏处理。

```typescript
// 正确
hilog.info(DOMAIN, TAG, 'key: %{public}s', maskString(keyData));

// 错误
hilog.info(DOMAIN, TAG, 'key: %{public}s', keyPair.priKey.getEncoded().data.toString());
```

> 注：`cr-hilog-no-sensitive` 已覆盖通用敏感信息，本规则专指密钥/私钥场景，检测更具针对性。

---

## 第六类：Web 组件安全（P1）— 仅含 Web 组件时审查

> 触发条件：代码中检测到 `Web({` 或 `import web_webview` 时才启用本类审查。

### cr-web-mixed-mode — Web 组件 mixedMode 禁止设为 All

- **来源**：CodeArts #20 | CWE-687 | 严重 → P1
- **说明**：`mixedMode(MixedMode.All)` 允许 HTTPS 页面加载 HTTP 资源，存在中间人攻击风险，必须设为 `MixedMode.None`。

```typescript
// 正确
Web({ src: url, controller: ctrl }).mixedMode(MixedMode.None)

// 错误
Web({ src: url, controller: ctrl }).mixedMode(MixedMode.All)
```

---

### cr-web-file-access — Web 组件须显式关闭 fileAccess

- **来源**：CodeArts #21 | CWE-1188 | 严重 → P1
- **说明**：Web 组件默认开启文件系统访问，无使用场景时必须显式 `.fileAccess(false)`，防止任意文件读取。

```typescript
// 正确
Web({ src: url, controller: ctrl }).fileAccess(false)

// 错误 — 未设置或设为 true
Web({ src: url, controller: ctrl }).fileAccess(true)
```

---

### cr-web-geolocation — Web 组件须显式关闭 geolocationAccess

- **来源**：CodeArts #22 | CWE-1188 | 严重 → P1
- **说明**：Web 组件默认开启地理位置权限，无使用场景时必须显式 `.geolocationAccess(false)`。

---

### cr-url-regex-anchor — HTTP/HTTPS 正则校验须加 ^ 锚点

- **来源**：CodeArts #23 | CWE-625 | 严重 → P1
- **说明**：URL 协议正则若不以 `^` 开头，`javascript:alert(1)//https://x.com` 可绕过校验。

```typescript
// 正确
const reg = /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;

// 错误
const reg = /https?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
```

---

### cr-web-sensitive-storage — 禁止在 Web 存储中保存敏感数据

- **来源**：G.WSQ.01 / G.WST.01 | CWE-312 | 严重 → P1
- **说明**：`localStorage`、`sessionStorage`、Web SQL、IndexedDB 均无防 XSS 机制，禁止存储 token、密码等敏感数据。

---

## 第七类：类型与数组（P1/P2）

### cr-no-esobject — 禁止使用 ESObject

- **来源**：G.EXT.02 | CWE-1076 | 一般 → P2
- **说明**：`ESObject` 仅用于 ArkTS/TS/JS 跨语言调用场景，非跨语言场景使用会引入不必要的跨语言调用开销。应定义明确的 `interface` 替代。

```typescript
// 正确
import { getObject, I } from 'lib';
let obj: I = getObject(123);

// 错误
import { getObject } from 'lib';
let obj: ESObject = getObject(123);
```

检测方式：`grep -n 'ESObject' *.ets`

---

### cr-array-type-style — 用 T[] 表示数组类型

- **来源**：G.EXT.03 | CWE-1076 | 一般 → P3
- **说明**：ArkTS 中统一使用 `T[]` 而非 `Array<T>` 表示数组类型，提升可读性。

```typescript
// 正确
let x: number[] = [1, 2, 3];

// 错误
let x: Array<number> = [1, 2, 3];
```

---

### cr-no-array-string-prop — 数组禁止非数字属性

- **来源**：G.TYP.07 | CWE-573 | 严重 → P1
- **说明**：禁止在数组上定义或使用非数字属性（`length` 除外），需要键值对时使用 `Map` 或对象。

```typescript
// 正确
const map = new Map<string, string>();
map.set('key1', 'val1');

// 错误
const myHash: string[] = [];
myHash['key1'] = 'val1'; // length 仍为 0
```

---

### cr-array-method-traversal — 数组遍历优先用 Array 方法

- **来源**：G.TYP.08 | CWE-129 | 严重 → P2
- **说明**：数组遍历优先使用 `forEach()`、`map()`、`filter()`、`reduce()` 等 Array 方法，禁止使用 `for...in`（已由 `cr-no-for-in` 覆盖），建议用 `for...of` 或 Array 方法替代普通 `for` 循环。

```typescript
// 正确
const result: number[] = numbers.map(num => num + 1);

// 可接受
for (const num of numbers) { sum += num; }

// 不推荐
for (let i = 0; i < numbers.length; i++) { ... }
```

---

## 第八类：编码规范（P2/P3）

### cr-dot-notation — 用点号访问属性

- **来源**：G.OBJ.04 | CWE-1076 | 严重 → P2
- **说明**：静态已知属性名使用点号访问，仅动态计算属性名才使用 `[]`。

```typescript
// 正确
const name = obj.name;
const prop = obj[dynamicKey]; // key 是变量

// 错误
const name = obj['name'];
```

---

### cr-no-dangling-dot — 浮点数不省略小数点前后的 0

- **来源**：G.TYP.01 | CWE-1076 | 严重 → P3
- **说明**：`.5` 写为 `0.5`，`2.` 写为 `2.0`，避免与点操作符混淆。

```typescript
// 正确
const num = 0.5;
const num2 = 2.0;

// 错误
const num = .5;
const num2 = 2.;
```

---

### cr-no-commented-code — 删除注释代码

- **来源**：G.OTH.03 | CWE-546 | 严重 → P2
- **说明**：不用的代码段直接删除，不要注释掉。注释代码会干扰阅读和维护。

```typescript
// 正确 — 普通注释说明意图
// 此处跳过权限检查，因为 FlutterPlugin 框架已校验

// 错误 — 注释掉的代码
// const foo = msg => console.log(msg)
// if (oldBehavior) { doLegacy(); }
```

---

### cr-consistent-return — 一致的 return 语句

- **来源**：G.MET.07 | CWE-241 | 一般 → P2
- **说明**：函数所有代码路径必须以相同方式返回值。有路径显式返回值而其他路径不返回，通常是遗漏。

```typescript
// 正确
function check(condition: boolean): boolean {
  if (condition) {
    return true;
  }
  return false;
}

// 错误
function check(condition: boolean): boolean {
  if (condition) {
    return true;
  }
  // 隐式返回 undefined
}
```

---

### cr-const-upper-snake — 常量名、枚举值名全大写 + 魔法值消除

- **来源**：G.NAM.06 | CWE-1099 | 一般 → P3
- **说明**：CodeArts G.NAM.06 的实际检测范围**远超 `const` 命名**，它将所有硬编码数值字面量视为"未命名常量"并报告违规。覆盖以下场景：
  1. 文件级 `const` 名称不是 UPPER_SNAKE_CASE
  2. 枚举值名称不是 UPPER_SNAKE_CASE
  3. class 字段的硬编码数值初始值（如 `private sampleRate = 16000`）
  4. 函数内 `const` + 字面量数值赋值（如 `const iOSFactor = 0.25`）
  5. 比较 / 运算 / 参数中的硬编码数值（如 `* 1000`、`=== -120`、`>= 0`）
  6. `0`、`1`、`-1` 用作 sentinel 或条件比较值时**同样被标记**

> **⚠️ 所有数值字面量均不可豁免**：CodeArts 不区分使用场景。以下**全部**会被标记：
> - `0`：class 字段 `= 0`、比较 `=== 0` / `>= 0` / `> 0`、参数 `set('key', 0)` / `new Int16Array(0)`、重置 `this.xxx = 0`、返回值 `return 0`、**数组下标 `arr[0]`**
> - `1`：API 参数 `audioChannels: 1`、**hilog 三元参数 `granted ? 1 : 0`**（hilog 不豁免数值）、数组下标 `arr[1]`
> - 其他数值：运算系数 `20 *`、单位转换 `* 1000`、API 参数 `audioBitrate: 32000` 等
>
> 修复方式：按语义拆分定义多个常量（同一数值 `0` 可按语义分为 `INITIAL_TIMESTAMP`、`INITIAL_DURATION`、`MIN_VALID_FD`、`FIRST_INDEX` 等），不得以"可读性"或"仅用于日志"为由保留字面量。
>
> hilog 中的数值参数（如 `granted ? 1 : 0`）也必须消除字面量，可改用 `Number(granted)` 等无字面量写法。

```typescript
// 正确 — 全部数值提取为命名常量（含 0 和 1）
const LOG_DOMAIN: number = 0xFF00;
const DEFAULT_SAMPLE_RATE: number = 16000;
const MIN_POWER_DB: number = -120;
const INVALID_FD: number = -1;
const MS_PER_SECOND: number = 1000;
const DB_SCALE_FACTOR: number = 20;
const IOS_POWER_FACTOR: number = 0.25;
const MAX_SAMPLE_REF: number = 32768;
const INITIAL_TIMESTAMP: number = 0;
const INITIAL_DURATION: number = 0;
const MIN_VALID_FD: number = 0;
const FIRST_INDEX: number = 0;
const MONO_CHANNEL: number = 1;

private sampleRate: number = DEFAULT_SAMPLE_RATE;
private peakPower: number = MIN_POWER_DB;
private fileFd: number = INVALID_FD;
private recordingStartTime: number = INITIAL_TIMESTAMP;
private pausedDuration: number = INITIAL_DURATION;

// 函数内使用常量引用（注意 0、1 和数组下标也必须替换）
resultMap.set('duration', INITIAL_DURATION);
resultMap.set('duration', duration * MS_PER_SECOND);
if (this.fileFd >= MIN_VALID_FD) { ... }
if (this.recordingStartTime === INITIAL_TIMESTAMP) { return INITIAL_DURATION; }
this.peakPower = DB_SCALE_FACTOR * Math.log10(maxSample / maxRef) * factor;
const granted = requestResult.authResults[FIRST_INDEX] === ...;  // 数组下标
hilog.debug(DOMAIN, TAG, 'result=%{public}d', Number(granted));  // hilog 无字面量
audioChannels: MONO_CHANNEL,

// 错误 — 硬编码数值字面量（CodeArts 逐个标记，含 0、1、数组下标）
private sampleRate: number = 16000;           // 魔法数字
private recordingStartTime: number = 0;       // ← 0 也是魔法数字！
resultMap.set('duration', 0);                 // ← 参数中的 0
if (this.fileFd >= 0) { ... }                // ← 比较中的 0
return Math.floor(totalDuration / 1000);      // ← 运算中的 1000
this.peakPower = 20 * Math.log10(...);        // ← 运算系数 20
audioChannels: 1,                             // ← API 参数 1
requestResult.authResults[0]                  // ← 数组下标 0
hilog.debug(DOMAIN, TAG, '...%d', granted ? 1 : 0);  // ← hilog 数值参数
```

检测方式（定义点 + 高频遗漏用法点）：
```bash
# 文件级常量含小写字母
grep -nE '^const [a-zA-Z_]*[a-z]' {files}
# 定位 enum 块
grep -nE '^\s*enum\s+' {files}
# a) class 字段硬编码数值（发现魔法值来源）
grep -nE '^\s+(private|public|protected)\s+\w+.*=\s*-?[0-9]' {files}
# b) 函数内 const + 字面量数值（发现魔法值来源）
grep -nE '^\s+const\s+[a-z]\w*\s*=\s*-?[0-9]' {files}
# c) 三元表达式中的数值字面量（如 granted ? 1 : 0）
grep -nE '\?\s*[0-9]+\s*:' {files}
# d) 数组下标中的数值字面量（如 authResults[0]）
grep -nE '\[[0-9]+\]' {files}
# e) 十六进制字面量（如 hilog domain 0x0000）— 04-testing 阶段 example 脚手架常见
grep -nE '\b0x[0-9A-Fa-f]+' {files} | grep -v 'LOG_DOMAIN\|OpenMode\|import'
# f) 函数/方法参数中的独立数值（如 fontSize(50), margin top: 20）
grep -nE '\.\w+\(\s*[0-9]+\s*\)' {files} | grep -v 'import\|from\|Int16Array'
```

> a/b 扫定义点，c/d/e/f 扫高频遗漏的用法点（三元数值、数组下标、十六进制字面量、函数参数数值）。阅读代码时再找出赋值/运算/比较/参数/返回值中同一值的**所有**用法，全文替换为常量引用。**清单中的每个魔法值都必须修复，不得以任何理由保留字面量。** 详见 SKILL.md §4.1 第 6 组的修复流程。

---

### cr-single-quote — 字符串使用单引号

- **来源**：G.TYP.04 | CWE-1076 | 一般 → P3
- **说明**：ArkTS 约定字符串优先使用单引号。模板字符串使用反引号。

```typescript
// 正确
let msg = 'hello';
let tmpl = `hello ${name}`;

// 错误
let msg = "hello";
```

---

## 第九类：格式化规范（P3）

> 以下规则均为 P3 级别，不阻断流程，但审查时应修复。

### cr-line-width — 行宽不超过 120 字符

- **来源**：G.FMT.02 | CWE-1078
- **例外**：包含超长 URL 或命令的注释行可保持一行。

### cr-operator-at-eol — 换行时运算符放行末

- **来源**：G.FMT.03 | CWE-1078
- **说明**：表示「未结束，后续还有」。

```typescript
// 正确
if (userCount > MAX_USER_COUNT ||
  userCount < MIN_USER_COUNT) { ... }

// 错误
if (userCount > MAX_USER_COUNT
  || userCount < MIN_USER_COUNT) { ... }
```

### cr-obj-literal-wrap — 对象字面量属性超 4 个须换行

- **来源**：G.FMT.04 | CWE-1078

### cr-else-catch-same-line — else/catch 与 } 同行

- **来源**：G.FMT.06 | CWE-1078

```typescript
// 正确
if (isOk) {
  doThing();
} else {
  doOther();
}

// 错误
if (isOk) {
  doThing();
}
else {
  doOther();
}
```

### cr-require-braces — 条件/循环体须加大括号

- **来源**：G.FMT.09 / G.FMT.11 | CWE-1078

```typescript
// 正确
if (foo) {
  foo++;
}

// 错误
if (foo) foo++;
```

### cr-brace-same-line — 大括号与语句同行

- **来源**：G.FMT.10 | CWE-1078

### cr-switch-indent — switch 的 case/default 缩进一层

- **来源**：G.FMT.12 | CWE-1114

### cr-keyword-spacing — 关键字空格规范

- **来源**：G.FMT.13 | CWE-1114
- **说明**：`if (`、`for (`、`while (` 关键字后加空格；函数名与 `(` 之间不加空格；二元运算符两侧加空格。

---

## 快速参考：优先级映射总表

| 优先级 | 规则 | 是否阻断 |
|--------|------|---------|
| P0 | `cr-onconnect-no-null` | 阻断 |
| P1 | `cr-strict-equality`, `cr-no-assign-in-condition`, `cr-use-isnan`, `cr-no-float-equality`, `cr-literal-style`, `cr-no-arguments`, `cr-no-finally-control`, `cr-json-try-catch`, `cr-file-stream-close`, `cr-no-md5`, `cr-rpc-no-external-auth`, `cr-onconnect-no-auth`, `cr-no-key-hardcode`, `cr-no-log-key`, `cr-web-mixed-mode`, `cr-web-file-access`, `cr-web-geolocation`, `cr-url-regex-anchor`, `cr-web-sensitive-storage`, `cr-no-array-string-prop` | 阻断 |
| P2 | `cr-one-var-per-line`, `cr-immutable-export`, `cr-no-esobject`, `cr-array-method-traversal`, `cr-dot-notation`, `cr-no-commented-code`, `cr-consistent-return` | 不阻断，写入 risk_items，应修复 |
| P3 | `cr-const-upper-snake`, `cr-array-type-style`, `cr-no-dangling-dot`, `cr-single-quote`, `cr-line-width`, `cr-operator-at-eol`, `cr-obj-literal-wrap`, `cr-else-catch-same-line`, `cr-require-braces`, `cr-brace-same-line`, `cr-switch-indent`, `cr-keyword-spacing` | 不阻断流程，但应修复 |
