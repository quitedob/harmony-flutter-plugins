"""Resolve source files from package.json entry and dependencies.

Priority:
1. bob's 'source' field (if exists)
2. Parse entry file and recursively resolve dependencies
"""

from __future__ import annotations

import json
import os
import re
import shutil
from typing import Optional


_SOURCE_EXTS = (".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs")
_TYPE_DEF_EXTS = (".d.ts",)
# React Native 平台特定扩展名（Metro 解析顺序）
_PLATFORM_EXTS = (
    ".harmony.js", ".harmony.tsx", ".harmony.ts",
    ".native.js", ".native.tsx", ".native.ts",
    ".android.js", ".android.tsx", ".android.ts",
    ".ios.js", ".ios.tsx", ".ios.ts",
    ".web.js", ".web.tsx", ".web.ts",
)
_ASSET_EXTS = (".json", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico", ".woff", ".woff2")
_SKIP_DIRS = frozenset({"node_modules", ".git", "__pycache__", "test", "tests", "__tests__", "example", "examples"})
_SKIP_JSON_FILES = frozenset({
    "package.json", "package-lock.json", "npm-shrinkwrap.json", "yarn.lock", "pnpm-lock.yaml",
    "tsconfig.json", "tsconfig.build.json", "jsconfig.json",
    ".eslintrc.json", ".prettierrc.json", ".babelrc.json", "babel.config.json",
    "opencode.json", "CLAUDE.md", ".rn-ohos-junction.json",
})


def _read_json(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _resolve_file_path(base_dir: str, import_path: str) -> Optional[str]:
    """Resolve import path to actual file path.
    
    Handles:
    - './module' -> ./module.ts or ./module/index.ts
    - './module.js' -> ./module.js
    - '../module' -> parent_dir/module.ts
    - React Native platform-specific extensions: .android.js, .ios.js, .native.js, .harmony.js
    """
    if not import_path.startswith("./") and not import_path.startswith("../"):
        return None
    
    working_dir = base_dir
    rel_path = import_path
    
    while rel_path.startswith("../"):
        rel_path = rel_path[3:]
        working_dir = os.path.dirname(working_dir)
    
    if rel_path.startswith("./"):
        rel_path = rel_path[2:]
    
    candidate = os.path.join(working_dir, rel_path)
    
    if os.path.isfile(candidate):
        return candidate
    
    # 先尝试 React Native 平台特定扩展名（Metro 解析顺序）
    for ext in _PLATFORM_EXTS:
        p = candidate + ext
        if os.path.isfile(p):
            return p
    
    # 再尝试普通扩展名
    for ext in _SOURCE_EXTS:
        p = candidate + ext
        if os.path.isfile(p):
            return p
    
    # 最后尝试 index 文件
    index_path = os.path.join(candidate, "index")
    for ext in _PLATFORM_EXTS:
        p = index_path + ext
        if os.path.isfile(p):
            return p
    for ext in _SOURCE_EXTS:
        p = index_path + ext
        if os.path.isfile(p):
            return p
    
    return None


def _resolve_all_platform_files(base_dir: str, import_path: str) -> list[str]:
    """Resolve import path to ALL platform-specific file variants.
    
    Returns all matching files for different platforms:
    - ./module -> [module.android.js, module.ios.js, module.native.js, module.js, ...]
    
    Used to collect all platform implementations for reference during HarmonyOS adaptation.
    """
    if not import_path.startswith("./") and not import_path.startswith("../"):
        return []
    
    working_dir = base_dir
    rel_path = import_path
    
    while rel_path.startswith("../"):
        rel_path = rel_path[3:]
        working_dir = os.path.dirname(working_dir)
    
    if rel_path.startswith("./"):
        rel_path = rel_path[2:]
    
    candidate = os.path.join(working_dir, rel_path)
    results = []
    
    if os.path.isfile(candidate):
        results.append(candidate)
    
    # 收集所有平台特定扩展名文件
    for ext in _PLATFORM_EXTS:
        p = candidate + ext
        if os.path.isfile(p) and p not in results:
            results.append(p)
    
    # 收集普通扩展名文件
    for ext in _SOURCE_EXTS:
        p = candidate + ext
        if os.path.isfile(p) and p not in results:
            results.append(p)
    
    # 收集 index 文件的所有平台版本
    index_path = os.path.join(candidate, "index")
    for ext in _PLATFORM_EXTS:
        p = index_path + ext
        if os.path.isfile(p) and p not in results:
            results.append(p)
    for ext in _SOURCE_EXTS:
        p = index_path + ext
        if os.path.isfile(p) and p not in results:
            results.append(p)
    
    return results


def _parse_imports(file_path: str) -> list[str]:
    """Parse import/require statements from a source file."""
    if not os.path.isfile(file_path):
        return []
    
    ext = os.path.splitext(file_path)[1].lower()
    if ext not in _SOURCE_EXTS:
        return []
    
    with open(file_path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()
    
    return _parse_imports_from_content(content)


def _parse_imports_from_content(content: str) -> list[str]:
    """Parse import/require statements from content string."""
    imports = []
    
    patterns = [
        r'import\s+[^"\']*from\s+["\']([^"\']+)["\']',
        r'import\s+["\']([^"\']+)["\']',
        r'require\s*\(\s*["\']([^"\']+)["\']\s*\)',
        r'export\s+[^"\']*from\s+["\']([^"\']+)["\']',
        r'export\s*\*\s*from\s+["\']([^"\']+)["\']',
        r'export\s+\{[^}]*\}\s*from\s+["\']([^"\']+)["\']',
    ]
    
    for pattern in patterns:
        for match in re.finditer(pattern, content):
            imp = match.group(1)
            if imp.startswith("./") or imp.startswith("../"):
                imports.append(imp)
    
    return imports


def _has_dynamic_require(file_path: str) -> bool:
    """Check if file has dynamic require (template literal)."""
    if not os.path.isfile(file_path):
        return False
    
    with open(file_path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()
    
    patterns = [
        r'require\s*\(\s*[`]',
        r'import\s*\(\s*[`]',
        r'require\s*\(\s*["\'].*\$\{',
        r'import\s*\(\s*["\'].*\$\{',
    ]
    
    for pattern in patterns:
        if re.search(pattern, content):
            return True
    return False


def _collect_files_in_dir(dir_path: str, skip_output: Optional[str] = None) -> list[str]:
    """Collect all source and asset files in a directory."""
    files = []
    if not os.path.isdir(dir_path):
        return files
    
    for dirpath, dirnames, filenames in os.walk(dir_path):
        dirnames[:] = [d for d in dirnames if d not in _SKIP_DIRS and not d.startswith(".")]
        
        for fn in filenames:
            ext = os.path.splitext(fn)[1].lower()
            if ext not in _SOURCE_EXTS and ext not in _ASSET_EXTS and ext not in _TYPE_DEF_EXTS:
                continue
            
            if fn in _SKIP_JSON_FILES:
                continue
            
            p = os.path.join(dirpath, fn)
            
            if skip_output and os.path.commonpath([skip_output, p]) == skip_output:
                continue
            
            files.append(p)
    
    return files


def _resolve_from_entry(root: str, entry_rel: str, skip_output: Optional[str] = None) -> list[str]:
    """Resolve all source files starting from entry file.
    
    Collects ALL platform-specific variants (.android.js, .ios.js, etc.) for reference.
    """
    entry_path = os.path.join(root, entry_rel.lstrip("./"))
    
    if not os.path.isfile(entry_path):
        for ext in _SOURCE_EXTS:
            p = entry_path + ext
            if os.path.isfile(p):
                entry_path = p
                break
    
    if not os.path.isfile(entry_path):
        print(f"  [warn] entry file not found: {entry_rel}")
        return []
    
    visited = set()
    files = []
    dirs_to_copy = set()
    
    def visit(file_path: str) -> None:
        norm = os.path.normpath(file_path)
        if norm in visited:
            return
        visited.add(norm)
        
        # 收集平台特定文件（.js, .android.js, .ios.js 等）
        ext = os.path.splitext(file_path)[1].lower()
        if ext in _SOURCE_EXTS or any(file_path.endswith(pe) for pe in _PLATFORM_EXTS):
            files.append(file_path)
        
        if _has_dynamic_require(file_path):
            dir_path = os.path.dirname(file_path)
            dirs_to_copy.add(dir_path)
        
        imports = _parse_imports(file_path)
        for imp in imports:
            # 收集所有平台版本的文件
            all_platform_files = _resolve_all_platform_files(os.path.dirname(file_path), imp)
            for resolved in all_platform_files:
                if os.path.normpath(resolved) not in visited:
                    visit(resolved)
    
    visit(entry_path)
    
    for dir_path in dirs_to_copy:
        dir_files = _collect_files_in_dir(dir_path, skip_output)
        for f in dir_files:
            norm = os.path.normpath(f)
            if norm not in visited:
                visited.add(norm)
                files.append(f)
    
    for f in files:
        dir_path = os.path.dirname(f)
        
        base_name = os.path.basename(f)
        name_without_ext = os.path.splitext(base_name)[0]
        dts_file = os.path.join(dir_path, name_without_ext + ".d.ts")
        if os.path.isfile(dts_file):
            norm = os.path.normpath(dts_file)
            if norm not in visited:
                visited.add(norm)
                files.append(dts_file)
        
        for asset_fn in os.listdir(dir_path):
            if asset_fn in _SKIP_JSON_FILES:
                continue
            asset_path = os.path.join(dir_path, asset_fn)
            ext = os.path.splitext(asset_fn)[1].lower()
            if ext in _ASSET_EXTS:
                norm = os.path.normpath(asset_path)
                if norm not in visited:
                    visited.add(norm)
                    files.append(asset_path)
    
    return files


def resolve_types_file(root: str, pkg: dict) -> Optional[str]:
    """从 package.json 的 types 字段找到类型定义文件。
    
    Args:
        root: 插件根目录
        pkg: package.json 内容
    
    Returns: 类型定义文件的绝对路径或 None
    """
    types_field = pkg.get("types")
    if not types_field or not isinstance(types_field, str):
        return None
    
    types_rel = types_field.lstrip("./")
    types_path = os.path.join(root, types_rel)
    
    if os.path.isfile(types_path):
        return types_path
    
    return None


def resolve_source_files(root: str, pkg: dict) -> tuple[list[str], Optional[str]]:
    """Resolve all source files from package.json.
    
    Returns: (list of absolute file paths, source directory name or None)
    """
    bob_cfg = pkg.get("react-native-builder-bob")
    bob_source = None
    bob_output = None
    
    if isinstance(bob_cfg, dict):
        bob_source = bob_cfg.get("source")
        bob_output = bob_cfg.get("output")
        
        if bob_source and isinstance(bob_source, str):
            src_dir = os.path.join(root, bob_source)
            if os.path.isdir(src_dir):
                skip = os.path.join(root, bob_output) if bob_output else None
                files = _collect_files_in_dir(src_dir, skip)
                # 添加 package.json types 字段指定的 .d.ts
                types_file = resolve_types_file(root, pkg)
                if types_file and os.path.normpath(types_file) not in [os.path.normpath(f) for f in files]:
                    files.append(types_file)
                return files, bob_source
    
    for field in ("react-native", "source", "module", "main"):
        val = pkg.get(field)
        if not isinstance(val, str):
            continue
        rel = val.lstrip("./")
        
        parts = rel.split("/")
        if len(parts) == 1:
            p = os.path.join(root, rel)
            for ext in _SOURCE_EXTS:
                candidate = p + ext
                if os.path.isfile(candidate):
                    rel = rel + ext
                    break
            
            if not os.path.isfile(os.path.join(root, rel)):
                continue
            
            skip_output = os.path.join(root, bob_output) if bob_output else None
            files = _resolve_from_entry(root, rel, skip_output)
            # 添加 package.json types 字段指定的 .d.ts
            types_file = resolve_types_file(root, pkg)
            if types_file and os.path.normpath(types_file) not in [os.path.normpath(f) for f in files]:
                files.append(types_file)
            return files, None
        else:
            dir_part = parts[0]
            cand = os.path.join(root, dir_part)
            
            if bob_output and dir_part == bob_output:
                if bob_source:
                    src_dir = os.path.join(root, bob_source)
                    if os.path.isdir(src_dir):
                        files = _collect_files_in_dir(src_dir)
                        return files, bob_source
                continue
            
            if not os.path.isdir(cand):
                continue
            
            entry_file = os.path.join(root, rel)
            for ext in _SOURCE_EXTS:
                p = entry_file + ext
                if os.path.isfile(p):
                    entry_file = p
                    break
            
            if not os.path.isfile(entry_file):
                continue
            
            skip_output = os.path.join(root, bob_output) if bob_output else None
            files = _resolve_from_entry(root, rel, skip_output)
            # 添加 package.json types 字段指定的 .d.ts
            types_file = resolve_types_file(root, pkg)
            if types_file and os.path.normpath(types_file) not in [os.path.normpath(f) for f in files]:
                files.append(types_file)
            return files, dir_part
    
    for cand in ("src", "lib", "js", "source", "ts"):
        p = os.path.join(root, cand)
        if os.path.isdir(p):
            skip = os.path.join(root, bob_output) if bob_output else None
            files = _collect_files_in_dir(p, skip)
            # 添加 package.json types 字段指定的 .d.ts
            types_file = resolve_types_file(root, pkg)
            if types_file and os.path.normpath(types_file) not in [os.path.normpath(f) for f in files]:
                files.append(types_file)
            return files, cand
    
    # 默认返回时也检查 types 文件
    types_file = resolve_types_file(root, pkg)
    if types_file:
        return [types_file], None
    
    return [], None


_SOURCE_DIR_PREFIXES = ("src", "lib", "js", "source", "ts", "Sources")


def _strip_source_prefix(rel: str, source_dir: Optional[str]) -> str:
    """去掉源码目录前缀，使文件在 ohos/src/ 下有正确的相对路径。"""
    if source_dir and rel.startswith(source_dir + os.sep):
        return rel[len(source_dir) + 1:]
    
    for prefix in _SOURCE_DIR_PREFIXES:
        if rel.startswith(prefix + os.sep):
            return rel[len(prefix) + 1:]
    
    return rel


def _find_entry_file(root: str, pkg: dict) -> Optional[str]:
    """Find entry file from package.json."""
    for field in ("react-native", "source", "module", "main"):
        val = pkg.get(field)
        if not isinstance(val, str):
            continue
        rel = val.lstrip("./")
        
        p = os.path.join(root, rel)
        for ext in _SOURCE_EXTS:
            cand = p + ext
            if os.path.isfile(cand):
                return cand
        if os.path.isfile(p):
            return p
    
    return None


def copy_source_to_ohos(root: str, ohos_dst: str, files: list[str], source_dir: Optional[str], pkg: Optional[dict] = None, dry_run: bool = False) -> int:
    """Copy resolved source files to ohos/src/.
    
    Entry file will be renamed to index.xxx.
    """
    dst_src = os.path.join(ohos_dst, "src")
    count = 0
    
    entry_file = None
    if pkg:
        entry_file = _find_entry_file(root, pkg)
    
    if dry_run:
        print(f"  [dry-run] would copy {len(files)} files to ohos/src/")
        return len(files)
    
    for src_file in files:
        rel = os.path.relpath(src_file, root)
        rel = _strip_source_prefix(rel, source_dir)
        
        dst_file = os.path.join(dst_src, rel)
        
        if entry_file and os.path.normpath(src_file) == os.path.normpath(entry_file):
            ext = os.path.splitext(src_file)[1].lower()
            if ext in (".tsx", ".ts", ".jsx", ".js", ".mjs", ".cjs"):
                index_name = "index" + ext
                dst_file = os.path.join(dst_src, index_name)
                print(f"  renamed entry: {os.path.basename(src_file)} -> {index_name}")
        
        os.makedirs(os.path.dirname(dst_file), exist_ok=True)
        shutil.copy2(src_file, dst_file)
        count += 1
    
    print(f"  copied {count} files to ohos/src/")
    return count