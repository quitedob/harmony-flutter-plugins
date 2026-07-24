## 场景介绍

选择收货地址Button功能可以帮助开发者调用对应Button组件快速拉起地址选择页面，并返回用户选择的收货地址。

运行示例代码单击“选择收货地址”按钮，拉起选择地址页面选择已保存的地址，也可单击“管理/新增收货地址”进入添加收货地址页面（完整场景可参考[获取收货地址](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-choose-address-dev)）。

## 前提条件

参见[开发前提](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-choose-address-dev#section1061219267293)。

## 开发步骤

1. 导入Scenario Fusion Kit模块以及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { FunctionalButton, functionalButtonComponentManager } from '@kit.ScenarioFusionKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 在容器中声明FunctionalButton，指定Button的openType，并设置对应的回调函数，代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. build() {
   5. Row() {
   6. Column() {
   7. // 声明FunctionalButton。
   8. FunctionalButton({
   9. params: {
   10. // OpenType.CHOOSE_ADDRESS表示该按钮用于选择收货地址。
   11. openType: functionalButtonComponentManager.OpenType.CHOOSE_ADDRESS,
   12. label: '选择收货地址',
   13. // 调整按钮样式。
   14. styleOption: {
   15. bgColor: functionalButtonComponentManager.ColorType.DEFAULT,
   16. size: functionalButtonComponentManager.SizeType.DEFAULT,
   17. plain: false,
   18. disabled: false,
   19. loading: false,
   20. hoverClass: functionalButtonComponentManager.HoverClassType.HOVER_CLASS,
   21. hoverStartTime: 0,
   22. hoverStayTime: 0,
   23. styleConfig: new functionalButtonComponentManager.ButtonConfig()
   24. .fontSize(20)
   25. },
   26. },
   27. // 当OpenType设置为CHOOSE_ADDRESS时，回调必须为onChooseAddress。
   28. controller: new functionalButtonComponentManager.FunctionalButtonController()
   29. .onChooseAddress((err, data) => {
   30. if (err) {
   31. // 错误日志处理。
   32. hilog.error(0x0000, "testTag", "error: %{public}d %{public}s", err.code, err.message);
   33. return;
   34. }
   35. // 成功日志处理。
   36. hilog.info(0x0000, "testTag", "succeeded in choosing address");
   37. // 获取地址信息。
   38. let userName: string = data.userName;
   39. let mobileNumber: string = data.mobileNumber as string;
   40. let countryCode: string = data.countryCode as string;
   41. let provinceName: string = data.provinceName as string;
   42. let cityName: string = data.cityName as string;
   43. let districtName: string = data.districtName as string;
   44. let streetName: string = data.streetName as string;
   45. let detailedAddress: string = data.detailedAddress;
   46. })
   47. })
   48. }.width('100%')
   49. }.height('100%')
   50. }
   51. }
   ```

   说明

   * openType参数填写"functionalButtonComponentManager.OpenType.CHOOSE\_ADDRESS"指定Button为选择收货地址类型。
   * controller参数必须对应填写"new functionalButtonComponentManager.FunctionalButtonController().onChooseAddress"。
   * 可使用自定义Modifier设置按钮样式，参考[示例](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-functionalbuttoncomponentmanager#section1251915241170)。

   其他参数请参考：[FunctionalButton（Button组件）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-functionalbutton)。