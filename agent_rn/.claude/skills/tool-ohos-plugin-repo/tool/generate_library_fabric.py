#!/usr/bin/env python3
"""
与 tool-example/generate_library_fabric.py 行为一致；实现位于 ``lib/generate_library_fabric.py``。

默认在未传 ``--root`` 时，使用 ``<cwd>/ohos``（请在**插件仓库根**执行，或传 ``--plugin-root``）。
其余参数与原版相同。
"""

from __future__ import annotations

import os
import sys

_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _strip_plugin_root(argv: list[str]) -> list[str]:
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
    sys.path.insert(0, os.path.join(_SKILL_ROOT, "lib"))
    rest = _strip_plugin_root(sys.argv[1:])
    sys.argv = [sys.argv[0]] + rest
    if "--root" not in sys.argv[1:]:
        sys.argv.insert(1, "--root")
        sys.argv.insert(2, os.path.abspath(os.path.join(os.getcwd(), "ohos")))
    import generate_library_fabric as lib_main  # noqa: E402

    lib_main.main()


if __name__ == "__main__":
    main()
