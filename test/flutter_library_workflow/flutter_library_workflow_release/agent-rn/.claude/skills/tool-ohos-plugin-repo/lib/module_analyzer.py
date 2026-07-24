"""模块类型分析器

检测 React Native 模块的类型：
- js-only: 纯 JS/TS 模块，无原生代码
- turbo: TurboModule（新架构）或 NativeModules（老架构需迁移）或 NitroModules（需迁移）
- fabric: Fabric 组件（新架构）或 requireNativeComponent（老架构需迁移）
- both: 同时包含 TurboModule 和 Fabric

检测逻辑：
1. 扫描 Spec 文件（新架构：TurboModuleRegistry、codegenNativeComponent）
2. 扫描 NitroModules（NitroModules.createHybridObject）
3. 扫描源码中的 NativeModules/requireNativeComponent（老架构）
4. 返回完整的分析报告
"""

from __future__ import annotations

import dataclasses
import os
import re
import json
from typing import Optional


@dataclasses.dataclass
class ModuleAnalysis:
    """模块分析结果"""
    module_kind: str  # js-only / turbo / fabric / both
    has_turbo_spec: bool  # 新架构 TurboModule Spec 文件
    has_fabric_spec: bool  # 新架构 Fabric Spec 文件
    has_nitro: bool  # NitroModules hybrid object（需迁移到 TurboModule）
    has_native_modules: bool  # 老架构 NativeModules
    has_require_native_component: bool  # 老架构 requireNativeComponent
    turbo_names: list[str]  # TurboModule 名称列表
    fabric_names: list[str]  # Fabric 组件名称列表
    nitro_names: list[str]  # NitroModules 名称列表（需迁移）
    native_module_names: list[str]  # NativeModules 名称列表
    require_native_component_names: list[str]  # requireNativeComponent 名称列表
    fabric_layouts: list[dict]  # 各 Fabric 组件 container|leaf|unknown 及 signals
    source_type: str  # ts / js
    source_dir: str  # 源码目录
    inferred_source_dir: str  # 推断的源码目录
    entry_file: str  # 入口文件相对路径
    source_files: list[str]  # 源码文件相对路径列表
    source_file_count: int  # 源码文件数量
    has_dynamic_require: bool  # 是否有动态 require
    dynamic_require_dirs: list[str]  # 动态 require 的目录列表（相对路径）
    
    spec_files: list[str]  # Spec 文件相对路径列表（用于拷贝到 specs/v1）
    
    npm_name: str  # 原始 npm 包名
    short_name: str  # 简短名（react-native-xxx -> xxx）
    camel_name: str  # 驼峰名（xxx -> Xxx）
    ohos_name: str  # 鸿蒙包名（默认 @oh-rn/xxx，见 ohos_npm_config / 系统设置）
    version: str  # 版本
    original_name: str  # 原始库名
    original_url: str  # 原始库链接
    autolink: str  # 是否自动链接（"是" / "否"）


_SKIP_DIRS = frozenset({
    "node_modules", "oh_modules", ".git", "android", "ios", "harmony",
    "build", "dist", "example", "examples", "tests", "test", "__tests__",
    ".rn-build", "ohos", "coverage", "docs", "documentation",
    "windows", "macos", "linux", "pods", "out", "lib", ".rn-ohos-adaptation"
})

_SOURCE_EXTS = (".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs")


def analyze_module(plugin_root: str) -> ModuleAnalysis:
    """分析模块类型
    
    Args:
        plugin_root: 插件根目录
    
    Returns:
        ModuleAnalysis: 完整的分析结果
    """
    from lib import spec_scan, source_resolver, package_merge
    
    # 读取 package.json
    pkg_path = os.path.join(plugin_root, "package.json")
    pkg = {}
    if os.path.isfile(pkg_path):
        with open(pkg_path, "r", encoding="utf-8") as f:
            pkg = json.load(f)
    
    # 1. 检测新架构 Spec 文件
    hits, inferred_source = spec_scan.scan_spec_sources_global(plugin_root)
    turbo_names = []
    fabric_names = []
    nitro_names = []
    spec_files = []
    
    for hit in hits:
        turbo_names.extend(hit.turbo_names)
        fabric_names.extend(hit.fabric_names)
        nitro_names.extend(hit.nitro_names)
        # Only add actual spec definition files (not NitroModules export layer files)
        # Export layer files have nitro_names but is_nitro_spec_def=False
        if hit.is_nitro_spec_def or hit.turbo_names or hit.fabric_names:
            spec_files.append(hit.rel_posix)
    
    has_turbo_spec = len(turbo_names) > 0
    has_fabric_spec = len(fabric_names) > 0
    has_nitro = len(nitro_names) > 0
    
    # 2. 检测老架构
    native_module_names = _detect_native_module_names(plugin_root)
    require_native_names = _detect_require_native_names(plugin_root)
    
    has_native_modules = len(native_module_names) > 0
    has_require_native_component = len(require_native_names) > 0
    
    # 3. 合并结果（NitroModules 视为需要迁移的 turbo）
    has_turbo = has_turbo_spec or has_native_modules or has_nitro
    has_fabric = has_fabric_spec or has_require_native_component
    
    # 4. 确定模块类型
    if has_turbo and has_fabric:
        module_kind = "both"
    elif has_fabric:
        module_kind = "fabric"
    elif has_turbo:
        module_kind = "turbo"
    else:
        module_kind = "js-only"
    
    # 5. 解析源码文件
    source_files_abs, resolved_source_dir = source_resolver.resolve_source_files(plugin_root, pkg)
    
    # 转换为相对路径
    source_files = []
    for f in source_files_abs:
        rel = os.path.relpath(f, plugin_root).replace("\\", "/")
        source_files.append(rel)
    
    source_file_count = len(source_files)
    
    # 6. 根据源码文件判断类型（排除 spec 文件）
    # spec 文件是 TS 但不需要 bob 编译，只用于 codegen
    spec_abs_paths = {os.path.normpath(os.path.join(plugin_root, s.replace("/", os.sep))) for s in spec_files}
    source_type = "js"
    for f in source_files_abs:
        # 排除 spec 文件
        if os.path.normpath(f) in spec_abs_paths:
            continue
        ext = os.path.splitext(f)[1].lower()
        if ext in (".ts", ".tsx") and not f.endswith(".d.ts"):
            source_type = "ts"
            break
    
    # 7. 确定入口文件
    entry_file = _detect_entry_file(plugin_root, pkg)
    
    # 8. 检测动态 require
    dynamic_require_dirs = _detect_dynamic_require_dirs(plugin_root, source_files_abs)
    has_dynamic_require = len(dynamic_require_dirs) > 0
    
    # 9. 计算命名相关字段
    npm_name = pkg.get("name", "")
    short_name = package_merge.derive_package_short_name(npm_name)
    camel_name = package_merge.derive_camel_case_name(short_name)
    ohos_name = package_merge.ohos_package_name_from_parent(npm_name)
    
    # 10. 计算 package.json 元数据字段
    version = pkg.get("version", "见发布记录")
    original_name = pkg.get("name", npm_name)
    repo = pkg.get("repository", {})
    original_url = repo.get("url", "") if isinstance(repo, dict) else (repo if isinstance(repo, str) else "")
    homepage = pkg.get("homepage", "")
    if homepage and not original_url:
        original_url = homepage
    
    harmony_field = pkg.get("harmony", {})
    autolink = "是" if isinstance(harmony_field, dict) and harmony_field.get("autolinking") else "否"

    from lib import fabric_layout

    fabric_like_names = sorted(set(fabric_names + require_native_names))
    fabric_layouts = [
        r.to_dict() for r in fabric_layout.detect_fabric_layouts(plugin_root, fabric_like_names)
    ]
    
    return ModuleAnalysis(
        module_kind=module_kind,
        has_turbo_spec=has_turbo_spec,
        has_fabric_spec=has_fabric_spec,
        has_nitro=has_nitro,
        has_native_modules=has_native_modules,
        has_require_native_component=has_require_native_component,
        turbo_names=turbo_names,
        fabric_names=fabric_names,
        nitro_names=nitro_names,
        native_module_names=native_module_names,
        require_native_component_names=require_native_names,
        fabric_layouts=fabric_layouts,
        source_type=source_type,
        source_dir=resolved_source_dir or "",
        inferred_source_dir=inferred_source or resolved_source_dir or "",
        entry_file=entry_file,
        source_files=source_files,
        source_file_count=source_file_count,
        has_dynamic_require=has_dynamic_require,
        dynamic_require_dirs=dynamic_require_dirs,
        spec_files=spec_files,
        npm_name=npm_name,
        short_name=short_name,
        camel_name=camel_name,
        ohos_name=ohos_name,
        version=version,
        original_name=original_name,
        original_url=original_url,
        autolink=autolink,
    )


def _detect_native_module_names(plugin_root: str) -> list[str]:
    """检测老架构 NativeModules 并提取模块名称
    
    匹配模式：
    - NativeModules.RNTestModule
    - { RNTestModule, RNOtherModule } = NativeModules
    """
    pattern = r"NativeModules\.(\w+)|\{\s*([^}]+)\s*\}\s*=\s*NativeModules"
    matches = _scan_source_for_matches(plugin_root, pattern)
    
    names = []
    for match in matches:
        # NativeModules.Xxx 形式
        if match.get("group1"):
            names.append(match["group1"])
        # { Xxx, Yyy } = NativeModules 形式
        if match.get("group2"):
            for name in match["group2"].split(","):
                name = name.strip()
                if name:
                    names.append(name)
    
    # 去重并排序
    return sorted(set(names))


def _detect_require_native_names(plugin_root: str) -> list[str]:
    """检测老架构 requireNativeComponent 并提取组件名称
    
    匹配模式：
    - requireNativeComponent('TestView')
    - requireNativeComponent("TestView")
    """
    pattern = r"requireNativeComponent\s*\(\s*['\"]([^'\"]+)['\"]"
    matches = _scan_source_for_matches(plugin_root, pattern)
    
    names = [m["group1"] for m in matches if m.get("group1")]
    return sorted(set(names))


def _scan_source_for_matches(plugin_root: str, pattern: str) -> list[dict]:
    """扫描源码文件，返回所有匹配结果"""
    regex = re.compile(pattern, re.MULTILINE)
    matches = []
    
    for dirpath, dirnames, filenames in os.walk(plugin_root):
        # 过滤跳过的目录
        dirnames[:] = [d for d in dirnames 
                       if d not in _SKIP_DIRS and not d.startswith(".")]
        
        for fn in filenames:
            ext = os.path.splitext(fn)[1].lower()
            if ext not in _SOURCE_EXTS:
                continue
            
            file_path = os.path.join(dirpath, fn)
            try:
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                
                for match in regex.finditer(content):
                    matches.append({
                        "file": file_path,
                        "group1": match.group(1) if len(match.groups()) > 0 else None,
                        "group2": match.group(2) if len(match.groups()) > 1 else None,
                    })
            except OSError:
                continue
    
    return matches


def format_analysis_report(analysis: ModuleAnalysis) -> str:
    """格式化分析报告"""
    lines = []
    lines.append("=== Module Analysis ===")
    lines.append("")
    lines.append(f"Module Kind: {analysis.module_kind}")
    lines.append(f"Source Type: {analysis.source_type}")
    lines.append(f"Source Dir:  {analysis.source_dir or '(root)'}")
    lines.append("")
    
    lines.append("--- Package Info ---")
    lines.append(f"  NPM Name: {analysis.npm_name or '(not set)'}")
    lines.append(f"  Short Name: {analysis.short_name}")
    lines.append(f"  Camel Name: {analysis.camel_name}")
    lines.append(f"  OHOS Name: {analysis.ohos_name}")
    lines.append(f"  Version: {analysis.version}")
    lines.append(f"  Autolink: {analysis.autolink}")
    
    lines.append("")
    lines.append("--- New Architecture ---")
    lines.append(f"  TurboModule Spec: {analysis.has_turbo_spec}")
    if analysis.turbo_names:
        lines.append(f"    Names: {', '.join(analysis.turbo_names)}")
    lines.append(f"  Fabric Spec: {analysis.has_fabric_spec}")
    if analysis.fabric_names:
        lines.append(f"    Names: {', '.join(analysis.fabric_names)}")
    if analysis.fabric_layouts:
        lines.append("    Layout (container / leaf):")
        for fl in analysis.fabric_layouts:
            sig = ", ".join(fl.get("signals") or [])
            extra = f" — {sig}" if sig else ""
            lines.append(
                f"      {fl['name']}: {fl['layout']} ({fl['confidence']}){extra}"
            )
    lines.append(f"  NitroModules: {analysis.has_nitro}")
    if analysis.nitro_names:
        lines.append(f"    Names: {', '.join(analysis.nitro_names)}")
    
    lines.append("")
    lines.append("--- Old Architecture ---")
    lines.append(f"  NativeModules: {analysis.has_native_modules}")
    if analysis.native_module_names:
        lines.append(f"    Names: {', '.join(analysis.native_module_names)}")
    lines.append(f"  requireNativeComponent: {analysis.has_require_native_component}")
    if analysis.require_native_component_names:
        lines.append(f"    Names: {', '.join(analysis.require_native_component_names)}")
    
    lines.append("")
    lines.append("--- Source Resolution ---")
    lines.append(f"  Entry File: {analysis.entry_file or '(not found)'}")
    lines.append(f"  Source Dir: {analysis.source_dir or '(root)'}")
    lines.append(f"  Source Files: {analysis.source_file_count}")
    if analysis.source_file_count > 0 and analysis.source_file_count <= 20:
        for f in analysis.source_files:
            lines.append(f"    {f}")
    elif analysis.source_file_count > 20:
        lines.append(f"    (showing first 10)")
        for f in analysis.source_files[:10]:
            lines.append(f"    {f}")
    lines.append(f"  Spec Files: {len(analysis.spec_files)}")
    if analysis.spec_files:
        for f in analysis.spec_files:
            lines.append(f"    {f}")
    lines.append(f"  Dynamic Require: {analysis.has_dynamic_require}")
    needs_compile = analysis.source_type == "ts"
    lines.append(f"  Needs Compile: {needs_compile}")
    
    lines.append("")
    lines.append("--- Migration ---")
    if analysis.has_nitro:
        lines.append("  [NOTE] NitroModules detected, need migrate to TurboModule")
        lines.append("        Run: rn.py migrate")
    if analysis.has_native_modules:
        lines.append("  [NOTE] NativeModules detected, need migrate to TurboModule")
        lines.append("        Run: rn.py migrate")
    if analysis.has_require_native_component:
        lines.append("  [NOTE] requireNativeComponent detected, need migrate to Fabric")
        lines.append("        Run: rn.py migrate")
    if analysis.module_kind == "js-only":
        lines.append("  [OK] Pure JS/TS module, no migration needed")
    
    lines.append("")
    lines.append("--- Create Command ---")
    if analysis.module_kind == "js-only":
        lines.append("  rn.py create --module js-only")
    elif analysis.module_kind == "turbo":
        lines.append("  rn.py create --module turbo")
    elif analysis.module_kind == "fabric":
        lines.append("  rn.py create --module fabric")
    else:
        lines.append("  rn.py create --module both")
    
    return "\n".join(lines)


def get_module_kind(plugin_root: str) -> str:
    """快速获取模块类型（简化接口）
    
    Args:
        plugin_root: 插件根目录
    
    Returns:
        str: turbo / fabric / both / js-only
    """
    analysis = analyze_module(plugin_root)
    return analysis.module_kind


def _detect_entry_file(plugin_root: str, pkg: dict) -> str:
    """检测入口文件
    
    Args:
        plugin_root: 插件根目录
        pkg: package.json 内容
    
    Returns:
        str: 入口文件相对路径
    """
    bob_config = pkg.get("react-native-builder-bob", {})
    bob_source = None
    bob_output = None
    
    if isinstance(bob_config, dict):
        bob_source = bob_config.get("source")
        bob_output = bob_config.get("output")
    
    # 如果有 bob.source，优先从该目录查找入口
    if bob_source:
        for entry_name in ("index.ts", "index.js", "index.tsx", "index.jsx"):
            candidate = os.path.join(bob_source, entry_name)
            if os.path.isfile(os.path.join(plugin_root, candidate)):
                return candidate
    
    # 依次尝试各入口字段
    for field in ("react-native", "source", "module", "main"):
        val = pkg.get(field)
        if not isinstance(val, str):
            continue
        
        rel = val.lstrip("./")
        
        # 跳过 bob.output 目录（编译产物）
        if bob_output and rel.startswith(bob_output):
            continue
        
        # 尝试直接文件
        for ext in _SOURCE_EXTS:
            candidate = rel if rel.endswith(ext) else rel + ext
            if os.path.isfile(os.path.join(plugin_root, candidate)):
                return candidate
        
        # 尝试目录下的 index
        if not any(rel.endswith(ext) for ext in _SOURCE_EXTS):
            for ext in _SOURCE_EXTS:
                idx = os.path.join(rel, f"index{ext}")
                if os.path.isfile(os.path.join(plugin_root, idx)):
                    return idx
    
    # 兜底：尝试常见入口
    for entry in ("src/index.ts", "src/index.js", "index.ts", "index.js"):
        if os.path.isfile(os.path.join(plugin_root, entry)):
            return entry
    
    return ""


def _detect_dynamic_require_dirs(plugin_root: str, source_files: list[str]) -> list[str]:
    """检测动态 require 引用的目标目录
    
    Args:
        plugin_root: 插件根目录
        source_files: 源码文件绝对路径列表
    
    Returns:
        list[str]: 动态 require 的目标目录相对路径列表
    """
    dirs = set()
    
    for file_path in source_files:
        ext = os.path.splitext(file_path)[1].lower()
        if ext not in _SOURCE_EXTS:
            continue
        
        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
            
            # 匹配动态 require/import 语句并提取目标目录
            # 例如: require(`./modules/${var}`) -> ./modules
            # 例如: require('./subdir/' + name) -> ./subdir
            patterns_with_extract = [
                (r'require\s*\(\s*[`]([^\$`\']+)', 1),  # require(`./modules/${var}`)
                (r'import\s*\(\s*[`]([^\$`\']+)', 1),    # import(`./modules/${var}`)
                (r'require\s*\(\s*["\']([^$"\']+)', 1), # require('./subdir/' + var)
                (r'import\s*\(\s*["\']([^$"\']+)', 1),  # import('./subdir/' + var)
            ]
            
            file_dir = os.path.dirname(file_path)
            
            for pattern, group_idx in patterns_with_extract:
                for match in re.finditer(pattern, content):
                    import_path = match.group(group_idx).strip()
                    if import_path.startswith("./") or import_path.startswith("../"):
                        # 解析相对路径到绝对路径
                        resolved = _resolve_dynamic_import_dir(file_dir, import_path)
                        if resolved:
                            rel_dir = os.path.relpath(resolved, plugin_root).replace("\\", "/")
                            dirs.add(rel_dir)
        except OSError:
            continue
    
    return sorted(dirs)


def _resolve_dynamic_import_dir(file_dir: str, import_path: str) -> Optional[str]:
    """解析动态 import 路径中的目录部分
    
    Args:
        file_dir: 包含 import 语句的文件所在目录
        import_path: import 路径（如 ./modules/${var} 或 ./subdir/）
    
    Returns:
        str: 解析后的目录绝对路径，或 None
    """
    working_dir = file_dir
    rel_path = import_path
    
    # 处理 ../ 
    while rel_path.startswith("../"):
        rel_path = rel_path[3:]
        working_dir = os.path.dirname(working_dir)
    
    # 处理 ./
    if rel_path.startswith("./"):
        rel_path = rel_path[2:]
    
    # 移除 ${var} 部分，只保留目录路径
    # 例如: modules/${var} -> modules
    parts = rel_path.split("/")
    dir_parts = []
    for part in parts:
        if part.startswith("$") or part == "":
            break
        dir_parts.append(part)
    
    if dir_parts:
        target_dir = os.path.join(working_dir, *dir_parts)
        if os.path.isdir(target_dir):
            return target_dir
    
    return None