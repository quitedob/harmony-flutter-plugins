"""测试 create_ohos._adjust_ohos_tsconfig 函数."""

import json
import os
import shutil
import sys
import tempfile
import unittest

# 添加 lib 目录到 sys.path（lib 在 ../lib，相对 tests 目录）
tests_dir = os.path.dirname(__file__)
lib_dir = os.path.normpath(os.path.join(tests_dir, "..", "..", "lib"))
sys.path.insert(0, lib_dir)

from conftest import create_fixture_dir, cleanup_fixture, read_file, read_json, file_exists
from create_ohos import _adjust_ohos_tsconfig


class TestAdjustOhosTsconfig(unittest.TestCase):
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
    
    def test_tsconfig_extends_rn_config_no_change(self):
        """源仓依赖 @react-native/typescript-config → 保留 ohos RN 配置"""
        fixture = self._fixture("tsconfig_rn", {
            "package.json": {"name": "test-rn-config", "version": "1.0.0"},
            "tsconfig.json": {
                "extends": "@react-native/typescript-config/tsconfig.json",
                "compilerOptions": {"strict": True},
            },
        })
        
        # 创建 ohos 目录和模板 tsconfig.json
        ohos_dir = os.path.join(fixture, "ohos")
        os.makedirs(ohos_dir)
        ohos_tsconfig = {
            "extends": "@react-native/typescript-config/tsconfig.json",
            "compilerOptions": {"strict": True, "isolatedModules": True},
            "include": ["src"],
        }
        with open(os.path.join(ohos_dir, "tsconfig.json"), "w", encoding="utf-8") as f:
            json.dump(ohos_tsconfig, f)
        
        # 调用函数
        _adjust_ohos_tsconfig(ohos_dir, fixture)
        
        # 验证：不修改（保留 RN 配置）
        result = read_json(os.path.join(ohos_dir, "tsconfig.json"))
        self.assertEqual(result["extends"], "@react-native/typescript-config/tsconfig.json")
        self.assertTrue(result["compilerOptions"]["isolatedModules"])
        
        # 验证：未拷贝文件
        self.assertFalse(file_exists(os.path.join(ohos_dir, "tsconfig.base.json")))
    
    def test_tsconfig_extends_relative_copy_and_adjust(self):
        """源仓依赖 ../tsconfig.base.json → 拷贝 + 继承"""
        fixture = self._fixture("tsconfig_relative", {
            "package.json": {"name": "test-relative", "version": "1.0.0"},
            "tsconfig.json": {"extends": "../tsconfig.base.json"},
            "../tsconfig.base.json": {
                "compilerOptions": {
                    "strict": True,
                    "noImplicitAny": True,
                    "isolatedModules": False,  # ← 源仓未启用
                }
            },
        })
        
        # 创建 ohos 目录和模板 tsconfig.json
        ohos_dir = os.path.join(fixture, "ohos")
        os.makedirs(ohos_dir)
        ohos_tsconfig = {
            "extends": "@react-native/typescript-config/tsconfig.json",
            "compilerOptions": {"strict": True},
            "include": ["src"],
        }
        with open(os.path.join(ohos_dir, "tsconfig.json"), "w", encoding="utf-8") as f:
            json.dump(ohos_tsconfig, f)
        
        # 调用函数
        _adjust_ohos_tsconfig(ohos_dir, fixture)
        
        # 验证：拷贝了 tsconfig.base.json
        self.assertTrue(file_exists(os.path.join(ohos_dir, "tsconfig.base.json")))
        
        # 验证：extends 改为 ./tsconfig.base.json
        result = read_json(os.path.join(ohos_dir, "tsconfig.json"))
        self.assertEqual(result["extends"], "./tsconfig.base.json")
        
        # 验证：拷贝的内容正确
        base_content = read_json(os.path.join(ohos_dir, "tsconfig.base.json"))
        self.assertTrue(base_content["compilerOptions"]["strict"])
        self.assertFalse(base_content["compilerOptions"]["isolatedModules"])
    
    def test_tsconfig_extends_custom_filename(self):
        """源仓依赖 ../custom.json → 动态识别文件名"""
        fixture = self._fixture("tsconfig_custom", {
            "package.json": {"name": "test-custom", "version": "1.0.0"},
            "tsconfig.json": {"extends": "../custom.json"},
            "../custom.json": {
                "compilerOptions": {"strict": True, "target": "es5"},
            },
        })
        
        # 创建 ohos 目录和模板 tsconfig.json
        ohos_dir = os.path.join(fixture, "ohos")
        os.makedirs(ohos_dir)
        ohos_tsconfig = {
            "extends": "@react-native/typescript-config/tsconfig.json",
            "include": ["src"],
        }
        with open(os.path.join(ohos_dir, "tsconfig.json"), "w", encoding="utf-8") as f:
            json.dump(ohos_tsconfig, f)
        
        # 调用函数
        _adjust_ohos_tsconfig(ohos_dir, fixture)
        
        # 验证：拷贝了 custom.json（动态识别）
        self.assertTrue(file_exists(os.path.join(ohos_dir, "custom.json")))
        
        # 验证：extends 改为 ./custom.json
        result = read_json(os.path.join(ohos_dir, "tsconfig.json"))
        self.assertEqual(result["extends"], "./custom.json")
    
    def test_tsconfig_no_source_keep_template(self):
        """源仓无 tsconfig.json → 保持模板配置"""
        fixture = self._fixture("tsconfig_no_source", {
            "package.json": {"name": "test-no-tsconfig", "version": "1.0.0"},
        })
        
        # 创建 ohos 目录和模板 tsconfig.json
        ohos_dir = os.path.join(fixture, "ohos")
        os.makedirs(ohos_dir)
        ohos_tsconfig = {
            "extends": "@react-native/typescript-config/tsconfig.json",
            "include": ["src"],
        }
        with open(os.path.join(ohos_dir, "tsconfig.json"), "w", encoding="utf-8") as f:
            json.dump(ohos_tsconfig, f)
        
        # 调用函数
        _adjust_ohos_tsconfig(ohos_dir, fixture)
        
        # 验证：保持模板配置（不修改）
        result = read_json(os.path.join(ohos_dir, "tsconfig.json"))
        self.assertEqual(result["extends"], "@react-native/typescript-config/tsconfig.json")
    
    def test_tsconfig_extends_missing_keep_rn(self):
        """源仓 extends 文件不存在 → 保持 RN 配置"""
        fixture = self._fixture("tsconfig_missing", {
            "package.json": {"name": "test-missing", "version": "1.0.0"},
            "tsconfig.json": {"extends": "../missing.json"},  # ← 文件不存在
        })
        
        # 创建 ohos 目录和模板 tsconfig.json
        ohos_dir = os.path.join(fixture, "ohos")
        os.makedirs(ohos_dir)
        ohos_tsconfig = {
            "extends": "@react-native/typescript-config/tsconfig.json",
            "include": ["src"],
        }
        with open(os.path.join(ohos_dir, "tsconfig.json"), "w", encoding="utf-8") as f:
            json.dump(ohos_tsconfig, f)
        
        # 调用函数
        _adjust_ohos_tsconfig(ohos_dir, fixture)
        
        # 验证：保持 RN 配置（不拷贝不存在文件）
        result = read_json(os.path.join(ohos_dir, "tsconfig.json"))
        self.assertEqual(result["extends"], "@react-native/typescript-config/tsconfig.json")


if __name__ == "__main__":
    unittest.main()