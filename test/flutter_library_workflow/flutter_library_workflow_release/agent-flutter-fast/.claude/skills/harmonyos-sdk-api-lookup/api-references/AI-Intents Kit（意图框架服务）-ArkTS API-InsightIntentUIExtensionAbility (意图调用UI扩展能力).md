InsightIntentUIExtensionAbility用于小艺对话过程中的意图调用时的信息展示，为意图调用UI扩展能力，应用可以声明一个或多个InsightIntentUI来展示其意图的窗口化界面，继承自[UIExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiextensionability)。

**起始版本：** 5.0.0(12)

## 导入模块

PhonePC/2in1Tablet



```
1. import { InsightIntentUIExtensionAbility } from '@kit.IntentsKit';
```

## InsightIntentUIExtensionAbility

PhonePC/2in1Tablet

**模型约束：** 该类仅可在Stage模型下使用。

**系统能力：** SystemCapability.AI.InsightIntent

**起始版本：** 5.0.0(12)

**示例：**



```
1. import { InsightIntentUIExtensionAbility } from '@kit.IntentsKit';
2. import { UIExtensionContentSession, Want } from '@kit.AbilityKit';

4. const TAG: string = 'TestUiExtAbility';

6. // 此处以TestUiExtAbility继承InsightIntentUIExtensionAbility为例
7. export default class TestUiExtAbility extends InsightIntentUIExtensionAbility {
8. onCreate() {
9. console.info(TAG, `onCreate`);
10. }
11. onForeground() {
12. console.info(TAG, `onForeground`);
13. }
14. onBackground() {
15. console.info(TAG, `onBackground`);
16. }
17. onDestroy() {
18. console.info(TAG, `onDestroy`);
19. }
20. onSessionCreate(want: Want, session: UIExtensionContentSession) {
21. console.info(TAG, `onSessionCreate, want: ${JSON.stringify(want)}`);
22. session.loadContent('pages/Index');
23. }
24. onSessionDestroy(session: UIExtensionContentSession) {
25. console.info(TAG, `onSessionDestroy`);
26. }
27. }
```