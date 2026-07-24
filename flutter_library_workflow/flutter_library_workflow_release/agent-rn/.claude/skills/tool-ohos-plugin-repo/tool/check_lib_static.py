#!/usr/bin/env python3
"""
静态检查 Library 代码（03 阶段门禁）：
1) HAR 包生成检查：
   - 校验 harmony/{short_name}/build/default/outputs/default/{short_name}.har 存在
   - 校验 HAR 文件修改时间在最近 24 小时内（确保是本次编译产物，非旧缓存）
2) module.json5 权限声明完整性（对照 02-planning）：
   - 从 .rn-ohos-adaptation/02-planning.json 的 permission_mapping 提取全部 ohos_permission
   - 校验 harmony/*/src/main/module.json5 的 requestPermissions 已声明对应权限
3) user_grant 权限动态申请检查：
   - 从 permission_mapping 中提取 needs_user_grant=true 的权限
   - 校验库侧 ETS 实现中存在 requestPermissionsFromUser + 对应权限字符串
4) 原生 API 调用异常日志门禁（便于 onDeviceTest/hilog 归因）：
   - 若 ETS/TS 源码导入了 `@kit.*` 或 `@ohos.*`，则必须包含 try/catch
   - 且必须使用 `hilog.*` 记录异常（避免失败后无日志可查）
5) 禁止 Not implemented throw：
   - 禁止 `throw new Error('Not implemented')`（或同义写法），未实现接口必须走 03 产物的 `not_implemented`，不要在运行时直接抛这种占位异常。
6) module.json5 权限 reason 资源引用检查：
   - harmony/*/src/main/module.json5 中 requestPermissions 的 reason: "$string:xxx"
   - 校验 harmony/*/src/main/resources/base/element/string.json 中存在同名 string 资源

用法（在插件仓库根目录）：
    python .claude/skills/tool-ohos-plugin-repo/tool/check_lib_static.py .

退出码：0 通过；1 失败；2 跳过（无 ohos 或无 planning）
"""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple

TAG = "[check-lib-static]"

# Load permissions_full.json for authoritative grant_type lookup
PERMISSIONS_DB_PATH = Path(__file__).parent / "permissions_full.json"
PERMISSIONS_DB: Optional[List[Dict]] = None

def load_permissions_db() -> Optional[List[Dict]]:
    global PERMISSIONS_DB
    if PERMISSIONS_DB is not None:
        return PERMISSIONS_DB
    try:
        PERMISSIONS_DB = json.loads(PERMISSIONS_DB_PATH.read_text(encoding="utf-8"))
        return PERMISSIONS_DB
    except Exception as e:
        fail(f"Failed to load {PERMISSIONS_DB_PATH}: {e}")
        return None

def get_permission_grant_type(permission_name: str) -> Optional[str]:
    db = load_permissions_db()
    if not db:
        return None
    for p in db:
        if p.get("name") == permission_name:
            return p.get("grant_type")
    return None


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
    for d in candidates:
        if (d / "package.json").exists():
            return d.resolve()
    return None


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def find_har_files(ohos_root: Path) -> List[Tuple[Path, str]]:
    """查找 HAR 包，支持两种路径：
    - 新路径: harmony/{short_name}/build/default/outputs/default/{short_name}.har
    - 旧路径: harmony/{short_name}.har
    
    Returns:
        List of (har_path, short_name) tuples
    """
    harmony_dir = ohos_root / "harmony"
    if not harmony_dir.exists():
        return []
    
    out: List[Tuple[Path, str]] = []
    for short in harmony_dir.iterdir():
        if not short.is_dir():
            continue
        if short.name in ("entry", "example"):
            continue
        # 新路径（build 产物）
        har_new = short / "build" / "default" / "outputs" / "default" / f"{short.name}.har"
        if har_new.exists():
            out.append((har_new.resolve(), short.name))
            continue
        # 旧路径（直接在 harmony 下）
        har_old = harmony_dir / f"{short.name}.har"
        if har_old.exists():
            out.append((har_old.resolve(), short.name))
    return sorted(out, key=lambda x: x[1])


def check_har_generation(ohos_root: Path, has_native_modules: bool) -> List[str]:
    """检查 HAR 包是否存在且比源码更新
    
    Args:
        ohos_root: ohos 目录路径
        has_native_modules: 是否有原生模块（根据 module_files 判断）
    
    Returns:
        错误列表
    """
    errors: List[str] = []
    har_files = find_har_files(ohos_root)
    
    # 无原生模块时跳过 HAR 检查
    if not has_native_modules:
        return errors
    
    # 有原生模块但无 HAR 包 → 报错
    if not har_files:
        # 从 module_files 获取模块名
        lib_names = []
        harmony_dir = ohos_root / "harmony"
        if harmony_dir.exists():
            for d in harmony_dir.iterdir():
                if d.is_dir() and d.name not in ("entry", "example"):
                    lib_names.append(d.name)
        errors.append(
            f"HAR 包不存在: 原生模块需要编译 HAR 包，可能未执行 `rn.py build har` 或编译失败 "
            f"(请检查 ohos/harmony/{lib_names[0] if lib_names else 'xxx'}/build/default/outputs/default/ 目录)"
        )
        return errors
    
    for har_path, short_name in har_files:
        if not har_path.exists():
            errors.append(
                f"HAR 包不存在: harmony/{short_name}/build/default/outputs/default/{short_name}.har "
                f"(请先执行 `rn.py build har`)"
            )
            continue
        
        har_mtime = har_path.stat().st_mtime
        
        # 检查 ETS 源码是否有比 HAR 更新的修改
        module_json5 = ohos_root / "harmony" / short_name / "src" / "main" / "module.json5"
        ets_files = find_ets_sources_for_module(module_json5) if module_json5.exists() else []
        
        newer_sources: List[str] = []
        for src in ets_files:
            if src.stat().st_mtime > har_mtime:
                newer_sources.append(src.name)
        
        if newer_sources:
            errors.append(
                f"HAR 包过期: harmony/{short_name}.har 比源码旧 "
                f"(以下源码修改后未重新编译: {', '.join(sorted(newer_sources)[:5])}) "
                f"请重新执行 `rn.py build har`"
            )
    
    return errors


def find_lib_module_json5_files(ohos_root: Path) -> List[Path]:
    harmony_dir = ohos_root / "harmony"
    if not harmony_dir.exists():
        return []
    out: List[Path] = []
    for short in harmony_dir.iterdir():
        if not short.is_dir():
            continue
        # 排除 example 的 entry 与常见模板目录名
        if short.name in ("entry", "example"):
            continue
        p = short / "src" / "main" / "module.json5"
        if p.exists():
            out.append(p.resolve())
    return sorted(out)


def _load_planning(repo_root: Path) -> Tuple[Optional[dict], Optional[str]]:
    planning = repo_root / ".rn-ohos-adaptation" / "02-planning.json"
    if not planning.exists():
        return None, "no_planning"
    try:
        return json.loads(read_text(planning)), None
    except Exception as e:
        return None, f"planning_json_parse_error: {e}"


def parse_permission_mapping_all(repo_root: Path) -> Tuple[Optional[Set[str]], Optional[str]]:
    """从 02-planning.json permission_mapping 提取全部需声明的 ohos_permission。"""
    data, err = _load_planning(repo_root)
    if data is None:
        return None, err

    perms: Set[str] = set()
    for item in data.get("permission_mapping", []) or []:
        if not isinstance(item, dict):
            continue
        perm = item.get("ohos_permission")
        if isinstance(perm, str) and perm.strip():
            perms.add(perm.strip())
    return perms, None


def parse_permission_mapping_user_grant(repo_root: Path) -> Tuple[Optional[Set[str]], Optional[str]]:
    """从 permission_mapping 提取 user_grant 权限。
    
    不信任 02-planning.json 的 needs_user_grant 字段，
    而是从 permissions_full.json 查找实际授权方式。
    """
    data, err = _load_planning(repo_root)
    if data is None:
        return None, err

    perms: Set[str] = set()
    for item in data.get("permission_mapping", []) or []:
        if not isinstance(item, dict):
            continue
        perm = item.get("ohos_permission")
        if isinstance(perm, str) and perm.strip():
            # Query authoritative grant_type from permissions_full.json
            grant_type = get_permission_grant_type(perm.strip())
            if grant_type == "user_grant":
                perms.add(perm.strip())
    return perms, None


def extract_request_permissions(module_json5_text: str) -> List[Dict[str, str]]:
    # 先抽取 requestPermissions: [ ... ] 的数组文本，再按花括号深度切分每个 entry。
    #
    # 关键点：数组内可能嵌套 `usedScene: { abilities: ["EntryAbility"], ... }`
    # 若用 `\[([\s\S]*?)\]` 这种正则，会在遇到 abilities 的 `]` 时提前截断。
    key_m = re.search(r'(?:\"requestPermissions\"|requestPermissions)\s*:\s*\[', module_json5_text)
    if not key_m:
        return []
    arr_start = module_json5_text.find("[", key_m.end() - 1)
    if arr_start < 0:
        return []

    # 扫描到与 arr_start 匹配的 `]`（忽略字符串里的括号）
    depth = 0
    in_str: Optional[str] = None
    escaped = False
    arr_end = -1
    for i in range(arr_start, len(module_json5_text)):
        ch = module_json5_text[i]
        if in_str:
            if escaped:
                escaped = False
                continue
            if ch == "\\":
                escaped = True
                continue
            if ch == in_str:
                in_str = None
            continue

        if ch in ("'", '"'):
            in_str = ch
            continue
        if ch == "[":
            depth += 1
            continue
        if ch == "]":
            depth -= 1
            if depth == 0:
                arr_end = i
                break
            continue

    if arr_end < 0:
        return []

    block = module_json5_text[arr_start + 1 : arr_end]
    out: List[Dict[str, str]] = []

    entries: List[str] = []
    depth = 0
    start = -1
    for i, ch in enumerate(block):
        if ch == "{":
            if depth == 0:
                start = i
            depth += 1
        elif ch == "}":
            if depth > 0:
                depth -= 1
                if depth == 0 and start >= 0:
                    entries.append(block[start : i + 1])
                    start = -1

    name_re = re.compile(r'(?:"name"|name)\s*:\s*"([^"]+)"')
    reason_re = re.compile(r'(?:"reason"|reason)\s*:\s*"([^"]+)"')

    for entry in entries:
        nm = name_re.search(entry)
        if not nm:
            continue
        name = nm.group(1).strip()
        rm = reason_re.search(entry)
        reason = rm.group(1).strip() if rm else ""
        if name:
            out.append({"name": name, "reason": reason})
    return out


def extract_string_keys_from_reason(reason_value: str) -> Optional[str]:
    # "$string:xxx"
    m = re.match(r"^\$string:([A-Za-z0-9_]+)$", reason_value.strip())
    return m.group(1) if m else None


def read_string_json_keys(string_json_path: Path) -> Set[str]:
    if not string_json_path.exists():
        return set()
    try:
        data = json.loads(read_text(string_json_path))
    except Exception:
        return set()
    keys: Set[str] = set()
    for item in data.get("string", []) or []:
        if isinstance(item, dict) and isinstance(item.get("name"), str):
            keys.add(item["name"])
    return keys


def find_ets_sources_for_module(module_json5_path: Path) -> List[Path]:
    # harmony/<short>/src/main/ets/**/*.(ets|ts)
    # 注意：很多仓库用 .ts 写 ArkTS（并非仅 .ets）
    ets_root = module_json5_path.parent / "ets"
    if not ets_root.exists():
        return []
    out: List[Path] = []
    out.extend([p for p in ets_root.rglob("*.ets") if p.is_file()])
    out.extend([p for p in ets_root.rglob("*.ts") if p.is_file()])
    return sorted(set(out))


def check_user_grant_request_in_ets(module_json5_path: Path, needed_user_grant: Set[str]) -> List[str]:
    errors: List[str] = []
    ets_files = find_ets_sources_for_module(module_json5_path)
    if not ets_files:
        return errors
    merged = "\n".join(read_text(p) for p in ets_files)

    # 只对 planning 明确标记 needs_user_grant=true 的权限做强校验
    for perm in sorted(needed_user_grant):
        if perm not in merged:
            errors.append(
                f"{module_json5_path}: missing permission string '{perm}' in ETS sources "
                f"(expected runtime request/check before calling protected APIs) "
                f"See .claude/skills/ohos-coding-guide/permission-request.md"
            )
    if needed_user_grant:
        if "requestPermissionsFromUser" not in merged:
            errors.append(
                f"{module_json5_path}: permission_mapping has user_grant perms {sorted(needed_user_grant)}, "
                f"but ETS sources have no requestPermissionsFromUser() call "
                f"See .claude/skills/ohos-coding-guide/permission-request.md"
            )
        if "checkAccessToken" not in merged:
            errors.append(
                f"{module_json5_path}: permission_mapping has user_grant perms {sorted(needed_user_grant)}, "
                f"but ETS sources have no checkAccessToken() call "
                f"See .claude/skills/ohos-coding-guide/permission-request.md"
            )
    return errors


def check_native_calls_try_catch_and_hilog(module_json5_path: Path) -> List[str]:
    """Check native API calls are wrapped in try/catch with hilog logging.

    Precise (best-effort, non-AST):
    - Detect identifiers imported from '@kit.*' / '@ohos.*'
    - For each `<ident>.<method>(...)` call site, require:
      1) call site is inside a `try { ... }` block
      2) the corresponding `catch { ... }` (or `catch(e) { ... }`) contains `hilog.`
    """
    errors: List[str] = []
    ets_files = find_ets_sources_for_module(module_json5_path)
    if not ets_files:
        return errors

    # IMPORTANT: this regex must run on raw code (strings preserved),
    # because the stripper removes string literals (module specifiers).
    native_from_re = re.compile(r"from\s+['\"]@(kit|ohos)\.[^'\"]+['\"]")

    def strip_strings_and_comments(src: str) -> str:
        # Remove //... and /*...*/ comments, and string contents ("", '', ``) to avoid false brace matches.
        out = []
        i = 0
        n = len(src)
        in_line = False
        in_block = False
        in_str: Optional[str] = None
        escaped = False
        while i < n:
            ch = src[i]
            nxt = src[i + 1] if i + 1 < n else ""
            if in_line:
                if ch == "\n":
                    in_line = False
                    out.append(ch)
                else:
                    out.append(" ")
                i += 1
                continue
            if in_block:
                if ch == "*" and nxt == "/":
                    in_block = False
                    out.append(" ")
                    out.append(" ")
                    i += 2
                else:
                    out.append(" " if ch != "\n" else "\n")
                    i += 1
                continue
            if in_str:
                if escaped:
                    escaped = False
                    out.append(" ")
                    i += 1
                    continue
                if ch == "\\":
                    escaped = True
                    out.append(" ")
                    i += 1
                    continue
                if ch == in_str:
                    in_str = None
                    out.append(" ")
                    i += 1
                    continue
                out.append(" " if ch != "\n" else "\n")
                i += 1
                continue

            if ch == "/" and nxt == "/":
                in_line = True
                out.append(" ")
                out.append(" ")
                i += 2
                continue
            if ch == "/" and nxt == "*":
                in_block = True
                out.append(" ")
                out.append(" ")
                i += 2
                continue
            if ch in ("'", '"', "`"):
                in_str = ch
                out.append(" ")
                i += 1
                continue

            out.append(ch)
            i += 1
        return "".join(out)

    def find_matching_brace(text: str, open_pos: int) -> int:
        if open_pos < 0 or open_pos >= len(text) or text[open_pos] != "{":
            return -1
        depth = 0
        i = open_pos
        while i < len(text):
            ch = text[i]
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    return i
            i += 1
        return -1

    def line_no(text: str, pos: int) -> int:
        return text[:pos].count("\n") + 1

    def parse_import_idents(code_raw: str) -> Set[str]:
        idents: Set[str] = set()
        # import { access as bt } from '@kit.X'
        for m in re.finditer(
            r"import\s+\{([^}]+)\}\s+from\s+['\"]@(kit|ohos)\.[^'\"]+['\"]",
            code_raw,
        ):
            inside = m.group(1)
            for part in inside.split(","):
                p = part.strip()
                if not p:
                    continue
                if p.startswith("type "):
                    continue
                as_m = re.match(r"^(\w+)\s+as\s+(\w+)$", p)
                idents.add(as_m.group(2) if as_m else p.replace("type ", "").strip())
        # import window from '@ohos.window'
        for m in re.finditer(
            r"import\s+(\w+)\s+from\s+['\"]@(kit|ohos)\.[^'\"]+['\"]",
            code_raw,
        ):
            idents.add(m.group(1))
        # import * as foo from '@ohos.xxx'
        for m in re.finditer(
            r"import\s+\*\s+as\s+(\w+)\s+from\s+['\"]@(kit|ohos)\.[^'\"]+['\"]",
            code_raw,
        ):
            idents.add(m.group(1))
        # hilog is the logging API itself; do not require wrapping hilog.* calls in try/catch.
        idents.discard("hilog")
        return {x for x in idents if x}

    def collect_try_catch_regions(code_raw: str, code_stripped: str) -> List[Dict]:
        regions = []
        for m in re.finditer(r"\btry\s*\{", code_stripped):
            try_open = code_stripped.find("{", m.end() - 1)
            try_close = find_matching_brace(code_stripped, try_open)
            if try_open < 0 or try_close < 0:
                continue
            after = code_stripped[try_close + 1 :]
            catch_m = re.search(r"\bcatch\b\s*(?:\([^)]*\)\s*)?\{", after)
            if not catch_m:
                continue
            catch_open_global = (try_close + 1) + catch_m.start()
            catch_open = code_stripped.find("{", catch_open_global)
            catch_close = find_matching_brace(code_stripped, catch_open)
            if catch_open < 0 or catch_close < 0:
                continue
            catch_raw = code_raw[catch_open : catch_close + 1]
            regions.append(
                {
                    "try_body_start": try_open + 1,
                    "try_body_end": try_close,
                    "catch_body_start": catch_open + 1,
                    "catch_body_end": catch_close,
                    "catch_has_hilog": ("hilog." in catch_raw),
                }
            )
        return regions

    for f in ets_files:
        raw = read_text(f)
        stripped = strip_strings_and_comments(raw)
        if not native_from_re.search(raw):
            continue

        idents = parse_import_idents(raw)
        if not idents:
            continue

        regions = collect_try_catch_regions(raw, stripped)

        # Find call sites like ident.method(
        for ident in sorted(idents):
            if ident == "hilog":
                continue
            call_re = re.compile(rf"\b{re.escape(ident)}\.(\w+)\s*\(")
            for cm in call_re.finditer(stripped):
                pos = cm.start()
                method = cm.group(1)
                containing = [
                    r
                    for r in regions
                    if r["try_body_start"] <= pos <= r["try_body_end"]
                ]
                if not containing:
                    errors.append(
                        f"{f}:{line_no(stripped, pos)}: native call {ident}.{method}() not inside try {{}} "
                        f"(wrap each @kit/@ohos call with try/catch and log via hilog)"
                    )
                    continue
                if not any(r["catch_has_hilog"] for r in containing):
                    errors.append(
                        f"{f}:{line_no(stripped, pos)}: native call {ident}.{method}() inside try/catch but catch has no hilog.* "
                        f"(log exception for hilog-based triage)"
                    )
    return errors


def check_planning_permissions_declared(
    module_json5_path: Path,
    required_permissions: Set[str],
) -> List[str]:
    """校验 module.json5 已声明 02-planning 要求的全部权限。"""
    if not required_permissions:
        return []

    content = read_text(module_json5_path)
    declared = {p["name"] for p in extract_request_permissions(content)}
    errors: List[str] = []
    for perm in sorted(required_permissions):
        if perm not in declared:
            errors.append(
                f"{module_json5_path}: missing requestPermissions entry for '{perm}' "
                f"(required by 02-planning.json permission_mapping)"
            )
    return errors


def check_reason_string_resources(module_json5_path: Path) -> List[str]:
    errors: List[str] = []
    content = read_text(module_json5_path)
    perms = extract_request_permissions(content)
    if not perms:
        return errors

    string_json = module_json5_path.parent / "resources" / "base" / "element" / "string.json"
    keys = read_string_json_keys(string_json)

    for p in perms:
        reason = p.get("reason", "")
        if not reason:
            continue
        key = extract_string_keys_from_reason(reason)
        if not key:
            continue
        if key not in keys:
            errors.append(
                f"{module_json5_path}: requestPermissions reason references {reason} but not found in {string_json}"
            )
    return errors


def check_no_not_implemented_throw(module_json5_path: Path) -> List[str]:
    """Fail if code throws placeholder Not implemented errors at runtime."""
    errors: List[str] = []
    ets_files = find_ets_sources_for_module(module_json5_path)
    if not ets_files:
        return errors

    # match:
    # - throw new Error('Not implemented')
    # - throw new Error("Not implemented")
    # - throw Error('Not implemented')
    # - throw new Error(`Not implemented`)
    pat = re.compile(
        r"throw\s+(?:new\s+)?Error\s*\(\s*([`'\"])\s*Not\s+implemented\s*\1\s*\)",
        re.IGNORECASE,
    )
    for f in ets_files:
        raw = read_text(f)
        for m in pat.finditer(raw):
            ln = raw[: m.start()].count("\n") + 1
            errors.append(
                f"{f}:{ln}: forbidden placeholder throw Error('Not implemented') "
                f"(mark method as not_implemented in 03 output or implement it; do not crash at runtime)"
            )
            break
    return errors


# TurboModule / Fabric Package 注册能力的特征方法名
_TURBO_SIGNALS = (
    "getUITurboModuleFactoryByNameMap",
    "createEagerUITurboModuleByNameMap",
    "getTurboModuleFactoryByNameMap",
)
_FABRIC_SIGNALS = (
    "createDescriptorWrapperFactoryByDescriptorType",
)


def _module_har_root(module_json5_path: Path) -> Path:
    # harmony/<short>/src/main/module.json5 -> harmony/<short>
    return module_json5_path.parent.parent.parent


def _resolve_har_index(har_root: Path) -> Optional[Path]:
    """从 oh-package.json5 的 main 解析 HAR 入口；缺省回退 index.ets / Index.ets。"""
    oh_pkg = har_root / "oh-package.json5"
    if oh_pkg.exists():
        m = re.search(r'["\']?main["\']?\s*:\s*["\']([^"\']+)["\']', read_text(oh_pkg))
        if m:
            cand = (har_root / m.group(1)).resolve()
            if cand.exists():
                return cand
    for name in ("index.ets", "Index.ets", "index.ts"):
        cand = har_root / name
        if cand.exists():
            return cand.resolve()
    return None


def _resolve_default_export_file(index_path: Path, har_root: Path, depth: int = 0) -> Optional[Path]:
    """跟随 index 的 `export { X as default } from './path'` 解析出真正定义默认 Package 的文件（最多跟随 2 跳）。"""
    if depth > 2 or not index_path.exists():
        return index_path if index_path.exists() else None
    code = read_text(index_path)
    m = re.search(r"export\s*\{[^}]*\bas\s+default\b[^}]*\}\s*from\s*['\"]([^'\"]+)['\"]", code)
    if not m:
        m = re.search(r"export\s*\{\s*default\s*\}\s*from\s*['\"]([^'\"]+)['\"]", code)
    if not m:
        # 默认导出就在本文件（export default / export class ... default 由 import 处决定）
        return index_path
    rel = m.group(1)
    base = (index_path.parent / rel).resolve()
    for cand in (base, base.with_suffix(".ets"), base.with_suffix(".ts"),
                 Path(str(base) + ".ets"), Path(str(base) + ".ts")):
        if cand.exists() and cand.is_file():
            return _resolve_default_export_file(cand, har_root, depth + 1)
    return None


def check_har_export_completeness(module_json5_path: Path) -> List[str]:
    """库同时含 TurboModule 与 Fabric 组件时，index.ets 默认导出的 Package 必须二者注册俱全。

    0610 fast-image 案：库既有 Fabric 组件（GeneratedPackage 注册 Descriptor）又有 TurboModule
    （XxxTurboModulesFactory 注册），但 index.ets 仅 `export { GeneratedPackage as default }`，
    导致 example 拿到的 default Package 缺 TurboModule 注册 ->
    `Couldn't find Turbo Module 'X' on the ArkTS side` -> 白屏。
    """
    errors: List[str] = []
    ets_files = find_ets_sources_for_module(module_json5_path)
    if not ets_files:
        return errors

    has_turbo = False
    has_fabric = False
    for f in ets_files:
        code = read_text(f)
        if any(sig in code for sig in _TURBO_SIGNALS):
            has_turbo = True
        if any(sig in code for sig in _FABRIC_SIGNALS):
            has_fabric = True
    # 仅当库同时具备两种能力时才有“导出不全”的风险
    if not (has_turbo and has_fabric):
        return errors

    har_root = _module_har_root(module_json5_path)
    index_path = _resolve_har_index(har_root)
    if index_path is None:
        errors.append(
            f"harmony/{har_root.name}: 库同时含 TurboModule 与 Fabric 组件，但找不到 HAR 入口 index.ets "
            f"(oh-package.json5 的 main 或 index.ets) 来校验默认导出 Package 的完整性"
        )
        return errors

    pkg_file = _resolve_default_export_file(index_path, har_root)
    if pkg_file is None or not pkg_file.exists():
        errors.append(
            f"harmony/{har_root.name}/{index_path.name}: 无法解析默认导出的 Package 源文件，"
            f"请确认 `export {{ XxxPackage as default }} from './src/main/ets/...'` 指向真实文件"
        )
        return errors

    pkg_code = read_text(pkg_file)
    exp_turbo = any(sig in pkg_code for sig in _TURBO_SIGNALS)
    exp_fabric = any(sig in pkg_code for sig in _FABRIC_SIGNALS)
    missing = []
    if not exp_turbo:
        missing.append("TurboModule 注册（getUITurboModuleFactoryByNameMap / createEagerUITurboModuleByNameMap）")
    if not exp_fabric:
        missing.append("Fabric 组件注册（createDescriptorWrapperFactoryByDescriptorType）")
    if missing:
        try:
            pkg_rel = pkg_file.relative_to(har_root)
        except ValueError:
            pkg_rel = pkg_file.name
        errors.append(
            f"harmony/{har_root.name}: 库同时含 TurboModule 与 Fabric 组件，但 index 默认导出的 Package "
            f"({pkg_rel}) 缺少：{'; '.join(missing)}。"
            f" -> example 运行时会 `Couldn't find Turbo Module 'X' on the ArkTS side` 或 Fabric 组件不渲染 -> 白屏。"
            f" 修复：把两类注册合并进同一个 default 导出的 Package 类（参考 docs/rn_history 的 fast-image 案），"
            f"再 `rn.py build har` 重新编译。"
        )
    return errors


def main() -> None:
    repo_path = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("ADAPT_REPO", ".")
    repo = Path(repo_path).resolve()

    ohos_root = resolve_ohos_root(repo)
    if not ohos_root:
        log("Skipped: no ohos/ directory")
        sys.exit(2)

    required_permissions, planning_err = parse_permission_mapping_all(repo)
    if required_permissions is None:
        log(f"Skipped: {planning_err}")
        sys.exit(2)

    needed_user_grant, _ = parse_permission_mapping_user_grant(repo)
    if needed_user_grant is None:
        needed_user_grant = set()

    module_files = find_lib_module_json5_files(ohos_root)
    if not module_files:
        log("Skipped: no harmony/*/src/main/module.json5 found")
        sys.exit(2)

    all_errors: List[str] = []
    checked: List[str] = []
    
    # 检查 HAR 包生成（有原生模块时必须检查）
    has_native_modules = len(module_files) > 0
    har_errors = check_har_generation(ohos_root, has_native_modules)
    all_errors.extend(har_errors)
    
    for module_json5 in module_files:
        checked.append(str(module_json5))
        all_errors.extend(check_planning_permissions_declared(module_json5, required_permissions))
        all_errors.extend(check_native_calls_try_catch_and_hilog(module_json5))
        all_errors.extend(check_no_not_implemented_throw(module_json5))
        all_errors.extend(check_reason_string_resources(module_json5))
        all_errors.extend(check_user_grant_request_in_ets(module_json5, needed_user_grant))
        all_errors.extend(check_har_export_completeness(module_json5))

    if not all_errors:
        har_files = find_har_files(ohos_root)
        if har_files:
            har_names = [h[1] for h in har_files]
            log(
                f"Pass: checked {len(checked)} lib module(s), HAR: {har_names}, "
                f"planning perms: {sorted(required_permissions)}, "
                f"user_grant perms: {sorted(needed_user_grant)}"
            )
        else:
            log(
                f"Pass: checked {len(checked)} lib module(s) (js-only, no HAR), "
                f"planning perms: {sorted(required_permissions)}, "
                f"user_grant perms: {sorted(needed_user_grant)}"
            )
        sys.exit(0)

    fail("Failed:")
    for e in all_errors:
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

