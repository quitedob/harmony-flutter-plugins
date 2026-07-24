"""测试辅助函数

提供：
- rn.py CLI 运行函数
- fixture 辅助函数导入
"""

import os
import re
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from tool.tests.conftest import (
    FIXTURES_DIR, create_fixture_dir, cleanup_fixture,
    cleanup_ohos, read_json, read_file, file_exists, dir_exists
)


RN_PY = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "rn.py")


def run_rn_cli(
    plugin_root: str,
    subargs: list[str],
    *,
    ohos_scope: str | None = None,
    timeout: int = 120,
) -> subprocess.CompletedProcess:
    """运行 rn.py 子命令（支持全局 --ohos-scope）。"""
    args = [sys.executable, RN_PY]
    if ohos_scope:
        args.extend(["--ohos-scope", ohos_scope])
    args.extend(["--plugin-root", plugin_root])
    args.extend(subargs)
    return subprocess.run(
        args,
        capture_output=True,
        text=True,
        cwd=plugin_root,
        encoding="utf-8",
        errors="replace",
        timeout=timeout,
    )


def read_oh_package_json5_name(path: str) -> str | None:
    """从 oh-package.json5 提取 name 字段。"""
    if not os.path.isfile(path):
        return None
    content = read_file(path)
    m = re.search(r'(?:"name"|name)\s*:\s*"([^"]+)"', content)
    return m.group(1).strip() if m else None


def run_rn_create(plugin_root: str, extra_args: list[str] = None) -> subprocess.CompletedProcess:
    """运行 rn.py create（旧版，默认 --light）"""
    args = [sys.executable, RN_PY, "create", "--plugin-root", plugin_root, "--light"]
    if extra_args:
        args.extend(extra_args)
    return subprocess.run(args, capture_output=True, text=True, cwd=plugin_root, encoding='utf-8', errors='replace', timeout=60)


def run_rn_migrate(plugin_root: str) -> subprocess.CompletedProcess:
    """运行 rn.py migrate"""
    args = [sys.executable, RN_PY, "migrate", "--plugin-root", plugin_root]
    return subprocess.run(args, capture_output=True, text=True, cwd=plugin_root, encoding='utf-8', errors='replace', timeout=300)


def run_rn_clean(plugin_root: str, full: bool = False) -> subprocess.CompletedProcess:
    """运行 rn.py clean"""
    args = [sys.executable, RN_PY, "clean", "--plugin-root", plugin_root]
    if full:
        args.append("--full")
    return subprocess.run(args, capture_output=True, text=True, cwd=plugin_root, encoding='utf-8', errors='replace', timeout=60)


def run_rn_analyse(
    plugin_root: str,
    ohos_scope: str | None = None,
) -> subprocess.CompletedProcess:
    """运行 rn.py analyse"""
    return run_rn_cli(plugin_root, ["analyse"], ohos_scope=ohos_scope, timeout=30)


def run_rn_create_ohos(
    plugin_root: str,
    light: bool = True,
    ohos_scope: str | None = None,
) -> subprocess.CompletedProcess:
    """运行 rn.py create ohos"""
    sub = ["create", "ohos", "--force"]
    if light:
        sub.append("--light")
    return run_rn_cli(plugin_root, sub, ohos_scope=ohos_scope, timeout=60)


def run_rn_create_harmony(
    plugin_root: str,
    light: bool = True,
    ohos_scope: str | None = None,
) -> subprocess.CompletedProcess:
    """运行 rn.py create harmony"""
    sub = ["create", "harmony", "--force"]
    if light:
        sub.append("--light")
    return run_rn_cli(plugin_root, sub, ohos_scope=ohos_scope, timeout=60)


def run_rn_create_example(plugin_root: str, light: bool = True) -> subprocess.CompletedProcess:
    """运行 rn.py create example"""
    args = [sys.executable, RN_PY, "--plugin-root", plugin_root, "create", "example", "--force"]
    if light:
        args.append("--light")
    return subprocess.run(args, capture_output=True, text=True, cwd=plugin_root, encoding='utf-8', errors='replace', timeout=120)


def run_rn_create_har(
    plugin_root: str,
    light: bool = True,
    ohos_scope: str | None = None,
) -> subprocess.CompletedProcess:
    """运行 rn.py create har"""
    sub = ["create", "har", "--force"]
    if light:
        sub.append("--light")
    return run_rn_cli(plugin_root, sub, ohos_scope=ohos_scope, timeout=60)


def run_rn_create_ohos_test(
    plugin_root: str,
    *,
    skip_ohpm: bool = True,
    dry_run: bool = False,
) -> subprocess.CompletedProcess:
    """运行 rn.py create ohos-test"""
    sub = ["create", "ohos-test"]
    if skip_ohpm:
        sub.append("--skip-ohpm")
    if dry_run:
        sub.append("--dry-run")
    return run_rn_cli(plugin_root, sub, timeout=120)


def run_rn_build_hap(
    plugin_root: str,
    *,
    prepare_only: bool = False,
    full: bool = False,
) -> subprocess.CompletedProcess:
    """运行 rn.py build hap"""
    args = [
        sys.executable,
        RN_PY,
        "build",
        "hap",
        "--plugin-root",
        plugin_root,
    ]
    if prepare_only:
        args.append("--prepare-only")
    if full:
        args.append("--full")
    return subprocess.run(
        args,
        capture_output=True,
        text=True,
        cwd=plugin_root,
        encoding="utf-8",
        errors="replace",
        timeout=600,
    )