---
name: flu-plugins-hypium-testcase-gen
description: 根据插件PRD生成纯黑盒测试用例，遵循黑盒测试方法论，不涉及内部API细节，为后续hypium自动化测试生成测试用例
---

# flu-plugins-hypium-testcase-gen

## Skill职责

根据Flutter插件的PRD（产品需求文档），生成纯黑盒测试用例，保存到指定输出目录。只关注用户视角可见的功能行为，不涉及插件内部API调用细节。

## 触发场景

- 主skill批量生成测试用例时调用
- 需要为单个Flutter插件生成黑盒测试用例
- PRD已经完成，准备开始自动化测试

## 输入参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `plugin_name` | 是 | 插件名称 |
| `prd_path` | 是 | PRD文件路径 |
| `output_dir` | 是 | 输出目录，生成的测试用例保存到这里 |

## 执行步骤

1. **读取PRD文件**
   - 读取PRD内容，PRD路径一般在插件路径下的\.ohos-adaptation文件夹，命名中包含prd，提取所有功能模块
   - 识别功能优先级（P0/P1/P2）
   - 整理每个功能的输入、输出、预期行为

2. **设计测试用例（核心：纯黑盒操作视角）**
   - **纯黑盒视角**：测试步骤必须描述用户可见的操作（点击、输入、等待等），不能直接写API调用代码
   - 每个功能模块设计：
     - 正常流程测试：符合预期的用户操作
     - 异常流程测试：错误操作场景
     - 边界条件测试：极限操作
   - 每个测试用例包含：用例ID、标题、测试级别、前置条件、测试步骤、预期结果

3. **编写测试步骤的规则（重要）**
   - **禁止**：直接写API调用代码，如 `Fluttertoast.showToast(msg: "xxx")`
   - **必须**：描述用户界面操作，如 `点击【显示Toast】按钮`
   - **API备注规范**：在步骤描述后的括号内备注相关API信息，格式：`(API: ClassName.methodName, 参数: key=value)`
   - **步骤示例**：
     - ❌ 错误：`调用 Fluttertoast.showToast(msg: "长消息", toastLength: Toast.LENGTH_LONG)`
     - ✅ 正确：`点击【显示长消息Toast】按钮 (API: Fluttertoast.showToast, toastLength: Toast.LENGTH_LONG)`
     - ✅ 正确：`在输入框中输入文本"测试消息"，然后点击【发送】按钮 (API: Fluttertoast.showToast, msg: "测试消息")`
   - **通用原则**：
     - 步骤必须是测试人员/用户可以在UI上执行的操作
     - API信息仅作为备注，用于后续自动化测试生成时的映射
     - 同一功能的多个参数组合应设计为多个独立用例

4. **组织Markdown输出（使用MD模板）**
   - 使用assets中的`test-case-template.md`模板
   - 按功能模块分组整理
   - 统计测试覆盖率

5. **组织JSON输出（使用JSON模板）**
   - 使用assets中的`test-case-template.json`模板
   - 按功能模块分组整理
   - 统计测试覆盖率
   - 添加生成时间戳（ISO8601格式）

6. **保存输出文件**
   - 保存Markdown版本: `.ohos-adaptation/test-cases.md`
   - 保存JSON版本: `.ohos-adaptation/test-cases.json`

## 输出标准

### Markdown格式输出

输出Markdown文件，包含以下结构：

```markdown
# {plugin-name} 黑盒测试用例

## 测试范围概述
- 插件信息简述
- 测试范围说明
- 优先级说明

## 功能模块划分
- 功能模块表格

## 测试用例清单

### {模块名称}（优先级）

| 用例ID | 测试标题 | 测试级别 | 前置条件 | 测试步骤 | 预期结果 |
|--------|----------|----------|----------|----------|----------|
| ID-001 | ... | ... | ... | ... | ... |

## 测试覆盖率统计
- P0: xx%
- P1: xx%
- P2: xx%
- 总计: xx 个测试用例
```

### JSON格式输出

输出JSON文件，包含以下结构：

```json
{
  "pluginName": "{插件名称}",
  "pluginDescription": "{插件描述}",
  "testScope": {
    "description": "{测试范围说明}",
    "priorityNote": "{优先级说明}"
  },
  "modules": [
    {
      "moduleCode": "F-01",
      "moduleName": "{模块名称}",
      "moduleDescription": "{模块模块描述}",
      "priority": "P0",
      "testCases": [
        {
          "caseId": "F01-001",
          "title": "{测试标题}",
          "level": "P0",
          "preconditions": "{前置条件}",
          "steps": "{测试步骤}",
          "expected": "{预期结果}"
        }
      ]
    }
  ],
  "coverage": {
    "P0": { "count": 17, "percentage": "100%" },
    "P1": { "count": 15, "percentage": "100%" },
    "P2": { "count": 0, "percentage": "0%" },
    "total": 32
  },
  "generatedAt": "{ISO8601时间戳}"
}
```

## 质量要求

- **纯黑盒视角**：不描述内部API调用，只描述用户操作和可见结果
- **测试步骤可执行**：每个步骤必须是用户可以在UI上执行的操作
- **API信息备注**：API调用信息应在步骤后的括号内备注，不直接写在步骤中
- **完整性**：P0功能100%覆盖
- **清晰性**：每个测试用例步骤清晰可执行
- **独立性**：每个用例可独立执行

## 资源

### assets/
- `test-case-template.md` - 测试用例Markdown输出模板
- `test-case-template.json` - 测试用例JSON输出模板

### references/
- `content-standard.md` - 内容编写标准
- `prd-example.md` - PRD参考示例
