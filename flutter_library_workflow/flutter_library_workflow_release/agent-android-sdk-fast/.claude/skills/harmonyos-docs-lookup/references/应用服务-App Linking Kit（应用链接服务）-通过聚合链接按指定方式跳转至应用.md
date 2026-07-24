## 场景介绍

从6.0.0(20)版本开始，新增支持聚合链接能力。

可用于实现在HarmonyOS系统的设备上点击链接后，按照指定的方式进行跳转。当用户打开链接时，聚合链接会引导用户跳转到HarmonyOS平台预览页、应用市场详情页、自定义网址、深度链接地址等页面。

聚合链接主要用于直接向用户发送应用推广信息，例如通过短信/邮件/社交分享链接发送产品优惠活动或应用推广活动。

## 前提条件

已[开通App Linking服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/applinking-enable-applinking)。

## 开发流程

展开

| 角色 | 操作步骤 |
| --- | --- |
| 云端开发 | [开通App Linking服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/applinking-enable-applinking)。 |
| 云端开发 | 先在AGC[申请链接前缀](/consumer/cn/doc/harmonyos-guides/applinking-cross-platform#zh-cn_topic_0000002414086764_zh-cn_topic_0000002409550078_section17487350112015)并[添加网址允许清单](/consumer/cn/doc/harmonyos-guides/applinking-cross-platform#zh-cn_topic_0000002414086764_zh-cn_topic_0000002409550078_section95571012226)，然后[创建聚合链接](/consumer/cn/doc/harmonyos-guides/applinking-cross-platform#zh-cn_topic_0000002414086764_zh-cn_topic_0000002409550078_section759794318231)。 |
| 客户端开发 | [在module.json5中配置聚合链接](/consumer/cn/doc/harmonyos-guides/applinking-cross-platform#zh-cn_topic_0000002447485937_zh-cn_topic_0000002442949429_section2446143184813)。 |
| 客户端开发 | [处理拉起方应用传入的链接](/consumer/cn/doc/harmonyos-guides/applinking-cross-platform#zh-cn_topic_0000002447485937_zh-cn_topic_0000002442949429_section1620481746)。 |
| 客户端开发 | [验证应用被拉起效果](/consumer/cn/doc/harmonyos-guides/applinking-cross-platform#section19309144874511)。 |

## 配置聚合链接能力

### 申请链接前缀

链接前缀是指聚合链接地址中包含的网址，其格式为“https://域名”。创建聚合链接前，需要申请链接前缀。

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，点击“开发与服务”。
2. 在项目列表中点击HarmonyOS应用所在的项目（请确保所有平台的应用在同一项目下）。
3. 在左侧导航栏中选择“增长 > App Linking > 聚合链接”，选择“链接前缀”页签，点击“添加链接前缀”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9a/v3/jKIkKiwpTaa4wm1t2LtcCA/zh-cn_image_0000002537532871.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=1F64E93177EA36D0A027D44B5D28D54CD28528B38A356BF0804C3E9887E4E01E)
4. 在AGC提供的免费域名（例如中国站点的域名：drcn.agconnect.link）前再设置一个前缀字符串，前缀字符串仅支持小写字母和数字，且必须确保此前缀唯一。设置完成后点击“下一步”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/12/v3/u1FMqpxERVesYI8x0wo1og/zh-cn_image_0000002416813288.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=BC8DD47A60D2FFDD1601594AEF16470BEE7EF5799FB7750F069C5E5CD9E2D0EC)
5. 等待域名地址验证通过后，页面将显示完整域名。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/80/v3/LD9MeriNRjqd4vyRFX3QuA/zh-cn_image_0000002416973108.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=7986BDEC4CF466769C7417BB823965F5BBA7AEA0A29F93B09672CE3C1EE907FE)

### 添加网址允许清单

创建聚合链接前，需要添加网址允许清单来指定深度链接地址和自定义网址中允许使用的网址格式。设置后，聚合链接仅允许重定向到符合允许清单规则的网址，从而防止网站诱骗。

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，点击“开发与服务”。
2. 在项目列表中点击HarmonyOS应用所在的项目（请确保所有平台的应用在同一项目下）。
3. 在左侧导航栏中选择“增长 > App Linking > 聚合链接”，选择“网址允许清单”页签，点击“添加允许清单规则”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/20/v3/Ait5W1VKRTyGUsZ_n6pvZA/zh-cn_image_0000002505740114.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=52404ADA49CC155CF3D30327E19068CC6E99DC6EE109FF66289108F0F14F8C86)
4. 使用正则表达式设置允许清单规则，设置完成后点击右上角的“发布”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/40/v3/Fn7bavzyQ_-d6CaXOzPaMA/zh-cn_image_0000002450412241.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=9DFA9A9017C2AA0E7DBEE979AD99B7CBF40DE61C23461913AC878D0FB306D727)

### 创建聚合链接

配置聚合链接，按照指定的方式进行跳转。

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，点击“开发与服务”。
2. 在项目列表中点击HarmonyOS应用所在的项目（请确保所有平台的应用在同一项目下）。
3. 在左侧导航栏中选择“增长 > App Linking > 聚合链接”，选择“聚合链接”页签，点击“创建聚合链接”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fa/v3/jf5BNavKQz23agmxzDm1ww/zh-cn_image_0000002537539869.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=EA19ADD90436225198CFACA638ED6368EB935723724C738931D585A2A034F03E)
4. 设置短链接，完成后点击“下一步”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/14/v3/-W1uWkcXQvaUO3X6GFi_TA/zh-cn_image_0000002416973112.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=0CA47A8C358496291464B1D1FD5337A321DB6A5ADCF26E4706DC425B262B9482)

   展开

   | 参数 | 参数说明 |
   | --- | --- |
   | 链接前缀 | 聚合链接的前缀。如果还未申请链接前缀，请参见[申请链接前缀](/consumer/cn/doc/harmonyos-guides/applinking-cross-platform#zh-cn_topic_0000002414086764_zh-cn_topic_0000002409550078_section17487350112015)。  “链接前缀”下方的文本框中可设置聚合链接的短链接后缀字符串，默认由AGC自动生成。如果需要自行定义，请确保该字符串唯一。 |
   | 链接预览 | 聚合链接向用户发送的短链接地址。 |
5. 设置深度链接，完成后点击“下一步”。

   说明

   * 深度链接地址中使用的域名需满足“网址允许清单”要求。
   * 深度链接地址不允许设置为可执行文件格式。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4f/v3/P6ChO20OSU6WWfiVBqudLQ/zh-cn_image_0000002537660173.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=0056333052DA7C164DBC4D7DE0E082573E13F8C5907B8842AD748121F5281259)

   展开

   | 参数 | 参数说明 |
   | --- | --- |
   | 链接名称 | 配置聚合链接的自定义名称。 |
   | 深度链接地址（默认） | 应用将打开的深度链接地址。  如果未设置HarmonyOS深度链接地址(api>=12)，则会默认打开此链接。 |
   | （可选）HarmonyOS深度链接地址(api>=12) | 如果设置了HarmonyOS深度链接地址(api>=12)，则在HarmonyOS平台优先打开此链接。 |
6. 设置聚合链接在HarmonyOS系统的链接行为，完成后点击“下一步”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9d/v3/57gibb7vQb6g8nR7vXWE4A/zh-cn_image_0000002450412245.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=52A0EDB3B326A56ECD6D95F08F8AC1534EB4EF0CEC79DF27E333AF856809A462)

   展开

   | 参数 | 参数说明 |
   | --- | --- |
   | 设置在HarmonyOS系统的链接行为(api>=12) | 1. 选择“在HarmonyOS应用中打开”，表示用户点击链接会跳转到HarmonyOS应用中的深度链接地址。 2. 选择或添加需要配置深度链接地址的HarmonyOS应用。 |
   | 未安装应用时，则重定向到 | 如果用户未安装HarmonyOS应用，可通过此选项将用户引导到“华为应用市场页面详情页”或“自定义网址”。  注意  如果选择“自定义网址”，链接不允许设置为可执行文件格式。 |
7. （可选）在“设置跟踪参数”页面，设置广告跟踪参数，可用于广告、流量跟踪。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9f/v3/MjLDDiV9SHOTN5rjHkrx7w/zh-cn_image_0000002416813296.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=3CE9F83B9352E954AC4628C6D5983499C4818DA196DF0E33164C5E4185A41E72)

   展开

   | 参数 | 参数说明 |
   | --- | --- |
   | 广告系列来源 | 广告渠道，如Huawei，也可自定义。 |
   | 广告系列媒介 | 广告媒介的标识，如pic 、email。 |
   | 广告系列名称 | 特定的推广活动描述，如“双11推广”。 |
8. （可选）设置社交分享标识，可用于社交软件之间的分享，设置完成后点击“下一步”。

   说明

   设置了社交分享标识参数后，可通过[社交分享标识说明](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/agc-applinking-socialdescription-0000001055261926)了解设置效果。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/46/v3/Gc5td25nR-KX4GyINBeofA/zh-cn_image_0000002416973120.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=788E683B12F82901BBAE150AEEC514B7DBD4993CE24FAB44650195FA947AC6A7)

   展开

   | 参数 | 参数说明 |
   | --- | --- |
   | 标题 | 聚合链接在社交平台上分享时展示的标题名称。 |
   | 图片URL | 聚合链接在社交平台上分享时展示的图片地址。 |
   | 描述说明 | 聚合链接在社交平台上分享时展示的说明信息。 |
9. （可选）设置预览页，可以将用户引导至合适的目标位置。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4c/v3/32ndmKCbSWO80V0MLV9yAA/zh-cn_image_0000002443097812.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=321177D65CF10B3ED322F821C7933517840FB61997B6C3C1A818DBF029B82738)

   展开

   | 参数 | 参数说明 |
   | --- | --- |
   | 显示预览页 | 应用未安装，点击聚合链接时，预览页的显示情况。  * 勾选：在点击聚合链接时，应用如果未安装，则在重定向到应用市场详情页前优先显示预览页。 * 不勾选（默认）：在点击时，应用如果未安装，则会根据浏览器的类型，尽可能地优先拉起应用市场详情页。 说明  目前仅支持华为浏览器。 |
   | 预览页信息来源 | 勾选“显示预览页”后，可以选择预览页信息展示的内容。  * “分享标识内容”：采用分享标识信息构建预览页。 * “应用市场应用信息”：采用AGC中配置的应用信息构建预览页。 |
10. 全部设置完成后，点击右上角的“发布”，页签中将展示已发布的聚合链接列表。
    * 点击网址中的二维码图标，或对应操作栏下方的“二维码下载”，可以下载该聚合链接的二维码图片。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/34/v3/zLYKMFmEQJ6fnWx2D_TjOQ/zh-cn_image_0000002537540511.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=47C7D8A9C2B8B116CC5EFA30C6890B943A04EFD5A75200314550FEEF5B7D986B)

      点击对应操作栏下方的“链接详情”，可以查看该聚合链接的详情，包括深度链接地址、HarmonyOS应用包名、短链接地址等。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9e/v3/xNdDRqaOSrq1MdyWu_xlXA/zh-cn_image_0000002416813308.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=58AC5235C4B2951E3ACB22FAEE432CE037EB0DBBE10474E8FE69440396981B58)

### （可选）归档聚合链接

创建聚合链接后，如果不想继续管理该链接，而又不希望影响用户较长一段时间内的使用，可以选择归档聚合链接。

注意

* 归档7天后的聚合链接将被隐藏，开发者无法通过AGC查看或撤销归档。
* 归档后的聚合链接默认从归档时起1年内有效，请谨慎操作。

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，点击“开发与服务”。
2. 在项目列表中点击HarmonyOS应用所在的项目。
3. 在左侧导航栏中选择“增长 > App Linking > 聚合链接”，选择“聚合链接”页签，对已创建的聚合链接进行归档。
   * 单条归档：在聚合链接列表，选择待归档聚合链接对应“操作”列下方的“归档”。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f9/v3/PF6KHFrpSUuxfWlP5WX_2A/zh-cn_image_0000002537543089.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=D4B584E23F00EF3208A3FD34690A5C4A7062BF799CE936DCA87B0CC4F92B6BF5)
   * 批量归档：在列表，勾选多条待归档，选择右上角“批量操作”的下拉选项中的“归档”。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d6/v3/CVn6FeY8S1mcv0Lmh3sM8A/zh-cn_image_0000002450538705.png?HW-CC-KV=V1&HW-CC-Date=20260414T025554Z&HW-CC-Expire=86400&HW-CC-Sign=94C0D3DC4344198E1A987E5EFE3C0E52FF9B6F2D25CD14A175F8533BD334FD94)

   说明

   可以通过时间筛选，选择查看“7天内已归档”的聚合链接。还可以点击“操作”列下方的“撤销归档”，将已归档的聚合链接恢复原状。

### 在module.json5中配置聚合链接

在HarmonyOS应用的[module.json5文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file)中进行如下配置，用于接收聚合链接，以获取聚合链接中传递的数据。

* "entities"列表中必须包含"entity.system.browsable"。
* "actions"列表中必须包含"ohos.want.action.viewData"。
* "uris"列表中必须包含"scheme"为"https"且"host"为域名地址的元素，可选属性包含"path"、"pathStartWith"和"pathRegex"，具体请参见“[uris标签说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-uri-config#uris标签说明)”。
* "domainVerify"设置为true，表示开启域名校验开关。

说明

skills标签下默认包含一个skill对象，用于标识应用入口。应用跳转链接不能在该skill对象中配置，需要创建独立的skill对象。

如果存在多个跳转场景，需要在skills标签下创建不同的skill对象，否则会导致配置无法生效。

例如，聚合链接的域名是example.drcn.agconnect.link，则需进行如下配置。

收起

自动换行

深色代码主题

复制

```
1. {
2. "module": {
3. "abilities": [
4. {
5. "name": "EntryAbility",
6. "srcEntry": "./ets/entryability/EntryAbility.ets",
7. "icon": "$media:icon",
8. "label": "$string:EntryAbility_label",
9. // 请将exported配置为true；如果exported为false，仅具有权限的系统应用能够拉起该应用，否则无法拉起应用
10. "exported": true,
11. "startWindowIcon": "$media:icon",
12. "startWindowBackground": "$color:start_window_background",
13. "skills": [
14. {
15. "entities": [
16. "entity.system.home"
17. ],
18. "actions": [
19. "ohos.want.action.home"
20. ]
21. },
22. {
23. "entities": [
24. // entities必须包含"entity.system.browsable"
25. "entity.system.browsable"
26. ],
27. "actions": [
28. // actions必须包含"ohos.want.action.viewData"
29. "ohos.want.action.viewData"
30. ],
31. "uris": [
32. {
33. // scheme须配置为https
34. "scheme": "https",
35. // host须配置为聚合链接的域名
36. "host": "example.drcn.agconnect.link",
37. // path可选，表示聚合链接的短链接后缀字符串，例如example.drcn.agconnect.link/AIYx中的AIYx
38. // 如果应用只能处理部分特定的path，则此处应该配置应用所支持的path，避免出现应用不能处理的path链接也被引流到应用中的问题
39. "path": "AIYx"
40. }
41. ],
42. // domainVerify须设置为true
43. "domainVerify": true
44. }
45. // 若有其他跳转能力，如推送消息跳转、NFC跳转，可新增一个skill对象，防止与App Linking业务冲突
46. ]
47. }
48. ]
49. }
50. }
```

### 处理拉起方应用传入的链接

在HarmonyOS应用的Ability（如EntryAbility）的[onCreate()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability#oncreate)或者[onNewWant()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability#onnewwant)生命周期回调中添加如下代码，以处理传入的链接。

收起

自动换行

深色代码主题

复制

```
1. import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { url } from '@kit.ArkTS';
4. export default class EntryAbility extends UIAbility {
5. onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
6. // 从want中获取传入的链接信息。
7. // 如传入的url为：https://example.drcn.agconnect.link/AIYx，开发者可根据自己的业务需求进行后续的处理。
8. let uri = want?.uri;
9. if (uri) {
10. try {
11. let urlObject = url.URL.parseURL(want?.uri);
12. if (urlObject.toString() === "https://example.drcn.agconnect.link/AIYx"){
13. // ...
14. }
15. // ...
16. } catch (error) {
17. hilog.error(0x0000, 'testTag', `Failed to parse url.`);
18. }
19. }
20. }
21. }
```

若要根据链接参数启动UIAbility的指定页面组件，请参考“[启动UIAbility的指定页面](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uiability-intra-device-interaction#启动uiability的指定页面)”。

## 验证应用被拉起效果

* 方式一：[通过openLink接口拉起](/consumer/cn/doc/harmonyos-guides/applinking-cross-platform#zh-cn_topic_0000002447485937_zh-cn_topic_0000002442949429_section10388164920620)。
* 方式二：[通过系统浏览器或ArkWeb拉起](/consumer/cn/doc/harmonyos-guides/applinking-cross-platform#zh-cn_topic_0000002447485937_zh-cn_topic_0000002442949429_section3736124874513)。

### 通过openLink接口拉起

拉起方应用可以调用[UIAbilityContext.openLink()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#openlink12)接口，并将appLinkingOnly参数设为false或者不传，以App Linking优先的方式打开应用。

1. 在“entry/src/main/ets/common”目录下添加GlobalContext.ets文件，开发初始化和获取应用上下文的接口。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';

   3. export class GlobalContext {
   4. private static context: common.UIAbilityContext;

   6. public static initContext(context: common.UIAbilityContext): void {
   7. GlobalContext.context = context;
   8. }

   10. public static getContext(): common.UIAbilityContext {
   11. return GlobalContext.context;
   12. }
   13. }
   ```
2. 在“entry/src/main/ets/entryability/EntryAbility.ets”文件中导入GlobalContext，在onCreate方法中使用GlobalContext.initContext(this.context)初始化全局应用上下文。
3. 在“entry/src/main/ets/pages/Index.ets”文件中，使用[UIAbilityContext.openLink()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#openlink12)接口配置聚合链接。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { hilog } from '@kit.PerformanceAnalysisKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   3. import { GlobalContext } from '../common/GlobalContext';

   5. @Entry
   6. @Component
   7. struct Index {
   8. build() {
   9. Button('start link', { type: ButtonType.Capsule, stateEffect: true })
   10. .width('87%')
   11. .height('5%')
   12. .margin({ bottom: '12vp' })
   13. .onClick(() => {
   14. let context = GlobalContext.getContext();
   15. // 如下link请填写开发者实际跳转的url
   16. let link: string = "https://example.drcn.agconnect.link/AIYx";
   17. context.openLink(link, { appLinkingOnly: false })
   18. .then(() => {
   19. hilog.info(0x0000, 'testTag', `Succeeded in opening link.`);
   20. })
   21. .catch((error: BusinessError) => {
   22. hilog.error(0x0000, 'testTag', `Failed to open link, code: ${error.code}, message: ${error.message}`);
   23. })
   24. })
   25. }
   26. }
   ```
4. 安装拉起方应用，点击拉起方应用中的跳转按钮。

   此时目标方应用未安装，若有聚合链接匹配的应用，点击链接会按照[创建聚合链接](/consumer/cn/doc/harmonyos-guides/applinking-cross-platform#zh-cn_topic_0000002414086764_zh-cn_topic_0000002409550078_section759794318231)时指定的方式进行跳转，例如跳转到HarmonyOS平台预览页、应用市场下载详情页、自定义网址等；若无聚合链接匹配的应用，则继续尝试以浏览器打开链接的方式打开应用。
5. 安装目标方应用后，首次启动时会跳转到深度链接指定的内容详情页面。

### 通过系统浏览器或ArkWeb拉起

ArkWeb深度集成了App Linking的能力，当用户在系统浏览器或者集成ArkWeb的应用网页上点击某个链接时，若有聚合链接匹配的应用，会通过App Linking能力优先拉起目标方应用。此机制有如下限制：

* 如果该聚合链接配置了[在HarmonyOS系统的链接行为](/consumer/cn/doc/harmonyos-guides/applinking-cross-platform#zh-cn_topic_0000002414086764_zh-cn_topic_0000002409550078_li1761311182013)，会跳转到HarmonyOS平台预览页，引导用户打开或下载应用。
* 如果该聚合链接仅配置了[深度链接](/consumer/cn/doc/harmonyos-guides/applinking-cross-platform#zh-cn_topic_0000002414086764_zh-cn_topic_0000002409550078_li13663141012470)，会跳转到深度链接指定的内容详情页面。