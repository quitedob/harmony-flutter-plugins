当一个任务需要多个步骤时，可以使用stepper组件展示当前进展。具体用法请参考[stepper API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-container-stepper)。

## 创建stepper组件

在pages/index目录下的hml文件中创建一个stepper组件。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <stepper>
4. <stepper-item>
5. <text>Step 1</text>
6. </stepper-item>
7. <stepper-item>
8. <text>Step 2</text>
9. </stepper-item>
10. </stepper>
11. </div>
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
10. text{
11. width: 100%;
12. height: 100%;
13. text-align: center;
14. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/10/v3/0aRRFhtdT4KeP7SPxHhqKA/zh-cn_image_0000002540771402.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040045Z&HW-CC-Expire=86400&HW-CC-Sign=40CFE22DC16CF0669EDCA9EFDFD5A9D37BA907E071220DA0781678240C2D0B16)

## 设置index属性

页面默认显示索引值为index的步骤。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <stepper index="2">
4. <stepper-item>
5. <text>stepper-item1</text>
6. </stepper-item>
7. <stepper-item>
8. <text>stepper-item2</text>
9. </stepper-item>
10. <stepper-item>
11. <text>stepper-item3</text>
12. </stepper-item>
13. </stepper>
14. </div>
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
6. background-color: #F1F3F5;
7. }
8. text{
9. width: 100%;
10. height: 100%;
11. text-align: center;
12. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/32/v3/0Rqdg1ncSfy6mY3ES7pvQw/zh-cn_image_0000002571291697.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040045Z&HW-CC-Expire=86400&HW-CC-Sign=0A9FC75426538F32749B6C315D944BD6541D5BEF2BE7AFD68B69CC7F3EB09C83)

通过设置label属性，自定义stepper-item的提示按钮。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <stepper index="1">
4. <stepper-item label="{{label_1}}">
5. <text>stepper-item1</text>
6. </stepper-item>
7. <stepper-item label="{{label_2}}">
8. <text>stepper-item2</text>
9. </stepper-item>
10. <stepper-item label="{{label_3}}">
11. <text>stepper-item3</text>
12. </stepper-item>
13. <stepper-item>
14. <text>stepper-item4</text>
15. </stepper-item>
16. </stepper>
17. </div>
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
6. background-color: #F1F3F5;
7. }
8. text{
9. width: 100%;
10. height: 100%;
11. text-align: center;
12. }
```

收起

自动换行

深色代码主题

复制

```
1. // xxx.js
2. export default {
3. data: {
4. label_1:{
5. nextLabel: 'NEXT',
6. status: 'normal'
7. },
8. label_2:{
9. prevLabel: 'BACK',
10. nextLabel: 'NEXT',
11. status: 'normal'
12. },
13. label_3:{
14. prevLabel: 'BACK',
15. nextLabel: 'END',
16. status: 'disabled'
17. },
18. },
19. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fa/v3/AZS9mPiDQ-qCxhWB7jL0Jg/zh-cn_image_0000002540611750.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040045Z&HW-CC-Expire=86400&HW-CC-Sign=1A13583151FB5D0DBB6951A1984499E30CCE4FB3ED4138F3947761C3BEEE6A91)

## 设置样式

stepper组件默认填充父容器，通过border和background-color设置边框、背景色。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container" >
3. <div class="stepperContent">
4. <stepper class="stepperClass">
5. <stepper-item>
6. <text>stepper-item1</text>
7. </stepper-item>
8. </stepper>
9. </div>
10. </div>
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
6. align-items: center;
7. justify-content: center;
8. background-color:#F1F3F5;
9. }
10. .stepperContent{
11. width: 300px;
12. height: 300px;
13. }
14. .stepperClass{
15. border:1px solid silver ;
16. background-color: white;
17. }
18. text{
19. width: 100%;
20. height: 100%;
21. text-align: center;
22. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ee/v3/LpJpV-UvTJiTWtYi9JYSnA/zh-cn_image_0000002571171745.png?HW-CC-KV=V1&HW-CC-Date=20260414T040045Z&HW-CC-Expire=86400&HW-CC-Sign=6AE8AE64FE03B3DF778E93B4E151192D51DFB36E04313527CDE820B744BF2BDE)

## 添加事件

stepper分别添加finish，change，next，back，skip事件。

* 当change与next或back同时存在时，会先执行next或back事件再去执行change事件。
* 重新设置index属性值时要先清除index的值再重新设置，否则检测不到值的改变。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container"  style="background-color:#F1F3F5;">
3. <div >
4. <stepper onfinish="stepperFinish" onchange="stepperChange" onnext="stepperNext" onback="stepperBack" onskip="stepperSkip" id="stepperId" index="{{index}}">
5. <stepper-item>
6. <text>stepper-item1</text>
7. <button value="skip" onclick="skipClick"></button>
8. </stepper-item>
9. <stepper-item>
10. <text>stepper-item2</text>
11. <button value="skip" onclick="skipClick"></button>
12. </stepper-item>
13. <stepper-item>
14. <text>stepper-item3</text>
15. </stepper-item>
16. </stepper>
17. </div>
18. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .doc-page {
3. width:100%;
4. height:100%;
5. flex-direction: column;
6. align-items: center;
7. justify-content: center;
8. }
9. stepper-item{
10. width: 100%;
11. flex-direction: column;
12. align-self: center;
13. justify-content: center;
14. }
15. text{
16. margin-top: 45%;
17. justify-content: center;
18. align-self: center;
19. margin-bottom: 50px;
20. }
21. button{
22. width: 80%;
23. height: 60px;
24. margin-top: 20px;
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
5. index:0,
6. },
7. stepperSkip(){
8. this.index=2;
9. },
10. skipClick(){
11. this.$element('stepperId').setNextButtonStatus({status: 'skip', label: 'SKIP'});
12. },
13. stepperFinish(){
14. promptAction.showToast({
15. message: 'All Finished'
16. })
17. },
18. stepperChange(e){
19. console.info("stepperChange"+e.index)
20. promptAction.showToast({
21. // index表示当前步骤的序号
22. message: 'Previous step: '+e.prevIndex+"-------Current step:"+e.index
23. })
24. },
25. stepperNext(e){
26. console.info("stepperNext"+e.index)
27. promptAction.showToast({
28. // pendingIndex表示将要跳转的序号
29. message: 'Current step:'+e.index+"-------Next step:"+e.pendingIndex
30. })
31. var index = {pendingIndex:e.pendingIndex }
32. return index;
33. },
34. stepperBack(e){
35. console.info("stepperBack"+e.index)
36. var index = {pendingIndex: e.pendingIndex }
37. return index;
38. }
39. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c2/v3/0V9tjlVqThOIgoJpu15__A/zh-cn_image_0000002540771404.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040045Z&HW-CC-Expire=86400&HW-CC-Sign=9C2D9A4FC87072C88432B43901252E4E59DA9DDBAC051C1440646A7A5E5A6383)