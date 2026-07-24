安装预加载和周期性预加载需分别进行配置，且两者均可通过云函数和开发者服务器（即HTTPS请求）两种数据来源方式来实现。

对于不同类型的开发者，支持的数据来源方式有所不同：

* 个人开发者：数据来源默认选择云函数，且仅支持通过云函数来实现预加载。需要开通云函数服务并创建函数才可以配置。
* 非个人开发者：数据来源支持云函数和开发者服务器两种。可根据实际需要进行选择。

下文介绍如何配置两种数据来源方式的预加载实现。

说明

当前“开发者服务器”数据来源方式仅对外受限开放，如有需求，请发送邮件申请开通，华为方收到邮件后，将在1~2个工作日内安排对接人员并邮件回复。

邮件格式要求如下：

* 邮箱地址：[agconnect@huawei.com](mailto:agconnect@huawei.com)
* 邮件标题：【预加载】【申请开通开发者服务器权限】

* 邮件内容： 需包含Developer ID、项目ID、应用ID、预加载使用场景。其中，Developer ID等信息查询方法请参见[查看应用信息](https://developer.huawei.com/consumer/cn/doc/app/agc-help-view-app-info-0000002282674569)。

## 数据来源为云函数

### 前提条件

* 已[开通预加载服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-enable-prefetch)。
* 已[创建函数](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-create-and-config-function)。

### 绑定云函数

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，点击“开发与服务”。
2. 在项目列表中点击您的项目，在项目下的应用列表中选择需要配置预加载的HarmonyOS应用/元服务。
3. 在左侧导航栏选择“云开发（Serverless）> 预加载”，进入预加载页面。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/68/v3/xbaJEBNfS8il1M2Z6B3RhQ/zh-cn_image_0000002474174497.png?HW-CC-KV=V1&HW-CC-Date=20260414T025857Z&HW-CC-Expire=86400&HW-CC-Sign=5FD5A0BDCC15E1068BA0A4E2713A1B879DE8EF456820E85A6423C9AAA8A42458)
4. 根据实际需要，在“周期性预加载”或者“安装预加载”区域，“数据来源”选择“云函数”，然后点击“函数名称”后的“修改”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1b/v3/PJdipIlWQ42_finTLBCWlA/zh-cn_image_0000002474214341.png?HW-CC-KV=V1&HW-CC-Date=20260414T025857Z&HW-CC-Expire=86400&HW-CC-Sign=37A876920A66613924B98B75216311450B26684D7C54873621E6C34915300D1E)
5. 以“周期性预加载”为例，在“函数名称”下拉框选择实现周期性预加载的函数名称。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/84/v3/llQC82lKQ3CCKu9qhF8PHg/zh-cn_image_0000002440934372.png?HW-CC-KV=V1&HW-CC-Date=20260414T025857Z&HW-CC-Expire=86400&HW-CC-Sign=9DC9A33BBD98B96766BE4442F8B02052CCE4352DC530E60B3322B48949563C4C)
6. 点击“保存”完成周期性预加载配置。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/13/v3/s4H6S8TkTJCZAosXEw-J8Q/zh-cn_image_0000002474174517.png?HW-CC-KV=V1&HW-CC-Date=20260414T025857Z&HW-CC-Expire=86400&HW-CC-Sign=5989B6BDF315E6754735E5A47A0F3F5004CCD57415DBEAB3DF0BD8C60E888050)
7. 若配置“安装预加载”，重复步骤[4](/consumer/cn/doc/harmonyos-guides/cloudfoundation-prefetch-config#zh-cn_topic_0000002166964980_zh-cn_topic_0000002131919472_li2842728132811)-[6](/consumer/cn/doc/harmonyos-guides/cloudfoundation-prefetch-config#zh-cn_topic_0000002166964980_zh-cn_topic_0000002131919472_li17782763116)即可。
8. （可选）后续若需要修改绑定的云函数，点击“函数名称”后的“修改”更新即可。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/da/v3/m2xrv0ucQ_S6T6_3_QQF2w/zh-cn_image_0000002474174525.png?HW-CC-KV=V1&HW-CC-Date=20260414T025857Z&HW-CC-Expire=86400&HW-CC-Sign=09C6E915362DF4C60A6A9EA0B7704642A4F06F6AB5392C5209F34F26A5B2F4E7)

## 数据来源为开发者服务器

### 前提条件

* 已申请开通开发者服务器权限。
* 已[开通预加载服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-enable-prefetch)。

### 配置服务器地址

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，点击“开发与服务”。
2. 在项目列表中点击您的项目，在项目下的应用列表中选择需要配置预加载的HarmonyOS应用/元服务。
3. 在左侧导航栏选择“云开发（Serverless）> 预加载”，进入预加载页面。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6b/v3/TDpM9ztgSzyLpxqpHYX6wQ/zh-cn_image_0000002474174505.png?HW-CC-KV=V1&HW-CC-Date=20260414T025857Z&HW-CC-Expire=86400&HW-CC-Sign=DEAF11A8749B9C8B6D247415015A45B0A8E46AE4AEE11903C639E34329C0672E)
4. 在“周期性预加载”或者“安装预加载”区域，“数据来源”选择“开发者服务器”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9b/v3/gjrncOKiRQeS6_vdNBRl1Q/zh-cn_image_0000002440774508.png?HW-CC-KV=V1&HW-CC-Date=20260414T025857Z&HW-CC-Expire=86400&HW-CC-Sign=663C35DCCBB361B42CD5BE0B509A5A687A5AE8C3411B61408B1195D504F09D6D)
5. 点击“下载地址”后的“修改”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/21/v3/M85G2PjrSNy8RkOclPHI5g/zh-cn_image_0000002440774500.png?HW-CC-KV=V1&HW-CC-Date=20260414T025857Z&HW-CC-Expire=86400&HW-CC-Sign=93A2899C40B4EFF1FF4C967769915334DA576AE796A8492E17CDA376B29A4BE8)
6. 以“周期性预加载”为例，“下载地址”以“https://”开头，输入框中输入服务器地址，配置完成后点击“保存”。

   需要注意以下几点：

   * 仅支持填写一个服务器地址，需包含预加载资源接口路径，如图中示例：prefetchData。
   * 域名：须填写完整的域名。例如www.example.com，不可写为example.com。
   * IP地址：须填写准确的IP地址，确保没有输入错误。
   * 端口号：如果要指定端口号，可在服务器地址后面以冒号分隔，例如https://www.example.com:443。HTTPS协议的默认端口号（443）可以省略。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/74/v3/DIZfYY9QQFWNv1aMw_3rFw/zh-cn_image_0000002474214349.png?HW-CC-KV=V1&HW-CC-Date=20260414T025857Z&HW-CC-Expire=86400&HW-CC-Sign=3F7E3AE1DE378A67A080662663BD4182C3251A77C0AAE01E5825B213B74CCCCA)

   后续AGC会周期性地向该处配置的开发者服务器（即下载地址）发起一个HTTP GET请求，其中包含的query参数请参考[开发者服务器接口规范](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-prefetch-cloud-interdev#zh-cn_topic_0000002209197493_section83701164150)，获取到数据后会将整个HTTP body缓存在本地。

   说明

   * 开发者服务器接口返回的数据内容需仅包含文本、图片、视频、音频等供页面展示的静态资源，不支持包含代码、脚本等动态数据。
   * 开发者服务器接口返回的数据类型为其自定义格式的JSON或字符串数据，大小需限定在3MB以内。
7. 若配置“安装预加载”，重复步骤[4](/consumer/cn/doc/harmonyos-guides/cloudfoundation-prefetch-config#zh-cn_topic_0000002166964980_zh-cn_topic_0000002131919472_li36291744112217)-[6](/consumer/cn/doc/harmonyos-guides/cloudfoundation-prefetch-config#zh-cn_topic_0000002166964980_zh-cn_topic_0000002131919472_li41341137143420)即可。
8. （可选）后续若需要修改下载地址，点击“下载地址”后的“修改”更新即可。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a2/v3/RXbCX2LhRO6fyuYf9bVLwg/zh-cn_image_0000002474214369.png?HW-CC-KV=V1&HW-CC-Date=20260414T025857Z&HW-CC-Expire=86400&HW-CC-Sign=62A872D6A69BE988A317B426F44D003B1E5D43BBE97CC382BFDF39584A1D22C6)