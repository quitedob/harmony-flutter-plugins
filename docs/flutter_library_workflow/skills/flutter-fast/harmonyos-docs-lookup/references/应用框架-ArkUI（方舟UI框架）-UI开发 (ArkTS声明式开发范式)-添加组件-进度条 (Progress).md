Progress是进度条显示组件，显示内容通常为目标操作的当前进度。具体用法请参考[Progress](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-progress)。

## 创建进度条

Progress通过调用接口来创建，接口调用方式如下：

收起

自动换行

深色代码主题

复制

```
1. Progress(options: {value: number, total?: number, type?: ProgressType})
```

其中，value用于设置初始进度值，total用于设置进度总长度，type用于设置Progress样式。

收起

自动换行

深色代码主题

复制

```
1. Progress({ value: 24, total: 100, type: ProgressType.Linear }) // 创建一个进度总长为100，初始进度值为24的线性进度条
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/88/v3/ZZXzdoPSSz6Og83AqQOCbg/zh-cn_image_0000002571291479.png?HW-CC-KV=V1&HW-CC-Date=20260414T035041Z&HW-CC-Expire=86400&HW-CC-Sign=ACECA6CD1F10A7C67FCAFDC2221406C330976DB7E12046F075FEAABDB707AACE)

## 设置进度条样式

Progress有5种可选类型，通过ProgressType可以设置进度条样式。ProgressType类型包括：ProgressType.Linear（线性样式）、 ProgressType.Ring（环形无刻度样式）、ProgressType.ScaleRing（环形有刻度样式）、ProgressType.Eclipse（圆形样式）和ProgressType.Capsule（胶囊样式）。

* 线性样式进度条（默认类型）

  说明

  从API version 9开始，组件高度大于宽度时，自适应垂直显示；组件高度等于宽度时，保持水平显示。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Progress({ value: 20, total: 100, type: ProgressType.Linear }).width(200).height(50)
  2. Progress({ value: 20, total: 100, type: ProgressType.Linear }).width(50).height(200)
  ```

  [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/InfoComponent/ProgressProject/entry/src/main/ets/pages/Index.ets#L36-L39)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/41/v3/3cUVUMZxSeu1t6w3kQJujg/zh-cn_image_0000002540611530.png?HW-CC-KV=V1&HW-CC-Date=20260414T035041Z&HW-CC-Expire=86400&HW-CC-Sign=4A430A66365759BB69C510262744ED03C8B8B4AA83D2B6F93F362A1633875EF6)
* 环形无刻度样式进度条

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 从左往右，1号环形进度条，默认前景色为蓝色渐变，默认strokeWidth进度条宽度为2.0vp
  2. Progress({ value: 40, total: 150, type: ProgressType.Ring }).width(100).height(100)
  3. // 从左往右，2号环形进度条
  4. Progress({ value: 40, total: 150, type: ProgressType.Ring }).width(100).height(100)
  5. .color(Color.Grey)    // 进度条前景色为灰色
  6. .style({ strokeWidth: 15})    // 设置strokeWidth进度条宽度为15.0vp
  ```

  [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/InfoComponent/ProgressProject/entry/src/main/ets/pages/Index.ets#L43-L50)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/72/v3/kAXEW1o1Rbqc4op1blXwkw/zh-cn_image_0000002571171525.png?HW-CC-KV=V1&HW-CC-Date=20260414T035041Z&HW-CC-Expire=86400&HW-CC-Sign=86DFE156C65BB74BAE4851CF2B27E3F9DBBFBD39095E19D6210FB12FA9CA7058)
* 环形有刻度样式进度条

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Progress({ value: 20, total: 150, type: ProgressType.ScaleRing }).width(100).height(100)
  2. .backgroundColor(Color.Black)
  3. .style({ scaleCount: 20, scaleWidth: 5 })    // 设置环形有刻度进度条总刻度数为20，刻度宽度为5vp
  4. Progress({ value: 20, total: 150, type: ProgressType.ScaleRing }).width(100).height(100)
  5. .backgroundColor(Color.Black)
  6. .style({ strokeWidth: 15, scaleCount: 20, scaleWidth: 5 })    // 设置环形有刻度进度条宽度15，总刻度数为20，刻度宽度为5vp
  7. Progress({ value: 20, total: 150, type: ProgressType.ScaleRing }).width(100).height(100)
  8. .backgroundColor(Color.Black)
  9. .style({ strokeWidth: 15, scaleCount: 20, scaleWidth: 3 })    // 设置环形有刻度进度条宽度15，总刻度数为20，刻度宽度为3vp
  ```

  [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/InfoComponent/ProgressProject/entry/src/main/ets/pages/Index.ets#L55-L65)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/98/v3/cOOHf3uGSh-vSsrj10zIWg/zh-cn_image_0000002540771184.png?HW-CC-KV=V1&HW-CC-Date=20260414T035041Z&HW-CC-Expire=86400&HW-CC-Sign=AFE81FE9DB29EFD6AADC2B10079938C5B80051EBB7931FEAF7F945BEDBB3F1DD)
* 圆形样式进度条

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 从左往右，1号圆形进度条，默认前景色为蓝色
  2. Progress({ value: 10, total: 150, type: ProgressType.Eclipse }).width(100).height(100)
  3. // 从左往右，2号圆形进度条，指定前景色为灰色
  4. Progress({ value: 20, total: 150, type: ProgressType.Eclipse }).color(Color.Grey).width(100).height(100)
  ```

  [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/InfoComponent/ProgressProject/entry/src/main/ets/pages/Index.ets#L70-L75)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/14/v3/a3swxCuBSR6ccvPbmKKG6Q/zh-cn_image_0000002571291481.png?HW-CC-KV=V1&HW-CC-Date=20260414T035041Z&HW-CC-Expire=86400&HW-CC-Sign=17044243D6C997727B2FCAE9BB51E1FF1D692DC258DFC6927CD7D321DB82B9F5)
* 胶囊样式进度条

  说明

  + 头尾两端圆弧处的进度展示效果与ProgressType.Eclipse样式一致。
  + 中段处的进度展示效果为矩形状长条，与ProgressType.Linear线性样式相似。
  + 组件高度大于宽度时，自适应垂直显示。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Progress({ value: 10, total: 150, type: ProgressType.Capsule }).width(100).height(50)
  2. Progress({ value: 20, total: 150, type: ProgressType.Capsule }).width(50).height(100).color(Color.Grey)
  3. Progress({ value: 50, total: 150, type: ProgressType.Capsule }).width(50).height(100).color(Color.Blue).backgroundColor(Color.Black)
  ```

  [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/InfoComponent/ProgressProject/entry/src/main/ets/pages/Index.ets#L80-L84)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/29/v3/OlJRUT5lTnidmLexaCUmDQ/zh-cn_image_0000002540611532.png?HW-CC-KV=V1&HW-CC-Date=20260414T035041Z&HW-CC-Expire=86400&HW-CC-Sign=DFB84503CCFAD8FB18EE2C3939368148717184FDE534334D1AB3040E0C045F87)

## 场景示例

更新当前进度值，如应用安装进度条，可通过点击Button增加progressValue，value属性将progressValue设置给Progress组件，进度条组件即会触发刷新，更新当前进度。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct ProgressCase1 {
4. @State progressValue: number = 0;    // 设置进度条初始值为0
5. build() {
6. Column() {
7. Column() {
8. Progress({value:0, total:100, type:ProgressType.Capsule}).width(200).height(50).value(this.progressValue)
9. Row().width('100%').height(5)
10. // 请将$r('app.string.progress_add')替换为实际资源文件，在本示例中该资源文件的value值为"进度条+5"
11. Button($r('app.string.progress_add'))
12. .onClick(()=>{
13. this.progressValue += 5;
14. if (this.progressValue > 100){
15. this.progressValue = 0;
16. }
17. })
18. }
19. }.width('100%').height('100%')
20. }
21. }
```

[ProgressCase1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/InfoComponent/ProgressProject/entry/src/main/ets/pages/ProgressCase1.ets#L15-L36)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ff/v3/aXaPdu5PQ6mSPuXwX1WGlA/zh-cn_image_0000002571171527.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035041Z&HW-CC-Expire=86400&HW-CC-Sign=AEF5C0A6B45FDD68C47A158BC7232F43F9AD8AB167FF995E53226770578D5C37)