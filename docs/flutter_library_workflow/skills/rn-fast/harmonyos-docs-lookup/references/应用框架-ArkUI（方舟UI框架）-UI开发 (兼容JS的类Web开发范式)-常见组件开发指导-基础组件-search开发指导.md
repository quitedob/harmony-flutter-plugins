提供搜索框组件，用于提供用户搜索内容的输入区域，具体用法请参考[search](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-search)。

## 创建search组件

在pages/index目录下的hml文件中创建一个search组件。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml-->
2. <div class="container">
3. <search></search>
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

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b3/v3/yAJ83TsAThyjDd9dch-8yg/zh-cn_image_0000002540611786.png?HW-CC-KV=V1&HW-CC-Date=20260414T040151Z&HW-CC-Expire=86400&HW-CC-Sign=5C115E6EAB96F31151ECB5FA0F3AF39E63370B384A94D69E6EC012F8B8E74A7B)

## 设置属性

通过设置hint、icon和searchbutton属性设置搜索框的提示文字、图标和末尾搜索按钮的内容。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml-->
2. <div class="container">
3. <search hint="Please enter the search content"  searchbutton="search" icon="/common/search1.png"></search>
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

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e5/v3/LpAiZbWKQV671Hqhpmm5-Q/zh-cn_image_0000002571171781.png?HW-CC-KV=V1&HW-CC-Date=20260414T040151Z&HW-CC-Expire=86400&HW-CC-Sign=9DB7E9FEA199AF0DB6EC2C9954BBE7BF0384A8E5D402E1596094FBC60875E5E5)

## 添加样式

通过color、placeholder-color和caret-color样式来设置搜索框的文本颜色、提示文本颜色和光标颜色。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml-->
2. <div class="container">
3. <search hint="Please enter the search content"  searchbutton="search" ></search>
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
10. search{
11. color: black;
12. placeholder-color: black;
13. caret-color: red;
14. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4b/v3/QeAfOLGOSeuzK4uHgCJdsw/zh-cn_image_0000002540771440.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040151Z&HW-CC-Expire=86400&HW-CC-Sign=4BBB357D8DF9B12A7704ED2E440EACC85E03558C359BBC593FE511ED0480BF6D)

## 绑定事件

向search组件添加change、search、submit、share和translate事件，对输入信息进行操作。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml-->
2. <div class="container">
3. <text style="margin-left: -7px;">
4. <span>Enter text and then touch and hold what you've entered</span>
5. </text>
6. <search hint="Please enter the search content"  searchbutton="search" onsearch="search" onchange="change" ontranslate="translate" onshare="share"
7. onsubmit="submit">
8. </search>
9. </div>
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
10. text{
11. width: 100%;
12. font-size: 25px;
13. text-align: center;
14. margin-bottom: 100px;
15. }
```

收起

自动换行

深色代码主题

复制

```
1. // index.js
2. import promptAction from '@ohos.promptAction';
3. export default {
4. search(e){
5. promptAction.showToast({
6. message: e.value,
7. duration: 3000,
8. });
9. },
10. translate(e){
11. promptAction.showToast({
12. message:  e.value,
13. duration: 3000,
14. });
15. },
16. share(e){
17. promptAction.showToast({
18. message:  e.value,
19. duration: 3000,
20. });
21. },
22. change(e){
23. promptAction.showToast({
24. message:  e.value,
25. duration: 3000,
26. });
27. },
28. submit(e){
29. promptAction.showToast({
30. message: 'submit',
31. duration: 3000,
32. });
33. }
34. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/43/v3/Vwcx3lL6S1iVrzp6WTpadg/zh-cn_image_0000002571291735.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040151Z&HW-CC-Expire=86400&HW-CC-Sign=84B0FB769913D28882430F25F699A4AE1770C4B2B600C553E2482ED815E370F8)

## 场景示例

在本场景中通过下拉菜单选择search、Textarea和Input组件来实现搜索和输入效果。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml-->
2. <div style="flex-direction: column;align-items: center;justify-content: center; width: 100%;">
3. <select class="slt1" id="slt1" onchange="setfield">
4. <option value="search">search</option>
5. <option value="textarea">Textarea</option>
6. <option value="input">Input</option>
7. </select>
8. <div if="{{showsearch}}" style="flex-direction: column;align-items: center;margin-top: 50px;height: 400px;justify-content: space-around;">
9. <search class="field" id="search1" hint="search1" onsubmit="submit" onchange="change" ></search>
10. <search class="field" id="search2" icon="common/search1.png" hint="search2" show="{{showsec}}" onsubmit="submit" onchange="change" ></search>
11. </div>
12. <div if="{{showtextarea}}" style="flex-direction: column;align-items: center;margin-top: 50px;height: 400px;justify-content: space-around;">
13. <textarea class="field" id="textarea1" extend="true" placeholder="textarea1" onchange="change" ></textarea>
14. <textarea class="field" id="textarea2" extend="true" placeholder="textarea2" onchange="change" show="{{showsec}}"></textarea>
15. </div>
16. <div if="{{showinput}}" style="flex-direction: column;align-items: center;margin-top: 50px;height: 400px;justify-content: space-around;">
17. <input type="text" class="field" id="input1" placeholder="input1" onchange="change" ></input>
18. <input type="text" class="field" id="input2" placeholder="input2" onchange="change" show="{{showsec}}"></input>
19. </div>
20. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .field {
3. width: 80%;
4. color: mediumaquamarine;
5. font-weight: 600;
6. placeholder-color: orangered;
7. }
8. .slt1{
9. font-size: 50px;
10. position: absolute;
11. left: 50px;
12. top: 50px;
13. }
```

收起

自动换行

深色代码主题

复制

```
1. // index.js
2. import promptAction from '@ohos.promptAction';
3. export default {
4. data: {
5. showsearch: true,
6. showtextarea: false,
7. showinput: false,
8. showsec: true,
9. },
10. setfield(e) {
11. this.field = e.newValue
12. if (e.newValue == 'search') {
13. this.showsearch = true
14. this.showtextarea = false
15. this.showinput = false
16. } else if (e.newValue == 'textarea') {
17. this.showsearch = false
18. this.showtextarea = true
19. this.showinput = false
20. } else {
21. this.showsearch = false
22. this.showtextarea = false
23. this.showinput = true
24. }
25. },
26. submit(e) {
27. promptAction.showToast({
28. message: '搜索！',
29. duration: 2000
30. })
31. },
32. change(e) {
33. promptAction.showToast({
34. message: '内容:' + e.text,
35. duration: 2000
36. })
37. }
38. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ce/v3/4iQotTijSuaBJkT6DDaTvw/zh-cn_image_0000002540611788.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040151Z&HW-CC-Expire=86400&HW-CC-Sign=F71BAEE3A2C539B62B37E028583634257F57388C6638E95442BEA44AA779873E)