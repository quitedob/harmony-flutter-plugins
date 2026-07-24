"""创建 harmony/{short_name} 原生代码目录。

根据 ModuleAnalysis 结果：
1. 拷贝 templates/harmony/library → ohos/harmony/{short_name}
2. 替换所有占位符（使用 analysis 字段）
3. 创建 Package.h

仅当 module_kind != "js-only" 时调用。
"""

from __future__ import annotations

import os
import sys
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from lib.module_analyzer import ModuleAnalysis

_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SKILL_ROOT not in sys.path:
    sys.path.insert(0, _SKILL_ROOT)

from lib import paths, template_apply


def create_harmony(
    plugin_root: str,
    analysis: ModuleAnalysis,
    module_kind: str | None = None,
    force: bool = False,
    light: bool = False,
) -> None:
    """创建 harmony/{short_name} 目录并替换占位符。
    
    Args:
        plugin_root: 插件根目录
        analysis: 模块分析结果
        module_kind: 模块类型（优先使用用户指定，None 时用 analysis.module_kind）
        force: 是否强制覆盖
        light: 是否轻量拷贝（跳过 node_modules 等）
    """
    if module_kind is None:
        module_kind = analysis.module_kind
    
    if module_kind == "js-only":
        print("  [跳过] js-only 模块，不创建 harmony 目录")
        return
    
    short_name = analysis.short_name
    camel_name = analysis.camel_name
    ohos_name = analysis.ohos_name
    
    src = os.path.join(paths.templates_dir(), "harmony", "library")
    ohos_dir = os.path.join(plugin_root, "ohos")
    dst = os.path.join(ohos_dir, "harmony", short_name)
    
    ohos_real = os.path.realpath(ohos_dir) if os.path.exists(ohos_dir) else ohos_dir
    dst_real = os.path.join(ohos_real, "harmony", short_name)
    
    print("=== create harmony ===")
    print(f"  src: {src}")
    print(f"  dst: {dst}")
    print(f"  short_name: {short_name}")
    print(f"  camel_name: {camel_name}")
    
    if not os.path.isdir(src):
        print(f"  [warn] harmony/library 模板不存在: {src}")
        return
    
    os.makedirs(os.path.dirname(dst_real), exist_ok=True)
    
    if os.path.isdir(dst_real):
        import shutil
        shutil.rmtree(dst_real)
        print(f"  已删除旧目录: {dst_real}")
    
    template_apply.copy_template_dir(src, dst_real, dry_run=False, force=False, log=print, full=not light)
    print(f"  已拷贝 harmony/{short_name} 模板")
    
    _replace_module_json5(dst_real, short_name)
    _replace_oh_package_json5(dst_real, ohos_name)
    _create_package_h(dst_real, short_name, camel_name)
    _replace_index_ets(dst_real, camel_name)
    _replace_cmake(dst_real, short_name)
    
    _cleanup_old_library(plugin_root, short_name)
    
    print("\nDone: harmony/{short_name} created.")


def _replace_module_json5(dst_real: str, short_name: str) -> None:
    """替换 module.json5 中的 library → short_name"""
    module_path = os.path.join(dst_real, "src", "main", "module.json5")
    if not os.path.isfile(module_path):
        return
    
    content = open(module_path, "r", encoding="utf-8").read()
    if '"name": "library"' in content or '"name":"library"' in content:
        content = content.replace('"name": "library"', f'"name": "{short_name}"')
        content = content.replace('"name":"library"', f'"name":"{short_name}"')
        open(module_path, "w", encoding="utf-8").write(content)
        print(f"  替换 module.json5: library -> {short_name}")


def _replace_oh_package_json5(dst_real: str, ohos_name: str) -> None:
    """替换 oh-package.json5 中的 {{NPM_NAME}}"""
    oh_pkg_path = os.path.join(dst_real, "oh-package.json5")
    if not os.path.isfile(oh_pkg_path):
        return
    
    content = open(oh_pkg_path, "r", encoding="utf-8").read()
    if "{{NPM_NAME}}" in content:
        content = content.replace("{{NPM_NAME}}", ohos_name)
        open(oh_pkg_path, "w", encoding="utf-8").write(content)
        print(f"  替换 oh-package.json5: {{NPM_NAME}} -> {ohos_name}")


def _create_package_h(dst_real: str, short_name: str, camel_name: str) -> None:
    """创建手写 Package.h 文件"""
    cpp_dir = os.path.join(dst_real, "src", "main", "cpp")
    os.makedirs(cpp_dir, exist_ok=True)
    
    package_h_path = os.path.join(cpp_dir, f"{camel_name}Package.h")
    package_h_content = f'''#ifndef {camel_name.upper()}PACKAGE_H
#define {camel_name.upper()}PACKAGE_H

#include "generated/RNOH/generated/Base{camel_name}Package.h"
#pragma once

namespace rnoh {{
class {camel_name}Package : public Base{camel_name}Package {{
    using Super = Base{camel_name}Package;
    using Super::Super;
}};
}} // namespace rnoh
#endif //{camel_name.upper()}PACKAGE_H
'''
    
    open(package_h_path, "w", encoding="utf-8").write(package_h_content)
    print(f"  创建 {camel_name}Package.h")


def _replace_index_ets(dst_real: str, camel_name: str) -> None:
    """替换 index.ets 中的 {{CAMEL_NAME}}"""
    index_path = os.path.join(dst_real, "index.ets")
    if not os.path.isfile(index_path):
        return
    
    content = open(index_path, "r", encoding="utf-8").read()
    if "{{CAMEL_NAME}}" in content:
        content = content.replace("{{CAMEL_NAME}}", camel_name)
        open(index_path, "w", encoding="utf-8").write(content)
        print(f"  替换 index.ets: {{CAMEL_NAME}} -> {camel_name}")


def _replace_cmake(dst_real: str, short_name: str) -> None:
    """替换 CMakeLists.txt 中的 {{SHORT_NAME}}"""
    cmake_path = os.path.join(dst_real, "src", "main", "cpp", "CMakeLists.txt")
    if not os.path.isfile(cmake_path):
        return
    
    content = open(cmake_path, "r", encoding="utf-8").read()
    if "{{SHORT_NAME}}" in content:
        content = content.replace("{{SHORT_NAME}}", short_name)
        open(cmake_path, "w", encoding="utf-8").write(content)
        print(f"  替换 CMakeLists.txt: {{SHORT_NAME}} -> {short_name}")


def _cleanup_old_library(plugin_root: str, short_name: str) -> None:
    """清理旧的 library 目录和 HAR（兼容旧版本）"""
    import shutil
    
    ohos_dir = os.path.join(plugin_root, "ohos")
    
    library_dir_old = os.path.join(ohos_dir, "harmony", "library")
    if os.path.isdir(library_dir_old) and short_name != "library":
        shutil.rmtree(library_dir_old)
        print("  删除旧 harmony/library/")
    
    library_har_old = os.path.join(ohos_dir, "harmony", "library.har")
    if os.path.isfile(library_har_old) and short_name != "library":
        os.remove(library_har_old)
        print("  删除旧 harmony/library.har")