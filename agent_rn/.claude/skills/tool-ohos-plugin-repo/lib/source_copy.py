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
    """Pick main TS/TSX entry under source_root from common names or package.json entry."""
    base = os.path.join(plugin_root, source_root.replace("/", os.sep))
    for name in ("index.ts", "index.tsx"):
        p = os.path.join(base, name)
        if os.path.isfile(p):
            return p

    main = parent_pkg.get("react-native") or parent_pkg.get("module") or parent_pkg.get("main")
    if isinstance(main, str) and not main.startswith("dist/") and not main.startswith("./dist/"):
        rel = main.lstrip("./")
        p = os.path.join(plugin_root, rel.replace("/", os.sep))
        if os.path.isfile(p) and (p.endswith(".ts") or p.endswith(".tsx")):
            return p
    return None


def copy_specs_to_v1(plugin_root: str, ohos_src: str, hits: list[spec_scan.SpecHit], *, dry_run: bool) -> set[str]:
    """Copy Turbo/Fabric spec files into ohos/src/specs/v1/. Returns set of absolute source paths copied."""
    v1 = os.path.join(ohos_src, "specs", "v1")
    if not dry_run:
        os.makedirs(v1, exist_ok=True)
    copied_abs: set[str] = set()
    for h in hits:
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
    src_root = os.path.join(plugin_root, source_root.replace("/", os.sep))
    if not os.path.isdir(src_root):
        return
    for dirpath, dirnames, filenames in os.walk(src_root):
        rel_dir = os.path.relpath(dirpath, src_root)
        if rel_dir == ".":
            rel_dir = ""
        for fn in filenames:
            if not (fn.endswith(".ts") or fn.endswith(".tsx")):
                continue
            abs_src = os.path.join(dirpath, fn)
            if os.path.normpath(abs_src) in spec_abs_paths:
                continue
            if entry_abs and os.path.normpath(abs_src) == os.path.normpath(entry_abs):
                continue
            rel = os.path.join(rel_dir, fn).replace("\\", "/") if rel_dir else fn
            dst = os.path.join(ohos_src, rel.replace("/", os.sep))
            if dry_run:
                print(f"  [dry-run] src copy {source_root}/{rel} -> ohos/src/{rel}")
            else:
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                shutil.copy2(abs_src, dst)
                print(f"  copied {source_root}/{rel}")


def write_index_from_parent(
    plugin_root: str,
    ohos_src: str,
    parent_pkg: dict,
    source_root: str = "src",
    *,
    dry_run: bool,
) -> None:
    """Copy resolved entry to ohos/src/index.ts or index.tsx to match source extension."""
    entry = resolve_entry_source_file(plugin_root, parent_pkg, source_root)
    if not entry:
        print("  [warn] could not resolve parent entry file; skip ohos/src/index")
        return
    ext = os.path.splitext(entry)[1].lower()
    name = "index.tsx" if ext == ".tsx" else "index.ts"
    dst = os.path.join(ohos_src, name)
    if dry_run:
        print(f"  [dry-run] entry {entry} -> ohos/src/{name}")
        return
    os.makedirs(ohos_src, exist_ok=True)
    shutil.copy2(entry, dst)
    print(f"  wrote ohos/src/{name} from {os.path.relpath(entry, plugin_root)}")
