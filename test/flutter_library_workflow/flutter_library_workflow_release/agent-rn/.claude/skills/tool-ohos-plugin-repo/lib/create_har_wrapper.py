"""创建 har_wrapper 目录。

根据 ModuleAnalysis 结果：
1. 拷贝 templates/har_wrapper → ohos/.rn-build/har_wrapper
2. 替换所有占位符（使用 analysis 字段）
3. 重命名 library → short_name

仅当 module_kind != "js-only" 时调用。
"""

from __future__ import annotations

import os
import shutil
import sys
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from lib.module_analyzer import ModuleAnalysis

_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SKILL_ROOT not in sys.path:
    sys.path.insert(0, _SKILL_ROOT)

from lib import paths, template_apply


def create_har_wrapper(
    plugin_root: str,
    analysis: ModuleAnalysis,
    module_kind: str | None = None,
    force: bool = False,
    light: bool = False,
) -> None:
    """创建 har_wrapper 目录并替换占位符。
    
    Args:
        plugin_root: 插件根目录
        analysis: 模块分析结果
        module_kind: 模块类型（优先使用用户指定，None 时用 analysis.module_kind）
        force: 是否强制覆盖
        light: 是否轻量拷贝
    """
    if module_kind is None:
        module_kind = analysis.module_kind
    
    if module_kind == "js-only":
        print("  [跳过] js-only 模块，不创建 har_wrapper")
        return
    
    short_name = analysis.short_name
    
    src = os.path.join(paths.templates_dir(), "har_wrapper")
    ohos_dir = os.path.join(plugin_root, "ohos")
    dst = os.path.join(ohos_dir, ".rn-build", "har_wrapper")
    
    ohos_real = os.path.realpath(ohos_dir) if os.path.exists(ohos_dir) else ohos_dir
    dst_real = os.path.join(ohos_real, ".rn-build", "har_wrapper")
    
    print("=== create har_wrapper ===")
    print(f"  src: {src}")
    print(f"  dst: {dst}")
    print(f"  short_name: {short_name}")
    
    if not os.path.isdir(src):
        print(f"  [warn] har_wrapper 模板不存在: {src}")
        return
    
    os.makedirs(os.path.dirname(dst_real), exist_ok=True)
    
    if os.path.isdir(dst_real):
        shutil.rmtree(dst_real)
        print(f"  已删除旧目录: {dst_real}")
    
    template_apply.copy_template_dir(src, dst_real, dry_run=False, force=False, log=print, full=not light)
    print(f"  已拷贝 har_wrapper 模板")
    
    _replace_build_profile(dst_real, short_name)
    _rename_library_dir(dst_real, short_name, plugin_root, analysis.ohos_name)
    
    print("\nDone: har_wrapper created.")


def _replace_build_profile(dst_real: str, short_name: str) -> None:
    """替换 build-profile.json5 中的 {{SHORT_NAME}}"""
    bp_path = os.path.join(dst_real, "build-profile.json5")
    if not os.path.isfile(bp_path):
        return
    
    content = open(bp_path, "r", encoding="utf-8").read()
    if "{{SHORT_NAME}}" in content:
        content = content.replace("{{SHORT_NAME}}", short_name)
        open(bp_path, "w", encoding="utf-8").write(content)
        print(f"  替换 build-profile.json5: {{SHORT_NAME}} -> {short_name}")


def _rename_library_dir(
    dst_real: str, short_name: str, plugin_root: str, ohos_name: str
) -> None:
    """重命名 library 目录为 {short_name} 并替换其中的占位符"""
    old_library_dir = os.path.join(dst_real, "library")
    new_library_dir = os.path.join(dst_real, short_name)
    
    if not os.path.isdir(old_library_dir):
        return
    
    if os.path.isdir(new_library_dir):
        shutil.rmtree(new_library_dir)
    
    shutil.move(old_library_dir, new_library_dir)
    print(f"  重命名 library -> {short_name}")
    
    _replace_library_module_json5(new_library_dir, short_name)
    _replace_library_cmake(new_library_dir, short_name)
    from lib.ohos_package_sync import write_oh_package_json5_name

    oh_pkg = os.path.join(new_library_dir, "oh-package.json5")
    write_oh_package_json5_name(oh_pkg, ohos_name, log=print)


def _replace_library_module_json5(library_dir: str, short_name: str) -> None:
    """替换 library/module.json5"""
    module_path = os.path.join(library_dir, "src", "main", "module.json5")
    if not os.path.isfile(module_path):
        return
    
    content = open(module_path, "r", encoding="utf-8").read()
    if '"name": "library"' in content or '"name":"library"' in content:
        content = content.replace('"name": "library"', f'"name": "{short_name}"')
        content = content.replace('"name":"library"', f'"name":"{short_name}"')
        open(module_path, "w", encoding="utf-8").write(content)
        print(f"  替换 {short_name}/module.json5: library -> {short_name}")


def _replace_library_cmake(library_dir: str, short_name: str) -> None:
    """替换 library/CMakeLists.txt"""
    cmake_path = os.path.join(library_dir, "src", "main", "cpp", "CMakeLists.txt")
    if not os.path.isfile(cmake_path):
        return
    
    content = open(cmake_path, "r", encoding="utf-8").read()
    if "{{SHORT_NAME}}" in content:
        content = content.replace("{{SHORT_NAME}}", short_name)
        open(cmake_path, "w", encoding="utf-8").write(content)
        print(f"  替换 {short_name}/CMakeLists.txt: {{SHORT_NAME}} -> {short_name}")