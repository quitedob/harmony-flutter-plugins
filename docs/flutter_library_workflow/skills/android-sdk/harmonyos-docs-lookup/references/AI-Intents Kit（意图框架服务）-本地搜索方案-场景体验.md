## 典型场景

**功能搜索：**开发者将应用内的功能接入Intents Kit后，在小艺搜索入口，搜索对应功能名或者应用名，可以将应用内功能直接搜出，比如视频应用接入“会员中心”功能后，用户可通过搜索应用名或功能名搜出具体功能，点击后直接拉起应用中的功能页面。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2d/v3/YtKonT-9SnmvDpZiufMd2g/zh-cn_image_0000002402121965.png?HW-CC-KV=V1&HW-CC-Date=20260414T051419Z&HW-CC-Expire=86400&HW-CC-Sign=B8CD59AD158974B2A65F42F05C61A775F1F2968DE2F6DFA498FFCB742A56FB4A "点击放大")

**内容搜索：**以音乐为例，当用户在使用应用时，应用可以将音乐数据通过端侧API共享到意图框架，这里的音乐数据可以是用户收听过的歌曲，或是应用预测用户感兴趣的歌曲，那么后续用户在小艺搜索入口中搜索歌名时，系统将会在应用共享数据中检索对应内容，并使用模板卡片展示内容结果。当用户点击对应卡片热区时，可以跳转进具体音乐播放页或者后台执行播放。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f0/v3/zyGK1TMoT_-zoFwz4RseAg/zh-cn_image_0000002402161837.png?HW-CC-KV=V1&HW-CC-Date=20260414T051419Z&HW-CC-Expire=86400&HW-CC-Sign=E496658FE2A1FEC7700F3B88E6B00A270B8ED3B181397D405990F239993818D7 "点击放大")

## 卡片展示效果

意图框架提供各垂域在小艺搜索展示使用的标准模板卡片，开发者无需开发展示卡片。

模板卡片包含应用/元服务和内容必要信息，比如歌曲名称、歌曲封面图、歌曲描述，这类参数需要开发者共享到系统。各垂域适用的风格卡片不同，以实际特性场景要求为准。以下为歌曲本地搜索的模板卡样式的示例：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/34/v3/lLII6FFLRvmqhtG6peaySA/zh-cn_image_0000002402121969.png?HW-CC-KV=V1&HW-CC-Date=20260414T051419Z&HW-CC-Expire=86400&HW-CC-Sign=A839AF467D61A6E26F8F35C3B8336B497187CA09DC80740DFDCFE0D8D610EE0B "点击放大")