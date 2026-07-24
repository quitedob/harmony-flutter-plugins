#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
dfx_ets.py — Flutter DFX ETS 层扫描工具

扫描 ohos/<plugin>/src/main/ets/**/*.ets，检测 DFX 质量问题。覆盖：
  - 1:   PlatformView 构造器注册了资源但 dispose() 为空
  - 2:   onAttachedToEngine 注册了资源但 onDetachedFromEngine 为空
  - 3:   TextureRegistry 注册后未 unregisterTexture
  - 4:   FlutterEntry 生命周期未配对
  - 5:   EngineBindings.detach 未调用（多引擎场景）
  - 6:   console.log / console.debug / console.info 仍在使用（自动移除）

用法:
    python dfx_ets.py --target <ets_dir>
    python dfx_ets.py --target <ets_dir> --dry-run
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path
from typing import Dict, List, Tuple

from dfx_common import strip_comments_strings, should_skip


# ── 正则模式 ───────────────────────────────────────────────────────────

# 1: PlatformView 构造器 / dispose
RE_PLATFORM_VIEW_CLASS = re.compile(r'class\s+(\w+)\s+extends\s+PlatformView')
RE_CONSTRUCTOR = re.compile(r'constructor\s*\(')
RE_DISPOSE_METHOD = re.compile(r'dispose\s*\(\s*\)\s*\{')
RE_EMPTY_DISPOSE = re.compile(r'dispose\s*\(\s*\)\s*\{\s*\}')
RE_RESOURCE_IN_CONSTRUCTOR = re.compile(
    r'new\s+(MethodChannel|EventChannel|BasicMessageChannel)\s*\('
    r'|TextureRegistry'
    r'|registerTexture'
)

# 2: FlutterPlugin onAttachedToEngine / onDetachedFromEngine
RE_FLUTTER_PLUGIN_CLASS = re.compile(r'class\s+(\w+)\s+implements\s+FlutterPlugin')
RE_ATTACHED_METHOD = re.compile(r'onAttachedToEngine\s*\(')
RE_DETACHED_METHOD = re.compile(r'onDetachedFromEngine\s*\(')
RE_EMPTY_DETACHED = re.compile(r'onDetachedFromEngine\s*\([^)]*\)\s*\{\s*\}')
RE_RESOURCE_IN_ATTACHED = re.compile(
    r'MethodChannel|EventChannel|BasicMessageChannel'
    r'|registerViewFactory'
    r'|TextureRegistry'
    r'|registerTexture'
    r'|setMethodCallHandler'
    r'|setStreamHandler'
    r'|getBinaryMessenger'
)

# 3: TextureRegistry register / unregister
RE_REGISTER_TEXTURE = re.compile(r'registerTexture\s*\(')
RE_UNREGISTER_TEXTURE = re.compile(r'unregisterTexture\s*\(')

# 4: FlutterEntry / FlutterView 生命周期配对
RE_ABOUT_TO_APPEAR = re.compile(r'\baboutToAppear\s*\(')
RE_ABOUT_TO_DISAPPEAR_ETS = re.compile(r'\baboutToDisappear\s*\(')
RE_ON_PAGE_SHOW = re.compile(r'\bonPageShow\s*\(')
RE_ON_PAGE_HIDE = re.compile(r'\bonPageHide\s*\(')
RE_FLUTTER_ABILITY = re.compile(r'FlutterAbility')
RE_FLUTTER_ENTRY = re.compile(r'FlutterEntry')
RE_FLUTTER_PAGE = re.compile(r'FlutterPage')

# 5: EngineBindings.detach 未调用
RE_ENGINE_BINDINGS = re.compile(r'EngineBindings')
RE_ATTACH_CALL = re.compile(r'\.attach\s*\(')
RE_DETACH_CALL = re.compile(r'\.detach\s*\(')
RE_ENGINE_DESTROY = re.compile(r'engine\??\.destroy\s*\(')

# 6: console.log / debug / info
RE_CONSOLE_LOG = re.compile(r'console\.(log|debug|info)\s*\(')
RE_CONSOLE_LOG_FULL = re.compile(r'console\.(?:log|debug|info)\s*\([^)]*\)')


def detect_empty_dispose_with_resources(content: str, filename: str) -> List[str]:
    """检测 PlatformView 子类：dispose() 为空但构造器注册了资源"""
    issues = []
    classes = list(RE_PLATFORM_VIEW_CLASS.finditer(content))
    if not classes:
        return issues
    for cls_match in classes:
        class_start = cls_match.start()
        class_end = _find_class_end(content, class_start)
        class_body = content[class_start:class_end]
        if not RE_RESOURCE_IN_CONSTRUCTOR.search(class_body):
            continue
        if RE_EMPTY_DISPOSE.search(class_body):
            issues.append(
                f"PlatformView '{cls_match.group(1)}' 构造器中注册了 "
                f"MethodChannel/Texture 等资源，但 dispose() 为空 — 应释放注册的资源"
            )
    return issues


def detect_empty_detached_with_resources(content: str, filename: str) -> List[str]:
    """按类检测 FlutterPlugin 子类：onAttachedToEngine 注册了资源但 onDetachedFromEngine 为空"""
    issues = []
    for cls_match in RE_FLUTTER_PLUGIN_CLASS.finditer(content):
        class_body = content[cls_match.start():_find_class_end(content, cls_match.start())]
        if not RE_ATTACHED_METHOD.search(class_body):
            continue
        if not RE_RESOURCE_IN_ATTACHED.search(class_body):
            continue
        if RE_EMPTY_DETACHED.search(class_body):
            cls_name = cls_match.group(1)
            issues.append(
                f"FlutterPlugin '{cls_name}' onAttachedToEngine 中注册了 "
                f"Channel/ViewFactory 等资源，但 onDetachedFromEngine 为空 — "
                "应在 detach 中调用 channel.setMethodCallHandler(null)"
            )
    return issues


def detect_unmatched_texture(content: str, filename: str) -> List[str]:
    issues = []
    if RE_REGISTER_TEXTURE.search(content) and not RE_UNREGISTER_TEXTURE.search(content):
        issues.append(
            "检测到 registerTexture() 但未找到 unregisterTexture() — "
            "纹理未注销可能导致内存泄漏"
        )
    return issues


def detect_lifecycle_pairing(content: str, filename: str) -> List[str]:
    """检测 FlutterEntry/FlutterPage 生命周期配对"""
    issues = []
    has_flutter = (RE_FLUTTER_ABILITY.search(content) or
                   RE_FLUTTER_ENTRY.search(content) or
                   RE_FLUTTER_PAGE.search(content))
    if not has_flutter:
        return issues
    if RE_ABOUT_TO_APPEAR.search(content) and not RE_ABOUT_TO_DISAPPEAR_ETS.search(content):
        issues.append(
            "检测到 aboutToAppear() 但未找到 aboutToDisappear() — "
            "生命周期未配对应修复"
        )
    if RE_ON_PAGE_SHOW.search(content) and not RE_ON_PAGE_HIDE.search(content):
        issues.append(
            "检测到 onPageShow() 但未找到 onPageHide() — "
            "生命周期未配对应修复"
        )
    return issues


def detect_missing_engine_detach(content: str, filename: str) -> List[str]:
    """检测 EngineBindings 在使用 .attach() 后未调用 .detach()"""
    issues = []
    if not RE_ENGINE_BINDINGS.search(content):
        return issues
    if RE_ATTACH_CALL.search(content):
        has_detach = RE_DETACH_CALL.search(content) or RE_ENGINE_DESTROY.search(content)
        if not has_detach:
            issues.append(
                "EngineBindings 调用了 .attach() 但未找到 .detach() 或 .destroy() — "
                "多引擎场景中应确保资源清理"
            )
    return issues


def _find_console_call_end(content: str, start: int) -> int:
    """从 console.( 起始位置找到匹配的右括号位置（含），考虑字符串和嵌套。"""
    depth = 0
    in_string = False
    string_char = ''
    in_template = False
    template_depth = 0
    escaped = False
    i = start
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
        if ch == '(':
            depth += 1
        elif ch == ')':
            depth -= 1
            if depth == 0:
                return i + 1
        i += 1
    return -1


def detect_and_fix_console_log(content: str, dry_run: bool, filename: str) -> Tuple[str, int, List[str]]:
    issues = []
    fixes = 0
    stripped = strip_comments_strings(content)
    spans_to_remove = []
    for m in RE_CONSOLE_LOG.finditer(stripped):
        line_num = content[:m.start()].count('\n') + 1
        issues.append(
            f"使用了 console.{m.group(1)} [行 {line_num}] — 生产代码中应移除或替换为 hilog"
        )
        if not dry_run:
            call_end = _find_console_call_end(content, m.end() - 1)
            if call_end > 0:
                fixes += 1
                spans_to_remove.append((m.start(), call_end))
            else:
                issues.append(
                    f"console.{m.group(1)} [行 {line_num}] 括号无法平衡，需手动移除"
                )
    if fixes > 0 and not dry_run:
        result = list(content)
        for start, end in reversed(spans_to_remove):
            del result[start:end]
        content = ''.join(result)
    return content, fixes, issues


def _find_class_end(content: str, class_start: int) -> int:
    depth = 0
    in_class = False
    for i in range(class_start, len(content)):
        ch = content[i]
        if ch == '{':
            depth += 1
            in_class = True
        elif ch == '}':
            depth -= 1
            if in_class and depth == 0:
                return i + 1
    return len(content)


def process_file(filepath: str, dry_run: bool = False) -> Tuple[int, List[str]]:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    issues: List[str] = []
    total_fixes = 0

    # 检测规则
    issues.extend(detect_empty_dispose_with_resources(content, filepath))
    issues.extend(detect_empty_detached_with_resources(content, filepath))
    issues.extend(detect_unmatched_texture(content, filepath))
    issues.extend(detect_lifecycle_pairing(content, filepath))
    issues.extend(detect_missing_engine_detach(content, filepath))

    # 可自动修复的规则
    content, fixes_d6, d6_issues = detect_and_fix_console_log(content, dry_run, filepath)
    total_fixes += fixes_d6
    issues.extend(d6_issues)

    if total_fixes > 0 and not dry_run:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

    return total_fixes, issues


def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    parser = argparse.ArgumentParser(description='Flutter DFX ETS 层自动检测与修复')
    parser.add_argument('--target', required=True, help='ohos/<plugin>/src/main/ets 目录路径')
    parser.add_argument('--dry-run', action='store_true', help='仅检测不写入')
    parser.add_argument('--json', action='store_true', help='输出 JSON 格式结果')
    args = parser.parse_args()

    target = Path(args.target)
    if not target.exists():
        if args.json:
            print(json.dumps({"error": f"目标目录不存在: {target}"}, ensure_ascii=False))
        else:
            print(f"ERROR: 目标目录不存在: {target}")
        sys.exit(1)

    ets_files = [f for f in target.rglob('*.ets') if not should_skip(f)]
    if not ets_files:
        if args.json:
            print(json.dumps({"files_scanned": 0, "files_modified": 0, "total_fixed": 0, "warnings": {}}, ensure_ascii=False))
        else:
            print(f"INFO: 目标目录无 .ets 文件: {target}")
        sys.exit(0)

    total_fixed = 0
    files_modified = 0
    all_warnings: Dict[str, List[str]] = {}

    for fpath in sorted(ets_files):
        rel = fpath.relative_to(target) if fpath.is_relative_to(target) else fpath.name
        try:
            fixes, warnings = process_file(str(fpath), args.dry_run)
            if fixes > 0:
                total_fixed += fixes
                files_modified += 1
                if not args.json:
                    print(f"FIXED: {rel} ({fixes} 处)")
            if warnings:
                all_warnings[str(rel)] = warnings
                if not args.json:
                    for w in warnings:
                        print(f"  {w}")
        except Exception as e:
            if not args.json:
                print(f"ERROR: {rel} — {e}")

    if args.json:
        result = {
            "files_scanned": len(ets_files),
            "files_modified": files_modified,
            "total_fixed": total_fixed,
            "warnings": all_warnings,
            "dry_run": args.dry_run,
        }
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(f"\n{'[DRY-RUN] ' if args.dry_run else ''}总计: {files_modified} 文件, {total_fixed} 处已修复")

        if all_warnings:
            print(f"\n不可自动修复的告警项 ({sum(len(v) for v in all_warnings.values())} 项):")
            for f, ws in all_warnings.items():
                for w in ws:
                    print(f"  {f}: {w}")
            print("\n请手动修复以上告警项后重新运行本脚本验证。")
        sys.exit(2)
    sys.exit(0)


if __name__ == '__main__':
    main()
