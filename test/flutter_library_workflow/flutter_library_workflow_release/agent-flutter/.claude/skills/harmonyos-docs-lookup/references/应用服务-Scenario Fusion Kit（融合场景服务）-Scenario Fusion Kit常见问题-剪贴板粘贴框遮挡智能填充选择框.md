**现象描述**

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d3/v3/2WlPwbepRPSgTkjYAnouXA/zh-cn_image_0000002470492194.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T033147Z&HW-CC-Expire=86400&HW-CC-Sign=A1508A9360D3C873BD4E73493027DB3DA16D1A2DA798C7ACE2AD3AFFB769EEB5 "点击放大")

**解决措施**

在代码文件中设置.selectionMenuHidden(true)，使剪贴板粘贴框隐藏。

收起

自动换行

深色代码主题

复制

```
1. Row() {
2. Text('收货人：').textAlign(TextAlign.End).width('25%')
3. TextInput().width('75%').contentType(ContentType.PERSON_FULL_NAME).selectionMenuHidden(true)
4. }
```