form是一个表单容器，支持容器内[Input](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-input)组件内容的提交和重置。具体用法请参考[form API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-container-form)。

## 创建form组件

在pages/index目录下的hml文件中创建一个form组件。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <form style="width: 100%; height: 20%">
4. <input type="text" style="width:80%"></input>
5. </form>
6. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .container {
3. width:100%;
4. height:100%;
5. flex-direction: column;
6. justify-content: center;
7. align-items: center;
8. background-color: #F1F3F5;
9. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/da/v3/_W13J3AFR0OnAKMt1N6FJA/zh-cn_image_0000002540771400.png?HW-CC-KV=V1&HW-CC-Date=20260414T040042Z&HW-CC-Expire=86400&HW-CC-Sign=72DEF8BA8702F1B184801FBFDD06E29CA09F5CC334ABEB61FFB34F106AAA61B4)

## 实现表单缩放

为form组件添加click-effect属性，实现点击表单后的缩放效果，click-effect枚举值请参考[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-common-attributes)。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <form  id="formId" class="formClass" click-effect="spring-large">
4. <input type="text"></input>
5. </form>
6. </div>
```

## 设置form样式

通过为form添加background-color和border属性，来设置表单的背景颜色和边框。

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
10. .formClass{
11. width: 80%;
12. height: 100px;
13. padding: 10px;
14. border: 1px solid #cccccc;
15. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4f/v3/za5QeinsTOmBIDAfK1auXQ/zh-cn_image_0000002571291695.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040042Z&HW-CC-Expire=86400&HW-CC-Sign=21B77C0949845FD2BC7553682F8DCF0E96D6EE2C03A9D3AB41F3D24E9429CC9D)

## 添加响应事件

为form组件添加submit和reset事件，来提交表单内容或重置表单选项。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <form onsubmit='onSubmit' onreset='onReset' class="form">
4. <div style="width: 100%;justify-content: center;">
5. <label>Option 1</label>
6. <input type='radio' name='radioGroup' value='radio1'></input>
7. <label>Option 2</label>
8. <input type='radio' name='radioGroup' value='radio2'></input>
9. </div>
10. <div style="width: 100%;justify-content: center; margin-top: 20px">
11. <input type="submit" value="Submit" style="width:120px; margin-right:20px;" >
12. </input>
13. <input type="reset" value="Reset" style="width:120px;"></input>
14. </div>
15. </form>
16. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* index.css */
2. .container{
3. width: 100%;
4. height: 100%;
5. flex-direction: column;
6. justify-items: center;
7. align-items: center;
8. background-color: #F1F3F5;
9. }
10. .form{
11. width: 100%;
12. height: 30%;
13. margin-top: 40%;
14. flex-direction: column;
15. justify-items: center;
16. align-items: center;
17. }
```

收起

自动换行

深色代码主题

复制

```
1. // xxx.js
2. import promptAction from '@ohos.promptAction';
3. export default{
4. onSubmit(result) {
5. promptAction.showToast({
6. message: result.value.radioGroup
7. })
8. },
9. onReset() {
10. promptAction.showToast({
11. message: 'Reset All'
12. })
13. }
14. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ea/v3/TkTto9ggQUmey_xT-UIoTQ/zh-cn_image_0000002540611748.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040042Z&HW-CC-Expire=86400&HW-CC-Sign=DE8DBEB9B256484617AC8ED1600B794563254B81BF5C021E975859A6931C16B7)

## 场景示例

在本场景中，开发者可以选择相应选项并提交或重置数据。

创建[Input](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-input)组件，分别设置type属性为checkbox（多选框）和radio（单选框），再使用form组件的onsubmit和onreset事件实现表单数据的提交与重置。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <form onsubmit="formSubmit" onreset="formReset">
4. <text style="font-size: 30px; margin-bottom: 20px; margin-top: 100px;">
5. <span > Form </span>
6. </text>
7. <div style="flex-direction: column;width: 90%;padding: 30px 0px;">
8. <text class="txt">Select 1 or more options</text>
9. <div style="width: 90%;height: 150px;align-items: center;justify-content: space-around;">
10. <label target="checkbox1">Option 1</label>
11. <input id="checkbox1" type="checkbox" name="checkbox1"></input>
12. <label target="checkbox2">Option 2</label>
13. <input id="checkbox2" type="checkbox" name="checkbox2"></input>
14. </div>
15. <divider style="margin: 20px 0px;color: pink;height: 5px;"></divider>
16. <text class="txt">Select 1 option</text>
17. <div style="width: 90%;height: 150px;align-items: center;justify-content: space-around;">
18. <label target="radio1">Option 1</label>
19. <input id="radio1" type="radio" name="myradio"></input>
20. <label target="radio2">Option 2</label>
21. <input id="radio2" type="radio" name="myradio"></input>
22. </div>
23. <divider style="margin: 20px 0px;color: pink;height: 5px;"></divider>
24. <text class="txt">Text box</text>
25. <input type="text" placeholder="Enter content." style="margin-top: 50px;"></input>
26. <div style="width: 90%;align-items: center;justify-content: space-between;margin: 40px;">
27. <input type="submit">Submit</input>
28. <input type="reset">Reset</input>
29. </div>
30. </div>
31. </form>
32. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* index.css */
2. .container {
3. width: 100%;
4. height: 100%;
5. flex-direction:column;
6. align-items:center;
7. background-color:#F1F3F5;
8. }
9. .txt {
10. font-size:33px;
11. font-weight:bold;
12. color:darkgray;
13. }
14. label{
15. font-size: 20px;
16. }
```

收起

自动换行

深色代码主题

复制

```
1. // xxx.js
2. import promptAction from '@ohos.promptAction';
3. export default {
4. formSubmit() {
5. promptAction.showToast({
6. message: 'Submitted.'
7. })
8. },
9. formReset() {
10. promptAction.showToast({
11. message: 'Reset.'
12. })
13. }
14. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/25/v3/RqsVm-mHTEyF-kJuSjpHew/zh-cn_image_0000002571171743.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040042Z&HW-CC-Expire=86400&HW-CC-Sign=6FEE6B30859097096E23376BB0D10619F1C612BB50F06B44DB39B9350417BD25)