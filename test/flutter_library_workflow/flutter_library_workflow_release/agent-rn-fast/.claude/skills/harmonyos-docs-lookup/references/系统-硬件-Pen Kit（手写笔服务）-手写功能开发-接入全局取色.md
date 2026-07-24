接入全局取色功能，用户可以使用手指或者手写笔操作取色器在屏幕上移动，在目标位置抬起手指/抬起手写笔，会生成该位置色值对应的图像信息。

## 场景介绍

在应用中拉起全局取色，效果如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/85/v3/LphnZmbFRgSJufdOMgwK9g/zh-cn_image_0000002535422317.png?HW-CC-KV=V1&HW-CC-Date=20260414T045913Z&HW-CC-Expire=86400&HW-CC-Sign=39731C063FFE2933D566E13AAD62541AD5CCF6B4731B422E60D2E29FF00BDF2C "点击放大")

支持获取当前屏幕上选中位置的色值和色域空间。

## 限制与约束

* 全局取色能力支持设备：Tablet、PC/2in1，并且从5.1.1(19)版本开始，新增支持设备：Phone。
* 设备不支持连接手写笔的话，无法使用全局取色能力。

## 接口说明

展开

| 类名 | 接口名 | 说明 |
| --- | --- | --- |
| [imageFeaturePicker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker) | [pickForResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker#section759192934316) | 启动取色器。此API用于启动取色器，在取色器移动时不显示色值。 |

## 开发步骤

1.导入相关模块。

收起

自动换行

深色代码主题

复制

```
1. import { imageFeaturePicker } from '@kit.Penkit';
2. import { BusinessError } from '@kit.BasicServicesKit';
```

2.构造全局取色能力。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct Index {
4. @State message: string = 'Hello World';

6. build() {
7. Stack({ alignContent: Alignment.Center }) {
8. Column() {
9. Row() {
10. Button() {
11. Text('Call GlobalColorPicker from ets side')
12. .fontSize(18)
13. .fontWeight(FontWeight.Normal)
14. }
15. .width('50%')
16. .height('60vp')
17. .align(Alignment.Center)
18. .onClick((event) => {
19. imageFeaturePicker.pickForResult(event.displayX, event.displayY)
20. .then((colorInfo: imageFeaturePicker.PickedColorInfo) => {
21. if (colorInfo) {
22. console.info('colorInfo=' + JSON.stringify(colorInfo));
23. }
24. }).catch((err: BusinessError) => {
25. console.error(`pickForResult failed. Code is ${err.code}, message is ${err.message}`)
26. })
27. })
28. }
29. }
30. .align(Alignment.Center)
31. }
32. .width('100%')
33. .height('100%')
34. }
35. }
```