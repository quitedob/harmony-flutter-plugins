"""rn.py clean 命令测试

测试用例：
- CLEAN-01 ~ CLEAN-04: clean 命令测试
"""

import json
import os
import unittest

from test_helpers import (
    create_fixture_dir, cleanup_fixture, FIXTURES_DIR,
    cleanup_ohos, read_json, read_file, file_exists, dir_exists,
    run_rn_clean, run_rn_create
)


class TestRnClean(unittest.TestCase):
    """rn.py clean 命令测试"""

    def tearDown(self):
        for name in ["clean01", "clean02", "clean03", "clean04", "clean05", "clean06", "clean07"]:
            path = os.path.join(FIXTURES_DIR, f"clean_{name}")
            if os.path.exists(path):
                cleanup_ohos(path)
                cleanup_fixture(f"clean_{name}")

    def test_clean_01_keeps_install_cache_only(self):
        """CLEAN-01: 默认清理保留 node_modules 等缓存，删除 dist/tgz"""
        fixture_path = create_fixture_dir("clean_clean01", {
            "package.json": {"name": "test-clean01", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 'bar';"
        })

        run_rn_create(fixture_path)

        ohos_dir = os.path.join(fixture_path, "ohos")
        os.makedirs(os.path.join(ohos_dir, "dist"), exist_ok=True)
        os.makedirs(os.path.join(ohos_dir, "node_modules"), exist_ok=True)
        with open(os.path.join(ohos_dir, "test.tgz"), "w") as f:
            f.write("")

        result = run_rn_clean(fixture_path)
        self.assertEqual(result.returncode, 0, f"clean failed: {result.stderr}")

        self.assertTrue(dir_exists(os.path.join(ohos_dir, "node_modules")))
        self.assertFalse(dir_exists(os.path.join(ohos_dir, "dist")))
        self.assertFalse(file_exists(os.path.join(ohos_dir, "test.tgz")))
        self.assertFalse(file_exists(os.path.join(ohos_dir, "package.json")))

    def test_clean_02_keeps_harmony_build(self):
        """CLEAN-02: 默认清理保留 harmony build 目录"""
        fixture_path = create_fixture_dir("clean_clean02", {
            "package.json": {"name": "test-clean02", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const { RNTest } = NativeModules;
export const get = RNTest.get();
"""
        })

        run_rn_create(fixture_path)

        ohos_dir = os.path.join(fixture_path, "ohos")
        short_name = "test_clean02"
        library_dir = os.path.join(ohos_dir, "harmony", short_name)
        marker = os.path.join(library_dir, "src", "main", "ets", "Marker.ts")
        os.makedirs(os.path.dirname(marker), exist_ok=True)
        with open(marker, "w") as f:
            f.write("// marker")

        os.makedirs(os.path.join(library_dir, "build"), exist_ok=True)
        os.makedirs(os.path.join(library_dir, ".cxx"), exist_ok=True)

        result = run_rn_clean(fixture_path)
        self.assertEqual(result.returncode, 0, f"clean failed: {result.stderr}")

        self.assertTrue(dir_exists(os.path.join(library_dir, "build")))
        self.assertTrue(dir_exists(os.path.join(library_dir, ".cxx")))
        self.assertFalse(file_exists(marker))

    def test_clean_03_removes_source(self):
        """CLEAN-03: 默认清理删除源码与配置"""
        fixture_path = create_fixture_dir("clean_clean03", {
            "package.json": {"name": "test-clean03", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 'bar';"
        })

        run_rn_create(fixture_path)

        ohos_dir = os.path.join(fixture_path, "ohos")
        os.makedirs(os.path.join(ohos_dir, "node_modules"), exist_ok=True)

        result = run_rn_clean(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertFalse(file_exists(os.path.join(ohos_dir, "package.json")))
        self.assertFalse(file_exists(os.path.join(ohos_dir, "src", "index.js")))
        self.assertTrue(dir_exists(os.path.join(ohos_dir, "node_modules")))

    def test_clean_04_full_keeps_git_only(self):
        """CLEAN-04: --full 删除 ohos 下除 .git 外全部内容"""
        fixture_path = create_fixture_dir("clean_clean04", {
            "package.json": {"name": "test-clean04", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 'bar';",
        })

        run_rn_create(fixture_path)
        ohos_dir = os.path.join(fixture_path, "ohos")
        git_dir = os.path.join(ohos_dir, ".git")
        os.makedirs(git_dir, exist_ok=True)
        with open(os.path.join(git_dir, "HEAD"), "w") as f:
            f.write("ref: refs/heads/main\n")
        os.makedirs(os.path.join(ohos_dir, "node_modules"), exist_ok=True)

        result = run_rn_clean(fixture_path, full=True)
        self.assertEqual(result.returncode, 0, f"clean --full failed: {result.stderr}")

        self.assertTrue(dir_exists(ohos_dir))
        self.assertTrue(dir_exists(git_dir))
        self.assertTrue(file_exists(os.path.join(git_dir, "HEAD")))
        self.assertFalse(file_exists(os.path.join(ohos_dir, "package.json")))
        self.assertFalse(dir_exists(os.path.join(ohos_dir, "node_modules")))

    def test_clean_05_removes_example_entry_build_and_cxx(self):
        """CLEAN-05: 默认清理删除 example/harmony/entry/build 与 entry/.cxx"""
        fixture_path = create_fixture_dir("clean_clean05", {
            "package.json": {"name": "test-clean05", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 'bar';",
        })

        run_rn_create(fixture_path)
        ohos_dir = os.path.join(fixture_path, "ohos")
        entry_build = os.path.join(ohos_dir, "example", "harmony", "entry", "build")
        entry_cxx = os.path.join(ohos_dir, "example", "harmony", "entry", ".cxx")
        os.makedirs(entry_build, exist_ok=True)
        os.makedirs(entry_cxx, exist_ok=True)

        short_name = "test_clean05"
        lib_build = os.path.join(ohos_dir, "harmony", short_name, "build")
        lib_cxx = os.path.join(ohos_dir, "harmony", short_name, ".cxx")
        os.makedirs(lib_build, exist_ok=True)
        os.makedirs(lib_cxx, exist_ok=True)

        result = run_rn_clean(fixture_path)
        self.assertEqual(result.returncode, 0, f"clean failed: {result.stderr}")

        self.assertFalse(dir_exists(entry_build))
        self.assertFalse(dir_exists(entry_cxx))
        self.assertTrue(dir_exists(lib_build))
        self.assertTrue(dir_exists(lib_cxx))

    def test_clean_06_keeps_example_entry_oh_modules(self):
        """CLEAN-06: 默认清理不删除 example/harmony/entry/oh_modules（含内部文件）"""
        fixture_path = create_fixture_dir("clean_clean06", {
            "package.json": {"name": "test-clean06", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 'bar';",
        })

        run_rn_create(fixture_path)
        ohos_dir = os.path.join(fixture_path, "ohos")
        entry_oh_modules = os.path.join(
            ohos_dir, "example", "harmony", "entry", "oh_modules"
        )
        pkg_dir = os.path.join(entry_oh_modules, "@test", "pkg")
        os.makedirs(pkg_dir, exist_ok=True)
        marker = os.path.join(pkg_dir, "marker.txt")
        with open(marker, "w") as f:
            f.write("keep")

        # 路径中含 build 的包内文件也不应被删
        build_pkg = os.path.join(entry_oh_modules, "some-lib", "build", "out.txt")
        os.makedirs(os.path.dirname(build_pkg), exist_ok=True)
        with open(build_pkg, "w") as f:
            f.write("keep-build-path")

        result = run_rn_clean(fixture_path)
        self.assertEqual(result.returncode, 0, f"clean failed: {result.stderr}")

        self.assertTrue(dir_exists(entry_oh_modules))
        self.assertTrue(file_exists(marker))
        self.assertTrue(file_exists(build_pkg))

    @unittest.skipUnless(os.name == "nt", "Windows reserved device names")
    def test_clean_07_skips_windows_reserved_nul(self):
        """CLEAN-07: Windows 下遇到 nul 等保留名不崩溃"""
        fixture_path = create_fixture_dir("clean_clean07", {
            "package.json": {"name": "test-clean07", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 'bar';",
        })

        run_rn_create(fixture_path)
        ohos_dir = os.path.join(fixture_path, "ohos")
        os.makedirs(os.path.join(ohos_dir, "node_modules"), exist_ok=True)
        # 误创建的 nul 文件在 Windows 上会导致 relpath 失败
        nul_path = os.path.join(ohos_dir, "nul")
        try:
            with open(nul_path, "w") as f:
                f.write("accidental")
        except OSError:
            self.skipTest("cannot create reserved name nul on this system")

        result = run_rn_clean(fixture_path)
        self.assertEqual(result.returncode, 0, f"clean failed: {result.stderr}")
        self.assertTrue(dir_exists(os.path.join(ohos_dir, "node_modules")))


if __name__ == "__main__":
    unittest.main()
