---
name: flutter-plugin-example-generator2
description: "基于 04-test-cases.json 生成完整的 Flutter 插件 example 代码（三级页面 + ResultPanel），包括骨架生成和根据 PRD 公开 API 规格及测试信息填充完整的功能实现（区分 API 类和 UI 类）。"
---

# Flutter 插件 Example 生成 Skill

## 执行前：Todo 清单（MANDATORY - 必须完成）

**重要：Todo 清单是强制性的，必须严格按照顺序完成每个步骤。**

- [ ] Step 1：调用代码生成器，从 04-test-cases.json 生成 example/lib 完整代码结构
- [ ] Step 2：根据 PRD 公开 API 规格和测试信息实现完整的功能逻辑
- [ ] Step 3：逐模块验收运行与可测性
- [ ] Step 4：生成 Demo 生成结果文件

### 反面示例：不遵循 Todo 清单的后果

**错误执行方式：**
1. 跳过 Todo 清单，直接执行 Step 1
2. 运行代码生成器后立即结束，没有执行后续步骤

**可能导致的问题：**
- 生成的代码结构不完整，缺少功能实现
- 无法验证生成的代码是否符合测试用例要求
- 缺少必要的验收测试，可能存在隐藏的编译或运行时错误
- 没有生成 Demo 生成结果文件，无法追踪生成状态和统计信息
- 整体工作流不完整，影响后续阶段的执行

## Step 1：调用代码生成器（生成完整代码结构）

```bash
python ".claude/skills/flutter-plugin-example-generator/tool/generate_example_lib.py"
```

生成器会：
1. **拷贝 example 目录到 example_auto**（如果 example 目录存在）
2. **清理不需要的文件**（包括 `.flutter-plugins`、`.flutter-plugins-dependencies` 等自动生成的文件）
3. 自动在 .ohos-adaptation 目录下查找包含 test-cases 名称的 JSON 文件（如 04-test-cases.json）
4. 输出完整的代码结构到 example_auto/lib：
   - main.dart、app_keys.dart、routes.dart、widgets/result_panel.dart（通用结构）
   - pages/module_index_page.dart（模块列表页）
   - 每个功能模块一个 pages/module_f_XX_page.dart（测试用例列表页）
   - 每个测试用例一个 pages/testcase_fXX_XX_page.dart（测试用例详情页，含测试信息和功能实现占位）

## Step 2：根据 PRD 公开 API 规格和测试信息实现完整功能逻辑

1. **参考资料**：
   - 打开 01-analysis-prd.md 的第 3 章公开 API 规格
   - 参考 .ohos-adaptation 目录下的测试用例 JSON 文件中的测试用例信息
   - 查看生成的 pages/testcase_fXX_XX_page.dart 中的测试信息（优先级、前置条件、测试步骤、预期结果）

2. **实现策略**：
   - 对每个测试用例详情页 testcase_fXX_XX_page.dart，实现完整的功能逻辑
   - 根据测试步骤中的 API 调用信息，创建对应的操作按钮和实现逻辑
   - 确保每个操作都能满足测试用例的预期结果

3. **实现要求**：

### API 类条目（插件对外提供方法调用）

用 ElevatedButton 包装：
- **按钮文字**：优先参考测试信息中的描述，例如测试信息中写了"点击【显示默认Toast】按钮"，则按钮文字为"显示默认Toast"
- **语义 Key**：添加语义 Key，如 Key('btn_show_default_toast')
- **实现逻辑**：onPressed 中调用对应 API，并 setState 更新 _result
- **聚焦当前场景**：只实现满足当前测试用例场景的功能，不要发散到其他参数组合

### UI 类条目（插件直接对外提供 Widget）

直接在 Actions 区域放置该 Widget：
- 不需要按钮包装
- 必要时用 Card 或 Padding 包裹
- 实现 Widget 的交互回调，并将可验证状态写入 _result

### 通用要求

- 实现 // TODO(import) 处的插件 import
- 如模块需要初始化实例，实现 // TODO(init) 处的实例声明与初始化
- 每次功能触发都要 setState 更新 _result，让 ResultPanel 可读
- 按钮的文字是给测试人员看的，要能看出"点这个按钮是在验证什么功能"
- **build 期间的回调中的 setState() 调用时机（重要）**：
  - 如 loadStateChanged、builder 等在 widget build 阶段同步执行的回调
  - 若需更新状态，必须使用 `WidgetsBinding.instance.addPostFrameCallback` 延迟到帧渲染完成后执行
  - 否则会触发 "setState() called during build" 异常
  - 示例：
    ```dart
    // ❌ 错误：build 期间直接调用 setState
    loadStateChanged: (state) {
      if (state.completed) {
        setState(() { _result = '成功'; });  // 会抛出异常！
      }
    }
    
    // ✅ 正确：延迟到帧渲染完成后执行
    loadStateChanged: (state) {
      if (state.completed) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          setState(() { _result = '成功'; });
        });
      }
    }
    ```

## Step 3：验收运行与可测性

1. **重新生成依赖文件**（重要）：
   - 由于生成器删除了 `.flutter-plugins` 和 `.flutter-plugins-dependencies` 文件，需要重新生成：
     ```bash
     cd example_auto
     flutter pub get
     ```
   - 这会根据当前项目路径重新生成正确的插件配置文件，避免 hvigor 构建时使用旧路径

2. 构建应用：
   - **推荐：使用 node 直接运行 hvigorw.js**（绕过 Windows batch 递归问题）：
     1. 首先查找 node 和 hvigorw.js 的路径：
        ```bash
        where node
        where hvigorw.js
        ```
     2. 使用查找到的路径执行构建（替换 `<NODE_PATH>` 和 `<HVIGORW_PATH>` 为上一步输出的路径）：
        ```bash
        cd example_auto/ohos
        "<NODE_PATH>" "<HVIGORW_PATH>" assembleHap -p product=default -p buildMode=release --no-daemon
        ```
     示例：如果输出如下：
        - `where node` 输出 `D:\Program Files\Huawei\DevEco Studio\tools\node\node.exe`
        - `where hvigorw.js` 输出 `D:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.js`
        
        则执行：
        ```bash
        cd example_auto/ohos
        "D:\Program Files\Huawei\DevEco Studio\tools\node\node.exe" "D:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.js" assembleHap -p product=default -p buildMode=release --no-daemon
        ```
   - **备选1：使用 hvigorw 命令**（在 macOS/Linux 或 Windows 无递归问题时）：
     ```bash
     cd example_auto/ohos
     hvigorw assembleHap -p product=default -p buildMode=release --no-daemon
     ```
   - **备选2：使用 flutter 命令**（如果 hvigorw 命令失败）：
     ```bash
     cd example_auto
     flutter build hap
     ```
   - **常见错误处理**：
     - 如果遇到 "BATCH RECURSION exceeds STACK limits" 错误，使用推荐的 node 方式
     - 构建产物位置：`example_auto/ohos/entry/build/default/outputs/default/`
   - 如果因为环境原因执行失败，执行 `flutter analyze` 检查是否有关键错误

3. **检查构建产物**：
   - 构建成功后，检查 HAP 文件是否存在：
     ```bash
     ls -la example_auto/ohos/entry/build/default/outputs/default/*.hap
     ```
   - 产物文件说明：
     | 文件名 | 说明 |
     |--------|------|
     | `entry-default-unsigned.hap` | 未签名的 HAP（开发测试用） |
     | `entry-default-signed.hap` | 已签名的 HAP（需要配置签名） |
   - HAP 文件大小通常在 10MB-50MB 之间
   - 如果没有生成 HAP 文件，说明构建失败，需要检查错误日志

4. 打开 /module-index，逐个进入 /module/{moduleId}，然后进入具体的测试用例详情页
5. 对每个测试用例：
   - 执行测试步骤中描述的操作
   - 验证是否符合预期结果
   - 确保 ResultPanel 输出明确的成功或失败文本
6. 确认所有按钮的 Key 和 ResultPanel 的 txt_result 语义 Key 到位
7. 检查优先级为 P0 的测试用例是否全部通过

## Step 4：生成 Demo 生成结果文件

1. **生成 05-demo-gen.json**：
   - 包含 Demo 生成的状态、结果、统计信息
   - 格式示例：
   ```json
   {
     "status": "success",
     "message": "Demo App 生成成功",
     "generatedAt": "2026-03-28T10:00:00+08:00",
     "statistics": {
       "modules": 2,
       "testCases": 10,
       "p0TestCases": 5,
       "generatedFiles": 15
     },
     "generatedFiles": [
       "example/lib/main.dart",
       "example/lib/app_keys.dart",
       "example/lib/routes.dart",
       "example/lib/widgets/result_panel.dart",
       "example/lib/pages/module_index_page.dart",
       "example/lib/pages/module_f_01_page.dart",
       "example/lib/pages/testcase_f01_001_page.dart"
     ]
   }
   ```

2. **生成 05-demo-gen-report.md**：
   - 包含 Demo 生成的详细报告
   - 格式示例：
   ```markdown
   # Demo 生成报告

   ## 生成状态
   - 状态：成功
   - 生成时间：2026-03-28 10:00:00

   ## 生成统计
   - 功能模块数：2
   - 测试用例数：10
   - P0 测试用例数：5
   - 生成文件数：15

   ## 生成文件列表
   - example/lib/main.dart
   - example/lib/app_keys.dart
   - example/lib/routes.dart
   - example/lib/widgets/result_panel.dart
   - example/lib/pages/module_index_page.dart
   - example/lib/pages/module_f_01_page.dart
   - example/lib/pages/testcase_f01_001_page.dart

   ## 验证结果
   - 编译状态：通过
   - P0 测试用例验证：全部通过

   ## 注意事项
   - Demo App 已成功生成，可以在 OHOS 真机上安装运行
   - 请按照 README.md 中的说明进行测试
   ```

## 额外参考

- 骨架生成器：.claude/skills/flutter-plugin-example-generator/tool/generate_example_lib.py
- 测试用例文件：.ohos-adaptation 目录下的 *test-cases*.json 文件（如 04-test-cases.json）
- 规则细节和示例：reference.md、examples.md