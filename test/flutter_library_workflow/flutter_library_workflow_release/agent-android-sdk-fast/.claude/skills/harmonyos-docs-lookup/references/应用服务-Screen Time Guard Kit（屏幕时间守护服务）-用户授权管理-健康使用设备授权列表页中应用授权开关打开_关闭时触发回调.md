## 场景介绍

当通过健康使用设备授权列表页中的授权开关开启或者关闭应用授权时（设置-健康使用设备-右上角四点设置![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/35/v3/hKEswsZ3QYeMxl8yEKXz5w/zh-cn_image_0000002523400721.png?HW-CC-KV=V1&HW-CC-Date=20260414T033235Z&HW-CC-Expire=86400&HW-CC-Sign=AA85FEAE98CAAFE569B7D31DDD07C0E8ADF34DF1B88FD289E42459DDE89EDE6E)-可访问健康使用设备的应用），会执行TimeGuardExtensionAbility中的onUserAuthSwitchOn/onUserAuthSwitchOff回调方法，支持开发者在用户授予授权和撤销授权时执行特定逻辑。若之前已设置过健康使用设备的密码，则在此页面取消应用授权时需要输入健康使用设备的密码。

注意

应用调用Screen Time Guard Kit接口获取授权或者取消授权时，不会触发onUserAuthSwitchOn/onUserAuthSwitchOff回调方法。只有在健康使用设备授权列表页操作授权开关时才会触发。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/26/v3/deudepO1SxeWXsfj9rdqjw/zh-cn_image_0000002471625308.png?HW-CC-KV=V1&HW-CC-Date=20260414T033235Z&HW-CC-Expire=86400&HW-CC-Sign=2BBD14C531EBD1D690EDA8083A1C764373EC779E880013752BD51CDF3CDDB8B7 "点击放大")

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d1/v3/CtcqSW2sRnCKzr0SFLE2VQ/zh-cn_image_0000002471465322.png?HW-CC-KV=V1&HW-CC-Date=20260414T033235Z&HW-CC-Expire=86400&HW-CC-Sign=DB81EA22DD2C510B3C9622687BF47E88473C23E3043C1C1D78F3B32905BBA3FE)

流程说明（以关闭授权开关为例）：

1. 应用继承TimeGuardExtensionAbility，实现onUserAuthSwitchOn、onUserAuthSwitchOff方法，以监听用户授权状态。

2. 用户在健康使用设备的授权列表页中关闭授权开关后会拉起extension进程，执行TimeGuardExtensionAbility的onUserAuthSwitchOff回调。

3. onUserAuthSwitchOff回调执行，应用可以在该回调中可以执行特定逻辑。

## 接口说明

授权开关打开/关闭时的回调关键接口如下表所示，具体API说明详见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-arkts)。

展开

| 接口名 | 描述 |
| --- | --- |
| [onUserAuthSwitchOn](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-timeguardextensionability#section79218378490)(): Promise<void> | 当用户授予授权时执行特定逻辑。 |
| [onUserAuthSwitchOff](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/screentimeguard-timeguardextensionability#section1557391615112)(): Promise<void> | 当用户撤销授权时执行特定逻辑。 |

说明

1. TimeGuardExtensionAbility与应用运行在不同进程，但共用沙箱。

2. TimeGuardExtensionAbility与应用直接无法直接传递数据，如需传递数据可以通过[用户首选项](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-data-preferences)/[数据库](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-data-relationalstore)等数据持久化手段进行传递，或者通过[公共事件模块](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-commoneventmanager)传递。

## 开发步骤

1. 导入相关模块。

收起

自动换行

深色代码主题

复制

```
1. import { TimeGuardExtensionAbility } from '@kit.ScreenTimeGuardKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
```

2. 继承TimeGuardExtensionAbility，重写onUserAuthSwitchOn和onUserAuthSwitchOff 回调。

收起

自动换行

深色代码主题

复制

```
1. export default class EntryAbility extends TimeGuardExtensionAbility {
2. async onUserAuthSwitchOn(): Promise<void> {
3. hilog.info(0x0000, 'EntryAbility', 'test --- onUserAuthSwitchOn');
4. }

6. async onUserAuthSwitchOff(): Promise<void> {
7. hilog.info(0x0000, 'EntryAbility', 'test --- onUserAuthSwitchOff');
8. }
9. }
```

3. 在工程中entry模块的module.json5文件中的"extensionAbilities"节点添加如下代码。

收起

自动换行

深色代码主题

复制

```
1. "extensionAbilities": [{
2. "name": "EntryAbility",
3. "type": "screenTimeGuard",
4. "srcEntry": "./ets/entryability/EntryAbility.ets",
5. "exported": false,
6. "skills": [{
7. "actions": ["action.ohos.timeGuard.listener"]
8. }]
9. }],
```