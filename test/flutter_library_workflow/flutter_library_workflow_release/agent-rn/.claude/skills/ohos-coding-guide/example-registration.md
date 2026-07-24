# Example 工程注册完整性规则

本文件定义 Example 工程中原生注册的完整性要求。供 **04 Example 生成阶段**（`primary-04-example-gen.md`：步骤 3 `prepare-only`、步骤 5 `build hap` 及编译修复）参考；不在 `03 coding-library` 阶段执行 Example 注册。步骤 5 编译成功后由 `check_example_static.py` 自动化校验，失败时按本文手动修复。

鸿蒙 npm 包名 scope 由管理面板 **系统设置 → 鸿蒙 npm scope** 配置（默认 `@oh-rn`）；下文示例以 `@oh-rn` 表示，请替换为当前工程的 `ohos/package.json` → `name` 所用 scope。

---

## 1. PackageProvider.cpp 注册完整性

**文件路径**：`ohos/example/harmony/entry/src/main/cpp/PackageProvider.cpp`

**适用范围**：仅**非 autolink** C++ 插件；autolink 插件的 C++ 注册在 `RNOHPackagesFactory.h`（见 §3）。

**规则**：对于每个 `#include "XxxPackage.h"` 的头文件，`getPackages()` 中**必须**有对应的 `std::make_shared<XxxPackage>(ctx)` 实例化调用。

**常见错误**：头文件已 include 但 `ManualLinkingPackage` 列表为空或被注释掉 → 运行时报 `Couldn't find Turbo Module 'XXX' on the CPP side` → 白屏。

**检查方法**：

```bash
# 提取所有 include 的 Package 头文件
grep '#include.*Package.h' ohos/example/harmony/entry/src/main/cpp/PackageProvider.cpp

# 提取所有 make_shared 的 Package 实例化
grep 'make_shared<.*Package>' ohos/example/harmony/entry/src/main/cpp/PackageProvider.cpp

# 两个列表必须一一对应（排除 RNOHPackagesFactory.h 等框架级别头文件）
```

**修复模板**：

```cpp
#include "RNOH/PackageProvider.h"
#include "RNOHPackagesFactory.h"
#include "XxxPackage.h"  // 本库或依赖库的 Package

using namespace rnoh;

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {
    std::vector<std::shared_ptr<Package>> packages = createRNOHPackages(ctx);
    packages.push_back(std::make_shared<XxxPackage>(ctx));  // ← 必须有此行
    return packages;
}
```

---

## 2. Index.ets Fabric 组件注册

**文件路径**：`ohos/example/harmony/entry/src/main/ets/pages/Index.ets`

**规则**：如果本库或依赖库包含 Fabric 组件（`codegenNativeComponent` 调用），必须在两处注册：

### 2.1 buildCustomRNComponent Builder

**重要**：Builder 内部**必须用 `Stack` 包裹**，这是 RNOH 框架的硬性要求。不用 `Stack` 包裹 → 编译通过但组件不渲染，无任何报错信息。

```typescript
import { ReactXxxView, REACT_XXX_TYPE } from '@react-native-ohos/react-native-xxx';

@Builder
export function buildCustomRNComponent(ctx: ComponentBuilderContext) {
  // ⚠️ 必须用 Stack 包裹，否则组件不渲染（编译不报错）
  Stack() {
    if (ctx.componentName === REACT_XXX_TYPE) {
      ReactXxxView({
        ctx: ctx.rnComponentContext,
        tag: ctx.tag,
      })
    }
    // 可链式添加多个组件 else if
  }
  .position({ x: 0, y: 0 })
}
```

### 2.2 arkTsComponentNames 数组

```typescript
arkTsComponentNames: ["NativeXxx"]  // 与 JS codegenNativeComponent('NativeXxx') 的字符串一致
```

**为什么需要**：在 `enableCAPIArchitecture: true` 的架构下，只有在 `arkTsComponentNames` 中列出的组件才会通过 `CustomRNComponentFrameNodeFactory` 创建 ArkTS 视图。未列出的组件会 fallback 失败，表现为 `ComponentContext is undefined` 或组件区域黑屏。

---

## 3. Autolinking 降级策略

**规则**：Example 生成阶段步骤 5 执行 `rn.py build hap` 时，若日志出现 `linked 0 libraries` 但模块声明了 `harmony.autolinking` 配置，说明 autolinking 静默失败。

**Autolinking 会覆盖的文件**（不要在这些文件中手动注册）：

| 文件 | 每次 build 是否被覆盖 |
|------|---------------------|
| `RNOHPackagesFactory.ets` | ✅ 是 |
| `RNOHPackagesFactory.h` | ✅ 是 |
| `autolinking.cmake` | ✅ 是 |

**手动注册应写入的文件**（不会被 autolinking 覆盖）：

| 文件 | 注册内容 |
|------|---------|
| `RNPackagesFactory.ets` | ETS 侧 Package 手动注册 |
| `PackageProvider.cpp` | C++ 侧 Package 手动注册 |
| `CMakeLists.txt` | C++ 库 add_subdirectory + target_link_libraries |

**手动注册模板**：

`RNPackagesFactory.ets`：
```typescript
import { RNPackageContext, RNPackage } from '@rnoh/react-native-openharmony/ts';
import { createRNOHPackages as createRNOHPackagesAutolinking } from "./RNOHPackagesFactory"
import XxxPackage from '@oh-rn/react-native-xxx';

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    ...createRNOHPackagesAutolinking(ctx),
    new XxxPackage(ctx),
  ];
}
```

`CMakeLists.txt`（在 `RNOH_BEGIN/END` 注释块内添加）：
```cmake
# RNOH_BEGIN: add_plugin_subdirectories
add_subdirectory("${OH_MODULE_DIR}/@oh-rn/react-native-xxx/src/main/cpp" ./xxx)
target_compile_options(xxx PUBLIC ${folly_compile_options})
# RNOH_END: add_plugin_subdirectories

# RNOH_BEGIN: link_plugins
target_link_libraries(rnoh_app PUBLIC xxx)
# RNOH_END: link_plugins
```

---

## 4. ETS 侧 import 路径注意事项

检查依赖库的 `oh-package.json5` 的 `main` 字段，确认导入路径：

```typescript
// 若 main: "index.ets"（默认导出）
import XxxPackage from '@oh-rn/react-native-xxx';

// 若 main 指向子路径（如 "src/main/ets/index.ets"）
import { XxxPackage } from '@oh-rn/react-native-xxx';

// ❌ 禁止猜测子路径（如 /ts、/ets），必须以 oh-package.json5 main 字段为准
```
