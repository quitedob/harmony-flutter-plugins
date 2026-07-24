#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime
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


import urllib.error
import urllib.parse
import urllib.request

_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SKILL_ROOT not in sys.path:
    sys.path.insert(0, _SKILL_ROOT)

_WORKSPACE_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(_SKILL_ROOT))))
_RN_SIGNING_FILE = os.path.join(_WORKSPACE_ROOT, "adapt-workflow", "data", "signing.rn.local.json")

_GITCODE_API_BASE = "https://api.gitcode.com/api/v5"
_GITCODE_TOKEN = "D9ooPS34AWy6YjTRfPgWSU-w"
_GITCODE_ORG = "rn_ohos_plugin"

from lib import spec_scan, module_analyzer  # noqa: E402
from lib import create_native, create_js_only, init_native, init_js_only, build_hap  # noqa: E402
from lib import create_ohos, create_harmony, create_example, create_har_wrapper, create_ohos_test  # noqa: E402
from lib.har_wrapper_template import run_ohpm_on_har_wrapper_template  # noqa: E402

_print_lock = threading.Lock()


def _thread_safe_print(msg: str) -> None:
    with _print_lock:
        print(msg)


def _abs(path: str) -> str:
    return os.path.abspath(path)


def _sync_signing_to_build_profile(plugin_root: str) -> bool:
    """同步签名配置到 build-profile.json5。
    
    从 signing.rn.local.json 读取签名配置，写入到
    ohos/example/harmony/build-profile.json5 的 app.signingConfigs 字段。
    
    Returns:
        True 成功同步，False 跳过（配置文件不存在或已有签名）
    """
    # 1. 检查签名配置文件是否存在
    if not os.path.isfile(_RN_SIGNING_FILE):
        print(f"  [skip] 签名配置文件不存在: {_RN_SIGNING_FILE}")
        return False
    
    # 2. 读取签名配置
    try:
        signing_config = _read_json(_RN_SIGNING_FILE)
    except json.JSONDecodeError as e:
        print(f"  [warn] 签名配置文件格式错误: {e}")
        return False
    
    # 3. 验证签名配置字段
    material = signing_config.get("signingMaterial", {})
    required_fields = ["certpath", "profile", "storeFile", "keyAlias", "keyPassword", "storePassword", "signAlg"]
    missing = [f for f in required_fields if not material.get(f)]
    if missing:
        print(f"  [warn] 签名配置缺失字段: {missing}")
        return False
    
    # 4. 定位 build-profile.json5
    build_profile_path = os.path.join(plugin_root, "ohos", "example", "harmony", "build-profile.json5")
    if not os.path.isfile(build_profile_path):
        print(f"  [skip] build-profile.json5 不存在: {build_profile_path}")
        return False
    
    # 5. 读取 build-profile.json5（保留原始格式）
    with open(build_profile_path, "r", encoding="utf-8") as f:
        original_content = f.read()
    
    # 6. 检查是否已有签名配置（避免重复添加）
    # 查找 "signingConfigs": [...] 数组
    import re
    signing_configs_match = re.search(r'"signingConfigs"\s*:\s*\[([^\]]*)\]', original_content)
    if signing_configs_match:
        array_content = signing_configs_match.group(1).strip()
        # 如果数组非空且包含 "name": "default"，说明已有签名配置
        if array_content and '"name"' in array_content:
            print(f"  [skip] build-profile.json5 已有签名配置，避免重复添加")
            return False
    
    # 7. 构建签名配置 JSON5 片段（保持缩进）
    # build-profile.json5 通常使用 2 空格缩进
    indent = "  "
    signing_entry_lines = [
        f"{indent}{indent}{{",
        f'{indent}{indent}{indent}"name": "default",',
        f'{indent}{indent}{indent}"type": "HarmonyOS",',
        f'{indent}{indent}{indent}"material": {{',
    ]
    
    # 添加 material 字段
    material_indent = indent * 4
    for key, value in material.items():
        if isinstance(value, str):
            # 转义字符串中的特殊字符
            escaped_value = value.replace("\\", "\\\\").replace('"', '\\"')
            signing_entry_lines.append(f'{material_indent}"{key}": "{escaped_value}",')
        else:
            signing_entry_lines.append(f'{material_indent}"{key}": {json.dumps(value)},')
    
    # 移除最后一个逗号
    if signing_entry_lines[-1].endswith(","):
        signing_entry_lines[-1] = signing_entry_lines[-1][:-1]
    
    signing_entry_lines.extend([
        f"{indent}{indent}{indent}}}",
        f"{indent}{indent}}}",
    ])
    
    signing_entry = "\n".join(signing_entry_lines)
    
    # 8. 替换 signingConfigs 数组内容
    # 查找 "signingConfigs": [ ] 或 "signingConfigs": []
    new_content = re.sub(
        r'"signingConfigs"\s*:\s*\[\s*\]',
        f'"signingConfigs": [\n{signing_entry}\n{indent}]',
        original_content
    )
    
    if new_content == original_content:
        # 如果没有匹配到空数组，尝试另一种模式
        new_content = re.sub(
            r'"signingConfigs"\s*:\s*\[\]',
            f'"signingConfigs": [\n{signing_entry}\n{indent}]',
            original_content
        )
    
    if new_content == original_content:
        print(f"  [warn] 无法找到空的 signingConfigs 数组，跳过签名同步")
        return False
    
    # 9. 写入 build-profile.json5
    with open(build_profile_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(new_content)
    
    print(f"  已同步签名配置: {build_profile_path}")
    print(f"  签名配置来源: {_RN_SIGNING_FILE}")
    return True


def _derive_package_short_name(npm_name: str) -> str:
    """从 npm 包名推导简短标识名（用于目录名、HAR 文件名等）。"""
    import re
    if not npm_name or not isinstance(npm_name, str):
        return "library"
    
    name = npm_name.strip()
    
    # 去掉 scope
    if name.startswith('@'):
        parts = name.split('/')
        if len(parts) >= 2:
            name = parts[-1]
    
    # 去掉一个已知前缀
    prefixes = ['react-native-', 'react_native_', 'rn-', 'rtn-']
    for prefix in prefixes:
        if name.startswith(prefix):
            name = name[len(prefix):]
            break
    
    # 替换连字符为下划线
    short_name = name.replace('-', '_')
    
    if not short_name:
        short_name = "library"
    
    # 验证合法标识符
    if not re.match(r'^[a-zA-Z_][a-zA-Z0-9_]*$', short_name):
        short_name = re.sub(r'^[^a-zA-Z_]+', '', short_name)
        short_name = re.sub(r'[^a-zA-Z0-9_]', '_', short_name)
        if not short_name:
            short_name = "library"
    
    return short_name.lower()


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


def cmd_analyse(args: argparse.Namespace) -> None:
    """分析模块类型"""
    plugin_root = _abs(args.plugin_root)
    
    analysis = module_analyzer.analyze_module(plugin_root)
    report = module_analyzer.format_analysis_report(analysis)
    print(report)


def cmd_create_all(args: argparse.Namespace) -> None:
    """创建全部：ohos + harmony + example + har_wrapper"""
    plugin_root = _abs(args.plugin_root)

    analysis = module_analyzer.analyze_module(plugin_root)
    module_kind = args.module if hasattr(args, 'module') else "auto"
    if module_kind == "auto":
        module_kind = analysis.module_kind

    print("=== rn.py create all ===")
    print(f"plugin_root: {plugin_root}")
    print(f"module: {module_kind}")
    print(f"source: {analysis.source_type} ({analysis.source_dir or 'root'})")
    print(f"  npm_name: {analysis.npm_name}")
    print(f"  short_name: {analysis.short_name}")
    print(f"  camel_name: {analysis.camel_name}")
    print(f"  ohos_name: {analysis.ohos_name}")
    
    if analysis.native_module_names:
        print(f"native_modules: {', '.join(analysis.native_module_names)}")
    if analysis.turbo_names:
        print(f"turbo_specs: {', '.join(analysis.turbo_names)}")
    if analysis.fabric_names:
        print(f"fabric_specs: {', '.join(analysis.fabric_names)}")

    dst_ohos = os.path.join(plugin_root, "ohos")
    
    # 如果 ohos 已存在且没有 --force，进入增量补充模式（含损坏 junction 的 lexists 检测）
    from lib import ohos_junction
    ohos_usable = ohos_junction.ohos_link_is_usable(plugin_root)
    if ohos_usable and not (hasattr(args, 'force') and args.force):
        print(f"\nohos 目录已存在: {dst_ohos}")
        print("检查并补充缺失的模板文件...")
        _supplement_ohos(plugin_root, analysis, module_kind, args)
        return
    
    if hasattr(args, 'dry_run') and args.dry_run:
        print("  [dry-run] 将执行以下步骤：")
        print("    1. create ohos junction")
        print("    2. create ohos (模板 + 源码)")
        if module_kind != "js-only":
            print("    3. create harmony (原生代码)")
        print("    4. create example")
        if module_kind != "js-only":
            print("    5. create har_wrapper")
        print("    6. 注入 autolinking 配置")
        return

    try:
        from lib import ohos_junction, package_merge
        
        print("\n=== Step 1: create ohos junction ===")
        ohos_junction.create_ohos_junction(plugin_root, args.force if hasattr(args, 'force') else False)
        
        print("\n=== Step 2: create ohos ===")
        create_ohos.create_ohos(plugin_root, analysis, module_kind=module_kind, force=args.force if hasattr(args, 'force') else False, dry_run=args.dry_run if hasattr(args, 'dry_run') else False, light=args.light if hasattr(args, 'light') else False)
        
        if module_kind != "js-only":
            print("\n=== Step 3: create harmony ===")
            create_harmony.create_harmony(plugin_root, analysis, module_kind=module_kind, force=args.force if hasattr(args, 'force') else False, light=args.light if hasattr(args, 'light') else False)
        
        print("\n=== Step 4: create example ===")
        create_example.create_example(plugin_root, analysis, module_kind=module_kind, force=args.force if hasattr(args, 'force') else False, light=args.light if hasattr(args, 'light') else False)
        
        # Step 4.5: 同步签名配置（如果 signing.rn.local.json 存在）
        print("\n=== Step 4.5: sync signing config ===")
        _sync_signing_to_build_profile(plugin_root)
        
        if module_kind != "js-only":
            print("\n=== Step 5: create har_wrapper ===")
            create_har_wrapper.create_har_wrapper(plugin_root, analysis, module_kind=module_kind, force=args.force if hasattr(args, 'force') else False, light=args.light if hasattr(args, 'light') else False)
        
        # RN 版本切换（如果指定了 --rn-version 且与默认不同）
        rn_version = getattr(args, 'rn_version', None)
        if rn_version:
            example_dir_real = os.path.realpath(os.path.join(plugin_root, "ohos", "example"))
            if os.path.isdir(example_dir_real):
                print(f"\n=== Step 5.5: patch RN version to {rn_version} ===")
                _patch_rn_version(example_dir_real, rn_version)

        print("\n=== Step 6: 注入 autolinking 配置 ===")
        if analysis.npm_name and module_kind != "js-only":
            ohos_pkg_path = os.path.join(plugin_root, "ohos", "package.json")
            if os.path.isfile(ohos_pkg_path):
                ohos_pkg = json.load(open(ohos_pkg_path, "r", encoding="utf-8"))
                harmony_field = ohos_pkg.get("harmony", {})
                if isinstance(harmony_field, dict) and "autolinking" not in harmony_field:
                    autolinking_config = package_merge.generate_autolinking_config(analysis.npm_name)
                    if autolinking_config:
                        harmony_field["autolinking"] = autolinking_config
                        ohos_pkg["harmony"] = harmony_field
                        json.dump(ohos_pkg, open(ohos_pkg_path, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
                        print(f"  已添加 ohos/package.json harmony.autolinking 配置")
        
    except subprocess.CalledProcessError as e:
        raise SystemExit(e.returncode) from None

    print("\nNext: run 'rn.py init' to install deps.")


def _supplement_ohos(plugin_root: str, analysis: module_analyzer.ModuleAnalysis, module_kind: str, args: argparse.Namespace) -> None:
    """增量补充 ohos：src 按分析结果；模板目录逐文件检查缺失（node_modules/oh_modules 仅补目录）。"""
    from lib import import_rewrite, package_merge
    from lib.create_ohos import (
        _copy_spec_files_from_analysis,
        _copy_source_files_from_analysis,
        _write_index_from_analysis,
    )

    tool_dir = os.path.dirname(os.path.abspath(__file__))
    skill_root = _SKILL_ROOT
    dry_run = bool(getattr(args, "dry_run", False))
    light = bool(getattr(args, "light", False))

    ohos_dir = os.path.join(plugin_root, "ohos")
    ohos_real = os.path.realpath(ohos_dir)

    ohos_src_dir = os.path.join(ohos_real, "src")
    if not os.path.isdir(ohos_src_dir) or not os.listdir(ohos_src_dir):
        print("  ohos/src 目录不存在或为空，正在生成源码...")
        os.makedirs(ohos_src_dir, exist_ok=True)

        if module_kind != "js-only" and analysis.spec_files:
            spec_abs = _copy_spec_files_from_analysis(plugin_root, ohos_src_dir, analysis.spec_files)
        else:
            spec_abs = set()

        _copy_source_files_from_analysis(
            plugin_root,
            ohos_src_dir,
            analysis.source_files,
            spec_abs,
            analysis.entry_file,
            analysis.source_dir or analysis.inferred_source_dir,
            analysis.dynamic_require_dirs,
        )
        _write_index_from_analysis(
            plugin_root,
            ohos_src_dir,
            analysis.entry_file,
            analysis.source_dir or analysis.inferred_source_dir,
        )

        spec_names = {os.path.splitext(os.path.basename(p))[0] for p in spec_abs}
        n = import_rewrite.walk_and_rewrite(ohos_src_dir, dry_run=False, spec_basenames_no_ext=spec_names)
        if n:
            print(f"  已重写 {n} 个文件的 import")
        print("  已补充 ohos/src 目录")

    print("  检查模板与工程文件（逐文件补充，依赖目录仅检查是否存在）...")
    if module_kind == "js-only":
        from lib.create_js_only import supplement_missing_files

        supplement_missing_files(
            plugin_root, tool_dir, skill_root, dry_run=dry_run, light=light
        )
    else:
        from lib.create_native import supplement_missing_files

        supplement_missing_files(
            plugin_root,
            tool_dir,
            skill_root,
            dry_run=dry_run,
            light=light,
            force_example=False,
        )

    # 增量补充 ESLint 配置
    example_real = os.path.join(ohos_real, "example")
    if os.path.isdir(example_real):
        from lib.create_example import _ensure_eslint_config
        _ensure_eslint_config(example_real)

    # 调整 ohos/tsconfig.json
    print("\n--- adjust tsconfig ---")
    from lib.create_ohos import _adjust_ohos_tsconfig
    _adjust_ohos_tsconfig(ohos_real, plugin_root)

    print("\nDone: 增量补充完成")


def cmd_create_ohos(args: argparse.Namespace) -> None:
    """只创建 ohos/ 目录"""
    plugin_root = _abs(args.plugin_root)

    analysis = module_analyzer.analyze_module(plugin_root)

    print("=== rn.py create ohos ===")
    print(f"plugin_root: {plugin_root}")
    print(f"  npm_name: {analysis.npm_name}")
    print(f"  short_name: {analysis.short_name}")
    print(f"  source_type: {analysis.source_type}")
    print(f"  module_kind: {analysis.module_kind}")
    
    light = args.light if hasattr(args, 'light') else False
    
    if hasattr(args, 'dry_run') and args.dry_run:
        print("  [dry-run] 将创建 ohos junction + 模板 + 源码")
        if light:
            print("  [light] 跳过 node_modules, oh_modules, build 等")
        return

    try:
        from lib import ohos_junction
        
        print("\n=== create ohos junction ===")
        ohos_junction.create_ohos_junction(plugin_root, args.force if hasattr(args, 'force') else False)
        
        print("\n=== create ohos template ===")
        create_ohos.create_ohos(plugin_root, analysis, force=args.force if hasattr(args, 'force') else False, dry_run=args.dry_run if hasattr(args, 'dry_run') else False, light=light)
        
    except subprocess.CalledProcessError as e:
        raise SystemExit(e.returncode) from None

    print("\nDone: ohos/ created.")


def cmd_create_harmony(args: argparse.Namespace) -> None:
    """只创建 harmony/{short_name} 目录"""
    plugin_root = _abs(args.plugin_root)

    analysis = module_analyzer.analyze_module(plugin_root)

    print("=== rn.py create harmony ===")
    print(f"plugin_root: {plugin_root}")
    print(f"  short_name: {analysis.short_name}")
    print(f"  camel_name: {analysis.camel_name}")
    print(f"  module_kind: {analysis.module_kind}")
    
    if analysis.module_kind == "js-only":
        print("  [skip] js-only 模块，不需要 harmony 目录")
        return
    
    if hasattr(args, 'dry_run') and args.dry_run:
        print("  [dry-run] 将创建 harmony/{short_name} 模板")
        return

    try:
        create_harmony.create_harmony(plugin_root, analysis, force=args.force if hasattr(args, 'force') else False, light=args.light if hasattr(args, 'light') else False)
    except subprocess.CalledProcessError as e:
        raise SystemExit(e.returncode) from None

    print("\nDone: harmony/{short_name} created.")


def cmd_create_example(args: argparse.Namespace) -> None:
    """只创建 example 目录"""
    plugin_root = _abs(args.plugin_root)

    analysis = module_analyzer.analyze_module(plugin_root)

    print("=== rn.py create example ===")
    print(f"plugin_root: {plugin_root}")
    print(f"  ohos_name: {analysis.ohos_name}")
    print(f"  version: {analysis.version}")
    print(f"  module_kind: {analysis.module_kind}")
    
    ohos_dir = os.path.join(plugin_root, "ohos")
    if not os.path.isdir(ohos_dir):
        raise SystemExit(f"ohos 目录不存在，请先运行 'rn.py create ohos'")
    
    if hasattr(args, 'dry_run') and args.dry_run:
        print("  [dry-run] 将创建 example 模板")
        return

    try:
        create_example.create_example(plugin_root, analysis, force=args.force if hasattr(args, 'force') else False, light=args.light if hasattr(args, 'light') else False)
    except subprocess.CalledProcessError as e:
        raise SystemExit(e.returncode) from None

    print("\nDone: example created.")


def cmd_create_har_wrapper(args: argparse.Namespace) -> None:
    """只创建 har_wrapper 目录"""
    plugin_root = _abs(args.plugin_root)

    analysis = module_analyzer.analyze_module(plugin_root)

    print("=== rn.py create har ===")
    print(f"plugin_root: {plugin_root}")
    print(f"  short_name: {analysis.short_name}")
    print(f"  module_kind: {analysis.module_kind}")
    
    if analysis.module_kind == "js-only":
        print("  [skip] js-only 模块，不需要 har_wrapper")
        return
    
    ohos_dir = os.path.join(plugin_root, "ohos")
    if not os.path.isdir(ohos_dir):
        raise SystemExit(f"ohos 目录不存在，请先运行 'rn.py create ohos'")
    
    if hasattr(args, 'dry_run') and args.dry_run:
        print("  [dry-run] 将创建 har_wrapper 模板")
        return

    try:
        create_har_wrapper.create_har_wrapper(plugin_root, analysis, force=args.force if hasattr(args, 'force') else False, light=args.light if hasattr(args, 'light') else False)
    except subprocess.CalledProcessError as e:
        raise SystemExit(e.returncode) from None

    print("\nDone: har_wrapper created.")


def cmd_create_ohos_test(args: argparse.Namespace) -> None:
    """只补充 example entry 的 ohosTest 脚手架（Hypium / onDeviceTest）"""
    plugin_root = _abs(args.plugin_root)

    print("=== rn.py create ohos-test ===")
    print(f"plugin_root: {plugin_root}")

    ohos_dir = os.path.join(plugin_root, "ohos")
    if not os.path.isdir(ohos_dir):
        raise SystemExit("ohos 目录不存在，请先运行 'rn.py create ohos' 或 'rn.py create all'")

    entry_dir = os.path.join(ohos_dir, "example", "harmony", "entry")
    if not os.path.isdir(entry_dir):
        raise SystemExit(
            "ohos/example/harmony/entry 不存在，请先运行 'rn.py create example'"
        )

    if hasattr(args, "dry_run") and args.dry_run:
        create_ohos_test.create_ohos_test(
            plugin_root,
            dry_run=True,
            skip_ohpm=True,
        )
        return

    try:
        create_ohos_test.create_ohos_test(
            plugin_root,
            dry_run=False,
            skip_ohpm=bool(getattr(args, "skip_ohpm", False)),
        )
    except subprocess.CalledProcessError as e:
        raise SystemExit(e.returncode) from None

    print("\nDone: ohos-test scaffold ready.")


def _patch_rn_version(example_dir: str, rn_version: str) -> None:
    """将 example 模板从默认 RN 版本切换到目标版本。

    读取 dep-version-map.json 中的 rnoh_versions 获取精确版本号，
    然后 patch example/package.json 中的 react-native 和 RNOH 版本。
    """
    dep_map_path = os.path.join(_SKILL_ROOT, "references", "dep-version-map.json")
    if not os.path.isfile(dep_map_path):
        # 尝试 skills 目录下的路径
        alt_path = os.path.join(os.path.dirname(_SKILL_ROOT), "rn-adapted-library", "references", "dep-version-map.json")
        if os.path.isfile(alt_path):
            dep_map_path = alt_path
        else:
            print(f"  [warn] dep-version-map.json not found, skip RN version patch")
            return

    dep_map = _read_json(dep_map_path)
    rnoh_versions = dep_map.get("rnoh_versions", {})

    if rn_version not in rnoh_versions:
        print(f"  [warn] RN {rn_version} not in dep-version-map rnoh_versions, skip patch")
        return

    target = rnoh_versions[rn_version]
    pkg_path = os.path.join(example_dir, "package.json")
    if not os.path.isfile(pkg_path):
        return

    pkg = _read_json(pkg_path)
    deps = pkg.get("dependencies", {})
    old_rn = deps.get("react-native", "?")
    old_rnoh = deps.get("@react-native-oh/react-native-harmony", "?")

    deps["react-native"] = target["react_native"]
    deps["@react-native-oh/react-native-harmony"] = target["rnoh"]
    pkg["dependencies"] = deps
    _write_json(pkg_path, pkg)

    print(f"  RN version patched: {old_rn} → {target['react_native']}")
    print(f"  RNOH version patched: {old_rnoh} → {target['rnoh']}")

    # 清除预安装产物（版本不同需重新安装）
    for subdir in ["node_modules", os.path.join("harmony", "oh_modules")]:
        target_dir = os.path.join(example_dir, subdir)
        if os.path.isdir(target_dir):
            import shutil
            shutil.rmtree(target_dir)
            print(f"  清除 {subdir}（需重新安装）")


def cmd_create(args: argparse.Namespace) -> None:
    """旧版兼容：create 命令默认执行全部"""
    cmd_create_all(args)


def _auto_module_kind(plugin_root: str) -> str:
    """自动检测模块类型"""
    analysis = module_analyzer.analyze_module(plugin_root)
    return analysis.module_kind


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
    har_wrapper_dir = os.path.join(templates_dir, "har_wrapper")
    ohos_dir = os.path.join(templates_dir, "ohos")

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

    def chain_har_wrapper() -> None:
        """Har Wrapper: ohpm（{{SHORT_NAME}} 临时→library，完事还原）"""
        if not os.path.isdir(har_wrapper_dir):
            return
        ohpm_cmd = [
            "ohpm", "install", "--all",
            "--registry", "https://ohpm.openharmony.cn/ohpm/",
            "--strict_ssl", "true",
        ]
        run_ohpm_on_har_wrapper_template(
            har_wrapper_dir, lambda: _run(ohpm_cmd, cwd=har_wrapper_dir)
        )

    def chain_ohos() -> None:
        """Ohos template: npm install"""
        if os.path.isdir(ohos_dir):
            npm_install_cmd = [
                "npm", "install", "--legacy-peer-deps",
                "--registry=https://registry.npmmirror.com", "--ignore-scripts",
            ]
            _run(npm_install_cmd, cwd=ohos_dir)

    chains = [
        ("example deps", chain_example),
        ("har_wrapper ohpm", chain_har_wrapper),
        ("ohos npm", chain_ohos),
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

    if args.prepare_only and args.full:
        raise SystemExit("不能同时使用 --prepare-only 与 --full")

    if args.prepare_only:
        mode = "prepare-only"
    elif args.full:
        mode = "full (prepare + compile)"
    else:
        mode = "compile-only (default)"

    print("=== rn.py build hap ===")
    print(f"plugin_root: {plugin_root}")
    print(f"mode: {mode}")

    build_hap.run_build_hap(
        plugin_root,
        tool_dir,
        args.apply_example,
        prepare_only=args.prepare_only,
        full=args.full,
        skip_doctor=getattr(args, "skip_doctor", False),
        example_dir=getattr(args, "example_dir", None),
    )


def cmd_doctor(args: argparse.Namespace) -> None:
    plugin_root = _abs(args.plugin_root)
    example_real = os.path.realpath(os.path.join(plugin_root, "ohos", "example"))
    harmony_dir = os.path.join(example_real, "harmony")
    if not os.path.isdir(harmony_dir):
        raise SystemExit(f"missing harmony dir: {harmony_dir}")

    print("=== rn.py doctor ===")
    print(f"plugin_root: {plugin_root}")

    from lib import doctor

    errors, warnings = doctor.run_doctor(example_real, harmony_dir)
    doctor.report(errors, warnings)


def _resolve_real_path(path: str) -> str:
    """Resolve junction/symlink to real path on Windows."""
    return os.path.realpath(path)


def cmd_build_har(args: argparse.Namespace) -> None:
    plugin_root = _abs(args.plugin_root)

    print("=== rn.py build har ===")
    print(f"plugin_root: {plugin_root}")

    # 推导 short_name
    pkg_path = os.path.join(plugin_root, "package.json")
    if os.path.isfile(pkg_path):
        import json
        with open(pkg_path, "r", encoding="utf-8") as f:
            pkg = json.load(f)
        npm_name = pkg.get("name", "")
    else:
        npm_name = ""
    short_name = _derive_package_short_name(npm_name)

    # 检查 harmony/{short_name} 目录
    library_src = os.path.join(plugin_root, "ohos", "harmony", short_name)
    if not os.path.isdir(library_src):
        # 兜底检查 library 目录（旧版本兼容）
        library_src_old = os.path.join(plugin_root, "ohos", "harmony", "library")
        if os.path.isdir(library_src_old):
            short_name = "library"
            library_src = library_src_old
        else:
            raise SystemExit(
                f"js-only 模块无需构建 HAR。\n"
                f"未找到 harmony/{short_name} 目录: {library_src}\n"
                f"js-only 模块直接进入测试阶段（rn.py build hap）。"
            )

    har_wrapper_dir = os.path.join(plugin_root, "ohos", ".rn-build", "har_wrapper")
    if not os.path.isdir(har_wrapper_dir):
        raise SystemExit(
            f"missing har_wrapper dir: {har_wrapper_dir}\n"
            f"请先执行 rn.py create 创建脚手架"
        )

    library_dst = os.path.join(har_wrapper_dir, short_name)
    if os.path.isdir(library_dst):
        shutil.rmtree(library_dst)
    shutil.copytree(library_src, library_dst, ignore=shutil.ignore_patterns("oh_modules", "build"))

    check_script = os.path.join(os.path.dirname(__file__), "check_fabric_ets.py")
    if os.path.isfile(check_script):
        print("\n--- Fabric ETS static check ---")
        _run([sys.executable, check_script, plugin_root], cwd=plugin_root, quiet=False)

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

    har_src = os.path.join(library_dst, "build", "default", "outputs", "default", f"{short_name}.har")
    har_dst_dir = os.path.join(plugin_root, "ohos", "harmony")
    
    print("\n=== HAR Package Check ===")
    if os.path.isfile(har_src):
        har_size = os.path.getsize(har_src)
        har_mtime = datetime.datetime.fromtimestamp(os.path.getmtime(har_src))
        
        print(f"  Source HAR: {har_src}")
        print(f"  Size: {har_size} bytes ({har_size/1024:.1f} KB)")
        print(f"  Modified: {har_mtime.strftime('%Y-%m-%d %H:%M:%S')}")
        
        if har_size < 1024:
            print(f"  [WARN] HAR size suspiciously small (< 1KB), may be corrupted")
        
        os.makedirs(har_dst_dir, exist_ok=True)
        har_dst = os.path.join(har_dst_dir, f"{short_name}.har")
        shutil.copy2(har_src, har_dst)
        print(f"  Copied to: {har_dst}")
        
        print("\n[SUCCESS] HAR package generated successfully")
    else:
        print(f"  [FAILED] HAR not found at: {har_src}")
        print(f"  Expected path: {har_src}")
        print(f"  Directory listing:")
        
        build_outputs_dir = os.path.join(library_dst, "build", "default", "outputs")
        if os.path.isdir(build_outputs_dir):
            for root, dirs, files in os.walk(build_outputs_dir):
                for f in files:
                    fpath = os.path.join(root, f)
                    fsize = os.path.getsize(fpath)
                    relpath = os.path.relpath(fpath, build_outputs_dir)
                    print(f"    {relpath} ({fsize} bytes)")
        else:
            print(f"    build outputs directory not found: {build_outputs_dir}")
        
        print("\n[FAILED] HAR build failed - no package generated")
        raise SystemExit(1)


def _short_name_from_plugin_root(plugin_root: str) -> str:
    pkg_path = os.path.join(plugin_root, "package.json")
    if os.path.isfile(pkg_path):
        with open(pkg_path, "r", encoding="utf-8") as f:
            pkg = json.load(f)
        npm_name = pkg.get("name", "")
    else:
        npm_name = ""
    return _derive_package_short_name(npm_name)


_WIN_RESERVED_DEVICE_NAMES_CF = frozenset(
    n.casefold()
    for n in (
        "CON",
        "PRN",
        "AUX",
        "NUL",
        *(f"COM{i}" for i in range(1, 10)),
        *(f"LPT{i}" for i in range(1, 10)),
    )
)


def _is_windows_reserved_path_component(name: str) -> bool:
    """Windows 保留设备名（如 nul、con）不可安全做 relpath/remove。"""
    if os.name != "nt":
        return False
    return name.split(".", 1)[0].casefold() in _WIN_RESERVED_DEVICE_NAMES_CF


def _rel_desc_under_ohos(path: str, ohos_real: str) -> str | None:
    try:
        rel = os.path.relpath(path, ohos_real).replace("\\", "/")
    except ValueError:
        return None
    if rel.startswith(".."):
        return None
    return rel


def _clean_remove(path: str, desc: str, cleaned: list[str]) -> None:
    if not os.path.lexists(path):
        return
    try:
        if os.path.islink(path) or os.path.isfile(path):
            os.remove(path)
        elif os.path.isdir(path):
            shutil.rmtree(path)
        else:
            return
    except OSError as exc:
        print(f"  删除失败: {desc} ({exc})")
        return
    cleaned.append(desc)
    print(f"  已删除: {desc}")


# 编译缓存目录名（保留，不删）；dist / generated / *.har / *.tgz 默认会删
_CLEAN_PRESERVE_DIR_NAMES = frozenset({
    "node_modules",
    "oh_modules",
    "build",
    ".cxx",
    ".hvigor",
    ".rn-build",
})

# 编译/安装产物文件名（保留）
_CLEAN_PRESERVE_FILE_NAMES = frozenset({
    "package-lock.json",
    "bundle.harmony.js",
    "hermes_bundle.hbc",
    "local.properties",
})


def _rel_parts_under_ohos(root: str, ohos_real: str) -> tuple[str, ...] | None:
    try:
        rel = os.path.relpath(root, ohos_real)
    except ValueError:
        return None
    if rel.startswith(".."):
        return None
    if rel in (".", ""):
        return ()
    return tuple(rel.split(os.sep))


def _is_under_git(parts: tuple[str, ...]) -> bool:
    return ".git" in parts


def _is_under_example(parts: tuple[str, ...]) -> bool:
    return bool(parts) and parts[0] == "example"


_INSTALL_CACHE_DIR_NAMES = frozenset({"node_modules", "oh_modules"})
_INSTALL_CACHE_DIR_NAMES_CF = frozenset(n.casefold() for n in _INSTALL_CACHE_DIR_NAMES)


def _is_install_cache_dir(name: str) -> bool:
    return name.casefold() in _INSTALL_CACHE_DIR_NAMES_CF


def _is_under_install_cache(parts: tuple[str, ...]) -> bool:
    return any(p.casefold() in _INSTALL_CACHE_DIR_NAMES_CF for p in parts)


def _preserve_build_artifact(parts: tuple[str, ...], name: str) -> bool:
    """是否属于应保留的编译/安装产物（含 .git）。"""
    if name == ".git":
        return True

    # node_modules / oh_modules 及其子树一律保留（含 example/.../entry/oh_modules）
    if _is_install_cache_dir(name) or _is_under_install_cache(parts):
        return True

    # example/harmony 下 HAP 编译产物不保留（含 entry/build）
    if _is_under_example(parts):
        if name in ("build", ".cxx", ".hvigor") or any(
            p in ("build", ".cxx", ".hvigor") for p in parts
        ):
            return False

    if any(p in _CLEAN_PRESERVE_DIR_NAMES for p in parts):
        return True
    if name in _CLEAN_PRESERVE_DIR_NAMES:
        return True
    if name in _CLEAN_PRESERVE_FILE_NAMES:
        return True
    return False


_EXAMPLE_HARMONY_REMOVE_DIR_NAMES = frozenset({"build", ".cxx", ".hvigor"})


def _clean_example_harmony_build_outputs(ohos_real: str, cleaned: list[str]) -> None:
    """删除 example/harmony 下全部 build/.cxx/.hvigor（含 entry/build、entry/.cxx 等任意层级）。"""
    example_harmony = os.path.join(ohos_real, "example", "harmony")
    if not os.path.isdir(example_harmony):
        return

    to_remove: list[str] = []
    for dirpath, dirnames, _ in os.walk(example_harmony, topdown=False):
        rel_parts = os.path.relpath(dirpath, example_harmony)
        parent_parts = () if rel_parts in (".", "") else tuple(rel_parts.split(os.sep))
        if _is_under_install_cache(parent_parts):
            continue
        for d in dirnames:
            if d not in _EXAMPLE_HARMONY_REMOVE_DIR_NAMES:
                continue
            if d in parent_parts:
                continue
            to_remove.append(os.path.join(dirpath, d))

    for path in to_remove:
        rel_desc = _rel_desc_under_ohos(path, ohos_real)
        if rel_desc is None:
            print(f"  跳过（无法解析路径）: {path}")
            continue
        _clean_remove(path, f"ohos/{rel_desc}", cleaned)


def _clean_non_build_artifacts(ohos_real: str, cleaned: list[str]) -> None:
    """删除 ohos 下非编译产物及 dist/generated/.har/.tgz；保留 node_modules/build 等缓存；跳过 .git。"""
    ohos_real = os.path.normpath(os.path.abspath(ohos_real))

    _clean_example_harmony_build_outputs(ohos_real, cleaned)

    for root, dirs, files in os.walk(ohos_real, topdown=True):
        parts = _rel_parts_under_ohos(root, ohos_real)
        if parts is None:
            dirs.clear()
            continue
        if _is_under_git(parts):
            dirs.clear()
            continue

        # 跳过 .git、安装缓存、Windows 保留设备名
        dirs[:] = [
            d
            for d in dirs
            if d != ".git"
            and not _is_install_cache_dir(d)
            and not _is_windows_reserved_path_component(d)
        ]

        for name in files:
            if _is_windows_reserved_path_component(name):
                print(f"  跳过（Windows 保留设备名）: {name}")
                continue
            if _preserve_build_artifact(parts + (name,), name):
                continue
            path = os.path.join(root, name)
            rel_desc = _rel_desc_under_ohos(path, ohos_real)
            if rel_desc is None:
                print(f"  跳过（无法解析路径）: {name}")
                continue
            _clean_remove(path, f"ohos/{rel_desc}", cleaned)

    for root, dirs, _files in os.walk(ohos_real, topdown=False):
        parts = _rel_parts_under_ohos(root, ohos_real)
        if parts is None or root == ohos_real or _is_under_git(parts):
            continue
        if _is_under_install_cache(parts):
            continue
        base = os.path.basename(root)
        if _is_windows_reserved_path_component(base):
            continue
        parent_parts = parts[:-1]
        if _preserve_build_artifact(parent_parts, base):
            continue
        try:
            if not os.listdir(root):
                os.rmdir(root)
                rel_desc = _rel_desc_under_ohos(root, ohos_real)
                if rel_desc is None:
                    continue
                cleaned.append(f"ohos/{rel_desc}/")
                print(f"  已删除: ohos/{rel_desc}/")
        except OSError:
            pass


def _clean_ohos_full(ohos_real: str, cleaned: list[str]) -> None:
    """删除 ohos 目录下全部内容，仅保留 .git。"""
    ohos_real = os.path.normpath(os.path.abspath(ohos_real))
    if not os.path.isdir(ohos_real):
        return
    for name in os.listdir(ohos_real):
        if name == ".git":
            continue
        path = os.path.join(ohos_real, name)
        rel_desc = name + ("/" if os.path.isdir(path) and not os.path.islink(path) else "")
        _clean_remove(path, f"ohos/{rel_desc}", cleaned)


def cmd_clean(args: argparse.Namespace) -> None:
    """清理 ohos：默认删除非编译产物（保留 build 缓存，跳过 .git）；--full 删除 ohos 下除 .git 外全部内容。"""
    plugin_root = _abs(args.plugin_root)
    ohos_dir = os.path.join(plugin_root, "ohos")

    print("=== rn.py clean ===")
    print(f"plugin_root: {plugin_root}")
    print(
        f"mode: {'full (remove all under ohos except .git)' if args.full else 'non-build files only (keep build artifacts, skip .git)'}"
    )

    if not os.path.lexists(ohos_dir):
        print(f"ohos 目录不存在: {ohos_dir}")
        return

    ohos_real = os.path.realpath(ohos_dir)
    cleaned: list[str] = []

    if args.full:
        _clean_ohos_full(ohos_real, cleaned)
    else:
        _clean_non_build_artifacts(ohos_real, cleaned)

    if cleaned:
        print(f"\nDone: 已清理 {len(cleaned)} 项。")
    else:
        print("\nDone: 无需清理（目录已是干净状态）。")


def cmd_migrate(args: argparse.Namespace) -> None:
    """迁移老架构 NativeModules/requireNativeComponent 到新架构 Spec"""
    plugin_root = _abs(args.plugin_root)
    ohos_dir = os.path.join(plugin_root, "ohos")
    
    if not os.path.isdir(ohos_dir):
        print(f"ohos 目录不存在: {ohos_dir}")
        print("请先运行 'rn.py create' 创建 ohos 目录")
        return
    
    print("=== rn.py migrate ===")
    print(f"plugin_root: {plugin_root}")
    print(f"dry_run: {args.dry_run}")
    
    tool_dir = os.path.dirname(os.path.abspath(__file__))
    migrate_script = os.path.join(tool_dir, "migrate_spec.py")
    
    if not os.path.isfile(migrate_script):
        print(f"migrate_spec.py 不存在: {migrate_script}")
        return
    
    cmd = [sys.executable, migrate_script, "--plugin-root", plugin_root]
    if args.dry_run:
        cmd.append("--dry-run")
    
    try:
        subprocess.run(cmd, check=True, cwd=plugin_root)
        print("\nDone: migrate completed.")
    except subprocess.CalledProcessError as e:
        raise SystemExit(e.returncode) from None


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


_REPO_INIT_TRACK_PATTERNS = frozenset({
    "*.tgz",
    "example/harmony/entry/src/main/resources/rawfile/bundle.harmony.js",
    "example/harmony/entry/src/main/resources/rawfile/hermes_bundle.hbc",
    "harmony/entry/src/main/resources/rawfile/bundle.harmony.js",
    "harmony/entry/src/main/resources/rawfile/hermes_bundle.hbc",
    "example/harmony/entry/build/default/outputs/default/entry-default-signed.hap",
})

_ADAPTATION_DIR = ".rn-ohos-adaptation"
_ANALYSIS_PRD_FILENAME = "01-analysis-prd.md"


def _prune_gitignore_patterns(path: str, patterns: frozenset[str]) -> bool:
    """从 .gitignore 移除指定规则，便于 repo-init 跟踪 tgz / bundle。"""
    if not os.path.isfile(path):
        return False
    patterns_cf = {p.casefold() for p in patterns}
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    kept: list[str] = []
    removed: list[str] = []
    for line in lines:
        stripped = line.strip()
        if stripped and not stripped.startswith("#") and stripped.casefold() in patterns_cf:
            removed.append(stripped)
            continue
        kept.append(line)
    if not removed:
        return False
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.writelines(kept)
    print(f"  已从 {path} 移除 gitignore 规则: {', '.join(removed)}")
    return True


def _collect_repo_init_trackable_artifacts(ohos_real: str) -> list[str]:
    """收集 ohos 仓库中应纳入 git 的 tgz、bundle、signed HAP 与适配产物目录路径。"""
    paths: list[str] = []
    if os.path.isdir(ohos_real):
        for name in os.listdir(ohos_real):
            if name.lower().endswith(".tgz"):
                paths.append(os.path.join(ohos_real, name))
    adapt_dir = os.path.join(ohos_real, _ADAPTATION_DIR)
    if os.path.isdir(adapt_dir):
        paths.append(adapt_dir)
    for rel in (
        "example/harmony/entry/src/main/resources/rawfile/bundle.harmony.js",
        "example/harmony/entry/src/main/resources/rawfile/hermes_bundle.hbc",
        "example/harmony/entry/build/default/outputs/default/entry-default-signed.hap",
    ):
        full = os.path.join(ohos_real, rel)
        if os.path.isfile(full):
            paths.append(full)
    return paths


def _force_add_trackable_artifacts(ohos_real: str) -> None:
    """强制 git 跟踪 tgz / bundle / signed HAP（即使历史 .gitignore 仍残留忽略规则）。"""
    for path in _collect_repo_init_trackable_artifacts(ohos_real):
        subprocess.run(["git", "add", "-f", path], cwd=ohos_real, check=True)
        rel_path = os.path.relpath(path, ohos_real).replace('\\', '/')
        print(f"  已强制跟踪: {rel_path}")


def _gitcode_api_request(method: str, path: str, body: dict | None = None) -> dict:
    """调用 GitCode API。"""
    url = f"{_GITCODE_API_BASE}/{path}?{urllib.parse.urlencode({'access_token': _GITCODE_TOKEN})}"
    data = None
    headers = {"Accept": "application/json"}
    if body is not None:
        data = json.dumps(body, ensure_ascii=False).encode("utf-8")
        headers["Content-Type"] = "application/json"
    request = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            raw = response.read().decode("utf-8")
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"GitCode API HTTP {exc.code}: {raw}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"GitCode API request failed: {exc.reason}") from exc


def _gitcode_get_repo(org: str, name: str) -> dict | None:
    """检查 GitCode 仓库是否存在。"""
    owner = urllib.parse.quote(org, safe="")
    path = urllib.parse.quote(name, safe="")
    try:
        return _gitcode_api_request("GET", f"repos/{owner}/{path}")
    except RuntimeError as exc:
        msg = str(exc)
        if "HTTP 404" in msg or "Project not found" in msg:
            return None
        raise


def _gitcode_create_repo(org: str, name: str) -> dict:
    """在 GitCode 组织下创建私有仓库。"""
    org_path = urllib.parse.quote(org, safe="")
    body = {
        "name": name,
        "path": name,
        "public": 0,
        "repository_type": "code",
        "auto_init": True,
        "default_branch": "br_ohos_dev",
    }
    result = _gitcode_api_request("POST", f"orgs/{org_path}/repos", body)
    
    private = bool(result.get("private"))
    public = bool(result.get("public"))
    visibility = result.get("visibility")
    if not private or public or (visibility is not None and visibility != "private"):
        raise RuntimeError(
            "仓库已创建，但未设置为私有: "
            + json.dumps(
                {"private": result.get("private"), "public": result.get("public"),
                 "visibility": visibility, "html_url": result.get("html_url")},
                ensure_ascii=False,
            )
        )
    return result


_OHOS_ROOT_GITIGNORE = """# OSX
.DS_Store

# node.js
node_modules/
npm-debug.log
yarn-error.log

# Build output
dist/

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

# autolink generated (DO NOT commit)
entry/src/main/cpp/autolinking.cmake
entry/src/main/cpp/RNOHPackagesFactory.h
entry/src/main/ets/RNOHPackagesFactory.ets

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


def _install_adaptation_dir_in_ohos_repo(plugin_root: str, ohos_real: str) -> bool:
    """将插件根目录的 .rn-ohos-adaptation 复制到 ohos 仓库下，供 git 踪。"""
    src = os.path.join(plugin_root, _ADAPTATION_DIR)
    dst = os.path.join(ohos_real, _ADAPTATION_DIR)
    if not os.path.isdir(src):
        print(f"  [warn] 未找到 {src}，跳过复制 {_ADAPTATION_DIR}")
        return False
    
    print(f"  正在复制 {_ADAPTATION_DIR} ...")
    
    if os.path.lexists(dst):
        if os.path.isdir(dst) and not os.path.islink(dst):
            shutil.rmtree(dst)
        else:
            os.remove(dst)
    
    shutil.copytree(src, dst)
    print(f"  已复制 {_ADAPTATION_DIR} -> {dst}")

    legacy_prd = os.path.join(ohos_real, _ANALYSIS_PRD_FILENAME)
    if os.path.isfile(legacy_prd):
        os.remove(legacy_prd)
        print(f"  已删除旧版根目录文件: {_ANALYSIS_PRD_FILENAME}")
    return True


def _install_analysis_prd_in_ohos_repo(plugin_root: str, ohos_real: str) -> bool:
    """兼容旧测试：委托给完整适配目录复制。"""
    return _install_adaptation_dir_in_ohos_repo(plugin_root, ohos_real)


def _clear_signing_config(build_profile_path: str) -> None:
    """清除 build-profile.json5 中的签名配置（证书路径、密码等）。
    
    只清除 signingConfigs 数组中的具体签名信息，保留 signingConfig 的引用值（如 "default"）。
    """
    if not os.path.isfile(build_profile_path):
        return
    import re
    with open(build_profile_path, "r", encoding="utf-8") as f:
        content = f.read()
    original = content
    content = re.sub(r'"signingConfigs"\s*:\s*\[[^\]]*\]', '"signingConfigs": []', content)
    if content != original:
        with open(build_profile_path, "w", encoding="utf-8", newline="\n") as f:
            f.write(content)
        print(f"  已清除签名配置: {build_profile_path}")


def _clean_windows_reserved_files(root: str) -> None:
    """清理 Windows 保留设备名文件（nul、con、aux 等）。"""
    if os.name != "nt":
        return
    
    reserved_names = frozenset({
        "CON", "PRN", "AUX", "NUL",
        *(f"COM{i}" for i in range(1, 10)),
        *(f"LPT{i}" for i in range(1, 10)),
    })
    
    cleaned: list[str] = []
    for dirpath, dirnames, filenames in os.walk(root):
        for fn in filenames:
            base = fn.split(".", 1)[0].upper()
            if base in reserved_names:
                path = os.path.join(dirpath, fn)
                try:
                    os.remove(path)
                    rel = os.path.relpath(path, root)
                    cleaned.append(rel)
                    print(f"  已删除 Windows 保留文件: {rel}")
                except OSError as e:
                    print(f"  [warn] 无法删除 {fn}: {e}")
    
    if cleaned:
        print(f"  清理了 {len(cleaned)} 个 Windows 保留文件")


def _repo_init_single(plugin_root: str, args: argparse.Namespace) -> bool:
    """对单个仓库执行 repo-init。返回 True 表示成功，False 表示失败。"""
    ohos_dir = os.path.join(plugin_root, "ohos")
    
    if not os.path.isdir(ohos_dir):
        print(f"ohos 目录不存在: {ohos_dir}")
        return False
    
    ohos_real = os.path.realpath(ohos_dir)
    
    repo_name = os.path.basename(plugin_root)
    default_remote = f"https://gitcode.com/{_GITCODE_ORG}/{repo_name}.git"
    default_branch = "br_ohos_dev"
    
    use_default_remote = args.remote is None
    remote = args.remote or default_remote
    branch = args.branch or default_branch
    auto_push = args.auto_push if args.auto_push is not None else use_default_remote
    create_remote = args.create_remote if args.create_remote is not None else use_default_remote
    
    if getattr(args, "no_create_remote", False):
        create_remote = False
    
    print("=== rn.py repo-init ===")
    print(f"plugin_root: {plugin_root}")
    print(f"ohos (junction): {ohos_dir}")
    if ohos_real != ohos_dir:
        print(f"ohos (真实目录): {ohos_real}")
    
    if use_default_remote:
        print(f"[auto] 使用默认 remote:")
        print(f"  remote: {remote}")
        print(f"  branch: {branch}")
        print(f"  auto_push: {auto_push}")
        print(f"  create_remote: {create_remote}")
    
    git_dir = os.path.join(ohos_real, ".git")
    git_exists = os.path.isdir(git_dir)
    
    if git_exists:
        print(f"git 仓库已存在: {ohos_real}")
        
        result = subprocess.run(
            ["git", "status", "--porcelain"],
            cwd=ohos_real,
            capture_output=True,
            text=True,
        )
        if result.stdout.strip():
            print(f"\n[ERROR] 仓库有未提交的改动，无法继续:")
            print(result.stdout)
            print(f"请先提交或 stash 这些改动后再执行 repo-init")
            return False
        
        result = subprocess.run(
            ["git", "remote", "get-url", "origin"],
            cwd=ohos_real,
            capture_output=True,
            text=True,
        )
        if result.returncode == 0:
            existing_remote = result.stdout.strip()
            if existing_remote != remote:
                print(f"\n[ERROR] remote origin 冲突:")
                print(f"  已有: {existing_remote}")
                print(f"  新配置: {remote}")
                print(f"请使用正确的 remote 参数，或手动修改 remote (git remote set-url origin <URL>)")
                return False
            else:
                print(f"remote origin 已存在且匹配: {remote}")
        else:
            subprocess.run(["git", "remote", "add", "origin", remote], cwd=ohos_real, check=True)
            print(f"已添加 remote origin: {remote}")
        
        result_current = subprocess.run(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            cwd=ohos_real,
            capture_output=True,
            text=True,
        )
        current_branch = result_current.stdout.strip() if result_current.returncode == 0 else ""
        
        result = subprocess.run(
            ["git", "branch", "--list", branch],
            cwd=ohos_real,
            capture_output=True,
            text=True,
        )
        if result.stdout.strip():
            if current_branch == branch:
                print(f"当前已在目标分支: {branch}")
            else:
                subprocess.run(["git", "checkout", branch], cwd=ohos_real, check=True)
                print(f"已切换到分支: {branch}")
        else:
            subprocess.run(["git", "checkout", "-b", branch], cwd=ohos_real, check=True)
            print(f"已创建并切换到分支: {branch}")
    else:
        subprocess.run(["git", "init"], cwd=ohos_real, check=True)
        print(f"已初始化 git 仓库: {ohos_real}")
        
        subprocess.run(["git", "remote", "add", "origin", remote], cwd=ohos_real, check=True)
        print(f"已添加 remote origin: {remote}")
        
        subprocess.run(["git", "checkout", "-b", branch], cwd=ohos_real, check=True)
        print(f"已创建并切换到分支: {branch}")
    
    pkg_path = os.path.join(plugin_root, "package.json")
    if os.path.isfile(pkg_path):
        with open(pkg_path, "r", encoding="utf-8") as f:
            pkg = json.load(f)
        npm_name = pkg.get("name", "")
    else:
        npm_name = ""
    short_name = _derive_package_short_name(npm_name)
    
    _ensure_gitignore(os.path.join(ohos_real, ".gitignore"), _OHOS_ROOT_GITIGNORE)
    
    library_dir = os.path.join(ohos_real, "harmony", short_name)
    if os.path.isdir(library_dir):
        _ensure_gitignore(os.path.join(library_dir, ".gitignore"), _HARMONY_LIBRARY_GITIGNORE)
    library_dir_old = os.path.join(ohos_real, "harmony", "library")
    if os.path.isdir(library_dir_old) and short_name != "library":
        _ensure_gitignore(os.path.join(library_dir_old, ".gitignore"), _HARMONY_LIBRARY_GITIGNORE)
    
    example_dir = os.path.join(ohos_real, "example")
    if os.path.isdir(example_dir):
        _ensure_gitignore(os.path.join(example_dir, ".gitignore"), _EXAMPLE_ROOT_GITIGNORE)
        harmony_dir = os.path.join(example_dir, "harmony")
        if os.path.isdir(harmony_dir):
            _ensure_gitignore(os.path.join(harmony_dir, ".gitignore"), _EXAMPLE_HARMONY_GITIGNORE)
            _clear_signing_config(os.path.join(harmony_dir, "build-profile.json5"))
    
    _prune_gitignore_patterns(os.path.join(ohos_real, ".gitignore"), _REPO_INIT_TRACK_PATTERNS)
    if os.path.isdir(example_dir):
        _prune_gitignore_patterns(os.path.join(example_dir, ".gitignore"), _REPO_INIT_TRACK_PATTERNS)
    
    _install_adaptation_dir_in_ohos_repo(plugin_root, ohos_real)
    
    adapt_dir = os.path.join(ohos_real, _ADAPTATION_DIR)
    if os.path.isdir(adapt_dir):
        _clean_windows_reserved_files(adapt_dir)
    
    subprocess.run(["git", "add", "."], cwd=ohos_real, check=True)
    print("已执行: git add .")
    _force_add_trackable_artifacts(ohos_real)
    
    if create_remote:
        print("\n=== 检查远端仓库 ===")
        repo_info = _gitcode_get_repo(_GITCODE_ORG, repo_name)
        if repo_info:
            print(f"远端仓库已存在: {_GITCODE_ORG}/{repo_name}")
            print(f"  visibility: {repo_info.get('visibility')}")
        else:
            print(f"远端仓库不存在，创建 {_GITCODE_ORG}/{repo_name} ...")
            try:
                repo_info = _gitcode_create_repo(_GITCODE_ORG, repo_name)
                print(f"创建成功: {_GITCODE_ORG}/{repo_name}")
                print(f"  visibility: {repo_info.get('visibility')}")
                print(f"  html_url: {repo_info.get('html_url')}")
            except RuntimeError as e:
                print(f"[ERROR] 创建远端仓库失败: {e}")
                return False
    
    if auto_push:
        print("\n=== auto-push 模式 ===")
        
        result = subprocess.run(
            ["git", "rev-parse", "--verify", f"origin/{branch}"],
            cwd=ohos_real,
            capture_output=True,
            text=True,
        )
        remote_branch_exists = result.returncode == 0
        
        result = subprocess.run(
            ["git", "diff", "--cached", "--quiet"],
            cwd=ohos_real,
            capture_output=True,
        )
        has_changes = result.returncode != 0
        
        if has_changes:
            print("\n--- Step 1: git commit ---")
            subprocess.run(["git", "commit", "-m", "initial commit"], cwd=ohos_real, check=True)
            print("已提交: initial commit")
        
        if has_changes or not remote_branch_exists:
            print("\n--- Step 2: git push ---")
            subprocess.run(["git", "push", "-u", "origin", branch], cwd=ohos_real, check=True)
            print(f"已推送: {branch}")
            
            print(f"\nDone: 已自动提交并推送至 {remote} ({branch})")
        else:
            print("\n工作区无改动，远端分支已存在，跳过 commit/push")
            print(f"\nDone: git 仓库已就绪，位于 {ohos_real}")
            print(f"当前分支: {branch}")
            print(f"remote: {remote}")
    else:
        print(f"\nDone: git 仓库已就绪，位于 {ohos_real}")
        print("下一步:")
        print("  1. cd " + ohos_real)
        print("  2. git commit -m 'initial commit'")
        print(f"  3. git push -u origin {branch}")
    
    return True


def _scan_repos_with_ohos(base_dir: str) -> list[str]:
    """扫描目录下所有有 ohos 子目录的仓库。"""
    repos: list[str] = []
    for name in os.listdir(base_dir):
        if name.startswith("."):
            continue
        path = os.path.join(base_dir, name)
        if not os.path.isdir(path):
            continue
        ohos_dir = os.path.join(path, "ohos")
        if os.path.isdir(ohos_dir):
            repos.append(path)
    return sorted(repos)


def cmd_repo_init(args: argparse.Namespace) -> None:
    """在 ohos 真实目录初始化 git 仓库，生成 .gitignore，可选添加 remote。"""
    if getattr(args, "batch", False):
        base_dir = _abs(args.plugin_root)
        print("=== rn.py repo-init --batch ===")
        print(f"扫描目录: {base_dir}")
        
        repos = _scan_repos_with_ohos(base_dir)
        if not repos:
            print("未找到包含 ohos 目录的仓库")
            return
        
        print(f"找到 {len(repos)} 个仓库:")
        for repo in repos:
            print(f"  - {os.path.basename(repo)}")
        
        results: list[tuple[str, bool]] = []
        for repo in repos:
            repo_name = os.path.basename(repo)
            print(f"\n{'='*60}")
            print(f"[{repo_name}] 开始处理...")
            success = _repo_init_single(repo, args)
            results.append((repo_name, success))
            if success:
                print(f"[{repo_name}] 成功")
            else:
                print(f"[{repo_name}] 失败")
        
        print(f"\n{'='*60}")
        print("批量处理完成:")
        success_count = sum(1 for _, s in results if s)
        fail_count = len(results) - success_count
        for repo_name, success in results:
            status = "✓" if success else "✗"
            print(f"  {status} {repo_name}")
        print(f"成功: {success_count} / 失败: {fail_count}")
        return
    
    plugin_root = _abs(args.plugin_root)
    _repo_init_single(plugin_root, args)


def _add_plugin_root_arg(parser: argparse.ArgumentParser) -> None:
    """Allow --plugin-root on leaf subcommands (agents often append it after the subcommand)."""
    parser.add_argument(
        "--plugin-root",
        default=None,
        help=(
            "RN plugin repo root (override). Also accepted as "
            "rn.py --plugin-root PATH create ... or create --plugin-root PATH ohos-test"
        ),
    )


def main() -> None:
    from lib.ohos_npm_config import set_runtime_ohos_npm_scope

    p = argparse.ArgumentParser(prog="rn.py", description="React Native OHOS helper CLI")
    p.add_argument("--plugin-root", default=os.getcwd(), help="RN plugin repo root (default: cwd)")
    p.add_argument(
        "--ohos-scope",
        default=None,
        help="OHOS npm scope for ohos/package.json (default @oh-rn, or RN_OHOS_NPM_SCOPE / adapt-workflow settings)",
    )

    sp = p.add_subparsers(dest="cmd", required=True)

    p_analyse = sp.add_parser("analyse", help="analyze module type (js-only/turbo/fabric/both)")
    p_analyse.add_argument(
        "--plugin-root",
        default=None,
        help="RN plugin repo root (override). Also accepted as global option.",
    )
    p_analyse.set_defaults(func=cmd_analyse)

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
    p_create.add_argument("--light", action="store_true", help="light copy: skip node_modules, oh_modules etc (default: full copy)")
    p_create.add_argument("--rn-version", default=None, choices=["0.72", "0.77", "0.82"],
                          help="target RN version (default: template default 0.72). Patches example/package.json after copy.")
    p_create.add_argument("--dry-run", action="store_true")
    
    sp_create = p_create.add_subparsers(dest="create_subcmd", help="create sub-command (ohos/harmony/example/har/ohos-test)")
    
    p_create_all = sp_create.add_parser("all", help="create all (ohos + harmony + example + har)")
    _add_plugin_root_arg(p_create_all)
    p_create_all.add_argument("--force", action="store_true", help="overwrite existing")
    p_create_all.add_argument("--light", action="store_true", help="light copy")
    p_create_all.add_argument("--dry-run", action="store_true")
    p_create_all.set_defaults(func=cmd_create_all)
    
    p_create_ohos = sp_create.add_parser("ohos", help="create ohos/ only")
    _add_plugin_root_arg(p_create_ohos)
    p_create_ohos.add_argument("--force", action="store_true", help="overwrite existing ohos/")
    p_create_ohos.add_argument("--light", action="store_true", help="light copy: skip node_modules, oh_modules etc")
    p_create_ohos.add_argument("--dry-run", action="store_true")
    p_create_ohos.set_defaults(func=cmd_create_ohos)
    
    p_create_harmony = sp_create.add_parser("harmony", help="create ohos/harmony/{short_name} only")
    _add_plugin_root_arg(p_create_harmony)
    p_create_harmony.add_argument("--force", action="store_true", help="overwrite existing")
    p_create_harmony.add_argument("--light", action="store_true", help="light copy")
    p_create_harmony.set_defaults(func=cmd_create_harmony)
    
    p_create_example = sp_create.add_parser("example", help="create ohos/example only")
    _add_plugin_root_arg(p_create_example)
    p_create_example.add_argument("--force", action="store_true", help="overwrite existing")
    p_create_example.add_argument("--light", action="store_true", help="light copy")
    p_create_example.set_defaults(func=cmd_create_example)
    
    p_create_har = sp_create.add_parser("har", help="create ohos/.rn-build/har_wrapper only")
    _add_plugin_root_arg(p_create_har)
    p_create_har.add_argument("--force", action="store_true", help="overwrite existing")
    p_create_har.add_argument("--light", action="store_true", help="light copy")
    p_create_har.set_defaults(func=cmd_create_har_wrapper)

    p_create_ohos_test = sp_create.add_parser(
        "ohos-test",
        help="supplement entry/src/ohosTest scaffold + hypium + method it() stubs",
    )
    _add_plugin_root_arg(p_create_ohos_test)
    p_create_ohos_test.add_argument(
        "--dry-run",
        action="store_true",
        help="show planned changes without writing files or running ohpm",
    )
    p_create_ohos_test.add_argument(
        "--skip-ohpm",
        action="store_true",
        help="skip ohpm install in ohos/example/harmony",
    )
    p_create_ohos_test.set_defaults(func=cmd_create_ohos_test)

    p_create.set_defaults(func=cmd_create_all)

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
        help="build HAP: default compile-only (bundle + assembleHap); use flags for deps",
    )
    p_hap.add_argument(
        "--plugin-root",
        default=None,
        help="RN plugin repo root (override). Also accepted as global option.",
    )
    p_hap.add_argument(
        "--apply-example",
        action="store_true",
        help="(deprecated, no-op) 准备逻辑已并入 --prepare-only / --full",
    )
    hap_mode = p_hap.add_mutually_exclusive_group()
    hap_mode.add_argument(
        "--prepare-only",
        action="store_true",
        help="pack/install/ohpm + register all plugins + entry/CMAKE/Factory updates; skip bundle/HAP",
    )
    hap_mode.add_argument(
        "--full",
        action="store_true",
        help="prepare-only steps then compile (bundle + assembleHap)",
    )
    p_hap.add_argument(
        "--skip-doctor",
        action="store_true",
        help="跳过编译前的 doctor 自检门禁（不建议）",
    )
    p_hap.add_argument(
        "--example-dir",
        default=None,
        help="example 目录名（相对于 ohos/），默认 'example'，可用于 'example_auto'",
    )
    p_hap.set_defaults(func=cmd_build_hap)

    p_doctor = sp.add_parser(
        "doctor",
        help="对 example 工程做构建前自检：file: 依赖存在性 / autolinking 注册 / .bin symlink",
    )
    p_doctor.add_argument(
        "--plugin-root",
        default=None,
        help="RN plugin repo root (override). Also accepted as global option.",
    )
    p_doctor.set_defaults(func=cmd_doctor)

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

    p_clean = sp.add_parser(
        "clean",
        help="clean ohos: default removes sources and dist/generated/.har/.tgz (keeps node_modules/build cache, skips .git); --full removes all under ohos/ except .git",
    )
    p_clean.add_argument(
        "--plugin-root",
        default=None,
        help="RN plugin repo root (override). Also accepted as global option.",
    )
    p_clean.add_argument(
        "--full",
        action="store_true",
        help="remove all files and directories under ohos/ except .git",
    )
    p_clean.set_defaults(func=cmd_clean)

    p_migrate = sp.add_parser("migrate", help="migrate old arch NativeModules/requireNativeComponent to new arch TurboModule/Fabric Spec")
    p_migrate.add_argument(
        "--plugin-root",
        default=None,
        help="RN plugin repo root (override). Also accepted as global option.",
    )
    p_migrate.add_argument("--dry-run", action="store_true", help="show changes without modifying files")
    p_migrate.set_defaults(func=cmd_migrate)

    p_repo_init = sp.add_parser(
        "repo-init",
        help="init git repo in ohos real directory with .gitignore, remote, and track tgz/bundle/signed-hap/adaptation artifacts",
    )
    p_repo_init.add_argument(
        "--plugin-root",
        default=None,
        help="RN plugin repo root (override). Also accepted as global option.",
    )
    p_repo_init.add_argument(
        "--remote",
        default=None,
        help="git remote URL (default: https://gitcode.com/rn_ohos_plugin/{repo_name}.git)",
    )
    p_repo_init.add_argument(
        "--branch",
        default=None,
        help="git branch name (default: br_ohos_dev)",
    )
    p_repo_init.add_argument(
        "--auto-push",
        action="store_true",
        default=None,
        help="auto commit and push after repo init (default: True when --remote/--branch not specified)",
    )
    p_repo_init.add_argument(
        "--create-remote",
        action="store_true",
        default=None,
        help="create remote repo on GitCode if not exists (default: True when --remote/--branch not specified)",
    )
    p_repo_init.add_argument(
        "--no-create-remote",
        action="store_true",
        help="skip remote repo creation check",
    )
    p_repo_init.add_argument(
        "--batch",
        action="store_true",
        help="batch mode: scan all repos in current directory and run repo-init for each",
    )
    p_repo_init.set_defaults(func=cmd_repo_init)

    args = p.parse_args()
    if getattr(args, "ohos_scope", None):
        set_runtime_ohos_npm_scope(args.ohos_scope)
    if getattr(args, "plugin_root", None) is None:
        args.plugin_root = os.getcwd()
    args.func(args)


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
