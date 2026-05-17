"""原生模块的 init 逻辑：并行安装依赖 + codegen。"""

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
_HAR_WRAPPER_DIR: str = ""
_LEGACY_PEER_DEPS: bool = False
_MODULE_KIND: str = ""


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


def _run_python(script: str, args: list[str], cwd: str) -> None:
    subprocess.run(["python", script] + args, cwd=cwd, check=True)


def _thread_safe_print(msg: str) -> None:
    print(msg)


def _chain_ohos_codegen() -> None:
    """Ohos 主线: npm install → prepare → 代码生成"""
    if os.path.isfile(os.path.join(_OHOS_DIR, "package.json")):
        npm_install_cmd = ["npm", "install", "--registry=https://registry.npmmirror.com"]
        if _LEGACY_PEER_DEPS:
            npm_install_cmd.append("--legacy-peer-deps")
        _run(npm_install_cmd, cwd=_OHOS_DIR)

        pkg_path = os.path.join(_OHOS_DIR, "package.json")
        with open(pkg_path, "r", encoding="utf-8") as f:
            import json
            pkg = json.load(f)
        scripts = pkg.get("scripts", {})
        if "prepare" in scripts:
            _run(["npm", "run", "prepare"], cwd=_OHOS_DIR)

    gen_turbo = os.path.join(_TOOL_DIR, "generate_library_turbo.py")
    gen_fabric = os.path.join(_TOOL_DIR, "generate_library_fabric.py")

    if _MODULE_KIND in ("turbo", "both"):
        _run_python(gen_turbo, ["--plugin-root", _PLUGIN_ROOT], cwd=_PLUGIN_ROOT)
    if _MODULE_KIND in ("fabric", "both"):
        _run_python(gen_fabric, ["--plugin-root", _PLUGIN_ROOT], cwd=_PLUGIN_ROOT)


def _chain_example() -> None:
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


def _chain_har_wrapper() -> None:
    """Har Wrapper 侧: ohpm install"""
    if not os.path.isdir(_HAR_WRAPPER_DIR):
        return
    ohpm_cmd = [
        "ohpm", "install", "--all",
        "--registry", "https://ohpm.openharmony.cn/ohpm/",
        "--strict_ssl", "true",
    ]
    _run(ohpm_cmd, cwd=_HAR_WRAPPER_DIR)


def run_init_native(
    plugin_root: str,
    tool_dir: str,
    module_kind: str,
    legacy_peer_deps: bool = False,
) -> None:
    """原生模块 init：并行执行 ohos/example/har_wrapper 依赖安装 + codegen"""
    global _PLUGIN_ROOT, _TOOL_DIR, _OHOS_DIR, _EXAMPLE_REAL, _HAR_WRAPPER_DIR, _LEGACY_PEER_DEPS, _MODULE_KIND

    _PLUGIN_ROOT = plugin_root
    _TOOL_DIR = tool_dir
    _OHOS_DIR = os.path.join(plugin_root, "ohos")
    _EXAMPLE_REAL = os.path.realpath(os.path.join(plugin_root, "ohos", "example"))
    _HAR_WRAPPER_DIR = os.path.join(plugin_root, "ohos", ".rn-build", "har_wrapper")
    _LEGACY_PEER_DEPS = legacy_peer_deps
    _MODULE_KIND = module_kind

    errors: list[tuple[str, Exception]] = []

    chains = [
        ("ohos deps + codegen", _chain_ohos_codegen),
        ("example deps", _chain_example),
        ("har_wrapper deps", _chain_har_wrapper),
    ]

    with ThreadPoolExecutor(max_workers=3) as executor:
        future_to_name = {executor.submit(chain): name for name, chain in chains}
        for future in as_completed(future_to_name):
            name = future_to_name[future]
            try:
                future.result()
                _thread_safe_print(f"  [OK] {name}")
            except Exception as e:
                errors.append((name, e))
                _thread_safe_print(f"  [FAIL] {name}: {e}")

    if errors:
        names = ", ".join(n for n, _ in errors)
        raise SystemExit(f"rn.py init failed for: {names}")