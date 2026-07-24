FormExtensionContext模块是[FormExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formextensionability)的上下文环境，继承自[ExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-extensioncontext)。

FormExtensionContext模块提供FormExtensionAbility具有的接口和能力。

说明

本模块首批接口从API version 9开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

本模块接口仅可在Stage模型下使用。

## 使用说明

PhonePC/2in1TabletTVWearable

FormExtensionContext主要用于查询所属FormExtensionAbility的信息、Module的配置信息以及HAP包的信息，开发者可根据自身业务需求使用对应的信息。



```
1. import { FormExtensionAbility, formBindingData } from '@kit.FormKit';
2. import { Want } from '@kit.AbilityKit';

4. export default class MyFormExtensionAbility extends FormExtensionAbility {
5. onAddForm(want: Want) {
6. console.info(`FormExtensionAbility onAddForm, want: ${want.abilityName}`);
7. let formData: Record<string, string> = {
8. 'temperature': '11c',
9. 'time': '11:00'
10. };
11. console.info("current language is:", this.context.config.language);
12. return formBindingData.createFormBindingData(formData);
13. }
14. };
```

## FormExtensionContext

PhonePC/2in1TabletTVWearable

FormExtensionContext模块是[FormExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formextensionability)的上下文环境。

**系统能力：** SystemCapability.Ability.Form

**模型约束：** 本模块接口仅可在Stage模型下使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。