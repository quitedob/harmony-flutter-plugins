#!/usr/bin/env python3
from __future__ import annotations

import argparse
import glob
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Iterable
from shutil import which


_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SKILL_ROOT not in sys.path:
    sys.path.insert(0, _SKILL_ROOT)

from lib import spec_scan  # noqa: E402
from lib import create_native, create_js_only, init_native, init_js_only, build_hap_native, build_hap_js_only  # noqa: E402

_print_lock = threading.Lock()


def _thread_safe_print(msg: str) -> None:
    with _print_lock:
        print(msg)


def _abs(path: str) -> str:
    return os.path.abspath(path)


def _run(
    argv: list[str],
    *,
    cwd: str,
    env: dict[str, str] | None = None,
    quiet: bool = False,
) -> None:
    resolved = list(argv)
    if os.name == "nt" and resolved:
        if os.path.splitext(resolved[0])[1] == "":
            cand = which(resolved[0])
            if not cand:
                for ext in (".cmd", ".bat", ".exe", ".ps1"):
                    cand = which(resolved[0] + ext)
                    if cand:
                        break
            if cand:
                resolved[0] = cand
    _thread_safe_print(f"\n$ (cwd={cwd}) {' '.join(resolved)}")
    if quiet:
        result = subprocess.run(
            resolved,
            cwd=cwd,
            env=env,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        if result.returncode != 0:
            if result.stdout:
                filtered = '\n'.join(line for line in result.stdout.splitlines() if 'WARN: ArkTS:WARN' not in line)
                if filtered:
                    _thread_safe_print(filtered)
            if result.stderr:
                filtered = '\n'.join(line for line in result.stderr.splitlines() if 'WARN: ArkTS:WARN' not in line)
                if filtered:
                    _thread_safe_print(filtered)
            raise subprocess.CalledProcessError(result.returncode, resolved, result.stdout, result.stderr)
    else:
        subprocess.run(resolved, cwd=cwd, env=env, check=True)


def _run_python(script_abs: str, args: Iterable[str], *, cwd: str, quiet: bool = False) -> None:
    _run([sys.executable, script_abs, *list(args)], cwd=cwd, quiet=quiet)


def _read_json(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _write_json(path: str, data: dict) -> None:
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False, sort_keys=True)


def _pick_example_bundle_script(example_root: str) -> str:
    pkg = _read_json(os.path.join(example_root, "package.json"))
    scripts = (pkg.get("scripts") or {}) if isinstance(pkg, dict) else {}
    if not isinstance(scripts, dict):
        scripts = {}
    for k in ("build:harmony", "bundle:harmony", "dev", "start"):
        if k in scripts:
            return k
    raise SystemExit(
        "无法确定如何生成 bundle：example/package.json scripts 中未找到 build:harmony/bundle:harmony/dev/start"
    )


def _find_hvigorw(harmony_dir: str) -> str:
    for name in ("hvigorw.bat", "hvigorw.cmd", "hvigorw.ps1", "hvigorw"):
        p = os.path.join(harmony_dir, name)
        if os.path.exists(p):
            return p
    return "hvigorw"


def _sha256_file(path: str) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def _sha256_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


_FILE_DEP_RE = re.compile(r'"file:([^"]+)"')


def _example_npm_fingerprint(example_root: str) -> str:
    parts: list[str] = []
    pkg_path = os.path.join(example_root, "package.json")
    if not os.path.isfile(pkg_path):
        return ""
    with open(pkg_path, "r", encoding="utf-8") as f:
        pkg_body = f.read()
    parts.append(_sha256_text(pkg_body))
    for name in ("package-lock.json", "npm-shrinkwrap.json", "yarn.lock", "pnpm-lock.yaml"):
        p = os.path.join(example_root, name)
        if os.path.isfile(p):
            parts.append(f"{name}:{_sha256_file(p)}")
    for m in _FILE_DEP_RE.finditer(pkg_body):
        raw = m.group(1).strip()
        if not raw:
            continue
        dep_path = raw
        if not os.path.isabs(dep_path):
            dep_path = os.path.normpath(os.path.join(example_root, dep_path))
        if os.path.isfile(dep_path):
            st = os.stat(dep_path)
            parts.append(f"file:{dep_path}:{st.st_mtime_ns}:{st.st_size}")
    return "|".join(parts)


def _ohpm_fingerprint(harmony_dir: str) -> str:
    parts: list[str] = []
    for name in ("oh-package.json5", "oh-package-lock.json5"):
        p = os.path.join(harmony_dir, name)
        if os.path.isfile(p):
            parts.append(f"{name}:{_sha256_file(p)}")
    return "|".join(parts) if parts else ""


def _build_hap_cache_dir(plugin_root: str) -> str:
    return os.path.join(plugin_root, "ohos", ".rn-build")


def _build_hap_cache_path(plugin_root: str) -> str:
    return os.path.join(_build_hap_cache_dir(plugin_root), "hap-cache.json")


def _migrate_legacy_hap_cache_if_needed(plugin_root: str) -> None:
    new_path = _build_hap_cache_path(plugin_root)
    if os.path.isfile(new_path):
        return
    legacy = os.path.join(plugin_root, "ohos", ".rn-build-hap-cache.json")
    if os.path.isfile(legacy):
        os.makedirs(os.path.dirname(new_path), exist_ok=True)
        shutil.move(legacy, new_path)


def _read_build_cache(path: str) -> dict:
    if not os.path.isfile(path):
        return {}
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data if isinstance(data, dict) else {}
    except (json.JSONDecodeError, OSError):
        return {}


def _write_build_cache(path: str, data: dict) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, sort_keys=True)


def _tree_fingerprint(
    root: str,
    *,
    exclude_dirs: frozenset[str],
    exclude_file_suffixes: tuple[str, ...] = (".tgz",),
) -> str:
    lines: list[str] = []
    root = os.path.abspath(root)
    if not os.path.isdir(root):
        return ""
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [
            d
            for d in dirnames
            if d not in exclude_dirs and not d.startswith(".") and d != "__pycache__"
        ]
        rel_dir = os.path.relpath(dirpath, root)
        if rel_dir == ".":
            rel_dir = ""
        for fn in sorted(filenames):
            if fn.startswith("."):
                continue
            low = fn.lower()
            if any(low.endswith(suf) for suf in exclude_file_suffixes):
                continue
            p = os.path.join(dirpath, fn)
            if not os.path.isfile(p):
                continue
            rel = os.path.join(rel_dir, fn).replace("\\", "/") if rel_dir else fn.replace("\\", "/")
            st = os.stat(p)
            lines.append(f"{rel}:{st.st_mtime_ns}:{st.st_size}")
    return _sha256_text("\n".join(lines))


def _apply_example_inputs_fingerprint(plugin_root: str) -> str:
    tpl = os.path.join(_SKILL_ROOT, "templates", "example")
    lib = os.path.join(plugin_root, "ohos", "harmony", "library")
    a = _tree_fingerprint(tpl, exclude_dirs=frozenset({"node_modules", "harmony"}))
    b = _tree_fingerprint(
        lib,
        exclude_dirs=frozenset({"build", ".cxx", "oh_modules", "node_modules", ".git", "libs"}),
    )
    if not a or not b:
        return ""
    return _sha256_text(a + "\n" + b)


def _path_under_root(root_abs: str, path: str) -> bool:
    try:
        return os.path.commonpath([root_abs, os.path.abspath(path)]) == root_abs
    except ValueError:
        return False


def _append_pack_file_line(
    root_abs: str,
    file_path: str,
    lines: list[str],
    seen: set[str],
) -> None:
    p = os.path.abspath(file_path)
    if p in seen or not os.path.isfile(p) or not _path_under_root(root_abs, p):
        return
    seen.add(p)
    rel_f = os.path.relpath(p, root_abs).replace("\\", "/")
    st = os.stat(p)
    lines.append(f"{rel_f}:{st.st_mtime_ns}:{st.st_size}")


def _ohos_pack_inputs_fingerprint_from_files(root_abs: str, files_field: list) -> str:
    pkg_json = os.path.join(root_abs, "package.json")
    lines: list[str] = [f"package.json:{_sha256_file(pkg_json)}"]
    seen: set[str] = set()
    for raw in files_field:
        if not isinstance(raw, str) or not raw.strip():
            continue
        entry = raw.strip().replace("\\", "/")
        if any(c in entry for c in "*?[]"):
            pattern = os.path.normpath(os.path.join(root_abs, entry))
            for p in glob.glob(pattern, recursive=True):
                if os.path.isfile(p):
                    _append_pack_file_line(root_abs, p, lines, seen)
                elif os.path.isdir(p):
                    for dirpath, dirnames, filenames in os.walk(p):
                        dirnames[:] = [
                            d
                            for d in dirnames
                            if d not in ("node_modules", ".git", "__pycache__") and not d.startswith(".")
                        ]
                        for fn in sorted(filenames):
                            if fn.startswith("."):
                                continue
                            _append_pack_file_line(root_abs, os.path.join(dirpath, fn), lines, seen)
            continue
        full = os.path.normpath(os.path.join(root_abs, entry))
        if os.path.isdir(full):
            for dirpath, dirnames, filenames in os.walk(full):
                dirnames[:] = [
                    d
                    for d in dirnames
                    if d not in ("node_modules", ".git", "__pycache__") and not d.startswith(".")
                ]
                for fn in sorted(filenames):
                    if fn.startswith("."):
                        continue
                    _append_pack_file_line(root_abs, os.path.join(dirpath, fn), lines, seen)
        elif os.path.isfile(full):
            _append_pack_file_line(root_abs, full, lines, seen)
    return _sha256_text("\n".join(sorted(lines)))


def _ohos_pack_inputs_fingerprint_walk(ohos_pkg_dir: str) -> str:
    if not os.path.isdir(ohos_pkg_dir):
        return ""
    pkg = os.path.join(ohos_pkg_dir, "package.json")
    if not os.path.isfile(pkg):
        return ""
    lines: list[str] = [f"package.json:{_sha256_file(pkg)}"]
    root = os.path.abspath(ohos_pkg_dir)
    for dirpath, dirnames, filenames in os.walk(root):
        if "example" in dirnames:
            dirnames.remove("example")
        dirnames[:] = [
            d
            for d in dirnames
            if d not in ("node_modules", ".git", "__pycache__") and not d.startswith(".")
        ]
        for fn in sorted(filenames):
            if fn.startswith("."):
                continue
            low = fn.lower()
            if low.endswith(".tgz"):
                continue
            p = os.path.join(dirpath, fn)
            if not os.path.isfile(p):
                continue
            rel_f = os.path.relpath(p, root).replace("\\", "/")
            st = os.stat(p)
            lines.append(f"{rel_f}:{st.st_mtime_ns}:{st.st_size}")
    return _sha256_text("\n".join(sorted(lines)))


def _ohos_pack_inputs_fingerprint(ohos_pkg_dir: str) -> str:
    if not os.path.isdir(ohos_pkg_dir):
        return ""
    pkg_path = os.path.join(ohos_pkg_dir, "package.json")
    if not os.path.isfile(pkg_path):
        return ""
    pkg = _read_json(pkg_path)
    files_field = pkg.get("files")
    root_abs = os.path.abspath(ohos_pkg_dir)
    if isinstance(files_field, list) and any(isinstance(x, str) and x.strip() for x in files_field):
        return _ohos_pack_inputs_fingerprint_from_files(root_abs, files_field)
    return _ohos_pack_inputs_fingerprint_walk(ohos_pkg_dir)


def _example_bundle_sources_fingerprint(example_root: str) -> str:
    skip_dirs = frozenset(
        {
            "node_modules",
            "harmony",
            "android",
            "ios",
            "build",
            ".git",
            "coverage",
            "__pycache__",
        }
    )
    exts = frozenset({".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".json"})
    lines: list[str] = []
    root = os.path.abspath(example_root)
    if not os.path.isdir(root):
        return ""
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in skip_dirs and not d.startswith(".")]
        rel_dir = os.path.relpath(dirpath, root)
        if rel_dir == ".":
            rel_dir = ""
        for fn in sorted(filenames):
            if fn.startswith("."):
                continue
            ext = os.path.splitext(fn)[1].lower()
            if ext not in exts:
                continue
            p = os.path.join(dirpath, fn)
            if not os.path.isfile(p):
                continue
            rel = os.path.join(rel_dir, fn).replace("\\", "/") if rel_dir else fn.replace("\\", "/")
            st = os.stat(p)
            lines.append(f"{rel}:{st.st_mtime_ns}:{st.st_size}")
    return _sha256_text("\n".join(lines))


def _auto_module_kind(plugin_root: str) -> str:
    hits, _inferred_source = spec_scan.scan_spec_sources_global(plugin_root)
    has_turbo = any(h.turbo_names for h in hits)
    has_fabric = any(h.fabric_names for h in hits)
    if has_turbo and has_fabric:
        return "both"
    if has_fabric:
        return "fabric"
    if has_turbo:
        return "turbo"
    return "js-only"


def cmd_create(args: argparse.Namespace) -> None:
    plugin_root = _abs(args.plugin_root)
    tool_dir = os.path.dirname(os.path.abspath(__file__))

    module_kind = args.module
    if module_kind == "auto":
        module_kind = _auto_module_kind(plugin_root)

    print("=== rn.py create ===")
    print(f"plugin_root: {plugin_root}")
    print(f"template: {args.template}")
    print(f"module: {module_kind}")

    if args.template != "plugin":
        raise SystemExit(f"unsupported --template={args.template}")

    dst_ohos = os.path.join(plugin_root, "ohos")
    
    is_js_only = module_kind == "js-only"

    if os.path.exists(dst_ohos) and not args.force:
        print(f"ohos 目录已存在: {dst_ohos}")
        print("检查并补充缺失的模板文件...")
        try:
            if is_js_only:
                create_js_only.supplement_missing_files(plugin_root, tool_dir, _SKILL_ROOT, args.dry_run)
            else:
                create_native.supplement_missing_files(plugin_root, tool_dir, _SKILL_ROOT, args.dry_run)
        except subprocess.CalledProcessError as e:
            raise SystemExit(e.returncode) from None
        return

    try:
        if is_js_only:
            create_js_only.run_create_js_only(plugin_root, tool_dir, args.force, args.dry_run)
        else:
            create_native.run_create_native(plugin_root, tool_dir, _SKILL_ROOT, args.force, args.dry_run)
    except subprocess.CalledProcessError as e:
        raise SystemExit(e.returncode) from None

    print("Next: run 'rn.py init' to install deps.")


def cmd_init(args: argparse.Namespace) -> None:
    plugin_root = _abs(args.plugin_root)
    tool_dir = os.path.dirname(os.path.abspath(__file__))

    module_kind = args.module
    if module_kind == "auto":
        module_kind = _auto_module_kind(plugin_root)

    is_js_only = module_kind == "js-only"

    print("=== rn.py init ===")
    print(f"plugin_root: {plugin_root}")
    print(f"module: {module_kind}")
    if is_js_only:
        print("  [info] js-only mode detected: will skip codegen and har_wrapper.")
    print("Running dependency chains...\n")

    ohos_dir = os.path.join(plugin_root, "ohos")
    if not os.path.isdir(ohos_dir):
        raise SystemExit(f"missing ohos/ directory, please run 'rn.py create' first")

    if is_js_only:
        pkg = _read_json(os.path.join(ohos_dir, "package.json"))
        scripts = pkg.get("scripts", {})
        has_prepare = "prepare" in scripts
        if has_prepare:
            init_js_only.run_init_js_only_with_ts(plugin_root, args.legacy_peer_deps)
        else:
            init_js_only.run_init_js_only_pure_js(plugin_root, args.legacy_peer_deps)
        print("\nDone: npm deps installed, tgz packed, example ready (js-only mode).")
    else:
        init_native.run_init_native(plugin_root, tool_dir, module_kind, args.legacy_peer_deps)
        print("\nDone: all deps installed, TurboModule/Fabric code generated.")


def cmd_init_template(args: argparse.Namespace) -> None:
    templates_dir = os.path.join(_SKILL_ROOT, "templates")
    if not os.path.isdir(templates_dir):
        raise SystemExit(f"missing templates directory: {templates_dir}")

    print("=== rn.py init template ===")
    print(f"templates_dir: {templates_dir}")
    print("Running dependency installation for all templates...\n")

    example_dir = os.path.join(templates_dir, "example")
    example_harmony_dir = os.path.join(example_dir, "harmony")
    example_js_dir = os.path.join(templates_dir, "example_js")
    example_js_harmony_dir = os.path.join(example_js_dir, "harmony")
    har_wrapper_dir = os.path.join(templates_dir, "har_wrapper")
    ohos_skeleton_dir = os.path.join(templates_dir, "ohos_skeleton")
    ohos_skeleton_js_dir = os.path.join(templates_dir, "ohos_skeleton_js")

    errors: list[tuple[str, Exception]] = []

    def chain_example() -> None:
        """Example 侧: npm install -> ohpm install"""
        if os.path.isdir(example_dir):
            npm_install_cmd = [
                "npm", "install", "--legacy-peer-deps",
                "--registry=https://registry.npmmirror.com", "--ignore-scripts",
            ]
            _run(npm_install_cmd, cwd=example_dir)

        if os.path.isdir(example_harmony_dir):
            ohpm_cmd = [
                "ohpm", "install", "--all",
                "--registry", "https://ohpm.openharmony.cn/ohpm/",
                "--strict_ssl", "true",
            ]
            _run(ohpm_cmd, cwd=example_harmony_dir)

    def chain_example_js() -> None:
        """Example JS 侧: npm install -> ohpm install"""
        if os.path.isdir(example_js_dir):
            npm_install_cmd = [
                "npm", "install", "--legacy-peer-deps",
                "--registry=https://registry.npmmirror.com", "--ignore-scripts",
            ]
            _run(npm_install_cmd, cwd=example_js_dir)

        if os.path.isdir(example_js_harmony_dir):
            ohpm_cmd = [
                "ohpm", "install", "--all",
                "--registry", "https://ohpm.openharmony.cn/ohpm/",
                "--strict_ssl", "true",
            ]
            _run(ohpm_cmd, cwd=example_js_harmony_dir)

    def chain_har_wrapper() -> None:
        """Har Wrapper 侧: ohpm install"""
        if os.path.isdir(har_wrapper_dir):
            ohpm_cmd = [
                "ohpm", "install", "--all",
                "--registry", "https://ohpm.openharmony.cn/ohpm/",
                "--strict_ssl", "true",
            ]
            _run(ohpm_cmd, cwd=har_wrapper_dir)

    def chain_ohos_skeleton() -> None:
        """Ohos Skeleton 侧: npm install"""
        if os.path.isdir(ohos_skeleton_dir):
            npm_install_cmd = [
                "npm", "install", "--legacy-peer-deps",
                "--registry=https://registry.npmmirror.com", "--ignore-scripts",
            ]
            _run(npm_install_cmd, cwd=ohos_skeleton_dir)

    def chain_ohos_skeleton_js() -> None:
        """Ohos Skeleton JS 侧: npm install"""
        if os.path.isdir(ohos_skeleton_js_dir):
            npm_install_cmd = [
                "npm", "install", "--legacy-peer-deps",
                "--registry=https://registry.npmmirror.com", "--ignore-scripts",
            ]
            _run(npm_install_cmd, cwd=ohos_skeleton_js_dir)

    chains = [
        ("example deps", chain_example),
        ("example_js deps", chain_example_js),
        ("har_wrapper ohpm", chain_har_wrapper),
        ("ohos_skeleton npm", chain_ohos_skeleton),
        ("ohos_skeleton_js npm", chain_ohos_skeleton_js),
    ]

    with ThreadPoolExecutor(max_workers=5) as executor:
        future_to_name = {executor.submit(chain): name for name, chain in chains}
        for future in as_completed(future_to_name):
            name = future_to_name[future]
            try:
                future.result()
                _thread_safe_print(f"  [OK] {name}")
            except Exception as e:
                errors.append((name, e))
                _thread_safe_print(f"  [FAIL] {name}: {e}")

    if errors:
        names = ", ".join(n for n, _ in errors)
        raise SystemExit(f"rn.py init template failed for: {names}")

    print("\nDone: all template deps installed.")


def cmd_build_hap(args: argparse.Namespace) -> None:
    plugin_root = _abs(args.plugin_root)
    tool_dir = os.path.dirname(os.path.abspath(__file__))

    print("=== rn.py build hap ===")
    print(f"plugin_root: {plugin_root}")
    if args.apply_example:
        print("apply_example: enabled (will modify entry/oh-package.json5, CMakeLists.txt, PackageProvider.cpp, RNPackagesFactory.ets)")
    else:
        print("apply_example: disabled (skip code modification, only pack and build)")

    library_dir = os.path.join(plugin_root, "ohos", "harmony", "library")
    is_js_only = not os.path.isdir(library_dir)

    if is_js_only:
        build_hap_js_only.run_build_hap_js_only(plugin_root, args.apply_example)
    else:
        build_hap_native.run_build_hap_native(plugin_root, tool_dir, args.apply_example)


def _resolve_real_path(path: str) -> str:
    """Resolve junction/symlink to real path on Windows."""
    return os.path.realpath(path)


def cmd_build_har(args: argparse.Namespace) -> None:
    plugin_root = _abs(args.plugin_root)

    print("=== rn.py build har ===")
    print(f"plugin_root: {plugin_root}")

    library_src = os.path.join(plugin_root, "ohos", "harmony", "library")
    if not os.path.isdir(library_src):
        raise SystemExit(
            f"js-only 模块无需构建 HAR。\n"
            f"未找到 library 目录: {library_src}\n"
            f"js-only 模块直接进入测试阶段（rn.py build hap）。"
        )

    har_wrapper_dir = os.path.join(plugin_root, "ohos", ".rn-build", "har_wrapper")
    if not os.path.isdir(har_wrapper_dir):
        raise SystemExit(
            f"missing har_wrapper dir: {har_wrapper_dir}\n"
            f"请先执行 rn.py create 创建脚手架"
        )

    library_dst = os.path.join(har_wrapper_dir, "library")
    if os.path.isdir(library_dst):
        shutil.rmtree(library_dst)
    shutil.copytree(library_src, library_dst, ignore=shutil.ignore_patterns("oh_modules", "build"))

    # Resolve to real path (avoid junction/symlink issues with hvigor)
    har_wrapper_real = _resolve_real_path(har_wrapper_dir)

    ohpm_cmd = [
        "ohpm",
        "install",
        "--all",
        "--registry",
        "https://ohpm.openharmony.cn/ohpm/",
        "--strict_ssl",
        "true",
    ]
    _run(ohpm_cmd, cwd=har_wrapper_real, quiet=True)

    hvigorw = _find_hvigorw(har_wrapper_real)
    _run([hvigorw, "assembleHar", "--no-daemon"], cwd=har_wrapper_real, quiet=True)

    har_src = os.path.join(library_dst, "build", "default", "outputs", "default", "library.har")
    har_dst_dir = os.path.join(plugin_root, "ohos", "harmony")
    if os.path.isfile(har_src):
        os.makedirs(har_dst_dir, exist_ok=True)
        har_dst = os.path.join(har_dst_dir, "library.har")
        shutil.copy2(har_src, har_dst)
        print(f"  copied HAR to: {har_dst}")

    print("\nDone: HAR assembled.")


def cmd_clean(args: argparse.Namespace) -> None:
    """清理 ohos 目录中的所有编译产物，只保留需要 git 提交的源文件。"""
    plugin_root = _abs(args.plugin_root)
    ohos_dir = os.path.join(plugin_root, "ohos")
    
    if not os.path.isdir(ohos_dir):
        print(f"ohos 目录不存在: {ohos_dir}")
        return
    
    print("=== rn.py clean ===")
    print(f"plugin_root: {plugin_root}")
    
    cleaned: list[str] = []
    
    def _remove(path: str, desc: str) -> None:
        if os.path.islink(path) or os.path.isfile(path):
            os.remove(path)
            cleaned.append(desc)
            print(f"  已删除: {desc}")
        elif os.path.isdir(path):
            shutil.rmtree(path)
            cleaned.append(desc)
            print(f"  已删除: {desc}")
    
    ohos_real = os.path.realpath(ohos_dir)
    
    _remove(os.path.join(ohos_real, "node_modules"), "ohos/node_modules/")
    _remove(os.path.join(ohos_real, "package-lock.json"), "ohos/package-lock.json")
    _remove(os.path.join(ohos_real, "dist"), "ohos/dist/")
    for f in glob.glob(os.path.join(ohos_real, "*.tgz")):
        _remove(f, f"ohos/{os.path.basename(f)}")
    
    library_dir = os.path.join(ohos_real, "harmony", "library")
    if os.path.isdir(library_dir):
        _remove(os.path.join(library_dir, ".cxx"), "harmony/library/.cxx/")
        _remove(os.path.join(library_dir, "build"), "harmony/library/build/")
        _remove(os.path.join(library_dir, ".hvigor"), "harmony/library/.hvigor/")
        _remove(os.path.join(library_dir, "oh_modules"), "harmony/library/oh_modules/")
        _remove(os.path.join(ohos_real, "harmony", "library.har"), "harmony/library.har")
    
    example_dir = os.path.join(ohos_real, "example")
    if os.path.isdir(example_dir):
        _remove(os.path.join(example_dir, "node_modules"), "example/node_modules/")
        harmony_dir = os.path.join(example_dir, "harmony")
        if os.path.isdir(harmony_dir):
            _remove(os.path.join(harmony_dir, "node_modules"), "example/harmony/node_modules/")
            _remove(os.path.join(harmony_dir, "oh_modules"), "example/harmony/oh_modules/")
            _remove(os.path.join(harmony_dir, "build"), "example/harmony/build/")
            _remove(os.path.join(harmony_dir, ".hvigor"), "example/harmony/.hvigor/")
            _remove(os.path.join(harmony_dir, ".cxx"), "example/harmony/.cxx/")
            _remove(os.path.join(harmony_dir, ".idea"), "example/harmony/.idea/")
            _remove(os.path.join(harmony_dir, ".clangd"), "example/harmony/.clangd")
            _remove(os.path.join(harmony_dir, ".clang-format"), "example/harmony/.clang-format")
            _remove(os.path.join(harmony_dir, ".clang-tidy"), "example/harmony/.clang-tidy")
            _remove(os.path.join(harmony_dir, ".appanalyzer"), "example/harmony/.appanalyzer/")
            _remove(os.path.join(harmony_dir, "local.properties"), "example/harmony/local.properties")
    
    if cleaned:
        print(f"\nDone: 已清理 {len(cleaned)} 项编译产物。")
    else:
        print("\nDone: 无需清理（目录已是干净状态）。")


def _ensure_gitignore(path: str, content: str) -> None:
    """确保 .gitignore 存在且包含必要内容。"""
    if os.path.isfile(path):
        with open(path, "r", encoding="utf-8") as f:
            existing = f.read()
        missing_lines = []
        for line in content.strip().splitlines():
            if line.strip() and line.strip() not in existing:
                missing_lines.append(line)
        if missing_lines:
            with open(path, "a", encoding="utf-8", newline="\n") as f:
                f.write("\n# Added by rn.py repo-init\n")
                for line in missing_lines:
                    f.write(f"{line}\n")
            print(f"  已补充: {path}")
    else:
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(content)
        print(f"  已创建: {path}")


_OHOS_ROOT_GITIGNORE = """# OSX
.DS_Store

# node.js
node_modules/
npm-debug.log
yarn-error.log

# Build output
dist/

# npm pack output
*.tgz

# TypeScript编译产物（防止残留）
src/**/*.js
src/**/*.js.map
src/**/*.d.ts

# IDE
.idea/
.vscode/

# HarmonyOS library build
harmony/library/.cxx/
harmony/library/build/
harmony/library/.hvigor/
harmony/library/oh_modules/

# rn.py build cache
.rn-build/

# Example bundle (generated by npm run dev)
example/harmony/entry/src/main/resources/rawfile/bundle.harmony.js
example/harmony/entry/src/main/resources/rawfile/hermes_bundle.hbc

package-lock.json
"""

_HARMONY_LIBRARY_GITIGNORE = """# build artifacts
.cxx/
build/
.hvigor/
oh_modules/

# IDE
.idea/
.vscode/
"""

_EXAMPLE_ROOT_GITIGNORE = """# OSX
.DS_Store

# node.js
node_modules/
npm-debug.log
yarn-error.log

# Bundle artifact
*.jsbundle

# IDE
.idea/
.vscode/

# testing
coverage/
"""

_EXAMPLE_HARMONY_GITIGNORE = """# dependencies
node_modules/
oh_modules/

# build
build/
.cxx/
.hvigor/

# IDE
.idea/
.vscode/

# clang
.clangd/
.clang-format
.clang-tidy

# local config
local.properties

# analyzer
.appanalyzer/
"""


def _clear_signing_config(build_profile_path: str) -> None:
    """清除 build-profile.json5 中的签名配置。"""
    if not os.path.isfile(build_profile_path):
        return
    import re
    with open(build_profile_path, "r", encoding="utf-8") as f:
        content = f.read()
    original = content
    content = re.sub(r'"signingConfigs"\s*:\s*\[[^\]]*\]', '"signingConfigs": []', content)
    content = re.sub(r'"signingConfig"\s*:\s*"[^"]*"', '"signingConfig": ""', content)
    if content != original:
        with open(build_profile_path, "w", encoding="utf-8", newline="\n") as f:
            f.write(content)
        print(f"  已清除签名配置: {build_profile_path}")


def cmd_repo_init(args: argparse.Namespace) -> None:
    """在 ohos 真实目录初始化 git 仓库，生成 .gitignore，可选添加 remote。"""
    plugin_root = _abs(args.plugin_root)
    ohos_dir = os.path.join(plugin_root, "ohos")
    
    if not os.path.isdir(ohos_dir):
        print(f"ohos 目录不存在: {ohos_dir}")
        return
    
    ohos_real = os.path.realpath(ohos_dir)
    
    print("=== rn.py repo-init ===")
    print(f"plugin_root: {plugin_root}")
    print(f"ohos (junction): {ohos_dir}")
    if ohos_real != ohos_dir:
        print(f"ohos (真实目录): {ohos_real}")
    
    _ensure_gitignore(os.path.join(ohos_real, ".gitignore"), _OHOS_ROOT_GITIGNORE)
    
    library_dir = os.path.join(ohos_real, "harmony", "library")
    if os.path.isdir(library_dir):
        _ensure_gitignore(os.path.join(library_dir, ".gitignore"), _HARMONY_LIBRARY_GITIGNORE)
    
    example_dir = os.path.join(ohos_real, "example")
    if os.path.isdir(example_dir):
        _ensure_gitignore(os.path.join(example_dir, ".gitignore"), _EXAMPLE_ROOT_GITIGNORE)
        harmony_dir = os.path.join(example_dir, "harmony")
        if os.path.isdir(harmony_dir):
            _ensure_gitignore(os.path.join(harmony_dir, ".gitignore"), _EXAMPLE_HARMONY_GITIGNORE)
            _clear_signing_config(os.path.join(harmony_dir, "build-profile.json5"))
    
    git_dir = os.path.join(ohos_real, ".git")
    if os.path.isdir(git_dir):
        print(f"  git 仓库已存在: {ohos_real}")
    else:
        subprocess.run(["git", "init"], cwd=ohos_real, check=True)
        print(f"  已初始化 git 仓库: {ohos_real}")
    
    result = subprocess.run(
        ["git", "remote", "get-url", "origin"],
        cwd=ohos_real,
        capture_output=True,
        text=True,
    )
    if result.returncode == 0:
        existing_remote = result.stdout.strip()
        if existing_remote != args.remote:
            subprocess.run(["git", "remote", "set-url", "origin", args.remote], cwd=ohos_real, check=True)
            print(f"  已更新 remote origin: {args.remote}")
        else:
            print(f"  remote origin 已存在: {args.remote}")
    else:
        subprocess.run(["git", "remote", "add", "origin", args.remote], cwd=ohos_real, check=True)
        print(f"  已添加 remote origin: {args.remote}")
    
    subprocess.run(["git", "add", "."], cwd=ohos_real, check=True)
    print("  已执行: git add .")
    
    print(f"\nDone: git 仓库已就绪，位于 {ohos_real}")
    print("下一步:")
    print("  1. cd " + ohos_real)
    print("  2. git commit -m 'initial commit'")
    print(f"  3. git push -u origin {args.branch}")


def main() -> None:
    p = argparse.ArgumentParser(prog="rn.py", description="React Native OHOS helper CLI")
    p.add_argument("--plugin-root", default=os.getcwd(), help="RN plugin repo root (default: cwd)")

    sp = p.add_subparsers(dest="cmd", required=True)

    p_create = sp.add_parser("create", help="bootstrap ohos/harmony/example skeleton (fast, no npm install)")
    p_create.add_argument(
        "--plugin-root",
        default=None,
        help="RN plugin repo root (override). Also accepted as global option.",
    )
    p_create.add_argument("--template", default="plugin", choices=["plugin"])
    p_create.add_argument(
        "--module",
        default="auto",
        choices=["auto", "js-only", "turbo", "fabric", "both"],
        help="which library type to create (default: auto by scanning src/)",
    )
    p_create.add_argument("--force", action="store_true", help="overwrite existing ohos/ target tree")
    p_create.add_argument("--dry-run", action="store_true")
    p_create.set_defaults(func=cmd_create)

    p_init = sp.add_parser("init", help="npm install + generate TurboModule/Fabric code (run after create)")
    p_init.add_argument(
        "--plugin-root",
        default=None,
        help="RN plugin repo root (override). Also accepted as global option.",
    )
    p_init.add_argument(
        "--module",
        default="auto",
        choices=["auto", "js-only", "turbo", "fabric", "both"],
        help="which library code to generate (default: auto by scanning src/)",
    )
    p_init.add_argument("--legacy-peer-deps", action="store_true", default=True)
    p_init.set_defaults(func=cmd_init)

    p_init_template = sp.add_parser("init-template", help="install deps in templates directory (npm + ohpm)")
    p_init_template.set_defaults(func=cmd_init_template)

    p_build = sp.add_parser("build", help="build tasks")
    p_build.add_argument(
        "--plugin-root",
        default=None,
        help="RN plugin repo root (override). Also accepted as global option.",
    )
    sp_build = p_build.add_subparsers(dest="build_cmd", required=True)

    p_hap = sp_build.add_parser(
        "hap",
        help="pack tgz + build bundle + assemble HAP (default: no code modification)",
    )
    p_hap.add_argument(
        "--plugin-root",
        default=None,
        help="RN plugin repo root (override). Also accepted as global option.",
    )
    p_hap.add_argument(
        "--apply-example",
        action="store_true",
        help="apply example template steps 5-8 (modify entry/oh-package.json5, CMakeLists.txt, PackageProvider.cpp, RNPackagesFactory.ets)",
    )
    p_hap.set_defaults(func=cmd_build_hap)

    p_har = sp_build.add_parser(
        "har",
        help="copy library to har_wrapper + assemble HAR",
    )
    p_har.add_argument(
        "--plugin-root",
        default=None,
        help="RN plugin repo root (override). Also accepted as global option.",
    )
    p_har.set_defaults(func=cmd_build_har)

    p_clean = sp.add_parser("clean", help="clean all build artifacts in ohos/, keep only git-trackable files")
    p_clean.add_argument(
        "--plugin-root",
        default=None,
        help="RN plugin repo root (override). Also accepted as global option.",
    )
    p_clean.set_defaults(func=cmd_clean)

    p_repo_init = sp.add_parser("repo-init", help="init git repo in ohos real directory with .gitignore and remote")
    p_repo_init.add_argument(
        "--plugin-root",
        default=None,
        help="RN plugin repo root (override). Also accepted as global option.",
    )
    p_repo_init.add_argument(
        "remote",
        help="git remote URL (required)",
    )
    p_repo_init.add_argument(
        "branch",
        help="git branch name (required)",
    )
    p_repo_init.set_defaults(func=cmd_repo_init)

    args = p.parse_args()
    if getattr(args, "plugin_root", None) is None:
        args.plugin_root = os.getcwd()
    args.func(args)


if __name__ == "__main__":
    main()
