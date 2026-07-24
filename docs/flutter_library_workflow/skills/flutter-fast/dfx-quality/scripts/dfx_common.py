#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
dfx_common.py — DFX 检测脚本公共工具模块

提供注释/字符串剥离、测试目录跳过等通用能力。
所有检测函数应在剥离后的文本上做正则匹配，用原始文本做修复。
"""

import os
from pathlib import Path
from typing import List, Tuple

SKIP_DIR_NAMES = frozenset({'test', 'tests', '__tests__', '__test__', '__mocks__', '__fixtures__', 'generated', 'dist', 'build', 'node_modules'})
SKIP_FILE_SUFFIXES = ('.test.ets', '.test.ts', '.test.js', '.test.tsx', '.spec.ets', '.spec.ts', '.spec.js', '.spec.tsx', '.mock.ets', '.mock.ts', '.mock.js', '.g.dart', '.generated.dart')


def should_skip(path: Path) -> bool:
    """判断文件是否应跳过检测（测试文件、生成代码等）。"""
    parts = path.parts
    for p in parts:
        if p in SKIP_DIR_NAMES:
            return True
    name = path.name.lower()
    for suffix in SKIP_FILE_SUFFIXES:
        if name.endswith(suffix):
            return True
    return False


def read_file(filepath: str) -> Tuple[str, str]:
    """多编码容错读取文件，返回 (内容, 编码)。"""
    for enc in ('utf-8', 'utf-8-sig', 'gbk', 'latin-1'):
        try:
            with open(filepath, 'r', encoding=enc) as f:
                return f.read(), enc
        except (UnicodeDecodeError, UnicodeError):
            continue
    raise RuntimeError(f"无法解码文件: {filepath}")


def strip_comments_strings(content: str) -> str:
    """
    将代码中的注释和字符串字面量替换为等长空格，保持行号对齐。

    状态机跟踪：
    - 单行注释 //
    - 块注释 /* */
    - 单引号字符串 '
    - 双引号字符串 "
    - 模板字面量 `（含 ${} 嵌套）

    返回与输入等长的文本，注释和字符串位置为空格，换行符保留。
    """
    result = list(content)
    n = len(result)
    i = 0

    # 状态: 'code', 'line_comment', 'block_comment', 'sq_string', 'dq_string', 'template'
    state = 'code'
    # 模板字面量的 ${} 嵌套深度栈
    template_brace_stack: List[int] = []
    # 块注释深度（不支持嵌套块注释，但跟踪状态）
    prev_char = ''

    while i < n:
        ch = result[i]
        # 换行符始终保留
        if ch == '\n':
            if state == 'line_comment':
                state = 'code'
            # 字符串和模板字面量不因换行结束（多行字符串/模板）
            result[i] = '\n'
            prev_char = ch
            i += 1
            continue

        if state == 'code':
            # 检测注释开始
            if ch == '/' and i + 1 < n:
                next_ch = result[i + 1]
                if next_ch == '/':
                    result[i] = ' '
                    result[i + 1] = ' '
                    state = 'line_comment'
                    i += 2
                    prev_char = '/'
                    continue
                elif next_ch == '*':
                    result[i] = ' '
                    result[i + 1] = ' '
                    state = 'block_comment'
                    i += 2
                    prev_char = '*'
                    continue
            # 检测字符串开始
            if ch == "'":
                result[i] = ' '
                state = 'sq_string'
                i += 1
                prev_char = ch
                continue
            if ch == '"':
                result[i] = ' '
                state = 'dq_string'
                i += 1
                prev_char = ch
                continue
            if ch == '`':
                result[i] = ' '
                state = 'template'
                template_brace_stack = []
                i += 1
                prev_char = ch
                continue
            # 普通代码字符保留
            prev_char = ch
            i += 1
            continue

        elif state == 'line_comment':
            # 单行注释：所有字符替换为空格
            result[i] = ' '
            i += 1
            continue

        elif state == 'block_comment':
            # 块注释：检测 */ 结束
            if ch == '*' and i + 1 < n and result[i + 1] == '/':
                result[i] = ' '
                result[i + 1] = ' '
                state = 'code'
                i += 2
                prev_char = '/'
                continue
            result[i] = ' '
            i += 1
            continue

        elif state == 'sq_string':
            # 单引号字符串
            if ch == '\\' and i + 1 < n:
                # 转义字符：替换当前和下一个为空格
                result[i] = ' '
                result[i + 1] = ' '
                i += 2
                prev_char = '\\'
                continue
            if ch == "'":
                result[i] = ' '
                state = 'code'
                i += 1
                prev_char = ch
                continue
            result[i] = ' '
            i += 1
            continue

        elif state == 'dq_string':
            # 双引号字符串
            if ch == '\\' and i + 1 < n:
                result[i] = ' '
                result[i + 1] = ' '
                i += 2
                prev_char = '\\'
                continue
            if ch == '"':
                result[i] = ' '
                state = 'code'
                i += 1
                prev_char = ch
                continue
            result[i] = ' '
            i += 1
            continue

        elif state == 'template':
            # 模板字面量
            if ch == '\\' and i + 1 < n:
                result[i] = ' '
                result[i + 1] = ' '
                i += 2
                prev_char = '\\'
                continue
            if ch == '`' and not template_brace_stack:
                # 模板结束（仅在不处于 ${} 内时）
                result[i] = ' '
                state = 'code'
                i += 1
                prev_char = ch
                continue
            if ch == '$' and i + 1 < n and result[i + 1] == '{':
                # ${} 表达式开始：进入代码模式
                # 保留 ${ 不替换，让其中的代码可被检测
                template_brace_stack.append(1)
                # 不替换 ${ ，标记为代码
                i += 2
                prev_char = '{'
                continue
            if ch == '{' and template_brace_stack:
                # ${} 内的嵌套 {
                template_brace_stack[-1] += 1
                i += 1
                prev_char = ch
                continue
            if ch == '}' and template_brace_stack:
                template_brace_stack[-1] -= 1
                if template_brace_stack[-1] == 0:
                    # ${} 表达式结束，回到模板字符串模式
                    template_brace_stack.pop()
                    i += 1
                    prev_char = '}'
                    continue
                i += 1
                prev_char = ch
                continue
            # 模板字符串内的非表达式部分替换为空格
            if not template_brace_stack:
                if ch != '\n':
                    result[i] = ' '
            i += 1
            prev_char = ch
            continue

    return ''.join(result)


def strip_line_comment(line: str) -> str:
    """
    剥离单行内的行尾注释（// ...），保留代码部分。
    用于对单行做正则匹配前的预处理。
    注意：不处理块注释，不处理字符串内的 //。
    """
    result = list(line)
    n = len(result)
    i = 0
    in_string = False
    string_char = ''
    in_template = False

    while i < n:
        ch = result[i]
        if ch == '\\' and i + 1 < n:
            i += 2
            continue
        if in_string:
            if ch == string_char:
                in_string = False
            i += 1
            continue
        if in_template:
            if ch == '`':
                in_template = False
            i += 1
            continue
        if ch in ("'", '"'):
            in_string = True
            string_char = ch
            i += 1
            continue
        if ch == '`':
            in_template = True
            i += 1
            continue
        if ch == '/' and i + 1 < n and result[i + 1] == '/':
            # 行尾注释开始，替换注释部分为空格
            for j in range(i, n):
                if result[j] != '\n':
                    result[j] = ' '
            break
        i += 1

    return ''.join(result)
