#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix_power.py - HarmonyOS Power Consumption Static Detection Tool

Scans .ets files to detect power-related resource lifecycle issues:
- 1-1: sensor.on(sensor.SensorId.XXX) without matching sensor.off()
- 2-1: requestAnimationFrame without cancelAnimationFrame
- 2-2: createAnimator without cancel()/undefined cleanup
- 3-1: geoLocationManager.on('locationChange') without off()
- 4-1: wifiManager.on() without wifiManager.off()
- 4-2: ble.on()/bleScanner.on() without matching off()
- 6-1: AudioRenderer/AudioCapturer without .release()
- 6-2: Background CPU usage (setInterval/clearInterval mismatch, infinite loops)

Usage:
    python fix_power.py --target <ets_dir>
    python fix_power.py --target <ets_dir> --dry-run
"""

import argparse
import re
import sys
from pathlib import Path
from typing import List, Tuple


def check_sensor_pairs(lines: List[str], filename: str) -> List[str]:
    """1-1: sensor.on(sensor.SensorId.XXX) without matching sensor.off()"""
    issues = []
    on_count = 0
    off_count = 0
    once_count = 0
    on_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
            continue

        if re.search(r'sensor\.on\s*\(\s*sensor\.SensorId\.', stripped):
            on_count += 1
            if on_line == 0:
                on_line = i

        if re.search(r'sensor\.once\s*\(\s*sensor\.SensorId\.', stripped):
            once_count += 1

        if re.search(r'sensor\.off\s*\(\s*sensor\.SensorId\.', stripped):
            off_count += 1

    if on_count > off_count:
        issues.append(
            f"1-1: {filename}:{on_line} - {on_count} sensor.on() registrations "
            f"but only {off_count} sensor.off() calls. "
            f"Add sensor.off() in aboutToDisappear/onPageHide."
        )
    return issues


def check_raf(lines: List[str], filename: str) -> List[str]:
    """2-1: requestAnimationFrame without cancelAnimationFrame"""
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
            f"2-1: {filename}:{raf_line} - requestAnimationFrame() found "
            f"but no cancelAnimationFrame() call. "
            f"Add cancelAnimationFrame() in onPageHide/onDestroy."
        )
    return issues


def check_animator(lines: List[str], filename: str) -> List[str]:
    """2-2: createAnimator without cancel()/undefined cleanup"""
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
        if re.search(r'\.cancel\s*\(\s*\)|=\s*undefined', stripped):
            cleanup_count += 1

    if create_count > 0 and cleanup_count == 0:
        issues.append(
            f"2-2: {filename}:{create_line} - createAnimator() found "
            f"but no .cancel() or = undefined cleanup. "
            f"Add animator.cancel()/=undefined in onPageHide."
        )
    return issues


def check_location_pairs(lines: List[str], filename: str) -> List[str]:
    """3-1: geoLocationManager.on('locationChange') without off()"""
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
            f"3-1: {filename}:{on_line} - geoLocationManager.on('locationChange') found "
            f"but no matching off(). "
            f"Add geoLocationManager.off() in aboutToDisappear."
        )
    return issues


def check_wifi_scan(lines: List[str], filename: str) -> List[str]:
    """4-1: wifiManager.on() without wifiManager.off()"""
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
            f"4-1: {filename}:{on_line} - wifiManager.on() found "
            f"but no matching off(). "
            f"Add wifiManager.off() in aboutToDisappear/onPageHide."
        )
    return issues


def check_ble_scan(lines: List[str], filename: str) -> List[str]:
    """4-2: ble.on()/bleScanner.on() without matching off()"""
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
            f"4-2: {filename}:{on_line} - ble.on()/bleScanner.on() found "
            f"but no matching off(). "
            f"Add ble.off()/bleScanner.off() in aboutToDisappear/onPageHide."
        )
    return issues


def check_audio_resource(lines: List[str], filename: str) -> List[str]:
    """6-1: AudioRenderer/AudioCapturer without .release()"""
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
        if re.search(r'\.release\s*\(\s*\)', stripped):
            release_count += 1

    if create_count > 0 and release_count == 0:
        issues.append(
            f"6-1: {filename}:{create_line} - AudioRenderer/AudioCapturer created "
            f"but no .release() call found. "
            f"Add stop() and release() in onPageHide/aboutToDisappear."
        )
    return issues


def check_background_cpu(lines: List[str], filename: str) -> List[str]:
    """6-2: Background CPU usage - setInterval/clearInterval mismatch, infinite loops"""
    issues = []
    set_interval_count = 0
    clear_interval_count = 0
    set_timeout_count = 0
    clear_timeout_count = 0
    interval_line = 0
    timeout_line = 0
    infinite_loop_found = False
    infinite_loop_line = 0

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*'):
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
            f"6-2: {filename}:{interval_line} - setInterval() found "
            f"but no clearInterval() call. "
            f"Add clearInterval() in onPageHide/aboutToDisappear."
        )

    if set_timeout_count > 0 and clear_timeout_count == 0:
        issues.append(
            f"6-2: {filename}:{timeout_line} - setTimeout() found "
            f"but no clearTimeout() call. "
            f"Add clearTimeout() in onPageHide/aboutToDisappear."
        )

    if infinite_loop_found:
        issues.append(
            f"6-2: {filename}:{infinite_loop_line} - infinite loop (while(true)/for(;;)) "
            f"found in lifecycle/callback. Use flags/break to stop on page hide."
        )

    return issues


def scan_file(filepath: Path) -> Tuple[int, List[str]]:
    """Scan a single .ets file for power issues"""
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    filename = filepath.name
    issues = []
    issues.extend(check_sensor_pairs(lines, filename))
    issues.extend(check_raf(lines, filename))
    issues.extend(check_animator(lines, filename))
    issues.extend(check_location_pairs(lines, filename))
    issues.extend(check_wifi_scan(lines, filename))
    issues.extend(check_ble_scan(lines, filename))
    issues.extend(check_audio_resource(lines, filename))
    issues.extend(check_background_cpu(lines, filename))
    return len(issues), issues


def main():
    parser = argparse.ArgumentParser(description='HarmonyOS Power Consumption Static Detection')
    parser.add_argument('--target', required=True, help='entry/src/main/ets directory path')
    parser.add_argument('--dry-run', action='store_true', help='detect only, no non-zero exit code')
    args = parser.parse_args()

    target = Path(args.target)
    if not target.exists():
        print(f"ERROR: target directory not found: {target}")
        sys.exit(1)

    ets_files = sorted(target.rglob('*.ets'))
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
