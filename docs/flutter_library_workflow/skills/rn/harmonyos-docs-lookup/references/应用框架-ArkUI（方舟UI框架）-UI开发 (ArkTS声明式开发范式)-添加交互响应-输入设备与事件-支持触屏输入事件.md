![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4a/v3/fhX0IBeHRbW3vKw0-RMqfw/zh-cn_image_0000002571291535.png?HW-CC-KV=V1&HW-CC-Date=20260414T035250Z&HW-CC-Expire=86400&HW-CC-Sign=94B484E49E0B5CCE4A9B3107DABECD1C0A1A7EFBD73BA9643DDF7CD32393BC09)

触屏设备是最常见的输入设备，几乎所有手持类终端设备都支持用户通过触控操作。触摸事件也是应用开发者最常处理的事件类型之一。

需要注意的是，对于其他类型的输入设备上的类似触控行为的操作，系统为了交互一致性，也会将其转换为触摸事件派发给应用，如按下**鼠标**左键点击、滑动，既可以接收到Touch事件，也可以接收到鼠标事件。如果要将其与触屏设备产生的触摸事件进行区分，可以通过事件中的[SourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-gesture-settings#sourcetype枚举说明8)进行判断。

## 触摸事件

触摸事件可以通过通用事件[onTouch](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-touch#ontouch)在组件上接收，该回调响应遵循命中测试规则。

触摸事件的上报频率会由系统降采样到与屏幕刷新率一致，详见[重采样与历史点](/consumer/cn/doc/harmonyos-guides/arkts-interaction-development-guide-touch-screen#重采样与历史点)章节。

对于支持多点触控的输入设备，使用多根手指同时操作可以产生多个触点，全部的触点信息可以通过[TouchEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-touch#touchevent对象说明)的touches成员得到，而changedTouches会给出当前事件上报时，是哪些触点在产生变化。

其他更多的事件信息可以从[TouchEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-touch#touchevent对象说明)的基类[BaseEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-gesture-customize-judge#baseevent8)中获得。

## 阻止冒泡

参考[事件冒泡](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-interaction-basic-principles#事件冒泡)了解冒泡机制，以下是一个简单示例，实现了只要点击在子组件区域内，就阻止父组件接收触摸事件：

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const TAG = '[Sample_PreventBubbling]';
4. const DOMAIN = 0xF811;
5. const BUNDLE = 'MyApp_PreventBubbling';

7. @Entry
8. @ComponentV2
9. struct PreventBubbling {
10. build() {
11. RelativeContainer() {
12. Column() { // 父组件
13. // 请将$r('app.string.preventEvent')替换为实际资源文件，在本示例中该资源文件的value值为"如果点中了我，就阻止父组件收到触摸事件"
14. Text($r('app.string.preventEvent'))
15. .fontColor(Color.White)
16. .height('40%')
17. .width('80%')
18. .backgroundColor(Color.Brown)
19. .alignSelf(ItemAlign.Center)
20. .padding(10)
21. .margin(20)
22. .onTouch((event: TouchEvent) => {
23. event.stopPropagation(); // 子组件优先接收到触摸事件后，阻止父组件接收事件
24. })
25. }
26. .justifyContent(FlexAlign.End)
27. .backgroundColor(Color.Green)
28. .height('100%')
29. .width('100%')
30. .onTouch((event: TouchEvent) => {
31. hilog.info(DOMAIN, TAG, BUNDLE + 'touch event received on parent');
32. })
33. }
34. .height('100%')
35. .width('100%')
36. }
37. }
```

[PreventBubbling.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/InterAction/entry/src/main/ets/pages/PreventBubbling/PreventBubbling.ets#L16-L54)

说明

对事件的冒泡进行控制不会影响手势对触摸事件的接收与处理，因此需要分别考虑这两者。

## 重采样与历史点

基础事件的上报频率与具体的输入设备类型有关，但一般频率都是非常高的，如触屏一般每5~7ms即上报一个点，而对于一些高精度鼠标，上报频率最高可达到每1ms上报一次。由于对输入事件的响应是为了UI界面的变化来产生对用户操作的响应，因此将如此之高的基础事件上报给应用，多数情况下是冗余的。为此系统会对两帧之间所收到的基础事件进行重采样，只在帧内上报一次给应用。重采样是针对每个触点单独进行的，不同触点会单独进行重采样。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d5/v3/O5bkPKzER3OtUWxoBgy95Q/zh-cn_image_0000002540611586.png?HW-CC-KV=V1&HW-CC-Date=20260414T035250Z&HW-CC-Expire=86400&HW-CC-Sign=B8E272FB7724545DA8FB71B7BAAAE59B3AE664F3D6FAC958DA7317863CCC8954)

* 按下时产生的事件会立即上报给应用；
* 帧内的move报点并不会立即下发，而是会在送显帧到来时重采样合并后上报；
* 抬起时产生的事件会立即上报给应用，并在上报之前先将还未处理的move事件上报；

重采样会合并同一个触点在同一帧内多次上报的move事件，并通过算法尽可能计算出一个合适的坐标上报给应用，因此经过重采样后的坐标信息，与底层设备真实上报的点会存在细微的差异，这些差异是有益的，经过重采样后的点通常具备更好的平滑性。

重采样之前的所有原始点信息也都保留下来上报给了应用，如果需要直接处理它们，则可通过getHistoricalPoints(): Array来获取。

以下是一个简单示例：

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const TAG = '[Sample_Sampling]';
4. const DOMAIN = 0xF811;
5. const BUNDLE = 'MyApp_Sampling';

7. @Entry
8. @ComponentV2
9. struct Sampling {
10. build() {
11. RelativeContainer() {
12. Column()
13. .backgroundColor(Color.Green)
14. .height('100%')
15. .width('100%')
16. .onTouch((event: TouchEvent) => {
17. // 从event中获取历史点
18. let allHistoricalPoints = event.getHistoricalPoints();
19. if (allHistoricalPoints.length !== 0) {
20. for (const point of allHistoricalPoints) {
21. hilog.info(DOMAIN, TAG, BUNDLE + 'historical point: [' + point.touchObject.windowX +
22. ', ' + point.touchObject.windowY + ']');
23. }
24. }
25. })
26. }
27. .height('100%')
28. .width('100%')
29. }
30. }
```

[Sampling.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/InterAction/entry/src/main/ets/pages/sampling/Sampling.ets#L16-L47)

## 多指信息

在支持多指触控的触屏设备上，上报的事件中同时包含了窗口所有按压手指的信息，可以通过**touches**获取，如下：

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const TAG = '[Sample_MultipleFingerInformation]';
4. const DOMAIN = 0xF811;
5. const BUNDLE = 'MyApp_MultipleFingerInformation';

7. @Entry
8. @ComponentV2
9. struct MultipleFingerInformation {
10. private currentFingerCount: number = 0;
11. private allFingerIds: number[] = [];

13. build() {
14. RelativeContainer() {
15. Column()
16. .backgroundColor(Color.Green)
17. .height('100%')
18. .width('100%')
19. .onTouch((event: TouchEvent) => {
20. if (event.source !== SourceType.TouchScreen) {
21. return;
22. }
23. // clear数组
24. this.allFingerIds.splice(0, this.allFingerIds.length);
25. // 从event中获取所有触点信息
26. let allFingers = event.touches;
27. if (allFingers.length > 0 && this.currentFingerCount === 0) {
28. // 第1根手指按下
29. hilog.info(DOMAIN, TAG, BUNDLE + 'fingers start to press down');
30. this.currentFingerCount = allFingers.length;
31. }
32. if (allFingers.length !== 0) {
33. for (const finger of allFingers) {
34. this.allFingerIds.push(finger.id);
35. }
36. hilog.info(DOMAIN, TAG, BUNDLE + 'current all fingers : ' + this.allFingerIds.toString());
37. }
38. if (event.type === TouchType.Up && event.touches.length === 1) {
39. // 所有手指都已抬起
40. hilog.info(DOMAIN, TAG, BUNDLE + 'all fingers already up');
41. this.currentFingerCount = 0;
42. }
43. })
44. }
45. .height('100%')
46. .width('100%')
47. }
48. }
```

[MultipleFingerInformation.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/InterAction/entry/src/main/ets/pages/MultipleFingerInformation/MultipleFingerInformation.ets#L16-L65)

不同触点通过id区分，id按照接触屏幕的顺序依次递增，与物理上的触点（手指）并无严格顺序对应关系。并且这些触点在**touches**数组中并非按照编号大小顺序排列，请不要依赖顺序进行访问，另外，直到所有触点全部离开屏幕之前，期间抬起的触点对应的编号，会在有触点按下时自动复用。

以下是上面的示例在如下操作序列时产生的日志输出情况：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b8/v3/m9xW_NSXR82yazbGl9VXHg/zh-cn_image_0000002571171581.png?HW-CC-KV=V1&HW-CC-Date=20260414T035250Z&HW-CC-Expire=86400&HW-CC-Sign=99F7E1668AB98A220AD290A37FDF65ED13ACE7E2BFFAC39A3447AC365C894AA0)

按下手指① -> 按下手指② -> 按下手指③ -> 抬起手指② -> 抬起手指③ -> 按下手指② -> 抬起手指① -> 抬起手指③

收起

自动换行

深色代码主题

复制

```
1. fingers start to press down   // 按下手指①
2. current all fingers: 0
3. ... ...
4. current all fingers: 0,1      // 按下手指②
5. ... ...
6. current all fingers: 0,1,2    // 按下手指③
7. ... ...
8. current all fingers: 0,2      // 抬起手指②
9. ... ...
10. current all fingers: 0        // 抬起手指③
11. ... ...
12. current all fingers: 0,1      // 按下手指③
13. ... ...
14. current all fingers: 1        // 抬起手指①
15. ... ...
16. all fingers already up        // 抬起手指③
```

## 触控笔

触控笔操作触摸屏与通过手指操作类似，都会产生触摸事件，可以通过sourceTool进行区分。而对于一些主动式电容笔，上报的触摸事件中，还会包含笔接触屏幕时的夹角信息，可参考[BaseEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-gesture-customize-judge#baseevent8)。

* tiltX：触控笔在设备平面上的投影与设备平面X轴的夹角。
* tiltY：触控笔在设备平面上的投影与设备平面Y轴的夹角。
* rollAngle：触控笔与设备平面的夹角。