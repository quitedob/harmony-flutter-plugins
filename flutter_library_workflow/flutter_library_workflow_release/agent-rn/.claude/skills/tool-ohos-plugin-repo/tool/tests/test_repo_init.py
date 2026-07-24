"""rn.py repo-init：复制 .rn-ohos-adaptation 到 ohos git 仓库。"""

import os
import sys
import tempfile
import unittest

_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if _SKILL_ROOT not in sys.path:
    sys.path.insert(0, _SKILL_ROOT)

from tool import rn  # noqa: E402


class TestRepoInitAdaptationDir(unittest.TestCase):
    def test_install_adaptation_dir_copies_to_ohos(self):
        with tempfile.TemporaryDirectory() as plugin_root:
            ohos_real = os.path.join(plugin_root, "ohos")
            os.makedirs(ohos_real)
            adapt_src = os.path.join(plugin_root, rn._ADAPTATION_DIR)
            os.makedirs(adapt_src)
            prd_src = os.path.join(adapt_src, rn._ANALYSIS_PRD_FILENAME)
            with open(prd_src, "w", encoding="utf-8") as f:
                f.write("# PRD\n")
            with open(os.path.join(adapt_src, "01-analysis.json"), "w", encoding="utf-8") as f:
                f.write('{"ok": true}')

            self.assertTrue(rn._install_adaptation_dir_in_ohos_repo(plugin_root, ohos_real))

            adapt_dst = os.path.join(ohos_real, rn._ADAPTATION_DIR)
            prd_dst = os.path.join(adapt_dst, rn._ANALYSIS_PRD_FILENAME)
            self.assertTrue(os.path.isdir(adapt_dst))
            self.assertTrue(os.path.isfile(prd_dst))
            with open(prd_dst, "r", encoding="utf-8") as f:
                self.assertEqual(f.read(), "# PRD\n")
            self.assertFalse(os.path.isfile(os.path.join(ohos_real, rn._ANALYSIS_PRD_FILENAME)))

    def test_install_adaptation_dir_missing_source_warns(self):
        with tempfile.TemporaryDirectory() as plugin_root:
            ohos_real = os.path.join(plugin_root, "ohos")
            os.makedirs(ohos_real)
            self.assertFalse(rn._install_adaptation_dir_in_ohos_repo(plugin_root, ohos_real))
            self.assertFalse(os.path.isdir(os.path.join(ohos_real, rn._ADAPTATION_DIR)))

    def test_install_adaptation_dir_removes_legacy_root_prd(self):
        with tempfile.TemporaryDirectory() as plugin_root:
            ohos_real = os.path.join(plugin_root, "ohos")
            os.makedirs(ohos_real)
            legacy_prd = os.path.join(ohos_real, rn._ANALYSIS_PRD_FILENAME)
            with open(legacy_prd, "w", encoding="utf-8") as f:
                f.write("legacy\n")

            adapt_src = os.path.join(plugin_root, rn._ADAPTATION_DIR)
            os.makedirs(adapt_src)
            with open(os.path.join(adapt_src, rn._ANALYSIS_PRD_FILENAME), "w", encoding="utf-8") as f:
                f.write("# PRD\n")

            rn._install_adaptation_dir_in_ohos_repo(plugin_root, ohos_real)
            self.assertFalse(os.path.isfile(legacy_prd))


if __name__ == "__main__":
    unittest.main()
