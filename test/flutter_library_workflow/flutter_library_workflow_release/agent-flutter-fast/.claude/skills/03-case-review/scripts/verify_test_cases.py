#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试用例三方数据一致性验证脚本

适用范围：阶段 5 - 测试用例评审
验证内容：测试点汇总 JSON、测试用例 JSON、测试用例 Markdown 三方数据一致性
"""

import json
import re
from typing import Tuple, Dict


CASE_ID_PATTERN = r'F-\d+-\d+'
MARKDOWN_CASE_ROW_PATTERN = rf'^\|\s*({CASE_ID_PATTERN})\s*\|'


def _get_total_test_points(test_points: Dict) -> int:
    summary = test_points.get('summary', {})
    if 'totalPoints' in summary:
        return summary['totalPoints']
    if 'totalTestPoints' in summary:
        return summary['totalTestPoints']
    return sum(len(module.get('testPoints', [])) for module in test_points.get('modules', []))


def _get_level_distribution(test_points: Dict) -> Dict:
    summary = test_points.get('summary', {})
    if 'byLevel' in summary:
        return summary['byLevel']
    if 'levelDistribution' in summary:
        return summary['levelDistribution']

    levels = {'L0': 0, 'L1': 0, 'L2': 0}
    for module in test_points.get('modules', []):
        for point in module.get('testPoints', []):
            level = point.get('level')
            if level in levels:
                levels[level] += 1
    return levels


def verify_test_cases_three_way(test_points_path: str, test_cases_json_path: str, test_cases_md_path: str) -> Tuple[bool, Dict]:
    """
    测试用例三方数据一致性校验

    Args:
        test_points_path: 测试点汇总 JSON 路径
        test_cases_json_path: 测试用例 JSON 路径
        test_cases_md_path: 测试用例 Markdown 路径

    Returns:
        (是否通过，校验结果详情)
    """
    # 读取数据
    with open(test_points_path, 'r', encoding='utf-8') as f:
        test_points = json.load(f)

    with open(test_cases_json_path, 'r', encoding='utf-8') as f:
        test_cases_json = json.load(f)

    with open(test_cases_md_path, 'r', encoding='utf-8') as f:
        test_cases_md = f.read()

    results = {
        'module_count': {'test_points': 0, 'json': 0, 'md': 0, 'match': False},
        'total_cases': {'test_points': 0, 'json': 0, 'md': 0, 'match': False},
        'level_distribution': {'test_points': {}, 'json': {}, 'md': {}, 'match': False},
        'case_ids': {'test_points': [], 'json': [], 'md': [], 'match': False},
        'module_breakdown': {}
    }

    # 1. 模块数校验
    tp_modules = len(test_points['modules'])
    tc_json_modules = len(test_cases_json['modules'])
    tc_md_modules = len(re.findall(r'^###\s+(F-\d+)', test_cases_md, re.MULTILINE))

    results['module_count'] = {
        'test_points': tp_modules,
        'json': tc_json_modules,
        'md': tc_md_modules,
        'match': tp_modules == tc_json_modules == tc_md_modules
    }

    # 2. 用例总数校验
    tp_total = _get_total_test_points(test_points)
    tc_json_total = sum(len(m['test_cases']) for m in test_cases_json['modules'])
    tc_md_total = len(re.findall(MARKDOWN_CASE_ROW_PATTERN, test_cases_md, re.MULTILINE))

    results['total_cases'] = {
        'test_points': tp_total,
        'json': tc_json_total,
        'md': tc_md_total,
        'match': tp_total == tc_json_total == tc_md_total
    }

    # 3. 级别分布校验
    tp_levels = _get_level_distribution(test_points)
    tc_json_levels = {}
    for m in test_cases_json['modules']:
        for tc in m['test_cases']:
            level = tc['level']
            tc_json_levels[level] = tc_json_levels.get(level, 0) + 1

    md_levels = {}
    for match in re.finditer(rf'^\|\s*({CASE_ID_PATTERN})\s*\|.*\|\s*(L[0-2])\s*\|', test_cases_md, re.MULTILINE):
        level = match.group(2)
        md_levels[level] = md_levels.get(level, 0) + 1

    level_match = True
    for level in ['L0', 'L1', 'L2']:
        tp_count = tp_levels.get(level, 0)
        json_count = tc_json_levels.get(level, 0)
        md_count = md_levels.get(level, 0)
        if tp_count != json_count or tp_count != md_count:
            level_match = False
        results['level_distribution']['test_points'][level] = tp_count
        results['level_distribution']['json'][level] = json_count
        results['level_distribution']['md'][level] = md_count

    results['level_distribution']['match'] = level_match

    # 4. 模块级用例数校验
    module_match = True
    for tp_mod, tc_mod in zip(test_points['modules'], test_cases_json['modules']):
        tp_count = len(tp_mod['testPoints'])
        tc_count = len(tc_mod['test_cases'])

        match = tp_count == tc_count
        if not match:
            module_match = False

        results['module_breakdown'][tc_mod['moduleCode']] = {
            'test_points': tp_count,
            'json': tc_count,
            'match': match
        }

    tp_case_ids = sorted(
        point['id']
        for module in test_points['modules']
        for point in module['testPoints']
    )
    json_case_ids = sorted(
        case['id']
        for module in test_cases_json['modules']
        for case in module['test_cases']
    )
    md_case_ids = sorted(re.findall(MARKDOWN_CASE_ROW_PATTERN, test_cases_md, re.MULTILINE))

    results['case_ids'] = {
        'test_points': tp_case_ids,
        'json': json_case_ids,
        'md': md_case_ids,
        'match': tp_case_ids == json_case_ids == md_case_ids
    }

    overall_match = (results['module_count']['match'] and
                     results['total_cases']['match'] and
                     results['level_distribution']['match'] and
                     results['case_ids']['match'] and
                     module_match)

    return overall_match, results


def verify_json_schema(json_path: str, schema: dict) -> Tuple[bool, list]:
    """
    JSON Schema 验证

    Args:
        json_path: JSON 文件路径
        schema: Schema 定义

    Returns:
        (是否通过，错误列表)
    """
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    errors = []

    # 检查必需字段
    if 'suite' not in data:
        errors.append('缺少 suite 对象')
    else:
        suite = data['suite']
        required_suite_fields = ['id', 'name', 'app_package']
        for field in required_suite_fields:
            if field not in suite:
                errors.append(f'suite 缺少字段：{field}')

    if 'modules' not in data:
        errors.append('缺少 modules 数组')
    else:
        for i, module in enumerate(data['modules']):
            required_module_fields = ['moduleCode', 'moduleName', 'test_cases']
            for field in required_module_fields:
                if field not in module:
                    errors.append(f'模块 {i} 缺少字段：{field}')

            if 'test_cases' in module:
                for j, tc in enumerate(module['test_cases']):
                    required_tc_fields = ['id', 'title', 'level', 'preconditions', 'test_steps', 'expected_result']
                    for field in required_tc_fields:
                        if field not in tc:
                            errors.append(f'模块 {i} 用例 {j} 缺少字段：{field}')

    return len(errors) == 0, errors


if __name__ == '__main__':
    import sys

    if len(sys.argv) != 4:
        print("用法：python verify_test_cases.py <test_points.json> <test_cases.json> <test_cases.md>")
        sys.exit(1)

    test_points_path = sys.argv[1]
    test_cases_json_path = sys.argv[2]
    test_cases_md_path = sys.argv[3]

    passed, results = verify_test_cases_three_way(test_points_path, test_cases_json_path, test_cases_md_path)

    if not passed:
        print("测试用例三方数据一致性验证失败")
        print(f"模块数：测试点={results['module_count']['test_points']}, " +
              f"JSON={results['module_count']['json']}, " +
              f"Markdown={results['module_count']['md']}")
        print(f"用例总数：测试点={results['total_cases']['test_points']}, " +
              f"JSON={results['total_cases']['json']}, " +
              f"Markdown={results['total_cases']['md']}")
        if not results['case_ids']['match']:
            print("用例 ID 不一致：测试点、JSON、Markdown 三方未完全对齐")
        sys.exit(1)
    else:
        print("测试用例三方数据一致性验证通过")
        sys.exit(0)
