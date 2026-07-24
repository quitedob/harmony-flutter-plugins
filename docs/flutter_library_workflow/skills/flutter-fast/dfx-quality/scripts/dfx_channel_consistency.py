#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
dfx_channel_consistency.py — Flutter DFX 跨层一致性检测

同时扫描 Dart 和 ETS 层，验证 Channel 名称和 PlatformView viewType
是否两端一致。覆盖：
  - 1:   PlatformView viewType 在 Dart 与 ETS 两端不一致
  - 2:   Channel 名称在 Dart 与 ETS 两端不一致

用法:
    python dfx_channel_consistency.py --dart-target <lib_dir> --ets-target <ets_dir>
"""

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Set

from dfx_common import strip_comments_strings, should_skip


# ── Dart 层正则 ──────────────────────────────────────────────────────

# Channel 名称提取（支持 const 和变量）
RE_DART_CHANNEL = re.compile(
    r"""(?:MethodChannel|EventChannel|BasicMessageChannel)\s*\(\s*"""
    r"""(?:const\s+)?['""]([^'""]+)['""]"""
)

# OhosView / PlatformView viewType
RE_DART_OHOS_VIEW = re.compile(
    r"""OhosView\s*\([^)]*?viewType\s*:\s*['""]([^'""]+)['""]""",
    re.DOTALL,
)


# ── ETS 层 ───────────────────────────────────────────────────────

RE_ETS_CHANNEL_START = re.compile(
    r"""(?:new\s+)?(?:MethodChannel|EventChannel|BasicMessageChannel)\s*\("""
)

# registerViewFactory viewType
RE_ETS_VIEW_FACTORY = re.compile(
    r"""registerViewFactory\s*\(\s*['""]([^'""]+)['""]"""
)

RE_STRING_LITERAL = re.compile(r"""['""]([^'""]+)['""]""")


def _in_comment_or_string(stripped: str, start: int, end: int) -> bool:
    return not stripped[start:end].strip()


def _find_matching_paren(content: str, start: int) -> int:
    depth = 1
    i = start
    in_str = False
    str_char = ""
    while i < len(content) and depth > 0:
        ch = content[i]
        if in_str:
            if ch == "\\" and i + 1 < len(content):
                i += 2
                continue
            if ch == str_char:
                in_str = False
            i += 1
            continue
        if ch in ("'", '"'):
            in_str = True
            str_char = ch
            i += 1
            continue
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
            if depth == 0:
                return i
        i += 1
    return -1


def _extract_ets_channel_names(content: str, stripped: str) -> Set[str]:
    names: Set[str] = set()
    for m in RE_ETS_CHANNEL_START.finditer(content):
        if not stripped[m.start():m.end()].strip():
            continue
        paren_start = m.end()
        paren_end = _find_matching_paren(content, paren_start)
        if paren_end < 0:
            continue
        arg_text = content[paren_start:paren_end]
        str_matches = RE_STRING_LITERAL.findall(arg_text)
        if str_matches:
            names.add(str_matches[-1])
    return names


def extract_dart_channels(filepath: str) -> Set[str]:
    """从 Dart 文件提取 Channel 名称和 viewType，返回名称集合。"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    stripped = strip_comments_strings(content)

    names: Set[str] = set()
    for m in RE_DART_CHANNEL.finditer(content):
        if _in_comment_or_string(stripped, m.start(), m.end()):
            continue
        names.add(m.group(1))
    for m in RE_DART_OHOS_VIEW.finditer(content):
        if _in_comment_or_string(stripped, m.start(), m.end()):
            continue
        names.add(f"[viewType] {m.group(1)}")
    return names


def extract_ets_channels(filepath: str) -> Set[str]:
    """从 ETS 文件提取 Channel 名称和 viewType，返回名称集合。"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    stripped = strip_comments_strings(content)

    names: Set[str] = set()
    names.update(_extract_ets_channel_names(content, stripped))
    for m in RE_ETS_VIEW_FACTORY.finditer(content):
        if _in_comment_or_string(stripped, m.start(), m.end()):
            continue
        names.add(f"[viewType] {m.group(1)}")
    return names


def check_consistency(
    dart_map: Dict[str, Set[str]],
    ets_map: Dict[str, Set[str]],
) -> List[str]:
    """比较 Dart 和 ETS 的 Channel/viewType，返回不匹配告警"""
    issues = []

    all_dart_names: Set[str] = set()
    for f, names in dart_map.items():
        all_dart_names.update(names)

    all_ets_names: Set[str] = set()
    for f, names in ets_map.items():
        all_ets_names.update(names)

    # Dart 有但 ETS 没有
    for name in sorted(all_dart_names - all_ets_names):
        dart_files = [f for f, n in dart_map.items() if name in n]
        if name.startswith('[viewType]'):
            view_type = name.replace('[viewType] ', '')
            issues.append(
                f"WARNING: Dart 端定义了 viewType '{view_type}' "
                f"(在 {', '.join(dart_files)}), "
                f"但 ETS 端未找到对应的 registerViewFactory — 两端 viewType 不一致"
            )
        else:
            issues.append(
                f"WARNING: Dart 端使用了 Channel '{name}' "
                f"(在 {', '.join(dart_files)}), "
                f"但 ETS 端未找到同名 Channel — 两端 Channel 名称不一致"
            )

    # ETS 有但 Dart 没有（仅对 Channel 名，viewType 可能仅 ETS 侧定义时不需要告警）
    for name in sorted(all_ets_names - all_dart_names):
        if name.startswith('[viewType]'):
            continue
        ets_files = [f for f, n in ets_map.items() if name in n]
        issues.append(
                f"WARNING: ETS 端使用了 Channel '{name}' "
                f"(在 {', '.join(ets_files)}), "
                f"但 Dart 端未找到同名 Channel — 两端 Channel 名称不一致"
        )

    return issues


def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    parser = argparse.ArgumentParser(description='Flutter DFX 跨层一致性检测')
    parser.add_argument('--dart-target', required=True, help='lib 目录路径')
    parser.add_argument('--ets-target', required=True, help='ohos/<plugin>/src/main/ets 目录路径')
    parser.add_argument('--json', action='store_true', help='输出 JSON 格式结果')
    args = parser.parse_args()

    dart_target = Path(args.dart_target)
    ets_target = Path(args.ets_target)

    if not dart_target.exists():
        if args.json:
            print(json.dumps({"error": f"Dart 目标目录不存在: {dart_target}"}, ensure_ascii=False))
        else:
            print(f"ERROR: Dart 目标目录不存在: {dart_target}")
        sys.exit(1)
    if not ets_target.exists():
        if args.json:
            print(json.dumps({"error": f"ETS 目标目录不存在: {ets_target}"}, ensure_ascii=False))
        else:
            print(f"ERROR: ETS 目标目录不存在: {ets_target}")
        sys.exit(1)

    dart_files = [f for f in dart_target.rglob('*.dart') if not should_skip(f)]
    ets_files = [f for f in ets_target.rglob('*.ets') if not should_skip(f)]

    if not dart_files and not ets_files:
        if args.json:
            print(json.dumps({"dart_files": 0, "ets_files": 0, "issues": []}, ensure_ascii=False))
        else:
            print(f"INFO: Dart 目录无 .dart 文件: {dart_target}")
            print(f"INFO: ETS 目录无 .ets 文件: {ets_target}")
        sys.exit(0)

    # 提取所有名称
    dart_map: Dict[str, Set[str]] = {}
    ets_map: Dict[str, Set[str]] = {}

    for fpath in sorted(dart_files):
        try:
            names = extract_dart_channels(str(fpath))
            if names:
                rel = fpath.relative_to(dart_target) if fpath.is_relative_to(dart_target) else fpath.name
                dart_map[str(rel)] = names
        except Exception as e:
            if not args.json:
                print(f"ERROR: 读取 {fpath} 失败 — {e}")

    for fpath in sorted(ets_files):
        try:
            names = extract_ets_channels(str(fpath))
            if names:
                rel = fpath.relative_to(ets_target) if fpath.is_relative_to(ets_target) else fpath.name
                ets_map[str(rel)] = names
        except Exception as e:
            if not args.json:
                print(f"ERROR: 读取 {fpath} 失败 — {e}")

    if not dart_map and not ets_map:
        if args.json:
            print(json.dumps({"dart_files": len(dart_files), "ets_files": len(ets_files), "issues": []}, ensure_ascii=False))
        else:
            print("INFO: 两侧均未检测到 Channel 或 PlatformView 定义，无需检查")
        sys.exit(0)

    all_warnings = check_consistency(dart_map, ets_map)

    if args.json:
        result = {
            "dart_files": len(dart_files),
            "ets_files": len(ets_files),
            "issues": all_warnings,
        }
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        if all_warnings:
            print("跨层一致性问题:")
            for w in all_warnings:
                print(f"  {w}")
            print("\n请修复后重新运行本脚本验证。")
        else:
            print("跨层一致性检查通过 — 所有 Channel 名称和 viewType 两端一致")

    if all_warnings:
        sys.exit(2)
    sys.exit(0)


if __name__ == '__main__':
    main()
