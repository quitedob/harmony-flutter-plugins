# tool-ohos-plugin-repo

自包含 skill：**模板**在 `templates/`，**可执行入口**在 `tool/`；大体量逻辑在 `lib/`（vendored，与 `tool-example` 对齐）。

下文「**插件根**」指 RN 插件仓库根目录（根目录有 `package.json`、通常有 `src/`）。以下命令默认在插件根打开终端执行；若你在别的目录，请加上 **`--plugin-root <插件根的绝对路径>`**（各脚本支持情况见各节）。

下文命令里的路径以 **插件根** 下的相对路径为准（与多数 RN 插件仓 `.claude` 链一致）：

`.claude/skills/tool-ohos-plugin-repo/tool/`

若你本机 `.claude` 不在插件根，请改成实际路径。

---

## 一键命令行（`rn.py`，类似 `flutter create/build`）

如果你不想手动分步跑 A/B/D，可以直接用聚合 CLI：

```bash
# create：一键生成 ohos/ + ohos/harmony/library + ohos/example
python .claude/skills/tool-ohos-plugin-repo/tool/rn.py create --template=plugin

# build hap：npm pack（tgz）→ example npm install → bundle → ohpm → hvigorw assembleHap（默认不跑 apply_example_auto）
python .claude/skills/tool-ohos-plugin-repo/tool/rn.py build hap
```

**可选参数**：

- `--plugin-root <路径>`：插件根不是当前目录时指定（两条命令都支持）。
- `create --module auto|none|turbo|fabric|both`：默认 `auto`（扫描 `--plugin-root` 下的 `src/` 自动判断 Turbo/Fabric；若未检测到则降级为 `none`，跳过 `generate_library_*` 仅落盘模板）。
- `create --force`：覆盖已有 `ohos/`（会先删除再生成）。
- `build hap --legacy-peer-deps`：`npm install` 时追加 `--legacy-peer-deps`。
- `build hap --apply-example`：先执行 `apply_example_auto.py` 从模板重写 `ohos/example`（默认**不**执行，避免覆盖你在 Example 里改的代码）。
- `build hap --full`：关闭 npm install / ohpm / bundle 的指纹跳过，相当于全量重装与重打 bundle（成功仍会刷新 `ohos/.rn-build/hap-cache.json`）。

> 约定：Example 的鸿蒙工程目录名为 **`ohos/example/harmony`**（与库侧 `ohos/harmony/library` 对齐）。

---

## 手动执行总览（推荐顺序）

按顺序做即可；**前一步成功落盘**再执行下一步。

| 步骤 | 做什么 | 脚本 |
|------|--------|------|
| A | 生成 `ohos/` 骨架 + 合并根 `package.json` + 根 `src`/`specs` 同步到 `ohos/src` | `apply_ohos_skeleton.py` |
| B | 在 `ohos/` 里跑 library 脚手架（会落 `ohos/harmony/` 并生成 Turbo/Fabric 相关产物，**二选一**） | `generate_library_turbo.py` **或** `generate_library_fabric.py` |
| D | 生成/更新 `ohos/example`（与旧 `generate-example` 步骤 1–10 一致） | `apply_example_auto.py` |
| E | 按脚本末尾提示，在 `ohos/`、`ohos/example` 里手动 `npm install` / `npm run codegen` / `npm run dev` 等 | （不进本 README） |

---

## A. 落盘 `ohos/` 骨架（`ohos_skeleton` 模板）

**作用**（一步做完）：

1. 把 `templates/ohos_skeleton/` 拷到 `<插件根>/ohos/`（含 `package.json` 里 `xxx` 占位等）。
2. 把**仓库根** `package.json` 常用字段合并进 `ohos/package.json`（替换 `xxx` 等）。
3. 扫描根仓 `src/` 中 Turbo/Fabric 注册文件 → `ohos/src/specs/v1/`。
4. 拷贝根仓其余 `.ts/.tsx` → `ohos/src/`（保持相对路径），并把根入口写成 `ohos/src/index.ts` 或 `index.tsx`。
5. 对 `ohos/src` 跑 `import_rewrite`（当前多为占位，可扩展）。

**首次建议先看 dry-run**（仅模拟**拷贝**；合并与源码步骤不写入磁盘，脚本末尾会列出若去掉 `--dry-run` 将执行的后续项）：

```bash
python .claude/skills/tool-ohos-plugin-repo/tool/apply_ohos_skeleton.py --dry-run
```

**正式写入**（若已有 `ohos/` 且要覆盖，必须带 **`--force`**，会先删掉整个 `ohos/` 再拷贝，然后执行上文步骤 2–5）：

```bash
python .claude/skills/tool-ohos-plugin-repo/tool/apply_ohos_skeleton.py --force
```

**可选参数**：

- `--plugin-root <路径>`：插件根不是当前目录时指定。
- `--ohos-subdir <名>`：默认 `ohos`；只有当你不用 `ohos` 这个目录名时才需要改。

---

## B. Library 脚手架（`generate_library_*`，与旧 skill 步骤 1–10 一致）

**前置条件**：至少已完成 **A**（`ohos/package.json` 与 `ohos/src/` 已就绪）。

**在插件根执行**时，脚本若**未**传 `--root`，会自动使用 **`<插件根>/ohos`** 作为库根（等价旧文档里的「在 ohos 子包里做鸿蒙库」）。

**纯 Turbo 模块**（与旧 `generate_library_turbo.py` 相同）：

```bash
# 全流程 1–10
python .claude/skills/tool-ohos-plugin-repo/tool/generate_library_turbo.py

# 只看计划不写盘、不跑 npm
python .claude/skills/tool-ohos-plugin-repo/tool/generate_library_turbo.py --dry-run

# 只跑若干步（示例：2、3、5）
python .claude/skills/tool-ohos-plugin-repo/tool/generate_library_turbo.py 2 3 5
```

**含 Fabric**（与旧 `generate_library_fabric.py` 相同）：

```bash
python .claude/skills/tool-ohos-plugin-repo/tool/generate_library_fabric.py
python .claude/skills/tool-ohos-plugin-repo/tool/generate_library_fabric.py --dry-run
```

**常用附加参数**（与原版一致）：

- `--root <路径>`：库根目录。不写则本 skill 包装脚本会设为 **当前目录下的 `ohos`**。  
  **若你的 Turbo/Fabric Spec 只在仓库根 `src/`，不在 `ohos/src/`**，必须显式：

  ```bash
  python .claude/skills/tool-ohos-plugin-repo/tool/generate_library_turbo.py --root .
  ```

- `--plugin-root <插件根>`：先切换到插件根再解析默认 `--root`；与「在插件根执行」二选一即可。
- `--no-legacy-peer-deps`：步骤 4 安装依赖时不加 `--legacy-peer-deps`。
- `--ets-dir <路径>`：覆盖默认 ETS 输出目录（一般不用）。

步骤 4、6 会执行 **npm**；请保证本机 Node/npm 可用。完成后按终端里打印的提示检查/补全生成的 `*TurboModule.ts` 等。

---

## D. Example 工程（`apply_example_auto`，与旧 `generate-example` 步骤 1–10 一致）

**前置条件**：建议 **A、B** 已完成；至少需存在 **`ohos/harmony/library`**（会由 `generate_library_*` 的模板/脚手架步骤准备好，步骤 3 会从这里拷到 `example`）。

**在插件根**执行（与旧脚本一样可带步骤号）：

```bash
# 全流程 1–10
python .claude/skills/tool-ohos-plugin-repo/tool/apply_example_auto.py

# 只跑第 7、8 步（示例）
python .claude/skills/tool-ohos-plugin-repo/tool/apply_example_auto.py 7 8
```

**不在插件根时**：

```bash
python .claude/skills/tool-ohos-plugin-repo/tool/apply_example_auto.py --plugin-root D:\path\to\your-plugin
```

（其余参数与旧 `generate-example.py` 相同；**没有** `--force` / `--dry-run`。）

执行结束后，终端会打印后续建议在 **`ohos/`** 下 **`npm pack`**、在 **`ohos/example/`** 下 **`npm install` / `npm run dev`** 等，按提示继续即可。

---

## `lib/`（vendored，与上游 diff 合并）

| 文件 | 来源 |
|------|------|
| `generate_example_full.py` | `tool-example/generate-example.py` |
| `generate_library_common.py` | `tool-example/generate_library_common.py` |
| `generate_library_turbo.py` | `tool-example/generate_library_turbo.py` |
| `generate_library_fabric.py` | `tool-example/generate_library_fabric.py` |

`generate_library_common.py` 内 **`TOOL_EXAMPLE_DIR`** 指向本 skill 的 **`templates/`**（内置 `harmony/`）。上游脚本更新时，应对照 **diff 合并**到本目录对应文件。

另有 `paths`、`package_merge`、`template_apply`、`spec_scan`、`source_copy` 等辅助模块。

---

## 迁移注意

从老 `tool-example` 更新内置模板或 vendored 脚本时：**只读复制**；不要改老 skill 目录。
