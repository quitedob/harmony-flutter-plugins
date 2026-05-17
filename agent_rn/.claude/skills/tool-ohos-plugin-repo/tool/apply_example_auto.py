#!/usr/bin/env python3
"""
与 tool-example/generate-example.py 步骤 1–10 一致（ohos 布局）。

- 模板来源：本 skill ``templates/example``（见 lib/generate_example_full.py）。
- 目标路径：``<插件根>/ohos/example``；库拷贝自 ``<插件根>/ohos/harmony/library``。
- 步骤 9/10 作用于 ``ohos/package.json`` 与 ``ohos/tsconfig*``。

**前置**：请先执行 ``apply_ohos_skeleton.py``，并确保已生成 ``./ohos/harmony/library``（推荐直接跑 ``generate_library_turbo.py`` 或 ``generate_library_fabric.py`` 的全流程）。

用法与原版相同：可传步骤号 ``1``…``10``；不传则跑全流程。仅额外支持 ``--plugin-root``。
"""

from __future__ import annotations

import os
import sys

_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SKILL_ROOT not in sys.path:
    sys.path.insert(0, _SKILL_ROOT)


def _shift_plugin_root(argv: list[str]) -> list[str]:
    root: str | None = None
    out: list[str] = []
    i = 0
    while i < len(argv):
        if argv[i] == "--plugin-root" and i + 1 < len(argv):
            root = argv[i + 1]
            i += 2
            continue
        out.append(argv[i])
        i += 1
    if root:
        os.chdir(os.path.abspath(root))
    return out


def main() -> None:
    rest = _shift_plugin_root(sys.argv[1:])
    if not rest:
        rest = ["1", "9", "10"]
    sys.argv = [sys.argv[0]] + rest
    from lib.generate_example_full import main as run_generate_example  # noqa: E402

    run_generate_example()


if __name__ == "__main__":
    main()
