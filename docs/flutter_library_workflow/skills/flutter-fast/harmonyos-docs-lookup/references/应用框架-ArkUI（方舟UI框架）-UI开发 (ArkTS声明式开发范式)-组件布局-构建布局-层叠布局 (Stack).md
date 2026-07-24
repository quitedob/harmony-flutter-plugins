## 概述

层叠布局（StackLayout）用于在屏幕上预留一块区域来显示组件中的元素，提供元素可以重叠的布局。层叠布局通过[Stack](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-stack)容器组件实现位置的固定定位与层叠，容器中的子元素依次入栈，后一个子元素覆盖前一个子元素，子元素可以叠加，也可以设置位置。

层叠布局具有较强的页面层叠、位置定位能力，其使用场景有广告、卡片层叠效果等。

如图1，Stack作为容器，容器内的子元素的顺序为Item1->Item2->Item3。

**图1** 层叠布局

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dc/v3/iXsgQkRZTuq3C7_0JTp-_g/zh-cn_image_0000002540771006.png?HW-CC-KV=V1&HW-CC-Date=20260414T034709Z&HW-CC-Expire=86400&HW-CC-Sign=6C0C51210905800FE568C30A55FD63E67EBCA5FF88DFC9F63117118B9A62183F)

说明

过多的嵌套组件数会导致性能劣化。在部分场景中，直接使用组件属性或借助系统API的能力可以替代层叠布局的效果，减少了嵌套组件数进而优化性能。最佳实践请参考[组件嵌套优化-优先使用组件属性代替嵌套组件](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-component-nesting-optimization#section78181114123811)。

## 开发布局

Stack组件为容器组件，容器内可包含各种子元素。其中子元素默认进行居中堆叠。子元素被约束在Stack下，进行自己的样式定义以及排列。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. let mTop:Record<string,number> = { 'top': 50 }

4. @Entry
5. @Component
6. struct StackLayoutExample {
7. build() {
8. Column(){
9. Stack({ }) {
10. Column(){}.width('90%').height('100%').backgroundColor('#ff58b87c')
11. Text('text').width('60%').height('60%').backgroundColor('#ffc3f6aa')
12. Button('button').width('30%').height('30%').backgroundColor('#ff8ff3eb').fontColor('#000')
13. }.width('100%').height(150).margin(mTop)
14. }
15. }
16. }
```

[StackLayoutExample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/stacklayout/StackLayoutExample.ets#L15-L32)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/89/v3/spRtZ1GWSRaYe1ikYE-uMw/zh-cn_image_0000002571291303.png?HW-CC-KV=V1&HW-CC-Date=20260414T034709Z&HW-CC-Expire=86400&HW-CC-Sign=2345021410125F26394BAEAB8F70CC5ED0D52A151F64ABCDDB60F9ED31B9EE4A)

## 对齐方式

Stack组件通过[alignContent参数](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-stack#aligncontent)实现位置的相对移动。如图2所示，支持九种对齐方式。

**图2** Stack容器内元素的对齐方式

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fb/v3/nej4KuMJQ6GPEV6Qu5eXqw/zh-cn_image_0000002540611356.png?HW-CC-KV=V1&HW-CC-Date=20260414T034709Z&HW-CC-Expire=86400&HW-CC-Sign=13E1CC6DC0A7BF63590925306399E686F4292E66F2C6EB751F807C90E4E4D973)

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. @Entry
3. @Component
4. struct StackAlignContentExample {
5. build() {
6. Stack({ alignContent: Alignment.TopStart }) {
7. Text('Stack').width('90%').height('100%').backgroundColor('#e1dede').align(Alignment.BottomEnd)
8. Text('Item 1').width('70%').height('80%').backgroundColor(0xd2cab3).align(Alignment.BottomEnd)
9. Text('Item 2').width('50%').height('60%').backgroundColor(0xc1cbac).align(Alignment.BottomEnd)
10. }.width('100%').height(150).margin({ top: 5 })
11. }
12. }
```

[StackLayoutAlignContent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/stacklayout/StackLayoutAlignContent.ets#L15-L28)

## Z序控制

Stack容器中兄弟组件显示层级关系可以通过[Z序控制](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-z-order)的zIndex属性改变。zIndex值越大，显示层级越高，即zIndex值大的组件会覆盖在zIndex值小的组件上方。

在层叠布局中，如果后面子元素尺寸大于前面子元素尺寸，则前面子元素完全隐藏。

收起

自动换行

深色代码主题

复制

```
1. Stack({ alignContent: Alignment.BottomStart }) {
2. Column() {
3. // 请将$r('app.string.stack_num1')替换为实际资源文件，在本示例中该资源文件的value值为"Stack子元素1"
4. Text($r('app.string.stack_num1')).textAlign(TextAlign.End).fontSize(20)
5. }.width(100).height(100).backgroundColor(0xffd306)

7. Column() {
8. // 请将$r('app.string.stack_num2')替换为实际资源文件，在本示例中该资源文件的value值为"Stack子元素2"
9. Text($r('app.string.stack_num2')).fontSize(20)
10. }.width(150).height(150).backgroundColor(Color.Pink)

12. Column() {
13. // 请将$r('app.string.stack_num3')替换为实际资源文件，在本示例中该资源文件的value值为"Stack子元素3"
14. Text($r('app.string.stack_num3')).fontSize(20)
15. }.width(200).height(200).backgroundColor(Color.Grey)
16. }.width(350).height(350).backgroundColor(0xe0e0e0)
```

[StackLayoutNozIndex.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/stacklayout/StackLayoutNozIndex.ets#L20-L37)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cb/v3/sSknCapJSUC_gfp7Hzwh8A/zh-cn_image_0000002571171351.png?HW-CC-KV=V1&HW-CC-Date=20260414T034709Z&HW-CC-Expire=86400&HW-CC-Sign=9B08058AE91FD2E4DEAFAEB385FA04556E7FF2E210CCA94612D1F098C76C17B5)

上图中，最后的子元素3的尺寸大于前面的所有子元素，所以，前面两个元素完全隐藏。改变子元素1、子元素2的zIndex属性后，可以将元素展示出来。

收起

自动换行

深色代码主题

复制

```
1. Stack({ alignContent: Alignment.BottomStart }) {
2. Column() {
3. // 请将$r('app.string.stack_num1')替换为实际资源文件，在本示例中该资源文件的value值为"Stack子元素1"
4. Text($r('app.string.stack_num1')).fontSize(20)
5. }.width(100).height(100).backgroundColor(0xffd306).zIndex(2)

7. Column() {
8. // 请将$r('app.string.stack_num2')替换为实际资源文件，在本示例中该资源文件的value值为"Stack子元素2"
9. Text($r('app.string.stack_num2')).fontSize(20)
10. }.width(150).height(150).backgroundColor(Color.Pink).zIndex(1)

12. Column() {
13. // 请将$r('app.string.stack_num3')替换为实际资源文件，在本示例中该资源文件的value值为"Stack子元素3"
14. Text($r('app.string.stack_num3')).fontSize(20)
15. }.width(200).height(200).backgroundColor(Color.Grey)
16. }.width(350).height(350).backgroundColor(0xe0e0e0)
```

[StackLayoutzIndex.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/stacklayout/StackLayoutzIndex.ets#L20-L37)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/91/v3/mNh0YvLvRpOWyF7bKO7HSA/zh-cn_image_0000002540771008.png?HW-CC-KV=V1&HW-CC-Date=20260414T034709Z&HW-CC-Expire=86400&HW-CC-Sign=9950D107A701686A9CA5D6D30020FFE2D8EC818B0D1D4046CC1159CA093BE71B)

## 场景示例

使用层叠布局快速搭建页面。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct StackSample {
4. private arr: string[] = ['APP1', 'APP2', 'APP3', 'APP4', 'APP5', 'APP6', 'APP7', 'APP8'];

6. build() {
7. Stack({ alignContent: Alignment.Bottom }) {
8. Flex({ wrap: FlexWrap.Wrap }) {
9. ForEach(this.arr, (item:string) => {
10. Text(item)
11. .width(100)
12. .height(100)
13. .fontSize(16)
14. .margin(10)
15. .textAlign(TextAlign.Center)
16. .borderRadius(10)
17. .backgroundColor(0xFFFFFF)
18. }, (item:string):string => item)
19. }.width('100%').height('100%')

21. Flex({ justifyContent: FlexAlign.SpaceAround, alignItems: ItemAlign.Center }) {
22. // 请将$r('app.string.contacts')替换为实际资源文件，在本示例中该资源文件的value值为"联系人"
23. Text($r('app.string.contacts')).fontSize(16)
24. // 请将$r('app.string.setting')替换为实际资源文件，在本示例中该资源文件的value值为"设置"
25. Text($r('app.string.setting')).fontSize(16)
26. // 请将$r('app.string.text_message')替换为实际资源文件，在本示例中该资源文件的value值为"短信"
27. Text($r('app.string.text_message')).fontSize(16)
28. }
29. .width('50%')
30. .height(50)
31. .backgroundColor('#16302e2e')
32. .margin({ bottom: 15 })
33. .borderRadius(15)
34. }.width('100%').height('100%').backgroundColor('#CFD0CF')
35. }
36. }
```

[StackLayoutSceneExample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/stacklayout/StackLayoutSceneExample.ets#L15-L52)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/49/v3/TMp5VFYBSf6mJvPnt5ZFvg/zh-cn_image_0000002571291305.png?HW-CC-KV=V1&HW-CC-Date=20260414T034709Z&HW-CC-Expire=86400&HW-CC-Sign=38352C6B7377EC04C115034B2C899BD12E7E34C18B49205F2913991D152C7C91)

## 示例代码

* [组件堆叠](https://gitcode.com/HarmonyOS_Samples/component-stack)