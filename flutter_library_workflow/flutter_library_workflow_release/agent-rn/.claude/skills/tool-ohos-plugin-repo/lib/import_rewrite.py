"""Rewrite import-like string paths after layout changes.

This skill copies parent plugin sources into ``ohos/src`` and may relocate
spec files into ``ohos/src/specs/v1``. Some plugins reference spec files via
runtime ``require()`` or dynamic ``import()`` rather than static ``import``.

Rewrites:
1. specs -> specs/v1 (spec file relocation)
2. Cross-directory imports (../src/xxx -> ./xxx, ../lib/xxx -> ./xxx)
"""

from __future__ import annotations

import os
import re


_TS_EXTS = (".ts", ".tsx")
_SOURCE_DIR_NAMES = ("src", "lib", "js", "source", "ts", "Sources")


def _rewrite_specs_path(p: str) -> str:
    if "/specs/" in p:
        if "/specs/v1/" in p or "/specs/v2/" in p:
            return p
        return p.replace("/specs/", "/specs/v1/", 1)
    if p.endswith("/specs"):
        return p + "/v1"
    if p.endswith("/specs/"):
        return p + "v1/"
    return p


def _rewrite_cross_dir_import(p: str) -> str:
    """Rewrite cross-directory imports after flattening into ohos/src/.
    
    Examples:
    - '../src/utils' -> './utils'
    - '../lib/module' -> './module'
    - '../../src/foo' -> './foo'
    - '../src/' -> './'
    - './utils' -> './utils' (no change)
    - 'react-native' -> 'react-native' (no change, external module)
    """
    if not p.startswith("../"):
        return p
    
    parts = p.split("/")
    source_dir_idx = -1
    for i, part in enumerate(parts):
        if part in _SOURCE_DIR_NAMES:
            source_dir_idx = i
            break
    
    if source_dir_idx == -1:
        return p
    
    remaining_parts = parts[source_dir_idx + 1:]
    
    if not remaining_parts:
        return "./"
    
    new_path = "./" + "/".join(remaining_parts)
    return new_path


def _rewrite_by_spec_basenames(p: str, spec_basenames_no_ext: set[str]) -> str:
    """Rewrite shallow relative references to spec files into specs/v1.

    Example:
      ./NativeGetDeviceLocale        -> ./specs/v1/NativeGetDeviceLocale
      ./NativeGetDeviceLocale.ts     -> ./specs/v1/NativeGetDeviceLocale.ts
    """
    if not spec_basenames_no_ext:
        return p
    if not (p.startswith("./") or p.startswith("../")):
        return p
    # Only rewrite "shallow" refs like ./Foo or ../Foo (no additional slash).
    tail = p.split("/", 1)[-1] if p.startswith("./") else (p.split("/", 1)[-1] if p.startswith("../") else p)
    if "/" in tail:
        return p
    base = tail
    ext = ""
    if base.endswith(".ts"):
        ext = ".ts"
        base = base[: -len(".ts")]
    elif base.endswith(".tsx"):
        ext = ".tsx"
        base = base[: -len(".tsx")]
    if base in spec_basenames_no_ext:
        prefix = "./" if p.startswith("./") else "../"
        return f"{prefix}specs/v1/{base}{ext}"
    return p


def _rewrite_import_like_literals(text: str, *, spec_basenames_no_ext: set[str]) -> tuple[str, int]:
    changed = 0

    def sub(m: re.Match[str]) -> str:
        nonlocal changed
        q = m.group("q")
        path = m.group("path")
        new_path = _rewrite_specs_path(path)
        new_path = _rewrite_by_spec_basenames(new_path, spec_basenames_no_ext)
        new_path = _rewrite_cross_dir_import(new_path)
        if new_path != path:
            changed += 1
        return m.group(0).replace(f"{q}{path}{q}", f"{q}{new_path}{q}")

    patterns = [
        # require('./x')
        re.compile(r"""\brequire\s*\(\s*(?P<q>['"])(?P<path>[^'"]+)(?P=q)\s*\)"""),
        # import('./x')
        re.compile(r"""\bimport\s*\(\s*(?P<q>['"])(?P<path>[^'"]+)(?P=q)\s*\)"""),
        # import ... from './x'
        re.compile(r"""\bfrom\s+(?P<q>['"])(?P<path>[^'"]+)(?P=q)"""),
        # side-effect import './x'
        re.compile(r"""\bimport\s+(?P<q>['"])(?P<path>[^'"]+)(?P=q)"""),
    ]
    for pat in patterns:
        text = pat.sub(sub, text)
    return text, changed


def walk_and_rewrite(ohos_src: str, *, dry_run: bool, spec_basenames_no_ext: set[str] | None = None) -> int:
    """Rewrite import-like paths under ``ohos_src``.

    Returns number of files changed.
    """
    touched = 0
    spec_basenames_no_ext = spec_basenames_no_ext or set()
    for dirpath, _dirnames, filenames in os.walk(ohos_src):
        for fn in filenames:
            if not fn.endswith(_TS_EXTS):
                continue
            path = os.path.join(dirpath, fn)
            with open(path, "r", encoding="utf-8") as f:
                before = f.read()
            after, n = _rewrite_import_like_literals(before, spec_basenames_no_ext=spec_basenames_no_ext)
            if n <= 0 or after == before:
                continue
            touched += 1
            if dry_run:
                print(f"  [dry-run] would rewrite imports in {path}")
                continue
            with open(path, "w", encoding="utf-8", newline="\n") as f:
                f.write(after)
            print(f"  rewrote imports in {path} ({n} replacements)")
    return touched
