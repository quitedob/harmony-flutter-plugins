## 概述

线性布局（LinearLayout）是开发中最常用的布局，通过线性容器[Row](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-row)和[Column](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-column)构建。线性布局是其他布局的基础，其子元素在线性方向上（水平方向和垂直方向）依次排列。线性布局的排列方向由所选容器组件决定，Row容器内子元素按照水平方向排列，Column容器内子元素按照垂直方向排列。根据不同的排列方向，开发者可选择使用Row或Column容器创建线性布局。

说明

在复杂界面中使用多组件嵌套时，若布局组件的嵌套层数过深或嵌套的组件数量过多，将会产生额外开销。建议通过移除冗余节点、利用布局边界减少布局计算、合理采用渲染控制语法及布局组件方法来优化性能。最佳实践请参考[布局优化指导](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-improve-layout-performance)。

**图1** Column容器内子元素排列示意图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/31/v3/D9uin7zWQna6KVNfgwo6aw/zh-cn_image_0000002540770988.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=66332B2D27C0F22097FB47F6C894A013F1B82ACF5B879A310CE91BAB1CF510AD)

**图2** Row容器内子元素排列示意图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/22/v3/Djlebr-xSQGUtpr3douX6g/zh-cn_image_0000002571291285.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=6B2B0079E23E2DFE3FE8F2CCE8C541DA11286F690BAEEB97A531F75F9477FCE5)

## 基本概念

* 布局容器：具有布局能力的容器组件，可以承载其他元素作为其子元素，布局容器会对其子元素进行尺寸计算和布局排列。
* 布局子元素：布局容器内部的元素。
* 主轴：线性布局容器在布局方向上的轴线，子元素默认沿主轴排列。Row容器主轴为水平方向，Column容器主轴为垂直方向（图示可参考弹性布局[基本概念](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-layout-development-flex-layout#基本概念)中的主轴）。
* 交叉轴：垂直于主轴方向的轴线。Row容器交叉轴为垂直方向，Column容器交叉轴为水平方向（图示可参考弹性布局[基本概念](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-layout-development-flex-layout#基本概念)中的交叉轴）。
* 间距：布局子元素的间距。

## 布局子元素在排列方向上的间距

在布局容器内，可以通过space属性设置排列方向上子元素的间距，使各子元素在排列方向上有等间距效果。

### Column容器内排列方向上的间距

**图3** Column容器内排列方向的间距图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7b/v3/Am6cQoZ5RcO4kBBQHjS_RQ/zh-cn_image_0000002540611338.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=8333BCB62AEB07D2C5B1A2CD9C24D774A05A1D9CDBA5C3C52E09C756B53549C4)

收起

自动换行

深色代码主题

复制

```
1. Column({ space: 20 }) {
2. Text('space: 20').fontSize(15).fontColor(Color.Gray).width('90%')
3. Row().width('90%').height(50).backgroundColor(0xF5DEB3)
4. Row().width('90%').height(50).backgroundColor(0xD2B48C)
5. Row().width('90%').height(50).backgroundColor(0xF5DEB3)
6. }.width('100%')
```

[ColumnLayoutExample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/ColumnLayoutExample.ets#L20-L27)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bf/v3/L8LYc6bcSsK5hRx-lzY9Lg/zh-cn_image_0000002571171333.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=C116DDCDCF0818867D8174BA816E26FEA3CB9D886C8F2D26A045C8F1D3A029AA)

### Row容器内排列方向上的间距

**图4** Row容器内排列方向的间距图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d4/v3/S73GzX1yQkWLxTJV1j0fGw/zh-cn_image_0000002540770990.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=3BEA20E26D296A346C678348ACE898923B633E07E243D5D7BC5E211027954F95)

收起

自动换行

深色代码主题

复制

```
1. Row({ space: 35 }) {
2. Text('space: 35').fontSize(15).fontColor(Color.Gray)
3. Row().width('10%').height(150).backgroundColor(0xF5DEB3)
4. Row().width('10%').height(150).backgroundColor(0xD2B48C)
5. Row().width('10%').height(150).backgroundColor(0xF5DEB3)
6. }.width('90%')
```

[RowLayoutExample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/RowLayoutExample.ets#L20-L27)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2/v3/PozmC_0sTca3qcvgCPajjA/zh-cn_image_0000002571291287.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=3F2040252F1C29CB7407AD093313A8B62B84FA248B98AABE9D381E1335FA6376)

## 布局子元素在主轴上的排列方式

在布局容器内，可以通过[justifyContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-column#justifycontent8)属性设置子元素在容器主轴上的排列方式。可以从主轴起始位置开始排布，也可以从主轴结束位置开始排布，或者均匀分割主轴的空间。

### Column容器内子元素在垂直方向上的排列

**图5** Column容器内子元素在垂直方向上的排列图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c6/v3/X5hbVei-TsOkl7qQ_uy9aA/zh-cn_image_0000002540611340.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=DBDB46D7478DAA8272F308FF67CB45BA01858B5910C266B158C2DF85E840497E)

* justifyContent(FlexAlign.Start，默认值)：元素在垂直方向首端对齐，第一个元素与行首对齐，同时后续的元素与前一个对齐。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Column({}) {
  2. Column() {
  3. }.width('80%').height(50).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('80%').height(50).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('80%').height(50).backgroundColor(0xF5DEB3)
  10. }.width('100%').height(300).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.Start)
  ```

  [ColumnLayoutJustifyContentStart.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/ColumnLayoutJustifyContentStart.ets#L20-L21)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/57/v3/uGGUZg79TTS4cpsxfthUgA/zh-cn_image_0000002571171335.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=6CF8207FAEC9D7D07C17CA79C1A6289C9817289D4C6969F601E15F554799876B)
* justifyContent(FlexAlign.Center)：元素在垂直方向中心对齐，第一个元素与行首的距离与最后一个元素与行尾距离相同。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Column({}) {
  2. Column() {
  3. }.width('80%').height(50).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('80%').height(50).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('80%').height(50).backgroundColor(0xF5DEB3)
  10. }.width('100%').height(300).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.Center)
  ```

  [ColumnLayoutJustifyContentCenter.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/ColumnLayoutJustifyContentCenter.ets#L20-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2e/v3/Cn2VR9jcT_mfgcFz4EBuPw/zh-cn_image_0000002540770992.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=DFEA74CEABF68ECC4B0316DE943660AFD64F2B675693918BF2C08B64215F1245)
* justifyContent(FlexAlign.End)：元素在垂直方向尾部对齐，最后一个元素与行尾对齐，其他元素与后一个对齐。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Column({}) {
  2. Column() {
  3. }.width('80%').height(50).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('80%').height(50).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('80%').height(50).backgroundColor(0xF5DEB3)
  10. }.width('100%').height(300).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.End)
  ```

  [ColumnLayoutJustifyContentEnd.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/ColumnLayoutJustifyContentEnd.ets#L20-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fe/v3/xLxAePd6Thairt1qTqPXvw/zh-cn_image_0000002571291289.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=818BC4EA6F661CFBB205BE63F2312BE7E97D581DD2258EAD9864FD8E925A333A)
* justifyContent(FlexAlign.SpaceBetween)：垂直方向均匀分配元素，相邻元素之间距离相同。第一个元素与行首对齐，最后一个元素与行尾对齐。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Column({}) {
  2. Column() {
  3. }.width('80%').height(50).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('80%').height(50).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('80%').height(50).backgroundColor(0xF5DEB3)
  10. }.width('100%').height(300).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.SpaceBetween)
  ```

  [ColumnLayoutJustifyContentSpaceBetween.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/ColumnLayoutJustifyContentSpaceBetween.ets#L20-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2b/v3/BvZ3mhlFQNiaIsHmstlbYg/zh-cn_image_0000002540611342.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=B6836E35BCBF6B514703A5B78EBE8B0CEE724625BD2B5825E896EB274379EE12)
* justifyContent(FlexAlign.SpaceAround)：垂直方向均匀分配元素，相邻元素之间距离相同。第一个元素到行首的距离和最后一个元素到行尾的距离是相邻元素之间距离的一半。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Column({}) {
  2. Column() {
  3. }.width('80%').height(50).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('80%').height(50).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('80%').height(50).backgroundColor(0xF5DEB3)
  10. }.width('100%').height(300).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.SpaceAround)
  ```

  [ColumnLayoutJustifyContentSpaceAround.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/ColumnLayoutJustifyContentSpaceAround.ets#L20-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6c/v3/v4Kn-5veQcWKZ1xg69v_EA/zh-cn_image_0000002571171337.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=DF5D5B58E25644D65E9CDD212E005C44803636E04899C59E9F481DC5B60DAA76)
* justifyContent(FlexAlign.SpaceEvenly)：垂直方向均匀分配元素，相邻元素之间的距离、第一个元素与行首的间距、最后一个元素到行尾的间距都完全一样。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Column({}) {
  2. Column() {
  3. }.width('80%').height(50).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('80%').height(50).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('80%').height(50).backgroundColor(0xF5DEB3)
  10. }.width('100%').height(300).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.SpaceEvenly)
  ```

  [ColumnLayoutJustifyContentSpaceEvenly.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/ColumnLayoutJustifyContentSpaceEvenly.ets#L20-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/74/v3/XOUqZYTmRDC63jXHid-H0w/zh-cn_image_0000002540770994.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=4761FADB15432AC8C1D3D3E4FC3C86721842308FC536171A8AFCD786A7614166)

### Row容器内子元素在水平方向上的排列

**图6** Row容器内子元素在水平方向上的排列图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cf/v3/V75gLZj-S56I7xqg_om9Dg/zh-cn_image_0000002571291291.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=9E6853C2856076190E2CFF1AC030FAF5B7923B845C74759A7885C652D8CBC0B8)

* justifyContent(FlexAlign.Start，默认值)：元素在水平方向首端对齐，第一个元素与行首对齐，同时后续的元素与前一个对齐。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Row({}) {
  2. Column() {
  3. }.width('20%').height(30).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('20%').height(30).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('20%').height(30).backgroundColor(0xF5DEB3)
  10. }.width('100%').height(200).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.Start)
  ```

  [RowLayoutJustifyContentStart.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/RowLayoutJustifyContentStart.ets#L20-L63)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ed/v3/KA_GP2_oSyCCERg-a1wq7Q/zh-cn_image_0000002540611344.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=28ECDECF52FE78111A589CED9688BD6831D77976535B4D2D61BE06398D3A4823)
* justifyContent(FlexAlign.Center)：元素在水平方向中心对齐，第一个元素与行首的距离与最后一个元素与行尾距离相同。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Row({}) {
  2. Column() {
  3. }.width('20%').height(30).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('20%').height(30).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('20%').height(30).backgroundColor(0xF5DEB3)
  10. }.width('100%').height(200).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.Center)
  ```

  [RowLayoutJustifyContentCenter.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/RowLayoutJustifyContentCenter.ets#L20-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e3/v3/dwOdk_OJTMqkmM-1zpYHWg/zh-cn_image_0000002571171339.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=BBF4A4CFBAB2BE74991D46121528016019DC7130BA7742FD8D70F3283BC558FA)
* justifyContent(FlexAlign.End)：元素在水平方向尾部对齐，最后一个元素与行尾对齐，其他元素与后一个对齐。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Row({}) {
  2. Column() {
  3. }.width('20%').height(30).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('20%').height(30).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('20%').height(30).backgroundColor(0xF5DEB3)
  10. }.width('100%').height(200).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.End)
  ```

  [RowLayoutJustifyContentEnd.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/RowLayoutJustifyContentEnd.ets#L20-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/54/v3/UwWBmWg2T7q0eA9d7_o4EA/zh-cn_image_0000002540770996.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=A9904D37F308E0D0A66DF3D8220612B0519EFF9206266DF2A49169A48D9E75BA)
* justifyContent(FlexAlign.SpaceBetween)：水平方向均匀分配元素，相邻元素之间距离相同。第一个元素与行首对齐，最后一个元素与行尾对齐。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Row({}) {
  2. Column() {
  3. }.width('20%').height(30).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('20%').height(30).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('20%').height(30).backgroundColor(0xF5DEB3)
  10. }.width('100%').height(200).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.SpaceBetween)
  ```

  [RowLayoutJustifyContentSpaceBetween.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/RowLayoutJustifyContentSpaceBetween.ets#L20-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d2/v3/MRzccms_QX2me9yfMUuluA/zh-cn_image_0000002571291293.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=8620B20C0C77CE4A132C20C50DDB4179625B32542C9F83E63165A7019D63C5FD)
* justifyContent(FlexAlign.SpaceAround)：水平方向均匀分配元素，相邻元素之间距离相同。第一个元素到行首的距离和最后一个元素到行尾的距离是相邻元素之间距离的一半。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Row({}) {
  2. Column() {
  3. }.width('20%').height(30).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('20%').height(30).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('20%').height(30).backgroundColor(0xF5DEB3)
  10. }.width('100%').height(200).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.SpaceAround)
  ```

  [RowLayoutJustifyContentSpaceAround.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/RowLayoutJustifyContentSpaceAround.ets#L20-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e2/v3/8l21IKbRTmuFYP3q4tN94g/zh-cn_image_0000002540611346.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=7FC07AAD26C78A9FC9CD917014347995B21ABBEB6A584FF66394106DE1AC1509)
* justifyContent(FlexAlign.SpaceEvenly)：水平方向均匀分配元素，相邻元素之间的距离、第一个元素与行首的间距、最后一个元素到行尾的间距都完全一样。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Row({}) {
  2. Column() {
  3. }.width('20%').height(30).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('20%').height(30).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('20%').height(30).backgroundColor(0xF5DEB3)
  10. }.width('100%').height(200).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.SpaceEvenly)
  ```

  [RowLayoutJustifyContentSpaceEvenly.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/RowLayoutJustifyContentSpaceEvenly.ets#L20-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/47/v3/uHFS0Ny6RMik9FekdTTQRA/zh-cn_image_0000002571171341.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=1511D625F1B10AD9F71C6FED6DA59E8C259CBCA125990E3D2314333B4532167A)

## 布局子元素在交叉轴上的对齐方式

在布局容器内，可以通过[alignItems](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-column#alignitems)属性设置子元素在交叉轴（排列方向的垂直方向）上的对齐方式，且在各类尺寸屏幕中表现一致。其中，交叉轴为垂直方向时，取值为[VerticalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#verticalalign)类型，水平方向取值为[HorizontalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#horizontalalign)类型。

[alignSelf](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-flex-layout#alignself)属性用于控制单个子元素在容器交叉轴上的对齐方式，其优先级高于alignItems属性，如果设置了alignSelf属性，则在单个子元素上会覆盖alignItems属性。

### Column容器内子元素在水平方向上的排列

**图7** Column容器内子元素在水平方向上的排列图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2e/v3/E8rCzPuNQBS6yaRzbbkAPQ/zh-cn_image_0000002540770998.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=698EB14F4F2341E8212496042D63AD2BD91699487E8E3002853069749D6D6270)

* HorizontalAlign.Start：子元素在水平方向左对齐。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Column({}) {
  2. Column() {
  3. }.width('80%').height(50).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('80%').height(50).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('80%').height(50).backgroundColor(0xF5DEB3)
  10. }.width('100%').alignItems(HorizontalAlign.Start).backgroundColor('rgb(242,242,242)')
  ```

  [RowLayoutHorizontalAlignStart.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/RowLayoutHorizontalAlignStart.ets#L20-L87)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9a/v3/EjDyHNnNQiK5YCz8ibMcFg/zh-cn_image_0000002571291295.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=248795B65CA8D1187E377FBFAD2AF228BABEEE7BABCDF75F45A218AF71CD86B9)
* HorizontalAlign.Center（默认值）：子元素在水平方向居中对齐。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Column({}) {
  2. Column() {
  3. }.width('80%').height(50).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('80%').height(50).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('80%').height(50).backgroundColor(0xF5DEB3)
  10. }.width('100%').alignItems(HorizontalAlign.Center).backgroundColor('rgb(242,242,242)')
  ```

  [RowLayoutHorizontalAlignCenter.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/RowLayoutHorizontalAlignCenter.ets#L20-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e2/v3/zRL2N4XzQcuYtomHBEknMw/zh-cn_image_0000002540611348.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=74EEE8478F71D8E09149E5BE878FA295456A4BE47BC3DA95B59C5A2840090FD0)
* HorizontalAlign.End：子元素在水平方向右对齐。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Column({}) {
  2. Column() {
  3. }.width('80%').height(50).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('80%').height(50).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('80%').height(50).backgroundColor(0xF5DEB3)
  10. }.width('100%').alignItems(HorizontalAlign.End).backgroundColor('rgb(242,242,242)')
  ```

  [RowLayoutHorizontalAlignEnd.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/RowLayoutHorizontalAlignEnd.ets#L20-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/39/v3/FWZH9DdMRkuCzympVtI1Pg/zh-cn_image_0000002571171343.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=B6FA9B1AEFD374EED9D137AE21369E72F1D860B63F05F7803F18512E6B9BC58F)

### Row容器内子元素在垂直方向上的排列

**图8** Row容器内子元素在垂直方向上的排列图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/be/v3/U7u2Vpp_SViRLVddsPqnAg/zh-cn_image_0000002540771000.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=56D7B90B0E63020DB4532A14AE2A6A703545509A750C16BCB1A9E30199E770D5)

* VerticalAlign.Top：子元素在垂直方向顶部对齐。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Row({}) {
  2. Column() {
  3. }.width('20%').height(30).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('20%').height(30).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('20%').height(30).backgroundColor(0xF5DEB3)
  10. }.width('100%').height(200).alignItems(VerticalAlign.Top).backgroundColor('rgb(242,242,242)')
  ```

  [RowLayoutVerticalAlignTop.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/RowLayoutVerticalAlignTop.ets#L20-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/20/v3/4hT5BW-RSwiKiGWy4DIqdw/zh-cn_image_0000002571291297.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=924593B5C245F06CFBFBF40C9D77E33C9363856635B6F13A35A8E448F21EAE71)
* VerticalAlign.Center（默认值）：子元素在垂直方向居中对齐。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Row({}) {
  2. Column() {
  3. }.width('20%').height(30).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('20%').height(30).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('20%').height(30).backgroundColor(0xF5DEB3)
  10. }.width('100%').height(200).alignItems(VerticalAlign.Center).backgroundColor('rgb(242,242,242)')
  ```

  [RowLayoutVerticalAlignCenter.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/RowLayoutVerticalAlignCenter.ets#L20-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6d/v3/S3-2orqJQBqN5KoPTDbBPg/zh-cn_image_0000002540611350.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=8CA9967FD2EB9A6FD8704BBB90A1F02CFDB532D4ECC2830348716D88BBC81B83)
* VerticalAlign.Bottom：子元素在垂直方向底部对齐。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Row({}) {
  2. Column() {
  3. }.width('20%').height(30).backgroundColor(0xF5DEB3)

  5. Column() {
  6. }.width('20%').height(30).backgroundColor(0xD2B48C)

  8. Column() {
  9. }.width('20%').height(30).backgroundColor(0xF5DEB3)
  10. }.width('100%').height(200).alignItems(VerticalAlign.Bottom).backgroundColor('rgb(242,242,242)')
  ```

  [RowLayoutVerticalAlignBottom.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/RowLayoutVerticalAlignBottom.ets#L20-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cb/v3/d_v13AIMTT6SLV5LoVEeCA/zh-cn_image_0000002571171345.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=61A3D9BE7A0F4400CD3C22F16D492175B53547D940EBBE9D1E8E3B819EDAD86E)

## 自适应拉伸

在线性布局下，常用空白填充组件[Blank](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-blank)，在容器主轴方向自动填充空白空间，达到自适应拉伸效果。Row和Column作为容器，只需要添加宽高为百分比，当屏幕宽高发生变化时，会产生自适应效果。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct BlankExample {
4. build() {
5. Column() {
6. Row() {
7. Text('Bluetooth').fontSize(18)
8. Blank()
9. Toggle({ type: ToggleType.Switch, isOn: true })
10. }.backgroundColor(0xFFFFFF).borderRadius(15).padding({ left: 12 }).width('100%')
11. }.backgroundColor(0xEFEFEF).padding(20).width('100%')
12. }
13. }
```

[BlankExample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/BlankExample.ets#L15-L29)

**图9** 竖屏（自适应屏幕窄边）

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7f/v3/k_nEf1nNRiqLjNCPwnsxMw/zh-cn_image_0000002540771002.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=B987A2AD444AD981D306B4ECE52D109F4BE419CA32F0473A63D06DCCDCBE6F1A)

**图10** 横屏（自适应屏幕宽边）

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c7/v3/Ndx_xIKVQayZ2CrUURFM2w/zh-cn_image_0000002571291299.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=25B36C09DCEE779F3E8238CAA7B701720B3927BD9EDA99AC7EE777B086C8E256)

## 自适应缩放

自适应缩放是指子元素随容器尺寸的变化而按照预设的比例自动调整尺寸，适应各种不同大小的设备。在线性布局中，可以使用以下两种方法实现自适应缩放。

* 父容器尺寸确定时，使用[layoutWeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-size#layoutweight)属性设置子元素和兄弟元素在主轴上的权重，忽略元素本身尺寸设置，使它们在任意尺寸的设备下自适应占满剩余空间。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Entry
  2. @Component
  3. struct LayoutWeightExample {
  4. build() {
  5. Column() {
  6. Text('1:2:3').width('100%')
  7. Row() {
  8. Column() {
  9. Text('layoutWeight(1)')
  10. .textAlign(TextAlign.Center)
  11. }.layoutWeight(1).backgroundColor(0xF5DEB3).height('100%')

  13. Column() {
  14. Text('layoutWeight(2)')
  15. .textAlign(TextAlign.Center)
  16. }.layoutWeight(2).backgroundColor(0xD2B48C).height('100%')

  18. Column() {
  19. Text('layoutWeight(3)')
  20. .textAlign(TextAlign.Center)
  21. }.layoutWeight(3).backgroundColor(0xF5DEB3).height('100%')

  23. }.backgroundColor(0xffd306).height('30%')

  25. Text('2:5:3').width('100%')
  26. Row() {
  27. Column() {
  28. Text('layoutWeight(2)')
  29. .textAlign(TextAlign.Center)
  30. }.layoutWeight(2).backgroundColor(0xF5DEB3).height('100%')

  32. Column() {
  33. Text('layoutWeight(5)')
  34. .textAlign(TextAlign.Center)
  35. }.layoutWeight(5).backgroundColor(0xD2B48C).height('100%')

  37. Column() {
  38. Text('layoutWeight(3)')
  39. .textAlign(TextAlign.Center)
  40. }.layoutWeight(3).backgroundColor(0xF5DEB3).height('100%')
  41. }.backgroundColor(0xffd306).height('30%')
  42. }
  43. }
  44. }
  ```

  [LayoutWeightExample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/LayoutWeightExample.ets#L15-L60)

  **图11** 横屏

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1b/v3/CMKtEWizThi6Zb-Fl3yvHg/zh-cn_image_0000002540611352.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=255BF5F59AECC2D859D24F2B5AE17B8E2C1448D8B44B3940EA105CF06A68F763)

  **图12** 竖屏

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9e/v3/480AwfIGSySYQ5Oe3k-jvw/zh-cn_image_0000002571171347.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=9A30EA9D682DFFB9C1D218B9A1FB05D8AE114F8BBB9B6D65A8BC00E14EDFD767)
* 父容器尺寸确定时，使用百分比设置子元素和兄弟元素的宽度，使他们在任意尺寸的设备下保持固定的自适应占比。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Entry
  2. @Component
  3. struct WidthExample {
  4. build() {
  5. Column() {
  6. Row() {
  7. Column() {
  8. Text('left width 20%')
  9. .textAlign(TextAlign.Center)
  10. }.width('20%').backgroundColor(0xF5DEB3).height('100%')

  12. Column() {
  13. Text('center width 50%')
  14. .textAlign(TextAlign.Center)
  15. }.width('50%').backgroundColor(0xD2B48C).height('100%')

  17. Column() {
  18. Text('right width 30%')
  19. .textAlign(TextAlign.Center)
  20. }.width('30%').backgroundColor(0xF5DEB3).height('100%')
  21. }.backgroundColor(0xffd306).height('30%')
  22. }
  23. }
  24. }
  ```

  [WidthExample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/WidthExample.ets#L15-L40)

  **图13** 横屏

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/84/v3/cSfg-2rzScG6eL7Oo8o1TQ/zh-cn_image_0000002540771004.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=4DB333CE84B686B0818D253DAB5A6AD87A7DCC8264537F0C1A0767FA5D1F5D3F)

  **图14** 竖屏

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dc/v3/TsTkR1pGSwWCObQMteMtNg/zh-cn_image_0000002571291301.png?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=1B94CD42B88AF051B9EA8500129A1C9920EA9F5B74F29D90A9A12862B420F741)

## 自适应延伸

自适应延伸是指在不同尺寸设备下，当页面的内容超出屏幕大小而无法完全显示时，可以通过滚动条进行拖动展示。对于线性布局，这种方法适用于容器中内容无法一屏展示的场景。通常有以下两种实现方式。

* [在List中添加滚动条](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-layout-development-create-list#添加滚动条)：当List子项过多一屏放不下时，可以将每一项子元素放置在不同的组件中，通过滚动条进行拖动展示。可以通过[scrollBar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-scroll#scrollbar)属性设置滚动条的常驻状态，[edgeEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-scroll#edgeeffect)属性设置拖动到内容最末端的回弹效果。
* 使用[Scroll](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-scroll)组件：在线性布局中，开发者可以进行垂直方向或者水平方向的布局。当一屏无法完全显示时，可以在Column或Row组件的外层包裹一个可滚动的容器组件Scroll来实现可滑动的线性布局。

  垂直方向布局中使用Scroll组件：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Entry
  2. @Component
  3. struct ScrollVerticalExample {
  4. scroller: Scroller = new Scroller();
  5. private arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  7. build() {
  8. Scroll(this.scroller) {
  9. Column() {
  10. ForEach(this.arr, (item?:number|undefined) => {
  11. if(item != undefined){
  12. Text(item.toString())
  13. .width('90%')
  14. .height(150)
  15. .backgroundColor(0xFFFFFF)
  16. .borderRadius(15)
  17. .fontSize(16)
  18. .textAlign(TextAlign.Center)
  19. .margin({ top: 10 })
  20. }
  21. }, (item:number) => item.toString())
  22. }.width('100%')
  23. }
  24. .backgroundColor(0xDCDCDC)
  25. .scrollable(ScrollDirection.Vertical) // 滚动方向为垂直方向
  26. .scrollBar(BarState.On) // 滚动条常驻显示
  27. .scrollBarColor(Color.Gray) // 滚动条颜色
  28. .scrollBarWidth(10) // 滚动条宽度
  29. .edgeEffect(EdgeEffect.Spring) // 滚动到边沿后回弹
  30. }
  31. }
  ```

  [ScrollVerticalExample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/ScrollVerticalExample.ets#L15-L47)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/55/v3/IEKx6GPXSxW0enCRrn5Mnw/zh-cn_image_0000002540611354.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=6A7B7760966991103C19D2CBDCAA478BB97F4100C5966A9B5BEED346E20702AD)

  水平方向布局中使用Scroll组件：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Entry
  2. @Component
  3. struct ScrollHorizontalExample {
  4. scroller: Scroller = new Scroller();
  5. private arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  7. build() {
  8. Scroll(this.scroller) {
  9. Row() {
  10. ForEach(this.arr, (item?:number|undefined) => {
  11. if(item != undefined){
  12. Text(item.toString())
  13. .height('90%')
  14. .width(150)
  15. .backgroundColor(0xFFFFFF)
  16. .borderRadius(15)
  17. .fontSize(16)
  18. .textAlign(TextAlign.Center)
  19. .margin({ left: 10 })
  20. }
  21. })
  22. }.height('100%')
  23. }
  24. .backgroundColor(0xDCDCDC)
  25. .scrollable(ScrollDirection.Horizontal) // 滚动方向为水平方向
  26. .scrollBar(BarState.On) // 滚动条常驻显示
  27. .scrollBarColor(Color.Gray) // 滚动条颜色
  28. .scrollBarWidth(10) // 滚动条宽度
  29. .edgeEffect(EdgeEffect.Spring) // 滚动到边沿后回弹
  30. }
  31. }
  ```

  [ScrollHorizontalExample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/MultipleLayoutProject/entry/src/main/ets/pages/linearlayout/ScrollHorizontalExample.ets#L15-L47)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b0/v3/twZvgGyOTTi4sNAQEfF1xQ/zh-cn_image_0000002571171349.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034536Z&HW-CC-Expire=86400&HW-CC-Sign=081A6EE4BB808A65FBFF4A0E2F1E76C021E6B24C61042E61CE3C7BC4FF610724)