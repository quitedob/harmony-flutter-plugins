"""Shared helpers for tool/*.py one-shot template copies."""

from __future__ import annotations

import os
import shutil
import subprocess
import sys
from typing import Callable

IgnoresLight = shutil.ignore_patterns("node_modules", "oh_modules", ".git", "build")
IgnoresFull = shutil.ignore_patterns(".git")


def _rebuild_npm_bins(dst: str, log: Callable[[str], None]) -> None:
    """macOS: 重建 node_modules/.bin/ 符号链接。

    shutil.copytree 默认解引用符号链接为普通文件，导致 .bin/ 中
    的 CLI 入口包含已失效的相对路径（如 ./tools/gracefulifyFs），
    引发 MODULE_NOT_FOUND。
    npm rebuild 会扫描 package.json 并重新创建正确的符号链接。
    """
    pkg_json = os.path.join(dst, "package.json")
    if not os.path.isfile(pkg_json):
        return
    try:
        subprocess.run(
            ["npm", "rebuild"],
            cwd=dst,
            capture_output=True,
            timeout=120,
        )
        log("  [macOS] npm rebuild: recreated .bin/ symlinks")
    except Exception as e:
        log(f"  [macOS] npm rebuild skipped: {e}")


def _is_reparse_point(path: str) -> bool:
    """判断路径是否为重解析点（junction/symlink）。"""
    if not os.path.isdir(path):
        return False
    if sys.platform != "win32":
        return os.path.islink(path)
    try:
        import ctypes
        attr = ctypes.windll.kernel32.GetFileAttributesW(path)
        return attr != -1 and (attr & 0x400) != 0
    except Exception:
        return False


def plugin_ohos_root(plugin_root: str, ohos_subdir: str = "ohos") -> str:
    return os.path.join(os.path.abspath(plugin_root), ohos_subdir)


def safe_rmtree(path: str, *, dry_run: bool, log: Callable[[str], None]) -> None:
    if not os.path.lexists(path):
        return
    if dry_run:
        log(f"  [dry-run] rmtree {path}")
        return
    shutil.rmtree(path)
    log(f"  removed {path}")


def copy_template_dir(
    src: str,
    dst: str,
    *,
    dry_run: bool,
    force: bool,
    log: Callable[[str], None],
    full: bool = False,
) -> None:
    """拷贝模板目录。

    full=True: 拷贝完整模板（含 node_modules），用于 create
    full=False: 轻量拷贝（忽略 node_modules），用于其他场景
    """
    if not os.path.isdir(src):
        raise FileNotFoundError(f"template missing: {src}")

    ignore = IgnoresFull if full else IgnoresLight

    if _is_reparse_point(dst):
        dst_real = os.path.realpath(dst)
        if dry_run:
            log(f"  [dry-run] copytree {src} -> {dst_real} (junction target, full={full})")
            return
        shutil.copytree(src, dst_real, ignore=ignore, dirs_exist_ok=True)
        log(f"  copied -> {dst_real} (junction target, full={full})")
        if full and sys.platform == "darwin":
            _rebuild_npm_bins(dst_real, log)
        return

    if os.path.exists(dst):
        if os.path.isdir(dst) and not os.listdir(dst):
            # 空目录（如 create_ohos_junction 刚创建的）直接合并，无需 --force
            pass
        elif not force:
            raise FileExistsError(
                f"destination already exists: {dst}\n  Pass --force to replace."
            )
        else:
            safe_rmtree(dst, dry_run=dry_run, log=log)
    if dry_run:
        log(f"  [dry-run] copytree {src} -> {dst} (full={full})")
        return
    parent = os.path.dirname(dst)
    if parent and not os.path.isdir(parent):
        os.makedirs(parent, exist_ok=True)
    shutil.copytree(src, dst, ignore=ignore, dirs_exist_ok=True)
    log(f"  copied -> {dst} (full={full})")
    if full and sys.platform == "darwin":
        _rebuild_npm_bins(dst, log)


def copy_template_file(
    src_dir: str,
    dst_dir: str,
    filename: str,
    *,
    log: Callable[[str], None] = print,
) -> None:
    """拷贝单个模板文件到目标目录。"""
    src_file = os.path.join(src_dir, filename)
    dst_file = os.path.join(dst_dir, filename)
    if not os.path.isfile(src_file):
        raise FileNotFoundError(f"template file missing: {src_file}")

    if _is_reparse_point(dst_dir):
        dst_dir_real = os.path.realpath(dst_dir)
        dst_file = os.path.join(dst_dir_real, filename)

    os.makedirs(os.path.dirname(dst_file), exist_ok=True)
    shutil.copy2(src_file, dst_file)
    log(f"  copied {filename} -> {dst_file}")
