#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix_ets.py — RN DFX ETS 层扫描工具

扫描 ohos/harmony/<short_name>/src/main/ets/**/*.ets，检测 DFX 质量问题。覆盖：
  - 1:   console.log / console.debug / console.info 仍在使用（自动移除）

用法:
    python fix_ets.py --target <ets_dir>
    python fix_ets.py --target <ets_dir> --dry-run
"""

import argparse
import json
import sys
from pathlib import Path
from typing import Dict, List, Tuple

from dfx_utils import (
    atomic_write,
    read_file,
    remove_console_calls,
    should_skip,
    validate_brackets,
)


def process_file(filepath: str, dry_run: bool = False) -> Tuple[int, List[dict]]:
    content, encoding = read_file(filepath)

    manual_warnings: List[dict] = []

    new_content, console_fixes, console_skipped = remove_console_calls(content)
    for msg in console_skipped:
        manual_warnings.append({"type": "console_skipped", "detail": msg})

    auto_fixes = console_fixes

    if auto_fixes > 0 and not dry_run:
        if not validate_brackets(new_content):
            manual_warnings.append(
                {"type": "error", "detail": "[ERROR] 自动修复后括号校验失败，跳过此文件 — 需手动检查"}
            )
            auto_fixes = 0
        else:
            if not atomic_write(filepath, new_content, encoding):
                manual_warnings.append(
                    {"type": "error", "detail": "[ERROR] 写入文件失败，跳过此文件 — 需手动检查"}
                )
                auto_fixes = 0

    return auto_fixes, manual_warnings


def main():
    parser = argparse.ArgumentParser(description='RN DFX ETS 层自动检测与修复')
    parser.add_argument('--target', required=True, help='ohos/harmony/<short_name>/src/main/ets 目录路径')
    parser.add_argument('--dry-run', action='store_true', help='仅检测不写入')
    parser.add_argument('--json', action='store_true', help='输出结构化 JSON')
    args = parser.parse_args()

    target = Path(args.target)
    if not target.exists():
        if args.json:
            print(json.dumps({"error": f"目标目录不存在: {target}"}))
        else:
            print(f"ERROR: 目标目录不存在: {target}")
        sys.exit(1)

    ets_files = [f for f in target.rglob('*.ets') if not should_skip(f)]

    if not ets_files:
        if args.json:
            print(json.dumps({
                "files_scanned": 0,
                "files_modified": 0,
                "console_removed": 0,
                "skipped_items": []
            }))
        else:
            print(f"INFO: 目标目录无 .ets 文件: {target}")
        sys.exit(0)

    total_fixed = 0
    files_modified = 0
    all_warnings: List[dict] = []

    for fpath in sorted(ets_files):
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
        skipped_items = [w for w in all_warnings if w["type"] == "console_skipped"]
        result = {
            "files_scanned": len(ets_files),
            "files_modified": files_modified,
            "console_removed": total_fixed,
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