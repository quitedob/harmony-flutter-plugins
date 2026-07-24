提供应用界面上展示的人脸、指纹认证图标，具体功能如下：

1. 提供嵌入式的人脸、指纹认证控件图标，可被应用集成。
2. 支持自定义图标的颜色和大小，但图标样式不可变更。
3. 点击控件图标后将以系统弹窗的方式，拉起人脸、指纹认证控件。

说明

* 本模块首批接口从API version 12开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletWearable



```
1. import { userAuth, UserAuthIcon } from '@kit.UserAuthenticationKit';
```

## 子组件

PhonePC/2in1TabletWearable

无

## 属性

PhonePC/2in1TabletWearable

不支持通用属性。

## UserAuthIcon

PhonePC/2in1TabletWearable



```
1. UserAuthIcon({
2. authParam: userAuth.AuthParam,
3. widgetParam: userAuth.WidgetParam,
4. iconHeight?: Dimension,
5. iconColor?: ResourceColor,
6. onIconClick?: ()=>void,
7. onAuthResult: (result: userAuth.UserAuthResult)=>void
8. })
```

**装饰器类型：**@Component

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.UserIAM.UserAuth.Core

**参数：**

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| authParam | [userAuth.AuthParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#authparam10) | 是 | 用户认证相关参数。 |
| widgetParam | [userAuth.WidgetParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#widgetparam10) | 是 | 用户认证界面配置相关参数。 |
| iconHeight | [Dimension](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#dimension10) | 否 | 设置icon的高度，宽高比1:1，默认64fp，不支持百分比字符串。 |
| iconColor | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 否 | 设置icon的颜色，默认值：$r('sys.color.ohos\_id\_color\_activated')。 |
| onIconClick | ()=>void | 否 | 用户点击icon回调接口。 |
| onAuthResult | (result: [userAuth.UserAuthResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-useriam-userauth#userauthresult10))=>void | 是 | 用户认证结果信息回调接口。  应用需要申请ohos.permission.ACCESS\_BIOMETRIC权限，否则应用将仅展示图标，无法正常拉起身份认证控件。 |

## 事件

PhonePC/2in1TabletWearable

不支持通用事件。

## 示例

PhonePC/2in1TabletWearable



```
1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
2. import { userAuth, UserAuthIcon } from '@kit.UserAuthenticationKit';

4. @Entry
5. @Component
6. struct Index {
7. rand = cryptoFramework.createRandom();
8. len: number = 16;
9. randData: Uint8Array = this.rand?.generateRandomSync(this.len)?.data;
10. authParam: userAuth.AuthParam = {
11. challenge: this.randData,
12. authType: [userAuth.UserAuthType.FACE, userAuth.UserAuthType.PIN],
13. authTrustLevel: userAuth.AuthTrustLevel.ATL3
14. };
15. widgetParam: userAuth.WidgetParam = {
16. title: '请进行身份认证'
17. };

19. build() {
20. Row() {
21. Column() {
22. UserAuthIcon({
23. authParam: this.authParam,
24. widgetParam: this.widgetParam,
25. iconHeight: 200,
26. iconColor: Color.Blue,
27. onIconClick: () => {
28. console.info('The user clicked the icon.');
29. },
30. onAuthResult: (result: userAuth.UserAuthResult) => {
31. console.info(`Get user auth result, result = ${result.result}`);
32. }
33. })
34. }
35. }
36. }
37. }
```

调用onAuthResult可能会抛出错误码，错误码详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[用户认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-useriam)。

**人脸认证图例：**

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/80/v3/mLieTYOvS161KGPT3oynrA/zh-cn_image_0000002568919836.png?HW-CC-KV=V1&HW-CC-Date=20260511T045411Z&HW-CC-Expire=86400&HW-CC-Sign=D881EA65746E42710282A972B546321B2E0036082A76A641976A69DB0DC6C70B)

**指纹认证图例：**

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/78/v3/FwJ9ws3wS9iDapck6EY1ng/zh-cn_image_0000002599479379.png?HW-CC-KV=V1&HW-CC-Date=20260511T045411Z&HW-CC-Expire=86400&HW-CC-Sign=9E2CCF880600388BCF766398FC9C3F24828BFD40F9DCE70FD676D83B63C361A6)