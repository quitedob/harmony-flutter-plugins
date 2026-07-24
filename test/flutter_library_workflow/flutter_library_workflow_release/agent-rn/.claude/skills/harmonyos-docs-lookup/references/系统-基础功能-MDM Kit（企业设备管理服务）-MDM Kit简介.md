## 业务介绍

MDM Kit（企业设备管理服务）为企业MDM（Mobile Device Management）应用提供设备管理API，用于管理并保护公司设备上的数据和应用程序。企业MDM应用可以通过集中管理、远程配置和监控来保障设备和数据的安全性和稳定性。它广泛应用于企业和政府机构，以确保员工和客户使用的设备和数据受到保护，实现企业高效管理、安全使用设备。

## 实现原理

框架层和服务层提供了enterprise\_device\_management部件和enterprise\_device\_management\_ext部件，enterprise\_device\_management部件提供了设备管理应用程序框架和基本设备管理能力，enterprise\_device\_management\_ext部件为HarmonyOS NEXT设备提供扩展的企业设备管理能力。设备管理应用通过[EnterpriseAdminExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-admin)来调用MDM Kit中的接口，实现管理设备的意图。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/40/v3/w-q376tDRQiSjCZkcdgglQ/zh-cn_image_0000002540771628.png?HW-CC-KV=V1&HW-CC-Date=20260414T045638Z&HW-CC-Expire=86400&HW-CC-Sign=8E57523359E19841CBD5FE492284801946E349322545FEF7611442BEF8F3CBF0)

## 约束与限制

* SDK版本为5.0.0（API 12）及以上。
* 仅支持Stage模型。
* 仅支持HarmonyOS NEXT设备。

## 模拟器支持情况

本Kit支持模拟器，但与真机存在差异，详情请参见“[模拟器与真机的差异](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-emulator-specification#section1227613205203)”。