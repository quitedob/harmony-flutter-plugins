ArcSwiper是弧形轮播组件，在圆形屏幕场景下使用，提供弧形轮播显示能力。具体用法请参考[ArcSwiper](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arcswiper)。

在使用ArcSwiper组件之前，需要在代码中先导入ArcSwiper模块。

收起

自动换行

深色代码主题

复制

```
1. import {
2. ArcSwiper,
3. ArcSwiperAttribute,
4. ArcDotIndicator,
5. ArcDirection,
6. ArcSwiperController
7. } from '@kit.ArkUI';
```

[ArcSwiperStyles.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcSwiper/ArcSwiperStyles.ets#L16-L24)

## 设置导航点样式

ArcSwiper提供了默认的弧形导航点样式，导航点默认显示在ArcSwiper下方居中位置，开发者也可以通过[indicator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arcswiper#indicator)属性自定义弧形导航点的样式。

通过indicator属性，开发者可以设置弧形导航点的方向，同时也可以设置导航点和被选中导航点的颜色。

* 导航点使用默认样式

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. ArcSwiper() {
  2. Text('0')
  3. .width(233)
  4. .height(233)
  5. .backgroundColor(Color.Gray)
  6. .textAlign(TextAlign.Center)
  7. .fontSize(30)

  9. Text('1')
  10. .width(233)
  11. .height(233)
  12. .backgroundColor(Color.Green)
  13. .textAlign(TextAlign.Center)
  14. .fontSize(30)

  16. Text('2')
  17. .width(233)
  18. .height(233)
  19. .backgroundColor(Color.Pink)
  20. .textAlign(TextAlign.Center)
  21. .fontSize(30)
  22. }
  ```

  [ArcSwiperStyles.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcSwiper/ArcSwiperStyles.ets#L35-L58)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9/v3/zceTagMrQyG-cqL_GaelkA/zh-cn_image_0000002571291459.png?HW-CC-KV=V1&HW-CC-Date=20260414T035008Z&HW-CC-Expire=86400&HW-CC-Sign=C71D1CCE9206EA7D23A6BD350C6E4AF0622CA797A96B286875EC806F256E4B94)
* 自定义导航点样式

  导航点位于ArcSwiper组件6点钟方向，导航点颜色设为红色，被选中导航点颜色为蓝色。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. ArcSwiper() {
  2. // ···
  3. }
  4. .indicator(
  5. new ArcDotIndicator()
  6. .arcDirection(ArcDirection.SIX_CLOCK_DIRECTION) // 设置导航点位于6点钟方向
  7. .itemColor(Color.Red) // 设置导航点颜色为红色
  8. .selectedItemColor(Color.Blue) // 设置选中导航点颜色为蓝色
  9. )
  ```

  [ArcSwiperStyles.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcSwiper/ArcSwiperStyles.ets#L62-L93)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/26/v3/3HM9PJETR9CgWfCPoeYEdw/zh-cn_image_0000002540611510.png?HW-CC-KV=V1&HW-CC-Date=20260414T035008Z&HW-CC-Expire=86400&HW-CC-Sign=98C0B35F32E33DDCF2ECF22CA56CF03D8514095A81B478D365D4AE18E26B1498)

## 控制页面切换方式

ArcSwiper支持滑动手指、点击导航点、旋转表冠和控制控制器四种方式切换页面。以下示例展示通过控制控制器和旋转表冠翻页的方法。

* 控制控制器翻页。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 导入ArcButton和ArcSwiper模块
  2. import {
  3. ArcButton,
  4. ArcButtonOptions,
  5. ArcButtonStatus,
  6. ArcButtonStyleMode,
  7. ArcButtonPosition,
  8. ArcSwiper,
  9. ArcSwiperAttribute, // ArcSwiper的属性依赖ArcSwiperAttribute对象导入，不建议删除该对象的引入。
  10. ArcSwiperController,
  11. // ...
  12. } from '@kit.ArkUI';
  13. // ...

  15. // 如需作为页面入口，请取消@Entry的注释并删除export关键字
  16. // @Entry
  17. @Component
  18. export struct ArcSwiperToggle {
  19. private wearableSwiperController: ArcSwiperController = new ArcSwiperController();

  21. build() {
  22. // ...
  23. Column({ space: 12 }) {
  24. // ...
  25. Stack() {
  26. ArcSwiper(
  27. this.wearableSwiperController
  28. ) {
  29. // ...
  30. }
  31. .vertical(true)
  32. .indicator(false)

  34. // ...


  37. Column() {
  38. ArcButton({
  39. options: new ArcButtonOptions({
  40. label: 'previous',
  41. position: ArcButtonPosition.TOP_EDGE,
  42. styleMode: ArcButtonStyleMode.EMPHASIZED_LIGHT,
  43. onClick: () => {
  44. this.wearableSwiperController.showPrevious(); // 通过controller切换到前一页
  45. }
  46. })
  47. })

  49. Blank()

  51. ArcButton({
  52. options: new ArcButtonOptions({
  53. label: 'next',
  54. position: ArcButtonPosition.BOTTOM_EDGE,
  55. styleMode: ArcButtonStyleMode.EMPHASIZED_LIGHT,
  56. onClick: () => {
  57. this.wearableSwiperController.showNext(); // 通过controller切换到后一页
  58. }
  59. })
  60. })
  61. }.width('100%').height('100%')
  62. }
  63. // ...
  64. }
  65. // ...
  66. }
  67. }
  ```

  [ArcSwiperToggle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcSwiper/ArcSwiperToggle.ets#L16-L145)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4f/v3/EzfbujRVSvyIC6nZsUG3Bg/zh-cn_image_0000002571171505.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035008Z&HW-CC-Expire=86400&HW-CC-Sign=7C27554811250B9DFBDF715654D3966727DD63AFD7402AE9EF7B3B6C3D7B0743)
* 旋转表冠翻页。

  ArcSwiper在获得焦点时能够响应旋转表冠的操作，用户可以通过旋转表冠来滑动ArcSwiper，从而浏览数据。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. ArcSwiper(
  2. // ···
  3. ) {
  4. // ···
  5. }
  6. // ···

  8. .focusable(true)
  9. .focusOnTouch(true)
  10. .defaultFocus(true)
  ```

  [ArcSwiperToggle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcSwiper/ArcSwiperToggle.ets#L52-L98)

  还可以通过设置[digitalCrownSensitivity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arcswiper#digitalcrownsensitivity)属性来调整表冠对事件响应的灵敏度，以适应不同规模的数据处理。在处理大量数据时，可以提高响应事件的灵敏度；而在处理少量数据时，则可以降低灵敏度设置。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. ArcSwiper(
  2. // ···
  3. ) {
  4. // ···
  5. }
  6. // ···

  8. .digitalCrownSensitivity(CrownSensitivity.MEDIUM)
  ```

  [ArcSwiperToggle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcSwiper/ArcSwiperToggle.ets#L51-L102)

## 设置轮播方向

ArcSwiper支持水平和垂直方向上进行轮播，主要通过[vertical](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arcswiper#vertical)属性控制。

当vertical为true时，表示在垂直方向上进行轮播；为false时，表示在水平方向上进行轮播。vertical默认值为false。

* 设置水平方向上轮播。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. ArcSwiper() {
  2. // ···
  3. }
  4. .indicator(true)
  5. .vertical(false)
  ```

  [ArcSwiperHorizontal.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcSwiper/ArcSwiperHorizontal.ets#L30-L57)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/88/v3/i-MHPYMzQ3-C8KinBurKZQ/zh-cn_image_0000002571291459.png?HW-CC-KV=V1&HW-CC-Date=20260414T035008Z&HW-CC-Expire=86400&HW-CC-Sign=97B35E99E06991936F741A72A64C855872B943C6FA131AD521EF5699C2AD789A)
* 设置垂直方向轮播，导航点设为3点钟方向。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. ArcSwiper() {
  2. // ···
  3. }
  4. .indicator(new ArcDotIndicator()
  5. .arcDirection(ArcDirection.THREE_CLOCK_DIRECTION))
  6. .vertical(true)
  ```

  [ArcSwiperVertical.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcSwiper/ArcSwiperVertical.ets#L33-L61)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d2/v3/9gxPIj77Qfq_4KL0POz6OA/zh-cn_image_0000002540771162.png?HW-CC-KV=V1&HW-CC-Date=20260414T035008Z&HW-CC-Expire=86400&HW-CC-Sign=A4A9F4AA1D430B146471902BA90B296DF652BEA94891E8C2ACA0F88658E431D8)

## 自定义切换动画

ArcSwiper支持通过[customContentTransition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-arcswiper#customcontenttransition)设置自定义切换动画，可以在回调中对视窗内所有页面逐帧设置透明度、缩放比例、位移、渲染层级等属性，从而实现自定义切换动画效果。

收起

自动换行

深色代码主题

复制

```
1. import { Decimal } from '@kit.ArkTS';
2. import {
3. ArcSwiper,
4. ArcSwiperAttribute, // ArcSwiper的属性依赖ArcSwiperAttribute对象导入，不建议删除该对象的引入。
5. } from '@kit.ArkUI';
6. // ...

8. // 如需作为页面入口，请取消@Entry的注释并删除export关键字
9. // @Entry
10. @Component
11. export struct ArcSwiperAction {
12. private MIN_SCALE: number = 0.1;
13. @State backgroundColors: Color[] = [Color.Green, Color.Blue, Color.Yellow, Color.Pink, Color.Gray, Color.Orange];
14. @State opacityList: number[] = [];
15. @State scaleList: number[] = [];

17. aboutToAppear(): void {
18. for (let i = 0; i < this.backgroundColors.length; i++) {
19. this.opacityList.push(1.0);
20. this.scaleList.push(1.0);
21. }
22. }

24. build() {
25. // ...
26. Column({ space: 12 }) {
27. // ...
28. ArcSwiper() {
29. ForEach(this.backgroundColors, (backgroundColor: Color, index: number) => {
30. Text(index.toString())
31. .width(233)
32. .height(233)
33. .fontSize(50)
34. .textAlign(TextAlign.Center)
35. .backgroundColor(backgroundColor)
36. .opacity(this.opacityList[index])
37. .scale({ x: this.scaleList[index], y: this.scaleList[index] })
38. })
39. }
40. .customContentTransition({
41. timeout: 1000,
42. transition: (proxy: SwiperContentTransitionProxy) => {
43. if (proxy.position <= -1 || proxy.position >= 1) {
44. // 页面完全滑出视窗外时，重置属性值
45. this.opacityList[proxy.index] = 1.0;
46. this.scaleList[proxy.index] = 1.0;
47. } else {
48. let position: number = Decimal.abs(proxy.position).toNumber();
49. this.opacityList[proxy.index] = 1 - position;
50. this.scaleList[proxy.index] =
51. this.MIN_SCALE + (1 - this.MIN_SCALE) * (1 - position);
52. }
53. }
54. })
55. // ...
56. }
57. .width('100%')
58. // ...
59. }
60. }
```

[ArcSwiperAction.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcSwiper/ArcSwiperAction.ets#L16-L94)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a9/v3/Scfey_tCSaevpIi6epTlDA/zh-cn_image_0000002571291461.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035008Z&HW-CC-Expire=86400&HW-CC-Sign=5510FBE039DC6A27B1BDBDB3ACFDD3FE4F29981785C199FFFA74527389FF61D3)

## 实现侧滑返回

ArcSwiper的滑动事件会与侧滑返回冲突，可以通过[onGestureRecognizerJudgeBegin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-gesture-blocking-enhancement#ongesturerecognizerjudgebegin)去判断ArcSwiper是否滑动到开头去拦截ArcSwiper的滑动手势，实现再次左滑返回上一页的功能。

收起

自动换行

深色代码主题

复制

```
1. import {
2. ArcSwiper,
3. ArcSwiperAttribute, // ArcSwiper的属性依赖ArcSwiperAttribute对象导入，不建议删除该对象的引入。
4. } from '@kit.ArkUI';
5. // ...

7. // 如需作为页面入口，请取消@Entry的注释并删除export关键字
8. // @Entry
9. @Component
10. export struct ArcSwiperSideSlip {
11. @State backgroundColors: Color[] = [Color.Green, Color.Blue, Color.Yellow, Color.Pink, Color.Gray, Color.Orange];
12. innerSelectedIndex: number = 0;

14. build() {
15. // ...
16. Column({ space: 12 }) {
17. // ...
18. ArcSwiper() {
19. ForEach(this.backgroundColors, (backgroundColor: Color, index: number) => {
20. Text(index.toString())
21. .width(233)
22. .height(233)
23. .fontSize(50)
24. .textAlign(TextAlign.Center)
25. .backgroundColor(backgroundColor)
26. })
27. }
28. .onAnimationStart((index: number, targetIndex: number) => {
29. this.innerSelectedIndex = targetIndex;
30. })
31. .onGestureRecognizerJudgeBegin((event: BaseGestureEvent, current: GestureRecognizer,
32. others: Array<GestureRecognizer>): GestureJudgeResult => { // 在识别器即将要成功时，根据当前组件状态，设置识别器使能状态
33. if (current) {
34. let target = current.getEventTargetInfo();
35. if (target && current.isBuiltIn() && current.getType() == GestureControl.GestureType.PAN_GESTURE) {
36. let swiperTarget = target as ScrollableTargetInfo;
37. if (swiperTarget instanceof ScrollableTargetInfo &&
38. (swiperTarget.isBegin() || this.innerSelectedIndex === 0)) { // 此处判断swiperTarget.isBegin()或innerSelectedIndex === 0，表明ArcSwiper滑动到开头
39. let panEvent = event as PanGestureEvent;
40. if (panEvent && panEvent.offsetX > 0 && (swiperTarget.isBegin() || this.innerSelectedIndex === 0)) {
41. return GestureJudgeResult.REJECT;
42. }
43. }
44. }
45. }
46. return GestureJudgeResult.CONTINUE;
47. })
48. // ...
49. }
50. .width('100%')
51. // ...
52. }
53. }
```

[ArcSwiperSideSlip.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/arcSwiper/ArcSwiperSideSlip.ets#L16-L87)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fc/v3/uR0mSBblTqGF7fzkd57Y-g/zh-cn_image_0000002540611512.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035008Z&HW-CC-Expire=86400&HW-CC-Sign=BBF89E8C695AE5552F31D082E7241176A85359064C4B9F58229F0525F69DF44D)