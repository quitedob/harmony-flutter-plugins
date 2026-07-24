"""DevEco Studio toolchain discovery and PATH/JAVA_HOME injection for subprocesses."""

from __future__ import annotations

import os
import platform
import sys
from pathlib import Path
from typing import Dict, List, Optional, TypedDict


class DevecoToolchain(TypedDict):
    studio: str
    node: str
    java: str
    hvigorw: str
    ohpm_bin: str
    path_dirs: List[str]
    missing: List[str]


def _deveco_studio_roots() -> List[str]:
    home = Path.home()
    if sys.platform == "darwin":
        return ["/Applications/DevEco-Studio.app"]
    if sys.platform == "win32":
        roots = [
            Path("C:/Program Files/Huawei/DevEco Studio"),
            Path("D:/Program Files/Huawei/DevEco Studio"),
            home / "DevEco Studio",
        ]
        deveco = os.environ.get("DEVECO_HOME")
        if deveco:
            roots.insert(0, Path(deveco))
        return [str(p) for p in roots]
    return ["/opt/DevEco-Studio", str(home / "DevEco-Studio")]


def find_deveco_studio_root() -> Optional[str]:
    deveco = os.environ.get("DEVECO_HOME")
    if deveco and Path(deveco).is_dir():
        return str(Path(deveco).resolve())
    for root in _deveco_studio_roots():
        if Path(root).is_dir():
            return str(Path(root).resolve())
    return None


def resolve_deveco_toolchain() -> Optional[DevecoToolchain]:
    studio = find_deveco_studio_root()
    if not studio:
        return None

    is_mac = sys.platform == "darwin"
    is_win = sys.platform == "win32"
    base = Path(studio)

    if is_mac:
        node = base / "Contents/tools/node/bin/node"
        java = base / "Contents/jbr/Contents/Home/bin/java"
        hvigorw = base / "Contents/tools/hvigor/bin/hvigorw"
        ohpm_bin = base / "Contents/tools/ohpm/bin"
    else:
        node = base / "tools/node/node.exe"
        java = base / "jbr/bin/java.exe"
        hvigorw = base / "tools/hvigor/bin/hvigorw.bat"
        ohpm_bin = base / "tools/ohpm/bin"
        if is_win and not node.is_file():
            node = base / "tools/node/bin/node.exe"
        if is_win and not hvigorw.is_file():
            alt = base / "tools/hvigor/bin/hvigorw.BAT"
            if alt.is_file():
                hvigorw = alt

    path_dirs: List[str] = []
    for tool in (node, java, hvigorw):
        if tool.is_file():
            path_dirs.append(str(tool.parent))
    if ohpm_bin.is_dir():
        path_dirs.append(str(ohpm_bin))

    tools = {"node": node, "java": java, "hvigorw": hvigorw}
    missing = [name for name, p in tools.items() if not p.is_file()]

    return DevecoToolchain(
        studio=studio,
        node=str(node),
        java=str(java),
        hvigorw=str(hvigorw),
        ohpm_bin=str(ohpm_bin),
        path_dirs=list(dict.fromkeys(path_dirs)),
        missing=missing,
    )


def _cmd_base(cmd: str) -> str:
    return os.path.basename(cmd).lower().removesuffix(".exe").removesuffix(".bat").removesuffix(".cmd")


_WIN_NATIVE_EXTS = (".exe", ".cmd", ".bat", ".com", ".EXE", ".CMD", ".BAT", ".COM")


def _npm_shim_next_to_node(node_exe: str, base: str) -> Optional[str]:
    """DevEco / Node install dir: prefer npm.cmd over extensionless npm shim."""
    node_dir = Path(node_exe).parent
    for ext in _WIN_NATIVE_EXTS:
        shim = node_dir / f"{base}{ext}"
        if shim.is_file():
            return str(shim)
    return None


def which_on_path(cmd: str, path_val: str) -> Optional[str]:
    """Resolve executable on a given PATH string (Python <3.12 compatible)."""
    if not path_val:
        return None
    name = cmd
    base = _cmd_base(name) if sys.platform == "win32" else ""
    if sys.platform == "win32":
        # Extensionless npm/npx in PATH are often shell shims — CreateProcess fails (WinError 193).
        if base in ("npm", "npx") and not os.path.splitext(name)[1]:
            pathext = os.environ.get("PATHEXT", ".COM;.EXE;.BAT;.CMD").split(";")
            candidates: List[str] = []
            for ext in pathext:
                ext = ext.strip()
                if ext:
                    candidates.append(name + ext)
            candidates.append(name)
        else:
            pathext = os.environ.get("PATHEXT", ".COM;.EXE;.BAT;.CMD").split(";")
            candidates = [name]
            for ext in pathext:
                ext = ext.strip()
                if ext and not name.lower().endswith(ext.lower()):
                    candidates.append(name + ext)
    else:
        candidates = [name]
    for directory in path_val.split(os.pathsep):
        if not directory:
            continue
        for candidate in candidates:
            full = os.path.join(directory, candidate)
            if os.path.isfile(full) and os.access(full, os.X_OK):
                if sys.platform == "win32" and base in ("npm", "npx"):
                    ext = os.path.splitext(full)[1].lower()
                    if ext not in (".exe", ".cmd", ".bat", ".com"):
                        continue
                return full
    return None


def resolve_subprocess_executable(cmd: str, env: Optional[Dict[str, str]] = None) -> str:
    """Resolve a CLI name to a path subprocess can execute on Windows."""
    if sys.platform != "win32":
        return cmd

    env_map = dict(env if env is not None else os.environ)
    base = _cmd_base(cmd)

    tc = resolve_deveco_toolchain()
    if tc and not tc["missing"]:
        tc_bins = {
            "node": tc["node"],
            "java": tc["java"],
            "hvigorw": tc["hvigorw"],
            "ohpm": os.path.join(tc["ohpm_bin"], "ohpm.cmd"),
        }
        hit = tc_bins.get(base)
        if hit and os.path.isfile(hit):
            return hit
        if base in ("npm", "npx"):
            shim = _npm_shim_next_to_node(tc["node"], base)
            if shim:
                return shim

    if os.path.splitext(cmd)[1]:
        return cmd

    path_val = env_map.get("PATH", "")
    resolved = which_on_path(cmd, path_val) if path_val else None
    if not resolved:
        from shutil import which as shutil_which

        resolved = shutil_which(cmd)
    if not resolved:
        return cmd

    ext = os.path.splitext(resolved)[1].lower()
    if ext in (".exe", ".cmd", ".bat", ".com"):
        return resolved

    for suffix in (".cmd", ".CMD", ".exe", ".bat"):
        candidate = resolved + suffix
        if os.path.isfile(candidate):
            return candidate
    parent = os.path.dirname(resolved)
    for suffix in (".cmd", ".exe"):
        candidate = os.path.join(parent, base + suffix)
        if os.path.isfile(candidate):
            return candidate

    return resolved


def enriched_env(base: Optional[Dict[str, str]] = None) -> Dict[str, str]:
    """Return env with DevEco toolchain prepended to PATH (and JAVA_HOME when found)."""
    env = dict(base if base is not None else os.environ)
    tc = resolve_deveco_toolchain()
    if not tc or tc["missing"]:
        return env

    sep = os.pathsep
    env["PATH"] = sep.join([*tc["path_dirs"], env.get("PATH", "")]).strip(sep)

    studio = Path(tc["studio"])
    if sys.platform == "darwin":
        java_home = studio / "Contents/jbr/Contents/Home"
    else:
        java_home = studio / "jbr"
    if java_home.is_dir():
        env["JAVA_HOME"] = str(java_home)
    env["DEVECO_HOME"] = tc["studio"]
    env.setdefault("PYTHONIOENCODING", "utf-8")
    return env
