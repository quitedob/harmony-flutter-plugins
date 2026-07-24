#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
React Native Harmony TurboModule 脚手架辅助脚本

步骤一览（与位置参数对应）：
  1  扫描 <root> 下（排除 . 开头目录与 android/harmony/ios 等）TurboModuleRegistry 调用，收集注册名与 specPaths
  2  拷贝脚本同级的 harmony/ 模板到项目根
  3  npm run codegen（codegen 可能删掉 cpp/CMakeLists.txt，本步末尾会按需从模板恢复）
  4  根据 codegen 产物生成各 *TurboModule.ts 实现模板
  5  生成 {Base}TurboModulesFactory.ts（含 {Base}Package）
  6  同步 harmony/library/oh-package.json5 的 name 与根 package.json
  7  重写 harmony/library/ts.ts 导出

用法（与 generate-example.py 相同风格）：
  python generate_library_turbo.py              # 执行全部步骤
  python generate_library_turbo.py 4            # 仅第 4 步（会自动先跑第 1 步以得到 plan）
  python generate_library_turbo.py 2 3 4        # 只跑指定步
  python generate_library_turbo.py --root .. --dry-run 4 5

公共实现见同目录 generate_library_common.py。
"""

from __future__ import annotations

import argparse
import os
import sys
from typing import List, Optional, Set

# 确保 lib 目录在 path 中
_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SKILL_ROOT not in sys.path:
    sys.path.insert(0, _SKILL_ROOT)

import generate_library_common as common

common.configure_stdout_utf8()

MIN_STEP = 1
MAX_STEP = 7


def step_01_scan_turbo_spec_sources(root: str) -> common.GenerationPlan:
    print("\n[步骤 1] 扫描项目根下 Turbo Spec（.ts / .tsx，排除隐藏目录与原生等）")
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

    for dirpath, dirnames, filenames in os.walk(root):
        common.prune_ts_scan_dirnames(dirnames)
        for fn in filenames:
            if not (fn.endswith(".ts") or fn.endswith(".tsx")):
                continue
            abs_path = os.path.join(dirpath, fn)
            text = common.read_text(abs_path)
            if "TurboModuleRegistry.get" not in text and "TurboModuleRegistry.getEnforcing" not in text:
                continue

            names = common._RE_TURBO_NAME.findall(text)
            if not names:
                print(f"  [warn] 含 TurboModuleRegistry 但未解析出模块名: {abs_path}")
                continue

            rel = common.to_posix_relpath(root, abs_path)
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

    if not results:
        raise SystemExit(
            "未在项目根下（已排除以 . 开头的目录及 android/harmony/ios 等）找到含 "
            "TurboModuleRegistry.get(Enforcing) 的 .ts/.tsx 文件"
        )

    spec_path_dirs: List[str] = []
    seen_dirs: Set[str] = set()
    for s in sorted(results, key=lambda x: x.spec_dir_posix):
        if s.spec_dir_posix not in seen_dirs:
            seen_dirs.add(s.spec_dir_posix)
            spec_path_dirs.append(s.spec_dir_posix)

    name_to_class: dict[str, str] = {}
    for s in results:
        mod_class = f"{s.namespace}TurboModule" if s.namespace else "GeneratedTurboModule"
        for n in s.module_names:
            name_to_class[n] = mod_class

    all_registry_names: List[str] = []
    for s in results:
        all_registry_names.extend(s.module_names)

    common.log_key_lines(
        "命中 Spec 源文件（含 TurboModuleRegistry.get / getEnforcing）",
        [f"共 {len(results)} 个文件"],
    )
    for i, s in enumerate(results, 1):
        mod_class = f"{s.namespace}TurboModule" if s.namespace else "GeneratedTurboModule"
        print(f"    [{i}] 相对路径: {s.rel_posix}")
        print(f"        Turbo 注册名 (get/getEnforcing 字符串): {s.module_names}")
        print(f"        export namespace: {s.namespace!r}")
        print(f"        写入 harmony.codegenConfig 的目录 (specPath): {s.spec_dir_posix}")
        print(f"        预期鸿蒙实现类名: {mod_class}")

    common.log_key_lines(
        "汇总（供后续步骤使用）",
        [
            f"全部 Turbo 注册名: {all_registry_names}",
            f"去重后 specPaths: {spec_path_dirs}",
            f"注册名 → 实现类: {dict(name_to_class)}",
        ],
    )

    return common.GenerationPlan(
        root=root,
        spec_sources=results,
        spec_path_dirs=spec_path_dirs,
        name_to_class=name_to_class,
    )


def ensure_plan(root: str, plan: Optional[common.GenerationPlan]) -> common.GenerationPlan:
    if plan is not None:
        return plan
    return step_01_scan_turbo_spec_sources(root)


def step_02_copy_harmony_template(root: str, dry_run: bool, short_name: str = "library") -> None:
    """拷贝 harmony/library 模板到 harmony/{short_name}"""
    print("\n[步骤 2] 拷贝 harmony/library 模板到项目根")
    common.copy_harmony_template(root, dry_run, short_name=short_name)


def step_03_npm_run_codegen(root: str, dry_run: bool, short_name: str = "library") -> None:
    print("\n[步骤 3] npm run codegen-lib")
    common.npm_run_codegen(root, dry_run, short_name=short_name)


def step_04_generate_turbo_module_impls(
    root: str,
    plan: common.GenerationPlan,
    ets_dir: str,
    dry_run: bool,
) -> None:
    print("\n[步骤 4] 生成 *TurboModule.ts 实现模板")

    artifacts = common.collect_codegen_artifacts(root, plan, ets_dir)
    if not artifacts:
        return

    common.log_codegen_scan_summary(artifacts, root, ets_dir)
    common.log_key_lines("本步输出", [f"各实现文件写入目录: {ets_dir}"])

    generated: List[str] = []
    for spec_path in artifacts.spec_files:
        content = common.read_text(spec_path)
        ns, _ = common.extract_namespace_and_name(content)
        class_name = common.turbo_module_class_name(ns)

        try:
            interface_body = common.extract_spec_interface_block(content)
            method_sigs = common.extract_method_signatures(interface_body)
        except ValueError as e:
            print(f"  [warn] {spec_path}: {e}")
            continue

        rel_spec = common.to_posix_relpath(ets_dir, spec_path)
        if not rel_spec.startswith("."):
            rel_spec = "./" + rel_spec
        rel_import = rel_spec[:-3] if rel_spec.endswith(".ts") else rel_spec

        rendered = common.render_turbo_module_impl(class_name, rel_import, ns, method_sigs)
        out_impl = os.path.join(ets_dir, f"{class_name}.ts")

        if dry_run:
            print(f"  [dry-run] {out_impl}  (方法数 {len(method_sigs)})")
        else:
            common.write_text(out_impl, rendered)
            print(f"  已生成: {out_impl}  (方法数 {len(method_sigs)})")
        generated.append(f"{class_name}.ts ({len(method_sigs)} methods)")

    common.log_key_lines("步骤 4 小结", [f"共 {len(generated)} 个实现文件: {generated}"])


def step_05_generate_turbo_modules_factory(
    root: str,
    plan: common.GenerationPlan,
    ets_dir: str,
    dry_run: bool,
) -> None:
    print("\n[步骤 5] 生成 TurboModulesFactory + Package")

    artifacts = common.collect_codegen_artifacts(root, plan, ets_dir)
    if not artifacts:
        return

    base_name = artifacts.factory_base_name
    factory_path = os.path.join(ets_dir, f"{base_name}TurboModulesFactory.ets")
    factory_cls = f"{base_name}TurboModulesFactory"
    package_cls = f"{base_name}Package"

    common.log_key_lines(
        "将生成的类型",
        [
            f"export class {package_cls} extends RNOHPackage",
            f"文件: {common.to_posix_relpath(root, factory_path)}",
        ],
    )
    for reg, cls in artifacts.registry_class_pairs:
        print(f"      TM.{reg}.NAME -> new {cls}(ctx)")

    body = common.render_factory_package_file_autolink(base_name, artifacts.registry_class_pairs)

    if dry_run:
        print(f"  [dry-run] {factory_path}")
    else:
        common.write_text(factory_path, body)
        print(f"  已生成: {factory_path}")


def step_06_sync_oh_package_name(root: str, dry_run: bool, short_name: str = "library") -> None:
    print("\n[步骤 6] 同步 harmony/{short_name}/oh-package.json5 name")
    common.sync_harmony_library_oh_package_name(root, dry_run, short_name)


def step_07_write_library_index(
    root: str,
    plan: common.GenerationPlan,
    ets_dir: str,
    dry_run: bool,
    short_name: str = "library",
) -> None:
    print(f"\n[步骤 7] 写入 harmony/{short_name}/index.ets")

    artifacts = common.collect_codegen_artifacts(root, plan, ets_dir)
    if not artifacts:
        return

    index_path = os.path.join(root, "harmony", short_name, "index.ets")
    package_cls = f"{artifacts.factory_base_name}Package"
    
    common.log_key_lines(
        f"将写入的导出",
        [
            f"export {{ {package_cls} as default }} from './src/main/ets/{artifacts.factory_base_name}TurboModulesFactory'"
        ],
    )

    body = common.render_library_index_ets(artifacts.factory_base_name)

    if dry_run:
        print(f"  [dry-run] {index_path}")
    else:
        common.write_text(index_path, body)
        print(f"  已写入: {index_path}")
    
    # 删除旧的 ts.ts 文件（如果存在）
    old_ts_path = os.path.join(root, "harmony", short_name, "ts.ts")
    if os.path.exists(old_ts_path) and not dry_run:
        os.remove(old_ts_path)
        print(f"  已删除旧的: {old_ts_path}")


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="RN Harmony TurboModule 脚手架（按步骤执行，参见文件顶部说明）",
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
        "steps",
        nargs="*",
        type=int,
        help=f"要执行的步骤号（{MIN_STEP}-{MAX_STEP}）。不传则执行全部。例: `4` 仅第 4 步",
    )
    return p.parse_args()


def run_step(
    step: int,
    root: str,
    ets_dir: str,
    dry_run: bool,
    plan_holder: List[Optional[common.GenerationPlan]],
    short_name: str = "library",
) -> None:
    plan = plan_holder[0]

    if step == 1:
        plan_holder[0] = step_01_scan_turbo_spec_sources(root)
        return

    if step in (4, 5, 7):
        plan = ensure_plan(root, plan)
        plan_holder[0] = plan

    if step == 2:
        step_02_copy_harmony_template(root, dry_run, short_name)
    elif step == 3:
        step_03_npm_run_codegen(root, dry_run, short_name)
    elif step == 4:
        step_04_generate_turbo_module_impls(root, plan, ets_dir, dry_run)
    elif step == 5:
        step_05_generate_turbo_modules_factory(root, plan, ets_dir, dry_run)
    elif step == 6:
        step_06_sync_oh_package_name(root, dry_run, short_name)
    elif step == 7:
        step_07_write_library_index(root, plan, ets_dir, dry_run, short_name)
    else:
        raise SystemExit(f"未知步骤: {step}")


def main() -> None:
    args = parse_args()
    root = os.path.abspath(args.root)
    
    # 推导 short_name
    pkg_path = os.path.join(root, "package.json")
    if os.path.isfile(pkg_path):
        import json
        with open(pkg_path, "r", encoding="utf-8") as f:
            pkg = json.load(f)
        npm_name = pkg.get("name", "")
    else:
        npm_name = ""
    from lib import package_merge
    short_name = package_merge.derive_package_short_name(npm_name)
    
    ets_dir = args.ets_dir or os.path.join(root, "harmony", short_name, "src", "main", "ets")

    requested = args.steps or list(range(MIN_STEP, MAX_STEP + 1))
    bad = [s for s in requested if s < MIN_STEP or s > MAX_STEP]
    if bad:
        raise SystemExit(f"非法步骤号: {bad}，仅支持 {MIN_STEP}-{MAX_STEP}。")

    print("=== generate_library_turbo ===")
    print(f"root={root}")
    print(f"short_name={short_name}")
    print(f"ets_dir={ets_dir}")
    print(f"steps={sorted(set(requested))}")
    if args.dry_run:
        print("mode=dry-run")

    plan_holder: List[Optional[common.GenerationPlan]] = [None]

    for step in sorted(set(requested)):
        run_step(step, root, ets_dir, args.dry_run, plan_holder, short_name)

    plan = plan_holder[0]
    if plan and not args.dry_run:
        try:
            impl_files = [
                os.path.join(ets_dir, f"{cls}.ts") for cls in sorted(set(plan.name_to_class.values()))
            ]
        except Exception:
            impl_files = []
        factory_files = []
        if impl_files:
            try:
                artifacts = common.collect_codegen_artifacts(root, plan, ets_dir)
                if artifacts:
                    factory_files.append(
                        os.path.join(ets_dir, f"{artifacts.factory_base_name}TurboModulesFactory.ts")
                    )
            except Exception:
                pass

        if impl_files or factory_files:
            print("\n=== 后续需要填充实现的文件（给 AI 参考）===")
            if impl_files:
                print("请优先打开并补齐以下 TurboModule 实现文件（将 Not implemented 替换为真实逻辑）：")
                for p in impl_files:
                    print(f"- {common.to_posix_relpath(root, p)}")
            if factory_files:
                print("请检查/按需调整 Package/Factory 文件（注册名需与 Spec 的 NAME 完全一致）：")
                for p in factory_files:
                    print(f"- {common.to_posix_relpath(root, p)}")
            print("=== 以上列表仅提示“常需补齐实现”的文件，实际以仓库当前生成结果为准 ===")

    print("\n=== 完成 ===")


if __name__ == "__main__":
    main()
