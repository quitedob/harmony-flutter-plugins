#!/usr/bin/env python3
"""
拷贝 ohos_skeleton 模板 → <插件根>/ohos/，并执行后续处理：

1. 拷贝骨架目录树（package.json, tsconfig.json, babel.config.js 等）
2. 合并仓库根 package.json → ohos/package.json（替换 xxx 占位）
3. 全局扫描 Turbo/Fabric 注册文件，推断源码目录 → 拷入 ohos/src/specs/v1/
4. 拷贝推断源码目录下其余 .ts/.tsx → ohos/src/（保持相对路径）
5. 解析根仓入口 → 写入 ohos/src/index.ts 或 index.tsx
6. 对 ohos/src 跑一遍 import_rewrite

--dry-run 时仅模拟拷贝；合并与源码步骤在磁盘上无 ohos/ 时不执行。
"""

from __future__ import annotations

import argparse
import os
import sys

_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SKILL_ROOT not in sys.path:
    sys.path.insert(0, _SKILL_ROOT)

from lib import import_rewrite, package_merge, paths, spec_scan, source_copy, template_apply  # noqa: E402


def main() -> None:
    p = argparse.ArgumentParser(
        description="Copy ohos_skeleton + merge package.json + sync src/specs/index from parent plugin."
    )
    p.add_argument("--plugin-root", default=os.getcwd(), help="RN plugin repo root")
    p.add_argument("--ohos-subdir", default="ohos", help="Target subdirectory under plugin (default: ohos)")
    p.add_argument("--force", action="store_true", help="Replace existing target tree")
    p.add_argument("--dry-run", action="store_true")
    args = p.parse_args()
    root = os.path.abspath(args.plugin_root)
    dst = template_apply.plugin_ohos_root(root, args.ohos_subdir)
    src = paths.templates_ohos_skeleton_dir()

    def log(msg: str) -> None:
        print(msg)

    print("=== apply ohos_skeleton ===")
    print(f"  src: {src}")
    print(f"  dst: {dst}")
    template_apply.copy_template_dir(src, dst, dry_run=args.dry_run, force=args.force, log=log, full=True)

    if args.dry_run:
        print("  [dry-run] 若去掉 --dry-run，将继续：")
        print("    - merge 根 package.json → ohos/package.json（xxx 占位）")
        print("    - Turbo/Fabric spec → ohos/src/specs/v1/")
        print("    - 其余 src/*.ts(x) → ohos/src/")
        print("    - 根入口 → ohos/src/index.ts|tsx")
        print("    - import_rewrite(ohos/src)")
        print("Done (dry-run).")
        return

    ohos_pkg = os.path.join(dst, "package.json")
    if not os.path.isfile(ohos_pkg):
        raise SystemExit(f"missing {ohos_pkg}")

    print("\n--- merge root package.json -> ohos/package.json ---")
    package_merge.merge_parent_into_ohos_package(root, ohos_pkg, dry_run=False)

    ohos_src = os.path.join(dst, "src")
    parent_pkg = source_copy.read_parent_package(root)

    print("\n--- global scan specs + infer source directory ---")
    hits, inferred_source = spec_scan.scan_spec_sources_global(root)
    print(f"  inferred source directory: {inferred_source}")

    print("\n--- specs -> ohos/src/specs/v1 ---")
    spec_abs = source_copy.copy_specs_to_v1(root, ohos_src, hits, dry_run=False)

    print("\n--- prune harmony.codegenConfig by specPaths ---")
    package_merge.prune_harmony_codegen_config_by_specpaths(ohos_pkg, dry_run=False)

    print("\n--- parent entry -> ohos/src/index ---")
    source_copy.write_index_from_parent(root, ohos_src, parent_pkg, source_root=inferred_source, dry_run=False)

    entry = source_copy.resolve_entry_source_file(root, parent_pkg, inferred_source)
    entry_norm = os.path.normpath(entry) if entry else None

    print("\n--- remaining src -> ohos/src ---")
    source_copy.copy_remaining_src(
        root,
        ohos_src,
        spec_abs,
        entry_norm,
        source_root=inferred_source,
        dry_run=False,
    )

    print("\n--- import_rewrite ---")
    spec_names = {os.path.splitext(os.path.basename(p))[0] for p in spec_abs}
    n = import_rewrite.walk_and_rewrite(ohos_src, dry_run=False, spec_basenames_no_ext=spec_names)
    if n:
        print(f"  touched {n} files")

    print("\nDone.")


if __name__ == "__main__":
    main()