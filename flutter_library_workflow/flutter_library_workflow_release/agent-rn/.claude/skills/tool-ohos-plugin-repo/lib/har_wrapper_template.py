"""init-template：har_wrapper 里 {{SHORT_NAME}} 临时改成 library，跑完 ohpm 再还原。"""

from __future__ import annotations

import os
import shutil
from collections.abc import Callable

_PLACEHOLDER = "{{SHORT_NAME}}"
_MODULE = "library"


def _files_to_patch(har_wrapper_dir: str) -> list[str]:
    return [
        p
        for p in (
            os.path.join(har_wrapper_dir, "build-profile.json5"),
            os.path.join(
                har_wrapper_dir, _MODULE, "src", "main", "cpp", "CMakeLists.txt"
            ),
        )
        if os.path.isfile(p)
    ]


def run_ohpm_on_har_wrapper_template(har_wrapper_dir: str, run: Callable[[], None]) -> None:
    """先 {{SHORT_NAME}}→library，执行 run()，finally 里必定还原（run 抛错也会还原）。"""
    bogus = os.path.join(har_wrapper_dir, _PLACEHOLDER)
    if os.path.isdir(bogus):
        shutil.rmtree(bogus)

    backups: dict[str, str] = {}
    try:
        for path in _files_to_patch(har_wrapper_dir):
            with open(path, encoding="utf-8") as f:
                text = f.read()
            if _PLACEHOLDER not in text:
                continue
            backups[path] = text
            with open(path, "w", encoding="utf-8", newline="\n") as f:
                f.write(text.replace(_PLACEHOLDER, _MODULE))
        run()
    finally:
        for path, text in backups.items():
            with open(path, "w", encoding="utf-8", newline="\n") as f:
                f.write(text)
