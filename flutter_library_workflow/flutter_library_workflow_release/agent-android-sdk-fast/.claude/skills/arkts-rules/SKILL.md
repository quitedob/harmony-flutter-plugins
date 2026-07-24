---
name: arkts-rules
description: |
  ArkTS (HarmonyOS) language rules and constraints for writing correct, compilable .ets code.
  ArkTS is based on TypeScript but removes most dynamic features for AOT compilation.
  TRIGGER when: writing or editing .ets files, generating ArkTS code, fixing ArkTS compilation errors,
  migrating TypeScript to ArkTS, or any HarmonyOS application development involving ArkTS code.
  Triggers on: ArkTS, HarmonyOS code, .ets file, ETS, arkts compilation error, HarmonyOS app development,
  write ArkTS, generate ETS code, fix ArkTS error, HarmonyOS component, ArkUI.
  Do NOT trigger for: pure TypeScript projects, general JavaScript questions, non-HarmonyOS mobile development.
---

# ArkTS 编程规则

ArkTS 是鸿蒙（HarmonyOS）的开发语言，基于 TypeScript 但**移除了大量动态特性**以支持 AOT 编译。源文件扩展名为 `.ets`，声明文件为 `.d.ts`。

> 核心原则：ArkTS = TypeScript - 动态特性 + 更严格的静态类型。生成代码时，**假设所有 TS 动态特性都不可用**。
>
> ArkTS 强制开启 `strictNullChecks`、`strictFunctionTypes`、`strictPropertyInitialization`、`noImplicitReturns`，不可关闭。

在编写或审查 ArkTS 代码时，严格遵循以下所有规则。违反任何一条都会导致编译失败。

### 高频编译错误速查

下列是适配实践中**最常触发的 10 种 ArkTS 编译错误**。编码 ETS 文件时主动避免这些模式，可减少 85% 的无效编译尝试。

| # | 错误规则 | 错误写法 | 正确写法 | 出现频次 |
|:-:|---------|---------|---------|:-------:|
| 1 | `arkts-no-untyped-obj-literals` | `let obj = { x: 1, y: 2 }` | 先声明 class/interface，再标注类型 `let obj: Point = { x: 1, y: 2 }` | **极高** |
| 2 | `arkts-no-any-unknown` | `let x: any = foo()` | 使用具体类型或 `Object` / `Record<string, Object>` | **高** |
| 3 | `arkts-no-ctor-prop-decls` | `constructor(private x: T)` | 类体声明字段 + 构造函数赋值 | 高 |
| 4 | `arkts-no-obj-literals-as-types` | `let obj: { x: number } = ...` | `interface Point { x: number }` → `let obj: Point = ...` | 高 |
| 5 | `arkts-no-props-by-index` | `obj['prop']` | `obj.prop` 点访问 | 中 |
| 6 | 不允许解构赋值 | `let { x, y } = obj` | `let x = obj.x; let y = obj.y` | 中 |
| 7 | 不允许 throw 非 Error | `throw 'error'` / `throw 4` | `throw new Error('error')` | 中 |
| 8 | catch 参数不可带类型 | `catch (e: BusinessError)` | `catch (e) { let err = e as BusinessError }` | 中 |
| 9 | Import 方向错误 | `.ts`/`.js` 文件 `import` `.ets` 文件 | `.ets` 可导入 `.ts`，反之不行。确保 `.ets` 不反向被 `.ts` 导入 | 中 |
| 10 | Null 类型不匹配 | `let x: string = null` | 可空类型必须显式声明 `let x: string \| null = null`；访问用 `?.` 或 `!` | 中 |

> 完整规则见下文各节。

---

## 一、类型系统

### 禁止的类型特性

| 禁止 | 替代写法 |
|------|---------|
| `any` / `unknown` | 使用具体类型，灵活场景用 `Object` 或 `Record<string, Object>` |
| 结构化类型（鸭子类型） | 必须通过 `extends` 或 `implements` 建立类型关系 |
| 交叉类型 `A & B` | `interface C extends A, B {}` |
| 条件类型 `T extends X ? Y : Z` | 用泛型约束 `T extends X` 或函数重载 |
| 映射类型 `{ [P in keyof T]: X }` | `Record<keyof T, X>` |
| 索引签名 `{ [key: string]: T }` | `Record<string, T>` |
| 索引访问类型 `Type['prop']` | 直接写出具体类型 |
| `typeof x` 作为类型 | 写出 x 的实际类型名 |
| `as const` 断言 | 用显式类型注解 |
| `this` 作为类型 | 使用具体类名 |
| 类型守卫 `arg is Foo` | `instanceof` + `as` 类型转换 |
| `@ts-ignore` / `@ts-nocheck` / `@ts-expect-error` | 禁止使用，必须修复类型错误本身 |
| `type` 别名定义对象类型 `type T = { x: number }` | `interface T { x: number }` （`type` 仅可用于函数类型别名） |
| 任意联合类型 `string \| number` | 仅允许 `T \| null`、`T \| undefined`、`T \| null \| undefined`；其他场景用函数重载或公共父类/接口 |

### 限制的工具类型

仅支持 `Partial<T>`、`Required<T>`、`Readonly<T>`、`Record<K,V>`。禁止 Pick、Omit、Exclude、Extract 等其他工具类型。其中 `Partial<T>` 的泛型参数 T 必须为 class 或 interface 类型。

### 类型转换

```typescript
// 禁止：尖括号语法
let c = <Circle>shape;

// 正确：as 语法（注意：错误的类型转换会在运行时抛出 ClassCastException，与 TS 不同）
let c = shape as Circle;
```

### 泛型

```typescript
// 禁止：依赖返回类型推断泛型参数
let z = greet();

// 正确：显式提供泛型参数
let z = greet<string>();
```

---

## 二、类与对象

### 字段必须初始化

```typescript
// 错误
class Person {
  name: string;  // 编译错误：未初始化
}

// 正确：声明时初始化
class Person {
  name: string = '';
}

// 正确：构造函数中初始化
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// 正确：可选属性
class Person {
  name?: string;  // 类型为 string | undefined
}

// 正确：确定赋值断言（仅类属性，如装饰器场景；变量声明中禁止）
class Person {
  name!: string;  // 承诺会在使用前赋值，如通过 @State 等装饰器
}
```

### 禁止的类特性

| 禁止 | 替代写法 |
|------|---------|
| 构造器参数属性 `constructor(private x: T)` | 在类体中声明字段，构造函数中赋值 |
| `#privateField` 私有字段语法 | `private field` |
| 类表达式 `const C = class { }` | `class C { }` 声明 |
| 运行时修改方法 `obj.foo = bar` | 继承重写，或用箭头函数属性 |
| `delete obj.prop` | 设为 `null`（属性类型需含 `null`） |
| 原型赋值 | 不支持 |
| 多个 static 块 | 只允许一个 |
| `implements` 一个类 | 只能 `implements` 接口 |
| 接口继承类 | 接口只能 `extends` 接口 |
| 声明合并（class/interface/enum） | 不支持，类型名/变量名/函数名必须全局唯一 |
| 接口中同名方法冲突 | 接口不能继承两个有同名方法的接口 |
| 类作为值传递 `let c = MyClass` | 不支持，class 只是类型声明，不能赋值给变量或传参；用工厂函数替代 |

### 对象字面量必须有类型上下文

```typescript
// 错误：无类型注解
let obj = { x: 1, y: 2 };

// 错误：类型注解为 object 字面量
let obj: { x: number, y: number } = { x: 1, y: 2 };

// 正确：声明 class 或 interface
class Point {
  x: number = 0;
  y: number = 0;
}
let obj: Point = { x: 1, y: 2 };
```

**对象字面量限制：**
- 不能用于初始化含自定义构造函数的类
- 不能用于初始化含 `readonly` 字段的类
- 不能用于初始化含方法（非箭头函数属性）的类
- 属性名必须是合法标识符（不能用引号括起），但 `Record` 类型的键必须用引号
- `export default { ... }` 匿名对象被禁止，需封装为类

### 接口限制

接口是纯抽象的：无方法实现、无静态成员、无静态代码块、无构造函数。

### 枚举限制

- 不支持 `const enum`
- 枚举成员初始化值必须类型一致（不能混合 number 和 string）
- 不能用运行时计算表达式初始化（如 `A = someFunc()`）

---

## 三、函数

### 禁止的函数特性

| 禁止 | 替代写法 |
|------|---------|
| `function` 表达式 `let f = function() {}` | 箭头函数 `let f = () => {}` |
| 嵌套函数声明 `function outer() { function inner() {} }` | `let inner = () => {}` |
| generator 函数 `function*` | `async/await` |
| 参数解构 `function f({x, y})` | 展开为独立参数 |
| 调用签名 `interface { (x: T): R }` | 类型别名 `type F = (x: T) => R` |
| 构造签名 `new (x: T) => R` | 工厂函数 `() => R` |
| `.apply()` / `.call()` | 直接调用或展开参数 |
| `.bind(this)` | 箭头函数 `() => this.foo()` |
| 函数上定义属性 | 不支持 |

### this 的限制

```typescript
// 错误：独立函数中的 this
function foo() { this.x = 1; }

// 错误：静态方法中的 this
class A { static f() { this.x = 1; } }

// 正确：仅在实例方法中使用 this
class A {
  x: number = 0;
  f() { this.x = 1; }  // OK
}
```

### 返回类型

当 return 语句调用另一个未标注返回类型的函数时，必须显式标注当前函数的返回类型。

---

## 四、变量与表达式

### 禁止的表达式特性

| 禁止 | 替代写法 |
|------|---------|
| `var` | `let` 或 `const` |
| 解构声明 `let {x, y} = obj` | `let tmp = obj; let x = tmp.x; let y = tmp.y;` |
| 解构赋值 `[a, b] = [b, a]` | 使用临时变量交换 |
| `for...in` | `for...of` 或索引 `for` 循环，配合 `Object.entries()` |
| `in` 操作符 `'x' in obj` | `instanceof` 或 `Object.keys()` 检查 |
| 对象展开 `{...obj}` | 手动逐属性拷贝 |
| 隐式类型转换 `+'5'` / `-'3'` | `Number.parseFloat('5')` / `Number.parseInt('3')` |
| `throw 'error'` / `throw 4` | `throw new Error('error')` |
| 逗号运算符（`for` 循环外） | 拆分为独立语句 |
| `Symbol()`（`Symbol.iterator` 除外） | 不支持 |
| `with` 语句 | 不支持 |
| `new.target` | 不支持 |
| `globalThis` | import/export 共享，或单例模式 |
| `eval()` | 不支持 |
| `obj['prop']` 索引访问 | `obj.prop` 点访问 |

### Null 安全

```typescript
// 错误：非空类型赋 null
let x: number = null;

// 正确：联合类型
let x: number | null = null;

// 正确：可选链访问
let len = str?.length;

// 正确：非空断言（确信非空时）
let len = str!.length;
```

### catch 语句

```typescript
// 错误：catch 参数带类型
try { } catch (e: BusinessError) { }

// 正确：无类型 + as 转换
try { } catch (error) {
  let e: BusinessError = error as BusinessError;
}
```

### 展开运算符

仅限于数组/TypedArray，且只用于：rest 参数、数组字面量中复制数组。**不能展开对象。**

---

## 五、模块

| 禁止 | 替代写法 |
|------|---------|
| `require('mod')` | `import * as m from 'mod'` |
| `export = X` | `export default X` 或命名导出 |
| `declare module 'x'` 环境声明 | 不支持 |
| 模块名通配符 | 不支持 |
| UMD | 不支持 |
| import 断言 | 不支持 |
| `.ts`/`.js` 文件导入 `.ets` | 不允许，`.ets` 可导入 `.ts` |
| import 语句不在文件顶部 | 所有 import 必须在最前面 |
| `import *` 导入整个 Kit | 使用命名导入减少包体积 |
| `import type { A } from '...'` | 直接用 `import { A } from '...'` |
| 副作用导入 `import 'module'` | 不支持，改用动态 `import()` |
| 命名空间中写非声明语句 | 将执行语句包装到函数中 |

### Kit 导入风格

```typescript
// 推荐：Kit 方式
import { UIAbility } from '@kit.AbilityKit';

// 兼容：旧式导入
import UIAbility from '@ohos.app.ability.UIAbility';
```

### 动态导入

```typescript
// 注意：ESObject 仅用于 JS/TS 互操作场景，其他场景禁止使用
import('./Calc').then((obj: ESObject) => {
  console.info(obj.add(3, 5));
});
```

---

## 六、标准库限制

**禁止使用的 API：**
- `eval()`
- `Object.assign`、`Object.create`、`Object.defineProperty`、`Object.freeze`、`Object.fromEntries`、`Object.getPrototypeOf`、`Object.setPrototypeOf` 等 Object 静态方法（`Object.keys()`、`Object.values()`、`Object.entries()` 允许使用）
- 大部分 `Reflect` 方法
- 所有 `Proxy` handler 方法
- `Function.apply`、`Function.call`、`Function.bind`
- 正则字面量 `/pattern/flags` → 用 `new RegExp('pattern', 'flags')`

---

## 七、编码风格要求

### 命名
- 类名/枚举名/命名空间名：`UpperCamelCase`
- 变量名/方法名/参数名：`lowerCamelCase`
- 常量/枚举值：`UPPER_SNAKE_CASE`
- 布尔变量加 `is`/`has`/`can`/`should` 前缀，避免否定命名

### 格式
- 缩进：2 空格（换行缩进 4 空格），禁止 tab
- 行宽：不超过 120 字符
- 字符串：使用单引号
- 数组类型：用 `T[]` 而非 `Array<T>`
- 浮点数：小数点前后都写 `0`（`0.5` 非 `.5`）
- 每行只声明一个变量
- `if`/`for`/`while` 始终使用大括号
- `else`/`catch` 与 `}` 同行
- 对象字面量属性超过 4 个时每个属性换行

---

## 八、高性能实践

- 用 `const` 声明不变量
- 避免 number 整型/浮点型混用
- 数值计算避免溢出 INT32 范围
- 循环中提取不变量到循环外
- 用参数传递替代闭包捕获
- 避免可选参数，用默认参数值替代
- 数值数组用 `TypedArray`（如 `Int8Array`、`Float32Array`）
- 避免稀疏数组和联合类型数组
- 避免频繁抛异常，用返回值表示错误
- 避免使用 `ESObject`（仅用于 TS/JS 互操作）
- 数组遍历优先用 `map`/`filter`/`forEach` 等方法

---

## 九、常见替代模式速查

```
TS 写法                              → ArkTS 替代
─────────────────────────────────────────────────────────
any / unknown                        → 具体类型 或 Object
var x                                → let x
obj['prop']                          → obj.prop
{ x: 1 } (无类型字面量)               → 声明 class/interface 后标注类型
type T = { x: number }               → interface T { x: number }
A & B                                → interface C extends A, B {}
let f = function() {}                → let f = () => {}
function outer() { function inner(){} } → let inner = () => {}
for (let k in obj)                   → for (let e of Object.entries(obj))
let {x, y} = obj                     → let x = obj.x; let y = obj.y;
[a, b] = [b, a]                      → let tmp = a; a = b; b = tmp;
delete obj.prop                      → obj.prop = null
arg is Foo                           → arg instanceof Foo + as Foo
require('mod')                       → import ... from 'mod'
<Type>value                          → value as Type
throw 'error'                        → throw new Error('error')
constructor(private x: T)            → 字段声明在类体 + 构造函数赋值
{...obj} 展开对象                     → 手动拷贝属性
/regex/g                             → new RegExp('regex', 'g')
+'5' (隐式转换)                       → Number.parseFloat('5')
catch (e: Error)                     → catch (e) { let err = e as Error; }
globalThis.x                         → 单例类模式 或 import/export
obj.method.bind(this)                → () => this.method()
@ts-ignore / @ts-nocheck             → 禁止，必须修复类型错误
string | number (任意联合)            → 函数重载 或 公共父类/接口
import type { A }                    → import { A }
import 'module' (副作用导入)          → 动态 import()
let c = MyClass (类作为值)            → 工厂函数
```

---

## 十、全局 Singleton 模式（替代 globalThis）

```typescript
export class GlobalContext {
  private constructor() {}
  private static instance: GlobalContext;
  private _objects = new Map<string, Object>();

  public static getContext(): GlobalContext {
    if (!GlobalContext.instance) {
      GlobalContext.instance = new GlobalContext();
    }
    return GlobalContext.instance;
  }

  public getObject(value: string): Object | undefined {
    return this._objects.get(value);
  }

  public setObject(key: string, objectClass: Object): void {
    this._objects.set(key, objectClass);
  }
}
```
