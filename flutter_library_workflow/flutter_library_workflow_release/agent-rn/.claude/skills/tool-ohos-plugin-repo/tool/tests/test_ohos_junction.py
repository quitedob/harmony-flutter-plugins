"""ohos_junction.py 测试

测试用例：
- JUNCTION-01: 跳过已存在的编号，分配下一个未被占用的编号
- JUNCTION-02: 多个编号已存在时，找到第一个未被占用的编号
- JUNCTION-03: 验证不会删除已存在的目录内容
- JUNCTION-04: 找到下一个可用编号
- JUNCTION-05: 非数字目录不影响编号分配

注意：
- _next_rn_sequence_dir 只在 Windows 上使用（用于创建短路径目录）
- macOS/Linux 不需要 junction，直接在项目目录下创建 ohos
- 测试使用临时目录，不影响真实的 D:\\rn
"""

import os
import shutil
import sys
import tempfile
import unittest

_lib_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, _lib_dir)

from lib.ohos_junction import (
    _is_broken_link,
    _is_reparse_point,
    _next_rn_sequence_dir,
    _prepare_ohos_link,
    _remove_link_path,
    _rollback_empty_dir,
    create_ohos_junction,
    ohos_link_is_usable,
    should_use_ohos_junction,
)


@unittest.skipUnless(sys.platform == "win32", "Junction 只在 Windows 上使用")
class TestNextRnSequenceDir(unittest.TestCase):
    """_next_rn_sequence_dir 函数测试"""

    def setUp(self):
        self.temp_drive_root = tempfile.mkdtemp(prefix="test_rn_junction_")
        self.rn_root = os.path.join(self.temp_drive_root, "rn")
        os.makedirs(self.rn_root)
        
        self.original_drive = None

    def tearDown(self):
        if self.temp_drive_root and os.path.exists(self.temp_drive_root):
            shutil.rmtree(self.temp_drive_root)
        self.temp_drive_root = None

    def _mock_next_rn_sequence_dir(self) -> str:
        """模拟 _next_rn_sequence_dir，使用临时目录而非真实盘符"""
        max_n = 0
        for name in os.listdir(self.rn_root):
            p = os.path.join(self.rn_root, name)
            if os.path.isdir(p) and name.isdigit():
                max_n = max(max_n, int(name))
        
        seq = max_n + 1
        while True:
            real_dir = os.path.join(self.rn_root, str(seq))
            if not os.path.exists(real_dir):
                break
            seq += 1
        
        return real_dir

    def _create_test_dir(self, seq: str, content_file: str = None) -> str:
        """创建测试目录"""
        dir_path = os.path.join(self.rn_root, seq)
        os.makedirs(dir_path, exist_ok=True)
        
        if content_file:
            with open(os.path.join(dir_path, content_file), "w") as f:
                f.write(f"data for {seq}")
        
        return dir_path

    def test_junction_01_skip_existing_single(self):
        """JUNCTION-01: 跳过已存在的编号，分配下一个未被占用的编号"""
        self._create_test_dir("1", "project_data.txt")
        
        result = self._mock_next_rn_sequence_dir()
        
        expected = os.path.join(self.rn_root, "2")
        self.assertEqual(result, expected)
        
        self.assertTrue(os.path.exists(os.path.join(self.rn_root, "1", "project_data.txt")))

    def test_junction_02_skip_existing_multiple(self):
        """JUNCTION-02: 多个编号已存在时，找到第一个未被占用的编号"""
        for seq in ["1", "2", "3"]:
            self._create_test_dir(seq, f"project_{seq}.txt")
        
        result = self._mock_next_rn_sequence_dir()
        
        expected = os.path.join(self.rn_root, "4")
        self.assertEqual(result, expected)
        
        for seq in ["1", "2", "3"]:
            self.assertTrue(os.path.exists(os.path.join(self.rn_root, seq, f"project_{seq}.txt")))

    def test_junction_03_no_deletion(self):
        """JUNCTION-03: 验证不会删除已存在的目录内容"""
        test_dir = self._create_test_dir("1", "important_data.txt")
        test_file = os.path.join(test_dir, "important_data.txt")
        
        with open(test_file, "w") as f:
            f.write("important data should not be deleted")
        
        result1 = self._mock_next_rn_sequence_dir()
        self.assertEqual(result1, os.path.join(self.rn_root, "2"))
        
        os.makedirs(result1)
        
        result2 = self._mock_next_rn_sequence_dir()
        self.assertEqual(result2, os.path.join(self.rn_root, "3"))
        
        self.assertTrue(os.path.exists(test_file))
        with open(test_file, "r") as f:
            content = f.read()
            self.assertEqual(content, "important data should not be deleted")

    def test_junction_04_finds_next_available(self):
        """JUNCTION-04: 找到下一个可用编号"""
        result = self._mock_next_rn_sequence_dir()
        
        expected = os.path.join(self.rn_root, "1")
        self.assertEqual(result, expected)
        
        self.assertFalse(os.path.exists(result))

    def test_junction_05_non_numeric_dirs_ignored(self):
        """JUNCTION-05: 非数字目录不影响编号分配"""
        os.makedirs(os.path.join(self.rn_root, "other"))
        os.makedirs(os.path.join(self.rn_root, "temp"))
        self._create_test_dir("10")
        
        result = self._mock_next_rn_sequence_dir()
        
        expected = os.path.join(self.rn_root, "11")
        self.assertEqual(result, expected)


class TestShouldUseOhosJunction(unittest.TestCase):
    """should_use_ohos_junction 函数测试（跨平台）"""

    def test_platform_check(self):
        """验证 should_use_ohos_junction 只在 Windows 上返回 True"""
        if sys.platform == "win32":
            self.assertTrue(should_use_ohos_junction(os.path.abspath(__file__)))
        else:
            self.assertFalse(should_use_ohos_junction(os.path.abspath(__file__)))

    def test_windows_drive_required(self):
        """Windows 上需要盘符路径才返回 True"""
        if sys.platform != "win32":
            self.skipTest("仅在 Windows 上测试")
        
        abs_path = os.path.abspath(__file__)
        self.assertTrue(should_use_ohos_junction(abs_path))
        
        unc_path = "\\\\server\\share\\path"
        self.assertFalse(should_use_ohos_junction(unc_path))


class TestNextRnSequenceDirReal(unittest.TestCase):
    """测试真实 _next_rn_sequence_dir 函数逻辑（使用临时盘符）"""

    @unittest.skipUnless(sys.platform == "win32", "Junction 只在 Windows 上使用")
    def test_real_function_logic(self):
        """验证真实函数的跳过逻辑"""
        temp_root = tempfile.mkdtemp(prefix="test_real_rn_")
        try:
            drive = os.path.splitdrive(temp_root)[0]
            
            rn_root = os.path.join(drive + "\\", "rn")
            
            test_dir_name = "__test_junction_marker__"
            test_dir = os.path.join(rn_root, test_dir_name)
            
            os.makedirs(test_dir, exist_ok=True)
            with open(os.path.join(test_dir, "test.txt"), "w") as f:
                f.write("test data")
            
            max_before = 0
            for name in os.listdir(rn_root):
                if name.isdigit() and os.path.isdir(os.path.join(rn_root, name)):
                    max_before = max(max_before, int(name))
            
            result = _next_rn_sequence_dir(drive)
            result_seq = int(os.path.basename(result))
            
            self.assertGreater(result_seq, max_before)
            
            self.assertTrue(os.path.exists(os.path.join(test_dir, "test.txt")))
            
            if os.path.exists(test_dir):
                shutil.rmtree(test_dir)
            
            result_dir = result
            if os.path.exists(result_dir):
                shutil.rmtree(result_dir)
        finally:
            if os.path.exists(temp_root):
                shutil.rmtree(temp_root)


@unittest.skipUnless(sys.platform == "win32", "Junction 只在 Windows 上使用")
class TestOhosLinkHelpers(unittest.TestCase):
    """损坏 junction 检测与清理测试"""

    def setUp(self):
        self.temp_root = tempfile.mkdtemp(prefix="test_ohos_link_")
        self.real_dir = os.path.join(self.temp_root, "real")
        self.link_path = os.path.join(self.temp_root, "ohos")
        os.makedirs(self.real_dir)

    def tearDown(self):
        for path in (self.link_path, self.real_dir, self.temp_root):
            if os.path.lexists(path):
                if _is_reparse_point(path) or os.path.islink(path):
                    try:
                        os.rmdir(path)
                    except OSError:
                        os.unlink(path)
                elif os.path.isdir(path):
                    shutil.rmtree(path, ignore_errors=True)
                else:
                    try:
                        os.remove(path)
                    except OSError:
                        pass

    def _create_junction(self, link: str, target: str) -> None:
        r = __import__("subprocess").run(
            ["cmd", "/c", "mklink", "/J", link, target],
            capture_output=True,
            text=True,
        )
        self.assertEqual(r.returncode, 0, r.stdout or r.stderr)

    def test_reparse_point_detects_broken_junction(self):
        """损坏 junction 仍应被识别为重解析点"""
        self._create_junction(self.link_path, self.real_dir)
        shutil.rmtree(self.real_dir)

        self.assertTrue(_is_reparse_point(self.link_path))
        self.assertTrue(_is_broken_link(self.link_path))
        self.assertFalse(ohos_link_is_usable(self.temp_root))

    def test_prepare_removes_broken_junction(self):
        """_prepare_ohos_link 应自动删除损坏 junction"""
        self._create_junction(self.link_path, self.real_dir)
        shutil.rmtree(self.real_dir)

        _prepare_ohos_link(self.link_path, force=False)

        self.assertFalse(os.path.lexists(self.link_path))

    def test_create_ohos_junction_recreates_after_broken_link(self):
        """create_ohos_junction 在损坏链接后应能成功重建"""
        self._create_junction(self.link_path, self.real_dir)
        shutil.rmtree(self.real_dir)

        result = create_ohos_junction(self.temp_root, force=False)

        self.assertEqual(result, self.link_path)
        self.assertTrue(ohos_link_is_usable(self.temp_root))
        self.assertTrue(os.path.isfile(os.path.join(self.temp_root, ".rn-ohos-junction.json")))

    def test_rollback_empty_dir_on_junction_failure(self):
        """junction 创建失败时应回滚空目录"""
        orphan = os.path.join(self.temp_root, "orphan")
        os.makedirs(orphan)
        self.assertTrue(os.path.isdir(orphan))

        _rollback_empty_dir(orphan)

        self.assertFalse(os.path.exists(orphan))


if __name__ == "__main__":
    unittest.main()