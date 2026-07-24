#!/usr/bin/env python3
"""Parse onDeviceTest test_result.txt (+ optional short hilog) into sub-device-verify JSON.

Usage:
    python parse_device_test_result.py \\
        --test-result ohos/example/harmony/entry/.test/default/intermediates/ohosTest/coverage_data/test_result.txt \\
        --methods getBluetoothState,setBluetoothState \\
        [--hilog-seconds 15] [--bundle com.example.application]

Prints JSON to stdout; exit 0 on success, 1 if test_result missing/empty.
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

TAG = "[parse-device-test-result]"

CRASH_PATTERN = re.compile(
    r"FATAL|JSCrash|CppCrash|NativeCrash|SIGABRT|ApplicationForceStop|ProcessExit|"
    r"libRNOHApp is undefined|Couldn't create bindings between ETS and CPP|"
    r"Load native module failed|librnoh_app|is about to exit due to RuntimeError|"
    r"PROCESS_KILL|Kill Reason:Js Error",
    re.IGNORECASE,
)

SUMMARY_RE = re.compile(
    r"Tests run:\s*(\d+),\s*Failure:\s*(\d+),\s*Error:\s*(\d+),\s*Pass:\s*(\d+)",
    re.IGNORECASE,
)


def parse_test_result(path: Path) -> dict[str, str]:
    """Return { test_name: 'Success'|'Failure'|... } from test_result.txt."""
    text = path.read_text(encoding="utf-8", errors="replace")
    results: dict[str, str] = {}
    current_test: str | None = None
    for raw in text.splitlines():
        line = raw.strip()
        if line.startswith("test="):
            current_test = line.split("=", 1)[1].strip()
        elif line.startswith("result=") and current_test:
            results[current_test] = line.split("=", 1)[1].strip()
            current_test = None
    summary = SUMMARY_RE.search(text)
    summary_counts = None
    if summary:
        summary_counts = {
            "run": int(summary.group(1)),
            "failure": int(summary.group(2)),
            "error": int(summary.group(3)),
            "pass": int(summary.group(4)),
        }
    return {"cases": results, "summary": summary_counts, "raw": text}


def _filter_hilog(text: str, pattern: re.Pattern, max_lines: int) -> str:
    lines = []
    for line in text.splitlines():
        if pattern.search(line):
            lines.append(line)
            if len(lines) >= max_lines:
                break
    return "\n".join(lines)


def collect_hilog(
    seconds: int,
    *,
    bundle: str | None,
    out_path: Path | None,
    filter_re: re.Pattern,
    filter_max_lines: int,
) -> tuple[str, str, bool, str]:
    if seconds <= 0:
        return "", "", False, ""
    cmd = ["hdc", "hilog", "-t", str(seconds)]
    try:
        proc = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=seconds + 30,
        )
        text = (proc.stdout or "") + (proc.stderr or "")
    except (subprocess.TimeoutExpired, FileNotFoundError, OSError) as e:
        err = f"hilog collection failed: {e}"
        return err, err, False, ""

    hilog_path = ""
    if out_path:
        try:
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_text(text, encoding="utf-8")
            hilog_path = str(out_path)
        except Exception as e:
            hilog_path = f"hilog write failed: {e}"

    crash = bool(CRASH_PATTERN.search(text))
    if bundle and crash:
        # require bundle mention near crash for higher confidence (best-effort)
        pass
    excerpt = _filter_hilog(text, filter_re, filter_max_lines)
    return text[:8000], excerpt[:8000], crash, hilog_path


def map_result(test_name: str, hypium_result: str | None) -> tuple[str, str]:
    if hypium_result is None:
        return "not_executed", f"not in test_result.txt: {test_name}"
    r = hypium_result.lower()
    if r == "success":
        return "pass", f"onDeviceTest: {test_name} Success"
    if r == "failure":
        return "assert_fail", f"onDeviceTest: {test_name} Failure"
    if r == "error":
        return "error", f"onDeviceTest: {test_name} Error"
    return "error", f"onDeviceTest: {test_name} {hypium_result}"


def build_payload(
    methods: list[str],
    parsed: dict,
    hilog_text: str,
    hilog_excerpt: str,
    hilog_path: str,
    crash_detected: bool,
) -> dict:
    cases = parsed["cases"]
    device_results = []
    for method in methods:
        # detectWhiteScreen is a test case name, not always in implemented_methods
        hypium_name = method
        result, detail = map_result(hypium_name, cases.get(hypium_name))
        device_results.append(
            {"method": method, "result": result, "detail": detail}
        )

    # include detectWhiteScreen if present in report but not in methods
    if "detectWhiteScreen" in cases and not any(
        d["method"] == "detectWhiteScreen" for d in device_results
    ):
        r, d = map_result("detectWhiteScreen", cases["detectWhiteScreen"])
        device_results.insert(0, {"method": "detectWhiteScreen", "result": r, "detail": d})

    pass_n = sum(1 for d in device_results if d["result"] == "pass")
    non_pass = [d for d in device_results if d["result"] != "pass"]
    if crash_detected:
        status = "fail"
    elif pass_n == len(device_results) and device_results:
        status = "pass"
    elif pass_n > 0:
        status = "partial"
    elif non_pass:
        status = "fail"
    else:
        status = "fail"

    crash_log = ""
    if crash_detected and hilog_text:
        for line in hilog_text.splitlines():
            if CRASH_PATTERN.search(line):
                crash_log = line.strip()[:500]
                break

    return {
        "device_test_status": status,
        "device_test_skip_reason": None,
        "device_test_fast_fail": False,
        "device_test_fast_fail_log": "",
        "device_test_results": device_results,
        "device_hilog_path": hilog_path,
        "device_hilog_excerpt": hilog_excerpt,
        "device_crash_detected": crash_detected,
        "device_crash_log": crash_log,
        "device_test_attempts": 1,
        "test_result_summary": parsed.get("summary"),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Parse onDeviceTest test_result.txt")
    parser.add_argument("--test-result", required=True, help="Path to test_result.txt")
    parser.add_argument(
        "--methods",
        default="",
        help="Comma-separated implemented method names (excl. detectWhiteScreen)",
    )
    parser.add_argument(
        "--hilog-seconds",
        type=int,
        default=15,
        help="hilog duration; 0 to skip (default 15)",
    )
    parser.add_argument(
        "--hilog-out",
        default="",
        help="Write full hilog to this file path (optional).",
    )
    parser.add_argument(
        "--hilog-filter",
        default=r"\\b(E|F)\\b|FATAL|Exception|Error|Crash|SIGABRT|JSCrash|CppCrash|NativeCrash|ApplicationForceStop|ProcessExit|PROCESS_KILL|Kill Reason:Js Error",
        help="Regex for hilog excerpt filtering (case-insensitive).",
    )
    parser.add_argument(
        "--hilog-max-lines",
        type=int,
        default=200,
        help="Max lines in filtered hilog excerpt (default 200).",
    )
    parser.add_argument("--bundle", default="", help="bundleName for optional filtering")
    args = parser.parse_args()

    path = Path(args.test_result)
    if not path.is_file():
        print(f"{TAG} test_result not found: {path}", file=sys.stderr)
        sys.exit(1)

    parsed = parse_test_result(path)
    if not parsed["cases"]:
        print(f"{TAG} no test cases in {path}", file=sys.stderr)
        sys.exit(1)

    methods = [m.strip() for m in args.methods.split(",") if m.strip()]
    out_path = Path(args.hilog_out) if args.hilog_out else None
    filter_re = re.compile(args.hilog_filter, re.IGNORECASE)
    hilog_text, hilog_excerpt, crash, hilog_path = collect_hilog(
        args.hilog_seconds,
        bundle=(args.bundle or None),
        out_path=out_path,
        filter_re=filter_re,
        filter_max_lines=args.hilog_max_lines,
    )
    payload = build_payload(methods, parsed, hilog_text, hilog_excerpt, hilog_path, crash)
    print(json.dumps(payload, ensure_ascii=False, indent=2))


def _configure_stdio_utf8() -> None:
    """Windows 终端/管道下按 UTF-8 输出中文与符号，避免 UnicodeEncodeError 崩溃。"""
    if not sys.platform.startswith("win"):
        return
    try:
        import ctypes
        ctypes.windll.kernel32.SetConsoleOutputCP(65001)
        ctypes.windll.kernel32.SetConsoleCP(65001)
    except Exception:
        pass
    for _name in ("stdout", "stderr"):
        _stream = getattr(sys, _name, None)
        if _stream is None or not hasattr(_stream, "reconfigure"):
            continue
        try:
            _stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, OSError, ValueError):
            pass


_configure_stdio_utf8()


if __name__ == "__main__":
    main()
