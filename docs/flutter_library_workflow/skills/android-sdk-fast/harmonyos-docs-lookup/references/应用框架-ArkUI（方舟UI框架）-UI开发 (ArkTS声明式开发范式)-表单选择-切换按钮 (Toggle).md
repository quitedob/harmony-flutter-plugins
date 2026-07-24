Toggle组件提供状态按钮样式、勾选框样式和开关样式，一般用于两种状态之间的切换。具体用法请参考[Toggle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-toggle)。

## 创建切换按钮

Toggle通过调用[ToggleOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-toggle#toggleoptions18对象说明)来创建，具体调用形式如下：

收起

自动换行

深色代码主题

复制

```
1. Toggle(options: { type: ToggleType, isOn?: boolean })
```

其中，ToggleType为开关类型，包括Button、Checkbox和Switch，isOn为切换按钮的状态。

API version 11开始，Checkbox默认样式由圆角方形变为圆形。

接口调用有以下两种形式：

* 创建不包含子组件的Toggle。

  当ToggleType为Checkbox或者Switch时，用于创建不包含子组件的Toggle：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Toggle({ type: ToggleType.Checkbox, isOn: false }).id('toggle1') // 请开发者替换为实际的id
  2. Toggle({ type: ToggleType.Checkbox, isOn: true }).id('toggle2') // 请开发者替换为实际的id
  ```

  [CreateToggle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ChooseComponent/entry/src/main/ets/pages/toggle/CreateToggle.ets#L30-L33)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/27/v3/K_nXfPJDSrCt1It97szr-Q/zh-cn_image_0000002540771176.png?HW-CC-KV=V1&HW-CC-Date=20260414T035030Z&HW-CC-Expire=86400&HW-CC-Sign=18D478F59F4A951B931E1708D7AAEC4D1E7C1D4782551F9C7F7AB095C0698594)

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Toggle({ type: ToggleType.Switch, isOn: false }).id('toggle3') // 请开发者替换为实际的id
  2. Toggle({ type: ToggleType.Switch, isOn: true }).id('toggle4') // 请开发者替换为实际的id
  ```

  [CreateToggle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ChooseComponent/entry/src/main/ets/pages/toggle/CreateToggle.ets#L39-L42)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/14/v3/hk6lF2oLTR23aOt9KrWJAg/zh-cn_image_0000002571291473.png?HW-CC-KV=V1&HW-CC-Date=20260414T035030Z&HW-CC-Expire=86400&HW-CC-Sign=C31ECDE7DAF0C9D743F4B664BEA49EE57DE2532F6B9E432B1F085513D3B4EB47)
* 创建包含子组件的Toggle。

  当ToggleType为Button时，只能包含一个子组件，如果子组件有文本设置，则相应的文本内容会显示在按钮上。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Toggle({ type: ToggleType.Button, isOn: false }) {
  2. Text('status button')
  3. .fontColor('#182431')
  4. .fontSize(12)
  5. }.width(100).id('toggle5') // 请开发者替换为实际的id

  7. Toggle({ type: ToggleType.Button, isOn: true }) {
  8. Text('status button')
  9. .fontColor('#182431')
  10. .fontSize(12)
  11. }.width(100).id('toggle6') // 请开发者替换为实际的id
  ```

  [CreateToggle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ChooseComponent/entry/src/main/ets/pages/toggle/CreateToggle.ets#L61-L73)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/18/v3/oTarDkByR8eNpE7mQrAvsg/zh-cn_image_0000002540611524.png?HW-CC-KV=V1&HW-CC-Date=20260414T035030Z&HW-CC-Expire=86400&HW-CC-Sign=74DD2526BD014552F6985AF21583EFBA937EBE928B2FE077C38CA70F6DA4A129)

## 自定义样式

* 通过selectedColor属性设置Toggle打开选中后的背景颜色。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Toggle({ type: ToggleType.Button, isOn: true }) {
  2. Text('status button')
  3. .fontColor('#182431')
  4. .fontSize(12)
  5. }.width(100)
  6. .selectedColor(Color.Pink)
  7. // ···

  9. Toggle({ type: ToggleType.Checkbox, isOn: true })
  10. .selectedColor(Color.Pink)
  11. // ···
  12. Toggle({ type: ToggleType.Switch, isOn: true })
  13. .selectedColor(Color.Pink)
  14. // ···
  ```

  [ToggleCustomStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ChooseComponent/entry/src/main/ets/pages/toggle/ToggleCustomStyle.ets#L31-L52)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cd/v3/8koOX-jbSx6Lie2ibADqdw/zh-cn_image_0000002571171519.png?HW-CC-KV=V1&HW-CC-Date=20260414T035030Z&HW-CC-Expire=86400&HW-CC-Sign=F303DC5A39E51E7AD1B40D1D3BC067CFEF9B36AF34189C94C0865E4245CE5CF7)
* 通过switchPointColor属性设置Switch类型的圆形滑块颜色，仅对type为ToggleType.Switch生效。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Toggle({ type: ToggleType.Switch, isOn: false })
  2. .switchPointColor(Color.Pink)
  3. // ···
  4. Toggle({ type: ToggleType.Switch, isOn: true })
  5. .switchPointColor(Color.Pink)
  6. // ···
  ```

  [ToggleCustomStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ChooseComponent/entry/src/main/ets/pages/toggle/ToggleCustomStyle.ets#L60-L71)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5f/v3/0vdZ7-phScSJVrpu0nGrMQ/zh-cn_image_0000002540771178.png?HW-CC-KV=V1&HW-CC-Date=20260414T035030Z&HW-CC-Expire=86400&HW-CC-Sign=80E88D59E6E9C30A86FF71657099F80342BF7F14AEBCE6227A44748E5A694FEA)

## 添加事件

除支持[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)外，Toggle还用于选中和取消选中后触发某些操作，可以绑定onChange事件来响应操作后的自定义行为。

收起

自动换行

深色代码主题

复制

```
1. Toggle({ type: ToggleType.Switch, isOn: false })
2. .onChange((isOn: boolean) => {
3. if(isOn) {
4. // 需要执行的操作
5. // ···
6. }
7. })
```

[CreateToggle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ChooseComponent/entry/src/main/ets/pages/toggle/CreateToggle.ets#L44-L54)

## 场景示例

Toggle用于切换蓝牙开关状态。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. import { promptAction } from '@kit.ArkUI';

4. @Entry
5. @Component
6. export struct ToggleSample {
7. @State message: string = 'off';
8. pathStack: NavPathStack = new NavPathStack();

10. build() {
11. // ···
12. Column({ space: 8 }) {
13. Column({ space: 8 }) {
14. Text('Bluetooth Mode: ' + this.message)
15. .id('message')
16. Row() {
17. Text('Bluetooth')
18. Blank()
19. Toggle({ type: ToggleType.Switch })
20. .id('toggle') // 请开发者替换为实际的id
21. .onChange((isOn: boolean) => {
22. if (isOn) {
23. this.message = 'on';
24. promptAction.openToast({ 'message': 'Bluetooth is on.' });
25. } else {
26. this.message = 'off';
27. promptAction.openToast({ 'message': 'Bluetooth is off.' });
28. }
29. })
30. }.width('100%')
31. }
32. .alignItems(HorizontalAlign.Start)
33. .backgroundColor('#fff')
34. .borderRadius(12)
35. .padding(12)
36. .width('100%')
37. }
38. .width('100%')
39. .height('100%')
40. .padding({ left: 12, right: 12 })
41. // ···
42. .backgroundColor('#f1f2f3')
43. // 请将$r('app.string.ToggleCaseExample_title')替换为实际资源文件，在本示例中该资源文件的value值为"toggle蓝牙示例"
44. .title($r('app.string.ToggleCaseExample_title'))
45. }
46. }
```

[ToggleCaseExample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ChooseComponent/entry/src/main/ets/pages/toggle/ToggleCaseExample.ets#L16-L69)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a9/v3/AR7qN-pbSOmJZcfTa-bI7A/zh-cn_image_0000002571291475.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035030Z&HW-CC-Expire=86400&HW-CC-Sign=6731ECF96E9BDB15C2DAFEB0F229D9611008372438B2C83A72C3332D8A12957B)