# 鸿蒙 ArkUI 组件编码规则

按编码场景选择对应子文件：

## 响应式数据流
[`ui-coding-reactive-dataflow.md`](./ui-coding-reactive-dataflow.md)
@Prop/@State/@Watch/@Link 装饰器行为规范（**所有编码前置依赖**）

## 组件接口设计
[`ui-coding-component-api.md`](./ui-coding-component-api.md)
命令式 API 响应式迁移、Builder 承载、回调属性、setter/listener 迁移

## Canvas 自绘
[`ui-coding-canvas.md`](./ui-coding-canvas.md)
坐标系统、像素配置、手势交互、动画、尖角路径计算

## 交互控件绑定
[`ui-coding-control-binding.md`](./ui-coding-control-binding.md)
onChange 回写 @State 模式、各控件绑定速查

## 弹窗
[`ui-coding-custom-dialog.md`](./ui-coding-custom-dialog.md)
响应式 Host/Portal、@CustomDialog 调用规则、@Builder 传参

## 列表渲染
[`ui-coding-foreach.md`](./ui-coding-foreach.md)
ForEach key 生成规则、刷新计数器

## 布局
[`ui-coding-relative-container.md`](./ui-coding-relative-container.md)
RelativeContainer alignRules 同方向互斥

## 触摸测试
[`ui-coding-stack-hit-test.md`](./ui-coding-stack-hit-test.md)
HitTestMode、Stack 层叠、手势选择、自定义滚动隔离
