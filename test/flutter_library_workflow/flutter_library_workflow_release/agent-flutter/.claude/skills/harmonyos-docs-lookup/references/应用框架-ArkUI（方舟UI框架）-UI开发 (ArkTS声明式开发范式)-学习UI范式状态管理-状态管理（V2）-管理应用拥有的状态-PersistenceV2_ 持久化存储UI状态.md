为了增强状态管理框架对持久化存储UI的能力，开发者可以使用PersistenceV2存储持久化的数据。

PersistenceV2是应用程序中的可选单例对象。此对象的作用是持久化存储UI相关的数据，以确保这些属性在应用程序重新启动时的值与应用程序关闭时的值相同。

PersistenceV2提供状态变量持久化能力，开发者可以通过connect或者globalConnect绑定同一个key，在状态变量变化和应用冷启动时，实现持久化能力。

在阅读本文档前，建议提前阅读：[@ComponentV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-create-custom-components#componentv2)，[@ObservedV2和@Trace](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-observedv2-and-trace)，配合阅读：[PersistenceV2-API文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-statemanagement#persistencev2)。

说明

PersistenceV2从API version 12开始支持。

globalConnect从API version 18开始支持，行为和connect保持一致，唯一的区别为connect的底层存储路径为module级别的路径，而globalConnect的底层存储路径为应用级别，详细区别见使用场景[在不同的module中使用connect和globalConnect](/consumer/cn/doc/harmonyos-guides/arkts-new-persistencev2#在不同的module中使用connect和globalconnect)。

## 概述

PersistenceV2是在应用UI启动时会被创建的单例。它的目的是提供应用状态数据的中心存储，这些状态数据在应用级别都是可访问的。数据通过唯一的键值字符串访问。不同于AppStorageV2，PersistenceV2还将最新数据存储在设备磁盘上（持久化）。这意味着，应用退出再次启动后，依然能保存选定的结果。

对于与PersistenceV2关联的[@ObservedV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-observedv2-and-trace)对象，该对象的[@Trace](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-observedv2-and-trace)属性的变化，会触发**整个关联对象的自动持久化**；非[@Trace](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-observedv2-and-trace)属性的变化则不会，如有必要，可调用PersistenceV2 API手动持久化。请注意：被PersistenceV2持久化的类属性必须要有初值，否则不支持持久化。

PersistenceV2可以和UI组件同步，且可以在应用业务逻辑中被访问。

PersistenceV2支持应用的[主线程](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/thread-model-stage)内多个UIAbility实例间的状态共享。

## 使用说明

* connect：创建或获取存储的数据。

说明

1、关联[@Observed](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-observed-and-objectlink)对象时，由于该类型的name属性未定义，需要指定key或者自定义name属性。

2、数据存储路径为module级别，即哪个module调用了connect，数据副本存入对应module的持久化文件中。如果多个module使用相同的key，则数据为最先使用connect的module，并且PersistenceV2中的数据也会存入最先使用connect的module里。

3、因为存储路径在应用第一个ability启动时就已确定，为该ability所属的module。如果一个ability调用了connect，并且该ability能被不同的module拉起， 那么ability存在多少种启动方式，就会有多少份数据副本。

* globalConnect：创建或获取存储的数据。
* remove：删除指定key的存储数据。删除PersistenceV2中不存在的key会报警告。
* keys：返回所有PersistenceV2中的key。包括module级别存储路径和应用级别存储路径中的所有key。
* save：手动持久化数据。
* notifyOnError：响应序列化或反序列化失败的回调。将数据存入磁盘时，需要对数据进行序列化；当某个key序列化失败时，错误是不可预知的；可调用该接口捕获异常。

以上接口详细描述请参考[状态管理API指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-statemanagement)。

## 使用限制

1、需要配合UI使用（UI线程），不能在其他线程使用，如不支持@Sendable。

2、不支持collections.Set、collections.Map等类型。

3、不支持非built-in类型，如[PixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap)、NativePointer、[ArrayList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arraylist)等Native类型。

4、单个key支持数据大小约8k，过大会导致持久化失败。

5、持久化的数据必须是class对象，不支持容器类型（如Array、Set、Map），不支持built-in的构造对象（如Date、Number），不支持持久化基本类型（如string、number、boolean）。如果需要持久化非class对象，建议使用[Preferences](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/preferences-guidelines)进行数据持久化。

6、不支持循环引用的对象。

7、只有[@Trace](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-observedv2-and-trace)的数据改变会触发自动持久化，如V1状态变量、[@Observed](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-observed-and-objectlink)对象、普通数据的改变不会触发持久化。

8、不宜大量持久化数据，可能会导致页面卡顿。

9、connect和globalConnect不建议混用，如果混用，key不能一样，否则应用crash。

10、PersistenceV2必须与UI实例关联，持久化操作需在UI实例初始化完成后调用（即[loadContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-windowstage#loadcontent9)回调触发后）。

收起

自动换行

深色代码主题

复制

```
1. // EntryAbility.ets
2. // 以下为代码片段，需要开发者自己在EntryAbility.ets中补全
3. import { PersistenceV2 } from '@kit.ArkUI';

5. // 在EntryAbility外部定义class
6. @ObservedV2
7. class Storage {
8. @Trace isPersist: boolean = false;
9. }

11. // 在onWindowStageCreate的loadContent回调中调用PersistenceV2
12. onWindowStageCreate(windowStage: window.WindowStage): void {
13. windowStage.loadContent('pages/Index', (err) => {
14. if (err.code) {
15. return;
16. }
17. PersistenceV2.connect(Storage, () => new Storage());
18. });
19. }
```

11、如果开发者对数据持久化能力有较强的诉求，例如持久化时机，建议使用[Preferences](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/preferences-guidelines)进行数据持久化。注意：不允许混用PersistenceV2和Preferences，因为Preferences存储的数据不会有状态变量信息，反序列化的数据不能触发PersistenceV2的自动化存储。

## 使用场景

### 在两个页面之间存储数据

数据页面

收起

自动换行

深色代码主题

复制

```
1. // Sample.ets
2. import { Type } from '@kit.ArkUI';

4. // 数据中心
5. @ObservedV2
6. class SampleChild {
7. @Trace public p1: number = 0;
8. public p2: number = 10;
9. }

11. @ObservedV2
12. export class Sample {
13. // 对于复杂对象需要@Type修饰，确保序列化成功
14. @Type(SampleChild)
15. @Trace public f: SampleChild = new SampleChild();
16. }
```

[Sample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateManagement/entry/src/main/ets/pages/persistenceV2/Sample.ets#L16-L34)

页面1

收起

自动换行

深色代码主题

复制

```
1. // Page1.ets
2. import { PersistenceV2 } from '@kit.ArkUI';
3. import { Sample } from '../Sample';
4. import { hilog } from '@kit.PerformanceAnalysisKit';

6. const DOMAIN = 0x0000;

8. // 接受序列化失败的回调
9. PersistenceV2.notifyOnError((key: string, reason: string, msg: string) => {
10. hilog.error(DOMAIN, 'testTag', '%{public}s', `error key: ${key}, reason: ${reason}, message: ${msg}`);
11. });

13. @Entry
14. @ComponentV2
15. struct Page1 {
16. // 在PersistenceV2中创建一个key为Sample的键值对（如果存在，则返回PersistenceV2中的数据），并且和prop关联
17. // 对于需要换connect对象的prop属性，需要加@Local修饰（不建议对属性换connect的对象）
18. @Local prop: Sample = PersistenceV2.connect(Sample, () => new Sample())!;
19. pageStack: NavPathStack = new NavPathStack();

21. build() {
22. Navigation(this.pageStack) {
23. Column() {
24. Button('Go to page2')
25. .onClick(() => {
26. this.pageStack.pushPathByName('Page2', null);
27. })

29. Button('Page1 connect the key Sample')
30. .onClick(() => {
31. // 在PersistenceV2中创建一个key为Sample的键值对（如果存在，则返回PersistenceV2中的数据），并且和prop关联
32. // 不建议对prop属性换connect的对象
33. this.prop = PersistenceV2.connect(Sample, 'Sample', () => new Sample())!;
34. })

36. Button('Page1 remove the key Sample')
37. .onClick(() => {
38. // 从PersistenceV2中删除后，prop将不会再与key为Sample的值关联
39. PersistenceV2.remove(Sample);
40. })

42. Button('Page1 save the key Sample')
43. .onClick(() => {
44. // 如果处于connect状态，持久化key为Sample的键值对
45. PersistenceV2.save(Sample);
46. })

48. Text(`Page1 add 1 to prop.p1: ${this.prop.f.p1}`)
49. .fontSize(30)
50. .onClick(() => {
51. this.prop.f.p1++;
52. })

54. Text(`Page1 add 1 to prop.p2: ${this.prop.f.p2}`)
55. .fontSize(30)
56. .onClick(() => {
57. // 页面不刷新，但是p2的值改变了
58. this.prop.f.p2++;
59. })

61. // 获取当前PersistenceV2里面的所有key
62. Text(`all keys in PersistenceV2: ${PersistenceV2.keys()}`)
63. .fontSize(30)
64. }
65. }
66. }
67. }
```

[Page1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateManagement/entry/src/main/ets/pages/persistenceV2/page/Page1.ets#L16-L84)

页面2

收起

自动换行

深色代码主题

复制

```
1. // Page2.ets
2. import { PersistenceV2 } from '@kit.ArkUI';
3. import { Sample } from '../Sample';

5. @Builder
6. export function Page2Builder() {
7. Page2()
8. }

10. @ComponentV2
11. struct Page2 {
12. // 在PersistenceV2中创建一个key为Sample的键值对（如果存在，则返回PersistenceV2中的数据），并且和prop关联
13. // 对于需要换connect对象的prop属性，需要加@Local修饰（不建议对属性换connect的对象）
14. @Local prop: Sample = PersistenceV2.connect(Sample, () => new Sample())!;
15. pathStack: NavPathStack = new NavPathStack();

17. build() {
18. NavDestination() {
19. Column() {
20. Button('Page2 connect the key Sample1')
21. .onClick(() => {
22. // 在PersistenceV2中创建一个key为Sample1的键值对（如果存在，则返回PersistenceV2中的数据），并且和prop关联
23. // 不建议对prop属性换connect的对象
24. this.prop = PersistenceV2.connect(Sample, 'Sample1', () => new Sample())!;
25. })

27. Text(`Page2 add 1 to prop.p1: ${this.prop.f.p1}`)
28. .fontSize(30)
29. .onClick(() => {
30. this.prop.f.p1++;
31. })

33. Text(`Page2 add 1 to prop.p2: ${this.prop.f.p2}`)
34. .fontSize(30)
35. .onClick(() => {
36. // 页面不刷新，但是p2的值改变了；只有重新初始化才会改变
37. this.prop.f.p2++;
38. })

40. // 获取当前PersistenceV2里面的所有key
41. Text(`all keys in PersistenceV2: ${PersistenceV2.keys()}`)
42. .fontSize(30)
43. }
44. }
45. .onReady((context: NavDestinationContext) => {
46. this.pathStack = context.pathStack;
47. })
48. }
49. }
```

[Page2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateManagement/entry/src/main/ets/pages/persistenceV2/page/Page2.ets#L16-L66)

使用Navigation时，需要添加配置系统路由表文件src/main/resources/base/profile/route\_map.json，并替换pageSourceFile为Page2页面的路径，并且在module.json5中添加："routerMap": "$profile:route\_map"。

收起

自动换行

深色代码主题

复制

```
1. {
2. "routerMap": [
3. {
4. "name": "Page2",
5. "pageSourceFile": "src/main/ets/pages/Page2.ets",
6. "buildFunction": "Page2Builder",
7. "data": {
8. "description" : "PersistenceV2 example"
9. }
10. }
11. ]
12. }
```

### 使用globalConnect存储数据

收起

自动换行

深色代码主题

复制

```
1. import { PersistenceV2, Type, ConnectOptions } from '@kit.ArkUI';
2. import { contextConstant } from '@kit.AbilityKit';
3. import { hilog } from '@kit.PerformanceAnalysisKit';

5. const DOMAIN = 0x0000;
6. // 接受序列化失败的回调
7. PersistenceV2.notifyOnError((key: string, reason: string, msg: string) => {
8. hilog.error(DOMAIN, 'testTag', '%{public}s', `error key: ${key}, reason: ${reason}, message: ${msg}`);
9. });

11. @ObservedV2
12. class SampleChild {
13. @Trace public childId: number = 0;
14. public groupId: number = 1;
15. }

17. @ObservedV2
18. export class SampleGlobalConnect {
19. // 对于复杂对象需要@Type修饰，确保序列化成功
20. @Type(SampleChild)
21. @Trace public father: SampleChild = new SampleChild();
22. }

24. @Entry
25. @ComponentV2
26. struct Page1 {
27. @Local refresh: number = 0;
28. // key不传入尝试用为type的name作为key，加密参数不传入默认加密等级为EL2
29. @Local p: SampleGlobalConnect =
30. PersistenceV2.globalConnect({ type: SampleGlobalConnect, defaultCreator: () => new SampleGlobalConnect() })!;
31. // 使用key:global1连接，传入加密等级为EL1
32. @Local p1: SampleGlobalConnect = PersistenceV2.globalConnect({
33. type: SampleGlobalConnect,
34. key: 'global1',
35. defaultCreator: () => new SampleGlobalConnect(),
36. areaMode: contextConstant.AreaMode.EL1
37. })!;
38. // 使用key:global2连接，使用构造函数形式，加密参数不传入默认加密等级为EL2
39. options: ConnectOptions<SampleGlobalConnect> =
40. { type: SampleGlobalConnect, key: 'global2', defaultCreator: () => new SampleGlobalConnect() };
41. @Local p2: SampleGlobalConnect = PersistenceV2.globalConnect(this.options)!;
42. // 使用key:global3连接，直接写加密数值，范围只能在0-4，否则运行会crash,例如加密设置为EL3
43. @Local p3: SampleGlobalConnect = PersistenceV2.globalConnect({
44. type: SampleGlobalConnect,
45. key: 'global3',
46. defaultCreator: () => new SampleGlobalConnect(),
47. areaMode: 3
48. })!;

50. build() {
51. Column() {
52. // 显示数据
53. // 被@Trace修饰的数据可以自动持久化进磁盘
54. Text('Key SampleGlobalConnect: ' + this.p.father.childId.toString())
55. .onClick(() => {
56. this.p.father.childId += 1;
57. })
58. .fontSize(25)
59. .fontColor(Color.Red)
60. Text('Key global1: ' + this.p1.father.childId.toString())
61. .onClick(() => {
62. this.p1.father.childId += 1;
63. })
64. .fontSize(25)
65. .fontColor(Color.Red)
66. Text('Key global2: ' + this.p2.father.childId.toString())
67. .onClick(() => {
68. this.p2.father.childId += 1;
69. })
70. .fontSize(25)
71. .fontColor(Color.Red)
72. Text('Key global3: ' + this.p3.father.childId.toString())
73. .onClick(() => {
74. this.p3.father.childId += 1;
75. })
76. .fontSize(25)
77. .fontColor(Color.Red)
78. // keys接口
79. // keys本身不会刷新，需要借助状态变量刷新
80. Text('Persist keys: ' + PersistenceV2.keys().toString() + ' refresh: ' + this.refresh)
81. .onClick(() => {
82. this.refresh += 1;
83. })
84. .fontSize(25)

86. // remove接口
87. Text('Remove key SampleGlobalConnect: ' + 'refresh: ' + this.refresh)
88. .onClick(() => {
89. // 删除这个key，会导致和p失去联系，之后即使reconnect，p也无法存储
90. PersistenceV2.remove(SampleGlobalConnect);
91. this.refresh += 1;
92. })
93. .fontSize(25)
94. Text('Remove key global1: ' + 'refresh: ' + this.refresh)
95. .onClick(() => {
96. // 删除这个key，会导致和p1失去联系，之后即使reconnect，p1也无法存储
97. PersistenceV2.remove('global1');
98. this.refresh += 1;
99. })
100. .fontSize(25)
101. Text('Remove key global2: ' + 'refresh: ' + this.refresh)
102. .onClick(() => {
103. // 删除这个key，会导致和p2失去联系，之后即使reconnect，p2也无法存储
104. PersistenceV2.remove('global2');
105. this.refresh += 1;
106. })
107. .fontSize(25)
108. Text('Remove key global3: ' + 'refresh: ' + this.refresh)
109. .onClick(() => {
110. // 删除这个key，会导致和p3失去联系，之后即使reconnect，p3也无法存储
111. PersistenceV2.remove('global3');
112. this.refresh += 1;
113. })
114. .fontSize(25)
115. // reConnect
116. // 重新连接也无法和之前的状态变量建立联系，因此无法保存数据
117. Text('ReConnect key global2: ' + 'refresh: ' + this.refresh)
118. .onClick(() => {
119. // 此时会重新存储一个key为global2的变量，但该变量与p2无关
120. PersistenceV2.globalConnect(this.options);
121. this.refresh += 1;
122. })
123. .fontSize(25)

125. // save接口
126. Text('not save key SampleGlobalConnect: ' + this.p.father.groupId.toString() + ' refresh: ' + this.refresh)
127. .onClick(() => {
128. // 未被@Trace保存的对象无法自动存储
129. this.p.father.groupId += 1;
130. this.refresh += 1;
131. })
132. .fontSize(25)
133. Text('save key SampleGlobalConnect: ' + this.p.father.groupId.toString() + ' refresh: ' + this.refresh)
134. .onClick(() => {
135. // 未被@Trace保存的对象无法自动存储，需要调用save存储
136. this.p.father.groupId += 1;
137. PersistenceV2.save(SampleGlobalConnect);
138. this.refresh += 1;
139. })
140. .fontSize(25)
141. }
142. .width('100%')
143. }
144. }
```

[PersistenceV2GlobalConnect.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateManagement/entry/src/main/ets/pages/persistenceV2/PersistenceV2GlobalConnect.ets#L15-L160)

### 在不同的module中使用connect和globalConnect

**connect的存储路径需要注意以下两点：**

1、connect使用module级别的存储路径，以最先启动的module的路径作为存储路径，从内存回写磁盘时会回写到第一个连接该module的路径。应用如果之后先从另一个module启动，则会以新module的路径作为存储路径。

2、当不同module使用相同的key时，哪个module先启动，数据就为哪个module中保存的键值对，回写到对应的module中。

**globalConnect的存储路径需要注意：**

globalConnect虽然是应用级别的路径，但是可以设置不同的加密分区，不同加密分区即代表不同的存储路径。connect不支持设置加密分区，但是module自身切换加密级别时，module存储路径也会切换成对应加密分区路径。

示例代码如下：开发者需要在项目基础上，新建一个module，并按照示例代码跳转到新module中。

收起

自动换行

深色代码主题

复制

```
1. // 模块1
2. import { PersistenceV2, Type } from '@kit.ArkUI';
3. import { common, Want } from '@kit.AbilityKit';
4. import { hilog } from '@kit.PerformanceAnalysisKit';
5. import { contextConstant } from '@kit.AbilityKit';

7. const DOMAIN = 0x0000;

9. // 接受序列化失败的回调
10. PersistenceV2.notifyOnError((key: string, reason: string, msg: string) => {
11. hilog.error(DOMAIN, 'testTag', '%{public}s', `error key: ${key}, reason: ${reason}, message: ${msg}`);
12. });

14. @ObservedV2
15. class SampleChild {
16. @Trace public childId: number = 0;
17. public groupId: number = 1;
18. }

20. @ObservedV2
21. export class Sample {
22. // 对于复杂对象需要@Type修饰，确保序列化成功
23. @Type(SampleChild)
24. @Trace public father: SampleChild = new SampleChild();
25. }

27. @Entry
28. @ComponentV2
29. struct Page1 {
30. @Local refresh: number = 0;
31. // 使用key:globalConnect1连接，传入加密等级为EL1
32. @Local p1: Sample =
33. PersistenceV2.globalConnect({
34. type: Sample,
35. key: 'globalConnect1',
36. defaultCreator: () => new Sample(),
37. areaMode: contextConstant.AreaMode.EL1
38. })!;
39. // 使用key:connect2连接，使用构造函数形式，加密参数不传入默认加密等级为EL2
40. @Local p2: Sample = PersistenceV2.connect(Sample, 'connect2', () => new Sample())!;
41. private context = this.getUIContext().getHostContext() as common.UIAbilityContext;

43. build() {
44. Column() {
45. // 显示数据
46. Text('Key globalConnect1: ' + this.p1.father.childId.toString())
47. .onClick(() => {
48. this.p1.father.childId += 1;
49. })
50. .fontSize(25)
51. .fontColor(Color.Red)
52. Text('Key connect2: ' + this.p2.father.childId.toString())
53. .onClick(() => {
54. this.p2.father.childId += 1;
55. })
56. .fontSize(25)
57. .fontColor(Color.Red)

59. // 跳转
60. Button('Jump to newModule')
61. .onClick(() => { // 不同module之间使用，建议使用globalConnect
62. let want: Want = {
63. deviceId: '', // deviceId为空代表本设备
64. bundleName: 'com.samples.paradigmstatemanagement', // 在app.json5中查看
65. moduleName: 'demo', // 在需要跳转的module的module.json5中查看，非必选参数
66. abilityName: 'NewModuleAbility', // 跳转启动的ability，在需要跳转的module的module.json5中查看
67. uri: 'src/main/ets/pages/Index'
68. };
69. // context为调用方UIAbility的UIAbilityContext
70. this.context.startAbility(want).then(() => {
71. hilog.info(DOMAIN, 'testTag', '%{public}s', 'start ability success');
72. }).catch((err: Error) => {
73. hilog.error(DOMAIN, 'testTag', '%{public}s',
74. `start ability failed. code is ${err.name}, message is ${err.message}`);
75. });
76. })
77. }
78. .width('100%')
79. .borderWidth(3)
80. .borderColor(Color.Blue)
81. .margin({ top: 5, bottom: 5 })
82. }
83. }
```

[PersistenceV2ModuleConnectStorage1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateManagement/entry/src/main/ets/pages/persistenceV2/PersistenceV2ModuleConnectStorage1.ets#L16-L95)

收起

自动换行

深色代码主题

复制

```
1. // 模块2
2. import { PersistenceV2, Type } from '@kit.ArkUI';
3. import { hilog } from '@kit.PerformanceAnalysisKit';
4. import { contextConstant } from '@kit.AbilityKit';

6. const DOMAIN = 0x0000;
7. // 接受序列化失败的回调
8. PersistenceV2.notifyOnError((key: string, reason: string, msg: string) => {
9. hilog.error(DOMAIN, 'testTag', '%{public}s', `error key: ${key}, reason: ${reason}, message: ${msg}`);
10. });

12. @ObservedV2
13. class SampleChild {
14. @Trace public childId: number = 0;
15. public groupId: number = 1;
16. }

18. @ObservedV2
19. export class Sample {
20. // 对于复杂对象需要@Type修饰，确保序列化成功
21. @Type(SampleChild)
22. @Trace public father: SampleChild = new SampleChild();
23. }

25. @Entry
26. @ComponentV2
27. struct Page1 {
28. @Local a: number = 0;
29. // 使用key:globalConnect1连接，传入加密等级为EL1
30. @Local p1: Sample =
31. PersistenceV2.globalConnect({ type: Sample, key: 'globalConnect1', defaultCreator: () => new Sample(), areaMode: contextConstant.AreaMode.EL1 })!;
32. // 使用key:connect2连接，使用构造函数形式，加密参数不传入默认加密等级为EL2
33. @Local p2: Sample = PersistenceV2.connect(Sample, 'connect2', () => new Sample())!;

35. build() {
36. Column() {
37. // 显示数据
38. Text('Key globalConnect1: ' + this.p1.father.childId.toString())
39. .onClick(() => {
40. this.p1.father.childId += 1;
41. })
42. .fontSize(25)
43. .fontColor(Color.Red)
44. Text('Key connect2: ' + this.p2.father.childId.toString())
45. .onClick(() => {
46. this.p2.father.childId += 1;
47. })
48. .fontSize(25)
49. .fontColor(Color.Red)
50. }
51. .width('100%')
52. }
53. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateManagement/demo/src/main/ets/pages/Index.ets#L16-L70)

当开发者对newModule使用不同启动方式会有以下现象：

* 开发者直接启动newModule，分别修改globalConnect1和connect2绑定的变量，例如将childId都改成5。
* 应用退出并清空后台，启动模块entry，通过跳转按键启动newModule，会发现globalConnect1值为5，而connect2值为1未修改。
* globalConnect为应用级别存储，对于一个key，整个应用在对应加密分区只有一份存储路径；connect为module级别的存储路径，会因为module的启动方式不同而在各自的加密分区对应不同的存储路径。

## 使用建议

建议开发者使用新接口globalConnect创建和获取数据。globalConnect的存储规格和内存规格一致，对于应用只有一份，并且支持设置加密级别，不需要去切换ability的加密才能设置数据的加密级别。当然如果开发者应用不涉及多模块，保持使用connect也不会有影响。

### connect向globalConnect迁移实现

收起

自动换行

深色代码主题

复制

```
1. // 使用connect存储数据
2. import { PersistenceV2, Type } from '@kit.ArkUI';
3. import { hilog } from '@kit.PerformanceAnalysisKit';

5. const DOMAIN = 0x0000;

7. // 接受序列化失败的回调
8. PersistenceV2.notifyOnError((key: string, reason: string, msg: string) => {
9. hilog.error(DOMAIN, 'testTag', '%{public}s', `error key: ${key}, reason: ${reason}, message: ${msg}`);
10. });

12. @ObservedV2
13. class SampleChild {
14. @Trace public childId: number = 0;
15. public groupId: number = 1;
16. }

18. @ObservedV2
19. export class Sample {
20. // 对于复杂对象需要@Type修饰，确保序列化成功
21. @Type(SampleChild)
22. @Trace public father: SampleChild = new SampleChild();
23. }

25. @Entry
26. @ComponentV2
27. struct Page1 {
28. @Local refresh: number = 0;
29. // 使用key:connect3存储
30. @Local p: Sample = PersistenceV2.connect(Sample, 'connect3', () => new Sample())!;

32. build() {
33. Column({ space: 5 }) {
34. // 显示数据
35. Text('Key connect3: ' + this.p.father.childId.toString())
36. .onClick(() => {
37. this.p.father.childId += 1;
38. })
39. .fontSize(25)
40. .fontColor(Color.Red)

42. // save接口
43. // 未被@Trace装饰的变量需要借助状态变量refresh才能刷新
44. Text('save key connect3: ' + this.p.father.groupId.toString() + ' refresh:' + this.refresh)
45. .onClick(() => {
46. // 未被@Trace保存的对象无法自动存储，需要调用save存储
47. this.p.father.groupId += 1;
48. PersistenceV2.save('connect3');
49. this.refresh += 1;
50. })
51. .fontSize(25)
52. }
53. .width('100%')
54. }
55. }
```

[PersistenceV2ConnectMigration1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateManagement/entry/src/main/ets/pages/persistenceV2/PersistenceV2ConnectMigration1.ets#L16-L72)

收起

自动换行

深色代码主题

复制

```
1. // 迁移到globalConnect
2. import { PersistenceV2, Type } from '@kit.ArkUI';
3. import { hilog } from '@kit.PerformanceAnalysisKit';

5. const DOMAIN = 0x0000;

7. // 接受序列化失败的回调
8. PersistenceV2.notifyOnError((key: string, reason: string, msg: string) => {
9. hilog.error(DOMAIN, 'testTag', '%{public}s', `error key: ${key}, reason: ${reason}, message: ${msg}`);
10. });

12. @ObservedV2
13. class SampleChild {
14. @Trace public childId: number = 0;
15. public groupId: number = 1;
16. }

18. @ObservedV2
19. export class Sample {
20. // 对于复杂对象需要@Type修饰，确保序列化成功
21. @Type(SampleChild)
22. @Trace public father: SampleChild = new SampleChild();
23. }

25. // 用于判断是否完成数据迁移的辅助数据
26. @ObservedV2
27. class StorageState {
28. @Trace public isCompleteMoving: boolean = false;
29. }

31. function move() {
32. let movingState = PersistenceV2.globalConnect({ type: StorageState, defaultCreator: () => new StorageState() })!;
33. if (!movingState.isCompleteMoving) {
34. let p: Sample = PersistenceV2.connect(Sample, 'connect3', () => new Sample())!;
35. PersistenceV2.remove('connect3');
36. let p1 = PersistenceV2.globalConnect({ type: Sample, key: 'connect4', defaultCreator: () => p })!; // 使用默认构造函数也可以
37. // 赋值数据，@Trace修饰的会自动保存
38. p1.father = p.father;
39. // 将迁移标志设置为true
40. movingState.isCompleteMoving = true;
41. }
42. }

44. move();

46. @Entry
47. @ComponentV2
48. struct Page1 {
49. @Local refresh: number = 0;
50. // 使用key:connect4存入数据
51. @Local p: Sample =
52. PersistenceV2.globalConnect({ type: Sample, key: 'connect4', defaultCreator: () => new Sample() })!;

54. build() {
55. Column({ space: 5 }) {
56. // 显示数据
57. Text('Key connect4: ' + this.p.father.childId.toString())
58. .onClick(() => {
59. this.p.father.childId += 1;
60. })
61. .fontSize(25)
62. .fontColor(Color.Red)

64. // save接口
65. // 未被@Trace装饰的变量需要借助状态变量refresh才能刷新
66. Text('save key connect4: ' + this.p.father.groupId.toString() + ' refresh:' + this.refresh)
67. .onClick(() => {
68. // 未被@Trace保存的对象无法自动存储，需要调用save存储
69. this.p.father.groupId += 1;
70. PersistenceV2.save('connect4');
71. this.refresh += 1;
72. })
73. .fontSize(25)
74. }
75. .width('100%')
76. }
77. }
```

[PersistenceV2ConnectMigration2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateManagement/entry/src/main/ets/pages/persistenceV2/PersistenceV2ConnectMigration2.ets#L16-L94)

connect向globalConnect迁移，需要将key绑定的value赋值给globalConnect进行存储，之后当自定义组件使用globalConnect连接时，globalConnect绑定的数据即为之前使用connect保存的数据，开发者可以自定义move函数，并将其放在合适位置迁移即可。