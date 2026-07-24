注意

目前仅支持已适配HarmonyOS的三方框架应用使用。

HarmonyOS版React Native环境搭建请参考官方文档[React Native环境搭建指导](https://gitcode.com/openharmony-sig/ohos_react_native?source_module=search_result_repo)。

## 前提条件

* 设备智能填充开关必须处于打开状态，请前往“设置 > 隐私和安全 > 智能填充”页面开启开关。
* 设备已连接互联网并且登录华为账号。
* 该应用需已接入[智能填充服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-introduction-to-smart-fill#section1167564853816)。

## 开发准备

配置React Native已适配HarmonyOS的工程。

## React Native输入框效果图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3c/v3/igIHggm3T4K4f-02DcpmVA/zh-cn_image_0000002470492182.png?HW-CC-KV=V1&HW-CC-Date=20260414T033113Z&HW-CC-Expire=86400&HW-CC-Sign=9991F533845A29B67EFD6761F8D045C80412CE9267A23D16638B9046E38BE8F1 "点击放大")

## 示例代码

在React Native输入框TextInput需要配置[textContentType](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-mappingrelationship#section182639485919)属性来支持智能填充，代码如下：

收起

自动换行

深色代码主题

复制

```
1. import React from 'react';
2. import { Text, TextInput, View, StyleSheet } from 'react-native';

4. const styles = StyleSheet.create({
5. default: {
6. borderWidth: StyleSheet.hairlineWidth,
7. borderColor: '#0f0f0f',
8. flex: 1,
9. fontSize: 13,
10. padding: 4,
11. height: 80,
12. width: 200,
13. },
14. labelContainer: {
15. flexDirection: 'row',
16. marginVertical: 2,
17. },
18. label: {
19. width: 140,
20. textAlign: 'right',
21. marginRight: 10,
22. paddingTop: 2,
23. fontSize: 15,
24. },
25. inputContainer: {
26. flex: 1,
27. }
28. });
29. class WithLabel extends React.Component<$FlowFixMeProps> {
30. render(): React.Node {
31. return (
32. <View style={styles.labelContainer}>
33. <Text style={styles.label}>{this.props.label}</Text>
34. <View style={styles.inputContainer}>{this.props.children}</View>
35. </View>
36. );
37. }
38. }
39. const RNTesterApp = () => {
40. return (
41. <View style={{width: '100%', height: '100%'}}>
42. <WithLabel label="昵称">
43. <TextInput textContentType="nickname" style={styles.default} />
44. </WithLabel>
45. <WithLabel label="姓名">
46. <TextInput textContentType="name" style={styles.default} />
47. </WithLabel>
48. <WithLabel label="手机号">
49. <TextInput textContentType="telephoneNumber" style={styles.default} />
50. </WithLabel>
51. <WithLabel label="邮件">
52. <TextInput textContentType="emailAddress" style={styles.default} />
53. </WithLabel>
54. <WithLabel label="身份证号">
55. <TextInput textContentType="idCardNumber" style={styles.default} />
56. </WithLabel>
57. <WithLabel label="全部地址">
58. <TextInput textContentType="formatAddress" style={styles.default} />
59. </WithLabel>
60. <WithLabel label="带街道的详细地址">
61. <TextInput textContentType="fullStreetAddress" style={styles.default}  />
62. </WithLabel>
63. <WithLabel label="不带街道的详细地址">
64. <TextInput textContentType="detailInfoWithoutStreet" style={styles.default} />
65. </WithLabel>
66. </View>
67. );
68. };
69. export default RNTesterApp;
```

## React Native框架中加载的H5页面效果图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a5/v3/qHFk6pFLRhCDCPc1lgQWqg/zh-cn_image_0000002470332186.png?HW-CC-KV=V1&HW-CC-Date=20260414T033113Z&HW-CC-Expire=86400&HW-CC-Sign=F344E63D97B30217E726D23D0FAF4CBBD2C4F6A2CA926D288710A44CBC1B8CF3 "点击放大")

React Native框架加载H5页面场景，通过给form表单的input输入框（form表单的子节点）配置[autocomplete](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-mappingrelationship#section4813203065916)属性来支持智能填充，代码如下：

收起

自动换行

深色代码主题

复制

```
1. import React from 'react';
2. import { View } from 'react-native';
3. import { WebView } from 'react-native-webview';

5. const RNTesterApp = () => {
6. return (
7. <View style={{width: '100%', height: '100%'}}>
8. <WebView
9. source={require('./autofill_h5.html')}
10. style={{flex: 1, paddingTop: 50}}
11. />
12. </View>
13. );
14. };

16. export default RNTesterApp;
```

autofill\_h5.html实现参考[示例代码](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-h5#li5559949121818)。