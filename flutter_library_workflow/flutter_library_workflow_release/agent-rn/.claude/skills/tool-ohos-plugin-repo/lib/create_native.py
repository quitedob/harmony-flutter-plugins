"""原生模块的 create 逻辑。

流程：
1. 使用短路径 + junction 创建 ohos 目录（空目录）
2. 调用 apply_ohos_skeleton.py 处理内容（合并 package.json、拷贝 specs、源码）
3. 拷贝 harmony/{short_name} 模板（动态命名）
4. 创建 example（不再需要单独处理 junction）
5. 拷贝 har_wrapper 模板

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
_SKILL_ROOT: str = ""
_FORCE: bool = False
_DRY_RUN: bool = False
_SHORT_NAME: str = ""


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


_SKELETON_TEMPLATE_FILES = [
    ".gitignore",
    "babel.config.js",
    "LICENSE",
    "README.md",
    "tsconfig.json",
    "package.json",
    "package-lock.json",
]


_README_PLACEHOLDERS = {
    # ohos_name placeholder key filled at runtime via ohos_npm_config.ohos_name_placeholder()
    "原始库名": "original_name",
    "原始库 GitHub 链接": "original_url",
    "见发布记录": "version",
    "是/否": "autolink",
    "original-package-name": "npm_name",
    "xxx": "short_name",
    "XxxPackage": "camel_name",
}


def _replace_readme_placeholders(
    readme_path: str,
    ohos_name: str,
    npm_name: str,
    short_name: str,
    camel_name: str,
    version: str,
    autolink: str,
    original_name: str = "",
    original_url: str = "",
) -> None:
    """替换 README.md 中的占位符。"""
    if not os.path.isfile(readme_path):
        return
    
    with open(readme_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    from lib.ohos_npm_config import LEGACY_OHOS_NPM_SCOPE, ohos_name_placeholder

    replacements = {
        ohos_name_placeholder(): ohos_name,
        f"{LEGACY_OHOS_NPM_SCOPE}/xxx": ohos_name,
        "xxx": short_name,
        "XxxPackage": f"{camel_name}Package",
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
    """检查并补充 ohos 目录缺失的模板文件（增量拷贝，不覆盖已有文件）。"""
    global _LIGHT
    _LIGHT = light
    
    ohos_dir = os.path.join(plugin_root, "ohos")
    ohos_real = os.path.realpath(ohos_dir)
    
    if not os.path.isdir(ohos_real):
        _thread_safe_print("  ohos 目录不存在，无法补充")
        return
    
    supplemented = 0
    package_json_copied = False
    
    # 检查 ohos/src 是否存在，如果不存在则调用 apply_ohos_skeleton 生成源码
    ohos_src_dir = os.path.join(ohos_real, "src")
    if not os.path.isdir(ohos_src_dir):
        _thread_safe_print("  ohos/src 目录不存在，正在生成源码...")
        apply_ohos_skeleton = os.path.join(tool_dir, "apply_ohos_skeleton.py")
        skeleton_args = ["--plugin-root", plugin_root, "--skip-template"]
        _run_python(apply_ohos_skeleton, skeleton_args, cwd=plugin_root)
        supplemented += 1
    
    # 推导 short_name
    parent_pkg_path = os.path.join(plugin_root, "package.json")
    if os.path.isfile(parent_pkg_path):
        import json
        with open(parent_pkg_path, "r", encoding="utf-8") as f:
            parent_pkg = json.load(f)
        npm_name = parent_pkg.get("name", "")
        
        # 注入 autolinking 配置到根目录 package.json（如果缺失）
        if npm_name and not dry_run:
            harmony_field = parent_pkg.get("harmony", {})
            if isinstance(harmony_field, dict) and "autolinking" not in harmony_field:
                from lib import package_merge
                autolinking_config = package_merge.generate_autolinking_config(npm_name)
                if autolinking_config:
                    harmony_field["autolinking"] = autolinking_config
                    parent_pkg["harmony"] = harmony_field
                    json.dump(parent_pkg, open(parent_pkg_path, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
                    _thread_safe_print(f"  补充 harmony.autolinking 配置到 package.json")
                    supplemented += 1
    else:
        npm_name = ""
    from lib import package_merge
    short_name = package_merge.derive_package_short_name(npm_name)
    
    skeleton_template = os.path.join(skill_root, "templates", "ohos")
    
    readme_copied = False
    for filename in _SKELETON_TEMPLATE_FILES:
        if _copy_if_missing(skeleton_template, ohos_real, filename, dry_run):
            supplemented += 1
            if filename == "package.json":
                package_json_copied = True
            if filename == "README.md":
                readme_copied = True
    
    # 如果拷贝了 README.md，需要替换占位符
    if readme_copied and not dry_run:
        readme_path = os.path.join(ohos_real, "README.md")
        ohos_name = package_merge.ohos_package_name_from_parent(npm_name)
        camel_name = package_merge.derive_camel_case_name(short_name)
        version = parent_pkg.get("version", "见发布记录")
        autolink = "是" if parent_pkg.get("harmony", {}).get("autolinking") else "否"
        original_name = parent_pkg.get("name", npm_name)
        repo = parent_pkg.get("repository", {})
        original_url = repo.get("url", "") if isinstance(repo, dict) else (repo if isinstance(repo, str) else "")
        homepage = parent_pkg.get("homepage", "")
        if homepage and not original_url:
            original_url = homepage
        
        _replace_readme_placeholders(
            readme_path,
            ohos_name=ohos_name,
            npm_name=npm_name,
            short_name=short_name,
            camel_name=camel_name,
            version=version,
            autolink=autolink,
            original_name=original_name,
            original_url=original_url,
        )
        supplemented += 1
    
    # 如果拷贝了 package.json，需要动态生成 codegen 配置并替换占位符
    if package_json_copied and not dry_run:
        ohos_pkg_path = os.path.join(ohos_real, "package.json")
        parent_pkg_path = os.path.join(plugin_root, "package.json")
        if os.path.isfile(ohos_pkg_path):
            from lib import package_merge
            
            # 动态生成 codegen 配置
            codegen_config = package_merge.generate_codegen_config_from_specs(ohos_real, short_name)
            
            # 加载并替换占位符
            ohos_pkg = json.load(open(ohos_pkg_path, "r", encoding="utf-8"))
            
            # 替换 {{SHORT_NAME}} 和 {{CODEGEN_CONFIG}}
            if "scripts" in ohos_pkg and "codegen-lib" in ohos_pkg["scripts"]:
                scripts = ohos_pkg["scripts"]
                # 替换 SHORT_NAME
                for key, value in scripts.items():
                    if isinstance(value, str) and "{{SHORT_NAME}}" in value:
                        scripts[key] = value.replace("{{SHORT_NAME}}", short_name)
                
                # 替换 CODEGEN_CONFIG
                if "{{CODEGEN_CONFIG}}" in scripts.get("codegen-lib", ""):
                    scripts["codegen-lib"] = codegen_config
                
                ohos_pkg["scripts"] = scripts
                json.dump(ohos_pkg, open(ohos_pkg_path, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
                _thread_safe_print(f"  动态生成 codegen 配置: {codegen_config}")
            
            # 合并父 package.json
            if os.path.isfile(parent_pkg_path):
                package_merge.merge_parent_into_ohos_package(plugin_root, ohos_pkg_path, dry_run=False)
    
    # 即使 package.json 已存在，也要检查并补充 autolinking 和 codegen 配置
    if not package_json_copied and not dry_run:
        ohos_pkg_path = os.path.join(ohos_real, "package.json")
        parent_pkg_path = os.path.join(plugin_root, "package.json")
        if os.path.isfile(ohos_pkg_path) and os.path.isfile(parent_pkg_path):
            from lib import package_merge
            ohos_pkg = package_merge._load_json(ohos_pkg_path)
            parent_pkg = package_merge._load_json(parent_pkg_path)
            
            # 检查是否缺失 autolinking 配置
            harmony = ohos_pkg.get("harmony", {})
            if isinstance(harmony, dict) and "autolinking" not in harmony:
                parent_harmony = parent_pkg.get("harmony", {})
                if isinstance(parent_harmony, dict) and "autolinking" in parent_harmony:
                    # 从根目录拷贝
                    harmony["autolinking"] = parent_harmony["autolinking"]
                else:
                    # 自动生成
                    pn = parent_pkg.get("name")
                    if isinstance(pn, str) and pn.strip():
                        autolinking = package_merge.generate_autolinking_config(pn)
                        if autolinking:
                            harmony["autolinking"] = autolinking
                
                if "autolinking" in harmony:
                    ohos_pkg["harmony"] = harmony
                    package_merge._save_json(ohos_pkg_path, ohos_pkg)
                    _thread_safe_print(f"  补充 ohos/package.json 中的 autolinking 配置")
                    supplemented += 1
            
            # 检查是否需要更新 codegen 配置（如果包含 {{CODEGEN_CONFIG}} 占位符）
            scripts = ohos_pkg.get("scripts", {})
            if "codegen-lib" in scripts:
                codegen_script = scripts["codegen-lib"]
                if "{{CODEGEN_CONFIG}}" in codegen_script:
                    # 动态生成 codegen 配置
                    codegen_config = package_merge.generate_codegen_config_from_specs(ohos_real, short_name)
                    scripts["codegen-lib"] = codegen_config
                    ohos_pkg["scripts"] = scripts
                    package_merge._save_json(ohos_pkg_path, ohos_pkg)
                    _thread_safe_print(f"  动态生成 codegen 配置: {codegen_config}")
                    supplemented += 1
    
    from lib.incremental_copy import copy_tree_incremental, ensure_dependency_dirs_under

    # 动态目录名 harmony/{short_name}，逐文件增量拷贝
    dst_library = os.path.join(ohos_real, "harmony", short_name)
    src_library = os.path.join(skill_root, "templates", "harmony", "library")
    if os.path.isdir(src_library):
        os.makedirs(dst_library, exist_ok=True)
        cmake_replacements = {"CMakeLists.txt": {"{{SHORT_NAME}}": short_name}}
        n = copy_tree_incremental(
            src_library,
            dst_library,
            dry_run,
            ignore_patterns=("build", ".cxx"),
            replacements=cmake_replacements,
            log=_thread_safe_print,
        )
        n += ensure_dependency_dirs_under(dst_library, dry_run=dry_run, log=_thread_safe_print)
        if n > 0:
            supplemented += n
            _thread_safe_print(f"  补充 harmony/{short_name} 共 {n} 项")
        
        # 替换 module.json5 中的 name 字段
        module_json5_path = os.path.join(dst_library, "src", "main", "module.json5")
        if os.path.isfile(module_json5_path) and not dry_run:
            module_content = open(module_json5_path, "r", encoding="utf-8").read()
            if '"name": "library"' in module_content or '"name":"library"' in module_content:
                module_content = module_content.replace('"name": "library"', f'"name": "{short_name}"')
                module_content = module_content.replace('"name":"library"', f'"name":"{short_name}"')
                open(module_json5_path, "w", encoding="utf-8").write(module_content)
                _thread_safe_print(f"  替换 module.json5 name: library -> {short_name}")

        # 替换 oh-package.json5 中的 {{NPM_NAME}}（与全量 create 一致；增量拷贝不会自动替换）
        oh_pkg_path = os.path.join(dst_library, "oh-package.json5")
        if os.path.isfile(oh_pkg_path) and not dry_run:
            oh_pkg_content = open(oh_pkg_path, "r", encoding="utf-8").read()
            if "{{NPM_NAME}}" in oh_pkg_content:
                from lib.ohos_npm_config import default_ohos_library_package_name

                ohos_name = (
                    package_merge.ohos_package_name_from_parent(npm_name, plugin_root)
                    if npm_name
                    else default_ohos_library_package_name(plugin_root)
                )
                oh_pkg_content = oh_pkg_content.replace("{{NPM_NAME}}", ohos_name)
                open(oh_pkg_path, "w", encoding="utf-8").write(oh_pkg_content)
                _thread_safe_print(f"  替换 oh-package.json5: {{NPM_NAME}} -> {ohos_name}")
        
        # 替换已存在的 CMakeLists.txt 中的 {{SHORT_NAME}} 或旧的 library target
        cmake_path = os.path.join(dst_library, "src", "main", "cpp", "CMakeLists.txt")
        if os.path.isfile(cmake_path) and not dry_run:
            cmake_content = open(cmake_path, "r", encoding="utf-8").read()
            if "{{SHORT_NAME}}" in cmake_content:
                cmake_content = cmake_content.replace("{{SHORT_NAME}}", short_name)
                open(cmake_path, "w", encoding="utf-8").write(cmake_content)
                _thread_safe_print(f"  替换 CMakeLists.txt target: {{SHORT_NAME}} -> {short_name}")
    
    # 兜底清理旧的 library 目录和 HAR（兼容旧版本）
    library_dir_old = os.path.join(ohos_real, "harmony", "library")
    if os.path.isdir(library_dir_old) and short_name != "library":
        shutil.rmtree(library_dir_old)
        _thread_safe_print(f"  removed old harmony/library/")
    
    library_har_old = os.path.join(ohos_real, "harmony", "library.har")
    if os.path.isfile(library_har_old) and short_name != "library":
        os.remove(library_har_old)
        _thread_safe_print(f"  removed old harmony/library.har")
    
    # 检查并补充手写 Package.h 文件
    if short_name and short_name != "library":
        camel_name = package_merge.derive_camel_case_name(short_name) if "package_merge" in dir() else short_name.replace("_", " ").title().replace(" ", "")
        package_h_path = os.path.join(dst_library, "src", "main", "cpp", f"{camel_name}Package.h")
        if not os.path.isfile(package_h_path) and not dry_run:
            from lib import package_merge
            camel_name = package_merge.derive_camel_case_name(short_name)
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
            os.makedirs(os.path.dirname(package_h_path), exist_ok=True)
            open(package_h_path, "w", encoding="utf-8").write(package_h_content)
            _thread_safe_print(f"  补充手写 Package.h: {camel_name}Package.h")
            supplemented += 1
        
        # 检查并替换 index.ets 中的 {{CAMEL_NAME}}
        index_ets_path = os.path.join(dst_library, "index.ets")
        if os.path.isfile(index_ets_path) and not dry_run:
            index_ets_content = open(index_ets_path, "r", encoding="utf-8").read()
            if "{{CAMEL_NAME}}" in index_ets_content:
                from lib import package_merge
                camel_name = package_merge.derive_camel_case_name(short_name)
                index_ets_content = index_ets_content.replace("{{CAMEL_NAME}}", camel_name)
                open(index_ets_path, "w", encoding="utf-8").write(index_ets_content)
                _thread_safe_print(f"  替换 index.ets: {{CAMEL_NAME}} -> {camel_name}")
    
    dst_example = os.path.join(ohos_real, "example")
    # 检查 example 是否需要重新生成（目录不存在，或关键文件缺失，或 force_example=True）
    example_needs_regen = not os.path.isdir(dst_example)
    if not example_needs_regen and not force_example:
        # 检查关键文件是否存在
        key_files = [
            "package.json",
            "harmony/entry/src/main/cpp/CMakeLists.txt",
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
            _thread_safe_print(f"  [dry-run] would run apply_example_auto.py")
        else:
            apply_example = os.path.join(tool_dir, "apply_example_auto.py")
            example_args = ["--plugin-root", plugin_root]
            if force_example:
                example_args.append("--force")
            if _LIGHT:
                example_args.append("--light")
            _run_python(apply_example, example_args, cwd=plugin_root)
            supplemented += 1
    elif os.path.isdir(dst_example) and os.path.isdir(src_example):
        n_ex = copy_tree_incremental(src_example, dst_example, dry_run, log=_thread_safe_print)
        n_ex += ensure_dependency_dirs_under(dst_example, dry_run=dry_run, log=_thread_safe_print)
        if n_ex > 0:
            supplemented += n_ex
            _thread_safe_print(f"  补充 example 共 {n_ex} 项")
        
        # 增量补充时更新 example/tsconfig.json 的 paths（映射 alias 到真实包名）
        if not dry_run:
            _update_example_tsconfig_paths(ohos_real, dst_example)
    
    # har_wrapper 增量拷贝 + 替换占位符 + 重命名 library 目录
    dst_wrapper = os.path.join(ohos_real, ".rn-build", "har_wrapper")
    src_wrapper = os.path.join(skill_root, "templates", "har_wrapper")
    if os.path.isdir(src_wrapper):
        os.makedirs(dst_wrapper, exist_ok=True)
        # 删除可能存在的错误目录 {{SHORT_NAME}}
        wrong_dir = os.path.join(dst_wrapper, "{{SHORT_NAME}}")
        if os.path.isdir(wrong_dir) and not dry_run:
            import shutil
            shutil.rmtree(wrong_dir)
            _thread_safe_print(f"  删除错误目录: har_wrapper/{{SHORT_NAME}}")
        
        n = copy_tree_incremental(
            src_wrapper,
            dst_wrapper,
            dry_run,
            ignore_patterns=("library",),
            log=_thread_safe_print,
        )
        n += ensure_dependency_dirs_under(dst_wrapper, dry_run=dry_run, log=_thread_safe_print)
        if n > 0:
            supplemented += n
            _thread_safe_print(f"  补充 .rn-build/har_wrapper 共 {n} 项")
        
        # 替换 build-profile.json5 中的 {{SHORT_NAME}}
        bp_path = os.path.join(dst_wrapper, "build-profile.json5")
        if os.path.isfile(bp_path) and not dry_run:
            bp_content = open(bp_path, "r", encoding="utf-8").read()
            if "{{SHORT_NAME}}" in bp_content:
                bp_content = bp_content.replace("{{SHORT_NAME}}", short_name)
                open(bp_path, "w", encoding="utf-8").write(bp_content)
                _thread_safe_print(f"  替换 har_wrapper/build-profile.json5: {{SHORT_NAME}} -> {short_name}")
        
        # 拷贝并重命名 library 目录为 {short_name}
        src_library_in_wrapper = os.path.join(src_wrapper, "library")
        dst_library_in_wrapper = os.path.join(dst_wrapper, short_name)
        if os.path.isdir(src_library_in_wrapper):
            os.makedirs(dst_library_in_wrapper, exist_ok=True)
            cmake_replacements_wrapper = {"CMakeLists.txt": {"{{SHORT_NAME}}": short_name}}
            n_lib = copy_tree_incremental(
                src_library_in_wrapper,
                dst_library_in_wrapper,
                dry_run,
                replacements=cmake_replacements_wrapper,
                log=_thread_safe_print,
            )
            n_lib += ensure_dependency_dirs_under(
                dst_library_in_wrapper, dry_run=dry_run, log=_thread_safe_print
            )
            if n_lib > 0:
                _thread_safe_print(f"  补充 har_wrapper/{short_name} 共 {n_lib} 项")
                supplemented += n_lib
        
        # 无论目录是新建还是已存在，都检查 module.json5 的 name 是否正确
        dst_library_in_wrapper_check = os.path.join(dst_wrapper, short_name)
        if os.path.isdir(dst_library_in_wrapper_check) and not dry_run:
            wrapper_module_path = os.path.join(dst_library_in_wrapper_check, "src", "main", "module.json5")
            if os.path.isfile(wrapper_module_path):
                wrapper_module_content = open(wrapper_module_path, "r", encoding="utf-8").read()
                if '"name": "library"' in wrapper_module_content or '"name":"library"' in wrapper_module_content:
                    wrapper_module_content = wrapper_module_content.replace('"name": "library"', f'"name": "{short_name}"')
                    wrapper_module_content = wrapper_module_content.replace('"name":"library"', f'"name":"{short_name}"')
                    open(wrapper_module_path, "w", encoding="utf-8").write(wrapper_module_content)
                    _thread_safe_print(f"  替换 har_wrapper/{short_name}/module.json5: library -> {short_name}")
            
            # 替换 har_wrapper CMakeLists.txt 中的 {{SHORT_NAME}}
            wrapper_cmake_path = os.path.join(dst_library_in_wrapper_check, "src", "main", "cpp", "CMakeLists.txt")
            if os.path.isfile(wrapper_cmake_path):
                wrapper_cmake_content = open(wrapper_cmake_path, "r", encoding="utf-8").read()
                if "{{SHORT_NAME}}" in wrapper_cmake_content:
                    wrapper_cmake_content = wrapper_cmake_content.replace("{{SHORT_NAME}}", short_name)
                    open(wrapper_cmake_path, "w", encoding="utf-8").write(wrapper_cmake_content)
                    _thread_safe_print(f"  替换 har_wrapper/{short_name}/CMakeLists.txt: {{SHORT_NAME}} -> {short_name}")

            from lib.ohos_package_sync import write_oh_package_json5_name

            har_oh_pkg = os.path.join(dst_library_in_wrapper_check, "oh-package.json5")
            write_oh_package_json5_name(
                har_oh_pkg,
                package_merge.ohos_package_name_from_parent(npm_name, plugin_root),
                log=_thread_safe_print,
            )
    
    if not dry_run and os.path.isdir(ohos_real):
        from lib.ohos_package_sync import sync_plugin_oh_package_names

        sync_plugin_oh_package_names(
            plugin_root, short_name=short_name, log=_thread_safe_print
        )

    if supplemented == 0:
        _thread_safe_print("  所有模板文件已存在，无需补充")
    else:
        _thread_safe_print(f"  共补充 {supplemented} 个缺失项")


def run_create_native(
    plugin_root: str,
    tool_dir: str,
    skill_root: str,
    force: bool = False,
    dry_run: bool = False,
    light: bool = False,
) -> None:
    """原生模块 create：ohos junction + apply_ohos_skeleton + harmony/{short_name} + example + har_wrapper"""
    global _PLUGIN_ROOT, _TOOL_DIR, _SKILL_ROOT, _FORCE, _DRY_RUN, _LIGHT, _SHORT_NAME

    _PLUGIN_ROOT = plugin_root
    _TOOL_DIR = tool_dir
    _SKILL_ROOT = skill_root
    _FORCE = force
    _DRY_RUN = dry_run
    _LIGHT = light

    from lib import ohos_junction, package_merge, template_apply
    import shutil

    # 读取 npm 包名并推导 short_name
    parent_pkg_path = os.path.join(plugin_root, "package.json")
    if os.path.isfile(parent_pkg_path):
        with open(parent_pkg_path, "r", encoding="utf-8") as f:
            parent_pkg = json.load(f)
        npm_name = parent_pkg.get("name", "")
        _SHORT_NAME = package_merge.derive_package_short_name(npm_name)
        
        # 注入 autolinking 配置到根目录 package.json
        if npm_name and not dry_run:
            harmony_field = parent_pkg.get("harmony", {})
            if isinstance(harmony_field, dict) and "autolinking" not in harmony_field:
                autolinking_config = package_merge.generate_autolinking_config(npm_name)
                if autolinking_config:
                    harmony_field["autolinking"] = autolinking_config
                    parent_pkg["harmony"] = harmony_field
                    json.dump(parent_pkg, open(parent_pkg_path, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
                    _thread_safe_print(f"  已添加 harmony.autolinking 配置到 package.json")
    else:
        _SHORT_NAME = "library"

    if dry_run:
        _thread_safe_print("  [dry-run] would create ohos junction + apply_ohos_skeleton + harmony/{short_name} + example + har_wrapper")
        return

    ohos_junction.create_ohos_junction(plugin_root, force)

    # 动态目录名 harmony/{short_name}
    dst_library = os.path.join(plugin_root, "ohos", "harmony", _SHORT_NAME)
    src_library = os.path.join(skill_root, "templates", "harmony", "library")
    dst_library_real = os.path.realpath(dst_library)
    if os.path.isdir(src_library):
        os.makedirs(os.path.dirname(dst_library_real), exist_ok=True)
        if os.path.isdir(dst_library_real):
            shutil.rmtree(dst_library_real)
        template_apply.copy_template_dir(src_library, dst_library_real, dry_run=False, force=False, log=_thread_safe_print, full=not _LIGHT)
        _thread_safe_print(f"  copied harmony/{_SHORT_NAME} template")
        
        # 替换 harmony/{short_name} 中的 module.json5 name 字段
        harmony_module_path = os.path.join(dst_library_real, "src", "main", "module.json5")
        if os.path.isfile(harmony_module_path):
            harmony_module_content = open(harmony_module_path, "r", encoding="utf-8").read()
            if '"name": "library"' in harmony_module_content or '"name":"library"' in harmony_module_content:
                harmony_module_content = harmony_module_content.replace('"name": "library"', f'"name": "{_SHORT_NAME}"')
                harmony_module_content = harmony_module_content.replace('"name":"library"', f'"name":"{_SHORT_NAME}"')
                open(harmony_module_path, "w", encoding="utf-8").write(harmony_module_content)
                _thread_safe_print(f"  替换 harmony/{_SHORT_NAME}/module.json5: library -> {_SHORT_NAME}")

        from lib.permission_from_planning import apply_permissions_from_planning

        apply_permissions_from_planning(plugin_root, _SHORT_NAME, log=_thread_safe_print)
        
        # 兜底清理旧的 library 目录和 HAR（兼容旧版本）
        library_dir_old = os.path.join(plugin_root, "ohos", "harmony", "library")
        if os.path.isdir(library_dir_old) and _SHORT_NAME != "library":
            shutil.rmtree(library_dir_old)
            _thread_safe_print("  removed old harmony/library/")
        
        library_har_old = os.path.join(plugin_root, "ohos", "harmony", "library.har")
        if os.path.isfile(library_har_old) and _SHORT_NAME != "library":
            os.remove(library_har_old)
            _thread_safe_print("  removed old harmony/library.har")
        
        # 替换 oh-package.json5 中的 {{NPM_NAME}}
        oh_pkg_path = os.path.join(dst_library_real, "oh-package.json5")
        if os.path.isfile(oh_pkg_path):
            oh_pkg_content = open(oh_pkg_path, "r", encoding="utf-8").read()
            from lib.ohos_npm_config import default_ohos_library_package_name

            npm_full_name = (
                package_merge.ohos_package_name_from_parent(npm_name, plugin_root)
                if npm_name
                else default_ohos_library_package_name(plugin_root)
            )
            oh_pkg_content = oh_pkg_content.replace("{{NPM_NAME}}", npm_full_name)
            open(oh_pkg_path, "w", encoding="utf-8").write(oh_pkg_content)
            _thread_safe_print(f"  替换 oh-package.json5 name: {npm_full_name}")
        
        # 创建手写 Package.h 文件
        camel_name = package_merge.derive_camel_case_name(_SHORT_NAME)
        package_h_path = os.path.join(dst_library_real, "src", "main", "cpp", f"{camel_name}Package.h")
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
        os.makedirs(os.path.dirname(package_h_path), exist_ok=True)
        open(package_h_path, "w", encoding="utf-8").write(package_h_content)
        _thread_safe_print(f"  创建 {camel_name}Package.h")
        
        # 替换 index.ets 中的 {{CAMEL_NAME}}
        index_ets_path = os.path.join(dst_library_real, "index.ets")
        if os.path.isfile(index_ets_path):
            index_ets_content = open(index_ets_path, "r", encoding="utf-8").read()
            if "{{CAMEL_NAME}}" in index_ets_content:
                index_ets_content = index_ets_content.replace("{{CAMEL_NAME}}", camel_name)
                open(index_ets_path, "w", encoding="utf-8").write(index_ets_content)
                _thread_safe_print(f"  替换 index.ets: {{CAMEL_NAME}} -> {camel_name}")
        
        # 替换 harmony/{short_name} CMakeLists.txt 中的 {{SHORT_NAME}}
        cmake_path = os.path.join(dst_library_real, "src", "main", "cpp", "CMakeLists.txt")
        if os.path.isfile(cmake_path):
            cmake_content = open(cmake_path, "r", encoding="utf-8").read()
            if "{{SHORT_NAME}}" in cmake_content:
                cmake_content = cmake_content.replace("{{SHORT_NAME}}", _SHORT_NAME)
                open(cmake_path, "w", encoding="utf-8").write(cmake_content)
                _thread_safe_print(f"  替换 harmony/{_SHORT_NAME}/CMakeLists.txt: {{SHORT_NAME}} -> {_SHORT_NAME}")

    apply_ohos_skeleton = os.path.join(tool_dir, "apply_ohos_skeleton.py")
    skeleton_args = ["--plugin-root", plugin_root, "--force"]
    _run_python(apply_ohos_skeleton, skeleton_args, cwd=plugin_root)
    
    # 替换 README.md 占位符
    ohos_real = os.path.realpath(os.path.join(plugin_root, "ohos"))
    readme_path = os.path.join(ohos_real, "README.md")
    from lib.ohos_npm_config import default_ohos_library_package_name

    ohos_name = (
        package_merge.ohos_package_name_from_parent(npm_name, plugin_root)
        if npm_name
        else default_ohos_library_package_name(plugin_root)
    )
    camel_name = package_merge.derive_camel_case_name(_SHORT_NAME)
    version = parent_pkg.get("version", "见发布记录") if 'parent_pkg' in dir() else "见发布记录"
    autolink = "是" if parent_pkg.get("harmony", {}).get("autolinking") else "否" if 'parent_pkg' in dir() else "否"
    original_name = parent_pkg.get("name", npm_name) if 'parent_pkg' in dir() else npm_name
    repo = parent_pkg.get("repository", {}) if 'parent_pkg' in dir() else {}
    original_url = repo.get("url", "") if isinstance(repo, dict) else (repo if isinstance(repo, str) else "")
    homepage = parent_pkg.get("homepage", "") if 'parent_pkg' in dir() else ""
    if homepage and not original_url:
        original_url = homepage
    
    _replace_readme_placeholders(
        readme_path,
        ohos_name=ohos_name,
        npm_name=npm_name,
        short_name=_SHORT_NAME,
        camel_name=camel_name,
        version=version,
        autolink=autolink,
        original_name=original_name,
        original_url=original_url,
    )

    apply_example = os.path.join(tool_dir, "apply_example_auto.py")
    example_args = ["--plugin-root", plugin_root]
    if force:
        example_args.append("--force")
    if _LIGHT:
        example_args.append("--light")
    _run_python(apply_example, example_args, cwd=plugin_root)

    src_wrapper = os.path.join(skill_root, "templates", "har_wrapper")
    dst_wrapper = os.path.join(plugin_root, "ohos", ".rn-build", "har_wrapper")
    dst_wrapper_real = os.path.realpath(dst_wrapper)
    if os.path.isdir(src_wrapper):
        os.makedirs(os.path.dirname(dst_wrapper_real), exist_ok=True)
        if os.path.isdir(dst_wrapper_real):
            shutil.rmtree(dst_wrapper_real)
        template_apply.copy_template_dir(src_wrapper, dst_wrapper_real, dry_run=False, force=False, log=_thread_safe_print, full=not _LIGHT)
        _thread_safe_print("  copied har_wrapper template")
        
        # 替换 har_wrapper/build-profile.json5 中的 {{SHORT_NAME}}
        bp_path = os.path.join(dst_wrapper_real, "build-profile.json5")
        if os.path.isfile(bp_path):
            bp_content = open(bp_path, "r", encoding="utf-8").read()
            bp_content = bp_content.replace("{{SHORT_NAME}}", _SHORT_NAME)
            open(bp_path, "w", encoding="utf-8").write(bp_content)
            _thread_safe_print(f"  替换 har_wrapper/build-profile.json5: { _SHORT_NAME}")
        
        # 重命名 library 目录为 {short_name}
        old_library_dir = os.path.join(dst_wrapper_real, "library")
        new_library_dir = os.path.join(dst_wrapper_real, _SHORT_NAME)
        if os.path.isdir(old_library_dir) and not os.path.isdir(new_library_dir):
            shutil.move(old_library_dir, new_library_dir)
            _thread_safe_print(f"  重命名 har_wrapper/library -> { _SHORT_NAME}")
            
            # 替换重命名后目录中的 module.json5
            module_json_path = os.path.join(new_library_dir, "src", "main", "module.json5")
            if os.path.isfile(module_json_path):
                module_content = open(module_json_path, "r", encoding="utf-8").read()
                module_content = module_content.replace('"name": "library"', f'"name": "{_SHORT_NAME}"')
                open(module_json_path, "w", encoding="utf-8").write(module_content)
                _thread_safe_print(f"  替换 har_wrapper/{_SHORT_NAME}/module.json5: library -> {_SHORT_NAME}")
            
            # 替换重命名后目录中的 CMakeLists.txt
            cmake_json_path = os.path.join(new_library_dir, "src", "main", "cpp", "CMakeLists.txt")
            if os.path.isfile(cmake_json_path):
                cmake_content = open(cmake_json_path, "r", encoding="utf-8").read()
                if "{{SHORT_NAME}}" in cmake_content:
                    cmake_content = cmake_content.replace("{{SHORT_NAME}}", _SHORT_NAME)
                    open(cmake_json_path, "w", encoding="utf-8").write(cmake_content)
                    _thread_safe_print(f"  替换 har_wrapper/{_SHORT_NAME}/CMakeLists.txt: {{SHORT_NAME}} -> {_SHORT_NAME}")

            from lib.ohos_package_sync import write_oh_package_json5_name

            har_oh_pkg = os.path.join(new_library_dir, "oh-package.json5")
            write_oh_package_json5_name(har_oh_pkg, ohos_name, log=_thread_safe_print)

    from lib.ohos_package_sync import sync_plugin_oh_package_names

    sync_plugin_oh_package_names(plugin_root, ohos_name=ohos_name, log=_thread_safe_print)

    _thread_safe_print(f"\nDone: created ohos/ + ohos/harmony/{_SHORT_NAME} + ohos/example + ohos/.rn-build.")