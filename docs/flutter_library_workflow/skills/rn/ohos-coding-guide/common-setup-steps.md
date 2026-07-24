# 通用脚手架与依赖安装步骤

由 `ohos-coding-guide` Skill 引用：

- **§1–3**：步骤 1（create 与 ohos/src 整理），在 migrate/verify **之前**
- **§4**：步骤 4（init），在 verify **之后**

## 强制执行（违反即错误）

- **必须先创建 todolist**（任务拆解：脚手架、验证、init、分类型实现、编译、产物），再按列表逐项执行。
- **禁止不创建 todolist 直接开始改代码、跑脚本或执行任何实现步骤**。
- **create / init 失败**：**以该次命令的完整终端输出**分析、修复、重跑**同一条完整命令**。修复后仍失败则**终止本阶段**，不得强行实现或编译。
- **禁止跳过/拆分 init**：`rn.py init` 失败后必须**完整重跑** `rn.py init`。**严禁**单独跑 codegen、ohpm、npm install 等子步骤冒充 init 成功。

---

## 1) 生成脚手架（必做）

在插件仓库根目录执行：

```bash
python ./.claude/skills/tool-ohos-plugin-repo/tool/rn.py create --template=plugin --module <module_type>
```

- **必须显式指定 `--module` 参数**：根据分析结果指定模块类型（`js-only`、`turbo`、`fabric`、`both`）。
- 可与 `02-planning.json` 的 `target_module_types` 对齐。
- **禁止**手搓 `ohos/` 目录。
- **必须执行 create**：即使 `ohos/` 目录已存在，也必须执行此命令（脚本会补充缺失模板）。
- **已存在 ohos**：脚本补充缺失模板，**不**默认删已有内容。
- **禁止盲目 `--force`**（会删整个 ohos）。
- **禁止跳过 create**：无论 ohos 是否存在、是否是符号链接、是否包含文件，都必须执行 `rn.py create` 确保脚手架完整。
- **Windows junction 损坏**：若 `ohos` 指向 `D:\rn\N` 但目标已删，`create` 会**自动删除损坏链接**并重建；**不要**手动 `rmdir ohos`（Git Bash 常失败），需要时用 `rm -rf ohos` 或 `cmd /c rmdir ohos`。
- **create 报 `Cannot create a file when that file already exists`**：多为损坏 junction 未清理；直接重跑 `create`（脚本已自动处理），或 `create --force`。
- **Agent 执行**：等待命令结束，**最长 30 分钟**，未满不得中断。
- **create 超时/未成功**：重新执行**同一条完整命令** `python {{SKILLS_DIR}}/rn-tool-ohos-plugin-repo/tool/rn.py create --template=plugin --module <module_type>`，**直到成功**。**未成功前不得进入下一步骤**（不得跳过 §2/§3，不得进入 init、实现或编译）。每次重跑前简要记录上一次失败原因；若连续重跑仍失败，按本节「create / init 失败」条规则终止本阶段。

---

## 2) 脚手架生成后检查（必做）

脚本将源码拷贝到 `ohos/src/`，须人工核对：

- ✅ `ohos/src/` 入口与源仓入口一致
- ✅ Spec 来自源仓 `specs/`，非 `lib/`、`dist/` 编译产物
- ✅ 目录结构来自源仓 `src/` 等，非备份目录

拷贝错误：**修复后重新 `create`**（或按输出提示处理），**禁止**带着错误拷贝进入 migrate/init。

---

## 3) 清理 ohos/src 下非鸿蒙平台代码（必做）

- 删除 `ohos/src/android/`、`ohos/src/ios/` 等（若有）
- 删除 `Platform.OS === 'ios'/'android'` 等分支，保留鸿蒙路径或直连 TurboModule
- **不修改**仓库根目录 `src/` 原始代码

示例：

```tsx
// 清理后
export const getCountryCode = (type?: Types) => {
  return NativeDeviceCountryModule.getCountryCode(type || 'any');
};
```

---

## 4) 安装依赖与 codegen（必做，在 verify 之后）

```bash
python ./.claude/skills/tool-ohos-plugin-repo/tool/rn.py init
```

- 安装 npm/ohpm、执行 codegen、生成 `generated/` 与占位实现
- **最长 20 分钟**，未满不得中断
- **失败**：
  1. 加载 `failure-lessons` Skill，读取 `.claude/skills/failure-lessons/lessons.json`，筛选 `stage: "coding-library"` 条目，对照本次终端输出检查是否命中已知错误模式
  2. 结合**本次 init 输出**修脚手架（见 `verify-migration.md` / `verify-non-migration.md`）
  3. 再**完整重跑** `rn.py init`

**init 成功后**才加载类型实现文档（`turbo-module.md` 等）；类型文档内**禁止**再次 create/init。
