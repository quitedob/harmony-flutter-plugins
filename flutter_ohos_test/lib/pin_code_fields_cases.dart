const List<PinCaseDefinition> pinCodeFieldCases = [
  PinCaseDefinition(
    'F-01-01',
    '固定长度输入格渲染',
    '无头 PIN 输入核心',
    '始终显示四格；输入两位后前两格已填充、后两格为空。',
  ),
  PinCaseDefinition(
    'F-01-02',
    '完整输入与状态切换',
    '无头 PIN 输入核心',
    '满四位时显示完成状态；删除后恢复输入中状态且内容同步。',
  ),
  PinCaseDefinition(
    'F-01-03',
    '只读与禁用交互差异',
    '无头 PIN 输入核心',
    '只读模式保持正常视觉但不改变内容；禁用模式显示禁用视觉且不接受编辑。',
  ),
  PinCaseDefinition(
    'F-01-04',
    '非法长度配置拒绝',
    '无头 PIN 输入核心',
    '零位配置被明确拒绝并显示中文配置错误。',
    expectedRejection: true,
  ),
  PinCaseDefinition('F-02-01', '外部设值与清空', '输入控制与状态', '设值后显示预置内容；清空后内容和错误状态归零。'),
  PinCaseDefinition('F-02-02', '焦点与错误状态控制', '输入控制与状态', '焦点、错误与清错状态按顺序可见变化。'),
  PinCaseDefinition('F-02-03', '完成回调边界去重', '输入控制与状态', '首次满位只触发一次；重新跨越边界后再次触发。'),
  PinCaseDefinition(
    'F-02-04',
    '控制器切换与页面恢复',
    '输入控制与状态',
    '两个控制器保留各自文本，页面恢复后无重复通知。',
  ),
  PinCaseDefinition(
    'F-03-01',
    '默认 Material 输入流程',
    'Material 输入组件',
    'Material 单元格、字符与完成状态同步更新。',
  ),
  PinCaseDefinition('F-03-02', '行布局与间隔适配', 'Material 输入组件', '紧凑与撑满布局均无重叠和溢出。'),
  PinCaseDefinition(
    'F-03-03',
    '多状态视觉优先级',
    'Material 输入组件',
    '聚焦、已填、完成、错误和禁用状态可区分。',
  ),
  PinCaseDefinition('F-03-04', '提示光标与遮罩内容', 'Material 输入组件', '提示、光标与遮罩按配置显示。'),
  PinCaseDefinition('F-04-01', '形状与颜色主题切换', '主题与视觉定制', '四类形状即时更新且内容位置稳定。'),
  PinCaseDefinition('F-04-02', '字符入场动画切换', '主题与视觉定制', '缩放、淡入、滑入和无动画可切换。'),
  PinCaseDefinition('F-04-03', '主题扩展与明暗模式', '主题与视觉定制', '全局主题与局部覆盖正确合并。'),
  PinCaseDefinition(
    'F-04-04',
    '缺失自定义动画配置拒绝',
    '主题与视觉定制',
    '缺少构建器的自定义动画配置被拒绝。',
    expectedRejection: true,
  ),
  PinCaseDefinition('F-05-01', '无头表单必填校验', '表单校验', '空值显示必填错误，完整输入后通过。'),
  PinCaseDefinition('F-05-02', 'Material 表单长度校验', '表单校验', '不足位显示错误，补满后表单有效。'),
  PinCaseDefinition('F-05-03', '表单保存与外部状态同步', '表单校验', '保存摘要和外部设值与表单状态同步。'),
  PinCaseDefinition('F-05-04', '校验错误与控制错误并存', '表单校验', '表单错误和控制器错误可独立显示与清除。'),
  PinCaseDefinition('F-06-01', '数字过滤与长度限制', '剪贴板与输入法', '只保留有效数字且不超过配置长度。'),
  PinCaseDefinition('F-06-02', '自定义格式化顺序', '剪贴板与输入法', '先移除空格，再执行数字过滤和限长。'),
  PinCaseDefinition(
    'F-06-03',
    '无效剪贴板内容拒绝',
    '剪贴板与输入法',
    '无效候选被拒绝且原输入不变。',
    expectedRejection: true,
  ),
  PinCaseDefinition('F-06-04', '上下文菜单与自动填充', '剪贴板与输入法', '菜单、粘贴、自动填充和提交状态可观察。'),
  PinCaseDefinition('F-07-01', '动态语义提示', '无障碍与反馈', '语义提示随已填长度变化。'),
  PinCaseDefinition('F-07-02', '遮罩语义隐私', '无障碍与反馈', '可见内容与语义预览均不出现明文。'),
  PinCaseDefinition('F-07-03', '触觉反馈类型切换', '无障碍与反馈', '五类触觉反馈可选择，关闭后不触发。'),
  PinCaseDefinition('F-07-04', '禁用状态语义抑制', '无障碍与反馈', '禁用后不保留聚焦语义或动态输入提示。'),
  PinCaseDefinition(
    'F-08-01',
    '鸿蒙文本选择与粘贴',
    'OHOS 平台兼容',
    'OHOS 使用 Material 选择控件完成选择与粘贴。',
  ),
  PinCaseDefinition(
    'F-08-02',
    '三类设备布局适配',
    'OHOS 平台兼容',
    'phone、tablet、2in1 布局完整可用。',
  ),
  PinCaseDefinition(
    'F-08-03',
    '选择控件平台矩阵回归',
    'OHOS 平台兼容',
    'Cupertino、Material、Desktop 平台映射不串用。',
  ),
  PinCaseDefinition(
    'F-08-04',
    '旋转与页面生命周期稳定',
    'OHOS 平台兼容',
    '页面恢复后内容保留且无重复监听或释放异常。',
  ),
];

class PinCaseDefinition {
  const PinCaseDefinition(
    this.id,
    this.title,
    this.module,
    this.expected, {
    this.expectedRejection = false,
  });

  final String id;
  final String title;
  final String module;
  final String expected;
  final bool expectedRejection;
}
