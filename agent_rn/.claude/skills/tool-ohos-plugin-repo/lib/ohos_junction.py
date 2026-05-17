"""处理 ohos 目录的短路径 + junction。

Windows 长路径问题解决方案：
- 真实目录：D:\\rn\\1, D:\\rn\\2, ...（这些目录就是 ohos 内容）
- 项目 junction：项目/ohos -> D:\\rn\\1
- 记录文件：项目/.rn-ohos-junction.json
"""

from __future__ import annotations

import ctypes
import json
import os
import shutil
import subprocess
import sys


def _configure_stdio_utf8() -> None:
    """在 Windows 控制台避免中文 print 乱码。"""
    if not sys.platform.startswith('win'):
        return
    try:
        ctypes.windll.kernel32.SetConsoleOutputCP(65001)
        ctypes.windll.kernel32.SetConsoleCP(65001)
    except Exception:
        pass
    for name in ('stdout', 'stderr'):
        stream = getattr(sys, name, None)
        if stream is None or not hasattr(stream, 'reconfigure'):
            continue
        try:
            stream.reconfigure(encoding='utf-8', errors='replace')
        except (AttributeError, OSError, ValueError):
            pass


def _next_rn_sequence_dir(drive: str) -> str:
    """在 drive 根目录的 rn 目录下找下一个序号目录（如 D:\\rn\\1, D:\\rn\\2）。"""
    rn_root = os.path.join(drive + "\\", "rn")
    if not os.path.isdir(rn_root):
        os.makedirs(rn_root)
    max_n = 0
    for name in os.listdir(rn_root):
        p = os.path.join(rn_root, name)
        if os.path.isdir(p) and name.isdigit():
            max_n = max(max_n, int(name))
    seq = str(max_n + 1)
    real_dir = os.path.join(rn_root, seq)
    if os.path.isdir(real_dir):
        shutil.rmtree(real_dir)
    return real_dir


def _is_reparse_point(path: str) -> bool:
    """判断路径是否为重解析点（junction/symlink）。"""
    if not os.path.isdir(path):
        return False
    if sys.platform != "win32":
        return os.path.islink(path)
    try:
        import ctypes
        attr = ctypes.windll.kernel32.GetFileAttributesW(path)
        return attr != -1 and (attr & 0x400) != 0
    except Exception:
        return False


def _remove_junction(link_path: str) -> None:
    """删除 junction：用 rmdir，不用 rmtree（junction 本身不是真实目录）。"""
    if not os.path.exists(link_path):
        return
    if _is_reparse_point(link_path):
        os.rmdir(link_path)
        print(f"  已删除 junction: {link_path}")
    elif os.path.isdir(link_path):
        shutil.rmtree(link_path)
        print(f"  已删除目录: {link_path}")


def _create_junction(link_path: str, target_dir: str) -> None:
    """创建 junction（Windows）或 symlink（非 Windows）。"""
    target_dir = os.path.normpath(os.path.abspath(target_dir))
    link_path = os.path.normpath(os.path.abspath(link_path))

    if sys.platform != "win32":
        try:
            os.symlink(target_dir, link_path, target_is_directory=True)
            print(f"  已创建 symlink: {link_path} -> {target_dir}")
            return
        except OSError as e:
            raise OSError(f"创建 symlink 失败: {e}")

    r = subprocess.run(
        ["cmd", "/c", "mklink", "/J", link_path, target_dir],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    if r.returncode != 0:
        raise OSError(f"创建 junction 失败: {r.stdout or r.stderr or r.returncode}")
    print(f"  已创建 junction: {link_path} -> {target_dir}")


def _write_junction_record(plugin_root: str, real_path: str, link_path: str) -> None:
    """写入 junction 记录文件，方便开发者查找真实目录。"""
    record_path = os.path.join(plugin_root, ".rn-ohos-junction.json")
    record = {
        "real_path": real_path,
        "link_path": link_path,
        "platform": sys.platform,
        "note": f"项目 ohos 目录是 junction，真实目录在 {real_path}（直接包含 example/src/harmony）",
    }
    with open(record_path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(record, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"  已写入记录: {record_path}")


def _read_junction_record(plugin_root: str) -> dict | None:
    """读取 junction 记录文件。"""
    record_path = os.path.join(plugin_root, ".rn-ohos-junction.json")
    if not os.path.isfile(record_path):
        return None
    try:
        with open(record_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return None


def should_use_ohos_junction(plugin_root: str) -> bool:
    """判断是否应该使用 ohos junction（Windows 且盘符路径）。"""
    if sys.platform != "win32":
        return False
    abs_path = os.path.abspath(plugin_root)
    drive_part = os.path.splitdrive(abs_path)[0]
    return len(drive_part) == 2 and drive_part[1] == ":"


def create_ohos_junction(plugin_root: str, force: bool = False) -> str:
    """创建 ohos 目录（短路径 + junction）。

    只创建空目录 + junction，不拷贝模板内容。
    返回 ohos 目录路径（junction 路径）。
    """
    _configure_stdio_utf8()
    link_path = os.path.join(plugin_root, "ohos")

    if should_use_ohos_junction(plugin_root):
        drive = os.path.splitdrive(os.path.abspath(plugin_root))[0]
        real_ohos = _next_rn_sequence_dir(drive)

        print(f"  [Windows 短路径] 真实目录: {real_ohos}")
        print(f"  [Windows 短路径] 项目 junction: {link_path}")

        os.makedirs(real_ohos, exist_ok=True)
        print(f"  已创建空目录: {real_ohos}")

        if os.path.exists(link_path) or _is_reparse_point(link_path):
            if force:
                _remove_junction(link_path)
            else:
                raise SystemExit(f"目标已存在: {link_path}（使用 --force 覆盖）")

        _create_junction(link_path, real_ohos)
        _write_junction_record(plugin_root, real_ohos, link_path)

        return link_path
    else:
        if os.path.isdir(link_path):
            if force:
                shutil.rmtree(link_path)
                print(f"  已删除目录: {link_path}")
            else:
                raise SystemExit(f"目标已存在: {link_path}（使用 --force 覆盖）")

        os.makedirs(link_path, exist_ok=True)
        print(f"  已创建目录: {link_path}")
        return link_path


def remove_ohos_junction(plugin_root: str) -> None:
    """删除 ohos junction（只删 junction，不删真实目录）。"""
    link_path = os.path.join(plugin_root, "ohos")
    record = _read_junction_record(plugin_root)

    if record and os.path.exists(link_path) and _is_reparse_point(link_path):
        os.rmdir(link_path)
        print(f"  已删除 junction: {link_path}")
        print(f"  真实目录保留: {record.get('real_path')}")
        print(f"  如需删除真实目录，请手动执行: rm -rf {record.get('real_path')}")
    elif os.path.isdir(link_path):
        shutil.rmtree(link_path)
        print(f"  已删除目录: {link_path}")


def get_ohos_real_path(plugin_root: str) -> str:
    """获取 ohos 真实路径（解析 junction）。"""
    link_path = os.path.join(plugin_root, "ohos")
    if _is_reparse_point(link_path):
        return os.path.realpath(link_path)
    return link_path


def print_ohos_junction_info(plugin_root: str) -> None:
    """打印 ohos junction 信息。"""
    record = _read_junction_record(plugin_root)
    if record:
        print(f"ohos junction 信息:")
        print(f"  真实目录: {record.get('real_path')}")
        print(f"  项目路径: {record.get('link_path')}")
    else:
        ohos_dir = os.path.join(plugin_root, "ohos")
        if os.path.isdir(ohos_dir):
            print(f"ohos 目录: {ohos_dir}（非 junction）")
        else:
            print("ohos 目录不存在")