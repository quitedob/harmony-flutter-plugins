**问题现象**

使用云存储上传文件失败，HiLog提示“404:Product does not exist”。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ee/v3/hzZZcz4wQ0etdF6yCq1_4g/zh-cn_image_0000002440934292.png?HW-CC-KV=V1&HW-CC-Date=20260414T025954Z&HW-CC-Expire=86400&HW-CC-Sign=E9EA7DE1775F4C827A2D652FE63E68D89A3B391F0942C77494C79D6FBFCCCA55)

**解决措施**

此错误由云存储服务端返回，原因是云存储服务未开通。请[开通云存储服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-enable-storage)。