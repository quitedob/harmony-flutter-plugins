# 三方比对验证指南

## 概述

本指南提供**测试分析报告评审**的三方数据一致性验证脚本索引。

**适用范围**：阶段 3 - 测试分析报告评审  
**验证对象**：`02-test-points.json`、`02-test-analysis-report.md`、`00-requirement.json`

---

## 验证脚本

### 脚本文件

`scripts/verify_analysis.py`

### 验证内容

| 校验项 | 比对来源 | 通过标准 |
|--------|----------|----------|
| 模块数 | 测试点 JSON = Markdown 报告 = 需求解析 JSON | 三者一致 |
| 用例总数 | 测试点 JSON = Markdown 报告 | 两者一致 |
| 级别分布 | L0/L1/L2/L3 各级别数量 | 各级别数量一致 |
| 模块级用例数 | 每个模块的用例数 | 每个模块用例数一致 |

### 使用方式

```bash
# 命令行执行
python scripts/verify_analysis.py 02-test-points.json 02-test-analysis-report.md 00-requirement.json
```

### Python 调用

```python
from scripts.verify_analysis import verify_three_way_consistency

# 执行三方一致性验证
passed, results = verify_three_way_consistency(
    '.rn-ohos-adaptation/02-test-points.json',
    '.rn-ohos-adaptation/02-test-analysis-report.md',
    '.rn-ohos-adaptation/00-requirement.json'
)

if not passed:
    print("三方数据一致性验证失败")
    if not results['moduleCount']['match']:
        print(f"模块数不一致：{results['moduleCount']['details']}")
    if not results['totalCases']['match']:
        print(f"用例总数不一致：{results['totalCases']['details']}")
    # 评审不通过，要求重新生成
else:
    print("三方数据一致性验证通过")
```

---

## 验证失败处理

**否决规则**：任何一项校验失败，评审直接判定为**不通过**。

| 验证失败类型 | 处理措施 |
|--------------|----------|
| 模块数不一致 | 评审不通过，要求重新生成测试分析报告 |
| 用例总数不一致 | 评审不通过，要求重新生成测试分析报告 |
| 级别分布不一致 | 评审不通过，要求重新生成测试分析报告 |
| 模块级用例数不一致 | 评审不通过，要求重新生成测试分析报告 |

---

*本文档最后更新：2026-04-12*
