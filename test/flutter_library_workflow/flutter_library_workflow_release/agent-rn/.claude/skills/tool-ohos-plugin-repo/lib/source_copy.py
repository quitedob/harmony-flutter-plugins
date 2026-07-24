"""Copy plugin src into ohos/src (specs to specs/v1, entry to index.ts)."""

from __future__ import annotations

import json
import os
import shutil
from typing import Optional

from . import spec_scan


def read_parent_package(plugin_root: str) -> dict:
    with open(os.path.join(plugin_root, "package.json"), "r", encoding="utf-8") as f:
        return json.load(f)


def resolve_entry_source_file(plugin_root: str, parent_pkg: dict, source_root: str = "src") -> Optional[str]:
    """Resolve package entry file (prefer package.json main over src/index.js)."""
    _SOURCE_EXTS = (".ts", ".tsx", ".js", ".jsx")

    for field in ("react-native", "source", "module", "main"):
        val = parent_pkg.get(field)
        if not isinstance(val, str):
            continue
        rel = val.lstrip("./")
        if rel.startswith("dist/") or rel.startswith("./dist/"):
            continue
        p = os.path.join(plugin_root, rel.replace("/", os.sep))
        if os.path.isfile(p) and p.endswith(_SOURCE_EXTS):
            return rel.replace("\\", "/")
        if not any(rel.endswith(ext) for ext in _SOURCE_EXTS):
            for ext in _SOURCE_EXTS:
                candidate = os.path.join(plugin_root, rel.replace("/", os.sep), f"index{ext}")
                if os.path.isfile(candidate):
                    return f"{rel}/index{ext}".replace("\\", "/")

    base = os.path.join(plugin_root, source_root.replace("/", os.sep))
    for name in ("index.ts", "index.tsx", "index.js", "index.jsx"):
        p = os.path.join(base, name)
        if os.path.isfile(p):
            return f"{source_root}/{name}".replace("\\", "/")
    return None


def copy_specs_to_v1(plugin_root: str, ohos_src: str, hits: list[spec_scan.SpecHit], *, dry_run: bool) -> set[str]:
    """Copy Turbo/Fabric/Nitro spec definition files into ohos/src/specs/v1/. 
    
    Only copies files that are actual spec definitions:
    - TurboModule Spec (TurboModuleRegistry.get)
    - Fabric Spec (codegenNativeComponent)
    - NitroModules spec definition (extends HybridObject)
    
    Does NOT copy NitroModules usage files (createHybridObject).
    
    Returns set of absolute source paths copied."""
    v1 = os.path.join(ohos_src, "specs", "v1")
    if not dry_run:
        os.makedirs(v1, exist_ok=True)
    copied_abs: set[str] = set()
    for h in hits:
        # Skip NitroModules usage files (createHybridObject) - only copy spec definitions
        if h.nitro_names and not h.is_nitro_spec_def:
            # This is a NitroModules usage file (export layer), not a spec definition
            # Don't copy it to specs/v1/; it will be copied by copy_remaining_src
            continue
        base = os.path.basename(h.abs_path)
        dst = os.path.join(v1, base)
        if dry_run:
            print(f"  [dry-run] spec copy {h.rel_posix} -> specs/v1/{base}")
            copied_abs.add(os.path.normpath(h.abs_path))
        else:
            shutil.copy2(h.abs_path, dst)
            copied_abs.add(os.path.normpath(h.abs_path))
            print(f"  copied spec {h.rel_posix} -> specs/v1/{base}")
    return copied_abs


def copy_remaining_src(
    plugin_root: str,
    ohos_src: str,
    spec_abs_paths: set[str],
    entry_abs: Optional[str],
    source_root: str = "src",
    *,
    dry_run: bool,
) -> None:
    """Copy other files from plugin source_root into ohos/src/ preserving relative layout."""
    from lib.source_layout import is_dual_entry_layout

    src_root = os.path.join(plugin_root, source_root.replace("/", os.sep))
    if not os.path.isdir(src_root):
        return

    entry_rel = ""
    if entry_abs:
        entry_rel = os.path.relpath(entry_abs, plugin_root).replace("\\", "/")
    dual_entry = is_dual_entry_layout(entry_rel, source_root, plugin_root)
    
    for dirpath, dirnames, filenames in os.walk(src_root):
        rel_dir = os.path.relpath(dirpath, src_root)
        if rel_dir == ".":
            rel_dir = ""
        for fn in filenames:
            ext = os.path.splitext(fn)[1].lower()
            if ext not in (".ts", ".tsx", ".js", ".jsx"):
                continue
            abs_src = os.path.join(dirpath, fn)
            if os.path.normpath(abs_src) in spec_abs_paths:
                continue
            if entry_abs and os.path.normpath(abs_src) == os.path.normpath(entry_abs):
                continue
            rel = os.path.join(rel_dir, fn).replace("\\", "/") if rel_dir else fn
            if dual_entry:
                rel_dest = f"{source_root}/{rel}".replace("\\", "/") if rel else source_root
            else:
                rel_dest = rel
            dst = os.path.join(ohos_src, rel_dest.replace("/", os.sep))
            if dry_run:
                print(f"  [dry-run] src copy {source_root}/{rel} -> ohos/src/{rel}")
            else:
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                shutil.copy2(abs_src, dst)
                print(f"  copied {source_root}/{rel}")


def _resolve_harmony_module_name(plugin_root: str) -> str:
    """Module name for declare module — prefer harmony.alias."""
    import json

    for rel in ("ohos/package.json", "package.json"):
        path = os.path.join(plugin_root, rel.replace("/", os.sep))
        if not os.path.isfile(path):
            continue
        with open(path, "r", encoding="utf-8") as f:
            pkg = json.load(f)
        harmony = pkg.get("harmony")
        if isinstance(harmony, dict):
            alias = harmony.get("alias")
            if isinstance(alias, str) and alias.strip():
                return alias.strip()
        name = pkg.get("name")
        if isinstance(name, str) and name.strip():
            return name.strip()
    return "package"


def write_ohos_entry_index(
    plugin_root: str,
    ohos_src: str,
    entry_rel: str,
    source_root: str = "src",
    *,
    dry_run: bool,
) -> None:
    """Write ohos/src/index.* from plugin entry (dual-entry may rewrite default export)."""
    from lib.source_layout import (
        build_harmony_dual_entry_barrel,
        build_harmony_dual_entry_dts,
        is_dual_entry_layout,
        parse_dual_entry_barrel_names,
    )

    entry_path = os.path.join(plugin_root, entry_rel.replace("/", os.sep))
    if not os.path.isfile(entry_path):
        print(f"  [warn] entry file not found: {entry_rel}")
        return

    ext = os.path.splitext(entry_rel)[1].lower()
    if ext == ".tsx":
        name = "index.tsx"
    elif ext == ".ts":
        name = "index.ts"
    elif ext == ".jsx":
        name = "index.jsx"
    else:
        name = "index.js"

    dst = os.path.join(ohos_src, name)
    if dry_run:
        print(f"  [dry-run] entry {entry_rel} -> ohos/src/{name}")
        return

    os.makedirs(ohos_src, exist_ok=True)
    dual_entry = is_dual_entry_layout(entry_rel, source_root, plugin_root)
    entry_content = ""
    barrel: Optional[str] = None
    if dual_entry:
        with open(entry_path, "r", encoding="utf-8") as f:
            entry_content = f.read()
        barrel = build_harmony_dual_entry_barrel(entry_content, source_root)

    if barrel is not None:
        with open(dst, "w", encoding="utf-8", newline="\n") as f:
            f.write(barrel)
        print(f"  wrote ohos/src/{name} (harmony dual-entry barrel from {entry_rel})")

        names = parse_dual_entry_barrel_names(entry_content, source_root)
        module_name = _resolve_harmony_module_name(plugin_root)
        if names:
            dts_path = os.path.join(ohos_src, "index.d.ts")
            with open(dts_path, "w", encoding="utf-8", newline="\n") as f:
                f.write(build_harmony_dual_entry_dts(module_name, names))
            print(f"  wrote ohos/src/index.d.ts (harmony dual-entry types, module={module_name})")
        return

    shutil.copy2(entry_path, dst)
    print(f"  wrote ohos/src/{name} from {entry_rel}")


def write_index_from_parent(
    plugin_root: str,
    ohos_src: str,
    parent_pkg: dict,
    source_root: str = "src",
    *,
    dry_run: bool,
) -> None:
    """Copy resolved entry to ohos/src/index.ts/js to match source extension."""
    entry_rel = resolve_entry_source_file(plugin_root, parent_pkg, source_root)
    if not entry_rel:
        print("  [warn] could not resolve parent entry file; skip ohos/src/index")
        return
    write_ohos_entry_index(
        plugin_root, ohos_src, entry_rel, source_root=source_root, dry_run=dry_run
    )
