[Swiper](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper)组件提供滑动轮播显示的能力。Swiper本身是一个容器组件，当设置了多个子组件后，可以对这些子组件进行轮播显示。通常，在一些应用首页显示推荐的内容时，需要用到轮播显示的能力。

针对复杂页面场景，可以使用Swiper组件的预加载机制，利用主线程的空闲时间来提前构建和布局绘制组件，优化滑动体验。

## 布局与约束

Swiper作为一个容器组件，如果设置了自身尺寸属性，则在轮播显示过程中均以该尺寸生效。如果自身尺寸属性未被设置，则分两种情况：如果设置了[prevMargin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper#prevmargin10)或者[nextMargin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper#nextmargin10)属性，则Swiper自身尺寸会跟随其父组件；如果未设置prevMargin或者nextMargin属性，则会自动根据子组件的大小设置自身的尺寸。

## 循环播放

通过[loop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper#loop)属性控制是否循环播放，该属性默认值为true。

当loop为true时，在显示第一页或最后一页时，可以继续往前切换到前一页或者往后切换到后一页。如果loop为false，则在第一页或最后一页时，无法继续向前或者向后切换页面。

* loop为true

收起

自动换行

深色代码主题

复制

```
1. Swiper() {
2. Text('0')
3. .width('90%')
4. .height('100%')
5. .backgroundColor(Color.Gray)
6. .textAlign(TextAlign.Center)
7. .fontSize(30)

9. Text('1')
10. .width('90%')
11. .height('100%')
12. .backgroundColor(Color.Green)
13. .textAlign(TextAlign.Center)
14. .fontSize(30)

16. Text('2')
17. .width('90%')
18. .height('100%')
19. .backgroundColor(Color.Pink)
20. .textAlign(TextAlign.Center)
21. .fontSize(30)
22. }
23. // ···
24. .loop(true)
```

[SwiperLoop.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperLoop.ets#L24-L51)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d4/v3/noFJVDKQRyGZSQ3OoigwTQ/zh-cn_image_0000002540611502.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034639Z&HW-CC-Expire=86400&HW-CC-Sign=4574F985F9811AB25521BAD0F21EF45193F1EF8DF7C7AE4FBD94C3B9AB2603B3)

* loop为false

收起

自动换行

深色代码主题

复制

```
1. Swiper() {
2. // ···
3. }
4. // ···
5. .loop(false)
```

[SwiperLoop.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperLoop.ets#L55-L84)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5b/v3/YAuP-lbHTgenvvXeK94cjw/zh-cn_image_0000002571171497.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034639Z&HW-CC-Expire=86400&HW-CC-Sign=49DB1D6BC0CB991200BE3FBCA3089BC360DE1F7AC340C98A01CF026981D57CEC)

## 自动轮播

Swiper通过设置[autoPlay](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper#autoplay)属性，控制是否自动轮播子组件。该属性默认值为false。

autoPlay为true时，会自动切换播放子组件，子组件与子组件之间的播放间隔通过interval属性设置。interval属性默认值为3000，单位毫秒。

收起

自动换行

深色代码主题

复制

```
1. Swiper() {
2. // ···
3. }
4. // ···
5. .loop(true)
6. .autoPlay(true)
7. .interval(1000)
```

[SwiperAutoPlay.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperAutoPlay.ets#L24-L55)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f6/v3/npYtmrWATWCsDHSzLGBrPQ/zh-cn_image_0000002540771154.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034639Z&HW-CC-Expire=86400&HW-CC-Sign=E5D518D48C62FF964CF72871426D73ECB44D4C570A9C7F0934A3BEAB4D59491D)

## 导航点样式

Swiper提供了默认的导航点样式和导航点箭头样式，导航点默认显示在Swiper下方居中位置，开发者也可以通过[indicator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper#indicator)属性自定义导航点的位置和样式，导航点箭头默认不显示。

通过indicator属性，开发者可以设置导航点相对于Swiper组件上下左右四个方位的位置，同时也可以设置每个导航点的尺寸、颜色、蒙层和被选中导航点的颜色。

* 导航点使用默认样式

收起

自动换行

深色代码主题

复制

```
1. Swiper() {
2. Text('0')
3. .width('90%')
4. .height('100%')
5. .backgroundColor(Color.Gray)
6. .textAlign(TextAlign.Center)
7. .fontSize(30)

9. Text('1')
10. .width('90%')
11. .height('100%')
12. .backgroundColor(Color.Green)
13. .textAlign(TextAlign.Center)
14. .fontSize(30)

16. Text('2')
17. .width('90%')
18. .height('100%')
19. .backgroundColor(Color.Pink)
20. .textAlign(TextAlign.Center)
21. .fontSize(30)
22. }
```

[SwiperIndicatorStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperIndicatorStyle.ets#L25-L48)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/88/v3/tHfpIsubSfmpfgBFQ3zo6w/zh-cn_image_0000002571291453.png?HW-CC-KV=V1&HW-CC-Date=20260414T034639Z&HW-CC-Expire=86400&HW-CC-Sign=1E7FF1AC732F6DF6E72E5F86D5B037ABE22FB27808C0EED83E4BEF19D6A17311)

* 自定义导航点样式

选中的导航点，直径设为30vp，且颜色为蓝色；未选中的导航点，直径设为15vp，颜色设为红色。

收起

自动换行

深色代码主题

复制

```
1. Swiper() {
2. // ···
3. }
4. // ···
5. .indicator(
6. Indicator.dot()
7. .left(0)
8. .itemWidth(15)
9. .itemHeight(15)
10. .selectedItemWidth(30)
11. .selectedItemHeight(15)
12. .color(Color.Red)
13. .selectedColor(Color.Blue)
14. )
```

[SwiperIndicatorStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperIndicatorStyle.ets#L53-L91)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1f/v3/WjVNO2dkSfyPtdRphalyEQ/zh-cn_image_0000002540611504.png?HW-CC-KV=V1&HW-CC-Date=20260414T034639Z&HW-CC-Expire=86400&HW-CC-Sign=A8028CC41C37D3F5DC02B8EE5BAB7E235336A9A7B27C2681460553AAFBFA7606)

Swiper通过设置[displayArrow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper#displayarrow10)属性，可以控制导航点箭头的大小、位置、颜色，底板的大小及颜色，以及鼠标悬停时是否显示箭头。

* 箭头使用默认样式

收起

自动换行

深色代码主题

复制

```
1. Swiper() {
2. // ···
3. }
4. // ···
5. .displayArrow(true, false)
```

[SwiperIndicatorStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperIndicatorStyle.ets#L95-L124)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d0/v3/HsXhkmsfT3G-1W8dEHgiSw/zh-cn_image_0000002571171499.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034639Z&HW-CC-Expire=86400&HW-CC-Sign=5E7163BD41AEF49879D03783289DAB971AC6EF716F2361455A696B84774F548F)

* 自定义箭头样式

箭头显示在组件两侧，大小为18vp，导航点箭头颜色设为蓝色。

收起

自动换行

深色代码主题

复制

```
1. Swiper() {
2. // ···
3. }
4. // ···
5. .displayArrow({
6. showBackground: true,
7. isSidebarMiddle: true,
8. backgroundSize: 24,
9. backgroundColor: Color.White,
10. arrowSize: 18,
11. arrowColor: Color.Blue
12. }, false)
```

[SwiperIndicatorStyle.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperIndicatorStyle.ets#L128-L164)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a/v3/qbIvkdGfTlS0Oo7qXJ6xvg/zh-cn_image_0000002540771156.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034639Z&HW-CC-Expire=86400&HW-CC-Sign=48AFAA2BCADEA2D9A316E8A10FE8A9255946835951EF086FC096B51B3FC057DD)

## 页面切换方式

Swiper支持手指滑动、点击导航点和通过控制器三种方式切换页面，以下示例展示通过控制器切换页面的方法。

收起

自动换行

深色代码主题

复制

```
1. // 如需作为页面入口，请取消@Entry的注释并删除export关键字
2. // @Entry
3. @Component
4. export struct SwiperPageSwitchMethod {
5. private swiperBackgroundColors: Color[] = [Color.Blue, Color.Brown, Color.Gray, Color.Green, Color.Orange,
6. Color.Pink, Color.Red, Color.Yellow];
7. private swiperAnimationMode: (SwiperAnimationMode | boolean | undefined)[] = [undefined, true, false,
8. SwiperAnimationMode.NO_ANIMATION, SwiperAnimationMode.DEFAULT_ANIMATION, SwiperAnimationMode.FAST_ANIMATION];
9. private swiperController: SwiperController = new SwiperController();
10. private animationModeIndex: number = 0;
11. private animationMode: (SwiperAnimationMode | boolean | undefined) = undefined;
12. @State animationModeStr: string = 'undefined';
13. @State targetIndex: number = 0;

15. aboutToAppear(): void {
16. this.toSwiperAnimationModeStr();
17. }

19. build() {
20. // ...
21. Column({ space: 5 }) {
22. Swiper(this.swiperController) {
23. ForEach(this.swiperBackgroundColors, (backgroundColor: Color, index: number) => {
24. Text(index.toString())
25. .width(250)
26. .height(250)
27. .backgroundColor(backgroundColor)
28. .textAlign(TextAlign.Center)
29. .fontSize(30)
30. })
31. }
32. // ...
33. .indicator(true)

35. Row({ space: 12 }) {
36. Button('showNext')
37. .onClick(() => {
38. this.swiperController.showNext(); // 通过controller切换到后一页
39. })
40. Button('showPrevious')
41. .onClick(() => {
42. this.swiperController.showPrevious(); // 通过controller切换到前一页
43. })
44. }.margin(5)

46. Row({ space: 12 }) {
47. Text('Index:')
48. Button(this.targetIndex.toString())
49. .onClick(() => {
50. this.targetIndex = (this.targetIndex + 1) % this.swiperBackgroundColors.length;
51. })
52. }.margin(5)
53. Row({ space: 12 }) {
54. Text('AnimationMode:')
55. Button(this.animationModeStr)
56. .onClick(() => {
57. this.animationModeIndex = (this.animationModeIndex + 1) % this.swiperAnimationMode.length;
58. this.toSwiperAnimationModeStr();
59. })
60. }.margin(5)

62. Row({ space: 12 }) {
63. Button('changeIndex(' + this.targetIndex + ', ' + this.animationModeStr + ')')
64. .onClick(() => {
65. this.swiperController.changeIndex(this.targetIndex, this.animationMode); // 通过controller切换到指定页
66. })
67. }.margin(5)
68. }
69. // ...
70. }

72. private toSwiperAnimationModeStr() {
73. this.animationMode = this.swiperAnimationMode[this.animationModeIndex];
74. if ((this.animationMode === true) || (this.animationMode === false)) {
75. this.animationModeStr = '' + this.animationMode;
76. } else if ((this.animationMode === SwiperAnimationMode.NO_ANIMATION) ||
77. (this.animationMode === SwiperAnimationMode.DEFAULT_ANIMATION) ||
78. (this.animationMode === SwiperAnimationMode.FAST_ANIMATION)) {
79. this.animationModeStr = SwiperAnimationMode[this.animationMode];
80. } else {
81. this.animationModeStr = 'undefined';
82. }
83. }
84. }
```

[SwiperPageSwitchMethod.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperPageSwitchMethod.ets#L18-L119)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/51/v3/P8fRf3uUSWaoOzhEHR0ZUw/zh-cn_image_0000002571291455.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034639Z&HW-CC-Expire=86400&HW-CC-Sign=F125985B0C35EC3663ED9235875E74B84473468B0B05CAD2ED4519607F688E8A)

## 轮播方向

Swiper支持水平和垂直方向上进行轮播，主要通过[vertical](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper#vertical)属性控制。

当vertical为true时，表示在垂直方向上进行轮播；为false时，表示在水平方向上进行轮播。vertical默认值为false。

* 设置水平方向上轮播。

收起

自动换行

深色代码主题

复制

```
1. Swiper(
2. // ···
3. ) {
4. // ···
5. }
6. // ···
7. .indicator(true)
8. .vertical(false)
```

[SwiperDirection.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperDirection.ets#L28-L62)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ed/v3/5EJiwd1ZQwKljZMdtCdIag/zh-cn_image_0000002540611506.png?HW-CC-KV=V1&HW-CC-Date=20260414T034639Z&HW-CC-Expire=86400&HW-CC-Sign=5577596BF733F5E4DBD6E66AE384929FD366B5B7F374DF2DE2443B0FB4C3302B)

* 设置垂直方向轮播。

收起

自动换行

深色代码主题

复制

```
1. Swiper(
2. // ···
3. ) {
4. // ···
5. }
6. // ···
7. .indicator(true)
8. .vertical(true)
```

[SwiperDirection.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperDirection.ets#L79-L113)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fe/v3/hjss4QYzRgKAijIXhPaOtA/zh-cn_image_0000002571171501.png?HW-CC-KV=V1&HW-CC-Date=20260414T034639Z&HW-CC-Expire=86400&HW-CC-Sign=CBFFC1A3920E03BBCC0C81D82080BFC012CDB4B74CC1B56492638FE22C4B3DBA)

## 每页显示多个子页面

Swiper支持在一个页面内同时显示多个子组件，通过[displayCount](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper#displaycount8)属性设置。

收起

自动换行

深色代码主题

复制

```
1. Swiper() {
2. Text('0')
3. .width(250)
4. .height(250)
5. .backgroundColor(Color.Gray)
6. .textAlign(TextAlign.Center)
7. .fontSize(30)
8. Text('1')
9. .width(250)
10. .height(250)
11. .backgroundColor(Color.Green)
12. .textAlign(TextAlign.Center)
13. .fontSize(30)
14. Text('2')
15. .width(250)
16. .height(250)
17. .backgroundColor(Color.Pink)
18. .textAlign(TextAlign.Center)
19. .fontSize(30)
20. Text('3')
21. .width(250)
22. .height(250)
23. .backgroundColor(Color.Yellow)
24. .textAlign(TextAlign.Center)
25. .fontSize(30)
26. }
27. // ···
28. .indicator(true)
29. .displayCount(2)
30. }
```

[SwiperMultiPage.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperMultiPage.ets#L24-L58)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c8/v3/kjY1ZwV_StqzVYp8ckigGw/zh-cn_image_0000002540771158.png?HW-CC-KV=V1&HW-CC-Date=20260414T034639Z&HW-CC-Expire=86400&HW-CC-Sign=83B3F47580FAFC62C5CF4F53C5156965FF7681ADB81C4287A916B474EC082DFF)

## 自定义切换动画

Swiper支持通过[customContentTransition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper#customcontenttransition12)设置自定义切换动画，可以在回调中对视窗内所有页面逐帧设置透明度、缩放比例、位移、渲染层级等属性实现自定义切换动画。

收起

自动换行

深色代码主题

复制

```
1. // 如需作为页面入口，请取消@Entry的注释并删除export关键字
2. // @Entry
3. @Component
4. export struct SwiperCustomAnimation {
5. private DISPLAY_COUNT: number = 2;
6. private MIN_SCALE: number = 0.75;
7. @State backgroundColors: Color[] = [Color.Green, Color.Blue, Color.Yellow, Color.Pink, Color.Gray, Color.Orange];
8. @State opacityList: number[] = [];
9. @State scaleList: number[] = [];
10. @State translateList: number[] = [];
11. @State zIndexList: number[] = [];

13. aboutToAppear(): void {
14. for (let i = 0; i < this.backgroundColors.length; i++) {
15. this.opacityList.push(1.0);
16. this.scaleList.push(1.0);
17. this.translateList.push(0.0);
18. this.zIndexList.push(0);
19. }
20. }

22. build() {
23. // ...
24. Column({ space: 12 }) {
25. // ...
26. Swiper() {
27. ForEach(this.backgroundColors, (backgroundColor: Color, index: number) => {
28. Text(index.toString())
29. .width('100%')
30. .height('100%')
31. .fontSize(50)
32. .textAlign(TextAlign.Center)
33. .backgroundColor(backgroundColor)
34. .opacity(this.opacityList[index])
35. .scale({ x: this.scaleList[index], y: this.scaleList[index] })
36. .translate({ x: this.translateList[index] })
37. .zIndex(this.zIndexList[index])
38. })
39. }
40. .height(300)
41. .indicator(false)
42. .displayCount(this.DISPLAY_COUNT, true)
43. .customContentTransition({
44. timeout: 1000,
45. transition: (proxy: SwiperContentTransitionProxy) => {
46. if (proxy.position <= proxy.index % this.DISPLAY_COUNT ||
47. proxy.position >= this.DISPLAY_COUNT + proxy.index % this.DISPLAY_COUNT) {
48. // 同组页面完全滑出视窗外时，重置属性值
49. this.opacityList[proxy.index] = 1.0;
50. this.scaleList[proxy.index] = 1.0;
51. this.translateList[proxy.index] = 0.0;
52. this.zIndexList[proxy.index] = 0;
53. } else {
54. // 同组页面未滑出视窗外时，对同组中左右两个页面，逐帧根据position修改属性值
55. if (proxy.index % this.DISPLAY_COUNT === 0) {
56. this.opacityList[proxy.index] = 1 - proxy.position / this.DISPLAY_COUNT;
57. this.scaleList[proxy.index] =
58. this.MIN_SCALE + (1 - this.MIN_SCALE) * (1 - proxy.position / this.DISPLAY_COUNT);
59. this.translateList[proxy.index] = -proxy.position * proxy.mainAxisLength +
60. (1 - this.scaleList[proxy.index]) * proxy.mainAxisLength / 2.0;
61. } else {
62. this.opacityList[proxy.index] = 1 - (proxy.position - 1) / this.DISPLAY_COUNT;
63. this.scaleList[proxy.index] =
64. this.MIN_SCALE + (1 - this.MIN_SCALE) * (1 - (proxy.position - 1) / this.DISPLAY_COUNT);
65. this.translateList[proxy.index] = -(proxy.position - 1) * proxy.mainAxisLength -
66. (1 - this.scaleList[proxy.index]) * proxy.mainAxisLength / 2.0;
67. }
68. this.zIndexList[proxy.index] = -1;
69. }
70. }
71. })
72. // ...
73. }
74. .width('100%')
75. // ...
76. }
77. }
```

[SwiperCustomAnimation.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperCustomAnimation.ets#L18-L109)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3b/v3/Wmw9w-drQK-gO5InKLfDfg/zh-cn_image_0000002571291457.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034639Z&HW-CC-Expire=86400&HW-CC-Sign=B2B1F000EEBA9130227177E253A082818BBE28A43FE02CD345DEA463BA824AFF)

## Swiper与Tabs联动

从API version 18开始，Swiper选中的元素改变时，会通过[onSelected](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper#onselected18)回调事件，将元素的索引值index返回。通过调用[tabsController.changeIndex(index)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-tabs#changeindex)方法来实现Tabs页签的切换。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. class MyDataSource implements IDataSource {
3. private list: number[] = [];

5. constructor(list: number[]) {
6. this.list = list;
7. }

9. totalCount(): number {
10. return this.list.length;
11. }

13. getData(index: number): number {
14. return this.list[index];
15. }

17. registerDataChangeListener(listener: DataChangeListener): void {
18. }

20. unregisterDataChangeListener() {
21. }
22. }

24. // 如需作为页面入口，请取消@Entry的注释并删除export关键字
25. // @Entry
26. @Component
27. export struct SwiperAndTabsLinkage {
28. @State fontColor: string = '#182431';
29. @State selectedFontColor: string = '#007DFF';
30. @State currentIndex: number = 0;
31. private list: number[] = [];
32. private tabsController: TabsController = new TabsController();
33. private swiperController: SwiperController = new SwiperController();
34. private swiperData: MyDataSource = new MyDataSource([]);
35. private context = this.getUIContext().getHostContext() as common.UIAbilityContext;

37. aboutToAppear(): void {
38. for (let i = 0; i <= 9; i++) {
39. this.list.push(i);
40. }
41. this.swiperData = new MyDataSource(this.list);
42. }

44. @Builder tabBuilder(index: number, name: string) {
45. Column() {
46. Text(name)
47. .fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor)
48. .fontSize(16)
49. .fontWeight(this.currentIndex === index ? 500 : 400)
50. .lineHeight(22)
51. .margin({ top: 17, bottom: 7 })
52. Divider()
53. .strokeWidth(2)
54. .color('#007DFF')
55. .opacity(this.currentIndex === index ? 1 : 0)
56. }.width('20%')
57. }

59. build() {
60. // ...
61. Column() {
62. Tabs({ barPosition: BarPosition.Start, controller: this.tabsController }) {
63. ForEach(this.list, (index: number) =>{
64. // 请在resources\base\element\string.json文件中配置name为'swiper_text1' ，value为非空字符串的资源
65. TabContent().tabBar(this.tabBuilder(index,
66. this.context.resourceManager.getStringByNameSync('swiper_text1') + this.list[index]))
67. })
68. }
69. .onTabBarClick((index: number) => {
70. this.currentIndex = index;
71. this.swiperController.changeIndex(index, true);
72. })
73. .barMode(BarMode.Scrollable)
74. .backgroundColor('#F1F3F5')
75. .height(56)
76. .width('100%')

78. Swiper(this.swiperController) {
79. LazyForEach(this.swiperData, (item: string) => {
80. Text(item.toString())
81. .onAppear(()=>{
82. console.info('onAppear ' + item.toString());
83. })
84. .onDisAppear(()=>{
85. console.info('onDisAppear ' + item.toString());
86. })
87. .width('100%')
88. .height('40%')
89. .backgroundColor(0xAFEEEE)
90. .textAlign(TextAlign.Center)
91. .fontSize(30)
92. }, (item: string) => item)
93. }
94. .loop(false)
95. .onSelected((index: number) => {
96. console.info('onSelected:' + index);
97. this.currentIndex = index;
98. this.tabsController.changeIndex(index);
99. })
100. }
101. // ...
102. }
103. }
```

[SwiperAndTabsLinkage.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperAndTabsLinkage.ets#L18-L132)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f5/v3/UyU6ZAihR2SR_oluPCATUA/zh-cn_image_0000002540611508.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034639Z&HW-CC-Expire=86400&HW-CC-Sign=8929223179940164AACF9DE79DB13A9721C9E87024D02909E54A8746F49B7895)

## 设置圆点导航点间距

从API version 19开始，针对圆点导航点，可以通过DotIndicator的[space](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper#space19)属性来设置圆点导航点的间距。

收起

自动换行

深色代码主题

复制

```
1. Swiper(
2. // ···
3. ) {
4. // ···
5. }
6. .indicator(new DotIndicator()
7. .space(this.space)
8. // ···
9. )
```

[SwiperIgnoreComponentSize.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperIgnoreComponentSize.ets#L77-L116)

## 导航点忽略组件大小

当导航点的[bottom](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper#bottom)设为0之后，导航点的底部与Swiper的底部还会有一定间距。如果希望消除该间距，从API version 19开始，可通过调用[bottom](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper#bottom19)(bottom, ignoreSize)属性来进行设置。将ignoreSize设置为true，即可忽略导航点组件大小，达到消除该间距的目的。

* 圆点导航点忽略组件大小。

收起

自动换行

深色代码主题

复制

```
1. Swiper(
2. // ···
3. ) {
4. // ···
5. }
6. .indicator(new DotIndicator()
7. // ···
8. .bottom(LengthMetrics.vp(0), this.ignoreSize) // true
9. // ···
10. )
```

[SwiperIgnoreComponentSize.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperIgnoreComponentSize.ets#L78-L115)

* 数字导航点忽略组件大小。

收起

自动换行

深色代码主题

复制

```
1. Swiper(
2. // ···
3. ) {
4. // ···
5. }
6. .indicator(new DigitIndicator()
7. .bottom(LengthMetrics.vp(0), true)
8. )
```

[SwiperDigitIndicatorIgnoreComponentSize.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperDigitIndicatorIgnoreComponentSize.ets#L61-L82)

圆点导航点设置间距及忽略组件大小完整示例代码如下：

收起

自动换行

深色代码主题

复制

```
1. import { LengthMetrics } from '@kit.ArkUI';
2. // ...


5. class MyDataSource implements IDataSource {
6. private list: number[] = [];

8. constructor(list: number[]) {
9. this.list = list;
10. }

12. totalCount(): number {
13. return this.list.length;
14. }

16. getData(index: number): number {
17. return this.list[index];
18. }

20. registerDataChangeListener(listener: DataChangeListener): void {
21. }

23. unregisterDataChangeListener() {
24. }
25. }

27. // 如需作为页面入口，请取消@Entry的注释并删除export关键字
28. // @Entry
29. @Component
30. export struct SwiperIgnoreComponentSize {

32. @State space: LengthMetrics = LengthMetrics.vp(0);
33. @State spacePool: LengthMetrics[] = [LengthMetrics.vp(0), LengthMetrics.px(3), LengthMetrics.vp(10)];
34. @State spaceIndex: number = 0;

36. @State ignoreSize: boolean = false;
37. @State ignoreSizePool: boolean[] = [false, true];
38. @State ignoreSizeIndex: number = 0;

40. private swiperController1: SwiperController = new SwiperController();
41. private data1: MyDataSource = new MyDataSource([]);

43. aboutToAppear(): void {
44. let list1: number[] = [];
45. for (let i = 1; i <= 10; i++) {
46. list1.push(i);
47. }
48. this.data1 = new MyDataSource(list1);
49. }

51. build() {
52. // ...
53. Scroll() {
54. Column({ space: 20 }) {
55. Swiper(
56. this.swiperController1
57. ) {
58. LazyForEach(this.data1, (item: string) => {
59. Text(item.toString())
60. .width('90%')
61. .height(120)
62. .backgroundColor(0xAFEEEE)
63. .textAlign(TextAlign.Center)
64. .fontSize(30)
65. }, (item: string) => item)
66. }
67. .indicator(new DotIndicator()
68. .space(this.space)
69. .bottom(LengthMetrics.vp(0), this.ignoreSize) // true
70. .itemWidth(15)
71. .itemHeight(15)
72. .selectedItemWidth(15)
73. .selectedItemHeight(15)
74. .color(Color.Gray)
75. .selectedColor(Color.Blue)
76. )
77. .displayArrow({
78. showBackground: true,
79. isSidebarMiddle: true,
80. backgroundSize: 24,
81. backgroundColor: Color.White,
82. arrowSize: 18,
83. arrowColor: Color.Blue
84. }, false)

86. Column({ space: 4 }) {
87. Button('spaceIndex:' + this.spaceIndex).onClick(() => {
88. this.spaceIndex = (this.spaceIndex + 1) % this.spacePool.length;
89. this.space = this.spacePool[this.spaceIndex];
90. }).margin(10)

92. Button('ignoreSizeIndex:' + this.ignoreSizeIndex).onClick(() => {
93. this.ignoreSizeIndex = (this.ignoreSizeIndex + 1) % this.ignoreSizePool.length;
94. this.ignoreSize = this.ignoreSizePool[this.ignoreSizeIndex];
95. }).margin(10)
96. }.margin(2)
97. }.width('100%')
98. }
99. // ...
100. }
101. }
```

[SwiperIgnoreComponentSize.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperIgnoreComponentSize.ets#L16-L151)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4f/v3/P_lMJ6iGS-K9vFFalAs0QA/zh-cn_image_0000002571171503.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034639Z&HW-CC-Expire=86400&HW-CC-Sign=89F5AD5FA92CAECF6BD914D7A6EA86575F088167636D51E36135AF18D9672D0D)

## 保持可见内容位置不变

从API version 20开始，Swiper通过设置[maintainVisibleContentPosition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper#maintainvisiblecontentposition20)属性，可在使用LazyForEach懒加载数据时（如通过onDataAdd新增数据），保持当前可见内容位置不变，避免因数据增删导致的视图跳动。该属性默认值为false。

maintainVisibleContentPosition为true时，显示区域上方或前方插入或删除数据时可见内容位置不变。

关于数据[LazyForEach：数据懒加载](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-lazyforeach)的具体使用，可参考数据懒加载章节中的示例。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. class MyDataSource implements IDataSource {
3. private listeners: DataChangeListener[] = [];
4. private dataArray: string[] = ['0', '1', '2', '3', '4', '5', '6'];

6. public totalCount(): number {
7. return this.dataArray.length;
8. }

10. public getData(index: number): string | undefined {
11. return this.dataArray[index];
12. }

14. public addData(index: number, data: string): void {
15. this.dataArray.splice(index, 0, data);
16. this.listeners.forEach(listener => {
17. listener.onDataAdd(index);
18. })
19. }

21. public deleteData(index: number): void {
22. this.dataArray.splice(index, 1);
23. this.listeners.forEach(listener => {
24. listener.onDataDelete(index);
25. })
26. }

28. registerDataChangeListener(listener: DataChangeListener): void {
29. if (this.listeners.indexOf(listener) < 0) {
30. hilog.info(DOMAIN, 'testTag', 'add listener');
31. this.listeners.push(listener);
32. }
33. }

35. unregisterDataChangeListener(listener: DataChangeListener): void {
36. const pos = this.listeners.indexOf(listener);
37. if (pos >= 0) {
38. hilog.info(DOMAIN, 'testTag', 'remove listener');
39. this.listeners.splice(pos, 1);
40. }
41. }
42. }

44. // 如需作为页面入口，请取消@Entry的注释并删除export关键字
45. // @Entry
46. @Component
47. export struct SwiperVisibleContentPosition {
48. private data: MyDataSource = new MyDataSource();
49. @State index: number = 3;

51. build() {
52. // ...
53. Column({ space: 12 }) {
54. // ...
55. Swiper() {
56. LazyForEach(this.data, (item: string) => {
57. Text(item.toString())
58. .width('90%')
59. .height(160)
60. .backgroundColor(0xAFEEEE)
61. .textAlign(TextAlign.Center)
62. .fontSize(30)
63. })
64. }
65. .onChange((index) => {
66. this.index = index;
67. })
68. .index(3)
69. .maintainVisibleContentPosition(true)
70. // ...

72. Column({ space: 12 }) {
73. Text('index:' + this.index).fontSize(20)
74. Row() {
75. // 在LazyForEach索引为0的位置添加数据
76. Button('header data add').height(30).onClick(() => {
77. this.data.addData(0, 'header Data');
78. })
79. // 删除LazyForEach索引为0的位置数据
80. Button('header data delete').height(30).onClick(() => {
81. this.data.deleteData(0);
82. })
83. }
84. }.margin(5)
85. // ...
86. }.width('100%')
87. .margin({ top: 5 })
88. // ...
89. }
90. }
```

[SwiperVisibleContentPosition.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ScrollableComponent/entry/src/main/ets/pages/swiper/SwiperVisibleContentPosition.ets#L21-L135)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/db/v3/xzodcdaERqG5Ow_A8koJgA/zh-cn_image_0000002540771160.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034639Z&HW-CC-Expire=86400&HW-CC-Sign=6A9E9F655A1064365606A10F71CAA2EDF1A44599440FFF171C7B8601A0D8DFB3)

## 示例代码

* [短视频切换](https://gitcode.com/HarmonyOS_Samples/short-video)