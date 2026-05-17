# tool-ohos-plugin-repo

在 RN 插件仓库中，用 **`tool/`** 脚本落盘 **`templates/`** 三模板，并在 **`ohos/`** 下跑与 **`tool-example`** 对齐的 **library / example** 全流程。

## `tool/` 入口

| 脚本 | 说明 |
|------|------|
| `apply_ohos_skeleton.py` | 骨架 → `<plugin>/ohos/`，并合并根 `package.json`、同步根 `src`/specs、`import_rewrite` |
| `apply_example_auto.py` | 等同 `generate-example.py` **步骤 1–10**（`lib/generate_example_full.py`） |
| `generate_library_turbo.py` | 等同 `generate_library_turbo.py`（`lib/…`）；默认 `--root <cwd>/ohos` |
| `generate_library_fabric.py` | 等同 `generate_library_fabric.py`（`lib/…`）；默认 `--root <cwd>/ohos` |

**顺序建议**：先两个 `apply_*` 落模板 → 按模块选 **`generate_library_turbo`** 或 **`generate_library_fabric`**（步骤 1–10）→ 再 **`apply_example_auto`**。

## 常用命令（插件根）

```bash
python .claude/skills/tool-ohos-plugin-repo/tool/apply_ohos_skeleton.py --force
python .claude/skills/tool-ohos-plugin-repo/tool/generate_library_turbo.py
python .claude/skills/tool-ohos-plugin-repo/tool/generate_library_fabric.py
python .claude/skills/tool-ohos-plugin-repo/tool/apply_example_auto.py
```

路径按各仓库 `.claude` 实际位置调整。`generate_library_*` 与 `apply_example_auto` 均可加 **`--plugin-root`**；`generate_library_*` 未写 **`--root`** 时默认为 **`<cwd>/ohos`**。

聚合命令 **`rn.py build hap`**：默认 **不** 调用 `apply_example_auto.py`（避免覆盖已改的 Example）；需要时用 **`--apply-example`**。

## 之后

按各脚本结束时的提示在 `ohos/`、`ohos/example` 内执行 `npm install`、`npm run codegen`、`npm run dev` 等。
