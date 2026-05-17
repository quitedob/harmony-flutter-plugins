# ArkTS TurboModule 鸿蒙适配（精简版）

## 前置准备

请先阅读并执行通用步骤：`read_file` → `.claude/skills/ohos-coding-guide/common-setup-steps.md`。
完成通用脚手架与依赖安装后，再继续以下步骤。

核心原则：**先用脚本生成脚手架**，然后你只需要做三件事：**实现 ETS 的 Spec 接口**、**按需添加依赖**、**按需添加权限**。其余工程文件/注册/导出由脚本负责，尽量不要手工改动。

## 1) 实现 ETS：把 `Not implemented` 改成真实逻辑（必做）

**前置检查（必做）**：先查看 `02-planning.json` 的 `permission_mapping`，检查是否有 `grant_type: "user_grant"` 的权限。如果有，必须先阅读权限请求指南，再实现代码。

1. `read_file`：`.claude/skills/ohos-coding-guide/library-fill-implementation.md` — 按 `ohos_api_mapping` 逐条查证签名、命名与 sub-doc-search 用法。
2. 编写或修改 ETS 前执行：`skill({ name: "arkts-rules" })`。
3. **如果有 user_grant 权限**：`read_file`：`.claude/skills/ohos-coding-guide/permission-request.md` — 动态请求用户授权。
4. 在库侧改代码：

脚本会在 `ohos/harmony/library/src/main/ets/` 生成一个或多个 `*TurboModule.ts` 文件（以及 Package/导出文件）。

你要做的就是：
- 打开 `ohos/harmony/library/src/main/ets/*TurboModule.ts`
- 按 `ohos/harmony/library/src/main/ets/generated/` 中的 `TM.<Name>.Spec`，把接口里声明的方法**全部实现**

## 2) 添加依赖（按需）

### 2.1 原生依赖（ohpm 包）

如果需要额外 ohpm 包：
- 修改 `ohos/harmony/library/oh-package.json5`
- 将 `02-planning.json` 的 `native_dependency_mapping` 中需要的 ohpm 依赖加进去

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

如果需要权限：
- 修改 `ohos/harmony/library/src/main/module.json5`
- 按 `02-planning.json` 的 `permission_mapping` 补齐 `requestPermissions`
- **user_grant 权限需添加 `reason` 字段**（详见 `permission-request.md`）

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

- **不要手工改 Example/Entry 集成**（由脚手架与 testing 阶段维护）。
- **不要修改根目录 `src/` 下的原始代码**（只修改 `ohos/` 目录）。
- `ohos/` 目录是鸿蒙化插件包，直接给鸿蒙用户使用，**不需要**在 `ohos/src/` 中添加 `Platform.OS === 'harmony'` 平台判断。
