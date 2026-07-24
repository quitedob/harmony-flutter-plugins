1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)平台，在“开发与服务”中选择目标应用，获取“项目设置 > 常规 > 应用”的Client ID。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5b/v3/5et3y9xpQye2iCa5PoaMqw/zh-cn_image_0000002509334467.png?HW-CC-KV=V1&HW-CC-Date=20260414T030556Z&HW-CC-Expire=86400&HW-CC-Sign=8371A040907387A3B72F835C94F14DDF6242C9EEF56FE0E4C5552BBA75601A64)
2. 在工程中entry模块的module.json5文件中，新增metadata，配置name为client\_id，value为上一步获取的Client ID的值，如下所示：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. "module": {
   2. "name": "xxxx",
   3. "type": "entry",
   4. "description": "xxxx",
   5. "mainElement": "xxxx",
   6. "deviceTypes": [],
   7. "pages": "xxxx",
   8. "abilities": [],
   9. "metadata": [ // 配置如下信息
   10. {
   11. "name": "client_id",
   12. "value": "xxxxxx"
   13. }
   14. ]
   15. }
   ```