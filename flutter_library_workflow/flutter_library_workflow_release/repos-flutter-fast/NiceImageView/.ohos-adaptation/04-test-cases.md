# NiceImageView 测试用例

## F-01 构造与初始化

### F-01-01: 默认参数构建 [L0]
- **前置条件**：无
- **步骤**：创建 `NiceImageView()` 不带任何参数
- **检查点**：`find.byType(NiceImageView)` 找到 widget
- **预期结果**：组件构建成功，使用默认值
- **期望类型**：success

### F-01-02: 全参数构建 [L0]
- **步骤**：创建 `NiceImageView` 传入全部 16 个参数
- **预期结果**：全部参数正确赋值
- **期望类型**：success

### F-01-03: 自定义尺寸 [L0]
- **步骤**：`NiceImageView(width: 150, height: 80)`
- **检查点**：`SizedBox.width=150, height=80`
- **预期结果**：尺寸正确应用
- **期望类型**：success

## F-02 圆形展示模式

### F-02-01: 圆形+边框 [L1]
- **步骤**：`NiceImageView(isCircle: true, borderWidth: 4, borderColor: Colors.blue)`
- **预期结果**：组件不崩溃，圆形+边框正确渲染
- **期望类型**：success

### F-02-02: 圆形+内边框 [L1]
- **步骤**：`NiceImageView(isCircle: true, borderWidth: 4, innerBorderWidth: 2)`
- **预期结果**：双层边框正确渲染
- **期望类型**：success

## F-03 圆角半径控制

### F-03-01: 统一圆角 [L1]
- **步骤**：`NiceImageView(cornerRadius: 16)`
- **预期结果**：四角统一圆角
- **期望类型**：success

### F-03-02: 独立圆角 [L1]
- **步骤**：分别设置四角半径
- **预期结果**：各角独立生效
- **期望类型**：success

### F-03-03: 圆角+边框 [L1]
- **步骤**：`NiceImageView(cornerRadius: 16, borderWidth: 4)`
- **预期结果**：圆角边框正确渲染
- **期望类型**：success

## F-04 边框绘制

### F-04-01: 外边框 [L1]
- **步骤**：`NiceImageView(borderWidth: 3, borderColor: Colors.red)`
- **预期结果**：外边框正确绘制
- **期望类型**：success

### F-04-02: 内边框（圆形） [L1]
- **前置条件**：`isCircle=true`
- **步骤**：设置 `innerBorderWidth=2`, `innerBorderColor=Colors.white`
- **预期结果**：内边框正确绘制
- **期望类型**：success

### F-04-03: 矩形模式忽略内边框 [L2]
- **前置条件**：`isCircle=false`
- **步骤**：`innerBorderWidth=10`（矩形模式）
- **预期结果**：符合预期（设计如此，内边框被自动忽略）
- **期望类型**：expected_rejection

## F-05 边框覆盖控制

### F-05-01: isCoverSrc=true [L1]
- **步骤**：`isCoverSrc: true, borderWidth: 6`
- **预期结果**：边框覆盖图片
- **期望类型**：success

## F-06 遮罩绘制

### F-06-01: 半透明遮罩 [L1]
- **步骤**：`isCircle: true, maskColor: Colors.black45`
- **预期结果**：遮罩正确绘制
- **期望类型**：success

---

**共 13 个功能测试用例，覆盖 6 个模块，全部具有明确的期望行为声明。**
