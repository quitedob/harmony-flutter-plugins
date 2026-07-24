接入后，华为平台会将HarmonyOS 4及以下游戏的玩家标识playerId/openId赋值给HarmonyOS 5.0及以上游戏的玩家标识gamePlayerId，为新老系统游戏的账号资产（角色、区服信息、游戏进度等）实现互通。互通前后，华为账号ID不会发生变化，也不涉及开发者服务器和数据库层面的变动。

使用华为账号登录的网络游戏，华为账号的实名认证、未成年人防沉迷由基础游戏服务实现，华为账号的支付合规控制（例如未成年人支付限额）由IAP Kit（应用内支付服务）实现。

## 接入策略

游戏必须接入华为账号登录。

## 开发准备

### 创建游戏

在华为应用市场发布游戏，要求前往AppGallery Connect创建游戏类应用，具体操作请参见[创建HarmonyOS应用](https://developer.huawei.com/consumer/cn/doc/app/agc-help-create-app-0000002247955506)。其中：

* “应用类型”：选择“HarmonyOS应用”。
* “应用分类”：选择“游戏”。

说明

用于正式上架的游戏包名建议不要包含test、dev等信息。

### 申请版署实名认证

按照版署《关于开展网络游戏防沉迷实名认证系统接口对接工作的通知》，各游戏出版运营企业均要求在2021年6月1日前完成接入[网络游戏防沉迷实名认证系统](https://wlc.nppa.gov.cn/fcm_company/index.html#/login?redirect=/)，并获取“bizID（游戏备案识别码）”，再将bizID配置到AppGallery Connect，华为将为游戏自动对接国家新闻出版署的实名认证系统并开启强制实名认证，开发者无需进行额外的开发。具体操作请参见[版署实名认证申请](https://developer.huawei.com/consumer/cn/doc/games-guides/game-center-identification-applyfor-0000002392353221)。

### 申请核准（备案）

请参考[APP核准（APP备案）指引](https://developer.huawei.com/consumer/cn/doc/App/50130)完成游戏核准（备案）。

说明

HarmonyOS 4及以下游戏与HarmonyOS 5.0及以上游戏要求分别申请核准（备案）。

### 生成签名证书

数字证书和Profile文件等签名信息可以确保游戏的完整性：

* 调试阶段：[手动签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section297715173233)、[申请调试证书](https://developer.huawei.com/consumer/cn/doc/app/agc-help-debug-cert-0000002283256797)、[申请调试Profile](https://developer.huawei.com/consumer/cn/doc/app/agc-help-debug-profile-0000002248181278)。
* 发布阶段：[手动签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section297715173233)、[申请发布证书](https://developer.huawei.com/consumer/cn/doc/app/agc-help-release-cert-0000002283336729)、[申请发布Profile](https://developer.huawei.com/consumer/cn/doc/app/agc-help-release-profile-0000002248341090)。

### 配置签名证书指纹

AppGallery Connect会自动生成证书对应的公钥信息，并计算出对应的SHA256指纹。开发者前往AppGallery Connect获取并配置SHA256指纹，且每个游戏至多添加4个签名证书指纹，配置签名证书指纹的具体操作请参见[配置公钥指纹](https://developer.huawei.com/consumer/cn/doc/app/agc-help-cert-fingerprint-0000002278002933)。

说明

请在调试阶段添加调试证书对应的指纹，在发布阶段添加发布证书对应的指纹。

### 配置APP ID和Client ID

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，在“开发与服务”下选择项目及项目下的游戏，获取“应用”下的APP ID和Client ID。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b4/v3/OzqOs7uxRP2vJsSW4x8ZHw/zh-cn_image_0000002517704709.png?HW-CC-KV=V1&HW-CC-Date=20260414T030334Z&HW-CC-Expire=86400&HW-CC-Sign=3A07659EE542192A822736C2A9D7A2B49BA8F5895EAD9EC7964008AC2485A49E)
2. 在工程的entry模块module.json5文件中，新增metadata并配置client\_id和app\_id，同时新增requestPermissions以配置网络权限。如下所示：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. "module": {
   2. "name": "entry",
   3. "type": "xxx",
   4. "description": "xxxx",
   5. "mainElement": "xxxx",
   6. "deviceTypes": [],
   7. "pages": "xxxx",
   8. "abilities": [],
   9. "metadata": [ // 配置如下信息
   10. {
   11. "name": "client_id",
   12. "value": "xxxxxx" // 配置为前面步骤中获取的Client ID
   13. },
   14. {
   15. "name": "app_id",
   16. "value": "xxxxxx" // 配置为前面步骤中获取的APP ID
   17. }
   18. ],
   19. "requestPermissions": [ // 配置网络权限
   20. {
   21. "name": "ohos.permission.INTERNET"
   22. }
   23. ]
   24. }
   ```

### 配置APP ID映射关系

由于要求实现HarmonyOS 5.0及以上系统和HarmonyOS 4及以下系统上游戏内资产互通，用户登录新系统游戏时需要找到对应的老系统游戏，以及用户在该游戏下的账号ID，所以要求开发者在上架游戏时配置游戏在新老系统下的APP ID映射关系，并配置游戏在老系统游戏上接入的账号ID类型（playerId/openId）。

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，在“开发与服务”下选择项目及项目下的游戏，左侧菜单选择“构建 > 游戏服务”，在右侧点击“新增配置”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a5/v3/jVjk9xEOTPai3R8LEqENtw/zh-cn_image_0000002523641337.png?HW-CC-KV=V1&HW-CC-Date=20260414T030334Z&HW-CC-Expire=86400&HW-CC-Sign=6470A80CF44E2058B880CD6D6242B253558711635A70309A7AB4AC77688339FD)
2. 在弹出的“新增配置信息”窗口中选择HAP游戏和APK游戏，完成后点击“下一步”。

   说明

   请正确配置HAP游戏与APK游戏的映射关系。若开发者配置错误类型的游戏，将有提示框提示重新选择游戏。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1b/v3/8-4-AgxIQCmJWrMxZrO-Lw/zh-cn_image_0000002517744781.png?HW-CC-KV=V1&HW-CC-Date=20260414T030334Z&HW-CC-Expire=86400&HW-CC-Sign=2FC74C4F8437BC567D2C28608E8387B0D38279A5A1EEC70B6071EF624C83334F)

   展开

   | 信息项 | 说明 |
   | --- | --- |
   | HarmonyOS 5.0及以上游戏 | 请选择待上架的HAP游戏。 |
   | HarmonyOS 4及以下游戏 | 请选择已上架或待上架的APK游戏。  若无待上架的游戏，请先创建草稿状态的APK游戏。 |
3. 在弹出的窗口中继续填写信息，完成后点击“下一步”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b0/v3/xS_kHkItQ1a11M0uynn-Qg/zh-cn_image_0000002517744809.png?HW-CC-KV=V1&HW-CC-Date=20260414T030334Z&HW-CC-Expire=86400&HW-CC-Sign=B1312A71FEECE42C02FBA32B992F877CDCA962428533640B20F61F3A850EE758)

   展开

   | 信息项 | 说明 |
   | --- | --- |
   | 支持数据继承的玩家标识类型 | 请选择HarmonyOS 4及以下游戏的玩家标识类型：  * **playerId**：老系统游戏确认使用**playerId**作为玩家标识，请选择“**playerId**”。选择后，新系统游戏的玩家标识gamePlayerId=playerId。 * **openId**：如下情况请选择“**openId**”   + 情况一：老系统游戏确认使用**openId**作为玩家标识。   + 情况二：老系统游戏确认使用**unionId**作为玩家标识。此时，请同时勾选“使用了unionId”，并通过[转换ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-convertid)用gamePlayerId（openId）换取unionId，若unionId未在游戏侧找到玩家记录，则当前玩家为新系统游戏的新用户。   + 情况三：部分游戏由于处于playerId替换为openId方案的过渡期，导致老系统游戏的玩家标识存在**playerId与openId混用**的情况，例如A玩家使用openId，B玩家使用playerId。此时，若无法通过gamePlayerId在游戏侧找到玩家记录，可通过[转换ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-convertid)接口用gamePlayerId（openId）换取playerId，若playerId能在游戏侧找到玩家记录，表明该玩家是使用playerId作为玩家标识的老用户，否则该玩家为新系统游戏的新用户。   + 情况四：HarmonyOS 4及以下游戏未上架时。 |
   | 接入unionId的HarmonyOS 4及以下游戏实现数据继承需要进行转换处理 | 若老系统的游戏确认使用**unionId**作为玩家标识，请勾选“使用了unionId”。 |

   说明

   玩家标识严格区分大小写，例如gamePlayerId=xxx和gamePlayerId=XXX表示两个不同的玩家。
4. （可选）填写开发者服务器的回调地址，回调地址要求支持HTTPS协议，且具有合法商用证书，完成后点击“确定”提交APP ID映射关系的审批申请。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b7/v3/Ev6tKxeoQF67R3vHudsEZA/zh-cn_image_0000002485544930.png?HW-CC-KV=V1&HW-CC-Date=20260414T030334Z&HW-CC-Expire=86400&HW-CC-Sign=53C542F7C8194FE02CCBA8FECD5C029A8501E68297AA537760B3B4D78FA20796)

   若用户注销华为账号，华为游戏服务器向开发者服务器发送事件通知，通知游戏自行清理账号数据。
5. 若出现异常情况，将在如下提示框以红字提醒。建议点击“取消”并重新配置映射关系，若忽略异常情况点击“确定”继续提交申请，可能会造成映射关系审批不通过。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cf/v3/pLcJmSbuQU6T0xSj7ihixw/zh-cn_image_0000002517704891.png?HW-CC-KV=V1&HW-CC-Date=20260414T030334Z&HW-CC-Expire=86400&HW-CC-Sign=2335BC363DB45A563A2D9BBA24F0D18A65857257768DC4FDA28F3D14BDFA6C8D)
6. 提交申请后，华为工作人员完成审核需要1-3个工作日，请耐心等待。APP ID映射关系生效后如需重新配置，请先提交映射关系的删除申请。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dd/v3/ab_2tHOJT6CMFozNrhKN9Q/zh-cn_image_0000002517704943.png?HW-CC-KV=V1&HW-CC-Date=20260414T030334Z&HW-CC-Expire=86400&HW-CC-Sign=963D3BF9DB01FCD96C59A26A50B36378B83361893B68C024E4D205082BA4EBAD)

   配置/删除APP ID映射关系的审核结果将通过互动中心或邮件进行通知。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/96/v3/dsbtfhZcQt6dIVLLKth8Dw/zh-cn_image_0000002517744951.png?HW-CC-KV=V1&HW-CC-Date=20260414T030334Z&HW-CC-Expire=86400&HW-CC-Sign=0F0ABFCFAF5503BAE4B692D17489DD19693DBB89D9433683215ED73F56144EA5)

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b3/v3/7h5RVxZNR6yPNeLBLNVPVA/zh-cn_image_0000002517705085.png?HW-CC-KV=V1&HW-CC-Date=20260414T030334Z&HW-CC-Expire=86400&HW-CC-Sign=BB3A238A437065D162A279BA18D3B0F110E3B9B92D97B21255C9B4103EFEA3E3)

1. 玩家启动游戏。
2. 游戏调用[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section225333655719)接口初始化Game Service Kit。初始化后，弹出华为隐私协议窗口，玩家确认同意后，则继续往下执行。
3. 游戏调用[on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section1097616266227)接口注册事件监听。若监听到[PlayerChangedEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section57008633419)事件，先清除本地缓存信息，再重新调用[unionLogin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section157848375136)登录逻辑，showLoginDialog设置为true，重新拉起联合登录面板。
4. 游戏调用[unionLogin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section157848375136)接口。

   说明

   建议使用session缓存登录状态，玩家下次登录进入游戏无需再调用[unionLogin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section157848375136)接口，但仍需调用[verifyLocalPlayer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section15119154416715)接口。
5. 向玩家展示联合登录面板。
6. 玩家选择“华为账号登录”。
7. 游戏顶部弹出欢迎横幅，并向游戏返回accountName（选择华为账号登录返回值为hw\_account）、accountIdentifier（选择华为账号登录返回值为hw\_account）、gamePlayerId等信息。
8. 【**异步流程**】玩家信息核验。建议在服务端校验玩家信息，若没有服务器，无需校验一致性。
   1. 游戏调用[createLoginWithHuaweiIDRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section7843123616411)接口，获取用于服务器校验的Authorization Code。

      说明

      Authorization Code只有5分钟有效期，且仅能使用一次，不可复用。
   2. 游戏向开发者服务器上传Authorization Code、gamePlayerId等信息。
   3. 开发者服务器携带Authorization Code，请求[获取用户级凭证](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-obtain-user-token)接口，获取Access Token。
   4. 开发者服务器携带Access Token，请求[获取玩家标识](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-getplayerinfo)接口，获取gamePlayerId。
   5. 开发者服务器把从华为游戏服务器获取的gamePlayerId与客户端获取的gamePlayerId进行一致性核验。若核验不通过，已通过合规校验进入游戏的玩家也需强制退出游戏。
9. 游戏调用[verifyLocalPlayer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section15119154416715)接口，校验当前用户设备登录华为账号的实名认证、未成年人防沉迷信息。校验通过后，玩家进入游戏。若校验未通过请根据返回的[错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-error-code)进行相应处理。
10. 若玩家在游戏内创建角色，建议游戏调用[savePlayerRole](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section201561659105917)上报角色信息。

    说明

    若游戏无区服角色，或限制为1个区服角色，此时，建议游戏允许玩家直接进入游戏，而无需玩家点击“进入游戏”或者选择区服角色才能进入游戏。

## 接口说明

具体API说明请详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer)。

展开

| 接口名 | 描述 |
| --- | --- |
| [init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section225333655719)(context: common.UIAbilityContext, callback: AsyncCallback<void>): void | 游戏初始化接口，使用默认的上下文信息，使用callback回调。 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section1097616266227)(type: 'playerChanged', callback: Callback<PlayerChangedResult>): void | 玩家变化事件监听接口，通过Callback回调获取玩家变化结果信息。 |
| [unionLogin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section157848375136)(context: common.UIAbilityContext, loginParam: UnionLoginParam): Promise<UnionLoginResult> | 华为账号和游戏官方账号联合登录接口，通过Promise对象获取返回值。 |
| [verifyLocalPlayer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section15119154416715)(context: common.UIAbilityContext, thirdUserInfo: ThirdUserInfo): Promise<void> | 合规校验接口，校验当前设备登录的华为账号的实名认证、游戏防沉迷信息，通过Promise对象获取返回值。 |
| [savePlayerRole](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section201561659105917)(context: common.UIAbilityContext, request: GSKPlayerRole): Promise<void> | 保存角色信息到华为游戏服务器，使用默认的上下文信息，通过Promise对象获取返回值。 |

## 开发步骤

### 接口调用流程图

接入华为账号登录的接口调用流程如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/06/v3/3oQ_0ca3TP6GJxZ9evjlMw/zh-cn_image_0000002517745277.png?HW-CC-KV=V1&HW-CC-Date=20260414T030334Z&HW-CC-Expire=86400&HW-CC-Sign=2487A6F2D2D922A5EC2D6A2D702BDD7C92B2CEC1C7089AC99F5E6E84C9C71071)

### 导入模块

导入Account Kit模块、Game Service Kit模块及相关公共模块。

收起

自动换行

深色代码主题

复制

```
1. import { authentication } from '@kit.AccountKit';
2. import { gamePlayer } from '@kit.GameServiceKit';
3. import { common } from '@kit.AbilityKit';
4. import { hilog } from '@kit.PerformanceAnalysisKit';
5. import { Callback, BusinessError } from '@kit.BasicServicesKit';
6. import { window } from '@kit.ArkUI';
7. import { util } from '@kit.ArkTS';
```

### 初始化

调用[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section225333655719)接口初始化Game Service Kit。

说明

* 调用接口时严格要求继承UIAbility，并且获取上下文的时机是onWindowStageCreate生命周期中页面加载成功后。
* 要求游戏先成功调用初始化[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section225333655719)接口后再调用其他接口，否则将导致审核被驳回。

收起

自动换行

深色代码主题

复制

```
1. onWindowStageCreate(windowStage: window.WindowStage) {
2. windowStage.loadContent("pages/index", (err, data) => {
3. try {
4. gamePlayer.init(this.context,()=>{
5. hilog.info(0x0000, 'testTag', `Succeeded in initializing.`);
6. });
7. } catch (error) {
8. let err = error as BusinessError;
9. hilog.error(0x0000, 'testTag', `Failed to init. Code: ${err.code}, message: ${err.message}`);
10. }
11. });
12. }
```

初始化后，游戏弹出华为隐私协议窗口，用户同意签署协议，则继续往下执行。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bb/v3/D40iViZ_QJeezlY8aey-og/zh-cn_image_0000002517745319.png?HW-CC-KV=V1&HW-CC-Date=20260414T030334Z&HW-CC-Expire=86400&HW-CC-Sign=63BBF6F2138175E69195BC7D3FCD72D5A4120742843EEA53506B26BF425E5148 "点击放大")

若当前华为账号同意过游戏服务隐私协议，后续使用该华为账号登录的游戏将不会再弹出隐私协议窗口。

### 注册事件监听

调用[on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section1097616266227)接口注册[PlayerChangedEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section57008633419)事件监听，及时感知游戏过程中账号的变化。

收起

自动换行

深色代码主题

复制

```
1. private onPlayerChangedEventCallback(result: gamePlayer.PlayerChangedResult) {
2. if (result.event === gamePlayer.PlayerChangedEvent.SWITCH_GAME_ACCOUNT) {
3. // ...
4. // 游戏号已切换，完成本地缓存清理工作后，再次调用unionLogin接口等
5. }
6. }
7. // ...
8. // 调用on接口注册playerChanged事件监听
9. try {
10. gamePlayer.on('playerChanged', this.onPlayerChangedEventCallback);
11. hilog.info(0x0000, 'testTag', `Succeeded in registering.`);
12. } catch (error) {
13. let err = error as BusinessError;
14. hilog.error(0x0000, 'testTag', `Failed to register. Code: ${err.code}, message: ${err.message}`);
15. }
```

目前有如下两个场景可以监听到账号变化：

展开

| 能监听到账号切换的场景 | 监听到账号切换后的措施 |
| --- | --- |
| 场景一：  玩家点击“欢迎横幅->管理->切换”或者点击“欢迎横幅->管理->X”。  详情请参见[欢迎横幅管理游戏账号](/consumer/cn/doc/harmonyos-guides/gameservice-gameplayer-huawei#zh-cn_topic_0000002385861065_section03151161013)。 | 若监听到账号变化，游戏应先清除本地缓存信息（session或其他用户缓存），再重新调用[unionLogin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section157848375136)接口（showLoginDialog设置为true），重新拉起联合登录面板。 |
| 场景二：  用户在设备上切换华为账号后，游戏重启但没有调用unionLogin，直接调用verifyLocalPlayer。此时，verifyLocalPlayer接口会返回[1002000015](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-error-code#section1955824812307)错误码，同时触发on回调。 |

### 展示联合登录面板

调用[unionLogin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section157848375136)接口，向玩家展示联合登录面板。

收起

自动换行

深色代码主题

复制

```
1. let context = this.getUIContext()?.getHostContext() as common.UIAbilityContext;
2. let thirdAccountInfo1: gamePlayer.ThirdAccountInfo = {
3. 'accountName': 'testName1', // 游戏官方账号在联合登录面板上的显示名称。建议传入具体的“xx游账号登录”、“xx通行证登录”等，例如“游友账号登录”；不建议使用“官方账号登录”等容易有歧义的账号名称。若游戏存在多语言版本，需要开发者自行判断语种并传入当前语种对应的账号名称
4. 'accountIcon': $r('app.media.icon'), // 游戏官方账号图标资源信息，图标大小总和不能超过35KB
5. 'accountIdentifier': 'testIdentifier1', // 当前账号的唯一标识符，此标识符用来标识账号并在登录结果处理中用于判断识别玩家选择的账号
6. 'isOnTop': true // 当前账号是否置顶显示，且仅会置顶第一个传入true的账号
7. };
8. let request: gamePlayer.UnionLoginParam = {
9. showLoginDialog: false, // 是否弹出联合登录面板。true表示强制弹出面板，false表示优先使用玩家上一次的登录选择，不弹出联合登录面板，若玩家首次登录或卸载重装，则正常弹出
10. thirdAccountInfos: [
11. thirdAccountInfo1 // 若游戏无官包或无官方账号体系，请传空数组
12. ]
13. };
14. try {
15. gamePlayer.unionLogin(context, request).then((result: gamePlayer.UnionLoginResult) => {
16. hilog.info(0x0000, 'testTag', `Succeeded in logging in: ${result?.accountName}`);
17. }).catch((error: BusinessError) => {
18. hilog.error(0x0000, 'testTag', `Failed to login. Code: ${error.code}, message: ${error.message}`);
19. });
20. } catch (error) {
21. let err = error as BusinessError;
22. hilog.error(0x0000, 'testTag', `Failed to login. Code: ${err.code}, message: ${err.message}`);
23. }
```

联合登录面板为官方统一样式，不支持开发者自定义联合登录面板样式。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9f/v3/J_nXZe0BSlmaxF-eH_Qanw/zh-cn_image_0000002491561652.png?HW-CC-KV=V1&HW-CC-Date=20260414T030334Z&HW-CC-Expire=86400&HW-CC-Sign=7C558E88B7C0857048C00F9C4404903D3A8F68FB2F314FD8A9D25E4CAF7A8E12 "点击放大")

用户完成登录流程后，游戏顶部弹出欢迎横幅，并向游戏返回accountName（选择华为账号登录返回值为hw\_account）、accountIdentifier（选择华为账号登录返回值为hw\_account）、gamePlayerId等信息。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/22/v3/uj7boG9jT_OrVuNsYLlpaQ/zh-cn_image_0000002485705520.png?HW-CC-KV=V1&HW-CC-Date=20260414T030334Z&HW-CC-Expire=86400&HW-CC-Sign=1AD72FA7EA7B7E4DA499E265EF5FDDB8ACE787BEAC351521089AB168D1EF5786 "点击放大")

游戏获取到的gamePlayerId（HarmonyOS 5.0及以上系统）与openId/playerId（HarmonyOS 4及以下系统）数值相等。开发者可以根据gamePlayerId实现HarmonyOS 5.0及以上游戏和HarmonyOS 4及以下游戏的账号资产互通。

若在开发者服务器找到玩家记录，表明该玩家是老用户。若未找到玩家记录，表明该玩家为新用户，开发者可以为该玩家在HarmonyOS 5.0及以上系统创建新的游戏号。

### 异步步骤：核验玩家信息

由于[unionLogin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section157848375136)接口返回的gamePlayerId存在被篡改的风险，建议在开发者服务端核验玩家信息，即从开发者服务器获取gamePlayerId与[unionLogin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section157848375136)接口返回的gamePlayerId做比对，确保玩家信息一致性。若无服务器，无需校验一致性。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d2/v3/gTn7kS6QR0qW8zJdwfqeQg/zh-cn_image_0000002517745439.png?HW-CC-KV=V1&HW-CC-Date=20260414T030334Z&HW-CC-Expire=86400&HW-CC-Sign=F42C6D0131BB527EB981F0A9B092D68C9D9D853606CF844962E50DCD0801A712)

1. 调用[createLoginWithHuaweiIDRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section7843123616411)创建认证请求并设置参数。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 创建认证请求，并设置参数
   2. let loginRequest = new authentication.HuaweiIDProvider().createLoginWithHuaweiIDRequest();
   3. loginRequest.state = util.generateRandomUUID();
   ```

   调用[AuthenticationController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section620452019185)对象的[executeRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section164113311433)方法执行认证请求，并在Callback中处理认证结果，获取到Authorization Code。

   说明

   Authorization Code有效时间为5分钟，且仅能使用一次，不可复用。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 执行认证请求
   2. try {
   3. let controller = new authentication.AuthenticationController(this.getUIContext()?.getHostContext());
   4. controller.executeRequest(loginRequest, (err, data) => {
   5. if (err) {
   6. hilog.error(0x0000, 'testTag', `Failed to login. Code: ${err.code}, message: ${err.message}`);
   7. return;
   8. }
   9. let loginWithHuaweiIDResponse = data as authentication.LoginWithHuaweiIDResponse;
   10. let state = loginWithHuaweiIDResponse.state;
   11. if (state != undefined && loginRequest.state != state) {
   12. hilog.error(0x0000, 'testTag', `Failed to login. State is different.`);
   13. return;
   14. }
   15. hilog.info(0x0000, 'testTag', `Succeeded in logging in.`);
   16. let loginWithHuaweiIDCredential = loginWithHuaweiIDResponse.data!;
   17. let authorizationCode = loginWithHuaweiIDCredential.authorizationCode;
   18. // 开发者处理authorizationCode
   19. });
   20. } catch (error) {
   21. let err = error as BusinessError;
   22. hilog.error(0x0000, 'testTag', `Failed to login. Code: ${err.code}, message: ${err.message}`);
   23. }
   ```
2. 游戏向开发者服务器上传[unionLogin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section157848375136)接口返回的gamePlayerId。
3. 携带Authorization Code，请求[获取用户级凭证](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-obtain-user-token)接口，获取Access Token。

   说明

   由于Access Token的有效期仅为60分钟，当Access Token失效或者即将失效时（可通过[NSP\_STATUS错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-get-token-info#section1737691991515)判断），可以使用Refresh Token（有效期180天）通过[获取用户级凭证](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-obtain-user-token)向华为账号服务器请求获取新的Access Token。
4. 携带Access Token，请求[获取玩家标识](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-getplayerinfo)接口，获取华为服务器侧的玩家标识gamePlayerId。
5. 将华为服务器返回的玩家标识gamePlayerId与步骤**2**传入的玩家标识gamePlayerId进行玩家信息核验。

   若gamePlayerId一致，表示玩家标识gamePlayerId核验通过，允许玩家进入游戏。若核验不通过，已通过合规校验进入游戏的玩家也需强制退出游戏。

### 合规校验

调用[verifyLocalPlayer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section15119154416715)接口对用户设备登录华为账号的实名认证和未成年人防沉迷进行合规校验，校验通过后，玩家进入游戏。

收起

自动换行

深色代码主题

复制

```
1. let context = this.getUIContext()?.getHostContext() as common.UIAbilityContext;
2. // ThirdUserInfo是使用游戏官方账号登录游戏的玩家合规信息，接入华为账号登录时无需传入该信息，但在接入游戏官方账号登录时要求传入相关信息
3. let request: gamePlayer.ThirdUserInfo = {
4. thirdOpenId: '123xxxx', // 游戏官方账号ID，接入华为账号登录时传空
5. isRealName: true // 玩家是否实名，该值为true时表示已实名，为false时表示未实名，接入华为账号登录时不传该字段
6. };
7. try {
8. gamePlayer.verifyLocalPlayer(context, request).then(() => {
9. hilog.info(0x0000, 'testTag', `Succeeded in verifying.`);
10. }).catch((error: BusinessError) => {
11. hilog.error(0x0000, 'testTag', `Failed to verify. Code: ${error.code}, message: ${error.message}`);
12. });
13. } catch (error) {
14. let err = error as BusinessError;
15. hilog.error(0x0000, 'testTag', `Failed to verify. Code: ${err.code}, message: ${err.message}`);
16. }
```

使用华为账号登录的网络游戏，华为账号的实名认证、未成年人防沉迷由基础游戏服务实现，华为账号的支付合规控制（例如未成年人支付限额）由IAP Kit（应用内支付服务）实现。

展开

| 合规校验 | 校验项 | 国家政策 | 解决方案 |
| --- | --- | --- | --- |
| 华为账号实名认证 | 校验用户设备登录的华为账号是否已实名认证。 | 根据相关法律法规要求，所有网络游戏玩家必须使用真实有效身份信息注册并登录网络游戏。 | 若玩家使用未实名认证的华为账号登录游戏时，基础游戏服务向玩家弹出实名认证窗口，要求玩家进行实名认证。若玩家取消实名认证，则返回[1002000004](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-error-code#section206921217496)错误码。 |
| 未成年人防沉迷 | 校验已实名认证为未成年人的华为账号是否在规定时间内登录游戏。 | 根据国家新闻出版署的最新规定，所有网络游戏企业仅可在周五、周六、周日和法定节假日每日20时至21时向未成年人提供1小时网络游戏服务，其他时间均不得以任何形式向未成年人提供网络游戏服务。 | * 已实名认证为未成年人的华为账号在规定时间内登录游戏，当游戏进行到晚上21时，基础游戏服务会弹窗提示玩家已到游戏时间，强制玩家退出游戏并返回[1002000006](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-error-code#section4418848101513)错误码。 * 已实名认证为未成年人的华为账号在非规定游戏时间内登录游戏，基础游戏服务会弹框提示玩家不允许游戏，强制玩家退出游戏并返回[1002000006](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-error-code#section4418848101513)错误码。 |
| 未成年人支付限额 | 校验已实名认证为未成年人的华为账号是否限额付费。 | 根据国家新闻出版署的最新规定，网络游戏企业不得为未满8周岁的用户提供游戏付费服务。同一网络游戏企业所提供的游戏付费服务，8周岁以上未满16周岁的用户，单次充值金额不得超过50元人民币，每月充值金额累计不得超过200元人民币；16周岁以上未满18周岁的用户，单次充值金额不得超过100元人民币，每月充值金额累计不得超过400元人民币。 | 已实名认证为未成年人的华为账号在游戏内超额付费，IAP Kit会弹窗提示消费金额超出限制。  用户在使用华为应用内支付时，华为会自动根据国家新闻出版署的要求进行支付限额控制，开发者无需处理。 |

|  |  |  |
| --- | --- | --- |
| 华为账号实名认证 | 未成年人防沉迷 | 未成年人支付限额 |

### 提交玩家角色信息

推荐接入。

玩家成功登录游戏并选择角色、区服后，游戏将角色信息提交到华为游戏服务器，可用于后续基于角色维度的联运活动规划，为玩家提供更好的体验和更丰富的能力。

调用[savePlayerRole](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section201561659105917)接口，将角色信息上报至华为游戏服务器。

注意

若游戏没有角色系统，“roleId”请传入“0”，“roleName”请传入“default”，请勿传""和null。

收起

自动换行

深色代码主题

复制

```
1. let context = this.getUIContext()?.getHostContext() as common.UIAbilityContext;
2. let request: gamePlayer.GSKPlayerRole = {
3. roleId: '123', // 玩家角色ID，如游戏没有角色系统，请传入“0”，务必不要传""和null
4. roleName: 'Jason', // 玩家角色名，如游戏没有角色系统，请传入“default”，务必不要传""和null
5. serverId: '456',
6. serverName: 'Zhangshan',
7. gamePlayerId: '789', // 请根据实际获取到的gamePlayerId传值
8. thirdOpenId: '123' // 接入华为账号登录时不传该字段。接入游戏官方账号登录时，请根据实际获取到的thirdOpenId传值
9. };
10. try {
11. gamePlayer.savePlayerRole(context, request).then(() => {
12. hilog.info(0x0000, 'testTag', `Succeeded in saving.`);
13. });
14. } catch (error) {
15. let err = error as BusinessError;
16. hilog.error(0x0000, 'testTag', `Failed to save. Code: ${err.code}, message: ${err.message}`);
17. }
```

### 欢迎横幅管理游戏账号

不涉及角色交易、或不存在多个游戏号的游戏可忽略。

接入角色交易、或存在多个游戏号的游戏，玩家成功登录后会在顶部欢迎横幅出现“管理”按钮。

若玩家在“顶部欢迎横幅 > 管理 > 管理游戏号”中切换/删除游戏号时，开发者的实现逻辑如下：

1. 在[on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section1097616266227)接口回调中清理游戏的登录缓存。
2. 在[on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section1097616266227)接口回调中重新调用[unionLogin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/gameservice-gameplayer#section157848375136)接口，将**showLoginDialog**参数设置为**true**，即可强制拉起联合登录面板，允许玩家重新选择华为账号登录或游戏官方账号登录。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f1/v3/dfPYh2g7S6KL7QS2_TOnVQ/zh-cn_image_0000002517705525.png?HW-CC-KV=V1&HW-CC-Date=20260414T030334Z&HW-CC-Expire=86400&HW-CC-Sign=B2155FD18AC4684E0A3AB37D57727A98341E8A6DF0C60A135EC674F604D71570 "点击放大")