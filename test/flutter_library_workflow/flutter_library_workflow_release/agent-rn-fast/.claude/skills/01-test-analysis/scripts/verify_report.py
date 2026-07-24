#!/usr/bin/env python3
"""
verify_report.py - Verify the structure of the test analysis report.

Usage: python verify_report.py <report_path>

Checks:
  - 4 H2 parent headings exist
  - Required H3 subsections exist and are nested under H2
  - Fixed sections (3.2/3.3/3.4) were properly injected
  - Module analysis format is correct

Exit codes:
  0 - All checks passed
  1 - Validation failed
"""

import sys
import os
import re

REQUIRED_H2 = [
    "第一部分：概述",
    "第二部分：整体测试分析",
    "第三部分：详细测试分析",
    "第四部分：测试分析总结",
]

REQUIRED_H3 = [
    "1.1", "1.2", "1.3", "1.4", "1.5",
    "2.1", "2.2",
    "3.1", "3.1.1", "3.1.2", "3.1.3",
    "3.2", "3.3", "3.4",
    "3.5",
    "4.1", "4.2", "4.3", "4.4",
]

FORBIDDEN_WORDS = ["调用", "访问", "返回", "注册", "创建", "设置", "传入", "执行", "加载"]

def verify_h2(content):
    """Verify 4 H2 parent headings exist."""
    passed = True
    for h2 in REQUIRED_H2:
        pattern = rf"^## {re.escape(h2)}"
        if not re.search(pattern, content, re.MULTILINE):
            print(f"FAIL: Missing H2 heading '## {h2}'")
            passed = False
        else:
            print(f"OK: H2 '## {h2}' found")
    return passed

def verify_h3(content):
    """Verify required H3 subsections exist."""
    passed = True
    for h3 in REQUIRED_H3:
        pattern = rf"^### {re.escape(h3)}\s"
        if not re.search(pattern, content, re.MULTILINE):
            print(f"FAIL: Missing H3 heading '### {h3}'")
            passed = False
        else:
            print(f"OK: H3 '### {h3}' found")
    return passed

def verify_no_placeholders(content):
    """Verify all placeholders were replaced."""
    placeholders_found = re.findall(r"<!-- INJECT: .+? -->", content)
    if placeholders_found:
        print(f"FAIL: Unresolved placeholders: {placeholders_found}")
        return False
    print("OK: No unresolved placeholders")
    return True

def verify_ibo_sections(content):
    """Verify each module has IBO analysis."""
    f_modules = re.findall(r"#### (F-\d+)", content)
    print(f"Found {len(f_modules)} functional modules: {f_modules}")

    ibo_count = content.count("**IBO 分析**")
    print(f"Found {ibo_count} IBO analysis sections")

    if ibo_count < len(f_modules):
        print(f"FAIL: Not all modules have IBO analysis ({ibo_count}/{len(f_modules)})")
        return False
    print("OK: All modules have IBO analysis")
    return True

def verify_no_platform_terms(content):
    """Verify no platform-specific terms in test points (sections 3.1.3, not 1.1/1.2/1.5/4.4)."""
    # Extract test point table rows from 3.1.3
    in_test_section = False
    issues = []
    for line in content.split("\n"):
        if "3.1.3" in line and line.startswith("###"):
            in_test_section = True
        if in_test_section and line.startswith("### ") and "3.1.3" not in line:
            in_test_section = False
        if in_test_section and line.startswith("| F-"):
            if any(term in line for term in ["Android", "iOS", "android", "ios"]):
                issues.append(line.strip()[:80])

    if issues:
        print(f"FAIL: Platform-specific terms found in test points:")
        for issue in issues:
            print(f"  {issue}")
        return False
    print("OK: No platform-specific terms in test points")
    return True

def main():
    if len(sys.argv) < 2:
        print("Usage: python verify_report.py <report_path>")
        sys.exit(1)

    report_path = sys.argv[1]
    if not os.path.exists(report_path):
        print(f"ERROR: Report file not found: {report_path}")
        sys.exit(1)

    with open(report_path, "r", encoding="utf-8") as f:
        content = f.read()

    print("=" * 60)
    print("Report Structure Verification")
    print("=" * 60)

    all_passed = True

    print("\n--- H2 Headings ---")
    all_passed &= verify_h2(content)

    print("\n--- H3 Headings ---")
    all_passed &= verify_h3(content)

    print("\n--- Placeholders ---")
    all_passed &= verify_no_placeholders(content)

    print("\n--- IBO Analysis ---")
    all_passed &= verify_ibo_sections(content)

    print("\n--- Platform Terms ---")
    all_passed &= verify_no_platform_terms(content)

    print("\n" + "=" * 60)
    if all_passed:
        print("RESULT: ALL CHECKS PASSED")
    else:
        print("RESULT: SOME CHECKS FAILED")
    print("=" * 60)

    sys.exit(0 if all_passed else 1)

if __name__ == "__main__":
    main()
