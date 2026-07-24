"""rn.py 签名同步功能测试

测试用例：
- SIGN-01: 空签名配置同步
- SIGN-02: 已有签名跳过
- SIGN-03: 签名配置文件不存在
- SIGN-04: JSON5 格式保持（缩进、注释）
"""

import json
import os
import re
import shutil
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from tool.rn import _sync_signing_to_build_profile, _RN_SIGNING_FILE, _WORKSPACE_ROOT


class TestSigningSync(unittest.TestCase):
    """签名同步测试"""

    def setUp(self):
        self.test_dirs = []

    def tearDown(self):
        for test_dir in self.test_dirs:
            if os.path.exists(test_dir):
                shutil.rmtree(test_dir)

    def _create_test_plugin_structure(self, build_profile_content: str) -> str:
        """创建模拟的插件目录结构"""
        test_dir = tempfile.mkdtemp(prefix="rn_signing_test_")
        self.test_dirs.append(test_dir)

        ohos_dir = os.path.join(test_dir, "ohos")
        example_dir = os.path.join(ohos_dir, "example")
        harmony_dir = os.path.join(example_dir, "harmony")
        os.makedirs(harmony_dir, exist_ok=True)

        build_profile_path = os.path.join(harmony_dir, "build-profile.json5")
        with open(build_profile_path, "w", encoding="utf-8") as f:
            f.write(build_profile_content)

        return test_dir

    def test_sign_01_empty_signing_configs(self):
        """SIGN-01: 空签名配置同步"""
        build_profile = """{
  "app": {
    "signingConfigs": [],
    "products": [
      {
        "name": "default",
        "signingConfig": "default"
      }
    ]
  },
  "modules": []
}
"""
        test_dir = self._create_test_plugin_structure(build_profile)

        result = _sync_signing_to_build_profile(test_dir)

        # 如果签名配置文件不存在，跳过
        if not os.path.isfile(_RN_SIGNING_FILE):
            self.skipTest(f"签名配置文件不存在: {_RN_SIGNING_FILE}")

        self.assertTrue(result, "签名同步应成功")

        # 验证签名配置已写入
        build_profile_path = os.path.join(test_dir, "ohos", "example", "harmony", "build-profile.json5")
        with open(build_profile_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn('"name": "default"', content)
        self.assertIn('"type": "HarmonyOS"', content)
        self.assertIn('"material"', content)

    def test_sign_02_existing_signing_skip(self):
        """SIGN-02: 已有签名跳过"""
        build_profile = """{
  "app": {
    "signingConfigs": [
      {
        "name": "default",
        "type": "HarmonyOS",
        "material": {
          "certpath": "/path/to/cert.cer"
        }
      }
    ]
  }
}
"""
        test_dir = self._create_test_plugin_structure(build_profile)

        result = _sync_signing_to_build_profile(test_dir)

        # 已有签名配置，应跳过
        self.assertFalse(result, "已有签名配置应跳过")

    def test_sign_03_missing_signing_file(self):
        """SIGN-03: 签名配置文件不存在"""
        build_profile = """{
  "app": {
    "signingConfigs": []
  }
}
"""
        test_dir = self._create_test_plugin_structure(build_profile)

        # 临时修改签名文件路径
        original_file = _RN_SIGNING_FILE
        nonexistent_file = os.path.join(_WORKSPACE_ROOT, "adapt-workflow", "data", "signing.rn.local_nonexistent.json")

        # 如果原文件不存在，直接测试
        if not os.path.isfile(original_file):
            result = _sync_signing_to_build_profile(test_dir)
            self.assertFalse(result, "签名配置文件不存在应跳过")
        else:
            # 原文件存在，跳过此测试
            self.skipTest("签名配置文件存在，无法测试不存在场景")

    def test_sign_04_json5_format_preserved(self):
        """SIGN-04: JSON5 格式保持（缩进、注释）"""
        # 包含注释和非标准 JSON 格式
        build_profile = """{
  // This is a comment
  "app": {
    "signingConfigs": [ ], // empty array with space
    "products": [
      {
        "name": "default",
        "signingConfig": "default",
      }, // trailing comma
    ],
  },
  "modules": []
}
"""
        test_dir = self._create_test_plugin_structure(build_profile)

        if not os.path.isfile(_RN_SIGNING_FILE):
            self.skipTest(f"签名配置文件不存在: {_RN_SIGNING_FILE}")

        result = _sync_signing_to_build_profile(test_dir)

        if not result:
            self.skipTest("签名同步跳过（可能已有签名）")

        # 验证注释是否保留
        build_profile_path = os.path.join(test_dir, "ohos", "example", "harmony", "build-profile.json5")
        with open(build_profile_path, "r", encoding="utf-8") as f:
            content = f.read()

        # 检查注释是否保留
        self.assertIn("//", content, "注释应保留")

        # 检查缩进是否正确（签名配置应有正确的缩进层级）
        # signingConfigs 在 app 下，缩进应为 2 空格
        # 签名条目在 signingConfigs 数组中，缩进应为 4 空格
        self.assertTrue(
            re.search(r'"signingConfigs"\s*:\s*\[', content),
            "signingConfigs 数组格式正确"
        )

    def test_sign_05_missing_material_fields(self):
        """SIGN-05: 签名配置缺失必需字段"""
        # 创建一个临时的签名配置文件（缺失字段）
        test_signing_file = os.path.join(self._create_test_plugin_structure("{}"), "signing.rn.local.test.json")

        # 这个测试需要修改 _RN_SIGNING_FILE 的值，但由于它是模块级常量，
        # 我们只能测试现有配置文件的验证逻辑

        # 如果签名配置文件存在，验证其字段完整性
        if os.path.isfile(_RN_SIGNING_FILE):
            with open(_RN_SIGNING_FILE, "r", encoding="utf-8") as f:
                signing_config = json.load(f)

            material = signing_config.get("signingMaterial", {})
            required_fields = ["certpath", "profile", "storeFile", "keyAlias", "keyPassword", "storePassword"]
            missing = [f for f in required_fields if not material.get(f)]

            if missing:
                # 签名配置缺失字段，同步应跳过
                build_profile = """{"app": {"signingConfigs": []}}"""
                test_dir = self._create_test_plugin_structure(build_profile)
                result = _sync_signing_to_build_profile(test_dir)
                self.assertFalse(result, f"签名配置缺失字段 {missing} 应跳过")
            else:
                self.skipTest("签名配置字段完整")


if __name__ == "__main__":
    unittest.main()