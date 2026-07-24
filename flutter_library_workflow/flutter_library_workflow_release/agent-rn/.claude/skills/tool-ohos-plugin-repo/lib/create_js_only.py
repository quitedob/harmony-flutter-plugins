"""js-only 模块的 create 逻辑。

流程：
1. 使用短路径 + junction 创建 ohos 目录（空目录）
2. 拷贝 ohos 模板内容并根据 source_type/module_kind 裁剪
3. 调用 apply_ohos_js.py 处理内容（合并 package.json、拷贝源码）
4. 创建 example（不再需要单独处理 junction）

补充模式：
- 当 ohos 目录已存在时，检查并补充缺失的模板文件
"""

from __future__ import annotations

import json
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


def _update_example_tsconfig_paths(ohos_dir: str, example_dir: str) -> None:
    """更新 example/tsconfig.json 的 paths，将 alias 映射到真实包名
    
    Args:
        ohos_dir: ohos 目录路径（包含 package.json）
        example_dir: example 目录路径（包含 tsconfig.json）
    """
    ohos_pkg_path = os.path.join(ohos_dir, "package.json")
    example_tsconfig_path = os.path.join(example_dir, "tsconfig.json")
    
    if not os.path.isfile(ohos_pkg_path):
        return
    
    if not os.path.isfile(example_tsconfig_path):
        return
    
    try:
        with open(ohos_pkg_path, "r", encoding="utf-8") as f:
            ohos_pkg = json.load(f)
    except (json.JSONDecodeError, OSError):
        return
    
    package_name = ohos_pkg.get("name")
    harmony_info = ohos_pkg.get("harmony", {})
    if not isinstance(harmony_info, dict):
        return
    
    alias = harmony_info.get("alias")
    if not alias or not package_name:
        return
    
    try:
        with open(example_tsconfig_path, "r", encoding="utf-8") as f:
            tsconfig = json.load(f)
    except (json.JSONDecodeError, OSError):
        return
    
    if not isinstance(tsconfig, dict):
        return
    
    compiler_options = tsconfig.get("compilerOptions", {})
    if not isinstance(compiler_options, dict):
        compiler_options = {}
        tsconfig["compilerOptions"] = compiler_options
    
    compiler_options["baseUrl"] = "."
    compiler_options["paths"] = {
        alias: [f"./node_modules/{package_name}"]
    }
    
    try:
        with open(example_tsconfig_path, "w", encoding="utf-8") as f:
            json.dump(tsconfig, f, indent=2)
            f.write("\n")
    except OSError:
        return
    
    _thread_safe_print(f"  更新 example/tsconfig.json paths: {alias} -> ./node_modules/{package_name}")


_SKELETON_JS_TEMPLATE_FILES = [
    ".gitignore",
    "babel.config.js",
    "LICENSE",
    "README.md",
    "tsconfig.json",
]


def _replace_readme_placeholders(
    readme_path: str,
    ohos_name: str,
    npm_name: str,
    version: str,
    autolink: str,
    original_name: str = "",
    original_url: str = "",
) -> None:
    """替换 README.md 中的占位符（js-only 版本）。"""
    if not os.path.isfile(readme_path):
        return
    
    with open(readme_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    from lib.ohos_npm_config import LEGACY_OHOS_NPM_SCOPE, ohos_name_placeholder

    replacements = {
        ohos_name_placeholder(): ohos_name,
        f"{LEGACY_OHOS_NPM_SCOPE}/xxx": ohos_name,
        "见发布记录": version,
        "是/否": autolink,
        "original-package-name": npm_name,
    }
    
    if original_name:
        replacements["原始库名"] = original_name
    if original_url:
        replacements["原始库 GitHub 链接"] = original_url
    
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(content)
    
    _thread_safe_print(f"  替换 README.md 占位符")


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
    light: bool = False,
    force_example: bool = False,
) -> None:
    """检查并补充 ohos 目录缺失的模板文件（js-only 模块，增量拷贝）。"""
    global _LIGHT
    _LIGHT = light
    
    import json
    from lib import package_merge, source_resolver
    
    ohos_dir = os.path.join(plugin_root, "ohos")
    ohos_real = os.path.realpath(ohos_dir)
    
    if not os.path.isdir(ohos_real):
        _thread_safe_print("  ohos 目录不存在，无法补充")
        return
    
    skeleton_template = os.path.join(skill_root, "templates", "ohos")
    
    supplemented = 0
    
    readme_copied = False
    for filename in _SKELETON_JS_TEMPLATE_FILES:
        if _copy_if_missing(skeleton_template, ohos_real, filename, dry_run):
            supplemented += 1
            if filename == "README.md":
                readme_copied = True
    
    if readme_copied and not dry_run:
        parent_pkg_path = os.path.join(plugin_root, "package.json")
        if os.path.isfile(parent_pkg_path):
            with open(parent_pkg_path, "r", encoding="utf-8") as f:
                parent_pkg = json.load(f)
            npm_name = parent_pkg.get("name", "")
            ohos_name = package_merge.ohos_package_name_from_parent(npm_name, plugin_root)
            version = parent_pkg.get("version", "见发布记录")
            autolink = "是" if parent_pkg.get("harmony", {}).get("autolinking") else "否"
            original_name = parent_pkg.get("name", npm_name)
            repo = parent_pkg.get("repository", {})
            original_url = repo.get("url", "") if isinstance(repo, dict) else (repo if isinstance(repo, str) else "")
            homepage = parent_pkg.get("homepage", "")
            if homepage and not original_url:
                original_url = homepage
            
            readme_path = os.path.join(ohos_real, "README.md")
            _replace_readme_placeholders(
                readme_path,
                ohos_name=ohos_name,
                npm_name=npm_name,
                version=version,
                autolink=autolink,
                original_name=original_name,
                original_url=original_url,
            )
            supplemented += 1
    
    ohos_src_dir = os.path.join(ohos_real, "src")
    if not os.path.isdir(ohos_src_dir) or not any(os.listdir(ohos_src_dir) if os.path.isdir(ohos_src_dir) else []):
        _thread_safe_print("  ohos/src 目录不存在或为空，正在拷贝源码...")
        parent_pkg_path = os.path.join(plugin_root, "package.json")
        if os.path.isfile(parent_pkg_path):
            with open(parent_pkg_path, "r", encoding="utf-8") as f:
                pkg = json.load(f)
            
            files, source_dir = source_resolver.resolve_source_files(plugin_root, pkg)
            if files:
                _thread_safe_print(f"    source_dir: {source_dir or '根目录'}")
                _thread_safe_print(f"    resolved {len(files)} files")
                source_resolver.copy_source_to_ohos(plugin_root, ohos_dir, files, source_dir, pkg, dry_run)
                supplemented += 1
    else:
        _thread_safe_print("  ohos/src 目录已存在且有文件，跳过源码拷贝")
    
    dst_example = os.path.join(ohos_real, "example")
    example_needs_regen = not os.path.isdir(dst_example)
    if not example_needs_regen and not force_example:
        key_files = [
            "package.json",
            "harmony/entry/src/main/ets/pages/Index.ets",
        ]
        for rel in key_files:
            if not os.path.isfile(os.path.join(dst_example, rel)):
                example_needs_regen = True
                _thread_safe_print(f"  检测到 example 缺失文件: {rel}")
                break
    
    src_example = os.path.join(skill_root, "templates", "example")
    if example_needs_regen or force_example:
        if dry_run:
            _thread_safe_print(f"  [dry-run] would run apply_example_js.py")
        else:
            apply_example = os.path.join(tool_dir, "apply_example_js.py")
            example_args = ["--plugin-root", plugin_root]
            if force_example:
                example_args.append("--force")
            elif os.path.isdir(dst_example):
                example_args.append("--skip-template")
            if _LIGHT:
                example_args.append("--light")
            _run_python(apply_example, example_args, cwd=plugin_root)
            supplemented += 1
    elif os.path.isdir(dst_example) and os.path.isdir(src_example):
        from lib.incremental_copy import copy_tree_incremental, ensure_dependency_dirs_under

        n_ex = copy_tree_incremental(src_example, dst_example, dry_run, log=_thread_safe_print)
        n_ex += ensure_dependency_dirs_under(dst_example, dry_run=dry_run, log=_thread_safe_print)
        if n_ex > 0:
            supplemented += n_ex
            _thread_safe_print(f"  补充 example 共 {n_ex} 项")
        
        # 增量补充时更新 example/tsconfig.json 的 paths（映射 alias 到真实包名）
        if not dry_run:
            _update_example_tsconfig_paths(ohos_real, dst_example)

    if supplemented == 0:
        _thread_safe_print("  所有模板文件已存在，无需补充")
    else:
        _thread_safe_print(f"  共补充 {supplemented} 个缺失项")


def run_create_js_only(
    plugin_root: str,
    tool_dir: str,
    force: bool = False,
    dry_run: bool = False,
    light: bool = False,
) -> None:
    """js-only 模块 create：ohos junction + ohos template + 源码拷贝 + example"""
    global _PLUGIN_ROOT, _TOOL_DIR, _FORCE, _DRY_RUN, _LIGHT

    _PLUGIN_ROOT = plugin_root
    _TOOL_DIR = tool_dir
    _FORCE = force
    _DRY_RUN = dry_run
    _LIGHT = light

    from lib import ohos_junction, template_apply
    import shutil

    skill_root = os.path.dirname(tool_dir)
    template_path = os.path.join(skill_root, "templates", "ohos")

    ohos_dir = os.path.join(plugin_root, "ohos")

    if dry_run:
        _thread_safe_print("  [dry-run] would create ohos junction + template + source + example")
        return

    ohos_junction.create_ohos_junction(plugin_root, force)

    template_apply.copy_template_dir(template_path, ohos_dir, dry_run=False, force=True, log=print, full=not light)

    # 替换 README.md 占位符
    import json
    parent_pkg_path = os.path.join(plugin_root, "package.json")
    if os.path.isfile(parent_pkg_path):
        with open(parent_pkg_path, "r", encoding="utf-8") as f:
            parent_pkg = json.load(f)
        npm_name = parent_pkg.get("name", "")
        from lib import package_merge

        ohos_name = package_merge.ohos_package_name_from_parent(npm_name, plugin_root)
        version = parent_pkg.get("version", "见发布记录")
        autolink = "是" if parent_pkg.get("harmony", {}).get("autolinking") else "否"
        original_name = parent_pkg.get("name", npm_name)
        repo = parent_pkg.get("repository", {})
        original_url = repo.get("url", "") if isinstance(repo, dict) else (repo if isinstance(repo, str) else "")
        homepage = parent_pkg.get("homepage", "")
        if homepage and not original_url:
            original_url = homepage
        
        readme_path = os.path.join(ohos_dir, "README.md")
        _replace_readme_placeholders(
            readme_path,
            ohos_name=ohos_name,
            npm_name=npm_name,
            version=version,
            autolink=autolink,
            original_name=original_name,
            original_url=original_url,
        )

    apply_ohos_js = os.path.join(tool_dir, "apply_ohos_js.py")
    ohos_args = ["--plugin-root", plugin_root, "--skip-template"]
    _run_python(apply_ohos_js, ohos_args, cwd=plugin_root)

    apply_example = os.path.join(tool_dir, "apply_example_js.py")
    example_args = ["--plugin-root", plugin_root]
    if force:
        example_args.append("--force")
    _run_python(apply_example, example_args, cwd=plugin_root)

    _thread_safe_print("\nDone: created ohos/ + ohos/example (js-only mode).")