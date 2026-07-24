#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix_performance.py - HarmonyOS Performance Static Detection Tool

Scans .ets files to detect performance-related issues:
- 1-1: aboutToAppear/onCreate/onWindowStageCreate contains sync I/O
- 2-1: ForEach in list container (should use LazyForEach)
- 4-1: Main thread sync I/O (aboutToAppear/onCreate/build/onClick/onPageShow)
- 4-2: Main thread CPU intensive computation

Usage:
    python fix_performance.py --target <ets_dir>
    python fix_performance.py --target <ets_dir> --dry-run
"""

import argparse
import re
import sys
from pathlib import Path
from typing import List, Tuple


RE_SYNC_IO = re.compile(
    r'\b((?:fs|fileIo)\.readFileSync|(?:fs|fileIo)\.statSync|(?:fs|fileIo)\.accessSync|'
    r'(?:fs|fileIo)\.openSync|(?:fs|fileIo)\.writeFileSync|(?:fs|fileIo)\.readTextSync|'
    r'(?:fs|fileIo)\.listFileSync|(?:fs|fileIo)\.moveFileSync|(?:fs|fileIo)\.renameSync|'
    r'(?:fs|fileIo)\.copyFileSync|'
    r'preferences\.[a-zA-Z]*Sync)\s*\('
)


def check_startup_sync_io(lines: List[str], filename: str) -> List[str]:
    """1-1: aboutToAppear/onCreate/onWindowStageCreate contains sync I/O"""
    issues = []
    in_startup_block = False
    startup_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue

        if re.search(r'\b(aboutToAppear|onCreate|onWindowStageCreate)\s*\(', stripped):
            in_startup_block = True
            startup_line = i
            continue

        if in_startup_block:
            if re.search(r'^\s*\}', stripped):
                in_startup_block = False
                continue
            if RE_SYNC_IO.search(stripped):
                issues.append(
                    f"1-1: {filename}:{i} - \u540c\u6b65 I/O \u5728\u542f\u52a8\u751f\u547d\u5468\u671f\u4e2d\u4f7f\u7528\u3002"
                    f" \u6539\u4e3a\u5f02\u6b65 API \u907f\u514d\u963b\u585e\u542f\u52a8\u3002"
                )

    return issues


def check_foreach_in_list(lines: List[str], filename: str) -> List[str]:
    """2-1: ForEach in List/Grid/WaterFlow container"""
    issues = []
    has_for_each = False
    has_list_container = False
    in_component = False
    brace_depth = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue

        if re.search(r'\b(List|Grid|WaterFlow)\b', stripped):
            has_list_container = True

        if re.search(r'\bForEach\s*\(', stripped):
            has_for_each = True

    if has_for_each and has_list_container:
        issues.append(
            f"2-1: {filename} - ForEach 在列表容器内使用，"
            f"若数据项 > 20 请改为 LazyForEach；小数据集（<=20）可保留"
        )

    return issues


MAIN_THREAD_METHODS = r'\b(aboutToAppear|onCreate|build|onClick|onPageShow|onPageHide|aboutToDisappear)\s*\('


def check_main_thread_sync_io(lines: List[str], filename: str) -> List[str]:
    """4-1: Main thread sync I/O (freeze/ANR prevention)"""
    issues = []
    in_main_thread_block = False
    brace_depth = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue

        if re.search(MAIN_THREAD_METHODS, stripped):
            in_main_thread_block = True
            brace_depth = stripped.count('{') - stripped.count('}')
            continue

        if in_main_thread_block:
            brace_depth += stripped.count('{') - stripped.count('}')
            if brace_depth <= 0 and re.search(r'\}', stripped):
                in_main_thread_block = False
                continue

            if RE_SYNC_IO.search(stripped):
                issues.append(
                    f"4-1: {filename}:{i} - \u4e3b\u7ebf\u7a0b\u4f7f\u7528\u540c\u6b65 I/O\uff08{RE_SYNC_IO.search(stripped).group(1)}\uff09\uff0c"
                    f"\u53ef\u80fd\u5bfc\u81f4\u5e94\u7528\u51bb\u5c4f/ANR\uff0c\u8bf7\u6539\u4e3a\u5f02\u6b65 API"
                )

    return issues


CPU_INTENSIVE_PATTERNS = re.compile(
    r'\.\s*sort\s*\(|JSON\.parse\s*\('
)


def check_main_thread_cpu(lines: List[str], filename: str) -> List[str]:
    """4-2: Main thread CPU intensive computation"""
    issues = []
    in_main_thread_block = False
    brace_depth = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue

        if re.search(MAIN_THREAD_METHODS, stripped):
            in_main_thread_block = True
            brace_depth = stripped.count('{') - stripped.count('}')
            continue

        if in_main_thread_block:
            brace_depth += stripped.count('{') - stripped.count('}')
            if brace_depth <= 0 and re.search(r'\}', stripped):
                in_main_thread_block = False
                continue

            if CPU_INTENSIVE_PATTERNS.search(stripped):
                issues.append(
                    f"4-2: {filename}:{i} - \u4e3b\u7ebf\u7a0b CPU \u5bc6\u96c6\u8ba1\u7b97\uff08{CPU_INTENSIVE_PATTERNS.search(stripped).group(0)}\uff09\uff0c"
                    f"\u8bf7\u79fb\u81f3 TaskPool/Worker \u6267\u884c"
                )

    return issues


def scan_file(filepath: Path) -> Tuple[int, List[str]]:
    """Scan a single .ets file for performance issues"""
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    filename = filepath.name
    issues = []
    issues.extend(check_startup_sync_io(lines, filename))
    issues.extend(check_foreach_in_list(lines, filename))
    issues.extend(check_main_thread_sync_io(lines, filename))
    issues.extend(check_main_thread_cpu(lines, filename))
    return len(issues), issues


def main():
    parser = argparse.ArgumentParser(description='HarmonyOS Performance Static Detection')
    parser.add_argument('--target', required=True, help='entry/src/main/ets directory path')
    parser.add_argument('--dry-run', action='store_true', help='detect only, no non-zero exit code')
    args = parser.parse_args()

    target = Path(args.target)
    if not target.exists():
        print(f"ERROR: target directory not found: {target}")
        sys.exit(1)

    ets_files = sorted(target.rglob('*.ets'))
    if not ets_files:
        print(f"INFO: no .ets files found in: {target}")
        sys.exit(0)

    total_issues = 0
    all_issues: List[str] = []

    for fpath in ets_files:
        count, issues = scan_file(fpath)
        total_issues += count
        all_issues.extend(issues)

    if total_issues > 0:
        print(f"\nDetected {total_issues} performance risk(s):\n")
        for issue in all_issues:
            print(f"  {issue}")
        print(f"\nFix and re-run.")
        if not args.dry_run:
            sys.exit(2)
    else:
        print("Performance check passed: no warnings.")

    sys.exit(0)


if __name__ == '__main__':
    main()
