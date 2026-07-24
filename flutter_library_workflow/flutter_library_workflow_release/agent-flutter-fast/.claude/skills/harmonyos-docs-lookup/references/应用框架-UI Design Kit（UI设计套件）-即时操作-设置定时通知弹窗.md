## 场景介绍

从6.0.0(20) Beta1版本开始，新增支持设置定时通知弹窗。

[HdsSnackBar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdssnackbar)支持定时通知弹窗。当应用开发者需要定时通知提醒弹窗时，可以通过HdsSnackBar的show方法显示HdsSnackBar弹窗，设置duration是大于0的时间表示弹窗是定时消失的，默认定时时间是5000ms。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/21/v3/p9TqS7CjTeWapMiS6PbNYA/zh-cn_image_0000002532304113.gif?HW-CC-KV=V1&HW-CC-Date=20260414T041615Z&HW-CC-Expire=86400&HW-CC-Sign=9500EA9305A92ADD0BBB3A8BCF608E3BC5213761CD9EBB97EC87A990FD239568 "点击放大")

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import {
   2. HdsSnackBar,
   3. SnackBarIconOptions,
   4. SnackBarMessageOptions,
   5. SnackBarOperationOptions,
   6. SnackBarStyleOptions,
   7. SnackBarOperationType
   8. } from '@kit.UIDesignKit'
   ```
2. 创建UIContext，创建HdsSnackBar对象hdsSnackBar，调用HdsSnackBar对象的show方法可以显示HdsSnackBar弹窗，入参是左侧图标icon、中间文本message、右侧操作区operation、样式style，其中右侧操作区设置类型是带有右箭头的文本按钮，其中style中设置duration是2000ms表示HdsSnackBar弹窗2秒后定时消失。
3. 设置arrowButtonId和nextFocusId两个属性，支持开发者自定义Tab键走焦能力。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @ComponentV2
   3. struct TestSnackBar02 {
   4. uiContext: UIContext = this.getUIContext();
   5. hdsSnackBar: HdsSnackBar = new HdsSnackBar(this.uiContext);
   6. icon: SnackBarIconOptions = {
   7. icon: $r('sys.symbol.checkmark_circle')
   8. }
   9. message: SnackBarMessageOptions = {
   10. title: $r('sys.string.ohos_id_text_location_button_description_current_position'),
   11. content: $r('sys.string.ohos_id_text_save_button_description_save')
   12. }
   13. operation: SnackBarOperationOptions = {
   14. operationType: SnackBarOperationType.TEXT_WITH_ARROW,
   15. content: $r('sys.string.ohos_id_text_save_button_description_save_image'),
   16. arrowButtonId: 'snackBarArrowButton'
   17. }
   18. style: SnackBarStyleOptions = {
   19. nextFocusId: 'button',
   20. duration: 2000
   21. }

   23. build() {
   24. Column() {
   25. Blank()
   26. .height(400)
   27. Button('文字按钮和右箭头的SnackBar弹窗，2秒后定时消失')
   28. .onClick(() => {
   29. this.hdsSnackBar.show(this.icon, this.message, this.operation, this.style);
   30. })
   31. .id("button")

   33. Button('关注')
   34. .nextFocus({
   35. // 这里forward的id必须和SnackBarOperationOptions接口中传入的arrowButtonId相同
   36. forward: 'snackBarArrowButton'
   37. })
   38. }
   39. .width('100%')
   40. .height('100%')
   41. .backgroundColor(0xF1F3F5)
   42. }
   43. }
   ```