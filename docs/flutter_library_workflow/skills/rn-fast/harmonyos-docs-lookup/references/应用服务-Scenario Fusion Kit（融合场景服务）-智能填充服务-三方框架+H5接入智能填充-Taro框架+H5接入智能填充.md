注意

目前仅支持已适配HarmonyOS的三方框架应用使用。

Taro及HarmonyOS版工程的搭建请参考官方文档[Harmony Hybrid | Taro 文档](https://docs.taro.zone/docs/harmony-hybrid/)。

## 前提条件

* 基于Web开发HarmonyOS应用。
* 设备智能填充开关必须处于打开状态，请前往“设置 > 隐私和安全 > 智能填充”页面开启开关。
* 设备已连接互联网并且登录华为账号。
* 该应用需已接入[智能填充服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-introduction-to-smart-fill#section1167564853816)。

## 开发准备

配置Taro已适配HarmonyOS的开发环境。

## 效果图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6c/v3/_ImQXzegQ4G2lU2veeQvgA/zh-cn_image_0000002470492170.png?HW-CC-KV=V1&HW-CC-Date=20260414T033121Z&HW-CC-Expire=86400&HW-CC-Sign=E13BDD544F2A8A40F264E07F6940BC6A56E00089637DAAB40FCFB0AF4E7CC0DC "点击放大")

## 示例代码

示例代码仅展示接入智能填充相关部分，请按照实际场景修改后使用。在Taro的Input组件（Form表单的子节点）中添加nativeProps属性，并配置nativeProps中[autocomplete](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-mappingrelationship#section4813203065916)属性来支持智能填充，Form表单提交后，当页面导航发生变化时，满足历史表单输入保存的条件时会触发对应弹窗（建议使用HTML <button> 标签进行Form表单提交）。代码如下：

收起

自动换行

深色代码主题

复制

```
1. import { View, Text, Input, Form } from "@tarojs/components";
2. import Taro, { useLoad } from "@tarojs/taro";
3. import "./index.scss";

5. export default function Demo() {
6. useLoad(() => {
7. console.info("Page loaded.");
8. });
9. function handleSubmit(e) {
10. Taro.request({
11. // 将URL设置为实际的接口路径。
12. url: "",
13. method: "POST",
14. });
15. }
16. return (
17. <Form onSubmit={handleSubmit}>
18. <View className="native-form">
19. <View className="form-item">
20. <Text className="col-md-4">昵称：</Text>
21. <View className="col-md-6">
22. <Input
23. className="form-value"
24. name="nickname"
25. type="text"
26. nativeProps={{ autocomplete: "nickname" }}
27. ></Input>
28. </View>
29. </View>
30. <View className="form-item">
31. <Text className="col-md-4">姓名：</Text>
32. <View className="col-md-6">
33. <Input
34. className="form-value"
35. name="name"
36. type="text"
37. nativeProps={{ autocomplete: "name" }}
38. ></Input>
39. </View>
40. </View>
41. <View className="form-item">
42. <Text className="col-md-4">手机号：</Text>
43. <View className="col-md-6">
44. <Input
45. className="form-value"
46. name="tel"
47. type="text"
48. nativeProps={{ autocomplete: "tel-national" }}
49. ></Input>
50. </View>
51. </View>
52. <View className="form-item">
53. <Text className="col-md-4">邮箱：</Text>
54. <View className="col-md-6">
55. <Input
56. className="form-value"
57. name="email"
58. type="text"
59. nativeProps={{ autocomplete: "email" }}
60. ></Input>
61. </View>
62. </View>
63. <View className="form-item">
64. <Text className="col-md-4">身份证：</Text>
65. <View className="col-md-6">
66. <Input
67. className="form-value"
68. name="idcard"
69. type="text"
70. nativeProps={{ autocomplete: "id-card-number" }}
71. ></Input>
72. </View>
73. </View>
74. <View className="form-item">
75. <Text className="col-md-4">带街道地址：</Text>
76. <View className="col-md-6">
77. <Input
78. className="form-value"
79. name="street-address"
80. type="text"
81. nativeProps={{ autocomplete: "street-address" }}
82. ></Input>
83. </View>
84. </View>
85. </View>
86. <View className="button">
87. <button className="button"> 提交</button>
88. </View>
89. </Form>
90. );
91. }
```

index.scss如下：

收起

自动换行

深色代码主题

复制

```
1. .form-item {
2. display: flex;
3. flex-wrap: wrap;
4. flex-direction: row;
5. align-items: center;
6. justify-content: flex-start;
7. margin-top: 20px;
8. .col-md-4 {
9. width: 30%;
10. text-align: right;
11. font-size: 32px;
12. }
13. .col-md-6 {
14. width: 50%;
15. .form-value {
16. width: 100%;
17. border-style: solid;
18. border-width: 1px;
19. border-color: #333333;
20. font-size: 32px;
21. }
22. }
23. }
24. .button {
25. width: 15%;
26. background-color: #4caf50;
27. border: none;
28. color: white;
29. padding: 16px 32px;
30. text-align: center;
31. text-decoration: none;
32. display: inline-block;
33. font-size: 24px;
34. margin-left: 30%;
35. margin-top: 20px;
36. }
```