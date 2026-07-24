@Styles仅应用于静态页面的样式复用，stateStyles可以依据组件的内部状态的不同，快速设置不同样式。这就是我们本章要介绍的内容stateStyles（又称为：多态样式）。

说明

多态样式仅支持通用属性。如果多态样式不生效，则该属性可能为组件的私有属性，例如：[fontColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-button#fontcolor)、[TextInput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput)组件的[backgroundColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-background#backgroundcolor)等。此时，可以通过[attributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#attributemodifier)动态设置组件属性来解决此问题。

## 概述

stateStyles是属性方法，可以根据UI内部状态来设置样式，类似于css伪类，但语法不同。ArkUI提供以下六种状态：

* focused：获焦态。
* normal：正常态。
* pressed：按压态。
* disabled：不可用态。
* clicked：点击态。
* selected10+：选中态。

说明

获焦态目前仅支持通过外接键盘的Tab键或方向键触发，不支持在嵌套滚动组件场景下通过按键触发。

## 使用场景

### 基础场景

下面的示例展示了stateStyles最基本的使用场景。Button1处于第一个组件，Button2处于第二个组件。按压时显示为pressed态指定的黑色。使用Tab键走焦，Button1获焦并显示为focused态指定的粉色。当Button2获焦的时候，Button2显示为focused态指定的粉色，Button1失焦显示normal态指定的蓝色。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct StateStylesSample {
4. build() {
5. Column() {
6. Button('Button1')
7. .stateStyles({
8. focused: {
9. .backgroundColor('#ffffeef0')
10. },
11. pressed: {
12. .backgroundColor('#ff707070')
13. },
14. normal: {
15. .backgroundColor('#ff2787d9')
16. }
17. })
18. .margin(20)
19. Button('Button2')
20. .stateStyles({
21. focused: {
22. .backgroundColor('#ffffeef0')
23. },
24. pressed: {
25. .backgroundColor('#ff707070')
26. },
27. normal: {
28. .backgroundColor('#ff2787d9')
29. }
30. })
31. }.margin('30%')
32. }
33. }
```

[StateStylesSample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateStyle/entry/src/main/ets/pages/StateStyle/StateStylesSample.ets#L16-L50)

**图1** 获焦态和按压态

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d1/v3/o2apTXxoTh2k2ppPSCH3CA/zh-cn_image_0000002540770886.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034305Z&HW-CC-Expire=86400&HW-CC-Sign=C672B435D63B2645A4A0A4554F2AAF6AC561257436A819E89C91045D8B1FF2DD)

### @Styles和stateStyles联合使用

以下示例通过@Styles指定stateStyles的不同状态。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct MyComponent {
4. @Styles normalStyle() {
5. .backgroundColor(Color.Gray)
6. }

8. @Styles pressedStyle() {
9. .backgroundColor(Color.Red)
10. }
11. build() {
12. Column() {
13. Text('Text1')
14. .fontSize(50)
15. .fontColor(Color.White)
16. .stateStyles({
17. normal: this.normalStyle,
18. pressed: this.pressedStyle,
19. })
20. }
21. }
22. }
```

[MyComponent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateStyle/entry/src/main/ets/pages/NormalStyle/MyComponent.ets#L16-L39)

**图2** 正常态和按压态

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9e/v3/U1RBrbUEQQqEm13aUuOtjQ/zh-cn_image_0000002571291181.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034305Z&HW-CC-Expire=86400&HW-CC-Sign=3AFB11508F2DA6E4852698361E9487CDEECA51EC6E69AF3F0B5707C1A44FD6C1)

### 在stateStyles里使用常规变量和状态变量

stateStyles可以通过this绑定组件内的常规变量和状态变量。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct CompWithInlineStateStyles {
4. @State focusedColor: Color = 0xD5D5D5;
5. normalColor: Color = 0x004AAF;

7. build() {
8. Column() {
9. Button('clickMe')
10. .height(100)
11. .width(100)
12. .stateStyles({
13. normal: {
14. .backgroundColor(this.normalColor)
15. },
16. focused: {
17. .backgroundColor(this.focusedColor)
18. }
19. })
20. .onClick(() => {
21. this.focusedColor = 0x707070;
22. })
23. .margin('30%')
24. }
25. }
26. }
```

[CompWithInlineStateStyles.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateStyle/entry/src/main/ets/pages/FocusStyle/CompWithInlineStateStyles.ets#L15-L42)

Button默认normal态显示蓝色，第一次按下Tab键让Button获焦显示为focus态的浅灰色，点击事件触发后，再次按下Tab键让Button获焦，focus态变为深灰色。

**图3** 点击改变获焦态样式

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a8/v3/mtyWiVnaRcSFOL1Z6SQ2Lg/zh-cn_image_0000002540611236.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034305Z&HW-CC-Expire=86400&HW-CC-Sign=717478D8CA245648E005AA62605F092FB344D0868813A510389211F1AC26D435)