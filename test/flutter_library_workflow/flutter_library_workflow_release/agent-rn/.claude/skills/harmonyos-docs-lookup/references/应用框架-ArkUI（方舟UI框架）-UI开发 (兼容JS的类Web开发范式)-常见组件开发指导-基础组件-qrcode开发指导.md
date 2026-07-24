生成并显示二维码，具体用法请参考[qrcode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-qrcode)。

## 创建qrcode组件

在pages/index目录下的hml文件中创建一个qrcode组件。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml-->
2. <div class="container">
3. <qrcode value="Hello"></qrcode>
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
6. align-items: center;
7. justify-content: center;
8. background-color: #F1F3F5;
9. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7b/v3/TjBXQv2iTDqpoAmX4urGvg/zh-cn_image_0000002540611784.png?HW-CC-KV=V1&HW-CC-Date=20260414T040147Z&HW-CC-Expire=86400&HW-CC-Sign=3A59B09078AB84DC0746BC576EBE9F28C08FE24C25392A782FDD3294EDF9208C)

说明

qrcode组件在创建的时候value的值为必填项。

## 设置组件类型

通过设置qrcode的type属性来选择按钮类型，如定义qrcode为矩形二维码、圆形二维码。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml-->
2. <div class="container">
3. <select onchange="settype">
4. <option for="{{bcol_list}}" value="{{$item}}">{{$item}}</option>
5. </select>
6. <qrcode value="Hello" type="{{qr_type}}"></qrcode>
7. </div>
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
6. align-items: center;
7. justify-content: center;
8. background-color: #F1F3F5;
9. }
10. select{
11. margin-top: 50px;
12. margin-bottom: 50px;
13. }
```

收起

自动换行

深色代码主题

复制

```
1. // index.js
2. export default {
3. data: {
4. qr_type: 'rect',
5. bcol_list: ['rect','circle']
6. },
7. settype(e) {
8. this.qr_type = e.newValue
9. },
10. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a7/v3/xSUrdvgaSYeGwR4B5LVmsw/zh-cn_image_0000002571171779.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040147Z&HW-CC-Expire=86400&HW-CC-Sign=C573319DD474ED0F3922EFECD6EDCF382FBBF9ED7D010B57D87C42E2BF471C72)

## 设置样式

通过color和background-color样式为二维码设置显示颜色和背景颜色。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml-->
2. <div class="container">
3. <qrcode value="Hello" type="rect"></qrcode>
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
6. align-items: center;
7. justify-content: center;
8. background-color: #F1F3F5;
9. }
10. qrcode{
11. width: 300px;
12. height: 300px;
13. color: blue;  background-color: #ffffff;
14. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/53/v3/c1bit2EeTqCw4gdjcFTrRg/zh-cn_image_0000002540771438.png?HW-CC-KV=V1&HW-CC-Date=20260414T040147Z&HW-CC-Expire=86400&HW-CC-Sign=5E9780D57DB3CFB3E6BA88B31A2CC46B8C9A2FFEB4D3D369A736F3029562DA64)

说明

* width和height不一致时，取二者较小值作为二维码的边长，且最终生成的二维码居中显示。
* width和height只设置一个时，取设置的值作为二维码的边长。都不设置时，使用200px作为默认边长。

## 场景示例

在本场景中将二维码与输入框绑定，通过改变输入框的内容改变二维码。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml-->
2. <div class="container">
3. <input style="margin-bottom: 100px;" onchange="change"></input>
4. <qrcode value="{{textVal}}"></qrcode>
5. </div>
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
6. align-items: center;
7. justify-content: center;
8. background-color: #F1F3F5;
9. }
10. qrcode{
11. width: 400px;
12. height: 400px;
13. }
```

收起

自动换行

深色代码主题

复制

```
1. // index.js
2. export default{
3. data: {
4. textVal: ''
5. },
6. change(e){
7. this.textVal = e.value
8. }
9. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b3/v3/LcRCwVZCRPWzbrTi1c37jQ/zh-cn_image_0000002571291733.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040147Z&HW-CC-Expire=86400&HW-CC-Sign=E555ADCADB1C280509B3382E5EC239EA1F68F2F9343A25080BBEAC3A51EA242A)