#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试分析报告章节完整性验证脚本

用法：
    python verify_chapters.py <report_file_path>

功能：
    验证测试分析报告是否包含所有必需的章节（1.1~4.4）
"""

import sys


def verify_chapters(report_content: str) -> tuple[bool, list[str]]:
    """
    验证报告章节完整性

    Args:
        report_content: 报告文件内容

    Returns:
        (is_valid, missing_chapters): 验证结果和缺失章节列表
    """
    required_chapters = [
        '1.1', '1.2', '1.3', '1.4', '1.5',
        '2.1', '2.2',
        '3.1', '3.1.1', '3.1.2', '3.2', '3.2.1', '3.2.2', '3.2.3', '3.3', '3.4', '3.5',
        '4.1', '4.2', '4.3', '4.4'
    ]

    missing_chapters = []
    for chapter in required_chapters:
        if f'### {chapter}' not in report_content:
            missing_chapters.append(chapter)

    return len(missing_chapters) == 0, missing_chapters


def main():
    if len(sys.argv) < 2:
        print("用法：python verify_chapters.py <report_file_path>")
        print("功能：验证测试分析报告是否包含所有必需的章节（1.1~4.4）")
        sys.exit(1)

    report_file = sys.argv[1]

    try:
        with open(report_file, 'r', encoding='utf-8') as f:
            report_content = f.read()
    except FileNotFoundError:
        print(f"错误：文件不存在：{report_file}")
        sys.exit(1)
    except Exception as e:
        print(f"错误：读取文件失败：{e}")
        sys.exit(1)

    is_valid, missing_chapters = verify_chapters(report_content)

    if is_valid:
        print("✓ 章节完整性验证通过：所有必需章节都存在")
        sys.exit(0)
    else:
        print("✗ 章节完整性验证失败：以下章节缺失")
        for chapter in missing_chapters:
            print(f"  - 缺少章节：{chapter}")
        sys.exit(1)


if __name__ == '__main__':
    main()
