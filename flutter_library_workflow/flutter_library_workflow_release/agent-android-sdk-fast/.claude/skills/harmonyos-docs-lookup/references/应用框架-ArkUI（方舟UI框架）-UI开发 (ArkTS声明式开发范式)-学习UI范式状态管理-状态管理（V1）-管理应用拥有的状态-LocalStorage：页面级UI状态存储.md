LocalStorage是页面级的UI状态存储，通过@Entry装饰器接收的参数可以在页面内共享同一个LocalStorage实例。LocalStorage支持UIAbility实例内多个页面间状态共享。

本文仅介绍LocalStorage使用场景和相关的装饰器：@LocalStorageProp和@LocalStorageLink。

在阅读本文档前，需要开发者对状态管理框架有基本的了解。建议提前阅读：[状态管理概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-state-management-overview)。

LocalStorage还提供了API接口，可以让开发者通过接口在自定义组件外手动触发Storage对应key的增删改查，建议配合[LocalStorage API文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-state-management#localstorage9)阅读。最佳实践请参考[状态管理最佳实践](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-status-management)。

说明

LocalStorage从API version 9开始支持。

## 概述

LocalStorage是ArkTS为构建页面级别状态变量提供存储的内存内的“数据库”。

* 应用程序可以创建多个LocalStorage实例，LocalStorage实例可以在页面内共享，也可以通过[getSharedLocalStorage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#getsharedlocalstorage12)接口，实现跨页面、跨[UIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uiability-overview)实例共享。
* 组件树的根节点，即被[@Entry](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-entry#entry)装饰的[@Component](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-create-custom-components#component)，可以被分配一个LocalStorage实例，此组件的所有子组件实例将自动获得对该LocalStorage实例的访问权限。
* @Component装饰的组件既可以自动继承来自父组件的LocalStorage实例，也可以传入指定的LocalStorage的实例，详见：[自定义组件接收LocalStorage实例](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#自定义组件接收localstorage实例)。
* LocalStorage中的所有属性都是可变的。

应用程序决定LocalStorage对象的生命周期。当应用释放最后一个指向LocalStorage的引用时，比如销毁最后一个自定义组件，LocalStorage将被JS Engine垃圾回收。

LocalStorage根据与@Component装饰的组件的同步类型不同，提供了两个装饰器：

* [@LocalStorageProp](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#localstorageprop)：@LocalStorageProp装饰的变量与LocalStorage中给定属性建立单向同步关系。
* [@LocalStorageLink](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#localstoragelink)：@LocalStorageLink装饰的变量与LocalStorage中给定属性建立双向同步关系。

## @LocalStorageProp

在上文中已经提到，如果要建立LocalStorage和自定义组件的联系，需要使用@LocalStorageProp和@LocalStorageLink装饰器。使用@LocalStorageProp(key)/@LocalStorageLink(key)装饰组件内的变量，key标识了LocalStorage的属性。

当自定义组件初始化的时候，@LocalStorageProp(key)/@LocalStorageLink(key)装饰的变量会通过给定的key，绑定LocalStorage对应的属性，完成初始化。本地初始化是必要的，因为无法保证LocalStorage一定存在给定的key（这取决于应用逻辑是否在组件初始化之前在LocalStorage实例中存入对应的属性）。

说明

从API version 9开始，该装饰器支持在ArkTS卡片中使用。

从API version 11开始，该装饰器支持在元服务中使用。

@LocalStorageProp(key)和LocalStorage中key对应的属性建立单向数据同步，ArkUI框架支持修改@LocalStorageProp(key)在本地的值，但是对本地值的修改不会同步回LocalStorage中。相反，如果LocalStorage中key对应的属性值发生改变，例如通过set接口对LocalStorage中的值进行修改，改变会同步给@LocalStorageProp(key)，并覆盖掉本地的值。

### 装饰器使用规则

展开

| @LocalStorageProp变量装饰器 | 说明 |
| --- | --- |
| 装饰器参数 | key：常量字符串，必填（字符串需要有引号）。 |
| 允许装饰的变量类型 | Object、class、string、number、boolean、enum类型，以及这些类型的数组。  API version 12及以上支持Map、Set、Date、undefined和null类型以及这些类型的联合类型，示例见[LocalStorage支持联合类型](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#localstorage支持联合类型)。  嵌套类型的场景请参考[观察变化和行为表现](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#观察变化和行为表现)。  **说明：**  变量类型必须被指定，建议和LocalStorage中对应属性类型相同，否则会发生类型隐式转换，从而导致应用行为异常。 |
| 同步类型 | 单向同步：从LocalStorage的对应属性到组件的状态变量。组件本地的修改是允许的，但是LocalStorage中给定的属性一旦发生变化，将覆盖本地的修改。 |
| 被装饰变量的初始值 | 必须指定，如果LocalStorage实例中不存在属性，则用该初始值初始化该属性，并存入LocalStorage中。 |

### 变量的传递/访问规则

展开

| 传递/访问规则 | 说明 |
| --- | --- |
| 从父节点初始化和更新 | 禁止，@LocalStorageProp不支持从父节点初始化，只能从LocalStorage中key对应的属性初始化，如果没有对应的key，将使用本地默认值初始化。 |
| 初始化子节点 | 支持，可用于初始化@State、@Link、@Prop、@Provide。 |
| 是否支持组件外访问 | 否。 |

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9e/v3/iC9DxiD-Qg-v4t79Z0R-zg/zh-cn_image_0000002540611260.png?HW-CC-KV=V1&HW-CC-Date=20260414T034427Z&HW-CC-Expire=86400&HW-CC-Sign=88F5EECC8D87CE769ECF387F6B56AFE4A4361707AC54162A044FB2CA9EDAAE9B)

**图1** @LocalStorageProp初始化规则图示

### 观察变化和行为表现

**观察变化**

* 当装饰的数据类型为boolean、string、number类型时，可以观察到数值的变化。
* 当装饰的数据类型为class或者Object时，可以观察到对象整体赋值和对象属性变化（详见[从ui内部使用localstorage](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#从ui内部使用localstorage)）。
* 当装饰的对象是数组时，可以观察到数组添加、删除、更新数组单元的变化。
* 当装饰的对象是Date时，可以观察到Date整体的赋值，同时可通过调用Date的接口setFullYear, setMonth, setDate, setHours, setMinutes, setSeconds, setMilliseconds, setTime, setUTCFullYear, setUTCMonth, setUTCDate, setUTCHours, setUTCMinutes, setUTCSeconds, setUTCMilliseconds 更新Date的属性。详见[装饰Date类型变量](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#装饰date类型变量)。
* 当装饰的变量是Map时，可以观察到Map整体的赋值，同时可通过调用Map的接口set, clear, delete 更新Map的值。详见[装饰Map类型变量](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#装饰map类型变量)。
* 当装饰的变量是Set时，可以观察到Set整体的赋值，同时可通过调用Set的接口add, clear, delete 更新Set的值。详见[装饰Set类型变量](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#装饰set类型变量)。

**框架行为**

1. 使用@LocalStorageProp(key)装饰的变量更新时，不会写回LocalStorage，但会触发当前自定义组件的重新渲染。
2. 当LocalStorage中对应key的值发生变化时，所有使用@LocalStorageProp(key)装饰的变量都会同步更新，覆盖本地修改。

**LocalStorage与@LocalStorageProp数据同步如下图所示**

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/55/v3/hYRu0o1pR8S68ecJBvM3Kw/zh-cn_image_0000002571171255.png?HW-CC-KV=V1&HW-CC-Date=20260414T034427Z&HW-CC-Expire=86400&HW-CC-Sign=886B0CC6932B02E45F5C201711A0875077A85D056F38D02E4E088A73CD16944F)

**图2** LocalStorage与@LocalStorageProp数据同步图示

## @LocalStorageLink

说明

从API version 11开始，该装饰器支持在元服务中使用。

如果我们需要将自定义组件的状态变量的更新同步回LocalStorage，就需要用到@LocalStorageLink。

@LocalStorageLink(key)是和LocalStorage中key对应的属性建立双向数据同步：

1. 本地修改发生，该修改会被写回LocalStorage中。
2. LocalStorage中的修改发生后，该修改会被同步到所有绑定LocalStorage对应key的属性上，包括单向（@LocalStorageProp和通过prop创建的单向绑定变量）、双向（@LocalStorageLink和通过link创建的双向绑定变量）变量。

### 装饰器使用规则

展开

| @LocalStorageLink变量装饰器 | 说明 |
| --- | --- |
| 装饰器参数 | key：常量字符串，必填（字符串需要有引号）。 |
| 允许装饰的变量类型 | Object、class、string、number、boolean、enum类型，以及这些类型的数组。  API version 12及以上支持Map、Set、Date、undefined和null类型以及这些类型的联合类型。示例见[LocalStorage支持联合类型](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#localstorage支持联合类型)。  嵌套类型的场景请参考[观察变化和行为表现](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#观察变化和行为表现-1)。  **说明：**  变量类型必须被指定，建议和LocalStorage中对应属性类型相同，否则会发生类型隐式转换，从而导致应用行为异常。 |
| 同步类型 | 双向同步：从LocalStorage的对应属性到自定义组件，从自定义组件到LocalStorage对应属性。 |
| 被装饰变量的初始值 | 必须指定，如果LocalStorage实例中不存在属性，则用该初始值初始化该属性，并存入LocalStorage中。 |

### 变量的传递/访问规则

展开

| 传递/访问规则 | 说明 |
| --- | --- |
| 从父节点初始化和更新 | 禁止，@LocalStorageLink不支持从父节点初始化，只能从LocalStorage中key对应的属性初始化，如果没有对应的key，将使用本地默认值初始化。 |
| 初始化子节点 | 支持，可用于初始化@State、@Link、@Prop、@Provide。 |
| 是否支持组件外访问 | 否。 |

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a4/v3/JXbyRrA0SPi9xhz0cNHb_w/zh-cn_image_0000002540770912.png?HW-CC-KV=V1&HW-CC-Date=20260414T034427Z&HW-CC-Expire=86400&HW-CC-Sign=2D4774A28409035C2FB966053B4DD8D3A2497673C1B8D788F5345ED75A99C4F2)

**图3** @LocalStorageLink初始化规则图示

### 观察变化和行为表现

**观察变化**

* 当装饰的数据类型为boolean、string、number类型时，可以观察到数值的变化。
* 当装饰的数据类型为class或者Object时，可以观察到对象整体赋值和对象属性变化（详见[从ui内部使用localstorage](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#从ui内部使用localstorage)）。
* 当装饰的对象是数组时，可以观察到数组添加、删除、更新数组单元的变化。详见[装饰Array类型变量](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#装饰array类型变量)。
* 当装饰的对象是Date时，可以观察到Date整体的赋值，同时可通过调用Date的接口setFullYear, setMonth, setDate, setHours, setMinutes, setSeconds, setMilliseconds, setTime, setUTCFullYear, setUTCMonth, setUTCDate, setUTCHours, setUTCMinutes, setUTCSeconds, setUTCMilliseconds 更新Date的属性。详见[装饰Date类型变量](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#装饰date类型变量)。
* 当装饰的变量是Map时，可以观察到Map整体的赋值，同时可通过调用Map的接口set, clear, delete 更新Map的值。详见[装饰Map类型变量](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#装饰map类型变量)。
* 当装饰的变量是Set时，可以观察到Set整体的赋值，同时可通过调用Set的接口add, clear, delete 更新Set的值。详见[装饰Set类型变量](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#装饰set类型变量)。

**框架行为**

1. 使用@LocalStorageLink(key)装饰的变量更新时，会同步写回LocalStorage对应的key，还会触发当前自定义组件的重新渲染。
2. 当LocalStorage中对应key的值发生变化时，所有绑定该key的数据（包括双向@LocalStorageLink和单向@LocalStorageProp）都会同步更新。

**LocalStorage与@LocalStorageLink数据同步如下图所示**

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cb/v3/KOSZ8keeQ2mONhZPsLNBTA/zh-cn_image_0000002571291207.png?HW-CC-KV=V1&HW-CC-Date=20260414T034427Z&HW-CC-Expire=86400&HW-CC-Sign=65576CB1B145254D94885FDC39E6A7B6621919F38827A0B9AEA0544195BFD5B2)

**图4** LocalStorage与@LocalStorageLink数据同步图示

## 限制条件

1. @LocalStorageProp/@LocalStorageLink的参数必须为string类型，否则编译期会报错。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let storage = new LocalStorage();
   2. storage.setOrCreate('PropA', 48);

   4. // 错误写法，编译报错
   5. @LocalStorageProp() localStorageProp: number = 1;
   6. @LocalStorageLink() localStorageLink: number = 2;

   8. // 正确写法
   9. @LocalStorageProp('PropA') localStorageProp: number = 1;
   10. @LocalStorageLink('PropA') localStorageLink: number = 2;
   ```
2. @LocalStorageProp与@LocalStorageLink不支持装饰Function类型的变量，框架会抛出运行时错误。
3. LocalStorage创建后，命名属性的类型不可更改。后续调用Set时必须使用相同类型的值。
4. LocalStorage是页面级存储，[getSharedLocalStorage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#getsharedlocalstorage12)接口仅能获取当前Stage通过[windowStage.loadContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#loadcontent9)传入的LocalStorage实例，否则返回undefined。例子可见[将LocalStorage实例从UIAbility共享到一个或多个页面](/consumer/cn/doc/harmonyos-guides/arkts-localstorage#将localstorage实例从uiability共享到一个或多个页面)。

## 使用场景

### 应用逻辑使用LocalStorage

收起

自动换行

深色代码主题

复制

```
1. let para: Record<string,number> = { 'PropA': 47 };
2. let storage: LocalStorage = new LocalStorage(para); // 创建新实例并使用给定对象初始化
3. let propA: number | undefined = storage.get('PropA'); // propA == 47
4. let link1: SubscribedAbstractProperty<number> = storage.link('PropA'); // link1.get() == 47
5. let link2: SubscribedAbstractProperty<number> = storage.link('PropA'); // link2.get() == 47
6. let prop: SubscribedAbstractProperty<number> = storage.prop('PropA'); // prop.get() == 47
7. link1.set(48); // 双向同步: link1.get() == link2.get() == prop.get() == 48
8. prop.set(1); // 单向同步: prop.get() == 1; 但 link1.get() == link2.get() == 48
9. link1.set(49); // 双向同步: link1.get() == link2.get() == prop.get() == 49
```

### 从UI内部使用LocalStorage

除了应用程序逻辑使用LocalStorage，还可以借助LocalStorage相关的两个装饰器@LocalStorageProp和@LocalStorageLink，在UI组件内部获取到LocalStorage实例中存储的状态变量。

本示例以@LocalStorageLink为例，展示了：

* 使用构造函数创建LocalStorage实例storage。
* 使用@Entry装饰器将storage添加到Parent顶层组件中。
* @LocalStorageLink绑定LocalStorage对给定的属性，建立双向数据同步。

收起

自动换行

深色代码主题

复制

```
1. class Data {
2. public code: number;

4. constructor(code: number) {
5. this.code = code;
6. }
7. }

9. // 创建新实例并使用给定对象初始化
10. let para: Record<string, number> = { 'PropA': 47 };
11. let storage: LocalStorage = new LocalStorage(para);
12. storage.setOrCreate('PropB', new Data(50));

14. @Component
15. struct Child {
16. // @LocalStorageLink变量装饰器与LocalStorage中的'PropA'属性建立双向绑定
17. @LocalStorageLink('PropA') childLinkNumber: number = 1;
18. // @LocalStorageLink变量装饰器与LocalStorage中的'PropB'属性建立双向绑定
19. @LocalStorageLink('PropB') childLinkObject: Data = new Data(0);

21. build() {
22. Column({ space: 15 }) {
23. // 更改将同步至LocalStorage中的'PropA'以及Parent.parentLinkNumber
24. Button(`Child from LocalStorage ${this.childLinkNumber}`)
25. .onClick(() => {
26. this.childLinkNumber += 1;
27. })
28. // 更改将同步至LocalStorage中的'PropB'以及Parent.parentLinkObject.code
29. Button(`Child from LocalStorage ${this.childLinkObject.code}`)
30. .onClick(() => {
31. this.childLinkObject.code += 1;
32. })
33. }
34. }
35. }

37. // 使LocalStorage可从@Component组件访问
38. @Entry(storage)
39. @Component
40. struct Parent {
41. // @LocalStorageLink变量装饰器与LocalStorage中的'PropA'属性建立双向绑定
42. @LocalStorageLink('PropA') parentLinkNumber: number = 1;
43. // @LocalStorageLink变量装饰器与LocalStorage中的'PropB'属性建立双向绑定
44. @LocalStorageLink('PropB') parentLinkObject: Data = new Data(0);

46. build() {
47. Column({ space: 15 }) {
48. // 由于LocalStorage中PropA已经被初始化，因此this.parentLinkNumber的值为47
49. Button(`Parent from LocalStorage ${this.parentLinkNumber}`)
50. .onClick(() => {
51. this.parentLinkNumber += 1;
52. })
53. // 由于LocalStorage中PropB已经被初始化，因此this.parentLinkObject.code的值为50
54. Button(`Parent from LocalStorage ${this.parentLinkObject.code}`)
55. .onClick(() => {
56. this.parentLinkObject.code += 1;
57. })
58. // @Component子组件自动获得对Parent LocalStorage实例的访问权限
59. Child()
60. }
61. }
62. }
```

[PageOneDoubleSYN.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/PageOneDoubleSYN.ets#L16-L80)

### @LocalStorageProp和LocalStorage单向同步的简单场景

本示例展示了ParentOne和ChildOne组件各自在本地创建与paraOneLocal中'PropA'属性的单向数据同步：

* ParentOne中对this.storagePropOne的修改，只会在ParentOne中生效，并没有同步回storageOneLocal。
* ChildOne组件中，Text绑定的storagePropTwo 依旧显示47。

收起

自动换行

深色代码主题

复制

```
1. // 创建新实例并使用给定对象初始化
2. let paraOneLocal: Record<string, number> = { 'PropA': 47 };
3. let storageOneLocal: LocalStorage = new LocalStorage(paraOneLocal);
4. // 使LocalStorage可从@Component组件访问
5. @Entry(storageOneLocal)
6. @Component
7. struct ParentOne {
8. // @LocalStorageProp变量装饰器与LocalStorage中的'PropA'属性建立单向绑定
9. @LocalStorageProp('PropA') storagePropOne: number = 1;

11. build() {
12. Column({ space: 15 }) {
13. // 点击后从47开始加1，只改变当前组件显示的storagePropOne ，不会同步到LocalStorage中
14. Button(`ParentOne from LocalStorage ${this.storagePropOne}`)
15. .onClick(() => {
16. this.storagePropOne += 1;
17. })
18. ChildOne()
19. }
20. }
21. }

23. @Component
24. struct ChildOne {
25. // @LocalStorageProp变量装饰器与LocalStorage中的'PropA'属性建立单向绑定
26. @LocalStorageProp('PropA') storagePropTwo: number = 2;

28. build() {
29. Column({ space: 15 }) {
30. // 当ParentOne改变时，当前storagePropTwo不会改变，显示47
31. Text(`ParentOne from LocalStorage ${this.storagePropTwo}`)
32. }
33. }
34. }
```

[PageTwoSingleSYN.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/PageTwoSingleSYN.ets#L15-L52)

### @LocalStorageLink和LocalStorage双向同步的简单场景

下面的示例展示了@LocalStorageLink装饰的数据和LocalStorage双向同步的场景：

收起

自动换行

深色代码主题

复制

```
1. // 构造LocalStorage实例
2. let paraOne: Record<string, number> = { 'PropA': 47 };
3. let storageOne: LocalStorage = new LocalStorage(paraOne);
4. // 调用link（api9以上）接口构造'PropA'的双向同步数据，linkToPropA 是全局变量
5. let linkToPropA: SubscribedAbstractProperty<object> = storageOne.link('PropA');

7. @Entry(storageOne)
8. @Component
9. struct ParentTwo {

11. // @LocalStorageLink('PropA')在Parent自定义组件中创建'PropA'的双向同步数据，初始值为47，因为在构造LocalStorage已经给“PropA”设置47
12. @LocalStorageLink('PropA') storageLink: number = 1;

14. build() {
15. Column() {
16. Text(`incr @LocalStorageLink variable`)
17. // 点击“incr @LocalStorageLink variable”，this.storageLink加1，改变同步回storage，全局变量linkToPropA也会同步改变

19. .onClick(() => {
20. this.storageLink += 1;
21. })

23. // 并不建议在组件内使用全局变量linkToPropA.get()，因为可能会有生命周期不同引起的错误。
24. Text(`@LocalStorageLink: ${this.storageLink} - linkToPropA: ${linkToPropA.get()}`)
25. }
26. }
27. }
```

[PageTwoWaySYN.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/PageTwoWaySYN.ets#L15-L43)

### 兄弟组件之间同步状态变量

下面的示例展示了通过@LocalStorageLink双向同步兄弟组件之间的状态。

先看ParentFour自定义组件中发生的变化：

1.点击“playCount ${this.playCount} dec by 1”，this.playCount减1，修改同步回LocalStorage中，ChildFour组件中的playCountLink绑定的组件会同步刷新。

2.点击“countStorage ${this.playCount} incr by 1”，调用LocalStorage的set接口，更新LocalStorage中“countStorage”对应的属性，ChildFour组件中的playCountLink绑定的组件会同步刷新。

3.Text组件“playCount in LocalStorage for debug ${storageFour.get<number>('countStorage')}”没有同步刷新，因为storageFour.get<number>('countStorage')返回的是常规变量，常规变量的更新并不会引起Text组件的重新渲染。

ChildFour自定义组件中的变化：

playCountLink的刷新会同步回LocalStorage，并且引起兄弟组件和父组件相应的刷新。

收起

自动换行

深色代码主题

复制

```
1. let count: Record<string, number> = { 'countStorage': 1 };
2. let storageFour: LocalStorage = new LocalStorage(count);

4. @Component
5. struct ChildFour {
6. // 子组件实例的名字
7. label: string = 'no name';
8. // 和LocalStorage中“countStorage”的双向绑定数据
9. @LocalStorageLink('countStorage') playCountLink: number = 0;

11. build() {
12. Row() {
13. Text(this.label)
14. .width(50)
15. .height(60)
16. .fontSize(12)
17. Text(`playCountLink ${this.playCountLink}: inc by 1`)
18. .onClick(() => {
19. this.playCountLink += 1;
20. })
21. .width(200)
22. .height(60)
23. .fontSize(12)
24. }
25. .width(300)
26. .height(60)
27. }
28. }

30. @Entry(storageFour)
31. @Component
32. struct ParentFour {
33. @LocalStorageLink('countStorage') playCount: number = 0;

35. build() {
36. Column() {
37. Row() {
38. Text('Parent')
39. .width(50)
40. .height(60)
41. .fontSize(12)
42. Text(`playCount ${this.playCount} dec by 1`)
43. .onClick(() => {
44. this.playCount -= 1;
45. })
46. .width(250)
47. .height(60)
48. .fontSize(12)
49. }
50. .width(300)
51. .height(60)

53. Row() {
54. Text('LocalStorage')
55. .width(50)
56. .height(60)
57. .fontSize(12)
58. Text(`countStorage ${this.playCount} incr by 1`)
59. .onClick(() => {
60. storageFour.set<number | undefined>('countStorage', Number(storageFour.get<number>('countStorage')) + 1);
61. })
62. .width(250)
63. .height(60)
64. .fontSize(12)
65. }
66. .width(300)
67. .height(60)

69. ChildFour({ label: 'ChildA' })
70. ChildFour({ label: 'ChildB' })

72. Text(`playCount in LocalStorage for debug ${storageFour.get<number>('countStorage')}`)
73. .width(300)
74. .height(60)
75. .fontSize(12)
76. }
77. }
78. }
```

[PageFourStateVariableSYN.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/PageFourStateVariableSYN.ets#L15-L95)

### 将LocalStorage实例从UIAbility共享到一个或多个页面

上面的实例中，LocalStorage的实例仅仅在一个@Entry装饰的组件和其所属的子组件（一个页面）中共享，如果希望其在多个页面中共享，可以在所属UIAbility中创建LocalStorage实例，并调用windowStage.[loadContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#loadcontent9)。

收起

自动换行

深色代码主题

复制

```
1. // EntryAbility.ets
2. import { UIAbility } from '@kit.AbilityKit';
3. import { window } from '@kit.ArkUI';

5. // ···
6. export default class EntryAbility extends UIAbility {
7. para: Record<string, number> = {
8. 'PropA': 47
9. };
10. storage: LocalStorage = new LocalStorage(this.para);

12. onWindowStageCreate(windowStage: window.WindowStage): void {
13. // 当前用例需要开发者手动修改为windowStage.loadContent('pages/PageFiveShare', this.storage);
14. windowStage.loadContent('pages/Index', this.storage);
15. }

17. // ···
18. }
```

[EntryAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/entryability/EntryAbility.ets#L17-L69)

说明

在UI页面通过getSharedLocalStorage获取当前stage共享的LocalStorage实例。

this.getUIContext().getSharedLocalStorage()只在模拟器或者实机上才有效，在Previewer预览器中使用不生效。

在下面的用例中，PageFiveShare页面中的propA通过使用共享的LocalStorage实例。点击Button跳转到PageFiveShareChange页面，点击Change propA改变propA的值，back回PageFiveShare页面后，页面中propA的值也同步修改。

收起

自动换行

深色代码主题

复制

```
1. // PageFiveShare.ets
2. // 预览器上不支持获取页面共享的LocalStorage实例
3. @Entry({ useSharedStorage: true })
4. @Component
5. struct PageFiveShare {
6. // 可以使用@LocalStorageLink/Prop与LocalStorage实例中的变量建立联系
7. @LocalStorageLink('PropA') propA: number = 1;
8. pageStack: NavPathStack = new NavPathStack();

10. build() {
11. Navigation(this.pageStack) {
12. Row() {
13. Column() {
14. Text(`${this.propA}`)
15. .fontSize(50)
16. .fontWeight(FontWeight.Bold)
17. Button('To Page')
18. .onClick(() => {
19. this.pageStack.pushPathByName('Page', null);
20. })
21. }
22. .width('100%')
23. }
24. .height('100%')
25. }
26. }
27. }
```

[PageFiveShare.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/PageFiveShare.ets#L15-L44)

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. export function PageBuilder() {
3. PageFiveShareChange()
4. }

6. // PageFiveShareChange组件获得了父亲PageFiveShare组件的LocalStorage实例
7. @Component
8. struct PageFiveShareChange {
9. @LocalStorageLink('PropA') propA: number = 2;
10. pathStack: NavPathStack = new NavPathStack();

12. build() {
13. NavDestination() {
14. Row() {
15. Column() {
16. Text(`${this.propA}`)
17. .fontSize(50)
18. .fontWeight(FontWeight.Bold)

20. Button('Change propA')
21. .onClick(() => {
22. this.propA = 100;
23. })

25. Button('Back PageFiveShare')
26. .onClick(() => {
27. this.pathStack.pop();
28. })
29. }
30. .width('100%')
31. }
32. }
33. .onReady((context: NavDestinationContext) => {
34. this.pathStack = context.pathStack;
35. })
36. }
37. }
```

[PageFiveShareChange.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/PageFiveShareChange.ets#L15-L55)

使用Navigation时，需要添加配置系统路由表文件src/main/resources/base/profile/route\_map.json，并替换pageSourceFile为PageFiveShareChange页面的路径，并且在module.json5中添加："routerMap": "$profile:route\_map"。

收起

自动换行

深色代码主题

复制

```
1. {
2. "routerMap": [
3. {
4. "name": "Page",
5. "pageSourceFile": "src/main/ets/pages/PageFiveShareChange.ets",
6. "buildFunction": "PageBuilder",
7. "data": {
8. "description" : "LocalStorage example"
9. }
10. }
11. ]
12. }
```

说明

对于开发者更建议使用这个方式来构建LocalStorage的实例，并且在创建LocalStorage实例的时候就写入默认值，因为默认值可以作为运行异常的备份，也可以用作页面的单元测试。

### 自定义组件接收LocalStorage实例

除了根节点可通过@Entry来接收LocalStorage实例，自定义组件（子节点）也可以通过构造参数来传递LocalStorage实例。

本示例以@LocalStorageLink为例，展示了：

* 父组件TestIndex中的Text，显示LocalStorage实例localStorageOne中PropA的值为“propA”。
* ChildSix组件中，Text绑定的propB，显示LocalStorage实例localStorageTwo中PropB的值为“propB”。

说明

从API version 12开始，自定义组件支持接收LocalStorage实例。

当自定义组件作为子节点，定义了成员属性时，LocalStorage实例必须要放在第二个参数位置传递，否则会报类型不匹配的编译问题。

当在自定义组件中定义了属性时，暂时不支持只有一个LocalStorage实例作为入参。如果没定义属性，可以只传入一个LocalStorage实例作为入参。

如果定义的属性不需要从父组件初始化变量，则第一个参数需要传{}。

作为构造参数传给子组件的LocalStorage实例在初始化时就会被决定，可以通过@LocalStorageLink或者LocalStorage的API修改LocalStorage实例中保存的属性值，但LocalStorage实例自身不能被动态修改。

收起

自动换行

深色代码主题

复制

```
1. let localStorageOne: LocalStorage = new LocalStorage();
2. localStorageOne.setOrCreate('propA', 'propA');

4. let localStorageTwo: LocalStorage = new LocalStorage();
5. localStorageTwo.setOrCreate('propB', 'propB');

7. @Entry(localStorageOne)
8. @Component
9. struct TestIndex {
10. // 'PropA'，和localStorageOne中'propA'的双向同步
11. @LocalStorageLink('PropA') propA: string = 'Hello World';
12. @State count: number = 0;

14. build() {
15. Row() {
16. Column() {
17. Text(this.propA)
18. .fontSize(50)
19. .fontWeight(FontWeight.Bold)
20. // 使用LocalStorage 实例localStorageTwo
21. ChildSix({ count: this.count }, localStorageTwo)
22. }
23. .width('100%')
24. }
25. .height('100%')
26. }
27. }


30. @Component
31. struct ChildSix {
32. @Link count: number;
33. //  'Hello World'和localStorageTwo中'propB'的双向同步，如果localStorageTwo中没有'propB'，则使用默认值'Hello World'
34. @LocalStorageLink('PropB') propB: string = 'Hello World';

36. build() {
37. Text(this.propB)
38. .fontSize(50)
39. .fontWeight(FontWeight.Bold)
40. }
41. }
```

[PageSixLocalStorage.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/PageSixLocalStorage.ets#L15-L58)

1. 当自定义组件没有定义属性时，可以只传入一个LocalStorage实例作为入参。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let localStorageInstance: LocalStorage = new LocalStorage();
   2. localStorageInstance.setOrCreate('propA', 'propA');

   4. let localStorageChange: LocalStorage = new LocalStorage();
   5. localStorageChange.setOrCreate('propB', 'propB');

   7. @Entry(localStorageInstance)
   8. @Component
   9. struct Index {
   10. // 'PropA'，和localStorageInstance中'PropA'的双向同步
   11. @LocalStorageLink('PropA') propA: string = 'Hello World';
   12. @State count: number = 0;

   14. build() {
   15. Row() {
   16. Column() {
   17. Text(this.propA)
   18. .fontSize(50)
   19. .fontWeight(FontWeight.Bold)
   20. // 使用LocalStorage 实例localStorageChange
   21. ChildOne(localStorageChange)
   22. }
   23. .width('100%')
   24. }
   25. .height('100%')
   26. }
   27. }

   29. @Component
   30. struct ChildOne {
   31. build() {
   32. Text('hello')
   33. .fontSize(50)
   34. .fontWeight(FontWeight.Bold)
   35. }
   36. }
   ```

   [PageSixLocalStorageA.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/PageSixLocalStorageA.ets#L15-L53)
2. 当定义的属性不需要从父组件初始化变量时，第一个参数需要传{}。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let localStorageBOne: LocalStorage = new LocalStorage();
   2. localStorageBOne.setOrCreate('propA', 'propA');

   4. let localStorageBTwo: LocalStorage = new LocalStorage();
   5. localStorageBTwo.setOrCreate('propB', 'propB');

   7. @Entry(localStorageBOne)
   8. @Component
   9. struct PageSixLocalStorageB {
   10. // 'PropA'，和localStorageBOne中'propA'的双向同步
   11. @LocalStorageLink('PropA') propA: string = 'Hello World';
   12. @State count: number = 0;

   14. build() {
   15. Row() {
   16. Column() {
   17. Text(this.propA)
   18. .fontSize(50)
   19. .fontWeight(FontWeight.Bold)
   20. // 使用LocalStorage 实例localStorageBTwo
   21. Child({}, localStorageBTwo)
   22. }
   23. .width('100%')
   24. }
   25. .height('100%')
   26. }
   27. }

   29. @Component
   30. struct Child {
   31. @State count: number = 5;
   32. // 'Hello World'，和localStorageBTwo中'propB'的双向同步，如果localStorageBTwo中没有'propB'，则使用默认值'Hello World'
   33. @LocalStorageLink('PropB') propB: string = 'Hello World';

   35. build() {
   36. Text(this.propB)
   37. .fontSize(50)
   38. .fontWeight(FontWeight.Bold)
   39. }
   40. }
   ```

   [PageSixLocalStorageB.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/PageSixLocalStorageB.ets#L15-L57)

### Navigation组件和LocalStorage联合使用

可以通过传递不同的LocalStorage实例给自定义组件，从而实现在[Navigation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation)跳转到不同的页面时，绑定不同的LocalStorage实例，显示对应绑定的值。

本示例以@LocalStorageLink为例，展示了：

* 点击父组件中的Button "Next Page",创建并跳转到name为"pageOne"的子页面，Text显示信息为LocalStorage实例localStorageA中绑定的propA的值，为"propA"。
* 继续点击页面上的Button "Next Page",创建并跳转到name为"pageTwo"的子页面，Text显示信息为LocalStorage实例localStorageB中绑定的propB的值，为"propB"。
* 继续点击页面上的Button "Next Page",创建并跳转到name为"pageTree"的子页面，Text显示信息为LocalStorage实例localStorageC中绑定的propC的值，为"propC"。
* 继续点击页面上的Button "Next Page",创建并跳转到name为"pageOne"的子页面，Text显示信息为LocalStorage实例localStorageA中绑定的propA的值，为"propA"。
* NavigationContentMsgStack自定义组件中的Text组件，共享对应自定义组件树上LocalStorage实例绑定的propA的值。

收起

自动换行

深色代码主题

复制

```
1. let localStorageA: LocalStorage = new LocalStorage();
2. localStorageA.setOrCreate('propA', 'propA');

4. let localStorageB: LocalStorage = new LocalStorage();
5. localStorageB.setOrCreate('propB', 'propB');

7. let localStorageC: LocalStorage = new LocalStorage();
8. localStorageC.setOrCreate('propC', 'propC');

10. @Entry
11. @Component
12. struct MyNavigationTestStack {
13. @Provide('pageInfo') pageInfo: NavPathStack = new NavPathStack();

15. @Builder
16. PageMap(name: string) {
17. if (name === 'pageOne') {
18. // 传递不同的LocalStorage实例
19. PageOneStack({}, localStorageA)
20. } else if (name === 'pageTwo') {
21. PageTwoStack({}, localStorageB)
22. } else if (name === 'pageThree') {
23. PageThreeStack({}, localStorageC)
24. }
25. }

27. build() {
28. Column({ space: 5 }) {
29. Navigation(this.pageInfo) {
30. Column() {
31. Button('Next Page', { stateEffect: true, type: ButtonType.Capsule })
32. .width('80%')
33. .height(40)
34. .margin(20)
35. .onClick(() => {
36. this.pageInfo.pushPath({ name: 'pageOne' }); //将name指定的NavDestination页面信息入栈
37. })
38. }
39. }.title('NavIndex')
40. .navDestination(this.PageMap)
41. .mode(NavigationMode.Stack)
42. .borderWidth(1)
43. }
44. }
45. }

47. @Component
48. struct PageOneStack {
49. @Consume('pageInfo') pageInfo: NavPathStack;
50. @LocalStorageLink('PropA') propA: string = 'Hello World';

52. build() {
53. NavDestination() {
54. Column() {
55. NavigationContentMsgStack()
56. // 显示绑定的LocalStorage中PropA的值'PropA'
57. Text(`${this.propA}`)
58. Button('Next Page', { stateEffect: true, type: ButtonType.Capsule })
59. .width('80%')
60. .height(40)
61. .margin(20)
62. .onClick(() => {
63. this.pageInfo.pushPathByName('pageTwo', null);
64. })
65. }.width('100%').height('100%')
66. }.title('pageOne')
67. .onBackPressed(() => {
68. this.pageInfo.pop();
69. return true;
70. })
71. }
72. }

74. @Component
75. struct PageTwoStack {
76. @Consume('pageInfo') pageInfo: NavPathStack;
77. @LocalStorageLink('PropB') propB: string = 'Hello World';

79. build() {
80. NavDestination() {
81. Column() {
82. NavigationContentMsgStack()
83. // 如果绑定的LocalStorage中没有PropB,显示本地初始化的值 'Hello World'
84. Text(`${this.propB}`)
85. Button('Next Page', { stateEffect: true, type: ButtonType.Capsule })
86. .width('80%')
87. .height(40)
88. .margin(20)
89. .onClick(() => {
90. this.pageInfo.pushPathByName('pageThree', null);
91. })

93. }.width('100%').height('100%')
94. }.title('pageTwo')
95. .onBackPressed(() => {
96. this.pageInfo.pop();
97. return true;
98. })
99. }
100. }

102. @Component
103. struct PageThreeStack {
104. @Consume('pageInfo') pageInfo: NavPathStack;
105. @LocalStorageLink('PropC') propC: string = 'pageThreeStack';

107. build() {
108. NavDestination() {
109. Column() {
110. NavigationContentMsgStack()

112. // 如果绑定的LocalStorage中没有PropC,显示本地初始化的值 'pageThreeStack'
113. Text(`${this.propC}`)
114. Button('Next Page', { stateEffect: true, type: ButtonType.Capsule })
115. .width('80%')
116. .height(40)
117. .margin(20)
118. .onClick(() => {
119. this.pageInfo.pushPathByName('pageOne', null);
120. })

122. }.width('100%').height('100%')
123. }.title('pageThree')
124. .onBackPressed(() => {
125. this.pageInfo.pop();
126. return true;
127. })
128. }
129. }

131. @Component
132. struct NavigationContentMsgStack {
133. @LocalStorageLink('PropA') propA: string = 'Hello';

135. build() {
136. Column() {
137. Text(`${this.propA}`)
138. .fontSize(30)
139. .fontWeight(FontWeight.Bold)
140. }
141. }
142. }
```

[PageMyNavigation.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/PageMyNavigation.ets#L15-L159)

### LocalStorage支持联合类型

在下面的示例中，变量linkA的类型为number | null，变量linkB的类型为number | undefined。Text组件初始化分别显示为null和undefined，点击切换为数字，再次点击切换回null和undefined。

收起

自动换行

深色代码主题

复制

```
1. @Component
2. struct LocalStorageLinkComponent {
3. @LocalStorageLink('LinkA') linkA: number | null = null;
4. @LocalStorageLink('LinkB') linkB: number | undefined = undefined;

6. build() {
7. Column() {
8. Text('@LocalStorageLink API Initialization, @LocalStorageLink Value')
9. Text(`${this.linkA}`)
10. .fontSize(20)
11. .onClick(() => {
12. this.linkA ? this.linkA = null : this.linkA = 1;
13. })
14. Text(`${this.linkB}`)
15. .fontSize(20)
16. .onClick(() => {
17. this.linkB ? this.linkB = undefined : this.linkB = 1;
18. })
19. }
20. .borderWidth(3).borderColor(Color.Green)
21. }
22. }

24. @Component
25. struct LocalStoragePropComponent {
26. @LocalStorageProp('PropA') propA: number | null = null;
27. @LocalStorageProp('PropB') propB: number | undefined = undefined;

29. build() {
30. Column() {
31. Text('@LocalStorageProp API Initialization, @LocalStorageProp Value')
32. Text(`${this.propA}`)
33. .fontSize(20)
34. .onClick(() => {
35. this.propA ? this.propA = null : this.propA = 1;
36. })
37. Text(`${this.propB}`)
38. .fontSize(20)
39. .onClick(() => {
40. this.propB ? this.propB = undefined : this.propB = 1;
41. })
42. }
43. .borderWidth(3)
44. .borderColor(Color.Yellow)
45. }
46. }

48. let storageLink: LocalStorage = new LocalStorage();

50. @Entry(storageLink)
51. @Component
52. struct LinkIndex {
53. build() {
54. Row() {
55. Column() {
56. LocalStorageLinkComponent()
57. LocalStoragePropComponent()
58. }
59. .width('100%')
60. }
61. .height('100%')
62. }
63. }
```

[PageLocalStorageLink.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/PageLocalStorageLink.ets#L15-L80)

### 装饰Array类型变量

在下面的示例中，@LocalStorageLink装饰的message类型为number[]，点击Button改变message的值，UI会随之刷新。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct Index {
4. @LocalStorageLink('array') message: number[] = [0, 1, 2, 3];

6. build() {
7. Column() {
8. ForEach(this.message, (item: number) => {
9. Text(`${item}`)
10. .fontSize(20)
11. .margin(10)
12. })
13. // 新增数组元素，触发UI刷新
14. Button('Push element')
15. .onClick(() => {
16. this.message.push(4);
17. })
18. .width(300)
19. .margin(10)
20. // 删除数组元素，触发UI刷新
21. Button('Pop element')
22. .onClick(() => {
23. this.message.pop();
24. })
25. .width(300)
26. .margin(10)
27. // 对数组整体重新赋值，触发UI刷新
28. Button('Reset array')
29. .onClick(() => {
30. this.message = [9, 8, 7, 6];
31. })
32. .width(300)
33. .margin(10)
34. // 更新数组元素，触发UI刷新
35. Button('Modify element[0]')
36. .onClick(() => {
37. this.message[0] = 10;
38. })
39. .width(300)
40. .margin(10)
41. }
42. }
43. }
```

[LocalArraySample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/LocalArraySample.ets#L15-L59)

### 装饰Date类型变量

说明

从API version 12开始，LocalStorage支持Date类型。

在下面的示例中，@LocalStorageLink装饰的selectedDate类型为Date，点击Button改变selectedDate的值，UI会随之刷新。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct LocalDateSample {
4. @LocalStorageLink('date') selectedDate: Date = new Date('2021-08-08');

6. build() {
7. Column() {
8. Button('set selectedDate to 2023-07-08')
9. .margin(10)
10. .onClick(() => {
11. this.selectedDate = new Date('2023-07-08');
12. })
13. Button('increase the year by 1')
14. .margin(10)
15. .onClick(() => {
16. this.selectedDate.setFullYear(this.selectedDate.getFullYear() + 1);
17. })
18. Button('increase the month by 1')
19. .margin(10)
20. .onClick(() => {
21. this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
22. })
23. Button('increase the day by 1')
24. .margin(10)
25. .onClick(() => {
26. this.selectedDate.setDate(this.selectedDate.getDate() + 1);
27. })
28. DatePicker({
29. start: new Date('1970-1-1'),
30. end: new Date('2100-1-1'),
31. selected: $$this.selectedDate
32. })
33. }.width('100%')
34. }
35. }
```

[LocalDateSample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/LocalDateSample.ets#L15-L52)

### 装饰Map类型变量

说明

从API version 12开始，LocalStorage支持Map类型。

在下面的示例中，@LocalStorageLink装饰的message类型为Map<number, string>，点击Button改变message的值，UI会随之刷新。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct LocalMapSample {
4. @LocalStorageLink('map') message: Map<number, string> = new Map([[0, 'a'], [1, 'b'], [3, 'c']]);

6. build() {
7. Row() {
8. Column() {
9. ForEach(Array.from(this.message.entries()), (item: [number, string]) => {
10. Text(`${item[0]}`).fontSize(30)
11. Text(`${item[1]}`).fontSize(30)
12. Divider()
13. })
14. Button('init map').onClick(() => {
15. this.message = new Map([[0, 'a'], [1, 'b'], [3, 'c']]);
16. })
17. Button('set new one').onClick(() => {
18. this.message.set(4, 'd');
19. })
20. Button('clear').onClick(() => {
21. this.message.clear();
22. })
23. Button('replace the existing one').onClick(() => {
24. this.message.set(0, 'aa');
25. })
26. Button('delete the existing one').onClick(() => {
27. this.message.delete(0);
28. })
29. }
30. .width('100%')
31. }
32. .height('100%')
33. }
34. }
```

[LocalMapSample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/LocalMapSample.ets#L15-L51)

### 装饰Set类型变量

说明

从API version 12开始，LocalStorage支持Set类型。

在下面的示例中，@LocalStorageLink装饰的memberSet类型为Set<number>，点击Button改变memberSet的值，UI会随之刷新。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct LocalSetSample {
4. @LocalStorageLink('set') memberSet: Set<number> = new Set([0, 1, 2, 3, 4]);

6. build() {
7. Row() {
8. Column() {
9. ForEach(Array.from(this.memberSet.entries()), (item: [number, number]) => {
10. Text(`${item[0]}`)
11. .fontSize(30)
12. Divider()
13. })
14. Button('init set')
15. .onClick(() => {
16. this.memberSet = new Set([0, 1, 2, 3, 4]);
17. })
18. Button('set new one')
19. .onClick(() => {
20. this.memberSet.add(5);
21. })
22. Button('clear')
23. .onClick(() => {
24. this.memberSet.clear();
25. })
26. Button('delete the first one')
27. .onClick(() => {
28. this.memberSet.delete(0);
29. })
30. }
31. .width('100%')
32. }
33. .height('100%')
34. }
35. }
```

[LocalSetSample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/LocalSetSample.ets#L15-L52)

### 自定义组件外改变状态变量

收起

自动换行

深色代码主题

复制

```
1. let storageChange = new LocalStorage();
2. storageChange.setOrCreate('count', 47);

4. class Model {
5. public storage: LocalStorage = storageChange;

7. call(propName: string, value: number) {
8. this.storage.setOrCreate<number>(propName, value);
9. }
10. }

12. let model: Model = new Model();

14. @Entry({ storage: storageChange })
15. @Component
16. struct Test {
17. @LocalStorageLink('count') count: number = 0;

19. build() {
20. Column() {
21. Text(`count value: ${this.count}`)
22. Button('change')
23. .onClick(() => {
24. model.call('count', this.count + 1);
25. })
26. }
27. }
28. }
```

[ChangeLocalSetSample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/LocalStorage/entry/src/main/ets/pages/ChangeLocalSetSample.ets#L15-L45)