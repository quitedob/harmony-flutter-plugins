"""js-only 模块的 build hap 逻辑。

无需 HAR，直接 pack → install → bundle → ohpm → hvigorw
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
from shutil import which

_PLUGIN_ROOT: str = ""
_OHOS_DIR: str = ""
_EXAMPLE_REAL: str = ""
_PKG_NAME: str = ""
_PKG_VERSION: str = ""
_TGZ_NAME: str = ""
_APPLY_EXAMPLE: bool = False


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


def _read_json(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _write_json(path: str, data: dict) -> None:
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def _find_hvigorw(harmony_dir: str) -> str:
    for name in ("hvigorw", "hvigorw.bat"):
        p = os.path.join(harmony_dir, name)
        if os.path.isfile(p):
            return p
    return "hvigorw"


def run_build_hap_js_only(
    plugin_root: str,
    apply_example: bool = False,
) -> None:
    """js-only 模块 build hap：pack → install → bundle → ohpm → hvigorw"""
    global _PLUGIN_ROOT, _OHOS_DIR, _EXAMPLE_REAL, _PKG_NAME, _PKG_VERSION, _TGZ_NAME, _APPLY_EXAMPLE

    _PLUGIN_ROOT = plugin_root
    _OHOS_DIR = os.path.join(plugin_root, "ohos")
    _EXAMPLE_REAL = os.path.realpath(os.path.join(plugin_root, "ohos", "example"))
    _APPLY_EXAMPLE = apply_example

    pkg = _read_json(os.path.join(_OHOS_DIR, "package.json"))
    _PKG_NAME = pkg.get("name", "")
    _PKG_VERSION = pkg.get("version", "")
    if not _PKG_NAME or not _PKG_VERSION:
        raise SystemExit(f"ohos/package.json missing name or version")
    _TGZ_NAME = _PKG_NAME.replace("@", "").replace("/", "-") + f"-{_PKG_VERSION}.tgz"

    print("  [info] js-only mode: no harmony/library, skipping HAR-related steps.")

    _run(["npm", "pack", "--ignore-scripts"], cwd=_OHOS_DIR, quiet=True)

    tgz_path = os.path.join(_OHOS_DIR, _TGZ_NAME)
    if not os.path.isfile(tgz_path):
        raise SystemExit(f"missing tgz: {tgz_path}")

    example_pkg_path = os.path.join(_EXAMPLE_REAL, "package.json")
    example_pkg = _read_json(example_pkg_path)
    example_pkg.setdefault("dependencies", {})
    example_pkg["dependencies"][_PKG_NAME] = f"file:../{_TGZ_NAME}"
    _write_json(example_pkg_path, example_pkg)

    _run(["npm", "install", "--force", f"file:../{_TGZ_NAME}"], cwd=_EXAMPLE_REAL)

    harmony_dir = os.path.join(_EXAMPLE_REAL, "harmony")
    if not os.path.isdir(harmony_dir):
        raise SystemExit(f"missing harmony dir: {harmony_dir}")

    bundle_script = "dev"
    pkg_scripts = _read_json(os.path.join(_EXAMPLE_REAL, "package.json")).get("scripts", {})
    for cand in ("bundle-harmony", "dev"):
        if cand in pkg_scripts:
            bundle_script = cand
            break
    _run(["npm", "run", bundle_script], cwd=_EXAMPLE_REAL)

    ohpm_cmd = [
        "ohpm", "install", "--all",
        "--registry", "https://ohpm.openharmony.cn/ohpm/",
        "--strict_ssl", "true",
    ]
    _run(ohpm_cmd, cwd=harmony_dir, quiet=True)

    hvigorw = _find_hvigorw(harmony_dir)
    _run([hvigorw, "assembleHap", "--no-daemon"], cwd=harmony_dir, quiet=True)

    print("\nDone: tgz packed, local dep installed, bundle generated, HAP assembled (js-only mode).")