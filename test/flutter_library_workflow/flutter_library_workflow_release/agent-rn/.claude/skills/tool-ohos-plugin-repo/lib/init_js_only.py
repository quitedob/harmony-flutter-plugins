"""js-only 模块的 init 逻辑。

纯 JS：并行执行 ohos/example 依赖安装
有 TS：顺序执行（prepare → pack → example install）
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from shutil import which

_PLUGIN_ROOT: str = ""
_TOOL_DIR: str = ""
_OHOS_DIR: str = ""
_EXAMPLE_REAL: str = ""
_LEGACY_PEER_DEPS: bool = False


def _resolve_cmd(cmd: str) -> str:
    """在 Windows 上解析命令为 .cmd/.bat 文件。"""
    if sys.platform != "win32":
        return cmd
    if os.path.splitext(cmd)[1]:
        return cmd
    resolved = which(cmd)
    if resolved:
        return resolved
    return cmd


def _run(cmd: list[str], cwd: str, quiet: bool = False) -> None:
    resolved = [_resolve_cmd(cmd[0])] + cmd[1:]  # 只解析第一个命令
    print_cmd = " ".join(resolved)
    if not quiet:
        print(f"$ (cwd={cwd}) {print_cmd}")
    subprocess.run(resolved, cwd=cwd, check=True, capture_output=quiet)


def _thread_safe_print(msg: str) -> None:
    print(msg)


def _read_json(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _write_json(path: str, data: dict) -> None:
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def _chain_ohos_deps() -> None:
    """Ohos 侧: npm install + prepare（如有）"""
    if not os.path.isfile(os.path.join(_OHOS_DIR, "package.json")):
        return
    npm_install_cmd = ["npm", "install", "--registry=https://registry.npmmirror.com"]
    if _LEGACY_PEER_DEPS:
        npm_install_cmd.append("--legacy-peer-deps")
    _run(npm_install_cmd, cwd=_OHOS_DIR)

    pkg = _read_json(os.path.join(_OHOS_DIR, "package.json"))
    scripts = pkg.get("scripts", {})
    if "prepare" in scripts:
        _run(["npm", "run", "prepare"], cwd=_OHOS_DIR)


def _chain_example_deps() -> None:
    """Example 侧: npm install → ohpm install"""
    if not os.path.isdir(_EXAMPLE_REAL):
        return
    npm_install_cmd = ["npm", "install", "--registry=https://registry.npmmirror.com"]
    if _LEGACY_PEER_DEPS:
        npm_install_cmd.append("--legacy-peer-deps")
    _run(npm_install_cmd, cwd=_EXAMPLE_REAL)

    harmony_dir = os.path.join(_EXAMPLE_REAL, "harmony")
    if os.path.isdir(harmony_dir):
        ohpm_cmd = [
            "ohpm", "install", "--all",
            "--registry", "https://ohpm.openharmony.cn/ohpm/",
            "--strict_ssl", "true",
        ]
        _run(ohpm_cmd, cwd=harmony_dir)


def run_init_js_only_pure_js(
    plugin_root: str,
    legacy_peer_deps: bool = False,
) -> None:
    """纯 JS 模块 init：顺序执行 ohos install → pack → example install"""
    global _PLUGIN_ROOT, _OHOS_DIR, _EXAMPLE_REAL, _LEGACY_PEER_DEPS

    _PLUGIN_ROOT = plugin_root
    _OHOS_DIR = os.path.join(plugin_root, "ohos")
    _OHOS_DIR_REAL = os.path.realpath(_OHOS_DIR)  # junction 解析后的真实路径
    _EXAMPLE_REAL = os.path.realpath(os.path.join(plugin_root, "ohos", "example"))
    _LEGACY_PEER_DEPS = legacy_peer_deps

    errors: list[tuple[str, Exception]] = []

    def chain_ohos_and_pack() -> None:
        _chain_ohos_deps()
        _run(["npm", "pack", "--ignore-scripts"], cwd=_OHOS_DIR, quiet=True)
        pkg = _read_json(os.path.join(_OHOS_DIR, "package.json"))
        pkg_name = pkg.get("name", "")
        pkg_version = pkg.get("version", "")
        if pkg_name and pkg_version:
            tgz_name = pkg_name.replace("@", "").replace("/", "-") + f"-{pkg_version}.tgz"
            _thread_safe_print(f"  [OK] npm pack -> {tgz_name}")

            # 检查是否是同一个位置（junction 场景）
            tgz_src = os.path.join(_OHOS_DIR_REAL, tgz_name)
            tgz_dst = os.path.join(os.path.dirname(_EXAMPLE_REAL), tgz_name)
            if tgz_src == tgz_dst:
                _thread_safe_print(f"  tgz already in short path (junction): {tgz_dst}")
            elif os.path.isfile(tgz_src):
                import shutil
                shutil.copy2(tgz_src, tgz_dst)
                _thread_safe_print(f"  copied tgz to short path: {tgz_dst}")

    def chain_example() -> None:
        pkg = _read_json(os.path.join(_OHOS_DIR, "package.json"))
        pkg_name = pkg.get("name", "")
        pkg_version = pkg.get("version", "")
        if not pkg_name or not pkg_version:
            return
        tgz_name = pkg_name.replace("@", "").replace("/", "-") + f"-{pkg_version}.tgz"

        example_pkg_path = os.path.join(_EXAMPLE_REAL, "package.json")
        example_pkg = _read_json(example_pkg_path)
        example_pkg.setdefault("dependencies", {})
        example_pkg["dependencies"][pkg_name] = f"file:../{tgz_name}"
        _write_json(example_pkg_path, example_pkg)
        _thread_safe_print(f"  added dependency: {pkg_name} -> file:../{tgz_name}")

        npm_install_cmd = ["npm", "install", "--registry=https://registry.npmmirror.com"]
        if _LEGACY_PEER_DEPS:
            npm_install_cmd.append("--legacy-peer-deps")
        _run(npm_install_cmd, cwd=_EXAMPLE_REAL)

        harmony_dir = os.path.join(_EXAMPLE_REAL, "harmony")
        if os.path.isdir(harmony_dir):
            ohpm_cmd = [
                "ohpm", "install", "--all",
                "--registry", "https://ohpm.openharmony.cn/ohpm/",
                "--strict_ssl", "true",
            ]
            _run(ohpm_cmd, cwd=harmony_dir)

    try:
        _thread_safe_print("  [info] js-only: sequential execution (ohos install → pack → copy tgz → example install)")
        chain_ohos_and_pack()
        _thread_safe_print("  [OK] ohos deps + pack")
        chain_example()
        _thread_safe_print("  [OK] example deps")
    except Exception as e:
        errors.append(("sequential chain", e))
        _thread_safe_print(f"  [FAIL] {e}")

    if errors:
        names = ", ".join(n for n, _ in errors)
        raise SystemExit(f"rn.py init failed for: {names}")


def run_init_js_only_with_ts(
    plugin_root: str,
    legacy_peer_deps: bool = False,
) -> None:
    """有 TS 模块 init：顺序执行（prepare → pack → example install）"""
    global _PLUGIN_ROOT, _OHOS_DIR, _OHOS_DIR_REAL, _EXAMPLE_REAL, _LEGACY_PEER_DEPS

    _PLUGIN_ROOT = plugin_root
    _OHOS_DIR = os.path.join(plugin_root, "ohos")
    _OHOS_DIR_REAL = os.path.realpath(_OHOS_DIR)
    _EXAMPLE_REAL = os.path.realpath(os.path.join(plugin_root, "ohos", "example"))
    _LEGACY_PEER_DEPS = legacy_peer_deps

    errors: list[tuple[str, Exception]] = []

    try:
        _thread_safe_print("  [info] js-only + TS: sequential execution (prepare → pack → example install)")

        _chain_ohos_deps()
        _thread_safe_print("  [OK] ohos deps")

        _run(["npm", "pack", "--ignore-scripts"], cwd=_OHOS_DIR, quiet=True)
        pkg = _read_json(os.path.join(_OHOS_DIR, "package.json"))
        pkg_name = pkg.get("name", "")
        pkg_version = pkg.get("version", "")
        tgz_name = ""
        if pkg_name and pkg_version:
            tgz_name = pkg_name.replace("@", "").replace("/", "-") + f"-{pkg_version}.tgz"
            _thread_safe_print(f"  [OK] npm pack -> {tgz_name}")

            tgz_src = os.path.join(_OHOS_DIR_REAL, tgz_name)
            tgz_dst = os.path.join(os.path.dirname(_EXAMPLE_REAL), tgz_name)
            if tgz_src == tgz_dst:
                _thread_safe_print(f"  tgz already in short path (junction): {tgz_dst}")
            elif os.path.isfile(tgz_src):
                import shutil
                shutil.copy2(tgz_src, tgz_dst)
                _thread_safe_print(f"  copied tgz to short path: {tgz_dst}")

        example_pkg_path = os.path.join(_EXAMPLE_REAL, "package.json")
        example_pkg = _read_json(example_pkg_path)
        example_pkg.setdefault("dependencies", {})
        if pkg_name and tgz_name:
            example_pkg["dependencies"][pkg_name] = f"file:../{tgz_name}"
            _write_json(example_pkg_path, example_pkg)
            _thread_safe_print(f"  added dependency: {pkg_name} -> file:../{tgz_name}")

        npm_install_cmd = ["npm", "install", "--registry=https://registry.npmmirror.com"]
        if _LEGACY_PEER_DEPS:
            npm_install_cmd.append("--legacy-peer-deps")
        _run(npm_install_cmd, cwd=_EXAMPLE_REAL)

        harmony_dir = os.path.join(_EXAMPLE_REAL, "harmony")
        if os.path.isdir(harmony_dir):
            ohpm_cmd = [
                "ohpm", "install", "--all",
                "--registry", "https://ohpm.openharmony.cn/ohpm/",
                "--strict_ssl", "true",
            ]
            _run(ohpm_cmd, cwd=harmony_dir)

        _thread_safe_print("  [OK] example deps")
    except Exception as e:
        errors.append(("sequential chain", e))
        _thread_safe_print(f"  [FAIL] {e}")

    if errors:
        names = ", ".join(n for n, _ in errors)
        raise SystemExit(f"rn.py init failed for: {names}")