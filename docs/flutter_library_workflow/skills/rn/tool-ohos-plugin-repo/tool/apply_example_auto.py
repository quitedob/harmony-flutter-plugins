#!/usr/bin/env python3
"""
与 tool-example/generate-example.py 步骤 1–10 一致（ohos 布局）。

- 模板来源：本 skill ``templates/example``（见 lib/generate_example_full.py）。
- 目标路径：``<插件根>/ohos/example``；库拷贝自 ``<插件根>/ohos/harmony/library``。
- 步骤 9/10 作用于 ``ohos/package.json`` 与 ``ohos/tsconfig*``。

**前置**：请先执行 ``apply_ohos_skeleton.py``，并确保已生成 ``./ohos/harmony/library``（推荐直接跑 ``generate_library_turbo.py`` 或 ``generate_library_fabric.py`` 的全流程）。

用法与原版相同：可传步骤号 ``1``…``10``；不传则跑全流程。仅额外支持 ``--plugin-root`` 和 ``--force``。
"""

from __future__ import annotations

import os
import sys

_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SKILL_ROOT not in sys.path:
    sys.path.insert(0, _SKILL_ROOT)


def _parse_args(argv: list[str]) -> tuple[str | None, bool, bool, list[str]]:
    """解析参数，返回 (plugin_root, force, light, steps)"""
    plugin_root: str | None = None
    force = False
    light = False
    steps: list[str] = []
    i = 0
    while i < len(argv):
        if argv[i] == "--plugin-root" and i + 1 < len(argv):
            plugin_root = argv[i + 1]
            i += 2
            continue
        if argv[i] == "--force":
            force = True
            i += 1
            continue
        if argv[i] == "--light":
            light = True
            i += 1
            continue
        # 其他参数视为步骤号
        steps.append(argv[i])
        i += 1
    return plugin_root, force, light, steps


def main() -> None:
    plugin_root, force, light, steps = _parse_args(sys.argv[1:])
    
    # 切换到 plugin_root 目录
    if plugin_root:
        os.chdir(os.path.abspath(plugin_root))
    
    # 默认步骤
    if not steps:
        steps = ["1", "9", "10"]
    
    # 设置 light 模式
    from lib.generate_example_full import set_light
    set_light(light)
    
    sys.argv = [sys.argv[0]] + steps
    from lib.generate_example_full import main as run_generate_example  # noqa: E402

    run_generate_example()


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
