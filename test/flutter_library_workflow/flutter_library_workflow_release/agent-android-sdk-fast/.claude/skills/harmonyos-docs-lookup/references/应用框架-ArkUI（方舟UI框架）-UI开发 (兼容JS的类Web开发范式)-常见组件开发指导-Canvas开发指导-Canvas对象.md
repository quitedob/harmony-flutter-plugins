Canvas组件提供画布，用于自定义绘制图形。具体用法请参考[CanvasRenderingContext2D对象](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-canvas-canvasrenderingcontext2d)。

## 创建Canvas组件

在pages/index目录下的hml文件中创建一个Canvas组件。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <canvas></canvas>
4. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .container {
3. width: 100%;
4. height: 100%;
5. flex-direction: column;
6. justify-content: center;
7. align-items: center;
8. background-color: #F1F3F5;
9. }

11. canvas {
12. background-color: #00ff73;
13. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/91/v3/YXlqIxdFS2iShKyt6YPoDw/zh-cn_image_0000002571171783.png?HW-CC-KV=V1&HW-CC-Date=20260414T040158Z&HW-CC-Expire=86400&HW-CC-Sign=A1D05858E05276F5E98DAC72DC8D488515A6C504C5771A0A2291C9F6AD03966C)

说明

* Canvas组件默认背景色与父组件的背景色一致。
* Canvas默认宽高为width: 300px，height: 150px。

## 添加样式

Canvas组件设置宽（width）、高（height）、背景色（background-color）及边框样式（border）。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <canvas></canvas>
4. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .container {
3. flex-direction: column;
4. justify-content: center;
5. align-items: center;
6. background-color: #F1F3F5;
7. width: 100%;
8. height: 100%;
9. }

11. canvas {
12. width: 500px;
13. height: 500px;
14. background-color: #fdfdfd;
15. border: 5px solid red;
16. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ca/v3/JDbkKJT0T1ejaoLdI8_yFA/zh-cn_image_0000002540771442.png?HW-CC-KV=V1&HW-CC-Date=20260414T040158Z&HW-CC-Expire=86400&HW-CC-Sign=186DFE81194CE15B2BDBCEDBE73D5674F82A44A7F36EB82385B768D517AD75D5)

## 添加事件

Canvas添加长按事件，长按后可获取Canvas组件的dataUrl值（toDataURL方法返回的图片信息），打印在下方文本区域内。

说明

promptAction相关接口参考[弹窗](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-promptaction)。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <canvas ref="canvas1" onlongpress="getUrl"></canvas>
4. <text>dataURL</text>
5. <text class="content">{{ dataURL }}</text>
6. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .container {
3. width: 100%;
4. height: 100%;
5. flex-direction: column;
6. justify-content: center;
7. align-items: center;
8. background-color: #F1F3F5;
9. }

11. canvas {
12. width: 500px;
13. height: 500px;
14. background-color: #fdfdfd;
15. border: 5px solid red;
16. margin-bottom: 50px;
17. }

19. .content {
20. border: 5px solid blue;
21. padding: 10px;
22. width: 90%;
23. height: 400px;
24. overflow: scroll;
25. }
```

收起

自动换行

深色代码主题

复制

```
1. // xxx.js
2. import promptAction from '@ohos.promptAction';

4. export default {
5. data: {
6. dataURL: null,
7. },
8. onShow() {
9. let el = this.$refs.canvas1;
10. let ctx = el.getContext("2d");
11. ctx.strokeRect(100, 100, 300, 300);
12. },
13. getUrl() {
14. let el = this.$refs.canvas1
15. let dataUrl = el.toDataURL()
16. this.dataURL = dataUrl;
17. promptAction.showToast({ duration: 2000, message: "long press,get dataURL" })
18. }
19. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/25/v3/FgmaxE3bQfKmxyEVBT2CYA/zh-cn_image_0000002571291737.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040158Z&HW-CC-Expire=86400&HW-CC-Sign=527754EAE6E30211BDA1451B7AB4E8C8BA15A3A0B540972FE5CFCF6DF5CEAD93)

说明

画布不支持在onInit和onReady中进行创建。