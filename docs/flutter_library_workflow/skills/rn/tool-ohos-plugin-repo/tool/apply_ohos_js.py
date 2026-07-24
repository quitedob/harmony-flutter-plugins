#!/usr/bin/env python3
"""
JS 类型（纯 JS，无原生实现）的 ohos 目录生成。

步骤：
1. 拷贝 ohos 模板到 <插件根>/ohos/
2. 合并仓库根 package.json → ohos/package.json
3. 使用 source_resolver 解析源码文件并拷贝到 ohos/src/
"""

from __future__ import annotations

import argparse
import json
import os
import sys

_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SKILL_ROOT not in sys.path:
    sys.path.insert(0, _SKILL_ROOT)

from lib import package_merge, paths, source_resolver, template_apply  # noqa: E402


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


def _read_package_json(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _detect_has_ts(files: list[str]) -> bool:
    """检测源文件中是否有 TypeScript 源码文件（不含 .d.ts）。"""
    for f in files:
        fn = os.path.basename(f)
        if fn.endswith(".d.ts"):
            continue
        ext = os.path.splitext(fn)[1].lower()
        if ext in (".ts", ".tsx"):
            return True
    return False


def _detect_entry_name(pkg: dict, files: list[str], root: str) -> str:
    """检测入口文件名。"""
    for field in ("react-native", "source", "module", "main"):
        val = pkg.get(field)
        if not isinstance(val, str):
            continue
        rel = val.lstrip("./")
        
        for ext in (".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"):
            entry_rel = rel if rel.endswith(ext) else rel + ext
            entry_path = os.path.join(root, entry_rel)
            if entry_path in files or os.path.isfile(entry_path):
                return os.path.basename(entry_rel)
        
        if rel.endswith(".ts") or rel.endswith(".tsx") or rel.endswith(".js") or rel.endswith(".jsx"):
            return os.path.basename(rel)
    
    for f in files:
        fn = os.path.basename(f)
        if fn.startswith("index."):
            ext = os.path.splitext(fn)[1].lower()
            if ext in (".ts", ".tsx", ".js", ".jsx"):
                return fn
    
    return "index.js"


def _prune_js_package(pkg_path: str, has_ts: bool, entry: str) -> None:
    """调整 JS 类型 package.json：有 TS 时添加 bob 编译配置，纯 JS 时简化配置。"""
    pkg = _read_package_json(pkg_path)

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
    src = paths.templates_ohos_dir()

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

    pkg = _read_package_json(os.path.join(root, "package.json"))
    
    print("\n--- resolve source files ---")
    files, source_dir = source_resolver.resolve_source_files(root, pkg)
    
    if files:
        print(f"  source_dir: {source_dir or '根目录'}")
        print(f"  resolved {len(files)} files")
        source_resolver.copy_source_to_ohos(root, dst, files, source_dir, pkg, args.dry_run)
    else:
        print("  [warn] 未找到源码文件")

    has_ts = _detect_has_ts(files)
    entry = _detect_entry_name(pkg, files, root)
    
    print("\n--- adjust package.json ---")
    _prune_js_package(os.path.join(dst, "package.json"), has_ts, entry)

    print("\nDone: JS 类型 ohos 目录已生成。")


if __name__ == "__main__":
    main()