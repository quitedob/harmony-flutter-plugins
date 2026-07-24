栅格布局容器根节点，使用grid-row与grid-col进行栅格布局。API具体描述请参考[grid-container](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-grid-container)。

## 创建grid-container组件

在pages/index目录下的hml文件中创建一个grid-container组件，并添加[grid-row](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-grid-row)子组件。

收起

自动换行

深色代码主题

复制

```
1. <!-- index.hml -->
2. <div class="container">
3. <grid-container id="mygrid" gutter="20px" style="background-color: pink;">
4. <grid-row style="height:100px;justify-content:space-around;width: 80%;background-color: #f67002;margin-left:
5. 10%;"></grid-row>
6. <grid-row style="height:300px;justify-content:space-around;background-color: #ffcf00;width: 100%;"></grid-row>
7. <grid-row style="height:150px;justify-content:space-around;background-color: #032cf8;width: 100%;"></grid-row>
8. </grid-container>
9. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .container{
3. flex-direction: column;
4. background-color: #F1F3F5;
5. margin-top: 500px;
6. justify-content: center;
7. align-items: center;
8. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c7/v3/ymjuaRDeQhyRWVp_Jn_k_g/zh-cn_image_0000002540771448.png?HW-CC-KV=V1&HW-CC-Date=20260414T040212Z&HW-CC-Expire=86400&HW-CC-Sign=5A7D6C4A20A7BFD391E91627878BA031229C13809FBFB63714F1149C83622D67)

说明

grid-container仅支持grid-row为子组件。

## 调用方法

以下示例中，通过点击grid-container组件调用getColumns、getColumnWidth、getGutterWidth方法以返回栅格容器列数、column宽度及gutter宽度，通过长按调用getSizeType方法以返回当前容器响应尺寸类型（xs|sm|md|lg）。

收起

自动换行

深色代码主题

复制

```
1. <!-- index.hml -->
2. <div class="container">
3. <grid-container id="mygrid" gutter="20px" style="background-color: pink;padding-top: 100px;"
4. onclick="getColumns" onlongpress="getSizeType">
5. <grid-row style="height:100px;justify-content:space-around;background-color: #4cedf3;width: 20%;margin-left:
6. 40%;"></grid-row>
7. <grid-row style="height:150px;justify-content:space-around;background-color: #4cbff3;width: 50%;margin-left:
8. 25%;"></grid-row>
9. <grid-row style="height:200px;justify-content:space-around;background-color: #465ff6;width: 80%;margin-left:
10. 10%;"></grid-row>
11. <grid-row style="height:200px;justify-content:space-around;background-color: #5011ec;width: 100%;"></grid-row>
12. </grid-container>
13. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .container{
3. flex-direction: column;
4. background-color: #F1F3F5;
5. margin-top: 400px;
6. justify-content: center;
7. align-items: center;
8. }
```

收起

自动换行

深色代码主题

复制

```
1. // index.js
2. import promptAction from '@ohos.promptAction';
3. export default {
4. data:{
5. gutterWidth:'',
6. columnWidth:'',
7. columns:'',
8. },
9. getColumns(){
10. this.$element('mygrid').getColumnWidth((result)=>{
11. this.columnWidth = result;
12. })
13. this.$element('mygrid').getGutterWidth((result)=>{
14. this.gutterWidth = result;
15. })
16. this.$element('mygrid').getColumns((result)=>{
17. this.columns= result;
18. })
19. setTimeout(()=>{
20. promptAction.showToast({duration:5000,message:'columnWidth:'+this.columnWidth+',gutterWidth:'+
21. this.gutterWidth+',getColumns:'+this.columns})
22. })
23. },
24. getSizeType(){
25. this.$element('mygrid').getSizeType((result)=>{
26. promptAction.showToast({duration:2000,message:'get size type:'+result})
27. })
28. },
29. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4a/v3/2R3W-0FFQA2SdT9QkxP1EA/zh-cn_image_0000002571291743.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040212Z&HW-CC-Expire=86400&HW-CC-Sign=5EF55D4E1313288DA5FC3319BD6CD5DA8B468F5FBB87C48524CB36054212E270)

## 添加grid-col

创建grid-container组件并添加grid-row，在grid-row组件内添加[grid-col](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-grid-col)组件形成布局。

收起

自动换行

深色代码主题

复制

```
1. <!-- index.hml -->
2. <div class="container">
3. <grid-container id="mygrid" columns="4" gutter="0" style="background-color: pink;" onclick="getColumns" onlongpress="getSizeType">
4. <grid-row style="height: 100px;justify-content: space-around;background-color: #4cbff3;width: 100%;">
5. <grid-col span="0">
6. <div style="align-items: center;justify-content: center;height: 100%;width: 100%;">
7. <text style="color: dodgerblue;" onclick="getCol">top</text>
8. </div>
9. </grid-col>
10. </grid-row>
11. <grid-row style="height:500px;justify-content:space-around;background-color: #3b55ef;width: 100%;">
12. <grid-col span="0" style="width: 20%;">
13. <div style="align-items: center;justify-content: center;height: 100%;width: 100%;">
14. <text style="color: dodgerblue;">left</text>
15. </div>
16. </grid-col>
17. <grid-col span="0" style="background-color:orange;width: 80%;">
18. <div style="width: 100%;height: 100%;align-items: center;justify-content: center;">
19. <text>right</text>
20. </div>
21. </grid-col>
22. </grid-row>
23. <grid-row style="height: 100px;justify-content: space-around;background-color: #4cbff3;width: 100%;">
24. <grid-col style="background-color:#c075ef;" span="0">
25. <div style="width: 100%;height: 100%;padding: 20px;align-items: center;justify-content: center;">
26. <text>bottom</text>
27. </div>
28. </grid-col>
29. </grid-row>
30. </grid-container>
31. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .container{
3. flex-direction: column;
4. background-color: #F1F3F5;
5. width: 100%;
6. height: 100%;
7. justify-content: center;
8. align-items: center;
9. }
10. text{
11. color: white;
12. font-size: 40px;
13. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/49/v3/FRW1xVfLR0ee9NVNtAUx-Q/zh-cn_image_0000002540611796.png?HW-CC-KV=V1&HW-CC-Date=20260414T040212Z&HW-CC-Expire=86400&HW-CC-Sign=732D6825D4C04D885686C8B5A61692FBCD6D79CA74FDAE5A543CE16FCC4A527A)

说明

grid-row仅支持grid-col为子组件，只能在grid-col组件中添加填充的内容。

## 场景示例

本场景中循环输出list中的内容，创建出网格布局。进行下拉操作时触发refresh（刷新页面）方法，这时会向list数组中添加一条数据并设置setTimeout（延迟触发），达到刷新请求数据的效果。

收起

自动换行

深色代码主题

复制

```
1. <!-- index.hml -->
2. <div class="container">
3. <refresh refreshing="{{fresh}}" onrefresh="refresh">
4. <grid-container id="mygrid" gutter="20" style="margin: 10px;">
5. <grid-row style="height:200px;width: 100%;background-color: #e7e7e2;margin-top: 50px; padding: 0px 20px;border-radius: 15px;" for="item in list">
6. <grid-col span="0" style="width: 40%;">
7. <div style="align-items: center;justify-content: center">
8. <image src="{{item.src}}" style="object-fit: contain;border-radius: 30px;"></image>
9. </div>
10. </grid-col>
11. <grid-col span="0" style="width: 60%;">
12. <div style="align-items: center;justify-content: center;width: 100%;height: 100%;text-align: center;">
13. <text>image{{item.id}}</text>
14. </div>
15. </grid-col>
16. </grid-row>
17. </grid-container>
18. </refresh>
19. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .container{
3. flex-direction: column;
4. background-color: #F1F3F5;
5. width: 100%;
6. height: 100%;
7. }
8. text{
9. color: #0a0aef;
10. font-size: 60px;
11. }
```

收起

自动换行

深色代码主题

复制

```
1. // index.js
2. import promptAction from '@ohos.promptAction';
3. export default {
4. data:{
5. list:[
6. {src:'common/images/1.png',id:'1'},
7. {src:'common/images/2.png',id:'2'},
8. {src:'common/images/3.png',id:'3'}
9. ],
10. fresh:false
11. },
12. refresh(e) {
13. promptAction.showToast({
14. message: 'refreshing'
15. })
16. var that = this;
17. that.fresh = e.refreshing;
18. setTimeout(function () {
19. that.fresh = false;
20. that.list.unshift({src: 'common/images/4.png',id:'4'});
21. promptAction.showToast({
22. message: 'succeed'
23. })
24. }, 2000)
25. }
26. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e6/v3/wJ5GA3r2TbWojLbciOX-fQ/zh-cn_image_0000002571171791.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040212Z&HW-CC-Expire=86400&HW-CC-Sign=4E77F5AD02E450E846E47861150A92A726C5B8227806474DF7CA17291A7331E5)