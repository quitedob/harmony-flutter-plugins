自定义组件冻结功能专为优化复杂UI页面的性能而设计，尤其适用于包含多个页面栈、长列表或宫格布局的场景。当状态变量绑定多个UI组件时，其变化易触发大量组件刷新，导致界面卡顿与响应延迟。为提升这类高负载UI界面的刷新性能，建议开发者使用自定义组件冻结功能。

组件冻结功能是一种性能优化机制，它会冻结非激活状态下的组件的刷新能力。当组件处于非激活状态时，即使其绑定的状态变量发生变化，也不会触发该组件的UI重新渲染，从而降低复杂UI场景下的刷新负载。

在阅读本文档前，开发者需要了解自定义组件基本语法。建议提前阅读：[自定义组件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-create-custom-components)。

说明

从API version 11开始，支持自定义组件冻结功能。

从API version 18开始，支持自定义组件冻结混用场景。

从API version 20开始，通过配置[BuilderNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-buildernode)的[inheritFreezeOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-buildernode#inheritfreezeoptions20)接口为true，实现BuilderNode继承冻结的能力。具体示例见[BuilderNode对象继承组件冻结](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-buildernode#inheritfreezeoptions20)。

## 概述

组件冻结的工作原理是：

1. 开发者通过设置[freezeWhenInactive](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-parameter#componentoptions)属性，即可激活组件冻结机制。
2. 启用后，系统将仅对处于激活状态的自定义组件进行更新，这使得UI框架可以尽量缩小更新范围，仅限于用户可见范围内（激活状态）的自定义组件，从而提高复杂UI场景下的刷新效率。
3. 当之前处于inactive状态的自定义组件重新变为active状态时，状态管理框架会对其执行必要的刷新操作，确保UI的正确展示。

简而言之，组件冻结旨在优化复杂界面下的UI刷新性能。在存在多个不可见自定义组件的情况下，如多页面栈、长列表或宫格，通过组件冻结可以实现按需刷新，即仅刷新当前可见的自定义组件，而将不可见自定义组件的刷新延迟至它们变为可见时。

需要注意，组件active/inactive并不等同于其可见性。组件冻结目前仅适用于以下场景：

1. [页面路由](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-router)：当前栈顶页面为active状态，非栈顶不可见页面为inactive状态。
2. [TabContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-tabcontent)：只有当前显示的TabContent中的自定义组件处于active状态，其余则为inactive。
3. [LazyForEach](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-rendering-control-lazyforeach)：仅当前显示的LazyForEach中的自定义组件为active状态，而缓存节点的组件则为inactive状态。
4. [Navigation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation)：当前显示的NavDestination中的自定义组件为active状态，而其他未显示的NavDestination组件则为inactive状态。需要注意，本文档中涉及的“激活（active）/非激活（inactive）”是指组件冻结的激活/非激活状态，和[NavDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination)组件中的[onActive](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination#onactive17)和[onInactive](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navdestination#oninactive17)不同。
5. 组件复用：进入复用池的组件为inactive状态，从复用池上树的节点为active状态。
6. 混用场景：对于以上场景的组合使用，例如TabContent下面使用LazyForEach，切换Tab时，API version 17及以下，LazyForEach中的所有节点都会被设置为active状态，而从API version 18开始，只有LazyForEach的屏上节点会被设置为active状态，其余则为inactive状态。

## 当前支持的场景

### 页面路由

说明

本示例使用了router进行页面跳转，建议开发者使用组件导航(Navigation)代替页面路由(router)来实现页面切换。Navigation提供了更多的功能和更灵活的自定义能力。请参考[使用Navigation的组件冻结用例](/consumer/cn/doc/harmonyos-guides/arkts-custom-components-freeze#navigation)。

当页面1调用router.pushUrl接口跳转到页面2时，页面1为隐藏不可见状态，此时如果更新页面1中的状态变量，不会触发页面1刷新。

图示如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/83/v3/YSJcg8n7TXuAL9wjUZKy4g/zh-cn_image_0000002571171205.png?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=346C0431E41E1C50EC2EAD0B85983270DB526557A74C51091A1B4C63AEA0BB64)

页面1：

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. const DOMAIN = 0x0001;
3. const TAG = 'FreezeChild';

5. @Entry
6. @Component({ freezeWhenInactive: true })
7. struct PageOne {
8. @StorageLink('PropA') @Watch('first') storageLink: number = 47;

10. first() {
11. hilog.info(DOMAIN, TAG, 'first page ' + `${this.storageLink}`);
12. }

14. build() {
15. Column() {
16. Text(`From first Page ${this.storageLink}`).fontSize(50)
17. Button('first page storageLink + 1').fontSize(30)
18. .onClick(() => {
19. this.storageLink += 1;
20. })
21. Button('go to next page').fontSize(30)
22. .onClick(() => {
23. // 此处传入的url，需要开发者自行替换。
24. this.getUIContext().getRouter().pushUrl({ url: 'View/PageTwo' }, (err: Error) => {
25. if (err) {
26. hilog.error(DOMAIN, TAG, 'pushUrl failed. Cause: %{public}s', JSON.stringify(err));
27. }
28. });
29. })
30. }
31. }
32. }
```

[Page1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/CustomComponentsFreeze/entry/src/main/ets/View/Page1.ets#L15-L48)

页面2：

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. const DOMAIN = 0x0001;
3. const TAG = 'FreezeChild';

5. @Entry
6. @Component({ freezeWhenInactive: true })
7. struct PageTwo {
8. @StorageLink('PropA') @Watch('second') storageLink: number = 1;

10. second() {
11. hilog.info(DOMAIN, TAG, 'second page: ' + `${this.storageLink}`);
12. }

14. build() {
15. Column() {
16. Text(`second Page ${this.storageLink}`).fontSize(50)
17. Button('back')
18. .onClick(() => {
19. this.getUIContext().getRouter().back();
20. })
21. Button('second page storageLink + 2').fontSize(30)
22. .onClick(() => {
23. this.storageLink += 2;
24. })
25. }
26. }
27. }
```

[PageTwo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/CustomComponentsFreeze/entry/src/main/ets/View/PageTwo.ets#L15-L43)

在上面的示例中：

1.在页面1中点击first page storageLink + 1，storageLink状态变量改变，[@Watch](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-watch)注册的方法first会被调用。

2.在页面1中点击go to next page，跳转到页面2，页面1隐藏，状态由active变为inactive。

3.在页面2中点击this.storageLink2 += 2，只会回调页面2中@Watch注册的方法second，因为页面1的状态变量此时已被冻结。

4.在页面2中点击back，页面2被销毁，页面1的状态由inactive变为active，重新刷新在inactive时被冻结的状态变量，页面1中@Watch注册的方法first被再次调用。

### TabContent

对Tabs中当前不可见的TabContent进行冻结，修改状态变量不会触发冻结组件的更新。

需要注意的是：在首次渲染的时候，Tabs只会创建当前正在显示的TabContent，当切换全部的TabContent后，TabContent才会被全部创建。

图示如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f9/v3/tjBkoBbIR_y5iiCWcqmT9g/zh-cn_image_0000002540770862.png?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=D9B443117F8D90B20C0C1D8790E90A91BEF75E4B0844559F7B2C054E46009883)

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. const DOMAIN = 0x0001;
3. const TAG = 'FreezeChild';

5. @Entry
6. @Component
7. struct TabContentTest {
8. @State @Watch('onMessageUpdated') message: number = 0;
9. private data: number[] = [0, 1];

11. onMessageUpdated() {
12. hilog.info(DOMAIN, TAG, `TabContent message callback func ${this.message}`);
13. }

15. build() {
16. Row() {
17. Column() {
18. Button('change message').onClick(() => {
19. this.message++;
20. })
21. Tabs() {
22. ForEach(this.data, (item: number) => {
23. TabContent() {
24. FreezeChild({ message: this.message, index: item })
25. }.tabBar(`tab${item}`)
26. }, (item: number) => item.toString())
27. }
28. }
29. .width('100%')
30. }
31. .height('100%')
32. }
33. }

35. @Component({ freezeWhenInactive: true })
36. struct FreezeChild {
37. @Link @Watch('onMessageUpdated') message: number;
38. index: number = 0;

40. onMessageUpdated() {
41. hilog.info(DOMAIN, TAG, `FreezeChild message callback func ${this.message}, index: ${this.index}`);
42. }

44. build() {
45. Text('message' + `${this.message}, index: ${this.index}`)
46. .fontSize(50)
47. .fontWeight(FontWeight.Bold)
48. }
49. }
```

[TabContentTest.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/CustomComponentsFreeze/entry/src/main/ets/View/TabContentTest.ets#L15-L65)

在上面的示例中：

1.点击change message更改message的值，当前正在显示的TabContent组件中的@Watch注册的方法onMessageUpdated被触发。

2.点击tab1切换到另外的TabContent，该TabContent的状态由inactive变为active，对应的@Watch注册的方法onMessageUpdated被触发。

3.再次点击change message更改message的值，仅当前显示的TabContent子组件中的@Watch注册的方法onMessageUpdated被触发。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a8/v3/A1X2-SPrR9GZDoFyXJVSbQ/zh-cn_image_0000002571291157.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=D73102EE2C11CC95075D5245744C630D9A5688CF81C9FC3F2BCCD61DDF9EFD62)

### LazyForEach

对LazyForEach中缓存的自定义组件进行冻结，修改状态变量不会触发缓存组件的更新。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. const DOMAIN = 0x0001;
3. const TAG = 'FreezeChild';

5. // 用于处理数据监听的IDataSource的基本实现
6. class BasicDataSource implements IDataSource {
7. private listeners: DataChangeListener[] = [];
8. private originDataArray: string[] = [];

10. public totalCount(): number {
11. return 0;
12. }

14. public getData(index: number): string {
15. return this.originDataArray[index];
16. }

18. // 该方法为框架侧调用，为LazyForEach组件向其数据源处添加listener监听
19. registerDataChangeListener(listener: DataChangeListener): void {
20. if (this.listeners.indexOf(listener) < 0) {
21. hilog.info(DOMAIN, TAG, 'add listener');
22. this.listeners.push(listener);
23. }
24. }

26. // 该方法为框架侧调用，为对应的LazyForEach组件在数据源处去除listener监听
27. unregisterDataChangeListener(listener: DataChangeListener): void {
28. const pos = this.listeners.indexOf(listener);
29. if (pos >= 0) {
30. hilog.info(DOMAIN, TAG, 'remove listener');
31. this.listeners.splice(pos, 1);
32. }
33. }

35. // 通知LazyForEach组件需要重载所有子组件
36. notifyDataReload(): void {
37. this.listeners.forEach(listener => {
38. listener.onDataReloaded();
39. })
40. }

42. // 通知LazyForEach组件需要在index对应索引处添加子组件
43. notifyDataAdd(index: number): void {
44. this.listeners.forEach(listener => {
45. listener.onDataAdd(index);
46. })
47. }

49. // 通知LazyForEach组件在index对应索引处数据有变化，需要重建该子组件
50. notifyDataChange(index: number): void {
51. this.listeners.forEach(listener => {
52. listener.onDataChange(index);
53. })
54. }

56. // 通知LazyForEach组件需要在index对应索引处删除该子组件
57. notifyDataDelete(index: number): void {
58. this.listeners.forEach(listener => {
59. listener.onDataDelete(index);
60. })
61. }
62. }

64. class MyDataSource extends BasicDataSource {
65. private dataArray: string[] = [];

67. public totalCount(): number {
68. return this.dataArray.length;
69. }

71. public getData(index: number): string {
72. return this.dataArray[index];
73. }

75. public addData(index: number, data: string): void {
76. this.dataArray.splice(index, 0, data);
77. this.notifyDataAdd(index);
78. }

80. public pushData(data: string): void {
81. this.dataArray.push(data);
82. this.notifyDataAdd(this.dataArray.length - 1);
83. }
84. }

86. @Entry
87. @Component
88. struct LazyforEachTest {
89. private data: MyDataSource = new MyDataSource();
90. @State @Watch('onMessageUpdated') message: number = 0;

92. onMessageUpdated() {
93. hilog.info(DOMAIN, TAG, `LazyforEach message callback func ${this.message}`);
94. }

96. aboutToAppear() {
97. for (let i = 0; i <= 20; i++) {
98. this.data.pushData(`Hello ${i}`);
99. }
100. }

102. build() {
103. Column() {
104. Button('change message').onClick(() => {
105. this.message++;
106. })
107. List({ space: 3 }) {
108. LazyForEach(this.data, (item: string) => {
109. ListItem() {
110. FreezeChild({ message: this.message, index: item })
111. }
112. }, (item: string) => item)
113. }.cachedCount(5).height(500)
114. }
115. }
116. }

118. @Component({ freezeWhenInactive: true })
119. struct FreezeChild {
120. @Link @Watch('onMessageUpdated') message: number;
121. index: string = '';

123. aboutToAppear() {
124. hilog.info(DOMAIN, TAG, `FreezeChild aboutToAppear index: ${this.index}`);
125. }

127. onMessageUpdated() {
128. hilog.info(DOMAIN, TAG, `FreezeChild message callback func ${this.message}, index: ${this.index}`);
129. }

131. build() {
132. Text('message' + `${this.message}, index: ${this.index}`)
133. .width('90%')
134. .height(160)
135. .backgroundColor(0xAFEEEE)
136. .textAlign(TextAlign.Center)
137. .fontSize(30)
138. .fontWeight(FontWeight.Bold)
139. }
140. }
```

[LazyforEachTest.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/CustomComponentsFreeze/entry/src/main/ets/View/LazyforEachTest.ets#L15-L156)

在上面的示例中：

1.点击change message更改message的值，当前正在显示的ListItem中的子组件@Watch注册的方法onMessageUpdated被触发。缓存节点中@Watch注册的方法不会被触发。（如果不加组件冻结，当前正在显示的ListItem和cachecount缓存节点中@Watch注册的方法onMessageUpdated都会被触发。）

2.List区域外的ListItem滑动到List区域内，状态由inactive变为active，对应的@Watch注册的方法onMessageUpdated被触发。

3.再次点击change message更改message的值，仅有当前显示的ListItem中的子组件@Watch注册的方法onMessageUpdated被触发。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b9/v3/9_ryuraDRbWWFITy69UMxQ/zh-cn_image_0000002540611212.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=251E9D77229E79C60562D98D2F33907993D24A683501F79473D66F2ECB8A25DF)

### Navigation

当NavDestination不可见时，会将其子自定义组件设置成非激活态，修改状态变量不会触发冻结组件的刷新。当返回该页面时，其子自定义组件重新恢复成激活态，触发@Watch回调进行刷新。

在下面例子中，NavigationContentMsgStack会被设置成非激活态，将不再响应状态变量的变化，也不会触发组件刷新。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. const DOMAIN = 0x0001;
3. const TAG = 'FreezeChild';

5. @Entry
6. @Component
7. struct MyNavigationTestStack {
8. @Provide('pageInfo') pageInfo: NavPathStack = new NavPathStack();
9. @State @Watch('info') message: number = 0;
10. @State logNumber: number = 0;

12. info() {
13. hilog.info(DOMAIN, TAG, `freeze-test MyNavigation message callback ${this.message}`);
14. }

16. @Builder
17. PageMap(name: string) {
18. if (name === 'pageOne') {
19. PageOneStack({ message: this.message, logNumber: this.logNumber })
20. } else if (name === 'pageTwo') {
21. PageTwoStack({ message: this.message, logNumber: this.logNumber })
22. } else if (name === 'pageThree') {
23. PageThreeStack({ message: this.message, logNumber: this.logNumber })
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
36. .width('80%')
37. .height(40)
38. .margin(20)
39. .onClick(() => {
40. this.pageInfo.pushPath({ name: 'pageOne' }); // 将name指定的NavDestination页面信息入栈
41. })
42. }
43. }.title('NavIndex')
44. .navDestination(this.PageMap)
45. .mode(NavigationMode.Stack)
46. }
47. }
48. }

50. @Component
51. struct PageOneStack {
52. @Consume('pageInfo') pageInfo: NavPathStack;
53. @State index: number = 1;
54. @Link message: number;
55. @Link logNumber: number;

57. build() {
58. NavDestination() {
59. Column() {
60. NavigationContentMsgStack({ message: this.message, index: this.index, logNumber: this.logNumber })
61. Text('cur stack size:' + `${this.pageInfo.size()}`)
62. .fontSize(30)
63. .fontWeight(FontWeight.Bold)
64. Button('Next Page', { stateEffect: true, type: ButtonType.Capsule })
65. .width('80%')
66. .height(40)
67. .margin(20)
68. .onClick(() => {
69. this.pageInfo.pushPathByName('pageTwo', null);
70. })
71. Button('Back Page', { stateEffect: true, type: ButtonType.Capsule })
72. .width('80%')
73. .height(40)
74. .margin(20)
75. .onClick(() => {
76. this.pageInfo.pop();
77. })
78. }.width('100%').height('100%')
79. }.title('pageOne')
80. .onBackPressed(() => {
81. this.pageInfo.pop();
82. return true;
83. })
84. }
85. }

87. @Component
88. struct PageTwoStack {
89. @Consume('pageInfo') pageInfo: NavPathStack;
90. @State index: number = 2;
91. @Link message: number;
92. @Link logNumber: number;

94. build() {
95. NavDestination() {
96. Column() {
97. NavigationContentMsgStack({ message: this.message, index: this.index, logNumber: this.logNumber })
98. Text('cur stack size:' + `${this.pageInfo.size()}`)
99. .fontSize(30)
100. .fontWeight(FontWeight.Bold)
101. Button('Next Page', { stateEffect: true, type: ButtonType.Capsule })
102. .width('80%')
103. .height(40)
104. .margin(20)
105. .onClick(() => {
106. this.pageInfo.pushPathByName('pageThree', null);
107. })
108. Button('Back Page', { stateEffect: true, type: ButtonType.Capsule })
109. .width('80%')
110. .height(40)
111. .margin(20)
112. .onClick(() => {
113. this.pageInfo.pop();
114. })
115. }.width('100%').height('100%')
116. }.title('pageTwo')
117. .onBackPressed(() => {
118. this.pageInfo.pop();
119. return true;
120. })
121. }
122. }

124. @Component
125. struct PageThreeStack {
126. @Consume('pageInfo') pageInfo: NavPathStack;
127. @State index: number = 3;
128. @Link message: number;
129. @Link logNumber: number;

131. build() {
132. NavDestination() {
133. Column() {
134. NavigationContentMsgStack({ message: this.message, index: this.index, logNumber: this.logNumber })
135. Text('cur stack size:' + `${this.pageInfo.size()}`)
136. .fontSize(30)
137. .fontWeight(FontWeight.Bold)
138. Button('Next Page', { stateEffect: true, type: ButtonType.Capsule })
139. .width('80%')
140. .height(40)
141. .margin(20)
142. .onClick(() => {
143. this.pageInfo.pushPathByName('pageOne', null);
144. })
145. Button('Back Page', { stateEffect: true, type: ButtonType.Capsule })
146. .width('80%')
147. .height(40)
148. .margin(20)
149. .onClick(() => {
150. this.pageInfo.pop();
151. })
152. }.width('100%').height('100%')
153. }.title('pageThree')
154. .onBackPressed(() => {
155. this.pageInfo.pop();
156. return true;
157. })
158. }
159. }

161. @Component({ freezeWhenInactive: true })
162. struct NavigationContentMsgStack {
163. @Link @Watch('info') message: number;
164. @Link index: number;
165. @Link logNumber: number;

167. info() {
168. hilog.info(DOMAIN, TAG, `freeze-test NavigationContent message callback ${this.message}`);
169. hilog.info(DOMAIN, TAG, `freeze-test ---- called by content ${this.index}`);
170. this.logNumber++;
171. }

173. build() {
174. Column() {
175. Text('msg:' + `${this.message}`)
176. .fontSize(30)
177. .fontWeight(FontWeight.Bold)
178. Text('log number:' + `${this.logNumber}`)
179. .fontSize(30)
180. .fontWeight(FontWeight.Bold)
181. }
182. }
183. }
```

[MyNavigationTestStack.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/CustomComponentsFreeze/entry/src/main/ets/View/MyNavigationTestStack.ets#L15-L202)

在上面的示例中：

1.点击change message更改message的值，当前正在显示的MyNavigationTestStack组件中的@Watch注册的方法info被触发。

2.点击Next Page切换到PageOne，创建PageOneStack节点。

3.再次点击change message更改message的值，仅PageOneStack中的NavigationContentMsgStack子组件中@Watch注册的方法info被触发。

4.再次点击Next Page切换到PageTwo，创建PageTwoStack节点。

5.再次点击change message更改message的值，仅PageTwoStack中的NavigationContentMsgStack子组件中@Watch注册的方法info被触发。

6.再次点击Next Page切换到PageThree，创建PageThreeStack节点。

7.再次点击change message更改message的值，仅PageThreeStack中的NavigationContentMsgStack子组件中@Watch注册的方法info被触发。

8.点击Back Page回到PageTwo，此时，仅PageTwoStack中的NavigationContentMsgStack子组件中@Watch注册的方法info被触发。

9.再次点击Back Page回到PageOne，此时，仅PageOneStack中的NavigationContentMsgStack子组件中@Watch注册的方法info被触发。

10.再次点击Back Page回到初始页，此时，无任何触发。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/11/v3/-ZjWnO0iT92-oD8htO6e3A/zh-cn_image_0000002571171207.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=F4C444F104E881E9897E928564376CC1973C109E2F27D407B775587B23312A7D)

### 组件复用

[组件复用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-reusable)通过重利用缓存池中已存在的节点，而非创建新节点，来优化UI性能并提升应用流畅度。复用池中的节点尽管未在UI组件树上展示，但是状态变量的更改仍会触发UI刷新。为了解决复用池中组件异常刷新问题，可以使用组件冻结避免复用池中的组件刷新。

**组件复用、if和组件冻结混用场景**

下面是组件复用、if组件和组件冻结混合使用场景的例子，if组件绑定的状态变量变化成false时，触发子组件ChildComponent的下树，由于ChildComponent被标记了组件复用，所以不会被销毁，而是进入复用池，这个时候如果同时开启了组件冻结，则可以使在复用池里不再刷新。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. const DOMAIN = 0x0001;
3. const TAG = 'FreezeChild';

5. @Reusable
6. @Component({ freezeWhenInactive: true })
7. struct ChildComponent {
8. @Link @Watch('descChange') desc: string;
9. @State count: number = 0;

11. descChange() {
12. hilog.info(DOMAIN, TAG, `ChildComponent messageChange ${this.desc}`);
13. }

15. aboutToReuse(params: Record<string, ESObject>): void {
16. this.count = params.count as number;
17. }

19. aboutToRecycle(): void {
20. hilog.info(DOMAIN, TAG, `ChildComponent has been recycled`);
21. }

23. build() {
24. Column() {
25. Text(`ChildComponent desc: ${this.desc}`)
26. .fontSize(20)
27. Text(`ChildComponent count ${this.count}`)
28. .fontSize(20)
29. }.border({ width: 2, color: Color.Pink })
30. }
31. }

33. @Entry
34. @Component
35. struct Page {
36. @State desc: string = 'Hello World';
37. @State flag: boolean = true;
38. @State count: number = 0;

40. build() {
41. Column() {
42. Button(`change desc`).onClick(() => {
43. this.desc += '!';
44. })
45. Button(`change flag`).onClick(() => {
46. this.count++;
47. this.flag = !this.flag;
48. })
49. if (this.flag) {
50. ChildComponent({ desc: this.desc, count: this.count })
51. }
52. }
53. .height('100%')
54. }
55. }
```

[ComponentReuse.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/CustomComponentsFreeze/entry/src/main/ets/View/ComponentReuse.ets#L16-L72)

在上面的示例中：

1. 点击change flag，改变flag为false：
   * 被标记@Reusable的ChildComponent组件在下树时，不会被销毁，而是进入复用池，触发aboutToRecycle生命周期，同时设置状态为inactive。
   * ChildComponent同时也开启了组件冻结，当其状态为inactive时，不会响应任何状态变量变化带来的UI刷新。
2. 点击change desc，触发Page的成员变量desc的变化：
   * desc是@State装饰的，其变化会通知给其子组件ChildComponent[@Link](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-link)装饰的desc。
   * 但因为ChildComponent是inactive状态，且开启了组件冻结，所以这次变化并不会触发@Watch('descChange')的回调和ChildComponentUI刷新。如果没有开启组件冻结，当前@Watch('descChange')会立即回调，且复用池内的ChildComponent组件也会对应刷新。
3. 再次点击change flag，改变flag为true：
   * ChildComponent从复用池中重新加入到组件树上。
   * 回调aboutToReuse生命周期，将当前最新的count值同步给子组件。desc是通过[@State](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-state)到@Link同步的，所以无需开发者手动在aboutToReuse中赋值。
   * 设置ChildComponent为active状态，并且刷新在inactive时没有刷新的组件，在当前例子中，就是Text(ChildComponent desc: ${this.desc})。

**LazyForEach、组件复用和组件冻结混用场景**

在数据很多的长列表滑动场景下，开发者会使用LazyForEach来按需创建组件，同时配合组件复用降低在滑动过程中因创建和销毁组件带来的开销。但是开发者如果根据其复用类型不同，设置了[reuseId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-reuse-id#reuseid)，或者为了保证滑动性能设置了较大的cacheCount，这就可能使复用池或者LazyForEach缓存较多的节点。在这种情况下，如果开发者触发List下所有子节点的刷新，就会带来节点刷新数量过多的问题，这个时候，可以考虑搭配组件冻结使用。

收起

自动换行

深色代码主题

复制

```
1. import { hilog, hiTraceMeter } from '@kit.PerformanceAnalysisKit';
2. const DOMAIN = 0x0001;
3. const TAG = 'FreezeChild';

5. // 用于处理数据监听的IDataSource的基本实现
6. class BasicDataSource implements IDataSource {
7. private listeners: DataChangeListener[] = [];
8. private originDataArray: string[] = [];

10. public totalCount(): number {
11. return 0;
12. }

14. public getData(index: number): string {
15. return this.originDataArray[index];
16. }

18. // 该方法为框架侧调用，为LazyForEach组件向其数据源处添加listener监听
19. registerDataChangeListener(listener: DataChangeListener): void {
20. if (this.listeners.indexOf(listener) < 0) {
21. hilog.info(DOMAIN, TAG, 'add listener');
22. this.listeners.push(listener);
23. }
24. }

26. // 该方法为框架侧调用，为对应的LazyForEach组件在数据源处去除listener监听
27. unregisterDataChangeListener(listener: DataChangeListener): void {
28. const pos = this.listeners.indexOf(listener);
29. if (pos >= 0) {
30. hilog.info(DOMAIN, TAG, 'remove listener');
31. this.listeners.splice(pos, 1);
32. }
33. }

35. // 通知LazyForEach组件需要重载所有子组件
36. notifyDataReload(): void {
37. this.listeners.forEach(listener => {
38. listener.onDataReloaded();
39. })
40. }

42. // 通知LazyForEach组件需要在index对应索引处添加子组件
43. notifyDataAdd(index: number): void {
44. this.listeners.forEach(listener => {
45. listener.onDataAdd(index);
46. })
47. }

49. // 通知LazyForEach组件在index对应索引处数据有变化，需要重建该子组件
50. notifyDataChange(index: number): void {
51. this.listeners.forEach(listener => {
52. listener.onDataChange(index);
53. })
54. }

56. // 通知LazyForEach组件需要在index对应索引处删除该子组件
57. notifyDataDelete(index: number): void {
58. this.listeners.forEach(listener => {
59. listener.onDataDelete(index);
60. })
61. }

63. // 通知LazyForEach组件将from索引和to索引处的子组件进行交换
64. notifyDataMove(from: number, to: number): void {
65. this.listeners.forEach(listener => {
66. listener.onDataMove(from, to);
67. })
68. }
69. }

71. class MyDataSource extends BasicDataSource {
72. private dataArray: string[] = [];

74. public totalCount(): number {
75. return this.dataArray.length;
76. }

78. public getData(index: number): string {
79. return this.dataArray[index];
80. }

82. public addData(index: number, data: string): void {
83. this.dataArray.splice(index, 0, data);
84. this.notifyDataAdd(index);
85. }

87. public pushData(data: string): void {
88. this.dataArray.push(data);
89. this.notifyDataAdd(this.dataArray.length - 1);
90. }
91. }

93. @Reusable
94. @Component({freezeWhenInactive: true})
95. struct ChildComponent {
96. @Link @Watch('descChange') desc: string;
97. @State item: string = '';
98. @State index: number = 0;

100. descChange() {
101. hilog.info(DOMAIN, TAG, `ChildComponent messageChange ${this.desc}`);
102. }

104. aboutToReuse(params: Record<string, ESObject>): void {
105. this.item = params.item;
106. this.index = params.index;
107. }

109. aboutToRecycle(): void {
110. hilog.info(DOMAIN, TAG, `ChildComponent has been recycled`);
111. }

113. build() {
114. Column() {
115. Text(`ChildComponent index: ${this.index} item: ${this.item}`)
116. .fontSize(20)
117. Text(`desc: ${this.desc}`)
118. .fontSize(20)
119. }.border({width: 2, color: Color.Pink})
120. }
121. }

123. @Entry
124. @Component
125. struct Page {
126. @State desc: string = 'Hello World';
127. private data: MyDataSource = new MyDataSource();

129. aboutToAppear() {
130. for (let i = 0; i < 50; i++) {
131. this.data.pushData(`Hello ${i}`);
132. }
133. }

135. build() {
136. Column() {
137. Button(`change desc`).onClick(() => {
138. hiTraceMeter.startTrace('change desc', 1);
139. this.desc += '!';
140. hiTraceMeter.finishTrace('change desc', 1);
141. })
142. List({ space: 3 }) {
143. LazyForEach(this.data, (item: string, index: number) => {
144. ListItem() {
145. ChildComponent({index: index, item: item, desc: this.desc}).reuseId(index % 10 < 5 ? '1': '0')
146. }
147. }, (item: string) => item)
148. }.cachedCount(5)
149. }
150. .height('100%')
151. }
152. }
```

[ComponentReuse1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/CustomComponentsFreeze/entry/src/main/ets/View/ComponentReuse1.ets#L15-L168)

在上面的示例中：

1. 滑动到index为14的位置，当前屏幕上可见区域内有15个ChildComponent。
2. 在滑动过程中：
   * 列表上端的ChildComponent滑出可视区域外，此时先进入LazyForEach的缓存区域内，被设置inactive。在滑出LazyForEach缓存区域外后，因为标记了组件复用，所以并不会被析构，而是会进入复用池，此时再次被设置inactive。
   * 列表下端LazyForEach的缓存节点会进入List范围内，此时会试图请求创建新的节点进入LazyForEach的缓存，发现有可复用的节点时，从复用池中拿出已有节点，触发aboutToReuse生命周期回调，此时因为节点进入的是LazyForEach的缓存区域，所以其状态依旧是inactive。
3. 点击change desc，触发Page的成员变量desc的变化：
   * desc是@State装饰的，其变化会通知给其子组件ChildComponent@Link装饰的desc。
   * 非可视区域内的ChildComponent是inactive状态，且开启了组件冻结，所以这次变化只触发可视区域内的15个节点的@Watch('descChange')回调，并只刷新对应可视区域内的15个节点。LazyForEach和复用池中的节点并不会刷新，也不会触发@Watch回调。

图示如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b3/v3/AkUdeGR9R666ssvi40pdGQ/zh-cn_image_0000002540770864.png?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=42748EABCFD5FEC102BF00DCD2D006849F0BF8B95CE83AC2283CBAA1AA3F81CE)

可通过trace观察，仅触发了15个ChildComponent节点的刷新。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/44/v3/bCb1d0C5Rha813KeESspUw/zh-cn_image_0000002571291159.png?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=50A392BC59CC2EA09F0A3C2D83711F97239C1BDCE57DE1399108EC9A3C5281FB)

**LazyForEach、if、组件复用和组件冻结混用场景**

下面的场景中展示了LazyForEach、if、组件复用和组件冻结混用场景。在同一个父自定义组件下，可复用的节点可能通过不同的方式进入复用池，比如：

* 通过滑动从LazyForEach的缓存区域下树，进入复用池。
* if条件切换通知子节点下树，进入复用池。

收起

自动换行

深色代码主题

复制

```
1. import { hilog, hiTraceMeter } from '@kit.PerformanceAnalysisKit';
2. const DOMAIN = 0x0001;
3. const TAG = 'FreezeChild';

5. class BasicDataSource implements IDataSource {
6. private listeners: DataChangeListener[] = [];
7. private originDataArray: string[] = [];

9. public totalCount(): number {
10. return 0;
11. }

13. public getData(index: number): string {
14. return this.originDataArray[index];
15. }

17. // 该方法为框架侧调用，为LazyForEach组件向其数据源处添加listener监听
18. registerDataChangeListener(listener: DataChangeListener): void {
19. if (this.listeners.indexOf(listener) < 0) {
20. hilog.info(DOMAIN, TAG, 'add listener');
21. this.listeners.push(listener);
22. }
23. }

25. // 该方法为框架侧调用，为对应的LazyForEach组件在数据源处去除listener监听
26. unregisterDataChangeListener(listener: DataChangeListener): void {
27. const pos = this.listeners.indexOf(listener);
28. if (pos >= 0) {
29. hilog.info(DOMAIN, TAG, 'remove listener');
30. this.listeners.splice(pos, 1);
31. }
32. }

34. // 通知LazyForEach组件需要重载所有子组件
35. notifyDataReload(): void {
36. this.listeners.forEach(listener => {
37. listener.onDataReloaded();
38. })
39. }

41. // 通知LazyForEach组件需要在index对应索引处添加子组件
42. notifyDataAdd(index: number): void {
43. this.listeners.forEach(listener => {
44. listener.onDataAdd(index);
45. })
46. }

48. // 通知LazyForEach组件在index对应索引处数据有变化，需要重建该子组件
49. notifyDataChange(index: number): void {
50. this.listeners.forEach(listener => {
51. listener.onDataChange(index);
52. })
53. }

55. // 通知LazyForEach组件需要在index对应索引处删除该子组件
56. notifyDataDelete(index: number): void {
57. this.listeners.forEach(listener => {
58. listener.onDataDelete(index);
59. })
60. }

62. // 通知LazyForEach组件将from索引和to索引处的子组件进行交换
63. notifyDataMove(from: number, to: number): void {
64. this.listeners.forEach(listener => {
65. listener.onDataMove(from, to);
66. })
67. }
68. }

70. class MyDataSource extends BasicDataSource {
71. private dataArray: string[] = [];

73. public totalCount(): number {
74. return this.dataArray.length;
75. }

77. public getData(index: number): string {
78. return this.dataArray[index];
79. }

81. public addData(index: number, data: string): void {
82. this.dataArray.splice(index, 0, data);
83. this.notifyDataAdd(index);
84. }

86. public pushData(data: string): void {
87. this.dataArray.push(data);
88. this.notifyDataAdd(this.dataArray.length - 1);
89. }
90. }

92. @Reusable
93. @Component({ freezeWhenInactive: true })
94. struct ChildComponent {
95. @Link @Watch('descChange') desc: string;
96. @State item: string = '';
97. @State index: number = 0;

99. descChange() {
100. hilog.info(DOMAIN, TAG, `ChildComponent messageChange ${this.desc}`);
101. }

103. aboutToReuse(params: Record<string, ESObject>): void {
104. this.item = params.item;
105. this.index = params.index;
106. }

108. aboutToRecycle(): void {
109. hilog.info(DOMAIN, TAG, `ChildComponent has been recycled`);
110. }

112. build() {
113. Column() {
114. Text(`ChildComponent index: ${this.index} item: ${this.item}`)
115. .fontSize(20)
116. Text(`desc: ${this.desc}`)
117. .fontSize(20)
118. }.border({ width: 2, color: Color.Pink })
119. }
120. }

122. @Entry
123. @Component
124. struct Page {
125. @State desc: string = 'Hello World';
126. @State flag: boolean = true;
127. private data: MyDataSource = new MyDataSource();

129. aboutToAppear() {
130. for (let i = 0; i < 50; i++) {
131. this.data.pushData(`Hello ${i}`);
132. }
133. }

135. build() {
136. Column() {
137. Button(`change desc`).onClick(() => {
138. hiTraceMeter.startTrace('change desc', 1);
139. this.desc += '!';
140. hiTraceMeter.finishTrace('change desc', 1);
141. })
142. Button(`change flag`).onClick(() => {
143. hiTraceMeter.startTrace('change flag', 1);
144. this.flag = !this.flag;
145. hiTraceMeter.finishTrace('change flag', 1);
146. })
147. List({ space: 3 }) {
148. LazyForEach(this.data, (item: string, index: number) => {
149. ListItem() {
150. ChildComponent({ index: index, item: item, desc: this.desc }).reuseId(index % 10 < 5 ? '1' : '0')
151. }
152. }, (item: string) => item)
153. }
154. .cachedCount(5)
155. .height('60%')
156. if (this.flag) {
157. ChildComponent({ index: -1, item: 'Hello', desc: this.desc }).reuseId('1')
158. }
159. }
160. .height('100%')
161. }
162. }
```

在上面的示例中：

1. 当滑动到index为14的位置，屏幕上可见区域内有10个ChildComponent，9个是LazyForEach的子节点，1个是if的子节点。
2. 点击change flag，if的条件变成false，其子节点ChildComponent进入复用池。当前屏幕显示9个节点。
3. 此时不管是通过LazyForEach还是if下树的节点都会进入Page节点下的复用池。
4. 点击change desc，仅更新屏幕上的9个ChildComponent节点，具体可参考下面的trace。
5. 再次点击change flag，if的条件变成true，ChildComponent从复用池中重新加入到组件树上，其状态变成active。
6. 再次点击change desc，从复用池中通过if和LazyForEach上树的节点都可正常刷新。

开启组件冻结trace：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/90/v3/f8qTVoPWRhWLlDzqhMog3w/zh-cn_image_0000002540611214.png?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=44B0278F52532E809EF7A48FABAE160DCF55E84F011F02536D8A401B5521B607)

没有开启组件冻结trace：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/34/v3/5X8fDbfvSDe8NwUQMSOOAg/zh-cn_image_0000002571171209.png?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=621E206B7C9D5791FD638C40471391BBFD31A38EF46B1D0D26FB57691E7034DE)

### 组件混用

当支持组件冻结的场景彼此之间组合使用时，对于不同的API版本，冻结行为会有不同。给父组件设置组件冻结标志，在API version 17及以下，当父组件解冻时，会解冻自己子组件所有的节点；从API version 18开始，父组件解冻时，只会解冻子组件的屏上节点。

**Navigation和TabContent的混用**

代码示例如下：

收起

自动换行

深色代码主题

复制

```
1. // index.ets
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. const DOMAIN = 0x0001;
4. const TAG = 'FreezeChild';

6. @Component
7. struct ChildOfParamComponent {
8. @Prop @Watch('onChange') childVal: number;

10. onChange() {
11. hilog.info(DOMAIN, TAG, `Appmonitor ChildOfParamComponent: childVal changed:${this.childVal}`);
12. }

14. build() {
15. Column() {
16. Text(`Child Param: ${this.childVal}`)
17. }
18. }
19. }

21. @Component
22. struct ParamComponent {
23. @Prop @Watch('onChange') paramVal: number;

25. onChange() {
26. hilog.info(DOMAIN, TAG, `Appmonitor ParamComponent: paramVal changed:${this.paramVal}`);
27. }

29. build() {
30. Column() {
31. Text(`val: ${this.paramVal}`)
32. ChildOfParamComponent({ childVal: this.paramVal })
33. }
34. }
35. }

37. @Component
38. struct DelayComponent {
39. @Prop @Watch('onChange') delayVal: number;

41. onChange() {
42. hilog.info(DOMAIN, TAG, `Appmonitor ParamComponent: delayVal changed:${this.delayVal}`);
43. }

45. build() {
46. Column() {
47. Text(`Delay Param: ${this.delayVal}`)
48. }
49. }
50. }

52. @Component({ freezeWhenInactive: true })
53. struct TabsComponent {
54. private controller: TabsController = new TabsController();
55. @State @Watch('onChange') tabState: number = 47;

57. onChange() {
58. hilog.info(DOMAIN, TAG, `Appmonitor TabsComponent: tabState changed:${this.tabState}`);
59. }

61. build() {
62. Column({ space: 10 }) {
63. Button(`Incr state ${this.tabState}`)
64. .fontSize(25)
65. .onClick(() => {
66. hilog.info(DOMAIN, TAG, 'Button increment state value');
67. this.tabState = this.tabState + 1;
68. })
69. Tabs({ barPosition: BarPosition.Start, index: 0, controller: this.controller }) {
70. TabContent() {
71. ParamComponent({ paramVal: this.tabState })
72. }.tabBar('Update')
73. TabContent() {
74. DelayComponent({ delayVal: this.tabState })
75. }.tabBar('DelayUpdate')
76. }
77. .vertical(false)
78. .scrollable(true)
79. .barMode(BarMode.Fixed)
80. .barWidth(400)
81. .barHeight(150)
82. .animationDuration(400)
83. .width('100%')
84. .height(200)
85. .backgroundColor(0xF5F5F5)
86. }
87. }
88. }

90. @Entry
91. @Component
92. struct MyNavigationTestStack {
93. @Provide('pageInfo') pageInfo: NavPathStack = new NavPathStack();

95. @Builder
96. PageMap(name: string) {
97. if (name === 'pageOne') {
98. PageOneStack()
99. } else if (name === 'pageTwo') {
100. PageTwoStack()
101. }
102. }

104. build() {
105. Column() {
106. Navigation(this.pageInfo) {
107. Column() {
108. Button('Next Page', { stateEffect: true, type: ButtonType.Capsule })
109. .width('80%')
110. .height(40)
111. .margin(20)
112. .onClick(() => {
113. this.pageInfo.pushPath({ name: 'pageOne' }); // 将name指定的NavDestination页面信息入栈
114. })
115. }
116. }.title('NavIndex')
117. .navDestination(this.PageMap)
118. .mode(NavigationMode.Stack)
119. }
120. }
121. }

123. @Component
124. struct PageOneStack {
125. @Consume('pageInfo') pageInfo: NavPathStack;

127. build() {
128. NavDestination() {
129. Column() {
130. TabsComponent()
131. Button('Next Page', { stateEffect: true, type: ButtonType.Capsule })
132. .width('80%')
133. .height(40)
134. .margin(20)
135. .onClick(() => {
136. this.pageInfo.pushPathByName('pageTwo', null);
137. })
138. }.width('100%').height('100%')
139. }.title('pageOne')
140. .onBackPressed(() => {
141. this.pageInfo.pop();
142. return true;
143. })
144. }
145. }

147. @Component
148. struct PageTwoStack {
149. @Consume('pageInfo') pageInfo: NavPathStack;

151. build() {
152. NavDestination() {
153. Column() {
154. Button('Back Page', { stateEffect: true, type: ButtonType.Capsule })
155. .width('80%')
156. .height(40)
157. .margin(20)
158. .onClick(() => {
159. this.pageInfo.pop();
160. })
161. }.width('100%').height('100%')
162. }.title('pageTwo')
163. .onBackPressed(() => {
164. this.pageInfo.pop();
165. return true;
166. })
167. }
168. }
```

[ComponentMixing.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/CustomComponentsFreeze/entry/src/main/ets/View/ComponentMixing.ets#L15-L185)

代码运行结果图如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b3/v3/nZ25HIgGRKeh46loH55wnA/zh-cn_image_0000002540770866.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=3A2EF1EB8171521BF01E4A91D87EFD0B8473DB60837273CC09525F3FE23E7CBC)

点击Next Page，进入pageOne页面，页面中存在两个tab标签，默认在Update标签，开启组件冻结功能，Tabcontent的标签如果未被选中，状态变量不会刷新，如以下操作。

点击Incr state，日志中查询Appmonitor，存在3个打印。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6c/v3/LRWhM8anR5KhGVR-_8fpQA/zh-cn_image_0000002571291161.png?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=FF30A00E2908868130C88700FBBD61F918751F4D833907B7C0557FEE9F5013EA)

切换到DelayUpdate标签，点击Incr state，日志中查询Appmonitor，存在2个打印。DelayUpdate中状态变量不会刷新与Update标签中相关的状态变量。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5d/v3/T5j2RFMRR4GslDRlRp3EfQ/zh-cn_image_0000002540611216.png?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=A2050CAA628463C90128F973142EC9AA90DC6FFE9C88A6995F962BBC534206CC)

在API version 17及以下：

点击Next page进入下一个页面并返回，标签默认在DelayUpdate，再次点击Incr state，日志中查询Appmonitor，存在4个打印，页面路由返回时，会解冻Tabcontent所有的标签。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d0/v3/SMAY8I3bR5iSYnCRclHITw/zh-cn_image_0000002571171211.png?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=A6A8F6E38F2C3C2725B50F21A2AE6AFB100A1833902D947764A20CE22F2AFC57)

在API version 18及以上：

点击Next page进入下一个页面并返回，标签默认在DelayUpdate，再次点击Incr state，日志中查询Appmonitor，存在2个打印，页面路由返回时，只会解冻对应标签的节点。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/53/v3/Mmm-BbJxSp-a-aN24Am4yA/zh-cn_image_0000002540770868.png?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=28F4FE5FBC41F3C0B7263B06DA9624FE6841C9DAD3A41760E06BFE747741491B)

**页面和LazyForEach**

Navigation和TabContent混用时，之所以会解锁TabContent标签的子节点，是因为回到前一个页面时会从父组件开始递归解冻子组件，与此行为类似的还有页面生命周期：OnPageShow。OnPageShow会将当前Page中的根节点设置为active状态，TabContent作为页面的子节点，也会被设置为active状态。在屏幕灭屏和屏幕亮屏时会分别触发页面的生命周期：OnPageHide和OnPageShow，因此页面中使用LazyForEach时，手动灭屏和亮屏也能实现页面路由一样的效果，如以下示例代码：

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. const DOMAIN = 0x0001;
3. const TAG = 'FreezeChild';

5. // 用于处理数据监听的IDataSource的基本实现
6. class BasicDataSource implements IDataSource {
7. private listeners: DataChangeListener[] = [];
8. private originDataArray: string[] = [];

10. public totalCount(): number {
11. return 0;
12. }

14. public getData(index: number): string {
15. return this.originDataArray[index];
16. }

18. // 该方法为框架侧调用，为LazyForEach组件向其数据源处添加listener监听
19. registerDataChangeListener(listener: DataChangeListener): void {
20. if (this.listeners.indexOf(listener) < 0) {
21. hilog.info(DOMAIN, TAG, 'add listener');
22. this.listeners.push(listener);
23. }
24. }

26. // 该方法为框架侧调用，为对应的LazyForEach组件在数据源处去除listener监听
27. unregisterDataChangeListener(listener: DataChangeListener): void {
28. const pos = this.listeners.indexOf(listener);
29. if (pos >= 0) {
30. hilog.info(DOMAIN, TAG, 'remove listener');
31. this.listeners.splice(pos, 1);
32. }
33. }

35. // 通知LazyForEach组件需要重载所有子组件
36. notifyDataReload(): void {
37. this.listeners.forEach(listener => {
38. listener.onDataReloaded();
39. })
40. }

42. // 通知LazyForEach组件需要在index对应索引处添加子组件
43. notifyDataAdd(index: number): void {
44. this.listeners.forEach(listener => {
45. listener.onDataAdd(index);
46. })
47. }

49. // 通知LazyForEach组件在index对应索引处数据有变化，需要重建该子组件
50. notifyDataChange(index: number): void {
51. this.listeners.forEach(listener => {
52. listener.onDataChange(index);
53. })
54. }

56. // 通知LazyForEach组件需要在index对应索引处删除该子组件
57. notifyDataDelete(index: number): void {
58. this.listeners.forEach(listener => {
59. listener.onDataDelete(index);
60. })
61. }

63. // 通知LazyForEach组件将from索引和to索引处的子组件进行交换
64. notifyDataMove(from: number, to: number): void {
65. this.listeners.forEach(listener => {
66. listener.onDataMove(from, to);
67. })
68. }
69. }

71. class MyDataSource extends BasicDataSource {
72. private dataArray: string[] = [];

74. public totalCount(): number {
75. return this.dataArray.length;
76. }

78. public getData(index: number): string {
79. return this.dataArray[index];
80. }

82. public addData(index: number, data: string): void {
83. this.dataArray.splice(index, 0, data);
84. this.notifyDataAdd(index);
85. }

87. public pushData(data: string): void {
88. this.dataArray.push(data);
89. this.notifyDataAdd(this.dataArray.length - 1);
90. }
91. }

93. @Reusable
94. @Component({ freezeWhenInactive: true })
95. struct ChildComponent {
96. @State desc: string = '';
97. @Link @Watch('sumChange') sum: number;

99. sumChange() {
100. hilog.info(DOMAIN, TAG, `sum: Change ${this.sum}`);
101. }

103. aboutToReuse(params: Record<string, Object>): void {
104. this.desc = params.desc as string;
105. this.sum = params.sum as number;
106. }

108. aboutToRecycle(): void {
109. hilog.info(DOMAIN, TAG, `ChildComponent has been recycled`);
110. }

112. build() {
113. Column() {
114. Divider()
115. .color('#ff11acb8')
116. Text(`subcomponent: ${this.desc}`)
117. .fontSize(30)
118. .fontWeight(30)
119. Text(`${this.sum}`)
120. .fontSize(30)
121. .fontWeight(30)
122. }
123. }
124. }

126. @Entry
127. @Component({ freezeWhenInactive: true })
128. struct Page {
129. private data: MyDataSource = new MyDataSource();
130. @State sum: number = 0;
131. @State desc: string = '';

133. aboutToAppear() {
134. for (let index = 0; index < 20; index++) {
135. this.data.pushData(index.toString());
136. }
137. }

139. build() {
140. Column() {
141. Button(`add sum`).onClick(() => {
142. this.sum++;
143. })
144. .fontSize(30)
145. .margin(20)
146. List() {
147. LazyForEach(this.data, (item: string) => {
148. ListItem() {
149. ChildComponent({ desc: item, sum: this.sum })
150. }
151. .width('100%')
152. .height(100)
153. }, (item: string) => item)
154. }.cachedCount(5)
155. }
156. .height('100%')
157. .width('100%')
158. }
159. }
```

[ComponentMixing1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/CustomComponentsFreeze/entry/src/main/ets/View/ComponentMixing1.ets#L15-L175)

在组件复用场景中，已经对LazyForEach的节点进行了详细说明，分为屏上节点和cachedCount节点。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c2/v3/5mbaTFoeRLet6Llvxd8NIA/zh-cn_image_0000002571291163.png?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=D051FD487819454133A1B5A8791A9109600772740D774C4ED71E9E68BF9E4E9D)

向下滑动LazyForEach，让cachedCount补充节点，点击add sum，搜索打印日志：sum: Change，出现了8条打印。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b1/v3/kfvTFA2tR7Kok0H5H4_ESA/zh-cn_image_0000002540611218.png?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=DC35760B79886C1FE0B919046E5E776F6CC3479729A1DE2CAFFDF989B803DCB7)

在API version 17及以下：

灭屏之后亮屏，触发OnPageShow，点击add sum，打印数量为屏上节点与cachedCount数量的总和。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cc/v3/zbqn9O1oSl-W9ky28GCKyg/zh-cn_image_0000002571171213.png?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=A6BF25CBF4F3831245830BC497AEDA04160766B72E4BD6D5237C31D6EFDC324F)

从API version 18开始：

灭屏之后亮屏，触发OnPageShow，点击add sum，只会打印屏上节点数量，不会再解冻cachedCount中的节点。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e3/v3/CA8yCtPgQWa7wG8hBQyYfw/zh-cn_image_0000002540770870.png?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=C8EF207724A4EBE2577F1C3BED4986DA99A3055AEF060FDC1432EF86069142D1)

## 限制条件

### BuilderNode无法继承父组件冻结

在API version 20之前，BuilderNode无法继承父组件冻结。如下面的例子所示，FreezeBuildNode中使用了自定义节点[BuilderNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-buildernode)。BuilderNode可以通过命令式动态挂载组件，而组件冻结又是强依赖父子关系来通知是否开启组件冻结。如果父组件使用组件冻结，且组件树的中间层级上又启用了BuilderNode，则BuilderNode的子组件将无法被冻结。

在API version 20及以后，开发者可以通过配置BuilderNode的inheritFreezeOptions接口为true，实现BuilderNode继承冻结的能力。具体示例见[BuilderNode对象继承组件冻结](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-buildernode#inheritfreezeoptions20)。

收起

自动换行

深色代码主题

复制

```
1. import { BuilderNode, FrameNode, NodeController, UIContext } from '@kit.ArkUI';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. const DOMAIN = 0x0001;
4. const TAG = 'FreezeChild';

6. // 定义一个Params类，用于传递参数
7. class Params {
8. public index: number = 0;

10. constructor(index: number) {
11. this.index = index;
12. }
13. }

15. // 定义一个BuildNodeChild组件，它包含一个message属性和一个index属性
16. @Component
17. struct BuildNodeChild {
18. @StorageProp('buildNodeTest') @Watch('onMessageUpdated') message: string = 'hello world';
19. @State index: number = 0;

21. // 当message更新时，调用此方法
22. onMessageUpdated() {
23. hilog.info(DOMAIN, TAG, `FreezeBuildNode builderNodeChild message callback func ${this.message},index:${this.index}`);
24. }

26. build() {
27. Text(`buildNode Child message: ${this.message}`).fontSize(30)
28. }
29. }

31. // 定义一个buildText函数，它接收一个Params参数并构建一个Column组件
32. @Builder
33. function buildText(params: Params) {
34. Column() {
35. BuildNodeChild({ index: params.index })
36. }
37. }

39. // 定义一个TextNodeController类，继承自NodeController
40. class TextNodeController extends NodeController {
41. private textNode: BuilderNode<[Params]> | null = null;
42. private index: number = 0;

44. // 构造函数接收一个index参数
45. constructor(index: number) {
46. super();
47. this.index = index;
48. }

50. // 创建并返回一个FrameNode
51. makeNode(context: UIContext): FrameNode | null {
52. this.textNode = new BuilderNode(context);
53. this.textNode.build(wrapBuilder<[Params]>(buildText), new Params(this.index));
54. return this.textNode.getFrameNode();
55. }
56. }

58. // 定义一个Index组件，它包含一个message属性和一个data数组
59. @Entry
60. @Component
61. struct Index {
62. @StorageLink('buildNodeTest') message: string = 'hello';
63. private data: number[] = [0, 1];

65. build() {
66. Row() {
67. Column() {
68. Button('change').fontSize(30)
69. .onClick(() => {
70. this.message += 'a';
71. })
72. Tabs() {
73. ForEach(this.data, (item: number) => {
74. TabContent() {
75. FreezeBuildNode({ index: item })
76. }.tabBar(`tab${item}`)
77. }, (item: number) => item.toString())
78. }
79. }
80. }
81. .width('100%')
82. .height('100%')
83. }
84. }

86. // 定义一个FreezeBuildNode组件，它包含一个message属性和一个index属性
87. @Component({ freezeWhenInactive: true })
88. struct FreezeBuildNode {
89. @StorageProp('buildNodeTest') @Watch('onMessageUpdated') message: string = '1111';
90. @State index: number = 0;

92. // 当message更新时，调用此方法
93. onMessageUpdated() {
94. hilog.info(DOMAIN, TAG, `FreezeBuildNode message callback func ${this.message}, index: ${this.index}`);
95. }

97. build() {
98. NodeContainer(new TextNodeController(this.index))
99. .width('100%')
100. .height('100%')
101. .backgroundColor('#FFF0F0F0')
102. }
103. }
```

[Constraints.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/CustomComponentsFreeze/entry/src/main/ets/View/Constraints.ets#L15-L119)

在上面的示例中：

点击change，改变message的值，当前正在显示的TabContent组件中@Watch注册的方法onMessageUpdated被触发。未显示的TabContent中的BuilderNode节点下组件的@Watch方法onMessageUpdated也被触发，并没有被冻结。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b8/v3/xBS59m-VQ4G62kn_GbFbeA/zh-cn_image_0000002571291165.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034223Z&HW-CC-Expire=86400&HW-CC-Sign=3ECADB90E3B96060134B1A1D1D87262E2C1CB5CE3524F786FC35D9C604C636DD)

### 组件冻结与组件复用混用时解冻不会触发Watch

在以下示例中，子组件ChildComponent开启了组件冻结且被标记了组件复用，当if组件绑定的状态变量condition修改为false时，子组件ChildComponent下树并进入复用池。由于子组件开启了组件冻结，所以进入复用池时，该组件也会被冻结。在复用池内，若修改状态变量count，该组件因处于inactive状态，即不会刷新也不会触发Watch回调。

当if组件绑定的状态变量condition修改为true时，子组件ChildComponent出复用池并被标记为active状态，但不会触发状态变量count绑定的Watch回调。这是因为组件复用的执行逻辑早于组件解冻的执行逻辑。子组件被复用时会将[脏节点刷新](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-state-management-introduce#触发更新)（包括在冻结期间需要延迟刷新的[变量绑定的系统组件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-state-management-introduce#收集依赖)），并清空脏节点列表。在子组件被复用后，重新被标记为active状态，此时子组件执行解冻逻辑，由于复用时清空了脏节点列表，所以此时判断冻结期间无变量改变，不会触发Watch回调。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const DOMAIN = 0x0001;
4. const TAG = 'FreezeChild';

6. @Reusable
7. @Component({ freezeWhenInactive: true })
8. struct ChildComponent {
9. @Link @Watch('onChange') count: number;

11. onChange() {
12. hilog.info(DOMAIN, TAG, `ChildComponent messageChange ${this.count}`);
13. }

15. aboutToReuse(params: Record<string, ESObject>): void {
16. // 在aboutToReuse中改值，解冻时同样不会触发Watch回调
17. this.count++;
18. hilog.info(DOMAIN, TAG, `ChildComponent has been reused`);
19. }

21. aboutToRecycle(): void {
22. hilog.info(DOMAIN, TAG, `ChildComponent has been recycled`);
23. }

25. build() {
26. Column() {
27. Text(`ChildComponent count: ${this.count}`)
28. .fontSize(20)
29. }
30. }
31. }

33. @Entry
34. @Component
35. struct Index {
36. @State flag: boolean = true;
37. @State count: number = 0;

39. build() {
40. Column() {
41. Button(`change flag`)
42. .onClick(() => {
43. this.flag = !this.flag;
44. })
45. .margin(10)
46. .width('50%')
47. Button(`change count`)
48. .onClick(() => {
49. this.count++;
50. })
51. .margin(10)
52. .width('50%')
53. if (this.flag) {
54. ChildComponent({ count: this.count })
55. }
56. }
57. .height('100%')
58. }
59. }
```

[FreezeReuse.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/CustomComponentsFreeze/entry/src/main/ets/View/FreezeReuse.ets#L15-L75)