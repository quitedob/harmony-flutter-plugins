"""Tests for validate_module_test.py."""

from __future__ import annotations

import sys
import tempfile
import unittest
from pathlib import Path

_TOOL_DIR = Path(__file__).resolve().parents[1]
if str(_TOOL_DIR) not in sys.path:
    sys.path.insert(0, str(_TOOL_DIR))

from validate_module_test import (  # noqa: E402
    filter_device_test_methods,
    validate,
    validate_bundle_ability_alignment,
    validate_testid_alignment,
)

MINIMAL_TEST_SHELL = """
export default function moduleTest() { describe('x', () => {
  beforeAll(async () => {});
  it('detectWhiteScreen', 0, async () => {});
  it('enable', 0, async () => {});
}); }
async function waitForText() {}
async function waitForId() {}
async function findMethodButton() {}
async function startEntryAbility() {
  const want = { bundleName: BUNDLE_NAME, abilityName: ENTRY_ABILITY };
}
"""


class TestValidateModuleTest(unittest.TestCase):
    def test_legacy_template_mismatch(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            app = root / "App.tsx"
            app.write_text('<Button testID="btn-manual-init" />', encoding="utf-8")
            test = """
export default function moduleTest() {}
async function findMethodButton() {
  await waitForId(driver, `test-${method}-btn`, 2000);
}
"""
            errs = validate_testid_alignment(test, app)
            self.assertTrue(any("legacy" in e for e in errs))

    def test_method_button_ids_ok(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            app = root / "App.tsx"
            app.write_text(
                'testID="btn-get-state"\ntestID="btn-manual-init"',
                encoding="utf-8",
            )
            test = """
const METHOD_BUTTON_IDS: Record<string, string> = {
  'get-state': 'btn-get-state',
  'manual-init': 'btn-manual-init',
};
async function findMethodButton(driver, method, buttonText) {
  const id = METHOD_BUTTON_IDS[method];
  await waitForId(driver, id, 2000);
}
export default function moduleTest() { describe('x', () => {
  it('detectWhiteScreen', 0, async () => {});
  it('getState', 0, async () => {});
}); }
"""
            errs = validate_testid_alignment(test, app)
            self.assertEqual(errs, [])

    def test_unknown_testid_in_module_test(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            app = root / "App.tsx"
            app.write_text('testID="btn-real"', encoding="utf-8")
            app_json5 = root / "app.json5"
            app_json5.write_text('{"app":{"bundleName":"com.example.application"}}', encoding="utf-8")
            entry_mod = root / "module.json5"
            entry_mod.write_text('{"module":{"mainElement":"EntryAbility"}}', encoding="utf-8")
            test_file = root / "ModuleTest.test.ets"
            test_file.write_text(
                MINIMAL_TEST_SHELL
                + """
const METHOD_BUTTON_IDS: Record<string, string> = { 'x': 'btn-wrong' };
const BUNDLE_NAME = 'com.example.application';
const ENTRY_ABILITY = 'EntryAbility';
""",
                encoding="utf-8",
            )
            result = validate(
                test_file, ["enable"], app, app_json5, entry_mod
            )
            self.assertFalse(result["ok"])
            self.assertTrue(any("btn-wrong" in e for e in result["errors"]))

    def test_bundle_name_mismatch(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            app = root / "App.tsx"
            app.write_text('testID="btn-a"', encoding="utf-8")
            app_json5 = root / "app.json5"
            app_json5.write_text('{"app":{"bundleName":"com.example.application"}}', encoding="utf-8")
            entry_mod = root / "module.json5"
            entry_mod.write_text('{"module":{"mainElement":"EntryAbility"}}', encoding="utf-8")
            test = MINIMAL_TEST_SHELL + """
const BUNDLE_NAME = 'com.wrong.bundle';
const ENTRY_ABILITY = 'EntryAbility';
"""
            errs = validate_bundle_ability_alignment(test, app_json5, entry_mod)
            self.assertTrue(any("BUNDLE_NAME mismatch" in e for e in errs))

    def test_literal_bundle_in_start_entry(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            app_json5 = root / "app.json5"
            app_json5.write_text('{"app":{"bundleName":"com.example.application"}}', encoding="utf-8")
            entry_mod = root / "module.json5"
            entry_mod.write_text('{"module":{"mainElement":"EntryAbility"}}', encoding="utf-8")
            test = """
const BUNDLE_NAME = 'com.example.application';
const ENTRY_ABILITY = 'EntryAbility';
async function startEntryAbility() {
  const want = { bundleName: 'com.example.application', abilityName: ENTRY_ABILITY };
}
"""
            errs = validate_bundle_ability_alignment(test, app_json5, entry_mod)
            self.assertTrue(any("literal bundleName" in e for e in errs))

    def test_get_constants_excluded_from_required_it(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            app = root / "App.tsx"
            app.write_text('testID="test-showAlert-btn"', encoding="utf-8")
            app_json5 = root / "app.json5"
            app_json5.write_text(
                '{"app":{"bundleName":"com.example.application"}}', encoding="utf-8"
            )
            entry_mod = root / "module.json5"
            entry_mod.write_text('{"module":{"mainElement":"EntryAbility"}}', encoding="utf-8")
            test_file = root / "ModuleTest.test.ets"
            test_file.write_text(
                """
const BUNDLE_NAME = 'com.example.application';
const ENTRY_ABILITY = 'EntryAbility';
"""
                + MINIMAL_TEST_SHELL.replace("enable", "showAlert"),
                encoding="utf-8",
            )
            result = validate(
                test_file,
                ["getConstants", "showAlert"],
                app,
                app_json5,
                entry_mod,
            )
            self.assertTrue(result["ok"], msg=str(result["errors"]))
            self.assertEqual(result["details"]["methods_excluded"], ["getConstants"])
            self.assertNotIn("getConstants", result["details"]["methods_expected"])

    def test_filter_device_test_methods(self):
        self.assertEqual(
            filter_device_test_methods(["getConstants", "showAlert", "dismiss"]),
            ["showAlert", "dismiss"],
        )


if __name__ == "__main__":
    unittest.main()
