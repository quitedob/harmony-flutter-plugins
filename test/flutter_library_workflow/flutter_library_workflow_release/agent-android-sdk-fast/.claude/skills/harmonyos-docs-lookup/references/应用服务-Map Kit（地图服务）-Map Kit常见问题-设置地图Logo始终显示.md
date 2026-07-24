**现象描述**

Map Kit地图Logo不可见。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6d/v3/VHaCoGeZRCu5TvU1fITJcg/zh-cn_image_0000002485000176.png?HW-CC-KV=V1&HW-CC-Date=20260414T031807Z&HW-CC-Expire=86400&HW-CC-Sign=CCCEF9F2B20059549AF6680D7BFDA0A60775B5DEF0DEF941ADF25AED618D7E85 "点击放大")

**可能原因**

用户在开发过程中，地图Logo被其他控件或者页面遮挡。

**处理步骤**

Map Kit无法隐藏地图Logo，用户可通过调整地图组件的边距或布局，确保地图Logo不被其他控件遮挡。解决方案参考如下代码：

收起

自动换行

深色代码主题

复制

```
1. import { MapComponent, mapCommon, map } from '@kit.MapKit';
2. import { AsyncCallback } from '@kit.BasicServicesKit';

4. @Entry
5. @Component
6. struct MapKitAppDemo {
7. private mapOptions?: mapCommon.MapOptions;
8. private callback?: AsyncCallback<map.MapComponentController>;
9. private mapController?: map.MapComponentController;
10. private mapEventManager?: map.MapEventManager;
11. private TAG = 'MapKitAppDemo';
12. @State isShowSheet: boolean = true;

14. @Builder
15. Panel() {
16. Column() {
17. Row() {
18. Text() {
19. SymbolSpan($r('sys.symbol.magnifyingglass'))
20. .fontSize(24)
21. .fontColor([Color.Gray])
22. }

24. TextInput()
25. .layoutWeight(1)
26. .backgroundColor('#33b1afaf')
27. .borderRadius(24)
28. .margin({ left: 8, right: 8 })
29. }
30. .backgroundColor(Color.White)
31. .width('100%')
32. }
33. .borderRadius(10)
34. .padding({
35. top: 8,
36. left: 8,
37. right: 8,
38. bottom: 4
39. })
40. .width('100%')
41. }

43. aboutToAppear() {
44. // 地图初始化参数，设置地图中心点坐标及层级
45. this.mapOptions = {
46. position: {
47. target: {
48. latitude: 31.979227,
49. longitude: 118.762245
50. },
51. zoom: 17
52. }
53. };

55. // 地图初始化的回调
56. this.callback = async (err, mapController) => {
57. if (!err) {
58. // 获取地图的控制器类，用来操作地图
59. this.mapController = mapController;
60. // 返回地图组件的监听事件管理接口
61. this.mapEventManager = this.mapController.getEventManager();
62. let callback = () => {
63. console.info(this.TAG, `on-mapLoad`);
64. }
65. // 监听地图加载事件
66. this.mapEventManager?.on('mapLoad', callback);
67. } else {
68. console.error(`Failed to initialize the map, code is：${err.code}, message is ${err.message}`);
69. }
70. }
71. }

73. aboutToDisappear(): void {
74. this.mapEventManager?.off('mapLoad');
75. this.mapController?.clear();
76. }

78. private bindSheetOptions() {
79. let bindSheetOptions = {
80. // 半模态框三个状态的高度
81. detents: [100, 300, 500],
82. // 半模态所在页面允许交互
83. enableOutsideInteractive: true,
84. maskColor: Color.Transparent,
85. backgroundColor: Color.White,
86. blurStyle: BlurStyle.Thick,
87. showClose: false,
88. preferType: SheetType.CENTER,
89. onAppear: () => {
90. this.mapController?.setPadding({
91. bottom: 358
92. })
93. },
94. onHeightDidChange: (height: number) => {
95. // 动态设置地图底部边距，避免遮挡logo
96. this.mapController?.setPadding({
97. bottom: height + 8
98. })
99. }
100. } as BindOptions
101. return bindSheetOptions;
102. }

104. build() {
105. Stack() {
106. Column() {
107. // 调用MapComponent组件初始化地图
108. MapComponent({ mapOptions: this.mapOptions, mapCallback: this.callback })
109. .width('100%')
110. .height('100%')
111. Column()
112. .bindSheet(this.isShowSheet, this.Panel(), this.bindSheetOptions())
113. .visibility(this.isShowSheet ? Visibility.Visible : Visibility.None)
114. .justifyContent(FlexAlign.Start)
115. }
116. }
117. .height('100%')
118. .width('100%')
119. }
120. }
```

展示效果如图所示：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c8/v3/6D_66P_ERGOyGaBV06Nzcg/zh-cn_image_0000002485160138.gif?HW-CC-KV=V1&HW-CC-Date=20260414T031807Z&HW-CC-Expire=86400&HW-CC-Sign=EB42F4DF6AE80F4D97C7E2212B623F74274F2162C6DFD7E99809A3CEC73F5BB0 "点击放大")