# NiceImageView Demo 应用卡片（DroidRun）

## 一、基本信息

| 属性 | 值 |
|------|-----|
| 应用名称 | example_auto（NiceImageView 鸿蒙适配演示应用） |
| 应用包名（bundleName） | com.example.example_auto |
| 版本 | 1.0.0（versionCode 1000000） |
| 模块/能力 | entry（EntryAbility，`exported: true`，含桌面入口） |
| 设备类型 | phone（module.json5 声明） |
| 技术栈 | Flutter 纯 Dart + CustomPainter（依赖本地库 nice_image_view） |
| 入口页面 | 首页路由 `/` → HomePage（模块索引 + 一键测试全部） |

## 二、页面结构与导航

- **首页（模块索引一级页）**：AppBar 标题“NiceImageView 功能模块”，聚合进度面板（总用例/通过/失败/判定），【一键测试全部】按钮（Key `btn_test_all`），右上角【复制日志】（Key `btn_copy_log`），下方为八个模块索引项（Key `item_module_F-01` ~ `item_module_F-08`）。
- **模块列表二级页**：各模块用例列表，用例项 Key `item_testcase_F-XX-YY`，点击进入用例详情页。
- **用例详情三级页**：展示测试信息、测试步骤、预期结果明细、【组件展示】区域（NiceImageView 预览）、【执行用例】按钮（Key `btn_run_f-XX-YY`）、实际结果（Key `actual_f-XX-YY`）、预期结果（Key `expected_f-XX-YY`）、【结果面板】（Key `case_result_text`，展示“符合预期（PASS）/不符合预期（FAIL）/尚未执行（NOT_RUN）”）、【复制日志】与【重置当前用例】按钮。

## 三、关键控件

| 控件 | Key | 说明 |
|------|-----|------|
| 一键测试全部 | `btn_test_all` | 批量执行全部 24 条用例，弹出汇总对话框（Key `run_all_summary`） |
| 复制日志 | `btn_copy_log` | 复制全部用例日志到剪贴板 |
| 执行用例 | `btn_run_f-XX-YY` | 执行单条用例，共享执行器真实调用插件 API 后判定 PASS/FAIL |
| 复制日志（单条） | `btn_copy_log_f-XX-YY` | 复制单条用例日志 |
| 重置当前用例 | `btn_reset_f-XX-YY` | 将用例结果重置为 NOT_RUN |
| 模块索引项 | `item_module_F-XX` | 进入对应功能模块 |
| 用例列表项 | `item_testcase_F-XX-YY` | 进入用例详情页 |
| 结果面板 | `case_result_text` | 以中文展示判定与实际结果 |

## 四、用例覆盖范围

24 条用例覆盖需求六大模块：F-01 构造函数与初始化、F-02 圆形展示模式、F-03 圆角半径控制、F-04 边框绘制、F-05 边框覆盖控制、F-06 遮罩绘制，以及 F-07 重绘逻辑（shouldRepaint）与 F-08 边界条件。DroidRun 套件从中选取 5 条 L0 冒烟用例（DR-01 ~ DR-05）进行黑盒验证。
