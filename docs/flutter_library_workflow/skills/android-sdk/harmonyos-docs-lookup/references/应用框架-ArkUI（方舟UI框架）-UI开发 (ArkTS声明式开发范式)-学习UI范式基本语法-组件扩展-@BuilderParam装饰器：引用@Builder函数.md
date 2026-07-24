当开发者创建[自定义组件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-create-custom-components)并需要为其添加特定功能（例如[页面跳转](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation)功能）时，如果直接在组件内嵌入事件方法，会导致所有该自定义组件的实例都增加此功能。为了解决此问题，ArkUI引入了@BuilderParam装饰器。@BuilderParam用于装饰指向@Builder方法的变量，开发者可以在初始化自定义组件时，使用不同的方式（如参数修改、尾随闭包、借用箭头函数等）对@BuilderParam装饰的自定义构建函数进行传参赋值。在自定义组件内部，通过调用@BuilderParam为组件增加特定功能。

在阅读本文档前，建议提前阅读：[@Builder](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-builder)。

说明

从API version 7开始支持。

从API version 9开始，该装饰器支持在ArkTS卡片中使用。

从API version 11开始，该装饰器支持在元服务中使用。

## 装饰器使用说明

### 初始化@BuilderParam装饰的方法

@BuilderParam装饰的方法只能被自定义构建函数（@Builder装饰的方法）初始化。

* 使用所属自定义组件的自定义构建函数或者全局的自定义构建函数，在本地初始化@BuilderParam装饰的方法。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Builder
  2. function overBuilder() {
  3. }

  5. @Component
  6. struct Child {
  7. @Builder
  8. doNothingBuilder() {
  9. }

  11. // 使用自定义组件的自定义构建函数初始化@BuilderParam装饰的方法
  12. @BuilderParam customBuilderParam: () => void = this.doNothingBuilder;
  13. // 使用全局自定义构建函数初始化@BuilderParam装饰的方法
  14. @BuilderParam customOverBuilderParam: () => void = overBuilder;

  16. build() {
  17. }
  18. }
  ```

  [BuilderParamInitMethod.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateRestock/entry/src/main/ets/pages/builderParam/BuilderParamInitMethod.ets#L15-L34)
* 使用父组件自定义构建函数初始化子组件@BuilderParam装饰的方法。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Component
  2. struct Child {
  3. @Builder
  4. customBuilder() {
  5. }

  7. @BuilderParam customBuilderParam: () => void = this.customBuilder;

  9. build() {
  10. Column() {
  11. this.customBuilderParam()
  12. }
  13. }
  14. }

  16. @Entry
  17. @Component
  18. struct Parent {
  19. @Builder
  20. componentBuilder() {
  21. Text('Parent builder')
  22. }

  24. build() {
  25. Column() {
  26. Child({ customBuilderParam: this.componentBuilder })
  27. }
  28. }
  29. }
  ```

  [BuilderParamInitMethodDemo01.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateRestock/entry/src/main/ets/pages/builderParam/BuilderParamInitMethodDemo01.ets#L15-L45)

**图1** 示例效果图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a4/v3/r2SWZXMoSLyHW5hAC7XH4Q/zh-cn_image_0000002571171223.png?HW-CC-KV=V1&HW-CC-Date=20260414T034245Z&HW-CC-Expire=86400&HW-CC-Sign=619EEFCC98E924BE099DFBA1457571B1823DEB49BA4FE180BB3FDCCE47D4C13E)

* 需要注意this的指向。

  示例如下：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Component
  2. struct Child {
  3. label: string = 'Child';

  5. @Builder
  6. customBuilder() {
  7. }

  9. @Builder
  10. customChangeThisBuilder() {
  11. }

  13. @BuilderParam customBuilderParam: () => void = this.customBuilder;
  14. @BuilderParam customChangeThisBuilderParam: () => void = this.customChangeThisBuilder;

  16. build() {
  17. Column() {
  18. this.customBuilderParam()
  19. this.customChangeThisBuilderParam()
  20. }
  21. }
  22. }

  24. @Entry
  25. @Component
  26. struct Parent {
  27. label: string = 'Parent';

  29. @Builder
  30. componentBuilder() {
  31. Text(`${this.label}`)
  32. }

  34. build() {
  35. Column() {
  36. // 调用this.componentBuilder()时，this指向当前@Entry所装饰的Parent组件，即label变量的值为'Parent'。
  37. this.componentBuilder()
  38. Child({
  39. // 把this.componentBuilder传给子组件Child的@BuilderParam customBuilderParam，this指向的是子组件Child，即label变量的值为'Child'。
  40. customBuilderParam: this.componentBuilder,
  41. // 把():void=>{this.componentBuilder()}传给子组件Child的@BuilderParam customChangeThisBuilderParam，
  42. // 因为箭头函数的this指向的是宿主对象，所以label变量的值为'Parent'。
  43. customChangeThisBuilderParam: (): void => {
  44. this.componentBuilder()
  45. }
  46. })
  47. }
  48. }
  49. }
  ```

  [BuilderParamInitMethodDemo02.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateRestock/entry/src/main/ets/pages/builderParam/BuilderParamInitMethodDemo02.ets#L15-L65)

**图2** 示例效果图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f9/v3/LjDbveFWT9Sb_HcRGRg0zw/zh-cn_image_0000002540770880.png?HW-CC-KV=V1&HW-CC-Date=20260414T034245Z&HW-CC-Expire=86400&HW-CC-Sign=6235C59DC24EA932ED9CCE0F394351A030BF895E648414C194515EBB9375F443)

## 限制条件

* 使用@BuilderParam装饰的变量只能通过@Builder函数进行初始化。具体参考[@BuilderParam装饰器初始化的值必须为@Builder](/consumer/cn/doc/harmonyos-guides/arkts-builderparam#builderparam装饰器初始化的值必须为builder)。
* 当[@Require装饰器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-require)和@BuilderParam装饰器一起使用时，必须初始化@BuilderParam装饰器。具体参考[@Require装饰器和@BuilderParam装饰器联合使用](/consumer/cn/doc/harmonyos-guides/arkts-builderparam#require装饰器和builderparam装饰器联合使用)。
* 在自定义组件尾随闭包的场景下，子组件有且仅有一个@BuilderParam用来接收此尾随闭包，且此@BuilderParam装饰的方法不能有参数。具体参考[尾随闭包初始化组件](/consumer/cn/doc/harmonyos-guides/arkts-builderparam#尾随闭包初始化组件)。

## 使用场景

### 参数初始化组件

@BuilderParam装饰的方法为有参数或无参数的形式，必须与指向的@Builder方法类型匹配。

收起

自动换行

深色代码主题

复制

```
1. class Tmp {
2. public label: string = '';
3. }

5. @Builder
6. function overBuilder($$: Tmp) {
7. Text($$.label)
8. .width('100%')
9. .height(50)
10. .backgroundColor(Color.Green)
11. }

13. @Component
14. struct Child {
15. label: string = 'Child';

17. @Builder
18. customBuilder() {
19. }

21. // 无参数类型，指向的customBuilder也是无参数类型
22. @BuilderParam customBuilderParam: () => void = this.customBuilder;
23. // 有参数类型，指向的overBuilder也是有参数类型的方法
24. @BuilderParam customOverBuilderParam: ($$: Tmp) => void = overBuilder;

26. build() {
27. Column() {
28. this.customBuilderParam()
29. this.customOverBuilderParam({ label: 'global Builder label' })
30. }
31. }
32. }

34. @Entry
35. @Component
36. struct Parent {
37. label: string = 'Parent';

39. @Builder
40. componentBuilder() {
41. Text(`${this.label}`)
42. }

44. build() {
45. Column() {
46. this.componentBuilder()
47. Child({ customBuilderParam: this.componentBuilder, customOverBuilderParam: overBuilder })
48. }
49. }
50. }
```

[BuilderParamSceneInitComponent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateRestock/entry/src/main/ets/pages/builderParam/BuilderParamSceneInitComponent.ets#L15-L66)

**图3** 示例效果图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9d/v3/Qaz6DI-ZQ0uySzjVhRso4w/zh-cn_image_0000002571291175.png?HW-CC-KV=V1&HW-CC-Date=20260414T034245Z&HW-CC-Expire=86400&HW-CC-Sign=C15AAD21CDD0B166BF1A9B7DD2A01C6B022FA63540BF07E16F874B26F8B43A43)

### 尾随闭包初始化组件

在自定义组件中，使用@BuilderParam装饰的属性可通过尾随闭包进行初始化。初始化时，组件后需紧跟一个大括号“{}”形成尾随闭包场景。

说明

* 此场景下自定义组件内仅有一个使用@BuilderParam装饰的属性。
* 此场景下自定义组件不支持通用属性。

开发者可将尾随闭包内的内容看作@Builder装饰的函数传给@BuilderParam。

示例1：

收起

自动换行

深色代码主题

复制

```
1. @Component
2. struct CustomContainer {
3. @Prop header: string = '';

5. @Builder
6. closerBuilder() {
7. }

9. // 使用父组件的尾随闭包{}(@Builder装饰的方法)初始化子组件@BuilderParam装饰的方法
10. @BuilderParam closer: () => void = this.closerBuilder;

12. build() {
13. Column() {
14. Text(this.header)
15. .fontSize(30)
16. this.closer()
17. }
18. }
19. }

21. @Builder
22. function specificParam(label1: string, label2: string) {
23. Column() {
24. Text(label1)
25. .fontSize(30)
26. Text(label2)
27. .fontSize(30)
28. }
29. }

31. @Entry
32. @Component
33. struct CustomContainerUser {
34. @State text: string = 'header';

36. build() {
37. Column() {
38. // 创建CustomContainer，在创建CustomContainer时，通过其后紧跟一个大括号“{}”形成尾随闭包
39. // 作为传递给子组件CustomContainer @BuilderParam closer: () => void的参数
40. CustomContainer({ header: this.text }) {
41. Column() {
42. specificParam('testA', 'testB')
43. }.backgroundColor(Color.Yellow)
44. .onClick(() => {
45. this.text = 'changeHeader';
46. })
47. }
48. }
49. }
50. }
```

[BuilderParamSceneTrailingClosure01.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateRestock/entry/src/main/ets/pages/builderParam/BuilderParamSceneTrailingClosure01.ets#L15-L66)

**图4** 示例效果图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6c/v3/N7WZ924GSCO1YDin1bSNkQ/zh-cn_image_0000002540611230.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034245Z&HW-CC-Expire=86400&HW-CC-Sign=41A4A485C21C568145ADE052F3E680907098D978EF418EF067825F6A060C1B0F)

可以使用全局或局部@Builder通过尾随闭包的形式对[@ComponentV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-create-custom-components#componentv2)装饰的自定义组件中的@BuilderParam装饰的方法进行初始化。

示例2：

收起

自动换行

深色代码主题

复制

```
1. @ComponentV2
2. struct ChildPage {
3. @Require @Param message: string = '';

5. @Builder
6. customBuilder() {
7. }

9. @BuilderParam customBuilderParam: () => void = this.customBuilder;

11. build() {
12. Column() {
13. Text(this.message)
14. .fontSize(30)
15. .fontWeight(FontWeight.Bold)
16. this.customBuilderParam()
17. }
18. }
19. }

21. const builderValue: string = 'Hello World';

23. @Builder
24. function overBuilder() {
25. Row() {
26. Text(`Global Builder: ${builderValue}`)
27. .fontSize(20)
28. .fontWeight(FontWeight.Bold)
29. }
30. }

32. @Entry
33. @ComponentV2
34. struct ParentPage {
35. @Local label: string = 'Parent Page';

37. @Builder
38. componentBuilder() {
39. Row() {
40. Text(`Local Builder: ${this.label}`)
41. .fontSize(20)
42. .fontWeight(FontWeight.Bold)
43. }
44. }

46. build() {
47. Column() {
48. ChildPage({ message: this.label }) {
49. Column() { // 使用局部@Builder，通过组件后紧跟一个大括号“{}”形成尾随闭包去初始化自定义组件@BuilderParam装饰的方法
50. this.componentBuilder();
51. }
52. }

54. Line()
55. .width('100%')
56. .height(10)
57. .backgroundColor('#000000').margin(10)
58. ChildPage({ message: this.label }) { // 使用全局@Builder，通过组件后紧跟一个大括号“{}”形成尾随闭包去初始化自定义组件@BuilderParam装饰的方法
59. Column() {
60. overBuilder();
61. }
62. }
63. }
64. }
65. }
```

[BuilderParamSceneTrailingClosure02.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateRestock/entry/src/main/ets/pages/builderParam/BuilderParamSceneTrailingClosure02.ets#L15-L81)

### 使用@BuilderParam隔离多组件对@Builder跳转逻辑的调用

当@Builder封装的系统组件包含跳转逻辑时，所有调用该@Builder的自定义组件将具备该跳转功能。如果需要禁用特定组件的跳转功能，可使用@BuilderParam来隔离跳转逻辑。

说明

当前示例代码中使用了Navigation组件导航，具体实现逻辑可以查询[Navigation](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-navigation-navigation)指南。

收起

自动换行

深色代码主题

复制

```
1. import { HelloWorldPageBuilder } from './helloworld';
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. const DOMAIN = 0x0000;

6. class NavigationParams {
7. public pathStack: NavPathStack = new NavPathStack();
8. public boo: boolean = true;
9. }

11. @Builder
12. function navigationAction(params: NavigationParams) {
13. Column() {
14. Navigation(params.pathStack) {
15. Button('router to page', { stateEffect: true, type: ButtonType.Capsule })
16. .width('80%')
17. .height(40)
18. .margin(20)
19. .onClick(() => {
20. // 通过修改@BuilderParam参数决定是否跳转。
21. if (params.boo) {
22. params.pathStack.pushPath({ name: 'HelloWorldPage' });
23. } else {
24. hilog.info(DOMAIN, 'testTag', '%{public}s', '@BuilderParam setting does not jump');
25. }
26. })
27. }
28. .navDestination(HelloWorldPageBuilder)
29. .hideTitleBar(true)
30. .height('100%')
31. .width('100%')
32. }
33. .height('25%')
34. .width('100%')
35. }

37. @Entry
38. @Component
39. struct ParentPage {
40. @State info: NavigationParams = new NavigationParams();

42. build() {
43. Column() {
44. Text('ParentPage')
45. navigationAction({ pathStack: this.info.pathStack, boo: true })
46. ChildPageOne()
47. ChildPage_BuilderParam({ eventBuilder: navigationAction })
48. }
49. .height('100%')
50. .width('100%')
51. }
52. }

54. @Component
55. struct ChildPageOne {
56. @State info: NavigationParams = new NavigationParams();

58. build() {
59. Column() {
60. Text('ChildPage')
61. navigationAction({ pathStack: this.info.pathStack, boo: true })
62. }
63. }
64. }

66. @Component
67. struct ChildPage_BuilderParam {
68. @State info: NavigationParams = new NavigationParams();
69. @BuilderParam eventBuilder: (param: NavigationParams) => void = navigationAction;

71. build() {
72. Column() {
73. Text('ChildPage_BuilderParam')
74. // 对传递过来的全局@Builder进行参数修改，可以实现禁用点击跳转的功能。
75. this.eventBuilder({ pathStack: this.info.pathStack, boo: false })
76. }
77. }
78. }
```

[BuilderParamSceneJumpLogic.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateRestock/entry/src/main/ets/pages/BuilderParamSceneJumpLogic.ets#L15-L94)

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. export function HelloWorldPageBuilder() {
3. HelloWorldPage()
4. }

6. @Component
7. struct HelloWorldPage {
8. @State message: string = 'Hello World';
9. @State pathStack: NavPathStack = new NavPathStack();

11. build() {
12. NavDestination() {
13. Column() {
14. Text(this.message)
15. .fontSize(20)
16. .fontWeight(FontWeight.Bold)
17. }
18. }
19. .height('100%')
20. .width('100%')
21. }
22. }
```

[helloworld.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateRestock/entry/src/main/ets/pages/helloworld.ets#L15-L38)

**router\_map.json**

这个文件位于项目的resources/base/profile目录下。

收起

自动换行

深色代码主题

复制

```
1. {
2. "routerMap": [
3. {
4. "name": "HelloWorldPage",
5. "buildFunction": "HelloWorldPageBuilder",
6. "pageSourceFile": "src/main/ets/pages/helloworld.ets"
7. }
8. ]
9. }
```

**module.json5**

这个文件位于应用模块的根目录下，例如entry/src/main/module.json5。

收起

自动换行

深色代码主题

复制

```
1. {
2. "module": {
3. "routerMap": "$profile:router_map",
4. ......
5. }
6. }
```

**图5** 示例效果图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/55/v3/kc1cXViiRKaUosmV93m50A/zh-cn_image_0000002571171225.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034245Z&HW-CC-Expire=86400&HW-CC-Sign=E689F00660D435B18C2688329BB7F68E6276BE4D7B0E1F43558E0367A953BB33)

### 使用全局和局部@Builder初始化@BuilderParam

在自定义组件中，使用@BuilderParam装饰的变量接收父组件通过@Builder传递的内容进行初始化，由于父组件的@Builder可以使用箭头函数改变当前的this指向，因此使用@BuilderParam装饰的变量会展示不同的内容。

收起

自动换行

深色代码主题

复制

```
1. @Component
2. struct ChildPage {
3. label: string = 'Child Page';

5. @Builder
6. customBuilder() {
7. }

9. @BuilderParam customBuilderParam: () => void = this.customBuilder;
10. @BuilderParam customChangeThisBuilderParam: () => void = this.customBuilder;

12. build() {
13. Column() {
14. this.customBuilderParam()
15. this.customChangeThisBuilderParam()
16. }
17. }
18. }

20. const builderValue: string = 'Hello World';

22. @Builder
23. function overBuilder() {
24. Row() {
25. Text(`Global Builder: ${builderValue}`)
26. .fontSize(20)
27. .fontWeight(FontWeight.Bold)
28. }
29. }

31. @Entry
32. @Component
33. struct ParentPage {
34. label: string = 'Parent Page';

36. @Builder
37. componentBuilder() {
38. Row() {
39. Text(`Local Builder: ${this.label}`)
40. .fontSize(20)
41. .fontWeight(FontWeight.Bold)
42. }
43. }

45. build() {
46. Column() {
47. // 调用this.componentBuilder()时，this指向当前@Entry所装饰的ParentPage组件，所以label变量的值为'Parent Page'。
48. this.componentBuilder()
49. ChildPage({
50. // 把this.componentBuilder传给子组件ChildPage的@BuilderParam customBuilderParam，
51. // this指向的是子组件ChildPage，所以label变量的值为'Child Page'。
52. customBuilderParam: this.componentBuilder,
53. // 把():void=>{this.componentBuilder()}传给子组件ChildPage的@BuilderParam customChangeThisBuilderParam，
54. // 因为箭头函数的this指向的是宿主对象，所以label变量的值为'Parent Page'。
55. customChangeThisBuilderParam: (): void => {
56. this.componentBuilder()
57. }
58. })
59. Line()
60. .width('100%')
61. .height(10)
62. .backgroundColor('#000000').margin(10)
63. // 调用全局overBuilder()时，this指向当前整个活动页，所以展示的内容为'Hello World'。
64. overBuilder()
65. ChildPage({
66. // 把全局overBuilder传给子组件ChildPage的@BuilderParam customBuilderParam，
67. // this指向当前整个活动页，所以展示的内容为'Hello World'。
68. customBuilderParam: overBuilder,
69. // 把全局overBuilder传给子组件ChildPage的@BuilderParam customChangeThisBuilderParam，
70. // this指向当前整个活动页，所以展示的内容为'Hello World'。
71. customChangeThisBuilderParam: overBuilder
72. })
73. }
74. }
75. }
```

[BuilderParamSceneGlobalLocalInit.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateRestock/entry/src/main/ets/pages/builderParam/BuilderParamSceneGlobalLocalInit.ets#L15-L91)

**图6** 示例效果图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/56/v3/hTejSbd3Tiul6mfq2Fumzg/zh-cn_image_0000002540770882.png?HW-CC-KV=V1&HW-CC-Date=20260414T034245Z&HW-CC-Expire=86400&HW-CC-Sign=C487837D23000DE6946ABB06E8262BBF5F4A3D8824408E8C8E9A4CAF6E8BB6CE)

### 在@ComponentV2装饰的自定义组件中使用@BuilderParam

使用全局或局部@Builder初始化@ComponentV2装饰的自定义组件中的@BuilderParam属性。

收起

自动换行

深色代码主题

复制

```
1. @ComponentV2
2. struct ChildPage {
3. @Param label: string = 'Child Page';

5. @Builder
6. customBuilder() {
7. }

9. @BuilderParam customBuilderParam: () => void = this.customBuilder;
10. @BuilderParam customChangeThisBuilderParam: () => void = this.customBuilder;

12. build() {
13. Column() {
14. this.customBuilderParam()
15. this.customChangeThisBuilderParam()
16. }
17. }
18. }

20. const builderValue: string = 'Hello World';

22. @Builder
23. function overBuilder() {
24. Row() {
25. Text(`Global Builder: ${builderValue}`)
26. .fontSize(20)
27. .fontWeight(FontWeight.Bold)
28. }
29. }

31. @Entry
32. @ComponentV2
33. struct ParentPage {
34. @Local label: string = 'Parent Page';

36. @Builder
37. componentBuilder() {
38. Row() {
39. Text(`Local Builder: ${this.label}`)
40. .fontSize(20)
41. .fontWeight(FontWeight.Bold)
42. }
43. }

45. build() {
46. Column() {
47. // 调用this.componentBuilder()时，this指向当前@Entry所装饰的ParentPage组件，所以label变量的值为'Parent Page'。
48. this.componentBuilder()
49. ChildPage({
50. // 把this.componentBuilder传给子组件ChildPage的@BuilderParam customBuilderParam，
51. // this指向的是子组件ChildPage，所以label变量的值为'Child Page'。
52. customBuilderParam: this.componentBuilder,
53. // 把():void=>{this.componentBuilder()}传给子组件ChildPage的@BuilderParam customChangeThisBuilderPara
54. // 因为箭头函数的this指向的是宿主对象，所以label变量的值为'Parent Page'。
55. customChangeThisBuilderParam: (): void => {
56. this.componentBuilder()
57. }
58. })
59. Line()
60. .width('100%')
61. .height(5)
62. .backgroundColor('#000000').margin(10)
63. // 调用全局overBuilder()时，this指向当前整个活动页，所以展示的内容为'Hello World'。
64. overBuilder()
65. ChildPage({
66. // 把全局overBuilder传给子组件ChildPage的@BuilderParam customBuilderParam，
67. // this指向当前整个活动页，所以展示的内容为'Hello World'。
68. customBuilderParam: overBuilder,
69. // 把全局overBuilder传给子组件ChildPage的@BuilderParam customChangeThisBuilderParam，
70. // this指向当前整个活动页，所以展示的内容为'Hello World'。
71. customChangeThisBuilderParam: overBuilder
72. })
73. }
74. }
75. }
```

[BuilderParamSceneInComponentV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateRestock/entry/src/main/ets/pages/builderParam/BuilderParamSceneInComponentV2.ets#L15-L91)

**图7** 示例效果图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9c/v3/FSklkLtBTxid0QLDrtl7gA/zh-cn_image_0000002571291177.png?HW-CC-KV=V1&HW-CC-Date=20260414T034245Z&HW-CC-Expire=86400&HW-CC-Sign=4129CC24564BBC067EF8FE336BCB199F44FEA377F649F051E3B16F05E4D3FF96)

## 常见问题

### 改变内容UI不刷新

调用自定义组件ChildPage时，通过this.componentBuilder传递@Builder参数。this指向自定义组件内部，因此父组件中改变label的值时，ChildPage无法感知这一变化。

【反例】

收起

自动换行

深色代码主题

复制

```
1. @Component
2. struct ChildPage {
3. @State label: string = 'Child Page';

5. @Builder
6. customBuilder() {
7. }

9. @BuilderParam customChangeThisBuilderParam: () => void = this.customBuilder;

11. build() {
12. Column() {
13. this.customChangeThisBuilderParam()
14. }
15. }
16. }

18. @Entry
19. @Component
20. struct ParentPage {
21. @State label: string = 'Parent Page';

23. @Builder
24. componentBuilder() {
25. Row() {
26. Text(`Builder :${this.label}`)
27. .fontSize(20)
28. .fontWeight(FontWeight.Bold)
29. }
30. }

32. build() {
33. Column() {
34. ChildPage({
35. // 当前写法this指向ChildPage组件内
36. customChangeThisBuilderParam: this.componentBuilder
37. })
38. // 请将$r('app.string.builderOpp_text1')替换为实际资源文件，在本示例中该资源文件的value值为"点击改变label内容"
39. Button($r('app.string.builderOpp_text1'))
40. .onClick(() => {
41. this.label = 'Hello World';
42. })
43. }
44. }
45. }
```

[BuilderParamProblemNotRefreshOpposite.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateRestock/entry/src/main/ets/pages/builderParam/BuilderParamProblemNotRefreshOpposite.ets#L15-L60)

使用箭头函数将@Builder传递到自定义组件ChildPage中，this指向会停留在父组件ParentPage里。在父组件中改变label的值时，ChildPage会感知到并重新渲染UI。

【正例】

收起

自动换行

深色代码主题

复制

```
1. @Component
2. struct ChildPage {
3. @State label: string = 'Child Page';

5. @Builder
6. customBuilder() {
7. }

9. @BuilderParam customChangeThisBuilderParam: () => void = this.customBuilder;

11. build() {
12. Column() {
13. this.customChangeThisBuilderParam()
14. }
15. }
16. }

18. @Entry
19. @Component
20. struct ParentPage {
21. @State label: string = 'Parent Page';

23. @Builder
24. componentBuilder() {
25. Row() {
26. Text(`Builder :${this.label}`)
27. .fontSize(20)
28. .fontWeight(FontWeight.Bold)
29. }
30. }

32. build() {
33. Column() {
34. ChildPage({
35. customChangeThisBuilderParam: () => {
36. this.componentBuilder()
37. }
38. })
39. // 请将$r('app.string.builderOpp_text1')替换为实际资源文件，在本示例中该资源文件的value值为"点击改变label内容"
40. Button($r('app.string.builderOpp_text1'))
41. .onClick(() => {
42. this.label = 'Hello World';
43. })
44. }
45. }
46. }
```

[BuilderParamProblemNotRefreshPositive.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateRestock/entry/src/main/ets/pages/builderParam/BuilderParamProblemNotRefreshPositive.ets#L15-L61)

### @Require装饰器和@BuilderParam装饰器联合使用

由于@Require装饰器所装饰的变量需进行初始化，未初始化会导致编译报错。

【反例】

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. function globalBuilder() {
3. Text('Hello World')
4. }

6. @Entry
7. @Component
8. struct CustomBuilderDemo {
9. build() {
10. Column() {
11. // 由于未对@Require装饰的变量ChildBuilder进行赋值，此处无论是编译还是编辑，均会报错。
12. ChildPage()
13. }
14. }
15. }

17. @Component
18. struct ChildPage {
19. @Require @BuilderParam ChildBuilder: () => void = globalBuilder;

21. build() {
22. Column() {
23. this.ChildBuilder()
24. }
25. }
26. }
```

@Require装饰的变量必须从外部初始化。

【正例】

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. function globalBuilder() {
3. Text('Hello World')
4. }

6. @Entry
7. @Component
8. struct CustomBuilderDemo {
9. build() {
10. Column() {
11. ChildPage({ childBuilder: globalBuilder })
12. }
13. }
14. }

16. @Component
17. struct ChildPage {
18. @Require @BuilderParam childBuilder: () => void = globalBuilder;

20. build() {
21. Column() {
22. this.childBuilder()
23. }
24. }
25. }
```

[BuilderParamProblemCombinedPositive.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateRestock/entry/src/main/ets/pages/builderParam/BuilderParamProblemCombinedPositive.ets#L15-L41)

### @BuilderParam装饰器初始化的值必须为@Builder

使用@State装饰器装饰的变量，在初始化子组件的@BuilderParam和ChildBuilder变量时，编译时会输出报错信息。

【反例】

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. function globalBuilder() {
3. Text('Hello World')
4. }

6. @Entry
7. @Component
8. struct CustomBuilderDemo {
9. @State message: string = '';

11. build() {
12. Column() {
13. // @BuilderParam装饰的变量ChildBuilder接收@State装饰的变量，会出现编译和编辑报错
14. ChildPage({ ChildBuilder: this.message })
15. }
16. }
17. }

19. @Component
20. struct ChildPage {
21. @BuilderParam ChildBuilder: () => void = globalBuilder;

23. build() {
24. Column() {
25. this.ChildBuilder()
26. }
27. }
28. }
```

使用全局@Builder装饰的globalBuilder()方法为子组件@BuilderParam装饰的ChildBuilder变量初始化，编译无报错，功能正常。

【正例】

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. function globalBuilder() {
3. Text('Hello World')
4. }

6. @Entry
7. @Component
8. struct CustomBuilderDemo {
9. build() {
10. Column() {
11. ChildPage({ childBuilder: globalBuilder })
12. }
13. }
14. }

16. @Component
17. struct ChildPage {
18. @BuilderParam childBuilder: () => void = globalBuilder;

20. build() {
21. Column() {
22. this.childBuilder()
23. }
24. }
25. }
```

[BuilderParamProblemMustBuilderPositive.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateRestock/entry/src/main/ets/pages/builderParam/BuilderParamProblemMustBuilderPositive.ets#L15-L41)