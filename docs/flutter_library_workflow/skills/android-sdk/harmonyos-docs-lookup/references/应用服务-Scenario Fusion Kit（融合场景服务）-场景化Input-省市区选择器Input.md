## 场景介绍

从5.1.0(18)开始，支持省市区选择器Input功能。

省市区选择器Input功能可以帮助开发者调用对应FunctionalInput组件快速拉起选择地区页面，供用户选择地区信息。

运行示例代码后单击“所在地区”文本框，拉起选择地区页面，按照需求选择地址信息，选择完成后将所选地址回填至文本框中。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/42/v3/nbFm1QRRS6e0NyiARj_4xA/zh-cn_image_0000002503572051.png?HW-CC-KV=V1&HW-CC-Date=20260414T033011Z&HW-CC-Expire=86400&HW-CC-Sign=6D692B0794962A2B631F83D07E6F75005B80299A5C5EF46C677CF997B291F87B "点击放大")

## 前提条件

参见[开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/map-config-agc)。

## 开发步骤

1. 导入Scenario Fusion Kit模块以及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { FunctionalInput, functionalInputComponentManager } from '@kit.ScenarioFusionKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import { SymbolGlyphModifier, TextInputModifier } from '@kit.ArkUI';
   ```
2. 在容器中声明FunctionalInput，指定FunctionalInput的inputType，并设置对应的回调函数，代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. @State inputContent: string = '';

   6. build() {
   7. Column() {
   8. Row() {
   9. Text('所在地区').width(64)
   10. // 声明FunctionalInput。
   11. FunctionalInput({
   12. params: {
   13. // InputType.SELECT_DISTRICT表示输入类型为省/市/区选择器类型。
   14. inputType: functionalInputComponentManager.InputType.SELECT_DISTRICT,
   15. textInputValue: {
   16. text: this.inputContent,
   17. placeholder: '省、市、区、街道地址',
   18. },
   19. // 调整TextInput样式。
   20. inputAttributeModifier: new TextInputModifier()
   21. .fontColor($r('sys.color.ohos_id_color_badge_red'))
   22. .onChange((value) => {
   23. if (value !== this.inputContent) {
   24. this.inputContent = value;
   25. }
   26. }),
   27. // 将图标设置在末尾。
   28. icon: $r('sys.symbol.xmark'),
   29. // 设置符号图标的事件和样式。
   30. iconSymbolModifier: new SymbolGlyphModifier()
   31. .onClick(() => {
   32. this.inputContent = '';
   33. })
   34. .fontSize(32),
   35. },
   36. // 当InputType为SELECT_DISTRICT时，回调必须为onSelectDistrict。
   37. controller: new functionalInputComponentManager.FunctionalInputController().onSelectDistrict((err,
   38. data: functionalInputComponentManager.DistrictSelectResult) => {
   39. if (err) {
   40. // 错误日志处理。
   41. hilog.error(0x0000, "testTag", "error: %{public}d %{public}s", err.code, err.message);
   42. return;
   43. }
   44. // 成功日志处理。
   45. hilog.info(0x0000, "testTag", "succeeded in selecting district");
   46. // 在输入组件中显示所选区域信息。
   47. this.inputContent = data.inputContent;
   48. })
   49. })
   50. .layoutWeight(1)
   51. }.height('100%')
   52. }.width('100%')
   53. }
   54. }
   ```

   说明

   * inputType参数填写"functionalInputComponentManager.InputType.SELECT\_DISTRICT"指定Input为省市区选择器类型。
   * controller参数必须对应填写"new functionalInputComponentManager.FunctionalInputController().onSelectDistrict"。
   * 可从返回结果中自行处理结果回填至组件中。
   * 组件支持显示两种类型的图标：symbol和image，"icon"设置为symbol资源时，请使用"[iconSymbolModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-functionalinputcomponentmanager#section19784874147)"进行图标事件、样式的设置；设置为image资源时，请使用"[iconImgModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-functionalinputcomponentmanager#section19784874147)"进行图标事件、样式的设置。
   * functionalInput支持[智能填充](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-intelligent-filling)，对应支持的[ContentType](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-intelligentfilling-appendix)为"ADDRESS\_CITY\_AND\_STATE"。

   其他参数请参考：[FunctionalInput（Input组件）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scenario-fusion-functionalinput)。