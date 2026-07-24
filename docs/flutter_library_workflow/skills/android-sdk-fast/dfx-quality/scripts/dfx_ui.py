#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
dfx_ui.py - HarmonyOS HAR Demo ETS UI 自动修复工具

扫描 entry/src/main/ets/**/*.ets 中的硬编码颜色值，自动替换为
`$r('app.color.xxx')` 资源引用（框架自动切换暗色）；
对 Canvas 组件保留三元表达式 + @StorageLink 注入；
同时检测不可自动修复的布局问题（缺 Scroll、Row+Button 溢出、同色值、固定 px 宽高、
Text 缺 maxLines/textOverflow）。

用法:
    python dfx_ui.py --target <entry_ets_dir>
    python dfx_ui.py --target <entry_ets_dir> --dry-run
"""

import argparse
import os
import re
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple

from dfx_common import strip_comments_strings, strip_line_comment, should_skip

# ── 色值映射表 ───────────────────────────────────────────────────────
# 非 Canvas 替换 → $r() 资源引用（框架自动切换暗色，不需 @StorageLink）
COLOR_RESOURCE_MAP: Dict[str, str] = {
    '#F1F3F5': "$r('app.color.bg_page')",
    '#FFFFFF': "$r('app.color.bg_card')",
    '#333333': "$r('app.color.text_primary')",
    '#666666': "$r('app.color.text_secondary')",
    '#999999': "$r('app.color.text_tertiary')",
    '#CCCCCC': "$r('app.color.scrollbar')",
}

COLOR_ENUM_RESOURCE_MAP: Dict[str, str] = {
    'Color.White': "$r('app.color.bg_card')",
}

# Canvas 赋值仍需 hex → dark/light 对（Canvas 不支持 $r()）
COLOR_CANVAS_MAP: Dict[str, Tuple[str, str]] = {
    '#F1F3F5': ('#1A1A1A', '#F1F3F5'),
    '#FFFFFF': ('#2D2D2D', '#FFFFFF'),
    '#333333': ('#E5E5E5', '#333333'),
    '#666666': ('#999999', '#666666'),
    '#999999': ('#666666', '#999999'),
    '#CCCCCC': ('#555555', '#CCCCCC'),
}

# ── 需要替换的 ArkUI 颜色方法 ──────────────────────────────────────────
COLOR_METHODS = [
    'fontColor', 'backgroundColor', 'fillColor', 'scrollBarColor',
    'strokeStyle', 'fillStyle',
]

# ── 正则模式 ───────────────────────────────────────────────────────────
RE_IMPORT_ABILITY = re.compile(
    r"""import\s*\{[^}]*ConfigurationConstant[^}]*\}\s*from\s*['"]@kit\.AbilityKit['"]""",
)
RE_IMPORT_LAST = re.compile(r"^(import\s+.+)$", re.MULTILINE)
RE_STORAGE_LINK = re.compile(r"""@StorageLink\(\s*'colorMode'\s*\)""")
RE_STRUCT_START = re.compile(
    r"""(@Entry\s*)?@Component\s*\n\s*(export\s+)?struct\s+(\w+)\s*\{""",
)
RE_STRUCT_BODY_START = re.compile(
    r"""((@Entry\s*)?@Component[^\{]*struct\s+\w+\s*\{)\s*\n""",
)

# 十六进制颜色匹配（仅在颜色方法中）
RE_HEX_COLOR = re.compile(
    rf"""\.({'|'.join(COLOR_METHODS)})\(\s*'(#[0-9A-Fa-f]{{6,8}})'\s*\)""",
)

# Color.White 等枚举
RE_ENUM_COLOR = re.compile(
    rf"""\.({'|'.join(COLOR_METHODS)})\(\s*(Color\.\w+)\s*\)""",
)

# Canvas 赋值风格 (context.fillStyle = '#...')
RE_CANVAS_COLOR = re.compile(
    r"""([\w.]+)\.(fillStyle|strokeStyle)\s*=\s*'(#[0-9A-Fa-f]{6,8})'\s*;?""",
)

# Canvas 上下文（检测是否需要注入 @StorageLink）
RE_CANVAS_CONTEXT = re.compile(r'\bCanvasRenderingContext2D\b')

# 已有 $r() 表达式（跳过）
RE_RESOURCE_REF = re.compile(r"""\$r\(""")

# 注释上下文
RE_LINE_COMMENT = re.compile(r'//.*$')
RE_BLOCK_COMMENT_START = re.compile(r'/\*')
RE_BLOCK_COMMENT_END = re.compile(r'\*/')

# ── 告警检测 ────────────────────────────────────────────────────────────
RE_PX_STRING = re.compile(
    r"""\.(width|height|margin|padding|borderRadius|fontSize)\(\s*'(\d+)px'\s*\)""",
)

# 深色模式 / 折叠屏
RE_WEB_COMPONENT = re.compile(r'\bWeb\s*\(')
RE_WEB_DARKMODE = re.compile(r'\.darkMode\(')
RE_ROUTER_PUSH = re.compile(r'\brouter\.(push|pushUrl|pushNamedUrl)\b')


def is_in_comment(line: str, in_block: bool) -> Tuple[bool, bool]:
    """检查行是否在注释中，返回 (line_is_comment, in_block_after)"""
    stripped = line.strip()
    if in_block:
        if RE_BLOCK_COMMENT_END.search(stripped):
            return True, False
        return True, True
    if RE_BLOCK_COMMENT_START.search(stripped):
        if RE_BLOCK_COMMENT_END.search(stripped):
            # 单行块注释
            return True, False
        return True, True
    if stripped.startswith('//'):
        return True, False
    return False, False


def should_skip_line(line: str) -> bool:
    """已有 $r() 引用的颜色调用应跳过"""
    return bool(RE_RESOURCE_REF.search(line))


def needs_color_fix(content: str) -> bool:
    """检查文件是否需要颜色修复"""
    return bool(RE_HEX_COLOR.search(content) or RE_ENUM_COLOR.search(content))


def has_canvas_context(content: str) -> bool:
    """检查文件是否包含 Canvas 相关代码"""
    return bool(RE_CANVAS_CONTEXT.search(content)) or bool(RE_CANVAS_COLOR.search(content))


def fix_hex_colors_in_line(line: str, match_line: Optional[str] = None) -> Tuple[str, int, List[str]]:
    """替换一行中的硬编码 hex 颜色为 $r() 资源引用。
    match_line 为剥离行尾注释后的文本（用于定位匹配），line 为原始文本（用于替换）。"""
    if match_line is None:
        match_line = line
    fixed = line
    count = 0
    warnings: List[str] = []

    for match in RE_HEX_COLOR.finditer(match_line):
        method = match.group(1)
        hex_val = match.group(2).upper()
        if hex_val in COLOR_RESOURCE_MAP:
            resource_ref = COLOR_RESOURCE_MAP[hex_val]
            old = match.group(0)
            new = f".{method}({resource_ref})"
            fixed = fixed.replace(old, new, 1)
            count += 1

    return fixed, count, warnings


def fix_enum_colors_in_line(line: str, match_line: Optional[str] = None) -> Tuple[str, int, List[str]]:
    """替换一行中的 Color.White 等枚举颜色为 $r() 资源引用"""
    if match_line is None:
        match_line = line
    fixed = line
    count = 0
    warnings: List[str] = []

    for match in RE_ENUM_COLOR.finditer(match_line):
        method = match.group(1)
        enum_val = match.group(2)
        if enum_val in COLOR_ENUM_RESOURCE_MAP:
            resource_ref = COLOR_ENUM_RESOURCE_MAP[enum_val]
            old = match.group(0)
            new = f".{method}({resource_ref})"
            fixed = fixed.replace(old, new, 1)
            count += 1

    return fixed, count, warnings


def fix_canvas_colors_in_line(line: str, match_line: Optional[str] = None) -> Tuple[str, int, List[str]]:
    """替换 Canvas 赋值风格的硬编码颜色 (context.fillStyle = '#...')，保留三元表达式。
    注意：依赖 this.colorMode，须先通过 inject_canvas_storage_link 注入 @StorageLink 声明。"""
    if match_line is None:
        match_line = line
    fixed = line
    count = 0
    warnings: List[str] = []

    for match in RE_CANVAS_COLOR.finditer(match_line):
        var = match.group(1)
        prop = match.group(2)
        hex_val = match.group(3).upper()
        if hex_val in COLOR_CANVAS_MAP:
            dark, light = COLOR_CANVAS_MAP[hex_val]
            old = match.group(0)
            new = (
                f"{var}.{prop} = this.colorMode === ConfigurationConstant.ColorMode.COLOR_MODE_DARK"
                f" ? '{dark}' : '{light}'"
            )
            fixed = fixed.replace(old, new, 1)
            count += 1
    return fixed, count, warnings


def inject_canvas_import(content: str) -> str:
    """为含 Canvas 的文件注入 ConfigurationConstant import"""
    import_line = "import { ConfigurationConstant } from '@kit.AbilityKit';"
    if RE_IMPORT_ABILITY.search(content):
        return content
    last_match = None
    for m in RE_IMPORT_LAST.finditer(content):
        last_match = m
    if last_match:
        pos = last_match.end()
        return content[:pos] + '\n' + import_line + content[pos:]
    return import_line + '\n' + content


def inject_canvas_storage_link(content: str) -> str:
    """为含 Canvas 的文件注入 @StorageLink 声明"""
    if RE_STORAGE_LINK.search(content):
        return content
    declaration = (
        "  @StorageLink('colorMode') @Watch('onColorModeChange')\n"
        "  colorMode: ConfigurationConstant.ColorMode = ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET;\n\n"
        "  onColorModeChange(): void {}\n"
    )
    match = RE_STRUCT_BODY_START.search(content)
    if match:
        pos = match.end()
        return content[:pos] + '\n' + declaration + content[pos:]
    return content


def detect_layout_issues(filepath: str, content: str) -> List[str]:
    """检测不可自动修复的布局问题"""
    issues = []
    basename = os.path.basename(filepath)

    # 剥离注释用于关键字检测（保留字符串用于色值提取）
    stripped_content = strip_comments_strings(content)

    has_entry = bool(re.search(r'@Entry', stripped_content))
    has_scroll = bool(re.search(r'\bScroll\b', stripped_content))
    has_column = bool(re.search(r'\bColumn\(', stripped_content))
    has_row_buttons = bool(re.search(r'\bRow\b', stripped_content)
                           and re.search(r'\bButton\b', stripped_content))

    if has_entry and has_column and not has_scroll:
        issues.append(        f"WARNING: 未检测到 Scroll 包裹 - 长内容可能超屏截断")

    if has_row_buttons:
        issues.append(
            f"WARNING: Row() 中含 Button - 窄屏可能溢出，建议改为 Flex({{ wrap: FlexWrap.Wrap }})"
        )

    # 检测 fontColor 和 backgroundColor 使用相同色值
    font_color_vals: Dict[str, int] = {}
    bg_color_vals: Dict[str, int] = {}
    for m in RE_HEX_COLOR.finditer(content):
        hex_val = m.group(2).upper()
        line_num = content[:m.start()].count('\n') + 1
        method = m.group(1)
        if method == 'fontColor':
            font_color_vals[hex_val] = line_num
        elif method == 'backgroundColor':
            bg_color_vals[hex_val] = line_num
    for m in RE_ENUM_COLOR.finditer(content):
        enum_val = m.group(2)
        line_num = content[:m.start()].count('\n') + 1
        method = m.group(1)
        if method == 'fontColor':
            font_color_vals[enum_val] = line_num
        elif method == 'backgroundColor':
            bg_color_vals[enum_val] = line_num
    for val, line_num in font_color_vals.items():
        if val in bg_color_vals:
            issues.append(
                f"WARNING: fontColor 和 backgroundColor 使用相同色值 {val} [行 {line_num}] - 文字不可见"
            )

    # 检测固定 px 字符串（ArkUI 中 'px' 禁止使用）
    for match in RE_PX_STRING.finditer(content):
        prop = match.group(1)
        px_val = match.group(2)
        line_num = content[:match.start()].count('\n') + 1
        issues.append(
            f"WARNING: 使用了固定 px 值 {prop}('{px_val}px') [行 {line_num}] - 改为 vp 或 %"
        )

    # 检测 Text 组件缺少 maxLines + textOverflow（内容截断处理）
    issues.extend(detect_text_truncation_issues(content, stripped_content))

    return issues


def detect_text_truncation_issues(content: str, stripped_content: str) -> List[str]:
    """检测 Text 组件缺少 maxLines 和 textOverflow（内容截断处理 [1-5]）"""
    issues = []
    lines = stripped_content.split('\n')

    for i, line in enumerate(lines):
        if not re.search(r'\bText\s*\(', line):
            continue
        line_num = i + 1
        # 向下搜索 15 行查找 .maxLines( 和 .textOverflow(
        search_window = '\n'.join(lines[i:min(len(lines), i + 15)])
        has_max_lines = bool(re.search(r'\.maxLines\s*\(', search_window))
        has_text_overflow = bool(re.search(r'\.textOverflow\s*\(', search_window))
        if not has_max_lines and not has_text_overflow:
            issues.append(
                f"WARNING: Text 组件 [行 {line_num}] 缺少 maxLines 和 textOverflow - "
                f"长文本可能溢出，建议添加 .maxLines(N).textOverflow({{ overflow: TextOverflow.Ellipsis }})"
            )
    return issues


def fix_file(filepath: str, dry_run: bool = False) -> Tuple[int, List[str]]:
    """修复单个 .ets 文件，返回 (fix_count, warnings)"""
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    content = original
    total_fixes = 0
    fix_warnings: List[str] = []
    has_canvas = has_canvas_context(content)

    # Canvas 文件：注入 import 和 @StorageLink，并验证 colorMode 声明是否就绪
    canvas_colormode_ok = False
    if has_canvas:
        content = inject_canvas_import(content)
        content = inject_canvas_storage_link(content)
        canvas_colormode_ok = bool(
            re.search(r"@StorageLink\(\s*'colorMode'\s*\)|\bcolorMode\b", content)
        )
        if not canvas_colormode_ok:
            fix_warnings.append(
                "Canvas 颜色替换已跳过: 文件中无 @StorageLink('colorMode') 声明且注入失败"
                "（struct 格式不匹配），请手动添加 @StorageLink('colorMode') 声明"
            )

    lines = content.split('\n')
    fixed_lines = []
    in_block_comment = False

    for line in lines:
        is_comment, in_block_comment = is_in_comment(line, in_block_comment)
        if is_comment or should_skip_line(line):
            fixed_lines.append(line)
            continue

        # 用剥离行尾注释后的文本定位匹配，用原始行执行替换
        match_line = strip_line_comment(line)

        fixed_line, hex_count, hex_warns = fix_hex_colors_in_line(line, match_line)
        fix_warnings.extend(hex_warns)
        fixed_line, enum_count, enum_warns = fix_enum_colors_in_line(fixed_line, match_line)
        fix_warnings.extend(enum_warns)
        if has_canvas and canvas_colormode_ok:
            fixed_line, canvas_count, canvas_warns = fix_canvas_colors_in_line(
                fixed_line, match_line
            )
            fix_warnings.extend(canvas_warns)
        else:
            canvas_count = 0
        total_fixes += hex_count + enum_count + canvas_count
        fixed_lines.append(fixed_line)

    content = '\n'.join(fixed_lines)

    if total_fixes > 0 and not dry_run:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

    warnings = detect_layout_issues(filepath, content)
    warnings.extend(detect_darkmode_issues_for_file(content))
    warnings.extend(detect_foldable_issues(content))
    warnings.extend(fix_warnings)

    return total_fixes, warnings


def detect_darkmode_issues_for_file(content: str) -> List[str]:
    """检测深色模式问题（3-9: Web 组件 darkMode）"""
    issues = []
    stripped = strip_comments_strings(content)
    for m in RE_WEB_COMPONENT.finditer(stripped):
        line_num = content[:m.start()].count('\n') + 1
        if not RE_WEB_DARKMODE.search(stripped):
            issues.append(
                f"WARNING: Web 组件未设置 darkMode [行 {line_num}] - 建议添加 .darkMode(WebDarkMode.Auto)"
            )
            break
    return issues


def detect_foldable_issues(content: str) -> List[str]:
    """检测折叠屏适配问题（6-2: router.push → Navigation 迁移）"""
    issues = []
    stripped = strip_comments_strings(content)
    for m in RE_ROUTER_PUSH.finditer(stripped):
        line_num = content[:m.start()].count('\n') + 1
        issues.append(
            f"WARNING: 使用了 router.{m.group(1)} [行 {line_num}] - 建议迁移到 Navigation 组件"
        )
    return issues


def main():
    parser = argparse.ArgumentParser(description='HarmonyOS Demo ETS 颜色自动修复')
    parser.add_argument('--target', required=True, help='entry/src/main/ets 目录路径')
    parser.add_argument('--dry-run', action='store_true', help='仅检测不写入')
    args = parser.parse_args()
    sys.stdout.reconfigure(encoding='utf-8')

    target = Path(args.target)
    if not target.exists():
        print(f"ERROR: 目标目录不存在: {target}")
        sys.exit(1)

    ets_files = sorted(f for f in target.rglob('*.ets') if not should_skip(f))
    if not ets_files:
        print(f"INFO: 目标目录无 .ets 文件: {target}")
        sys.exit(0)

    total_fixed = 0
    files_modified = 0
    all_warnings: Dict[str, List[str]] = {}

    for fpath in ets_files:
        rel = fpath.relative_to(target) if fpath.is_relative_to(target) else fpath.name
        try:
            fixes, warnings = fix_file(str(fpath), args.dry_run)
            if fixes > 0:
                total_fixed += fixes
                files_modified += 1
                print(f"FIXED: {rel} ({fixes} 处)")
            if warnings:
                all_warnings[str(rel)] = warnings
                for w in warnings:
                    print(f"  {w}")
        except Exception as e:
            print(f"ERROR: {rel} - {e}")

    print(f"\n{'[DRY-RUN] ' if args.dry_run else ''}总计: {files_modified} 文件, {total_fixed} 处已修复")

    if all_warnings:
        print(f"\n[!]  不可自动修复的告警项 ({sum(len(v) for v in all_warnings.values())} 项):")
        for f, ws in all_warnings.items():
            for w in ws:
                print(f"  {f}: {w}")
        print("\n请手动修复以上告警项后重新运行本脚本验证。")

    if all_warnings:
        if not args.dry_run:
            sys.exit(2)  # 有告警项（dry-run 模式不阻断流水线）
    sys.exit(0)


if __name__ == '__main__':
    main()
