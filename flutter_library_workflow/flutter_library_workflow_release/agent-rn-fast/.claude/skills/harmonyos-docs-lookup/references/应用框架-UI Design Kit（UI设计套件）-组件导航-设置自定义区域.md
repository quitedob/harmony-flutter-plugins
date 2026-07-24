## 场景介绍

从6.0.0(20) Beta1版本开始，导航组件新增支持设置标题栏[stackBuilder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation#section156391311175017)以及[bottomBuilder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsnavigation#section156391311175017)。

当应用开发者需要在标题栏区域增加自定义节点时，例如在标题栏上方区域增加分段按钮，标题栏底部区域增加搜索框、页签时，可以使用标题栏自定义区域设置能力。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/be/v3/Y5sESwWPQJuic0xx6uUuWQ/zh-cn_image_0000002532304109.png?HW-CC-KV=V1&HW-CC-Date=20260414T041513Z&HW-CC-Expire=86400&HW-CC-Sign=B2805D1F30953B5B412A7F068A7274C596BCE8201C836696CA8141B72BC33313)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/15/v3/nl69ZjU6QTydbn_iC7C7pg/zh-cn_image_0000002500304224.png?HW-CC-KV=V1&HW-CC-Date=20260414T041513Z&HW-CC-Expire=86400&HW-CC-Sign=3F32D738AB2CF0A4671204BDEFFF15695FA6348DDBD2147C19E4DAC39219A354 "点击放大")

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 从6.0.2(22)版本开始，无需手动导入HdsNavigationAttribute。具体请参考HdsNavigation的导入模块说明。
   2. import { HdsNavigation, BottomBuilderShowType, HdsNavigationAttribute } from '@kit.UIDesignKit';
   ```
2. 创建一级导航组件，通过配置titleBar中content属性的stackBuilder以及bottomBuilder属性，可以使用导航组件的自定义区域设置功能。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. @Builder
   5. StackBuilder() { // 自定义StackBuilder组件
   6. Column() {
   7. Button("Hello")
   8. }
   9. .height(56)
   10. .justifyContent(FlexAlign.Center)
   11. }

   13. @Builder
   14. BottomBuilder() { // 自定义BottomBuilder组件
   15. Column() {
   16. Search()
   17. }
   18. .width('100%')
   19. .height(56)
   20. .backgroundColor(Color.Orange)
   21. }

   23. build() {
   24. HdsNavigation() { // 创建HdsNavigation组件
   25. }.titleBar({
   26. content: { // 设置HdsNavigation组件内容区
   27. title: { mainTitle: 'MainTitle', subTitle: 'SubTitle' },
   28. // 设置HdsNavigation StackBuilder区域
   29. stackBuilder: (): void => this.StackBuilder(),
   30. // 设置HdsNavigation BottomBuilder区域，包括设置高度，显示类型
   31. bottomBuilder: {
   32. builder: (): void => this.BottomBuilder(),
   33. height: 56,
   34. showType: BottomBuilderShowType.DIRECTLY_SHOW
   35. }
   36. }
   37. })
   38. }
   39. }
   ```