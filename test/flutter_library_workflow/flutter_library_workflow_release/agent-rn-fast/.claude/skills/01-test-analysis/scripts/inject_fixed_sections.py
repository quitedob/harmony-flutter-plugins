#!/usr/bin/env python3
"""
inject_fixed_sections.py - Inject fixed sections from fixed-sections.md into the test analysis report.

Usage: python inject_fixed_sections.py <report_path>

The script reads the report file, finds placeholder comments, and replaces them
with the corresponding fixed content from fixed-sections.md.

Exit codes:
  0 - All 4 sections injected successfully
  1 - Error: placeholder missing or fixed-sections.md not found
"""

import sys
import os
import re

PLACEHOLDERS = [
    "section-2.2-strategy",
    "section-3.2",
    "section-3.3",
    "section-3.4",
]

def extract_sections(fixed_md_path):
    """Extract sections from fixed-sections.md between BEGIN/END markers."""
    with open(fixed_md_path, "r", encoding="utf-8") as f:
        content = f.read()

    sections = {}
    for placeholder in PLACEHOLDERS:
        pattern = rf"<!-- BEGIN {re.escape(placeholder)} -->(.*?)<!-- END {re.escape(placeholder)} -->"
        match = re.search(pattern, content, re.DOTALL)
        if match:
            sections[placeholder] = match.group(1).strip()
        else:
            print(f"ERROR: Section '{placeholder}' not found in fixed-sections.md")
            return None
    return sections

def inject(report_path, sections):
    """Replace placeholders in the report with fixed content."""
    with open(report_path, "r", encoding="utf-8") as f:
        report = f.read()

    injected_count = 0
    for placeholder, content in sections.items():
        placeholder_comment = f"<!-- INJECT: {placeholder} -->"
        if placeholder_comment in report:
            report = report.replace(placeholder_comment, content)
            injected_count += 1
            print(f"OK: Injected '{placeholder}'")
        else:
            print(f"ERROR: Placeholder '{placeholder_comment}' not found in report")
            return False

    with open(report_path, "w", encoding="utf-8") as f:
        f.write(report)

    print(f"\nAll {injected_count} sections injected successfully.")
    return True

def main():
    if len(sys.argv) < 2:
        print("Usage: python inject_fixed_sections.py <report_path>")
        sys.exit(1)

    report_path = sys.argv[1]

    if not os.path.exists(report_path):
        print(f"ERROR: Report file not found: {report_path}")
        sys.exit(1)

    # Find fixed-sections.md relative to this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    fixed_md_path = os.path.join(script_dir, "..", "assets", "fixed-sections.md")

    if not os.path.exists(fixed_md_path):
        print(f"ERROR: fixed-sections.md not found at: {fixed_md_path}")
        sys.exit(1)

    sections = extract_sections(fixed_md_path)
    if sections is None:
        sys.exit(1)

    if not inject(report_path, sections):
        sys.exit(1)

    sys.exit(0)

if __name__ == "__main__":
    main()
