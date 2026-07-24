"""init-template 相关测试"""

import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from lib.har_wrapper_template import run_ohpm_on_har_wrapper_template

from test_helpers import FIXTURES_DIR, cleanup_fixture, create_fixture_dir, read_file


class TestInitTemplateHarWrapper(unittest.TestCase):
    def tearDown(self):
        for name in ("init_tpl01", "init_tpl02"):
            cleanup_fixture(name)

    def test_temporary_har_wrapper_restores_placeholders(self):
        """INIT-TPL-01: ohpm 前临时替换 {{SHORT_NAME}}，结束后还原"""
        fixture = create_fixture_dir(
            "init_tpl01",
            {
                "build-profile.json5": (
                    '{\n  "modules": [\n'
                    '    { "name": "{{SHORT_NAME}}", "srcPath": "./{{SHORT_NAME}}" }\n'
                    "  ]\n}\n"
                ),
                "library/src/main/cpp/CMakeLists.txt": (
                    "add_library({{SHORT_NAME}} SHARED foo.cpp)\n"
                ),
            },
        )
        har_dir = os.path.join(FIXTURES_DIR, "init_tpl01")
        bp = os.path.join(har_dir, "build-profile.json5")
        cmake = os.path.join(har_dir, "library", "src", "main", "cpp", "CMakeLists.txt")

        def _noop():
            self.assertIn('"name": "library"', read_file(bp))
            self.assertNotIn("{{SHORT_NAME}}", read_file(bp))
            self.assertIn("add_library(library SHARED", read_file(cmake))

        run_ohpm_on_har_wrapper_template(har_dir, _noop)

        self.assertIn("{{SHORT_NAME}}", read_file(bp))
        self.assertIn("add_library({{SHORT_NAME}} SHARED", read_file(cmake))

    def test_restores_when_run_raises(self):
        """INIT-TPL-02: run() 抛错时仍还原占位符"""
        fixture = create_fixture_dir(
            "init_tpl02",
            {
                "build-profile.json5": '{"name": "{{SHORT_NAME}}"}\n',
                "library/src/main/cpp/CMakeLists.txt": "x\n",
            },
        )
        har_dir = os.path.join(FIXTURES_DIR, "init_tpl02")
        bp = os.path.join(har_dir, "build-profile.json5")
        original = read_file(bp)

        def _fail():
            raise RuntimeError("ohpm failed")

        with self.assertRaises(RuntimeError):
            run_ohpm_on_har_wrapper_template(har_dir, _fail)

        self.assertEqual(read_file(bp), original)
        self.assertIn("{{SHORT_NAME}}", read_file(bp))


if __name__ == "__main__":
    unittest.main()
