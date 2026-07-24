## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| addContactViaUI(context: Context, contact: Contact): Promise<number> | 调用新建联系人接口，打开新建联系人UI界面，新建完成。使用Promise异步回调。 |
| saveToExistingContactViaUI(context: Context, contact: Contact): Promise<number> | 调用保存至已有联系人接口，选择联系人UI界面并完成编辑。使用Promise异步回调。 |

## 使用picker新建联系人

调用新建联系人接口，打开新建联系人UI界面，用户可在UI界面中填写并新建联系人。

收起

自动换行

深色代码主题

复制

```
1. import { common } from '@kit.AbilityKit';
2. import { contact } from '@kit.ContactsKit';
3. import { BusinessError } from '@kit.BasicServicesKit';


6. @Entry
7. @Component
8. struct Index {
9. @State message: string = 'Hello World';

11. build() {
12. Column() {
13. Text(this.message)
14. .fontSize(50)
15. .fontWeight(FontWeight.Bold)
16. .onClick(() => {
17. let contactInfo: contact.Contact = {
18. name: {
19. fullName: 'xxx'
20. },
21. phoneNumbers: [{
22. phoneNumber: '138xxxxxx'
23. }]
24. }
25. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
26. let promise = contact.addContactViaUI(context, contactInfo);
27. promise.then((data) => {
28. console.info(`Succeeded in add Contact via UI.data->${JSON.stringify(data)}`);
29. }).catch((err: BusinessError) => {
30. console.error(`Failed to add Contact via UI. Code: ${err.code}, message: ${err.message}`);
31. });
32. })
33. }
34. }
35. }
```

## 使用picker更新联系人信息

可以通过拉起picker，将选中的联系人信息更新到现有联系人中。

收起

自动换行

深色代码主题

复制

```
1. import { common } from '@kit.AbilityKit';
2. import { contact } from '@kit.ContactsKit';
3. import { BusinessError } from '@kit.BasicServicesKit';


6. @Entry
7. @Component
8. struct Index {
9. @State message: string = 'Hello World';

11. build() {
12. Column() {
13. Text(this.message)
14. .fontSize(50)
15. .fontWeight(FontWeight.Bold)
16. .onClick(() => {
17. let contactInfo: contact.Contact = {
18. id: 1,
19. name: {
20. fullName: 'xxx'
21. },
22. phoneNumbers: [{
23. phoneNumber: '138xxxxxx'
24. }]
25. }
26. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
27. let promise = contact.saveToExistingContactViaUI(context, contactInfo);
28. promise.then((data) => {
29. console.info(`Succeeded in save to existing Contact via UI.data->${JSON.stringify(data)}`);
30. }).catch((err: BusinessError) => {
31. console.error(`Failed to save to existing Contact via UI. Code: ${err.code}, message: ${err.message}`);
32. });
33. })
34. }
35. }
36. }
```