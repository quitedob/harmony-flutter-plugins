prefetch\_test\_tool是为周期性预加载功能提供的一种命令行工具，开发者集成预加载服务后，使用该工具可以更方便、更高效地进行周期性预加载功能测试和调试，提高开发效率，同时确保预加载服务的平稳运行。

当前命令行工具支持的命令集如下：

展开

| 命令名 | 描述 |
| --- | --- |
| [getcache](/consumer/cn/doc/harmonyos-guides/cloudfoundation-commandtool-debug#zh-cn_topic_0000002238773616_section1348600182818) | 提供获取周期性预加载数据的能力。 |

## 调试准备

使用命令行工具调试周期性预加载之前，需要完成以下准备工作：

* 您已在开发者联盟官网注册账号并通过实名认证，详情请参见[账号注册认证](https://developer.huawei.com/consumer/cn/doc/start/registration-and-verification-0000001053628148)。
* 您已在本地安装DevEco Studio 5.0.3 Release及以上版本。
* 手机/平板终端设备的ROM版本已升级至HarmonyOS 6.0.0 Beta5及以上版本。
* 设置HAP包的“Build Mode”为“debug”，且已[申请调试证书](https://developer.huawei.com/consumer/cn/doc/app/agc-help-add-debugcert-0000001914263178)。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/eb/v3/aSMhm-0gQuKKp3vrwMbHOw/zh-cn_image_0000002440934392.png?HW-CC-KV=V1&HW-CC-Date=20260414T025934Z&HW-CC-Expire=86400&HW-CC-Sign=B412D34E2223EA2C99D303CE70BD079F8DB2B3E01655A0CD5D16AF54D2984840)

## 切换shell环境

prefetch\_test\_tool命令行工具基于hdc shell调试，需要切换到hdc shell命令环境。

1. PC连接调试设备。连接方式请根据实际情况选择，详情请参见[设备连接管理](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hdc#设备连接管理)。
2. 打开DevEco Studio，菜单栏选择“View > Tool Windows > Terminal”进入Terminal窗口。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4e/v3/fnbFNnYxQ7aYwRTl8QG8ow/zh-cn_image_0000002440774532.png?HW-CC-KV=V1&HW-CC-Date=20260414T025934Z&HW-CC-Expire=86400&HW-CC-Sign=E55608B3B48C353F2D2136AB6E5DC92B0DE2C36FA586060234D635F9D13262B7)
3. 输入hdc shell，切换到hdc shell命令环境。切换过程中如果出现报错，请参见[常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hdc#常见问题)排查解决。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/93/v3/dCg-jRUkTHuOvfAhW0kNBQ/zh-cn_image_0000002440934380.png?HW-CC-KV=V1&HW-CC-Date=20260414T025934Z&HW-CC-Expire=86400&HW-CC-Sign=4768949E83D43D90473872423616201491C380BDE7932EB1E73C4747BA7C7480)

## 调试命令

命令名“getcache”，提供获取周期性预加载数据的能力。

### 命令格式

收起

自动换行

深色代码主题

复制

```
1. cf_prefetch getcache -m <bundlename>
```

### 命令选项

展开

| 命令选项 | 必填(M)/选填(O) | 描述 | 示例 |
| --- | --- | --- | --- |
| -m | M | 应用包名。此处的包名需要与您在AppGallery Connect中创建应用时配置的包名保持一致。 | cf\_prefetch getcache -m com.huawei.hms.xs.test |

## 调用示例

### 正常场景

* 输入cf\_prefetch help，获取命令行工具的使用说明。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/69/v3/_o-41Pf2R5mO6_Bpgas7jw/zh-cn_image_0000002440934384.png?HW-CC-KV=V1&HW-CC-Date=20260414T025934Z&HW-CC-Expire=86400&HW-CC-Sign=1271CDF7130008A69B572A2B983EE9E213D840D3480E8510572A6582E0A2604C)
* 输入cf\_prefetch getcache -h，获取getcache命令支持的参数信息。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/87/v3/vkgOM0tMSvK3yanZ4W4BIg/zh-cn_image_0000002440774544.png?HW-CC-KV=V1&HW-CC-Date=20260414T025934Z&HW-CC-Expire=86400&HW-CC-Sign=E12F37C6A55CB56E3423DC60A372806AE3A1E145CEFB02B294F843BBB532DF5F)
* 输入cf\_prefetch getcache -m <bundlename>，立即向云侧请求获取一次周期性预加载数据。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7e/v3/QppZsJ6_Tou5iyfCLtwbwQ/zh-cn_image_0000002474214385.png?HW-CC-KV=V1&HW-CC-Date=20260414T025934Z&HW-CC-Expire=86400&HW-CC-Sign=CB74B9D7C0F913D053BEA91B007D4E38E5A80C245BE49C789C87F6A1CBF2E885)

  说明

  如果返回结果中的“fetch data timestamp”不是当前时间，则表示仍为上一次成功拉取数据的时间戳，此次数据拉取失败，请参见[异常场景](/consumer/cn/doc/harmonyos-guides/cloudfoundation-commandtool-debug#zh-cn_topic_0000002238773616_section990573323613)排查。

### 异常场景

* 链路不通，例如无网络情况；或周期性预加载配置不正确。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d8/v3/f0lAEHTAQS23WL57wmWvMg/zh-cn_image_0000002474214377.png?HW-CC-KV=V1&HW-CC-Date=20260414T025934Z&HW-CC-Expire=86400&HW-CC-Sign=54F46531E63116CFA02430A0A3B0ECB2CD57016455D1411FE1AD456265548ED7)
* 命令行工具内部错误。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1/v3/JaZpTPcKQIKh11hUzcCgvw/zh-cn_image_0000002474174537.png?HW-CC-KV=V1&HW-CC-Date=20260414T025934Z&HW-CC-Expire=86400&HW-CC-Sign=1E67E765D6ECC1DC1E6A8A0DFE2B96DAC30039967F1A103CFD2808B58CCEE5AE)
* HAP包非debug调试模式。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7c/v3/yti1TmBaRoO49KBuU8Z0Fg/zh-cn_image_0000002440774540.png?HW-CC-KV=V1&HW-CC-Date=20260414T025934Z&HW-CC-Expire=86400&HW-CC-Sign=463BF230D425186C831BC9D4D7A2E3C7FF1206660967B2F7EE9E4C638A16D6F9)
* 应用包名输入错误。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/75/v3/C49csWpRQ-eD2mVgbga9AQ/zh-cn_image_0000002440774528.png?HW-CC-KV=V1&HW-CC-Date=20260414T025934Z&HW-CC-Expire=86400&HW-CC-Sign=08F5EDFB5C70DE43999980B0D522AEB6EF92D7E6B4E962D58DD622EEB9A25383)