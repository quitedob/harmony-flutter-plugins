switch为开关选择器，切换开启或关闭状态。具体用法请参考[switch](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-switch)。

## 创建switch组件

在pages/index目录下的hml文件中创建一个switch组件。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <switch checked="true"></switch>
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
4. background-color: #F1F3F5;
5. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9a/v3/7UhNQv_2Q5q6TqN9k-h-qw/zh-cn_image_0000002571171771.png?HW-CC-KV=V1&HW-CC-Date=20260414T040133Z&HW-CC-Expire=86400&HW-CC-Sign=1F660E4743F86E923C595C4B9873E88B33304EF697E7BF0FFB77B37783709A60)

## 添加属性和方法

switch组件通过textoff和showtext属性设置文本选中和未选中时的状态。设置checked属性值为true（组件为打开状态）。添加change事件，当组件状态改变时触发，触发后执行switchChange函数获取组件当前状态（关闭/打开）。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <switch showtext="true" texton="open" textoff="close" checked="true" @change="switchChange"></switch>
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
5. display: flex;
6. justify-content: center;
7. align-items: center;
8. background-color: #F1F3F5;
9. }
10. switch {
11. texton-color: #002aff;
12. textoff-color: silver;
13. text-padding: 20px;
14. font-size: 50px;
15. }
```

收起

自动换行

深色代码主题

复制

```
1. // xxx.js
2. import promptAction from '@ohos.promptAction';
3. export default {
4. switchChange(e){
5. if(e.checked){
6. promptAction.showToast({
7. message: "open"
8. });
9. }else{
10. promptAction.showToast({
11. message: "close"
12. });
13. }
14. }
15. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/96/v3/bPKphW1ZQhmqDTJpmyDyng/zh-cn_image_0000002540771430.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040133Z&HW-CC-Expire=86400&HW-CC-Sign=A2DFB7313B6208DA6F0E5EFAC743DAC972A2E95338D9ECB1FF3C768DBD496D13)

说明

当showtext属性值设置为true时，texton和textoff设置的文本才会生效。

## 场景示例

在下面示例中设置开关为打开状态（使用默认收货地址），关闭开关后页面显示选择地址按钮，点击按钮即可改变收货地址。

实现方法：创建switch开关，设置checked属性为true，通过数据绑定改变收货地址。设置display属性（默认为none），当关闭开关改变display属性值为flex后显示地址模块，点击按钮改变颜色。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <div class="change">
4. <text>Choose default address:</text>
5. <switch showtext="true" texton="on" textoff="off" checked="true" @change="switchChange"></switch>
6. </div>
7. <div class="content">
8. <text class="address"><span>Shipping address:</span><span class="textSpan">{{address}}</span></text>
9. </div>
10. <div class="myAddress" style="display: {{addressDisplay}};">
11. <text style="font-size: 30px;margin-bottom: 50px;">Choose an address:</text>
12. <text class="addressText" style="background-color: {{item == address?'#0fabe7':''}};color: {{item == address?'white':'black'}};"
13. for="item in addressList"@click="changeAddress({{$idx}}})">{{item}}</text>
14. </div>
15. </div>
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
5. background-color: #F1F3F5;
6. flex-direction: column;
7. padding: 50px;
8. }
9. .change{
10. margin-top: 20%;
11. width: 100%;
12. justify-content: center;
13. }
14. switch{
15. texton-color: #002aff;
16. textoff-color: silver;
17. text-padding: 20px;
18. }
19. .content{
20. width: 70%;
21. text-align: center;
22. flex-direction: column;
23. border: 1px solid #002aff;
24. margin-left: 15%;
25. text-align: center;
26. }
27. .address{
28. width: 100%;
29. height: 100px;
30. line-height: 100px;
31. text-align: center;
32. font-size: 28px;
33. margin-bottom: 50px;
34. }
35. .textSpan{
36. color: #0aa9f1;
37. }
38. .myAddress{
39. flex-direction: column;
40. margin-top: 50px;
41. }
42. .addressText{
43. margin-left: 35%;
44. width: 30%;
45. height: 75px;
46. text-align: center;
47. color: white;
48. margin-bottom: 30px;
49. border-radius: 10px;
50. border: 1px solid #0fabe7;
51. }
```

收起

自动换行

深色代码主题

复制

```
1. // xxx.js
2. export default {
3. data:{
4. address: '',
5. addressDisplay: 'none',
6. addressList: ['family','company','commissary'],
7. },
8. onInit(){
9. // 初始化默认地址为地址列表中的第一个
10. this.address = this.addressList[0];
11. },
12. switchChange(e){
13. if(e.checked){
14. this.addressDisplay = "none";
15. }else{
16. this.addressDisplay = "flex";
17. }
18. },
19. changeAddress(i){
20. this.address= this.addressList[i];
21. }
22. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4b/v3/l0UIreSERT-YllbEg1I5JQ/zh-cn_image_0000002571291725.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040133Z&HW-CC-Expire=86400&HW-CC-Sign=4476A8649824B8CBFCBCDAB7673CAC27021E56EE3C482972AC573637836237F5)