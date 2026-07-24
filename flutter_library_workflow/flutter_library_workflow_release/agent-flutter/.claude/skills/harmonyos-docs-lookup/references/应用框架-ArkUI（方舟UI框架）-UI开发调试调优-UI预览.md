DevEco Studio为开发者提供了UI预览功能，方便查看UI效果并随时调整页面布局。预览支持页面预览和组件预览。图1中左侧图标![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ec/v3/2_TXr0GBRLivIj6bd54hHQ/zh-cn_image_0000002571291761.png?HW-CC-KV=V1&HW-CC-Date=20260414T040354Z&HW-CC-Expire=86400&HW-CC-Sign=73C47FF3D9DC20703E2C343CA23C632E1E252624F6EAEEC5F2BFEA86F04E2E77)表示页面预览，右侧图标![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ff/v3/0Wab-epzSD2wO1_1Uv2TyA/zh-cn_image_0000002540611814.png?HW-CC-KV=V1&HW-CC-Date=20260414T040354Z&HW-CC-Expire=86400&HW-CC-Sign=36A9059CD6002A7906928550DEE0424D5136D4F26535E7930F9DC38A78A12248)表示组件预览。

说明

操作系统和真机设备的差异可能导致预览效果与真机效果不同。预览效果仅作参考，实际效果以真机为准。

**图1** 预览图标

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5d/v3/xwUVdpB8TjSozPO1rPzu9Q/zh-cn_image_0000002571171809.png?HW-CC-KV=V1&HW-CC-Date=20260414T040354Z&HW-CC-Expire=86400&HW-CC-Sign=F7B1C7E9495E77F817B2E5AE6545004CFDB073F8C3BD26EA7FE352C8B383B110)

## 页面预览

ArkTS应用/元服务均支持页面预览。页面预览通过在工程的ets文件中，给自定义组件添加[@Entry](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-create-custom-components#entry)装饰器，即可以查看当前UI页面效果。

* 启动方式：选中需要预览的ets页面，点击右侧侧边栏的Previewer按钮，启动页面预览。
* 热加载：在启动页面预览的前提下，添加、删除或修改UI组件后，通过Ctrl+S保存，预览器会同步刷新预览效果，无需重新启动预览。
* 路由能力：支持通过路由能力进行页面切换查看其它页面预览效果。

在页面预览的基础上，提供了极速预览和Inspector双向预览两种特性。下面将详细说明这两种特性。

### 极速预览

支持在修改组件的属性时，无需使用Ctrl+S进行保存，可以直接观察到修改后的预览效果。极速预览默认开启，若需关闭，点击预览器右上角按钮![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d9/v3/DNpUhAbVTlGBUJv59oCB0Q/zh-cn_image_0000002540771468.png?HW-CC-KV=V1&HW-CC-Date=20260414T040354Z&HW-CC-Expire=86400&HW-CC-Sign=7ABAA26C20AD561CE7FDAA943304BB730244166DE11796FA5973D29023416269)即可。

注意

部分应用场景不支持极速预览：

* 不显示的组件。
* 新增或删除组件。
* 包含private变量或无类型的controller的组件。
* 使用了[@Builder](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-builder)、[@Style](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-style)、[@Extend](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-extend)等装饰器的组件。
* 修改使用import导入外部组件/模块的组件。
* 修改状态变量。

效果如图2所示：

**图2** 极速预览演示图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1d/v3/ruS1V41mQ2emPqpr7d-IDQ/zh-cn_image_0000002571291763.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040354Z&HW-CC-Expire=86400&HW-CC-Sign=A49242D798B5537E07DBEA5924CF65EF8CCCC669FDEBB1F9050F8C9A4A367420)

### inspector双向预览

支持ets文件与预览器的双向预览。使用时，点击预览器界面图标![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e9/v3/MKbeix8wT2apoaJo-4QIPg/zh-cn_image_0000002540611816.png?HW-CC-KV=V1&HW-CC-Date=20260414T040354Z&HW-CC-Expire=86400&HW-CC-Sign=C6FCE2B521A12B5EAF11629C3E40CF04F333945299B9E341DE7007F30FDD46BD)开启双向预览功能。

开启双向预览功能后，支持代码编辑器、UI界面和组件树之间的联动：

1. 选中预览器界面中的组件，组件树上对应的组件将被选中，同时代码编辑器中的布局文件中对应的代码块高亮显示。
2. 选中布局文件中的代码块，预览器界面将高亮显示，组件树上的组件节点将呈现被选中的状态。
3. 选中组件树中的组件，对应的代码块和预览器界面将高亮显示。
4. 在预览界面，通过组件的属性面板修改可修改的属性或样式。预览界面的修改会自动同步到代码编辑器中，并实时刷新预览器界面。代码编辑器中的源码修改也会实时刷新预览器界面，并更新组件树信息及组件属性。

效果如图3所示：

**图3** inspector双向预览演示图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/17/v3/GGj12GnASIG3FpCXZ1ZvMA/zh-cn_image_0000002571171811.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040354Z&HW-CC-Expire=86400&HW-CC-Sign=983291416B03963E259D40A6623BFFDCFB4787DA30CE1C5DB5C4B148A1F22A7D)

## 组件预览

ArkTS应用/元服务支持组件预览功能。组件预览通过在自定义组件前添加[@Preview](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-component-previewer#preview装饰器)装饰器实现。在单个源文件中，最多可以使用10个@Preview装饰自定义组件。启动方式：

* 当组件被@Entry和@Preview装饰时，点击右侧侧边栏的Previewer按钮，启动页面预览，页面加载成功后，点击![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c/v3/XpzH53NiQVmetLuSryh5Qw/zh-cn_image_0000002540611814.png?HW-CC-KV=V1&HW-CC-Date=20260414T040354Z&HW-CC-Expire=86400&HW-CC-Sign=57B189B4DDD1A205A2E40A529BF5278B3E1CFEA779F4417FBC1A8406AF715EB9)，切换到组件预览。
* 当组件仅被@Preview装饰时，点击右侧侧边栏的Previewer按钮，则默认为组件预览。

组件预览时，使用@Preview装饰器的默认属性（请参考[PreviewParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-component-previewer#previewparams9)）进行效果显示。可以通过设置@Preview的参数，指定预览设备的相关属性，包括设备类型、屏幕形状等。

@Preview的使用参考如下示例：

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Preview
3. @Component
4. struct ComponentPreviewOne {
5. build() {
6. Column() {
7. Text('this is component previewer One')
8. .height(80)
9. .fontSize(30)
10. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件
11. Image($r('app.media.startIcon'))
12. .height(300)
13. .width(300)
14. }
15. }
16. }

18. @Preview
19. @Component
20. struct ComponentPreviewTwo {
21. build() {
22. Column() {
23. Text('this is component previewer Two')
24. .height(80)
25. .fontSize(30)
26. .fontColor(Color.Pink)
27. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件
28. Image($r('app.media.startIcon'))
29. .height(300)
30. .width(300)
31. }
32. }
33. }
```

效果如图4所示：

**图4** 组件预览效果图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/75/v3/3gTlqAfrRn65PukCyWbUcg/zh-cn_image_0000002540771470.png?HW-CC-KV=V1&HW-CC-Date=20260414T040354Z&HW-CC-Expire=86400&HW-CC-Sign=8BA24B141EAFAB7567DD2F96FFF233C7D05B3F69C3E279E5EBFD15BD8262EBE6)

## 动态修改分辨率

同一个应用/元服务可以运行在多个设备上，因不同设备的屏幕分辨率、形状、大小等不同，开发者需要在不同的设备上查看应用/元服务的UI布局和交互效果。预览支持动态修改分辨率，方便开发者随时查看不同设备上的页面显示效果。启动方式：启动页面预览后，点击右上角![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2c/v3/0c9rXOGDR7GznNB_ok9X5Q/zh-cn_image_0000002571291765.png?HW-CC-KV=V1&HW-CC-Date=20260414T040354Z&HW-CC-Expire=86400&HW-CC-Sign=DB5D7E4FDD1F118FDE5082369E47A7644DABA03E7D319329E71B376EDBF191D4)，即可拖动页面选中框动态修改当前设备的屏幕大小。

效果如图5所示：

**图5** 动态修改分辨率效果图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fd/v3/PVAi_DqbQ4qe9qcBeL0xkg/zh-cn_image_0000002540611818.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040354Z&HW-CC-Expire=86400&HW-CC-Sign=CEFEA762C5486D8D2F2F36452E4A67D94897FA871E8809F0D9480E0F4AEDAC9E)