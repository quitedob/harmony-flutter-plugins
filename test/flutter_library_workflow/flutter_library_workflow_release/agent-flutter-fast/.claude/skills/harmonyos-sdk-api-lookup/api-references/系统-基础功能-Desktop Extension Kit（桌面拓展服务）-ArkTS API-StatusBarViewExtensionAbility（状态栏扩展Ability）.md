StatusBarViewExtensionAbility为状态栏扩展Ability，继承自[UIExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiextensionability#uiextensionability)，用于给应用提供接入状态栏图标左键业务弹窗的能力。

说明

本模块接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.StatusBarManager

**起始版本：** 5.0.0(12)

## 导入模块

PC/2in1



```
1. import { StatusBarViewExtensionAbility } from '@kit.DeskTopExtensionKit';
```

**示例：**



```
1. import { StatusBarViewExtensionAbility } from '@kit.DeskTopExtensionKit';
2. import { UIExtensionContentSession, Want } from '@kit.AbilityKit';

4. let TAG = "MyStatusBarViewAbility";

6. export default class MyStatusBarViewAbility extends StatusBarViewExtensionAbility {
7. onCreate() {
8. console.info(TAG, `onCreate`);
9. }

11. onSessionCreate(want: Want, session: UIExtensionContentSession) {
12. console.info(TAG, `onSessionCreate, want: ${want.abilityName}`);
13. session.loadContent('pages/Index');
14. }

16. onForeground() {
17. console.info(TAG, `onForeground`);
18. }

20. onBackground() {
21. console.info(TAG, `onBackground`);
22. }

24. onSessionDestroy(session: UIExtensionContentSession) {
25. console.info(TAG, `onSessionDestroy`);
26. }

28. onDestroy() {
29. console.info(TAG, `onDestroy`);
30. }
31. }
```