应用开发者可以使用[@ohos.account.appAccount](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-appaccount)管理本应用的账号数据。

能力限制：应用卸载场景下，被卸载应用的账号数据会被删除；本地账号删除场景下，被删除本地账号下的所有应用的账号数据会被删除。

## 模拟器支持情况

本模块支持模拟器。

## 开发准备

1. 导入应用账号模块。

收起

自动换行

深色代码主题

复制

```
1. import { appAccount, BusinessError } from '@kit.BasicServicesKit';
```

1. 获取应用账号的实例对象。

收起

自动换行

深色代码主题

复制

```
1. const appAccountManager = appAccount.createAppAccountManager();
```

## 创建应用账号

用户在应用中登录后，开发者可以在系统中创建一个关联的应用账号，后续可以基于此账号进行数据管理。

具体开发实例如下：

1. 参数准备，指定账号名和可选配置。

收起

自动换行

深色代码主题

复制

```
1. let name: string = 'ZhangSan';
2. let options: appAccount.CreateAccountOptions = {
3. customData: {
4. age: '10'
5. }
6. };
```

1. 调用[createAccount](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-appaccount#createaccount9)接口，根据名称和选项创建应用账号。

收起

自动换行

深色代码主题

复制

```
1. appAccountManager.createAccount(name, options).then(()=>{
2. console.info('createAccount successfully');
3. // ···
4. }).catch((err: BusinessError)=>{
5. console.error(`createAccount failed, error: code is ${err.code}, message is ${err.message}`);
6. // ···
7. });
```

## 查询应用账号列表

具体开发实例如下：

调用[getAllAccounts](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-appaccount#getallaccounts9)接口查询账号列表。

收起

自动换行

深色代码主题

复制

```
1. appAccountManager.getAllAccounts().then((data: appAccount.AppAccountInfo[]) => {
2. console.info('getAllAccounts successfully, data: ' + JSON.stringify(data));
3. // ···
4. }).catch((err: BusinessError) => {
5. console.error(`getAllAccounts failed, code is ${err.code}, message is ${err.message}`);
6. // ···
7. });
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Account/ManagerApplicationAccount/entry/src/main/ets/pages/Index.ets#L54-L66)

## 存取账号的凭据

具体开发实例如下：

1. 准备参数，指定账号名、凭据类型和凭据。

收起

自动换行

深色代码主题

复制

```
1. let name: string = 'ZhangSan';
2. let credentialType: string = 'PIN_SIX';
3. let credential: string = 'xxxxxx';
```

1. 调用[getCredential](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-appaccount#getcredential9)接口，获取账号的凭据。

收起

自动换行

深色代码主题

复制

```
1. appAccountManager.getCredential(name, credentialType).then((data: string) => {
2. console.info('getCredential successfully, data: ' + data);
3. // ···
4. }).catch((err: BusinessError) => {
5. console.error(`getCredential failed, code is ${err.code}, message is ${err.message}`);
6. // ···
7. });
```

1. 调用[setCredential](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-appaccount#setcredential9)接口，设置账号的凭据。

收起

自动换行

深色代码主题

复制

```
1. await appAccountManager.setCredential(name, credentialType, credential).then(() => {
2. console.info('setCredential successfully');
3. }).catch((err: BusinessError) => {
4. console.error(`setCredential failed: code is ${err.code}, message is ${err.message}`);
5. // ···
6. });
```

## 存取账号的自定义数据

具体开发实例如下：

1. 准备参数，指定账号名和自定义键值。

收起

自动换行

深色代码主题

复制

```
1. let name: string = 'ZhangSan';
2. let key: string = 'age';
3. let value: string = '12';
```

1. 调用[setCustomData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-appaccount#setcustomdata9)接口，设置账号的自定义数据。

收起

自动换行

深色代码主题

复制

```
1. await appAccountManager.setCustomData(name, key, value).then(() => {
2. console.info('setCustomData successfully');
3. }).catch((err: BusinessError) => {
4. console.error(`setCustomData failed: code is ${err.code}, message is ${err.message}`);
5. // ···
6. });
```

1. 调用[getCustomData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-appaccount#getcustomdata9)接口，获取账号的自定义数据。

收起

自动换行

深色代码主题

复制

```
1. appAccountManager.getCustomData(name, key).then((data: string) => {
2. console.info('getCustomData successfully, data: ' + data);
3. // ···
4. }).catch((err: BusinessError) => {
5. console.error(`getCustomData failed, code is ${err.code}, message is ${err.message}`);
6. // ···
7. });
```

## 存取账号的授权令牌

具体开发实例如下：

1. 准备参数，指定账号名、账号所有者、授权类型和授权令牌。

收起

自动换行

深色代码主题

复制

```
1. let name: string = 'ZhangSan';
2. let owner: string = 'com.samples.managerapplicationaccount';
3. let authType: string = 'getSocialData';
4. let token: string = 'xxxxxx';
```

1. 调用[setAuthToken](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-appaccount#setauthtoken9)接口，设置指定授权类型的授权令牌。

收起

自动换行

深色代码主题

复制

```
1. await appAccountManager.setAuthToken(name, authType, token).then(() => {
2. console.info('setAuthToken successfully');
3. }).catch((err: BusinessError) => {
4. console.error(`setAuthToken failed: code is ${err.code}, message is ${err.message}`);
5. // ···
6. });
```

1. 调用[getAuthToken](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-appaccount#getauthtoken9)接口，获取指定授权类型的授权令牌。

收起

自动换行

深色代码主题

复制

```
1. await appAccountManager.getAuthToken(name, owner, authType).then((data: string) => {
2. console.info('getAuthToken successfully, data: ' + data);
3. // ···
4. }).catch((err: BusinessError) => {
5. console.error(`getAuthToken failed, code is ${err.code}, message is ${err.message}`);
6. // ···
7. });
```

## 删除应用账号

用户退出登录后，应用需及时将相应的应用账号从系统中删除。

具体开发实例如下：

指定要删除的账号名称，调用[removeAccount](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-appaccount#removeaccount9)接口删除账号。

收起

自动换行

深色代码主题

复制

```
1. let name: string = 'ZhangSan';
2. appAccountManager.removeAccount(name).then(() => {
3. console.info('removeAccount successfully');
4. // ···
5. }).catch((err: BusinessError) => {
6. console.error(`removeAccount failed, code is ${err.code}, message is ${err.message}`);
7. // ···
8. });
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Account/ManagerApplicationAccount/entry/src/main/ets/pages/Index.ets#L166-L179)

## 示例代码

* [应用账号管理](https://gitcode.com/HarmonyOS_Samples/app-account-manager)