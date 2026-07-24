"""build hap 逻辑（统一处理，不区分 js-only / native）。

阶段：
- prepare：pack → example npm/ohpm → 插件注册 → 主插件 entry/CMAKE/PackageProvider（步骤 5–8）
- compile：npm bundle → hvigorw assembleHap

默认仅 compile；`--prepare-only` 只做准备（含全部需改动的代码）；`--full` 准备 + 编译。
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
from .deveco_toolchain import enriched_env, resolve_subprocess_executable

_PLUGIN_ROOT: str = ""
_OHOS_DIR: str = ""
_EXAMPLE_REAL: str = ""
_PKG_NAME: str = ""
_PKG_VERSION: str = ""
_TGZ_NAME: str = ""
_TOOL_DIR: str = ""

# Metro / hvigor 输出含 UTF-8（如 Logo 方块字符）；Windows 默认 gbk 会触发 UnicodeDecodeError。
_SUBPROCESS_TEXT_KW = {"encoding": "utf-8", "errors": "replace"}


def _resolve_cmd(cmd: str, env: dict[str, str] | None = None) -> str:
    return resolve_subprocess_executable(cmd, env)


def _run(cmd: list[str], cwd: str, quiet: bool = False, check: bool = True) -> subprocess.CompletedProcess:
    env = enriched_env()
    resolved = [_resolve_cmd(cmd[0], env)] + cmd[1:]
    print_cmd = " ".join(resolved)
    if not quiet:
        print(f"$ (cwd={cwd}) {print_cmd}")
        return subprocess.run(resolved, cwd=cwd, check=check, env=env, **_SUBPROCESS_TEXT_KW)
    result = subprocess.run(
        resolved,
        cwd=cwd,
        check=False,
        capture_output=True,
        text=True,
        env=env,
        **_SUBPROCESS_TEXT_KW,
    )
    if result.stdout:
        print(result.stdout, end="" if result.stdout.endswith("\n") else "\n")
    if result.stderr:
        print(result.stderr, end="" if result.stderr.endswith("\n") else "\n")
    if check and result.returncode != 0:
        raise subprocess.CalledProcessError(
            result.returncode, resolved, output=result.stdout, stderr=result.stderr
        )
    return result


def _read_json(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _write_json(path: str, data: dict) -> None:
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def _find_hvigorw(harmony_dir: str) -> str:
    for name in ("hvigorw", "hvigorw.bat"):
        p = os.path.join(harmony_dir, name)
        if os.path.isfile(p):
            return p
    return "hvigorw"


def _sync_peer_deps_to_example(ohos_pkg: dict, example_pkg: dict) -> list:
    peer_deps = ohos_pkg.get("peerDependencies") or {}
    example_deps = example_pkg.get("dependencies") or {}

    added = []
    for name, version in peer_deps.items():
        if name not in example_deps:
            example_deps[name] = version
            added.append((name, version))

    if added:
        example_pkg["dependencies"] = example_deps

    return added


def _init_paths(plugin_root: str, tool_dir: str, example_dir: str = "example") -> str:
    global _PLUGIN_ROOT, _OHOS_DIR, _EXAMPLE_REAL, _PKG_NAME, _PKG_VERSION, _TGZ_NAME, _TOOL_DIR

    _PLUGIN_ROOT = plugin_root
    _OHOS_DIR = os.path.join(plugin_root, "ohos")
    _EXAMPLE_REAL = os.path.realpath(os.path.join(plugin_root, "ohos", example_dir))
    _TOOL_DIR = tool_dir

    pkg = _read_json(os.path.join(_OHOS_DIR, "package.json"))
    _PKG_NAME = pkg.get("name", "")
    _PKG_VERSION = pkg.get("version", "")
    if not _PKG_NAME or not _PKG_VERSION:
        raise SystemExit("ohos/package.json missing name or version")
    _TGZ_NAME = _PKG_NAME.replace("@", "").replace("/", "-") + f"-{_PKG_VERSION}.tgz"

    harmony_dir = os.path.join(_EXAMPLE_REAL, "harmony")
    if not os.path.isdir(harmony_dir):
        raise SystemExit(f"missing harmony dir: {harmony_dir}")
    return harmony_dir


def _ohpm_cmd() -> list[str]:
    return [
        "ohpm",
        "install",
        "--all",
        "--registry",
        "https://ohpm.openharmony.cn/ohpm/",
        "--strict_ssl",
        "true",
    ]


def _register_dep_plugins(harmony_dir: str) -> None:
    """注册 example 依赖树中的鸿蒙插件（entry/CMake/Factory）。

    autolink 三件套（RNOHPackagesFactory.ets / RNOHPackagesFactory.h / autolinking.cmake）
    由 example 模板提供占位 stub，prepare-only 阶段保留以便工程结构一致；
    build hap 时 hvigor autolink 会覆盖为真实内容。勿删除 RNPackagesFactory.ets。
    """
    print("\n=== 注册依赖插件 ===")
    skill_root = os.path.dirname(_TOOL_DIR)
    if skill_root not in sys.path:
        sys.path.insert(0, skill_root)
    from lib.generate_example_full import register_dep_plugins

    register_dep_plugins(_EXAMPLE_REAL)


def _strip_manual_main_plugin_cmake(
    ohos_package_name: str, cmake_target_name: str
) -> None:
    """移除此前手动注册主插件时写入的 CMake 行（autolink 插件不应保留）。"""
    cmake_lists_path = os.path.join(
        _EXAMPLE_REAL, "harmony", "entry", "src", "main", "cpp", "CMakeLists.txt"
    )
    if not os.path.isfile(cmake_lists_path):
        return
    with open(cmake_lists_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    pkg_escaped = re.escape(ohos_package_name)
    target_escaped = re.escape(cmake_target_name)
    patterns = (
        re.compile(rf'add_subdirectory\("\${{OH_MODULE_DIR}}/{pkg_escaped}/src/main/cpp"'),
        re.compile(rf"target_compile_options\({target_escaped}\s"),
        re.compile(rf"target_link_libraries\(rnoh_app PUBLIC {target_escaped}\)"),
    )
    new_lines = [ln for ln in lines if not any(p.search(ln) for p in patterns)]
    if len(new_lines) != len(lines):
        with open(cmake_lists_path, "w", encoding="utf-8", newline="\n") as f:
            f.writelines(new_lines)
        print("  已清理主插件的手动 CMake 注册（改由 autolink）")


def _apply_main_plugin_example_steps(npm_package_name: str, short_name: str) -> None:
    """主插件 entry/oh-package、CMake、PackageProvider、RNPackagesFactory（generate-example 步骤 5–8）。

    若 ohos/package.json 含 harmony.autolinking，则 HAR 已由 register_dep_plugins 写入，
    CMake/Package 由 hvigor autolink 生成，此处不再手动注册（避免与 autolinking.cmake 重复）。
    """
    harmony_lib = os.path.join(_PLUGIN_ROOT, "ohos", "harmony", short_name)
    if not os.path.isdir(harmony_lib):
        print(f"  [info] 无 ohos/harmony/{short_name}，跳过主插件 entry/CMAKE 配置（js-only）")
        return

    skill_root = os.path.dirname(_TOOL_DIR)
    if skill_root not in sys.path:
        sys.path.insert(0, skill_root)
    from lib.generate_example_full import (
        _is_autolink_supported,
        find_fabric_component_structs,
        generate_index_fabric,
        generate_package_provider,
        generate_rn_package_factory,
        read_ohos_library_package_name,
        update_cmake_lists,
        update_entry_oh_package,
    )

    ohos_pkg = _read_json(os.path.join(_OHOS_DIR, "package.json"))
    ohos_package_name = read_ohos_library_package_name(short_name)
    if not ohos_package_name:
        print("  [warn] 无法读取主插件 oh-package 名，跳过步骤 5–8")
        return

    autolink = ohos_pkg.get("harmony", {}).get("autolinking") or {}
    cmake_target = autolink.get("cmakeLibraryTargetName", short_name) if isinstance(
        autolink, dict
    ) else short_name

    if _is_autolink_supported(ohos_pkg):
        print("\n=== 主插件 Example 配置（autolink）===")
        print(
            "  主插件支持 autolink：跳过手动 CMake/Package/RNPackage 注册"
            "（HAR 已由 register_dep_plugins 处理，编译时由 hvigor autolink）"
        )
        _strip_manual_main_plugin_cmake(ohos_package_name, cmake_target)
        generate_index_fabric(_EXAMPLE_REAL, npm_package_name, ohos_package_name)
        return

    print("\n=== 主插件 Example 配置（步骤 5–8，手动注册）===")
    update_entry_oh_package(_EXAMPLE_REAL, ohos_package_name, npm_package_name, short_name)
    update_cmake_lists(_EXAMPLE_REAL, ohos_package_name, npm_package_name, short_name)
    generate_package_provider(_EXAMPLE_REAL, npm_package_name, short_name)
    generate_rn_package_factory(_EXAMPLE_REAL, npm_package_name, ohos_package_name, short_name)
    generate_index_fabric(_EXAMPLE_REAL, npm_package_name, ohos_package_name)


def _prepare_example(harmony_dir: str) -> None:
    """完整准备：依赖同步 + 依赖插件注册 + 主插件 entry/CMAKE 等（不 bundle、不编 HAP）。"""
    print("\n=== build hap: prepare-only ===")

    _run(["npm", "pack", "--ignore-scripts"], cwd=_OHOS_DIR, quiet=True)

    tgz_path = os.path.join(_OHOS_DIR, _TGZ_NAME)
    if not os.path.isfile(tgz_path):
        raise SystemExit(f"missing tgz: {tgz_path}")

    ohos_pkg = _read_json(os.path.join(_OHOS_DIR, "package.json"))
    example_pkg_path = os.path.join(_EXAMPLE_REAL, "package.json")
    example_pkg = _read_json(example_pkg_path)

    added_peer_deps = _sync_peer_deps_to_example(ohos_pkg, example_pkg)
    if added_peer_deps:
        for name, ver in added_peer_deps:
            print(f"  [info] added peerDep to example: {name}@{ver}")

    example_pkg.setdefault("dependencies", {})
    example_pkg["dependencies"][_PKG_NAME] = f"file:../{_TGZ_NAME}"
    _write_json(example_pkg_path, example_pkg)

    if added_peer_deps:
        print("  [info] installing newly added peer dependencies...")
        _run(["npm", "install", "--legacy-peer-deps"], cwd=_EXAMPLE_REAL)
    else:
        _run(["npm", "install", "--force", f"file:../{_TGZ_NAME}"], cwd=_EXAMPLE_REAL)

    _run(_ohpm_cmd(), cwd=harmony_dir, quiet=True)

    _register_dep_plugins(harmony_dir)

    from lib import package_merge

    short_name = package_merge.derive_package_short_name(_PKG_NAME)
    _apply_main_plugin_example_steps(_PKG_NAME, short_name)

    print("\nDone: prepare-only 完成（依赖 + 插件注册 + entry/CMAKE 已更新，未编译 HAP）。")


def _compile_hap(harmony_dir: str) -> None:
    """打 JS bundle 并 assembleHap（不 pack / 不 npm install / 不改 entry 配置）。"""
    print("\n=== build hap: 编译（lint + bundle + HAP）===")

    pkg_scripts = _read_json(os.path.join(_EXAMPLE_REAL, "package.json")).get("scripts", {})
    
    # Step 1: lint check (if configured)
    if "lint" in pkg_scripts:
        print("\n[lint] 运行 ESLint 检查...")
        result = _run(["npm", "run", "lint"], cwd=_EXAMPLE_REAL, check=False)
        if result.returncode != 0:
            print("\n[lint] ESLint 检查失败，请修复后重新编译")
            print("  运行 'npm run lint' 查看详细错误")
            raise SystemExit(1)
        print("[lint] ESLint 检查通过")

    # Step 2: bundle
    bundle_script = "dev"
    for cand in ("bundle-harmony", "dev"):
        if cand in pkg_scripts:
            bundle_script = cand
            break
    print(f"\n[bundle] 运行 npm run {bundle_script}...")
    _run(["npm", "run", bundle_script], cwd=_EXAMPLE_REAL)

    # Step 3: assembleHap
    print("\n[HAP] 运行 hvigorw assembleHap...")
    hvigorw = _find_hvigorw(harmony_dir)
    _run([hvigorw, "assembleHap", "--no-daemon"], cwd=harmony_dir, quiet=True)

    print("\nDone: lint passed, bundle generated, HAP assembled.")


def _post_build_static_check(plugin_root: str, tool_dir: str) -> None:
    """HAP 编译后自动运行 example 静态检查（白屏/原生模块漏注册/HAP 完整性硬门禁）。

    必须在 HAP 产物生成后运行（脚本依赖 HAP 目录存在）。与 doctor 一样把“运行时白屏风险”
    在构建期变成早失败，避免装到真机才发现。
    退出码：0 通过；2 跳过（无 ohos/example）；1 视为门禁失败 → 阻断 build hap。
    """
    script = os.path.join(tool_dir, "check_example_static.py")
    if not os.path.isfile(script):
        return
    print("\n=== build hap: example 静态检查（check_example_static.py）===")
    result = subprocess.run(
        [sys.executable, script, plugin_root],
        cwd=plugin_root,
        env=enriched_env(),
        **_SUBPROCESS_TEXT_KW,
    )
    if result.returncode == 1:
        raise SystemExit(
            "build hap 失败：example 静态检查未通过（见上方报错）。"
            "这是运行时白屏/原生模块漏注册的早失败门禁，按报错修复后重新 `rn.py build hap`。"
            "（确需跳过：--skip-doctor）"
        )


def run_build_hap(
    plugin_root: str,
    tool_dir: str,
    apply_example: bool = False,
    *,
    prepare_only: bool = False,
    full: bool = False,
    skip_doctor: bool = False,
    example_dir: str = None,
) -> None:
    if prepare_only and full:
        raise SystemExit("不能同时使用 --prepare-only 与 --full")

    if apply_example:
        print(
            "  [info] --apply-example 已并入 --prepare-only / --full 的准备阶段，无需单独指定"
        )

    do_prepare = prepare_only or full
    do_compile = full or not prepare_only

    harmony_dir = _init_paths(plugin_root, tool_dir, example_dir or "example")

    if do_prepare:
        _prepare_example(harmony_dir)

    # 准备完成后、编译/装包前的自检门禁：拦 file: 依赖缺失 / autolinking 空 / .bin 非 symlink
    if not skip_doctor:
        from lib import doctor

        errors, warnings = doctor.run_doctor(_EXAMPLE_REAL, harmony_dir)
        doctor.report(errors, warnings)

    if do_compile:
        _compile_hap(harmony_dir)
        # HAP 产物生成后运行 example 静态检查（白屏/漏注册早失败门禁）
        if not skip_doctor:
            _post_build_static_check(plugin_root, tool_dir)

    if do_prepare and do_compile:
        print("\nDone: prepare + compile 全流程完成。")
