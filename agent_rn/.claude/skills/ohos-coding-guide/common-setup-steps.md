# 通用脚手架与依赖安装步骤

## 强制执行（违反即错误）

- **必须先创建 todolist**（任务拆解：脚手架、实现、依赖、权限、自检等），再按列表逐项执行。
- **禁止不创建 todolist 直接开始改代码、跑脚本或执行任何实现步骤**。
- **步骤 1 和 3 失败处理**：若 `rn.py create` 或 `rn.py init` 执行失败（报错退出），**必须尝试分析错误并修复，然后重新执行命令**。若修复后再次执行仍然失败，**必须终止整个适配流程**，**绝不可在脚手架或依赖未就绪的情况下强行进入后续步骤**。
- **禁止跳过/拆分 init 命令**：`rn.py init` 失败后，**必须重新运行完整的 `rn.py init` 命令**。**严禁**单独执行 init 的子步骤（如 codegen、npm install、ohpm install 等）来绕过失败。单独执行子步骤**不视为成功**，必须运行完整命令直到成功退出。

## 1) 生成脚手架（必做）

在插件仓库根目录（含 `package.json`）执行：

```bash
python ./.claude/skills/tool-ohos-plugin-repo/tool/rn.py create --template=plugin
```

- 若希望与仓库 Spec 扫描结果一致，可用 `--module auto`（须与 `02-planning.json` 中 `plugin_type_skill` 对齐）。
- **禁止**跳过上述命令而手搓 `ohos/` 目录。
- **已存在 ohos 目录的处理**：若 ohos 目录已存在，脚本会**检查并补充缺失的模板文件**（如 README.md、LICENSE、harmony/library、example 等），不会删除已有内容。
- **禁止盲目使用 `--force`**：会删除整个 ohos 目录（包括 .git 历史），仅在明确需要全新创建时使用。
- **失败检查**：若命令报错退出，流程立即终止。必须修复错误并重新运行成功后，方可继续。
- **Agent 执行时**：须等待命令整次跑完（含 `npm install` / codegen 等），**最长等待 20 分钟**；在进程未退出且未满 20 分钟前不得提前中断。

## 2) 清理 ohos/src 下非鸿蒙平台相关代码（必做）

`rn.py create` 后，`ohos/src/` 下可能存在 android/ios/web 等其他平台相关的代码，**必须清理**：

**删除其他平台文件/目录**：
- `ohos/src/android/`、`ohos/src/ios/` 等目录（如果有）
- 仅保留鸿蒙相关代码

**清理平台判断代码**：
- `ohos/src/` 中的源文件可能包含 `Platform.OS === 'ios'` / `'android'` 等判断
- **删除其他平台分支**，只保留鸿蒙实现或简化为直接调用鸿蒙 TurboModule
- `ohos/` 是鸿蒙化插件包，运行时 `Platform.OS` 永远是 `'harmony'`

**示例**：

```tsx
// 原代码（拷贝后）
export const getCountryCode = (type?: Types) => {
  if (Platform.OS === 'ios') {
    return getCountryCodeIOS();
  } else if (Platform.OS === 'android') {
    return getCountryCodeAndroid(type);
  }
};

// 清理后（删除其他平台分支）
export const getCountryCode = (type?: Types) => {
  return NativeDeviceCountryModule.getCountryCode(type || 'any');
};
```

- 插件对外 JS/TS 接口**保持不变**（方法名、参数、返回值）
- 不修改根目录 `src/` 下的原始代码

## 3) 安装依赖（必做）

```bash
python ./.claude/skills/tool-ohos-plugin-repo/tool/rn.py init
```

- 安装 npm/ohpm 依赖
- 生成对应模块代码
- **最长等待 20 分钟**，未满时间前不得中断
- **失败检查**：若命令报错退出，流程立即终止。必须修复错误并重新运行成功后，方可继续。
