# {plugin_name} Example 应用卡片

## 应用信息

- **bundleName**: `{app_package}`
- **主 Ability**: `EntryAbility`
- **启动后默认页面**: 模块列表页（ModuleIndexPage）

## 页面结构（三级导航）

| 层级 | 页面类名 | 说明 |
|------|---------|------|
| L1 首页 | `ModuleIndexPage` | 列出所有测试模块，每项为可点击的模块卡片 |
| L2 模块页 | `ModuleFXXPage` | 该模块下的测试用例列表，每项为可点击的用例卡片 |
| L3 用例详情页 | `TestcaseFXX_XXPage` | 顶部：测试信息（优先级、前置、步骤、预期） / 中部：功能按钮 / 底部：【结果】面板 |

## 可观察结果位置

所有方法调用、点击事件、错误信息统一写入用例详情页底部的 **【结果】面板（ResultPanel）**。面板内容包含：

- 方法调用结果（字符串或 JSON）
- 错误信息（调用失败时）
- 时间戳

**所有 checkpoint 验证功能结果时，都应优先读取 ResultPanel 文本。**

## UI 元素命名约定

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| 按钮文本 | 中文可读 label | `显示 Toast`、`开始扫描`、`断开连接` |
| 按钮 Key | `btn_{snake_case}` | `btn_show_toast`、`btn_start_scan` |
| 输入框文本 | 占位文本中文化 | `请输入消息内容` |
| 输入框 Key | `input_{snake_case}` | `input_message`、`input_url` |
| 结果面板 | 页面底部固定位置 | `ResultPanel` |

UI 元素匹配优先级：**中文 label > 英文 label > Key**。

## 导航约定

- **返回上一级**：顶部左上角返回箭头（标准 ArkUI BackButton）
- **跳转到下一级**：点击对应的卡片 / 按钮，Cupertino / Material 式过渡

## 权限弹窗

首次触发需要授权的方法时，系统会弹出授权对话框。除非用例 preconditions 明确要求拒绝，**默认点"允许"**继续测试。

## 已知的慢操作（需要显式等待）

<!-- skill 按 PRD 列出慢操作，例如：
- `scan`: 等待 ≥3 秒
- `connect`: 等待 ≥2 秒
- `loadUrl`: 等待 `networkidle` 或 5 秒超时
-->
