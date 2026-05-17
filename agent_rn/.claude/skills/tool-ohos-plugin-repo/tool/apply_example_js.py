#!/usr/bin/env python3
"""
JS 类型（纯 JS，无原生实现）的 example 目录生成。

拷贝 example_js 模板到 ohos/example/（ohos 已在短路径，无需单独处理 junction）。
"""

from __future__ import annotations

import argparse
import ctypes
import json
import os
import sys

_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SKILL_ROOT not in sys.path:
    sys.path.insert(0, _SKILL_ROOT)

from lib import template_apply


def _configure_stdio_utf8() -> None:
    """在 Windows 控制台避免中文 print 乱码。"""
    if not sys.platform.startswith('win'):
        return
    try:
        ctypes.windll.kernel32.SetConsoleOutputCP(65001)
        ctypes.windll.kernel32.SetConsoleCP(65001)
    except Exception:
        pass
    for name in ('stdout', 'stderr'):
        stream = getattr(sys, name, None)
        if stream is None or not hasattr(stream, 'reconfigure'):
            continue
        try:
            stream.reconfigure(encoding='utf-8', errors='replace')
        except (AttributeError, OSError, ValueError):
            pass


def templates_example_js_dir() -> str:
    return os.path.join(_SKILL_ROOT, "templates", "example_js")


def read_json(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def write_json(path: str, data: dict) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


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


def _resolve_junction_path(path: str) -> str:
    """如果路径或其父目录是 junction，解析到真实路径。"""
    parts = []
    current = os.path.abspath(path)
    while current:
        if _is_reparse_point(current):
            return os.path.join(os.path.realpath(current), *parts)
        parts.append(os.path.basename(current))
        parent = os.path.dirname(current)
        if parent == current:
            break
        current = parent
    return path


def update_example_package_json(example_root: str, pkg_name: str, pkg_version: str) -> None:
    """更新 example/package.json，使用 tgz 方式依赖。"""
    pkg_json_path = os.path.join(example_root, "package.json")
    pkg_json = read_json(pkg_json_path)

    tgz_name = pkg_name.replace("@", "").replace("/", "-") + f"-{pkg_version}.tgz"
    pkg_json.setdefault("dependencies", {})
    pkg_json["dependencies"][pkg_name] = f"file:../{tgz_name}"
    print(f"  已更新 example/package.json: 添加依赖 {pkg_name} -> file:../{tgz_name}")

    write_json(pkg_json_path, pkg_json)


def main() -> None:
    _configure_stdio_utf8()
    p = argparse.ArgumentParser(description="JS 类型 example 目录生成")
    p.add_argument("--plugin-root", default=os.getcwd(), help="RN plugin repo root")
    p.add_argument("--force", action="store_true", help="Replace existing ohos/example")
    p.add_argument("--dry-run", action="store_true")
    args = p.parse_args()

    root = os.path.abspath(args.plugin_root)
    dst = os.path.join(root, "ohos", "example")
    src = templates_example_js_dir()

    dst_real = _resolve_junction_path(dst)

    print("=== apply_example_js ===")
    print(f"  src: {src}")
    print(f"  dst: {dst}")
    if dst_real != dst:
        print(f"  dst (junction 解析): {dst_real}")

    ohos_pkg_path = os.path.join(root, "ohos", "package.json")
    if not os.path.isfile(ohos_pkg_path):
        print(f"  [warn] 未找到 ohos/package.json: {ohos_pkg_path}")
        pkg_name = "unknown-package"
        pkg_version = "0.0.0"
    else:
        pkg = read_json(ohos_pkg_path)
        pkg_name = pkg.get("name", "unknown-package")
        pkg_version = pkg.get("version", "0.0.0")

    print(f"  package: {pkg_name}@{pkg_version}")

    if args.dry_run:
        print(f"  [dry-run] 将拷贝 example_js 模板并更新 package.json")
        return

    target_dir = dst_real if dst_real != dst else dst
    
    template_apply.copy_template_dir(
        src, target_dir,
        dry_run=args.dry_run,
        force=args.force,
        log=print,
        full=True
    )
    if args.dry_run:
        return

    update_example_package_json(dst, pkg_name, pkg_version)

    print("\nDone: JS 类型 example 目录已生成。")


if __name__ == "__main__":
    main()