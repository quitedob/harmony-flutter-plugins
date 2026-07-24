"""Tests for configurable OHOS npm scope."""

import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from lib import ohos_npm_config as cfg


class TestOhosNpmConfig(unittest.TestCase):
    def tearDown(self):
        cfg.set_runtime_ohos_npm_scope(None)
        os.environ.pop(cfg._ENV_SCOPE, None)

    def test_default_scope(self):
        self.assertEqual(cfg.get_ohos_npm_scope(), "@oh-rn")

    def test_env_override(self):
        os.environ[cfg._ENV_SCOPE] = "@my-org"
        self.assertEqual(cfg.get_ohos_npm_scope(), "@my-org")

    def test_runtime_override(self):
        cfg.set_runtime_ohos_npm_scope("@custom")
        self.assertEqual(cfg.get_ohos_npm_scope(), "@custom")

    def test_ohos_package_name_from_parent(self):
        cfg.set_runtime_ohos_npm_scope("@oh-rn")
        self.assertEqual(
            cfg.ohos_package_name_from_parent("@scope/react-native-foo"),
            "@oh-rn/react-native-foo",
        )

    def test_is_ohos_scoped_includes_legacy(self):
        cfg.set_runtime_ohos_npm_scope("@oh-rn")
        self.assertTrue(cfg.is_ohos_scoped_package_name("@react-native-oh-tpl/async-storage"))
        self.assertTrue(cfg.is_ohos_scoped_package_name("@oh-rn/async-storage"))

    def test_placeholder_detection(self):
        cfg.set_runtime_ohos_npm_scope("@oh-rn")
        self.assertTrue(cfg.is_ohos_name_template_placeholder("@oh-rn/xxx"))
        self.assertTrue(cfg.is_ohos_name_template_placeholder("@react-native-oh-tpl/xxx"))

    def test_sync_oh_package_replaces_legacy_scope(self):
        import tempfile
        from lib.ohos_package_sync import apply_oh_package_json5_content

        cfg.set_runtime_ohos_npm_scope("@acme-rn")
        raw = '{\n  "name": "@react-native-oh-tpl/react-native-foo",\n}\n'
        out, changed = apply_oh_package_json5_content(
            raw, "@acme-rn/react-native-foo"
        )
        self.assertTrue(changed)
        self.assertIn("@acme-rn/react-native-foo", out)
        self.assertNotIn("@react-native-oh-tpl/", out)


if __name__ == "__main__":
    unittest.main()
