# Flutter 插件 Example 规则参考

## 1. 执行顺序模板（固定）

**用生成器产出 `example/lib`（推荐）**

1. 确认 `01-analysis-prd.md` 中存在并填写完整 `### 2.1 功能模块划分` 表格（模块编号/功能模块/描述/优先级）。
   - 可选：运行 `dart run tool/extract_example_modules_json_from_prd.dart --out tool/example_modules.json` 生成 JSON 供你核对。
2. 在插件根目录执行 **`dart run tool/generate_example_lib.dart`**（默认读取 `01-analysis-prd.md` 的 `### 2.1 功能模块划分` 表格；建议搭配 `--dry-run` 预览）。写入前注意备份已有 `example/lib`，或使用 `--dry-run` / 临时 `--out` 目录。
3. 在各 `module_*_page.dart` 填充 Actions 并通过 `setState` 更新 `_result`，按需修改 `main.dart`（如全局 `builder`）。
4. 在 `example/README.md` 中建立 **模块 ↔ 路由** 映射表，并注明规格来源（PRD 路径与/或 JSON 路径）。

**新建插件且需要 OHOS example 脚手架时**：可先按 Skill「强制前置步骤」执行 `flutter create --template=plugin . --platforms ohos` 与备份策略，再按上文用 PRD 表格生成 `example/lib`。

## 2. 页面层级（强制）：两级

| 层级 | 页面 | 路由示例 | 内容 |
|------|------|----------|------|
| 一级 | 功能模块列表页 | `/module-index` | 来自 PRD 的每个功能模块一项 |
| 二级 | 功能模块详情页 | `/module/{moduleId}` | 上半 Actions，下半 Result |

**禁止**再增加“三级用例页”。

## 3. 二级页面布局（强制）

```
┌─────────────────────────────────────┐
│ AppBar: 模块名称 / 编号              │
├─────────────────────────────────────┤
│ Actions（flex≈3，可滚动）            │
│  - API 插件：按钮等触发 API           │
│  - UI 插件：插件提供的 Widget         │
├─────────────────────────────────────┤
│ Result（flex≈2）                    │
│  · 标题「Result」+ 等宽正文          │
│  · txt_result（Key）               │
└─────────────────────────────────────┘
```

**比例**：建议 `Expanded(flex: 3)`（Actions）+ `Expanded(flex: 2)`（Result），避免底部输出区过小。
**样式**：Result 区无背景色、无图标、无 STATUS 状态显示，只展示 `_result` 文本，与 Actions 区风格一致。

## 4. PRD 驱动映射表模板

从 PRD「功能模块划分」摘表，并增加路由列：

| 模块编号 | 功能模块 | PRD 简述 | 二级路由 | Actions 概要 | Result 内容 |
|----------|----------|----------|----------|--------------|-------------|
| F-01 | 原生 Toast 显示 | … | /module/F-01 | showToast 参数组合按钮 | API 返回值 / 错误 |
| F-02 | Toast 取消 | … | /module/F-02 | cancel 按钮 | 返回值 / 错误 |

## 5. API 类与 UI 类在 Actions 中的差异

| 类型 | Actions 典型内容 | Result 典型内容 |
|------|------------------|-----------------|
| API 类 | `ElevatedButton` 调用 `showToast`/`cancel` 等 | `Future` 的 bool?、异常字符串 |
| UI 类 | 插件 `Widget` + 演示用父组件 | `onChanged`、选中索引、自定义回调拼接字符串 |

## 6. 无平台能力模块

若 PRD 某模块纯 Dart / 无 Channel：

- 一级列表仍保留该模块。
- 二级页 Actions 放置可触发逻辑或 Widget；Result 中说明 **不涉及 OHOS 原生能力**，并展示可验证输出。

## 7. README 必备内容

`example/README.md` 至少包含：

1. 规格来源说明：PRD 路径（如 `01-analysis-prd.md`）；如你在 Step 1 导出了 JSON 供核对，也可附上 JSON 路径
2. 功能模块与路由对照表
3. Actions/Result 约定说明
4. OHOS 构建与运行提示（如需 `flutter-hvigor-plugin` 等环境说明可链到主 README）

## 8. 回归策略

- PRD 变更时：同步更新模块表与 example 一级入口；二级 Actions/Result 与模块范围一致。
- 发布前：每个 P0 模块在目标设备上至少手动或自动化走通一次。
