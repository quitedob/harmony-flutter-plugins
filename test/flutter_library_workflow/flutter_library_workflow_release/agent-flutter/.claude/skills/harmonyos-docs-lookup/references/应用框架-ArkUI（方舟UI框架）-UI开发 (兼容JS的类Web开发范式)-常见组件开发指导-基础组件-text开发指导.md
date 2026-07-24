text是文本组件，用于呈现一段文本信息。具体用法请参考[text](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-text)的API文档。

## 创建text组件

在pages/index目录下的hml文件中创建一个text组件。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container" style="text-align: center;justify-content: center; align-items: center;">
3. <text>Hello World</text>
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

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/55/v3/f7J8v2bTS5a2Wmi7mbjyJw/zh-cn_image_0000002540611756.png?HW-CC-KV=V1&HW-CC-Date=20260414T040059Z&HW-CC-Expire=86400&HW-CC-Sign=527A0218E9438919F5E691CC232F6760714C6D034EE2158F63C02E262FF8C828)

## 设置text组件样式和属性

* 添加文本样式

  设置color、font-size、allow-scale、word-spacing、text-align属性分别为文本添加颜色、大小、缩放、文本之间的间距和文本在水平方向的对齐方式。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. <!-- xxx.hml -->
  2. <div class="container" style="background-color:#F1F3F5;flex-direction: column;justify-content: center; align-items: center;">
  3. <text style="color: blueviolet; font-size: 40px; allow-scale:true">
  4. This is a passage
  5. </text>
  6. <text style="color: blueviolet; font-size: 40px; margin-top: 20px; allow-scale:true;word-spacing: 20px;text-align: center">
  7. This is a passage
  8. </text>
  9. </div>
  ```

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. /* xxx.css */
  2. .container {
  3. display: flex;
  4. width: 100%;
  5. height: 100%;
  6. flex-direction: column;
  7. align-items: center;
  8. justify-content: center;
  9. background-color: #F1F3F5;
  10. }
  ```

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/39/v3/d9-X3jcGTdyUY0mvEuCSOA/zh-cn_image_0000002571171751.png?HW-CC-KV=V1&HW-CC-Date=20260414T040059Z&HW-CC-Expire=86400&HW-CC-Sign=5CDB33E10286CDE8907F877B3188AC3D4A29921A68D0A448F3B37CB9C15F8EDB)
* 添加划线

  设置text-decoration和text-decoration-color属性为文本添加划线和划线颜色，text-decoration枚举值请参考 text自有样式。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. <!-- xxx.hml -->
  2. <div class="container" style="background-color:#F1F3F5;">
  3. <text style="text-decoration:underline">
  4. This is a passage
  5. </text>
  6. <text style="text-decoration:line-through;text-decoration-color: red">
  7. This is a passage
  8. </text>
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
  8. }
  9. text{
  10. font-size: 50px;
  11. }
  ```

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/12/v3/gRByD9c-TLS8JdBHGGhgrg/zh-cn_image_0000002540771410.png?HW-CC-KV=V1&HW-CC-Date=20260414T040059Z&HW-CC-Expire=86400&HW-CC-Sign=31BDE23808DC1E5CE22E523C5089406CD76102A239605FE0FA15AF9609211417)
* 隐藏文本内容

  当文本内容过多而显示不全时，添加text-overflow属性将隐藏内容以省略号的形式展现。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. <!-- xxx.hml -->
  2. <div class="container">
  3. <text class="text">
  4. This is a passage
  5. </text>
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
  6. align-items: center;
  7. background-color: #F1F3F5;
  8. justify-content: center;
  9. }
  10. .text{
  11. width: 200px;
  12. max-lines: 1;
  13. text-overflow:ellipsis;
  14. }
  ```

  说明

  + text-overflow样式需配合max-lines样式使用，在设置了最大行数的情况下才会生效。
  + max-lines属性设置文本最多可以展示的行数。

  ​ ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9a/v3/zQTckldETjC4TVjkvPvoBw/zh-cn_image_0000002571291705.png?HW-CC-KV=V1&HW-CC-Date=20260414T040059Z&HW-CC-Expire=86400&HW-CC-Sign=5D58C5288CD510A7356F45F509E4E65749A06BF0708C10A1E8FF5404644794C3)
* text组件支持[span](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-span)子组件

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. <!-- xxx.hml -->
  2. <div class="container" style="justify-content: center; align-items: center;flex-direction: column;background-color: #F1F3F5;  width: 100%;height: 100%;">
  3. <text style="font-size: 45px;">
  4. This is a passage
  5. </text>
  6. <text style="font-size: 45px;">
  7. <span style="color: aqua;">This </span><span style="color: #F1F3F5;">      1
  8. </span>
  9. <span style="color: blue;"> is a </span>    <span style="color: #F1F3F5;">      1    </span>
  10. <span style="color: red;">  passage </span>
  11. </text>
  12. </div>
  ```

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8e/v3/menfb8_nStOXwaiHysbP3Q/zh-cn_image_0000002540611758.png?HW-CC-KV=V1&HW-CC-Date=20260414T040059Z&HW-CC-Expire=86400&HW-CC-Sign=F54F1862DDA08EE37A57224924983C4F12AD0F2A3952DC63E3839E62D20DBDA3)

  说明

  + 当使用span子组件组成文本段落时，如果span属性样式异常（例如：font-weight设置为1000），将导致文本段落显示异常。
  + 在使用span子组件时，注意text组件内不能存在文本内容，如果在text组件同时包含文本内容和span子组件，则仅会显示子组件span中的内容。

## 场景示例

text组件通过数据绑定展示文本内容，span组件通过设置show属性来实现文本内容的隐藏和显示。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <div style="align-items: center;justify-content: center;">
4. <text class="title">
5. {{ content }}
6. </text>
7. <switch checked="true" onchange="test"></switch>
8. </div>
9. <text class="span-container" style="color: #ff00ff;">
10. <span show="{{isShow}}">  {{ content  }}  </span>
11. <span style="color: white;">
12. 1
13. </span>
14. <span style="color: #f76160">Hide clip </span>
15. </text>
16. </div>
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
8. background-color: #F1F3F5;
9. }
10. .title {
11. font-size: 26px;
12. text-align:center;
13. width: 200px;
14. height: 200px;
15. }
```

收起

自动换行

深色代码主题

复制

```
1. // xxx.js
2. export default {
3. data: {
4. isShow:true,
5. content: 'Hello World'
6. },
7. onInit(){    },
8. test(e) {
9. this.isShow = e.checked
10. }
11. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5c/v3/QJqV9gzgSNi6MLBiIGnMiA/zh-cn_image_0000002571171753.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040059Z&HW-CC-Expire=86400&HW-CC-Sign=70BA933ADD9DF3FC0D88E3DF92DE938859909ACEF1820CC2CFC79554BFC2DF8F)