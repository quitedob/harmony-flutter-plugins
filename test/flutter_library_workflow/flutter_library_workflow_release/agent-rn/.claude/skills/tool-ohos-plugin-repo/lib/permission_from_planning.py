"""Apply 02-planning.json permission_mapping to harmony HAR scaffold."""

from __future__ import annotations

import json
import os
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Callable, List, Optional, Tuple


@dataclass
class PermissionEntry:
    ohos_permission: str
    needs_user_grant: bool
    notes: str = ""


def load_planning_permissions(planning_path: Path) -> Tuple[List[PermissionEntry], List[PermissionEntry]]:
    if not planning_path.is_file():
        return [], []
    data = json.loads(planning_path.read_text(encoding="utf-8"))
    system: List[PermissionEntry] = []
    user: List[PermissionEntry] = []
    for item in data.get("permission_mapping", []) or []:
        if not isinstance(item, dict):
            continue
        perm = item.get("ohos_permission")
        if not isinstance(perm, str) or not perm.strip():
            continue
        entry = PermissionEntry(
            ohos_permission=perm.strip(),
            needs_user_grant=item.get("needs_user_grant") is True
            or item.get("grant_type") == "user_grant",
            notes=(item.get("notes") or "").strip(),
        )
        if entry.needs_user_grant:
            user.append(entry)
        else:
            system.append(entry)
    return system, user


def permission_reason_key(ohos_permission: str) -> str:
    # ohos.permission.ACCESS_BLUETOOTH -> permission_access_bluetooth_reason
    base = ohos_permission.replace("ohos.permission.", "").lower().replace(".", "_")
    return f"permission_{base}_reason"


def render_string_json_entries(perms: List[PermissionEntry]) -> List[dict]:
    out: List[dict] = []
    for p in perms:
        key = permission_reason_key(p.ohos_permission)
        value = p.notes or f"Permission for {p.ohos_permission}"
        out.append({"name": key, "value": value[:200]})
    return out


def render_module_json5_permissions_block(
    system: List[PermissionEntry],
    user: List[PermissionEntry],
) -> str:
    items: List[str] = []
    for p in system + user:
        lines = [
            "      {",
            f'        "name": "{p.ohos_permission}",',
        ]
        if p.needs_user_grant:
            key = permission_reason_key(p.ohos_permission)
            lines.append(f'        "reason": "$string:{key}",')
        lines.extend(
            [
                '        "usedScene": {',
                '          "abilities": ["EntryAbility"],',
                '          "when": "inuse"',
                "        }",
                "      }",
            ]
        )
        items.append("\n".join(lines))
    body = ",\n".join(items)
    return f'    "requestPermissions": [\n{body}\n    ]'


def _replace_bracketed_array(content: str, key: str, replacement: str) -> str:
    idx = content.find(key)
    if idx < 0:
        return content
    start = content.find("[", idx)
    if start < 0:
        return content
    depth = 0
    for i in range(start, len(content)):
        ch = content[i]
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                return content[:idx] + replacement.strip() + content[i + 1 :]
    return content


def merge_module_json5_permissions(content: str, block: str) -> str:
    """Replace or insert requestPermissions in module.json5."""
    key = '"requestPermissions"'
    if key in content:
        return _replace_bracketed_array(content, key, block)
    # insert before "abilities" if present
    anchor = '"abilities"'
    if anchor in content:
        return content.replace(anchor, f"{block.strip()},\n    {anchor}", 1)
    return content.replace(
        '"deliveryWithInstall": true,',
        f'"deliveryWithInstall": true,\n    {block.strip()},',
        1,
    )


def render_permission_helper_ets(user_perms: List[PermissionEntry]) -> str:
    const_lines = [f"  '{p.ohos_permission}'," for p in user_perms]
    const_block = "\n".join(const_lines) if const_lines else "  // none — no user_grant in planning"
    user_doc = "\n".join(f" *   - {p.ohos_permission}" for p in user_perms) or " *   - (none)"

    return (
        """/**
 * Auto-generated from 02-planning.json permission_mapping.
 *
 * user_grant — must request at runtime before calling related @kit/@ohos APIs:
"""
        + user_doc
        + """
 *
 * Usage in TurboModule:
 *   import { ensureUserGrantPermissions } from './PermissionHelper';
 *   const ok = await ensureUserGrantPermissions(this.ctx.uiAbilityContext as common.UIAbilityContext);
 */
import abilityAccessCtrl, { type Permissions } from '@ohos.abilityAccessCtrl';
import common from '@ohos.app.ability.common';
import { hilog } from '@kit.PerformanceAnalysisKit';

const LOG_DOMAIN = 0xFF00;
const LOG_TAG = 'PermissionHelper';

export const USER_GRANT_PERMISSIONS: Permissions[] = [
"""
        + const_block
        + """
];

export async function ensureUserGrantPermissions(
  context: common.UIAbilityContext,
  permissions: Permissions[] = USER_GRANT_PERMISSIONS,
): Promise<boolean> {
  if (!permissions.length) {
    return true;
  }
  const atManager = abilityAccessCtrl.createAtManager();
  try {
    for (const permission of permissions) {
      const grantStatus = await atManager.checkAccessToken(
        context.applicationInfo.accessTokenId,
        permission,
      );
      if (grantStatus !== abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
        hilog.info(LOG_DOMAIN, LOG_TAG, 'Requesting user_grant: %{public}s', permission);
        const result = await atManager.requestPermissionsFromUser(context, permissions);
        const ok = result.authResults.every((r: number) => r === 0);
        if (!ok) {
          hilog.warn(LOG_DOMAIN, LOG_TAG, 'User denied user_grant permissions');
        }
        return ok;
      }
    }
    return true;
  } catch (err) {
    hilog.error(LOG_DOMAIN, LOG_TAG, 'ensureUserGrantPermissions failed: %{public}s', String(err));
    return false;
  }
}
"""
    )


def render_permissions_readme(
    system: List[PermissionEntry],
    user: List[PermissionEntry],
) -> str:
    lines = [
        "# 鸿蒙权限说明（由 02-planning.json 生成）",
        "",
        "## system_grant（安装时授予，无需运行时申请）",
        "",
    ]
    if system:
        for p in system:
            lines.append(f"- `{p.ohos_permission}`")
    else:
        lines.append("- （无）")
    lines += [
        "",
        "## user_grant（必须在调用相关 API 前动态申请）",
        "",
        "请在 TurboModule 中调用 `PermissionHelper.ensureUserGrantPermissions()`，",
        "或在方法内使用 `checkAccessToken` + `requestPermissionsFromUser`。",
        "",
        "模板文件：`src/main/ets/PermissionHelper.ets`",
        "",
    ]
    if user:
        for p in user:
            lines.append(f"- `{p.ohos_permission}` — {p.notes or '需运行时申请'}")
    else:
        lines.append("- （无）")
    lines.append("")
    lines.append("修改权限映射请更新 `.rn-ohos-adaptation/02-planning.json` 后重新执行 create 或手动同步 module.json5。")
    return "\n".join(lines)


def apply_permissions_from_planning(
    plugin_root: str,
    short_name: str,
    *,
    log: Optional[Callable[[str], None]] = None,
) -> bool:
    """Apply planning permissions to harmony/{short_name} scaffold. Returns True if applied."""
    _log = log or (lambda _m: None)
    planning_path = Path(plugin_root) / ".rn-ohos-adaptation" / "02-planning.json"
    if not planning_path.is_file():
        _log(f"[permission-from-planning] skip: no {planning_path}")
        return False

    system, user = load_planning_permissions(planning_path)
    if not system and not user:
        _log("[permission-from-planning] skip: no permissions in planning")
        return False

    har_root = Path(plugin_root) / "ohos" / "harmony" / short_name
    if not har_root.is_dir():
        _log(f"[permission-from-planning] skip: harmony dir missing: {har_root}")
        return False

    ets_dir = har_root / "src" / "main" / "ets"
    res_dir = har_root / "src" / "main" / "resources" / "base" / "element"
    module_path = har_root / "src" / "main" / "module.json5"

    # string.json merge
    res_dir.mkdir(parents=True, exist_ok=True)
    string_path = res_dir / "string.json"
    existing_strings: List[dict] = []
    if string_path.is_file():
        try:
            existing_strings = json.loads(string_path.read_text(encoding="utf-8")).get("string", [])
        except json.JSONDecodeError:
            existing_strings = []
    existing_names = {s.get("name") for s in existing_strings if isinstance(s, dict)}
    new_strings = render_string_json_entries(system + user)
    merged_strings = list(existing_strings)
    for s in new_strings:
        if s["name"] not in existing_names:
            merged_strings.append(s)
    string_path.write_text(
        json.dumps({"string": merged_strings}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    _log(f"[permission-from-planning] updated {string_path}")

    # module.json5
    if module_path.is_file():
        content = module_path.read_text(encoding="utf-8")
        block = render_module_json5_permissions_block(system, user)
        content = merge_module_json5_permissions(content, block)
        module_path.write_text(content, encoding="utf-8")
        _log(f"[permission-from-planning] updated {module_path}")

    # PermissionHelper.ets
    ets_dir.mkdir(parents=True, exist_ok=True)
    helper_path = ets_dir / "PermissionHelper.ets"
    helper_path.write_text(render_permission_helper_ets(user), encoding="utf-8")
    _log(f"[permission-from-planning] wrote {helper_path}")

    readme_path = har_root / "PERMISSIONS.md"
    readme_path.write_text(render_permissions_readme(system, user), encoding="utf-8")
    _log(f"[permission-from-planning] wrote {readme_path}")

    _log(
        f"[permission-from-planning] applied: system_grant={len(system)}, "
        f"user_grant={len(user)} (runtime request required)"
    )
    return True
