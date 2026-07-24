#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
dfx_js.py — RN DFX JS/TS 层扫描工具

扫描 JS/TS 源码目录，检测 DFX 质量问题。覆盖：
  - 1:   FlatList/SectionList 缺性能配置（removeClippedSubviews, getItemLayout, windowSize）
  - 2:   列表 Item 缺 React.memo
  - 3:   console.log / console.debug / console.info 仍在使用（自动移除）

用法:
    python dfx_js.py --target <js_dir>
    python dfx_js.py --target <js_dir> --dry-run
"""

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Set, Tuple

from dfx_utils import (
    atomic_write,
    read_file,
    remove_console_calls,
    should_skip,
    strip_comments_strings,
    validate_brackets,
)


def _extract_list_components(content: str) -> List[dict]:
    stripped = strip_comments_strings(content)
    results = []
    for m in re.finditer(r'<(FlatList|SectionList)\b', stripped):
        tag_name = m.group(1)
        tag_start = m.start()
        line_num = stripped[:tag_start].count('\n') + 1
        pos = m.end()
        depth = 0
        while pos < len(stripped):
            ch = stripped[pos]
            if ch == '{':
                depth += 1
            elif ch == '}':
                if depth > 0:
                    depth -= 1
            elif depth == 0:
                if stripped[pos:pos+2] == '/>':
                    pos += 2
                    break
                if ch == '>':
                    pos += 1
                    break
            pos += 1
        tag_text = stripped[tag_start:pos]
        results.append({'name': tag_name, 'text': tag_text, 'line': line_num})
    return results


def detect_flatlist_config(content: str, filename: str) -> List[str]:
    issues = []
    lists = _extract_list_components(content)
    for comp in lists:
        missing = []
        if not re.search(r'removeClippedSubviews', comp['text']):
            missing.append('removeClippedSubviews')
        if not re.search(r'getItemLayout', comp['text']):
            missing.append('getItemLayout')
        if not re.search(r'windowSize', comp['text']):
            missing.append('windowSize')
        if missing:
            issues.append(
                f"WARNING: {comp['name']} [行 {comp['line']}] 缺性能配置: "
                f"{', '.join(missing)} — 添加可提升长列表滑动性能（参考 performance.md §1）"
            )
    return issues


RE_RENDER_ITEM_COMPONENT = re.compile(
    r'renderItem\s*=\s*\{(?:'
    r'(?:\([^)]*\)|\w+)\s*=>\s*\(?<\s*(\w+)'
    r'|'
    r'function\s*\([^)]*\)\s*\{[^}]*?<\s*(\w+)'
    r'|'
    r'(?:\([^)]*\)|\w+)\s*=>\s*\{[^}]*?return\s+<\s*(\w+)'
    r'|'
    r'this\.(\w+)'
    r'|'
    r'\s*(\w+)\s*\}'
    r')'
)
RE_MEMO_WRAP = re.compile(r'(?:React\.)?memo\b\s*\(\s*(\w+)')
RE_MEMO_ASSIGN = re.compile(r'(?:const|let|var)\s+(\w+)\s*=\s*(?:React\.)?memo\b')


def detect_missing_memo(content: str, filename: str) -> List[str]:
    issues = []
    stripped = strip_comments_strings(content)
    has_list = re.search(r'<(FlatList|SectionList)\b', stripped)
    if not has_list:
        return issues

    item_components: Set[str] = set()
    for m in RE_RENDER_ITEM_COMPONENT.finditer(stripped):
        name = m.group(1) or m.group(2) or m.group(3) or m.group(4) or m.group(5)
        if name:
            item_components.add(name)
    if not item_components:
        return issues

    memo_components: Set[str] = set()
    for m in RE_MEMO_WRAP.finditer(stripped):
        memo_components.add(m.group(1))
    for m in RE_MEMO_ASSIGN.finditer(stripped):
        memo_components.add(m.group(1))

    unmemoized = item_components - memo_components
    if unmemoized:
        issues.append(
            f"WARNING: renderItem 引用的组件 {', '.join(sorted(unmemoized))} "
            f"未使用 React.memo 包裹 — 使用 React.memo 避免不必要的重复渲染（参考 performance.md §2）"
        )
    return issues


def process_file(filepath: str, dry_run: bool = False) -> Tuple[int, List[dict]]:
    content, encoding = read_file(filepath)

    manual_warnings: List[dict] = []

    for msg in detect_flatlist_config(content, filepath):
        manual_warnings.append({"type": "flatlist", "detail": msg})
    for msg in detect_missing_memo(content, filepath):
        manual_warnings.append({"type": "memo", "detail": msg})

    new_content, console_fixes, console_skipped = remove_console_calls(content)
    for msg in console_skipped:
        manual_warnings.append({"type": "console_skipped", "detail": msg})

    auto_fixes = console_fixes

    if auto_fixes > 0 and not dry_run:
        if not validate_brackets(new_content):
            manual_warnings.append(
                {"type": "error", "detail": "自动修复后括号校验失败，跳过此文件 — 需手动检查"}
            )
            auto_fixes = 0
        else:
            if not atomic_write(filepath, new_content, encoding):
                manual_warnings.append(
                    {"type": "error", "detail": "写入文件失败，跳过此文件 — 需手动检查"}
                )
                auto_fixes = 0

    return auto_fixes, manual_warnings


def main():
    parser = argparse.ArgumentParser(description='RN DFX JS/TS 层自动检测与修复')
    parser.add_argument('--target', required=True, help='JS/TS 源码目录路径（如 ohos/src/）')
    parser.add_argument('--dry-run', action='store_true', help='仅检测不写入')
    parser.add_argument('--json', action='store_true', help='输出结构化 JSON')
    args = parser.parse_args()
    sys.stdout.reconfigure(encoding='utf-8')

    target = Path(args.target)
    if not target.exists():
        if args.json:
            print(json.dumps({"error": f"目标目录不存在: {target}"}))
        else:
            print(f"ERROR: 目标目录不存在: {target}")
        sys.exit(1)

    all_files = (
        list(target.rglob('*.js')) +
        list(target.rglob('*.jsx')) +
        list(target.rglob('*.tsx')) +
        list(target.rglob('*.ts'))
    )
    js_files = [f for f in all_files if not should_skip(f)]

    if not js_files:
        if args.json:
            print(json.dumps({
                "files_scanned": 0,
                "files_modified": 0,
                "console_removed": 0,
                "flatlist_warnings": [],
                "memo_warnings": [],
                "skipped_items": []
            }))
        else:
            print(f"INFO: 目标目录无 JS/TS 文件: {target}")
        sys.exit(0)

    total_fixed = 0
    files_modified = 0
    all_warnings: List[dict] = []

    for fpath in sorted(js_files):
        rel = str(fpath.relative_to(target) if fpath.is_relative_to(target) else fpath.name)
        try:
            fixes, warnings = process_file(str(fpath), args.dry_run)
            if fixes > 0:
                total_fixed += fixes
                files_modified += 1
                if not args.json:
                    print(f"FIXED: {rel} ({fixes} 处)")
            for w in warnings:
                w["file"] = rel
                all_warnings.append(w)
                if not args.json:
                    print(f"  {w['detail']}")
        except Exception as e:
            if args.json:
                all_warnings.append({"type": "error", "file": rel, "detail": str(e)})
            else:
                print(f"ERROR: {rel} — {e}")

    if args.json:
        flatlist_warnings = [w for w in all_warnings if w["type"] == "flatlist"]
        memo_warnings = [w for w in all_warnings if w["type"] == "memo"]
        skipped_items = [w for w in all_warnings if w["type"] == "console_skipped"]
        result = {
            "files_scanned": len(js_files),
            "files_modified": files_modified,
            "console_removed": total_fixed,
            "flatlist_warnings": flatlist_warnings,
            "memo_warnings": memo_warnings,
            "skipped_items": skipped_items
        }
        print(json.dumps(result, ensure_ascii=False))
    else:
        print(f"\n{'[DRY-RUN] ' if args.dry_run else ''}总计: {files_modified} 文件, {total_fixed} 处已修复")
        if all_warnings:
            total_warnings = len(all_warnings)
            print(f"\n需处理的告警项 ({total_warnings} 项):")
            for w in all_warnings:
                print(f"  {w['file']}: {w['detail']}")
            print("\n请处理以上告警项后重新运行本脚本验证。")
            sys.exit(2)
    sys.exit(0)


if __name__ == '__main__':
    main()
