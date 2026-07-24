"""rn.py CLI 集成测试：自定义鸿蒙 npm scope 与生成文件字段对齐。

从 rn.py 命令行入口执行，校验 create / analyse 后磁盘上的 package.json、
oh-package.json5 等字段是否与 --ohos-scope 一致。

采用「ohos 目录已存在 → 增量补充」路径，避免 Windows junction 权限问题。
"""

import os
import unittest

from test_helpers import (
    cleanup_fixture,
    create_fixture_dir,
    file_exists,
    read_file,
    read_json,
    read_oh_package_json5_name,
    run_rn_analyse,
    run_rn_cli,
    run_rn_create_harmony,
    run_rn_create_har,
)


SCOPE = "@acme-rn"
NPM_PKG = "react-native-scope-cli"
OHOS_PKG = f"{SCOPE}/{NPM_PKG}"
SHORT = "scope_cli"

_TURBO_SPEC = """import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  get(): Promise<string>;
}
export default TurboModuleRegistry.getEnforcing<Spec>('ScopeCliModule');
"""


class TestRnOhosScopeCli(unittest.TestCase):
    """SCOPE-CLI-*: rn.py --ohos-scope 与生成产物一致性"""

    def setUp(self):
        self._cleanups: list[str] = []

    def tearDown(self):
        for name in self._cleanups:
            cleanup_fixture(name)
        self._cleanups.clear()

    def _fixture(self, name: str, files: dict) -> str:
        path = create_fixture_dir(name, files)
        self._cleanups.append(name)
        return path

    def _assert_pkg_name(self, path: str, expected: str, msg: str) -> None:
        self.assertTrue(file_exists(path), f"缺少文件: {path}")
        if path.endswith(".json5"):
            actual = read_oh_package_json5_name(path)
        elif path.endswith("package.json"):
            actual = read_json(path).get("name")
        else:
            actual = None
        self.assertEqual(actual, expected, msg)

    def test_scope_cli_01_analyse_reports_custom_scope(self):
        """SCOPE-CLI-01: rn.py analyse --ohos-scope 输出 OHOS Name"""
        root = self._fixture(
            "scope_cli_01",
            {
                "package.json": {
                    "name": NPM_PKG,
                    "version": "1.0.0",
                    "main": "index.js",
                },
                "index.js": "export {}",
            },
        )
        result = run_rn_analyse(root, ohos_scope=SCOPE)
        self.assertEqual(result.returncode, 0, result.stderr or result.stdout)
        self.assertIn(f"OHOS Name: {OHOS_PKG}", result.stdout)

    def test_scope_cli_02_incremental_create_syncs_ohos_and_harmony(self):
        """SCOPE-CLI-02: 增量 create 同步 ohos/package.json 与 harmony oh-package.json5"""
        root = self._fixture(
            "scope_cli_02",
            {
                "package.json": {
                    "name": NPM_PKG,
                    "version": "1.0.0",
                    "main": "index.js",
                },
                "index.js": "export {}",
                "src/specs/NativeScopeCliModule.ts": _TURBO_SPEC,
                "ohos/package.json": {
                    "name": "@oh-rn/xxx",
                    "version": "1.0.0",
                },
                "ohos/harmony/scope_cli/oh-package.json5": (
                    '{\n  "name": "{{NPM_NAME}}",\n  "main": "index.ets",\n'
                    '  "version": "1.0.0"\n}\n'
                ),
            },
        )

        result = run_rn_cli(root, ["create", "--light"], ohos_scope=SCOPE, timeout=90)
        self.assertEqual(result.returncode, 0, result.stderr or result.stdout)

        self._assert_pkg_name(
            os.path.join(root, "ohos", "package.json"),
            OHOS_PKG,
            "ohos/package.json name",
        )
        self._assert_pkg_name(
            os.path.join(root, "ohos", "harmony", SHORT, "oh-package.json5"),
            OHOS_PKG,
            "harmony oh-package.json5 name",
        )
        oh_pkg_body = read_file(
            os.path.join(root, "ohos", "harmony", SHORT, "oh-package.json5")
        )
        self.assertNotIn("{{NPM_NAME}}", oh_pkg_body)
        self.assertNotIn("@react-native-oh-tpl/", oh_pkg_body)

    def test_scope_cli_03_create_harmony_uses_scope(self):
        """SCOPE-CLI-03: rn.py create harmony 生成 oh-package 与 ohos/package.json 一致"""
        root = self._fixture(
            "scope_cli_03",
            {
                "package.json": {
                    "name": NPM_PKG,
                    "version": "1.0.0",
                },
                "src/NativeScopeCliModule.ts": _TURBO_SPEC,
                "ohos/package.json": {
                    "name": OHOS_PKG,
                    "version": "1.0.0",
                },
            },
        )

        result = run_rn_create_harmony(root, light=True, ohos_scope=SCOPE)
        self.assertEqual(result.returncode, 0, result.stderr or result.stdout)

        self._assert_pkg_name(
            os.path.join(root, "ohos", "package.json"),
            OHOS_PKG,
            "ohos/package.json",
        )
        self._assert_pkg_name(
            os.path.join(root, "ohos", "harmony", SHORT, "oh-package.json5"),
            OHOS_PKG,
            "harmony oh-package.json5",
        )

    def test_scope_cli_04_create_har_wrapper_uses_scope(self):
        """SCOPE-CLI-04: rn.py create har 同步 har_wrapper oh-package.json5"""
        root = self._fixture(
            "scope_cli_04",
            {
                "package.json": {
                    "name": NPM_PKG,
                    "version": "1.0.0",
                },
                "src/NativeScopeCliModule.ts": _TURBO_SPEC,
                "ohos/package.json": {
                    "name": OHOS_PKG,
                    "version": "1.0.0",
                },
            },
        )

        result = run_rn_create_har(root, light=True, ohos_scope=SCOPE)
        self.assertEqual(result.returncode, 0, result.stderr or result.stdout)

        har_oh = os.path.join(
            root, "ohos", ".rn-build", "har_wrapper", SHORT, "oh-package.json5"
        )
        self._assert_pkg_name(har_oh, OHOS_PKG, "har_wrapper oh-package.json5")
        self.assertNotIn("{{NPM_NAME}}", read_file(har_oh))

    def test_scope_cli_05_legacy_harmony_name_upgraded_on_incremental(self):
        """SCOPE-CLI-05: 旧 @react-native-oh-tpl 名在增量 create 后改为当前 scope"""
        legacy = f"@react-native-oh-tpl/{NPM_PKG}"
        root = self._fixture(
            "scope_cli_05",
            {
                "package.json": {
                    "name": NPM_PKG,
                    "version": "1.0.0",
                    "main": "index.js",
                },
                "index.js": "export {}",
                "src/specs/NativeScopeCliModule.ts": _TURBO_SPEC,
                "ohos/package.json": {"name": legacy, "version": "1.0.0"},
                "ohos/harmony/scope_cli/oh-package.json5": (
                    f'{{\n  "name": "{legacy}",\n  "main": "index.ets",\n'
                    f'  "version": "1.0.0"\n}}\n'
                ),
            },
        )

        result = run_rn_cli(root, ["create", "--light"], ohos_scope=SCOPE, timeout=90)
        self.assertEqual(result.returncode, 0, result.stderr or result.stdout)

        self._assert_pkg_name(
            os.path.join(root, "ohos", "package.json"),
            OHOS_PKG,
            "ohos/package.json 应升级 scope",
        )
        self._assert_pkg_name(
            os.path.join(root, "ohos", "harmony", SHORT, "oh-package.json5"),
            OHOS_PKG,
            "harmony oh-package 应升级 scope",
        )


if __name__ == "__main__":
    unittest.main()
