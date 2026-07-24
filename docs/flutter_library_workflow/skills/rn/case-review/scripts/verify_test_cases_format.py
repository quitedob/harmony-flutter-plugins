#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试用例格式验证脚本

用法：
    python verify_test_cases_format.py <test_cases_file_path>

功能：
    验证测试用例文档的格式是否符合模板要求，包括：
    1. 文档结构（文档信息表、级别分布表）
    2. 模块章节格式
    3. 测试用例表格格式
    4. JSON 与 Markdown 一致性
"""

import sys
import re
import json


def verify_document_structure(md_content: str) -> tuple[bool, list[str]]:
    """验证文档结构"""
    issues = []

    # 检查文档信息表
    if '## 文档信息' not in md_content and '| 项目 | 值 |' not in md_content:
        issues.append("缺少文档信息表")

    # 检查级别分布表
    if '## 测试用例级别分布' not in md_content and '| 级别 | 数量 | 占比 |' not in md_content:
        issues.append("缺少测试用例级别分布表")

    # 检查模块章节格式
    module_pattern = r'##\s+F-\d+\s*模块：'
    modules = re.findall(module_pattern, md_content)
    if len(modules) == 0:
        issues.append("缺少模块章节（格式：## F-01 模块：{模块名称}）")

    # 检查用例 ID 格式
    case_id_pattern = r'###\s+F-\d+-\d+'
    case_ids = re.findall(case_id_pattern, md_content)
    if len(case_ids) == 0:
        issues.append("缺少测试用例章节（格式：### F-01-01）")

    return len(issues) == 0, issues


def verify_test_case_table(md_content: str) -> tuple[bool, list[str]]:
    """验证测试用例表格格式"""
    issues = []

    # 检查必需的行
    required_rows = ['用例 ID', '测试点级别', '前置条件', '测试步骤', '预期结果', '后置条件', '覆盖 API']
    for row in required_rows:
        if f'**{row}**' not in md_content and f'| {row} |' not in md_content:
            issues.append(f"缺少必需的行：{row}")

    # 检查测试步骤格式
    step_pattern = r'\d+\.\s*.*\(API:'
    if not re.search(step_pattern, md_content):
        # 尝试另一种格式
        alt_step_pattern = r'{"action":\s*"[^"]+",\s*"checkpoint":\s*"[^"]+"}'
        if not re.search(alt_step_pattern, md_content):
            issues.append("测试步骤格式不规范（应包含 API 备注或 checkpoint）")

    return len(issues) == 0, issues


def verify_json_structure(json_content: str) -> tuple[bool, list[str]]:
    """验证 JSON 结构"""
    try:
        data = json.loads(json_content)
    except json.JSONDecodeError as e:
        return False, [f"JSON 格式错误：{e}"]

    issues = []

    # 检查必需字段
    if 'testCases' not in data:
        issues.append("缺少 testCases 字段")
        return False, issues

    test_cases = data['testCases']
    required_fields = ['id', 'moduleCode', 'moduleName', 'title', 'level',
                       'preconditions', 'testSteps', 'expectedResult',
                       'postconditions', 'coveredAPI']

    for i, case in enumerate(test_cases[:5]):  # 检查前 5 个用例
        for field in required_fields:
            if field not in case:
                issues.append(f"用例 {i+1} 缺少字段：{field}")

    # 检查测试步骤结构
    for i, case in enumerate(test_cases[:5]):
        if 'testSteps' in case:
            steps = case['testSteps']
            if not isinstance(steps, list) or len(steps) == 0:
                issues.append(f"用例 {i+1} 测试步骤格式不正确")
            else:
                for j, step in enumerate(steps):
                    if 'action' not in step or 'checkpoint' not in step:
                        issues.append(f"用例 {i+1} 步骤 {j+1} 缺少 action 或 checkpoint 字段")

    return len(issues) == 0, issues


def verify_consistency(md_content: str, json_content: str) -> tuple[bool, list[str]]:
    """验证 Markdown 与 JSON 一致性"""
    issues = []

    try:
        data = json.loads(json_content)
    except json.JSONDecodeError:
        return False, ["JSON 格式无效，无法比对"]

    # 提取 Markdown 中的用例 ID
    md_case_ids = set(re.findall(r'###\s+(F-\d+-\d+)', md_content))

    # 提取 JSON 中的用例 ID
    json_case_ids = set(case['id'] for case in data.get('testCases', []))

    # 比对
    missing_in_md = json_case_ids - md_case_ids
    missing_in_json = md_case_ids - json_case_ids

    if missing_in_md:
        issues.append(f"JSON 中存在但 Markdown 中缺失的用例 ID: {missing_in_md}")
    if missing_in_json:
        issues.append(f"Markdown 中存在但 JSON 中缺失的用例 ID: {missing_in_json}")

    # 比对总数
    if len(md_case_ids) != len(json_case_ids):
        issues.append(f"用例总数不一致：Markdown={len(md_case_ids)}, JSON={len(json_case_ids)}")

    return len(issues) == 0, issues


def verify_test_cases_format(md_file_path: str, json_file_path: str = None) -> dict:
    """
    验证测试用例格式

    Returns:
        包含验证结果的字典
    """
    results = {
        'is_valid': True,
        'structure_check': {'passed': True, 'issues': []},
        'table_check': {'passed': True, 'issues': []},
        'json_check': {'passed': True, 'issues': []},
        'consistency_check': {'passed': True, 'issues': []}
    }

    # 读取 Markdown 文件
    try:
        with open(md_file_path, 'r', encoding='utf-8') as f:
            md_content = f.read()
    except Exception as e:
        results['is_valid'] = False
        results['structure_check']['issues'] = [f"读取 Markdown 文件失败：{e}"]
        return results

    # 文档结构检查
    structure_valid, structure_issues = verify_document_structure(md_content)
    results['structure_check']['passed'] = structure_valid
    results['structure_check']['issues'] = structure_issues

    # 表格格式检查
    table_valid, table_issues = verify_test_case_table(md_content)
    results['table_check']['passed'] = table_valid
    results['table_check']['issues'] = table_issues

    # JSON 检查（如果提供了 JSON 文件）
    if json_file_path:
        try:
            with open(json_file_path, 'r', encoding='utf-8') as f:
                json_content = f.read()

            json_valid, json_issues = verify_json_structure(json_content)
            results['json_check']['passed'] = json_valid
            results['json_check']['issues'] = json_issues

            # 一致性检查
            consistency_valid, consistency_issues = verify_consistency(md_content, json_content)
            results['consistency_check']['passed'] = consistency_valid
            results['consistency_check']['issues'] = consistency_issues
        except FileNotFoundError:
            results['json_check']['issues'] = [f"JSON 文件不存在：{json_file_path}"]
        except Exception as e:
            results['json_check']['issues'] = [f"读取 JSON 文件失败：{e}"]

    results['is_valid'] = (
        structure_valid and
        table_valid and
        (not json_file_path or results['json_check']['passed']) and
        (not json_file_path or results['consistency_check']['passed'])
    )

    return results


def main():
    if len(sys.argv) < 2:
        print("用法：python verify_test_cases_format.py <test_cases_md_file> [test_cases_json_file]")
        print("功能：验证测试用例文档格式是否符合模板要求")
        sys.exit(1)

    md_file = sys.argv[1]
    json_file = sys.argv[2] if len(sys.argv) > 2 else None

    results = verify_test_cases_format(md_file, json_file)

    print("=" * 60)
    print("测试用例格式验证结果")
    print("=" * 60)

    # 文档结构
    if results['structure_check']['passed']:
        print("✓ 文档结构验证通过：文档信息表、级别分布表、模块章节完整")
    else:
        print("✗ 文档结构验证失败：以下问题")
        for issue in results['structure_check']['issues']:
            print(f"  - {issue}")

    # 表格格式
    if results['table_check']['passed']:
        print("✓ 表格格式验证通过：用例表格格式规范")
    else:
        print("✗ 表格格式验证失败：以下问题")
        for issue in results['table_check']['issues']:
            print(f"  - {issue}")

    # JSON 检查
    if json_file:
        if results['json_check']['passed']:
            print("✓ JSON 结构验证通过：字段完整、格式正确")
        else:
            print("✗ JSON 结构验证失败：以下问题")
            for issue in results['json_check']['issues']:
                print(f"  - {issue}")

        # 一致性检查
        if results['consistency_check']['passed']:
            print("✓ 一致性验证通过：Markdown 与 JSON 内容一致")
        else:
            print("✗ 一致性验证失败：以下问题")
            for issue in results['consistency_check']['issues']:
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
