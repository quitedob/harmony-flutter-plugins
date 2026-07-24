"""Merge parent plugin package.json into ohos template (xxx placeholders).

包含命名推导函数，用于从 npm 包名生成：
- short_name: 简短标识名（目录名、Package 类名前缀）
- camel_name: 驼峰类名
"""

from __future__ import annotations

import json
import os
import re
from typing import Any, Mapping

from lib.ohos_npm_config import (
    get_ohos_npm_scope,
    is_ohos_name_template_placeholder,
    ohos_package_name_from_parent,
)

REACT_VERSION = "18.2.0"
REACT_TYPES_VERSION = "18.2.79"


def derive_package_short_name(npm_name: str) -> str:
    """
    从 npm 包名推导简短标识名，用于：
    - harmony/{short_name} 目录
    - Base{ShortName}Package 类名
    - codegen --npm-package-name 参数
    
    规则：
    1. 去掉 scope
    2. 依次去掉已知前缀（只去掉一个，避免过度简化）
    3. 替换 - 为 _
    4. 验证非空且为合法标识符
    5. 兜底：使用原名（去 scope）
    
    示例：
    @react-native-oh-tpl/react-native-fast-image → fast_image
    @react-native-community/async-storage → async_storage
    react-native-get-device-locale → get_device_locale
    rtn-calculator → calculator
    """
    if not npm_name or not isinstance(npm_name, str):
        return "library"
    
    name = npm_name.strip()
    
    # 1. 去掉 scope
    if name.startswith('@'):
        parts = name.split('/')
        if len(parts) >= 2:
            name = parts[-1]
    
    # 2. 去掉一个已知前缀（按优先级，只去掉一个）
    prefixes = [
        'react-native-',
        'react_native_',
        'rn-',
        'rtn-',
    ]
    for prefix in prefixes:
        if name.startswith(prefix):
            name = name[len(prefix):]
            break
    
    # 3. 替换连字符为下划线
    short_name = name.replace('-', '_')
    
    # 4. 验证非空
    if not short_name or short_name.strip() == '':
        short_name = "library"
    
    # 5. 验证是合法标识符（字母或下划线开头，只含字母数字下划线）
    if not re.match(r'^[a-zA-Z_][a-zA-Z0-9_]*$', short_name):
        # 不合法时，过滤非法字符
        short_name = re.sub(r'^[^a-zA-Z_]+', '', short_name)
        short_name = re.sub(r'[^a-zA-Z0-9_]', '_', short_name)
        if not short_name:
            short_name = "library"
    
    return short_name.lower()


def derive_camel_case_name(short_name: str) -> str:
    """
    从 short_name 推导驼峰类名：
    fast_image → FastImage
    async_storage → AsyncStorage
    """
    if not short_name:
        return "Library"
    parts = short_name.split('_')
    return ''.join(p.capitalize() for p in parts if p)


def generate_autolinking_config(npm_name: str) -> dict[str, str]:
    """
    根据 npm 包名生成 autolinking 配置
    
    返回:
    {
        "cmakeLibraryTargetName": "get_device_locale",
        "ohPackageName": "@oh-rn/react-native-get-device-locale",
        "etsPackageClassName": "GetDeviceLocalePackage",
        "cppPackageClassName": "GetDeviceLocalePackage"
    }
    
    示例（默认 scope @oh-rn）：
    react-native-get-device-locale → {
        cmakeLibraryTargetName: "get_device_locale",
        ohPackageName: "@oh-rn/react-native-get-device-locale",
        etsPackageClassName: "GetDeviceLocalePackage",
        cppPackageClassName: "GetDeviceLocalePackage"
    }
    """
    if not npm_name or not isinstance(npm_name, str):
        return {}
    
    npm_name = npm_name.strip()
    short_name = derive_package_short_name(npm_name)
    camel_name = derive_camel_case_name(short_name)
    oh_pkg_name = ohos_package_name_from_parent(npm_name)
    
    return {
        "cmakeLibraryTargetName": short_name,
        "ohPackageName": oh_pkg_name,
        "etsPackageClassName": f"{camel_name}Package",
        "cppPackageClassName": f"{camel_name}Package",
    }


def scan_spec_files_and_classify(spec_dir: str, ohos_dir: str) -> dict[str, list[str]]:
    """
    扫描 spec 目录，分类识别 TurboModule、ArkTS Component、CAPI Component
    
    参数:
    - spec_dir: spec 版本目录路径（如 ohos/src/specs/v1）
    - ohos_dir: ohos 目录路径（用于计算相对路径）
    
    返回:
    {
        "turbo_modules": ["./src/specs/v1/Module1.ts", ...],
        "arkts_components": ["./src/specs/v1/Component1.ts", ...],
        "cpp_components": ["./src/specs/v1/CAPIComponent1.ts", ...]
    }
    
    注意：返回路径是相对于 ohos_dir 的相对路径
    """
    import os
    import re
    
    if not os.path.isdir(spec_dir):
        return {"turbo_modules": [], "arkts_components": [], "cpp_components": []}
    
    # 正则表达式（与 generate_library_common.py 保持一致）
    RE_TURBO = re.compile(
        r"TurboModuleRegistry\.(?:get|getEnforcing)\s*<[^>]+>\s*\(\s*['\"]([^'\"]+)['\"]\s*\)",
        re.MULTILINE,
    )
    RE_FABRIC = re.compile(
        r"\bcodegenNativeComponent\s*(?:<[^>]*>)?\s*\(\s*['\"]([^'\"]+)['\"]\s*,?\s*\)",
        re.MULTILINE | re.DOTALL,
    )
    
    turbo_files: list[str] = []
    arkts_files: list[str] = []
    cpp_files: list[str] = []
    
    # 递归扫描 .ts/.tsx 文件
    for root, dirs, files in os.walk(spec_dir):
        # 排除常见目录
        dirs[:] = [d for d in dirs if d not in ('node_modules', 'android', 'ios', 'harmony', 'ohos', 'build', 'dist', '__tests__', '__mocks__')]
        
        for fn in files:
            if not (fn.endswith('.ts') or fn.endswith('.tsx')):
                continue
            
            # 跳过 .d.ts 和测试文件
            if fn.endswith('.d.ts') or fn.endswith('.test.ts') or fn.endswith('.spec.ts'):
                continue
            
            filepath = os.path.join(root, fn)
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                # 检测 TurboModule
                if RE_TURBO.search(content):
                    # 转换为相对路径（相对于 ohos_dir）
                    rel_path = os.path.relpath(filepath, ohos_dir)
                    # 转换为 POSIX 路径（使用 ./ 前缀）
                    if not rel_path.startswith('.'):
                        rel_path = './' + rel_path
                    # Windows 路径转换为 POSIX 路径
                    rel_path = rel_path.replace('\\', '/')
                    turbo_files.append(rel_path)
                
                # 检测 Fabric Component
                elif RE_FABRIC.search(content):
                    rel_path = os.path.relpath(filepath, ohos_dir)
                    if not rel_path.startswith('.'):
                        rel_path = './' + rel_path
                    # Windows 路径转换为 POSIX 路径
                    rel_path = rel_path.replace('\\', '/')
                    # 暂时默认为 ArkTS 组件（CAPI 需要特殊标记，待确认）
                    arkts_files.append(rel_path)
                    
            except Exception:
                continue
    
    return {
        "turbo_modules": turbo_files,
        "arkts_components": arkts_files,
        "cpp_components": cpp_files,
    }


def generate_codegen_config_from_specs(ohos_dir: str, short_name: str) -> str:
    """
    根据 spec 文件类型动态生成 codegen-lib 命令配置
    
    参数:
    - ohos_dir: ohos 目录路径（用于定位 spec 目录）
    - short_name: 库的短名称
    
    返回: codegen-lib 命令字符串
    
    示例输出:
    --turbo-modules-spec-paths ./src/specs/v1/Module1.ts ./src/specs/v2/Module2.ts
    --arkts-components-spec-paths ./src/specs/v1/Component1.ts
    """
    import os
    
    spec_base_dir = os.path.join(ohos_dir, "src", "specs")
    
    # 如果没有 specs 目录，使用默认配置
    if not os.path.isdir(spec_base_dir):
        return f"react-native codegen-lib-harmony --no-safety-check --npm-package-name {short_name} --cpp-output-path ./harmony/{short_name}/src/main/cpp/generated --ets-output-path ./harmony/{short_name}/src/main/ets/generated --turbo-modules-spec-paths ./src/specs/v1"
    
    # 扫描所有版本目录（v1, v2, v3, ...）
    all_turbo_files: list[str] = []
    all_arkts_files: list[str] = []
    all_cpp_files: list[str] = []
    
    # 遍历 specs 下的所有子目录
    for version_dir in os.listdir(spec_base_dir):
        version_path = os.path.join(spec_base_dir, version_dir)
        if not os.path.isdir(version_path):
            continue
        
        classified = scan_spec_files_and_classify(version_path, ohos_dir)
        all_turbo_files.extend(classified["turbo_modules"])
        all_arkts_files.extend(classified["arkts_components"])
        all_cpp_files.extend(classified["cpp_components"])
    
    # 如果没有任何 spec 文件，使用默认配置
    if not all_turbo_files and not all_arkts_files and not all_cpp_files:
        return f"react-native codegen-lib-harmony --no-safety-check --npm-package-name {short_name} --cpp-output-path ./harmony/{short_name}/src/main/cpp/generated --ets-output-path ./harmony/{short_name}/src/main/ets/generated --turbo-modules-spec-paths ./src/specs/v1"
    
    # 构建参数
    args = [
        "react-native codegen-lib-harmony",
        "--no-safety-check",
        f"--npm-package-name {short_name}",
        f"--cpp-output-path ./harmony/{short_name}/src/main/cpp/generated",
        f"--ets-output-path ./harmony/{short_name}/src/main/ets/generated",
    ]
    
    if all_turbo_files:
        # 将所有 TurboModule 文件路径列出
        turbo_paths = " ".join(all_turbo_files)
        args.append(f"--turbo-modules-spec-paths {turbo_paths}")
    
    if all_arkts_files:
        # 将所有 ArkTS 组件文件路径列出
        arkts_paths = " ".join(all_arkts_files)
        args.append(f"--arkts-components-spec-paths {arkts_paths}")
    
    if all_cpp_files:
        # 将所有 CAPI 组件文件路径列出
        cpp_paths = " ".join(all_cpp_files)
        args.append(f"--cpp-components-spec-paths {cpp_paths}")
    
    return " ".join(args)


def _load_json(path: str) -> dict[str, Any]:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _save_json(path: str, data: Mapping[str, Any]) -> None:
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def _is_placeholder(value: Any) -> bool:
    if value == "xxx":
        return True
    return is_ohos_name_template_placeholder(value)


def _normalize_react_build_deps(pkg: dict[str, Any]) -> None:
    """Keep RN 0.72 template builds on React 18 types during npm install."""
    dev_deps = pkg.get("devDependencies")
    if not isinstance(dev_deps, dict):
        dev_deps = {}
    dev_deps["react"] = REACT_VERSION
    dev_deps["@types/react"] = REACT_TYPES_VERSION
    pkg["devDependencies"] = dev_deps

    deps = pkg.get("dependencies")
    if isinstance(deps, dict) and "@types/react" in deps:
        deps["@types/react"] = REACT_TYPES_VERSION


def merge_parent_into_ohos_package(
    plugin_root: str,
    ohos_package_json: str,
    *,
    dry_run: bool = False,
) -> None:
    parent_pkg_path = os.path.join(os.path.abspath(plugin_root), "package.json")
    if not os.path.isfile(parent_pkg_path):
        raise FileNotFoundError(parent_pkg_path)
    parent = _load_json(parent_pkg_path)
    ohos_pkg = _load_json(ohos_package_json)

    if "name" in ohos_pkg and _is_placeholder(ohos_pkg["name"]):
        pn = parent.get("name")
        if isinstance(pn, str) and pn.strip():
            ohos_pkg["name"] = ohos_package_name_from_parent(pn, plugin_root)

    for k in ("displayName", "version", "description"):
        if k not in ohos_pkg:
            continue
        if _is_placeholder(ohos_pkg[k]) and k in parent:
            ohos_pkg[k] = parent[k]

    if "displayName" in ohos_pkg and "displayName" not in parent:
        nm = ohos_pkg.get("name")
        if isinstance(nm, str) and nm.strip() and not _is_placeholder(nm):
            ohos_pkg["displayName"] = nm.strip()

    repo = parent.get("repository")
    if isinstance(repo, dict) and isinstance(repo.get("url"), str):
        ohos_pkg["repository"] = dict(repo)
    elif isinstance(repo, str):
        ohos_pkg["repository"] = {"type": "git", "url": repo}

    if isinstance(parent.get("homepage"), str):
        ohos_pkg["homepage"] = parent["homepage"]

    parent_deps = parent.get("dependencies", {})
    if isinstance(parent_deps, dict) and parent_deps:
        ohos_deps = ohos_pkg.get("dependencies", {})
        if not isinstance(ohos_deps, dict):
            ohos_deps = {}
        for k, v in parent_deps.items():
            if k not in ohos_deps:
                ohos_deps[k] = v
        ohos_pkg["dependencies"] = ohos_deps

    parent_peer = parent.get("peerDependencies", {})
    if isinstance(parent_peer, dict) and parent_peer:
        ohos_peer = ohos_pkg.get("peerDependencies", {})
        if not isinstance(ohos_peer, dict):
            ohos_peer = {}
        for k, v in parent_peer.items():
            if k not in ohos_peer:
                ohos_peer[k] = v
        ohos_pkg["peerDependencies"] = ohos_peer

    harmony = ohos_pkg.get("harmony")
    if isinstance(harmony, dict) and _is_placeholder(harmony.get("alias")):
        harmony = dict(harmony)
        pn = parent.get("name")
        if isinstance(pn, str) and pn.strip():
            harmony["alias"] = pn.strip()
        ohos_pkg["harmony"] = harmony
    
    # 合并 autolinking 配置（从根目录 package.json -> ohos/package.json）
    parent_harmony = parent.get("harmony", {})
    if isinstance(parent_harmony, dict) and "autolinking" in parent_harmony:
        harmony = ohos_pkg.get("harmony", {})
        if not isinstance(harmony, dict):
            harmony = {}
        harmony["autolinking"] = parent_harmony["autolinking"]
        ohos_pkg["harmony"] = harmony
    
    # 如果根目录没有 autolinking，则自动生成（仅原生模块，JS-only 不生成）
    # 判断：检查 ohos 目录下是否有原生库目录（harmony/{short_name}/）
    pn = parent.get("name")
    if isinstance(pn, str) and pn.strip():
        short_name = derive_package_short_name(pn)
        native_lib_dir = os.path.join(os.path.dirname(ohos_package_json), short_name)
        has_native_lib = os.path.isdir(native_lib_dir)
        
        if isinstance(ohos_pkg.get("harmony"), dict):
            harmony = ohos_pkg["harmony"]
            if "autolinking" not in harmony and has_native_lib:
                autolinking = generate_autolinking_config(pn)
                if autolinking:
                    harmony["autolinking"] = autolinking
                    ohos_pkg["harmony"] = harmony

    # autolinking.ohPackageName 须与 ohos/package.json name 一致（勿沿用上游 legacy scope）
    canonical = ohos_pkg.get("name")
    if isinstance(canonical, str) and canonical.strip() and not _is_placeholder(canonical):
        harmony = ohos_pkg.get("harmony")
        if isinstance(harmony, dict) and isinstance(harmony.get("autolinking"), dict):
            al = dict(harmony["autolinking"])
            cur = al.get("ohPackageName")
            if isinstance(cur, str) and cur != canonical.strip():
                from lib.ohos_npm_config import (
                    is_ohos_name_template_placeholder,
                    is_ohos_scoped_package_name,
                )

                if is_ohos_name_template_placeholder(cur) or is_ohos_scoped_package_name(cur):
                    al["ohPackageName"] = canonical.strip()
                    harmony = dict(harmony)
                    harmony["autolinking"] = al
                    ohos_pkg["harmony"] = harmony

    _normalize_react_build_deps(ohos_pkg)

    if dry_run:
        print(f"[dry-run] would write merged package.json -> {ohos_package_json}")
        return
    _save_json(ohos_package_json, ohos_pkg)
    print(f"  merged parent fields into {ohos_package_json}")

    from lib.ohos_package_sync import sync_plugin_oh_package_names

    ohos_name = ohos_pkg.get("name")
    if isinstance(ohos_name, str) and ohos_name.strip():
        sync_plugin_oh_package_names(plugin_root, ohos_name=ohos_name.strip())


def _dir_has_valid_files(path: str) -> bool:
    """
    A specPaths dir is considered "valid" if it contains at least one file other than `.gitkeep`.
    Search recursively to allow nested spec layouts.
    """
    if not os.path.isdir(path):
        return False
    for dirpath, _, filenames in os.walk(path):
        for fn in filenames:
            if fn == ".gitkeep":
                continue
            if fn.startswith("."):
                continue
            return True
    return False


def prune_harmony_codegen_config_by_specpaths(
    ohos_package_json: str,
    *,
    dry_run: bool = False,
) -> bool:
    """
    If `harmony.codegenConfig[*].specPaths` point to directories that contain no valid files
    (excluding `.gitkeep`), remove those `codegenConfig` entries.

    Returns True if the package.json would be/was modified.
    """
    ohos_pkg = _load_json(ohos_package_json)
    harmony = ohos_pkg.get("harmony")
    if not isinstance(harmony, dict):
        return False
    codegen = harmony.get("codegenConfig")
    if not isinstance(codegen, list):
        return False

    base_dir = os.path.dirname(os.path.abspath(ohos_package_json))

    kept: list[Any] = []
    removed = 0
    for entry in codegen:
        if not isinstance(entry, dict):
            kept.append(entry)
            continue
        spec_paths = entry.get("specPaths")
        if not isinstance(spec_paths, list) or not spec_paths:
            kept.append(entry)
            continue

        any_valid = False
        for p in spec_paths:
            if not isinstance(p, str) or not p.strip():
                continue
            rel = p.strip()
            # tolerate both "./x" and "x"
            rel_norm = rel[2:] if rel.startswith("./") else rel
            abs_dir = os.path.normpath(os.path.join(base_dir, rel_norm))
            if _dir_has_valid_files(abs_dir):
                any_valid = True
                break

        if any_valid:
            kept.append(entry)
        else:
            removed += 1

    if removed == 0:
        return False

    harmony = dict(harmony)
    harmony["codegenConfig"] = kept
    ohos_pkg["harmony"] = harmony

    if dry_run:
        print(f"[dry-run] would prune harmony.codegenConfig ({removed} entries) in {ohos_package_json}")
        return True

    _save_json(ohos_package_json, ohos_pkg)
    print(f"  pruned harmony.codegenConfig: removed {removed} entries with empty specPaths")
    return True
