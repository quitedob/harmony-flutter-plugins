"""测试配置和 fixture 构造。

提供：
- fixture 目录构造函数
- 测试产物清理
- 文件读写辅助函数

所有测试通过 rn.py CLI 入口执行。
"""

import json
import os
import shutil
import sys


FIXTURES_DIR = os.path.join(os.path.dirname(__file__), "fixtures")


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


def create_fixture_dir(fixture_name: str, files: dict) -> str:
    """创建 fixture 目录。
    
    Args:
        fixture_name: fixture 名称（如 "create_c01")
        files: 文件内容字典，key 是相对路径，value 是内容
            - 字典内容表示 JSON 文件
            - 字符串内容表示文本文件
    
    Returns:
        fixture 目录绝对路径
    """
    fixture_path = os.path.join(FIXTURES_DIR, fixture_name)
    
    if os.path.exists(fixture_path):
        shutil.rmtree(fixture_path)
    
    os.makedirs(fixture_path, exist_ok=True)
    
    for rel_path, content in files.items():
        file_path = os.path.join(fixture_path, rel_path)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        if isinstance(content, dict):
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(content, f, indent=2)
                f.write("\n")
        else:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
    
    return fixture_path


def cleanup_fixture(fixture_name: str) -> None:
    """清理 fixture 目录"""
    fixture_path = os.path.join(FIXTURES_DIR, fixture_name)
    if os.path.exists(fixture_path):
        # 先清理 ohos 目录（包含 junction）
        cleanup_ohos(fixture_path)
        # 再删除 fixture 目录本身
        try:
            if os.path.exists(fixture_path):
                shutil.rmtree(fixture_path)
        except PermissionError:
            # Windows 上可能还有进程占用，强制重试
            import time
            time.sleep(0.5)
            if os.path.exists(fixture_path):
                shutil.rmtree(fixture_path)


def cleanup_ohos(plugin_root: str) -> None:
    """清理 ohos 目录（处理 junction/符号链接，同时删除真实目录）"""
    ohos_path = os.path.join(plugin_root, "ohos")
    
    # 检查是否有 junction 记录文件
    record = _read_junction_record(plugin_root)
    real_path = record.get("real_path") if record else None
    
    if os.path.exists(ohos_path):
        if _is_reparse_point(ohos_path):
            # 删除 junction（链接）
            os.rmdir(ohos_path)
            # 删除真实目录
            if real_path and os.path.isdir(real_path):
                shutil.rmtree(real_path)
        else:
            shutil.rmtree(ohos_path)
    
    # 删除 junction 记录文件
    record_path = os.path.join(plugin_root, ".rn-ohos-junction.json")
    if os.path.isfile(record_path):
        os.remove(record_path)


def read_json(path: str) -> dict:
    """读取 JSON 文件"""
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def read_file(path: str) -> str:
    """读取文本文件"""
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def file_exists(path: str) -> bool:
    """检查文件是否存在"""
    return os.path.isfile(path)


def dir_exists(path: str) -> bool:
    """检查目录是否存在"""
    return os.path.isdir(path)


def cleanup_all_fixtures():
    """清理所有 fixture 和 ohos 目录"""
    if not os.path.exists(FIXTURES_DIR):
        return
    
    for name in os.listdir(FIXTURES_DIR):
        fixture_path = os.path.join(FIXTURES_DIR, name)
        if os.path.isdir(fixture_path):
            cleanup_ohos(fixture_path)
            cleanup_fixture(name)
