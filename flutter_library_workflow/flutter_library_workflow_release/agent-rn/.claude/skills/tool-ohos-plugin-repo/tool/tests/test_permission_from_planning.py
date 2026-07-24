"""Tests for lib.permission_from_planning."""

from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

_SKILL_ROOT = Path(__file__).resolve().parents[2]
if str(_SKILL_ROOT) not in sys.path:
    sys.path.insert(0, str(_SKILL_ROOT))

from lib.permission_from_planning import (  # noqa: E402
    apply_permissions_from_planning,
    load_planning_permissions,
    merge_module_json5_permissions,
    permission_reason_key,
    render_module_json5_permissions_block,
)


class TestPermissionFromPlanning(unittest.TestCase):
    def test_permission_reason_key(self):
        self.assertEqual(
            permission_reason_key("ohos.permission.ACCESS_BLUETOOTH"),
            "permission_access_bluetooth_reason",
        )

    def test_load_planning_permissions(self):
        planning = {
            "permission_mapping": [
                {
                    "ohos_permission": "ohos.permission.USE_BLUETOOTH",
                    "needs_user_grant": False,
                },
                {
                    "ohos_permission": "ohos.permission.ACCESS_BLUETOOTH",
                    "grant_type": "user_grant",
                    "notes": "控制蓝牙开关",
                },
            ]
        }
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "02-planning.json"
            path.write_text(json.dumps(planning), encoding="utf-8")
            system, user = load_planning_permissions(path)
        self.assertEqual(len(system), 1)
        self.assertEqual(len(user), 1)
        self.assertTrue(user[0].needs_user_grant)

    def test_merge_empty_request_permissions(self):
        from lib.permission_from_planning import PermissionEntry

        block = render_module_json5_permissions_block(
            [],
            [PermissionEntry("ohos.permission.ACCESS_BLUETOOTH", True, "x")],
        )
        out = merge_module_json5_permissions(
            '{\n    "requestPermissions": []\n}',
            block,
        )
        self.assertIn("ACCESS_BLUETOOTH", out)
        self.assertIn("permission_access_bluetooth_reason", out)

    def test_apply_end_to_end(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            adapt = root / ".rn-ohos-adaptation"
            adapt.mkdir()
            (adapt / "02-planning.json").write_text(
                json.dumps(
                    {
                        "permission_mapping": [
                            {
                                "ohos_permission": "ohos.permission.ACCESS_BLUETOOTH",
                                "needs_user_grant": True,
                                "notes": "蓝牙控制",
                            }
                        ]
                    }
                ),
                encoding="utf-8",
            )
            har = root / "ohos" / "harmony" / "demo"
            (har / "src" / "main" / "resources" / "base" / "element").mkdir(parents=True)
            (har / "src" / "main" / "ets").mkdir(parents=True)
            (har / "src" / "main" / "module.json5").write_text(
                '{\n  "module": {\n    "name": "demo",\n    "requestPermissions": []\n  }\n}',
                encoding="utf-8",
            )
            (har / "src" / "main" / "resources" / "base" / "element" / "string.json").write_text(
                '{"string": [{"name": "page_show", "value": "x"}]}',
                encoding="utf-8",
            )
            ok = apply_permissions_from_planning(str(root), "demo")
            self.assertTrue(ok)
            mod = (har / "src" / "main" / "module.json5").read_text(encoding="utf-8")
            self.assertIn("ACCESS_BLUETOOTH", mod)
            helper = (har / "src" / "main" / "ets" / "PermissionHelper.ets").read_text(encoding="utf-8")
            self.assertIn("requestPermissionsFromUser", helper)
            readme = (har / "PERMISSIONS.md").read_text(encoding="utf-8")
            self.assertIn("user_grant", readme)


if __name__ == "__main__":
    unittest.main()
