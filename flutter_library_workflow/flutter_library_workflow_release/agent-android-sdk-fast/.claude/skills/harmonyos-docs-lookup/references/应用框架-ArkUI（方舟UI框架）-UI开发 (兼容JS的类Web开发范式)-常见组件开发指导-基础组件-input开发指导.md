input是交互式组件，用于接收用户数据。其类型可设置为日期、多选框和按钮等。具体用法请参考[input API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-input)。

## 创建input组件

在pages/index目录下的hml文件中创建一个input组件。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <input type="text">
4. Please enter the content
5. </input>
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
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/aa/v3/9BRu2RGpSMGOhx15UVqC5A/zh-cn_image_0000002540771412.png?HW-CC-KV=V1&HW-CC-Date=20260414T040103Z&HW-CC-Expire=86400&HW-CC-Sign=C36C6067C1700A20B91A565A2E6EC0206FAD8D0A94B7EA2343CDE0234F386B17)

## 设置input类型

通过设置type属性来定义input类型，如将input设置为button、date等。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <div class="div-button">
4. <dialog class="dialogClass" id="dialogId">
5. <div class="content">
6. <text>this is a dialog</text>
7. </div>
8. </dialog>
9. <input class="button" type="button" value="click" onclick="btnclick"></input>
10. </div>
11. <div class="content">
12. <input onchange="checkboxOnChange" checked="true" type="checkbox"></input>
13. </div>
14. <div class="content">
15. <input type="date" class="flex" placeholder="Enter date"></input>
16. </div>
17. </div>
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
5. align-items: center;
6. flex-direction: column;
7. justify-content: center;
8. background-color: #F1F3F5 ;
9. }
10. .div-button {
11. flex-direction: column;
12. align-items: center;
13. }
14. .dialogClass{
15. width:80%;
16. height: 200px;
17. }
18. .button {
19. margin-top: 30px;
20. width: 50%;
21. }
22. .content{
23. width: 90%;
24. height: 150px;
25. align-items: center;
26. justify-content: center;
27. }
28. .flex {
29. width: 80%;
30. margin-bottom:40px;
31. }
```

收起

自动换行

深色代码主题

复制

```
1. // xxx.js
2. export default {
3. btnclick(){
4. this.$element('dialogId').show()
5. },
6. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fc/v3/QNHVbXddS8e3jZNzWC84Cg/zh-cn_image_0000002571291707.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040103Z&HW-CC-Expire=86400&HW-CC-Sign=CDBF5A7FE415BB89ED611DF0C070B7DB42B9078064690F722F9CDFDFADE62281)

说明

仅当input类型为checkbox或radio时，当前组件选中的属性是checked才生效，默认值为false。

## 事件绑定

向input组件添加translate事件。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="content">
3. <text style="margin-left: -7px;">
4. <span>Enter text and then touch and hold what you've entered</span>
5. </text>
6. <input class="input" type="text" ontranslate="translate" placeholder="translate"> </input>
7. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .content {
3. width: 100%;
4. height: 100%;
5. flex-direction: column;
6. align-items: center;
7. justify-content: center;
8. background-color: #F1F3F5;
9. }
10. .input {
11. margin-top: 50px;
12. width: 60%;
13. placeholder-color: gray;
14. }
15. text{
16. width:100%;
17. font-size:25px;
18. text-align:center;
19. }
```

收起

自动换行

深色代码主题

复制

```
1. // xxx.js
2. import promptAction from '@ohos.promptAction'

4. export default {
5. translate(e) {
6. promptAction.showToast({
7. message: e.value,
8. duration: 3000,
9. });
10. }
11. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/52/v3/NrmpitI2SNO0lh4FmH6IbA/zh-cn_image_0000002540611760.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040103Z&HW-CC-Expire=86400&HW-CC-Sign=45DBAA894024A78FF335958080688A750DA3C6DDB26A70426F1A8104223652D0)

## 设置输入提示

通过对input组件添加showError方法来提示输入的错误原因。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="content">
3. <input id="input" class="input" type="text"  maxlength="20" placeholder="Please input text" onchange="change">
4. </input>
5. <input class="button" type="button" value="Submit" onclick="buttonClick"></input>
6. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .content {
3. width: 100%;
4. height: 100%;
5. flex-direction: column;
6. align-items: center;
7. justify-content: center;
8. background-color: #F1F3F5;
9. }
10. .input {
11. width: 80%;
12. placeholder-color: gray;
13. }
14. .button {
15. width: 30%;
16. margin-top: 50px;
17. }
```

收起

自动换行

深色代码主题

复制

```
1. // xxx.js
2. import promptAction from '@ohos.promptAction'
3. export default {
4. data:{
5. value:'',
6. },
7. change(e){
8. this.value = e.value;
9. promptAction.showToast({
10. message: "value: " + this.value,
11. duration: 3000,
12. });
13. },
14. buttonClick(e){
15. if(this.value.length > 6){
16. this.$element("input").showError({
17. error:  'Up to 6 characters are allowed.'
18. });
19. }else if(this.value.length == 0){
20. this.$element("input").showError({
21. error:this.value + 'This field cannot be left empty.'
22. });
23. }else{
24. promptAction.showToast({
25. message: "success "
26. });
27. }
28. },
29. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/af/v3/vjcc3CdDSP-JfIPcl59a-w/zh-cn_image_0000002571171755.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040103Z&HW-CC-Expire=86400&HW-CC-Sign=14695C82B884EB42CA1232FCC961BCFE8B964DC54B54139224EBBB1E3F7F7BFB)

说明

showError方法仅在input类型为text、email、date、time、number和password时生效。

## 场景示例

根据场景选择不同类型的input输入框，完成信息录入。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <div class="label-item">
4. <label>memorandum</label>
5. </div>
6. <div class="label-item">
7. <label class="lab" target="input1">content:</label>
8. <input class="flex" id="input1" placeholder="Enter content" />
9. </div>
10. <div class="label-item">
11. <label class="lab" target="input3">date:</label>
12. <input class="flex" id="input3" type="date" placeholder="Enter date" />
13. </div>
14. <div class="label-item">
15. <label class="lab" target="input4">time:</label>
16. <input class="flex" id="input4" type="time" placeholder="Enter time" />
17. </div>
18. <div class="label-item">
19. <label class="lab" target="checkbox1">Complete:</label>
20. <input class="flex" type="checkbox" id="checkbox1" style="width: 100px;height: 100px;" />
21. </div>
22. <div class="label-item">
23. <input class="flex" type="button" id="button" value="save" onclick="btnclick"/>
24. </div>
25. </div>
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
6. .label-item {
7. align-items: center;
8. border-bottom-width: 1px;border-color: #dddddd;
9. }
10. .lab {
11. width: 400px;}
12. label {
13. padding: 30px;
14. font-size: 30px;
15. width: 320px;
16. font-family: serif;
17. color: #9370d8;
18. font-weight: bold;
19. }
20. .flex {
21. flex: 1;
22. }
23. .textareaPadding {
24. padding-left: 100px;
25. }
```

收起

自动换行

深色代码主题

复制

```
1. // xxx.js
2. import promptAction from '@ohos.promptAction';
3. export default {
4. data: {
5. },
6. onInit() {
7. },
8. btnclick(e) {
9. promptAction.showToast({
10. message:'Saved successfully!'
11. })
12. }
13. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f5/v3/1nMjbsQcSV2-rfP1ZMhdkA/zh-cn_image_0000002540771414.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040103Z&HW-CC-Expire=86400&HW-CC-Sign=02808AB41720884955448C454B4D613C1F6760E7A92B128AA61D3E0393B25B96)