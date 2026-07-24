#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
dfx_utils.py — dfx-quality 工具公共模块

提供目录过滤、编码容错读取、括号平衡、console 安全移除、原子写入等功能。
"""

import os
import re
import tempfile
from pathlib import Path
from typing import List, Tuple

SKIP_DIR_NAMES = frozenset({'test', '__tests__', 'generated'})


def should_skip(path: Path) -> bool:
    parts = path.parts
    for p in parts:
        if p in SKIP_DIR_NAMES:
            return True
    for i, p in enumerate(parts):
        if p == 'ohos' and i + 1 < len(parts) and parts[i + 1] == 'example':
            return True
    return False


def read_file(filepath: str) -> Tuple[str, str]:
    for enc in ('utf-8', 'utf-8-sig', 'gbk', 'latin-1'):
        try:
            with open(filepath, 'r', encoding=enc) as f:
                return f.read(), enc
        except (UnicodeDecodeError, UnicodeError):
            continue
    raise RuntimeError(f"无法解码文件: {filepath}")


def count_paren_balance(text: str) -> int:
    depth = 0
    in_string = False
    string_char = None
    in_template = False
    template_depth = 0
    escaped = False
    i = 0
    while i < len(text):
        ch = text[i]
        if escaped:
            escaped = False
            i += 1
            continue
        if ch == '\\':
            escaped = True
            i += 1
            continue
        if in_template:
            if ch == '{':
                template_depth += 1
            elif ch == '}':
                template_depth -= 1
                if template_depth <= 0:
                    in_template = False
            elif ch == '`':
                in_template = False
            i += 1
            continue
        if in_string:
            if ch == string_char:
                in_string = False
            i += 1
            continue
        if ch in ('"', "'"):
            in_string = True
            string_char = ch
            i += 1
            continue
        if ch == '`':
            in_template = True
            i += 1
            continue
        if ch == '(':
            depth += 1
        elif ch == ')':
            depth -= 1
        i += 1
    return depth


def validate_brackets(content: str) -> bool:
    stack = []
    pairs = {'(': ')', '[': ']', '{': '}'}
    openers = set(pairs)
    closers = set(pairs.values())
    in_string = False
    string_char = None
    in_template = False
    template_depth = 0
    escaped = False
    i = 0
    while i < len(content):
        ch = content[i]
        if escaped:
            escaped = False
            i += 1
            continue
        if ch == '\\':
            escaped = True
            i += 1
            continue
        if in_template:
            if ch == '{':
                template_depth += 1
            elif ch == '}':
                template_depth -= 1
                if template_depth <= 0:
                    in_template = False
            elif ch == '`':
                in_template = False
            i += 1
            continue
        if in_string:
            if ch == string_char:
                in_string = False
            i += 1
            continue
        if ch in ('"', "'"):
            in_string = True
            string_char = ch
            i += 1
            continue
        if ch == '`':
            in_template = True
            i += 1
            continue
        if ch in openers:
            stack.append(ch)
        elif ch in closers:
            if not stack or pairs.get(stack[-1]) != ch:
                return False
            stack.pop()
        i += 1
    return len(stack) == 0


def _remove_string_literals(text: str) -> str:
    result = re.sub(r"'(?:[^'\\]|\\.)*'", '""', text)
    result = re.sub(r'"(?:[^"\\]|\\.)*"', '""', result)
    result = re.sub(r'`(?:[^`\\]|\\.)*`', '""', result)
    return result


def _has_side_effects(args_text: str) -> bool:
    cleaned = _remove_string_literals(args_text)
    patterns = [
        r'(?<![=!<>])=(?!=)',
        r'\+\+',
        r'--',
        r'[+\-*/%&|^]=',
        r'\bnew\s+',
        r'\bdelete\s+',
        r'\bawait\s+',
    ]
    for pattern in patterns:
        if re.search(pattern, cleaned):
            return True
    return False


def _is_control_structure_body(lines: List[str], current_idx: int, indent: str) -> bool:
    for j in range(current_idx - 1, -1, -1):
        prev = lines[j].strip()
        if not prev:
            continue
        if re.search(r'^\s*(if|else\s+if|else|for|while|do)\b', lines[j]):
            prev_indent = len(lines[j]) - len(lines[j].lstrip())
            curr_indent = len(indent)
            if curr_indent > prev_indent:
                return True
        break
    return False


def _find_call_end_in_text(text: str) -> int:
    depth = 0
    in_str = False
    str_ch = None
    in_tpl = False
    tpl_depth = 0
    esc = False
    for idx, ch in enumerate(text):
        if esc:
            esc = False
            continue
        if ch == '\\':
            esc = True
            continue
        if in_tpl:
            if ch == '{':
                tpl_depth += 1
            elif ch == '}':
                tpl_depth -= 1
                if tpl_depth <= 0:
                    in_tpl = False
            elif ch == '`':
                in_tpl = False
            continue
        if in_str:
            if ch == str_ch:
                in_str = False
            continue
        if ch in ('"', "'"):
            in_str = True
            str_ch = ch
            continue
        if ch == '`':
            in_tpl = True
            continue
        if ch == '(':
            depth += 1
        elif ch == ')':
            depth -= 1
            if depth == 0:
                return idx + 1
    return len(text)


def _extract_args_from_call(call_text: str) -> str:
    start = call_text.find('(')
    if start < 0:
        return ''
    depth = 0
    for i, ch in enumerate(call_text[start:], start):
        if ch == '(':
            depth += 1
        elif ch == ')':
            depth -= 1
            if depth == 0:
                return call_text[start + 1:i]
    return call_text[start + 1:]


def atomic_write(filepath: str, content: str, encoding: str) -> bool:
    dir_name = os.path.dirname(filepath)
    tmp_path = None
    try:
        fd, tmp_path = tempfile.mkstemp(dir=dir_name, suffix='.tmp')
        with os.fdopen(fd, 'w', encoding=encoding) as f:
            f.write(content)
        os.replace(tmp_path, filepath)
        return True
    except Exception:
        if tmp_path and os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)
            except Exception:
                pass
        return False


def remove_console_calls(content: str) -> Tuple[str, int, List[str]]:
    lines = content.split('\n')
    result_lines = []
    fixes = 0
    skipped = []
    i = 0

    while i < len(lines):
        line = lines[i]
        m = re.match(r'^(\s*)console\.(log|debug|info)\s*\(', line)
        if not m:
            result_lines.append(line)
            i += 1
            continue

        indent = m.group(1)
        method = m.group(2)
        call_start_on_line = m.start()

        call_text = line[call_start_on_line:]
        depth = count_paren_balance(call_text)
        end_line = i

        while depth > 0 and end_line + 1 < len(lines):
            end_line += 1
            call_text += '\n' + lines[end_line]
            depth += count_paren_balance(lines[end_line])

        if depth != 0:
            skipped.append(
                f"行 {i+1}] console.{method} 括号无法平衡，跳过 — 需手动移除"
            )
            result_lines.append(line)
            i += 1
            continue

        args_text = _extract_args_from_call(call_text)
        if _has_side_effects(args_text):
            skipped.append(
                f"行 {i+1}] console.{method} 参数含副作用表达式，跳过 — 需手动替换为 hilog"
            )
            result_lines.append(line)
            i += 1
            continue

        if _is_control_structure_body(lines, i, indent):
            skipped.append(
                f"行 {i+1}] console.{method} 是控制结构唯一语句体，跳过 — 需手动替换为 hilog"
            )
            result_lines.append(line)
            i += 1
            continue

        if end_line == i:
            after_call_end = call_start_on_line + _find_call_end_in_text(call_text)
            after_call = line[after_call_end:] if after_call_end < len(line) else ''
            before_call = line[:call_start_on_line]
            if before_call.strip() or after_call.strip() not in ('', ';'):
                skipped.append(
                    f"行 {i+1}] console.{method} 所在行含其他代码，跳过 — 需手动移除"
                )
                result_lines.append(line)
                i += 1
                continue
        else:
            before_call = line[:call_start_on_line]
            if before_call.strip():
                skipped.append(
                    f"行 {i+1}] 多行 console.{method} 首行含其他代码，跳过 — 需手动移除"
                )
                for j in range(i, end_line + 1):
                    result_lines.append(lines[j])
                i = end_line + 1
                continue
            call_end_in_last = _find_call_end_in_text(lines[end_line])
            if call_end_in_last >= 0:
                after_last = lines[end_line][call_end_in_last:]
                if after_last.strip() not in ('', ';'):
                    skipped.append(
                        f"行 {i+1}] 多行 console.{method} 末行含其他代码，跳过 — 需手动移除"
                    )
                    for j in range(i, end_line + 1):
                        result_lines.append(lines[j])
                    i = end_line + 1
                    continue

        fixes += 1
        i = end_line + 1

    new_content = '\n'.join(result_lines)

    if fixes > 0 and not validate_brackets(new_content):
        return content, 0, [
            "[ERROR] 移除后全局括号校验失败，所有修改已取消 — 需手动检查"
        ]

    return new_content, fixes, skipped
