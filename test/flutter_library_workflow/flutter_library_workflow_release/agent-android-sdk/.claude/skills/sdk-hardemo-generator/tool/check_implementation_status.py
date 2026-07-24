#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Check implementation status of all test cases (placeholder detection only)"""

import os
import re
import sys
import json
import argparse

def check_file_implemented(filepath: str) -> tuple:
    """Check if a single file is implemented (placeholder detection only)
    Returns: (is_implemented, reason)
    """
    try:
        content = open(filepath, 'r', encoding='utf-8').read()
    except FileNotFoundError:
        return False, "File not found"
    
    # Placeholder patterns (indicates NOT implemented)
    placeholder_patterns = [
        r'待实现',
        r'TODO\(actions\)',
        r'以下为占位内容',
        r'请根据测试用例类型填充内容',
    ]
    
    for pattern in placeholder_patterns:
        if re.search(pattern, content):
            return False, f"Contains placeholder"
    
    # If no placeholders found, consider it implemented
    return True, "Implemented"

def main():
    parser = argparse.ArgumentParser(description='Check test case implementation status')
    parser.add_argument('--test-cases', required=True, help='Test cases JSON file path')
    parser.add_argument('--pages-dir', required=True, help='Pages directory path')
    args = parser.parse_args()
    
    # Load test cases JSON
    try:
        test_cases_json = json.load(open(args.test_cases, 'r', encoding='utf-8'))
    except Exception as e:
        print(f"ERROR: Cannot load test cases file: {e}")
        sys.exit(1)
    
    modules = test_cases_json.get('modules', [])
    
    implemented = []
    unimplemented = []
    
    # Iterate all test cases
    for module in modules:
        module_code = module.get('moduleCode', 'unknown')
        
        for tc in module.get('test_cases', []):
            tc_id = tc.get('id', 'unknown')
            file_id = tc_id.replace('-', '')
            filename = f"TestCase{file_id}Page.ets"
            filepath = os.path.join(args.pages_dir, filename)
            
            is_impl, reason = check_file_implemented(filepath)
            
            if is_impl:
                implemented.append(f"{module_code}/{tc_id}")
            else:
                unimplemented.append({
                    'module': module_code,
                    'id': tc_id,
                    'file': filename,
                    'reason': reason
                })
    
    # Output statistics
    total = len(implemented) + len(unimplemented)
    print("")
    print("=== Implementation Status Check ===")
    pct = 100*len(implemented)//total if total>0 else 0
    print(f"Progress: {len(implemented)}/{total} ({pct}%)")
    
    # Module statistics
    module_stats = {}
    for item in implemented:
        mod = item.split('/')[0]
        module_stats[mod] = module_stats.get(mod, {'impl': 0, 'unimpl': 0})
        module_stats[mod]['impl'] += 1
    
    for item in unimplemented:
        mod = item['module']
        module_stats[mod] = module_stats.get(mod, {'impl': 0, 'unimpl': 0})
        module_stats[mod]['unimpl'] += 1
    
    print("")
    print("Module Progress:")
    for mod in sorted(module_stats.keys()):
        stats = module_stats[mod]
        total_mod = stats['impl'] + stats['unimpl']
        status = 'OK' if stats['unimpl'] == 0 else 'TODO'
        print(f"  {mod}: {stats['impl']}/{total_mod} [{status}]")
    
    # Output result
    if unimplemented:
        print("")
        print(f"FAIL: {len(unimplemented)} test cases NOT implemented")
        print("")
        print("Unimplemented files:")
        for item in unimplemented[:15]:
            print(f"  - {item['file']}")
        if len(unimplemented) > 15:
            print(f"  ... and {len(unimplemented)-15} more")
        print("")
        print("Please complete implementation before proceeding")
        sys.exit(1)
    
    print("")
    print(f"PASS: All {total} test cases implemented")
    sys.exit(0)

if __name__ == '__main__':
    main()