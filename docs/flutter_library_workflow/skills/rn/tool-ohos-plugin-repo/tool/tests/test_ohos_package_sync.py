"""Tests for oh-package.json5 / package-lock name sync."""

import json
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from lib import ohos_npm_config as cfg
from lib.ohos_package_sync import (
    apply_oh_package_json5_content,
    read_ohos_package_json_name,
    resolve_ohos_npm_package_name,
    sync_ohos_autolinking_oh_package_name,
    sync_ohos_package_lock,
    sync_plugin_oh_package_names,
    write_oh_package_json5_name,
)


class TestOhosPackageSync(unittest.TestCase):
    def setUp(self):
        self._tmpdir = tempfile.mkdtemp()
        self.plugin_root = self._tmpdir
        cfg.set_runtime_ohos_npm_scope("@acme-rn")
        self.canonical = "@acme-rn/react-native-demo"

    def tearDown(self):
        cfg.set_runtime_ohos_npm_scope(None)
        os.environ.pop(cfg._ENV_SCOPE, None)
        import shutil

        shutil.rmtree(self._tmpdir, ignore_errors=True)

    def _write(self, rel: str, content: str) -> str:
        path = os.path.join(self.plugin_root, rel.replace("/", os.sep))
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(content)
        return path

    def test_apply_replaces_npm_name_placeholder(self):
        raw = '{\n  "name": "{{NPM_NAME}}",\n  "main": "index.ets"\n}\n'
        out, changed = apply_oh_package_json5_content(raw, self.canonical)
        self.assertTrue(changed)
        self.assertIn(f'"name": "{self.canonical}"', out)
        self.assertNotIn("{{NPM_NAME}}", out)

    def test_write_oh_package_json5_on_disk(self):
        path = self._write(
            "ohos/harmony/demo/oh-package.json5",
            '{\n  "name": "@oh-rn/xxx",\n  "main": "index.ets"\n}\n',
        )
        self.assertTrue(write_oh_package_json5_name(path, self.canonical))
        with open(path, "r", encoding="utf-8") as f:
            body = f.read()
        self.assertIn(self.canonical, body)
        self.assertNotIn("@oh-rn/xxx", body)

    def test_resolve_prefers_parent_and_scope_over_stale_ohos_json(self):
        self._write(
            "ohos/package.json",
            json.dumps({"name": "@react-native-oh-tpl/react-native-demo", "version": "1.0.0"}),
        )
        self._write("package.json", json.dumps({"name": "react-native-demo"}))
        self.assertEqual(resolve_ohos_npm_package_name(self.plugin_root), self.canonical)
        self.assertEqual(read_ohos_package_json_name(self.plugin_root), "@react-native-oh-tpl/react-native-demo")

    def test_sync_plugin_updates_harmony_har_wrapper_and_lock(self):
        self._write(
            "ohos/package.json",
            json.dumps({"name": self.canonical, "version": "1.0.0"}),
        )
        self._write("package.json", json.dumps({"name": "react-native-demo"}))
        harmony_oh = self._write(
            "ohos/harmony/demo/oh-package.json5",
            '{\n  "name": "@react-native-oh-tpl/react-native-demo",\n}\n',
        )
        har_oh = self._write(
            "ohos/.rn-build/har_wrapper/demo/oh-package.json5",
            '{\n  "name": "{{NPM_NAME}}",\n}\n',
        )
        lock_path = self._write(
            "ohos/package-lock.json",
            '{\n  "name": "@oh-rn/xxx",\n  "packages": {\n    "": {\n      "name": "@oh-rn/xxx"\n    }\n  }\n}\n',
        )

        name = sync_plugin_oh_package_names(
            self.plugin_root, short_name="demo", log=None
        )
        self.assertEqual(name, self.canonical)

        for path in (harmony_oh, har_oh):
            with open(path, "r", encoding="utf-8") as f:
                body = f.read()
            self.assertIn(self.canonical, body)
            self.assertNotIn("@react-native-oh-tpl/", body)
            self.assertNotIn("@oh-rn/xxx", body)
            self.assertNotIn("{{NPM_NAME}}", body)

        with open(lock_path, "r", encoding="utf-8") as f:
            lock_body = f.read()
        self.assertIn(f'"name": "{self.canonical}"', lock_body)
        self.assertNotIn("@oh-rn/xxx", lock_body)

    def test_sync_autolinking_oh_package_name(self):
        pkg_path = self._write(
            "ohos/package.json",
            json.dumps(
                {
                    "name": self.canonical,
                    "version": "1.0.0",
                    "harmony": {
                        "autolinking": {
                            "cmakeLibraryTargetName": "demo",
                            "ohPackageName": "@react-native-oh-tpl/react-native-demo",
                            "etsPackageClassName": "DemoPackage",
                            "cppPackageClassName": "DemoPackage",
                        }
                    },
                }
            ),
        )
        self.assertTrue(
            sync_ohos_autolinking_oh_package_name(self.plugin_root, self.canonical, log=None)
        )
        with open(pkg_path, "r", encoding="utf-8") as f:
            pkg = json.load(f)
        self.assertEqual(
            pkg["harmony"]["autolinking"]["ohPackageName"],
            self.canonical,
        )

    def test_sync_plugin_updates_autolinking(self):
        self._write(
            "ohos/package.json",
            json.dumps(
                {
                    "name": self.canonical,
                    "harmony": {
                        "autolinking": {
                            "ohPackageName": "@react-native-oh-tpl/react-native-demo",
                        }
                    },
                }
            ),
        )
        self._write("package.json", json.dumps({"name": "react-native-demo"}))
        sync_plugin_oh_package_names(self.plugin_root, short_name="demo", log=None)
        with open(
            os.path.join(self.plugin_root, "ohos", "package.json"),
            "r",
            encoding="utf-8",
        ) as f:
            pkg = json.load(f)
        self.assertEqual(
            pkg["harmony"]["autolinking"]["ohPackageName"],
            self.canonical,
        )

    def test_sync_ohos_package_lock_standalone(self):
        lock_path = self._write(
            "ohos/package-lock.json",
            '{"name": "@react-native-oh-tpl/xxx", "packages": {"": {"name": "@oh-rn/xxx"}}}\n',
        )
        self.assertTrue(sync_ohos_package_lock(self.plugin_root, self.canonical, log=None))
        with open(lock_path, "r", encoding="utf-8") as f:
            body = f.read()
        self.assertNotIn("@react-native-oh-tpl/xxx", body)
        self.assertNotIn("@oh-rn/xxx", body)
        self.assertEqual(body.count(self.canonical), 2)


if __name__ == "__main__":
    unittest.main()
