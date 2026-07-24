# {{plugin_name}} 黑盒测试用例

## 测试范围概述
{{plugin_description}}

- 测试范围说明：覆盖所有公开功能，从用户视角进行黑盒测试
- 优先级说明：P0 = 必须测试，核心功能；P1 = 重要功能；P2 = 次要功能

## 功能模块划分
{{module_overview}}

## 测试用例清单

{% for module in modules %}

### {{module.name}}（{{module.priority}}）

| 用例ID | 测试标题 | 测试级别 | 前置条件 | 测试步骤 | 预期结果 |
|--------|----------|----------|----------|----------|----------|
{% for case in module.cases %}| {{case.id}} | {{case.title}} | {{case.level}} | {{case.preconditions}} | {{case.steps}} | {{case.expected}} |
{% endfor %}
{% endfor %}

## 测试覆盖率统计

| 优先级 | 用例数 | 覆盖率 |
|--------|--------|--------|
{% for stat in stats %}| {{stat.priority}} | {{stat.count}} | {{stat.percentage}}% |
{% endfor %}
| **总计** | **{{total}}** | **100%** |
