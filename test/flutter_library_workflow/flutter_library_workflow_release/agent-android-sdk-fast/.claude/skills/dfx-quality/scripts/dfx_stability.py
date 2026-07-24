#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix_stability.py - HarmonyOS ETS 稳定性 + 兼容性静态检测工具

扫描 entry/src/main/ets/**/*.ets 中的状态装饰器使用模式、资源泄漏风险和 API Level 兼容性：
 - @Prop/@State/@Link/@Provide/@Consume 使用 Function 类型
 - @Link 本地初始化
 - @Prop @Watch 无默认值
 - 内存泄漏预防（大对象未在 aboutToDisappear 清理）
 - FD 泄漏预防（fs.openSync/fs.open 无 fs.close）
 - 线程泄漏预防（Worker/TaskPool 未 terminate/cancel）
 - 高版本 API 缺少运行时版本守卫
 - 异步操作无取消机制
 - 异步操作无error状态处理且无try/catch错误边界
 - V1 @Builder 引用 this 后通过属性赋值语法传给 @BuilderParam，this 上下文丢失
 - 手势事件回调中 fingerList/touches 数组索引访问未做空值防御

用法:
    python dfx_stability.py --target <ets_dir_or_project_root>
    python dfx_stability.py --target <ets_dir_or_project_root> --dry-run
    python dfx_stability.py --target <ets_dir_or_project_root> --config <compat_patterns.json>
"""

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple

from dfx_common import strip_comments_strings, strip_line_comment, should_skip, read_file


# ══════════════════════════════════════════════════════════════════════
#  稳定性检测（dfx_stability.py）
# ══════════════════════════════════════════════════════════════════════

DECORATORS = ('State', 'Prop', 'Link', 'Provide', 'Consume')
RE_DECORATOR = re.compile(r'@(' + '|'.join(DECORATORS) + r')\b')


def check_function_type(lines: List[str], filename: str) -> List[str]:
    """V1 装饰器禁止 Function 类型"""
    issues = []
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if not RE_DECORATOR.search(stripped):
            continue
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue
        if re.search(r':\s*\(.*\)\s*=>', stripped):
            issues.append(f"{filename}:{i} - {RE_DECORATOR.search(stripped).group(0)} 禁止 Function 类型，V1 组件去掉装饰器用普通变量传递回调，V2 组件改用 @Event")
        elif re.search(r':\s*Function\b', stripped):
            issues.append(f"{filename}:{i} - {RE_DECORATOR.search(stripped).group(0)} 禁止 Function 类型，V1 组件去掉装饰器用普通变量传递回调，V2 组件改用 @Event")
    return issues


def check_link_local_init(lines: List[str], filename: str) -> List[str]:
    """@Link 禁止本地初始化"""
    issues = []
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if not re.search(r'@Link\b', stripped):
            continue
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue
        if re.search(r'@Link\s+\w+\s*=\s*(?!\$)', stripped):
            issues.append(f"{filename}:{i} - @Link 禁止本地初始化，请改为父组件传 $myValue")
    return issues


def check_prop_watch_default(lines: List[str], filename: str) -> List[str]:
    """@Prop @Watch 须有默认值"""
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
                issues.append(f"{filename}:{i} - @Prop @Watch 缺少默认值，请添加 = 0 / = false 等安全默认值")
                in_prop_watch = False
            continue

        if in_prop_watch:
            # 支持泛型（number[]）、联合类型（Type | null）、可选类型（Type?）
            if re.search(r'\w+\s*:\s*[\w<>\[\]?|\s]+\s*=\s*', stripped):
                in_prop_watch = False
            elif ';' in stripped or stripped.endswith(';'):
                issues.append(f"{filename}:{prop_watch_line} - @Prop @Watch 缺少默认值，请添加 = 0 / = false 等安全默认值")
                in_prop_watch = False
            elif re.match(r'@', stripped):
                issues.append(f"{filename}:{prop_watch_line} - @Prop @Watch 缺少默认值，请添加 = 0 / = false 等安全默认值")
                in_prop_watch = False

    return issues


def check_memory_leak(lines: List[str], filename: str) -> List[str]:
    """内存泄漏预防 - @State 持有大数组未在 aboutToDisappear 清理"""
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
            f"{filename}:{large_array_line} - @State 持有大数组但未在 aboutToDisappear 中清理，"
            f"请添加 this.xxx = [] / = null"
        )

    return issues


def check_fd_leak(lines: List[str], filename: str) -> List[str]:
    """FD 泄漏预防 - fs.openSync/fs.open 无 fs.close"""
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

        if re.search(r'\b(?:fs|fileIo)\.close(?:Sync)?\s*\(', stripped):
            close_count += 1

    if open_count > close_count:
        issues.append(
            f"{filename}:{open_line} - {open_count} 次文件打开但仅 {close_count} 次关闭，"
            f"请确保每个 open/openSync 都有对应的 fileIo.close"
        )

    return issues


def check_thread_leak(lines: List[str], filename: str) -> List[str]:
    """线程泄漏预防 - Worker/TaskPool 未 terminate/cancel"""
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
            f"{filename}:{worker_line} - Worker 创建但未终止，"
            f"请在 aboutToDisappear 中调用 worker.terminate()"
        )

    if taskpool_count > 0 and cancel_count == 0:
        issues.append(
            f"{filename}:{taskpool_line} - taskpool.execute 但未 cancel，"
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
    patterns: Dict
) -> List[str]:
    """高版本 API 缺少运行时版本守卫"""
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
            msg = f"{filename}:{i} - used {keyword}({desc}, @since {since})"
            if syscap:
                msg += f", missing canIUse('{syscap}') guard"
            else:
                msg += ", missing runtime version guard"
            issues.append(msg)
    return issues


# ══════════════════════════════════════════════════════════════════════
#  @BuilderParam this 上下文安全检测
# ══════════════════════════════════════════════════════════════════════


def check_builder_param_this_context(lines: List[str], filename: str) -> List[str]:
    """V1 @Builder 引用 this 后通过属性赋值语法传给 @BuilderParam，this 上下文丢失"""
    issues = []

    builder_names_with_this = set()

    pending_builder = False
    pending_builder_count = 0
    in_builder = False
    current_builder_name: Optional[str] = None
    current_builder_has_this = False
    brace_depth = 0
    seen_open_brace = False

    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue

        if not in_builder:
            m = re.match(r'@Builder\s+(?:function\s+)?(\w+)\s*\(', stripped)
            if m:
                current_builder_name = m.group(1)
                current_builder_has_this = False
                in_builder = True
                brace_depth = 0
                seen_open_brace = False
                pending_builder = False
            elif re.match(r'@Builder\s*$', stripped):
                pending_builder = True
                pending_builder_count = 0
                continue
            elif pending_builder:
                pending_builder_count += 1
                if pending_builder_count > 3:
                    pending_builder = False
                    continue
                m2 = re.match(r'(?:function\s+)?(\w+)\s*\(', stripped)
                if m2:
                    current_builder_name = m2.group(1)
                    current_builder_has_this = False
                    in_builder = True
                    brace_depth = 0
                    seen_open_brace = False
                    pending_builder = False
                else:
                    continue
            else:
                continue

        if in_builder:
            brace_depth += stripped.count('{') - stripped.count('}')
            if brace_depth > 0:
                seen_open_brace = True
            if re.search(r'\bthis\??\.\w+', stripped):
                current_builder_has_this = True
            if seen_open_brace and brace_depth <= 0:
                if current_builder_has_this:
                    builder_names_with_this.add(current_builder_name)
                in_builder = False
                current_builder_name = None
                seen_open_brace = False

    if not builder_names_with_this:
        return issues

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        for name in builder_names_with_this:
            if re.search(rf'\b\w+\s*:\s*this\.{name}\b(?!\s*\()', stripped):
                issues.append(
                    f"{filename}:{i} - @Builder '{name}' 引用了 this，"
                    f"通过属性赋值语法传给 @BuilderParam 会导致 this 上下文丢失（运行时 undefined crash），"
                    f"请改用尾随闭包语法: Component() {{ this.{name}() }}"
                )

    return issues


# ══════════════════════════════════════════════════════════════════════
#  并发安全检测
# ══════════════════════════════════════════════════════════════════════

RE_ASYNC_API = re.compile(
    r'\bfetch\s*\(|\bhttpRequest\b|http\.createHttp|\baxios\b|\.then\s*\(|new\s+Promise\s*\('
)


def check_async_race_condition(lines: List[str], filename: str) -> List[str]:
    """异步操作有取消机制"""
    issues = []

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if not stripped:
            continue

        # 检查具体异步API调用（避免对普通 async 关键字误报）
        if RE_ASYNC_API.search(stripped):
            # 检查是否有取消机制
            has_cancel = False
            for j in range(max(1, i - 5), min(len(lines) + 1, i + 10)):
                check_line = lines[j - 1].strip()
                if re.search(r'AbortController|\bcancel\b|isCancelled', check_line):
                    has_cancel = True
                    break

            if not has_cancel:
                issues.append(
                    f"{filename}:{i} - 异步操作无取消机制，"
                    f"建议添加AbortController或取消标志"
                )

    return issues


def _is_inside_try_block(lines: List[str], idx: int) -> bool:
    """检查第 idx 行（0-based）是否在某个 try 块内（向上扫描，栈匹配 { }）"""
    depth = 0
    for j in range(idx, -1, -1):
        line = lines[j].strip()
        if not line:
            continue
        # 向上遍历：{ 增加深度（进入包含作用域），} 减少深度（退出包含作用域）
        opens = line.count('{')
        closes = line.count('}')
        depth += opens - closes
        # 遇到 try 关键字且 try 块的 { 尚未被闭合（depth > 0 说明在 try 块内）
        if re.search(r'\btry\s*\{', line) and depth > 0:
            return True
        # depth 变负说明已经跳出所有包含当前行的块
        if depth < 0:
            return False
    return False


def check_state_machine(lines: List[str], filename: str) -> List[str]:
    """状态机完整（loading/ready/error + try/catch 错误边界）"""
    issues = []

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if not stripped:
            continue

        # 检查具体异步API调用
        if RE_ASYNC_API.search(stripped):
            # 检查是否有error状态处理
            has_error = False
            for j in range(i, min(len(lines) + 1, i + 20)):
                check_line = lines[j - 1].strip()
                if re.search(r'error|Error|catch', check_line):
                    has_error = True
                    break

            # 检查是否在 try 块内（错误边界）
            has_try = _is_inside_try_block(lines, i - 1)

            if not has_error and not has_try:
                issues.append(
                    f"{filename}:{i} - 异步操作无error状态处理且无try/catch错误边界，"
                    f"建议补充完整的loading/ready/error状态机或try/catch包裹"
                )

    return issues


# ══════════════════════════════════════════════════════════════════════
#  手势事件回调空值防御检测
# ══════════════════════════════════════════════════════════════════════

RE_GESTURE_CALLBACK = re.compile(
    r'\.(onActionStart|onActionUpdate|onActionEnd|onAction)\s*\(\s*'
    r'(?:\((\w+)\s*:\s*GestureEvent(?:\s*\|\s*undefined)?\)\s*=>|(\w+)\s*=>)'
)
RE_FINGERLIST_ACCESS = re.compile(
    r'(\w+)\.fingerList\[(\d+)\]\.(\w+)'
)
RE_FINGERLIST_OPTIONAL = re.compile(
    r'(\w+)\.fingerList\[\d+\]\?\.'
)
RE_FINGERLIST_GUARD = re.compile(
    r'(\w+)\.fingerList\s*\)'
    r'|(\w+)\.fingerList\.length'
    r'|(\w+)\.fingerList\s*&&'
    r'|(\w+)\.fingerList\s*\|\|'
    r'|!\s*(\w+)\.fingerList'
)
RE_TOUCHES_ACCESS = re.compile(
    r'(\w+)\.touches\[(\d+)\]\.(\w+)'
)
RE_TOUCHES_GUARD = re.compile(
    r'(\w+)\.touches\s*\)'
    r'|(\w+)\.touches\.length'
    r'|(\w+)\.touches\s*&&'
    r'|(\w+)\.touches\s*\|\|'
    r'|!\s*(\w+)\.touches'
)
RE_TOUCHES_OPTIONAL = re.compile(
    r'(\w+)\.touches\[\d+\]\?\.'
)


def _find_callback_blocks(lines: List[str]) -> List[Tuple[int, int, str]]:
    """定位手势回调块的范围 (start_line_0based, end_line_0based, param_name)"""
    blocks: List[Tuple[int, int, str]] = []
    i = 0
    n = len(lines)
    while i < n:
        stripped = lines[i].strip()
        m = RE_GESTURE_CALLBACK.search(stripped)
        if not m:
            i += 1
            continue
        param_name = m.group(2) or m.group(3) or ''
        if not param_name:
            i += 1
            continue
        brace_depth = 0
        start = i
        found_open = False
        j = i
        while j < n:
            line_stripped = lines[j].strip()
            for ch in line_stripped:
                if ch == '{':
                    brace_depth += 1
                    found_open = True
                elif ch == '}':
                    brace_depth -= 1
                    if found_open and brace_depth <= 0:
                        blocks.append((start, j, param_name))
                        i = j + 1
                        break
            else:
                j += 1
                continue
            break
        else:
            i += 1
            continue
        if not blocks or blocks[-1][0] != start:
            i += 1
    return blocks


def check_gesture_event_null_safety(lines: List[str], filename: str) -> List[str]:
    """手势事件回调中 fingerList[N]/touches[N] 索引访问未做空值防御"""
    issues: List[str] = []

    callback_blocks = _find_callback_blocks(lines)
    if not callback_blocks:
        return issues

    for block_start, block_end, param_name in callback_blocks:
        has_fingerlist_guard = False
        has_touches_guard = False
        fingerlist_access_lines: List[Tuple[int, str, str, str]] = []
        touches_access_lines: List[Tuple[int, str, str, str]] = []

        for line_idx in range(block_start, block_end + 1):
            stripped = lines[line_idx].strip()

            if RE_FINGERLIST_GUARD.search(stripped):
                has_fingerlist_guard = True
            if RE_TOUCHES_GUARD.search(stripped):
                has_touches_guard = True

            for m in RE_FINGERLIST_ACCESS.finditer(stripped):
                if m.group(1) == param_name:
                    full_match = m.group(0)
                    if not RE_FINGERLIST_OPTIONAL.search(stripped):
                        fingerlist_access_lines.append(
                            (line_idx + 1, m.group(2), m.group(3), full_match)
                        )

            for m in RE_TOUCHES_ACCESS.finditer(stripped):
                if m.group(1) == param_name:
                    full_match = m.group(0)
                    if not RE_TOUCHES_OPTIONAL.search(stripped):
                        touches_access_lines.append(
                            (line_idx + 1, m.group(2), m.group(3), full_match)
                        )

        for line_no, idx, prop, full_match in fingerlist_access_lines:
            guarded = False
            if has_fingerlist_guard:
                for guard_idx in range(block_start, line_no - 1):
                    guard_stripped = lines[guard_idx].strip()
                    if RE_FINGERLIST_GUARD.search(guard_stripped):
                        same_control_flow = True
                        depth_at_guard = 0
                        depth_at_access = 0
                        d = 0
                        for k in range(block_start, line_no):
                            for ch in lines[k]:
                                if ch == '{':
                                    d += 1
                                elif ch == '}':
                                    d -= 1
                            if k == guard_idx:
                                depth_at_guard = d
                            if k == line_no - 1:
                                depth_at_access = d
                        if depth_at_access > depth_at_guard:
                            same_control_flow = False
                        if same_control_flow:
                            guarded = True
                            break
            if not guarded:
                issues.append(
                    f"{filename}:{line_no} - 手势回调中 {full_match} 未做空值防御，"
                    f"fingerList为稀疏数组（键盘/手柄触发时为空，未参与手势的手指对应位置为undefined），"
                    f"访问前需检查 event.fingerList.length 或使用可选链 fingerList[{idx}]?.{prop}，"
                    f"建议优先使用 fingerInfos（API 20+）"
                )

        for line_no, idx, prop, full_match in touches_access_lines:
            guarded = False
            if has_touches_guard:
                for guard_idx in range(block_start, line_no - 1):
                    guard_stripped = lines[guard_idx].strip()
                    if RE_TOUCHES_GUARD.search(guard_stripped):
                        same_control_flow = True
                        depth_at_guard = 0
                        depth_at_access = 0
                        d = 0
                        for k in range(block_start, line_no):
                            for ch in lines[k]:
                                if ch == '{':
                                    d += 1
                                elif ch == '}':
                                    d -= 1
                            if k == guard_idx:
                                depth_at_guard = d
                            if k == line_no - 1:
                                depth_at_access = d
                        if depth_at_access > depth_at_guard:
                            same_control_flow = False
                        if same_control_flow:
                            guarded = True
                            break
            if not guarded:
                issues.append(
                    f"{filename}:{line_no} - 手势回调中 {full_match} 未做空值防御，"
                    f"touches数组可能为空，访问前需检查 event.touches.length 或使用可选链 touches[{idx}]?.{prop}"
                )

    return issues


# ══════════════════════════════════════════════════════════════════════
#  统一扫描入口
# ══════════════════════════════════════════════════════════════════════

def scan_file(
    filepath: Path,
    patterns: Optional[Dict] = None
) -> Tuple[int, List[str]]:
    """扫描单个 .ets 文件，同时运行稳定性 + 兼容性检测"""
    content, _ = read_file(str(filepath))
    stripped_content = strip_comments_strings(content)
    lines = stripped_content.split('\n')

    filename = filepath.name
    issues = []
    issues.extend(check_function_type(lines, filename))
    issues.extend(check_link_local_init(lines, filename))
    issues.extend(check_prop_watch_default(lines, filename))
    issues.extend(check_memory_leak(lines, filename))
    issues.extend(check_fd_leak(lines, filename))
    issues.extend(check_thread_leak(lines, filename))
    issues.extend(check_async_race_condition(lines, filename))
    issues.extend(check_state_machine(lines, filename))
    issues.extend(check_builder_param_this_context(lines, filename))
    issues.extend(check_gesture_event_null_safety(lines, filename))

    if patterns:
        issues.extend(check_high_api_usage(lines, filename, patterns))

    return len(issues), issues


def main():
    parser = argparse.ArgumentParser(description='HarmonyOS ETS 稳定性 + 兼容性静态检测')
    parser.add_argument('--target', required=True, help='ets 目录或项目根目录')
    parser.add_argument('--dry-run', action='store_true', help='仅检测不返回非零退出码')
    parser.add_argument('--config', help='自定义高版本 API 模式配置文件（JSON）')
    args = parser.parse_args()
    sys.stdout.reconfigure(encoding='utf-8')

    target = Path(args.target)
    if not target.exists():
        print(f"ERROR: 目标目录不存在: {target}")
        sys.exit(1)

    patterns = load_patterns(args.config)
    print(f"loaded {len(patterns)} high-version API patterns")

    ets_files = sorted(f for f in target.rglob('*.ets') if not should_skip(f))
    if not ets_files:
        print(f"INFO: 目标目录无 .ets 文件: {target}")
        sys.exit(0)

    total_issues = 0
    all_issues: List[str] = []

    for fpath in ets_files:
        count, issues = scan_file(fpath, patterns)
        total_issues += count
        all_issues.extend(issues)

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
