#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
# Validate FIXED SECTION (TestInfoPanel) is not tampered in generated .ets files.
# Checks:
#   1. TestInfoPanel import exists
#   2. TestInfoPanel component call exists with all 5 required parameters
#   3. level / preconditions / postconditions values exactly match test-cases.json
#   4. expected_result / test_steps keys are present (existence check)
#
# Case-id resolution is forward (case_id -> file name) via _common, avoiding the
# fragile reverse-engineering from file names.

import argparse
import io
import re
import sys
from pathlib import Path
from typing import Dict, Any, Tuple, List

sys.path.insert(0, str(Path(__file__).parent))
from _common import (
    DEFAULT_GENERATE_LEVELS,
    case_id_to_file_name,
    escape_ets_string,
    format_test_steps,
    parse_levels,
    read_json,
    should_generate,
)

if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')


def parse_args():
    parser = argparse.ArgumentParser(
        description='Validate FIXED SECTION (TestInfoPanel) in generated Demo .ets files.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  python validate_fixed_section.py --demo-dir ohos-hardemo-auto
  python validate_fixed_section.py --test-cases .ohos-adaptation/04-test-cases.json --demo-dir ohos-hardemo-auto
        '''
    )
    parser.add_argument('--test-cases', default='.ohos-adaptation/04-test-cases.json',
                        help='Path to test-cases JSON file')
    parser.add_argument('--demo-dir', default='ohos-hardemo-auto',
                        help='Path to generated Demo directory')
    parser.add_argument('--levels', default=','.join(DEFAULT_GENERATE_LEVELS),
                        help=f'Comma-separated case levels to validate (default: {",".join(DEFAULT_GENERATE_LEVELS)}). '
                             f'Must match the value passed to the generator; filtered-out cases are skipped.')
    parser.add_argument('--verbose', action='store_true',
                        help='Show detailed check results')
    return parser.parse_args()


def load_test_cases(path: Path) -> Dict[str, Dict[str, str]]:
    """Load test cases and return a dict keyed by case_id.

    Uses _common.format_test_steps so the expected formatting matches the
    generator exactly (newline-separated, with checkpoints).
    """
    data = read_json(path)
    cases: Dict[str, Dict[str, str]] = {}

    for module in data.get('modules', []):
        for tc in module.get('test_cases', module.get('testCases', [])):
            case_id = tc.get('id', '')
            if not case_id:
                continue

            level = str(tc.get('level', '') or '')
            preconditions = tc.get('preconditions', '')
            preconditions = str(preconditions) if preconditions else ''
            expected_result = (tc.get('expected_result')
                               or tc.get('expected_results')
                               or tc.get('expected', ''))
            expected_result = str(expected_result) if expected_result else ''
            postconditions = tc.get('postconditions', '')
            postconditions = str(postconditions) if postconditions else ''

            cases[case_id] = {
                'level': level,
                'preconditions': preconditions,
                'test_steps': format_test_steps(tc),
                'expected_result': expected_result,
                'postconditions': postconditions,
            }

    return cases


def _extract_panel_params(content: str) -> str:
    """Extract the TestInfoPanel(...) parameter body robustly.

    The FIXED TestInfoPanel block uses flat string params (no nested objects),
    so we match from `TestInfoPanel(` to the first balanced closing `)`.
    """
    start = content.find('TestInfoPanel(')
    if start == -1:
        return ''
    start += len('TestInfoPanel(')
    depth = 1
    i = start
    while i < len(content) and depth > 0:
        ch = content[i]
        if ch == '(':
            depth += 1
        elif ch == ')':
            depth -= 1
            if depth == 0:
                break
        i += 1
    return content[start:i]


def validate_test_info_panel(content: str, expected: Dict[str, str]) -> Tuple[bool, List[str]]:
    """Validate TestInfoPanel component in .ets file content."""
    errors: List[str] = []

    # Check 1: Import statement
    if "import { TestInfoPanel } from '../widgets/TestInfoPanel'" not in content:
        errors.append('Missing TestInfoPanel import statement')

    # Check 2: Component call exists
    if 'TestInfoPanel(' not in content:
        errors.append('Missing TestInfoPanel component call')
        return False, errors

    panel_body = _extract_panel_params(content)

    # Check 3: exact-match params (level, preconditions, postconditions).
    # Case-sensitive — no lower() fallback (ETS strings are case-sensitive).
    exact_params = {
        'level': escape_ets_string(expected['level']),
        'preconditions': escape_ets_string(expected['preconditions']),
        'postconditions': escape_ets_string(expected['postconditions']),
    }
    for param_name, expected_value in exact_params.items():
        needle = f"{param_name}: '{expected_value}'"
        if needle not in panel_body:
            # Distinguish "missing param" from "value mismatch"
            if re.search(rf'\b{re.escape(param_name)}\s*:', panel_body):
                snippet = expected_value[:50] + ('...' if len(expected_value) > 50 else '')
                errors.append(f"Parameter {param_name} value mismatch: expected '{snippet}'")
            else:
                errors.append(f'Missing parameter: {param_name}')

    # Check 4: existence-only params (expected_result, test_steps).
    for param_name in ('expected_result', 'test_steps'):
        if not re.search(rf'\b{re.escape(param_name)}\s*:', panel_body):
            errors.append(f'Missing parameter: {param_name}')

    return len(errors) == 0, errors


def main():
    args = parse_args()

    test_cases_path = Path(args.test_cases)
    demo_dir = Path(args.demo_dir)

    if not test_cases_path.exists():
        print(f'ERROR: Test cases file not found: {test_cases_path}')
        sys.exit(1)

    if not demo_dir.exists():
        print(f'ERROR: Demo directory not found: {demo_dir}')
        sys.exit(1)

    # Load expected values from test cases (BOM-tolerant)
    expected_values = load_test_cases(test_cases_path)
    levels = parse_levels(args.levels)

    pages_dir = demo_dir / 'entry' / 'src' / 'main' / 'ets' / 'pages'
    if not pages_dir.exists():
        print(f'ERROR: Pages directory not found: {pages_dir}')
        sys.exit(1)

    # Forward mapping: case_id -> expected file name -> check existence.
    # Cases whose level is filtered out (e.g. L3) are skipped so they don't
    # trigger false "missing" reports — consistent with the generator/checker.
    total = 0
    passed = 0
    failed_files = []
    missing_files = []
    skipped = 0

    for case_id, expected in expected_values.items():
        if not should_generate(expected.get('level', ''), levels):
            skipped += 1
            continue

        file_name = case_id_to_file_name(case_id)
        ets_file = pages_dir / file_name

        if not ets_file.exists():
            missing_files.append((file_name, case_id))
            continue

        total += 1
        content = ets_file.read_text(encoding='utf-8')
        is_valid, errors = validate_test_info_panel(content, expected)

        if is_valid:
            passed += 1
            if args.verbose:
                print(f'PASS: {file_name} ({case_id})')
        else:
            failed_files.append((file_name, case_id, errors))
            print(f'FAIL: {file_name} ({case_id})')
            for err in errors:
                print(f'  - {err}')

    if missing_files:
        print()
        print('Missing page files (generated but deleted, or never generated):')
        for fname, cid in missing_files:
            print(f'  - {fname} ({cid})')

    print()
    print('=== Validation Summary ===')
    print(f'Levels filter: {", ".join(levels)}')
    if skipped:
        print(f'Skipped (filtered out): {skipped}')
    print(f'Total files checked: {total}')
    print(f'Passed: {passed}')
    print(f'Failed: {len(failed_files)}')
    print(f'Missing: {len(missing_files)}')

    if failed_files:
        print()
        print('Failed files:')
        for fname, cid, errs in failed_files:
            print(f'  - {fname} ({cid}): {len(errs)} errors')
        sys.exit(1)

    if missing_files:
        print()
        print('WARN: some expected page files are missing (see above).')
        sys.exit(1)

    print('All FIXED SECTION validations passed.')
    sys.exit(0)


if __name__ == '__main__':
    main()
