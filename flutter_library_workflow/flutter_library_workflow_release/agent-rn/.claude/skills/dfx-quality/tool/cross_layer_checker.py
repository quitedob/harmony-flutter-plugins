#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
cross_layer_checker.py — RN DFX 跨层一致性检测

同时扫描 JS/TS 和 ETS 层，验证 Channel 名称和 EventType 名称
是否两端一致。覆盖：
  - 1:   Channel 名称在 JS 与 ETS 两端不一致
  - 2:   EventType 名称在 JS 与 ETS 两端不一致

用法:
    python cross_layer_checker.py --js-target <js_dir> --ets-target <ets_dir>
"""

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Set, Tuple

from dfx_utils import read_file, should_skip

RE_JS_CHANNEL = re.compile(
    r"""TurboModuleRegistry\.(?:get|getEnforcing)\s*\(\s*['""]([^'""]+)['""]"""
)

RE_JS_EVENT = re.compile(
    r"""DeviceEventEmitter\.(?:addListener|once)\s*\(\s*['""]([^'""]+)['""]"""
)

RE_ETS_GET_NAME = re.compile(
    r"""getName\s*\(\s*\)\s*(?::\s*\w+)?\s*\{[^}]*?return\s+['""]([^'""]+)['""]"""
)

RE_ETS_EMIT_EVENT = re.compile(
    r"""emitDeviceEvent\s*\(\s*['""]([^'""]+)['""]"""
)


def _is_in_comment(text: str, pos: int) -> bool:
    # Find the start of the line containing pos
    line_start = text.rfind('\n', 0, pos)
    line_start = 0 if line_start == -1 else line_start + 1
    before = text[line_start:pos]
    if '//' in before:
        idx = before.index('//')
        single_quotes = before[:idx].count("'")
        double_quotes = before[:idx].count('"')
        if (single_quotes + double_quotes) % 2 == 0:
            return True
    return False


def extract_js_names(filepath: str, base_dir: Path) -> Dict[str, Set[str]]:
    result: Dict[str, Set[str]] = {}
    try:
        content, _ = read_file(filepath)
    except Exception:
        return result
    names: Set[str] = set()
    for m in RE_JS_CHANNEL.finditer(content):
        names.add(f"[channel] {m.group(1)}")
    for m in RE_JS_EVENT.finditer(content):
        names.add(f"[event] {m.group(1)}")
    if names:
        rel = str(Path(filepath).relative_to(base_dir))
        result[rel] = names
    return result


def extract_ets_names(filepath: str, base_dir: Path) -> Dict[str, Set[str]]:
    result: Dict[str, Set[str]] = {}
    try:
        content, _ = read_file(filepath)
    except Exception:
        return result
    names: Set[str] = set()
    for m in RE_ETS_GET_NAME.finditer(content):
        names.add(f"[channel] {m.group(1)}")
    for m in RE_ETS_EMIT_EVENT.finditer(content):
        if not _is_in_comment(content, m.start()):
            names.add(f"[event] {m.group(1)}")
    if names:
        rel = str(Path(filepath).relative_to(base_dir))
        result[rel] = names
    return result


def check_consistency(
    js_map: Dict[str, Set[str]],
    ets_map: Dict[str, Set[str]],
) -> List[str]:
    issues = []

    all_js_names: Set[str] = set()
    for f, names in js_map.items():
        all_js_names.update(names)

    all_ets_names: Set[str] = set()
    for f, names in ets_map.items():
        all_ets_names.update(names)

    for name in sorted(all_js_names - all_ets_names):
        js_files = [f for f, n in js_map.items() if name in n]
        if name.startswith('[channel]'):
            channel_name = name.replace('[channel] ', '')
            issues.append(
                f"[1] WARNING: JS 端定义了 Channel '{channel_name}' "
                f"(在 {', '.join(js_files)}), "
                f"但 ETS 端未找到对应的 getName() 返回同名值 — 两端 Channel 名称不一致"
            )
        elif name.startswith('[event]'):
            event_name = name.replace('[event] ', '')
            issues.append(
                f"[2] WARNING: JS 端监听了事件 '{event_name}' "
                f"(在 {', '.join(js_files)}), "
                f"但 ETS 端未找到对应的 emitDeviceEvent — 两端 EventType 名称不一致"
            )

    for name in sorted(all_ets_names - all_js_names):
        ets_files = [f for f, n in ets_map.items() if name in n]
        if name.startswith('[channel]'):
            channel_name = name.replace('[channel] ', '')
            issues.append(
                f"[1] WARNING: ETS 端定义了 Channel '{channel_name}' "
                f"(在 {', '.join(ets_files)}), "
                f"但 JS 端未找到对应的 TurboModuleRegistry.get — 两端 Channel 名称不一致"
            )
        elif name.startswith('[event]'):
            event_name = name.replace('[event] ', '')
            issues.append(
                f"[2] WARNING: ETS 端发射了事件 '{event_name}' "
                f"(在 {', '.join(ets_files)}), "
                f"但 JS 端未找到对应的 addListener — 两端 EventType 名称不一致"
            )

    return issues


def main():
    parser = argparse.ArgumentParser(description='RN DFX 跨层一致性检测')
    parser.add_argument('--js-target', required=True, help='JS/TS 源码目录路径（如 ohos/src/）')
    parser.add_argument('--ets-target', required=True, help='ohos/harmony/<short_name>/src/main/ets 目录路径')
    parser.add_argument('--json', action='store_true', help='输出结构化 JSON')
    args = parser.parse_args()

    js_target = Path(args.js_target)
    ets_target = Path(args.ets_target)

    if not js_target.exists():
        if args.json:
            print(json.dumps({"error": f"JS 目标目录不存在: {js_target}"}))
        else:
            print(f"ERROR: JS 目标目录不存在: {js_target}")
        sys.exit(1)
    if not ets_target.exists():
        if args.json:
            print(json.dumps({"error": f"ETS 目标目录不存在: {ets_target}"}))
        else:
            print(f"ERROR: ETS 目标目录不存在: {ets_target}")
        sys.exit(1)

    js_files = [
        f for f in
        (list(js_target.rglob('*.js')) + list(js_target.rglob('*.jsx')) + list(js_target.rglob('*.ts')) + list(js_target.rglob('*.tsx')))
        if not should_skip(f)
    ]
    ets_files = [
        f for f in ets_target.rglob('*.ets')
        if not should_skip(f)
    ]

    if not js_files and not ets_files:
        if args.json:
            print(json.dumps({
                "channel_mismatches": 0,
                "event_mismatches": 0,
                "issues": []
            }))
        else:
            print("INFO: 两侧均无文件，无需检查")
        sys.exit(0)

    if not js_files:
        if args.json:
            print(json.dumps({
                "channel_mismatches": 0,
                "event_mismatches": 0,
                "issues": []
            }))
        else:
            print(f"INFO: JS 目录无 JS/TS 文件: {js_target}")
        sys.exit(0)

    if not ets_files:
        if args.json:
            print(json.dumps({
                "channel_mismatches": 0,
                "event_mismatches": 0,
                "issues": []
            }))
        else:
            print(f"INFO: ETS 目录无 .ets 文件: {ets_target}")
        sys.exit(0)

    js_map: Dict[str, Set[str]] = {}
    ets_map: Dict[str, Set[str]] = {}

    for fpath in sorted(js_files):
        try:
            js_map.update(extract_js_names(str(fpath), js_target))
        except Exception as e:
            if not args.json:
                print(f"ERROR: 读取 {fpath} 失败 — {e}")

    for fpath in sorted(ets_files):
        try:
            ets_map.update(extract_ets_names(str(fpath), ets_target))
        except Exception as e:
            if not args.json:
                print(f"ERROR: 读取 {fpath} 失败 — {e}")

    if not js_map and not ets_map:
        if args.json:
            print(json.dumps({
                "channel_mismatches": 0,
                "event_mismatches": 0,
                "issues": []
            }))
        else:
            print("INFO: 两侧均未检测到 Channel 或 EventType 定义，无需检查")
        sys.exit(0)

    all_warnings = check_consistency(js_map, ets_map)

    if args.json:
        channel_count = sum(1 for w in all_warnings if "[1]" in w)
        event_count = sum(1 for w in all_warnings if "[2]" in w)
        issues = []
        for w in all_warnings:
            if "[1]" in w:
                issues.append({"type": "channel", "detail": w})
            elif "[2]" in w:
                issues.append({"type": "event", "detail": w})
        result = {
            "channel_mismatches": channel_count,
            "event_mismatches": event_count,
            "issues": issues
        }
        print(json.dumps(result, ensure_ascii=False))
    else:
        if all_warnings:
            print("跨层一致性问题:")
            for w in all_warnings:
                print(f"  {w}")
            print("\n请修复后重新运行本脚本验证。")
            sys.exit(2)
        print("跨层一致性检查通过 — 所有 Channel 名称和 EventType 名称两端一致")
    sys.exit(0)


if __name__ == '__main__':
    main()