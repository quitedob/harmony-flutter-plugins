# 程序化验证指南

## 概述

本指南提供测试用例评审阶段的程序化验证代码索引。

**适用范围**：阶段 5 - 测试用例评审

---

## 验证脚本

### 1. 两方数据一致性验证脚本

**脚本文件**：`scripts/verify_test_cases.py`

**验证内容**：测试点汇总 JSON、测试用例 JSON 两方数据一致性

**校验内容**：
1. 模块数校验：测试点 JSON = 测试用例 JSON
2. 用例总数校验：两方一致
3. 级别分布校验：L0/L1/L2 各级别数量一致
4. 模块级用例数校验：每个模块的用例数一致

**使用方式**：

```bash
# 命令行执行
python scripts/verify_test_cases.py 01-test-points.json 04-test-cases.json
```

**Python 调用**：

```python
from scripts.verify_test_cases import verify_test_cases_two_way, verify_json_schema

# 两方一致性验证
passed, results = verify_test_cases_two_way(
    '01-test-points.json',
    '04-test-cases.json'
)

if not passed:
    print("测试用例两方数据一致性验证失败")
    print(f"模块数：测试点={results['module_count']['test_points']}, " +
          f"JSON={results['module_count']['json']}")
else:
    print("测试用例两方数据一致性验证通过")

# JSON Schema 验证
passed, errors = verify_json_schema(
    '04-test-cases.json',
    schema  # 从 assets/case-review-schema.json 加载
)
```

---

## 校验失败处理

**两方比对校验失败**：
- 任何一项校验失败，评审直接判定为**不通过**
- 在评审报告中明确列出不一致的详情
- 要求重新生成上一阶段的产物

---

*本文档最后更新：2026-04-12*
