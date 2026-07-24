"""Keep oh-package.json5 / package-lock names aligned with ohos/package.json."""

from __future__ import annotations

import json
import os
import re
from typing import Callable, Optional

from lib.ohos_npm_config import (
    LEGACY_OHOS_NPM_SCOPE,
    is_ohos_name_template_placeholder,
    is_ohos_scoped_package_name,
    ohos_name_placeholder,
    ohos_package_name_from_parent,
    write_plugin_scope_file,
)
from lib.package_merge import derive_package_short_name

_OH_PKG_NAME_RE = re.compile(
    r'(?P<prefix>\s*(?:"name"|name)\s*:\s*)(?P<quote>[\'"])(?P<value>[^\'"]+)(?P=quote)',
    re.MULTILINE,
)

_LOCK_NAME_RE = re.compile(
    r'("name"\s*:\s*")([^"]+)(")',
)


def read_ohos_package_json_name(plugin_root: str) -> Optional[str]:
    path = os.path.join(os.path.abspath(plugin_root), "ohos", "package.json")
    if not os.path.isfile(path):
        return None
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        name = data.get("name")
        if isinstance(name, str) and name.strip() and not is_ohos_name_template_placeholder(name):
            return name.strip()
    except (OSError, json.JSONDecodeError):
        pass
    return None


def resolve_ohos_npm_package_name(plugin_root: str) -> str:
    """Canonical OHOS npm name（根 package.json + 当前 scope，不沿用错误的 ohos/package.json）。"""
    parent_path = os.path.join(os.path.abspath(plugin_root), "package.json")
    if os.path.isfile(parent_path):
        try:
            with open(parent_path, "r", encoding="utf-8") as f:
                pn = json.load(f).get("name")
            if isinstance(pn, str) and pn.strip():
                return ohos_package_name_from_parent(pn, plugin_root)
        except (OSError, json.JSONDecodeError):
            pass
    from_disk = read_ohos_package_json_name(plugin_root)
    if from_disk and not is_ohos_name_template_placeholder(from_disk):
        return from_disk
    from lib.ohos_npm_config import default_ohos_library_package_name

    return default_ohos_library_package_name(plugin_root)


def apply_oh_package_json5_content(content: str, ohos_name: str) -> tuple[str, bool]:
    """Replace ``{{NPM_NAME}}`` or ``name`` when still a template / legacy placeholder."""
    changed = False
    if "{{NPM_NAME}}" in content:
        content = content.replace("{{NPM_NAME}}", ohos_name)
        changed = True

    def _repl(m: re.Match[str]) -> str:
        nonlocal changed
        old = m.group("value")
        if old == ohos_name:
            return m.group(0)
        should_replace = (
            old == "{{NPM_NAME}}"
            or is_ohos_name_template_placeholder(old)
            or old.endswith("/xxx")
            or is_ohos_scoped_package_name(old)
        )
        if should_replace and old != ohos_name:
            changed = True
            q = m.group("quote")
            return f'{m.group("prefix")}{q}{ohos_name}{q}'
        return m.group(0)

    new_content = _OH_PKG_NAME_RE.sub(_repl, content)
    return new_content, changed


def write_oh_package_json5_name(path: str, ohos_name: str, *, log: Optional[Callable[[str], None]] = None) -> bool:
    if not os.path.isfile(path):
        return False
    with open(path, "r", encoding="utf-8") as f:
        old = f.read()
    new, changed = apply_oh_package_json5_content(old, ohos_name)
    if not changed:
        return False
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(new)
    if log:
        log(f"  同步 oh-package.json5 name -> {ohos_name} ({os.path.relpath(path, os.getcwd())})")
    return True


def sync_ohos_package_lock(plugin_root: str, ohos_name: str, *, log: Optional[Callable[[str], None]] = None) -> bool:
    lock_path = os.path.join(os.path.abspath(plugin_root), "ohos", "package-lock.json")
    if not os.path.isfile(lock_path):
        return False
    with open(lock_path, "r", encoding="utf-8") as f:
        content = f.read()

    placeholders = {
        "@react-native-oh-tpl/xxx",
        "@oh-rn/xxx",
        f"{LEGACY_OHOS_NPM_SCOPE}/xxx",
        ohos_name_placeholder(),
        "{{NPM_NAME}}",
    }
    new_content = content
    changed = False
    for old in placeholders:
        if old == ohos_name or old not in new_content:
            continue
        new_content = new_content.replace(f'"{old}"', f'"{ohos_name}"')
        changed = True

    if not changed:
        return False
    with open(lock_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(new_content)
    if log:
        log(f"  同步 ohos/package-lock.json name -> {ohos_name}")
    return True


def sync_ohos_package_json_name(
    plugin_root: str,
    ohos_name: str,
    *,
    log: Optional[Callable[[str], None]] = print,
) -> bool:
    """Align ``ohos/package.json`` ``name`` with canonical OHOS npm package name."""
    path = os.path.join(os.path.abspath(plugin_root), "ohos", "package.json")
    if not os.path.isfile(path):
        return False
    try:
        with open(path, "r", encoding="utf-8") as f:
            pkg = json.load(f)
    except (OSError, json.JSONDecodeError):
        return False
    current = pkg.get("name")
    if not isinstance(current, str):
        return False
    if current == ohos_name:
        return False
    if not (
        is_ohos_name_template_placeholder(current)
        or is_ohos_scoped_package_name(current)
    ):
        return False
    pkg["name"] = ohos_name
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(pkg, f, indent=2, ensure_ascii=False)
        f.write("\n")
    if log:
        log(f"  同步 ohos/package.json name -> {ohos_name}")
    return True


def sync_ohos_autolinking_oh_package_name(
    plugin_root: str,
    ohos_name: str,
    *,
    log: Optional[Callable[[str], None]] = None,
) -> bool:
    """Align ``harmony.autolinking.ohPackageName`` with ``ohos/package.json`` ``name``."""
    path = os.path.join(os.path.abspath(plugin_root), "ohos", "package.json")
    if not os.path.isfile(path):
        return False
    try:
        with open(path, "r", encoding="utf-8") as f:
            pkg = json.load(f)
    except (OSError, json.JSONDecodeError):
        return False

    harmony = pkg.get("harmony")
    if not isinstance(harmony, dict):
        return False
    autolinking = harmony.get("autolinking")
    if not isinstance(autolinking, dict):
        return False

    current = autolinking.get("ohPackageName")
    if not isinstance(current, str) or current.strip() == ohos_name:
        return False
    if not (
        is_ohos_name_template_placeholder(current)
        or is_ohos_scoped_package_name(current)
    ):
        return False

    harmony = dict(harmony)
    autolinking = dict(autolinking)
    autolinking["ohPackageName"] = ohos_name
    harmony["autolinking"] = autolinking
    pkg["harmony"] = harmony

    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(pkg, f, indent=2, ensure_ascii=False)
        f.write("\n")
    if log:
        log(f"  同步 harmony.autolinking.ohPackageName -> {ohos_name}")
    return True


def sync_plugin_oh_package_names(
    plugin_root: str,
    *,
    ohos_name: Optional[str] = None,
    short_name: Optional[str] = None,
    log: Optional[Callable[[str], None]] = print,
) -> str:
    """
    Align ohos/package.json, harmony / har_wrapper oh-package.json5, package-lock.
    Returns the canonical ohos_name used.
    """
    root = os.path.abspath(plugin_root)
    name = ohos_name or resolve_ohos_npm_package_name(root)
    sync_ohos_package_json_name(root, name, log=log)
    sync_ohos_autolinking_oh_package_name(root, name, log=log)
    sn = short_name
    if not sn:
        parent_path = os.path.join(root, "package.json")
        if os.path.isfile(parent_path):
            try:
                with open(parent_path, "r", encoding="utf-8") as f:
                    pn = json.load(f).get("name", "")
                if isinstance(pn, str) and pn.strip():
                    sn = derive_package_short_name(pn)
            except (OSError, json.JSONDecodeError):
                pass
        if not sn:
            sn = derive_package_short_name(name)

    ohos_real = os.path.realpath(os.path.join(root, "ohos")) if os.path.isdir(os.path.join(root, "ohos")) else os.path.join(root, "ohos")

    targets = [
        os.path.join(ohos_real, "harmony", sn, "oh-package.json5"),
        os.path.join(ohos_real, ".rn-build", "har_wrapper", sn, "oh-package.json5"),
    ]
    for path in targets:
        write_oh_package_json5_name(path, name, log=log)

    sync_ohos_package_lock(root, name, log=log)
    try:
        write_plugin_scope_file(root)
    except OSError:
        pass
    return name
