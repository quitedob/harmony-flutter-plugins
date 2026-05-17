"""Merge parent plugin package.json into ohos template (xxx placeholders)."""

from __future__ import annotations

import json
import os
import re
from typing import Any, Mapping


def _load_json(path: str) -> dict[str, Any]:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _save_json(path: str, data: Mapping[str, Any]) -> None:
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def _is_placeholder(value: Any) -> bool:
    if not isinstance(value, str):
        return False
    s = value.strip()
    if s == "xxx":
        return True
    if re.fullmatch(r"xxx/xxx", s):
        return True
    # ``templates/ohos_skeleton/package.json`` uses this literal for ``name`` / ``displayName``.
    if s == "@react-native-oh-tpl/xxx":
        return True
    return False


_OHOS_NPM_SCOPE = "@react-native-oh-tpl"


def ohos_package_name_from_parent(parent_name: str) -> str:
    """Map root ``package.json`` ``name`` → ``ohos/package.json`` ``name``.

    - ``@AAA/BBB`` → ``@react-native-oh-tpl/BBB``
    - unscoped ``AAA`` → ``@react-native-oh-tpl/AAA``
    """
    n = (parent_name or "").strip()
    if not n:
        return f"{_OHOS_NPM_SCOPE}/package"
    if n.startswith("@") and "/" in n:
        _, rest = n.split("/", 1)
        rest = rest.strip()
        if rest:
            return f"{_OHOS_NPM_SCOPE}/{rest}"
        tail = n.lstrip("@").replace("/", "-").strip("-") or "package"
        return f"{_OHOS_NPM_SCOPE}/{tail}"
    if "/" in n:
        # tolerate ``AAA/BBB`` without leading ``@`` (same as ``@AAA/BBB`` → ``…/BBB``)
        return f"{_OHOS_NPM_SCOPE}/{n.rsplit('/', 1)[-1].strip()}"
    return f"{_OHOS_NPM_SCOPE}/{n}"


def merge_parent_into_ohos_package(
    plugin_root: str,
    ohos_package_json: str,
    *,
    dry_run: bool = False,
) -> None:
    parent_pkg_path = os.path.join(os.path.abspath(plugin_root), "package.json")
    if not os.path.isfile(parent_pkg_path):
        raise FileNotFoundError(parent_pkg_path)
    parent = _load_json(parent_pkg_path)
    ohos_pkg = _load_json(ohos_package_json)

    if "name" in ohos_pkg and _is_placeholder(ohos_pkg["name"]):
        pn = parent.get("name")
        if isinstance(pn, str) and pn.strip():
            ohos_pkg["name"] = ohos_package_name_from_parent(pn)

    for k in ("displayName", "version", "description"):
        if k not in ohos_pkg:
            continue
        if _is_placeholder(ohos_pkg[k]) and k in parent:
            ohos_pkg[k] = parent[k]

    if "displayName" in ohos_pkg and "displayName" not in parent:
        nm = ohos_pkg.get("name")
        if isinstance(nm, str) and nm.strip() and not _is_placeholder(nm):
            ohos_pkg["displayName"] = nm.strip()

    repo = parent.get("repository")
    if isinstance(repo, dict) and isinstance(repo.get("url"), str):
        ohos_pkg["repository"] = dict(repo)
    elif isinstance(repo, str):
        ohos_pkg["repository"] = {"type": "git", "url": repo}

    if isinstance(parent.get("homepage"), str):
        ohos_pkg["homepage"] = parent["homepage"]

    parent_deps = parent.get("dependencies", {})
    if isinstance(parent_deps, dict) and parent_deps:
        ohos_deps = ohos_pkg.get("dependencies", {})
        if not isinstance(ohos_deps, dict):
            ohos_deps = {}
        for k, v in parent_deps.items():
            if k not in ohos_deps:
                ohos_deps[k] = v
        ohos_pkg["dependencies"] = ohos_deps

    parent_peer = parent.get("peerDependencies", {})
    if isinstance(parent_peer, dict) and parent_peer:
        ohos_peer = ohos_pkg.get("peerDependencies", {})
        if not isinstance(ohos_peer, dict):
            ohos_peer = {}
        for k, v in parent_peer.items():
            if k not in ohos_peer:
                ohos_peer[k] = v
        ohos_pkg["peerDependencies"] = ohos_peer

    harmony = ohos_pkg.get("harmony")
    if isinstance(harmony, dict) and _is_placeholder(harmony.get("alias")):
        harmony = dict(harmony)
        pn = parent.get("name")
        if isinstance(pn, str) and pn.strip():
            harmony["alias"] = pn.strip()
        ohos_pkg["harmony"] = harmony

    if dry_run:
        print(f"[dry-run] would write merged package.json -> {ohos_package_json}")
        return
    _save_json(ohos_package_json, ohos_pkg)
    print(f"  merged parent fields into {ohos_package_json}")


def _dir_has_valid_files(path: str) -> bool:
    """
    A specPaths dir is considered "valid" if it contains at least one file other than `.gitkeep`.
    Search recursively to allow nested spec layouts.
    """
    if not os.path.isdir(path):
        return False
    for dirpath, _, filenames in os.walk(path):
        for fn in filenames:
            if fn == ".gitkeep":
                continue
            if fn.startswith("."):
                continue
            return True
    return False


def prune_harmony_codegen_config_by_specpaths(
    ohos_package_json: str,
    *,
    dry_run: bool = False,
) -> bool:
    """
    If `harmony.codegenConfig[*].specPaths` point to directories that contain no valid files
    (excluding `.gitkeep`), remove those `codegenConfig` entries.

    Returns True if the package.json would be/was modified.
    """
    ohos_pkg = _load_json(ohos_package_json)
    harmony = ohos_pkg.get("harmony")
    if not isinstance(harmony, dict):
        return False
    codegen = harmony.get("codegenConfig")
    if not isinstance(codegen, list):
        return False

    base_dir = os.path.dirname(os.path.abspath(ohos_package_json))

    kept: list[Any] = []
    removed = 0
    for entry in codegen:
        if not isinstance(entry, dict):
            kept.append(entry)
            continue
        spec_paths = entry.get("specPaths")
        if not isinstance(spec_paths, list) or not spec_paths:
            kept.append(entry)
            continue

        any_valid = False
        for p in spec_paths:
            if not isinstance(p, str) or not p.strip():
                continue
            rel = p.strip()
            # tolerate both "./x" and "x"
            rel_norm = rel[2:] if rel.startswith("./") else rel
            abs_dir = os.path.normpath(os.path.join(base_dir, rel_norm))
            if _dir_has_valid_files(abs_dir):
                any_valid = True
                break

        if any_valid:
            kept.append(entry)
        else:
            removed += 1

    if removed == 0:
        return False

    harmony = dict(harmony)
    harmony["codegenConfig"] = kept
    ohos_pkg["harmony"] = harmony

    if dry_run:
        print(f"[dry-run] would prune harmony.codegenConfig ({removed} entries) in {ohos_package_json}")
        return True

    _save_json(ohos_package_json, ohos_pkg)
    print(f"  pruned harmony.codegenConfig: removed {removed} entries with empty specPaths")
    return True
