#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
dfx_dart.py — Flutter DFX Dart 层扫描工具

扫描 lib/**/*.dart，检测 DFX 质量问题。覆盖：
  - 1:   Platform.isOhos 使用风险（仅检测 + 建议，不外修复）
  - 2:   AnimationController 未 dispose()
  - 3:   StreamController 未 close()
  - 4:   addListener + setState 反模式
  - 5:   ListView / GridView 未用 builder 构造函数
  - 6:   大图未用 ResizeImage 或 cacheWidth/cacheHeight
  - 7:   ListView.builder 缺 addAutomaticKeepAlives: false
  - 8:   AnimationController 在 deactivate 中未 stop
  - 9:   Timer / StreamSubscription 未取消
  - 10:  aboutToDisappear 未释放引用
  - 11:  print() 仍在使用（自动替换 → debugPrint）
  - 12:  TextStyle 使用 Colors.black/white 极端色（仅检测，需人工裁定修复方式）

用法:
    python dfx_dart.py --target <lib_dir>
    python dfx_dart.py --target <lib_dir> --target <example_lib_dir> --dry-run
"""

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Tuple

from dfx_common import strip_comments_strings, strip_line_comment, should_skip


# ── 正则模式 ───────────────────────────────────────────────────────────

# 1: Platform.isOhos 使用
RE_PLATFORM_IS_OHOS = re.compile(r'\bPlatform\.isOhos\b')

# 2: AnimationController dispose
RE_ANIMATION_CONTROLLER_VAR = re.compile(r'(?:\w+\s+)*?AnimationController[?]?\s+(\w+)')
RE_DISPOSE_CALL = re.compile(r'\b(\w+)\.dispose\(\)')

# 3: StreamController close
RE_STREAM_CONTROLLER_VAR = re.compile(r'StreamController(?:<[\w, ]+(?:<[\w, ]+>)?[\w, ]*>)?\s+(\w+)')
RE_CLOSE_CALL = re.compile(r'\b(\w+)\.close\(\)')

# 4: addListener + setState 反模式
RE_ADDLISTENER_SETSTATE = re.compile(
    r'addListener\s*\([\s\S]*?setState\s*\(\s*\)\s*\)'
)

# 5: ListView / GridView 未用 builder
RE_LISTVIEW_DIRECT = re.compile(r'(?:ListView|GridView)\s*\(\s*children\s*:')
RE_LISTVIEW_BUILDER = re.compile(r'(?:ListView|GridView)\.builder\s*\(')

# 6: Image 未用 ResizeImage 或 cacheWidth/cacheHeight
RE_IMAGE_FILE = re.compile(r'Image\s*\(\s*[\'\"](?:\.\/|\.\.\/|[a-zA-Z])')
RE_RESIZE_IMAGE = re.compile(r'ResizeImage')
RE_IMAGE_NETWORK = re.compile(r'Image\.network\s*\(')
RE_IMAGE_ASSET = re.compile(r'Image\.asset\s*\(')
RE_CACHE_DIMENSION = re.compile(r'\.cacheWidth\s*\(|\.cacheHeight\s*\(|\bcacheWidth\s*:|\bcacheHeight\s*:')

# 7: ListView.builder 缺 addAutomaticKeepAlives
RE_LISTVIEW_BUILDER_CALL = re.compile(r'(?:ListView|GridView)\.builder\s*\(')
RE_KEEP_ALIVES_FALSE = re.compile(r'addAutomaticKeepAlives\s*:\s*false')

# 8: AnimationController 在 deactivate 中未 stop
RE_DEACTIVATE = re.compile(r'@override\s*\n\s*void\s+deactivate\s*\(')
RE_STOP_CALL = re.compile(r'\.stop\(\)')

# 9: Timer / StreamSubscription 未取消
RE_TIMER_CREATE = re.compile(r'\bTimer\s*\(')
RE_STREAM_SUBSCRIBE = re.compile(r'\.listen\s*\(')
RE_CANCEL_CALL = re.compile(r'\.cancel\s*\(')

# 10: 生命周期配对检测
RE_FLUTTER_ENTRY_APPEAR = re.compile(r'\w+\??\.aboutToAppear\s*\(')
RE_FLUTTER_ENTRY_DISAPPEAR = re.compile(r'\w+\??\.aboutToDisappear\s*\(')
RE_FLUTTER_VIEW_ONSHOW = re.compile(r'onPageShow\s*\(')
RE_FLUTTER_VIEW_ONHIDE = re.compile(r'onPageHide\s*\(')

# 11: print() → debugPrint() 替换
RE_PRINT = re.compile(r'(?<![\w.])print\s*\(')

# 12: TextStyle 极端色（Colors.black / Colors.white）
# [^()]* 匹配 TextStyle( 内部到 color 为止的字符（含换行，不跨嵌套括号）
RE_TEXTSTYLE_EXTREME_COLOR = re.compile(
    r'TextStyle\s*\([^()]*color\s*:\s*Colors\.(black|white)\b'
)


def detect_platform_is_ohos(content: str, filename: str) -> List[str]:
    issues = []
    for m in RE_PLATFORM_IS_OHOS.finditer(content):
        line_num = content[:m.start()].count('\n') + 1
        issues.append(
            f"Platform.isOhos [行 {line_num}] — "
            "在依赖服务器引擎产物时可能导致 flutter run/build har 失败，"
            "建议改用 defaultTargetPlatform == TargetPlatform.ohos。"
            "（正常开发环境下 Platform.isOhos 已原生支持）"
        )
    return issues


def detect_unmatched_dispose(content: str, filename: str) -> List[str]:
    """检测 AnimationController 变量是否都被 dispose()"""
    issues = []
    ac_vars = set()
    for m in RE_ANIMATION_CONTROLLER_VAR.finditer(content):
        ac_vars.add(m.group(1))
    disposed = set()
    for m in RE_DISPOSE_CALL.finditer(content):
        disposed.add(m.group(1))
    unmatched = ac_vars - disposed
    for var in sorted(unmatched):
        issues.append(
            f"AnimationController '{var}' 未调用 .dispose() — 可能造成内存泄漏"
        )
    return issues


def detect_unmatched_close(content: str, filename: str) -> List[str]:
    issues = []
    sc_vars = set()
    for m in RE_STREAM_CONTROLLER_VAR.finditer(content):
        sc_vars.add(m.group(1))
    closed = set()
    for m in RE_CLOSE_CALL.finditer(content):
        closed.add(m.group(1))
    unmatched = sc_vars - closed
    for var in sorted(unmatched):
        issues.append(
            f"StreamController '{var}' 未调用 .close() — 可能造成流泄漏"
        )
    return issues


def detect_addlistener_setstate(content: str, filename: str) -> List[str]:
    issues = []
    for m in RE_ADDLISTENER_SETSTATE.finditer(content):
        line_num = content[:m.start()].count('\n') + 1
        issues.append(
            f"addListener 中含空 setState [行 {line_num}] — "
            "建议在回调中处理实际逻辑，移除不必要的 setState"
        )
    return issues


def detect_missing_builder(content: str, filename: str) -> List[str]:
    issues = []
    if RE_LISTVIEW_DIRECT.search(content) and not RE_LISTVIEW_BUILDER.search(content):
        issues.append(
            f"使用了 ListView/GridView 非 builder 构造函数 — "
            "应改用 .builder() 避免一次性渲染所有子项"
        )
    return issues


def detect_missing_resize_image(content: str, filename: str) -> List[str]:
    """检测 Image.file/network/asset 是否使用了 ResizeImage 或 cacheWidth/cacheHeight"""
    issues = []
    lines = content.split('\n')
    has_any_resize = bool(RE_RESIZE_IMAGE.search(content))
    has_any_cache = bool(RE_CACHE_DIMENSION.search(content))

    # 收集所有 Image 调用的行号
    image_lines: List[Tuple[int, str]] = []
    for i, line in enumerate(lines):
        if RE_IMAGE_NETWORK.search(line) or RE_IMAGE_ASSET.search(line) or RE_IMAGE_FILE.search(line):
            image_lines.append((i, line.strip()))

    if not image_lines:
        return issues

    # 如果文件中完全没有 ResizeImage 和 cacheWidth/cacheHeight，每个 Image 都告警
    if not has_any_resize and not has_any_cache:
        for idx, line_text in image_lines:
            issues.append(
                f"Image [行 {idx + 1}] 未配合 ResizeImage 或 cacheWidth/cacheHeight — "
                "大图建议用 ResizeImage 指定目标尺寸或添加 cacheWidth/cacheHeight 以减少内存"
            )
        return issues

    # 文件中有 ResizeImage 或 cacheWidth/cacheHeight，逐个检查
    for idx, line_text in image_lines:
        # 检查当前行是否被 ResizeImage( 包裹（向上查找 2 行）
        wrapped = False
        for j in range(max(0, idx - 2), idx):
            if RE_RESIZE_IMAGE.search(lines[j]):
                wrapped = True
                break

        # 检查当前行及向下 5 行是否有 .cacheWidth( 或 .cacheHeight(
        has_cache = False
        for j in range(idx, min(len(lines), idx + 6)):
            if RE_CACHE_DIMENSION.search(lines[j]):
                has_cache = True
                break

        if not wrapped and not has_cache:
            issues.append(
                f"Image [行 {idx + 1}] 未配合 ResizeImage 或 cacheWidth/cacheHeight — "
                "大图建议用 ResizeImage 指定目标尺寸或添加 cacheWidth/cacheHeight 以减少内存"
            )

    return issues


def detect_and_fix_keep_alives(content: str, dry_run: bool, filename: str) -> Tuple[str, int, List[str]]:
    fixes = 0
    issues = []
    matches = list(RE_LISTVIEW_BUILDER_CALL.finditer(content))
    if not matches:
        return content, 0, issues
    stripped = strip_comments_strings(content)
    if RE_KEEP_ALIVES_FALSE.search(stripped):
        return content, 0, issues
    issues.append(
            f"ListView.builder 缺 addAutomaticKeepAlives: false — "
            "建议添加以减少内存占用"
    )
    if not dry_run:
        result = list(content)
        for m in reversed(matches):
            insert_pos = m.end()
            result[insert_pos:insert_pos] = '\n    addAutomaticKeepAlives: false,'
        content = ''.join(result)
        fixes = len(matches)
    return content, fixes, issues


def detect_missing_stop_in_deactivate(content: str, filename: str) -> List[str]:
    issues = []
    segments = RE_DEACTIVATE.split(content)
    if len(segments) > 1:
        for seg in segments[1:]:
            close_brace = _find_matching_brace(seg)
            if close_brace > 0:
                deactivate_body = seg[:close_brace]
                if not RE_STOP_CALL.search(deactivate_body):
                    if RE_ANIMATION_CONTROLLER_VAR.search(deactivate_body):
                        issues.append(
                            f"deactivate 中未调用 AnimationController.stop() — "
                            "应在 deactivate 中停止动画以避免后台资源占用"
                        )
    return issues


def detect_timer_subscription_leak(content: str, filename: str) -> List[str]:
    issues = []
    if RE_TIMER_CREATE.search(content) or RE_STREAM_SUBSCRIBE.search(content):
        if not RE_CANCEL_CALL.search(content):
            issues.append(
                f"检测到 Timer 或 StreamSubscription 但未找到 .cancel() 调用 — "
                "资源未取消可能导致后台持续运行"
            )
    return issues


def detect_lifecycle_pairing_in_dart(content: str, filename: str) -> List[str]:
    """检测 Dart 侧 FlutterEntry/Page 生命周期方法是否配对"""
    issues = []
    if RE_FLUTTER_ENTRY_APPEAR.search(content) and not RE_FLUTTER_ENTRY_DISAPPEAR.search(content):
        issues.append(
            "WARNING: 检测到 flutterEntry.aboutToAppear() 但未找到 "
            "flutterEntry.aboutToDisappear() — 生命周期未配对应修复"
        )
    if RE_FLUTTER_VIEW_ONSHOW.search(content) and not RE_FLUTTER_VIEW_ONHIDE.search(content):
        issues.append(
            "WARNING: 检测到 onPageShow() 但未找到 onPageHide() — "
            "生命周期未配对应修复"
        )
    return issues


def detect_and_fix_print(content: str, dry_run: bool, filename: str, is_flutter_project: bool = True) -> Tuple[str, int, List[str]]:
    issues = []
    fixes = 0
    matches = list(RE_PRINT.finditer(content))
    for m in matches:
        line_num = content[:m.start()].count('\n') + 1
        if is_flutter_project:
            issues.append(
                f"print() [行 {line_num}] — "
                "生产代码不建议使用 print，应改用 debugPrint 避免日志冲刷"
            )
            if not dry_run:
                fixes += 1
        else:
            issues.append(
                f"print() [行 {line_num}] — "
                "纯 Dart 包可使用 print，无需替换"
            )
    if fixes > 0 and not dry_run:
        result = list(content)
        for m in reversed(matches):
            result[m.start():m.end()] = 'debugPrint('
        content = ''.join(result)
    return content, fixes, issues


def detect_textstyle_extreme_color(content: str, filename: str) -> List[str]:
    """检测 TextStyle 中使用 Colors.black/white 极端色（深色模式下可能不可见）"""
    issues = []
    stripped = strip_comments_strings(content)
    for m in RE_TEXTSTYLE_EXTREME_COLOR.finditer(stripped):
        line_num = content[:m.start()].count('\n') + 1
        color = m.group(1)
        issues.append(
            f"TextStyle 使用极端色 Colors.{color} [行 {line_num}] — "
            "深色/浅色模式下可能与背景形成低对比度，建议改用主题色 "
            "(如 Theme.of(context).textTheme.bodyLarge?.color) 或添加显式 backgroundColor"
        )
    return issues


def _find_matching_brace(s: str) -> int:
    depth = 0
    for i, ch in enumerate(s):
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                return i + 1
    return -1


def process_file(filepath: str, dry_run: bool = False, is_flutter_project: bool = True) -> Tuple[int, List[str]]:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    issues: List[str] = []
    total_fixes = 0

    # 检测规则
    issues.extend(detect_platform_is_ohos(content, filepath))
    issues.extend(detect_unmatched_dispose(content, filepath))
    issues.extend(detect_unmatched_close(content, filepath))
    issues.extend(detect_addlistener_setstate(content, filepath))
    issues.extend(detect_missing_builder(content, filepath))
    issues.extend(detect_missing_resize_image(content, filepath))
    issues.extend(detect_missing_stop_in_deactivate(content, filepath))
    issues.extend(detect_timer_subscription_leak(content, filepath))
    issues.extend(detect_lifecycle_pairing_in_dart(content, filepath))
    issues.extend(detect_textstyle_extreme_color(content, filepath))

    # 可自动修复的规则
    content, fixes_p4, p4_issues = detect_and_fix_keep_alives(content, dry_run, filepath)
    total_fixes += fixes_p4
    issues.extend(p4_issues)

    content, fixes_u3, u3_issues = detect_and_fix_print(content, dry_run, filepath, is_flutter_project)
    total_fixes += fixes_u3
    issues.extend(u3_issues)

    if total_fixes > 0 and not dry_run:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

    return total_fixes, issues


def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    parser = argparse.ArgumentParser(description='Flutter DFX Dart 层自动检测与修复')
    parser.add_argument('--target', action='append', required=True, help='lib 目录路径（可多次指定扫描多个目录）')
    parser.add_argument('--dry-run', action='store_true', help='仅检测不写入')
    parser.add_argument('--json', action='store_true', help='输出 JSON 格式结果')
    args = parser.parse_args()

    total_fixed = 0
    files_modified = 0
    all_warnings: Dict[str, List[str]] = {}
    total_files_scanned = 0

    for target_str in args.target:
        target = Path(target_str)
        if not target.exists():
            if args.json:
                print(json.dumps({"error": f"目标目录不存在: {target}"}, ensure_ascii=False))
            else:
                print(f"ERROR: 目标目录不存在: {target}")
            sys.exit(1)

        # 检测是否为 Flutter 项目（通过 pubspec.yaml 判断）
        is_flutter_project = True
        pubspec_path = target.parent / 'pubspec.yaml'
        if pubspec_path.exists():
            try:
                with open(pubspec_path, 'r', encoding='utf-8') as f:
                    pubspec_content = f.read()
                if 'flutter:' not in pubspec_content and 'dependencies:' not in pubspec_content:
                    is_flutter_project = False
            except Exception:
                pass

        dart_files = [f for f in target.rglob('*.dart') if not should_skip(f)]
        if not dart_files:
            if not args.json:
                print(f"INFO: 目标目录无 .dart 文件: {target}")
            continue

        total_files_scanned += len(dart_files)

        for fpath in sorted(dart_files):
            rel = fpath.relative_to(target) if fpath.is_relative_to(target) else fpath.name
            # 多目录扫描时加上目录名前缀避免文件名冲突
            if len(args.target) > 1:
                rel = Path(target_str).name + '/' + str(rel)
            try:
                fixes, warnings = process_file(str(fpath), args.dry_run, is_flutter_project)
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

    if total_files_scanned == 0:
        if args.json:
            print(json.dumps({"files_scanned": 0, "files_modified": 0, "total_fixed": 0, "warnings": {}}, ensure_ascii=False))
        else:
            print("INFO: 所有目标目录均无 .dart 文件")
        sys.exit(0)

    if args.json:
        result = {
            "files_scanned": total_files_scanned,
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

    if all_warnings:
        sys.exit(2)
    sys.exit(0)


if __name__ == '__main__':
    main()
