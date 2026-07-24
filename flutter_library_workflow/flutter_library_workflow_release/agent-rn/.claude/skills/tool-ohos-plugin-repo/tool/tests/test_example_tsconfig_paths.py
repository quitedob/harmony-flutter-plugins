"""测试 generate_example_full.update_example_tsconfig_paths 函数."""

import json
import os
import shutil
import sys
import tempfile
import unittest

tests_dir = os.path.dirname(__file__)
skill_root = os.path.normpath(os.path.join(tests_dir, "..", ".."))
sys.path.insert(0, skill_root)

from conftest import create_fixture_dir, cleanup_fixture, read_json, file_exists
from lib.generate_example_full import update_example_tsconfig_paths


class TestUpdateExampleTsconfigPaths(unittest.TestCase):
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
    
    def test_update_paths_basic(self):
        """基本场景：alias -> package_name 映射"""
        fixture = self._fixture("tsconfig_paths_basic", {
            "tsconfig.json": {
                "extends": "@tsconfig/react-native/tsconfig.json",
                "compilerOptions": {
                    "skipLibCheck": True
                },
                "include": ["App.tsx"],
                "exclude": ["node_modules", "harmony"]
            }
        })
        
        update_example_tsconfig_paths(fixture, "react-native-dark-mode", "@oh-rn/react-native-dark-mode")
        
        result = read_json(os.path.join(fixture, "tsconfig.json"))
        self.assertEqual(result["compilerOptions"]["baseUrl"], ".")
        self.assertIn("react-native-dark-mode", result["compilerOptions"]["paths"])
        self.assertEqual(
            result["compilerOptions"]["paths"]["react-native-dark-mode"],
            ["./node_modules/@oh-rn/react-native-dark-mode"]
        )
    
    def test_update_paths_no_tsconfig(self):
        """tsconfig.json 不存在 → 跳过"""
        fixture = self._fixture("tsconfig_paths_missing", {})
        
        update_example_tsconfig_paths(fixture, "react-native-dark-mode", "@oh-rn/react-native-dark-mode")
        
        self.assertFalse(file_exists(os.path.join(fixture, "tsconfig.json")))
    
    def test_update_paths_existing_compiler_options(self):
        """已有 compilerOptions → 合并 baseUrl 和 paths"""
        fixture = self._fixture("tsconfig_paths_existing", {
            "tsconfig.json": {
                "extends": "@tsconfig/react-native/tsconfig.json",
                "compilerOptions": {
                    "skipLibCheck": True,
                    "strict": True
                }
            }
        })
        
        update_example_tsconfig_paths(fixture, "react-native-dark-mode", "@oh-rn/react-native-dark-mode")
        
        result = read_json(os.path.join(fixture, "tsconfig.json"))
        self.assertEqual(result["compilerOptions"]["baseUrl"], ".")
        self.assertEqual(result["compilerOptions"]["skipLibCheck"], True)
        self.assertEqual(result["compilerOptions"]["strict"], True)
        self.assertIn("react-native-dark-mode", result["compilerOptions"]["paths"])
    
    def test_update_paths_overwrites_existing_paths(self):
        """已有 paths → 覆盖为新的 alias 映射"""
        fixture = self._fixture("tsconfig_paths_overwrite", {
            "tsconfig.json": {
                "extends": "@tsconfig/react-native/tsconfig.json",
                "compilerOptions": {
                    "baseUrl": ".",
                    "paths": {
                        "old-alias": ["./some/path"]
                    }
                }
            }
        })
        
        update_example_tsconfig_paths(fixture, "react-native-new", "@oh-rn/react-native-new")
        
        result = read_json(os.path.join(fixture, "tsconfig.json"))
        self.assertIn("react-native-new", result["compilerOptions"]["paths"])
        self.assertNotIn("old-alias", result["compilerOptions"]["paths"])
    
    def test_update_paths_with_scope_package(self):
        """带 scope 的包名映射"""
        fixture = self._fixture("tsconfig_paths_scope", {
            "tsconfig.json": {
                "extends": "@tsconfig/react-native/tsconfig.json",
                "compilerOptions": {}
            }
        })
        
        update_example_tsconfig_paths(fixture, "some-plugin", "@scope/some-plugin")
        
        result = read_json(os.path.join(fixture, "tsconfig.json"))
        self.assertEqual(
            result["compilerOptions"]["paths"]["some-plugin"],
            ["./node_modules/@scope/some-plugin"]
        )


if __name__ == "__main__":
    unittest.main()