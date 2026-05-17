"""Resolve directories inside this skill (templates) and the plugin repo."""

from __future__ import annotations

import os
from typing import Final

_OHOS_SUBDIR: Final[str] = "ohos"


def skill_dir() -> str:
    """Directory of tool-ohos-plugin-repo (parent of lib/)."""
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def templates_dir() -> str:
    return os.path.join(skill_dir(), "templates")


def templates_ohos_skeleton_dir() -> str:
    return os.path.join(templates_dir(), "ohos_skeleton")


def templates_ohos_skeleton_js_dir() -> str:
    return os.path.join(templates_dir(), "ohos_skeleton_js")


def templates_harmony_dir() -> str:
    return os.path.join(templates_dir(), "harmony")


def templates_example_dir() -> str:
    return os.path.join(templates_dir(), "example")


def plugin_ohos_dir(plugin_root: str) -> str:
    """Absolute path to <plugin_root>/ohos."""
    return os.path.join(os.path.abspath(plugin_root), _OHOS_SUBDIR)
