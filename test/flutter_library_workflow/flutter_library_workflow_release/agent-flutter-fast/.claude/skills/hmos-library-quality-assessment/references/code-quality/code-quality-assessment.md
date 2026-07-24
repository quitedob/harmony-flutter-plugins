# 代码质量评估指南（维度 B · B1）

> 三方库代码质量维度判据：ArkTS 规范与正确性、可读性与风格、复杂度与可维护性、错误处理与健壮性、性能、安全。每节列白盒判据；CodeLinter 命中另在独立报告节按级别+规则集汇总，不拆入各维度。
>
> **维度内分工**：本文档（B1）聚焦**通用 / 逻辑库**代码质量判据。**UI 库专项（B2）**——UI 渲染性能、UI 资源释放、跨设备适配实现、状态管理正确性、生命周期、无障碍/深色等实现细节，全部下沉到 [UI 代码质量评估](ui-code-quality-assessment.md)，本文档对 UI 部分仅一句话引用。

## 目录
- [§1 ArkTS 规范与正确性](#1-arkts-规范与正确性)
- [§2 可读性与风格](#2-可读性与风格)
- [§3 复杂度与可维护性](#3-复杂度与可维护性)
- [§4 错误处理与健壮性](#4-错误处理与健壮性)
- [§5 性能](#5-性能)
- [§6 安全](#6-安全)
- [评估清单](#评估清单)

---

## §1 ArkTS 规范与正确性

- **类型安全**：禁 `any`（`no-explicit-any`）、禁滥用非空断言 `!`（`no-non-null-assertion`）、优先可选链（`prefer-optional-chain`）。**库的公共 API 尤其不可导出 `any` 类型**——会污染所有消费方的类型推断。
- **Promise 正确性**：`no-floating-promises`（未处理的 Promise）、`no-misused-promises`、`await-thenable`、`require-await`。
- **null 安全**：可空参数/返回值的显式处理。
- **可编译性**：库须能通过 ArkTS 语法校验（debug/release 同套规则）；导出 API 不得引入宿主无法编译的类型。

```typescript
// ❌ Bad —— 导出面用 any，调用方失去类型保护
export function parse(x: any): any { return JSON.parse(x); }

// ✅ Good —— 明确入参/返回类型
export function parse(x: string): ParseResult { return JSON.parse(x) as ParseResult; }
```

## §2 可读性与风格

这些纯风格问题多为 🟢，**交给 linter**，人工不必逐条挑。白盒只标 linter 覆盖不到的**语义性命名**问题：导出 API 名词不达意、缩写晦涩、公共 API 缺必要注释（库面注释比应用更重要——消费方靠它理解契约）。

## §3 复杂度与可维护性

量化参考：单函数 < 50 行、单类 < 200 行、参数 < 4（超出用 options 对象）、嵌套 < 4 层。

```typescript
// ❌ Bad —— 100+ 行、多分支 switch 的导出函数，魔法数字遍地
export function handle(t: number, x: number) { switch (t) { /* 12 个 case … */ } }

// ✅ Good —— 策略表 + 小函数拆分，常量具名
const HANDLERS: Record<EventType, Handler> = { /* … */ };
export function handle(type: EventType, payload: Payload) { return HANDLERS[type](payload); }
```

关注：圈复杂度高、深嵌套、库内重复代码块（DRY）。

## §4 错误处理与健壮性

- **不吞异常**：空 catch、`catch` 后静默返回会让消费方无从排错。
- **不泄漏日志**：库内不应 `console`/高频打印调用方数据。
- **资源释放 / 内存泄漏（库尤其要管好自己的生命周期）**：定时器（`setInterval`）、订阅、事件监听、数据库游标、`AVPlayer`、Lottie 动画、传感器/GPS 是否成对释放；库是否对外提供 `dispose()`/`off()`/`stop()` 等释放接口让消费方回收。UI 组件视角的生命周期资源释放（`aboutToDisappear` 释放、`@Reusable` 回收、`@Watch`/`@Monitor` 死循环、组件↔handler 循环引用）详见 B2 [UI 代码质量 · 稳定性与资源释放](ui-code-quality-assessment.md#4-稳定性与资源释放stability--resource-release)。

```typescript
// ❌ Bad —— 库内起定时器但无释放 API，消费方无法回收 → 泄漏
class Poller { constructor() { setInterval(() => this.tick(), 1000); } }

// ✅ Good —— 暴露释放接口，成对清理
class Poller {
  private timer = -1;
  start() { this.timer = setInterval(() => this.tick(), 1000); }
  dispose() { if (this.timer !== -1) { clearInterval(this.timer); this.timer = -1; } }
}
```

## §5 性能

- **逻辑库**（本文档重点）：异步正确性；顶层避免重逻辑（影响懒加载）；循环内常量外提；避免不合理深拷贝。
- **UI 库渲染性能**（实现判据全部下沉 B2）：列表 `LazyForEach`/`Repeat` + 稳定 key + `cachedCount`、`@Reusable`、去冗余状态/容器、`transform` 动画、图片解码等 → 见 B2 [UI 代码质量 · 渲染性能](ui-code-quality-assessment.md#3-渲染性能rendering-performance)（含 ≥60fps / 启动 <2s / 内存 <100MB 目标）。

```typescript
// ❌ Bad —— 大列表用 ForEach + 动态值无稳定 key（全量重建、丢状态）
ForEach(this.list, (item: Item) => { ListItem() { /* … */ } }, (item: Item) => item.toString())

// ✅ Good —— LazyForEach 按需加载 + 稳定 id 作 key
LazyForEach(this.dataSource, (item: Item) => { ListItem() { /* … */ } }, (item: Item) => item.id)
```

## §6 安全

- **加密算法安全**（库若做加解密则重点）：无 AES-ECB、无 MD5/SHA1、无弱 RSA、无 3DES 等。**任一不安全加密命中 → 🔴**。
- **入参校验**：库对外入口对参数做防御（边界、类型、空值）。
- **敏感数据**：不硬编码密钥/令牌；不把敏感数据写日志。

```typescript
// ❌ Bad —— 默认弱算法
const c = cryptoFramework.createCipher('AES128|ECB|PKCS7'); // ECB 不安全
const md = cryptoFramework.createMd('MD5');                 // MD5 已不安全

// ✅ Good —— 现代算法
const c = cryptoFramework.createCipher('AES256|GCM|NoPadding');
const md = cryptoFramework.createMd('SHA256');
```

---

## 评估清单

### ArkTS 规范与正确性
- [ ] 无 `any`（含导出 API 不暴露 any）；无滥用非空断言
- [ ] Promise 正确处理（无 floating/misused promise）
- [ ] 可空值显式处理；库可通过 ArkTS 语法校验 / 编译

### 可读性与风格
- [ ] 命名清晰一致；通过 `@hw-stylistic`（行长/引号/缩进/大括号）
- [ ] 公共 API 含必要注释（说明契约）

### 复杂度与可维护性
- [ ] 函数 <50 行 / 类 <200 行 / 参数 <4 / 嵌套 <4 层
- [ ] 无明显重复代码块；无魔法数字

### 错误处理与健壮性
- [ ] 无空 catch / 异常吞没；库内不打印泄漏调用方信息的日志
- [ ] 定时器/订阅/监听/游标/媒体/传感器成对释放，提供 dispose/off 释放 API

### 性能
- [ ] UI 库：列表 `LazyForEach` + 稳定 key + `cachedCount`；复杂项 `@Reusable`；无冗余状态/容器
- [ ] 逻辑库：顶层无重逻辑、循环常量外提、无不合理深拷贝

### 安全
- [ ] 加密算法安全（无 AES-ECB/MD5/SHA1/弱 RSA/3DES）
- [ ] 对外入参做校验；无硬编码密钥；敏感数据不日志输出
