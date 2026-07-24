# Example 骨架生成器

**唯一职责**：拷贝 example 目录到 example_auto，然后读取测试用例 JSON 文件（自动在 `.ohos-adaptation` 目录下查找 `*test-cases*.json` 文件），生成 `example_auto/lib` 骨架结构（路由、模块列表页、测试用例列表页、测试用例详情页桩 + TODO 占位）。

> 生成器**不填充** Actions/Result 业务逻辑。填充由 LLM 在下一步根据 PRD 公开 API 规格完成。

## 输入格式（04-test-cases.json）

需要提供测试用例 JSON 文件（如 `04-test-cases.json`），遵循 Schema：`04-test-cases.schema.json`（与本 README.md 同目录）

```json
{
  "suite": {
    "id": "plugin_test_suite",
    "name": "插件测试套件",
    "app_package": "com.example.plugin",
    "app_card": "file:./plugin.md"
  },
  "modules": [
    {
      "moduleCode": "F-01",
      "moduleName": "功能模块",
      "moduleDescription": "模块描述",
      "priority": "P0",
      "test_cases": [
        {
          "id": "F01-001",
          "title": "测试用例标题",
          "level": "L0",
          "preconditions": "前置条件",
          "test_steps": [
            {
              "action": "点击【执行操作】按钮",
              "checkpoint": "验证点"
            }
          ],
          "expected_result": "预期结果",
          "postconditions": "后置条件"
        }
      ]
    }
  ]
}
```

## 用法

在插件仓库根目录执行：

### 方式一：Python（推荐）

```bash
python ".claude/skills/flutter-plugin-example-generator/tool/generate_example_lib.py"
```

常用参数：

| 参数 | 说明 |
|------|------|
| `--test-cases` | 测试用例 JSON 文件路径（默认：自动在 `.ohos-adaptation` 目录下查找 `*test-cases*.json` 文件） |
| `--out` | 输出目录（默认 example_auto/lib） |
| `--package` | Dart package 名称（用于 imports；默认从 example_auto/pubspec.yaml 读取，若不存在则从 example/pubspec.yaml 读取） |
| `--index-title` | 模块列表页 AppBar 标题（默认 功能模块） |
| `--dry-run` | 只打印将生成的模块与文件路径，不写盘 |

示例：

```bash
python ".claude/skills/flutter-plugin-example-generator/tool/generate_example_lib.py" --dry-run
python ".claude/skills/flutter-plugin-example-generator/tool/generate_example_lib.py" --test-cases .ohos-adaptation/04-test-cases.json --out example_auto/lib
```

### 方式二：Dart

> 注意：需要 Dart SDK 版本 ≥ 3.5，否则会报语言版本过高的错误。

```bash
dart run ".claude/skills/flutter-plugin-example-generator/tool/generate_example_lib.dart"
```

参数与 Python 版本相同。

示例：

```bash
dart run ".claude/skills/flutter-plugin-example-generator/tool/generate_example_lib.dart" --dry-run
dart run ".claude/skills/flutter-plugin-example-generator/tool/generate_example_lib.dart" --test-cases .ohos-adaptation/04-test-cases.json --out example_auto/lib
```

## 用例级别过滤

生成器支持按用例级别过滤：

- **Python 版本**：修改 `generate_example_lib.py` 顶部的配置常量
- **Dart 版本**：修改 `generate_example_lib.dart` 顶部的配置常量

```python
# Python 版本 (generate_example_lib.py)
# ============================================================================
# 生成配置：控制生成哪些级别的测试用例
# 注意：本 schema 的用例级别为 L0/L1/L2/L3
# ============================================================================
GENERATE_LEVELS = ['L0']  # 当前只生成 L0 级别
```

```dart
// Dart 版本 (generate_example_lib.dart)
// 注意：本 schema 的用例级别为 P0/P1/P2（不同于 Python 版本）
// ============================================================================
// 生成配置：控制生成哪些级别的测试用例
// ============================================================================
const List<String> kGenerateLevels = ['P0'];  // 当前只生成 P0 级别
```

修改示例（Python 版本，L0/L1/L2/L3）：
- `['L0']` — 只生成 L0 级别用例
- `['L0', 'L1']` — 生成 L0 和 L1 级别用例
- `['L0', 'L1', 'L2', 'L3']` — 生成所有级别用例

修改示例（Dart 版本，P0/P1/P2）：
- `['P0']` — 只生成 P0 级别用例
- `['P0', 'P1']` — 生成 P0 和 P1 级别用例
- `['P0', 'P1', 'P2']` — 生成所有级别用例

## 生成产物

1. **拷贝 example 目录到 example_auto**（如果 example 目录存在）
2. 在 example_auto/lib 生成以下文件：
   - main.dart（通用 MaterialApp 骨架）
   - app_keys.dart（语义 Key 定义）
   - routes.dart（按模块和测试用例生成路由）
   - pages/module_index_page.dart（模块列表页）
   - pages/module_{moduleId}_page.dart（每个模块的测试用例列表页）
   - pages/testcase_{caseId}_page.dart（每个测试用例的详情页桩，含 TODO 占位）
   - widgets/result_panel.dart（结果展示组件，仅显示 result 文本）

## 跨项目复用

复制整个 tool/ 目录（含 generate_example_lib.dart 与 example_skeleton/），
目标仓在保证测试用例 JSON 文件结构符合 04-test-cases.schema.json 后即可直接复用。

## 生成后下一步

由 LLM（或人工）根据 PRD 公开 API 规格，逐模块填充 TODO 占位。
