#!/usr/bin/env python3
"""
JS 类型（纯 JS，无原生实现）的 ohos 目录生成。

步骤：
1. 拷贝 ohos_skeleton_js 模板到 <插件根>/ohos/
2. 合并仓库根 package.json → ohos/package.json
3. 从 package.json 入口推断源码目录，拷贝 .ts/.tsx/.js/.jsx 到 ohos/src/
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import sys

_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SKILL_ROOT not in sys.path:
    sys.path.insert(0, _SKILL_ROOT)

from lib import package_merge, paths, template_apply  # noqa: E402


def _configure_stdio_utf8() -> None:
    """在 Windows 控制台避免中文 print 乱码。"""
    if not sys.platform.startswith('win'):
        return
    try:
        import ctypes
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


def read_package_json(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def infer_source_dir_from_package(root: str, pkg: dict) -> str:
    """从 package.json 推断源码目录（优先 bob 配置）。"""
    bob_cfg = pkg.get("react-native-builder-bob")
    if isinstance(bob_cfg, dict):
        src = bob_cfg.get("source")
        if isinstance(src, str) and src:
            cand = os.path.join(root, src)
            if os.path.isdir(cand):
                return src

    for field in ("source", "react-native"):
        val = pkg.get(field)
        if not isinstance(val, str):
            continue
        rel = val.lstrip("./")
        parts = rel.split("/")
        if parts and parts[0]:
            cand = os.path.join(root, parts[0])
            if os.path.isdir(cand):
                return parts[0]

    for field in ("module", "main"):
        val = pkg.get(field)
        if not isinstance(val, str):
            continue
        rel = val.lstrip("./")
        parts = rel.split("/")
        if parts and parts[0]:
            cand = os.path.join(root, parts[0])
            if os.path.isdir(cand):
                if parts[0].startswith("dist") or parts[0].startswith("lib") or parts[0].startswith("build"):
                    if os.path.isdir(os.path.join(root, "src")):
                        return "src"
                    if os.path.isdir(os.path.join(root, "source")):
                        return "source"
                else:
                    return parts[0]
    return ""


def find_source_dir(root: str) -> str:
    """查找源码目录：优先从 package.json 推断，其次检查常见目录名。"""
    pkg_path = os.path.join(root, "package.json")
    if os.path.isfile(pkg_path):
        pkg = read_package_json(pkg_path)
        inferred = infer_source_dir_from_package(root, pkg)
        if inferred:
            return inferred

    for cand in ("src", "lib", "js", "source", "Sources"):
        p = os.path.join(root, cand)
        if os.path.isdir(p):
            return cand
    return ""


def find_entry_file(src_dir: str, root: str, pkg: dict) -> str:
    """查找入口文件名。优先从 package.json 入口推断。"""
    for field in ("react-native", "source", "module", "main"):
        val = pkg.get(field)
        if not isinstance(val, str):
            continue
        rel = val.lstrip("./")
        if rel.endswith(".js") or rel.endswith(".jsx") or rel.endswith(".ts") or rel.endswith(".tsx"):
            p = os.path.join(root, rel)
            if os.path.isfile(p):
                return os.path.basename(rel)
        else:
            p = os.path.join(root, rel)
            if os.path.isdir(p):
                for name in ("index.js", "index.jsx", "index.ts", "index.tsx"):
                    fp = os.path.join(p, name)
                    if os.path.isfile(fp):
                        return name

    for name in ("index.js", "index.jsx", "index.ts", "index.tsx"):
        p = os.path.join(src_dir, name)
        if os.path.isfile(p):
            return name
    return ""


def _is_source_file(fn: str) -> bool:
    """判断是否为需要拷贝的源码文件（含静态资源）。"""
    code_exts = (".ts", ".tsx", ".js", ".jsx")
    asset_exts = (".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico")
    json_exts = (".json",)
    return fn.endswith(code_exts) or fn.endswith(asset_exts) or fn.endswith(json_exts)


def _copy_root_entry_file(root: str, ohos_dst: str, pkg: dict, dry_run: bool) -> tuple[bool, str]:
    """拷贝根目录入口文件（如 index.js）到 ohos/src/。返回 (是否拷贝, 入口文件名)。"""
    dst_src = os.path.join(ohos_dst, "src")
    for field in ("react-native", "source", "module", "main"):
        val = pkg.get(field)
        if not isinstance(val, str):
            continue
        rel = val.lstrip("./")
        if rel.startswith("src/") or rel.startswith("lib/") or rel.startswith("dist/"):
            continue
        if rel.endswith(".js") or rel.endswith(".jsx"):
            p = os.path.join(root, rel)
            if os.path.isfile(p):
                entry_name = os.path.basename(rel)
                dst_file = os.path.join(dst_src, entry_name)
                if dry_run:
                    print(f"  [dry-run] root entry {rel} -> ohos/src/{entry_name}")
                    return True, entry_name
                os.makedirs(dst_src, exist_ok=True)
                shutil.copy2(p, dst_file)
                print(f"  拷贝根目录入口: {rel} -> ohos/src/{entry_name}")
                return True, entry_name
    return False, ""


def copy_source_files(root: str, ohos_dst: str, dry_run: bool) -> tuple[int, bool, str]:
    """拷贝源码文件到 ohos/src/。返回 (文件数, 是否有TS, 入口文件名)。"""
    src_dir_name = find_source_dir(root)
    if not src_dir_name:
        print("  [warn] 未找到源码目录（src/lib/js 等），跳过拷贝")
        return 0, False, ""

    src_dir = os.path.join(root, src_dir_name)
    dst_src = os.path.join(ohos_dst, "src")
    print(f"  源码目录: {src_dir_name}/")
    print(f"  目标目录: ohos/src/")

    if dry_run:
        print("  [dry-run] 将拷贝文件")
        return 0, False, ""

    pkg = read_package_json(os.path.join(root, "package.json"))
    count = 0
    has_ts = False
    for dirpath, dirnames, filenames in os.walk(src_dir):
        dirnames[:] = [d for d in dirnames if not d.startswith(".") and d != "node_modules"]
        for fn in filenames:
            if _is_source_file(fn):
                if fn.endswith(".ts") or fn.endswith(".tsx"):
                    has_ts = True
                src_file = os.path.join(dirpath, fn)
                rel = os.path.relpath(src_file, src_dir)
                dst_file = os.path.join(dst_src, rel)
                os.makedirs(os.path.dirname(dst_file), exist_ok=True)
                shutil.copy2(src_file, dst_file)
                count += 1
    print(f"  已拷贝 {count} 个文件（含静态资源）")

    copied_root, root_entry = _copy_root_entry_file(root, ohos_dst, pkg, dry_run)
    if copied_root:
        count += 1

    entry = find_entry_file(src_dir, root, pkg)
    if root_entry and not entry:
        entry = root_entry
    return count, has_ts, entry


def prune_js_package(pkg_path: str, has_ts: bool, entry: str) -> None:
    """调整 JS 类型 package.json：有 TS 时添加 bob 编译配置，纯 JS 时简化配置。"""
    pkg = read_package_json(pkg_path)

    entry_name = entry if entry else "index.js"
    if entry_name.endswith(".tsx") or entry_name.endswith(".ts"):
        entry_base = entry_name[:-4]
    elif entry_name.endswith(".jsx") or entry_name.endswith(".js"):
        entry_base = entry_name[:-3]
    else:
        entry_base = entry_name

    if has_ts:
        print("  源码含 TS，添加 bob 编译配置")
        deps = pkg.get("devDependencies")
        if not isinstance(deps, dict):
            deps = {}
            pkg["devDependencies"] = deps
        deps["react-native-builder-bob"] = "^0.18.0"

        pkg["react-native-builder-bob"] = {
            "source": "src",
            "output": "dist",
            "targets": ["commonjs", "module", "typescript"]
        }

        scripts = pkg.get("scripts")
        if not isinstance(scripts, dict):
            scripts = {}
            pkg["scripts"] = scripts
        scripts["prepare"] = "tsc --noEmit && bob build"

        pkg["main"] = f"./dist/commonjs/{entry_base}.js"
        pkg["module"] = f"./dist/module/{entry_base}.js"
        pkg["react-native"] = f"./dist/module/{entry_base}.js"
        pkg["types"] = f"./dist/typescript/{entry_base}.d.ts"

        files = pkg.get("files")
        if isinstance(files, list):
            files = ["dist/", "src/", "README.md", "LICENSE"]
            pkg["files"] = files
        else:
            pkg["files"] = ["dist/", "src/", "README.md", "LICENSE"]
    else:
        print("  源码为纯 JS，简化配置（无 bob）")
        scripts = pkg.get("scripts")
        if isinstance(scripts, dict) and "prepare" in scripts:
            scripts = dict(scripts)
            del scripts["prepare"]
            pkg["scripts"] = scripts
        deps = pkg.get("devDependencies")
        if isinstance(deps, dict):
            deps = dict(deps)
            for k in ("react-native-builder-bob", "typescript", "@react-native/typescript-config"):
                if k in deps:
                    del deps[k]
            pkg["devDependencies"] = deps
        if "react-native-builder-bob" in pkg:
            del pkg["react-native-builder-bob"]

        pkg["main"] = f"./src/{entry_name}"
        pkg["module"] = f"./src/{entry_name}"
        pkg["react-native"] = f"./src/{entry_name}"
        if "types" in pkg:
            del pkg["types"]

        files = pkg.get("files")
        if isinstance(files, list):
            files = [f for f in files if not f.startswith("dist")]
            pkg["files"] = files
        else:
            pkg["files"] = ["src/", "README.md", "LICENSE"]

    with open(pkg_path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(pkg, f, indent=2, ensure_ascii=False)
        f.write("\n")


def main() -> None:
    _configure_stdio_utf8()
    p = argparse.ArgumentParser(description="JS 类型 ohos 目录生成")
    p.add_argument("--plugin-root", default=os.getcwd(), help="RN plugin repo root")
    p.add_argument("--force", action="store_true", help="Replace existing ohos/")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--skip-template", action="store_true", help="跳过模板拷贝（ohos 目录已存在）")
    args = p.parse_args()

    root = os.path.abspath(args.plugin_root)
    dst = os.path.join(root, "ohos")
    src = paths.templates_ohos_skeleton_js_dir()

    print("=== apply_ohos_js ===")

    if not args.skip_template:
        print(f"  src: {src}")
        print(f"  dst: {dst}")
        template_apply.copy_template_dir(src, dst, dry_run=args.dry_run, force=args.force, log=print, full=True)
    else:
        print(f"  dst: {dst}（跳过模板拷贝，目录已存在）")
        if not os.path.isdir(dst):
            raise SystemExit(f"ohos 目录不存在: {dst}")

    package_merge.merge_parent_into_ohos_package(root, os.path.join(dst, "package.json"))
    count, has_ts, entry = copy_source_files(root, dst, args.dry_run)
    prune_js_package(os.path.join(dst, "package.json"), has_ts, entry)

    print("\nDone: JS 类型 ohos 目录已生成。")


if __name__ == "__main__":
    main()