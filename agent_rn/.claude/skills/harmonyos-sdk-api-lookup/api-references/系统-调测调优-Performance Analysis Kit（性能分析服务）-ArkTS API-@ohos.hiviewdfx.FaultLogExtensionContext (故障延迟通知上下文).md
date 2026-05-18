FaultLogExtensionContext是[FaultLogExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-hiviewdfx-faultlogextensionability)的上下文环境，继承自[ExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-extensioncontext)。

FaultLogExtensionContext模块提供访问[FaultLogExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-hiviewdfx-faultlogextensionability)的资源的能力，对于扩展的ExtensionAbility，可直接将ExtensionContext作为上下文环境，或者定义一个继承自ExtensionContext的类型作为上下文环境。

说明

* 本模块接口从API version 21开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 本模块接口仅可在Stage模型下使用。

## 使用说明

PhonePC/2in1TabletTVWearable

通过FaultLogExtensionAbility子类实例来获取。



```
1. import { FaultLogExtensionAbility } from '@kit.PerformanceAnalysisKit';

3. export default class MyFaultLogExtension extends FaultLogExtensionAbility {
4. onFaultReportReady() {
5. let context = this.context; // 获取FaultLogExtensionContext
6. console.info('cache dir is ' + context.cacheDir); // 访问context中的成员
7. }
8. }
```

## FaultLogExtensionContext

PhonePC/2in1TabletTVWearable

FaultLogExtensionContext是[FaultLogExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-hiviewdfx-faultlogextensionability)的上下文环境。

**系统能力**：SystemCapability.HiviewDFX.Hiview.FaultLogger