"""统一的 ohos 模板处理脚本。

根据 ModuleAnalysis 结果：
1. 拷贝 ohos 模板 → <plugin>/ohos/
2. 合并 package.json
3. 裁剪 package.json（删除 bob、codegen 或调整入口）
4. 处理源码（原生模块拷贝 specs + 源码，js-only 仅拷贝源码）
5. import_rewrite

由 create_native.py 或 create_js_only.py 调用，analysis 由调用者传入。
"""

from __future__ import annotations

import json
import os
import re
import sys
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from lib.module_analyzer import ModuleAnalysis

_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SKILL_ROOT not in sys.path:
    sys.path.insert(0, _SKILL_ROOT)

from lib import import_rewrite, package_merge, paths, template_apply


def _load_json(path: str) -> dict:
    content = _read_file(path)
    # Python 3.14 不允许尾随逗号，手动移除
    content = re.sub(r",\s*([}\]])", r"\1", content)
    return json.loads(content)


def _save_json(path: str, data: dict) -> None:
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def _read_file(path: str) -> str:
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def _write_file(path: str, content: str) -> None:
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)


def prune_ohos_package(
    pkg_path: str,
    analysis: ModuleAnalysis,
    short_name: str,
    entry_name: str,
    module_kind: str | None = None,
) -> None:
    """根据 ModuleAnalysis 裁剪 ohos/package.json。
    
    Args:
        pkg_path: ohos/package.json 路径
        analysis: 模块分析结果
        short_name: 包短名（用于 codegen）
        entry_name: 入口文件名（如 index.ts 或 index.js）
        module_kind: 模块类型（优先使用用户指定，None 时用 analysis.module_kind）
    """
    if module_kind is None:
        module_kind = analysis.module_kind
    
    pkg = _load_json(pkg_path)
    
    entry_base = os.path.splitext(entry_name)[0]  # 去掉扩展名，如 "index.ts" -> "index"
    
    source_type = analysis.source_type
    
    scripts = pkg.get("scripts", {})
    deps = pkg.get("devDependencies", {})
    
    if source_type == "js":
        print("  [裁剪] 源码为纯 JS，删除 bob 编译配置")
        if "react-native-builder-bob" in pkg:
            del pkg["react-native-builder-bob"]
        
        pkg["main"] = f"./src/{entry_name}"
        pkg["module"] = f"./src/{entry_name}"
        pkg["react-native"] = f"./src/{entry_name}"
        
        if "types" in pkg:
            del pkg["types"]
        
        if "prepare" in scripts:
            del scripts["prepare"]
        
        for k in ("react-native-builder-bob", "typescript", "@react-native/typescript-config"):
            if k in deps:
                del deps[k]
        
        files_list = ["src/", "README.md", "LICENSE"]
        if module_kind != "js-only":
            files_list.append("harmony/")
        pkg["files"] = files_list
        
        print(f"    入口改为: ./src/{entry_name}")
    else:
        print("  [保留] 源码含 TS，保留 bob 编译配置")
        pkg["main"] = f"./dist/commonjs/{entry_base}.js"
        pkg["module"] = f"./dist/module/{entry_base}.js"
        pkg["react-native"] = f"./dist/module/{entry_base}.js"
        pkg["types"] = f"./dist/typescript/{entry_base}.d.ts"
        
        files_list = ["dist/", "src/", "README.md", "LICENSE"]
        if module_kind != "js-only":
            files_list.append("harmony/")
        pkg["files"] = files_list
        
        if "prepare" not in scripts:
            scripts["prepare"] = "tsc --noEmit && bob build"
        
        if "react-native-builder-bob" not in deps:
            deps["react-native-builder-bob"] = "^0.18.0"
        
        if "react-native-builder-bob" not in pkg:
            pkg["react-native-builder-bob"] = {
                "source": "src",
                "output": "dist",
                "targets": ["commonjs", "module", "typescript"]
            }
        
        print(f"    入口保留: ./dist/commonjs/{entry_base}.js")
    
    if module_kind == "js-only":
        print("  [裁剪] js-only 模块，删除 codegen-lib")
        if "codegen-lib" in scripts:
            del scripts["codegen-lib"]
    else:
        print("  [保留] 原生模块，保留 codegen-lib")
        if "codegen-lib" in scripts:
            codegen_script = scripts["codegen-lib"]
            if "{{SHORT_NAME}}" in codegen_script:
                codegen_script = codegen_script.replace("{{SHORT_NAME}}", short_name)
                print(f"    替换 {{SHORT_NAME}} -> {short_name}")
            
            if "{{CODEGEN_CONFIG}}" in codegen_script:
                ohos_dir = os.path.dirname(pkg_path)
                codegen_config = package_merge.generate_codegen_config_from_specs(ohos_dir, short_name)
                codegen_script = codegen_config
                print(f"    动态生成 codegen 配置")
            
            scripts["codegen-lib"] = codegen_script
    
    pkg["scripts"] = scripts
    pkg["devDependencies"] = deps
    _save_json(pkg_path, pkg)


def create_ohos(
    plugin_root: str,
    analysis: ModuleAnalysis,
    module_kind: str | None = None,
    force: bool = False,
    dry_run: bool = False,
    light: bool = False,
) -> None:
    """创建 ohos 目录并裁剪模板。
    
    Args:
        plugin_root: 插件根目录
        analysis: 模块分析结果（由调用者传入）
        module_kind: 模块类型（优先使用用户指定，None 时用 analysis.module_kind）
        force: 是否强制覆盖
        dry_run: 是否仅模拟
        light: 是否轻量拷贝（跳过 node_modules, oh_modules, build 等）
    """
    if module_kind is None:
        module_kind = analysis.module_kind
    
    src = paths.templates_ohos_dir()
    dst = template_apply.plugin_ohos_root(plugin_root, "ohos")
    
    def log(msg: str) -> None:
        print(msg)
    
    print("=== create ohos ===")
    print(f"  src: {src}")
    print(f"  dst: {dst}")
    print(f"  source_type: {analysis.source_type}")
    print(f"  module_kind: {module_kind}")
    if light:
        print("  [light] 跳过 node_modules, oh_modules, build 等")
    
    template_apply.copy_template_dir(src, dst, dry_run=dry_run, force=force, log=log, full=not light)
    
    if dry_run:
        print("  [dry-run] 若去掉 dry_run，将继续：")
        print("    - merge package.json")
        print("    - prune_ohos_package")
        print("    - copy specs + source")
        print("    - import_rewrite")
        if light:
            print("    - [light] 已跳过编译产物")
        print("Done (dry-run).")
        return
    
    ohos_pkg = os.path.join(dst, "package.json")
    if not os.path.isfile(ohos_pkg):
        raise SystemExit(f"missing {ohos_pkg}")
    
    print("\n--- merge package.json ---")
    package_merge.merge_parent_into_ohos_package(plugin_root, ohos_pkg, dry_run=False)
    
    short_name = analysis.short_name
    
    # 使用 analysis 结果，不再重新扫描
    inferred_source = analysis.source_dir or analysis.inferred_source_dir
    print(f"\n--- source dir: {inferred_source or '根目录'}")
    
    ohos_src = os.path.join(dst, "src")
    
    # 拷贝 specs（使用 analysis.spec_files）
    if module_kind != "js-only" and analysis.spec_files:
        print("\n--- copy specs -> ohos/src/specs/v1 ---")
        spec_abs = _copy_spec_files_from_analysis(plugin_root, ohos_src, analysis.spec_files)
    else:
        spec_abs = set()
        print("\n--- skip specs (js-only or no specs) ---")
    
    # 拷贝源码（使用 analysis.source_files）
    print("\n--- copy remaining source ---")
    _copy_source_files_from_analysis(plugin_root, ohos_src, analysis.source_files, spec_abs, analysis.entry_file, inferred_source, analysis.dynamic_require_dirs)
    
    # 写入入口文件（使用 analysis.entry_file）
    print("\n--- write index ---")
    _write_index_from_analysis(plugin_root, ohos_src, analysis.entry_file, inferred_source)
    
    entry_name = "index.ts" if analysis.source_type == "ts" else "index.js"
    
    print("\n--- prune package.json ---")
    prune_ohos_package(ohos_pkg, analysis, short_name, entry_name, module_kind=module_kind)
    
    print("\n--- import_rewrite ---")
    spec_names = {os.path.splitext(os.path.basename(p))[0] for p in spec_abs}
    n = import_rewrite.walk_and_rewrite(ohos_src, dry_run=False, spec_basenames_no_ext=spec_names)
    if n:
        print(f"  touched {n} files")
    
    print("\n--- adjust tsconfig ---")
    _adjust_ohos_tsconfig(dst, plugin_root)
    
    print("\nDone: ohos/ created.")


def _copy_spec_files_from_analysis(plugin_root: str, ohos_src: str, spec_files: list[str]) -> set[str]:
    """根据 analysis.spec_files 拷贝 specs 到 v1 目录"""
    import shutil
    
    v1_dir = os.path.join(ohos_src, "specs", "v1")
    os.makedirs(v1_dir, exist_ok=True)
    
    spec_abs = set()
    for rel in spec_files:
        src_file = os.path.join(plugin_root, rel.replace("/", os.sep))
        if not os.path.isfile(src_file):
            continue
        
        basename = os.path.basename(src_file)
        dst_file = os.path.join(v1_dir, basename)
        
        shutil.copy2(src_file, dst_file)
        spec_abs.add(os.path.normpath(src_file))
        print(f"  copied spec {rel} -> specs/v1/{basename}")
    
    return spec_abs


def _copy_source_files_from_analysis(
    plugin_root: str,
    ohos_src: str,
    source_files: list[str],
    spec_abs: set[str],
    entry_file: str,
    source_root: str,
    dynamic_require_dirs: list[str] = None,
) -> None:
    """根据 analysis.source_files 拷贝源码
    
    Args:
        source_root: 源码根目录（如 "src"），用于去掉路径前缀
        dynamic_require_dirs: 动态 require 的目录列表（这些目录保留结构）
    """
    import shutil

    from lib.source_layout import is_dual_entry_layout
    
    if not source_files:
        return
    
    dynamic_require_dirs = dynamic_require_dirs or []
    dual_entry = is_dual_entry_layout(entry_file, source_root or "", plugin_root)
    
    # 计算需要去掉的前缀（双入口布局时保留 source_root/ 子目录，如 src/index.js -> ohos/src/src/index.js）
    prefix_to_remove = source_root.rstrip("/") + "/" if source_root else ""
    
    for rel in source_files:
        # 跳过 spec 文件
        src_file = os.path.join(plugin_root, rel.replace("/", os.sep))
        if os.path.normpath(src_file) in spec_abs:
            continue
        
        # 跳过入口文件（会单独处理）
        if entry_file and rel == entry_file:
            continue

        # 双入口：根 index.d.ts 沿用上游 barrel 类型，由 write_ohos_entry_index 按对象 default 生成
        if dual_entry and rel.replace("\\", "/") == "index.d.ts":
            print(f"  skip {rel} (dual-entry: index.d.ts generated with barrel)")
            continue
        
        # 计算目标路径
        rel_in_src = rel
        
        # 判断是否在动态 require 目录中
        is_dynamic_require_file = False
        for dyn_dir in dynamic_require_dirs:
            if rel.startswith(dyn_dir + "/") or rel.startswith(dyn_dir):
                is_dynamic_require_file = True
                break
        
        # 双入口：包 main 在根（index.js），实现落在 source_root/ 下 — 保留 src/ 层级
        if dual_entry and prefix_to_remove and rel.startswith(prefix_to_remove):
            rel_in_src = rel
        # 单入口：文件在 source_root 下，去掉前缀扁平到 ohos/src/
        elif prefix_to_remove and rel.startswith(prefix_to_remove):
            rel_in_src = rel[len(prefix_to_remove):]
        # 如果文件在动态 require 目录中，保留目录结构
        elif is_dynamic_require_file:
            # 保留相对路径
            rel_in_src = rel
        # 如果文件不在 source_root 下且不在动态 require 目录中（import 重写场景），扁平化
        elif source_root and not rel.startswith(source_root):
            basename = os.path.basename(rel)
            rel_in_src = basename
        
        dst_file = os.path.join(ohos_src, rel_in_src.replace("/", os.sep))
        
        os.makedirs(os.path.dirname(dst_file), exist_ok=True)
        shutil.copy2(src_file, dst_file)
        print(f"  copied {rel} -> src/{rel_in_src}")


def _write_index_from_analysis(
    plugin_root: str,
    ohos_src: str,
    entry_file: str,
    source_root: str,
) -> None:
    """根据 analysis.entry_file 写入入口"""
    from lib.source_copy import write_ohos_entry_index

    if not entry_file:
        print("  [warn] no entry file in analysis; skip ohos/src/index")
        return

    write_ohos_entry_index(
        plugin_root,
        ohos_src,
        entry_file,
        source_root=source_root or "src",
        dry_run=False,
    )


def _adjust_ohos_tsconfig(ohos_dir: str, plugin_root: str) -> None:
    """调整 ohos/tsconfig.json，根据源仓配置选择继承方式
    
    Args:
        ohos_dir: ohos 目录路径
        plugin_root: 源仓根目录
    """
    source_tsconfig_path = os.path.join(plugin_root, "tsconfig.json")
    if not os.path.isfile(source_tsconfig_path):
        print("  [tsconfig] 源仓无 tsconfig.json，保持模板配置")
        return
    
    source_content = _load_json(source_tsconfig_path)
    source_extends = source_content.get("extends")
    
    ohos_tsconfig_path = os.path.join(ohos_dir, "tsconfig.json")
    ohos_tsconfig = _load_json(ohos_tsconfig_path)
    
    # 判断源仓配置类型
    if source_extends and "@react-native/typescript-config" in source_extends:
        # 源仓依赖 RN 配置 → 保留 ohos 的 RN 配置（不修改）
        print("  [tsconfig] 源仓依赖 RN 配置，保持 ohos RN 配置")
        return
    
    elif source_extends and (source_extends.startswith("../") or source_extends.startswith("./")):
        # 源仓依赖相对路径的配置文件 → 拷贝到 ohos，继承
        
        # 1. 动态提取文件名（不写死）
        base_filename = os.path.basename(source_extends)
        source_base_path = os.path.normpath(os.path.join(plugin_root, source_extends))
        
        if not os.path.isfile(source_base_path):
            print(f"  [tsconfig] 源仓 extends {source_extends} 不存在，保持 RN 配置")
            return
        
        base_content = _load_json(source_base_path)
        
        # 调整 base config 以适应 ohos 环境
        base_compiler_options = base_content.get("compilerOptions", {})
        
        # lib: 如果配置过老或有问题，调整为 es2020
        if "lib" in base_compiler_options:
            libs = base_compiler_options["lib"]
            valid_libs = []
            for lib_item in libs:
                # 只保留有效的 ES 标准库和 DOM，移除无效值如 'jsx'
                if isinstance(lib_item, str) and (lib_item.startswith("es") or lib_item in ["dom", "dom.iterable", "scripthost", "decorators", "decorators.legacy"]):
                    valid_libs.append(lib_item)
            # 默认使用 es2020（平衡兼容性与现代特性）
            if not valid_libs or valid_libs == ["es6"]:
                valid_libs = ["es2020"]
            base_compiler_options["lib"] = valid_libs
        else:
            # 默认添加 es2020
            base_compiler_options["lib"] = ["es2020"]
        
        # 确保 jsx 配置存在（ohos 需要）
        if "jsx" not in base_compiler_options:
            base_compiler_options["jsx"] = "react"
        
        # 确保必要的现代配置
        if "target" not in base_compiler_options:
            base_compiler_options["target"] = "esnext"
        
        if "moduleResolution" not in base_compiler_options:
            base_compiler_options["moduleResolution"] = "node"
        
        base_content["compilerOptions"] = base_compiler_options
        
        # 2. 拷贝到 ohos 目录（保持原名，已调整）
        ohos_base_path = os.path.join(ohos_dir, base_filename)
        _save_json(ohos_base_path, base_content)
        print(f"  [tsconfig] 拷贝 {source_extends} -> ohos/{base_filename}（已调整 lib 为 es2020）")
        
        # 3. 修改 ohos/tsconfig.json 的 extends（保持原名）
        ohos_tsconfig["extends"] = f"./{base_filename}"
        
        # 4. 合并源仓的 compilerOptions（确保 ohos 不比源仓严格）
        source_compiler_options = source_content.get("compilerOptions", {})
        ohos_compiler_options = ohos_tsconfig.get("compilerOptions", {})
        
        # ohos 必需的配置（不会被源仓覆盖）
        ohos_required = {
            "noEmit": False,
            "declaration": True,
            "jsx": "react",
        }
        
        # 合并：源仓配置覆盖模板，但 ohos_required 优先级最高
        merged = {}
        merged.update(source_compiler_options)
        merged.update(ohos_compiler_options)
        merged.update(ohos_required)
        
        # 移除不适合 ohos 的路径相关配置
        merged.pop("outDir", None)
        merged.pop("rootDir", None)
        merged.pop("baseUrl", None)
        merged.pop("paths", None)
        merged.pop("rootDirs", None)
        
        # 移除可能比源仓更严格的配置（让 base config 控制严格程度）
        # strict, noImplicitAny 等应该通过 extends 继承，不应该在子配置里设置
        merged.pop("strict", None)
        merged.pop("strictNullChecks", None)
        merged.pop("strictFunctionTypes", None)
        merged.pop("strictBindCallApply", None)
        merged.pop("strictPropertyInitialization", None)
        merged.pop("noImplicitThis", None)
        merged.pop("alwaysStrict", None)
        merged.pop("noImplicitAny", None)
        merged.pop("noImplicitReturns", None)
        merged.pop("noFallthroughCasesInSwitch", None)
        
        ohos_tsconfig["compilerOptions"] = merged
        
        _save_json(ohos_tsconfig_path, ohos_tsconfig)
        print(f"  [tsconfig] 拷贝 {source_extends} -> ohos/{base_filename}")
        print(f"  [tsconfig] 修改 extends -> ./{base_filename}")
        print(f"  [tsconfig] 合并 compilerOptions（源仓优先，移除严格配置以继承 base）")
    
    else:
        # 其他情况 → 保留 ohos RN 配置
        print("  [tsconfig] 源仓配置未知，保持 ohos RN 配置")


def main() -> None:
    """CLI 入口（可独立运行）。"""
    import argparse
    from lib import module_analyzer
    
    p = argparse.ArgumentParser(description="Create ohos/ from template and prune by analysis.")
    p.add_argument("--plugin-root", default=os.getcwd(), help="RN plugin repo root")
    p.add_argument("--force", action="store_true", help="Replace existing ohos/")
    p.add_argument("--dry-run", action="store_true")
    args = p.parse_args()
    
    plugin_root = os.path.abspath(args.plugin_root)
    analysis = module_analyzer.analyze_module(plugin_root)
    
    create_ohos(plugin_root, analysis, force=args.force, dry_run=args.dry_run)


if __name__ == "__main__":
    main()