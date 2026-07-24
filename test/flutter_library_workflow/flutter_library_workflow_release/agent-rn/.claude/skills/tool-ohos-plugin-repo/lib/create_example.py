"""创建 example 目录。

根据 ModuleAnalysis 结果：
1. 有原生模块：调用 generate_example_full（步骤 1-10）
2. js-only：简化拷贝 + 更新依赖

统一处理，不再区分 apply_example_auto 和 apply_example_js。
"""

from __future__ import annotations

import json
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


def _load_json(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _save_json(path: str, data: dict) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def create_example(
    plugin_root: str,
    analysis: ModuleAnalysis,
    module_kind: str | None = None,
    force: bool = False,
    light: bool = False,
) -> None:
    """创建 example 目录。
    
    Args:
        plugin_root: 插件根目录
        analysis: 模块分析结果
        module_kind: 模块类型（优先使用用户指定，None 时用 analysis.module_kind）
        force: 是否强制覆盖
        light: 是否轻量拷贝
    """
    if module_kind is None:
        module_kind = analysis.module_kind
    
    ohos_name = analysis.ohos_name
    version = analysis.version
    
    ohos_dir = os.path.join(plugin_root, "ohos")
    example_dir = os.path.join(ohos_dir, "example")
    
    ohos_real = os.path.realpath(ohos_dir) if os.path.exists(ohos_dir) else ohos_dir
    example_real = os.path.join(ohos_real, "example")
    
    print("=== create example ===")
    print(f"  dst: {example_dir}")
    print(f"  module_kind: {module_kind}")
    print(f"  package: {ohos_name}@{version}")
    
    if module_kind != "js-only":
        print("  原生模块，调用 generate_example_full")
        _create_example_native(plugin_root, example_real, force, light)
    else:
        print("  js-only 模块，简化拷贝")
        _create_example_js_only(plugin_root, example_real, ohos_name, version, force, light)
    
    # 增量补充 ESLint 配置
    _ensure_eslint_config(example_real)
    
    # 增量补充 assets 目录（测试图片）
    _ensure_assets_dir(example_real)
    
    print("\nDone: example created.")


def _create_example_native(
    plugin_root: str,
    example_real: str,
    force: bool,
    light: bool,
) -> None:
    """原生模块 example：调用 generate_example_full（步骤 1-10）"""
    try:
        from lib.generate_example_full import set_light, main as run_generate_example
    except ImportError:
        print("  [warn] generate_example_full 不存在，使用简化拷贝")
        _create_example_js_only(plugin_root, example_real, "", "", force, light)
        return
    
    set_light(light)
    
    steps = ["1", "9", "10"]
    
    old_argv = sys.argv
    old_cwd = os.getcwd()
    
    try:
        os.chdir(plugin_root)
        sys.argv = ["generate_example_full.py"] + steps
        run_generate_example()
    finally:
        os.chdir(old_cwd)
        sys.argv = old_argv
    
    print(f"  已执行 generate_example_full 步骤: {', '.join(steps)}")


def _create_example_js_only(
    plugin_root: str,
    example_real: str,
    ohos_name: str,
    version: str,
    force: bool,
    light: bool,
) -> None:
    """js-only 模块 example：简化拷贝 + 更新依赖"""
    import shutil
    
    src = paths.templates_example_dir()
    
    if os.path.isdir(example_real) and force:
        shutil.rmtree(example_real)
        print(f"  已删除旧目录: {example_real}")
    
    template_apply.copy_template_dir(src, example_real, dry_run=False, force=force, log=print, full=not light)
    print(f"  已拷贝 example 模板")
    
    if ohos_name and version:
        _update_example_package_json(example_real, ohos_name, version)


def _update_example_package_json(example_real: str, ohos_name: str, version: str) -> None:
    """更新 example/package.json，使用 tgz 方式依赖"""
    pkg_path = os.path.join(example_real, "package.json")
    if not os.path.isfile(pkg_path):
        print(f"  [warn] example/package.json 不存在")
        return
    
    pkg = _load_json(pkg_path)
    
    tgz_name = ohos_name.replace("@", "").replace("/", "-") + f"-{version}.tgz"
    pkg.setdefault("dependencies", {})
    pkg["dependencies"][ohos_name] = f"file:../{tgz_name}"
    
    _save_json(pkg_path, pkg)
    print(f"  更新 example/package.json: {ohos_name} -> file:../{tgz_name}")


def _ensure_eslint_config(example_real: str) -> None:
    """增量补充 ESLint 配置（如果缺少）"""
    eslintrc_path = os.path.join(example_real, ".eslintrc.json")
    
    if os.path.isfile(eslintrc_path):
        print("  ESLint 配置已存在，跳过补充")
        return
    
    template_eslintrc = os.path.join(paths.templates_example_dir(), ".eslintrc.json")
    
    if not os.path.isfile(template_eslintrc):
        print("  [warn] 模板中无 .eslintrc.json，跳过补充")
        return
    
    shutil.copy2(template_eslintrc, eslintrc_path)
    print(f"  已补充 ESLint 配置: {eslintrc_path}")


def _ensure_assets_dir(example_real: str) -> None:
    """增量补充 assets 目录（如果缺少）"""
    assets_path = os.path.join(example_real, "assets")
    
    if os.path.isdir(assets_path):
        print("  assets 目录已存在，跳过补充")
        return
    
    template_assets = os.path.join(paths.templates_example_dir(), "assets")
    
    if not os.path.isdir(template_assets):
        print("  [warn] 模板中无 assets 目录，跳过补充")
        return
    
    shutil.copytree(template_assets, assets_path)
    print(f"  已补充 assets 目录: {assets_path}")