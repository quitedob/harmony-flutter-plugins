# 程序化验证指南

## 概述

本指南提供测试用例评审阶段的程序化验证代码索引。

**适用范围**：阶段 5 - 测试用例评审

---

## 验证脚本

### 1. 两方数据一致性验证脚本

**脚本文件**：`scripts/verify_test_cases.py`

**验证内容**：功能点汇总 JSON、测试用例 JSON 两方数据一致性

**绑定模型**：模块 1──N 功能点 1──1 测试用例（用例 `id == featurePointId`）。脚本读取 `modules[].featurePoints[]`（兼容旧版 `testPoints`），用例总数取 `summary.totalFeaturePoints`（兼容旧版 `totalTestPoints`/`totalPoints`）。

**校验内容**：
1. 模块数校验：功能点 JSON = 测试用例 JSON
2. 用例总数校验：功能点数 = 用例数（1:1）
3. 级别分布校验：L0/L1/L2 各级别数量一致
4. 模块级用例数校验：每个模块的功能点数 = 用例数
5. 功能点 1:1 绑定校验：
   - 功能点 id 集合 == 用例 id 集合（无孤立功能点 / 无孤立用例）
   - 每条用例 `featurePointId` 指向有效功能点
   - 用例 `coveredApis.android` 与对应功能点的 `coveredApis.android` 一致

> **API 覆盖（聚合，非脚本两方硬校验）**：覆盖率评审中，待覆盖 Android API 并集 ⊆ ∪(各用例 `coveredApis.android`)。允许一条用例覆盖多个 API，不要求逐 API 一条用例。

**使用方式**：

```bash
# 命令行执行（第一个参数为功能点汇总 JSON，第二个为测试用例 JSON）
python scripts/verify_test_cases.py 01-test-points.json 04-test-cases.json
```

**Python 调用**：

```python
from scripts.verify_test_cases import verify_test_cases_two_way, verify_json_schema

# 两方一致性验证（含功能点 1:1 绑定校验）
passed, results = verify_test_cases_two_way(
    '01-test-points.json',   # 功能点汇总 JSON：modules[].featurePoints[]
    '04-test-cases.json'
)

if not passed:
    print("测试用例两方数据一致性验证失败")
    print(f"模块数：功能点={results['module_count']['test_points']}, " +
          f"用例={results['module_count']['json']}")
    print(f"用例总数：功能点={results['total_cases']['test_points']}, " +
          f"用例={results['total_cases']['json']}")
    # 功能点 1:1 绑定问题清单（id 集合、featurePointId 指向、coveredApis.android 一致性）
    binding = results.get('feature_point_binding', {})
    for issue in binding.get('issues', []):
        print(f"  - {issue}")
else:
    print("测试用例两方数据一致性验证通过")

# JSON Schema 验证（用例必含 id、featurePointId、coveredApis 等字段）
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
