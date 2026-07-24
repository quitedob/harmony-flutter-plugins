"""Scan plugin for TurboModuleRegistry / codegenNativeComponent (global scan, no fixed src dir)."""

from __future__ import annotations

import os
import re
from dataclasses import dataclass

SKIP_DIR_NAMES = frozenset(
    {
        "android",
        "harmony",
        "ios",
        "windows",
        "macos",
        "linux",
        "node_modules",
        "pods",
        "build",
        "dist",
        "lib",
        "out",
        "oh_modules",
        ".rn-ohos-adaptation",
        "example",
        "Example",
        "examples",
        "tests",
        "test",
        "__tests__",
        ".git",
        ".rn-build",
        "coverage",
        "docs",
        "documentation",
    }
)

_SKIP_DIR_NAMES_LOWER = frozenset({d.lower() for d in SKIP_DIR_NAMES})

_SKIP_DIR_PREFIXES = ("ohos",)


def _should_skip_dir(dirname: str) -> bool:
    lower = dirname.lower()
    if lower in _SKIP_DIR_NAMES_LOWER:
        return True
    for prefix in _SKIP_DIR_PREFIXES:
        if lower.startswith(prefix):
            return True
    return False

_RE_TURBO = re.compile(
    r"TurboModuleRegistry\.(?:get|getEnforcing)\s*(?:<[^>]+>)?\s*\(\s*['\"]([^'\"]+)['\"]\s*,?\s*\)",
    re.MULTILINE,
)
_RE_FABRIC = re.compile(
    r"\bcodegenNativeComponent\s*(?:<[^>]*>)?\s*\(\s*['\"]([^'\"]+)['\"]\s*,?\s*\)",
    re.MULTILINE | re.DOTALL,
)
_RE_NITRO_DEF = re.compile(
    r"extends\s+HybridObject\s*<",
    re.MULTILINE,
)

_RE_NITRO_USE = re.compile(
    r"NitroModules\.createHybridObject\s*(?:<[^>]+>)?\s*\(\s*['\"]([^'\"]+)['\"]\s*,?\s*\)",
    re.MULTILINE,
)


@dataclass
class SpecHit:
    abs_path: str
    rel_posix: str
    turbo_names: list[str]
    fabric_names: list[str]
    nitro_names: list[str]  # NitroModules hybrid objects (need migration)
    is_nitro_spec_def: bool  # True if file contains 'extends HybridObject' (should copy to specs/v1)


def _to_posix_relpath(root: str, path: str) -> str:
    rel = os.path.relpath(path, root).replace("\\", "/")
    return rel


def scan_spec_sources(plugin_root: str, src_rel: str = "src") -> list[SpecHit]:
    """Walk plugin_root/src for .ts/.tsx containing Turbo or Fabric registration."""
    root = os.path.abspath(plugin_root)
    src_root = os.path.join(root, src_rel.replace("/", os.sep))
    if not os.path.isdir(src_root):
        return []

    hits: list[SpecHit] = []
    for dirpath, dirnames, filenames in os.walk(src_root):
        dirnames[:] = [
            d
            for d in dirnames
            if not d.startswith(".") and not _should_skip_dir(d)
        ]
        for fn in filenames:
            if not (fn.endswith(".ts") or fn.endswith(".tsx")):
                continue
            abs_path = os.path.join(dirpath, fn)
            try:
                text = open(abs_path, "r", encoding="utf-8", errors="ignore").read()
            except OSError:
                continue
            turbo = _RE_TURBO.findall(text)
            fabric = _RE_FABRIC.findall(text)
            nitro_def = _RE_NITRO_DEF.search(text) is not None
            nitro_use_names = _RE_NITRO_USE.findall(text)
            if not turbo and not fabric and not nitro_def and not nitro_use_names:
                continue
            rel = _to_posix_relpath(root, abs_path)
            hits.append(
                SpecHit(
                    abs_path=abs_path,
                    rel_posix=rel,
                    turbo_names=list(dict.fromkeys(turbo)),
                    fabric_names=list(dict.fromkeys(fabric)),
                    nitro_names=list(dict.fromkeys(nitro_use_names)),
                    is_nitro_spec_def=nitro_def,
                )
            )
    return hits


def scan_spec_sources_global(plugin_root: str) -> tuple[list[SpecHit], str]:
    """
    全局扫描 spec 文件，不依赖固定目录名。
    返回 (hits, inferred_source_dir)：
    - hits: 所有找到的 SpecHit
    - inferred_source_dir: 推断的源码目录名（如 "src", "js", "lib"）
    """
    root = os.path.abspath(plugin_root)
    hits: list[SpecHit] = []
    source_dirs: dict[str, int] = {}

    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [
            d
            for d in dirnames
            if not d.startswith(".") and not _should_skip_dir(d)
        ]
        for fn in filenames:
            if not (fn.endswith(".ts") or fn.endswith(".tsx")):
                continue
            abs_path = os.path.join(dirpath, fn)
            try:
                text = open(abs_path, "r", encoding="utf-8", errors="ignore").read()
            except OSError:
                continue
            turbo = _RE_TURBO.findall(text)
            fabric = _RE_FABRIC.findall(text)
            nitro_def = _RE_NITRO_DEF.search(text) is not None
            nitro_use_names = _RE_NITRO_USE.findall(text)
            if not turbo and not fabric and not nitro_def and not nitro_use_names:
                continue
            rel = _to_posix_relpath(root, abs_path)
            hits.append(
                SpecHit(
                    abs_path=abs_path,
                    rel_posix=rel,
                    turbo_names=list(dict.fromkeys(turbo)),
                    fabric_names=list(dict.fromkeys(fabric)),
                    nitro_names=list(dict.fromkeys(nitro_use_names)),
                    is_nitro_spec_def=nitro_def,
                )
            )
            parts = rel.split("/")
            if parts and parts[0] and not _should_skip_dir(parts[0]):
                source_dirs[parts[0]] = source_dirs.get(parts[0], 0) + 1

    inferred_source = "src"
    if source_dirs:
        inferred_source = max(source_dirs.keys(), key=lambda k: source_dirs[k])
        print(f"  inferred source directory: {inferred_source} (from {source_dirs})")

    return hits, inferred_source
