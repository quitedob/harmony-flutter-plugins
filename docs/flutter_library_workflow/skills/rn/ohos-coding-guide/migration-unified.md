# 统一迁移处理（旧架构 → 新架构）

在 **`rn.py create` 完成之后**、**`rn.py init` 之前**执行。`ohos/` 目录必须已存在。

---

## 判断条件

- `01-analysis.json`：`migration_needed = true`
- `02-planning.json`：`migration_plan` 非空

---

## 迁移方式（优先脚本）

在插件仓库根目录执行：

```bash
python ./.claude/skills/tool-ohos-plugin-repo/tool/rn.py migrate --plugin-root .
```

脚本根据 `02-planning.json` 的 `migration_plan`（及必要时 01 中的规划）在 **`ohos/` 包内**完成：
- 创建 TurboModule / Fabric Spec 文件
- 修改 JS 导出
- 配置 `ohos/package.json` 的 `scripts.codegen-lib`（Spec 路径写在命令行参数中，**不要**再写 `harmony.codegenConfig`）

**迁移范围**：仅 **JS/TS 侧**（`ohos/src/` 及 `ohos/package.json` 等），**不修改** Android/iOS 原生代码，**不修改**仓库根目录 `src/` 原始源码。

---

## 脚本失败或结果不对时

**`rn.py migrate` 是确定性脚本，重复执行通常不会修复 JS 笔误或 Spec 内容错误。**

在**同一会话**中根据 migrate 的**终端输出**与 `migration_plan` 对照，**直接 edit 修复**，例如：

| 问题 | 处理 |
|------|------|
| JS 导出变量名错误（如 `NativeNativeXxx`） | 改 export/import |
| 常量应走 `getConstants()` | 改 Spec + JS 调用方式 |
| `harmony.alias` / `codegen-lib` 路径错误 | 改 `ohos/package.json` |
| Spec 签名与旧 NativeModules 不一致 | 改 Spec 文件 |
| 双入口：`ohos/src/index.js` 的 default 仍是单函数，Example 报 `I.default.xxx is not a function` | 改 barrel 为对象 default（§0.1.1）；**migrate 不会自动修** |

**说明**：`migrate` 只处理 `ohos/src/src/`、Spec 与 `codegen-lib`，**不会**修正根 barrel 拷贝到 `ohos/src/index.js` 的 default 导出形态。

修复后进入 `verify-migration.md` 做 init 前检查，**不要**盲目反复 migrate。

---

## 手工迁移参考（仅当 migrate 命令不可用）

仅在脚本无法运行时使用；内容与 `migration_plan` 对齐：

### TurboModule Spec（示例）

```typescript
// ohos/src/specs/v1/Native<ModuleName>.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // 从 migration_plan.spec_files[].methods 填入
}

export default TurboModuleRegistry.getEnforcing<Spec>('<ModuleName>');
```

### Fabric Spec（示例）

```typescript
// ohos/src/specs/v1/<Name>NativeComponent.ts
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';

interface Props extends ViewProps {
  // 从 migration_plan 填入
}

export default codegenNativeComponent<Props>('<ComponentName>');
```

> **Harmony 注意**：不要写 `import { codegenNativeComponent } from 'react-native'`。Metro 会把 `react-native` 指到 `@react-native-oh/react-native-harmony`，其主入口**不导出** `codegenNativeComponent`，运行时会报 `codegenNativeComponent is not a function`。`rn.py migrate` 会为 `requireNativeComponent` 生成正确 import，并修正已有 Spec 中的错误写法。

### 导出改动要点

- TurboModule：`NativeModules` → `import` Spec 默认导出
- Fabric：`requireNativeComponent` → `import` Fabric Spec
- 常量须通过 Spec 的 `getConstants()`，JS 侧用 `NativeXxx.getConstants().key`

---

## 记录迁移结果

写入 `03-coding-library.json` 时：

```json
{
  "migration_executed": true,
  "migration_changes": {
    "spec_files_created": ["ohos/src/specs/v1/NativeModuleName.ts"],
    "js_files_modified": ["ohos/src/index.ts"],
    "package_json_modified": true
  }
}
```

---

## 注意事项

- Spec 方法签名须与原 NativeModules **一致**（参数、返回、Promise）
- Fabric Props 须与原 `requireNativeComponent` **一致**
- 命名：`TurboModuleRegistry.getEnforcing('Name')` / `codegenNativeComponent('Name')` 字符串须与历史注册名一致
