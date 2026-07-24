#!/usr/bin/env python3
"""
与 tool-example/generate_library_turbo.py 行为一致；实现位于 ``lib/generate_library_turbo.py``。

默认在未传 ``--root`` 时，使用 ``<cwd>/ohos``（请在**插件仓库根**执行，或传 ``--plugin-root``）。
其余参数（步骤号、``--dry-run``、``--no-legacy-peer-deps``、``--ets-dir``）与原版相同。
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
    import generate_library_turbo as lib_main  # noqa: E402

    lib_main.main()


def _configure_stdio_utf8() -> None:
    """Windows 终端/管道下按 UTF-8 输出中文与符号，避免 UnicodeEncodeError 崩溃。"""
    if not sys.platform.startswith("win"):
        return
    try:
        import ctypes
        ctypes.windll.kernel32.SetConsoleOutputCP(65001)
        ctypes.windll.kernel32.SetConsoleCP(65001)
    except Exception:
        pass
    for _name in ("stdout", "stderr"):
        _stream = getattr(sys, _name, None)
        if _stream is None or not hasattr(_stream, "reconfigure"):
            continue
        try:
            _stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, OSError, ValueError):
            pass


_configure_stdio_utf8()


if __name__ == "__main__":
    main()
