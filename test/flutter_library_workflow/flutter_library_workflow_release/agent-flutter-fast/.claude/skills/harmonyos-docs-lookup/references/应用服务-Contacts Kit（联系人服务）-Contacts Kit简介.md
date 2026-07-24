Contacts Kit（联系人服务）可以帮助开发者轻松实现联系人的增删改查等功能。该Kit提供了一系列API，可以让开发者在应用中快速集成联系人管理功能。

详情请参考[@ohos.contact (联系人)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-contact)文档。

## 能力范围

通过Contacts Kit，开发者可以对联系人进行管理，包括增加、删除、修改、查询联系人信息。开发者还可以通过Picker的方式，拉起联系人列表。

面向所有应用开放如下能力：

* [使用Picker选择联系人](/consumer/cn/doc/harmonyos-guides/contacts-intro#使用picker选择联系人)

面向三方应用受限开放如下能力：

注意

当前能力受限开放，需要申请受限开放权限ohos.permission.READ\_CONTACTS或ohos.permission.WRITE\_CONTACTS。该权限通常不允许三方应用申请，仅符合[指定场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/restricted-permissions#ohospermissionread_contacts)的应用可申请该权限。

申请方式请参考：[申请使用受限权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions-in-acl)。

* [联系人管理](/consumer/cn/doc/harmonyos-guides/contacts-intro#联系人管理受限开放)

## 使用Picker选择联系人

当用户选择联系人的时候，通过Picker的方式，拉起联系人列表，引导用户完成界面操作，接口本身无需申请权限。

1. 导入相关的联系人模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { contact } from '@kit.ContactsKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 调用联系人接口，拉起联系人列表，用户点击对应的联系人后返回。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. contact.selectContacts({
   2. isMultiSelect:false
   3. },(err: BusinessError, data) => {
   4. if (err) {
   5. console.error('selectContact callback, errCode:' + err.code + ', errMessage:' + err.message);
   6. return;
   7. }
   8. console.info(`selectContact callback: success data->${JSON.stringify(data)}`);
   9. });
   ```
3. 完成操作，返回想要的data数据。

## 联系人管理（受限开放）

若需要在应用内实现管理联系人的功能，可以使用permissions接口获取应用对联系人的编辑权限。

1. 声明接口调用所需要的权限。

   当前能力受限开放，需要申请受限开放权限ohos.permission.WRITE\_CONTACTS。该权限通常不允许三方应用申请，仅符合[指定场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/restricted-permissions#ohospermissionwrite_contacts)的应用可申请该权限。申请方式请参考：[申请使用受限权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions-in-acl)。
2. 设置一个需要的Permissions数组变量。
3. 执行对应联系人的权限操作。

收起

自动换行

深色代码主题

复制

```
1. // 示例代码
2. import { common, abilityAccessCtrl, Permissions, PermissionRequestResult } from '@kit.AbilityKit';
3. import { contact } from '@kit.ContactsKit';
4. import { BusinessError } from '@kit.BasicServicesKit';

6. @Entry
7. @Component
8. struct Contact {
9. addContactByPermissions() {
10. // 在组件内获取context，确保this.getUIContext().getHostContext()返回结果为UIAbilityContext
11. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
12. const permissions: Array<Permissions> = ['ohos.permission.WRITE_CONTACTS'];
13. const contactInfo: contact.Contact = {
14. name: { fullName: '王小明' },
15. phoneNumbers: [{ phoneNumber: '13912345678' }]
16. }
17. abilityAccessCtrl.createAtManager().requestPermissionsFromUser(context, permissions).then((result: PermissionRequestResult) => {
18. if (result.authResults[0] !== 0) { // 0 表示请求权限成功，其他任何非零值表示请求失败
19. console.error('request contact permissions failed');
20. return;
21. }
22. contact.addContact(context, contactInfo).then((data) => {
23. console.info(`Succeeded in adding Contact. data: ${JSON.stringify(data)}`);
24. }).catch((err: BusinessError) => {
25. console.error(`Failed to add Contact. Code: ${err.code}, message: ${err.message}`);
26. });
27. })
28. }

30. build() {
31. Row() {
32. Column() {
33. Button('添加联系人')
34. .onClick(() => {
35. this.addContactByPermissions();
36. })
37. }
38. .width('100%')
39. }
40. .height('100%')
41. }
42. }
```

## 模拟器支持情况

本Kit支持模拟器，但与真机存在差异，详情请参见“[模拟器与真机的差异](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-emulator-specification#section1227613205203)”。