#!/usr/bin/env python3
"""
静态检查 Example 代码（含白屏预检）：

注意：导入检查和 JSX 语法检查已移除，由 example 的 npm run tsc 覆盖。
本脚本保留 tsc 无法覆盖的检查：

1. HAP 产物检查（编译完整性）
2. C++ PackageProvider.cpp 注册一致性（白屏防护）
3. Fabric 组件 Index.ets 注册完整性（白屏防护）
4. Fabric Builder Stack 包裹检测（白屏防护）
5. Bundle 废弃 API 残留扫描（白屏防护）
6. appKey 一致性检查（白屏防护）
7. Example 质量检查（禁 iOS-only API、禁不可达 URL）
8. entry/oh-package.json5 HAR 注册完整性 + autolink/手动注册一致性

用法（在插件仓库根目录）：
    python .claude/skills/tool-ohos-plugin-repo/tool/check_example_static.py .

退出码：0 通过；1 失败；2 跳过
"""
import os
import re
import sys
import json
from pathlib import Path
from typing import Set, Dict, List, Tuple, Optional

TAG = "[check-example-static]"
_FRAMEWORK_OHOS_NAME = "@rnoh/react-native-openharmony"
_OH_PKG_DEP_RE = re.compile(r'^\s*"([^"]+)"\s*:\s*"file:([^"]+)"\s*,?\s*$', re.MULTILINE)
_MAKE_SHARED_PKG_RE = re.compile(r"make_shared<(?:rnoh::)?(\w*Package)>")
_NEW_ETS_PKG_RE = re.compile(r"new\s+(\w*Package)\s*\(\s*ctx\s*\)")

_SKILL_ROOT = Path(__file__).resolve().parent.parent
if str(_SKILL_ROOT) not in sys.path:
    sys.path.insert(0, str(_SKILL_ROOT))


def log(msg: str) -> None:
    print(f"{TAG} {msg}")


def fail(msg: str) -> None:
    print(f"{TAG} {msg}", file=sys.stderr)


def resolve_ohos_root(repo_path: Path) -> Optional[Path]:
    root = repo_path.resolve()
    candidates = [root / "ohos"]
    packages_dir = root / "packages"
    if packages_dir.exists():
        for ent in packages_dir.iterdir():
            if ent.is_dir():
                candidates.append(ent / "ohos")
    for dir in candidates:
        pkg = dir / "package.json"
        if pkg.exists():
            return dir.resolve()
    return None


def import_specifiers(pkg: Dict) -> Set[str]:
    s = set()
    if pkg.get("name"):
        s.add(pkg["name"])
    harmony = pkg.get("harmony", {})
    if harmony.get("alias"):
        s.add(harmony["alias"])
    return s


def resolve_entry(ohos_root: Path, pkg: Dict) -> Path:
    rel = pkg.get("module") or pkg.get("react-native") or pkg.get("main") or "src/index.ts"
    first = ohos_root / rel
    if first.exists():
        return first
    for alt in [
        "src/index.ts",
        "src/index.tsx",
        "src/index.js",
        "dist/module/index.js",
        "dist/commonjs/index.js",
    ]:
        p = ohos_root / alt
        if p.exists():
            return p
    return first


def find_example_apps(ohos_root: Path) -> List[Path]:
    ex = ohos_root / "example"
    if not ex.exists():
        return []
    return [
        ex / n
        for n in ["App.tsx", "App.ts", "App.jsx", "App.js", "index.tsx", "index.ts"]
        if (ex / n).exists()
    ]


def split_specifiers(text: str) -> List[str]:
    parts = text.split(",")
    result = []
    for part in parts:
        part = part.strip()
        if not part:
            continue
        if re.match(r"^type\s+\w+", part):
            continue
        as_match = re.match(r"^(\w+)\s+as\s+(\w+)$", part)
        if as_match:
            result.append(as_match.group(2))
        else:
            result.append(re.sub(r"^type\s+", "", part))
    return result


def resolve_relative(from_file: Path, spec: str) -> Path:
    base = from_file.parent
    for ext in ["", ".ts", ".tsx", ".js", ".jsx", ".d.ts"]:
        c = base / (spec + ext)
        if c.exists():
            return c
    return base / spec


def _collect_dts_exports(dts_file: Path, var_name: str, visited: Set[Path]) -> Set[str]:
    """从 .d.ts 文件中解析 declare namespace 的导出属性。
    
    Args:
        dts_file: .d.ts 文件路径
        var_name: 导出的变量名（如 RNVC）
        visited: 已访问文件集合
    
    Returns:
        导出的方法名集合
    """
    if dts_file.resolve() in visited:
        return set()
    visited.add(dts_file.resolve())
    
    try:
        code = dts_file.read_text(encoding="utf-8")
    except Exception:
        return set()
    
    methods = set()
    
    namespace_re = re.compile(
        r"declare\s+namespace\s+" + re.escape(var_name) + r"\s*\{",
        re.MULTILINE
    )
    for m in namespace_re.finditer(code):
        start_pos = m.end() - 1
        brace_count = 1
        pos = start_pos + 1
        while pos < len(code) and brace_count > 0:
            if code[pos] == '{':
                brace_count += 1
            elif code[pos] == '}':
                brace_count -= 1
            pos += 1
        namespace_body = code[start_pos + 1:pos - 1]
        
        export_const_re = re.compile(r"export\s+(?:const|let|var|function)\s+(\w+)")
        for cm in export_const_re.finditer(namespace_body):
            methods.add(cm.group(1))
        
        export_re = re.compile(r"export\s*\{\s*([^}]+)\s*\}")
        for em in export_re.finditer(namespace_body):
            for n in split_specifiers(em.group(1)):
                methods.add(n)
    
    declare_const_re = re.compile(
        r"declare\s+(?:const|let|var)\s+" + re.escape(var_name) + r"\s*:\s*\{",
        re.MULTILINE
    )
    for m in declare_const_re.finditer(code):
        start_pos = m.end() - 1
        brace_count = 1
        pos = start_pos + 1
        while pos < len(code) and brace_count > 0:
            if code[pos] == '{':
                brace_count += 1
            elif code[pos] == '}':
                brace_count -= 1
            pos += 1
        type_body = code[start_pos + 1:pos - 1]
        
        prop_re = re.compile(r"(\w+)\s*:")
        for pm in prop_re.finditer(type_body):
            methods.add(pm.group(1))
    
    return methods


def collect_exports(file_path: Path, visited: Set[Path] = None) -> Tuple[Set[str], Set[str]]:
    if visited is None:
        visited = set()
    abs_path = file_path.resolve()
    if not abs_path.exists() or abs_path in visited:
        return set(), set()
    visited.add(abs_path)
    code = abs_path.read_text(encoding="utf-8")
    named = set()
    default_methods = set()

    named_re = re.compile(r"export\s*\{\s*([^}]+)\s*\}(?:\s*from\s*['\"]([^'\"]+)['\"])?")
    for m in named_re.finditer(code):
        for n in split_specifiers(m.group(1)):
            named.add(n)
        if m.group(2):
            sub_named, _ = collect_exports(resolve_relative(abs_path, m.group(2)), visited)
            named.update(sub_named)

    star_re = re.compile(r"export\s*\*\s+from\s*['\"]([^'\"]+)['\"]")
    for m in star_re.finditer(code):
        sub_named, _ = collect_exports(resolve_relative(abs_path, m.group(1)), visited)
        named.update(sub_named)

    decl_re = re.compile(r"export\s+(?:declare\s+)?(?:async\s+)?(?:function|class|const|let|var)\s+(\w+)")
    for m in decl_re.finditer(code):
        named.add(m.group(1))

    default_obj_re = re.compile(r"export\s+default\s*\{")
    for m in default_obj_re.finditer(code):
        start_pos = m.end() - 1
        brace_count = 1
        pos = start_pos + 1
        while pos < len(code) and brace_count > 0:
            if code[pos] == '{':
                brace_count += 1
            elif code[pos] == '}':
                brace_count -= 1
            pos += 1
        obj_content = code[start_pos + 1:pos - 1]
        props = []
        depth = 0
        current_prop = ""
        for char in obj_content:
            if char == '{' or char == '(' or char == '[':
                depth += 1
                current_prop += char
            elif char == '}' or char == ')' or char == ']':
                depth -= 1
                current_prop += char
            elif char == ',' and depth == 0:
                props.append(current_prop.strip())
                current_prop = ""
            else:
                current_prop += char
        if current_prop.strip():
            props.append(current_prop.strip())
        for prop in props:
            name_match = re.match(r"^(\w+)\s*[:=]", prop)
            if name_match:
                default_methods.add(name_match.group(1))

    default_var_re = re.compile(r"export\s+default\s+(\w+)\s*;?\s*(?:\n|$)")
    for m in default_var_re.finditer(code):
        var_name = m.group(1)
        obj_re = re.compile(r"(?:const|let|var)\s+" + var_name + r"\s*=\s*\{([^}]+)\}")
        for obj_match in obj_re.finditer(code):
            props = [p.strip() for p in obj_match.group(1).split(",") if p.strip()]
            for prop in props:
                name_match = re.match(r"^(\w+)", prop)
                if name_match:
                    default_methods.add(name_match.group(1))

        class_re = re.compile(r"class\s+" + re.escape(var_name) + r"\s*(?:extends\s+[\w.]+)?\s*\{")
        for cm in class_re.finditer(code):
            class_body_start = cm.end()
            brace_count = 1
            pos = class_body_start
            while pos < len(code) and brace_count > 0:
                if code[pos] == '{':
                    brace_count += 1
                elif code[pos] == '}':
                    brace_count -= 1
                pos += 1
            class_body = code[class_body_start:pos-1]
            static_re = re.compile(r"static\s+(?:async\s+)?(\w+)\s*[=:(]")
            for sm in static_re.finditer(class_body):
                default_methods.add(sm.group(1))

        es5_static_re = re.compile(r"\b" + re.escape(var_name) + r"\.(\w+)\s*=\s*(?:function|async\s+function|\(|[^;\n]+)")
        for sm in es5_static_re.finditer(code):
            default_methods.add(sm.group(1))
        
        define_property_re = re.compile(r"_defineProperty\s*\(\s*" + re.escape(var_name) + r"\s*,\s*['\"](\w+)['\"]\s*,")
        for sm in define_property_re.finditer(code):
            default_methods.add(sm.group(1))

        if not class_re.search(code):
            sibling_file = file_path.parent / (var_name + ".js")
            sibling_ts = file_path.parent / (var_name + ".ts")
            sibling_tsx = file_path.parent / (var_name + ".tsx")
            for sibling in [sibling_file, sibling_ts, sibling_tsx]:
                if sibling.exists() and sibling.resolve() not in visited:
                    _, sibling_methods = collect_exports(sibling, visited)
                    if sibling_methods:
                        default_methods.update(sibling_methods)
                        break
        
        if not default_methods:
            dts_candidates = []
            dts_same_dir = file_path.parent / (file_path.stem + ".d.ts")
            if dts_same_dir.exists():
                dts_candidates.append(dts_same_dir)
            
            if file_path.parent.name in ["module", "commonjs"] and file_path.parent.parent.name == "dist":
                typescript_dir = file_path.parent.parent / "typescript"
                if typescript_dir.exists():
                    dts_dist = typescript_dir / (file_path.stem + ".d.ts")
                    if dts_dist.exists():
                        dts_candidates.append(dts_dist)
            
            for dts_file in dts_candidates:
                if dts_file.resolve() not in visited:
                    dts_methods = _collect_dts_exports(dts_file, var_name, visited)
                    if dts_methods:
                        default_methods.update(dts_methods)
                        break

    module_exports_re = re.compile(r"module\.exports\s*=\s*(\w+)\s*;?\s*$", re.MULTILINE)
    for m in module_exports_re.finditer(code):
        export_name = m.group(1)
        
        # Check if export_name is imported via require
        require_re = re.compile(r"(?:const|let|var)\s+" + re.escape(export_name) + r"\s*=\s*require\s*\(\s*['\"]([^'\"]+)['\"]\s*\)")
        require_match = require_re.search(code)
        if require_match:
            # Trace the require path
            source_path = resolve_relative(file_path, require_match.group(1))
            if source_path.exists() and source_path.resolve() not in visited:
                _, source_methods = collect_exports(source_path, visited)
                default_methods.update(source_methods)
            continue
        
        # If not imported, check if class is defined in current file
        class_re = re.compile(r"class\s+" + re.escape(export_name) + r"\s*(?:extends\s+[\w.]+)?\s*\{")
        for cm in class_re.finditer(code):
            class_body_start = cm.end()
            brace_count = 1
            pos = class_body_start
            while pos < len(code) and brace_count > 0:
                if code[pos] == '{':
                    brace_count += 1
                elif code[pos] == '}':
                    brace_count -= 1
                pos += 1
            class_body = code[class_body_start:pos-1]
            static_re = re.compile(r"static\s+(?:async\s+)?(\w+)\s*[=:(]")
            for sm in static_re.finditer(class_body):
                default_methods.add(sm.group(1))

        es5_static_re = re.compile(r"\b" + re.escape(export_name) + r"\.(\w+)\s*=\s*(?:function|async\s+function|\(|[^;\n]+)")
        for sm in es5_static_re.finditer(code):
            default_methods.add(sm.group(1))
        
        # If class not found in current file, search sibling files
        class_re = re.compile(r"class\s+" + re.escape(export_name) + r"\s*(?:extends\s+[\w.]+)?\s*\{")
        if not class_re.search(code):
            for ext in ["js", "ts", "tsx"]:
                sibling = file_path.parent / (export_name + "." + ext)
                if sibling.exists() and sibling.resolve() not in visited:
                    _, sibling_methods = collect_exports(sibling, visited)
                    if sibling_methods:
                        default_methods.update(sibling_methods)
                        break

    exports_default_re = re.compile(r"exports\.default\s*=\s*(\w+)(?:\.\w+)?\s*;?\s*(?:\n|$)")
    for m in exports_default_re.finditer(code):
        export_name = m.group(1)
        require_re = re.compile(r"var\s+" + export_name + r"\s*=\s*require\s*\(\s*['\"]([^'\"]+)['\"]\s*\)")
        require_match = require_re.search(code)
        if require_match:
            source_path = resolve_relative(file_path, require_match.group(1))
            if source_path.exists() and source_path.resolve() not in visited:
                _, source_methods = collect_exports(source_path, visited)
                default_methods.update(source_methods)
        else:
            es5_static_re = re.compile(r"\b" + re.escape(export_name) + r"\.(\w+)\s*=\s*(?:function|async\s+function|\(|[^;\n]+)")
            for sm in es5_static_re.finditer(code):
                default_methods.add(sm.group(1))
            class_re = re.compile(r"class\s+" + re.escape(export_name) + r"\s*(?:extends\s+[\w.]+)?\s*\{")
            if not class_re.search(code):
                for ext in ["js", "ts", "tsx"]:
                    sibling = file_path.parent / (export_name + "." + ext)
                    if sibling.exists() and sibling.resolve() not in visited:
                        _, sibling_methods = collect_exports(sibling, visited)
                        if sibling_methods:
                            default_methods.update(sibling_methods)
                            break

    return named, default_methods


def collect_named_imports(file_path: Path, allowed: Set[str]) -> List[Dict]:
    code = file_path.read_text(encoding="utf-8")
    out = []
    patterns = [
        re.compile(r"import\s+(?!type\s)\{\s*([^}]+)\s*\}\s*from\s*['\"]([^'\"]+)['\"]"),
        re.compile(r"import\s+[^,;\n]+\s*,\s*\{\s*([^}]+)\s*\}\s*from\s*['\"]([^'\"]+)['\"]"),
    ]
    for pattern in patterns:
        for m in pattern.finditer(code):
            module = m.group(2)
            if module not in allowed:
                continue
            names = split_specifiers(m.group(1))
            if names:
                out.append({"file": file_path, "module": module, "names": names})
    return out


def collect_default_import_access(file_path: Path, allowed: Set[str]) -> List[Dict]:
    code = file_path.read_text(encoding="utf-8")
    out = []
    patterns = [
        re.compile(r"import\s+(\w+)\s+from\s*['\"]([^'\"]+)['\"]"),
        re.compile(r"import\s+(\w+)\s*,\s*\{[^}]+\}\s*from\s*['\"]([^'\"]+)['\"]"),
    ]
    for pattern in patterns:
        for m in pattern.finditer(code):
            var_name = m.group(1)
            module_name = m.group(2)
            if module_name not in allowed:
                continue
            prop_re = re.compile(r"" + var_name + r"\.(\w+)")
            for prop_match in prop_re.finditer(code):
                out.append({
                    "file": file_path,
                    "module": module_name,
                    "varName": var_name,
                    "prop": prop_match.group(1),
                })
    return out


def check_public_exports(repo_path: str) -> Dict:
    repo = Path(repo_path)
    ohos_root = resolve_ohos_root(repo)
    if not ohos_root:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_ohos"}}

    pkg_json = ohos_root / "package.json"
    pkg = json.loads(pkg_json.read_text(encoding="utf-8"))
    allowed = import_specifiers(pkg)
    entry = resolve_entry(ohos_root, pkg)

    if not entry.exists():
        return {
            "ok": False,
            "skipped": False,
            "errors": [f"Entry not found: {entry}"],
            "details": {"ohosRoot": str(ohos_root), "entry": str(entry)},
        }

    named_exports, default_methods = collect_exports(entry)
    apps = find_example_apps(ohos_root)
    if not apps:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_example_app"}}

    missing_named = []
    missing_default_props = []
    checked_named = []
    checked_default = []

    for app in apps:
        for block in collect_named_imports(app, allowed):
            for name in block["names"]:
                checked_named.append({
                    "file": str(block["file"]),
                    "module": block["module"],
                    "name": name,
                })
                if name not in named_exports:
                    missing_named.append({
                        "type": "named",
                        "name": name,
                        "module": block["module"],
                        "file": str(block["file"]),
                        "entry": str(entry.relative_to(ohos_root)),
                    })

        for access in collect_default_import_access(app, allowed):
            checked_default.append({
                "file": str(access["file"]),
                "module": access["module"],
                "varName": access["varName"],
                "prop": access["prop"],
            })
            if access["prop"] not in default_methods:
                suggestion = (
                    f"This is a named export, use: import {{ {access['prop']} }} from '{access['module']}'"
                    if access["prop"] in named_exports
                    else "This property is not in the default export object"
                )
                missing_default_props.append({
                    "type": "default_prop",
                    "prop": access["prop"],
                    "varName": access["varName"],
                    "module": access["module"],
                    "file": str(access["file"]),
                    "entry": str(entry.relative_to(ohos_root)),
                    "suggestion": suggestion,
                })

    if not checked_named and not checked_default:
        return {
            "ok": True,
            "skipped": True,
            "errors": [],
            "details": {"reason": "no_imports_from_package", "allowed": list(allowed)},
        }

    errors = []
    for x in missing_named:
        errors.append(
            f"{x['file']}: import {{ {x['name']} }} from '{x['module']}' not exported in {x['entry']} (will be undefined at runtime)"
        )
    for x in missing_default_props:
        errors.append(f"{x['file']}: {x['varName']}.{x['prop']}() failed - {x['suggestion']}")

    return {
        "ok": len(errors) == 0,
        "skipped": False,
        "errors": errors,
        "details": {
            "ohosRoot": str(ohos_root),
            "entry": str(entry.relative_to(ohos_root)),
            "exportedNamed": sorted(named_exports),
            "exportedDefaultMethods": sorted(default_methods),
            "checkedNamed": checked_named,
            "checkedDefault": checked_default,
            "missingNamed": missing_named,
            "missingDefaultProps": missing_default_props,
        },
    }


def check_jsx_brace_syntax(file_path: Path) -> List[Dict]:
    code = file_path.read_text(encoding="utf-8")
    errors = []
    
    double_brace_in_text = re.compile(
        r'<(Text|[\w]+)(?:\s[^>]*)?>[^<]*\{\{[^}]+\}\}[^<]*</(Text|[\w]+)>'
    )
    for m in double_brace_in_text.finditer(code):
        brace_content = re.search(r'\{\{([^}]+)\}\}', m.group(0))
        if brace_content:
            errors.append({
                "type": "double_brace_object",
                "file": str(file_path),
                "match": m.group(0)[:100],
                "content": brace_content.group(1).strip(),
                "line": _get_line_number(code, m.start()),
                "fix": f"Use template string: {{`...{brace_content.group(1).strip()}...`}}",
            })
    
    single_brace_expr = re.compile(
        r'<(Text|[\w]+)(?:\s[^>]*)?>[^{]*\{[^{`\'"}\w][^}]*\}[^<]*</(Text|[\w]+)>'
    )
    for m in single_brace_expr.finditer(code):
        brace_match = re.search(r'\{([^}]+)\}', m.group(0))
        if brace_match:
            content = brace_match.group(1).strip()
            if re.match(r'^\w+$', content):
                continue
            if re.match(r'^\w+\(', content):
                continue
            if content.startswith("`") or content.startswith("'") or content.startswith('"'):
                continue
            if content.startswith("$"):
                continue
            if re.match(r'^\w+\s*:\s*', content):
                errors.append({
                    "type": "single_brace_object_literal",
                    "file": str(file_path),
                    "match": m.group(0)[:100],
                    "content": content,
                    "line": _get_line_number(code, m.start()),
                    "fix": f"Use template string: {{`{content}`}}",
                })
    
    return errors


def _get_line_number(code: str, pos: int) -> int:
    return code[:pos].count("\n") + 1


def check_jsx_syntax_errors(repo_path: str) -> Dict:
    repo = Path(repo_path)
    ohos_root = resolve_ohos_root(repo)
    if not ohos_root:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_ohos"}}
    
    apps = find_example_apps(ohos_root)
    if not apps:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_example_app"}}
    
    all_errors = []
    checked_files = []
    
    for app in apps:
        jsx_errors = check_jsx_brace_syntax(app)
        checked_files.append(str(app))
        all_errors.extend(jsx_errors)
    
    error_msgs = []
    for e in all_errors:
        if e["type"] == "double_brace_object":
            error_msgs.append(
                f"{e['file']}:{e['line']}: Double brace {{ }} as Text child renders object -> "
                f"Error: Objects are not valid as a React child. Fix: {e['fix']}"
            )
        elif e["type"] == "single_brace_object_literal":
            error_msgs.append(
                f"{e['file']}:{e['line']}: Single brace with object literal '{e['content']}' -> "
                f"SyntaxError. Fix: {e['fix']}"
            )
    
    return {
        "ok": len(error_msgs) == 0,
        "skipped": False,
        "errors": error_msgs,
        "details": {
            "checkedFiles": checked_files,
            "jsxErrors": all_errors,
        },
    }


_FRAMEWORK_HEADERS = {
    "RNOH/PackageProvider.h",
    "RNOHPackagesFactory.h",
    "PackageProvider.h",
}


def check_cpp_package_registration(repo_path: str) -> Dict:
    repo = Path(repo_path)
    ohos_root = resolve_ohos_root(repo)
    if not ohos_root:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_ohos"}}

    cpp_file = ohos_root / "example" / "harmony" / "entry" / "src" / "main" / "cpp" / "PackageProvider.cpp"
    if not cpp_file.exists():
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_PackageProvider.cpp"}}

    code = cpp_file.read_text(encoding="utf-8", errors="ignore")

    include_re = re.compile(r'#include\s*"([^"]*Package\.h)"')
    includes = set()
    for m in include_re.finditer(code):
        header = m.group(1)
        basename = os.path.basename(header)
        if basename not in _FRAMEWORK_HEADERS and header not in _FRAMEWORK_HEADERS:
            includes.add(basename)

    make_shared_re = re.compile(r'make_shared<(\w*Package)>')
    instantiated = set()
    for m in make_shared_re.finditer(code):
        instantiated.add(m.group(1) + ".h")

    missing = includes - instantiated
    errors = []
    for h in sorted(missing):
        pkg_name = h.replace(".h", "")
        errors.append(
            f"PackageProvider.cpp: #include \"{h}\" but no std::make_shared<{pkg_name}>(ctx) in getPackages() "
            f"-> TurboModule not registered at C++ side -> white screen. "
            f"Fix: add packages.push_back(std::make_shared<{pkg_name}>(ctx));"
        )

    return {
        "ok": len(errors) == 0,
        "skipped": False,
        "errors": errors,
        "details": {
            "file": str(cpp_file),
            "includes": sorted(includes),
            "instantiated": sorted(instantiated),
            "missing": sorted(missing),
        },
    }


def _find_fabric_components(ohos_root: Path) -> List[Dict]:
    harmony_dir = ohos_root / "harmony"
    if not harmony_dir.exists():
        return []

    components = []
    for lib_dir in harmony_dir.iterdir():
        if not lib_dir.is_dir() or lib_dir.name == "entry":
            continue
        comps_dir = lib_dir / "src" / "main" / "ets" / "components"
        if not comps_dir.exists():
            continue
        for ets_file in sorted(comps_dir.glob("*.ets")):
            code = ets_file.read_text(encoding="utf-8", errors="ignore")
            struct_match = re.search(r"export\s+(?:struct|class)\s+(\w+)", code)
            if struct_match:
                struct_name = struct_match.group(1)
                components.append({
                    "struct_name": struct_name,
                    "component_name": _resolve_fabric_component_name(ets_file, struct_name, code),
                    "file": str(ets_file),
                })
    return components


def _find_balanced_brace_body(code: str, open_brace_index: int) -> str:
    """Return inner text of `{...}` starting at open_brace_index (the `{` char)."""
    if open_brace_index < 0 or open_brace_index >= len(code) or code[open_brace_index] != "{":
        return ""
    depth = 0
    for i in range(open_brace_index, len(code)):
        ch = code[i]
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return code[open_brace_index + 1:i]
    return ""


def _extract_builder_function_body(index_code: str) -> str:
    """Extract full buildCustomRNComponent body with balanced braces."""
    m = re.search(
        r"(?:@\w+\s*)?(?:export\s+)?function\s+buildCustomRNComponent\s*\(",
        index_code,
    )
    if not m:
        return ""
    brace_start = index_code.find("{", m.end())
    if brace_start < 0:
        return ""
    return _find_balanced_brace_body(index_code, brace_start)


def _enable_capi_architecture(index_code: str) -> bool:
    """Fabric registration checks apply only when C-API architecture is enabled."""
    m = re.search(r"enableCAPIArchitecture\s*:\s*(true|false)", index_code)
    if m:
        return m.group(1) == "true"
    return True


def _resolve_fabric_component_name(ets_path: Path, struct_name: str, code: str) -> str:
    """Resolve Fabric JS component name from ETS struct or generated Spec."""
    name_match = re.search(
        r"""(?:static\s+readonly\s+)?(?:NAME|name)\s*[:=]\s*['"]([\w]+)['"]""",
        code,
    )
    if name_match:
        return name_match.group(1)

    if re.search(r"=\s*Spec\.NAME\b", code):
        for spec_path in (
            ets_path.parent.parent / "generated" / "components" / f"{struct_name}.ts",
            ets_path.parent.parent / "generated" / "components" / f"{struct_name}.ets",
        ):
            if spec_path.exists():
                spec_code = spec_path.read_text(encoding="utf-8", errors="ignore")
                spec_name = re.search(
                    r"""export\s+const\s+NAME\s*=\s*['"]([\w]+)['"]""",
                    spec_code,
                )
                if spec_name:
                    return spec_name.group(1)

    return struct_name


def _extract_ark_ts_component_names(index_code: str) -> str:
    """Extract arkTsComponentNames array contents from Index.ets.

    Runtime value passed to RNApp wins:
    - arkTsComponentNames: arkTsComponentNames  -> resolve const definition
    - arkTsComponentNames: ['Foo']              -> inline literal (incl. empty [])
    - const-only (no RNApp wiring)              -> const definition fallback
    """
    const_match = re.search(
        r"const\s+arkTsComponentNames\s*(?::[^=]+)?=\s*\[([\s\S]*?)\]",
        index_code,
    )
    const_inner = const_match.group(1) if const_match else ""

    if re.search(r"arkTsComponentNames\s*:\s*arkTsComponentNames\b", index_code):
        return const_inner

    inline_match = re.search(
        r"arkTsComponentNames\s*:\s*\[([\s\S]*?)\]",
        index_code,
    )
    if inline_match:
        return inline_match.group(1)

    return const_inner


def _parse_ark_ts_name_entries(ark_names_str: str) -> Tuple[Set[str], Set[str]]:
    """Return (string_literals, struct_names referenced via .NAME)."""
    literals = set(re.findall(r"""['"]([\w]+)['"]""", ark_names_str))
    name_refs = set(re.findall(r"\b(\w+)\.NAME\b", ark_names_str))
    return literals, name_refs


def _component_in_ark_names(comp_name: str, struct_name: str, ark_names_str: str) -> bool:
    inner = ark_names_str.strip()
    if not inner:
        return False
    literals, name_refs = _parse_ark_ts_name_entries(ark_names_str)
    if comp_name in literals:
        return True
    if struct_name in name_refs:
        return True
    # Legacy substring checks for minimally formatted arrays
    return (
        f"'{comp_name}'" in ark_names_str
        or f'"{comp_name}"' in ark_names_str
        or f"{struct_name}.NAME" in ark_names_str
    )


def _component_in_builder_body(builder_body: str, struct_name: str, comp_name: str) -> bool:
    if not builder_body.strip():
        return False
    if struct_name in builder_body:
        return True
    if comp_name in builder_body:
        return True
    if re.search(rf"componentName\s*===\s*{re.escape(struct_name)}\.NAME\b", builder_body):
        return True
    if re.search(rf"componentName\s*===\s*['\"]{re.escape(comp_name)}['\"]", builder_body):
        return True
    return False


def check_fabric_component_index(repo_path: str) -> Dict:
    repo = Path(repo_path)
    ohos_root = resolve_ohos_root(repo)
    if not ohos_root:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_ohos"}}

    components = _find_fabric_components(ohos_root)
    if not components:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_fabric_components"}}

    index_path = ohos_root / "example" / "harmony" / "entry" / "src" / "main" / "ets" / "pages" / "Index.ets"
    if not index_path.exists():
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_Index.ets"}}

    index_code = index_path.read_text(encoding="utf-8", errors="ignore")

    if not _enable_capi_architecture(index_code):
        return {
            "ok": True,
            "skipped": True,
            "errors": [],
            "details": {"reason": "capi_disabled"},
        }

    errors = []

    ark_names_str = _extract_ark_ts_component_names(index_code)
    builder_body = _extract_builder_function_body(index_code)

    for comp in components:
        struct_name = comp["struct_name"]
        comp_name = comp["component_name"]

        in_ark = _component_in_ark_names(comp_name, struct_name, ark_names_str)

        if not in_ark:
            errors.append(
                f"Index.ets: Fabric component '{comp_name}' (struct {struct_name}) not in arkTsComponentNames "
                f"-> component will not render (enableCAPIArchitecture: true requires explicit registration). "
                f"Fix: add '{comp_name}' or {struct_name}.NAME to arkTsComponentNames array"
            )

        if not _component_in_builder_body(builder_body, struct_name, comp_name):
            errors.append(
                f"Index.ets: Fabric component '{struct_name}' not in buildCustomRNComponent builder body "
                f"-> component has no ArkTS view to render. "
                f"Fix: add if (ctx.componentName === {struct_name}.NAME) {{ {struct_name}({{ ctx: ctx.rnComponentContext, tag: ctx.tag }}) }}"
            )

    return {
        "ok": len(errors) == 0,
        "skipped": False,
        "errors": errors,
        "details": {
            "components": components,
            "arkTsComponentNames": ark_names_str.strip(),
            "builderBodyEmpty": len(builder_body.strip()) == 0,
        },
    }


def check_fabric_builder_stack(repo_path: str) -> Dict:
    repo = Path(repo_path)
    ohos_root = resolve_ohos_root(repo)
    if not ohos_root:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_ohos"}}

    index_path = ohos_root / "example" / "harmony" / "entry" / "src" / "main" / "ets" / "pages" / "Index.ets"
    if not index_path.exists():
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_Index.ets"}}

    code = index_path.read_text(encoding="utf-8", errors="ignore")

    if not _enable_capi_architecture(code):
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "capi_disabled"}}

    builder_body = _extract_builder_function_body(code)
    if not builder_body.strip():
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_builder_function"}}

    body = builder_body.strip()
    if "ctx.componentName" not in body:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "builder_empty"}}

    if not re.search(r"\bStack\s*\(\s*\)", body):
        return {
            "ok": False,
            "skipped": False,
            "errors": [
                "Index.ets: buildCustomRNComponent has component registration but no Stack() root container "
                "-> Fabric components compile but DO NOT render (no error, silent failure). "
                "Fix: wrap all if-branches in Stack() { ... }.position({ x: 0, y: 0 })"
            ],
            "details": {"builderBody": body[:200]},
        }

    return {"ok": True, "skipped": False, "errors": [], "details": {"hasStack": True}}


_RN_FRAMEWORK_REEXPORT = re.compile(
    r"get\s+ViewPropTypes\(\)\{return\s+r\(d\[\d+\]\)\}"
)

_DEPRECATED_PATTERNS = [
    (re.compile(r"\bViewPropTypes\b"), "ViewPropTypes", "error",
     "RN 0.72+ removed ViewPropTypes -> TypeError at module load -> white screen"),
    (re.compile(r"""PropTypes\}\s*from\s*['"]react['"]"""), "PropTypes from 'react'", "error",
     "React 16+ removed PropTypes export -> TypeError at module load -> white screen"),
    (re.compile(r"""\bPropTypes\s*}\s*from\s*"react\""""), "PropTypes from \"react\"", "error",
     "React 16+ removed PropTypes export (minified) -> white screen"),
    (re.compile(r"\bReact\.createClass\b"), "React.createClass", "error",
     "React 16+ removed createClass -> TypeError -> white screen"),
]


def check_bundle_deprecated_api(repo_path: str) -> Dict:
    repo = Path(repo_path)
    ohos_root = resolve_ohos_root(repo)
    if not ohos_root:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_ohos"}}

    bundle_path = (
        ohos_root / "example" / "harmony" / "entry" / "src" / "main" / "resources" / "rawfile" / "bundle.harmony.js"
    )
    if not bundle_path.exists():
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_bundle"}}

    try:
        content = bundle_path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "read_error"}}

    framework_reexport_count = len(_RN_FRAMEWORK_REEXPORT.findall(content))

    errors = []
    findings = []
    for pattern, name, severity, desc in _DEPRECATED_PATTERNS:
        matches = pattern.findall(content)
        if matches:
            count = len(matches)
            if name == "ViewPropTypes" and framework_reexport_count > 0:
                count -= framework_reexport_count
            if count <= 0:
                continue
            findings.append({"name": name, "count": count, "severity": severity})
            if severity == "error":
                errors.append(
                    f"bundle.harmony.js: found {count}x '{name}' -> {desc}. "
                    f"Fix: patch ohos/src/ to remove deprecated API, then rebuild: "
                    f"cd ohos && npm pack && cd example && rm -rf node_modules && npm install --legacy-peer-deps && npm run dev"
                )

    return {
        "ok": len(errors) == 0,
        "skipped": False,
        "errors": errors,
        "details": {"bundlePath": str(bundle_path), "findings": findings},
    }


def check_appkey_consistency(repo_path: str) -> Dict:
    repo = Path(repo_path)
    ohos_root = resolve_ohos_root(repo)
    if not ohos_root:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_ohos"}}

    app_json_path = ohos_root / "example" / "app.json"
    if not app_json_path.exists():
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_app.json"}}

    index_path = ohos_root / "example" / "harmony" / "entry" / "src" / "main" / "ets" / "pages" / "Index.ets"
    if not index_path.exists():
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_Index.ets"}}

    try:
        app_data = json.loads(app_json_path.read_text(encoding="utf-8"))
        app_name = app_data.get("name", "")
    except Exception:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "app.json_parse_error"}}

    index_code = index_path.read_text(encoding="utf-8", errors="ignore")
    appkey_match = re.search(r"""appKey\s*:\s*['"]([^'"]+)['"]""", index_code)
    if not appkey_match:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_appKey_in_Index"}}

    index_appkey = appkey_match.group(1)

    if app_name != index_appkey:
        return {
            "ok": False,
            "skipped": False,
            "errors": [
                f"appKey mismatch: app.json name=\"{app_name}\" vs Index.ets appKey=\"{index_appkey}\" "
                f"-> AppRegistry.registerComponent uses app.json name, but RNOH renders appKey surface -> white screen. "
                f"Fix: set Index.ets appKey to \"{app_name}\" or align app.json name"
            ],
            "details": {"appJsonName": app_name, "indexAppKey": index_appkey},
        }

    return {
        "ok": True,
        "skipped": False,
        "errors": [],
        "details": {"appJsonName": app_name, "indexAppKey": index_appkey},
    }


# 来源：docs/0604_rn_faq 调试记录（F3/F4 类——example 跑起来就崩 / 看不出功能）
_BANNED_API_PATTERNS = [
    (re.compile(r"\bAlert\.prompt\s*\("),
     "Alert.prompt 是 iOS-only API，鸿蒙/Android 运行时为 undefined（崩溃）。"
     "改用 Alert.alert；需用户输入用 Modal + TextInput。[failure-lessons testing-api-003]"),
]
_BANNED_URL_SUBSTRINGS = [
    ("via.placeholder.com",
     "占位图服务在鸿蒙 WebView 不可达（灰色占位）。图片改用 https://picsum.photos/{w}/{h}。[testing-api-004]"),
    ("placeholder.com",
     "占位图服务在鸿蒙 WebView 不可达。改用 picsum.photos / MDN 资源。[testing-api-004]"),
]
# 形如 const [source, setSource] = useState('')，source/uri/url/path/src 关键输入被写空
_EMPTY_SOURCE_RE = re.compile(
    r"\[\s*(source|uri|url|path|src)\b[^\]]*\]\s*=\s*useState\(\s*['\"]\s*['\"]\s*\)",
    re.IGNORECASE,
)

# 从裸 'react-native' 具名导入但 react-native 核心并不导出的符号 -> 运行时 undefined。
# 典型：访问 Colors.lighter 抛 "Cannot read property 'lighter' of undefined" -> 白屏。
# 来源：docs/0604_rn_faq —— react_native_viewpager example 白屏根因。
_RN_NOT_EXPORTED = {
    # react-native/Libraries/NewAppScreen（模板脚手架里的，主入口未导出）
    "Colors": "在 react-native/Libraries/NewAppScreen，不是 'react-native' 的导出",
    "Header": "在 react-native/Libraries/NewAppScreen，不是 'react-native' 的导出",
    "LearnMoreLinks": "在 react-native/Libraries/NewAppScreen，不是 'react-native' 的导出",
    "DebugInstructions": "在 react-native/Libraries/NewAppScreen，不是 'react-native' 的导出",
    "ReloadInstructions": "在 react-native/Libraries/NewAppScreen，不是 'react-native' 的导出",
    # RN 0.72+/React 16+ 已移除的 PropTypes（import 即 undefined）
    "ColorPropType": "RN 0.72+ 已移除，改用 PropTypes.string",
    "ViewPropTypes": "RN 0.72+ 已移除，改用 PropTypes.oneOfType([PropTypes.object, PropTypes.array])",
    "EdgeInsetsPropType": "RN 0.72+ 已移除，改用 PropTypes.object",
    "PointPropType": "RN 0.72+ 已移除，改用 PropTypes.object",
}
# 匹配 `import {...} from 'react-native'` 以及 `import RN, {...} from 'react-native'`
_RN_NAMED_IMPORT_RE = re.compile(
    r"import\s+(?:\w+\s*,\s*)?\{\s*([^}]+?)\s*\}\s*from\s*['\"]react-native['\"]"
)


def _check_rn_nonexported_imports(code: str, rel: str) -> List[str]:
    """扫描从 'react-native' 具名导入的非导出符号（硬错误）。"""
    errs: List[str] = []
    for m in _RN_NAMED_IMPORT_RE.finditer(code):
        for name in split_specifiers(m.group(1)):
            if name in _RN_NOT_EXPORTED:
                errs.append(
                    f"{rel}: `import {{ {name} }} from 'react-native'` —— {name} {_RN_NOT_EXPORTED[name]}；"
                    f"运行时为 undefined，访问其属性即 `Cannot read property 'X' of undefined` -> 白屏。"
                    f"改用字面量或正确来源。[failure-lessons testing-example-002]"
                )
    return errs


def check_example_quality(repo_path: str) -> Dict:
    """example 可运行性/有效性：禁 iOS-only API、禁不可达 URL（硬错误）；空 source、lint 脚本（仅警告）。"""
    repo = Path(repo_path)
    ohos_root = resolve_ohos_root(repo)
    if not ohos_root:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_ohos"}}

    apps = find_example_apps(ohos_root)
    if not apps:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_example_app"}}

    errors: List[str] = []
    warnings: List[str] = []
    for app in apps:
        code = app.read_text(encoding="utf-8", errors="ignore")
        rel = app.name
        for pat, msg in _BANNED_API_PATTERNS:
            if pat.search(code):
                errors.append(f"{rel}: {msg}")
        for sub, msg in _BANNED_URL_SUBSTRINGS:
            if sub in code:
                errors.append(f"{rel}: 含不可达示例 URL '{sub}' - {msg}")
                break
        errors.extend(_check_rn_nonexported_imports(code, rel))
        if _EMPTY_SOURCE_RE.search(code):
            warnings.append(
                f"{rel}: 关键输入(source/uri/...)被 useState('') 写空 —— 若是 PDF/图片/视频/文件类组件，"
                f"真机只会看到数字变化、看不出功能。请喂真实样本（rawfile→沙箱拷贝→真实绝对路径）。"
                f"[failure-lessons testing-example-001]"
            )

    # lint 脚本会被 monorepo 根 eslint flat config 干扰，导致 build hap 中断
    ex_pkg = ohos_root / "example" / "package.json"
    if ex_pkg.exists():
        try:
            scripts = json.loads(ex_pkg.read_text(encoding="utf-8")).get("scripts", {})
            if "lint" in scripts:
                warnings.append(
                    "example/package.json 含 lint 脚本，可能被 monorepo 根 eslint flat config 干扰中止 build。"
                    "建议移除。[failure-lessons testing-config-008]"
                )
        except Exception:
            pass

    for w in warnings:
        log(f"[warn] {w}")

    return {"ok": len(errors) == 0, "skipped": False, "errors": errors,
            "details": {"warnings": warnings, "apps": [a.name for a in apps]}}


_AUTOLINK_TRIO = (
    ("ets/RNOHPackagesFactory.ets", "entry/src/main/ets/RNOHPackagesFactory.ets"),
    ("cpp/RNOHPackagesFactory.h", "entry/src/main/cpp/RNOHPackagesFactory.h"),
    ("cpp/autolinking.cmake", "entry/src/main/cpp/autolinking.cmake"),
)


def check_rn_packages_factory_autolink(repo_path: str) -> Dict:
    """RNPackagesFactory must spread createRNOHPackagesAutolinking; autolink trio must exist."""
    repo = Path(repo_path)
    ohos_root = resolve_ohos_root(repo)
    if not ohos_root:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_ohos"}}

    entry_dir = ohos_root / "example" / "harmony" / "entry" / "src" / "main"
    if not entry_dir.exists():
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_entry"}}

    errors: List[str] = []

    missing = [label for label, rel in _AUTOLINK_TRIO if not (ohos_root / "example" / "harmony" / rel).exists()]
    if missing:
        errors.append(
            f"autolink 三件套缺失 ({', '.join(missing)}) — example 模板应自带占位 stub，"
            f"build hap 时 hvigor 覆盖；勿删除。[failure-lessons testing-config-009]"
        )

    factory_path = entry_dir / "ets" / "RNPackagesFactory.ets"
    if factory_path.exists():
        code = factory_path.read_text(encoding="utf-8", errors="ignore")
        if not re.search(r"\.\.\.\s*createRNOHPackagesAutolinking\s*\(\s*ctx\s*\)", code):
            errors.append(
                "RNPackagesFactory.ets 缺少 ...createRNOHPackagesAutolinking(ctx) — "
                "禁止因 prepare-only 后 stub 为空而删除 spread；HAR autolink 不能替代此注册。"
                "[failure-lessons testing-config-009]"
            )
        if "RNOHPackagesFactory" not in code:
            errors.append(
                "RNPackagesFactory.ets 未 import ./RNOHPackagesFactory — "
                "须保留 createRNOHPackagesAutolinking 导入。[failure-lessons testing-config-009]"
            )

    return {
        "ok": len(errors) == 0,
        "skipped": False,
        "errors": errors,
        "details": {"file": str(factory_path) if factory_path.exists() else None},
    }


def _parse_entry_oh_package_deps(entry_oh_package_path: Path) -> Dict[str, str]:
    """Parse entry/oh-package.json5 dependencies -> {ohos_name: file_ref}."""
    if not entry_oh_package_path.exists():
        return {}
    body = entry_oh_package_path.read_text(encoding="utf-8", errors="ignore")
    return {m.group(1): m.group(2) for m in _OH_PKG_DEP_RE.finditer(body)}


def _resolve_entry_file_ref(entry_oh_package_path: Path, file_ref: str) -> Path:
    raw = file_ref.strip()
    if os.path.isabs(raw):
        return Path(raw)
    return (entry_oh_package_path.parent / raw).resolve()


def _autolink_artifacts_generated(rnoh_ets: str, autolinking_cmake: str) -> bool:
    """Whether hvigor autolink has produced non-stub artifacts."""
    if "generated by RNOH autolinking" in autolinking_cmake:
        m = re.search(r"set\s*\(\s*AUTOLINKED_LIBRARIES\s*(.*?)\)", autolinking_cmake, re.DOTALL)
        if m and m.group(1).strip():
            return True
        if re.search(r'add_subdirectory\s*\(\s*"\$\{OH_MODULES?_DIR\}/', autolinking_cmake):
            return True
    if "generated by RNOH autolinking" in rnoh_ets:
        m = re.search(r"return\s*\[(.*?)\]", rnoh_ets, re.DOTALL)
        if m and m.group(1).strip():
            return True
    return False


def _collect_expected_dep_plugins(example_real: Path) -> List[Dict]:
    from lib.generate_example_full import _collect_all_dep_plugins

    return _collect_all_dep_plugins(str(example_real))


def check_entry_plugin_registration(repo_path: str) -> Dict:
    """entry/oh-package HAR 完整性 + autolink/手动注册一致性（与 register_dep_plugins 同规则）。"""
    repo = Path(repo_path)
    ohos_root = resolve_ohos_root(repo)
    if not ohos_root:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_ohos"}}

    example_real = ohos_root / "example"
    example_pkg = example_real / "package.json"
    entry_oh_package = example_real / "harmony" / "entry" / "oh-package.json5"
    node_modules = example_real / "node_modules"

    if not example_pkg.exists() or not entry_oh_package.exists():
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_example"}}

    if not node_modules.is_dir():
        return {
            "ok": True,
            "skipped": True,
            "errors": [],
            "details": {"reason": "no_node_modules_run_prepare_only"},
        }

    try:
        from lib.generate_example_full import find_package_classes, find_rn_package_classes
    except ImportError as exc:
        return {
            "ok": True,
            "skipped": True,
            "errors": [],
            "details": {"reason": f"import_generate_example_full_failed: {exc}"},
        }

    dep_plugins = _collect_expected_dep_plugins(example_real)
    if not dep_plugins:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_harmony_dep_plugins"}}

    actual_deps = _parse_entry_oh_package_deps(entry_oh_package)
    entry_main = example_real / "harmony" / "entry" / "src" / "main"
    cmake_lists = entry_main / "cpp" / "CMakeLists.txt"
    package_provider = entry_main / "cpp" / "PackageProvider.cpp"
    rn_packages_factory = entry_main / "ets" / "RNPackagesFactory.ets"
    rnoh_packages_factory_ets = entry_main / "ets" / "RNOHPackagesFactory.ets"
    rnoh_packages_factory_h = entry_main / "cpp" / "RNOHPackagesFactory.h"
    autolinking_cmake = entry_main / "cpp" / "autolinking.cmake"

    cmake_text = cmake_lists.read_text(encoding="utf-8", errors="ignore") if cmake_lists.exists() else ""
    package_provider_text = (
        package_provider.read_text(encoding="utf-8", errors="ignore") if package_provider.exists() else ""
    )
    rn_packages_text = (
        rn_packages_factory.read_text(encoding="utf-8", errors="ignore")
        if rn_packages_factory.exists()
        else ""
    )
    rnoh_ets_text = (
        rnoh_packages_factory_ets.read_text(encoding="utf-8", errors="ignore")
        if rnoh_packages_factory_ets.exists()
        else ""
    )
    rnoh_h_text = (
        rnoh_packages_factory_h.read_text(encoding="utf-8", errors="ignore")
        if rnoh_packages_factory_h.exists()
        else ""
    )
    autolinking_text = (
        autolinking_cmake.read_text(encoding="utf-8", errors="ignore") if autolinking_cmake.exists() else ""
    )

    autolink_generated = _autolink_artifacts_generated(rnoh_ets_text, autolinking_text)
    manual_make_shared = set(_MAKE_SHARED_PKG_RE.findall(package_provider_text))
    autolink_make_shared = set(_MAKE_SHARED_PKG_RE.findall(rnoh_h_text))
    manual_ets_packages = set(_NEW_ETS_PKG_RE.findall(rn_packages_text))
    autolink_ets_packages = set(_NEW_ETS_PKG_RE.findall(rnoh_ets_text))

    errors: List[str] = []
    warnings: List[str] = []
    checked: List[Dict] = []

    for dep in dep_plugins:
        ohos_name = dep["ohos_name"]
        npm_name = dep["npm_name"]
        short_name = dep["short_name"]
        har_path = dep["har_path"]
        is_autolink = bool(dep.get("autolink"))
        cpp_dir = dep.get("cpp_dir")
        cmake_target = dep.get("cmake_target_name", short_name)
        mode = "autolink" if is_autolink else "manual"

        ets_classes = find_rn_package_classes(str(example_real), npm_name, short_name)
        cpp_classes = find_package_classes(str(example_real), npm_name, short_name) if cpp_dir else []
        ets_names = [c["class_name"] for c in ets_classes]
        cpp_names = [c["class_name"] for c in cpp_classes]

        item = {
            "ohos_name": ohos_name,
            "npm_name": npm_name,
            "mode": mode,
            "ets_packages": ets_names,
            "cpp_packages": cpp_names,
        }
        checked.append(item)

        # --- HAR in entry/oh-package.json5 ---
        if ohos_name not in actual_deps:
            errors.append(
                f"entry/oh-package.json5: 缺少 HAR 依赖 \"{ohos_name}\" "
                f"(来自 example/package.json → {npm_name}/harmony/*.har)。"
                f"修复: 添加 \"{ohos_name}\": \"file:{har_path}\"，或重跑 rn.py build hap --prepare-only"
            )
            continue

        resolved_har = _resolve_entry_file_ref(entry_oh_package, actual_deps[ohos_name])
        if not resolved_har.is_file():
            errors.append(
                f"entry/oh-package.json5: \"{ohos_name}\" 的 file: 路径不存在: {actual_deps[ohos_name]} "
                f"(解析为 {resolved_har})。修复: 核对 node_modules 目录名是否为 npm 依赖 key ({npm_name})"
            )
        elif actual_deps[ohos_name] != har_path:
            warnings.append(
                f"entry/oh-package.json5: \"{ohos_name}\" HAR 路径与期望不一致 "
                f"(实际 {actual_deps[ohos_name]}，期望 {har_path})"
            )

        # --- autolink vs manual registration ---
        if is_autolink:
            if not autolink_generated:
                errors.append(
                    f"{ohos_name} [{mode}]: autolink 产物仍为模板 stub "
                    f"(RNOHPackagesFactory.ets / autolinking.cmake 未生成)。"
                    f"请完整执行 rn.py build hap（hvigor autolink 依赖 entry/oh-package HAR）"
                )

            if ohos_name not in rnoh_ets_text and npm_name not in rnoh_ets_text:
                errors.append(
                    f"{ohos_name} [{mode}]: RNOHPackagesFactory.ets 未 import 该包 "
                    f"(npm={npm_name})。autolink 插件应由 hvigor 写入 RNOHPackagesFactory.ets"
                )

            # 检查 package 的 index.ets 别名映射：如果 autolink 用别名（如 WebViewPackage）
            # 而 find_rn_package_classes 找到实际类名（如 RNCWebViewPackage），需要识别别名关系。
            # 扫描 package 的 ETS 入口文件，提取 import 中的 as 别名和 export 映射。
            package_ets_entry = os.path.join(
                str(example_real), 'node_modules', npm_name,
                'harmony', short_name, 'index.ets'
            )
            if not os.path.isfile(package_ets_entry):
                # fallback: root index.ets
                package_ets_entry = os.path.join(
                    str(example_real), 'node_modules', npm_name, 'index.ets'
                )
            alias_to_class: dict[str, str] = {}
            if os.path.isfile(package_ets_entry):
                entry_content = Path(package_ets_entry).read_text(
                    encoding='utf-8', errors='ignore'
                )
                # 匹配 import 中的 as 别名: import { ActualClass as AliasedName } from '...'
                for m in re.finditer(
                    r'import\s+\{[^}]*?(\w+)\s+as\s+(\w+)[^}]*\}\s+from', entry_content
                ):
                    alias_to_class[m.group(2)] = m.group(1)
                # 匹配: export { ActualClass as ExportedName }
                for m in re.finditer(
                    r'export\s+\{\s*(\w+)\s+as\s+(\w+)\s*\}', entry_content
                ):
                    alias_to_class[m.group(2)] = m.group(1)

            # 将 autolink_ets_packages 中的别名扩展为实际类名
            expanded_autolink: set[str] = set(autolink_ets_packages)
            for alias_name, actual_class in alias_to_class.items():
                if alias_name in autolink_ets_packages:
                    expanded_autolink.add(actual_class)
                if actual_class in autolink_ets_packages:
                    expanded_autolink.add(alias_name)

            for cls in ets_names:
                if cls not in expanded_autolink:
                    errors.append(
                        f"{ohos_name} [{mode}]: ETS Package \"{cls}\" 未在 RNOHPackagesFactory.ets 注册 "
                        f"(缺少 new {cls}(ctx))。autolink 插件不应只在 RNPackagesFactory.ets 手动注册"
                    )
                if cls in manual_ets_packages:
                    warnings.append(
                        f"{ohos_name} [{mode}]: \"{cls}\" 同时出现在 RNPackagesFactory.ets 手动注册中 "
                        f"(autolink 插件通常只需 RNOHPackagesFactory.ets)"
                    )

            if cpp_dir and cpp_names:
                if not autolink_generated:
                    pass
                elif (
                    ohos_name not in autolinking_text
                    and cmake_target not in autolinking_text
                    and short_name not in autolinking_text
                ):
                    errors.append(
                        f"{ohos_name} [{mode}]: C++ 库未出现在 autolinking.cmake "
                        f"(期望 ohos_name/cmake_target/short_name 之一: {ohos_name}, {cmake_target}, {short_name})"
                    )
                for cls in cpp_names:
                    if cls not in autolink_make_shared:
                        errors.append(
                            f"{ohos_name} [{mode}]: C++ Package \"{cls}\" 未在 RNOHPackagesFactory.h 注册 "
                            f"(缺少 make_shared<{cls}>(ctx))"
                        )

            manual_cmake_marker = f'add_subdirectory("${{OH_MODULE_DIR}}/{ohos_name}/src/main/cpp"'
            if manual_cmake_marker in cmake_text:
                warnings.append(
                    f"{ohos_name} [{mode}]: CMakeLists.txt 仍含手动 add_subdirectory "
                    f"(autolink 插件应由 autolinking.cmake 链接，可清理重复手动行)"
                )
        else:
            for cls in ets_names:
                if cls not in manual_ets_packages:
                    errors.append(
                        f"{ohos_name} [{mode}]: ETS Package \"{cls}\" 未在 RNPackagesFactory.ets 手动注册 "
                        f"(缺少 new {cls}(ctx))。非 autolink 插件须在 RNPackagesFactory.ets 注册"
                    )

            if cpp_dir and cpp_names:
                manual_cmake_marker = f'add_subdirectory("${{OH_MODULE_DIR}}/{ohos_name}/src/main/cpp"'
                if manual_cmake_marker not in cmake_text:
                    errors.append(
                        f"{ohos_name} [{mode}]: CMakeLists.txt 缺少手动 add_subdirectory "
                        f"({ohos_name}/src/main/cpp)。非 autolink C++ 插件须手动注册 CMake"
                    )
                for cls in cpp_names:
                    if cls not in manual_make_shared:
                        errors.append(
                            f"{ohos_name} [{mode}]: C++ Package \"{cls}\" 未在 PackageProvider.cpp 手动注册 "
                            f"(缺少 std::make_shared<{cls}>(ctx))。非 autolink C++ 插件须手动注册"
                        )

    for w in warnings:
        log(f"[warn] {w}")

    return {
        "ok": len(errors) == 0,
        "skipped": False,
        "errors": errors,
        "details": {
            "checked_plugins": checked,
            "autolink_generated": autolink_generated,
            "warnings": warnings,
        },
    }


def check_hap_generation(repo_path: str) -> Dict:
    """检查 HAP 产物是否存在且比 bundle 更新
    
    Returns:
        检查结果字典
    """
    repo = Path(repo_path)
    ohos_root = resolve_ohos_root(repo)
    if not ohos_root:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_ohos"}}
    
    entry_dir = ohos_root / "example" / "harmony" / "entry"
    if not entry_dir.exists():
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_entry"}}
    
    hap_dir = entry_dir / "build" / "default" / "outputs" / "default"
    if not hap_dir.exists():
        return {
            "ok": False,
            "skipped": False,
            "errors": [f"HAP 目录不存在 (请执行 `rn.py build hap`)"],
            "details": {"hap_dir": str(hap_dir)},
        }
    
    # 查找 HAP 文件（支持 signed 和 unsigned）
    hap_files = list(hap_dir.glob("entry-default*.hap"))
    if not hap_files:
        return {
            "ok": False,
            "skipped": False,
            "errors": [f"HAP 文件不存在 (未执行 `rn.py build hap` 或编译失败)"],
            "details": {"hap_dir": str(hap_dir)},
        }
    
    # 检查 HAP 是否比 bundle.harmony.js 更新
    bundle_path = entry_dir / "src" / "main" / "resources" / "rawfile" / "bundle.harmony.js"
    if bundle_path.exists():
        hap_mtime = max(h.stat().st_mtime for h in hap_files)
        bundle_mtime = bundle_path.stat().st_mtime
        
        if bundle_mtime > hap_mtime:
            return {
                "ok": False,
                "skipped": False,
                "errors": [f"HAP 过期: bundle 比 HAP 新 (请重新 `rn.py build hap`)"],
                "details": {
                    "hap_files": [h.name for h in hap_files],
                    "bundle_path": str(bundle_path),
                },
            }
    
    return {
        "ok": True,
        "skipped": False,
        "errors": [],
        "details": {
            "hap_files": [h.name for h in hap_files],
            "hap_dir": str(hap_dir),
        },
    }


_ADAPTED_DB_REL = ("rn-adapted-library", "references", "adapted-libraries.json")
_VERMAP_DB_REL = ("rn-adapted-library", "references", "dep-version-map.json")

# 仅扫描“鸿蒙运行时一定会执行”的源码：平台覆盖文件 + ohos 适配 JS 层。
# 不扫 *.android.* / *.ios.* / 通用 src，避免把 Android/iOS 专属依赖误报为缺注册。
_IMPORT_SPEC_RE = re.compile(
    r"""(?:\bfrom\s*|\brequire\s*\(\s*|\bimport\s*\(\s*|\bimport\s+)['"]([^'"]+)['"]"""
)


def _short_pkg_name(name: str) -> str:
    """取包名最后一段，用于跨 scope（@react-native-oh-tpl vs @react-native-ohos）等价比较。"""
    return name.rsplit("/", 1)[-1].strip().lower()


def _load_native_lib_db() -> Optional[Dict[str, Dict]]:
    """
    合并 adapted-libraries.json + dep-version-map.json，构建“原生三方库”索引。
    返回 {original_name: {"accepts": set(全部已知 OHOS 包名+原名), "shorts": set(对应短名)}}。
    两库 scope 不同（@react-native-oh-tpl vs @react-native-ohos）是设计如此，这里按短名做 scope 无关等价。
    """
    base = Path(__file__).resolve().parents[2]
    adapted_path = base.joinpath(*_ADAPTED_DB_REL)
    vermap_path = base.joinpath(*_VERMAP_DB_REL)
    if not adapted_path.exists() and not vermap_path.exists():
        return None

    db: Dict[str, Dict] = {}

    def _ensure(orig: str) -> Dict:
        entry = db.setdefault(orig, {"accepts": set(), "shorts": set()})
        entry["accepts"].add(orig)
        entry["shorts"].add(_short_pkg_name(orig))
        return entry

    try:
        adapted = json.loads(adapted_path.read_text(encoding="utf-8")) if adapted_path.exists() else []
        for e in adapted:
            if not isinstance(e, dict):
                continue
            orig = e.get("original_name")
            ohos = e.get("ohos_package_name")
            # 只收“已适配且有原生 OHOS 包”的库；js_only / 未适配不需注册原生模块
            if not orig or e.get("status") != "adapted" or not ohos:
                continue
            entry = _ensure(orig)
            entry["accepts"].add(ohos)
            entry["shorts"].add(_short_pkg_name(ohos))
    except (ValueError, OSError):
        pass

    try:
        vermap = json.loads(vermap_path.read_text(encoding="utf-8")) if vermap_path.exists() else {}
        for orig, vers in (vermap.get("packages") or {}).items():
            entry = _ensure(orig)
            if not isinstance(vers, dict):
                continue
            for info in vers.values():
                if isinstance(info, dict) and info.get("ohos_package"):
                    entry["accepts"].add(info["ohos_package"])
                    entry["shorts"].add(_short_pkg_name(info["ohos_package"]))
    except (ValueError, OSError):
        pass

    return db or None


def _collect_oh_package_dep_keys(oh_pkg_path: Path) -> Set[str]:
    """从 entry/oh-package.json5 的 dependencies 块提取所有依赖键名（json5，宽松解析）。"""
    if not oh_pkg_path.exists():
        return set()
    text = oh_pkg_path.read_text(encoding="utf-8", errors="ignore")
    m = re.search(r'["\']?dependencies["\']?\s*:\s*\{', text)
    if not m:
        return set()
    body = _find_balanced_brace_body(text, text.find("{", m.end() - 1))
    return set(re.findall(r'["\']([^"\']+)["\']\s*:', body))


def _self_specifiers(ohos_root: Path) -> Set[str]:
    """库自身的包名/别名，避免把库自己的 import 当成需注册的外部依赖。"""
    out: Set[str] = set()
    pkg = ohos_root / "package.json"
    if pkg.exists():
        try:
            data = json.loads(pkg.read_text(encoding="utf-8", errors="ignore"))
            out |= import_specifiers(data)
        except ValueError:
            pass
    # 源仓根 package.json（原始库名）
    src_pkg = ohos_root.parent / "package.json"
    if src_pkg.exists():
        try:
            data = json.loads(src_pkg.read_text(encoding="utf-8", errors="ignore"))
            if data.get("name"):
                out.add(data["name"])
        except ValueError:
            pass
    return out


def _iter_harmony_runtime_sources(repo_root: Path, ohos_root: Path):
    """产出鸿蒙运行时会执行的 JS/TS 源码文件（平台覆盖文件 + ohos 适配 JS 层）。"""
    exts = (".js", ".jsx", ".ts", ".tsx")
    skip_dirs = {"node_modules", "example", "__tests__", ".git", "build", "dist", ".claude", ".opencode"}

    def _walk(base: Path, harmony_only: bool):
        if not base.exists():
            return
        try:
            for path in base.rglob("*"):
                if not path.is_file() or path.suffix not in exts:
                    continue
                parts = set(path.parts)
                if parts & skip_dirs:
                    continue
                name = path.name
                if ".android." in name or ".ios." in name:
                    continue
                if harmony_only and ".harmony." not in name:
                    continue
                yield path
        except FileNotFoundError:
            pass

    # 1) 全仓平台覆盖文件 *.harmony.*（库的鸿蒙适配实现，最易引入未声明依赖）
    yield from _walk(repo_root, harmony_only=True)
    # 2) ohos 适配 JS 层（ohos/src、ohos/harmony 下的 JS/TS，均在鸿蒙运行）
    seen = set()
    for sub in ("src", "harmony"):
        for path in _walk(ohos_root / sub, harmony_only=False):
            if path not in seen:
                seen.add(path)
                yield path


def check_runtime_dep_registration(repo_path: str) -> Dict:
    """
    运行时依赖完整性检查（白屏防护，补“漏注册”盲区）。

    现有 C++ 注册检查只能发现“已 include 却没 make_shared”的不一致，
    发现不了“库的鸿蒙代码 require 了某原生三方库、但 example 压根没注册”这类整库漏注册
    （如 *.harmony.js 里 import async-storage，但 entry/oh-package.json5 没加 HAR）
    → 运行时 NativeModule null / Couldn't find Turbo Module on CPP side → 白屏。

    做法：扫描鸿蒙运行时源码的 import/require → 命中原生库数据库 → 检查是否已在
    entry/oh-package.json5（或 example/package.json）注册（按短名跨 scope 等价比较）。
    """
    repo = Path(repo_path)
    ohos_root = resolve_ohos_root(repo)
    if not ohos_root:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_ohos"}}

    entry_oh_pkg = ohos_root / "example" / "harmony" / "entry" / "oh-package.json5"
    if not entry_oh_pkg.exists():
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_entry_oh_package"}}

    native_db = _load_native_lib_db()
    if not native_db:
        return {"ok": True, "skipped": True, "errors": [], "details": {"reason": "no_native_lib_db"}}

    # 已注册集合：entry/oh-package.json5 的 HAR 依赖 + example/package.json 依赖（均按短名归一）
    registered_keys = _collect_oh_package_dep_keys(entry_oh_pkg)
    example_pkg = ohos_root / "example" / "package.json"
    if example_pkg.exists():
        try:
            data = json.loads(example_pkg.read_text(encoding="utf-8", errors="ignore"))
            registered_keys |= set((data.get("dependencies") or {}).keys())
        except ValueError:
            pass
    registered_shorts = {_short_pkg_name(k) for k in registered_keys}

    self_specs = _self_specifiers(ohos_root)
    repo_root = repo.resolve()

    # 扫描鸿蒙运行时源码，收集“命中原生库数据库”的 import 及其来源文件
    found: Dict[str, Set[str]] = {}
    for path in _iter_harmony_runtime_sources(repo_root, ohos_root):
        try:
            code = path.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        for spec in _IMPORT_SPEC_RE.findall(code):
            if spec.startswith(".") or spec in ("react", "react-native") or spec in self_specs:
                continue
            if spec in native_db:
                try:
                    rel = str(path.relative_to(repo_root))
                except ValueError:
                    rel = str(path)
                found.setdefault(spec, set()).add(rel)

    errors = []
    unregistered = []
    for spec, files in sorted(found.items()):
        info = native_db[spec]
        accepts = info["accepts"]
        shorts = info["shorts"]
        is_registered = bool(accepts & registered_keys) or bool(shorts & registered_shorts)
        if not is_registered:
            unregistered.append(spec)
            sample = sorted(files)[:3]
            ohos_names = sorted(n for n in accepts if n != spec)[:3]
            errors.append(
                f"原生依赖 '{spec}' 被鸿蒙运行时代码引用（{', '.join(sample)}）"
                f"但未在 example 注册原生模块（entry/oh-package.json5 缺 HAR 依赖）"
                f" -> 运行时 NativeModule null / Couldn't find Turbo Module on CPP side -> 白屏。"
                f" 修复：将其鸿蒙化包（如 {', '.join(ohos_names) or '@react-native-ohos/...'}）"
                f" 加入 ohos/example/package.json 依赖并重跑 `rn.py build hap --prepare-only` 以触发 register_dep_plugins。"
            )

    return {
        "ok": len(errors) == 0,
        "skipped": False,
        "errors": errors,
        "details": {
            "entry_oh_package": str(entry_oh_pkg),
            "matched_native_imports": sorted(found.keys()),
            "unregistered": unregistered,
        },
    }


def main() -> None:
    repo_path = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("ADAPT_REPO", ".")

    result_hap = check_hap_generation(repo_path)
    result_cpp = check_cpp_package_registration(repo_path)
    result_dep_reg = check_runtime_dep_registration(repo_path)
    result_fabric = check_fabric_component_index(repo_path)
    result_stack = check_fabric_builder_stack(repo_path)
    result_bundle = check_bundle_deprecated_api(repo_path)
    result_appkey = check_appkey_consistency(repo_path)
    result_quality = check_example_quality(repo_path)
    result_autolink = check_rn_packages_factory_autolink(repo_path)
    result_entry_har = check_entry_plugin_registration(repo_path)

    all_results = [
        result_hap, result_cpp, result_dep_reg, result_fabric, result_stack, result_bundle,
        result_appkey, result_quality, result_autolink, result_entry_har,
    ]

    skipped = all(r["skipped"] for r in all_results)
    errors = []
    for r in all_results:
        errors.extend(r["errors"])

    if skipped:
        log("Skipped: no ohos or no example app")
        sys.exit(2)

    if len(errors) == 0:
        checks_run = sum(1 for r in all_results if not r["skipped"])
        checks_skip = sum(1 for r in all_results if r["skipped"])
        hap_info = result_hap.get("details", {}).get("hap_files", [])
        hap_msg = f", HAP: {hap_info}" if hap_info else ""
        skip_msg = f" ({checks_skip} skipped)" if checks_skip > 0 else ""
        log(f"Pass: {checks_run}/{len(all_results)} checks passed{hap_msg}{skip_msg}")
        sys.exit(0)

    fail("Failed:")
    for e in errors:
        fail(f"  {e}")
    sys.exit(1)


def _configure_stdio_utf8() -> None:
    """Windows 终端/管道下按 UTF-8 输出中文与符号，避免 UnicodeEncodeError 崩溃。"""
    if not sys.platform.startswith("win"):
        return
    try:
        import ctypes
        ctypes.windll.kernel32.SetConsoleOutputCP(65001)
        ctypes.windll.kernel32.SetConsoleCP(65001)
    except Exception:
        pass
    for _name in ("stdout", "stderr"):
        _stream = getattr(sys, _name, None)
        if _stream is None or not hasattr(_stream, "reconfigure"):
            continue
        try:
            _stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, OSError, ValueError):
            pass


_configure_stdio_utf8()


if __name__ == "__main__":
    main()