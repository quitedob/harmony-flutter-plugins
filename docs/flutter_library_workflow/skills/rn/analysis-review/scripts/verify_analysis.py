#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试分析报告三方数据一致性验证脚本

适用范围：阶段 3 - 测试分析报告评审
验证内容：测试点汇总 JSON、Markdown 报告、需求解析 JSON 三方数据一致性
"""

import json
import re
from typing import Tuple, Dict


def verify_module_count(test_points_path: str, report_md_path: str, requirement_path: str) -> Tuple[bool, Dict]:
    """
    模块数一致性校验

    Args:
        test_points_path: 测试点汇总 JSON 路径
        report_md_path: 测试分析报告 Markdown 路径
        requirement_path: 需求解析 JSON 路径

    Returns:
        (是否通过，校验结果详情)
    """
    # 读取数据
    with open(test_points_path, 'r', encoding='utf-8') as f:
        test_points = json.load(f)

    with open(report_md_path, 'r', encoding='utf-8') as f:
        report_md = f.read()

    with open(requirement_path, 'r', encoding='utf-8') as f:
        requirement = json.load(f)

    # 统计模块数
    tp_modules = len(test_points['modules'])
    md_modules = len(re.findall(r'^### (F-\d+):', report_md, re.MULTILINE))
    req_modules = len(requirement.get('modules', []))

    match = tp_modules == md_modules == req_modules

    return match, {
        'test_points': tp_modules,
        'markdown': md_modules,
        'requirement': req_modules,
        'match': match
    }


def verify_total_cases(test_points_path: str, report_md_path: str) -> Tuple[bool, Dict]:
    """
    测试点总数一致性校验

    Args:
        test_points_path: 测试点汇总 JSON 路径
        report_md_path: 测试分析报告 Markdown 路径

    Returns:
        (是否通过，校验结果详情)
    """
    with open(test_points_path, 'r', encoding='utf-8') as f:
        test_points = json.load(f)

    with open(report_md_path, 'r', encoding='utf-8') as f:
        report_md = f.read()

    tp_total = test_points['summary']['totalPoints']
    md_total = len(re.findall(r'^\| (F\d+-\d+) \|', report_md, re.MULTILINE))

    match = tp_total == md_total

    return match, {
        'test_points': tp_total,
        'markdown': md_total,
        'match': match
    }


def verify_level_distribution(test_points_path: str, report_md_path: str) -> Tuple[bool, Dict]:
    """
    级别分布一致性校验

    Args:
        test_points_path: 测试点汇总 JSON 路径
        report_md_path: 测试分析报告 Markdown 路径

    Returns:
        (是否通过，校验结果详情)
    """
    with open(test_points_path, 'r', encoding='utf-8') as f:
        test_points = json.load(f)

    with open(report_md_path, 'r', encoding='utf-8') as f:
        report_md = f.read()

    # 测试点 JSON 中的级别分布
    tp_levels = test_points['summary']['byLevel']

    # Markdown 中的级别分布
    md_levels = {'L0': 0, 'L1': 0, 'L2': 0, 'L3': 0}
    for match in re.finditer(r'^\| (F\d+-\d+) \|.*\| (L[0-3]) \|', report_md, re.MULTILINE):
        level = match.group(2)
        md_levels[level] += 1

    # 比对
    match = all(tp_levels.get(level, 0) == md_levels[level] for level in ['L0', 'L1', 'L2', 'L3'])

    return match, {
        'test_points': tp_levels,
        'markdown': md_levels,
        'match': match
    }


def verify_module_cases(test_points_path: str, report_md_path: str) -> Tuple[bool, Dict]:
    """
    模块级测试点数一致性校验

    Args:
        test_points_path: 测试点汇总 JSON 路径
        report_md_path: 测试分析报告 Markdown 路径

    Returns:
        (是否通过，校验结果详情)
    """
    with open(test_points_path, 'r', encoding='utf-8') as f:
        test_points = json.load(f)

    with open(report_md_path, 'r', encoding='utf-8') as f:
        report_md = f.read()

    module_match = {}
    overall_match = True

    for tp_mod in test_points['modules']:
        tp_count = len(tp_mod['testPoints'])
        prefix = tp_mod['moduleCode'].replace('-', '')
        # Markdown 中测试点在两个章节出现，需要除以 2
        md_count = len(re.findall(r'^\| ' + prefix + r'-\d+ \|', report_md, re.MULTILINE)) // 2

        match = tp_count == md_count
        if not match:
            overall_match = False

        module_match[tp_mod['moduleCode']] = {
            'test_points': tp_count,
            'markdown': md_count,
            'match': match
        }

    return overall_match, module_match


def verify_three_way_consistency(test_points_path: str, report_md_path: str, requirement_path: str) -> Tuple[bool, Dict]:
    """
    三方数据一致性综合校验

    Args:
        test_points_path: 测试点汇总 JSON 路径
        report_md_path: 测试分析报告 Markdown 路径
        requirement_path: 需求解析 JSON 路径

    Returns:
        (是否通过，校验结果详情)
    """
    results = {
        'moduleCount': None,
        'totalCases': None,
        'levelDistribution': None,
        'moduleBreakdown': None,
        'overall': True
    }

    # 1. 模块数校验
    match, details = verify_module_count(test_points_path, report_md_path, requirement_path)
    results['moduleCount'] = {'match': match, 'details': details}
    if not match:
        results['overall'] = False

    # 2. 测试点总数校验
    match, details = verify_total_cases(test_points_path, report_md_path)
    results['totalCases'] = {'match': match, 'details': details}
    if not match:
        results['overall'] = False

    # 3. 级别分布校验
    match, details = verify_level_distribution(test_points_path, report_md_path)
    results['levelDistribution'] = {'match': match, 'details': details}
    if not match:
        results['overall'] = False

    # 4. 模块级测试点数校验
    match, details = verify_module_cases(test_points_path, report_md_path)
    results['moduleBreakdown'] = {'match': match, 'details': details}
    if not match:
        results['overall'] = False

    return results['overall'], results


if __name__ == '__main__':
    import sys

    if len(sys.argv) != 4:
        print("用法：python verify_analysis.py <test_points.json> <report.md> <requirement.json>")
        sys.exit(1)

    test_points_path = sys.argv[1]
    report_md_path = sys.argv[2]
    requirement_path = sys.argv[3]

    passed, results = verify_three_way_consistency(test_points_path, report_md_path, requirement_path)

    if not passed:
        print("三方数据一致性验证失败")
        if not results['moduleCount']['match']:
            print(f"模块数不一致：测试点={results['moduleCount']['details']['test_points']}, " +
                  f"Markdown={results['moduleCount']['details']['markdown']}, " +
                  f"需求={results['moduleCount']['details']['requirement']}")
        if not results['totalCases']['match']:
            print(f"用例总数不一致：测试点={results['totalCases']['details']['test_points']}, " +
                  f"Markdown={results['totalCases']['details']['markdown']}")
        if not results['levelDistribution']['match']:
            print(f"级别分布不一致：{results['levelDistribution']['details']}")
        if not results['moduleBreakdown']['match']:
            print(f"模块级用例数不一致：{results['moduleBreakdown']['details']}")
        sys.exit(1)
    else:
        print("三方数据一致性验证通过")
        sys.exit(0)
