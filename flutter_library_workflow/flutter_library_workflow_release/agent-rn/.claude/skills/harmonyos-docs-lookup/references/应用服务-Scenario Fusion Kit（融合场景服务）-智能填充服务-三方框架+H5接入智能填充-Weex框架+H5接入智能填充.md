注意

目前仅支持已适配HarmonyOS的三方框架应用使用。

## 前提条件

* 设备智能填充开关必须处于打开状态，请前往“设置 > 隐私和安全 > 智能填充”页面开启开关。
* 设备已连接互联网并且登录华为账号。
* 该应用需已接入[智能填充服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-introduction-to-smart-fill#section1167564853816)。

## 开发准备

配置Weex已适配HarmonyOS的工程。

## 效果图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/46/v3/jHB35nywTCaudeELCfSX4A/zh-cn_image_0000002503572071.png?HW-CC-KV=V1&HW-CC-Date=20260414T033124Z&HW-CC-Expire=86400&HW-CC-Sign=B162DC25FE93A97311C78E5760D19FB4B42A6C2C6DEF37AF7342BA418CD83A37 "点击放大")

## 示例代码

在Weex的form表单中给input输入框（form表单的子节点）配置[autocomplete](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-mappingrelationship#section4813203065916)属性以实现智能填充，代码中action需要配置表单提交接口链接，当form表单提交后，页面导航发生变化时，满足历史表单输入保存的条件时会触发对应弹窗。代码如下：

收起

自动换行

深色代码主题

复制

```
1. <template>
2. <div class="text-auto-fill">
3. <text class="header">Weex H5表单验证</text>
4. <form action="">
5. <div class="form-item">
6. <label for="nickname" class="label">昵称</label>
7. <div class="input">
8. <input id="nickname" type="text" class="form-value" name="nickname" autocomplete="nickname">
9. </div>
10. </div>
11. <div class="form-item">
12. <label for="name" class="label">姓名</label>
13. <div class="input">
14. <input id="name" type="text" class="form-value" name="name" autocomplete="name">
15. </div>
16. </div>
17. <div class="form-item">
18. <label for="tel-national" class="label">手机号</label>
19. <div class="input">
20. <input id="tel-national" type="number" class="form-value" name="tel-national" autocomplete="tel-national">
21. </div>
22. </div>
23. <div class="form-item">
24. <label for="email" class="label">邮件地址</label>
25. <div class="input">
26. <input id="email" type="text" class="form-value" name="email" autocomplete="email">
27. </div>
28. </div>
29. <div class="form-item">
30. <label for="id-card-number" class="label">身份证</label>
31. <div class="input">
32. <input id="id-card-number" type="number" class="form-value" name="id-card-number" autocomplete="id-card-number">
33. </div>
34. </div>
35. <div class="form-item">
36. <label for="street-address" class="label">带街道地址</label>
37. <div class="input">
38. <input id="street-address" type="text" class="form-value" name="street-address" autocomplete="street-address">
39. </div>
40. </div>
41. <div class="form-button">
42. <button class="button" type="submit">提交</button>
43. </div>
44. </form>
45. </div>
46. </template>
47. <script>
48. export default {
49. data() {
50. return {};
51. }
52. };
53. </script>
54. <style scoped>
55. .header {
56. width: 100%;
57. display: flex;
58. justify-content: center;
59. font-size: 40px;
60. }
61. .form-item {
62. display: flex;
63. flex-wrap: wrap;
64. flex-direction: row;
65. align-items: center;
66. justify-content: flex-start;
67. margin-top: 20px;
68. .label {
69. width: 30%;
70. line-height: 1.6;
71. text-align: right;
72. }
73. .input {
74. width: 50%;
75. .form-value {
76. width: 100%;
77. line-height: 1.6;
78. border-style: solid;
79. border-width: 1px;
80. border-color: #333333;
81. }
82. }
83. }
84. .form-button {
85. width: 100%;
86. margin-top: 20px;
87. display: flex;
88. align-items: center;
89. .button {
90. background-color:  blue;
91. color: white;
92. height: 47px;
93. border: 0;
94. font-size: 30px;
95. border-radius: 15px;
96. width: 200px;
97. text-align: center;
98. }
99. }
100. </style>
```