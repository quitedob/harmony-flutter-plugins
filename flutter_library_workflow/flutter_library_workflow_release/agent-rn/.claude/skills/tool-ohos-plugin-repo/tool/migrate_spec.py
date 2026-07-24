"""执行迁移：分析源码生成 Spec 文件 + 修改 JS 导出代码

流程：
1. 分析 ohos/src/ 源码，找到 NativeModules.Xxx 使用方式
2. 如果有 .d.ts，从中提取类型信息
3. 推导方法签名和常量
4. 生成 Spec 文件到 ohos/src/specs/v1/
5. 修改 import 语句使用新 Spec
6. 更新 codegen-lib 配置
"""

import json
import os
import re
import sys
from typing import Dict, Any, List, Optional, Tuple

_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SKILL_ROOT not in sys.path:
    sys.path.insert(0, _SKILL_ROOT)


_SOURCE_EXTS = (".ts", ".tsx", ".js", ".jsx")

_PARAM_TYPE_MAPPING = {
    "value": "number",
    "minimumDate": "number | null",
    "maximumDate": "number | null",
    "locale": "string",
    "mode": "string",
    "title": "string",
    "message": "string",
    "okButton": "string",
    "cancelButton": "string",
    "neutralButton": "string",
    "autoTheme": "boolean",
    "visible": "boolean",
    "enabled": "boolean",
    "disabled": "boolean",
    "selected": "boolean",
    "index": "number",
    "count": "number",
    "timeout": "number",
    "duration": "number",
    "delay": "number",
    "width": "number",
    "height": "number",
    "x": "number",
    "y": "number",
    "page": "number",
    "pageSize": "number",
    "limit": "number",
    "offset": "number",
    "total": "number",
    "size": "number",
    "data": "Array<any>",
    "options": "Array<any>",
    "items": "Array<any>",
    "urls": "Array<string>",
    "keys": "Array<string>",
    "values": "Array<any>",
    "config": "object",
    "params": "object",
    "extra": "object",
    "metadata": "object",
    "headers": "object",
    "body": "object",
    "payload": "object",
    "request": "object",
    "response": "object",
}

_RETURN_TYPE_MAPPING = {
    "action": "string",
    "year": "number",
    "month": "number",
    "day": "number",
    "date": "number",
    "time": "number",
    "result": "object",
    "data": "object",
    "status": "string",
    "code": "number",
    "message": "string",
    "error": "string | null",
    "success": "boolean",
    "enabled": "boolean",
    "visible": "boolean",
    "value": "number",
    "count": "number",
    "total": "number",
    "size": "number",
    "index": "number",
    "id": "string",
    "name": "string",
    "type": "string",
    "url": "string",
    "path": "string",
    "token": "string",
    "key": "string",
}


def _read_file(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        return f.read()


def _write_file(path: str, content: str) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)


def _read_json(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _write_json(path: str, data: dict) -> None:
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def _find_native_modules_usage(content: str) -> List[Dict]:
    """分析 NativeModules.Xxx 的使用方式"""
    
    pattern = r"NativeModules\.(\w+)|\{\s*(\w+)\s*\}\s*=\s*NativeModules|const\s*\{\s*(\w+)\s*\}\s*=\s*NativeModules"
    
    module_names = []
    for match in re.finditer(pattern, content):
        name = match.group(1) or match.group(2) or match.group(3)
        if name:
            module_names.append({"name": name, "has_export": "export default" in content})
    
    return module_names


def _find_module_variable_name(content: str, module_name: str) -> Optional[str]:
    """找到模块的变量名"""
    
    pattern = r"const\s*\{\s*" + module_name + r"\s*\}\s*=\s*NativeModules"
    match = re.search(pattern, content)
    if match:
        return module_name
    
    pattern = r"const\s+(\w+)\s*=\s*NativeModules\." + module_name
    match = re.search(pattern, content)
    if match:
        return match.group(1)
    
    # 检查 export default 形式
    pattern = r"export\s+default\s+NativeModules\." + module_name
    if re.search(pattern, content):
        return module_name
    
    return module_name


def _find_file_exports_native_module(file_path: str) -> Optional[Tuple[str, str, str]]:
    """检查文件是否导出 NativeModules.Xxx
    
    Returns: (module_name, export_file_basename) 或 None
    """
    content = _read_file(file_path)
    
    # 匹配 export default NativeModules.Xxx
    pattern = r"export\s+default\s+NativeModules\.(\w+)"
    match = re.search(pattern, content)
    if match:
        module_name = match.group(1)
        basename = os.path.splitext(os.path.basename(file_path))[0]
        return (module_name, basename, "default")
    
    pattern = r"export\s+(?:const|let|var)\s+(\w+)(?:\s*:\s*[^=]+)?\s*=\s*NativeModules\.(\w+)"
    match = re.search(pattern, content)
    if match:
        exported_name = match.group(1)
        module_name = match.group(2)
        basename = os.path.splitext(os.path.basename(file_path))[0]
        return (module_name, basename, exported_name)
    
    spec_imports = {}
    for match in re.finditer(
        r"import\s+(\w+)\s+from\s+[\"']\.\/specs\/v1\/Native(\w+)[\"']",
        content,
    ):
        spec_imports[match.group(1)] = match.group(2)
    
    if spec_imports:
        match = re.search(
            r"export\s+(?:const|let|var)\s+(\w+)(?:\s*:\s*[^=]+)?\s*=\s*(\w+)",
            content,
        )
        if match:
            exported_name = match.group(1)
            spec_import_name = match.group(2)
            module_name = spec_imports.get(spec_import_name)
            if module_name:
                basename = os.path.splitext(os.path.basename(file_path))[0]
                return (module_name, basename, exported_name)
    
    return None


def _find_importers_of_module(ohos_src: str, module_file_basename: str, exported_name: str = "default") -> List[Tuple[str, str]]:
    """找到所有导入该模块文件的文件及其变量名
    
    Returns: [(file_path, imported_var_name), ...]
    """
    importers = []
    
    for dirpath, dirnames, filenames in os.walk(ohos_src):
        dirnames[:] = [d for d in dirnames if not d.startswith(".") and d not in ("node_modules", "specs")]
        
        for fn in filenames:
            ext = os.path.splitext(fn)[1].lower()
            if ext not in _SOURCE_EXTS:
                continue
            
            file_path = os.path.join(dirpath, fn)
            content = _read_file(file_path)
            
            # 匹配 import Xxx from './module_file_basename'
            pattern = r"import\s+(\w+)\s+from\s+[\"']\.\/" + re.escape(module_file_basename) + r"(?:\.(?:js|jsx|ts|tsx))?[\"']"
            match = re.search(pattern, content)
            if match:
                importers.append((file_path, match.group(1)))
            
            # 匹配 import Xxx from './module_file_basename.js'
            pattern = r"import\s+(\w+)\s+from\s+[\"']\.\/" + re.escape(module_file_basename) + r"\.js[\"']"
            match = re.search(pattern, content)
            if match:
                importers.append((file_path, match.group(1)))
            
            if exported_name != "default":
                pattern = r"import\s*\{([^}]+)\}\s*from\s+[\"']\.\/" + re.escape(module_file_basename) + r"(?:\.(?:js|jsx|ts|tsx))?[\"']"
                for match in re.finditer(pattern, content):
                    for specifier in match.group(1).split(","):
                        specifier = specifier.strip()
                        if not specifier:
                            continue
                        alias_match = re.match(r"^" + re.escape(exported_name) + r"\s+as\s+(\w+)$", specifier)
                        if alias_match:
                            importers.append((file_path, alias_match.group(1)))
                        elif specifier == exported_name:
                            importers.append((file_path, exported_name))
    
    return importers


def _infer_param_type(param_name: str, value_expr: str = "") -> str:
    """Infer parameter type from name and value expression."""
    
    if param_name in _PARAM_TYPE_MAPPING:
        return _PARAM_TYPE_MAPPING[param_name]
    
    if value_expr:
        if value_expr.startswith('"') or value_expr.startswith("'"):
            return "string"
        if value_expr in ("true", "false"):
            return "boolean"
        if re.match(r"^\d+$", value_expr):
            return "number"
        if ".getTime()" in value_expr:
            return "number"
        if value_expr.startswith("["):
            return "Array<any>"
        if value_expr.startswith("{"):
            return "object"
        if "null" in value_expr and "?? null" in value_expr:
            base_type = _infer_param_type(param_name, value_expr.replace("?? null", "").replace("null", "").strip())
            if base_type != "any":
                return f"{base_type} | null"
    
    return "any"


def _infer_return_type(field_name: str) -> str:
    """Infer return type field type from name."""
    
    if field_name in _RETURN_TYPE_MAPPING:
        return _RETURN_TYPE_MAPPING[field_name]
    
    return "any"


def _parse_object_literal(obj_content: str) -> List[Dict]:
    """Parse object literal to extract fields with inferred types.
    
    Supports:
    - { key: value }
    - { key: value?.method() ?? null }
    - { ...spread }
    - Multiline objects
    """
    
    fields = []
    
    obj_content = obj_content.strip()
    if not obj_content.startswith("{"):
        return fields
    
    depth = 0
    current_key = ""
    current_value = ""
    in_key = True
    i = 1
    
    while i < len(obj_content):
        char = obj_content[i]
        
        if char == "{" and in_key:
            depth += 1
            current_value += char
            in_key = False
        elif char == "}" and depth > 0:
            depth -= 1
            current_value += char
        elif char == ":" and depth == 0 and in_key:
            in_key = False
        elif char == "," and depth == 0:
            if current_key.strip():
                key = current_key.strip()
                val = current_value.strip()
                field_type = _infer_param_type(key, val)
                fields.append({"name": key, "type": field_type})
            current_key = ""
            current_value = ""
            in_key = True
        elif char == "..." and in_key and obj_content[i:i+3] == "...":
            i += 2
            while i < len(obj_content) and obj_content[i] not in (",", "}"):
                i += 1
            continue
        elif in_key:
            if char not in (" ", "\t", "\n", "\r"):
                current_key += char
        else:
            current_value += char
        
        i += 1
    
    if current_key.strip():
        key = current_key.strip()
        val = current_value.strip().rstrip("}")
        field_type = _infer_param_type(key, val)
        fields.append({"name": key, "type": field_type})
    
    return fields


def _extract_return_type_from_promise(content: str, method_call_end: int) -> str:
    """Extract return type from .then() callback after a method call.
    
    Looks for patterns like:
    - .then(({ action, year, month }) => ...)
    - .then(result => { const { a, b } = result; })
    - .then(function({ action, year }) { ... })
    """
    
    rest_content = content[method_call_end:]
    
    then_pattern = r"\.then\s*\(\s*(?:async\s*)?\s*\("
    then_match = re.search(then_pattern, rest_content)
    if not then_match:
        return "Promise<any>"
    
    then_start = then_match.end()
    depth = 1
    pos = then_start
    while pos < len(rest_content) and depth > 0:
        if rest_content[pos] == "(":
            depth += 1
        elif rest_content[pos] == ")":
            depth -= 1
        pos += 1
    
    callback_params = rest_content[then_start:pos-1].strip()
    
    if callback_params.startswith("{"):
        fields = []
        field_content = callback_params[1:].rstrip("}")
        for field in field_content.split(","):
            field = field.strip()
            if field:
                field_name = field.split(":")[0].strip() if ":" in field else field
                if field_name and not field_name.startswith("..."):
                    field_type = _infer_return_type(field_name)
                    fields.append({"name": field_name, "type": field_type})
        
        if fields:
            field_types = ", ".join(f"{f['name']}: {f['type']}" for f in fields)
            return f"Promise<{{{field_types}}}>"
    
    elif callback_params and not callback_params.startswith("{"):
        param_name = callback_params.split(":")[0].strip()
        if param_name:
            next_content = rest_content[pos:]
            destruct_pattern = r"const\s*\{([^}]+)\}\s*=\s*" + re.escape(param_name)
            destruct_match = re.search(destruct_pattern, next_content)
            if destruct_match:
                field_content = destruct_match.group(1)
                fields = []
                for field in field_content.split(","):
                    field = field.strip()
                    if field:
                        field_name = field.split(":")[0].strip() if ":" in field else field
                        if field_name and not field_name.startswith("..."):
                            field_type = _infer_return_type(field_name)
                            fields.append({"name": field_name, "type": field_type})
                
                if fields:
                    field_types = ", ".join(f"{f['name']}: {f['type']}" for f in fields)
                    return f"Promise<{{{field_types}}}>"
    
    return "Promise<any>"


def _extract_usages(content: str, var_name: str) -> Tuple[List[Dict], List[Dict]]:
    """提取方法和常量的使用方式
    
    改进：
    - 解析对象字面量参数的具体字段
    - 从 .then() 回调提取返回类型
    """
    
    methods = []
    constants = []
    
    method_pattern = re.escape(var_name) + r"\.(\w+)\s*\("
    
    for match in re.finditer(method_pattern, content):
        method_name = match.group(1)
        if method_name == "getConstants":
            continue
        call_start = match.end()
        
        depth = 1
        pos = call_start
        while pos < len(content) and depth > 0:
            if content[pos] == "(":
                depth += 1
            elif content[pos] == ")":
                depth -= 1
            pos += 1
        
        params_content = content[call_start:pos-1].strip()
        method_call_end = pos
        
        return_type = _extract_return_type_from_promise(content, method_call_end)
        
        if not params_content:
            methods.append({"name": method_name, "params": [], "return": return_type, "is_object_param": False})
        elif params_content.startswith("{"):
            fields = _parse_object_literal(params_content)
            if fields:
                methods.append({"name": method_name, "params": fields, "return": return_type, "is_object_param": True})
            else:
                methods.append({"name": method_name, "params": [{"name": "config", "type": "object"}], "return": return_type, "is_object_param": False})
        else:
            params = []
            for p in params_content.split(","):
                p = p.strip()
                if p:
                    if p.startswith("{"):
                        inner_fields = _parse_object_literal(p)
                        if inner_fields:
                            fields_str = ', '.join(f"{f['name']}: {f['type']}" for f in inner_fields)
                            params.append({"name": "config", "type": f"{{{fields_str}}}"})
                        else:
                            params.append({"name": "config", "type": "object"})
                    elif p.startswith("["):
                        params.append({"name": "items", "type": "Array<any>"})
                    else:
                        param_name = p.split(":")[0].strip() if ":" in p else p
                        param_type = _infer_param_type(param_name, p)
                        params.append({"name": param_name, "type": param_type})
            methods.append({"name": method_name, "params": params, "return": return_type, "is_object_param": False})
    
    for match in re.finditer(re.escape(var_name) + r"\.getConstants\s*\(\s*\)\s*\.\s*(\w+)", content):
        const_name = match.group(1)
        constants.append({"name": const_name, "type": "any", "readonly": True})
    
    constant_pattern = re.escape(var_name) + r"\.(\w+)(?!\s*\()"
    for match in re.finditer(constant_pattern, content):
        const_name = match.group(1)
        
        match_end = match.end()
        rest = content[match_end:]
        if re.match(r"\w", rest):
            continue
        
        if re.match(r"\s*\(", rest):
            continue
        
        if const_name not in [m["name"] for m in methods]:
            constants.append({"name": const_name, "type": "any", "readonly": True})
    
    return methods, constants


def _extract_from_dts(dts_content: str, module_name: str) -> Tuple[List[Dict], List[Dict]]:
    """从 .d.ts 提取类型信息
    
    支持格式：
    - declare namespace Xxx { export const prop: type; }
    - interface Xxx { prop: type; }
    - const Xxx: { prop: type; }
    - type Xxx = { prop: type; }
    """
    
    methods = []
    constants = []
    
    # declare namespace 格式
    namespace_pattern = r"declare\s+namespace\s+(\w+)\s*\{([^}]+)\}"
    for match in re.finditer(namespace_pattern, dts_content, re.DOTALL):
        obj_content = match.group(2)
        
        prop_pattern = r"export\s+(const|let|var|readonly)\s+(\w+)\s*:\s*([^;\n]+)"
        for prop_match in re.finditer(prop_pattern, obj_content):
            keyword = prop_match.group(1)
            name = prop_match.group(2)
            type_str = prop_match.group(3).strip()
            
            readonly = keyword in ("const", "readonly")
            constants.append({"name": name, "type": type_str, "readonly": readonly})
        
        func_pattern = r"export\s+(function|const)\s+(\w+)\s*\(([^)]*)\)\s*:\s*([^;\n]+)"
        for func_match in re.finditer(func_pattern, obj_content):
            name = func_match.group(2)
            params_str = func_match.group(3)
            return_type = func_match.group(4).strip()
            
            params = []
            if params_str:
                for p in params_str.split(","):
                    p = p.strip()
                    if ":" in p:
                        pname, ptype = p.split(":")
                        params.append({"name": pname.strip(), "type": ptype.strip()})
                    elif p:
                        params.append({"name": p, "type": "any"})
            
            methods.append({"name": name, "params": params, "return": return_type})
    
    # interface 格式
    interface_pattern = r"interface\s+(\w+)\s*\{([^}]+)\}"
    for match in re.finditer(interface_pattern, dts_content, re.DOTALL):
        obj_content = match.group(2)
        
        prop_pattern = r"(readonly\s+)?(\w+)\s*[?:]?\s*([^;,\n]+)"
        for prop_match in re.finditer(prop_pattern, obj_content):
            readonly = prop_match.group(1) is not None
            name = prop_match.group(2)
            type_str = prop_match.group(3).strip()
            
            if "(" in type_str or "=>" in type_str:
                func_pattern = r"\(([^)]*)\)\s*=>\s*(\w+)"
                func_match = re.search(func_pattern, type_str)
                if func_match:
                    params_str = func_match.group(1)
                    return_type = func_match.group(2)
                    
                    params = []
                    if params_str:
                        for p in params_str.split(","):
                            p = p.strip()
                            if ":" in p:
                                pname, ptype = p.split(":")
                                params.append({"name": pname.strip(), "type": ptype.strip()})
                            elif p:
                                params.append({"name": p, "type": "any"})
                    
                    methods.append({"name": name, "params": params, "return": return_type})
            else:
                constants.append({"name": name, "type": type_str, "readonly": readonly})
    
    # const 对象字面量格式
    pattern = r"declare\s+const\s+(\w+)\s*:\s*\{([^}]+)\}"
    match = re.search(pattern, dts_content, re.DOTALL)
    if match:
        obj_content = match.group(2)
        
        prop_pattern = r"(\w+)\s*[?:]?\s*([^;,\n]+)"
        for prop_match in re.finditer(prop_pattern, obj_content):
            name = prop_match.group(1)
            type_str = prop_match.group(2).strip()
            
            if "(" in type_str:
                func_pattern = r"\(([^)]*)\)\s*(?:=>\s*|:\s*)([^;,\n]+)"
                func_match = re.search(func_pattern, type_str)
                if func_match:
                    params_str = func_match.group(1)
                    return_type = func_match.group(2).strip()
                    
                    params = []
                    if params_str:
                        for p in params_str.split(","):
                            p = p.strip()
                            if ":" in p:
                                pname, ptype = p.split(":")
                                params.append({"name": pname.strip(), "type": ptype.strip()})
                            elif p:
                                params.append({"name": p, "type": "any"})
                    
                    methods.append({"name": name, "params": params, "return": return_type})
            else:
                constants.append({"name": name, "type": type_str, "readonly": True})
    
    # type = 格式
    type_pattern = r"type\s+(\w+)\s*=\s*\{([^}]+)\}"
    for match in re.finditer(type_pattern, dts_content, re.DOTALL):
        obj_content = match.group(2)
        
        prop_pattern = r"(readonly\s+)?(\w+)\s*[?:]?\s*([^;,\n]+)"
        for prop_match in re.finditer(prop_pattern, obj_content):
            readonly = prop_match.group(1) is not None
            name = prop_match.group(2)
            type_str = prop_match.group(3).strip()
            
            constants.append({"name": name, "type": type_str, "readonly": readonly})
    
    return methods, constants


def _merge_type_info(methods_js: List[Dict], methods_dts: List[Dict]) -> List[Dict]:
    """合并 JS 使用方式和 .d.ts 类型信息"""
    
    merged = []
    
    for m_js in methods_js:
        name = m_js["name"]
        
        m_dts = next((m for m in methods_dts if m["name"] == name), None)
        
        if m_dts:
            merged.append({
                "name": name,
                "params": m_dts.get("params", m_js.get("params", [])),
                "return": m_dts.get("return", m_js.get("return", "Promise<any>"))
            })
        else:
            merged.append(m_js)
    
    return merged


def _merge_constants(constants_js: List[Dict], constants_dts: List[Dict]) -> List[Dict]:
    """合并常量信息
    
    TurboModule 的常量都是 readonly（NativeModule 导出的常量不可修改）
    """
    
    merged = []
    
    for c_js in constants_js:
        name = c_js["name"]
        
        c_dts = next((c for c in constants_dts if c["name"] == name), None)
        
        if c_dts:
            merged.append({
                "name": name,
                "type": c_dts.get("type", c_js.get("type", "any")),
                "readonly": True
            })
        else:
            merged.append({
                "name": name,
                "type": c_js.get("type", "any"),
                "readonly": True
            })
    
    return merged


def _generate_turbo_spec(module_name: str, methods: List[Dict], constants: List[Dict]) -> str:
    """生成 TurboModule Spec 文件内容
    
    TurboModule 规范要求：
    - 常量必须通过 getConstants() 方法返回
    - 不能直接定义属性（如 readonly appVersion: string）
    - 对象参数应使用 interface 类型
    """
    
    lines = [
        "import type { TurboModule } from 'react-native';",
        "import { TurboModuleRegistry } from 'react-native';",
        "",
        f"export interface Spec extends TurboModule {{"
    ]
    
    interface_defs = []
    
    if constants:
        const_lines = []
        for const in constants:
            const_name = const.get("name", "")
            const_type = const.get("type", "any")
            const_lines.append(f"    {const_name}: {const_type};")
        
        lines.append("  getConstants(): {")
        lines.extend(const_lines)
        lines.append("  };")
    
    for method in methods:
        method_name = method.get("name", "")
        params = method.get("params", [])
        return_type = method.get("return", "void")
        is_object_param = method.get("is_object_param", False)
        
        if is_object_param and params and len(params) > 1:
            config_name = f"{method_name.capitalize()}Config"
            fields = []
            for p in params:
                p_name = p.get("name", "")
                p_type = p.get("type", "any")
                fields.append(f"    {p_name}: {p_type};")
            
            interface_defs.append(f"export interface {config_name} {{")
            interface_defs.extend(fields)
            interface_defs.append("}")
            interface_defs.append("")
            
            lines.append(f"  {method_name}(config: {config_name}): {return_type};")
        elif params:
            params_str = ", ".join([f"{p.get('name', '')}: {p.get('type', 'any')}" for p in params])
            lines.append(f"  {method_name}({params_str}): {return_type};")
        else:
            lines.append(f"  {method_name}(): {return_type};")
    
    if not constants and not methods:
        lines.append("  // No methods or constants defined")
    
    lines.append("}")
    lines.append("")
    lines.append(f"export default TurboModuleRegistry.getEnforcing<Spec>('{module_name}');")
    lines.append("")
    
    result = "\n".join(interface_defs + lines)
    return result


def _modify_js_import(content: str, module_name: str, var_name: str, constants: List[Dict] = None) -> str:
    """修改 JS import 语句使用新 Spec
    
    Args:
        constants: 常量列表，用于将常量访问替换为 getConstants() 调用
    """
    
    # 防止已迁移的 module_name（以 Native 开头）再次添加 Native 前缀
    if module_name.startswith("Native"):
        spec_import_name = module_name
    else:
        spec_import_name = f"Native{module_name}"
    
    old_patterns = [
        r"import\s+\{\s*NativeModules\s*\}\s*from\s*['\"]react-native['\"];?\s*\n?",
        r"const\s*\{\s*" + module_name + r"\s*\}\s*=\s*NativeModules;?\s*\n?",
        # 只删除简单的 const Xxx = NativeModules.Yyy; 语句（无 fallback）
        r"const\s+" + var_name + r"\s*=\s*NativeModules\." + module_name + r"\s*;\s*\n?",
    ]
    
    for pattern in old_patterns:
        content = re.sub(pattern, "", content)
    
    export_alias_pattern = r"export\s+(const|let|var)\s+" + re.escape(var_name) + r"(\s*:\s*[^=]+)?\s*=\s*NativeModules\." + re.escape(module_name) + r"\s*;?\s*\n?"
    content = re.sub(export_alias_pattern, rf"export \1 {var_name}\2 = {spec_import_name}\n", content)
    
    # 替换带 fallback 的定义：const Xxx = NativeModules.Yyy || fallback
    # 改为：const Xxx = NativeYyy || fallback
    fallback_pattern = r"const\s+" + re.escape(var_name) + r"\s*=\s*NativeModules\." + re.escape(module_name) + r"\s*\|\|"
    if re.search(fallback_pattern, content):
        content = re.sub(
            r"const\s+" + re.escape(var_name) + r"\s*=\s*NativeModules\." + re.escape(module_name) + r"\s*\|\|",
            f"const {var_name} = {spec_import_name} ||",
            content
        )
    
    # 替换带三元运算符的定义：const Xxx = NativeModules.Yyy ? NativeModules.Yyy : fallback
    ternary_pattern = r"const\s+" + re.escape(var_name) + r"\s*=\s*NativeModules\." + re.escape(module_name) + r"\s*\?"
    if re.search(ternary_pattern, content):
        content = re.sub(
            r"NativeModules\." + re.escape(module_name),
            spec_import_name,
            content
        )
    
    new_import = f"import {spec_import_name} from './specs/v1/{spec_import_name}';\n"
    
    # 检查是否已经存在该 import，避免重复插入
    if spec_import_name in content and f"from './specs/v1/{spec_import_name}'" in content:
        pass  # 已存在，不重复插入
    elif "import " in content:
        first_import_match = re.search(r"^import\s+", content)
        if first_import_match:
            insert_pos = first_import_match.start()
            content = content[:insert_pos] + new_import + content[insert_pos:]
    else:
        content = new_import + "\n" + content
    
    # 替换常量访问为 getConstants() 调用
    if constants:
        const_names = [c.get("name", "") for c in constants]
        for const_name in const_names:
            # 替换 var_name.constantName -> spec_import_name.getConstants().constantName
            pattern = re.escape(var_name) + r"\." + re.escape(const_name)
            replacement = f"{spec_import_name}.getConstants().{const_name}"
            content = re.sub(pattern, replacement, content)
    
    # 替换方法调用（非常量访问）
    # 检查是否已有 var_name = spec_import_name 的定义，避免重复替换
    # 例如: const RNAlipay = NativeRNAlipay 表示已迁移，不应再替换 RNAlipay.xxx
    already_migrated_pattern = r"const\s+" + re.escape(var_name) + r"\s*=\s*" + re.escape(spec_import_name)
    if not re.search(already_migrated_pattern, content):
        # 只在未迁移时替换 var_name.xxx
        content = re.sub(re.escape(var_name) + r"\.", f"{spec_import_name}.", content)
    
    # 只替换 NativeModules.xxx 形式，不替换已经迁移的 spec 引用
    content = re.sub(r"NativeModules\." + re.escape(module_name), spec_import_name, content)
    
    return content


def _modify_js_alias_usages(content: str, var_name: str, constants: List[Dict] = None) -> str:
    """Rewrite imported NativeModule constant accesses to TurboModule getConstants()."""
    if not constants:
        return content
    
    for const in constants:
        const_name = const.get("name", "")
        if not const_name:
            continue
        pattern = re.escape(var_name) + r"\." + re.escape(const_name)
        replacement = f"{var_name}.getConstants().{const_name}"
        content = re.sub(pattern, replacement, content)
    
    return content


def _modify_js_for_nitro(content: str, hybrid_name: str, var_name: str, constants: List[Dict] = None) -> str:
    """Modify JS import to use TurboModule spec instead of NitroModules.
    
    NitroModules.createHybridObject('Xxx') -> import NativeXxx from './specs/v1/NativeXxx'
    """
    
    spec_import_name = f"Native{hybrid_name}"
    
    # Remove NitroModules import
    nitro_import_patterns = [
        r"import\s*\{\s*NitroModules\s*\}\s*from\s*['\"]react-native-nitro-modules['\"];?\s*\n?",
        r"import\s+NitroModules\s*from\s*['\"]react-native-nitro-modules['\"];?\s*\n?",
        r"import\s*\{[^}]*NitroModules[^}]*\}\s*from\s*['\"]react-native-nitro-modules['\"];?\s*\n?",
    ]
    
    for pattern in nitro_import_patterns:
        content = re.sub(pattern, "", content)
    
    # Remove NitroModules.createHybridObject declaration (support generic + multiline)
    nitro_decl_pattern = r"(?:const|let|var)\s+" + re.escape(var_name) + r"\s*=\s*NitroModules\s*\.\s*(?:createHybridObject|HybridObject)\s*(?:<[^>]+>)?\s*\(\s*['\"]" + re.escape(hybrid_name) + r"['\"]\s*,?\s*\)\s*;?\s*\n?"
    content = re.sub(nitro_decl_pattern, "", content, flags=re.DOTALL)
    
    # Add TurboModule spec import
    new_import = f"import {spec_import_name} from './specs/v1/{spec_import_name}';\n"
    
    if spec_import_name not in content:
        if "import " in content:
            first_import_match = re.search(r"^import\s+", content, re.MULTILINE)
            if first_import_match:
                insert_pos = first_import_match.start()
                content = content[:insert_pos] + new_import + content[insert_pos:]
        else:
            content = new_import + "\n" + content
    
    # Replace constant access with getConstants() call
    if constants:
        const_names = [c.get("name", "") for c in constants]
        for const_name in const_names:
            pattern = re.escape(var_name) + r"\." + re.escape(const_name)
            replacement = f"{spec_import_name}.getConstants().{const_name}"
            content = re.sub(pattern, replacement, content)
    
    # Replace method calls
    content = re.sub(re.escape(var_name) + r"\.", f"{spec_import_name}.", content)
    
    return content


def _find_require_native_component_usages(content: str) -> List[Tuple[str, str]]:
    """Return (variable_name, native_component_name) from requireNativeComponent calls.
    
    支持两种形式：
    - const Xxx = requireNativeComponent('Yyy')
    - export default requireNativeComponent('Yyy')（变量名 = 组件名）
    """
    usages: List[Tuple[str, str]] = []
    
    # 形式1: const Xxx = requireNativeComponent('Yyy')
    for match in re.finditer(
        r"(?:const|let|var)\s+(\w+)\s*=\s*requireNativeComponent\s*\(\s*['\"](\w+)['\"]",
        content,
    ):
        usages.append((match.group(1), match.group(2)))
    
    # 形式2: export default requireNativeComponent('Yyy')
    for match in re.finditer(
        r"export\s+default\s+requireNativeComponent\s*\(\s*['\"](\w+)['\"]",
        content,
    ):
        component_name = match.group(1)
        usages.append((component_name, component_name))  # 变量名 = 组件名
    
    return usages


_RE_NITRO_CREATE = re.compile(
    r"(?:const|let|var)\s+(\w+)\s*=\s*NitroModules\s*\.\s*(?:createHybridObject|HybridObject)\s*(?:<[^>]+>)?\s*\(\s*['\"]([^'\"]+)['\"]",
    re.DOTALL,
)


def _find_nitro_modules_usages(content: str) -> List[Tuple[str, str]]:
    """Return (variable_name, hybrid_object_name) from NitroModules.createHybridObject calls."""
    usages: List[Tuple[str, str]] = []
    for match in _RE_NITRO_CREATE.finditer(content):
        usages.append((match.group(1), match.group(2)))
    return usages


def _extract_props_from_android(plugin_root: str, component_name: str) -> List[Dict]:
    """扫描 Android Java/Kotlin 文件，提取 @ReactProp 定义
    
    Args:
        plugin_root: 插件根目录
        component_name: 组件名称（如 'PinchableView'）
    
    Returns:
        [{name, type, optional}, ...]
    """
    props = []
    view_manager_found = False
    
    skip_dirs = {"node_modules", "ohos", "example", ".git", ".gradle", "build", ".idea"}
    
    for dirpath, dirnames, filenames in os.walk(plugin_root):
        dirnames[:] = [d for d in dirnames if d not in skip_dirs]
        
        for fn in filenames:
            if not (fn.endswith(".java") or fn.endswith(".kt")):
                continue
            
            file_path = os.path.join(dirpath, fn)
            content = _read_file(file_path)
            
            # 检查是否是 ViewManager（类名包含 component_name + ViewManager）
            if f"{component_name}Manager" not in content and f"{component_name}ViewManager" not in content:
                continue
            
            # 提取 @ReactProp
            react_prop_pattern = r"@ReactProp\s*\(\s*name\s*=\s*['\"](\w+)['\"](?:\s*,\s*default(?:Float|Int|Boolean|String)\s*=\s*([^)]+))?"
            
            for match in re.finditer(react_prop_pattern, content):
                prop_name = match.group(1)
                default_val = match.group(2) if match.lastindex >= 2 else None
                
                # 推断类型
                prop_type = "any"
                if default_val:
                    if "Float" in match.group(0) or "Double" in match.group(0):
                        prop_type = "number"
                    elif "Int" in match.group(0):
                        prop_type = "number"
                    elif "Boolean" in match.group(0):
                        prop_type = "boolean"
                    elif "String" in match.group(0):
                        prop_type = "string"
                    else:
                        # 从默认值推断
                        if default_val.strip().startswith('"') or default_val.strip().startswith("'"):
                            prop_type = "string"
                        elif default_val.strip() in ("true", "false"):
                            prop_type = "boolean"
                        elif re.match(r"^\d+\.?\d*$", default_val.strip()):
                            prop_type = "number"
                else:
                    # 无 default 值，尝试从方法参数推断类型
                    # 找 @ReactProp 后紧跟的方法：public void setProp(View view, Type prop)
                    method_pattern = (
                        r"@ReactProp\s*\(\s*name\s*=\s*['\"]" + re.escape(prop_name) + 
                        r"['\"][^)]*\)\s*\n?\s*public\s+void\s+set\w+\s*\([^,]+,\s+(\w+)\s+\w+\s*\)"
                    )
                    method_match = re.search(method_pattern, content)
                    if method_match:
                        param_type = method_match.group(1)
                        type_mapping = {
                            "float": "number",
                            "double": "number",
                            "int": "number",
                            "Integer": "number",
                            "boolean": "boolean",
                            "Boolean": "boolean",
                            "String": "string",
                            "CharSequence": "string",
                        }
                        prop_type = type_mapping.get(param_type, "any")
                
                props.append({
                    "name": prop_name,
                    "type": prop_type,
                    "optional": True
                })
                view_manager_found = True
    
    if view_manager_found and props:
        print(f"  [android props] {component_name}: {[p['name'] for p in props]}")
    
    return props


def _extract_props_from_ios(plugin_root: str, component_name: str) -> List[Dict]:
    """扫描 iOS Objective-C/Swift 文件，提取 RCT_EXPORT_VIEW_PROPERTY 定义
    
    Args:
        plugin_root: 插件根目录
        component_name: 组件名称
    
    Returns:
        [{name, type, optional}, ...]
    """
    props = []
    
    skip_dirs = {"node_modules", "ohos", "example", ".git"}
    
    for dirpath, dirnames, filenames in os.walk(plugin_root):
        dirnames[:] = [d for d in dirnames if d not in skip_dirs]
        
        for fn in filenames:
            if not (fn.endswith(".m") or fn.endswith(".swift") or fn.endswith(".h")):
                continue
            
            file_path = os.path.join(dirpath, fn)
            content = _read_file(file_path)
            
            # 检查是否是 ViewManager
            if f"{component_name}Manager" not in content and f"{component_name}ViewManager" not in content:
                continue
            
            # 提取 RCT_EXPORT_VIEW_PROPERTY
            rct_prop_pattern = r"RCT_EXPORT_VIEW_PROPERTY\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)"
            
            for match in re.finditer(rct_prop_pattern, content):
                prop_name = match.group(1)
                type_name = match.group(2)
                
                # 推断 TS 类型
                type_mapping = {
                    "float": "number",
                    "double": "number",
                    "NSInteger": "number",
                    "NSUInteger": "number",
                    "BOOL": "boolean",
                    "NSString": "string",
                    "UIColor": "string",  # ColorValue
                }
                prop_type = type_mapping.get(type_name, "any")
                
                props.append({
                    "name": prop_name,
                    "type": prop_type,
                    "optional": True
                })
    
    return props


def _find_fabric_component_export_file(ohos_src: str, component_name: str) -> Optional[Tuple[str, str]]:
    """Find file that exports requireNativeComponent('Xxx').
    
    Returns: (file_path, variable_name) or None
    """
    for dirpath, dirnames, filenames in os.walk(ohos_src):
        dirnames[:] = [d for d in dirnames if not d.startswith(".") and d not in ("node_modules", "specs")]
        
        for fn in filenames:
            ext = os.path.splitext(fn)[1].lower()
            if ext not in _SOURCE_EXTS:
                continue
            
            file_path = os.path.join(dirpath, fn)
            content = _read_file(file_path)
            
            for var_name, name in _find_require_native_component_usages(content):
                if name == component_name:
                    return (file_path, var_name)
    
    return None


def _find_fabric_importers(ohos_src: str, export_file_basename: str) -> List[Tuple[str, str]]:
    """Find all files that import the Fabric component and their variable names.
    
    Returns: [(file_path, imported_var_name), ...]
    """
    importers = []
    
    for dirpath, dirnames, filenames in os.walk(ohos_src):
        dirnames[:] = [d for d in dirnames if not d.startswith(".") and d not in ("node_modules", "specs")]
        
        for fn in filenames:
            ext = os.path.splitext(fn)[1].lower()
            if ext not in _SOURCE_EXTS:
                continue
            
            file_path = os.path.join(dirpath, fn)
            content = _read_file(file_path)
            
            # 匹配 import Xxx from './export_file_basename'
            patterns = [
                r"import\s+(\w+)\s+from\s+[\"']\.\/" + re.escape(export_file_basename) + r"[\"']",
                r"import\s+(\w+)\s+from\s+[\"']\.\/" + re.escape(export_file_basename) + r"\.js[\"']",
                r"import\s+(\w+)\s+from\s+[\"']\.\/" + re.escape(export_file_basename) + r"\.jsx[\"']",
            ]
            
            for pattern in patterns:
                match = re.search(pattern, content)
                if match:
                    importers.append((file_path, match.group(1)))
                    break
    
    return importers


def _extract_fabric_props_from_jsx(content: str, component_var_name: str) -> Tuple[List[Dict], List[str]]:
    """Extract props and events from JSX usage of Fabric component.
    
    Args:
        content: Source file content
        component_var_name: Variable name used for the component (e.g., 'RNMonthPickerView')
    
    Returns: (props_list, events_list)
    """
    props = []
    events = []
    
    # 匹配 JSX: <ComponentName ...> 或 <ComponentName ... />
    jsx_pattern = r"<" + re.escape(component_var_name) + r"([^>]*)(?:>|\/>)"
    
    for match in re.finditer(jsx_pattern, content):
        props_str = match.group(1)
        
        # 1. 提取 spread 形式: {...{ prop1, prop2, ... }}
        spread_pattern = r"\{\s*\.\.\.\s*\{([^}]+)\}\s*\}"
        for spread_match in re.finditer(spread_pattern, props_str):
            spread_content = spread_match.group(1)
            # 提取 spread 中的每个 prop
            for prop_name in spread_content.split(","):
                prop_name = prop_name.strip()
                if prop_name and not prop_name.startswith("//"):
                    # 判断是否是事件
                    if prop_name.startswith("on"):
                        events.append(prop_name)
                    else:
                        props.append({
                            "name": prop_name,
                            "type": _infer_prop_type(prop_name, ""),
                            "optional": True
                        })
        
        # 2. 提取单独的 prop: name={value} 或 name="string"
        prop_pattern = r"(\w+)\s*=\s*(?:\{([^}]*)\}|\"([^\"]*)\")"
        
        for prop_match in re.finditer(prop_pattern, props_str):
            prop_name = prop_match.group(1)
            
            # 跳过 style（继承自 ViewProps）
            if prop_name == "style":
                continue
            
            # 判断是否是事件（以 on 开头）
            if prop_name.startswith("on"):
                events.append(prop_name)
            else:
                # 从值推断类型
                value = prop_match.group(2) or prop_match.group(3)
                
                if value:
                    prop_type = _infer_prop_type(prop_name, value)
                else:
                    prop_type = "any"
                
                props.append({
                    "name": prop_name,
                    "type": prop_type,
                    "optional": True
                })
    
    # 去重
    props = _dedupe_props(props)
    events = list(set(events))
    
    return props, events


def _infer_prop_type(prop_name: str, value: str) -> str:
    """Infer prop type from value expression."""
    
    # 常见 prop 名称类型映射
    type_mapping = {
        "value": "number",
        "minimumDate": "number | null",
        "maximumDate": "number | null",
        "locale": "string",
        "mode": "string",
        "autoTheme": "boolean",
        "okButton": "string",
        "cancelButton": "string",
        "neutralButton": "string",
        "title": "string",
        "message": "string",
        "visible": "boolean",
        "enabled": "boolean",
        "disabled": "boolean",
        "selected": "boolean",
        "index": "number",
        "count": "number",
        "data": "Array<any>",
        "options": "Array<any>",
    }
    
    if prop_name in type_mapping:
        return type_mapping[prop_name]
    
    # 从值推断
    if value.startswith('"') or value.startswith("'"):
        return "string"
    if value in ("true", "false"):
        return "boolean"
    if re.match(r"^\d+$", value):
        return "number"
    if value.startswith("{") or value.startswith("["):
        return "object"
    if ".getTime()" in value:
        return "number"
    
    return "any"


def _dedupe_props(props: List[Dict]) -> List[Dict]:
    """Remove duplicate props, keeping the first occurrence."""
    seen = set()
    result = []
    for prop in props:
        name = prop.get("name", "")
        if name not in seen:
            seen.add(name)
            result.append(prop)
    return result


def _generate_fabric_spec(component_name: str, props: List[Dict] = None, events: List[str] = None) -> str:
    from lib.fabric_spec_codegen import generate_fabric_native_component_spec
    
    return generate_fabric_native_component_spec(
        component_name,
        props=props,
        events=events,
    )


def _modify_js_for_fabric(
    content: str,
    var_name: str,
    component_name: str,
    spec_import_basename: str,
) -> str:
    """Replace requireNativeComponent variable with Fabric Spec import."""
    spec_symbol = spec_import_basename.replace(".ts", "").replace(".tsx", "")

    # 移除 requireNativeComponent import
    content = re.sub(
        r"import\s*\{[^}]*requireNativeComponent[^}]*\}\s*from\s*['\"]react-native['\"];?\s*\n?",
        "",
        content,
    )
    
    # 移除 const Xxx = requireNativeComponent(...) 形式
    content = re.sub(
        r"(?:const|let|var)\s+" + re.escape(var_name) + r"\s*=\s*requireNativeComponent\s*\([^)]*\);?\s*\n?",
        "",
        content,
    )
    
    # 移除 export default requireNativeComponent(...) 形式，替换为 export { spec_symbol }
    export_default_pattern = r"export\s+default\s+requireNativeComponent\s*\(\s*['\"]" + re.escape(component_name) + r"['\"]\s*\)\s*;?\s*\n?"
    if re.search(export_default_pattern, content):
        content = re.sub(export_default_pattern, "", content)
        # 如果没有其他 export，添加 export default
        if "export" not in content or content.strip().startswith("import"):
            content = content.rstrip() + f"\n\nexport default {spec_symbol};\n"
        else:
            content = content.rstrip() + f"\n\nexport {{ {spec_symbol} }};\n"

    # 添加 Fabric Spec import（如果不存在）
    new_import = f"import {spec_symbol} from './specs/v1/{spec_symbol}';\n"
    if spec_symbol not in content:
        if re.search(r"^import\s+", content, re.MULTILINE):
            content = new_import + content
        else:
            content = new_import + "\n" + content

    # 替换变量名引用（如果有）
    content = re.sub(r"\b" + re.escape(var_name) + r"\b", spec_symbol, content)
    return content


def analyze_fabric_usages(ohos_src: str, plugin_root: str = None) -> Dict[str, Dict]:
    """Scan ohos/src for requireNativeComponent (old-arch UI).
    
    改进：
    - 追踪导入链，提取 Props 和 Events
    - 从 Android/iOS 原生代码提取 @ReactProp / RCT_EXPORT_VIEW_PROPERTY
    """
    components: Dict[str, Dict] = {}
    
    # 第一步：找到所有 requireNativeComponent 定义
    for dirpath, dirnames, filenames in os.walk(ohos_src):
        dirnames[:] = [d for d in dirnames if not d.startswith(".") and d not in ("node_modules", "specs")]
        
        for fn in filenames:
            ext = os.path.splitext(fn)[1].lower()
            if ext not in _SOURCE_EXTS:
                continue
            
            file_path = os.path.join(dirpath, fn)
            content = _read_file(file_path)
            
            for var_name, component_name in _find_require_native_component_usages(content):
                if component_name not in components:
                    components[component_name] = {
                        "var_name": var_name,
                        "export_file": file_path,
                        "files": [file_path],
                        "props": [],
                        "events": [],
                    }
                else:
                    components[component_name]["files"].append(file_path)
    
    # 第二步：追踪导入链，提取 Props 和 Events
    for component_name, info in components.items():
        export_file = info.get("export_file", "")
        export_basename = os.path.splitext(os.path.basename(export_file))[0]
        
        # 找所有导入该组件的文件
        importers = _find_fabric_importers(ohos_src, export_basename)
        
        all_props = []
        all_events = []
        
        for importer_file, imported_var_name in importers:
            info["files"].append(importer_file)
            
            content = _read_file(importer_file)
            props, events = _extract_fabric_props_from_jsx(content, imported_var_name)
            
            all_props.extend(props)
            all_events.extend(events)
        
        # 也检查导出文件本身的 JSX 使用
        export_content = _read_file(export_file)
        export_props, export_events = _extract_fabric_props_from_jsx(export_content, info.get("var_name", component_name))
        all_props.extend(export_props)
        all_events.extend(export_events)
        
        # 第三步：从 Android/iOS 原生代码提取 props（补充）
        if plugin_root:
            android_props = _extract_props_from_android(plugin_root, component_name)
            all_props.extend(android_props)
            
            ios_props = _extract_props_from_ios(plugin_root, component_name)
            all_props.extend(ios_props)
        
        # 去重并保存
        info["props"] = _dedupe_props(all_props)
        info["events"] = list(set(all_events))
        
        if info["props"]:
            print(f"  [fabric props] {component_name}: {[p['name'] for p in info['props']]}")
        if info["events"]:
            print(f"  [fabric events] {component_name}: {info['events']}")
    
    return components


def analyze_nitro_modules_usages(ohos_src: str) -> Dict[str, Dict]:
    """Scan ohos/src for NitroModules.createHybridObject (need migrate to TurboModule).
    
    NitroModules hybrid objects need to be migrated to TurboModule specs.
    The API surface is similar to NativeModules, so we can reuse the extraction logic.
    """
    modules: Dict[str, Dict] = {}
    
    for dirpath, dirnames, filenames in os.walk(ohos_src):
        dirnames[:] = [d for d in dirnames if not d.startswith(".") and d not in ("node_modules", "specs")]
        
        for fn in filenames:
            ext = os.path.splitext(fn)[1].lower()
            if ext not in _SOURCE_EXTS:
                continue
            
            file_path = os.path.join(dirpath, fn)
            content = _read_file(file_path)
            
            for var_name, hybrid_name in _find_nitro_modules_usages(content):
                if hybrid_name not in modules:
                    modules[hybrid_name] = {
                        "var_name": var_name,
                        "export_file": file_path,
                        "files": [file_path],
                        "methods": [],
                        "constants": [],
                    }
                else:
                    modules[hybrid_name]["files"].append(file_path)
                
                # Extract method usages from this file
                file_methods, file_constants = _extract_usages(content, var_name)
                modules[hybrid_name]["methods"].extend(file_methods)
                modules[hybrid_name]["constants"].extend(file_constants)
                
                if file_methods:
                    print(f"  [nitro] {hybrid_name}: found {len(file_methods)} methods in {fn}")
    
    # Dedupe methods and constants for each module
    for hybrid_name, info in modules.items():
        info["methods"] = _dedupe_methods(info["methods"])
        info["constants"] = _merge_constants(info["constants"], [])
    
    return modules


def _dedupe_methods(methods: List[Dict]) -> List[Dict]:
    """Remove duplicate methods, keeping the first occurrence."""
    seen = set()
    result = []
    for method in methods:
        name = method.get("name", "")
        if name not in seen:
            seen.add(name)
            result.append(method)
    return result


def normalize_fabric_specs_in_dir(specs_dir: str) -> List[str]:
    """Fix codegenNativeComponent import in existing Fabric spec files."""
    from lib.fabric_spec_codegen import normalize_fabric_spec_content, uses_harmony_safe_codegen_import

    fixed: List[str] = []
    if not os.path.isdir(specs_dir):
        return fixed

    for dirpath, _, filenames in os.walk(specs_dir):
        for fn in filenames:
            if not fn.endswith((".ts", ".tsx")):
                continue
            path = os.path.join(dirpath, fn)
            content = _read_file(path)
            if "codegenNativeComponent" not in content:
                continue
            if uses_harmony_safe_codegen_import(content):
                continue
            new_content = normalize_fabric_spec_content(content)
            if new_content != content:
                _write_file(path, new_content)
                fixed.append(path)
    return fixed


def analyze_source_files(ohos_src: str) -> Dict[str, Dict]:
    """分析 ohos/src/ 目录下的源码
    
    改进：追踪跨文件导入链，正确提取方法签名
    """
    
    modules_info = {}
    export_files = {}  # module_name -> (file_path, basename, exported_name)
    
    # 第一步：找到所有导出 NativeModules.Xxx 的文件
    for dirpath, dirnames, filenames in os.walk(ohos_src):
        dirnames[:] = [d for d in dirnames if not d.startswith(".") and d not in ("node_modules", "specs")]
        
        for fn in filenames:
            ext = os.path.splitext(fn)[1].lower()
            if ext not in _SOURCE_EXTS:
                continue
            
            file_path = os.path.join(dirpath, fn)
            result = _find_file_exports_native_module(file_path)
            if result:
                module_name, basename, exported_name = result
                export_files[module_name] = (file_path, basename, exported_name)
                print(f"  [export] {basename}.js -> NativeModules.{module_name}")
    
    # 第二步：对于每个导出的模块，找所有导入它的文件并提取方法
    for module_name, (export_file, basename, exported_name) in export_files.items():
        importers = _find_importers_of_module(ohos_src, basename, exported_name)
        
        methods = []
        constants = []
        all_files = [export_file]
        file_var_names = {export_file: exported_name if exported_name != "default" else module_name}
        
        for importer_file, var_name in importers:
            all_files.append(importer_file)
            file_var_names[importer_file] = var_name
            content = _read_file(importer_file)
            
            # 使用导入时的变量名提取方法
            file_methods, file_constants = _extract_usages(content, var_name)
            methods.extend(file_methods)
            constants.extend(file_constants)
            
            if file_methods:
                print(f"  [import] {os.path.basename(importer_file)}: {var_name}.{file_methods[0]['name']}()")
        
        # 也检查导出文件本身是否有方法调用
        export_content = _read_file(export_file)
        export_var_name = exported_name if exported_name != "default" else module_name
        export_methods, export_constants = _extract_usages(export_content, export_var_name)
        methods.extend(export_methods)
        constants.extend(export_constants)
        
        # 尝试找 .d.ts 文件补充类型信息
        dts_file = None
        base = os.path.splitext(os.path.basename(export_file))[0]
        for dts_ext in (".d.ts", ".d.cts"):
            cand = os.path.join(os.path.dirname(export_file), base + dts_ext)
            if os.path.isfile(cand):
                dts_file = cand
                break
        
        methods_dts = []
        constants_dts = []
        if dts_file:
            dts_content = _read_file(dts_file)
            methods_dts, constants_dts = _extract_from_dts(dts_content, module_name)
        
        methods = _merge_type_info(methods, methods_dts)
        constants = _merge_constants(constants, constants_dts)
        
        modules_info[module_name] = {
            "var_name": module_name,
            "methods": methods,
            "constants": constants,
            "files": all_files,
            "export_file": export_file,
            "file_var_names": file_var_names,
        }
    
    # 第三步：处理非 export default 形式的 NativeModules 使用
    for dirpath, dirnames, filenames in os.walk(ohos_src):
        dirnames[:] = [d for d in dirnames if not d.startswith(".") and d not in ("node_modules", "specs")]
        
        for fn in filenames:
            ext = os.path.splitext(fn)[1].lower()
            if ext not in _SOURCE_EXTS:
                continue
            
            file_path = os.path.join(dirpath, fn)
            content = _read_file(file_path)
            
            # 跳过已经处理的 export default 文件
            if file_path in [info.get("export_file") for info in modules_info.values()]:
                continue
            
            module_names = _find_native_modules_usage(content)
            
            for module_info in module_names:
                module_name = module_info["name"]
                
                var_name = _find_module_variable_name(content, module_name)
                methods_js, constants_js = _extract_usages(content, var_name)
                
                dts_file = None
                base = os.path.splitext(fn)[0]
                for dts_ext in (".d.ts", ".d.cts"):
                    cand = os.path.join(dirpath, base + dts_ext)
                    if os.path.isfile(cand):
                        dts_file = cand
                        break
                
                methods_dts = []
                constants_dts = []
                if dts_file:
                    dts_content = _read_file(dts_file)
                    methods_dts, constants_dts = _extract_from_dts(dts_content, module_name)
                
                methods = _merge_type_info(methods_js, methods_dts)
                constants = _merge_constants(constants_js, constants_dts)
                
                # 合并到已有的模块信息（而非跳过）
                if module_name not in modules_info:
                    modules_info[module_name] = {
                        "var_name": var_name,
                        "methods": methods,
                        "constants": constants,
                        "files": [file_path]
                    }
                else:
                    # 合并方法和常量
                    modules_info[module_name]["methods"] = _merge_type_info(
                        modules_info[module_name]["methods"], methods
                    )
                    modules_info[module_name]["constants"] = _merge_constants(
                        modules_info[module_name]["constants"], constants
                    )
                    modules_info[module_name]["files"].append(file_path)
    
    return modules_info


def run_migration(plugin_root: str) -> Dict[str, Any]:
    """执行迁移"""
    
    results = {
        "success": True,
        "spec_files": [],
        "js_files_modified": [],
        "errors": [],
    }
    
    ohos_dir = os.path.join(plugin_root, "ohos")
    ohos_src = os.path.join(ohos_dir, "src")
    specs_v1_dir = os.path.join(ohos_src, "specs", "v1")
    
    if not os.path.isdir(ohos_src):
        results["errors"].append(f"ohos/src 目录不存在: {ohos_src}")
        results["success"] = False
        return results
    
    print("\n--- analyze source files ---")
    modules_info = analyze_source_files(ohos_src)
    
    fabric_info = analyze_fabric_usages(ohos_src, plugin_root)
    
    nitro_info = analyze_nitro_modules_usages(ohos_src)

    if not modules_info and not fabric_info and not nitro_info:
        print("  no NativeModules, requireNativeComponent, or NitroModules usage found")
    elif not modules_info and not nitro_info:
        print("  no NativeModules or NitroModules usage found")
    else:
        print(f"  found {len(modules_info)} NativeModules: {list(modules_info.keys())}")

    if nitro_info:
        print(f"  found {len(nitro_info)} NitroModules: {list(nitro_info.keys())}")

    if fabric_info:
        print(f"  found {len(fabric_info)} requireNativeComponent: {list(fabric_info.keys())}")
    
    print(f"\n--- generate turbo spec files ---")

    for module_name, info in modules_info.items():
        methods = info.get("methods", [])
        constants = info.get("constants", [])
        
        spec_content = _generate_turbo_spec(module_name, methods, constants)
        spec_filename = f"Native{module_name}.ts"
        spec_path = os.path.join(specs_v1_dir, spec_filename)
        
        _write_file(spec_path, spec_content)
        results["spec_files"].append(spec_path)
        
        print(f"  generated: specs/v1/{spec_filename}")
        print(f"    methods: {len(methods)}, constants: {len(constants)}")
    
    if nitro_info:
        print(f"\n--- generate nitro spec files (migrate to TurboModule) ---")
        
        for hybrid_name, info in nitro_info.items():
            methods = info.get("methods", [])
            constants = info.get("constants", [])
            
            spec_content = _generate_turbo_spec(hybrid_name, methods, constants)
            spec_filename = f"Native{hybrid_name}.ts"
            spec_path = os.path.join(specs_v1_dir, spec_filename)
            
            _write_file(spec_path, spec_content)
            results["spec_files"].append(spec_path)
            
            print(f"  generated: specs/v1/{spec_filename}")
            print(f"    methods: {len(methods)}, constants: {len(constants)}")
    
    if fabric_info:
        print(f"\n--- generate fabric spec files ---")
        from lib.fabric_spec_codegen import fabric_spec_filename

        for component_name, info in fabric_info.items():
            spec_filename = fabric_spec_filename(component_name)
            spec_path = os.path.join(specs_v1_dir, spec_filename)
            if not os.path.isfile(spec_path):
                props = info.get("props", [])
                events = info.get("events", [])
                spec_content = _generate_fabric_spec(component_name, props=props, events=events)
                _write_file(spec_path, spec_content)
                results["spec_files"].append(spec_path)
                print(f"  generated: specs/v1/{spec_filename}")
                print(f"    props: {len(props)}, events: {len(events)}")
            else:
                print(f"  skip existing: specs/v1/{spec_filename}")

    print(f"\n--- normalize fabric spec imports ---")
    fixed_specs = normalize_fabric_specs_in_dir(specs_v1_dir)
    for path in fixed_specs:
        rel = os.path.relpath(path, ohos_src)
        print(f"  fixed import: {rel}")
        if path not in results["spec_files"]:
            results["spec_files"].append(path)

    print(f"\n--- modify js imports ---")

    for module_name, info in modules_info.items():
        var_name = info.get("var_name", module_name)
        constants = info.get("constants", [])
        files = info.get("files", [])
        file_var_names = info.get("file_var_names", {})
        
        for file_path in files:
            content = _read_file(file_path)
            file_var_name = file_var_names.get(file_path, var_name)
            
            # 只有代码中仍有 NativeModules 时才需要迁移
            if "NativeModules" in content:
                new_content = _modify_js_import(content, module_name, file_var_name, constants)
            else:
                new_content = _modify_js_alias_usages(content, file_var_name, constants)
            
            if new_content != content:
                _write_file(file_path, new_content)
                rel_path = os.path.relpath(file_path, ohos_src)
                results["js_files_modified"].append(file_path)
                print(f"  modified: {rel_path}")
    
    if nitro_info:
        print(f"\n--- modify js for nitro (migrate to TurboModule) ---")
        
        for hybrid_name, info in nitro_info.items():
            var_name = info.get("var_name", hybrid_name)
            constants = info.get("constants", [])
            files = info.get("files", [])
            
            for file_path in files:
                content = _read_file(file_path)
                
                if "NitroModules" not in content:
                    continue
                
                new_content = _modify_js_for_nitro(content, hybrid_name, var_name, constants)
                
                if new_content != content:
                    _write_file(file_path, new_content)
                    rel_path = os.path.relpath(file_path, ohos_src)
                    results["js_files_modified"].append(file_path)
                    print(f"  modified: {rel_path}")

    if fabric_info:
        print(f"\n--- modify js for fabric ---")
        from lib.fabric_spec_codegen import fabric_spec_filename

        for component_name, info in fabric_info.items():
            spec_filename = fabric_spec_filename(component_name)
            for file_path in info.get("files", []):
                content = _read_file(file_path)
                if "requireNativeComponent" not in content:
                    continue
                var_name = info.get("var_name", component_name)
                new_content = _modify_js_for_fabric(
                    content, var_name, component_name, spec_filename
                )
                if new_content != content:
                    _write_file(file_path, new_content)
                    results["js_files_modified"].append(file_path)
                    rel_path = os.path.relpath(file_path, ohos_src)
                    print(f"  modified: {rel_path}")
    
    print(f"\n--- update codegen config ---")
    
    ohos_pkg_path = os.path.join(ohos_dir, "package.json")
    if os.path.isfile(ohos_pkg_path) and (modules_info or fabric_info or results["spec_files"]):
        parent_pkg_path = os.path.join(plugin_root, "package.json")
        parent_name = ""
        if os.path.isfile(parent_pkg_path):
            parent_pkg = _read_json(parent_pkg_path)
            parent_name = parent_pkg.get("name", "")
        
        from lib import package_merge
        short_name = package_merge.derive_package_short_name(parent_name)
        codegen_config = package_merge.generate_codegen_config_from_specs(ohos_dir, short_name)
        
        ohos_pkg = _read_json(ohos_pkg_path)
        scripts = ohos_pkg.get("scripts", {})
        if "codegen-lib" in scripts:
            scripts["codegen-lib"] = codegen_config
            ohos_pkg["scripts"] = scripts
            _write_json(ohos_pkg_path, ohos_pkg)
            print(f"  updated codegen-lib: {codegen_config}")
    
    return results


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
    import argparse
    
    parser = argparse.ArgumentParser(description="执行迁移：分析源码生成 Spec + 修改 import")
    parser.add_argument("--plugin-root", required=True, help="插件根目录")
    
    args = parser.parse_args()
    
    result = run_migration(args.plugin_root)
    print("\n" + json.dumps(result, indent=2, ensure_ascii=False))
