"""Fabric NativeComponent Spec helpers (Harmony-safe codegenNativeComponent import)."""

from __future__ import annotations

import re
from typing import Dict, List, Optional

# Metro 将 `from 'react-native'` 解析到 @react-native-oh/react-native-harmony，其主入口不导出 codegenNativeComponent。
CODEGEN_NATIVE_COMPONENT_IMPORT = (
    "import codegenNativeComponent from "
    "'react-native/Libraries/Utilities/codegenNativeComponent';"
)

VIEW_PROPS_TYPE_IMPORT = "import type { ViewProps } from 'react-native';"

_WRONG_CODEGEN_IMPORT_RE = re.compile(
    r"import\s*\{\s*codegenNativeComponent\s*\}\s*from\s*['\"]react-native['\"];?\s*\n?",
    re.MULTILINE,
)

_LEGACY_DEFAULT_CODEGEN_IMPORT_RE = re.compile(
    r"^import\s+codegenNativeComponent\s+from\s*['\"]react-native['\"];?\s*\n?",
    re.MULTILINE,
)


def normalize_fabric_spec_content(content: str) -> str:
    """Replace invalid codegenNativeComponent imports with Harmony-safe path."""
    updated = _WRONG_CODEGEN_IMPORT_RE.sub(CODEGEN_NATIVE_COMPONENT_IMPORT + "\n", content)
    updated = _LEGACY_DEFAULT_CODEGEN_IMPORT_RE.sub(
        CODEGEN_NATIVE_COMPONENT_IMPORT + "\n", updated
    )
    return updated


def uses_harmony_safe_codegen_import(content: str) -> bool:
    return "react-native/Libraries/Utilities/codegenNativeComponent" in content


def generate_fabric_native_component_spec(
    component_name: str,
    *,
    props: Optional[List[Dict]] = None,
    events: Optional[List[str]] = None,
    extra_prop_lines: Optional[List[str]] = None,
) -> str:
    """Generate Fabric spec with props and events.
    
    Args:
        component_name: Native component name (e.g., 'RNMonthPicker')
        props: List of prop definitions, each with 'name' and 'type'
        events: List of event names (e.g., ['onChange', 'onDone'])
        extra_prop_lines: Legacy parameter for custom prop lines
    """
    props_interface = f"{component_name}Props"
    
    prop_lines = []
    
    # 处理 props
    if props:
        for prop in props:
            prop_name = prop.get("name", "")
            prop_type = prop.get("type", "any")
            optional = prop.get("optional", True)
            optional_marker = "?" if optional else ""
            prop_lines.append(f"  {prop_name}{optional_marker}: {prop_type};")
    
    # 处理 events (onChange, onDone, etc.)
    if events:
        for event_name in events:
            # Fabric 事件通常是 DirectEventHandler
            prop_lines.append(f"  {event_name}?: DirectEventHandler<{event_name}Event>;")
    
    # 如果没有 props 和 events，使用 extra_prop_lines 或 TODO
    if not prop_lines:
        prop_lines = extra_prop_lines or ["  // TODO: add props from original component"]
    
    lines = [
        CODEGEN_NATIVE_COMPONENT_IMPORT,
        VIEW_PROPS_TYPE_IMPORT,
        "",
        f"export interface {props_interface} extends ViewProps {{",
        *prop_lines,
        "}",
        "",
    ]
    
    # 生成事件类型定义（如果有事件）
    if events:
        for event_name in events:
            lines.append(f"export interface {event_name}Event {{")
            lines.append(f"  // Event payload definition")
            lines.append("}")
            lines.append("")
    
    lines.extend([
        f"export default codegenNativeComponent<{props_interface}>(",
        f"  '{component_name}',",
        ");",
        "",
    ])
    
    return "\n".join(lines)


def fabric_spec_filename(component_name: str) -> str:
    return f"{component_name}NativeComponent.ts"
