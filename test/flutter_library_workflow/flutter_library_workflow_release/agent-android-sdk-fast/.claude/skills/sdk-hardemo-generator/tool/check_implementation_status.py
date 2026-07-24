#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Check implementation status of all generated test case pages.

A page is considered implemented only when BOTH hold:
  1. No placeholder marker (`// @status: TODO` or legacy `待实现`/`以下为占位内容`).
  2. The Actions region contains at least one real interactive control
     (Button/Toggle/Checkbox/Slider/TextInput/Select/Image/Swiper/List/Canvas
     /...).

Only test cases whose level passes the same --levels filter used by the
generator are checked, so L3 (or otherwise filtered) cases no longer trigger
false "File not found" failures.
"""

import os
import re
import sys
import argparse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from _common import (
    DEFAULT_GENERATE_LEVELS,
    case_id_to_file_name,
    parse_levels,
    should_generate,
    read_json,
)

# Stable placeholder marker planted by the generator. Single source of truth
# for the "not yet implemented" contract between generator and this checker.
TODO_MARKER = '@status: TODO'

# Legacy / human-readable placeholder patterns kept as a secondary signal.
LEGACY_PLACEHOLDER_PATTERNS = [
    r'待实现',
    r'以下为占位内容',
    r'请根据测试用例类型填充内容',
]

# Interactive / preview controls that indicate a real implementation.
CONTROL_KEYWORDS = [
    'Button', 'Toggle', 'Checkbox', 'RadioButton', 'Slider', 'TextInput',
    'TextArea', 'Select', 'Image', 'Swiper', 'List', 'Grid', 'Canvas',
    'DatePicker', 'TimePicker', 'TextInput', 'Search', 'Rating',
    'Stepper', 'Badge', 'Marquee', 'DataPanel', 'Gauge',
]

# Match `Button(` etc. as a component call (word boundary + optional space/brace).
_CONTROL_RE = re.compile(
    r'\b(' + '|'.join(CONTROL_KEYWORDS) + r')\s*[\(\{]'
)
# Strip `// ...` line comments so controls mentioned only in comments do not
# count as real implementations.
_LINE_COMMENT_RE = re.compile(r'//[^\n]*')


def check_file_implemented(filepath: str) -> tuple:
    """Check if a single file is implemented.

    Returns: (is_implemented, reason)
    """
    try:
        content = open(filepath, 'r', encoding='utf-8-sig').read()
    except FileNotFoundError:
        return False, 'File not found'

    # 1) Placeholder detection (negative)
    if TODO_MARKER in content:
        return False, 'Contains @status: TODO marker'
    for pattern in LEGACY_PLACEHOLDER_PATTERNS:
        if re.search(pattern, content):
            return False, 'Contains placeholder text'

    # 2) Positive control detection in the Actions region.
    #    The Actions region lives between `TestInfoPanel(` and `ResultPanel(`.
    #    If either boundary is missing, scan the whole file (minus comments).
    actions_region = _extract_actions_region(content)
    stripped = _LINE_COMMENT_RE.sub('', actions_region)
    if not _CONTROL_RE.search(stripped):
        return False, 'No interactive control found in Actions region'

    return True, 'Implemented'


def _extract_actions_region(content: str) -> str:
    """Best-effort extraction of the Actions region of a TestCase page."""
    start_idx = content.find('TestInfoPanel(')
    if start_idx == -1:
        return content
    end_idx = content.find('ResultPanel(', start_idx)
    if end_idx == -1:
        return content[start_idx:]
    return content[start_idx:end_idx]


def main():
    parser = argparse.ArgumentParser(description='Check test case implementation status')
    parser.add_argument('--test-cases', required=True, help='Test cases JSON file path')
    parser.add_argument('--pages-dir', required=True, help='Pages directory path')
    parser.add_argument(
        '--levels',
        default=','.join(DEFAULT_GENERATE_LEVELS),
        help=f'Comma-separated case levels to check (default: {",".join(DEFAULT_GENERATE_LEVELS)}). '
             f'Must match the value passed to the generator.',
    )
    args = parser.parse_args()

    levels = parse_levels(args.levels)

    # Load test cases JSON (BOM-tolerant)
    try:
        test_cases_json = read_json(Path(args.test_cases))
    except Exception as e:
        print(f'ERROR: Cannot load test cases file: {e}')
        sys.exit(1)

    modules = test_cases_json.get('modules', [])

    implemented = []
    unimplemented = []
    skipped = []

    # Iterate all test cases, applying the same level filter as the generator.
    for module in modules:
        module_code = module.get('moduleCode', 'unknown')

        for tc in module.get('test_cases', []):
            tc_id = tc.get('id', 'unknown')
            level = str(tc.get('level', '') or '')

            if not should_generate(level, levels):
                skipped.append(f'{module_code}/{tc_id} [{level or "empty"}]')
                continue

            filename = case_id_to_file_name(tc_id)
            filepath = os.path.join(args.pages_dir, filename)

            is_impl, reason = check_file_implemented(filepath)

            if is_impl:
                implemented.append(f'{module_code}/{tc_id}')
            else:
                unimplemented.append({
                    'module': module_code,
                    'id': tc_id,
                    'file': filename,
                    'reason': reason,
                })

    # Output statistics
    total = len(implemented) + len(unimplemented)
    print('')
    print('=== Implementation Status Check ===')
    print(f'Levels filter: {", ".join(levels)}')
    if skipped:
        print(f'Skipped (filtered out): {len(skipped)}')
    pct = 100 * len(implemented) // total if total > 0 else 0
    print(f'Progress: {len(implemented)}/{total} ({pct}%)')

    # Module statistics
    module_stats = {}
    for item in implemented:
        mod = item.split('/')[0]
        module_stats.setdefault(mod, {'impl': 0, 'unimpl': 0})
        module_stats[mod]['impl'] += 1

    for item in unimplemented:
        mod = item['module']
        module_stats.setdefault(mod, {'impl': 0, 'unimpl': 0})
        module_stats[mod]['unimpl'] += 1

    print('')
    print('Module Progress:')
    for mod in sorted(module_stats.keys()):
        stats = module_stats[mod]
        total_mod = stats['impl'] + stats['unimpl']
        status = 'OK' if stats['unimpl'] == 0 else 'TODO'
        print(f'  {mod}: {stats["impl"]}/{total_mod} [{status}]')

    # Output result
    if unimplemented:
        print('')
        print(f'FAIL: {len(unimplemented)} test cases NOT implemented')
        print('')
        print('Unimplemented files:')
        for item in unimplemented[:15]:
            print(f'  - {item["file"]} ({item["reason"]})')
        if len(unimplemented) > 15:
            print(f'  ... and {len(unimplemented) - 15} more')
        print('')
        print('Please complete implementation before proceeding')
        sys.exit(1)

    print('')
    print(f'PASS: All {total} test cases implemented')
    sys.exit(0)


if __name__ == '__main__':
    main()
