"""Unit tests for dual-entry source layout detection."""

import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from lib.source_layout import (
    build_harmony_dual_entry_barrel,
    is_dual_entry_layout,
    normalize_repo_rel,
    source_root_has_index,
)


class TestSourceLayout(unittest.TestCase):
    def test_normalize_repo_rel(self):
        self.assertEqual(normalize_repo_rel("./src/index.js"), "src/index.js")

    def test_dual_entry_root_main_with_src_index(self):
        with tempfile.TemporaryDirectory() as tmp:
            os.makedirs(os.path.join(tmp, "src"))
            open(os.path.join(tmp, "index.js"), "w", encoding="utf-8").close()
            open(os.path.join(tmp, "src", "index.js"), "w", encoding="utf-8").close()
            self.assertTrue(is_dual_entry_layout("index.js", "src", tmp))

    def test_not_dual_root_main_src_modules_only(self):
        """Root index re-exports src/module — no src/index.* (CREATE-06 style)."""
        with tempfile.TemporaryDirectory() as tmp:
            os.makedirs(os.path.join(tmp, "src"))
            open(os.path.join(tmp, "index.ts"), "w", encoding="utf-8").close()
            open(os.path.join(tmp, "src", "module.ts"), "w", encoding="utf-8").close()
            self.assertFalse(is_dual_entry_layout("index.ts", "src", tmp))
            self.assertFalse(source_root_has_index(tmp, "src"))

    def test_not_dual_when_main_under_src(self):
        with tempfile.TemporaryDirectory() as tmp:
            os.makedirs(os.path.join(tmp, "src"))
            open(os.path.join(tmp, "src", "index.js"), "w", encoding="utf-8").close()
            self.assertFalse(is_dual_entry_layout("src/index.js", "src", tmp))

    def test_not_dual_when_flat_single_entry(self):
        self.assertFalse(is_dual_entry_layout("index.js", "", "/tmp"))
        self.assertFalse(is_dual_entry_layout("index.js", ".", "/tmp"))

    def test_not_dual_when_entry_inside_nested_root(self):
        with tempfile.TemporaryDirectory() as tmp:
            os.makedirs(os.path.join(tmp, "lib"))
            open(os.path.join(tmp, "lib", "index.js"), "w", encoding="utf-8").close()
            self.assertFalse(is_dual_entry_layout("lib/index.js", "lib", tmp))

    def test_build_harmony_dual_entry_barrel_function_default(self):
        root = """import { a, b } from './src';
export default a;
export { b };
"""
        out = build_harmony_dual_entry_barrel(root, "src")
        self.assertIsNotNone(out)
        self.assertIn("export default defaultExport", out or "")
        self.assertIn("a,", out or "")

    def test_build_harmony_dual_entry_barrel_skips_object_default(self):
        root = "import { fn } from './src';\nexport default { fn };\n"
        self.assertIsNone(build_harmony_dual_entry_barrel(root, "src"))


if __name__ == "__main__":
    unittest.main()
