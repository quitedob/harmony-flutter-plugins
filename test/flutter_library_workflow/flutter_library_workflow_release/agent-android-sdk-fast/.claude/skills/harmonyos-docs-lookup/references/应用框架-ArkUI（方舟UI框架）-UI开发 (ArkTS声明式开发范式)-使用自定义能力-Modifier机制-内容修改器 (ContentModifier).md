当开发者期望自定义组件的内容区时，比如Checkbox的内部显示一个五角星等场景时，可以使用此功能。

仅[Button](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-button)、[Checkbox](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-checkbox)、[DataPanel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-datapanel)、[TextTimer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-texttimer)、[Slider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-slider)、[Select](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-select)、[Rating](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-rating)、[Radio](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-radio)、[Gauge](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-gauge)、[Toggle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-toggle)、[TextClock](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textclock)组件支持该能力。

使用ContentModifier自定义Checkbox样式，用五边形Checkbox替换默认Checkbox。选中时，五边形内部显示红色三角图案，标题显示“选中”；取消选中时，红色三角图案消失，标题显示“非选中”。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. const DOMAIN = 0x0000;
3. // xxx.ets
4. class MyCheckboxStyle implements ContentModifier<CheckBoxConfiguration> {
5. public selectedColor: Color = Color.White;

7. constructor(selectedColor: Color) {
8. this.selectedColor = selectedColor;
9. }

11. applyContent(): WrappedBuilder<[CheckBoxConfiguration]> {
12. return wrapBuilder(buildCheckbox);
13. }
14. }

16. @Builder
17. function buildCheckbox(config: CheckBoxConfiguration) {
18. Column({ space: 10 }) {
19. Text() {
20. Span(config.name)
21. // 请将$r('app.string.checked_context')替换为实际资源文件，在本示例中该资源文件的value值为"（选中）"
22. // 请将$r('app.string.unchecked_context')替换为实际资源文件，在本示例中该资源文件的value值为"（非选中）"
23. Span(config.selected ? $r('app.string.checked_context') : $r('app.string.unchecked_context'))
24. }
25. Shape() {
26. // 五边形复选框样式
27. Path()
28. .width(200)
29. .height(60)
30. .commands('M100 0 L0 100 L50 200 L150 200 L200 100 Z')
31. .fillOpacity(0)
32. .strokeWidth(3)
33. // 红色三角图案样式
34. Path()
35. .width(10)
36. .height(10)
37. .commands('M50 0 L100 100 L0 100 Z')
38. .visibility(config.selected ? Visibility.Visible : Visibility.Hidden)
39. .fill(config.selected ? (config.contentModifier as MyCheckboxStyle).selectedColor : Color.Black)
40. .stroke((config.contentModifier as MyCheckboxStyle).selectedColor)
41. .margin({ left: 11, top: 10 })
42. }
43. .width(300)
44. .height(200)
45. .viewPort({
46. x: 0,
47. y: 0,
48. width: 310,
49. height: 310
50. })
51. .strokeLineJoin(LineJoinStyle.Miter)
52. .strokeMiterLimit(5)
53. .onClick(() => {
54. // 点击后，触发复选框点击状态变化
55. if (config.selected) {
56. config.triggerChange(false);
57. } else {
58. config.triggerChange(true);
59. }
60. })
61. .margin({ left: 150 })
62. }
63. }

65. @Entry
66. @Component
67. struct Index {
68. build() {
69. Row() {
70. Column() {
71. //选中和不选中按钮
72. // 请将$r('app.string.checkbox_status')替换为实际资源文件，在本示例中该资源文件的value值为"复选框状态"
73. Checkbox({ name: this.resmg?.getStringSync($r('app.string.checkbox_status').id), group: 'checkboxGroup' })
74. .select(true)
75. .contentModifier(new MyCheckboxStyle(Color.Red))
76. .onChange((value: boolean) => {
77. hilog.info(DOMAIN, 'testTag', 'Checkbox change is' + value);
78. })
79. }
80. .width('100%')
81. }
82. .height('100%')
83. }
84. }
```

[MyCheckboxStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/Modifier/entry/src/main/ets/pages/MyCheckboxStyle.ets#L16-L95)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bd/v3/iiM-sgMIS6CmsCVopPGfyQ/zh-cn_image_0000002540611686.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035609Z&HW-CC-Expire=86400&HW-CC-Sign=68EF4FAC343A0CD1975504DA99394EA46B8F8522716CADF2D043A7462860E3EB)