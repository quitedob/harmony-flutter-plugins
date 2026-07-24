#!/usr/bin/env python3
"""
Static checks for Fabric component .ets files (coding-import-002, fabric-component.md).

Exit 0 = pass, 1 = violations, 2 = usage error.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

TAG = "[check-fabric-ets]"

# UI/runtime symbols must not be imported from /ts (see lessons coding-import-002)
FORBIDDEN_TS_UI_SYMBOLS = frozenset(
    {
        "RNViewBase",
        "RNViewBaseAttributeModifier",
        "RNComponentContext",
        "ViewDescriptorWrapperBase",
        "DescriptorWrapper",
        "buildRNComponentForTag",
    }
)

IMPORT_TS_RE = re.compile(
    r"""import\s*\{([^}]+)\}\s*from\s*['"]@rnoh/react-native-openharmony/ts['"]""",
    re.MULTILINE,
)
STRUCT_RE = re.compile(r"@Component\s+export\s+struct\s+(\w+)")
CTX_RN_COMPONENT_RE = re.compile(r"public\s+ctx!\s*:\s*RNComponentContext\b")
CTX_RNOH_RE = re.compile(r"public\s+ctx!\s*:\s*RNOHContext\b")
LAZY_FOREACH_RE = re.compile(r"\bLazyForEach\s*\(")
INSTANCEOF_RNC_RE = re.compile(r"instanceof\s+RNComponentContext")


def _scan_file(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8", errors="replace")
    rel = path.as_posix()
    issues: list[str] = []

    for m in IMPORT_TS_RE.finditer(text):
        names = {n.strip().split(" as ")[0].strip() for n in m.group(1).split(",")}
        bad = names & FORBIDDEN_TS_UI_SYMBOLS
        if bad:
            issues.append(
                f"{rel}: UI 符号 {sorted(bad)} 禁止从 '@rnoh/react-native-openharmony/ts' 导入；"
                "请改用 '@rnoh/react-native-openharmony'（见 failure-lessons coding-import-002）"
            )

    if STRUCT_RE.search(text):
        if CTX_RN_COMPONENT_RE.search(text) and not CTX_RNOH_RE.search(text):
            issues.append(
                f"{rel}: Fabric 组件 ctx 须声明为 RNOHContext，勿单独使用 RNComponentContext"
            )
        elif not CTX_RNOH_RE.search(text):
            issues.append(f"{rel}: Fabric 组件缺少 public ctx!: RNOHContext")

        if LAZY_FOREACH_RE.search(text) and not INSTANCEOF_RNC_RE.search(text):
            issues.append(
                f"{rel}: 使用 LazyForEach 渲染子节点时须 instanceof RNComponentContext 并 cast "
                "(对齐 RNView.ets，见 fabric-component.md「容器组件」)"
            )

    return issues


def collect_ets_files(plugin_root: Path) -> list[Path]:
    harmony = plugin_root / "ohos" / "harmony"
    if not harmony.is_dir():
        return []
    files: list[Path] = []
    for mod_dir in harmony.iterdir():
        if not mod_dir.is_dir() or mod_dir.name == "entry":
            continue
        comp_dir = mod_dir / "src" / "main" / "ets" / "components"
        if comp_dir.is_dir():
            files.extend(sorted(comp_dir.glob("*.ets")))
    return files


def main() -> int:
    parser = argparse.ArgumentParser(description="Fabric .ets static checks")
    parser.add_argument(
        "plugin_root",
        nargs="?",
        default=".",
        help="RN plugin repo root (default: cwd)",
    )
    args = parser.parse_args()
    root = Path(args.plugin_root).resolve()
    if not root.is_dir():
        print(f"{TAG} ERROR: not a directory: {root}", file=sys.stderr)
        return 2

    ets_files = collect_ets_files(root)
    if not ets_files:
        print(f"{TAG} skip: no harmony/*/src/main/ets/components/*.ets under {root}")
        return 0

    all_issues: list[str] = []
    for f in ets_files:
        all_issues.extend(_scan_file(f))

    if all_issues:
        print(f"{TAG} FAIL ({len(all_issues)} issue(s)):", file=sys.stderr)
        for msg in all_issues:
            print(f"  - {msg}", file=sys.stderr)
        return 1

    print(f"{TAG} OK ({len(ets_files)} file(s))")
    return 0


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
    sys.exit(main())
