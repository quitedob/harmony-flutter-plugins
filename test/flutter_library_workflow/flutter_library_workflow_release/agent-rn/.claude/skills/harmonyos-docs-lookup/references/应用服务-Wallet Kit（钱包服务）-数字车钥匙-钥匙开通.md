钥匙开通分为添加钥匙和激活钥匙两步，整体交互流程图如下。相关接口定义请参照[钱包服务API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-arkts)。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8a/v3/Gs60FH-fQrm4Io40S32Msw/zh-cn_image_0000002182921494.png?HW-CC-KV=V1&HW-CC-Date=20260414T033640Z&HW-CC-Expire=86400&HW-CC-Sign=336D511C6E25E6D06D38C430919F18EDB738403FFF5380F1675683C40CDBCA86)

1. 车主APP调用[queryPass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section375194074718)接口检查当前设备车钥匙的开通情况。
2. 如果[queryPass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section375194074718)接口返回[1010220501 查询卡券不存在](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-error-code#section5732174019224)，则调用[canAddPass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section20458166124611)接口检查当前设备是否支持添加车钥匙。
3. 如果[queryPass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section375194074718)接口或是[canAddPass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section20458166124611)接口返回[1010200003 访问钱包的前置环境没有准备好](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-error-code#section205478194408)，则调用[initWalletEnvironment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section139341726154718)接口初始化钱包开通车钥匙的同意协议或是登录账号等必要条件，引导用户跳转钱包App完成应用初始化。
4. 车主APP调用[queryPassDeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section5251175451917)接口查询设备类型，指定目标设备标识，提升安全性。
5. 车主服务器预置模板后申请钥匙卡片以及JWE数据，参考[车主服务器开发](/consumer/cn/doc/harmonyos-guides/wallet-carkey-operation#section5585115171117)。
6. 用户主动发起开卡时，车主APP跳转钱包应用，调用[addPass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section596313613472)接口携带上述流程中生成的编码后的JWE数据，开通车钥匙到钱包。
7. 卡片激活的过程中钱包服务器需要和DK业务管理服务进行交互的包括：设备的认证（和车钥匙管理台交换证书信息）、获取请求个人化数据时的token（用于向车钥匙管理台请求Applet个人化数据）、以及最后的请求Applet个人化数据，最后写入安全芯片，参考[车主服务器激活卡片](/consumer/cn/doc/harmonyos-guides/wallet-carkey-operation#section19676155018507)。
8. 车主APP可通过[viewPass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section18261142114710)接口跳转钱包查看已开通的车钥匙详情页。

## 开发步骤

1. 车主APP使用[创建Wallet Kit服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/wallet-preparations)时注册的服务号和[申请钥匙卡片](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-rest-api-carkey#section129511211195)时定义的卡券唯一标识，车主APP调用[queryPass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section375194074718)接口检查当前设备车钥匙的开通情况。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { walletPass } from '@kit.WalletKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. @Entry
   6. @Component
   7. struct Index {
   8. private walletPassClient: walletPass.WalletPassClient = new walletPass.WalletPassClient(this.getUIContext().getHostContext() as common.UIAbilityContext);
   9. // 创建Wallet Kit服务时注册的服务号
   10. private passType: string = '';
   11. // 申请钥匙卡片时定义的卡券唯一标识
   12. private serialNumber: string = '';

   14. async queryPass() {
   15. let passStr = JSON.stringify({
   16. passType: this.passType,
   17. serialNumber: this.serialNumber
   18. });
   19. this.walletPassClient.queryPass(passStr).then((result: string) => {
   20. console.info(`Succeeded in querying pass, result: ${result}`);
   21. }).catch((err: BusinessError) => {
   22. console.error(`Failed to query pass, code:${err.code}, message:${err.message}`);
   23. })
   24. }

   26. build() {
   27. // your application UI
   28. }
   29. }
   ```
2. 如果[queryPass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section375194074718)接口返回[1010220501 查询卡券不存在](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-error-code#section5732174019224)，则调用[canAddPass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section20458166124611)接口检查当前设备是否支持添加车钥匙。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { walletPass } from '@kit.WalletKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. @Entry
   6. @Component
   7. struct Index {
   8. private walletPassClient: walletPass.WalletPassClient = new walletPass.WalletPassClient(this.getUIContext().getHostContext() as common.UIAbilityContext);
   9. // 创建Wallet Kit服务时注册的服务号
   10. private passType: string = '';
   11. // 目标设备类型 phone: 手机
   12. private targetDeviceType: string = '';

   14. async canAddPass() {
   15. let passStr = JSON.stringify({
   16. passType: this.passType,
   17. targetDeviceType: this.targetDeviceType
   18. });
   19. this.walletPassClient.canAddPass(passStr).then((result: string) => {
   20. console.info(`Succeeded in checking addPass, result:${result}`);
   21. }).catch((err: BusinessError) => {
   22. console.error(`Failed to check addPass, code:${err.code}, message:${err.message}`);
   23. })
   24. }

   26. build() {
   27. // your application UI
   28. }
   29. }
   ```
3. 如果[queryPass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section375194074718)接口或是[canAddPass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section20458166124611)接口返回[1010200003 访问钱包的前置环境没有准备好](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-error-code#section205478194408)，则调用[initWalletEnvironment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section139341726154718)接口初始化钱包开通车钥匙的同意协议或是登录账号等必要条件，引导用户跳转钱包App完成应用初始化。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { walletPass } from '@kit.WalletKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. @Entry
   6. @Component
   7. struct Index {
   8. private walletPassClient: walletPass.WalletPassClient = new walletPass.WalletPassClient(this.getUIContext().getHostContext() as common.UIAbilityContext);
   9. // 目标设备类型 phone: 手机
   10. private targetDeviceType: string = '';

   12. async initWalletEnvironment() {
   13. let passStr = JSON.stringify({
   14. targetDeviceType: this.targetDeviceType
   15. });
   16. this.walletPassClient.initWalletEnvironment(passStr).then(() => {
   17. console.info(`Succeeded in initiating walletEnvironment`);
   18. }).catch((err: BusinessError) => {
   19. console.error(`Failed to initiate walletEnvironment, code:${err.code}, message:${err.message}`);
   20. })
   21. }

   23. build() {
   24. // your application UI
   25. }
   26. }
   ```
4. 车主APP调用[queryPassDeviceInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section5251175451917)接口查询设备类型，指定目标设备标识。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { walletPass } from '@kit.WalletKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. @Entry
   6. @Component
   7. struct Index {
   8. private walletPassClient: walletPass.WalletPassClient = new walletPass.WalletPassClient(this.getUIContext().getHostContext() as common.UIAbilityContext);
   9. // 创建Wallet Kit服务时注册的服务号
   10. private passType: string = '';
   11. // 目标设备类型 phone: 手机
   12. private targetDeviceType: string = '';

   14. async queryPassDeviceInfo() {
   15. let passStr = JSON.stringify({
   16. passType: this.passType,
   17. targetDeviceType: this.targetDeviceType
   18. });
   19. this.walletPassClient.queryPassDeviceInfo(passStr).then((result: string) => {
   20. console.info(`Succeeded in querying passDeviceInfo, result:${result}`);
   21. }).catch((err: BusinessError) => {
   22. console.error(`Failed to query passDeviceInfo, code:${err.code}, message:${err.message}`);
   23. })
   24. }

   26. build() {
   27. // your application UI
   28. }
   29. }
   ```
5. 车主服务器预置模板后申请钥匙卡片以及JWE数据，参考[车主服务器开发](/consumer/cn/doc/harmonyos-guides/wallet-carkey-operation#section5585115171117)。
6. 用户主动发起开卡时，车主APP跳转钱包应用，调用[addPass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section596313613472)接口携带上述流程中生成的编码后的JWE数据，开通车钥匙到钱包。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { walletPass } from '@kit.WalletKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. @Entry
   6. @Component
   7. struct Index {
   8. private walletPassClient: walletPass.WalletPassClient = new walletPass.WalletPassClient(this.getUIContext().getHostContext() as common.UIAbilityContext);
   9. // 参考车主服务器开发生成的JWE数据
   10. private jweContent: string = '';

   12. async addPass() {
   13. let passStr = JSON.stringify({
   14. jweContent: this.jweContent
   15. });
   16. this.walletPassClient.addPass(passStr).then((result: string) => {
   17. console.info(`Succeeded in adding pass, result:${result}`);
   18. }).catch((err: BusinessError) => {
   19. console.error(`Failed to add pass, code:${err.code}, message:${err.message}`);
   20. })
   21. }

   23. build() {
   24. // your application UI
   25. }
   26. }
   ```
7. 卡片激活的过程中钱包服务器需要和DK业务管理服务进行交互的包括：设备的认证（和车钥匙管理台交换证书信息）、获取请求个人化数据时的token（用于向车钥匙管理台请求Applet个人化数据）、以及最后的请求Applet个人化数据，最后写入安全芯片，参考[车主服务器激活卡片](/consumer/cn/doc/harmonyos-guides/wallet-carkey-operation#section19676155018507)。
8. 车主APP可通过[viewPass](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-walletpass#section18261142114710)接口跳转钱包查看已开通的车钥匙详情页。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { walletPass } from '@kit.WalletKit';

   4. @Entry
   5. @Component
   6. struct Index {
   7. private walletPassClient: walletPass.WalletPassClient = new walletPass.WalletPassClient(this.getUIContext().getHostContext() as common.UIAbilityContext);
   8. // 创建Wallet Kit服务时注册的服务号
   9. private passType: string = '';
   10. // 申请钥匙卡片时定义的卡券唯一标识
   11. private serialNumber: string = '';

   13. async viewPass() {
   14. let passStr = JSON.stringify({
   15. passType: this.passType,
   16. serialNumber: this.serialNumber
   17. });
   18. try {
   19. await this.walletPassClient.viewPass(passStr);
   20. console.info(`Succeeded in viewing pass`);
   21. } catch (err) {
   22. console.error(`Failed to view pass, code:${err.code}, message:${err.message}`);
   23. }
   24. }

   26. build() {
   27. // your application UI
   28. }
   29. }
   ```

## 车主服务器开发

1. 使用Intellij IDEA打开[钱包服务-服务端卡片开通](https://gitcode.com/harmonyos_samples/wallet-kit-sample-code-severdemo-java)的示例代码，没有请先下载Intellij IDEA的当前最新版本。示例代码和工具下载完成后，目录结构如下，我们需要关注下图框出来几个文件：

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/35/v3/eL0fbPzFTSKH1A6NHgRUOg/zh-cn_image_0000002182921482.png?HW-CC-KV=V1&HW-CC-Date=20260414T033640Z&HW-CC-Expire=86400&HW-CC-Sign=DC8850E67AB6264846DD8FC0FB0E3E249F16FC87AA5458EAC2B77A01CCB43B15)
2. 打开resources/release.config.properties文件，替换真实的应用数据。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/78/v3/0G_fX85LSrK4gkZKNwMiFg/zh-cn_image_0000002218367281.png?HW-CC-KV=V1&HW-CC-Date=20260414T033640Z&HW-CC-Expire=86400&HW-CC-Sign=491E331B10529923DBF031CE21237B959E864B679DAFA644E37CE60180969988)

   展开

   | 需替换的参数 | 参数说明 |
   | --- | --- |
   | gw.appid | [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)平台申请的Client ID和Client Secret分别填入gw.appid和gw.appid.secret |
   | gw.appid.secret |
   | walletServerBaseUrl | 固定填入服务器基地址：https://wallet-passentrust-drcn.cloud.huawei.com.cn/hmspass |
   | servicePrivateKey | [创建Wallet Kit服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/wallet-preparations#li69221528123212)步骤5生成的私钥 |
3. 打开resources/data/StdCarKeyModel.json文件，替换真实的应用数据，详细见[预置模板](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-rest-api-carkey#section37263211548)的请求参数。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/65/v3/a_4hVQAOQhaegfqTFv9iTA/zh-cn_image_0000002183081174.png?HW-CC-KV=V1&HW-CC-Date=20260414T033640Z&HW-CC-Expire=86400&HW-CC-Sign=0F19B918070113A0E2EA90765EFFC839A735A0883C7FB8F53BADEE9F69661EBE)
4. 打开stdcarkey/StdCarKeyModelTest.java文件，运行createStdCarKeyModel方法，可看到控制台如下输出，详细见[预置模板](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-rest-api-carkey#section37263211548)的响应参数。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a6/v3/RHPeTPwCQ-Gqpwig1iXQJA/zh-cn_image_0000002182921486.png?HW-CC-KV=V1&HW-CC-Date=20260414T033640Z&HW-CC-Expire=86400&HW-CC-Sign=9134CCD5AFDB7ADE1D641ECAAD7040FD944EC2E52566E57F2C205EAE6C9673A1 "点击放大")
5. 打开resources/data/StdCarKeyInstance.json文件，替换真实的应用数据，详细见[申请钥匙卡片](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-rest-api-carkey#section129511211195)的请求参数。
6. 打开stdcarkey/StdCarKeyInstanceTest.java文件，运行addStdCarKeyInstance方法，可看到控制台如下输出，详细见[申请钥匙卡片](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-rest-api-carkey#section129511211195)的响应参数。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/74/v3/euga54FqTK2Uxu6T-aiY0w/zh-cn_image_0000002182921490.png?HW-CC-KV=V1&HW-CC-Date=20260414T033640Z&HW-CC-Expire=86400&HW-CC-Sign=64D59A6EAB2454D1243C8F44B91496B883DD9D5EDDE27FB639111756585C98F4 "点击放大")

## 车主服务器激活卡片

1. 使用 Intellij IDEA打开[钱包服务-服务端卡片激活](https://gitcode.com/harmonyos_samples/wallet-kit-sample-code-severdemo-nfc-java)的示例代码。示例代码和工具下载完成后，解决工程配置等问题后，Constants类中替换SERVER\_PUBLIC\_KEY和SERVER\_SECRET\_KEY为您在[创建Wallet Kit服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/wallet-preparations#li69221528123212)步骤5生成的公钥和私钥，直接打开PassesController这个类。
2. [设备认证](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-rest-api-public#section113578586311)对应类中的register方法，通过此方法进行设备认证。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5/v3/EcdQO5faS7qr97mpZHMEdQ/zh-cn_image_0000002218521733.png?HW-CC-KV=V1&HW-CC-Date=20260414T033640Z&HW-CC-Expire=86400&HW-CC-Sign=8CA7343229F660C233706B12E7131D0008D819E980D4D4A953E45F19A3DDDDFC "点击放大")
3. [获取个人化数据Token](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-rest-api-public#section257714144308)对应类中的requestToken方法，通过此方法获取个人化数据Token。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/66/v3/fnvTiyYdRXaaz1U4DoLMZw/zh-cn_image_0000002183081178.png?HW-CC-KV=V1&HW-CC-Date=20260414T033640Z&HW-CC-Expire=86400&HW-CC-Sign=8A4324D6B5A74DA6C411A57E7F8E1BFED3E2EBF6EE664D916163F495AF893CFF "点击放大")
4. [获取个人化数据](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/wallet-rest-api-public#section178319716389)对应类中的getPersonalInfo方法，重点看dealWithPersonalizeDataRequest中的getDevicePassData这个方法，查看ICCECarKeyDevicePassUnit的generatePassData方法，通过这些方法获取个人化数据。再深入打开里面的getPersonalizeData方法，根据此接口的说明进行生成。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/14/v3/GUWNP6qPT1WpDV49Vr9MdQ/zh-cn_image_0000002218521741.png?HW-CC-KV=V1&HW-CC-Date=20260414T033640Z&HW-CC-Expire=86400&HW-CC-Sign=06D02C37939D19DF8967E179921184C63CEAAB1EA2681C4EA1FBCA2C4EF59E67 "点击放大")