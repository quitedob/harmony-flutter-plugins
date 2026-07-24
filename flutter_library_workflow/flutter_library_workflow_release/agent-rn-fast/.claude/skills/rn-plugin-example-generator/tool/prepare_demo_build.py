#!/usr/bin/env python3
"""demo-gen 专用 build 前准备脚本。

只处理 ohos/example_auto，不改 rnohos.py、不改库本体。
用于把 demo-gen 阶段常见的构建修复前置为确定性动作：
- 清理 example_auto native/hvigor 构建缓存
- 移除 example_auto 里与 autolinking 重复的手动 CMake 注册
- 本地化 rnoh-hvigor-plugin tgz，避免 pnpm cache key 长路径问题
- 放宽 example_auto tsconfig include，覆盖 demo-gen 生成的 pages/components/data
- 检查 file: 依赖路径是否存在
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import sys
from pathlib import Path


def log(msg: str) -> None:
    print(f"[prepare-demo] {msg}")


def rm_tree(path: Path) -> bool:
    if not path.exists():
        return False
    shutil.rmtree(path, ignore_errors=True)
    return not path.exists()


def clean_build_caches(example_root: Path) -> list[str]:
    removed: list[str] = []
    targets = [
        example_root / "harmony" / "entry" / ".cxx",
        example_root / "harmony" / "entry" / "build",
        example_root / "harmony" / ".hvigor",
    ]
    for target in targets:
        if rm_tree(target):
            removed.append(str(target))
    return removed


def normalize_cmake_autolink(example_root: Path) -> bool:
    """删除 entry CMakeLists 里与 autolinking 重复的手动插件注册，保留 autolink。

    仅在检测到 autolinking.cmake 时执行。保守处理：
    - 删除手动 add_subdirectory(...) 行，并记录其目标名
    - 只删除 target_link_libraries(...) 中引用了这些目标名的行
    - 保留 rnoh / rnoh_app / 系统库等正常链接
    """
    cmake = example_root / "harmony" / "entry" / "src" / "main" / "cpp" / "CMakeLists.txt"
    if not cmake.is_file():
        return False
    text = cmake.read_text(encoding="utf-8", errors="ignore")
    if "autolinking.cmake" not in text:
        return False

    original = text
    text = re.sub(
        r"\n?#\s*Manual plugin registration[\s\S]*?#\s*End manual plugin registration\s*\n?",
        "\n",
        text,
        flags=re.IGNORECASE,
    )

    removed_targets: set[str] = set()
    first_pass: list[str] = []
    add_subdir_re = re.compile(r"^\s*add_subdirectory\s*\((.*?)\)\s*$", re.IGNORECASE)
    for line in text.splitlines():
        m = add_subdir_re.match(line)
        if not m:
            first_pass.append(line)
            continue
        inner = m.group(1)
        parts = re.findall(r'"([^"]+)"|(\S+)', inner)
        flat = [a or b for a, b in parts if (a or b)]
        target = ""
        if len(flat) >= 2:
            target = Path(flat[1]).name
        elif flat:
            target = Path(flat[0]).name
        if target and target not in {".", ".."}:
            removed_targets.add(target)
        first_pass.append(f"# removed by prepare_demo_build.py: {line}")

    cleaned_lines: list[str] = []
    target_link_re = re.compile(r"^\s*target_link_libraries\s*\((.*?)\)\s*$", re.IGNORECASE)
    for line in first_pass:
        m = target_link_re.match(line)
        if m and removed_targets:
            inner = m.group(1)
            tokens = set(re.findall(r"[A-Za-z_][A-Za-z0-9_]*", inner))
            if tokens & removed_targets:
                cleaned_lines.append(f"# removed by prepare_demo_build.py: {line}")
                continue
        cleaned_lines.append(line)

    new_text = "\n".join(cleaned_lines).rstrip() + "\n"
    if new_text != original:
        cmake.write_text(new_text, encoding="utf-8", newline="\n")
        return True
    return False


def find_hvigor_plugin_tgz(plugin_root: Path, example_root: Path) -> Path | None:
    candidates = [
        example_root / "node_modules" / "@react-native-oh" / "react-native-harmony-cli" / "harmony",
        plugin_root / "ohos" / "example" / "node_modules" / "@react-native-oh" / "react-native-harmony-cli" / "harmony",
        plugin_root / "ohos" / "node_modules" / "@react-native-oh" / "react-native-harmony-cli" / "harmony",
    ]
    for base in candidates:
        if not base.is_dir():
            continue
        matches = sorted(base.glob("rnoh-hvigor-plugin-*.tgz"))
        if matches:
            return matches[0]
    # 兜底搜索 example_auto/example 下 node_modules，限制范围避免扫全仓库太慢。
    for base in [example_root, plugin_root / "ohos" / "example"]:
        if not base.is_dir():
            continue
        for match in base.glob("node_modules/**/rnoh-hvigor-plugin-*.tgz"):
            return match
    return None


def ensure_hvigor_plugin_local(plugin_root: Path, example_root: Path) -> tuple[bool, str | None]:
    harmony_hvigor = example_root / "harmony" / "hvigor"
    harmony_hvigor.mkdir(parents=True, exist_ok=True)
    src = find_hvigor_plugin_tgz(plugin_root, example_root)
    if not src:
        return False, "未找到 rnoh-hvigor-plugin-*.tgz"
    dst = harmony_hvigor / src.name
    if src.resolve() != dst.resolve():
        shutil.copy2(src, dst)

    config = harmony_hvigor / "hvigor-config.json5"
    if not config.is_file():
        config.write_text(
            '{\n  "modelVersion": "6.0.1",\n  "dependencies": {\n    "@rnoh/hvigor-plugin": "file:./%s"\n  }\n}\n' % dst.name,
            encoding="utf-8",
            newline="\n",
        )
        return True, str(dst)

    text = config.read_text(encoding="utf-8", errors="ignore")
    if "@rnoh/hvigor-plugin" in text:
        new_text = re.sub(
            r'("@rnoh/hvigor-plugin"\s*:\s*")[^"]+(")',
            rf'\1file:./{dst.name}\2',
            text,
        )
    else:
        # 简单 JSON5 注入：已有 dependencies 则追加，否则创建。
        if '"dependencies"' in text:
            new_text = re.sub(
                r'("dependencies"\s*:\s*\{)',
                rf'\1\n    "@rnoh/hvigor-plugin": "file:./{dst.name}",',
                text,
                count=1,
            )
        else:
            new_text = re.sub(
                r'("modelVersion"\s*:\s*"[^"]+"\s*,?)',
                rf'\1\n  "dependencies": {{\n    "@rnoh/hvigor-plugin": "file:./{dst.name}"\n  }},',
                text,
                count=1,
            )
    if new_text != text:
        config.write_text(new_text, encoding="utf-8", newline="\n")
    return True, str(dst)


def widen_tsconfig_include(example_root: Path) -> bool:
    tsconfig = example_root / "tsconfig.json"
    if not tsconfig.is_file():
        return False
    try:
        data = json.loads(tsconfig.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return False
    includes = data.get("include")
    if not isinstance(includes, list):
        includes = []
    wanted = [
        "App.tsx",
        "src/**/*",
        "components/**/*",
        "data/**/*",
        "pages/**/*",
        "**/*.ts",
        "**/*.tsx",
    ]
    changed = False
    for item in wanted:
        if item not in includes:
            includes.append(item)
            changed = True
    if changed:
        data["include"] = includes
        tsconfig.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")
    return changed


_FILE_REF_RE = re.compile(r'["\']file:([^"\']+)["\']')


def check_file_deps(example_root: Path) -> list[str]:
    """检查 file: 依赖路径是否存在，返回 WARN 列表（不阻断）。

    跳过指向 node_modules/** 的依赖：prepare 在 npm install 之前/独立运行时
    node_modules 可能尚未安装，这类 .har 缺失是正常现象，不应误报。
    """
    warnings: list[str] = []
    manifests = [
        example_root / "package.json",
        example_root / "harmony" / "oh-package.json5",
        example_root / "harmony" / "entry" / "oh-package.json5",
        example_root / "harmony" / "hvigor" / "hvigor-config.json5",
    ]
    for manifest in manifests:
        if not manifest.is_file():
            continue
        text = manifest.read_text(encoding="utf-8", errors="ignore")
        base = manifest.parent
        for m in _FILE_REF_RE.finditer(text):
            raw = m.group(1).strip()
            if "node_modules" in raw.replace("\\", "/"):
                # node_modules 依赖由 npm install 提供，prepare 阶段不检查
                continue
            path = Path(raw)
            resolved = path if path.is_absolute() else (base / raw)
            if not resolved.exists():
                warnings.append(f"{manifest}: file:{raw} -> {resolved}")
    return warnings


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Prepare example_auto before demo-gen build")
    parser.add_argument("--plugin-root", default=".")
    parser.add_argument("--example-dir", default="example_auto")
    args = parser.parse_args(argv)

    plugin_root = Path(args.plugin_root).resolve()
    example_root = plugin_root / "ohos" / args.example_dir
    if not example_root.is_dir():
        print(f"[prepare-demo][ERROR] example 目录不存在: {example_root}")
        return 1

    log(f"plugin_root={plugin_root}")
    log(f"example_root={example_root}")

    removed = clean_build_caches(example_root)
    if removed:
        log("已清理构建缓存:")
        for item in removed:
            log(f"  - {item}")
    else:
        log("无构建缓存需要清理")

    if normalize_cmake_autolink(example_root):
        log("已移除 example_auto CMake 手动插件注册，保留 autolink")
    else:
        log("CMake autolink 无需调整")

    ok, hvigor_msg = ensure_hvigor_plugin_local(plugin_root, example_root)
    if ok:
        log(f"hvigor plugin 已本地化: {hvigor_msg}")
    else:
        log(f"[WARN] {hvigor_msg}")

    if widen_tsconfig_include(example_root):
        log("已放宽 example_auto tsconfig include")
    else:
        log("tsconfig include 无需调整")

    warnings = check_file_deps(example_root)
    if warnings:
        log("[WARN] 以下 file: 依赖当前不存在（若为 npm install 之前运行，属正常，install 后会补齐）:")
        for item in warnings:
            log(f"  - {item}")
    else:
        log("file: 依赖检查通过")
    log("prepare demo build 完成")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
