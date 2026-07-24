## 场景介绍

从5.1.0(18)版本开始， 导航组件新增支持标题栏[通用模糊](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation#section21731754221)样式。

从6.0.0(20) Beta1版本开始，新增支持[过渡模糊](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation#section21731754221)与[渐变模糊](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation#section21731754221)样式。

当应用开发者需要使用标题栏样式随内容区滚动而动态改变样式的导航组件时，可以通过设置titleBar属性中的[style](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation#section1867665412513)配置，自定义滚动前后的标题栏样式。

### 通用模糊样式

对组件背景进行均匀的模糊处理，模糊强度一致，边界清晰，用于强调控件与内容的层级分隔。滑动内容进入/离开标题栏区域过程中，模糊背板和分割线透明渐变出现/消失。此方式适用于非沉浸式场景。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e1/v3/xZD7La6PRI2CRndRDcuKaw/zh-cn_image_0000002532304117.gif?HW-CC-KV=V1&HW-CC-Date=20260414T041506Z&HW-CC-Expire=86400&HW-CC-Sign=A3B393CCDF3D259F134C829E4A3129E532FEF3A4819EF1C710ED7A3A0EA568C7 "点击放大")

### 过渡模糊样式

对组件背景进行均匀的模糊处理，模糊强度一致，边界清晰，用于强调控件与内容的层级分隔。滑动前后标题栏内容发生颜色/状态变化，滑动过程中，线性跟手变化。此方式仅适用于沉浸式到非沉浸式相互切换的场景。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/77/v3/KzxDAyvBQIK6n1_Yxn20mQ/zh-cn_image_0000002500304228.gif?HW-CC-KV=V1&HW-CC-Date=20260414T041506Z&HW-CC-Expire=86400&HW-CC-Sign=4C632433C68182B3F9E82636151FAC5A665512B151955FA633FDD338DFE623AA "点击放大")

### 渐变模糊样式

模糊效果在空间维度上呈现渐强/渐弱的变化，模糊边界柔和，用于增强页面沉浸感。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/09/v3/gzRomnvOT_69JfmOtM0qng/zh-cn_image_0000002532144151.gif?HW-CC-KV=V1&HW-CC-Date=20260414T041506Z&HW-CC-Expire=86400&HW-CC-Sign=FD6CC2A911B19F58ED0E88A48AF0CAEF7C9DC62DE87CA84A8905844E7E4337EA "点击放大")

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 从6.0.2(22)版本开始，无需手动导入HdsNavigationAttribute。具体请参考HdsNavigation的导入模块说明。
   2. import { HdsNavigation, ScrollEffectType, HdsNavigationAttribute } from '@kit.UIDesignKit';
   3. import { LengthMetrics } from '@kit.ArkUI';
   ```
2. 创建一级导航组件，通过配置titleBar中的scrollEffectType属性，可实现通用模糊、过渡模糊、渐变模糊样式。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. build() {
   5. HdsNavigation() { // 创建HdsNavigation组件
   6. // HdsNavigation组件内容区
   7. }.titleBar({
   8. style: { // 设置导航组件标题栏样式
   9. // 标题栏动态模糊样式，包括是否使能滚动动态模糊，动态模糊类型，动态模糊生效的滚动距离等
   10. scrollEffectOpts: {
   11. enableScrollEffect: true,
   12. scrollEffectType: ScrollEffectType.COMMON_BLUR,
   13. blurEffectiveStartOffset: LengthMetrics.vp(0),
   14. blurEffectiveEndOffset: LengthMetrics.vp(20)
   15. },
   16. originalStyle: { // 内容区滚动前初始样式设置
   17. backgroundStyle: { // 标题栏背板样式设置
   18. backgroundColor: $r('sys.color.ohos_id_color_background'),
   19. },
   20. contentStyle: { // 标题栏内容区样式设置，包括标题区域，菜单区域，返回按钮区域
   21. titleStyle: {
   22. mainTitleColor: $r('sys.color.font_primary'),
   23. subTitleColor: $r('sys.color.font_secondary')
   24. },
   25. menuStyle: {
   26. backgroundColor: $r('sys.color.comp_background_tertiary'),
   27. iconColor: $r('sys.color.icon_primary')
   28. },
   29. backIconStyle: {
   30. backgroundColor: $r('sys.color.comp_background_tertiary'),
   31. iconColor: $r('sys.color.icon_primary')
   32. }
   33. }
   34. },
   35. scrollEffectStyle: { // 内容区滚动超过blurEffectiveEndOffset后样式设置
   36. backgroundStyle: {
   37. backgroundColor: $r('sys.color.ohos_id_color_background_transparent'),
   38. },
   39. contentStyle: {
   40. titleStyle: {
   41. mainTitleColor: $r('sys.color.font_primary'),
   42. subTitleColor: $r('sys.color.font_secondary')
   43. },
   44. menuStyle: {
   45. backgroundColor: $r('sys.color.comp_background_tertiary'),
   46. iconColor: $r('sys.color.icon_primary')
   47. },
   48. backIconStyle: {
   49. backgroundColor: $r('sys.color.comp_background_tertiary'),
   50. iconColor: $r('sys.color.icon_primary')
   51. }
   52. }
   53. }
   54. },
   55. content: { // 标题栏内容设置
   56. title: { mainTitle: 'Main', subTitle: 'Sub' },
   57. }
   58. })
   59. }
   60. }
   ```