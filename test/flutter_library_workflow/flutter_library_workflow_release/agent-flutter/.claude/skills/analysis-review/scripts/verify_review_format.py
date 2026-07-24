#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
评审报告格式验证脚本

用法：
    python verify_review_format.py <review_report_file_path>

功能：
    验证评审报告（analysis-review 或 case-review）的格式是否符合模板要求
"""

import sys
import re


def verify_review_structure(md_content: str, review_type: str = "analysis") -> tuple[bool, list[str]]:
    """
    验证评审报告结构

    Args:
        md_content: 报告内容
        review_type: 评审类型 (analysis 或 case)

    Returns:
        (is_valid, issues): 验证结果和问题列表
    """
    issues = []

    if review_type == "analysis":
        # analysis-review 必需章节
        required_sections = [
            "一、评审概述",
            "二、三方比对校验结果",
            "三、评审结果汇总",
            "四、详细评审结果",
            "五、修订建议",
            "六、评审结论"
        ]
    else:
        # case-review 必需章节
        required_sections = [
            "一、三方比对校验结果",
            "二、评审结果汇总",
            "三、详细评审结果",
            "四、修订建议",
            "五、评审结论"
        ]

    for section in required_sections:
        if f"## {section}" not in md_content and f"# {section}" not in md_content:
            issues.append(f"缺少章节：{section}")

    return len(issues) == 0, issues


def verify_table_format(md_content: str, review_type: str = "analysis") -> tuple[bool, list[str]]:
    """
    验证评审报告表格格式

    Args:
        md_content: 报告内容
        review_type: 评审类型 (analysis 或 case)

    Returns:
        (is_valid, issues): 验证结果和问题列表
    """
    issues = []

    # 通用表格检查
    if review_type == "analysis":
        # analysis-review 特定表格
        required_tables = {
            "评审维度权重表": r'\|\s*评审维度\s*\|\s*权重\s*\|',
            "三方比对表": r'\|\s*来源\s*\|.*\|',
            "评审结果汇总表": r'\|\s*评审维度\s*\|\s*得分\s*\|\s*通过状态\s*\|',
            "详细评审表": r'\|\s*检查项\s*\|\s*状态\s*\|'
        }
    else:
        # case-review 特定表格
        required_tables = {
            "三方比对表": r'\|\s*来源\s*\|.*\|',
            "评审结果汇总表": r'\|\s*评审维度\s*\|\s*得分\s*\|\s*通过状态\s*\|',
            "详细评审表": r'\|\s*检查项\s*\|\s*状态\s*\|'
        }

    for table_name, pattern in required_tables.items():
        if not re.search(pattern, md_content):
            issues.append(f"缺少表格或表格格式不规范：{table_name}")

    return len(issues) == 0, issues


def verify_three_way_comparison(md_content: str) -> tuple[bool, list[str]]:
    """
    验证三方比对内容

    Args:
        md_content: 报告内容

    Returns:
        (is_valid, issues): 验证结果和问题列表
    """
    issues = []

    # 检查是否包含三方比对的关键内容
    required_items = [
        "模块数",
        "用例总数",
        "级别分布",
        "L0",
        "L1",
        "L2",
        "L3"
    ]

    for item in required_items:
        if item not in md_content:
            issues.append(f"三方比对缺少内容：{item}")

    # 检查是否有一致性结论
    if "✅ 一致" not in md_content and "❌ 不一致" not in md_content:
        issues.append("缺少三方比对一致性结论")

    return len(issues) == 0, issues


def verify_review_conclusion(md_content: str) -> tuple[bool, list[str]]:
    """
    验证评审结论

    Args:
        md_content: 报告内容

    Returns:
        (is_valid, issues): 验证结果和问题列表
    """
    issues = []

    # 检查评审结论选项
    conclusion_keywords = ["通过", "有条件通过", "不通过"]
    has_conclusion = any(keyword in md_content for keyword in conclusion_keywords)

    if not has_conclusion:
        issues.append("缺少评审结论")

    # 检查是否有评审总结
    if "评审总结" not in md_content and "总结" not in md_content:
        issues.append("缺少评审总结")

    return len(issues) == 0, issues


def verify_review_format(report_file_path: str, review_type: str = "analysis") -> dict:
    """
    验证评审报告格式

    Args:
        report_file_path: 报告文件路径
        review_type: 评审类型 (analysis 或 case)

    Returns:
        包含验证结果的字典
    """
    results = {
        'is_valid': True,
        'structure_check': {'passed': True, 'issues': []},
        'table_check': {'passed': True, 'issues': []},
        'comparison_check': {'passed': True, 'issues': []},
        'conclusion_check': {'passed': True, 'issues': []}
    }

    # 读取报告文件
    try:
        with open(report_file_path, 'r', encoding='utf-8') as f:
            md_content = f.read()
    except FileNotFoundError:
        results['is_valid'] = False
        results['structure_check']['issues'] = [f"文件不存在：{report_file_path}"]
        return results
    except Exception as e:
        results['is_valid'] = False
        results['structure_check']['issues'] = [f"读取文件失败：{e}"]
        return results

    # 结构检查
    structure_valid, structure_issues = verify_review_structure(md_content, review_type)
    results['structure_check']['passed'] = structure_valid
    results['structure_check']['issues'] = structure_issues

    # 表格格式检查
    table_valid, table_issues = verify_table_format(md_content, review_type)
    results['table_check']['passed'] = table_valid
    results['table_check']['issues'] = table_issues

    # 三方比对检查
    comparison_valid, comparison_issues = verify_three_way_comparison(md_content)
    results['comparison_check']['passed'] = comparison_valid
    results['comparison_check']['issues'] = comparison_issues

    # 评审结论检查
    conclusion_valid, conclusion_issues = verify_review_conclusion(md_content)
    results['conclusion_check']['passed'] = conclusion_valid
    results['conclusion_check']['issues'] = conclusion_issues

    results['is_valid'] = (
        structure_valid and
        table_valid and
        comparison_valid and
        conclusion_valid
    )

    return results


def main():
    if len(sys.argv) < 2:
        print("用法：python verify_review_format.py <review_report_file> [review_type]")
        print("      review_type: analysis (默认) 或 case")
        print("功能：验证评审报告格式是否符合模板要求")
        sys.exit(1)

    report_file = sys.argv[1]
    review_type = sys.argv[2] if len(sys.argv) > 2 else "analysis"

    if review_type not in ["analysis", "case"]:
        print("错误：review_type 必须是 'analysis' 或 'case'")
        sys.exit(1)

    results = verify_review_format(report_file, review_type)

    print("=" * 60)
    print(f"评审报告格式验证结果 ({review_type})")
    print("=" * 60)

    # 结构检查
    if results['structure_check']['passed']:
        print("✓ 报告结构验证通过：所有必需章节都存在")
    else:
        print("✗ 报告结构验证失败：以下问题")
        for issue in results['structure_check']['issues']:
            print(f"  - {issue}")

    # 表格格式检查
    if results['table_check']['passed']:
        print("✓ 表格格式验证通过：所有必需表格都存在且格式正确")
    else:
        print("✗ 表格格式验证失败：以下问题")
        for issue in results['table_check']['issues']:
            print(f"  - {issue}")

    # 三方比对检查
    if results['comparison_check']['passed']:
        print("✓ 三方比对验证通过：内容完整")
    else:
        print("✗ 三方比对验证失败：以下问题")
        for issue in results['comparison_check']['issues']:
            print(f"  - {issue}")

    # 评审结论检查
    if results['conclusion_check']['passed']:
        print("✓ 评审结论验证通过：结论明确")
    else:
        print("✗ 评审结论验证失败：以下问题")
        for issue in results['conclusion_check']['issues']:
            print(f"  - {issue}")

    print("=" * 60)

    if results['is_valid']:
        print("【验证结果】格式验证通过 ✓")
        sys.exit(0)
    else:
        print("【验证结果】格式验证失败 ✗")
        sys.exit(1)


if __name__ == '__main__':
    main()
