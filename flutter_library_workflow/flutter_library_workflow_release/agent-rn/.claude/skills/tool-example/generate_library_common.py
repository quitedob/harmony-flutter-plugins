#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
RN Harmony 脚手架：generate_library_turbo / generate_library_fabric 的公共实现。

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

# 与脚本同目录（tool-example/），用于定位 harmony/ 模板与默认 CMakeLists
TOOL_EXAMPLE_DIR = os.path.dirname(os.path.abspath(__file__))


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

CODEGEN_SCRIPT = (
    "react-native codegen-harmony "
    "--cpp-output-path ./harmony/library/src/main/cpp/generated "
    "--ets-output-path ./harmony/library/src/main/ets/generated"
)

HARMONY_CPP_CMAKELISTS_REL = ("harmony", "library", "src", "main", "cpp", "CMakeLists.txt")

_DEFAULT_HARMONY_CPP_CMAKELISTS = """# the minimum version of CMake.
cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE on)

# react-native codegen-harmony 将 C++ 产物放在 generated/；#include 以 src/main/cpp 为根（如 generated/Foo.h），
# 同时 generated 下的 .cpp 常使用 #include "Foo.h"，故需同时加入 cpp 与 cpp/generated。
set(library_generated_dir "${CMAKE_CURRENT_SOURCE_DIR}/generated")
# 不用 **/*.cpp：OHOS 自带 CMake 在 Windows 上常匹配不到，会得到空列表 → add_library 报 No SOURCES。
file(GLOB_RECURSE library_generated_SRC CONFIGURE_DEPENDS "${library_generated_dir}/*.cpp")
file(GLOB library_SRC CONFIGURE_DEPENDS *.cpp)
add_library(library SHARED ${library_SRC} ${library_generated_SRC})
target_include_directories(library PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}
    ${library_generated_dir})
target_link_libraries(library PUBLIC rnoh)
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
# 步骤 2–3：package.json
# ---------------------------------------------------------------------------


def update_package_json_harmony(
    root: str,
    spec_path_dirs: List[str],
    dry_run: bool,
    *,
    log_spec_paths_suffix: str = "",
) -> None:
    log_key_lines(
        "将写入的内容",
        [
            'harmony.alias = "RNSpec"',
            f"harmony.codegenConfig[0].specPaths = {spec_path_dirs}{log_spec_paths_suffix}",
        ],
    )
    pkg_path = os.path.join(root, "package.json")
    pkg = load_package_json(pkg_path)
    harmony = {
        "alias": "RNSpec",
        "codegenConfig": [{"version": 1, "specPaths": list(spec_path_dirs)}],
    }
    pkg = dict(pkg)
    pkg["harmony"] = harmony
    if dry_run:
        print(f"  [dry-run] {pkg_path}\n{json.dumps({'harmony': harmony}, indent=2, ensure_ascii=False)}")
        return
    save_package_json(pkg_path, pkg)
    print(f"  已写入: {pkg_path}")


def update_package_json_codegen_script(root: str, dry_run: bool) -> None:
    log_key_lines("将写入 scripts.codegen", [CODEGEN_SCRIPT])
    pkg_path = os.path.join(root, "package.json")
    pkg = dict(load_package_json(pkg_path))
    scripts = dict(pkg.get("scripts") or {})
    scripts["codegen"] = CODEGEN_SCRIPT
    pkg["scripts"] = scripts
    if dry_run:
        print(f"  [dry-run] scripts.codegen = {CODEGEN_SCRIPT!r}")
        return
    save_package_json(pkg_path, pkg)
    print(f"  已写入: {pkg_path}")


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


def harmony_cpp_cmake_dest(root: str) -> str:
    return os.path.join(root, *HARMONY_CPP_CMAKELISTS_REL)


def harmony_cpp_cmake_template_path(tool_example_dir: str = TOOL_EXAMPLE_DIR) -> str:
    return os.path.join(tool_example_dir, *HARMONY_CPP_CMAKELISTS_REL)


def restore_harmony_cpp_cmake_if_missing(
    root: str,
    dry_run: bool,
    tool_example_dir: str = TOOL_EXAMPLE_DIR,
) -> None:
    dest = harmony_cpp_cmake_dest(root)
    rel = os.path.relpath(dest, root).replace("\\", "/")
    if os.path.isfile(dest):
        print(f"  {rel} 已存在，跳过恢复")
        return
    src = harmony_cpp_cmake_template_path(tool_example_dir)
    if dry_run:
        print(f"  [dry-run] 将恢复缺失的 {rel}（自模板或内置默认）")
        return
    if os.path.isfile(src):
        write_text(dest, read_text(src))
        print(f"  已从模板恢复: {dest}")
    else:
        write_text(dest, _DEFAULT_HARMONY_CPP_CMAKELISTS)
        print(f"  已写入默认 CMakeLists.txt: {dest}")


def copy_harmony_template(
    root: str,
    dry_run: bool,
    tool_example_dir: str = TOOL_EXAMPLE_DIR,
) -> None:
    src = os.path.join(tool_example_dir, "harmony")
    dst = os.path.join(root, "harmony")
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
) -> None:
    log_key_lines(
        "预期产物目录",
        [
            "C++ : ./harmony/library/src/main/cpp/generated",
            "ETS : ./harmony/library/src/main/ets/generated",
        ],
    )
    rc = run_cmd(root, ["npm", "run", "codegen"], dry_run)
    if rc != 0 and not dry_run:
        raise SystemExit("npm run codegen 失败")
    restore_harmony_cpp_cmake_if_missing(root, dry_run, tool_example_dir)


# ---------------------------------------------------------------------------
# 步骤 9：oh-package name
# ---------------------------------------------------------------------------


def sync_harmony_library_oh_package_name(root: str, dry_run: bool) -> None:
    npm_name = read_root_package_name(root)
    path = os.path.join(root, "harmony", "library", "oh-package.json5")
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
    old = read_text(path)
    m_old = re.search(
        r'^\s*(?:"name"|name)\s*:\s*[\'"]([^\'"]+)[\'"]',
        old,
        flags=re.MULTILINE,
    )
    prev = m_old.group(1) if m_old else "(未解析到旧值)"
    log_key_lines("当前 oh-package name", [prev])
    new, n = re.subn(
        r'(?:"name"|name)\s*:\s*([\'"])[^\'"]+\1',
        f'"name": "{npm_name}"',
        old,
        count=1,
    )
    if n == 0:
        print(f"  [warn] 未找到 name 字段: {path}")
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
    if spec_files:
        ns, _ = extract_namespace_and_name(read_text(spec_files[0]))
        if ns:
            return ns
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
    methods_block = "\n".join(methods).rstrip() + ("\n" if methods else "")
    if namespace:
        spec_ref = f"TM.{namespace}.Spec"
    else:
        spec_ref = "unknown"
    return (
        "import { TurboModule } from '@rnoh/react-native-openharmony/ts';\n"
        "import type { TurboModuleContext } from '@rnoh/react-native-openharmony/ts';\n"
        "import { TM } from './generated/ts';\n"
        "\n"
        f"export class {class_name} extends TurboModule implements {spec_ref} {{\n"
        "  constructor(protected ctx: TurboModuleContext) {\n"
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


def render_library_ts_exports_turbo(turbo_module_classes: Sequence[str], base_name: str) -> str:
    factory_file_base = f"{base_name}TurboModulesFactory"
    lines: List[str] = [
        "/**",
        " * Auto-generated by generate_library_turbo.py",
        " */",
        "",
    ]
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


def render_fabric_component_ets_stub(namespace: str, codegen_component_ts: Optional[str] = None) -> str:
    """
    生成 Fabric 组件 ArkTS stub。
    若传入 codegen 生成的 `generated/components/<Ns>.ts` 全文：
    - 解析 EventPayloadByName 并补充 EventEmitter 注释；
    - 解析 DirectRawProps，为每个 JS 专有 prop 生成 @State 与 updatePropsFromDescriptor 内
      `this.<prop> = wrapper.propsData.<prop>`（与 ViewDescriptorWrapperBase.propsData / PropsSelector 对齐）。
    """
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
        prop_state_lines.append(f"  @State {prop_name}: {ark_ann}{init};")
        assign_lines.append(f"    this.{prop_name} = wrapper.propsData.{prop_name};")
        prop_names_for_hint.append(prop_name)

    if prop_state_lines:
        direct_raw_comment = (
            "    // codegen DirectRawProps → 已从 wrapper.propsData 同步到下方 @State，可在 build() 直接使用"
        )
    else:
        direct_raw_comment = (
            "    // codegen 未解析到 DirectRawProps（或为空）：无 JS 专有 props；"
            "尺寸/圆角/背景等请用 wrapper.width、wrapper.borderRadius、wrapper.backgroundColor 等基类便捷属性"
        )

    if prop_names_for_hint:
        hint = (
            f"在 build() 中可使用 this.{prop_names_for_hint[0]} 等 @State（来自 codegen DirectRawProps / wrapper.propsData）。"
            "实现 UI 后可删除本段提示。"
        )
    else:
        hint = (
            "请在 build() 中根据 descriptorWrapper 与基类便捷属性实现界面。"
            "若需 JS 专有 props，请在 JS Spec 声明后重新 codegen 以生成 DirectRawProps。"
            "实现后可删除本段提示。"
        )

    import_inner = ", ".join(sorted(rnoh_symbols))
    rnoh_import_line = f"import {{ {import_inner} }} from '@rnoh/react-native-openharmony';\n"

    state_block = ("\n" + "\n".join(prop_state_lines) + "\n") if prop_state_lines else "\n"
    assign_block = "\n".join(assign_lines) if assign_lines else "    // （无 DirectRawProps 字段）"

    return (
        "/**\n"
        " * Auto-generated by generate_library_fabric.py\n"
        " *\n"
        " * This is a minimal stub. Fill in UI/behavior as needed.\n"
        " * 使用 Spec.EventEmitter 向 JS 派发事件（与 codegen 的 EventPayloadByName 对齐）。\n"
        " * JS 专有 props 见 codegen 同文件的 DirectRawProps，已由本模板从 wrapper.propsData 同步到 @State。\n"
        " */\n"
        "\n"
        f"{rnoh_import_line}"
        f"import {{ {namespace} as Spec }} from '../generated/components/{namespace}';\n"
        "\n"
        "@Component\n"
        f"export struct {namespace} {{\n"
        "  public static readonly NAME = Spec.NAME;\n"
        "  public ctx!: RNOHContext;\n"
        "  public tag: number = 0;\n"
        "\n"
        "  @State descriptorWrapper: Spec.DescriptorWrapper = new Spec.DescriptorWrapper({} as Spec.Descriptor);\n"
        f"{state_block}"
        "  private eventEmitter: Spec.EventEmitter | undefined = undefined;\n"
        "  private cleanUpCallbacks: (() => void)[] = [];\n"
        "\n"
        "  aboutToAppear(): void {\n"
        "    this.eventEmitter = new Spec.EventEmitter(this.ctx.rnInstance, this.tag);\n"
        "\n"
        "    const foundWrapper = this.ctx.descriptorRegistry.findDescriptorWrapperByTag<Spec.DescriptorWrapper>(this.tag);\n"
        "    if (foundWrapper !== null && foundWrapper !== undefined) {\n"
        "      this.updatePropsFromDescriptor(foundWrapper);\n"
        "    }\n"
        "\n"
        "    this.cleanUpCallbacks.push(\n"
        "      this.ctx.descriptorRegistry.subscribeToDescriptorChanges(\n"
        "        this.tag,\n"
        "        (descriptor: Spec.Descriptor, descriptorWrapper: Spec.DescriptorWrapper | null) => {\n"
        "          if (descriptorWrapper !== null) {\n"
        "            this.updatePropsFromDescriptor(descriptorWrapper);\n"
        "          } else {\n"
        "            this.updatePropsFromDescriptor(new Spec.DescriptorWrapper(descriptor));\n"
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
        "  private updatePropsFromDescriptor(wrapper: Spec.DescriptorWrapper): void {\n"
        "    this.descriptorWrapper = wrapper;\n"
        f"{assign_block}\n"
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
        "/**\n"
        " * Auto-generated by generate_library_fabric.py\n"
        " */\n"
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
        "    };\n"
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
        "/**",
        " * Auto-generated by generate_library_fabric.py",
        " *",
        " * 仅导出 GeneratedPackage；勿在此 export components/*.ets（见脚本说明）。",
        " */",
        "",
        "export * from './src/main/ets/GeneratedPackage';",
        "",
    ]
    return "\n".join(lines)
