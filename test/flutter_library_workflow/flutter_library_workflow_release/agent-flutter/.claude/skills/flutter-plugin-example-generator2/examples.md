# Flutter 插件 Example 规则示例

## 示例 1：从 PRD 到两级页面（以 FlutterToast 为例）

PRD「功能模块划分」节选：

| 模块编号 | 功能模块 |
|----------|----------|
| F-01 | 原生 Toast 显示 |
| F-02 | Toast 取消 |
| F-03 | 自定义 Widget Toast |
| F-04 | Toast 队列管理 |

直接执行 `dart run tool/generate_example_lib.dart`（默认读取 `01-analysis-prd.md` 的 `### 2.1 功能模块划分` 表格），即可生成 `example/lib` 骨架。

一级页 `/module-index`：四个 `ListTile`，分别进入 `/module/F-01` … `/module/F-04`。

## 示例 2：F-01 二级页（API 类）

路由：`/module/F-01`

- **Actions**：多个 `ElevatedButton`，分别触发不同 `Fluttertoast.showToast(...)` 参数组合（短/长、gravity、颜色等）。
- **Result**：`txt_result` 展示最近一次 `Future<bool?>` 或 `catch` 错误信息。

## 示例 3：F-03 二级页（UI 类）

路由：`/module/F-03`

- **Actions**：`FToast().init(context)` 后展示自定义 `Container` Toast、队列演示等（按 PRD 范围放置插件 Widget）。
- **Result**：展示最近一次 show/remove 的回调摘要或自维护计数器字符串。

## 示例 4：路由片段（建议）

```text
/module-index
/module/F-01
/module/F-02
/module/F-03
/module/F-04
```

## 示例 5：好坏对比

**坏例子**：仍使用 `/api/xxx/cases` 三级路由，且按方法名而非 PRD 模块拆页。

**好例子**：一级对齐 PRD 模块表；二级单页内 Actions + Result 覆盖该模块全部触发点；Result 始终可读。

## 示例 6：Result 区视觉（简洁风格）

- 底部 Result 使用 `flex:2` 与 Actions `flex:3` 分配纵向空间。
- 无背景色、无图标、无 STATUS 显示，与 Actions 区风格保持一致。
- 仅包含「Result」标题与等宽字体的 `_result` 文本（`Key('txt_result')`）。
- 空结果时用占位句「等待操作…」占位。

## 示例 7：UI 类 build 期间回调的 setState 处理（重要）

**问题**：某些 UI 插件的回调（如 `loadStateChanged`、`builder`）在 widget build 阶段同步执行，若直接调用 `setState()` 会触发异常。

**错误示例**：
```dart
// ❌ 错误：build 期间直接调用 setState
ExtendedImage.network(
  url,
  loadStateChanged: (state) {
    if (state.extendedImageLoadState == LoadState.completed) {
      setState(() { _result = '加载成功'; });  // 会抛出 "setState() called during build" 异常！
    }
  },
)
```

**正确示例**：
```dart
// ✅ 正确：延迟到帧渲染完成后执行
ExtendedImage.network(
  url,
  loadStateChanged: (state) {
    if (state.extendedImageLoadState == LoadState.completed) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        setState(() { _result = '加载成功'; });
      });
    }
  },
)
```

**适用场景**：
- `loadStateChanged`、`onStateChanged` 等状态变化回调
- `builder`、`itemBuilder` 等构建回调
- 其他在 build 期间同步执行的回调

**判断依据**：如果回调执行时 widget 树正在构建（未完成渲染），则需要使用 `addPostFrameCallback`。
