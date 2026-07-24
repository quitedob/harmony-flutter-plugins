物理按键产生的按键事件为非指向性事件，与触摸等指向性事件不同，其事件并没有坐标位置信息，所以其会按照一定次序向获焦组件进行派发，大多数文字输入场景下，按键事件都会优先派发给输入法进行处理，以便其处理文字的联想和候选词，应用可以通过[onKeyPreIme](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-key#onkeypreime12)提前感知事件。

说明

一些系统按键产生的事件并不会传递给UI组件，如电源键。

## 按键事件数据流

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/46/v3/hJFnqM-JR2aTCsKsoWu_qw/zh-cn_image_0000002540611592.png?HW-CC-KV=V1&HW-CC-Date=20260414T035301Z&HW-CC-Expire=86400&HW-CC-Sign=3FFAC60DA4CD5D72BA8CAE3F6C10208CA1499FE38C6EE105D8CD0D08174E8B35)

按键事件由外设键盘等设备触发，经驱动和多模处理转换后发送给当前获焦的窗口，窗口获取到事件后，会尝试分发三次事件。三次分发的优先顺序如下，一旦事件被消费，则跳过后续分发流程。

1. 首先分发给ArkUI框架用于触发获焦组件绑定的[onKeyPreIme](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-key#onkeypreime12)回调和页面快捷键。
2. 再向输入法分发，输入法会消费按键用作输入。
3. 再次将事件发给ArkUI框架，用于响应[onKeyEventDispatch](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-key#onkeyeventdispatch15)事件、获焦组件绑定的[onKeyEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-key#onkeyevent)回调以及走焦。

因此，当某输入框组件获焦，且打开了输入法，此时大部分按键事件均会被输入法消费。例如字母键会被输入法用来往输入框中输入对应字母字符、方向键会被输入法用来切换选中备选词。如果在此基础上给输入框组件绑定了快捷键，那么快捷键会优先响应事件，事件也不再会被输入法消费。

按键事件到ArkUI框架之后，会先找到完整的节点获焦链。从叶子节点到根节点，逐一发送按键事件，若有子组件可以处理则优先给子组件处理，若子组件无法处理，则进行冒泡寻找父组件进行处理。

Web组件的KeyEvent流程与上述过程有所不同。在[onKeyPreIme](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-key#onkeypreime12)返回false时，Web组件不会匹配快捷键。而在第三次按键派发过程中，Web组件会将未消费的[KeyEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-key#keyevent对象说明)通过ReDispatch重新派发回ArkUI，在ReDispatch中再执行匹配快捷键等操作。

## onKeyEvent & onKeyPreIme

收起

自动换行

深色代码主题

复制

```
1. onKeyEvent(event: (event: KeyEvent) => void): T
2. onKeyEvent(event: Callback<KeyEvent, boolean>): T
3. onKeyPreIme(event: Callback<KeyEvent, boolean>): T
4. onKeyEventDispatch(event: Callback<KeyEvent, boolean>): T
```

上述四种方法的区别仅在于触发的时机（见[按键事件数据流](/consumer/cn/doc/harmonyos-guides/arkts-interaction-development-guide-keyboard#按键事件数据流)）。其中onKeyPreIme的返回值决定了该按键事件后续是否会被继续分发给页面快捷键、输入法、onKeyEventDispatch和onKeyEvent。

当绑定方法的组件处于获焦状态下，外设键盘的按键事件会触发该方法，回调参数为[KeyEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-key#keyevent对象说明)，可由该参数获得当前按键事件的按键行为（[KeyType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#keytype)）、键码（[KeyCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-keycode#keycode)）、按键英文名称（keyText）、事件来源设备类型（[KeySource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#keysource)）、事件来源设备id（deviceId）、元键按压状态（metaKey）、时间戳（timestamp）、阻止冒泡设置（stopPropagation）。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct KeyEventExample {
4. @State buttonText: string = '';
5. @State buttonType: string = '';
6. @State columnText: string = '';
7. @State columnType: string = '';

9. build() {
10. Column() {
11. Button('onKeyEvent')
12. .defaultFocus(true)
13. .width(140).height(70)
14. .onKeyEvent((event?: KeyEvent) => { // 给Button设置onKeyEvent事件
15. if (event) {
16. if (event.type === KeyType.Down) {
17. this.buttonType = 'Down';
18. }
19. if (event.type === KeyType.Up) {
20. this.buttonType = 'Up';
21. }
22. this.buttonText = 'Button: \n' +
23. 'KeyType:' + this.buttonType + '\n' +
24. 'KeyCode:' + event.keyCode + '\n' +
25. 'KeyText:' + event.keyText;
26. }
27. })

29. Divider()
30. Text(this.buttonText).fontColor(Color.Green)

32. Divider()
33. Text(this.columnText).fontColor(Color.Red)
34. }.width('100%').height('100%').justifyContent(FlexAlign.Center)
35. .onKeyEvent((event?: KeyEvent) => { // 给父组件Column设置onKeyEvent事件
36. if (event) {
37. if (event.type === KeyType.Down) {
38. this.columnType = 'Down';
39. }
40. if (event.type === KeyType.Up) {
41. this.columnType = 'Up';
42. }
43. this.columnText = 'Column: \n' +
44. 'KeyType:' + this.columnType + '\n' +
45. 'KeyCode:' + event.keyCode + '\n' +
46. 'KeyText:' + event.keyText;
47. }
48. })
49. }
50. }
```

[OnKey.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/EventProject/entry/src/main/ets/pages/device/OnKey.ets#L16-L67)

上述示例中给组件Button和其父容器Column绑定onKeyEvent。应用打开页面加载后，组件树上第一个可获焦的非容器组件自动获焦，设置Button为当前页面的默认焦点，由于Button是Column的子节点，Button获焦也同时意味着Column获焦。获焦机制见[支持焦点处理](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-common-events-focus-event)。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c7/v3/mzrB-cpxT22pljHt7YlUlg/zh-cn_image_0000002571171587.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035301Z&HW-CC-Expire=86400&HW-CC-Sign=0E46938F5064B0C511513E3DF80B74647CA2E16145981A35CF1C3007BBA3BAB7)

打开应用后，依次在键盘上按这些按键：空格、回车、左Ctrl、左Shift、字母A、字母Z。

1. 由于onKeyEvent事件默认是冒泡的，所以Button和Column的onKeyEvent都可以响应。
2. 每个按键都有2次回调，分别对应KeyType.Down和KeyType.Up，表示按键被按下，然后抬起。

如果要阻止冒泡，即仅Button响应键盘事件，Column不响应，在Button的onKeyEvent回调中加入event.stopPropagation()方法即可，如下：

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct KeyEventPreventBubble {
4. @State buttonText: string = '';
5. @State buttonType: string = '';
6. @State columnText: string = '';
7. @State columnType: string = '';

9. build() {
10. Column() {
11. Button('onKeyEvent')
12. .defaultFocus(true)
13. .width(140).height(70)
14. .onKeyEvent((event?: KeyEvent) => {
15. // 通过stopPropagation阻止事件冒泡
16. if (event) {
17. if (event.stopPropagation) {
18. event.stopPropagation();
19. }
20. if (event.type === KeyType.Down) {
21. this.buttonType = 'Down';
22. }
23. if (event.type === KeyType.Up) {
24. this.buttonType = 'Up';
25. }
26. this.buttonText = 'Button: \n' +
27. 'KeyType:' + this.buttonType + '\n' +
28. 'KeyCode:' + event.keyCode + '\n' +
29. 'KeyText:' + event.keyText;
30. }
31. })

33. Divider()
34. Text(this.buttonText).fontColor(Color.Green)

36. Divider()
37. Text(this.columnText).fontColor(Color.Red)
38. }.width('100%').height('100%').justifyContent(FlexAlign.Center)
39. .onKeyEvent((event?: KeyEvent) => { // 给父组件Column设置onKeyEvent事件
40. if (event) {
41. if (event.type === KeyType.Down) {
42. this.columnType = 'Down';
43. }
44. if (event.type === KeyType.Up) {
45. this.columnType = 'Up';
46. }
47. this.columnText = 'Column: \n' +
48. 'KeyType:' + this.columnType + '\n' +
49. 'KeyCode:' + event.keyCode + '\n' +
50. 'KeyText:' + event.keyText;
51. }
52. })
53. }
54. }
```

[OnKeyPreventBubble.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/EventProject/entry/src/main/ets/pages/device/OnKeyPreventBubble.ets#L16-L71)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bc/v3/1tOhrMfhTq-xcydbxloafg/zh-cn_image_0000002540771246.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035301Z&HW-CC-Expire=86400&HW-CC-Sign=4FC7AED0C039F348708CBDD0F6F8105FC4FBE5D455EF3E6C38959A040DA2B730)

使用OnKeyPreIme屏蔽在输入框中使用方向左键。

收起

自动换行

深色代码主题

复制

```
1. import { KeyCode } from '@kit.InputKit';

3. @Entry
4. @Component
5. struct PreImeEventExample {
6. @State buttonText: string = '';
7. @State buttonType: string = '';
8. @State columnText: string = '';
9. @State columnType: string = '';

11. build() {
12. Column() {
13. Search({
14. placeholder: 'Search...'
15. })
16. .width('80%')
17. .height('40vp')
18. .border({ radius: '20vp' })
19. .onKeyPreIme((event: KeyEvent) => {
20. if (event.keyCode == KeyCode.KEYCODE_DPAD_LEFT) {
21. return true;
22. }
23. return false;
24. })
25. }
26. }
27. }
```

[OnKeyPreIme.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/EventProject/entry/src/main/ets/pages/device/OnKeyPreIme.ets#L16-L44)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/96/v3/d_gUr-71QfOjlsdZ8HnvNA/zh-cn_image_0000002571291543.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035301Z&HW-CC-Expire=86400&HW-CC-Sign=EA9DC1A13D21F4C8F6768241CA9968E683F2C97B264669BBC2F4E37EC3556AFA)

使用onKeyEventDispatch分发按键事件到子组件，子组件使用onKeyEvent。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const TAG = '[Sample_Eventproject]';
4. const DOMAIN = 0xF811;
5. const BUNDLE = 'Eventproject_';

7. @Entry
8. @Component
9. struct Index {
10. build() {
11. Row() {
12. Row() {
13. Button('button1')
14. .id('button1')
15. .margin({ left: 70, right: 30 })
16. .onKeyEvent((event) => {
17. hilog.info(DOMAIN, TAG, BUNDLE + 'button1');
18. return true;
19. })
20. Button('button2')
21. .id('button2')
22. .onKeyEvent((event) => {
23. hilog.info(DOMAIN, TAG, BUNDLE + 'button2');
24. return true;
25. })
26. }
27. .width('100%')
28. .height('100%')
29. .id('Row1')
30. .onKeyEventDispatch((event) => {
31. let context = this.getUIContext();
32. context.getFocusController().requestFocus('button1');
33. return context.dispatchKeyEvent('button1', event);
34. })

36. }
37. .height('100%')
38. .width('100%')
39. .onKeyEventDispatch((event) => {
40. if (event.type == KeyType.Down) {
41. let context = this.getUIContext();
42. context.getFocusController().requestFocus('Row1');
43. return context.dispatchKeyEvent('Row1', event);
44. }
45. return true;
46. })
47. }
48. }
```

[OnKeyDistributeEvent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/EventProject/entry/src/main/ets/pages/device/OnKeyDistributeEvent.ets#L15-L65)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4d/v3/oi49ubKPQd6KCvJyI_DFwQ/zh-cn_image_0000002540611594.png?HW-CC-KV=V1&HW-CC-Date=20260414T035301Z&HW-CC-Expire=86400&HW-CC-Sign=2CE9267419CF0198DC25C803C01C71FD599B59F61179FB1276C2AB3B4FEE6967)

使用OnKeyPreIme实现回车提交（建议使用物理键盘）。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const TAG = '[Sample_Eventproject]';
4. const DOMAIN = 0xF811;
5. const BUNDLE = 'Eventproject_';

7. @Entry
8. @Component
9. struct TextAreaDemo {
10. @State content: string = '';
11. @State text: string = '';
12. controller: TextAreaController = new TextAreaController();

14. build() {
15. Column() {
16. Text('Submissions: ' + this.content)
17. TextArea({ controller: this.controller, text: this.text })
18. .onKeyPreIme((event: KeyEvent) => {
19. hilog.info(DOMAIN, TAG, `${BUNDLE + JSON.stringify(event)}`);
20. if (event.keyCode === 2054 && event.type === KeyType.Down) { // 回车键物理码
21. const hasCtrl = event?.getModifierKeyState?.(['Ctrl']);
22. if (hasCtrl) {
23. hilog.info(DOMAIN, TAG, BUNDLE + 'Line break');
24. } else {
25. hilog.info(DOMAIN, TAG, BUNDLE + 'Submissions：' + this.text);
26. this.content = this.text;
27. this.text = '';
28. event.stopPropagation();
29. }
30. return true;
31. }
32. return false;
33. })
34. .onChange((value: string) => {
35. this.text = value;
36. })
37. }
38. }
39. }
```

[OnKeyPreImeCommit.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/EventProject/entry/src/main/ets/pages/device/OnKeyPreImeCommit.ets#L15-L55)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cd/v3/tGAjbT-ETzmBjqTgYEwBvQ/zh-cn_image_0000002571171589.png?HW-CC-KV=V1&HW-CC-Date=20260414T035301Z&HW-CC-Expire=86400&HW-CC-Sign=B1E85EF3777EB5A7488E80777C91BFF3AEF95EF6BF4E72E4BDB667E3A4882557)

在输入框中输入内容后回车。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/30/v3/7tqUTDi9Q2eiCOyHBs3b8g/zh-cn_image_0000002540771248.png?HW-CC-KV=V1&HW-CC-Date=20260414T035301Z&HW-CC-Expire=86400&HW-CC-Sign=70338DD04D60DB8932F7867144D126B74F6172D386AF6C5D1DD11A315BEB52B2)