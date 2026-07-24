# 内置三模板

| 目录 | 含义 |
|------|------|
| `ohos_skeleton/` | RN 鸿蒙 npm 包骨架（package.json `xxx` 占位、tsconfig、babel、`src/specs`） |
| `harmony/` | 鸿蒙 `harmony` 工程树（含 `library`） |
| `example/` | RN Example + 内嵌 `harmony` 壳工程 |

在 **`../tool/`** 中执行：先 **`apply_ohos_skeleton.py`** 生成 `ohos/`，再运行 **`generate_library_turbo.py` 或 `generate_library_fabric.py`**（其内部会落 `ohos/harmony/` 模板并生成/更新 `harmony/library`），最后再执行 **`apply_example_auto.py`**。其中 **`apply_example_auto.py` 与 `tool-example/generate-example.py` 步骤 1–10 等价**（实现为 `../lib/generate_example_full.py`），在 **`ohos/example`** 上完成模板拷贝、依赖、`harmony/library` 同步、CMake/ETS 注册等。

## 与上游同步

若上游 `rn_template` 或 RNOH 模板有更新：将新内容 **只读复制** 覆盖本目录对应树后提交本仓库；勿编辑已计划删除的 `tool-example` 源目录。
