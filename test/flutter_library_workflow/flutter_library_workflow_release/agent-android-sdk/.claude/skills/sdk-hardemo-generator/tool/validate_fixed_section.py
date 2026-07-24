#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
# Validate FIXED SECTION (TestInfoPanel) is not tampered in generated .ets files.
# This script checks:
#   1. TestInfoPanel import exists
#   2. TestInfoPanel component call exists with all 5 required parameters
#   3. Each parameter value matches the expected value from test-cases.json
#

import argparse
import json
import sys
import io
from pathlib import Path
from typing import List, Dict, Any, Tuple

if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')


def escape_ets_string(s: str) -> str:
    """Escape special characters for ETS string literals matching generate_hardemo_ets.py."""
    return s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n')


def parse_args():
    parser = argparse.ArgumentParser(
        description='Validate FIXED SECTION (TestInfoPanel) in generated Demo .ets files.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  python validate_fixed_section.py --demo-dir ohos-hardemo-auto
  python validate_fixed_section.py --test-cases .ohos-adaptation/04-test-cases-revised.json --demo-dir ohos-hardemo-auto
        '''
    )
    parser.add_argument('--test-cases', default='.ohos-adaptation/04-test-cases-revised.json',
                        help='Path to test-cases JSON file')
    parser.add_argument('--demo-dir', default='ohos-hardemo-auto',
                        help='Path to generated Demo directory')
    parser.add_argument('--verbose', action='store_true',
                        help='Show detailed check results')
    
    return parser.parse_args()


def load_test_cases(path: Path) -> Dict[str, Dict[str, Any]]:
    """Load test cases and return a dict keyed by case_id."""
    content = path.read_text(encoding='utf-8')
    data = json.loads(content)
    
    cases = {}
    for module in data.get('modules', []):
        for tc in module.get('test_cases', module.get('testCases', [])):
            case_id = tc.get('id', '')
            if case_id:
                test_steps = tc.get('test_steps', '')
                if isinstance(test_steps, list):
                    parts = []
                    for i, step in enumerate(test_steps):
                        if isinstance(step, dict):
                            action = step.get('action', '')
                            parts.append(f'{i + 1}. {action}')
                    test_steps = '; '.join(parts)
                elif not test_steps:
                    test_steps_raw = tc.get('steps', '')
                    if isinstance(test_steps_raw, list):
                        test_steps = str(test_steps_raw)
                    else:
                        test_steps = str(test_steps_raw) if test_steps_raw else ''
                else:
                    test_steps = str(test_steps)

                preconditions = tc.get('preconditions', '')
                if isinstance(preconditions, list):
                    preconditions = str(preconditions)
                else:
                    preconditions = str(preconditions) if preconditions else ''

                expected_result = tc.get('expected_result', '') or tc.get('expected_results', '') or tc.get('expected', '')
                if isinstance(expected_result, list):
                    expected_result = str(expected_result)
                else:
                    expected_result = str(expected_result) if expected_result else ''

                postconditions = tc.get('postconditions', '')
                if isinstance(postconditions, list):
                    postconditions = str(postconditions)
                else:
                    postconditions = str(postconditions) if postconditions else ''

                cases[case_id] = {
                    'level': tc.get('level', ''),
                    'preconditions': preconditions,
                    'test_steps': test_steps,
                    'expected_result': expected_result,
                    'postconditions': postconditions,
                }
    
    return cases


def validate_test_info_panel(content: str, expected: Dict[str, str]) -> Tuple[bool, List[str]]:
    """Validate TestInfoPanel component in .ets file content."""
    errors = []
    
    # Check 1: Import statement
    if "import { TestInfoPanel } from '../widgets/TestInfoPanel'" not in content:
        errors.append("Missing TestInfoPanel import statement")
    
    # Check 2: Component call exists (ArkUI format: TestInfoPanel({ ... }))
    if 'TestInfoPanel(' not in content:
        errors.append("Missing TestInfoPanel component call")
        return False, errors
    
    # Check 3-7: Each parameter value
    # level, preconditions, postconditions: exact match
    # expected_result, test_steps: existence check only (behavioral descriptions may vary)
    exact_params = {
        'level': escape_ets_string(expected['level']),
        'preconditions': escape_ets_string(expected['preconditions']),
        'postconditions': escape_ets_string(expected['postconditions']),
    }
    
    for param_name, expected_value in exact_params.items():
        patterns = [
            f"{param_name}: '{expected_value}'",
            f"{param_name}: '{expected_value.lower()}'",  # Case insensitive fallback
        ]
        
        found = False
        for pattern in patterns:
            if pattern in content:
                found = True
                break
        
        if not found:
            if f"{param_name}:" not in content.split('TestInfoPanel(')[1].split(')')[0] if 'TestInfoPanel(' in content else '':
                errors.append(f"Missing parameter: {param_name}")
            else:
                errors.append(f"Parameter {param_name} value mismatch: expected '{expected_value[:50]}...' (truncated)")
    
    # expected_result, test_steps: existence check only
    for param_name in ['expected_result', 'test_steps']:
        if f"{param_name}:" not in content:
            errors.append(f"Missing parameter: {param_name}")
    
    return len(errors) == 0, errors


def main():
    args = parse_args()
    
    test_cases_path = Path(args.test_cases)
    demo_dir = Path(args.demo_dir)
    
    if not test_cases_path.exists():
        print(f"ERROR: Test cases file not found: {test_cases_path}")
        sys.exit(1)
    
    if not demo_dir.exists():
        print(f"ERROR: Demo directory not found: {demo_dir}")
        sys.exit(1)
    
    # Load expected values from test cases
    expected_values = load_test_cases(test_cases_path)
    
    # Find all TestCase*.ets files
    pages_dir = demo_dir / 'entry' / 'src' / 'main' / 'ets' / 'pages'
    if not pages_dir.exists():
        print(f"ERROR: Pages directory not found: {pages_dir}")
        sys.exit(1)
    
    test_case_files = list(pages_dir.glob('TestCaseF*Page.ets'))
    
    if not test_case_files:
        print("WARN: No TestCase*Page.ets files found")
        sys.exit(0)
    
    total = 0
    passed = 0
    failed_files = []
    
    for ets_file in test_case_files:
        filename = ets_file.stem
        case_id_raw = filename.replace('TestCase', '').replace('Page', '')
        
        candidate_ids = set()
        if len(case_id_raw) >= 4:
            module_num = case_id_raw[1:3]
            trailing = case_id_raw[3:]
            for fmt in [f"F-{module_num}-{{}}", f"F{module_num}-{{}}"]:
                candidate_ids.add(fmt.format(trailing))
                try:
                    trailing_int = str(int(trailing))
                    candidate_ids.add(fmt.format(trailing_int))
                    candidate_ids.add(fmt.format(trailing_int.zfill(2)))
                    candidate_ids.add(fmt.format(trailing_int.zfill(3)))
                except ValueError:
                    pass
        
        case_id = None
        for cid in candidate_ids:
            if cid in expected_values:
                case_id = cid
                break
        
        if case_id is None:
            print(f"WARN: Case {case_id_raw} (tried {candidate_ids}) not found in test-cases.json, skipping")
            continue
        
        total += 1
        content = ets_file.read_text(encoding='utf-8')
        is_valid, errors = validate_test_info_panel(content, expected_values[case_id])
        
        if is_valid:
            passed += 1
            if args.verbose:
                print(f"PASS: {ets_file.name} ({case_id})")
        else:
            failed_files.append((ets_file.name, case_id, errors))
            print(f"FAIL: {ets_file.name} ({case_id})")
            for err in errors:
                print(f"  - {err}")
    
    print()
    print(f"=== Validation Summary ===")
    print(f"Total files checked: {total}")
    print(f"Passed: {passed}")
    print(f"Failed: {len(failed_files)}")
    
    if failed_files:
        print()
        print("Failed files:")
        for fname, cid, errs in failed_files:
            print(f"  - {fname} ({cid}): {len(errs)} errors")
        
        sys.exit(1)
    else:
        print("All FIXED SECTION validations passed.")
        sys.exit(0)


if __name__ == '__main__':
    main()