"""增量拷贝模板目录：逐文件检查缺失；node_modules / oh_modules 仅保证目录存在。"""

from __future__ import annotations

import os
import shutil
from typing import Callable

# 依赖安装目录：只检查目录是否存在，不递归比对/补充目录内文件
DEPENDENCY_DIR_NAMES = frozenset({"node_modules", "oh_modules"})

# 遍历时跳过（不进入、不逐文件补充）
SKIP_DIR_NAMES = frozenset({"node_modules", "oh_modules", "build", ".cxx", ".git"})


def copy_tree_incremental(
    src_dir: str,
    dst_dir: str,
    dry_run: bool = False,
    ignore_patterns: tuple[str, ...] = (),
    replacements: dict | None = None,
    log: Callable[[str], None] = print,
) -> int:
    """增量拷贝：目标已存在的文件不覆盖；其余路径逐文件补充。

    对 ``node_modules`` / ``oh_modules``：
    - 若目标侧目录不存在则 ``makedirs``（仅补目录）
    - 不进入该目录比对内部文件（由 init 的 npm/ohpm 安装负责）
    """
    if not os.path.isdir(src_dir):
        return 0

    ignore = set(ignore_patterns) | SKIP_DIR_NAMES
    copied = 0
    src_dir = os.path.normpath(src_dir)
    dst_dir = os.path.normpath(dst_dir)

    for dirpath, dirnames, filenames in os.walk(src_dir, topdown=True):
        rel_dir = os.path.relpath(dirpath, src_dir)
        parts = () if rel_dir in (".", "") else tuple(rel_dir.split(os.sep))

        if ".git" in parts:
            dirnames.clear()
            continue

        next_dirnames: list[str] = []
        for d in dirnames:
            if d.startswith("."):
                continue
            if d in ignore:
                continue
            if d in DEPENDENCY_DIR_NAMES:
                dst_dep = os.path.join(dst_dir, *parts, d) if parts else os.path.join(dst_dir, d)
                if not os.path.isdir(dst_dep):
                    if dry_run:
                        rel = os.path.relpath(dst_dep, dst_dir).replace("\\", "/")
                        log(f"  [dry-run] would mkdir {rel}/")
                    else:
                        os.makedirs(dst_dep, exist_ok=True)
                        rel = os.path.relpath(dst_dep, dst_dir).replace("\\", "/")
                        log(f"  补充缺失目录: {rel}/")
                    copied += 1
                continue
            next_dirnames.append(d)
        dirnames[:] = next_dirnames

        for fn in filenames:
            if fn.startswith("."):
                continue
            src_file = os.path.join(dirpath, fn)
            rel_path = os.path.relpath(src_file, src_dir)
            dst_file = os.path.join(dst_dir, rel_path)

            if os.path.isfile(dst_file):
                continue

            if dry_run:
                log(f"  [dry-run] would copy {rel_path.replace(chr(92), '/')}")
                copied += 1
                continue

            os.makedirs(os.path.dirname(dst_file), exist_ok=True)
            if replacements and fn in replacements:
                with open(src_file, "r", encoding="utf-8") as f:
                    content = f.read()
                for old, new in replacements[fn].items():
                    content = content.replace(old, new)
                with open(dst_file, "w", encoding="utf-8") as f:
                    f.write(content)
                log(f"  补充缺失文件（替换后）: {rel_path.replace(chr(92), '/')}")
            else:
                shutil.copy2(src_file, dst_file)
                log(f"  补充缺失文件: {rel_path.replace(chr(92), '/')}")
            copied += 1

    return copied


def ensure_dependency_dirs_under(root: str, dry_run: bool = False, log: Callable[[str], None] = print) -> int:
    """在已存在的目标树中，为所有应出现的 node_modules / oh_modules 仅补目录（不扫内部文件）。"""
    if not os.path.isdir(root):
        return 0

    created = 0
    root = os.path.normpath(root)
    for dirpath, dirnames, _filenames in os.walk(root, topdown=True):
        rel = os.path.relpath(dirpath, root)
        parts = () if rel in (".", "") else tuple(rel.split(os.sep))
        if ".git" in parts:
            dirnames.clear()
            continue
        for d in list(dirnames):
            if d not in DEPENDENCY_DIR_NAMES:
                continue
            dirnames.remove(d)
            dep_path = os.path.join(dirpath, d)
            if os.path.isdir(dep_path):
                continue
            if dry_run:
                rel_p = os.path.relpath(dep_path, root).replace("\\", "/")
                log(f"  [dry-run] would mkdir {rel_p}/")
            else:
                os.makedirs(dep_path, exist_ok=True)
                rel_p = os.path.relpath(dep_path, root).replace("\\", "/")
                log(f"  补充缺失目录: {rel_p}/")
            created += 1
    return created
