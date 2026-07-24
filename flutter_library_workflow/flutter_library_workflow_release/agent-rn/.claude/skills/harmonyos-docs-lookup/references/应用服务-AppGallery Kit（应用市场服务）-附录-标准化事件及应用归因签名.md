## 标准转化事件信息

展开

| 定义值 | 回传值 | 含义说明 |
| --- | --- | --- |
| 安装应用 | 0 | 应用安装完成  说明  安装应用事件归因结果回传通过白名单方式向合作伙伴开放，默认不回传（白名单开放方式请联系华为运营）。 |
| 激活应用 | 1 | 历史首次激活应用 |
| 启动应用 | 2 | 打开应用 |
| 次日留存 | 3 | 次日仍然使用应用 |
| 付费 | 4 | 在应用内发生付费 |
| 提交表单 | 5 | 在应用内提交表单 |
| 授权 | 6 | 发生应用的授权 |
| 注册 | 7 | 注册应用或服务 |
| 关键页面访问 | 9 | 发生关键页面浏览行为 |
| 申请 | 14 | 申请服务 |
| 下单 | 18 | 将购物清单正式生成订单 |
| 预约 | 21 | 预约商品、内容或服务 |

## 归因来源签名计算规则

1.按照如下规则（字段顺序及分隔符）拼接待签名的字符串：

收起

自动换行

深色代码主题

复制

```
1. adTechId+ '\u2063' + campaignId+ '\u2063'  + destinationId+ '\u2063' + serviceTag+ '\u2063' + mmpIdStr + '\u2063' + nonce + '\u2063' + timestamp
```

其中，mmpIdStr生成规则为：

若归因监测平台的数组不为空，则将归因监测平台中的元素以'\u2063'为连接符进行拼接，假设mmpIds中有两个归因监测平台，拼接示例：

收起

自动换行

深色代码主题

复制

```
1. mmpIdStr = mmpId1 + '\u2063' + mmpId2
```

2.使用分发平台在应用归因服务云侧注册角色时，提供的公钥所对应的私钥，对步骤1拼接的字符串进行签名计算（签名算法：SHA256withRSA/PSS；生成密钥位数：RSA3072）。

3.接口中字段不为空则参与签名/验签，否则不参与签名/验签。

## 生成签名方法

您可以参考如下代码生成签名，也可以自行生成签名。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import {AegRsaSign} from "@hw-agconnect/petal-aegis";  //具体引用方法参考本示例代码底部说明


6. const TAG: string = 'SignUtil';
7. const SEPARATOR: string = '\u2063';

9. export class SignUtil {
10. public static genSignContent(adTechId: string, campaignId: string, destinationId: string, mmpIds: string[], serviceTag: string, nonce: string, timestamp: number) {
11. // mmpIdStr = mmpId1 + '\u2063' + mmpId2
12. // signContent:string= adTechId+ '\u2063' + campaignId+ '\u2063'  + destinationId+ '\u2063' + serviceTag+ '\u2063' + mmpIdStr + '\u2063' + nonce + '\u2063' + timestamp
13. let content = SignUtil.addSeparator(adTechId)
14. + SignUtil.addSeparator(campaignId)
15. + SignUtil.addSeparator(destinationId)
16. + SignUtil.addSeparator(serviceTag)
17. + SignUtil.genMmpIds(mmpIds)
18. + SignUtil.addSeparator(nonce)
19. + timestamp;
20. hilog.info(0,TAG,`content = ${JSON.stringify(content)}`);
21. return content;
22. }

24. private static addSeparator(value: string | undefined): string {
25. return value ? value + SEPARATOR : '';
26. }

28. private static genMmpIds(mmpIds: string[]) {
29. let result: string = '';
30. for (let mmpId of mmpIds) {
31. if (mmpId) {
32. result += SignUtil.addSeparator(mmpId);
33. }
34. }
35. return result;
36. }

38. public static getSign(content: string, privateKey: string): Promise<string> {
39. return new Promise<string>((resolve) => {
40. AegRsaSign.ohAegSignRSAWithPSSTextBase64(content, privateKey).then(async (sign: string) => {
41. hilog.info(0, TAG, "getSign success.");
42. resolve(sign);
43. }).catch((error: BusinessError) => {
44. hilog.error(0, TAG, `getSign failed. code is ${error.code}, message is ${error.message}`);
45. });
46. })
47. }
48. }
```

说明

其中import {AegRsaSign} from "@hw-agconnect/petal-aegis" ， 使用AegRsaSign.ohAegSignRSAWithPSSTextBase64生成签名，使用方法如下:

执行安装命令：ohpm i @hw-agconnect/petal-aegis

具体的接口使用方法，请参见[ohAegSignRSAWithPSSTextBase64](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-References/ohaegsignrsawithpsstextbase64-0000001864508922)。