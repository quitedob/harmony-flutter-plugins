"""Helpers for plugin source / entry layout (single vs dual index.js)."""

from __future__ import annotations

import os
import re
from typing import Optional

_INDEX_NAMES = ("index.ts", "index.tsx", "index.js", "index.jsx")


def normalize_repo_rel(path: str) -> str:
    return path.replace("\\", "/").lstrip("./")


def source_root_has_index(plugin_root: str, source_root: str) -> bool:
    """Whether source_root contains its own index.* entry file."""
    base = os.path.join(plugin_root, source_root.replace("/", os.sep))
    return any(os.path.isfile(os.path.join(base, name)) for name in _INDEX_NAMES)


def is_dual_entry_layout(entry_file: str, source_root: str, plugin_root: str) -> bool:
    """Root package entry plus a separate index under source_root.

    Example (react-native-navigation-bar-color):
      index.js       <- package main (barrel)
      src/index.js   <- NativeModules / Turbo implementation

    Root main + src/*.ts without src/index.* (CREATE-06) is NOT dual-entry;
    those files should flatten into ohos/src/.
    """
    entry = normalize_repo_rel(entry_file or "")
    root = normalize_repo_rel(source_root or "")
    if not entry or not root or not plugin_root:
        return False
    if entry == root or entry.startswith(root + "/"):
        return False
    return source_root_has_index(plugin_root, root)


def parse_dual_entry_barrel_names(entry_content: str, source_root: str = "src") -> Optional[list[str]]:
    """Names re-exported from ./src in a dual-entry root barrel (or None if not applicable)."""
    root = (source_root or "src").strip().strip("./") or "src"
    imp_re = re.compile(
        rf"import\s*\{{([^}}]+)\}}\s*from\s*['\"]\./{re.escape(root)}['\"]",
        re.MULTILINE,
    )
    imp = imp_re.search(entry_content)
    if not imp or re.search(r"export\s+default\s*\{", entry_content):
        return None

    names: list[str] = []
    for part in imp.group(1).split(","):
        part = part.strip()
        if not part:
            continue
        if " as " in part:
            names.append(part.split(" as ", 1)[0].strip())
        else:
            names.append(part)
    if len(names) < 2:
        return None

    def_m = re.search(r"export\s+default\s+(\w+)\s*;?", entry_content)
    if not def_m or def_m.group(1) not in names:
        return None
    return names


def build_harmony_dual_entry_barrel(entry_content: str, source_root: str = "src") -> Optional[str]:
    """Rewrite root barrel for Harmony when default is a single function re-export.

    Original npm layout (navigation-bar-color):
      export default changeNavigationBarColor;
      export { hideNavigationBar, showNavigationBar };

    Example apps use ``import X from 'pkg'; X.showNavigationBar()`` — default must be an object.
    """
    names = parse_dual_entry_barrel_names(entry_content, source_root)
    if not names:
        return None

    root = (source_root or "src").strip().strip("./") or "src"
    imports = ", ".join(names)
    body = ",\n".join(f"  {n}" for n in names)
    return (
        f"import {{ {imports} }} from './{root}';\n"
        "\n"
        "const defaultExport = {\n"
        f"{body},\n"
        "};\n"
        "\n"
        "export default defaultExport;\n"
        f"export {{ {imports} }};\n"
    )


def build_harmony_dual_entry_dts(module_name: str, names: list[str]) -> str:
    """Type declarations aligned with harmony dual-entry object default export."""
    fn_lines = "\n\n".join(
        f"  function {n}(...args: any[]): any;" for n in names
    )
    iface_members = "\n".join(
        f"    {n}: typeof {n};" for n in names
    )
    export_names = ", ".join(names)
    return (
        f"declare module '{module_name}' {{\n"
        f"{fn_lines}\n\n"
        "  interface DefaultExport {\n"
        f"{iface_members}\n"
        "  }\n\n"
        "  const defaultExport: DefaultExport;\n"
        "  export default defaultExport;\n"
        f"  export {{ {export_names} }};\n"
        "}\n"
    )
