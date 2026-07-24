# 通用架构评审（维度 A · A1）

> 通用架构评审知识：SOLID、耦合/内聚、反模式、分层依赖、设计模式、可扩展性、代码结构。**语言无关**，适用于三方库的模块与 API 架构评审（移植自 code-review-skill 并适配三方库视角）。
>
> 本指南提供三方库架构评审的**通用架构原则**与判据：SOLID、耦合内聚、反模式、分层依赖方向（语言无关）。

## 目录
- [SOLID 原则检查清单](#solid-原则检查清单)
- [架构反模式识别](#架构反模式识别)
- [耦合度与内聚性评估](#耦合度与内聚性评估)
- [分层与依赖方向](#分层与依赖方向)
- [设计模式使用评估](#设计模式使用评估)
- [可扩展性评估](#可扩展性评估)
- [代码结构最佳实践](#代码结构最佳实践)
- [快速参考清单](#快速参考清单)

---

## SOLID 原则检查清单

> 三方库视角：SOLID 直接决定库的 **API 质量与可维护性**——SRP 让模块聚焦、ISP 让公共接口最小、DIP 让库可被宿主测试与替换、OCP 让库易扩展。

### S - 单一职责原则 (SRP)
**检查要点：** 类/模块是否只有一个改变的理由？方法是否服务于同一目的？能否一句话说清职责？
```
⚠️ 类名包含 "And"、"Manager"、"Handler"、"Processor" 等泛化词汇
⚠️ 一个类超过 200-300 行代码
⚠️ 类有超过 5-7 个公共方法
⚠️ 不同方法操作完全不同的数据
```
**审查问题：** "这个类负责哪些事情？能否拆分？" / "如果 X 需求变化要改哪些方法？Y 需求呢？"

### O - 开闭原则 (OCP)
**检查要点：** 加新功能是否要改现有代码？能否通过扩展（继承/组合）添加新行为？是否大量 if/else 或 switch 处理类型？
```
⚠️ switch/if-else 链处理不同类型
⚠️ 添加新功能需要修改核心类
⚠️ 类型检查 (instanceof, typeof) 散布在代码中
```

### L - 里氏替换原则 (LSP)
**检查要点：** 子类能否完全替代父类？是否改变父类预期行为？是否抛父类未声明的异常？
```
⚠️ 显式类型转换 (casting)
⚠️ 子类方法抛出 NotImplementedException 或空实现
⚠️ 使用基类处需要检查具体类型
```

### I - 接口隔离原则 (ISP)
**检查要点（库公共面尤其重要）：** 接口是否足够小且专注？实现类是否被迫实现不需要的方法？客户端是否依赖了它不用的方法？
```
⚠️ 接口超过 5-7 个方法
⚠️ 实现类有空方法或抛出 NotImplementedException
⚠️ 接口名称过于宽泛 (IManager, IService)
⚠️ 不同客户端只使用接口的部分方法
```
**审查问题：** "接口的所有方法是否都被每个实现类使用？" / "能否拆分为更小的专用接口？"

### D - 依赖倒置原则 (DIP)
**检查要点（关系到库的可测试性）：** 高层模块是否依赖抽象而非具体实现？是否用依赖注入而非直接 new？抽象是否由高层定义？
```
⚠️ 高层模块直接 new 低层模块的具体类
⚠️ 导入具体实现类而非接口/抽象类
⚠️ 配置和连接字符串硬编码在业务逻辑中
⚠️ 难以为某个类编写单元测试
```
**审查问题：** "这个类的依赖能否在测试时被 mock 替换？" / "更换底层实现要改多少地方？"

---

## 架构反模式识别

### 致命反模式
| 反模式 | 识别信号 | 影响 |
|--------|----------|------|
| **大泥球 (Big Ball of Mud)** | 没有清晰的模块边界，任何代码都可能调用任何其他代码 | 难以理解、修改和测试 |
| **上帝类 (God Object)** | 单个类承担过多职责，知道太多、做太多 | 高耦合，难以重用和测试 |
| **意大利面条代码** | 控制流程混乱，深层嵌套，难以追踪执行路径 | 难以理解和维护 |
| **熔岩流 (Lava Flow)** | 没人敢动的古老代码，缺乏文档和测试 | 技术债务累积 |

### 设计反模式
| 反模式 | 识别信号 | 建议 |
|--------|----------|------|
| **金锤子 (Golden Hammer)** | 对所有问题使用同一种技术/模式 | 根据问题选择合适的方案 |
| **过度工程 (Gas Factory)** | 简单问题用复杂方案，滥用设计模式 | YAGNI，先简单后复杂 |
| **船锚 (Boat Anchor)** | 为"将来可能需要"而写的未使用代码 | 删除未使用代码，需要时再写 |
| **复制粘贴编程** | 相同逻辑出现在多处 | 提取公共方法或模块 |

```markdown
🔴 [blocking] "这个类有 2000 行代码，建议拆分为多个专注的类"
🟡 [important] "这段逻辑在 3 个地方重复，考虑提取为公共方法？"
💡 [suggestion] "这个 switch 语句可以用策略模式替代，更易扩展"
```

---

## 耦合度与内聚性评估

### 耦合类型（从好到差）
| 类型 | 描述 | 示例 |
|------|------|------|
| **消息耦合** ✅ | 通过参数传递数据 | `calculate(price, quantity)` |
| **数据耦合** ✅ | 共享简单数据结构 | `processOrder(orderDTO)` |
| **印记耦合** ⚠️ | 共享复杂数据结构但只用部分 | 传入整个 User 对象但只用 name |
| **控制耦合** ⚠️ | 传递控制标志影响行为 | `process(data, isAdmin=true)` |
| **公共耦合** ❌ | 共享全局变量 | 多个模块读写同一个全局状态（库对外可变单例属此类） |
| **内容耦合** ❌ | 直接访问另一模块的内部 | 直接操作另一个类的私有属性 |

### 内聚类型（从好到差）
功能内聚 ✅ > 顺序内聚 ✅ > 通信内聚 ⚠️ > 时间内聚 ⚠️ > 逻辑内聚 ❌ > 偶然内聚 ❌

### 度量指标参考
```yaml
耦合指标:
  CBO (类间耦合):  好 < 5 ｜ 警告 5-10 ｜ 危险 > 10
  Ce (传出耦合):   依赖多少外部类，好 < 7
  Ca (传入耦合):   被多少类依赖，高值=修改影响大，需保持稳定（库公共 API 即高 Ca）
内聚指标:
  LCOM4:  1 单一职责 ✅ ｜ 2-3 可能需拆分 ⚠️ ｜ >3 应拆分 ❌
```
**审查问题：** "这个模块依赖了多少其他模块？能否减少？" / "修改这个类会影响多少地方？" / "类的方法是否都操作相同数据？"

---

## 分层与依赖方向

> Clean Architecture 的"依赖只能指向内层"对三方库同样成立：**库内分层（`api` → `core` → `internal`）下层不应依赖上层，`internal` 实现不应反向依赖 `api` 公共面**；UI 库则对应 view → viewmodel → model（见 A2 [UI 架构评估 · MVVM 三层分层](ui-architecture-assessment.md#2-mvvm-三层分层)）。

**核心规则：源代码依赖只能指向内层 / 稳定层。**

```typescript
// ❌ 违反依赖规则：底层实现反向依赖公共面 / 领域层依赖具体基础设施
// core/User.ts
import { HttpClientImpl } from '../internal/HttpClientImpl';  // 领域耦合具体实现

// ✅ 正确：核心层定义接口，外层实现并注入
// core/UserRepository.ts (接口)
interface UserRepository { findById(id: string): Promise<User>; }
// internal/RemoteUserRepository.ts (实现)
class RemoteUserRepository implements UserRepository { /* ... */ }
```

**审查清单：**
- [ ] 核心/领域层是否有外部具体依赖（网络、存储、第三方包）？
- [ ] 是否存在跨层调用（公共 API 直接深入内部实现、或绕过分层）？
- [ ] 业务逻辑是否与展示/IO 分离？数据访问是否封装在专门层？
- [ ] 配置/环境相关代码是否集中管理、不散落在业务逻辑里？

```markdown
🔴 [blocking] "core 实体直接 import 了具体 HTTP 实现，违反依赖规则"
🟡 [important] "公共 API 层包含具体 IO 逻辑，建议下沉到内部实现层"
💡 [suggestion] "考虑用依赖注入解耦这些组件"
```

---

## 设计模式使用评估

### 何时使用
| 模式 | 适用 | 不适用 |
|------|------|--------|
| **Factory** | 需创建不同类型对象，类型运行时确定 | 只有一种类型或类型固定 |
| **Strategy** | 算法运行时切换，有多种可互换行为 | 只有一种算法 |
| **Observer** | 一对多依赖，状态变化需通知多个对象 | 简单直接调用即可 |
| **Singleton** | 确需全局唯一实例 | 可通过依赖注入传递的对象（**库对外导出可变单例是反模式**） |
| **Decorator** | 动态添加职责，避免继承爆炸 | 职责固定 |

### 过度设计警告（Patternitis）
```
⚠️ 简单 if/else 被替换为策略 + 工厂 + 注册表
⚠️ 只有一个实现的接口
⚠️ 为"将来可能需要"而加的抽象层
⚠️ 代码量因模式应用而大幅增加，新人难以理解
```
**审查原则：** 模式应解决实际的可扩展性问题、让代码更易理解与测试；为用而用、违反 YAGNI 即过度设计。

---

## 可扩展性评估

> 三方库视角：扩展性主要体现在 **功能扩展点** 与 **API 向后兼容扩展**（新增能力不破坏旧用法，见 [代码质量 · 向后兼容](../code-quality/code-quality-assessment.md#10-向后兼容--破坏性变更)）。水平扩展/连接池等运行时伸缩主要针对应用，库一般不涉及。

**功能扩展性：**
- [ ] 加新功能是否需要修改核心代码？
- [ ] 是否提供扩展点（hooks、plugins、events、回调）？
- [ ] 行为是否可配置（配置对象 / 策略注入）而非硬编码？

```typescript
// ✅ 好的扩展设计：暴露钩子 / 事件，库使用方可注入行为
class OrderService {
  constructor(private hooks: OrderHooks = {}) {}
  async createOrder(order: Order) {
    await this.hooks.beforeCreate?.(order);
    const result = await this.save(order);
    await this.hooks.afterCreate?.(result);
    return result;
  }
}

// ❌ 差的扩展设计：行为全部硬编码，使用方无法定制
class OrderService {
  async createOrder(order: Order) {
    await this.sendEmail(order);        // 硬编码
    await this.updateInventory(order);  // 硬编码
    return await this.save(order);
  }
}
```
```markdown
🟡 [important] "这里的行为是硬编码的，考虑暴露 hook/配置让使用方定制？"
💡 [suggestion] "若将来需支持新策略，这个设计是否易扩展？"
```

---

## 代码结构最佳实践

### 目录组织（按功能/领域 ✅，按技术层 ❌）
```
✅ 推荐：按领域           ❌ 不推荐：按技术层（不同领域混在一起）
src/                      src/
├── user/{User,Service,   ├── controllers/{User,Order}
│   Repository,Api}.ts    ├── services/
├── order/...             ├── repositories/
└── shared/{utils,types}  └── models/
```

### 命名约定
| 类型 | 约定 | 示例 |
|------|------|------|
| 类名 | PascalCase，名词 | `UserService` |
| 方法名 | camelCase，动词 | `createUser` |
| 接口名 | 无前缀或 I 前缀，保持一致 | `UserService` / `IUserService` |
| 常量 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| 私有属性 | `#` 或 `_` 前缀 | `#cache` / `_cache` |

### 大小指南
```yaml
建议限制:  单文件 < 300 行 ｜ 单函数 < 50 行 ｜ 单类 < 200 行 ｜ 参数 < 4 ｜ 嵌套 < 4 层
超出时:    拆分为更小单元、组合优于继承、提取辅助函数/类
```

---

## 快速参考清单

### 架构审查 5 分钟速查
```markdown
□ 依赖方向是否正确？（下层/实现依赖上层/抽象 = 错）
□ 是否存在循环依赖？（有则 🔴）
□ 核心逻辑是否与框架/UI/IO 解耦？
□ 是否遵循 SOLID？公共 API 是否最小且聚焦？
□ 是否存在明显反模式（God Object / 大泥球 / 复制粘贴）？
```

### 红色信号（🔴 必须处理）
```markdown
🔴 God Object - 单个类超过 1000 行
🔴 循环依赖 - A → B → C → A
🔴 内部实现反向依赖公共面 / 核心层含具体框架依赖
🔴 硬编码的配置和密钥
🔴 对外导出可变全局单例
```

### 黄色信号（🟡 建议处理）
```markdown
🟡 类间耦合度 (CBO) > 10
🟡 方法参数超过 5 个
🟡 嵌套深度超过 4 层
🟡 重复代码块 > 10 行
🟡 只有一个实现的接口（可能过度抽象）
```

---

## 工具与参考

- **ArkTS/HarmonyOS 适用**：CodeLinter（静态扫描，结果独立成节，详见 [集成指南](../deveco-studio-codelinter/integration.md)）；Madge（TS/JS 模块依赖图，可视化耦合与环）。
- **通用/他语言参考**：SonarQube（耦合度）、CodeScene（技术债务/热点）、NDepend(.NET)、JDepend(Java)。
- 资源：[Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) · [Coupling and Cohesion](https://www.geeksforgeeks.org/system-design/coupling-and-cohesion-in-system-design/) · [Design Patterns - Refactoring Guru](https://refactoring.guru/design-patterns)
