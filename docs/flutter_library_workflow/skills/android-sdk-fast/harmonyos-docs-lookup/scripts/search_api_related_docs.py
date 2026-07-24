#!/usr/bin/env python3
"""
HarmonyOS API 相关文档搜索脚本

用途：根据 API 名称自动搜索所有相关文档，帮助 AI 快速筛选最佳实践。

输入：API 名称（单个或多个，空格分隔）
输出：按优先级排序的文档列表（最佳实践 > 开发指导 > API参考）

使用方式：
    python scripts/search_api_related_docs.py PinchGesture
    python scripts/search_api_related_docs.py PinchGesture PanGesture Image
    python scripts/search_api_related_docs.py PinchGesture --json
    
输出示例：
    [
        {"file": "图片预览器.md", "type": "最佳实践", "priority": 5, "apis": ["PinchGesture", "PanGesture", "Image"]},
        {"file": "单一手势.md", "type": "API参考", "priority": 1, "apis": ["PinchGesture"]},
        ...
    ]
"""

import os
import re
import sys
import json
import glob
from typing import List, Dict, Set
from pathlib import Path

# 获取脚本所在目录，references 在上级目录
SCRIPT_DIR = Path(__file__).parent.resolve()
SKILL_DIR = SCRIPT_DIR.parent
REFERENCES_DIR = SKILL_DIR / "references"


def search_api_related_docs(api_names: List[str]) -> List[Dict]:
    """
    根据多个 API 名称搜索所有相关文档
    
    Args:
        api_names: API 名称列表，如 ["PinchGesture", "PanGesture", "Image"]
    
    Returns:
        按优先级排序的文档列表，每个文档包含匹配的 API 列表
    """
    if not REFERENCES_DIR.exists():
        return [{"error": f"references 目录不存在: {REFERENCES_DIR}"}]
    
    # 文档 -> 匹配的 API 集合
    doc_api_map: Dict[str, Set[str]] = {}
    # 文档 -> 类型
    doc_types: Dict[str, str] = {}
    # 文档 -> 匹配方式
    doc_match_types: Dict[str, str] = {}
    # 文档 -> 路径
    doc_paths: Dict[str, str] = {}
    
    for api_name in api_names:
        # 1. 文件名直接匹配
        pattern = f"*{api_name}*.md"
        for file_path in REFERENCES_DIR.glob(pattern):
            filename = file_path.name
            if filename not in doc_api_map:
                doc_api_map[filename] = set()
                doc_types[filename] = classify_doc_type(filename)
                doc_match_types[filename] = "filename"
                doc_paths[filename] = str(file_path.relative_to(SKILL_DIR))
            doc_api_map[filename].add(api_name)
        
        # 2. 内容匹配
        for file_path in REFERENCES_DIR.glob("**/*.md"):
            filename = file_path.name
            try:
                content = file_path.read_text(encoding="utf-8")
                if api_name in content:
                    if filename not in doc_api_map:
                        doc_api_map[filename] = set()
                        doc_types[filename] = classify_doc_type(filename)
                        doc_match_types[filename] = "content"
                        doc_paths[filename] = str(file_path.relative_to(SKILL_DIR))
                    doc_api_map[filename].add(api_name)
                    # 如果之前是 filename 匹配，现在是 filename+content
                    if doc_match_types[filename] == "filename":
                        doc_match_types[filename] = "filename+content"
            except Exception:
                continue
    
    # 构建结果列表
    results = []
    for filename, apis in doc_api_map.items():
        doc_type = doc_types[filename]
        # 计算综合优先级：基础优先级 + API 匹配数加分
        base_priority = get_priority(doc_type)
        api_bonus = min(len(apis), 3)  # 匹配更多 API 加分，最多 +3
        final_priority = base_priority + api_bonus
        
        results.append({
            "file": filename,
            "type": doc_type,
            "priority": final_priority,
            "base_priority": base_priority,
            "matched_apis": sorted(list(apis)),
            "api_count": len(apis),
            "match_type": doc_match_types[filename],
            "path": doc_paths[filename],
        })
    
    # 按优先级排序（综合优先级 > API 匹配数）
    sorted_results = sorted(
        results,
        key=lambda x: (x["priority"], x["api_count"]),
        reverse=True
    )
    
    return sorted_results


def classify_doc_type(filename: str) -> str:
    """
    根据文件名判断文档类型
    """
    filename_lower = filename.lower()
    
    # 最佳实践关键词（优先级最高）
    best_practice_keywords = [
        "最佳实践", "实践", "预览器", "示例", "场景化",
        "解决方案", "案例", "实现"
    ]
    for kw in best_practice_keywords:
        if kw in filename:
            return "最佳实践"
    
    # 开发指导
    if "(arkts)" in filename_lower or "(c_c++)" in filename_lower or "开发指导" in filename:
        return "开发指导"
    
    # 常见问题
    if "常见问题" in filename or "如何" in filename or "faq" in filename_lower:
        return "常见问题"
    
    # 概述
    if "简介" in filename or "概述" in filename:
        return "概述"
    
    return "API参考"


def get_priority(doc_type: str) -> int:
    """
    文档类型基础优先级
    """
    priorities = {
        "最佳实践": 5,
        "开发指导": 4,
        "常见问题": 3,
        "概述": 2,
        "API参考": 1,
    }
    return priorities.get(doc_type, 0)


def format_output(results: List[Dict], api_names: List[str]) -> str:
    """格式化输出，方便 AI 阅读"""
    if not results:
        return f"未找到相关文档"
    
    lines = [f"# API 相关文档搜索结果"]
    lines.append(f"输入 API: {', '.join(api_names)}")
    lines.append(f"找到文档: {len(results)} 个")
    lines.append("")
    lines.append("排序规则：基础优先级 + API 匹配数加分")
    lines.append("- 最佳实践(5) > 开发指导(4) > 常见问题(3) > 概述(2) > API参考(1)")
    lines.append("- 匹配更多 API 加分（最多 +3）")
    lines.append("")
    lines.append("| 优先级 | 类型 | 匹配API数 | 文件名 | 匹配的API |")
    lines.append("|--------|------|-----------|--------|----------|")
    
    for r in results:
        apis_str = ", ".join(r["matched_apis"])
        lines.append(f"| {r['priority']} | {r['type']} | {r['api_count']} | {r['file']} | {apis_str} |")
    
    lines.append("")
    lines.append("**建议**：优先读取「最佳实践」类型且匹配 API 最多的文档。")
    lines.append("")
    
    # 找出最佳推荐
    best = results[0] if results else None
    if best and best["type"] == "最佳实践":
        lines.append(f"**推荐**：{best['file']}（匹配 {best['api_count']} 个 API，包含完整实现）")
    
    lines.append("")
    lines.append("---")
    lines.append("如果以上结果不满足需求，请使用三步查找法自行搜索。")
    
    return "\n".join(lines)


def main():
    if len(sys.argv) < 2:
        print("用法: python search_api_related_docs.py <API名称1> [API名称2] ...")
        print("示例:")
        print("  python search_api_related_docs.py PinchGesture")
        print("  python search_api_related_docs.py PinchGesture PanGesture Image")
        print("  python search_api_related_docs.py PinchGesture --json")
        sys.exit(1)
    
    # 解析参数
    args = sys.argv[1:]
    use_json = "--json" in args
    api_names = [arg for arg in args if arg != "--json"]
    
    if not api_names:
        print("错误：请提供至少一个 API 名称")
        sys.exit(1)
    
    results = search_api_related_docs(api_names)
    
    # 输出
    if use_json:
        output = {
            "apis": api_names,
            "total_docs": len(results),
            "results": results,
        }
        print(json.dumps(output, ensure_ascii=False, indent=2))
    else:
        print(format_output(results, api_names))


if __name__ == "__main__":
    main()