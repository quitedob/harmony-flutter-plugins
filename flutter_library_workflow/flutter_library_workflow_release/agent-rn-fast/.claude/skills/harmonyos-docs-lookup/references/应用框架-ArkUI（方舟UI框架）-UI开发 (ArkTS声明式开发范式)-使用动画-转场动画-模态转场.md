模态转场是新的界面覆盖在旧的界面上，旧的界面不消失的一种转场方式。

**表1** 模态转场接口

展开

| 接口 | 说明 | 使用场景 |
| --- | --- | --- |
| [bindContentCover](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-modal-transition#bindcontentcover) | 弹出全屏的模态组件。 | 用于自定义全屏的模态展示界面，结合转场动画和共享元素动画可实现复杂转场动画效果，如缩略图片点击后查看大图。 |
| [bindSheet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-sheet-transition#bindsheet) | 弹出半模态组件。 | 用于半模态展示界面，如分享框。 |
| [bindMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-menu#bindmenu11) | 弹出菜单，点击组件后弹出。 | 需要Menu菜单的场景，如一般应用的“+”号键。 |
| [bindContextMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-menu#bindcontextmenu12) | 弹出菜单，长按或者右键点击后弹出。 | 长按浮起效果，一般结合拖拽框架使用，如桌面图标长按浮起。 |
| [bindPopup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-popup#bindpopup) | 弹出Popup弹框。 | Popup弹框场景，如点击后对某个组件进行临时说明。 |
| [if](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-ifelse) | 通过if新增或删除组件。 | 用来在某个状态下临时显示一个界面，这种方式的返回导航需要由开发者监听接口实现。 |

## 使用bindContentCover构建全屏模态转场效果

[bindContentCover](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-modal-transition#bindcontentcover)接口用于为组件绑定全屏模态页面，在组件出现和消失时可通过设置转场参数ModalTransition添加过渡动效。

1. 定义全屏模态转场效果[bindContentCover](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-modal-transition#bindcontentcover)。
2. 定义模态展示界面。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 通过@Builder构建模态展示界面
   2. @Builder MyBuilder() {
   3. Column() {
   4. Text('my model view')
   5. }
   6. // 通过转场动画实现出现消失转场动画效果，transition需要加在builder下的第一个组件
   7. .transition(TransitionEffect.translate({ y: 1000 }).animation({ curve: curves.springMotion(0.6, 0.8) }))
   8. }
   ```
3. 通过模态接口调起模态展示界面，通过转场动画或者共享元素动画去实现对应的动画效果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 模态转场控制变量
   2. @State isPresent: boolean = false;

   4. Button('Click to present model view')
   5. // 通过选定的模态接口，绑定模态展示界面，ModalTransition是内置的ContentCover转场动画类型，这里选择None代表系统不加默认动画，通过onDisappear控制状态变量变换
   6. .bindContentCover(this.isPresent, this.MyBuilder(), {
   7. modalTransition: ModalTransition.NONE,
   8. onDisappear: () => {
   9. if (this.isPresent) {
   10. this.isPresent = !this.isPresent;
   11. }
   12. }
   13. })
   14. .onClick(() => {
   15. // 改变状态变量，显示模态界面
   16. this.isPresent = !this.isPresent;
   17. })
   ```

完整示例代码和效果如下。

收起

自动换行

深色代码主题

复制

```
1. import { curves } from '@kit.ArkUI';
2. import { common } from '@kit.AbilityKit';

4. interface PersonList {
5. name: string,
6. cardNum: string
7. }

9. @Entry
10. @Component
11. struct BindContentCoverDemo {
12. private context = this.getUIContext().getHostContext() as common.UIAbilityContext;
13. private personList: Array<PersonList> = [
14. { name: this.context.resourceManager.getStringByNameSync('modal_transition_text1'), cardNum: '1234***********789' },
15. { name: this.context.resourceManager.getStringByNameSync('modal_transition_text2'), cardNum: '2345***********789' },
16. { name: this.context.resourceManager.getStringByNameSync('modal_transition_text3'), cardNum: '3456***********789' },
17. { name: this.context.resourceManager.getStringByNameSync('modal_transition_text4'), cardNum: '4567***********789' }
18. ];
19. // 第一步：定义全屏模态转场效果bindContentCover
20. // 模态转场控制变量
21. @State isPresent: boolean = false;

23. // 第二步：定义模态展示界面
24. // 通过@Builder构建模态展示界面
25. @Builder
26. MyBuilder() {
27. Column() {
28. Row() {
29. Text(this.context.resourceManager.getStringByNameSync('modal_transition_text5'))
30. .fontSize(20)
31. .fontColor(Color.White)
32. .width('100%')
33. .textAlign(TextAlign.Center)
34. .padding({ top: 30, bottom: 15 })
35. }
36. .backgroundColor(0x007dfe)

38. Row() {
39. Text(this.context.resourceManager.getStringByNameSync('modal_transition_text6'))
40. .fontSize(16)
41. .fontColor(0x333333)
42. .margin({ top: 10 })
43. .padding({ top: 20, bottom: 20 })
44. .width('92%')
45. .borderRadius(10)
46. .textAlign(TextAlign.Center)
47. .backgroundColor(Color.White)
48. }

50. Column() {
51. ForEach(this.personList, (item: PersonList, index: number) => {
52. Row() {
53. Column() {
54. if (index % 2 === 0) {
55. Column()
56. .width(20)
57. .height(20)
58. .border({ width: 1, color: 0x007dfe })
59. .backgroundColor(0x007dfe)
60. } else {
61. Column()
62. .width(20)
63. .height(20)
64. .border({ width: 1, color: 0x007dfe })
65. }
66. }
67. .width('20%')

69. Column() {
70. Text(item.name)
71. .fontColor(0x333333)
72. .fontSize(18)
73. Text(item.cardNum)
74. .fontColor(0x666666)
75. .fontSize(14)
76. }
77. .width('60%')
78. .alignItems(HorizontalAlign.Start)

80. Column() {
81. Text(this.context.resourceManager.getStringByNameSync('modal_transition_text7'))
82. .fontColor(0x007dfe)
83. .fontSize(16)
84. }
85. .width('20%')
86. }
87. .padding({ top: 10, bottom: 10 })
88. .border({ width: { bottom: 1 }, color: 0xf1f1f1 })
89. .width('92%')
90. .backgroundColor(Color.White)
91. })
92. }
93. .padding({ top: 20, bottom: 20 })

95. Text(this.context.resourceManager.getStringByNameSync('modal_transition_text8'))
96. .width('90%')
97. .height(40)
98. .textAlign(TextAlign.Center)
99. .borderRadius(10)
100. .fontColor(Color.White)
101. .backgroundColor(0x007dfe)
102. .onClick(() => {
103. this.isPresent = !this.isPresent;
104. })
105. }
106. .size({ width: '100%', height: '100%' })
107. .backgroundColor(0xf5f5f5)
108. // 通过转场动画实现出现消失转场动画效果
109. .transition(TransitionEffect.translate({ y: 1000 }).animation({ curve: curves.springMotion(0.6, 0.8) }))
110. }

112. build() {
113. Column() {
114. Row() {
115. Text(this.context.resourceManager.getStringByNameSync('modal_transition_text9'))
116. .fontSize(20)
117. .fontColor(Color.White)
118. .width('100%')
119. .textAlign(TextAlign.Center)
120. .padding({ top: 30, bottom: 60 })
121. }
122. .backgroundColor(0x007dfe)

124. Column() {
125. Row() {
126. Column() {
127. Text('00:25')
128. Text(this.context.resourceManager.getStringByNameSync('modal_transition_text10'))
129. }
130. .width('30%')

132. Column() {
133. Text('G1234')
134. Text(this.context.resourceManager.getStringByNameSync('modal_transition_text11'))
135. }
136. .width('30%')

138. Column() {
139. Text('08:26')
140. Text(this.context.resourceManager.getStringByNameSync('modal_transition_text12'))
141. }
142. .width('30%')
143. }
144. }
145. .width('92%')
146. .padding(15)
147. .margin({ top: -30 })
148. .backgroundColor(Color.White)
149. .shadow({ radius: 30, color: '#aaaaaa' })
150. .borderRadius(10)

152. Column() {
153. Text(this.context.resourceManager.getStringByNameSync('modal_transition_text13'))
154. .fontSize(18)
155. .fontColor(Color.Orange)
156. .fontWeight(FontWeight.Bold)
157. .padding({ top: 10, bottom: 10 })
158. .width('60%')
159. .textAlign(TextAlign.Center)
160. .borderRadius(15)
161. // 通过选定的模态接口，绑定模态展示界面，ModalTransition是内置的ContentCover转场动画类型，
162. // 这里选择DEFAULT代表设置上下切换动画效果，通过onDisappear控制状态变量变换。
163. .bindContentCover(this.isPresent, this.MyBuilder(), {
164. modalTransition: ModalTransition.DEFAULT,
165. onDisappear: () => {
166. if (this.isPresent) {
167. this.isPresent = !this.isPresent;
168. }
169. }
170. })
171. .onClick(() => {
172. // 第三步：通过模态接口调起模态展示界面，通过转场动画或者共享元素动画去实现对应的动画效果
173. // 改变状态变量，显示模态界面
174. this.isPresent = !this.isPresent;
175. })
176. }
177. .padding({ top: 60 })
178. }
179. }
180. }
```

[BindContentCoverDemo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/Animation/entry/src/main/ets/pages/modalTransition/template1/BindContentCoverDemo.ets#L16-L197)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c5/v3/r32X4C2_Rv6ZJX5bthfpfg/zh-cn_image_0000002571171627.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035411Z&HW-CC-Expire=86400&HW-CC-Sign=BD19DE739967C59788A0ED9725B150AE9DB6D04F9A3DB656129802890E0A729A)

## 使用bindSheet构建半模态转场效果

[bindSheet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-sheet-transition#bindsheet)属性可为组件绑定半模态页面，在组件出现时可通过设置自定义或默认的内置高度确定半模态大小。构建半模态转场动效的步骤基本与使用[bindContentCover](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-modal-transition#bindcontentcover)构建全屏模态转场动效相同。

完整示例和效果如下。

收起

自动换行

深色代码主题

复制

```
1. import { common } from '@kit.AbilityKit';

3. @Entry
4. @Component
5. struct BindSheetDemo {
6. private context = this.getUIContext().getHostContext() as common.UIAbilityContext;
7. // 半模态转场显示隐藏控制
8. @State isShowSheet: boolean = false;
9. private menuList: string[] = [this.context.resourceManager.getStringByNameSync('modal_transition_text14'),
10. this.context.resourceManager.getStringByNameSync('modal_transition_text15'),
11. this.context.resourceManager.getStringByNameSync('modal_transition_text16'),
12. this.context.resourceManager.getStringByNameSync('modal_transition_text17'),
13. this.context.resourceManager.getStringByNameSync('modal_transition_text18'),
14. this.context.resourceManager.getStringByNameSync('modal_transition_text19'),
15. this.context.resourceManager.getStringByNameSync('modal_transition_text20')];

17. // 通过@Builder构建半模态展示界面
18. @Builder
19. mySheet() {
20. Column() {
21. Flex({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap }) {
22. ForEach(this.menuList, (item: string) => {
23. Text(item)
24. .fontSize(16)
25. .fontColor(0x333333)
26. .backgroundColor(0xf1f1f1)
27. .borderRadius(8)
28. .margin(10)
29. .padding(15)
30. })
31. }
32. .padding({ top: 18 })
33. }
34. .width('100%')
35. .height('100%')
36. .backgroundColor(Color.White)
37. }

39. build() {
40. Column() {
41. Text(this.context.resourceManager.getStringByNameSync('modal_transition_text21'))
42. .fontSize(28)
43. .padding({ top: 30, bottom: 30 })
44. Column() {
45. Row() {
46. Row()
47. .width(10)
48. .height(10)
49. .backgroundColor('#a8a8a8')
50. .margin({ right: 12 })
51. .borderRadius(20)

53. Column() {
54. Text(this.context.resourceManager.getStringByNameSync('modal_transition_text22'))
55. .fontSize(16)
56. .fontWeight(FontWeight.Medium)
57. }
58. .alignItems(HorizontalAlign.Start)

60. Blank()

62. Row()
63. .width(12)
64. .height(12)
65. .margin({ right: 15 })
66. .border({
67. width: { top: 2, right: 2 },
68. color: 0xcccccc
69. })
70. .rotate({ angle: 45 })
71. }
72. .borderRadius(15)
73. .shadow({ radius: 100, color: '#ededed' })
74. .width('90%')
75. .alignItems(VerticalAlign.Center)
76. .padding({ left: 15, top: 15, bottom: 15 })
77. .backgroundColor(Color.White)
78. // 通过选定的半模态接口，绑定模态展示界面，style中包含两个参数，一个是设置半模态的高度，不设置时默认高度是Large，
79. // 一个是是否显示控制条DragBar，默认是true显示控制条，通过onDisappear控制状态变量变换。
80. .bindSheet(this.isShowSheet, this.mySheet(), {
81. height: 300,
82. dragBar: false,
83. onDisappear: () => {
84. this.isShowSheet = !this.isShowSheet;
85. }
86. })
87. .onClick(() => {
88. this.isShowSheet = !this.isShowSheet;
89. })
90. }
91. .width('100%')
92. }
93. .width('100%')
94. .height('100%')
95. .backgroundColor(0xf1f1f1)
96. }
97. }
```

[BindSheetDemo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/Animation/entry/src/main/ets/pages/modalTransition/template2/BindSheetDemo.ets#L16-L115)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fb/v3/85Y_1WIxReKBxiM3jKJ5qg/zh-cn_image_0000002540771286.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035411Z&HW-CC-Expire=86400&HW-CC-Sign=A0E891750441D3FEB78E3331D7DC5C2DFDE589DF5A0FE0DDF59BEAF748CB9B50)

## 使用bindMenu实现菜单弹出效果

[bindMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-menu#bindmenu)为组件绑定弹出式菜单，通过点击触发。完整示例和效果如下。

收起

自动换行

深色代码主题

复制

```
1. import { common } from '@kit.AbilityKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. const DOMAIN = 0xF811;
5. const TAG = '[Sample_Animation]';

7. class BMD {
8. public value: ResourceStr = '';
9. public action: () => void = () => {
10. };
11. }

13. @Entry
14. @Component
15. struct BindMenuDemo {
16. private context = this.getUIContext().getHostContext() as common.UIAbilityContext;

18. // 第一步: 定义一组数据用来表示菜单按钮项
19. @State items: BMD[] = [
20. {
21. value: this.context.resourceManager.getStringByNameSync('modal_transition_text23'),
22. action: () => {
23. hilog.info(DOMAIN, TAG, 'handle Menu1 select');
24. }
25. },
26. {
27. value: this.context.resourceManager.getStringByNameSync('modal_transition_text24'),
28. action: () => {
29. hilog.info(DOMAIN, TAG, 'handle Menu2 select');
30. }
31. },
32. ]

34. build() {
35. Column() {
36. Button('click')
37. .backgroundColor(0x409eff)
38. // 第二步: 通过bindMenu接口将菜单数据绑定给元素
39. .bindMenu(this.items)
40. }
41. .justifyContent(FlexAlign.Center)
42. .width('100%')
43. .height(437)
44. }
45. }
```

[BindMenuDemo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/Animation/entry/src/main/ets/pages/modalTransition/template3/BindMenuDemo.ets#L16-L64)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/48/v3/eYo26xJvR0mdqioAidkWzw/zh-cn_image_0000002571291583.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035411Z&HW-CC-Expire=86400&HW-CC-Sign=E94B593F376B64C72EABD6BA7C990ABAA54DE6711BEB9C3FE2104CC23D32C52E)

## 使用bindContextMenu实现菜单弹出效果

[bindContextMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-menu#bindcontextmenu8)为组件绑定弹出式菜单，通过长按或右键点击触发。

完整示例和效果如下。

收起

自动换行

深色代码主题

复制

```
1. import { common } from '@kit.AbilityKit';

3. @Entry
4. @Component
5. struct BindContextMenuDemo {
6. private context = this.getUIContext().getHostContext() as common.UIAbilityContext;
7. private menu: string[] = [this.context.resourceManager.getStringByNameSync('modal_transition_text25'),
8. this.context.resourceManager.getStringByNameSync('modal_transition_text26'),
9. this.context.resourceManager.getStringByNameSync('modal_transition_text27')];
10. // $r('app.media.xxx')需要替换为开发者所需的图像资源文件。
11. private pics: Resource[] = [$r('app.media.icon_1'), $r('app.media.icon_2')];

13. // 通过@Builder构建自定义菜单项
14. @Builder
15. myMenu() {
16. Column() {
17. ForEach(this.menu, (item: string) => {
18. Row() {
19. Text(item)
20. .fontSize(18)
21. .width('100%')
22. .textAlign(TextAlign.Center)
23. }
24. .padding(15)
25. .border({ width: { bottom: 1 }, color: 0xcccccc })
26. })
27. }
28. .width(140)
29. .borderRadius(15)
30. .shadow({ radius: 15, color: 0xf1f1f1 })
31. .backgroundColor(0xf1f1f1)
32. }

34. build() {
35. Column() {
36. Row() {
37. Text(this.context.resourceManager.getStringByNameSync('modal_transition_text28'))
38. .fontSize(20)
39. .fontColor(Color.White)
40. .width('100%')
41. .textAlign(TextAlign.Center)
42. .padding({ top: 20, bottom: 20 })
43. }
44. .backgroundColor(0x007dfe)

46. Column() {
47. ForEach(this.pics, (item: Resource) => {
48. Row() {
49. Image(item)
50. .width('100%')
51. .draggable(false)
52. }
53. .padding({
54. top: 20,
55. bottom: 20,
56. left: 10,
57. right: 10
58. })
59. .bindContextMenu(this.myMenu, ResponseType.LongPress)
60. })
61. }
62. }
63. .width('100%')
64. .alignItems(HorizontalAlign.Center)
65. }
66. }
```

[BindContextMenuDemo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/Animation/entry/src/main/ets/pages/modalTransition/template4/BindContextMenuDemo.ets#L16-L84)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8f/v3/EeCBBL1SSHaQL6cQfSLiDA/zh-cn_image_0000002540611636.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035411Z&HW-CC-Expire=86400&HW-CC-Sign=55396E17D53C0D96AE10CDE440A34749B0E0AB72D2A706F82E3B8B8563722DB1)

## 使用bindPopup实现气泡弹窗效果

[bindPopup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-popup#bindpopup)属性可为组件绑定弹窗，并设置弹窗内容，交互逻辑和显示状态。

完整示例和代码如下。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct BindPopupDemo {
4. // 第一步：定义变量控制弹窗显示
5. @State customPopup: boolean = false;

7. // 第二步：popup构造器定义弹框内容
8. @Builder
9. popupBuilder() {
10. Column({ space: 2 }) {
11. Row().width(64)
12. .height(64)
13. .backgroundColor(0x409eff)
14. Text('Popup')
15. .fontSize(10)
16. .fontColor(Color.White)
17. }
18. .justifyContent(FlexAlign.SpaceAround)
19. .width(100)
20. .height(100)
21. .padding(5)
22. }

24. build() {
25. Column() {

27. Button('click')
28. // 第四步：创建点击事件，控制弹窗显隐
29. .onClick(() => {
30. this.customPopup = !this.customPopup;
31. })
32. .backgroundColor(0xf56c6c)
33. // 第三步：使用bindPopup接口将弹窗内容绑定给元素
34. .bindPopup(this.customPopup, {
35. builder: this.popupBuilder,
36. placement: Placement.Top,
37. maskColor: 0x33000000,
38. popupColor: 0xf56c6c,
39. enableArrow: true,
40. onStateChange: (e) => {
41. if (!e.isVisible) {
42. this.customPopup = false;
43. }
44. }
45. })
46. }
47. .justifyContent(FlexAlign.Center)
48. .width('100%')
49. .height(437)
50. }
51. }
```

[BindPopupDemo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/Animation/entry/src/main/ets/pages/modalTransition/template5/BindPopupDemo.ets#L16-L69)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/98/v3/TTyMiF1zTDeJ4ctRsuqaMw/zh-cn_image_0000002571171631.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035411Z&HW-CC-Expire=86400&HW-CC-Sign=99ABD76456722EF9D9361C6655C0F93E134DC591E295F1D0B796CA0B28813DEE)

## 使用if实现模态转场

上述模态转场接口需要绑定到其他组件上，通过监听状态变量改变调起模态界面。同时，也可以通过if范式，通过新增/删除组件实现模态转场效果。

完整示例和代码如下。

收起

自动换行

深色代码主题

复制

```
1. import { common } from '@kit.AbilityKit';

3. @Entry
4. @Component
5. struct ModalTransitionWithIf {
6. private context = this.getUIContext().getHostContext() as common.UIAbilityContext;
7. // 请在resources\base\element\string.json文件中配置name为'modal_transition_text29'，value为非空字符串的资源
8. private listArr: ResourceStr[] = ['WLAN', this.context.resourceManager.getStringByNameSync('modal_transition_text29'),
9. // 请在resources\base\element\string.json文件中配置name为'modal_transition_text30'，value为非空字符串的资源
10. this.context.resourceManager.getStringByNameSync('modal_transition_text30'),
11. // 请在resources\base\element\string.json文件中配置name为'modal_transition_text31'，value为非空字符串的资源
12. this.context.resourceManager.getStringByNameSync('modal_transition_text31')];
13. // 请在resources\base\element\string.json文件中配置name为'modal_transition_text32'，value为非空字符串的资源
14. private shareArr: ResourceStr[] = [this.context.resourceManager.getStringByNameSync('modal_transition_text32'),
15. // 请在resources\base\element\string.json文件中配置name为'modal_transition_text33'，value为非空字符串的资源
16. this.context.resourceManager.getStringByNameSync('modal_transition_text33'), 'VPN',
17. // 请在resources\base\element\string.json文件中配置name为'modal_transition_text34'，value为非空字符串的资源
18. this.context.resourceManager.getStringByNameSync('modal_transition_text34'), 'NFC'];
19. // 第一步：定义状态变量控制页面显示
20. @State isShowShare: boolean = false;

22. private shareFunc(): void {
23. this.getUIContext()?.animateTo({ duration: 500 }, () => {
24. this.isShowShare = !this.isShowShare;
25. })
26. }

28. build() {
29. // 第二步：定义Stack布局显示当前页面和模态页面
30. Stack() {
31. Column() {
32. Column() {
33. // 请将$r('app.string.modal_transition_text35')替换为实际资源文件，在本示例中该资源文件的value值为“设置”
34. Text($r('app.string.modal_transition_text35'))
35. .fontSize(28)
36. .fontColor(0x333333)
37. }
38. .width('90%')
39. .padding({ top: 30, bottom: 15 })
40. .alignItems(HorizontalAlign.Start)
41. // 请将$r('app.string.modal_transition_text36')替换为实际资源文件，在本示例中该资源文件的value值为“输入关键字搜索”
42. TextInput({ placeholder: $r('app.string.modal_transition_text36') })
43. .width('90%')
44. .height(40)
45. .margin({ bottom: 10 })
46. .focusable(false)

48. List({ space: 12, initialIndex: 0 }) {
49. ForEach(this.listArr, (item: string, index: number) => {
50. ListItem() {
51. Row() {
52. Row() {
53. Text(`${item.slice(0, 1)}`)
54. .fontColor(Color.White)
55. .fontSize(14)
56. .fontWeight(FontWeight.Bold)
57. }
58. .width(30)
59. .height(30)
60. .backgroundColor('#a8a8a8')
61. .margin({ right: 12 })
62. .borderRadius(20)
63. .justifyContent(FlexAlign.Center)

65. Column() {
66. Text(item)
67. .fontSize(16)
68. .fontWeight(FontWeight.Medium)
69. }
70. .alignItems(HorizontalAlign.Start)

72. Blank()

74. Row()
75. .width(12)
76. .height(12)
77. .margin({ right: 15 })
78. .border({
79. width: { top: 2, right: 2 },
80. color: 0xcccccc
81. })
82. .rotate({ angle: 45 })
83. }
84. .borderRadius(15)
85. .shadow({ radius: 100, color: '#ededed' })
86. .width('90%')
87. .alignItems(VerticalAlign.Center)
88. .padding({ left: 15, top: 15, bottom: 15 })
89. .backgroundColor(Color.White)
90. }
91. .width('100%')
92. .onClick(() => {
93. // 第五步：改变状态变量，显示模态页面
94. // 请在resources\base\element\string.json文件中配置name为'modal_transition_text37'，value为非空字符串的资源
95. if (item.slice(-2) === this.context.resourceManager.getStringByNameSync('modal_transition_text37')) {
96. this.shareFunc();
97. }
98. })
99. }, (item: string): string => item)
100. }
101. .width('100%')
102. }
103. .width('100%')
104. .height('100%')
105. .backgroundColor(0xfefefe)

107. // 第三步：在if中定义模态页面，显示在最上层，通过if控制模态页面出现消失
108. if (this.isShowShare) {
109. Column() {
110. Column() {
111. Row() {
112. Row() {
113. Row()
114. .width(16)
115. .height(16)
116. .border({
117. width: { left: 2, top: 2 },
118. color: 0x333333
119. })
120. .rotate({ angle: -45 })
121. }
122. .padding({ left: 15, right: 10 })
123. .onClick(() => {
124. this.shareFunc();
125. })
126. // 请将$r('app.string.modal_transition_text31')替换为实际资源文件，在本示例中该资源文件的value值为“连接与共享”
127. Text($r('app.string.modal_transition_text31'))
128. .fontSize(28)
129. .fontColor(0x333333)
130. }
131. .padding({ top: 30 })
132. }
133. .width('90%')
134. .padding({ bottom: 15 })
135. .alignItems(HorizontalAlign.Start)

137. List({ space: 12, initialIndex: 0 }) {
138. ForEach(this.shareArr, (item: string) => {
139. ListItem() {
140. Row() {
141. Row() {
142. Text(`${item.slice(0, 1)}`)
143. .fontColor(Color.White)
144. .fontSize(14)
145. .fontWeight(FontWeight.Bold)
146. }
147. .width(30)
148. .height(30)
149. .backgroundColor('#a8a8a8')
150. .margin({ right: 12 })
151. .borderRadius(20)
152. .justifyContent(FlexAlign.Center)

154. Column() {
155. Text(item)
156. .fontSize(16)
157. .fontWeight(FontWeight.Medium)
158. }
159. .alignItems(HorizontalAlign.Start)

161. Blank()

163. Row()
164. .width(12)
165. .height(12)
166. .margin({ right: 15 })
167. .border({
168. width: { top: 2, right: 2 },
169. color: 0xcccccc
170. })
171. .rotate({ angle: 45 })
172. }
173. .borderRadius(15)
174. .shadow({ radius: 100, color: '#ededed' })
175. .width('90%')
176. .alignItems(VerticalAlign.Center)
177. .padding({ left: 15, top: 15, bottom: 15 })
178. .backgroundColor(Color.White)
179. }
180. .width('100%')
181. }, (item: string): string => item)
182. }
183. .width('100%')
184. }
185. .width('100%')
186. .height('100%')
187. .backgroundColor(0xffffff)
188. // 第四步：定义模态页面出现消失转场方式
189. .transition(TransitionEffect.OPACITY
190. .combine(TransitionEffect.translate({ x: '100%' }))
191. .combine(TransitionEffect.scale({ x: 0.95, y: 0.95 })))
192. }
193. }
194. }
195. }
```

[ModalTransitionWithIf.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/Animation/entry/src/main/ets/pages/modalTransition/template6/ModalTransitionWithIf.ets#L16-L205)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/59/v3/AJL1JW2cTneMbCYzLDI5bg/zh-cn_image_0000002540771288.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035411Z&HW-CC-Expire=86400&HW-CC-Sign=3EBE9D9D045B3C63ED4231A51E48F9EF10F298CAA03A175DDE2C098BEE39EA44)