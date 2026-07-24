## 场景介绍

从6.0.2(22)开始，新增了查询设备当前超级隐私模式状态的功能。

超级隐私模式为用户提供一键关闭敏感器件的能力，管控范围包括位置、相机和麦克风，且随着版本演进，超级隐私模式管控的敏感器件范围会相应调整。应用可通过Device Security Kit提供的接口查询当前超级隐私模式开关状态。

## 约束与限制

本特性需要设备上存在超级隐私模式选项。开发者可通过在设备上选择“设置 > 隐私和安全 > 超级隐私模式”查看超级隐私模式选项。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ab/v3/hHx-9Nd2T12HxsXL8yXXWg/zh-cn_image_0000002530018681.png?HW-CC-KV=V1&HW-CC-Date=20260414T043412Z&HW-CC-Expire=86400&HW-CC-Sign=B9A3F4EC8C8E20FD981CC24F7CEF58A0DEBBBD308796908BBA8BC18AB3F96373 "点击放大")

**流程说明：**

1. 开发者应用查询当前超级隐私模式状态。
2. Device Security Kit接口同步返回当前超级隐私模式状态给HAP应用。
3. 应用根据返回的超级隐私模式状态进行业务处理。

## 接口说明

以下是超级隐私模式状态查询接口，更多接口及使用方法请参见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-superprivacymode-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getSuperPrivacyMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-superprivacymode-api#section1339175183116)() : Promise<[SuperPrivacyMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-superprivacymode-api#section11705111513)> | 查询当前超级隐私模式状态 |

## 开发步骤

1. 导入超级隐私模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { superPrivacyMode } from '@kit.DeviceSecurityKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 查询超级隐私模式状态改变事件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const DOMAIN = 0x0000;
   2. const TAG = "SuperPrivacyModeTest";

   4. let mode: superPrivacyMode.SuperPrivacyMode = superPrivacyMode.SuperPrivacyMode.OFF;
   5. try {
   6. mode = await superPrivacyMode.getSuperPrivacyMode();
   7. hilog.info(DOMAIN, TAG, `Super privacy mode = ${mode}`);
   8. } catch (err) {
   9. hilog.error(DOMAIN, TAG, `call getSuperPrivacyMode interface failed, errCode:${err?.code}, errMessage:${err?.message}`);
   10. }
   ```