"""一键执行所有测试

特性：
- 一键执行全部测试
- 可重复执行
- 自动清理测试产物

- Python：通过 unittest discover 执行所有 test_*.py
"""

import os
import sys
import unittest
import argparse

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from tool.tests.conftest import cleanup_all_fixtures, FIXTURES_DIR


def run_all_tests(verbose: bool = True) -> int:
    """执行所有测试
    
    Args:
        verbose: 是否显示详细输出
    
    Returns:
        测试结果：0=成功，1=失败
    """
    print("=" * 60)
    print("开始执行所有测试（rn.py CLI 入口）")
    print("=" * 60)
    
    # 清理旧的测试产物
    print("\n[步骤 1] 清理旧的测试产物...")
    cleanup_all_fixtures()
    
    # 发现并加载所有测试
    print("\n[步骤 2] 加载测试模块...")
    loader = unittest.TestLoader()
    
    # 发现所有 test_*.py 文件
    suite = loader.discover(os.path.dirname(__file__), pattern="test_*.py")
    
    # 执行测试
    print("\n[步骤 3] 执行测试...")
    print("-" * 60)
    
    runner = unittest.TextTestRunner(
        verbosity=2 if verbose else 1,
        stream=sys.stdout
    )
    
    result = runner.run(suite)
    
    # 清理测试产物
    print("\n[步骤 4] 清理测试产物...")
    cleanup_all_fixtures()
    
    # 输出汇总
    print("\n" + "=" * 60)
    print("测试结果汇总")
    print("=" * 60)
    print(f"  执行测试: {result.testsRun}")
    print(f"  成功: {result.testsRun - len(result.failures) - len(result.errors)}")
    print(f"  失败: {len(result.failures)}")
    print(f"  错误: {len(result.errors)}")
    print("=" * 60)
    
    if result.failures:
        print("\n失败的测试:")
        for test, traceback in result.failures:
            print(f"  - {test}")
    
    if result.errors:
        print("\n错误的测试:")
        for test, traceback in result.errors:
            print(f"  - {test}")
    
    return 0 if result.wasSuccessful() else 1


def run_single_test(module_name: str) -> int:
    """执行单个测试模块"""
    print(f"\n执行测试模块: {module_name}")
    
    cleanup_all_fixtures()
    
    loader = unittest.TestLoader()
    suite = loader.discover(os.path.dirname(__file__), pattern=f"{module_name}.py")
    
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    cleanup_all_fixtures()
    
    return 0 if result.wasSuccessful() else 1


def main():
    parser = argparse.ArgumentParser(description="执行测试")
    parser.add_argument("--module", help="只执行指定模块的测试")
    parser.add_argument("--quiet", action="store_true", help="减少输出")
    parser.add_argument("--no-cleanup", action="store_true", help="测试后不清理")
    
    args = parser.parse_args()
    
    try:
        if args.module:
            result = run_single_test(args.module)
        else:
            result = run_all_tests(verbose=not args.quiet)
        
        if args.no_cleanup:
            print("\n[跳过清理] 测试产物保留")
        
        sys.exit(result)
    except Exception as e:
        print(f"\n错误: {e}")
        cleanup_all_fixtures()
        sys.exit(1)


if __name__ == "__main__":
    main()