当@ComponentV2装饰的自定义组件处于非激活状态时，状态变量将不响应更新，即[@Monitor](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-monitor)不会调用，状态变量关联的节点不会刷新。该冻结机制在复杂UI场景下能显著优化性能，避免非激活组件因状态变量更新进行无效刷新，从而减少资源消耗。通过freezeWhenInactive属性来决定是否使用冻结功能，不传参数时默认不使用。支持的场景有：[页面路由](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-router)、[TabContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-tabcontent)、[Navigation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation)、[Repeat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-rendering-control-repeat)。

在阅读本文档前，开发者需要了解@ComponentV2基本语法。建议提前阅读：[@ComponentV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-create-custom-components#componentv2)。

说明

从API version 12开始，支持@ComponentV2装饰的自定义组件冻结功能。

从API version 18开始，支持自定义组件冻结混用场景。

从API version 22开始，通过将[BuilderNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-buildernode)的[inheritFreezeOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-buildernode#inheritfreezeoptions20)配置为true，可实现如下场景：当父组件启用组件冻结，且组件树的中间层级启用了BuilderNode时，BuilderNode的子组件能够被冻结。具体可参考[设置BuilderNode继承冻结能力](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-arktsnode-buildernode#设置buildernode继承冻结能力)。

与@Component的组件冻结不同，@ComponentV2装饰的自定义组件不支持在[LazyForEach](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-lazyforeach)场景下缓存节点组件冻结。

## 当前支持的场景

### 页面路由

说明

本示例使用了router进行页面跳转，建议开发者使用组件导航(Navigation)代替页面路由(router)来实现页面切换。Navigation提供了更多的功能和更灵活的自定义能力。请参考[使用Navigation的组件冻结用例](/consumer/cn/doc/harmonyos-guides/arkts-custom-components-freezev2#navigation)。

当页面1调用this.getUIContext().getRouter().pushUrl()接口跳转到页面2时，页面1为隐藏不可见状态，此时如果更新页面1中的状态变量，不会触发页面1刷新。

图示如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/23/v3/h777RuE6TGORApxtP-Kn8w/zh-cn_image_0000002571171205.png?HW-CC-KV=V1&HW-CC-Date=20260414T034227Z&HW-CC-Expire=86400&HW-CC-Sign=0D6E9BF926DC1A20FDF9006183E60BD273334725A1260D9D857D53DD79D0D55B)

页面1：

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const DOMAIN = 0x0000;

5. @ObservedV2
6. export class Book {
7. @Trace public name: string = '100';

9. constructor(page: string) {
10. this.name = page;
11. }
12. }

14. @Entry
15. @ComponentV2({ freezeWhenInactive: true })
16. export struct Page1 {
17. @Local bookTest: Book = new Book(`A Midsummer Night's Dream`);

19. @Monitor('bookTest.name')
20. onMessageChange(monitor: IMonitor) {
21. hilog.info(DOMAIN, 'testTag', `The book name change from ${monitor.value()?.before} to ${monitor.value()?.now}`);
22. }

24. build() {
25. Column() {
26. Text(`Book name is  ${this.bookTest.name}`).fontSize(25)
27. Button('changeBookName').fontSize(25)
28. .onClick(() => {
29. this.bookTest.name = 'The Old Man and the Sea';
30. })
31. Button('go to next page').fontSize(25)
32. .onClick(() => {
33. this.getUIContext().getRouter().pushUrl({ url: 'pages/freeze/template1/Page2' });
34. setTimeout(() => {
35. this.bookTest = new Book(`Jane Austen's Pride and Prejudice`);
36. }, 1000)
37. })
38. }
39. }
40. }
```

[Page1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/FreezeV2/entry/src/main/ets/pages/freeze/template1/Page1.ets#L15-L57)

页面2：

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @ComponentV2
3. struct Page2 {
4. build() {
5. Column() {
6. Text('This is the page2').fontSize(25)
7. Button('Back')
8. .onClick(() => {
9. this.getUIContext().getRouter().back();
10. })
11. }
12. }
13. }
```

[Page2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/FreezeV2/entry/src/main/ets/pages/freeze/template1/Page2.ets#L15-L29)

在上面的示例中：

1.在页面1中点击changeBookName，bookTest变量的name属性改变，@Monitor中注册的方法onMessageChange会被调用。

2.在页面1中点击go to next page，跳转到页面2，然后延迟1s更新状态变量bookTest。在更新bookTest的时候，已经跳转到页面2，页面1处于inactive状态，[@Local](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-local)装饰的状态变量bookTest将不响应更新，其@Monitor不会调用，关联的节点不会刷新。

Trace如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/19/v3/vvYR3cV1Toa0SioP99m-sg/zh-cn_image_0000002540611220.png?HW-CC-KV=V1&HW-CC-Date=20260414T034227Z&HW-CC-Expire=86400&HW-CC-Sign=75379C9D78951D2F7AFE9A45E0382983191D520E2809BC82698D35B4AA112F81)

3.点击Back，页面2被销毁，页面1的状态由inactive变为active。状态变量bookTest的更新被观察到，@Monitor中注册的方法onMessageChange被调用，对应的Text显示内容改变。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/12/v3/BWGMEUnQQw2Z2flpRia92A/zh-cn_image_0000002571171215.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034227Z&HW-CC-Expire=86400&HW-CC-Sign=BF7676FA28A20946E162C6ACFE5775AF0A2C198F72755F30036DC7C989542518)

### TabContent

对Tabs中当前不可见的TabContent进行冻结，修改状态变量不会触发冻结组件的更新。

需要注意的是：在首次渲染时，Tabs只会创建当前正在显示的TabContent，当切换全部的TabContent后，TabContent才会被全部创建。

图示如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8d/v3/pSq31HH7R-ew2psZdRB8uA/zh-cn_image_0000002540770862.png?HW-CC-KV=V1&HW-CC-Date=20260414T034227Z&HW-CC-Expire=86400&HW-CC-Sign=BA27ECF721E409578FE7478EA4E8BD242F62CF582121D7DC6429EA3CF96F2DEC)

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const DOMAIN = 0x0000;

5. @Entry
6. @ComponentV2
7. struct TabContentTest {
8. @Local message: number = 0;
9. @Local data: number[] = [0, 1];

11. build() {
12. Row() {
13. Column() {
14. Button('change message').onClick(() => {
15. this.message++;
16. })

18. Tabs() {
19. ForEach(this.data, (item: number) => {
20. TabContent() {
21. FreezeChild({ message: this.message, index: item })
22. }.tabBar(`tab${item}`)
23. }, (item: number) => item.toString())
24. }
25. }
26. .width('100%')
27. }
28. .height('100%')
29. }
30. }

32. @ComponentV2({ freezeWhenInactive: true })
33. struct FreezeChild {
34. @Param message: number = 0;
35. @Param index: number = 0;

37. @Monitor('message')
38. onMessageUpdated(mon: IMonitor) {
39. hilog.info(DOMAIN, 'testTag', `FreezeChild message callback func ${this.message}, index: ${this.index}`);
40. }

42. build() {
43. Text('message' + `${this.message}, index: ${this.index}`)
44. .fontSize(50)
45. .fontWeight(FontWeight.Bold)
46. }
47. }
```

[TabContentTest.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/FreezeV2/entry/src/main/ets/pages/freeze/template2/TabContentTest.ets#L15-L62)

在上面的示例中：

1.点击change message更改message的值，当前正在显示的TabContent组件中@Monitor注册的方法onMessageUpdated被触发。

2.点击tab1切换到另外的TabContent，该TabContent的状态由inactive变为active，对应的@Monitor注册的方法onMessageUpdated被触发。

3.再次点击change message更改message的值，仅当前显示的TabContent子组件中@Monitor注册的方法onMessageUpdated被触发。其他inactive的TabContent组件不会触发@Monitor。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c1/v3/YWyu8pV4RLOfsxP10nSRtQ/zh-cn_image_0000002571291157.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034227Z&HW-CC-Expire=86400&HW-CC-Sign=CDC4C6D215654146488FBE4FBAB9CF1D94352CD81A7B2CC691CCED6765D62A12)

### Navigation

当NavDestination不可见时，会将其子自定义组件设置成非激活态，修改状态变量不会触发冻结组件的刷新。当返回该页面时，其子自定义组件重新恢复成激活态，触发@Monitor回调进行刷新。

需要注意：本文档里说的“激活（active）/非激活（inactive）”是指组件冻结的激活/非激活状态，和[NavDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination)组件中的[onActive](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination#onactive17)和[onInactive](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination#oninactive17)不同。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const DOMAIN = 0x0000;

5. @Entry
6. @ComponentV2
7. struct MyNavigationTestStack {
8. @Provider('pageInfo') pageInfo: NavPathStack = new NavPathStack();
9. @Local message: number = 0;

11. @Monitor('message')
12. info() {
13. hilog.info(DOMAIN, 'testTag', `freeze-test MyNavigation message callback ${this.message}`);
14. }

16. @Builder
17. PageMap(name: string) {
18. if (name === 'pageOne') {
19. PageOneStack({ message: this.message })
20. } else if (name === 'pageTwo') {
21. PageTwoStack({ message: this.message })
22. } else if (name === 'pageThree') {
23. PageThreeStack({ message: this.message })
24. }
25. }

27. build() {
28. Column() {
29. Button('change message')
30. .onClick(() => {
31. this.message++;
32. })
33. Navigation(this.pageInfo) {
34. Column() {
35. Button('Next Page', { stateEffect: true, type: ButtonType.Capsule })
36. .onClick(() => {
37. this.pageInfo.pushPath({ name: 'pageOne' }); // 将name指定的NavDestination页面信息入栈
38. })
39. }
40. }.title('NavIndex')
41. .navDestination(this.PageMap)
42. .mode(NavigationMode.Stack)
43. }
44. }
45. }

47. @ComponentV2
48. struct PageOneStack {
49. @Consumer('pageInfo') pageInfo: NavPathStack = new NavPathStack();
50. @Local index: number = 1;
51. @Param message: number = 0;

53. build() {
54. NavDestination() {
55. Column() {
56. NavigationContentMsgStack({ message: this.message, index: this.index })
57. Text('cur stack size:' + `${this.pageInfo.size()}`)
58. .fontSize(30)
59. Button('Next Page', { stateEffect: true, type: ButtonType.Capsule })
60. .onClick(() => {
61. this.pageInfo.pushPathByName('pageTwo', null);
62. })
63. Button('Back Page', { stateEffect: true, type: ButtonType.Capsule })
64. .onClick(() => {
65. this.pageInfo.pop();
66. })
67. }.width('100%').height('100%')
68. }.title('pageOne')
69. .onBackPressed(() => {
70. this.pageInfo.pop();
71. return true;
72. })
73. }
74. }

76. @ComponentV2
77. struct PageTwoStack {
78. @Consumer('pageInfo') pageInfo: NavPathStack = new NavPathStack();
79. @Local index: number = 2;
80. @Param message: number = 0;

82. build() {
83. NavDestination() {
84. Column() {
85. NavigationContentMsgStack({ message: this.message, index: this.index })
86. Text('cur stack size:' + `${this.pageInfo.size()}`)
87. .fontSize(30)
88. Button('Next Page', { stateEffect: true, type: ButtonType.Capsule })
89. .onClick(() => {
90. this.pageInfo.pushPathByName('pageThree', null);
91. })
92. Button('Back Page', { stateEffect: true, type: ButtonType.Capsule })
93. .onClick(() => {
94. this.pageInfo.pop();
95. })
96. }
97. }.title('pageTwo')
98. .onBackPressed(() => {
99. this.pageInfo.pop();
100. return true;
101. })
102. }
103. }

105. @ComponentV2
106. struct PageThreeStack {
107. @Consumer('pageInfo') pageInfo: NavPathStack = new NavPathStack();
108. @Local index: number = 3;
109. @Param message: number = 0;

111. build() {
112. NavDestination() {
113. Column() {
114. NavigationContentMsgStack({ message: this.message, index: this.index })
115. Text('cur stack size:' + `${this.pageInfo.size()}`)
116. .fontSize(30)
117. Button('Next Page', { stateEffect: true, type: ButtonType.Capsule })
118. .height(40)
119. .onClick(() => {
120. this.pageInfo.pushPathByName('pageOne', null);
121. })
122. Button('Back Page', { stateEffect: true, type: ButtonType.Capsule })
123. .height(40)
124. .onClick(() => {
125. this.pageInfo.pop();
126. })
127. }
128. }.title('pageThree')
129. .onBackPressed(() => {
130. this.pageInfo.pop();
131. return true;
132. })
133. }
134. }

136. @ComponentV2({ freezeWhenInactive: true })
137. struct NavigationContentMsgStack {
138. @Param message: number = 0;
139. @Param index: number = 0;

141. @Monitor('message')
142. info() {
143. hilog.info(DOMAIN, 'testTag', `freeze-test NavigationContent message callback ${this.message}`);
144. hilog.info(DOMAIN, 'testTag', `freeze-test ---- called by content ${this.index}`);
145. }

147. build() {
148. Column() {
149. Text('msg:' + `${this.message}`)
150. .fontSize(30)
151. }
152. }
153. }
```

[MyNavigationTestStack.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/FreezeV2/entry/src/main/ets/pages/freeze/template3/MyNavigationTestStack.ets#L15-L170)

在上面的示例中：

1.点击change message更改message的值，当前正在显示的MyNavigationTestStack组件中@Monitor注册的方法info被触发。

2.点击Next Page切换到PageOne，创建PageOneStack节点。

3.再次点击change message更改message的值，仅PageOneStack中的NavigationContentMsgStack子组件中@Monitor注册的方法info被触发。

4.再次点击Next Page切换到PageTwo，创建PageTwoStack节点。PageOneStack节点状态由active变为inactive。

5.再次点击change message更改message的值，仅PageTwoStack中的NavigationContentMsgStack子组件中@Monitor注册的方法info被触发。Navigation路由栈中非栈顶的NavDestination中的子自定义组件是inactive状态，@Monitor方法不会触发。

6.再次点击Next Page切换到PageThree，创建PageThreeStack节点。PageTwoStack节点状态由active变为inactive。

7.再次点击change message更改message的值，仅PageThreeStack中的NavigationContentMsgStack子组件中@Monitor注册的方法info被触发。Navigation路由栈中非栈顶的NavDestination中的子自定义组件是inactive状态，@Monitor方法不会触发。

8.点击Back Page回到PageTwo，此时，PageTwoStack节点状态由inactive变为active，其NavigationContentMsgStack子组件中@Monitor注册的方法info被触发。

9.再次点击Back Page回到PageOne，此时，PageOneStack节点状态由inactive变为active，其NavigationContentMsgStack子组件中@Monitor注册的方法info被触发。

10.再次点击Back Page回到初始页，此时，无任何触发。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/de/v3/1JKJUDetQomMidXIZ_wp7w/zh-cn_image_0000002571171207.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034227Z&HW-CC-Expire=86400&HW-CC-Sign=90A54DBCBB2FF76F8F02CCDA2BAED1A3706885FBB033E280B9A21541D5032F42)

### Repeat

说明

Repeat从API version 18开始支持自定义组件冻结。

对Repeat缓存池中的自定义组件进行冻结，避免不必要的组件刷新。建议提前阅读[Repeat节点更新/复用能力说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-rendering-control-repeat#节点更新复用能力说明)。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const DOMAIN = 0x0000;

5. @Entry
6. @ComponentV2
7. struct RepeatVirtualScrollFreeze {
8. @Local simpleList: Array<string> = [];
9. @Local bgColor: Color = Color.Pink;

11. aboutToAppear(): void {
12. for (let i = 0; i < 7; i++) {
13. this.simpleList.push(`item${i}`);
14. }
15. }

17. build() {
18. Column() {
19. Row() {
20. Button('Reduce length to 5')
21. .onClick(() => {
22. this.simpleList = this.simpleList.slice(0, 5);
23. })
24. Button('Change bgColor')
25. .onClick(() => {
26. this.bgColor = this.bgColor == Color.Pink ? Color.Blue : Color.Pink;
27. })
28. }

30. List() {
31. Repeat(this.simpleList)
32. .each((obj: RepeatItem<string>) => {
33. })
34. .key((item: string, index: number) => item)
35. .virtualScroll({ totalCount: this.simpleList.length })
36. .templateId(() => 'a')
37. .template('a', (ri) => {
38. ChildComponent({
39. message: ri.item,
40. bgColor: this.bgColor
41. })
42. }, { cachedCount: 2 })
43. }
44. .cachedCount(0)
45. .height(500)
46. }
47. .height('100%')
48. }
49. }

51. // 开启组件冻结
52. @ComponentV2({ freezeWhenInactive: true })
53. struct ChildComponent {
54. @Param @Require message: string = '';
55. @Param @Require bgColor: Color = Color.Pink;

57. @Monitor('bgColor')
58. onBgColorChange(monitor: IMonitor) {
59. // bgColor改变时，缓存池中组件不刷新，不会打印日志
60. hilog.info(DOMAIN, 'testTag', `repeat---bgColor change from ${monitor.value()?.before} to ${monitor.value()?.now}`);
61. }

63. build() {
64. Text(`[a]: ${this.message}`)
65. .fontSize(50)
66. .backgroundColor(this.bgColor)
67. }
68. }
```

[RepeatVirtualScrollFreeze.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/FreezeV2/entry/src/main/ets/pages/freeze/template4/RepeatVirtualScrollFreeze.ets#L15-L83)

在上面的示例中：

点击Reduce length to 5后，被移除的两个组件会进入Repeat缓存池，然后点击Change bgColor更改bgColor的值触发节点刷新。

开启组件冻结（freezeWhenInactive: true），只有剩余节点中@Monitor装饰的方法onBgColorChange被触发，如示例中屏上的5个节点会刷新并打印5条日志，缓存池中的节点则不会。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7d/v3/3q6n0qPJREeagf2vsM_tvA/zh-cn_image_0000002540770872.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034227Z&HW-CC-Expire=86400&HW-CC-Sign=6857FB76B5C31C9E7C3DB316AA40E007FF2DD2BFA804644A2DAF83E6161FBCC3)

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const DOMAIN = 0x0000;
4. // ...
5. // 关闭组件冻结
6. @ComponentV2({ freezeWhenInactive: false })
7. struct ChildComponent1 {
8. @Param @Require message: string = '';
9. @Param @Require bgColor: Color = Color.Pink;

11. @Monitor('bgColor')
12. onBgColorChange(monitor: IMonitor) {
13. // bgColor改变时，缓存池组件也会刷新，并打印日志
14. hilog.info(DOMAIN, 'testTag', `repeat---bgColor change from ${monitor.value()?.before} to ${monitor.value()?.now}`);
15. }

17. build() {
18. Text(`[a]: ${this.message}`)
19. .fontSize(50)
20. .backgroundColor(this.bgColor)
21. }
22. }
```

[PageB.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/FreezeV2/entry/src/main/ets/pages/freeze/template4/PageB.ets#L15-L83)

不开启组件冻结（freezeWhenInactive: false，当未指定freezeWhenInactive参数时默认不开启组件冻结），剩余节点和缓存池节点中@Monitor装饰的方法onBgColorChange都会被触发，即会有7个节点会刷新并打印7条日志。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3e/v3/DTAwFe2tSVqnizxkSJAthQ/zh-cn_image_0000002571291167.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034227Z&HW-CC-Expire=86400&HW-CC-Sign=C339FCA8C1857B94DA0ABD9EAE3C812D436A0576EC3598F76E15E8E80FAB9E22)

### 仅子组件开启组件冻结

如果开发者只想冻结某个子组件，可以选择只在子组件设置freezeWhenInactive为true。

收起

自动换行

深色代码主题

复制

```
1. // src/main/ets/pages/freeze/template5/PageA.ets
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. const DOMAIN = 0x0000;

6. @ObservedV2
7. class Book {
8. @Trace public name: string = 'TS';

10. constructor(name: string) {
11. this.name = name;
12. }
13. }

15. @Entry
16. @ComponentV2
17. struct PageA {
18. pageInfo: NavPathStack = new NavPathStack();

20. build() {
21. Column() {
22. Navigation(this.pageInfo) {
23. Child()

25. Button('Go to next page').fontSize(30)
26. .onClick(() => {
27. this.pageInfo.pushPathByName('PageB', null);
28. })
29. }
30. }
31. }
32. }

34. @ComponentV2({ freezeWhenInactive: true })
35. export struct Child {
36. @Local bookTest: Book = new Book(`A Midsummer Night's Dream`);

38. @Monitor('bookTest.name')
39. onMessageChange(monitor: IMonitor) {
40. hilog.info(DOMAIN, 'testTag', `The book name change from ${monitor.value()?.before} to ${monitor.value()?.now}`);
41. }

43. textUpdate(): number {
44. hilog.info(DOMAIN, 'testTag', 'The text is update');
45. return 25;
46. }

48. build() {
49. Column() {
50. Text(`The book name is ${this.bookTest.name}`).fontSize(this.textUpdate())

52. Button('change BookName')
53. .onClick(() => {
54. setTimeout(() => {
55. this.bookTest = new Book(`Jane Austen's Pride and Prejudice`);
56. }, 3000);
57. })
58. }
59. }
60. }
```

[PageA.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/FreezeV2/entry/src/main/ets/pages/freeze/template5/PageA.ets#L15-L76)

收起

自动换行

深色代码主题

复制

```
1. // src/main/ets/pages/freeze/template5/PageB.ets
2. @Builder
3. function pageBBuilder() {
4. PageB()
5. }

7. @ComponentV2
8. struct PageB {
9. pathStack: NavPathStack = new NavPathStack();

11. build() {
12. NavDestination() {
13. Column() {
14. Text('This is the PageB')

16. Button('Back').fontSize(30)
17. .onClick(() => {
18. this.pathStack.pop();
19. })
20. }
21. }.onReady((context: NavDestinationContext) => {
22. this.pathStack = context.pathStack;
23. })
24. }
25. }
```

[PageB.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/FreezeV2/entry/src/main/ets/pages/freeze/template5/PageB.ets#L16-L42)

使用Navigation时，需要添加配置系统路由表文件src/main/resources/base/profile/route\_map.json，并替换pageSourceFile为PageB页面的路径，并且在module.json5中添加："routerMap": "$profile:route\_map"。

收起

自动换行

深色代码主题

复制

```
1. {
2. "routerMap": [
3. {
4. "name": "PageB",
5. "pageSourceFile": "src/main/ets/pages/freeze/template5/PageB.ets",
6. "buildFunction": "pageBBuilder",
7. "data": {
8. "description" : "This is the PageB"
9. }
10. }
11. ]
12. }
```

在上面的示例中：

* PageA的子组件Child，设置freezeWhenInactive: true, 开启了组件冻结功能。
* 点击change BookName，然后3s内点击Go to next page。在更新bookTest的时候，已经跳转到PageB，PageA的组件处于inactive状态，又因为Child组件开启了组件冻结，状态变量@Local bookTest将不响应更新，其@Monitor装饰的回调方法不会被调用，状态变量关联的组件不会刷新。
* 点击Back回到前一个页面，调用@Monitor装饰的回调方法，状态变量关联的组件刷新。

### 混用场景

当支持组件冻结的场景彼此之间组合使用时，对于不同的API版本，冻结行为会有不同。给父组件设置组件冻结标志，在API version 17及以下，当父组件解冻时，会解冻其子组件所有的节点；从API version 18开始，父组件解冻时，只会解冻子组件的屏上节点，详细说明见[@Component的自定义组件冻结的混用场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-custom-components-freeze#组件混用)。

**Navigation和TabContent的混用**

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const DOMAIN = 0x0000;

5. @ComponentV2
6. struct ChildOfParamComponent {
7. @Require @Param childVal: number;

9. @Monitor('childVal')
10. onChange(m: IMonitor) {
11. hilog.info(DOMAIN, 'testTag',
12. `Appmonitor ChildOfParamComponent: changed ${m.dirty[0]}: ${m.value()?.before} -> ${m.value()?.now}`);
13. }

15. build() {
16. Column() {
17. Text(`Child Param： ${this.childVal}`)
18. }
19. }
20. }

22. @ComponentV2
23. struct ParamComponent {
24. @Require @Param val: number;

26. @Monitor('val')
27. onChange(m: IMonitor) {
28. hilog.info(DOMAIN, 'testTag',
29. `Appmonitor ParamComponent: changed ${m.dirty[0]}: ${m.value()?.before} -> ${m.value()?.now}`);
30. }

32. build() {
33. Column() {
34. Text(`val： ${this.val}`)
35. ChildOfParamComponent({ childVal: this.val })
36. }
37. }
38. }

40. @ComponentV2
41. struct DelayComponent {
42. @Require @Param delayVal1: number;

44. @Monitor('delayVal1')
45. onChange(m: IMonitor) {
46. hilog.info(DOMAIN, 'testTag',
47. `Appmonitor DelayComponent: changed ${m.dirty[0]}: ${m.value()?.before} -> ${m.value()?.now}`);
48. }

50. build() {
51. Column() {
52. Text(`Delay Param： ${this.delayVal1}`)
53. }
54. }
55. }

57. @ComponentV2({ freezeWhenInactive: true })
58. struct TabsComponent {
59. private controller: TabsController = new TabsController();
60. @Local tabState: number = 47;

62. @Monitor('tabState')
63. onChange(m: IMonitor) {
64. hilog.info(DOMAIN, 'testTag',
65. `Appmonitor TabsComponent: changed ${m.dirty[0]}: ${m.value()?.before} -> ${m.value()?.now}`);
66. }

68. build() {
69. Column({ space: 10 }) {
70. Button(`Incr state ${this.tabState}`)
71. .fontSize(25)
72. .onClick(() => {
73. hilog.info(DOMAIN, 'testTag', 'Button increment state value');
74. this.tabState = this.tabState + 1;
75. })
76. Tabs({ barPosition: BarPosition.Start, index: 0, controller: this.controller }) {
77. TabContent() {
78. ParamComponent({ val: this.tabState })
79. }.tabBar('Update')
80. TabContent() {
81. DelayComponent({ delayVal1: this.tabState })
82. }.tabBar('DelayUpdate')
83. }
84. .vertical(false)
85. .scrollable(true)
86. .barMode(BarMode.Fixed)
87. .barWidth(400)
88. .barHeight(150)
89. .animationDuration(400)
90. .width('100%')
91. .height(200)
92. .backgroundColor(0xF5F5F5)
93. }
94. }
95. }

97. @Entry
98. @Component
99. struct MyNavigationTestStack1 {
100. @Provide('pageInfo') pageInfo: NavPathStack = new NavPathStack();

102. @Builder
103. PageMap(name: string) {
104. if (name === 'pageOne') {
105. PageOneStack1()
106. } else if (name === 'pageTwo') {
107. PageTwoStack2()
108. }
109. }

111. build() {
112. Column() {
113. Navigation(this.pageInfo) {
114. Column() {
115. Button('Next Page', { stateEffect: true, type: ButtonType.Capsule })
116. .width('80%')
117. .height(40)
118. .margin(20)
119. .onClick(() => {
120. this.pageInfo.pushPath({ name: 'pageOne' }); // 将name指定的NavDestination页面信息入栈
121. })
122. }
123. }.title('NavIndex')
124. .navDestination(this.PageMap)
125. .mode(NavigationMode.Stack)
126. }
127. }
128. }

130. @Component
131. struct PageOneStack1 {
132. @Consume('pageInfo') pageInfo: NavPathStack;

134. build() {
135. NavDestination() {
136. Column() {
137. TabsComponent()

139. Button('Next Page', { stateEffect: true, type: ButtonType.Capsule })
140. .width('80%')
141. .height(40)
142. .margin(20)
143. .onClick(() => {
144. this.pageInfo.pushPathByName('pageTwo', null);
145. })
146. }.width('100%').height('100%')
147. }.title('pageOne')
148. .onBackPressed(() => {
149. this.pageInfo.pop();
150. return true;
151. })
152. }
153. }

155. @Component
156. struct PageTwoStack2 {
157. @Consume('pageInfo') pageInfo: NavPathStack;

159. build() {
160. NavDestination() {
161. Column() {
162. Button('Back Page', { stateEffect: true, type: ButtonType.Capsule })
163. .width('80%')
164. .height(40)
165. .margin(20)
166. .onClick(() => {
167. this.pageInfo.pop();
168. })
169. }.width('100%').height('100%')
170. }.title('pageTwo')
171. .onBackPressed(() => {
172. this.pageInfo.pop();
173. return true;
174. })
175. }
176. }
```

[MyNavigationTestStack.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/FreezeV2/entry/src/main/ets/pages/freeze/template6/MyNavigationTestStack.ets#L15-L184)

在API version 17及以下：

点击Next page进入下一个页面并返回，会解冻Tabcontent所有的标签。

在API version 18及以上：

点击Next page进入下一个页面并返回，只会解冻对应标签的节点。

## 限制条件

API version 21及之前版本，如下面示例所示，FreezeBuildNode中使用了自定义节点[BuilderNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-buildernode)。BuilderNode可以通过命令式动态挂载组件，而组件冻结又是强依赖父子关系来通知是否开启组件冻结。如果父组件使用组件冻结，且组件树的中间层级上又启用了BuilderNode，则BuilderNode的子组件将无法被冻结。从API version 22开始，可以[设置BuilderNode继承冻结能力](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-arktsnode-buildernode#设置buildernode继承冻结能力)。

收起

自动换行

深色代码主题

复制

```
1. import { BuilderNode, FrameNode, NodeController, UIContext } from '@kit.ArkUI';
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. const DOMAIN = 0x0000;

6. // 定义一个Params类，用于传递参数
7. @ObservedV2
8. class Params {
9. // 单例模式，确保只有一个Params实例
10. public static singleton_: Params;

12. // 获取Params实例的方法
13. public static instance() {
14. if (!Params.singleton_) {
15. Params.singleton_ = new Params(0);
16. }
17. return Params.singleton_;
18. }

20. // 使用@Trace装饰器装饰message属性，以便跟踪其变化
21. @Trace public message: string = 'Hello';
22. public index: number = 0;

24. constructor(index: number) {
25. this.index = index;
26. }
27. }

29. // 定义一个BuildNodeChild组件，它包含一个storage属性和一个index属性
30. @ComponentV2
31. struct BuildNodeChild {
32. // 使用Params实例作为storage属性
33. storage: Params = Params.instance();
34. @Param index: number = 0;

36. // 使用@Monitor装饰器监听storage.message的变化
37. @Monitor('storage.message')
38. onMessageChange(monitor: IMonitor) {
39. hilog.info(DOMAIN, 'onMessageChange',
40. `FreezeBuildNode BuildNodeChild message callback func ${this.storage.message}, index:${this.index}`);
41. }

43. build() {
44. Text(`buildNode Child message: ${this.storage.message}`).fontSize(30)
45. }
46. }

48. // 定义一个buildText函数，它接收一个Params参数并构建一个Column组件
49. @Builder
50. function buildText(params: Params) {
51. Column() {
52. BuildNodeChild({ index: params.index })
53. }
54. }

56. class TextNodeController extends NodeController {
57. private textNode: BuilderNode<[Params]> | null = null;
58. private index: number = 0;

60. // 构造函数接收一个index参数
61. constructor(index: number) {
62. super();
63. this.index = index;
64. }

66. // 创建并返回一个FrameNode
67. makeNode(context: UIContext): FrameNode | null {
68. this.textNode = new BuilderNode(context);
69. this.textNode.build(wrapBuilder<[Params]>(buildText), new Params(this.index));
70. return this.textNode.getFrameNode();
71. }
72. }

74. // 定义一个Index组件，它包含一个message属性和一个data数组
75. @Entry
76. @ComponentV2
77. struct Index {
78. // 使用Params实例作为storage属性
79. storage: Params = Params.instance();
80. private data: number[] = [0, 1];

82. build() {
83. Row() {
84. Column() {
85. Button('change').fontSize(30)
86. .onClick(() => {
87. this.storage.message += 'a';
88. })

90. Tabs() {
91. // 使用Repeat重复渲染TabContent组件
92. Repeat<number>(this.data)
93. .each((obj: RepeatItem<number>) => {
94. TabContent() {
95. FreezeBuildNode({ index: obj.item })
96. .margin({ top: 20 })
97. }.tabBar(`tab${obj.item}`)
98. })
99. .key((item: number) => item.toString())
100. }
101. }
102. }
103. .width('100%')
104. .height('100%')
105. }
106. }

108. // 定义一个FreezeBuildNode组件，它包含一个message属性和一个index属性
109. @ComponentV2({ freezeWhenInactive: true })
110. struct FreezeBuildNode {
111. // 使用Params实例作为storage属性
112. storage: Params = Params.instance();
113. @Param index: number = 0;

115. // 使用@Monitor装饰器监听storage.message的变化
116. @Monitor('storage.message')
117. onMessageChange(monitor: IMonitor) {
118. hilog.info(DOMAIN, 'onMessageChange',
119. `FreezeBuildNode message callback func ${this.storage.message}, index: ${this.index}`);
120. }

122. build() {
123. NodeContainer(new TextNodeController(this.index))
124. .width('100%')
125. .height('100%')
126. .backgroundColor('#FFF0F0F0')
127. }
128. }
```

[BuilderNode.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/FreezeV2/entry/src/main/ets/pages/freeze/template7/BuilderNode.ets#L15-L144)

点击change，改变message的值，当前正在显示的TabContent组件中@Monitor注册的方法onMessageChange被触发。未显示的TabContent中的BuilderNode节点下组件的@Monitor方法onMessageChange也被触发，并没有被冻结。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/69/v3/wT2_Ml5YQUWV53rpJz0pzg/zh-cn_image_0000002571291165.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034227Z&HW-CC-Expire=86400&HW-CC-Sign=7FE07F0ED0C22973925C2241856A49EE999A6D20AE9DE40AD57722343DF7FD1B)