在状态管理V1中，推荐使用[$$](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-two-way-sync)实现系统组件的双向绑定。

在状态管理V2中，推荐使用!!语法糖统一处理双向绑定。

说明

!!语法从API version 12开始支持。

## 概述

!!双向绑定语法，是一个语法糖方便开发者实现数据双向绑定，用于初始化子组件的[@Param](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-param)和[@Event](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-event)。其中@Event方法名需要声明为“$”+ @Param属性名，详见[使用场景](/consumer/cn/doc/harmonyos-guides/arkts-new-binding#使用场景)。

* 如果使用了!!双向绑定语法，表明父组件的变化会同步给子组件，子组件的变化也会同步给父组件。
* 父组件未使用!!时，变化是单向的。

## 使用场景

### 自定义组件间双向绑定

1. 在Index中构造Star子组件，双向绑定父子组件中的value属性，并初始化子组件的@Param value和@Event $value。

   @Param与@Event装饰器配合使用的双向绑定语法糖。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. Child({ value: this.value, $value: (val: number) => { this.value = val; } })
   ```

   上述语法可以简化为!!双向绑定语法糖。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. Star({ value: this.value!! })
   ```
2. 使用@Param value与@Event $value语法实现自定义组件双向绑定。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @ComponentV2
   3. struct Parent {
   4. @Local value: number = 0;

   6. build() {
   7. Column() {
   8. Text(`${this.value}`)
   9. // 点击Index中的Button改变value值，父组件Parent和子组件Child中的Text将同步更新。
   10. Button(`change value in parent component`).onClick(() => {
   11. this.value++;
   12. })
   13. // 使用@Param与@Event语法实现自定义组件双向绑定。
   14. Child({ value: this.value, $value: (val: number) => { this.value = val; } })
   15. // ...
   16. // ···
   17. }
   18. }
   19. }

   21. @ComponentV2
   22. struct Child {
   23. @Param value: number = 0;
   24. @Event $value: (val: number) => void = (val: number) => {};

   26. build() {
   27. Column() {
   28. Text(`${this.value}`)
   29. // 点击子组件Child中的Button，调用`this.$value(10)`方法，父组件Parent和子组件Child中的Text将同步更新。
   30. Button(`change value in child component`).onClick(() => {
   31. this.$value(10);
   32. })
   33. }
   34. }
   35. }
   ```
3. 使用!!语法糖实现自定义组件双向绑定。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @ComponentV2
   3. struct Index {
   4. @Local value: number = 0;

   6. build() {
   7. Column() {
   8. Text(`${this.value}`)
   9. // 点击Index中的Button改变value值，父组件Index和子组件Star中的Text将同步更新。
   10. Button(`change value in parent component`).onClick(() => {
   11. this.value++;
   12. })
   13. // 使用!!语法糖实现自定义组件双向绑定。
   14. Star({ value: this.value!! })
   15. // ...
   16. }
   17. }
   18. }

   20. @ComponentV2
   21. struct Star {
   22. @Param value: number = 0;
   23. @Event $value: (val: number) => void = (val: number) => {};

   25. build() {
   26. Column() {
   27. Text(`${this.value}`)
   28. // 点击子组件Star中的Button，调用`this.$value(10)`方法，父组件Index和子组件Star中的Text将同步更新。
   29. Button(`change value in child component`).onClick(() => {
   30. this.$value(10);
   31. })
   32. }
   33. }
   34. }
   ```

   [Binding\_Star.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ArkUI_Binding/entry/src/main/ets/pages/Binding_Star.ets#L15-L52)

**使用限制**

* !!双向绑定语法不支持多层父子组件传递。
* 不支持与@Event混用。从API version 18开始，当使用!!双向绑定语法给子组件传递参数时，给对应的@Event方法传参会编译报错。
* 当使用3个或更多感叹号（!!!、!!!!、!!!!!等）时，不支持双向绑定功能。

### 系统组件参数双向绑定

!!运算符为系统组件提供TS变量的引用，使得TS变量和系统组件的内部状态保持同步。添加方式是在变量名后添加，例如isShow!!。

内部状态的含义由组件决定。例如：[bindMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-menu#bindmenu11)组件的isShow参数。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const TAG: string = 'click show Menu';
4. const DOMAIN = 0xFF00;

6. @Entry
7. @ComponentV2
8. struct BindMenuInterface {
9. @Local isShow: boolean = false;

11. build() {
12. Column() {
13. Row() {
14. Text('click show Menu')
15. .bindMenu(this.isShow!!, // 双向绑定。
16. [
17. {
18. value: 'Menu1',
19. action: () => {
20. hilog.info(DOMAIN, TAG, 'handle Menu1 click');
21. }
22. },
23. {
24. value: 'Menu2',
25. action: () => {
26. hilog.info(DOMAIN, TAG, 'handle Menu2 click');
27. }
28. },
29. ])
30. }.height('50%')

32. Text('isShow: ' + this.isShow).fontSize(18).fontColor(Color.Red)
33. Row() {
34. Button('Click')
35. .onClick(() => {
36. this.isShow = true;
37. })
38. .width(100)
39. .fontSize(20)
40. .margin(10)
41. }
42. }.width('100%')
43. }
44. }
```

[Sys\_Binding.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ArkUI_Binding/entry/src/main/ets/pages/Sys_Binding.ets#L15-L59)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e5/v3/QUFm6KaNToepWECk9rCYjw/zh-cn_image_0000002540770924.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034604Z&HW-CC-Expire=86400&HW-CC-Sign=62A364CD151F9AA1802336B885CA4D0108331A00CE4366DB15E42D6D3C6925B1)

**使用规则**

* 当前!!双向绑定支持基础类型变量，当该变量使用[@State](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-state)等状态管理V1装饰器装饰，或者[@Local](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-local)等状态管理V2装饰器装饰时，变量值的变化会触发UI刷新。

  展开

  | 属性 | 支持的参数 | 起始API版本 |
  | --- | --- | --- |
  | [bindMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-menu#bindmenu11) | isShow | 18 |
  | [bindContextMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-menu#bindcontextmenu12) | isShown | 18 |
  | [bindPopup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-popup#bindpopup) | show | 18 |
  | [TextInput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#textinputoptions对象说明) | text | 18 |
  | [TextArea](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textarea#textareaoptions对象说明) | text | 18 |
  | [Search](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-search#searchoptions18对象说明) | value | 18 |
  | [BindSheet](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-sheet-transition#bindsheet) | isShow | 18 |
  | [BindContentCover](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-modal-transition#bindcontentcover) | isShow | 18 |
  | [SideBarContainer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-sidebarcontainer#sidebarwidth) | sideBarWidth | 18 |
  | [Navigation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation#navbarwidth9) | navBarWidth | 18 |
  | [Toggle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-toggle#toggleoptions18对象说明) | isOn | 18 |
  | [Checkbox](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-checkbox#select) | select | 18 |
  | [CheckboxGroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-checkboxgroup#selectall) | selectAll | 18 |
  | [Radio](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-radio#checked) | checked | 18 |
  | [Rating](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-rating#ratingoptions18对象说明) | rating | 18 |
  | [Slider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-slider#slideroptions对象说明) | value | 18 |
  | [Select](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-select#selected) | selected | 18 |
  | [Select](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-select#value) | value | 18 |
  | [MenuItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-menuitem#selected) | selected | 18 |