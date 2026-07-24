#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix_dart.py — Flutter DFX Dart 层扫描工具

扫描 lib/**/*.dart，检测 DFX 质量问题。覆盖：
  - 1:   Platform.isOhos 使用风险（仅检测 + 建议，不外修复）
  - 2:   AnimationController 未 dispose()
  - 3:   StreamController 未 close()
  - 4:   addListener + setState 反模式
  - 5:   ListView / GridView 未用 builder 构造函数
  - 6:   大图未用 ResizeImage
  - 7:   ListView.builder 缺 addAutomaticKeepAlives: false
  - 8:   AnimationController 在 deactivate 中未 stop
  - 9:   Timer / StreamSubscription 未取消
  - 10:  aboutToDisappear 未释放引用
  - 11:  print() 仍在使用（自动替换 → debugPrint）

用法:
    python fix_dart.py --target <lib_dir>
    python fix_dart.py --target <lib_dir> --dry-run
"""

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Tuple


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

# 6: Image 未用 ResizeImage
RE_IMAGE_FILE = re.compile(r'Image\s*\(\s*[\'\"](?:\.\/|\.\.\/|[a-zA-Z])')
RE_RESIZE_IMAGE = re.compile(r'ResizeImage')
RE_IMAGE_NETWORK = re.compile(r'Image\.network\s*\(')
RE_IMAGE_ASSET = re.compile(r'Image\.asset\s*\(')

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
RE_PRINT = re.compile(r'\bprint\s*\(')


def detect_platform_is_ohos(content: str, filename: str) -> List[str]:
    issues = []
    for m in RE_PLATFORM_IS_OHOS.finditer(content):
        line_num = content[:m.start()].count('\n') + 1
        issues.append(
            f"[1] WARNING: Platform.isOhos [行 {line_num}] — "
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
            f"[2] WARNING: AnimationController '{var}' 未调用 .dispose() — 可能造成内存泄漏"
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
            f"[3] WARNING: StreamController '{var}' 未调用 .close() — 可能造成流泄漏"
        )
    return issues


def detect_addlistener_setstate(content: str, filename: str) -> List[str]:
    issues = []
    for m in RE_ADDLISTENER_SETSTATE.finditer(content):
        line_num = content[:m.start()].count('\n') + 1
        issues.append(
            f"[4] WARNING: addListener 中含空 setState [行 {line_num}] — "
            "建议在回调中处理实际逻辑，移除不必要的 setState"
        )
    return issues


def detect_missing_builder(content: str, filename: str) -> List[str]:
    issues = []
    if RE_LISTVIEW_DIRECT.search(content) and not RE_LISTVIEW_BUILDER.search(content):
        issues.append(
            f"[5] WARNING: 使用了 ListView/GridView 非 builder 构造函数 — "
            "应改用 .builder() 避免一次性渲染所有子项"
        )
    return issues


def detect_missing_resize_image(content: str, filename: str) -> List[str]:
    issues = []
    if (RE_IMAGE_FILE.search(content) or RE_IMAGE_NETWORK.search(content) or RE_IMAGE_ASSET.search(content)):
        if not RE_RESIZE_IMAGE.search(content):
            issues.append(
                f"[6] WARNING: 使用了 Image.file/network/asset 但未配合 ResizeImage — "
                "大图建议用 ResizeImage 指定目标尺寸以减少内存"
            )
    return issues


def detect_and_fix_keep_alives(content: str, dry_run: bool, filename: str) -> Tuple[str, int, List[str]]:
    fixes = 0
    issues = []
    if not RE_LISTVIEW_BUILDER_CALL.search(content):
        return content, 0, issues
    if RE_KEEP_ALIVES_FALSE.search(content):
        return content, 0, issues
    issues.append(
        f"[7] WARNING: ListView.builder 缺 addAutomaticKeepAlives: false — "
        "建议添加以减少内存占用"
    )
    if not dry_run:
        if 'ListView.builder(' in content:
            content = content.replace(
                'ListView.builder(',
                'ListView.builder(\n    addAutomaticKeepAlives: false,'
            )
        if 'GridView.builder(' in content:
            content = content.replace(
                'GridView.builder(',
                'GridView.builder(\n    addAutomaticKeepAlives: false,'
            )
        fixes = 1
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
                            f"[8] WARNING: deactivate 中未调用 AnimationController.stop() — "
                            "应在 deactivate 中停止动画以避免后台资源占用"
                        )
    return issues


def detect_timer_subscription_leak(content: str, filename: str) -> List[str]:
    issues = []
    if RE_TIMER_CREATE.search(content) or RE_STREAM_SUBSCRIBE.search(content):
        if not RE_CANCEL_CALL.search(content):
            issues.append(
                f"[9] WARNING: 检测到 Timer 或 StreamSubscription 但未找到 .cancel() 调用 — "
                "资源未取消可能导致后台持续运行"
            )
    return issues


def detect_lifecycle_pairing_in_dart(content: str, filename: str) -> List[str]:
    """检测 Dart 侧 FlutterEntry/Page 生命周期方法是否配对"""
    issues = []
    if RE_FLUTTER_ENTRY_APPEAR.search(content) and not RE_FLUTTER_ENTRY_DISAPPEAR.search(content):
        issues.append(
            "[10] WARNING: 检测到 flutterEntry.aboutToAppear() 但未找到 "
            "flutterEntry.aboutToDisappear() — 生命周期未配对应修复"
        )
    if RE_FLUTTER_VIEW_ONSHOW.search(content) and not RE_FLUTTER_VIEW_ONHIDE.search(content):
        issues.append(
            "[10] WARNING: 检测到 onPageShow() 但未找到 onPageHide() — "
            "生命周期未配对应修复"
        )
    return issues


def detect_and_fix_print(content: str, dry_run: bool, filename: str, is_flutter_project: bool = True) -> Tuple[str, int, List[str]]:
    issues = []
    fixes = 0
    for m in RE_PRINT.finditer(content):
        line_num = content[:m.start()].count('\n') + 1
        if is_flutter_project:
            issues.append(
                f"[11] WARNING: print() [行 {line_num}] — "
                "生产代码不建议使用 print，应改用 debugPrint 避免日志冲刷"
            )
            if not dry_run:
                fixes += 1
        else:
            issues.append(
                f"[11] INFO: print() [行 {line_num}] — "
                "纯 Dart 包可使用 print，无需替换"
            )
    if fixes > 0:
        content = RE_PRINT.sub('debugPrint', content)
    return content, fixes, issues


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
    parser = argparse.ArgumentParser(description='Flutter DFX Dart 层自动检测与修复')
    parser.add_argument('--target', required=True, help='lib 目录路径')
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

    dart_files = list(target.rglob('*.dart'))
    if not dart_files:
        if args.json:
            print(json.dumps({"files_scanned": 0, "files_modified": 0, "total_fixed": 0, "warnings": {}}, ensure_ascii=False))
        else:
            print(f"INFO: 目标目录无 .dart 文件: {target}")
        sys.exit(0)

    total_fixed = 0
    files_modified = 0
    all_warnings: Dict[str, List[str]] = {}

    for fpath in sorted(dart_files):
        rel = fpath.relative_to(target) if fpath.is_relative_to(target) else fpath.name
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

    if args.json:
        result = {
            "files_scanned": len(dart_files),
            "files_modified": files_modified,
            "total_fixed": total_fixed,
            "warnings": all_warnings,
            "dry_run": args.dry_run,
        }
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(f"\n{'[DRY-RUN] ' if args.dry_run else ''}总计: {files_modified} 文件, {total_fixed} 处已修复")

        if all_warnings:
            print(f"\n⚠  不可自动修复的告警项 ({sum(len(v) for v in all_warnings.values())} 项):")
            for f, ws in all_warnings.items():
                for w in ws:
                    print(f"  {f}: {w}")
            print("\n请手动修复以上告警项后重新运行本脚本验证。")

    if all_warnings:
        sys.exit(2)
    sys.exit(0)


if __name__ == '__main__':
    main()
