#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
RN Harmony 脚手架：generate_library_turbo / generate_library_fabric 的公共实现。

（本文件位于 tool-ohos-plugin-repo/lib/；harmony 模板路径见 TOOL_EXAMPLE_DIR → ../templates。）

- 不负责 CLI 入口与「步骤 1」扫描逻辑（Turbo-only vs Turbo+Fabric 差异保留在各入口脚本）。
- 提供步骤 2–6、9 的共用实现，以及 Turbo codegen 解析/渲染与 Fabric 组件辅助。
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Sequence, Set, Tuple

# 本 skill 的 templates/（内含 harmony/，供拷贝与 CMake 模板恢复；对应旧 tool-example 侧 harmony）
_LIB_DIR = os.path.dirname(os.path.abspath(__file__))
TOOL_EXAMPLE_DIR = os.path.normpath(os.path.join(_LIB_DIR, "..", "templates"))


def configure_stdout_utf8() -> None:
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass


# ---------------------------------------------------------------------------
# 常量
# ---------------------------------------------------------------------------

SPEC_MARKER = "export interface Spec"

# NOTE: codegen 输出路径由 ohos/package.json 的 "codegen-lib" script 控制（使用 {{SHORT_NAME}} 占位符）
# create_native.py 和 apply_ohos_skeleton.py 会替换 {{SHORT_NAME}} -> {short_name}

_DEFAULT_HARMONY_CPP_CMAKELISTS = """# the minimum version of CMake.
cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE on)

# react-native codegen-harmony 将 C++ 产物放在 generated/；#include 以 src/main/cpp 为根（如 generated/Foo.h），
# 同时 generated 下的 .cpp 常使用 #include "Foo.h"，故需同时加入 cpp 与 cpp/generated。
set(library_generated_dir "${CMAKE_CURRENT_SOURCE_DIR}/generated")

# 不用 **/*.cpp：OHOS 自带 CMake 在 Windows 上常匹配不到，会得到空列表 → add_library 报 No SOURCES。
file(GLOB_RECURSE library_generated_SRC CONFIGURE_DEPENDS "${library_generated_dir}/*.cpp")
file(GLOB library_SRC CONFIGURE_DEPENDS *.cpp)
add_library({{SHORT_NAME}} SHARED ${library_SRC} ${library_generated_SRC})
target_include_directories({{SHORT_NAME}} PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}
    ${library_generated_dir})
target_link_libraries({{SHORT_NAME}} PUBLIC rnoh)
"""

_RE_TURBO_NAME = re.compile(
    r"TurboModuleRegistry\.(?:get|getEnforcing)\s*<[^>]+>\s*\(\s*['\"]([^'\"]+)['\"]\s*\)",
    re.MULTILINE,
)

_RE_FABRIC_NAME = re.compile(
    r"\bcodegenNativeComponent\s*(?:<[^>]*>)?\s*\(\s*['\"]([^'\"]+)['\"]\s*,?\s*\)",
    re.MULTILINE | re.DOTALL,
)

_RE_EXPORT_NAMESPACE = re.compile(
    r"export\s+namespace\s+([A-Za-z_]\w*)\s*\{",
    re.MULTILINE,
)

SKIP_TS_SCAN_DIR_NAMES = frozenset({
    "android",
    "harmony",
    "ohos",
    "ios",
    "windows",
    "macos",
    "linux",
    "node_modules",
    "pods",
    "build",
    "dist",
    "out",
    "oh_modules",
})

PIN_REACT_DEV = "18.3.1"
PIN_REACT_NATIVE_DEV = "0.72.5"
RNOH_PACKAGE_VERSION = "0.77.50"

MIN_STEP = 1
MAX_STEP = 10


# ---------------------------------------------------------------------------
# 数据结构（两入口共用）
# ---------------------------------------------------------------------------


@dataclass
class SpecSourceFile:
    abs_path: str
    rel_posix: str
    module_names: List[str]
    spec_dir_posix: str
    namespace: Optional[str]


@dataclass
class FabricComponentSourceFile:
    abs_path: str
    rel_posix: str
    component_names: List[str]
    spec_dir_posix: str


@dataclass
class GenerationPlan:
    root: str
    spec_sources: List[SpecSourceFile] = field(default_factory=list)
    spec_path_dirs: List[str] = field(default_factory=list)
    name_to_class: Dict[str, str] = field(default_factory=dict)
    fabric_sources: List[FabricComponentSourceFile] = field(default_factory=list)
    fabric_component_names: List[str] = field(default_factory=list)


@dataclass
class CodegenArtifacts:
    spec_files: List[str]
    turbo_module_classes: List[str]
    registry_class_pairs: List[Tuple[str, str]]
    factory_base_name: str


@dataclass
class FabricComponentArtifacts:
    generated_component_files: List[str]
    components: List[Tuple[str, str]]


# ---------------------------------------------------------------------------
# IO
# ---------------------------------------------------------------------------


def read_text(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        return f.read()


def write_text(path: str, content: str) -> None:
    parent = os.path.dirname(path)
    if parent:
        os.makedirs(parent, exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)


def to_posix_relpath(root: str, path: str) -> str:
    return os.path.relpath(path, root).replace("\\", "/")


def load_package_json(path: str) -> dict:
    if not os.path.isfile(path):
        raise SystemExit(f"未找到 package.json: {path}")
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_package_json(path: str, data: dict) -> None:
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def read_root_package_name(root_dir: str) -> str:
    path = os.path.join(root_dir, "package.json")
    try:
        return load_package_json(path).get("name") or "unknown-package"
    except json.JSONDecodeError:
        content = read_text(path)
        m = re.search(r'^\s*"name"\s*:\s*"([^"]+)"\s*,?\s*$', content, flags=re.MULTILINE)
        if m:
            return m.group(1).strip()
        raise SystemExit(f"无法解析 package.json 的 name: {path}") from None


def run_cmd(cwd: str, args: List[str], dry_run: bool) -> int:
    print(f"[exec] cd {cwd} && {' '.join(args)}")
    if dry_run:
        return 0
    if os.name == "nt":
        return subprocess.call(subprocess.list2cmdline(args), cwd=cwd, shell=True)
    return subprocess.call(args, cwd=cwd, shell=False)


def log_key_lines(title: str, lines: Sequence[str]) -> None:
    print(f"  >>> {title}")
    for line in lines:
        print(f"      {line}")


def prune_ts_scan_dirnames(dirnames: List[str]) -> None:
    dirnames[:] = [
        d
        for d in dirnames
        if not d.startswith(".") and d.lower() not in SKIP_TS_SCAN_DIR_NAMES
    ]


# ---------------------------------------------------------------------------
# 步骤 4–6：npm / 模板 / codegen
# ---------------------------------------------------------------------------


def npm_argv(subcommand_and_args: List[str], legacy_peer_deps: bool) -> List[str]:
    argv = ["npm"] + subcommand_and_args
    if legacy_peer_deps:
        argv.insert(1, "--legacy-peer-deps")
    argv.insert(1, "--ignore-scripts")
    return argv


def pin_devdeps_react_and_rn(
    root: str,
    dry_run: bool,
    *,
    target_react: str = PIN_REACT_DEV,
    target_rn: str = PIN_REACT_NATIVE_DEV,
) -> None:
    pkg_path = os.path.join(root, "package.json")
    pkg = dict(load_package_json(pkg_path))
    dev_deps = dict(pkg.get("devDependencies") or {})
    prev_react = dev_deps.get("react")
    prev_rn = dev_deps.get("react-native")
    dev_deps["react"] = target_react
    dev_deps["react-native"] = target_rn
    pkg["devDependencies"] = dev_deps
    log_key_lines(
        "将固定 devDependencies 版本（执行 npm 前）",
        [
            f"react: {prev_react!r} -> {target_react!r}",
            f"react-native: {prev_rn!r} -> {target_rn!r}",
            f"文件: {pkg_path}",
        ],
    )
    if dry_run:
        print("  [dry-run] 跳过写入 package.json 的 devDependencies 固定")
    else:
        save_package_json(pkg_path, pkg)
        print("  已更新 package.json devDependencies 版本")


def npm_install_oh_dependencies(
    root: str,
    dry_run: bool,
    legacy_peer_deps: bool = True,
    *,
    rnoh_version: str = RNOH_PACKAGE_VERSION,
) -> None:
    lp_note = "（使用 --legacy-peer-deps，避免 devDependencies peer 冲突如 semantic-release）" if legacy_peer_deps else ""
    log_key_lines(
        f"将依次执行{lp_note}",
        [
            " ".join(npm_argv(["install"], legacy_peer_deps)),
            " ".join(npm_argv(["i", "-D", f"@react-native-oh/react-native-harmony@{rnoh_version}"], legacy_peer_deps)),
            " ".join(npm_argv(["i", "-D", f"@react-native-oh/react-native-harmony-cli@{rnoh_version}"], legacy_peer_deps)),
        ],
    )
    steps = [
        npm_argv(["install"], legacy_peer_deps),
        npm_argv(["i", "-D", f"@react-native-oh/react-native-harmony@{rnoh_version}"], legacy_peer_deps),
        npm_argv(["i", "-D", f"@react-native-oh/react-native-harmony-cli@{rnoh_version}"], legacy_peer_deps),
    ]
    for args in steps:
        rc = run_cmd(root, args, dry_run)
        if rc != 0 and not dry_run:
            raise SystemExit(f"命令失败 (exit {rc}): {' '.join(args)}")


def harmony_cpp_cmake_dest(root: str, short_name: str = "library") -> str:
    return os.path.join(root, "harmony", short_name, "src", "main", "cpp", "CMakeLists.txt")


def harmony_cpp_cmake_template_path(tool_example_dir: str = TOOL_EXAMPLE_DIR) -> str:
    return os.path.join(tool_example_dir, "harmony", "library", "src", "main", "cpp", "CMakeLists.txt")


def restore_harmony_cpp_cmake_if_missing(
    root: str,
    dry_run: bool,
    tool_example_dir: str = TOOL_EXAMPLE_DIR,
    short_name: str = "library",
) -> None:
    dest = harmony_cpp_cmake_dest(root, short_name)
    rel = os.path.relpath(dest, root).replace("\\", "/")
    if os.path.isfile(dest):
        print(f"  {rel} 已存在，跳过恢复")
        return
    src = harmony_cpp_cmake_template_path(tool_example_dir)
    if dry_run:
        print(f"  [dry-run] 将恢复缺失的 {rel}（自模板或内置默认）")
        return
    content = ""
    if os.path.isfile(src):
        content = read_text(src)
    else:
        content = _DEFAULT_HARMONY_CPP_CMAKELISTS
    content = content.replace("{{SHORT_NAME}}", short_name)
    write_text(dest, content)
    print(f"  已写入 CMakeLists.txt (target={short_name}): {dest}")


def copy_harmony_template(
    root: str,
    dry_run: bool,
    tool_example_dir: str = TOOL_EXAMPLE_DIR,
    short_name: str = "library",
) -> None:
    src = os.path.join(tool_example_dir, "harmony", "library")
    dst = os.path.join(root, "harmony", short_name)
    log_key_lines("拷贝路径", [f"源: {src}", f"目标: {dst}", "已存在则合并/覆盖 (dirs_exist_ok)"])
    if not os.path.isdir(src):
        print(f"  [warn] 模板不存在，跳过: {src}")
        return
    if dry_run:
        print(f"  [dry-run] copytree {src} -> {dst}")
        return
    shutil.copytree(src, dst, dirs_exist_ok=True)
    print(f"  已拷贝 -> {dst}")


def npm_run_codegen(
    root: str,
    dry_run: bool,
    tool_example_dir: str = TOOL_EXAMPLE_DIR,
    short_name: str = "library",
) -> None:
    log_key_lines(
        "预期产物目录",
        [
            f"C++ : ./harmony/{short_name}/src/main/cpp/generated",
            f"ETS : ./harmony/{short_name}/src/main/ets/generated",
        ],
    )
    rc = run_cmd(root, ["npm", "run", "codegen-lib"], dry_run)
    if rc != 0 and not dry_run:
        raise SystemExit("npm run codegen-lib 失败")
    restore_harmony_cpp_cmake_if_missing(root, dry_run, tool_example_dir, short_name)
    
    # 若 codegen 未生成 C++ 文件（仅 ETS），在 generated 目录创建 dummy.cpp 避免 CMake 报错
    generated_cpp_dir = os.path.join(root, "harmony", short_name, "src", "main", "cpp", "generated", "RNOH", "generated")
    if os.path.isdir(generated_cpp_dir):
        cpp_files = [f for f in os.listdir(generated_cpp_dir) if f.endswith(".cpp")]
        if not cpp_files and not dry_run:
            dummy_path = os.path.join(generated_cpp_dir, "dummy.cpp")
            write_text(dummy_path, "// Auto-generated: codegen produced no C++ sources (ETS-only)\nvoid dummy() {}\n")
            print(f"  已创建 dummy.cpp: {dummy_path}")


# ---------------------------------------------------------------------------
# 步骤 9：oh-package name
# ---------------------------------------------------------------------------


def sync_harmony_library_oh_package_name(root: str, dry_run: bool, short_name: str = "library") -> None:
    from lib.ohos_package_sync import resolve_ohos_npm_package_name

    npm_name = resolve_ohos_npm_package_name(root)
    path = os.path.join(root, "harmony", short_name, "oh-package.json5")
    log_key_lines(
        "对齐规则",
        [
            "根 package.json name → oh-package.json5 name",
            f"目标 npm 包名: {npm_name}",
            f"文件: {path}",
        ],
    )
    if not os.path.isfile(path):
        print(f"  [warn] 未找到: {path}")
        return
    from lib.ohos_package_sync import apply_oh_package_json5_content

    old = read_text(path)
    m_old = re.search(
        r'^\s*(?:"name"|name)\s*:\s*[\'"]([^\'"]+)[\'"]',
        old,
        flags=re.MULTILINE,
    )
    prev = m_old.group(1) if m_old else "(未解析到旧值)"
    log_key_lines("当前 oh-package name", [prev])
    new, changed = apply_oh_package_json5_content(old, npm_name)
    if not changed and prev == npm_name:
        print(f"  oh-package name 已是最新: {npm_name!r}")
        return
    if dry_run:
        print(f"  [dry-run] name: {prev!r} => {npm_name!r}")
    else:
        write_text(path, new)
        print(f"  已更新 name: {prev!r} => {npm_name!r}")


# ---------------------------------------------------------------------------
# Turbo：codegen 解析与渲染（步骤 7–8、10）
# ---------------------------------------------------------------------------


def find_spec_files_under_ets(ets_dir: str) -> List[str]:
    matches: List[str] = []
    if not os.path.isdir(ets_dir):
        return matches
    for r, _, files in os.walk(ets_dir):
        for fn in files:
            if not fn.endswith(".ts"):
                continue
            path = os.path.join(r, fn)
            if SPEC_MARKER in read_text(path):
                matches.append(path)
    return sorted(matches)


def extract_namespace_and_name(spec_file_content: str) -> Tuple[Optional[str], Optional[str]]:
    ns = None
    name = None
    m1 = _RE_EXPORT_NAMESPACE.search(spec_file_content)
    if m1:
        ns = m1.group(1)
    m2 = re.search(
        r"export\s+const\s+NAME\s*=\s*['\"]([^'\"]+)['\"]\s+as\s+const",
        spec_file_content,
    )
    if m2:
        name = m2.group(1)
    return ns, name


def extract_spec_interface_block(spec_file_content: str) -> str:
    m = re.search(r"export\s+interface\s+Spec\s*\{([\s\S]*?)\n\s*\}", spec_file_content)
    if not m:
        raise ValueError("未找到 export interface Spec 块")
    return m.group(1)


def extract_method_signatures(interface_body: str) -> List[str]:
    sigs: List[str] = []
    for line in interface_body.splitlines():
        s = line.strip()
        if not s or s.startswith("//") or s.startswith("/*") or s.startswith("*"):
            continue
        if re.match(r"^[A-Za-z_]\w*\s*\(.*\)\s*:\s*.*;\s*$", s):
            sigs.append(s)
    return sigs


def turbo_module_class_name(namespace: Optional[str]) -> str:
    if namespace and namespace.strip():
        return f"{namespace}TurboModule"
    return "GeneratedTurboModule"


def pick_factory_base_name(spec_files: Sequence[str], plan: GenerationPlan) -> str:
    # 优先使用 package.json 中的 harmony.autolinking.etsPackageClassName 配置
    try:
        pkg = load_package_json(os.path.join(plan.root, "package.json"))
        harmony = pkg.get("harmony", {})
        if isinstance(harmony, dict):
            autolinking = harmony.get("autolinking", {})
            if isinstance(autolinking, dict):
                ets_cls = autolinking.get("etsPackageClassName")
                if ets_cls and isinstance(ets_cls, str):
                    # etsPackageClassName 是完整类名（如 "VersionInfoPackage"）
                    # 需要去掉 "Package" 后缀得到 base_name
                    if ets_cls.endswith("Package"):
                        return ets_cls[:-7]  # 去掉 "Package"
                    return ets_cls
    except Exception:
        pass
    
    # 其次从 Spec namespace 推导
    if spec_files:
        ns, _ = extract_namespace_and_name(read_text(spec_files[0]))
        if ns:
            return ns
    
    # 最后从 package name 推导
    try:
        pkg = load_package_json(os.path.join(plan.root, "package.json"))
        name = str(pkg.get("name") or "generated")
        short = name.split("/")[-1]
        parts = re.split(r"[-_]", short)
        return "".join(p[:1].upper() + p[1:] for p in parts if p) or "Generated"
    except Exception:
        return "Generated"


def log_codegen_scan_summary(artifacts: CodegenArtifacts, root: str, ets_dir: str) -> None:
    log_key_lines(
        f"codegen Spec 扫描 ({ets_dir})",
        [
            f"含 export interface Spec 的文件数: {len(artifacts.spec_files)}",
            f"Factory/Package 基类名前缀: {artifacts.factory_base_name}",
            f"注册名 → TurboModule 类: {dict(artifacts.registry_class_pairs)}",
        ],
    )
    for i, p in enumerate(artifacts.spec_files, 1):
        rel = to_posix_relpath(root, p)
        content = read_text(p)
        ns, name_c = extract_namespace_and_name(content)
        try:
            body = extract_spec_interface_block(content)
            n_methods = len(extract_method_signatures(body))
        except ValueError:
            n_methods = 0
        cls_name = turbo_module_class_name(ns)
        print(
            f"      [{i}] {rel} | namespace={ns!r} | NAME={name_c!r} | "
            f"实现类={cls_name} | Spec 方法数≈{n_methods}"
        )


def collect_codegen_artifacts(
    root: str,
    plan: GenerationPlan,
    ets_dir: str,
) -> Optional[CodegenArtifacts]:
    if not os.path.isdir(ets_dir):
        print(f"  [warn] ETS 目录不存在: {ets_dir}")
        return None
    spec_files = find_spec_files_under_ets(ets_dir)
    if not spec_files:
        print(f"  [warn] 未找到含 '{SPEC_MARKER}' 的 .ts: {ets_dir}")
        return None
    turbo_classes: List[str] = []
    pairs: List[Tuple[str, str]] = []
    for spec_path in spec_files:
        content = read_text(spec_path)
        ns, name_const = extract_namespace_and_name(content)
        class_name = turbo_module_class_name(ns)
        turbo_classes.append(class_name)
        reg_name = name_const
        if not reg_name:
            for k, v in plan.name_to_class.items():
                if v == class_name:
                    reg_name = k
                    break
        if reg_name:
            pairs.append((reg_name, class_name))
        else:
            print(f"  [warn] 无法为 {class_name} 确定 Turbo 注册名")
    for reg, cls in plan.name_to_class.items():
        if not any(p[0] == reg for p in pairs):
            pairs.append((reg, cls))
    base = pick_factory_base_name(spec_files, plan)
    return CodegenArtifacts(
        spec_files=list(spec_files),
        turbo_module_classes=turbo_classes,
        registry_class_pairs=pairs,
        factory_base_name=base,
    )


def render_turbo_module_impl(
    class_name: str,
    rel_spec_posix: str,
    namespace: Optional[str],
    method_sigs: List[str],
) -> str:
    methods: List[str] = []
    for sig in method_sigs:
        sig2 = sig.rstrip(";")
        methods.append(
            f"  {sig2} {{\n"
            f"    throw new Error('Not implemented');\n"
            f"  }}\n"
        )
    methods_block = "\n".join(methods) + ("\n" if methods else "")
    if namespace:
        spec_ref = f"TM.{namespace}.Spec"
    else:
        spec_ref = "unknown"
    return (
        "import { UITurboModule, UITurboModuleContext } from '@rnoh/react-native-openharmony/ts';\n"
        "import { TM } from './generated/ts';\n"
        "import hilog from '@ohos.hilog';\n"
        "\n"
        f"export class {class_name} extends UITurboModule implements {spec_ref} {{\n"
        "  constructor(ctx: UITurboModuleContext) {\n"
        "    super(ctx);\n"
        "  }\n"
        "\n"
        f"{methods_block}"
        "}\n"
    )

def render_factory_package_file(base_name: str, pairs: Sequence[Tuple[str, str]]) -> str:
    seen_cls: Set[str] = set()
    import_lines: List[str] = []
    for _, cls in sorted(pairs, key=lambda x: x[1]):
        if cls in seen_cls:
            continue
        seen_cls.add(cls)
        import_lines.append(f"import {{ {cls} }} from './{cls}';")
    imports = "\n".join(import_lines)
    create_arms: List[str] = []
    has_arms: List[str] = []
    for reg, cls in pairs:
        create_arms.append(
            f"    if (name === '{reg}') {{\n" f"      return new {cls}(this.ctx);\n" f"    }}"
        )
        has_arms.append(f"    if (name === '{reg}') {{\n" f"      return true;\n" f"    }}")
    factory_cls = f"{base_name}TurboModulesFactory"
    package_cls = f"{base_name}Package"
    return (
        "import { RNPackage, TurboModulesFactory } from '@rnoh/react-native-openharmony/ts';\n"
        "import type { TurboModule, TurboModuleContext } from '@rnoh/react-native-openharmony/ts';\n"
        f"{imports}\n"
        "\n"
        f"class {factory_cls} extends TurboModulesFactory {{\n"
        "  createTurboModule(name: string): TurboModule | null {\n"
        f"{chr(10).join(create_arms)}\n"
        "    return null;\n"
        "  }\n"
        "\n"
        "  hasTurboModule(name: string): boolean {\n"
        f"{chr(10).join(has_arms)}\n"
        "    return false;\n"
        "  }\n"
        "}\n"
        "\n"
        f"export class {package_cls} extends RNPackage {{\n"
        "  createTurboModulesFactory(ctx: TurboModuleContext): TurboModulesFactory {\n"
        f"    return new {factory_cls}(ctx);\n"
        "  }\n"
        "}\n"
    )


def render_factory_package_file_autolink(base_name: str, pairs: Sequence[Tuple[str, str]]) -> str:
    """
    生成 autolink 版本的 TurboModulesFactory（.ets 文件）。
    
    使用新架构：
    - 基类：RNOHPackage
    - 注册方式：getUITurboModuleFactoryByNameMap + createEagerUITurboModuleByNameMap
    - Module 名称：使用 TM.{Name}.NAME
    """
    seen_cls: Set[str] = set()
    import_lines: List[str] = []
    for _, cls in sorted(pairs, key=lambda x: x[1]):
        if cls in seen_cls:
            continue
        seen_cls.add(cls)
        import_lines.append(f"import {{ {cls} }} from './{cls}';")
    imports = "\n".join(import_lines)
    
    # 构建 getUITurboModuleFactoryByNameMap 的 map.set 语句
    map_set_lines: List[str] = []
    for reg, cls in pairs:
        map_set_lines.append(f"    map.set(TM.{reg}.NAME, (ctx: UITurboModuleContext) => new {cls}(ctx));")
    map_set_block = "\n".join(map_set_lines)
    
    # 构建 createEagerUITurboModuleByNameMap 的返回语句
    eager_lines: List[str] = []
    for reg, cls in pairs:
        eager_lines.append(f"      .set(TM.{reg}.NAME, module)")
    eager_block = "\n".join(eager_lines)
    
    package_cls = f"{base_name}Package"
    
    return (
        "import { RNOHPackage } from '@rnoh/react-native-openharmony/ets';\n"
        "import type { UITurboModule, UITurboModuleContext } from '@rnoh/react-native-openharmony/ts';\n"
        f"{imports}\n"
        "import { TM } from './generated/ts';\n"
        "\n"
        f"export class {package_cls} extends RNOHPackage {{\n"
        "  getUITurboModuleFactoryByNameMap(): Map<string, (ctx: UITurboModuleContext) => UITurboModule | null> {\n"
        "    const map = new Map<string, (ctx: UITurboModuleContext) => UITurboModule | null>();\n"
        f"{map_set_block}\n"
        "    return map;\n"
        "  }\n"
        "\n"
        "  override async createEagerUITurboModuleByNameMap(ctx: UITurboModuleContext): Promise<Map<string, UITurboModule>> {\n"
        f"    const module = new {pairs[0][1]}(ctx);\n"
        "    return new Map()\n"
        f"{eager_block}\n"
        "  }\n"
        "}\n"
)


def render_library_index_ets(base_name: str) -> str:
    """生成 index.ets 文件（autolink 入口）"""
    package_cls = f"{base_name}Package"
    factory_base = f"{base_name}TurboModulesFactory"
    
    return f"export {{ {package_cls} as default }} from './src/main/ets/{factory_base}';\n"


def render_library_ts_exports_turbo(turbo_module_classes: Sequence[str], base_name: str) -> str:
    factory_file_base = f"{base_name}TurboModulesFactory"
    lines: List[str] = []
    for cls in sorted(set(turbo_module_classes)):
        lines.append(f"export * from './src/main/ets/{cls}';")
    lines.append(f"export * from './src/main/ets/{factory_file_base}';")
    lines.append("")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Fabric：codegen 解析与渲染
# ---------------------------------------------------------------------------


def find_codegen_fabric_component_files(ets_dir: str) -> List[str]:
    comp_dir = os.path.join(ets_dir, "generated", "components")
    if not os.path.isdir(comp_dir):
        return []
    out: List[str] = []
    for walk_root, _, files in os.walk(comp_dir):
        for fn in files:
            if not fn.endswith(".ts"):
                continue
            p = os.path.join(walk_root, fn)
            text = read_text(p)
            if "export namespace" in text and "export const NAME" in text:
                out.append(p)
    return sorted(out)


def parse_codegen_fabric_component(ns_file_content: str) -> Optional[Tuple[str, str]]:
    ns_m = _RE_EXPORT_NAMESPACE.search(ns_file_content)
    if not ns_m:
        return None
    ns = ns_m.group(1)
    name_m = re.search(
        r"export\s+const\s+NAME\s*=\s*['\"]([^'\"]+)['\"]\s+as\s+const",
        ns_file_content,
        flags=re.MULTILINE,
    )
    if not name_m:
        return None
    return ns, name_m.group(1)


def collect_fabric_component_artifacts(root: str, ets_dir: str) -> Optional[FabricComponentArtifacts]:
    files = find_codegen_fabric_component_files(ets_dir)
    if not files:
        return None
    components: List[Tuple[str, str]] = []
    seen: Set[str] = set()
    for p in files:
        parsed = parse_codegen_fabric_component(read_text(p))
        if not parsed:
            continue
        ns, name = parsed
        key = f"{ns}:{name}"
        if key in seen:
            continue
        seen.add(key)
        components.append((ns, name))
    components.sort(key=lambda x: x[0])
    return FabricComponentArtifacts(generated_component_files=files, components=components)


def extract_event_payload_by_name_body(codegen_ts: str) -> Optional[str]:
    """从 codegen 的 .ts 中截取 `export interface EventPayloadByName { ... }` 的 body（含嵌套花括号平衡）。"""
    key = "export interface EventPayloadByName"
    idx = codegen_ts.find(key)
    if idx < 0:
        return None
    brace0 = codegen_ts.find("{", idx)
    if brace0 < 0:
        return None
    depth = 0
    i = brace0
    while i < len(codegen_ts):
        c = codegen_ts[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return codegen_ts[brace0 + 1 : i]
        i += 1
    return None


def parse_event_names_from_event_payload_body(body: str) -> List[str]:
    """
    取 EventPayloadByName 内「最浅一层」属性名（避免嵌套对象里的字段被当成事件名）。
    """
    lines = body.splitlines()
    candidates: List[Tuple[int, str]] = []
    for line in lines:
        m = re.match(r"^(\s*)([A-Za-z_]\w*)\s*[?:]?\s*:", line)
        if m:
            candidates.append((len(m.group(1)), m.group(2)))
    if not candidates:
        return []
    min_indent = min(c[0] for c in candidates)
    return [name for indent, name in candidates if indent == min_indent]


def parse_event_names_from_codegen_component_ts(codegen_ts: Optional[str]) -> List[str]:
    if not codegen_ts:
        return []
    inner = extract_event_payload_by_name_body(codegen_ts)
    if inner is None:
        return []
    return parse_event_names_from_event_payload_body(inner)


def extract_exported_interface_body(codegen_ts: str, interface_name: str) -> Optional[str]:
    """
    截取 `export interface <interface_name> { ... }` 的 body（花括号平衡）。
    Fabric codegen（harmony-cli ComponentUtilsTSTemplate）中，各组件 JS 专有 props 在 DirectRawProps。
    """
    key = f"export interface {interface_name}"
    idx = codegen_ts.find(key)
    if idx < 0:
        return None
    brace0 = codegen_ts.find("{", idx)
    if brace0 < 0:
        return None
    depth = 0
    i = brace0
    while i < len(codegen_ts):
        c = codegen_ts[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return codegen_ts[brace0 + 1 : i]
        i += 1
    return None


def parse_direct_raw_props_from_codegen(codegen_ts: Optional[str]) -> List[Tuple[str, str, bool]]:
    """
    解析 generated/components/<Name>.ts 中 DirectRawProps 的字段。
    返回 (属性名, TS 类型表达式已压缩空白, 是否可选 ?:) 列表。
    """
    if not codegen_ts:
        return []
    body = extract_exported_interface_body(codegen_ts, "DirectRawProps")
    if body is None:
        return []
    fields: List[Tuple[str, str, bool]] = []
    for raw_line in body.splitlines():
        line = raw_line.strip()
        if not line or line.startswith("//") or line.startswith("*"):
            continue
        m = re.match(r"^([A-Za-z_]\w*)\s*(\?)?\s*:\s*(.+?);?\s*$", line)
        if not m:
            continue
        name, opt_mark, ts_type = m.group(1), m.group(2), m.group(3).strip().rstrip(";").strip()
        fields.append((name, " ".join(ts_type.split()), opt_mark == "?"))
    return fields


def _fabric_ts_type_to_arkts_state_and_imports(ts_type: str) -> Tuple[str, List[str]]:
    """
    将 codegen DirectRawProps 中的 TS 类型映射为 ArkTS @State 可用注解。
    返回 (arkts_annotation, 需从 @rnoh/react-native-openharmony 额外 import 的符号列表)。
    """
    t = " ".join(ts_type.split())
    extra: List[str] = []
    if t == "number":
        return "number", extra
    if t == "string":
        return "string", extra
    if t == "boolean":
        return "boolean", extra
    if t == "Tag":
        return "number", extra
    if "ColorValue" in t:
        extra.append("ColorValue")
        return "ColorValue", extra
    if t == "Color":
        extra.append("Color")
        return "Color", extra
    if t.startswith("ReadonlyArray<") and t.endswith(">"):
        inner = t[len("ReadonlyArray<") : -1]
        inner_ann, inner_ex = _fabric_ts_type_to_arkts_state_and_imports(inner)
        return f"Array<{inner_ann}>", extra + inner_ex
    if t.startswith("Array<") and t.endswith(">"):
        inner = t[len("Array<") : -1]
        inner_ann, inner_ex = _fabric_ts_type_to_arkts_state_and_imports(inner)
        return f"Array<{inner_ann}>", extra + inner_ex
    if "|" in t:
        parts = [p.strip() for p in t.split("|")]
        lowered = {p.lower() for p in parts}
        if lowered <= {"number", "null"} or lowered <= {"number", "undefined"}:
            return "number", extra
        if lowered <= {"string", "null"} or lowered <= {"string", "undefined"}:
            return "string", extra
        if lowered <= {"boolean", "null"} or lowered <= {"boolean", "undefined"}:
            return "boolean", extra
        if all(p.startswith("'") and p.endswith("'") for p in parts if p not in ("null", "undefined")):
            return "string", extra
    if t == "Object" or t == "object":
        return "Object", extra
    if t == "unknown" or t == "mixed":
        return "Object", extra
    return "Object", extra


def _arkts_state_default_initializer(arkts_ann: str) -> str:
    if arkts_ann == "number":
        return " = 0"
    if arkts_ann == "string":
        return " = ''"
    if arkts_ann == "boolean":
        return " = false"
    if arkts_ann == "ColorValue":
        return " = 0"
    if arkts_ann == "Color":
        return " = new Color({ r: 0, g: 0, b: 0, a: 255 })"
    if arkts_ann.startswith("Array<"):
        return " = []"
    return " = {} as Object"


def render_fabric_component_ets_stub(
    namespace: str,
    codegen_component_ts: Optional[str] = None,
    layout: str = "leaf",
) -> str:
    """
    生成 Fabric 组件 ArkTS stub。

    layout: ``leaf``（默认 RNViewBase 占位）或 ``container``（LazyForEach 渲染子节点）。
    ``unknown`` 与 ``leaf`` 相同，仅在文件头注明需人工确认。

    若传入 codegen 生成的 `generated/components/<Ns>.ts` 全文：
    - 解析 EventPayloadByName 并补充 EventEmitter 注释；
    - 解析 DirectRawProps，为每个 JS 专有 prop 生成 @State 与 descriptor 同步赋值。
    """
    effective_layout = "leaf" if layout in ("leaf", "unknown") else "container"
    event_names = parse_event_names_from_codegen_component_ts(codegen_component_ts)
    raw_props = parse_direct_raw_props_from_codegen(codegen_component_ts)

    event_comment_lines: List[str] = []
    if event_names:
        event_comment_lines.append(
            f"    // codegen EventPayloadByName 事件: {', '.join(event_names)}"
        )
        ex = event_names[0]
        event_comment_lines.append(
            f'    // 向 JS 发事件示例: this.eventEmitter!.emit("{ex}", {{ /* 见 codegen 中该事件 payload 类型 */ }});'
        )
    else:
        event_comment_lines.append(
            "    // codegen 中 EventPayloadByName 当前为空：请在 JS 侧为组件声明 onXxx 事件并重新 codegen 后，再使用 emit"
        )

    event_comment_block = "\n".join(event_comment_lines)

    rnoh_symbols: Set[str] = {"RNOHContext", "RNViewBase"}
    prop_state_lines: List[str] = []
    assign_lines: List[str] = []
    prop_names_for_hint: List[str] = []
    for prop_name, ts_type, _optional in raw_props:
        ark_ann, extra_syms = _fabric_ts_type_to_arkts_state_and_imports(ts_type)
        for s in extra_syms:
            rnoh_symbols.add(s)
        init = _arkts_state_default_initializer(ark_ann)
        prop_state_lines.append(f"  @State private {prop_name}: {ark_ann}{init};")
        assign_lines.append(f"this.{prop_name} = rawProps.{prop_name} ?? {init.strip(' = ')};")
        prop_names_for_hint.append(prop_name)

    if prop_state_lines:
        direct_raw_comment = (
            "    // codegen DirectRawProps → 已从 descriptor.rawProps 同步到下方 @State，可在 build() 直接使用"
        )
    else:
        direct_raw_comment = (
            "    // codegen 未解析到 DirectRawProps（或为空）：无 JS 专有 props；"
            "尺寸/圆角/背景等请用 descriptorWrapper.width、descriptorWrapper.borderRadius、descriptorWrapper.backgroundColor 等基类便捷属性"
        )

    if prop_names_for_hint:
        hint = (
            f"在 build() 中可使用 this.{prop_names_for_hint[0]} 等 @State（来自 descriptor.rawProps）。"
            "实现 UI 后可删除本段提示。"
        )
    else:
        hint = (
            "请在 build() 中根据 descriptorWrapper 与基类便捷属性实现界面。"
            "若需 JS 专有 props，请在 JS Spec 声明后重新 codegen 以生成 DirectRawProps。"
            "实现后可删除本段提示。"
        )

    state_block = ("\n" + "\n".join(prop_state_lines) + "\n") if prop_state_lines else "\n"
    leaf_assign_block = (
        "\n".join(f"            {line}" for line in assign_lines)
        if assign_lines
        else "            // （无 DirectRawProps 字段）"
    )
    container_assign_block = (
        "\n".join(f"      {line}" for line in assign_lines)
        if assign_lines
        else "      // （无 DirectRawProps 字段）"
    )

    layout_note = ""
    if layout == "unknown":
        layout_note = (
            " * Fabric layout 未自动判定，已生成叶子 stub；若需包裹 RN 子节点请改为容器模板（见 fabric-component.md）。\n"
        )
    elif effective_layout == "container":
        layout_note = " * 自动判定为容器组件：LazyForEach 渲染 RN children；请在外层 Stack 叠加手势/变换。\n"

    header = (
        "/**\n"
        " * This is a minimal stub. Fill in UI/behavior as needed.\n"
        f"{layout_note}"
        " * 使用 Spec.EventEmitter 向 JS 派发事件（与 codegen 的 EventPayloadByName 对齐）。\n"
        " * JS 专有 props 见 codegen 同文件的 DirectRawProps，已由本模板从 descriptor.rawProps 同步到 @State。\n"
        " */\n"
    )
    spec_import = f"import {{ {namespace} as Spec }} from '../generated/components/{namespace}';\n"

    if effective_layout == "container":
        container_syms = {
            "RNOHContext",
            "RNComponentContext",
            "DescriptorWrapper",
            "ViewBaseDescriptor",
            "ViewDescriptorWrapperBase",
            "RNViewBaseAttributeModifier",
        }
        container_syms.update(rnoh_symbols - {"RNViewBase"})
        import_main = ", ".join(sorted(container_syms))
        rnoh_import = (
            f"import {{\n"
            f"  {import_main},\n"
            f"}} from '@rnoh/react-native-openharmony';\n"
        )
        return (
            f"{header}\n"
            f"{rnoh_import}"
            f"{spec_import}\n"
            "@Component\n"
            f"export struct {namespace} {{\n"
            "  public static readonly NAME = Spec.NAME;\n"
            "  public ctx!: RNOHContext;\n"
            "  public tag: number = 0;\n"
            "  @State private descriptorWrapper: ViewDescriptorWrapperBase | undefined = undefined;\n"
            "  @State private rnViewAttributeModifier: RNViewBaseAttributeModifier | undefined = undefined;\n"
            f"{state_block}"
            "  private eventEmitter: Spec.EventEmitter | undefined = undefined;\n"
            "  private cleanUpCallbacks: (() => void)[] = [];\n"
            "\n"
            "  aboutToAppear(): void {\n"
            "    this.eventEmitter = new Spec.EventEmitter(this.ctx.rnInstance, this.tag);\n"
            "    const descriptor = this.ctx.descriptorRegistry.getDescriptor<ViewBaseDescriptor>(this.tag);\n"
            "    this.applyDescriptor(descriptor);\n"
            "    this.cleanUpCallbacks.push(\n"
            "      this.ctx.descriptorRegistry.subscribeToDescriptorChanges(this.tag, (d: ViewBaseDescriptor) => {\n"
            "        this.applyDescriptor(d);\n"
            "      })\n"
            "    );\n"
            f"\n{event_comment_block}\n"
            f"\n{direct_raw_comment}\n"
            "  }\n"
            "\n"
            "  private applyDescriptor(descriptor: ViewBaseDescriptor): void {\n"
            "    let dw = this.ctx.descriptorRegistry.findDescriptorWrapperByTag<ViewDescriptorWrapperBase>(this.tag);\n"
            "    if (!dw || !(dw instanceof ViewDescriptorWrapperBase)) {\n"
            "      dw = new ViewDescriptorWrapperBase(descriptor);\n"
            "    }\n"
            "    if (this.ctx instanceof RNComponentContext) {\n"
            "      this.rnViewAttributeModifier = new RNViewBaseAttributeModifier(dw, this.ctx);\n"
            "    }\n"
            "    this.descriptorWrapper = dw;\n"
            "    const rawProps = descriptor.rawProps as Spec.DirectRawProps;\n"
            "    if (rawProps) {\n"
            f"{container_assign_block}\n"
            "    }\n"
            "  }\n"
            "\n"
            "  aboutToDisappear(): void {\n"
            "    this.cleanUpCallbacks.forEach(cb => cb());\n"
            "  }\n"
            "\n"
            "  build() {\n"
            "    Stack() {\n"
            "      if (this.descriptorWrapper?.focusable) {\n"
            "        Button().width(0).height(0).padding(0).margin(0)\n"
            "      }\n"
            "      if (this.ctx instanceof RNComponentContext) {\n"
            "        LazyForEach(this.ctx.createComponentDataSource({ tag: this.tag }),\n"
            "          (descriptorWrapper: DescriptorWrapper) => {\n"
            "            (this.ctx as RNComponentContext).wrappedRNComponentBuilder.builder(\n"
            "              (this.ctx as RNComponentContext),\n"
            "              descriptorWrapper.tag\n"
            "            )\n"
            "          },\n"
            "          (descriptorWrapper: DescriptorWrapper) =>\n"
            "            descriptorWrapper.tag.toString() + '@' + descriptorWrapper.renderKey\n"
            "        )\n"
            "      }\n"
            "    }\n"
            "    .width('100%')\n"
            "    .height('100%')\n"
            "    .id(this.tag.toString())\n"
            "    .align(Alignment.TopStart)\n"
            "    .attributeModifier(this.rnViewAttributeModifier)\n"
            f"    // {hint}\n"
            "  }\n"
            "}\n"
        )

    import_inner = ", ".join(sorted(rnoh_symbols))
    rnoh_import_line = f"import {{ {import_inner} }} from '@rnoh/react-native-openharmony';\n"

    return (
        f"{header}\n"
        f"{rnoh_import_line}"
        f"{spec_import}\n"
        "@Component\n"
        f"export struct {namespace} {{\n"
        "  public static readonly NAME = Spec.NAME;\n"
        "  public ctx!: RNOHContext;\n"
        "  public tag: number = 0;\n"
        "\n"
        f"{state_block}"
        "  private eventEmitter: Spec.EventEmitter | undefined = undefined;\n"
        "  private cleanUpCallbacks: (() => void)[] = [];\n"
        "\n"
        "  aboutToAppear(): void {\n"
        "    this.eventEmitter = new Spec.EventEmitter(this.ctx.rnInstance, this.tag);\n"
        "\n"
        "    this.cleanUpCallbacks.push(\n"
        "      this.ctx.descriptorRegistry.subscribeToDescriptorChanges(\n"
        "        this.tag,\n"
        "        (descriptor: Spec.Descriptor) => {\n"
        "          const rawProps = descriptor.rawProps as Spec.DirectRawProps;\n"
        "          if (rawProps) {\n"
        f"{leaf_assign_block}\n"
        "          }\n"
        "        }\n"
        "      )\n"
        "    );\n"
        "\n"
        f"{event_comment_block}\n"
        "\n"
        f"{direct_raw_comment}\n"
        "\n"
        "    // 若 JS 侧定义了 codegenNativeCommands，可在此订阅：\n"
        "    // this.cleanUpCallbacks.push(\n"
        "    //   new Spec.CommandReceiver(this.ctx.componentCommandReceiver, this.tag).subscribe('cmd', (argv) => {})\n"
        "    // );\n"
        "  }\n"
        "\n"
        "  aboutToDisappear(): void {\n"
        "    for (const cb of this.cleanUpCallbacks) {\n"
        "      cb();\n"
        "    }\n"
        "  }\n"
        "\n"
        "  build() {\n"
        "    RNViewBase({ ctx: this.ctx, tag: this.tag }) {\n"
        "      Column() {\n"
        f"        Text('[未实现原生 UI] {hint}')\n"
        "          .fontSize(12)\n"
        "          .fontColor('#C62828')\n"
        "      }\n"
        "      .width('100%')\n"
        "      .padding(8)\n"
        "    }\n"
        "  }\n"
        "}\n"
    )


def render_generated_package_ts(components: Sequence[Tuple[str, str]]) -> str:
    import_lines: List[str] = []
    for ns, _ in components:
        import_lines.append(f"import {{ {ns} as {ns}Spec }} from './generated/components/{ns}';")
    imports = "\n".join(import_lines)
    map_lines: List[str] = []
    for ns, _ in components:
        map_lines.append(f"      [{ns}Spec.NAME]: (ctx) => new {ns}Spec.DescriptorWrapper(ctx.descriptor),")
    map_body = "\n".join(map_lines)
    return (
        "\n"
        "import { RNPackage } from '@rnoh/react-native-openharmony/ts';\n"
        "import type {\n"
        "  DescriptorWrapperFactoryByDescriptorTypeCtx,\n"
        "  DescriptorWrapperFactoryByDescriptorType,\n"
        "} from '@rnoh/react-native-openharmony/ts';\n"
        f"{imports}\n"
        "\n"
        "export class GeneratedPackage extends RNPackage {\n"
        "  createDescriptorWrapperFactoryByDescriptorType(\n"
        "    ctx: DescriptorWrapperFactoryByDescriptorTypeCtx\n"
        "  ): DescriptorWrapperFactoryByDescriptorType {\n"
        "    return {\n"
        f"{map_body}\n"
        "    };"
        "  }\n"
        "}\n"
    )


def render_generated_package_ets(components: Sequence[Tuple[str, str]]) -> str:
    """生成 Fabric Package（.ets 文件，使用 RNOHPackage 基类）"""
    import_lines: List[str] = []
    for ns, _ in components:
        import_lines.append(f"import {{ {ns} as {ns}Spec }} from './generated/components/{ns}';")
    imports = "\n".join(import_lines)
    map_lines: List[str] = []
    for ns, _ in components:
        # ArkTS 不支持计算属性名 [namespace.NAME]，直接使用组件名称
        map_lines.append(f"      {ns}: (ctx) => new {ns}Spec.DescriptorWrapper(ctx.descriptor),")
    map_body = "\n".join(map_lines)
    
    return (
        "import { RNOHPackage } from '@rnoh/react-native-openharmony/ets';\n"
        "import type {\n"
        "  DescriptorWrapperFactoryByDescriptorTypeCtx,\n"
        "  DescriptorWrapperFactoryByDescriptorType,\n"
        "} from '@rnoh/react-native-openharmony/ts';\n"
        f"{imports}\n"
        "\n"
        "export class GeneratedPackage extends RNOHPackage {\n"
        "  createDescriptorWrapperFactoryByDescriptorType(\n"
        "    ctx: DescriptorWrapperFactoryByDescriptorTypeCtx\n"
        "  ): DescriptorWrapperFactoryByDescriptorType {\n"
        "    return {\n"
        f"{map_body}\n"
        "    };"
        "  }\n"
        "}\n"
    )


def render_library_ts_exports_for_fabric() -> str:
    """
    库入口 ts.ts 仅导出 GeneratedPackage（.ts）。
    不可 re-export components/*.ets：ArkUI 组件为 ArkTS，在 ts.ts 中导出会触发
    Importing ArkTS files in JS and TS files is forbidden。
    应用侧请从 '<pkg>/src/main/ets/components/<Name>' 直接 import 组件 struct。
    """
    lines: List[str] = [
        "export * from './src/main/ets/GeneratedPackage';",
        "",
    ]
    return "\n".join(lines)


def render_library_index_ets_for_fabric() -> str:
    """生成 Fabric 库入口 index.ets"""
    return "export { GeneratedPackage as default } from './src/main/ets/GeneratedPackage';\n"
