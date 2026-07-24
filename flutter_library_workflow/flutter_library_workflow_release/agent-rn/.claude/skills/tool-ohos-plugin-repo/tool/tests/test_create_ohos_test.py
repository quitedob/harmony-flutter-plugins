"""rn.py create ohos-test 与 lib/create_ohos_test 单元测试。"""

import json
import os
import shutil
import tempfile
import unittest

from conftest import create_fixture_dir, cleanup_fixture, read_file, file_exists, dir_exists
from test_helpers import (
    run_rn_create_example,
    run_rn_create_ohos,
    run_rn_create_ohos_test,
    run_rn_create_harmony,
)

from lib import create_ohos_test


class TestCreateOhosTestLib(unittest.TestCase):
    def test_method_slug(self):
        self.assertEqual(create_ohos_test._method_slug("getBluetoothState"), "get-bluetooth-state")
        self.assertEqual(create_ohos_test._method_slug("init"), "init")

    def test_append_method_it_stubs(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = os.path.join(tmp, "ModuleTest.test.ets")
            with open(path, "w", encoding="utf-8") as f:
                f.write(
                    "export default function moduleTest() {\n"
                    "  describe('T', () => {\n"
                    "    it('detectWhiteScreen', 0, async () => {});\n"
                    "  });\n"
                    "}\n"
                )
            n = create_ohos_test._append_method_it_stubs(
                path, ["getState"], dry_run=False, log=lambda _m: None
            )
            self.assertEqual(n, 1)
            with open(path, encoding="utf-8") as f:
                text = f.read()
            self.assertIn("it('get-state'", text)


class TestRnCreateOhosTestCmd(unittest.TestCase):
    def setUp(self):
        self._fixture_paths: list[str] = []

    def tearDown(self):
        for path in self._fixture_paths:
            if os.path.isdir(path):
                shutil.rmtree(path, ignore_errors=True)
            else:
                cleanup_fixture(path)

    def _fixture(self, name: str, files: dict) -> str:
        path = create_fixture_dir(name, files)
        self._fixture_paths.append(path)
        return path

    def test_create_ohos_test_after_example_light(self):
        """旧库无 ohosTest 时，create ohos-test 应补全脚手架与 hypium。"""
        fixture = self._fixture("ohos_test_cmd", {
            "package.json": {
                "name": "react-native-test-module",
                "version": "1.0.0",
            },
            "src/NativeTestModule.ts": (
                "import { TurboModuleRegistry } from 'react-native';\n"
                "export default TurboModuleRegistry.getEnforcing('TestModule');"
            ),
        })
        adapt = os.path.join(fixture, ".rn-ohos-adaptation")
        os.makedirs(adapt, exist_ok=True)
        with open(os.path.join(adapt, "03-coding-library.json"), "w", encoding="utf-8") as f:
            json.dump(
                {
                    "implemented_methods": [
                        {"channel": "NativeTest", "method": "ping"}
                    ]
                },
                f,
            )

        self.assertEqual(run_rn_create_ohos(fixture, light=True).returncode, 0)
        self.assertEqual(run_rn_create_harmony(fixture, light=True).returncode, 0)
        self.assertEqual(run_rn_create_example(fixture, light=True).returncode, 0)

        ohostest = os.path.join(
            fixture, "ohos", "example", "harmony", "entry", "src", "ohosTest"
        )
        if dir_exists(ohostest):
            shutil.rmtree(ohostest)

        oh_pkg = os.path.join(fixture, "ohos", "example", "harmony", "entry", "oh-package.json5")
        if file_exists(oh_pkg):
            text = read_file(oh_pkg)
            text = text.replace('"@ohos/hypium": "1.0.25"', "")
            text = text.replace('"@ohos/hypium": "1.0.25",', "")
            with open(oh_pkg, "w", encoding="utf-8") as f:
                f.write(text)

        result = run_rn_create_ohos_test(fixture, skip_ohpm=True)
        self.assertEqual(result.returncode, 0, result.stderr or result.stdout)

        self.assertTrue(
            file_exists(
                os.path.join(
                    ohostest, "ets", "test", "ui", "ModuleTest.test.ets"
                )
            )
        )
        self.assertIn("@ohos/hypium", read_file(oh_pkg))
        module_test = read_file(
            os.path.join(ohostest, "ets", "test", "ui", "ModuleTest.test.ets")
        )
        self.assertIn("it('ping'", module_test)

    def test_create_ohos_test_trailing_plugin_root(self):
        """create ohos-test --plugin-root PATH 应被 leaf 子命令接受。"""
        fixture = self._fixture("ohos_test_trailing_pr", {
            "package.json": {"name": "react-native-test-module", "version": "1.0.0"},
            "src/NativeTestModule.ts": (
                "import { TurboModuleRegistry } from 'react-native';\n"
                "export default TurboModuleRegistry.getEnforcing('TestModule');"
            ),
        })
        self.assertEqual(run_rn_create_ohos(fixture, light=True).returncode, 0)
        self.assertEqual(run_rn_create_harmony(fixture, light=True).returncode, 0)
        self.assertEqual(run_rn_create_example(fixture, light=True).returncode, 0)

        import subprocess
        import sys
        from test_helpers import RN_PY

        result = subprocess.run(
            [
                sys.executable,
                RN_PY,
                "create",
                "ohos-test",
                "--plugin-root",
                fixture,
                "--skip-ohpm",
            ],
            capture_output=True,
            text=True,
            cwd=os.path.dirname(fixture),
            encoding="utf-8",
            errors="replace",
            timeout=120,
        )
        self.assertEqual(result.returncode, 0, result.stderr or result.stdout)
        self.assertIn("ohos-test scaffold ready", result.stdout)


if __name__ == "__main__":
    unittest.main()
