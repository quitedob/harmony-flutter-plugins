#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
React Native Harmony Fabric 组件（含 TurboModule 扫描）脚手架辅助脚本

步骤一览（与位置参数对应）：
  1  扫描 <root> 下 TurboModuleRegistry / codegenNativeComponent 调用，收集注册名与 specPaths
  2  写入 package.json 的 harmony.codegenConfig（alias: RNSpec）
  3  写入 package.json 的 scripts.codegen
  4  固定 devDependencies.react/react-native 版本 + npm install + 安装 @react-native-oh/react-native-harmony/cli @0.77.50（默认带 --legacy-peer-deps）
  5  拷贝脚本同级的 harmony/ 模板到项目根
  6  npm run codegen（codegen 可能删掉 cpp/CMakeLists.txt，本步末尾会按需从模板恢复）
  7  根据 codegen 产物生成 Fabric 组件 ArkTS 实现模板（harmony/library/src/main/ets/components/*.ets）
  8  生成 GeneratedPackage.ts（extends RNPackage，用于注册 Fabric DescriptorWrapper）
  9  同步 harmony/library/oh-package.json5 的 name 与根 package.json
 10  重写 harmony/library/ts.ts 导出（仅 GeneratedPackage；不 export components/*.ets）

用法见文件顶部 generate_library_turbo.py 风格；公共实现见 generate_library_common.py。
"""

from __future__ import annotations

import argparse
import os
from typing import List, Optional, Set

import generate_library_common as common

common.configure_stdout_utf8()

MIN_STEP = common.MIN_STEP
MAX_STEP = common.MAX_STEP


def step_01_scan_turbo_spec_sources(root: str) -> common.GenerationPlan:
    print("\n[步骤 1] 扫描项目根下 Turbo/Fabric Spec（.ts / .tsx，排除隐藏目录与原生等）")
    common.log_key_lines(
        "扫描范围",
        [
            f"根目录: {root}",
            "递归: 所有 .ts、.tsx",
            "排除: 以 . 开头的目录（如 .git、.claude、.husky）",
            f"排除目录名（不区分大小写）: {', '.join(sorted(common.SKIP_TS_SCAN_DIR_NAMES))}",
        ],
    )

    results: List[common.SpecSourceFile] = []
    fabric_results: List[common.FabricComponentSourceFile] = []

    for dirpath, dirnames, filenames in os.walk(root):
        common.prune_ts_scan_dirnames(dirnames)
        for fn in filenames:
            if not (fn.endswith(".ts") or fn.endswith(".tsx")):
                continue
            abs_path = os.path.join(dirpath, fn)
            text = common.read_text(abs_path)
            rel = common.to_posix_relpath(root, abs_path)

            if "TurboModuleRegistry.get" in text or "TurboModuleRegistry.getEnforcing" in text:
                names = common._RE_TURBO_NAME.findall(text)
                if not names:
                    print(f"  [warn] 含 TurboModuleRegistry 但未解析出模块名: {abs_path}")
                else:
                    parent_rel = common.to_posix_relpath(root, os.path.dirname(abs_path))
                    spec_dir = "./" + parent_rel if not parent_rel.startswith(".") else parent_rel
                    if not spec_dir.startswith("./"):
                        spec_dir = "./" + spec_dir.lstrip("/")

                    ns_m = common._RE_EXPORT_NAMESPACE.search(text)
                    namespace = ns_m.group(1) if ns_m else None

                    results.append(
                        common.SpecSourceFile(
                            abs_path=abs_path,
                            rel_posix=rel,
                            module_names=names,
                            spec_dir_posix=spec_dir,
                            namespace=namespace,
                        )
                    )

            if "codegenNativeComponent" in text:
                comp_names = common._RE_FABRIC_NAME.findall(text)
                if not comp_names:
                    print(f"  [warn] 含 codegenNativeComponent 但未解析出组件名: {abs_path}")
                else:
                    parent_rel = common.to_posix_relpath(root, os.path.dirname(abs_path))
                    spec_dir = "./" + parent_rel if not parent_rel.startswith(".") else parent_rel
                    if not spec_dir.startswith("./"):
                        spec_dir = "./" + spec_dir.lstrip("/")

                    fabric_results.append(
                        common.FabricComponentSourceFile(
                            abs_path=abs_path,
                            rel_posix=rel,
                            component_names=comp_names,
                            spec_dir_posix=spec_dir,
                        )
                    )

    if not results and not fabric_results:
        raise SystemExit(
            "未在项目根下（已排除以 . 开头的目录及 android/harmony/ios 等）找到含 "
            "TurboModuleRegistry.get(Enforcing) 或 codegenNativeComponent 的 .ts/.tsx 文件"
        )

    spec_path_dirs: List[str] = []
    seen_dirs: Set[str] = set()
    all_spec_dirs = [s.spec_dir_posix for s in results] + [s.spec_dir_posix for s in fabric_results]
    for d in sorted(all_spec_dirs):
        if d not in seen_dirs:
            seen_dirs.add(d)
            spec_path_dirs.append(d)

    name_to_class: dict[str, str] = {}
    for s in results:
        mod_class = f"{s.namespace}TurboModule" if s.namespace else "GeneratedTurboModule"
        for n in s.module_names:
            name_to_class[n] = mod_class

    all_registry_names: List[str] = []
    for s in results:
        all_registry_names.extend(s.module_names)

    if results:
        common.log_key_lines(
            "命中 Turbo Spec 源文件（含 TurboModuleRegistry.get / getEnforcing）",
            [f"共 {len(results)} 个文件"],
        )
        for i, s in enumerate(results, 1):
            mod_class = f"{s.namespace}TurboModule" if s.namespace else "GeneratedTurboModule"
            print(f"    [{i}] 相对路径: {s.rel_posix}")
            print(f"        Turbo 注册名 (get/getEnforcing 字符串): {s.module_names}")
            print(f"        export namespace: {s.namespace!r}")
            print(f"        写入 harmony.codegenConfig 的目录 (specPath): {s.spec_dir_posix}")
            print(f"        预期鸿蒙实现类名: {mod_class}")

    fabric_component_names: List[str] = []
    for s in fabric_results:
        fabric_component_names.extend(s.component_names)

    if fabric_results:
        common.log_key_lines(
            "命中 Fabric 组件 JS 接口（含 codegenNativeComponent('NAME')）",
            [f"共 {len(fabric_results)} 个文件"],
        )
        for i, s in enumerate(fabric_results, 1):
            print(f"    [{i}] 相对路径: {s.rel_posix}")
            print(f"        Fabric 组件名 (codegenNativeComponent 字符串): {s.component_names}")
            print(f"        写入 harmony.codegenConfig 的目录 (specPath): {s.spec_dir_posix}")

    common.log_key_lines(
        "汇总（供后续步骤使用）",
        [
            f"全部 Turbo 注册名: {all_registry_names}",
            f"去重后 specPaths: {spec_path_dirs}",
            f"注册名 → 实现类: {dict(name_to_class)}",
            f"全部 Fabric 组件名: {fabric_component_names}",
        ],
    )

    return common.GenerationPlan(
        root=root,
        spec_sources=results,
        spec_path_dirs=spec_path_dirs,
        name_to_class=name_to_class,
        fabric_sources=fabric_results,
        fabric_component_names=fabric_component_names,
    )


def ensure_plan(root: str, plan: Optional[common.GenerationPlan]) -> common.GenerationPlan:
    if plan is not None:
        return plan
    return step_01_scan_turbo_spec_sources(root)


def step_02_update_package_json_harmony(root: str, plan: common.GenerationPlan, dry_run: bool) -> None:
    print("\n[步骤 2] 更新 package.json → harmony.codegenConfig")
    common.update_package_json_harmony(
        root,
        plan.spec_path_dirs,
        dry_run,
        log_spec_paths_suffix="  # Turbo + Fabric(若存在)",
    )


def step_03_update_package_json_codegen_script(root: str, dry_run: bool) -> None:
    print("\n[步骤 3] 更新 package.json → scripts.codegen")
    common.update_package_json_codegen_script(root, dry_run)


def step_04_npm_install_oh_dependencies(
    root: str,
    dry_run: bool,
    legacy_peer_deps: bool = True,
) -> None:
    print("\n[步骤 4] 固定 RN 版本 + npm install + @react-native-oh/* @0.77.50")
    common.pin_devdeps_react_and_rn(root, dry_run)
    common.npm_install_oh_dependencies(root, dry_run, legacy_peer_deps)


def step_05_copy_harmony_template(root: str, dry_run: bool) -> None:
    print("\n[步骤 5] 拷贝 harmony 模板到项目根")
    common.copy_harmony_template(root, dry_run)


def step_06_npm_run_codegen(root: str, dry_run: bool) -> None:
    print("\n[步骤 6] npm run codegen")
    common.npm_run_codegen(root, dry_run)


def step_07_generate_turbo_module_impls(
    root: str,
    plan: common.GenerationPlan,
    ets_dir: str,
    dry_run: bool,
) -> None:
    print("\n[步骤 7] 生成 Fabric 组件 ArkTS 实现模板（components/*.ets）")

    artifacts = common.collect_fabric_component_artifacts(root, ets_dir)
    if not artifacts or not artifacts.components:
        print(
            "  [warn] 未找到 Fabric 组件 codegen 产物（expected: "
            "harmony/library/src/main/ets/generated/components/*.ts）"
        )
        return

    components_dir = os.path.join(ets_dir, "components")
    common.log_key_lines(
        "将生成",
        [
            f"组件数: {len(artifacts.components)}",
            f"输出目录: {common.to_posix_relpath(root, components_dir)}",
        ],
    )
    for ns, name in artifacts.components:
        print(f"      - {ns} (NAME={name})")

    if not dry_run:
        os.makedirs(components_dir, exist_ok=True)

    generated_paths: List[str] = []
    for ns, _ in artifacts.components:
        out_path = os.path.join(components_dir, f"{ns}.ets")
        gen_ts = os.path.join(ets_dir, "generated", "components", f"{ns}.ts")
        codegen_src = common.read_text(gen_ts) if os.path.isfile(gen_ts) else None
        body = common.render_fabric_component_ets_stub(ns, codegen_component_ts=codegen_src)
        if dry_run:
            print(f"  [dry-run] {common.to_posix_relpath(root, out_path)}")
        else:
            common.write_text(out_path, body)
            print(f"  已生成: {common.to_posix_relpath(root, out_path)}")
        generated_paths.append(common.to_posix_relpath(root, out_path))

    common.log_key_lines("步骤 7 小结", [f"生成 {len(generated_paths)} 个文件"])


def step_08_generate_turbo_modules_factory(
    root: str,
    plan: common.GenerationPlan,
    ets_dir: str,
    dry_run: bool,
) -> None:
    print("\n[步骤 8] 生成 GeneratedPackage.ts（extends RNPackage，注册 Fabric DescriptorWrapper）")

    artifacts = common.collect_fabric_component_artifacts(root, ets_dir)
    if not artifacts or not artifacts.components:
        print("  [warn] 未找到 Fabric 组件 codegen 产物，跳过生成 GeneratedPackage.ts")
        return

    out_path = os.path.join(ets_dir, "GeneratedPackage.ts")
    common.log_key_lines(
        "将生成",
        [
            f"文件: {common.to_posix_relpath(root, out_path)}",
            f"组件数: {len(artifacts.components)}",
        ],
    )

    body = common.render_generated_package_ts(artifacts.components)
    if dry_run:
        print(f"  [dry-run] {common.to_posix_relpath(root, out_path)}")
    else:
        common.write_text(out_path, body)
        print(f"  已生成: {common.to_posix_relpath(root, out_path)}")


def step_09_sync_oh_package_name(root: str, dry_run: bool) -> None:
    print("\n[步骤 9] 同步 harmony/library/oh-package.json5 → name")
    common.sync_harmony_library_oh_package_name(root, dry_run)


def step_10_write_library_ts(
    root: str,
    plan: common.GenerationPlan,
    ets_dir: str,
    dry_run: bool,
) -> None:
    print("\n[步骤 10] 重写 harmony/library/ts.ts（仅 GeneratedPackage；components 由应用侧按路径引用）")

    artifacts = common.collect_fabric_component_artifacts(root, ets_dir)
    if not artifacts or not artifacts.components:
        print("  [warn] 未找到 Fabric 组件 codegen 产物，跳过重写 ts.ts")
        return

    ts_path = os.path.join(root, "harmony", "library", "ts.ts")
    export_lines: List[str] = ["./src/main/ets/GeneratedPackage"]
    common.log_key_lines("将写入的 export 路径（相对 harmony/library/ts.ts）", export_lines)

    body = common.render_library_ts_exports_for_fabric()

    if dry_run:
        print(f"  [dry-run] {common.to_posix_relpath(root, ts_path)}")
    else:
        common.write_text(ts_path, body)
        print(f"  已写入: {common.to_posix_relpath(root, ts_path)}")


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="RN Harmony Fabric 组件脚手架（按步骤执行，参见文件顶部说明）",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    p.add_argument("--root", default=".", help="RN 库根目录")
    p.add_argument("--dry-run", action="store_true", help="不写文件、不执行 npm")
    p.add_argument(
        "--ets-dir",
        default=None,
        help="codegen 输出目录（默认 <root>/harmony/library/src/main/ets）",
    )
    p.add_argument(
        "--no-legacy-peer-deps",
        action="store_true",
        help="步骤 4 不在 npm install/i 上加 --legacy-peer-deps（默认会加，以绕过常见 ERESOLVE）",
    )
    p.add_argument(
        "steps",
        nargs="*",
        type=int,
        help=f"要执行的步骤号（{MIN_STEP}-{MAX_STEP}）。不传则执行全部。例: `7` 仅第 7 步",
    )
    return p.parse_args()


def run_step(
    step: int,
    root: str,
    ets_dir: str,
    dry_run: bool,
    plan_holder: List[Optional[common.GenerationPlan]],
    npm_legacy_peer_deps: bool,
) -> None:
    plan = plan_holder[0]

    if step == 1:
        plan_holder[0] = step_01_scan_turbo_spec_sources(root)
        return

    if step in (2, 7, 8, 10):
        plan = ensure_plan(root, plan)
        plan_holder[0] = plan

    if step == 2:
        step_02_update_package_json_harmony(root, plan, dry_run)
    elif step == 3:
        step_03_update_package_json_codegen_script(root, dry_run)
    elif step == 4:
        step_04_npm_install_oh_dependencies(root, dry_run, npm_legacy_peer_deps)
    elif step == 5:
        step_05_copy_harmony_template(root, dry_run)
    elif step == 6:
        step_06_npm_run_codegen(root, dry_run)
    elif step == 7:
        step_07_generate_turbo_module_impls(root, plan, ets_dir, dry_run)
    elif step == 8:
        step_08_generate_turbo_modules_factory(root, plan, ets_dir, dry_run)
    elif step == 9:
        step_09_sync_oh_package_name(root, dry_run)
    elif step == 10:
        step_10_write_library_ts(root, plan, ets_dir, dry_run)
    else:
        raise SystemExit(f"未知步骤: {step}")


def main() -> None:
    args = parse_args()
    root = os.path.abspath(args.root)
    ets_dir = args.ets_dir or os.path.join(root, "harmony", "library", "src", "main", "ets")

    requested = args.steps or list(range(MIN_STEP, MAX_STEP + 1))
    bad = [s for s in requested if s < MIN_STEP or s > MAX_STEP]
    if bad:
        raise SystemExit(f"非法步骤号: {bad}，仅支持 {MIN_STEP}-{MAX_STEP}。")

    print("=== generate_library_fabric ===")
    print(f"root={root}")
    print(f"ets_dir={ets_dir}")
    print(f"steps={sorted(set(requested))}")
    if args.dry_run:
        print("mode=dry-run")

    npm_legacy = not args.no_legacy_peer_deps
    if not args.dry_run:
        print(f"npm_legacy_peer_deps={npm_legacy}")

    plan_holder: List[Optional[common.GenerationPlan]] = [None]

    for step in sorted(set(requested)):
        run_step(step, root, ets_dir, args.dry_run, plan_holder, npm_legacy)

    print("\n=== 完成 ===")


if __name__ == "__main__":
    main()
