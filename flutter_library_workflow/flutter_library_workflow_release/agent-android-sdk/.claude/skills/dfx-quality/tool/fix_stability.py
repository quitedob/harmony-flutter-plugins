#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix_stability.py - HarmonyOS ETS 稳定性 + 兼容性静态检测工具

扫描 entry/src/main/ets/**/*.ets 中的状态装饰器使用模式、资源泄漏风险和 API Level 兼容性：
- 1-1: @Prop/@State/@Link/@Provide/@Consume 使用 Function 类型
- 2-1: @Link 本地初始化
- 3-1: @Prop @Watch 无默认值
- 8-1: 内存泄漏预防（大对象未在 aboutToDisappear 清理）
- 8-2: FD 泄漏预防（fs.openSync/fs.open 无 fs.close）
- 8-3: 线程泄漏预防（Worker/TaskPool 未 terminate/cancel）
- 10-1: 读取 compatibleSdkVersion
- 10-3: 高版本 API 缺少运行时版本守卫
- 10-5: compatibleSdkVersion 与代码能力不匹配

用法:
    python fix_stability.py --target <ets_dir_or_project_root>
    python fix_stability.py --target <ets_dir_or_project_root> --dry-run
    python fix_stability.py --target <ets_dir_or_project_root> --config <compat_patterns.json>
"""

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple


# ══════════════════════════════════════════════════════════════════════
#  稳定性检测（原 fix_stability.py）
# ══════════════════════════════════════════════════════════════════════

DECORATORS = ('State', 'Prop', 'Link', 'Provide', 'Consume')
RE_DECORATOR = re.compile(r'@(' + '|'.join(DECORATORS) + r')\b')


def check_function_type(lines: List[str], filename: str) -> List[str]:
    """1-1: V1 装饰器禁止 Function 类型"""
    issues = []
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if not RE_DECORATOR.search(stripped):
            continue
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue
        if re.search(r':\s*\(.*\)\s*=>', stripped):
            issues.append(f"1-1: {filename}:{i} - {RE_DECORATOR.search(stripped).group(0)} 禁止 Function 类型，V1 组件去掉装饰器用普通变量传递回调，V2 组件改用 @Event")
        elif re.search(r':\s*Function\b', stripped):
            issues.append(f"1-1: {filename}:{i} - {RE_DECORATOR.search(stripped).group(0)} 禁止 Function 类型，V1 组件去掉装饰器用普通变量传递回调，V2 组件改用 @Event")
    return issues


def check_link_local_init(lines: List[str], filename: str) -> List[str]:
    """2-1: @Link 禁止本地初始化"""
    issues = []
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if not re.search(r'@Link\b', stripped):
            continue
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue
        if re.search(r'@Link\s+\w+\s*=\s*(?!\$)', stripped):
            issues.append(f"2-1: {filename}:{i} - @Link 禁止本地初始化，请改为父组件传 $myValue")
    return issues


def check_prop_watch_default(lines: List[str], filename: str) -> List[str]:
    """3-1: @Prop @Watch 须有默认值"""
    issues = []
    in_prop_watch = False
    prop_watch_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()

        if re.match(r'@Prop\s+@Watch\s*\(', stripped):
            in_prop_watch = True
            prop_watch_line = i
            # 支持泛型（number[]）、联合类型（Type | null）、可选类型（Type?）
            if re.search(r'@Prop\s+@Watch\s*\([^)]*\)\s+\w+\s*:\s*[\w<>\[\]?|\s]+\s*=\s*', stripped):
                in_prop_watch = False
            elif ';' in stripped or '}' in stripped:
                issues.append(f"3-1: {filename}:{i} - @Prop @Watch 缺少默认值，请添加 = 0 / = false 等安全默认值")
                in_prop_watch = False
            continue

        if in_prop_watch:
            # 支持泛型（number[]）、联合类型（Type | null）、可选类型（Type?）
            if re.search(r'\w+\s*:\s*[\w<>\[\]?|\s]+\s*=\s*', stripped):
                in_prop_watch = False
            elif ';' in stripped or stripped.endswith(';'):
                issues.append(f"3-1: {filename}:{prop_watch_line} - @Prop @Watch 缺少默认值，请添加 = 0 / = false 等安全默认值")
                in_prop_watch = False
            elif re.match(r'@', stripped):
                issues.append(f"3-1: {filename}:{prop_watch_line} - @Prop @Watch 缺少默认值，请添加 = 0 / = false 等安全默认值")
                in_prop_watch = False

    return issues


def check_memory_leak(lines: List[str], filename: str) -> List[str]:
    """8-1: 内存泄漏预防 - @State 持有大数组未在 aboutToDisappear 清理"""
    issues = []
    has_large_array = False
    has_cleanup = False
    large_array_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue

        m = re.search(r'@State\s+\w+\s*:\s*\w+\s*=\s*new\s+Array\s*\(\s*(\d+)', stripped)
        if m:
            size = int(m.group(1))
            if size > 1000:
                has_large_array = True
                if large_array_line == 0:
                    large_array_line = i

        m = re.search(r'@State\s+\w+\s*:\s*\w+\[\]\s*=\s*\[.*\]', stripped)
        if m and len(stripped) > 200:
            has_large_array = True
            if large_array_line == 0:
                large_array_line = i

        # Check if we're inside aboutToDisappear or onPageHide
        in_lifecycle = False
        for j in range(i - 1, max(0, i - 20), -1):
            prev = lines[j].strip()
            if re.search(r'aboutToDisappear|onPageHide', prev):
                in_lifecycle = True
                break
            if re.search(r'^\s*(public|private|protected|export|@Entry|@Component|struct|class)\b', lines[j]):
                break

        if in_lifecycle and re.search(r'=\s*\[\]|\.close\s*\(|\.destroy\s*\(|\.release\s*\(|\.terminate\s*\(', stripped):
            has_cleanup = True

    if has_large_array and not has_cleanup:
        issues.append(
            f"8-1: {filename}:{large_array_line} - @State 持有大数组但未在 aboutToDisappear 中清理，"
            f"请添加 this.xxx = [] / = null"
        )

    return issues


def check_fd_leak(lines: List[str], filename: str) -> List[str]:
    """8-2: FD 泄漏预防 - fs.openSync/fs.open 无 fs.close"""
    issues = []
    open_count = 0
    close_count = 0
    open_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue

        if re.search(r'\b(?:fs|fileIo)\.openSync\s*\(|\b(?:fs|fileIo)\.open\s*\(', stripped):
            open_count += 1
            if open_line == 0:
                open_line = i

        if re.search(r'\b(?:fs|fileIo)\.close\s*\(', stripped):
            close_count += 1

    if open_count > close_count:
        issues.append(
            f"8-2: {filename}:{open_line} - {open_count} 次文件打开但仅 {close_count} 次关闭，"
            f"请确保每个 open/openSync 都有对应的 fileIo.close"
        )

    return issues


def check_thread_leak(lines: List[str], filename: str) -> List[str]:
    """8-3: 线程泄漏预防 - Worker/TaskPool 未 terminate/cancel"""
    issues = []
    worker_count = 0
    terminate_count = 0
    taskpool_count = 0
    cancel_count = 0
    worker_line = 0
    taskpool_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue

        if re.search(r'\bnew\s+worker\.(?:Worker|ThreadWorker)\s*\(', stripped):
            worker_count += 1
            if worker_line == 0:
                worker_line = i

        if re.search(r'\bworker\.terminate\s*\(|\bWorker\.terminate\s*\(|\.terminate\s*\(', stripped):
            terminate_count += 1

        if re.search(r'\btaskpool\.execute\s*\(', stripped):
            taskpool_count += 1
            if taskpool_line == 0:
                taskpool_line = i

        if re.search(r'\btaskpool\.cancel\s*\(', stripped):
            cancel_count += 1

    if worker_count > 0 and terminate_count == 0:
        issues.append(
            f"8-3: {filename}:{worker_line} - Worker 创建但未终止，"
            f"请在 aboutToDisappear 中调用 worker.terminate()"
        )

    if taskpool_count > 0 and cancel_count == 0:
        issues.append(
            f"8-3: {filename}:{taskpool_line} - taskpool.execute 但未 cancel，"
            f"请在 aboutToDisappear 中调用 taskpool.cancel()"
        )

    return issues


# ══════════════════════════════════════════════════════════════════════
#  兼容性检测（原 fix_compat.py）
# ══════════════════════════════════════════════════════════════════════

DEFAULT_HIGH_API_PATTERNS = {
    "PhotoSelectOptions": {
        "since": 10,
        "syscap": "SystemCapability.FileManagement.PhotoAccessHelper.Core",
        "desc": "image picker options"
    },
    "AVTranscoder": {
        "since": 12,
        "syscap": "SystemCapability.Multimedia.Media.AVTranscoder",
        "desc": "video transcoding"
    },
}

RE_CANIUSE = re.compile(r'canIUse\s*\(')
RE_DEVICE_INFO = re.compile(r'deviceInfo\.')
RE_VERSION_COMPARE = re.compile(r'apiLevel\s*[><=!]+|SDK_VERSION\s*[><=!]+|osFullName')


def parse_compatible_sdk_version(project_root: Path) -> Tuple[Optional[int], str]:
    """从 build-profile.json5 读取 compatibleSdkVersion"""
    candidates = [
        project_root / 'build-profile.json5',
        project_root / 'example' / 'ohos' / 'build-profile.json5',
        project_root / 'ohos' / 'build-profile.json5',
    ]
    for bp_path in candidates:
        if not bp_path.exists():
            continue
        content = bp_path.read_text(encoding='utf-8')
        content = re.sub(r'//.*$', '', content, flags=re.MULTILINE)
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        content = re.sub(r',(\s*[}\]])', r'\1', content)
        try:
            data = json.loads(content)
        except json.JSONDecodeError:
            continue
        products = data.get('app', {}).get('products', [])
        for prod in products:
            csv = prod.get('compatibleSdkVersion')
            if csv is None:
                continue
            if isinstance(csv, int):
                return csv, str(bp_path)
            m = re.search(r'\((\d+)\)', str(csv))
            if m:
                return int(m.group(1)), str(bp_path)
    return None, ''


def load_patterns(config_path: Optional[str] = None) -> Dict:
    """加载高版本 API 模式"""
    if config_path:
        cp = Path(config_path)
        if cp.exists():
            return json.loads(cp.read_text(encoding='utf-8'))
    return DEFAULT_HIGH_API_PATTERNS


def has_runtime_guard(lines: List[str], start_idx: int, window: int = 20) -> bool:
    """检查高版本 API 使用前是否有运行时版本守卫"""
    for j in range(max(0, start_idx - window), start_idx):
        line = lines[j].strip()
        if RE_CANIUSE.search(line) or RE_DEVICE_INFO.search(line) or RE_VERSION_COMPARE.search(line):
            return True
    return False


def check_high_api_usage(
    lines: List[str],
    filename: str,
    patterns: Dict,
    compat_level: Optional[int]
) -> List[str]:
    """10-3: 高版本 API 缺少运行时版本守卫"""
    issues = []
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue
        for keyword, info in patterns.items():
            if keyword not in stripped:
                continue
            if has_runtime_guard(lines, i - 1):
                continue
            since = info.get('since', '?')
            syscap = info.get('syscap', '')
            desc = info.get('desc', keyword)
            msg = f"10-3: {filename}:{i} - used {keyword}({desc}, @since {since})"
            if syscap:
                msg += f", missing canIUse('{syscap}') guard"
            else:
                msg += ", missing runtime version guard"
            if compat_level is not None and isinstance(since, int) and since > compat_level:
                msg += f" [above compatibleSdkVersion API {compat_level}]"
            issues.append(msg)
    return issues


def check_compat_mismatch(
    issues_d2: List[str],
    compat_level: Optional[int],
    bp_path: str
) -> List[str]:
    """10-5: compatibleSdkVersion 与代码能力不匹配"""
    if compat_level is None:
        return ["10-5: cannot read compatibleSdkVersion, check build-profile.json5"]
    mismatch_issues = []
    for issue in issues_d2:
        if f'above compatibleSdkVersion API {compat_level}]' in issue:
            mismatch_issues.append(
                f"10-5: {bp_path} - compatibleSdkVersion is API {compat_level}, "
                f"but code has unguarded high-version API calls. "
                f"Add runtime guards or raise compatibleSdkVersion"
            )
            break
    return mismatch_issues


def derive_project_root(target: Path) -> Path:
    """从 target 向上查找包含 app.products 的根级 build-profile.json5"""
    current = target.resolve()
    for _ in range(10):
        bp_path = current / 'build-profile.json5'
        if bp_path.exists():
            # 验证是否为根级配置（含 app.products），跳过模块级配置
            try:
                content = bp_path.read_text(encoding='utf-8')
                # 快速检查是否包含 app 和 products 关键字
                if '"app"' in content and '"products"' in content:
                    return current
            except Exception:
                pass
        parent = current.parent
        if parent == current:
            break
        current = parent
    return target


# ══════════════════════════════════════════════════════════════════════
#  统一扫描入口
# ══════════════════════════════════════════════════════════════════════

def scan_file(
    filepath: Path,
    patterns: Optional[Dict] = None,
    compat_level: Optional[int] = None
) -> Tuple[int, List[str]]:
    """扫描单个 .ets 文件，同时运行稳定性 + 兼容性检测"""
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    filename = filepath.name
    issues = []
    issues.extend(check_function_type(lines, filename))
    issues.extend(check_link_local_init(lines, filename))
    issues.extend(check_prop_watch_default(lines, filename))
    issues.extend(check_memory_leak(lines, filename))
    issues.extend(check_fd_leak(lines, filename))
    issues.extend(check_thread_leak(lines, filename))

    if patterns:
        issues.extend(check_high_api_usage(lines, filename, patterns, compat_level))

    return len(issues), issues


def main():
    parser = argparse.ArgumentParser(description='HarmonyOS ETS 稳定性 + 兼容性静态检测')
    parser.add_argument('--target', required=True, help='ets 目录或项目根目录')
    parser.add_argument('--dry-run', action='store_true', help='仅检测不返回非零退出码')
    parser.add_argument('--config', help='自定义高版本 API 模式配置文件（JSON）')
    args = parser.parse_args()

    target = Path(args.target)
    if not target.exists():
        print(f"ERROR: 目标目录不存在: {target}")
        sys.exit(1)

    # ── 兼容性初始化 ──
    root = derive_project_root(target)
    compat_level, bp_path = parse_compatible_sdk_version(root)
    if compat_level is not None:
        print(f"10-1: compatibleSdkVersion = API {compat_level} (from {bp_path})")
    else:
        print("10-1: WARNING: compatibleSdkVersion not found, pattern-only scan")

    patterns = load_patterns(args.config)
    print(f"10-3: loaded {len(patterns)} high-version API patterns")

    # ── 收集 .ets 文件 ──
    ets_files = sorted(target.rglob('*.ets'))
    if not ets_files:
        print(f"INFO: 目标目录无 .ets 文件: {target}")
        sys.exit(0)

    # ── 统一扫描 ──
    total_issues = 0
    all_issues: List[str] = []
    all_d2_issues: List[str] = []

    for fpath in ets_files:
        count, issues = scan_file(fpath, patterns, compat_level)
        total_issues += count
        all_issues.extend(issues)
        # 收集 10-3 告警用于 10-5 判断
        all_d2_issues.extend([i for i in issues if i.startswith('10-3:')])

    # ── 10-5: 兼容性不匹配 ──
    d3_issues = check_compat_mismatch(all_d2_issues, compat_level, bp_path)
    if d3_issues:
        all_issues.extend(d3_issues)
        total_issues += len(d3_issues)
        print(f"\n10-5: compatibleSdkVersion mismatch:\n")
        for issue in d3_issues:
            print(f"  {issue}")

    # ── 输出结果 ──
    if total_issues > 0:
        print(f"\n共检测到 {total_issues} 个稳定性/兼容性风险:\n")
        for issue in all_issues:
            print(f"  {issue}")
        print(f"\n请修复以上问题后重新运行本脚本验证。")
        if not args.dry_run:
            sys.exit(2)
    else:
        print("稳定性+兼容性检测通过: 无告警。")

    sys.exit(0)


if __name__ == '__main__':
    main()
