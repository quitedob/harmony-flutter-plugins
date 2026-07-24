#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix_power.py - HarmonyOS Power Consumption Static Detection Tool

Scans .ets files to detect power-related resource lifecycle issues:
- sensor.on(sensor.SensorId.XXX) without matching sensor.off()
- requestAnimationFrame without cancelAnimationFrame
- createAnimator without cancel()/undefined cleanup
- geoLocationManager.on('locationChange') without off()
- wifiManager.on() without wifiManager.off()
- ble.on()/bleScanner.on() without matching off()
- RunningLock without .unhold()
- backgroundTaskManager startBackgroundRunning without stopBackgroundRunning
- httpRequest/http.createHttp without .destroy()
- AudioRenderer/AudioCapturer without .release()
- Background CPU usage (setInterval/clearInterval mismatch, setTimeout/clearTimeout mismatch, infinite loops)

Usage:
    python dfx_power.py --target <ets_dir>
    python dfx_power.py --target <ets_dir> --dry-run
"""

import argparse
import re
import sys
from pathlib import Path
from typing import Dict, List, Tuple

from dfx_common import strip_comments_strings, strip_line_comment, should_skip, read_file


def check_sensor_pairs(lines: List[str], filename: str) -> List[str]:
    """sensor.on(sensor.SensorId.XXX) without matching sensor.off()"""
    issues = []
    on_by_id: Dict[str, int] = {}
    off_ids: set = set()

    re_on = re.compile(r'sensor\.on\s*\(\s*sensor\.SensorId\.(\w+)')
    re_off = re.compile(r'sensor\.off\s*\(\s*sensor\.SensorId\.(\w+)')

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if not stripped:
            continue

        m = re_on.search(stripped)
        if m:
            sid = m.group(1)
            if sid not in on_by_id:
                on_by_id[sid] = i

        m = re_off.search(stripped)
        if m:
            off_ids.add(m.group(1))

    for sid, line_no in on_by_id.items():
        if sid not in off_ids:
            issues.append(
                f"{filename}:{line_no} - sensor.on(sensor.SensorId.{sid}) "
                f"without matching sensor.off(sensor.SensorId.{sid}). "
                f"Add sensor.off() in aboutToDisappear/onPageHide."
            )
    return issues


def check_raf(lines: List[str], filename: str) -> List[str]:
    """requestAnimationFrame without cancelAnimationFrame"""
    issues = []
    raf_count = 0
    cancel_count = 0
    raf_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue
        if re.search(r'\brequestAnimationFrame\s*\(', stripped):
            raf_count += 1
            if raf_line == 0:
                raf_line = i
        if re.search(r'\bcancelAnimationFrame\s*\(', stripped):
            cancel_count += 1

    if raf_count > 0 and cancel_count == 0:
        issues.append(
            f"{filename}:{raf_line} - requestAnimationFrame() found "
            f"but no cancelAnimationFrame() call. "
            f"Add cancelAnimationFrame() in onPageHide/onDestroy."
        )
    return issues


def check_animator(lines: List[str], filename: str) -> List[str]:
    """createAnimator without cancel()/undefined cleanup"""
    issues = []
    create_count = 0
    cleanup_count = 0
    create_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue
        if re.search(r'\bcreateAnimator\s*\(', stripped):
            create_count += 1
            if create_line == 0:
                create_line = i
        if re.search(r'animator\.(cancel|finish|reset)\s*\(|this\.animator\s*=\s*undefined', stripped):
            cleanup_count += 1

    if create_count > 0 and cleanup_count == 0:
        issues.append(
            f"{filename}:{create_line} - createAnimator() found "
            f"but no .cancel() or = undefined cleanup. "
            f"Add animator.cancel()/=undefined in onPageHide."
        )
    return issues


def check_location_pairs(lines: List[str], filename: str) -> List[str]:
    """geoLocationManager.on('locationChange') without off()"""
    issues = []
    on_count = 0
    off_count = 0
    on_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue
        if re.search(r'geoLocationManager\.on\s*\(\s*[\'"]locationChange[\'"]', stripped):
            on_count += 1
            if on_line == 0:
                on_line = i
        if re.search(r'geoLocationManager\.off\s*\(\s*[\'"]locationChange[\'"]', stripped):
            off_count += 1

    if on_count > off_count:
        issues.append(
            f"{filename}:{on_line} - geoLocationManager.on('locationChange') found "
            f"but no matching off(). "
            f"Add geoLocationManager.off() in aboutToDisappear."
        )
    return issues


def check_wifi_scan(lines: List[str], filename: str) -> List[str]:
    """wifiManager.on() without wifiManager.off()"""
    issues = []
    on_count = 0
    off_count = 0
    on_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue
        if re.search(r'wifiManager\.on\s*\(', stripped):
            on_count += 1
            if on_line == 0:
                on_line = i
        if re.search(r'wifiManager\.off\s*\(', stripped):
            off_count += 1

    if on_count > off_count:
        issues.append(
            f"{filename}:{on_line} - wifiManager.on() found "
            f"but no matching off(). "
            f"Add wifiManager.off() in aboutToDisappear/onPageHide."
        )
    return issues


def check_ble_scan(lines: List[str], filename: str) -> List[str]:
    """ble.on()/bleScanner.on() without matching off()"""
    issues = []
    on_count = 0
    off_count = 0
    on_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue
        if re.search(r'\b(ble|bleScanner)\.on\s*\(', stripped):
            on_count += 1
            if on_line == 0:
                on_line = i
        if re.search(r'\b(ble|bleScanner)\.off\s*\(', stripped):
            off_count += 1

    if on_count > off_count:
        issues.append(
            f"{filename}:{on_line} - ble.on()/bleScanner.on() found "
            f"but no matching off(). "
            f"Add ble.off()/bleScanner.off() in aboutToDisappear/onPageHide."
        )
    return issues


def check_audio_resource(lines: List[str], filename: str) -> List[str]:
    """AudioRenderer/AudioCapturer without .release()"""
    issues = []
    create_count = 0
    release_count = 0
    create_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue
        if re.search(r'\bcreateAudioRenderer\s*\(|\bAudioRenderer\s*\(', stripped):
            create_count += 1
            if create_line == 0:
                create_line = i
        if re.search(r'\bcreateAudioCapturer\s*\(|\bAudioCapturer\s*\(', stripped):
            create_count += 1
            if create_line == 0:
                create_line = i
        if re.search(r'renderer\.(stop|release|releaseSync)\s*\(|audioRenderer\.(stop|release)\s*\(', stripped):
            release_count += 1

    if create_count > 0 and release_count == 0:
        issues.append(
            f"{filename}:{create_line} - AudioRenderer/AudioCapturer created "
            f"but no .release() call found. "
            f"Add stop() and release() in onPageHide/aboutToDisappear."
        )
    return issues


def check_background_cpu(lines: List[str], filename: str) -> List[str]:
    """Background CPU usage - setInterval/clearInterval mismatch, setTimeout/clearTimeout mismatch, infinite loops"""
    issues = []
    set_interval_count = 0
    clear_interval_count = 0
    interval_line = 0
    set_timeout_count = 0
    clear_timeout_count = 0
    timeout_line = 0
    infinite_loop_found = False
    infinite_loop_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if not stripped:
            continue

        if re.search(r'\bsetInterval\s*\(', stripped):
            set_interval_count += 1
            if interval_line == 0:
                interval_line = i
        if re.search(r'\bclearInterval\s*\(', stripped):
            clear_interval_count += 1

        if re.search(r'\bsetTimeout\s*\(', stripped):
            set_timeout_count += 1
            if timeout_line == 0:
                timeout_line = i
        if re.search(r'\bclearTimeout\s*\(', stripped):
            clear_timeout_count += 1

        if re.search(r'\bwhile\s*\(\s*true\s*\)|\bfor\s*\(\s*;\s*;\s*\)', stripped):
            # Check if we're inside a lifecycle or callback function
            in_lifecycle = False
            for j in range(i - 1, max(0, i - 20), -1):
                prev = lines[j].strip()
                if re.search(r'aboutToAppear|onPageShow|onPageHide|aboutToDisappear|setInterval|setTimeout|onClick', prev):
                    in_lifecycle = True
                    break
                if re.search(r'^\s*(public|private|protected|export|@Entry|@Component|struct|class)\b', lines[j]):
                    break

            if in_lifecycle and not infinite_loop_found:
                infinite_loop_found = True
                infinite_loop_line = i

    if set_interval_count > 0 and clear_interval_count == 0:
        issues.append(
            f"{filename}:{interval_line} - setInterval() found "
            f"but no clearInterval() call. "
            f"Add clearInterval() in onPageHide/aboutToDisappear."
        )

    if set_timeout_count > 0 and clear_timeout_count == 0:
        issues.append(
            f"{filename}:{timeout_line} - setTimeout() found "
            f"but no clearTimeout() call. "
            f"Add clearTimeout() in onPageHide/aboutToDisappear."
        )

    if infinite_loop_found:
        issues.append(
            f"{filename}:{infinite_loop_line} - infinite loop (while(true)/for(;;)) "
            f"found in lifecycle/callback. Use flags/break to stop on page hide."
        )

    return issues


def check_running_lock(lines: List[str], filename: str) -> List[str]:
    """RunningLock without .unhold()"""
    issues = []
    create_count = 0
    unhold_count = 0
    create_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if not stripped:
            continue
        if re.search(r'\bRunningLock\b', stripped) and re.search(r'\bnew\s+RunningLock\b|runningLock\.create\b', stripped):
            create_count += 1
            if create_line == 0:
                create_line = i
        if re.search(r'\.unhold\s*\(', stripped):
            unhold_count += 1

    if create_count > 0 and unhold_count == 0:
        issues.append(
            f"{filename}:{create_line} - RunningLock created "
            f"but no .unhold() call found. "
            f"Add runningLock.unhold() in onPageHide/aboutToDisappear."
        )
    return issues


def check_background_task(lines: List[str], filename: str) -> List[str]:
    """backgroundTaskManager.startBackgroundRunning without stopBackgroundRunning"""
    issues = []
    start_count = 0
    stop_count = 0
    start_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if not stripped:
            continue
        if re.search(r'\bbackgroundTaskManager\.startBackgroundRunning\s*\(', stripped):
            start_count += 1
            if start_line == 0:
                start_line = i
        if re.search(r'\bbackgroundTaskManager\.stopBackgroundRunning\s*\(', stripped):
            stop_count += 1

    if start_count > 0 and stop_count == 0:
        issues.append(
            f"{filename}:{start_line} - backgroundTaskManager.startBackgroundRunning() found "
            f"but no stopBackgroundRunning() call. "
            f"Add stopBackgroundRunning() in onPageHide/aboutToDisappear."
        )
    return issues


def check_http_destroy(lines: List[str], filename: str) -> List[str]:
    """http.createHttp/httpRequest without .destroy()"""
    issues = []
    create_count = 0
    destroy_count = 0
    create_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if not stripped:
            continue
        if re.search(r'\bhttp\.createHttp\s*\(|\bhttpRequest\b.*=', stripped) and not re.search(r'\.destroy\s*\(', stripped):
            create_count += 1
            if create_line == 0:
                create_line = i
        if re.search(r'\.destroy\s*\(', stripped) and re.search(r'httpRequest|http\.', stripped):
            destroy_count += 1

    if create_count > 0 and destroy_count == 0:
        issues.append(
            f"{filename}:{create_line} - HTTP request created "
            f"but no .destroy() call found. "
            f"Add httpRequest.destroy() after response to free resources."
        )
    return issues


def check_network_batching(lines: List[str], filename: str) -> List[str]:
    """网络请求批量化"""
    issues = []
    
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//'):
            continue
        
        # 检查setInterval中的网络请求
        if re.search(r'setInterval', stripped):
            for j in range(i, min(len(lines) + 1, i + 10)):
                check_line = lines[j - 1].strip()
                if re.search(r'http\.|fetch|request', check_line):
                    issues.append(
                        f"{filename}:{i} - 高频网络请求，"
                        f"建议使用WebSocket或批量接口"
                    )
                    break
    
    return issues


def scan_file(filepath: Path) -> Tuple[int, List[str]]:
    """Scan a single .ets file for power issues"""
    content, _ = read_file(str(filepath))
    stripped_content = strip_comments_strings(content)
    lines = stripped_content.split('\n')
    filename = filepath.name
    issues = []
    issues.extend(check_sensor_pairs(lines, filename))
    issues.extend(check_raf(lines, filename))
    issues.extend(check_animator(lines, filename))
    issues.extend(check_location_pairs(lines, filename))
    issues.extend(check_wifi_scan(lines, filename))
    issues.extend(check_ble_scan(lines, filename))
    issues.extend(check_running_lock(lines, filename))
    issues.extend(check_background_task(lines, filename))
    issues.extend(check_http_destroy(lines, filename))
    issues.extend(check_audio_resource(lines, filename))
    issues.extend(check_background_cpu(lines, filename))
    issues.extend(check_network_batching(lines, filename))
    return len(issues), issues


def main():
    parser = argparse.ArgumentParser(description='HarmonyOS Power Consumption Static Detection')
    parser.add_argument('--target', required=True, help='entry/src/main/ets directory path')
    parser.add_argument('--dry-run', action='store_true', help='detect only, no non-zero exit code')
    args = parser.parse_args()
    sys.stdout.reconfigure(encoding='utf-8')

    target = Path(args.target)
    if not target.exists():
        print(f"ERROR: target directory not found: {target}")
        sys.exit(1)

    ets_files = sorted(f for f in target.rglob('*.ets') if not should_skip(f))
    if not ets_files:
        print(f"INFO: no .ets files found in: {target}")
        sys.exit(0)

    total_issues = 0
    all_issues: List[str] = []

    for fpath in ets_files:
        count, issues = scan_file(fpath)
        total_issues += count
        all_issues.extend(issues)

    if total_issues > 0:
        print(f"\nDetected {total_issues} power risk(s):\n")
        for issue in all_issues:
            print(f"  {issue}")
        print(f"\nFix and re-run.")
        if not args.dry_run:
            sys.exit(2)
    else:
        print("Power check passed: no warnings.")

    sys.exit(0)


if __name__ == '__main__':
    main()
