"""Detect Fabric component layout: container (RN children) vs leaf."""

from __future__ import annotations

import dataclasses
import os
import re
from typing import Literal, Optional

LayoutKind = Literal["container", "leaf", "unknown"]
Confidence = Literal["high", "medium", "low"]

_SKIP_DIRS = frozenset({
    "node_modules", "oh_modules", ".git", "android", "ios", "harmony",
    "build", "dist", "example", "examples", "tests", "test", "__tests__",
    ".rn-build", "ohos", "coverage", "docs", "documentation",
    "windows", "macos", "linux", "pods", "out", "lib", ".rn-ohos-adaptation",
})

# android/ 下遍历：勿跳过 example（常见 Java 包名 com.example.*）
_ANDROID_SKIP_DIRS = frozenset({
    "build", ".gradle", "generated", "intermediates", "cxx", ".cxx", ".git",
})

_SOURCE_EXTS = (".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs")

_RE_MANAGER_BASE = re.compile(
    r"\bclass\s+(\w+)\s+extends\s+(ViewGroupManager|SimpleViewManager)\b",
)

# 常见叶子原生组件名后缀（无 Android 时的弱信号）
_LEAF_NAME_SUFFIXES = (
    "Image",
    "ImageView",
    "Map",
    "MapView",
    "Video",
    "Camera",
    "Svg",
    "Switch",
    "Slider",
    "ProgressBar",
    "ActivityIndicator",
)


@dataclasses.dataclass(frozen=True)
class FabricLayoutResult:
    name: str
    layout: LayoutKind
    confidence: Confidence
    signals: tuple[str, ...]

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "layout": self.layout,
            "confidence": self.confidence,
            "signals": list(self.signals),
        }


def detect_fabric_layout(plugin_root: str, component_name: str) -> FabricLayoutResult:
    """Detect container vs leaf for one Fabric component name."""
    signals: list[str] = []
    layout: LayoutKind = "unknown"
    confidence: Confidence = "low"

    android = _detect_from_android(plugin_root, component_name)
    if android is not None:
        layout, conf, sig = android
        signals.append(sig)
        confidence = conf

    js = _detect_from_js_usage(plugin_root, component_name)
    if js is not None:
        js_layout, js_conf, js_sig = js
        signals.append(js_sig)
        if layout == "unknown":
            layout, confidence = js_layout, js_conf

    if layout == "unknown":
        name_leaf = _detect_from_component_name(component_name)
        if name_leaf:
            layout = "leaf"
            confidence = "medium"
            signals.append(f"name_heuristic:{component_name}")

    return FabricLayoutResult(
        name=component_name,
        layout=layout,
        confidence=confidence,
        signals=tuple(signals),
    )


def detect_fabric_layouts(
    plugin_root: str, component_names: list[str]
) -> list[FabricLayoutResult]:
    """Detect layout for each unique component name (stable order)."""
    seen: set[str] = set()
    results: list[FabricLayoutResult] = []
    for name in component_names:
        if not name or name in seen:
            continue
        seen.add(name)
        results.append(detect_fabric_layout(plugin_root, name))
    return results


def _manager_class_matches_component(class_name: str, component_name: str) -> bool:
    if class_name == f"{component_name}Manager":
        return True
    if class_name == f"{component_name}ViewManager":
        return True
    if component_name.endswith("View") and class_name == f"{component_name}Manager":
        return True
    if f"{component_name}Manager" in class_name or f"{component_name}ViewManager" in class_name:
        return True
    return False


def _detect_from_android(
    plugin_root: str, component_name: str
) -> Optional[tuple[LayoutKind, Confidence, str]]:
    android_root = os.path.join(plugin_root, "android")
    if not os.path.isdir(android_root):
        return None

    for dirpath, dirnames, filenames in os.walk(android_root):
        dirnames[:] = [
            d for d in dirnames
            if d not in _ANDROID_SKIP_DIRS and not d.startswith(".")
        ]
        for fn in filenames:
            if not (fn.endswith(".java") or fn.endswith(".kt")):
                continue
            path = os.path.join(dirpath, fn)
            try:
                content = _read_text(path)
            except OSError:
                continue
            if component_name not in content and f"{component_name}Manager" not in content:
                continue
            for m in _RE_MANAGER_BASE.finditer(content):
                class_name, base = m.group(1), m.group(2)
                if not _manager_class_matches_component(class_name, component_name):
                    continue
                rel = os.path.relpath(path, plugin_root).replace("\\", "/")
                if base == "ViewGroupManager":
                    return ("container", "high", f"android:ViewGroupManager:{rel}")
                if base == "SimpleViewManager":
                    return ("leaf", "high", f"android:SimpleViewManager:{rel}")
    return None


def _detect_from_js_usage(
    plugin_root: str, component_name: str
) -> Optional[tuple[LayoutKind, Confidence, str]]:
    pair_re = re.compile(
        rf"<{re.escape(component_name)}(?:\s[^>]*)?>([\s\S]*?)</{re.escape(component_name)}>",
        re.MULTILINE,
    )
    self_close_re = re.compile(
        rf"<{re.escape(component_name)}(?:\s[^/>][^>]*)?/>",
        re.MULTILINE,
    )
    children_prop_re = re.compile(
        rf"\bchildren\s*:\s*",
        re.MULTILINE,
    )

    found_pair = False
    found_self_close = False
    pair_file = ""

    for dirpath, dirnames, filenames in os.walk(plugin_root):
        dirnames[:] = [d for d in dirnames if d not in _SKIP_DIRS and not d.startswith(".")]
        for fn in filenames:
            ext = os.path.splitext(fn)[1].lower()
            if ext not in _SOURCE_EXTS:
                continue
            path = os.path.join(dirpath, fn)
            try:
                content = _read_text(path)
            except OSError:
                continue
            if component_name not in content:
                continue
            rel = os.path.relpath(path, plugin_root).replace("\\", "/")
            for m in pair_re.finditer(content):
                inner = (m.group(1) or "").strip()
                if inner:
                    found_pair = True
                    pair_file = rel
            if self_close_re.search(content):
                found_self_close = True
            if children_prop_re.search(content) and component_name in content:
                return ("container", "medium", f"js:children_prop:{rel}")

    if found_pair:
        return ("container", "medium", f"js:jsx_children:{pair_file}")
    if found_self_close and not found_pair:
        return ("leaf", "low", "js:jsx_self_closing_only")
    return None


def _detect_from_component_name(component_name: str) -> bool:
    for suffix in _LEAF_NAME_SUFFIXES:
        if component_name == suffix or component_name.endswith(suffix):
            return True
    return False


def _read_text(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        return f.read()
