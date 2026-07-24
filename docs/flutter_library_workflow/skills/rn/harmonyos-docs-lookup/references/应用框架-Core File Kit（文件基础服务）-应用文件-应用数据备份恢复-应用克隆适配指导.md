## 简介

用户在日常换机过程中，需要将一台设备的数据备份并发送到另一台设备上进行恢复，以完成跨设备的数据迁移，此时需要使用克隆工具。接入克隆工具时，应用需实现自己的BackupExtensionAbility，在onBackup中实现数据备份，在onRestore中实现数据恢复。若应用未实现BackupExtensionAbility，克隆过程将仅迁移旧设备上的应用，而不迁移应用数据。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/49/v3/Xt9hZCFXRe2KoMiCt0ph6A/zh-cn_image_0000002497754322.png?HW-CC-KV=V1&HW-CC-Date=20260414T041218Z&HW-CC-Expire=86400&HW-CC-Sign=EF6B8011DF8B95A992EB4929D1BDBC7B052CC9E05E6DCE7D938F34A54BA93937)

## 适配指导

API version 12开始，三方应用接入克隆只需要接入备份恢复能力即可，接入指导：**[应用接入数据备份恢复](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-file-backup-extension)**