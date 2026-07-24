1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)平台，在“开发与服务”中选择目标应用，获取“项目设置 > 常规 > 应用”的Client ID。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5a/v3/vSJHE3C3TYmvpPq5_VVn1Q/zh-cn_image_0000002190453281.png?HW-CC-KV=V1&HW-CC-Date=20260414T050118Z&HW-CC-Expire=86400&HW-CC-Sign=6D7A402E63245639696D6BE98AAF4BA97142A952E9D5B7F11792351870715EE8 "点击放大")
2. 在工程中entry模块的module.json5文件中，新增metadata，配置name为client\_id，value为上一步获取的Client ID的值，如下所示：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "module": {
   3. "name": "xxxx",
   4. "type": "entry",
   5. "description": "xxxx",
   6. "mainElement": "xxxx",
   7. "deviceTypes": [],
   8. "pages": "xxxx",
   9. "abilities": [],
   10. "metadata": [
   11. // 配置如下信息
   12. {
   13. "name": "client_id",
   14. "value": "xxxxxx"
   15. }
   16. ]
   17. }
   18. }
   ```