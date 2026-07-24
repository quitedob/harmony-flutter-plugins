"""check_lib_static.py unit tests.

Run:
    python -m pytest tests/test_check_lib_static.py -v
Or:
    python tests/test_check_lib_static.py
"""

import json
import tempfile
import unittest
from pathlib import Path

import sys

sys.path.insert(0, str(Path(__file__).parent.parent))

from check_lib_static import (
    parse_permission_mapping_all,
    parse_permission_mapping_user_grant,
    check_planning_permissions_declared,
    check_native_calls_try_catch_and_hilog,
    check_no_not_implemented_throw,
    check_reason_string_resources,
    check_user_grant_request_in_ets,
    check_har_export_completeness,
)


def write_fixture(root: Path, files: dict) -> None:
    for rel, content in files.items():
        p = root / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        if isinstance(content, (dict, list)):
            p.write_text(json.dumps(content, indent=2) + "\n", encoding="utf-8")
        else:
            p.write_text(content, encoding="utf-8")


class TestCheckLibStatic(unittest.TestCase):
    def setUp(self):
        self.tmp_root = Path(tempfile.mkdtemp(prefix="check-lib-static-"))

    def tearDown(self):
        import shutil

        shutil.rmtree(self.tmp_root, ignore_errors=True)

    def test_skip_no_planning(self):
        repo = self.tmp_root / "no-planning"
        write_fixture(
            repo,
            {
                "ohos/package.json": {"name": "@oh-rn/demo", "version": "1.0.0"},
            },
        )
        perms, err = parse_permission_mapping_user_grant(repo)
        self.assertIsNone(perms)
        self.assertEqual(err, "no_planning")

    def test_planning_permission_missing_in_module_json5(self):
        repo = self.tmp_root / "planning-perm-missing"
        module_json5 = repo / "ohos" / "harmony" / "demo" / "src" / "main" / "module.json5"
        write_fixture(
            repo,
            {
                "ohos/package.json": {"name": "@oh-rn/demo", "version": "1.0.0"},
                ".rn-ohos-adaptation/02-planning.json": {
                    "permission_mapping": [
                        {
                            "ohos_permission": "ohos.permission.USE_BLUETOOTH",
                            "needs_user_grant": False,
                        },
                        {
                            "ohos_permission": "ohos.permission.ACCESS_BLUETOOTH",
                            "needs_user_grant": True,
                        },
                    ]
                },
                "ohos/harmony/demo/src/main/module.json5": """{
  "module": {
    "name": "demo",
    "type": "har",
    "requestPermissions": [
      { "name": "ohos.permission.USE_BLUETOOTH" }
    ]
  }
}
""",
            },
        )
        required, err = parse_permission_mapping_all(repo)
        self.assertIsNone(err)
        self.assertEqual(
            required,
            {"ohos.permission.USE_BLUETOOTH", "ohos.permission.ACCESS_BLUETOOTH"},
        )
        errors = check_planning_permissions_declared(module_json5, required)
        self.assertEqual(len(errors), 1)
        self.assertIn("ACCESS_BLUETOOTH", errors[0])
        self.assertIn("permission_mapping", errors[0])

    def test_planning_permission_pass_when_declared(self):
        repo = self.tmp_root / "planning-perm-pass"
        module_json5 = repo / "ohos" / "harmony" / "demo" / "src" / "main" / "module.json5"
        write_fixture(
            repo,
            {
                "ohos/package.json": {"name": "@oh-rn/demo", "version": "1.0.0"},
                ".rn-ohos-adaptation/02-planning.json": {
                    "permission_mapping": [
                        {"ohos_permission": "ohos.permission.USE_BLUETOOTH"},
                        {"ohos_permission": "ohos.permission.ACCESS_BLUETOOTH"},
                    ]
                },
                "ohos/harmony/demo/src/main/module.json5": """{
  "module": {
    "name": "demo",
    "type": "har",
    "requestPermissions": [
      { "name": "ohos.permission.USE_BLUETOOTH" },
      {
        "name": "ohos.permission.ACCESS_BLUETOOTH",
        "reason": "$string:bluetooth_access_reason",
        "usedScene": { "abilities": ["EntryAbility"], "when": "inuse" }
      }
    ]
  }
}
""",
            },
        )
        required, err = parse_permission_mapping_all(repo)
        self.assertIsNone(err)
        errors = check_planning_permissions_declared(module_json5, required)
        self.assertEqual(errors, [])

    def test_reason_string_resource_missing(self):
        repo = self.tmp_root / "reason-missing"
        module_json5 = repo / "ohos" / "harmony" / "demo" / "src" / "main" / "module.json5"
        write_fixture(
            repo,
            {
                "ohos/package.json": {"name": "@oh-rn/demo", "version": "1.0.0"},
                ".rn-ohos-adaptation/02-planning.json": {"permission_mapping": []},
                "ohos/harmony/demo/src/main/module.json5": """{
  "module": {
    "name": "demo",
    "type": "har",
    "requestPermissions": [
      {
        "name": "ohos.permission.ACCESS_BLUETOOTH",
        "reason": "$string:bluetooth_access_reason",
        "usedScene": { "abilities": ["EntryAbility"], "when": "inuse" }
      }
    ]
  }
}
""",
                # 故意缺失 bluetooth_access_reason
                "ohos/harmony/demo/src/main/resources/base/element/string.json": {
                    "string": [{"name": "other", "value": "x"}]
                },
                "ohos/harmony/demo/src/main/ets/Native.ets": "export const x = 1\n",
            },
        )
        errors = check_reason_string_resources(module_json5)
        self.assertEqual(len(errors), 1)
        self.assertIn("$string:bluetooth_access_reason", errors[0])

    def test_native_import_requires_try_catch_and_hilog(self):
        repo = self.tmp_root / "native-trycatch-missing"
        module_json5 = repo / "ohos" / "harmony" / "demo" / "src" / "main" / "module.json5"
        write_fixture(
            repo,
            {
                "ohos/package.json": {"name": "@oh-rn/demo", "version": "1.0.0"},
                ".rn-ohos-adaptation/02-planning.json": {"permission_mapping": []},
                "ohos/harmony/demo/src/main/module.json5": """{
  "module": { "name": "demo", "type": "har", "requestPermissions": [] }
}
""",
                "ohos/harmony/demo/src/main/ets/Native.ts": """
import { access } from '@kit.ConnectivityKit';
export function foo() { return access.getState(); }
""",
            },
        )
        errors = check_native_calls_try_catch_and_hilog(module_json5)
        self.assertTrue(any("not inside try" in e for e in errors))

    def test_native_import_pass_with_try_catch_and_hilog(self):
        repo = self.tmp_root / "native-trycatch-pass"
        module_json5 = repo / "ohos" / "harmony" / "demo" / "src" / "main" / "module.json5"
        write_fixture(
            repo,
            {
                "ohos/package.json": {"name": "@oh-rn/demo", "version": "1.0.0"},
                ".rn-ohos-adaptation/02-planning.json": {"permission_mapping": []},
                "ohos/harmony/demo/src/main/module.json5": """{
  "module": { "name": "demo", "type": "har", "requestPermissions": [] }
}
""",
                "ohos/harmony/demo/src/main/ets/Native.ts": """
import { access } from '@kit.ConnectivityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
export function foo() {
  try {
    return access.getState();
  } catch (e) {
    hilog.error(0xFF00, 'Demo', 'failed: %{public}s', String(e));
    return -1;
  }
}
""",
            },
        )
        errors = check_native_calls_try_catch_and_hilog(module_json5)
        self.assertEqual(errors, [])

    def test_native_import_try_catch_without_hilog_should_fail(self):
        repo = self.tmp_root / "native-trycatch-no-hilog"
        module_json5 = repo / "ohos" / "harmony" / "demo" / "src" / "main" / "module.json5"
        write_fixture(
            repo,
            {
                "ohos/package.json": {"name": "@oh-rn/demo", "version": "1.0.0"},
                ".rn-ohos-adaptation/02-planning.json": {"permission_mapping": []},
                "ohos/harmony/demo/src/main/module.json5": """{
  "module": { "name": "demo", "type": "har", "requestPermissions": [] }
}
""",
                "ohos/harmony/demo/src/main/ets/Native.ts": """
import { access } from '@kit.ConnectivityKit';
export function foo() {
  try {
    return access.getState();
  } catch (e) {
    return -1;
  }
}
""",
            },
        )
        errors = check_native_calls_try_catch_and_hilog(module_json5)
        self.assertTrue(any("catch has no hilog" in e for e in errors))

    def test_forbid_not_implemented_throw(self):
        repo = self.tmp_root / "not-impl-throw"
        module_json5 = repo / "ohos" / "harmony" / "demo" / "src" / "main" / "module.json5"
        write_fixture(
            repo,
            {
                "ohos/package.json": {"name": "@oh-rn/demo", "version": "1.0.0"},
                ".rn-ohos-adaptation/02-planning.json": {"permission_mapping": []},
                "ohos/harmony/demo/src/main/module.json5": """{
  "module": { "name": "demo", "type": "har", "requestPermissions": [] }
}
""",
                "ohos/harmony/demo/src/main/ets/Native.ts": """
export function foo() {
  throw new Error('Not implemented');
}
""",
            },
        )
        errors = check_no_not_implemented_throw(module_json5)
        self.assertTrue(any("Not implemented" in e for e in errors))

    def test_allow_non_placeholder_throw(self):
        repo = self.tmp_root / "non-placeholder-throw"
        module_json5 = repo / "ohos" / "harmony" / "demo" / "src" / "main" / "module.json5"
        write_fixture(
            repo,
            {
                "ohos/package.json": {"name": "@oh-rn/demo", "version": "1.0.0"},
                ".rn-ohos-adaptation/02-planning.json": {"permission_mapping": []},
                "ohos/harmony/demo/src/main/module.json5": """{
  "module": { "name": "demo", "type": "har", "requestPermissions": [] }
}
""",
                "ohos/harmony/demo/src/main/ets/Native.ts": """
export function foo() {
  throw new Error('Permission denied');
}
""",
            },
        )
        errors = check_no_not_implemented_throw(module_json5)
        self.assertEqual(errors, [])

    def test_user_grant_requires_request_and_check(self):
        repo = self.tmp_root / "user-grant-missing"
        module_json5 = repo / "ohos" / "harmony" / "demo" / "src" / "main" / "module.json5"
        write_fixture(
            repo,
            {
                "ohos/package.json": {"name": "@oh-rn/demo", "version": "1.0.0"},
                ".rn-ohos-adaptation/02-planning.json": {
                    "permission_mapping": [
                        # Note: needs_user_grant field is ignored, grant_type is fetched from permissions_full.json
                        {
                            "ohos_permission": "ohos.permission.ACCESS_BLUETOOTH",
                            # This permission has grant_type="user_grant" in permissions_full.json
                        }
                    ]
                },
                "ohos/harmony/demo/src/main/module.json5": """{
  "module": { "name": "demo", "type": "har", "requestPermissions": [] }
}
""",
                # ETS 里没有 request/check，也没有权限字符串
                "ohos/harmony/demo/src/main/ets/Native.ts": "export function foo() { return 1 }\n",
            },
        )
        needed, err = parse_permission_mapping_user_grant(repo)
        self.assertIsNone(err)
        # ACCESS_BLUETOOTH is user_grant in permissions_full.json
        self.assertEqual(needed, {"ohos.permission.ACCESS_BLUETOOTH"})

        errors = check_user_grant_request_in_ets(module_json5, needed)
        # 三类错误：缺权限字符串 + 缺 request + 缺 check
        self.assertTrue(any("missing permission string" in e and "permission-request.md" in e for e in errors))
        self.assertTrue(any("requestPermissionsFromUser" in e and "permission-request.md" in e for e in errors))
        self.assertTrue(any("checkAccessToken" in e and "permission-request.md" in e for e in errors))

    def test_system_grant_permission_not_checked_for_user_grant(self):
        """system_grant permissions should not require dynamic request/check."""
        repo = self.tmp_root / "system-grant-perm"
        module_json5 = repo / "ohos" / "harmony" / "demo" / "src" / "main" / "module.json5"
        write_fixture(
            repo,
            {
                "ohos/package.json": {"name": "@oh-rn/demo", "version": "1.0.0"},
                ".rn-ohos-adaptation/02-planning.json": {
                    "permission_mapping": [
                        # USE_BLUETOOTH is system_grant in permissions_full.json
                        # Even if needs_user_grant=True is mistakenly set, it won't be checked
                        {
                            "ohos_permission": "ohos.permission.USE_BLUETOOTH",
                            "needs_user_grant": True,  # This field is now ignored
                        }
                    ]
                },
                "ohos/harmony/demo/src/main/module.json5": """{
  "module": { "name": "demo", "type": "har", "requestPermissions": [] }
}
""",
                # ETS has no request/check code
                "ohos/harmony/demo/src/main/ets/Native.ts": "export function foo() { return 1 }\n",
            },
        )
        needed, err = parse_permission_mapping_user_grant(repo)
        self.assertIsNone(err)
        # USE_BLUETOOTH is system_grant in permissions_full.json, so needed should be empty
        self.assertEqual(needed, set())

        errors = check_user_grant_request_in_ets(module_json5, needed)
        # No errors because it's not a user_grant permission
        self.assertEqual(errors, [])

    def test_user_grant_pass_when_present(self):
        repo = self.tmp_root / "user-grant-pass"
        module_json5 = repo / "ohos" / "harmony" / "demo" / "src" / "main" / "module.json5"
        write_fixture(
            repo,
            {
                "ohos/package.json": {"name": "@oh-rn/demo", "version": "1.0.0"},
                ".rn-ohos-adaptation/02-planning.json": {
                    "permission_mapping": [
                        # Note: needs_user_grant field is ignored, grant_type is fetched from permissions_full.json
                        {
                            "ohos_permission": "ohos.permission.ACCESS_BLUETOOTH",
                            # This permission has grant_type="user_grant" in permissions_full.json
                        }
                    ]
                },
                "ohos/harmony/demo/src/main/module.json5": """{
  "module": { "name": "demo", "type": "har", "requestPermissions": [] }
}
""",
                "ohos/harmony/demo/src/main/ets/NativeBluetoothManagerTurboModule.ts": """
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
const P = 'ohos.permission.ACCESS_BLUETOOTH';
export async function ensure(ctx) {
  await abilityAccessCtrl.createAtManager().checkAccessToken(1, P);
  await abilityAccessCtrl.createAtManager().requestPermissionsFromUser(ctx, [P]);
}
""",
            },
        )
        needed, err = parse_permission_mapping_user_grant(repo)
        self.assertIsNone(err)
        errors = check_user_grant_request_in_ets(module_json5, needed)
        self.assertEqual(errors, [])


class TestHarExportCompleteness(unittest.TestCase):
    """0610 fast-image：库同时含 TurboModule+Fabric 时 index 默认导出 Package 必须二者俱全。"""

    def setUp(self):
        self.tmp_root = Path(tempfile.mkdtemp(prefix="har-export-"))

    def tearDown(self):
        import shutil
        shutil.rmtree(self.tmp_root, ignore_errors=True)

    _TURBO = ("export class FastImagePackage extends RNOHPackage {\n"
              "  getUITurboModuleFactoryByNameMap() { return new Map(); }\n}\n")
    _FABRIC = ("export class GeneratedPackage extends RNOHPackage {\n"
               "  createDescriptorWrapperFactoryByDescriptorType(ctx) { return {}; }\n}\n")
    _BOTH = ("export class GeneratedPackage extends RNOHPackage {\n"
             "  createDescriptorWrapperFactoryByDescriptorType(ctx){return {};}\n"
             "  getUITurboModuleFactoryByNameMap(){return new Map();}\n}\n")

    def _module_json5(self, files: dict) -> Path:
        base = "ohos/harmony/fast_image"
        files = {f"{base}/src/main/module.json5": "{}", **files}
        write_fixture(self.tmp_root, files)
        return self.tmp_root / base / "src" / "main" / "module.json5"

    def test_fail_when_index_exports_fabric_only_but_turbo_exists(self):
        base = "ohos/harmony/fast_image"
        mj = self._module_json5({
            f"{base}/src/main/ets/GeneratedPackage.ets": self._FABRIC,
            f"{base}/src/main/ets/FastImageTurboModulesFactory.ets": self._TURBO,
            f"{base}/index.ets": "export { GeneratedPackage as default } from './src/main/ets/GeneratedPackage';\n",
        })
        errors = check_har_export_completeness(mj)
        self.assertTrue(errors, "应检出默认导出 Package 缺 TurboModule 注册")
        self.assertIn("TurboModule 注册", errors[0])

    def test_pass_when_merged_into_single_package(self):
        base = "ohos/harmony/fast_image"
        mj = self._module_json5({
            f"{base}/src/main/ets/GeneratedPackage.ets": self._BOTH,
            f"{base}/index.ets": "export { GeneratedPackage as default } from './src/main/ets/GeneratedPackage';\n",
        })
        self.assertEqual(check_har_export_completeness(mj), [])

    def test_skip_when_turbo_only(self):
        base = "ohos/harmony/fast_image"
        mj = self._module_json5({
            f"{base}/src/main/ets/FastImageTurboModulesFactory.ets": self._TURBO,
            f"{base}/index.ets": "export { FastImagePackage as default } from './src/main/ets/FastImageTurboModulesFactory';\n",
        })
        self.assertEqual(check_har_export_completeness(mj), [])


if __name__ == "__main__":
    unittest.main()

