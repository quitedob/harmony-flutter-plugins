# 统一迁移处理（旧架构 → 新架构）

本文件由 `ohos-coding-guide` Skill 在检测到 `migration_needed = true` 时加载执行，处理所有旧架构模块的 JS 侧迁移。

---

## 判断条件

从 `.rn-ohos-adaptation/01-analysis.json` 和 `.rn-ohos-adaptation/02-planning.json` 读取：

- `01-analysis.json` 的 `migration_needed = true`
- `02-planning.json` 的 `migration_plan` 非空

若两者都满足，执行本文件迁移步骤。

---

## 迁移范围

**仅 JS 侧**：
- 创建 TurboModule/Fabric Spec 文件
- 修改 JS 导出代码

**不涉及原生侧**（Android/iOS 原生代码不改动）。

---

## 迁移步骤

### 1. 创建所有 Spec 文件

遍历 `02-planning.json` 的 `migration_plan.spec_files`，按 `target_type` 创建对应 Spec：

| target_type | Spec 文件名 | 模板类型 |
|-------------|-------------|----------|
| `turbo-module` | `Native<Name>.ts` | TurboModule Spec |
| `fabric-component` | `<Name>NativeComponent.ts` | Fabric Spec |

#### TurboModule Spec 模板

```typescript
// 文件：src/specs/Native<ModuleName>.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // 从 migration_plan.spec_files[].methods 填入方法签名
  // 例如：
  // methodName(param1: string, param2: number): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('<ModuleName>');
```

#### Fabric Spec 模板

```typescript
// 文件：src/specs/<ComponentName>NativeComponent.ts
import type { HostComponent, ViewProps } from 'react-native';
import { codegenNativeComponent } from 'react-native';

interface Props extends ViewProps {
  // 从 migration_plan.spec_files[].props 填入属性
  // 例如：
  // title?: string;
  // onEvent?: (event: { value: string }) => void;
}

export default codegenNativeComponent<Props>('<ComponentName>');
```

**命名一致性检查**：
- TurboModule：`TurboModuleRegistry.getEnforcing<Spec>('ModuleName')` 的字符串须与 NativeModules 中的名称一致
- Fabric：`codegenNativeComponent<Props>('ComponentName')` 的字符串须与 requireNativeComponent 中的名称一致

### 2. 修改 JS 导出代码

按 `migration_plan.js_changes` 一次性修改所有导出文件。

#### TurboModule 导出改动

```typescript
// 从（旧架构）：
import { NativeModules } from 'react-native';
const { ModuleName } = NativeModules;
export default ModuleName;

// 改为（新架构）：
import NativeModuleName from './specs/NativeModuleName';
export default NativeModuleName;
```

#### Fabric 导出改动

```typescript
// 从（旧架构）：
import { requireNativeComponent } from 'react-native';
export default requireNativeComponent('ComponentName');

// 改为（新架构）：
import ComponentNativeComponent from './specs/ComponentNativeComponent';
export default ComponentNativeComponent;
```

### 3. 配置 package.json

在 `package.json` 中添加 `codegenConfig`：

```json
{
  "codegenConfig": {
    "name": "ModuleName",
    "type": "modules",
    "jsSrcsDir": "src"
  }
}
```

**仅添加配置，不删除原有内容**。

若同时有 TurboModule 和 Fabric，配置相同即可（`specPaths` 指向同一个目录）。

### 4. 记录迁移结果

在写入 `03-coding-library.json` 时设置：

```json
{
  "migration_executed": true,
  "migration_changes": {
    "spec_files_created": ["src/specs/NativeModuleName.ts", "src/specs/ComponentNativeComponent.ts"],
    "js_files_modified": ["src/index.ts"],
    "package_json_modified": true
  }
}
```

---

## 注意事项

- **禁止在迁移阶段修改原生代码**（Android/iOS 的 Java/Kotlin/Obj-C/Swift/C++）
- **Spec 方法签名必须与原 NativeModules 方法一致**（参数类型、返回类型、是否 Promise）
- **Fabric Props 必须与原 requireNativeComponent 属性一致**（类型、可选性）
