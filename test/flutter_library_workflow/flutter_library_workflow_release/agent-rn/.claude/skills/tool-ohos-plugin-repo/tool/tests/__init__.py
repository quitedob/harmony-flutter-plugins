"""测试包

所有测试通过 rn.py CLI 入口执行，验证整体流程正确性。

包含：
- conftest.py: fixture 构造和清理
- test_rn.py: rn.py CLI 测试（CREATE + MIGRATE）
- run_all.py: 一键执行所有测试
"""

from .conftest import (
    cleanup_all_fixtures,
    cleanup_ohos,
    cleanup_fixture,
    create_fixture_dir,
    read_json,
    read_file,
    file_exists,
    dir_exists,
    FIXTURES_DIR,
)