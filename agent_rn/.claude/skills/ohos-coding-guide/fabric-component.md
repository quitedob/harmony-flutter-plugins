# ArkTS Fabric 自定义组件鸿蒙适配（精简版）

## 前置准备

请先阅读并执行通用步骤：`read_file` → `.claude/skills/ohos-coding-guide/common-setup-steps.md`。
完成通用脚手架与依赖安装后，再继续以下步骤。

核心原则：**先用脚本生成脚手架**，再在本仓库 `ohos/harmony/library` 内补齐 **ArkTS 组件 UI 与行为**。Codegen 已生成的 **`generated/components/*.ts`（DescriptorWrapper / EventEmitter / CommandReceiver）不要手抄重写**；脚本会生成 **`components/*.ets`**、**`GeneratedPackage.ts`**，并重写 **`ts.ts` 仅导出 `GeneratedPackage`**（**不可**在 `ts.ts` 里 re-export `.ets` 组件，否则报 *Importing ArkTS files in JS and TS files is forbidden*）。尽量不要手工搭目录。

## 适用条件

- JS 侧使用 **`codegenNativeComponent<...>('ComponentName')`** 的 Fabric 组件（新架构）。
- 鸿蒙侧使用 RNOH：**DescriptorWrapper** 注册 + **`@Component` struct** 实现视图。

## 1) 填充实现（必做）

### 1.0 通用规程与 ArkTS 规则（必做）

**前置检查（必做）**：先查看 `02-planning.json` 的 `permission_mapping`，检查是否有 `grant_type: "user_grant"` 的权限。如果有，必须先阅读权限请求指南，再实现代码。

1. `read_file`：`.claude/skills/ohos-coding-guide/library-fill-implementation.md` — 按 `ohos_api_mapping` 逐条实现、签名查证、Fabric/Turbo 命名与 sub-doc-search。
2. 编写或修改 ETS 前执行：`skill({ name: "arkts-rules" })`。
3. **如果有 user_grant 权限**：`read_file`：`.claude/skills/ohos-coding-guide/permission-request.md` — 动态请求用户授权。

### 1.1 读准 codegen 契约

- **`ohos/harmony/library/src/main/ets/generated/components/<Name>.ts`**：由 `react-native codegen-harmony` 生成，内含 **`EventPayloadByName`**、**`EventEmitter`**、**`CommandReceiver`**、**`DescriptorWrapper`** 等，**以该文件为准**。
- **`ohos/harmony/library/src/main/ets/components/<Name>.ets`**：脚本生成的 struct 占位，已包含 **`Spec.EventEmitter`** 初始化与 **`DescriptorWrapper` 订阅** 骨架；你需要在 **`build()`** 里用 **`this.descriptorWrapper`**（props/rawProps）把 ArkUI 画出来。

### 1.2 你要改什么

- 打开 **`ohos/harmony/library/src/main/ets/components/<Name>.ets`**：
  - 在 **`RNViewBase`** 内实现真实 **Column / Stack / XComponent** 等布局与业务。
  - **向 JS 发事件**：优先使用占位里已创建的 **`this.eventEmitter`**（即 `new Spec.EventEmitter(this.ctx.rnInstance, this.tag)`），**事件名与 payload** 须与 **`EventPayloadByName`** 一致（见 codegen 生成的 `.ts`）；若当前 codegen 里 **`EventPayloadByName` 为空**，需先在 JS Spec 声明 **`onXxx`** 等并重新 codegen。
  - **接收 RN 命令**：若 JS 侧有 **`codegenNativeCommands`**，可按占位注释用 **`Spec.CommandReceiver`** 订阅，并在 **`cleanUpCallbacks`** 里登记卸载。
- **不要**再手写一套与 codegen 冲突的 Descriptor 类型定义；**不要**复制旧文档里已过时的 **`RNComponentContext` / 手写 XxxPackage** 模板——库侧注册以脚本生成的 **`GeneratedPackage.ts`** 为准。

### 1.3 C++（按需）

若业务必须在 C++ 层扩展（非仅 ArkTS），再在 `ohos/harmony/library/src/main/cpp/` 按 RNOH 与 codegen 产物衔接；多数 Fabric 库仅 ETS 即可。

## 2) 添加依赖（按需）

### 2.1 原生依赖（ohpm 包）

- 修改 **`ohos/harmony/library/oh-package.json5`** 增加 ohpm 依赖。
- 与规划产物对齐：将 **`02-planning.json`** 里 **`native_dependency_mapping`** 中需要的依赖写入 ohpm。

### 2.2 RN 插件依赖（npm 包）

根据 `02-planning.json` 的 `rn_dependency_mapping` 处理 npm 依赖：

| 依赖状态 | 处理方式 | 修改位置 |
|----------|----------|----------|
| `adapted` | 替换为鸿蒙版本 | `ohos/package.json` 或 `ohos/example/package.json` |
| `not_needed` | 保持原 npm 包 | 无需修改 |
| `not_adapted` + 阻塞 | 按风险方案处理 | JS/ETS 代码中 try-catch / 平台跳过 |

**替换示例**：
```json
// ohos/package.json
{
  "dependencies": {
    "@react-native-community/async-storage": "@react-native-oh-tpl/async-storage@1.12.0-0.1.0"
  }
}
```

## 3) 添加权限（按需）

- 修改 **`ohos/harmony/library/src/main/module.json5`**。
- 按 **`02-planning.json`** 的 **`permission_mapping`** 补齐 **`requestPermissions`**。
- **user_grant 权限需添加 `reason` 字段**（详见 `permission-request.md`）。

## 4) 编译验证（必做）

完成上述实现后，必须编译通过：

```bash
python ./.claude/skills/tool-ohos-plugin-repo/tool/rn.py build har
```

**编译失败时**：
- 根据错误日志修改 ETS/C++ 代码
- 重新执行 `rn.py build har`，直到编译通过
- 编译通过后，`ohos/harmony/library.har` 文件会自动生成

**禁止跳过编译验证**：未通过编译视为本阶段未完成。

**⚠️ 重要强调**：
- **只能使用 `rn.py build har` 命令构建 HAR 包**
- **严禁使用任何其他构建方式**，包括但不限于：
  - 直接使用 `hvigorw` 命令
  - 使用其他任何非 `rn.py build har` 的构建命令
- 违反上述规定视为严重错误

## 5) 注意

- **不要手工改 Example / Entry 集成**（`ohos/example/harmony` 下 RNPackagesFactory、entry 依赖、`buildCustomComponent` 等由 **`rn.py create`** / **`apply_example_auto.py`** 与 **testing 阶段** 维护；库侧只保证 **`ohos/harmony/library`** 正确）。
- JS Spec 中 **`codegenNativeComponent('Name')` 的字符串**、 codegen 生成的 **NAME**、ArkTS **`Spec.NAME`** 须一致。
- 组件不显示 / 事件不到 JS 时，先核对：**codegen 是否成功**、`generated/components` 是否存在、**事件名**是否与 **`EventPayloadByName`** 一致。
