---
name: ohos-coding-guide
description: 鸿蒙 ETS/C++ 编码统一指导。按 create→迁移→验证→init→分类型实现→build har 顺序执行。
---

# 鸿蒙 ETS/C++ 编码指导（统一入口）

本 Skill 由 `coding-library` 阶段（`primary-03-coding-library`）加载。

## 执行模型

- **单次连续会话**：前一步命令的输出、你已读过的文件、修复记录都在**当前上下文**中，**不要**为步骤间再写临时 log 文件传参。
- **失败时**：以**刚执行的那条 `rn.py` 命令的完整终端输出**为准分析；修完再重跑同一条命令。
- **阶段产物**：仅最终写入 `03-coding-library.json` / report（经 `tool-schema-validation`）。

---

## 流程总览（须严格按序）

| 步骤  | 条件 | 动作 | 参考文件 |
|-----|------|------|----------|
| 0   | 始终 | 创建 todolist；读 01/02；读 `library-fill-implementation.md` | 下文 |
| 1   | 始终 | `rn.py create` + 脚手架后检查 + 清理 `ohos/src` | `common-setup-steps.md` §1–3 |
| 2   | `migration_needed` 且 `migration_plan` 非空 | `rn.py migrate` | `migration-unified.md` |
| 3a  | 步骤 2 已执行 | 迁移后验证 | `verify-migration.md` |
| 3b  | 未迁移 | 非迁移验证 | `verify-non-migration.md` |
| 4   | 始终 | `rn.py init`（失败→回到步骤 3 修脚手架，再完整重跑 init） | `common-setup-steps.md` §4 |
| 5   | 按 `target_module_types` | 分类型实现（**禁止**再 create/init） | 类型 md，见下表 |
| 5.1 | 含原生类型 | C++ Codegen 与 Example 注册完整性检查 | 下文 |
| 5.2 | 含原生类型 | NAPI 桥类型安全核查（`napi-bridge-types.md`） | 逐方法检查返回值类型能否安全跨桥 |
| 5.3 | 含原生类型 | 跨边界合约自查（`rnoh-cross-boundary-contract.md` 附件A） | 逐条对照 emitDeviceEvent 类型、null语义、sync/async、禁止throw |
| 5.4 | 含原生类型 | 行为基线对照（`behavior-baseline.md`） | 对照 Spec 签名 + Android/iOS 参数语义、回调模式 |
| 6   | 含原生类型 | `rn.py build har` 直至通过 | `compile-fix-har.md` |
| 7   | 始终 | 写 03 产物 | `tool-schema-validation` |

**顺序说明**：`rn.py migrate` **必须在 `create` 之后**（migrate 要求 `ohos/` 已存在）。

**多类型实现顺序**：`turbo-module` / `cpp-turbo-module` → `fabric-component` / `fabric-cpp-component` → `js-only`。公共步骤（create、init、build har）各只做一次。

---

## 步骤 0：前置准备

**必须先创建 todolist**，再执行任何命令或改代码。

读取：

```
.rn-ohos-adaptation/01-analysis.json
.rn-ohos-adaptation/02-planning.json
```

必读：

```
.claude/skills/ohos-coding-guide/library-fill-implementation.md
.claude/skills/ohos-coding-guide/rnoh-cross-boundary-contract.md
.claude/skills/ohos-coding-guide/behavior-baseline.md
.claude/skills/ohos-coding-guide/rnoh-version-baseline.md
```

> **`rnoh-version-baseline.md` 是硬约束**：生成 ETS TurboModule / Package / Fabric generated / JS spec 前必读。
> 本仓目标 RNOH 0.72 + RN 0.72，禁止套用新版 codegen/RNOH API（否则 HAR/HAP 直接编译失败）。
> 开工前先读 `ohos/example/harmony/oh-package.json5`、`ohos/package.json` 确认实际版本。

若有 `user_grant` 权限，再加读：
```
.claude/skills/ohos-coding-guide/permission-request.md
```

| 字段 | 来源 | 用途 |
|------|------|------|
| `migration_needed` | 01 | 是否走迁移 |
| `migration_plan` | 02 | 迁移规划（migrate 脚本输入） |
| `target_module_types` | 02 | 类型数组 |
| `ohos_api_mapping` | 02 | API 映射 |
| `permission_mapping` | 02 | 权限 |
| `native_dependency_mapping` | 02 | ohpm 依赖 |
| `rn_dependency_mapping` | 02 | npm 依赖 |

**模块目录名 `{short_name}`**：来自 `ohos/package.json` 的 `harmony.autolinking.ohPackageName`，或 `ls ohos/harmony/` 下除 `entry` 外的目录名。**不要**写死 `library`。

### 步骤 0.5：加载失败经验库（预防性检查）

```
skill({ name: "failure-lessons" })
```

按 `failure-lessons/SKILL.md` 的「使用方式」匹配当前 `target_module_types`，阅读匹配条目的 `wrong_pattern`，编码过程中**主动避免**这些已记录的错误模式。

---

## 步骤 1：脚手架

```
read_file: .claude/skills/ohos-coding-guide/common-setup-steps.md
```

执行其中 **§1 生成脚手架、§2 脚手架后检查、§3 清理 ohos/src**（**不要**在本步执行 init）。

---

## 步骤 2–3：迁移与验证

若 `migration_needed = true` 且 `migration_plan` 非空：

```
read_file: .claude/skills/ohos-coding-guide/migration-unified.md
read_file: .claude/skills/ohos-coding-guide/verify-migration.md
```

否则：

```
read_file: .claude/skills/ohos-coding-guide/verify-non-migration.md
```

验证未通过则**直接修复**，不要进入 init。

---

## 步骤 4：init

执行 `common-setup-steps.md` **§4**。

- init 失败：**以本次 `rn.py init` 终端输出**分析；按 verify 文档修 Spec/配置/目录后，**完整重跑** `rn.py init`。
- **禁止**拆子命令（单独 codegen、单独 ohpm）冒充 init 成功。

---

## 步骤 5：分类型实现

1.根据 `target_module_types` 加载（可多类型，按上表顺序）：

| target_module_types | 文件 |
|---------------------|------|
| `turbo-module` | `turbo-module.md` |
| `cpp-turbo-module` | `turbo-module.md` + `cpp-turbo-module.md` |
| `fabric-component` | `fabric-component.md` |
| `fabric-cpp-component` | `fabric-component.md` + `fabric-cpp-component.md` |
| `js-only` | `js-only.md` |
| `monorepo` | `monorepo.md`（单独处理，不与常规类型混跑） |

类型文档假定 **create + verify + init 已完成**；只做实现、依赖、权限，**禁止** `rn.py create` / `rn.py init`。

2.**若 `target_module_types` 含原生类型**（turbo-module / cpp-turbo-module / fabric-component / fabric-cpp-component），编码 ETS 前先加载 ArkTS 规则：
```
skill({ name: "arkts-rules" })
```
阅读 `arkts-rules/SKILL.md` 的「高频编译错误速查」表（10 条），编码 ETS 文件时主动避免。

3.**若含 `cpp-turbo-module`**，编码 C++ 前对照 `cpp-ndk-cheatsheet.md` 检查 NDK 兼容性。

---

### 5.1：C++ Codegen 与 Example 注册完整性检查（仅原生类型）

在 build har **之前**执行以下检查，避免编译通过但运行时白屏/崩溃。

#### 5.1.1 C++ Codegen 完整性（强制执行）

对于 `turbo-module` 和 `cpp-turbo-module` 类型，C++ 代理层是 JS→ArkTS 桥接的必经之路。**即使是纯 ETS 实现的 TurboModule，也需要 C++ 代理文件**，否则运行时报 `Couldn't find Turbo Module 'XXX' on the CPP side` → 白屏。

**检查步骤**：

1. 检查 `ohos/harmony/{short_name}/src/main/cpp/` 目录：
   - 存在 `generated/` 或同级的 `*Package.h`（含 `TurboModuleFactoryDelegate`）→ codegen 已完成 ✅
   - 不存在或只有空目录 → **必须手动创建**

2. 若缺失，按以下模板创建（用实际模块名替换占位符）：

**目录结构**：
```
src/main/cpp/generated/RNOH/generated/
├── Base{ModulePascal}Package.h        ← Package 基类
├── dummy.cpp                          ← 防 CMake No SOURCES
└── turbo_modules/
    ├── {TurboModuleName}Module.h      ← ArkTSTurboModule 子类声明
    └── {TurboModuleName}Module.cpp    ← methodMap_ 注册
```

**模板 A — `Base{ModulePascal}Package.h`**：
```cpp
#pragma once
#include "RNOH/Package.h"
#include "turbo_modules/{TurboModuleName}Module.h"

namespace rnoh {

class Base{ModulePascal}PackageTurboModuleFactoryDelegate : public TurboModuleFactoryDelegate {
public:
    SharedTurboModule createTurboModule(Context ctx, const std::string &name) const override {
        if (name == "{JSModuleName}") {
            return std::make_shared<{TurboModuleName}Module>(ctx, name);
        }
        return nullptr;
    }
};

class Base{ModulePascal}Package : public Package {
public:
    Base{ModulePascal}Package(Package::Context ctx) : Package(ctx) {};
    std::unique_ptr<TurboModuleFactoryDelegate> createTurboModuleFactoryDelegate() override {
        return std::make_unique<Base{ModulePascal}PackageTurboModuleFactoryDelegate>();
    }
    std::vector<facebook::react::ComponentDescriptorProvider> createComponentDescriptorProviders() override {
        return {};
    }
};

} // namespace rnoh
```

**模板 B — `{TurboModuleName}Module.h`**：
```cpp
#pragma once
#include "RNOH/ArkTSTurboModule.h"

namespace rnoh {

class {TurboModuleName}Module : public ArkTSTurboModule {
public:
    {TurboModuleName}Module(const ArkTSTurboModule::Context ctx, const std::string name);
};

} // namespace rnoh
```

**模板 C — `{TurboModuleName}Module.cpp`**：
```cpp
#include "{TurboModuleName}Module.h"

namespace rnoh {

{TurboModuleName}Module::{TurboModuleName}Module(const ArkTSTurboModule::Context ctx, const std::string name)
    : ArkTSTurboModule(ctx, name) {
    methodMap_ = {
        // 从 ETS TurboModule 的方法列表生成，每个方法一行：
        // 返回 Promise → ARK_ASYNC_METHOD_METADATA(methodName, argCount),
        // 同步方法 → ARK_METHOD_METADATA(methodName, argCount),
    };
}

} // namespace rnoh
```

**模板 D — `dummy.cpp`**：
```cpp
// Placeholder to satisfy CMake add_library requirement
```

3. **methodMap_ 填充规则**：
   - 读取 ETS TurboModule 的所有公开方法
   - 返回 `Promise` 的方法用 `ARK_ASYNC_METHOD_METADATA(methodName, argCount)`
   - 同步方法用 `ARK_METHOD_METADATA(methodName, argCount)`
   - `argCount` = 方法参数个数（不含 `this`）

4. 检查 `CMakeLists.txt` 的 `file(GLOB ...)` 能否匹配到至少一个 `.cpp` — 若不能，确认 `dummy.cpp` 已创建

**占位符说明**：
- `{ModulePascal}`：模块 PascalCase 名（如 `Datepicker`）
- `{TurboModuleName}`：TurboModule 名（如 `DatePicker`），与 ETS 端 `static readonly NAME` 一致
- `{JSModuleName}`：JS 端 `TurboModuleRegistry.get('XXX')` 的字符串，与 `{TurboModuleName}` 的 NAME 一致

#### 5.1.2 Example 注册预检（供 testing 阶段使用）

读取 `example-registration.md` 了解注册规则，但**本步不修改 example**（example 注册由 testing 阶段的 `rn.py build hap --prepare-only` 自动完成或手动补充）。若发现依赖库包含 Fabric 组件，在 `03-coding-library.json` 的 `risk_items` 中记录，提示 testing 阶段需手动注册。

```
read_file: .claude/skills/ohos-coding-guide/example-registration.md
```

---

### 5.2：NAPI 桥类型安全核查（仅原生类型）

所有方法实现后，加载并对照：

```
read_file: .claude/skills/ohos-coding-guide/napi-bridge-types.md
```

逐方法检查 `03-coding-library.json` 的返回值类型，确保无不安全类型（Error 对象、bigint、Map/Set 等）直接跨桥。发现异常 → 改为安全写法（传 string 或 `{ message }` 等）。检查结果待步骤 7 一并写入 `napi_bridge_check` 字段。

---

### 5.3：跨边界合约自查（仅原生类型）

全部方法实现后，按 `rnoh-cross-boundary-contract.md` 附件 A 逐条自查：

| # | 自检项 |
|:--:|--------|
| 1 | 所有 `emitDeviceEvent` payload 非裸标量，与 JS Spec 类型一致 |
| 2 | null/undefined 语义正确，JS 侧用 `== null` |
| 3 | sync/async 标注一致 |
| 4 | 无 `throw new Error`，错误用 `Promise.reject()` |

发现不一致 → edit ETS/JS → 复查。全部 pass 后进入步骤 5.4。检查结果待步骤 7 一并写入 `cross_boundary_check` 字段。

---

### 5.4：行为基线对照（仅原生类型）

全部方法实现后，加载并执行：
```
read_file: .claude/skills/ohos-coding-guide/behavior-baseline.md
```
逐方法对照 Spec 签名 + Android/iOS 实现的参数语义、回调模式、返回值语义。检查结果待步骤 7 一并写入 `behavior_baseline_check` 字段。

### 5.5：ETS 编码后自检（仅原生类型）

对照 `arkts-rules` 的**高频编译错误速查表**，逐项检查编写的所有 `.ets` 文件

全部通过后进入步骤 6。编译失败时回 `arkts-rules` 按规则编号逐条排查修复。

---

## 步骤 6：编译（仅原生类型）

`target_module_types` 含 `turbo-module`、`cpp-turbo-module`、`fabric-component`、`fabric-cpp-component` 之一时：

```bash
python ./.claude/skills/tool-ohos-plugin-repo/tool/rn.py build har
```

失败：读 `compile-fix-har.md`，**以本次 build har 终端输出**修错，再重跑，直至 exit 0。

**纯 `js-only`**：本阶段**不**执行 `build har`（无原生 HAR）；init 成功即可进入产物步骤。

---

## 步骤 7：产物

加载 `tool-schema-validation`，输出：

```
.rn-ohos-adaptation/03-coding-library.json
.rn-ohos-adaptation/03-coding-library-report.md
```

迁移场景在 JSON 中设置 `migration_executed: true` 及 `migration_changes`（见 `migration-unified.md`）。
