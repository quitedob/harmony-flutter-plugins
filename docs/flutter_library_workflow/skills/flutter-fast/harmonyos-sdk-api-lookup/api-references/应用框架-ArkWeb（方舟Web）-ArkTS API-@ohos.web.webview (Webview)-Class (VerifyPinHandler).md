Web组件返回的PIN码认证用户处理功能对象。示例代码参考[onVerifyPin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-events#onverifypin22)。

说明

* 该组件从API version 22开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。
* 本Class首批接口从API version 22开始支持。
* 示例效果请以真机运行为准。

## constructor22+

PhonePC/2in1TabletTVWearable

constructor()

VerifyPinHandler的构造函数。

**系统能力：** SystemCapability.Web.Webview.Core

## confirm22+

PhonePC/2in1TabletTVWearable

confirm(result: PinVerifyResult): void

通知Web组件PIN码认证结果。

**系统能力：** SystemCapability.Web.Webview.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| result | [PinVerifyResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-e#pinverifyresult22) | 是 | PIN码认证结果。 |