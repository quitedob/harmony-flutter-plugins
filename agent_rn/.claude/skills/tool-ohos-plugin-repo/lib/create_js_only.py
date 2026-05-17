"""js-only 模块的 create 逻辑。

流程：
1. 使用短路径 + junction 创建 ohos 目录（空目录）
2. 拷贝 ohos_skeleton_js 模板内容
3. 调用 apply_ohos_js.py 处理内容（合并 package.json、拷贝源码）
4. 创建 example（不再需要单独处理 junction）

补充模式：
- 当 ohos 目录已存在时，检查并补充缺失的模板文件
"""

from __future__ import annotations

import os
import subprocess
import sys
from shutil import which

_PLUGIN_ROOT: str = ""
_TOOL_DIR: str = ""
_FORCE: bool = False
_DRY_RUN: bool = False


def _resolve_cmd(cmd: str) -> str:
    if sys.platform != "win32":
        return cmd
    if os.path.splitext(cmd)[1]:
        return cmd
    resolved = which(cmd)
    if resolved:
        return resolved
    return cmd


def _run_python(script: str, args: list[str], cwd: str) -> None:
    resolved = [_resolve_cmd(sys.executable), script] + args
    subprocess.run(resolved, cwd=cwd, check=True)


def _thread_safe_print(msg: str) -> None:
    print(msg)


_SKELETON_JS_TEMPLATE_FILES = [
    ".gitignore",
    "babel.config.js",
    "LICENSE",
    "README.md",
    "tsconfig.json",
]


def _copy_if_missing(src_dir: str, dst_dir: str, filename: str, dry_run: bool) -> bool:
    """如果目标文件不存在，从模板拷贝。返回是否拷贝了文件。"""
    src_file = os.path.join(src_dir, filename)
    dst_file = os.path.join(dst_dir, filename)
    
    if not os.path.isfile(src_file):
        return False
    
    if os.path.isfile(dst_file):
        return False
    
    if dry_run:
        _thread_safe_print(f"  [dry-run] would copy {filename}")
        return True
    
    import shutil
    os.makedirs(os.path.dirname(dst_file), exist_ok=True)
    shutil.copy2(src_file, dst_file)
    _thread_safe_print(f"  补充缺失文件: {filename}")
    return True


def supplement_missing_files(
    plugin_root: str,
    tool_dir: str,
    skill_root: str,
    dry_run: bool = False,
) -> None:
    """检查并补充 ohos 目录缺失的模板文件（js-only 模块）。"""
    ohos_dir = os.path.join(plugin_root, "ohos")
    ohos_real = os.path.realpath(ohos_dir)
    
    if not os.path.isdir(ohos_real):
        _thread_safe_print("  ohos 目录不存在，无法补充")
        return
    
    skeleton_template = os.path.join(skill_root, "templates", "ohos_skeleton_js")
    
    supplemented = 0
    
    for filename in _SKELETON_JS_TEMPLATE_FILES:
        if _copy_if_missing(skeleton_template, ohos_real, filename, dry_run):
            supplemented += 1
    
    dst_example = os.path.join(ohos_real, "example")
    if not os.path.isdir(dst_example):
        if dry_run:
            _thread_safe_print(f"  [dry-run] would run apply_example_js.py")
        else:
            apply_example_js = os.path.join(tool_dir, "apply_example_js.py")
            example_args = ["--plugin-root", plugin_root]
            _run_python(apply_example_js, example_args, cwd=plugin_root)
            supplemented += 1
    
    if supplemented == 0:
        _thread_safe_print("  所有模板文件已存在，无需补充")
    else:
        _thread_safe_print(f"  共补充 {supplemented} 个缺失项")


def run_create_js_only(
    plugin_root: str,
    tool_dir: str,
    force: bool = False,
    dry_run: bool = False,
) -> None:
    """js-only 模块 create：ohos junction + ohos_skeleton_js 内容 + 源码拷贝 + example"""
    global _PLUGIN_ROOT, _TOOL_DIR, _FORCE, _DRY_RUN

    _PLUGIN_ROOT = plugin_root
    _TOOL_DIR = tool_dir
    _FORCE = force
    _DRY_RUN = dry_run

    from lib import ohos_junction, template_apply
    import shutil

    skill_root = os.path.dirname(tool_dir)
    template_path = os.path.join(skill_root, "templates", "ohos_skeleton_js")

    ohos_dir = os.path.join(plugin_root, "ohos")

    if dry_run:
        _thread_safe_print("  [dry-run] would create ohos junction + template + source + example")
        return

    ohos_junction.create_ohos_junction(plugin_root, force)

    template_apply.copy_template_dir(template_path, ohos_dir, dry_run=False, force=True, log=print, full=True)

    apply_ohos_js = os.path.join(tool_dir, "apply_ohos_js.py")
    ohos_args = ["--plugin-root", plugin_root, "--skip-template"]
    _run_python(apply_ohos_js, ohos_args, cwd=plugin_root)

    apply_example_js = os.path.join(tool_dir, "apply_example_js.py")
    example_args = ["--plugin-root", plugin_root]
    if force:
        example_args.append("--force")
    _run_python(apply_example_js, example_args, cwd=plugin_root)

    _thread_safe_print("\nDone: created ohos/ + ohos/example (js-only mode).")