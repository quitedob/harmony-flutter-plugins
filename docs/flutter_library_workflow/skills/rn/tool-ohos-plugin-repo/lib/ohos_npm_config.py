"""Configurable OHOS npm scope for Harmony RN packages (default ``@oh-rn``)."""

from __future__ import annotations

import json
import os
import re
from typing import Optional

DEFAULT_OHOS_NPM_SCOPE = "@oh-rn"
LEGACY_OHOS_NPM_SCOPE = "@react-native-oh-tpl"
KNOWN_OHOS_SCOPES = frozenset({DEFAULT_OHOS_NPM_SCOPE, LEGACY_OHOS_NPM_SCOPE, "@react-native-ohos"})

_ENV_SCOPE = "RN_OHOS_NPM_SCOPE"
_RUNTIME_SCOPE: Optional[str] = None


def normalize_ohos_npm_scope(scope: str) -> str:
    s = (scope or "").strip()
    if not s:
        return DEFAULT_OHOS_NPM_SCOPE
    if not s.startswith("@"):
        s = f"@{s}"
    if not re.fullmatch(r"@[\w][\w.-]*", s):
        return DEFAULT_OHOS_NPM_SCOPE
    return s


def set_runtime_ohos_npm_scope(scope: Optional[str]) -> None:
    """Override scope for current process (tests / ``rn.py --ohos-scope``)."""
    global _RUNTIME_SCOPE
    _RUNTIME_SCOPE = normalize_ohos_npm_scope(scope) if scope else None


def _read_adapt_workflow_settings() -> dict:
    ws = (os.environ.get("WORKSPACE_ROOT") or "").strip()
    if not ws:
        return {}
    path = os.path.join(ws, "adapt-workflow", "data", "settings.json")
    if not os.path.isfile(path):
        return {}
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data if isinstance(data, dict) else {}
    except (OSError, json.JSONDecodeError):
        return {}


def _read_plugin_scope_file(plugin_root: Optional[str]) -> Optional[str]:
    if not plugin_root:
        return None
    path = os.path.join(
        os.path.abspath(plugin_root), ".rn-ohos-adaptation", "ohos-npm-scope"
    )
    if not os.path.isfile(path):
        return None
    try:
        with open(path, "r", encoding="utf-8") as f:
            line = f.readline().strip()
        return line or None
    except OSError:
        return None


def get_ohos_npm_scope(plugin_root: Optional[str] = None) -> str:
    """Resolve active OHOS npm scope for scaffolding / example wiring."""
    if _RUNTIME_SCOPE:
        return _RUNTIME_SCOPE
    env = (os.environ.get(_ENV_SCOPE) or "").strip()
    if env:
        return normalize_ohos_npm_scope(env)
    settings = _read_adapt_workflow_settings()
    from_settings = settings.get("ohosNpmScope")
    if isinstance(from_settings, str) and from_settings.strip():
        return normalize_ohos_npm_scope(from_settings)
    plugin_scope = _read_plugin_scope_file(plugin_root)
    if plugin_scope:
        return normalize_ohos_npm_scope(plugin_scope)
    return DEFAULT_OHOS_NPM_SCOPE


def ohos_name_placeholder() -> str:
    return f"{get_ohos_npm_scope()}/xxx"


def default_ohos_library_package_name(plugin_root: Optional[str] = None) -> str:
    return f"{get_ohos_npm_scope(plugin_root)}/library"


def ohos_package_name_from_parent(parent_name: str, plugin_root: Optional[str] = None) -> str:
    """Map root ``package.json`` ``name`` → ``ohos/package.json`` ``name``."""
    scope = get_ohos_npm_scope(plugin_root)
    n = (parent_name or "").strip()
    if not n:
        return f"{scope}/package"
    if n.startswith("@") and "/" in n:
        _, rest = n.split("/", 1)
        rest = rest.strip()
        if rest:
            return f"{scope}/{rest}"
        tail = n.lstrip("@").replace("/", "-").strip("-") or "package"
        return f"{scope}/{tail}"
    if "/" in n:
        return f"{scope}/{n.rsplit('/', 1)[-1].strip()}"
    return f"{scope}/{n}"


def is_known_ohos_npm_scope(scope: str) -> bool:
    return normalize_ohos_npm_scope(scope) in KNOWN_OHOS_SCOPES or scope in KNOWN_OHOS_SCOPES


def is_ohos_scoped_package_name(name: str) -> bool:
    """True if *name* uses the configured scope or a known legacy OHOS scope."""
    if not isinstance(name, str) or not name.startswith("@"):
        return False
    for scope in (get_ohos_npm_scope(), *KNOWN_OHOS_SCOPES):
        if name.startswith(f"{scope}/"):
            return True
    return False


def is_ohos_name_template_placeholder(value: object) -> bool:
    if not isinstance(value, str):
        return False
    s = value.strip()
    if s in ("xxx", "xxx/xxx"):
        return True
    if s == ohos_name_placeholder():
        return True
    if s == f"{LEGACY_OHOS_NPM_SCOPE}/xxx":
        return True
    return bool(re.fullmatch(r"@[\w][\w.-]*/xxx", s))


def write_plugin_scope_file(plugin_root: str, scope: Optional[str] = None) -> str:
    """Persist scope under ``.rn-ohos-adaptation/ohos-npm-scope`` (optional)."""
    root = os.path.abspath(plugin_root)
    adapt_dir = os.path.join(root, ".rn-ohos-adaptation")
    os.makedirs(adapt_dir, exist_ok=True)
    path = os.path.join(adapt_dir, "ohos-npm-scope")
    value = normalize_ohos_npm_scope(scope or get_ohos_npm_scope(root))
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(value + "\n")
    return path
