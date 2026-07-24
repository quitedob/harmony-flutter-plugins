#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SDK 测试分析报告格式验证脚本

用法：
    python verify_report_format.py <report_file_path>

功能：
    验证测试分析报告的格式是否符合模板要求，包括：
    1. 章节完整性（1.1~4.4，含 3.2.1/3.2.2/3.2.3）
    2. 表格格式（表头验证）
    3. IBO 分析格式
    4. 固定内容验证（兼容性测试、DFX 测试、安全测试）
"""

import sys
import re


def verify_chapters(report_content: str) -> tuple[bool, list[str]]:
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


def verify_table_headers(report_content: str) -> tuple[bool, list[str]]:
    required_tables = {
        '1.1 SDK基本信息表': r'\|\s*项目\s*\|\s*内容\s*\|',
        '1.4 功能模块一览表': r'\|\s*模块编号\s*\|\s*功能名称\s*\|\s*描述\s*\|\s*优先级\s*\|',
        '2.2 测试策略表': r'\|\s*模块\s*\|\s*功能名称\s*\|\s*功能类型\s*\|\s*测试重点\s*\|\s*测试策略\s*\|',
        '3.1 测试点表': r'\|\s*测试点编号\s*\|\s*功能模块\s*\|\s*测试点\s*\|\s*验证点\s*\|\s*覆盖 API\s*\|\s*测试点级别\s*\|',
        '3.2.1 设备款型表': r'\|\s*设备款型\s*\|\s*验证重点\s*\|',
        '3.2.2 API版本表': r'\|\s*HarmonyOS 版本\s*\|\s*API Version\s*\|\s*验证重点\s*\|',
        '3.2.3 交叉组合矩阵': r'\|\s*设备款型\s*\|\s*API 23\s*\|\s*API 22\s*\|\s*API 21\s*\|\s*API 19\s*\|\s*其他 API\s*\|',
        '3.3 DFX测试表': r'\|\s*DFX 维度\s*\|\s*测试重点\s*\|\s*测试策略\s*\|',
        '3.4 安全测试表': r'\|\s*安全维度\s*\|\s*测试重点\s*\|\s*测试策略\s*\|'
    }

    missing_tables = []
    for table_name, pattern in required_tables.items():
        if not re.search(pattern, report_content):
            missing_tables.append(table_name)

    return len(missing_tables) == 0, missing_tables


def verify_ibo_format(report_content: str) -> tuple[bool, list[str]]:
    issues = []

    module_pattern = r'####\s+F-\d+\s+[^（(]+\s*[\(（][Pp]\d+[）\)]'
    modules = re.findall(r'####\s+F-\d+.*', report_content)

    for module in modules:
        if not re.match(module_pattern, module):
            issues.append(f"模块标题格式不规范：{module}")

    ibo_patterns = {
        'Input': r'-\s*\*\*Input（输入）\*\*',
        'Behavior': r'-\s*\*\*Behavior（行为）\*\*',
        'Output': r'-\s*\*\*Output（输出）\*\*'
    }

    for ibo_name, pattern in ibo_patterns.items():
        if not re.search(pattern, report_content):
            issues.append(f"缺少 IBO 分析维度：{ibo_name}")

    return len(issues) == 0, issues


def verify_fixed_content(report_content: str) -> tuple[bool, list[str]]:
    issues = []

    required_321_content = ['直板高端', '直板中低端', '双折叠', '阔折叠']
    for content in required_321_content:
        if content not in report_content:
            issues.append(f"3.2.1 设备款型覆盖缺少：{content}")

    required_322_content = [
        'API 19、21、22、23 当前市场占比超过 96%',
        'HarmonyOS NEXT',
        'API 23', 'API 22', 'API 21', 'API 19'
    ]
    for content in required_322_content:
        if content not in report_content:
            issues.append(f"3.2.2 HarmonyOS 版本覆盖缺少：{content}")

    if '✓=必测' not in report_content or '△=选测' not in report_content:
        issues.append("3.2.3 交叉组合矩阵缺少图例说明（✓=必测，△=选测）")

    required_dfx_content = ['稳定性测试', '性能测试', '功耗测试', 'UX 测试']
    for content in required_dfx_content:
        if content not in report_content:
            issues.append(f"3.3 DFX 测试缺少：{content}")

    required_safe_content = ['病毒扫描', '开源软件漏洞', '敏感信息']
    for content in required_safe_content:
        if content not in report_content:
            issues.append(f"3.4 安全测试缺少：{content}")

    return len(issues) == 0, issues


def verify_report_format(report_content: str) -> dict:
    results = {
        'is_valid': True,
        'chapter_check': {'passed': True, 'issues': []},
        'table_check': {'passed': True, 'issues': []},
        'ibo_check': {'passed': True, 'issues': []},
        'fixed_content_check': {'passed': True, 'issues': []}
    }

    chapters_valid, missing_chapters = verify_chapters(report_content)
    results['chapter_check']['passed'] = chapters_valid
    results['chapter_check']['issues'] = missing_chapters if not chapters_valid else []

    tables_valid, missing_tables = verify_table_headers(report_content)
    results['table_check']['passed'] = tables_valid
    results['table_check']['issues'] = missing_tables if not tables_valid else []

    ibo_valid, ibo_issues = verify_ibo_format(report_content)
    results['ibo_check']['passed'] = ibo_valid
    results['ibo_check']['issues'] = ibo_issues if not ibo_valid else []

    fixed_valid, fixed_issues = verify_fixed_content(report_content)
    results['fixed_content_check']['passed'] = fixed_valid
    results['fixed_content_check']['issues'] = fixed_issues if not fixed_valid else []

    results['is_valid'] = chapters_valid and tables_valid and ibo_valid and fixed_valid

    return results


def main():
    if len(sys.argv) < 2:
        print("用法：python verify_report_format.py <report_file_path>")
        print("功能：验证 SDK 测试分析报告格式是否符合模板要求")
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

    results = verify_report_format(report_content)

    print("=" * 60)
    print("SDK 测试分析报告格式验证结果")
    print("=" * 60)

    if results['chapter_check']['passed']:
        print("[OK] 章节完整性验证通过：所有必需章节都存在")
    else:
        print("[FAIL] 章节完整性验证失败：以下章节缺失")
        for chapter in results['chapter_check']['issues']:
            print(f"  - 缺少章节：{chapter}")

    if results['table_check']['passed']:
        print("[OK] 表格格式验证通过：所有必需表格都存在且格式正确")
    else:
        print("[FAIL] 表格格式验证失败：以下表格缺失或格式不正确")
        for table in results['table_check']['issues']:
            print(f"  - 表格问题：{table}")

    if results['ibo_check']['passed']:
        print("[OK] IBO 分析格式验证通过：格式规范")
    else:
        print("[FAIL] IBO 分析格式验证失败：以下问题")
        for issue in results['ibo_check']['issues']:
            print(f"  - 格式问题：{issue}")

    if results['fixed_content_check']['passed']:
        print("[OK] 固定内容验证通过：兼容性/DFX/安全测试内容正确")
    else:
        print("[FAIL] 固定内容验证失败：以下问题")
        for issue in results['fixed_content_check']['issues']:
            print(f"  - {issue}")

    print("=" * 60)

    if results['is_valid']:
        print("【验证结果】格式验证通过")
        sys.exit(0)
    else:
        print("【验证结果】格式验证失败")
        sys.exit(1)


if __name__ == '__main__':
    main()